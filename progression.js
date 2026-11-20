/* The learner's progress, kept in this browser (localStorage), with no server: the steps whose épreuve is passed
   (acquis) and the notion chosen on the Atlas (choix). Same rules the old Worker enforced:
   - an étape is acquired at ≥ 80 % (score · 5 ≥ total · 4), only a step of the parcours that has lessons;
   - a better ratio replaces a worse one, never the reverse;
   - a notion id is [a-z0-9_]{1,64}, a step id [a-z0-9-]{1,64}.
   fusion() merges two states (an imported file, a Gist): best ratio per step, most recent choice.
   Storage may be refused (private mode, blocked site data): the state then lives in memory for the visit. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Progression = factory();
}(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const CLE = "cours.progression", VERSION = 1, ID = /^[a-z0-9_]{1,64}$/, ETAPE = /^[a-z0-9-]{1,64}$/;
  /* the key used before 2026-11-14, by its hash: the site does not spell out its former name */
  const ANCIENNE = "5acc5d6f";
  const vide = () => ({ version: VERSION, acquis: [], choix: null });
  const meilleur = (a, b) => b.score * a.total > a.score * b.total;   // b's ratio beats a's, in integers

  /* an untrusted object (a file, a Gist) → a clean state, or an Error naming the first problem */
  function valider(o) {
    if (!o || typeof o !== "object" || o.version !== VERSION) throw new Error("version");
    if (!Array.isArray(o.acquis)) throw new Error("acquis");
    const acquis = o.acquis.map(a => {
      if (!a || typeof a.etape !== "string" || !ETAPE.test(a.etape)) throw new Error("etape");
      if (!Number.isInteger(a.total) || a.total < 1 || a.total > 100 || !Number.isInteger(a.score) || a.score < 0 || a.score > a.total || a.score * 5 < a.total * 4) throw new Error("score");
      return { etape: a.etape, score: a.score, total: a.total, date: typeof a.date === "string" ? a.date : null };
    });
    let choix = null;
    if (o.choix != null) {
      if (typeof o.choix.noeud !== "string" || !ID.test(o.choix.noeud)) throw new Error("choix");
      choix = { noeud: o.choix.noeud, choisiLe: typeof o.choix.choisiLe === "string" ? o.choix.choisiLe : null };
    }
    return fusion(vide(), { version: VERSION, acquis, choix });
  }

  /* a ∪ b: per step the best ratio (a wins a tie), the most recent choice (a wins without dates) */
  function fusion(a, b) {
    const par = new Map(a.acquis.map(x => [x.etape, x]));
    for (const x of b.acquis) { const y = par.get(x.etape); if (!y || meilleur(y, x)) par.set(x.etape, x); }
    const choix = !b.choix ? a.choix : !a.choix ? b.choix : (b.choix.choisiLe || "") > (a.choix.choisiLe || "") ? b.choix : a.choix;
    return { version: VERSION, acquis: [...par.values()].sort((x, y) => x.etape < y.etape ? -1 : 1), choix };
  }

  /* 32-bit FNV-1a, in hex: recognizes a former name without writing it */
  function empreinte(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193) >>> 0;
    return h.toString(16).padStart(8, "0");
  }
  /* the key of storage whose hash is h, or null */
  function retrouver(storage, h) {
    try { for (let i = 0; i < storage.length; i++) { const k = storage.key(i); if (k != null && empreinte(k) === h) return k; } } catch { /* no storage */ }
    return null;
  }

  /* the store: storage is a localStorage, or any {getItem, setItem, removeItem, length, key}; without one, or if it throws, memory only */
  function magasin(storage) {
    let memoire = null, garde = !!storage;
    const abonnes = new Set();
    const lire = () => {
      if (memoire) return memoire;
      try { const s = storage && storage.getItem(CLE); memoire = s ? valider(JSON.parse(s)) : vide(); } catch { memoire = vide(); }
      reprendre();
      return memoire;
    };
    /* the former key, once: merged (corrupt or forged, dropped), then removed, unless the write is refused */
    const reprendre = () => {
      const k = retrouver(storage, ANCIENNE); if (!k) return;
      try { memoire = fusion(memoire, valider(JSON.parse(storage.getItem(k)))); } catch { /* dropped */ }
      try { storage.setItem(CLE, JSON.stringify(memoire)); storage.removeItem(k); } catch { /* kept for the next visit */ }
    };
    const ecrire = e => {
      memoire = e;
      try { storage.setItem(CLE, JSON.stringify(e)); garde = true; } catch { garde = false; }   // memory only
      abonnes.forEach(f => { try { f(e); } catch { /* a listener never breaks a save */ } });
      return e;
    };
    return {
      etat: lire,
      garde: () => garde,                 // did the last save reach the storage (else: memory, this visit only)
      acquis: () => lire().acquis,
      choix: () => lire().choix,
      /* {etape, score, total} → the row kept, or an Error (unknown step, under 80 %) */
      acquerir(parcours, { etape, score, total }, date = new Date().toISOString()) {
        const E = parcours && parcours.etapes;
        if (typeof etape !== "string" || !E || !Object.prototype.hasOwnProperty.call(E, etape) || !E[etape].lecons.length) throw new Error("etape");
        if (!Number.isInteger(total) || total < 1 || total > 100 || !Number.isInteger(score) || score < 0 || score > total) throw new Error("score");
        if (score * 5 < total * 4) throw new Error("seuil");
        const e = fusion(lire(), { version: VERSION, acquis: [{ etape, score, total, date }], choix: null });
        ecrire(e);
        return e.acquis.find(a => a.etape === etape);
      },
      choisir(noeud, date = new Date().toISOString()) {
        if (typeof noeud !== "string" || !ID.test(noeud)) throw new Error("choix");
        return ecrire({ ...lire(), choix: { noeud, choisiLe: date } }).choix;
      },
      /* a file or a Gist: merged, never replacing better results */
      importer(o) { return ecrire(fusion(lire(), valider(o))); },
      exporter: () => JSON.stringify(lire(), null, 1) + "\n",
      effacer() { return ecrire(vide()); },
      abonner(f) { abonnes.add(f); return () => abonnes.delete(f); },
    };
  }

  let ici = null;   // the page's store, on first use
  const page = () => ici || (ici = magasin((() => { try { return self.localStorage; } catch { return null; } })()));
  return { CLE, ANCIENNE, VERSION, vide, valider, fusion, empreinte, retrouver, magasin, page };
}));

/* Optional: the progress also kept in a private Gist of the learner's own GitHub account, so another browser finds it.
   No server: the learner pastes a personal token (a fine-grained token with the account permission « Gists:
   read and write », or a classic token with the « gist » scope). The token stays in this browser.
   One file, FICHIER, in one private gist: found by its name when linking from a second browser.
   synchroniser(): read the gist, merge it into the store (Progression.fusion: never lowers a result), write back
   if the gist lacked something. Every later save is pushed (debounced). fetch is injected for the tests. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Gist = factory();
}(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const API = "https://api.github.com", FICHIER = "progression-cours.json", CLE = "cours.gist";
  const DESCRIPTION = "Progression du cours (créée par le site, privée)";
  /* the link key and the file used before 2026-11-14, by their hash (Progression.empreinte): the site does not spell them out */
  const ANCIEN_LIEN = "d2fd85cb", ANCIEN_FICHIER = "945b2488";

  /* P: the Progression module (empreinte) */
  function client(token, fetch, P) {
    const call = async (method, path, body) => {
      const r = await fetch(API + path, { method, headers: { accept: "application/vnd.github+json", authorization: "Bearer " + token, "x-github-api-version": "2022-11-28", ...(body ? { "content-type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
      if (!r.ok) { const e = new Error(r.status === 401 ? "jeton" : r.status === 403 || r.status === 404 ? "droits" : "reseau"); e.status = r.status; throw e; }
      return r.json();
    };
    const ancien = g => Object.keys(g.files || {}).find(f => P.empreinte(f) === ANCIEN_FICHIER) || null;
    const contenu = async g => {
      const f = g.files && (g.files[FICHIER] || g.files[ancien(g)]);
      if (!f) return null;
      return JSON.parse(f.truncated ? await (await fetch(f.raw_url)).text() : f.content);
    };
    return {
      /* the gist that holds FICHIER (or the former file), or null */
      async trouver() {
        for (let page = 1; page <= 10; page++) {
          const l = await call("GET", "/gists?per_page=100&page=" + page);
          const g = l.find(g => g.files && (g.files[FICHIER] || ancien(g)));
          if (g) return g.id;
          if (l.length < 100) return null;
        }
        return null;
      },
      /* {etat, ancien}: ancien, the former file's name, replaced by the next write */
      async lire(id) { const g = await call("GET", "/gists/" + id); return { etat: await contenu(g), ancien: ancien(g) }; },
      creer: async etat => (await call("POST", "/gists", { description: DESCRIPTION, public: false, files: { [FICHIER]: { content: JSON.stringify(etat, null, 1) } } })).id,
      ecrire(id, etat, ancien) {
        const files = { [FICHIER]: { content: JSON.stringify(etat, null, 1) } };
        return call("PATCH", "/gists/" + id, ancien ? { description: DESCRIPTION, files: { ...files, [ancien]: null } } : { files });   // null deletes the file
      },
    };
  }

  /* the link, kept in this browser: {token, id} or null; under the former key, moved once */
  function lien(storage, P) {
    return {
      lire() {
        let s;
        try { s = storage.getItem(CLE); } catch { return null; }
        const k = s ? null : P.retrouver(storage, ANCIEN_LIEN);
        if (k) try { s = storage.getItem(k); storage.setItem(CLE, s); storage.removeItem(k); } catch { /* kept for the next visit */ }
        try { return s ? JSON.parse(s) : null; } catch { return null; }
      },
      ecrire(v) { try { v ? storage.setItem(CLE, JSON.stringify(v)) : storage.removeItem(CLE); return true; } catch { return false; } },
    };
  }

  /* store: a Progression store; P: the Progression module (fusion, empreinte); opts: {storage, fetch, delai} */
  function sync(store, P, opts) {
    const L = lien(opts.storage, P), fetch = opts.fetch, delai = opts.delai == null ? 1500 : opts.delai;
    let minuterie = null, envoi = Promise.resolve(), desabonner = null;
    const meme = (a, b) => JSON.stringify(P.fusion(P.vide(), a)) === JSON.stringify(P.fusion(P.vide(), b));
    async function synchroniser() {
      const l = L.lire(); if (!l) return { change: false };
      const c = client(l.token, fetch, P), { etat: distant, ancien } = await c.lire(l.id);
      const avant = store.etat();
      if (distant) store.importer(distant);                  // validated, merged, never lowers a result
      const apres = store.etat();
      if (!distant || ancien || !meme(distant, apres)) await c.ecrire(l.id, apres, ancien);
      return { change: !meme(avant, apres) };
    }
    const pousser = () => {
      const l = L.lire(); if (!l) return;
      clearTimeout(minuterie);
      minuterie = setTimeout(() => { envoi = envoi.then(() => client(l.token, fetch, P).ecrire(l.id, store.etat())).catch(() => {}); }, delai);
    };
    return {
      lie: () => !!L.lire(),
      /* paste a token: find the gist (another browser made it) or create it, then merge both ways */
      async lier(token) {
        token = String(token || "").trim();
        if (!/^(gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}$/.test(token)) throw new Error("format");
        const c = client(token, fetch, P);
        const id = (await c.trouver()) || (await c.creer(store.etat()));
        if (!L.ecrire({ token, id })) throw new Error("stockage");
        const r = await synchroniser();
        desabonner = desabonner || store.abonner(pousser);
        return { id, ...r };
      },
      delier() { L.ecrire(null); if (desabonner) { desabonner(); desabonner = null; } },
      synchroniser,
      /* on page load: if linked, merge the gist in and push later saves; never throws */
      async demarrer() {
        if (!L.lire()) return { change: false };
        desabonner = desabonner || store.abonner(pousser);
        try { return await synchroniser(); } catch (e) { return { change: false, erreur: e.message }; }
      },
      envoye: () => envoi,                                   // for the tests: the last push has settled
    };
  }

  let ici = null;
  const page = () => ici || (ici = sync(self.Progression.page(), self.Progression, { storage: (() => { try { return self.localStorage; } catch { return null; } })(), fetch: (...a) => self.fetch(...a) }));
  return { API, FICHIER, CLE, ANCIEN_LIEN, ANCIEN_FICHIER, client, sync, page };
}));

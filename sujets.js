/* généré par graph/build.js depuis graph/sujets.js : ne pas modifier */
/* Sujets de concours (ENS, Centrale-Supélec, Mines-Ponts) rattachés aux notions. */
(function (root) {
  const FILIERES = ["MP", "PC", "PSI", "MPI", "PT", "TSI", "M", "P", "M'", "P'", "TA", "TB"];

  // returns the list of problems; [] when the index is consistent
  function check(papers, nodeIds) {
    const ids = new Set(nodeIds), seen = new Set(), urls = new Map(), titles = new Map(), out = [], year = new Date().getFullYear();
    papers.forEach((p, i) => {
      const at = `#${i} ${p.concours} ${p.annee} ${p.filiere} ${p.epreuve}`;
      if (!p.concours || !p.epreuve) out.push(at + " : concours ou épreuve manquant");
      if (!Number.isInteger(p.annee) || p.annee < 1950 || p.annee > year) out.push(at + " : année hors de 1950–" + year);
      if (!FILIERES.includes(p.filiere)) out.push(at + " : filière inconnue " + p.filiere);
      if (!/^https:\/\/\S+$/.test(p.url || "")) out.push(at + " : lien manquant ou non https");
      (p.notions || []).forEach(n => { if (!ids.has(n)) out.push(at + " : notion inconnue " + n); });
      const k = [p.concours, p.annee, p.filiere, p.epreuve].join("|").toLowerCase();
      if (seen.has(k)) out.push(at + " : doublon"); seen.add(k);
      const u = (p.url || "").toLowerCase();
      if (u && urls.has(u) && !p.meme_sujet_que) out.push(at + " : même PDF que " + urls.get(u)); urls.set(u, at);
      const tk = p.titre ? [p.annee, p.filiere, p.titre.trim()].join("|").toLowerCase() : null;
      if (tk && titles.has(tk) && !p.meme_sujet_que) out.push(at + " : même sujet que " + titles.get(tk)); if (tk) titles.set(tk, at);
    });
    return out;
  }

  // notion id → papers, newest first
  function byNotion(papers) {
    const m = new Map();
    papers.forEach(p => (p.notions || []).forEach(n => (m.get(n) || m.set(n, []).get(n)).push(p)));
    m.forEach(list => list.sort((a, b) => b.annee - a.annee || a.concours.localeCompare(b.concours)));
    return m;
  }

  // merge several concours files, dropping exact duplicates (same concours, year, filière, épreuve)
  function merge(...lists) {
    const seen = new Set(), out = [];
    lists.flat().forEach(p => { const k = [p.concours, p.annee, p.filiere, p.epreuve].join("|").toLowerCase(); if (!seen.has(k)) { seen.add(k); out.push(p); } });
    return out;
  }

  const api = { FILIERES, check, byNotion, merge };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Sujets = api;
})(typeof self !== "undefined" ? self : this);

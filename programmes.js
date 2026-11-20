/* Programmes officiels de CPGE comme filtres de l'Atlas : lire ?programme=, choisir les filières connues, réunir leurs notions.
   Pur, sans DOM. Les données sont FILIERES (public/filieres.js, généré par graph/build.js) : [{ id, sigle, nom, annee, suites, texte, parties: [{ titre, notions }], lacunes }]. */
(function (root) {
  const liste = F => Array.isArray(F) ? F.filter(f => f && typeof f.id === "string") : [];   // data file missing or broken → no filière

  /* "pcsi,PC, pcsi" → ["pcsi", "pc"]: lower case, trimmed, in order, each once; separators: comma, space, plus */
  function lire(param) {
    if (typeof param !== "string") return [];
    const out = [];
    param.toLowerCase().split(/[\s,+]+/).filter(Boolean).forEach(id => { if (!out.includes(id)) out.push(id); });
    return out;
  }
  /* the asked ids split into known filières (in the order asked) and unknown ids, which the page ignores */
  function choisir(ids, F) {
    const by = new Map(liste(F).map(f => [f.id, f])), connus = [], inconnus = [];
    (ids || []).forEach(id => (by.has(id) ? connus : inconnus).push(id));
    return { ids: connus, filieres: connus.map(id => by.get(id)), inconnus };
  }
  /* the notions of one filière: every part, each notion once, in reading order */
  function notionsDe(f) {
    const out = [];
    ((f && f.parties) || []).forEach(p => (p.notions || []).forEach(n => { if (!out.includes(n)) out.push(n); }));
    return out;
  }
  /* union of the notions of the known filières among ids */
  function notions(ids, F) {
    const s = new Set();
    choisir(ids, F).filieres.forEach(f => notionsDe(f).forEach(n => s.add(n)));
    return s;
  }
  /* the chains a first-year filière opens: itself, then [itself, suite] for each suite that exists */
  function chaines(f, F) {
    const ids = new Set(liste(F).map(x => x.id));
    return [[f.id]].concat((f.suites || []).filter(s => ids.has(s)).map(s => [f.id, s]));
  }
  /* by year, 1 then 2, in the data's order */
  function parAnnee(F) {
    const out = [];
    liste(F).forEach(f => { let g = out.find(x => x.annee === f.annee); if (!g) out.push(g = { annee: f.annee, filieres: [] }); g.filieres.push(f); });
    return out.sort((a, b) => a.annee - b.annee);
  }
  /* the Atlas address for these filières */
  const lien = ids => "/racoon/atlas" + (ids && ids.length ? "?programme=" + ids.join(",") : "");
  /* a query string with programme set to ids (or removed when empty), every other parameter kept, the comma left readable */
  function ecrire(search, ids) {
    const q = new URLSearchParams(search || ""); q.delete("programme");
    const rest = q.toString(), p = ids && ids.length ? "programme=" + ids.map(encodeURIComponent).join(",") : "";
    const s = [rest, p].filter(Boolean).join("&");
    return s ? "?" + s : "";
  }
  /* toggles one id in a selection, keeping the order of choice */
  const basculer = (ids, id) => (ids || []).includes(id) ? ids.filter(x => x !== id) : (ids || []).concat(id);

  const api = { lire, choisir, notionsDe, notions, chaines, parAnnee, lien, ecrire, basculer };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Programmes = api;
})(typeof self !== "undefined" ? self : this);

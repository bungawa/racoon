/* Parcours : the course as a world map. Pure (no DOM, no fetch), UMD.
   data = /parcours.json : { mondes: [{id, etapes: [id]}], etapes: { id: {monde, prereq: [id], lecons: ["/racoon/lecons/<slug>"], bonus?} } }
   acquis = what /api/acquis returns ([{etape, score, total, date}]) or plain step ids; unknown steps are ignored.
   A step is « acquise » once its épreuve is passed at ≥ 80 % (seuil). States: acquise, ouverte, grisee, a-venir. */
(function (root) {
  const ETATS = ["acquise", "ouverte", "grisee", "a-venir"];

  /* least score that passes: ⌈0,8 · total⌉, computed in integers like the Worker (score · 5 ≥ total · 4) */
  const seuil = total => Math.ceil(4 * total / 5);

  /* every step id, in map order: mondes in order, then their steps in order */
  const ordre = data => data.mondes.flatMap(m => m.etapes);

  /* every lesson, in map order: what « previous / next » follow */
  const ordreLecons = data => ordre(data).flatMap(id => data.etapes[id].lecons);

  /* the step a lesson belongs to, or null */
  function etapeDe(data, chemin) {
    const c = String(chemin).replace(/\.html$/, "").replace(/\/$/, "");
    return ordre(data).find(id => data.etapes[id].lecons.includes(c)) || null;
  }

  /* acquis → Set of known step ids */
  function acquises(data, acquis) {
    const ids = (acquis || []).map(a => typeof a === "string" ? a : a && a.etape);
    return new Set(ids.filter(id => id && Object.prototype.hasOwnProperty.call(data.etapes, id)));
  }

  /* a prerequisite blocks while it is not acquired; a bonus step or a step with no lesson yet never blocks */
  function bloque(data, done, id) {
    const e = data.etapes[id];
    return !done.has(id) && !e.bonus && e.lecons.length > 0;
  }
  const manquants = (data, acquis, id) => data.etapes[id].prereq.filter(p => bloque(data, acquises(data, acquis), p));

  function etat(data, acquis, id) {
    const e = data.etapes[id];
    if (!e) return null;
    if (!e.lecons.length) return "a-venir";
    const done = acquises(data, acquis);
    if (done.has(id)) return "acquise";
    return e.prereq.some(p => bloque(data, done, p)) ? "grisee" : "ouverte";
  }

  /* the current step: the first open step not acquired, in map order. Bonus steps never hold it back:
     it is one only when nothing else is open. null once every step is acquired (or still to come). */
  function courante(data, acquis) {
    const open = ordre(data).filter(id => etat(data, acquis, id) === "ouverte");
    return open.find(id => !data.etapes[id].bonus) || open[0] || null;
  }

  /* structural problems of the data, given the delivered lessons' paths → [message], [] when sound */
  function problemes(data, chemins) {
    const out = [], ids = ordre(data), seen = new Map(), at = new Map(ids.map((id, i) => [id, i]));
    const mondeOf = new Map(data.mondes.flatMap((m, i) => m.etapes.map(id => [id, i])));
    if (new Set(ids).size !== ids.length) out.push("étape listée deux fois sur la carte");
    Object.keys(data.etapes).forEach(id => { if (!at.has(id)) out.push(`étape absente de la carte : ${id}`); });
    ids.forEach(id => {
      const e = data.etapes[id];
      if (!e) { out.push(`étape sans fiche : ${id}`); return; }
      if (data.mondes[mondeOf.get(id)].id !== e.monde) out.push(`${id} : monde ${e.monde} mais listée dans ${data.mondes[mondeOf.get(id)].id}`);
      e.prereq.forEach(p => {
        if (!data.etapes[p]) out.push(`${id} : prérequis inconnu ${p}`);
        else if (!(at.get(p) < at.get(id))) out.push(`${id} : prérequis ${p} placé après elle sur la carte`);
        else if (data.etapes[p].bonus && !e.bonus) out.push(`${id} : une étape bonus (${p}) ne peut pas être un prérequis`);
      });
      e.lecons.forEach(c => {
        if (seen.has(c)) out.push(`${c} est dans deux étapes : ${seen.get(c)} et ${id}`); else seen.set(c, id);
        if (chemins && !chemins.includes(c)) out.push(`${id} : leçon inconnue ${c}`);
      });
    });
    if (chemins) chemins.forEach(c => { if (!seen.has(c)) out.push(`leçon dans aucune étape : ${c}`); });
    return out;
  }

  const api = { ETATS, seuil, ordre, ordreLecons, etapeDe, acquises, manquants, etat, courante, problemes };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Parcours = api;
})(typeof self !== "undefined" ? self : this);

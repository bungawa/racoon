/* DiagOrb — la mise en page des diagrammes d'orbitales des leçons de l'étape « Orbitales moléculaires ». Pur, sans DOM, UMD
   (global DiagOrb) : chaque fonction rend une liste de formes { t, a, txt } (balise SVG, attributs, texte éventuel) que la page
   dessine avec rendre(formes, el, parent), el étant Plot.el. Les énergies sont en eV ; l'axe vertical est linéaire en énergie,
   sauf pour niveauxA2, qui dessine un schéma qualitatif (rangs, pas énergies : le modèle ne fournit pas d'énergies fiables).
   Les classes sont celles de ds.css : stroke, fill, thin, bold, dash ; la couleur vient du groupe (c-label, c-tint, el-o…). */
(function (root) {
  const err = m => { throw new Error("DiagOrb : " + m); };
  const r1 = v => Math.round(v * 10) / 10;

  /* Échelle verticale : E (eV) dans [lo, hi] → pixel entre bas et haut ; hors domaine, ramené au bord. */
  function echelle(lo, hi, bas, haut) {
    if (!(hi > lo)) err("domaine d'énergie vide");
    return E => r1(bas + (Math.min(Math.max(E, lo), hi) - lo) / (hi - lo) * (haut - bas));
  }

  /* Deux orbitales a1 (à gauche), a2 (à droite) et leurs deux combinaisons r = ChimArchi.interactionDeux(…) au milieu.
     o = { a1, a2, r, E: [lo, hi], w, h, fmt(E) → texte, noms: [χ1, χ2, liante, antiliante] }. Chaque combinaison porte deux disques
     de rayon 3 + 11|c| (gauche pour χ1, droite pour χ2), groupe c-tint si c > 0, el-o si c < 0 : taille et signe des coefficients. */
  function deuxNiveaux(o) {
    const w = o.w || 640, h = o.h || 360, y = echelle(o.E[0], o.E[1], h - 24, 24), f = [], noms = o.noms || ["", "", "", ""];
    const g = cls => ({ t: "g", a: { class: cls }, enfants: [] }), lignes = g("c-label"), pointilles = g("c-label-2"), textes = g("");
    const X = { g: [60, 170], m: [270, 370], d: [470, 580] };
    const niveau = (x, E) => lignes.enfants.push({ t: "line", a: { x1: x[0], x2: x[1], y1: y(E), y2: y(E), class: "stroke bold" } });
    const lien = (xa, Ea, xb, Eb) => pointilles.enfants.push({ t: "line", a: { x1: xa, y1: y(Ea), x2: xb, y2: y(Eb), class: "stroke thin dash" } });
    const texte = (x, yy, s, ancre) => textes.enfants.push({ t: "text", a: { x, y: r1(yy), "text-anchor": ancre || "middle" }, txt: s });
    niveau(X.g, o.a1); niveau(X.d, o.a2);
    texte(115, y(o.a1) - 8, noms[0]); texte(525, y(o.a2) - 8, noms[1]);
    texte(56, y(o.a1) + 4, o.fmt(o.a1), "end"); texte(584, y(o.a2) + 4, o.fmt(o.a2), "start");
    const disques = [];
    for (const [k, nom] of [["liante", noms[2]], ["antiliante", noms[3]]]) {
      const m = o.r[k], yy = y(m.E);
      niveau(X.m, m.E); lien(X.g[1], o.a1, X.m[0], m.E); lien(X.m[1], m.E, X.d[0], o.a2);
      texte(390, yy - 6, nom, "start"); texte(390, yy + 10, o.fmt(m.E), "start");
      m.c.forEach((c, i) => { if (Math.abs(c) < 0.005) return;
        disques.push({ t: "g", a: { class: c > 0 ? "c-tint" : "el-o" }, enfants: [{ t: "circle", a: { cx: i ? 345 : 295, cy: r1(yy + (k === "liante" ? 18 : -18)), r: r1(3 + 11 * Math.min(Math.abs(c), 1.6)), class: "fill" } }] }); });
    }
    f.push(pointilles, lignes, ...disques, textes);
    return f;
  }

  /* Diagramme qualitatif d'une molécule A₂ : d = ChimArchi.diatomique(…). Orbitales atomiques 2s et 2p de chaque côté, orbitales
     moléculaires au milieu, rangées dans l'ordre de d.niveaux (rangs fixes : 2s à 0, 2p à 10, unités arbitraires) ; électrons en
     flèches (règle de Hund : un par case avant d'apparier). o = { w, h, noms: { id → texte }, ao: [2s, 2p] }. */
  const RANG = { "1sg": -3, "1su": 2.5, "1pu": 7.2, "2sg": null, "1pg": 13.4, "2su": 16.4 };
  function niveauxA2(d, o) {
    o = o || {};
    if (!d || !Array.isArray(d.niveaux)) err("diagramme de ChimArchi.diatomique attendu");
    const w = o.w || 640, h = o.h || 380, y = echelle(-5, 18, h - 20, 20), noms = o.noms || {}, ao = o.ao || ["2s", "2p"];
    const lignes = { t: "g", a: { class: "c-label" }, enfants: [] }, pointilles = { t: "g", a: { class: "c-label-2" }, enfants: [] };
    const fleches = { t: "g", a: { class: "c-warn" }, enfants: [] }, textes = { t: "g", a: {}, enfants: [] };
    const melange = d.niveaux.findIndex(n => n.id === "2sg") > d.niveaux.findIndex(n => n.id === "1pu");
    const rang = id => (id === "2sg" ? (melange ? 8.6 : 5.6) : RANG[id]);
    const case_ = 26, gap = 10;
    const cases = (xc, g) => Array.from({ length: g }, (_, i) => xc + (i - (g - 1) / 2) * (case_ + gap));
    const fleche = (x, yy, haut) => fleches.enfants.push({ t: "path", a: { class: "stroke", d: haut
      ? `M${x} ${r1(yy + 8)}V${r1(yy - 8)}M${x - 3.5} ${r1(yy - 4)}L${x} ${r1(yy - 8)}L${x + 3.5} ${r1(yy - 4)}`
      : `M${x} ${r1(yy - 8)}V${r1(yy + 8)}M${x - 3.5} ${r1(yy + 4)}L${x} ${r1(yy + 8)}L${x + 3.5} ${r1(yy + 4)}` } });
    const remplir = (xs, yy, e) => {                 // Hund : une flèche montante par case, puis les descendantes
      xs.forEach((x, i) => { if (i < e) fleche(x - (e > xs.length && i < e - xs.length ? 5 : 0), yy, true); });
      xs.forEach((x, i) => { if (i < e - xs.length) fleche(x + 5, yy, false); });
    };
    const niveau = (xs, yy) => xs.forEach(x => lignes.enfants.push({ t: "line", a: { x1: x - case_ / 2, x2: x + case_ / 2, y1: yy, y2: yy, class: "stroke bold" } }));
    /* atomes : 2s (1 case) et 2p (3 cases), électrons de valence répartis comme dans l'atome isolé */
    const neAtome = (d.Z - 2), occ = [Math.min(2, neAtome), Math.max(0, neAtome - 2)];
    for (const [xc, cote] of [[90, -1], [550, 1]]) {
      [[0, 1], [10, 3]].forEach(([E, g], k) => { const xs = cases(xc, g), yy = y(E); niveau(xs, yy); remplir(xs, yy, occ[k]);
        textes.enfants.push({ t: "text", a: { x: cote < 0 ? xc - 62 : xc + 62, y: r1(yy + 4), "text-anchor": cote < 0 ? "end" : "start" }, txt: ao[k] }); });
    }
    for (const n of d.niveaux) {
      const yy = y(rang(n.id)), xs = cases(320, n.deg), from = n.id === "1sg" || n.id === "1su" ? 0 : 10;
      niveau(xs, yy); remplir(xs, yy, n.e);
      pointilles.enfants.push({ t: "line", a: { x1: 90 + 64, y1: y(from), x2: xs[0] - case_ / 2 - 4, y2: yy, class: "stroke thin dash" } });
      pointilles.enfants.push({ t: "line", a: { x1: xs[xs.length - 1] + case_ / 2 + 4, y1: yy, x2: 550 - 64, y2: y(from), class: "stroke thin dash" } });
      textes.enfants.push({ t: "text", a: { x: 410, y: r1(yy + 4), "text-anchor": "start" }, txt: noms[n.id] || n.id });
    }
    return [pointilles, lignes, fleches, textes];
  }

  /* Dessine les formes : el(balise, attributs, parent) crée l'élément (Plot.el dans la page). */
  function rendre(formes, el, parent) {
    for (const f of formes) { const e = el(f.t, f.a, parent); if (f.txt !== undefined) e.textContent = f.txt; if (f.enfants) rendre(f.enfants, el, e); }
  }
  /* Toutes les formes d'une liste, aplaties (pour les tests). */
  const aplatir = formes => formes.flatMap(f => [f, ...(f.enfants ? aplatir(f.enfants) : [])]);

  const api = { echelle, deuxNiveaux, niveauxA2, rendre, aplatir };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.DiagOrb = api;
})(typeof self !== "undefined" ? self : this);

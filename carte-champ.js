/* Carte de champ — draws a field on an SVG of a lesson: a heat map of a scalar field, its level lines, arrows of a vector
   field, field lines; and reports the point under the pointer. DOM only, the numbers come from AnaVec (grids, level lines,
   field lines). Global CarteChamp; needs /plot.js and /analyse-vectorielle.js. Colours come from ds.css classes only.

   carte(svg, o) → { sx, sy, layer(cls) }       o = { W, H, x0, x1, y0, y1 } in field units (m); clears the SVG.
   fond(c, f, nx, ny, o2)            heat map of f: nx × ny cells, tint .c-tint (o2.cls), darker for larger f; o2.lo, o2.hi fix the
                                      range, o2.signe = −1 makes smaller values darker.
   niveaux(c, f, valeurs, o2)        level lines f = v for each v (o2.n: grid of the search, default 96 × 64; o2.epais: index drawn thick).
   fleches(c, F, nx, ny, o2)         arrows of the vector field F on a grid, longest = o2.lmax px (default 0,8 cell);
                                      o2.unitaire: all of length lmax, directions only (a field that spans decades).
   lignes(c, F, departs, o2)         field lines from each start point (o2.ds, o2.n, o2.sens), cut where they leave the frame.
   fleche(c, p, u, lpx, cls)         one arrow from the field point p along the direction u, lpx pixels long (drawn by Plot.fleche).
   point(c, p, r, cls, texte)        a dot, with a label above it.
   survol(svg, c, cb)                cb([x, y]) with field coordinates, on pointer move and touch, at most once per frame. */
(function (root) {
  const P = (...a) => root.Plot.el(...a);
  function carte(svg, o) {
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 " + o.W + " " + o.H);
    const sx = root.Plot.linScale(o.x0, o.x1, 0, o.W), sy = root.Plot.linScale(o.y0, o.y1, o.H, 0);
    return { svg, o, sx, sy, layer: cls => P("g", cls ? { class: cls } : {}, svg) };
  }
  function fond(c, f, nx, ny, o2) {
    o2 = o2 || {};
    const { o } = c, s = o2.signe || 1, cw = o.W / nx, ch = o.H / ny, g = c.layer(o2.cls || "c-tint"), v = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const x = o.x0 + (o.x1 - o.x0) * (i + 0.5) / nx, y = o.y0 + (o.y1 - o.y0) * (j + 0.5) / ny;
      v.push([i, j, s * f([x, y])]);
    }
    const fin = v.map(a => a[2]).filter(Number.isFinite);
    const lo = o2.lo !== undefined ? s * o2.lo : Math.min(...fin), hi = o2.hi !== undefined ? s * o2.hi : Math.max(...fin);
    const [a, b] = lo <= hi ? [lo, hi] : [hi, lo];
    v.forEach(([i, j, z]) => {
      const op = b > a ? 0.06 + 0.8 * Math.min(1, Math.max(0, (z - a) / (b - a))) : 0.46;
      P("rect", { x: (i * cw).toFixed(2), y: (o.H - (j + 1) * ch).toFixed(2), width: cw.toFixed(2), height: ch.toFixed(2), "shape-rendering": "crispEdges", class: "fill", opacity: op.toFixed(3) }, g);
    });
    return g;
  }
  function niveaux(c, f, valeurs, o2) {
    o2 = o2 || {};
    const { o, sx, sy } = c, g = c.layer(o2.cls || "c-label"), [nx, ny] = o2.n || [96, 64];
    valeurs.forEach((v, k) => root.AnaVec.isolignes(f, o.x0, o.x1, nx, o.y0, o.y1, ny, v).forEach(([a, b]) =>
      P("line", { x1: sx(a[0]).toFixed(1), y1: sy(a[1]).toFixed(1), x2: sx(b[0]).toFixed(1), y2: sy(b[1]).toFixed(1), class: k === o2.epais ? "stroke" : "stroke thin" }, g)));
    return g;
  }
  function fleche(c, p, u, lpx, cls, parent) {
    const g = parent || c.layer(cls), x1 = c.sx(p[0]), y1 = c.sy(p[1]), n = Math.hypot(u[0], u[1]);
    if (!(n > 0) || !(lpx > 0.5)) return g;
    root.Plot.fleche(g, [x1, y1], [x1 + lpx * u[0] / n, y1 - lpx * u[1] / n],
      { cls: parent ? cls : "", tete: Math.min(7, lpx / 2.5), trait: "stroke" + (lpx < 20 ? " thin" : ""), min: 0 });
    return g;
  }
  function fleches(c, F, nx, ny, o2) {
    o2 = o2 || {};
    const { o } = c, g = c.layer(o2.cls || "c-warn"), lmax = o2.lmax || 0.8 * Math.min(o.W / nx, o.H / ny), pts = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const p = [o.x0 + (o.x1 - o.x0) * (i + 0.5) / nx, o.y0 + (o.y1 - o.y0) * (j + 0.5) / ny], v = F(p), n = Math.hypot(v[0], v[1]);
      if (Number.isFinite(n)) pts.push([p, v, n]);
    }
    const big = Math.max(...pts.map(a => a[2]));
    pts.forEach(([p, v, n]) => { if (big > 0 && n > 0) fleche(c, p, v, o2.unitaire ? lmax : lmax * n / big, "", g); });
    return g;
  }
  function lignes(c, F, departs, o2) {
    o2 = o2 || {};
    const { o, sx, sy } = c, g = c.layer(o2.cls || "c-warn");
    departs.forEach(p0 => {
      const L = root.AnaVec.ligneDeChamp(F, p0, o2.ds || (o.x1 - o.x0) / 100, o2.n || 200, o2.sens || 1);
      const out = L.findIndex(p => p[0] < o.x0 || p[0] > o.x1 || p[1] < o.y0 || p[1] > o.y1);
      if (out >= 0) L.length = out + 1;
      P("polyline", { points: L.map(p => sx(p[0]).toFixed(1) + "," + sy(p[1]).toFixed(1)).join(" "), class: "stroke thin" }, g);
    });
    return g;
  }
  function point(c, p, r, cls, texte, dy) {
    const g = c.layer(cls);
    P("circle", { cx: c.sx(p[0]).toFixed(1), cy: c.sy(p[1]).toFixed(1), r, class: "fill" }, g);
    if (texte) { const e = P("text", { x: c.sx(p[0]).toFixed(1), y: (c.sy(p[1]) + (dy || -10)).toFixed(1), "text-anchor": "middle" }, g); e.textContent = texte; }
    return g;
  }
  function survol(svg, c, cb) {
    let pending = false, last = null;
    const at = e => { const r = svg.getBoundingClientRect(); return [c().sx.inv((e.clientX - r.left) * c().o.W / r.width), c().sy.inv((e.clientY - r.top) * c().o.H / r.height)]; };
    const go = e => { last = at(e); if (!pending) { pending = true; requestAnimationFrame(() => { pending = false; cb(last); }); } };
    svg.addEventListener("pointermove", go);
    svg.addEventListener("pointerdown", go);
  }
  const api = { carte, fond, niveaux, fleches, fleche, lignes, point, survol };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CarteChamp = api;
})(typeof self !== "undefined" ? self : this);

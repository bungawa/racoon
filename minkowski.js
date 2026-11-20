/* Minkowski — draws a space-time diagram on an SVG of a lesson: x across, ct up, in the same unit, so that light goes at
   45°. Axes and light lines, world lines, the axes of a frame moving at βc (they close on the light line like scissors),
   invariant hyperbolas c²t² − x² = s², shaded light cones, dots, dragging. Global Minkowski; needs /plot.js for drawing.
   Colours come from ds.css classes only. The geometry (clipping, hyperbolas, ticks of a moving frame) is pure and exported
   for test/minkowski.test.js.

   Pure
   couper(box, p, d)              the segment of the line through p along d that lies in box = { x0, x1, t0, t1 }; null if none.
   branches(box, s2, n)           the branches of c²t² − x² = s² (diagram units) inside box, each a list of [x, ct].
   graduations(beta, pas, box)    the ticks of the moving frame's axes: { t: [[x, ct, k]…], x: [[x, ct, k]…] }, at ct' = k·pas
                                  and x' = k·pas, read in the diagram's frame: γ(βk, k)·pas and γ(k, βk)·pas.
   Drawing (browser)
   cadre(svg, o) → c              o = { W, H, x0, x1, t0, t1, pad } (diagram units); clears the SVG; c.sx, c.sy, c.layer(cls).
   fond(c, o2)                    the grid every o2.pas (class grid: the SVG sits in a figure.chart), the x and ct axes through the origin (labels o2.x, o2.t), the two light lines.
   droite(c, p, d, cls)           the full line through p along d, clipped to the frame.
   repere(c, beta, o2)            the axes of the frame at βc (labels o2.x, o2.t, class o2.cls, ticks every o2.pas).
   hyperbole(c, s2, cls)          the invariant curve through every event at squared interval s2 from the origin.
   cones(c, p, o2)                the future and past light cones of the event p as shaded triangles (o2.cls).
   chemin(c, pts, cls, parent)    a polyline through the events pts = [[x, ct]…], in parent (default: the SVG).
   point(c, p, r, cls, texte)     a dot, with a label above right.
   fleche(c, A, B, cls, o2)       an arrow from the event A = [x, ct] to B (Plot.fleche, options o2), in a group of class cls.
   glisser(svg, c, cb)            cb([x, ct]) in diagram units on pointer down and drag, at most once per frame. */
(function (root) {
  const fini = (x, nom) => (Number.isFinite(x) ? x : (() => { throw new Error("Minkowski : " + nom + " doit être un nombre fini"); })());

  /* ---------- pure geometry ---------- */
  /* Liang–Barsky clipping of the infinite line p + s d to the box. */
  function couper(box, p, d) {
    const [px, pt] = p.map((v, i) => fini(v, "p[" + i + "]")), [dx, dt] = d.map((v, i) => fini(v, "d[" + i + "]"));
    if (dx === 0 && dt === 0) throw new Error("Minkowski : direction nulle");
    let lo = -Infinity, hi = Infinity;
    for (const [q, a, b] of [[dx, box.x0 - px, box.x1 - px], [dt, box.t0 - pt, box.t1 - pt]]) {
      if (q === 0) { if (a > 0 || b < 0) return null; continue; }
      const s1 = a / q, s2 = b / q;
      lo = Math.max(lo, Math.min(s1, s2)); hi = Math.min(hi, Math.max(s1, s2));
    }
    if (!(lo <= hi)) return null;
    return [[px + lo * dx, pt + lo * dt], [px + hi * dx, pt + hi * dt]];
  }
  /* s2 > 0: ct = ±√(s2 + x²) (time-like, one branch up, one down); s2 < 0: x = ±√(ct² − s2) (space-like, right, left);
     s2 = 0: the two light lines. Each branch is sampled by its rapidity, then cut where it leaves the box. */
  function branches(box, s2, n) {
    fini(s2, "s2"); n = n || 200;
    const R = Math.hypot(Math.max(Math.abs(box.x0), Math.abs(box.x1)), Math.max(Math.abs(box.t0), Math.abs(box.t1)));
    const out = [], dans = ([x, t]) => x >= box.x0 - 1e-9 && x <= box.x1 + 1e-9 && t >= box.t0 - 1e-9 && t <= box.t1 + 1e-9;
    const garder = pts => { let cur = []; for (const q of pts) { if (dans(q)) cur.push(q); else if (cur.length) { if (cur.length > 1) out.push(cur); cur = []; } } if (cur.length > 1) out.push(cur); };
    if (s2 === 0) { for (const d of [[1, 1], [1, -1]]) { const seg = couper(box, [0, 0], d); if (seg) out.push(seg); } return out; }
    const a = Math.sqrt(Math.abs(s2)), phiMax = Math.acosh(Math.max(1, R / a)) + 1e-9;
    for (const sg of [1, -1]) {
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const phi = -phiMax + 2 * phiMax * i / n, ch = a * Math.cosh(phi), sh = a * Math.sinh(phi);
        pts.push(s2 > 0 ? [sh, sg * ch] : [sg * ch, sh]);
      }
      garder(pts);
    }
    return out;
  }
  /* ticks of the moving frame: the event ct' = k·pas on its time axis is (γβk, γk)·pas in the diagram's frame. */
  function graduations(beta, pas, box) {
    fini(beta, "beta"); if (!(Math.abs(beta) < 1)) throw new Error("Minkowski : |β| doit être < 1");
    const g = 1 / Math.sqrt((1 - beta) * (1 + beta)), t = [], x = [];
    const dans = ([a, b]) => a >= box.x0 && a <= box.x1 && b >= box.t0 && b <= box.t1;
    for (let k = -200; k <= 200; k++) {
      if (!k) continue;
      const pt = [g * beta * k * pas, g * k * pas], px = [g * k * pas, g * beta * k * pas];
      if (dans(pt)) t.push([...pt, k]);
      if (dans(px)) x.push([...px, k]);
    }
    return { t, x };
  }

  /* ---------- drawing ---------- */
  const P = (...a) => root.Plot.el(...a);
  function cadre(svg, o) {
    svg.innerHTML = "";
    svg.setAttribute("viewBox", "0 0 " + o.W + " " + o.H);
    const pad = o.pad === undefined ? 0 : o.pad, box = { x0: o.x0, x1: o.x1, t0: o.t0, t1: o.t1 };
    const sx = root.Plot.linScale(o.x0, o.x1, pad, o.W - pad), sy = root.Plot.linScale(o.t0, o.t1, o.H - pad, pad);
    return { svg, o, box, sx, sy, layer: cls => P("g", cls ? { class: cls } : {}, svg) };
  }
  const px = (c, [x, t]) => [c.sx(x), c.sy(t)];
  function seg(c, A, B, cls, parent) { const [x1, y1] = px(c, A), [x2, y2] = px(c, B); return P("line", { x1, y1, x2, y2, class: cls }, parent || c.svg); }
  function droite(c, p, d, cls, parent) { const s = couper(c.box, p, d); return s ? seg(c, s[0], s[1], cls || "stroke thin", parent) : null; }
  function texte(c, p, s, cls, dx, dy, parent) {
    const [x, y] = px(c, p), e = P("text", { x: x + (dx || 0), y: y + (dy || 0), class: cls || "" }, parent || c.svg); e.textContent = s; return e;
  }
  function fond(c, o2) {
    o2 = o2 || {};
    const { box } = c, g = c.layer("c-label-2");
    if (o2.pas) for (let k = Math.ceil(box.x0 / o2.pas); k * o2.pas <= box.x1; k++) if (k) seg(c, [k * o2.pas, box.t0], [k * o2.pas, box.t1], "grid", g);
    if (o2.pas) for (let k = Math.ceil(box.t0 / o2.pas); k * o2.pas <= box.t1; k++) if (k) seg(c, [box.x0, k * o2.pas], [box.x1, k * o2.pas], "grid", g);
    const a = c.layer("c-label");
    droite(c, [0, 0], [1, 0], "stroke thin", a); droite(c, [0, 0], [0, 1], "stroke thin", a);
    if (o2.x) texte(c, [box.x1, 0], o2.x, "", -4, -6, a).setAttribute("text-anchor", "end");
    if (o2.t) texte(c, [0, box.t1], o2.t, "", 6, 14, a);
    if (o2.lumiere !== false) { const l = c.layer("c-warn"); droite(c, [0, 0], [1, 1], "stroke thin dash", l); droite(c, [0, 0], [1, -1], "stroke thin dash", l); }
  }
  function repere(c, beta, o2) {
    o2 = o2 || {};
    const g = c.layer(o2.cls || "c-tint");
    droite(c, [0, 0], [1, beta], "stroke", g); droite(c, [0, 0], [beta, 1], "stroke", g);
    if (o2.pas) { const gr = graduations(beta, o2.pas, c.box); for (const [x, t] of gr.t.concat(gr.x)) P("circle", { cx: c.sx(x), cy: c.sy(t), r: 2.5, class: "fill" }, g); }
    /* labels at the far end of each axis, inside the frame */
    const ends = [[couper(c.box, [0, 0], [1, beta]), o2.x], [couper(c.box, [0, 0], [beta, 1]), o2.t]];
    for (const [s, lab] of ends) if (s && lab) { const e = s[1], [X, Y] = px(c, e); const t = P("text", { x: X - 6, y: Y + 14, "text-anchor": "end", class: "fill" }, g); t.textContent = lab; }
    return g;
  }
  function hyperbole(c, s2, cls) {
    const g = c.layer(cls || "c-ok");
    for (const b of branches(c.box, s2)) P("path", { d: root.Plot.path(b.map(q => px(c, q))), class: "stroke dash" }, g);
    return g;
  }
  function cones(c, p, o2) {
    o2 = o2 || {};
    const g = c.layer(o2.cls || "c-tint"), R = 4 * Math.max(c.box.x1 - c.box.x0, c.box.t1 - c.box.t0);
    for (const s of [1, -1]) {
      const pts = [p, [p[0] - R, p[1] + s * R], [p[0] + R, p[1] + s * R]].map(q => px(c, q).map(v => v.toFixed(1)).join(",")).join(" ");
      P("polygon", { points: pts, class: "fill", "fill-opacity": s > 0 ? 0.14 : 0.08, "clip-path": "url(#" + clip(c) + ")" }, g);
    }
    return g;
  }
  let nclip = 0;
  function clip(c) {
    if (c.clipId) return c.clipId;
    c.clipId = "mk-clip-" + (++nclip);
    const d = P("defs", {}, c.svg), cp = P("clipPath", { id: c.clipId }, d);
    const [x0, y0] = px(c, [c.box.x0, c.box.t1]), [x1, y1] = px(c, [c.box.x1, c.box.t0]);
    P("rect", { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, cp);
    return c.clipId;
  }
  function chemin(c, pts, cls, parent) { return P("path", { d: root.Plot.path(pts.map(q => px(c, q))), class: cls || "stroke bold" }, parent || c.svg); }
  function point(c, p, r, cls, s) {
    const g = c.layer(cls || "c-tint"), [x, y] = px(c, p);
    P("circle", { cx: x, cy: y, r: r || 5, class: "fill" }, g);
    if (s) { const t = P("text", { x: x + 8, y: y - 8, class: "fill" }, g); t.textContent = s; }
    return g;
  }
  /* dragging: the handler survives a redraw (it is on the SVG, and reads c through getC) */
  function glisser(svg, getC, cb) {
    let on = false, raf = 0, last = null;
    const monde = e => { const c = getC(), r = svg.getBoundingClientRect(), k = c.o.W / r.width;
      return [c.sx.inv((e.clientX - r.left) * k), c.sy.inv((e.clientY - r.top) * k)]; };
    const go = e => { last = monde(e); if (!raf) raf = requestAnimationFrame(() => { raf = 0; cb(last); }); };
    svg.addEventListener("pointerdown", e => { on = true; svg.setPointerCapture(e.pointerId); e.preventDefault(); go(e); });
    svg.addEventListener("pointermove", e => { if (on) go(e); });
    const stop = () => { on = false; };
    svg.addEventListener("pointerup", stop); svg.addEventListener("pointercancel", stop);
  }

  function fleche(c, A, B, cls, o2) { return root.Plot.fleche(c.svg, px(c, A), px(c, B), Object.assign({ cls: cls || "c-tint" }, o2)); }

  const api = { couper, branches, graduations, cadre, fond, droite, repere, hyperbole, cones, chemin, point, fleche, glisser };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Minkowski = api;
})(typeof self !== "undefined" ? self : this);

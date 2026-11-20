/* Carte de sillage — the drawings of the step « Sillages et écoulement de Couette »: streamlines around a cylinder for a
   Reynolds number, one model per regime (Fluides), and the curve Cx(Re) with its regimes. DOM only, global CarteSillage;
   needs /plot.js, /analyse-vectorielle.js, /carte-champ.js, /fluides.js. Colours come from ds.css classes only.

   modele(re, o)            → { psi, vs }: the stream function (U = 1, a = 1, D = 2) and the point vortices drawn, for the regime
                            of re: Lamb's inner solution below Re = 5 (computed at Re = 0,01, where it holds over the whole frame), a perfect fluid with a pair of
                            attached vortices up to 47, a Kármán street of pitch D/St beyond. o.parfait: the perfect fluid alone. Without vortices the frame is centred on the cylinder.
                            Vortex positions and strengths are illustrative: they give the look of each regime, not a solution.
   carte(svg, re, o)        streamlines entering evenly spaced on the left edge, the dividing streamline thick, the vortices
                            as dots (.c-warn clockwise, .c-tint counterclockwise), the cylinder.
   cx(svg, F, t, re, o)     Cx(Re), log–log: Lamb, White, Roshko's value past the crisis, the bands of the
                            regimes (texts t("cx.band.<regime>")), a dot at re. o.parfait adds the note t("cx.parfait"). */
(function (root) {
  const P = (...a) => root.Plot.el(...a), FL = () => root.Fluides;
  const X0 = -3, X1 = 13, W = 640, H = 300, Y1 = (X1 - X0) * H / W / 2;

  function modele(re, o) {
    const Fl = FL(), U = 1, a = 1;
    if (o && o.parfait) return { psi: Fl.psiTourbillons(U, a, []), vs: [] };
    const reg = Fl.regimeCylindre(re);
    if (reg === "rampant") return { psi: Fl.psiLamb(U, a, 0.01), vs: [] };
    if (reg === "attache") {
      const s = (re - Fl.CYL.decolle) / (Fl.CYL.allee - Fl.CYL.decolle), x = 1.35 + 1.4 * s, y = 0.45 + 0.25 * s, G = 2 * Math.PI * (0.5 + 0.7 * s);
      const vs = [[x, y, -G], [x, -y, G]];
      return { psi: Fl.psiTourbillons(U, a, vs), vs };
    }
    const st = Fl.strouhal(re), l = 2 / (isFinite(st) ? st : Fl.CYL.stPlateau), G = 2 * Math.PI * (reg === "allee" ? 0.9 : 0.55);
    const vs = Fl.allee(2.6, reg === "allee" ? l : 0.8 * l, 8, G);
    return { psi: Fl.psiTourbillons(U, a, vs), vs };
  }

  function carte(svg, re, o) {
    const C = root.CarteChamp, m = modele(re, o), sym = m.vs.length === 0, x0 = sym ? -(X1 - X0) / 2 : X0;
    const c = C.carte(svg, { W, H, x0, x1: x0 + X1 - X0, y0: -Y1, y1: Y1 });
    const bord = m.psi([1, 0]);
    /* inside the cylinder, the sign of the odd continuation through the circle (inverse point p/|p|²), by a hair: the level
       ψ = bord follows the circle, no other level enters it */
    const f = p => { const r2 = p[0] * p[0] + p[1] * p[1]; if (r2 >= 1) return m.psi(p);
      const d = r2 < 1e-6 ? 0 : bord - m.psi([p[0] / r2, p[1] / r2]); return bord + 1e-9 * Math.sign(d); };
    const niv = [];
    for (let k = -7; k <= 7; k++) if (k) niv.push(f([x0, k * Y1 / 7.5]));
    niv.push(bord);
    C.niveaux(c, f, niv.filter(Number.isFinite), { n: [161, 76], epais: niv.length - 1, cls: "c-label" });
    m.vs.forEach(([x, y, G]) => { if (x < X1) C.point(c, [x, y], 4, G < 0 ? "c-warn" : "c-tint"); });
    P("circle", { cx: c.sx(0).toFixed(1), cy: c.sy(0).toFixed(1), r: (c.sx(1) - c.sx(0)).toFixed(1), class: "fill c-label-2" }, c.layer());
    return c;
  }

  function cx(svg, F, t, re, o) {
    const Fl = FL();
    svg.innerHTML = "";
    const { x, y, g } = root.Plot.axes(svg, { fmt: F, w: 640, h: 300,
      x: { scale: "log", domain: [0.1, 1e7], label: t("cx.x") }, y: { scale: "log", domain: [0.1, 100], label: t("cx.y") } });
    const top = y(100), bas = y(0.1);
    P("rect", { x: x(Fl.CYL.crise).toFixed(1), y: top, width: (x(Fl.CYL.superc) - x(Fl.CYL.crise)).toFixed(1), height: (bas - top).toFixed(1), class: "fill c-tint", opacity: 0.12 }, g);
    [Fl.CYL.decolle, Fl.CYL.allee].forEach(v => P("line", { x1: x(v), x2: x(v), y1: top, y2: bas, class: "stroke thin dash c-label-2" }, g));
    [["rampant", 0.1, 5], ["attache", 5, 47], ["allee", 47, 1.5e5], ["crise", 1.5e5, 3.5e6], ["supercritique", 3.5e6, 1e7]].forEach(([k, lo, hi]) => {
      const e = P("text", { x: ((x(lo) + x(hi)) / 2).toFixed(1), y: top + 14, "text-anchor": "middle", class: "tick" }, g); e.textContent = t("cx.band." + k); });
    const courbe = (fn, lo, hi, cls) => {
      const pts = [];
      for (let i = 0; i <= 160; i++) { const r = Math.pow(10, Math.log10(lo) + (Math.log10(hi) - Math.log10(lo)) * i / 160), v = fn(r); if (isFinite(v) && v >= 0.1 && v <= 100) pts.push([x(r), y(v)]); }
      P("path", { d: root.Plot.path(pts), class: cls }, g);
    };
    courbe(Fl.cxLamb, 0.1, 1, "stroke thin dash c-warn");
    courbe(Fl.cxWhite, 1, Fl.CYL.whiteMax, "curve");
    P("line", { x1: x(Fl.CYL.superc), x2: x(1e7), y1: y(Fl.CYL.cxSuper), y2: y(Fl.CYL.cxSuper), class: "stroke c-label-2" }, g);
    if (o && o.parfait) { const e = P("text", { x: x(1e4), y: bas - 8, "text-anchor": "middle", class: "tick" }, g); e.textContent = t("cx.parfait"); }
    if (re !== undefined) {
      const v = Fl.cxCylindre(re);
      if (isFinite(v) && v >= 0.1 && v <= 100) P("circle", { cx: x(re), cy: y(v), r: 6, class: "dot" }, g);
      else if (re >= 0.1 && re <= 1e7) P("line", { x1: x(re), x2: x(re), y1: top, y2: bas, class: "stroke c-warn" }, g);
    }
    return { x, y, g };
  }

  const api = { modele, carte, cx };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CarteSillage = api;
})(typeof self !== "undefined" ? self : this);

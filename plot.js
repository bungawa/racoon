/* Minimal SVG plotting for lessons. Pure scales, an axes builder, and the shared pixel drawings (path, arrow). */
(function (root) {
  function linScale(d0, d1, r0, r1) {
    if (d0 === d1) throw new Error("plot: empty domain");
    const f = v => r0 + (v - d0) * (r1 - r0) / (d1 - d0);
    f.inv = p => d0 + (p - r0) * (d1 - d0) / (r1 - r0);
    return f;
  }

  function logScale(d0, d1, r0, r1) {
    if (!(d0 > 0 && d1 > 0)) throw new Error("plot: log domain must be positive");
    const l = linScale(Math.log10(d0), Math.log10(d1), r0, r1);
    const f = v => l(Math.log10(v));
    f.inv = p => Math.pow(10, l.inv(p));
    return f;
  }

  function linTicks(d0, d1, n) {
    n = n || 5;
    const raw = (d1 - d0) / n, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 5, 10].map(m => m * mag).find(s => s >= raw);
    const out = [];
    for (let v = Math.ceil(d0 / step) * step; v <= d1 + step * 1e-9; v += step) out.push(+v.toPrecision(12));
    return out;
  }

  function logTicks(d0, d1) {
    const out = [];
    for (let e = Math.ceil(Math.log10(d0) - 1e-9); e <= Math.floor(Math.log10(d1) + 1e-9); e++) out.push(Math.pow(10, e));
    return out;
  }

  const NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* axes(svg, {fmt, w,h,pad,x:{scale:'lin'|'log',domain,label,fmt}, y:{...}}) → {x, y, g}; o.fmt = Fmt.forLang(lang) */
  function axes(svg, o) {
    const F = o.fmt;
    const p = Object.assign({ l: 56, r: 16, t: 12, b: 40 }, o.pad);
    svg.setAttribute("viewBox", "0 0 " + o.w + " " + o.h);
    const mk = (a, r0, r1) => (a.scale === "log" ? logScale : linScale)(a.domain[0], a.domain[1], r0, r1);
    const x = mk(o.x, p.l, o.w - p.r), y = mk(o.y, o.h - p.b, p.t);
    const g = el("g", { class: "axes" }, svg);
    const tk = a => a.scale === "log" ? logTicks(a.domain[0], a.domain[1]) : linTicks(a.domain[0], a.domain[1], a.ticks);
    const fmt = a => a.fmt || (v => a.scale === "log" ? "10" + F.sup(Math.round(Math.log10(v))) : F.num(v, 6));
    tk(o.x).forEach(v => {
      el("line", { x1: x(v), x2: x(v), y1: p.t, y2: o.h - p.b, class: "grid" }, g);
      el("text", { x: x(v), y: o.h - p.b + 16, "text-anchor": "middle", class: "tick" }, g).textContent = fmt(o.x)(v);
    });
    tk(o.y).forEach(v => {
      el("line", { x1: p.l, x2: o.w - p.r, y1: y(v), y2: y(v), class: "grid" }, g);
      el("text", { x: p.l - 6, y: y(v) + 4, "text-anchor": "end", class: "tick" }, g).textContent = fmt(o.y)(v);
    });
    el("line", { x1: p.l, x2: o.w - p.r, y1: o.h - p.b, y2: o.h - p.b, class: "axis" }, g);
    el("line", { x1: p.l, x2: p.l, y1: p.t, y2: o.h - p.b, class: "axis" }, g);
    if (o.x.label) el("text", { x: (p.l + o.w - p.r) / 2, y: o.h - 6, "text-anchor": "middle", class: "label" }, g).textContent = o.x.label;
    if (o.y.label) el("text", { x: 12, y: (p.t + o.h - p.b) / 2, "text-anchor": "middle", class: "label", transform: "rotate(-90 12 " + (p.t + o.h - p.b) / 2 + ")" }, g).textContent = o.y.label;
    return { x, y, g };
  }

  /* path([[x, y], …]) → "M x y L x y …": the d of an SVG path through points already in pixels */
  const path = pts => pts.map(([px, py], i) => (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1)).join("");

  /* fleche(parent, A, B, o) → g: an arrow in pixels from A = [x, y] to B, the head at B; the shaft is the first child.
     o.cls: class of the group (colour); o.tete: largest head length (px, default 9), never more than half the arrow;
     o.trait: class of the shaft (default "stroke"); o.ouverte: an open chevron, stroked like the shaft, instead of a filled
     head; o.min: shorter than this (px, default 1), the group stays empty. */
  function fleche(parent, A, B, o) {
    o = o || {};
    const g = el("g", o.cls ? { class: o.cls } : {}, parent), [x1, y1] = A, [x2, y2] = B, d = Math.hypot(x2 - x1, y2 - y1);
    if (!(d >= (o.min === undefined ? 1 : o.min))) return g;
    const ux = (x2 - x1) / d, uy = (y2 - y1) / d, s = Math.min(o.tete || 9, d / 2), trait = o.trait || "stroke";
    const r = o.ouverte ? 0 : 0.8 * s;                                       // a filled head covers the end of the shaft
    el("line", { x1: +x1.toFixed(1), y1: +y1.toFixed(1), x2: +(x2 - r * ux).toFixed(1), y2: +(y2 - r * uy).toFixed(1), class: trait }, g);
    const tete = [[x2 - s * ux - 0.45 * s * uy, y2 - s * uy + 0.45 * s * ux], [x2, y2], [x2 - s * ux + 0.45 * s * uy, y2 - s * uy - 0.45 * s * ux]]
      .map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
    el(o.ouverte ? "polyline" : "polygon", { points: tete, class: o.ouverte ? trait : "fill" }, g);
    return g;
  }

  const api = { linScale, logScale, linTicks, logTicks, axes, el, path, fleche };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Plot = api;
})(typeof self !== "undefined" ? self : this);

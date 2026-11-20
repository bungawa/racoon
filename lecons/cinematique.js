/* Numerics for the « Cinématique » lessons (Feynman I.8.1 to I.8.5): position tables, finite differences, Riemann sums,
   second derivative and acceleration in a turn. Pure, no DOM, UMD (global Cine). SI throughout: t in s, x in m, v in m·s⁻¹, a in m·s⁻².
   Shared by decrire-le-mouvement, vitesse, vitesse-derivee, distance-integrale and acceleration. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G = Cst.g_CPGE;                                // m·s⁻², standard value rounded

  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) throw new Error("cine: " + name + " doit être un nombre fini"); };
  const step = h => { finite(h, "h"); if (!(h > 0)) throw new Error("cine: le pas h doit être strictement positif"); };

  /* ---------- tables x(t) ---------- */
  function checkTable(ts, xs) {
    if (!Array.isArray(ts) || !Array.isArray(xs) || ts.length < 2 || ts.length !== xs.length) throw new Error("cine: table vide ou colonnes de longueurs différentes");
    ts.forEach((t, i) => { finite(t, "t"); finite(xs[i], "x"); if (i && !(t > ts[i - 1])) throw new Error("cine: instants non strictement croissants"); });
  }
  /* linear interpolation between the measured points; outside the table nothing is known: NaN, never an extrapolation */
  function interp(ts, xs, t) {
    checkTable(ts, xs);
    if (typeof t !== "number" || !(t >= ts[0] && t <= ts[ts.length - 1])) return NaN;
    let lo = 0, hi = ts.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (ts[m] <= t) lo = m; else hi = m; }
    return xs[lo] + (xs[hi] - xs[lo]) * (t - ts[lo]) / (ts[hi] - ts[lo]);
  }
  /* average speed between rows i and j of a table */
  function average(ts, xs, i, j) {
    checkTable(ts, xs);
    if (!(Number.isInteger(i) && Number.isInteger(j) && i >= 0 && j >= 0 && i < ts.length && j < ts.length && i !== j)) throw new Error("cine: lignes invalides");
    return (xs[j] - xs[i]) / (ts[j] - ts[i]);
  }
  /* a table sampled from a law x(t): n + 1 rows from t0 to t1 */
  function sample(x, t0, t1, n) {
    if (!Number.isInteger(n) || n < 1) throw new Error("cine: n entier ≥ 1");
    const ts = [], xs = [];
    for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n; ts.push(t); xs.push(x(t)); }
    return { t: ts, x: xs };
  }

  /* a car on a straight road, one row every 10 s (an original table in the spirit of Feynman's Table 8-1):
     it speeds up, brakes, waits at a red light, sets off again, and is stopped at the end */
  const CAR = { t: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: [0, 60, 200, 420, 450, 455, 560, 780, 1040, 1100] };
  /* a ball dropped from rest, x counted downward: x = g t²/2, one row every 0,5 s */
  const fall = t => G * t * t / 2;
  const BALL = sample(fall, 0, 3, 6);

  /* Zeno: Achilles (speed va) starts d behind the tortoise (speed vt < va). Each step he runs to where she was.
     After n steps: elapsed time and remaining gap. The durations form a geometric series of sum d / (va - vt). */
  function zeno(d, va, vt, n) {
    [d, va, vt].forEach((v, i) => finite(v, ["d", "va", "vt"][i]));
    if (!(d >= 0 && va > 0 && vt >= 0 && vt < va)) throw new Error("cine: il faut 0 ≤ vt < va et d ≥ 0");
    if (!Number.isInteger(n) || n < 0) throw new Error("cine: n entier ≥ 0");
    const r = vt / va;
    return { time: d / va * (r === 0 ? (n ? 1 : 0) : (1 - Math.pow(r, n)) / (1 - r)), gap: d * Math.pow(r, n), limit: d / (va - vt) };
  }

  /* ---------- derivatives ---------- */
  function forward(f, t, h) { finite(t, "t"); step(h); return (f(t + h) - f(t)) / h; }
  function central(f, t, h) { finite(t, "t"); step(h); return (f(t + h) - f(t - h)) / (2 * h); }

  /* polynomials as coefficient arrays, c[k] multiplies t^k */
  const polyEval = (c, t) => c.reduceRight((acc, a) => acc * t + a, 0);
  const polyDeriv = c => c.length <= 1 ? [0] : c.slice(1).map((a, k) => a * (k + 1));
  const polyInteg = (c, c0) => [c0 || 0].concat(c.map((a, k) => a / (k + 1)));

  /* motions for the derivative lab: x(t), its exact derivative v(t) and acceleration a(t) */
  const CUBIC = [1, 2, 0, 0.5];                        // x = A t³ + B t + C, A = 0,5 m·s⁻³, B = 2 m·s⁻¹, C = 1 m
  const OSC = { X: 0.1, w: 2 * Math.PI };              // x = X cos ωt, X = 0,1 m, ω = 2π rad·s⁻¹
  const MOTIONS = {
    chute: { x: fall, v: t => G * t, a: () => G },
    cubique: { x: t => polyEval(CUBIC, t), v: t => polyEval(polyDeriv(CUBIC), t), a: t => polyEval(polyDeriv(polyDeriv(CUBIC)), t) },
    oscillation: { x: t => OSC.X * Math.cos(OSC.w * t), v: t => -OSC.X * OSC.w * Math.sin(OSC.w * t), a: t => -OSC.X * OSC.w * OSC.w * Math.cos(OSC.w * t) },
  };

  /* least-squares slope of log|err| against log h: the observed order of a method. Zero errors carry no information. */
  function order(hs, errs) {
    const pts = hs.map((h, i) => [h, Math.abs(errs[i])]).filter(([h, e]) => h > 0 && e > 0 && isFinite(e));
    if (pts.length < 2) throw new Error("cine: au moins deux erreurs non nulles");
    const X = pts.map(p => Math.log(p[0])), Y = pts.map(p => Math.log(p[1])), n = pts.length;
    const mx = X.reduce((s, v) => s + v, 0) / n, my = Y.reduce((s, v) => s + v, 0) / n;
    let sxy = 0, sxx = 0; X.forEach((x, i) => { sxy += (x - mx) * (Y[i] - my); sxx += (x - mx) * (x - mx); });
    if (sxx === 0) throw new Error("cine: tous les pas sont égaux");
    return sxy / sxx;
  }

  /* ---------- integrals ---------- */
  const RULES = ["gauche", "droite", "milieu", "trapezes"];
  /* the n slices of [a, b]: rectangles (y0 = y1) or trapezoids, each of area (t1 - t0)(y0 + y1)/2 */
  function cells(f, a, b, n, rule) {
    finite(a, "a"); finite(b, "b");
    if (!Number.isInteger(n) || n < 1) throw new Error("cine: n entier ≥ 1");
    if (!RULES.includes(rule)) throw new Error("cine: méthode inconnue " + rule);
    const h = (b - a) / n, out = [];
    for (let i = 0; i < n; i++) {
      const t0 = a + i * h, t1 = i === n - 1 ? b : a + (i + 1) * h;
      if (rule === "trapezes") { out.push({ t0, t1, y0: f(t0), y1: f(t1) }); continue; }
      const y = f(rule === "gauche" ? t0 : rule === "droite" ? t1 : (t0 + t1) / 2);
      out.push({ t0, t1, y0: y, y1: y });
    }
    return out;
  }
  function riemann(f, a, b, n, rule) {
    return cells(f, a, b, n, rule).reduce((s, c) => s + (c.t1 - c.t0) * (c.y0 + c.y1) / 2, 0);
  }

  /* velocity profiles for the integral lab, each with its exact primitive X (X(0) = 0) and the distance travelled ∫|v| */
  const DEM = { V: 30, tau: 5 }, VA = { V: 2, w: 1 };
  const PROFILES = {
    chute: { a: 0, b: 3, v: t => G * t, X: fall, dist: G * 9 / 2 },
    demarrage: { a: 0, b: 20, v: t => DEM.V * (1 - Math.exp(-t / DEM.tau)), X: t => DEM.V * (t - DEM.tau * (1 - Math.exp(-t / DEM.tau))),
      dist: DEM.V * (20 - DEM.tau * (1 - Math.exp(-20 / DEM.tau))) },
    vaetvient: { a: 0, b: 3 * Math.PI / 2, v: t => VA.V * Math.cos(VA.w * t), X: t => VA.V / VA.w * Math.sin(VA.w * t), dist: 3 * VA.V / VA.w },
  };

  /* ---------- acceleration (I.8.5) ---------- */
  /* centered second difference: [x(t + h) - 2 x(t) + x(t - h)] / h², error ∝ h² */
  function second(f, t, h) { finite(t, "t"); step(h); return (f(t + h) - 2 * f(t) + f(t - h)) / (h * h); }

  /* Galileo: from rest at constant acceleration, the distances covered in successive equal intervals go as 1, 3, 5, 7…
     returns the n distances for intervals of duration tau */
  function oddRule(a, tau, n) {
    finite(a, "a"); step(tau);
    if (!Number.isInteger(n) || n < 1) throw new Error("cine: n entier ≥ 1");
    const x = t => a * t * t / 2;
    return Array.from({ length: n }, (_, i) => x((i + 1) * tau) - x(i * tau));
  }

  /* uniform circular motion of radius R at speed v, counterclockwise, starting on the x axis */
  function circle(R, v) {
    finite(R, "R"); finite(v, "v");
    if (!(R > 0)) throw new Error("cine: le rayon R doit être strictement positif");
    if (!(v >= 0)) throw new Error("cine: la vitesse v doit être positive ou nulle");
    const w = v / R;
    return {
      R, v, w, a: v * v / R, T: w > 0 ? 2 * Math.PI / w : Infinity,
      pos: t => [R * Math.cos(w * t), R * Math.sin(w * t)],
      vel: t => [-v * Math.sin(w * t), v * Math.cos(w * t)],
      acc: t => [-w * v * Math.cos(w * t), -w * v * Math.sin(w * t)],
    };
  }
  /* average acceleration Δv/Δt between t and t + dt on that circle: the vector and its norm.
     Exactly 2 v sin(ω dt/2)/dt in norm, pointing to the centre from the middle of the arc: always below v²/R, tends to it. */
  function turnAverage(R, v, dt) {
    const c = circle(R, v); step(dt);
    const v0 = c.vel(0), v1 = c.vel(dt), d = [(v1[0] - v0[0]) / dt, (v1[1] - v0[1]) / dt];
    return { dv: [v1[0] - v0[0], v1[1] - v0[1]], a: d, norm: Math.hypot(d[0], d[1]), exact: c.a, angle: c.w * dt };
  }

  const api = { second, oddRule, circle, turnAverage, G, interp, average, sample, CAR, BALL, fall, zeno, forward, central, polyEval, polyDeriv, polyInteg, CUBIC, OSC, MOTIONS, order, RULES, cells, riemann, PROFILES, DEM, VA };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Cine = api;
})(typeof self !== "undefined" ? self : this);

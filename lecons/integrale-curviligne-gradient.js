/* Curviligne — the plate of the lesson « Intégrale curviligne d'un gradient » (Feynman II.3.1): a temperature field T(x, y),
   two points, three paths from one to the other, and a field that is the gradient of nothing. Pure, no DOM, UMD (global
   Curviligne). SI: positions in m, temperatures in K, gradients in K·m⁻¹. Line integrals: AnaVec.circulation(F, chemin, n).

   The plate
     PLAQUE                 { LX: 0,60 m, LY: 0,40 m, T0: 293,15 K }: a thin plate, corner (0, 0), T0 the level of its linear part.
     temperature(p)         T = T0 + 40 x + 60 g(p; (0,30; 0,28), 0,08) − 30 g(p; (0,28; 0,08), 0,07), g the Gaussian bump
                            exp(−|p − c|²/2σ²): a slope of 40 K·m⁻¹ along x, a hot spot and a cold spot. A field chosen to be
                            smooth and uneven, not solved from the heat equation: only its gradient matters in the lesson.
     gradient(p)            ∇T, exact.
     bornes(n)              { tmin, tmax, gmax } of T and of |∇T| on an (n + 1) × (n + 1) grid of the plate, corners included
                            (default n = 240: 2,5 mm by 1,7 mm, enough for 3 digits).
   Two points and three paths (s ∈ [0, 1] → point, from P1 at s = 0 to P2 at s = 1)
     P1, P2                 [0,05; 0,08] and [0,55; 0,32].
     CHEMINS.droit          the segment P1 P2.
     CHEMINS.detour         a parabolic arc (Bézier) through the control point (0,12; 0,50): a long way round, near the hot spot.
     CHEMINS.zigzag         the segment with a sine of amplitude 5 cm across it, 2,5 periods.
   A field that is not a gradient
     tourbillon(p)          C = 200 (−(y − 0,30), x − 0,35) K·m⁻¹: rotation as a whole about (0,35; 0,30), ∇ × C = 400 K·m⁻²
                            everywhere. Its line integral from P1 to P2 depends on the path. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const PLAQUE = Object.freeze({ LX: 0.6, LY: 0.4, T0: 293.15 });
  const BOSSES = [[60, [0.3, 0.28], 0.08], [-30, [0.28, 0.08], 0.07]];        // [amplitude K, centre m, width m]
  const bosse = (p, c, s) => Math.exp(-((p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2) / (2 * s * s));
  const temperature = p => BOSSES.reduce((T, [a, c, s]) => T + a * bosse(p, c, s), PLAQUE.T0 + 40 * p[0]);
  const gradient = p => BOSSES.reduce((g, [a, c, s]) => {
    const k = -a * bosse(p, c, s) / (s * s);
    return [g[0] + k * (p[0] - c[0]), g[1] + k * (p[1] - c[1])];
  }, [40, 0]);
  function bornes(n) {
    n = n === undefined ? 240 : n;
    if (!(Number.isInteger(n) && n >= 1)) throw new Error("curviligne : n entier ≥ 1");
    let tmin = Infinity, tmax = -Infinity, gmax = 0;
    for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) {
      const p = [PLAQUE.LX * i / n, PLAQUE.LY * j / n], T = temperature(p);
      tmin = Math.min(tmin, T); tmax = Math.max(tmax, T); gmax = Math.max(gmax, Math.hypot(...gradient(p)));
    }
    return { tmin, tmax, gmax };
  }

  const P1 = Object.freeze([0.05, 0.08]), P2 = Object.freeze([0.55, 0.32]);
  const lin = s => [P1[0] + (P2[0] - P1[0]) * s, P1[1] + (P2[1] - P1[1]) * s];
  const nrm = (() => { const d = [P2[0] - P1[0], P2[1] - P1[1]], l = Math.hypot(...d); return [-d[1] / l, d[0] / l]; })();
  const CHEMINS = Object.freeze({
    droit: lin,
    detour: s => [0, 1].map(i => (1 - s) ** 2 * P1[i] + 2 * s * (1 - s) * [0.12, 0.5][i] + s * s * P2[i]),
    zigzag: s => { const p = lin(s), o = 0.05 * Math.sin(5 * Math.PI * s); return [p[0] + o * nrm[0], p[1] + o * nrm[1]]; },
  });
  const tourbillon = p => [-200 * (p[1] - 0.3), 200 * (p[0] - 0.35)];

  const api = { PLAQUE, temperature, gradient, bornes, P1, P2, CHEMINS, tourbillon };
  if (node) module.exports = api; else root.Curviligne = api;
})(typeof self !== "undefined" ? self : this);

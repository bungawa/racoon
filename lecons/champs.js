/* Champs — the fields of the step « Champs et gradient » (Feynman II.2.1–2.4): a heated plate T(x, y), the gravitational
   potential of the Earth and the Moon, the pressure in a tank of water. Pure, no DOM, UMD (global Champs). SI throughout.
   Reads Constantes (GM_E, g0, atm), Kepler (LUNE: Earth–Moon distance and mass ratio) and AnaVec (derivatives, grids).

   The plate (a scalar field that is a true steady state, not a drawing)
     PLAQUE                         square copper plate, side L, three edges at T0, the top edge (y = L) heated to
                                    T0 + ΔT [sin(πx/L) + a sin(2πx/L)]; faces insulated. a = 0: symmetric heating.
     temperature(p, a)              T(x, y) = T0 + ΔT Σ c_n sin(nπx/L) sinh(nπy/L)/sinh(nπ), c_1 = 1, c_2 = a. Each term solves
                                    ∂²T/∂x² + ∂²T/∂y² = 0 (steady conduction without loss) and meets the edge temperatures.
     gradientPlaque(p, a)           the exact ∇T, to check the finite differences.
     pertesPlaque()                 2 h L²/(λ e): heat lost through the insulated faces against heat conducted along the
                                    plate, the number that the model neglects.
   Flux through a tilted window (II.2.2)
     fluxIncline(h, theta)          ΔJ/Δa through a surface whose normal makes the angle theta with h: h cos θ = h · n.
   Axes turned by phi (II.2.3, eq. 2.26)
     tourne(v, phi)                 components of the plane vector v on axes x′, y′ turned by phi.
   The Earth and the Moon (II.2.1: what the equation says before it is solved)
     TERRE_LUNE                     { d, mu, GM }: distance, Moon/Earth mass ratio, GM of the Earth. Earth at the origin,
                                    Moon at (d, 0).
     potentielTL(p, mu)             gravitational potential φ, J·kg⁻¹, point masses.
     champTL(p, mu)                 g = −∇φ, m·s⁻², exact.
     pointNeutre(mu)                x where g = 0 on the axis, frame not rotating: d/(1 + √μ).
     pointL1(mu)                    the same point in the frame turning with the Moon (centrifugal term added, bisection):
                                    the Lagrange point L1. ecartRotation(mu): centrifugal acceleration at the neutral point,
                                    relative to the Earth's pull there — what the first picture neglects.
   The tank (II.2.4: the same ∇ on another function)
     CUVE                           { H, rho }: depth and density of water.
     pression(p)                    p = p_atm + ρ g (H − y), Pa, y measured up from the bottom; ∇p = (0, −ρ g).
   Drawing helpers (numbers only; the page draws)
     opacite(v, min, max)           0,06 to 0,86, linear in v: the tint of a heat-map cell.
     fleches(F, x0, x1, nx, y0, y1, ny, lmax)  arrows of a vector field on a grid, scaled so that the largest is lmax long
                                    (field units → length units): [{ p, q, n }], n = |F| at p.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Kepler = node ? require("./kepler.js") : root.Kepler;
  const AnaVec = node ? require("../analyse-vectorielle.js") : root.AnaVec;
  const err = m => { throw new Error("champs : " + m); };
  const finite = (x, nom) => { if (!Number.isFinite(x)) err(nom + " doit être un nombre fini"); return x; };

  /* ---------- the plate ---------- */
  const PLAQUE = Object.freeze({
    L: 0.1,          // m, side
    e: 0.005,        // m, thickness
    lambda: 400,     // W·m⁻¹·K⁻¹, copper, order of magnitude
    h: 2,            // W·m⁻²·K⁻¹, through 2 cm of foam (λ ≈ 0,04 W·m⁻¹·K⁻¹) on each face
    T0: 293.15,      // K, the three cold edges (20 °C)
    dT: 60,          // K, peak heating of the top edge
  });
  const modes = a => [[1, 1], [2, a === undefined ? 0 : finite(a, "a")]];
  function temperature(p, a) {
    const { L, T0, dT } = PLAQUE, [x, y] = p;
    return T0 + dT * modes(a).reduce((s, [n, c]) => s + c * Math.sin(n * Math.PI * x / L) * Math.sinh(n * Math.PI * y / L) / Math.sinh(n * Math.PI), 0);
  }
  function gradientPlaque(p, a) {
    const { L, dT } = PLAQUE, [x, y] = p;
    return modes(a).reduce((g, [n, c]) => {
      const k = n * Math.PI / L, s = dT * c / Math.sinh(n * Math.PI);
      return [g[0] + s * k * Math.cos(k * x) * Math.sinh(k * y), g[1] + s * k * Math.sin(k * x) * Math.cosh(k * y)];
    }, [0, 0]);
  }
  const pertesPlaque = () => 2 * PLAQUE.h * PLAQUE.L ** 2 / (PLAQUE.lambda * PLAQUE.e);

  /* ---------- flux, axes ---------- */
  function fluxIncline(h, theta) { finite(h, "h"); finite(theta, "theta"); return h * Math.cos(theta); }
  function tourne(v, phi) {
    if (!Array.isArray(v) || v.length !== 2) err("vecteur du plan attendu");
    const c = Math.cos(phi), s = Math.sin(phi);
    return [v[0] * c + v[1] * s, -v[0] * s + v[1] * c];
  }

  /* ---------- the Earth and the Moon ---------- */
  const TERRE_LUNE = Object.freeze({ d: Kepler.LUNE.a, mu: Kepler.LUNE.masse, GM: Cst.GM_E });
  const ratio = mu => { mu = mu === undefined ? TERRE_LUNE.mu : mu; if (!(mu > 0 && mu <= 1)) err("rapport des masses dans ]0 ; 1] attendu"); return mu; };
  function potentielTL(p, mu) {
    mu = ratio(mu); const { d, GM } = TERRE_LUNE;
    return -GM / Math.hypot(p[0], p[1]) - mu * GM / Math.hypot(p[0] - d, p[1]);
  }
  function champTL(p, mu) {
    mu = ratio(mu); const { d, GM } = TERRE_LUNE;
    const r1 = Math.hypot(p[0], p[1]), r2 = Math.hypot(p[0] - d, p[1]);
    return [-GM * p[0] / r1 ** 3 - mu * GM * (p[0] - d) / r2 ** 3, -GM * p[1] / r1 ** 3 - mu * GM * p[1] / r2 ** 3];
  }
  const pointNeutre = mu => TERRE_LUNE.d / (1 + Math.sqrt(ratio(mu)));
  function pointL1(mu) {
    mu = ratio(mu); const { d, GM } = TERRE_LUNE, w2 = GM * (1 + mu) / d ** 3, xG = mu * d / (1 + mu);
    const f = x => GM / x ** 2 - mu * GM / (d - x) ** 2 - w2 * (x - xG);   // net pull towards the Earth, turning frame
    let a = 1e-6 * d, b = d * (1 - 1e-9);
    for (let k = 0; k < 200 && b - a > 1e-9 * d; k++) { const m = (a + b) / 2; if (f(m) > 0) a = m; else b = m; }
    return (a + b) / 2;
  }
  function ecartRotation(mu) {
    mu = ratio(mu); const { d, GM } = TERRE_LUNE, x = pointNeutre(mu);
    return GM * (1 + mu) / d ** 3 * (x - mu * d / (1 + mu)) / (GM / x ** 2);
  }

  /* ---------- the tank ---------- */
  const CUVE = Object.freeze({ H: 1, rho: 1000 });   // m, kg·m⁻³
  const pression = p => Cst.atm + CUVE.rho * Cst.g0 * (CUVE.H - p[1]);

  /* ---------- drawing helpers ---------- */
  function opacite(v, min, max) {
    if (!(max > min)) return 0.46;
    return 0.06 + 0.8 * Math.min(1, Math.max(0, (v - min) / (max - min)));
  }
  function fleches(F, x0, x1, nx, y0, y1, ny, lmax) {
    if (!(lmax > 0)) err("longueur maximale > 0 attendue");
    const pts = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const p = [x0 + (x1 - x0) * (i + 0.5) / nx, y0 + (y1 - y0) * (j + 0.5) / ny], v = F(p);
      pts.push({ p, v, n: AnaVec.norme(v) });
    }
    const big = Math.max(...pts.map(a => a.n).filter(Number.isFinite));
    return pts.filter(a => Number.isFinite(a.n)).map(({ p, v, n }) => ({ p, n, q: big > 0 ? [p[0] + lmax * v[0] / big, p[1] + lmax * v[1] / big] : p.slice() }));
  }

  const api = { PLAQUE, temperature, gradientPlaque, pertesPlaque, fluxIncline, tourne, TERRE_LUNE, potentielTL, champTL, pointNeutre, pointL1,
    ecartRotation, CUVE, pression, opacite, fleches };
  if (node) module.exports = api;
  else root.Champs = api;
})(typeof self !== "undefined" ? self : this);

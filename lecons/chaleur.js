/* Conduction de la chaleur — Fourier's law and the one-dimensional heat equation (Feynman II.2.6; CPGE, diffusion thermique).
   Pure, no DOM, UMD (global Chaleur). SI throughout: m, s, K, W.

   Materials (near 293 K; conductivity κ in W·m⁻¹·K⁻¹, diffusivity a = κ/(ρc) in m²·s⁻¹)
     MATERIAUX                      cuivre, inox (stainless steel 304), verre (window glass).
   Laws
     plaque(kappa, A, d, T1, T2)    heat current through a slab, J = κ (T2 − T1) A / d in W (2.42), from face 2 to face 1.
     fourier(kappa, gradT)          h = −κ ∇T, the heat current density in W·m⁻² (2.44).
   The bar (1D): T(x, t) on [0, L], N points, explicit centred scheme (forward in time, centred in space)
     pasStable(a, dx)               the largest stable time step, dx²/(2a).
     pas(T, r, bords)               one step of T_i ← T_i + r (T_{i+1} − 2T_i + T_{i−1}), r = D dt/dx² ≤ 1/2. bords =
                                    { g, d }: a number holds that end at that temperature; null insulates it (zero flux).
     barre(o)                       o = { L, N, a, kappa, T0, g, d, t }: the bar initially at T0 everywhere, its ends held at g
                                    and d (or insulated, null) from t = 0, followed until t. Returns { x, T, dt, n, hG, hD }:
                                    hG, hD the heat current densities through the ends, positive along +x.
     tau(L, a)                      L²/(π² a): the time constant of the slowest mode of a bar of length L with fixed ends.
     mode(L, a, t)                  exp(−t/tau): how much of a sine profile sin(πx/L) is left at t (exact for the PDE).
     energieRelative(T, dx)         Σ T dx: the heat content per unit ρcA, conserved when both ends are insulated.
   Systems described before the law
     SYSTEMES.barre                 a bar of 10 cm, insulated sideways, one end in boiling water.
     negligeables(mat)              what the 1D model neglects: { fuite: 4hL²/(κD), side losses against conduction along
                                    the bar (small ⇒ 1D); diametre: D/L }.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const err = m => { throw new Error("chaleur : " + m); };
  const pos = (v, n) => { if (!(typeof v === "number" && v > 0 && isFinite(v))) err(n + " > 0 attendu, reçu " + v); return v; };

  const MATERIAUX = {
    cuivre: { kappa: 401, a: 1.11e-4 },
    inox: { kappa: 16, a: 4.2e-6 },
    verre: { kappa: 0.9, a: 3.4e-7 },
  };

  const plaque = (kappa, A, d, T1, T2) => pos(kappa, "κ") * (T2 - T1) * pos(A, "A") / pos(d, "d");
  const fourier = (kappa, gradT) => { pos(kappa, "κ"); return gradT.map(g => -kappa * g); };

  const pasStable = (a, dx) => pos(dx, "dx") ** 2 / (2 * pos(a, "a"));
  function pas(T, r, bords) {
    if (!(r > 0 && r <= 0.5)) err("schéma instable : r = D dt/dx² = " + r + " > 1/2");
    const n = T.length, U = new Array(n);
    for (let i = 1; i < n - 1; i++) U[i] = T[i] + r * (T[i + 1] - 2 * T[i] + T[i - 1]);
    /* an insulated end: mirror point, zero gradient at the wall */
    U[0] = bords.g == null ? T[0] + 2 * r * (T[1] - T[0]) : bords.g;
    U[n - 1] = bords.d == null ? T[n - 1] + 2 * r * (T[n - 2] - T[n - 1]) : bords.d;
    return U;
  }
  function barre(o) {
    const L = pos(o.L, "L"), a = pos(o.a, "a"), N = o.N || 51, t = o.t || 0;
    if (!(Number.isInteger(N) && N >= 3)) err("au moins 3 points");
    if (!(t >= 0)) err("temps t ≥ 0 attendu");
    const dx = L / (N - 1), dtMax = 0.8 * pasStable(a, dx), n = Math.ceil(t / dtMax), dt = n ? t / n : 0;
    if (n > 2e6) err("trop de pas : " + n);
    const x = Array.from({ length: N }, (_, i) => i * dx);
    let T = x.map(() => o.T0);
    if (n) { if (o.g != null) T[0] = o.g; if (o.d != null) T[N - 1] = o.d; }
    const bords = { g: o.g, d: o.d }, r = n ? a * dt / (dx * dx) : 0;
    for (let k = 0; k < n; k++) T = pas(T, r, bords);
    const kappa = o.kappa || 0;
    /* end fluxes: one-sided second-order differences of h = −κ dT/dx */
    const hG = -kappa * (-3 * T[0] + 4 * T[1] - T[2]) / (2 * dx), hD = -kappa * (3 * T[N - 1] - 4 * T[N - 2] + T[N - 3]) / (2 * dx);
    return { x, T, dt, n, hG, hD };
  }
  const tau = (L, a) => pos(L, "L") ** 2 / (Math.PI ** 2 * pos(a, "a"));
  const mode = (L, a, t) => Math.exp(-t / tau(L, a));
  const energieRelative = (T, dx) => T.reduce((s, v, i) => s + v * (i === 0 || i === T.length - 1 ? dx / 2 : dx), 0);

  const SYSTEMES = {
    /* a bar of 10 cm and 1 cm diameter, wrapped in a thick insulating sleeve (assumed: 1 W·m⁻²·K⁻¹ of side exchange);
       one end in boiling water (373 K), the other in a bath at 293 K. */
    barre: { L: 0.1, D: 0.01, Tc: 373.15, Tf: 293.15, hLat: 1 },
  };
  function negligeables(mat) {
    const s = SYSTEMES.barre, m = MATERIAUX[mat];
    if (!m) err("matériau inconnu : " + mat);
    /* side losses against conduction along the bar: m²L² = (4 h / κ D) L², the « fin parameter » squared */
    const fuite = 4 * s.hLat / (m.kappa * s.D) * s.L * s.L;
    return { fuite, diametre: s.D / s.L };
  }

  const api = { MATERIAUX, plaque, fourier, pasStable, pas, barre, tau, mode, energieRelative, SYSTEMES, negligeables };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Chaleur = api;
})(typeof self !== "undefined" ? self : this);

/* Diffusion — local conservation, the point source and the diffusion equation ∂T/∂t = a ∇²T (Feynman II.3.4).
   Pure, no DOM, UMD (global Diffusion). SI throughout: m, s, K, W. Builds on Chaleur (public/lecons/chaleur.js): its materials
   and its explicit step pas(T, r, bords) are not copied here. In a page, load /lecons/chaleur.js before this file.

   Materials (near 293 K; κ in W·m⁻¹·K⁻¹, a = κ/c_v in m²·s⁻¹, c_v the heat capacity per unit volume)
     MATERIAUX                      Chaleur's (cuivre, inox, verre) and eau (water, still: no convection).
     cv(mat)                        κ/a in J·m⁻³·K⁻¹.
   Laws
     sourcePonctuelle(W, R)         h = W/(4πR²), the heat current density at R from a point source of power W, steady (3.24).
     tempsDiffusion(L, a)           L²/a: the time for heat to diffuse over L (order of magnitude, no factor).
     flashDemiTemps(e, a)           0,1388 e²/a: half-rise time of the back face in the flash method (Parker et al., 1961),
                                    a slab of thickness e, adiabatic, one-dimensional.
   A pulse of heat in a bar (1D, insulated ends, explicit centred scheme of Chaleur)
     gaussienne(x, t, a, E, s0)     the exact solution of ∂θ/∂t = a ∂²θ/∂x² on an infinite line for a Gaussian start of width
                                    s0 and area E (in K·m): θ = E/√(2πs²) exp(−x²/2s²), s² = s0² + 2at.
     largeur(t, a, s0)              s = √(s0² + 2at).
     impulsion(o)                   o = { L, N, a, E, s0, t, r }: the bar [−L/2, L/2], N points, starting from that Gaussian,
                                    followed until t with r = a dt/dx² (default 0,4, at most 1/2). Returns { x, T, dt, n, r, aire }:
                                    aire = Σ θ dx (trapezoids), conserved by the scheme when both ends are insulated.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Chaleur = node ? require("./chaleur.js") : root.Chaleur;
  const err = m => { throw new Error("diffusion : " + m); };
  const pos = (v, n) => { if (!(typeof v === "number" && v > 0 && isFinite(v))) err(n + " > 0 attendu, reçu " + v); return v; };

  const MATERIAUX = Object.assign({}, Chaleur.MATERIAUX, { eau: { kappa: 0.59, a: 1.43e-7 } });
  const cv = mat => { const m = MATERIAUX[mat]; if (!m) err("matériau inconnu : " + mat); return m.kappa / m.a; };

  const sourcePonctuelle = (W, R) => { if (!isFinite(W)) err("puissance W finie attendue"); return W / (4 * Math.PI * pos(R, "R") ** 2); };
  const tempsDiffusion = (L, a) => pos(L, "L") ** 2 / pos(a, "a");
  const flashDemiTemps = (e, a) => 0.1388 * pos(e, "e") ** 2 / pos(a, "a");

  const largeur = (t, a, s0) => { if (!(t >= 0)) err("temps t ≥ 0 attendu"); return Math.sqrt(pos(s0, "s0") ** 2 + 2 * pos(a, "a") * t); };
  function gaussienne(x, t, a, E, s0) { const s = largeur(t, a, s0); return E / Math.sqrt(2 * Math.PI) / s * Math.exp(-x * x / (2 * s * s)); }
  const aire = (T, dx) => T.reduce((s, v, i) => s + v * (i === 0 || i === T.length - 1 ? dx / 2 : dx), 0);

  function impulsion(o) {
    const L = pos(o.L, "L"), a = pos(o.a, "a"), s0 = pos(o.s0, "s0"), E = o.E === undefined ? 1 : o.E, N = o.N || 101, t = o.t || 0, r0 = o.r || 0.4;
    if (!(Number.isInteger(N) && N >= 3)) err("au moins 3 points");
    if (!(t >= 0)) err("temps t ≥ 0 attendu");
    if (!(r0 > 0 && r0 <= 0.5)) err("r = a dt/dx² doit être dans ]0 ; 1/2], reçu " + r0);
    const dx = L / (N - 1), x = Array.from({ length: N }, (_, i) => -L / 2 + i * dx);
    const n = Math.ceil(t * a / (r0 * dx * dx)), dt = n ? t / n : 0, r = n ? a * dt / (dx * dx) : 0;
    if (n > 2e6) err("trop de pas : " + n);
    let T = x.map(xi => gaussienne(xi, 0, a, E, s0));
    for (let k = 0; k < n; k++) T = Chaleur.pas(T, r, { g: null, d: null });
    return { x, T, dt, n, r, aire: aire(T, dx) };
  }

  const api = { MATERIAUX, cv, sourcePonctuelle, tempsDiffusion, flashDemiTemps, largeur, gaussienne, impulsion };
  if (node) module.exports = api;
  else root.Diffusion = api;
})(typeof self !== "undefined" ? self : this);

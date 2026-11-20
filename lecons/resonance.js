/* Resonance — the driven, damped oscillator of Feynman I.23 (§23.1 to §23.3) and of the CPGE programme: complex amplitude,
   resonance in elongation and in velocity, quality factor, bandwidth, energy balance, series RLC circuit.
   Pure, no DOM, UMD (global Resonance). SI throughout. Builds on Integ (integration.js), Osc (oscillateur.js) and Constantes,
   and Cx (complexes.js) if loaded: the complex quotient goes through it, else through its closed
   real form. No second complex library. Convention of the course: x(t) = Re(x̂ e^(iωt)), so a lag shows as a negative argument.

   The model everywhere is m ẍ + c ẋ + k x = F₀ cos ωt with a linear (viscous) friction c = mγ, γ = ω₀/Q.
   Every function is a model: its domain is in the comment. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Osc = node ? require("./oscillateur.js") : root.Osc;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  /* Cx (complexes.js) when it is there; otherwise the same quotient in closed real form */
  const Cx = node ? (() => { try { return require("./complexes.js"); } catch (e) { return null; } })() : root.Cx || null;

  const err = m => { throw new Error("resonance: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const QMIN = 1 / Math.SQRT2;                            // elongation resonance exists only above it

  /* ---------- §23.1 complex representation of a sinusoidal quantity ---------- */
  /* x(t) = A cos(ωt + φ) = Re(x̂ e^(iωt)), x̂ = A e^(iφ). The derivative multiplies x̂ by iω: v̂ = iω x̂, â = −ω² x̂. Exact. */
  function phaseur(A, phi, w) {
    finite(A, "A"); finite(phi, "φ"); finite(w, "ω");
    const re = A * Math.cos(phi), im = A * Math.sin(phi);
    const rot = (r, i, t) => r * Math.cos(w * t) - i * Math.sin(w * t);    // Re((r + i·im) e^(iωt))
    return {
      x: { re, im }, v: { re: -w * im, im: w * re }, a: { re: -w * w * re, im: -w * w * im },
      xt: t => rot(re, im, t), vt: t => rot(-w * im, w * re, t), at: t => rot(-w * w * re, -w * w * im, t),
    };
  }

  /* ---------- §23.2 the driven damped oscillator ---------- */
  /* (23.8) complex amplitude per unit force amplitude f = F₀/m: x̂/f̂ = 1/(ω₀² − ω² + iγω), γ = ω₀/Q.
     module, retard = lag of x behind the force in [0, π] (π/2 at ω₀ whatever Q). Linear friction only. */
  function reponse(w0, Q, w, f) {
    positive(w0, "ω₀"); positive(Q, "Q"); finite(w, "ω"); if (w < 0) err("ω ≥ 0");
    f = f == null ? 1 : finite(f, "F₀/m");
    const a = w0 * w0 - w * w, b = w0 * w / Q, d = a * a + b * b;
    const z = Cx ? Cx.div(Cx.c(f), Cx.c(a, b)) : { re: f * a / d, im: -f * b / d };
    const re = z.re, im = z.im, module = Math.abs(f) / Math.sqrt(d), retard = Math.atan2(b, a);
    return {
      re, im, module, retard,
      /* velocity v̂ = iω x̂: amplitude ω|x̂|, lag behind the force retard − π/2 (in phase at ω₀) */
      vitesse: { re: -w * im, im: w * re, module: w * module, retard: retard - Math.PI / 2 },
      x: t => module * Math.cos(w * t - retard), v: t => -w * module * Math.sin(w * t - retard),
    };
  }
  /* elongation resonance: |x̂| has a maximum at ω_r = ω₀√(1 − 1/(2Q²)) only if Q > 1/√2; else null (|x̂| falls from ω = 0).
     gain = |x̂|max / (F₀/k) = Q/√(1 − 1/(4Q²)) */
  function resonanceElongation(w0, Q) {
    positive(w0, "ω₀"); positive(Q, "Q");
    if (!(Q > QMIN)) return null;
    return { w: w0 * Math.sqrt(1 - 1 / (2 * Q * Q)), gain: Q / Math.sqrt(1 - 1 / (4 * Q * Q)) };
  }
  /* velocity resonance: always at ω₀ exactly, where v is in phase with the force; |v̂|max = F₀/c = Q F₀/(mω₀).
     gain = |v̂|max / (F₀/(mω₀)) = Q */
  function resonanceVitesse(w0, Q) { positive(w0, "ω₀"); positive(Q, "Q"); return { w: w0, gain: Q }; }
  /* passband at −3 dB of the velocity (or current): |v̂| ≥ |v̂|max/√2 between ω₁,₂ = ω₀(√(1 + 1/(4Q²)) ∓ 1/(2Q)).
     Δω = ω₂ − ω₁ = ω₀/Q exactly, for any Q; ω₁ω₂ = ω₀² (geometric mean). */
  function bande(w0, Q) {
    positive(w0, "ω₀"); positive(Q, "Q");
    const s = Math.sqrt(1 + 1 / (4 * Q * Q)), h = 1 / (2 * Q);
    return { w1: w0 * (s - h), w2: w0 * (s + h), largeur: w0 * (s + h) - w0 * (s - h) };
  }
  /* the same width read on the elongation curve: |x̂| ≥ |x̂|max/√2. With u = ω², |x̂|⁻² = (ω₀² − u)² + γ²u is a parabola in u:
     minimum at u_r = ω₀² − γ²/2, value D = γ²(ω₀² − γ²/4); the half-power points are u_r ± √D. null without resonance.
     When u_r − √D ≤ 0 the curve never falls to 1/√2 below ω_r: w1 = null and largeur = null. ≈ ω₀/Q for Q ≫ 1. */
  function bandeElongation(w0, Q) {
    const r = resonanceElongation(w0, Q);
    if (!r) return null;
    const g = w0 / Q, ur = w0 * w0 - g * g / 2, sD = Math.sqrt(g * g * (w0 * w0 - g * g / 4));
    const w2 = Math.sqrt(ur + sD), w1 = ur - sD > 0 ? Math.sqrt(ur - sD) : null;
    return { w1, w2, largeur: w1 == null ? null : w2 - w1 };
  }
  /* time for the free part to fall to the fraction p (transient → steady state). Slowest decay rate of the free motion:
     γ/2 when Q ≥ 1/2 (pseudo-periodic or critical), γ/2 − √(γ²/4 − ω₀²) when Q < 1/2 (aperiodic, slower). */
  function etablissement(w0, Q, p) {
    positive(w0, "ω₀"); positive(Q, "Q"); finite(p, "p"); if (!(p > 0 && p < 1)) err("p entre 0 et 1");
    const g = w0 / Q, rate = Q >= 0.5 ? g / 2 : g / 2 - Math.sqrt(g * g / 4 - w0 * w0);
    return Math.log(1 / p) / rate;
  }
  /* mean powers over a period in the steady state, mass m and force amplitude F₀:
     supplied ⟨F v⟩ = ½ F₀ V cos(lag of v), dissipated ⟨c v²⟩ = ½ c V². Equal: the energy stored does not change on average. */
  function puissances(m, w0, Q, w, F0) {
    positive(m, "m"); finite(F0, "F₀");
    const R = reponse(w0, Q, w, F0 / m), V = R.vitesse.module, c = m * w0 / Q;
    return { fournie: 0.5 * F0 * V * Math.cos(R.vitesse.retard), dissipee: 0.5 * c * V * V, c, V };
  }

  /* ---------- the same, computed step by step ---------- */
  /* from rest, Integ leapfrog (order 2, corrected for the friction), h = T/pasParPeriode of the drive, n whole drive periods.
     Uses Osc.forceAmortie: ẍ = −ω₀²x − (ω₀/Q)ẋ + f cos ωt. */
  function simuler(w0, Q, w, f, periodes, pasParPeriode, x0, v0) {
    positive(w, "ω"); const n = pasParPeriode || 400;
    if (!Number.isInteger(periodes) || periodes < 1) err("periodes entier ≥ 1");
    const T = 2 * Math.PI / w, h = T / n;
    const run = Integ.run("leapfrog", Osc.forceAmortie(w0, w, f, Q).a, { t: 0, x: [x0 || 0], v: [v0 || 0] }, h, n * periodes, { vdep: true });
    return { T, h, n, t: run.t, x: run.x.map(q => q[0]), v: run.v.map(q => q[0]) };
  }
  /* Fourier coefficient at k·ω over the last `sur` whole periods of a sampled signal y (sampled n per period from t = 0):
     y ≈ a cos kωt + b sin kωt → amplitude √(a² + b²), retard atan2(b, a) (lag behind cos kωt). Trapezoid = exact for a
     periodic band-limited signal. */
  function harmonique(sim, y, k, sur) {
    k = k || 1; sur = sur || 1;
    const N = sim.n * sur, end = y.length - 1, w = 2 * Math.PI / sim.T;
    if (end < N) err("pas assez de périodes simulées");
    let a = 0, b = 0;
    for (let j = end - N; j < end; j++) { const th = k * w * sim.t[j]; a += y[j] * Math.cos(th); b += y[j] * Math.sin(th); }
    a *= 2 / N; b *= 2 / N;
    return { a, b, amplitude: Math.hypot(a, b), retard: Math.atan2(b, a) };
  }
  /* mean of g(t, x, v) over the last `sur` drive periods */
  function moyenne(sim, g, sur) {
    const N = sim.n * (sur || 1), end = sim.t.length - 1;
    let s = 0; for (let j = end - N; j < end; j++) s += g(sim.t[j], sim.x[j], sim.v[j]);
    return s / N;
  }

  /* ---------- §23.3 series RLC circuit ---------- */
  /* L q̈ + R q̇ + q/C = u(t): the same equation with m ↔ L, c ↔ R, k ↔ 1/C, x ↔ q, v ↔ i, F ↔ u. Lumped elements:
     the circuit is small against the wavelength c/f. R is the total series resistance (generator, coil, capacitor, resistor). */
  function rlc(R, L, C) {
    positive(R, "R"); positive(L, "L"); positive(C, "C");
    const w0 = Osc.pulsationLC(L, C);
    return { w0, f0: w0 / (2 * Math.PI), Q: Math.sqrt(L / C) / R, gamma: R / L, mecanique: { m: L, c: R, k: 1 / C } };
  }
  /* (23.19) impedance Z = R + i(Lω − 1/(Cω)); current amplitude I₀ = U₀/|Z|; lag of i behind u = arg Z. ω > 0. */
  function impedance(R, L, C, w) {
    positive(R, "R"); positive(L, "L"); positive(C, "C"); positive(w, "ω");
    const im = L * w - 1 / (C * w);
    return { re: R, im, module: Math.hypot(R, im), retard: Math.atan2(im, R) };
  }
  function intensite(R, L, C, U0, w) {
    finite(U0, "U₀");
    const Z = impedance(R, L, C, w), I0 = Math.abs(U0) / Z.module;
    return { I0, retard: Z.retard, UC: I0 / (C * w), UL: I0 * L * w, UR: I0 * R };
  }
  /* equivalent series resistance of a capacitor from its loss factor tan δ: ESR = tan δ / (Cω) (series model) */
  const resistanceSerieCondensateur = (tanDelta, C, w) => finite(tanDelta, "tan δ") / (positive(C, "C") * positive(w, "ω"));
  /* lumped elements hold while the circuit size ℓ is small against the wavelength c/f: returns ℓ f / c */
  const tailleSurLongueurOnde = (l, f) => positive(l, "ℓ") * positive(f, "f") / Cst.c;

  /* how far the undamped steady state x̂₀ = f/(ω₀² − ω²) is from the damped one x̂ = f/(ω₀² − ω² + iγω), γ = ω₀/Q:
     module = |x̂₀|/|x̂| − 1 (the amplitude alone), complexe = |x̂₀ − x̂|/|x̂| = γω/|ω₀² − ω²| (amplitude and phase).
     For Q ≫ 1 near ω₀: module ≈ ½(ω₀/(2Q|Δω|))², complexe ≈ ω₀/(2Q|Δω|). Exact for a linear friction. */
  function ecartSansFrottement(w0, Q, w) {
    positive(w0, "ω₀"); positive(Q, "Q"); positive(w, "ω");
    const D = w0 * w0 - w * w; if (D === 0) err("ω = ω₀ : pas de régime sans frottement");
    const r = w0 * w / Q / Math.abs(D);
    return { module: Math.sqrt(1 + r * r) - 1, complexe: r };
  }
  /* the smallest |ω − ω₀|/ω₀, on both sides of ω₀, beyond which that gap stays under tol (bisection; which = "module" or
     "complexe"). Q·result → 3,5 (module, tol = 1 %) and 50 (complexe) when Q ≫ 1. */
  function seuilSansFrottement(Q, tol, which) {
    positive(Q, "Q"); positive(tol, "tol"); which = which || "module";
    const side = s => { let lo = 1e-12, hi = s > 0 ? 1e3 : 1 - 1e-12;
      if (ecartSansFrottement(1, Q, 1 + s * hi)[which] > tol) return Infinity;
      for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (ecartSansFrottement(1, Q, 1 + s * m)[which] > tol) lo = m; else hi = m; }
      return hi; };
    return Math.max(side(1), side(-1));
  }
  /* eddy-current brake: a conducting plate (conductivity σ, thickness e) moving at v past a magnet. Reitz (J. Appl. Phys. 41,
     2067, 1970): drag ∝ (w/v)(1 − w/√(v² + w²)), w = 2/(μ₀σe). Linear in v for v ≪ w, with a relative shortfall
     ≈ 3v²/(4w²) (exact value returned). */
  function freinCourants(sigma, e, v) {
    positive(sigma, "σ"); positive(e, "e"); finite(v, "v");
    const w = 2 / (Cst.mu0 * sigma * e), u = Math.abs(v) / w;
    const exact = u === 0 ? 0.5 * u : (1 - 1 / Math.sqrt(1 + u * u)) / u;    // drag over its value at w, in units of the linear law's slope
    return { w, ecart: u === 0 ? 0 : 1 - exact / (u / 2) };
  }

  const api = { QMIN, phaseur, reponse, resonanceElongation, resonanceVitesse, bande, bandeElongation, etablissement, puissances,
    simuler, harmonique, moyenne, rlc, impedance, intensite, resistanceSerieCondensateur, tailleSurLongueurOnde,
    ecartSansFrottement, seuilSansFrottement, freinCourants };
  if (node) module.exports = api;
  else root.Resonance = api;
})(typeof self !== "undefined" ? self : this);

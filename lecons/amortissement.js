/* Amort — the free damped oscillator and the energy of an oscillator, Feynman I.23.4 and I.24.1 to I.24.3 and the CPGE
   programme: energy stored and lost in the steady state, Q defined by energy, free decay in the three regimes, return time,
   series RLC circuit switched onto a constant source, resonance lines of natural systems.
   Pure, no DOM, UMD (global Amort). SI throughout. Builds on Constantes and Resonance (resonance.js, itself on Integ and Osc).
   The model everywhere is m ẍ + c ẋ + k x = F with a linear (viscous) friction c = mγ, γ = ω₀/Q:
   a friction that grows with the amplitude (air past separation, see Osc.qFluide) gives a Q that depends on A, not this.
   Every function is a model: its domain is in the comment. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Resonance = node ? require("./resonance.js") : root.Resonance;

  const err = m => { throw new Error("amort: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };

  /* ---------- §24.1 energy in the steady state ---------- */
  /* x = |x̂| cos(ωt − φ) under F₀ cos ωt. Stored energy E = ½mẋ² + ½kx² oscillates at 2ω around its mean
     (24.6) ⟨E⟩ = ¼ m(ω² + ω₀²)|x̂|², between ½mω₀²|x̂|² and ½mω²|x̂|² (relative ripple |ω₀² − ω²|/(ω₀² + ω²), zero at ω₀).
     (24.4) ⟨P⟩ = ½ γ m ω² |x̂|²: work per period W = (2π/ω)⟨P⟩. (24.7) Q(ω) = 2π⟨E⟩/W = (ω² + ω₀²)/(2γω), ω₀/γ at ω₀.
     Exact for a linear friction. */
  function energieEtablie(m, w0, Q, w, F0) {
    positive(m, "m"); positive(w0, "ω₀"); positive(Q, "Q"); positive(w, "ω"); finite(F0, "F₀");
    const R = Resonance.reponse(w0, Q, w, F0 / m), X = R.module, g = w0 / Q;
    const moy = m * (w * w + w0 * w0) * X * X / 4, P = g * m * w * w * X * X / 2, W = 2 * Math.PI / w * P;
    const a = 0.5 * m * w0 * w0 * X * X, b = 0.5 * m * w * w * X * X;
    return { X, retard: R.retard, moy, min: Math.min(a, b), max: Math.max(a, b), puissance: P, travail: W, Q: 2 * Math.PI * moy / W,
      ec: t => 0.5 * m * R.v(t) ** 2, ep: t => 0.5 * m * w0 * w0 * R.x(t) ** 2, x: R.x, v: R.v };
  }
  /* (24.7) alone: the energy Q of the driven oscillator at ω, (ω² + ω₀²)/(2γω) = Q·(ω² + ω₀²)/(2ωω₀) ≥ Q */
  const qEnergie = (w0, Q, w) => positive(Q, "Q") * (positive(w, "ω") ** 2 + positive(w0, "ω₀") ** 2) / (2 * w * w0);

  /* ---------- §24.2 the free damped oscillator ---------- */
  /* (24.12) with x ∝ e^(iαt): α² − iγα − ω₀² = 0, α = iγ/2 ± √(ω₀² − γ²/4). D = ω₀² − γ²/4 = ω₀²(1 − 1/(4Q²)) decides:
     D > 0 pseudo-periodic (Q > 1/2), D = 0 critical (Q = 1/2, taken for |D| ≤ 10⁻¹² ω₀², so that R = 2√(L/C) is
     critical despite rounding; the motion is continuous there), D < 0 aperiodic (Q < 1/2). The CPGE writes x ∝ e^(rt), r = iα. */
  function racines(w0, Q) {
    positive(w0, "ω₀"); positive(Q, "Q");
    const g = w0 / Q, D0 = w0 * w0 - g * g / 4, D = Math.abs(D0) <= 1e-12 * w0 * w0 ? 0 : D0, q = Math.sqrt(Math.abs(D));
    const regime = D > 0 ? "pseudo" : D < 0 ? "aperiodique" : "critique";
    const alpha = D >= 0 ? [{ re: q, im: g / 2 }, { re: -q, im: g / 2 }] : [{ re: 0, im: g / 2 + q }, { re: 0, im: g / 2 - q }];
    return { regime, gamma: g, D, alpha, r: alpha.map(a => ({ re: -a.im, im: a.re })),
      pseudoPulsation: D > 0 ? q : null, lent: D >= 0 ? g / 2 : g / 2 - q, rapide: D >= 0 ? g / 2 : g / 2 + q };
  }
  /* the motion from x₀, v₀ at t = 0, in one formula valid in the three regimes (no cancellation near Q = 1/2):
     x = e^(−γt/2)[x₀ C(t) + (v₀ + γx₀/2) S(t)], v = e^(−γt/2)[v₀ C(t) − (γv₀/2 + ω₀²x₀) S(t)],
     with C, S = cos qt, sin(qt)/q (D = q² > 0), 1, t (D = 0), cosh qt, sinh(qt)/q (D = −q² < 0). (24.22) for D > 0. Exact. */
  function libre(w0, Q, x0, v0) {
    finite(x0, "x₀"); finite(v0, "v₀");
    const ra = racines(w0, Q), a = ra.gamma / 2, D = ra.D, q = Math.sqrt(Math.abs(D)), b = v0 + a * x0, c = a * v0 + w0 * w0 * x0;
    /* e^(−at)C and e^(−at)S; for D < 0 and qt ≥ 1, written with e^(−(a ∓ q)t) so that cosh never overflows */
    const EC = t => D > 0 ? Math.exp(-a * t) * Math.cos(q * t) : D === 0 ? Math.exp(-a * t)
      : q * t < 1 ? Math.exp(-a * t) * Math.cosh(q * t) : (Math.exp(-(a - q) * t) + Math.exp(-(a + q) * t)) / 2;
    const ES = t => D > 0 ? Math.exp(-a * t) * Math.sin(q * t) / q : D === 0 ? Math.exp(-a * t) * t
      : q * t < 1 ? Math.exp(-a * t) * Math.sinh(q * t) / q : (Math.exp(-(a - q) * t) - Math.exp(-(a + q) * t)) / (2 * q);
    const x = t => x0 * EC(t) + b * ES(t), v = t => v0 * EC(t) - c * ES(t);
    return Object.assign(ra, { x, v, enveloppe: D > 0 ? t => Math.exp(-a * t) * Math.hypot(x0, b / q) : null,
      energie: t => (v(t) ** 2 + w0 * w0 * x(t) ** 2) / 2 });                          // per unit mass
  }
  /* pseudo-period T = 2π/√(ω₀² − γ²/4), longer than T₀ by 1/√(1 − 1/(4Q²)): 1,3 % at Q = 2, 0,013 % at Q = 20. Q > 1/2 only. */
  function pseudoPeriode(w0, Q) { const r = racines(w0, Q); if (r.regime !== "pseudo") err("Q > 1/2 : pas de pseudo-période sinon"); return 2 * Math.PI / r.pseudoPulsation; }
  /* x(t + T) = e^(−γT/2) x(t) and v likewise, exactly: the logarithmic decrement δ = γT/2 = π/(Q√(1 − 1/(4Q²))), and the
     energy is multiplied by e^(−2δ) per pseudo-period, at any instant. perte = 1 − e^(−2δ); the high-Q guess (24.8) is 2π/Q. */
  function parPeriode(Q) {
    positive(Q, "Q"); if (!(Q > 0.5)) err("Q > 1/2 : pas de pseudo-période sinon");
    const delta = Math.PI / (Q * Math.sqrt(1 - 1 / (4 * Q * Q)));
    return { decrement: delta, perte: 1 - Math.exp(-2 * delta), estimation: 2 * Math.PI / Q };
  }
  /* return time: the last instant where |x| ≥ p|x₀| (x₀ ≠ 0), for the motion from x₀, v₀. Sampled 400 times per
     min(T₀, 1/slowest rate) from an upper bound, then bisection. Settles faster just under critical damping (it may overshoot
     by less than p) than at Q = 1/2: the minimum is at Q ≈ 0,72 for p = 5 %. */
  function retour(w0, Q, x0, v0, p) {
    finite(p, "p"); if (!(p > 0 && p < 1)) err("p entre 0 et 1"); if (!(Math.abs(finite(x0, "x₀")) > 0)) err("x₀ ≠ 0");
    const M = libre(w0, Q, x0, v0 || 0), lim = p * Math.abs(x0), slow = M.lent, h = Math.min(2 * Math.PI / w0, 1 / slow) / 400;
    const q = Math.sqrt(Math.abs(M.D)), b = Math.abs((v0 || 0) + M.gamma / 2 * x0);
    /* |cos| ≤ 1, |sin qt/q| ≤ 1/q; cosh qt ≤ e^(qt), sinh(qt)/q ≤ e^(qt)/(2q); critical: S = t. Decreasing past 1/slow. */
    const bound = t => Math.exp(-slow * t) * (Math.abs(x0) + b * (M.D === 0 ? t : M.D < 0 ? 1 / (2 * q) : 1 / q));
    let T = 1 / slow; while (bound(T) >= lim) T *= 2;
    for (let t = T; t > 0; t -= h) if (Math.abs(M.x(t)) >= lim) {
      let lo = t, hi = Math.min(T, t + h);
      for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (Math.abs(M.x(mid)) >= lim) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    }
    return 0;
  }

  /* ---------- §24.3 series RLC switched onto a constant source ---------- */
  /* at t = 0 the source goes to E; before, i = 0 and u_C = u₀. L q̈ + R q̇ + q/C = E: the free motion of x = q − CE from
     x₀ = C(u₀ − E), v₀ = 0. u_C = E + x/C, i = ẋ, u_R = R i, u_L = E − u_C − u_R. Lumped elements, R constant (all the
     resistances of the loop), ideal switch. Critical resistance R_c = 2√(L/C) (Q = 1/2). */
  function echelon(R, L, C, E, u0) {
    finite(E, "E"); u0 = u0 == null ? 0 : finite(u0, "u₀");
    const P = Resonance.rlc(R, L, C), M = libre(P.w0, P.Q, C * (u0 - E), 0);
    const uC = t => E + M.x(t) / C, i = t => M.v(t);
    return Object.assign({}, P, { regime: M.regime, gamma: M.gamma, pseudoPulsation: M.pseudoPulsation, lent: M.lent, Rc: 2 * Math.sqrt(L / C),
      uC, i, uR: t => R * i(t), uL: t => E - uC(t) - R * i(t) });
  }
  /* energy from t = 0 to the end: the source gives E·Δq = CE(E − u₀), the capacitor gains ½C(E² − u₀²), the resistance takes the
     rest, ½C(E − u₀)², whatever R and L (exact for linear R, L, C; R > 0 needed for the transient to end). */
  function bilanEchelon(C, E, u0) {
    positive(C, "C"); finite(E, "E"); u0 = u0 == null ? 0 : finite(u0, "u₀");
    return { fournie: C * E * (E - u0), stockee: C * (E * E - u0 * u0) / 2, dissipee: C * (E - u0) ** 2 / 2 };
  }

  /* ---------- §23.4 resonance lines ---------- */
  /* power absorbed by the oscillator near ω₀, relative to its maximum: exact (velocity resonance squared)
     γ²ω²/((ω₀² − ω²)² + γ²ω²), full width at half maximum γ exactly; Lorentz's form (γ/2)²/((ω − ω₀)² + (γ/2)²), the same
     with ω + ω₀ ≈ 2ω₀ and ω ≈ ω₀: relative gap of order |ω − ω₀|/ω₀ ≈ 1/Q within the line. */
  function raieAbsorption(w0, Q, w) {
    positive(w0, "ω₀"); positive(Q, "Q"); finite(w, "ω"); if (w < 0) err("ω ≥ 0");
    const g = w0 / Q, d = w0 * w0 - w * w;
    return { exacte: g * g * w * w / (d * d + g * g * w * w), lorentz: g * g / 4 / ((w - w0) ** 2 + g * g / 4) };
  }
  /* the same in the reduced detuning u = (ω − ω₀)/γ = Q(ω − ω₀)/ω₀, without the cancellation of ω₀² − ω² at Q ~ 10¹²:
     with s = u/Q, exact (1 + s)²/(u²(2 + s)² + (1 + s)²), Lorentz 1/(1 + 4u²). Half maximum at u = ±1/2 for Q ≫ 1. */
  function raieReduite(Q, u) {
    positive(Q, "Q"); finite(u, "u"); const s = u / Q; if (s < -1) err("ω ≥ 0 : u ≥ −Q");
    return { exacte: (1 + s) ** 2 / (u * u * (2 + s) ** 2 + (1 + s) ** 2), lorentz: 1 / (1 + 4 * u * u) };
  }
  /* a line of energy E (J) from a level of mean lifetime τ (s): its energy decays as e^(−t/τ), so γ = 1/τ, width Γ = ħ/τ,
     Q = ω₀/γ = Eτ/ħ = E/Γ, frequency f₀ = E/h. */
  function raie(E, tau) {
    positive(E, "E"); positive(tau, "τ");
    const Gamma = Cst.hbar / tau;
    return { Gamma, Q: E / Gamma, f0: E / Cst.h, largeur: 1 / (2 * Math.PI * tau) };
  }
  /* an oscillator of frequency f₀ and quality factor Q: width Δf = f₀/Q, energy decay time τ = Q/ω₀, periods for the amplitude
     to fall by e: Q/π */
  function oscillateur(f0, Q) {
    positive(f0, "f₀"); positive(Q, "Q");
    return { largeur: f0 / Q, tau: Q / (2 * Math.PI * f0), periodes: Q / Math.PI };
  }

  const api = { energieEtablie, qEnergie, racines, libre, pseudoPeriode, parPeriode, retour, echelon, bilanEchelon,
    raieAbsorption, raieReduite, raie, oscillateur };
  if (node) module.exports = api;
  else root.Amort = api;
})(typeof self !== "undefined" ? self : this);

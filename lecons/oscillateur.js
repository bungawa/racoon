/* Osc — the harmonic oscillator of Feynman I.21 (§21.1 to §21.5) and of the CPGE programme: pulsation, solution from the
   initial conditions, energy, projection of a circular motion, forced response; and the models it replaces (cubic spring,
   pendulum at large angle, massive spring, air drag), so a page can say where ẍ + ω₀²x = 0 stops holding.
   Pure, no DOM, UMD (global Osc). SI throughout. Builds on Integ (integration.js) and Constantes;
   Forces (forces.js) only for the fluid properties of the drag estimate. Every function is a model: its domain is in the comment. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Forces = node ? require("./forces.js") : root.Forces;
  const G = Cst.g_CPGE;                                   // m·s⁻², for the pendulum of the pages

  const err = m => { throw new Error("osc: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };

  /* ---------- the linear oscillator ---------- */
  /* ω₀ = √(k/m) and T₀ = 2π/ω₀ (21.5): spring of stiffness k, point mass m, Hooke's law, no friction */
  const pulsation = (k, m) => Math.sqrt(positive(k, "k") / positive(m, "m"));
  const periode = (k, m) => 2 * Math.PI / pulsation(k, m);
  /* the same equation for the charge of a capacitor C closed on a coil L, wires without resistance: ω₀ = 1/√(LC) */
  const pulsationLC = (L, C) => 1 / Math.sqrt(positive(L, "L") * positive(C, "C"));
  /* pendulum of length l, small angles: ω₀ = √(g/l) */
  const pulsationPendule = (l, g) => Math.sqrt((g == null ? G : positive(g, "g")) / positive(l, "l"));

  /* (21.6) the two constants from x₀ and v₀ at t = 0: x = A cos ω₀t + B sin ω₀t = a cos(ω₀t + φ),
     A = x₀, B = v₀/ω₀, a = √(x₀² + (v₀/ω₀)²), φ in ]−π, π] (φ = 0 when released from rest at x₀ > 0) */
  function conditions(w, x0, v0) {
    positive(w, "ω₀"); finite(x0, "x₀"); finite(v0, "v₀");
    const A = x0, B = v0 / w, a = Math.hypot(A, B);
    return { A, B, a, phi: a === 0 ? 0 : Math.atan2(-B, A) + 0 };
  }
  /* the motion itself: x(t), v(t) and the energy per unit mass, constant (v² + ω₀²x²)/2 = ω₀²a²/2 */
  function mouvement(w, x0, v0) {
    const c = conditions(w, x0, v0);
    return Object.assign(c, {
      w, x: t => c.A * Math.cos(w * t) + c.B * Math.sin(w * t),
      v: t => -w * c.A * Math.sin(w * t) + w * c.B * Math.cos(w * t),
      energie: w * w * c.a * c.a / 2,
    });
  }
  /* mechanical energy of mass m on a spring k: ½mv² + ½kx² (exact definition; Hooke's law for the potential part) */
  const energie = (k, m, x, v) => 0.5 * positive(m, "m") * finite(v, "v") * v + 0.5 * positive(k, "k") * finite(x, "x") * x;

  /* ---------- harmonic and circular motion (21.7) ---------- */
  /* a point on a circle of radius R, at angular speed ω, angle ωt + φ at time t: position, velocity, acceleration.
     Its shadow on the x axis has a_x = −ω²x: the oscillator equation, for any R. */
  function cercle(R, w, phi, t) {
    finite(R, "R"); finite(w, "ω"); finite(phi, "φ"); finite(t, "t");
    const th = w * t + phi, c = Math.cos(th), s = Math.sin(th);
    return { angle: th, X: R * c, Y: R * s, vx: -R * w * s, vy: R * w * c, ax: -w * w * R * c, ay: -w * w * R * s };
  }

  /* ---------- force laws as Integ systems (acceleration per unit mass, any dimension) ---------- */
  /* linear spring ẍ = −ω₀²x: Integ.spring */
  const lineaire = w => Integ.spring(positive(w, "ω₀"));
  /* cubic spring ẍ = −ω₀²x(1 + βx²): β > 0 stiffens, β < 0 softens (then only for |x| < 1/√−β).
     Energy per unit mass v²/2 + ω₀²(x²/2 + βx⁴/4). */
  function cubique(w, beta) {
    positive(w, "ω₀"); finite(beta, "β");
    const w2 = w * w;
    return { w, beta, a: (t, x) => x.map(q => -w2 * q * (1 + beta * q * q)),
      energy: s => s.v.reduce((e, p) => e + p * p / 2, 0) + w2 * s.x.reduce((e, q) => e + q * q / 2 + beta * q * q * q * q / 4, 0) };
  }
  /* simple pendulum θ̈ = −ω₀² sin θ (point bob, massless rod, no friction). Energy per unit mass and length² θ̇²/2 + ω₀²(1 − cos θ). */
  function pendule(w) {
    positive(w, "ω₀");
    const w2 = w * w;
    return { w, a: (t, x) => x.map(q => -w2 * Math.sin(q)),
      energy: s => s.v.reduce((e, p) => e + p * p / 2, 0) + w2 * s.x.reduce((e, q) => e + 1 - Math.cos(q), 0) };
  }

  /* period measured by the integrator: released from rest at x₀ > 0 in a potential symmetric in x, the first passage at
     x = 0 takes a quarter period. Leapfrog with o.pas (default T₀/4000), passage refined by a cubic Hermite through the two
     straddling states. Relative error ≈ (hω₀)²/24: 1 × 10⁻⁷ by default. */
  function periodeNum(sys, x0, o) {
    o = o || {};
    positive(x0, "x₀");
    const w = positive(sys.w, "ω₀ du système"), h = o.pas == null ? 2 * Math.PI / w / 4000 : positive(o.pas, "le pas"), max = o.max || 4e6;
    let s = { t: 0, x: [x0], v: [0] };
    for (let k = 0; k < max; k++) {
      const n = Integ.step("leapfrog", sys.a, s, h);
      if (n.x[0] <= 0) {
        /* Hermite cubic on [0, h] through (x, v) at both ends; its root by bisection then Newton */
        const p0 = s.x[0], p1 = n.x[0], m0 = s.v[0] * h, m1 = n.v[0] * h;
        const H = u => (2 * u ** 3 - 3 * u * u + 1) * p0 + (u ** 3 - 2 * u * u + u) * m0 + (-2 * u ** 3 + 3 * u * u) * p1 + (u ** 3 - u * u) * m1;
        let lo = 0, hi = 1;
        for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (H(mid) > 0) lo = mid; else hi = mid; }
        return 4 * (s.t + h * (lo + hi) / 2);
      }
      s = n;
    }
    return err("aucun passage en x = 0 : le mouvement n'oscille pas (pendule lâché au-delà de π ?)");
  }

  /* exact period of the pendulum released from rest at θ₀ (0 < θ₀ < π): T = T₀ / AGM(1, cos(θ₀/2)) (complete elliptic integral) */
  function agm(a, b) { for (let i = 0; i < 40 && Math.abs(a - b) > 1e-15 * a; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)]; return (a + b) / 2; }
  function periodePendule(w, theta0) {
    positive(w, "ω₀"); finite(theta0, "θ₀");
    if (!(Math.abs(theta0) < Math.PI)) err("θ₀ doit être strictement compris entre −π et π");
    return 2 * Math.PI / w / agm(1, Math.cos(theta0 / 2));
  }
  /* first correction, Borda's: T ≈ T₀(1 + θ₀²/16); its own error is under 0,1 % up to 40°, 0,4 % at 60° */
  const periodePenduleApprox = (w, theta0) => 2 * Math.PI / positive(w, "ω₀") * (1 + finite(theta0, "θ₀") ** 2 / 16);
  /* cubic spring, first order (Lindstedt): T ≈ T₀(1 − 3βA²/8), valid while |β|A² ≪ 1 */
  const periodeCubiqueApprox = (w, beta, A) => 2 * Math.PI / positive(w, "ω₀") * (1 - 3 * finite(beta, "β") * finite(A, "A") ** 2 / 8);

  /* ---------- superposition (21.1) ---------- */
  /* evolve s1, s2 and s1 + s2 (initial conditions added) with the same scheme and step; the largest
     |x₁₂ − (x₁ + x₂)| relative to the largest |x₁₂|. Zero (to rounding) when the equation is linear. */
  function ecartSuperposition(sys, s1, s2, h, n) {
    const add = (p, q) => p.map((c, i) => c + q[i]);
    const s12 = { t: s1.t, x: add(s1.x, s2.x), v: add(s1.v, s2.v) };
    const r1 = Integ.run("leapfrog", sys.a, s1, h, n), r2 = Integ.run("leapfrog", sys.a, s2, h, n), r12 = Integ.run("leapfrog", sys.a, s12, h, n);
    let gap = 0, big = 0;
    r12.x.forEach((x, k) => x.forEach((q, i) => { gap = Math.max(gap, Math.abs(q - r1.x[k][i] - r2.x[k][i])); big = Math.max(big, Math.abs(q)); }));
    return big === 0 ? 0 : gap / big;
  }

  /* ---------- forced oscillations (21.8 to 21.12) ---------- */
  /* ẍ = −ω₀²x + f cos ωt, f = F₀/m: no friction at all */
  function force(w0, w, f) {
    positive(w0, "ω₀"); finite(w, "ω"); finite(f, "F₀/m");
    const w02 = w0 * w0;
    return { w: w0, a: (t, x) => x.map(q => -w02 * q + f * Math.cos(w * t)) };
  }
  /* (21.12) the response at the driving pulsation, x = C cos ωt, C = f/(ω₀² − ω²). Amplitude |C|; lag of x behind the
     force: 0 below ω₀ (in phase), π above (opposite). Refused at ω = ω₀: there is no such solution, see forcee. */
  function reponse(w0, w, f) {
    positive(w0, "ω₀"); finite(w, "ω"); finite(f, "F₀/m");
    const d = w0 * w0 - w * w;
    if (Math.abs(d) <= 1e-12 * w0 * w0) err("ω = ω₀ : à la résonance, pas de réponse x = C cos ωt, l'amplitude croît avec t");
    const C = f / d;
    return { C, amplitude: Math.abs(C), retard: C * f >= 0 ? 0 : Math.PI, x: t => C * Math.cos(w * t) };
  }
  /* the whole motion from x₀, v₀: forced part plus free part (the free part never dies here: no friction).
     At ω = ω₀ exactly: x₀ cos ω₀t + (v₀/ω₀) sin ω₀t + f t sin(ω₀t)/(2ω₀), an amplitude that grows linearly with t. */
  function forcee(w0, w, f, x0, v0) {
    positive(w0, "ω₀"); finite(w, "ω"); finite(f, "F₀/m"); finite(x0, "x₀"); finite(v0, "v₀");
    const d = w0 * w0 - w * w;
    if (Math.abs(d) <= 1e-12 * w0 * w0)
      return { resonance: true, x: t => x0 * Math.cos(w0 * t) + v0 / w0 * Math.sin(w0 * t) + f * t * Math.sin(w0 * t) / (2 * w0), enveloppe: t => f * t / (2 * w0) };
    const C = f / d;
    return { resonance: false, C, x: t => C * Math.cos(w * t) + (x0 - C) * Math.cos(w0 * t) + v0 / w0 * Math.sin(w0 * t) };
  }

  /* ---------- describing the system: what ẍ + ω₀²x = 0 neglects ---------- */
  /* a uniform spring of mass ms (stiffness k) holding a mass m, other end fixed. Exact lowest mode: β tan β = ms/m,
     ω = β √(k/ms). Rayleigh's correction: ω ≈ √(k/(m + ms/3)). Naive model: √(k/m). */
  function masseRessort(k, m, ms) {
    positive(k, "k"); positive(m, "m"); finite(ms, "ms"); if (ms < 0) err("ms ≥ 0");
    const naive = Math.sqrt(k / m), rayleigh = Math.sqrt(k / (m + ms / 3));
    if (ms === 0) return { naive, rayleigh, exacte: naive };
    const r = ms / m;
    let lo = 0, hi = Math.PI / 2;                          // β tan β increases from 0 to ∞ on ]0, π/2[
    for (let i = 0; i < 200 && hi - lo > 1e-16; i++) { const b = (lo + hi) / 2; if (b * Math.tan(b) < r) lo = b; else hi = b; }
    return { naive, rayleigh, exacte: (lo + hi) / 2 * Math.sqrt(k / ms) };
  }
  /* ---------- a sphere oscillating in a still fluid (air by default): drag, quality factor, decay, resonance ---------- */
  /* Steady drag laws (Stokes 6πηRv, C_x ≈ 0,44) do not hold for an oscillating sphere. Two dimensionless numbers decide:
     R/δ, with δ = √(2ν/ω) the depth reached by the oscillatory boundary layer, and the Keulegan–Carpenter number
     KC = 2πA/d (Keulegan & Carpenter, J. Res. NBS 60, 1958), the stroke over the diameter.
     - Small KC: Stokes (Trans. Camb. Phil. Soc. 9, 1851; Landau–Lifshitz, Fluid Mechanics, §24, problem 5), linear in the
       velocity u: F = 6πηR(1 + R/δ)u + 3πR²√(2ηρ/ω)(1 + 2R/(9δ)) du/dt. Only the first term dissipates; the second is an
       added mass (½ρV for an ideal fluid, plus a part from the boundary layer). Valid for any R/δ, provided A ≪ R.
     - Past a critical KC, 1,1 to 2,7 for spheres on pendulums (Bolster, Hershberger & Donnelly, Phys. Rev. E 81, 046317,
       2010), the flow separates: a vortex ring leaves at each reversal and a quadratic drag ½ρC_q πR²|u|u adds to the
       Stokes term. C_q is bracketed by measurements: 0,53 for a 6,1 cm sphere swinging in air at KC ≈ 90 (Nelson & Olsson,
       Am. J. Phys. 54, 1986; the steady value is 0,4 to 0,5), and 1,5 × (0,65 to 0,85) ≈ 1,3 at most for spheres in water
       at KC 1 to 3, Re 400 to 1 000 (Bolster et al. give the mean force over a period, 2/3 of the peak of a quadratic law,
       and do not say whether the Stokes part is removed). Hence C_q ∈ [0,5 ; 1,3] past KC = 3, [0 ; 1,3] between 1 and 3,
       0 under KC = 1. Both terms together are the model of Nelson & Olsson and of Bolster et al.
     The added mass shifts ω₀ by ρ/(4ρ_s) at most for a dense sphere (8 × 10⁻⁵ for steel in air): ignored here. */
  const KC_SEPARATION = [1, 3], CQ_OSC = [0.5, 1.3];
  const fluide = f => { const x = typeof f === "string" || f == null ? Forces.FLUIDS[f || "air"] : f; if (!x) err("fluide inconnu"); positive(x.rho, "ρ"); positive(x.eta, "η"); return x; };
  /* the dissipative part of the force, F = c u + b|u|u, for a sphere of diameter d at pulsation ω and amplitude A:
     { delta (m), KC, c (kg·s⁻¹), cSteady = 6πηR, b: [min, max] (kg·m⁻¹), regime: "stokes" | "transition" | "decollement" } */
  function traineeOscillante(d, w, A, fluid) {
    positive(d, "d"); positive(w, "ω"); positive(A, "A");
    const f = fluide(fluid), R = d / 2, delta = Math.sqrt(2 * f.eta / f.rho / w), KC = 2 * Math.PI * A / d;
    const cSteady = 6 * Math.PI * f.eta * R, c = cSteady * (1 + R / delta), bOf = C => 0.5 * f.rho * C * Math.PI * R * R;
    const regime = KC <= KC_SEPARATION[0] ? "stokes" : KC < KC_SEPARATION[1] ? "transition" : "decollement";
    const b = regime === "stokes" ? [0, 0] : [regime === "transition" ? 0 : bOf(CQ_OSC[0]), bOf(CQ_OSC[1])];
    return { delta, KC, c, cSteady, b, regime };
  }
  /* quality factor Q = 2π E / (energy lost per period) of a sphere of mass m and diameter d on a spring k, oscillating with
     amplitude A, with the drag above. On x = A cos ωt the loss is πcωA² + (8/3)bω²A³, so Q = mω / (c + 8bωA/(3π)).
     { Q, Qmin, Qmax, Qstokes (linear term alone), Qsteady (steady Stokes alone, mω/(6πηR)), KC, delta, reynolds, regime }.
     Q is the geometric mean of the bounds: an order of magnitude, Qmax/Qmin up to 2. Exact limit (Qmin = Qmax = Qstokes) for
     KC ≤ 1. The loss is taken on the undamped motion: valid while Q ≫ 1. The spring's own losses are not counted. */
  function qFluide(m, d, k, A, fluid) {
    positive(m, "m"); positive(d, "d"); positive(k, "k"); positive(A, "A");
    const w = Math.sqrt(k / m), f = fluide(fluid), t = traineeOscillante(d, w, A, f);
    const q = b => m * w / (t.c + 8 * b * w * A / (3 * Math.PI)), Qmin = q(t.b[1]), Qmax = q(t.b[0]);
    return { Q: Math.sqrt(Qmin * Qmax), Qmin, Qmax, Qstokes: m * w / t.c, Qsteady: m * w / t.cSteady,
      KC: t.KC, delta: t.delta, regime: t.regime, reynolds: f.rho * A * w * d / f.eta };
  }
  /* the purely quadratic regime (C_x constant, no linear term): Q = 3π m / (8 b A), b = ½ ρ C_x πd²/4 */
  function qQuadratique(m, d, A, rho, cx) {
    const b = 0.5 * positive(rho, "ρ") * positive(cx, "C_x") * Math.PI * positive(d, "d") ** 2 / 4;
    return 3 * Math.PI * positive(m, "m") / (8 * b * positive(A, "A"));
  }

  /* the decay of the free motion, from the energy balance period by period (valid while Q ≫ 1): dA/dN = −πA/Q(A), so
     N = ∫ Q(A)/(πA) dA from A₀·rapport to A₀ (Simpson in ln A, Q, Qmin and Qmax each). Linear friction: Q constant, A
     falls by e in Q/π periods. With the quadratic term Q grows as A falls: slower than Q(A₀)/π.
     { periodes, duree (s), min, max (periods with Qmin and Qmax) }. */
  function declinFluide(m, d, k, A0, rapport, fluid) {
    positive(A0, "A₀"); positive(rapport, "rapport"); if (!(rapport < 1)) err("rapport < 1 : l'amplitude décroît");
    const n = 400, a = Math.log(A0 * rapport), h = -Math.log(rapport) / n, s = { Q: 0, Qmin: 0, Qmax: 0 };
    for (let i = 0; i <= n; i++) {
      const q = qFluide(m, d, k, Math.exp(a + i * h), fluid), c = i === 0 || i === n ? 1 : i % 2 ? 4 : 2;
      for (const key in s) s[key] += c * q[key];
    }
    const N = key => s[key] * h / 3 / Math.PI;
    return { periodes: N("Q"), duree: N("Q") * 2 * Math.PI * Math.sqrt(m / k), min: N("Qmin"), max: N("Qmax") };
  }
  /* the same sphere driven at ω₀ by a force F₀ cos ω₀t: the steady amplitude equates the gain per period, πF₀A, and the
     loss, πkA²/Q(A): A = Q(A)·F₀/k. Q never increases with A, so the root is unique (bisection in ln A), for Q and for each
     bound. { A, Q, Amin, Amax, KC, reynolds, vitesse }. Linear spring assumed. */
  function resonanceFluide(m, d, k, F0, fluid) {
    positive(F0, "F₀");
    const root = key => {
      const g = A => A - qFluide(m, d, k, A, fluid)[key] * F0 / k;
      let lo = 1e-9, hi = 2e-9;
      if (!(g(lo) < 0)) err("amplitude d'équilibre sous 1 nm");
      while (g(hi) < 0) { lo = hi; hi *= 2; if (hi > 1e6) err("pas d'amplitude d'équilibre"); }
      for (let i = 0; i < 100; i++) { const mid = Math.sqrt(lo * hi); if (g(mid) < 0) lo = mid; else hi = mid; }
      return Math.sqrt(lo * hi);
    };
    const A = root("Q"), q = qFluide(m, d, k, A, fluid);
    return { A, Q: q.Q, Amin: root("Qmin"), Amax: root("Qmax"), KC: q.KC, reynolds: q.reynolds, vitesse: A * Math.sqrt(k / m) };
  }
  /* driven at ω₀ from rest, linear friction of quality factor Q: A(t) = A∞(1 − e^(−ω₀t/2Q)). Periods needed to reach the
     fraction p of A∞: (Q/π) ln(1/(1 − p)), i.e. Q/π for 63 %, 3Q/π for 95 %. The free part dies by the same factor. */
  const etablissement = (Q, p) => { positive(Q, "Q"); finite(p, "p"); if (!(p > 0 && p < 1)) err("p entre 0 et 1"); return Q / Math.PI * Math.log(1 / (1 - p)); };
  /* ẍ = −ω₀²x − (ω₀/Q)ẋ + f cos ωt: linear (viscous) friction of quality factor Q, for Integ with { vdep: true } */
  function forceAmortie(w0, w, f, Q) {
    positive(w0, "ω₀"); finite(w, "ω"); finite(f, "F₀/m"); positive(Q, "Q");
    const w02 = w0 * w0, c = w0 / Q;
    return { w: w0, a: (t, x, v) => x.map((q, i) => -w02 * q - c * v[i] + f * Math.cos(w * t)) };
  }
  /* tuned mass damper: a mass on a spring and a dashpot (damping ratio ζ, own pulsation ωa) carried by a structure that moves
     as X cos ωt. Its motion relative to the structure, z = |z| cos(ωt − retard): z/X = r²/(1 − r² + 2iζr), r = ω/ωa.
     At tuning (r = 1): retard π/2 whatever ζ > 0, |z| = X/(2ζ); then the force it puts back on the structure, k_a z + c_a ż,
     has a part opposed to the structure's velocity: it acts as a damper. Only with ζ = 0 (Frahm) is the response in phase or
     opposite, and then it dissipates nothing. */
  function masseAccordee(zeta, r) {
    finite(zeta, "ζ"); if (zeta < 0) err("ζ ≥ 0"); positive(r, "r");
    const re = 1 - r * r, im = 2 * zeta * r, d = re * re + im * im;
    if (d === 0) err("ζ = 0 et r = 1 : réponse infinie");
    return { rapport: r * r / Math.sqrt(d), retard: Math.atan2(im, re) };
  }

  const api = { G, pulsation, periode, pulsationLC, pulsationPendule, conditions, mouvement, energie, cercle,
    lineaire, cubique, pendule, periodeNum, periodePendule, periodePenduleApprox, periodeCubiqueApprox,
    ecartSuperposition, force, reponse, forcee, masseRessort, KC_SEPARATION, CQ_OSC, traineeOscillante, qFluide, qQuadratique,
    declinFluide, resonanceFluide, etablissement, forceAmortie, masseAccordee };
  if (node) module.exports = api;
  else root.Osc = api;
})(typeof self !== "undefined" ? self : this);

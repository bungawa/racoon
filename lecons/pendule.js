/* Pendule — the simple pendulum of the CPGE notion « pendule » (X.pendule.1 to X.pendule.3): equation of motion, phase
   portrait, period at large amplitude, and what the model neglects (string that goes slack, bob of finite size, air, the
   Earth's rotation, Huygens's cycloid). Pure, no DOM, UMD (global Pendule). SI throughout: m, kg, s, rad, N.
   Builds on Constantes, Integ (integration.js), Osc (oscillateur.js) and Travail (travail.js);
   Forces (forces.js) as well for the air drag estimate. It does not repeat them: the exact period (AGM), Borda's formula,
   the equation θ̈ = −ω₀² sin θ and the drag Q come from Osc; the cycloid run from Travail.glissade.

   Reduced variables: the state is (θ, θ̇), θ from the downward vertical; the energy per unit m ℓ² is
     e = θ̇²/2 + ω₀²(1 − cos θ),   ω₀² = g/ℓ,
   and k² = e/(2ω₀²) = Em/(2 m g ℓ) is the energy in units of the separatrix: k² < 1 oscillation, k² > 1 revolution.

   Equation and its linearisation
     pulsation(l, g)            ω₀ = √(g/ℓ) (Osc.pulsationPendule); g defaults to 9,81.
     systeme(w, Q)              θ̈ = −ω₀² sin θ − (ω₀/Q) θ̇ for Integ; Q omitted or Infinity: Osc.pendule(w), no friction.
                                Linear (viscous) friction: a model for the air at Q ≫ 1 (see qAir), used here to show spirals.
     ecartForce(theta)          1 − sin θ/θ: relative error of the linearised restoring force (θ²/6 at small θ).
     angleForce(r)              the angle at which that error reaches r (0 < r < 1).
     ecartPeriodeLineaire(t0)   T₀/T(θ₀) − 1 < 0: the error of the small-angle period at amplitude θ₀.
     angleEcartPeriode(r)       the amplitude θ₀ at which T(θ₀)/T₀ − 1 = r.
   Phase portrait
     energie(w, th, om)         e above; kappa2(w, th, om) = e/(2ω₀²).
     nature(w, th, om, tol)     "repos" (k² = 0), "oscillation", "separatrice" (|k² − 1| ≤ tol, default 1e-9), "revolution".
     separatrice(w, th)         θ̇ ≥ 0 on the separatrix: 2ω₀ cos(θ/2), θ in [−π, π].
     courbe(w, k2, n)           the level curve of energy k², as polylines [[θ, θ̇]…] with θ in [−π, π]: one closed curve for
                                k² < 1, two open branches (θ̇ > 0 and θ̇ < 0) for k² ≥ 1.
     ramener(th)                θ brought into ]−π, π].
     trajectoire(w, th0, om0, o)  leapfrog of Integ from (θ₀, θ̇₀); o = { Q, h (default T₀/400), duree (default 3 T₀), every }:
                                { t, th, om, e } (θ not wrapped).
     equilibres(w)              Travail.equilibres on Travail.profils.pendule: θ = 0 stable, ±π unstable.
     sortieCol(w, phi0, phi1)   linearised near the top (φ = θ − π, φ̈ = ω₀²φ), released at rest at φ₀: φ = φ₀ cosh ω₀t,
                                so φ₁ is reached at arcosh(φ₁/φ₀)/ω₀. Not ln(φ₁/φ₀)/ω₀, which forgets the decaying mode.
   Period
     periode(w, th0)            exact, released at rest from θ₀ (Osc.periodePendule, AGM).
     periodeEnergie(w, k2)      oscillation (k² < 1): T = 4K(k)/ω₀; revolution (k² > 1): time for one turn, 2K(1/k)/(k ω₀);
                                Infinity on the separatrix. K by the same AGM, through Osc.periodePendule.
     borda(w, th0)              T₀(1 + θ₀²/16) (Osc.periodePenduleApprox); ecartBorda(th0) = borda/exact − 1 ≈ −11θ₀⁴/3072.
     periodeSerie(w, th0, n)    Σ [(2k)!/(2^{2k}(k!)²)]² sin^{2k}(θ₀/2), n terms: the series of the complete elliptic integral.
   Describing the system
     tension(o)                 bob launched at the bottom with speed v0: o = { m, l, v0, g }. T(θ) = m g (v0²/(gℓ) − 2 + 3 cos θ).
                                { T(th), regime: "oscillation" | "decroche" | "revolution", angleMax (highest angle on the circle), angleDecroche, vDecroche }:
                                a string goes slack where T = 0 (2gℓ < v0² < 5gℓ), above the horizontal; a rigid rod is then
                                compressed instead. tensionLache(m, l, th0, th, g): released at rest, m g (3 cos θ − 2 cos θ₀).
     penduleReel(o)             { l (pivot to centre of the ball), r (ball radius), m (ball), mt (rod mass, uniform, default 0), g }:
                                { T0 (simple pendulum), T (rigid body, small angles), ecart = T/T0 − 1, lEq (equivalent length) }.
     qAir(o)                    { m, d, l, theta0, g }: Osc.qFluide with k = m g/ℓ and amplitude ℓθ₀ (arc): { Q, Qmin, Qmax, KC, reynolds, … }.
     foucault(lat)              rotation of the swing plane, Ω sin λ (Ω relative to the stars): { omega, periode } in rad·s⁻¹, s.
     coriolis(l, g)             2Ω/ω₀: the Coriolis force over the restoring force, at most.
     allongementFil(o)          { m, l, d (wire diameter), E (Young's modulus), theta0, g }, released at rest at θ₀:
                                { statique: m g ℓ/(E A), the stretch at rest (m), absorbed in an ℓ measured with the ball hanging;
                                  variation: 3 m g (1 − cos θ₀)/(E A), its change during the swing as a fraction of ℓ (the tension
                                  goes from m g cos θ₀ at the ends to m g (3 − 2 cos θ₀) at the bottom) }.
   Huygens's cycloid
     cycloide(a)                inverted cycloid of generating radius a, cusps at height 2a: { l: 4a (equivalent length),
                                periode: 4π√(a/g), point(phi) → [x, z], hauteur(s) = s²/(8a) }.
     cheminCycloide(a, h0, n)   Travail.chemin.polyligne from height h0 (0 < h0 ≤ 2a) down to the bottom, n pieces (default 2000).
     descenteCycloide(a, h0, o) Travail.glissade on it, from rest: the time to the bottom (a quarter period), any h0.
     descenteCercle(l, h0, g)   the same on a circle of radius ℓ, released at height h0 (exact: Osc.periodePendule / 4).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Osc = node ? require("./oscillateur.js") : root.Osc;
  const Travail = node ? require("./travail.js") : root.Travail;
  const G = Osc.G, TAU = 2 * Math.PI;

  const err = m => { throw new Error("pendule: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const gOf = g => g == null ? G : positive(g, "g");

  /* ---------- equation and linearisation ---------- */
  const pulsation = (l, g) => Osc.pulsationPendule(l, g);
  function systeme(w, Q) {
    if (Q == null || Q === Infinity) return Object.assign(Osc.pendule(w), { Q: Infinity, vdep: false });
    positive(Q, "Q");
    const P = Osc.pendule(w), w2 = w * w, c = w / Q;
    return { w, Q, vdep: true, energy: P.energy, a: (t, x, v) => x.map((q, i) => -w2 * Math.sin(q) - c * v[i]) };
  }
  const ecartForce = th => { finite(th, "θ"); return th === 0 ? 0 : 1 - Math.sin(th) / th; };
  /* bisection on ]0, π[, where 1 − sin θ/θ increases from 0 to 1 */
  function bisect(f, lo, hi) { for (let i = 0; i < 200 && hi - lo > 1e-15; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; } return (lo + hi) / 2; }
  function angleForce(r) { finite(r, "r"); if (!(r > 0 && r < 1)) err("r entre 0 et 1"); return bisect(t => ecartForce(t) - r, 0, Math.PI); }
  const ecartPeriodeLineaire = t0 => 1 / (Osc.periodePendule(1, t0) / TAU) - 1;
  function angleEcartPeriode(r) { positive(r, "r"); return bisect(t => Osc.periodePendule(1, t) / TAU - 1 - r, 0, Math.PI - 1e-12); }

  /* ---------- phase portrait ---------- */
  const energie = (w, th, om) => { positive(w, "ω₀"); finite(th, "θ"); finite(om, "θ̇"); return om * om / 2 + w * w * (1 - Math.cos(th)); };
  const kappa2 = (w, th, om) => energie(w, th, om) / (2 * w * w);
  function nature(w, th, om, tol) {
    const k2 = kappa2(w, th, om); tol = tol == null ? 1e-9 : tol;
    return k2 === 0 ? "repos" : Math.abs(k2 - 1) <= tol ? "separatrice" : k2 < 1 ? "oscillation" : "revolution";
  }
  const separatrice = (w, th) => { positive(w, "ω₀"); finite(th, "θ"); if (Math.abs(th) > Math.PI) err("θ dans [−π, π]"); return 2 * w * Math.cos(th / 2); };
  function courbe(w, k2, n) {
    positive(w, "ω₀"); positive(k2, "k²"); n = n == null ? 200 : n;
    if (!Number.isInteger(n) || n < 4) err("n entier ≥ 4");
    /* θ̇² = 4ω₀²(k² − sin²(θ/2)) */
    const om = th => 2 * w * Math.sqrt(Math.max(0, k2 - Math.sin(th / 2) ** 2));
    if (k2 < 1) {
      const tm = 2 * Math.asin(Math.sqrt(k2)), up = [];
      /* θ = tm sin u spreads the points where the curve turns */
      for (let i = 0; i <= n; i++) { const th = tm * Math.sin(-Math.PI / 2 + Math.PI * i / n); up.push([th, om(th)]); }
      const down = up.slice(1, -1).reverse().map(([th, o]) => [th, -o]);
      return [up.concat(down, [up[0]])];
    }
    const up = []; for (let i = 0; i <= n; i++) { const th = -Math.PI + TAU * i / n; up.push([th, om(th)]); }
    return [up, up.map(([th, o]) => [th, -o])];
  }
  const ramener = th => { finite(th, "θ"); let r = th - TAU * Math.round(th / TAU); if (r <= -Math.PI) r += TAU; return r; };
  function trajectoire(w, th0, om0, o) {
    positive(w, "ω₀"); finite(th0, "θ₀"); finite(om0, "θ̇₀"); o = o || {};
    const S = systeme(w, o.Q), T0 = TAU / w, h = o.h == null ? T0 / 400 : positive(o.h, "h"), duree = o.duree == null ? 3 * T0 : positive(o.duree, "duree");
    const n = Math.ceil(duree / h), r = Integ.run("leapfrog", S.a, { t: 0, x: [th0], v: [om0] }, h, n, { vdep: S.vdep, every: o.every || 1 });
    const th = r.x.map(x => x[0]), om = r.v.map(v => v[0]);
    return { t: r.t, th, om, e: th.map((q, i) => energie(w, q, om[i])) };
  }
  function equilibres(w) {
    positive(w, "ω₀");
    const g = w * w, P = Travail.profils.pendule(1, 1, g);          // ℓ = 1 m, g = ω₀²: x = θ
    return Travail.equilibres(P).map(e => ({ theta: e.x, nature: e.nature }));
  }

  function sortieCol(w, phi0, phi1) {
    positive(w, "ω₀"); positive(phi0, "φ₀"); positive(phi1, "φ₁"); if (!(phi1 >= phi0)) err("φ₁ ≥ φ₀");
    return Math.acosh(phi1 / phi0) / w;
  }

  /* ---------- period ---------- */
  const periode = (w, th0) => Osc.periodePendule(w, th0);
  /* K(k) = π / (2 AGM(1, √(1 − k²))) = Osc.periodePendule(1, 2 asin k) / 4 */
  const K = k => Osc.periodePendule(1, 2 * Math.asin(k)) / 4;
  function periodeEnergie(w, k2) {
    positive(w, "ω₀"); positive(k2, "k²");
    if (k2 === 1) return Infinity;
    if (k2 < 1) return 4 * K(Math.sqrt(k2)) / w;
    const k = Math.sqrt(k2); return 2 * K(1 / k) / (k * w);
  }
  const borda = (w, th0) => Osc.periodePenduleApprox(w, th0);
  const ecartBorda = th0 => borda(1, th0) / Osc.periodePendule(1, th0) - 1;
  function periodeSerie(w, th0, n) {
    positive(w, "ω₀"); finite(th0, "θ₀"); if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1");
    const s2 = Math.sin(th0 / 2) ** 2; let c = 1, sum = 0, p = 1;
    for (let k = 0; k < n; k++) { if (k) c *= (2 * k - 1) / (2 * k); sum += c * c * p; p *= s2; }
    return TAU / w * sum;
  }

  /* ---------- describing the system ---------- */
  function tension(o) {
    o = o || {};
    const m = positive(o.m, "m"), l = positive(o.l, "l"), g = gOf(o.g), v0 = finite(o.v0, "v0"), u = v0 * v0 / (g * l);
    const T = th => m * g * (u - 2 + 3 * Math.cos(finite(th, "θ")));
    if (u <= 2) return { T, regime: "oscillation", angleMax: Math.acos(1 - u / 2), angleDecroche: NaN, vDecroche: NaN };
    if (u >= 5 - 1e-12) return { T, regime: "revolution", angleMax: Math.PI, angleDecroche: NaN, vDecroche: NaN };
    const c = (2 - u) / 3;                                    // T = 0 there; v² = −gℓ cos θ*: the weight alone makes the turn
    return { T, regime: "decroche", angleMax: Math.acos(c), angleDecroche: Math.acos(c), vDecroche: Math.sqrt(-g * l * c) };
  }
  const tensionLache = (m, l, th0, th, g) => { positive(m, "m"); positive(l, "l"); finite(th0, "θ₀"); finite(th, "θ"); return m * gOf(g) * (3 * Math.cos(th) - 2 * Math.cos(th0)); };
  function penduleReel(o) {
    o = o || {};
    const l = positive(o.l, "l"), r = finite(o.r == null ? 0 : o.r, "r"), m = positive(o.m, "m"), mt = finite(o.mt == null ? 0 : o.mt, "mt"), g = gOf(o.g);
    if (r < 0 || mt < 0) err("r ≥ 0 et mt ≥ 0"); if (r >= l) err("la boule ne contient pas le pivot : r < ℓ");
    const J = m * (l * l + 2 * r * r / 5) + mt * l * l / 3, md = m * l + mt * l / 2;  // moment of inertia about the pivot; m·d
    const T0 = TAU * Math.sqrt(l / g), T = TAU * Math.sqrt(J / (md * g));
    return { T0, T, ecart: T / T0 - 1, lEq: J / md };
  }
  function qAir(o) {
    o = o || {};
    const m = positive(o.m, "m"), l = positive(o.l, "l"), g = gOf(o.g), th = positive(o.theta0, "θ₀");
    return Osc.qFluide(m, positive(o.d, "d"), m * g / l, l * th, o.fluid);
  }
  function foucault(lat) {
    finite(lat, "λ"); if (Math.abs(lat) > Math.PI / 2) err("latitude entre −π/2 et π/2");
    const omega = Cst.Omega_E * Math.sin(lat);
    return { omega, periode: omega === 0 ? Infinity : TAU / Math.abs(omega) };
  }
  const coriolis = (l, g) => 2 * Cst.Omega_E / pulsation(l, g);
  function allongementFil(o) {
    o = o || {};
    const m = positive(o.m, "m"), l = positive(o.l, "l"), d = positive(o.d, "d"), E = positive(o.E, "E"), th = finite(o.theta0, "θ₀"), g = gOf(o.g);
    const k = m * g / (E * Math.PI * d * d / 4);                 // relative stretch under the weight m g
    return { statique: k * l, variation: 3 * (1 - Math.cos(th)) * k };
  }

  /* ---------- Huygens's cycloid ---------- */
  function cycloide(a, g) {
    positive(a, "a"); g = gOf(g);
    return { a, l: 4 * a, periode: 2 * TAU * Math.sqrt(a / g),
      point: phi => [a * (finite(phi, "φ") - Math.sin(phi)), a * (1 + Math.cos(phi))],    // φ = 0, 2π: cusps; φ = π: bottom
      hauteur: s => finite(s, "s") ** 2 / (8 * a) };
  }
  function cheminCycloide(a, h0, n) {
    positive(a, "a"); positive(h0, "h0"); if (h0 > 2 * a * (1 + 1e-12)) err("h0 ≤ 2a : la cycloïde s'arrête au point de rebroussement");
    n = n == null ? 2000 : n; if (!Number.isInteger(n) || n < 2) err("n entier ≥ 2");
    const C = cycloide(a), p0 = Math.acos(Math.min(1, Math.max(-1, h0 / a - 1))), P = [];
    for (let i = 0; i <= n; i++) P.push(C.point(p0 + (Math.PI - p0) * i / n));
    return Travail.chemin.polyligne(P);
  }
  function descenteCycloide(a, h0, o) {
    o = o || {}; const g = gOf(o.g);
    const run = Travail.glissade(cheminCycloide(a, h0, o.n), { m: 1, g, h: o.h == null ? Math.sqrt(a / g) / 2000 : o.h, tmax: 10 * Math.sqrt(a / g) });
    return run.arrivee;
  }
  function descenteCercle(l, h0, g) {
    positive(l, "l"); positive(h0, "h0"); if (!(h0 < 2 * l)) err("h0 < 2ℓ");
    return Osc.periodePendule(pulsation(l, g), Math.acos(1 - h0 / l)) / 4;
  }

  const api = { G, pulsation, systeme, ecartForce, angleForce, ecartPeriodeLineaire, angleEcartPeriode,
    energie, kappa2, nature, separatrice, courbe, ramener, trajectoire, equilibres, sortieCol,
    periode, periodeEnergie, borda, ecartBorda, periodeSerie,
    tension, tensionLache, penduleReel, qAir, foucault, coriolis, allongementFil,
    cycloide, cheminCycloide, descenteCycloide, descenteCercle };
  if (node) module.exports = api;
  else root.Pendule = api;
})(typeof self !== "undefined" ? self : this);

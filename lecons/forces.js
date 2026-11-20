/* Models of forces for the « Caractéristiques des forces » lessons (Feynman I.12.1 to I.12.4): weight, buoyancy, fluid drag
   (linear, quadratic, and a correlation between them), Coulomb's solid friction, the Lennard-Jones potential and its spring
   constant, Coulomb and Newton forces with superposition, coupling constants and ranges.
   Pure, no DOM, UMD (global Forces). SI throughout: m, kg, s, N, J, C. Every function is a model: its domain is in the comment. */
(function (root) {
  /* ---------- constants ---------- */
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G0 = Cst.g_CPGE;                             // m·s⁻², rounded value used in CPGE
  const GN = Cst.G, E = Cst.e, EPS0 = Cst.eps0, HBAR = Cst.hbar, C = Cst.c, KB = Cst.k_B, U = Cst.u, ME = Cst.m_e, MP = Cst.m_p;
  const K = 1 / (4 * Math.PI * EPS0);               // ≈ 8,99 × 10⁹ N·m²·C⁻²
  const HBARC = HBAR * C / (1e6 * E) / 1e-15;       // MeV·fm, ≈ 197,327 (exact since 2019)
  /* fluids: air at sea level in the standard atmosphere (288 K), water at 293 K */
  const FLUIDS = { air: { rho: 1.225, eta: 1.79e-5 }, eau: { rho: 998, eta: 1.0e-3 } };
  /* spheres used in the lessons: d diameter (m), m mass (kg) */
  const sphereVolume = d => Math.PI * d * d * d / 6;
  const OBJETS = {
    bille: { d: 0.01, m: 7850 * sphereVolume(0.01) },          // steel bead, 1 cm
    goutte: { d: 0.002, m: 998 * sphereVolume(0.002) },        // raindrop, 2 mm, kept spherical
    pingpong: { d: 0.040, m: 0.0027 },                          // table tennis ball: 40 mm, 2,7 g
    tennis: { d: 0.067, m: 0.0577 },                            // tennis ball: middle of 6,54–6,86 cm and 56,0–59,4 g
  };
  /* static and kinetic friction coefficients (OpenStax, College Physics, table 5.1): typical values, ±30 % in practice */
  const PAIRS = {
    pneu_sec: { mus: 1.0, muk: 0.7 }, pneu_mouille: { mus: 0.7, muk: 0.5 }, bois: { mus: 0.5, muk: 0.3 },
    acier: { mus: 0.6, muk: 0.3 }, acier_huile: { mus: 0.05, muk: 0.03 }, glace: { mus: 0.1, muk: 0.03 },
  };
  /* Lennard-Jones parameters of argon: ε/k_B = 120 K, σ = 0,34 nm; atomic mass 39,948 u */
  const ARGON = { eps: 120 * KB, sig: 0.34e-9, m: 39.948 * U };

  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) throw new Error("forces: " + name + " doit être un nombre fini"); };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) throw new Error("forces: " + name + " doit être strictement positif"); };
  const fluidOf = f => { const x = typeof f === "string" ? FLUIDS[f] : f; if (!x) throw new Error("forces: fluide inconnu"); positive(x.rho, "rho"); positive(x.eta, "eta"); return x; };

  /* ---------- weight and buoyancy ---------- */
  /* weight in the lab frame: g includes the axial rotation of the Earth; uniform over the size of the system */
  function weight(m, g) { finite(m, "m"); if (m < 0) throw new Error("forces: masse négative"); return m * (g == null ? G0 : g); }
  /* Archimedes: weight of the displaced fluid, for a body at rest or slow in a fluid at rest */
  function buoyancy(V, rhoF, g) { finite(V, "V"); finite(rhoF, "rhoF"); return rhoF * V * (g == null ? G0 : g); }

  /* ---------- fluid drag on a sphere of diameter d ---------- */
  /* Reynolds number built on the diameter: inertia of the fluid / viscosity */
  function reynolds(rho, v, d, eta) { positive(rho, "rho"); finite(v, "v"); positive(d, "d"); positive(eta, "eta"); return rho * Math.abs(v) * d / eta; }
  /* Stokes (1851): F = 6π η r v = 3π η d v, valid for Re ≲ 1: it underestimates the drag by ≈ 10 % near Re = 0,5 and
     by 15 % (Schiller–Naumann) to 19 % (Oseen) at Re = 1; see stokesError */
  function stokes(eta, d, v) { positive(eta, "eta"); positive(d, "d"); finite(v, "v"); return 3 * Math.PI * eta * d * v; }
  /* quadratic drag: F = ½ ρ C_x S v², C_x of a sphere ≈ 0,44 for 10³ ≲ Re ≲ 2 × 10⁵ */
  const CX_SPHERE = 0.44, RE_LIN = 1, RE_QUAD = 1000, RE_CRISE = 2e5;
  function quadratic(rho, cx, S, v) { positive(rho, "rho"); positive(cx, "cx"); positive(S, "S"); finite(v, "v"); return 0.5 * rho * cx * S * v * Math.abs(v); }
  /* Schiller–Naumann correlation: C_x = 24/Re (1 + 0,15 Re^0,687) below Re = 1000, 0,44 above; NaN past the drag crisis */
  function cdSphere(re) {
    finite(re, "Re"); if (!(re > 0)) throw new Error("forces: Re doit être strictement positif");
    if (re > RE_CRISE) return NaN;
    return re < RE_QUAD ? 24 / re * (1 + 0.15 * Math.pow(re, 0.687)) : CX_SPHERE;
  }
  /* relative error of Stokes's law, (C_x − 24/Re)/(24/Re): Schiller–Naumann 0,15 Re^0,687, or Oseen's first correction 3 Re/16 */
  function stokesError(re, model) {
    finite(re, "Re"); if (!(re > 0)) throw new Error("forces: Re doit être strictement positif");
    if (model === "oseen") return 3 * re / 16;
    if (re >= RE_QUAD) throw new Error("forces: Schiller–Naumann seulement sous Re = 1000");
    return cdSphere(re) * re / 24 - 1;
  }
  function regime(re) { finite(re, "Re"); return re < RE_LIN ? "lineaire" : re < RE_QUAD ? "intermediaire" : re <= RE_CRISE ? "quadratique" : "crise"; }
  /* drag force on a sphere moving at v in a fluid at rest, from the correlation; 0 at rest, NaN past the drag crisis */
  function dragSphere(fluid, d, v) {
    const f = fluidOf(fluid); positive(d, "d"); finite(v, "v");
    if (v === 0) return 0;
    const re = reynolds(f.rho, v, d, f.eta);
    return Math.sign(v) * 0.5 * f.rho * cdSphere(re) * (Math.PI * d * d / 4) * v * v;
  }

  /* ---------- falling sphere: forces kept and neglected ---------- */
  function objectOf(o) { const x = typeof o === "string" ? OBJETS[o] : o; if (!x) throw new Error("forces: objet inconnu"); positive(x.d, "d"); positive(x.m, "m"); return x; }
  /* weight, buoyancy and drag on a sphere falling at speed v; ratios to the weight say what can be neglected */
  function bilan(obj, fluid, v, g) {
    const o = objectOf(obj), f = fluidOf(fluid); g = g == null ? G0 : g; finite(v, "v"); if (v < 0) throw new Error("forces: v ≥ 0");
    const P = weight(o.m, g), A = buoyancy(sphereVolume(o.d), f.rho, g), D = dragSphere(f, o.d, v), re = v ? reynolds(f.rho, v, o.d, f.eta) : 0;
    return { P, A, D, re, regime: regime(re), rA: A / P, rD: D / P };
  }
  /* apparent weight in the fluid: weight − buoyancy; ≤ 0 means the sphere does not sink */
  function apparent(obj, fluid, g) { const o = objectOf(obj), f = fluidOf(fluid); g = g == null ? G0 : g; return o.m * g - f.rho * sphereVolume(o.d) * g; }
  /* fastest speed still inside the model; the margin keeps Re = ρ v d / η from rounding past the crisis */
  const vCrise = (f, d) => RE_CRISE * f.eta / (f.rho * d) * (1 - 1e-9);
  /* speed at which drag reaches a fraction r of the weight (bisection, drag increasing with v); NaN if never below the crisis */
  function speedAtRatio(obj, fluid, r, g) {
    const o = objectOf(obj), f = fluidOf(fluid); positive(r, "r"); g = g == null ? G0 : g;
    const target = r * o.m * g, vmax = vCrise(f, o.d);
    if (dragSphere(f, o.d, vmax) < target) return NaN;
    let lo = 0, hi = vmax;
    for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (dragSphere(f, o.d, mid) < target) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }
  /* terminal velocity in the three models: linear (Stokes), quadratic (C_x = 0,44), correlation; Re of the correlation */
  function terminal(obj, fluid, g) {
    const o = objectOf(obj), f = fluidOf(fluid); g = g == null ? G0 : g;
    const W = apparent(o, f, g);
    if (!(W > 0)) return { lin: NaN, quad: NaN, corr: NaN, re: NaN, flotte: true };
    const lin = W / (3 * Math.PI * f.eta * o.d), quad = Math.sqrt(2 * W / (f.rho * CX_SPHERE * Math.PI * o.d * o.d / 4));
    const vmax = vCrise(f, o.d);
    let corr = NaN;
    if (dragSphere(f, o.d, vmax) >= W) {
      let lo = 0, hi = vmax;
      for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (dragSphere(f, o.d, mid) < W) lo = mid; else hi = mid; }
      corr = (lo + hi) / 2;
    }
    return { lin, quad, corr, re: isFinite(corr) ? reynolds(f.rho, corr, o.d, f.eta) : NaN, flotte: false };
  }
  /* a sphere of diameter d and density rhoS, for scans over the size */
  const sphere = (d, rhoS) => { positive(d, "d"); positive(rhoS, "rhoS"); return { d, m: rhoS * sphereVolume(d) }; };
  /* fall from rest, closed forms: linear drag v = v_l (1 − e^(−t/τ)), τ = v_l/g'; quadratic v = v_l tanh(g' t / v_l) */
  function fallLinear(t, vl, gp) { finite(t, "t"); positive(vl, "vl"); positive(gp, "g'"); return vl * (1 - Math.exp(-t * gp / vl)); }
  function fallQuadratic(t, vl, gp) { finite(t, "t"); positive(vl, "vl"); positive(gp, "g'"); return vl * Math.tanh(gp * t / vl); }

  /* ---------- Coulomb's solid friction ---------- */
  /* a block on a plane tilted by theta (rad): sticks while tan θ ≤ μs; then slides with a = g (sin θ − μk cos θ).
     Per unit mass: rn and rt are the normal and tangential components of the reaction, in N·kg⁻¹. */
  function incline(theta, mus, muk, g) {
    finite(theta, "theta"); if (theta < 0 || theta > Math.PI / 2) throw new Error("forces: angle entre 0 et π/2");
    finite(mus, "mus"); finite(muk, "muk"); if (mus < 0 || muk < 0) throw new Error("forces: coefficients positifs");
    if (muk > mus) throw new Error("forces: μk ≤ μs");
    g = g == null ? G0 : g;
    const s = Math.sin(theta), c = Math.cos(theta), rn = g * c;
    if (s <= mus * c + 1e-15) return { glisse: false, a: 0, rn, rt: g * s, usage: mus ? s / (mus * c) : (s ? Infinity : 0) };
    return { glisse: true, a: g * (s - muk * c), rn, rt: muk * rn, usage: 1 };
  }
  const angleLimite = mus => { finite(mus, "mus"); if (mus < 0) throw new Error("forces: μs ≥ 0"); return Math.atan(mus); };
  /* the tangential reaction a support can give at rest: |T| ≤ μs N */
  function adhere(T, N, mus) { finite(T, "T"); finite(N, "N"); finite(mus, "mus"); if (N < 0) throw new Error("forces: N ≥ 0, sinon le contact est rompu"); return Math.abs(T) <= mus * N; }

  /* ---------- elastic restoring force ---------- */
  /* Hooke: F = −k (ℓ − ℓ0), along the spring; valid for small strains (< 0,1 % for a steel bar before yield) */
  function hooke(k, l, l0) { positive(k, "k"); finite(l, "l"); positive(l0, "l0"); return -k * (l - l0); }

  /* ---------- Lennard-Jones potential ---------- */
  function ljU(r, eps, sig) { positive(r, "r"); const s6 = Math.pow(sig / r, 6); return 4 * eps * (s6 * s6 - s6); }
  /* radial force F = −dU/dr: > 0 repulsive, < 0 attractive */
  function ljF(r, eps, sig) { positive(r, "r"); const s6 = Math.pow(sig / r, 6); return 24 * eps / r * (2 * s6 * s6 - s6); }
  const ljR0 = sig => { positive(sig, "sigma"); return Math.pow(2, 1 / 6) * sig; };
  /* spring constant of the bond: k = U''(r0) = 72 ε / r0² */
  const ljK = (eps, sig) => { positive(eps, "eps"); const r0 = ljR0(sig); return 72 * eps / (r0 * r0); };
  /* relative error of Hooke's law at displacement x from r0: (F_true − F_harm)/F_harm; ≈ −10,5 x/r0 when small */
  function hookeError(x, eps, sig) {
    finite(x, "x"); if (x === 0) return 0;
    const r0 = ljR0(sig), fh = -ljK(eps, sig) * x, ft = ljF(r0 + x, eps, sig);
    return (ft - fh) / fh;
  }
  /* small oscillations of a pair of atoms of mass m each: reduced mass m/2, ω = √(k/μ) */
  const omegaPair = (k, m) => { positive(k, "k"); positive(m, "m"); return Math.sqrt(k / (m / 2)); };

  /* ---------- Coulomb and Newton, fields, superposition ---------- */
  /* signed radial forces: > 0 repulsive */
  function coulomb(q1, q2, r) { finite(q1, "q1"); finite(q2, "q2"); positive(r, "r"); return K * q1 * q2 / (r * r); }
  function newton(m1, m2, r) { positive(m1, "m1"); positive(m2, "m2"); positive(r, "r"); return -GN * m1 * m2 / (r * r); }
  /* electric field at (x, y) of point charges [{q, x, y}]: vector sum of each one's field (superposition) */
  function field(sources, x, y) {
    finite(x, "x"); finite(y, "y");
    let ex = 0, ey = 0;
    for (const s of sources) {
      finite(s.q, "q"); const dx = x - s.x, dy = y - s.y, r2 = dx * dx + dy * dy;
      if (!(r2 > 0)) return { ex: NaN, ey: NaN, e: NaN };
      const k = K * s.q / (r2 * Math.sqrt(r2)); ex += k * dx; ey += k * dy;
    }
    return { ex, ey, e: Math.hypot(ex, ey) };
  }
  /* gravitational field at (x, y) of point masses [{m, x, y}]: always towards the masses */
  function gravField(sources, x, y) {
    let gx = 0, gy = 0;
    for (const s of sources) {
      positive(s.m, "m"); const dx = x - s.x, dy = y - s.y, r2 = dx * dx + dy * dy;
      if (!(r2 > 0)) return { gx: NaN, gy: NaN, g: NaN };
      const k = -GN * s.m / (r2 * Math.sqrt(r2)); gx += k * dx; gy += k * dy;
    }
    return { gx, gy, g: Math.hypot(gx, gy) };
  }
  /* electric over gravitational force between two identical particles: independent of the distance */
  const ratioEG = (q, m) => { finite(q, "q"); positive(m, "m"); return K * q * q / (GN * m * m); };
  /* two bodies of mass m at distance r, each with a fraction f of its electrons in excess; zA electrons per nucleon
     (Z/A = 0,5 for most nuclei past hydrogen), nucleon mass ≈ u: q = f zA (m/u) e, repulsion K q² / r² */
  function excessCharge(m, f, zA, r) {
    positive(m, "m"); positive(f, "f"); positive(zA, "Z/A"); positive(r, "r");
    const q = f * zA * (m / U) * E;
    return { q, F: K * q * q / (r * r) };
  }
  /* dimensionless couplings: α = e²/(4π ε0 ħ c) ≈ 1/137; α_G = G m²/(ħ c) */
  const alpha = () => E * E * K / (HBAR * C);
  const alphaG = m => { positive(m, "m"); return GN * m * m / (HBAR * C); };
  /* range of an interaction carried by a particle of rest energy mc² (MeV): ħ/(mc) in fm (Yukawa) */
  const range = mc2 => { positive(mc2, "mc²"); return HBARC / mc2; };
  const MPI = 139.57, MW = 80369;                   // MeV: charged pion, W boson

  const api = {
    G0, GN, E, EPS0, K, HBAR, C, KB, U, ME, MP, HBARC, MPI, MW, FLUIDS, OBJETS, PAIRS, ARGON, CX_SPHERE, RE_LIN, RE_QUAD, RE_CRISE,
    sphereVolume, weight, buoyancy, reynolds, stokes, quadratic, cdSphere, regime, dragSphere, bilan, apparent, speedAtRatio, terminal, sphere,
    fallLinear, fallQuadratic, incline, angleLimite, adhere, hooke, ljU, ljF, ljR0, ljK, hookeError, omegaPair,
    coulomb, newton, field, gravField, ratioEG, excessCharge, stokesError, alpha, alphaG, range,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Forces = api;
})(typeof self !== "undefined" ? self : this);

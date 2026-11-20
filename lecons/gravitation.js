/* Gravitation — the calculations of the lessons I.7.5 to I.7.8 (Feynman vol. I, §7-5 to §7-8): Newton's law across scales and
   the tides, Cavendish's torsion balance and the mass of the Earth, the equivalence of inertial and gravitational mass, the first
   relativistic corrections. Pure, no DOM, UMD (global Gravitation). SI throughout: m, kg, s, N, rad.
   Every function is a model: its domain is in the comment. Constants come from constantes.js; the astronomical data below are
   measurements of particular bodies, not constants, each with its source.
   The air drag of the Cavendish lesson reuses the sphere correlation of forces.js (global Forces). */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Forces = node ? require("./forces.js") : root.Forces;
  const G = Cst.G, C = Cst.c, EPS0 = Cst.eps0, GM_E = Cst.GM_E, GM_SUN = Cst.GM_sun, R_E = Cst.R_E_mean, AU = Cst.au;
  const YEAR = 365.25 * 86400;                       // s, Julian year (IAU)
  const ARCSEC = Math.PI / (180 * 3600);             // rad
  const M_SUN = GM_SUN / G;                          // kg, ≈ 1,989 × 10³⁰ (GM is known far better than M)
  const M_E = GM_E / G;                              // kg, ≈ 5,972 × 10²⁴: « weighing the Earth » is this division

  const err = m => { throw new Error("gravitation: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); };

  /* ---------- astronomical data ---------- */
  /* Moon: mass 0,07346 × 10²⁴ kg, semi-major axis 0,3844 × 10⁶ km, sidereal period 27,3217 days (NASA, Moon fact sheet) */
  const LUNE = { M: 7.346e22, d: 3.844e8, T: 27.3217 * 86400 };
  /* Sirius A and B: semi-major axis 19,8 au, masses 2,063 and 1,018 solar masses, period 50,13 years (Wikipedia, « Sirius », orbit table) */
  const SIRIUS = { a: 19.8 * AU, mA: 2.063, mB: 1.018, T: 50.13 * YEAR };
  /* the Sun in the Milky Way: distance to the centre 8,122 kpc (GRAVITY 2018), circular speed 233,6 km·s⁻¹ (Eilers et al. 2019) */
  const GALAXIE = { R: 8.122e3 * Cst.pc, v: 233.6e3 };
  /* shortest separation at which 1/r² has been tested, 52 µm (Lee et al. 2020, torsion balance, Eöt-Wash) */
  const R_MIN_TESTE = 52e-6;
  /* sidereal year, 365,256 days (NASA, Earth fact sheet) */
  const ANNEE_SID = 365.256 * 86400;

  /* ---------- Newton's law ---------- */
  /* field of a point mass, or outside a spherically symmetric one: GM/r² (Newton, weak field, slow bodies) */
  function field(GM, r) { positive(GM, "GM"); positive(r, "r"); return GM / (r * r); }
  /* Kepler's third law for two bodies of total mass M on an orbit of semi-major axis a: T = 2π √(a³/(G M)) */
  function period(a, Mtot) { positive(a, "a"); positive(Mtot, "M"); return 2 * Math.PI * Math.sqrt(a * a * a / (G * Mtot)); }
  /* mass inside a circular orbit of radius r run at speed v: v² r / G (spherical distribution assumed) */
  function massInside(v, r) { positive(v, "v"); positive(r, "r"); return v * v * r / G; }
  /* weak-field potential depth, dimensionless: GM/(r c²) — the size of the relativistic corrections */
  function phi(GM, r) { positive(GM, "GM"); positive(r, "r"); return GM / (r * C * C); }

  /* the scale ladder of lesson I.7.5: for each system, r, the field GM/r², Φ/c², the period predicted by Newton and the one
     observed. For the Galaxy the mass is not known beforehand: it is what Newton deduces from v and R. */
  function echelles() {
    const lune = LUNE.M, sir = (SIRIUS.mA + SIRIUS.mB) * M_SUN, gal = massInside(GALAXIE.v, GALAXIE.R);
    return {
      pomme: { r: R_E, M: M_E, a: field(GM_E, R_E), phi: phi(GM_E, R_E) },
      lune: { r: LUNE.d, M: M_E, a: field(GM_E, LUNE.d), phi: phi(GM_E, LUNE.d), T: period(LUNE.d, M_E + lune), Tobs: LUNE.T },
      terre: { r: AU, M: M_SUN, a: field(GM_SUN, AU), phi: phi(GM_SUN, AU), T: period(AU, M_SUN + M_E), Tobs: ANNEE_SID },
      sirius: { r: SIRIUS.a, M: sir, a: field(G * sir, SIRIUS.a), phi: phi(G * sir, SIRIUS.a), T: period(SIRIUS.a, sir), Tobs: SIRIUS.T },
      galaxie: { r: GALAXIE.R, M: gal, a: GALAXIE.v * GALAXIE.v / GALAXIE.R, phi: phi(G * gal, GALAXIE.R), T: 2 * Math.PI * GALAXIE.R / GALAXIE.v },
    };
  }

  /* ---------- tides ---------- */
  /* A body of parameter GM at distance d from the centre of a sphere of radius R. Newton, point masses.
     direct: its pull at the centre; tidal: what is left at the surface point facing it once the pull at the centre is removed,
     at first order in R/d (2GMR/d³); exact: the same difference without expansion; far: on the opposite side (pointing away).
     The first order errs by 3R/(2d) in relative terms, 2,5 % for the Moon. */
  function maree(GM, d, R) {
    positive(GM, "GM"); positive(d, "d"); positive(R, "R"); if (!(R < d)) err("il faut R < d");
    const direct = GM / (d * d), tidal = 2 * GM * R / (d * d * d);
    const near = GM / ((d - R) * (d - R)) - direct, far = direct - GM / ((d + R) * (d + R));
    return { direct, tidal, near, far, ratio: tidal / direct, err: (near - tidal) / near };
  }
  /* tidal acceleration at the surface point of polar angle θ from the line to the body, first order in R/d:
     radial k(3cos²θ \u2212 1), tangential \u2212(3/2) k sin 2θ, with k = GMR/d³. Two bulges, at θ = 0 and π. */
  function tidalAt(GM, d, R, theta) {
    positive(GM, "GM"); positive(d, "d"); positive(R, "R"); finite(theta, "θ");
    const k = GM * R / (d * d * d), c = Math.cos(theta), s = Math.sin(theta);
    return { r: k * (3 * c * c - 1), t: -1.5 * k * 2 * s * c };
  }
  /* the Moon and the Sun on the Earth, at their mean distances */
  const mareeLune = () => maree(G * LUNE.M, LUNE.d, R_E);
  const mareeSoleil = () => maree(GM_SUN, AU, R_E);

  /* ---------- Cavendish's torsion balance ---------- */
  /* apparatus of 1798: two lead balls of 0,73 kg (diameter 51 mm) at the ends of a 1,8 m rod, two of 158 kg (diameter 0,30 m),
     centres 0,225 m apart; period 7,5 min with the stiffer wire (Cavendish 1798, as summarised by Wikipedia, « Cavendish experiment »).
     The torsion constant is the one that gives this period with the rod's mass neglected. */
  const CAVENDISH_1798 = { M: 158, m: 0.73, l: 0.9, d: 0.225, D: 0.30, dm: 0.051, T: 450 };
  const inertia = (m, l) => 2 * m * l * l;                         // two point masses at ±l, rod neglected
  const kappaOf = (m, l, T) => 4 * Math.PI * Math.PI * inertia(m, l) / (T * T);
  CAVENDISH_1798.kappa = kappaOf(CAVENDISH_1798.m, CAVENDISH_1798.l, CAVENDISH_1798.T);

  /* The balance in equilibrium after the large balls are brought in, each at distance d from a small ball, on opposite sides.
     Model: point masses, small deflection, rod and wire mass neglected, the other large ball (at √(d² + 4l²)) neglected in θ
     but returned as farFrac, the fraction it removes from the torque. o = { G, M, m, l, d, kappa, dm (small ball diameter) }.
     Returns F (one pair), torque, theta (rad), s = l θ (arc at the ball), T (period), weightRatio F/(m g0),
     and the parasitic forces of the same size: air speed whose drag equals F, charge on each ball whose Coulomb force equals F,
     and the potential of the small ball under that charge. */
  function cavendish(o) {
    o = Object.assign({}, CAVENDISH_1798, o);
    const g = o.G == null ? G : o.G;
    ["M", "m", "l", "d", "kappa", "dm"].forEach(k => positive(o[k], k)); positive(g, "G");
    if (!(o.d < 2 * o.l)) err("les grosses boules doivent être plus près des petites que la longueur du fléau");
    const F = g * o.M * o.m / (o.d * o.d), torque = 2 * F * o.l, theta = torque / o.kappa;
    const T = 2 * Math.PI * Math.sqrt(inertia(o.m, o.l) / o.kappa);
    const D = Math.sqrt(o.d * o.d + 4 * o.l * o.l), farFrac = Math.pow(o.d / D, 3);
    return { F, torque, theta, s: o.l * theta, T, I: inertia(o.m, o.l), weightRatio: F / (o.m * Cst.g0), farFrac,
      air: airSpeedFor(F, o.dm), q: chargeFor(F, o.d), V: chargeFor(F, o.d) / (4 * Math.PI * EPS0 * o.dm / 2) };
  }
  /* Cavendish's 29 determinations of the Earth's mean density, in multiples of the density of water, in the order of his table
     (Cavendish 1798, as tabulated by Stigler 1977, « Do robust estimators work with real data? », and the HistData package).
     The memoir prints the mean as 5,48: the third value, 4,88, was counted as 5,88 (found by Baily). */
  const CAVENDISH_29 = Object.freeze([5.50, 5.61, 4.88, 5.07, 5.26, 5.55, 5.36, 5.29, 5.58, 5.65, 5.57, 5.53, 5.62, 5.29, 5.44,
    5.34, 5.79, 5.10, 5.27, 5.39, 5.42, 5.47, 5.63, 5.34, 5.46, 5.30, 5.75, 5.68, 5.85]);
  const RHO_EAU = 1000;                                          // kg·m⁻³, the unit Cavendish's ratios are read in
  /* the statistics of the 29 values, in kg·m⁻³: mean, sample standard deviation s (the spread of one determination), standard
     uncertainty of the mean s/√n (independent determinations assumed), extremes, and the mean with 4,88 read as 5,88 */
  function densite1798() {
    const v = CAVENDISH_29.map(x => x * RHO_EAU), n = v.length, mean = v.reduce((a, b) => a + b, 0) / n;
    const sd = Math.sqrt(v.reduce((a, x) => a + (x - mean) * (x - mean), 0) / (n - 1)), u = sd / Math.sqrt(n);
    return { n, mean, sd, u, min: Math.min(...v), max: Math.max(...v), slip: mean + RHO_EAU / n };
  }
  /* θ = G M T² / (4π² l d²): the small mass and the wire cancel out once T is measured. Inverse: G from θ and T. */
  function gFrom(theta, T, M, l, d) {
    positive(theta, "θ"); positive(T, "T"); positive(M, "M"); positive(l, "l"); positive(d, "d");
    return 4 * Math.PI * Math.PI * l * d * d * theta / (M * T * T);
  }
  /* air speed past a sphere of diameter dm whose drag equals F (forces.js correlation, still air at sea level); bisection.
     NaN when F is only reached past the drag crisis, where the correlation stops */
  function airSpeedFor(F, dm) {
    positive(F, "F"); positive(dm, "d");
    let lo = 0, hi = 1e-3;
    for (let D = Forces.dragSphere("air", dm, hi); !(D >= F); D = Forces.dragSphere("air", dm, hi)) { if (Number.isNaN(D)) return NaN; hi *= 2; }
    for (let i = 0; i < 100; i++) { const mid = (lo + hi) / 2; if (Forces.dragSphere("air", dm, mid) < F) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }
  /* equal charges q on two spheres at distance d whose Coulomb force equals F: q = d √(4π ε0 F) (point charges, vacuum) */
  function chargeFor(F, d) { positive(F, "F"); positive(d, "d"); return d * Math.sqrt(4 * Math.PI * EPS0 * F); }
  /* « weighing the Earth »: the mass is GM_E / G, GM_E being known from orbits to 10⁻⁹; the density uses the mean radius */
  function peserTerre(g) {
    g = g == null ? G : g; positive(g, "G");
    const M = GM_E / g, V = 4 / 3 * Math.PI * R_E * R_E * R_E;
    return { M, rho: M / V };
  }
  /* G from a mean density ρ (in kg·m⁻³) of the Earth: G = 3 GM_E / (4π R³ ρ) — Cavendish's result read as G */
  function gFromDensity(rho) { positive(rho, "ρ"); return GM_E / (4 / 3 * Math.PI * R_E * R_E * R_E * rho); }
  /* swing after the large balls are moved in at t = 0, the balance starting at rest: θ(t) = θ_eq (1 \u2212 cos 2πt/T), undamped */
  function swing(theta, T, t) { finite(theta, "θ"); positive(T, "T"); finite(t, "t"); return theta * (1 - Math.cos(2 * Math.PI * t / T)); }

  /* ---------- what is gravity: equivalence, and the electric force for comparison ---------- */
  /* Eötvös parameter η = 2 (a1 − a2)/(a1 + a2), signed: positive when body 1 falls faster. Dropped together from height h in a
     uniform field, body 1 arrives η h ahead (first order in η; negative: behind); in orbit, the differential acceleration is η g.
     |η| < 1 is required: beyond, the first order means nothing. */
  function eotvos(eta, h, g) {
    finite(eta, "η"); if (!(Math.abs(eta) < 1)) err("|η| < 1"); positive(h, "h"); g = g == null ? Cst.g0 : g;
    return { gap: eta * h, da: eta * g };
  }
  /* bounds on |η| over time: year, bound, who (sources in the lesson table) */
  const EOTVOS = [
    { id: "newton", year: 1687, eta: 1e-3 }, { id: "bessel", year: 1832, eta: 2e-5 }, { id: "eotvos", year: 1909, eta: 1e-8 },
    { id: "dicke", year: 1964, eta: 3e-11 }, { id: "braginsky", year: 1972, eta: 1e-12 }, { id: "eotwash", year: 2008, eta: 1e-13 },
    { id: "microscope", year: 2022, eta: 3e-15 },
  ];
  /* electric repulsion over gravitational attraction for two identical particles of charge q and mass m: q²/(4π ε0 G m²) */
  function electricOverGravity(q, m) { positive(Math.abs(q), "q"); positive(m, "m"); return q * q / (4 * Math.PI * EPS0 * G * m * m); }

  /* ---------- gravity and relativity ---------- */
  /* light passing a mass at impact parameter b: Newton's corpuscle 2GM/(c² b), general relativity 4GM/(c² b) (weak field) */
  function deflection(GM, b) { positive(GM, "GM"); positive(b, "b"); const n = 2 * GM / (C * C * b); return { newton: n, einstein: 2 * n }; }
  /* mass of an energy E: E/c² */
  function massOf(E) { finite(E, "E"); return E / (C * C); }
  /* light (and gravity) travel time over d */
  function delay(d) { positive(d, "d"); return d / C; }

  const api = {
    YEAR, ARCSEC, M_SUN, M_E, LUNE, SIRIUS, GALAXIE, R_MIN_TESTE, CAVENDISH_1798, CAVENDISH_29, EOTVOS,
    field, period, massInside, phi, echelles, maree, tidalAt, mareeLune, mareeSoleil,
    inertia, kappaOf, cavendish, densite1798, gFrom, airSpeedFor, chargeFor, peserTerre, gFromDensity, swing,
    eotvos, electricOverGravity, deflection, massOf, delay,
  };
  if (node) module.exports = api;
  else root.Gravitation = api;
})(typeof self !== "undefined" ? self : this);

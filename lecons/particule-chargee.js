/* Charge — a charged particle in a uniform, stationary electric or magnetic field (CPGE programme, X.particule_champ.1 to 3;
   context Feynman II.29-1). Pure, no DOM, UMD (global Charge). SI throughout: q in C (signed), m in kg, E in V·m⁻¹, B in T.
   Builds on Dyna (dynamique.js: vectors, g), Integ (integration.js: step-by-step solution) and Tenseurs.vectoriel.
   Closed forms for the textbook cases; Integ for any other one, and to check the closed forms in the tests.
   Errors are thrown with a French message: they mean the call is wrong, never that the motion is unusual. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Dyna = node ? require("./dynamique.js") : root.Dyna;
  const Integ = node ? require("./integration.js") : root.Integ;
  const { vectoriel: cross } = node ? require("../tenseurs.js") : root.Tenseurs;
  const C = Cst.c, E0 = Cst.e, G = Dyna.G;

  const err = m => { throw new Error("charge: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const pos = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const v3 = (v, name) => { Dyna.vec(v, name); if (v.length !== 3) err(name + " doit avoir 3 composantes"); return v; };
  const charge = q => { finite(q, "q"); if (q === 0) err("particule neutre (q = 0) : aucune force électromagnétique"); return q; };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  /* the particles of the pages: electron and proton, CODATA 2022 masses, charge ±e exact (SI 2019) */
  const PARTICULES = { electron: { q: -E0, m: Cst.m_e }, proton: { q: E0, m: Cst.m_p } };
  const particule = nom => PARTICULES[nom] || err("particule inconnue « " + nom + " »");

  /* ---------- the force (X.particule_champ.1) ---------- */
  /* F = q (E + v ∧ B), and its parts */
  function force(q, E, B, v) {
    finite(q, "q"); v3(E, "E"); v3(B, "B"); v3(v, "v");
    const fe = E.map(x => q * x), fm = cross(v, B).map(x => q * x);
    return { electrique: fe, magnetique: fm, totale: fe.map((x, i) => x + fm[i]) };
  }
  /* power received: F·v = q E·v. The magnetic part q (v ∧ B)·v is zero for any v: it is returned too, computed, for the tests */
  function puissance(q, E, B, v) {
    const f = force(q, E, B, v);
    return { electrique: dot(f.electrique, v), magnetique: dot(f.magnetique, v), totale: dot(f.totale, v) };
  }
  /* the acceleration (q/m)(E + v ∧ B) in Integ's form a(t, x, v) */
  function acceleration(q, m, E, B) {
    finite(q, "q"); pos(m, "m"); v3(E, "E"); v3(B, "B");
    const k = q / m;
    return (t, x, v) => { const w = cross(v, B); return [k * (E[0] + w[0]), k * (E[1] + w[1]), k * (E[2] + w[2])]; };
  }
  /* any uniform E and B, step by step: leapfrog with the speed correction (the magnetic force depends on v) */
  function simule(o) {
    const q = finite(o.q, "q"), m = pos(o.m, "m"), duree = pos(o.duree, "duree"), n = o.n == null ? 2000 : o.n;
    if (!Number.isInteger(n) || n < 1) err("n, le nombre de pas, doit être un entier ≥ 1");
    const s0 = { t: 0, x: v3(o.x0 || [0, 0, 0], "x0").slice(), v: v3(o.v0, "v0").slice() };
    return Integ.run("leapfrog", acceleration(q, m, o.E || [0, 0, 0], o.B || [0, 0, 0]), s0, duree / n, n, { vdep: true, every: o.every || 1 });
  }

  /* Rotation of the transverse speed in B = B e_z: dv/dt = ω (v_y, −v_x), ω = qB/m signed (q > 0 turns clockwise seen from
     the tip of B). Starting at speed (a, b): v(t) = (a cos ωt + b sin ωt, b cos ωt − a sin ωt); integrated once for the position. */
  function tourne(w, a, b, t) {
    const c = Math.cos(w * t), s = Math.sin(w * t);
    return { v: [a * c + b * s, b * c - a * s], x: [(a * s + b * (1 - c)) / w, (b * s - a * (1 - c)) / w] };
  }

  /* crossed fields E = E e_y, B = B e_z (B ≠ 0), start at the origin at speed v0: the motion is the drift E/B along e_x plus
     the circle above, made by the remaining speed v0 − (E/B) e_x. Exact in Newton's mechanics; Wien's filter keeps v0 = E/B. */
  function croisees(q, m, E, B, v0) {
    charge(q); pos(m, "m"); finite(E, "E"); finite(B, "B"); v3(v0, "v0");
    if (B === 0) err("croisees : il faut B ≠ 0");
    const w = q * B / m, vd = E / B, a = v0[0] - vd, b = v0[1];
    return { w, vd, vitesseFiltre: vd,
      pos: t => { finite(t, "t"); const r = tourne(w, a, b, t); return [vd * t + r.x[0], r.x[1], v0[2] * t]; },
      vel: t => { finite(t, "t"); const r = tourne(w, a, b, t); return [vd + r.v[0], r.v[1], v0[2]]; } };
  }

  /* ---------- uniform electric field (X.particule_champ.2) ---------- */
  /* speed after a potential difference U, from rest: q U > 0 gives the kinetic energy q U.
     Newton: v = √(2qU/m). Relativity: γ = 1 + qU/(mc²), v = c √(1 − 1/γ²). (v/c)² is the number that says which one to use. */
  function accelere(q, m, U) {
    charge(q); pos(m, "m"); finite(U, "U");
    const ec = q * U; if (!(ec > 0)) err("q U doit être positif : la particule doit gagner de l'énergie");
    const k = ec / (m * C * C), vCl = Math.sqrt(2 * ec / m), gamma = 1 + k, beta = Math.sqrt(k * (2 + k)) / gamma, vRel = beta * C;   // β² = k(2 + k)/γ², no cancellation at low U
    return { ec, ecEV: ec / E0, vClassique: vCl, vRelativiste: vRel, gamma, rel: (vCl / C) * (vCl / C), beta2: beta * beta, ecart: vCl / vRel - 1 };
  }
  /* the electron gun, then a pair of deflecting plates: plates of length L, gap d, voltage Ud (field E = Ud/d along +y: the plate at
     −d/2 is the higher potential when Ud > 0); the particle enters on the axis at v0 along x; a screen at D past the
     plates. Inside, uniform acceleration (X.particule_champ.2): y = (qE/2mv0²) x², a parabola. Outside, a straight line. */
  function deviation(o) {
    const q = charge(o.q), m = pos(o.m, "m"), v0 = pos(o.v0, "v0"), d = pos(o.d, "d"), L = pos(o.L, "L"), D = finite(o.D == null ? 0 : o.D, "D"), Ud = finite(o.Ud, "Ud");
    if (D < 0) err("D, la distance plaques–écran, doit être positive ou nulle");
    const E = Ud / d, a = q * E / m, k = a / (2 * v0 * v0);       // y = k x²
    const yL = k * L * L, touche = Math.abs(yL) >= d / 2;
    const xImpact = touche ? Math.sqrt(d / 2 / Math.abs(k)) : null; // where it hits a plate
    const xs = touche ? xImpact : L, ys = k * xs * xs, pente = 2 * k * xs;
    return { E, a, k, tau: xs / v0, touche, xImpact, ySortie: ys, pente, angle: Math.atan(pente),
      yEcran: touche ? null : ys + D * pente,
      dEc: q * E * ys,                                             // work of qE on the way across: the kinetic energy gained
      traj: x => { finite(x, "x"); if (x < 0) return 0; if (x <= xs) return k * x * x; return touche ? NaN : ys + (x - xs) * pente; } };
  }

  /* ---------- uniform magnetic field (X.particule_champ.3) ---------- */
  /* B = B e_z, start at the origin at speed v0 (3 components). |v| is constant, so γ is too: the relativistic motion is the
     same helix with m replaced by γm; o.rel = true takes it into account. ω = qB/(γm) signed, R = γ m v⊥/(|q|B), pitch v∥ T. */
  function helice(q, m, B, v0, o) {
    charge(q); pos(m, "m"); finite(B, "B"); v3(v0, "v0");
    if (B === 0) err("helice : il faut B ≠ 0");
    const v = Math.hypot(...v0); if (o && o.rel && !(v < C)) err("la vitesse doit être inférieure à c");
    const gamma = o && o.rel ? 1 / Math.sqrt(1 - (v / C) * (v / C)) : 1, M = gamma * m;
    const w = q * B / M, vPerp = Math.hypot(v0[0], v0[1]), vPar = v0[2], T = 2 * Math.PI / Math.abs(w);
    return { w, gamma, vPerp, vPar, T, f: 1 / T, R: vPerp / Math.abs(w), pas: vPar * T,
      sens: q * B > 0 ? "horaire" : "trigonometrique",              // seen from the tip of B
      centre: [v0[1] / w, -v0[0] / w],                              // the axis of the helix, in the plane z = 0
      pos: t => { finite(t, "t"); const r = tourne(w, v0[0], v0[1], t); return [r.x[0], r.x[1], vPar * t]; },
      vel: t => { finite(t, "t"); const r = tourne(w, v0[0], v0[1], t); return [r.v[0], r.v[1], vPar]; } };
  }
  /* radius and period for a kinetic energy ec (J), the speed making the angle alpha with B. Newton or relativity. */
  function larmor(q, m, B, ec, alpha, o) {
    charge(q); pos(m, "m"); pos(Math.abs(finite(B, "B")), "|B|"); pos(ec, "ec"); finite(alpha, "alpha");
    const rel = !!(o && o.rel), k = ec / (m * C * C), gamma = rel ? 1 + k : 1;
    const v = rel ? C * Math.sqrt(k * (2 + k)) / gamma : Math.sqrt(2 * ec / m);
    const h = helice(q, m, B, [v * Math.sin(alpha), 0, v * Math.cos(alpha)], { rel });
    return Object.assign(h, { v, rel: (v / C) * (v / C) });
  }
  /* the cyclotron: two dees of radius Rmax in B, a gap crossed twice per turn under the peak voltage U.
     The frequency qB/(2πm) does not depend on the speed (Newton); the last orbit gives Ec = (qBR)²/(2m).
     Relativity: p = qBR still holds, Ec = √(p²c² + m²c⁴) − mc², and the true frequency is lower by γ: desaccord = 1 − 1/γ. */
  function cyclotron(q, m, B, Rmax, U) {
    charge(q); pos(m, "m"); pos(Math.abs(finite(B, "B")), "|B|"); pos(Rmax, "Rmax"); pos(Math.abs(finite(U, "U")), "|U|");
    const p = Math.abs(q * B) * Rmax, mc2 = m * C * C, ecCl = p * p / (2 * m);
    const ecRel = Math.sqrt(p * p * C * C + mc2 * mc2) - mc2, gamma = 1 + ecRel / mc2;
    return { f: Math.abs(q * B) / (2 * Math.PI * m), ecClassique: ecCl, ecRelativiste: ecRel, gamma, desaccord: 1 - 1 / gamma,
      rel: ecCl * 2 / mc2,                                          // (v/c)² of Newton's last orbit, mv²/(mc²) with mv² = 2Ec
      tours: ecRel / (2 * Math.abs(q * U)) };
  }
  /* the field needed to hold a particle of kinetic energy ec on a circle of radius R: B = p/(|q|R), p relativistic */
  function champPour(q, m, ec, R) {
    charge(q); pos(m, "m"); pos(ec, "ec"); pos(R, "R");
    const mc2 = m * C * C, p = Math.sqrt(ec * ec + 2 * ec * mc2) / C;
    return p / (Math.abs(q) * R);
  }

  /* ---------- describing the system: what the model neglects, as pure numbers ---------- */
  /* rel = (v/c)²: Newton against relativity. poidsE = mg/(|q|E), poidsB = mg/(|q|vB): the weight against the force studied. */
  function negligeables(o) {
    const q = charge(o.q), m = pos(o.m, "m"), v = finite(o.v, "v"), E = finite(o.E || 0, "E"), B = finite(o.B || 0, "B");
    if (v < 0) err("v doit être positive ou nulle");
    const w = m * G;
    return { rel: (v / C) * (v / C), poidsE: E ? w / Math.abs(q * E) : Infinity, poidsB: B && v ? w / Math.abs(q * v * B) : Infinity };
  }

  const api = { C, E0, G, PARTICULES, particule, force, puissance, acceleration, simule, croisees, accelere, deviation, helice, larmor, cyclotron, champPour, negligeables };
  if (node) module.exports = api;
  else root.Charge = api;
})(typeof self !== "undefined" ? self : this);

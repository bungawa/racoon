/* Mechanics for the « Lois de Newton » lessons (Feynman I.9.1 to I.9.4): momentum and a constant push, speed against
   velocity on a circular track, components on a tilted air table, two force laws (weight against altitude, spring),
   and the dimensionless numbers that say what a system description neglects.
   Pure, no DOM, UMD (global Dyna). SI throughout. Builds on Cine (cinematique.js) and Forces (forces.js, fluid drag). */
(function (root) {
  const Cine = typeof module !== "undefined" && module.exports ? require("./cinematique.js") : root.Cine;
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, GM = Cst.GM_E, RT = Cst.R_E_mean, OMEGA = Cst.Omega_E;   // OMEGA: Earth's rotation relative to the stars
  const G = Cine.G;                                    // m·s⁻², 9,81
  const Forces = typeof module !== "undefined" && module.exports ? require("./forces.js") : root.Forces;   // fluid drag
  const ETA_AIR = Forces.FLUIDS.air.eta;               // Pa·s, air at 288 K

  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) throw new Error("dyna: " + name + " doit être un nombre fini"); return v; };
  const mass = m => { finite(m, "m"); if (!(m > 0)) throw new Error("dyna: la masse m doit être strictement positive"); return m; };

  /* ---------- vectors (1 to 3 components) ---------- */
  function vec(v, name) {
    if (!Array.isArray(v) || v.length < 1 || v.length > 3) throw new Error("dyna: " + (name || "vecteur") + " de 1 à 3 composantes");
    v.forEach((x, i) => finite(x, (name || "v") + "[" + i + "]"));
    return v;
  }
  const norme = v => Math.hypot(...vec(v));
  function somme(a, b) { vec(a, "a"); vec(b, "b"); if (a.length !== b.length) throw new Error("dyna: vecteurs de dimensions différentes"); return a.map((x, i) => x + b[i]); }
  const fois = (k, v) => { finite(k, "k"); return vec(v).map(x => k * x); };
  /* direction cosines: the components of the unit vector, cos² sum to 1. A zero vector has no direction. */
  function cosDirecteurs(v) { const n = norme(v); if (!(n > 0)) throw new Error("dyna: vecteur nul, sans direction"); return v.map(x => x / n); }
  /* (9.8) F_i = F cos(angle between axis i and F). Angles that no direction can have together are refused. */
  function projette(F, angles) {
    finite(F, "F"); vec(angles, "angles");
    const c = angles.map(Math.cos), s = c.reduce((a, x) => a + x * x, 0);
    if (Math.abs(s - 1) > 1e-9) throw new Error("dyna: angles incompatibles, la somme des cos² vaut " + s);
    return c.map(x => F * x);
  }
  /* Galilean composition of velocities: speed in R = speed in R′ + speed of R′ in R (R′ in translation) */
  const galilee = (vRel, vEntr) => somme(vRel, vEntr);

  /* ---------- momentum (I.9.1) ---------- */
  const quantite = (m, v) => typeof v === "number" ? mass(m) * finite(v, "v") : fois(mass(m), v);
  /* a constant force F acts during dt on a mass m moving at v0 along one axis, then nothing:
     (9.1) integrated, Δp = F dt whatever the mass; the speed gained, Δp/m, depends on it */
  function poussee(m, v0, F, dt) {
    mass(m); finite(v0, "v0"); finite(F, "F"); finite(dt, "dt");
    if (!(dt >= 0)) throw new Error("dyna: la durée dt doit être positive ou nulle");
    const p0 = m * v0, dp = F * dt, on = t => Math.min(Math.max(finite(t, "t"), 0), dt);
    return { m, p0, dp, p1: p0 + dp, v1: (p0 + dp) / m, dv: dp / m,
      p: t => p0 + F * on(t), v: t => (p0 + F * on(t)) / m,
      x: t => { const u = on(t); return v0 * t + F * u * u / (2 * m) + F * u * (t - u) / m; } };
  }

  /* ---------- speed against velocity: a lap of a circular track (I.9.2) ---------- */
  /* after the fraction frac of a lap at constant speed v: path length s, displacement Δr (chord), the two averages.
     s/t is the speed, always v; |Δr|/t is the norm of the average velocity, 2 v sin(π frac)/(2π frac), zero after a full lap */
  function tour(R, v, frac) {
    const c = Cine.circle(R, v); finite(frac, "frac");
    if (!(v > 0)) throw new Error("dyna: il faut v > 0 pour parcourir la piste");
    if (!(frac >= 0 && frac <= 1)) throw new Error("dyna: fraction de tour entre 0 et 1");
    const t = frac * c.T, p0 = c.pos(0), p1 = c.pos(t), d = [p1[0] - p0[0], p1[1] - p0[1]], dist = Math.hypot(d[0], d[1]);
    const v0 = c.vel(0), v1 = c.vel(t);
    return { t, s: v * t, d, dist, vitesse: v, vmoy: t > 0 ? dist / t : v, v0, v1, dv: Math.hypot(v1[0] - v0[0], v1[1] - v0[1]), T: c.T };
  }

  /* ---------- components: a puck on a tilted air table (I.9.3) ---------- */
  /* axes tied to the table: x horizontal along its lower edge, y up the slope, z normal to the table.
     The weight (vertical, m g) makes the angles 90°, 90° + α and 180° − α with x, y, z: (0, −m g sin α, −m g cos α).
     The air cushion pushes along +z and cancels the normal part; nothing else acts: a = (0, −g sin α, 0).
     Launch at v0, angle phi above the x axis, from the origin. */
  const anglesPoids = alpha => [Math.PI / 2, Math.PI / 2 + alpha, Math.PI - alpha];
  function table(o) {
    const m = mass(o.m), alpha = finite(o.alpha, "alpha"), v0 = finite(o.v0, "v0"), phi = finite(o.phi, "phi"), g = o.g == null ? G : finite(o.g, "g");
    if (!(alpha >= 0 && alpha < Math.PI / 2)) throw new Error("dyna: inclinaison entre 0 et 90° exclus");
    if (!(v0 >= 0) || !(g > 0)) throw new Error("dyna: il faut v0 ≥ 0 et g > 0");
    const P = projette(m * g, anglesPoids(alpha)), N = [0, 0, m * g * Math.cos(alpha)], F = somme(P, N), a = F.map(x => x / m);
    const vx = v0 * Math.cos(phi), vy = v0 * Math.sin(phi), ay = a[1];
    return { m, alpha, P, N, F, a, v0: [vx, vy],
      pos: t => [vx * t, vy * t + ay * t * t / 2], vel: t => [vx, vy + ay * t],
      retour: vy > 0 ? (ay < 0 ? -2 * vy / ay : Infinity) : 0,         // back on the lower edge (y = 0)
      hauteur: vy > 0 ? (ay < 0 ? -vy * vy / (2 * ay) : Infinity) : 0 };
  }

  /* ---------- force laws (I.9.4) ---------- */
  /* weight per unit mass at altitude h, Earth spherical, not rotating: g(h) = GM/(RT + h)² */
  function pesanteur(h) { finite(h, "h"); if (!(h > -RT)) throw new Error("dyna: altitude sous le centre de la Terre"); return GM / ((RT + h) * (RT + h)); }
  /* relative error made by keeping g constant up to h: 1 − g(h)/g(0) ≈ 2h/RT for h ≪ RT */
  const ecartUniforme = h => 1 - pesanteur(h) / pesanteur(0);
  /* the altitude at which a uniform g is wrong by the fraction e */
  function altitudePour(e) { finite(e, "e"); if (!(e > 0 && e < 1)) throw new Error("dyna: écart entre 0 et 1 exclus"); return RT * (1 / Math.sqrt(1 - e) - 1); }
  /* (9.11) spring of stiffness k, x counted from equilibrium: the force always points back */
  function ressort(k, x) { finite(k, "k"); finite(x, "x"); if (!(k > 0)) throw new Error("dyna: raideur k strictement positive"); return -k * x || 0; }
  /* (9.10) free fall along a downward axis, uniform g: v = v0 + g t, x = x0 + v0 t + g t²/2 */
  function chute(x0, v0, g, t) {
    [x0, v0, g, t].forEach((v, i) => finite(v, ["x0", "v0", "g", "t"][i]));
    return { v: Cine.polyEval([v0, g], t), x: Cine.polyEval([x0, v0, g / 2], t) };
  }

  /* ---------- describing the system: what the model neglects, as pure numbers ---------- */
  /* v: largest speed relative to the frame; a: acceleration studied; taille: size of the object; echelle: size of the motion;
     duree: length of the experiment; lat: latitude (rad).
     rel = (v/c)²: Newton against relativity. point = taille/echelle: the point model (exact anyway for a translation).
     coriolis = 2Ωv/a: largest Coriolis acceleration against the one studied. entrainement = Ω²RT cos(lat)/g: the
     centrifugal part, already inside the local g. rotation = Ω·duree: the angle the Earth turns during the experiment. */
  function negligeables(o) {
    const v = finite(o.v, "v"), a = finite(o.a, "a"), L = finite(o.taille, "taille"), D = finite(o.echelle, "echelle"), T = finite(o.duree, "duree"), lat = o.lat == null ? 0 : finite(o.lat, "lat");
    if (!(v >= 0 && a > 0 && L >= 0 && D > 0 && T >= 0)) throw new Error("dyna: il faut v ≥ 0, a > 0, taille ≥ 0, échelle > 0, durée ≥ 0");
    return { rel: (v / C) * (v / C), point: L / D, coriolis: 2 * OMEGA * v / a, entrainement: OMEGA * OMEGA * RT * Math.cos(lat) / G, rotation: OMEGA * T };
  }
  /* friction of an air cushion: viscous shear of a film of thickness e under a sole of area S, F = η S v / e = b v.
     Valid while the film is thin and the flow laminar. Checked against a maker's glider (200 g, two soles of 4,1 × 20 cm,
     film 0,1 mm): b = 2,95 × 10⁻³ N·s·m⁻¹, the speed loses 1,48 % each second. Returns b, the rate λ = b/m, the ratio of the
     friction to the force studied, b v/(m a), and the fraction of speed lost during the run, 1 − e^(−λ T). */
  function coussin(o) {
    const m = mass(o.m), S = finite(o.S, "S"), e = finite(o.e, "e"), v = finite(o.v, "v"), a = finite(o.a, "a"), T = o.duree == null ? 0 : finite(o.duree, "duree");
    if (!(S > 0 && e > 0 && a > 0 && v >= 0 && T >= 0)) throw new Error("dyna: il faut S > 0, e > 0, a > 0, v ≥ 0, durée ≥ 0");
    const b = ETA_AIR * S / e, lambda = b / m;
    return { b, lambda, rapport: b * v / (m * a), perte: 1 - Math.exp(-lambda * T) };
  }
  /* air drag against weight for a sphere of diameter d and mass m at speed v: ρ C_x S v² / (2 m g), C_x from the
     correlation of forces.js (0,44 between Re = 10³ and 2 × 10⁵). Small: the free fall (9.10) holds; near 1: it fails. */
  function trainee(d, m, v) {
    mass(m); finite(d, "d"); finite(v, "v"); if (!(d > 0)) throw new Error("dyna: diamètre d strictement positif");
    return Forces.dragSphere("air", d, Math.abs(v)) / (m * G);
  }
  const boule = (d, rho) => ({ d, m: rho * Math.PI * d * d * d / 6 });

  /* the four systems of the lessons, described once, so the numbers on the pages and in the tests are the same */
  const SYSTEMES = {
    banc: { v: 1, a: 0.5, taille: 0.2, echelle: 2, duree: 4,             // air-track glider, 0,5 kg pushed by 0,25 N
      m: 0.5, film: { S: 2 * 0.041 * 0.20, e: 1e-4 } },                  // two soles of 4,1 × 20 cm on a 0,1 mm film
    piste: { v: 10, a: 2, taille: 2, echelle: 314, duree: 31.4 },        // a bike on a circular track, R = 50 m
    palet: { v: 1, a: 1.7, taille: 0.07, echelle: 1, duree: 2,           // puck on a table tilted by 10°
      m: 0.1, film: { S: Math.PI * 0.035 * 0.035, e: 1e-4 } },           // 7 cm sole, film assumed as thin as an air track's
    chute: { v: 20, a: G, taille: 0.07, echelle: 20, duree: 2,           // a ball dropped from 20 m
      objet: boule(0.07, 7850), contre: { d: 0.067, m: 0.0577 } },       // a 7 cm steel ball; a tennis ball would fail
  };
  /* air friction of a system that glides on a cushion, or drag of a falling one, at its largest speed */
  function frottement(nom) {
    const s = SYSTEMES[nom]; if (!s) throw new Error("dyna: système inconnu " + nom);
    if (s.film) return coussin({ m: s.m, S: s.film.S, e: s.film.e, v: s.v, a: s.a, duree: s.duree });
    if (s.objet) {
      const vf = Math.sqrt(2 * G * s.echelle);                           // speed at the end of a free fall from echelle
      return { vf, masse: s.objet.m, rapport: trainee(s.objet.d, s.objet.m, vf), contre: trainee(s.contre.d, s.contre.m, vf) };
    }
    return null;
  }

  /* the same numbers, formatted for a page's « Système » box with a Fmt instance: one way to show them on all four pages */
  function chiffres(nom, F) {
    const s = SYSTEMES[nom]; if (!s) throw new Error("dyna: système inconnu " + nom);
    const n = negligeables(s), f = frottement(nom);
    const extra = !f ? {} : s.film ? { frot: F.num(f.rapport * 100, 2), perte: F.num(f.perte * 100, 2), force: F.sci(f.b * s.v, 1) }
      : { masse: F.num(f.masse, 2), vf: F.num(f.vf, 3), trainee: F.num(f.rapport, 1), tennis: F.num(f.contre, 1), mtennis: F.num(s.contre.m * 1000, 2) };
    return { ...extra, rel: F.sci(n.rel, 1), point: F.num(n.point, 2), cor: F.sci(n.coriolis, 1), ent: F.num(n.entrainement * 100, 2), rot: F.sci(n.rotation, 1),
      v: F.num(s.v, 2), a: F.num(s.a, 2), taille: F.num(s.taille, 2), echelle: F.num(s.echelle, 3), duree: F.num(s.duree, 3) };
  }

  const api = { chiffres, C, GM, RT, OMEGA, G, ETA_AIR, coussin, trainee, frottement, vec, norme, somme, fois, cosDirecteurs, projette, galilee, quantite, poussee, tour, anglesPoids, table,
    pesanteur, ecartUniforme, altitudePour, ressort, chute, negligeables, SYSTEMES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Dyna = api;
})(typeof self !== "undefined" ? self : this);

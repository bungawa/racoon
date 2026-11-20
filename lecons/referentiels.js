/* Referentiel — changing frames: a frame R′ turning at ω about a fixed axis of a galilean frame R, inertial forces, and the
   Earth as such a frame (CPGE 2e année, « référentiels non galiléens » : leçons changer-de-referentiel, entrainement-et-coriolis,
   dynamique-terrestre). Pure, no DOM, UMD (global Referentiel). SI throughout.
   Builds on AlgVec.vectoriel, Integ.run, Dyna.vec: not copied here.

   Composition (3 components, ω along a fixed axis through the origin O′ of R′, uniform rotation)
     composition(w, r, vr, aO)  M at r (from O′), speed vr relative to R′, ω = w, O′ accelerating at aO (default 0):
                                { ve: ω × r, va: vr + ve, ae: aO + ω × (ω × r), ac: 2 ω × vr }. Exact in Newtonian mechanics.
     inertie(m, w, r, vr, aO)   { fie: −m ae, fic: −m ac }: the two inertial forces, in N.
   The merry-go-round (2 components, ω along +z, frames coinciding at t = 0)
     versTournant(p, w, t)      components in R′ of a point fixed at p in R: rotation by −ωt.
     versSol(p, w, t)           the inverse.
     lancer(o)                  a free puck: o = { omega, r0, v0, relative (v0 given in R′, default false), duree, n (points, default 400) }.
                                Seen from R it goes straight at constant velocity; returns { t, sol, tournant } (arrays of [x, y]).
     tournant(o)                the same motion computed in R′ step by step, with the inertial forces one chooses:
                                o = { omega, r0, v0 (in R′), duree, h, entrainement (default true), coriolis (default true) }.
                                ẍ′ = ω² r′ − 2 ω ez × v′ (each term optional). Returns { t, x: [[x, y]], v: [[vx, vy]] }.
     rapport(w, r, v)           Coriolis over entrainement, 2 v/(ω r): the speed decides which one matters.
     surfaceLibre(w, r, g)      height of a liquid turning with its bucket: ω² r²/(2 g), above the centre.
   The Earth (local frame: x east, y north, z up; Ω relative to the stars)
     OMEGA                      Cst.Omega_E, 7,292 115 × 10⁻⁵ rad·s⁻¹.
     omegaLocal(lat)            Ω in the local frame: Ω (0, cos λ, sin λ).
     pesanteurSphere(lat)       spherical, homogeneous Earth of mean radius: attraction GM/R², plus the entrainement Ω² R cos λ.
                                { attraction, centrifuge, g, angle }: g the norm of the apparent weight per unit mass, angle the
                                plumb line's tilt from the radius, towards the equator (rad).
     pesanteurNormale(lat)      normal gravity on the reference ellipsoid (Geodetic Reference System 1980, Somigliana's closed form):
                                γe (1 + k sin² λ)/√(1 − e² sin² λ), sea level. The measured g within about 10⁻⁴ (local anomalies).
     GRS80                      { ge, gp, k, e2 } of that formula (Moritz, Geodetic Reference System 1980, Bulletin géodésique 1988 corrected).
     deviationEst(h, lat, g)    first-order eastward drift of a body dropped from rest from h: (2√2/3) Ω cos λ √(h³/g).
     chute(o)                   the same fall integrated in the local frame, with the full Coriolis term and, optionally, a quadratic
                                drag: o = { h, lat, g, k (drag per unit mass, s·m⁻¹·… : a = −k |v| v, default 0), dt }.
                                Returns { t (fall time), est, sud, vmax }: est > 0 eastward, sud > 0 southward (northern hemisphere).
     foucault(o)                small swings of a pendulum in the local frame: ẍ = −ω₀² x + 2 Ωz ẏ, ÿ = −ω₀² y − 2 Ωz ẋ, Ωz = Ω sin λ
                                (the horizontal part of Ω is negligible here). o = { l, lat, g, x0, duree, h, acceleration (factor on Ω,
                                default 1, to see the turn in a few swings) }. Returns { t, x: [[x, y]], omegaz }.
     angleFoucault(run)         the direction of the swing plane at its last turning point (largest elongation within the last
                                half-period): { angle in (−π/2, π/2], from x towards y; t, the time of that turning point }.
     coriolisCompte(o)          { v, a (the acceleration the motion is about), duree, lat }: { rapport: 2 Ω v/a, derive: Ω sin λ v duree²
                                (the sideways drift of a horizontal motion, first order), rossby: v/(2 Ω |sin λ| L) with L = v·duree }.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const AlgVec = node ? require("./algebre-vectorielle.js") : root.AlgVec;
  const Integ = node ? require("./integration.js") : root.Integ;
  const OMEGA = Cst.Omega_E, G = Cst.g_CPGE, GM = Cst.GM_E, RT = Cst.R_E_mean;
  const GRS80 = Object.freeze({ ge: 9.7803267715, gp: 9.8321863685, k: 0.001931851353, e2: 0.00669438002290 });

  const err = m => { throw new Error("referentiel: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const vecN = (v, n, name) => { if (!Array.isArray(v) || v.length !== n) err(name + " : " + n + " composantes"); v.forEach((q, i) => finite(q, name + "[" + i + "]")); return v; };
  const latitude = lat => { finite(lat, "λ"); if (Math.abs(lat) > Math.PI / 2 + 1e-12) err("latitude entre −π/2 et π/2"); return lat; };
  const gOf = g => g == null ? G : positive(g, "g");
  const add = (a, b) => a.map((q, i) => q + b[i]), scale = (k, a) => a.map(q => k * q);
  const X = AlgVec.vectoriel;

  /* ---------- composition ---------- */
  function composition(w, r, vr, aO) {
    vecN(w, 3, "ω"); vecN(r, 3, "r"); vecN(vr, 3, "vr"); aO = aO == null ? [0, 0, 0] : vecN(aO, 3, "aO");
    const ve = X(w, r);
    return { ve, va: add(vr, ve), ae: add(aO, X(w, ve)), ac: scale(2, X(w, vr)) };
  }
  function inertie(m, w, r, vr, aO) { positive(m, "m"); const c = composition(w, r, vr, aO); return { fie: scale(-m, c.ae), fic: scale(-m, c.ac) }; }

  /* ---------- the merry-go-round ---------- */
  const rot = (p, a) => { const c = Math.cos(a), s = Math.sin(a); return [c * p[0] - s * p[1], s * p[0] + c * p[1]]; };
  const versTournant = (p, w, t) => { vecN(p, 2, "p"); return rot(p, -finite(w, "ω") * finite(t, "t")); };
  const versSol = (p, w, t) => { vecN(p, 2, "p"); return rot(p, finite(w, "ω") * finite(t, "t")); };

  function lancer(o) {
    o = o || {};
    const w = finite(o.omega, "ω"), r0 = vecN(o.r0, 2, "r0"), v = vecN(o.v0, 2, "v0"), D = positive(o.duree, "durée"), n = o.n == null ? 400 : Math.round(positive(o.n, "n"));
    const v0 = o.relative ? [v[0] - w * r0[1], v[1] + w * r0[0]] : v;          // va = vr + ω ez × r
    const t = [], sol = [], tournant = [];
    for (let i = 0; i <= n; i++) {
      const ti = D * i / n, p = [r0[0] + v0[0] * ti, r0[1] + v0[1] * ti];
      t.push(ti); sol.push(p); tournant.push(rot(p, -w * ti));
    }
    return { t, sol, tournant, v0 };
  }
  function tournant(o) {
    o = o || {};
    const w = finite(o.omega, "ω"), r0 = vecN(o.r0, 2, "r0"), v0 = vecN(o.v0, 2, "v0"), D = positive(o.duree, "durée");
    const h = o.h == null ? D / 2000 : positive(o.h, "h"), ent = o.entrainement !== false, cor = o.coriolis !== false;
    const a = (t, x, v) => [(ent ? w * w * x[0] : 0) + (cor ? 2 * w * v[1] : 0), (ent ? w * w * x[1] : 0) - (cor ? 2 * w * v[0] : 0)];
    const n = Math.ceil(D / h), run = Integ.run("leapfrog", a, { t: 0, x: r0.slice(), v: v0.slice() }, D / n, n, { vdep: true });
    return { t: run.t, x: run.x, v: run.v };
  }
  function rapport(w, r, v) { positive(Math.abs(finite(w, "ω")), "|ω|"); positive(r, "r"); finite(v, "v"); return 2 * Math.abs(v) / (Math.abs(w) * r); }
  function surfaceLibre(w, r, g) { finite(w, "ω"); finite(r, "r"); return w * w * r * r / (2 * gOf(g)); }

  /* ---------- the Earth ---------- */
  const omegaLocal = lat => { latitude(lat); return [0, OMEGA * Math.cos(lat), OMEGA * Math.sin(lat)]; };
  function pesanteurSphere(lat) {
    latitude(lat);
    const attraction = GM / (RT * RT), centrifuge = OMEGA * OMEGA * RT * Math.cos(lat);
    const nord = -centrifuge * Math.sin(lat), haut = -attraction + centrifuge * Math.cos(lat);   // away from the axis: (−sin λ, cos λ)
    return { attraction, centrifuge, g: Math.hypot(nord, haut), angle: Math.atan2(Math.abs(nord), -haut) };
  }
  function pesanteurNormale(lat) {
    const s2 = Math.sin(latitude(lat)) ** 2;
    return GRS80.ge * (1 + GRS80.k * s2) / Math.sqrt(1 - GRS80.e2 * s2);
  }
  function deviationEst(h, lat, g) { positive(h, "h"); latitude(lat); return 2 * Math.SQRT2 / 3 * OMEGA * Math.cos(lat) * Math.sqrt(h * h * h / gOf(g)); }
  function chute(o) {
    o = o || {};
    const H = positive(o.h, "h"), W = omegaLocal(o.lat), g = gOf(o.g), k = o.k == null ? 0 : finite(o.k, "k"), dt = o.dt == null ? 1e-3 : positive(o.dt, "dt");
    if (k < 0) err("k ≥ 0");
    const a = (t, x, v) => { const c = X(W, v), s = Math.hypot(v[0], v[1], v[2]);
      return [-2 * c[0] - k * s * v[0], -2 * c[1] - k * s * v[1], -g - 2 * c[2] - k * s * v[2]]; };
    let s = { t: 0, x: [0, 0, H], v: [0, 0, 0] }, prev = s, vmax = 0;
    for (let i = 0; s.x[2] > 0; i++) {
      if (i > 1e7) err("chute trop longue : pas dt trop petit");
      prev = s; s = Integ.step("leapfrog", a, s, dt, { vdep: true }); vmax = Math.max(vmax, Math.hypot(s.v[0], s.v[1], s.v[2]));
    }
    const f = prev.x[2] / (prev.x[2] - s.x[2]), at = i => prev.x[i] + f * (s.x[i] - prev.x[i]);   // linear interpolation to z = 0
    return { t: prev.t + f * dt, est: at(0), sud: -at(1), vmax };
  }
  function foucault(o) {
    o = o || {};
    const l = positive(o.l, "ℓ"), g = gOf(o.g), w0 = Math.sqrt(g / l), lat = latitude(o.lat), D = positive(o.duree, "durée");
    const acc = o.acceleration == null ? 1 : positive(o.acceleration, "accélération"), Wz = acc * OMEGA * Math.sin(lat);
    const x0 = o.x0 == null ? 0.05 * l : positive(o.x0, "x0"), h = o.h == null ? 2 * Math.PI / w0 / 200 : positive(o.h, "h");
    const a = (t, x, v) => [-w0 * w0 * x[0] + 2 * Wz * v[1], -w0 * w0 * x[1] - 2 * Wz * v[0]];
    const n = Math.ceil(D / h), run = Integ.run("leapfrog", a, { t: 0, x: [x0, 0], v: [0, 0] }, D / n, n, { vdep: true, every: o.every || 1 });
    return { t: run.t, x: run.x, omegaz: Wz, w0 };
  }
  function angleFoucault(run) {
    if (!run || !Array.isArray(run.x) || run.x.length < 3) err("angleFoucault : une trajectoire de foucault()");
    const T = Math.PI / run.w0, tEnd = run.t[run.t.length - 1];
    let best = null, tb = 0, r2 = -1;
    for (let i = run.t.length - 1; i >= 0 && run.t[i] >= tEnd - T; i--) { const p = run.x[i], q = p[0] * p[0] + p[1] * p[1]; if (q > r2) { r2 = q; best = p; tb = run.t[i]; } }
    let a = Math.atan2(best[1], best[0]);
    while (a > Math.PI / 2) a -= Math.PI; while (a <= -Math.PI / 2) a += Math.PI;
    return { angle: a, t: tb };
  }
  function coriolisCompte(o) {
    o = o || {};
    const v = finite(o.v, "v"), a = positive(o.a, "a"), D = finite(o.duree, "durée"), lat = latitude(o.lat);
    if (v < 0 || D < 0) err("v ≥ 0 et durée ≥ 0");
    const f = 2 * OMEGA * Math.abs(Math.sin(lat)), L = v * D;
    return { rapport: 2 * OMEGA * v / a, derive: OMEGA * Math.abs(Math.sin(lat)) * v * D * D, rossby: f > 0 && L > 0 ? v / (f * L) : Infinity };
  }

  const api = { OMEGA, G, GRS80, composition, inertie, versTournant, versSol, lancer, tournant, rapport, surfaceLibre,
    omegaLocal, pesanteurSphere, pesanteurNormale, deviationEst, chute, foucault, angleFoucault, coriolisCompte };
  if (node) module.exports = api;
  else root.Referentiel = api;
})(typeof self !== "undefined" ? self : this);

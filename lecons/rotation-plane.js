/* Rotation plane — calculs de l'étape « Centre de masse et rotation plane » (Feynman I.18.1 à 18.4) : centre de masse
   d'un projectile qui éclate, moment d'une force et travail d'une rotation, moment cinétique de deux corps liés,
   patineuse qui ramène les bras. Pur, sans DOM, UMD (global RotPlane). SI partout.
   Rien n'est recopié : masse, centre de masse et moment cinétique viennent de Solide (/solide.js), l'intégrateur d'Integ
   (/lecons/integration.js).

   Centre de masse (I.18.1)
     explosion(o)                 obus tiré de l'origine (o.v0, o.angle en rad, o.g), qui éclate à o.te en n = o.masses.length
                                  fragments. Chaque fragment reçoit une impulsion o.J (N·s) dans la direction o.phi + 2πi/n :
                                  impulsions intérieures de somme nulle. Un fragment qui touche le sol (y = 0) s'y arrête.
                                  → { etat(t) → { fragments, centre, parabole }, atterrissages (triés), tSol (obus intact),
                                  tFin (dernier atterrissage) }. La parabole est celle de l'obus qui n'aurait pas éclaté.
   Rotation (I.18.2)
     couple(r, F)                 τ = x F_y − y F_x, axe Oz.
     travailRotation(r, F, dθ)    travail de la force constante F quand son point d'application tourne de dθ autour de O
                                  (corde exacte) : F · (R(dθ) r − r). Tend vers τ dθ quand dθ → 0.
   Moment cinétique de deux corps (I.18.3)
     FORCES                       "ressort" : ressort entre les corps, forces opposées et portées par la droite qui les joint ;
                                  "decalee" : les mêmes forces opposées, tournées de o.beta hors de cette droite ;
                                  "externe" : le ressort, plus une force constante o.Fext sur le corps 1 seul.
     deuxCorps(id, o, h, n)       o = { m1, m2, k, l0, beta, Fext, r1, r2, v1, v2 } ; saute-mouton, n pas de h.
                                  → { t, x1, x2, L1, L2, L (L_z en O), P (composantes de la quantité de mouvement totale),
                                  ecartL (max |L − L(0)| rapporté à max(|L1|, |L2|)), ecartP (idem pour P, rapporté à max m|v|) }.
   Conservation (I.18.4)
     patineuse(o)                 { I0 (corps), m (masse dans chaque bras), r (rayon des deux masses) } → I = I0 + 2 m r².
     tirerBras(o, n)              o = { I0, m, r0, r1, w0, duree } : les masses passent de r0 à r1 par r(t) = r0 + (r1 − r0)
                                  (1 − cos πt/T)/2, sans couple extérieur. Le corps et les bras sont liés en rotation ; ω suit
                                  de la loi de Newton pour les masses et du théorème du moment pour le corps (Integ.rk4, n pas).
                                  → { t, r, w, L, ecartL, travail (des bras, ∫ 2 T (−ṙ) dt), ec0, ec1 }.
   Les erreurs lèvent un message en français : elles signalent un appel faux. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const S = node ? require("../solide.js") : root.Solide;
  const Integ = node ? require("./integration.js") : root.Integ;
  const err = m => { throw new Error("rotation-plane: " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); };
  const pos = (x, nom) => { fini(x, nom); if (x <= 0) err(nom + " doit être positif"); };

  /* ---------- I.18.1 ---------- */
  function explosion(o) {
    const { v0, angle, g, te, masses, J, phi } = o;
    pos(v0, "v0"); fini(angle, "l'angle"); pos(g, "g"); fini(J, "J"); fini(phi || 0, "phi");
    if (!(angle > 0 && angle < Math.PI)) err("l'angle de tir doit être entre 0 et π");
    if (!Array.isArray(masses) || masses.length < 2) err("au moins deux fragments");
    masses.forEach((m, i) => pos(m, "la masse " + i));
    const vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle), tSol = 2 * vy / g;
    fini(te, "te"); if (!(te > 0 && te < tSol)) err("l'éclatement doit avoir lieu en vol, entre 0 et " + tSol.toFixed(3) + " s");
    const obus = t => [vx * t, vy * t - g * t * t / 2];
    const p0 = obus(te), n = masses.length;
    const frag = masses.map((m, i) => {
      const a = (phi || 0) + 2 * Math.PI * i / n, u = [vx + J * Math.cos(a) / m, vy - g * te + J * Math.sin(a) / m];
      /* landing: y0 + u_y τ − g τ²/2 = 0, the positive root */
      const tau = (u[1] + Math.sqrt(u[1] * u[1] + 2 * g * p0[1])) / g;
      return { m, u, tSol: te + tau };
    });
    function etat(t) {
      fini(t, "t");
      const fragments = frag.map(f => {
        if (t <= te) return obus(Math.max(t, 0));
        if (t >= f.tSol) { const s = f.tSol - te; return [p0[0] + f.u[0] * s, 0]; }
        const s = t - te;
        return [p0[0] + f.u[0] * s, Math.max(0, p0[1] + f.u[1] * s - g * s * s / 2)];
      });
      const centre = S.centreDeMasse(frag.map((f, i) => ({ m: f.m, r: fragments[i] }))).slice(0, 2);
      return { fragments, centre, parabole: obus(t) };
    }
    const atterrissages = frag.map(f => f.tSol).sort((a, b) => a - b);
    return { etat, atterrissages, tSol, tFin: atterrissages[n - 1] };
  }

  /* ---------- I.18.2 ---------- */
  const vec2 = (a, nom) => { if (!Array.isArray(a) || a.length !== 2) err(nom + " : vecteur à 2 composantes"); a.forEach(q => fini(q, nom)); return a; };
  function couple(r, F) { vec2(r, "r"); vec2(F, "F"); return r[0] * F[1] - r[1] * F[0]; }
  function travailRotation(r, F, dth) {
    vec2(r, "r"); vec2(F, "F"); fini(dth, "dθ");
    const c = Math.cos(dth), s = Math.sin(dth), d = [c * r[0] - s * r[1] - r[0], s * r[0] + c * r[1] - r[1]];
    return F[0] * d[0] + F[1] * d[1];
  }

  /* ---------- I.18.3 ---------- */
  const FORCES = ["ressort", "decalee", "externe"];
  function deuxCorps(id, o, h, n) {
    if (!FORCES.includes(id)) err("force inconnue « " + id + " » (" + FORCES.join(", ") + ")");
    const { m1, m2, k, l0 } = o, beta = o.beta || 0, Fext = o.Fext || [0, 0];
    pos(m1, "m1"); pos(m2, "m2"); pos(k, "k"); fini(l0, "l0"); fini(beta, "beta"); vec2(Fext, "Fext");
    ["r1", "r2", "v1", "v2"].forEach(q => vec2(o[q], q));
    const cb = Math.cos(id === "decalee" ? beta : 0), sb = Math.sin(id === "decalee" ? beta : 0);
    const a = (t, x) => {
      const dx = x[0] - x[2], dy = x[1] - x[3], d = Math.hypot(dx, dy);
      if (d === 0) err("les deux corps se touchent : la force du ressort n'a plus de direction");
      const f = -k * (d - l0) / d, fx0 = f * dx, fy0 = f * dy;          // force on body 1, along the line
      const fx = cb * fx0 - sb * fy0, fy = sb * fx0 + cb * fy0;       // turned by beta (decalee only)
      const ex = id === "externe" ? Fext : [0, 0];
      return [(fx + ex[0]) / m1, (fy + ex[1]) / m1, -fx / m2, -fy / m2];
    };
    const r = Integ.run("leapfrog", a, { t: 0, x: o.r1.concat(o.r2), v: o.v1.concat(o.v2) }, h, n);
    const out = { t: r.t, x1: [], x2: [], L1: [], L2: [], L: [], P: [] };
    r.x.forEach((x, i) => {
      const v = r.v[i], b1 = [{ m: m1, r: [x[0], x[1]], v: [v[0], v[1]] }], b2 = [{ m: m2, r: [x[2], x[3]], v: [v[2], v[3]] }];
      const l1 = S.momentCinetique(b1)[2], l2 = S.momentCinetique(b2)[2];
      out.x1.push([x[0], x[1]]); out.x2.push([x[2], x[3]]);
      out.L1.push(l1); out.L2.push(l2); out.L.push(l1 + l2);
      out.P.push([m1 * v[0] + m2 * v[2], m1 * v[1] + m2 * v[3]]);
    });
    const ech = Math.max(...out.L1.map(Math.abs), ...out.L2.map(Math.abs), 1e-300);
    const echP = Math.max(...r.v.map(v => Math.max(m1 * Math.hypot(v[0], v[1]), m2 * Math.hypot(v[2], v[3]))), 1e-300);
    out.ecartL = Math.max(...out.L.map(l => Math.abs(l - out.L[0]))) / ech;
    out.ecartP = Math.max(...out.P.map(p => Math.hypot(p[0] - out.P[0][0], p[1] - out.P[0][1]))) / echP;
    return out;
  }

  /* ---------- I.18.4 ---------- */
  function patineuse(o) {
    pos(o.I0, "I0"); fini(o.m, "m"); if (o.m < 0) err("m ne peut pas être négative"); fini(o.r, "r");
    return o.I0 + 2 * o.m * o.r * o.r;
  }
  function tirerBras(o, n) {
    const { I0, m, r0, r1, w0, duree: T } = o;
    pos(I0, "I0"); pos(m, "m"); pos(r0, "r0"); pos(r1, "r1"); fini(w0, "ω0"); pos(T, "la durée");
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
    const R = t => r0 + (r1 - r0) * (1 - Math.cos(Math.PI * t / T)) / 2;
    const Rp = t => (r1 - r0) * Math.PI / (2 * T) * Math.sin(Math.PI * t / T);
    const Rpp = t => (r1 - r0) * (Math.PI / T) ** 2 / 2 * Math.cos(Math.PI * t / T);
    /* body: I0 ω̇ = −2 N r ; each mass, tangential Newton: m (r ω̇ + 2 ṙ ω) = N. Two equations, unknowns ω̇ and N. */
    const wdot = (t, w) => { const r = R(t), rp = Rp(t); return -4 * m * r * rp * w / (I0 + 2 * m * r * r); };
    /* power of the arms on the two masses: radial pull T = m (r ω² − r̈) towards the axis, mass moving at ṙ */
    const puissance = (t, w) => 2 * m * (R(t) * w * w - Rpp(t)) * (-Rp(t));
    const h = T / n, out = { t: [0], r: [r0], w: [w0], L: [(I0 + 2 * m * r0 * r0) * w0] };
    const f = (t, y) => [wdot(t, y[0]), puissance(t, y[0])];        // y = [ω, work of the arms so far]
    let y = [w0, 0], w = w0;
    for (let i = 0; i < n; i++) {
      const t = i * h;
      y = Integ.rk4(f, t, y, h); w = y[0];
      const r = R(t + h);
      out.t.push(t + h); out.r.push(r); out.w.push(w); out.L.push((I0 + 2 * m * r * r) * w);
    }
    out.ecartL = Math.max(...out.L.map(l => Math.abs(l - out.L[0]))) / Math.abs(out.L[0] || 1);
    out.travail = y[1];
    out.ec0 = 0.5 * (I0 + 2 * m * r0 * r0) * w0 * w0;
    out.ec1 = 0.5 * (I0 + 2 * m * r1 * r1) * w * w;
    return out;
  }

  const api = Object.freeze({ explosion, couple, travailRotation, FORCES, deuxCorps, patineuse, tirerBras });
  if (node) module.exports = api; else root.RotPlane = api;
})(typeof self !== "undefined" ? self : this);

/* Rotation dans l'espace — moments in three dimensions, the rotation equations with the vector product, the gyroscope,
   the angular momentum of a rigid body (Feynman I.20.1–20.4). Pure, no DOM, UMD (global RotEsp). SI throughout.
   Builds on AlgVec (vectoriel, appliquer), Dyna (vec, norme, somme, fois), Solide (momentCinetique, energieCinetique of a
   body of points with velocities) and Tenseurs (rotation, produit, transposee, inertiePoints, propres): those are not copied here.

   Moments in three dimensions (I.20.1)
     momentsPlans(r, F)             { yz, zx, xy }: the moment in each coordinate plane, xy = x F_y − y F_x and so on.
     enVecteur(m)                   [yz, zx, xy]: the three planar moments read as the components (x, y, z) of one vector.
     axesTournes(theta)             3 × 3 matrix whose rows are the axes x′, y′, z′ of an observer whose axes are turned by
                                    theta about z: applied to components, it gives the components on the new axes.
     tournerPlans(m, theta)         the planar moments seen on the turned axes, by the transformation rule written for the
                                    planes: xy′ = xy, yz′ = yz cos θ + zx sin θ, zx′ = zx cos θ − yz sin θ.
     ecartTransformation(r, F, M)   largest gap between the planar moments computed from r and F turned by the axes
                                    matrix M, and the vector [yz, zx, xy] turned by M: zero (to rounding) for any rotation.
     ecartParite(r, F)              |moment of (−r, −F) − moment of (r, F)|: zero, the moment does not change sign in a
                                    mirror through the origin, unlike r and F (an axial vector).
     plans(n)                       n(n − 1)/2, the number of coordinate planes in n dimensions: equal to n only for n = 3.
   The rotation equations (I.20.2)
     vitesse(omega, r)              ω ∧ r, the velocity of the point r of a solid turning at ω about an axis through O.
     distanceAxe(omega, r)          distance from r to the axis of ω.
     angleRotation(A, B)            angle of the rotation A Bᵀ, the one that takes B to A: 0 when A = B.
     ordreRotations(a, b, alpha)    rotations of angle alpha about the unit axes a and b: { ordre: angle between « a then b »
                                    and « b then a », somme: angle between « a then b » and one rotation of angle
                                    alpha |a + b| about a + b }. Both vanish as alpha²: finite rotations are not vectors,
                                    infinitesimal ones are.
     puissance(M, omega)            M · ω, the power of a moment on a turning solid.
   The gyroscope (I.20.3). Symmetric top, fixed pivot O, centre of mass at distance d on its axis, z up.
     precession(p, omega)           Ω = M g d / (I₃ ω): the precession rate of a fast top, p = { M, g, d, I1, I3 }.
     parametre(p, omega)            ε = I₁ M g d / (I₃ ω)²: what the fast-top formula neglects (≈ I₁Ω / I₃ω).
     stationnaire(p, theta, omega3) the slow steady precession, exact root of M g d = Ω (I₃ ω₃ − I₁ Ω cos θ), theta measured
                                    from the upward vertical; null when no steady precession exists (top too slow).
     lancer(p, theta0, omega)       initial state of a top released with its axis at theta0, spinning at ω, axis at rest:
                                    { L: I₃ ω e, e }.
     pas(p, s, h)                   one Runge–Kutta 4 step (Integ.rk4) of dL/dt = M g d (ẑ ∧ e), de/dt = ω ∧ e, ω = L/I₁ + (1/I₃ − 1/I₁)(L·e)e.
     toupie(p, s0, h, n)            n steps: { t, e, L, theta, phi (unwrapped), E, Lz, L3 } with E, Lz, L3 = L·e conserved.
     mesure(res, tmin)              from a run: { Omega: slope of phi(t) after tmin (least squares), amplitude: max − min
                                    of theta after tmin, nutations: number of theta maxima }.
     nutationRapide(p, theta0, omega) the fast-top predictions for a release at rest: { Omega, amplitude: 2 ε sin θ₀,
                                    frequence: I₃ ω / I₁ (angular frequency of nutation) }.
   The angular momentum of a solid (I.20.4). A solid = a list of point masses { m, r }.
     inertie(points)                3 × 3 inertia matrix about O: Σ m (r² 1 − r rᵀ) (Tenseurs.inertiePoints).
     enRotation(points, omega)      the same points, each with the velocity v = ω ∧ r of the rigid rotation (a Solide body).
     momentCinetique(points, omega) Σ m r ∧ (ω ∧ r): Solide.momentCinetique of enRotation(points, omega).
     energie(points, omega)         Σ ½ m |ω ∧ r|²: Solide.energieCinetique of enRotation(points, omega).
     axesPrincipaux(I)              { moments: [A ≥ B ≥ C], axes: [unit vectors] } by Jacobi rotations (Tenseurs.propres).
     tourner(points, M)             the points moved by the rotation matrix M.
     solide(nom, alpha)             the solids of the page, square on their shaft (axis z) at alpha = 0, tilted by alpha about x:
                                    haltere, roue, pave.
     palier(points, omega)          ω ∧ L: the moment the bearings must give for the solid to keep turning at constant ω.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const AlgVec = node ? require("./algebre-vectorielle.js") : root.AlgVec;
  const Dyna = node ? require("./dynamique.js") : root.Dyna;
  const Solide = node ? require("../solide.js") : root.Solide;
  const Tens = node ? require("../tenseurs.js") : root.Tenseurs;
  const Integ = node ? require("./integration.js") : root.Integ;
  const { vec, norme, somme, fois } = Dyna, { vectoriel, appliquer } = AlgVec, { rotation, produit: mul, transposee: T } = Tens;
  const dot = (a, b) => a.reduce((s, q, i) => s + q * b[i], 0);

  const err = m => { throw new Error("rotesp: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const v3 = (v, name) => { vec(v, name); if (v.length !== 3) err(name + " : 3 composantes"); return v; };

  /* ---------- moments in three dimensions (I.20.1) ---------- */
  function momentsPlans(r, F) {
    const [x, y, z] = v3(r, "r"), [Fx, Fy, Fz] = v3(F, "F");
    return { yz: y * Fz - z * Fy, zx: z * Fx - x * Fz, xy: x * Fy - y * Fx };
  }
  const enVecteur = m => [m.yz, m.zx, m.xy];
  function axesTournes(theta) {
    finite(theta, "theta"); const c = Math.cos(theta), s = Math.sin(theta);
    return [[c, s, 0], [-s, c, 0], [0, 0, 1]];
  }
  function tournerPlans(m, theta) {
    finite(theta, "theta"); const c = Math.cos(theta), s = Math.sin(theta);
    return { yz: m.yz * c + m.zx * s, zx: m.zx * c - m.yz * s, xy: m.xy };
  }
  function ecartTransformation(r, F, M) {
    const seen = enVecteur(momentsPlans(appliquer(M, r), appliquer(M, F))), turned = appliquer(M, enVecteur(momentsPlans(r, F)));
    return Math.max(...seen.map((q, i) => Math.abs(q - turned[i])));
  }
  const ecartParite = (r, F) => norme(somme(enVecteur(momentsPlans(fois(-1, r), fois(-1, F))), fois(-1, enVecteur(momentsPlans(r, F)))));
  function plans(n) { if (!Number.isInteger(n) || n < 1) err("dimension entière ≥ 1"); return n * (n - 1) / 2; }

  /* ---------- the rotation equations (I.20.2) ---------- */
  const vitesse = (omega, r) => vectoriel(v3(omega, "omega"), v3(r, "r"));
  function distanceAxe(omega, r) { const w = norme(v3(omega, "omega")); if (!(w > 0)) err("ω nul : pas d'axe"); return norme(vectoriel(omega, v3(r, "r"))) / w; }
  function angleRotation(A, B) {
    const P = mul(A, T(B)), tr = P[0][0] + P[1][1] + P[2][2];
    /* acos is ill-conditioned near 0: use the antisymmetric part too */
    const s = Math.hypot(P[2][1] - P[1][2], P[0][2] - P[2][0], P[1][0] - P[0][1]) / 2;
    return Math.atan2(s, (tr - 1) / 2);
  }
  function ordreRotations(a, b, alpha) {
    finite(alpha, "alpha");
    const na = norme(v3(a, "a")), nb = norme(v3(b, "b"));
    if (Math.abs(na - 1) > 1e-9 || Math.abs(nb - 1) > 1e-9) err("axes a et b unitaires");
    const Ra = rotation(a, alpha), Rb = rotation(b, alpha), ab = mul(Rb, Ra), ba = mul(Ra, Rb);     // « a then b » = Rb Ra
    const s = somme(a, b), ns = norme(s);
    const Rs = ns > 0 ? rotation(s, alpha * ns) : Tens.identite();
    return { ordre: angleRotation(ab, ba), somme: angleRotation(ab, Rs) };
  }
  const puissance = (M, omega) => dot(v3(M, "M"), v3(omega, "omega"));

  /* ---------- the gyroscope (I.20.3) ---------- */
  function check(p) {
    ["M", "g", "d", "I1", "I3"].forEach(k => { if (!(finite(p[k], k) > 0)) err(k + " strictement positif"); });
    return p;
  }
  const precession = (p, omega) => { check(p); if (!(finite(omega, "omega") > 0)) err("ω strictement positif"); return p.M * p.g * p.d / (p.I3 * omega); };
  const parametre = (p, omega) => p.I1 * precession(p, omega) / (p.I3 * omega);
  function stationnaire(p, theta, omega3) {
    check(p); finite(theta, "theta"); finite(omega3, "omega3");
    const a = p.I1 * Math.cos(theta), b = p.I3 * omega3, c = p.M * p.g * p.d;      // a Ω² − b Ω + c = 0
    if (Math.abs(a) < 1e-15 * Math.abs(b)) return c / b;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    return 2 * c / (b + Math.sign(b) * Math.sqrt(disc));                                // the slow root, without cancellation
  }
  function lancer(p, theta0, omega) {
    check(p); finite(theta0, "theta0"); finite(omega, "omega");
    const e = [Math.sin(theta0), 0, Math.cos(theta0)];
    return { L: fois(p.I3 * omega, e), e };
  }
  function deriv(p, s) {
    const l3 = dot(s.L, s.e), w = somme(fois(1 / p.I1, s.L), fois(l3 * (1 / p.I3 - 1 / p.I1), s.e));
    return { L: fois(p.M * p.g * p.d, vectoriel([0, 0, 1], s.e)), e: vectoriel(w, s.e) };
  }
  function pas(p, s, h) {
    const y = Integ.rk4((t, y) => { const d = deriv(p, { L: y.slice(0, 3), e: y.slice(3) }); return d.L.concat(d.e); }, 0, s.L.concat(s.e), h);
    const e = y.slice(3);
    return { L: y.slice(0, 3), e: fois(1 / norme(e), e) };                               // the axis stays a unit vector
  }
  function energieToupie(p, s) {
    const l3 = dot(s.L, s.e), lp2 = dot(s.L, s.L) - l3 * l3;
    return lp2 / (2 * p.I1) + l3 * l3 / (2 * p.I3) + p.M * p.g * p.d * s.e[2];
  }
  function toupie(p, s0, h, n) {
    check(p); finite(h, "h"); if (!(h > 0)) err("pas h strictement positif");
    if (!Number.isInteger(n) || n < 1) err("nombre de pas entier ≥ 1");
    const out = { t: [], e: [], L: [], theta: [], phi: [], E: [], Lz: [], L3: [] };
    let s = s0, phi = Math.atan2(s0.e[1], s0.e[0]);
    for (let i = 0; i <= n; i++) {
      if (i) {
        s = pas(p, s, h);
        const a = Math.atan2(s.e[1], s.e[0]); let d = a - (phi % (2 * Math.PI));
        d = ((d + 3 * Math.PI) % (2 * Math.PI)) - Math.PI; phi += d;
      }
      out.t.push(i * h); out.e.push(s.e); out.L.push(s.L);
      out.theta.push(Math.acos(Math.max(-1, Math.min(1, s.e[2])))); out.phi.push(phi);
      out.E.push(energieToupie(p, s)); out.Lz.push(s.L[2]); out.L3.push(dot(s.L, s.e));
    }
    return out;
  }
  function mesure(res, tmin) {
    tmin = tmin || 0;
    const idx = res.t.map((t, i) => i).filter(i => res.t[i] >= tmin);
    if (idx.length < 3) err("trop peu de points après tmin");
    const n = idx.length, mt = idx.reduce((s, i) => s + res.t[i], 0) / n, mp = idx.reduce((s, i) => s + res.phi[i], 0) / n;
    const sxy = idx.reduce((s, i) => s + (res.t[i] - mt) * (res.phi[i] - mp), 0), sxx = idx.reduce((s, i) => s + (res.t[i] - mt) ** 2, 0);
    const th = idx.map(i => res.theta[i]);
    let max = 0; for (let k = 1; k < th.length - 1; k++) if (th[k] > th[k - 1] && th[k] >= th[k + 1]) max++;
    return { Omega: sxy / sxx, amplitude: Math.max(...th) - Math.min(...th), nutations: max };
  }
  function nutationRapide(p, theta0, omega) {
    const eps = parametre(p, omega);
    return { Omega: precession(p, omega), amplitude: 2 * eps * Math.sin(theta0), frequence: p.I3 * omega / p.I1, eps };
  }

  /* ---------- the angular momentum of a solid (I.20.4) ---------- */
  function pts(points) {
    if (!Array.isArray(points) || !points.length) err("un solide est une liste non vide de points { m, r }");
    points.forEach((q, i) => { if (!(finite(q.m, "m[" + i + "]") > 0)) err("masse du point " + i + " strictement positive"); v3(q.r, "r[" + i + "]"); });
    return points;
  }
  const inertie = points => Tens.inertiePoints(pts(points).map(q => q.m), points.map(q => q.r));
  const enRotation = (points, omega) => { v3(omega, "omega"); return pts(points).map(({ m, r }) => ({ m, r, v: vectoriel(omega, r) })); };
  const momentCinetique = (points, omega) => Solide.momentCinetique(enRotation(points, omega));
  const energie = (points, omega) => Solide.energieCinetique(enRotation(points, omega));
  function axesPrincipaux(I0) {
    if (!Array.isArray(I0) || I0.length !== 3 || I0.some(r => !Array.isArray(r) || r.length !== 3)) err("matrice 3 × 3");
    const A = I0.map(r => r.map(q => finite(q, "I")));
    for (let i = 0; i < 3; i++) for (let j = 0; j < i; j++) if (Math.abs(A[i][j] - A[j][i]) > 1e-9 * (Math.abs(A[i][j]) + Math.abs(A[j][i]) + 1e-300)) err("matrice d'inertie symétrique attendue");
    const { valeurs, axes } = Tens.propres(Tens.partieSymetrique(A));
    return { moments: valeurs.reverse(), axes: axes.reverse() };
  }
  const tourner = (points, M) => pts(points).map(({ m, r }) => ({ m, r: appliquer(M, r) }));
  const palier = (points, omega) => vectoriel(v3(omega, "omega"), momentCinetique(points, omega));

  /* the solids of the page, tilted by alpha about x on a shaft along z */
  const SOLIDES = {
    haltere: { m: 1, a: 0.2 },                              // two 1 kg masses 0,2 m on each side of the point O of the shaft, light rod
    roue: { m: 20, R: 0.3, n: 72 },                         // a car wheel as a 20 kg ring of radius 0,3 m
    pave: { m: 2, cotes: [0.4, 0.2, 0.1] },                 // 2 kg at the 8 corners of a 0,4 × 0,2 × 0,1 m box
  };
  function solide(nom, alpha) {
    finite(alpha, "alpha"); const s = SOLIDES[nom]; if (!s) err("solide inconnu " + nom);
    let p;
    if (nom === "haltere") p = [{ m: s.m, r: [0, s.a, 0] }, { m: s.m, r: [0, -s.a, 0] }];
    else if (nom === "roue") p = Array.from({ length: s.n }, (_, k) => ({ m: s.m / s.n, r: [s.R * Math.cos(2 * Math.PI * k / s.n), s.R * Math.sin(2 * Math.PI * k / s.n), 0] }));
    else { const [a, b, c] = s.cotes; p = []; for (const i of [-1, 1]) for (const j of [-1, 1]) for (const k of [-1, 1]) p.push({ m: s.m / 8, r: [i * a / 2, j * b / 2, k * c / 2] }); }
    /* at alpha = 0 each solid is square on the shaft (the rod of the dumbbell, the plane of the wheel perpendicular to it):
       L is along ω. The box is also turned about z by 30° first, so that its tilt is about none of its axes of symmetry */
    if (nom === "pave") p = tourner(p, rotation([0, 0, 1], Math.PI / 6));
    return tourner(p, rotation([1, 0, 0], alpha));
  }

  const api = { momentsPlans, enVecteur, axesTournes, tournerPlans, ecartTransformation, ecartParite, plans,
    vitesse, distanceAxe, angleRotation, ordreRotations, puissance,
    precession, parametre, stationnaire, lancer, pas, toupie, mesure, nutationRapide, energieToupie,
    inertie, enRotation, momentCinetique, energie, axesPrincipaux, tourner, solide, palier, SOLIDES };
  if (node) module.exports = api;
  else root.RotEsp = api;
})(typeof self !== "undefined" ? self : this);

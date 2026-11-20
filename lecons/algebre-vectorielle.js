/* Algèbre vectorielle — vectors, their algebra, Newton's law as one vector equation, scalar and vector products
   (Feynman I.11.4–11.7; CPGE « outils mathématiques », cinématique du point, moment cinétique en aperçu).
   Pure, no DOM, UMD (global AlgVec). SI throughout. Builds on Dyna (vec, norme, somme, fois), Travail (scalaire, puissance),
   Cine (circle, turnAverage, central, order) and Tenseurs (vectoriel, rotation): those are not copied here.

   Vectors (arrays of 1 to 3 numbers, like Dyna)
     difference(a, b)               a − b.
     combinaison(a, k, b)           a + k b: sum, multiplication by a scalar and difference (k = −1) at once.
     vectoriel(a, b)                a × b, 3 components each.
     angle(a, b)                    angle in [0, π] between two non-zero vectors, from a·b = |a||b| cos θ.
   Changing the axes, not the physics
     rotationPlan(phi)              2 × 2 matrix whose rows are the new axes x′, y′ (axes turned by phi): applied to the
                                    components of a fixed vector, it gives its components on the new axes.
     rotation(axe, theta)           Tenseurs.rotation: 3 × 3 matrix of the rotation of angle theta about axe (Rodrigues).
     appliquer(M, v)                M v.
     composantes(v, phi)            the components of the plane vector v on axes turned by phi = appliquer(rotationPlan(phi), v).
     ecartCovariance(f, a, M)       |f(M a) − M f(a)|: zero when the rule f turns a vector into a vector (it commutes with
                                    the change of axes), not zero when f(a) is only a list of numbers.
     carres(v)                      (v_x², v_y², …): a list of numbers that is not a vector.
   Derivative of a vector
     derivee(f, t, h)               d f/dt at t for a vector function f, central difference of step h on each component.
   Circular motion (I.11.6)
     virage(R, v0, at, dt)          a point on a circle of radius R, speed v0 at t = 0 and dv/dt = at (constant), followed
                                    during dt: { v1, v2, dv, moy: Δv/Δt, par, perp, attendu: { par, perp } }. par and perp
                                    are the components of Δv/Δt along and across the velocity at mid-time; attendu gives the
                                    limit dt → 0 at that instant: at and v²/R. The error is of order dt² (centred difference).
   A circular orbit (I.11.6, the space station)
     orbite(h, v)                   altitude h, published speed v, spherical Earth of mean radius: { R, a: v²/R, g: GM/R²,
                                    ecart: a/g − 1, vc: √(GM/R), T: 2πR/v }. vc is the speed of a circular orbit at that radius:
                                    the gap a/g − 1 ≈ 2(v/vc − 1) measures how far v is from it.
   Systems described before the law (the « Système » boxes, numbers from Dyna.negligeables)
     SYSTEMES                       rondPoint: a car on a roundabout; luge: a sledge pulled by a rope; telephone: a phone at rest;
                                    avion: a light plane in the wind (a = g: Coriolis is compared with the weight).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Dyna = node ? require("./dynamique.js") : root.Dyna;
  const Travail = node ? require("./travail.js") : root.Travail;
  const Cine = node ? require("./cinematique.js") : root.Cine;
  const Tens = node ? require("../tenseurs.js") : root.Tenseurs;
  const { vec, norme, somme, fois } = Dyna, scalaire = Travail.scalaire;

  const err = m => { throw new Error("algvec: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };

  /* ---------- algebra (I.11.5) ---------- */
  const difference = (a, b) => somme(a, fois(-1, b));
  const combinaison = (a, k, b) => somme(a, fois(k, b));
  function vectoriel(a, b) {
    vec(a, "a"); vec(b, "b");
    if (a.length !== 3 || b.length !== 3) err("le produit vectoriel demande deux vecteurs à 3 composantes");
    return Tens.vectoriel(a, b);
  }
  function angle(a, b) {
    const na = norme(a), nb = norme(b);
    if (!(na > 0 && nb > 0)) err("angle d'un vecteur nul : aucune direction");
    return Math.acos(Math.max(-1, Math.min(1, scalaire(a, b) / (na * nb))));
  }

  /* ---------- change of axes (I.11.4) ---------- */
  function rotationPlan(phi) {
    finite(phi, "phi"); const c = Math.cos(phi), s = Math.sin(phi);
    return [[c, s], [-s, c]];
  }
  const rotation = Tens.rotation;
  function appliquer(M, v) {
    vec(v, "v");
    if (!Array.isArray(M) || M.length !== v.length || M.some(r => !Array.isArray(r) || r.length !== v.length)) err("matrice et vecteur de dimensions différentes");
    return M.map(r => r.reduce((s, q, j) => s + finite(q, "M") * v[j], 0));
  }
  function composantes(v, phi) { vec(v, "v"); if (v.length !== 2) err("composantes dans le plan : 2 composantes"); return appliquer(rotationPlan(phi), v); }
  const ecartCovariance = (f, a, M) => norme(difference(f(appliquer(M, a)), appliquer(M, f(a))));
  const carres = v => vec(v).map(q => q * q);

  /* ---------- derivative of a vector ---------- */
  function derivee(f, t, h) {
    finite(t, "t"); finite(h, "h"); if (!(h > 0)) err("pas h strictement positif");
    const n = vec(f(t)).length;
    return Array.from({ length: n }, (_, i) => Cine.central(u => f(u)[i], t, h));
  }

  /* ---------- circular motion (I.11.6) ---------- */
  function virage(R, v0, at, dt) {
    [R, v0, at, dt].forEach((q, i) => finite(q, ["R", "v0", "at", "dt"][i]));
    if (!(R > 0)) err("rayon R strictement positif");
    if (!(dt > 0)) err("durée dt strictement positive");
    if (!(v0 >= 0) || !(v0 + at * dt >= 0)) err("la vitesse doit rester positive pendant dt");
    const speed = t => v0 + at * t, theta = t => (v0 * t + at * t * t / 2) / R;
    const vel = t => { const th = theta(t), s = speed(t); return [-s * Math.sin(th), s * Math.cos(th)]; };
    const v1 = vel(0), v2 = vel(dt), dv = difference(v2, v1), moy = fois(1 / dt, dv);
    const thm = theta(dt / 2), u = [-Math.sin(thm), Math.cos(thm)], n = [-Math.cos(thm), -Math.sin(thm)];   // tangent, towards the centre
    const vm = speed(dt / 2);
    return { v1, v2, dv, moy, par: scalaire(moy, u), perp: scalaire(moy, n), attendu: { par: at, perp: vm * vm / R }, angle: theta(dt), tangente: u, centre: n };
  }

  /* ---------- a circular orbit: v²/R against the weight per unit mass ---------- */
  function orbite(h, v) {
    finite(h, "h"); if (!(finite(v, "v") > 0)) err("vitesse strictement positive");
    const R = Dyna.RT + h, g = Dyna.pesanteur(h), a = v * v / R;
    return { R, a, g, ecart: a / g - 1, vc: Math.sqrt(g * R), T: 2 * Math.PI * R / v };
  }

  /* ---------- the systems of the pages ---------- */
  const SYSTEMES = {
    rondPoint: { v: 10, a: 5, taille: 4, echelle: 2 * Math.PI * 20, duree: 2 * Math.PI * 20 / 10, R: 20 },   // car, R = 20 m, 10 m·s⁻¹
    luge: { v: 1, a: 0.1, taille: 1, echelle: 10, duree: 10, F: 50, d: 10 },                                // sledge pulled 10 m by 50 N
    telephone: { v: 0, a: Cine.G, taille: 0.15, echelle: 0.15, duree: 1 },                                   // phone at rest on a table
    avion: { v: 75, a: Cine.G, taille: 10, echelle: 2e5, duree: 3600 },                                       // light plane, 60 m·s⁻¹ in a 15 m·s⁻¹ wind: 75 m·s⁻¹ is the upper bound of its ground speed, 1 h
  };
  const negligeables = nom => { const s = SYSTEMES[nom]; if (!s) err("système inconnu " + nom); return Dyna.negligeables(s); };

  const api = { difference, combinaison, vectoriel, angle, rotationPlan, rotation, appliquer, composantes, ecartCovariance, carres, derivee, virage, orbite, SYSTEMES, negligeables };
  if (node) module.exports = api;
  else root.AlgVec = api;
})(typeof self !== "undefined" ? self : this);

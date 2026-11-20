/* Sym — symmetry of the laws, computed, for the lessons I.11.1 to I.11.3 (symmetry, translations, rotations).
   Pure, no DOM, UMD (global Sym). SI. Builds on Dyna (vector helpers, dynamique.js) and Integ (integration.js).

   Frames      R is the lab: x horizontal, y up, origin on the ground. R′ has its origin o (given in R) and axes turned by θ.
               (11.2) then (11.5): r′ = M(θ)(r − o), with M(θ) = [[cos θ, sin θ], [−sin θ, cos θ]].
               A vector (velocity, force, field) does not see the origin: v′ = M v, (11.3) and (11.6).
               repereMatrice(o, M) accepts any invertible M: a non-orthogonal one is how the tests show what fails.
   Experiment  two balls in a vertical plane, a stiff contact spring between them (the collision), an optional field
               (the Earth, spherical and not rotating, or none) and an optional zero-length spring tying ball 1 to an anchor.
   Moving      transporte(exp, R′, emporte) re-expresses the experiment in R′. With everything carried (the default) it is
               a change of frame. With emporte.champ or emporte.ancre false, the balls are moved and the surroundings stay:
               that is moving the experiment in a world that is not symmetric.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Dyna = node ? require("./dynamique.js") : root.Dyna;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const { vec, norme, somme, fois } = Dyna;
  const GM = Cst.GM_E, RT = Cst.R_E_mean;

  const err = m => { throw new Error("sym: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const diff = (a, b) => somme(a, fois(-1, b));
  function scalaire(a, b) { if (vec(a, "a").length !== vec(b, "b").length) err("vecteurs de dimensions différentes"); return a.reduce((s, x, i) => s + x * b[i], 0); }
  const distance = (a, b) => norme(diff(a, b));

  /* ---------- matrices (2 × 2 or 3 × 3) ---------- */
  function carree(M) {
    if (!Array.isArray(M) || (M.length !== 2 && M.length !== 3) || M.some(r => !Array.isArray(r) || r.length !== M.length)) err("matrice carrée 2 × 2 ou 3 × 3 attendue");
    M.forEach((r, i) => vec(r, "M[" + i + "]"));
    return M;
  }
  /* (11.5): components in axes turned by θ about z. n = 2 (plane) or 3 (z unchanged). */
  function matrice(theta, n) {
    finite(theta, "θ"); n = n == null ? 2 : n;
    if (n !== 2 && n !== 3) err("dimension 2 ou 3");
    const c = Math.cos(theta), s = Math.sin(theta);
    return n === 2 ? [[c, s], [-s, c]] : [[c, s, 0], [-s, c, 0], [0, 0, 1]];
  }
  function applique(M, v) { carree(M); if (vec(v).length !== M.length) err("le vecteur n'a pas la dimension de la matrice"); return M.map(r => scalaire(r, v)); }
  const transposee = M => carree(M).map((r, i) => r.map((_, j) => M[j][i]));
  /* A·B: B first, then A */
  function compose(A, B) { carree(A); carree(B); if (A.length !== B.length) err("matrices de tailles différentes"); const Bt = transposee(B); return A.map(r => Bt.map(col => scalaire(r, col))); }
  function determinant(M) {
    carree(M);
    if (M.length === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
    const [a, b, c] = M;
    return a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
  }
  function inverse(M) {
    const d = determinant(M);
    if (!(Math.abs(d) > 1e-15)) err("matrice non inversible : ce n'est pas un changement de repère");
    if (M.length === 2) return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]];
    const co = (i, j) => { const r = [0, 1, 2].filter(k => k !== i), c = [0, 1, 2].filter(k => k !== j);
      return ((i + j) % 2 ? -1 : 1) * (M[r[0]][c[0]] * M[r[1]][c[1]] - M[r[0]][c[1]] * M[r[1]][c[0]]); };
    return [0, 1, 2].map(i => [0, 1, 2].map(j => co(j, i) / d));
  }
  /* M Mᵀ = I: lengths and angles kept. The test of a rotation (or a reflection, determinant −1). */
  function estOrthogonale(M, tol) {
    tol = tol == null ? 1e-12 : tol;
    return compose(M, transposee(M)).every((r, i) => r.every((x, j) => Math.abs(x - (i === j ? 1 : 0)) <= tol));
  }
  const tourne = (v, theta) => applique(matrice(theta, vec(v).length), v);

  /* ---------- frames ---------- */
  function repereMatrice(o, M) {
    vec(o, "o"); carree(M); if (o.length !== M.length) err("origine et matrice de dimensions différentes");
    const Mi = inverse(M), O = o.slice();
    return { o: O, M, orthogonal: estOrthogonale(M, 1e-9),
      point: p => applique(M, diff(p, O)),       // coordinates in R′ of a point given in R
      vecteur: v => applique(M, v),              // components in R′ of a vector given in R
      pointR: q => somme(applique(Mi, q), O),     // back to R
      vecteurR: w => applique(Mi, w) };
  }
  const repere = (o, theta) => repereMatrice(o, matrice(theta == null ? 0 : theta, vec(o, "o").length));
  /* an active move: turn by phi (counterclockwise) about c, then shift by d. The same object as a frame (point, vecteur…):
     moving a thing by g is re-expressing it in the frame whose coordinates are g(r). */
  function deplacement(d, phi, c) {
    vec(d, "d"); phi = phi == null ? 0 : finite(phi, "φ"); c = c == null ? d.map(() => 0) : vec(c, "c");
    const Q = matrice(-phi, d.length);                            // matrice(θ) turns the axes; turning the thing is the opposite
    return repereMatrice(diff(c, applique(inverse(Q), somme(c, d))), Q);
  }

  /* ---------- fields: acceleration and potential per unit mass ---------- */
  /* the Earth, spherical and not rotating, centre at (0, −RT) in the lab; potential counted from the lab origin */
  function champTerre() {
    const C = [0, -RT];
    /* raw arithmetic: called at every step of the integration */
    return { nom: "terre", a: p => { const x = p[0] - C[0], y = p[1] - C[1], r = Math.hypot(x, y), k = -GM / (r * r * r); return [k * x, k * y]; },
      phi: p => { const r = distance(p, C); return GM * (r - RT) / (r * RT); } };
  }
  const champUniforme = g => { vec(g, "g"); return { nom: "uniforme", a: () => g.slice(), phi: p => -scalaire(g, p) }; };
  /* a field seen from R′: same physical field, its vectors re-expressed */
  const champDans = (ch, R) => ({ nom: ch.nom, a: q => R.vecteur(ch.a(R.pointR(q))), phi: q => ch.phi(R.pointR(q)) });

  /* ---------- the experiment ---------- */
  const RHO_ACIER = 7850;                                          // kg·m⁻³, the steel of dynamique.js (SYSTEMES.chute)
  const masseBille = r => RHO_ACIER * 4 / 3 * Math.PI * r * r * r;
  /* two steel balls of radii 4 and 3 cm thrown in a vertical plane so that they meet obliquely after 0,73 s; the contact is a
     spring of 10⁵ N·m⁻¹ (softer than steel: the balls overlap by about 1 cm), integrated with a step of 0,1 ms.
     champ: "terre" (default), "vide" or a field; ancre: { point, k } or null */
  function billes(o) {
    o = o || {};
    const champ = o.champ === "vide" ? null : o.champ && o.champ !== "terre" ? o.champ : champTerre();
    return { m: [masseBille(0.04), masseBille(0.03)], rayons: [0.04, 0.03], k: 1e5,
      x0: [[0, 1], [3, 1]], v0: [[3, 4], [-1, 4.05]], champ, ancre: o.ancre || null, duree: 1, pas: 1e-4 };
  }
  function check(e) {
    if (!e || !Array.isArray(e.m) || e.m.length !== 2) err("expérience à deux billes { m, rayons, k, x0, v0, champ, ancre, duree, pas }");
    e.m.forEach(m => { if (!(finite(m, "m") > 0)) err("masses strictement positives"); });
    e.x0.forEach((p, i) => vec(p, "x0[" + i + "]")); e.v0.forEach((v, i) => vec(v, "v0[" + i + "]"));
    if (!(finite(e.k, "k") > 0) || !(finite(e.duree, "duree") >= 0) || !(finite(e.pas, "pas") > 0)) err("il faut k > 0, durée ≥ 0, pas > 0");
  }
  /* the four sums the lessons follow: momentum, angular momentum about c (z), energy, and the kinetic energy */
  function bilan(e, X, V, c) {
    c = c || [0, 0];
    const P = [0, 1].map(i => X.slice(2 * i, 2 * i + 2)), U = [0, 1].map(i => V.slice(2 * i, 2 * i + 2));
    const p = somme(fois(e.m[0], U[0]), fois(e.m[1], U[1]));
    const L = [0, 1].reduce((s, i) => { const r = diff(P[i], c); return s + e.m[i] * (r[0] * U[i][1] - r[1] * U[i][0]); }, 0);
    const Ec = [0, 1].reduce((s, i) => s + e.m[i] * scalaire(U[i], U[i]) / 2, 0);
    const over = e.rayons[0] + e.rayons[1] - distance(P[0], P[1]);
    let Ep = over > 0 ? e.k * over * over / 2 : 0;
    if (e.champ) Ep += e.m[0] * e.champ.phi(P[0]) + e.m[1] * e.champ.phi(P[1]);
    if (e.ancre) { const s = diff(P[0], e.ancre.point); Ep += e.ancre.k * scalaire(s, s) / 2; }
    return { p, L, E: Ec + Ep, Ec };
  }
  /* integrate (leapfrog, integration.js). o.centre: the point for the angular momentum; o.t0: start time; o.every: sampling.
     Returns the sampled path, the final state, the first contact and the sums at start and end. */
  function simule(e, o) {
    check(e); o = o || {};
    const R = e.rayons[0] + e.rayons[1];
    const m1 = e.m[0], m2 = e.m[1], A = e.ancre;
    const acc = (t, X) => {                                        // raw arithmetic: called at every step
      const dx = X[2] - X[0], dy = X[3] - X[1], r = Math.hypot(dx, dy), out = [0, 0, 0, 0];
      if (r < R && r > 0) { const f = e.k * (R - r) / r; out[0] = -f * dx / m1; out[1] = -f * dy / m1; out[2] = f * dx / m2; out[3] = f * dy / m2; }
      if (e.champ) { const g1 = e.champ.a([X[0], X[1]], t), g2 = e.champ.a([X[2], X[3]], t); out[0] += g1[0]; out[1] += g1[1]; out[2] += g2[0]; out[3] += g2[1]; }
      if (A) { out[0] -= A.k / m1 * (X[0] - A.point[0]); out[1] -= A.k / m1 * (X[1] - A.point[1]); }
      return out;
    };
    const s0 = { t: o.t0 == null ? 0 : finite(o.t0, "t0"), x: e.x0[0].concat(e.x0[1]), v: e.v0[0].concat(e.v0[1]) };
    const n = Math.round(e.duree / e.pas), tr = Integ.run("leapfrog", acc, s0, e.pas, n, { every: o.every || 1 });
    const last = tr.x.length - 1, X = tr.x[last], V = tr.v[last];
    let choc = null;
    for (let k = 0; k < tr.x.length && !choc; k++) {
      const x = tr.x[k];
      if (Math.hypot(x[2] - x[0], x[3] - x[1]) < R) choc = { t: tr.t[k] - s0.t, point: [(x[0] + x[2]) / 2, (x[1] + x[3]) / 2] };
    }
    return { t: tr.t, chemin: tr.x.map(x => [[x[0], x[1]], [x[2], x[3]]]), choc,
      fin: { x: [[X[0], X[1]], [X[2], X[3]]], v: [[V[0], V[1]], [V[2], V[3]]] },
      debut: bilan(e, s0.x, s0.v, o.centre), arrivee: bilan(e, X, V, o.centre) };
  }

  /* the experiment re-expressed in R′. emporte.champ / emporte.ancre false: the balls move, the surroundings stay. */
  function transporte(e, R, emporte) {
    check(e); emporte = Object.assign({ champ: true, ancre: true }, emporte);
    return Object.assign({}, e, {
      x0: e.x0.map(R.point), v0: e.v0.map(R.vecteur),
      champ: e.champ && emporte.champ ? champDans(e.champ, R) : e.champ,
      ancre: e.ancre && emporte.ancre ? { point: R.point(e.ancre.point), k: e.ancre.k } : e.ancre });
  }
  const retour = (fin, R) => ({ x: fin.x.map(R.pointR), v: fin.v.map(R.vecteurR) });
  /* largest difference between two final states, positions (m) and velocities (m·s⁻¹) */
  const ecartFins = (a, b) => ({ x: Math.max(...a.x.map((p, i) => distance(p, b.x[i]))), v: Math.max(...a.v.map((u, i) => distance(u, b.v[i]))) });
  /* the same experiment computed in R and in R′ (or moved by R′), the result of R′ brought back to R and compared */
  function compare(e, R, emporte, ref) {
    ref = ref || simule(e);
    const autre = simule(transporte(e, R, emporte));
    return { ref, autre, retour: retour(autre.fin, R), ecart: ecartFins(ref.fin, retour(autre.fin, R)) };
  }

  /* ---------- what the surroundings break, as numbers ---------- */
  const g0 = () => Dyna.pesanteur(0);
  /* lifting a free-falling experiment by h with the Earth left in place: g drops by g·ecartUniforme(h), every ball
     falls that much less, so after T the result is shifted by Δg T²/2. Moving it sideways by d tilts g by d/RT. */
  function decalageVertical(h, T) { const dg = g0() * Dyna.ecartUniforme(finite(h, "h")); return { dg, relatif: dg / g0(), dy: dg * T * T / 2 }; }
  function decalageHorizontal(d, T) { const da = g0() * finite(d, "d") / RT; return { da, angle: d / RT, dx: da * T * T / 2 }; }
  /* tilting the apparatus by phi, the Earth not tilted: along the apparatus, the pull changes by g(1 − cos φ) and a
     sideways part g sin φ appears */
  const inclinaison = phi => ({ long: g0() * (1 - Math.cos(finite(phi, "φ"))), travers: g0() * Math.sin(phi) });

  /* what the description of the two-ball system neglects, at the largest speed of the run (start or end):
     (v/c)², air drag against weight (needs forces.js), Coriolis against g */
  function negligeables(e) {
    e = e || billes();
    const v = Math.max(...e.v0.concat(simule(e).fin.v).map(norme)), n = Dyna.negligeables({ v, a: g0(), taille: 2 * e.rayons[0], echelle: 3, duree: e.duree });
    return { v, rel: n.rel, coriolis: n.coriolis, rotation: n.rotation,
      trainee: Math.max(...[0, 1].map(i => Dyna.trainee(2 * e.rayons[i], e.m[i], v))), masses: e.m.slice() };
  }

  const api = { RT, GM, RHO_ACIER, scalaire, distance, matrice, applique, transposee, compose, determinant, inverse, estOrthogonale, tourne,
    repere, repereMatrice, deplacement, champTerre, champUniforme, champDans, masseBille, billes, bilan, simule, transporte, retour,
    ecartFins, compare, decalageVertical, decalageHorizontal, inclinaison, negligeables };
  if (node) module.exports = api;
  else root.Sym = api;
})(typeof self !== "undefined" ? self : this);

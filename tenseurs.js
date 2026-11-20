/* Tenseurs — second-rank tensors in 3 dimensions as 3 × 3 matrices (Feynman II.31). Pure, no DOM, UMD (global Tenseurs).
   SI throughout. Shared by the steps « Tenseurs » (tenseurs-1, tenseurs-2): extend here, do not copy.

   Matrices are arrays of 3 rows of 3 finite numbers; vectors are arrays of 3 finite numbers. Functions never modify their
   arguments.

   Algebra
     mat(M, name)              checks M is 3 × 3 and finite, returns M (throws otherwise).
     identite()                the unit matrix δ_ij.
     diag(a, b, c)             diagonal matrix.
     transposee(M)             Mᵀ.
     produit(A, B)             A B.
     somme(A, B, k)            A + k B (k = 1 by default).
     appliquer(T, v)           T v: the tensor turns the vector v into a vector (P = α E, L = I ω).
     quadratique(T, v)         vᵀ T v: the energy-like scalar of the tensor along v.
     trace(T), det(T)          invariants: unchanged by a change of axes.
     ecartSymetrie(T)          max |T_ij − T_ji|: 0 for a symmetric tensor.
     norme(T)                  Frobenius norm √Σ T_ij², unchanged by a rotation.
     scalaire(a, b), vectoriel(a, b), angle(a, b)   for 3-vectors; angle in [0, π] (throws for a zero vector).
   Axes
     rotation(axe, theta)      3 × 3 rotation of angle theta (rad) about axe (Rodrigues), applied to vectors.
     estRotation(R, tol)       Rᵀ R = 1 and det R = +1 within tol.
     changementBase(T, R)      components of T on new axes: T′ = R T Rᵀ, where the ROWS of R are the new unit axes written
                               on the old ones (so that v′ = R v). Same convention as AlgVec.rotationPlan.
   Principal axes of a symmetric tensor
     propres(S, tol)           cyclic Jacobi rotations. Returns { valeurs: [λ1 ≤ λ2 ≤ λ3], axes: [u1, u2, u3] (unit,
                               right-handed: u1 × u2 = u3), iterations, residu }. Then S = Σ λ_k u_k u_kᵀ; residu is the
                               largest off-diagonal term left (≤ tol · norme(S)). Throws if S is not symmetric.
     depuisPropres(valeurs, axes)   Σ λ_k u_k u_kᵀ: builds the tensor back from its principal values and axes.
     ellipsoide(S)             for S positive definite, the surface xᵀ S x = 1: { demiAxes: [1/√λ_k], axes }.
                               Throws if an eigenvalue is ≤ 0 (no closed surface).
   Inertia (II.31.4), about a point O, axes fixed in the body
     inertiePoints(m, r)       I_ij = Σ m (r² δ_ij − x_i x_j) for point masses m[k] at r[k] (kg, m → kg·m²).
     inertiePave(m, a, b, c)   uniform solid box of mass m and edges a, b, c along x, y, z, about its centre:
                               diag(m(b² + c²)/12, m(c² + a²)/12, m(a² + b²)/12).
     huygens(Ig, m, d)         inertia about a point at −d from the centre of mass G (G at d from the new point):
                               I = I_G + m (d² δ − d dᵀ).
     momentAxe(I, n)           moment of inertia about the axis of direction n through O: nᵀ I n / |n|².
     energieRotation(I, w)     ½ ωᵀ I ω (J).
   Vector product as a tensor (II.31.5)
     produitTensoriel(a, b)    a_i b_j: the product of two vectors is a tensor.
     exterieur(a, b)           a_i b_j − a_j b_i (31.22 with a = r, b = F): antisymmetric, 3 independent terms.
     dual(T)                   (T_yz, T_zx, T_xy): for T = exterieur(a, b) it is a × b. Three numbers only because n = 3.
     matriceProduit(a)         [a]×, the antisymmetric matrix with [a]× b = a × b; dual([a]×) = −a.
     partieSymetrique(T), partieAntisymetrique(T)   (T ± Tᵀ)/2.
     composantesIndependantes(n)   { vecteur: n, antisymetrique: n(n − 1)/2, symetrique, total } in n dimensions.
     estOrthogonale(Q, tol), changementBaseOrthogonal(T, Q)   as changementBase, but a mirror (det Q = −1) is allowed.
   Stress (II.31.6), tension counted positive (Feynman counts the push of a fluid positive: S = p δ there, −p δ here)
     vecteurContrainte(S, n)   S n/|n| (31.24): the force per unit area on the facet of normal n (Pa).
     normaleTangentielle(S, n) { t, sigma: t·n, tau: |t − σ n|, tangentielle }.
     hydrostatique(p)          −p δ.  moyenne(S): tr S/3.  deviateur(S): S − moyenne δ.
     vonMises(S)               √(3/2 s:s), s the deviator.  tresca(S): σ_max − σ_min.
     plan(sxx, syy, txy)       the 3 × 3 tensor of a plane stress state.
     facette(sxx, syy, txy, theta)   facet of normal (cos θ, sin θ, 0): { n, t, sigma, tau } with tau along (−sin θ, cos θ).
     mohr(sxx, syy, txy)       { centre, rayon, s1, s2, thetaP }: Mohr's circle; thetaP is the facet angle of s1.
     critereEC3(sx, sz, tau, fy, gM0)   left side of EN 1993-1-1:2005, 6.2.1(5), eq. 6.1 (≤ 1 to pass); gM0 = 1 by default.
   Higher ranks (II.31.7): a rank-r tensor is a flat array of 3^r numbers, index i1 3^(r−1) + … + ir
     tenseur(r, f)             builds T from f(i1, …, ir).
     isotrope4(lambda, mu)     λ δ_ij δ_kl + μ (δ_ik δ_jl + δ_il δ_jk).  lame(E, nu): { lambda, mu }.
     cubique4(C11, C12, C44)   stiffness of a cubic crystal on its cube axes (Pa).
     contracter(C, eps)        σ_ij = Σ C_ijkl ε_kl.  energieElastique(C, eps): ½ Σ C_ijkl ε_ij ε_kl (J·m⁻³).
     tourner(T, Q)             T′ = Q applied on every index (any rank, Q orthogonal).
     permuter(T, perm)         T′(i…) = T(i_perm[0], …).
     constantesLibres(r, { permutations, symetries })   dimension of the rank-r tensors with T = permuter(T, p) for each p
                               and T = tourner(T, Q) for each Q: 81, 36, 21, 3 (cubic), 2 (isotropic) for rank 4.
     youngDirection(C, n)      Young's modulus along n: uniaxial stress n nᵀ, solve C:ε = σ, E = 1/(nᵀ ε n).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const err = m => { throw new Error("tenseurs: " + m); };
  const num = (x, name) => { if (typeof x !== "number" || !isFinite(x)) err(name + " doit être un nombre fini"); return x; };
  function vec(v, name) {
    if (!Array.isArray(v) || v.length !== 3) err((name || "v") + " doit être un vecteur à 3 composantes");
    v.forEach((x, i) => num(x, (name || "v") + "[" + i + "]"));
    return v;
  }
  function mat(M, name) {
    name = name || "M";
    if (!Array.isArray(M) || M.length !== 3) err(name + " doit être une matrice 3 × 3");
    M.forEach((row, i) => {
      if (!Array.isArray(row) || row.length !== 3) err(name + " doit être une matrice 3 × 3");
      row.forEach((x, j) => num(x, name + "[" + i + "][" + j + "]"));
    });
    return M;
  }
  const build = f => [0, 1, 2].map(i => [0, 1, 2].map(j => f(i, j)));
  const identite = () => build((i, j) => (i === j ? 1 : 0));
  const diag = (a, b, c) => { [a, b, c].forEach((x, k) => num(x, "diag[" + k + "]")); const d = [a, b, c]; return build((i, j) => (i === j ? d[i] : 0)); };
  const transposee = M => { mat(M); return build((i, j) => M[j][i]); };
  const produit = (A, B) => { mat(A, "A"); mat(B, "B"); return build((i, j) => A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j]); };
  const somme = (A, B, k) => { mat(A, "A"); mat(B, "B"); k = k === undefined ? 1 : num(k, "k"); return build((i, j) => A[i][j] + k * B[i][j]); };
  const appliquer = (T, v) => { mat(T, "T"); vec(v, "v"); return T.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]); };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const scalaire = (a, b) => dot(vec(a, "a"), vec(b, "b"));
  const vectoriel = (a, b) => cross(vec(a, "a"), vec(b, "b"));
  function angle(a, b) {
    const na = Math.hypot(...vec(a, "a")), nb = Math.hypot(...vec(b, "b"));
    if (!(na > 0 && nb > 0)) err("angle d'un vecteur nul : aucune direction");
    return Math.atan2(Math.hypot(...cross(a, b)), dot(a, b));
  }
  const quadratique = (T, v) => dot(vec(v, "v"), appliquer(T, v));
  const trace = T => { mat(T, "T"); return T[0][0] + T[1][1] + T[2][2]; };
  const det = T => { mat(T, "T"); return dot(T[0], cross(T[1], T[2])); };
  const ecartSymetrie = T => { mat(T, "T"); return Math.max(Math.abs(T[0][1] - T[1][0]), Math.abs(T[0][2] - T[2][0]), Math.abs(T[1][2] - T[2][1])); };
  const norme = T => { mat(T, "T"); return Math.sqrt(T.reduce((s, r) => s + dot(r, r), 0)); };

  /* ---------- axes ---------- */
  function rotation(axe, theta) {
    vec(axe, "axe"); num(theta, "theta");
    const n = Math.hypot(axe[0], axe[1], axe[2]); if (!(n > 0)) err("axe de rotation nul");
    const [x, y, z] = axe.map(a => a / n), c = Math.cos(theta), s = Math.sin(theta), C = 1 - c;
    return [
      [c + x * x * C, x * y * C - z * s, x * z * C + y * s],
      [y * x * C + z * s, c + y * y * C, y * z * C - x * s],
      [z * x * C - y * s, z * y * C + x * s, c + z * z * C]];
  }
  function estRotation(R, tol) {
    tol = tol === undefined ? 1e-9 : tol;
    const E = somme(produit(transposee(R), R), identite(), -1);
    return E.every(r => r.every(x => Math.abs(x) <= tol)) && Math.abs(det(R) - 1) <= tol;
  }
  function changementBase(T, R) {
    mat(T, "T"); mat(R, "R");
    if (!estRotation(R, 1e-9)) err("R doit être une rotation (lignes orthonormées, det = +1)");
    return produit(produit(R, T), transposee(R));
  }

  /* ---------- principal axes: cyclic Jacobi ---------- */
  function propres(S, tol) {
    mat(S, "S");
    const sc = norme(S);
    if (ecartSymetrie(S) > 1e-12 * Math.max(sc, 1e-300)) err("propres demande un tenseur symétrique");
    tol = tol === undefined ? 1e-14 : num(tol, "tol");
    const A = build((i, j) => (S[i][j] + S[j][i]) / 2), V = identite();   // columns of V: the axes
    const off = () => Math.max(Math.abs(A[0][1]), Math.abs(A[0][2]), Math.abs(A[1][2]));
    let it = 0;
    while (sc > 0 && off() > tol * sc && it < 100) {
      for (const [p, q] of [[0, 1], [0, 2], [1, 2]]) {
        if (Math.abs(A[p][q]) <= 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < 3; k++) {            // A ← A Jpq
          const akp = A[k][p], akq = A[k][q];
          A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < 3; k++) {            // A ← Jpqᵀ A
          const apk = A[p][k], aqk = A[q][k];
          A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < 3; k++) {            // V ← V Jpq
          const vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq;
        }
      }
      it++;
    }
    if (off() > tol * sc * 10 && sc > 0) err("Jacobi n'a pas convergé");
    const order = [0, 1, 2].sort((a, b) => A[a][a] - A[b][b]);
    const valeurs = order.map(k => A[k][k]);
    const axes = order.map(k => [V[0][k], V[1][k], V[2][k]]);
    if (dot(cross(axes[0], axes[1]), axes[2]) < 0) axes[2] = axes[2].map(x => -x);
    return { valeurs, axes, iterations: it, residu: off() };
  }
  function depuisPropres(valeurs, axes) {
    vec(valeurs, "valeurs");
    if (!Array.isArray(axes) || axes.length !== 3) err("axes : 3 vecteurs");
    axes.forEach((u, k) => vec(u, "axes[" + k + "]"));
    return build((i, j) => valeurs[0] * axes[0][i] * axes[0][j] + valeurs[1] * axes[1][i] * axes[1][j] + valeurs[2] * axes[2][i] * axes[2][j]);
  }
  function ellipsoide(S) {
    const { valeurs, axes } = propres(S);
    if (!(valeurs[0] > 0)) err("l'ellipsoïde demande un tenseur défini positif (valeur propre " + valeurs[0] + ")");
    return { demiAxes: valeurs.map(l => 1 / Math.sqrt(l)), axes, valeurs };
  }

  /* ---------- inertia ---------- */
  function inertiePoints(m, r) {
    if (!Array.isArray(m) || !Array.isArray(r) || m.length !== r.length || !m.length) err("masses et positions : deux listes de même longueur");
    m.forEach((x, k) => { num(x, "m[" + k + "]"); if (x < 0) err("masse négative"); });
    r.forEach((v, k) => vec(v, "r[" + k + "]"));
    return build((i, j) => m.reduce((s, mk, k) => s + mk * ((i === j ? dot(r[k], r[k]) : 0) - r[k][i] * r[k][j]), 0));
  }
  function inertiePave(m, a, b, c) {
    [m, a, b, c].forEach((x, k) => { num(x, ["m", "a", "b", "c"][k]); if (x < 0) err("masse et arêtes positives"); });
    return diag(m * (b * b + c * c) / 12, m * (c * c + a * a) / 12, m * (a * a + b * b) / 12);
  }
  function huygens(Ig, m, d) {
    mat(Ig, "Ig"); num(m, "m"); vec(d, "d");
    if (m < 0) err("masse négative");
    const d2 = dot(d, d);
    return build((i, j) => Ig[i][j] + m * ((i === j ? d2 : 0) - d[i] * d[j]));
  }
  function momentAxe(I, n) {
    vec(n, "n"); const n2 = dot(n, n); if (!(n2 > 0)) err("direction d'axe nulle");
    return quadratique(I, n) / n2;
  }
  const energieRotation = (I, w) => quadratique(I, w) / 2;

  /* ---------- the vector product as a tensor (II.31.5) ---------- */
  const produitTensoriel = (a, b) => { vec(a, "a"); vec(b, "b"); return build((i, j) => a[i] * b[j]); };
  const exterieur = (a, b) => { vec(a, "a"); vec(b, "b"); return build((i, j) => a[i] * b[j] - a[j] * b[i]); };
  const dual = T => { mat(T, "T"); return [T[1][2], T[2][0], T[0][1]]; };
  const matriceProduit = a => { vec(a, "a"); return [[0, -a[2], a[1]], [a[2], 0, -a[0]], [-a[1], a[0], 0]]; };
  const partieSymetrique = T => { mat(T, "T"); return build((i, j) => (T[i][j] + T[j][i]) / 2); };
  const partieAntisymetrique = T => { mat(T, "T"); return build((i, j) => (T[i][j] - T[j][i]) / 2); };
  function composantesIndependantes(n) {
    if (!Number.isInteger(n) || n < 1) err("dimension : un entier ≥ 1");
    return { vecteur: n, antisymetrique: n * (n - 1) / 2, symetrique: n * (n + 1) / 2, total: n * n };
  }
  function estOrthogonale(Q, tol) {
    tol = tol === undefined ? 1e-9 : tol;
    const E = somme(produit(transposee(Q), Q), identite(), -1);
    return E.every(r => r.every(x => Math.abs(x) <= tol)) && Math.abs(Math.abs(det(Q)) - 1) <= tol;
  }
  function changementBaseOrthogonal(T, Q) {
    mat(T, "T"); mat(Q, "Q");
    if (!estOrthogonale(Q, 1e-9)) err("Q doit être orthogonale (lignes orthonormées, det = ±1)");
    return produit(produit(Q, T), transposee(Q));
  }

  /* ---------- stress (II.31.6): tension counted positive ---------- */
  function vecteurContrainte(S, n) {
    mat(S, "S"); vec(n, "n");
    const l = Math.hypot(n[0], n[1], n[2]); if (!(l > 0)) err("normale nulle");
    return appliquer(S, n.map(x => x / l));
  }
  function normaleTangentielle(S, n) {
    const l = Math.hypot(...vec(n, "n")), u = n.map(x => x / l), t = vecteurContrainte(S, n), sigma = dot(t, u);
    const tt = t.map((x, i) => x - sigma * u[i]);
    return { t, sigma, tau: Math.hypot(tt[0], tt[1], tt[2]), tangentielle: tt };
  }
  const hydrostatique = p => { num(p, "p"); return diag(-p, -p, -p); };
  const moyenne = S => trace(S) / 3;
  const deviateur = S => somme(S, identite(), -moyenne(S));
  const vonMises = S => { const s = deviateur(partieSymetrique(S)); return Math.sqrt(1.5 * s.reduce((a, r) => a + dot(r, r), 0)); };
  const tresca = S => { const v = propres(partieSymetrique(S)).valeurs; return v[2] - v[0]; };
  const plan = (sxx, syy, txy) => { [sxx, syy, txy].forEach((x, k) => num(x, ["sxx", "syy", "txy"][k])); return [[sxx, txy, 0], [txy, syy, 0], [0, 0, 0]]; };
  function facette(sxx, syy, txy, theta) {
    num(theta, "theta");
    const c = Math.cos(theta), s = Math.sin(theta), t = appliquer(plan(sxx, syy, txy), [c, s, 0]);
    return { n: [c, s, 0], t, sigma: t[0] * c + t[1] * s, tau: -t[0] * s + t[1] * c };
  }
  function mohr(sxx, syy, txy) {
    plan(sxx, syy, txy);
    const centre = (sxx + syy) / 2, rayon = Math.hypot((sxx - syy) / 2, txy);
    return { centre, rayon, s1: centre + rayon, s2: centre - rayon, thetaP: Math.atan2(2 * txy, sxx - syy) / 2 };
  }
  function critereEC3(sx, sz, tau, fy, gM0) {
    [sx, sz, tau, fy].forEach((x, k) => num(x, ["sx", "sz", "tau", "fy"][k]));
    gM0 = gM0 === undefined ? 1 : num(gM0, "gM0");
    if (!(fy > 0 && gM0 > 0)) err("fy et γM0 positifs");
    const f = fy / gM0, a = sx / f, b = sz / f, c = tau / f;
    return a * a + b * b - a * b + 3 * c * c;
  }

  /* ---------- higher ranks (II.31.7): a rank-r tensor is a flat array of 3^r numbers, index Σ i_k 3^(r−1−k) ---------- */
  function tenseur(rang, f) {
    if (!Number.isInteger(rang) || rang < 1 || rang > 6) err("rang : un entier de 1 à 6");
    const n = Math.pow(3, rang), out = new Array(n);
    for (let k = 0; k < n; k++) out[k] = num(f(...indices(rang, k)), "composante");
    return out;
  }
  function indices(rang, k) { const ix = new Array(rang); for (let p = rang - 1; p >= 0; p--) { ix[p] = k % 3; k = Math.floor(k / 3); } return ix; }
  const rangDe = T => { const r = Math.round(Math.log(T.length) / Math.log(3)); if (!Array.isArray(T) || Math.pow(3, r) !== T.length) err("tenseur : 3^r composantes"); return r; };
  const at4 = (C, i, j, k, l) => C[27 * i + 9 * j + 3 * k + l];
  const kron = (i, j) => (i === j ? 1 : 0);
  function isotrope4(lambda, mu) {
    num(lambda, "lambda"); num(mu, "mu");
    return tenseur(4, (i, j, k, l) => lambda * kron(i, j) * kron(k, l) + mu * (kron(i, k) * kron(j, l) + kron(i, l) * kron(j, k)));
  }
  function lame(E, nu) {
    num(E, "E"); num(nu, "nu");
    if (!(E > 0) || !(nu > -1 && nu < 0.5)) err("E > 0 et −1 < ν < 0,5");
    return { lambda: E * nu / ((1 + nu) * (1 - 2 * nu)), mu: E / (2 * (1 + nu)) };
  }
  function cubique4(C11, C12, C44) {
    [C11, C12, C44].forEach((x, k) => num(x, ["C11", "C12", "C44"][k]));
    return tenseur(4, (i, j, k, l) => (i === j && k === l ? (i === k ? C11 : C12) : 0) + ((i === k && j === l) || (i === l && j === k) ? (i !== j ? C44 : 0) : 0));
  }
  function contracter(C, eps) {
    if (rangDe(C) !== 4) err("contracter : C de rang 4"); mat(eps, "eps");
    return build((i, j) => { let s = 0; for (let k = 0; k < 3; k++) for (let l = 0; l < 3; l++) s += at4(C, i, j, k, l) * eps[k][l]; return s; });
  }
  const energieElastique = (C, eps) => { const s = contracter(C, eps); return s.reduce((a, r, i) => a + dot(r, eps[i]), 0) / 2; };
  function tourner(T, Q) {
    const r = rangDe(T); mat(Q, "Q");
    if (!estOrthogonale(Q, 1e-9)) err("Q doit être orthogonale");
    let A = T.slice();
    for (let p = 0; p < r; p++) {                       // apply Q on index p
      const B = new Array(A.length).fill(0), stride = Math.pow(3, r - 1 - p);
      for (let k = 0; k < A.length; k++) {
        const ip = Math.floor(k / stride) % 3, base = k - ip * stride;
        for (let a = 0; a < 3; a++) B[base + a * stride] += Q[a][ip] * A[k];
      }
      A = B;
    }
    return A;
  }
  const permuter = (T, perm) => { const r = rangDe(T); if (perm.length !== r) err("permutation de longueur " + r);
    return tenseur(r, (...ix) => T[perm.reduce((k, p) => 3 * k + ix[p], 0)]); };
  function rangMatrice(rows, n, tol) {
    const A = rows.map(r => r.slice()); let rank = 0;
    for (let c = 0; c < n && rank < A.length; c++) {
      let p = rank; for (let i = rank + 1; i < A.length; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
      if (Math.abs(A[p][c]) <= tol) continue;
      [A[rank], A[p]] = [A[p], A[rank]];
      for (let i = 0; i < A.length; i++) if (i !== rank) { const f = A[i][c] / A[rank][c]; if (f) for (let j = c; j < n; j++) A[i][j] -= f * A[rank][j]; }
      rank++;
    }
    return rank;
  }
  /* number of free constants of a rank-r tensor obeying index permutations (T = T∘perm) and orthogonal maps (T = Q·T) */
  function constantesLibres(rang, o) {
    o = o || {};
    const n = Math.pow(3, rang), rows = [];
    const unit = k => { const e = new Array(n).fill(0); e[k] = 1; return e; };
    const add = f => { const cols = []; for (let k = 0; k < n; k++) cols.push(f(unit(k))); for (let i = 0; i < n; i++) rows.push(cols.map((c, k) => c[i] - (i === k ? 1 : 0))); };
    (o.permutations || []).forEach(p => add(e => permuter(e, p)));
    (o.symetries || []).forEach(Q => add(e => tourner(e, Q)));
    return n - rangMatrice(rows, n, 1e-9);
  }
  const VOIGT = [[0, 0], [1, 1], [2, 2], [1, 2], [0, 2], [0, 1]];
  function youngDirection(C, n) {
    if (rangDe(C) !== 4) err("youngDirection : C de rang 4");
    const l = Math.hypot(...vec(n, "n")); if (!(l > 0)) err("direction nulle");
    const u = n.map(x => x / l);
    const M = VOIGT.map(([i, j]) => VOIGT.map(([k, m]) => at4(C, i, j, k, m) * (k === m ? 1 : 2)));   // σ_V = M (ε11, ε22, ε33, ε23, ε13, ε12)
    const b = VOIGT.map(([i, j]) => u[i] * u[j]);                                                  // uniaxial stress 1 Pa along u
    const A = M.map((r, i) => r.concat(b[i]));                                                     // Gauss–Jordan
    for (let c = 0; c < 6; c++) {
      let p = c; for (let i = c + 1; i < 6; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
      if (!(Math.abs(A[p][c]) > 1e-12 * Math.abs(A[0][0] || 1))) err("tenseur d'élasticité non inversible");
      [A[c], A[p]] = [A[p], A[c]];
      for (let i = 0; i < 6; i++) if (i !== c) { const f = A[i][c] / A[c][c]; for (let j = c; j < 7; j++) A[i][j] -= f * A[c][j]; }
    }
    const e = A.map((r, i) => r[6] / r[i]);
    const eps = [[e[0], e[5], e[4]], [e[5], e[1], e[3]], [e[4], e[3], e[2]]];
    return 1 / quadratique(eps, u);
  }

  const api = Object.freeze({
    mat, identite, diag, transposee, produit, somme, appliquer, quadratique, scalaire, vectoriel, angle, trace, det, ecartSymetrie, norme,
    rotation, estRotation, changementBase, propres, depuisPropres, ellipsoide,
    inertiePoints, inertiePave, huygens, momentAxe, energieRotation,
    produitTensoriel, exterieur, dual, matriceProduit, partieSymetrique, partieAntisymetrique, composantesIndependantes,
    estOrthogonale, changementBaseOrthogonal,
    vecteurContrainte, normaleTangentielle, hydrostatique, moyenne, deviateur, vonMises, tresca, plan, facette, mohr, critereEC3,
    tenseur, isotrope4, lame, cubique4, contracter, energieElastique, tourner, permuter, constantesLibres, youngDirection,
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Tenseurs = api;
})(typeof self !== "undefined" ? self : this);

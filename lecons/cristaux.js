/* Cristaux — lattice and motif, bonds, growth, symmetries (Feynman II.30). Pure, no DOM, UMD (global Cristaux).
   SI throughout (m, kg, J, kg·m⁻³). Shared by the steps « Cristaux » (cristaux-1: II.30.1–5, cristaux-2: II.30.6–9):
   extend here, do not copy. Rotations in 3D come from public/tenseurs.js, constants from public/constantes.js.

   Vocabulary. Réseau (lattice): the set of nœuds (nodes) i a + j b (+ k c), a purely geometric set of points. Motif (basis):
   the group of atoms attached to every node. Crystal = réseau + motif. Maille (cell): a parallelogram (parallelepiped) that
   paves space by the lattice translations; primitive if it holds one node.

   Plane lattices (II.30.4–5); vectors are [x, y]
     reseau2D(a, b)            checks a, b finite and not collinear; returns { a, b, aire } (aire = |a × b|, area of the
                               primitive cell).
     noeuds2D(a, b, R)         nodes i a + j b within distance R of the origin, [{ i, j, x, y }], sorted by distance.
     reduire2D(a, b)           Lagrange–Gauss reduction: same lattice, shortest basis, |a| ≤ |b|, |a·b| ≤ |a|²/2.
     bravais2D(a, b, tol)      { type, a, b } with type in BRAVAIS2D ids, from the reduced basis; tol relative (1e-6).
     BRAVAIS2D                 the 5 plane Bravais lattices: [{ id, a, b, rotations: highest order, miroirs }].
     rot2(theta), miroir2(phi) 2 × 2 rotation by theta; reflection across the line at angle phi.
     estSymetrie2D(a, b, M, tol)   M maps the lattice onto itself: M a and M b are integer combinations of a and b.
     ordresRotation2D(a, b, nmax)  orders n ≤ nmax (12) such that the rotation by 2π/n about a node maps the lattice.
     rotationCompatible(n)     2 cos(2π/n) is an integer: the trace of the rotation written on a lattice basis.
     preuveRotation(n)         the two-node argument: nodes A, B at distance 1; turn B about A by θ = 2π/n and A about B by
                               −θ; the two images lie on a line parallel to AB at distance |1 − 2 cos θ|, which must be an
                               integer (0 included). Returns { theta, ecart, entier }.
     symetriesMotif(points, nmax, tol)   points [{ x, y, e }] about the origin: { rotations: [n…], miroirs: [phi…] } that
                               leave the motif (species e included) unchanged. phi in [0, π). Mirror lines are sought
                               through the points and between pairs of points (and along x, y): a lone point at the origin,
                               which has every line, returns only those two.
     rangee2D(a, b, p, q)      the row of nodes along p a + q b (p, q coprime integers): { periode: |p a + q b|, densite:
                               nodes per metre along the row, espacement: distance between neighbouring parallel rows =
                               aire/|p a + q b| }. The densest rows are the farthest apart.
     symetriesCristal(a, b, points, nmax)   rotations about a node and mirror lines through it that map the infinite
                               crystal (the motif repeated on every node) onto itself: a symmetry of the lattice, under
                               which every atom lands on an atom of its species up to a lattice translation. So a motif
                               less symmetric than the crystal (graphene: two atoms) is handled. Throws if two atoms of
                               the motif differ by a lattice translation (the same atom twice).
     invariant2D(a, b, points, M, tol)     M (2 × 2, about the node) maps every atom onto an atom of the same species, up
                               to a translation of the lattice.
   Bonds (II.30.2)
     madelung1D(N)             alternating chain ±, distance r0: 2 Σ_{k=1}^{N} (−1)^{k+1}/k → 2 ln 2.
     madelungNaCl(n)           Evjen sum over the cube |i|, |j|, |k| ≤ n (charges on faces, edges, corners shared):
                               → 1,747 565 (rock salt, reference length r0 = a/2).
     energiePaire(r, alpha, r0, nBorn)   energy of one ion pair of charges ±e in the crystal (J): −α e²/(4π ε0 r) + B/rⁿ,
                               B set so that the minimum is at r0.
     energieReticulaire(alpha, r0, nBorn)   Born–Landé: N_A α e²/(4π ε0 r0) (1 − 1/n), J·mol⁻¹ (positive: energy to pull
                               the ions apart).
   Growth (II.30.3)
     couplage(epsilon, T)      J = ε/(k_B T): energy of one bond against the thermal energy, a pure number.
     croissance(n, J, rng)     grows n atoms on a square lattice from one seed. Each step tries random empty sites next to
                               the crystal; a site with k occupied neighbours keeps the atom with probability exp(J (k − 4)).
                               J = 0: every contact sticks (rough blob); J large: an atom stays where it has many neighbours
                               (flat faces). Returns { sites: [[i, j]…] } in the order of arrival.
     remplissage(sites)        occupied sites / area of their bounding box: 1 for a full rectangle.
   Structures in 3D (II.30.2, II.30.4)
     cubique(type, a, e)       one species e on a cubic lattice, type "cp" (simple), "cc" (body-centred) or "cfc" (face-centred),
                               edge a: a structure as below.
     STRUCTURES                { NaCl, Cu, diamant }: { reseau, a (m), motif [{ e, f: fractional coords in the conventional
                               cubic cell }], formule (formula units per cell) }. Every atom of the cell is in the motif.
     MASSES_MOLAIRES           kg·mol⁻¹ (IUPAC standard atomic weights, abridged).
     atomes(s, n)              atoms of n × n × n conventional cells, faces included: [{ e, k: index in the motif, r: [x, y, z] (m) }].
     voisins(s, e)             { d, z }: nearest-neighbour distance (m) and coordination of a species e (any species).
     masseVolumique(s)         Σ M / (N_A a³), kg·m⁻³.
     compacite(s)              one species, spheres of radius d/2 touching: fraction of space filled.
     invariant3D(s, R, tol)    R (3 × 3, about the origin, an atom) maps the infinite crystal onto itself.
   Close packing (II.30.4): equal spheres of diameter d, compact layers A, B, C stacked along z
     couche(lettre, n, d)      the n × n spheres of a compact (triangular) layer at position A, B or C, z = 0: [[x, y, 0]…].
     empilement(seq, n, d)     layers seq ("ABC…", "AB…", repeated as written) stacked at height d √(2/3) each: [{ couche, r }].
     compaciteEmpilement()     fraction of space filled by any stacking of compact layers: π/√18, whatever the order.
     coquilles(points, centre, rmax, tol)   neighbour shells of the point centre: [{ d, z }] sorted, up to rmax. ABC gives the
                               fcc shells (12 at d, 6 at d √2, 24 at d √3); AB gives 12, 6, then 2 at d √(8/3), which fcc has not.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Tens = node ? require("../tenseurs.js") : root.Tenseurs;
  const err = m => { throw new Error("cristaux: " + m); };
  const num = (x, name) => { if (typeof x !== "number" || !isFinite(x)) err(name + " doit être un nombre fini"); return x; };
  const v2 = (v, name) => { if (!Array.isArray(v) || v.length !== 2) err(name + " doit être un vecteur [x, y]"); num(v[0], name + "[0]"); num(v[1], name + "[1]"); return v; };
  const dot2 = (u, v) => u[0] * v[0] + u[1] * v[1];
  const cross2 = (u, v) => u[0] * v[1] - u[1] * v[0];
  const n2 = u => Math.hypot(u[0], u[1]);
  const apply2 = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];

  /* ---------- plane lattices ---------- */
  function reseau2D(a, b) {
    v2(a, "a"); v2(b, "b");
    const aire = Math.abs(cross2(a, b)), s = n2(a) * n2(b);
    if (!(s > 0) || aire <= 1e-12 * s) err("a et b doivent être non nuls et non colinéaires : sinon ce n'est pas un réseau plan");
    return { a, b, aire };
  }
  function noeuds2D(a, b, R) {
    const { aire } = reseau2D(a, b); num(R, "R"); if (R < 0) err("R doit être positif");
    // |i| ≤ R |b| / aire (distance of a node to the line of b is |i| aire/|b|)
    const imax = Math.ceil(R * n2(b) / aire) + 1, jmax = Math.ceil(R * n2(a) / aire) + 1, out = [];
    if (imax * jmax > 4e6) err("trop de nœuds : R trop grand devant la maille");
    for (let i = -imax; i <= imax; i++) for (let j = -jmax; j <= jmax; j++) {
      const x = i * a[0] + j * b[0], y = i * a[1] + j * b[1];
      if (Math.hypot(x, y) <= R * (1 + 1e-12)) out.push({ i, j, x, y });
    }
    return out.sort((p, q) => Math.hypot(p.x, p.y) - Math.hypot(q.x, q.y));
  }
  function reduire2D(a, b) {
    reseau2D(a, b);
    let u = a.slice(), v = b.slice();
    if (n2(u) > n2(v)) [u, v] = [v, u];
    for (let it = 0; it < 1000; it++) {
      const m = Math.round(dot2(u, v) / dot2(u, u));
      v = [v[0] - m * u[0], v[1] - m * u[1]];
      if (n2(v) >= n2(u) * (1 - 1e-14)) return { a: u, b: v };
      [u, v] = [v, u];
    }
    err("réduction non terminée");
  }
  const BRAVAIS2D = Object.freeze([
    { id: "oblique", a: [1, 0], b: [0.35, 0.85], rotations: 2, miroirs: 0 },
    { id: "rectangulaire", a: [1, 0], b: [0, 1.5], rotations: 2, miroirs: 2 },
    { id: "rectangulaire-centre", a: [1, 0], b: [0.5, 1.2], rotations: 2, miroirs: 2 },
    { id: "carre", a: [1, 0], b: [0, 1], rotations: 4, miroirs: 4 },
    { id: "hexagonal", a: [1, 0], b: [0.5, Math.sqrt(3) / 2], rotations: 6, miroirs: 6 },
  ].map(Object.freeze));
  function bravais2D(a, b, tol) {
    tol = tol === undefined ? 1e-6 : num(tol, "tol");
    const r = reduire2D(a, b), la = n2(r.a), lb = n2(r.b), p = dot2(r.a, r.b) / (la * la);   // |p| ≤ 1/2
    const egal = Math.abs(lb - la) <= tol * la, droit = Math.abs(p) <= tol, demi = Math.abs(Math.abs(p) - 0.5) <= tol;
    let type;
    if (egal && droit) type = "carre";
    else if (egal && demi) type = "hexagonal";
    else if (droit) type = "rectangulaire";
    else if (egal || demi) type = "rectangulaire-centre";   // rhombic cell, or b − a/2 ⟂ a
    else type = "oblique";
    return { type, a: r.a, b: r.b };
  }
  const rot2 = theta => { num(theta, "theta"); const c = Math.cos(theta), s = Math.sin(theta); return [[c, -s], [s, c]]; };
  const miroir2 = phi => { num(phi, "phi"); const c = Math.cos(2 * phi), s = Math.sin(2 * phi); return [[c, s], [s, -c]]; };
  function coords(a, b, v) {   // v = x a + y b
    const d = cross2(a, b);
    return [cross2(v, b) / d, cross2(a, v) / d];
  }
  function estSymetrie2D(a, b, M, tol) {
    reseau2D(a, b); tol = tol === undefined ? 1e-7 : tol;
    if (!Array.isArray(M) || M.length !== 2 || M.some(r => !Array.isArray(r) || r.length !== 2)) err("M doit être une matrice 2 × 2");
    M.forEach((r, i) => r.forEach((x, j) => num(x, "M[" + i + "][" + j + "]")));
    return [a, b].every(v => coords(a, b, apply2(M, v)).every(c => Math.abs(c - Math.round(c)) <= tol));
  }
  function ordresRotation2D(a, b, nmax) {
    nmax = nmax === undefined ? 12 : nmax;
    const out = [];
    for (let n = 1; n <= nmax; n++) if (estSymetrie2D(a, b, rot2(2 * Math.PI / n))) out.push(n);
    return out;
  }
  function rotationCompatible(n) {
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
    const t = 2 * Math.cos(2 * Math.PI / n);
    return Math.abs(t - Math.round(t)) < 1e-9;
  }
  function preuveRotation(n) {
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
    const theta = 2 * Math.PI / n, A = [0, 0], B = [1, 0];
    const A2 = apply2(rot2(theta), B);                           // B turned about A by +θ
    const B2 = [B[0] + apply2(rot2(-theta), [A[0] - B[0], A[1] - B[1]])[0], apply2(rot2(-theta), [A[0] - B[0], A[1] - B[1]])[1]];  // A turned about B by −θ
    const ecart = Math.abs(B2[0] - A2[0]);                       // A2 and B2 have the same y: the segment is parallel to AB
    return { theta, ecart, entier: Math.abs(ecart - Math.round(ecart)) < 1e-9, A2, B2 };
  }
  const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
  function rangee2D(a, b, p, q) {
    const { aire } = reseau2D(a, b);
    if (!Number.isInteger(p) || !Number.isInteger(q) || (!p && !q)) err("p et q doivent être des entiers non tous deux nuls");
    if (pgcd(p, q) !== 1) err("p et q doivent être premiers entre eux : sinon la période est un nœud plus loin");
    const periode = Math.hypot(p * a[0] + q * b[0], p * a[1] + q * b[1]);
    return { periode, densite: 1 / periode, espacement: aire / periode };
  }
  function pts(points) {
    if (!Array.isArray(points) || !points.length) err("le motif doit contenir au moins un point");
    points.forEach((p, k) => { num(p.x, "points[" + k + "].x"); num(p.y, "points[" + k + "].y"); });
    return points;
  }
  function inv(points, M, tol) {
    return points.every(p => { const q = apply2(M, [p.x, p.y]);
      return points.some(r => r.e === p.e && Math.hypot(r.x - q[0], r.y - q[1]) <= tol); });
  }
  function symetriesMotif(points, nmax, tol, extra) {
    pts(points); nmax = nmax === undefined ? 12 : nmax;
    const size = Math.max(1e-300, ...points.map(p => Math.hypot(p.x, p.y)));
    tol = (tol === undefined ? 1e-7 : tol) * size;
    const rotations = [];
    for (let n = 1; n <= nmax; n++) if (inv(points, rot2(2 * Math.PI / n), tol)) rotations.push(n);
    // candidate mirror lines: through the origin and a point, or bisecting two points at the same distance
    const cand = [0, Math.PI / 2].concat(extra || []);
    points.forEach(p => { if (Math.hypot(p.x, p.y) > tol) cand.push(Math.atan2(p.y, p.x)); });
    points.forEach(p => points.forEach(q => { if (p !== q) cand.push((Math.atan2(p.y, p.x) + Math.atan2(q.y, q.x)) / 2); }));
    const miroirs = [];
    cand.map(f => ((f % Math.PI) + Math.PI) % Math.PI).forEach(f => {
      if (miroirs.some(g => Math.abs(g - f) < 1e-7 || Math.abs(Math.abs(g - f) - Math.PI) < 1e-7)) return;
      if (inv(points, miroir2(f), tol)) miroirs.push(f);
    });
    return { rotations, miroirs: miroirs.sort((x, y) => x - y) };
  }
  const entiers = (a, b, v, tol) => coords(a, b, v).every(c => Math.abs(c - Math.round(c)) <= tol);
  function distincts(a, b, points) {
    points.forEach((p, i) => points.forEach((q, j) => {
      if (j > i && entiers(a, b, [q.x - p.x, q.y - p.y], 1e-7)) err("deux atomes du motif se superposent dans le cristal : ils diffèrent d'une translation du réseau");
    }));
  }
  function invariant2D(a, b, points, M, tol) {
    reseau2D(a, b); pts(points); tol = tol === undefined ? 1e-7 : tol;
    return points.every(p => { const q = apply2(M, [p.x, p.y]);
      return points.some(r => r.e === p.e && entiers(a, b, [q[0] - r.x, q[1] - r.y], tol)); });
  }
  function symetriesCristal(a, b, points, nmax) {
    reseau2D(a, b); pts(points); distincts(a, b, points); nmax = nmax === undefined ? 12 : nmax;
    const garde = M => estSymetrie2D(a, b, M) && invariant2D(a, b, points, M);
    const rotations = [];
    for (let n = 1; n <= nmax; n++) if (garde(rot2(2 * Math.PI / n))) rotations.push(n);
    // a mirror of the lattice through a node maps a basis vector v to Mv, so v + Mv (|v + Mv| ≤ 2|v|) is a node on the
    // mirror line, or Mv = −v and v − Mv is: every mirror line carries a row of short nodes
    const r = reduire2D(a, b), miroirs = [];
    noeuds2D(r.a, r.b, 3 * n2(r.b)).slice(1).forEach(p => {
      const f = ((Math.atan2(p.y, p.x) % Math.PI) + Math.PI) % Math.PI;
      if (miroirs.some(g => Math.abs(g - f) < 1e-9 || Math.abs(Math.abs(g - f) - Math.PI) < 1e-9)) return;
      if (garde(miroir2(f))) miroirs.push(f);
    });
    return { rotations, miroirs: miroirs.sort((x, y) => x - y) };
  }
  // Growth (II.30.3): J = ε/(k_B T) compares the energy of one bond to the thermal energy
  function couplage(epsilon, T) {
    num(epsilon, "epsilon"); num(T, "T"); if (!(T > 0)) err("T doit être positive (kelvins)"); if (!(epsilon >= 0)) err("epsilon doit être positive ou nulle");
    return epsilon / (Cst.k_B * T);
  }

  /* ---------- bonds ---------- */
  function madelung1D(N) {
    if (!Number.isInteger(N) || N < 1) err("N doit être un entier ≥ 1");
    let s = 0; for (let k = 1; k <= N; k++) s += (k % 2 ? 1 : -1) / k;
    return 2 * s;
  }
  function madelungNaCl(n) {
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
    let s = 0;
    for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) for (let k = -n; k <= n; k++) {
      if (!i && !j && !k) continue;
      const w = (Math.abs(i) === n ? 0.5 : 1) * (Math.abs(j) === n ? 0.5 : 1) * (Math.abs(k) === n ? 0.5 : 1);  // Evjen weights
      s -= w * ((i + j + k) % 2 ? -1 : 1) / Math.sqrt(i * i + j * j + k * k);   // same sign as the central ion: repels
    }
    return s;
  }
  const kC = () => Cst.e * Cst.e / (4 * Math.PI * Cst.eps0);
  function bornArgs(alpha, r0, nBorn) {
    num(alpha, "alpha"); num(r0, "r0"); num(nBorn, "nBorn");
    if (!(alpha > 0 && r0 > 0)) err("alpha et r0 doivent être positifs");
    if (!(nBorn > 1)) err("l'exposant de Born doit dépasser 1 : sinon pas de minimum");
  }
  function energiePaire(r, alpha, r0, nBorn) {
    num(r, "r"); bornArgs(alpha, r0, nBorn); if (!(r > 0)) err("r doit être positif");
    const A = alpha * kC(), B = A * Math.pow(r0, nBorn - 1) / nBorn;   // dE/dr = 0 at r0
    return -A / r + B / Math.pow(r, nBorn);
  }
  function energieReticulaire(alpha, r0, nBorn) {
    bornArgs(alpha, r0, nBorn);
    return Cst.N_A * alpha * kC() / r0 * (1 - 1 / nBorn);
  }

  /* ---------- growth ---------- */
  function croissance(n, J, rng) {
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1"); num(J, "J");
    if (typeof rng !== "function") err("rng doit être une fonction qui rend un nombre de [0, 1)");
    // Same law as « try a random front site, keep it with probability exp(J (k − 4)) », without the rejected tries:
    // the front is sorted by k into buckets, a bucket is drawn with weight (size × exp(J (k − 4))), then a site in it.
    const key = (i, j) => i + "," + j, occ = new Set([key(0, 0)]), sites = [[0, 0]], N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const kOf = new Map(), pos = new Map(), bucket = [[], [], [], [], []], w = [0, 1, 2, 3, 4].map(k => Math.exp(J * (k - 4)));
    const out = q => { const k = kOf.get(q), b = bucket[k], i = pos.get(q), last = b.pop();
      if (last[2] !== q) { b[i] = last; pos.set(last[2], i); } pos.delete(q); kOf.delete(q); return k; };
    const put = (q, i, j, k) => { kOf.set(q, k); pos.set(q, bucket[k].length); bucket[k].push([i, j, q]); };
    const grow = (i, j) => N4.forEach(([di, dj]) => { const a = i + di, b = j + dj, q = key(a, b); if (occ.has(q)) return;
      put(q, a, b, kOf.has(q) ? out(q) + 1 : 1); });
    grow(0, 0);
    while (sites.length < n) {
      let tot = 0; for (let k = 1; k <= 4; k++) tot += bucket[k].length * w[k];
      let x = rng() * tot, k = 1;
      while (k < 4 && x >= bucket[k].length * w[k]) { x -= bucket[k].length * w[k]; k++; }
      while (!bucket[k].length) k--;
      const [i, j, q] = bucket[k][Math.min(bucket[k].length - 1, Math.floor(rng() * bucket[k].length))];
      out(q); occ.add(q); sites.push([i, j]); grow(i, j);
    }
    return { sites };
  }
  function remplissage(sites) {
    if (!Array.isArray(sites) || !sites.length) err("aucun site");
    const is = sites.map(s => s[0]), js = sites.map(s => s[1]);
    return sites.length / ((Math.max(...is) - Math.min(...is) + 1) * (Math.max(...js) - Math.min(...js) + 1));
  }

  /* ---------- 3D structures ---------- */
  const CFC = [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]];
  const CUBES = { cp: [[0, 0, 0]], cc: [[0, 0, 0], [0.5, 0.5, 0.5]], cfc: CFC };
  function cubique(type, a, e) {
    if (!CUBES[type]) err("type de réseau cubique inconnu : « " + type + " » (cp, cc ou cfc)");
    num(a, "a"); if (!(a > 0)) err("a doit être positif");
    return { reseau: type, a, formule: CUBES[type].length, motif: CUBES[type].map(f => ({ e: e || "X", f })) };
  }
  const shift = (f, d) => f.map((x, i) => x + d[i]);
  const STRUCTURES = Object.freeze({
    // NaCl: a = 5,640 Å (AIST Nomura database, Fm-3m); Cu: 361,49 pm (WebElements, Fm-3m);
    // diamond: 3,5668 Å (Straumanis & Aka 1951, COD 9012299, Fd-3m)
    NaCl: { reseau: "cfc", a: 5.640e-10, formule: 4,
      motif: CFC.map(f => ({ e: "Na", f })).concat(CFC.map(f => ({ e: "Cl", f: shift(f, [0.5, 0.5, 0.5]).map(x => x % 1) }))) },
    Cu: cubique("cfc", 3.6149e-10, "Cu"),
    diamant: { reseau: "cfc", a: 3.5668e-10, formule: 8,
      motif: CFC.map(f => ({ e: "C", f })).concat(CFC.map(f => ({ e: "C", f: shift(f, [0.25, 0.25, 0.25]) }))) },
  });
  const MASSES_MOLAIRES = Object.freeze({ Na: 22.98976928e-3, Cl: 35.45e-3, Cu: 63.546e-3, C: 12.011e-3 });
  const struct = s => { if (!s || !Array.isArray(s.motif) || !(s.a > 0)) err("structure invalide : il faut { a, motif }"); return s; };
  function atomes(s, n) {
    struct(s); if (!Number.isInteger(n) || n < 1 || n > 12) err("n doit être un entier de 1 à 12");
    const out = [];
    for (let i = -1; i <= n; i++) for (let j = -1; j <= n; j++) for (let k = -1; k <= n; k++) s.motif.forEach((m, im) => {
      const f = [m.f[0] + i, m.f[1] + j, m.f[2] + k];
      if (f.every(x => x >= -1e-9 && x <= n + 1e-9)) out.push({ e: m.e, k: im, r: f.map(x => x * s.a) });
    });
    return out;
  }
  function voisins(s, e) {
    struct(s); const c = s.motif.find(m => m.e === e); if (!c) err("aucun atome « " + e + " » dans le motif");
    let d = Infinity, z = 0;
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) s.motif.forEach(m => {
      const r = Math.hypot(m.f[0] + i - c.f[0], m.f[1] + j - c.f[1], m.f[2] + k - c.f[2]) * s.a;
      if (r < 1e-9 * s.a) return;
      if (r < d * (1 - 1e-9)) { d = r; z = 1; } else if (r <= d * (1 + 1e-9)) z++;
    });
    return { d, z };
  }
  function masseVolumique(s) {
    struct(s);
    const M = s.motif.reduce((t, m) => { const x = MASSES_MOLAIRES[m.e]; if (!x) err("masse molaire inconnue : " + m.e); return t + x; }, 0);
    return M / (Cst.N_A * Math.pow(s.a, 3));
  }
  function compacite(s) {
    struct(s); const es = new Set(s.motif.map(m => m.e)); if (es.size !== 1) err("compacité définie ici pour une seule espèce");
    const { d } = voisins(s, s.motif[0].e);
    return s.motif.length * 4 / 3 * Math.PI * Math.pow(d / 2, 3) / Math.pow(s.a, 3);
  }
  function invariant3D(s, R, tol) {
    struct(s); Tens.mat(R, "R"); tol = tol === undefined ? 1e-7 : tol;
    const frac = x => x - Math.floor(x + tol);
    return s.motif.every(m => { const q = Tens.appliquer(R, m.f).map(frac);
      return s.motif.some(p => p.e === m.e && p.f.every((x, i) => { const d = Math.abs(frac(x) - q[i]); return d <= tol || Math.abs(d - 1) <= tol; })); });
  }

  const DECALAGE = { A: 0, B: 1, C: 2 };
  function couche(lettre, n, d) {
    if (!(lettre in DECALAGE)) err("couche A, B ou C, pas « " + lettre + " »");
    if (!Number.isInteger(n) || n < 1 || n > 40) err("n doit être un entier de 1 à 40"); num(d, "d"); if (!(d > 0)) err("d doit être positif");
    const k = DECALAGE[lettre], out = [];   // B and C sit over the hollows of A: shift (a1 + a2)/3 and 2(a1 + a2)/3
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
      out.push([(i + j / 2 + k / 2) * d, (j + k / 3) * d * Math.sqrt(3) / 2, 0]);
    return out;
  }
  function empilement(seq, n, d) {
    if (typeof seq !== "string" || !/^[ABC]+$/.test(seq)) err("la séquence ne contient que A, B, C");
    for (let i = 1; i < seq.length; i++) if (seq[i] === seq[i - 1]) err("deux couches " + seq[i] + " de suite : une sphère poserait sur une sphère, pas dans un creux");
    const h = d * Math.sqrt(2 / 3), out = [];
    [...seq].forEach((c, z) => couche(c, n, d).forEach(r => out.push({ couche: c, r: [r[0], r[1], z * h] })));
    return out;
  }
  // any stacking of compact layers (ABC, AB, ABAC…): one sphere of diameter d per (√3/2) d² × d √(2/3)
  const compaciteEmpilement = () => Math.PI / 6 / (Math.sqrt(3) / 2 * Math.sqrt(2 / 3));
  function coquilles(points, centre, rmax, tol) {
    num(rmax, "rmax"); tol = tol === undefined ? 1e-6 : tol;
    const ds = points.map(p => Math.hypot(p[0] - centre[0], p[1] - centre[1], p[2] - centre[2])).filter(x => x > tol * rmax && x <= rmax * (1 + tol)).sort((x, y) => x - y);
    const out = [];
    ds.forEach(x => { const last = out[out.length - 1]; if (last && x - last.d <= tol * rmax) last.z++; else out.push({ d: x, z: 1 }); });
    return out;
  }

  /* ================= cristaux-2 : lattices in space, strength, dislocations, bubble raft (II.30.6–9) ================= */
  const v3 = (v, name) => { if (!Array.isArray(v) || v.length !== 3) err(name + " doit être un vecteur [x, y, z]"); v.forEach((x, k) => num(x, name + "[" + k + "]")); return v; };
  const dot3 = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const add3 = (u, v, k) => [u[0] + k * v[0], u[1] + k * v[1], u[2] + k * v[2]];
  const n3 = u => Math.hypot(u[0], u[1], u[2]);
  const cross3 = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const det3 = (a, b, c) => dot3(a, cross3(b, c));
  function base3(B) {
    if (!Array.isArray(B) || B.length !== 3) err("une base est [a, b, c]");
    B.forEach((v, k) => v3(v, "abc"[k]));
    const V = Math.abs(det3(B[0], B[1], B[2])), s = n3(B[0]) * n3(B[1]) * n3(B[2]);
    if (!(s > 0) || V <= 1e-9 * s) err("a, b, c doivent être non nuls et non coplanaires : sinon ce n'est pas un réseau");
    return V;
  }
  const volumeMaille = B => base3(B);
  function coords3(B, v) { const D = det3(B[0], B[1], B[2]); return [det3(v, B[1], B[2]) / D, det3(B[0], v, B[2]) / D, det3(B[0], B[1], v) / D]; }
  const estNoeud3D = (B, v, tol) => coords3(B, v).every(x => Math.abs(x - Math.round(x)) < (tol === undefined ? 1e-6 : tol));

  const SYSTEMES = Object.freeze([
    { id: "triclinique", ordre: 2 }, { id: "monoclinique", ordre: 4 }, { id: "orthorhombique", ordre: 8 },
    { id: "tetragonal", ordre: 16 }, { id: "trigonal", ordre: 12 }, { id: "hexagonal", ordre: 24 }, { id: "cubique", ordre: 48 },
  ].map(Object.freeze));
  const BRAVAIS3D = Object.freeze([
    ["aP", "triclinique", "P"], ["mP", "monoclinique", "P"], ["mC", "monoclinique", "C"],
    ["oP", "orthorhombique", "P"], ["oC", "orthorhombique", "C"], ["oI", "orthorhombique", "I"], ["oF", "orthorhombique", "F"],
    ["tP", "tetragonal", "P"], ["tI", "tetragonal", "I"], ["hR", "trigonal", "P"], ["hP", "hexagonal", "P"],
    ["cP", "cubique", "P"], ["cI", "cubique", "I"], ["cF", "cubique", "F"],
  ].map(([id, systeme, centrage]) => Object.freeze({ id, systeme, centrage })));
  const CENTRAGES = Object.freeze({
    P: [[0, 0, 0]], C: [[0, 0, 0], [0.5, 0.5, 0]], I: [[0, 0, 0], [0.5, 0.5, 0.5]],
    F: [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]],
  });
  const DEG = Math.PI / 180;
  function maille3D(systeme, p) {
    if (!SYSTEMES.some(s => s.id === systeme)) err("système inconnu : " + systeme);
    p = p || {};
    let { a, b, c, alpha, beta, gamma } = Object.assign({ b: p.a, c: p.a, alpha: 90, beta: 90, gamma: 90 }, p);
    num(a, "a");
    if (systeme === "cubique") { b = c = a; alpha = beta = gamma = 90; }
    else if (systeme === "tetragonal") { b = a; alpha = beta = gamma = 90; }
    else if (systeme === "orthorhombique") alpha = beta = gamma = 90;
    else if (systeme === "hexagonal") { b = a; alpha = beta = 90; gamma = 120; }
    else if (systeme === "trigonal") { b = c = a; beta = gamma = alpha; }
    else if (systeme === "monoclinique") alpha = gamma = 90;
    [b, c, alpha, beta, gamma].forEach((x, k) => num(x, ["b", "c", "alpha", "beta", "gamma"][k]));
    if (!(a > 0 && b > 0 && c > 0)) err("a, b, c positifs");
    const ca = Math.cos(alpha * DEG), cb = Math.cos(beta * DEG), cg = Math.cos(gamma * DEG), sg = Math.sin(gamma * DEG);
    const cy = (ca - cb * cg) / sg, cz2 = 1 - cb * cb - cy * cy;
    if (!(cz2 > 1e-12) || !(sg > 1e-12)) err("ces trois angles ne ferment pas une maille");
    const B = [[a, 0, 0], [b * cg, b * sg, 0], [c * cb, c * cy, c * Math.sqrt(cz2)]].map(v => v.map(x => (Math.abs(x) < 1e-15 * a ? 0 : x)));
    base3(B);
    return B;
  }
  function primitifs(B, centrage) {
    base3(B);
    const [A, Bv, C] = B, h = v => v.map(x => x / 2), s = (...vs) => vs.reduce((u, v) => add3(u, v, 1));
    const neg = v => v.map(x => -x);
    switch (centrage) {
      case "P": return B.map(v => v.slice());
      case "C": return [h(add3(A, Bv, -1)), h(add3(A, Bv, 1)), C.slice()];
      case "I": return [h(s(neg(A), Bv, C)), h(s(A, neg(Bv), C)), h(s(A, Bv, neg(C)))];
      case "F": return [h(add3(Bv, C, 1)), h(add3(A, C, 1)), h(add3(A, Bv, 1))];
      default: return err("centrage inconnu : " + centrage + " (P, C, I ou F)");
    }
  }
  function noeuds3D(B, centrage, n) {
    base3(B); if (!CENTRAGES[centrage]) err("centrage inconnu : " + centrage);
    if (!Number.isInteger(n) || n < 1 || n > 6) err("n : un entier de 1 à 6");
    const out = [], e = 1e-9;
    for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) for (let k = 0; k <= n; k++) for (const f of CENTRAGES[centrage]) {
      const u = [i + f[0], j + f[1], k + f[2]];
      if (u.some(x => x > n + e)) continue;
      const r = [0, 1, 2].map(q => u[0] * B[0][q] + u[1] * B[1][q] + u[2] * B[2][q]);
      out.push({ r, centre: f.some(x => x > 0) });
    }
    return out;
  }
  function reduire3D(B) {
    base3(B);
    const b = B.map(v => v.slice()), shorter = (w, v) => n3(w) < n3(v) * (1 - 1e-12);
    for (let it = 0; it < 200; it++) {
      let ch = false;
      b.sort((u, v) => n3(u) - n3(v));
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== j) {
        const m = Math.round(dot3(b[i], b[j]) / dot3(b[j], b[j]));
        if (m) { const w = add3(b[i], b[j], -m); if (shorter(w, b[i])) { b[i] = w; ch = true; } }
      }
      for (let i = 0; i < 3; i++) {
        const [j, k] = [0, 1, 2].filter(x => x !== i);
        for (const s of [1, -1]) for (const t of [1, -1]) { const w = add3(add3(b[i], b[j], s), b[k], t); if (shorter(w, b[i])) { b[i] = w; ch = true; } }
      }
      if (!ch) break;
    }
    b.sort((u, v) => n3(u) - n3(v));
    if (det3(b[0], b[1], b[2]) < 0) b[2] = b[2].map(x => -x);
    return b;
  }
  /* every lattice vector of length ≤ rmax (origin excluded): the bound on each integer coordinate is rmax |b_j × b_k| / V */
  function vecteursCourts(B, rmax) {
    const V = base3(B), N = [0, 1, 2].map(i => Math.ceil(rmax * n3(cross3(B[(i + 1) % 3], B[(i + 2) % 3])) / V + 1e-9)), out = [];
    for (let i = -N[0]; i <= N[0]; i++) for (let j = -N[1]; j <= N[1]; j++) for (let k = -N[2]; k <= N[2]; k++) {
      if (!i && !j && !k) continue;
      const v = [0, 1, 2].map(q => i * B[0][q] + j * B[1][q] + k * B[2][q]);
      if (n3(v) <= rmax) out.push(v);
    }
    return out;
  }
  function holoedrie(B, tol) {
    tol = tol === undefined ? 1e-6 : tol;
    const b = reduire3D(B), L = b.map(n3), V = det3(b[0], b[1], b[2]);
    const S = vecteursCourts(b, Math.max(...L) * (1 + tol));
    const cand = L.map(l => S.filter(v => Math.abs(n3(v) - l) <= tol * l));
    const g = (i, j) => dot3(b[i], b[j]), ok = (u, v, i, j) => Math.abs(dot3(u, v) - g(i, j)) <= tol * L[i] * L[j];
    const dual = [0, 1, 2].map(k => cross3(b[(k + 1) % 3], b[(k + 2) % 3]).map(x => x / V));   // rows of the inverse of [b1 b2 b3]
    const out = [];
    for (const v1 of cand[0]) for (const v2 of cand[1]) {
      if (!ok(v1, v2, 0, 1)) continue;
      for (const v3_ of cand[2]) {
        if (!ok(v1, v3_, 0, 2) || !ok(v2, v3_, 1, 2)) continue;
        const W = [v1, v2, v3_];
        out.push([0, 1, 2].map(i => [0, 1, 2].map(j => W[0][i] * dual[0][j] + W[1][i] * dual[1][j] + W[2][i] * dual[2][j])));
      }
    }
    return out;
  }
  const systemeDe = ordre => { const s = SYSTEMES.find(x => x.ordre === ordre); if (!s) err("ordre d'holoédrie impossible : " + ordre); return s.id; };
  function axeRotation(R) {
    const M = R.map((r, i) => r.map((x, j) => x - (i === j ? 1 : 0)));
    let best = null;
    for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) { const c = cross3(M[i], M[j]); if (!best || n3(c) > n3(best)) best = c; }
    const l = n3(best); return best.map(x => x / l);
  }
  const ordreRotation = R => ({ 3: 1, [-1]: 2, 0: 3, 1: 4, 2: 6 })[Math.round(R[0][0] + R[1][1] + R[2][2])];
  function typeBravais(B, tol) {
    tol = tol === undefined ? 1e-6 : tol;
    const H = holoedrie(B, tol), ordre = H.length, systeme = systemeDe(ordre), b = reduire3D(B), Vp = Math.abs(det3(b[0], b[1], b[2]));
    const pick = c => BRAVAIS3D.find(x => x.systeme === systeme && x.centrage === c);
    const res = c => Object.assign({ ordre, conventionnelle: null }, pick(c));
    if (systeme === "triclinique" || systeme === "trigonal" || systeme === "hexagonal") return res("P");
    const S = vecteursCourts(b, 4 * n3(b[2]));
    const along = u => S.filter(v => n3(cross3(v, u)) <= 1e-6 * n3(v)).reduce((m, v) => (!m || n3(v) < n3(m) ? v : m), null);
    const rot = H.filter(R => Tens.det(R) > 0 && ordreRotation(R) > 1).map(R => ({ n: ordreRotation(R), u: axeRotation(R) }));
    const uniques = list => list.filter((x, i) => list.findIndex(y => n3(cross3(x.u, y.u)) < 1e-6) === i);
    if (systeme === "monoclinique") {
      const u = rot.find(x => x.n === 2).u, bb = along(u);
      const perp = S.filter(v => Math.abs(dot3(v, u)) <= 1e-6 * n3(v)).sort((x, y) => n3(x) - n3(y));
      const v1 = perp[0], v2 = perp.find(v => n3(cross3(v1, v)) > 1e-6 * n3(v1) * n3(v));
      const n = Math.round(n3(bb) * n3(cross3(v1, v2)) / Vp);
      return Object.assign(res(n === 1 ? "P" : "C"), { conventionnelle: [v1, bb, v2], noeuds: n });
    }
    let sets;
    if (systeme === "cubique") sets = [uniques(rot.filter(x => x.n === 4)).map(x => x.u)];
    else if (systeme === "orthorhombique") sets = [uniques(rot.filter(x => x.n === 2)).map(x => x.u)];
    else {
      const c = rot.find(x => x.n === 4).u, deux = uniques(rot.filter(x => x.n === 2 && Math.abs(dot3(x.u, c)) < 1e-6)).map(x => x.u);
      sets = deux.map(u => [u, deux.find(w => Math.abs(dot3(w, u)) < 1e-6), c]).filter(s => s[1]);
    }
    let best = null;
    for (const s of sets) {
      const conv = s.map(along), Vc = Math.abs(det3(conv[0], conv[1], conv[2]));
      if (!best || Vc < best.Vc * (1 - 1e-9)) best = { conv, Vc };
    }
    const n = Math.round(best.Vc / Vp), [A, Bv, C] = best.conv, mid = (...vs) => vs.reduce((u, v) => add3(u, v, 1)).map(x => x / 2);
    let c = n === 1 ? "P" : n === 4 ? "F" : estNoeud3D(b, mid(A, Bv, C), 1e-6) ? "I" : "C";
    const r = Object.assign(res(c), { conventionnelle: best.conv, noeuds: n });
    if (!pick(c)) r.id = null;
    return r;
  }
  function composantesInvariantes(H, rang) {
    if (rang === 2) return Tens.constantesLibres(2, { permutations: [[1, 0]], symetries: H });
    if (rang === 4) return Tens.constantesLibres(4, { permutations: [[1, 0, 2, 3], [0, 1, 3, 2], [2, 3, 0, 1]], symetries: H });
    return err("rang 2 (polarisabilité) ou 4 (élasticité)");
  }

  /* ---------- strength of a perfect crystal (II.30.7) ---------- */
  const METAUX = Object.freeze({
    Cu: Object.freeze({ reseau: "cfc", a: 361.49e-12, G: 48e9, cission: 0.65e6 }),   // Dieter: Cu 99,999 %, {111}<110>
    Ag: Object.freeze({ reseau: "cfc", a: 408.53e-12, G: 30e9, cission: 0.48e6 }),   // Dieter: Ag 99,999 %
    Fe: Object.freeze({ reseau: "cc", a: 286.65e-12, G: 82e9, cission: null }),
  });
  const ACIERS = Object.freeze({ S235: 235e6, S275: 275e6, S355: 355e6 });   // EN 10025-2, fy for t ≤ 16 mm
  const G_ACIER = 81e9;                                                         // EN 1993-1-1 §3.2.6
  function glissement(reseau, a) {
    num(a, "a"); if (!(a > 0)) err("a positif");
    if (reseau === "cfc") return { b: a / Math.SQRT2, d: a / Math.sqrt(3), plan: "{111}", direction: "<110>" };
    if (reseau === "cc") return { b: a * Math.sqrt(3) / 2, d: a / Math.SQRT2, plan: "{110}", direction: "<111>" };
    return err("réseau cfc ou cc");
  }
  function cissionTheorique(G, b, d) { [G, b, d].forEach((x, k) => num(x, ["G", "b", "d"][k])); if (!(G > 0 && b > 0 && d > 0)) err("G, b, d positifs"); return G * b / (2 * Math.PI * d); }
  const frenkel = (x, G, b, d) => cissionTheorique(G, b, d) * Math.sin(2 * Math.PI * num(x, "x") / b);
  const cissionLimite = fy => { num(fy, "fy"); if (!(fy > 0)) err("fy positif"); return fy / Math.sqrt(3); };

  /* ---------- a dislocation on one glide plane: the Frenkel–Kontorova chain (II.30.7–8) ----------
     The row just above the glide plane is a chain of atoms joined by springs of rest length b; the row below is a rigid
     sinusoidal substrate. Lengths in units of b, forces per atom in units of the largest substrate force (the theoretical
     strength): U(x) = (1 − cos 2πx)/2π, so that −U′ = −sin 2πx. Spring stiffness k (dimensionless: k b / f_max). */
  function fkChaine(N, dislocation, k) {
    if (!Number.isInteger(N) || N < 4) err("N : un entier ≥ 4"); num(k, "k"); if (!(k > 0)) err("k positif");
    if (!dislocation) return Array.from({ length: N }, (_, i) => i);
    const w = Math.max(0.3, Math.sqrt(k / (2 * Math.PI))), c = N / 2;
    return Array.from({ length: N + 1 }, (_, i) => i - (2 / Math.PI) * Math.atan(Math.exp((i - c) / w)));
  }
  function fkGradient(x, k) {   // ∂E/∂x_i, E = Σ k/2 (x_{i+1} − x_i − 1)² + Σ U(x_i)
    const n = x.length, g = new Array(n);
    for (let i = 0; i < n; i++) {
      let s = Math.sin(2 * Math.PI * x[i]);
      if (i > 0) s += k * (x[i] - x[i - 1] - 1);
      if (i < n - 1) s -= k * (x[i + 1] - x[i] - 1);
      g[i] = s;
    }
    return g;
  }
  const fkEnergie = (x, k) => x.reduce((s, xi, i) => s + (1 - Math.cos(2 * Math.PI * xi)) / (2 * Math.PI) + (i ? k / 2 * (xi - x[i - 1] - 1) ** 2 : 0), 0);
  function fkPas(x, k, F, dt) {   // overdamped motion under a uniform force F per atom: dx/dt = F − ∂E/∂x
    const g = fkGradient(x, k); return x.map((xi, i) => xi + dt * (F - g[i]));
  }
  const fkDt = k => 0.4 / (4 * k + 2 * Math.PI);
  /* position of the dislocation (the kink): where the slip x_i − i crosses −1/2; null without one */
  function fkPosition(x) {
    for (let i = 0; i < x.length - 1; i++) {
      const u0 = x[i] - i + 0.5, u1 = x[i + 1] - i - 1 + 0.5;
      if (u0 >= 0 && u1 < 0) return i + u0 / (u0 - u1);
    }
    return null;
  }
  /* minimum energy with Σ x_i held: projected gradient descent. Returns { x, lambda: mean ∂E/∂x = the uniform force that
     holds this configuration in equilibrium, residu } */
  function fkContraint(x, k, o) {
    o = o || {}; const tol = o.tol || 1e-10, max = o.max || 200000, dt = fkDt(k);
    let y = x.slice(), lam = 0, res = Infinity;
    for (let it = 0; it < max; it++) {
      const g = fkGradient(y, k); lam = g.reduce((s, v) => s + v, 0) / g.length;
      res = 0; for (let i = 0; i < y.length; i++) { const d = g[i] - lam; res = Math.max(res, Math.abs(d)); y[i] -= dt * d; }
      if (res < tol) break;
    }
    return { x: y, lambda: lam, residu: res };
  }
  /* depinning force: the largest uniform force under which the chain still has an equilibrium. Without a dislocation, the
     rigid shift gives exactly 1. With one, sweep the total slip s = Σ(x_i − x_i⁰) over one period (one atom moves by b) and
     keep the largest holding force. */
  function fkSeuil(k, dislocation, o) {
    o = o || {}; const N = o.N || 40, pas = o.pas || 24;
    let x = fkChaine(N, dislocation, k);
    if (!dislocation) { let m = 0; for (let j = 0; j <= pas; j++) m = Math.max(m, fkContraint(x.map(v => v + j / (2 * pas)), k).lambda); return m; }
    x = fkContraint(x, k).x;
    const p0 = fkPosition(x);
    let m = 0;
    for (let j = 1; j <= pas * x.length; j++) {   // until the dislocation has moved on by one site: the path repeats
      const r = fkContraint(x.map(v => v + 1 / (pas * x.length)), k); x = r.x; m = Math.max(m, r.lambda);
      const p = fkPosition(x);
      if (p === null || p >= p0 + 1) break;
    }
    return m;
  }

  /* ---------- the bubble raft (II.30.9): equal bubbles on a plane ----------
     Pair force from a Morse potential V = D[(1 − e^{−s(r − 1)})² − 1], lengths in bubble diameters, D = 1, shifted so the
     force vanishes at rc = 1,6 (first neighbours only in a triangular raft). s sets the steepness of the repulsion. */
  const RC = 1.6;
  const morseF = (r, s) => 2 * s * Math.exp(-s * (r - 1)) * (1 - Math.exp(-s * (r - 1)));   // V′(r)
  function radeauEquilibre(s) {   // nearest-neighbour distance r* where the shifted force vanishes
    num(s, "s"); if (!(s > 1)) err("raideur s > 1");
    let lo = 1, hi = 1 + Math.LN2 / s; const f = r => morseF(r, s) - morseF(RC, s);   // V′ rises from 0 at r = 1 to its peak at 1 + ln 2/s
    if (!(f(hi) > 0)) err("raideur trop faible : la force ne s'annule pas avant rc");
    for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
    return (lo + hi) / 2;
  }
  function radeauTriangulaire(nx, ny, d) {
    if (!Number.isInteger(nx) || !Number.isInteger(ny) || nx < 2 || ny < 2) err("nx, ny : entiers ≥ 2");
    const out = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) out.push([(i + (j % 2) / 2) * d, j * d * Math.sqrt(3) / 2]);
    return out;
  }
  /* an edge dislocation at (x0, y0), Burgers vector d along x: Volterra displacement of an isotropic plane (ν Poisson ratio) */
  function radeauDislocation(pts, x0, y0, d, nu) {
    nu = nu === undefined ? 1 / 3 : nu;
    return pts.map(([x, y]) => {
      const X = x - x0, Y = y - y0, r2 = X * X + Y * Y || 1e-12, th = Math.atan2(Y, X);
      const ux = d / (2 * Math.PI) * (th + X * Y / (2 * (1 - nu) * r2));
      const uy = -d / (2 * Math.PI) * ((1 - 2 * nu) / (4 * (1 - nu)) * Math.log(r2) + (X * X - Y * Y) / (4 * (1 - nu) * r2));
      return [x + ux, y + uy];
    });
  }
  function grille(pts, h) {
    const m = new Map(), key = (i, j) => i * 100003 + j;
    pts.forEach((p, n) => { const k = key(Math.floor(p[0] / h), Math.floor(p[1] / h)); if (!m.has(k)) m.set(k, []); m.get(k).push(n); });
    return { pres: (p, f) => { const i = Math.floor(p[0] / h), j = Math.floor(p[1] / h);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { const l = m.get(key(i + a, j + b)); if (l) l.forEach(f); } } };
  }
  function radeauForces(pts, s) {
    const f = pts.map(() => [0, 0]), g = grille(pts, RC), fc = morseF(RC, s);
    pts.forEach((p, i) => g.pres(p, j => {
      if (j <= i) return;
      const dx = p[0] - pts[j][0], dy = p[1] - pts[j][1], r = Math.hypot(dx, dy);
      if (r >= RC || r === 0) return;
      const m = -(morseF(r, s) - fc) / r;   // force on i along (p_i − p_j)
      f[i][0] += m * dx; f[i][1] += m * dy; f[j][0] -= m * dx; f[j][1] -= m * dy;
    }));
    return f;
  }
  /* damped dynamics, unit masses. etat = { x: [[x, y]…], v, fixe: [bool…] (pinned bubbles), deplacement: [[dx, dy]…]? } */
  function radeauPas(etat, s, n, o) {
    o = o || {}; const dt = o.dt || 0.12 / s, amort = o.amortissement === undefined ? 0.15 * s : o.amortissement, dmax = 0.02;
    let { x } = etat; const fixe = etat.fixe || [];
    let v = (etat.v || x.map(() => [0, 0])).map(w => w.slice());
    let f = radeauForces(x, s);
    for (let t = 0; t < n; t++) {
      x = x.map((p, i) => {   // a step never moves a bubble by more than dmax: overlapping starts (a stirred raft) stay stable
        if (fixe[i]) return p;
        let dx = dt * v[i][0] + dt * dt / 2 * f[i][0], dy = dt * v[i][1] + dt * dt / 2 * f[i][1]; const l = Math.hypot(dx, dy);
        if (l > dmax) { dx *= dmax / l; dy *= dmax / l; v[i] = [dx / dt, dy / dt]; }
        return [p[0] + dx, p[1] + dy];
      });
      const f2 = radeauForces(x, s), c = 1 / (1 + amort * dt / 2), e = 1 - amort * dt / 2;
      v = v.map((w, i) => (fixe[i] ? [0, 0] : [(w[0] * e + dt / 2 * (f[i][0] + f2[i][0])) * c, (w[1] * e + dt / 2 * (f[i][1] + f2[i][1])) * c]));
      f = f2;
    }
    return { x, v, fixe, forces: f };
  }
  function coordination(pts, rv) {
    rv = rv === undefined ? 1.3 : rv;
    const z = pts.map(() => 0), g = grille(pts, rv);
    pts.forEach((p, i) => g.pres(p, j => { if (j !== i && Math.hypot(p[0] - pts[j][0], p[1] - pts[j][1]) < rv) z[i]++; }));
    return z;
  }
  /* bubbles of the interior (farther than marge from the hull of the raft, approximated by its bounding box) with z ≠ 6 */
  function defauts(pts, marge, rv) {
    const z = coordination(pts, rv), xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const x0 = Math.min(...xs) + marge, x1 = Math.max(...xs) - marge, y0 = Math.min(...ys) + marge, y1 = Math.max(...ys) - marge;
    return pts.map((p, i) => ({ i, z: z[i], p })).filter(q => q.z !== 6 && q.p[0] > x0 && q.p[0] < x1 && q.p[1] > y0 && q.p[1] < y1);
  }
  /* a polycrystalline raft in the box [0, L] × [0, H]: each grain { x, y, angle } fills the region nearer to its centre than
     to any other (Voronoi) with a triangular raft of spacing d turned by angle (radians); bubbles closer than 0,8 d to one
     already placed are dropped, as overlapping bubbles merge in the real raft */
  function radeauPolycristal(L, H, d, grains) {
    [L, H, d].forEach((x, k) => num(x, ["L", "H", "d"][k])); if (!(L > 0 && H > 0 && d > 0)) err("L, H, d positifs");
    if (!Array.isArray(grains) || !grains.length) err("au moins un grain");
    grains.forEach((g, k) => ["x", "y", "angle"].forEach(c => num(g[c], "grain " + k + "." + c)));
    const R = Math.hypot(L, H), out = [], g = new Map(), h = d, key = (i, j) => i * 100003 + j;
    const proche = p => { const i = Math.floor(p[0] / h), j = Math.floor(p[1] / h);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const q of g.get(key(i + a, j + b)) || []) if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.8 * d) return true;
      return false; };
    const plus = p => { const k = key(Math.floor(p[0] / h), Math.floor(p[1] / h)); if (!g.has(k)) g.set(k, []); g.get(k).push(p); out.push(p); };
    grains.forEach((G, n) => {
      const c = Math.cos(G.angle), s = Math.sin(G.angle), m = Math.ceil(R / d) + 1;
      for (let j = -m; j <= m; j++) for (let i = -m; i <= m; i++) {
        const u = (i + j / 2) * d, v = j * d * Math.sqrt(3) / 2, p = [G.x + c * u - s * v, G.y + s * u + c * v];
        if (p[0] < 0 || p[0] > L || p[1] < 0 || p[1] > H) continue;
        const dn = Math.hypot(p[0] - G.x, p[1] - G.y);
        if (grains.some((o, k) => k !== n && Math.hypot(p[0] - o.x, p[1] - o.y) < dn)) continue;
        if (!proche(p)) plus(p);
      }
    });
    return out;
  }

  /* ---------- Burgers circuit and line energy (II.30.8) ---------- */
  function reseauCarre(nx, ny, d) {
    if (!Number.isInteger(nx) || !Number.isInteger(ny) || nx < 2 || ny < 2) err("nx, ny : entiers ≥ 2");
    num(d, "d"); if (!(d > 0)) err("d positif");
    const out = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) out.push([i * d, j * d]);
    return out;
  }
  /* walk atom to atom: n steps along +x, n along +y, n along −x, n along −y. Each step goes to the atom nearest to
     (current + ideal step). In a perfect crystal the walk comes back to its start; the closure failure (end − start,
     snapped to the nearest ideal lattice vector) is the Burgers vector of the dislocations it encloses. */
  function circuitBurgers(pts, depart, n, d) {
    if (!Number.isInteger(depart) || depart < 0 || depart >= pts.length) err("départ : l'indice d'un atome");
    if (!Number.isInteger(n) || n < 1) err("n : un entier ≥ 1");
    num(d, "d"); if (!(d > 0)) err("d positif");
    const g = grille(pts, d), chemin = [depart];
    let i = depart;
    for (const [sx, sy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) for (let k = 0; k < n; k++) {
      const c = [pts[i][0] + sx * d, pts[i][1] + sy * d];
      let best = -1, bd = Infinity;
      g.pres(c, j => { const r = Math.hypot(pts[j][0] - c[0], pts[j][1] - c[1]); if (r < bd) { bd = r; best = j; } });
      if (best < 0 || bd > 0.5 * d) err("le circuit sort du cristal");
      i = best; chemin.push(i);
    }
    const ex = pts[i][0] - pts[depart][0], ey = pts[i][1] - pts[depart][1];
    return { chemin, ferme: i === depart, burgers: [Math.round(ex / d), Math.round(ey / d)] };
  }
  /* screw dislocation in an isotropic crystal: energy per length between the core r0 and the outer radius R */
  function energieLigneVis(G, b, R, r0) {
    [G, b, R, r0].forEach((x, k) => num(x, ["G", "b", "R", "r0"][k]));
    if (!(G > 0 && b > 0 && r0 > 0 && R > r0)) err("G, b, r0 positifs et R > r0");
    return G * b * b / (4 * Math.PI) * Math.log(R / r0);
  }

  const api = Object.freeze({
    reseau2D, noeuds2D, reduire2D, bravais2D, BRAVAIS2D, rot2, miroir2, estSymetrie2D, ordresRotation2D, rotationCompatible,
    preuveRotation, symetriesMotif, symetriesCristal, invariant2D, rangee2D,
    madelung1D, madelungNaCl, energiePaire, energieReticulaire,
    couplage, croissance, remplissage,
    cubique, STRUCTURES, MASSES_MOLAIRES, atomes, voisins, masseVolumique, compacite, invariant3D,
    couche, empilement, compaciteEmpilement, coquilles,
    SYSTEMES, BRAVAIS3D, CENTRAGES, maille3D, primitifs, noeuds3D, volumeMaille, estNoeud3D, reduire3D, vecteursCourts, holoedrie,
    systemeDe, typeBravais, composantesInvariantes,
    METAUX, ACIERS, G_ACIER, glissement, cissionTheorique, frenkel, cissionLimite,
    fkChaine, fkGradient, fkEnergie, fkPas, fkDt, fkPosition, fkContraint, fkSeuil,
    radeauEquilibre, radeauTriangulaire, radeauDislocation, radeauForces, radeauPas, coordination, defauts,
    reseauCarre, circuitBurgers, energieLigneVis, radeauPolycristal,
  });
  if (node) module.exports = api;
  else root.Cristaux = api;
})(typeof self !== "undefined" ? self : this);

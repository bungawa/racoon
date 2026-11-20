/* L'opérateur nabla — the fields of the step, the second derivatives and the pitfalls (Feynman II.2.5, II.2.7, II.2.8).
   Pure, no DOM, UMD (global Nabla). SI throughout. The derivatives are those of AnaVec (/analyse-vectorielle.js).

   Velocity fields of a fluid in a plane (II.2.5): v(p) in m·s⁻¹, p = [x, y] in m, k = 1 s⁻¹
     CHAMPS                         id → { v(p), div(p), rot(p) }: the field and its exact divergence (s⁻¹) and curl
                                    (z component, s⁻¹). Ids: uniforme, source, rotation, cisaillement, selle, tourbillon (point
                                    vortex, singular at the origin), spirale.
     mesure(id, p, h)               { v, div, rot, divExact, rotExact }: the field at p, its divergence and curl by finite
                                    differences (AnaVec) and the exact values.
   Scalar fields of space (II.2.7): T(p) in K, p = [x, y, z] in m
     SCALAIRES                      id → { T(p), lap(p) }: bol (k(x² + y² + z²)), selle (k(x² − y²)), coulomb (k/r), onde
                                    (k sin(x/ℓ)), gauss (k exp(−r²/ℓ²)), with k and ℓ chosen so the numbers are readable.
     ecartMoyenne(T, p, a)          (mean of T on the 6 points at distance a along the axes) − T(p): Maxwell's « concentration »
                                    with the opposite sign. 6 × ecartMoyenne / a² → ∇²T when a → 0 (error of order a²).
   Vector fields of space (II.2.7): F(p), p = [x, y, z]
     VECTORIELS                     id → F(p): tourbillon3 (rotation about z with a twist), polynome, ondulant.
     identites(F, T, p, h)          the table (2.59) at p, numerically: { rotGrad: ∇×(∇T), divRot: ∇·(∇×F), rotRot: ∇×(∇×F),
                                    gradDiv: ∇(∇·F), lap: ∇²F, ecart: |∇×(∇×F) − ∇(∇·F) + ∇²F| }.
   Pitfalls (II.2.8)
     polaires(F, p)                 [F_r, F_θ]: components of a field of the plane on the polar unit vectors at p.
     piegePolaire(F, p, h)          { lapDeR: ∇²(F_r), rDeLap: (∇²F)_r }: the Laplacian of the radial component against the
                                    radial component of the Laplacian. Equal only by luck; a uniform field gives 0 against
                                    −cos θ / r².
     divergencePolaire(F, p, h)     { naive: ∂F_r/∂r + (1/r)∂F_θ/∂θ, juste: (1/r)∂(rF_r)/∂r + (1/r)∂F_θ/∂θ }: polar components
                                    differentiated as if they were Cartesian, against the right formula (= ∇ · F).
     produitGradients(psi, phi, p, h)  (∇ψ) × (∇φ) at p: not zero in general, although « ∇ × ∇ » looks like A × A.
   Systems described before the law
     SYSTEMES.ecoulement            a thin layer of water, its speed, the speed of sound: what « incompressible » neglects.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const A = node ? require("../analyse-vectorielle.js") : root.AnaVec;
  const { vectoriel: cross } = node ? require("../tenseurs.js") : root.Tenseurs;
  const err = m => { throw new Error("nabla : " + m); };
  const r2 = p => p.reduce((s, x) => s + x * x, 0);

  /* ---------- plane velocity fields (k = 1 s⁻¹, Γ/2π = 1 m²·s⁻¹ for the point vortex) ---------- */
  const zero = () => 0;
  const CHAMPS = {
    uniforme: { v: () => [1, 0], div: zero, rot: zero },
    source: { v: p => [p[0], p[1]], div: () => 2, rot: zero },
    rotation: { v: p => [-p[1], p[0]], div: zero, rot: () => 2 },
    cisaillement: { v: p => [p[1], 0], div: zero, rot: () => -1 },
    selle: { v: p => [p[0], -p[1]], div: zero, rot: zero },
    tourbillon: { v: p => { const q = r2(p); return [-p[1] / q, p[0] / q]; }, div: zero, rot: zero, singulier: [0, 0] },
    spirale: { v: p => [p[0] - p[1], p[0] + p[1]], div: () => 2, rot: () => 2 },
  };
  function champ(id) { const c = CHAMPS[id]; if (!c) err("champ inconnu : " + id); return c; }
  function mesure(id, p, h) {
    const c = champ(id);
    if (c.singulier && Math.hypot(p[0] - c.singulier[0], p[1] - c.singulier[1]) < 1e-9) err("champ non défini au point singulier");
    return { v: c.v(p), div: A.divergence(c.v, p, h), rot: A.rotationnel(c.v, p, h)[2], divExact: c.div(p), rotExact: c.rot(p) };
  }

  /* ---------- scalar fields of space ---------- */
  const L = 0.5;   // m, the length scale of the waves and the bump
  const SCALAIRES = {
    bol: { T: p => 300 + 100 * r2(p), lap: () => 600 },
    selle: { T: p => 300 + 100 * (p[0] * p[0] - p[1] * p[1]), lap: () => 0 },
    coulomb: { T: p => 300 + 10 / Math.sqrt(r2(p)), lap: () => 0, singulier: [0, 0, 0] },
    onde: { T: p => 300 + 20 * Math.sin(p[0] / L), lap: p => -20 / (L * L) * Math.sin(p[0] / L) },
    gauss: { T: p => 300 + 50 * Math.exp(-r2(p) / (L * L)), lap: p => 50 * Math.exp(-r2(p) / (L * L)) * (4 * r2(p) / L ** 4 - 6 / (L * L)) },
  };
  function scalaire(id) { const s = SCALAIRES[id]; if (!s) err("champ scalaire inconnu : " + id); return s; }
  function ecartMoyenne(T, p, a) {
    if (p.length !== 3) err("point de l'espace attendu");
    if (!(a > 0)) err("rayon a > 0 attendu");
    let s = 0;
    for (let i = 0; i < 3; i++) for (const d of [a, -a]) s += T(p.map((x, j) => j === i ? x + d : x));
    return s / 6 - T(p);
  }

  /* ---------- vector fields of space ---------- */
  const VECTORIELS = {
    tourbillon3: p => [-p[1], p[0], p[0] * p[1]],
    polynome: p => [p[1] * p[2], p[0] * p[2] * p[2], p[0] * p[0] * p[1]],
    ondulant: p => [Math.sin(p[1] / L), Math.cos(p[2] / L) * p[0], Math.exp(-p[0]) * p[1]],
  };
  function identites(F, T, p, h) {
    if (p.length !== 3) err("point de l'espace attendu");
    h = h || 1e-3;
    const rotGrad = A.rotationnel(q => A.gradient(T, q, h), p, h);
    const divRot = A.divergence(q => A.rotationnel(F, q, h), p, h);
    const rotRot = A.rotationnel(q => A.rotationnel(F, q, h), p, h);
    const gradDiv = A.gradient(q => A.divergence(F, q, h), p, h);
    const lap = A.laplacienVectoriel(F, p, h);
    const ecart = A.norme(rotRot.map((x, i) => x - gradDiv[i] + lap[i]));
    return { rotGrad, divRot, rotRot, gradDiv, lap, ecart };
  }

  /* ---------- pitfalls ---------- */
  function polaires(F, p) {
    const r = Math.hypot(p[0], p[1]);
    if (!(r > 0)) err("composantes polaires non définies à l'origine");
    const c = p[0] / r, s = p[1] / r, v = F(p);
    return [v[0] * c + v[1] * s, -v[0] * s + v[1] * c];
  }
  function piegePolaire(F, p, h) {
    const lapDeR = A.laplacien(q => polaires(F, q)[0], p, h);
    const lv = A.laplacienVectoriel(F, p, h), r = Math.hypot(p[0], p[1]);
    return { lapDeR, rDeLap: (lv[0] * p[0] + lv[1] * p[1]) / r };
  }
  /* divergence from polar components, at p ≠ 0: naive = ∂F_r/∂r + (1/r)∂F_θ/∂θ (as if r, θ were x, y),
     juste = (1/r)∂(r F_r)/∂r + (1/r)∂F_θ/∂θ, which equals the Cartesian ∇ · F */
  function divergencePolaire(F, p, h) {
    const r = Math.hypot(p[0], p[1]), th = Math.atan2(p[1], p[0]);
    h = h || 1e-5 * Math.max(1, r);
    const at = (rr, tt) => polaires(F, [rr * Math.cos(tt), rr * Math.sin(tt)]);
    const dFr = (at(r + h, th)[0] - at(r - h, th)[0]) / (2 * h), dFt = (at(r, th + h / r)[1] - at(r, th - h / r)[1]) / (2 * h / r);
    const drFr = ((r + h) * at(r + h, th)[0] - (r - h) * at(r - h, th)[0]) / (2 * h);
    return { naive: dFr + dFt / r, juste: (drFr + dFt) / r };
  }
  function produitGradients(psi, phi, p, h) {
    if (p.length !== 3) err("point de l'espace attendu");
    return cross(A.gradient(psi, p, h), A.gradient(phi, p, h));
  }

  /* ---------- the system, described ---------- */
  const SYSTEMES = {
    /* a thin layer of water in a tank, stirred: speeds about 1 m·s⁻¹ over 1 m; sound in water 1 480 m·s⁻¹ */
    ecoulement: { v: 1, L: 1, cSon: 1480, epaisseur: 0.01 },
  };
  function negligeables() {
    const s = SYSTEMES.ecoulement;
    return { mach2: (s.v / s.cSon) ** 2, plan: s.epaisseur / s.L };
  }

  const api = { CHAMPS, mesure, SCALAIRES, scalaire, ecartMoyenne, VECTORIELS, identites, polaires, piegePolaire, divergencePolaire, produitGradients, SYSTEMES, negligeables, L };
  if (node) module.exports = api;
  else root.Nabla = api;
})(typeof self !== "undefined" ? self : this);

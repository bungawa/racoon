/* ChampsEM — the calculations of the step « Champs électrique et magnétique » (Feynman vol. II, §1-1 to §1-6).
   Pure, no DOM, UMD (global ChampsEM). SI throughout: m, kg, s, C, A, N, V·m⁻¹, T. Every function is a model: its domain is in the comment.
   Coulomb, Newton, the field of point charges and the excess charge of a body come from forces.js (Forces); the bands of the
   electromagnetic spectrum from physique-fondamentale.js (Fondamentale). They are not copied here.

   §1-1  Electric forces
     protons(r)                  { Fe, Fg, rapport } between two protons r apart (N): Coulomb, Newton, Fe/Fg (independent of r).
     excedent(f, d, o)           two bodies of mass o.m (default 70 kg, a person) and Z/A o.zA (default 10/18, water), each with a fraction
                                 f of its electrons in excess, d apart, treated as points: { q, F, terres } where terres = F / (M_T g0),
                                 the weight of a mass equal to the Earth's.
   §1-2  Fields in a plane (charges and wires in the plane z = 0, wires along z)
     champE(charges, x, y)       E of point charges [{ q, x, y }], { ex, ey, e } (Forces.field, superposition).
     potentielE(charges, x, y)   V = Σ q/(4π ε0 r), volts, zero at infinity.
     champB(fils, x, y)          B of infinite straight wires [{ I, x, y }], current along +z: μ0 I/(2π r) around each wire, { bx, by, b }.
     potentielVecteur(fils, x, y) A_z = −Σ μ0 I ln(r)/(2π) (T·m, up to a constant): the lines of B are its level curves.
   §1-3  Flux and circulation in a plane, through a circle (centre c = [x, y], radius R, n pieces, counter-clockwise)
     CHAMPS_PLAN                 { uniforme, source, tourbillon, rotation, cisaillement }: r → [Fx, Fy], dimensionless toy fields.
     fluxCercle(F, c, R, n)      ∮ F·n̂ dl, outward normal (midpoint rule).
     circulationCercle(F, c, R, n) ∮ F·t̂ dl.
   §1-4  The laws, checked numerically
     fluxSphere(charges, c, R, n) flux of E through the sphere (centre [x, y, z]) of point charges [{ q, x, y, z }] (z default 0): V·m.
                                 Midpoint rule in cos θ and φ (n × 2n cells). Gauss: Q_int/ε0. The error grows when a charge nears the surface.
     chargeInterieure(charges, c, R)  Σ q of the charges strictly inside.
     circulationB(fils, c, R, n) ∮ B·dl around a circle in the plane, T·m. Ampère: μ0 I_enlacé.
     courantEnlace(fils, c, R)   Σ I of the wires strictly inside.
   §1-5  What are the fields?
     retard(L)                   L/c, s: delay of a change of the field across L.
     instantaneite(L, dt)        L/(c dt): small ⇒ the interaction may be treated as instantaneous over the duration dt.
     CUIVRE, nCuivre()           copper (ρ = 8 935 kg·m⁻³ at 293 K, M = 63,546 g·mol⁻¹, one free electron per atom): n in m⁻³.
     filsParalleles(I, S, d)     two parallel copper wires of section S (m²), current I each, d apart: { v, beta2, Fm, Fe, rapport }.
                                 v drift speed; Fm magnetic force per metre μ0 I²/(2π d); Fe the electric force per metre the electrons of
                                 one wire would exert on those of the other if the ions did not neutralise them, λ²/(2π ε0 d), λ = n e S.
                                 rapport = Fm/Fe = v²/c² (exact: μ0 ε0 c² = 1).
   §1-6  Science and technique
     cMaxwell()                  1/√(ε0 μ0), m·s⁻¹: the speed of the waves of the equations, from two static constants.
     onde(f)                     { lambda, bande, antenne }: λ = c/f (vacuum), the band of Fondamentale, half-wave antenna λ/2. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Forces = node ? require("./forces.js") : root.Forces;
  const Fondamentale = node ? require("./physique-fondamentale.js") : root.Fondamentale;
  const E = Cst.e, MP = Cst.m_p, EPS0 = Cst.eps0, MU0 = Cst.mu0, C = Cst.c, G0 = Cst.g0, NA = Cst.N_A;
  const K = 1 / (4 * Math.PI * EPS0);
  const M_TERRE = Cst.GM_E / Cst.G;                  // kg, ≈ 5,972 × 10²⁴ (GM from IERS, G from CODATA)

  const err = m => { throw new RangeError("ChampsEM : " + m); };
  const finite = (x, n) => (Number.isFinite(x) ? x : err(n + " : nombre fini attendu"));
  const positive = (x, n) => (Number.isFinite(x) && x > 0 ? x : err(n + " : nombre > 0 attendu"));
  const point2 = (c, n) => (Array.isArray(c) && c.length >= 2 && c.every(Number.isFinite) ? c : err(n + " : [x, y] attendu"));

  /* ---------- §1-1 ---------- */
  function protons(r) {
    positive(r, "r");
    const Fe = Forces.coulomb(E, E, r), Fg = -Forces.newton(MP, MP, r);
    return { Fe, Fg, rapport: Fe / Fg };
  }
  function excedent(f, d, o) {
    o = o || {};
    const m = o.m == null ? 70 : o.m, zA = o.zA == null ? 10 / 18 : o.zA;
    const { q, F } = Forces.excessCharge(m, positive(f, "f"), zA, positive(d, "d"));
    return { q, F, terres: F / (M_TERRE * G0) };
  }

  /* ---------- §1-2 ---------- */
  const champE = (charges, x, y) => Forces.field(charges, x, y);
  function potentielE(charges, x, y) {
    finite(x, "x"); finite(y, "y");
    let v = 0;
    for (const s of charges) { const r = Math.hypot(x - s.x, y - s.y); if (!(r > 0)) return NaN; v += K * finite(s.q, "q") / r; }
    return v;
  }
  function champB(fils, x, y) {
    finite(x, "x"); finite(y, "y");
    let bx = 0, by = 0;
    for (const w of fils) {
      const dx = x - w.x, dy = y - w.y, r2 = dx * dx + dy * dy;
      if (!(r2 > 0)) return { bx: NaN, by: NaN, b: NaN };
      const k = MU0 * finite(w.I, "I") / (2 * Math.PI * r2);     // μ0 I/(2π r) times the unit vector (−dy, dx)/r
      bx -= k * dy; by += k * dx;
    }
    return { bx, by, b: Math.hypot(bx, by) };
  }
  function potentielVecteur(fils, x, y) {
    finite(x, "x"); finite(y, "y");
    let a = 0;
    for (const w of fils) { const r = Math.hypot(x - w.x, y - w.y); if (!(r > 0)) return NaN; a -= MU0 * finite(w.I, "I") * Math.log(r) / (2 * Math.PI); }
    return a;
  }

  /* ---------- §1-3 ---------- */
  const CHAMPS_PLAN = Object.freeze({
    uniforme: () => [1, 0],
    source: r => { const q = r[0] * r[0] + r[1] * r[1]; return q > 0 ? [r[0] / q, r[1] / q] : [NaN, NaN]; },
    tourbillon: r => { const q = r[0] * r[0] + r[1] * r[1]; return q > 0 ? [-r[1] / q, r[0] / q] : [NaN, NaN]; },
    rotation: r => [-r[1], r[0]],
    cisaillement: r => [r[1], 0],
  });
  function boucle(F, c, R, n, normale) {
    if (typeof F !== "function") err("champ r → [Fx, Fy] attendu");
    point2(c, "c"); positive(R, "R"); n = n == null ? 720 : n;
    if (!Number.isInteger(n) || n < 8) err("n : entier ≥ 8 attendu");
    let s = 0;
    for (let i = 0; i < n; i++) {
      const a = 2 * Math.PI * (i + 0.5) / n, ca = Math.cos(a), sa = Math.sin(a), v = F([c[0] + R * ca, c[1] + R * sa]);
      s += normale ? v[0] * ca + v[1] * sa : -v[0] * sa + v[1] * ca;
    }
    return s * 2 * Math.PI * R / n;
  }
  const fluxCercle = (F, c, R, n) => boucle(F, c, R, n, true);
  const circulationCercle = (F, c, R, n) => boucle(F, c, R, n, false);

  /* ---------- §1-4 ---------- */
  function fluxSphere(charges, c, R, n) {
    if (!Array.isArray(c) || c.length < 2) err("c : [x, y, z] attendu");
    const cx = finite(c[0], "x"), cy = finite(c[1], "y"), cz = finite(c[2] || 0, "z");
    positive(R, "R"); n = n == null ? 120 : n;
    if (!Number.isInteger(n) || n < 4) err("n : entier ≥ 4 attendu");
    let s = 0;
    for (let i = 0; i < n; i++) {
      const u = -1 + 2 * (i + 0.5) / n, w = Math.sqrt(1 - u * u);        // u = cos θ: equal-area bands
      for (let j = 0; j < 2 * n; j++) {
        const p = 2 * Math.PI * (j + 0.5) / (2 * n), nx = w * Math.cos(p), ny = w * Math.sin(p), nz = u;
        const X = cx + R * nx, Y = cy + R * ny, Z = cz + R * nz;
        for (const q of charges) {
          const dx = X - q.x, dy = Y - q.y, dz = Z - (q.z || 0), r2 = dx * dx + dy * dy + dz * dz;
          s += K * q.q * (dx * nx + dy * ny + dz * nz) / (r2 * Math.sqrt(r2));
        }
      }
    }
    return s * 4 * Math.PI * R * R / (2 * n * n);
  }
  function chargeInterieure(charges, c, R) {
    positive(R, "R");
    return charges.reduce((s, q) => s + (Math.hypot(q.x - c[0], q.y - c[1], (q.z || 0) - (c[2] || 0)) < R ? q.q : 0), 0);
  }
  const circulationB = (fils, c, R, n) => boucle(r => { const b = champB(fils, r[0], r[1]); return [b.bx, b.by]; }, c, R, n == null ? 2000 : n, false);
  function courantEnlace(fils, c, R) {
    point2(c, "c"); positive(R, "R");
    return fils.reduce((s, w) => s + (Math.hypot(w.x - c[0], w.y - c[1]) < R ? w.I : 0), 0);
  }

  /* ---------- §1-5 ---------- */
  const retard = L => positive(L, "L") / C;
  const instantaneite = (L, dt) => positive(L, "L") / (C * positive(dt, "dt"));
  const CUIVRE = Object.freeze({ rho: 8935, M: 63.546e-3, libres: 1 });  // kg·m⁻³ at 293 K; kg·mol⁻¹ (IUPAC); free electrons per atom
  const nCuivre = () => CUIVRE.rho / CUIVRE.M * NA * CUIVRE.libres;     // ≈ 8,47 × 10²⁸ m⁻³
  function filsParalleles(I, S, d) {
    positive(I, "I"); positive(S, "S"); positive(d, "d");
    const lambda = nCuivre() * E * S, v = I / lambda;
    const Fm = MU0 * I * I / (2 * Math.PI * d), Fe = lambda * lambda / (2 * Math.PI * EPS0 * d);
    return { v, beta2: (v / C) ** 2, Fm, Fe, rapport: Fm / Fe };
  }

  /* ---------- §1-6 ---------- */
  const cMaxwell = () => 1 / Math.sqrt(EPS0 * MU0);
  function onde(f) {
    positive(f, "f");
    const lambda = C / f;
    return { lambda, bande: Fondamentale.band(f), antenne: lambda / 2 };
  }

  const api = { E, MP, EPS0, MU0, C, K, M_TERRE,
    protons, excedent, champE, potentielE, champB, potentielVecteur,
    CHAMPS_PLAN, fluxCercle, circulationCercle,
    fluxSphere, chargeInterieure, circulationB, courantEnlace,
    retard, instantaneite, CUIVRE, nCuivre, filsParalleles, cMaxwell, onde };
  if (node) module.exports = api;
  else root.ChampsEM = api;
})(typeof self !== "undefined" ? self : this);

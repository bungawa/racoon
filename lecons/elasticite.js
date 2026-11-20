/* Elasticite — the isotropic elastic solid of Feynman II.38 (steps « Élasticité », elasticite-1 and elasticite-2).
   Pure, no DOM, UMD (global Elasticite). SI throughout: m, N, Pa, kg, s, rad.
   One module for the two steps: extend here (II.39 below its own heading), do not copy. Builds on Tenseurs (Lamé
   coefficients, the stiffness tensor), Osc (the exact pendulum period, for the elastica) and Integ (rk4, for its shape).

   Notation: E is Feynman's Y, ν is his σ (Poisson's ratio), μ = G the shear modulus. Stress counted positive in tension.

   Materials (design values of the Eurocodes, each checked against the clause in the comment)
     MATERIAUX                 { acier, aluminium, beton }: { E, nu, rho, lim, limNom, limC }. lim is the tensile stress where the
                               linear model stops (fy for steel; fctm, the mean tensile strength, for concrete), limC the
                               compressive one (fy; fck for concrete); null when it depends on the alloy.
   Constants of an isotropic solid (II.38.1, II.38.2)
     constantesIsotropes(E, nu)  { E, nu, lambda, mu, K, M, C11, C12, C44 }: μ = E/2(1 + ν) (38.14), K = E/3(1 − 2ν) (38.9),
                               M = E(1 − ν)/((1 + ν)(1 − 2ν)) (38.20), λ from Tenseurs.lame; C11 = M = λ + 2μ, C12 = λ, C44 = μ
                               (39.22). Throws unless E > 0 and −1 < ν < 1/2.
     deformation(E, nu, S)     ε = [(1 + ν) σ − ν tr σ δ]/E: the strain of the stress tensor S (superposition of (38.4)–(38.5)).
     traction(o)               bar of section A, length L, pulled by F: { sigma, eps, dL, epsLat, dVsurV, k = EA/L }.
     hydrostatique(E, nu, p)   all faces pressed by p: { eps = −p(1 − 2ν)/E, dVsurV = −p/K }.
     cisaillementPur(E, nu, tau)   { gamma = τ/μ, diagonale = ±(1 + ν)τ/E } (38.11)–(38.13).
     bloque(E, nu, sigma)      pulled along x, sides held: { sigLat = νσ/(1 − ν) (38.18), eps = σ/M, rapport = M/E }.
   Torsion and waves (II.38.3)
     polaire(a, b)             π(a⁴ − b⁴)/2: polar second moment of a tube of radii b < a (b = 0: solid rod).
     torsion(o)                o = { mu, a, b, L, C }: { J, raideur = μJ/L (38.25), phi = C/raideur, tauMax = Ca/J,
                               gammaMax = aφ/L }.
     vitessesIsotropes(E, nu, rho)  { vS = √(μ/ρ) (38.32), vP = √(M/ρ) (38.33), vBarre = √(E/ρ) (thin bar), rapport = vP/vS }.
     depuisVitesses(vP, vS, rho)    { E, nu, mu }: the inverse (ultrasonic measurement). Throws if vP ≤ vS √(4/3).
     distanceSeisme(dt, vP, vS)     distance of a source from the delay dt between the two arrivals: dt/(1/vS − 1/vP).
   Bending (II.38.4)
     contrainteFlexion(M, I, y)    σ = M y/I (38.34 with 38.36).   rayonCourbure(E, I, M): EI/M (38.36).
     console(W, L, E, I, x)    deflection of a cantilever with an end load (38.41). flecheConsole: W L³/(3EI) (38.42).
     ecartCourbure(p)          1 − (1 + p²)^(−3/2): relative error of 1/R ≈ z″ (38.39) where the slope is p.
   Buckling (II.38.5) and EN 1993-1-1:2005, 6.3.1
     euler(E, I, Lf)           π² E I/Lf² (38.46).
     LONGUEURS                 buckling length / length for the ideal end conditions (Euler's theory, not a clause of the
                               Eurocode): articulee 1, console 2, encastreeArticulee 0,699, encastree 0,5.
     rayonGiration(I, A), elancement(Lf, i) = Lf/i, lambda1(E, fy) = π√(E/fy) (6.3.1.3(1)).
     COURBES                   imperfection factors α of Table 6.1: a0 0,13; a 0,21; b 0,34; c 0,49; d 0,76.
     chi(lbar, courbe)         reduction factor (6.49), Φ = 0,5[1 + α(λ̄ − 0,2) + λ̄²], χ ≤ 1. courbe: a key or a number α.
     flambementEC3(o)          o = { E, fy, A, I, Lf, courbe, gM1 (1,00 recommended, 6.1(1) note 2B), NEd }:
                               { Ncr, i, lambda, lambda1, lbar (6.50), chi, NbRd (6.47), negligeable (6.3.1.2(4): λ̄ ≤ 0,2, or
                               NEd/Ncr ≤ 0,04 when NEd > 0 is given), taux = NEd/NbRd }.
   Large deflections (38.47): the elastica of a pinned column, the pendulum equation in θ(s)
     elastica(r, n)            r = F/Fcr ≥ 1, unit length: { k = sin(θ0/2), theta0, fleche δ/L = 2k/ω, corde (end distance)/L,
                               points [[x, y]…] }, n steps of rk4 (default 400). K(k) through Osc.periodePendule.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Tenseurs = node ? require("../tenseurs.js") : root.Tenseurs;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Osc = node ? require("./oscillateur.js") : root.Osc;

  const err = m => { throw new Error("elasticite: " + m); };
  const num = (x, name) => { if (typeof x !== "number" || !isFinite(x)) err(name + " doit être un nombre fini"); return x; };
  const pos = (x, name) => { num(x, name); if (!(x > 0)) err(name + " doit être strictement positif"); return x; };
  const poisson = nu => { num(nu, "ν"); if (!(nu > -1 && nu < 0.5)) err("ν doit vérifier −1 < ν < 1/2"); return nu; };

  /* ---------- materials: Eurocode design values ---------- */
  const MATERIAUX = Object.freeze({
    /* EN 1993-1-1:2005, 3.2.6(1): E = 210 000 N/mm², ν = 0,3. ρ: EN 1992-1-1:2004, 3.2.7(3), 7 850 kg/m³.
       fy = 235 MPa: S 235, t ≤ 40 mm, EN 1993-1-1 Table 3.1. */
    acier: Object.freeze({ E: 210e9, nu: 0.3, rho: 7850, lim: 235e6, limNom: "fy", limC: 235e6 }),
    /* EN 1999-1-1:2007, 3.2.5(1): E = 70 000 N/mm², ν = 0,3, ρ = 2 700 kg/m³. Yield strength: depends on the alloy. */
    aluminium: Object.freeze({ E: 70e9, nu: 0.3, rho: 2700, lim: null, limNom: null, limC: null }),
    /* EN 1992-1-1:2004: C30/37, fck = 30 MPa, Ecm = 33 GPa and fctm = 2,9 MPa (Table 3.1); ν = 0,2 uncracked (3.1.3(4)).
       ρ: 24,0 kN/m³ for normal-weight concrete (EN 1991-1-1:2002, Table A.1) divided by g0. */
    beton: Object.freeze({ E: 33e9, nu: 0.2, rho: 24e3 / Cst.g0, lim: 2.9e6, limNom: "fctm", limC: 30e6 }),
  });

  /* ---------- constants of an isotropic solid ---------- */
  function constantesIsotropes(E, nu) {
    pos(E, "E"); poisson(nu);
    const { lambda, mu } = Tenseurs.lame(E, nu), M = E * (1 - nu) / ((1 + nu) * (1 - 2 * nu));
    return { E, nu, lambda, mu, K: E / (3 * (1 - 2 * nu)), M, C11: M, C12: lambda, C44: mu };
  }
  const constantes = constantesIsotropes;
  function deformation(E, nu, S) {
    pos(E, "E"); poisson(nu); Tenseurs.mat(S, "S");
    const tr = Tenseurs.trace(S);
    return S.map((r, i) => r.map((s, j) => ((1 + nu) * s - (i === j ? nu * tr : 0)) / E));
  }
  function traction(o) {
    const E = pos(o.E, "E"), nu = poisson(o.nu), A = pos(o.A, "A"), L = pos(o.L, "L"), F = num(o.F, "F");
    const sigma = F / A, eps = sigma / E;
    return { sigma, eps, dL: eps * L, epsLat: -nu * eps, dVsurV: eps * (1 - 2 * nu), k: E * A / L };
  }
  function hydrostatique(E, nu, p) {
    const c = constantes(E, nu); num(p, "p");
    return { eps: -p * (1 - 2 * nu) / E, dVsurV: -p / c.K, K: c.K };
  }
  function cisaillementPur(E, nu, tau) {
    const c = constantes(E, nu); num(tau, "τ");
    return { gamma: tau / c.mu, diagonale: (1 + nu) * tau / E, mu: c.mu };
  }
  function bloque(E, nu, sigma) {
    const c = constantes(E, nu); num(sigma, "σ");
    return { sigLat: nu * sigma / (1 - nu), eps: sigma / c.M, M: c.M, rapport: c.M / E };
  }

  /* ---------- torsion and waves ---------- */
  function polaire(a, b) {
    pos(a, "a"); b = b === undefined ? 0 : num(b, "b");
    if (!(b >= 0 && b < a)) err("rayon intérieur : 0 ≤ b < a");
    return Math.PI * (a ** 4 - b ** 4) / 2;
  }
  function torsion(o) {
    const mu = pos(o.mu, "μ"), a = pos(o.a, "a"), L = pos(o.L, "L"), C = num(o.C, "C"), J = polaire(a, o.b || 0);
    const raideur = mu * J / L, phi = C / raideur;
    return { J, raideur, phi, tauMax: C * a / J, gammaMax: a * phi / L };
  }
  function vitessesIsotropes(E, nu, rho) {
    const c = constantes(E, nu); pos(rho, "ρ");
    const vS = Math.sqrt(c.mu / rho), vP = Math.sqrt(c.M / rho);
    return { vS, vP, vBarre: Math.sqrt(E / rho), rapport: vP / vS };
  }
  function depuisVitesses(vP, vS, rho) {
    pos(vP, "vP"); pos(vS, "vS"); pos(rho, "ρ");
    const r2 = (vP / vS) ** 2;                               // = 2(1 − ν)/(1 − 2ν)
    if (!(r2 > 4 / 3)) err("vP/vS doit dépasser √(4/3) : sinon ν ≤ −1");
    const nu = (r2 - 2) / (2 * (r2 - 1)), mu = rho * vS * vS;
    return { E: 2 * mu * (1 + nu), nu, mu };
  }
  function distanceSeisme(dt, vP, vS) {
    num(dt, "Δt"); pos(vP, "vP"); pos(vS, "vS");
    if (!(vP > vS)) err("l'onde longitudinale doit être la plus rapide");
    if (dt < 0) err("Δt ≥ 0");
    return dt / (1 / vS - 1 / vP);
  }

  /* ---------- bending ---------- */
  const contrainteFlexion = (M, I, y) => num(M, "M") * num(y, "y") / pos(I, "I");
  const rayonCourbure = (E, I, M) => { pos(E, "E"); pos(I, "I"); num(M, "M"); return M === 0 ? Infinity : E * I / M; };
  function console_(W, L, E, I, x) {
    num(W, "W"); pos(L, "L"); pos(E, "E"); pos(I, "I"); num(x, "x");
    if (!(x >= 0 && x <= L)) err("x hors de la poutre");
    return W / (E * I) * (L * x * x / 2 - x ** 3 / 6);
  }
  const flecheConsole = (W, L, E, I) => console_(W, L, E, I, L);
  const ecartCourbure = p => 1 - Math.pow(1 + num(p, "pente") ** 2, -1.5);

  /* ---------- buckling ---------- */
  const euler = (E, I, Lf) => Math.PI ** 2 * pos(E, "E") * pos(I, "I") / pos(Lf, "Lf") ** 2;
  const LONGUEURS = Object.freeze({ articulee: 1, console: 2, encastreeArticulee: 0.699, encastree: 0.5 });
  const rayonGiration = (I, A) => Math.sqrt(pos(I, "I") / pos(A, "A"));
  const elancement = (Lf, i) => pos(Lf, "Lf") / pos(i, "i");
  const lambda1 = (E, fy) => Math.PI * Math.sqrt(pos(E, "E") / pos(fy, "fy"));
  const COURBES = Object.freeze({ a0: 0.13, a: 0.21, b: 0.34, c: 0.49, d: 0.76 });
  function alphaDe(courbe) {
    if (typeof courbe === "number") { num(courbe, "α"); if (courbe < 0) err("α ≥ 0"); return courbe; }
    if (!(courbe in COURBES)) err("courbe de flambement inconnue : " + courbe);
    return COURBES[courbe];
  }
  function chi(lbar, courbe) {
    num(lbar, "λ̄"); if (lbar < 0) err("λ̄ ≥ 0");
    const a = alphaDe(courbe), Phi = 0.5 * (1 + a * (lbar - 0.2) + lbar * lbar);
    return Math.min(1, 1 / (Phi + Math.sqrt(Phi * Phi - lbar * lbar)));
  }
  function flambementEC3(o) {
    const E = pos(o.E, "E"), fy = pos(o.fy, "fy"), A = pos(o.A, "A"), I = pos(o.I, "I"), Lf = pos(o.Lf, "Lf");
    const gM1 = o.gM1 === undefined ? 1 : pos(o.gM1, "γM1"), NEd = o.NEd === undefined ? 0 : num(o.NEd, "NEd");
    if (NEd < 0) err("NEd ≥ 0 (compression comptée positive)");
    const Ncr = euler(E, I, Lf), i = rayonGiration(I, A), lam = elancement(Lf, i), l1 = lambda1(E, fy);
    const lbar = Math.sqrt(A * fy / Ncr), x = chi(lbar, o.courbe), NbRd = x * A * fy / gM1;
    // 6.3.1.2(4): the check may be skipped for λ̄ ≤ 0,2, or for NEd/Ncr ≤ 0,04 when a design force NEd is given (0 means none)
    return { Ncr, i, lambda: lam, lambda1: l1, lbar, chi: x, NbRd, negligeable: lbar <= 0.2 || (NEd > 0 && NEd / Ncr <= 0.04), taux: NEd / NbRd };
  }

  /* ---------- the elastica (38.47): θ″ = −ω² sin θ in the arc length s, ω² = F/EI ---------- */
  const K = k => Osc.periodePendule(1, 2 * Math.asin(k)) / 4;         // complete elliptic integral of the first kind
  function elastica(r, n) {
    num(r, "F/Fcr"); if (!(r >= 1)) err("F/Fcr ≥ 1 : en dessous, la colonne reste droite");
    if (!(r < 1e4)) err("F/Fcr trop grand");
    n = n === undefined ? 400 : n;
    if (!Number.isInteger(n) || n < 8) err("n : un entier ≥ 8");
    /* pinned column of unit length: half a pendulum swing, from θ0 to −θ0, takes the length: 2K(k)/ω = 1, ω = π√r */
    const w = Math.PI * Math.sqrt(r), target = w / 2;
    let lo = 0, hi = 1;
    if (r === 1) hi = 0;
    else for (let it = 0; it < 200 && hi - lo > 1e-15; it++) { const m = (lo + hi) / 2; if (K(m) < target) lo = m; else hi = m; }
    const k = (lo + hi) / 2, theta0 = 2 * Math.asin(k);
    const f = (s, y) => [y[1], -w * w * Math.sin(y[0]), Math.cos(y[0]), Math.sin(y[0])];   // θ, θ′, x, y
    let y = [theta0, 0, 0, 0]; const h = 1 / n, points = [[0, 0]];
    for (let i = 0; i < n; i++) { y = Integ.rk4(f, i * h, y, h); points.push([y[2], y[3]]); }
    return { k, theta0, omega: w, fleche: 2 * k / w, corde: y[2], points };
  }

  /* ===== II.39 (step elasticite-2): add below with Edit, and list the names in api ===== */
  /* Rank-4 tensors are Tenseurs' flat arrays of 81 numbers, index 27 i + 9 j + 3 k + l.
     decomposer(G)              G[i][j] = ∂u_i/∂x_j (3 × 3). { e: strain (39.8), omega: rotation (39.11) with Feynman's
                                sign ω_ij = ½(∂u_j/∂x_i − ∂u_i/∂x_j), so that G = e − ω (39.10), angle: rotation about z (rad),
                                dilatation: tr e = ΔV/V to first order, principales: Tenseurs.propres(e) }. Small gradients.
     deformer(G, r)             r + G r: where the point r goes in the homogeneous displacement u = G r (39.9).
     greenLagrange(G)           ½(G + Gᵀ + GᵀG): the exact strain, zero for any rigid rotation; e is its linear part.
     deformationUniaxiale(E, nu, s)   strain under the uniaxial stress s along x, lateral faces free: diag(s, −νs, −νs)/E.
     vitesses(C, rho, n)        plane waves along n, stiffness C (Pa), density rho: Christoffel Γ_ik = Σ C_ijkl n_j n_l / ρ,
                                from (39.31). { v: [fastest … slowest] (m/s), polarisations }. Throws for an unstable C.
     elastoplastique(p, chemin) 1D bar along the strain path chemin: elasticity E, yield fy, linear hardening H,
                                ecrouissage "isotrope" or "cinematique" (Prager); return mapping on fine sub-steps.
                                → [{ eps, sigma, epsP }]. Small strains, rate-independent, no damage.
     aire(points)               ∮ σ dε (shoelace, J·m⁻³): energy dissipated per unit volume over a closed loop.
     constantesReseau(liaisons, V)    central springs { k (N/m), r: bond vector (m) } around one atom, volume V per atom:
                                C_ijkl = Σ k |r|² n_i n_j n_k n_l / (2V). Symmetric in all indices: the Cauchy relations.
     energieLiaisons(liaisons, V, eps, exacte)   spring energy per unit volume: linearised ¼ Σ k |r|² (nᵀ eps n)² / V,
                                or with exacte the true stretch ½ k (|(1 + eps) r| − |r|)², halved for shared bonds.
     reseauCubique(k1, k2, a)   Feynman's model (§39-5): simple cubic of spacing a, springs k1 to the 6 nearest and k2 to
                                the 12 next-nearest neighbours. { liaisons, V = a³ }.
     cubiques(C)                { C11 = C_xxxx, C12 = C_xxyy, C44 = C_xyxy } read from a rank-4 tensor.
     ressortsDepuis(C11, C44, a)      inverse of the model: { k1 = a(C11 − 2 C44), k2 = a C44 }; C12 = C44 is then predicted.
     CRISTAUX                   Table 39-2 (Kittel 1956, via Feynman), 10¹² dyn/cm² = 100 GPa converted to Pa: { id: { C11, C12,
                                C44, rho, liaison } }; rho (kg/m³, Wikipedia infobox, checked 2026-11) only where a page needs it,
                                else null; liaison "metal", "ionique" or "covalent".
     zener(C11, C12, C44)       anisotropy 2 C44/(C11 − C12): 1 for an isotropic solid; 2 k2/(k1 + k2) in Feynman's model. */
  const build39 = f => [0, 1, 2].map(i => [0, 1, 2].map(j => f(i, j)));
  const at4 = (C, i, j, k, l) => C[27 * i + 9 * j + 3 * k + l];
  const rang4 = C => { if (!Array.isArray(C) || C.length !== 81) err("C : tenseur d'ordre 4 (81 composantes)"); C.forEach((x, i) => num(x, "C[" + i + "]")); return C; };

  function decomposer(G) {
    Tenseurs.mat(G, "G");
    const e = build39((i, j) => (G[i][j] + G[j][i]) / 2), omega = build39((i, j) => (G[j][i] - G[i][j]) / 2);
    return { e, omega, angle: (G[1][0] - G[0][1]) / 2, dilatation: e[0][0] + e[1][1] + e[2][2], principales: Tenseurs.propres(e) };
  }
  const deformer = (G, r) => { const d = Tenseurs.appliquer(G, r); return r.map((x, i) => x + d[i]); };
  const greenLagrange = G => { Tenseurs.mat(G, "G"); const GtG = Tenseurs.produit(Tenseurs.transposee(G), G); return build39((i, j) => (G[i][j] + G[j][i] + GtG[i][j]) / 2); };
  function deformationUniaxiale(E, nu, s) {
    pos(E, "E"); poisson(nu); num(s, "s");
    return Tenseurs.diag(s / E, -nu * s / E, -nu * s / E);
  }
  function vitesses(C, rho, n) {
    rang4(C); pos(rho, "rho");
    const l = Math.hypot(...n); if (!(l > 0)) err("direction nulle");
    const u = n.map(x => num(x, "n") / l);
    const G = build39((i, k) => { let s = 0; for (let j = 0; j < 3; j++) for (let m = 0; m < 3; m++) s += at4(C, i, j, k, m) * u[j] * u[m]; return s / rho; });
    const p = Tenseurs.propres(G);
    if (!(p.valeurs[0] > 0)) err("milieu instable : une valeur propre de Γ est ≤ 0");
    return { v: p.valeurs.map(Math.sqrt).reverse(), polarisations: p.axes.slice().reverse() };
  }
  function elastoplastique(p, chemin) {
    const E = pos(p.E, "E"), fy = pos(p.fy, "fy"), H = num(p.H || 0, "H"), mode = p.ecrouissage || "isotrope";
    if (H < 0) err("H ≥ 0"); if (mode !== "isotrope" && mode !== "cinematique") err("écrouissage : isotrope ou cinematique");
    if (!Array.isArray(chemin) || !chemin.length) err("chemin : tableau de déformations");
    let eps = 0, epsP = 0, alpha = 0;                        // alpha: cumulated plastic strain
    const out = [], pas = fy / E / 50;
    const etat = e => {
      const s = E * (e - epsP), X = mode === "cinematique" ? H * epsP : 0, R = fy + (mode === "isotrope" ? H * alpha : 0);
      const f = Math.abs(s - X) - R;
      if (f <= 0) return s;
      const dl = f / (E + H), sg = Math.sign(s - X);        // return mapping, exact for linear hardening
      epsP += sg * dl; alpha += dl;
      return E * (e - epsP);
    };
    chemin.forEach((cible, k) => {
      num(cible, "chemin[" + k + "]");
      const n = Math.max(1, Math.ceil(Math.abs(cible - eps) / pas)), d = (cible - eps) / n;
      let s = 0;
      for (let q = 1; q <= n; q++) s = etat(eps + q * d);
      eps = cible;
      out.push({ eps, sigma: s, epsP });
    });
    return out;
  }
  function aire(points) {
    let a = 0;
    for (let i = 0; i < points.length; i++) { const p = points[i], q = points[(i + 1) % points.length]; a += p.eps * q.sigma - q.eps * p.sigma; }
    return -a / 2;                                           // a dissipative loop runs clockwise in (ε, σ): positive
  }
  function constantesReseau(liaisons, V) {
    pos(V, "V");
    if (!Array.isArray(liaisons) || !liaisons.length) err("liaisons : tableau non vide");
    liaisons.forEach((b, i) => { num(b.k, "k[" + i + "]"); if (!(Math.hypot(...b.r) > 0)) err("liaison nulle"); });
    return Tenseurs.tenseur(4, (i, j, k, l) => liaisons.reduce((s, b) => {
      const L2 = b.r[0] ** 2 + b.r[1] ** 2 + b.r[2] ** 2;
      return s + b.k * b.r[i] * b.r[j] * b.r[k] * b.r[l] / L2;   // k L² n_i n_j n_k n_l
    }, 0) / (2 * V));
  }
  function energieLiaisons(liaisons, V, eps, exacte) {
    pos(V, "V"); Tenseurs.mat(eps, "eps");
    return liaisons.reduce((s, b) => {
      const L = Math.hypot(...b.r);
      if (exacte) return s + b.k * (Math.hypot(...deformer(eps, b.r)) - L) ** 2 / 2;
      const x = Tenseurs.quadratique(eps, b.r.map(c => c / L));
      return s + b.k * L * L * x * x / 2;
    }, 0) / (2 * V);                                         // each bond is shared by two atoms
  }
  function reseauCubique(k1, k2, a) {
    num(k1, "k1"); num(k2, "k2"); pos(a, "a");
    const liaisons = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      const n = Math.abs(x) + Math.abs(y) + Math.abs(z);
      if (n === 1) liaisons.push({ k: k1, r: [x * a, y * a, z * a] });
      if (n === 2) liaisons.push({ k: k2, r: [x * a, y * a, z * a] });
    }
    return { liaisons, V: a * a * a };
  }
  const cubiques = C => { rang4(C); return { C11: at4(C, 0, 0, 0, 0), C12: at4(C, 0, 0, 1, 1), C44: at4(C, 0, 1, 0, 1) }; };
  const ressortsDepuis = (C11, C44, a) => { num(C11, "C11"); num(C44, "C44"); pos(a, "a"); return { k1: a * (C11 - 2 * C44), k2: a * C44 }; };
  const cr = (C11, C12, C44, rho, liaison) => Object.freeze({ C11: C11 * 1e11, C12: C12 * 1e11, C44: C44 * 1e11, rho, liaison });
  const CRISTAUX = Object.freeze({
    Na: cr(0.055, 0.042, 0.049, null, "metal"), K: cr(0.046, 0.037, 0.026, null, "metal"),
    Fe: cr(2.37, 1.41, 1.16, 7874, "metal"), diamant: cr(10.76, 1.25, 5.76, 3510, "covalent"), Al: cr(1.08, 0.62, 0.28, 2699, "metal"),
    LiF: cr(1.19, 0.54, 0.53, null, "ionique"), NaCl: cr(0.486, 0.127, 0.128, 2170, "ionique"), KCl: cr(0.40, 0.062, 0.062, null, "ionique"),
    NaBr: cr(0.33, 0.13, 0.13, null, "ionique"), KI: cr(0.27, 0.043, 0.042, null, "ionique"), AgCl: cr(0.60, 0.36, 0.062, null, "ionique"),
  });
  function zener(C11, C12, C44) { num(C11, "C11"); num(C12, "C12"); num(C44, "C44"); if (!(C11 !== C12)) err("C11 = C12 : anisotropie infinie"); return 2 * C44 / (C11 - C12); }

  const api = Object.freeze({
    MATERIAUX, constantesIsotropes, deformation, traction, hydrostatique, cisaillementPur, bloque,
    polaire, torsion, vitessesIsotropes, depuisVitesses, distanceSeisme,
    contrainteFlexion, rayonCourbure, console: console_, flecheConsole, ecartCourbure,
    euler, LONGUEURS, rayonGiration, elancement, lambda1, COURBES, chi, flambementEC3, elastica,
    decomposer, deformer, greenLagrange, deformationUniaxiale, vitesses, elastoplastique, aire,
    constantesReseau, energieLiaisons, reseauCubique, cubiques, ressortsDepuis, CRISTAUX, zener,
  });
  if (node) module.exports = api;
  else root.Elasticite = api;
})(typeof self !== "undefined" ? self : this);

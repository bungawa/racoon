/* Potentiel — calculs des leçons « Énergie d'un système de points », « Champ de gravitation des corps étendus »,
   « Travail d'une force » et « Mouvement contraint » (sections I.13.3, I.13.4, I.14.1, I.14.2).
   Pur, sans DOM, UMD (global Potentiel). SI partout : m en kg, longueurs en m, temps en s, forces en N, énergies en J.
   Les constantes viennent de constantes.js ; l'intégrateur pas à pas vient de integration.js (Integ).

   Systèmes de points (points matériels, gravitation de Newton)
     epPaires(m, X, o)       → { Ep, paires: [{ i, j, r, ep }] } : Ep = Σ_{i<j} −G mᵢ mⱼ / rᵢⱼ, chaque paire une seule fois.
     ecSysteme(m, V)          → Σ ½ mᵢ vᵢ².
     assemblage(m, X, o)      → [W₁, W₂, …] : travail reçu pour amener le point k de l'infini, les k − 1 premiers déjà en place.
                                 W₁ = 0 et Σ W = Ep.
     forces(m, X, o)          → [[F…]…] : force de gravitation sur chaque point.
     nCorps(m, d, o)          → { a(t, x, v), energie(x, v, { double }) → { Ec, Ep, E } } pour Integ : x et v à plat (d·N valeurs).
                                 double: true compte chaque paire deux fois (l'erreur classique) : E n'est plus conservée.
     troisEtoiles(f)          → { m, sys, run } : la simulation de la leçon I.13.3. Deux masses solaires à 1 ua en orbite
                                 circulaire, une demi-masse solaire à 6 ua avec la fraction f de la vitesse circulaire ; centre de
                                 masse au repos ; saut de grenouille, pas de 0,002 an, 10 000 pas, un état sur 20 dans run.
   Corps étendus (masse M répartie uniformément ; g compté positif vers le centre)
     coquille(M, a, r, o)     → { g, V } numériques : la coquille découpée en o.n anneaux (o.regle "anneaux", milieu en θ),
                                 ou par Simpson adaptatif (o.regle "adaptatif", défaut, tolérance o.tol).
     coquilleExacte(M, a, r)  → { g, V } : théorème de Newton. g = 0 dedans, GM/r² dehors, GM/(2a²) sur la surface (la moyenne).
     boule(M, R, r, o)        → { g, V } numériques : somme de coquilles concentriques, o.couches sous r et autant au-dessus
                                 (o.coupe = false : o.couches régulières de 0 à R, sans couper à r) (Simpson adaptatif dans chacune).
     bouleExacte(M, R, r)     → { g, V } : GM r/R³ dedans, GM/r² dehors.
     disque(sigma, R, z, o)   → g numérique sur l'axe d'un disque mince de densité surfacique sigma, à la hauteur z > 0.
     disqueExact(sigma, R, z) → 2πGσ (1 − z/√(z² + R²)) ;  plan(sigma) → 2πGσ, le disque infini.
     epBoule(M, R)            → −3GM²/(5R) : énergie de gravitation d'une boule homogène.
     j2(r, lat, o)            → écart relatif du champ radial dû à l'aplatissement : −3 J₂ (R/r)² P₂(sin φ).
   Travail
     travail(F, chemin, n)    → Σ F(milieu, t̂)·Δr sur n segments : l'intégrale curviligne ∫ F·dr. F(p, t̂) → vecteur.
     longueur(chemin, n)      → longueur du chemin.
     CHAMPS   poids(m, g), ressort(k, O), tourbillon(k), frottement(f) : fonctions F(p, t̂) dans le plan.
     CHEMINS  segment(A, B), equerre(A, B), arc(A, B, b), boucle(c1, c2) : fonctions s ∈ [0, 1] → point.
   Mouvement contraint (perle sur un fil plan y = h(x), ou chariot verrouillé sur un rail)
     bosses(H, L, B)          → profil { h, d1, d2, L, H, B, xDepart(h0) } : deux sommets de hauteur H, une bosse B au milieu.
     perle(profil, o)         → { t, x, y, v, Ec, Ep, Em, Wf, N, retour } : o = { h0, mu, m, g, dt, duree, every }.
                                 N est la réaction normale algébrique (positive : elle pousse vers le haut), Wf le travail du
                                 frottement, retour la hauteur du premier point d'arrêt après le départ.
   Les erreurs lèvent un message en français : elles signalent un appel faux, jamais un mouvement inhabituel. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const G = Cst.G;
  /* J₂ de la Terre, sans dimension (modèle JGM-3 : C₂₀ non normalisé, 1,0826 × 10⁻³). Pas encore dans constantes.js. */
  const J2_E = 1.0826e-3;

  const err = m => { throw new Error("potentiel: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); };
  const nonneg = (v, name) => { finite(v, name); if (!(v >= 0)) err(name + " doit être positif ou nul"); };
  const Gof = o => (o && o.G != null ? (positive(o.G, "G"), o.G) : G);
  const dot = (p, q) => p.reduce((s, c, i) => s + c * q[i], 0);
  const sub = (p, q) => p.map((c, i) => c - q[i]);
  const norm = p => Math.sqrt(dot(p, p));

  /* ---------- systèmes de points ---------- */
  function checkSystem(m, X) {
    if (!Array.isArray(m) || !Array.isArray(X) || m.length !== X.length) err("m et X doivent être deux tableaux de même longueur");
    m.forEach(q => positive(q, "chaque masse"));
    const d = X.length ? X[0].length : 0;
    X.forEach(p => { if (!Array.isArray(p) || p.length !== d || !d) err("chaque position est un vecteur de même dimension"); p.forEach(c => finite(c, "position")); });
  }
  function epPaires(m, X, o) {
    checkSystem(m, X);
    const g = Gof(o), paires = [];
    let Ep = 0;
    for (let i = 0; i < m.length; i++) for (let j = i + 1; j < m.length; j++) {
      const r = norm(sub(X[i], X[j]));
      if (r === 0) err(`les points ${i} et ${j} sont confondus : énergie infinie`);
      const ep = -g * m[i] * m[j] / r; paires.push({ i, j, r, ep }); Ep += ep;
    }
    return { Ep, paires };
  }
  function ecSysteme(m, V) {
    if (!Array.isArray(m) || !Array.isArray(V) || m.length !== V.length) err("m et V doivent être deux tableaux de même longueur");
    return m.reduce((s, mi, i) => { nonneg(mi, "chaque masse"); V[i].forEach(c => finite(c, "vitesse")); return s + mi * dot(V[i], V[i]) / 2; }, 0);
  }
  function assemblage(m, X, o) {
    checkSystem(m, X);
    return m.map((_, k) => k === 0 ? 0 : epPaires(m.slice(0, k + 1), X.slice(0, k + 1), o).paires.filter(p => p.j === k).reduce((s, p) => s + p.ep, 0));
  }
  function forces(m, X, o) {
    checkSystem(m, X);
    const g = Gof(o), F = X.map(p => p.map(() => 0));
    for (let i = 0; i < m.length; i++) for (let j = i + 1; j < m.length; j++) {
      const d = sub(X[j], X[i]), r = norm(d);
      if (r === 0) err(`les points ${i} et ${j} sont confondus : force infinie`);
      const k = g * m[i] * m[j] / (r * r * r);
      d.forEach((c, q) => { F[i][q] += k * c; F[j][q] -= k * c; });     // troisième loi : la même paire, deux forces opposées
    }
    return F;
  }
  function nCorps(m, d, o) {
    if (!Number.isInteger(d) || d < 1 || d > 3) err("d, la dimension, vaut 1, 2 ou 3");
    m.forEach(q => positive(q, "chaque masse"));
    const N = m.length, split = x => Array.from({ length: N }, (_, i) => x.slice(i * d, i * d + d));
    return {
      a: (t, x) => forces(m, split(x), o).flatMap((F, i) => F.map(c => c / m[i])),
      energie: (x, v, opt) => {
        const Ec = ecSysteme(m, split(v)), Ep = epPaires(m, split(x), o).Ep * (opt && opt.double ? 2 : 1);
        return { Ec, Ep, E: Ec + Ep };
      },
    };
  }

  function troisEtoiles(f) {
    positive(f, "f");
    const MS = Cst.GM_sun / G, AU = Cst.au, YR = 365.25 * 86400, m = [MS, MS, MS / 2], sys = nCorps(m, 2);
    const vb = Math.sqrt(G * 2 * MS / AU) / 2, R3 = 6 * AU, v3 = f * Math.sqrt(G * 2.5 * MS / R3);
    const x = [-AU / 2, 0, AU / 2, 0, R3, 0], v = [0, -vb, 0, vb, 0, v3];
    const Mt = m[0] + m[1] + m[2], vc = [0, 1].map(q => (m[0] * v[q] + m[1] * v[2 + q] + m[2] * v[4 + q]) / Mt);
    const run = Integ.run("leapfrog", sys.a, { t: 0, x, v: v.map((c, i) => c - vc[i % 2]) }, 0.002 * YR, 10000, { every: 20 });
    return { m, sys, run };
  }

  /* ---------- corps étendus ----------
     Un anneau de la coquille, d'angle polaire θ (vu du centre, l'axe passant par le point P à la distance r) : chacun de ses
     éléments est à la distance s, s² = r² + a² − 2ar cos θ. Par symétrie, seule la composante le long de l'axe survit :
     dg = G dm (r − a cos θ)/s³ vers le centre ; dV = −G dm/s. Masse d'un anneau : dm = (M/2) d(cos θ). */
  function checkShell(M, a, r) { positive(M, "M"); positive(a, "le rayon"); nonneg(r, "r"); }
  function ringTerms(a, r, u) { const s2 = r * r + a * a - 2 * a * r * u, s = Math.sqrt(s2); return { g: (r - a * u) / (s2 * s), V: -1 / s }; }
  function coquille(M, a, r, o) {
    o = o || {}; checkShell(M, a, r);
    const regle = o.regle || "adaptatif", g0 = Gof(o) * M / 2;
    if (regle === "anneaux") {
      const n = o.n == null ? 200 : o.n;
      if (!Number.isInteger(n) || n < 1) err("n, le nombre d'anneaux, est un entier ≥ 1");
      let g = 0, V = 0;
      for (let k = 0; k < n; k++) {
        const t0 = Math.PI * k / n, t1 = Math.PI * (k + 1) / n, w = Math.cos(t0) - Math.cos(t1), T = ringTerms(a, r, Math.cos((t0 + t1) / 2));
        g += w * T.g; V += w * T.V;
      }
      return { g: g0 * g, V: g0 * V };
    }
    if (regle !== "adaptatif") err("règle inconnue « " + regle + " » (anneaux, adaptatif)");
    /* u = 1 − 2w², w ∈ [0, 1] : l'anneau le plus proche de P (u → 1) est étalé, et l'intégrande reste fini même pour r = a.
       Simpson adaptatif sur w, tolérance relative o.tol. */
    const tol = o.tol == null ? 1e-10 : o.tol;
    const f = w => { if (w === 0) return r === a ? [1 / (a * a), -2 / a] : [0, 0];   // r = a : 4w·(a − au)/s³ → 1/a², 4w·(−1/s) → −2/a
      const u = 1 - 2 * w * w, T = ringTerms(a, r, u), j = 4 * w; return [j * T.g, j * T.V]; };
    const simp = (fa, fm, fb, h) => fa.map((c, i) => h / 6 * (c + 4 * fm[i] + fb[i]));
    function rec(x0, x1, fa, fm, fb, whole, eps, depth) {
      const m = (x0 + x1) / 2, fl = f((x0 + m) / 2), fr = f((m + x1) / 2);
      const L = simp(fa, fl, fm, m - x0), R = simp(fm, fr, fb, x1 - m), S = L.map((c, i) => c + R[i]);
      if (depth > 22 || S.every((c, i) => Math.abs(c - whole[i]) <= 15 * eps[i])) return S.map((c, i) => c + (c - whole[i]) / 15);
      const e2 = eps.map(e => e / 2), A = rec(x0, m, fa, fl, fm, L, e2, depth + 1), B = rec(m, x1, fm, fr, fb, R, e2, depth + 1);
      return A.map((c, i) => c + B[i]);
    }
    const fa = f(0), fm = f(0.5), fb = f(1), whole = simp(fa, fm, fb, 1);
    const scale = [1 / (Math.max(r, a) ** 2), 1 / Math.max(r, a)];         // ordres de grandeur de ∫ : 2/max(r, a)², 2/max(r, a)
    const S = rec(0, 1, fa, fm, fb, whole, scale.map(c => c * tol), 0);
    return { g: g0 * S[0], V: g0 * S[1] };
  }
  function coquilleExacte(M, a, r, o) {
    checkShell(M, a, r);
    const GM = Gof(o) * M;
    return { g: r < a ? 0 : r === a ? GM / (2 * a * a) : GM / (r * r), V: -GM / Math.max(r, a) };
  }
  function boule(M, R, r, o) {
    o = o || {}; checkShell(M, R, r);
    const K = o.couches == null ? 200 : o.couches;
    if (!Number.isInteger(K) || K < 1) err("couches est un entier ≥ 1");
    /* deux paquets de K couches : sous r et au-dessus de r, pour qu'aucune couche ne contienne le point */
    const cut = o.coupe === false ? R : Math.min(r, R), bounds = [];
    for (let k = 0; k <= K; k++) bounds.push(cut * k / K);
    if (cut < R) for (let k = 1; k <= K; k++) bounds.push(cut + (R - cut) * k / K);
    let g = 0, V = 0;
    for (let k = 0; k + 1 < bounds.length; k++) {      // couche [r0, r1], masse ∝ volume, placée à son rayon moyen en volume
      const r0 = bounds[k], r1 = bounds[k + 1];
      if (r1 <= r0) continue;
      const dm = M * (r1 ** 3 - r0 ** 3) / R ** 3, a = Math.cbrt((r0 ** 3 + r1 ** 3) / 2);
      const c = coquille(dm, a, r, { G: o.G, tol: o.tol });
      g += c.g; V += c.V;
    }
    return { g, V };
  }
  function bouleExacte(M, R, r, o) {
    checkShell(M, R, r);
    const GM = Gof(o) * M;
    return r < R ? { g: GM * r / R ** 3, V: -GM * (3 * R * R - r * r) / (2 * R ** 3) } : { g: GM / (r * r), V: -GM / r };
  }
  /* disque mince, densité surfacique sigma, rayon R ; point sur l'axe à la hauteur z : anneaux de rayon ρ, dm = σ 2πρ dρ,
     composante axiale G dm z/(ρ² + z²)^{3/2}. Règle du milieu sur n anneaux équidistants. */
  function disque(sigma, R, z, o) {
    o = o || {}; positive(sigma, "sigma"); positive(R, "R"); positive(z, "z");
    const n = o.n == null ? 4000 : o.n, d = R / n;
    if (!Number.isInteger(n) || n < 1) err("n est un entier ≥ 1");
    let g = 0;
    for (let k = 0; k < n; k++) { const rho = (k + 0.5) * d; g += 2 * Math.PI * rho * d * z / Math.pow(rho * rho + z * z, 1.5); }
    return Gof(o) * sigma * g;
  }
  const disqueExact = (sigma, R, z, o) => { positive(sigma, "sigma"); positive(R, "R"); positive(z, "z"); return 2 * Math.PI * Gof(o) * sigma * (1 - z / Math.sqrt(z * z + R * R)); };
  const plan = (sigma, o) => { positive(sigma, "sigma"); return 2 * Math.PI * Gof(o) * sigma; };
  const epBoule = (M, R, o) => { positive(M, "M"); positive(R, "R"); return -3 * Gof(o) * M * M / (5 * R); };
  /* potentiel U = −GM/r [1 − J₂ (R/r)² P₂(sin φ)], P₂(s) = (3s² − 1)/2 ; champ radial gᵣ = GM/r² [1 − 3 J₂ (R/r)² P₂]. */
  function j2(r, lat, o) {
    o = o || {}; positive(r, "r"); finite(lat, "la latitude");
    const R = o.R == null ? Cst.R_E_eq : o.R, J = o.J2 == null ? J2_E : o.J2, s = Math.sin(lat);
    return -3 * J * (R / r) ** 2 * (3 * s * s - 1) / 2;
  }

  /* ---------- travail : l'intégrale curviligne ---------- */
  function travail(F, chemin, n) {
    n = n == null ? 1000 : n;
    if (!Number.isInteger(n) || n < 1) err("n, le nombre de segments, est un entier ≥ 1");
    let W = 0, p = chemin(0);
    for (let k = 1; k <= n; k++) {
      const q = chemin(k / n), dr = sub(q, p), L = norm(dr);
      if (L > 0) { const mid = p.map((c, i) => (c + q[i]) / 2), f = F(mid, dr.map(c => c / L)); f.forEach(c => finite(c, "F")); W += dot(f, dr); }
      p = q;
    }
    return W;
  }
  const longueur = (chemin, n) => travail((p, t) => t, chemin, n);    // ∫ t̂·dr = ∫ ds
  const CHAMPS = {
    poids: (m, g) => { positive(m, "m"); const gg = g == null ? Cst.g_CPGE : g; return () => [0, -m * gg]; },
    ressort: (k, O) => { positive(k, "k"); O = O || [0, 0]; return p => [-k * (p[0] - O[0]), -k * (p[1] - O[1])]; },
    tourbillon: k => { positive(k, "k"); return p => [-k * p[1], k * p[0]]; },
    frottement: f => { positive(f, "f"); return (p, t) => [-f * t[0], -f * t[1]]; },
  };
  const lerp = (A, B, s) => A.map((c, i) => c + s * (B[i] - c));
  const CHEMINS = {
    segment: (A, B) => s => lerp(A, B, s),
    equerre: (A, B) => { const C = [B[0], A[1]]; return s => s < 0.5 ? lerp(A, C, 2 * s) : lerp(C, B, 2 * s - 1); },
    arc: (A, B, b) => { const d = sub(B, A), L = norm(d), nrm = [-d[1] / L, d[0] / L]; return s => lerp(A, B, s).map((c, i) => c + b * Math.sin(Math.PI * s) * nrm[i]); },
    boucle: (c1, c2) => s => s < 0.5 ? c1(2 * s) : c2(2 - 2 * s),          // aller par c1, retour par c2 parcouru à l'envers
  };

  /* ---------- mouvement contraint : perle sur un fil y = h(x) ----------
     Abscisse curviligne s, ds = √(1 + h'²) dx. Le long du fil : s̈ = −g sin α − (μ |N|/m) signe(ẋ), sin α = h'/√(1 + h'²).
     Selon la normale n = (−h', 1)/√(1 + h'²) : N = m (g + h'' ẋ²)/√(1 + h'²) (N > 0 : le fil pousse vers le haut).
     D'où ẍ = (s̈ − h' h'' ẋ²/√(1 + h'²))/√(1 + h'²). Sans frottement : ẍ = −(g + h'' ẋ²) h'/(1 + h'²). */
  function bosses(H, L, B) {
    positive(H, "H"); positive(L, "L"); nonneg(B, "B");
    if (!(B < H)) err("la bosse doit être plus basse que les sommets");
    const k = 2 * Math.PI / L, w = L / 12, c = L / 2;
    const gau = x => B * Math.exp(-(((x - c) / w) ** 2));
    const h = x => H / 2 * (1 + Math.cos(k * x)) + gau(x);
    const d1 = x => -H / 2 * k * Math.sin(k * x) - 2 * (x - c) / (w * w) * gau(x);
    const d2 = x => -H / 2 * k * k * Math.cos(k * x) + (4 * (x - c) ** 2 / w ** 4 - 2 / (w * w)) * gau(x);
    let xmin = 0;                                                 // fond de la vallée de gauche
    for (let i = 1; i <= 1000; i++) { const x = c * i / 1000; if (h(x) < h(xmin)) xmin = x; }
    function xDepart(h0) {
      finite(h0, "h0");
      if (!(h0 > h(xmin) && h0 < H)) err("la hauteur de départ doit être entre le fond de la vallée et le sommet");
      let lo = 0, hi = xmin;                                      // h décroît de H au fond : bissection
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (h(m) > h0) lo = m; else hi = m; }
      return (lo + hi) / 2;
    }
    return { h, d1, d2, L, H, B, xmin, xDepart };
  }
  function perle(P, o) {
    o = Object.assign({ mu: 0, m: 1, dt: 2e-3, duree: 40, every: 10 }, o);
    nonneg(o.mu, "μ"); positive(o.m, "m"); positive(o.dt, "dt"); positive(o.duree, "la durée");
    const g = o.g == null ? Cst.g_CPGE : o.g, mu = o.mu, x0 = o.x0 != null ? o.x0 : P.xDepart(o.h0);
    const geom = (x, xd) => { const p = P.d1(x), q = P.d2(x), e = Math.sqrt(1 + p * p); return { p, q, e, N: (g + q * xd * xd) / e }; };
    const a = (t, x, v) => {
      const G1 = geom(x[0], v[0]), sdd = -g * G1.p / G1.e - mu * Math.abs(G1.N) * Math.sign(v[0]);
      return [(sdd - G1.p * G1.q * v[0] * v[0] / G1.e) / G1.e];
    };
    const n = Math.round(o.duree / o.dt), run = Integ.run("leapfrog", a, { t: 0, x: [x0], v: [0] }, o.dt, n, { vdep: true, every: 1 });
    const out = { t: [], x: [], y: [], v: [], Ec: [], Ep: [], Em: [], Wf: [], N: [], retour: null };
    let Wf = 0, prevP = 0;
    for (let i = 0; i < run.t.length; i++) {
      const x = run.x[i][0], xd = run.v[i][0], G1 = geom(x, xd), vt = xd * G1.e, Pf = -mu * Math.abs(G1.N) * o.m * Math.abs(vt);
      if (i) Wf += (Pf + prevP) / 2 * o.dt; prevP = Pf;
      if (out.retour == null && i > 1 && xd <= 0 && run.v[i - 1][0] > 0) out.retour = P.h(x);
      if (i % o.every && i !== run.t.length - 1) continue;
      const Ec = o.m * vt * vt / 2, Ep = o.m * g * P.h(x);
      out.t.push(run.t[i]); out.x.push(x); out.y.push(P.h(x)); out.v.push(vt);
      out.Ec.push(Ec); out.Ep.push(Ep); out.Em.push(Ec + Ep); out.Wf.push(Wf); out.N.push(o.m * G1.N);
    }
    return out;
  }

  const api = { G, J2_E, epPaires, ecSysteme, assemblage, forces, nCorps, troisEtoiles, coquille, coquilleExacte, boule, bouleExacte,
    disque, disqueExact, plan, epBoule, j2, travail, longueur, CHAMPS, CHEMINS, bosses, perle };
  if (node) module.exports = api;
  else root.Potentiel = api;
})(typeof self !== "undefined" ? self : this);

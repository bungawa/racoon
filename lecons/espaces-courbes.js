/* Calcul des leçons de l'étape « Espaces courbes » (Feynman II, §42-1 à §42-3) : géométrie mesurée de l'intérieur.
   Surfaces de courbure de Gauss K constante (K > 0 sphère, K = 0 plan ou cylindre, K < 0 selle), plaque chauffante,
   espace à trois dimensions de courbures sectionnelles principales K1, K2, K3, excès de rayon d'une boule de matière.
   SI : longueurs en m, courbures en m⁻², angles en rad, masses en kg. Pur, sans DOM, UMD (global EspacesCourbes). */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, G = Cst.G;

  const fini = (x, nom) => { if (!Number.isFinite(x)) throw new RangeError(nom + " : nombre fini attendu"); return x; };
  const positif = (x, nom) => { if (!(x > 0) || !Number.isFinite(x)) throw new RangeError(nom + " : nombre > 0 attendu"); return x; };

  /* ---------- surfaces de courbure constante ---------- */

  /* sin(√K r)/√K, prolongé à K ≤ 0 : la « fonction de rayon » des trois géométries (r pour K = 0, sinh pour K < 0) */
  function sK(r, K) {
    fini(r, "r"); fini(K, "K");
    const x = Math.sqrt(Math.abs(K)) * r;
    if (Math.abs(x) < 1e-4) return r * (1 - K * r * r / 6 + K * K * r ** 4 / 120);   // série, sans perte de chiffres
    return K > 0 ? Math.sin(x) / Math.sqrt(K) : Math.sinh(x) / Math.sqrt(-K);
  }
  const cK = (r, K) => { const x = Math.sqrt(Math.abs(K)) * r; return K > 0 ? Math.cos(x) : K < 0 ? Math.cosh(x) : 1; };

  /* périmètre mesuré d'un cercle de rayon mesuré r (distance sur la surface) : C = 2π sin(√K r)/√K */
  function perimetre(r, K) {
    if (!(r >= 0)) throw new RangeError("perimetre : r ≥ 0 attendu");
    if (K > 0 && r > Math.PI / Math.sqrt(K)) throw new RangeError("perimetre : sur la sphère, r ≤ πR");
    return 2 * Math.PI * sK(r, K);
  }
  /* (42.1) et (42.2) : rayon prédit par Euclide, puis excès de rayon */
  const rayonPredit = Cmes => Cmes / (2 * Math.PI);
  const excesRayon = (r, K) => r - rayonPredit(perimetre(r, K));
  /* loi des petits cercles : r³K/6, le premier terme de la série */
  const excesRayonPetit = (r, K) => K * r ** 3 / 6;

  /* triangle équilatéral de côté a : angle au sommet, par la loi des cosinus de la géométrie de courbure K */
  function angleEquilateral(a, K) {
    positif(a, "a");
    if (K > 0 && a >= 2 * Math.PI / (3 * Math.sqrt(K))) throw new RangeError("angleEquilateral : côté trop grand pour la sphère");
    if (Math.abs(K) * a * a < 1e-8) return Math.PI / 3 + Math.sqrt(3) * K * a * a / 12;   // développement en K a²
    const c = cK(a, K);
    return Math.acos(c / (1 + c));
  }
  /* somme des angles et aire du triangle (Gauss-Bonnet, K constante : somme − π = K × aire) */
  const sommeAngles = (a, K) => 3 * angleEquilateral(a, K);
  function aireEquilaterale(a, K) {
    if (Math.abs(K) * a * a < 1e-6) return Math.sqrt(3) / 4 * a * a * (1 + K * a * a / 8);   // limite plane, corrigée
    return (sommeAngles(a, K) - Math.PI) / K;
  }

  /* « carré » : quatre côtés de longueur L, trois virages à gauche de 90° ; distance du point d'arrivée au départ.
     Repère mobile (p, t, u) dans le plongement : sphère de rayon 1/√K dans R³, ou hyperboloïde de Minkowski pour K < 0.
     Le long d'une géodésique, p et t tournent dans leur plan et u reste fixe ; un virage à gauche envoie (t, u) sur (u, −t). */
  function ecartCarre(L, K) {
    positif(L, "L"); fini(K, "K");
    if (Math.abs(K) * L * L < 1e-8) return Math.abs(K) * L ** 3 * Math.SQRT1_2;   // premier ordre : |K| L³/√2
    const k = Math.sqrt(Math.abs(K)), th = k * L, s = K > 0 ? 1 : -1;
    const dot = (a, b) => s < 0 ? -a[0] * b[0] + a[1] * b[1] + a[2] * b[2] : a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    let p = [1, 0, 0], t = [0, 1, 0], u = [0, 0, 1];                    // pour K < 0, p est sur x0² − x1² − x2² = 1
    const p0 = p.slice();
    const co = s > 0 ? Math.cos(th) : Math.cosh(th), si = s > 0 ? Math.sin(th) : Math.sinh(th);
    for (let cote = 0; cote < 4; cote++) {
      const p1 = p.map((x, i) => x * co + t[i] * si);
      const t1 = p.map((x, i) => -s * x * si + t[i] * co);
      p = p1; t = t1;
      if (cote < 3) { const t2 = u, u2 = t.map(x => -x); t = t2; u = u2; }
    }
    const D = p.map((x, i) => x - p0[i]), corde = Math.sqrt(Math.max(0, dot(D, D)));   // corde, sans perte de chiffres
    return (s > 0 ? 2 * Math.asin(Math.min(1, corde / 2)) : 2 * Math.asinh(corde / 2)) / k;
  }

  /* ---------- la plaque chauffante ---------- */
  /* règle de longueur λ(ρ) = 1 + ρ²/(4R²) fois sa longueur au centre froid ; ρ : distance « vue d'en haut ».
     Cercle centré au point froid : rayon et périmètre mesurés avec les règles dilatées. */
  function plaqueCercle(rho, R) {
    if (!(rho >= 0)) throw new RangeError("plaqueCercle : ρ ≥ 0 attendu");
    positif(R, "R");
    const lambda = 1 + rho * rho / (4 * R * R);
    return { lambda, rMes: 2 * R * Math.atan(rho / (2 * R)), C: 2 * Math.PI * rho / lambda };
  }
  /* la distance vue d'en haut qui donne un rayon mesuré r */
  const plaqueRho = (r, R) => 2 * R * Math.tan(r / (2 * R));

  /* ---------- espace à trois dimensions ---------- */
  /* courbure sectionnelle du plan de normale n (unitaire) : K(n) = K1 n1² + K2 n2² + K3 n3² (repère principal) */
  function courbureSection(K, n) {
    const N = Math.hypot(n[0], n[1], n[2]);
    if (!(N > 0)) throw new RangeError("courbureSection : normale non nulle attendue");
    return (K[0] * n[0] ** 2 + K[1] * n[1] ** 2 + K[2] * n[2] ** 2) / (N * N);
  }
  const normale = (theta, phi) => [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)];
  /* (42.2u) excès de rayon d'un petit cercle de rayon r, plan de normale n ; (42.2v) d'une petite sphère */
  const excesCercle3d = (K, n, r) => courbureSection(K, n) * r ** 3 / 6;
  const excesSphere3d = (K, r) => (K[0] + K[1] + K[2]) * r ** 3 / 18;
  const courbureScalaire = K => 2 * (K[0] + K[1] + K[2]);
  /* espace à courbure constante K (« 3-sphère » de rayon 1/√K) : excès exact d'une sphère de rayon mesuré r */
  const excesSphereConstante = (r, K) => r - sK(r, K);

  /* courbures principales au repos : dans une boule homogène, isotrope ; dehors, à la distance r d'une masse M
     (géométrie spatiale de Schwarzschild, exacte en r aréolaire : K = (1 − f)/r² et −f′/(2r), f = 1 − 2GM/(c²r)) :
     +2 pour le plan perpendiculaire au rayon, −1 pour les plans qui le contiennent, en unités de GM/(c²r³). Normale 3 : la verticale. */
  const courburesBoule = rho => { positif(rho, "ρ"); const k = 8 * Math.PI * G * rho / (3 * C * C); return [k, k, k]; };
  const courburesDehors = (GM, r) => { const k = positif(GM, "GM") / (C * C * positif(r, "r") ** 3); return [-k, -k, 2 * k]; };

  /* ---------- excès de rayon d'un astre ---------- */
  /* (42.3) : r_mes − √(A/4π) = G M/(3c²), boule homogène, premier ordre ; avec GM pour garder les chiffres */
  const excesEinstein = GM => positif(GM, "GM") / (3 * C * C);
  /* (42.3p) : boule homogène, exact (intérieur de Schwarzschild) : r_mes = √(R³/r_s) arcsin √(r_s/R) */
  function rayonMesureHomogene(GM, R) {
    positif(R, "R");
    const rs = 2 * positif(GM, "GM") / (C * C), x = rs / R;
    if (!(x < 1)) throw new RangeError("rayonMesureHomogene : r_s < R attendu");
    if (x < 1e-6) return R * (1 + x / 6 + 3 * x * x / 40);
    return Math.sqrt(R ** 3 / rs) * Math.asin(Math.sqrt(x));
  }
  /* l'excès lui-même, r_mes − R, sans soustraire deux grands nombres quand r_s ≪ R */
  function excesHomogene(GM, R) {
    positif(R, "R");
    const x = 2 * positif(GM, "GM") / (C * C) / R;
    return x < 1e-4 ? R * x * (1 / 6 + 3 * x / 40 + 5 * x * x / 112) : rayonMesureHomogene(GM, R) - R;
  }
  /* (42.3q) : profil quelconque, premier ordre : r_mes − R = (G/c²) ∫₀^R m(r)/r dr ; m(r) en kg, Simpson */
  function excesProfil(m, R, n) {
    positif(R, "R"); n = n || 2000; if (n % 2) n++;
    const f = r => r > 0 ? m(r) / r : 0;
    const h = R / n; let s = f(0) + f(R);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(i * h);
    return G / (C * C) * s * h / 3;
  }
  /* deux couches homogènes : noyau de rayon a et de masse Mn, manteau jusqu'à R, masse totale M */
  function masseDeuxCouches(M, R, Mn, a) {
    positif(M, "M"); positif(R, "R"); positif(a, "a");
    if (!(a < R) || !(Mn > 0 && Mn < M)) throw new RangeError("masseDeuxCouches : 0 < a < R et 0 < Mn < M attendus");
    const Mm = M - Mn, vm = R ** 3 - a ** 3;
    return r => r <= a ? Mn * (r / a) ** 3 : r >= R ? M : Mn + Mm * (r ** 3 - a ** 3) / vm;
  }
  /* (42.3r) : somme des trois courbures principales dans la matière, K1 + K2 + K3 = 8πGρ/c² */
  const sommeCourbures = rho => 8 * Math.PI * G * rho / (C * C);

  const api = { sK, perimetre, rayonPredit, excesRayon, excesRayonPetit, angleEquilateral, sommeAngles, aireEquilaterale,
    ecartCarre, plaqueCercle, plaqueRho, courbureSection, normale, excesCercle3d, excesSphere3d, courbureScalaire,
    excesSphereConstante, courburesBoule, courburesDehors, excesEinstein, rayonMesureHomogene, excesHomogene, excesProfil, masseDeuxCouches,
    sommeCourbures };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.EspacesCourbes = api;
})(typeof self !== "undefined" ? self : this);

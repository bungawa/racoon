/* Solide — un corps étendu modélisé par des points matériels : masse, centre de masse, moment d'inertie, moment cinétique,
   énergie cinétique. Partagé par les étapes « Centre de masse et rotation plane » et « Moment d'inertie et énergie de rotation »
   (Feynman I.18 et I.19). Pur, sans DOM, UMD (global Solide). SI partout.

   Corps   tableau de points { m, r, v? } : m > 0 (kg), r et v vecteurs de 1 à 3 composantes (m, m·s⁻¹), complétés par des
           zéros jusqu'à 3. v absent = point immobile.
   API
     masse(c)                     M = Σ mᵢ.
     centreDeMasse(c)             r_G = Σ mᵢ rᵢ / M, 3 composantes.
     vitesseCentre(c)             v_G = Σ mᵢ vᵢ / M = P/M.
     momentInertie(c, axe)        I = Σ mᵢ dᵢ², dᵢ distance de rᵢ à l'axe { point, dir } (défaut : axe Oz).
     momentCinetique(c, O)        L_O = Σ (rᵢ − O) × mᵢ vᵢ, 3 composantes (défaut O = origine).
     energieCinetique(c)          Σ ½ mᵢ vᵢ².
     tourner(c, omega, centre)    le même corps, chaque point avec la vitesse d'une rotation d'ensemble ω autour de l'axe
                                  parallèle à Oz passant par centre : vᵢ = ω ẑ × (rᵢ − centre).
     Corps continus (I.19), voir plus bas : momentPoids, halteres, profil/fil et Guldin, inertie et huygens, tigePoints,
     plaquePoints, energieRotation, tabouret, roulement.
   Les erreurs lèvent un message en français : elles signalent un appel faux. */
(function (root) {
  const err = m => { throw new Error("solide: " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); };
  const v3 = (a, nom) => {
    if (a === undefined) return [0, 0, 0];
    if (!Array.isArray(a) || a.length < 1 || a.length > 3) err(nom + " : vecteur de 1 à 3 composantes");
    a.forEach(q => fini(q, nom)); return [a[0], a[1] || 0, a[2] || 0];
  };
  const sous = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const croix = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const scal = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  function points(c) {
    if (!Array.isArray(c) || !c.length) err("un corps est une liste non vide de points { m, r, v }");
    return c.map((p, i) => {
      fini(p && p.m, "la masse du point " + i); if (p.m <= 0) err("la masse du point " + i + " doit être positive");
      return { m: p.m, r: v3(p.r, "r du point " + i), v: v3(p.v, "v du point " + i) };
    });
  }
  const masse = c => points(c).reduce((s, p) => s + p.m, 0);
  function moyenne(c, k) {
    const P = points(c), M = P.reduce((s, p) => s + p.m, 0);
    return [0, 1, 2].map(j => P.reduce((s, p) => s + p.m * p[k][j], 0) / M);
  }
  const centreDeMasse = c => moyenne(c, "r");
  const vitesseCentre = c => moyenne(c, "v");
  function momentInertie(c, axe) {
    const a = axe || {}, A = v3(a.point || [0, 0, 0], "point de l'axe"), u = v3(a.dir || [0, 0, 1], "direction de l'axe");
    const n = Math.hypot(...u); if (n === 0) err("la direction de l'axe ne peut pas être nulle");
    const e = u.map(q => q / n);
    return points(c).reduce((s, p) => { const d = croix(sous(p.r, A), e); return s + p.m * scal(d, d); }, 0);
  }
  function momentCinetique(c, O) {
    const o = v3(O || [0, 0, 0], "O");
    return points(c).reduce((L, p) => { const l = croix(sous(p.r, o), p.v.map(q => p.m * q)); return [L[0] + l[0], L[1] + l[1], L[2] + l[2]]; }, [0, 0, 0]);
  }
  const energieCinetique = c => points(c).reduce((s, p) => s + 0.5 * p.m * scal(p.v, p.v), 0);
  function tourner(c, omega, centre) {
    fini(omega, "ω"); const C = v3(centre || [0, 0, 0], "centre");
    return points(c).map(p => ({ m: p.m, r: p.r, v: croix([0, 0, omega], sous(p.r, C)) }));
  }


  /* ---------- corps continus (étape « Moment d'inertie et énergie de rotation », Feynman I.19) ----------
     Chaque fonction est un modèle : son domaine est dans le commentaire. g est passé, ou pris dans Constantes (g_CPGE). */
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const gDe = g => {
    if (g !== undefined) return positif(g, "g");
    const C = typeof module !== "undefined" && module.exports ? require("./constantes.js") : root.Constantes;
    if (!C) err("charger constantes.js, ou passer g"); return C.g_CPGE;
  };

  /* (19.3) moment du poids autour de l'axe parallèle à Oz passant par O, champ uniforme g dirigé vers −y :
     τ_z = Σ (xᵢ − x_O)(−mᵢ g). Somme point par point ; elle vaut −M g (x_G − x_O), nulle si O est à la verticale de G. */
  function momentPoids(c, O, g) {
    const o = v3(O || [0, 0, 0], "O"), gg = gDe(g);
    return points(c).reduce((s, p) => s - p.m * gg * (p.r[0] - o[0]), 0);
  }

  /* Centre de gravité et centre de masse : haltère de deux masses m à ±L/2 de son centre G, G à la distance R du centre d'un
     astre de paramètre GM, axe de l'haltère incliné de α sur la verticale. Champ exact en GM/r², aucun développement.
     Renvoie le moment des forces autour de G (τ), la norme de la force (F) et d = |τ|/F, distance de G à la ligne d'action du
     poids. Champ uniforme : d = 0. Au premier ordre en L/R : d ≈ (3/8)(L²/R) sin 2α (approx). */
  function halteres(m, L, R, alpha, GM) {
    positif(m, "m"); positif(L, "L"); positif(R, "R"); fini(alpha, "α"); positif(GM, "GM");
    if (!(L < 2 * R)) err("l'haltère doit rester hors du centre de l'astre (L < 2R)");
    const s = [L / 2 * Math.sin(alpha), L / 2 * Math.cos(alpha)];
    let tau = 0, Fx = 0, Fy = 0;
    for (const e of [1, -1]) {
      const x = e * s[0], y = R + e * s[1], r = Math.hypot(x, y), k = -GM * m / (r * r * r);
      const fx = k * x, fy = k * y; Fx += fx; Fy += fy; tau += e * s[0] * fy - e * s[1] * fx;
    }
    const F = Math.hypot(Fx, Fy);
    return { tau, F, d: Math.abs(tau) / F, approx: 3 / 8 * L * L / R * Math.abs(Math.sin(2 * alpha)) };
  }

  /* Profils plans pour les théorèmes de Guldin. u est la distance au bord tourné vers l'axe (0 ≤ u ≤ largeur) ;
     h(u) la longueur de la corde parallèle à l'axe à cette distance. aire et uG (centre de masse) en formules fermées.
       rectangle(a, b)  côté b parallèle à l'axe, largeur a.
       triangle(D, H)   triangle rectangle, côté H sur le bord tourné vers l'axe, base D : uG = D/3 (§19-2).
       demiDisque(r)    diamètre sur le bord tourné vers l'axe : uG = 4r/(3π) (§19-2).
       disque(r)        uG = r (tore). */
  const PROFILS = {
    rectangle: (a, b) => ({ largeur: a, aire: a * b, uG: a / 2, h: () => b }),
    triangle: (D, H) => ({ largeur: D, aire: D * H / 2, uG: D / 3, h: u => H * (1 - u / D) }),
    demiDisque: r => ({ largeur: r, aire: Math.PI * r * r / 2, uG: 4 * r / (3 * Math.PI), h: u => 2 * Math.sqrt(Math.max(0, r * r - u * u)) }),
    disque: r => ({ largeur: 2 * r, aire: Math.PI * r * r, uG: r, h: u => 2 * Math.sqrt(Math.max(0, r * r - (u - r) * (u - r))) }),
  };
  /* Courbes (fils) pour le premier théorème : longueur et uG.
       demiCercle(r)  diamètre sur l'axe (bord tourné vers l'axe) : uG = 2r/π.   segment(a)  perpendiculaire à l'axe.
       cercle(r)      uG = r. */
  const FILS = {
    demiCercle: r => ({ largeur: r, longueur: Math.PI * r, uG: 2 * r / Math.PI }),
    segment: a => ({ largeur: a, longueur: a, uG: a / 2 }),
    cercle: r => ({ largeur: 2 * r, longueur: 2 * Math.PI * r, uG: r }),
  };
  function forme(table, quoi, nom, dims) {
    if (!Object.prototype.hasOwnProperty.call(table, nom)) err(quoi + " inconnu : " + nom);
    if (dims.length !== table[nom].length) err(nom + " attend " + table[nom].length + " dimension(s)");
    dims.forEach((x, i) => positif(x, "la dimension " + (i + 1) + " de " + nom));
    return Object.assign({ nom }, table[nom](...dims));
  }
  const profil = (nom, ...dims) => forme(PROFILS, "profil", nom, dims);
  const fil = (nom, ...dims) => forme(FILS, "fil", nom, dims);
  /* d : distance de l'axe au bord tourné vers lui. d < 0 : l'axe coupe la figure, Guldin ne s'applique plus. */
  const distance = d => { fini(d, "d"); if (d < 0) err("l'axe coupe la figure : les théorèmes de Guldin supposent l'axe hors de la figure (d ≥ 0)"); return d; };
  /* second théorème : V = A · 2π (d + uG). Exact pour une figure plane d'un seul côté de l'axe. */
  const volumeGuldin = (p, d) => p.aire * 2 * Math.PI * (distance(d) + p.uG);
  /* premier théorème : S = longueur · 2π (d + uG). Exact pour une courbe plane d'un seul côté de l'axe. */
  const surfaceGuldin = (f, d) => f.longueur * 2 * Math.PI * (distance(d) + f.uG);
  /* le même volume sans passer par le centre de masse : coquilles cylindriques de rayon d + u et de hauteur h(u),
     somme du milieu sur n tranches. Converge vers le volume exact quand n grandit. */
  function volumeCoquilles(p, d, n) {
    distance(d); n = n || 2000; if (!(Number.isInteger(n) && n > 0)) err("n doit être un entier positif");
    const du = p.largeur / n; let V = 0;
    for (let i = 0; i < n; i++) { const u = (i + 0.5) * du; V += 2 * Math.PI * (d + u) * p.h(u) * du; }
    return V;
  }
  /* aire et centre de masse d'un profil par la somme du milieu sur n tranches : vérifie les formules fermées. */
  function centroide(p, n) {
    n = n || 2000; const du = p.largeur / n; let A = 0, Au = 0;
    for (let i = 0; i < n; i++) { const u = (i + 0.5) * du, a = p.h(u) * du; A += a; Au += u * a; }
    return { aire: A, uG: Au / A };
  }

  /* Moments d'inertie de corps homogènes autour d'un axe passant par G, divisés par M (Feynman, tableaux 19-1 et 19-2).
       tige(L)                 tige mince, axe perpendiculaire en son milieu : L²/12 (19.6)
       tigeBout(L)             la même, axe à un bout : L²/3 (19.5) — seul axe qui ne passe pas par G
       plaque(a, b)            plaque mince a × b, axe perpendiculaire en son centre : (a² + b²)/12
       disque(r)               disque ou cylindre plein, axe de révolution : r²/2
       anneau(r1, r2)          cylindre creux de rayons r1 < r2, axe de révolution : (r1² + r2²)/2 ; r1 → r2 : cerceau, r²
       sphere(r)               boule pleine : 2r²/5
       sphereCreuse(r)         coquille sphérique mince : 2r²/3
       cylindreTransverse(r, L) cylindre plein, axe perpendiculaire en son centre : r²/4 + L²/12
     Modèle : corps homogène et rigide ; « mince » veut dire épaisseur négligée devant les autres dimensions. */
  const INERTIE = {
    tige: L => L * L / 12, tigeBout: L => L * L / 3, plaque: (a, b) => (a * a + b * b) / 12, disque: r => r * r / 2,
    anneau: (r1, r2) => { if (r1 > r2) err("anneau : r1 ≤ r2"); return (r1 * r1 + r2 * r2) / 2; },
    sphere: r => 2 * r * r / 5, sphereCreuse: r => 2 * r * r / 3, cylindreTransverse: (r, L) => r * r / 4 + L * L / 12,
  };
  /* inertie(nom, M, ...dims) → I_G en kg·m² */
  function inertie(nom, M, ...dims) {
    positif(M, "M");
    if (!Object.prototype.hasOwnProperty.call(INERTIE, nom)) err("corps inconnu : " + nom);
    if (dims.length !== INERTIE[nom].length) err(nom + " attend " + INERTIE[nom].length + " dimension(s)");
    dims.forEach((x, i) => positif(x, "la dimension " + (i + 1) + " de " + nom));
    return M * INERTIE[nom](...dims);
  }
  /* (19.7) théorème de Huygens (axes parallèles) : I = I_G + M d², d distance entre l'axe et l'axe parallèle passant par G.
     Exact pour tout corps ; I_G doit être pris autour de l'axe qui passe par G, pas autour d'un autre. */
  const huygens = (IG, M, d) => { fini(IG, "I_G"); if (IG < 0) err("I_G ≥ 0"); positif(M, "M"); fini(d, "d"); return IG + M * d * d; };

  /* Corps discrétisés en points égaux au centre de cellules égales, pour comparer une somme à une formule.
       tigePoints(M, L, n)       n points sur Ox, centrés en 0 : Σ donne M L²/12 · (1 − 1/n²).
       plaquePoints(M, a, b, n)  n × n points dans le plan Oxy, centrés en 0. */
  function tigePoints(M, L, n) {
    positif(M, "M"); positif(L, "L"); if (!(Number.isInteger(n) && n > 0)) err("n doit être un entier positif");
    return Array.from({ length: n }, (_, i) => ({ m: M / n, r: [-L / 2 + (i + 0.5) * L / n, 0] }));
  }
  function plaquePoints(M, a, b, n) {
    positif(M, "M"); positif(a, "a"); positif(b, "b"); if (!(Number.isInteger(n) && n > 0)) err("n doit être un entier positif");
    const c = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c.push({ m: M / (n * n), r: [-a / 2 + (i + 0.5) * a / n, -b / 2 + (j + 0.5) * b / n] });
    return c;
  }

  /* (19.8) énergie cinétique de rotation autour d'un axe fixe : T = ½ I ω². Exacte pour un solide rigide ; I autour de cet axe. */
  const energieRotation = (I, w) => { fini(I, "I"); if (I < 0) err("I ≥ 0"); fini(w, "ω"); return 0.5 * I * w * w; };
  /* Tabouret tournant : I passe de I1 à I2 sans moment extérieur sur l'axe, donc L = I ω se conserve (frottement du pivot
     négligé). ω2 = ω1 I1/I2 ; T2/T1 = I1/I2 ; travail fourni par les bras = T2 − T1 (positif quand on ramène les masses). */
  function tabouret(I1, w1, I2) {
    positif(I1, "I1"); fini(w1, "ω1"); positif(I2, "I2");
    const w2 = w1 * I1 / I2, T1 = energieRotation(I1, w1), T2 = energieRotation(I2, w2);
    return { w2, T1, T2, travail: T2 - T1, L: I1 * w1 };
  }

  /* Roulement sans glissement sur un plan incliné de θ, lâché sans vitesse, parcours L. Corps de révolution de rayon de
     roulement R, I_G = k M R² (k = I_G/(M R²) : sans dimension, indépendant de M et R).
     a = g (sin θ − C_r cos θ)/(1 + k), t = √(2L/a), v = √(2aL) ; énergie de rotation / énergie cinétique = k/(1 + k) ;
     frottement statique minimal pour ne pas glisser μ_min = k tan θ/(1 + k) (sans résistance au roulement).
     C_r : coefficient de résistance au roulement (0 par défaut), modèle d'une force C_r M g cos θ opposée au mouvement.
     k = 0 : glissement sans aucun frottement. Domaine : corps rigide, plan rigide, μ ≥ μ_min, air négligé. */
  const KAPPA = { glissement: 0, sphere: 2 / 5, cylindre: 1 / 2, sphereCreuse: 2 / 3, cerceau: 1 };
  /* cylindre creux de rayons r1 < r2 roulant sur r2 : k = (1 + ρ²)/2, ρ = r1/r2 ∈ [0, 1] */
  const kappaCylindreCreux = rho => { fini(rho, "ρ"); if (rho < 0 || rho > 1) err("ρ = r1/r2 doit être entre 0 et 1"); return (1 + rho * rho) / 2; };
  function roulement(k, theta, L, g, Cr) {
    fini(k, "k"); if (k < 0) err("k ≥ 0"); fini(theta, "θ"); if (!(theta > 0 && theta < Math.PI / 2)) err("θ doit être entre 0 et π/2 (exclus)");
    positif(L, "L"); const gg = gDe(g), cr = Cr === undefined ? 0 : Cr; fini(cr, "C_r"); if (cr < 0) err("C_r ≥ 0");
    const a = gg * (Math.sin(theta) - cr * Math.cos(theta)) / (1 + k);
    const ok = a > 0;
    return { a, t: ok ? Math.sqrt(2 * L / a) : Infinity, v: ok ? Math.sqrt(2 * a * L) : 0,
      partRotation: k / (1 + k), muMin: k * Math.tan(theta) / (1 + k) };
  }

  const api = Object.freeze({ masse, centreDeMasse, vitesseCentre, momentInertie, momentCinetique, energieCinetique, tourner,
    momentPoids, halteres, PROFILS: Object.keys(PROFILS), FILS: Object.keys(FILS), profil, fil, volumeGuldin, surfaceGuldin, volumeCoquilles, centroide,
    INERTIE: Object.keys(INERTIE), inertie, huygens, tigePoints, plaquePoints, energieRotation, tabouret, KAPPA: Object.freeze(Object.assign({}, KAPPA)),
    kappaCylindreCreux, roulement });
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Solide = api;
})(typeof self !== "undefined" ? self : this);

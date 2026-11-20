/* Fluides — le module commun du monde « Mécanique des fluides ». Pur, sans DOM, UMD (global Fluides). SI partout.
   Ouvert par l'étape « Statique des fluides » ; les étapes suivantes du monde l'étendent (une section par étape, ajoutée
   à la fin, sans toucher aux précédentes). Seule dépendance : constantes.js. L'étape « Le fluide parfait », qui a besoin
   d'AnaVec et d'Integ, est dans son propre module, fluides-parfait.js. Chaque fonction est un modèle : son domaine est dans
   son commentaire.
   Les erreurs lèvent un message en français : elles signalent un appel faux.

   Données
     RHO                        masses volumiques de référence (kg·m⁻³), chacune avec sa source dans le commentaire.
     K                          modules de compressibilité des liquides (Pa).
     ISO2533                    constantes et couches de l'atmosphère type ISO 2533:1975.
   Statique (étape « Statique des fluides »)
     pressionProfondeur(h, o)   p = p0 + ρ g h : fluide incompressible et homogène, h profondeur sous la surface (m).
     resultanteRectangle(o)     force d'un liquide sur une paroi verticale rectangulaire, et profondeur du centre de poussée.
     hauteurEchelle(T, o)       H = R T/(M g), la longueur sur laquelle une atmosphère isotherme perd un facteur e.
     atmIsotherme(z, o)         p, ρ et densité moléculaire n à l'altitude z, atmosphère isotherme de gaz parfait.
     ecartIncompressible(dz, H) erreur relative de Δp = ρ0 g Δz contre la loi exponentielle, sur une hauteur Δz.
     geopotentielle(z), geometrique(H)   altitudes ISO 2533 (rayon nominal r).
     atmStandard(H)             T, p, ρ de l'atmosphère type à l'altitude géopotentielle H, de −2 km à 80 km.
     poussee(V, o)              poussée d'Archimède ρ g V sur un volume immergé V.
     fractionImmergee(ρc, ρf)   fraction du volume d'un corps flottant qui est immergée (1 s'il coule).
     ludion(o, h), ludionCritique(o)   un ludion : force verticale nette à la profondeur h, et seuil de flottaison. */
(function (root) {
  const C = typeof module !== "undefined" && module.exports ? require("./constantes.js") : root.Constantes;
  const err = m => { throw new Error("fluides: " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const opt = (o, k, def, nom) => (o && o[k] !== undefined ? fini(o[k], nom || k) : def);

  /* ---------- données ---------- */
  const RHO = Object.freeze({
    eau: 1000,          // eau douce : 999,84 à 0 °C, 999,97 à 4 °C, 997,05 à 25 °C (tables usuelles) : 1 000 à 0,3 % près
    eauDeMer: 1027,     // eau de mer en surface, valeur moyenne (BioNumbers 108511)
    mercure: 13595.1,   // à 0 °C : la valeur conventionnelle du millimètre de mercure (133,322 Pa avec g0)
    glace: 916.7,       // glace Ih à 0 °C et 1 atm (Ginnings et Corruccini, cités par J. Glaciol.)
    air: 1.225,         // air de l'atmosphère type au niveau de la mer, 288,15 K et 101 325 Pa (ISO 2533:1975)
  });

  /* modules de compressibilité K = ρ (∂p/∂ρ) (Pa), pour chiffrer l'hypothèse « incompressible » : Δρ/ρ ≈ Δp/K */
  const K = Object.freeze({
    eau: 2.2e9,         // eau, conditions ordinaires ; K croît avec la pression
    mercure: 2.85e10,   // adiabatique, ρ c² avec c = 1 450 m·s⁻¹ (Ayrinhac et al., 2014) ; l'isotherme est un peu plus faible
  });

  /* ISO 2533:1975, Standard Atmosphere (confirmée en 2024), tableaux 1 et 4 : identique aux atmosphères types de l'OACI
     et de l'OMM de −2 à 32 km. Ses propres constantes (R* = 8 314,32 J·K⁻¹·kmol⁻¹, d'avant 2019) servent à reproduire
     ses tables ; l'écart avec R exact (2019) est de 1,7 × 10⁻⁵ en relatif. Couches : [H de base (m), T de base (K), β (K·m⁻¹)]. */
  const ISO2533 = Object.freeze({
    p0: C.atm, T0: 288.15, rho0: 1.225, g0: C.g0, M: 0.02896442, Rstar: 8.31432, r: 6356766,
    couches: Object.freeze([[-2000, 301.15, -0.0065], [11000, 216.65, 0], [20000, 216.65, 0.001], [32000, 228.65, 0.0028],
      [47000, 270.65, 0], [51000, 270.65, -0.0028], [71000, 214.65, -0.002], [80000, 196.65, 0]].map(Object.freeze)),
  });

  /* ---------- statique ---------- */

  /* p(h) = p0 + ρ g h. Modèle : fluide au repos, incompressible et homogène, g uniforme. Pour l'eau, la compressibilité
     (module 2,2 GPa) donne Δρ/ρ = ρ g h/K : 0,5 % à 1 000 m. h peut être négatif (au-dessus de la surface de référence). */
  function pressionProfondeur(h, o) {
    fini(h, "la profondeur h");
    const rho = positif(opt(o, "rho", RHO.eau, "ρ"), "ρ"), g = positif(opt(o, "g", C.g0, "g"), "g"), p0 = opt(o, "p0", C.atm, "p0");
    return p0 + rho * g * h;
  }

  /* Paroi verticale rectangulaire de largeur b, mouillée entre les profondeurs h1 et h2 (0 ≤ h1 < h2), pression relative
     (p0 s'exerce des deux côtés et s'annule). F = ρ g b (h2² − h1²)/2 ; centre de poussée à la profondeur
     (2/3)(h2³ − h1³)/(h2² − h1²), plus bas que le milieu. Même modèle que pressionProfondeur. */
  function resultanteRectangle(o) {
    const b = positif(o && o.b, "la largeur b"), h1 = opt(o, "h1", 0, "h1"), h2 = fini(o.h2, "h2");
    if (h1 < 0 || !(h2 > h1)) err("il faut 0 ≤ h1 < h2");
    const rho = positif(opt(o, "rho", RHO.eau, "ρ"), "ρ"), g = positif(opt(o, "g", C.g0, "g"), "g");
    const F = rho * g * b * (h2 * h2 - h1 * h1) / 2, zc = (2 / 3) * (h2 ** 3 - h1 ** 3) / (h2 * h2 - h1 * h1);
    return { F, zc, moment: F * (h2 - zc) };        // moment autour du pied de la paroi (profondeur h2), N·m
  }

  /* H = R T/(M g). Air : M de l'ISO 2533 par défaut. 8,4 km à 288 K, 6,3 km à 217 K. */
  function hauteurEchelle(T, o) {
    positif(T, "la température T");
    return C.R * T / (positif(opt(o, "M", ISO2533.M, "M"), "M") * positif(opt(o, "g", C.g0, "g"), "g"));
  }

  /* Atmosphère isotherme, gaz parfait, g uniforme : p = p0 exp(−z/H), ρ = p M/(R T), n = p/(k_B T) = n0 exp(−M g z/(R T)),
     le facteur de Boltzmann exp(−m g z/(k_B T)) d'une molécule de masse m = M/N_A. Modèle : la vraie troposphère
     se refroidit de 6,5 K par km ; à T = 288,15 K, la pression dépasse celle de l'atmosphère type de 1,3 % à 3 km,
     3,6 % à 5 km, 21 % à 11 km. */
  function atmIsotherme(z, o) {
    fini(z, "l'altitude z");
    const T = positif(opt(o, "T", ISO2533.T0, "T"), "T"), M = positif(opt(o, "M", ISO2533.M, "M"), "M");
    const p0 = positif(opt(o, "p0", C.atm, "p0"), "p0"), H = hauteurEchelle(T, { M, g: opt(o, "g", C.g0, "g") });
    const p = p0 * Math.exp(-z / H);
    return { p, rho: p * M / (C.R * T), n: p / (C.k_B * T), H };
  }

  /* Sur une hauteur Δz, la loi linéaire Δp = ρ0 g Δz (air traité comme incompressible) contre l'exacte p0 (1 − e^(−Δz/H)) :
     erreur relative x/(1 − e^(−x)) − 1 ≈ x/2 avec x = Δz/H. Exacte comme comparaison des deux modèles isothermes. */
  function ecartIncompressible(dz, H) {
    fini(dz, "Δz"); positif(H, "H");
    const x = Math.abs(dz) / H;
    return x < 1e-6 ? x / 2 : x / -Math.expm1(-x) - 1;
  }

  /* Altitude géopotentielle H = r z/(r + z) et inverse (ISO 2533, éq. 8 et 9) : à 11 km, z − H = 19 m. */
  const geopotentielle = z => { fini(z, "z"); return ISO2533.r * z / (ISO2533.r + z); };
  const geometrique = H => { fini(H, "H"); if (!(H < ISO2533.r)) err("H trop grand"); return ISO2533.r * H / (ISO2533.r - H); };

  /* Atmosphère type ISO 2533 à l'altitude géopotentielle H (m), de −2 000 à 80 000 m : T linéaire par couches,
     p par l'équation de la statique intégrée dans chaque couche, ρ = p M/(R* T). C'est une convention, pas une mesure :
     l'atmosphère réelle s'en écarte de quelques kelvins au sol selon la saison et la latitude. */
  function atmStandard(H) {
    fini(H, "l'altitude H");
    const S = ISO2533, L = S.couches;
    if (H < L[0][0] || H > L[L.length - 1][0]) err("l'atmosphère type va de −2 000 à 80 000 m géopotentiels");
    const k = S.g0 * S.M / S.Rstar;                                   // K·m⁻¹
    const pAt = (b, pb, Hx) => { const [Hb, Tb, beta] = L[b], d = Hx - Hb;
      return beta === 0 ? pb * Math.exp(-k * d / Tb) : pb * Math.pow(1 + beta * d / Tb, -k / beta); };
    /* pression de base de chaque couche ; la première a sa base à −2 km, sous H = 0 où p = p0 et T = T0 */
    const pb = [S.p0 * Math.pow(L[0][1] / S.T0, -k / L[0][2])];
    for (let b = 1; b < L.length; b++) pb[b] = pAt(b - 1, pb[b - 1], L[b][0]);
    let b = L.length - 1; while (b > 0 && H < L[b][0]) b--;
    const T = L[b][1] + L[b][2] * (H - L[b][0]), p = pAt(b, pb[b], H);
    return { T, p, rho: p * S.M / (S.Rstar * T) };
  }

  /* Poussée d'Archimède Π = ρ g V, verticale vers le haut, appliquée au centre du volume immergé. Modèle : fluide au repos
     dans un référentiel galiléen, g uniforme, corps entièrement entouré de fluide sur sa partie immergée (un corps posé à
     plat sur le fond, sans fluide dessous, ne la reçoit pas). */
  function poussee(V, o) {
    fini(V, "le volume V"); if (V < 0) err("le volume V doit être positif ou nul");
    return positif(opt(o, "rho", RHO.eau, "ρ"), "ρ") * positif(opt(o, "g", C.g0, "g"), "g") * V;
  }

  /* Corps homogène de masse volumique ρc dans un liquide ρf : il flotte en immergeant ρc/ρf de son volume, coule si ρc ≥ ρf.
     Modèle : l'air au-dessus est négligé (sa poussée ajoute ρair/ρf ≈ 10⁻³ à la fraction émergée). */
  function fractionImmergee(rhoC, rhoF) {
    positif(rhoC, "ρ du corps"); positif(rhoF, "ρ du fluide");
    return Math.min(1, rhoC / rhoF);
  }

  /* Ludion : une masse m, un volume solide Vs et une bulle d'air qui occupe Va0 sous la pression atmosphérique pa.
     À la profondeur h, la bulle est à p0 + ρ g h ; isotherme, elle occupe Va0 pa/(p0 + ρ g h).
     Force nette verticale (vers le haut, N) : ρ g (Vs + Va) − m g. Modèle : air parfait isotherme, eau incompressible,
     masse de l'air négligée (1,2 × 10⁻³ g par cm³). o = { m, Vs, Va0, pa?, p0?, rho?, g? } : p0 = pression au-dessus de
     l'eau, pa par défaut (presser la bouteille l'augmente). */
  function lu(o) {
    return { m: positif(o && o.m, "la masse m"), Vs: fini(opt(o, "Vs", 0, "Vs"), "Vs"), Va0: positif(o.Va0, "Va0"),
      pa: positif(opt(o, "pa", C.atm, "pa"), "pa"), p0: positif(opt(o, "p0", opt(o, "pa", C.atm, "pa"), "p0"), "p0"), rho: positif(opt(o, "rho", RHO.eau, "ρ"), "ρ"), g: positif(opt(o, "g", C.g0, "g"), "g") };
  }
  function ludion(o, h) {
    const L = lu(o); fini(h, "h"); if (h < 0) err("h est une profondeur, positive");
    const Va = L.Va0 * L.pa / (L.p0 + L.rho * L.g * h);
    return { Va, F: L.rho * L.g * (L.Vs + Va) - L.m * L.g };
  }
  /* Seuil : volume d'air Va* = m/ρ − Vs qui équilibre le poids, atteint sous la pression p* = pa Va0/Va* ; profondeur
     h* = (p* − p0)/(ρ g) où il est atteint (équilibre instable : au-dessus le ludion remonte, au-dessous il coule) ;
     surpression Δp* = p* − pa à appliquer en surface pour le faire couler depuis la surface.
     h* < 0 : il coule déjà en surface ; Va* ≤ 0 : il ne coule jamais (son solide flotte seul). */
  function ludionCritique(o) {
    const L = lu(o), Va = L.m / L.rho - L.Vs;
    if (!(Va > 0)) return { Va: Va, h: Infinity, dp: Infinity };
    const pc = L.pa * L.Va0 / Va;
    return { Va, h: (pc - L.p0) / (L.rho * L.g), dp: pc - L.pa };
  }

  /* ---------- tension superficielle (étape « Tension superficielle », X.tension_superficielle.1 à .3) ----------
     Approche énergétique seule, comme au programme de PC de 2014 : γ est l'énergie par unité d'aire d'interface, δW = γ dA.
     Sources :
     - eau : IAPWS R1-76(2014), σ = B τ^μ (1 + b τ), τ = 1 − T/Tc, B = 235,8 mN·m⁻¹, b = −0,625, μ = 1,256, Tc = 647,096 K ;
       du point triple à Tc ; 72,74 ± 0,36 mN·m⁻¹ à 293,15 K.
     - éthanol : Jasper, J. Phys. Chem. Ref. Data 1, 841 (1972), γ = 24,05 − 0,0832 t (mN·m⁻¹, t en °C) : 22,39 à 20 °C.
     - mercure : 486,5 mN·m⁻¹ à 20 °C (Adamson et Gast, Physical Chemistry of Surfaces, 1997).
     - masses volumiques à 20 °C : eau 998, éthanol 791, mercure 13 550 kg·m⁻³ (tables d'ingénierie de Cambridge).
     - angle de contact du mercure sur verre propre : de l'ordre de 140° (il dépend de la surface).
     API
       gammaEau(T), dGammaEau(T)        σ de l'IAPWS (N·m⁻¹) et dσ/dT (N·m⁻¹·K⁻¹), de 273,16 K à Tc.
       enthalpieSurface(T)              u = σ − T dσ/dT, eau : l'énergie (et non l'énergie libre) par unité d'aire.
       LIQUIDES                         { eau, ethanol, mercure } : { gamma, rho, theta (rad, sur verre), T }.
       laplace(gamma, R, faces)         Δp = 2 faces γ/R : goutte (1 face), bulle de savon (2 faces).
       longueurCapillaire(gamma, rho, g)   ℓc = √(γ/ρg).   bond(L, gamma, rho, g)   Bo = ρ g L²/γ = (L/ℓc)².
       epaisseurFlaque(gamma, rho, theta, g)   e = 2 ℓc sin(θ/2), flaque large (rayon ≫ ℓc).
       jurin(gamma, theta, rho, r, g)   h = 2γ cos θ/(ρ g r) (négatif : dépression).
       energieJurin(o, h)               E(h) = −2π r h γ cos θ + ½ ρ g π r² h², o = { gamma, theta, rho, r, g } ;
                                        bilanJurin(o) : { h, travailSurface, epGravite, dissipee } à l'équilibre.
       cadre(gamma, L)                  F = 2γL : film de savon sur un cadre à tige mobile (deux faces).
       wilhelmy(o, d)                   F = γ P cos θ − ρ g L e d : lame L × e immergée de d, P = 2(L + e).
       anneau(gamma, R)                 F = 4π R γ : traction idéale d'un anneau de rayon moyen R (deux lignes de contact).
       tate(gamma, r, g)                m = 2π r γ/g : masse idéale d'une goutte pendue à un embout de rayon r.
       budgetWilhelmy(o)                γ = F/P et son incertitude type composée (force, périmètre, température).
       gammaEstime(o)                   compte des liaisons : γ ≈ L/(6 N_A a²), a = (M/ρN_A)^1/3 ; o = { Lvap (J·mol⁻¹), M, rho }.
     g vaut g0 par défaut, comme dans tout le module. */
  const IAPWS_SIGMA = Object.freeze({ B: 0.2358, b: -0.625, mu: 1.256, Tc: 647.096, Tt: 273.16 });
  function gammaEau(T) {
    positif(T, "la température T"); const S = IAPWS_SIGMA;
    if (T < S.Tt - 1e-9 || T > S.Tc) err("eau : T hors de " + S.Tt + "–" + S.Tc + " K");
    const tau = 1 - T / S.Tc; return S.B * Math.pow(tau, S.mu) * (1 + S.b * tau);
  }
  function dGammaEau(T) {
    gammaEau(T); const S = IAPWS_SIGMA, tau = 1 - T / S.Tc;
    return -(S.B / S.Tc) * (S.mu * Math.pow(tau, S.mu - 1) * (1 + S.b * tau) + S.b * Math.pow(tau, S.mu));
  }
  const enthalpieSurface = T => gammaEau(T) - T * dGammaEau(T);
  const LIQUIDES = Object.freeze({
    eau: Object.freeze({ gamma: gammaEau(293.15), rho: 998, theta: 0, T: 293.15 }),
    ethanol: Object.freeze({ gamma: 0.02239, rho: 791, theta: 0, T: 293.15 }),
    mercure: Object.freeze({ gamma: 0.4865, rho: 13550, theta: 140 * Math.PI / 180, T: 293.15 }),
  });
  const gDe = g => (g == null ? C.g0 : positif(g, "g"));
  function laplace(gamma, R, faces) {
    positif(gamma, "γ"); positif(R, "le rayon R"); const n = faces == null ? 1 : faces;
    if (n !== 1 && n !== 2) err("faces vaut 1 (goutte) ou 2 (bulle de savon)");
    return 2 * n * gamma / R;
  }
  const longueurCapillaire = (gamma, rho, g) => Math.sqrt(positif(gamma, "γ") / (positif(rho, "ρ") * gDe(g)));
  const bond = (L, gamma, rho, g) => positif(rho, "ρ") * gDe(g) * positif(L, "la taille L") ** 2 / positif(gamma, "γ");
  function epaisseurFlaque(gamma, rho, theta, g) {
    fini(theta, "θ"); if (theta <= 0 || theta > Math.PI) err("θ dans ]0, π]");
    return 2 * longueurCapillaire(gamma, rho, g) * Math.sin(theta / 2);
  }
  const jur = o => { positif(o.gamma, "γ"); fini(o.theta, "θ"); positif(o.rho, "ρ"); positif(o.r, "le rayon r"); return gDe(o.g); };
  function jurin(gamma, theta, rho, r, g) { const G = jur({ gamma, theta, rho, r, g }); return 2 * gamma * Math.cos(theta) / (rho * G * r); }
  function energieJurin(o, h) {
    const G = jur(o); fini(h, "h");
    return -2 * Math.PI * o.r * h * o.gamma * Math.cos(o.theta) + 0.5 * o.rho * G * Math.PI * o.r * o.r * h * h;
  }
  function bilanJurin(o) {
    const G = jur(o), h = jurin(o.gamma, o.theta, o.rho, o.r, G);
    const travailSurface = 2 * Math.PI * o.r * h * o.gamma * Math.cos(o.theta), epGravite = 0.5 * o.rho * G * Math.PI * o.r * o.r * h * h;
    return { h, travailSurface, epGravite, dissipee: travailSurface - epGravite };
  }
  const cadre = (gamma, L) => 2 * positif(gamma, "γ") * positif(L, "la longueur L");
  function wilhelmy(o, d) {
    positif(o.gamma, "γ"); fini(o.theta, "θ"); positif(o.L, "la largeur L"); positif(o.e, "l'épaisseur e"); positif(o.rho, "ρ"); fini(d, "d");
    if (d < 0) err("l'immersion d est positive ou nulle");
    return o.gamma * 2 * (o.L + o.e) * Math.cos(o.theta) - o.rho * gDe(o.g) * o.L * o.e * d;
  }
  const anneau = (gamma, R) => 4 * Math.PI * positif(R, "le rayon R") * positif(gamma, "γ");
  const tate = (gamma, r, g) => 2 * Math.PI * positif(r, "le rayon r") * positif(gamma, "γ") / gDe(g);
  function gammaEstime(o) {
    positif(o.Lvap, "Lvap"); positif(o.M, "M"); positif(o.rho, "ρ");
    const a = Math.cbrt(o.M / (o.rho * C.N_A));
    return { a, parMolecule: o.Lvap / C.N_A, gamma: o.Lvap / (6 * C.N_A * a * a) };
  }
  /* Lame de Wilhelmy, θ supposé nul : γ = F/P, F la force de surface (poussée retranchée), P le périmètre mouillé.
     Incertitudes types indépendantes, composées en somme quadratique (GUM) : u(γ)² = (u_F/P)² + (γ u_P/P)² + (dγ/dT u_T)²,
     dγ/dT de l'eau (IAPWS) par défaut. o = { F, P, uF, uP, uT, T?, dgdT? } → { gamma, u, ur, parts: { F, P, T } }. */
  function budgetWilhelmy(o) {
    const F = positif(o.F, "F"), P = positif(o.P, "le périmètre P");
    const uF = fini(o.uF, "u(F)"), uP = fini(o.uP, "u(P)"), uT = fini(o.uT, "u(T)");
    if (uF < 0 || uP < 0 || uT < 0) err("une incertitude type est positive ou nulle");
    const g = F / P, k = o.dgdT !== undefined ? fini(o.dgdT, "dγ/dT") : dGammaEau(o.T === undefined ? 293.15 : o.T);
    const parts = { F: uF / P, P: g * uP / P, T: Math.abs(k) * uT }, u = Math.hypot(parts.F, parts.P, parts.T);
    return { gamma: g, u, ur: u / g, parts };
  }

  /* ---------- viscosité (étape « Viscosité et nombre de Reynolds ») ---------- */
  /* Sources : air, loi de Sutherland de l'U.S. Standard Atmosphere 1976 (β = 1,458 × 10⁻⁶ kg·m⁻¹·s⁻¹·K^−1/2, S = 110,4 K),
     reprise par l'ISO 2533 ; eau, tables de viscosité et de masse volumique d'Anton Paar de 283,15 à 353,15 K, et loi de
     Vogel η = A exp(B/(T − C)) (constantes de Viswanath et Natarajan, Data Book on the Viscosity of Liquids, 1989) qui les
     suit à 0,3 % près (test/fluides.test.js). Transitions : tube, laminaire sous
     Re_D ≈ 2 300 ; écoulement de Couette plan, turbulence entretenue au-delà de (v/2)(d/2)/ν ≈ 360 (Tillmark et
     Alfredsson, 1992), soit v d/ν ≈ 1 440. */
  const SUTHERLAND = Object.freeze({ beta: 1.458e-6, S: 110.4 }), GAMMA_AIR = 1.4;
  const VOGEL_EAU = Object.freeze({ A: 2.939e-5, B: 507.88, C: 149.3 });
  /* Anton Paar : [T (K), η (Pa·s), ρ (kg·m⁻³)] */
  const EAU_TABLE = Object.freeze([
    [283.15, 1.3059e-3, 999.7], [293.15, 1.0016e-3, 998.2], [298.15, 0.89e-3, 997.0], [303.15, 0.7972e-3, 995.6],
    [313.15, 0.6527e-3, 992.2], [323.15, 0.5465e-3, 988.0], [333.15, 0.466e-3, 983.2], [343.15, 0.4035e-3, 977.8],
    [353.15, 0.354e-3, 971.8]].map(Object.freeze));
  const EAU_T = Object.freeze([283.15, 353.15]), AIR_T = Object.freeze([100, 2000]);
  const RE_TUBE = 2300, RE_COUETTE = 4 * 360, RE_VISQUEUX = 1, RE_INERTIEL = 1000;
  const dans = (T, [lo, hi], quoi) => { positif(T, "la température T"); if (T < lo - 1e-9 || T > hi + 1e-9) err(quoi + " : T hors de " + lo + "–" + hi + " K"); return T; };

  /* Eau liquide, 283–353 K : viscosité par la loi de Vogel, masse volumique interpolée dans la table (3 % de variation). */
  function etaEau(T) { dans(T, EAU_T, "eau"); return VOGEL_EAU.A * Math.exp(VOGEL_EAU.B / (T - VOGEL_EAU.C)); }
  function rhoEau(T) {
    dans(T, EAU_T, "eau");
    let i = 0; while (i < EAU_TABLE.length - 2 && T > EAU_TABLE[i + 1][0]) i++;
    const [t0, , r0] = EAU_TABLE[i], [t1, , r1] = EAU_TABLE[i + 1];
    return r0 + (r1 - r0) * (T - t0) / (t1 - t0);
  }
  /* Air (et, à quelques % près, l'azote) : Sutherland, indépendante de la pression tant que le libre parcours moyen reste
     petit devant la taille de l'écoulement (Maxwell). */
  function etaAir(T) { dans(T, AIR_T, "air"); return SUTHERLAND.beta * Math.pow(T, 1.5) / (T + SUTHERLAND.S); }
  /* Gaz parfait : ρ = p M/(R T) ; célérité du son √(γ R T/M). M de l'ISO 2533 par défaut. */
  function rhoGaz(p, T, M) { positif(p, "p"); positif(T, "T"); return p * (M == null ? ISO2533.M : positif(M, "M")) / (C.R * T); }
  function celerite(T, M, gamma) { positif(T, "T"); return Math.sqrt((gamma == null ? GAMMA_AIR : gamma) * C.R * T / (M == null ? ISO2533.M : positif(M, "M"))); }
  /* Célérité du son dans l'eau à 293 K : 1 482 m·s⁻¹ (√(K/ρ) avec K = 1/χ_T = 2,18 GPa, ρ = 998,2 kg·m⁻³, à 0,5 %). */
  const CSON_EAU = 1482;
  /* Δρ/ρ ≈ Ma²/2, Ma = v/c : écoulement stationnaire, de Bernoulli et dp = c² dρ (Ma ≪ 1) ; ce que néglige « incompressible ». */
  const compressibilite = (v, c) => { const m = fini(v, "v") / positif(c, "c"); return m * m / 2; };
  /* Un état : { T, p?, rho, eta, nu, c? }, ν = η/ρ la viscosité cinématique. */
  function eau(T) { const rho = rhoEau(T), eta = etaEau(T); return { T, rho, eta, nu: eta / rho }; }
  function air(T, p, M) { const rho = rhoGaz(p, T, M), eta = etaAir(T); return { T, p, rho, eta, nu: eta / rho, c: celerite(T, M) }; }

  /* (41.2a), sans numéro chez Feynman : contrainte entre deux plaques distantes de d, l'une immobile, l'autre à v0. Écoulement laminaire, fluide
     newtonien, plaques grandes devant d. */
  function cisaillement(eta, v0, d) { positif(eta, "η"); fini(v0, "v0"); positif(d, "d"); return eta * v0 / d; }
  /* (41.11) : couple entre deux cylindres coaxiaux a < b, de longueur l, aux vitesses angulaires wa et wb. */
  function coupleCouette(eta, l, a, b, wa, wb) {
    positif(eta, "η"); positif(l, "l"); positif(a, "a"); positif(b, "b"); fini(wa, "ωa"); fini(wb, "ωb");
    if (!(b > a)) err("il faut b > a");
    return 4 * Math.PI * eta * l * a * a * b * b * (wb - wa) / (b * b - a * a);
  }
  /* Hagen–Poiseuille : tube de rayon R, G = Δp/L la chute de pression par mètre. v(r) = G (R² − r²)/(4η),
     débit Q = π G R⁴/(8η). Écoulement établi et laminaire (Re_D < 2 300), loin de l'entrée. */
  function poiseuille(R, G, eta) {
    positif(R, "R"); fini(G, "G"); positif(eta, "η");
    const vmax = G * R * R / (4 * eta);
    return { vmax, vmoy: vmax / 2, Q: Math.PI * G * R ** 4 / (8 * eta), v: r => (Math.abs(r) > R ? NaN : G * (R * R - r * r) / (4 * eta)) };
  }
  /* (41.22) : Re = ρ V L/η = V L/ν ; régime : visqueux sous 1, inertiel au-delà de 10³ (ordres de grandeur). */
  function reynolds(v, L, nu) { fini(v, "v"); positif(L, "L"); positif(nu, "ν"); return Math.abs(v) * L / nu; }
  function regime(re) { fini(re, "Re"); if (re < 0) err("Re négatif"); return re < RE_VISQUEUX ? "visqueux" : re < RE_INERTIEL ? "intermediaire" : "inertiel"; }
  /* Longueur de diffusion de la quantité de mouvement (ou du tourbillon) pendant t : √(ν t). */
  function diffusion(nu, t) { positif(nu, "ν"); fini(t, "t"); if (t < 0) err("t négatif"); return Math.sqrt(nu * t); }
  /* Maquette k fois plus petite dans un fluide { nu, c? } : vitesse qui garde le même Re, et nombres de Mach.
     reel = { L, V, nu, c? }. */
  function similitude(reel, k, maquette) {
    positif(reel.L, "L"); fini(reel.V, "V"); positif(reel.nu, "ν"); positif(k, "k"); positif(maquette.nu, "ν");
    const re = reynolds(reel.V, reel.L, reel.nu), L = reel.L / k, V = re * maquette.nu / L;
    return { re, L, V, mach: maquette.c ? V / maquette.c : NaN, machReel: reel.c ? Math.abs(reel.V) / reel.c : NaN };
  }

  /* ---------- sillages et écoulement de Couette (étape « Sillages et écoulement de Couette », II.41.4 à 41.6) ----------
     Cylindre de rayon a, de diamètre D = 2a, dans un courant U selon +x ; Re = U D/ν.
     Sources :
     - seuils : décollement et tourbillons attachés dès Re ≈ 5 (photographies de Taneda ; Van Dyke, An Album of Fluid
       Motion, 1982 : 4 à 5 par l'expérience, 5 à 7 par le calcul) ; détachement périodique dès Re ≈ 47 (Camichel et coll.,
       valeur admise, arXiv:1712.07039) ; couche limite laminaire jusqu'au décollement sous Re ≈ 1,5 × 10⁵, crise de
       traînée de 1,5 × 10⁵ à 3,5 × 10⁶ (base ERCOFTAC, UFR 2-02).
     - Cx : Lamb, 8π/[Re (½ − γ + ln(8/Re))], γ la constante d'Euler, pour Re ≪ 1 ; ajustement de White,
       1 + 10 Re^(−2/3), tiré des mesures de Tritton et de Wieselsberger, de Re = 1 à 2 × 10⁵ (il ignore le léger creux entre
       10³ et 10⁴) ; Roshko (1961) : Cx = 0,7 et St = 0,27 au-delà de 3,5 × 10⁶.
     - St = f D/U : 0,220 (1 − 23,01/Re) de 47 à 180, régime encore bidimensionnel (arXiv:1712.07039) ; ≈ 0,2 ensuite
       jusqu'à la crise (Strouhal, 1878 : 0,185 pour des fils dans le vent).
     - allée de Kármán (1911–1912) : deux rangées alternées stables si cosh(π h/l) = √2, h/l = 0,281.
     - Couette–Taylor : critère de Rayleigh (1917) ; Ta = Re² h/R0 avec Re = ωa a h/ν, h = b − a, R0 = (a + b)/2 ;
       seuil 1 708, entrefer étroit, cylindre extérieur immobile (Taylor, 1923).
     API
       CYL, KARMAN, TAYLOR_C, EULER_GAMMA   seuils de Re du cylindre, h/l de Kármán, Ta critique, γ.
       regimeCylindre(re)        "rampant" < 5 ≤ "attache" < 47 ≤ "allee" < 1,5 × 10⁵ ≤ "crise" < 3,5 × 10⁶ ≤ "supercritique".
       cxLamb(re), cxWhite(re)   les deux modèles de Cx, NaN hors de leur domaine (Re ≤ 1 ; 1 ≤ Re ≤ 2 × 10⁵).
       cxCylindre(re)            Lamb sous 1, White jusqu'à 2 × 10⁵, 0,7 au-delà de 3,5 × 10⁶, NaN dans la crise.
       strouhal(re)              NaN sans détachement (Re < 47) et dans la crise.
       detachement(U, D, nu)     { re, st, f = St U/D (Hz), T = 1/f }.
       coucheCylindre(D, re)     D/√Re : distance √(ν D/U) où le tourbillon diffuse pendant que le fluide longe le cylindre.
       psiLamb(U, a, re)         ψ([x, y]) près du cylindre pour Re ≪ 1 (solution intérieure de Lamb), NaN dans le cylindre.
       psiTourbillons(U, a, vs)  ψ du fluide parfait autour du cylindre plus des tourbillons ponctuels vs = [[x, y, G]] et
                                 leurs images : le cercle reste une ligne de courant (théorème du cercle).
       allee(x0, l, n, G)        n tourbillons alternés, pas l/2, rangées à ±h/2 (h = KARMAN l), le haut horaire (−|G|).
       aspiration(U, vs, nu, rho)   paroi poreuse qui aspire à vs : solution exacte u = U (1 − e^(−vs y/ν)) ;
                                 { delta = ν/vs, tau = ρ U vs, dissipation = ρ U² vs/2 (W·m⁻²), u(y), visqueuxParoi = U vs²/ν }.
       couette(a, b, wa, wb)     v = A r + B/r entre cylindres ; { A, B, v(r), omega(r), L(r) = r v, instable: [r1, r2] ou null }
                                 la zone où (r v)² décroît vers l'extérieur (Rayleigh).
       taylor(a, b, wa, nu)      cylindre extérieur immobile : { re, ta, reC, instable } avec le seuil d'entrefer étroit. */
  const EULER_GAMMA = 0.5772156649015329, KARMAN = Math.acosh(Math.SQRT2) / Math.PI, TAYLOR_C = 1708;
  const CYL = Object.freeze({ decolle: 5, allee: 47, plan: 180, crise: 1.5e5, superc: 3.5e6, lambMax: 1, whiteMax: 2e5, cxSuper: 0.7, stSuper: 0.27, stPlateau: 0.2 });
  function regimeCylindre(re) {
    fini(re, "Re"); if (re < 0) err("Re négatif");
    return re < CYL.decolle ? "rampant" : re < CYL.allee ? "attache" : re < CYL.crise ? "allee" : re < CYL.superc ? "crise" : "supercritique";
  }
  function cxLamb(re) { positif(re, "Re"); return re > CYL.lambMax ? NaN : 8 * Math.PI / (re * (0.5 - EULER_GAMMA + Math.log(8 / re))); }
  function cxWhite(re) { positif(re, "Re"); return re < 1 || re > CYL.whiteMax ? NaN : 1 + 10 * Math.pow(re, -2 / 3); }
  function cxCylindre(re) { positif(re, "Re"); return re <= CYL.lambMax ? cxLamb(re) : re <= CYL.whiteMax ? cxWhite(re) : re >= CYL.superc ? CYL.cxSuper : NaN; }
  function strouhal(re) {
    positif(re, "Re");
    if (re < CYL.allee || (re >= CYL.crise && re < CYL.superc)) return NaN;
    return re <= CYL.plan ? 0.220 * (1 - 23.01 / re) : re < CYL.crise ? CYL.stPlateau : CYL.stSuper;
  }
  function detachement(U, D, nu) { const re = reynolds(U, D, nu), st = strouhal(re), f = st * Math.abs(U) / D; return { re, st, f, T: 1 / f }; }
  function coucheCylindre(D, re) { positif(D, "D"); positif(re, "Re"); return D / Math.sqrt(re); }
  function psiLamb(U, a, re) {
    positif(U, "U"); positif(a, "a"); positif(re, "Re"); if (re > CYL.lambMax) err("Lamb : Re ≤ 1");
    const d = 1 / (0.5 - EULER_GAMMA + Math.log(8 / re));
    return p => { const r = Math.hypot(p[0], p[1]); return r < a * (1 - 1e-12) ? NaN : d * U * (p[1] / r) * (r * Math.log(r / a) - r / 2 + a * a / (2 * r)); };
  }
  function psiTourbillons(U, a, vs) {
    positif(U, "U"); positif(a, "a");
    const tous = [];
    (vs || []).forEach(([x, y, G]) => {
      fini(x, "x"); fini(y, "y"); fini(G, "G"); const r2 = x * x + y * y;
      if (!(r2 > a * a)) err("tourbillon dans le cylindre");
      tous.push([x, y, G], [a * a * x / r2, a * a * y / r2, -G], [0, 0, G]);
    });
    return p => {
      const r2 = p[0] * p[0] + p[1] * p[1]; if (r2 < a * a * (1 - 1e-12)) return NaN;
      let s = U * p[1] * (1 - a * a / r2);
      for (const [x, y, G] of tous) s -= G / (4 * Math.PI) * Math.log((p[0] - x) ** 2 + (p[1] - y) ** 2);
      return s;
    };
  }
  function allee(x0, l, n, G) {
    fini(x0, "x0"); positif(l, "l"); fini(G, "G"); if (!(n >= 1)) err("n ≥ 1");
    const h = KARMAN * l, g = Math.abs(G);
    return Array.from({ length: n }, (_, k) => [x0 + k * l / 2, k % 2 ? -h / 2 : h / 2, k % 2 ? g : -g]);
  }
  function aspiration(U, vs, nu, rho) {
    fini(U, "U"); positif(vs, "vs"); positif(nu, "ν"); positif(rho, "ρ");
    const delta = nu / vs;
    return { delta, tau: rho * U * vs, dissipation: rho * U * U * vs / 2, visqueuxParoi: Math.abs(U) * vs * vs / nu,
      u: y => (fini(y, "y") < 0 ? NaN : -U * Math.expm1(-y / delta)) };
  }
  function couette(a, b, wa, wb) {
    positif(a, "a"); positif(b, "b"); fini(wa, "ωa"); fini(wb, "ωb"); if (!(b > a)) err("il faut b > a");
    const D = b * b - a * a, A = (wb * b * b - wa * a * a) / D, B = (wa - wb) * a * a * b * b / D;
    const dans2 = r => { positif(r, "r"); return r >= a - 1e-12 && r <= b + 1e-12; };
    const r0 = A !== 0 ? -B / A : -Infinity;                         // (r v)² décroît vers l'extérieur là où r² < −B/A
    return { A, B, v: r => (dans2(r) ? A * r + B / r : NaN), omega: r => (dans2(r) ? A + B / (r * r) : NaN), L: r => (dans2(r) ? A * r * r + B : NaN),
      instable: r0 > a * a * (1 + 1e-12) ? [a, Math.min(b, Math.sqrt(r0))] : null };
  }
  function taylor(a, b, wa, nu) {
    positif(a, "a"); positif(b, "b"); fini(wa, "ωa"); positif(nu, "ν"); if (!(b > a)) err("il faut b > a");
    const h = b - a, R0 = (a + b) / 2, re = Math.abs(wa) * a * h / nu, ta = re * re * h / R0;
    return { re, ta, reC: Math.sqrt(TAYLOR_C * R0 / h), instable: ta > TAYLOR_C, hR0: h / R0 };
  }

  /* ---------- écoulements réels (étape « Bilans et écoulements réels », X.dyn_fluides.1 à .4) ----------
     Testé dans test/fluides-ecoulements.test.js.
     DYN                        seuils de régime, et l'eau et l'air à 293,15 K et 101 325 Pa (eau(), air() ci-dessus).
     Systèmes ouverts
       jet(o)                   jet { rho, S, v } sur une plaque ou un auget qui fuit le long du jet à u (0 ≤ u ≤ v) et le dévie
                                de theta (π/2 plaque plane, π auget de Pelton), partagé symétriquement. Stationnaire dans le
                                référentiel de la plaque ; vitesse relative w = v − u conservée en norme (ni frottement, ni
                                poids, pression atmosphérique partout). mode "plaque" : une plaque reçoit ρ S w ; mode "roue" :
                                une suite d'augets reçoit tout le jet ρ S v. → { qm, w, F (sur la plaque, selon le jet), P = F u,
                                Pjet = ½ ρ S v³, rendement = P/Pjet }.
     Pertes de charge
       colebrook(Re, eD)        coefficient de Darcy λ : 1/√λ = −2 log10(eD/3,7 + 2,51/(Re √λ)), point fixe parti de la forme
                                explicite de Haaland. eD = ε/D, rugosité relative.
       lambdaDarcy(Re, eD)      { lambda, regime } : 64/Re sous RE_TUBE (Poiseuille) ; Colebrook au-dessus de DYN.reTurbulent ;
                                entre les deux, "transition", valeur de Colebrook, incertaine.
       perteReguliere(o)        { v, D, L, eps, rho, nu } → { Re, lambda, regime, dp = λ (L/D) ρ v²/2, j = dp/L, h = dp/(ρ g0) }.
       perteSinguliere(K, ρ, v) K ρ v²/2.
       bordaCarnot(S1, S2)      élargissement brusque de S1 à S2 ≥ S1 : K = (1 − S1/S2)², rapporté à la vitesse dans S1 ; bilan de
                                quantité de mouvement, la pression sur la marche étant celle de l'amont.
     Couche limite
       blasius()                plaque plane sans gradient de pression : f‴ + ½ f f″ = 0, f(0) = f′(0) = 0, f′(∞) = 1,
                                η = y √(U/(ν x)) ; tir (RK4 jusqu'à η = 12, dichotomie sur f″(0)), calculé une fois.
                                → { fpp0, eta99, deltaStar, theta, profil: [[η, f′]] }.
       coucheLimite(x, U, ν)    { Rex, regime, delta (à 99 %), cf (local), tau = τp/(ρU²) } : Blasius tant que Rex < DYN.reCouche,
                                puis la loi en puissance 1/7 de Prandtl, δ = 0,37 x Rex^−1/5, cf = 0,0592 Rex^−1/5, comptée
                                depuis le bord d'attaque.
       traineePlaque(L, U, ν)   coefficient moyen de frottement d'une face, laminaire : 4 f″(0)/√ReL = 1,328/√ReL.
     Écoulement compressible (gaz parfait, γ constant, isentropique)
       isentropique(M, γ)       { T0surT, p0surp, rho0surrho, AsurAc } au nombre de Mach M ; Ac est la section critique (sonique).
       machDeSection(r, γ, b)   Mach pour A/Ac = r ≥ 1 sur la branche b, "sub" ou "sup" (dichotomie).
       tuyere(o)                { T0, p0, gamma, Mmol, ratio = As/Ac, branche } → { M, T, p, rho, c, v, vLim = √(2 cp T0), cp,
                                debitSurAc : ṁ/Ac, col sonique }.
       tuyereCalorifugee(cp, Te, Ts, ve)   v_s = √(ve² + 2 cp (Te − Ts)) : Δh + Δec = 0, ni travail, ni chaleur, altitude négligée. */
  const DYN = Object.freeze({ reTurbulent: 4000, reCouche: 5e5, eau: Object.freeze(eau(293.15)), air: Object.freeze(air(293.15, C.atm)) });
  const posOuNul = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être positif ou nul"); return x; };

  function jet(o) {
    const rho = positif(o && o.rho, "ρ"), S = positif(o.S, "S"), v = positif(o.v, "v");
    const u = posOuNul(opt(o, "u", 0), "u"), th = opt(o, "theta", Math.PI / 2, "θ"), mode = o.mode || "plaque";
    if (u > v) err("la plaque fuit plus vite que le jet (u > v)");
    if (th < 0 || th > Math.PI) err("θ hors de [0, π]");
    if (mode !== "plaque" && mode !== "roue") err("mode inconnu « " + mode + " »");
    const w = v - u, qm = rho * S * (mode === "roue" ? v : w), F = qm * w * (1 - Math.cos(th)), P = F * u, Pjet = rho * S * v ** 3 / 2;
    return { qm, w, F, P, Pjet, rendement: P / Pjet };
  }

  function colebrook(re, eD) {
    positif(re, "Re"); posOuNul(eD, "ε/D");
    let x = -1.8 * Math.log10(Math.pow(eD / 3.7, 1.11) + 6.9 / re);          // Haaland (1983), à 2 % de Colebrook
    for (let i = 0; i < 100; i++) {
      const n = -2 * Math.log10(eD / 3.7 + 2.51 * x / re), fin = Math.abs(n - x) <= 1e-14 * x;
      x = n; if (fin) break;
    }
    return 1 / (x * x);
  }
  function lambdaDarcy(re, eD) {
    positif(re, "Re"); posOuNul(eD, "ε/D");
    if (re < RE_TUBE) return { lambda: 64 / re, regime: "laminaire" };
    return { lambda: colebrook(re, eD), regime: re < DYN.reTurbulent ? "transition" : "turbulent" };
  }
  function perteReguliere(o) {
    const D = positif(o && o.D, "D"), L = positif(o.L, "L"), rho = positif(o.rho, "ρ"), nu = positif(o.nu, "ν");
    const eps = posOuNul(opt(o, "eps", 0, "ε"), "ε"), v = Math.abs(fini(o.v, "v")), re = v * D / nu;
    if (re === 0) return { Re: 0, lambda: Infinity, regime: "laminaire", dp: 0, j: 0, h: 0 };
    const { lambda, regime: r } = lambdaDarcy(re, eps / D), dp = lambda * (L / D) * rho * v * v / 2;
    return { Re: re, lambda, regime: r, dp, j: dp / L, h: dp / (rho * C.g0) };
  }
  function perteSinguliere(K, rho, v) { posOuNul(K, "K"); positif(rho, "ρ"); fini(v, "v"); return K * rho * v * v / 2; }
  function bordaCarnot(S1, S2) {
    positif(S1, "S1"); positif(S2, "S2");
    if (S2 < S1) err("un élargissement demande S2 ≥ S1");
    return (1 - S1 / S2) ** 2;
  }

  /* Blasius : y = [f, f′, f″], y′ = [f′, f″, −½ f f″] */
  let BLASIUS = null;
  function blasius() {
    if (BLASIUS) return BLASIUS;
    const ETA = 12, N = 2400, h = ETA / N, der = y => [y[1], y[2], -0.5 * y[0] * y[2]];
    const tir = s => {
      let y = [0, 0, s]; const out = [[0, y]];
      for (let i = 0; i < N; i++) {
        const k1 = der(y), k2 = der(y.map((a, j) => a + h / 2 * k1[j])), k3 = der(y.map((a, j) => a + h / 2 * k2[j])), k4 = der(y.map((a, j) => a + h * k3[j]));
        y = y.map((a, j) => a + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); out.push([(i + 1) * h, y]);
      }
      return out;
    };
    let lo = 0.1, hi = 1;                                                       // f′(∞) croît avec f″(0)
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (tir(m)[N][1][1] < 1) lo = m; else hi = m; }
    const s = (lo + hi) / 2, sol = tir(s);
    let eta99 = NaN, dstar = 0, th = 0;
    for (let i = 0; i < N; i++) {
      const [e0, a] = sol[i], [e1, b] = sol[i + 1];
      if (isNaN(eta99) && a[1] < 0.99 && b[1] >= 0.99) eta99 = e0 + (0.99 - a[1]) / (b[1] - a[1]) * (e1 - e0);
      dstar += h * ((1 - a[1]) + (1 - b[1])) / 2; th += h * (a[1] * (1 - a[1]) + b[1] * (1 - b[1])) / 2;
    }
    BLASIUS = Object.freeze({ fpp0: s, eta99, deltaStar: dstar, theta: th, profil: Object.freeze(sol.filter((_, i) => i % 20 === 0).map(([e, y]) => [e, y[1]])) });
    return BLASIUS;
  }
  function coucheLimite(x, U, nu) {
    positif(x, "x"); positif(U, "U"); positif(nu, "ν");
    const rex = U * x / nu;
    if (rex < DYN.reCouche) { const B = blasius(), r = Math.sqrt(rex); return { Rex: rex, regime: "laminaire", delta: B.eta99 * x / r, cf: 2 * B.fpp0 / r, tau: B.fpp0 / r }; }
    const p = Math.pow(rex, -0.2);
    return { Rex: rex, regime: "turbulent", delta: 0.37 * x * p, cf: 0.0592 * p, tau: 0.0296 * p };
  }
  function traineePlaque(L, U, nu) { positif(L, "L"); positif(U, "U"); positif(nu, "ν"); return 4 * blasius().fpp0 / Math.sqrt(U * L / nu); }

  const gam = g => { const v = g === undefined ? GAMMA_AIR : fini(g, "γ"); if (!(v > 1)) err("γ doit dépasser 1"); return v; };
  function isentropique(M, gamma) {
    posOuNul(M, "M"); const g = gam(gamma), T0surT = 1 + (g - 1) / 2 * M * M;
    return { T0surT, p0surp: Math.pow(T0surT, g / (g - 1)), rho0surrho: Math.pow(T0surT, 1 / (g - 1)),
      AsurAc: M === 0 ? Infinity : Math.pow(2 * T0surT / (g + 1), (g + 1) / (2 * (g - 1))) / M };
  }
  function machDeSection(r, gamma, branche) {
    fini(r, "A/Ac"); if (r < 1) err("une section ne peut pas être plus petite que la section critique (A/Ac ≥ 1)");
    const g = gam(gamma), b = branche || "sup";
    if (b !== "sup" && b !== "sub") err("branche « sub » ou « sup »");
    const sup = b === "sup";
    let lo = sup ? 1 : 0, hi = 1;
    if (sup) while (isentropique(hi, g).AsurAc < r) hi *= 2;
    for (let i = 0; i < 200 && hi - lo > 1e-15 * hi; i++) {
      const m = (lo + hi) / 2, a = isentropique(m, g).AsurAc;
      if ((a < r) === sup) lo = m; else hi = m;
    }
    return (lo + hi) / 2;
  }
  function tuyere(o) {
    const T0 = positif(o && o.T0, "T0"), p0 = positif(o.p0, "p0"), g = gam(o.gamma), Mm = positif(opt(o, "Mmol", ISO2533.M, "M"), "M");
    const r = C.R / Mm, cp = g * r / (g - 1), M = machDeSection(opt(o, "ratio", 1, "As/Ac"), g, o.branche), s = isentropique(M, g);
    const T = T0 / s.T0surT, p = p0 / s.p0surp, c = Math.sqrt(g * r * T);
    return { M, T, p, rho: p / (r * T), c, v: M * c, vLim: Math.sqrt(2 * cp * T0), cp,
      debitSurAc: p0 * Math.sqrt(g / (r * T0)) * Math.pow(2 / (g + 1), (g + 1) / (2 * (g - 1))) };
  }
  function tuyereCalorifugee(cp, Te, Ts, ve) {
    positif(cp, "cp"); positif(Te, "Te"); positif(Ts, "Ts"); const v0 = ve === undefined ? 0 : fini(ve, "ve");
    const k = v0 * v0 + 2 * cp * (Te - Ts);
    if (k < 0) err("sortie plus chaude que ne le permet l'énergie d'entrée");
    return Math.sqrt(k);
  }

  const api = Object.freeze({ RHO, K, ISO2533, pressionProfondeur, resultanteRectangle, hauteurEchelle, atmIsotherme,
    ecartIncompressible, geopotentielle, geometrique, atmStandard, poussee, fractionImmergee, ludion, ludionCritique,
    IAPWS_SIGMA, LIQUIDES, gammaEau, dGammaEau, enthalpieSurface, laplace, longueurCapillaire, bond, epaisseurFlaque,
    jurin, energieJurin, bilanJurin, cadre, wilhelmy, anneau, tate, gammaEstime, budgetWilhelmy,
    SUTHERLAND, GAMMA_AIR, VOGEL_EAU, EAU_TABLE, EAU_T, AIR_T, RE_TUBE, RE_COUETTE, RE_VISQUEUX, RE_INERTIEL,
    etaEau, rhoEau, etaAir, rhoGaz, celerite, CSON_EAU, compressibilite, eau, air, cisaillement, coupleCouette, poiseuille, reynolds, regime, diffusion, similitude,
    DYN, jet, colebrook, lambdaDarcy, perteReguliere, perteSinguliere, bordaCarnot, blasius, coucheLimite, traineePlaque,
    isentropique, machDeSection, tuyere, tuyereCalorifugee,
    EULER_GAMMA, KARMAN, TAYLOR_C, CYL, regimeCylindre, cxLamb, cxWhite, cxCylindre, strouhal, detachement, coucheCylindre,
    psiLamb, psiTourbillons, allee, aspiration, couette, taylor });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Fluides = api;
})(typeof self !== "undefined" ? self : this);

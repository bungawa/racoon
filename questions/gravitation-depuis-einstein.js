/* Calcul de l'article « D'où vient la loi de la gravitation ? » : limite newtonienne de l'équation d'Einstein,
   description du système (Φ/c², (v/c)², p/(ρc²), L/(c·Δt)) pour des cas réels, verdict par l'écart normalisé z,
   écarts mesurables (horloges du GPS, périhélie de Mercure, déviation de la lumière, retard de Shapiro).
   Tout est au premier ordre en GM/(rc²) sauf redshiftExact (Schwarzschild, exact pour un corps sphérique sans rotation).
   SI : distances en m, masses en kg, durées en s, angles en rad sauf mention. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, G = Cst.G, G0 = Cst.g0, AU = Cst.au;
  const C2 = C * C;
  const GM_SUN = Cst.GM_sun;           // m³·s⁻², connu bien mieux que G
  const R_SUN = Cst.R_sun, GM_EARTH = Cst.GM_E, R_EARTH = Cst.R_E_mean, R_EARTH_EQ = Cst.R_E_eq, OMEGA_EARTH = Cst.Omega_E;
  const L_G = Cst.L_G;                 // W0/c² : potentiel du géoïde, rotation comprise
  const DAY = 86400;                   // s
  const JULIAN_CENTURY = 36525 * DAY;  // s
  const ARCSEC = Math.PI / 648000;     // rad
  const GPS_A = 26561.75e3;            // m, demi-grand axe nominal des satellites GPS
  const MOON_R = 3.844e8;              // m, distance moyenne Terre-Lune
  const MOON_T = 27.321661 * DAY;      // s, mois sidéral
  const Z_SEUIL = 2;                   // écart normalisé au-delà duquel un écart est significatif (convention de CPGE)
  const H0 = 67.4e3 / (1e6 * Cst.pc);  // s⁻¹, constante de Hubble (Planck 2018 : 67,4 km·s⁻¹·Mpc⁻¹)
  const LAMBDA = 3 * 0.685 * H0 * H0 / (C * C);   // m⁻², constante cosmologique (Ω_Λ = 0,685) : 3Ω_Λ H0²/c²

  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); };

  /* la constante de couplage d'Einstein κ = 8πG/c⁴, en s²·m⁻¹·kg⁻¹ */
  const kappa = () => 8 * Math.PI * G / (C2 * C2);

  /* potentiel adimensionné |Φ|/c² = GM/(rc²) à la distance r d'une masse sphérique */
  function phiOverC2(GM, r) { pos(GM, "GM"); pos(r, "r"); return GM / (r * C2); }
  /* écart de potentiel par mètre près du sol : g/c² (m⁻¹) */
  const gOverC2 = () => G0 / C2;
  /* rayon de Schwarzschild 2GM/c² */
  function schwarzschildRadius(GM) { pos(GM, "GM"); return 2 * GM / C2; }

  /* décalage vers le rouge d'une lumière émise à r et reçue à l'infini.
     Champ faible : z ≈ GM/(rc²). Schwarzschild : z = 1/√(1 − 2GM/(rc²)) − 1, infini à l'horizon. */
  const redshiftWeak = (GM, r) => phiOverC2(GM, r);
  function redshiftExact(GM, r) { const u = 2 * phiOverC2(GM, r); return u >= 1 ? Infinity : 1 / Math.sqrt(1 - u) - 1; }

  /* troisième loi de Kepler (newtonienne) : période d'une orbite de demi-grand axe a */
  function period(GM, a) { pos(GM, "GM"); pos(a, "a"); return 2 * Math.PI * Math.sqrt(a * a * a / GM); }

  /* ---------- décrire le système ----------
     Un cas : la source (GM, rayon R de la source), l'endroit étudié r, la vitesse v par rapport au référentiel
     où le champ est statique, la taille L et le temps Δt sur lequel la configuration change (T/2π d'un mouvement périodique). */
  const orbit = (id, GM, r, R) => ({ id, GM, r, R, v: Math.sqrt(GM / r), L: r, dt: Math.sqrt(r * r * r / GM) });
  const A_MERCURY = 0.387098 * AU;
  const CASES = [
    { id: "terre", GM: GM_EARTH, r: R_EARTH, R: R_EARTH, v: OMEGA_EARTH * R_EARTH_EQ, L: R_EARTH, dt: 1 / OMEGA_EARTH },  // objet lâché au sol ; la Terre tourne
    orbit("gps", GM_EARTH, GPS_A, R_EARTH),                    // satellite GPS sur son orbite
    orbit("mercure", GM_SUN, A_MERCURY, R_SUN),                // Mercure autour du Soleil
    orbit("soleil", GM_SUN, R_SUN, R_SUN),                     // sonde en orbite rasante au Soleil
    orbit("neutrons", 1.4 * GM_SUN, 1.2e4, 1.2e4),             // orbite rasante d'une étoile à neutrons typique : 1,4 M☉, 12 km
  ];
  /* cas libre : masse M (kg) et distance r (m), orbite circulaire rasante d'une source de rayon r */
  function custom(M, r) { pos(M, "M"); pos(r, "r"); return orbit("autre", G * M, r, r); }

  /* pression centrale d'une sphère homogène en équilibre, rapportée à ρc² : p_c/(ρc²) = GM/(2Rc²) */
  const centralPressureRatio = (GM, R) => phiOverC2(GM, R) / 2;

  /* ce que la limite newtonienne néglige, en erreur relative :
     phi  — termes en (Φ/c²)² devant Φ/c² dans g₀₀ : non-linéarité, taille relative Φ/c² ;
     v2   — termes de vitesse dans l'équation des géodésiques et dτ ≈ dt : (v/c)² ;
     p    — la pression à côté de ρ dans la source, ρ + 3p/c² : 3p/(ρc²) (estimation de sphère homogène) ;
     dyn  — (1/c²)∂²Φ/∂t² devant ∇²Φ : (L/(c·Δt))². */
  function terms(c) {
    const t = { phi: phiOverC2(c.GM, c.r), v2: (c.v / C) ** 2, p: 3 * centralPressureRatio(c.GM, c.R), dyn: (c.L / (C * c.dt)) ** 2 };
    t.max = Math.max(t.phi, t.v2, t.p, t.dyn);
    return t;
  }
  /* au-delà, le développement en puissances de Φ/c² n'a plus de sens */
  const HORS = 0.1;

  /* mesures de référence : incertitude relative typique */
  const MESURES = [
    { id: "tp", u: 1e-2 },             // chute libre chronométrée en travaux pratiques, ≈ 1 %
    { id: "gravimetre", u: 2e-9 },     // gravimètre absolu à chute libre : 2 µGal = 2 × 10⁻⁸ m·s⁻² sur 9,8 m·s⁻²
    { id: "lune", u: 1e-3 / MOON_R },  // télémétrie laser de la Lune : 1 mm sur 384 400 km
    { id: "cesium", u: 3e-16 },        // fontaine à césium (NIST-F1, 2008)
    { id: "optique", u: 2e-18 },       // horloge optique à réseau de strontium (JILA, 2019)
  ];
  /* écart normalisé : l'effet négligé (relatif) contre l'incertitude relative de la mesure ; visible si z > 2 */
  function verdict(effect, u) {
    if (!(effect >= 0)) throw new RangeError("effet : ≥ 0 attendu"); pos(u, "incertitude");
    const z = effect / u; return { z, visible: z > Z_SEUIL };
  }

  /* ---------- la Lune de Newton ----------
     g (R/r)² comparé à l'accélération centripète 4π²r/T² ; chute vers la Terre pendant une seconde */
  function moonTest() {
    const g0 = GM_EARTH / (R_EARTH * R_EARTH), predicted = g0 * (R_EARTH / MOON_R) ** 2, observed = 4 * Math.PI * Math.PI * MOON_R / (MOON_T * MOON_T);
    return { g0, predicted, observed, fall1s: observed / 2, ratio: (MOON_R / R_EARTH) ** 2 };
  }

  /* ---------- horloges du GPS ----------
     Avance quotidienne d'une horloge en orbite circulaire (demi-grand axe a) sur une horloge du géoïde.
     Altitude : (W0 − GM/a)/c² ; vitesse : −v²/(2c²) = −GM/(2ac²). Résultat en s par jour. */
  function gpsPerDay(a) {
    a = a == null ? GPS_A : a; pos(a, "a");
    const u = GM_EARTH / (a * C2), alt = (L_G - u) * DAY, speed = -u / 2 * DAY;
    return { alt, speed, net: alt + speed, rate: L_G - 1.5 * u };
  }

  /* ---------- au-delà de Newton ---------- */
  /* avance du périhélie par orbite (rad), premier ordre en GM/(c²a) : 6πGM / (c² a (1 − e²)) */
  function perihelionPerOrbit(GM, a, e) {
    pos(GM, "GM"); pos(a, "a"); if (!(e >= 0 && e < 1)) throw new RangeError("excentricité : 0 ≤ e < 1 attendue");
    return 6 * Math.PI * GM / (C2 * a * (1 - e * e));
  }
  /* même chose en secondes d'arc par siècle julien */
  const perihelionPerCentury = (GM, a, e) => perihelionPerOrbit(GM, a, e) * (JULIAN_CENTURY / period(GM, a)) / ARCSEC;
  /* planètes : demi-grand axe (m), excentricité ; valeur relativiste publiée (″ par siècle) pour contrôle */
  const PLANETS = [
    { id: "mercure", a: A_MERCURY, e: 0.205630, published: 42.98 },
    { id: "venus", a: 0.723332 * AU, e: 0.006772, published: 8.62 },
    { id: "terre", a: 1.000001 * AU, e: 0.016709, published: 3.84 },
    { id: "mars", a: 1.523679 * AU, e: 0.093400, published: 1.35 },
  ];

  /* déviation d'un rayon lumineux de paramètre d'impact b (rad) : relativité générale 4GM/(c²b) ;
     calcul « newtonien » (corpuscule à la vitesse c) : moitié, 2GM/(c²b) */
  function deflection(GM, b) { pos(GM, "GM"); pos(b, "b"); return 4 * GM / (C2 * b); }
  const deflectionNewton = (GM, b) => deflection(GM, b) / 2;

  /* retard de Shapiro, aller-retour, entre deux corps à r1 et r2 du Soleil, rayon qui passe à b ≪ r1, r2 :
     (4GM/c³) ln(4 r1 r2 / b²) */
  function shapiro(GM, r1, r2, b) { pos(GM, "GM"); pos(r1, "r1"); pos(r2, "r2"); pos(b, "b"); return 4 * GM / (C2 * C) * Math.log(4 * r1 * r2 / (b * b)); }

  /* « rayon en excès » d'une sphère entourant la masse M : GM/(3c²) */
  function excessRadius(GM) { pos(GM, "GM"); return GM / (3 * C2); }

  /* courbure de la limite newtonienne : R₀₀ ≈ 4πGρ/c² (m⁻²) et l'échelle de longueur 1/√R₀₀ */
  function ricci00(rho) { pos(rho, "ρ"); return 4 * Math.PI * G * rho / C2; }
  const curvatureLength = rho => 1 / Math.sqrt(ricci00(rho));

  /* sphère homogène de masse M et rayon R : potentiel newtonien Φ(r) (J·kg⁻¹), champ g(r) (m·s⁻², vers le centre) */
  function phiSphere(GM, R, r) {
    pos(GM, "GM"); pos(R, "R"); if (!(r >= 0)) throw new RangeError("r : ≥ 0 attendu");
    return r >= R ? -GM / r : -GM * (3 * R * R - r * r) / (2 * R * R * R);
  }
  function gSphere(GM, R, r) {
    pos(GM, "GM"); pos(R, "R"); if (!(r >= 0)) throw new RangeError("r : ≥ 0 attendu");
    return r >= R ? GM / (r * r) : GM * r / (R * R * R);
  }

  /* ---------- une pomme lâchée, vue de deux référentiels ---------- */
  /* Tenue à la hauteur h jusqu'à t0, puis lâchée sans vitesse ; champ uniforme g ; t de 0 à l'impact T.
     Newton : référentiel du sol, z(t). Einstein : référentiel en chute libre qui accompagne la pomme lâchée,
     Z = z − h + ½g(t − t0)² (changement de référentiel de Galilée ; principe d'équivalence en champ uniforme).
     Un accéléromètre dans la pomme lit g (vers le haut) tant qu'elle est tenue, 0 en chute libre. */
  function chute(h, t0, g) {
    g = g === undefined ? G0 : g; pos(h, "h"); pos(g, "g");
    if (!(t0 >= 0) || !isFinite(t0)) throw new RangeError("t0 : ≥ 0 attendu");
    const tf = Math.sqrt(2 * h / g), T = t0 + tf;
    const dans = t => { if (!(t >= 0 && t <= T * (1 + 1e-12))) throw new RangeError("t : entre 0 et l'impact attendu"); return t > t0; };
    const z = t => dans(t) ? h - g * (t - t0) ** 2 / 2 : h;          // hauteur de la pomme, référentiel du sol
    const v = t => dans(t) ? -g * (t - t0) : 0;                      // vitesse verticale, référentiel du sol
    const Z = (t, zz) => zz - h + g * (t - t0) ** 2 / 2;             // la hauteur zz du sol, vue du référentiel en chute
    const accelerometre = t => dans(t) ? 0 : g;                      // accélération propre, vers le haut
    const forceNewton = t => dans(t) ? -g : 0;                       // somme des forces par kilogramme selon Newton
    return { h, t0, g, tf, T, z, v, Z, accelerometre, forceNewton, vImpact: g * tf };
  }
  /* ce que le schéma néglige : (v/c)² à l'impact, variation relative de g sur h (2h/r), écart d'horloges gh/c²,
     rayon c²/g des hyperboles qu'on remplace par des paraboles */
  function chuteNegligee(h, g, r) {
    g = g === undefined ? G0 : g; r = r === undefined ? R_EARTH : r; pos(h, "h"); pos(g, "g"); pos(r, "r");
    const v = Math.sqrt(2 * g * h);
    /* bande : longueur de l'arc du sol sur la feuille au vrai rayon c²/g, soit c fois la durée de la chute */
    return { v2: (v / C) ** 2, gradient: 2 * h / r, horloge: g * h / C2, rayon: C2 / g, bande: C * Math.sqrt(2 * h / g) };
  }
  /* marées : deux pommes lâchées à d l'une de l'autre, à la distance r du centre d'une masse GM.
     Côte à côte, elles se rapprochent à g·d/r ; l'une au-dessus de l'autre, elles s'écartent à 2g·d/r.
     Au premier ordre en d/r. Déplacement relatif au bout de t : ½at². */
  function maree(GM, r, d, t) {
    pos(GM, "GM"); pos(r, "r"); pos(d, "d"); pos(t, "t");
    const g = GM / (r * r), lat = g * d / r, vert = 2 * g * d / r;
    return { g, lat, vert, dLat: lat * t * t / 2, dVert: vert * t * t / 2 };
  }

  /* Le même lâcher dessiné sur une feuille qu'on peut rouler en cône. Secteur d'anneau de centre O = (0, R) :
     la hauteur z est à la distance r = R − z de O ; l'instant u = t/tf de la chute est le rayon d'angle φ(u).
     La pomme lâchée à la hauteur h suit la tangente au cercle r = R − h, la droite r cos φ = R − h (y = h sur la feuille).
     φ(u) est choisi pour que cette droite coupe le rayon u sur l'arc de la vraie hauteur z = h(1 − u²) :
     cos φ = (R − h)/(R − h + hu²). Les rayons ne sont donc pas régulièrement espacés. Au sol, φ(1) = Φ = arccos(1 − h/R).
     Écrit en 2 arcsin(√(…/2)), pour rester juste quand R ≫ h. R est un rayon de dessin : le vrai, c²/g, est 10¹⁵ fois
     plus grand, et le papier, euclidien, inverse le sens de la dilatation du temps (voir le texte). */
  const ENROULE_MAX = 1.5 * Math.PI;   // la feuille la plus enroulée fait trois quarts de tour : fermée, elle collerait le lâcher à l'impact
  function secteur(h, R) {
    pos(h, "h"); pos(R, "R"); if (!(R > h)) throw new RangeError("R > h attendu");
    const angle = u => {
      if (!(u >= 0 && u <= 1)) throw new RangeError("u : entre 0 et 1 attendu");
      const d = h * u * u; return 2 * Math.asin(Math.sqrt(d / (2 * (R - h + d))));
    };
    const PHI = angle(1);
    /* l'instant désigné par l'angle φ (borné au secteur) : inverse de angle */
    const instant = phi => {
      const p = Math.min(PHI, Math.max(0, phi)), d = (R - h) * versec(p);
      return p >= PHI ? 1 : Math.min(1, Math.sqrt(d / h));
    };
    /* 1/cos φ − 1 et 1 − cos φ, écrits sans soustraction de deux nombres voisins : justes quand φ ≈ 10⁻⁸ */
    function versec(p) { const s = Math.sin(p / 2); return 2 * s * s / Math.cos(p); }
    function verssin(p) { const s = Math.sin(p / 2); return 2 * s * s; }
    const polaire = (u, z) => ({ r: R - z, phi: angle(u) });
    const plan = (u, z) => { const { r, phi } = polaire(u, z); return [r * Math.sin(phi), z + r * verssin(phi)]; };
    const zPomme = u => h - (R - h) * versec(angle(u));              // hauteur où la droite coupe le rayon u : h(1 − u²)
    /* la feuille roulée en cône d'axe vertical, sommet en O : fraction s de l'enroulement, 0 à plat, 1 au plus roulé.
       sin β = 1 − s(1 − Φ/ψmax) ; le cercle de rayon r devient un cercle de rayon r sin β, d'angle φ/sin β.
       À s = 1, la feuille couvre ψmax = 3π/2 : elle ne se referme pas. Isométrie pour tout s. */
    function cone(u, z, s) {
      if (!(s >= 0 && s <= 1)) throw new RangeError("s : entre 0 et 1 attendu");
      const { r, phi } = polaire(u, z), sb = 1 - s * (1 - PHI / ENROULE_MAX), cb = Math.sqrt(1 - sb * sb), psi = phi / sb;
      return [r * sb * Math.sin(psi), -r * sb * Math.cos(psi), -r * cb];
    }
    return { h, R, PHI, angle, instant, plan, zPomme, cone };
  }

  const api = { C, G, G0, LAMBDA, GM_SUN, R_SUN, GM_EARTH, R_EARTH, L_G, AU, DAY, JULIAN_CENTURY, ARCSEC, GPS_A, MOON_R, Z_SEUIL, HORS, ENROULE_MAX,
    CASES, MESURES, PLANETS,
    kappa, phiOverC2, gOverC2, schwarzschildRadius, redshiftWeak, redshiftExact, period, custom, centralPressureRatio, terms, verdict,
    moonTest, gpsPerDay, perihelionPerOrbit, perihelionPerCentury, deflection, deflectionNewton, shapiro, excessRadius,
    ricci00, curvatureLength, phiSphere, gSphere, chute, chuteNegligee, maree, secteur };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Gravite = api;
})(typeof self !== "undefined" ? self : this);

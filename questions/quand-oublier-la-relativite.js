/* Calcul de l'article « Quand peut-on oublier la relativité ? » : développements de la relativité restreinte pour β = v/c ≪ 1,
   erreur relative et erreur absolue de chaque approximation, nombres sans dimension qui décrivent le système
   ((v/c)², ΔΦ/c², L/(c·Δt)), bilan d'horloge contre l'incertitude d'un instrument (écart normalisé z).
   Tout est calculé sans perte de chiffres aux faibles vitesses : jamais 1/√(1 − β²) − 1 directement.
   SI : vitesses en m·s⁻¹, distances en m, durées en s, énergies en J sauf mention (MeV pour les masses de particules). Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, G0 = Cst.g0, GM = Cst.GM_E, AU = Cst.au;
  const C2 = C * C;
  const R_E = Cst.R_E_eq;              // m, rayon équatorial
  const L_G = Cst.L_G;                 // W0/c² : potentiel du géoïde (rotation comprise)
  const DAY = 86400;                   // s
  const YEAR = 365.25 * DAY;           // s, année julienne
  const GPS_A = 26561.75e3;            // m, demi-grand axe des orbites GPS (valeur utilisée par Ashby)
  const ISS_H = 415e3;                 // m, altitude typique de la Station spatiale
  const MC2_E = Cst.m_e * C2 / (1e6 * Cst.e);   // MeV, énergie de masse de l'électron
  const MC2_P = Cst.m_p * C2 / (1e6 * Cst.e);   // MeV, énergie de masse du proton
  const Z_SEUIL = 2;                   // écart normalisé au-delà duquel un écart est significatif (convention de CPGE)

  const num = (x, what) => { if (typeof x !== "number" || !isFinite(x)) throw new RangeError(what + " : nombre fini attendu"); };
  const beta = b => { num(b, "β"); if (!(b >= 0 && b < 1)) throw new RangeError("β : 0 ≤ β < 1 attendu"); return b; };
  const s = b => Math.sqrt(1 - b * b);                     // 1/γ, sans perte : 1 − β² est exact quand β est petit

  /* ---------- γ et ses développements ---------- */
  const gamma = b => 1 / s(beta(b));
  /* γ − 1 = β² / (√(1 − β²)(1 + √(1 − β²))) : identité exacte, sans soustraction de nombres voisins */
  function gammaMinusOne(b) { beta(b); const r = s(b); return b * b / (r * (1 + r)); }
  /* la forme naïve, pour montrer ce qu'elle perd */
  const gammaMinusOneNaive = b => 1 / Math.sqrt(1 - b * b) - 1;
  /* 1 − 1/γ = β² / (1 + √(1 − β²)) : retard relatif d'une horloge mobile */
  function oneMinusInvGamma(b) { beta(b); return b * b / (1 + s(b)); }

  /* coefficients de (1 − x)^(−1/2) = Σ cₙ xⁿ : 1, 1/2, 3/8, 5/16, 35/128… ; γ = Σ cₙ β²ⁿ */
  function coef(n) { let c = 1; for (let k = 1; k <= n; k++) c *= (2 * k - 1) / (2 * k); return c; }
  /* reste du développement : γ − Σ_{n<k} cₙ β²ⁿ, calculé terme à terme quand β² < 1/2 (pas de soustraction), directement sinon */
  function gammaTail(b, k) {
    beta(b); if (!(Number.isInteger(k) && k >= 0)) throw new RangeError("k : entier ≥ 0 attendu");
    const x = b * b;
    if (x >= 0.5) { let p = 0; for (let n = 0; n < k; n++) p += coef(n) * Math.pow(x, n); return gamma(b) - p; }
    let sum = 0, term = coef(k) * Math.pow(x, k);
    for (let n = k; n < k + 2000 && term > 1e-20 * sum; n++) { sum += term; term *= x * (2 * n + 1) / (2 * n + 2); }
    return sum;
  }

  /* ---------- erreurs relatives des approximations, valeur exacte et terme dominant ----------
     erreur relative = (exact − approché) / exact ; positive : l'approximation sous-estime. */
  /* énergie cinétique : ½mv² contre (γ − 1)mc² */
  const ratio = (b, k) => beta(b) === 0 ? 0 : gammaTail(b, k) / gammaTail(b, 1);   // limite 0 en β = 0
  const kineticNewtonError = b => ratio(b, 2);
  const kineticNewtonLead = b => 3 * b * b / 4;
  /* énergie cinétique au second ordre : ½mv²(1 + 3β²/4) */
  const kineticSecondError = b => ratio(b, 3);
  const kineticSecondLead = b => 5 * Math.pow(b, 4) / 8;
  /* γ ≈ 1 + β²/2 + 3β⁴/8 : erreur relative sur γ lui-même */
  const gammaSecondError = b => gammaTail(b, 3) / gamma(b);
  const gammaSecondLead = b => 5 * Math.pow(b, 6) / 16;
  /* quantité de mouvement : mv contre γmv ; (p − mv)/p = 1 − 1/γ */
  const momentumNewtonError = b => oneMinusInvGamma(b);
  const momentumNewtonLead = b => b * b / 2;
  /* dilatation du temps au premier ordre : Δτ ≈ Δt(1 − β²/2) ; reste exact (1 − 1/γ) − β²/2 = β⁴/(2(1 + √(1 − β²))²) */
  function dilationFirstOrderRest(b) { beta(b); const r = s(b); return Math.pow(b, 4) / (2 * (1 + r) * (1 + r)); }
  const dilationFirstOrderLead = b => Math.pow(b, 4) / 8;

  /* composition des vitesses colinéaires : w = (u + v)/(1 + uv/c²) ; Galilée u + v.
     Erreur relative de Galilée rapportée à w : exactement uv/c². */
  function addVelocities(u, v) {
    num(u, "u"); num(v, "v"); if (!(Math.abs(u) < C && Math.abs(v) < C)) throw new RangeError("|u|, |v| < c attendus");
    const k = u * v / C2, w = (u + v) / (1 + k);
    return { w, galilee: u + v, rel: k, abs: w * k };   // (u + v) − w = w·uv/c², sans soustraction
  }

  /* ---------- β d'un objet ---------- */
  const betaOf = v => { num(v, "v"); if (!(Math.abs(v) < C)) throw new RangeError("|v| < c attendue"); return Math.abs(v) / C; };
  /* depuis βγ = p/(mc) (curseur logarithmique qui va jusqu'au LHC) */
  function fromProper(u) { num(u, "βγ"); if (!(u >= 0)) throw new RangeError("βγ ≥ 0 attendu"); const q = Math.sqrt(1 + u * u);
    return { beta: u / q, gamma: q, gammaMinusOne: u * u / (q + 1), oneMinusBeta: 1 / (q * (q + u)) }; }
  /* depuis le facteur γ (énergie totale / énergie de masse) */
  function fromGamma(g) { num(g, "γ"); if (!(g >= 1)) throw new RangeError("γ ≥ 1 attendu"); const g1 = g - 1;
    return fromProper(Math.sqrt(g1 * (g1 + 2))); }
  /* depuis l'énergie cinétique T et l'énergie de masse mc² (même unité) */
  function fromKinetic(T, mc2) { num(T, "T"); num(mc2, "mc²"); if (!(T >= 0 && mc2 > 0)) throw new RangeError("T ≥ 0, mc² > 0 attendus");
    const g1 = T / mc2; return fromProper(Math.sqrt(g1 * (g1 + 2))); }

  const orbitSpeed = r => { num(r, "r"); if (!(r > 0)) throw new RangeError("r > 0 attendu"); return Math.sqrt(GM / r); };

  /* objets réels : vitesse par rapport au référentiel indiqué (une vitesse est toujours relative à quelque chose) */
  function objets() {
    const lhc = fromGamma(6.8e6 / MC2_P), crt = fromKinetic(0.025, MC2_E);
    return [
      { id: "plaque", v: 0.05 / YEAR },                       // ≈ 5 cm par an, par rapport à la plaque voisine
      { id: "marcheur", v: 1.4 },
      { id: "voiture", v: 130 / 3.6 },                        // 130 km/h, par rapport à la route
      { id: "avion", v: 250 },                                // croisière, par rapport à l'air
      { id: "gps", v: orbitSpeed(GPS_A) },                    // par rapport au référentiel géocentrique
      { id: "iss", v: orbitSpeed(R_E + ISS_H) },              // id.
      { id: "terre", v: 2 * Math.PI * AU / YEAR },            // autour du Soleil, référentiel héliocentrique
      { id: "crt", v: crt.beta * C, beta: crt.beta, gamma: crt.gamma },                                   // électron accéléré sous 25 kV
      { id: "lhc", v: lhc.beta * C, beta: lhc.beta, gamma: lhc.gamma, oneMinusBeta: lhc.oneMinusBeta },  // proton de 6,8 TeV
    ].map(o => Object.assign({ beta: o.v / C }, o));
  }

  /* ---------- les trois nombres qui décrivent le système ---------- */
  /* écart de potentiel entre deux altitudes h1 → h2 au-dessus du rayon équatorial, rapporté à c² (champ faible, Terre sphérique) */
  function deltaPhiOverC2(h1, h2) { num(h1, "h1"); num(h2, "h2"); if (!(h1 > -R_E && h2 > -R_E)) throw new RangeError("altitude > \u2212R attendue");
    return GM / C2 * (1 / (R_E + h1) - 1 / (R_E + h2)); }
  /* approximation de surface g Δh / c² */
  const ghOverC2 = (dh, g) => (g == null ? G0 : g) * dh / C2;
  const PER_METRE = G0 / C2;
  /* taille du système contre trajet de la lumière pendant la mesure */
  function propagation(L, dt) { num(L, "L"); num(dt, "Δt"); if (!(L >= 0 && dt > 0)) throw new RangeError("L ≥ 0, Δt > 0 attendus"); return L / (C * dt); }
  function describe(o) { const b = betaOf(o.v); return { beta: b, beta2: b * b, phi: deltaPhiOverC2(0, o.dh || 0), prop: propagation(o.L || 0, o.dt) }; }

  /* ---------- GPS : satellite contre horloge au sol sur le géoïde ----------
     dτ/dt = 1 − U/c² − v²/(2c²) dans le référentiel géocentrique ; au sol, U/c² + v_sol²/(2c²) = L_G (rotation comprise).
     Orbite circulaire de rayon a : v² = GM/a. Par jour : vitesse −GM/(2ac²), altitude L_G − GM/(ac²), bilan L_G − 3GM/(2ac²). */
  function gps(a) {
    a = a == null ? GPS_A : a; const u = GM / (a * C2);
    return { v: orbitSpeed(a), kin: -u / 2, grav: L_G - u, net: L_G - 1.5 * u,
      perDay: { kin: -u / 2 * DAY, grav: (L_G - u) * DAY, net: (L_G - 1.5 * u) * DAY } };
  }

  /* ---------- bilan d'une comparaison d'horloges ----------
     o : { v (vitesse relative, m·s⁻¹), dh (m), L (m), dt (s), ua (incertitude absolue, s), ur (incertitude relative) }.
     Effet de vitesse −(1 − 1/γ), effet d'altitude +ΔΦ/c² (horloge plus haute : plus rapide) ; ils s'additionnent.
     Incertitude sur l'écart accumulé : u = √(ua² + (ur Δt)²). z = |écart| / u. */
  function budget(o) {
    num(o.dt, "Δt"); if (!(o.dt > 0)) throw new RangeError("Δt > 0 attendu");
    const ua = o.ua || 0, ur = o.ur || 0; if (!(ua >= 0 && ur >= 0) || ua + ur === 0) throw new RangeError("incertitude > 0 attendue");
    const d = describe(o), kin = -oneMinusInvGamma(d.beta), grav = d.phi, net = kin + grav;
    const u = Math.hypot(ua, ur * o.dt), urEff = u / o.dt;
    const z = x => Math.abs(x * o.dt) / u;
    const res = Object.assign(d, {
      kin, grav, net, offset: net * o.dt, offsetKin: kin * o.dt, offsetGrav: grav * o.dt, delay: (o.L || 0) / C,
      u, urEff, z: z(net), zKin: z(kin), zGrav: z(grav), zProp: ((o.L || 0) / C) / u,
      kinetic: kineticNewtonError(d.beta), momentum: momentumNewtonError(d.beta),
    });
    res.verdict = res.z > Z_SEUIL ? "relat" : (res.zKin > Z_SEUIL || res.zGrav > Z_SEUIL) ? "compense" : "newton";
    return res;
  }

  /* seuils : vitesse et dénivelé qui donnent z = Z_SEUIL pour une incertitude relative ur (premier ordre) */
  const speedThreshold = (ur, z) => C * Math.sqrt(2 * (z || Z_SEUIL) * ur);
  const heightThreshold = (ur, z, g) => (z || Z_SEUIL) * ur * C2 / (g == null ? G0 : g);

  /* β pour lequel une erreur relative vaut e (bissection : les erreurs croissent avec β) */
  function betaForError(f, e) {
    num(e, "e"); if (!(e > 0 && e < 1)) throw new RangeError("0 < e < 1 attendu");
    let a = 0, b = 1 - 1e-15;
    for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (f(m) < e) a = m; else b = m; }
    return (a + b) / 2;
  }

  /* instruments : incertitude absolue ua (s) et relative ur (ordres de grandeur, voir la page) */
  const INSTRUMENTS = {
    main: { ua: 0.1, ur: 6e-6 },          // chronomètre déclenché à la main : ≈ 0,1 s, mouvement à quartz
    quartz: { ua: 0, ur: 6e-6 },          // montre à quartz : ≈ 15 s par mois
    cesium: { ua: 10e-9, ur: 0 },         // horloges au césium de Hafele et Keating : ≈ 10 ns sur l'écart final
    optique: { ua: 0, ur: 8.6e-18 },      // horloge optique à ion aluminium de Chou et al. (2010)
  };

  /* écart normalisé de deux valeurs indépendantes (leçon « Incertitude absolue et incertitude relative ») */
  function zScore(x1, u1, x2, u2) { [x1, u1, x2, u2].forEach(x => num(x, "z")); const u = Math.hypot(u1, u2);
    if (!(u > 0)) throw new RangeError("incertitude > 0 attendue"); return Math.abs(x1 - x2) / u; }
  /* Hafele et Keating (Science, 1972) : écarts en ns, prévision relativiste et mesure, avec incertitudes-types ; Newton prévoit 0 */
  const HAFELE = { est: { prev: -40, uPrev: 23, mes: -59, uMes: 10 }, ouest: { prev: 275, uPrev: 21, mes: 273, uMes: 7 } };

  /* systèmes types du calculateur : vitesse relative, dénivelé, taille, durée, instrument */
  const PRESETS = {
    sprint: { v: 10, dh: 0.001, L: 100, dt: 10, instr: "main" },
    voiture: { v: 30, dh: 0.001, L: 1000, dt: 3600, instr: "quartz" },
    avion: { v: 250, dh: 1e4, L: 1e4, dt: DAY, instr: "cesium" },
    iss: { v: orbitSpeed(R_E + ISS_H), dh: ISS_H, L: ISS_H, dt: DAY, instr: "cesium" },
    gps: { v: orbitSpeed(GPS_A), dh: GPS_A - R_E, L: GPS_A - R_E, dt: DAY, instr: "cesium" },
    chou: { v: 10, dh: 0.33, L: 75, dt: 3600, instr: "optique" },
  };

  const api = { C, G0, GM, R_E, L_G, DAY, YEAR, AU, GPS_A, ISS_H, MC2_E, MC2_P, Z_SEUIL, PER_METRE, INSTRUMENTS,
    gamma, gammaMinusOne, gammaMinusOneNaive, oneMinusInvGamma, coef, gammaTail,
    kineticNewtonError, kineticNewtonLead, kineticSecondError, kineticSecondLead, gammaSecondError, gammaSecondLead,
    momentumNewtonError, momentumNewtonLead, dilationFirstOrderRest, dilationFirstOrderLead, addVelocities,
    betaOf, fromProper, fromGamma, fromKinetic, orbitSpeed, objets, deltaPhiOverC2, ghOverC2, propagation, describe,
    gps, budget, speedThreshold, heightThreshold, betaForError, zScore, HAFELE, PRESETS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OubliRelat = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de l'article « C'est quoi le temps ? » : marche des horloges en orbite (relativité, champ faible),
   dilatation due à la vitesse, probabilité d'un retour en arrière statistique.
   Modèle simple : Terre sphérique de rayon équatorial, horloge au sol à l'équateur, orbite circulaire.
   SI : distances en m, vitesses en m·s⁻¹, durées en s. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, GM = Cst.GM_E, OMEGA = Cst.Omega_E;
  const R_E = Cst.R_E_eq;              // m, rayon équatorial
  const SIDEREAL_DAY = 86164.0905;     // s
  const DAY = 86400;                   // s
  const C2 = C * C;

  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); };

  /* facteur de Lorentz γ = 1/√(1 − v²/c²) et γ − 1 calculé sans perte de chiffres aux faibles vitesses */
  function gamma(v) { if (!(Math.abs(v) < C)) throw new RangeError("vitesse : |v| < c attendue"); return 1 / Math.sqrt(1 - v * v / C2); }
  function gammaMinusOne(v) { const b2 = v * v / C2; if (!(b2 < 1)) throw new RangeError("vitesse : |v| < c attendue"); const s = Math.sqrt(1 - b2); return b2 / (s * (1 + s)); }
  /* retard d'une horloge mobile sur une horloge immobile, par jour de cette dernière : (1 − 1/γ) × 1 j */
  const lagPerDay = v => { const b2 = v * v / C2, s = Math.sqrt(1 - b2); return DAY * b2 / (1 + s); };

  /* vitesse sur une orbite circulaire de rayon r */
  function circularSpeed(r) { pos(r, "rayon"); return Math.sqrt(GM / r); }
  const groundSpeed = () => OMEGA * R_E;

  /* avance relative d'une horloge en orbite circulaire à l'altitude h sur une horloge au sol (champ faible) :
     gravitation (GM/c²)(1/R − 1/r) > 0, cinématique −(v² − v_sol²)/(2c²) < 0 */
  function orbitRates(h) {
    if (!(h >= 0) || !isFinite(h)) throw new RangeError("altitude : ≥ 0 attendue");
    const r = R_E + h, v = circularSpeed(r), vg = groundSpeed();
    const grav = GM / C2 * (1 / R_E - 1 / r), kin = -(v * v - vg * vg) / (2 * C2);
    return { r, v, grav, kin, net: grav + kin };
  }
  /* même chose en secondes par jour */
  function orbitPerDay(h) { const o = orbitRates(h); return { r: o.r, v: o.v, grav: o.grav * DAY, kin: o.kin * DAY, net: o.net * DAY }; }

  /* altitude où les deux effets se compensent (bissection) */
  function crossover() {
    let a = 0, b = 1e8;
    for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (orbitRates(m).net < 0) a = m; else b = m; }
    return (a + b) / 2;
  }
  /* altitude géostationnaire : période = jour sidéral */
  const geoAltitude = () => Math.cbrt(GM * SIDEREAL_DAY * SIDEREAL_DAY / (4 * Math.PI * Math.PI)) - R_E;

  /* horloge plus haute de Δh près du sol : avance relative g Δh / c² */
  const heightShift = (dh, g) => (g == null ? Cst.g0 : g) * dh / C2;

  /* erreur de distance accumulée si l'on ignore un décalage d'horloge Δt : c Δt */
  const rangeError = dt => C * Math.abs(dt);

  /* probabilité que N molécules indépendantes se trouvent toutes dans une moitié donnée de la boîte : 2^−N */
  function allInHalf(N) { if (!(Number.isInteger(N) && N >= 0)) throw new RangeError("N : entier ≥ 0 attendu"); return Math.pow(2, -N); }
  const log10AllInHalf = N => -N * Math.LOG10E * Math.LN2;

  const api = { C, GM, R_E, OMEGA, DAY, SIDEREAL_DAY, gamma, gammaMinusOne, lagPerDay, circularSpeed, groundSpeed, orbitRates, orbitPerDay, crossover, geoAltitude, heightShift, rangeError, allInHalf, log10AllInHalf };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Chrono = api;
})(typeof self !== "undefined" ? self : this);

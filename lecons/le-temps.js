/* Calcul de la leçon « Le temps » (Feynman I, §5-2) : période du pendule simple, petites et grandes amplitudes.
   SI : longueurs en m, g en m·s⁻², angles en rad, durées en s. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G0 = Cst.g0;                  // pesanteur normale, m·s⁻²
  const DAY = 86400;                  // s

  /* période des petites oscillations : T0 = 2π √(L/g) */
  function period0(L, g) {
    g = g == null ? G0 : g;
    if (!(L > 0) || !(g > 0)) throw new RangeError("période : L et g doivent être > 0");
    return 2 * Math.PI * Math.sqrt(L / g);
  }

  /* moyenne arithmético-géométrique : converge quadratiquement */
  function agm(a, b) {
    if (!(a >= 0) || !(b >= 0)) throw new RangeError("agm : arguments positifs attendus");
    for (let i = 0; i < 60 && Math.abs(a - b) > 1e-15 * a; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
    return (a + b) / 2;
  }

  /* T(θ0)/T0 exact pour le pendule simple : 1 / agm(1, cos(θ0/2)), θ0 dans [0, π[ */
  function ratioExact(theta0) {
    const th = Math.abs(theta0);
    if (!(th < Math.PI)) throw new RangeError("amplitude : |θ0| < π attendu");
    return 1 / agm(1, Math.cos(th / 2));
  }

  /* formule de Borda : T ≈ T0 (1 + θ0²/16) */
  const ratioBorda = theta0 => 1 + theta0 * theta0 / 16;

  const periodExact = (L, theta0, g) => period0(L, g) * ratioExact(theta0);

  /* retard accumulé en un jour par une horloge réglée sur les petites oscillations, en s */
  const dailyDelay = theta0 => DAY * (ratioExact(theta0) - 1);

  /* longueur qui donne la période T : L = g T² / (4π²) */
  function lengthForPeriod(T, g) {
    g = g == null ? G0 : g;
    if (!(T > 0)) throw new RangeError("longueur : T > 0 attendu");
    return g * T * T / (4 * Math.PI * Math.PI);
  }

  const deg = d => d * Math.PI / 180;

  const api = { G0, DAY, period0, agm, ratioExact, ratioBorda, periodExact, dailyDelay, lengthForPeriod, deg };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Temps = api;
})(typeof self !== "undefined" ? self : this);

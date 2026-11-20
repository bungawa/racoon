/* Calcul de la leçon « Les temps courts » (Feynman I, §5-3) : chronométrer par une vitesse connue,
   longueur de désintégration d'une particule instable. SI : m, s, m·s⁻¹. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c;
  const TAU_PI0 = 8.43e-17;           // durée de vie moyenne du pion neutre au repos, s (PDG)

  /* temps de parcours d'une distance d à la vitesse v */
  function flightTime(d, v) {
    if (!(d >= 0)) throw new RangeError("distance ≥ 0 attendue");
    if (!(v > 0) || v > C) throw new RangeError("vitesse dans ]0, c] attendue");
    return d / v;
  }

  /* β = v/c à partir de βγ = p/(mc) : β = βγ / √(1 + (βγ)²) */
  function beta(bg) {
    if (!(bg >= 0)) throw new RangeError("βγ ≥ 0 attendu");
    return bg / Math.sqrt(1 + bg * bg);
  }
  const gamma = bg => Math.sqrt(1 + bg * bg);

  /* longueur moyenne parcourue avant désintégration : ℓ = βγ c τ */
  function decayLength(tau, bg) {
    if (!(tau > 0)) throw new RangeError("durée de vie > 0 attendue");
    return beta(bg) * gamma(bg) * C * tau;
  }

  /* durée de vie lue au laboratoire : γ τ */
  const labLifetime = (tau, bg) => gamma(bg) * tau;

  /* réciproque, celle qu'utilise l'expérimentateur : τ = ℓ / (βγ c) */
  function lifetimeFromLength(len, bg) {
    if (!(bg > 0)) throw new RangeError("βγ > 0 attendu");
    return len / (bg * C);
  }

  /* fraction des particules qui parcourent plus que x : exp(-x/ℓ) */
  const survival = (x, len) => Math.exp(-x / len);

  /* nombre de périodes d'un oscillateur de fréquence f pendant t */
  const periodsIn = (t, f) => t * f;

  const api = { C, TAU_PI0, flightTime, beta, gamma, decayLength, labLifetime, lifetimeFromLength, survival, periodsIn };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TempsCourts = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de l'article « C'est quoi l'électricité ? » : dérive des électrons dans un fil de cuivre, effet Joule.
   SI : courants en A, sections en m², vitesses en m·s⁻¹, résistivité en Ω·m. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const E = Cst.e, NA = Cst.N_A;
  const RHO_M = 8.94e3;               // kg·m⁻³, masse volumique du cuivre
  const M_CU = 63.546e-3;             // kg·mol⁻¹
  const N_CU = RHO_M * NA / M_CU;     // électrons libres par m³ : un par atome, ≈ 8,5 × 10²⁸
  const RHO_CU = 1.68e-8;             // Ω·m, résistivité du cuivre à 293 K
  const V_SIGNAL = 2e8;               // m·s⁻¹, ordre de grandeur de la vitesse d'un signal dans un câble (≈ 0,66 c)

  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); };

  /* I = n e v S  ⇒  v = I / (n e S) */
  function driftSpeed(I, S, n) {
    n = n == null ? N_CU : n; pos(S, "section"); pos(n, "densité d'électrons");
    if (!isFinite(I)) throw new RangeError("courant : nombre fini attendu");
    return I / (n * E * S);
  }

  /* temps pour que la dérive fasse avancer un électron de la distance L */
  function driftTime(L, I, S) { pos(L, "distance"); pos(I, "courant"); return L / driftSpeed(I, S); }

  /* électrons qui franchissent une section par seconde */
  const electronsPerSecond = I => Math.abs(I) / E;

  /* alternatif de valeur efficace Ieff à la fréquence f : la vitesse vaut v0 sin(ωt), v0 = √2 Ieff/(n e S) ;
     la position oscille avec l'amplitude v0/ω */
  function acAmplitude(Ieff, S, f) { pos(f, "fréquence"); return Math.SQRT2 * driftSpeed(Math.abs(Ieff), S) / (2 * Math.PI * f); }

  /* résistance linéique ρ/S (Ω·m⁻¹) et puissance Joule par mètre R I² (W·m⁻¹) ; en alternatif, Ieff */
  function resistancePerLength(S, rho) { pos(S, "section"); return (rho == null ? RHO_CU : rho) / S; }
  const joulePerLength = (I, S, rho) => resistancePerLength(S, rho) * I * I;

  /* tension crête d'une tension sinusoïdale de valeur efficace U */
  const peak = Ueff => Math.SQRT2 * Ueff;

  /* condensateur : charge et énergie (décharge électrostatique du corps humain) */
  const charge = (C, U) => C * U;
  const energy = (C, U) => C * U * U / 2;

  const api = { E, NA, N_CU, RHO_CU, V_SIGNAL, driftSpeed, driftTime, electronsPerSecond, acAmplitude, resistancePerLength, joulePerLength, peak, charge, energy };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Electricite = api;
})(typeof self !== "undefined" ? self : this);

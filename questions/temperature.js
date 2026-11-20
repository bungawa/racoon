/* Calcul de l'article « C'est quoi la température ? » : énergie cinétique moyenne, vitesses de Maxwell, tirage d'un gaz.
   SI : températures en K, masses en kg, vitesses en m·s⁻¹, énergies en J. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const KB = Cst.k_B, U = Cst.u;
  const ZERO_C = 273.15;                    // 0 °C en K (exact)
  const GAZ = { he: 4.002602, ar: 39.948, xe: 131.293 };   // masses molaires en g·mol⁻¹ ⇒ masses atomiques en u

  const pos = (x, name) => { if (!(x > 0)) throw new RangeError(name + " > 0 attendu"); return x; };
  const masseAtome = id => { if (!(id in GAZ)) throw new RangeError("gaz inconnu : " + id); return GAZ[id] * U; };

  /* énergie cinétique de translation moyenne d'une molécule : (3/2) kB T */
  const ecMoy = T => 1.5 * KB * pos(T, "T");
  /* vitesses caractéristiques de la loi de Maxwell */
  const vQuad = (T, m) => Math.sqrt(3 * KB * pos(T, "T") / pos(m, "m"));
  const vMoy = (T, m) => Math.sqrt(8 * KB * pos(T, "T") / (Math.PI * pos(m, "m")));
  const vProb = (T, m) => Math.sqrt(2 * KB * pos(T, "T") / pos(m, "m"));
  /* densité de probabilité de la norme de la vitesse, en s·m⁻¹ */
  function maxwell(v, T, m) {
    const a = pos(m, "m") / (2 * KB * pos(T, "T"));
    return v < 0 ? 0 : 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * v * v * Math.exp(-a * v * v);
  }
  /* une vitesse tirée au hasard : trois composantes gaussiennes d'écart type √(kB T / m) ; rng() uniforme dans [0, 1[ */
  function tirage(rng, T, m) {
    const s = Math.sqrt(KB * pos(T, "T") / pos(m, "m")), g = () => { let u = 0; while (u === 0) u = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng()); };
    return [s * g(), s * g(), s * g()];
  }
  /* chauffer ou refroidir un gaz à l'équilibre : toutes les vitesses sont multipliées par √(T'/T) */
  const facteur = (T, T2) => Math.sqrt(pos(T2, "T'") / pos(T, "T"));
  const celsius = T => T - ZERO_C;
  /* énergie en meV (1 eV = 1,602 176 634 × 10⁻¹⁹ J, exact) */
  const meV = E => E / 1.602176634e-22;

  const api = { KB, U, ZERO_C, GAZ, masseAtome, ecMoy, vQuad, vMoy, vProb, maxwell, tirage, facteur, celsius, meV };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Temperature = api;
})(typeof self !== "undefined" ? self : this);

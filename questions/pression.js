/* Calcul de l'article « C'est quoi la pression ? » : hydrostatique, atmosphère type, origine cinétique.
   SI : pressions en Pa, profondeurs et altitudes en m, températures en K, masses en kg. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const P0 = Cst.atm, G0 = Cst.g0, KB = Cst.k_B, R = Cst.R, U = Cst.u;
  const RHO_W = 1000;                 // kg·m⁻³, eau douce
  const M_N2 = 28.0134 * U;           // kg, une molécule de diazote
  /* atmosphère type, troposphère (0 à 11 km) : T = T0 − L h, P = P0 (1 − L h / T0)^(g M / (R L)) */
  const T0 = 288.15, LAPSE = 0.0065, M_AIR = 0.0289644, H_MAX = 11000;
  const EXPO = G0 * M_AIR / (R * LAPSE);

  const nonneg = (x, what) => { if (!(x >= 0) || !isFinite(x)) throw new RangeError(what + " : ≥ 0 attendu"); };
  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); };

  /* eau au repos : P = P0 + ρ g z, z profondeur */
  function water(z, rho, p0) { nonneg(z, "profondeur"); return (p0 == null ? P0 : p0) + (rho == null ? RHO_W : rho) * G0 * z; }

  /* atmosphère type : température et pression à l'altitude h (troposphère) */
  function isaTemperature(h) { nonneg(h, "altitude"); if (h > H_MAX) throw new RangeError("altitude : 11 km au plus (troposphère)"); return T0 - LAPSE * h; }
  function isa(h) { return P0 * Math.pow(isaTemperature(h) / T0, EXPO); }

  /* atmosphère isotherme : P = P0 exp(−h/H), H = R T / (M g) */
  const scaleHeight = T => { pos(T, "température"); return R * T / (M_AIR * G0); };
  function isothermal(h, T) { nonneg(h, "altitude"); return P0 * Math.exp(-h / scaleHeight(T == null ? T0 : T)); }

  /* gaz parfait : densité particulaire n = P / (kB T) */
  function numberDensity(p, T) { pos(p, "pression"); pos(T, "température"); return p / (KB * T); }
  /* vitesse moyenne de Maxwell : √(8 kB T / (π m)) */
  function meanSpeed(T, m) { pos(T, "température"); return Math.sqrt(8 * KB * T / (Math.PI * (m == null ? M_N2 : m))); }
  /* chocs par unité de surface et de temps sur une paroi : n ⟨v⟩ / 4 */
  const wallFlux = (p, T, m) => numberDensity(p, T) * meanSpeed(T, m) / 4;
  /* P = n m ⟨v²⟩ / 3, avec ⟨v²⟩ = 3 kB T / m : retrouve P = n kB T (contrôle de cohérence) */
  const kineticPressure = (n, T, m) => n * (m == null ? M_N2 : m) * (3 * KB * T / (m == null ? M_N2 : m)) / 3;

  /* loi de Boyle-Mariotte, à température constante : V = V0 P0 / P */
  function boyle(V0, p0, p) { pos(V0, "volume"); pos(p0, "pression initiale"); pos(p, "pression"); return V0 * p0 / p; }

  /* surface de contact d'un pneu : la pression relative porte le poids */
  function contactArea(mass, gauge) { pos(mass, "masse"); pos(gauge, "pression relative"); return mass * G0 / gauge; }

  const api = { P0, G0, RHO_W, KB, R, U, M_N2, T0, LAPSE, M_AIR, H_MAX, EXPO, water, isaTemperature, isa, scaleHeight, isothermal, numberDensity, meanSpeed, wallFlux, kineticPressure, boyle, contactArea };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Pression = api;
})(typeof self !== "undefined" ? self : this);

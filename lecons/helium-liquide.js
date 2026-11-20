/* HeliumLiquide — la leçon « L'hélium liquide » (Feynman III.4.6) : décrire le liquide avant d'y appliquer une statistique.
   Pur, sans DOM, UMD (global HeliumLiquide). SI : kg, m, K.
     HELIUM               { he4, he3 } : { m (kg), rho (kg·m⁻³), spin } des liquides sous leur pression de vapeur saturante.
                          he4 : 146,11 kg·m⁻³ au point λ, 2,1768 K (Donnelly et Barenghi, J. Phys. Chem. Ref. Data 27, 1217, 1998) ;
                          he3 : 3,016 029 g·mol⁻¹ sur 36,873 cm³·mol⁻¹, le volume molaire à T → 0 et P → 0, soit 81,8 kg·m⁻³.
                          Masse de l'hélium 4 : Statistique.M.He. Densités tenues constantes : le liquide se dilate de 17 %
                          entre 2,2 K et 4,2 K (125 kg·m⁻³ à l'ébullition).
     T_LAMBDA             2,1768 K : le point λ de l'hélium 4 sous sa pression de vapeur saturante.
     systeme(iso, T)      { n, d = n^(−1/3), lambda = λ_th, rapport = λ_th/d, degenerescence = n λ_th³, Tc (gaz de Bose parfait
                          de même densité, he4) ou TF (gaz de Fermi parfait, he3), fraction (condensée, gaz parfait, he4) }.
                          λ_th = Statistique.lambdaTh ; Tc, TF : QuantAmp. Les atomes du liquide interagissent fortement :
                          Tc et TF sont des ordres de grandeur, pas des prédictions. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const C = node ? require("../constantes.js") : root.Constantes;
  const S = node ? require("../statistique.js") : root.Statistique;
  const Q = node ? require("../quantique-amplitudes.js") : root.QuantAmp;
  const err = m => { throw new Error("HeliumLiquide : " + m); };

  const M3 = 3.016029e-3;                                      // kg·mol⁻¹, helium 3 (atomic mass 3,016 029 u)
  const HELIUM = Object.freeze({
    he4: Object.freeze({ m: S.M.He / C.N_A, rho: 146.11, spin: 0 }),
    he3: Object.freeze({ m: M3 / C.N_A, rho: M3 / 36.873e-6, spin: 0.5 }),
  });
  const T_LAMBDA = 2.1768;

  function systeme(iso, T) {
    const he = HELIUM[iso] || err("isotope inconnu : " + iso);
    if (!(Number.isFinite(T) && T > 0)) err("T doit être un nombre > 0");
    const n = he.rho / he.m, d = Math.cbrt(1 / n), lambda = S.lambdaTh(he.m, T);
    const out = { n, d, lambda, rapport: lambda / d, degenerescence: n * lambda ** 3 };
    if (iso === "he4") { out.Tc = Q.tCondensation(n, he.m); out.fraction = Q.fractionCondensee(T, out.Tc); }
    else out.TF = Q.energieFermi(n, he.m) / C.k_B;
    return out;
  }

  const api = Object.freeze({ HELIUM, T_LAMBDA, systeme });
  if (node) module.exports = api;
  else root.HeliumLiquide = api;
})(typeof self !== "undefined" ? self : this);

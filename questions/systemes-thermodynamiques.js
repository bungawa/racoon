/* Calcul de l'article « Isolé, fermé, ouvert : quel système choisir ? ». La même compression adiabatique réversible d'un
   gaz parfait, comptée sur un système fermé (une masse de gaz qu'on suit) et sur un système ouvert (une machine traversée
   en régime permanent). Par kilogramme ; air sec par défaut ; γ constant. SI : Pa, m³·kg⁻¹, K, J·kg⁻¹. Pur, sans DOM.

     R_AIR                     287,05 J·kg⁻¹·K⁻¹.
     cp(gamma), cv(gamma)      γR/(γ − 1) et R/(γ − 1).
     adiabatique(o)            o = { T1 (300), p1 (atm), pi (p2/p1, 2), gamma (1,4) } : l'adiabatique réversible pv^γ = cte.
                               { T2, v1, v2, p2, ferme: cv(T2 − T1) = −∫p dv, travail reçu par la masse de gaz ;
                                 ouvert: cp(T2 − T1) = ∫v dp, travail reçu par la machine traversée (travail utile) ;
                                 transvasement: p2v2 − p1v1 = R(T2 − T1), poussée de l'amont moins celle de l'aval }.
                               ouvert = ferme + transvasement ; ouvert/ferme = γ. pi < 1 : une détente, travaux négatifs.
     courbe(o, n)              n + 1 points [v, p] de l'adiabatique, de 1 à 2.
     isole(o)                  détente de Joule d'un gaz parfait dans un récipient isolé, o = { T1, v1, v2 } :
                               { W: 0, Q: 0, dU: 0, T2: T1, dS: R ln(v2/v1) } par kilogramme. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const R_AIR = 287.05, PA = Cst.atm;
  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); return x; };
  const gam = g => { g = g == null ? 1.4 : g; if (!(g > 1 && g <= 5 / 3 + 1e-12)) throw new RangeError("gamma : entre 1 et 5/3 attendu"); return g; };
  const cp = g => gam(g) * R_AIR / (gam(g) - 1), cv = g => R_AIR / (gam(g) - 1);

  function adiabatique(o) {
    o = o || {};
    const g = gam(o.gamma), T1 = pos(o.T1 == null ? 300 : o.T1, "T1"), p1 = pos(o.p1 == null ? PA : o.p1, "p1"), pi = pos(o.pi == null ? 2 : o.pi, "pi");
    const T2 = T1 * Math.pow(pi, (g - 1) / g), p2 = pi * p1, v1 = R_AIR * T1 / p1, v2 = R_AIR * T2 / p2;
    return { T1, T2, p1, p2, v1, v2, gamma: g, ferme: cv(g) * (T2 - T1), ouvert: cp(g) * (T2 - T1), transvasement: p2 * v2 - p1 * v1 };
  }
  function courbe(o, n) {
    const a = adiabatique(o); n = n || 60;
    return Array.from({ length: n + 1 }, (_, i) => { const p = a.p1 * Math.pow(a.p2 / a.p1, i / n); return [a.v1 * Math.pow(a.p1 / p, 1 / a.gamma), p]; });
  }
  function isole(o) {
    o = o || {};
    const T1 = pos(o.T1 == null ? 300 : o.T1, "T1"), v1 = pos(o.v1 == null ? 1 : o.v1, "v1"), v2 = pos(o.v2 == null ? 2 : o.v2, "v2");
    return { W: 0, Q: 0, dU: 0, T2: T1, dS: R_AIR * Math.log(v2 / v1) };
  }

  const api = { R_AIR, PA, cp, cv, adiabatique, courbe, isole };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Systemes = api;
})(typeof self !== "undefined" ? self : this);

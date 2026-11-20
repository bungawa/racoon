/* Leçon « Le tableau périodique » (Feynman III.19.6) : configurations, énergies d'ionisation et charge effective des 36
   premiers éléments. Pur, sans DOM, UMD (global TableauQ).
   - IONISATION_EV[Z] : première énergie d'ionisation, eV, valeurs du NIST (Atomic Spectra Database) arrondies au meV, Z = 1 à 36.
   - configuration(Z) : [{ n, l, occ }] ; ordre de Madelung (QuantAmp.couchesElectrons) corrigé des deux exceptions de la
     période 4, Cr (3d⁵ 4s¹) et Cu (3d¹⁰ 4s¹). Modèle à particules indépendantes : valable pour l'état fondamental, Z ≤ 36.
   - externe(Z) : { n, l } de l'électron le moins lié (plus grand n occupé ; à n égal, plus grand l).
   - zEffectif(Z) : n √(W_I/E_R), la charge qu'un atome d'hydrogène fictif devrait porter pour avoir la même énergie
     d'ionisation au même n. Modèle grossier : il ignore le défaut quantique ; il chiffre l'écrantage. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const QA = node ? require("../quantique-amplitudes.js") : root.QuantAmp;
  const QS = node ? require("../quantique-schrodinger.js") : root.QuantSchro;
  const err = m => { throw new Error("TableauQ : " + m); };
  const SYMBOLES = [null, "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
    "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];
  const IONISATION_EV = [null, 13.598, 24.587, 5.392, 9.323, 8.298, 11.260, 14.534, 13.618, 17.423, 21.565, 5.139, 7.646, 5.986,
    8.152, 10.487, 10.360, 12.968, 15.760, 4.341, 6.113, 6.562, 6.828, 6.746, 6.767, 7.434, 7.902, 7.881, 7.640, 7.726, 9.394,
    5.999, 7.899, 9.789, 9.752, 11.814, 14.000];
  const ZMAX = 36;
  const z = Z => (Number.isInteger(Z) && Z >= 1 && Z <= ZMAX ? Z : err("Z doit être un entier de 1 à " + ZMAX));
  /* one electron moved from 4s to 3d: half-filled (Cr) and filled (Cu) d shells */
  const EXCEPTIONS = { 24: 1, 29: 1 };
  const configuration = Z => {
    z(Z); const c = QA.couchesElectrons(Z).map(({ n, l, occ }) => ({ n, l, occ }));
    if (EXCEPTIONS[Z]) { c.find(s => s.n === 4 && s.l === 0).occ -= 1; c.find(s => s.n === 3 && s.l === 2).occ += 1; }
    return c.filter(s => s.occ > 0);
  };
  const externe = Z => configuration(Z).reduce((b, s) => (s.n > b.n || (s.n === b.n && s.l > b.l) ? { n: s.n, l: s.l } : b), { n: 0, l: 0 });
  const zEffectif = Z => externe(Z).n * Math.sqrt(IONISATION_EV[z(Z)] * QS.e / QS.ER);
  const api = { SYMBOLES, IONISATION_EV, ZMAX, configuration, externe, zEffectif };
  if (node) module.exports = api;
  else root.TableauQ = api;
})(typeof self !== "undefined" ? self : this);

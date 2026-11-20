/* Calcul de l'article « C'est quoi la lumière ? » : photon d'une longueur d'onde donnée, effet photoélectrique.
   SI : longueurs d'onde en m, fréquences en Hz, énergies en J ; eV seulement pour l'affichage (1 eV = e × 1 V).
   Constantes exactes depuis 2019 (SI révisé). Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, H = Cst.h;
  const E = Cst.e;                // C : 1 eV = E joules

  /* bornes des couleurs (m), du violet au rouge ; en deçà de 380 nm l'ultraviolet, au-delà de 780 nm l'infrarouge (CIE) */
  const BANDS = [["uv", 0], ["violet", 380e-9], ["bleu", 450e-9], ["cyan", 485e-9], ["vert", 500e-9], ["jaune", 565e-9], ["orange", 590e-9], ["rouge", 625e-9], ["ir", 780e-9]];
  const VISIBLE = [380e-9, 780e-9];

  const check = lambda => { if (!(lambda > 0) || !isFinite(lambda)) throw new RangeError("longueur d'onde : > 0 attendue"); };

  /* ν = c / λ */
  function frequency(lambda) { check(lambda); return C / lambda; }

  /* énergie d'un photon, J : E = hν = hc/λ */
  function photonEnergy(lambda) { check(lambda); return H * C / lambda; }
  const photonEnergyEV = lambda => photonEnergy(lambda) / E;

  /* longueur d'onde seuil pour une énergie en eV : λ = hc / (W e) */
  function thresholdWavelength(eV) { if (!(eV > 0)) throw new RangeError("énergie seuil : > 0 attendue"); return H * C / (eV * E); }

  /* identifiant de la bande de couleur */
  function band(lambda) { check(lambda); let id = BANDS[0][0]; for (const [k, b] of BANDS) if (lambda >= b) id = k; return id; }

  /* effet photoélectrique : énergie cinétique maximale de l'électron (eV), ou null sous le seuil.
     Ne dépend pas de la puissance : la puissance fixe le nombre de photons, pas l'énergie de chacun. */
  function photoelectron(lambda, workEV) {
    if (!(workEV > 0)) throw new RangeError("travail de sortie : > 0 attendu");
    const k = photonEnergyEV(lambda) - workEV;
    return k >= 0 ? k : null;
  }

  /* nombre de photons par seconde d'un faisceau de puissance P (W) */
  function photonRate(power, lambda) { if (!(power >= 0)) throw new RangeError("puissance : ≥ 0 attendue"); return power / photonEnergy(lambda); }

  const api = { C, H, E, BANDS, VISIBLE, frequency, photonEnergy, photonEnergyEV, thresholdWavelength, band, photoelectron, photonRate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Lumiere = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de l'article « C'est quoi l'énergie ? » : unités d'énergie, échelle des énergies, pendule avec ou sans frottement.
   SI : énergies en J, longueurs en m, angles en rad, durées en s. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const Integ = typeof module !== "undefined" && module.exports ? require("../lecons/integration.js") : root.Integ;
  const G0 = Cst.g0, H = Cst.h, C = Cst.c, KB = Cst.k_B;
  const UNITES = { J: 1, kWh: 3.6e6, kcal: 4184, eV: Cst.e };   // kcal thermochimique ; eV exact

  /* x exprimé dans l'unité de, converti dans l'unité vers */
  function convertir(x, de, vers) {
    if (!(de in UNITES) || !(vers in UNITES)) throw new RangeError("unité inconnue : " + (de in UNITES ? vers : de));
    return x * UNITES[de] / UNITES[vers];
  }

  /* échelle des énergies, en J, chacune calculée depuis sa définition ou sa source */
  const ECHELLE = [
    ["kT", KB * 300],                          // agitation thermique d'une molécule à 300 K
    ["photon", H * C / 550e-9],                // un photon vert, λ = 550 nm
    ["lever", 1 * G0 * 1],                     // lever 1 kg de 1 m
    ["telephone", 12.98 * 3600],               // batterie de téléphone, 12,98 Wh
    ["voiture", 0.5 * 1500 * 36 * 36],         // voiture de 1 500 kg à 36 m·s⁻¹
    ["kwh", 3.6e6],                            // 1 kWh
    ["ration", 8.4e6],                         // apport de référence quotidien, 8 400 kJ
    ["tnt", 4.184e9],                          // une tonne de TNT (convention)
    ["gramme", 1e-3 * C * C],                  // énergie de masse de 1 g
    ["monde", 620e18],                         // consommation mondiale d'énergie primaire, 2023 : 620 EJ
    ["soleil", Cst.L_sun],                     // ce que le Soleil rayonne en 1 s
  ];

  /* rang de l'échelle le plus proche de E (en écart logarithmique) */
  function voisin(E) {
    if (!(E > 0)) throw new RangeError("énergie > 0 attendue");
    let best = 0;
    ECHELLE.forEach(([, v], i) => { if (Math.abs(Math.log10(E / v)) < Math.abs(Math.log10(E / ECHELLE[best][1]))) best = i; });
    return best;
  }

  /* pendule simple amorti : θ'' = −(g/L) sin θ − γ θ' ; un pas de Runge-Kutta d'ordre 4 (Integ.rk4) */
  function pas(s, dt, L, g, gamma) {
    const [th, om] = Integ.rk4((t, y) => [y[1], -(g / L) * Math.sin(y[0]) - gamma * y[1]], 0, [s.th, s.om], dt);
    return { th, om };
  }
  /* énergies cinétique et potentielle (origine au point bas) d'une masse m au bout d'un fil de longueur L */
  const energies = (s, m, L, g) => ({ ec: 0.5 * m * L * L * s.om * s.om, ep: m * g * L * (1 - Math.cos(s.th)) });

  const api = { G0, H, C, KB, UNITES, convertir, ECHELLE, voisin, pas, energies };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Energie = api;
})(typeof self !== "undefined" ? self : this);

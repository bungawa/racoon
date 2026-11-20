/* Épreuve de l'étape « Liaisons à deux états » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      noeud: { prompt: "Dans l'ion H₂⁺, pourquoi l'état aux amplitudes égales sur les deux protons est-il le plus bas ?",
        options: { a: "Parce que les protons s'y repoussent moins.", b: "Parce que l'électron, réparti sans nœud sur deux centres, peut avoir une impulsion et une énergie cinétique plus faibles.", c: "Parce que l'électron y reste sur un seul proton.", d: "Parce que son moment cinétique est nul." },
        why: "Dans l'état aux amplitudes opposées, la fonction d'onde s'annule entre les protons : l'électron est plus confiné. Leçon « L'ion moléculaire d'hydrogène »." },
      dissymetrie: { prompt: "Un électron est partagé entre deux noyaux dont les états de base diffèrent de 20 A en énergie. De combien l'état le plus bas descend-il ?",
        options: { a: "De A.", b: "De 20 A.", c: "De 2 A.", d: "D'environ A/20 : une liaison à un électron entre noyaux différents est faible." },
        why: "D'après (10.8), le décalage vaut A²/(H₁₁ \u2212 H₂₂) = A/20. Leçon « L'ion moléculaire d'hydrogène »." },
      portee: { prompt: "Une particule de 280\u00a0MeV/c² est échangée entre deux nucléons. Quelle est la portée de l'interaction ? (ℏc = 197,3\u00a0MeV·fm)",
        options: { a: "Environ 0,7\u00a0fm.", b: "Environ 1,4\u00a0fm.", c: "Environ 2,8\u00a0fm.", d: "Infinie." },
        why: "r = ℏc/(mc²) = 197,3/280 ≈ 0,70\u00a0fm, deux fois moins que pour un seul pion. Leçon « Les forces nucléaires »." },
      coulomb: { prompt: "Pourquoi la loi de Coulomb a-t-elle une portée infinie, contrairement à la force nucléaire ?",
        options: { a: "Parce que la charge électrique est conservée.", b: "Parce que les électrons sont plus légers que les nucléons.", c: "Parce que le photon échangé n'a pas de masse : e\u202f(\u2212mcR/ħ) vaut 1 à toute distance.", d: "Parce que la force électrique est plus forte." },
        why: "Avec m = 0, (10.14) devient 1/R. Leçon « Les forces nucléaires »." },
      spins: { prompt: "Deux atomes d'hydrogène dont les électrons ont des spins parallèles se rapprochent. Que se passe-t-il ?",
        options: { a: "Ils forment une molécule, comme avec des spins opposés.", b: "Ils se repoussent : pour deux fermions de même spin, seule la combinaison d'espace antisymétrique est permise, et elle ne lie pas.", c: "Ils forment une molécule plus courte.", d: "Leurs spins se retournent pour qu'ils se lient." },
        why: "L'échange de deux électrons identiques change le signe de l'amplitude : l'état symétrique, celui qui lie, est interdit. Leçon « La molécule d'hydrogène »." },
      rencontre: { prompt: "Un électron a son spin vers le haut, l'autre vers le bas, quand leurs atomes se rencontrent. Quelle est la probabilité qu'ils se trouvent dans l'état de spin total nul ?",
        options: { a: "1/2.", b: "1.", c: "1/4.", d: "0." },
        why: "|+\u2212⟩ = (singulet + triplet de projection nulle)/√2 : probabilité 1/2, soit (1 \u2212 cos θ)/4 avec θ = 180°. Leçon « La molécule d'hydrogène »." },
      benzene: { prompt: "Que prédit le modèle à deux états pour l'orthodibromobenzène ?",
        options: { a: "Deux molécules différentes, selon que les bromes encadrent une liaison simple ou double.", b: "Aucune molécule stable.", c: "Deux molécules qui se transforment l'une en l'autre en quelques secondes.", d: "Une seule molécule, mélange à parts égales des deux dispositions de doubles liaisons." },
        why: "L'état fondamental E₀ \u2212 A donne la même amplitude aux deux dispositions. Leçon « La molécule de benzène à deux états »." },
      absorption: { prompt: "Le benzène est plus stable de 152\u00a0kJ·mol⁻¹, soit 1,58\u00a0eV par molécule. Que prédit le modèle à deux états, et que mesure-t-on ?",
        options: { a: "Pas d'absorption, et on n'en mesure pas.", b: "Une absorption à 785\u00a0nm, mesurée à 785\u00a0nm.", c: "Un état excité à 2A ≈ 3,2\u00a0eV, vers 390\u00a0nm ; on mesure 255\u00a0nm : le modèle trouve l'état, pas sa place.", d: "Une absorption à 255\u00a0nm exactement." },
        why: "λ = hc/(2A) ≈ 1\u00a0240/3,16 ≈ 390\u00a0nm. Leçon « La molécule de benzène à deux états »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

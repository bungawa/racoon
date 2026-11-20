/* Épreuve de l'étape « Paramagnétisme et résonance magnétique nucléaire » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      gadolinium: { prompt: "Deux sels contiennent autant d'ions magnétiques par mètre cube : des ions Gd³⁺ (j = 7/2, g = 2) dans l'un, des ions Cr³⁺ (j = 3/2, g = 2) dans l'autre. Loin de la saturation, à la même température, quel est le rapport de leurs susceptibilités ?",
        options: { a: "Celle du sel de gadolinium est environ 4,2 fois plus grande.", b: "Celle du sel de gadolinium est 7/3 fois plus grande, le rapport des spins.", c: "Elles sont égales, car g est le même.", d: "Celle du sel de gadolinium est environ 5,4 fois plus grande, le rapport des carrés des spins." },
        hint: "La constante de Curie est proportionnelle à g² j(j + 1).",
        why: "D'après (35.24a), χ est proportionnelle à j(j + 1) : (7/2)(9/2) = 15,75 contre (3/2)(5/2) = 3,75, soit un rapport 4,2. Le rapport des carrés, 49/9, oublierait que la longueur du moment vaut √(j(j + 1)) et non j. Leçon « Paramagnétisme des matériaux massifs »." },
      chrome: { prompt: "En 1952, un sel de chrome (Cr³⁺, j = 3/2, g = 2) atteint 99,5\u00a0% de sa saturation à 1,29\u00a0K sous 5\u00a0T. Quel est alors le moment moyen par ion ?",
        options: { a: "Environ 3,9\u00a0μB, la longueur g√(j(j + 1)) du moment.", b: "Environ 3\u00a0μB, la plus grande composante g j μB.", c: "Environ 1\u00a0μB, un magnéton par électron.", d: "Environ 1,5\u00a0μB." },
        why: "À saturation, chaque ion est dans l'état m = j : sa composante vaut g j μB = 3\u00a0μB. Un moment classique de même longueur saturerait à 2√(15/4) ≈ 3,9\u00a0μB : c'est cette différence que la mesure a tranchée. Leçon « Paramagnétisme des matériaux massifs »." },
      memeBT: { prompt: "Un sel paramagnétique, près de la saturation, est mesuré à 2\u00a0K sous 4\u00a0T, puis à 4\u00a0K sous 8\u00a0T. Comment change son aimantation, si ses moments sont indépendants ?",
        options: { a: "Elle double, comme le champ.", b: "Elle est divisée par deux, comme l'inverse de la température.", c: "Elle ne change pas.", d: "Elle augmente un peu, car on approche de la saturation." },
        why: "Pour des moments indépendants, les populations, donc l'aimantation (35.21a), ne dépendent que de B/T, ici 2\u00a0T·K⁻¹ dans les deux cas, quel que soit le régime. Leçons « Paramagnétisme des matériaux massifs » et « Refroidissement par désaimantation adiabatique »." },
      desaimantation: { prompt: "Un sel de spins indépendants, aimanté à 1,5\u00a0K sous 2\u00a0T, est isolé puis désaimanté lentement jusqu'à 20\u00a0mT. Réseau et champ interne négligés, quelle température atteint-il ?",
        options: { a: "1,5\u00a0K : une transformation adiabatique ne change pas la température.", b: "0,15\u00a0K.", c: "1,5\u00a0mK.", d: "15\u00a0mK." },
        hint: "L'entropie des spins reste constante, et elle ne dépend que de B/T.",
        why: "D'après (35.18b), T_f = 1,5\u00a0K × 20\u00a0mT/2\u00a0T = 15\u00a0mK. Leçon « Refroidissement par désaimantation adiabatique »." },
      plancher: { prompt: "Dans un sel aimanté à 1\u00a0K sous 1\u00a0T, les voisins de chaque ion créent un champ interne d'environ 50\u00a0mT. On ramène le champ appliqué à zéro, lentement. Quelle température atteint-on, au mieux ?",
        options: { a: "Environ 50\u00a0mK.", b: "Zéro, puisque le champ final est nul.", c: "Environ 2,5\u00a0mK, en (b/B)².", d: "Environ 0,5\u00a0K." },
        why: "D'après (35.18c), T_f = T_i b/√(B_i² + b²) ≈ 1\u00a0K × 0,05 = 50\u00a0mK. Les niveaux restent séparés sans champ appliqué : il faut des sels dilués pour descendre plus bas. Leçon « Refroidissement par désaimantation adiabatique »." },
      chaleur: { prompt: "Une mole d'ions de spin 1/2 est aimantée à 1\u00a0K jusqu'à l'alignement presque complet, au contact d'un bain. Quelle chaleur, au plus, le bain reçoit-il des spins ?",
        options: { a: "Zéro : aimanter ne dégage pas de chaleur.", b: "Environ 5,8\u00a0J, soit RT\u00a0ln\u00a02.", c: "Environ 8,3\u00a0J, soit RT.", d: "Environ 12\u00a0J, soit 3RT/2." },
        hint: "L'entropie des spins passe de R ln 2 à zéro, à température constante.",
        why: "À T constante, la chaleur cédée vaut TΔS = 1\u00a0K × 8,314\u00a0J·K⁻¹·mol⁻¹ × ln\u00a02 ≈ 5,8\u00a0J. Elle doit partir dans le bain avant qu'on isole le sel. Leçon « Refroidissement par désaimantation adiabatique »." },
      m0: { prompt: "Quelle est l'aimantation d'équilibre des protons de l'eau sous 1,5\u00a0T, à 310\u00a0K ? (6,7\u00a0×\u00a010²⁸ protons par mètre cube, γ ≈ 2,68\u00a0×\u00a010⁸\u00a0rad·s⁻¹·T⁻¹.)",
        options: { a: "Environ 9\u00a0×\u00a010²\u00a0A·m⁻¹, celle de tous les protons alignés.", b: "Environ 1,2\u00a0A·m⁻¹.", c: "Environ 4,7\u00a0×\u00a010⁻³\u00a0A·m⁻¹.", d: "Environ 2\u00a0×\u00a010⁻⁹\u00a0A·m⁻¹." },
        hint: "M0 = Nγ²ħ²B/(4kBT).",
        why: "D'après (35.22a), M0 = 6,7\u00a0×\u00a010²⁸ × (2,68\u00a0×\u00a010⁸)² × (1,05\u00a0×\u00a010⁻³⁴)² × 1,5/(4 × 1,38\u00a0×\u00a010⁻²³ × 310) ≈ 4,7\u00a0×\u00a010⁻³\u00a0A·m⁻¹ : cinq millionièmes de l'aimantation de saturation. Leçon « Résonance magnétique nucléaire »." },
      largeur: { prompt: "Une raie de protons a T2 = 2\u00a0ms, et l'oscillateur est assez faible pour ne pas saturer. Quelle est sa largeur totale à mi-hauteur, en fréquence ?",
        options: { a: "Environ 2\u00a0ms.", b: "Environ 500\u00a0Hz, soit 1/T2.", c: "Environ 3\u00a0kHz, soit 2π/T2.", d: "Environ 160\u00a0Hz, soit 1/(πT2)." },
        hint: "Demi-largeur 1/T2 en pulsation.",
        why: "D'après (35.22c), la demi-largeur en pulsation vaut 1/T2, donc la largeur totale 2/T2 = 1\u202f000\u00a0rad·s⁻¹, soit 1\u202f000/(2π) ≈ 160\u00a0Hz. Leçon « Résonance magnétique nucléaire »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

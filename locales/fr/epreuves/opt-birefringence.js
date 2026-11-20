/* Épreuve de l'étape « Biréfringence et polariseurs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      diffuse: { prompt: "Un faisceau de lumière naturelle traverse un gaz de molécules isotropes, petites devant λ. Quel est le degré de polarisation de la lumière diffusée à 60° du faisceau ?",
        options: { a: "60 %.", b: "75 %.", c: "100 %.", d: "25 %." },
        hint: "P = sin²θ/(1 + cos²θ).",
        why: "sin² 60° = 0,75 et cos² 60° = 0,25 : P = 0,75/1,25 = 0,6. Le rapport I∥/I⊥ vaut cos² 60° = 0,25 ; 75 % est sin² θ seul. Leçon « Polarisation de la lumière diffusée »." },
      ciel: { prompt: "Le Soleil est au zénith. On regarde le ciel juste au-dessus de l'horizon, vers le nord. Que donne la diffusion simple par les molécules ?",
        options: { a: "Une lumière naturelle, puisque le Soleil est haut.", b: "Une lumière polarisée presque entièrement, le champ électrique horizontal et orienté est-ouest.", c: "Une lumière polarisée verticalement.", d: "Une lumière polarisée circulairement." },
        why: "L'angle de diffusion vaut 90°. Le champ est perpendiculaire au plan Soleil–observateur–point visé, qui est le plan vertical nord-sud : il est donc horizontal, est-ouest. L'anisotropie des molécules (ρ = 0,0279) limite P à 94,6 %, la diffusion multiple encore davantage. Leçon « Polarisation de la lumière diffusée »." },
      demionde: { prompt: "Une lumière rectiligne à 550\u00a0nm arrive à 20° de l'axe d'une lame de quartz de 30,2\u00a0µm (n∥ \u2212 n⊥ = 0,0091). Comment sort-elle ?",
        options: { a: "Circulaire.", b: "Rectiligne, sans changement.", c: "Rectiligne, symétrique de l'entrée par rapport à l'axe : tournée de 40°.", d: "Elliptique, grand axe le long de l'axe de la lame." },
        hint: "Calculez φ = 2π(n∥ \u2212 n⊥)e/λ.",
        why: "φ = 2π × 0,0091 × 30,2 × 10⁻⁶/550 × 10⁻⁹ ≈ π : c'est une lame demi-onde. La composante selon l'axe change de signe, et la direction passe de +20° à \u221220° de l'axe. Leçon « La biréfringence »." },
      calcite: { prompt: "Pour la calcite à 589\u00a0nm, n∥ = 1,4864 et n⊥ = 1,6584. Quelle épaisseur fait une lame quart d'onde d'ordre zéro ?",
        options: { a: "86\u00a0µm.", b: "0,43\u00a0µm.", c: "16\u00a0µm.", d: "0,86\u00a0µm." },
        hint: "e = λ/(4|n∥ \u2212 n⊥|).",
        why: "589 × 10⁻⁹/(4 × 0,172) ≈ 8,6 × 10⁻⁷\u00a0m. La forte biréfringence de la calcite rend une telle lame difficile à tailler ; 16\u00a0µm serait la valeur pour le quartz. Leçon « La biréfringence »." },
      croises: { prompt: "De la lumière naturelle traverse un polariseur idéal, une lame quart d'onde dont l'axe est à 45° du polariseur, puis un analyseur croisé. Quelle part de l'intensité naturelle incidente sort ?",
        options: { a: "25 %.", b: "50 %.", c: "0 %.", d: "12,5 %." },
        hint: "Le premier polariseur garde la moitié ; ensuite, sin²(2α) sin²(φ/2).",
        why: "½ × sin² 90° × sin² 45° = ½ × 1 × ½ = 0,25. La lumière sort de la lame circulaire, et l'analyseur en garde la moitié, quelle que soit son orientation. Leçon « La biréfringence »." },
      malus: { prompt: "Deux polariseurs idéaux ont leurs axes à 40° l'un de l'autre. Quelle part d'une lumière naturelle traverse les deux ?",
        options: { a: "38 %.", b: "29 %.", c: "59 %.", d: "50 %." },
        why: "½ × cos² 40° = ½ × 0,587 ≈ 0,29. Oublier le premier facteur ½ donne 59 % ; prendre cos 40° au lieu de son carré donne 38 %. Leçon « Les polariseurs »." },
      escalier: { prompt: "Entre deux polariseurs idéaux croisés, on glisse deux feuilles, à 30° et à 60° du premier. Quelle part de la lumière naturelle sort ?",
        options: { a: "0 %.", b: "12,5 %.", c: "Environ 21 %.", d: "50 %." },
        hint: "Trois pas de 30° : (Inat/2) cos⁶ 30°.",
        why: "½ × (0,75)³ ≈ 0,211. Plus les pas sont petits, moins chaque feuille retire : avec une seule feuille à 45°, on n'obtient que 12,5 %. Leçon « Les polariseurs »." },
      reflet: { prompt: "Le reflet du Soleil sur un lac (indice 1,333) est le plus fortement polarisé quand le Soleil est à quelle hauteur au-dessus de l'horizon ?",
        options: { a: "Au zénith.", b: "Environ 53°.", c: "Juste à l'horizon.", d: "Environ 37°." },
        hint: "L'angle de Brewster se compte depuis la normale à la surface, ici la verticale.",
        why: "tan θB = 1,333 donne θB ≈ 53,1° depuis la verticale, soit une hauteur de 90° \u2212 53,1° ≈ 36,9°. 53° est l'angle d'incidence, pas la hauteur. Leçon « Les polariseurs »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Colorants et spin dans un champ » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      visible: { prompt: "Pourquoi un colorant absorbe-t-il dans le visible, alors que le benzène absorbe dans l'ultraviolet ?",
        options: { a: "Parce que le colorant est chargé.", b: "Parce que le colorant est plus lourd.", c: "Parce que le passage d'une disposition à l'autre met en jeu plus d'électrons : A est plus petit, et 2A tombe dans le visible.", d: "Parce que le colorant n'a qu'un état." },
        why: "λ = hc/(2A) : un A plus petit donne une longueur d'onde plus grande. Leçon « Les colorants »." },
      intensite: { prompt: "Qu'est-ce qui rend l'absorption d'un colorant si intense ?",
        options: { a: "Le déplacement de charge entre ses deux dispositions : le moment dipolaire de transition qd/2 est grand, et l'absorption va en μ².", b: "Sa concentration seulement.", c: "La petitesse de A.", d: "Sa couleur." },
        why: "Dans le benzène, les deux dispositions ont la même charge au même endroit : μ = 0 dans le modèle. Leçon « Les colorants »." },
      teinte: { prompt: "Une molécule a 2A = 2,0\u00a0eV. Quelle couleur absorbe-t-elle, et laquelle voit-on ? (hc ≈ 1\u00a0240\u00a0eV·nm)",
        options: { a: "Elle absorbe le violet et paraît jaune.", b: "Elle absorbe le vert et paraît rouge.", c: "Elle n'absorbe rien de visible.", d: "Elle absorbe l'orange, vers 620\u00a0nm, et paraît bleue, comme le vert malachite." },
        why: "λ = 1\u00a0240/2,0 = 620\u00a0nm, dans l'orange ; la couleur vue est la complémentaire. Leçon « Les colorants »." },
      matrice: { prompt: "Pour un spin 1/2 dans un champ (Bₓ, B_y, B_z), que vaut H₁₂ ?",
        options: { a: "\u2212μB_z.", b: "\u2212μ(Bₓ \u2212 iB_y), à une convention de phase près.", c: "0 dans tous les cas.", d: "\u2212μ|B|." },
        why: "C'est (10.22) : linéaire en B, de module μ√(Bₓ² + B_y²). Leçon « Le hamiltonien d'un spin 1/2 dans un champ magnétique »." },
      energies: { prompt: "On fait tourner un champ de 0,5\u00a0T sans changer son intensité. Que deviennent les énergies d'un électron au repos ?",
        options: { a: "Elles s'échangent quand le champ passe par le plan xy.", b: "Elles dépendent de l'angle avec z.", c: "Elles restent ±|μ| × 0,5\u00a0T, environ ±29\u00a0µeV : seule l'intensité compte.", d: "Elles s'annulent." },
        why: "(10.19) : l'espace est isotrope. |μ| ≈ 9,28 × 10⁻²⁴\u00a0J·T⁻¹ donne 29\u00a0µeV à 0,5\u00a0T. Leçon « Le hamiltonien d'un spin 1/2 dans un champ magnétique »." },
      rpe: { prompt: "Un spectromètre de résonance paramagnétique travaille à 9,4\u00a0GHz. Vers quel champ les électrons libres absorbent-ils ? (2|μ|/h ≈ 28\u00a0GHz·T⁻¹)",
        options: { a: "Environ 0,34\u00a0T.", b: "Environ 3,4\u00a0T.", c: "Environ 34\u00a0mT.", d: "Environ 9,4\u00a0T." },
        why: "B = 9,4/28 ≈ 0,34\u00a0T : la fréquence de l'onde doit valoir l'écart des niveaux divisé par h. Leçon « Le hamiltonien d'un spin 1/2 dans un champ magnétique »." },
      cone: { prompt: "Un spin fait un angle de 30° avec un champ constant. Que fait-il ?",
        options: { a: "Il s'aligne sur le champ en une période.", b: "Il bascule à 150°.", c: "Il reste immobile.", d: "Il tourne autour du champ à 2μB/ħ en gardant l'angle de 30°." },
        why: "La précession conserve l'angle avec le champ : sans échange d'énergie, rien ne l'aligne. Leçon « L'électron tournant dans un champ magnétique »." },
      deuxetats: { prompt: "Pourquoi peut-on dire que la molécule d'ammoniac est « un spin dans un champ » ?",
        options: { a: "Parce que l'azote a un spin.", b: "Parce que tout hamiltonien 2\u00a0×\u00a02, origine des énergies au milieu des niveaux, a la forme \u2212μσ·B pour un champ fictif : pour l'ammoniac, un champ selon x avec μBₓ = A.", c: "Parce que l'ammoniac est magnétique.", d: "Parce que les deux ont la même fréquence." },
        why: "Le va-et-vient de l'azote est une précession autour de x, de pulsation 2A/ħ. Leçon « L'électron tournant dans un champ magnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

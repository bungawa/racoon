/* Épreuve de l'étape « Origine moléculaire de la polarisation » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lame: { prompt: "Un condensateur plan a des armatures de 5\u00a0cm de large, à 2\u00a0mm l'une de l'autre, maintenues à 1\u00a0kV. Une lame d'isolant de κ = 3, de 2\u00a0mm d'épaisseur, y est à moitié enfoncée. Quelle force l'attire vers l'intérieur ?",
        options: { a: "Environ 0,22\u00a0mN, quel que soit l'enfoncement.", b: "Environ 0,11\u00a0mN.", c: "Environ 0,33\u00a0mN, proportionnelle à κ.", d: "Zéro : la lame est neutre." },
        hint: "(10.32) : F = (V²/2)(ε0W/d)(κ \u2212 1).",
        why: "F = (10⁶/2) × 8,85 × 10⁻¹² × 0,05/0,002 × 2 ≈ 2,2 × 10⁻⁴\u00a0N. La force vient de κ \u2212 1, pas de κ : une lame de vide ne serait pas attirée. À tension fixée, elle ne dépend pas de l'enfoncement. Leçon « Champs et forces avec des diélectriques »." },
      papier: { prompt: "Une petite bille d'isolant, neutre, est à 2\u00a0cm d'une charge ponctuelle. On l'éloigne à 4\u00a0cm. Sa force d'attraction est divisée par :",
        options: { a: "4, comme la force entre deux charges.", b: "32.", c: "8.", d: "Elle ne change pas de valeur, seulement de sens." },
        hint: "Le moment induit est proportionnel à E, la force au gradient de E².",
        why: "E² varie comme 1/r⁴, son gradient comme 1/r⁵ : 2⁵ = 32. Une bille neutre n'est attirée que par la non-uniformité du champ. Leçon « Champs et forces avec des diélectriques »." },
      coude: { prompt: "Un modèle de molécule porte \u22122q au centre et +q sur chacun de deux atomes à la distance L, les liaisons faisant un angle de 120°. Que vaut son moment dipolaire ?",
        options: { a: "2qL.", b: "√3 qL.", c: "qL.", d: "Zéro, comme toute molécule neutre." },
        why: "p = 2qL cos(θ/2) = 2qL cos 60° = qL. Droite (180°), la même molécule n'aurait pas de moment ; neutre ne veut pas dire sans moment. Leçon « Dipôles moléculaires »." },
      mesure: { prompt: "Un gaz a κ \u2212 1 = 5 × 10⁻³. Quelle est sa polarisation dans un champ de 10⁵\u00a0V·m⁻¹ ?",
        options: { a: "5 × 10²\u00a0C·m⁻².", b: "5 × 10⁻³\u00a0C·m⁻².", c: "8,9 × 10⁻¹²\u00a0C·m⁻².", d: "4,4 × 10⁻⁹\u00a0C·m⁻²." },
        hint: "(11.1) : κ \u2212 1 = P/(ε0E).",
        why: "P = (κ \u2212 1)ε0E = 5 × 10⁻³ × 8,85 × 10⁻¹² × 10⁵ ≈ 4,4 × 10⁻⁹\u00a0C·m⁻². C'est la somme, sur un mètre cube, des moments induits et de l'excès d'orientation des moments permanents. Leçon « Dipôles moléculaires »." },
      ressort: { prompt: "Dans le modèle de l'électron sur un ressort, un atome dont l'énergie d'ionisation est quatre fois celle d'un autre a une polarisabilité :",
        options: { a: "Quatre fois plus petite.", b: "Seize fois plus petite.", c: "Quatre fois plus grande.", d: "Deux fois plus petite." },
        why: "ℏω0 est pris égal à l'énergie d'ionisation, et α = e²/(ε0mω0²), (11.7) : ω0 quatre fois plus grande, α seize fois plus petite. Leçon « Polarisation électronique »." },
      densite: { prompt: "Un gaz monoatomique a κ \u2212 1 = 7 × 10⁻⁵ à 273\u00a0K et 101\u202f325\u00a0Pa. On le comprime à 202\u202f650\u00a0Pa à la même température. Que devient κ \u2212 1 ?",
        options: { a: "1,4 × 10⁻⁴.", b: "7 × 10⁻⁵ : la polarisabilité ne dépend pas de la pression.", c: "2,8 × 10⁻⁴.", d: "3,5 × 10⁻⁵." },
        why: "κ \u2212 1 = Nα, (11.9) : α est une propriété de l'atome, N double avec la pression. Vrai tant que Nα ≪ 1. Leçon « Polarisation électronique »." },
      chauffe: { prompt: "À 400\u00a0K, un gaz polaire a κ \u2212 1 = 6,4 × 10⁻³, dont 0,4 × 10⁻³ dû à la polarisation électronique. On le chauffe à 800\u00a0K à densité fixée. κ \u2212 1 devient :",
        options: { a: "3,2 × 10⁻³ : tout est divisé par deux.", b: "1,9 × 10⁻³.", c: "6,4 × 10⁻³ : la densité n'a pas changé.", d: "3,4 × 10⁻³." },
        hint: "Seule la partie orientation dépend de la température, en 1/T à densité fixée.",
        why: "Orientation : 6,0 × 10⁻³ × 400/800 = 3,0 × 10⁻³ ; électronique inchangée : 0,4 × 10⁻³. Total 3,4 × 10⁻³, (11.21a). Diviser par 4 serait le cas à pression fixée. Leçon « Molécules polaires et polarisation d'orientation »." },
      pente: { prompt: "Pour un gaz de 2 × 10²⁵ molécules par mètre cube, la droite κ \u2212 1 contre 1/T a une pente de 2\u00a0K. Quel est le moment permanent d'une molécule ?",
        options: { a: "Environ 2 × 10⁻²⁵\u00a0C·m.", b: "Environ 6 × 10⁻²⁰\u00a0C·m.", c: "Environ 6 × 10⁻³⁰\u00a0C·m, celui de l'eau.", d: "Zéro : une pente ne donne que la polarisabilité." },
        hint: "La pente vaut N p0²/(3ε0k).",
        why: "p0 = √(3ε0k × pente/N) = √(3 × 8,85 × 10⁻¹² × 1,38 × 10⁻²³ × 2/(2 × 10²⁵)) ≈ 6,1 × 10⁻³⁰\u00a0C·m. C'est la méthode de Debye : l'ordonnée à l'origine donne α. Leçon « Molécules polaires et polarisation d'orientation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

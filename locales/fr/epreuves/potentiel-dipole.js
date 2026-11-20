/* Épreuve de l'étape « Équation du potentiel et dipôle électrique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      poisson: { prompt: "Dans une région de l'espace, on mesure un potentiel φ = A x², avec A = 10\u00a0V·m⁻² et rien d'autre. Quelle densité de charge y règne-t-il ?",
        options: { a: "ρ = \u22122Aε0 ≈ \u22121,8 × 10⁻¹⁰\u00a0C·m⁻³, uniforme : ∇²φ = 2A.", b: "Aucune : φ est continu.", c: "ρ = Aε0 x², nulle au centre seulement.", d: "ρ = +2Aε0 : la densité a le signe du laplacien." },
        hint: "(6.6) : ∇²φ = \u2212ρ/ε0.",
        why: "∂²φ/∂x² = 2A, les autres dérivées secondes sont nulles. ρ = \u2212ε0 × 2A = \u22128,85 × 10⁻¹² × 20 ≈ \u22121,8 × 10⁻¹⁰\u00a0C·m⁻³. Un potentiel en creux (minimum) signale une charge négative. Leçon « Équations de Poisson et de Laplace »." },
      moyenne: { prompt: "Un capteur mesure le potentiel en six points disposés symétriquement autour d'un point P (±1\u00a0cm le long de x, de y et de z), dans une région sans charge : 12, 8, 15, 5, 11 et 9\u00a0V. Que vaut φ(P), au second ordre près ?",
        options: { a: "15\u00a0V, la plus grande valeur.", b: "10\u00a0V, la moyenne des six : ∇²φ = 0 impose la propriété de la moyenne.", c: "0\u00a0V, faute de charge.", d: "On ne peut pas le savoir sans connaître les charges lointaines." },
        why: "En trois dimensions, la règle de la grille porte sur six voisins : φ(P) = (somme)/6 + h²ρ/(6ε0), avec ρ = 0. (12 + 8 + 15 + 5 + 11 + 9)/6 = 10\u00a0V. Leçon « Équations de Poisson et de Laplace »." },
      decroissance: { prompt: "Loin d'un objet neutre, on mesure 2\u00a0mV à 10\u00a0cm, puis 0,5\u00a0mV à 20\u00a0cm dans la même direction. Qu'en conclure ?",
        options: { a: "L'objet porte une charge nette : le potentiel décroît comme 1/R.", b: "Le potentiel décroît comme 1/R³ : l'objet est quadripolaire.", c: "Le potentiel décroît comme 1/R² : l'objet a un moment dipolaire non nul.", d: "La mesure est fausse : un objet neutre ne crée pas de potentiel." },
        why: "Distance doublée, potentiel divisé par 4 : décroissance en 1/R², signature d'un dipôle, (6.27). Une charge nette donnerait un facteur 2, un quadripôle un facteur 8. Leçons « Le dipôle électrique » et « Approximation dipolaire d'une distribution quelconque »." },
      eau: { prompt: "Le moment dipolaire de la molécule d'eau vaut 6,19 × 10⁻³⁰\u00a0C·m. Que vaut le potentiel qu'elle crée à 1\u00a0nm, sur son axe ?",
        options: { a: "Environ 1,4\u00a0V : Kq/r avec q = e.", b: "Environ 5,6 × 10⁻²\u00a0V, mais seulement dans son plan médiateur.", c: "Zéro : la molécule est neutre.", d: "Environ 5,6 × 10⁻²\u00a0V : K p/r²." },
        hint: "K ≈ 8,99 × 10⁹\u00a0N·m²·C⁻².",
        why: "Sur l'axe, cos θ = 1 : φ = 8,99 × 10⁹ × 6,19 × 10⁻³⁰/10⁻¹⁸ ≈ 5,6 × 10⁻²\u00a0V. Dans le plan médiateur, il serait nul. À 1\u00a0nm, la taille de la molécule n'est pas négligeable : sur l'axe, pour le modèle à trois charges, le terme suivant ne corrige ce chiffre que de 0,4\u00a0% du côté des hydrogènes et de 1,5\u00a0% du côté de l'oxygène, mais jusqu'à 11\u00a0% dans d'autres directions. Leçon « Le dipôle électrique »." },
      repere: { prompt: "Un étudiant écrit le potentiel d'un dipôle K p z/r³, puis l'applique à une molécule dont le dipôle est le long de x. Quelle correction faut-il ?",
        options: { a: "Écrire K p·r/r³, qui vaut ici K p x/r³ : la forme en z n'est juste que si z est le long de p.", b: "Aucune : la formule vaut dans tout repère.", c: "Changer le signe.", d: "Multiplier par √3 pour tenir compte des trois axes." },
        why: "La forme en composantes est liée au repère où on l'a obtenue. La forme vectorielle n'utilise que des produits scalaires et des longueurs, qui ne changent pas quand on tourne les axes. Leçon « Remarques sur les équations vectorielles »." },
      axe: { prompt: "Une paire ±1\u00a0nC, d'écart 2\u00a0mm, est observée à 10\u00a0cm de son centre, dans son plan médiateur. Que vaut le champ ?",
        options: { a: "Environ 36\u00a0V·m⁻¹, le long de p.", b: "Environ 18\u00a0V·m⁻¹, opposé à p : K p/r³.", c: "Zéro, puisque le potentiel y est nul.", d: "Environ 1,8\u00a0kV·m⁻¹ : K q/r²." },
        hint: "(6.14) avec θ = 90°.",
        why: "p = 2 × 10⁻¹²\u00a0C·m. Dans le plan médiateur, Ez = \u2212K p/r³ = \u22128,99 × 10⁹ × 2 × 10⁻¹²/10⁻³ ≈ \u221218\u00a0V·m⁻¹. Sur l'axe, à la même distance, il vaudrait le double, le long de p. Leçon « Champ du dipôle et gradient de son potentiel »." },
      boules: { prompt: "Une sphère de rayon a porte une charge de surface σ0 cos θ (θ mesuré depuis z). Quel est le champ à l'intérieur ?",
        options: { a: "Nul, puisque la charge est en surface.", b: "Celui d'un dipôle placé au centre, en 1/r³.", c: "Uniforme : σ0/(3ε0), dirigé selon \u2212z.", d: "Radial, proportionnel à r." },
        why: "Cette couche est celle de deux boules ±ρ décalées de s, avec σ0 = ρs. Dans la zone commune, leurs champs ρr/(3ε0) se compensent à un terme constant près : \u2212ρs/(3ε0) le long de z. Dehors, c'est un dipôle de moment 4πa³σ0/3. Leçon « Champ du dipôle et gradient de son potentiel »." },
      serie: { prompt: "La molécule O=C=O a une charge nulle et un dipôle nul. Si l'on double la distance, comment varie son potentiel lointain, et pourquoi ?",
        options: { a: "Il est divisé par 2 : les charges des oxygènes dominent.", b: "Il est divisé par 4, comme pour l'eau.", c: "Il ne varie pas : il est nul partout.", d: "Il est divisé par 8 : le premier terme non nul de la série est quadripolaire, en 1/R³." },
        why: "Charge et dipôle nuls annulent les deux premiers termes de (6.25). Le suivant, construit avec le tenseur quadripolaire, décroît comme 1/R³. Leçon « Approximation dipolaire d'une distribution quelconque »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

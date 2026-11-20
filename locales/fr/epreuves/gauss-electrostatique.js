/* Épreuve de l'étape « Théorème de Gauss en électrostatique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      faces: { prompt: "Une charge de 3\u00a0nC est au centre d'un cube. Que vaut le flux à travers deux faces opposées, prises ensemble ?",
        options: { a: "Environ 113\u00a0V·m : q/(3ε0), puisque chaque face reçoit un sixième de q/ε0.", b: "Environ 339\u00a0V·m, tout le flux q/ε0.", c: "Zéro : ce qui entre par une face sort par l'autre.", d: "Environ 56\u00a0V·m, un sixième de q/ε0." },
        hint: "Vues du centre, les six faces sont sous le même angle solide.",
        why: "q/ε0 = 3 × 10⁻⁹/8,854 × 10⁻¹² ≈ 339\u00a0V·m, réparti également sur les six faces : 56,5\u00a0V·m chacune, 113\u00a0V·m pour deux. Le champ sort par les deux faces, il ne traverse pas le cube de part en part. Leçon « Flux du champ électrique »." },
      exposant: { prompt: "Si le champ d'une charge variait en 1/r^2,1, que vaudrait le flux sortant d'une boîte conique sans charge, limitée par deux bouchons sphériques de rayons r et 2r ?",
        options: { a: "Zéro, comme pour 1/r² : la boîte ne contient pas de charge.", b: "Un flux entrant d'environ 7 % du flux d'un bouchon : le bouchon extérieur, deux fois plus loin, laisse sortir 2^(\u22120,1) ≈ 0,93 fois ce qui entre.", c: "Un flux sortant de 10 % du flux d'un bouchon.", d: "Il serait infini." },
        why: "Le flux d'un bouchon vaut le champ fois l'aire, en r^(\u22122,1) × r² = r^(\u22120,1). Il ne se compense plus d'un bouchon à l'autre : 1 \u2212 2^(\u22120,1) ≈ 0,067. La loi de Gauss repose sur l'exposant 2. Leçon « Flux du champ électrique »." },
      charge: { prompt: "On mesure un flux sortant de 339\u00a0V·m à travers une surface fermée, et l'on sait qu'une charge de \u22121\u00a0nC est à l'intérieur. Que contient encore la surface ?",
        options: { a: "Rien d'autre : 339\u00a0V·m correspond à 1\u00a0nC.", b: "+3\u00a0nC.", c: "+4\u00a0nC : la charge intérieure totale vaut ε0 Φ ≈ 3\u00a0nC.", d: "On ne peut pas le savoir sans connaître le champ en chaque point de la surface." },
        why: "Q_int = ε0 Φ = 8,854 × 10⁻¹² × 339 ≈ 3,0 × 10⁻⁹\u00a0C. Avec \u22121\u00a0nC déjà compté, il reste +4\u00a0nC. La forme de la surface et le champ point par point n'entrent pas. Leçon « Théorème de Gauss et divergence de E »." },
      divergence: { prompt: "Dans une région, le champ mesuré vaut E = (αx, 0, 0) avec α = 1\u00a0000\u00a0V·m⁻². Que vaut la densité de charge ?",
        options: { a: "Zéro, car le champ n'a qu'une composante.", b: "Elle dépend de x.", c: "α = 1\u00a0000\u00a0C·m⁻³.", d: "Environ 8,9 × 10⁻⁹\u00a0C·m⁻³, uniforme : ρ = ε0 ∇·E = ε0 α." },
        hint: "Calculez ∂Ex/∂x.",
        why: "∇·E = ∂Ex/∂x = α, partout dans la région. (4.38) donne ρ = ε0 α = 8,854 × 10⁻¹² × 1\u00a0000 ≈ 8,9 × 10⁻⁹\u00a0C·m⁻³. Leçon « Théorème de Gauss et divergence de E »." },
      dedans: { prompt: "Une boule uniformément chargée de 5\u00a0cm de rayon porte 1\u00a0nC. Comparez le champ à 2,5\u00a0cm du centre et à 10\u00a0cm du centre.",
        options: { a: "Ils sont dans le rapport 2 : environ 1\u00a0800 et 900\u00a0V·m⁻¹.", b: "Ils sont égaux.", c: "Le champ à 2,5\u00a0cm est quatre fois plus grand, comme 1/r².", d: "Le champ à 2,5\u00a0cm est nul, comme dans une coquille." },
        why: "Dedans, E = K Q r/R³ : 8,99 × 10⁹ × 10⁻⁹ × 0,025/1,25 × 10⁻⁴ ≈ 1\u00a0800\u00a0V·m⁻¹. Dehors, (4.39) : K Q/r² ≈ 900\u00a0V·m⁻¹. Dedans, seule la charge plus proche du centre compte. Leçon « Champ d'une sphère chargée »." },
      coquilles: { prompt: "Deux coquilles sphériques concentriques : la première, de 2\u00a0cm de rayon, porte +2\u00a0nC ; la seconde, de 6\u00a0cm, porte \u22122\u00a0nC. Que vaut le champ à 10\u00a0cm du centre ?",
        options: { a: "Celui d'une charge de +2\u00a0nC au centre, environ 1,8\u00a0kV·m⁻¹.", b: "Zéro : la sphère de Gauss de 10\u00a0cm contient une charge totale nulle, et la symétrie impose un champ radial uniforme sur elle.", c: "Celui de \u22122\u00a0nC, la coquille la plus proche.", d: "On ne peut pas le savoir sans calculer l'intégrale de Coulomb." },
        why: "E × 4πr² = Q(r)/ε0 avec Q(10\u00a0cm) = 0. Entre les coquilles, à 4\u00a0cm par exemple, le champ est celui de +2\u00a0nC au centre : 11\u00a0kV·m⁻¹. C'est le principe d'un câble coaxial, dont le champ reste entre les conducteurs. Leçon « Champ d'une sphère chargée »." },
      lignes: { prompt: "On dessine 20 lignes de champ partant de q1 = +2\u00a0nC, en tubes de même flux. Une charge q2 = \u22120,5\u00a0nC est voisine. Combien de ces lignes finissent sur q2 ?",
        options: { a: "20 : toute ligne finit sur une charge négative.", b: "10.", c: "5 : q2 absorbe un quart du flux de q1 ; les 15 autres partent au loin.", d: "Aucune, car q2 est plus petite." },
        why: "Le nombre de lignes est proportionnel au flux, donc à la charge : 20 × 0,5/2 = 5. Les autres correspondent à la charge totale +1,5\u00a0nC vue de loin. Leçon « Lignes de champ et surfaces équipotentielles »." },
      ecart: { prompt: "Entre deux grandes plaques, le champ vaut 3\u00a0kV·m⁻¹, uniforme. On trace les équipotentielles de 10 en 10\u00a0V. Quel est leur écartement ?",
        options: { a: "30\u00a0m.", b: "0,3\u00a0mm.", c: "Elles ne sont pas parallèles aux plaques.", d: "Environ 3,3\u00a0mm : Δφ = E Δx, perpendiculairement au champ." },
        hint: "Le champ est perpendiculaire aux équipotentielles.",
        why: "Les équipotentielles sont perpendiculaires au champ, donc parallèles aux plaques, et Δx = Δφ/E = 10/3\u00a0000 ≈ 3,3 × 10⁻³\u00a0m. Plus le champ est fort, plus elles se serrent. Leçon « Lignes de champ et surfaces équipotentielles »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

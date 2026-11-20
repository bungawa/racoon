/* Épreuve de l'étape « Loi de Coulomb et potentiel » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      antenne: { prompt: "Une antenne de 6\u00a0cm oscille à 2,4\u00a0GHz. Peut-on calculer le champ autour d'elle, à chaque instant, par la loi de Coulomb appliquée aux charges du moment ?",
        options: { a: "Non : L/(cT) ≈ 0,5, le champ n'a pas le temps de suivre ses sources d'un bout à l'autre de l'antenne ; c'est un problème d'ondes.", b: "Oui : les électrons de l'antenne vont lentement.", c: "Oui : 6\u00a0cm est une petite taille.", d: "Non, parce que la loi de Coulomb ne vaut que pour des charges positives." },
        hint: "Comparez la taille au trajet de la lumière pendant une période.",
        why: "Pendant une période, 1/(2,4 × 10⁹)\u00a0s, la lumière parcourt 12,5\u00a0cm, à peine deux fois la taille de l'antenne : L/(cT) ≈ 0,48. Le champ en un point dépend des charges telles qu'elles étaient un peu plus tôt. Ce n'est pas la lenteur des électrons qui décide, c'est ce rapport. Leçon « Les lois de l'électrostatique »." },
      bobine: { prompt: "Une bobine est parcourue par un courant constant. Une petite charge est posée, immobile, à côté. Quelle force subit-elle de la part de la bobine ?",
        options: { a: "Une force magnétique q v ∧ B, puisque la bobine crée un champ B.", b: "Aucune : la bobine est neutre, son champ B est statique, et une charge immobile ne subit pas de force magnétique.", c: "Une force électrique, car le courant est fait de charges.", d: "Une force qui dépend du sens du courant." },
        why: "En régime permanent, E ne dépend que des charges, (4.5) et (4.6), et B que des courants, (4.7) et (4.8). La bobine, neutre, ne crée pas de champ électrique ; son champ magnétique n'agit que sur des charges en mouvement. Les deux paires d'équations sont découplées. Leçon « Les lois de l'électrostatique »." },
      zero: { prompt: "Une charge de +4\u00a0nC est à l'origine, une charge de \u22121\u00a0nC en x = 3\u00a0cm. En quel point de l'axe x le champ est-il nul ?",
        options: { a: "En x = 1\u00a0cm, entre les deux charges.", b: "En x = 2,4\u00a0cm.", c: "En x = 6\u00a0cm, au-delà de la charge négative : 4/x² = 1/(x \u2212 3)².", d: "Nulle part : deux charges de signes contraires ont toujours un champ non nul." },
        hint: "Entre les charges, les deux champs ont le même sens.",
        why: "Entre les charges, les deux champs pointent vers la charge négative : ils s'ajoutent. Il faut se placer au-delà de la plus petite charge, où ils s'opposent : 4/x² = 1/(x \u2212 3)², soit x = 2(x \u2212 3), x = 6\u00a0cm. Superposition (4.13) ; leçon « Loi de Coulomb et superposition »." },
      baguette: { prompt: "Une baguette fine de 20\u00a0cm porte 2\u00a0nC. À partir de quelle distance, sur sa médiatrice, la traiter comme une charge ponctuelle donne-t-il son champ à 1 % près ?",
        options: { a: "Dès 20\u00a0cm, sa propre longueur.", b: "Dès 2\u00a0m, dix fois sa longueur.", c: "Jamais : une charge répartie n'est jamais ponctuelle.", d: "Dès 70\u00a0cm environ : l'écart relatif vaut L²/(8d²), qui passe sous 1 % pour d > 3,5 L." },
        why: "Le champ exact vaut celui de la charge ponctuelle divisé par √(1 + L²/4d²). L'écart, ≈ L²/8d², vaut 1 % pour d = L/√0,08 ≈ 3,5 L = 71\u00a0cm. C'est le carré du rapport des tailles qui compte. Leçon « Loi de Coulomb et superposition »." },
      travail: { prompt: "Quel travail faut-il fournir pour amener, lentement et depuis très loin, une charge de 1\u00a0nC à 10\u00a0cm d'une charge fixe de 1\u00a0nC ?",
        options: { a: "Environ 9,0 × 10⁻⁸\u00a0J : q φ, avec φ = 89,9\u00a0V à 10\u00a0cm.", b: "Environ 4,5 × 10⁻⁸\u00a0J : la moitié de q φ, comme pour l'énergie d'un condensateur.", c: "Zéro, puisque la charge est amenée lentement.", d: "Cela dépend du chemin suivi." },
        hint: "Le potentiel d'une charge ponctuelle, référence à l'infini, est K q/r.",
        why: "W = q [φ(10\u00a0cm) \u2212 φ(∞)] = 10⁻⁹ × 8,99 × 10⁹ × 10⁻⁹/0,1 ≈ 9,0 × 10⁻⁸\u00a0J, quel que soit le chemin, (4.21). Le facteur ½ n'apparaît que lorsqu'on assemble les charges en partant de rien ; ici, la charge fixe est déjà en place. Leçon « Potentiel électrique »." },
      carre: { prompt: "Trois charges de +1\u00a0nC et une de \u22121\u00a0nC occupent les quatre coins d'un carré, à 5\u00a0cm de son centre. Que vaut le potentiel au centre ?",
        options: { a: "Zéro, par symétrie.", b: "Environ 360\u00a0V : la somme des K q/r, soit K × 2\u00a0nC/5\u00a0cm.", c: "Environ 720\u00a0V : chaque charge compte positivement.", d: "On ne peut pas le savoir sans connaître le champ au centre." },
        why: "Le potentiel est une somme de nombres avec leur signe, (4.24) : K (1 + 1 + 1 \u2212 1) × 10⁻⁹/0,05 ≈ 360\u00a0V. Pas de direction à gérer. Le champ au centre, lui, demanderait une somme de vecteurs. Leçon « Potentiel électrique »." },
      pente: { prompt: "Dans une région sans charge, le potentiel vaut φ = k (x² \u2212 y²), avec k = 10⁵\u00a0V·m⁻². Que vaut le champ au point (1\u00a0cm ; 2\u00a0cm) ?",
        options: { a: "(2 ; \u22124)\u00a0kV·m⁻¹.", b: "Zéro, car la région ne contient pas de charge.", c: "(\u22122 ; 4)\u00a0kV·m⁻¹ : E = (\u22122kx ; 2ky).", d: "\u221230\u00a0V, la valeur de φ en ce point." },
        hint: "E = \u2212∇φ : dérivez selon x, puis selon y.",
        why: "∂φ/∂x = 2kx = 2 × 10³\u00a0V·m⁻¹ et ∂φ/∂y = \u22122ky = \u22124 × 10³\u00a0V·m⁻¹, d'où E = (\u22122 ; 4)\u00a0kV·m⁻¹, (4.27). L'absence de charge rend nulle la divergence de E, pas E lui-même. Leçon « Le champ, gradient du potentiel »." },
      exposant: { prompt: "Pour tester l'exposant 2 de la loi de Coulomb, vaut-il mieux vérifier que le rotationnel de E est nul, ou que le champ est nul dans une coquille chargée ?",
        options: { a: "Le rotationnel : il contient l'exposant.", b: "Les deux tests sont équivalents.", c: "Aucun des deux : seule une mesure de force teste l'exposant.", d: "La coquille : toute force radiale et isotrope a un rotationnel nul, quel que soit l'exposant ; seul 1/r² donne un champ nul dans la coquille." },
        why: "E = \u2212∇φ et le rotationnel nul viennent de ce que la force est radiale et la même dans toutes les directions, (4.29). C'est la loi de Gauss qui porte l'exposant : avec 1/rⁿ, n ≠ 2, la coquille aurait un champ intérieur. D'où les expériences de Cavendish, de Maxwell et de leurs successeurs. Leçons « Le champ, gradient du potentiel » et « Loi de Coulomb et superposition »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

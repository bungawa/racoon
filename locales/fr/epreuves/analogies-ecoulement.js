/* Épreuve de l'étape « Écoulement, éclairement et unité de la nature » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      hypotheses: { prompt: "Pour traiter l'écoulement de l'eau autour d'une bille comme un problème d'électrostatique, on suppose le fluide incompressible, sans viscosité, et l'écoulement permanent et irrotationnel. Laquelle de ces hypothèses est la moins bien vérifiée par l'eau réelle ?",
        options: { a: "L'absence de viscosité et de tourbillons : l'eau adhère aux parois et forme un sillage.", b: "L'incompressibilité : l'eau se comprime beaucoup à ces vitesses.", c: "La conservation de la masse.", d: "L'existence d'une vitesse en chaque point." },
        why: "À 1\u00a0m·s⁻¹, la compressibilité compte pour 5\u00a0×\u00a010⁻⁷. La viscosité, elle, impose une vitesse nulle sur la paroi ; la couche limite qui en résulte se détache à l'arrière et crée des tourbillons. C'est pourquoi on parle d'« eau sèche ». Leçon « Écoulement irrotationnel autour d'une sphère »." },
      contour: { prompt: "De l'eau « sèche » arrive à 4\u00a0m·s⁻¹ sur une sphère de rayon a. Quelle est sa vitesse dans le plan de l'équateur, à la distance 2a du centre ?",
        options: { a: "6\u00a0m·s⁻¹.", b: "4\u00a0m·s⁻¹.", c: "4,25\u00a0m·s⁻¹.", d: "3,5\u00a0m·s⁻¹." },
        hint: "Sur l'équateur, v = v0 (1 + a³/2r³).",
        why: "v = 4 × (1 + 1/16) = 4,25\u00a0m·s⁻¹. Contre la sphère, elle vaudrait 6\u00a0m·s⁻¹. La perturbation est celle d'un dipôle : elle décroît comme (a/r)³, et il n'en reste que 6\u00a0% à deux rayons." },
      arret: { prompt: "De l'air (ρ = 1,2\u00a0kg·m⁻³) arrive à 30\u00a0m·s⁻¹ sur une sphère. De combien la pression dépasse-t-elle la pression ambiante au point d'arrêt, à l'avant ?",
        options: { a: "36\u00a0Pa.", b: "540\u00a0Pa.", c: "1\u00a0080\u00a0Pa.", d: "Zéro." },
        hint: "Au point d'arrêt, la vitesse est nulle : C_p = 1.",
        why: "P \u2212 P∞ = ρv0²/2 = 0,5 × 1,2 × 900 = 540\u00a0Pa. Le modèle prédit la même surpression au point d'arrêt arrière ; dans la réalité, elle n'y est pas, et c'est ce déficit qui freine la sphère." },
      balle: { prompt: "Une balle lisse de 4\u00a0cm de diamètre vole à 20\u00a0m·s⁻¹ dans l'air (ν = 1,5\u00a0×\u00a010⁻⁵\u00a0m²·s⁻¹, ρ = 1,2\u00a0kg·m⁻³). Que prédit l'écoulement potentiel pour sa traînée, et que mesure-t-on ?",
        options: { a: "0,14\u00a0N dans les deux cas.", b: "Zéro dans les deux cas : le nombre de Reynolds est grand.", c: "Le modèle prédit 0,14\u00a0N ; on mesure zéro.", d: "Le modèle prédit zéro ; on mesure environ 0,14\u00a0N." },
        hint: "Re = vD/ν ; entre 10³ et 2\u00a0×\u00a010⁵, le coefficient de traînée d'une sphère lisse vaut environ 0,47.",
        why: "Re = 20 × 0,04/1,5\u00a0×\u00a010⁻⁵ ≈ 5\u00a0×\u00a010⁴ : sur le palier. F ≈ 0,47 × (0,5 × 1,2 × 400) × π × 0,02² ≈ 0,14\u00a0N. L'écoulement potentiel, symétrique entre l'avant et l'arrière, donne exactement zéro : paradoxe de d'Alembert." },
      lampe: { prompt: "Une lampe isotrope de 200\u00a0cd est suspendue à 2,5\u00a0m au-dessus d'un bureau. Quel éclairement donne-t-elle à sa verticale ?",
        options: { a: "32\u00a0lx.", b: "80\u00a0lx.", c: "500\u00a0lx.", d: "12,8\u00a0lx." },
        why: "I_n = S/r² = 200/2,5² = 32\u00a0lx : seize fois moins que les 500\u00a0lx demandés pour lire et écrire. C'est la composante normale du champ d'une charge ponctuelle 4πε0S. Leçon « Éclairement uniforme d'un plan »." },
      tubes: { prompt: "Des tubes lumineux parallèles sont accrochés à 2,4\u00a0m au-dessus d'une table. Quel espacement maximal garde l'éclairement uniforme à un millième près, dans le modèle de la grille de fils chargés ?",
        options: { a: "Environ 0,2\u00a0m.", b: "Environ 0,8\u00a0m.", c: "Environ 2,0\u00a0m.", d: "Environ 7\u00a0m." },
        hint: "L'ondulation relative vaut 2 e^(\u22122πz/b).",
        why: "2 e^(\u22122πz/b) = 10⁻³ donne b = 2πz/ln(2\u00a0000) = 0,83 z ≈ 2,0\u00a0m. Les ondulations d'une grille s'éteignent exponentiellement avec la distance : c'est le résultat de la leçon « Champ électrostatique d'une grille », lu pour la lumière." },
      centre: { prompt: "Un carré a un côté au potentiel 1 et les trois autres à 0. Des marcheurs partent du centre et sautent au hasard sur un quadrillage jusqu'à toucher un bord. Quelle fraction finit sur le côté au potentiel 1, et que représente-t-elle ?",
        options: { a: "1/2 ; le potentiel moyen du bord.", b: "1/4 ; le potentiel au centre, solution de l'équation de Laplace.", c: "1/3 ; le champ au centre.", d: "Elle dépend de la finesse du quadrillage." },
        why: "Du centre, les quatre côtés jouent le même rôle : un quart des marcheurs finit sur chacun. Cette probabilité obéit à la règle « moyenne des quatre voisins », forme discrète de l'équation de Laplace. Ailleurs qu'au centre, la valeur du réseau s'écarte un peu de la valeur continue, comme h². Leçon « L'unité sous-jacente de la nature »." },
      pourquoi: { prompt: "Pourquoi tant de phénomènes différents obéissent-ils aux équations de l'électrostatique ?",
        options: { a: "Parce qu'ils sont tous d'origine électrique.", b: "Parce que la température, la densité de neutrons et le potentiel sont la même grandeur.", c: "Par hasard.", d: "Parce que, vus à une échelle où tout varie doucement, ils ne dépendent que de dérivées d'espace, que l'isotropie groupe en gradients et divergences : les équations les plus simples de ce type sont celles-là." },
        why: "Ce qui est commun, c'est l'espace et le lissage. Chaque équation est l'approximation à grande échelle d'un mécanisme plus fin (neutrons, molécules), valable quand la longueur microscopique est petite devant celle du problème. Rien ne dit que l'électrostatique elle-même échappe à ce sort." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Ondes planes et sphériques dans le vide » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      nappe: { prompt: "Une nappe de courant plane porte 2\u00a0A·m⁻¹ de 0 à 0,2\u00a0µs, puis plus rien. Que voit un observateur à 150\u00a0m de la nappe ?",
        options: { a: "Un champ |E_y| ≈ 377\u00a0V·m⁻¹ entre 0,5 et 0,7\u00a0µs, rien avant ni après.", b: "Un champ de 377\u00a0V·m⁻¹ entre 0 et 0,2\u00a0µs, en même temps que le courant.", c: "Un champ qui commence à 0,5\u00a0µs et ne s'arrête plus.", d: "Rien : le courant est éteint avant que le signal arrive." },
        hint: "Le champ en x à l'instant t est celui que la nappe portait à t \u2212 x/c ; il vaut Z₀J/2.",
        why: "150\u00a0m, c'est 0,5\u00a0µs de trajet : l'observateur voit l'histoire du courant décalée de 0,5\u00a0µs. |E_y| = J/(2ε₀c) = 188 × 2 ≈ 377\u00a0V·m⁻¹. Le bloc de champ continue sa route sans la source. Leçon « Ondes dans le vide et ondes planes »." },
      divergence: { prompt: "Le champ E = E₀ cos(ωt \u2212 kz) dirigé selon z, une onde qui va selon z, peut-il exister dans le vide sans charges ?",
        options: { a: "Oui : il vérifie l'équation d'onde avec ω = ck.", b: "Non : ∇·E = kE₀ sin(ωt \u2212 kz) n'est pas nul, alors qu'il n'y a pas de charge.", c: "Oui, à condition que B soit aussi selon z.", d: "Non, parce qu'une onde ne peut pas aller selon z." },
        hint: "L'équation d'onde ne suffit pas : il faut aussi les quatre équations de Maxwell.",
        why: "Une onde plane est transverse : ∇·E = 0 interdit une composante longitudinale qui varie. L'équation d'onde seule l'admettrait. Leçons « Ondes dans le vide et ondes planes » et « Ondes électromagnétiques à trois dimensions »." },
      champB: { prompt: "Une onde plane va selon +y dans le vide, avec E = 30\u00a0V·m⁻¹ selon +z. Que vaut son champ magnétique ?",
        options: { a: "100\u00a0nT selon \u2212x.", b: "30\u00a0T selon +x.", c: "100\u00a0nT selon +x.", d: "100\u00a0nT selon +z, parallèle à E." },
        hint: "B = n ∧ E/c, et E ∧ B pointe dans le sens de propagation.",
        why: "ŷ ∧ ẑ = x̂ et 30/(3 × 10⁸) = 10⁻⁷\u00a0T. Vérification : ẑ ∧ x̂ = ŷ, le sens de propagation. Leçon « Ondes électromagnétiques à trois dimensions »." },
      noeuds: { prompt: "Un signal de 5\u00a0GHz (λ = 6\u00a0cm) arrive directement et après réflexion sur un mur, en sens contraire. Tous les combien trouve-t-on un creux de champ ?",
        options: { a: "6\u00a0cm, une longueur d'onde.", b: "Nulle part : deux ondes de même amplitude s'ajoutent toujours.", c: "Les creux se déplacent à la vitesse c : on ne peut pas le dire.", d: "3\u00a0cm, une demi-longueur d'onde." },
        hint: "cos k(x \u2212 ct) + cos k(x + ct) = 2 cos kx cos kct.",
        why: "Deux ondes opposées font une onde stationnaire, de nœuds fixes tous les λ/2 ; à un angle α, l'interfrange vaut λ/(2 sin(α/2)), ici α = 180°. Leçons « Ondes dans le vide et ondes planes » et « Ondes électromagnétiques à trois dimensions »." },
      piece: { prompt: "Dans une pièce de 5\u00a0m, pour laquelle de ces sources ni la description quasi statique ni les rayons de l'optique ne suffisent ?",
        options: { a: "La radio à 100\u00a0MHz : L/λ ≈ 1,7.", b: "Les fils du réseau à 50\u00a0Hz : L/λ ≈ 10⁻⁶.", c: "La lumière visible : L/λ ≈ 10⁷.", d: "Le champ magnétique terrestre, statique." },
        why: "Quand L/λ ≪ 1, le champ est en phase dans toute la pièce ; quand L/λ ≫ 1, des rayons suffisent. Vers L/λ ~ 1, il faut les ondes. Leçon « Ondes électromagnétiques à trois dimensions »." },
      arc: { prompt: "Pour des gouttes d'eau d'indice 1,333, à quel angle de la direction opposée au Soleil se trouve l'arc primaire, et quel modèle le donne ?",
        options: { a: "51°, avec deux réflexions dans la goutte.", b: "Environ 42°, par l'optique géométrique : le maximum de 4r \u2212 2i, où la lumière s'accumule.", c: "90°, par la diffraction sur les gouttes.", d: "42° pour toutes les couleurs, puisque l'angle ne dépend pas de l'indice." },
        hint: "cos² i = (n² \u2212 1)/3 à l'arc.",
        why: "i ≈ 59°, r ≈ 40° : 4r \u2212 2i ≈ 42°. L'angle dépend de l'indice : 42,3° pour le rouge, 40,6° pour le violet. Leçon « L'imagination scientifique »." },
      sphere: { prompt: "Un signal radio émis par une petite antenne a une amplitude E à 1\u00a0km. Loin de l'antenne et sans obstacle, que vaut-elle à 3\u00a0km ?",
        options: { a: "E, comme une onde plane.", b: "E/9.", c: "E/3.", d: "E/√3." },
        why: "Une onde sphérique décroît comme f(t \u2212 r/c)/r : l'amplitude en 1/r, l'intensité en 1/r² (ici divisée par 9), parce que l'énergie s'étale sur 4πr². Leçon « Ondes sphériques »." },
      sens: { prompt: "Qu'est-ce qui fait qu'on écrit f(t \u2212 r/c)/r autour d'une source, et non g(t + r/c)/r ?",
        options: { a: "Les équations de Maxwell interdisent g(t + r/c)/r.", b: "g(t + r/c)/r n'est pas une solution de l'équation d'onde.", c: "Le facteur 1/r ne vaut que pour les ondes sortantes.", d: "Une hypothèse tirée de l'expérience : les ondes partent des charges. Les équations, symétriques en t, admettent les deux." },
        why: "Les deux sont des solutions exactes ; choisir l'onde sortante brise la symétrie des équations par rapport au sens du temps. Leçon « Ondes sphériques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Réflexion et réfraction aux interfaces » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      surface: { prompt: "Deux plaques de verre d'indice 1,52, éclairées à 550\u00a0nm sous incidence normale. La première passe de l'air au verre sur environ 1\u00a0nm ; la seconde porte une couche de 100\u00a0nm d'indice 1,38. Laquelle réfléchit les 4,3\u00a0% que donne (33.5) ?",
        options: { a: "La première seulement : 1\u00a0nm est très petit devant λ, alors que la couche de la seconde fait un quart de longueur d'onde et ramène la réflexion vers 1,3\u00a0%.", b: "Les deux : la réflexion ne dépend que de l'indice du verre.", c: "La seconde seulement : une couche d'indice intermédiaire ne change rien sous incidence normale.", d: "Aucune : (33.5) suppose un verre sans aucune surface." },
        hint: "(33.5) suppose un passage d'un indice à l'autre sur une distance très petite devant λ.",
        why: "La réflexion est une propriété de la surface. Une transition de 1\u00a0nm ne change (33.5) que de 7 × 10⁻⁴ en valeur relative. La couche de 100\u00a0nm × 1,38 ≈ 550/4\u00a0nm renvoie deux ondes en opposition de phase. Leçon « Réflexion et réfraction de la lumière »." },
      vitre: { prompt: "Une vitre d'indice 1,5 reçoit la lumière sous incidence normale. Quelle fraction de l'intensité la traverse, sans compter les réflexions multiples entre ses faces ?",
        options: { a: "96\u00a0%.", b: "92\u00a0%.", c: "84\u00a0%.", d: "100\u00a0% : le verre est transparent." },
        hint: "Chaque face renvoie la fraction donnée par (33.5).",
        why: "Chaque face réfléchit (0,5/2,5)² = 4\u00a0% et transmet 96\u00a0%, aussi bien à l'entrée qu'à la sortie : 0,96² ≈ 0,92. Leçon « Réflexion et réfraction de la lumière »." },
      lac: { prompt: "Le soleil se reflète sur un lac (n = 1,33) sous 53° d'incidence. Que dire de la lumière réfléchie ?",
        options: { a: "Elle est nulle : à 53°, tout est transmis.", b: "Elle est polarisée dans le plan d'incidence.", c: "Elle est polarisée perpendiculairement au plan d'incidence : à l'angle de Brewster, R∥ = 0.", d: "Elle a la même polarisation que la lumière du soleil." },
        hint: "Que vaut arctan 1,33 ?",
        why: "arctan 1,33 = 53,1° : c'est l'angle de Brewster, où θi + θt = 90° et (33.4) s'annule. Seule reste la composante perpendiculaire au plan d'incidence, horizontale ; des lunettes à verres polarisants l'arrêtent. Leçon « Réflexion et réfraction de la lumière »." },
      transverse: { prompt: "Une onde E = E0 e^(i(ωt \u2212 k·r)) se propage dans un verre homogène sans charge libre. Que donne la loi de Gauss, ∇·E = 0 ?",
        options: { a: "ωE0 = 0 : l'onde ne peut pas exister.", b: "k ∧ E0 = 0 : E est parallèle à k.", c: "|E0| = |k| : l'amplitude est fixée.", d: "k·E0 = 0 : le champ est perpendiculaire à la direction de propagation." },
        hint: "Pour une onde plane, ∇ se remplace par \u2212ik.",
        why: "(33.8) change ∇·E en \u2212ik·E : la divergence nulle impose k·E0 = 0. Dans un milieu isotrope, l'onde est transverse. Leçon « Ondes dans les matériaux denses »." },
      eau: { prompt: "Une onde lumineuse se propage dans l'eau, d'indice 1,33, avec un champ électrique d'amplitude 750\u00a0V·m⁻¹. Quelle est l'amplitude de son champ magnétique ?",
        options: { a: "3,3\u00a0µT.", b: "2,5\u00a0µT.", c: "1,9\u00a0µT.", d: "1\u00a0mT." },
        hint: "(33.9) avec k = ωn/c (33.7).",
        why: "B = kE/ω = nE/c = 1,33 × 750/(3,00 × 10⁸) ≈ 3,3 × 10⁻⁶\u00a0T. 2,5\u00a0µT serait la valeur dans le vide ; dans un milieu d'indice n, B est n fois plus grand pour le même E. Leçon « Ondes dans les matériaux denses »." },
      calcite: { prompt: "Dans la calcite, une onde extraordinaire a son vecteur d'onde k à 42° de l'axe optique. Quelle affirmation est juste ?",
        options: { a: "E, D et le vecteur de Poynting sont tous alignés avec k.", b: "D est perpendiculaire à k, mais E ne l'est pas : l'énergie part à environ 6° de k.", c: "L'onde voit l'indice ordinaire 1,658, comme dans toutes les directions.", d: "L'onde ne peut pas se propager dans cette direction." },
        why: "∇·D = 0 impose k·D = 0 ; le tenseur incline E sur D, et S, perpendiculaire à E, s'écarte de k de 6,26° au plus, vers 42° de l'axe. L'indice vu, entre 1,486 et 1,658, dépend de l'angle. Leçon « Ondes dans les matériaux denses »." },
      normale: { prompt: "Juste au-dessus de la surface plane d'un diélectrique d'indice 2, dans le vide, la composante normale du champ électrique d'une onde vaut 80\u00a0V·m⁻¹. Que vaut-elle juste en dessous ?",
        options: { a: "40\u00a0V·m⁻¹.", b: "80\u00a0V·m⁻¹.", c: "20\u00a0V·m⁻¹.", d: "160\u00a0V·m⁻¹." },
        hint: "C'est ε0Ex + Px qui passe sans saut.",
        why: "(33.26) avec P = ε0(n² \u2212 1)E : ε0n1²Ex1 = ε0n2²Ex2, donc Ex2 = 80/4 = 20\u00a0V·m⁻¹. Diviser par n, et non par n², est l'erreur classique. Les composantes tangentielles, elles, passent sans changer. Leçon « Conditions aux limites des champs »." },
      snell: { prompt: "Pourquoi la loi n1 sin θi = n2 sin θt découle-t-elle des relations de passage, sans rien savoir d'autre des milieux ?",
        options: { a: "Parce que l'énergie doit se conserver à la traversée.", b: "Parce que la lumière choisit le trajet le plus court.", c: "Parce que la composante normale de D est continue.", d: "Parce que les relations doivent tenir à chaque instant en tout point de la surface : les trois ondes ont la même pulsation et la même composante k_y = k sin θ." },
        why: "Une égalité comme Ey1 = Ey2 entre des termes en e^(i(ωt \u2212 k_y y)) ne tient pour tout t et tout y que si ω et k_y sont les mêmes ; avec k = ωn/c, cela donne (33.2). Leçons « Conditions aux limites des champs » et « Réflexion et réfraction de la lumière »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

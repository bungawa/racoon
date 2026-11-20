/* Épreuve de l'étape « Espaces courbes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      cercle: { prompt: "Sur une boule de 2\u00a0m de rayon, un insecte trace un cercle de 40\u00a0cm de rayon mesuré et compare son tour à 2π fois ce rayon. Que trouve-t-il ?",
        options: { a: "Un excès de rayon d'environ 2,7\u00a0mm, positif : sa surface a une courbure positive, 0,25\u00a0m⁻².", b: "Un excès d'environ 16\u00a0mm, K r³ sans autre facteur.", c: "Aucun écart : un cercle de 40\u00a0cm est trop petit pour sentir la courbure.", d: "Un excès d'environ \u22122,7\u00a0mm : sur une boule, le tour est plus long que prévu." },
        hint: "Pour un petit cercle, l'excès vaut K r³/6, avec K = 1/R².",
        why: "K = 1/2² = 0,25\u00a0m⁻² ; K r³/6 = 0,25 × 0,064/6 ≈ 2,7\u00a0mm, et le calcul exact, r \u2212 R sin(r/R), donne 2,66\u00a0mm. Le tour mesuré est plus court que 2πr : l'excès est positif, signe d'une courbure positive. Leçon « Espaces courbes à deux dimensions »." },
      carre: { prompt: "Un insecte vit sur une sphère de 10\u00a0m de rayon. Il veut construire un carré dont l'écart entre l'arrivée et le départ atteigne 1\u00a0cm, pour le voir à coup sûr. Quel côté lui faut-il ?",
        options: { a: "Environ 1\u00a0cm : l'écart est égal au côté multiplié par la courbure.", b: "Environ 1,1\u00a0m.", c: "Environ 10\u00a0m, le rayon de la sphère.", d: "Aucun : un carré se ferme toujours, seul le triangle trahit la courbure." },
        hint: "Pour un petit carré, l'écart vaut à peu près |K| L³/√2.",
        why: "K = 0,01\u00a0m⁻² ; |K| L³/√2 = 0,01\u00a0m demande L³ ≈ 1,4\u00a0m³, soit L ≈ 1,1\u00a0m. L'écart croît comme le cube du côté : une petite figure exige une mesure très fine, une grande se contente d'une mesure grossière. Leçon « Espaces courbes à deux dimensions »." },
      plaque: { prompt: "Sur une plaque plane, chauffée de façon que les règles mesurent 1 + ρ²/(4R²) fois leur longueur au centre froid, un insecte trouve partout les mesures d'une sphère de rayon R. Qu'en conclure ?",
        options: { a: "Que la plaque se bombe sous l'effet de la chaleur.", b: "Que la chaleur exerce sur l'insecte une force qui imite la courbure.", c: "Que la géométrie ne dépend que de la façon de mesurer les longueurs : deux mondes qui mesurent pareil ont la même géométrie.", d: "Que l'insecte se trompe, la vraie géométrie étant celle vue d'en haut." },
        why: "La géométrie d'un habitant est faite de ses mesures, et ses mesures sont celles d'une sphère : rien, de l'intérieur, ne distingue les deux mondes. C'est l'idée qui permet de parler de la courbure de notre espace sans le voir du dehors. Leçons « Espaces courbes à deux dimensions » et « Courbure d'un espace à trois dimensions »." },
      cylindre: { prompt: "Sur un cylindre de 1\u00a0m de rayon, un insecte trace un triangle équilatéral de 50\u00a0cm de côté. Que vaut la somme de ses angles ?",
        options: { a: "Plus de 180°, puisque la surface est courbée.", b: "Moins de 180°, comme sur une selle.", c: "Cela dépend de l'orientation du triangle par rapport à l'axe.", d: "Exactement 180° : déroulé sans étirement, le cylindre est un plan ; sa courbure intrinsèque est nulle." },
        why: "Dérouler le cylindre ne change aucune longueur mesurée sur lui : les figures qui n'en font pas le tour ont les propriétés du plan. Courbé vu du dehors, le cylindre n'est pas courbe pour son habitant. Leçon « Espaces courbes à deux dimensions »." },
      dehors: { prompt: "Juste au-dessus du sol terrestre, les courbures principales de l'espace valent \u22121,7, \u22121,7 et +3,4 × 10⁻²³\u00a0m⁻², la dernière pour le plan horizontal. Quel est l'excès de rayon d'une sphère de 1\u00a0km ?",
        options: { a: "Zéro : la somme des trois est nulle, et la sphère n'en mesure que la moyenne.", b: "Environ 5,7 × 10⁻¹⁵\u00a0m, celui du cercle horizontal.", c: "Environ \u22122,9 × 10⁻¹⁵\u00a0m, celui des cercles verticaux.", d: "On ne peut rien dire sans choisir une orientation pour la sphère." },
        hint: "L'excès d'une petite sphère vaut (K₁ + K₂ + K₃) r³/18.",
        why: "La somme des courbures principales est nulle : la sphère, qui fait la moyenne sur toutes les orientations, n'a aucun excès. Les cercles, eux, en ont : +5,7 × 10⁻¹⁵\u00a0m à l'horizontale, \u22122,9 × 10⁻¹⁵\u00a0m à la verticale. Courbure moyenne nulle ne veut pas dire espace plat. Leçons « Courbure d'un espace à trois dimensions » et « Notre espace est-il courbe ? »." },
      six: { prompt: "Pourquoi l'excès de rayon d'une petite sphère ne suffit-il pas à décrire la courbure de l'espace en un point ?",
        options: { a: "Parce qu'une sphère est trop grande pour être petite devant le rayon de courbure.", b: "Parce qu'il n'en donne que la moyenne sur les orientations : il faut six nombres, ceux d'une forme quadratique symétrique en la normale du plan.", c: "Parce qu'il faudrait aussi l'excès d'un cube.", d: "Il suffit : en trois dimensions comme en deux, la courbure en un point est un seul nombre." },
        why: "L'excès d'un cercle dépend de l'orientation de son plan, par K(n) = K₁n₁² + K₂n₂² + K₃n₃² dans les axes principaux. Ce tableau symétrique 3 × 3 a six coefficients ; la sphère n'en voit que la trace. Leçon « Courbure d'un espace à trois dimensions »." },
      soleil: { prompt: "D'après la loi d'Einstein pour la courbure moyenne, de combien le rayon du Soleil, mesuré jusqu'au centre, dépasse-t-il celui qu'annonce l'aire de sa surface ? On prend GM = 1,33 × 10²⁰\u00a0m³·s⁻² et une densité uniforme.",
        options: { a: "D'environ 1,5\u00a0mm, comme la Terre.", b: "D'environ 49\u00a0km.", c: "D'environ 490\u00a0m.", d: "D'environ 4,9\u00a0m." },
        hint: "L'excès vaut GM/(3c²).",
        why: "1,33 × 10²⁰/(3 × 9,0 × 10¹⁶) ≈ 490\u00a0m, pour un rayon de 6,96 × 10⁸\u00a0m : 7 × 10⁻⁷ en valeur relative, le tiers de GM/(c²R). Personne ne creusera jusqu'au centre du Soleil ; la courbure de l'espace près de lui se mesure par la déviation de la lumière et le retard des ondes radio. Leçon « Notre espace est-il courbe ? »." },
      compact: { prompt: "Pour une étoile à neutrons de 1,34 masse solaire et 12,7\u00a0km de rayon, la loi linéaire GM/(3c²) donne un excès de rayon de 660\u00a0m. Que donne le calcul exact pour une boule homogène, et pourquoi ?",
        options: { a: "660\u00a0m : la loi est exacte pour une boule homogène.", b: "Moins de 660\u00a0m : la courbure sature à forte densité.", c: "Zéro : la pression compense la masse.", d: "Environ 770\u00a0m : GM/(c²R) ≈ 0,16 n'est plus petit devant 1, et l'excès exact dépasse de 17\u00a0% celui du premier ordre." },
        hint: "La correction relative au premier ordre vaut environ 0,9 GM/(c²R).",
        why: "La loi d'Einstein sous la forme GM/(3c²) est un premier ordre en GM/(c²R) : 7 × 10⁻¹⁰ pour la Terre, 2 × 10⁻⁶ pour le Soleil, mais 0,16 ici. La forme exacte, √(R³/r_s) arcsin √(r_s/R), donne 774\u00a0m. Leçon « Notre espace est-il courbe ? »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

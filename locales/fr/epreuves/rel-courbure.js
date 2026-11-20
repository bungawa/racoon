/* Épreuve de l'étape « Courbure et équations d'Einstein » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      rectangle: { prompt: "Deux objets au repos, l'un au pied d'une tour de 50\u00a0m, l'autre au sommet, sont suivis chacun pendant un jour (86\u202f400\u00a0s) de sa propre horloge, avec g = 9,81\u00a0m·s⁻². Combien manque-t-il au côté du haut pour fermer le rectangle d'espace-temps ?",
        options: { a: "0,47\u00a0ns", b: "4,7\u00a0µs", c: "47\u00a0ps", d: "0,47\u00a0µs" },
        hint: "gH/c² vaut 1,1 × 10⁻¹⁶ par mètre.",
        why: "δτ = (gH/c²) Δτ = 9,81 × 50/(9,0 × 10¹⁶) × 86\u202f400 ≈ 4,7 × 10⁻¹⁰\u00a0s. L'horloge du haut avance, elle atteint sa durée avant l'instant simultané avec la fin de la base : leçon « La courbure de l'espace-temps »." },
      fusee: { prompt: "Le même rectangle s'ouvre dans une fusée qui accélère à g loin de toute masse, où l'espace-temps est plat. Qu'est-ce qui distingue alors un vrai champ de gravitation ?",
        options: { a: "Rien : gravitation et accélération sont identiques en tout point.", b: "Les variations du champ d'un endroit à l'autre, les effets de marée, qu'aucun référentiel en chute libre n'annule.", c: "La valeur de g au centre du laboratoire.", d: "Le sens de l'écart entre les horloges, opposé dans la fusée." },
        why: "Un laboratoire en chute libre annule g en son centre, pas ses variations : deux corps voisins s'y rapprochent ou s'écartent. Ces marées mesurent la courbure de l'espace-temps. Leçons « La courbure de l'espace-temps » et « Gravitation et principe d’équivalence »." },
      rayon: { prompt: "Quel est l'ordre de grandeur du rayon de courbure de l'espace-temps à la surface de la Terre, c/√(GM/r³) ?",
        options: { a: "6\u202f400\u00a0km, le rayon de la Terre.", b: "Environ 1\u00a0m.", c: "Environ 2,4 × 10¹¹\u00a0m, plus que la distance de la Terre au Soleil.", d: "Il est infini : l'espace-temps est plat près de la Terre." },
        hint: "√(GM/r³) vaut 1,24 × 10⁻³\u00a0s⁻¹ au sol.",
        why: "c/√(GM/r³) = 3,0 × 10⁸/1,24 × 10⁻³ ≈ 2,4 × 10¹¹\u00a0m, environ 1,6 fois la distance de la Terre au Soleil. À l'échelle d'un laboratoire, l'espace-temps est presque plat, mais pas tout à fait : leçon « La courbure de l'espace-temps »." },
      duree: { prompt: "Une horloge lancée en chute libre revient au sol après 100\u00a0s avec environ 45\u00a0ps d'avance. Quelle avance si on la lance pour qu'elle revienne après 200\u00a0s ?",
        options: { a: "90\u00a0ps, deux fois plus.", b: "180\u00a0ps, quatre fois plus.", c: "45\u00a0ps, la même.", d: "360\u00a0ps, huit fois plus." },
        hint: "Pour la parabole, (42.17) vaut g²T³/(24c²).",
        why: "L'avance croît comme T³ : la hauteur atteinte croît comme T², et elle dure T. Pour 200\u00a0s, 8 × 45\u00a0ps ≈ 360\u00a0ps. Leçon « Mouvement dans l'espace-temps courbe »." },
      compromis: { prompt: "Pourquoi une horloge qui monte plus haut que la balle en chute libre, et revient au même instant, compte-t-elle moins de temps ?",
        options: { a: "Parce que le gain d'altitude croît comme la hauteur du sommet, et la perte due à la vitesse comme son carré.", b: "Parce que les horloges retardent en altitude.", c: "Parce que la lumière met plus de temps à redescendre.", d: "Parce que l'air la freine." },
        why: "Pour une parabole de sommet α fois celui de la chute libre, (42.17) est proportionnelle à α \u2212 α²/2 : maximale pour α = 1. Plus haut, la vitesse nécessaire coûte plus que l'altitude ne rapporte. Leçon « Mouvement dans l'espace-temps courbe »." },
      action: { prompt: "Que dit (42.18), tirée du temps propre maximal en multipliant par \u2212mc² ?",
        options: { a: "Que l'énergie mécanique est conservée le long de la chute.", b: "Que la chute libre rend minimale l'intégrale de l'énergie cinétique moins l'énergie potentielle : le principe de moindre action, qui redonne les lois de Newton.", c: "Que le temps propre est minimal en chute libre.", d: "Que la masse ne joue aucun rôle dans le mouvement." },
        why: "Multiplier par une constante négative change un maximum en minimum sans le déplacer. L'intégrale obtenue est l'action, dont le minimum donne les équations de Newton dans un potentiel. Leçon « Mouvement dans l'espace-temps courbe »." },
      lumiere: { prompt: "Un rayon de lumière passe à deux rayons solaires du centre du Soleil. De quel angle la relativité générale le dévie-t-elle ?",
        options: { a: "1,75″", b: "3,5″", c: "0,87″", d: "0,44″" },
        hint: "La déviation 4GM/(c²b) vaut 1,75″ au bord du Soleil.",
        why: "L'angle varie comme 1/b : à deux rayons solaires, la moitié de 1,75″, soit 0,87″. Newton en donnerait encore la moitié, 0,44″. Leçon « La théorie de la gravitation d'Einstein »." },
      observateur: { prompt: "Un observateur passe à grande vitesse devant une sphère de matière. Avec quelle grandeur calcule-t-il l'excès de rayon de la sphère qu'il mesure ?",
        options: { a: "La masse au repos de la matière seulement.", b: "Zéro : pour lui, la matière bouge et ne courbe rien.", c: "La masse au repos divisée par le facteur de Lorentz.", d: "Toute l'énergie qu'il mesure dans la sphère, cinétique comprise, avec (42.3w)." },
        why: "La loi de la courbure doit valoir pour tout observateur : chacun y met l'énergie qu'il mesure. C'est l'équation du champ d'Einstein ; l'équation du mouvement est le temps propre maximal. Leçon « La théorie de la gravitation d'Einstein »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

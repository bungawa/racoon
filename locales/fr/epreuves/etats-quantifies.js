/* Épreuve de l'étape « États magnétiques quantifiés » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      peigne: { prompt: "Des atomes de spin 3/2 et de facteur g = 4/3, orientés au hasard, sont triés selon μ_z. Que trouve-t-on ?",
        options: { a: "Quatre valeurs, un quart des atomes chacune ; la plus grande vaut 2\u00a0μ_B, moins que la longueur du moment, environ 2,6\u00a0μ_B.", b: "Une répartition uniforme entre \u22122,6\u00a0μ_B et +2,6\u00a0μ_B.", c: "Trois valeurs, dont zéro pour un tiers des atomes.", d: "Quatre valeurs, mais la moitié des atomes sur la plus basse, à cause du champ." },
        hint: "2j + 1 valeurs de poids égaux ; la plus grande vaut g j μ_B, la longueur g √(j(j + 1)) μ_B.",
        why: "J_z prend 4 valeurs, de poids égaux pour des atomes orientés au hasard : μ_z = g μ_B m, au plus (4/3)(3/2) μ_B = 2 μ_B, alors que la longueur vaut (4/3)√(15/4) ≈ 2,58 μ_B. La répartition classique uniforme a le même carré moyen, mais pas la même forme. Leçon « États magnétiques quantifiés »." },
      rpe: { prompt: "Un spectromètre de résonance paramagnétique électronique travaille dans un champ de 0,35\u00a0T, sur des électrons non appariés de g ≈ 2. À quelle fréquence l'onde doit-elle être ?",
        options: { a: "Environ 15\u00a0MHz, comme pour des protons.", b: "Environ 9,8\u00a0GHz, dans les micro-ondes.", c: "Environ 4,9\u00a0GHz, la moitié, car le spin vaut 1/2.", d: "Environ 98\u00a0GHz." },
        hint: "Environ 28\u00a0GHz par tesla pour le spin de l'électron.",
        why: "f = ω_p/2π = g q_e B/(4π m_e) ≈ 28,0\u00a0GHz/T × 0,35\u00a0T ≈ 9,8\u00a0GHz : l'écart entre les deux niveaux, divisé par h. Le spin 1/2 est déjà dans l'écart ħω_p entre niveaux voisins. Leçons « États magnétiques quantifiés » et « Méthode de Rabi »." },
      taches: { prompt: "Un jet d'atomes d'une espèce inconnue laisse quatre traces séparées sur la plaque d'un appareil de Stern et Gerlach. Que vaut le spin de ces atomes ?",
        options: { a: "2, car le spin compte les traces de part et d'autre du centre.", b: "4.", c: "3/2.", d: "1/2, comme l'argent, la quatrième trace venant d'atomes lents." },
        hint: "Une trace par valeur de μ_z.",
        why: "2j + 1 = 4 donne j = 3/2. Un spin entier donnerait un nombre impair de traces, dont une au centre. Les atomes lents étirent chaque trace, ils n'en créent pas de nouvelles. Leçons « Expérience de Stern et Gerlach » et « États magnétiques quantifiés »." },
      reglage: { prompt: "Dans le modèle de l'appareil de 1922, les maximums des deux traces de l'argent sont à environ 0,11\u00a0mm l'un de l'autre. On double le gradient du champ et on fait passer le four de 1\u202f273\u00a0K à 637\u00a0K. Que devient cet écart ?",
        options: { a: "Il ne change pas : seul le nombre de traces dépend du réglage.", b: "Il double : seul le gradient compte.", c: "Environ 0,22\u00a0mm, car les atomes plus lents compensent leur masse.", d: "Environ 0,44\u00a0mm : la déviation est proportionnelle au gradient et inversement proportionnelle à la température du four." },
        hint: "z0 = F_z (L²/2 + L D)/(2 k_B T).",
        why: "D'après (35.6b) de « Expérience de Stern et Gerlach », la déviation est proportionnelle à ∂B/∂z et à 1/T : × 2 × 2 = × 4, soit 0,44\u00a0mm. La masse des atomes n'y figure pas. Leçon « Expérience de Stern et Gerlach »." },
      centre: { prompt: "Pourquoi la prévision classique pour l'argent n'a-t-elle pas de vide au centre de la plaque, alors que la plaque réelle en a un ?",
        options: { a: "Classiquement, cos θ prend toutes les valeurs, y compris près de zéro, et des atomes sont à peine déviés ; quantiquement, μ_z ne vaut que ±μ_B environ, jamais zéro.", b: "Parce que l'aimant classique n'a pas de gradient au centre.", c: "Parce que les atomes classiques vont plus vite.", d: "Parce que la pesanteur remplit le centre dans le modèle classique." },
        why: "La force (35.6) vaut μ cos θ ∂B/∂z. Avec des orientations au hasard, cos θ est uniforme entre \u22121 et 1 : la tache classique est même la plus dense au centre. Pour un spin 1/2, il n'existe aucun état de μ_z nul. Leçons « Expérience de Stern et Gerlach » et « États magnétiques quantifiés »." },
      champ: { prompt: "Dans un appareil de Rabi, on passe de B0 = 0,01\u00a0T à 0,02\u00a0T sans rien changer d'autre. Que deviennent la fréquence de résonance et la largeur du creux ?",
        options: { a: "Les deux doublent : la précision relative ne change pas.", b: "La fréquence double, la largeur ne change pas : la précision relative sur la fréquence est deux fois meilleure.", c: "La fréquence double, la largeur est divisée par deux.", d: "Rien ne change : B0 ne fait que trier les atomes." },
        hint: "La largeur est fixée par le temps passé dans le champ oscillant.",
        why: "ω_p = g(q/2m)B0 suit le champ ; la largeur, de l'ordre de 1/t avec t = l/v, n'en dépend pas. Le rapport largeur/fréquence est donc divisé par deux. Leçon « Méthode de Rabi »." },
      bascule: { prompt: "Des atomes de spin 1/2 et de g ≈ 2 passent 5\u00a0cm dans le champ oscillant, à 660\u00a0m·s⁻¹. Quelle amplitude B′ du champ linéaire les fait basculer à coup sûr à la résonance ?",
        options: { a: "Environ 0,24\u00a0µT : ω1 t = π avec ω1 = |γ| B′.", b: "Environ 0,01\u00a0T, comparable à B0.", c: "Environ 0,47\u00a0µT : ω1 t = π avec ω1 = |γ| B′/2, seule la moitié tournante du champ agissant.", d: "N'importe laquelle : à la résonance, tous les atomes basculent." },
        hint: "|γ| ≈ 1,76 × 10¹¹ rad·s⁻¹·T⁻¹ pour l'électron ; t = l/v.",
        why: "t = 0,05/660 ≈ 76\u00a0µs ; il faut |γ|(B′/2) t = π, soit B′ = 2π v/(|γ| l) ≈ 4,7 × 10⁻⁷\u00a0T. Un champ deux fois plus fort ferait faire un tour complet, et l'atome reviendrait à son état. Leçon « Méthode de Rabi »." },
      spin1: { prompt: "Dans un appareil de Rabi, des atomes de spin 1 sont soumis à un champ oscillant dont on balaie la fréquence. Où le courant baisse-t-il ?",
        options: { a: "À ω_p et à 2ω_p : deux creux, un par transition.", b: "À 2ω_p seulement, l'écart entre les niveaux extrêmes.", c: "Nulle part : un spin entier ne bascule pas.", d: "À ω_p seulement : les deux transitions entre niveaux voisins ont la même fréquence, et le saut de deux marches ne se produit pas." },
        why: "Les trois niveaux sont équidistants, d'écart ħω_p : les transitions m = 1 ↔ 0 et 0 ↔ \u22121 ont la même fréquence. Le champ oscillant ne fait pas sauter deux marches à la fois : pas de creux à 2ω_p. Leçons « Méthode de Rabi » et « États magnétiques quantifiés »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

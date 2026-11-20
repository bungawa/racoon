/* Épreuve de l'étape « Potentiel vecteur de circuits simples » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      filcourant: { prompt: "Hors d'un long fil droit, Az diminue de 4,6 × 10⁻⁷\u00a0T·m quand on passe de 1\u00a0cm à 10\u00a0cm de l'axe. Quel courant porte le fil ?",
        options: { a: "1\u00a0A.", b: "10\u00a0A.", c: "0,1\u00a0A.", d: "On ne peut pas le savoir : Az est défini à une constante près." },
        hint: "Az = \u2212(μ0 I/2π) ln(r/a) : multiplier r par 10 retranche (μ0 I/2π) ln 10.",
        why: "La constante disparaît dans une différence. μ0/(2π) × ln 10 = 2 × 10⁻⁷ × 2,30 ≈ 4,6 × 10⁻⁷\u00a0T·m par ampère : I = 1\u00a0A. Leçon « Potentiel vecteur d'un fil rectiligne »." },
      reference: { prompt: "Pour un long fil, on peut prendre Az nul sur la surface du fil, ou à 1\u00a0m de l'axe. Pourquoi ce choix ne change-t-il pas le champ ?",
        options: { a: "Parce que le fil est neutre.", b: "Parce que les deux choix diffèrent d'une constante, dont le rotationnel est nul.", c: "Parce que B ne dépend pas de A.", d: "Parce que le champ est nul hors du fil." },
        why: "B = ∇ ∧ A ne contient que des dérivées de A. Le logarithme exige une longueur de référence ; en changer ajoute une constante à Az. Leçon « Potentiel vecteur d'un fil rectiligne »." },
      filfini: { prompt: "Un fil droit de 40\u00a0cm porte un courant continu. On mesure le champ à 2\u00a0cm de son milieu. Quelle erreur relative fait la formule du fil infini, μ0 I/(2π r) ?",
        options: { a: "Environ 5\u00a0%.", b: "Environ 0,05\u00a0%.", c: "Environ 0,5\u00a0%.", d: "Aucune, puisque r ≪ L." },
        why: "Au milieu, le champ exact vaut celui du fil infini divisé par √(1 + 4r²/L²) : l'écart vaut environ 2(r/L)² = 2 × (0,05)² = 0,5\u00a0%. Petit, mais pas nul. Leçon « Potentiel vecteur d'un fil rectiligne »." },
      circulation: { prompt: "Un long solénoïde : n = 2\u00a0000 spires par mètre, I = 0,5\u00a0A, rayon 1\u00a0cm. Quelle est la circulation de A sur un cercle coaxial de 5\u00a0cm de rayon ?",
        options: { a: "Nulle, puisque B est nul sur ce cercle.", b: "0,39\u00a0µWb × 25, car le cercle est 25 fois plus grand en aire.", c: "0,39\u00a0µWb / 5, car A décroît comme 1/r.", d: "0,39\u00a0µWb, la même que sur tout cercle qui entoure la bobine." },
        hint: "La circulation de A vaut le flux de B enlacé.",
        why: "B = μ0 n I = 1,26\u00a0mT dedans, nul dehors. Le flux enlacé est B π a² ≈ 3,9 × 10⁻⁷\u00a0Wb, quel que soit le rayon du cercle pourvu qu'il entoure la bobine. Leçon « Potentiel vecteur d'un long solénoïde »." },
      dehors: { prompt: "Même solénoïde. Que vaut le potentiel vecteur à 5\u00a0cm de l'axe ?",
        options: { a: "Environ 1,3\u00a0µT·m, tangent au cercle, dans le sens du courant des spires ; le champ y est nul.", b: "Zéro, comme le champ.", c: "Environ 1,3\u00a0µT·m, parallèle à l'axe.", d: "Environ 6,3\u00a0µT·m, radial." },
        why: "Circulation 2π r A = 3,9 × 10⁻⁷\u00a0Wb, d'où A ≈ 3,9 × 10⁻⁷/(2π × 0,05) ≈ 1,3 × 10⁻⁶\u00a0T·m. A tourne avec le courant ; son rotationnel est nul hors de la bobine. Leçon « Potentiel vecteur d'un long solénoïde »." },
      cylindre: { prompt: "Un long cylindre chargé tourne autour de son axe ; un fil radial tourne avec lui. On double le rayon du cylindre, à charge surfacique σ et vitesse angulaire ω inchangées. La tension entre les bouts du fil :",
        options: { a: "double.", b: "est multipliée par 8.", c: "est multipliée par 4.", d: "ne change pas." },
        why: "B = μ0 σ a ω double ; U = ω B a²/2 gagne en plus un facteur 4 par a². Au total U ∝ a³ : × 8. Leçon « Potentiel vecteur d'un long solénoïde »." },
      bobine: { prompt: "Une bobine plate de 50 spires circulaires, de 1\u00a0cm de rayon, porte 0,2\u00a0A. Quel champ sur son axe, à 20\u00a0cm ?",
        options: { a: "Environ 1,6\u00a0µT.", b: "Environ 39\u00a0nT.", c: "Environ 79\u00a0nT.", d: "Environ 3,9\u00a0nT." },
        hint: "μ = N I π R², puis Bz = 2 μ0 μ/(4π z³) sur l'axe.",
        why: "μ = 50 × 0,2 × π × 10⁻⁴ ≈ 3,1 × 10⁻³\u00a0A·m². Sur l'axe, B = 2 × 10⁻⁷ × 3,1 × 10⁻³/(0,2)³ ≈ 7,9 × 10⁻⁸\u00a0T. R/z = 0,05 : le dipôle est excellent. Leçon « Champ d'une petite boucle et dipôle magnétique »." },
      pres: { prompt: "Qu'est-ce qui distingue une petite boucle de courant d'un dipôle électrique de même orientation ?",
        options: { a: "Rien : ce sont les mêmes champs partout.", b: "Le champ de la boucle décroît comme 1/r², celui du dipôle électrique comme 1/r³.", c: "La boucle porte deux pôles magnétiques opposés.", d: "Loin, rien ; près, les lignes de B traversent la boucle et se referment, alors que celles de E vont d'une charge à l'autre." },
        why: "Loin des sources, E et B obéissent aux mêmes équations : divergence et rotationnel nuls. Près, les sources diffèrent : il n'y a pas de charge magnétique, B n'a ni source ni puits. Au centre, B est dans le sens de μ ; entre les charges, E est opposé à p. Leçon « Champ d'une petite boucle et dipôle magnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

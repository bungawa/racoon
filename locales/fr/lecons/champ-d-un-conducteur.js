/* Leçon « Champ au voisinage d'un conducteur » (Feynman II.5.9) : textes en français.
   Une autre langue = locales/<langue>/lecons/champ-d-un-conducteur.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Champ au voisinage d'un conducteur",
    "crumb.jour": "Champ d'un conducteur",
    "h1": "Champ au voisinage d'un conducteur",
    "lede": "Dans un métal, des électrons libres se déplacent tant qu'un champ les pousse. À l'équilibre, il n'y a donc plus de champ dans le métal, plus de charge dans son volume, et l'excès de charge tient dans une pellicule à la surface. Juste dehors, le champ est normal à la surface et vaut σ/ε0 : deux fois le champ d'un plan chargé seul.",
    "tag.piste": "Électromagnétisme",
    "tag.prereq": "Prérequis : équilibre en présence de conducteurs",

    "s1.sec": "Dans le métal",
    "s1.h2": "Dans le métal, le champ s'annule",
    "s1.p1": "Un conducteur contient des charges libres de se déplacer : dans un métal, environ un électron par atome. Tant qu'un champ règne dans le métal, il les met en mouvement, et elles se répartissent autrement. Elles ne s'arrêtent que lorsque leur propre champ annule, en tout point du métal, le champ qui les poussait. Le mouvement s'arrête vite : la leçon « Équilibre en présence de conducteurs » estime ce temps pour le cuivre. À l'équilibre, le champ est nul dans le métal, le potentiel y a la même valeur partout, et la loi de Gauss locale, (4.38), donne une densité de charge nulle dans le volume.",
    "val.dedans": "Approximation : champ et densité moyennés sur quelques distances atomiques. À l'échelle d'un atome, le champ des noyaux et des électrons atteint 10<sup>11</sup>\u00a0V·m<sup>\u22121</sup> ; c'est sa moyenne qui s'annule. Équilibre atteint : un courant entretenu par un générateur laisse un champ <var>j</var>/γ dans le métal, faible devant les champs extérieurs habituels (environ 0,02\u00a0V·m<sup>\u22121</sup> pour 1\u00a0A·mm<sup>\u22122</sup> dans le cuivre).",
    "s1.p2": "Où va l'excès de charge, s'il n'est pas dans le volume ? À la surface, et seulement là. Il y est retenu par les forces qui empêchent les électrons de quitter le métal ; la physique des solides montre qu'il occupe une ou deux couches d'atomes.",
    "sys.title": "Décrire le système avant d'appliquer la loi",
    "sys1.body": "Une sphère de cuivre de 10\u00a0cm de rayon, isolée, portée à 30\u00a0kV. Sa charge de surface vaut σ = ε<sub>0</sub>φ/<var>R</var> ≈ {sigma}, soit {exces} électrons manquants par mètre carré. Une seule couche atomique de cuivre contient environ <var>n</var><sup>2/3</sup> ≈ {couche} électrons libres par mètre carré (<var>n</var> ≈ 8,47 × 10<sup>28</sup>\u00a0m<sup>\u22123</sup>). L'excès est donc {frac} d'une couche : un déplacement infime des électrons suffit à annuler le champ dans le métal. Ce qu'on néglige : la tige isolante qui porte la sphère, et les objets voisins, qui rendent σ non uniforme.",

    "s2.sec": "Juste dehors",
    "s2.h2": "Juste dehors, un champ normal qui vaut σ/ε0",
    "s2.p1": "Le champ juste à l'extérieur est perpendiculaire à la surface. Une composante tangente pousserait les charges de surface le long du métal, et l'équilibre ne serait pas atteint ; c'est aussi ce que dit le potentiel : la surface est une équipotentielle, et le champ est normal aux équipotentielles. Sa norme vient de la loi de Gauss, appliquée à une petite boîte plate qui traverse la surface : la face dans le métal ne reçoit aucun flux, les côtés n'en reçoivent pas puisque le champ est normal, la face dehors reçoit <var>E</var><var>A</var>. La boîte contient σ<var>A</var>.",
    "val.5.8": "Approximation : « juste dehors » veut dire à une distance petite devant le rayon de courbure de la surface et devant la distance aux autres charges, grande devant l'épaisseur de la pellicule chargée (environ 10<sup>\u221210</sup>\u00a0m). σ est la densité locale, au point considéré : sur un conducteur de forme quelconque, elle varie d'un point à l'autre. L'égalité est exacte pour la moyenne du champ sur la boîte, dès que la boîte est assez petite.",
    "s2.p2": "Un plan chargé seul, de même σ, ne crée que σ/(2ε<sub>0</sub>) de chaque côté (leçon « Plan chargé et deux plans chargés »). D'où vient le facteur 2 ? La charge proche du point crée σ/(2ε<sub>0</sub>) dehors et \u2212σ/(2ε<sub>0</sub>) dedans. Toutes les autres charges, sur le reste du conducteur et ailleurs, doivent annuler le champ dans le métal : elles y créent +σ/(2ε<sub>0</sub>), et presque autant juste dehors, puisqu'elles sont loin. Dedans, les deux s'annulent ; dehors, ils s'ajoutent.",

    "s3.sec": "Une conséquence",
    "s3.h2": "Deux sphères reliées : la petite a le champ le plus fort",
    "s3.p1": "Reliez par un fil fin une sphère de rayon <var>a</var> et une sphère de rayon <var>b</var>, loin l'une de l'autre : elles forment un seul conducteur, au même potentiel φ. Chacune porte alors 4πε<sub>0</sub><var>R</var>φ, et sa densité de surface vaut ε<sub>0</sub>φ/<var>R</var>. La petite sphère porte moins de charge, mais sur une aire bien plus petite : son champ de surface, (5.8), est le plus fort. C'est le pouvoir des pointes : sur un conducteur chargé, le champ est le plus intense là où la courbure est la plus forte.",
    "val.pointes": "Approximation : sphères éloignées (distance <var>d</var> ≫ <var>a</var>, <var>b</var>), charge du fil négligée. L'influence mutuelle corrige les charges d'un terme relatif de l'ordre de <var>R</var>/<var>d</var> et rend σ non uniforme ; la figure la calcule exactement, par des images successives. Sur un conducteur réel, la « petite sphère » est une pointe ou une arête, et son rayon de courbure joue le rôle de <var>a</var>.",
    "sp.aria": "Champ juste à la surface de deux sphères conductrices reliées, en fonction de l'angle depuis la direction de l'autre sphère",
    "sp.legend.petite": "petite sphère, rayon a",
    "sp.legend.grande": "grande sphère, b = 10 cm",
    "sp.x": "angle depuis la direction de l'autre sphère (°)",
    "sp.y": "E R/φ (1 : sphère seule)",
    "sp.a": "Rayon a de la petite sphère",
    "sp.g": "Écart entre les surfaces",
    "sp.k.rap": "Rapport des densités moyennes σ<sub>a</sub>/σ<sub>b</sub>",
    "sp.f.rap": "loin l'une de l'autre : b/a = {r}",
    "sp.k.emax": "Champ maximal, à φ = 30\u00a0kV",
    "sp.f.emax": "grande sphère seule : {e}",
    "sp.k.vmax": "Potentiel au-delà duquel l'air claque",
    "sp.f.vmax": "champ de surface 3\u00a0MV·m⁻¹ ; grande sphère seule : {v}",
    "sp.caption": "La grande sphère (10\u00a0cm) et la petite sont au même potentiel. Le champ à la surface de chacune est rapporté à celui d'une sphère seule au même potentiel, φ/<var>R</var>. Loin l'une de l'autre, les courbes sont plates et le rapport des densités tend vers <var>b</var>/<var>a</var>. Rapprochez-les : chaque sphère écarte les charges de l'autre de la face qui la regarde (angle 0). Avec une petite sphère de 1\u00a0cm, l'ensemble ne tient plus que 30\u00a0kV environ avant que l'air ne devienne conducteur, alors que la grande sphère seule tiendrait 300\u00a0kV : c'est la petite qui fixe la limite.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des pointes de Franklin aux paratonnerres normalisés",
    "hist.intro": "Le pouvoir des pointes a été observé un siècle avant que la répartition des charges sur un conducteur ne soit calculée. Il fixe encore la forme des paratonnerres et des électrodes à haute tension.",
    "hist.events": {
      franklin: { who: "Benjamin Franklin", what: "écrit le 25 mai à Peter Collinson, à Londres : une pointe approchée d'un boulet de fer chargé lui retire sa charge sans étincelle, et une pointe fixée sur un conducteur chargé laisse la charge s'échapper.", context: "Le champ, le plus fort là où la courbure est la plus grande, rend l'air conducteur au voisinage de la pointe. Franklin en tire l'idée du paratonnerre." },
      poisson: { who: "Siméon Denis Poisson", what: "présente le 9 mars, à l'Institut, la première partie de son mémoire sur la distribution de l'électricité à la surface des corps conducteurs.", context: "Il part de la condition d'équilibre : la force électrique résultante est nulle en tout point intérieur du conducteur. Il en tire, par le calcul, la répartition de la charge à la surface, avec la loi en 1/r² de Coulomb." },
      norme: { who: "CENELEC", what: "publie la série de normes européennes EN 62305 sur la protection contre la foudre ; la partie 3 traite des dommages aux structures et des dispositifs de capture.", context: "Les paratonnerres y sont dimensionnés par la méthode de la sphère roulante, qui repère les points d'une structure que la décharge peut atteindre." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      paratonnerre: { name: "Paratonnerres", text: "Une tige mise à la terre renforce le champ à son extrémité, où la décharge ascendante part avant de partir du toit ; la série EN 62305 fixe leur placement." },
      terminal: { name: "Électrodes à haute tension", text: "Les électrodes des générateurs électrostatiques et des laboratoires d'essais à haute tension sont de grandes surfaces lisses et polies : le potentiel qu'elles tiennent est limité par le champ de surface φ/<var>R</var>, que la moindre aspérité augmente." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      dedans: { prompt: "Un bloc de cuivre est à l'équilibre, chargé, près d'autres charges. Que vaut le champ électrique en un point de son volume ?",
        options: { a: "σ/ε0, comme à la surface.", b: "Le champ des charges extérieures, que le métal laisse passer.", c: "Zéro en moyenne : sinon les électrons libres bougeraient encore.", d: "Il dépend de la forme du bloc." },
        why: "Tant qu'un champ moyen subsiste dans le métal, il déplace les électrons libres. L'équilibre n'est atteint que lorsque le champ de leur nouvelle répartition annule exactement celui des autres charges, en tout point du métal." },
      surface: { prompt: "On ajoute 1\u00a0nC à une sphère de cuivre isolée. Où se trouve cette charge à l'équilibre ?",
        options: { a: "À la surface, dans une ou deux couches d'atomes.", b: "Répartie uniformément dans le volume.", c: "Au centre, par symétrie.", d: "Moitié dans le volume, moitié en surface." },
        hint: "Appliquez la loi de Gauss à une petite surface fermée tracée dans le métal.",
        why: "Le champ est nul dans le métal : le flux à travers toute surface fermée tracée dans le métal est nul, donc la charge qu'elle contient aussi. L'excès ne peut être qu'à la surface." },
      normal: { prompt: "Pourquoi le champ juste à l'extérieur d'un conducteur à l'équilibre est-il perpendiculaire à sa surface ?",
        options: { a: "Parce que la surface est toujours sphérique de près.", b: "Parce que σ est uniforme.", c: "Parce que les charges extérieures sont loin.", d: "Parce qu'une composante tangente pousserait les charges le long de la surface : l'équilibre ne serait pas atteint." },
        why: "La surface est une équipotentielle : aucune différence de potentiel le long d'elle, donc pas de composante tangente du champ. Seule la composante normale subsiste, retenue par les forces qui empêchent les charges de quitter le métal." },
      double: { prompt: "Un plan chargé seul crée σ/(2ε0) de chaque côté. Pourquoi le champ juste à l'extérieur d'un conducteur vaut-il σ/ε0 ?",
        options: { a: "Parce que le métal double la charge par influence.", b: "Parce que les autres charges ajoutent σ/(2ε0) : elles annulent le champ de la charge proche dans le métal et le doublent dehors.", c: "Parce que la boîte de Gauss a deux faces.", d: "Ce n'est vrai que pour une sphère." },
        why: "La charge proche crée ±σ/(2ε0) de part et d'autre. Le champ dans le métal est nul : le reste des charges y crée +σ/(2ε0), et pratiquement autant juste dehors. Dehors, les deux s'ajoutent." },
      pointes: { prompt: "Une sphère de 1\u00a0cm et une sphère de 10\u00a0cm, très éloignées, sont reliées par un fil fin et chargées. Comment se comparent les champs à leur surface ?",
        options: { a: "Ils sont égaux, puisque le potentiel est le même.", b: "Le champ est 10 fois plus fort sur la grande, qui porte 10 fois plus de charge.", c: "Le champ est 10 fois plus fort sur la petite : E = φ/R.", d: "Le champ est 100 fois plus fort sur la petite." },
        hint: "Même potentiel φ = Q/(4πε0R) ; le champ de surface vaut Q/(4πε0R²).",
        why: "Chaque sphère porte 4πε0Rφ, et son champ de surface vaut φ/R. La petite porte dix fois moins de charge sur une aire cent fois plus petite : son champ est dix fois plus fort." },
      couche: { prompt: "Une sphère de cuivre de 10\u00a0cm de rayon est portée à 30\u00a0kV. Quelle fraction d'une couche atomique d'électrons faut-il retirer de sa surface ?",
        options: { a: "Environ 10⁻⁶ : 1,7 × 10¹³ électrons par mètre carré, contre 2 × 10¹⁹ dans une couche.", b: "Environ une couche entière.", c: "Environ 10⁻² d'une couche.", d: "Plusieurs couches : la charge pénètre dans le métal." },
        hint: "σ = ε0φ/R, puis divisez par e.",
        why: "σ = 8,85 × 10⁻¹² × 3 × 10⁴/0,1 ≈ 2,7 × 10⁻⁶\u00a0C·m⁻², soit 1,7 × 10¹³ électrons par mètre carré. Une couche de cuivre en compte environ 2 × 10¹⁹ : moins d'un millionième." },
      mesure: { prompt: "Juste au-dessus d'un point de la surface d'un conducteur, on mesure un champ de 100\u00a0kV·m⁻¹, normal à la surface. Que vaut la densité de charge en ce point ?",
        options: { a: "Environ 4,4 × 10⁻⁷\u00a0C·m⁻², avec σ = 2ε0E.", b: "On ne peut pas la connaître sans la forme du conducteur.", c: "Zéro : la charge est dans le volume.", d: "Environ 8,9 × 10⁻⁷\u00a0C·m⁻² : σ = ε0E, (5.8)." },
        why: "(5.8) est locale : le champ juste dehors donne la densité au point, quelle que soit la forme du conducteur. 8,85 × 10⁻¹² × 10⁵ ≈ 8,9 × 10⁻⁷\u00a0C·m⁻²." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. II, chap. 5 (texte original en anglais), §5-9. Exemples de la sphère de cuivre et des sphères reliées, et calculs numériques propres à cette page. Sigles : CENELEC, EN.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

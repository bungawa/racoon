/* Épreuve de l'étape « Cristaux : symétries et résistance des métaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      polarisation: { prompt: "Un cristal a un réseau quadratique, et son motif garde toutes les symétries du réseau. Combien de coefficients libres a son tenseur de polarisabilité, et quelle forme a son ellipsoïde ?",
        options: { a: "2 coefficients : un ellipsoïde de révolution autour de l'axe d'ordre 4.", b: "1 coefficient : une sphère, comme pour un cristal cubique.", c: "3 coefficients : trois axes différents, le long des arêtes.", d: "6 coefficients : un ellipsoïde quelconque." },
        hint: "Un quart de tour autour de l'axe d'ordre 4 doit laisser l'ellipsoïde inchangé.",
        why: "Le quart de tour échange les deux directions perpendiculaires à l'axe : leurs coefficients sont égaux, il reste celui de l'axe et celui du plan. Le cubique, avec ses trois axes d'ordre 4, n'en garde qu'un. Leçon « Symétries dans l'espace »." },
      piezo: { prompt: "Tout réseau est invariant par inversion. Quel cristal peut alors être piézoélectrique ?",
        options: { a: "Aucun : le réseau impose le centre de symétrie au cristal.", b: "Un cristal dont le motif n'a pas de centre de symétrie, quel que soit son réseau.", c: "Seulement un cristal triclinique.", d: "Tout cristal, car la piézoélectricité ne dépend pas de la symétrie." },
        hint: "Le cristal est le réseau plus le motif ; il ne garde que les symétries communes aux deux.",
        why: "Le tenseur piézoélectrique est de rang 3 : l'inversion le change de signe, il est nul dans un cristal centrosymétrique. Le réseau a toujours ce centre ; c'est le motif qui peut le retirer, comme dans le quartz. Leçon « Symétries dans l'espace »." },
      frenkel: { prompt: "Cuivre : G = 48 GPa ; dans les plans {111}, b/d ≈ 1,22. Que vaut la résistance théorique au cisaillement G b/(2π d), et que mesure-t-on sur un monocristal pur ?",
        options: { a: "Environ 48 GPa, et autant mesuré.", b: "Environ 1 MPa calculé, environ 9 GPa mesuré.", c: "Environ 9 GPa calculé ; le cristal glisse sous quelques mégapascals.", d: "Environ 0,9 GPa calculé, environ 0,9 GPa mesuré." },
        hint: "1,22/2π ≈ 0,19.",
        why: "48 × 1,22/2π ≈ 9,3\u00a0GPa : c'est la contrainte pour faire glisser un plan entier d'un coup. Le cristal réel glisse des milliers de fois plus bas, parce qu'une dislocation fait passer les atomes un à un. Leçon « La résistance des métaux »." },
      rangee: { prompt: "Dans le modèle de Frenkel et Kontorova, la rangée parfaite ne glisse qu'à f = 1 ; avec une dislocation et des liaisons de raideur k = 10, dès f ≈ 0,002. Pourquoi ?",
        options: { a: "Parce que les liaisons raides affaiblissent le substrat.", b: "Parce que la dislocation supprime le substrat sous elle.", c: "Parce que la rangée avec dislocation est plus courte.", d: "Parce que la dislocation s'étale sur de nombreux atomes, chacun peu écarté de son creux, et que les forces du substrat se compensent presque d'un atome à l'autre." },
        hint: "Regardez les atomes du cœur de la dislocation : certains montent une bosse, d'autres la descendent.",
        why: "Pour faire avancer la dislocation d'un site, il suffit de déplacer un peu les atomes de son cœur : ceux qui montent une bosse sont aidés par ceux qui la descendent. Plus le cœur est large, plus le paysage qu'il voit est plat. Leçon « La résistance des métaux »." },
      acier: { prompt: "Acier S355 : f_y = 355 MPa. Sa limite en cisaillement f_y/√3, comparée à la résistance théorique du fer, environ 16 GPa avec G = 81 GPa ?",
        options: { a: "Environ 205 MPa, quelque 80 fois moins.", b: "Environ 355 MPa, 45 fois moins.", c: "Environ 615 MPa, 26 fois moins.", d: "Environ 16 GPa : un acier atteint la résistance théorique." },
        hint: "√3 ≈ 1,73.",
        why: "355/1,73 ≈ 205\u00a0MPa, et 15,8\u00a0GPa / 205\u00a0MPa ≈ 77. Le carbone et les éléments d'alliage retiennent les dislocations, sans approcher le cristal parfait. Leçon « La résistance des métaux »." },
      circuit: { prompt: "Un circuit de Burgers de 5 pas par côté entoure deux dislocations coin de vecteurs de Burgers opposés, +b et \u2212b. Que vaut son défaut de fermeture ?",
        options: { a: "2b : un pas manquant par dislocation.", b: "Zéro : le défaut de fermeture est la somme des vecteurs de Burgers entourés.", c: "b : une seule dislocation compte.", d: "Il dépend de la taille du circuit." },
        hint: "Que donne un circuit qui entoure une seule dislocation, puis un autre qui entoure l'autre ?",
        why: "Le défaut de fermeture s'additionne : +b \u2212 b = 0. Vu de loin, le couple ne déforme presque pas le cristal, et les deux dislocations peuvent s'annuler en se rejoignant. Leçon « Dislocations et croissance des cristaux »." },
      energie: { prompt: "L'énergie par longueur d'une dislocation vis vaut G b²/4π · ln(R/b). Dans du cuivre (b ≈ 0,26 nm), de combien augmente-t-elle quand R passe de 1 µm à 1 mm ?",
        options: { a: "D'un facteur 1\u00a0000, comme R.", b: "D'un facteur 3, comme le nombre de décades.", c: "D'un facteur 1,8 environ.", d: "Elle ne change pas : elle ne dépend que du cœur." },
        hint: "ln(3,9 × 10⁶) / ln(3\u00a0900).",
        why: "15,2/8,3 ≈ 1,8 : la dépendance logarithmique rend l'énergie presque indépendante de la taille du cristal. Quelques électronvolts par distance atomique, cent fois k_B T à 300 K : une dislocation n'est pas un défaut thermique. Leçon « Dislocations et croissance des cristaux »." },
      radeau: { prompt: "Dans un radeau de bulles, un trou laissé par une bulle manquante ne se comble pas ; dans du cuivre chaud, une lacune se déplace. D'où vient la différence ?",
        options: { a: "Les bulles sont trop grosses pour former un réseau.", b: "Les bulles se repoussent au lieu de s'attirer.", c: "Le radeau est plan, et une lacune ne peut se déplacer qu'à trois dimensions.", d: "L'énergie de surface d'une bulle dépasse k_B T d'environ 10¹³ : sans agitation thermique, aucune bulle ne saute d'un site à l'autre." },
        hint: "Qu'est-ce qui fait sauter un atome dans une lacune ? Comparez l'énergie d'une bulle à k_B T.",
        why: "Une lacune migre parce que l'agitation thermique fait sauter un atome voisin dans le trou. Les bulles ne bougent que poussées par leurs voisines : le radeau montre dislocations, joints et limite élastique, pas la diffusion. Leçon « Le modèle de Bragg et Nye »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

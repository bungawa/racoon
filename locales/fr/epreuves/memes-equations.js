/* Épreuve de l'étape « Mêmes équations, mêmes solutions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      barre: { prompt: "La solution sans dimension de ∇²w = \u22121 au centre d'un carré à bord nul vaut 0,0737. Une barre d'inox (K = 16\u00a0W·m⁻¹·K⁻¹) de section carrée de 1\u00a0cm de côté est chauffée uniformément à 10⁷\u00a0W·m⁻³, ses faces tenues à température fixe. Quel est l'échauffement au centre ?",
        options: { a: "Environ 4,6\u00a0K : w s L²/K.", b: "Environ 0,07\u00a0K : w seul, en kelvins.", c: "Environ 460\u00a0K : w s L/K.", d: "Il faut refaire le calcul : la chaleur n'obéit pas à la même équation que le potentiel." },
        hint: "ψ = w × sL²/k : remplacez ρ/ε0 par s/K.",
        why: "0,0737 × 10⁷ × 10⁻⁴/16 ≈ 4,6\u00a0K. C'est le même nombre qui donne 83\u00a0V pour un tube de 10\u00a0cm rempli de 1\u00a0µC·m⁻³ : seul le facteur change. Leçon « Mêmes équations, mêmes solutions »." },
      temps: { prompt: "Qu'est-ce que l'analogie entre électrostatique et conduction thermique ne transporte pas ?",
        options: { a: "La forme des solutions en régime permanent.", b: "Le régime transitoire : la température obéit à une équation avec ∂T/∂t, et n'atteint la solution de Poisson qu'après quelques fois L²/a.", c: "La méthode des images.", d: "Le théorème de Gauss." },
        hint: "Comparez (12.5) et (12.6).",
        why: "(12.5) contient \u2212du/dt ; l'électrostatique n'a pas d'équivalent. L'analogie vaut en régime permanent seulement : 24\u00a0s pour 1\u00a0cm d'inox. Leçons « Mêmes équations, mêmes solutions » et « Écoulement de chaleur et source près d'une paroi »." },
      paroi: { prompt: "Une source de chaleur est enfouie à la profondeur a sous une surface couverte d'un épais isolant (nombre de Biot ≪ 1). Quelle image faut-il ajouter, et que vaut l'élévation de température à la surface juste au-dessus de la source ?",
        options: { a: "Une image de signe opposé ; la surface reste à la température de l'infini.", b: "Aucune image ; G/(4πKa).", c: "Une image de même signe à la hauteur a ; 2G/(4πKa), le double du milieu infini.", d: "Une image de même signe à la hauteur 2a ; G/(4πKa)." },
        hint: "Une surface isolante impose un courant de chaleur tangent.",
        why: "Deux sources égales et symétriques ont des flux qui s'annulent à travers le plan médian : flux normal nul, la condition d'une paroi isolante. (12.15) en ρ = 0 donne 2G/(4πKa). Leçon « Écoulement de chaleur et source près d'une paroi »." },
      tuyau: { prompt: "Un tuyau de 5\u00a0cm de rayon est calorifugé jusqu'à 10\u00a0cm. On porte le rayon extérieur de l'isolant à 15\u00a0cm, températures inchangées. La fuite de chaleur est multipliée par :",
        options: { a: "2/3, comme le rapport des épaisseurs.", b: "1/2.", c: "10/15, comme le rapport des rayons extérieurs.", d: "0,63 = ln 2/ln 3 : elle varie comme 1/ln(b/a), comme la capacité d'un câble coaxial." },
        hint: "(12.12).",
        why: "G = 2πKL(T1 \u2212 T2)/ln(b/a) : ln(10/5) = 0,69, ln(15/5) = 1,10. Doubler l'épaisseur ne retire que 37\u00a0% de la fuite. Leçon « Écoulement de chaleur et source près d'une paroi »." },
      tige: { prompt: "Une tige de 1\u00a0cm de rayon soulève de 10\u00a0mm le centre d'une feuille tendue sur un cadre circulaire de 50\u00a0cm de rayon. À 5\u00a0cm du centre, la feuille est à environ :",
        options: { a: "5,9\u00a0mm : 10 × ln(50/5)/ln(50/1).", b: "2\u00a0mm : la hauteur décroît comme 1/r.", c: "9,2\u00a0mm : la feuille forme un cône.", d: "0,4\u00a0mm : la hauteur décroît comme 1/r²." },
        hint: "∇²u = 0 à deux dimensions, avec symétrie de révolution.",
        why: "(12.18a) : u = u0 ln(R/r)/ln(R/r0) = 10 × 2,30/3,91 ≈ 5,9\u00a0mm. C'est le potentiel entre les conducteurs d'un câble coaxial. Leçon « La membrane tendue »." },
      bille: { prompt: "Sur un calculateur à feuille de caoutchouc, pourquoi une bille d'acier lâchée sans vitesse reproduit-elle la trajectoire d'un électron émis sans vitesse, 10²⁷ fois plus léger ?",
        options: { a: "Parce que la bille et l'électron ont la même charge massique.", b: "Parce que, parti du repos, un mobile soumis à une force proportionnelle à un gradient suit un chemin qui ne dépend que de la forme du potentiel ; l'échelle de la force ne change que la durée.", c: "Parce que la feuille est électrisée.", d: "Elle ne la reproduit pas : seules les durées sont reproduites." },
        hint: "Que change le facteur 5/7 de la bille qui roule ?",
        why: "d²r/dt² = \u2212k∇u : changer k revient à changer l'unité de temps. La forme de la feuille, proportionnelle à \u2212φ, fait le reste. Leçon « La membrane tendue »." },
      sphere: { prompt: "Dans du graphite (D = 20\u00a0m²·s⁻¹ pour des neutrons thermiques), une sphère de 20\u00a0cm de rayon produit uniformément 10¹² neutrons par m³ et par seconde. Absorption négligée, la densité au centre est d'environ :",
        options: { a: "6,7 × 10⁸\u00a0m⁻³, la même partout dans la sphère.", b: "2 × 10⁹\u00a0m⁻³.", c: "1,0 × 10⁹\u00a0m⁻³, une fois et demie la densité au bord.", d: "4 × 10¹⁰\u00a0m⁻³." },
        hint: "(12.27) en r = 0 : Sa²/(2D).",
        why: "10¹² × 0,04/40 = 10⁹\u00a0m⁻³ ; au bord, Sa²/(3D) ≈ 6,7 × 10⁸\u00a0m⁻³. Une production uniforme ne donne pas une densité uniforme : les neutrons du centre mettent plus longtemps à sortir. Leçon « Diffusion des neutrons »." },
      fick: { prompt: "On simule des neutrons nés dans une sphère d'un demi-libre parcours de rayon. Leur densité au centre dépasse nettement (12.27). Pourquoi ?",
        options: { a: "Parce que la simulation néglige l'absorption.", b: "Parce que le graphite est anisotrope.", c: "Parce que la statistique est insuffisante.", d: "Parce que la loi de Fick suppose une densité qui varie peu sur un libre parcours, faux ici : la diffusion demande a ≫ l." },
        hint: "Que suppose J = \u2212D∇N ?",
        why: "Fick est une moyenne sur de nombreux vols ; dans une source plus petite qu'un vol, elle n'a pas de sens. Pour a = 6l, la simulation rejoint la diffusion à 1\u00a0% près. Leçon « Diffusion des neutrons »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

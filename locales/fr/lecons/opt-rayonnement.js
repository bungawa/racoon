/* Leçon « Le rayonnement » (Feynman I.28.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/opt-rayonnement.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le rayonnement",
    "crumb.jour": "Le rayonnement",
    "h1": "Le rayonnement",
    "lede": "Loin d'une charge, un seul terme de son champ survit, et il se lit comme un dessin : on regarde la charge, on reporte sa position apparente sur un écran, et l'accélération de ce point sur l'écran donne le champ électrique.",
    "tag.piste": "Optique",
    "tag.prereq": "Prérequis : l’électromagnétisme et la lumière",

    "s1.sec": "Le terme en 1/r",
    "s1.h2": "Ce qui reste loin de la charge",
    "s1.p1": "Des trois termes de (28.3), le premier, le champ de Coulomb retardé, décroît comme 1/<var>r</var><sup>2</sup>. Le deuxième n'est qu'une correction de retard, et décroît de même. Tous les effets qui portent loin viennent du troisième, la dérivée seconde du vecteur unitaire <var>e</var><sub><var>r</var>′</sub> qui pointe vers la position apparente de la charge :",
    "val.28.5": "Exacte pour la partie du champ qui décroît comme 1/<var>r</var>, à toute vitesse inférieure à <var>c</var> : les effets de la relativité y sont inclus. Négligé : les deux premiers termes de (28.3), plus petits d'un facteur λ/(2π<var>r</var>) et de son carré pour un mouvement périodique de longueur d'onde λ, soit 1,6 % et 0,03 % à dix longueurs d'onde ; et la partie radiale de la dérivée seconde, elle aussi en 1/<var>r</var><sup>2</sup>.",

    "s2.sec": "La règle du peintre",
    "s2.h2": "Projeter le mouvement sur un écran",
    "s2.p1": "Imaginons la charge allumée, comme un petit point blanc qu'on regarde de loin. On ne la voit pas où elle est, mais où elle était quand la lumière qui arrive est partie : <var>e</var><sub><var>r</var>′</sub> pointe vers cette position apparente. Quand la charge bouge, l'extrémité de <var>e</var><sub><var>r</var>′</sub> se promène sur une sphère de rayon 1. Son accélération a deux parties : une transversale, quand l'extrémité monte et descend, et une radiale, parce qu'elle doit rester sur la sphère. Si l'on éloigne la source, les déplacements apparents de <var>e</var><sub><var>r</var>′</sub> diminuent comme 1/<var>r</var>, et la partie radiale, qui dépend de leur carré, comme 1/<var>r</var><sup>2</sup> : elle ne compte plus.",
    "s2.p2": "D'où la règle : un peintre placé loin de la charge peint ce qu'il voit, avec le retard dû au trajet de la lumière, sur une toile à une unité de distance. La charge y est un point qui bouge. L'accélération de ce point sur la toile, au signe près, est proportionnelle au champ électrique. Il ne faut rien d'autre.",

    "s3.sec": "Petits mouvements lents",
    "s3.h2": "Un retard constant",
    "s3.p1": "Le plus souvent, les charges ne bougent que de peu, et lentement. Elles restent alors à une distance presque constante <var>r</var>, et le retard reste presque égal à <var>r</var>/<var>c</var>. Si la charge s'écarte de <var>x</var>(<var>t</var>) perpendiculairement à la ligne de visée, la direction <var>e</var><sub><var>r</var>′</sub> tourne de l'angle <var>x</var>/<var>r</var>, et sa dérivée seconde est l'accélération de <var>x</var>, prise plus tôt, divisée par <var>r</var> :",
    "val.28.6": "Approximation : mouvement lent et petit. La vitesse <var>v</var> de la charge fait varier le retard pendant le mouvement : l'erreur sur le champ est de l'ordre de 2<var>v</var>/<var>c</var>, 2 % à <var>v</var> = 0,01 <var>c</var> (figure ci-dessous) ; le déplacement doit rester petit devant <var>r</var>, et <var>r</var> grand devant λ/2π pour que les termes en 1/<var>r</var><sup>2</sup> soient négligeables. <var>a</var><sub><var>x</var></sub> est la composante perpendiculaire à la ligne de visée.",
    "s3.p2": "Seule compte la composante de l'accélération perpendiculaire à la ligne de visée. Une charge qui vient droit vers l'observateur, ou s'en éloigne, ne change pas la direction de <var>e</var><sub><var>r</var>′</sub> : elle ne rayonne rien dans cette direction. Le signe moins dit qu'une charge positive accélérée vers le haut crée, au loin, un champ dirigé vers le bas. Le champ est proportionnel à l'accélération, non à la vitesse : une charge en mouvement uniforme ne rayonne pas.",

    "s4.sec": "Quand la charge va vite",
    "s4.h2": "Le peintre voit un mouvement déformé",
    "s4.p1": "Le système : une charge parcourt à vitesse constante <var>v</var> = β<var>c</var> un cercle de rayon <var>R</var>, observée de très loin, dans le plan du cercle. (28.6) prend son accélération réelle, centripète, avec un retard constant. (28.5) prend la position apparente, calculée avec le retard exact de chaque instant, et la dérive deux fois. En haut, la position sur l'écran du peintre ; en bas, le champ fois la distance, en unités de l'amplitude que donne (28.6).",
    "fig.aria.ecran": "Position apparente de la charge sur l'écran du peintre, comparée à sa position réelle, en fonction du temps",
    "fig.aria.champ": "Champ rayonné selon (28.5) et selon (28.6) en fonction du temps",
    "fig.legend.exact": "(28.5) : position apparente, retard exact",
    "fig.legend.approche": "(28.6) : retard constant",
    "fig.beta": "Vitesse de la charge β = v/c",
    "fig.taxis": "temps de l'observateur (périodes)",
    "fig.yecran": "position / R",
    "fig.ychamp": "r E (unité : (28.6))",
    "fig.k.pic": "Pic du champ, en unités de (28.6)",
    "fig.f.pic": "forme fermée 1/(1 \u2212 β)² : {v}",
    "fig.k.ecart": "Plus grand écart entre (28.5) et (28.6)",
    "fig.f.ecart": "forme fermée 1/(1 \u2212 β)² \u2212 1, soit 2β quand β ≪ 1 : {v}",
    "fig.caption": "À faible vitesse, les deux courbes se confondent : la position apparente est la position vraie, décalée d'un retard constant. Quand β grandit, la charge qui vient vers l'observateur rattrape en partie sa propre lumière : la position apparente passe vite d'un côté à l'autre, et le champ forme un pic étroit, 1/(1 \u2212 β)<sup>2</sup> fois plus haut que ne le dit (28.6).",
    "s4.p2": "À β = 0,01, l'écart reste de 2 % : c'est le domaine de (28.6). À β = 0,5, le pic est quatre fois plus haut ; à β = 0,9, cent fois. (28.5) reste exacte, mais il faut suivre la position apparente pas à pas : la suite est dans « Le rayonnement synchrotron ». Le nombre qui décide est <var>v</var>/<var>c</var>, et non la vitesse seule.",
    "sys.title": "Le système décrit : les électrons d'une antenne",
    "sys1.body": "Un fil de cuivre de 2\u00a0mm de diamètre porte un courant d'amplitude 1\u00a0A à 100\u00a0MHz. Le cuivre a {n} électrons libres par mètre cube. À cette fréquence, l'effet de peau confine le courant dans une couche de {d} sous la surface ; la vitesse d'ensemble des électrons y est de l'ordre de {v}, soit <var>v</var>/<var>c</var> = {b}, et ils s'écartent de {x} autour de leur position moyenne. L'erreur de (28.6) due à la variation du retard est donc de l'ordre de 10<sup>\u221211</sup>, et le déplacement est infime devant toute distance d'observation. Pour une antenne, seule compte la condition <var>r</var> ≫ λ/2π.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Le champ d'une charge accélérée",
    "hist.intro": "À la fin du XIX<sup>e</sup> siècle, l'électron devient une particule réelle, et la question devient précise : que rayonne une charge ponctuelle accélérée ?",
    "hist.events": {
      rontgen: { who: "Wilhelm Conrad Röntgen", what: "découvre le 8 novembre un rayonnement pénétrant, émis là où les électrons d'un tube à décharge frappent la paroi ou l'anode.", context: "Il les nomme rayons X. On comprendra qu'ils viennent en partie du freinage brutal des électrons dans la matière : une très forte accélération, donc un fort rayonnement." },
      larmor: { who: "Joseph Larmor", what: "publie dans le Philosophical Magazine la puissance rayonnée par un ion accéléré.", context: "Sa formule, valable pour une charge lente, donne une puissance proportionnelle au carré de la charge et au carré de l'accélération : c'est la conséquence énergétique du champ (28.6)." },
      lienard: { who: "Alfred-Marie Liénard", what: "publie dans L'Éclairage électrique les potentiels d'une charge en mouvement quelconque.", context: "Il étend le résultat de Larmor à toutes les vitesses : le champ qu'on en tire est celui de (28.3) et de (28.5), relativité comprise, avant même la relativité restreinte." },
      wiechert: { who: "Emil Wiechert", what: "obtient indépendamment les mêmes potentiels retardés, dans les Archives néerlandaises.", context: "Ils portent depuis les deux noms : potentiels de Liénard et Wiechert." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      tube: { name: "Tubes à rayons X", text: "Dans un tube de radiologie, des électrons accélérés sous plusieurs dizaines de kilovolts s'arrêtent dans l'anode sur une très courte distance. Cette décélération énorme rayonne, en rayons X : c'est (28.5) appliquée à un freinage. L'essentiel de leur énergie part pourtant en chaleur, d'où les anodes tournantes et refroidies." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      visee: { prompt: "Une charge lointaine accélère en venant droit vers vous. Que vaut le champ qu'elle rayonne vers vous ?",
        options: { a: "Il est maximal, puisque toute l'accélération est vers vous.", b: "Il est nul : la direction apparente de la charge ne change pas.", c: "Il est réduit de moitié.", d: "Il est dirigé vers la charge." },
        hint: "Que voit le peintre sur sa toile ?",
        why: "Seule compte l'accélération perpendiculaire à la ligne de visée. Sur la toile du peintre, une charge qui vient droit vers lui reste au même point : l'accélération apparente est nulle." },
      radial: { prompt: "Pourquoi néglige-t-on la partie radiale de la dérivée seconde de e_r′ ?",
        options: { a: "Parce qu'elle est toujours nulle.", b: "Parce qu'elle est dirigée vers la charge et ne fait pas bouger les électrons.", c: "Parce qu'elle ne dépend pas du temps.", d: "Parce qu'elle dépend du carré des déplacements apparents, donc décroît comme 1/r² quand la partie transversale décroît comme 1/r." },
        why: "L'extrémité de e_r′ reste sur une sphère de rayon 1 ; la composante radiale de son accélération est d'ordre (déplacement apparent)², soit 1/r² : négligeable loin de la source." },
      retard: { prompt: "Quand peut-on prendre le retard constant, égal à r/c, comme dans (28.6) ?",
        options: { a: "Quand la charge bouge peu et lentement : son déplacement petit devant r, sa vitesse petite devant c.", b: "Toujours : le retard ne dépend que de la distance moyenne.", c: "Seulement si la charge est immobile.", d: "Seulement si l'observateur est dans l'axe du mouvement." },
        why: "Si la charge se déplace de x le long de la ligne de visée, le retard change de x/c. Pour un mouvement lent, cette variation modifie le champ d'une fraction de l'ordre de v/c." },
      signe: { prompt: "Un électron (charge négative), loin de vous, accélère vers le haut. Vers où pointe le champ électrique qu'il rayonne jusqu'à vous ?",
        options: { a: "Vers le bas.", b: "Vers l'électron.", c: "Vers le haut.", d: "Vers vous." },
        hint: "Le champ vaut \u2212q a_x/(4πε₀c²r), avec q < 0.",
        why: "Pour une charge positive, le champ est opposé à l'accélération transversale. L'électron a q < 0 : le champ est dans le sens de l'accélération, vers le haut, perpendiculaire à la ligne de visée." },
      vitesse: { prompt: "Une charge parcourt un cercle à v = 0,1\u00a0c, vue de loin dans le plan du cercle. Que dit la figure de l'erreur de (28.6) ?",
        options: { a: "Aucune : (28.6) est exacte pour un mouvement circulaire uniforme.", b: "Environ 23 % : le pic réel est 1/(1 \u2212 0,1)² ≈ 1,23 fois celui de (28.6).", c: "Environ 1 %, comme (v/c)².", d: "Le champ réel est dix fois plus grand." },
        why: "L'erreur est du premier ordre en v/c, et non du second : le retard varie pendant le mouvement. À β = 0,1, le pic est 1,23 fois plus haut. (28.5) donne le bon champ à toute vitesse." },
      distance: { prompt: "On double la distance à une antenne. Que deviennent l'amplitude du champ rayonné et l'instant où arrive un même signal ?",
        options: { a: "L'amplitude est divisée par 2 ; le signal arrive r/c plus tard.", b: "L'amplitude est divisée par 4 ; le signal arrive au même instant.", c: "L'amplitude est inchangée ; le signal arrive deux fois plus tard.", d: "L'amplitude est divisée par 2 ; le signal arrive au même instant." },
        why: "(28.6) : E est en 1/r, et dépend de l'accélération à t \u2212 r/c. En passant de r à 2r, le signal parcourt r de plus, et arrive r/c plus tard." },
      peintre: { prompt: "Une charge se déplace à vitesse constante, en ligne droite, loin de vous. Que voit le peintre, et que rayonne-t-elle ?",
        options: { a: "Un point qui accélère, donc un rayonnement.", b: "Un point fixe, donc aucun champ.", c: "Un point qui oscille, donc un rayonnement périodique.", d: "Un point dont l'accélération apparente décroît en 1/r², sans terme en 1/r : pas de rayonnement." },
        why: "Une charge uniforme a un champ qui l'accompagne, mais pas de rayonnement : l'accélération apparente qu'on lui trouve vient seulement de la variation lente de l'angle de visée, et décroît comme 1/r²." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. I, chap. 28, §28-2 (texte original en anglais). Notations SI. Röntgen : Musée national de la santé et de la médecine (National Museum of Health and Medicine), « Discovery of the X-ray ». Larmor : <i>Philosophical Magazine</i>, 5<sup>e</sup> série, vol. 44 (1897), p. 503-512. Liénard et Wiechert : <i>L'Éclairage électrique</i>, vol. 16 (1898) ; <i>Archives néerlandaises des sciences exactes et naturelles</i>, vol. 5 (1900), p. 549, cités par Seara da Ciência, Université fédérale du Ceará. Tubes à rayons X : School Physics, « X-rays ». Charge sur un cercle, antenne de cuivre et calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les électrons et les trous dans les semi-conducteurs » (Feynman III.14.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/electrons-et-trous.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les électrons et les trous dans les semi-conducteurs",
    "crumb.jour": "Électrons et trous",
    "h1": "Les électrons et les trous dans les semi-conducteurs",
    "lede": "Dans le silicium pur, chaque électron est pris dans une liaison entre deux atomes : la bande est pleine, rien ne conduit. L'agitation thermique en libère pourtant quelques-uns, et chacun laisse un trou derrière lui. Combien ? Un facteur de Boltzmann en décide, et il varie énormément avec la température.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'étape « Imperfections d'un réseau »",
    "eq.min": "min",
    "eq.cte": "constante",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Une bande pleine, une bande vide",
    "s1.p1": "Le silicium et le germanium cristallisent comme le diamant : chaque atome a quatre voisins, et ses quatre électrons de valence forment une liaison avec chacun. Ces électrons remplissent exactement une bande, la bande de valence ; une bande pleine ne porte pas de courant. Il faut une énergie <var>E</var><sub>g</sub>, la bande interdite, pour arracher un électron et le mettre dans la bande vide au-dessus, la bande de conduction. Là, il est libre de se propager comme dans la leçon « Un électron dans un réseau à trois dimensions » ; près du bas de bande, et si la masse est la même dans toutes les directions :",
    "val.14.3": "Approximation : bas de la bande, comme (13.26), avec une masse effective isotrope ℏ<sup>2</sup>/2α. Dans le silicium réel, le bas de bande n'est pas en <var>k</var> = 0 et la masse dépend de la direction ; on remplace alors α par une moyenne, ce qui suffit pour compter les états.",
    "s1.p2": "L'électron arraché laisse une liaison incomplète : un trou. Un électron voisin peut le combler et en laisser un chez lui ; le trou se déplace, comme dans la leçon « Les autres états d'un réseau », et se comporte comme une charge positive. Un électron et un trou peuvent se rencontrer : l'électron retombe dans le trou et les deux disparaissent en rendant l'énergie <var>E</var><sub>g</sub>, en lumière ou en chaleur.",

    "s2.sec": "2 · Combien de porteurs",
    "s2.h2": "Une loi d'action de masse",
    "s2.p1": "Les paires se créent par l'agitation thermique et disparaissent quand un électron rencontre un trou. Le taux de rencontre est proportionnel au produit des densités ; le taux de création ne dépend que de la température. À l'équilibre thermique, le produit des densités d'électrons et de trous suit le facteur de Boltzmann de la bande interdite :",
    "val.14.4": "Approximation : équilibre thermique, densités assez faibles pour que les électrons suivent la loi de Boltzmann et non celle de Fermi, c'est-à-dire bandes loin d'être remplies (semi-conducteur non dégénéré) ; la constante varie lentement avec <var>T</var>, comme <var>T</var><sup>3</sup>. Le produit ne dépend pas de la façon dont les porteurs sont venus : il reste vrai avec des impuretés, ce qui sert dans la leçon « Les semi-conducteurs dopés ».",
    "s2.p2": "Dans un cristal pur, il y a autant d'électrons que de trous, <var>N</var><sub><var>n</var></sub> = <var>N</var><sub><var>p</var></sub> = <var>n</var><sub>i</sub>, la densité intrinsèque. La constante se calcule en comptant les états des bas de bande ; on l'écrit avec les densités effectives d'états <var>N</var><sub>c</sub> et <var>N</var><sub>v</sub>, données à 300\u00a0K :",
    "val.14.4a": "Approximation : celle de (14.4), et <var>E</var><sub>g</sub> pris constant, alors qu'il diminue de quelques pour cent quand <var>T</var> monte de 0 à 300\u00a0K. Avec les valeurs usuelles de <var>N</var><sub>c</sub>, <var>N</var><sub>v</sub> et <var>E</var><sub>g</sub>, elle donne à 300\u00a0K 6,7 × 10¹⁵\u00a0m⁻³ pour le silicium (mesuré : 9,65 × 10¹⁵\u00a0m⁻³, soit 30\u00a0% de moins) et 2,3 × 10¹⁹\u00a0m⁻³ pour le germanium (mesuré : 2,0 × 10¹⁹\u00a0m⁻³, soit 15\u00a0% de plus). Le facteur exponentiel, lui, décide de tout : entre 150\u00a0K et 700\u00a0K, il multiplie la densité intrinsèque du silicium par 10<sup>15</sup> environ, et le produit (14.4) par 10<sup>30</sup>.",
    "fig.aria": "Densité intrinsèque de porteurs du germanium, du silicium et de l'arséniure de gallium en fonction de la température",
    "fig.legend.ge": "germanium, E_g = 0,66 eV",
    "fig.legend.si": "silicium, 1,12 eV",
    "fig.legend.gaas": "arséniure de gallium, 1,43 eV",
    "fig.xaxis": "température (K)",
    "fig.yaxis": "nᵢ (m⁻³)",
    "fig.t": "Température, T",
    "fig.k.ge": "Germanium, nᵢ",
    "fig.k.si": "Silicium, nᵢ",
    "fig.k.gaas": "Arséniure de gallium, nᵢ",
    "fig.f.n": "E_g = {eg} ; un électron libre pour {r} atomes",
    "fig.caption": "Échelle logarithmique : chaque graduation est un facteur 10<sup>4</sup>. La pente est fixée par <var>E</var><sub>g</sub> : plus la bande interdite est large, plus la densité est faible et plus elle dépend de la température. Sous 150\u00a0K, le silicium pur est un isolant.",

    "s3.sec": "Décrire le système",
    "s3.h2": "La bande interdite face à <var>k</var><sub>B</sub><var>T</var>",
    "s3.p1": "Un seul nombre sans dimension règle tout : <var>E</var><sub>g</sub>/<var>k</var><sub>B</sub><var>T</var>. Comparé au nombre d'atomes, il dit si le cristal pur conduit.",
    "sys.title": "Le système décrit : un cristal de silicium pur",
    "sys1.body": "À 300\u00a0K, <var>k</var><sub>B</sub><var>T</var> ≈ {kT}, soit environ 1/40\u00a0eV, et <var>E</var><sub>g</sub>/<var>k</var><sub>B</sub><var>T</var> ≈ {r}. Le facteur de Boltzmann e<sup>\u2212<var>E</var><sub>g</sub>/2<var>k</var><sub>B</sub><var>T</var></sup> vaut environ 10<sup>\u221210</sup>.",
    "sys2.body": "À 30\u00a0K, (14.4a) donne {n}\u00a0m⁻³ : moins d'un porteur dans tout le volume de la Terre. La conduction du cristal pur est imperceptible.",
    "sys3.body": "À 300\u00a0K, (14.4a) donne {n}\u00a0m⁻³ (mesuré : 9,65 × 10¹⁵\u00a0m⁻³), pour 5 × 10²⁸ atomes par mètre cube : une paire pour quelques 10¹² atomes. Une impureté sur un milliard d'atomes fournit déjà mille fois plus de porteurs.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Entre conducteurs et isolants",
    "hist.intro": "Les semi-conducteurs ont longtemps été des matériaux mal compris, aux propriétés changeantes d'un échantillon à l'autre.",
    "hist.events": {
      halbleiter: { who: "Le mot « Halbleiter »", what: "semi-conducteur, entre dans l'usage, en allemand, pour les matériaux dont la conductivité se situe entre celles des conducteurs et des isolants.", context: "Josef Weiss l'emploie dès 1910 dans sa thèse. Le comportement de ces matériaux reste alors inexpliqué." },
      wilson: { who: "Alan Wilson", what: "explique par la théorie des bandes la différence entre métaux, isolants et semi-conducteurs.", context: "Proceedings of the Royal Society A, vol. 133 et 134. Il attribue les propriétés des semi-conducteurs aux impuretés d'un cristal par ailleurs pur." },
      dresselhaus: { who: "Gene Dresselhaus, Arthur Kip et Charles Kittel", what: "mesurent par résonance cyclotron les masses effectives des électrons et des trous du silicium et du germanium.", context: "Physical Review, vol. 98 : les trous se comportent bien comme des particules de charge positive, avec leur propre masse." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      silicium: { name: "Le silicium des puces", text: "Le silicium pur a si peu de porteurs à 300\u00a0K, environ 10¹⁶\u00a0m⁻³, qu'il est presque isolant. Toute l'électronique repose sur des cristaux d'une pureté extrême, dans lesquels on ajoute ensuite, à dessein et en quantités contrôlées, des impuretés qui fixent le nombre de porteurs." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      trou: { prompt: "Qu'est-ce qu'un trou dans un semi-conducteur ?",
        options: { a: "Un atome manquant dans le cristal.", b: "Une liaison à laquelle il manque un électron, qui se déplace quand un voisin la comble, et se comporte comme une charge positive.", c: "Un positron.", d: "Un défaut de surface." },
        why: "Le manque d'électron se propage d'atome en atome avec ses états en bande et sa masse effective. Sa charge apparente est +e." },
      paire: { prompt: "Un photon crée une paire électron-trou dans le silicium. Quelle énergie minimale doit-il avoir ?",
        options: { a: "Aucune : une paire se crée gratuitement.", b: "L'énergie d'ionisation d'un atome de silicium isolé, plus de 8 eV.", c: "k_BT.", d: "La bande interdite, environ 1,1 eV." },
        why: "Créer une paire, c'est faire passer un électron de la bande de valence pleine à la bande de conduction vide : au moins E_g." },
      produit: { prompt: "Pourquoi le produit N_n N_p ne dépend-il que de la température, et pas des impuretés ?",
        options: { a: "Parce que les paires se créent à un taux fixé par T, et disparaissent à un taux proportionnel à N_n N_p : à l'équilibre, le produit est fixé.", b: "Parce que les impuretés ne fournissent pas de porteurs.", c: "Parce que N_n = N_p toujours.", d: "Parce que le cristal est neutre." },
        why: "Création = recombinaison à l'équilibre : constante(T) = r N_n N_p. Des impuretés changent N_n et N_p séparément, pas leur produit." },
      gap: { prompt: "Le germanium a une bande interdite de 0,66 eV, le silicium de 1,12 eV. À 300 K, combien de fois plus de porteurs intrinsèques le germanium a-t-il, en ordre de grandeur ?",
        options: { a: "1,7 fois, le rapport des bandes interdites.", b: "Autant.", c: "Quelques milliers : e^(0,46 eV/(2 × 0,026 eV)) ≈ 7 × 10³.", d: "10³⁰ fois." },
        hint: "Seule l'exponentielle compte en ordre de grandeur.",
        why: "e^(\u2212E_g/2k_BT) : la différence de 0,46 eV vaut 8,9 fois 2k_BT, soit un facteur e^8,9 ≈ 7 × 10³. Les mesures donnent 2,0 × 10¹⁹ contre 9,65 × 10¹⁵ m⁻³, un rapport de 2 × 10³ : les densités d'états, plus petites pour le germanium, comptent aussi." },
      froid: { prompt: "Que devient la conductivité du silicium pur quand on le refroidit de 300 K à 30 K ?",
        options: { a: "Elle augmente, comme celle d'un métal.", b: "Elle s'effondre : il n'y a pratiquement plus de porteurs.", c: "Elle ne change pas.", d: "Elle devient infinie." },
        why: "e^(\u2212E_g/2k_BT) à 30 K vaut environ 10⁻⁹⁴ : plus aucun porteur. Un métal, au contraire, conduit mieux à froid." },
      equilibre: { prompt: "On éclaire un cristal pur : il y a plus de paires que ne le prévoit (14.4). Pourquoi la loi ne s'applique-t-elle plus ?",
        options: { a: "Parce que (14.4) suppose l'équilibre thermique ; la lumière crée des paires en plus du taux thermique.", b: "Parce que la lumière change la bande interdite.", c: "Parce que les trous disparaissent.", d: "Elle s'applique toujours." },
        why: "Le produit fixé vient de l'égalité entre création thermique et recombinaison. Une source de paires de plus déplace l'équilibre ; quand on éteint, le produit revient à sa valeur." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 14, §14-1 (texte original en anglais). Notations SI. Valeurs à 300\u00a0K (bande interdite, densités effectives d'états) : tables usuelles des propriétés du germanium, du silicium et de l'arséniure de gallium. Bande interdite du germanium, 0,66\u00a0eV, et sa densité intrinsèque mesurée : Institut Ioffe, base de données des semi-conducteurs. Densité intrinsèque mesurée du silicium : Altermatt, Schenk, Geelhaar et Heiser, Journal of Applied Physics 93, 1598 (2003). Wilson, Proceedings of the Royal Society A 133, 458 (1931) ; Dresselhaus, Kip et Kittel, Physical Review 98, 368 (1955). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

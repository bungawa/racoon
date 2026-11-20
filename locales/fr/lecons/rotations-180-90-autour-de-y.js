/* Leçon « Les rotations de 180° et de 90° autour de y » (Feynman III.6.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/rotations-180-90-autour-de-y.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les rotations de 180° et de 90° autour de y",
    "crumb.jour": "Demi-tour et quart de tour",
    "h1": "Les rotations de 180° et de 90° autour de y",
    "lede": "Retourner un appareil échange ses deux voies. Le faire deux fois revient à un tour complet, donc à un signe moins. Deux quarts de tour font un demi-tour. Ces trois remarques suffisent à trouver les amplitudes, sans mesurer quoi que ce soit.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les rotations autour de l'axe z",

    "s1.sec": "Décrire le système",
    "s1.h2": "Le demi-tour",
    "s1.p1": "L'appareil <var>T</var> est <var>S</var> retourné : tourné de 180° autour de l'axe <var>y</var> du jet. Son champ pointe vers \u2212<var>z</var>. Une particule qui monte dans <var>S</var> descend dans <var>T</var> : la voie +<var>T</var> est la voie \u2212<var>S</var>, et inversement. Les modules s'échangent, les phases sont à trouver :",
    "val.6.20": "Exacte pour des appareils idéaux, si l'espace est isotrope : le demi-tour ne fait qu'échanger les rôles des deux voies. β et γ sont deux phases encore inconnues ; elles peuvent dépendre de l'axe du demi-tour, pris ici dans le plan perpendiculaire à <var>z</var>.",
    "s1.p2": "Deux demi-tours autour de <var>y</var> font un tour complet. D'après « Les rotations autour de l'axe z », un tour complet multiplie les deux amplitudes par \u22121, dans la forme standard. Appliquer (6.20) deux fois donne C″<sub>\u2212</sub> = e<sup><var>i</var>γ</sup>e<sup><var>i</var>β</sup> C<sub>\u2212</sub>, d'où e<sup><var>i</var>(β+γ)</sup> = \u22121 :",
    "val.6.22": "Exacte, au signe commun près de la forme standard. Il reste une seule phase libre, β, qui dépend de l'axe du demi-tour dans le plan <var>x</var><var>y</var> : un demi-tour autour d'un axe tourné d'un angle α autour de <var>z</var> a pour phase β \u2212 α.",
    "s1.p3": "On choisit l'axe <var>y</var> pour que β soit nul. C'est une convention, la même que celle qui fixe les axes <var>x</var> et <var>y</var> eux-mêmes :",
    "val.6.27": "Exacte, dans la forme standard, avec la convention β = 0 pour l'axe <var>y</var>. Une autre convention ferait tourner les axes <var>x</var> et <var>y</var> d'un angle fixe autour de <var>z</var>, sans rien changer de physique.",

    "s2.sec": "Le quart de tour",
    "s2.h2": "Deux quarts de tour font un demi-tour",
    "s2.p1": "Pour un quart de tour autour de <var>y</var>, rien ne dit d'avance quels états s'échangent. On écrit la transformation la plus générale, avec quatre nombres inconnus :",
    "val.6.28": "Exacte : c'est la forme la plus générale d'une matrice 2 × 2. Les quatre nombres <var>a</var>, <var>b</var>, <var>c</var>, <var>d</var> sont complexes a priori ; la condition qui suit les fixe.",
    "s2.p2": "Appliquée deux fois, elle doit redonner (6.27). Cela donne quatre équations : <var>a</var><var>b</var> + <var>b</var><var>d</var> = 1, <var>a</var><sup>2</sup> + <var>b</var><var>c</var> = 0, <var>a</var><var>c</var> + <var>c</var><var>d</var> = \u22121, <var>b</var><var>c</var> + <var>d</var><sup>2</sup> = 0. On en tire <var>a</var> = <var>d</var>, <var>b</var> = 1/(2<var>a</var>), <var>c</var> = \u2212<var>b</var>, puis <var>a</var><sup>4</sup> = 1/4. Le déterminant égal à 1 de la forme standard exclut <var>a</var><sup>2</sup> = \u22121/2 et impose <var>a</var><sup>2</sup> = 1/2 ; le signe qui tend vers l'identité quand l'angle tend vers zéro donne :",
    "val.6.32": "Exacte, dans la forme standard et avec la convention de l'axe <var>y</var>. L'autre solution, de signes opposés, est la rotation de \u2212270°, qui fait aussi un demi-tour quand on la répète. Le quart de tour dans l'autre sens, \u221290°, s'obtient en changeant le signe de <var>b</var> et <var>c</var>.",
    "s2.p3": "À ce stade, on connaît les rotations autour de <var>z</var> d'un angle quelconque, et autour de <var>y</var> de 90° et de 180°. « Les rotations autour de x » combine les deux. La formule pour un angle quelconque autour de <var>y</var>, C′<sub>+</sub> = cos(φ/2) C<sub>+</sub> + sin(φ/2) C<sub>\u2212</sub>, C′<sub>\u2212</sub> = \u2212sin(φ/2) C<sub>+</sub> + cos(φ/2) C<sub>\u2212</sub>, redonne (6.32) à 90° et (6.27) à 180°.",

    "s3.sec": "Les nombres",
    "s3.h2": "L'état +S vu par un appareil qu'on tourne",
    "s3.p1": "La particule est dans l'état +<var>S</var>. On tourne <var>T</var> d'un angle φ autour de <var>y</var>. Les courbes donnent ses deux amplitudes dans la base de <var>T</var>, et la probabilité de passer +<var>T</var>. La dernière ligne refait le calcul en deux rotations de φ/2.",
    "fig.aria.courbes": "Amplitudes C′₊ et C′₋ de l'état +S et probabilité de +T, en fonction de l'angle de T autour de y",
    "fig.legend.plus": "C′₊ = cos(φ/2)",
    "fig.legend.moins": "C′\u2212 = \u2212sin(φ/2)",
    "fig.legend.p": "probabilité de +T",
    "fig.phi": "T tourné autour de y, φ",
    "fig.ax.phi": "angle φ (°)",
    "fig.ax.c": "amplitude, probabilité",
    "fig.k.c": "C′<sub>+</sub> ; C′<sub>\u2212</sub>",
    "fig.k.p": "Probabilité de +<var>T</var>",
    "fig.f.p": "(1 + cos φ)/2 = {v}",
    "fig.k.deux": "Deux rotations de φ/2",
    "fig.f.deux": "le même résultat : les rotations autour d'un même axe s'ajoutent",
    "fig.caption": "À 90°, l'état +<var>S</var> a des amplitudes 1/√2 et \u22121/√2 : une chance sur deux pour chaque voie. À 180°, il est dans l'état \u2212<var>T</var>, à un signe près. À 360°, il est revenu, avec un signe moins ; à 720°, sans. La probabilité, elle, a une période de 360° : (1 + cos φ)/2, la projection moyenne du spin sur l'axe de <var>T</var>.",
    "s3.p2": "On retrouve ainsi, pour le spin 1/2, ce qu'on avait admis pour le spin 1 dans « Expériences avec des atomes filtrés » : une particule préparée selon <var>z</var> passe un appareil incliné de φ avec une probabilité qui ne dépend que de φ. Ici, cos<sup>2</sup>(φ/2).",
    "sys.title": "Le système décrit : l'état selon x",
    "sys1.body": "L'état (+<var>S</var> + \u2212<var>S</var>)/√2, vu par <var>T</var> tourné de 90° autour de <var>y</var>, a pour probabilités {p} : il passe tout entier par +<var>T</var>. L'axe <var>z</var>′ de <var>T</var> est alors l'axe <var>x</var> de <var>S</var> : cet état est le spin « vers le haut » selon <var>x</var>.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des demi-tours au service de la résonance magnétique",
    "hist.intro": "Faire tourner un spin de 90° ou de 180° est devenu un geste de laboratoire, puis le cœur de l'imagerie médicale.",
    "hist.events": {
      rabi: { who: "Isidor Rabi et ses collègues", what: "font basculer les moments magnétiques de noyaux dans un jet de molécules, entre deux aimants de Stern et Gerlach.", context: "« A New Method of Measuring Nuclear Magnetic Moment », Physical Review, vol. 53. Un champ oscillant à la bonne fréquence retourne les spins." },
      hahn: { who: "Erwin Hahn", what: "découvre l'écho de spin en résonance magnétique nucléaire, après deux impulsions de 90°.", context: "Les spins, déphasés par des champs un peu différents d'un endroit à l'autre, se remettent en phase et produisent un signal tardif : l'écho." },
      carr: { who: "Herman Carr et Edward Purcell", what: "montrent l'intérêt d'une seconde impulsion de 180° pour refocaliser les spins.", context: "La séquence 90° puis 180° est devenue l'écho de spin standard." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      irm: { name: "Séquences d'écho de spin en IRM", text: "Les séquences d'écho de spin rapide de l'IRM enchaînent une impulsion de 90° et une série d'impulsions de 180° de refocalisation. Chacune est une rotation de cette leçon, appliquée aux protons de l'eau." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      echange: { prompt: "Pourquoi un demi-tour autour de y échange-t-il les modules de C₊ et C₋ ?",
        options: { a: "Parce que les amplitudes sont réelles.", b: "Parce que l'appareil retourné a son champ vers \u2212z : sa voie + est la voie \u2212 de S.", c: "Parce que le déterminant vaut 1.", d: "Parce que le spin change de signe." },
        why: "Retourner l'appareil échange haut et bas : |C′₊| = |C₋|, |C′₋| = |C₊|. Seules les phases restent à trouver, (6.20)." },
      signe: { prompt: "D'où vient la condition e^i(β+γ) = \u22121 ?",
        options: { a: "De la normalisation des probabilités.", b: "D'une mesure.", c: "Du choix de l'axe y.", d: "De ce que deux demi-tours font un tour complet, qui multiplie les amplitudes par \u22121." },
        why: "Appliquer (6.20) deux fois donne e^iγe^iβ, qui doit valoir \u22121 d'après (6.18)." },
      deux: { prompt: "Une particule est dans l'état +S. Quelle est la probabilité qu'elle passe +T, T étant tourné de 90° autour de y ?",
        options: { a: "1/2.", b: "1.", c: "0.", d: "1/4." },
        why: "C′₊ = 1/√2 par (6.32), probabilité 1/2. En général, cos²(φ/2)." },
      quatre: { prompt: "Combien d'inconnues complexes faut-il trouver pour la matrice d'un quart de tour, avant d'imposer que deux quarts fassent un demi ?",
        options: { a: "Une.", b: "Deux.", c: "Quatre : a, b, c, d.", d: "Huit." },
        why: "(6.28) a quatre coefficients complexes ; la condition (6.27) donne quatre équations qui les fixent, au choix de signe près." },
      quart: { prompt: "Laquelle de ces matrices est celle du quart de tour (6.32) ?",
        options: { a: "[[1, 0], [0, 1]].", b: "[[1/√2, 1/√2], [\u22121/√2, 1/√2]].", c: "[[0, 1], [\u22121, 0]].", d: "[[1/√2, \u22121/√2], [\u22121/√2, 1/√2]]." },
        hint: "Son carré doit être [[0, 1], [\u22121, 0]], la matrice du demi-tour.",
        why: "Son carré donne bien (6.27) et son déterminant vaut 1. [[0, 1], [\u22121, 0]] est le demi-tour lui-même ; [[1/√2, \u22121/√2], [\u22121/√2, 1/√2]] a un déterminant nul." },
      proba: { prompt: "Pourquoi la probabilité de passer +T a-t-elle une période de 360°, alors que l'amplitude a une période de 720° ?",
        options: { a: "Parce qu'un tour complet ne change que le signe de l'amplitude, et que la probabilité est un carré.", b: "Parce que la probabilité est mal définie.", c: "Parce que l'appareil a deux voies.", d: "C'est faux, les deux ont la même période." },
        why: "cos(φ/2) change de signe à 360°, cos²(φ/2) non. Le signe ne se voit que par interférence." },
      convention: { prompt: "Pourquoi peut-on choisir β = 0 pour le demi-tour autour de y ?",
        options: { a: "Parce que β est mesuré nul.", b: "Parce que β est nul pour tout axe de demi-tour.", c: "Parce que la forme standard l'impose.", d: "Parce que β dépend de l'axe du demi-tour dans le plan xy : choisir β = 0, c'est choisir où l'on met l'axe y." },
        why: "Un demi-tour autour d'un axe tourné de α a la phase β \u2212 α. Fixer β = 0 pour y revient à fixer l'origine des angles autour de z : une convention." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-4 (texte original en anglais). Notations SI. Rabi, Zacharias, Millman et Kusch, Physical Review, vol. 53 (1938) ; Hahn (1950) ; Carr et Purcell (1954). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

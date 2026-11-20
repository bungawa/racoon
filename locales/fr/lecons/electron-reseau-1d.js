/* Leçon « Les états d'un électron dans un réseau à une dimension » (Feynman III.13.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/electron-reseau-1d.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les états d'un électron dans un réseau à une dimension",
    "crumb.jour": "Réseau à une dimension",
    "h1": "Les états d'un électron dans un réseau à une dimension",
    "lede": "Dans un métal, les atomes se touchent presque. Un électron devrait heurter le premier venu et s'arrêter. Dans un cristal pur et froid, il traverse pourtant des millions d'atomes sans dévier. Pour le comprendre, on pose l'électron sur une chaîne d'atomes et on ne lui permet qu'une chose : sauter chez un voisin.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'étape « Photon, kaon neutre et N états »",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Une rangée de puits",
    "s1.p1": "On prend une rangée d'atomes identiques, régulièrement espacés de <var>b</var>, et un électron de plus. Chaque atome est un puits où l'électron peut se tenir. On appelle |<var>n</var>⟩ l'état « l'électron est sur l'atome <var>n</var> », avec <var>n</var> entier, de \u2212∞ à +∞. C'est un système à une infinité d'états de base, comme ceux de la leçon « La généralisation aux systèmes à N états ». Un état quelconque est une superposition :",
    "val.13.2": "Exacte : la décomposition d'un état sur une base. L'approximation est dans le choix de la base : un seul état par atome, l'état le plus bas de l'électron sur cet atome. Les états excités de chaque atome, d'autres puits, donnent d'autres bandes (leçon « Les autres états d'un réseau ») ; on les néglige tant que l'énergie en jeu reste bien inférieure à l'écart entre niveaux atomiques, quelques électronvolts.",
    "s1.p2": "<var>C</var><sub><var>n</var></sub> = ⟨<var>n</var>|φ⟩ est l'amplitude de trouver l'électron sur l'atome <var>n</var>. Les atomes sont supposés fixes : ce sont les puits, l'électron est le seul à bouger.",

    "s2.sec": "2 · Les équations",
    "s2.h2": "Sauter chez un voisin",
    "s2.p1": "Si l'électron ne pouvait pas quitter son atome, son énergie serait <var>E</var><sub>0</sub>, la même partout. Mais il peut traverser la barrière qui le sépare d'un voisin, par effet tunnel. On note i<var>A</var>/ℏ l'amplitude par unité de temps de passer sur l'atome voisin, à droite ou à gauche, comme pour la molécule d'ammoniac. Le changement de <var>C</var><sub><var>n</var></sub> vient alors de trois termes : rester, arriver de <var>n</var> + 1, arriver de <var>n</var> \u2212 1 :",
    "val.13.3": "Approximation : seuls les plus proches voisins sont couplés. L'amplitude de saut décroît comme le recouvrement des orbitales, en e<sup>\u2212<var>r</var>/<var>a</var></sup> pour des orbitales 1s de rayon <var>a</var> ; avec <var>b</var> = 0,3\u00a0nm et <var>a</var> = <var>a</var><sub>0</sub>, l'amplitude d'un saut de deux pas est environ 300 fois plus petite que celle d'un saut d'un pas. Négligés aussi : la vibration des atomes, les autres électrons, le spin, qui ne change pas l'histoire tant qu'aucun champ magnétique n'agit.",
    "s2.p2": "Il y a une équation par atome, une infinité en tout, chacune liant un atome à ses deux voisins. Le simulateur résout exactement ces équations pour 61 atomes refermés en anneau : on pose l'électron sur l'atome du milieu à <var>t</var> = 0, puis on le laisse aller.",
    "fig.aria": "Probabilité de trouver l'électron sur chaque atome d'une chaîne, à un instant donné",
    "fig.legend.p": "probabilité |C<sub>n</sub>|² sur l'atome n",
    "fig.legend.front": "front : 2At/ℏ atomes de part et d'autre",
    "fig.xaxis": "numéro de l'atome, compté depuis le départ",
    "fig.yaxis": "probabilité",
    "fig.t": "Temps écoulé, t",
    "fig.a": "Énergie de saut, A",
    "fig.k.ecart": "Écart type de la position",
    "fig.v.ecart": "{n} atomes",
    "fig.f.ecart": "{d} ; rapport à √2 At/ℏ : {r}",
    "fig.k.front": "Vitesse du front, 2Ab/ℏ",
    "fig.f.front": "avec b = 0,3 nm",
    "fig.k.saut": "Temps d'un saut, ℏ/A",
    "fig.f.saut": "au bout de ce temps, l'électron a quitté son atome",
    "fig.caption": "L'électron ne diffuse pas au hasard, de proche en proche : il s'étale d'un mouvement régulier. Son écart type croît comme <var>t</var>, et vaut exactement √2 <var>A</var><var>t</var>/ℏ atomes. Une marche au hasard donnerait un écart en √<var>t</var>. La probabilité est la plus grande près des deux fronts : ce sont deux ondes qui partent, l'une à gauche, l'autre à droite.",

    "s3.sec": "3 · Ce que disent les équations",
    "s3.h2": "Une onde, pas une bille",
    "s3.p1": "Classiquement, une bille qui saute au hasard d'un atome à l'autre s'éloignerait en √<var>t</var>, comme une goutte d'encre qui diffuse. Ici, les amplitudes des chemins qui mènent au même atome s'ajoutent avec leurs phases : l'électron se comporte comme une onde. Il s'étale en <var>t</var>, à vitesse constante. Les solutions où toutes les amplitudes tournent à la même fréquence, les états d'énergie définie, sont l'objet de la leçon « Les états d'énergie définie dans un réseau ».",
    "s3.p2": "Rien, dans (13.3), ne fait perdre son élan à l'électron : un réseau parfait ne le freine pas. La résistance d'un métal vient de ce qui rompt la régularité : atomes qui vibrent, atomes étrangers, défauts. C'est le sujet de l'étape « Imperfections d'un réseau ».",

    "s4.sec": "Décrire le système",
    "s4.h2": "Les nombres de la chaîne",
    "s4.p1": "Trois rapports disent ce que le modèle néglige : le temps de saut contre la durée d'observation, le saut de deux pas contre le saut d'un pas, la longueur de la chaîne contre le pas.",
    "sys.title": "Le système décrit : <var>A</var> = 1\u00a0eV, <var>b</var> = 0,3\u00a0nm",
    "sys1.body": "Un saut prend ℏ/<var>A</var> ≈ {tau} : en une femtoseconde, l'électron a déjà visité plusieurs atomes. Le front avance à 2<var>A</var><var>b</var>/ℏ ≈ {v}, l'ordre de grandeur de la vitesse des électrons de conduction d'un métal.",
    "sys2.body": "Pour des orbitales 1s de rayon <var>a</var><sub>0</sub>, le saut de deux pas est réduit par rapport au saut d'un pas d'un facteur e<sup>\u2212<var>b</var>/<var>a</var><sub>0</sub></sup> ≈ {r}. Ne garder que les voisins est une bonne approximation pour des orbitales serrées ; elle l'est moins pour les électrons très délocalisés d'un métal.",
    "sys3.body": "Un fil de 1\u00a0cm compte {n} atomes sur sa longueur : la chaîne infinie est un excellent modèle loin des bouts. L'anneau de 61 atomes du simulateur n'est juste que tant que le front n'en a pas fait le tour.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des équations à coefficients périodiques",
    "hist.intro": "Les mathématiques d'une onde dans un milieu périodique sont plus anciennes que la mécanique quantique.",
    "hist.events": {
      hill: { who: "George William Hill", what: "étudie le mouvement de la Lune avec une équation différentielle à coefficient périodique, et en fait circuler la solution.", context: "Le mémoire n'est publié qu'en 1886, dans Acta Mathematica. L'équation porte son nom." },
      floquet: { who: "Gaston Floquet", what: "publie la théorie des équations différentielles linéaires à coefficients périodiques.", context: "Dans les Annales scientifiques de l'École normale supérieure. Leurs solutions sont des fonctions périodiques multipliées par une exponentielle : le futur théorème de Bloch." },
      bloch: { who: "Felix Bloch", what: "publie la mécanique quantique des électrons dans les réseaux cristallins.", context: "Zeitschrift für Physik, vol. 52. Il y écrit l'état de l'électron comme une combinaison d'états atomiques, la méthode de cette leçon, et explique la conduction dans un réseau parfait." },
      slater: { who: "John Slater et George Koster", what: "donnent une méthode des liaisons fortes où les amplitudes de saut sont des paramètres ajustés aux mesures.", context: "Physical Review, vol. 94. Ils tabulent les amplitudes de saut entre orbitales s, p et d." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      materiaux: { name: "Le calcul des matériaux", text: "Le modèle des liaisons fortes, des électrons qui sautent d'atome en atome avec des amplitudes ajustées, sert à calculer la structure électronique de solides trop grands pour un calcul complet. Des logiciels en cherchent les paramètres, et des méthodes rapides de chimie quantique en dérivent." },
      polymeres: { name: "Les polymères conducteurs", text: "Dans les polymères conducteurs et les semi-conducteurs organiques, les « atomes » de la chaîne sont des molécules entières : le même modèle s'applique, avec des orbitales moléculaires à la place des orbitales atomiques." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      base: { prompt: "Que représente l'état de base |n⟩ dans ce modèle ?",
        options: { a: "Un électron d'énergie n fois E₀.", b: "Un électron dans le n-ième niveau excité d'un atome.", c: "L'électron dans l'état le plus bas de l'atome numéro n.", d: "Un électron qui a fait n sauts." },
        hint: "Il y a un état de base par atome.",
        why: "Un état de base par atome : l'électron posé sur l'atome n, dans l'état le plus bas de cet atome. Les niveaux excités sont négligés ici." },
      voisins: { prompt: "Pourquoi l'équation de C_n ne contient-elle que C_(n+1) et C_(n\u22121) ?",
        options: { a: "Parce qu'on néglige les sauts plus longs, beaucoup moins probables : l'effet tunnel décroît vite avec la distance.", b: "Parce que l'électron n'a pas assez d'énergie pour aller plus loin.", c: "Parce qu'un électron ne peut pas traverser un atome.", d: "Parce que la mécanique quantique interdit les sauts de deux pas." },
        why: "L'amplitude de saut suit le recouvrement des orbitales, qui décroît exponentiellement : pour des orbitales 1s et b = 0,3 nm, deux pas coûtent un facteur 300 sur l'amplitude. C'est une approximation, pas une interdiction." },
      e0: { prompt: "On ajoute la même constante à E₀ sur tous les atomes. Que change cela aux probabilités |C_n|² ?",
        options: { a: "L'électron s'étale plus vite.", b: "L'électron reste sur son atome.", c: "L'électron s'étale plus lentement.", d: "Rien : toutes les amplitudes prennent la même phase e^(\u2212iΔE t/ℏ)." },
        why: "Un terme E₀C_n commun à tous les atomes ne fait que tourner toutes les phases ensemble. Seules les différences d'énergie entre sites, et A, changent les probabilités." },
      etale: { prompt: "L'électron part d'un seul atome. Comment croît l'écart type de sa position ?",
        options: { a: "Comme √t, comme une marche au hasard.", b: "Comme t : √2 At/ℏ atomes.", c: "Comme t², l'électron accélère.", d: "Il ne croît pas : l'électron reste piégé." },
        hint: "Regardez le rapport affiché par le simulateur.",
        why: "Les amplitudes interfèrent au lieu que les probabilités s'ajoutent : l'électron s'étale à vitesse constante, comme une onde. L'écart type vaut √2 At/ℏ atomes, à toute date tant que l'anneau est assez grand." },
      parfait: { prompt: "Dans ce modèle d'un réseau parfait, qu'est-ce qui freine l'électron ?",
        options: { a: "Rien : aucun terme de (13.3) ne lui fait perdre son mouvement.", b: "Les chocs avec les atomes, à chaque saut.", c: "La barrière entre deux atomes.", d: "Le terme E₀C_n." },
        why: "Les équations sont réversibles et sans perte. La résistance électrique vient des écarts à la périodicité : vibrations, impuretés, défauts." },
      vitesse: { prompt: "On double l'amplitude de saut A. Que devient la vitesse du front ?",
        options: { a: "Elle est divisée par deux.", b: "Elle ne change pas : elle ne dépend que de b.", c: "Elle double : elle vaut 2Ab/ℏ.", d: "Elle est multipliée par quatre." },
        why: "Le front avance de 2A/ℏ atomes par seconde, donc à 2Ab/ℏ. Un couplage plus fort, des orbitales qui se recouvrent plus, fait un électron plus mobile." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 13, §13-1 (texte original en anglais). Notations SI. Hill, Acta Mathematica 8, 1 (1886) ; Floquet, Annales scientifiques de l'École normale supérieure 12, 47 (1883) ; Bloch, Zeitschrift für Physik 52, 555 (1929) ; Slater et Koster, Physical Review 94, 1498 (1954). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les atomes au repos et les états stationnaires » (Feynman III.7.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/atomes-au-repos-etats-stationnaires.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les atomes au repos et les états stationnaires",
    "crumb.jour": "États stationnaires",
    "h1": "Les atomes au repos et les états stationnaires",
    "lede": "Jusqu'ici, les amplitudes ne dépendaient que des appareils. Elles dépendent aussi du temps. Pour un atome au repos d'énergie définie, la dépendance est la plus simple possible : une phase qui tourne à la fréquence E/h. Rien de mesurable ne bouge, sauf quand deux énergies se mêlent.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les rotations quelconques du spin 1/2",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un atome au repos, d'énergie définie",
    "s1.p1": "Un atome est au repos, et son énergie <var>E</var><sub>0</sub> est définie : il est dans un état d'énergie unique, sans rien autour qui le dérange. L'amplitude de le trouver en un point ne peut pas dépendre du point, puisque rien ne distingue un point d'un autre. Elle peut dépendre du temps, mais seulement par sa phase, sinon la probabilité de le trouver changerait. Le postulat est que cette phase tourne à une fréquence fixée par l'énergie :",
    "val.7.1": "Approximation : un état d'énergie parfaitement définie dure indéfiniment. Un état excité réel finit par rayonner ; son énergie n'est définie qu'à ħ/τ près, τ sa durée de vie, et (7.1) vaut pour des durées courtes devant τ. Pour l'état fondamental, rien ne l'empêche d'être exacte.",
    "s1.p2": "Quelle énergie ? Pour un atome au repos, en relativité, c'est toute son énergie, celle de sa masse comprise :",
    "val.7.2": "Exacte comme définition de ω. Mais l'origine de l'énergie est arbitraire : on peut retrancher à <var>E</var><sub>0</sub> une constante, la même pour tous les états, sans changer aucune prédiction (voir (7.4)). <var>M</var><var>c</var><sup>2</sup> ne compte que si l'on compare des états de masses différentes.",
    "sys.title": "Le système décrit : un atome de césium",
    "sys1.body": "Pour un atome de césium, de masse 133\u00a0u, <var>M</var><var>c</var><sup>2</sup>/<var>h</var> vaut {f}\u00a0Hz : {r} fois la fréquence de l'horloge à césium. Aucune expérience ne voit cette fréquence-là : elle est commune à tous les états de l'atome, et une phase commune ne se mesure pas.",

    "s2.sec": "Deux énergies",
    "s2.h2": "Seules les différences se voient",
    "s2.p1": "Un atome qui n'est pas dans un état d'énergie définie est une superposition de tels états. Deux composantes d'énergies <var>E</var><sub>1</sub> et <var>E</var><sub>2</sub> tournent à des fréquences différentes ; leur différence de phase croît comme (<var>E</var><sub>2</sub> \u2212 <var>E</var><sub>1</sub>)<var>t</var>/ħ, et elle change les probabilités. Ajoutons une même constante <var>A</var> à toutes les énergies :",
    "val.7.4": "Exacte : le facteur e<sup>\u2212<var>i</var><var>A</var><var>t</var>/ħ</sup> est commun aux deux composantes. Il sort de toute amplitude et disparaît de toute probabilité. C'est pourquoi on peut compter les énergies à partir de n'importe quelle origine, à condition de garder la même pour tout le calcul.",
    "s2.p2": "Prenons deux états de même poids, mesurés dans une base qui les mélange à parts égales. La probabilité de trouver l'un des états de cette base oscille entre 0 et 1 à la fréquence ν = (<var>E</var><sub>2</sub> \u2212 <var>E</var><sub>1</sub>)/<var>h</var>. Changez ν, puis la constante <var>A</var>.",
    "fig.aria.battement": "Probabilité en fonction du temps pour deux états d'énergies différentes, de même poids",
    "fig.nu": "Écart des fréquences, ν",
    "fig.A": "Constante ajoutée aux énergies, A",
    "fig.ax.t": "temps (en périodes 1/ν)",
    "fig.ax.p": "probabilité",
    "fig.k.de": "Écart d'énergie <var>h</var>ν",
    "fig.f.de": "soit {v} eV",
    "fig.k.periode": "Période du battement, 1/ν",
    "fig.k.phase": "Fréquence ajoutée à chaque phase, |<var>A</var>|/<var>h</var>",
    "fig.f.ph": "la courbe ne bouge pas",
    "fig.caption": "La courbe ne dépend que de ν. Dès 0,1\u00a0eV, la constante <var>A</var> fait tourner chaque phase des milliers de fois plus vite que le battement, sans rien changer : seule la différence compte. À ν = 9,19\u00a0GHz, c'est l'écart entre les deux niveaux hyperfins de l'état fondamental du césium, que compte une horloge atomique.",
    "s2.p3": "Un état d'énergie définie s'appelle un <strong>état stationnaire</strong> : rien n'y change que la phase. Toute évolution visible vient d'un mélange d'énergies. C'est le fil de cette étape : un atome en mouvement, dans « Le mouvement uniforme en amplitudes », est une superposition qui avance ; un spin qui précesse, dans « La précession d'une particule de spin 1/2 », est une superposition de deux énergies.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Compter les tours d'une phase",
    "hist.intro": "Une différence d'énergie entre deux états d'un atome est une fréquence. La mesurer est devenu la définition même du temps.",
    "hist.events": {
      ramsey: { who: "Norman Ramsey", what: "publie dans la Physical Review la méthode des champs oscillants séparés pour la résonance sur jets moléculaires.", context: "Deux zones de champ, séparées, font interférer les amplitudes des deux états : la frange mesure leur écart de fréquence avec une finesse qui croît avec la distance entre les zones." },
      essen: { who: "Louis Essen", what: "construit au National Physical Laboratory, au Royaume-Uni, la première horloge à césium.", context: "Elle compte la fréquence de la transition entre les deux niveaux hyperfins de l'état fondamental du césium." },
      seconde: { who: "La 13ᵉ Conférence générale des poids et mesures", what: "définit la seconde par la fréquence de cette transition du césium.", context: "La fréquence vaut exactement 9\u00a0192\u00a0631\u00a0770\u00a0Hz, par définition. Elle reste la base de la seconde du Système international." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      horloge: { name: "Horloges atomiques", text: "Chaque satellite de positionnement GPS porte plusieurs horloges atomiques, au césium ou au rubidium. Toutes mesurent une différence d'énergie entre deux états stationnaires, comme une fréquence de battement." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      module: { prompt: "Pour un atome au repos dans un état d'énergie définie, qu'est-ce qui change avec le temps ?",
        options: { a: "La probabilité de le trouver en un point.", b: "Son énergie.", c: "Seulement la phase de son amplitude.", d: "Rien du tout, pas même la phase." },
        why: "(7.1) : le module est constant, la phase tourne à E₀/ħ. Toute probabilité est indépendante du temps : c'est un état stationnaire." },
      zero: { prompt: "On ajoute 1 eV à l'énergie de tous les états d'un système. Que change-t-on aux prédictions ?",
        options: { a: "Rien : un facteur de phase commun à toutes les composantes disparaît des probabilités.", b: "Toutes les fréquences d'oscillation.", c: "Les probabilités, d'un facteur e.", d: "Seulement l'état fondamental." },
        why: "(7.4) : e^\u2212iAt/ħ multiplie tout. L'origine des énergies est libre." },
      deux: { prompt: "Deux états d'énergies E₁ et E₂ sont mêlés à parts égales. À quelle fréquence la probabilité mesurée dans une base qui les mélange oscille-t-elle ?",
        options: { a: "E₁/h.", b: "(E₁ + E₂)/h.", c: "E₂/h.", d: "(E₂ \u2212 E₁)/h." },
        why: "Seule la différence de phase (E₂ \u2212 E₁)t/ħ compte : cos² de la moitié de cette différence, de fréquence (E₂ \u2212 E₁)/h." },
      frequence: { prompt: "Pourquoi ne voit-on jamais la fréquence Mc²/h ≈ 3 × 10²⁵ Hz d'un atome de césium ?",
        options: { a: "Parce qu'elle est trop élevée pour les détecteurs.", b: "Parce qu'elle est commune à tous ses états : une phase commune ne se mesure pas.", c: "Parce que l'atome n'est jamais au repos.", d: "Parce que la masse ne compte pas en mécanique quantique." },
        why: "Elle ne compte que pour comparer des états de masses différentes. Entre deux états du même atome, seule la différence d'énergie, 9,19 GHz pour le niveau hyperfin, se voit." },
      excite: { prompt: "Un état excité a une durée de vie τ. Dans quelle limite (7.1) le décrit-il ?",
        options: { a: "Toujours.", b: "Jamais.", c: "Pour des durées courtes devant τ : son énergie n'est définie qu'à ħ/τ près.", d: "Seulement si τ est nul." },
        why: "Un état qui rayonne n'est pas un état d'énergie parfaitement définie. (7.1) est une approximation d'autant meilleure que τ est long." },
      masse: { prompt: "Dans (7.2), on écrit E₀ = Mc². Faut-il absolument compter l'énergie de masse ?",
        options: { a: "Oui, sinon les probabilités sont fausses.", b: "Oui, pour les atomes lourds seulement.", c: "Non, sauf pour les particules sans masse.", d: "Non, sauf si l'on compare des états de masses différentes : une constante commune peut être retirée." },
        why: "Retirer la même constante à toutes les énergies ne change rien, (7.4). On garde Mc² quand la masse change, par exemple dans une réaction." },
      mesure: { prompt: "Qu'est-ce qu'une horloge atomique compte, au fond ?",
        options: { a: "La fréquence de la différence d'énergie entre deux états stationnaires de l'atome.", b: "La fréquence Mc²/h.", c: "Les chocs entre atomes.", d: "La vitesse des atomes." },
        why: "La seconde est définie par 9 192 631 770 périodes de la transition hyperfine du césium : une différence d'énergie divisée par h." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 7, §7-1 (texte original en anglais). Notations SI. Ramsey, Physical Review, vol. 78 (1950) ; Essen, National Physical Laboratory (1955) ; 13<sup>e</sup> CGPM (1967). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

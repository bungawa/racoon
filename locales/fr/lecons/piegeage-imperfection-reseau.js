/* Leçon « Le piégeage par une imperfection du réseau » (Feynman III.13.7) : textes en français.
   Une autre langue = locales/<langue>/lecons/piegeage-imperfection-reseau.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le piégeage par une imperfection du réseau",
    "crumb.jour": "Piégeage par une imperfection",
    "h1": "Le piégeage par une imperfection du réseau",
    "lede": "Un atome étranger qui attire l'électron ne fait pas que le dévier : il peut le garder. L'électron a alors une énergie hors de la bande, et son amplitude décroît de part et d'autre du défaut comme dans une barrière. Sur une chaîne, le moindre puits suffit.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la diffusion par les imperfections du réseau",

    "s1.sec": "1 · Chercher un état sous la bande",
    "s1.h2": "Un nombre d'onde imaginaire",
    "s1.p1": "On reprend la chaîne à une impureté de la leçon « La diffusion par les imperfections du réseau », avec <var>F</var> négatif : l'électron est mieux sur l'atome 0 que sur les autres. Dans la bande, il est diffusé. Peut-il exister un état d'énergie <var>E</var> hors de la bande, où l'électron reste près de l'impureté ? Hors de la bande, (13.13) n'a pas de solution <var>k</var> réelle ; avec <var>k</var> = ±iκ, les ondes deviennent des exponentielles réelles. Sur une chaîne infinie, on garde de chaque côté celle qui décroît :",
    "val.13.39": "Exacte : solution des équations de la chaîne parfaite à gauche de l'impureté, pour <var>k</var> = \u2212iκ ; l'autre exponentielle, qui croîtrait vers <var>n</var> → \u2212∞, est rejetée.",
    "val.13.40": "Exacte : de même à droite, avec <var>k</var> = iκ. Sur les atomes \u22121 et 1, les équations imposent <var>c</var>′ = <var>c</var> : l'état est symétrique.",
    "s1.p2": "Loin de l'impureté, chaque atome vérifie (13.6) ; avec ces exponentielles, l'énergie vaut :",
    "val.13.41": "Exacte : c'est (13.13) avec <var>k</var> = iκ. Comme e<sup>κ<var>b</var></sup> + e<sup>\u2212κ<var>b</var></sup> ≥ 2, l'énergie est sous la bande, <var>E</var> ≤ <var>E</var><sub>0</sub> \u2212 2<var>A</var>.",
    "s1.p3": "L'équation de l'atome 0, qui porte <var>F</var>, fixe κ :",
    "val.13.42": "Exacte dans le modèle : impureté sur un seul atome, même saut <var>A</var>. Elle a une solution κ > 0 pour tout <var>F</var> < 0 : sur une chaîne, une impureté attractive, si faible soit-elle, piège toujours un électron. En trois dimensions, il faut un puits assez profond.",
    "val.13.43": "Exacte dans le modèle, en éliminant κ entre (13.41) et (13.42). Approchée par les mêmes hypothèses que (13.3) ; dans un solide réel, les autres électrons écrantent l'impureté et la valeur de <var>F</var> est un paramètre.",

    "s2.sec": "2 · L'électron piégé",
    "s2.h2": "Une décroissance par effet tunnel",
    "s2.p1": "L'électron piégé a son amplitude la plus grande sur l'impureté, et elle décroît d'un facteur e<sup>\u2212κ<var>b</var></sup> à chaque atome. Il n'a pas assez d'énergie pour exister dans la bande ; il y pénètre pourtant, comme une particule pénètre une barrière.",
    "fig.aria": "Amplitudes de l'électron piégé sur les atomes autour de l'impureté",
    "fig.legend.a": "amplitude aₙ sur l'atome n (normée)",
    "fig.legend.env": "enveloppe e^(\u2212κ|x|)",
    "fig.xaxis": "numéro de l'atome, impureté en 0",
    "fig.yaxis": "amplitude",
    "fig.f": "Écart d'énergie de l'impureté, F (A = 1 eV)",
    "fig.k.e": "Énergie de l'état lié, E \u2212 E₀",
    "fig.f.e.sous": "{d} sous le bas de la bande",
    "fig.f.e.sur": "{d} au-dessus du haut de la bande",
    "fig.k.l": "Étendue 1/κ",
    "fig.v.l": "{n} atomes",
    "fig.f.l": "{d}",
    "fig.k.p": "Probabilité sur l'impureté",
    "fig.f.p": "|a₀|²",
    "fig.caption": "Rapprochez <var>F</var> de 0 : l'état lié remonte vers le bas de la bande et s'étend sur de plus en plus d'atomes ; il ne disparaît jamais. Passez à <var>F</var> > 0 : une bosse piège aussi un électron, au-dessus de la bande, avec des amplitudes qui changent de signe d'un atome au suivant, comme au haut de la bande.",
    "s2.p2": "Avec une bosse, <var>F</var> > 0, le même calcul avec <var>k</var> = π/<var>b</var> + iκ donne un état au-dessus de la bande, d'énergie <var>E</var><sub>0</sub> + √(4<var>A</var><sup>2</sup> + <var>F</var><sup>2</sup>). C'est le pendant de (13.43) : le haut de la bande se comporte comme une particule de masse négative, qu'une bosse attire. La leçon « Amplitudes de diffusion et états liés » retrouve ces deux états à partir de β.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Un piège peu profond, un piège profond",
    "s3.p1": "Le nombre qui décide est <var>F</var>/2<var>A</var> : petit, l'électron est à peine lié et très étendu ; grand, il est collé à l'impureté. Ce qui décide s'il y reste, c'est la profondeur sous la bande face à <var>k</var><sub>B</sub><var>T</var>.",
    "sys.title": "Le système décrit : <var>A</var> = 1\u00a0eV, <var>b</var> = 0,3\u00a0nm",
    "sys1.body": "Avec <var>F</var> = \u22120,1\u00a0eV, l'état lié est à {d} du bas de la bande et s'étend sur {n} atomes. À {T}, <var>k</var><sub>B</sub><var>T</var> ≈ {kT} : l'agitation thermique le libère sans peine. C'est le cas des donneurs d'un semi-conducteur dopé, sujet de la leçon « Les semi-conducteurs dopés ».",
    "sys2.body": "Avec <var>F</var> = \u22123\u00a0eV, l'état est à {d} sous la bande, et l'électron a une probabilité {p} d'être sur l'impureté même : il est piégé, à toute température ordinaire.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Les centres colorés",
    "hist.intro": "Un électron piégé sur un défaut absorbe la lumière à des fréquences propres : un cristal transparent devient coloré.",
    "hist.events": {
      mollwo: { who: "Erich Mollwo", what: "assistant de Robert Pohl à Göttingen, conclut que les centres colorés des cristaux de sel sont des défauts du réseau à l'échelle atomique.", context: "Le groupe de Pohl étudiait ces défauts depuis 1920 ; on les appelle centres F, de l'allemand Farbe, couleur." },
      pohl: { who: "Robert Pohl", what: "décrit le premier le modèle d'un électron piégé sur un site vide du réseau.", context: "Le modèle reste alors une hypothèse." },
      mott: { who: "Nevill Mott et Ronald Gurney", what: "donnent la théorie de ce modèle.", context: "L'électron y est lié à la lacune comme dans un petit atome : c'est l'état piégé de cette leçon, à trois dimensions." },
      rpe: { who: "La résonance paramagnétique électronique", what: "apporte la preuve expérimentale du modèle de la lacune.", context: "Cette méthode détecte le spin de l'électron piégé." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      laser: { name: "Les lasers à centres colorés", text: "Des cristaux riches en centres colorés servent de milieu amplificateur à des lasers accordables, comme des lasers à colorant, dans le proche infrarouge, d'environ 0,8 à 4\u00a0µm. Ils servent de sources en spectroscopie infrarouge, par exemple pour étudier les vibrations des molécules." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      imaginaire: { prompt: "Pourquoi prend-on un nombre d'onde imaginaire pour l'électron piégé ?",
        options: { a: "Parce que l'électron piégé n'existe pas vraiment.", b: "Parce que son énergie est imaginaire.", c: "Parce que son énergie est hors de la bande : aucun k réel ne la donne, et k = iκ donne des amplitudes qui décroissent loin du défaut.", d: "Parce que l'impureté est imaginaire." },
        why: "Hors de la bande, (13.13) impose cos kb hors de [\u22121, 1] : k complexe. Avec k = iκ, e^(ikx) = e^(\u2212κx), une onde qui décroît." },
      toujours: { prompt: "Sur une chaîne, une impureté attractive très faible, F = \u22120,01 eV, piège-t-elle un électron ?",
        options: { a: "Oui : (13.42) a une solution κ > 0 pour tout F < 0, l'état est très peu lié et très étendu.", b: "Non : il faut F < \u22122A.", c: "Non : une impureté faible ne fait que diffuser.", d: "Seulement à température nulle, F n'y change rien." },
        why: "sh(κb) = \u2212F/2A > 0 dès que F < 0. À une dimension, tout puits lie. L'énergie de liaison est minuscule, de l'ordre de F²/4A." },
      profond: { prompt: "A = 1 eV, F = \u22121,5 eV. À quelle énergie est l'état piégé ?",
        options: { a: "E₀ \u2212 1,5 eV.", b: "E₀ \u2212 2,5 eV : √(4 + 2,25) = 2,5.", c: "E₀ \u2212 2 eV, au bas de la bande.", d: "E₀ \u2212 3,5 eV." },
        hint: "Appliquez (13.43).",
        why: "E = E₀ \u2212 √(4A² + F²) = E₀ \u2212 √6,25 = E₀ \u2212 2,5 eV, soit 0,5 eV sous le bas de la bande." },
      tunnel: { prompt: "L'amplitude de l'électron piégé n'est pas nulle sur les atomes voisins de l'impureté. Pourquoi est-ce surprenant classiquement ?",
        options: { a: "Parce que les voisins sont chargés.", b: "Parce que l'électron devrait tourner autour de l'impureté.", c: "Parce que les voisins sont plus loin que la longueur d'onde.", d: "Parce que son énergie est sous la bande : classiquement, il ne pourrait pas y être. C'est la pénétration d'une barrière." },
        why: "L'énergie de l'état est inférieure à toutes celles permises sur les atomes normaux. L'amplitude y décroît exponentiellement sans s'annuler : effet tunnel." },
      bosse: { prompt: "Une impureté F > 0 repousse l'électron. Peut-elle le piéger ?",
        options: { a: "Non, jamais.", b: "Oui, dans un état au-dessus de la bande, aux amplitudes alternées, d'énergie E₀ + √(4A² + F²).", c: "Oui, sous la bande.", d: "Seulement si F > 2A." },
        why: "Le haut de la bande a une masse effective négative : une bosse l'attire. Le calcul avec k = π/b + iκ donne l'état, symétrique de celui de (13.43)." },
      thermique: { prompt: "Un état piégé est à 0,003 eV sous la bande. À 300 K, que devient l'électron ?",
        options: { a: "Il reste piégé.", b: "Il sort du cristal.", c: "L'agitation thermique, k_BT ≈ 0,026 eV, le fait passer facilement dans la bande.", d: "Il tombe sur l'impureté." },
        why: "L'énergie de liaison est dix fois plus petite que k_BT : le piège est vidé par l'agitation thermique. C'est le cas des donneurs peu profonds des semi-conducteurs." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 13, §13-7 (texte original en anglais). Notations SI. Histoire des centres colorés : Mollwo (1933), Pohl (1937), Mott et Gurney (1940), résonance paramagnétique électronique (1957). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

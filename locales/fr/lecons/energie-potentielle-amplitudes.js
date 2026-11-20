/* Leçon « Énergie potentielle et conservation de l'énergie quantiques » (Feynman III.7.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/energie-potentielle-amplitudes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Énergie potentielle et conservation de l'énergie quantiques",
    "crumb.jour": "Énergie potentielle",
    "h1": "Énergie potentielle et conservation de l'énergie quantiques",
    "lede": "Une énergie potentielle constante ajoute une phase et ne change rien. Une marche de potentiel, elle, change la longueur d'onde : la fréquence doit rester la même des deux côtés, et c'est la conservation de l'énergie. Là où la physique classique interdit le passage, l'amplitude ne s'annule pas : elle décroît, et une barrière mince se traverse.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le mouvement uniforme en amplitudes",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un potentiel constant",
    "s1.p1": "Une particule se déplace dans une région où son énergie potentielle vaut <var>V</var>, la même partout : par exemple un électron à l'intérieur d'une électrode creuse portée à un potentiel électrique. Aucune force n'agit. L'énergie totale gagne <var>V</var>, et l'amplitude (7.5) devient :",
    "val.7.18": "Exacte dans une région où <var>V</var> est uniforme et constant dans le temps. Si <var>V</var> est le même partout, le facteur e<sup>\u2212<var>i</var><var>V</var><var>t</var>/ħ</sup> est commun à tout et ne change aucune probabilité : on retrouve (7.4).",
    "s1.p2": "La fréquence de l'onde est fixée par l'énergie totale :",
    "val.7.19": "Exacte comme définition de ω. Comme toute énergie, <var>V</var> n'a pas d'origine absolue ; seule une différence de <var>V</var> entre deux régions a un effet.",

    "s2.sec": "Une marche de potentiel",
    "s2.h2": "Même fréquence, autre longueur d'onde",
    "s2.p1": "Deux régions de potentiels <var>V</var><sub>1</sub> et <var>V</var><sub>2</sub> se touchent. L'amplitude doit se raccorder à la frontière à tout instant : les deux côtés ont donc la même fréquence. Avec <var>W</var><sub>int</sub> l'énergie interne de la particule :",
    "eq.int": "int",
    "val.7.23": "Exacte pour des potentiels constants dans le temps ; c'est la conservation de l'énergie, retrouvée comme conservation de la fréquence. L'énergie interne <var>W</var><sub>int</sub> est la même des deux côtés si la particule n'est pas excitée en passant. Si <var>V</var> dépend du temps, la fréquence n'est plus fixe et l'énergie peut changer.",
    "s2.p2": "La quantité de mouvement change, et avec elle la longueur d'onde :",
    "val.7.24": "Exacte, non relativiste (<var>v</var> ≪ <var>c</var>). Si <var>V</var><sub>2</sub> \u2212 <var>V</var><sub>1</sub> dépasse l'énergie cinétique <var>p</var><sub>1</sub><sup>2</sup>/2<var>M</var>, <var>p</var><sub>2</sub><sup>2</sup> est négatif : la particule classique ne peut pas entrer dans la région 2.",
    "s2.p3": "En mécanique quantique, rien n'interdit <var>p</var><sub>2</sub><sup>2</sup> < 0. On pose <var>p</var><sub>2</sub> = <var>i</var><var>p</var>′ avec <var>p</var>′ = √(2<var>M</var>(<var>V</var><sub>2</sub> \u2212 <var>V</var><sub>1</sub>) \u2212 <var>p</var><sub>1</sub><sup>2</sup>), réel : l'onde devient une exponentielle qui décroît dans la région interdite.",
    "val.7.25": "Approximation : on garde la seule solution qui décroît, celle d'une région interdite épaisse ; dans une barrière mince, une composante croissante s'ajoute, réfléchie par la face de sortie. L'amplitude décroît d'un facteur e sur ħ/<var>p</var>′, de l'ordre de 0,1\u00a0nm pour un électron sous une barrière de quelques électronvolts.",

    "s3.sec": "Les nombres",
    "s3.h2": "Traverser une barrière",
    "s3.p1": "Un électron d'énergie cinétique <var>E</var><sub>c</sub> arrive sur une barrière de hauteur <var>V</var> et de largeur <var>L</var>. Le trait orangé est son énergie ; la courbe bleue esquisse la partie réelle de l'amplitude, non à l'échelle des modules. La dernière ligne donne le facteur e<sup>\u22122<var>p</var>′<var>L</var>/ħ</sup> sur la probabilité, la loi de la barrière épaisse.",
    "fig.aria.marche": "Une barrière de potentiel, l'énergie de l'électron et l'allure de la partie réelle de son amplitude",
    "fig.E": "Énergie cinétique de l'électron, E<sub>c</sub>",
    "fig.V": "Hauteur de la barrière, V",
    "fig.L": "Largeur de la barrière, L (nm)",
    "fig.k.l1": "Longueur d'onde avant la barrière",
    "fig.k.l2": "Dans la barrière",
    "fig.f.decr": "longueur de décroissance ħ/<var>p</var>′",
    "fig.f.onde": "longueur d'onde, plus grande : l'électron est plus lent",
    "fig.k.att": "Facteur e<sup>\u22122<var>p</var>′<var>L</var>/ħ</sup>",
    "fig.f.att": "<var>p</var>′<var>L</var>/ħ = {r} ; fiable si ≫ 1",
    "fig.caption": "Si la barrière est plus basse que l'énergie de l'électron, la longueur d'onde y grandit : l'électron ralentit. Si elle est plus haute, l'onde devient une exponentielle, et ce qui ressort est d'autant plus faible que la barrière est large. Ajouter 0,1\u00a0nm de barrière divise la probabilité par un facteur de l'ordre de dix pour quelques électronvolts sous le sommet.",
    "s3.p2": "Ce « passage à travers » n'a pas d'analogue classique pour une particule, mais il en a un pour les ondes : la lumière totalement réfléchie par une face de verre traverse une mince lame d'air jusqu'à une seconde face. La même décroissance exponentielle explique la désintégration α des noyaux : la particule α, retenue par une barrière, en sort avec une probabilité minuscule à chaque essai, d'où des durées de vie très différentes d'un noyau à l'autre, jusqu'à des milliards d'années pour l'uranium.",
    "sys.title": "Le système décrit : la pointe d'un microscope à effet tunnel",
    "sys1.body": "Entre une pointe et une surface métalliques séparées par 0,5\u00a0nm de vide, on prend pour l'électron une barrière de 4,5\u00a0eV au-dessus de son énergie, l'ordre de grandeur du travail de sortie d'un métal. Le facteur vaut {a}. Éloigner la pointe de 0,1\u00a0nm le divise par {r} : un courant qui varie d'un ordre de grandeur par dixième de nanomètre, c'est la sensibilité qui permet de voir les atomes.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "L'effet tunnel, des noyaux aux mémoires",
    "hist.intro": "La traversée d'une région interdite a d'abord expliqué la radioactivité, puis est devenue un outil.",
    "hist.events": {
      gamow: { who: "George Gamow, et indépendamment Ronald Gurney et Edward Condon", what: "expliquent la désintégration α par le passage de la particule α à travers la barrière du noyau.", context: "La probabilité de traversée, exponentiellement petite, rend compte de durées de vie qui diffèrent de nombreux ordres de grandeur d'un noyau à l'autre." },
      esaki: { who: "Leo Esaki", what: "montre le passage d'électrons à travers une barrière de quelques nanomètres dans un semi-conducteur, et en fait une diode.", context: "Il partage le prix Nobel de physique de 1973 avec Ivar Giaever et Brian Josephson." },
      stm: { who: "Gerd Binnig et Heinrich Rohrer", what: "mettent au point le microscope à effet tunnel.", context: "Le courant entre une pointe et la surface suit la loi exponentielle de cette leçon. Ils reçoivent le prix Nobel de physique en 1986." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      flash: { name: "Mémoires flash", text: "Les mémoires flash écrivent chaque bit en faisant passer des électrons, par effet tunnel, à travers une couche isolante jusqu'à une grille flottante, où ils restent piégés. La loi (7.25) dicte l'épaisseur de cette couche." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      constant: { prompt: "Un électron entre dans une région de potentiel V uniforme, sans frontière visible. Que change V à ses probabilités ?",
        options: { a: "Il les multiplie par e^\u2212V.", b: "Il change sa longueur d'onde.", c: "Rien : il ajoute une phase commune e^\u2212iVt/ħ.", d: "Il l'arrête." },
        why: "(7.18) : sans différence de potentiel, pas de force, et un facteur commun ne se mesure pas." },
      frequence: { prompt: "Pourquoi la fréquence est-elle la même des deux côtés d'une marche de potentiel ?",
        options: { a: "Parce que l'amplitude doit se raccorder à la frontière à tout instant.", b: "Parce que la longueur d'onde est la même.", c: "Parce que la vitesse est la même.", d: "Elle ne l'est pas." },
        why: "Deux fonctions du temps égales à chaque instant ont la même fréquence. Avec ħω = énergie totale, c'est la conservation de l'énergie (7.23)." },
      lambda: { prompt: "Un électron de 4 eV passe dans une région où son énergie potentielle vaut 3 eV. Sa longueur d'onde…",
        options: { a: "diminue de moitié.", b: "ne change pas.", c: "s'annule.", d: "double : son énergie cinétique est divisée par 4, sa quantité de mouvement par 2." },
        why: "(7.24) : p₂² = 2M(4 \u2212 3) eV, p₂ = p₁/2, λ₂ = 2λ₁." },
      interdit: { prompt: "Que devient l'amplitude dans une région où V dépasse l'énergie totale ?",
        options: { a: "Elle s'annule exactement.", b: "Elle décroît exponentiellement, sur une longueur ħ/p′.", c: "Elle oscille plus vite.", d: "Elle croît." },
        why: "p₂² < 0 : p₂ = ip′, et l'onde e^ip₂x/ħ devient e^\u2212p′x/ħ, (7.25)." },
      epais: { prompt: "On double la largeur d'une barrière épaisse. Le facteur de transmission…",
        options: { a: "est divisé par deux.", b: "ne change pas.", c: "est élevé au carré : e^\u22122p′L/ħ devient e^\u22124p′L/ħ.", d: "double." },
        why: "La loi est exponentielle en L. Si le facteur valait 10⁻⁵, il devient 10⁻¹⁰." },
      stm: { prompt: "Pourquoi un microscope à effet tunnel distingue-t-il des atomes, séparés de quelques dixièmes de nanomètre ?",
        options: { a: "Parce que le courant tunnel varie d'environ un facteur 10 quand la distance change de 0,1 nm.", b: "Parce que sa pointe est plus petite qu'un atome.", c: "Parce qu'il utilise de la lumière.", d: "Parce que les électrons sont des particules classiques." },
        why: "e^\u22122p′L/ħ avec ħ/p′ ≈ 0,1 nm : une petite variation de L change beaucoup le courant." },
      classique: { prompt: "Quel phénomène d'optique est l'analogue du passage d'une particule dans une région interdite ?",
        options: { a: "La dispersion par un prisme.", b: "La diffraction par une fente.", c: "L'effet Doppler.", d: "La lumière en réflexion totale qui traverse une mince lame d'air jusqu'à une seconde face de verre." },
        why: "Dans la réflexion totale, l'onde pénètre en décroissant au-delà de la face. Une seconde face assez proche en récupère une partie : c'est la même exponentielle." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 7, §7-3 (texte original en anglais). Notations SI. Gamow (1928) ; Gurney et Condon (1928) ; Esaki (1957) ; Binnig et Rohrer (1981). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

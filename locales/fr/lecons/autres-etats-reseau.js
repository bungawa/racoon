/* Leçon « Les autres états d'un réseau » (Feynman III.13.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/autres-etats-reseau.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les autres états d'un réseau",
    "crumb.jour": "Autres états d'un réseau",
    "h1": "Les autres états d'un réseau",
    "lede": "Un atome n'a pas qu'un niveau, donc un cristal n'a pas qu'une bande. Et ce qui saute d'atome en atome n'est pas forcément un électron : ce peut être l'absence d'un électron, ou une excitation sans charge. Les mêmes équations décrivent les trois.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'étape « Un électron dans un réseau »",
    "eq.cos": "cos",

    "s1.sec": "1 · D'autres bandes",
    "s1.h2": "Un niveau atomique, une bande",
    "s1.p1": "Jusqu'ici, l'électron sur l'atome <var>n</var> était dans l'état le plus bas de cet atome, d'énergie <var>E</var><sub>0</sub>. Mais l'atome a d'autres états, plus hauts. Chacun, couplé aux voisins par sa propre amplitude de saut, donne sa propre bande, par le calcul de la leçon « Les états d'énergie définie dans un réseau » :",
    "val.13.13a": "Approximation : chaque bande est calculée comme si les autres n'existaient pas. Un électron excité peut aussi sauter chez un voisin en y arrivant dans l'état bas : ce couplage entre bandes les déforme là où elles se croisent ou se touchent. Il est négligeable quand l'écart entre les bandes dépasse de beaucoup l'amplitude de ce saut croisé.",
    "s1.p2": "Un état atomique excité, plus étendu, recouvre davantage ses voisins : son amplitude de saut est souvent plus grande, et sa bande plus large. Deux bandes peuvent être séparées par un intervalle d'énergies sans aucun état, une bande interdite, ou se recouvrir.",
    "fig.aria": "Deux bandes d'énergie issues de deux niveaux atomiques, en fonction du nombre d'onde",
    "fig.legend.bas": "bande du niveau bas, E₀ = 0",
    "fig.legend.haut": "bande du niveau excité, E₁",
    "fig.legend.gap": "bande interdite",
    "fig.xaxis": "kb (rad)",
    "fig.yaxis": "énergie (eV)",
    "fig.d": "Écart des niveaux atomiques, E₁ \u2212 E₀",
    "fig.a0": "Saut du niveau bas, A₀",
    "fig.a1": "Saut du niveau excité, A₁",
    "fig.k.gap": "Bande interdite",
    "fig.f.gap": "aucun état entre les deux bandes",
    "fig.f.recouvre": "les bandes se recouvrent de cette quantité : pas de bande interdite",
    "fig.k.largeurs": "Largeurs 4A₀ et 4A₁",
    "fig.v.largeurs": "{a} et {b}",
    "fig.f.largeurs": "la bande interdite vaut E₁ \u2212 E₀ \u2212 2A₀ \u2212 2A₁",
    "fig.caption": "Quand les atomes se rapprochent, les amplitudes de saut grandissent, les bandes s'élargissent et la bande interdite se ferme. Augmentez <var>A</var><sub>0</sub> et <var>A</var><sub>1</sub> : à partir de 2<var>A</var><sub>0</sub> + 2<var>A</var><sub>1</sub> = <var>E</var><sub>1</sub> \u2212 <var>E</var><sub>0</sub>, les bandes se recouvrent.",

    "s2.sec": "2 · Le trou",
    "s2.h2": "Une absence qui se déplace",
    "s2.p1": "Prenons maintenant un cristal où chaque atome a tous ses électrons, sauf un : un atome a perdu un électron, il est chargé positivement. Un électron d'un voisin peut sauter sur la place vide ; la place vide est alors chez le voisin. Le manque saute d'atome en atome, avec une amplitude qui est celle du saut d'un électron. Ses états obéissent aux mêmes équations (13.3), et ont des énergies en bande, (13.13).",
    "s2.p2": "Ce manque d'électron, le trou, se déplace donc comme une particule de charge positive, avec sa masse effective. Il n'y a pas de particule positive dans le cristal ; il y a le mouvement collectif de tous les électrons, qui se ramène, pour le calcul, au mouvement d'un seul objet. Les trous jouent un rôle central dans la leçon « Les électrons et les trous dans les semi-conducteurs ».",

    "s3.sec": "3 · L'exciton",
    "s3.h2": "Une excitation sans charge",
    "s3.p1": "Autre cas : un atome du cristal est dans un état excité, ses électrons au complet. Il peut se désexciter en excitant son voisin : l'excitation passe d'un atome à l'autre, sans qu'aucune charge ne bouge. Cette excitation qui voyage, l'exciton, a encore des états en bande, de mêmes équations. Elle transporte de l'énergie à travers le cristal, mais pas de courant.",
    "s3.p2": "Dans tous ces cas, le calcul ne donne pas <var>A</var>. Il faudrait connaître en détail les états des atomes et leur recouvrement. Les amplitudes de saut se déduisent en pratique des mesures : largeurs de bande, masses effectives, spectres.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Une bande interdite face à l'agitation thermique",
    "s4.p1": "Ce qui décide si une bande vide se peuple, c'est le rapport de la bande interdite à l'énergie d'agitation thermique <var>k</var><sub>B</sub><var>T</var>.",
    "sys.title": "Le système décrit : un cristal à température ambiante",
    "sys1.body": "À {T}, <var>k</var><sub>B</sub><var>T</var> ≈ {kT}. Une bande interdite de quelques électronvolts, cent fois plus, est infranchissable pour l'agitation thermique : la bande haute reste vide, la bande basse pleine.",
    "sys2.body": "Pour une bande interdite de 1,1\u00a0eV, celle du silicium, le facteur e<sup>\u2212<var>E</var><sub>g</sub>/2<var>k</var><sub>B</sub><var>T</var></sup> qui règle la population thermique de la bande haute vaut environ {f} : peu, mais assez pour quelques porteurs. C'est la conduction des semi-conducteurs.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Trous et excitons",
    "hist.intro": "Peu après les bandes de Bloch, on a compris que la même théorie décrivait d'autres objets que l'électron.",
    "hist.events": {
      wilson: { who: "Alan Wilson", what: "publie « The Theory of Electronic Semi-Conductors », qui applique la théorie des bandes aux semi-conducteurs.", context: "Proceedings of the Royal Society A, vol. 133. Il attribue leurs propriétés singulières aux atomes d'impureté d'un cristal par ailleurs pur." },
      frenkel: { who: "Yakov Frenkel", what: "propose qu'une excitation d'un réseau d'atomes puisse voyager d'atome en atome : c'est l'exciton.", context: "Physical Review, vol. 37, dans un article sur la transformation de la lumière en chaleur dans les solides." },
      wannier: { who: "Gregory Wannier", what: "décrit des excitations plus étendues des cristaux isolants, à la manière d'un atome d'hydrogène.", context: "Physical Review, vol. 52. Ces excitons portent aujourd'hui les noms de Wannier et Mott." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      lumiere: { name: "La lumière des semi-conducteurs", text: "À basse température, la lumière émise par un semi-conducteur vient surtout d'excitons qui se désexcitent. Dans certaines couches d'un seul plan d'atomes, des dichalcogénures de métaux de transition, les raies des excitons restent visibles à température ambiante." },
      regle: { name: "Une règle moléculaire", text: "Une excitation passe aussi d'une molécule à une autre, d'autant moins bien qu'elles sont éloignées : c'est le transfert d'énergie de Förster. Les biologistes s'en servent pour mesurer des distances entre molécules." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      bandes: { prompt: "D'où viennent les différentes bandes d'énergie d'un cristal, dans ce modèle ?",
        options: { a: "Chaque état de l'atome isolé, couplé aux voisins par sa propre amplitude de saut, donne sa bande.", b: "Chaque électron du cristal a sa propre bande.", c: "Chaque direction du cristal donne une bande.", d: "Les bandes viennent des vibrations des atomes." },
        why: "Un niveau atomique Eⱼ s'étale en une bande Eⱼ \u2212 2Aⱼ cos kb. Plusieurs niveaux, plusieurs bandes." },
      trou: { prompt: "Dans un cristal où un seul électron manque, qu'est-ce qui se déplace ?",
        options: { a: "Un positron, créé par le cristal.", b: "Rien : l'atome chargé reste fixe.", c: "Le manque : un voisin comble la place vide et en laisse une chez lui ; le trou se comporte comme une charge positive.", d: "Le noyau de l'atome." },
        why: "Le trou obéit aux mêmes équations que l'électron : il saute d'atome en atome, avec une bande et une masse effective. Sa charge est positive." },
      exciton: { prompt: "Un exciton traverse un cristal. Transporte-t-il un courant électrique ?",
        options: { a: "Oui, comme un électron.", b: "Non : c'est une excitation qui passe d'atome en atome sans déplacer de charge ; il transporte de l'énergie.", c: "Oui, comme un trou.", d: "Seulement dans un champ magnétique." },
        why: "L'atome excité est neutre ; l'excitation passe au voisin, neutre aussi. De l'énergie se déplace, pas de charge." },
      gap: { prompt: "Deux niveaux atomiques séparés de 3 eV donnent des bandes de largeurs 1 eV et 1,6 eV. Que vaut la bande interdite ?",
        options: { a: "3 eV.", b: "0,4 eV.", c: "Elle n'existe pas.", d: "1,7 eV : 3 \u2212 1/2 \u2212 1,6/2." },
        hint: "Le haut de la bande basse est à E₀ + 2A₀, le bas de la bande haute à E₁ \u2212 2A₁.",
        why: "Chaque bande s'étend de la moitié de sa largeur autour de son niveau : 3 \u2212 0,5 \u2212 0,8 = 1,7 eV." },
      mesure: { prompt: "Comment connaît-on en pratique les amplitudes de saut A d'un cristal ?",
        options: { a: "Par les mesures : largeurs de bande, masses effectives, spectres.", b: "Par un calcul exact simple à partir de la charge de l'électron.", c: "Elles valent toujours 1 eV.", d: "Par la masse des atomes." },
        why: "A dépend du recouvrement des états atomiques voisins, difficile à calculer avec précision. On l'ajuste sur l'expérience." },
      isolant: { prompt: "Bande basse pleine, bande haute vide, séparées de 5 eV, à 300 K. Le cristal :",
        options: { a: "conduit très bien : ses électrons sont dans une bande.", b: "conduit grâce aux excitons.", c: "ne conduit presque pas : l'agitation thermique, 0,026 eV, ne peuple pas la bande haute, et une bande pleine ne porte pas de courant.", d: "conduit seulement s'il est éclairé en lumière infrarouge." },
        why: "Une bande pleine ne laisse aucun état libre : pas de courant net. 5 eV ≈ 200 k_BT : la bande haute reste vide. C'est un isolant." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 13, §13-5 (texte original en anglais). Notations SI. Wilson, Proceedings of the Royal Society A 133, 458 (1931) ; Frenkel, Physical Review 37, 17 (1931) ; Wannier, Physical Review 52, 191 (1937). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

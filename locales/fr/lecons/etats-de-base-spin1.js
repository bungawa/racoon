/* Leçon « Les états de base » (Feynman III.5.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/etats-de-base-spin1.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les états de base",
    "crumb.jour": "États de base",
    "h1": "Les états de base",
    "lede": "Un filtre sépare n'importe quel faisceau en quelques états, et l'avenir d'un atome ne dépend que de l'état où il se trouve. Ces états sont les états de base. Une expérience le montre de façon frappante : ouvrir plus de voies dans un appareil peut laisser passer moins d'atomes.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : des filtres de Stern et Gerlach en série",

    "s1.sec": "Décrire le système",
    "s1.h2": "Ce qu'on appelle un état de base",
    "s1.p1": "Un appareil de Stern et Gerlach d'orientation donnée, <var>T</var>, sépare tout faisceau d'atomes de spin 1 en trois voies, +<var>T</var>, 0<var>T</var> et \u2212<var>T</var>. Ces trois états ont deux propriétés. Chacun est <strong>pur</strong> : un faisceau sorti par la voie +<var>T</var> passe entièrement un second filtre +<var>T</var>, et pas du tout les filtres 0<var>T</var> et \u2212<var>T</var>. Et ils sont <strong>complets</strong> : un atome, quel que soit son passé, sort par l'une des trois voies. On appelle un tel ensemble d'états une <strong>base</strong>.",
    "s1.p2": "Le principe qui rend le tout calculable est celui de « Des filtres de Stern et Gerlach en série » : l'avenir d'un atome sorti d'un filtre ne dépend que de l'état de base dans lequel il en sort, pas de son histoire. Chaque orientation d'appareil fournit sa base, et il y en a une infinité. Aucune n'est privilégiée : une base de <var>S</var> et une base de <var>T</var> décrivent les mêmes atomes, par des nombres différents.",

    "s2.sec": "Trois expériences",
    "s2.h2": "Ouvrir plus de voies, laisser passer moins d'atomes",
    "s2.p1": "Envoyons <var>N</var> atomes de l'état +<var>S</var> dans <var>T</var>, tourné de α, dont seule la voie 0<var>T</var> est ouverte, puis dans un filtre <var>S</var>′ orienté comme <var>S</var>. Si <var>S</var>′ laisse passer +<var>S</var> :",
    "val.5.14": "Exacte pour des filtres idéaux : α et β sont des carrés de modules d'amplitudes, définis par ces égalités. Approximation dès que <var>N</var> est fini : on compte en moyenne αβ<var>N</var> atomes, avec une fluctuation de l'ordre de √(αβ<var>N</var>), soit 1\u00a0% pour 10<sup>4</sup> atomes comptés.",
    "val.5.15": "Exacte dans les mêmes conditions que (5.14). Les nombres α, β et γ sont tous trois positifs pour un angle quelconque entre 0 et 90°, sauf cas particulier : γ s'annule à 90°, quand <var>T</var> est perpendiculaire à <var>S</var>.",
    "s2.p2": "Si <var>S</var>′ laisse passer 0<var>S</var>, une fraction γ des atomes sortis de <var>T</var> passe : (5.15). Maintenant ouvrons les trois voies de <var>T</var>. Plus aucun atome n'est arrêté dans <var>T</var> : les <var>N</var> atomes en sortent. S'il ne s'agissait que de probabilités, il en passerait davantage dans <var>S</var>′, la somme des contributions des trois voies, au moins γα<var>N</var>. Or un appareil grand ouvert, qui sépare les voies puis les recombine sans les perturber, ne fait rien : les atomes en sortent dans leur état de départ, +<var>S</var>. Ils passent tous un filtre +<var>S</var>′, et <strong>aucun</strong> ne passe un filtre 0<var>S</var>′ :",
    "val.5.17": "Exacte pour un appareil <var>T</var> idéal, dont les trois voies ont la même longueur et le même champ moyen, et sont recombinées exactement. Une différence de phase entre les voies, même faible, laisse passer une fraction de l'ordre du carré de cette phase : 1\u00a0% pour 0,1\u00a0rad. Un témoin qui enregistre la voie prise, même en principe, détruit l'effet : on retrouve la somme des probabilités.",

    "s3.sec": "Des amplitudes qui se recombinent",
    "s3.h2": "Voir la différence",
    "s3.p1": "La courbe pleine donne la fraction des atomes +<var>S</var> qui passe <var>S</var>′, voies de <var>T</var> recombinées : on ajoute les amplitudes des voies ouvertes, puis on prend le carré. La courbe en tirets donne ce qu'on obtiendrait si chaque voie de <var>T</var> était marquée par un témoin : on ajoute alors les probabilités. Fermez une voie de <var>T</var>, choisissez celle de <var>S</var>′.",
    "fig.aria.courbe": "Fraction des atomes +S qui passe S′ en fonction de l'angle de T, voies recombinées et voies marquées",
    "fig.legend.amp": "voies recombinées : amplitudes ajoutées",
    "fig.legend.proba": "voies marquées : probabilités ajoutées",
    "fig.ft": "Appareil T : voies ouvertes",
    "fig.fs2": "Filtre S′ : voie ouverte",
    "fig.b.plus": "+",
    "fig.b.zero": "0",
    "fig.b.moins": "\u2212",
    "fig.alpha": "Angle de T autour de y, α",
    "fig.ax.alpha": "angle α (°)",
    "fig.ax.p": "fraction qui passe S′",
    "fig.k.amp": "Voies recombinées",
    "fig.f.amp": "|Σ ⟨kS|iT⟩⟨iT|+S⟩|<sup>2</sup>, sur les voies ouvertes",
    "fig.k.proba": "Voies marquées",
    "fig.f.proba": "Σ |⟨kS|iT⟩|<sup>2</sup> |⟨iT|+S⟩|<sup>2</sup>",
    "fig.caption": "Avec les trois voies de <var>T</var> ouvertes et <var>S</var>′ réglé sur 0, la courbe pleine est nulle à tout angle : (5.17). Fermez la voie +<var>T</var> : elle remonte. Fermer une voie peut faire passer plus d'atomes. Les tirets, eux, ne descendent jamais quand on ouvre une voie : des probabilités positives ne peuvent que s'ajouter.",
    "s3.p2": "Ce paradoxe est celui des deux fentes de « L'interférence des ondes d'électrons » : deux façons indiscernables d'arriver ont des amplitudes qui s'ajoutent et peuvent se détruire. Ici, les « fentes » sont les voies d'un appareil, et les amplitudes de chaque voie sont des produits ⟨<var>k</var><var>S</var>|<var>i</var><var>T</var>⟩⟨<var>i</var><var>T</var>|+<var>S</var>⟩. La suite, « Des amplitudes qui interfèrent », en fait une loi générale.",
    "sys.title": "Le système décrit : T à 60°",
    "sys1.body": "Avec <var>T</var> à 60° et seule sa voie 0<var>T</var> ouverte, une fraction {g} des atomes +<var>S</var> passe <var>S</var>′ réglé sur 0 : {N} atomes par million. Avec les trois voies ouvertes, aucun, à condition que les trois voies soient recombinées à une petite fraction de longueur d'onde de de Broglie près, ici 10<sup>\u221211</sup>\u00a0m. C'est pourquoi l'appareil grand ouvert est une expérience de pensée : le réaliser demande de maîtriser les trajets à ce niveau.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des bases aux interféromètres de Stern et Gerlach",
    "hist.intro": "L'idée d'états de base est passée dans les traités en deux ans. Recombiner réellement les voies d'un appareil de Stern et Gerlach a pris près d'un siècle.",
    "hist.events": {
      dirac: { who: "Paul Dirac", what: "publie The Principles of Quantum Mechanics, où l'état d'un système est un vecteur qu'on décompose sur des états de base.", context: "Le livre ne suppose pas de modèle de l'atome : il part des états, de leur superposition et des amplitudes qui relient deux bases." },
      neumann: { who: "John von Neumann", what: "publie chez Springer, à Berlin, les Mathematische Grundlagen der Quantenmechanik.", context: "Il donne au formalisme une forme mathématique rigoureuse, celle des espaces de Hilbert et des opérateurs linéaires, et décrit la mesure comme un processus non causal et irréversible." },
      folman: { who: "L'équipe de Ron Folman", what: "annonce la première réalisation d'un interféromètre de Stern et Gerlach complet, où les voies séparées par un gradient sont refermées.", context: "Les atomes sont manipulés sur une puce, près de champs magnétiques créés par des fils. Les auteurs observent comment la cohérence se perd quand la séparation augmente : la recombinaison idéale de cette leçon est difficile à atteindre." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      interfero: { name: "Interféromètres sur puce", text: "Les interféromètres de Stern et Gerlach sur puce atomique servent à sonder les fondements de la mécanique quantique et sont proposés pour la métrologie et la mesure de surfaces et de courants, selon une revue de l'équipe de Folman (2020). Ils réalisent l'appareil grand ouvert de cette leçon." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      ouvrir: { prompt: "Des atomes +S traversent T, puis un filtre 0S′. T ne laisse passer que 0T ; on ouvre ensuite ses deux autres voies. Que devient le nombre d'atomes qui sortent de 0S′ ?",
        options: { a: "Il augmente : plus de voies, plus d'atomes.", b: "Il ne change pas.", c: "Il triple.", d: "Il tombe à zéro : T grand ouvert rend les atomes dans l'état +S, et ⟨0S|+S⟩ = 0." },
        why: "C'est (5.17). Les amplitudes des trois voies se recombinent et redonnent l'état +S, dont l'amplitude d'être 0S est nulle. Fermer des voies supprime des termes de la somme et l'annulation disparaît." },
      base: { prompt: "Qu'est-ce qu'un ensemble d'états de base ?",
        options: { a: "Des états purs, qui s'excluent deux à deux, et tels que tout atome soit trouvé dans l'un d'eux par un filtre.", b: "Les états d'énergie la plus basse.", c: "Les trois états d'un appareil orienté selon la verticale, et eux seuls.", d: "Les états d'un atome sorti du four." },
        why: "Pureté, exclusion et complétude : un filtre sépare tout faisceau entre eux, et chacun repasse sa propre voie avec certitude. Toute orientation d'appareil fournit une telle base." },
      purete: { prompt: "Comment vérifier qu'un faisceau sorti de la voie +T est pur ?",
        options: { a: "En mesurant son intensité.", b: "En le faisant passer dans un appareil S.", c: "En le faisant passer dans un second filtre +T : tout passe, et rien ne passe 0T ni \u2212T.", d: "En mesurant la vitesse des atomes." },
        why: "Un état de base de T repasse entièrement la même voie de T et aucune autre. Un appareil d'une autre orientation, lui, partagerait même un faisceau pur." },
      temoin: { prompt: "Dans T grand ouvert, un témoin note par quelle voie passe chaque atome, sans rien changer d'autre. Que trouve-t-on à la sortie de 0S′ ?",
        options: { a: "Toujours zéro.", b: "La somme des probabilités des trois voies : en général plus que zéro.", c: "Tous les atomes.", d: "Le témoin ne change rien aux nombres." },
        hint: "Si la voie est connue, les trois façons d'arriver ne sont plus indiscernables.",
        why: "Les trois voies mènent alors à trois états finaux différents (le témoin diffère). Ce sont les probabilités qui s'ajoutent, et l'annulation disparaît : courbe en tirets." },
      complet: { prompt: "Un appareil T à 60° est grand ouvert. Il reçoit des atomes +S. Dans quel état en sortent-ils ?",
        options: { a: "Dans l'état +S, inchangés.", b: "Dans l'état +T.", c: "Un tiers dans chaque état de T.", d: "Dans un mélange au hasard des trois états de T." },
        why: "Un appareil idéal grand ouvert sépare puis recombine sans rien perturber : il ne fait rien. La somme sur les trois états de base de T redonne l'état de départ." },
      gamma: { prompt: "Pour T à 90° de S, que vaut γ = |⟨0S|0T⟩|² ?",
        options: { a: "1.", b: "1/2.", c: "0.", d: "1/3." },
        why: "|⟨0T|0S⟩|² = cos² α, nul à 90°. L'expérience (5.15) ne fait alors rien passer, même avec la seule voie 0T ouverte." },
      histoire: { prompt: "Deux faisceaux de même nombre d'atomes, l'un préparé en +S, l'autre en 0S, traversent un filtre 0T. À la sortie, peut-on les distinguer par une mesure quelconque ?",
        options: { a: "Oui, par un filtre S.", b: "Oui, par la phase des atomes.", c: "Oui, par leur vitesse.", d: "Non, seulement par leur nombre : tous les atomes sont dans l'état 0T." },
        why: "L'avenir d'un atome ne dépend que de son état de base actuel. Le faisceau venu de +S compte |⟨0T|+S⟩|² N atomes, l'autre |⟨0T|0S⟩|² N ; au-delà de ce nombre, rien ne les distingue." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-4 (texte original en anglais). Notations SI. Dirac, The Principles of Quantum Mechanics (1930) ; von Neumann, Mathematische Grundlagen der Quantenmechanik (1932) ; Margalit et al., « Realization of a complete Stern-Gerlach interferometer » (2018) ; Keil et al., « Stern-Gerlach interferometry with the atom chip » (2020). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les états à dépendance angulaire » (Feynman III.19.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/etats-dependance-angulaire.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les états à dépendance angulaire",
    "crumb.jour": "Les états à dépendance angulaire",
    "h1": "Les états à dépendance angulaire",
    "lede": "La plupart des états de l'hydrogène ne sont pas sphériques : leur amplitude dépend de la direction. Pas besoin de résoudre une équation aux dérivées partielles pour trouver comment : le moment cinétique orbital se conserve, et la matrice de rotation donne la dépendance angulaire toute faite. Ce sont les harmoniques sphériques.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les solutions à symétrie sphérique",
    "eq.cos": "cos",
    "eq.sin": "sin",

    "s1.sec": "Le raisonnement",
    "s1.h2": "Regarder l'atome depuis la direction voulue",
    "s1.p1": "Le système : l'électron de l'atome d'hydrogène, dans un potentiel qui ne dépend que de <var>r</var>. Le moment cinétique orbital se conserve : les états d'énergie définie peuvent être choisis avec un <var>l</var> et un <var>m</var> définis, <var>l</var> entier. Que vaut l'amplitude d'un état |<var>l</var>, <var>m</var>⟩ en un point de direction (θ, ϕ) ?",
    "s1.p2": "Tournons le repère pour que son axe <var>z</var>′ passe par ce point. Le long de <var>z</var>′, la particule n'a pas de moment orbital selon <var>z</var>′ : seule la composante <var>m</var>′ = 0 de l'état peut avoir une amplitude non nulle sur l'axe, comme dans « La mesure d'un spin nucléaire ». L'amplitude au point est donc l'amplitude d'être dans |<var>l</var>, 0⟩ selon <var>z</var>′, fois une fonction de <var>r</var> seul :",
    "val.19.32": "Exacte pour tout potentiel central, dans le modèle sans spin : la forme angulaire ne dépend que de <var>l</var> et <var>m</var>, pas du potentiel. Seule <var>F<sub>l</sub></var>(<var>r</var>) en dépend ; pour l'hydrogène, c'est le sujet de « La solution générale de l'hydrogène ».",

    "s2.sec": "Les harmoniques sphériques",
    "s2.h2": "Des éléments de la matrice de rotation",
    "s2.p1": "Ces éléments de matrice, à un facteur près, portent un nom : les harmoniques sphériques. Avec la normalisation habituelle, ∫|<var>Y</var>|<sup>2</sup>dΩ = 1 sur la sphère :",
    "val.19.34": "Exacte : définition des <var>Y<sub>l,m</sub></var>, dans la convention de signe de Feynman pour les rotations. D'autres livres changent le signe des <var>Y<sub>l,m</sub></var> à <var>m</var> impair : les densités |<var>Y</var>|<sup>2</sup> sont les mêmes.",
    "s2.p2": "Pour <var>l</var> = 1, la matrice de rotation du spin 1 donne les trois amplitudes, où <var>R</var> désigne <var>R<sub>y</sub></var>(θ)<var>R<sub>z</sub></var>(ϕ) :",
    "val.19.36": "Exactes : éléments de la matrice de rotation du spin 1, avec la phase <var>e<sup>imϕ</sup></var> de la rotation autour de <var>z</var>. L'état <var>m</var> = 0 est allongé selon <var>z</var>, comme <var>z</var>/<var>r</var> ; les états <var>m</var> = ±1 sont des anneaux autour de <var>z</var>.",

    "s3.sec": "Explorer les formes",
    "s3.h2": "s, p, d, f",
    "s3.p1": "Le diagramme donne |<var>Y<sub>l,m</sub></var>|<sup>2</sup> dans un plan qui contient l'axe <var>z</var> : la distance au centre est la densité dans cette direction. Comme elle ne dépend pas de ϕ, la figure dans l'espace est ce profil tourné autour de <var>z</var>. La couleur donne le signe de la partie réelle de l'amplitude, à ϕ = 0 à droite et à ϕ = π à gauche.",
    "fig.aria": "Diagramme polaire du carré du module de l'harmonique sphérique choisie dans un plan méridien, coloré selon le signe de l'amplitude",
    "fig.legend.pos": "amplitude réelle positive",
    "fig.legend.neg": "amplitude réelle négative",
    "fig.l": "Moment cinétique orbital l",
    "fig.b.s": "s, l = 0",
    "fig.b.p": "p, l = 1",
    "fig.b.d": "d, l = 2",
    "fig.b.f": "f, l = 3",
    "fig.m": "Composante m",
    "fig.z": "z",
    "fig.k.etats": "États de même l",
    "fig.f.etats": "orbitales {lettre} ; parité {p}",
    "fig.k.norme": "∫ |<var>Y</var>|<sup>2</sup> dΩ",
    "fig.f.norme": "normée sur la sphère",
    "fig.caption": "|<var>Y<sub>l,m</sub></var>|<sup>2</sup> a <var>l</var> \u2212 |<var>m</var>| cônes nodaux, où la densité s'annule. L'inversion change θ en π \u2212 θ et ϕ en ϕ + π : la figure de gauche est celle de droite retournée de haut en bas, avec le signe (\u22121)<sup><var>l</var></sup>. Les valeurs de |<var>m</var>| plus grandes que <var>l</var> sont ramenées à <var>l</var>.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Ce qui vient de la symétrie seule",
    "s4.p1": "Rien de ce qui précède ne dépend de la forme 1/<var>r</var> du potentiel : seule compte la symétrie sphérique. La dépendance angulaire est donc la même pour tout atome dont on traite un électron dans un potentiel central moyen, à la petite brisure de symétrie près des autres électrons.",
    "sys.title": "Compter les états",
    "sys1.body": "La somme des |<var>Y</var><sub>2,<var>m</var></sub>|<sup>2</sup> sur les cinq valeurs de <var>m</var> est la même dans toutes les directions : 4π fois cette somme vaut {s}, soit 2<var>l</var> + 1. Une couche pleine est sphérique, ce qui simplifie les atomes à couches complètes.",
    "sys2.body": "Avec ses deux états de spin, une couche <var>d</var> accueille {n} électrons. C'est la règle de remplissage que reprend « Le tableau périodique ».",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des fonctions de la gravitation",
    "hist.intro": "Les harmoniques sphériques ont été inventées pour décrire le champ de gravitation de corps non sphériques, bien avant les orbitales.",
    "hist.events": {
      laplace: { who: "Pierre-Simon de Laplace", what: "introduit les harmoniques sphériques dans son étude du potentiel de gravitation.", context: "Le potentiel d'une masse de forme quelconque, vu de loin, se décompose en une somme de termes de chaque l, comme la fonction d'onde de cette leçon." },
      kelvin: { who: "William Thomson (Lord Kelvin) et Peter Guthrie Tait", what: "donnent le nom d'« harmoniques sphériques » dans leur « Treatise on Natural Philosophy ».", context: "Ils introduisent aussi les harmoniques solides, produits de r^l par une harmonique sphérique." },
      gruppentheorie: { who: "Eugene Wigner", what: "publie son livre de théorie des groupes appliquée aux spectres atomiques.", context: "Il y donne l'expression générale des matrices de rotation ; les harmoniques sphériques en sont des éléments particuliers, ce que dit (19.34)." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      fond: { name: "Le fond diffus cosmologique et les images de synthèse", text: "Les cartes du rayonnement fossile du ciel entier se décomposent en harmoniques sphériques ; leur spectre selon <var>l</var> donne les paramètres cosmologiques. En géodésie, le champ de gravité et le géoïde terrestres sont décrits de la même façon. En synthèse d'images, les harmoniques de bas <var>l</var> servent à calculer vite l'éclairage indirect." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      direction: { prompt: "Pourquoi l'amplitude d'un état |l, m⟩ dans la direction (θ, ϕ) est-elle l'amplitude d'être dans l'état |l, 0⟩ selon un axe z′ pointé dans cette direction ?",
        options: { a: "Parce qu'une particule sur l'axe z′ n'a pas de moment orbital selon z′ : seule la composante m′ = 0 peut y avoir une amplitude.", b: "Parce que m est toujours nul.", c: "Parce que l'électron est sur l'axe z.", d: "Parce que le potentiel est nul sur l'axe." },
        why: "Le moment orbital r × p n'a pas de composante le long de r. Sur l'axe z′, seul |l, 0⟩′ contribue, et l'amplitude est ⟨l, 0|R|l, m⟩, l'élément de la matrice de rotation." },
      seul: { prompt: "De quoi la dépendance angulaire d'un état |l, m⟩ dépend-elle ?",
        options: { a: "De la forme 1/r du potentiel.", b: "De l'énergie de l'état.", c: "Seulement de l et m : elle est la même pour tout potentiel central.", d: "De la masse de l'électron." },
        why: "Le raisonnement n'utilise que la conservation du moment cinétique. Le potentiel n'entre que dans la fonction radiale F_l(r)." },
      entier: { prompt: "Pourquoi l est-il entier pour le moment cinétique orbital ?",
        options: { a: "Par convention.", b: "Parce que l'électron a un spin 1/2.", c: "Parce que les états sont normés.", d: "Parce que la fonction d'onde doit revenir à elle-même quand on tourne de 360° autour de z : e^(im 2π) = 1 impose m entier, donc l entier." },
        why: "La phase e^(imϕ) doit être la même en ϕ et ϕ + 2π, car c'est le même point de l'espace. Un spin demi-entier change de signe en un tour : impossible pour une fonction de la position." },
      compte: { prompt: "Combien y a-t-il d'états p, et combien d'états f, pour une fonction radiale donnée ?",
        options: { a: "1 et 3.", b: "3 et 7 : 2l + 1 valeurs de m.", c: "2 et 6.", d: "3 et 5." },
        why: "m va de \u2212l à l : 3 pour l = 1, 7 pour l = 3. Avec le spin, une couche p accueille 6 électrons, une couche f, 14." },
      parite: { prompt: "Quelle est la parité d'un état d ?",
        options: { a: "+1 : la parité d'un état de moment orbital l vaut (\u22121)^l.", b: "\u22121.", c: "Elle dépend de m.", d: "Elle n'est pas définie." },
        why: "L'inversion change θ en π \u2212 θ et ϕ en ϕ + π ; Y_lm prend le facteur (\u22121)^l. Un état d, l = 2, est pair ; un état p, impair. C'est la règle des transitions dipolaires : Δl = ±1 change la parité." },
      nom: { prompt: "À quoi correspondent les lettres s, p, d, f ?",
        options: { a: "À n = 1, 2, 3, 4.", b: "À la parité.", c: "À l = 0, 1, 2, 3.", d: "Au spin." },
        why: "s pour l = 0, un état ; p pour l = 1, trois ; d pour l = 2, cinq ; f pour l = 3, sept ; puis g, h, … (Table 19-1 de la source)." },
      norme: { prompt: "Pourquoi le facteur a = √(4π/(2l + 1)) dans la définition des Y_lm ?",
        options: { a: "Pour que Y soit réel.", b: "Pour que Y_00 = 1.", c: "Pour changer la parité.", d: "Pour que ∫|Y|² dΩ = 1 sur la sphère : l'élément de matrice de rotation, lui, a une moyenne de |·|² égale à 1/(2l + 1)." },
        why: "La somme des |⟨l, 0|R|l, m⟩|² sur m vaut 1 (unitarité) en tout point ; intégrée sur 4π stéradians et répartie sur 2l + 1 états, chaque état a 4π/(2l + 1). Diviser par a ramène chaque intégrale à 1. La figure le vérifie." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 19, §19-3 (texte original en anglais), et sa Table 19-1 pour les lettres s, p, d, f. Laplace, Thomson et Tait, usages actuels : Wikipédia, « Spherical harmonics ». Wigner : Wikipédia, « Wigner D-matrix ». Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

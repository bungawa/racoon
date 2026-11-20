/* Leçon « La diffusion par les imperfections du réseau » (Feynman III.13.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/diffusion-imperfections-reseau.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La diffusion par les imperfections du réseau",
    "crumb.jour": "Diffusion par une imperfection",
    "h1": "La diffusion par les imperfections du réseau",
    "lede": "Un réseau parfait laisse passer l'électron sans le freiner. Remplaçons un seul atome par un atome étranger : l'onde qui arrive est en partie réfléchie, en partie transmise. Une seule équation donne la part de chacune, et elle conserve exactement le nombre d'électrons.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les autres états d'un réseau",
    "eq.sin": "sin",

    "s1.sec": "1 · Une impureté sur la chaîne",
    "s1.h2": "Une onde incidente, une réfléchie, une transmise",
    "s1.p1": "On reprend la chaîne de la leçon « Les états d'énergie définie dans un réseau », et l'on change un atome, en <var>n</var> = 0 : l'électron y a l'énergie <var>E</var><sub>0</sub> + <var>F</var> au lieu de <var>E</var><sub>0</sub>. On garde la même amplitude de saut partout. Loin de l'impureté, les équations (13.6) sont celles de la chaîne parfaite, et leurs solutions d'énergie <var>E</var> sont des ondes e<sup>±i<var>k</var><var>x</var></sup>, avec <var>E</var> = <var>E</var><sub>0</sub> \u2212 2<var>A</var> cos <var>k</var><var>b</var>. On cherche l'état où une onde arrive de la gauche, d'amplitude 1, et où rien n'arrive de la droite :",
    "val.13.32": "Exacte : la forme générale d'une solution d'énergie <var>E</var> de la chaîne parfaite, de chaque côté de l'impureté, avec l'onde incidente choisie d'amplitude 1 et aucune onde venant de droite. Le modèle reste celui de (13.3) : plus proches voisins, atomes fixes ; et un seul atome change, avec la même amplitude de saut <var>A</var> vers ses voisins.",
    "s1.p2": "Restent à écrire les équations des atomes \u22121, 0 et +1, qui voient l'impureté. Celles des atomes \u22121 et +1 donnent d'abord <var>a</var><sub>0</sub> = 1 + β et <var>a</var><sub>0</sub> = γ, donc :",
    "val.13.36": "Exacte dans ce modèle : l'onde transmise est la somme de l'incidente et de la réfléchie, prises sur l'atome 0. C'est propre à une impureté sur un seul atome qui garde l'amplitude de saut <var>A</var> ; un défaut étendu, ou qui change aussi le saut, ne la vérifie pas.",
    "s1.p3": "L'équation de l'atome 0 donne alors β :",
    "val.13.37": "Exacte dans ce modèle, pour toute énergie de la bande, 0 < <var>k</var><var>b</var> < π. Elle ne vaut que pour un électron seul : dans un métal, les autres électrons écrantent l'impureté et changent <var>F</var>, que l'on prend comme un paramètre.",
    "val.13.38": "Exacte : conséquence de (13.36) et (13.37), vérifiable à la main. Rien ne se perd : la probabilité de réflexion et celle de transmission font 1, parce qu'une onde de même <var>k</var> transporte le même flux d'électrons des deux côtés.",

    "s2.sec": "2 · Ce que réfléchit une impureté",
    "s2.h2": "Les bords de la bande réfléchissent tout",
    "s2.p1": "|β|<sup>2</sup> = <var>F</var><sup>2</sup>/(<var>F</var><sup>2</sup> + 4<var>A</var><sup>2</sup> sin<sup>2</sup> <var>k</var><var>b</var>). Faites varier <var>F</var> et <var>k</var> :",
    "fig.aria": "Probabilités de réflexion et de transmission d'un électron par une impureté, en fonction du nombre d'onde",
    "fig.legend.r": "réflexion |β|²",
    "fig.legend.t": "transmission |γ|²",
    "fig.xaxis": "kb (rad)",
    "fig.yaxis": "probabilité",
    "fig.f": "Écart d'énergie de l'impureté, F (A = 1 eV)",
    "fig.k": "Nombre d'onde, kb (rad)",
    "fig.k.r": "Réflexion |β|²",
    "fig.f.r": "(13.37)",
    "fig.k.t": "Transmission |γ|²",
    "fig.f.t": "somme {s}, (13.38)",
    "fig.k.e": "Énergie de l'électron, E \u2212 E₀",
    "fig.f.e": "dans la bande, de \u22122 à 2 eV",
    "fig.caption": "La réflexion est la plus faible au milieu de la bande, <var>k</var><var>b</var> = π/2, là où l'électron va le plus vite ; elle tend vers 1 aux deux bords, où la vitesse s'annule. Changez le signe de <var>F</var> : un puits et une bosse de même profondeur réfléchissent autant.",
    "s2.p2": "Une impureté faible, |<var>F</var>| ≪ 2<var>A</var>, réfléchit une fraction (<var>F</var>/2<var>A</var> sin <var>k</var><var>b</var>)<sup>2</sup> : en carré de <var>F</var>, donc très peu. Une impureté forte, |<var>F</var>| ≫ 2<var>A</var>, réfléchit presque tout. Entre les deux, chaque impureté renvoie une partie des électrons : c'est l'origine de la résistance résiduelle d'un métal, celle qui reste à basse température quand les atomes ne vibrent presque plus. Ce que fait une impureté qui attire assez l'électron pour le garder est le sujet de la leçon « Le piégeage par une imperfection du réseau ».",

    "s3.sec": "Décrire le système",
    "s3.h2": "Des impuretés rares",
    "s3.p1": "Deux nombres décident du résultat : <var>F</var>/2<var>A</var>, la force de l'impureté contre la largeur de bande, et la fraction <var>c</var> d'atomes étrangers, qui fixe la distance entre deux diffusions. Tant que cette distance dépasse de beaucoup la longueur d'onde, chaque impureté diffuse seule.",
    "sys.title": "Le système décrit : <var>A</var> = 1\u00a0eV, <var>F</var> = 0,3\u00a0eV, un atome étranger sur 10⁴",
    "sys1.body": "Au milieu de la bande, l'impureté réfléchit |β|<sup>2</sup> ≈ {R}, proche de (<var>F</var>/2<var>A</var>)<sup>2</sup> = {F2} : une diffusion faible.",
    "sys2.body": "Sur une chaîne, l'électron rencontre une impureté tous les 10⁴ atomes et n'est réfléchi qu'une fois sur 1/|β|<sup>2</sup> : il parcourt environ {n} atomes, soit {l}, avant d'être renvoyé. C'est un ordre de grandeur à une dimension ; en trois dimensions, la diffusion se fait dans toutes les directions et le calcul change.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "La résistance vient du désordre",
    "hist.intro": "On a mesuré l'effet des impuretés sur la résistance des métaux bien avant de savoir pourquoi un métal pur n'en a presque pas.",
    "hist.events": {
      matthiessen: { who: "Augustus Matthiessen", what: "étudie la résistance des métaux et de leurs alliages, et constate que l'effet d'une impureté s'ajoute à celui de la température.", context: "La règle qui porte son nom additionne les causes de diffusion indépendantes." },
      bloch: { who: "Felix Bloch", what: "montre qu'un électron se propage sans résistance dans un réseau parfait.", context: "Zeitschrift für Physik, vol. 52. La résistance vient donc des écarts à la périodicité : vibrations et impuretés." },
      anderson: { who: "Philip Anderson", what: "montre qu'un désordre assez fort empêche l'onde de l'électron de se propager : elle reste localisée.", context: "Physical Review, vol. 109, « Absence of Diffusion in Certain Random Lattices ». À une et deux dimensions, tout désordre suffit." },
      billy: { who: "Billy et ses collègues, et indépendamment Roati et ses collègues", what: "observent la localisation d'une onde de matière dans un potentiel désordonné à une dimension.", context: "Deux articles dans Nature, avec des condensats de Bose-Einstein." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      mobilite: { name: "La mobilité des porteurs", text: "Dans un semi-conducteur dopé, les atomes ajoutés diffusent les porteurs et limitent leur mobilité. La règle de Matthiessen sert encore à séparer cette diffusion de celle des vibrations du réseau, avec une limite connue : elle échoue quand les deux causes de diffusion ne sont pas indépendantes." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      conserve: { prompt: "Que dit |β|² + |γ|² = 1 ?",
        options: { a: "Que l'impureté absorbe une partie des électrons.", b: "Qu'un électron qui arrive est soit réfléchi, soit transmis : rien ne se perd.", c: "Que l'onde transmise a la même énergie que l'impureté.", d: "Que la réflexion est toujours totale." },
        why: "C'est la conservation du nombre d'électrons : la probabilité incidente, 1, se partage entre réflexion et transmission." },
      faible: { prompt: "A = 1 eV, F = 0,2 eV, kb = π/2. Quelle fraction des électrons est réfléchie ?",
        options: { a: "Environ 1 % : F²/(F² + 4A²) = 0,04/4,04.", b: "20 %.", c: "50 %.", d: "Aucune." },
        hint: "Au milieu de la bande, sin kb = 1.",
        why: "|β|² = F²/(F² + 4A² sin² kb) = 0,04/4,04 ≈ 0,0099. Une impureté faible diffuse en F², très peu." },
      signe: { prompt: "On remplace une impureté F = +0,5 eV par F = \u22120,5 eV. La réflexion :",
        options: { a: "double.", b: "devient nulle.", c: "devient totale.", d: "ne change pas : |β|² ne dépend que de F²." },
        why: "|β|² = F²/(F² + 4A² sin² kb). Une bosse et un puits de même hauteur réfléchissent autant ; seule la phase de β change." },
      bord: { prompt: "Pourquoi une impureté réfléchit-elle presque tout près des bords de la bande ?",
        options: { a: "Parce que l'énergie y est plus grande que F.", b: "Parce que l'électron y change de charge.", c: "Parce que sin kb y tend vers 0 : l'électron va très lentement, et la moindre impureté le renvoie.", d: "Parce que la bande y est interdite." },
        why: "|β|² → 1 quand sin kb → 0. La vitesse de groupe 2Ab sin(kb)/ℏ s'annule aux bords : un électron lent est très sensible au défaut." },
      somme: { prompt: "Dans ce modèle, l'onde transmise vérifie γ = 1 + β. Que dit cette relation ?",
        options: { a: "Que l'onde sur l'atome de l'impureté est la même vue de gauche, 1 + β, et de droite, γ.", b: "Que l'onde transmise est toujours plus grande que l'incidente.", c: "Qu'il n'y a pas de réflexion.", d: "Que l'énergie de l'électron change en passant l'impureté." },
        why: "Les équations des atomes \u22121 et +1 donnent a₀ = 1 + β et a₀ = γ. C'est particulier à une impureté d'un seul atome qui garde le saut A." },
      resistance: { prompt: "Pourquoi un métal garde-t-il une résistance à très basse température ?",
        options: { a: "Parce que les électrons heurtent les atomes du réseau parfait.", b: "Parce que les impuretés et défauts réfléchissent une partie des électrons, même quand les atomes ne vibrent plus.", c: "Parce que les électrons se repoussent.", d: "Parce que la bande se vide." },
        why: "Le réseau parfait ne freine pas l'électron. À basse température, les vibrations disparaissent ; restent les écarts à la périodicité, qui diffusent selon (13.37)." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 13, §13-6 (texte original en anglais). Notations SI. Matthiessen (1864) ; Bloch, Zeitschrift für Physik 52, 555 (1929) ; Anderson, Physical Review 109, 1492 (1958) ; Billy et coll., et Roati et coll., Nature (2008). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

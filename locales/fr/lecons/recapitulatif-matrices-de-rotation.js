/* Leçon « Récapitulatif des matrices de rotation » (Feynman III.17.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/recapitulatif-matrices-de-rotation.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Récapitulatif des matrices de rotation",
    "crumb.jour": "Les matrices de rotation",
    "h1": "Récapitulatif des matrices de rotation",
    "lede": "Tout ce qu'il faut savoir pour tourner un état de spin 1/2, de spin 1 ou un photon tient en quelques tableaux. Les rotations autour de z ne font que déphaser ; celles autour de y mélangent les états. Et un tour complet ne ramène pas toujours au point de départ.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la désintégration du lambda zéro",
    "eq.cos": "cos",
    "eq.sin": "sin",

    "s1.sec": "1 · Les tableaux",
    "s1.h2": "Autour de z, autour de y",
    "s1.p1": "Le système : une particule dont seul compte l'état de spin, décrit dans les états de base |<var>m</var>⟩ selon <var>z</var> d'un appareil <var>S</var>, et vu depuis un appareil <var>T</var> tourné. Les amplitudes ⟨<var>j</var><var>T</var>|<var>i</var><var>S</var>⟩ forment la matrice de rotation. Pour une rotation de φ autour de <var>z</var>, chaque état ne prend qu'une phase :",
    "val.rz": "Exacte : la définition de <var>m</var>, (17.22) de « Les lois de conservation quantiques ». <var>m</var> = ±1/2 pour le spin 1/2, +1, 0, \u22121 pour le spin 1, ±1 seulement pour le photon, qui n'a pas d'état 0. Le signe de la phase suit la convention de (17.22).",
    "s1.p2": "Pour une rotation de θ autour de <var>y</var>, lignes <var>j</var> pour <var>T</var>, colonnes <var>i</var> pour <var>S</var>, dans l'ordre +, (0), \u2212 :",
    "val.ry12": "Exacte : les amplitudes du spin 1/2, (12.54) de « La matrice de projection du spin 1 ».",
    "val.ry1": "Exacte : (5.38), démontrée à partir de deux spins 1/2 dans « La matrice de projection du spin 1 ». Une rotation quelconque se compose de rotations autour de <var>z</var> et de <var>y</var>.",
    "s1.p3": "Le photon n'a que les états <var>m</var> = ±1 le long de sa direction : une rotation autour de <var>y</var>, qui changerait sa direction de propagation, ne se décrit pas par une matrice 2 × 2 de ces seuls états. Pour un photon, seules les rotations autour de son axe de propagation ont un tableau simple, e<sup>±<var>i</var>φ</sup>.",

    "s2.sec": "2 · Faire tourner",
    "s2.h2": "Un tour, deux tours",
    "s2.p1": "Choisissez le spin et faites tourner l'appareil autour de <var>y</var>, jusqu'à deux tours. La courbe suit l'amplitude ⟨+<var>T</var>|+<var>S</var>⟩.",
    "fig.aria": "Amplitude de rester dans l'état plus en fonction de l'angle de rotation autour de y, jusqu'à 720 degrés, pour un spin un demi ou un spin un",
    "fig.legend.diag": "⟨+T|+S⟩",
    "fig.legend.signe": "un tour, 360°",
    "fig.s.d": "spin 1/2",
    "fig.s.u": "spin 1",
    "fig.t": "Angle θ autour de y",
    "fig.x": "θ (°)",
    "fig.y": "amplitude",
    "fig.k.p": "Probabilités depuis |+<var>S</var>⟩",
    "fig.f.p": "dans chaque état de T, de + à \u2212",
    "fig.k.u": "Écart de R<sup>T</sup>R à la matrice unité",
    "fig.f.u": "unitaire aux arrondis près",
    "tab.coin": "⟨jT|iS⟩",
    "fig.caption": "Pour le spin 1/2, l'amplitude vaut cos(θ/2) : \u22121 après un tour, +1 après deux. Pour le spin 1, elle vaut (1 + cos θ)/2 et revient à 1 après un seul tour. Les probabilités, elles, sont les mêmes après un tour dans les deux cas : le signe du spin 1/2 n'est visible que par une interférence.",
    "s2.p2": "Le signe \u22121 après un tour est une propriété de tout spin demi-entier. Il ne change aucune probabilité pour une particule seule, mais il se voit quand on fait interférer une partie tournée et une partie non tournée d'un même état.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Le spin et ses rotations",
    "hist.intro": "Le spin demi-entier, avec sa rotation à demi-angle, est entré en physique en quelques années.",
    "hist.events": {
      ug: { who: "George Uhlenbeck et Samuel Goudsmit", what: "proposent que l'électron possède un moment cinétique propre ħ/2.", context: "Die Naturwissenschaften, novembre 1925." },
      wigner: { who: "Eugene Wigner", what: "introduit les matrices de rotation des états de moment cinétique, pour tout spin.", context: "Elles portent aujourd'hui son nom ; cette page en donne les cas j = 1/2 et j = 1." },
      beth: { who: "Richard Beth", what: "mesure le moment cinétique ħ par photon de la lumière polarisée circulairement.", context: "Physical Review, vol. 50 : la phase e^(iφ) d'un photon droit dans une rotation se traduit en un couple mesurable." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      rmn: { name: "Impulsions de résonance", text: "En RMN et en IRM, chaque impulsion de champ tournant fait tourner les spins d'un angle choisi, 90° ou 180° ; les matrices de cette page disent l'état obtenu, et les séquences d'impulsions s'écrivent comme des produits de rotations." },
      particules: { name: "Distributions angulaires", text: "Les physiciens des particules prévoient les distributions angulaires des désintégrations, comme celle du Λ⁰, par ces matrices : chaque spin possible donne une forme, et la mesure tranche." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      tour: { prompt: "Que devient l'état |+⟩ d'un spin 1/2 après une rotation de 360° autour de y ?",
        options: { a: "\u2212|+⟩ : l'amplitude cos(θ/2) vaut \u22121 en θ = 2π.", b: "|+⟩.", c: "|\u2212⟩.", d: "0." },
        why: "cos(π) = \u22121, sin(π) = 0 : l'état prend un signe. Il faut deux tours pour revenir à +|+⟩." },
      photon: { prompt: "Quels états de base un photon a-t-il le long de sa direction, et comment se transforment-ils dans une rotation de φ autour de cette direction ?",
        options: { a: "Trois, m = +1, 0, \u22121, comme un spin 1.", b: "Deux, m = ±1/2.", c: "Deux, m = ±1, multipliés par e^(±iφ) ; pas d'état m = 0.", d: "Un seul." },
        why: "Une onde dans le vide n'a pas de champ le long de sa direction : il manque l'état 0. Les états droite et gauche prennent e^(±iφ)." },
      z: { prompt: "Pourquoi une rotation autour de z ne change-t-elle aucune probabilité pour des états de base selon z ?",
        options: { a: "Parce qu'elle est petite.", b: "Parce qu'elle ne fait que multiplier chaque état |m⟩ par une phase e^(imφ), de module 1.", c: "Parce que les spins sont alignés.", d: "Elle les change." },
        why: "La matrice est diagonale, de modules 1. Elle change les phases relatives, donc les probabilités selon d'autres axes, mais pas celles selon z." },
      prob: { prompt: "Un spin 1 dans |+S⟩ est mesuré dans un appareil tourné de 180° autour de y. Que trouve-t-on ?",
        options: { a: "+, 0, \u2212 avec 1/3 chacun.", b: "+ sûrement.", c: "0 sûrement.", d: "\u2212 sûrement : (1 \u2212 cos π)/2 = 1." },
        why: "À θ = π, la colonne de |+S⟩ vaut (0, 0, 1) : l'appareil retourné voit l'état comme son \u2212." },
      deux: { prompt: "Après un tour complet, le spin 1/2 a pris un signe \u22121. Comment ce signe pourrait-il se voir ?",
        options: { a: "Il ne se voit jamais.", b: "Par la mesure de la probabilité de |+⟩.", c: "Par une interférence entre une partie de l'état qu'on a fait tourner d'un tour et une partie qu'on n'a pas tournée.", d: "Par la masse de la particule." },
        why: "Un signe global est invisible, mais un signe relatif entre deux composantes d'une superposition change les interférences." },
      unit: { prompt: "Pourquoi les matrices de rotation sont-elles unitaires ?",
        options: { a: "Par convention.", b: "Parce que tourner l'appareil ne crée ni ne détruit de probabilité : un état normé reste normé, et des états orthogonaux le restent.", c: "Parce qu'elles sont réelles.", d: "Parce que θ est petit." },
        why: "Les probabilités d'un état dans la base T somment à 1, comme dans la base S. La figure vérifie RᵀR = 1 numériquement." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-6, tableaux 17-1 à 17-3 (texte original en anglais). Notations SI. Uhlenbeck et Goudsmit : article « Spin (physics) » de Wikipédia en anglais ; Wigner : article « Wigner D-matrix », même source ; Beth, Physical Review 50, 115 (1936). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Leçon « Le changement de base » (Feynman III.5.7) : textes en français.
   Une autre langue = locales/<langue>/lecons/changement-de-base-spin1.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le changement de base",
    "crumb.jour": "Changement de base",
    "h1": "Le changement de base",
    "lede": "Deux physiciens décrivent le même atome, l'un avec l'appareil S, l'autre avec l'appareil T tourné. Leurs trois nombres diffèrent, leurs prédictions non. Neuf amplitudes font passer d'une description à l'autre, et pour le spin 1 elles transforment les trois nombres comme les composantes d'un vecteur.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la machinerie de la mécanique quantique",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un état, deux jeux de nombres",
    "s1.p1": "Un atome est dans un état φ. Dans la base de <var>S</var>, on le décrit par C<sub>+</sub> = ⟨+<var>S</var>|φ⟩, C<sub>0</sub> = ⟨0<var>S</var>|φ⟩, C<sub>\u2212</sub> = ⟨\u2212<var>S</var>|φ⟩. Un autre physicien utilise un appareil <var>T</var> d'une autre orientation et écrit C′<sub>+</sub>, C′<sub>0</sub>, C′<sub>\u2212</sub>, les amplitudes ⟨<var>j</var><var>T</var>|φ⟩. Pour passer de l'un à l'autre, on glisse un appareil <var>S</var> grand ouvert :",
    "val.5.37": "Exacte : c'est (5.24) avec les états de base de <var>S</var>. Les neuf ⟨<var>j</var><var>T</var>|<var>i</var><var>S</var>⟩ ne dépendent que de l'orientation relative des deux appareils, pas de l'état φ. Elles supposent qu'il n'y a rien entre les deux descriptions, aucun champ : ce sont deux façons de regarder, au même instant, le même atome.",
    "s1.p2": "Les deux descriptions sont équivalentes : n'importe quelle probabilité calculée dans l'une se retrouve dans l'autre. La base de <var>S</var> n'a rien de privilégié. Le travail consiste à trouver la matrice de passage pour chaque rotation. On l'obtient en décomposant toute rotation en rotations autour de <var>y</var> et de <var>z</var>.",

    "s2.sec": "Les deux rotations",
    "s2.h2": "Autour de y, autour de z",
    "s2.p1": "Pour <var>T</var> tourné d'un angle α autour de l'axe <var>y</var> du jet, les neuf amplitudes, lignes +<var>T</var>, 0<var>T</var>, \u2212<var>T</var> et colonnes +<var>S</var>, 0<var>S</var>, \u2212<var>S</var>, sont :",
    "val.5.38": "Exacte pour un atome de spin 1 idéal : ce n'est pas une mesure mais une conséquence de la géométrie des rotations, qu'on peut aussi déduire de celle du spin 1/2. La convention de signe des colonnes, c'est-à-dire la phase choisie pour chaque état de base, est celle de Feynman ; une autre convention change des signes, pas les probabilités. Les probabilités utilisées dans « Expériences avec des atomes filtrés » en sont les carrés.",
    "eq.cos": "cos",
    "eq.sin": "sin",
    "s2.p2": "Pour <var>T</var> tourné d'un angle β autour de l'axe <var>z</var>, celui du champ de <var>S</var>, les voies restent les mêmes : l'atome qui était +<var>S</var> est +<var>T</var>. Seules les phases changent :",
    "val.5.39": "Exacte, à une phase commune près qu'on choisit nulle. Les probabilités ne changent pas : un appareil tourné autour de son propre axe de champ trie de la même façon. Les phases, elles, comptent dès qu'on combine cette rotation avec une autre.",
    "s2.p3": "Toute orientation de <var>T</var> s'obtient par une rotation autour de <var>z</var>, puis autour de <var>y</var>, puis de nouveau autour de <var>z</var>. Sa matrice est le produit des trois, dans l'ordre, par la règle (5.36). Deux matrices suffisent donc à tout calculer.",

    "s3.sec": "Une particule vectorielle",
    "s3.h2": "Trois amplitudes qui tournent comme un vecteur",
    "s3.p1": "Formons trois combinaisons des amplitudes :",
    "val.5.42": "Exacte : c'est une définition, et un choix de phases. Avec (5.38) et (5.39), ces trois nombres se transforment, quand on passe de <var>S</var> à <var>T</var>, exactement comme les coordonnées d'un vecteur fixe vues dans des axes tournés. Ils sont complexes en général : un état de spin 1 est un vecteur à composantes complexes, comme le champ électrique d'une onde polarisée.",
    "s3.p2": "Ci-dessous, l'état dont le vecteur (5.42) est le vecteur unité <var>n</var>⃗, dans le plan <var>x</var><var>z</var>, à l'angle θ de <var>z</var>. Tournez <var>T</var> : ses amplitudes C′ changent, et les composantes calculées par (5.42) à partir d'elles sont les projections de <var>n</var>⃗ sur les axes de <var>T</var>.",
    "fig.aria.axes": "Le vecteur n et les axes de S et de T dans le plan xz",
    "fig.legend.n": "vecteur n de l'état",
    "fig.legend.s": "axes de S",
    "fig.legend.t": "axes de T",
    "fig.x": "x",
    "fig.z": "z",
    "fig.xp": "x′",
    "fig.zp": "z′",
    "fig.theta": "Direction de n, θ",
    "fig.alpha": "T tourné autour de y, α",
    "fig.k.cs": "C<sub>+</sub> ; C<sub>0</sub> ; C<sub>\u2212</sub> (base S)",
    "fig.k.ct": "C′<sub>+</sub> ; C′<sub>0</sub> ; C′<sub>\u2212</sub> (base T)",
    "fig.k.vt": "C′<sub><var>x</var></sub> ; C′<sub><var>z</var></sub> par (5.42)",
    "fig.f.vt": "projections de n sur x′ et z′ : {x} ; {z}",
    "fig.k.p": "Probabilités +<var>T</var> ; 0<var>T</var> ; \u2212<var>T</var>",
    "fig.caption": "Quand l'axe <var>z</var>′ de <var>T</var> est le long de <var>n</var>⃗, l'atome sort par 0<var>T</var> à coup sûr : cet état est l'état 0 selon <var>n</var>⃗. Perpendiculaire, il se partage moitié par +<var>T</var>, moitié par \u2212<var>T</var>. Les amplitudes C′ sont réelles ici parce que <var>n</var>⃗ et la rotation restent dans le plan <var>x</var><var>z</var>.",
    "s3.p3": "C'est pourquoi une particule de spin 1 s'appelle une particule vectorielle. Le photon en est une, mais sans masse, et il n'a que deux états au lieu de trois. Le spin 1/2, lui, ne se laisse pas représenter par un vecteur ordinaire : il faut des objets à deux composantes qui changent de signe après un tour complet, l'objet de « La transformation des amplitudes ».",
    "sys.title": "Le système décrit : l'état 0 vu de côté",
    "sys1.body": "Un atome 0<var>S</var> a pour vecteur (5.42) l'axe <var>z</var> lui-même. Vu par un appareil <var>T</var> tourné de 90°, ses probabilités sont {p} : jamais 0<var>T</var>. La géométrie le dit sans calcul : <var>n</var>⃗ = <var>z</var> est perpendiculaire à <var>z</var>′, sa projection sur <var>z</var>′ est nulle.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Les matrices des rotations, des atomes aux bosons",
    "hist.intro": "Les tables de changement de base pour tous les spins viennent de la théorie des groupes ; elles servent à classer les particules.",
    "hist.events": {
      wigner: { who: "Eugene Wigner", what: "introduit les matrices qui portent son nom : les amplitudes de changement de base pour une rotation quelconque, pour tout spin.", context: "Les formules (5.38) et (5.39) en sont le cas du spin 1." },
      livre: { who: "Eugene Wigner", what: "publie Gruppentheorie und ihre Anwendungen auf die Quantenmechanik der Atomspektren.", context: "Le livre applique la théorie des groupes aux spectres des atomes." },
      wz: { who: "Deux expériences du CERN", what: "découvrent les bosons W, en janvier, puis le Z, en mai.", context: "Ce sont des particules de spin 1, des bosons vectoriels, avec trois états de spin parce qu'elles ont une masse. Carlo Rubbia et Simon van der Meer reçoivent le prix Nobel de physique en 1984." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      spineur: { name: "Condensats spinoriels", text: "En 1998, une équipe du MIT piège optiquement des condensats de Bose et Einstein de sodium sans figer leur spin : leur paramètre d'ordre devient un vecteur, et des domaines de spin apparaissent. Ces gaz de spin 1 servent depuis à étudier le magnétisme quantique ; leur état se décrit par les trois amplitudes de cette leçon." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      meme: { prompt: "Deux physiciens décrivent le même atome dans les bases de S et de T. Leurs prédictions pour un filtre R quelconque…",
        options: { a: "diffèrent, puisque leurs nombres diffèrent.", b: "sont identiques : leurs nombres sont reliés par (5.37), et le calcul passe par l'une ou l'autre base.", c: "sont identiques seulement si S et T sont parallèles.", d: "ne peuvent pas être comparées." },
        why: "⟨kR|φ⟩ = Σ ⟨kR|iS⟩⟨iS|φ⟩ = Σ ⟨kR|jT⟩⟨jT|φ⟩ : la somme sur une base complète donne le même nombre, quelle que soit la base." },
      z: { prompt: "T est tourné de 60° autour de z, l'axe du champ de S. Quelle fraction des atomes +S sort par +T ?",
        options: { a: "1/4.", b: "cos² 60°.", c: "Tous.", d: "Aucun." },
        why: "(5.39) : ⟨+T|+S⟩ = e^iβ, de module 1. Une rotation autour de l'axe du champ ne change que la phase." },
      vecteur: { prompt: "Pourquoi une particule de spin 1 est-elle dite « vectorielle » ?",
        options: { a: "Parce que trois combinaisons de ses amplitudes se transforment, d'une base à l'autre, comme les composantes d'un vecteur.", b: "Parce qu'elle se déplace.", c: "Parce qu'elle a un moment magnétique.", d: "Parce qu'elle a trois états d'énergie différents." },
        why: "C'est le sens de (5.42) : C_x, C_y, C_z tournent comme x, y, z. Un état de spin 1 est un vecteur, en général à composantes complexes." },
      phase: { prompt: "Changer le signe de l'état de base 0S dans toute la théorie change-t-il une probabilité mesurable ?",
        options: { a: "Oui, toutes.", b: "Oui, celles qui passent par 0S.", c: "Oui, mais seulement à 90°.", d: "Non : les signes de (5.38) changent, les modules non, et les produits qui interfèrent changent de façon cohérente." },
        why: "La phase de chaque état de base est une convention. Elle change des signes dans les tables, pas les prédictions, pourvu qu'on garde la même partout." },
      retour: { prompt: "Que vaut ⟨+S|0T⟩ pour T tourné de α autour de y ?",
        options: { a: "+sin α/√2, comme ⟨+T|0S⟩.", b: "\u2212sin α/√2, le conjugué de ⟨0T|+S⟩.", c: "cos α.", d: "(1 + cos α)/2." },
        why: "Par (5.26), ⟨+S|0T⟩ = ⟨0T|+S⟩* = \u2212sin α/√2, réel. C'est aussi ce que donne la rotation inverse, \u2212α, dans (5.38) : ⟨+T|0S⟩ à l'angle \u2212α vaut \u2212sin α/√2." },
      proba: { prompt: "L'état dont le vecteur (5.42) est n, à 30° de z dans le plan xz, est analysé par T dont l'axe z′ est le long de n. Où sortent les atomes ?",
        options: { a: "Tous par 0T.", b: "Tous par +T.", c: "Un tiers par chaque voie.", d: "La moitié par +T, la moitié par \u2212T." },
        why: "Le vecteur n est l'axe z′ : C′_z = C′₀ = 1, et C′_+ = C′_\u2212 = 0. C'est l'état 0 selon n." },
      nom: { prompt: "Quelles deux rotations suffisent à construire toutes les matrices de changement de base du spin 1 ?",
        options: { a: "Autour de x et de y.", b: "Une seule, autour de y.", c: "Autour de y et de z, composées par produit de matrices.", d: "Il en faut une infinité." },
        why: "Toute orientation s'obtient par z, puis y, puis z. Avec (5.38), (5.39) et la règle (5.36), on a toutes les matrices." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-7 (texte original en anglais). Notations SI. Wigner, Gruppentheorie (1931) ; CERN (1983) ; Stenger et al., Nature, vol. 396 (1998). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

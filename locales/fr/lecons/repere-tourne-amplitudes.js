/* Leçon « La transformation vers un repère tourné » (Feynman III.6.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/repere-tourne-amplitudes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La transformation vers un repère tourné",
    "crumb.jour": "Repère tourné",
    "h1": "La transformation vers un repère tourné",
    "lede": "Tourner un appareil, puis le tourner encore, c'est le tourner une fois d'un angle composé. Les matrices des amplitudes doivent suivre, mais seulement à une phase près. En imposant un déterminant égal à 1, on fixe cette phase, sauf un signe qui va se révéler physique.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la transformation des amplitudes",

    "s1.sec": "Décrire le système",
    "s1.h2": "Trois appareils, deux rotations",
    "s1.p1": "Trois appareils de Stern et Gerlach : <var>S</var>, puis <var>T</var> tourné par rapport à <var>S</var>, puis <var>U</var> tourné par rapport à <var>T</var>. On passe de <var>S</var> à <var>T</var> par la matrice <var>R</var><sup><var>T</var><var>S</var></sup>, de <var>T</var> à <var>U</var> par <var>R</var><sup><var>U</var><var>T</var></sup>. On peut aussi aller directement de <var>S</var> à <var>U</var>, par la rotation composée. Passer par <var>T</var> grand ouvert ne change rien, donc :",
    "val.6.11": "Exacte si chaque matrice est la vraie matrice des amplitudes ⟨<var>k</var><var>U</var>|<var>i</var><var>S</var>⟩, phases comprises, et si rien ne marque l'état dans <var>T</var>. C'est la règle (5.36) du produit, appliquée à des changements de base.",
    "s1.p2": "Mais chaque physicien est libre de multiplier sa matrice par une phase : aucune mesure ne la fixe. Si l'on calcule chaque matrice d'après la seule rotation, sans savoir comment l'autre physicien a choisi sa phase, la composition n'est plus vraie qu'à une phase près :",
    "val.6.12": "Exacte : δ est une phase commune, qui ne change aucune probabilité. Elle vaut ici la somme des phases arbitraires des deux matrices. Elle n'a de sens que pour la cohérence du calcul : deux suites de rotations qui mènent au même appareil doivent donner la même matrice, et c'est δ qui l'empêche.",

    "s2.sec": "La forme standard",
    "s2.h2": "Un déterminant égal à 1",
    "s2.p1": "Prenons le déterminant de (6.12). Celui d'un produit est le produit des déterminants, et une matrice 2 × 2 multipliée par e<sup><var>i</var>δ</sup> a son déterminant multiplié par e<sup>2<var>i</var>δ</sup> :",
    "val.6.13": "Exacte : propriété du déterminant d'une matrice 2 × 2. Pour une matrice de rotation sans perte, le déterminant a un module 1 ; seule sa phase porte l'arbitraire.",
    "s2.p2": "Il suffit donc de diviser chaque matrice par la racine carrée de son déterminant. Les matrices ainsi normées, de déterminant 1, se composent sans phase parasite :",
    "eq.det": "det",
    "eq.std": "standard",
    "val.6.15": "Exacte, au signe près : une racine carrée a deux valeurs opposées, et <var>R</var> et \u2212<var>R</var> ont toutes deux un déterminant égal à 1. La forme standard fixe la phase de <var>R</var> à un signe près, pas davantage. Ce signe ne change aucune probabilité pour une rotation donnée ; il compte quand on compare deux rotations qui mènent au même appareil.",
    "s2.p3": "Désormais, on écrit toutes les matrices du spin 1/2 sous cette forme standard. Il reste un signe libre. « Les rotations autour de l'axe z » montre qu'on ne peut pas s'en débarrasser : une rotation de 360° donne \u22121.",

    "s3.sec": "La phase parasite, à la main",
    "s3.h2": "Composer deux rotations autour de z",
    "s3.p1": "Deux rotations autour de <var>z</var>, φ<sub>1</sub> puis φ<sub>2</sub>. Chaque matrice, celle de « Les rotations autour de l'axe z », reçoit une phase choisie par son auteur, δ<sub>1</sub> et δ<sub>2</sub>. On compare leur produit à la matrice directe de φ<sub>1</sub> + φ<sub>2</sub>, d'abord brut, puis après mise en forme standard de chaque matrice.",
    "fig.aria.phases": "Phase du produit brut, du produit standard et du déterminant, dans le plan complexe",
    "fig.lab.brut": "produit brut / direct",
    "fig.lab.std": "produit standard / direct",
    "fig.lab.det": "det R(S→T)",
    "fig.f1": "Première rotation, φ₁",
    "fig.f2": "Seconde rotation, φ₂",
    "fig.d1": "Phase choisie pour R(S→T), δ₁",
    "fig.d2": "Phase choisie pour R(T→U), δ₂",
    "fig.k.brut": "Phase du produit brut, e<sup><var>i</var>δ</sup>",
    "fig.f.brut": "δ₁ + δ₂ = {d}°",
    "fig.k.det": "Phases de det <var>R</var><sup><var>T</var><var>S</var></sup> ; det <var>R</var><sup><var>U</var><var>T</var></sup>",
    "fig.k.std": "Produit standard / direct",
    "fig.f.std": "+1 ou \u22121 : le signe reste libre",
    "fig.caption": "Le produit brut diffère de la matrice directe par la phase δ<sub>1</sub> + δ<sub>2</sub>, n'importe laquelle. Une fois chaque matrice normée par la racine de son déterminant, il ne reste qu'un signe : +1 ou \u22121, selon la branche de la racine. Faites varier δ<sub>1</sub> : le signe bascule d'un coup quand 2δ<sub>1</sub> passe ±180°.",
    "s3.p2": "Le calcul n'a rien de propre au spin 1/2. Ce qui l'est, c'est qu'il n'y a que deux états : le déterminant d'une matrice 2 × 2 change comme e<sup>2<var>i</var>δ</sup>, et sa racine laisse un signe. Pour le spin 1, des matrices 3 × 3, la racine cubique laisserait trois choix.",
    "sys.title": "Le système décrit : deux demi-tours",
    "sys1.body": "Deux rotations standard de 180° autour de <var>z</var> donnent, multipliées, l'élément ⟨+|<var>R</var>|+⟩ = {a}. La rotation directe de 360° a la même matrice. Les deux appareils, <var>U</var> et <var>S</var>, sont pourtant orientés de la même façon : la forme standard dit que leurs amplitudes diffèrent d'un signe.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Composer les rotations : une algèbre plus vieille que les quanta",
    "hist.intro": "Les matrices standard du spin 1/2 sont, à une notation près, un objet du XIX<sup>e</sup> siècle, inventé pour composer des rotations.",
    "hist.events": {
      rodrigues: { who: "Olinde Rodrigues", what: "publie les lois géométriques des déplacements d'un solide, dont une formule qui compose deux rotations.", context: "Ses paramètres décrivent une rotation par son axe et la moitié de son angle : la même moitié d'angle que dans les amplitudes du spin 1/2." },
      hamilton: { who: "William Rowan Hamilton", what: "commence à publier dans le Philosophical Magazine sa série « On quaternions », nouvelles quantités imaginaires.", context: "Un quaternion unité décrit une rotation, et q et \u2212q décrivent la même : c'est le signe libre de la forme standard." },
      pauli: { who: "Wolfgang Pauli", what: "écrit l'état de spin de l'électron comme une fonction à deux composantes et introduit les matrices qui portent son nom.", context: "Les matrices 2 × 2 de déterminant 1 qui transforment ces deux composantes sont celles de cette leçon." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      quaternions: { name: "Orientation en informatique graphique, en robotique et en navigation", text: "Les logiciels qui composent des rotations, en informatique graphique, en robotique, en navigation ou en dynamique du vol, les représentent souvent par des quaternions unités : quatre nombres, sans singularité, que l'on multiplie pour composer. Chaque rotation y a deux représentants opposés, comme une matrice standard du spin 1/2." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      compose: { prompt: "Pourquoi R(S→U) doit-il être le produit R(T→U) R(S→T) ?",
        options: { a: "Par définition des matrices.", b: "Parce que les rotations commutent.", c: "Parce qu'un appareil T grand ouvert placé entre S et U ne change rien, et découpe le changement de base en deux étapes.", d: "Parce que les déterminants valent 1." },
        why: "C'est la loi de composition sur la base de T. Elle vaut pour les vraies amplitudes, phases comprises : (6.11)." },
      phase: { prompt: "Deux physiciens écrivent chacun leur matrice avec une phase arbitraire. Que devient la composition ?",
        options: { a: "Elle vaut à une phase commune e^iδ près : (6.12).", b: "Elle devient fausse.", c: "Elle reste exacte.", d: "Elle change les probabilités." },
        why: "Une phase arbitraire sur chaque matrice se retrouve sur le produit. Les probabilités ne changent pas, mais deux chemins vers le même appareil donnent des matrices différentes." },
      det: { prompt: "On multiplie une matrice 2 × 2 par e^iδ. Par quoi son déterminant est-il multiplié ?",
        options: { a: "e^iδ.", b: "1.", c: "e^\u2212iδ.", d: "e^2iδ." },
        why: "Le déterminant est un produit de deux éléments : chacun porte e^iδ. Pour n × n, ce serait e^niδ." },
      signe: { prompt: "Après normalisation par √(det R), quel arbitraire reste-t-il ?",
        options: { a: "Aucun.", b: "Un signe : R et \u2212R ont toutes deux un déterminant égal à 1.", c: "Une phase quelconque.", d: "Un facteur réel quelconque." },
        why: "det(\u2212R) = (\u22121)² det R = det R pour une matrice 2 × 2. La racine carrée a deux valeurs : la forme standard est définie au signe près." },
      ordre: { prompt: "Dans R(T→U) R(S→T), quelle rotation a eu lieu en premier ?",
        options: { a: "Celle de S à T, écrite à droite.", b: "Celle de T à U, écrite à gauche.", c: "Les deux en même temps.", d: "L'ordre n'a pas de sens pour des rotations." },
        why: "On lit de droite à gauche : on part de la base de S, on passe à T, puis à U." },
      pourquoi: { prompt: "À quoi sert la forme standard, si la phase commune ne change aucune probabilité ?",
        options: { a: "À rien, c'est une élégance.", b: "À rendre les matrices réelles.", c: "À rendre les matrices cohérentes entre elles : deux suites de rotations vers le même appareil doivent donner la même matrice, au signe près.", d: "À annuler le signe de la rotation de 360°." },
        why: "Le raisonnement du chapitre compose des rotations pour trouver les matrices. Il faut pour cela que la composition soit exacte : la forme standard l'assure, à un signe près." },
      unitaire: { prompt: "Pour une rotation, sans perte, quel est le module du déterminant de R ?",
        options: { a: "0.", b: "2.", c: "Il dépend de l'angle.", d: "1 : seule sa phase est arbitraire." },
        why: "R conserve la probabilité totale : elle est unitaire, et le déterminant d'une matrice unitaire a un module 1. La normalisation n'en fixe que la phase." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-2 (texte original en anglais). Notations SI. Rodrigues (1840) ; Hamilton, Philosophical Magazine (1844–1850) ; Pauli (1927). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « La symétrie en mécanique quantique » (Feynman III.17.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/symetrie-quantique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La symétrie en mécanique quantique",
    "crumb.jour": "La symétrie quantique",
    "h1": "La symétrie en mécanique quantique",
    "lede": "Un système est symétrique si, en faisant subir une opération à son état de départ, on obtient l'image, par la même opération, de son état final. En mécanique quantique, cette phrase devient une égalité entre opérateurs : ils commutent. Qu'est-ce que cela change ?",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : symétrie et lois de conservation",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Une opération sur les états",
    "s1.p1": "Le système : l'ion moléculaire d'hydrogène H₂⁺, deux protons fixes et un électron, réduit aux deux états |1⟩, électron près du proton 1, et |2⟩, près du proton 2, comme dans « L'ion moléculaire d'hydrogène ». La réflexion <var>P̂</var> dans le plan médiateur des deux protons échange ces états :",
    "val.17.1": "Exacte pour deux protons identiques et un électron dont l'état |1⟩ est l'image exacte de |2⟩ ; c'est la définition de l'opération sur ces deux états.",
    "val.17.3": "Exacte : la matrice de (17.1) dans la base |1⟩, |2⟩, c'est σ<sub>x</sub>.",
    "sys.title": "Ce que le modèle garde",
    "sys1.body": "Deux états seulement, et un couplage <var>A</var> que l'on prend ici de {A}, l'ordre de grandeur des énergies moléculaires ; l'électron passe alors d'un proton à l'autre en {T}. Les protons sont supposés fixes : leur mouvement est bien plus lent, car un proton est 1\u202f836 fois plus lourd que l'électron.",

    "s2.sec": "2 · Symétrique, c'est commuter",
    "s2.h2": "Deux histoires images l'une de l'autre",
    "s2.p1": "Partons de |ψ<sub>1</sub>⟩, laissons le système évoluer : il arrive en |ψ<sub>2</sub>⟩. Partons de l'image |ψ′<sub>1</sub>⟩ = <var>Q̂</var>|ψ<sub>1</sub>⟩ : il arrive en |ψ′<sub>2</sub>⟩. Le système est symétrique pour <var>Q̂</var> si |ψ′<sub>2</sub>⟩ est l'image de |ψ<sub>2</sub>⟩, pour tout départ :",
    "val.17.7": "Exacte : la définition de l'évolution par l'opérateur <var>Û</var> pendant une durée donnée, appliquée aux deux départs.",
    "val.17.10": "Exacte : la symétrie, écrite pour tout état de départ. L'ordre « opération puis évolution » donne le même résultat que « évolution puis opération ».",
    "s2.p2": "Pour une durée très courte ε, <var>Û</var> = 1 \u2212 <var>i</var><var>Ĥ</var>ε/ħ ; (17.10) équivaut donc à",
    "val.17.11": "Exacte, une fois (17.10) admise pour toutes les durées ; c'est la forme pratique : on vérifie la symétrie sur le hamiltonien, sans résoudre l'évolution.",

    "s3.sec": "3 · Briser la symétrie",
    "s3.h2": "Quand un proton devient différent",
    "s3.p1": "Ajoutons une dissymétrie : l'électron a l'énergie +δ<var>A</var>/2 près du proton 1, \u2212δ<var>A</var>/2 près du proton 2, comme dans l'ion HeH<sup>+</sup> où les deux noyaux diffèrent. On compare deux histoires : un départ |ψ<sub>1</sub>⟩ = cos(0,4)|1⟩ + sin(0,4)|2⟩, surtout près du proton 1, et son image <var>P̂</var>|ψ<sub>1</sub>⟩. La symétrie dit que la probabilité d'être en |1⟩ dans la première histoire égale, à chaque instant, celle d'être en |2⟩ dans la seconde.",
    "fig.aria": "Probabilités de rester dans l'état de départ, pour un départ en 1 et pour un départ en 2, en fonction du temps, selon la dissymétrie",
    "fig.legend.a": "départ |ψ₁⟩ : P(1)",
    "fig.legend.b": "départ P|ψ₁⟩ : P(2)",
    "fig.d": "Dissymétrie δ, en unités de A",
    "fig.x": "t (fs)",
    "fig.y": "probabilité",
    "fig.k.com": "max |(<var>P</var>·<var>H</var> \u2212 <var>H</var>·<var>P</var>)<sub><var>ij</var></sub>|",
    "fig.f.com": "nul si la réflexion est une symétrie",
    "fig.k.ecart": "Écart maximal entre les deux courbes",
    "fig.f.ecart": "sur la durée tracée",
    "fig.caption": "Couplage <var>A</var> = 1\u00a0eV. Pour δ = 0, les deux courbes se confondent : chaque histoire est l'image de l'autre. Pour δ ≠ 0, le commutateur vaut δ<var>A</var> et les courbes se séparent.",
    "s3.p2": "Un piège : partez exactement de |1⟩ et de son image |2⟩, et les deux probabilités restent égales même quand δ ≠ 0. Pour deux états, P(1 → 1) et P(2 → 2) valent toutes deux 1 \u2212 P(basculement), par la seule conservation de la probabilité. Deux courbes égales ne prouvent donc pas une symétrie ; la vérification sûre est (17.11), sur le hamiltonien. « Symétrie et conservation » montrera ce qu'elle impose : une grandeur qui ne change pas.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des symétries aux opérateurs",
    "hist.intro": "Le lien entre symétries et lois de conservation est d'abord un théorème de mécanique classique ; la mécanique quantique l'a rendu plus simple encore.",
    "hist.events": {
      noether: { who: "Emmy Noether", what: "publie à Göttingen « Invariante Variationsprobleme », où chaque symétrie continue d'une action donne une grandeur conservée.", context: "Elle y travaillait depuis 1915, en aidant Felix Klein et David Hilbert sur la relativité générale." },
      wigner: { who: "Eugene Wigner", what: "introduit les matrices qui transforment les états quantiques dans une rotation.", context: "Les symétries deviennent des opérateurs agissant sur les états." },
      livre: { who: "Eugene Wigner", what: "publie un livre sur la théorie des groupes en mécanique quantique, qui classe les états des atomes par leurs symétries.", context: "Gruppentheorie und ihre Anwendungen auf die Quantenmechanik der Atomspektren." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      orbitales: { name: "Orbitales moléculaires", text: "Les logiciels de chimie quantique classent les orbitales d'une molécule selon les opérations de symétrie qui commutent avec son hamiltonien. Une matrice qui ne relie que des états de même symétrie se découpe en blocs, beaucoup plus petits à diagonaliser." },
      regles: { name: "Règles de sélection", text: "Un opérateur de symétrie qui commute avec le hamiltonien interdit certaines transitions : en spectroscopie, ces règles disent à l'avance quelles raies peuvent exister." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      image: { prompt: "Que veut dire « le système est symétrique pour l'opération Q » ?",
        options: { a: "Que l'état ne change pas quand on applique Q.", b: "Que l'évolution d'un état image est l'image de l'évolution : Q·U = U·Q.", c: "Que Q vaut 1.", d: "Que le système est au repos." },
        why: "La symétrie porte sur les lois, pas sur un état : un état |1⟩ n'est pas symétrique, mais son histoire est l'image de celle de |2⟩. C'est (17.10)." },
      commute: { prompt: "Pourquoi suffit-il de vérifier que Q commute avec H ?",
        options: { a: "Parce que l'évolution pendant dt vaut 1 \u2212 iH dt/ħ, et qu'une évolution finie est une suite de ces petits pas.", b: "Parce que H est diagonal.", c: "Parce que Q est hermitien.", d: "Ce n'est pas suffisant." },
        why: "Si Q commute avec chaque petit pas, il commute avec leur produit, c'est-à-dire avec U pour toute durée : (17.11) donne (17.10)." },
      brise: { prompt: "Dans l'ion HeH⁺, les deux noyaux sont différents. La réflexion qui échange leurs positions est-elle une symétrie ?",
        options: { a: "Oui, comme pour H₂⁺.", b: "Oui, si les noyaux sont fixes.", c: "Seulement à basse température.", d: "Non : les énergies de l'électron près de chaque noyau diffèrent, et P ne commute plus avec H." },
        why: "P·H \u2212 H·P a pour éléments la différence H₁₁ \u2212 H₂₂, non nulle. La figure le montre avec δ ≠ 0." },
      petit: { prompt: "Deux probabilités, l'une pour le départ |1⟩, l'autre pour le départ |2⟩, sont égales à tout instant. Peut-on en conclure que la réflexion est une symétrie ?",
        options: { a: "Oui, toujours.", b: "Oui, si les probabilités sont non nulles.", c: "Non : l'égalité peut venir d'une autre propriété du hamiltonien ; seule la commutation avec H établit la symétrie.", d: "Non, car les probabilités ne sont jamais égales." },
        hint: "Mettez une dissymétrie δ dans la figure : les courbes changent-elles ?",
        why: "Pour un système à deux états, P(1 → 1) = P(2 → 2) même dissymétrique, car les deux s'écrivent 1 \u2212 P(basculement). Une observation ne réfute ou ne confirme une symétrie que si elle porte sur une grandeur que la symétrie contraint." },
      matrice: { prompt: "Que vaut la matrice de la réflexion P de l'ion H₂⁺ dans la base |1⟩, |2⟩ ?",
        options: { a: "((0, 1), (1, 0)) : elle échange les deux états.", b: "La matrice unité.", c: "((1, 0), (0, \u22121)).", d: "((0, \u22121), (1, 0))." },
        why: "P|1⟩ = |2⟩ et P|2⟩ = |1⟩ : P₁₁ = P₂₂ = 0, P₁₂ = P₂₁ = 1, (17.3). C'est σx." },
      ion: { prompt: "Dans H₂⁺ symétrique, l'électron part de |1⟩. La symétrie impose-t-elle qu'il reste près du proton 1 ?",
        options: { a: "Oui : la symétrie conserve l'état.", b: "Non : il bascule vers |2⟩ et revient ; la symétrie dit seulement que, parti de |2⟩, il ferait l'histoire image.", c: "Oui, si A est petit.", d: "Non : il reste près du proton 2." },
        why: "|1⟩ n'est pas un état d'énergie définie : l'électron oscille entre les deux protons. La symétrie relie des histoires, elle ne fige pas un état." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-1 (texte original en anglais). Notations SI. Noether : article « Noether's theorem » de Wikipédia en anglais ; Wigner : article « Wigner D-matrix », même source. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

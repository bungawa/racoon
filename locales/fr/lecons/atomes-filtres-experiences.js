/* Leçon « Expériences avec des atomes filtrés » (Feynman III.5.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/atomes-filtres-experiences.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Expériences avec des atomes filtrés",
    "crumb.jour": "Atomes filtrés",
    "h1": "Expériences avec des atomes filtrés",
    "lede": "Des atomes tous dans l'état +S entrent dans un second appareil, tourné d'un angle α. Ils n'en sortent pas tous par la même voie : chacun choisit une des trois, au hasard, avec des probabilités qui ne dépendent que de α. Neuf nombres complexes suffisent à décrire toutes ces expériences.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : filtrer des atomes avec un appareil de Stern et Gerlach",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un second appareil, tourné",
    "s1.p1": "Le premier appareil, <var>S</var>, est un filtre : seule sa voie + est ouverte. Tous les atomes qui en sortent sont dans l'état +<var>S</var>. Ils entrent dans un second appareil, <var>T</var>, identique à <var>S</var> mais tourné d'un angle α autour de l'axe <var>y</var> du jet. Les voies de <var>T</var> sont +<var>T</var>, 0<var>T</var> et \u2212<var>T</var>. Les deux appareils sont dans le même vide, sans champ entre eux qui ferait tourner les moments : seul l'angle α décrit l'expérience.",
    "s1.p2": "Une boussole classique orientée selon <var>z</var> aurait, le long de l'axe <var>z</var>′ de <var>T</var>, la projection μ cos α : elle sortirait déviée d'autant, toujours au même endroit. Ce n'est pas ce qu'on voit. <var>T</var> donne encore trois jets, et seulement trois : chaque atome sort par une voie, entière, avec une certaine probabilité. Il faut donc, pour chaque état de départ et chaque voie d'arrivée, une amplitude. Avec trois états de chaque côté, il y en a neuf :",
    "val.5.9": "Exacte : c'est la liste des amplitudes à calculer, une définition. Leur valeur dépend de l'orientation relative de <var>T</var> et de <var>S</var>, et de rien d'autre pour des appareils idéaux ; elle ne dépend pas de l'histoire de l'atome avant <var>S</var>. Un champ parasite entre les deux appareils ajoute une rotation de plus, qui se compose avec celle de <var>T</var>.",
    "s1.p3": "Chaque atome sort par l'une des trois voies de <var>T</var>, et par une seule. Les probabilités, carrés des modules des amplitudes, s'ajoutent donc à 1 pour chaque état de départ. Pour +<var>S</var> :",
    "val.5.10": "Exacte pour un appareil <var>T</var> sans perte, dont les trois voies épuisent toutes les issues. Deux autres relations du même type partent de 0<var>S</var> et de \u2212<var>S</var>. Un appareil réel arrête une petite fraction des atomes sur ses bords ; on la compte comme une quatrième issue, et la somme des trois probabilités reste alors un peu sous 1.",

    "s2.sec": "Les nombres",
    "s2.h2": "Ce que donne un appareil tourné",
    "s2.p1": "Les neuf amplitudes se calculent, pour une rotation autour de <var>y</var>, par les formules de « Le changement de base ». Elles sont ici seulement utilisées. Choisissez l'état de départ, faites tourner <var>T</var>, et lisez les probabilités de sortir par chaque voie.",
    "fig.aria.courbes": "Probabilités de sortir par les voies +T, 0T et \u2212T d'un appareil tourné de α, en fonction de α",
    "fig.legend.plus": "voie +T",
    "fig.legend.zero": "voie 0T",
    "fig.legend.moins": "voie \u2212T",
    "fig.depart": "État de départ",
    "fig.b.plus": "+S",
    "fig.b.zero": "0S",
    "fig.b.moins": "\u2212S",
    "fig.alpha": "Angle de T autour de y, α",
    "fig.ax.alpha": "angle α (°)",
    "fig.ax.p": "probabilité",
    "fig.k.plus": "Probabilité de +<var>T</var>",
    "fig.k.zero": "Probabilité de 0<var>T</var>",
    "fig.k.moins": "Probabilité de \u2212<var>T</var>",
    "fig.k.somme": "Somme des trois, (5.10)",
    "fig.f.somme": "moyenne de μ<sub>z′</sub>/μ = P<sub>+</sub> \u2212 P<sub>\u2212</sub> : {m}",
    "fig.caption": "Depuis +<var>S</var>, à α = 90°, un atome sur quatre sort par +<var>T</var>, un sur deux par 0<var>T</var>, un sur quatre par \u2212<var>T</var>. À 180°, tous sortent par \u2212<var>T</var> : <var>T</var> est <var>S</var> retourné. Depuis 0<var>S</var>, à 90°, la voie 0<var>T</var> est vide. La moyenne de μ<sub><var>z</var>′</sub>, elle, vaut exactement μ cos α pour +<var>S</var> : la valeur classique, atteinte en moyenne seulement.",
    "s2.p2": "Deux choses frappent. D'abord, un appareil peu incliné envoie quand même quelques atomes dans les autres voies, et leur proportion croît comme le carré de l'angle. Ensuite, aucune valeur de α ne fait sortir un atome de +<var>S</var> « à moitié » : la voie est tout ou rien, seule la proportion varie. Les amplitudes sont réelles ici parce que la rotation est autour de <var>y</var> ; autour de <var>z</var>, elles prennent des phases sans changer aucune probabilité.",
    "sys.title": "Le système décrit : un petit désalignement",
    "sys1.body": "Un appareil <var>T</var> incliné de 1° fait passer une fraction {p1} des atomes +<var>S</var> dans la voie 0<var>T</var> : un sur {N} environ. À 5°, c'est {p5}. Pour qu'un filtre suivi d'un autre filtre de même nom laisse passer 99,99\u00a0% des atomes, il faut donc aligner les deux appareils à mieux qu'un degré, et les protéger de tout champ qui ferait tourner les moments entre eux.",

    "s3.sec": "Ce que la théorie doit faire",
    "s3.h2": "Neuf nombres pour chaque orientation",
    "s3.p1": "Pour tout couple d'orientations de <var>S</var> et <var>T</var>, la mécanique quantique doit savoir calculer les neuf amplitudes (5.9). C'est tout ce qu'on lui demande pour ce genre d'expérience : la fraction transmise par n'importe quel filtre se déduit de ces nombres. La suite montre comment ils se combinent quand on enchaîne plusieurs filtres, dans « Des filtres de Stern et Gerlach en série ».",
    "s3.p2": "Un atome de l'état +<var>S</var> n'est donc pas « dans l'état +<var>T</var> » ni dans un autre état de <var>T</var> : il a une amplitude d'être trouvé dans chacun. Son état est décrit dans la base de <var>S</var> par un seul nombre, 1 pour +<var>S</var> ; dans la base de <var>T</var>, par trois. C'est la même chose, vue par deux appareils.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Retourner des spins entre deux aimants",
    "hist.intro": "Faire passer un atome d'une voie à l'autre entre deux appareils de Stern et Gerlach est devenu une méthode de mesure, puis le principe de l'imagerie par résonance magnétique (IRM).",
    "hist.events": {
      rabi: { who: "Isidor Rabi, Jerrold Zacharias, Sidney Millman et Polykarp Kusch", what: "publient « A New Method of Measuring Nuclear Magnetic Moment » dans la Physical Review.", context: "Un jet de molécules traverse deux aimants inhomogènes. Entre eux, un champ oscillant fait tourner les moments ; à la bonne fréquence, des molécules changent de voie et manquent le détecteur. La fréquence donne le moment magnétique du noyau." },
      deuton: { who: "Jerome Kellogg, Isidor Rabi, Norman Ramsey et Jerrold Zacharias", what: "mesurent par cette méthode les moments magnétiques du proton et du deutéron, noyau de spin 1.", context: "Ils trouvent 2,785 magnétons nucléaires pour le proton et 0,855 pour le deutéron, avec une incertitude de l'ordre du pour cent." },
      nobel: { who: "Isidor Rabi", what: "reçoit le prix Nobel de physique pour sa méthode de résonance qui enregistre les propriétés magnétiques des noyaux atomiques.", context: "La même méthode, transposée aux noyaux d'un liquide puis d'un tissu vivant, donne la résonance magnétique nucléaire puis l'imagerie médicale." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      irm: { name: "Imagerie par résonance magnétique", text: "Une impulsion radiofréquence fait tourner l'aimantation des protons d'un angle choisi : 90° la couche sur le côté, 180° la retourne. C'est la rotation de cette leçon, faite par un champ et non par l'orientation d'un appareil. Les aimants cliniques vont en général de 0,1 à 3\u00a0T ; à 1\u00a0T, les protons tournent à 42,58\u00a0MHz." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      neuf: { prompt: "Pourquoi faut-il neuf amplitudes, et non trois, pour décrire le passage de S à T ?",
        options: { a: "Parce que chaque amplitude a une partie réelle, une partie imaginaire et un module.", b: "Parce qu'il y a trois états de départ et, pour chacun, trois voies d'arrivée.", c: "Parce que l'espace a trois dimensions et chaque appareil trois axes.", d: "Parce que T a neuf aimants." },
        why: "Chaque couple (état de S, voie de T) a son amplitude ⟨iT|jS⟩ : 3 × 3 = 9. Elles ne sont pas indépendantes, (5.10) en relie déjà certaines." },
      somme: { prompt: "Depuis +S, un appareil T donne P(+T) = 0,25 et P(0T) = 0,5. Que vaut P(\u2212T) ?",
        options: { a: "0, car un atome de +S ne peut pas aller vers \u2212.", b: "0,75.", c: "On ne peut pas le savoir sans l'angle.", d: "0,25." },
        hint: "Chaque atome sort par une voie et une seule.",
        why: "(5.10) : la somme des trois probabilités vaut 1 pour un appareil sans perte, donc P(\u2212T) = 1 \u2212 0,25 \u2212 0,5 = 0,25. C'est le cas α = 90°." },
      inverse: { prompt: "T est tourné de 180° autour de y. Par où sortent les atomes de l'état +S ?",
        options: { a: "Tous par \u2212T.", b: "Tous par +T.", c: "Un tiers par chaque voie.", d: "La moitié par +T, la moitié par \u2212T." },
        why: "Retourné, T a son axe z′ opposé à z : ce qui monte pour S descend pour T. |⟨\u2212T|+S⟩|² = 1 à α = 180°." },
      zero90: { prompt: "Des atomes 0S entrent dans T tourné de 90°. Quelle fraction sort par 0T ?",
        options: { a: "Tous.", b: "Un tiers.", c: "Aucun : ils sortent moitié par +T, moitié par \u2212T.", d: "La moitié." },
        why: "|⟨0T|0S⟩|² = cos² α s'annule à 90°. Un moment de composante nulle selon z n'a pas pour autant une composante nulle selon l'axe tourné : il se partage entre +T et \u2212T." },
      classique: { prompt: "Pour des atomes +S et un appareil T tourné de α, que vaut la moyenne de μ_z′, sur beaucoup d'atomes ?",
        options: { a: "0, puisque les voies + et \u2212 se compensent.", b: "μ cos α, la projection classique, mais chaque atome donne +μ, 0 ou \u2212μ.", c: "μ, puisque les atomes sont dans l'état +.", d: "μ cos² α." },
        why: "P(+T) \u2212 P(\u2212T) = cos α : la moyenne est la valeur classique. Ce qui n'a rien de classique, c'est qu'aucun atome ne la donne : chacun sort par une voie entière." },
      choix: { prompt: "Un atome est dans l'état +S. Peut-on dire qu'il est « en réalité » dans l'un des états +T, 0T ou \u2212T, sans qu'on sache lequel ?",
        options: { a: "Non : il a une amplitude pour chacun, et ces amplitudes interfèrent si l'on recombine les voies sans les mesurer.", b: "Oui : T révèle simplement l'état qu'il avait déjà.", c: "Oui, si α est petit.", d: "Non, parce qu'il est dans les trois à la fois avec la probabilité 1." },
        why: "S'il était déjà dans un état de T, recombiner les voies de T donnerait un mélange. On verra dans « Les états de base » que T grand ouvert rend les atomes intacts, dans l'état +S : les amplitudes se sont recomposées." },
      neuf2: { prompt: "Un appareil T est incliné de 2° seulement. Quelle fraction des atomes +S sort par 0T ?",
        options: { a: "Aucune, l'angle est trop petit.", b: "Environ 2/180, proportionnelle à l'angle.", c: "Environ 1 %.", d: "Environ 6 × 10⁻⁴, comme le carré de l'angle." },
        hint: "Mesurez l'angle en radians : 2° ≈ 0,035.",
        why: "|⟨0T|+S⟩|² = sin² α/2 ≈ α²/2 = 0,035²/2 ≈ 6 × 10⁻⁴. La fraction croît comme le carré de l'angle : petite, mais jamais nulle." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-2 (texte original en anglais). Notations SI. Rabi, Zacharias, Millman et Kusch, Physical Review, vol. 53 (1938) ; Kellogg, Rabi, Ramsey et Zacharias, Physical Review (1939). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Autres situations de spin 1 » (Feynman III.5.8) : textes en français.
   Une autre langue = locales/<langue>/lecons/autres-situations-spin1.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Autres situations de spin 1",
    "crumb.jour": "Autres situations",
    "h1": "Autres situations de spin 1",
    "lede": "Rien de ce qui précède ne tient au nombre trois : les mêmes règles valent pour n états de base, n pouvant être infini. Reste un cas que les amplitudes seules ne décrivent pas : le faisceau d'un four, où chaque atome est dans un état inconnu. Il faut alors ajouter des probabilités, et un tel mélange ne ressemble à aucune superposition.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le changement de base",

    "s1.sec": "Décrire le système",
    "s1.h2": "n états de base",
    "s1.p1": "Un atome de spin <var>j</var> donne 2<var>j</var> + 1 jets dans un appareil de Stern et Gerlach : deux pour le spin 1/2, trois pour le spin 1, quatre pour le spin 3/2. Une molécule, un noyau, un électron dans un cristal ont d'autres états de base, parfois en nombre infini : les positions d'une particule, par exemple. Les lois restent les mêmes, avec <var>n</var> états :",
    "val.n": "Exacte pour toute base complète de <var>n</var> états, sans marquage des états intermédiaires. La difficulté pratique est de savoir quels états forment une base : en oublier un, une excitation de l'atome par exemple, fausse la somme. Pour <var>n</var> infini, la somme devient une intégrale quand les états forment un continu, comme des positions.",
    "s1.p2": "Une base de <var>n</var> états donne des matrices <var>n</var> × <var>n</var> pour les appareils et pour les changements de base. Le nombre ne change rien à la structure. Les deux appareils de Stern et Gerlach du spin 1 et du spin 1/2 ne diffèrent que par la taille de leurs matrices, et par les nombres qu'elles contiennent.",

    "s2.sec": "Le faisceau d'un four",
    "s2.h2": "Un mélange, pas une superposition",
    "s2.p1": "Un four émet des atomes dont personne ne connaît l'état. On ne peut pas leur attribuer d'amplitudes : on sait seulement qu'un atome sur trois, en moyenne, sortirait par chaque voie d'un appareil <var>S</var>. On traite ce faisceau comme un <strong>mélange</strong> : l'atome est dans l'état φ<sub><var>k</var></sub> avec la probabilité <var>w</var><sub><var>k</var></sub>. Pour chaque état possible on calcule une probabilité, puis on fait la moyenne :",
    "val.melange": "Exacte pour un faisceau dont chaque atome est dans un état défini mais inconnu, choisi avec les probabilités <var>w</var><sub><var>k</var></sub>, de somme 1. Ce sont les probabilités qui s'ajoutent : additionner des amplitudes ajouterait des termes d'interférence qui n'existent pas. Le même faisceau peut se décrire par d'autres mélanges ; la matrice densité en donne la description unique.",
    "s2.p2": "Comparez trois faisceaux qui entrent dans <var>T</var> tourné de α. Le premier est une <strong>superposition</strong> : chaque atome est dans l'état (+<var>S</var> \u2212 \u2212<var>S</var>)/√2. Le deuxième est un <strong>mélange</strong> : la moitié des atomes en +<var>S</var>, l'autre moitié en \u2212<var>S</var>. Le troisième est le faisceau du four. Un appareil <var>S</var> ne les distingue pas tous : les deux premiers y donnent tous les deux moitié par +, moitié par \u2212.",
    "fig.aria.courbes": "Probabilité de sortir par une voie de T, en fonction de son angle, pour une superposition, un mélange et le faisceau d'un four",
    "fig.legend.sup": "superposition (+S \u2212 \u2212S)/√2",
    "fig.legend.mel": "mélange : moitié +S, moitié \u2212S",
    "fig.legend.four": "four : un tiers par état",
    "fig.voie": "Voie de T observée",
    "fig.t.0": "+T",
    "fig.t.1": "0T",
    "fig.t.2": "\u2212T",
    "fig.alpha": "T tourné autour de y, α",
    "fig.ax.alpha": "angle α (°)",
    "fig.ax.p": "probabilité",
    "fig.k.sup": "Superposition",
    "fig.k.mel": "Mélange",
    "fig.k.four": "Four",
    "fig.f.four": "un tiers dans toute voie, à tout angle",
    "fig.caption": "À α = 0, la superposition et le mélange donnent les mêmes nombres. À 90°, la superposition passe tout entière par 0<var>T</var>, le mélange seulement pour moitié. La superposition est en fait un état pur : l'état 0 selon l'axe <var>x</var>. Le faisceau du four, lui, donne 1/3 quelle que soit l'orientation : il n'a aucune direction privilégiée.",
    "s2.p3": "Un mélange n'est donc pas une superposition à phases inconnues qu'on aurait oubliées : c'est une autre chose, avec d'autres prédictions. Le faisceau du four a une propriété remarquable : il est le même vu par tout appareil, et aucun choix d'amplitudes ne reproduit cette isotropie pour tous les angles à la fois.",
    "sys.title": "Le système décrit : T à 90°, voie 0T",
    "sys1.body": "La superposition passe la voie 0<var>T</var> avec la probabilité {s}, le mélange avec {m}. Un seul appareil, tourné de 90°, suffit à distinguer les deux faisceaux, qu'un appareil <var>S</var> confondait. Pour le savoir avec 100 atomes, l'écart de 0,5 vaut dix fois la fluctuation de comptage, de l'ordre de 0,05.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Décrire ce qu'on ne connaît pas",
    "hist.intro": "Les mélanges ont reçu leur outil mathématique dès les débuts de la mécanique quantique : la matrice densité.",
    "hist.events": {
      densite: { who: "John von Neumann, et indépendamment Lev Landau", what: "introduisent la matrice densité, qui décrit un ensemble statistique d'états quantiques.", context: "Elle remplace la liste des états et de leurs probabilités par un seul objet, le même pour tous les mélanges qui donnent les mêmes prédictions." },
      livre: { who: "John von Neumann", what: "publie les Mathematische Grundlagen der Quantenmechanik.", context: "La mesure y transforme un état en un mélange des états propres de la grandeur mesurée : le passage de l'amplitude à la probabilité y est décrit comme un processus à part." },
      bloch: { who: "Felix Bloch", what: "présente à son tour le formalisme de la matrice densité.", context: "La matrice densité reste la façon de décrire tout faisceau partiellement polarisé, celui d'un four comme la lumière du Soleil." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      lunettes: { name: "Filtres polarisants", text: "La lumière du Soleil n'est pas polarisée : c'est un mélange, comme le faisceau du four. Un polariseur en arrête la moitié, quelle que soit son orientation. Les filtres polarisants des appareils photo et des lunettes jouent de cette différence : ils arrêtent la lumière réfléchie, en partie polarisée, et laissent passer la moitié du reste." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      four: { prompt: "Pourquoi ne peut-on pas décrire le faisceau d'un four par trois amplitudes C_+, C₀, C_\u2212 ?",
        options: { a: "Parce que les atomes du four sont trop rapides.", b: "Parce qu'il faudrait plus de trois amplitudes.", c: "Parce que les amplitudes seraient nulles.", d: "Parce que chaque atome est dans un état défini mais inconnu : c'est un mélange, qui se décrit par des probabilités." },
        why: "Trois amplitudes décrivent un état pur, qui a toujours une direction privilégiée. Le faisceau du four n'en a pas : on moyenne les probabilités sur les états possibles." },
      n: { prompt: "Combien de jets un atome de spin 3/2 donne-t-il dans un appareil de Stern et Gerlach ?",
        options: { a: "Quatre : 2j + 1.", b: "Trois.", c: "Deux.", d: "Une bande continue." },
        why: "2j + 1 = 4 valeurs de la composante selon le champ. Les lois de composition restent celles de cette leçon, avec n = 4." },
      sup: { prompt: "La moitié des atomes en +S, la moitié en \u2212S : un appareil S donne moitié par +, moitié par \u2212. Et la superposition (+S \u2212 \u2212S)/√2 ?",
        options: { a: "Tous par +.", b: "Tous par 0.", c: "La même chose, moitié par +, moitié par \u2212 ; il faut un appareil tourné pour les distinguer.", d: "Rien ne passe." },
        why: "Dans la base S, les probabilités sont les mêmes, |C_+|² = |C_\u2212|² = 1/2. La différence est dans la phase relative, que seul un appareil d'une autre orientation révèle." },
      isotrope: { prompt: "Le faisceau d'un four entre dans un appareil T d'orientation quelconque. Quelle fraction sort par 0T ?",
        options: { a: "Elle dépend de l'angle.", b: "Un tiers, à tout angle.", c: "Zéro.", d: "La moitié." },
        why: "Un tiers par état de S, et Σ |⟨0T|iS⟩|² = 1 : la moyenne vaut 1/3 quelle que soit l'orientation. Le mélange uniforme est isotrope." },
      poids: { prompt: "Pourquoi, pour un mélange, ajoute-t-on des probabilités et non des amplitudes ?",
        options: { a: "Parce que les différents états possibles ne sont pas des chemins indiscernables d'un même atome : chaque atome est dans l'un d'eux.", b: "Parce que les amplitudes d'un mélange sont réelles.", c: "Par convention.", d: "Parce que les amplitudes s'annuleraient." },
        why: "La règle d'addition des amplitudes vaut pour des façons indiscernables d'arriver. Ici, chaque atome a un état ; on ignore lequel, et c'est une ignorance classique." },
      demi: { prompt: "À T tourné de 90°, la superposition (+S \u2212 \u2212S)/√2 passe 0T avec la probabilité 1, le mélange moitié-moitié avec 0,5. On compte 100 atomes de chaque faisceau. Les distingue-t-on ?",
        options: { a: "Non, il faut des millions d'atomes.", b: "Non, les deux comptes sont égaux en moyenne.", c: "Seulement avec 10 000 atomes.", d: "Oui : 100 contre environ 50, avec une fluctuation de quelques atomes seulement pour le mélange." },
        hint: "La fluctuation d'un comptage binomial vaut √(N p (1 \u2212 p)).",
        why: "Pour le mélange, √(100 × 0,5 × 0,5) = 5 : 50 ± 5 contre 100 exactement. L'écart vaut dix fluctuations." },
      infini: { prompt: "La position d'une particule le long d'une droite fournit-elle une base ?",
        options: { a: "Non, une base a toujours un nombre fini d'états.", b: "Oui, mais seulement si la droite est finie.", c: "Oui, une base infinie et continue : la somme sur les états devient une intégrale.", d: "Non, car la position n'est pas quantifiée." },
        why: "Les lois de composition valent pour n infini ; avec un continu d'états, Σ devient ∫. C'est le point de départ des fonctions d'onde." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-8 (texte original en anglais). Notations SI. Von Neumann (1927) et Mathematische Grundlagen der Quantenmechanik (1932) ; Landau (1927) ; Bloch (1946). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

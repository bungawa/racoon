/* Leçon « Quels sont les états de base du monde » (Feynman III.8.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/etats-de-base-du-monde.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Quels sont les états de base du monde",
    "crumb.jour": "Les états de base du monde",
    "h1": "Quels sont les états de base du monde",
    "lede": "Pour décrire un système, il faut une base complète. Mais laquelle, et complète jusqu'où ? On ne connaît pas la liste ultime des états du monde. On choisit, selon l'énergie en jeu, ce qu'on décrit et ce qu'on fige, et on chiffre ce qu'on néglige.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la décomposition des vecteurs d'état",

    "s1.sec": "Décrire le système",
    "s1.h2": "Ce qu'il faut dire d'un électron",
    "s1.p1": "Une base n'est pas unique : comme pour les axes d'un repère, on en choisit une qui facilite le calcul, et les amplitudes en dépendent. Ce qui est fixé, c'est la liste de ce qu'il faut préciser. Pour un électron seul, autant qu'on sache, il suffit de sa quantité de mouvement et de sa composante de spin selon <var>z</var>, + ou \u2212. Un état quelconque est une superposition de ces états de base.",
    "s1.p2": "Pour deux électrons, il faut les deux quantités de mouvement et les deux spins ; pour <var>n</var> particules, les <var>n</var>. Si l'on découpe l'espace en <var>M</var> cases et que chaque particule a <var>s</var> états de spin, le nombre d'états de base de <var>n</var> particules discernables est :",
    "val.count": "Exacte pour ce modèle discrétisé : <var>n</var> particules discernables, <var>M</var> cases, <var>s</var> états de spin. Pour des particules identiques, il faut compter les états symétriques ou antisymétriques, moins nombreux d'un facteur de l'ordre de <var>n</var>!. Avec des positions continues, <var>M</var> est infini et la somme devient une intégrale.",
    "s1.p3": "Ce nombre croît comme une exponentielle du nombre de particules : c'est la taille de l'espace des états, pas celle de l'espace où vivent les particules. C'est pourquoi on ne calcule jamais avec tous les états du monde, mais avec ceux qui comptent pour la question posée.",

    "s2.sec": "Ce qu'on peut figer",
    "s2.h2": "Un atome d'hydrogène comme une particule",
    "s2.p1": "Un proton, un atome d'hydrogène, sont faits de constituants. Les traiter comme une seule particule, décrite par sa quantité de mouvement et son spin, revient à supposer que leur état interne ne change pas. C'est vrai tant que l'énergie disponible est trop faible pour l'exciter. Pour l'atome d'hydrogène, le premier état excité est à Δ<var>E</var> ≈ 10,2\u00a0eV au-dessus du fondamental. Dans un gaz à la température <var>T</var>, la proportion d'atomes excités est de l'ordre de :",
    "val.boltz": "Approximation : équilibre thermique, loi de Boltzmann, deux niveaux seulement, le facteur 4 comptant les états du niveau <var>n</var> = 2 contre 1 pour le fondamental, sans les spins. Valable tant que le rapport reste ≪ 1, au-dessous de 10<sup>4</sup>\u00a0K environ ; au-delà, l'atome commence à s'ioniser et d'autres états entrent dans la base.",
    "s2.p2": "Faites varier la température. La courbe donne la proportion d'atomes dans le premier état excité ; la dernière ligne compte les états de base d'un petit gaz de <var>n</var> atomes, chacun dans <var>M</var> cases avec deux états de spin.",
    "fig.aria.boltz": "Proportion d'atomes d'hydrogène dans le premier état excité en fonction de la température",
    "fig.T": "Température du gaz (échelle logarithmique)",
    "fig.n": "Nombre d'atomes, n",
    "fig.M": "Cases d'espace par atome, M (puissance de 10)",
    "fig.ax.T": "température (K)",
    "fig.ax.f": "proportion excitée",
    "fig.k.kt": "Énergie thermique <var>k</var><sub>B</sub><var>T</var>",
    "fig.f.kt": "à comparer aux 10,2 eV d'excitation",
    "fig.k.exc": "Proportion d'atomes excités",
    "fig.k.n": "États de base du gaz, (<var>M</var><var>s</var>)<sup><var>n</var></sup>",
    "fig.f.n": "soit 10 à la puissance {l}",
    "fig.trop": "plus de 10³⁰⁸",
    "fig.caption": "À la température ambiante, aucun atome n'est excité : la base « quantité de mouvement et spin » suffit à la chimie et aux collisions lentes. Vers 10<sup>4</sup>\u00a0K, une fraction mesurable est excitée, et il faut ajouter les états internes. Le nombre d'états du gaz, lui, dépasse vite tout ce qu'on sait stocker.",
    "s2.p3": "La même question se pose à chaque échelle. Un proton peut-il être traité comme une particule ? Oui, tant que l'énergie ne permet pas de l'exciter ; non dans les collisions d'électrons de très grande énergie, qui montrent sa structure. Nul ne sait si l'électron en a une. Le choix de la base est donc toujours un modèle, valable dans une gamme d'énergie qu'il faut dire.",
    "sys.title": "Le système décrit : un gaz d'hydrogène à 300 K",
    "sys1.body": "À 300\u00a0K, <var>k</var><sub>B</sub><var>T</var> = {kt} et la proportion d'atomes excités vaut {p} : il n'y en a aucun dans tout l'Univers observable de gaz à cette température. Décrire l'atome par sa seule quantité de mouvement et son spin est alors une approximation dont l'erreur ne se mesure pas.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des particules qui ont des parties",
    "hist.intro": "Ce qu'on peut traiter comme une particule sans structure dépend de l'énergie avec laquelle on le sonde.",
    "hist.events": {
      slac: { who: "Des expériences du Stanford Linear Accelerator Center", what: "envoient des électrons de grande énergie sur des protons et des neutrons, et observent une diffusion qui révèle une structure interne.", context: "À ces énergies, le proton ne peut plus être décrit par sa seule quantité de mouvement et son spin : ses constituants entrent dans la base." },
      nobel: { who: "Jerome Friedman, Henry Kendall et Richard Taylor", what: "reçoivent le prix Nobel de physique pour leurs recherches pionnières sur la diffusion profondément inélastique des électrons sur les protons et les neutrons liés.", context: "Ce sont les expériences de 1968 et des années suivantes." },
      c60: { who: "Une équipe de Vienne", what: "observe la diffraction de molécules de fullerène C₆₀.", context: "Soixante atomes, mais un seul objet quantique, décrit par la quantité de mouvement de son centre de masse, tant que rien ne marque son état interne au passage." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      chimie: { name: "Chimie quantique", text: "Les calculs de structure des molécules traitent les noyaux comme des particules sans structure, de charge, de masse et de spin donnés : l'énergie d'une liaison chimique, quelques électronvolts, est des centaines de milliers de fois trop faible pour exciter un noyau. Le choix de la base est celui de cette leçon." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      unique: { prompt: "Y a-t-il une seule bonne base pour décrire un système ?",
        options: { a: "Oui, celle des positions.", b: "Non : comme pour les axes d'un repère, on en choisit une, et les amplitudes en dépendent ; la physique non.", c: "Oui, celle des énergies.", d: "Non, et les prédictions dépendent du choix." },
        why: "Toute base complète convient ; les amplitudes changent par (6.4), les probabilités mesurées non." },
      electron: { prompt: "Que faut-il préciser, autant qu'on sache, pour un électron seul ?",
        options: { a: "Sa position et sa vitesse.", b: "Sa masse et sa charge.", c: "Rien, il n'a qu'un état.", d: "Sa quantité de mouvement et sa composante de spin selon z." },
        why: "Masse et charge sont fixées pour tous les électrons. Restent la quantité de mouvement et deux états de spin." },
      deux: { prompt: "Combien d'états de base pour 3 électrons discernables, chacun dans 10 cases avec 2 états de spin ?",
        options: { a: "8 000 : (10 × 2)³.", b: "60.", c: "30.", d: "600." },
        why: "(M s)ⁿ = 20³ = 8 000. Le nombre croît exponentiellement avec n." },
      proton: { prompt: "Quand peut-on traiter un proton comme une particule sans structure ?",
        options: { a: "Jamais.", b: "Toujours.", c: "Tant que l'énergie en jeu ne permet pas d'exciter ou de sonder sa structure interne.", d: "Seulement s'il est au repos." },
        why: "Les électrons de très grande énergie envoyés à Stanford, en 1968, révèlent sa structure. En chimie, l'énergie en jeu est bien trop faible pour cela." },
      dix: { prompt: "Pourquoi peut-on ignorer les états excités de l'atome d'hydrogène à la température ambiante ?",
        options: { a: "Parce qu'ils n'existent pas.", b: "Parce que kT ≈ 0,026 eV est très petit devant les 10,2 eV d'excitation : la proportion excitée est de l'ordre de 10⁻¹⁷¹.", c: "Parce que l'atome est trop lourd.", d: "Parce que le spin les interdit." },
        why: "4 e^\u2212ΔE/kT avec ΔE/kT ≈ 395 : un nombre absurdement petit." },
      compte: { prompt: "Doubler le nombre de cases d'espace par atome, pour un gaz de n atomes, multiplie le nombre d'états de base par…",
        options: { a: "2ⁿ.", b: "2.", c: "n.", d: "n²." },
        why: "(2M s)ⁿ = 2ⁿ (M s)ⁿ. Chaque atome a deux fois plus d'états, et les choix se multiplient." },
      approx: { prompt: "Que veut dire « choisir la base » d'un problème, dans cette leçon ?",
        options: { a: "Choisir les unités.", b: "Choisir l'origine des énergies.", c: "Choisir les axes x, y, z.", d: "Décider quels degrés de liberté on décrit et lesquels on fige, selon l'énergie en jeu, et chiffrer ce qu'on néglige." },
        why: "C'est un modèle : la base « quantité de mouvement et spin » de l'atome d'hydrogène vaut sous 10 eV environ, et l'erreur se chiffre par le facteur de Boltzmann." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 8, §8-3 (texte original en anglais). Notations SI. Stanford Linear Accelerator Center (1968) ; prix Nobel de physique 1990 ; diffraction de C₆₀, Vienne (1999). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

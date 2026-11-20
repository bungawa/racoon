/* Leçon « Les rotations autour de x » (Feynman III.6.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/rotations-autour-de-x.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les rotations autour de x",
    "crumb.jour": "Rotations autour de x",
    "h1": "Les rotations autour de x",
    "lede": "On sait tourner autour de z et autour de y. Pour tourner autour de x, il suffit d'amener x sur y, de tourner, puis de revenir. Le produit de trois matrices connues donne la réponse, avec un i qui distingue x de y.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les rotations de 180° et de 90° autour de y",

    "s1.sec": "Décrire le système",
    "s1.h2": "Trois rotations pour en faire une",
    "s1.p1": "On veut l'appareil <var>T</var> tourné d'un angle α autour de l'axe <var>x</var> de <var>S</var>. Faisons-le en trois temps. D'abord une rotation de \u221290° autour de <var>z</var> : l'axe <var>y</var> du nouveau repère est l'ancien axe <var>x</var>. Puis une rotation de α autour de ce nouvel axe <var>y</var>. Enfin une rotation de +90° autour de <var>z</var>, qui ramène les axes <var>x</var> et <var>y</var> à leur place. Le résultat est une rotation de α autour de <var>x</var>. Par la règle du produit, lu de droite à gauche :",
    "val.comp": "Exacte : c'est une identité géométrique sur les rotations, traduite par la règle (6.11) du produit des matrices. Elle ne suppose rien de plus que les rotations autour de <var>z</var> et de <var>y</var> déjà connues, dans la forme standard.",
    "eq.cos": "cos",
    "eq.sin": "sin",
    "s1.p2": "Avec la matrice de « Les rotations autour de l'axe z » et la formule générale autour de <var>y</var> de « Les rotations de 180° et de 90° autour de y », le produit donne :",
    "val.6.34": "Exacte dans la forme standard, au signe commun près ; vérifiée ici numériquement par le produit des trois matrices. Le déterminant vaut cos<sup>2</sup>(α/2) + sin<sup>2</sup>(α/2) = 1. À α = 360°, elle donne \u22121, comme toute rotation complète.",
    "s1.p3": "Les modules sont ceux de la rotation autour de <var>y</var> : cos(α/2) et sin(α/2). La différence est le facteur <var>i</var> devant les sinus. Il ne change pas les probabilités dans la base de <var>S</var>, mais il change tout ce qui dépend des phases relatives.",

    "s2.sec": "Les nombres",
    "s2.h2": "Autour de x ou autour de y : ce qui change",
    "s2.p1": "Un état préparé selon +<var>z</var> ne fait pas la différence entre une rotation autour de <var>x</var> et une rotation autour de <var>y</var> : les deux inclinent l'axe de l'appareil de α par rapport à <var>z</var>. Un état préparé selon +<var>x</var>, l'état (+<var>S</var> + \u2212<var>S</var>)/√2, la fait. Les courbes donnent sa probabilité de passer +<var>T</var>.",
    "fig.aria.courbes": "Probabilité qu'un état préparé selon +x passe +T, pour T tourné autour de x et autour de y",
    "fig.legend.x": "T tourné autour de x",
    "fig.legend.y": "T tourné autour de y",
    "fig.alpha": "Angle de rotation de T, α",
    "fig.ax.alpha": "angle α (°)",
    "fig.ax.p": "probabilité de +T, état selon +x",
    "fig.k.z": "État +<var>S</var> : P(+<var>T</var>), autour de <var>x</var> ; de <var>y</var>",
    "fig.f.z": "les mêmes : cos<sup>2</sup>(α/2)",
    "fig.k.x": "État +<var>x</var> : P(+<var>T</var>), autour de <var>x</var> ; de <var>y</var>",
    "fig.f.x": "différentes : l'axe tourne dans un autre plan",
    "fig.k.amp": "C′<sub>+</sub> ; C′<sub>\u2212</sub> de +<var>S</var>, autour de <var>x</var>",
    "fig.caption": "Autour de <var>x</var>, l'axe de <var>T</var> tourne dans le plan <var>y</var><var>z</var>, toujours perpendiculaire à <var>x</var> : l'état +<var>x</var> passe une fois sur deux, quel que soit α. Autour de <var>y</var>, l'axe de <var>T</var> passe par <var>x</var> à α = 90° : l'état +<var>x</var> passe à coup sûr. Le facteur <var>i</var> de (6.34) porte toute cette différence.",
    "s2.p2": "Deux rotations autour d'axes différents ne commutent pas, et leurs matrices non plus. C'est ce qu'on avait vu pour le spin 1 dans « La machinerie de la mécanique quantique ». Ici, la non-commutation se lit dans le facteur <var>i</var> : il passe d'un élément de matrice à l'autre selon l'ordre.",
    "sys.title": "Le système décrit : un quart de tour autour de y, un autre autour de x",
    "sys1.body": "Partie de +<var>S</var>, une particule vue après un quart de tour autour de <var>y</var> puis un quart de tour autour de <var>x</var> passe +<var>T</var> avec la probabilité {a} ; dans l'ordre inverse, {b}. Les probabilités sont égales, mais les phases de C′<sub>+</sub> valent {pa}° et {pb}° : un troisième appareil bien orienté distinguerait les deux ordres.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des rotations de spin aux portes logiques",
    "hist.intro": "Une rotation de spin 1/2 autour de x ou de y d'un angle choisi est devenue l'opération de base des ordinateurs quantiques à ions piégés.",
    "hist.events": {
      cirac: { who: "Ignacio Cirac et Peter Zoller", what: "proposent de réaliser une porte logique quantique, le « non contrôlé », avec des ions piégés.", context: "Chaque ion porte deux états, comme un spin 1/2 ; des impulsions laser font tourner ces états et les couplent par le mouvement commun des ions." },
      nist: { who: "Le groupe des ions piégés du NIST", what: "réalise une étape clé de la porte « non contrôlé » sur des ions.", context: "Elle a lieu la même année que la proposition de Cirac et Zoller, sur le même type de dispositif." },
      innsbruck: { who: "L'université d'Innsbruck", what: "présente un démonstrateur compact d'ordinateur quantique à ions piégés.", context: "Les opérations à un qubit y sont des rotations sur la sphère qui représente l'état, comme celles de cette leçon." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      qubits: { name: "Opérations à un qubit", text: "Dans un ordinateur quantique à ions piégés, une opération sur un qubit est une rotation de ses deux états, réalisée par une impulsion micro-onde ou laser. Ces rotations se décrivent sur la sphère des états du qubit : ce sont les matrices de cette leçon." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      compose: { prompt: "Comment obtient-on la rotation autour de x à partir de celles qu'on connaît ?",
        options: { a: "En prenant la moyenne des rotations autour de y et de z.", b: "En échangeant x et z.", c: "En tournant de \u221290° autour de z, puis de α autour du nouvel y, puis de +90° autour de z.", d: "On ne peut pas, il faut une mesure." },
        why: "Le premier quart de tour amène x à la place de y ; on tourne ; on revient. Le produit des trois matrices donne (6.34)." },
      phase: { prompt: "Qu'est-ce qui distingue (6.34) de la rotation autour de y du même angle ?",
        options: { a: "Le facteur i devant les sinus.", b: "Les modules des éléments.", c: "Le déterminant.", d: "Rien." },
        why: "Les modules sont les mêmes, cos(α/2) et sin(α/2) ; autour de x, les sinus portent un facteur i et ont le même signe. Les phases relatives diffèrent." },
      meme: { prompt: "Une particule +S traverse T tourné de 60° autour de x. Quelle est la probabilité de +T ?",
        options: { a: "1/2.", b: "1/4.", c: "0.", d: "cos² 30° = 3/4, comme autour de y." },
        why: "|C′₊|² = cos²(α/2) = 3/4, la même que pour une rotation autour de y : pour un état selon z, les deux inclinent l'axe de 60°." },
      diff: { prompt: "Une particule dans l'état +x traverse T tourné d'un angle α autour de x. Quelle est la probabilité de +T ?",
        options: { a: "cos²(α/2).", b: "1/2, quel que soit α : l'axe de T reste perpendiculaire à x.", c: "1.", d: "0." },
        hint: "Dans quel plan l'axe z′ de T tourne-t-il ?",
        why: "Autour de x, z′ reste dans le plan yz, toujours perpendiculaire à +x : moitié-moitié. Autour de y, ce serait différent." },
      ordre: { prompt: "Un quart de tour autour de x puis autour de y, ou dans l'ordre inverse : partie de +S, la particule passe +T avec la même probabilité. Les deux rotations sont-elles équivalentes ?",
        options: { a: "Oui, puisque les probabilités sont égales.", b: "Oui, les rotations commutent.", c: "Non : les phases de C′₊ diffèrent, et un appareil d'une autre orientation les distinguerait.", d: "Non, car les probabilités diffèrent." },
        why: "Les deux produits de matrices ne sont pas égaux. L'égalité des probabilités dans une base n'est pas l'égalité des états." },
      tour: { prompt: "Que vaut (6.34) pour α = 360° ?",
        options: { a: "\u22121 fois la matrice unité.", b: "La matrice unité.", c: "Une matrice avec des i.", d: "Zéro." },
        why: "cos 180° = \u22121, sin 180° = 0 : la matrice vaut \u22121, comme toute rotation complète d'un spin 1/2." },
      axe: { prompt: "Pourquoi la rotation autour de z sert-elle deux fois dans la construction ?",
        options: { a: "Pour annuler le signe moins.", b: "Pour fixer le déterminant.", c: "Pour faire un tour complet.", d: "Pour amener l'axe x à la place de l'axe y avant de tourner, puis pour le remettre en place." },
        why: "On sait tourner autour de y ; tourner autour de x, c'est tourner autour d'un axe y déplacé. Les deux quarts de tour autour de z font ce déplacement aller et retour." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-5 (texte original en anglais). Notations SI. Cirac et Zoller (1995) ; NIST, Ion Storage Group (1995) ; université d'Innsbruck (2021). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

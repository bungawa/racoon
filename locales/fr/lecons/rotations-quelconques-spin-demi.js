/* Leçon « Les rotations quelconques du spin 1/2 » (Feynman III.6.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/rotations-quelconques-spin-demi.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les rotations quelconques du spin 1/2",
    "crumb.jour": "Rotations quelconques",
    "h1": "Les rotations quelconques du spin 1/2",
    "lede": "Toute orientation d'un appareil s'obtient par trois rotations : autour de z, autour du nouvel x, autour du nouveau z. Le produit de leurs matrices donne la table complète du spin 1/2. Elle a une conséquence simple : tout état de spin 1/2 est « vers le haut » selon une direction de l'espace.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les rotations autour de x",

    "s1.sec": "Décrire le système",
    "s1.h2": "Les angles d'Euler",
    "s1.p1": "Pour amener l'appareil <var>S</var> dans une orientation quelconque <var>T</var>, on le tourne d'un angle β autour de <var>z</var>, puis d'un angle α autour de son nouvel axe <var>x</var>, puis d'un angle γ autour de son nouvel axe <var>z</var>. Ce sont les angles d'Euler. La matrice est le produit des trois matrices connues, dans cet ordre : celle de β à droite, celle de γ à gauche :",
    "val.6.35": "Exacte dans la forme standard, au signe commun près ; vérifiée numériquement comme le produit de (6.19), (6.34) et (6.19). Les angles d'Euler sont mal définis quand α vaut 0 ou 180° : seules β + γ ou β \u2212 γ comptent alors, et la matrice le montre. L'espace est supposé isotrope, sans champ entre les appareils.",
    "s1.p2": "C'est toute la réponse au problème posé dans « La transformation des amplitudes » : pour n'importe quelle paire d'appareils, on connaît les quatre amplitudes. On ne s'est servi que du nombre d'états, deux, et de la géométrie.",

    "s2.sec": "Une conséquence",
    "s2.h2": "Tout état pointe quelque part",
    "s2.p1": "Prenons un appareil <var>A</var> dont l'axe a pour angles θ, depuis <var>z</var>, et φ, autour de <var>z</var> depuis <var>x</var>. Une particule qui sort de la voie +<var>A</var> a, dans la base de <var>S</var>, les amplitudes :",
    "val.6.36": "Exacte, à une phase commune près, choisie ici symétrique. Réciproquement, deux nombres complexes C<sub>+</sub>, C<sub>\u2212</sub> quelconques, normés, s'écrivent toujours ainsi à une phase commune près : on lit θ sur le rapport des modules et φ sur la différence des phases. Tout état de spin 1/2 est donc l'état « + » d'un appareil bien orienté.",
    "s2.p2": "C'est ce qui manque au spin 1 : son état 0 selon <var>z</var> n'est « + » selon aucune direction. Pour un spin 1/2 dans un état défini, il n'y a pas d'autre possibilité qu'un spin entièrement le long d'un axe. La probabilité de passer +<var>T</var> ne dépend alors que de l'angle Θ entre l'axe de l'état et celui de <var>T</var> : cos<sup>2</sup>(Θ/2).",

    "s3.sec": "Les nombres",
    "s3.h2": "Deux axes, un angle",
    "s3.p1": "Réglez la direction de l'état, θ et φ, et l'orientation de <var>T</var> par α et β (γ, qui tourne <var>T</var> autour de son propre axe, ne change aucune probabilité). La flèche pleine est l'axe de l'état, la flèche orangée celui de <var>T</var>, calculé à partir de la matrice (6.35). La probabilité tirée des amplitudes est comparée à (1 + cos Θ)/2.",
    "fig.aria.sphere": "Vue en perspective des axes x, y, z, de l'axe de l'état et de l'axe de l'appareil T",
    "fig.legend.etat": "axe de l'état (θ, φ)",
    "fig.legend.t": "axe de T",
    "fig.legend.axes": "axes x, y, z de S",
    "fig.x": "x",
    "fig.y": "y",
    "fig.z": "z",
    "fig.theta": "État : angle depuis z, θ",
    "fig.phi": "État : angle autour de z, φ",
    "fig.alpha": "T : rotation autour du nouvel x, α",
    "fig.beta": "T : rotation autour de z, β",
    "eq.cos": "cos",
    "eq.sin": "sin",
    "fig.k.p": "P(+<var>T</var>) par les amplitudes",
    "fig.f.p": "(1 + cos Θ)/2 = {v}",
    "fig.k.angle": "Angle Θ entre les deux axes",
    "fig.f.angle": "seule grandeur qui compte",
    "fig.k.c": "C′<sub>+</sub> ; C′<sub>\u2212</sub>",
    "fig.caption": "Quand les deux flèches coïncident, la particule passe +<var>T</var> à coup sûr ; opposées, jamais ; perpendiculaires, une fois sur deux. Les amplitudes C′, elles, dépendent de tous les angles : leurs phases changent quand on tourne la figure entière, pas leurs modules.",
    "s3.p2": "Le spin 1/2 est donc décrit par une direction, comme une flèche. Mais ce n'est pas un vecteur ordinaire : ses amplitudes changent de signe après un tour, et elles se transforment par des matrices 2 × 2 à demi-angles, pas par les rotations 3 × 3 de (5.42). Les deux descriptions se rejoignent dans les moyennes, comme le montrera « La précession d'une particule de spin 1/2 ».",
    "sys.title": "Le système décrit : un spin selon z, un appareil à 60°",
    "sys1.body": "Une particule dans l'état +<var>z</var> traverse <var>T</var>, incliné de α = 60° : elle passe +<var>T</var> avec la probabilité {p}, soit cos<sup>2</sup> 30°. Pour un spin 1 dans l'état +<var>z</var>, la même inclinaison donnerait (1 + cos 60°)<sup>2</sup>/4 = 0,5625 : le nombre d'états change la loi, pas la géométrie.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Toutes les rotations à partir de trois",
    "hist.intro": "Que toute rotation ait un axe, et qu'on puisse la décomposer, a été établi bien avant qu'on en ait besoin pour le spin.",
    "hist.events": {
      euler: { who: "Leonhard Euler", what: "publie la démonstration que tout déplacement d'un solide autour d'un point fixe est une rotation autour d'un axe.", context: "Présentée à l'Académie de Saint-Pétersbourg le 9 octobre 1775, elle paraît en 1776 dans les Novi Commentarii de l'Académie." },
      rodrigues: { who: "Olinde Rodrigues", what: "publie la formule qui compose deux rotations par leurs axes et leurs demi-angles.", context: "Ses paramètres de demi-angle sont, à une notation près, les éléments de la matrice (6.35)." },
      pauli: { who: "Wolfgang Pauli", what: "décrit le spin de l'électron par deux composantes complexes, transformées par des matrices 2 × 2.", context: "La correspondance entre ces matrices et les rotations de l'espace, deux matrices opposées pour chaque rotation, est celle de cette leçon." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      sphere: { name: "La sphère des états d'un qubit", text: "Les opérations à un qubit des ordinateurs quantiques à ions piégés sont décrites sur une sphère : chaque état y est un point, d'angles θ et φ, exactement comme dans (6.36), et chaque opération une rotation de la sphère." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      trois: { prompt: "Combien de rotations élémentaires faut-il pour amener un appareil dans une orientation quelconque ?",
        options: { a: "Une.", b: "Trois : autour de z, du nouvel x, du nouveau z.", c: "Deux, autour de x et de y.", d: "Une infinité." },
        why: "Ce sont les angles d'Euler β, α, γ. Avec les matrices de z et de x, (6.35) en découle." },
      proba: { prompt: "Une particule est dans l'état + selon un axe A. T fait un angle de 90° avec A. Quelle est la probabilité de passer +T ?",
        options: { a: "0.", b: "1.", c: "cos² 90°.", d: "1/2." },
        why: "cos²(Θ/2) = cos² 45° = 1/2. Seul l'angle entre les axes compte." },
      oppose: { prompt: "Et si T est orienté à l'opposé de A ?",
        options: { a: "0 : l'état +A est l'état \u2212T.", b: "1/2.", c: "1.", d: "Cela dépend de γ." },
        why: "Θ = 180°, cos² 90° = 0." },
      direction: { prompt: "Qu'affirme la réciproque de (6.36) ?",
        options: { a: "Que tout état de spin 1 est + selon un axe.", b: "Que les amplitudes sont réelles.", c: "Que tout état de spin 1/2 est l'état + d'un appareil d'une certaine orientation.", d: "Que θ et φ ne sont pas mesurables." },
        why: "Deux amplitudes normées, à une phase commune près, c'est deux réels : θ et φ. Tout état de spin 1/2 pointe donc quelque part." },
      phase: { prompt: "On tourne T autour de son propre axe (γ). Que change-t-on ?",
        options: { a: "Les probabilités de + et de \u2212.", b: "Les phases de C′₊ et C′₋, pas leurs modules.", c: "Rien du tout, même les phases.", d: "L'axe de T." },
        why: "La rotation γ multiplie C′₊ par e^iγ/2 et C′₋ par e^\u2212iγ/2, (6.19) : les modules restent." },
      vecteur: { prompt: "Pourquoi un spin 1/2 n'est-il pas un vecteur ordinaire, bien qu'il pointe dans une direction ?",
        options: { a: "Parce que ses amplitudes changent de signe après un tour et se transforment avec des demi-angles.", b: "Parce qu'il n'a pas de direction.", c: "Parce qu'il a trois composantes.", d: "Parce qu'il ne tourne pas." },
        why: "Un vecteur revient à lui-même après 360° ; les deux amplitudes du spin 1/2 reviennent avec un signe moins. Elles tournent avec des demi-angles, (6.35)." },
      mesure: { prompt: "Pour une particule +z et T incliné de 60°, comparez les probabilités de passer +T pour un spin 1/2 et pour un spin 1 (+z).",
        options: { a: "Les mêmes, 1/2.", b: "0,25 et 0,75.", c: "0,75 pour le spin 1/2, 0,5625 pour le spin 1.", d: "1 et 1." },
        hint: "Spin 1/2 : cos²(Θ/2). Spin 1 : ((1 + cos Θ)/2)².",
        why: "cos² 30° = 0,75 ; ((1 + 0,5)/2)² = 0,5625. La géométrie est la même, le nombre d'états change la loi." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-6 (texte original en anglais). Notations SI. Euler, Novi Commentarii academiae scientiarum Petropolitanae, vol. 20 (1776) ; Rodrigues (1840) ; Pauli (1927). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

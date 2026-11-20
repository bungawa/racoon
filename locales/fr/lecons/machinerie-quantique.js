/* Leçon « La machinerie de la mécanique quantique » (Feynman III.5.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/machinerie-quantique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La machinerie de la mécanique quantique",
    "crumb.jour": "La machinerie",
    "h1": "La machinerie de la mécanique quantique",
    "lede": "Un état se décrit par trois nombres, un appareil par neuf. Mettre deux appareils à la suite, c'est multiplier leurs matrices, et l'ordre compte. Toute la mécanique quantique d'un système à trois états tient dans ces quelques règles de calcul.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : des amplitudes qui interfèrent",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un appareil quelconque entre deux filtres",
    "s1.p1": "Entre un filtre qui prépare l'état φ et un filtre qui laisse passer χ, plaçons un appareil <var>A</var> qui fait quelque chose aux atomes : un champ magnétique qui fait tourner leur moment, une région où ils restent un moment, n'importe quoi qui ne les arrête pas. On note ⟨χ|<var>A</var>|φ⟩ l'amplitude qu'un atome entré dans l'état φ sorte de <var>A</var> dans l'état χ. Si <var>A</var> ne fait rien, c'est ⟨χ|φ⟩.",
    "s1.p2": "Glissons un appareil grand ouvert, de base <var>i</var>, avant <var>A</var>, et un autre, de base <var>j</var>, après. D'après « Des amplitudes qui interfèrent », ils ne changent rien. Mais ils découpent le trajet en trois étapes : de φ à <var>i</var>, de <var>i</var> à <var>j</var> à travers <var>A</var>, de <var>j</var> à χ. L'amplitude est le produit des trois, sommé sur les neuf couples (<var>i</var>, <var>j</var>) :",
    "val.5.32": "Exacte, tant que les deux appareils grands ouverts ne marquent pas la voie. On suppose aussi que <var>A</var> ne fait passer les atomes dans aucun autre état que les trois états de spin : pas d'excitation de l'atome, pas de perte. Sinon la base doit être agrandie, et la somme compte plus de termes.",
    "s1.p3": "Tout ce qui caractérise <var>A</var> est donc dans neuf nombres complexes, ses éléments de matrice dans la base choisie. Ils ne dépendent pas de φ ni de χ :",
    "val.5.33": "Exacte : c'est une définition, la matrice de <var>A</var> dans la base de <var>S</var>. Dans une autre base, celle de <var>T</var>, ce sont neuf autres nombres, qui décrivent le même appareil. Un appareil sans perte a une matrice unitaire : ses colonnes forment des états de probabilité 1. Un filtre, qui arrête des atomes, n'en a pas une.",

    "s2.sec": "Deux appareils à la suite",
    "s2.h2": "Un produit de matrices, dans l'ordre",
    "s2.p1": "L'appareil <var>A</var> est suivi de l'appareil <var>B</var>. Ensemble, ils forment un appareil <var>C</var>. Un appareil grand ouvert de base <var>k</var> placé entre les deux ne change rien et donne :",
    "val.5.36": "Exacte, pour deux appareils sans perte entre lesquels rien ne marque l'état : c'est la règle du produit des matrices. L'ordre de lecture va de droite à gauche, comme le temps : <var>A</var> d'abord, <var>B</var> ensuite. Approximation si <var>A</var> et <var>B</var> sont si proches que leurs champs se mêlent : il faut alors les traiter comme un seul appareil.",
    "s2.p2": "Les matrices ne commutent pas en général : <var>BA</var> n'est pas <var>AB</var>. Ici, <var>A</var> fait tourner le moment de a autour de <var>y</var>, <var>B</var> de b autour de <var>x</var> ; les atomes qui sortent sont triés par un appareil <var>T</var> tourné de 90° autour de <var>y</var>. Comparez les deux ordres.",
    "fig.aria.barres": "Probabilités de sortir par les voies +T, 0T et \u2212T, pour A puis B et pour B puis A",
    "fig.legend.ba": "A d'abord, puis B : C = BA",
    "fig.legend.ab": "B d'abord, puis A : C = AB",
    "fig.depart": "État de départ",
    "fig.b.0": "+S",
    "fig.b.1": "0S",
    "fig.b.2": "\u2212S",
    "fig.t.0": "+T",
    "fig.t.1": "0T",
    "fig.t.2": "\u2212T",
    "fig.a": "A : rotation autour de y, a",
    "fig.b2": "B : rotation autour de x, b",
    "fig.k.ba": "<var>BA</var> : +<var>T</var> ; 0<var>T</var> ; \u2212<var>T</var>",
    "fig.k.ab": "<var>AB</var> : +<var>T</var> ; 0<var>T</var> ; \u2212<var>T</var>",
    "fig.k.ecart": "Plus grand écart entre les deux ordres",
    "fig.f.ecart": "nul si a ou b est nul, ou si a = 180°",
    "fig.caption": "À a = b = 90°, partis de +<var>S</var>, tous les atomes sortent par \u2212<var>T</var> dans un ordre, et se partagent 1/4, 1/2, 1/4 dans l'autre. Deux rotations autour d'axes différents ne commutent pas : c'est vrai d'un livre qu'on tourne, et c'est vrai des amplitudes.",
    "s2.p3": "Le calcul n'a besoin que des matrices. Un état, trois nombres ; un appareil, neuf ; une suite d'appareils, un produit. C'est le sens du mot « machinerie » : une fois les matrices connues, la physique est de l'arithmétique.",
    "sys.title": "Le système décrit : deux quarts de tour",
    "sys1.body": "Partis de +<var>S</var>, avec a = b = 90°, les probabilités de sortir de <var>T</var> par +, 0 et \u2212 valent {ba} quand <var>A</var> agit d'abord, {ab} quand <var>B</var> agit d'abord. L'appareil <var>T</var> sert d'analyseur : dans la base de <var>S</var>, les deux ordres donneraient ici les mêmes probabilités, et seules les phases différeraient. Une matrice garde l'information de phase que des probabilités perdent.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Quand la mécanique quantique est devenue des matrices",
    "hist.intro": "La première forme complète de la mécanique quantique a été un calcul sur des tableaux de nombres, dont la multiplication ne commute pas.",
    "hist.events": {
      heisenberg: { who: "Werner Heisenberg", what: "envoie à la Zeitschrift für Physik son article sur la réinterprétation quantique de la cinématique, reçu le 29 juillet.", context: "Il remplace les orbites par des tableaux de quantités liées aux transitions observées, et note que leur produit dépend de l'ordre." },
      born: { who: "Max Born et Pascual Jordan", what: "reconnaissent dans la règle de Heisenberg le produit des matrices, dans un article reçu le 27 septembre.", context: "Born avait appris l'algèbre des matrices à Breslau. L'article, « Zur Quantenmechanik », récrit la théorie dans cette langue." },
      trois: { who: "Max Born, Werner Heisenberg et Pascual Jordan", what: "publient « Zur Quantenmechanik II », l'article dit « des trois hommes ».", context: "Reçu par la revue le 16 novembre 1925, il paraît en 1926 et donne à la mécanique des matrices sa forme d'ensemble." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      portes: { name: "Circuits quantiques", text: "Un calcul quantique est une suite d'appareils comme <var>A</var> et <var>B</var> : chaque porte logique est une matrice unitaire, un circuit est le produit de ces matrices dans l'ordre où les portes agissent. Deux portes ne peuvent échanger leur place que si leurs matrices commutent." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      neuf: { prompt: "Combien de nombres complexes faut-il pour décrire complètement un appareil sans perte qui agit sur un atome de spin 1 ?",
        options: { a: "Trois, un par voie.", b: "Un seul, son effet total.", c: "Neuf, les éléments ⟨j|A|i⟩ de sa matrice dans une base.", d: "Vingt-sept." },
        why: "Trois états d'entrée, trois de sortie : neuf amplitudes. Elles suffisent pour tout état de départ et tout état final, par (5.32)." },
      ordre: { prompt: "Un atome traverse A puis B. Quelle matrice décrit l'ensemble ?",
        options: { a: "BA : on lit de droite à gauche, dans l'ordre du temps.", b: "AB.", c: "A + B.", d: "Peu importe, les matrices commutent." },
        why: "⟨j|C|i⟩ = Σ ⟨j|B|k⟩⟨k|A|i⟩ : A agit d'abord, sa matrice est à droite. (5.36)." },
      lecture: { prompt: "À quoi servent les deux appareils grands ouverts dans la démonstration de (5.32) ?",
        options: { a: "À arrêter les atomes de mauvais état.", b: "À mesurer l'état des atomes.", c: "À changer la matrice de A.", d: "À rien physiquement : ils découpent le trajet en étapes sans rien changer, ce qui fait apparaître une somme de produits." },
        why: "Un appareil grand ouvert ne fait rien, (5.24). L'insérer introduit une somme sur ses états de base, et l'amplitude devient une somme de produits." },
      filtre: { prompt: "Un filtre qui ne laisse passer que +S est un appareil. Quelle est sa matrice dans la base de S ?",
        options: { a: "La matrice unité.", b: "Un 1 en haut à gauche, des 0 partout ailleurs.", c: "Trois 1 sur la première ligne.", d: "Il n'a pas de matrice, il arrête les atomes." },
        why: "⟨+S|A|+S⟩ = 1, tous les autres éléments sont nuls. Ce n'est pas une matrice unitaire : le filtre perd des atomes." },
      ouvert: { prompt: "Quelle est la matrice d'un appareil grand ouvert, dans n'importe quelle base ?",
        options: { a: "Une matrice de 1.", b: "Elle dépend de l'orientation de l'appareil.", c: "La matrice unité : ⟨j|A|i⟩ = δ_ji.", d: "Une matrice nulle." },
        why: "Il ne fait rien : ⟨χ|A|φ⟩ = ⟨χ|φ⟩, donc ⟨j|A|i⟩ = ⟨j|i⟩ = δ_ji, quelle que soit la base." },
      produit: { prompt: "A fait tourner le moment de 90° autour de y, B de 90° autour de x. Pourquoi BA et AB donnent-ils des résultats différents ?",
        options: { a: "Parce que les appareils ont des pertes.", b: "Parce que les amplitudes sont complexes.", c: "Parce qu'on lit mal l'ordre.", d: "Parce que deux rotations autour d'axes différents ne commutent pas, et leurs matrices non plus." },
        hint: "Faites l'essai avec un livre : un quart de tour autour d'un axe, puis d'un autre, puis dans l'autre ordre.",
        why: "Les matrices représentent les rotations ; elles en gardent la non-commutativité. Deux rotations autour du même axe, elles, commutent." },
      etat: { prompt: "On connaît les trois amplitudes ⟨i|φ⟩ d'un état et la matrice de A dans la base i. Que peut-on calculer ?",
        options: { a: "L'amplitude de sortir de A dans n'importe quel état χ dont on connaît les ⟨χ|j⟩.", b: "Seulement les probabilités de sortir dans les états de base.", c: "Rien sans connaître l'histoire de l'atome.", d: "La matrice de A dans toute autre base, sans autre information." },
        why: "(5.32) : il suffit des amplitudes de φ, de la matrice et des amplitudes de χ dans la même base. Passer à une autre base demande en plus les amplitudes ⟨iT|jS⟩." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-6 (texte original en anglais). Notations SI. Heisenberg, Zeitschrift für Physik, vol. 33 (1925) ; Born et Jordan, Zeitschrift für Physik, vol. 34 (1925) ; Born, Heisenberg et Jordan, Zeitschrift für Physik, vol. 35 (1926). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

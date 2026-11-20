/* Leçon « La composition des moments cinétiques » (Feynman III.18.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/composition-moments-cinetiques-quantiques.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La composition des moments cinétiques",
    "crumb.jour": "Composer les moments cinétiques",
    "h1": "La composition des moments cinétiques",
    "lede": "Un atome de deutérium a un électron de spin 1/2 et un noyau de spin 1. Quel est son moment cinétique total ? Pas une seule valeur : deux, 3/2 et 1/2. La règle qui dit lesquelles, et comment s'écrivent les états correspondants, vaut pour tout couple de moments cinétiques.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la matrice de rotation d'un spin quelconque",

    "s1.sec": "Les valeurs possibles",
    "s1.h2": "M s'additionne, J se distribue",
    "s1.p1": "Le système : deux objets <var>a</var> et <var>b</var>, de moments cinétiques <var>j<sub>a</sub></var> et <var>j<sub>b</sub></var>, considérés ensemble, sans interaction qui changerait leurs <var>j</var>. Les produits |<var>a</var>, <var>m<sub>a</sub></var> ; <var>b</var>, <var>m<sub>b</sub></var>⟩ forment une base : (2<var>j<sub>a</sub></var> + 1)(2<var>j<sub>b</sub></var> + 1) états. Une rotation autour de <var>z</var> multiplie chacun par le produit des phases :",
    "val.18.44": "Exacte : les composantes selon <var>z</var> s'ajoutent, pour tout système composé. Ce sont les valeurs de <var>J</var>, le moment total, qui demandent un raisonnement.",
    "s1.p2": "L'état de plus grand <var>M</var>, <var>j<sub>a</sub></var> + <var>j<sub>b</sub></var>, est seul de son espèce : il appartient forcément à un multiplet <var>J</var> = <var>j<sub>a</sub></var> + <var>j<sub>b</sub></var>. Pour <var>M</var> d'une unité plus petit, il y a deux états : une combinaison continue ce multiplet, l'autre ouvre un multiplet <var>J</var> d'une unité plus petit. Et ainsi de suite, jusqu'à épuiser les états :",
    "val.18.58": "Exacte : chaque valeur une seule fois, par pas de 1. Le compte est juste : la somme des 2<var>J</var> + 1 sur ces valeurs redonne (2<var>j<sub>a</sub></var> + 1)(2<var>j<sub>b</sub></var> + 1), ce que la figure vérifie. Le résultat ne dépend pas de ce dont <var>a</var> et <var>b</var> sont faits.",

    "s2.sec": "Les états",
    "s2.h2": "Le deutérium : 1/2 + 1",
    "s2.p1": "Électron <var>e</var> de spin 1/2, deutéron <var>d</var> de spin 1 : six états, qui forment <var>J</var> = 3/2 (quatre états) et <var>J</var> = 1/2 (deux). L'état |3/2, +3/2⟩ est |<var>e</var>, +1/2 ; <var>d</var>, +1⟩. En le tournant, ou en voyant le deutéron comme un neutron et un proton de spins 1/2 alignés, on trouve l'état suivant :",
    "val.18.48": "Exacte, avec la convention de phase de la source, qui est ici celle de Condon et Shortley. Les poids 2/3 et 1/3 sont des probabilités : un deutérium dans cet état a deux chances sur trois d'avoir son électron en haut.",
    "s2.p2": "L'état de même <var>M</var> qui reste, orthogonal au précédent, ouvre le multiplet <var>J</var> = 1/2 :",
    "val.18.54": "Exacte au signe global près, qui est une convention : ici encore celle de Condon et Shortley, que suit la formule de la figure. Aucune probabilité n'en dépend.",

    "s3.sec": "Composer à volonté",
    "s3.h2": "Les coefficients de Clebsch et Gordan",
    "s3.p1": "Choisissez <var>j<sub>a</sub></var> et <var>j<sub>b</sub></var>, puis parcourez les états |<var>J</var>, <var>M</var>⟩. Chaque barre est le coefficient ⟨<var>m<sub>a</sub></var> ; <var>m<sub>b</sub></var>|<var>J</var>, <var>M</var>⟩ sur un produit d'états, calculé par une formule fermée ; seuls apparaissent les produits de même <var>M</var>.",
    "fig.aria": "Coefficients de Clebsch-Gordan de l'état choisi sur les produits d'états des deux moments cinétiques",
    "fig.legend.pos": "coefficient positif",
    "fig.legend.neg": "coefficient négatif",
    "fig.ja": "Moment cinétique j_a",
    "fig.jb": "Moment cinétique j_b",
    "fig.b.demi": "1/2",
    "fig.b.un": "1",
    "fig.b.troisdemis": "3/2",
    "fig.b.deux": "2",
    "fig.etat": "État |J, M⟩",
    "fig.v.etat": "J = {J}, M = {M}",
    "fig.k.compte": "Nombre d'états",
    "fig.f.compte": "{a} × {b} ; J = {J}",
    "fig.k.norme": "Somme des carrés des coefficients",
    "fig.f.norme": "chaque état est normé",
    "fig.caption": "Sous chaque barre, <var>m<sub>a</sub></var> ; <var>m<sub>b</sub></var>. L'état de <var>M</var> extrême n'a qu'une barre, égale à 1. Pour deux spins 1/2, on retrouve le triplet <var>J</var> = 1 et le singulet <var>J</var> = 0, de coefficients ±1/√2 ; pour deux spins 1, l'état <var>J</var> = 0 a trois coefficients de module 1/√3, dont celui de |0 ; 0⟩ négatif.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Quand la composition se voit",
    "s4.p1": "Les états |<var>J</var>, <var>M</var>⟩ ne sont des états d'énergie définie que si une interaction couple les deux moments : sans elle, toutes les combinaisons ont la même énergie et la base des produits est aussi bonne. Le nombre qui compte est l'énergie de couplage, comparée aux autres énergies en jeu, l'agitation thermique ou un champ magnétique extérieur.",
    "sys.title": "L'hydrogène : deux spins 1/2",
    "sys1.body": "Dans l'atome d'hydrogène, l'électron et le proton forment un triplet <var>F</var> = 1 et un singulet <var>F</var> = 0, séparés par une interaction magnétique faible. La transition entre eux a une longueur d'onde de {l}, soit une énergie de {e}.",
    "sys2.body": "Même le rayonnement fossile, à 2,725\u00a0K, a une énergie thermique {r} fois plus grande : dans le gaz interstellaire, les deux niveaux sont peuplés presque selon le rapport de leurs nombres d'états, trois pour un. Au-delà de 0,05\u00a0T environ, l'énergie magnétique de l'électron, 2μ<sub>B</sub><var>B</var>, dépasse le couplage : les bons états redeviennent peu à peu les produits.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des coefficients au ciel radio",
    "hist.intro": "Les coefficients portent le nom de deux mathématiciens, Alfred Clebsch et Paul Gordan, qui avaient rencontré le même problème en théorie des invariants. Leur usage en physique atomique, puis en astronomie, est venu plus tard.",
    "hist.events": {
      racah: { who: "Giulio Racah", what: "publie le deuxième article de sa « Theory of Complex Spectra », où il développe l'algèbre des opérateurs tensoriels.", context: "Les coefficients de cette page y servent à composer les moments des électrons d'un atome, couche après couche." },
      hulst: { who: "Hendrik van de Hulst", what: "prévoit que l'hydrogène neutre interstellaire doit émettre vers 1\u00a0420,4 MHz.", context: "La raie vient du passage de l'état F = 1 à l'état F = 0 : le retournement relatif des spins de l'électron et du proton." },
      ewen: { who: "Harold Ewen et Edward Purcell", what: "détectent la raie à 21 cm à Harvard ; des équipes des Pays-Bas et d'Australie la confirment.", context: "Les premières cartes de l'hydrogène galactique révèlent ensuite la structure spirale de la Voie lactée." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      galaxie: { name: "Cartographier l'hydrogène des galaxies", text: "La raie à 21\u00a0cm traverse les poussières qui arrêtent la lumière visible. Son décalage Doppler donne la vitesse du gaz : on en tire la rotation de la Galaxie et sa masse. La raie est si fine, la transition si lente, de l'ordre de onze millions d'années de durée de vie, que sa largeur vient surtout du mouvement du gaz." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      somme: { prompt: "Deux objets ont des composantes m_a = +1/2 et m_b = \u22121 selon z. Que vaut la composante totale M ?",
        options: { a: "\u22121/2, la somme : les phases e^(imϕ) se multiplient, les m s'ajoutent.", b: "+3/2.", c: "Elle n'est pas définie.", d: "1/2, la valeur absolue." },
        why: "(18.44) : une rotation autour de z donne e^(i m_a ϕ) e^(i m_b ϕ) = e^(i(m_a + m_b)ϕ). M est toujours bien défini pour un produit ; J, lui, ne l'est pas forcément." },
      valeurs: { prompt: "Quelles valeurs peut prendre le moment cinétique total de deux spins 1 ?",
        options: { a: "2 seulement.", b: "0 et 2.", c: "1/2 et 3/2.", d: "2, 1 et 0." },
        why: "(18.58) : de j_a + j_b = 2 à |j_a \u2212 j_b| = 0, par pas de 1. Compte : 5 + 3 + 1 = 9 = 3 × 3." },
      compte: { prompt: "Un spin 3/2 et un spin 2 : combien d'états, et quelles valeurs de J ?",
        options: { a: "12 états ; J = 7/2 seulement.", b: "20 états ; J = 7/2, 5/2, 3/2, 1/2.", c: "20 états ; J = 7/2 et 1/2.", d: "9 états ; J = 2, 1, 0." },
        hint: "Vérifiez que Σ(2J + 1) redonne le produit.",
        why: "4 × 5 = 20 ; et 8 + 6 + 4 + 2 = 20. Essayez sur la figure avec j_a = 3/2 et j_b = 2." },
      haut: { prompt: "Pourquoi l'état |e, +1/2 ; d, +1⟩ du deutérium appartient-il forcément au multiplet J = 3/2 ?",
        options: { a: "Parce que l'électron est plus léger.", b: "Par convention.", c: "Parce que c'est le seul état de M = +3/2, et qu'un multiplet J = 1/2 n'a pas de M = 3/2.", d: "Parce que les spins sont antiparallèles." },
        why: "M = +3/2 n'est atteint que par cet état. Un état de J = 1/2 ne peut avoir que M = ±1/2. L'état est donc |3/2, +3/2⟩." },
      coef: { prompt: "Un deutérium est dans l'état |J = 3/2, M = +1/2⟩. Quelle est la probabilité que son électron soit en haut ?",
        options: { a: "2/3, le carré du coefficient √(2/3) de (18.48).", b: "1/2.", c: "1/3.", d: "1." },
        why: "(18.48) : √(2/3)|e,+1/2 ; d,0⟩ + √(1/3)|e,\u22121/2 ; d,+1⟩. L'électron est en haut dans le premier terme seulement : probabilité 2/3." },
      deux: { prompt: "Deux spins 1/2 forment un triplet et un singulet. Quelle est la différence entre |1, 0⟩ et |0, 0⟩ ?",
        options: { a: "Aucune : ils ont la même composante M = 0.", b: "Le signe relatif des deux termes |+ \u2212⟩ et |\u2212 +⟩ : + pour le triplet, \u2212 pour le singulet. Ils sont orthogonaux.", c: "Le triplet a ses deux spins en haut.", d: "Le singulet n'est pas normé." },
        why: "|1, 0⟩ = (|+ \u2212⟩ + |\u2212 +⟩)/√2, symétrique ; |0, 0⟩ = (|+ \u2212⟩ \u2212 |\u2212 +⟩)/√2, antisymétrique. Même M, J différents : une rotation les distingue." },
      structure: { prompt: "Les coefficients qui composent un spin 1/2 et un spin 1 dépendent-ils de ce dont ces objets sont faits ?",
        options: { a: "Oui : ceux du deutérium diffèrent de ceux d'un pion et d'un nucléon.", b: "Oui, ils dépendent des masses.", c: "Seulement leur signe.", d: "Non : ils ne dépendent que des deux moments cinétiques, et valent pour tout couple de spin 1/2 et de spin 1." },
        why: "La démonstration n'utilise que les propriétés des états sous les rotations. Les tables de Clebsch et Gordan servent ainsi aux électrons d'un atome, aux nucléons d'un noyau, aux quarks d'un hadron." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 18, §18-6 (texte original en anglais), dont les Tables 18-3, 18-6 et 18-7 sont vérifiées par les tests de cette page. Clebsch et Gordan : Wikipédia, « Clebsch–Gordan coefficients ». Racah : Phys. Rev. 62, 438 (1942). Van de Hulst, Ewen et Purcell, fréquence, durée de vie et usages de la raie : Wikipédia, « Hydrogen line ». Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

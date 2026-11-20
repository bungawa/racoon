/* Leçon « La transformation des amplitudes » (Feynman III.6.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/transformation-des-amplitudes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La transformation des amplitudes",
    "crumb.jour": "Transformer des amplitudes",
    "h1": "La transformation des amplitudes",
    "lede": "L'électron, le proton, le neutron et l'atome d'argent ont un spin 1/2 : deux jets dans un appareil de Stern et Gerlach, deux amplitudes pour décrire leur état. Comment ces deux nombres changent-ils quand on tourne l'appareil ? On va le trouver sans aucune expérience nouvelle, par la seule géométrie des rotations.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le changement de base",

    "s1.sec": "Décrire le système",
    "s1.h2": "Deux états de base",
    "s1.p1": "Un appareil de Stern et Gerlach <var>S</var>, de champ selon <var>z</var>, sépare un jet de particules de spin 1/2 en deux voies, +<var>S</var> et \u2212<var>S</var>. Il n'y a pas de voie du milieu : c'est ce qu'a montré l'argent en 1922. Tout état ψ se décrit par deux amplitudes, C<sub>+</sub> = ⟨+<var>S</var>|ψ⟩ et C<sub>\u2212</sub> = ⟨\u2212<var>S</var>|ψ⟩, avec |C<sub>+</sub>|<sup>2</sup> + |C<sub>\u2212</sub>|<sup>2</sup> = 1. Les règles de « Des amplitudes qui interfèrent » valent sans changement, avec deux états au lieu de trois.",
    "s1.p2": "On ne s'occupe ici que du spin : la particule est supposée au repos, ou ses autres états, position, vitesse, excitation, n'interviennent pas. On admet aussi que l'espace n'a pas de direction privilégiée : un appareil tourné, dans un laboratoire tourné de la même façon, donne les mêmes résultats. C'est vrai à la précision de toutes les mesures faites jusqu'ici, tant qu'aucun champ extérieur, la pesanteur ou le champ magnétique terrestre, ne vient marquer une direction.",

    "s2.sec": "Le problème",
    "s2.h2": "Quatre nombres pour chaque rotation",
    "s2.p1": "Un second appareil <var>T</var> est tourné par rapport à <var>S</var>. Ses amplitudes C′<sub><var>j</var></sub> = ⟨<var>j</var><var>T</var>|ψ⟩ s'obtiennent en glissant un appareil <var>S</var> grand ouvert :",
    "val.6.4": "Exacte : c'est la loi de composition sur la base de <var>S</var>, sans marquage. Les quatre amplitudes ⟨<var>j</var><var>T</var>|<var>i</var><var>S</var>⟩ ne dépendent que de la rotation qui amène <var>S</var> sur <var>T</var>, si l'espace est isotrope et si rien ne se passe entre les deux appareils.",
    "s2.p2": "On écrit ces quatre nombres comme une matrice <var>R</var>, la matrice de rotation de la base de <var>S</var> à celle de <var>T</var> :",
    "val.6.5": "Exacte : c'est (6.4) écrite avec <var>R</var><sub><var>j</var><var>i</var></sub> = ⟨<var>j</var><var>T</var>|<var>i</var><var>S</var>⟩. Elle a la forme de la rotation des coordonnées d'un vecteur, mais les C ne sont pas des composantes de vecteur : deux nombres complexes, pas trois réels. <var>R</var> n'est déterminée qu'à une phase commune près, que la suite fixe par convention.",
    "s2.p3": "Le programme est le suivant. Trouver <var>R</var> pour une rotation autour de <var>z</var> : « Les rotations autour de l'axe z ». Puis de 180° et de 90° autour de <var>y</var>, et en déduire toutes les autres par composition : « Les rotations de 180° et de 90° autour de y », « Les rotations quelconques du spin 1/2 ». Aucune expérience n'est nécessaire : le fait qu'il y ait deux états, et la géométrie des rotations, suffisent.",

    "s3.sec": "Ce que les amplitudes contiennent",
    "s3.h2": "Phase commune, phase relative",
    "s3.p1": "Un état de spin 1/2 s'écrit C<sub>+</sub> = e<sup><var>i</var>δ</sup> cos(θ/2), C<sub>\u2212</sub> = e<sup><var>i</var>δ</sup> e<sup><var>i</var>η</sup> sin(θ/2). À gauche, les deux amplitudes dans la base de <var>S</var> ; à droite, dans celle d'un appareil <var>T</var> tourné de 90° autour de <var>y</var>, par la matrice de « Les rotations de 180° et de 90° autour de y ». Changez θ, la phase relative η, la phase commune δ.",
    "fig.aria.cercles": "Les amplitudes C₊ et C₋ dans le plan complexe, vues par S et par T",
    "fig.lab.s.0": "C₊ (S)",
    "fig.lab.s.1": "C\u2212 (S)",
    "fig.lab.t.0": "C′₊ (T)",
    "fig.lab.t.1": "C′\u2212 (T)",
    "fig.theta": "Partage entre + et \u2212, θ",
    "fig.eta": "Phase relative, η",
    "fig.delta": "Phase commune, δ",
    "fig.k.s": "Probabilités +<var>S</var> ; \u2212<var>S</var>",
    "fig.f.s": "ne dépendent que de θ",
    "fig.k.t": "Probabilités +<var>T</var> ; \u2212<var>T</var>",
    "fig.f.t": "dépendent de θ et de η, jamais de δ",
    "fig.caption": "Faire tourner les deux flèches ensemble, par δ, ne change aucune probabilité, ni pour <var>S</var> ni pour <var>T</var>. Faire tourner l'une par rapport à l'autre, par η, ne change rien pour <var>S</var> et change tout pour <var>T</var>. Un état de spin 1/2 est donc décrit par deux nombres réels, θ et η : c'est une direction de l'espace.",
    "s3.p2": "Cette liberté de phase commune est la cause de la seule subtilité du calcul : la matrice <var>R</var> n'est définie qu'à un facteur e<sup><var>i</var>δ</sup> près. On la fixe en imposant une forme standard, dans « La transformation vers un repère tourné ».",
    "sys.title": "Le système décrit : deux états qui se ressemblent",
    "sys1.body": "Les états (+<var>S</var> + \u2212<var>S</var>)/√2 et (+<var>S</var> \u2212 \u2212<var>S</var>)/√2 donnent tous deux moitié par +<var>S</var>, moitié par \u2212<var>S</var>. Vus par <var>T</var>, tourné de 90° autour de <var>y</var>, ils donnent {p} et {q} : l'un passe tout entier par +<var>T</var>, l'autre par \u2212<var>T</var>. Seule la phase relative, 0 ou 180°, les distingue.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Deux valeurs que la physique classique n'explique pas",
    "hist.intro": "Que l'électron ait exactement deux états de spin a été d'abord une règle de comptage, puis une propriété, puis une conséquence de la relativité.",
    "hist.events": {
      pauli: { who: "Wolfgang Pauli", what: "introduit pour l'électron une « double valeur qu'on ne peut pas décrire classiquement ».", context: "Il l'attache à l'électron de la couche externe des atomes. Le mot « spin » n'existe pas encore." },
      spin: { who: "George Uhlenbeck et Samuel Goudsmit", what: "proposent à Leyde, sur le conseil d'Ehrenfest, que cette double valeur vienne d'une rotation propre de l'électron.", context: "Ralph Kronig avait eu l'idée au début de 1925 mais ne l'avait pas publiée, après les objections de Pauli : la surface de l'électron tournerait plus vite que la lumière." },
      dirac: { who: "Paul Dirac", what: "publie une équation relativiste de l'électron dont les solutions ont quatre composantes et portent naturellement un spin 1/2.", context: "Pauli avait, en 1927, décrit le spin par une fonction d'onde à deux composantes et par les matrices qui portent son nom." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      irm: { name: "Imagerie par résonance magnétique", text: "L'IRM lit les spins 1/2 des protons de l'eau. Dans un champ de 1\u00a0T, l'état d'un proton tourne autour du champ à 42,58\u00a0MHz ; une impulsion radiofréquence le fait basculer de 90° ou de 180°. Chacun de ces gestes est une matrice <var>R</var> de cette leçon et des suivantes." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      deux: { prompt: "Combien de nombres complexes faut-il pour décrire l'état de spin d'un électron au repos ?",
        options: { a: "Trois, comme pour un vecteur.", b: "Deux, C₊ et C₋, un par état de base.", c: "Un seul.", d: "Quatre, ceux de la matrice R." },
        why: "Un appareil de Stern et Gerlach donne deux jets pour un spin 1/2 : deux états de base, deux amplitudes. La matrice R, elle, décrit un changement de base, pas un état." },
      globale: { prompt: "On multiplie C₊ et C₋ par le même facteur e^iδ. Qu'est-ce qui change dans les prédictions ?",
        options: { a: "Les probabilités dans la base S.", b: "Les probabilités dans une base tournée.", c: "Le sens du spin.", d: "Rien : une phase commune ne change aucune probabilité." },
        why: "Toute amplitude ⟨χ|ψ⟩ est multipliée par e^iδ, de module 1. Les probabilités, carrés des modules, ne bougent pas." },
      relative: { prompt: "Deux états ont les mêmes |C₊|² = |C₋|² = 1/2 mais une phase relative différente. Peut-on les distinguer ?",
        options: { a: "Oui, par un appareil tourné : la phase relative change les probabilités dans une autre base.", b: "Non, jamais.", c: "Oui, par un appareil S.", d: "Non, seule la phase commune compte." },
        why: "Dans la base S, les probabilités sont égales. Vus par T tourné de 90° autour de y, (+S + \u2212S)/√2 et (+S \u2212 \u2212S)/√2 sortent l'un tout par +T, l'autre tout par \u2212T." },
      geometrie: { prompt: "Sur quoi repose la détermination des matrices R du spin 1/2, dans ce chapitre ?",
        options: { a: "Sur de nouvelles mesures de Stern et Gerlach.", b: "Sur la valeur du moment magnétique de l'électron.", c: "Sur le fait qu'il y a deux états, sur l'isotropie de l'espace et sur la composition des rotations.", d: "Sur l'équation de Dirac." },
        why: "Le raisonnement est purement géométrique : R ne dépend que de la rotation, et deux rotations successives se composent par produit de matrices." },
      matrice: { prompt: "Que représente R_ji = ⟨jT|iS⟩ ?",
        options: { a: "La probabilité de passer de i à j.", b: "L'amplitude qu'une particule dans l'état de base i de S soit trouvée dans l'état de base j de T.", c: "La rotation de la particule.", d: "Un élément d'une matrice de rotation des coordonnées." },
        why: "C'est une amplitude, complexe en général. Son carré de module est une probabilité. Elle a la forme d'une rotation de coordonnées mais agit sur deux nombres complexes." },
      unique: { prompt: "Pourquoi la matrice R n'est-elle définie qu'à un facteur e^iδ près ?",
        options: { a: "Parce qu'une phase commune à toutes les amplitudes de T ne change aucune prédiction.", b: "Parce que la rotation n'est pas connue.", c: "Parce que R est réelle.", d: "Parce que les appareils ont des pertes." },
        why: "Multiplier tous les ⟨jT|iS⟩ par e^iδ revient à changer la phase commune des états de T : rien de mesurable ne change. La suite fixe ce facteur par une convention, la forme standard." },
      tous: { prompt: "Laquelle de ces particules n'a pas un spin 1/2 ?",
        options: { a: "L'électron.", b: "Le neutron.", c: "Le deutéron.", d: "Le proton." },
        why: "Le deutéron, noyau d'un proton et d'un neutron, a un spin 1. L'électron, le proton et le neutron ont un spin 1/2." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-1 (texte original en anglais). Notations SI. Pauli (1924) ; Uhlenbeck et Goudsmit (1925) ; Pauli (1927) ; Dirac (1928). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

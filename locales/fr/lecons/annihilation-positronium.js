/* Leçon « L'annihilation du positronium » (Feynman III.18.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/annihilation-positronium.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "L'annihilation du positronium",
    "crumb.jour": "L'annihilation du positronium",
    "h1": "L'annihilation du positronium",
    "lede": "Un électron et un positon liés forment un atome éphémère, le positronium. Dans son état de spin 0, il disparaît en deux photons de 511 keV, partis dos à dos. Le moment cinétique et la parité fixent l'état de ces deux photons, et ils en font une paire intriquée : mesurer la polarisation de l'un décide de celle de l'autre.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la diffusion de la lumière par un atome",
    "eq.coinc": "coïncidence",
    "eq.sin": "sin",

    "s1.sec": "Ce que doit être l'état final",
    "s1.h2": "Deux photons, moment cinétique nul",
    "s1.p1": "Le système : un positronium dans son état fondamental de spin 0, au repos. Il s'annihile en deux photons qui partent en sens opposés le long de l'axe <var>z</var>, le photon 1 vers le haut, le photon 2 vers le bas. Le moment cinétique total est nul : selon <var>z</var>, les deux photons doivent porter des moments opposés. Le photon 1 droit, +ħ selon <var>z</var>, va avec le photon 2 droit, qui porte +ħ selon sa propre direction \u2212<var>z</var>, soit \u2212ħ selon <var>z</var>. De même pour deux photons gauches.",
    "s1.p2": "Il reste deux états possibles, |<var>R</var><sub>1</sub><var>R</var><sub>2</sub>⟩ et |<var>L</var><sub>1</sub><var>L</var><sub>2</sub>⟩, que l'inversion d'espace échange. Le positronium de spin 0 a une parité impaire, ce que la mesure de la section suivante confirme : l'état final doit être impair, c'est la différence des deux :",
    "val.18.19": "Exacte, à une constante près, pour la désintégration en deux photons d'un état de spin 0 et de parité impaire. Elle n'utilise que les symétries ; la durée de vie, elle, demande l'électrodynamique quantique. Il faut la diviser par √2 pour la normer.",
    "val.18.20": "Exacte : l'inversion change le sens de propagation et la circulation, donc |<var>R</var><sub>1</sub><var>R</var><sub>2</sub>⟩ en |<var>L</var><sub>1</sub><var>L</var><sub>2</sub>⟩. Un état de parité paire serait la somme ; c'est la mesure des polarisations qui tranche.",

    "s2.sec": "Les polarisations linéaires",
    "s2.h2": "Des photons qui se répondent",
    "s2.p1": "Mettons un polariseur linéaire sur chaque trajet. En développant |<var>R</var>⟩ et |<var>L</var>⟩ sur |<var>x</var>⟩ et |<var>y</var>⟩ pour chaque photon :",
    "val.18.23": "Exacte pour l'état (18.19), non normé, avec les conventions de phase de |<var>R</var>⟩ et |<var>L</var>⟩ prises pour chaque photon autour de sa propre direction. Pour l'état pair, ce serait l'inverse : polarisations parallèles toujours, perpendiculaires jamais.",
    "s2.p2": "Les deux photons ne sont jamais polarisés parallèlement. Avec l'état normé, et des polariseurs orientés aux angles φ<sub>1</sub> et φ<sub>2</sub> mesurés de la même façon dans le laboratoire, la probabilité que les deux passent est :",
    "val.18.23a": "Exacte pour l'état (18.19) normé et des polariseurs parfaits. Elle ne dépend que de φ<sub>1</sub> \u2212 φ<sub>2</sub>, parce que l'état a un moment cinétique nul : tourner les deux polariseurs ensemble ne change rien. Avec des photons de 511\u00a0keV, on mesure la polarisation par diffusion Compton : l'efficacité est loin de 1 et le contraste réduit.",

    "s3.sec": "Faire l'expérience",
    "s3.h2": "Deux polariseurs, des milliers de paires",
    "s3.p1": "Orientez les deux polariseurs. La courbe donne la probabilité de coïncidence en fonction de leur écart. Le bouton tire 2\u00a0000 paires au hasard : chaque photon 1 passe une fois sur deux ; s'il passe, le photon 2 passe avec la probabilité conditionnelle sin<sup>2</sup>(φ<sub>1</sub> \u2212 φ<sub>2</sub>).",
    "fig.aria": "Probabilité que les deux photons d'annihilation traversent leurs polariseurs, en fonction de l'écart des angles des polariseurs, avec un tirage au hasard",
    "fig.legend.q": "prévision quantique, sin²(φ₁ \u2212 φ₂)/2",
    "fig.legend.mesure": "fréquence tirée sur 2 000 paires",
    "fig.phi1": "Polariseur du photon 1, φ₁",
    "fig.phi2": "Polariseur du photon 2, φ₂",
    "fig.tirer": "Tirer 2 000 paires",
    "fig.x": "écart φ₁ \u2212 φ₂",
    "fig.y": "probabilité de coïncidence",
    "fig.k.coinc": "Probabilité que les deux passent",
    "fig.f.tirage": "tirage : {c} coïncidences sur {n} paires",
    "fig.f.pasTirage": "pas de tirage pour ces angles",
    "fig.k.cond": "Si le photon 1 passe, probabilité que le 2 passe",
    "fig.f.cond": "chacun seul passe une fois sur deux",
    "fig.caption": "Chaque photon, pris seul, n'a aucune polarisation privilégiée : il passe une fois sur deux, quel que soit l'angle. Mais les deux ensemble sont parfaitement corrélés : à 90° d'écart, chaque photon 1 qui passe a un partenaire qui passe ; à 0°, jamais. Le tirage fluctue autour de la prévision, de l'ordre de 1/√<var>N</var>.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Spin 0 et spin 1",
    "s4.p1": "Le positronium se forme dans l'état de spin 0 une fois sur quatre et dans l'état de spin 1 trois fois sur quatre. Un état de spin 1 ne peut pas se désintégrer en deux photons ; il lui en faut trois, ce qui est beaucoup plus lent.",
    "sys.title": "Deux durées de vie dans le vide",
    "sys1.body": "Le spin 0 vit en moyenne {tp} ; le spin 1, {to}, environ {r} fois plus. Dans un matériau, le positon du spin 1 s'annihile souvent avant, avec un électron du milieu : sa durée de vie mesurée renseigne sur les vides du matériau.",
    "sys2.body": "Chaque photon emporte l'énergie de masse d'un électron, {e}, moins une part infime : l'énergie de liaison du positronium, 6,8\u00a0eV, n'en est que {b}. C'est pourquoi on peut traiter les deux photons comme partant exactement dos à dos, avec la même énergie.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Le premier état intriqué mesuré",
    "hist.intro": "L'atome d'électron et de positon a été prévu, puis sa désintégration a servi à mesurer, sans le savoir, la première corrélation quantique entre deux particules éloignées.",
    "hist.events": {
      mohorovicic: { who: "Stjepan Mohorovičić", what: "prévoit dans les Astronomische Nachrichten un état lié d'un électron et d'une particule positive de même masse, qu'il nomme « electrum ».", context: "Il ne l'identifie pas encore à l'antiélectron de Dirac, découvert deux ans plus tôt." },
      wheeler: { who: "John Wheeler", what: "propose de vérifier la prévision de polarisations perpendiculaires des deux photons d'annihilation.", context: "L'idée est de mesurer la polarisation de chaque photon par la direction de sa diffusion Compton, et de comparer les coïncidences dans deux orientations." },
      wu: { who: "Chien-Shiung Wu et Irving Shaknov", what: "publient la mesure dans la Physical Review : un rapport d'asymétrie de 2,04 ± 0,08 entre les deux orientations.", context: "La valeur attendue pour leur montage est 2,00. On reconnaît aujourd'hui dans cette mesure la première production contrôlée d'un état intriqué ; Bohm et Aharonov ont montré en 1957 qu'un état non intriqué ne l'expliquait pas." },
      deutsch: { who: "Martin Deutsch", what: "découvre expérimentalement le positronium au Massachusetts Institute of Technology.", context: "Dix-sept ans après la prévision de Mohorovičić, l'atome d'électron et de positon est observé : il existe assez longtemps pour être étudié." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      tep: { name: "La tomographie par émission de positons", text: "On injecte au patient une molécule marquée par un noyau radioactif émetteur de positons. Chaque positon s'annihile avec un électron, souvent après avoir formé un positronium, en deux photons de 511\u00a0keV partis dos à dos. Une couronne de détecteurs enregistre les paires en coïncidence ; la droite qui joint les deux détecteurs passe par le point d'émission." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      deux: { prompt: "Pourquoi les deux photons d'annihilation du positronium de spin 0 sont-ils tous deux droits ou tous deux gauches ?",
        options: { a: "Parce que l'électron et le positon tournent dans le même sens.", b: "Parce que leurs moments selon z doivent se compenser : deux photons droits allant en sens opposés portent +ħ et \u2212ħ selon z.", c: "Parce que la parité impose deux photons de même polarisation linéaire.", d: "C'est faux : l'un est droit, l'autre gauche." },
        why: "La circulation se définit par rapport à la direction de propagation. Un photon droit vers +z porte +ħ selon z ; un photon droit vers \u2212z porte \u2212ħ selon z. La somme est nulle, comme le moment cinétique initial." },
      trois: { prompt: "Pourquoi le positronium de spin 1 ne peut-il pas se désintégrer en deux photons ?",
        options: { a: "Parce qu'il n'a pas assez d'énergie.", b: "Parce qu'il est électriquement chargé.", c: "Parce que ses deux particules sont trop éloignées.", d: "Parce que deux photons ne peuvent pas former un état de moment cinétique 1 : il lui faut trois photons, ce qui le rend environ mille fois plus durable." },
        why: "Les symétries interdisent l'état de deux photons de spin total 1. La désintégration en trois photons est permise, mais beaucoup plus lente : 142 ns contre 0,12 ns." },
      parite: { prompt: "Qu'est-ce qui distingue l'état (18.19), |R₁R₂⟩ \u2212 |L₁L₂⟩, de la somme |R₁R₂⟩ + |L₁L₂⟩ ?",
        options: { a: "Sa parité : impaire pour la différence, paire pour la somme. Les deux donnent des corrélations de polarisation linéaire opposées.", b: "Rien de mesurable.", c: "L'énergie des photons.", d: "Le nombre de photons." },
        why: "L'inversion échange R₁R₂ et L₁L₂. La différence change de signe : parité impaire. La différence donne des polarisations toujours perpendiculaires ; la somme les donnerait toujours parallèles. C'est ainsi que l'on mesure la parité du positronium." },
      croises: { prompt: "Les deux polariseurs sont croisés, φ₁ \u2212 φ₂ = 90°. Le photon 1 passe. Quelle est la probabilité que le photon 2 passe ?",
        options: { a: "1/2.", b: "0.", c: "1 : avec l'état (18.19), les polarisations sont toujours perpendiculaires.", d: "1/4." },
        why: "La probabilité conditionnelle vaut sin²(φ₁ \u2212 φ₂) = 1. La probabilité de coïncidence, sans condition, vaut 1/2, puisque le photon 1 ne passe qu'une fois sur deux." },
      paralleles: { prompt: "Les deux polariseurs sont parallèles. Quelle fraction des paires donne une coïncidence ?",
        options: { a: "1/2.", b: "0.", c: "1/4, comme pour des photons indépendants.", d: "1." },
        why: "sin²0 = 0 : jamais. Pour des photons non corrélés, chacun passant une fois sur deux, on aurait 1/4. L'écart est la signature de l'état (18.19)." },
      un: { prompt: "On ne regarde que le photon 1. Quelle est la probabilité qu'il traverse son polariseur ?",
        options: { a: "1/2, quel que soit l'angle : pris seul, il n'a aucune polarisation privilégiée.", b: "Elle dépend de l'angle φ₁.", c: "1, il est polarisé selon x.", d: "0." },
        why: "L'état d'un seul photon de la paire n'a pas de polarisation définie : il passe une fois sur deux à tout angle. Toute l'information est dans les corrélations entre les deux, que seule une comparaison des mesures révèle." },
      vie: { prompt: "Pourquoi peut-on traiter les deux photons comme ayant exactement 511 keV chacun ?",
        options: { a: "Parce que le positon est plus lourd que l'électron.", b: "Parce que les photons ont une masse nulle.", c: "Parce que l'énergie de liaison, 6,8 eV, n'est que 1,3 × 10⁻⁵ de l'énergie de masse, et que le positronium est presque au repos.", d: "Parce que c'est une définition." },
        why: "L'énergie totale vaut 2mₑc² \u2212 6,8 eV ; partagée entre deux photons dos à dos, elle donne 511 keV chacun à 10⁻⁵ près. Un positronium en mouvement donnerait des photons légèrement décalés et pas exactement opposés." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 18, §18-3 (texte original en anglais). Notations SI. Durées de vie, énergie de liaison, Mohorovičić, Deutsch, tomographie : Wikipédia, « Positronium ». Wu et Shaknov : Physical Review 77, 136 (1950) ; Wheeler, Bohm et Aharonov : « Chien-Shiung Wu as the experimental pioneer in quantum entanglement: a 2022 note », arXiv:2502.06458. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

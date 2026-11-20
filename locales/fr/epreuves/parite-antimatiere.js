/* Épreuve de l'étape « Parité et antimatière » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      mains: { prompt: "Un physicien calcule le champ d'un fil et la force sur une charge voisine avec la main gauche, partout. Que trouve-t-il, comparé à ses collègues ?",
        options: { a: "Des champs B opposés et les mêmes forces : deux règles de la main, deux changements de signe qui s'annulent.", b: "Les mêmes champs et des forces opposées.", c: "Des champs et des forces opposés : il prédit une répulsion entre courants parallèles.", d: "Les mêmes champs et les mêmes forces : la main ne joue aucun rôle." },
        hint: "Comptez les produits vectoriels entre le courant du fil et la force sur la charge.",
        why: "F = q v × (u × n) μ0 I/(2π d) contient deux produits vectoriels. Changer de main change le signe de chacun : B change de sens, F non. Aucune mesure ne départage les deux conventions. Leçon « Distinguer la droite de la gauche »." },
      axial: { prompt: "Un champ magnétique vaut B = (1 ; 2 ; 3) mT. Que vaut le champ de l'expérience construite dans le miroir de normale z ?",
        options: { a: "(1 ; 2 ; \u22123) mT, l'image d'une flèche ordinaire.", b: "(\u22121 ; \u22122 ; 3) mT : B est axial, l'opposé de l'image d'une flèche.", c: "(\u22121 ; \u22122 ; \u22123) mT.", d: "(1 ; 2 ; 3) mT : un miroir ne change pas un champ." },
        hint: "Un vecteur axial se transforme comme une flèche, puis change de signe dans une réflexion.",
        why: "L'image polaire est (1 ; 2 ; \u22123). Un vecteur axial prend en plus le déterminant du miroir, \u22121 : (\u22121 ; \u22122 ; 3). La composante normale au miroir garde son sens, celles du plan changent. Leçon « Distinguer la droite de la gauche »." },
      cobalt: { prompt: "Des noyaux de cobalt 60 sont polarisés à 50 % ; on compte des électrons de v/c = 0,8. Avec A = \u22121, quelle part part du côté du spin ?",
        options: { a: "50 %, puisque la moitié des noyaux est alignée.", b: "60 %.", c: "40 % : a = \u22120,4, et (1 + a/2)/2 = 0,40.", d: "20 %." },
        hint: "a = A P v/c, puis la part de l'hémisphère θ < 90°.",
        why: "a = (\u22121)(0,5)(0,8) = \u22120,4. La part du côté du spin vaut (1 \u2212 0,2)/2 = 0,40 : 40 % vers le spin, 60 % à l'opposé. Leçon « La parité n'est pas conservée »." },
      image: { prompt: "Pourquoi l'image de l'expérience du cobalt 60 dans un miroir parallèle au champ n'est-elle pas une expérience possible ?",
        options: { a: "Parce qu'un miroir inverse le sens du temps.", b: "Parce que, dans l'image, le cobalt devient de l'anti-cobalt.", c: "Parce que le miroir change la vitesse des électrons.", d: "Parce que le spin, axial, s'y retourne alors que les électrons, polaires, partent du même côté : ils partent du côté du spin, à l'inverse de la loi." },
        why: "La distribution W(θ) = 1 + a cos θ, avec a ≠ 0, n'est pas paire en cos θ. Le miroir change θ en π \u2212 θ : l'image demande \u2212a, que la nature ne donne pas pour le cobalt. Leçon « La parité n'est pas conservée »." },
      annihilation: { prompt: "Un positon d'énergie cinétique 1 MeV s'annihile en vol avec un électron immobile, en deux photons. Que vaut la somme de leurs énergies ?",
        options: { a: "Environ 2,02 MeV : T + 2mc², tous les angles d'émission donnant la même somme.", b: "1,022 MeV, 2mc² quel que soit T.", c: "1 MeV, l'énergie cinétique du positon.", d: "Elle dépend de l'angle d'émission dans le centre de masse." },
        why: "L'énergie se conserve : T + 2mc² = 1 + 2 × 0,511 ≈ 2,02 MeV. Seul le partage entre les deux photons, et l'angle entre eux, dépendent de la direction d'émission. Leçon « L'antimatière »." },
      neutrino: { prompt: "On applique à un neutrino gaucher la conjugaison de charge C, puis la parité P. Qu'obtient-on ?",
        options: { a: "Un neutrino droitier, que la nature n'a pas.", b: "Un antineutrino droitier, que la nature a : c'est l'état émis avec l'électron du cobalt 60.", c: "Un antineutrino gaucher, que la nature n'a pas.", d: "Le même neutrino." },
        hint: "C change la particule en antiparticule ; P retourne l'impulsion et garde le spin.",
        why: "P seule donne un neutrino droitier, C seule un antineutrino gaucher : ni l'un ni l'autre n'existe. CP donne l'antineutrino droitier, observé. La matière droitière se comporte comme l'antimatière gauchère. Leçon « L'antimatière »." },
      miroirs: { prompt: "Pour deux noyaux miroirs de nombre de masse 41, le modèle de la boule chargée (r0 = 1,2 fm) donne un écart coulombien de 8,4 MeV. Avec une liaison d'environ 8 MeV par nucléon, que vaut la brisure relative de la symétrie proton-neutron ?",
        options: { a: "Environ 25 %.", b: "Environ 0,025 %.", c: "Environ 2,5 % : 8,4 MeV sur environ 330 MeV.", d: "Zéro : les forces nucléaires sont les mêmes." },
        why: "La liaison totale vaut environ 8 × 41 ≈ 330 MeV ; 8,4/330 ≈ 2,5 %. La symétrie décrit les noyaux à quelques pour cent près, et l'on sait ce qui la brise : la répulsion entre protons. Leçon « Les symétries brisées »." },
      temps: { prompt: "Après 1964, CP n'est plus exacte, alors que CPT l'est toujours. Qu'en déduit-on pour le renversement du temps T ?",
        options: { a: "Que T est exacte, puisque CPT l'est.", b: "Rien : T est indépendante de C et de P.", c: "Que T est violée autant que P, entièrement.", d: "Que T n'est pas exacte non plus : si T et CPT l'étaient, leur produit CP le serait." },
        why: "Le produit de deux symétries est une symétrie. CPT exacte et T exacte donneraient CP exacte, ce qu'interdit la désintégration en deux pions des kaons neutres de longue durée de vie. Leçon « Les symétries brisées »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

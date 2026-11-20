/* Épreuve de l'étape « Lentilles et focalisation de faisceaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      tubes: { prompt: "Deux tubes coaxiaux forment une lentille électrostatique : les électrons y passent de 1\u00a0kV à 9\u00a0kV. Quel est le rapport de la focale image à la focale objet ?",
        options: { a: "3, la racine du rapport des potentiels, comme le rapport des vitesses.", b: "9, le rapport des potentiels.", c: "1 : une lentille mince a deux focales égales.", d: "1/3 : la focale est plus courte du côté rapide." },
        hint: "La vitesse des électrons joue le rôle de l'indice.",
        why: "f′/f = √(V₂/V₁) = √9 = 3 : c'est le rapport des vitesses, l'analogue du rapport des indices de part et d'autre d'un dioptre. Leçon « Lentille électrostatique »." },
      ions: { prompt: "Dans une même lentille électrostatique, sous les mêmes tensions, on envoie des électrons puis des ions gallium de charge +e. Où se trouve le foyer des ions, une fois les signes des tensions inversés pour eux ?",
        options: { a: "Plus loin, dans le rapport des masses, 1,3\u00a0×\u00a010⁵.", b: "Au même endroit : l'équation du rayon ne contient que le potentiel, ni la charge ni la masse.", c: "Plus près : les ions, plus lents, restent plus longtemps dans le champ.", d: "Nulle part : la lentille est trop faible pour des ions lourds." },
        why: "r″ + V′r′/(2V) + V″r/(4V) = 0 ne fait intervenir que V et ses dérivées. Plus lent, l'ion reçoit une impulsion plus longue, exactement en proportion : même trajectoire. C'est pourquoi les sondes ioniques sont électrostatiques. Leçon « Lentille électrostatique »." },
      courant: { prompt: "Une lentille magnétique faible focalise des électrons de 50\u00a0kV à 4,0\u00a0cm. On augmente son courant de 50\u00a0%, le champ suit. Que devient la focale ?",
        options: { a: "2,7\u00a0cm : f est inversement proportionnelle au courant.", b: "6,0\u00a0cm.", c: "1,8\u00a0cm : 1/f est proportionnel à l'intégrale de B², la focale est divisée par 1,5² = 2,25.", d: "4,0\u00a0cm : la focale ne dépend que de l'énergie." },
        why: "Formule de Busch : 1/f ≈ (q/2p)² ∫B² dz. Un champ 1,5 fois plus intense donne une vergence 2,25 fois plus grande : 4,0/2,25 ≈ 1,8\u00a0cm, tant que la lentille reste faible. Leçon « Lentille magnétique »." },
      inverse: { prompt: "On inverse le courant de la lentille magnétique d'un microscope. Qu'observe-t-on sur l'écran ?",
        options: { a: "L'image disparaît : la lentille diverge.", b: "L'image est deux fois plus grande.", c: "Rien ne change, pas même l'orientation.", d: "L'image reste nette au même endroit, mais elle a tourné dans l'autre sens." },
        why: "La focale dépend de B², la rotation de l'image de l'intégrale de B : seule la rotation change de signe. Leçon « Lentille magnétique »." },
      correcteur: { prompt: "Au meilleur compromis entre diffraction et aberration sphérique, le flou d'un microscope électronique varie comme λ^(3/4) Cₛ^(1/4). Un correcteur divise Cₛ par 81, à tension égale. Que devient le flou ?",
        options: { a: "Il est divisé par 3.", b: "Il est divisé par 81.", c: "Il est divisé par 9.", d: "Il ne change pas : la diffraction reste la limite." },
        hint: "81 = 3⁴.",
        why: "81^(1/4) = 3. Réduire un peu Cₛ ne gagne presque rien ; c'est pourquoi les correcteurs à multipôles visent à l'annuler, en abandonnant la symétrie de révolution qui le rend positif. Leçon « Microscope électronique »." },
      indice: { prompt: "Le champ de guidage d'un anneau varie comme r^(\u22121/4) près de l'orbite. Combien d'oscillations radiales et verticales une particule fait-elle par tour ?",
        options: { a: "1 et 0 : le champ est presque uniforme.", b: "√0,75 ≈ 0,87 radialement et 0,5 verticalement.", c: "0,5 radialement et 0,87 verticalement.", d: "Aucune : l'orbite est instable." },
        why: "n = \u22121/4 : ν_r = √(1 + n) = √0,75 ≈ 0,87 et ν_z = √(\u2212n) = 0,5. La somme des carrés vaut 1 : on ne renforce l'un qu'aux dépens de l'autre. Leçon « Champs de guidage d'un accélérateur »." },
      quadripole: { prompt: "Un quadripôle de 3\u00a0m de long, de gradient 200\u00a0T·m⁻¹, agit sur des protons de rigidité Bρ = 23\u00a0350\u00a0T·m (7\u00a0TeV). Quelle est sa focale ?",
        options: { a: "Environ 0,04\u00a0m.", b: "Environ 117\u00a0m.", c: "Environ 39\u00a0m, convergente dans un plan et divergente dans l'autre.", d: "Environ 39\u00a0m, convergente dans les deux plans." },
        why: "1/f = Gℓ/(Bρ) = 600/23\u00a0350 : f ≈ 39\u00a0m. Un quadripôle seul défocalise toujours dans l'autre plan : il faut l'alterner avec un quadripôle tourné. Leçon « Focalisation à gradient alterné »." },
      maille: { prompt: "Une ligne de lentilles minces alternées, de focales ±4\u00a0m, espacées de L = 10\u00a0m. Le faisceau est-il gardé ?",
        options: { a: "Oui : l'alternance focalise toujours.", b: "Oui, mais seulement dans le plan horizontal.", c: "Oui, car les lentilles sont fortes.", d: "Non : cos μ = 1 \u2212 L²/(2f²) ≈ \u22122,1, hors de [\u22121, 1] ; il faut L < 2f, soit des lentilles de plus de 5\u00a0m de focale." },
        why: "Des lentilles trop fortes pour leur espacement surcorrigent : chaque rayon repart plus loin de l'autre côté. La stabilité demande L < 2f. Leçon « Focalisation à gradient alterné »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

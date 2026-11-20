/* Leçon « Régime stationnaire et résistance thermique » (programme de CPGE, X.transferts_thermiques.2) : textes en français. Une autre langue = locales/<langue>/lecons/regime-stationnaire-et-resistance-thermique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {

    "title": "Régime stationnaire et résistance thermique",
    "crumb.jour": "Résistance thermique",
    "h1": "Régime stationnaire et résistance thermique",
    "lede": "Quand plus rien ne change, la chaleur traverse un mur comme un courant traverse un fil : même flux partout, une chute de température aux bornes, une résistance entre les deux. On additionne les couches comme des résistances en série, à condition de savoir quand on en a le droit.",
    "tag.piste": "Thermodynamique et physique statistique",
    "tag.prereq": "Prérequis : loi de Fourier et équation de la chaleur",
    "eq.th": "th", "eq.serie": "série", "eq.par": "parallèle", "eq.ln": "ln",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Le même flux dans toutes les sections",
    "s1.p1": "Un mur d'épaisseur <var>e</var> et de surface <var>S</var>, large devant son épaisseur, a ses faces maintenues à <var>T</var><sub>1</sub> et <var>T</var><sub>2</sub> depuis assez longtemps pour que plus rien ne varie. En régime stationnaire, aucune tranche n'accumule d'énergie : le flux thermique Φ, en watts, est le même à travers toute section. Avec la loi de Fourier, cela impose une température affine en <var>x</var>, et :",
    "val.plan": "Approximation : régime stationnaire, atteint après quelques <var>e</var>²/<var>D</var> ; conduction à une dimension, donc loin des bords et des angles ; <var>λ</var> uniforme. Pour 1\u00a0m² de brique de 20\u00a0cm : <var>R</var><sub>th</sub> = 0,29\u00a0K·W⁻¹. Le régime s'y établit en 21\u00a0h : sous une température extérieure qui change en quelques heures, la formule ne donne qu'une moyenne.",
    "s1.p2": "<var>R</var><sub>th</sub> est la résistance thermique du mur, en K·W⁻¹. Elle croît avec l'épaisseur et décroît avec la conductivité et la surface. Les thermiciens du bâtiment la rapportent à 1\u00a0m² de paroi, en m²·K·W⁻¹, et notent <var>U</var> son inverse, en W·m⁻²·K⁻¹.",

    "s2.sec": "2 · L'analogie électrique",
    "s2.h2": "Des murs comme des résistances",
    "s2.p1": "La loi de Fourier <var>j</var>⃗ = \u2212<var>λ</var>∇<var>T</var> a la forme de la loi d'Ohm locale, densité de courant égale à conductivité fois champ, avec le champ égal à moins le gradient du potentiel. En régime stationnaire, les deux flux se conservent. Tout ce qu'on sait des circuits en courant continu se transpose :",
    "ana.items": {
      potentiel: { th: "Température T", el: "Potentiel électrique V" },
      courant: { th: "Flux thermique Φ (W)", el: "Intensité I (A)" },
      resistance: { th: "Résistance e/(λS) (K·W⁻¹)", el: "Résistance ℓ/(γS) (Ω), γ la conductivité électrique" },
      noeuds: { th: "Conservation du flux", el: "Loi des nœuds" },
      capacite: { th: "Capacité thermique (hors régime stationnaire)", el: "Condensateur relié à la masse" },
    },
    "val.assoc": "Exacte en régime stationnaire quand les surfaces de contact sont des isothermes. En série, le même flux traverse toutes les couches. En parallèle, deux chemins relient les mêmes températures ; la formule néglige le flux latéral d'un chemin à l'autre, ce qui est faux près d'un pont thermique comme un montant métallique dans un isolant.",
    "s2.p2": "L'analogie a une limite nette. Une résistance électrique répond instantanément à l'échelle d'un circuit ; un mur stocke de l'énergie. La résistance thermique seule ne vaut que si les températures aux bornes varient lentement devant <var>e</var>²/<var>D</var> : c'est l'analogue thermique de l'approximation des régimes quasi stationnaires. Au-delà, il faut ajouter des capacités au schéma, ou revenir à l'équation de la chaleur (leçon « Régime variable et ondes thermiques »).",

    "s3.sec": "3 · De l'air à l'air",
    "s3.h2": "Les résistances de surface",
    "s3.p1": "La face d'un mur n'est pas à la température de l'air qui la baigne. Entre la paroi et l'air loin d'elle, l'échange se fait par convection et rayonnement, avec un flux à peu près proportionnel à l'écart de température : c'est une résistance de plus, en série (leçon « Convection, loi de Newton et ailette »). La norme EN\u00a0ISO\u00a06946 retient, pour un flux horizontal, 0,13\u00a0m²·K·W⁻¹ côté intérieur et 0,04\u00a0m²·K·W⁻¹ côté extérieur, où le vent améliore l'échange.",
    "s3.p2": "Pour le mur de brique de 20\u00a0cm, entre un intérieur à 293\u00a0K et un extérieur à 273\u00a0K : 0,13 + 0,29 + 0,04 = 0,46\u00a0m²·K·W⁻¹, soit <var>U</var> = 2,2\u00a0W·m⁻²·K⁻¹ et 43\u00a0W par mètre carré. La face intérieure est à 287,3\u00a0K, près de 6\u00a0K sous l'air de la pièce : une paroi froide, sur laquelle l'humidité peut condenser. Avec 12\u00a0cm de laine minérale, la résistance passe à 3,46\u00a0m²·K·W⁻¹, le flux à 5,8\u00a0W·m⁻², et la face intérieure à 292,2\u00a0K. L'isolant porte alors 87\u00a0% de la chute de température : dans une série, la plus grande résistance commande.",

    "s4.sec": "4 · Autour d'un tuyau",
    "s4.h2": "Quand la surface traversée grandit",
    "s4.p1": "Autour d'un tuyau de longueur <var>L</var>, la chaleur s'écoule radialement. Le flux total Φ se conserve encore, mais il traverse des cylindres de surface 2π<var>rL</var> croissante : la densité de flux décroît comme 1/<var>r</var>, et la température varie comme ln\u00a0<var>r</var>. Entre les rayons <var>r</var><sub>1</sub> et <var>r</var><sub>2</sub> :",
    "val.cyl": "Approximation : régime stationnaire, tuyau long devant son rayon, <var>λ</var> uniforme. Pour une couche mince, ln(<var>r</var><sub>2</sub>/<var>r</var><sub>1</sub>) ≈ <var>e</var>/<var>r</var><sub>1</sub> et l'on retrouve le mur plan ; l'écart relatif vaut <var>e</var>/(2<var>r</var><sub>1</sub>), soit 5\u00a0% pour un manchon dont l'épaisseur est le dixième du rayon.",
    "s4.p2": "Doubler l'épaisseur d'un manchon isolant ne double pas sa résistance : pour un tuyau de 1\u00a0cm de rayon, passer de 1 à 2\u00a0cm d'isolant multiplie ln(<var>r</var><sub>2</sub>/<var>r</var><sub>1</sub>) par 1,58 seulement. Et la surface extérieure, qui échange avec l'air, a grandi. Sur un fil très fin, une gaine peut même augmenter les pertes.",

    "s5.sec": "5 · Un mur en couches",
    "s5.h2": "Où tombe la température",
    "s5.p1": "Un mur de brique, isolé ou non par l'extérieur avec de la laine minérale, sépare une pièce à 293\u00a0K de l'air extérieur. La courbe donne la température de l'air intérieur à l'air extérieur ; les sauts aux deux surfaces sont ceux des résistances de surface.",
    "mur.aria": "Profil de température à travers un mur de brique et sa couche d'isolant, de l'air intérieur à l'air extérieur",
    "mur.leg.t": "Température", "mur.leg.couches": "Limites des couches",
    "mur.eb": "Épaisseur de brique", "mur.ei": "Épaisseur d'isolant", "mur.te": "Température extérieure",
    "mur.x": "x (m), de l'intérieur vers l'extérieur", "mur.y": "T (K)",
    "mur.k.r": "Résistance totale", "mur.f.r": "pour 1 m², surfaces comprises",
    "mur.k.u": "<var>U</var>", "mur.f.u": "coefficient de transmission",
    "mur.k.phi": "Flux", "mur.f.phi": "de l'intérieur vers l'extérieur",
    "mur.k.ts": "Face intérieure", "mur.f.ts": "{d} sous l'air de la pièce",
    "mur.k.part": "Part de l'isolant", "mur.f.part": "dans la chute de température",
    "mur.caption": "Dans chaque couche, la pente est inversement proportionnelle à la conductivité : presque plate dans la brique, raide dans l'isolant. Quelques centimètres d'isolant suffisent à lui donner l'essentiel de la chute ; les suivants rapportent de moins en moins, puisque le flux varie comme l'inverse de la résistance totale. Conductivités : brique 0,69\u00a0W·m⁻¹·K⁻¹, laine minérale 0,04\u00a0W·m⁻¹·K⁻¹. Résistances de surface : EN\u00a0ISO\u00a06946.",
    "sys.title": "Le système, avant d'appliquer la loi",
    "sys.inner": "Mur plan, loin des angles et des ouvertures, entre l'air intérieur à {ti} et l'air extérieur à {te}, supposés constants. Part des deux surfaces dans la résistance totale : {rs}. Temps de diffusion dans la brique : {tau}, soit {r} jour. {avis}",
    "sys.ok": "C'est court devant un jour : le mur suit le cycle quotidien, et le calcul stationnaire vaut heure par heure.",
    "sys.lent": "Ce n'est pas court devant un jour : le mur n'a pas le temps de suivre le cycle quotidien. Le calcul stationnaire vaut pour des températures moyennées sur plusieurs jours ; à l'échelle de l'heure, la brique amortit et retarde.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "De la chaleur au courant, et retour",
    "hist.intro": "L'analogie a d'abord servi dans l'autre sens : c'est la théorie de la chaleur qui a montré comment penser le courant électrique.",
    "hist.events": {
      fourier: { who: "Joseph Fourier", what: "publie la Théorie analytique de la chaleur.", context: "Le flux y est proportionnel à la pente de température : le modèle de toutes les lois de transport linéaires." },
      ohm: { who: "Georg Simon Ohm", what: "publie Die galvanische Kette, mathematisch bearbeitet.", context: "Il s'inspire largement du travail de Fourier sur la conduction de la chaleur : le courant y descend une pente de potentiel comme la chaleur une pente de température." },
      dewar: { who: "James Dewar", what: "invente le vase à double paroi sous vide.", context: "Le vide entre les deux parois supprime la conduction et la convection ; l'argenture des faces réduit le rayonnement. Il reste le col, par où passe l'essentiel des pertes." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      batiment: { name: "Le coefficient U d'une paroi", text: "La méthode de calcul de la norme EN\u00a0ISO\u00a06946 est celle de cette page : résistances des couches en série, plus deux résistances de surface. Elle ajoute des corrections pour les lames d'air et les fixations qui traversent l'isolant." },
      composant: { name: "Refroidir un composant", text: "La fiche d'un transistor de puissance donne une résistance thermique entre la jonction et le boîtier, en K·W⁻¹. On y ajoute en série celle de l'interface et celle du dissipateur vers l'air ; la puissance dissipée, multipliée par la somme, donne l'échauffement de la jonction au-dessus de l'ambiante." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      conserve: { prompt: "En régime stationnaire, pourquoi le flux thermique est-il le même à travers toutes les sections d'un mur ?",
        options: { a: "Parce que la température est uniforme.", b: "Parce que la conductivité est uniforme.", c: "Parce qu'aucune tranche n'accumule d'énergie : ce qui entre par une face sort par l'autre.", d: "Parce que le mur est mince." },
        why: "Si le flux entrant dans une tranche dépassait le flux sortant, la tranche s'échaufferait, et le régime ne serait pas stationnaire. C'est l'analogue de la loi des nœuds." },
      serie: { prompt: "Une paroi de 1 m² est faite de 10 cm de béton (λ = 1,65 W·m⁻¹·K⁻¹) et de 10 cm de laine minérale (λ = 0,04). Quelle est sa résistance, surfaces non comprises ?",
        options: { a: "2,56 K·W⁻¹ : 0,06 + 2,50, en série.", b: "0,06 K·W⁻¹ : la plus petite l'emporte.", c: "0,059 K·W⁻¹ : en parallèle.", d: "1,28 K·W⁻¹ : la moyenne des deux." },
        hint: "Le même flux traverse les deux couches l'une après l'autre.",
        why: "e/λ = 0,10/1,65 = 0,06 et 0,10/0,04 = 2,50. En série, les résistances s'ajoutent, et l'isolant fait 98 % du total." },
      surface: { prompt: "Par 273 K dehors et 293 K dedans, la face intérieure d'un mur de brique nu est à 287 K. D'où vient cet écart de 6 K avec l'air de la pièce ?",
        options: { a: "D'une erreur de mesure.", b: "De la capacité thermique du mur.", c: "Du rayonnement solaire.", d: "De la résistance de surface intérieure, en série avec le mur : le flux qui la traverse y crée une chute de température." },
        why: "Chute = flux × résistance = 43 × 0,13 = 5,7 K. Plus le mur est isolé, plus le flux est faible, et plus la paroi est proche de la température de l'air." },
      isolant: { prompt: "Un mur a une résistance totale de 0,5 m²·K·W⁻¹. On lui ajoute un isolant de 2,5 m²·K·W⁻¹. Par combien divise-t-on les pertes ? Et si on double ensuite l'isolant ?",
        options: { a: "Par 5, puis encore par 5.", b: "Par 6, puis seulement par 1,8 de plus.", c: "Par 2,5, puis par 2.", d: "Par 6, puis encore par 6." },
        why: "Le flux varie comme 1/R : de 0,5 à 3,0, il est divisé par 6 ; de 3,0 à 5,5, par 1,83. Chaque centimètre supplémentaire rapporte moins que le précédent." },
      cylindre: { prompt: "Pourquoi la résistance d'un manchon cylindrique varie-t-elle comme ln(r₂/r₁) et non comme l'épaisseur r₂ \u2212 r₁ ?",
        options: { a: "Parce que le flux total se conserve à travers des cylindres de surface croissante : la densité de flux, donc la pente de température, décroît comme 1/r.", b: "Parce que la conductivité dépend du rayon.", c: "Parce que le régime n'est pas stationnaire.", d: "Parce que la température est uniforme dans le manchon." },
        why: "Φ = \u2212λ (2πrL) dT/dr est indépendant de r : dT/dr varie comme 1/r, et son intégrale donne un logarithme. Les couches extérieures, plus larges, résistent moins." },
      arqs: { prompt: "La température extérieure varie avec une période de 24 h. Le temps de diffusion e²/D d'un mur de brique de 20 cm est 21 h. Peut-on calculer le flux à chaque instant par (T_int \u2212 T_ext)/R ?",
        options: { a: "Oui, la résistance thermique vaut toujours.", b: "Oui, à condition d'ajouter les résistances de surface.", c: "Non : le mur n'a pas le temps d'atteindre le régime stationnaire ; il stocke et restitue de l'énergie, et le flux intérieur est amorti et retardé.", d: "Non, parce que la brique n'obéit pas à la loi de Fourier." },
        why: "La résistance seule suppose que les températures aux bornes changent lentement devant e²/D. Ici les deux durées sont comparables : il faut l'équation de la chaleur, ou au moins une capacité dans le schéma." },
      parallele: { prompt: "Un mur de 10 m², de résistance 0,30 K·W⁻¹, est percé d'une vitre de résistance 0,60 K·W⁻¹. Quelle est la résistance de l'ensemble ?",
        options: { a: "0,90 K·W⁻¹.", b: "0,45 K·W⁻¹.", c: "0,30 K·W⁻¹.", d: "0,20 K·W⁻¹ : les deux chemins sont en parallèle." },
        hint: "Les deux éléments relient les mêmes températures.",
        why: "1/R = 1/0,30 + 1/0,60 = 5,0 W·K⁻¹, donc R = 0,20 K·W⁻¹. En parallèle, les flux s'ajoutent, et l'ensemble résiste moins que chaque élément." },
    },

    "foot": "Source : programme officiel de CPGE, seconde année (MP, PC, PSI), transferts thermiques : régime stationnaire, résistance thermique, associations, analogie électrique. Résistances de surface : norme EN\u00a0ISO\u00a06946. Conductivités : valeurs usuelles près de 293\u00a0K.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

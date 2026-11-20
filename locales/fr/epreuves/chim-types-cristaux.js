/* Épreuve de l'étape « Cristaux ioniques et énergie réticulaire » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      types: { prompt: "Un solide fond à 1\u00a0691 K, isole à l'état solide, conduit fondu et se brise sous le marteau. Quel modèle de liaison et quelles entités aux nœuds ?",
        options: { a: "Ionique : des cations et des anions, que la fusion rend mobiles.", b: "Métallique : des cations dans une mer d'électrons.", c: "Covalent : des atomes liés par paires d'électrons.", d: "Moléculaire : des molécules tenues par des interactions de van der Waals." },
        hint: "Qu'est-ce qui porte le courant dans le liquide, s'il n'y en a pas dans le solide ?",
        why: "Isolant solide, conducteur fondu : des ions, fixés puis libérés. La fusion haute dit une cohésion forte. C'est CaF₂, cristal ionique. Leçons « Cristaux métalliques, ioniques, covalents et moléculaires » et « Comparer les solides par leurs données physiques »." },
      clivage: { prompt: "Dans le sel, on décale un plan (100) d'une distance entre ions, d = 282 pm, par rapport au plan voisin. Que devient l'énergie électrostatique, dans le modèle des charges ponctuelles ?",
        options: { a: "Elle ne change pas : le plan reste au contact.", b: "Elle augmente d'environ 66 kJ·mol⁻¹ : chaque ion fait face à un ion de même signe, d'où le clivage des cristaux ioniques.", c: "Elle diminue : les ions de même signe s'attirent.", d: "Elle double, comme pour un métal." },
        why: "Décalé de d, le damier du haut met + sur + et \u2212 sur \u2212. Un métal, dont la liaison n'a pas de direction, ne paie presque rien : il se déforme au lieu de se fendre. Leçon « Cristaux métalliques, ioniques, covalents et moléculaires »." },
      additivite: { prompt: "a(KCl) = 629,3 pm, a(NaCl) = 564,0 pm, a(KBr) = 660,0 pm, a(NaBr) = 597,7 pm, tous de structure NaCl. Que valent les deux estimations de r(K⁺) \u2212 r(Na⁺), et que testent-elles ?",
        options: { a: "65,3 et 62,3 pm : elles testent la structure.", b: "Elles sont égales à 10⁻³ près : les rayons sont exacts.", c: "32,6 et 31,1 pm : leur accord à 5\u00a0% près teste l'additivité des rayons, sans choisir aucun rayon de référence.", d: "Elles ne testent rien sans la valeur de r(O²⁻)." },
        why: "d = a/2 ; si d = r⁺ + r⁻, la différence de deux distances au même anion ne dépend que des cations. Le rayon de référence, 140 pm pour O²⁻, n'intervient pas dans une différence. Leçon « Dimensions des ions dans un cristal »." },
      coordinence: { prompt: "r(Zn²⁺, IV) = 60 pm et r(S²⁻) = 184 pm. Quelle coordinence la règle des rayons prévoit-elle pour Zn²⁺ ?",
        options: { a: "8, car ρ dépasse √3 \u2212 1.", b: "6, car ρ dépasse √2 \u2212 1.", c: "12, comme dans un empilement compact.", d: "4, car ρ = 0,33 est compris entre √(3/2) \u2212 1 = 0,225 et √2 \u2212 1 = 0,414 : c'est la blende, observée." },
        why: "En dessous de 0,414, l'octaèdre laisserait le cation flotter entre des anions au contact ; au-dessus de 0,225, le tétraèdre le garde au contact. Leçon « Dimensions des ions dans un cristal »." },
      cycle: { prompt: "Pour NaCl à 298 K : ΔfH° = \u2212411 kJ·mol⁻¹ ; sublimation de Na : 108 ; ½ dissociation de Cl₂ : 121 ; ionisation de Na : 496 ; attachement d'un électron à Cl : \u2212349. Que vaut l'enthalpie réticulaire ?",
        options: { a: "787 kJ·mol⁻¹ : 411 + 108 + 121 + 496 \u2212 349.", b: "\u2212787 kJ·mol⁻¹, l'énergie libérée par le cristal.", c: "147 kJ·mol⁻¹, le coût de la formation des ions.", d: "\u221235 kJ·mol⁻¹ : \u2212411 + 108 + 121 + 496 \u2212 349." },
        hint: "Le cycle part du cristal : la première étape est la décomposition de NaCl en corps simples.",
        why: "Loi de Hess, en partant du cristal : \u2212ΔfH° + ΔsubH(Na) + ½ D(Cl₂) + Ei \u2212 Ae = +787 kJ·mol⁻¹, positive par définition (énergie à fournir pour séparer les ions). Leçon « Énergie réticulaire »." },
      tendance: { prompt: "LiF : 1\u00a0048 kJ·mol⁻¹ ; NaCl : 787 ; CaF₂ : 2\u00a0641. Quelle grandeur ordonne surtout ces énergies réticulaires ?",
        options: { a: "La masse molaire du composé.", b: "ν|z⁺z⁻|/(r⁺ + r⁻) : le produit des charges, le nombre d'ions et l'inverse de la distance, comme une énergie de Coulomb.", c: "La température de fusion.", d: "Le nombre de voisins de chaque ion." },
        why: "209 pm, 283 pm et 243 pm ; ν|z⁺z⁻| = 2, 2 et 6. L'énergie suit le rapport à 2 à 12\u00a0% près sous la droite de l'attraction seule ; l'écart est la répulsion. Leçon « Énergie réticulaire »." },
      madelung: { prompt: "La constante de Madelung de NaCl vaut 1,748, celle de CsCl 1,763. Que mesure ce nombre ?",
        options: { a: "Le nombre moyen de voisins d'un ion.", b: "La part ionique de la liaison.", c: "La somme, sur tout le réseau, des interactions de Coulomb d'un ion, en unités de |z⁺z⁻| e²/(4π ε0 d) : un nombre fixé par la seule géométrie.", d: "L'exposant de la répulsion entre nuages." },
        why: "Une fois les distances en unités de d, la somme alternée ne dépend que de la structure. Six premiers voisins dans le sel, mais les couches suivantes alternent et réduisent 6 à 1,748. Leçon « Modèle électrostatique et constante de Madelung »." },
      bornlande: { prompt: "Modèle de Born–Landé pour NaCl : M = 1,748, d0 = 282 pm, n = 8. Le terme d'attraction vaut N_A M e²/(4π ε0 d0) = 861 kJ·mol⁻¹. Que prédit le modèle, et que vaut l'écart au cycle de Born–Haber (787 kJ·mol⁻¹) ?",
        options: { a: "861 kJ·mol⁻¹, 9\u00a0% au-dessus : la répulsion ne change rien à l'équilibre.", b: "430 kJ·mol⁻¹ : la répulsion retire la moitié de l'attraction.", c: "787 kJ·mol⁻¹ exactement, puisque n a été ajusté sur le cycle.", d: "753 kJ·mol⁻¹, 4\u00a0% en dessous : la répulsion retire 1/n de l'attraction, et l'attraction de van der Waals, négligée, manque." },
        why: "E = N_A M e²/(4π ε0 d0) (1 \u2212 1/n) = 861 × 7/8 = 753 kJ·mol⁻¹. n vient de la compressibilité (7,9), pas de l'énergie : l'accord à 4\u00a0% est une prédiction. Leçon « Modèle électrostatique et constante de Madelung »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

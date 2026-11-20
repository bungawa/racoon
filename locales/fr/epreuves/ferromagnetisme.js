/* Épreuve de l'étape « Comprendre le ferromagnétisme » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      echange: { prompt: "Le nickel reste ordonné jusque vers 627\u00a0K. Deux atomes voisins, à 0,25\u00a0nm l'un de l'autre, portent chacun 0,6 magnéton de Bohr. Que conclure en comparant kTc à leur énergie d'interaction magnétique ?",
        options: { a: "kTc vaut environ 0,05\u00a0eV et l'énergie dipolaire environ un micro-électronvolt : l'ordre ne peut pas venir de l'interaction magnétique, il vient de l'échange.", b: "Les deux valent environ 0,05\u00a0eV : l'interaction magnétique suffit.", c: "L'énergie dipolaire dépasse kTc : le nickel devrait rester ordonné bien au-delà de 627\u00a0K.", d: "La comparaison n'a pas de sens, car kTc n'est pas une énergie." },
        hint: "μ0μ²/(4πa³), avec μ\u00a0≈\u00a05,6\u00a0×\u00a010⁻²⁴\u00a0A·m² et a\u00a0=\u00a02,5\u00a0×\u00a010⁻¹⁰\u00a0m.",
        why: "10⁻⁷\u00a0×\u00a0(5,6\u00a0×\u00a010⁻²⁴)²/(1,6\u00a0×\u00a010⁻²⁹)\u00a0≈\u00a02\u00a0×\u00a010⁻²⁵\u00a0J, environ 1\u00a0µeV, contre kTc\u00a0≈\u00a08,7\u00a0×\u00a010⁻²¹\u00a0J. Le couplage est électrostatique : le principe d'exclusion rend la répulsion des électrons dépendante de leurs spins. Leçon « Comprendre le ferromagnétisme »." },
      entropie: { prompt: "Une mole d'atomes porte chacun un spin ½. En champ moyen, quelle entropie ces spins perdent-ils en tout quand on refroidit le corps de bien au-dessus de Tc jusqu'à 0\u00a0K ?",
        options: { a: "R/2\u00a0≈\u00a04,2\u00a0J·mol⁻¹·K⁻¹.", b: "R\u00a0ln\u00a02\u00a0≈\u00a05,8\u00a0J·mol⁻¹·K⁻¹ : deux états par spin au-dessus de Tc, un seul à 0\u00a0K.", c: "3R/2\u00a0≈\u00a012,5\u00a0J·mol⁻¹·K⁻¹, la hauteur du saut de chaleur massique.", d: "Rien : l'entropie ne dépend pas de l'ordre magnétique." },
        hint: "Au-dessus de Tc, chaque spin a deux états également probables.",
        why: "L'intégrale de C/T de 0 à Tc redonne exactement R\u00a0ln\u00a02. Le saut de 3R/2 est une chaleur massique, pas une entropie. Leçon « Propriétés thermodynamiques d'un ferromagnétique »." },
      diagonale: { prompt: "On aimante un monocristal de fer selon la diagonale du cube, [111]. Vers quelle fraction de la saturation la courbe d'aimantation marque-t-elle un coude, avant de monter lentement ?",
        options: { a: "1 : le fer sature également dans toutes les directions.", b: "1/√2\u00a0≈\u00a00,71.", c: "1/√3\u00a0≈\u00a00,58 : les domaines s'alignent sur les arêtes du cube, dont la projection sur la diagonale vaut 1/√3.", d: "0 : rien ne bouge avant un champ très fort." },
        why: "Le déplacement des parois amène l'aimantation sur les directions faciles [100] proches du champ, à 54,7° de la diagonale ; cos\u00a054,7°\u00a0≈\u00a00,58. Pour aller au-delà, il faut faire tourner l'aimantation contre l'anisotropie. Leçon « Cycle d'hystérésis »." },
      bandes: { prompt: "Dans le modèle des domaines en bandes, une plaque de fer de 1\u00a0mm d'épaisseur a des domaines d'environ 3\u00a0µm. Quelle largeur prévoit le modèle pour une plaque de 0,1\u00a0mm ?",
        options: { a: "Environ 0,3\u00a0µm : la largeur est proportionnelle à l'épaisseur.", b: "Environ 3\u00a0µm : la largeur ne dépend que du matériau.", c: "Environ 30\u00a0µm.", d: "Environ 0,9\u00a0µm : la largeur varie comme la racine carrée de l'épaisseur." },
        hint: "Le coût des parois croît comme L/D, celui du champ comme D.",
        why: "D*\u00a0∝\u00a0√L : diviser L par 10 divise D par √10\u00a0≈\u00a03,2, d'où 3/3,2\u00a0≈\u00a00,9\u00a0µm. Leçon « Cycle d'hystérésis »." },
      silence: { prompt: "Une bobine reliée à un amplificateur et à un haut-parleur entoure une tôle de fer au silicium. On approche un aimant : le crépitement est fort aux champs moyens et se tait près de la saturation. Pourquoi ?",
        options: { a: "Près de la saturation, les parois ont fini de balayer les grains : l'aimantation n'avance plus par sauts mais en tournant lentement vers le champ.", b: "Près de la saturation, la tôle dépasse son point de Curie.", c: "Le haut-parleur sature lui aussi.", d: "Les sauts continuent, mais ils deviennent trop rapides pour être entendus." },
        why: "Le crépitement vient des sauts de parois qui s'arrachent de leurs accroches ; la rotation de l'aimantation, qui achève la saturation, est continue et silencieuse. Leçon « Cycle d'hystérésis »." },
      noyau: { prompt: "Un fer au silicium (Hc\u00a0≈\u00a04\u00a0A·m⁻¹) et un alnico (Hc\u00a0≈\u00a044\u00a0kA·m⁻¹) sont parcourus cinquante fois par seconde jusqu'à environ 1,2\u00a0T. Quelle puissance l'hystérésis dissipe-t-elle à peu près par mètre cube d'alnico ?",
        options: { a: "Environ 1\u00a0kW·m⁻³, comme l'acier au silicium.", b: "Environ 10\u00a0MW·m⁻³, dix mille fois plus que l'acier au silicium : l'alnico n'a rien à faire dans un transformateur.", c: "Rien : l'alnico ne parcourt pas de cycle.", d: "Environ 10\u00a0W·m⁻³." },
        hint: "Par cycle, W\u00a0≈\u00a04\u00a0Hc\u00a0Bm.",
        why: "4\u00a0×\u00a044\u00a0000\u00a0×\u00a01,2\u00a0≈\u00a02,1\u00a0×\u00a010⁵\u00a0J·m⁻³ par cycle, soit environ 10⁷\u00a0W·m⁻³ à 50\u00a0Hz ; l'acier au silicium : 4\u00a0×\u00a04\u00a0×\u00a01,2\u00a0×\u00a050\u00a0≈\u00a01\u00a0kW·m⁻³. Un champ coercitif dix mille fois plus grand donne une perte dix mille fois plus grande. Leçon « Matériaux ferromagnétiques »." },
      aimant: { prompt: "Un aimant a une induction rémanente de 1,0\u00a0T et un champ coercitif de 800\u00a0kA·m⁻¹. Que peut-on dire de son (BH)max sans connaître la forme exacte de sa branche descendante, pourvu qu'elle reste au-dessus de la droite qui joint ses deux extrémités ?",
        options: { a: "Il vaut exactement 800\u00a0kJ·m⁻³.", b: "Il vaut au plus 200\u00a0kJ·m⁻³.", c: "Il est compris entre 200 et 800\u00a0kJ·m⁻³ : entre la droite (BrHc/4) et le rectangle (BrHc).", d: "Il ne dépend que de Br." },
        why: "Sur la droite, \u2212BH est maximal en son milieu : Br/2\u00a0×\u00a0Hc/2. Aucune branche ne sort du rectangle Br\u00a0×\u00a0Hc. Le point de fonctionnement réel dépend ensuite de l'entrefer, par (36.27b). Leçon « Matériaux ferromagnétiques »." },
      magnetite: { prompt: "Dans la magnétite Fe₃O₄, un Fe³⁺ (5\u00a0μB) occupe un type de site, un Fe³⁺ et un Fe²⁺ (4\u00a0μB) l'autre, les deux sous-réseaux étant opposés. Sa masse molaire vaut 0,232\u00a0kg·mol⁻¹. Quelle aimantation par unité de masse prévoit le décompte de Néel à 0\u00a0K ?",
        options: { a: "Zéro : c'est un antiferromagnétique.", b: "Environ 340\u00a0A·m²·kg⁻¹ : 14\u00a0μB par motif.", c: "Environ 120\u00a0A·m²·kg⁻¹ : 5\u00a0μB par motif.", d: "Environ 96\u00a0A·m²·kg⁻¹ : 4\u00a0μB par motif, proche des 90 à 92 mesurés à température ambiante." },
        hint: "σ\u00a0=\u00a0p\u00a0μB\u00a0N_A/M_mol, avec μB N_A\u00a0≈\u00a05,58\u00a0A·m²·mol⁻¹.",
        why: "Les deux Fe³⁺ se compensent ; il reste 4\u00a0μB, et 4\u00a0×\u00a05,58/0,232\u00a0≈\u00a096\u00a0A·m²·kg⁻¹. Les sous-réseaux ont des moments inégaux : c'est un ferrimagnétique, pas un antiferromagnétique. Leçon « Matériaux magnétiques extraordinaires »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

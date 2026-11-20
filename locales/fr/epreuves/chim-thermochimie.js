/* Épreuve de l'étape « Thermochimie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      standard: { prompt: "Une table donne Δf H°(NH₃, g) = \u221245,9\u00a0kJ·mol⁻¹ à 298,15\u00a0K. Que vaut Δr H° de N₂ + 3 H₂ → 2 NH₃ à cette température, et que suppose-t-on en l'utilisant pour un mélange réel sous 1\u00a0bar ?",
        options: { a: "\u221291,8\u00a0kJ·mol⁻¹, en traitant les gaz comme parfaits : leur enthalpie ne dépend ni de la pression ni de la composition.", b: "\u221245,9\u00a0kJ·mol⁻¹ : une enthalpie de formation est déjà une enthalpie de réaction.", c: "+91,8\u00a0kJ·mol⁻¹ : on soustrait les produits aux réactifs.", d: "\u221291,8\u00a0kJ·mol⁻¹, mais seulement sous 101\u202f325\u00a0Pa, la pression des tables." },
        hint: "Σ νᵢ Δf Hᵢ°, avec Δf H° = 0 pour N₂ et H₂.",
        why: "Δr H° = 2 × (\u221245,9) \u2212 0 \u2212 0 = \u221291,8\u00a0kJ·mol⁻¹. Pour le mélange réel, on suppose Δr H ≈ Δr H° : exact pour des gaz parfaits, à 0,2\u00a0% près pour l'ammoniac sous 1\u00a0bar. Les tables récentes sont à p° = 1\u00a0bar. Leçons « Grandeurs de réaction et état standard » et « Loi de Hess et enthalpies de formation »." },
      kirchhoff: { prompt: "Un réacteur de synthèse de l'ammoniac fonctionne à 700\u00a0K, où Δr H° = \u2212105,2\u00a0kJ·mol⁻¹. Si l'on garde la valeur des tables à 298\u00a0K, \u221291,8\u00a0kJ·mol⁻¹, on sous-estime la chaleur à évacuer de…",
        options: { a: "1\u00a0% environ : Δr H° ne dépend presque pas de T.", b: "13\u00a0% environ, parce que Δr Cp° est nettement négatif pour cette réaction.", c: "50\u00a0% environ, à cause de la pression.", d: "rien : l'état standard est à 298\u00a0K." },
        why: "(105,2 \u2212 91,8)/105,2 ≈ 13\u00a0%. dΔr H°/dT = Δr Cp° ≈ \u221244\u00a0J·mol⁻¹·K⁻¹ à 298\u00a0K : deux NH₃ ont moins de capacité thermique que N₂ + 3 H₂. Pour une combustion du méthane, l'écart serait de 0,3\u00a0%. Leçon « Grandeurs de réaction et état standard »." },
      bombe: { prompt: "À 298\u00a0K, une bombe calorimétrique mesure \u22121\u202f366,0\u00a0kJ·mol⁻¹ pour C₂H₅OH(l) + 3 O₂ → 2 CO₂ + 3 H₂O(l). Que vaut Δr H° ?",
        options: { a: "\u22121\u202f366,0\u00a0kJ·mol⁻¹ : bombe et brûleur mesurent la même chose.", b: "\u22121\u202f363,5\u00a0kJ·mol⁻¹.", c: "\u22121\u202f368,5\u00a0kJ·mol⁻¹ : Δr H° = Δr U° + Δrν(gaz) RT, avec Δrν(gaz) = \u22121.", d: "\u22121\u202f371,0\u00a0kJ·mol⁻¹ : Δrν(gaz) = \u22122." },
        hint: "Comptez seulement les gaz : 3 O₂ d'un côté, 2 CO₂ de l'autre.",
        why: "Δrν(gaz) = 2 \u2212 3 = \u22121 ; RT = 2,48\u00a0kJ·mol⁻¹. Δr H° = \u22121\u202f366,0 \u2212 2,48 ≈ \u22121\u202f368,5\u00a0kJ·mol⁻¹, ce que donne aussi la loi de Hess avec les tables. Leçons « Grandeurs de réaction et état standard » et « Loi de Hess et enthalpies de formation »." },
      hess: { prompt: "On mesure C(graphite) + O₂ → CO₂ : \u2212393,5\u00a0kJ·mol⁻¹, et CO + ½ O₂ → CO₂ : \u2212283,0\u00a0kJ·mol⁻¹. Que vaut Δf H°(CO, g) ?",
        options: { a: "\u2212676,5\u00a0kJ·mol⁻¹ : la somme des deux.", b: "+110,5\u00a0kJ·mol⁻¹.", c: "\u2212283,0\u00a0kJ·mol⁻¹ : c'est la combustion de CO.", d: "\u2212110,5\u00a0kJ·mol⁻¹ : la première équation moins la seconde donne C + ½ O₂ → CO." },
        why: "Loi de Hess : (1) \u2212 (2) = C(graphite) + ½ O₂ → CO, donc \u2212393,5 \u2212 (\u2212283,0) = \u2212110,5\u00a0kJ·mol⁻¹. On procède ainsi parce qu'on ne sait pas brûler le graphite en CO seul. Leçon « Loi de Hess et enthalpies de formation »." },
      pci: { prompt: "Un moteur à dihydrogène rejette son eau en vapeur. Sur quel pouvoir calorifique compter, et pourquoi l'écart PCS \u2212 PCI est-il plus grand que pour le méthane ?",
        options: { a: "Le PCI, 120\u00a0MJ·kg⁻¹ : tout le combustible devient de l'eau, et sa vaporisation retient 15\u00a0% du PCS, contre 10\u00a0% pour le méthane.", b: "Le PCS, 141,8\u00a0MJ·kg⁻¹ : la loi de Hess l'impose.", c: "Le PCI, mais l'écart est le même que pour le méthane.", d: "Ni l'un ni l'autre : un moteur n'est pas une chaudière." },
        why: "L'état final décrit l'eau vapeur : c'est le PCI. Le dihydrogène ne forme que de l'eau ; le méthane forme aussi du CO₂, qui ne se condense pas. Leçon « Loi de Hess et enthalpies de formation »." },
      dissociation: { prompt: "Sans dissociation, la flamme méthane-air calculée atteint 2\u202f327\u00a0K (2\u202f224\u00a0K à l'équilibre), la flamme méthane-dioxygène 5\u202f210\u00a0K (3\u202f050\u00a0K à l'équilibre). Que conclure ?",
        options: { a: "Les tables de capacités thermiques sont fausses à haute température.", b: "Le modèle de combustion complète reste utile dans l'air (5\u00a0% d'écart sur l'élévation), mais pas dans le dioxygène pur, où la dissociation endothermique de CO₂ et H₂O absorbe une grande part de l'énergie.", c: "L'air brûle mieux que le dioxygène.", d: "Les pertes par rayonnement expliquent les deux écarts." },
        why: "Les deux calculs sont adiabatiques et utilisent les mêmes capacités thermiques ; seule la composition finale change. L'écart relatif à l'élévation, 5\u00a0% dans l'air, dépasse 70\u00a0% dans le dioxygène pur. Leçon « Température de flamme et transferts thermiques en réacteur »." },
      volumes: { prompt: "Mélanger 50\u00a0mL d'acide chlorhydrique et 50\u00a0mL de soude à 1\u00a0mol·L⁻¹ échauffe la solution de 6,7\u00a0K. Avec 100\u00a0mL de chaque, aux mêmes concentrations ?",
        options: { a: "13,4\u00a0K : deux fois plus de réaction.", b: "3,4\u00a0K : deux fois plus d'eau à chauffer.", c: "6,7\u00a0K : l'avancement et la capacité thermique doublent ensemble.", d: "Aucune élévation : la réaction est la même." },
        why: "ΔT = \u2212ξΔr H°/Cp : ξ et Cp sont tous deux proportionnels au volume. Seule la concentration compte. Leçon « Température de flamme et transferts thermiques en réacteur »." },
      echelle: { prompt: "Un procédé exothermique, sûr dans un réacteur de 10\u00a0L, est transposé dans un réacteur géométriquement semblable de 10\u00a0m³, avec la même enveloppe de refroidissement par unité de surface. Que devient le nombre de Semenov ψ ?",
        options: { a: "Il ne change pas : la chimie est la même.", b: "Il est divisé par 10 : la surface d'échange est plus grande.", c: "Il est multiplié par 1\u202f000, comme le volume.", d: "Il est multiplié par 10 : la masse croît comme le cube de la taille, la surface comme son carré, et τ = mc/(hS) comme la taille." },
        hint: "Le volume est multiplié par 1\u202f000 : de combien la taille ?",
        why: "Taille × 10, masse × 1\u202f000, surface × 100 : τ × 10, donc ψ × 10. Un ψ de 0,1, sûr, devient 1, au-dessus du seuil 1/e. Leçon « Température de flamme et transferts thermiques en réacteur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

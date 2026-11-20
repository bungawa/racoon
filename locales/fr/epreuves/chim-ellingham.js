/* Épreuve de l'étape « Élaboration des métaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      magnesium: { prompt: "Pour 2 Mg + O₂ = 2 MgO, ΔᵣH° = \u22121\u202f202 kJ·mol⁻¹ et ΔᵣS° = \u2212217 J·K⁻¹·mol⁻¹ à 298 K. Que vaut ΔᵣG° à 800 K, magnésium encore solide, dans l'approximation d'Ellingham ?",
        options: { a: "Environ \u22121\u202f029 kJ·mol⁻¹.", b: "Environ \u22121\u202f376 kJ·mol⁻¹.", c: "\u22121\u202f202 kJ·mol⁻¹ : l'enthalpie libre ne dépend pas de T.", d: "Environ +172 kJ·mol⁻¹." },
        hint: "ΔᵣG° = ΔᵣH° \u2212 T ΔᵣS°, avec ΔᵣS° négatif.",
        why: "\u22121\u202f202 + 800 × 0,217 = \u22121\u202f029 kJ·mol⁻¹. La droite monte de 0,217 kJ·mol⁻¹ par kelvin, à peu près S°(O₂) : une mole de gaz disparaît. Les tables NIST-JANAF donnent \u22121\u202f030 kJ·mol⁻¹. Leçon « Approximation et diagrammes d'Ellingham »." },
      ebullition: { prompt: "La pente de la droite du magnésium passe de 0,24 à 0,42 kJ·K⁻¹·mol⁻¹ vers 1\u202f366 K. Pourquoi ?",
        options: { a: "Parce que MgO fond à cette température.", b: "Parce que le magnésium bout : la réaction consomme alors 2 Mg gazeux en plus de O₂, et son entropie de réaction devient beaucoup plus négative.", c: "Parce que l'approximation d'Ellingham cesse d'être valable au-delà de 1\u202f000 K.", d: "Parce que le magnésium fond." },
        why: "À l'ébullition, chaque mole de métal gagne ΔvapH/Teb d'entropie : 2 × 128 kJ·mol⁻¹/1\u202f366 K ≈ 187 J·K⁻¹·mol⁻¹ de plus à retrancher. La fusion, à 923 K, ne change la pente que de 18 J·K⁻¹·mol⁻¹. Une fusion de l'oxyde ferait l'inverse." },
      aluminium: { prompt: "À 1\u202f500 K, ΔᵣG° vaut \u2212795 kJ·mol⁻¹ pour 4/3 Al + O₂ = 2/3 Al₂O₃ et \u2212638 kJ·mol⁻¹ pour Si + O₂ = SiO₂. Que peut-on dire de 4/3 Al + SiO₂ = 2/3 Al₂O₃ + Si ?",
        options: { a: "ΔᵣG° = +157 kJ·mol⁻¹ : la silice oxyde l'aluminium en sens inverse.", b: "ΔᵣG° = \u22121\u202f433 kJ·mol⁻¹ : la réaction est explosive.", c: "ΔᵣG° = \u2212157 kJ·mol⁻¹ : l'aluminium, dont la droite est au-dessous, réduit la silice, corps purs.", d: "On ne peut rien dire sans connaître la vitesse." },
        why: "On retranche la seconde équation de la première, O₂ s'élimine : \u2212795 \u2212 (\u2212638) = \u2212157 kJ·mol⁻¹. Le signe dit que la réduction est possible avec des corps purs ; sa vitesse est une autre question." },
      boudouard: { prompt: "Un gaz CO \u2212 CO₂ est en équilibre avec du graphite sous 1 bar à 1\u202f000 K. Quelle est sa composition, d'après les tables ?",
        options: { a: "Presque uniquement du CO₂ : CO n'est stable qu'au-dessus de 1\u202f500 K.", b: "50 % de CO : K° = 1 à toute température.", c: "Presque uniquement du CO, comme devant les tuyères.", d: "Environ 71 % de CO." },
        hint: "Le croisement des droites C/CO et C/CO₂ est vers 975 K : à 1\u202f000 K, on est juste au-dessus.",
        why: "Juste au-dessus du croisement, K° = p(CO)²/(p(CO₂) p°) est un peu supérieur à 1 : x²/(1 \u2212 x) ≈ 1,8 donne x ≈ 0,71. CO ne domine nettement qu'au-dessus de 1\u202f100 K (98 % à 1\u202f200 K). Leçon « Pyrométallurgie et haut-fourneau »." },
      chaudron: { prompt: "Au-dessus du point triple, l'équilibre FeO/Fe exige 69 % de CO dans un gaz CO \u2212 CO₂ à 1\u202f200 K, et l'équilibre Fe₃O₄/FeO 31 %. Sous un gaz à 50 % de CO à 1\u202f200 K, quelle est la phase stable du fer ?",
        options: { a: "FeO : le gaz réduit Fe₃O₄, pas FeO.", b: "Fe : 50 % de CO réduit tous les oxydes.", c: "Fe₃O₄ : le gaz n'est pas assez réducteur.", d: "Fe₂O₃ : le gaz oxyde le fer." },
        why: "Le gaz est plus réducteur que l'équilibre Fe₃O₄/FeO (31 %), moins que l'équilibre FeO/Fe (69 %) : la wüstite est stable. C'est pourquoi le gaz doit s'enrichir en CO vers le bas du haut-fourneau, où FeO se réduit." },
      zinc: { prompt: "Pourquoi le zinc n'est-il pas élaboré comme le fer, par réduction de son oxyde au carbone dans un four ordinaire ?",
        options: { a: "Parce que le carbone ne réduit jamais ZnO.", b: "Parce que la réduction n'est favorable qu'au-dessus de 1\u202f220 K environ, où le zinc est gazeux : en refroidissant au contact de CO₂, la vapeur se réoxyde.", c: "Parce que ZnO est soluble dans le carbone.", d: "Parce que le zinc fond à 693 K et coule hors du four." },
        why: "Le croisement des droites de ZnO et de CO est au-dessus de l'ébullition du zinc (1\u202f180 K). Il faut condenser la vapeur très vite, ou passer par la voie humide : dissolution, purification, électrolyse. Leçon « Hydrométallurgie du zinc »." },
      electrolyse: { prompt: "Une cuve d'électrolyse du zinc fonctionne sous 3,3 V avec un rendement faradique de 92 %. Quelle énergie électrique consomme-t-elle par kilogramme de zinc (M = 65,38 g·mol⁻¹, F = 96\u202f485 C·mol⁻¹) ?",
        options: { a: "Environ 5,9 × 10⁶ J·kg⁻¹.", b: "Environ 4,9 × 10⁶ J·kg⁻¹.", c: "Environ 10,6 × 10⁶ J·kg⁻¹.", d: "Environ 3,1 × 10³ J·kg⁻¹." },
        hint: "Il faut 2F coulombs par mole de zinc, divisés par le rendement.",
        why: "3,3 × 2 × 96\u202f485/(0,065\u202f38 × 0,92) ≈ 10,6 × 10⁶ J·kg⁻¹, soit 2,9 kW·h par kilogramme. 5,9 × 10⁶ J·kg⁻¹ est le minimum, à 1,99 V et sans perte : près de la moitié de l'énergie part en surtensions, en chute ohmique et en dihydrogène." },
      titane: { prompt: "La droite de 2 C + O₂ = 2 CO passe sous celle de TiO₂ vers 2\u202f000 K. Pourquoi n'élabore-t-on pas le titane par le carbone ?",
        options: { a: "Parce que le titane est gazeux à 2\u202f000 K.", b: "Parce que CO réoxyde le titane en refroidissant, comme le zinc.", c: "Parce que l'oxyde TiO₂ fond avant d'être réduit.", d: "Parce que TiO₂ + 3 C = TiC + 2 CO devient favorable dès 1\u202f560 K environ : on obtient du carbure, et le titane chargé de carbone est cassant." },
        why: "Le carbure se forme bien avant le métal. On passe donc par le chlore : TiO₂ + 2 Cl₂ + 2 C = TiCl₄ + 2 CO, puis TiCl₄ + 2 Mg = Ti + 2 MgCl₂, le procédé de Kroll. Leçon « Élaboration du silicium et du titane »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

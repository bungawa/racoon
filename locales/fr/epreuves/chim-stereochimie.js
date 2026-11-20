/* Épreuve de l'étape « Représentation et stéréochimie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      formule: { prompt: "Une espèce a pour formule brute C₅H₁₂O. Que dit le nombre d'insaturations ?",
        options: { a: "0 : ni liaison multiple ni cycle ; ce sont des alcools ou des éthers saturés.", b: "1 : une liaison C=O, donc un aldéhyde ou une cétone.", c: "2 : une triple liaison ou deux doubles.", d: "On ne peut rien dire sans la formule développée." },
        hint: "(2 × nombre de C + 2 \u2212 nombre de H)/2 ; l'oxygène ne compte pas.",
        why: "(2 × 5 + 2 \u2212 12)/2 = 0. Chaîne saturée et ouverte : alcools et éthers, avec plusieurs isomères de chaîne, de position et de fonction. Leçon « Isomérie de constitution et formule topologique »." },
      position: { prompt: "Lequel de ces couples est formé d'isomères de position ?",
        options: { a: "Butan-1-ol et 2-méthylpropan-1-ol.", b: "Butan-1-ol et butan-2-ol.", c: "Butan-2-ol et éthoxyéthane.", d: "Butanal et butanone." },
        why: "Même chaîne linéaire de quatre carbones, même groupe O–H, porté par le carbone 1 ou 2. Le premier couple diffère par la chaîne, les deux derniers par le groupe caractéristique." },
      populations: { prompt: "Butane à 298 K : la conformation gauche est 3,8 kJ·mol⁻¹ au-dessus de l'anti, et il y a deux gauches. RT ≈ 2,5 kJ·mol⁻¹. Quelle part de molécules en conformation anti ?",
        options: { a: "Toutes : l'anti est le minimum d'énergie.", b: "Un tiers : trois conformations décalées.", c: "Environ 70 %.", d: "La moitié." },
        hint: "Comparez exp(\u2212ΔE/RT) au nombre de puits.",
        why: "2 exp(\u22123,8/2,5) ≈ 0,44 gauche pour 1 anti : 1/1,44 ≈ 70 % d'anti. L'énergie favorise l'anti, mais RT n'est pas négligeable devant ΔE. Leçon « Conformations et projection de Newman »." },
      barriere: { prompt: "Pourquoi isole-t-on les deux énantiomères du butan-2-ol, mais jamais le conformère gauche du butane ?",
        options: { a: "Le butane est un gaz.", b: "Les conformères ont la même énergie.", c: "Les énantiomères ont des propriétés physiques différentes.", d: "Passer de gauche à anti franchit une barrière d'environ 16 kJ·mol⁻¹, des milliards de fois par seconde ; passer d'un énantiomère à l'autre demande de rompre une liaison." },
        why: "La formule d'Eyring donne ~10¹⁰ s⁻¹ pour 16 kJ·mol⁻¹ à 298 K. Une forme ne s'isole que si la barrière dépasse environ 93 kJ·mol⁻¹ (demi-vie de 1 000 s) ; rompre une liaison coûte bien davantage." },
      priorites: { prompt: "Centre stéréogène du but-3-én-2-ol, CH₃–CH(OH)–CH=CH₂. Ordre de priorité CIP ?",
        options: { a: "OH > CH=CH₂ > CH₃ > H", b: "CH=CH₂ > OH > CH₃ > H", c: "OH > CH₃ > CH=CH₂ > H", d: "OH > CH=CH₂ = CH₃ > H" },
        hint: "La double liaison compte deux fois.",
        why: "O (Z = 8) d'abord. Puis deux carbones : le vinyle porte (C, C, H) avec l'atome dupliqué, le méthyle (H, H, H). Le vinyle l'emporte. Leçon « Chiralité et descripteurs stéréochimiques »." },
      relation: { prompt: "(2R,3R)-3-chlorobutan-2-ol et (2R,3S)-3-chlorobutan-2-ol sont…",
        options: { a: "énantiomères.", b: "diastéréoisomères.", c: "identiques.", d: "isomères de constitution." },
        why: "Un seul centre diffère : ni images dans un miroir, ni superposables. Leurs propriétés physiques diffèrent. L'énantiomère du (2R,3R) est le (2S,3S)." },
      biot: { prompt: "La (S)-carvone pure, à 50 kg·m⁻³ dans une cuve de 1 dm, tourne la lumière de +3,05°. Un échantillon de carvone, mêmes ℓ et c, donne +1,22°. Sa composition ?",
        options: { a: "40 % de (S), 60 % de (R).", b: "100 % de (S), moins concentré.", c: "70 % de (S), 30 % de (R).", d: "Racémique." },
        why: "1,22/3,05 = 0,40 = fraction de (S) moins fraction de (R) ; leur somme vaut 1 : 0,70 de (S). Excès énantiomérique de 40 %. Leçon « Activité optique et séparation des stéréoisomères »." },
      dedoubler: { prompt: "Pour dédoubler un acide racémique, on le fait réagir avec une base chirale énantiopure. Pourquoi ?",
        options: { a: "La base détruit l'un des énantiomères.", b: "Les sels formés tournent la lumière plus fort, ce qui facilite le dosage.", c: "La base rend le mélange achiral.", d: "Les deux sels formés sont diastéréoisomères : leurs solubilités diffèrent, une cristallisation les sépare." },
        why: "(R)-acide·(R′)-base et (S)-acide·(R′)-base ne sont pas images l'un de l'autre. Leurs propriétés physiques diffèrent ; on cristallise l'un, puis on libère l'acide." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

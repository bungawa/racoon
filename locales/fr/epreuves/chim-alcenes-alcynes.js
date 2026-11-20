/* Épreuve de l'étape « Alcènes et alcynes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lindlar: { prompt: "Hex-3-yne, dihydrogène, catalyseur de Lindlar, arrêt après un équivalent de H₂. Produit principal ?",
        options: { a: "Le (Z)-hex-3-ène : addition syn des deux H sur la triple liaison.", b: "Le (E)-hex-3-ène, plus stable.", c: "L'hexane : le palladium hydrogène jusqu'au bout.", d: "Un mélange équimolaire de Z et de E." },
        why: "Les deux H viennent de la surface, du même côté. Le poison au plomb empêche presque l'alcène d'être hydrogéné. Leçon « Hydrogénation des alcènes et des alcynes »." },
      stabilite: { prompt: "Enthalpies d'hydrogénation jusqu'au butane : (Z)-but-2-ène \u2212118,5, (E)-but-2-ène \u2212114,6\u00a0kJ·mol⁻¹. Que vaut l'enthalpie de réaction de l'isomérisation Z → E ?",
        options: { a: "+3,9\u00a0kJ·mol⁻¹ : le Z est plus stable.", b: "\u22123,9\u00a0kJ·mol⁻¹ : le E est plus bas.", c: "\u2212233,1\u00a0kJ·mol⁻¹.", d: "On ne peut pas le savoir sans mesurer l'isomérisation." },
        hint: "Les deux mènent au même butane.",
        why: "Loi de Hess : \u2212118,5 \u2212 (\u2212114,6) = \u22123,9\u00a0kJ·mol⁻¹. Les deux méthyles du Z se gênent." },
      arret: { prompt: "Hydrogénation sélective d'un alcyne, sélectivité S = 100. On arrête après exactement un équivalent de H₂. Que contient le mélange ?",
        options: { a: "100\u00a0% d'alcène.", b: "50\u00a0% d'alcène, 50\u00a0% d'alcane.", c: "Environ 95\u00a0% d'alcène, et autant d'alcyne restant que d'alcane formé, environ 2,6\u00a0% chacun.", d: "Seulement de l'alcyne : S = 100 bloque la réaction." },
        why: "H₂ consommé = (1 \u2212 x) + z = 1 impose z = x. Le modèle donne x = z ≈ 0,026 et 0,947 d'alcène." },
      stereo: { prompt: "(E)-but-2-ène et OsO₄ catalytique, puis hydrolyse. Produit ?",
        options: { a: "Le butane-2,3-diol méso, seul.", b: "La butanone.", c: "Deux molécules d'éthanal.", d: "Un racémique de (2R,3R)- et (2S,3S)-butane-2,3-diol." },
        why: "E + syn sur un alcène symétrique : les deux faces donnent deux énantiomères. Le Z aurait donné le méso. Leçon « Syn-dihydroxylation et coupure des diols »." },
      coupure: { prompt: "On coupe le cis-cyclohexane-1,2-diol par l'ion periodate. Produit ?",
        options: { a: "Une seule molécule, l'hexanedial OHC–(CH₂)₄–CHO.", b: "Deux molécules de propanal.", c: "La cyclohexanone.", d: "L'acide hexanedioïque." },
        why: "La liaison coupée est dans le cycle : il s'ouvre sans se séparer, chaque CH(OH) devient CHO. Le periodate ne va pas jusqu'à l'acide." },
      ozonolyse: { prompt: "Un alcène C₆H₁₂ donne, par ozonolyse et sulfure de diméthyle, de la propanone et du propanal. Lequel ?",
        options: { a: "L'hex-3-ène.", b: "Le 2-méthylpent-2-ène.", c: "Le 2-méthylpent-1-ène.", d: "Le 3-méthylpent-2-ène." },
        hint: "Recollez les deux carbones des C=O.",
        why: "(CH₃)₂C=O et O=CH–CH₂CH₃ recollés : (CH₃)₂C=CH–CH₂CH₃. Leçon « Ozonolyse et coupures oxydantes »." },
      kharasch: { prompt: "2-méthylpropène + HBr, en présence d'un peroxyde. Produit principal, et pourquoi ?",
        options: { a: "2-bromo-2-méthylpropane : le carbocation tertiaire est le plus stable.", b: "1-bromo-2-méthylpropane, car HBr s'additionne toujours anti-Markovnikov.", c: "1-bromo-2-méthylpropane : Br• se fixe sur le CH₂ pour laisser le radical tertiaire, le plus stable.", d: "Aucun : un peroxyde détruit HBr." },
        why: "Chaîne radicalaire : la régiosélectivité vient de l'étape Br• + C=C. Sans peroxyde, la voie ionique donnerait le produit tertiaire. Leçon « Additions radicalaires et ions acétylure »." },
      synthese: { prompt: "Comment obtenir le (Z)-hex-3-ène à partir de l'éthyne ?",
        options: { a: "Ozonolyse de l'éthyne, puis réaction avec du bromoéthane.", b: "Hydroxyde de sodium, puis deux équivalents de bromoéthane.", c: "Deux équivalents de bromoéthane sans base, puis Lindlar.", d: "Amidure de sodium et bromoéthane, deux fois, pour obtenir l'hex-3-yne ; puis H₂ sur catalyseur de Lindlar." },
        why: "HO⁻ est trop faible (K = 10⁻¹¹) ; NH₂⁻ déprotone. Chaque acétylure fait une SN2 sur le bromoéthane primaire. L'hydrogénation syn donne le Z." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

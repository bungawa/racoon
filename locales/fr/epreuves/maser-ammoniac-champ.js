/* Épreuve de l'étape « L'ammoniac dans un champ électrique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      base: { prompt: "Une molécule a C₁ = 0,6 et C₂ = 0,8 (réels). Quelle est la probabilité de la trouver dans l'état I ?",
        options: { a: "0,36.", b: "0,02 : C_I = (C₁ \u2212 C₂)/√2 = \u22120,14.", c: "0,98.", d: "0,5." },
        hint: "(9.13).",
        why: "C_I = (0,6 \u2212 0,8)/√2 ≈ \u22120,141, |C_I|² = 0,02 ; C_II = 1,4/√2, |C_II|² = 0,98. Leçon « Les états de la molécule d'ammoniac »." },
      mesure: { prompt: "On mesure l'énergie de cette même molécule. Que peut-on trouver ?",
        options: { a: "E₀ + 0,96 A, exactement.", b: "N'importe quelle valeur entre E₀ \u2212 A et E₀ + A.", c: "E₀ + A avec la probabilité 0,02, E₀ \u2212 A avec la probabilité 0,98.", d: "E₀ seulement." },
        why: "Une mesure d'énergie donne une valeur propre ; la moyenne, E₀ \u2212 0,96 A, n'est jamais un résultat. Leçon « Les états de la molécule d'ammoniac »." },
      oscille: { prompt: "Sans champ, lequel de ces états a un azote qui oscille d'un côté à l'autre ?",
        options: { a: "Un mélange de I et de II, comme l'azote en haut.", b: "L'état I.", c: "L'état II.", d: "Aucun : l'azote ne bouge jamais sans champ." },
        why: "L'oscillation est le battement des phases de I et de II ; un état qui n'a qu'une composante est stationnaire. Leçon « Les états de la molécule d'ammoniac »." },
      fort: { prompt: "Dans un champ tel que μℰ = 10A, quel est l'écart entre les deux niveaux ?",
        options: { a: "2A.", b: "200A, d'après l'approximation quadratique.", c: "20A exactement.", d: "Environ 20,1A : 2√(A² + μ²ℰ²)." },
        why: "(9.30) donne 2A√101 ≈ 20,1A ; le régime est presque linéaire, 2μℰ. L'approximation quadratique, faite pour μℰ ≪ A, donnerait 2A + 100A. Leçon « La molécule d'ammoniac dans un champ électrique statique »." },
      polar: { prompt: "On double le champ, en restant dans le régime μℰ ≪ A. Que devient le décalage de chaque niveau ?",
        options: { a: "Il double.", b: "Il ne change pas.", c: "Il est multiplié par 4.", d: "Il est multiplié par √2." },
        why: "Le décalage vaut μ²ℰ²/(2A), (9.33) : il est quadratique. Leçon « La molécule d'ammoniac dans un champ électrique statique »." },
      tri: { prompt: "Un faisceau d'ammoniac traverse un champ très non uniforme. Que se passe-t-il ?",
        options: { a: "Toutes les molécules sont déviées du même côté.", b: "Les molécules de l'état I vont vers les champs faibles, celles de l'état II vers les champs forts : le faisceau se sépare.", c: "Les molécules passent toutes dans l'état II.", d: "Rien : un champ ne dévie pas une molécule neutre." },
        why: "La force (9.35) est opposée pour les deux états, dont les énergies varient en sens contraires. Leçon « La molécule d'ammoniac dans un champ électrique statique »." },
      lent: { prompt: "Pourquoi peut-on remplacer (9.43) par (9.45) dans un maser à ammoniac ?",
        options: { a: "Parce que le champ est statique.", b: "Parce que ω est très différent de ω₀.", c: "Parce que A est petit.", d: "Parce que μℰ₀/ħ est très petit devant ω₀ et ω proche de ω₀ : les termes en ω + ω₀ se moyennent à presque rien." },
        why: "Le terme négligé n'a d'effet que de l'ordre de (μℰ₀/ħ)/ω₀, environ 3 × 10⁻⁵ pour un champ de 100\u00a0V·m⁻¹. Leçon « Les transitions dans un champ variable »." },
      desaccord: { prompt: "Le champ oscille à ω = ω₀ + 2μℰ₀/ħ. D'après (9.45), quelle part des molécules passe au plus de I à II ?",
        options: { a: "50\u00a0%.", b: "100\u00a0%.", c: "20\u00a0%.", d: "0\u00a0%." },
        hint: "P_max = 1/(1 + ((ω \u2212 ω₀)ħ/(2μℰ₀))²).",
        why: "(ω \u2212 ω₀)ħ/(2μℰ₀) = 1, d'où 1/2. Un désaccord égal au double du couplage divise le passage par deux. Leçon « Les transitions dans un champ variable »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

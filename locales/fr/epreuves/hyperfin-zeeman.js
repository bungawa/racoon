/* Épreuve de l'étape « L'hydrogène dans un champ magnétique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      simples: { prompt: "Dans un champ B selon z, pourquoi |++⟩ et |\u2212\u2212⟩ restent-ils des états propres de l'hydrogène fondamental, à tout champ ?",
        options: { a: "Parce que ce sont les seuls états de m = +1 et m = \u22121 : le champ selon z conserve m et ne peut les mélanger à rien.", b: "Parce que le champ est faible.", c: "Parce qu'ils sont intriqués.", d: "Ils ne le restent pas." },
        why: "Le hamiltonien (12.27) avec B selon z ne change pas Jz. Chaque valeur de m forme un bloc ; ceux de m = ±1 n'ont qu'un état. Leçons « L'effet Zeeman hyperfin » et « Les états dans un champ magnétique hyperfin »." },
      b0: { prompt: "Avec 2A ≈ 4,7 × 10⁻²⁵ J et μ′ ≈ 9,3 × 10⁻²⁴ J·T⁻¹, au-delà de quel champ le couplage hyperfin cède-t-il devant le champ ?",
        options: { a: "Vers 10⁻⁵ T, le champ terrestre.", b: "Vers 0,05 T : B₀ = 2A/μ′.", c: "Vers 5 T.", d: "Jamais : le couplage l'emporte toujours." },
        why: "2A/μ′ ≈ 0,051 T. En dessous, les états restent proches du triplet et du singulet ; au-dessus, de |+\u2212⟩ et |\u2212+⟩. Leçon « L'effet Zeeman hyperfin »." },
      quadra: { prompt: "En champ faible, la fréquence de la transition III ↔ IV varie comme :",
        options: { a: "B : elle mesure le champ au premier ordre.", b: "Elle ne varie pas du tout.", c: "B² : les deux états m = 0 ne sont déplacés qu'au second ordre, en se repoussant.", d: "1/B." },
        hint: "Développez la racine de (12.35).",
        why: "E_III \u2212 E_IV = 4A√(1 + μ′²B²/4A²) ≈ 4A + μ′²B²/2A. D'où l'usage de cette transition pour les horloges. Leçon « L'effet Zeeman hyperfin »." },
      fort: { prompt: "Dans un champ de 1 T, comment se rangent les quatre niveaux ?",
        options: { a: "En quatre niveaux également espacés de A.", b: "En un triplet et un singulet séparés de 4A.", c: "En trois niveaux, comme un spin 1.", d: "En deux paires écartées de ±μ′B environ, selon le spin de l'électron ; dans chaque paire, les niveaux diffèrent de l'ordre de 2A." },
        why: "À 1 T, μ′B ≈ 9,3 × 10⁻²⁴ J ≈ 40 A : le champ domine. Les niveaux tendent vers A ± μB et \u2212A ± μ′B, (12.38). Leçon « L'effet Zeeman hyperfin »." },
      melange: { prompt: "À B = 0, (12.39) donne C₂/C₃ = 1 pour l'état III. Que devient ce rapport en champ fort, et que dit-il de l'état ?",
        options: { a: "Il devient grand, environ μ′B/A : l'état III tend vers |+\u2212⟩, l'électron s'oriente.", b: "Il reste 1.", c: "Il devient \u22121.", d: "Il tend vers 0 : l'état devient |\u2212+⟩." },
        why: "(12.40) : C₂/C₃ ≈ μ′B/A. Le spin de l'électron, bien plus magnétique, s'aligne sur le champ et entraîne la composition de l'état. Leçon « Les états dans un champ magnétique hyperfin »." },
      faisceaux: { prompt: "Un jet d'hydrogène fondamental traverse un aimant de Stern et Gerlach à champ faible, B ≪ 0,05 T. En combien de faisceaux se sépare-t-il ?",
        options: { a: "Deux, comme en champ fort.", b: "Trois : I et II, de moments effectifs ±μ, sont déviés de part et d'autre ; III et IV, de pente presque nulle, restent au centre.", c: "Quatre, également espacés.", d: "Aucun : l'atome n'a pas de moment en champ faible." },
        hint: "Regardez les pentes dE/dB en champ faible.",
        why: "En champ faible, dE/dB vaut ±μ pour I et II, presque 0 pour III et IV (variation en B²). On voit trois taches, celle du milieu deux fois plus peuplée. Leçons « L'effet Zeeman hyperfin » et « Les états dans un champ magnétique hyperfin »." },
      proba: { prompt: "Un spin 1 dans |+S⟩ est mesuré dans un appareil tourné de 60° autour de y. Quelle est la probabilité de le trouver dans |0T⟩ ?",
        options: { a: "1/4.", b: "1/2.", c: "3/8 : 2a²b² avec a² = cos²30° = 3/4, b² = 1/4.", d: "9/16." },
        why: "|⟨0T|+S⟩|² = 2a²b² = 2 × 3/4 × 1/4 = 3/8. Les autres : a⁴ = 9/16, b⁴ = 1/16 ; la somme vaut 1. Leçon « La matrice de projection du spin 1 »." },
      tour: { prompt: "Les éléments de la matrice (12.53) sont des produits de deux amplitudes de spin 1/2. Qu'en résulte-t-il pour une rotation de 360° ?",
        options: { a: "La matrice change de signe, comme pour un spin 1/2.", b: "La matrice devient nulle.", c: "La matrice échange + et \u2212.", d: "La matrice redevient la matrice unité : les deux signes \u2212 du spin 1/2 se compensent." },
        why: "À α = 2π, a = d = \u22121 et b = c = 0 : a² = d² = ad + bc = 1. Un spin entier retrouve son état après un tour, un spin demi-entier change de signe. Leçon « La matrice de projection du spin 1 »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Activité optique et réflexion » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      sucre: { prompt: "Un tube de 2 dm contient une solution de saccharose à 150 kg·m⁻³. Le pouvoir rotatoire spécifique du saccharose vaut 0,665 °·m²·kg⁻¹ à 589 nm. De combien la polarisation tourne-t-elle ?",
        options: { a: "20,0°, dans le sens horaire pour qui reçoit la lumière.", b: "2,0°, dans le sens horaire.", c: "199,5°, dans le sens horaire.", d: "20,0°, dans un sens qui dépend de l'orientation des molécules." },
        hint: "α = [α] ℓ c, avec ℓ en mètres et c en kg·m⁻³.",
        why: "α = 0,665 × 0,2 × 150 ≈ 20,0°. Le saccharose est dextrogyre, et le sens ne dépend pas de l'orientation des molécules, puisqu'une hélice garde sa main quand on la tourne. Leçon « L’activité optique »." },
      bleu: { prompt: "Dans l'image de l'hélice, une molécule de 2 nm laisse un champ résiduel selon x d'environ 2πA/λ. Que vaut-il à 400 nm, puis à 600 nm ?",
        options: { a: "3,1 % aux deux longueurs d'onde : il ne dépend que de A.", b: "3,1 % à 400 nm, 2,1 % à 600 nm : 1,5 fois plus dans le bleu.", c: "0,5 % à 400 nm, 0,3 % à 600 nm.", d: "2,1 % à 400 nm, 3,1 % à 600 nm : plus dans le rouge." },
        why: "2π × 2/400 ≈ 3,1 × 10⁻², 2π × 2/600 ≈ 2,1 × 10⁻². Le reste croît comme 1/λ ; avec le champ rayonné par une couche, qui croît aussi comme ω, la rotation croît à peu près comme 1/λ² loin des bandes d'absorption. Leçon « L’activité optique »." },
      lac: { prompt: "Sous quel angle d'incidence la lumière réfléchie par un lac (n = 1,333) est-elle entièrement polarisée, et dans quelle direction est alors son champ électrique ?",
        options: { a: "41,8°, champ vertical.", b: "36,9°, champ horizontal.", c: "53,1°, champ horizontal, perpendiculaire au plan d'incidence.", d: "53,1°, champ dans le plan d'incidence." },
        hint: "tan i_B = n ; à cet angle, seule la composante s est réfléchie.",
        why: "arctan 1,333 = 53,1°. La composante p, dans le plan d'incidence, n'est pas réfléchie : il ne reste que la composante s, perpendiculaire au plan d'incidence, donc horizontale pour une surface d'eau. Un filtre polarisant d'axe vertical l'arrête. Leçon « L’intensité de la lumière réfléchie »." },
      diamant: { prompt: "Quelle part de la lumière une face de diamant (n = 2,42) réfléchit-elle sous l'incidence normale ?",
        options: { a: "4 %, comme le verre.", b: "42 %.", c: "8 %.", d: "17 %." },
        why: "((n \u2212 1)/(n + 1))² = (1,42/3,42)² ≈ 0,172. Quatre fois plus que le verre, qui réfléchit (0,5/2,5)² = 4 % : c'est une part de l'éclat du diamant. Leçon « L’intensité de la lumière réfléchie »." },
      sortie: { prompt: "La lumière polarisée p sort d'un verre (n = 1,5) vers l'air. Sous quel angle d'incidence n'est-elle pas réfléchie, et au-delà de quel angle est-elle entièrement réfléchie ?",
        options: { a: "33,7° ; 41,8°.", b: "56,3° ; 41,8°.", c: "33,7° ; 56,3°.", d: "41,8° ; 90°." },
        hint: "Du verre vers l'air, tan i_B = 1/1,5 ; l'angle critique vérifie sin i_c = 1/1,5.",
        why: "arctan(1/1,5) = 33,7°, arcsin(1/1,5) = 41,8°. L'angle de Brewster est toujours plus petit que l'angle critique, et (33.7) vaut entre les deux. Leçon « L’intensité de la lumière réfléchie »." },
      couple: { prompt: "Un faisceau de 2 mW polarisé circulairement, à 633 nm, traverse une lame demi-onde qui le change en circulaire de sens contraire. Quel couple la lame subit-elle ?",
        options: { a: "Aucun : la lame n'absorbe rien.", b: "Environ 1,3 × 10⁻¹⁸ N·m, deux fois P/ω.", c: "Environ 6,7 × 10⁻¹⁹ N·m, P/ω.", d: "Environ 2 × 10⁻³ N·m." },
        hint: "Chaque seconde, la lumière apporte le moment cinétique P/ω et repart avec \u2212P/ω.",
        why: "ω = 2πc/λ ≈ 2,98 × 10¹⁵ rad·s⁻¹ ; P/ω ≈ 6,7 × 10⁻¹⁹ N·m. Le moment cinétique de la lumière change de 2P/ω par seconde : la lame subit 1,3 × 10⁻¹⁸ N·m sans rien absorber. C'est la mesure de Beth. Leçon « La réfraction anormale »." },
      calcite: { prompt: "Une lame de calcite de 2 cm, dont l'axe optique fait 45° avec la normale aux faces, est éclairée sous l'incidence normale. L'angle de séparation vaut 6,2°. De combien les deux rayons émergents sont-ils écartés ?",
        options: { a: "De rien : sous l'incidence normale, les deux rayons traversent tout droit.", b: "De 1,1 mm, comme pour toute épaisseur.", c: "D'environ 2,2 mm, parallèles entre eux.", d: "D'un angle de 12,4°." },
        why: "e tan ρ = 20 × tan 6,2° ≈ 2,2 mm. Les rayons ressortent parallèles au rayon incident ; l'écart croît comme l'épaisseur. Leçon « La réfraction anormale »." },
      circulaires: { prompt: "Quel écart d'indice entre les deux ondes circulaires faut-il pour qu'une lame de 1 cm tourne de 90° une lumière de 589 nm ?",
        options: { a: "0,5.", b: "5,9 × 10⁻⁵.", c: "1,5 × 10⁻⁵.", d: "2,9 × 10⁻⁵." },
        hint: "α = π Δn ℓ/λ.",
        why: "Δn = αλ/(πℓ) = (π/2) × 589 × 10⁻⁹/(π × 0,01) ≈ 2,9 × 10⁻⁵. Pour le tube de sucre de « L’activité optique », 6,65° sur 1 dm, l'écart n'est que de 2,2 × 10⁻⁷. Leçon « La réfraction anormale »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Enthalpie libre et potentiel chimique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      signe: { prompt: "Une réaction a ΔrH° = \u221220\u00a0kJ·mol⁻¹ et ΔrS° = \u221280\u00a0J·K⁻¹·mol⁻¹, à peu près constants. Que vaut K° à 300\u00a0K, et au-dessus de quelle température K° est-il inférieur à 1 ?",
        options: { a: "K° ≈ 0,20 ; K° < 1 dès 250\u00a0K, donc déjà à 300\u00a0K.", b: "K° ≈ 5 ; K° < 1 au-dessus de 250\u00a0K seulement.", c: "K° ≈ 3 × 10³ ; jamais, puisque la réaction est exothermique.", d: "K° ≈ 0,20 ; K° < 1 au-dessus de 4000\u00a0K." },
        hint: "ΔrG° = ΔrH° \u2212 TΔrS°, puis K° = exp(\u2212ΔrG°/RT).",
        why: "ΔrG°(300\u00a0K) = \u221220 + 300 × 0,080 = +4,0\u00a0kJ·mol⁻¹, d'où K° = exp(\u22124000/2494) ≈ 0,20. ΔrG° change de signe à ΔrH°/ΔrS° = 250\u00a0K : en dessous, l'enthalpie l'emporte ; au-dessus, l'entropie. Leçons « Enthalpie libre et second principe » et « Enthalpie libre standard de réaction et constante d'équilibre »." },
      pile: { prompt: "Une pile à hydrogène débite sous 1,0\u00a0V à 298\u00a0K, réactifs et produit sous p°. Pour une mole de H₂ consommée (deux moles d'électrons, ΔrG° = \u2212237\u00a0kJ·mol⁻¹), quel travail électrique fournit-elle, et quelle entropie crée-t-elle ?",
        options: { a: "237\u00a0kJ, et aucune entropie créée.", b: "193\u00a0kJ, et environ 0,15\u00a0kJ·K⁻¹ d'entropie créée.", c: "286\u00a0kJ, toute la chaleur de réaction.", d: "193\u00a0kJ, et aucune entropie créée." },
        hint: "ΔG = W′ \u2212 T₀S_c, avec W′ le travail électrique reçu.",
        why: "Le travail fourni vaut 2 × 96\u202f485 × 1,0 = 193\u00a0kJ. ΔG = W′ \u2212 T₀S_c donne S_c = (\u2212193 + 237)/298 ≈ 0,15\u00a0kJ·K⁻¹ par mole de H₂. À vide, sous 1,23\u00a0V, la pile serait réversible ; débiter, c'est créer de l'entropie. Leçon « Enthalpie libre et second principe »." },
      pression: { prompt: "À 298\u00a0K, on passe de 1\u00a0bar à 10\u00a0bar. De combien monte le potentiel chimique de l'eau liquide pure (18\u00a0cm³·mol⁻¹), et celui de la vapeur d'eau traitée en gaz parfait ?",
        options: { a: "De 5,7\u00a0kJ·mol⁻¹ pour les deux.", b: "De 16\u00a0J·mol⁻¹ pour les deux.", c: "De 16\u00a0J·mol⁻¹ pour le liquide, de 5,7\u00a0kJ·mol⁻¹ pour la vapeur.", d: "De zéro pour le liquide, de 2,5\u00a0kJ·mol⁻¹ pour la vapeur." },
        why: "Liquide : Vm Δp = 1,8 × 10⁻⁵ × 9 × 10⁵ = 16\u00a0J·mol⁻¹, d'où a ≈ 1. Gaz : RT ln 10 = 5,71\u00a0kJ·mol⁻¹, 350 fois plus. C'est pourquoi les phases condensées pures ont une activité 1 et les gaz p/p°. Leçon « Potentiel chimique »." },
      osmose: { prompt: "Une solution de glucose à 0,30\u00a0mol·L⁻¹ est séparée de l'eau pure par une membrane qui ne laisse passer que l'eau, à 298\u00a0K. Quelle surpression faut-il appliquer à la solution pour que l'eau cesse d'y entrer ?",
        options: { a: "0,74\u00a0bar.", b: "74\u00a0bar.", c: "Aucune : le glucose ne se dissocie pas en ions.", d: "Environ 7,4\u00a0bar." },
        hint: "Π = cRT, avec c en mol·m⁻³.",
        why: "Π = 300 × 8,314 × 298 = 7,4 × 10⁵ Pa. L'eau de la solution a un potentiel chimique plus bas de RT ln x(eau) ; la surpression le remonte de Vm Π. Une molécule non dissociée compte pour une particule. Leçon « Potentiel chimique »." },
      flaque: { prompt: "L'air est à 300\u00a0K avec une pression partielle de vapeur d'eau de 1,8\u00a0kPa ; psat(300\u00a0K) = 3,54\u00a0kPa. Que vaut μvap \u2212 μliq pour l'eau d'une flaque, et que devient-elle ?",
        options: { a: "Environ \u22121,7\u00a0kJ·mol⁻¹ : la flaque sèche.", b: "Environ +1,7\u00a0kJ·mol⁻¹ : la vapeur se condense sur la flaque.", c: "Zéro : l'air contient déjà de la vapeur, il y a équilibre.", d: "Environ \u22121,8\u00a0kPa : la flaque sèche." },
        why: "μvap \u2212 μliq = RT ln(p/psat) = 2494 × ln 0,51 ≈ \u22121,7\u00a0kJ·mol⁻¹. L'eau passe vers la phase où son potentiel chimique est le plus bas, la vapeur, tant que l'humidité relative reste sous 100\u00a0%. Leçon « Potentiel chimique »." },
      sens: { prompt: "Pour N₂O₄ = 2 NO₂ à 298\u00a0K, K° = 0,148. Un mélange sous 1\u00a0bar contient autant de moles de NO₂ que de N₂O₄. Dans quel sens évolue-t-il ?",
        options: { a: "Vers NO₂, puisque K° est positif.", b: "Vers N₂O₄ : Qr = 0,5 > K°, et ΔrG = RT ln(Qr/K°) ≈ +3,0\u00a0kJ·mol⁻¹.", c: "Il est déjà à l'équilibre.", d: "Vers NO₂, puisque ΔrG° est positif." },
        hint: "Qr = x²(NO₂)/x(N₂O₄) × p/p°.",
        why: "Qr = 0,5²/0,5 × 1 = 0,5. ΔrG = 2479 × ln(0,5/0,148) = +3,0\u00a0kJ·mol⁻¹ > 0 : la réaction recule, du NO₂ se dimérise. Leçon « Enthalpie libre standard de réaction et constante d'équilibre »." },
      vanthoff: { prompt: "N₂O₄ = 2 NO₂ : ΔrH° = 57,1\u00a0kJ·mol⁻¹, K°(298\u00a0K) = 0,148. Estimez K°(350\u00a0K) par la relation de van 't Hoff intégrée.",
        options: { a: "0,0049.", b: "0,17.", c: "4,5.", d: "57." },
        hint: "ln(K₂/K₁) = \u2212(ΔrH°/R)(1/T₂ \u2212 1/T₁).",
        why: "\u2212(57\u202f120/8,314)(1/350 \u2212 1/298,15) = 3,41 : K° est multiplié par 30, d'où 4,5. Réaction endothermique, K° croît avec T. ΔrCp° ≈ \u22123\u00a0J·K⁻¹·mol⁻¹ : l'approximation d'Ellingham se trompe ici de moins de 1\u00a0%. Leçon « Déplacement d'équilibre et relation de van 't Hoff »." },
      ammoniac: { prompt: "Synthèse de l'ammoniac, N₂ + 3 H₂ = 2 NH₃, à 723\u00a0K. Quelle combinaison augmente la fraction d'ammoniac à l'équilibre ?",
        options: { a: "Baisser la pression et ajouter du méthane à pression constante.", b: "Monter la température.", c: "Ajouter de l'argon à volume constant.", d: "Monter la pression et purger les inertes." },
        why: "Δν(gaz) = \u22122 : la pression favorise NH₃ ; un inerte à pression constante dilue, comme une baisse de pression. L'argon à volume constant ne change aucune pression partielle. La réaction est exothermique : chauffer abaisse K°. Leçon « Déplacement d'équilibre et relation de van 't Hoff »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Précipitation et complexation » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      fluorure: { prompt: "Le fluorure de calcium CaF₂ a un pKs de 10,41 à 298\u00a0K. Que vaut sa solubilité dans l'eau pure ?",
        options: { a: "2,1 × 10⁻⁴\u00a0mol·L⁻¹ : Ks = s(2s)² = 4s³.", b: "6,2 × 10⁻⁶\u00a0mol·L⁻¹ : s = √Ks.", c: "3,9 × 10⁻¹¹\u00a0mol·L⁻¹ : s = Ks.", d: "3,4 × 10⁻⁴\u00a0mol·L⁻¹ : s = (Ks)^(1/3)." },
        hint: "Chaque CaF₂ dissous libère un Ca²⁺ et deux F⁻.",
        why: "Ks = [Ca²⁺][F⁻]² = s(2s)² = 4s³, d'où s = (3,9 × 10⁻¹¹/4)^(1/3) = 2,1 × 10⁻⁴\u00a0mol·L⁻¹. Oublier le facteur 4 ou écrire s = √Ks revient à oublier la stœchiométrie. Leçon « Produit de solubilité et condition de précipitation »." },
      baryum: { prompt: "On mélange volume à volume une solution de chlorure de baryum et une solution de sulfate de sodium, toutes deux à 1,0 × 10⁻³\u00a0mol·L⁻¹ (pKs de BaSO₄ : 9,96). Que se passe-t-il ?",
        options: { a: "Rien : les concentrations sont trop faibles pour précipiter.", b: "BaSO₄ précipite : après dilution, Qi = (5,0 × 10⁻⁴)² = 2,5 × 10⁻⁷, plus de 2 000 fois Ks.", c: "BaSO₄ précipite seulement si l'on ajoute un germe.", d: "On ne peut pas conclure sans connaître le volume total." },
        why: "Le mélange divise chaque concentration par deux. Qi = 2,5 × 10⁻⁷ > Ks = 1,1 × 10⁻¹⁰ : le système évolue en précipitant jusqu'à Q = Ks. Le critère est thermodynamique ; il ne dit pas en combien de temps. Leçon « Produit de solubilité et condition de précipitation »." },
      halogenures: { prompt: "Une solution contient Cl⁻ et I⁻, chacun à 0,01\u00a0mol·L⁻¹. On y verse goutte à goutte du nitrate d'argent (pKs : AgCl 9,74 ; AgI 16,08). Que reste-t-il d'iodure dissous quand AgCl commence à précipiter ?",
        options: { a: "0,01\u00a0mol·L⁻¹ : AgCl précipite le premier.", b: "La moitié, 5 × 10⁻³\u00a0mol·L⁻¹.", c: "Environ 4,6 × 10⁻⁹\u00a0mol·L⁻¹ : AgI a précipité presque entièrement avant.", d: "Rien : les deux précipitent en même temps." },
        hint: "AgCl apparaît quand [Ag⁺] = Ks(AgCl)/0,01 ; à cette concentration, [I⁻] = Ks(AgI)/[Ag⁺].",
        why: "AgI apparaît dès [Ag⁺] = 8,3 × 10⁻¹⁵\u00a0mol·L⁻¹, AgCl seulement à 1,8 × 10⁻⁸. À ce moment, [I⁻] = 8,3 × 10⁻¹⁷/1,8 × 10⁻⁸ ≈ 4,6 × 10⁻⁹\u00a0mol·L⁻¹ : la séparation est presque totale. C'est le principe du dosage de Mohr. Leçon « Produit de solubilité et condition de précipitation »." },
      sulfate: { prompt: "Que vaut la solubilité du sulfate de baryum (Ks = 1,1 × 10⁻¹⁰) dans une solution de sulfate de sodium à 0,01\u00a0mol·L⁻¹, en prenant les activités égales aux concentrations ?",
        options: { a: "1,05 × 10⁻⁵\u00a0mol·L⁻¹, comme dans l'eau pure : Ks ne change pas.", b: "1,1 × 10⁻⁶\u00a0mol·L⁻¹, dix fois moins.", c: "Elle augmente, car la force ionique augmente.", d: "1,1 × 10⁻⁸\u00a0mol·L⁻¹ : s ≈ Ks/c, mille fois moins que dans l'eau pure." },
        why: "s(s + c) = Ks avec c ≫ s donne s ≈ Ks/c = 1,1 × 10⁻⁸\u00a0mol·L⁻¹. Les activités modèrent l'effet : à I = 0,03\u00a0mol·L⁻¹, des ions de charge 2 ont γ ≈ 0,5, et la vraie solubilité est plusieurs fois plus grande, sans changer l'ordre de grandeur de la baisse. Leçon « Effet d'ion commun et influence du pH »." },
      cuivre: { prompt: "Une solution tamponnée à pH 7 est saturée en hydroxyde de cuivre(II) (pKs 19,32, pKe 14,00). Que vaut [Cu²⁺] ?",
        options: { a: "4,8 × 10⁻⁶\u00a0mol·L⁻¹ : log [Cu²⁺] = \u2212pKs + 2 pKe \u2212 2 pH = \u22125,32.", b: "4,8 × 10⁻¹³\u00a0mol·L⁻¹ : log [Cu²⁺] = \u2212pKs + pKe \u2212 pH.", c: "10⁻⁷\u00a0mol·L⁻¹, comme [HO⁻].", d: "Elle ne dépend pas du pH." },
        hint: "[HO⁻] = 10⁻⁷\u00a0mol·L⁻¹ et Ks = [Cu²⁺][HO⁻]².",
        why: "[Cu²⁺] = Ks/[HO⁻]² = 10^(\u221219,32)/10^(\u221214), soit 10^(\u22125,32) ≈ 4,8 × 10⁻⁶\u00a0mol·L⁻¹. Une unité de pH en plus la divise par 100 : pente \u22122. Leçon « Effet d'ion commun et influence du pH »." },
      aluminium: { prompt: "On ajoute peu à peu de la soude à une solution d'ions aluminium(III). Un précipité blanc apparaît, puis disparaît. Pourquoi disparaît-il ?",
        options: { a: "Parce que la soude dilue la solution sous la saturation.", b: "Parce que l'ion hydroxyde forme avec l'aluminium le complexe soluble Al(OH)₄⁻ : l'hydroxyde est amphotère.", c: "Parce que Ks de Al(OH)₃ augmente avec le pH.", d: "Parce que l'aluminium est réduit en métal." },
        why: "Al(OH)₃ + HO⁻ = Al(OH)₄⁻. Au-delà d'un certain pH, la solubilité, somme de [Al³⁺] et de [Al(OH)₄⁻], remonte : pour 0,01\u00a0mol·L⁻¹, le solide n'existe qu'entre pH 3,5 et 12,5 dans le modèle à deux espèces. Leçons « Effet d'ion commun et influence du pH » et « Constantes de formation des complexes »." },
      ammine: { prompt: "Pour le cuivre(II) et l'ammoniac, log K₁ … log K₄ = 4,04 ; 3,43 ; 2,80 ; 1,48. Quelle espèce prédomine pour pNH₃ = 2 ?",
        options: { a: "Cu²⁺, car pNH₃ est positif.", b: "Cu(NH₃)₄²⁺, le complexe le plus stable.", c: "Cu(NH₃)₃²⁺ : pNH₃ = 2 est entre log K₄ = 1,48 et log K₃ = 2,80.", d: "Cu(NH₃)₂²⁺, car 2 ligands correspondent à pNH₃ = 2." },
        hint: "Les frontières du diagramme sont en pNH₃ = log Kᵢ.",
        why: "Entre pL = log K₄ et pL = log K₃, ML₃ domine. Les constantes décroissent, chaque complexe a donc son domaine ; ce ne serait pas le cas si une constante dépassait la précédente, comme pour l'argent. Leçon « Constantes de formation des complexes »." },
      bromure: { prompt: "Le bromure d'argent (pKs 12,3) se dissout mal dans l'ammoniac (log β₂ = 7,22), bien dans le thiosulfate (log β₂ = 13,67). Pourquoi ?",
        options: { a: "Parce que le thiosulfate est une base plus forte.", b: "Parce que l'ammoniac précipite l'argent.", c: "Parce que le thiosulfate change Ks.", d: "Parce que la constante de dissolution Ks β₂ vaut 10^(\u22125,08) avec l'ammoniac et 10^(1,37) avec le thiosulfate." },
        why: "AgBr + 2\u00a0L = AgL₂ + Br⁻ a pour constante Ks β₂. Avec l'ammoniac molaire, s ≈ 2,9 × 10⁻³\u00a0mol·L⁻¹ ; avec le thiosulfate, la constante dépasse 1 et le solide se dissout tant qu'il reste du ligand. C'est la chimie du fixateur photographique. Leçon « Constantes de formation des complexes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Élasticité : traction, torsion, flexion » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      tirant: { prompt: "Un tirant d'acier (E = 210\u00a0GPa) de 20\u00a0mm de diamètre et 2\u00a0m de long porte 50\u00a0kN. De combien s'allonge-t-il, et le modèle linéaire est-il justifié ?",
        options: { a: "De 1,5\u00a0mm ; oui : σ = 159\u00a0MPa reste sous f_y = 235\u00a0MPa, ε = 7,6 × 10⁻⁴.", b: "De 15\u00a0mm ; oui, la loi de Hooke vaut jusqu'à la rupture.", c: "De 0,15\u00a0mm ; non, l'acier plastifie dès 100\u00a0MPa.", d: "De 1,5\u00a0mm ; non, il faut tenir compte de l'amincissement de la section." },
        hint: "σ = F/A, puis ΔL = σL/E.",
        why: "A = 314\u00a0mm², σ = 159\u00a0MPa, ε = σ/E = 7,6 × 10⁻⁴, ΔL = 1,5\u00a0mm. La section ne change que de 2νε ≈ 5 × 10⁻⁴ en relatif : on garde la section initiale. Leçon « La loi de Hooke »." },
      pression: { prompt: "Un bloc d'aluminium (E = 70\u00a0GPa, ν = 0,3) est pressé de toutes parts par 100\u00a0MPa. Quelle est sa variation relative de volume ?",
        options: { a: "\u22124,3 × 10⁻³ : trois fois p/E.", b: "\u22121,7 × 10⁻³ : \u2212p/K, avec K = E/3(1 \u2212 2ν) = 58\u00a0GPa.", c: "\u22121,4 × 10⁻³ : p/E.", d: "0 : un métal est incompressible." },
        hint: "Additionnez trois compressions simples : chaque arête raccourcit de p/E, puis regagne deux fois ν p/E.",
        why: "Les pressions latérales allongent chaque arête par effet Poisson ; chaque arête raccourcit de p(1 \u2212 2ν)/E, le volume de trois fois plus : 3 × 10⁸ × 0,4/7 × 10¹⁰ = 1,7 × 10⁻³. Leçon « Déformations uniformes »." },
      bloque: { prompt: "Une couche d'acier (ν = 0,3) est comprimée entre deux plaques, ses côtés empêchés de s'étaler. Combien de fois plus raide paraît-elle qu'une éprouvette libre ?",
        options: { a: "1 fois : E ne dépend que du matériau.", b: "2 fois : deux côtés sont bloqués.", c: "1,35 fois : M/E = (1 \u2212 ν)/(1 + ν)(1 \u2212 2ν).", d: "Infiniment : un solide bloqué ne se déforme plus." },
        hint: "Pour empêcher l'étalement, les parois exercent une contrainte latérale νσ/(1 \u2212 ν).",
        why: "Les contraintes latérales s'opposent, par effet Poisson, au raccourcissement. M = 0,7/(1,3 × 0,4) E = 1,35 E. C'est le module que mesure l'essai œdométrique sur un sol, et celui des ondes de compression dans un solide étendu. Leçons « Déformations uniformes » et « Barre en torsion et ondes de cisaillement »." },
      arbre: { prompt: "On évide un arbre plein de rayon a jusqu'au rayon intérieur b = a/2. Que deviennent sa masse et sa raideur en torsion ?",
        options: { a: "Masse et raideur diminuent toutes deux de 25\u00a0%.", b: "La masse diminue de 50\u00a0%, la raideur de 50\u00a0%.", c: "La masse ne change pas, la raideur augmente.", d: "La masse diminue de 25\u00a0%, la raideur de 6\u00a0% seulement : J = π(a⁴ \u2212 b⁴)/2." },
        hint: "La section varie comme le carré du rayon, le moment quadratique polaire comme sa puissance quatre.",
        why: "La section perd (1/2)² = 25\u00a0% ; le moment polaire perd (1/2)⁴ = 6,25\u00a0%. La matière retirée, proche de l'axe, se déformait peu et sur un petit bras de levier. Leçon « Barre en torsion et ondes de cisaillement »." },
      ondes: { prompt: "Dans un matériau isotrope, on mesure par ultrasons vP/vS = √3. Que vaut son coefficient de Poisson ?",
        options: { a: "ν = 0,25 : (vP/vS)² = 2(1 \u2212 ν)/(1 \u2212 2ν) = 3.", b: "ν = 0,5 : les deux ondes ont alors des vitesses proches.", c: "ν = 0 : c'est le seul cas où vP > vS.", d: "On ne peut pas le savoir sans connaître E." },
        hint: "vP² = M/ρ et vS² = μ/ρ : le rapport ne dépend que de ν.",
        why: "M/μ = 2(1 \u2212 ν)/(1 \u2212 2ν) = 3 donne 2 \u2212 2ν = 3 \u2212 6ν, ν = 1/4, la valeur que Poisson croyait universelle. Avec ρ, les deux vitesses donnent aussi E. Leçon « Barre en torsion et ondes de cisaillement »." },
      console: { prompt: "On double la longueur d'une console d'acier chargée au bout, même charge, même section. Que deviennent sa flèche et sa contrainte maximale ?",
        options: { a: "Flèche × 2, contrainte inchangée.", b: "Flèche × 8, contrainte × 2 : z(L) = WL³/3EI et σ = WLv/I.", c: "Flèche × 4, contrainte × 4.", d: "Flèche × 8, contrainte inchangée, car σ ne dépend que de la charge." },
        hint: "Le moment à l'encastrement est proportionnel à L, la flèche à L³.",
        why: "Le moment à l'encastrement, WL, double : la contrainte aussi. La flèche, qui accumule la courbure sur la longueur, varie comme L³. Si la poutre était à 60\u00a0% de f_y, elle plastifie. Leçon « La poutre fléchie »." },
      mat: { prompt: "Un mât de 3\u00a0m, encastré en pied et libre en tête, porte une charge verticale en tête. On le remplace par une colonne de 3\u00a0m articulée aux deux bouts, même section. Comment change la force d'Euler ?",
        options: { a: "Elle est divisée par deux.", b: "Elle ne change pas : même longueur, même section.", c: "Elle est multipliée par quatre : la longueur de flambement passe de 2L à L.", d: "Elle est multipliée par deux." },
        hint: "Comparez les longueurs de flambement : 2L pour le mât, L pour la colonne articulée.",
        why: "Le mât flambe en un quart de sinusoïde, comme la moitié d'une colonne articulée de 6\u00a0m. F_cr = π²EI/L_cr² : passer de 6 à 3\u00a0m multiplie la force par quatre. Leçon « Le flambement »." },
      poteau: { prompt: "Un poteau tubulaire S235 a A f_y = 603\u00a0kN et une force d'Euler de 1\u00a0109\u00a0kN. L'EN 1993-1-1 donne λ̄ = 0,74 et χ = 0,83 (courbe a). Quelle résistance au flambement retenir, avec γ_M1 = 1,00 ?",
        options: { a: "1\u00a0109\u00a0kN : la force d'Euler.", b: "603\u00a0kN : la plus petite des deux limites idéales.", c: "920\u00a0kN : χ multiplié par la force d'Euler.", d: "500\u00a0kN : χ A f_y. Les imperfections font céder le poteau avant les deux limites idéales." },
        hint: "χ réduit la résistance de la section, pas la force d'Euler.",
        why: "N_b,Rd = χ A f_y/γ_M1 = 0,83 × 603 = 500\u00a0kN. Défaut de rectitude et contraintes résiduelles combinent flexion et compression : la ruine survient sous les deux limites idéales, surtout près de λ̄ = 1. Leçon « Le flambement »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

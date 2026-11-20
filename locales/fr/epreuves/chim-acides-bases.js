/* Épreuve de l'étape « Acides, bases et pH » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      predominance: { prompt: "Une solution contient le couple NH₄⁺/NH₃ (pKa 9,25) à pH 8,25. Quelle forme prédomine, et quelle part représente l'autre ?",
        options: { a: "NH₄⁺ prédomine ; NH₃ ne représente que 9 % du total.", b: "NH₃ prédomine, à 91 %.", c: "Les deux formes sont à parts égales.", d: "NH₃ représente 50 %, car le pH est basique." },
        hint: "pH \u2212 pKa = \u22121 : quel est le rapport [NH₃]/[NH₄⁺] ?",
        why: "lg([NH₃]/[NH₄⁺]) = 8,25 \u2212 9,25 = \u22121 : NH₃ = NH₄⁺/10, soit 1/11 ≈ 9 %. Une solution basique n'est pas forcément du côté de la base d'un couple : seul compte l'écart au pKa. Leçon « Couples acide-base et diagramme de prédominance »." },
      constante: { prompt: "Quelle est la constante de CH₃COOH + HCO₃⁻ → CH₃COO⁻ + CO₂ + H₂O (pKa 4,76 et 6,35) ?",
        options: { a: "10^\u22121,59 : la réaction est défavorisée.", b: "10^1,59 ≈ 39 : favorisée, mais loin d'être quasi totale.", c: "10^11,11 : totale.", d: "10^4,76 : celle de l'acide éthanoïque seul." },
        hint: "K° = 10^(pKa de la base \u2212 pKa de l'acide).",
        why: "L'acide A₁ = CH₃COOH (4,76) réagit sur la base B₂ = HCO₃⁻, dont le couple CO₂/HCO₃⁻ a pour pKa 6,35 : K° = 10^(6,35 \u2212 4,76) = 10^1,59. Sous le seuil de 10⁴, c'est un équilibre à calculer. Leçon « Méthode de la réaction prépondérante »." },
      rp: { prompt: "On mélange de l'acide chlorhydrique à 0,1 mol·L⁻¹ et de l'ammoniac à 0,15 mol·L⁻¹ (concentrations dans le mélange). Quel est le pH ?",
        options: { a: "1,0 : l'acide fort impose son pH.", b: "11,1 : celui de l'ammoniac.", c: "8,95 : après la réaction totale, il reste un tampon NH₄⁺/NH₃ dans le rapport 2 pour 1.", d: "9,25 : le pKa du couple." },
        why: "H₃O⁺ + NH₃ → NH₄⁺ + H₂O, K° = 10^9,25, consomme tout l'acide : il reste 0,1 de NH₄⁺ et 0,05 de NH₃. pH = 9,25 + lg(0,05/0,1) = 8,95 ; le calcul exact donne 8,95. Leçons « Méthode de la réaction prépondérante » et « Solutions tampons et titrages »." },
      ampholyte: { prompt: "Pour le dihydrogénophosphate de sodium à 10⁻³ mol·L⁻¹ (pKa 2,16 et 7,21), la formule ½(pKa1 + pKa2) donne 4,69. Que vaut le pH exact, et pourquoi ?",
        options: { a: "4,69 : le pH d'un ampholyte ne dépend pas de la concentration.", b: "7,0 : la solution est trop diluée pour être acide.", c: "2,16 : le premier pKa l'emporte.", d: "5,14 : le premier pKa est si bas que H₃O⁺ formé n'est plus négligeable devant H₃PO₄ ; la formule sort de son domaine." },
        why: "La formule suppose [H₃PO₄] = [HPO₄²⁻], donc H₃O⁺ négligeable. Avec un premier pKa de 2,16, cela n'est vrai qu'au-dessus de 0,027 mol·L⁻¹ environ. Leçon « Calcul de pH »." },
      dilue: { prompt: "Quel est le pH d'une solution de soude à 10⁻⁸ mol·L⁻¹ ?",
        options: { a: "7,02 : à peine basique, car l'eau fournit dix fois plus d'ions HO⁻ que la soude.", b: "8,0 : la soude est une base forte.", c: "6,0 : 14 + lg c.", d: "7,00 exactement." },
        why: "Le bilan des charges [Na⁺] + [H₃O⁺] = [HO⁻] donne [HO⁻] ≈ 1,05 × 10⁻⁷ mol·L⁻¹, pH 7,02. La formule 14 + lg c, qui néglige l'autoprotolyse de l'eau, donnerait 6, une soude acide. Leçon « Calcul de pH »." },
      formule: { prompt: "Acide méthanoïque (pKa 3,75) à 0,01 mol·L⁻¹ : ½(pKa \u2212 lg c) = 2,88. Est-ce juste ?",
        options: { a: "Non, l'erreur dépasse une unité.", b: "Oui, à 0,03 près : l'acide n'est dissocié qu'à 12 % environ ; le pH exact vaut 2,90.", c: "Oui, exactement : la formule est exacte pour un acide faible.", d: "Non : l'acide méthanoïque est un acide fort." },
        hint: "L'erreur vaut \u2212½ lg(1 \u2212 α).",
        why: "α ≈ 0,12 donne \u2212½ lg 0,88 ≈ 0,03 : sous le seuil de 0,05, la formule convient. Le pH trouvé, 2,88, est bien sous pKa \u2212 0,6 = 3,15. Leçon « Calcul de pH »." },
      tampon: { prompt: "Un tampon contient NH₄⁺ et NH₃ à 0,05 mol·L⁻¹ chacun (pH 9,25). On y ajoute 0,005 mol·L⁻¹ d'acide chlorhydrique. Quel est le nouveau pH ?",
        options: { a: "2,3 : celui de l'acide ajouté.", b: "9,25 : un tampon ne bouge jamais.", c: "9,16 : le rapport [NH₃]/[NH₄⁺] passe de 1 à 0,045/0,055.", d: "8,25 : une unité plus bas." },
        why: "H₃O⁺ + NH₃ → NH₄⁺ est totale : pH = 9,25 + lg(0,045/0,055) = 9,16. Le pouvoir tampon vaut ln 10 × 0,1/4 = 0,058 mol·L⁻¹ par unité de pH : 0,005/0,058 ≈ 0,09. Leçon « Solutions tampons et titrages »." },
      titrage: { prompt: "20 mL d'acide benzoïque sont titrés par la soude à 0,1 mol·L⁻¹ : équivalence à 10,0 mL, pH 4,20 à 5,0 mL, pH 8,36 à l'équivalence. Que conclure ?",
        options: { a: "c = 0,1 mol·L⁻¹ et pKa = 8,36.", b: "c = 0,05 mol·L⁻¹ et pKa = 7 ; l'hélianthine convient.", c: "c = 0,2 mol·L⁻¹ et pKa = 4,20 ; le rouge de méthyle convient.", d: "c = 0,05 mol·L⁻¹ et pKa ≈ 4,20 ; la phénolphtaléine, qui vire entre 8,2 et 10,0, convient." },
        why: "c_a = 0,1 × 10,0/20 = 0,05 mol·L⁻¹. À la demi-équivalence, pH = pKa = 4,20. L'équivalence, en milieu basique (ion benzoate), est dans la zone de la phénolphtaléine ; l'hélianthine et le rouge de méthyle viendraient bien trop tôt. Leçon « Solutions tampons et titrages »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

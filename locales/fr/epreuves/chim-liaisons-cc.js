/* Épreuve de l'étape « Créer des liaisons carbone-carbone » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      regio: { prompt: "Le 2-méthoxybuta-1,3-diène réagit avec le propénal. Selon les orbitales frontalières, quel produit domine ?",
        options: { a: "Le 4-méthoxycyclohex-3-ène-1-carbaldéhyde, produit « para » : méthoxy et formyle en 1,4.", b: "Le 2-méthoxycyclohex-3-ène-1-carbaldéhyde, produit « ortho ».", c: "Le produit « méta », méthoxy et formyle en 1,3.", d: "Un mélange égal : le donneur n'oriente pas la réaction." },
        hint: "Où est le plus gros coefficient de la HO d'un diène porteur d'un donneur en position 2 ?",
        why: "La HO du diène est la plus grosse sur C1, voisin du carbone porteur du méthoxy ; la BV du propénal, sur le carbone terminal. Ces deux carbones se lient : le méthoxy et le formyle se retrouvent en 1,4. Un donneur en position 1 donnerait au contraire le produit « ortho ». Leçon « Réaction de Diels-Alder »." },
      endo: { prompt: "Le cyclopentadiène se dimérise à 298 K en donnant plus de 99 % de dimère endo, bien que l'exo soit plus stable de 2,9 kJ·mol⁻¹. Que peut-on dire de l'écart des barrières ΔΔG‡ = ΔG‡(exo) \u2212 ΔG‡(endo) ?",
        options: { a: "Il vaut 2,9 kJ·mol⁻¹, l'écart de stabilité des produits.", b: "Il dépasse RT ln 99 ≈ 11,4 kJ·mol⁻¹ : la sélectivité est cinétique, à l'opposé de l'équilibre (3,2 contre 1 en faveur de l'exo).", c: "Il est nul : seule la stabilité des produits compte.", d: "Il est négatif : l'exo se forme le plus vite." },
        hint: "Sous contrôle cinétique, n(endo)/n(exo) = exp(ΔΔG‡/RT).",
        why: "Un rapport supérieur à 99 impose ΔΔG‡ > RT ln 99 = 8,314 × 298 × 4,60 ≈ 11,4 kJ·mol⁻¹. À l'équilibre, le rapport exo/endo vaudrait exp(2900/(8,314 × 298)) ≈ 3,2. La règle endo décrit des vitesses, pas des stabilités. Leçon « Réaction de Diels-Alder »." },
      base: { prompt: "On mélange un équivalent de tert-butanolate (pKa du tert-butanol 19) et de la propanone (pKa 19,3). Quelle fraction de la propanone passe sous forme d'énolate, dans le modèle idéal ?",
        options: { a: "Toute : une base forte déprotone toujours totalement.", b: "Moins de 1 %.", c: "Environ 41 % : K° = 10^(19 \u2212 19,3) ≈ 0,5, et x²/(1 \u2212 x)² = K°.", d: "Exactement 50 %, puisque les pKa sont voisins." },
        hint: "K° = 10^(pKa de l'acide conjugué de la base \u2212 pKa de la cétone).",
        why: "K° = 10^\u22120,3 ≈ 0,50 ; √K° = 0,71 et x = 0,71/1,71 ≈ 41 %. Une déprotonation n'est totale que si l'écart de pKa dépasse plusieurs unités : avec le LDA (pKa 36), K° ≈ 10¹⁶. Leçon « Énolates, C-alkylation et aldolisation »." },
      croisee: { prompt: "La propanone et le benzaldéhyde sont mélangés avec de la soude. Combien de produits d'addition aldolique peut-on former, stéréoisomères non comptés ?",
        options: { a: "Quatre : chacun donne un énolate et chacun reçoit.", b: "Un seul : le benzaldéhyde est le seul électrophile.", c: "Trois.", d: "Deux : l'énolate de la propanone s'additionne à la propanone ou au benzaldéhyde ; le benzaldéhyde, sans hydrogène en α, ne donne pas d'énolate." },
        why: "Un seul donneur, deux accepteurs. Le benzaldéhyde, meilleur électrophile et sans énolate, rend la réaction utile : c'est la condensation de Claisen-Schmidt, suivie d'une crotonisation. Leçons « Énolates, C-alkylation et aldolisation » et « Crotonisation et réaction de Michael »." },
      e1cb: { prompt: "Dans la crotonisation par mécanisme E1cb, l'énolate est reprotoné 50 fois plus vite qu'il ne perd l'ion hydroxyde (k₋₁ = 50 k₂). Quelle erreur commet l'approximation du pré-équilibre, v ≈ k₂ (k₁/k₋₁) [aldol][hydroxyde] ?",
        options: { a: "Environ 2 % : l'expression exacte a k₋₁ + k₂ au dénominateur, l'écart relatif vaut k₂/k₋₁.", b: "Aucune : le pré-équilibre est exact.", c: "Un facteur 50.", d: "50 % : les deux étapes ont la même importance." },
        why: "v = k₁k₂/(k₋₁ + k₂) × [aldol][hydroxyde] ; remplacer k₋₁ + k₂ par k₋₁ surestime v de k₂/k₋₁ = 1/50 = 2 %. Si k₂ ≫ k₋₁, c'est l'inverse : la déprotonation limite. Leçon « Crotonisation et réaction de Michael »." },
      sites: { prompt: "Le malonate de diéthyle déprotoné et le bromure de méthylmagnésium réagissent chacun avec la but-3-én-2-one. Où attaquent-ils ?",
        options: { a: "Tous deux sur le carbone du carbonyle.", b: "L'énolate du malonate sur le carbone β (addition 1,4, réaction de Michael) ; l'organomagnésien sur le carbone du carbonyle (addition 1,2).", c: "Tous deux sur le carbone β.", d: "L'énolate sur le carbonyle, l'organomagnésien sur le carbone β." },
        hint: "Charge positive plus grande sur le carbone du carbonyle, coefficient de BV plus grand sur le carbone β.",
        why: "L'énolate stabilisé, mou, suit les recouvrements : la BV est la plus grosse sur le carbone β. L'organomagnésien, dur, suit les charges : le carbone du carbonyle est le plus positif. Leçons « Crotonisation et réaction de Michael » et « Organomagnésiens sur les époxydes et les esters »." },
      epoxyde: { prompt: "Le bromure de phénylmagnésium ouvre l'oxyde d'éthylène, puis on hydrolyse en milieu acide. Quel produit ?",
        options: { a: "Le 1-phényléthanol, alcool secondaire.", b: "Le phénol.", c: "Le 2-phényléthanol, Ph–CH₂–CH₂–OH : alcool primaire, la chaîne s'allonge de deux carbones.", d: "L'éthylbenzène." },
        why: "Le carbone nucléophile attaque un carbone du cycle tendu par l'arrière ; l'oxygène part avec le doublet, puis il est protoné. Sur un époxyde dissymétrique, c'est le carbone le moins substitué qui est attaqué. Leçon « Organomagnésiens sur les époxydes et les esters »." },
      ester: { prompt: "Un ester réagit avec un organomagnésien ; la cétone intermédiaire réagit dix fois plus vite que l'ester (k₂ = 10 k₁). Quelle proportion maximale de cétone peut-on récupérer, en choisissant au mieux la quantité d'organomagnésien ?",
        options: { a: "50 %, avec un demi-équivalent.", b: "100 %, avec exactement un équivalent.", c: "37 %, la valeur pour deux vitesses égales.", d: "Environ 7,7 %, soit r^(\u2212r/(r\u22121)) pour r = 10 : il faut un autre dérivé d'acide, comme un amide de Weinreb." },
        hint: "Chaque cétone formée rencontre l'organomagnésien plus vite que l'ester restant.",
        why: "Dans le modèle de deux additions consécutives, la cétone culmine à r^(\u2212r/(r\u22121)) = 10^(\u221210/9) ≈ 0,077. Avec un équivalent, il reste environ 47 % d'ester et l'on a 47 % d'alcool tertiaire. Leçon « Organomagnésiens sur les époxydes et les esters »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

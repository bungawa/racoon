/* Épreuve de l'étape « Activation et protection » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      phenolate: { prompt: "On ajoute un équivalent de soude à de l'éthanol (pKa 15,9), puis, séparément, à du phénol (pKa 9,95). Que forme-t-on ?",
        options: { a: "Les deux alcoolates, totalement.", b: "Aucun des deux : la soude est trop faible.", c: "Environ 10 % d'éthanolate, mais 99 % de phénolate.", d: "Du dihydrogène dans les deux cas." },
        hint: "K = 10^(pKa(H₂O) \u2212 pKa(alcool)), avec pKa(H₂O) = 14,0.",
        why: "Éthanol : K ≈ 0,013, x ≈ 10 %. Phénol : K ≈ 1,1 × 10⁴, x ≈ 99 %. Pour l'éthanol, on prend Na ou NaH : H₂ s'échappe, la réaction est totale. Leçon « Alcoolates et synthèse de Williamson »." },
      williamson: { prompt: "Pour préparer le 2-méthoxy-2-méthylpropane par une synthèse de Williamson, quelle paire ?",
        options: { a: "2-méthylpropan-2-olate de sodium + iodométhane.", b: "Méthanolate de sodium + 2-bromo-2-méthylpropane.", c: "Méthanol + 2-méthylpropan-2-ol.", d: "Les deux paires anioniques se valent." },
        why: "L'halogène va sur le méthyle : SN2 rapide. Sur le carbone tertiaire, l'alcoolate, base forte, provoquerait l'élimination en 2-méthylpropène." },
      protonation: { prompt: "pKa(R–OH₂⁺) ≈ \u22122. Avec HBr concentré, pourquoi l'alcool primaire devient-il bromoalcane alors que moins de 1 % est protoné à chaque instant ?",
        options: { a: "Parce que HBr déprotone l'alcool.", b: "Parce que l'ion bromure déplace directement l'ion hydroxyde.", c: "Parce que la réaction passe par un carbocation primaire stable.", d: "Parce que la fraction protonée, qui a l'eau pour groupe partant, réagit par SN2 et se renouvelle aussitôt." },
        why: "La protonation est un équilibre rapide ; seule la forme protonée réagit. La vitesse est proportionnelle à cette petite fraction, mais l'équilibre la reforme sans cesse. Leçon « Activation électrophile des alcools »." },
      tosylate: { prompt: "(S)-butan-2-ol → TsCl, pyridine → puis iodure de sodium dans l'acétone. Configuration du 2-iodobutane ?",
        options: { a: "(S) : deux rétentions.", b: "(R) : rétention à la tosylation, inversion à la SN2.", c: "Racémique : passage par un carbocation.", d: "(S) : deux inversions." },
        why: "TsCl réagit sur l'oxygène, la liaison C–O reste : (S)-tosylate. L'iodure attaque à l'opposé du tosylate : inversion, I prend le rang 1 de O, (R)." },
      deanstark: { prompt: "Cétone + éthane-1,2-diol ⇌ acétal + eau, K = 1, quantités égales. Rendement sans retirer l'eau ? Et pourquoi un Dean-Stark à reflux dans le toluène l'améliore-t-il ?",
        options: { a: "100 % : l'APTS rend la réaction totale.", b: "25 % : le diol réagit deux fois.", c: "50 % ; l'hétéroazéotrope toluène–eau emporte l'eau, qui se sépare dans le tube et ne revient pas : l'équilibre se déplace.", d: "50 % ; le toluène dilue le mélange et déplace l'équilibre." },
        hint: "ξ²/(1 \u2212 ξ)² = 1. Le volume compte-t-il quand il y a autant de molécules de chaque côté ?",
        why: "ξ = 1/2. Δn = 0 : la dilution ne change rien. Seul le retrait d'un produit déplace l'équilibre ; le catalyseur n'en change pas la position. Leçon « Acétalisation et hémiacétalisation du glucose »." },
      glucose: { prompt: "Une solution d'α-D-glucopyranose pur ([α] = 112,2) voit son pouvoir rotatoire descendre jusqu'à 52,7. Pourquoi ?",
        options: { a: "L'hémiacétal s'ouvre et se referme : une part se change en anomère β ([α] = 18,7), jusqu'à 64 % de β.", b: "Le glucose se dégrade.", c: "Il se forme le L-glucose, énantiomère.", d: "La concentration diminue par évaporation." },
        why: "L'hémiacétalisation est renversable. (112,2 \u2212 52,7)/(112,2 \u2212 18,7) ≈ 0,64, la composition mesurée à l'équilibre dans l'eau." },
      sequence: { prompt: "On veut additionner l'organomagnésien du 3-bromopropan-1-ol sur l'éthanal. Quelle séquence ?",
        options: { a: "Mg, puis éthanal, puis hydrolyse.", b: "Éthane-1,2-diol et APTS, puis Mg, puis éthanal.", c: "NaBH₄, puis Mg, puis éthanal.", d: "Protéger l'alcool en éther (benzylique ou silylé), puis Mg, éthanal et hydrolyse douce, puis déprotéger (H₂ sur Pd, ou ion fluorure)." },
        why: "Le H acide de l'alcool détruirait l'organomagnésien. Le diol protège un carbonyle, pas un alcool. Leçon « Protection et déprotection des groupes carbonyle et hydroxyle »." },
      retro: { prompt: "Rétrosynthèse du 2-phénylbutan-2-ol : on coupe la liaison entre le carbone de l'alcool et le phényle. Synthons et équivalents ?",
        options: { a: "C₆H₅⁺ et C₄H₉O⁻ : bromobenzène et butan-2-olate.", b: "C₆H₅⁻ et C₄H₉O⁺ : bromure de phénylmagnésium et butanone.", c: "C₆H₅⁻ et C₄H₉O⁺ : benzène et butan-2-ol.", d: "Cette coupure n'a pas d'équivalent." },
        why: "Le carbone de l'alcool porte le synthon positif, dont l'équivalent est le carbonyle ; l'autre fragment est un carbanion, dont l'équivalent est l'organomagnésien. Leçon « Analyse rétrosynthétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

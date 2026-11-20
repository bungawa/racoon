/* Épreuve de l'étape « Compléments de synthèse » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      wittigVoie: { prompt: "On veut le 2-méthylbut-2-ène, (CH₃)₂C=CH–CH₃, par une réaction de Wittig. Quelle voie choisir ?",
        options: { a: "Propanone et ylure tiré du bromoéthane : halogénure primaire, SN2 facile.", b: "Éthanal et ylure tiré du 2-bromopropane : la double liaison se forme ailleurs.", c: "Les deux voies se valent : la classe de l'halogénure ne compte pas.", d: "Aucune : un alcène trisubstitué ne se prépare pas par Wittig." },
        hint: "Chaque coupure de la double liaison donne un carbonyle et un halogénure ; regardez la classe de ce dernier.",
        why: "Couper C=C en mettant O sur le carbone qui porte les deux méthyles donne la propanone et Ph₃P=CH–CH₃, issu du bromoéthane, primaire. L'autre coupure demande une SN2 sur le 2-bromopropane, secondaire : lente, concurrencée par l'élimination. La double liaison, elle, se forme dans les deux cas à la place du carbonyle. Leçon « Réaction de Wittig »." },
      wittigZE: { prompt: "Propanal et Ph₃P=CH–CO₂Et d'une part, propanal et Ph₃P=CH–CH₂CH₃ (sans sel de lithium) d'autre part. Quels isomères dominent ?",
        options: { a: "Z dans les deux cas.", b: "E dans les deux cas.", c: "E avec l'ylure stabilisé par l'ester, Z avec l'ylure alkyle.", d: "Z avec l'ylure stabilisé, E avec l'ylure alkyle." },
        hint: "Le groupe ester conjugué au carbanion stabilise l'ylure.",
        why: "Tendances, pas lois : un ylure stabilisé donne surtout l'alcène E, avec une forte sélectivité ; un ylure non stabilisé, sans sel de lithium, surtout l'alcène Z. Pour l'alcène E à partir d'un ylure alkyle, il faut la modification de Schlosser ou un phosphonate. Leçon « Réaction de Wittig »." },
      malonatePka: { prompt: "Malonate de diéthyle (pKa 13,5) et tert-butanolate (pKa du tert-butanol : 19), une mole de chaque. Que vaut K°, et quelle fraction du malonate est déprotonée ?",
        options: { a: "K° = 10⁻⁵,⁵ ; presque rien.", b: "K° = 10⁵,⁵ ≈ 3 × 10⁵ ; plus de 99,8 %.", c: "K° = 5,5 ; environ 70 %.", d: "K° = 1 ; 50 %." },
        hint: "K° = 10^(pKa(BH) \u2212 pKa(AH)), puis x/(1 \u2212 x) = √K°.",
        why: "K° = 10^(19 \u2212 13,5) ≈ 3,2 × 10⁵ ; x/(1 \u2212 x) = √K° ≈ 560, x ≈ 0,998. Avec l'éthanolate (pKa 16), K° ≈ 316 et x ≈ 0,95 suffit déjà, et l'éthanolate n'échange pas les groupes d'un ester éthylique. Les pKa viennent de l'eau : l'écart se transpose mieux que les valeurs. Leçon « Synthèse malonique »." },
      maloniqueCible: { prompt: "Par la synthèse malonique, quels halogénures donnent l'acide 2-éthylpentanoïque, CH₃CH₂CH₂–CH(CH₂CH₃)–COOH ?",
        options: { a: "Le 3-bromohexane, en une alkylation.", b: "Le 1-bromopentane et le bromoéthane.", c: "Le 1-bromopropane seul, deux fois.", d: "Le 1-bromopropane et le bromoéthane, en deux alkylations successives." },
        hint: "Repérez le carbone α et comptez les chaînes qu'il porte en plus du COOH.",
        why: "Le carbone α porte un propyle et un éthyle : deux alkylations du malonate, l'une par le 1-bromopropane, l'autre par le bromoéthane, puis hydrolyse et décarboxylation, qui rend un H au carbone α. Le malonate apporte –CH–COOH. Leçon « Synthèse malonique »." },
      cuprateSite: { prompt: "Sur la cyclohex-2-énone, (CH₃)₂CuLi donne la 3-méthylcyclohexanone, CH₃Li surtout le 1-méthylcyclohex-2-én-1-ol. Quelle explication donne le modèle de Hückel du propénal ?",
        options: { a: "Le carbone β est le plus chargé : le cuprate y va par attraction électrostatique.", b: "La charge π est plus forte sur le carbone du carbonyle, la BV plus grosse sur le carbone β : le nucléophile dur suit la charge, le mou le recouvrement.", c: "Le cuivre bloque l'oxygène ; le lithium, non.", d: "Les deux sites sont équivalents ; seule la température décide." },
        hint: "Charge positive sur le carbone 2 : +0,33 ; sur le carbone 4 : +0,23. Coefficient² de la BV : 0,33 et 0,43.",
        why: "Contrôle de charge pour l'organolithien, très polarisé : carbone 2, addition 1,2. Contrôle orbitalaire pour le cuprate, nucléophile mou : carbone 4, addition 1,4. Le classement tient pour h_O de 0,5 à 2. Le chemin réel du cuprate passe par un intermédiaire du cuivre(III) : le modèle prévoit le site, pas le mécanisme. Leçon « Organocuprates et additions conjuguées »." },
      lialh4Ester: { prompt: "On réduit 11,6 g de butanoate d'éthyle (116,16 g·mol⁻¹) par LiAlH₄ (37,95 g·mol⁻¹). Quelle masse minimale de LiAlH₄ faut-il ?",
        options: { a: "Environ 1,9 g : deux hydrures par ester, quatre par LiAlH₄.", b: "Environ 3,8 g : un LiAlH₄ par ester.", c: "Environ 0,95 g : un hydrure par ester.", d: "Environ 7,6 g : quatre hydrures par ester." },
        hint: "Combien d'hydrures pour transformer un ester en deux alcools ?",
        why: "n(ester) = 11,6/116,16 ≈ 0,0999 mol ; deux hydrures chacun, soit 0,200 mol de H⁻, donc 0,0499 mol de LiAlH₄ et 1,90 g. On en pèse un excès, à détruire prudemment à la fin : chaque mole restante dégage quatre moles de H₂. Leçon « Réductions par LiAlH₄, hydrolyse des nitriles et des amides »." },
      nitrileOxydation: { prompt: "Le pentanenitrile est réduit par LiAlH₄ en pentan-1-amine, ou hydrolysé à chaud en acide pentanoïque. Comment évolue le nombre d'oxydation du carbone fonctionnel ?",
        options: { a: "+3 → +3 dans les deux cas.", b: "+3 → \u22121 dans les deux cas.", c: "+1 → \u22121 par réduction, +1 → +3 par hydrolyse.", d: "+3 → \u22121 par réduction (deux hydrures) ; +3 → +3 par hydrolyse." },
        why: "Le carbone du nitrile a trois liaisons vers N : +3. L'amine R–CH₂–NH₂ : deux H et une liaison à N, \u22121 ; chaque hydrure fixé abaisse de 2. L'acide garde trois liaisons à l'oxygène : +3. L'hydrolyse n'échange pas d'électrons. Leçon « Réductions par LiAlH₄, hydrolyse des nitriles et des amides »." },
      chaine: { prompt: "On part du 1-bromobutane et on veut l'hexan-1-ol. Quelle suite d'étapes convient ?",
        options: { a: "Réaction de Wittig avec le méthanal, puis hydrolyse.", b: "Cuprate du 1-bromobutane sur l'éthanal, puis LiAlH₄.", c: "Alkylation du malonate de diéthyle, hydrolyse et décarboxylation (acide hexanoïque), puis LiAlH₄.", d: "Hydrolyse du 1-bromobutane, puis NaBH₄." },
        hint: "Le malonate allonge de deux carbones ; il faut ensuite réduire un acide.",
        why: "Le malonate transforme R–Br en R–CH₂–COOH : l'acide hexanoïque. LiAlH₄ réduit l'acide (trois hydrures, dont un dégagé en H₂) en alcool primaire ; NaBH₄ ne le ferait pas. Leçons « Synthèse malonique » et « Réductions par LiAlH₄, hydrolyse des nitriles et des amides »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

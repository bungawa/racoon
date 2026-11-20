/* Épreuve de l'étape « Chimie industrielle minérale » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      compromis: { prompt: "N₂ + 3 H₂ = 2 NH₃ est exothermique. Sous 200 bar, l'équilibre permettrait de convertir 81 % du diazote à 550 K et 37 % à 737 K. Pourquoi l'industrie travaille-t-elle vers 700 à 750 K ?",
        options: { a: "Parce que K° est plus grand à 737 K.", b: "Parce que l'ammoniac se décompose sous 600 K.", c: "Parce qu'à 550 K la réaction, même catalysée, est si lente que le gaz sort presque intact : l'optimum d'un passage est là où vitesse et équilibre se compensent.", d: "Parce que la pression baisse quand la température baisse." },
        why: "À froid, on est limité par la vitesse ; à chaud, par l'équilibre. La conversion d'un passage est maximale entre les deux. Leçon « Synthèse de l'ammoniac »." },
      catalyseur: { prompt: "On remplace le catalyseur au fer par un catalyseur plus actif, à pression égale. Que devient la température de travail optimale ?",
        options: { a: "Elle baisse, et la conversion d'un passage augmente, car l'équilibre est plus favorable à plus basse température.", b: "Elle monte, car un catalyseur actif supporte la chaleur.", c: "Elle ne change pas : un catalyseur ne modifie pas K°.", d: "Elle baisse, mais la conversion diminue." },
        why: "Le catalyseur ne change pas K°, mais il accélère la réaction à chaque température : l'équilibre est atteint plus bas, là où il est plus riche en ammoniac. C'est ce que permettent le fer promu au cobalt et le ruthénium." },
      recyclage: { prompt: "Dans la boucle de synthèse de l'ammoniac, on condense l'ammoniac à la sortie du réacteur et on renvoie le reste du gaz. Que fait ce retrait du produit ?",
        options: { a: "Il augmente K°.", b: "Il abaisse la température du réacteur.", c: "Il élimine les gaz inertes.", d: "Il ramène Q bien au-dessous de K° : le gaz recyclé peut réagir de nouveau, et la boucle convertit presque tout." },
        why: "Un passage ne convertit que 20 à 30 % du gaz. Retirer NH₃ abaisse Q ; les inertes, eux, s'accumulent, d'où une purge continue." },
      ostwald: { prompt: "À 1\u202f173 K, l'oxydation de l'ammoniac en diazote a un lg K° plus grand, par mole d'ammoniac, que l'oxydation en monoxyde d'azote. Pourquoi obtient-on pourtant plus de 95 % de monoxyde d'azote ?",
        options: { a: "Parce que l'équilibre favorise le monoxyde d'azote à haute température.", b: "Parce que les deux réactions sont totales : c'est leur vitesse relative sur la toile de platine rhodié, pendant un contact très bref, qui décide.", c: "Parce que le diazote formé est réoxydé en monoxyde d'azote.", d: "Parce que la pression est élevée." },
        why: "Deux réactions totales ne se départagent pas par l'équilibre. La sélectivité est cinétique : catalyseur et temps de contact. Leçon « Acide nitrique et engrais azotés »." },
      engrais: { prompt: "Quelle est la fraction massique d'azote du nitrate d'ammonium pur, NH₄NO₃ (M = 80,04 g·mol⁻¹, M(N) = 14,007 g·mol⁻¹) ?",
        options: { a: "35,0 %.", b: "17,5 %.", c: "46,6 %.", d: "82,2 %." },
        hint: "Il y a deux atomes d'azote par formule.",
        why: "2 × 14,007/80,04 = 0,350. Le produit commercial titre de 33,5 à 34,5 % : eau et additifs. L'urée, à 46,6 %, fait mieux." },
      anode: { prompt: "Dans l'électrolyse d'une saumure à pH 3, E(O₂/H₂O) = 1,05 V et E(Cl₂/Cl⁻) ≈ 1,36 V. Pourquoi l'anode dégage-t-elle du dichlore ?",
        options: { a: "Parce que le dioxygène est plus soluble que le dichlore.", b: "Parce que la thermodynamique favorise le dichlore.", c: "Parce que les ions sodium sont oxydés en même temps.", d: "Parce que l'oxydation de l'eau est très lente sur l'anode revêtue : à la densité de courant de l'usine, la courbe intensité-potentiel du dichlore est atteinte la première." },
        why: "La thermodynamique désigne le dioxygène ; le surpotentiel élevé de l'eau sur cette anode renverse l'ordre. Leçon « Électrolyse du chlorure de sodium »." },
      energie: { prompt: "Une cellule à membrane travaille sous 3,35 V avec un rendement faradique de 95 %. Quelle énergie électrique consomme-t-elle par kilogramme de dichlore (F = 96\u202f485 C·mol⁻¹, M(Cl₂) = 70,90 g·mol⁻¹) ?",
        options: { a: "4,6 MJ·kg⁻¹.", b: "9,6 MJ·kg⁻¹.", c: "2,7 MJ·kg⁻¹.", d: "19,2 MJ·kg⁻¹." },
        hint: "w = 2FU/(η M), deux électrons par molécule de Cl₂.",
        why: "2 × 96\u202f485 × 3,35/(0,95 × 0,0709) = 9,6 MJ·kg⁻¹. Les usines européennes à membrane consomment environ 9,4 MJ·kg⁻¹ (médiane), redresseur compris." },
      javel: { prompt: "On acidifie une eau de Javel (hypochlorite et chlorure de sodium) jusqu'à pH 3. Que se passe-t-il, et pourquoi ?",
        options: { a: "Rien : l'hypochlorite n'existe qu'en milieu acide.", b: "Il se dégage du dioxygène : HClO oxyde l'eau.", c: "Il se dégage du dichlore : la dismutation Cl₂ + 2 HO⁻ = ClO⁻ + Cl⁻ + H₂O s'inverse quand le pH baisse, et le dichlore n'a de domaine qu'en milieu acide.", d: "L'hypochlorite précipite." },
        why: "HClO + H⁺ + Cl⁻ = Cl₂ + H₂O : à pH 3, une eau de Javel à 2,6 % de chlore actif est en équilibre avec plus de 1 bar de dichlore. Leçon « Le chlore en solution aqueuse »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

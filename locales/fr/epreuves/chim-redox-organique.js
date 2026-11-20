/* Épreuve de l'étape « Oxydoréduction en chimie organique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      acide: { prompt: "Quel est le nombre d'oxydation du carbone du groupe carboxyle de l'acide propanoïque, CH₃–CH₂–CO₂H ?",
        options: { a: "+3", b: "+2", c: "+1", d: "\u22121" },
        hint: "Comptez ses liaisons vers O, double liaison comprise, puis ses liaisons vers H.",
        why: "Une double liaison vers O (+2), une simple vers OH (+1), une liaison C–C (0), aucun H : +3. C'est le niveau d'oxydation 3 des acides et de leurs dérivés. Leçon « Niveau d'oxydation des groupes caractéristiques »." },
      methanol: { prompt: "Le méthanol est oxydé en méthanal, puis en acide méthanoïque, puis en dioxyde de carbone. Combien d'électrons une molécule cède-t-elle en tout ?",
        options: { a: "4", b: "6", c: "8", d: "2" },
        why: "Le carbone passe de \u22122 (méthanol) à 0, +2, puis +4 : deux électrons par étape, six au total. Huit, c'est en partant du méthane. Leçon « Niveau d'oxydation des groupes caractéristiques »." },
      hydratation: { prompt: "Laquelle de ces transformations n'est ni une oxydation ni une réduction du substrat ?",
        options: { a: "Propan-2-ol → propanone.", b: "Propanal → propan-1-ol.", c: "Propène + eau → propan-2-ol.", d: "Propanal → acide propanoïque." },
        hint: "Suivez la somme des n.o. des trois carbones.",
        why: "Dans l'hydratation, un carbone gagne une liaison vers O (+1), son voisin une liaison vers H (\u22121) : la somme ne change pas. Les trois autres font varier la somme de 2. Leçon « Niveau d'oxydation des groupes caractéristiques »." },
      classe: { prompt: "Chauffé à reflux avec un excès de dichromate en milieu aqueux acide, lequel de ces alcools donne un acide carboxylique ?",
        options: { a: "Le butan-2-ol.", b: "Le 2-méthylpropan-2-ol.", c: "Le cyclohexanol.", d: "Le butan-1-ol." },
        why: "Seul un alcool primaire donne un aldéhyde, qui garde un H sur son carbone fonctionnel et s'oxyde en acide. Les secondaires s'arrêtent à la cétone, le tertiaire ne réagit pas. Leçon « Oxydation des alcools selon leur classe »." },
      dichromate: { prompt: "Quelle quantité d'ions dichromate faut-il au moins pour oxyder 0,30\u00a0mol de propan-2-ol en propanone ?",
        options: { a: "0,10\u00a0mol", b: "0,30\u00a0mol", c: "0,90\u00a0mol", d: "0,05\u00a0mol" },
        hint: "Cr₂O₇²⁻ capte 6 électrons ; combien en cède chaque molécule d'alcool ?",
        why: "Chaque molécule cède 2 électrons, soit 0,60\u00a0mol d'électrons ; un ion dichromate en capte 6 (deux chromes de +6 à +3) : 0,60/6 = 0,10\u00a0mol. Bilan : Cr₂O₇²⁻ + 3\u00a0C₃H₈O + 8\u00a0H⁺ = 2\u00a0Cr³⁺ + 3\u00a0C₃H₆O + 7\u00a0H₂O. Leçon « Oxydation des alcools selon leur classe »." },
      infrarouge: { prompt: "Après une oxydation contrôlée du butan-1-ol, le distillat montre une bande C=O vers 1730\u00a0cm⁻¹, une bande C–H moyenne entre 2700 et 2830\u00a0cm⁻¹, et pas de bande O–H large. Que conclure ?",
        options: { a: "L'oxydation est allée jusqu'à l'acide butanoïque.", b: "Le distillat est le butanal : l'aldéhyde a été arrêté à temps.", c: "Le distillat est du butan-1-ol qui n'a pas réagi.", d: "Le distillat est une cétone." },
        why: "Les bandes C–H d'aldéhyde (2695 à 2830\u00a0cm⁻¹) et l'absence de O–H écartent l'alcool et l'acide, dont la bande O–H très large irait de 2500 à 3300\u00a0cm⁻¹. Un alcool primaire ne donne pas de cétone. Leçon « Oxydation des alcools selon leur classe »." },
      masse: { prompt: "On veut réduire 7,2\u00a0g de butanone (M = 72,1\u00a0g·mol⁻¹) par NaBH₄ (M = 37,8\u00a0g·mol⁻¹). Quelle masse minimale de NaBH₄ faut-il, si chaque ion cède ses quatre hydrures ?",
        options: { a: "3,8\u00a0g", b: "1,9\u00a0g", c: "0,95\u00a0g", d: "0,24\u00a0g" },
        hint: "Un hydrure par groupe C=O, quatre hydrures par BH₄⁻.",
        why: "7,2/72,1 = 0,100\u00a0mol de butanone, donc 0,025\u00a0mol de BH₄⁻ : 0,025 × 37,8 ≈ 0,95\u00a0g. En pratique on en met davantage, car le solvant protique en décompose une partie. Leçon « Réduction des aldéhydes et des cétones par NaBH₄ »." },
      chimio: { prompt: "Une molécule porte un groupe aldéhyde et un groupe carboxyle. Traitée par NaBH₄ dans l'éthanol, puis hydrolysée, elle donne…",
        options: { a: "un diol : les deux groupes sont réduits.", b: "un dialdéhyde.", c: "un acide où l'aldéhyde est devenu un acide lui aussi.", d: "un alcool primaire qui porte encore son groupe carboxyle." },
        why: "NaBH₄ réduit l'aldéhyde en alcool primaire et ne réduit pas l'acide : c'est sa chimiosélectivité. Il faudrait LiAlH₄ pour réduire aussi l'acide. Leçon « Réduction des aldéhydes et des cétones par NaBH₄ »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

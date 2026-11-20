/* Épreuve de l'étape « Conversion de groupes caractéristiques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      anomere: { prompt: "Dans le glucose cyclique, le carbone 1 porte un groupe OH et l'oxygène du cycle, lui-même lié au carbone 5. Quelle famille ce carbone porte-t-il ?",
        options: { a: "Un hémiacétal : un même carbone tétragonal porte un OH et un O–R.", b: "Un acétal : deux oxygènes sur le même carbone.", c: "Un alcool et un éther-oxyde indépendants.", d: "Un ester, puisque l'oxygène est dans un cycle." },
        hint: "Comptez les oxygènes simples portés par le carbone 1, et ce qu'ils portent.",
        why: "Un OH et un O–R sur le même carbone : hémiacétal. Il s'ouvre en aldéhyde et en alcool, ce qui explique la réactivité d'aldéhyde du glucose. Un acétal aurait deux O–R. Leçon « Familles fonctionnelles et géométrie d'approche »." },
      controle: { prompt: "A ⇌ B et A ⇌ C à 298 K. La barrière vers C dépasse de 5,7 kJ·mol⁻¹ celle vers B ; mais ΔrG° vaut \u22125 kJ·mol⁻¹ vers B et \u221215 kJ·mol⁻¹ vers C. Que vaut B/C aux temps courts, puis à l'équilibre ?",
        options: { a: "Environ 10, et il le reste.", b: "Environ 10, puis environ 0,018 : C l'emporte à la fin.", c: "Environ 0,018 dès le début.", d: "Environ 1 dans les deux cas." },
        why: "Temps courts : rapport des vitesses, exp(5,7/2,48) ≈ 10. Équilibre : rapport des constantes, exp(\u221210/2,48) ≈ 0,018. Le produit cinétique B se reconvertit en C par l'intermédiaire de A. Leçon « Familles fonctionnelles et géométrie d'approche »." },
      hydratation: { prompt: "Le 1-méthylcyclohexène est chauffé dans l'eau acidifiée. Quel alcool se forme surtout ?",
        options: { a: "Le 2-méthylcyclohexan-1-ol, car l'eau va sur le carbone le moins encombré.", b: "Un mélange égal des deux alcools possibles.", c: "Le 1-méthylcyclohexan-1-ol, par le carbocation tertiaire.", d: "Le cyclohexylméthanol." },
        why: "La protonation se fait sur le carbone qui porte un H, pour donner le carbocation tertiaire, le plus stable ; l'eau s'y fixe. C'est l'orientation de Markovnikov. L'hydroboration donnerait l'autre alcool. Leçon « Additions électrophiles sur les doubles liaisons C=C »." },
      froid: { prompt: "Le borane s'ajoute sur le styrène avec un rapport 80 : 20 vers 298 K. Si l'écart de barrières ne change pas, quel rapport à 248 K ?",
        options: { a: "Toujours 80 : 20.", b: "Environ 70 : 30.", c: "Environ 99 : 1.", d: "Environ 84 : 16." },
        hint: "ΔΔG‡ = RT ln 4 à 298 K, puis exp(ΔΔG‡/RT) à 248 K.",
        why: "ΔΔG‡ = 2,48 × ln 4 ≈ 3,4 kJ·mol⁻¹. À 248 K, RT ≈ 2,06 kJ·mol⁻¹ : exp(3,44/2,06) ≈ 5,3, soit 84 %. Refroidir gagne en sélectivité, modestement. Leçon « Additions électrophiles sur les doubles liaisons C=C »." },
      exces: { prompt: "Une mole d'acide éthanoïque et deux moles d'éthanol sont portées à l'équilibre, K ≈ 4. Quelle fraction de l'acide est estérifiée ?",
        options: { a: "Environ 85 %.", b: "67 %, comme à parts égales.", c: "100 %, l'alcool étant en excès.", d: "Environ 50 %." },
        hint: "x² = 4 (1 \u2212 x)(2 \u2212 x).",
        why: "3x² \u2212 12x + 8 = 0 donne x ≈ 0,845. L'excès d'alcool déplace l'équilibre sans le rendre total ; retirer l'eau ferait mieux. Leçon « Esters, amides, polyesters et peptides »." },
      activation: { prompt: "Pour préparer un amide à partir d'un acide carboxylique et d'une amine, pourquoi passe-t-on d'abord par le chlorure d'acyle ?",
        options: { a: "Parce que l'acide est un plus mauvais acide que l'amine.", b: "Parce que l'acide et l'amine forment d'abord un sel non électrophile, alors que le chlorure d'acyle est très électrophile et porte un excellent nucléofuge.", c: "Parce que le chlorure d'acyle est moins réactif et donc plus sélectif.", d: "Parce que l'amide se forme seulement en phase gazeuse." },
        why: "L'amine déprotone l'acide : l'ion carboxylate ne réagit plus. L'activation ex situ en chlorure d'acyle rend l'addition-élimination rapide et totale ; une base piège le chlorure d'hydrogène. Leçon « Esters, amides, polyesters et peptides »." },
      nylon: { prompt: "Une polycondensation est faite avec 2 % de diamine en défaut (r = 0,98). Même à conversion totale, quelle longueur moyenne de chaîne ?",
        options: { a: "Infinie, puisque tout a réagi.", b: "50 monomères.", c: "Environ 99 monomères.", d: "Environ 1 000 monomères." },
        hint: "Plafond (1 + r)/(1 \u2212 r).",
        why: "(1 + 0,98)/(1 \u2212 0,98) = 99. Toutes les chaînes finissent par la fonction en excès et ne peuvent plus s'unir. D'où le sel de nylon, qui fixe r = 1. Leçon « Esters, amides, polyesters et peptides »." },
      polyene: { prompt: "Un diène porte une double liaison trisubstituée (vitesse relative 6\u202f500) et une monosubstituée (24), indépendantes. Avec un équivalent de peroxyacide, quelle part du diène est époxydée sur la seule trisubstituée ?",
        options: { a: "Environ 50 %.", b: "Environ 73 %.", c: "100 % exactement.", d: "Environ 97 %." },
        why: "Le rapport des vitesses vaut environ 270 : l'oxydant va presque tout à la double liaison la plus riche. Le calcul de compétition donne 97 % de mono-époxyde sur la trisubstituée, et environ 1,5 % de diépoxyde, autant de diène intact. Leçon « Hydrogénation hétérogène, époxydes et réduction des esters »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

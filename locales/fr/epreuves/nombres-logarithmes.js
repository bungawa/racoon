/* Épreuve de l'étape « Nombres et logarithmes » : textes en français. Une autre langue = locales/<langue>/epreuves/nombres-logarithmes.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/nombres-logarithmes.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      regle: { prompt: "Une règle à calcul de 25\u00a0cm, lue à 0,2\u00a0mm près, donne une erreur relative d'environ 0,18\u00a0% : trois chiffres significatifs. Quelle longueur faudrait-il pour en avoir quatre ?",
        options: { a: "50\u00a0cm.", b: "25\u00a0cm, avec une loupe qui double la précision de lecture.", c: "25\u00a0m.", d: "2,5\u00a0m." },
        hint: "Chaque nombre v est gravé à la distance L log₁₀ v de l'origine.",
        why: "Une erreur de lecture Δx donne une erreur relative ln 10 × Δx/L, la même pour tout nombre lu. Pour la diviser par 10, il faut L dix fois plus grande, 2,5\u00a0m. Leçon « Les opérations inverses » ; un chiffre de plus, c'est un ordre de grandeur de précision en plus, leçon « Approcher les irrationnels »." },
      cinq: { prompt: "Sachant log₁₀ 2 ≈ 0,301, que vaut log₁₀ 5, et quel est l'ordre de grandeur de 5\u00a0×\u00a010⁷ ?",
        options: { a: "0,699 ; 10⁸.", b: "0,699 ; 10⁷.", c: "0,151 ; 10⁷.", d: "1,505 ; 10⁹." },
        hint: "5 = 10/2, et l'ordre de grandeur arrondit le logarithme décimal à l'entier.",
        why: "log₁₀ 5 = log₁₀ 10 \u2212 log₁₀ 2 = 0,699 : le logarithme change le quotient en différence. log₁₀(5\u00a0×\u00a010⁷) = 7,699, qui s'arrondit à 8 : la frontière est √10 ≈ 3,16, pas 5. Leçons « Les opérations inverses » et « Approcher les irrationnels »." },
      negatif: { prompt: "Jusqu'où vaut la règle (a^b)^c = a^(bc), une fois les exposants étendus aux fractions ?",
        options: { a: "Pour tous les réels a, sans exception : c'est la règle qu'on a choisi de garder.", b: "Seulement pour des exposants entiers.", c: "Pour une base positive ; avec a = \u22128, elle « démontre » \u22122 = 2, car ((\u22128)²)^(1/6) = 2 alors que (\u22128)^(1/3) = \u22122.", d: "Seulement pour une base supérieure à 1." },
        hint: "Pour quelles bases les puissances fractionnaires ont-elles été construites ?",
        why: "Les puissances fractionnaires ont été construites pour a > 0. Une règle prolongée ne vaut que là où le prolongement a été fait : appliquée à une base négative, elle mène à une contradiction. Leçon « Abstraction et généralisation » ; la règle elle-même vient du regroupement des répétitions, leçon « Addition et multiplication »." },
      zero: { prompt: "Pourquoi log₁₀ 1 = 0, et pourquoi le logarithme d'un nombre compris entre 0 et 1 est-il négatif ?",
        options: { a: "Par convention : on aurait pu choisir log₁₀ 1 = 1.", b: "La règle a^(b+c) = a^b a^c impose 10⁰ = 1 et 10^(\u2212n) = 1/10ⁿ ; le logarithme, qui cherche l'exposant, vaut donc 0 pour 1 et devient négatif sous 1.", c: "Parce qu'un logarithme compte les chiffres, et 1 n'en a qu'un.", d: "Parce que le logarithme d'un nombre inférieur à 1 est celui d'un nombre négatif." },
        hint: "Que vaut 10⁰ ? Et 10⁻³ ?",
        why: "a⁰ et a^(\u2212n) ne viennent pas du comptage : ce sont les seules valeurs qui gardent a^(b+c) = a^b a^c. Le logarithme décimal de c est l'exposant b tel que 10^b = c : 10⁰ = 1 donne 0, et 10⁻³ = 0,001 donne \u22123. Leçons « Abstraction et généralisation » et « Les opérations inverses »." },
      petit: { prompt: "Sans calculatrice, avec la pente trouvée par les racines successives de 10, que vaut 10^0,001 ?",
        options: { a: "Environ 1,001.", b: "Environ 1,023.", c: "Environ 1,0023.", d: "Environ 1,000\u202f01." },
        hint: "Pour ε petit, 10^ε ≈ 1 + 2,3026 ε.",
        why: "Les racines carrées successives montrent que 10^s \u2212 1 devient proportionnel à s, avec une pente limite 2,3026 = ln 10 : 10^0,001 ≈ 1 + 0,0023. L'erreur relative sur 10^ε \u2212 1 est de l'ordre de 1,15 ε, ici 0,1\u00a0%. Leçon « Approcher les irrationnels » ; ln 10 comme facteur de changement de base, leçon « Les opérations inverses »." },
      machine: { prompt: "Décrire la machine avant de calculer : un ordinateur en double précision garde 53 bits. Quelle erreur relative fait-il sur √2, et combien de chiffres justes reste-t-il de 10^(2⁻³⁰) \u2212 1 ≈ 2,1\u00a0×\u00a010⁻⁹, calculé par soustraction directe ?",
        options: { a: "Environ 10⁻¹⁶ ; environ 7 chiffres.", b: "Aucune sur √2 ; 16 chiffres.", c: "Environ 10⁻¹⁶ ; 16 chiffres, car une soustraction est exacte.", d: "Environ 10⁻⁸ ; 8 chiffres." },
        hint: "10^(2⁻³⁰) = 1,000\u202f000\u202f002\u202f144… : combien de chiffres sont des zéros de tête ?",
        why: "√2 est remplacé par la fraction binaire la plus proche, à 1,1\u00a0×\u00a010⁻¹⁶ près en relatif. Dans 10^(2⁻³⁰) = 1,000\u202f000\u202f002\u202f144…, la soustraction de 1 est exacte, mais seuls les chiffres après les huit zéros portent l'information : il en reste environ 16 \u2212 9 = 7. C'est l'élimination catastrophique. Leçons « Abstraction et généralisation » et « Approcher les irrationnels »." },
      pente: { prompt: "Des mesures suivent y = C xⁿ. En traçant log₁₀ y en fonction de log₁₀ x, on lit : quand x est multiplié par 100, y est multiplié par 1\u202f000. Que vaut n ?",
        options: { a: "10.", b: "3.", c: "0,5.", d: "1,5." },
        hint: "log y = log C + n log x : n est une pente.",
        why: "Le logarithme change la loi de puissance en droite : pente = log₁₀ 1\u202f000/log₁₀ 100 = 3/2. C'est ainsi qu'on lit l'exposant 3/2 de la troisième loi de Kepler. Un exposant fractionnaire signifie une racine : y ∝ x√x, sens donné par la leçon « Abstraction et généralisation ». Lecture logarithmique, leçon « Les opérations inverses »." },
      produit: { prompt: "Laquelle de ces égalités découle de la règle a^(b+c) = a^b a^c ?",
        options: { a: "log(x + y) = log x × log y.", b: "log(xy) = log x + log y.", c: "log(x + y) = log x + log y.", d: "(a^b)^c = a^(b+c)." },
        hint: "Lisez la règle à l'envers : quel est l'exposant d'un produit ?",
        why: "Lue à l'envers, a^(b+c) = a^b a^c dit que l'exposant d'un produit est la somme des exposants : le logarithme change × en +. Il ne change pas les sommes en quoi que ce soit de simple. C'est l'idée de la règle à calcul et des tables. Leçons « Addition et multiplication » et « Les opérations inverses »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

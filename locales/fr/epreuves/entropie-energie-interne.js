/* Épreuve de l'étape « Entropie et énergie interne » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      echelle: { prompt: "Une machine réversible prend 1\u00a0500\u00a0J à un four chaque fois qu'elle cède 1\u00a0000\u00a0J à de l'eau au point triple. Quelle est la température du four ?",
        options: { a: "Environ 410\u00a0K : 273,16\u00a0K × 1\u00a0500/1\u00a0000.", b: "Environ 182\u00a0K : 273,16\u00a0K × 1\u00a0000/1\u00a0500.", c: "Environ 773\u00a0K : 273,16\u00a0K + 500.", d: "On ne peut pas le savoir sans connaître le fluide de la machine." },
        hint: "La température thermodynamique est un rapport de chaleurs échangées par une machine réversible.",
        why: "Par définition, T = 273,16\u00a0K × Q/Q₀ = 273,16 × 1,5 ≈ 410\u00a0K. Le fluide n'intervient pas : toutes les machines réversibles entre les deux mêmes thermostats ont le même rapport de chaleurs. Leçon « Température thermodynamique »." },
      centrale: { prompt: "Une centrale reçoit sa vapeur à 823\u00a0K et rejette sa chaleur à une rivière à 303\u00a0K. Quel rendement ne peut-elle pas dépasser ?",
        options: { a: "Environ 100\u00a0% : il suffirait de supprimer les frottements.", b: "Environ 63\u00a0% : 1 \u2212 303/823.", c: "Environ 37\u00a0% : 303/823.", d: "Environ 92\u00a0% : l'écart, 520\u00a0K, rapporté à la température moyenne, 563\u00a0K." },
        why: "Le rendement d'une machine réversible, (44.14), vaut 1 \u2212 T₂/T₁ = 1 \u2212 303/823 ≈ 0,63. Une centrale réelle fait nettement moins : frottements, échanges sous des écarts finis de température, et une source chaude qui n'est pas à 823\u00a0K pendant tout l'apport de chaleur. Leçon « Température thermodynamique »." },
      isochore: { prompt: "Une mole de gaz diatomique (C_V = 5R/2) est chauffée de 300\u00a0K à 600\u00a0K à volume constant. Que vaut sa variation d'entropie ?",
        options: { a: "Zéro : à volume constant, le gaz ne reçoit aucun travail.", b: "Environ 6,2\u00a0kJ/K : la chaleur reçue, C_V × 300\u00a0K.", c: "Environ 14,4\u00a0J/K : (5R/2) ln 2.", d: "Environ 20,8\u00a0J/K : C_V tout seul." },
        hint: "dS = dQ/T, avec dQ = C_V dT.",
        why: "Le chauffage est réversible si les thermostats successifs suivent la température du gaz. ΔS = ∫ C_V dT/T = (5R/2) ln(600/300) = 20,8 × 0,693 ≈ 14,4\u00a0J/K. La chaleur reçue, 6,2\u00a0kJ, a été reçue à des températures de plus en plus hautes : on ne la divise pas par une seule température. Leçon « Entropie »." },
      detente: { prompt: "Deux moles de gaz parfait triplent de volume en se détendant dans le vide, sans chaleur ni travail. Que vaut la variation d'entropie de l'univers ?",
        options: { a: "Zéro, puisque Q = 0.", b: "Négative, puisque le gaz se refroidit.", c: "Environ 2,2\u00a0J/K : 2R ln 3 divisé par la température.", d: "Environ 18,3\u00a0J/K : 2R ln 3." },
        why: "La détente libre est irréversible : ∫dQ/T n'y donne pas ΔS. Un gaz parfait garde sa température, puisque son énergie ne dépend pas du volume. On calcule ΔS sur une isotherme réversible entre les mêmes états : nR ln(V₂/V₁) = 2 × 8,314 × 1,099 ≈ 18,3\u00a0J/K. L'extérieur n'a rien échangé : c'est l'entropie créée. Leçons « Entropie » et « Énergie interne »." },
      melange: { prompt: "On mélange 1\u00a0kg d'eau à 363\u00a0K et 1\u00a0kg d'eau à 283\u00a0K (c = 4\u00a0180\u00a0J·kg⁻¹·K⁻¹), dans un récipient isolé. Que devient l'entropie de l'ensemble ?",
        options: { a: "Elle augmente d'environ 64\u00a0J/K : le froid gagne 552\u00a0J/K, le chaud perd 488\u00a0J/K.", b: "Elle ne change pas : la chaleur perdue par l'une est gagnée par l'autre.", c: "Elle diminue, car la température moyenne ne change pas.", d: "Elle augmente de 4\u00a0180 × 80/323 ≈ 1\u00a0035\u00a0J/K." },
        hint: "La température finale est 323\u00a0K ; chaque masse change d'entropie de m c ln(T_f/T_i).",
        why: "4\u00a0180 × ln(323/363) ≈ \u2212488\u00a0J/K pour l'eau chaude, 4\u00a0180 × ln(323/283) ≈ +552\u00a0J/K pour la froide. La même chaleur est reçue à plus basse température qu'elle n'est cédée : le bilan est positif. Le mélange est irréversible. Leçon « Entropie »." },
      interne: { prompt: "Pour une mole de diazote de Van der Waals (a = 0,137\u00a0Pa·m⁶·mol⁻²) dans 1\u00a0L, que vaut (∂U/∂V) à température fixée, d'après (45.7) ?",
        options: { a: "Zéro : seul un gaz parfait a une énergie qui dépend du volume.", b: "Environ 1,4 × 10⁵\u00a0Pa, soit a/V² : le volume propre b n'y entre pas.", c: "La pression du gaz, environ 2,5\u00a0MPa.", d: "On ne peut pas le savoir sans connaître les capacités thermiques." },
        why: "T(∂P/∂T) à volume fixé vaut RT/(V \u2212 b) ; on retranche P = RT/(V \u2212 b) \u2212 a/V² : il reste a/V² = 0,137/10⁻⁶ ≈ 1,4 × 10⁵\u00a0Pa. C'est l'attraction des molécules qui donne de l'énergie à l'écartement. Pour un gaz parfait, c'est nul. Leçon « Énergie interne »." },
      elastique: { prompt: "On étire lentement un caoutchouc idéal, à température ambiante constante, en lui fournissant 2\u00a0J de travail. Combien de chaleur rend-il à l'air ?",
        options: { a: "Aucune : le travail est stocké comme dans un ressort.", b: "1\u00a0J : la moitié, l'autre moitié est stockée.", c: "2\u00a0J : son énergie interne ne dépend pas de sa longueur.", d: "Plus de 2\u00a0J, car il se refroidit en s'étirant." },
        hint: "Remplacez P par \u2212f et V par L dans (45.7).",
        why: "(∂U/∂L) à T fixé = f \u2212 T(∂f/∂T). Pour un caoutchouc idéal, f ∝ T : ce terme est nul, U ne change pas, et la chaleur rendue égale le travail reçu. C'est l'entropie du caoutchouc qui baisse, ses chaînes étant moins désordonnées. Étiré trop vite pour rendre cette chaleur, il s'échauffe. Leçon « Applications de l'énergie interne »." },
      pile: { prompt: "La force électromotrice d'une pile, mesurée à courant presque nul, augmente quand on la chauffe. Pendant qu'elle débite lentement à température ambiante, elle…",
        options: { a: "rejette de la chaleur : l'énergie de la réaction dépasse le travail électrique.", b: "n'échange aucune chaleur : une pile n'est pas une machine thermique.", c: "s'échauffe par effet Joule, et c'est tout.", d: "prend de la chaleur à l'air ambiant : le travail électrique fourni dépasse l'énergie libérée par la réaction." },
        why: "Par la relation de la pile, la chaleur reçue réversiblement par coulomb vaut T(∂ℰ/∂T), positive ici. L'énergie libérée par la réaction, \u2212(∂U/∂q) = ℰ \u2212 T(∂ℰ/∂T), est plus petite que le travail ℰ : la différence vient de l'air. À courant fini, l'effet Joule s'y ajoute. Leçon « Applications de l'énergie interne »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

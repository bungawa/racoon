/* Épreuve de l'étape « Gaz réels » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      bouteille: { prompt: "Une bouteille de 10\u00a0L contient de l'argon à 300\u00a0K sous 10\u00a0MPa ; les mesures donnent Z = 0,956. Combien de moles contient-elle ?",
        options: { a: "42,0\u00a0mol, 4,7\u00a0% de plus que les 40,1\u00a0mol du gaz parfait : n = PV/(Z·RT).", b: "38,3\u00a0mol : on multiplie la prévision du gaz parfait par Z.", c: "40,1\u00a0mol : Z ne change que la pression, pas la quantité.", d: "On ne peut pas le savoir sans la masse molaire de l'argon." },
        hint: "Z = PV/(nRT) : à P, V, T fixés, n varie comme 1/Z.",
        why: "n = 10⁷ × 0,01/(0,956 × 8,314 × 300) ≈ 42,0\u00a0mol. Z < 1 : l'attraction l'emporte à 300\u00a0K, sous la température de Boyle de l'argon (407\u00a0K), et le gaz se laisse comprimer davantage. Leçon « Limites du gaz parfait »." },
      boyle: { prompt: "Le diazote à 300\u00a0K reste à 1\u00a0% de la loi des gaz parfaits jusqu'à 11\u00a0MPa ; le dioxyde de carbone à 310\u00a0K s'en écarte de 1\u00a0% dès 0,23\u00a0MPa. D'où vient cette différence ?",
        options: { a: "Le dioxyde de carbone est plus lourd, et la masse entre dans Z.", b: "300\u00a0K est près de la température de Boyle du diazote (326\u00a0K), où attraction et répulsion se compensent ; 310\u00a0K est à 2\u00a0% de la température critique du dioxyde de carbone, dont l'attraction est bien plus forte.", c: "Le diazote est un gaz parfait, le dioxyde de carbone non.", d: "Les mesures du dioxyde de carbone sont moins précises." },
        hint: "Comparez chaque température à la température de Boyle et à la température critique du gaz.",
        why: "La pression seule ne dit pas si un gaz est parfait. Près de T_B, B ≈ 0 et Z reste proche de 1 longtemps ; près de Tc, le puits attractif domine et Z chute vite. Mesuré : B(300\u00a0K) = \u22124,5\u00a0cm³·mol⁻¹ pour le diazote, \u2212121\u00a0cm³·mol⁻¹ pour le dioxyde de carbone. Leçons « Limites du gaz parfait » et « Développement du viriel »." },
      critique: { prompt: "Pour le dioxyde de carbone, Tc = 304,13\u00a0K et Pc = 7,377\u00a0MPa. On choisit a et b de Van der Waals pour retrouver ce point critique. Que valent b et le volume molaire critique prévu, contre 9,41 × 10⁻⁵\u00a0m³·mol⁻¹ mesurés ?",
        options: { a: "b = 1,3 × 10⁻⁴\u00a0m³·mol⁻¹ ; le modèle retrouve exactement le volume critique.", b: "b = 4,3 × 10⁻⁵\u00a0m³·mol⁻¹ ; volume critique 4,3 × 10⁻⁵, trop petit de moitié.", c: "b = 4,3 × 10⁻⁵\u00a0m³·mol⁻¹ ; volume critique 3b = 1,29 × 10⁻⁴\u00a0m³·mol⁻¹, 37\u00a0% trop grand.", d: "b = 3,4 × 10⁻⁴\u00a0m³·mol⁻¹, et le volume critique ne se calcule pas." },
        hint: "b = RTc/(8Pc) et Vm,c = 3b.",
        why: "b = 8,314 × 304,13/(8 × 7,377 × 10⁶) = 4,28 × 10⁻⁵\u00a0m³·mol⁻¹. Deux constantes ne fixent que deux des trois coordonnées critiques : Van der Waals impose Zc = 3/8, la mesure donne 0,275. Leçon « Équation de Van der Waals »." },
      interne: { prompt: "Dans le diazote à 300\u00a0K sous 10⁵\u00a0Pa, la pression interne a/Vm² vaut environ 220\u00a0Pa. Que dire de la correction de Van der Waals à cet état ?",
        options: { a: "Elle est de 220\u00a0%, le gaz est loin d'être parfait.", b: "Elle est nulle : la pression interne n'existe qu'à haute pression.", c: "Elle se mesure directement au manomètre.", d: "Elle vaut 0,2\u00a0% de P ; le covolume corrige en sens inverse d'un ordre comparable, et Z reste à 10⁻³ près de 1." },
        hint: "Comparez a/Vm² à P, puis b/Vm à 1.",
        why: "a/Vm² ≈ 220\u00a0Pa contre P = 10⁵\u00a0Pa : 0,22\u00a0%. Le covolume, b/Vm ≈ 3,9 × 10⁻⁵/0,025 ≈ 0,15\u00a0%, joue en sens inverse. À 300\u00a0K, près de sa température de Boyle, le diazote voit ces deux corrections se compenser presque. Leçons « Équation de Van der Waals » et « Limites du gaz parfait »." },
      paires: { prompt: "L'argon a B(300\u00a0K) = \u221215,1\u00a0cm³·mol⁻¹. Que vaut Z sous 10⁵\u00a0Pa, au premier ordre ?",
        options: { a: "0,9994 : Z ≈ 1 + BP/(RT), avec BP/(RT) ≈ \u22126 × 10⁻⁴.", b: "0,85 : Z ≈ 1 + B, B en cm³·mol⁻¹.", c: "1,0006 : B négatif augmente Z.", d: "1 exactement : B ne compte qu'au-dessus de 1\u00a0MPa." },
        why: "BP/(RT) = \u221215,1 × 10⁻⁶ × 10⁵/(8,314 × 300) ≈ \u22126,1 × 10⁻⁴. B est la correction des paires ; elle est proportionnelle à la densité, donc à P aux faibles pressions. Leçons « Développement du viriel » et « Limites du gaz parfait »." },
      spheres: { prompt: "Un gaz de sphères dures de diamètre σ, sans aucune attraction : que vaut son second coefficient du viriel B(T) ?",
        options: { a: "Il est négatif et tend vers 0 à haute température.", b: "Il vaut 2πN_Aσ³/3, le covolume b, positif et indépendant de T : ce gaz n'a pas de température de Boyle.", c: "Il est nul : sans attraction, le gaz est parfait.", d: "Il vaut \u2212a/(RT)." },
        hint: "Dans le cœur, e\u202f(\u2212u/k_BT) \u2212 1 = \u22121 ; au-dehors, u = 0.",
        why: "B = \u22122πN_A ∫₀\u202fσ (\u22121) r² dr = 2πN_Aσ³/3 : quatre fois le volume propre d'une mole de sphères. Le volume exclu ne dépend pas de la température. Seule une attraction peut rendre B négatif. Leçons « Développement du viriel » et « Équation de Van der Waals »." },
      cuve: { prompt: "Une cuve d'acier, supposée parfaitement rigide, est remplie d'eau à 293\u00a0K (α = 2,07 × 10⁻⁴\u00a0K⁻¹, χ_T = 4,59 × 10⁻¹⁰\u00a0Pa⁻¹). On la chauffe de 5\u00a0K. De combien monte la pression ?",
        options: { a: "De 1,7\u00a0kPa, comme pour un gaz parfait.", b: "De 0,1\u00a0%, comme le volume.", c: "D'environ 2,3\u00a0MPa : (∂P/∂T)_V = α/χ_T ≈ 0,45\u00a0MPa·K⁻¹.", d: "D'environ 450\u00a0MPa : α/χ_T multiplié par 1\u00a0000." },
        hint: "α = Pβχ_T donne (∂P/∂T)_V = α/χ_T.",
        why: "α/χ_T = 2,07 × 10⁻⁴/4,59 × 10⁻¹⁰ ≈ 4,5 × 10⁵\u00a0Pa·K⁻¹ ; 5\u00a0K donnent 2,3\u00a0MPa. Ce qu'on a négligé, la cuve qui cède et α qui varie avec T, réduit un peu ce chiffre ; il reste de l'ordre du mégapascal. Leçon « Coefficients thermoélastiques d'un fluide réel »." },
      capacites: { prompt: "Le dioxyde de carbone à 350\u00a0K et 12\u00a0MPa a α = 1,43 × 10⁻²\u00a0K⁻¹, χ_T = 1,44 × 10⁻⁷\u00a0Pa⁻¹ et Vm = 1,42 × 10⁻⁴\u00a0m³·mol⁻¹. Que vaut C_p \u2212 C_V ?",
        options: { a: "R = 8,31\u00a0J·mol⁻¹·K⁻¹, la relation de Mayer.", b: "Une valeur négative, car Z < 1.", c: "Environ 0,7\u00a0J·mol⁻¹·K⁻¹ : le fluide est dense, donc presque incompressible.", d: "Environ 71\u00a0J·mol⁻¹·K⁻¹, 8,5 fois R : C_p \u2212 C_V = T·Vm·α²/χ_T." },
        hint: "350 × 1,42 × 10⁻⁴ × (1,43 × 10⁻²)²/(1,44 × 10⁻⁷).",
        why: "T·Vm·α²/χ_T ≈ 70,6\u00a0J·mol⁻¹·K⁻¹ ; les capacités thermiques mesurées donnent 70,3. Près de la région critique, χ_T et α sont grands, et la relation de Mayer, qui ne vaut que pour le gaz parfait, se trompe d'un facteur 8. Leçons « Coefficients thermoélastiques d'un fluide réel » et « Limites du gaz parfait »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

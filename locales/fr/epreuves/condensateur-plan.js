/* Épreuve de l'étape « Condensateur plan et claquage » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      plaques: { prompt: "Deux plaques carrées de 10\u00a0cm de côté, à 1\u00a0mm l'une de l'autre dans le vide, sont reliées à un générateur de 100\u00a0V. Quelle charge porte chaque plaque ?",
        options: { a: "Environ 8,9\u00a0nC, un peu plus à cause des bords.", b: "Environ 89\u00a0nC.", c: "Environ 0,89\u00a0nC.", d: "Environ 8,9\u00a0µC." },
        hint: "Q = C V, avec C = ε0 A/d.",
        why: "C = ε0 A/d = 8,85 × 10⁻¹² × 10⁻²/10⁻³ ≈ 88,5\u00a0pF, donc Q = C V ≈ 8,9\u00a0nC. Ici d est le centième du côté : les bords ajoutent quelques pour cent. Leçon « Condensateurs à armatures planes »." },
      ecart: { prompt: "Un condensateur plan chargé est débranché, puis on écarte ses armatures de 1 à 3\u00a0mm (elles restent larges devant l'écart). Que deviennent la charge et la tension ?",
        options: { a: "La charge triple, la tension ne change pas.", b: "La charge ne change pas, la tension triple.", c: "Les deux ne changent pas.", d: "La charge ne change pas, la tension est divisée par trois." },
        why: "Isolées, les armatures gardent leur charge, donc σ et le champ σ/ε0. Le trajet triple : V = E d triple, et C = ε0 A/d est divisée par trois. Leçon « Condensateurs à armatures planes »." },
      bords: { prompt: "Deux disques minces de 5\u00a0cm de rayon sont à 5\u00a0mm l'un de l'autre. De combien leur capacité dépasse-t-elle ε0 π a²/d ?",
        options: { a: "De moins de 1\u00a0%, car d est petit devant a.", b: "De 100\u00a0% : les bords doublent la capacité.", c: "D'environ 17\u00a0%, la correction de Kirchhoff (d/πa)(ln(16πa/d) \u2212 1).", d: "De rien : (6.34) est exacte pour des disques." },
        hint: "Calculez d/(πa), puis le logarithme.",
        why: "d/a = 0,1 : (0,1/π) × (ln(160π) \u2212 1) ≈ 0,032 × 5,2 ≈ 0,17. Le calcul complet donne 17,6\u00a0%. Pour une erreur sous 1\u00a0%, il faudrait d < a/300. Leçon « Condensateurs à armatures planes »." },
      loin: { prompt: "Deux disques de rayon a, portant +Q et \u2212Q, sont éloignés à une distance très grande devant a. Vers quoi tend la capacité de l'ensemble ?",
        options: { a: "Vers zéro, comme ε0 π a²/d.", b: "Vers l'infini.", c: "Vers 4π ε0 a.", d: "Vers 4 ε0 a, la moitié de la capacité 8 ε0 a d'un disque seul." },
        why: "Loin l'un de l'autre, chaque disque est un conducteur seul, de capacité 8 ε0 a, au potentiel ±Q/(8 ε0 a). La tension entre eux vaut 2Q/(8 ε0 a) : C = 4 ε0 a. La formule (6.34), qui tend vers zéro, n'a plus de sens. Leçon « Condensateurs à armatures planes »." },
      vis: { prompt: "La sphère de 20\u00a0cm de rayon d'un générateur électrostatique tiendrait 600\u00a0kV dans l'air. On y laisse dépasser, au bout d'une tige, une tête de vis assimilable à une bille de 2\u00a0mm de rayon, à 1\u00a0m de son centre. Que se passe-t-il ?",
        options: { a: "Le champ sur la bille est environ 80 fois celui de la sphère : l'air claque autour d'elle dès quelques kilovolts.", b: "Rien : la bille est au même potentiel que la sphère, donc au même champ.", c: "La bille reçoit la plus grande partie de la charge.", d: "Le champ sur la bille est 100 fois plus faible, car elle porte 100 fois moins de charge." },
        why: "Même potentiel, mais σ ∝ 1/R : (6.35) donne un rapport des champs de 100, le calcul exact 80 à cette distance. Le claquage part de la bille vers 3\u00a0MV·m⁻¹ : la tension tenable tombe à environ 7\u00a0kV. Leçon « Claquage sous haute tension »." },
      paschen: { prompt: "Dans l'air à la pression normale, un intervalle de 1\u00a0mm claque sous environ 5\u00a0kV, soit 5\u00a0MV·m⁻¹, et un intervalle de 1\u00a0cm sous 3,5\u00a0MV·m⁻¹ environ. Pourquoi le petit intervalle demande-t-il un champ plus fort ?",
        options: { a: "Parce que l'air y est plus dense.", b: "Parce qu'il contient moins de libres parcours : chaque électron doit ioniser plus souvent pour que l'avalanche atteigne la taille critique.", c: "Parce que les électrodes sont plus chaudes.", d: "Parce que le champ n'y est pas uniforme." },
        hint: "Le critère de Townsend fixe α d.",
        why: "Le claquage exige α d = ln(1 + 1/γ), une constante. Si d est plus petit, α doit être plus grand, donc E plus fort, puisque α = A p e^(\u2212Bp/E). Leçon « Claquage sous haute tension »." },
      tunnel: { prompt: "Au bout d'une pointe, le champ vaut 4 × 10⁹\u00a0V·m⁻¹ et le travail de sortie du métal 4,5\u00a0eV. Quelle est, en ordre de grandeur, l'épaisseur de la barrière que les électrons traversent ?",
        options: { a: "Environ 1\u00a0µm.", b: "Environ 1\u00a0pm.", c: "Environ 1\u00a0nm, assez mince pour l'effet tunnel.", d: "Environ 50\u00a0nm, le rayon de la pointe." },
        why: "L'électron gagne e E x en s'éloignant : la barrière s'arrête vers x = φ/(e E) = 4,5\u00a0V/(4 × 10⁹\u00a0V·m⁻¹) ≈ 1,1\u00a0nm, un peu moins avec la force image. À cette épaisseur, la traversée quantique devient notable. Leçon « Microscope à émission de champ »." },
      rayon: { prompt: "Une pointe de 50\u00a0nm de rayon émet à 1,1\u00a0kV. Elle s'émousse et son rayon passe à 100\u00a0nm. À tension égale, que se passe-t-il ?",
        options: { a: "Rien : le champ ne dépend que de la tension.", b: "Le courant double, car la surface émissive est plus grande.", c: "Le grandissement double.", d: "Le champ à la pointe est presque divisé par deux et le courant tombe de plusieurs ordres de grandeur ; le grandissement R/ρ est divisé par deux." },
        why: "E = V/(k ρ) avec k ≈ 5 : le champ passe de 3,9 à 2,1 × 10⁹\u00a0V·m⁻¹. Le courant, exponentiel en 1/E, chute d'environ sept ordres de grandeur, et M ≈ R/ρ diminue de moitié. Leçon « Microscope à émission de champ »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

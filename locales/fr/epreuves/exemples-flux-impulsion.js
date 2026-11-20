/* Épreuve de l'étape « Exemples de flux d'énergie et impulsion du champ » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      antenne: { prompt: "On remplace le vecteur de Poynting S par S + ∇ ∧ W, où W est un champ quelconque, et l'on calcule la puissance rayonnée par une antenne à travers une sphère qui l'entoure. Que change ce remplacement au résultat ?",
        options: { a: "Rien : le flux d'un rotationnel à travers une surface fermée est nul.", b: "Il ajoute le flux de W à travers la sphère.", c: "Il l'annule, puisque ∇·S change.", d: "Cela dépend du rayon de la sphère." },
        why: "∇·(∇ ∧ W) = 0 : le bilan local et le flux à travers toute surface fermée restent les mêmes. Seul le trajet de l'énergie entre deux surfaces change, et aucune mesure ne le voit. Leçon « L'ambiguïté de l'énergie du champ »." },
      boule: { prompt: "Une boule de 10\u00a0cm de rayon porte 1\u00a0µC réparti dans son volume ; son énergie électrostatique vaut 53,9\u00a0mJ. Selon la densité ε0E²/2, quelle part de cette énergie se trouve au-delà de 1\u00a0m du centre ?",
        options: { a: "Rien : toute l'énergie est dans la boule.", b: "4,5\u00a0mJ, soit k Q²/(2r) avec r = 1\u00a0m.", c: "45\u00a0mJ, presque tout.", d: "9,0\u00a0mJ, soit k Q²/r." },
        hint: "Hors de la boule, ε0E²/2 intégrée de r à l'infini donne k Q²/(2r).",
        why: "Au-delà de r, l'énergie du champ vaut k Q²/(2r) = 8,99\u00a0×\u00a010⁹ × 10⁻¹²/2 ≈ 4,5\u00a0mJ, 8\u00a0% du total. Selon ρφ/2, elle serait toute dans la boule. Même total, autre répartition. Leçon « L'ambiguïté de l'énergie du champ »." },
      gravite: { prompt: "Toute énergie U est source de gravitation, comme une masse U/c². Pourquoi cela ne dit-il pas, en pratique, où est l'énergie d'une sphère chargée de laboratoire ?",
        options: { a: "Parce que l'énergie électrique ne pèse pas.", b: "Parce que la lumière n'est pas déviée par la gravitation.", c: "Parce que cette masse crée une pesanteur de l'ordre de 10⁻²⁸ fois celle de la Terre : bien trop peu pour la localiser.", d: "Parce que la relativité générale interdit de localiser l'énergie." },
        why: "Pour 1\u00a0µC sur une sphère de 10\u00a0cm, U ≈ 45\u00a0mJ, soit 5\u00a0×\u00a010⁻¹⁹\u00a0kg. Il faudrait mesurer où se trouve la source d'une pesanteur déjà 10²⁸ fois plus faible que g. Leçon « L'ambiguïté de l'énergie du champ »." },
      laser: { prompt: "Un laser continu de 1\u00a0W concentre son faisceau sur 1\u00a0mm². En le traitant comme une onde plane sinusoïdale, quelle est l'amplitude E0 de son champ électrique ?",
        options: { a: "19\u00a0kV·m⁻¹", b: "1,9\u00a0MV·m⁻¹", c: "750\u00a0V·m⁻¹", d: "27\u00a0kV·m⁻¹" },
        hint: "Intensité ε0c⟨E²⟩, avec ⟨E²⟩ = E0²/2.",
        why: "I = 10⁶\u00a0W·m⁻², donc E0 = √(2I/(ε0c)) = √(2\u00a0×\u00a010⁶/(2,65\u00a0×\u00a010⁻³)) ≈ 2,7\u00a0×\u00a010⁴\u00a0V·m⁻¹. 19\u00a0kV·m⁻¹ est la valeur efficace, E0/√2. Leçon « Exemples de flux d'énergie »." },
      einstein: { prompt: "Un éclair de 1\u00a0kJ traverse d'un bout à l'autre un wagon de 10\u00a0t, long de 10\u00a0m, libre sur ses rails. De combien le wagon recule-t-il ?",
        options: { a: "1,1\u00a0×\u00a010⁻¹⁷\u00a0m", b: "3,3\u00a0×\u00a010⁻⁹\u00a0m", c: "1,1\u00a0×\u00a010⁻¹²\u00a0m", d: "Il ne recule pas : rien ne sort du wagon." },
        why: "M x = (U/c²) L : x = 10³ × 10/(10⁴ × 9,0\u00a0×\u00a010¹⁶) ≈ 1,1\u00a0×\u00a010⁻¹⁷\u00a0m. Rien ne sort, mais de l'énergie se déplace à l'intérieur : sans recul, le centre de masse bougerait. Leçon « Quantité de mouvement du champ »." },
      fil: { prompt: "Un fil de 1\u00a0m, de résistance 2\u00a0Ω, est parcouru par un courant permanent de 3\u00a0A. Quel flux du vecteur de Poynting entre par sa surface latérale ?",
        options: { a: "6\u00a0W, le produit R I.", b: "18\u00a0W : toute la chaleur de Joule entre par la surface.", c: "0\u00a0W : en régime permanent, rien ne change.", d: "9\u00a0W, la moitié de E I ℓ." },
        why: "E = R I/ℓ le long du fil, B = μ0 I/(2πa) à sa surface : le flux vaut 2πaℓ × E B/μ0 = E I ℓ = R I² = 18\u00a0W, la chaleur produite. Leçon « Exemples de flux d'énergie »." },
      condensateur: { prompt: "Un condensateur plan à armatures circulaires de rayon a se charge sous un courant constant I et une tension V. Quel est le flux du vecteur de Poynting à travers le côté d'un cylindre coaxial de rayon a/2, entre les armatures, rapporté à V I ?",
        options: { a: "1 : toute l'énergie traverse n'importe quel cylindre.", b: "1/2", c: "1/4", d: "0 : l'énergie arrive par les fils, au centre." },
        hint: "S croît comme la distance à l'axe, et la surface latérale aussi.",
        why: "S ∝ r et l'aire latérale ∝ r : le flux ∝ r². À a/2, un quart de V I : exactement l'énergie gagnée par le volume de ce cylindre, qui contient un quart du champ. Leçon « Exemples de flux d'énergie »." },
      aimant: { prompt: "Une charge de 10\u00a0nC est posée à 2\u00a0cm d'un petit aimant de moment 1\u00a0A·m², dans le plan perpendiculaire à l'aimant. Quel moment cinétique porte le champ ?",
        options: { a: "0 : rien ne bouge.", b: "5\u00a0×\u00a010⁻¹²\u00a0kg·m²·s⁻¹", c: "2,5\u00a0×\u00a010⁻¹⁶\u00a0kg·m²·s⁻¹", d: "5\u00a0×\u00a010⁻¹⁴\u00a0kg·m²·s⁻¹" },
        hint: "μ0 q m/(4π d), avec μ0/(4π) = 10⁻⁷ en unités SI.",
        why: "10⁻⁷ × 10⁻⁸ × 1/0,02 = 5\u00a0×\u00a010⁻¹⁴\u00a0kg·m²·s⁻¹. Rien ne bouge, mais le vecteur de Poynting tourne autour de la charge : ce moment cinétique est rendu à la matière si l'on supprime l'aimant. Leçons « Quantité de mouvement du champ » et « Exemples de flux d'énergie »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Élasticité : le tenseur des déformations » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      rotation: { prompt: "Un déplacement homogène a ∂ux/∂y = 0,004 et ∂uy/∂x = \u22120,004, toutes les autres dérivées nulles. Que vaut le tenseur des déformations ?",
        options: { a: "Il est nul au premier ordre : c'est une rotation de 0,004 rad autour de z, qui ne tend aucun ressort.", b: "εxy = 0,004 : un cisaillement.", c: "εxy = 0,008 : la somme des deux dérivées croisées.", d: "εxx = εyy = 0,004." },
        hint: "εxy est la demi-somme des deux dérivées croisées.",
        why: "εxy = ½(0,004 \u2212 0,004) = 0. Toute la matrice des dérivées est antisymétrique : c'est ω, une rotation. Au second ordre, la fausse déformation vaut θ²/2 = 8 × 10⁻⁶, négligeable. Leçon « Le tenseur des déformations »." },
      moule: { prompt: "Un bloc d'aluminium (E = 70 GPa, ν = 0,3) est comprimé de 1 ‰ dans un moule rigide qui tient ses faces latérales. Quelle contrainte axiale faut-il ?",
        options: { a: "70 MPa, comme pour une barre libre.", b: "94 MPa : C11 εxx, avec C11 = E(1 \u2212 ν)/((1 + ν)(1 \u2212 2ν)) = 1,35 E.", c: "40 MPa : λ εxx.", d: "27 MPa : μ εxx." },
        hint: "Faces tenues : εyy = εzz = 0.",
        why: "(39.20) avec ε = diag(εxx, 0, 0) donne σxx = (λ + 2μ) εxx = 94 GPa × 10⁻³. Le moule doit pousser latéralement de λ εxx = 40 MPa pour empêcher le bloc de s'élargir. Leçon « Le tenseur d'élasticité »." },
      volume: { prompt: "Une barre d'acier libre (ν = 0,3) est allongée de 2 × 10⁻⁴ par une traction simple. De combien son volume change-t-il ?",
        options: { a: "De +2 × 10⁻⁴.", b: "Il ne change pas.", c: "De +0,8 × 10⁻⁴.", d: "De \u22120,4 × 10⁻⁴." },
        hint: "La variation relative de volume est la trace du tenseur des déformations.",
        why: "ε = diag(ε, \u2212νε, \u2212νε) ; ΔV/V = tr ε = (1 \u2212 2ν) ε = 0,4 × 2 × 10⁻⁴. Un matériau de ν = 1/2 garderait son volume. Leçons « Le tenseur des déformations » et « Le tenseur d'élasticité »." },
      seisme: { prompt: "Une station enregistre l'onde S 20 s après l'onde P. La roche a vP = 6,0 km·s⁻¹ et ν = 1/4. À quelle distance est la source ?",
        options: { a: "120 km : vP multiplié par le retard.", b: "69 km : vS multiplié par le retard.", c: "47 km : la différence des vitesses multipliée par le retard.", d: "Environ 164 km : 20 s/(1/vS \u2212 1/vP), avec vS = vP/√3 = 3,46 km·s⁻¹." },
        hint: "Pour ν = 1/4, λ = μ.",
        why: "vP/vS = √((λ + 2μ)/μ) = √3. Le retard est d/vS \u2212 d/vP, donc d = 20/(1/3,46 \u2212 1/6,0) ≈ 164 km. Leçon « Les mouvements d'un corps élastique »." },
      fer: { prompt: "Dans un monocristal de fer, l'onde de compression va à 5 490 m·s⁻¹ selon [100] et à 6 450 m·s⁻¹ selon [111]. Pourquoi ?",
        options: { a: "Parce que ρv² est une valeur propre de Σ Cijkl nj nl, qui dépend de n ; le fer est loin de l'isotropie, 2C44/(C11 \u2212 C12) = 2,4.", b: "Parce que la masse volumique du fer dépend de la direction.", c: "Parce que l'onde selon [111] est une onde de cisaillement.", d: "Parce que (39.38) ne vaut que selon les axes du cube." },
        hint: "Dans un cristal, la raideur que voit l'onde dépend de sa direction de propagation.",
        why: "Le tenseur de Christoffel dépend de la direction. Selon [100], ρv² = C11 ; selon [111], (C11 + 2C12 + 4C44)/3, plus grand dès que 2C44 > C11 \u2212 C12. Un polycristal à grains fins fait la moyenne et redevient isotrope. Leçon « Les mouvements d'un corps élastique »." },
      cycle: { prompt: "Une barre de S235 (E = 210 GPa, fy = 235 MPa, sans écrouissage) est cyclée entre +3 ‰ et \u22123 ‰. Quelle énergie dissipe-t-elle par cycle et par mètre cube ?",
        options: { a: "Aucune : le cycle est fermé.", b: "Environ 1 770 kJ·m⁻³ : l'aire du parallélogramme, 4 fy (εa \u2212 fy/E).", c: "131 kJ·m⁻³ : fy²/2E.", d: "Environ 3 540 kJ·m⁻³." },
        hint: "La boucle est un parallélogramme de hauteur 2 fy.",
        why: "Chaque demi-cycle plastifie sur 2(εa \u2212 fy/E) = 3,76 ‰ sous ± fy. Aire = 2 fy × 2(εa \u2212 fy/E) = 4 × 235 MPa × 1,88 ‰ ≈ 1,77 MJ·m⁻³, treize fois l'énergie élastique maximale fy²/2E. Leçon « Comportement non élastique »." },
      cauchy: { prompt: "Mesures : NaCl, C12 = 12,7 GPa et C44 = 12,8 GPa ; fer, C12 = 141 GPa et C44 = 116 GPa. Que disent-elles des forces entre atomes ?",
        options: { a: "Rien : C12 et C44 sont indépendants par symétrie cubique, l'égalité pour NaCl est un hasard.", b: "Que le fer est isotrope et pas le sel.", c: "Que les forces entre ions du sel sont presque centrales, alors que dans le fer une énergie qui dépend du volume, celle des électrons libres, s'y ajoute.", d: "Que les deux cristaux ont des liaisons covalentes." },
        hint: "Des forces centrales entre paires imposent C12 = C44.",
        why: "Des forces centrales entre paires imposent C12 = C44, la relation de Cauchy. Le sel la vérifie à 1 % près ; le fer la manque de 22 %. Leçon « Calculer les constantes élastiques »." },
      craie: { prompt: "On tord un bâton de craie et un fil d'acier doux jusqu'à ce qu'ils cèdent. Que se passe-t-il ?",
        options: { a: "Les deux cassent net perpendiculairement à l'axe.", b: "La craie se tord durablement, l'acier casse en hélice.", c: "Les deux cèdent dès que le couple atteint U″(0)θ, le premier terme de (39.41a).", d: "La craie casse selon une hélice à 45°, là où la traction est maximale ; l'acier plastifie par cisaillement et se tord durablement avant de rompre." },
        hint: "Un cisaillement pur est une traction à 45° d'un côté et une compression à 45° de l'autre.",
        why: "La torsion est un cisaillement pur : traction et compression égales à 45°. La craie, fragile, cède en traction ; l'acier, ductile, cède quand le cisaillement maximal atteint fy/2 (Tresca). Leçon « Comportement non élastique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

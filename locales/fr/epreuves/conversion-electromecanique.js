/* Épreuve de l'étape « Conversion électromécanique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      primaire: { prompt: "Un transformateur idéal abaisse 20\u00a0kV à 400\u00a0V et alimente une charge résistive de 1,6\u00a0Ω. Quel courant circule dans le primaire ?",
        options: { a: "5\u00a0A.", b: "250\u00a0A.", c: "0,1\u00a0A.", d: "12\u00a0500\u00a0A." },
        hint: "Calculez d'abord le courant du secondaire, puis i₁ = m i₂.",
        why: "I₂ = 400/1,6 = 250\u00a0A ; m = 400/20\u00a0000 = 0,02 ; I₁ = m I₂ = 5\u00a0A. On le retrouve par la puissance : 100\u00a0kW sous 20\u00a0kV, ou par l'impédance vue, 1,6/0,02² = 4\u00a0kΩ. Leçon « Transformateur monophasé »." },
      magnetisant: { prompt: "Un transformateur de table a un courant magnétisant de 36\u00a0mA pour un courant nominal de 217\u00a0mA au primaire. Sur une charge résistive nominale, de combien |i₁| s'écarte-t-il de m|i₂| ?",
        options: { a: "De 17\u00a0% : le courant magnétisant s'ajoute au courant de charge.", b: "D'environ 1,4\u00a0% : le courant magnétisant est en quadrature avec m i₂ et s'y ajoute vectoriellement.", c: "De rien : le courant magnétisant n'existe qu'à vide.", d: "De 36\u00a0mA exactement, quelle que soit la charge." },
        hint: "Le courant magnétisant est en retard de 90° sur la tension ; le courant d'une charge résistive est en phase avec elle.",
        why: "√(1 + (36/217)²) ≈ 1,014. Le courant magnétisant, fixé par la tension du primaire, ne dépend pas de la charge : il pèse peu en charge et fait tout le courant à vide. C'est le fer, en divisant ce courant par μᵣ, qui rend i₁ = m i₂ utilisable. Leçon « Transformateur monophasé »." },
      transport: { prompt: "Une ligne de 5\u00a0Ω (aller et retour) transporte 10\u00a0MW sous 20\u00a0kV, facteur de puissance 1 : elle en perd 12,5\u00a0%. Quelle part perdrait-elle sous 63\u00a0kV ?",
        options: { a: "4,0\u00a0% : les pertes varient comme 1/U.", b: "12,5\u00a0% : la puissance transportée est la même.", c: "Environ 1,3\u00a0% : les pertes varient comme 1/U².", d: "Environ 0,4\u00a0% : les pertes varient comme 1/U³." },
        why: "Le courant passe de 500 à 159\u00a0A ; les pertes R I² sont divisées par (63/20)² ≈ 9,9 : 12,5/9,9 ≈ 1,26\u00a0%. La chute de tension tombe aussi de 12,5\u00a0% à 1,3\u00a0%, ce qui rend le modèle de ligne résistive plus sûr. Leçon « Transformateur monophasé »." },
      synchrone: { prompt: "Un moteur synchrone à deux pôles, alimenté à 50\u00a0Hz, a un couple maximal de 20\u00a0N·m. Sa charge passe de 10 à 15\u00a0N·m. Que deviennent sa vitesse et l'angle α entre les champs ?",
        options: { a: "La vitesse baisse de moitié, α ne change pas.", b: "La vitesse baisse un peu, comme celle d'un moteur à courant continu.", c: "Le moteur décroche : 15\u00a0N·m dépasse ce qu'il peut fournir au synchronisme.", d: "La vitesse reste 2π × 50 ≈ 314\u00a0rad·s⁻¹ ; α passe de 30° à environ 49°." },
        hint: "Au synchronisme, Γ = Γmax sin α et Ω = ω.",
        why: "Tant que la charge reste sous Γmax, le rotor tourne exactement à ω : seul α s'ajuste, sin α = 15/20 donne 48,6°. L'équilibre reste stable, puisque α < 90°. La puissance passe de 3,1 à 4,7\u00a0kW. Leçon « Machines à courant continu et synchrone »." },
      mcc: { prompt: "Un moteur à courant continu, Φ = 0,05\u00a0V·s et R = 1\u00a0Ω, est alimenté sous 24\u00a0V et entraîne une charge de 0,15\u00a0N·m, frottements négligés. Quels sont sa vitesse et son rendement ?",
        options: { a: "420\u00a0rad·s⁻¹ ; rendement 87,5\u00a0%.", b: "480\u00a0rad·s⁻¹ ; rendement 100\u00a0%.", c: "420\u00a0rad·s⁻¹ ; rendement 12,5\u00a0%.", d: "300\u00a0rad·s⁻¹ ; rendement 62,5\u00a0%." },
        hint: "i = Γ/Φ, puis e = U \u2212 R i, puis Ω = e/Φ.",
        why: "i = 0,15/0,05 = 3\u00a0A ; e = 24 \u2212 3 = 21\u00a0V ; Ω = 21/0,05 = 420\u00a0rad·s⁻¹. La source fournit 72\u00a0W, l'induit en perd 9 par effet Joule, l'arbre reçoit e i = Γ Ω = 63\u00a0W : 87,5\u00a0%. Leçon « Machines à courant continu et synchrone »." },
      hacheur: { prompt: "Le même moteur doit tourner à 400\u00a0rad·s⁻¹ en absorbant 4\u00a0A. Il est alimenté par un hacheur série sans pertes, sur une batterie de 48\u00a0V. Quel rapport cyclique faut-il, et quel courant moyen la batterie fournit-elle ?",
        options: { a: "α = 0,42 ; 4\u00a0A.", b: "α = 0,5 ; 2\u00a0A.", c: "α = 0,5 ; 8\u00a0A.", d: "α = 0,42 ; 1,7\u00a0A." },
        hint: "⟨u⟩ = R⟨i⟩ + ΦΩ = αE ; puis le bilan de puissance.",
        why: "⟨u⟩ = 1 × 4 + 0,05 × 400 = 24\u00a0V = αE, donc α = 0,5. La puissance se conserve : 48 × ⟨i_E⟩ = 24 × 4, d'où 2\u00a0A. α = 0,42 donnerait la seule force contre-électromotrice, en oubliant la chute R i. Leçons « Hacheur, onduleur et redresseur » et « Machines à courant continu et synchrone »." },
      ondulation: { prompt: "Ce hacheur de 48\u00a0V travaille à α = 0,5 et 10\u00a0kHz, avec une inductance de 2\u00a0mH en série avec l'induit, de constante de temps très supérieure à la période. Quelle est l'ondulation du courant, et comment la diviser par deux ?",
        options: { a: "2,4\u00a0A ; en divisant α par deux.", b: "0,3\u00a0A ; elle est déjà minimale à α = 0,5.", c: "0,6\u00a0A ; en doublant la fréquence ou l'inductance.", d: "1,2\u00a0A ; en doublant la tension de la batterie." },
        hint: "Δi = α(1 \u2212 α)E/(Lf).",
        why: "0,5 × 0,5 × 48/(2 × 10⁻³ × 10⁴) = 0,6\u00a0A. α = 0,5 est le pire cas, pas le meilleur ; doubler E doublerait l'ondulation. Doubler f ou L la divise par deux, tant que la période reste courte devant L/R. Leçon « Hacheur, onduleur et redresseur »." },
      onduleur: { prompt: "Un onduleur en pont, commandé en modulation de largeur d'impulsion avec un indice m ≤ 1, doit fournir une tension dont le fondamental vaut 230\u00a0V efficaces. Quelle tension continue minimale lui faut-il ?",
        options: { a: "230\u00a0V : la tension efficace de sortie égale la tension d'entrée.", b: "207\u00a0V, la moyenne d'une sinusoïde redressée.", c: "255\u00a0V : avec une pleine onde, 4E/π = 325\u00a0V.", d: "Environ 325\u00a0V : il faut mE ≥ 230√2 avec m ≤ 1." },
        hint: "En MLI, l'amplitude du fondamental vaut mE.",
        why: "L'amplitude voulue est 230√2 ≈ 325\u00a0V ; avec m ≤ 1, E ≥ 325\u00a0V. La pleine onde y parviendrait avec 255\u00a0V, mais au prix de forts harmoniques 3, 5, 7… La MLI les rejette vers la porteuse, où la bobine de la charge les filtre. Leçon « Hacheur, onduleur et redresseur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

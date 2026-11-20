/* Épreuve de l'étape « Polymères » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      moyennes: { prompt: "Un échantillon contient la même masse de chaînes à 20\u00a0kg·mol⁻¹ et de chaînes à 200\u00a0kg·mol⁻¹. Que valent Mₙ, Mw et Đ ?",
        options: { a: "Mₙ ≈ 36\u00a0kg·mol⁻¹, Mw = 110\u00a0kg·mol⁻¹, Đ ≈ 3,0.", b: "Mₙ = Mw = 110\u00a0kg·mol⁻¹, Đ = 1.", c: "Mₙ = 110\u00a0kg·mol⁻¹, Mw ≈ 36\u00a0kg·mol⁻¹, Đ ≈ 0,33.", d: "Mₙ = 20\u00a0kg·mol⁻¹, Mw = 200\u00a0kg·mol⁻¹, Đ = 10." },
        hint: "À masses égales, les chaînes courtes sont dix fois plus nombreuses.",
        why: "En masse, chaque fraction pèse pour moitié : Mw = (20 + 200)/2 = 110\u00a0kg·mol⁻¹. En nombre, Mₙ = 2/(1/20 + 1/200) ≈ 36\u00a0kg·mol⁻¹. Đ ≈ 3,0, toujours supérieure ou égale à 1. Leçon « Unité de répétition, degré de polymérisation et architectures »." },
      pelote: { prompt: "Une chaîne compte 10⁴ liaisons C–C de 0,154\u00a0nm. Que valent sa longueur de contour et la taille de sa pelote, modèle librement articulé ?",
        options: { a: "1,54\u00a0µm toutes les deux.", b: "1,54\u00a0µm de contour, 15,4\u00a0nm bout à bout en moyenne quadratique.", c: "15,4\u00a0nm de contour, 1,54\u00a0µm bout à bout.", d: "1,54\u00a0nm toutes les deux." },
        why: "L = N b = 10⁴ × 0,154\u00a0nm = 1,54\u00a0µm ; R = b√N = 100 × 0,154\u00a0nm = 15,4\u00a0nm. Les angles de valence fixes allongent un peu la vraie pelote, sans changer la loi en √N. Leçon « Unité de répétition, degré de polymérisation et architectures »." },
      amorceur: { prompt: "En polymérisation radicalaire, on divise par deux la concentration en amorceur. Que deviennent la vitesse de polymérisation et X̄ₙ, sans transfert ?",
        options: { a: "Toutes deux divisées par deux.", b: "Vitesse inchangée, X̄ₙ doublé.", c: "Vitesse divisée par √2, X̄ₙ multiplié par √2.", d: "Vitesse doublée, X̄ₙ divisé par deux." },
        hint: "À l'état quasi stationnaire, [R•] ∝ √[I].",
        why: "[R•] = √(f kd[I]/kₜ) baisse d'un facteur √2, et vₚ avec lui. Chaque radical vit √2 fois plus longtemps : ν et X̄ₙ croissent d'autant. Leçon « Polymérisation radicalaire »." },
      choix: { prompt: "On veut un polystyrène de Mₙ = 50\u00a0kg·mol⁻¹ et de dispersité inférieure à 1,1. Quelle voie, et quel rapport [M]₀/[I]₀ à conversion totale ?",
        options: { a: "Radicalaire, avec beaucoup d'amorceur.", b: "Radicalaire, avec un agent de transfert : [M]₀/[I]₀ = 50.", c: "Anionique, [M]₀/[I]₀ = 50\u202f000.", d: "Anionique vivante, [M]₀/[I]₀ ≈ 480 : une chaîne par molécule d'amorceur." },
        why: "La voie radicalaire donne Đ ≥ 1,5. Une polymérisation vivante donne une loi de Poisson, Đ ≈ 1 + 1/ν, et X̄ₙ = 50/0,104 ≈ 480 motifs, fixé par la stœchiométrie. Leçon « Polymérisation anionique, tacticité et copolymères »." },
      eau: { prompt: "Une polymérisation anionique visait Mₙ = 100\u00a0kg·mol⁻¹, et l'on mesure 125\u00a0kg·mol⁻¹ avec Đ = 1,02. Quelle explication ?",
        options: { a: "Une impureté protique, de l'eau par exemple, a détruit 20\u00a0% de l'amorceur avant l'ajout du monomère : moins de chaînes, plus longues.", b: "Des terminaisons entre chaînes ont soudé les chaînes deux à deux.", c: "Un transfert au solvant.", d: "Une erreur de mesure : une polymérisation vivante donne toujours la masse visée." },
        why: "X̄ₙ ∝ 1/[I]₀ actif : 100/125 = 0,8, soit 20\u00a0% d'amorceur perdu. Une soudure deux à deux ferait monter Đ ; un transfert raccourcirait les chaînes. Leçon « Polymérisation anionique, tacticité et copolymères »." },
      triades: { prompt: "La RMN d'un polymère vinylique donne mm = 4\u00a0%, mr = 32\u00a0%, rr = 64\u00a0%. Qu'en conclure ?",
        options: { a: "Il est isotactique.", b: "Il suit une statistique de Bernoulli avec Pₘ = 0,2 : plutôt syndiotactique.", c: "Il est atactique, Pₘ = ½.", d: "Les données sont impossibles." },
        hint: "Essayez rr = (1 \u2212 Pₘ)².",
        why: "(1 \u2212 0,2)² = 0,64, 0,2² = 0,04, 2 × 0,2 × 0,8 = 0,32 : les trois triades collent, et 4 mm·rr/mr² = 1. Les racémiques dominent : polymère riche en séquences syndiotactiques. Leçon « Polymérisation anionique, tacticité et copolymères »." },
      sbs: { prompt: "Un copolymère styrène–butadiène–styrène est élastique à 298\u00a0K et se moule à 450\u00a0K. Pourquoi ?",
        options: { a: "Le polybutadiène fond à 450\u00a0K.", b: "Ses chaînes sont réticulées par des ponts soufrés qui se rompent à chaud.", c: "Ses nœuds sont des domaines de polystyrène, vitreux sous Tg ≈ 373\u00a0K : au-dessus, ils se ramollissent et le matériau coule.", d: "Le styrène se dépolymérise." },
        why: "Les blocs de polybutadiène, bien au-dessus de leur Tg, sont souples ; les blocs de polystyrène, vitreux à 298\u00a0K, servent de nœuds physiques. À 450\u00a0K, T/Tg ≈ 1,2 pour le polystyrène : les nœuds lâchent. Leçons « Polymérisation anionique, tacticité et copolymères » et « Transition vitreuse et propriétés mécaniques des polymères »." },
      caoutchouc: { prompt: "Un caoutchouc de masse volumique 10³\u00a0kg·m⁻³ a Mc = 8\u00a0kg·mol⁻¹. Que vaut son module d'Young à 300\u00a0K, et que fait-il quand on le chauffe à 350\u00a0K ?",
        options: { a: "3\u00a0GPa, puis il ramollit.", b: "0,31\u00a0MPa, puis il ramollit comme un métal.", c: "0,94\u00a0MPa, inchangé à 350\u00a0K.", d: "0,94\u00a0MPa, puis 1,09\u00a0MPa : le module entropique croît comme T." },
        why: "G = ρRT/Mc = 10³ × 8,314 × 300/8 ≈ 0,31\u00a0MPa et E = 3G ≈ 0,94\u00a0MPa. À 350\u00a0K, ×350/300 : 1,09\u00a0MPa. Leçon « Transition vitreuse et propriétés mécaniques des polymères »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

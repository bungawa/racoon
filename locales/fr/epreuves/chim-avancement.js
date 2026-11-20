/* Épreuve de l'étape « Avancement et équilibre » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      limitant: { prompt: "On introduit 2\u00a0mol de N₂ et 3\u00a0mol de H₂ pour N₂ + 3 H₂ → 2 NH₃, supposée totale. Que contient le réacteur à la fin ?",
        options: { a: "ξ_max = 1\u00a0mol : H₂ est limitant ; il reste 1\u00a0mol de N₂ et il s'est formé 2\u00a0mol de NH₃.", b: "ξ_max = 2\u00a0mol : N₂ est limitant ; il s'est formé 4\u00a0mol de NH₃.", c: "ξ_max = 3\u00a0mol : H₂ est limitant ; il s'est formé 6\u00a0mol de NH₃.", d: "ξ_max = 1\u00a0mol : N₂ est limitant, car il y en a moins." },
        hint: "Comparez n₀/|ν| : 2/1 pour N₂, 3/3 pour H₂.",
        why: "N₂ permet ξ ≤ 2\u00a0mol, H₂ permet ξ ≤ 1\u00a0mol : H₂ limite. Il reste 2 \u2212 1 = 1\u00a0mol de N₂ et il se forme 2 × 1 = 2\u00a0mol de NH₃. Leçon « Avancement et réactif limitant »." },
      tableau: { prompt: "On mélange 0,02\u00a0mol d'ions Ag⁺ et 0,05\u00a0mol d'ions Cl⁻ en solution. Quelle masse de AgCl précipite, avec M(AgCl) = 143,3\u00a0g·mol⁻¹ ? La réaction est supposée totale.",
        options: { a: "7,17\u00a0g : tout le chlorure précipite.", b: "2,87\u00a0g : l'argent est limitant, ξ_max = 0,02\u00a0mol.", c: "10,0\u00a0g : la somme des deux ions précipite.", d: "1,43\u00a0g : la moitié de l'argent précipite." },
        why: "ξ_max = min(0,02 ; 0,05) = 0,02\u00a0mol, d'où m = 0,02 × 143,3 ≈ 2,87\u00a0g. L'excès de chlorure reste en solution. Avec K ≈ 5 × 10⁹, l'hypothèse « totale » est excellente. Leçon « Avancement et réactif limitant »." },
      activite: { prompt: "Quel est le quotient de réaction de CaCO₃(s) ⇌ CaO(s) + CO₂(g) ?",
        options: { a: "Q = [CaO][CO₂]/[CaCO₃].", b: "Q = n(CaO) n(CO₂)/n(CaCO₃).", c: "Q = p(CO₂)/p°.", d: "Q = 1, car les solides n'interviennent pas." },
        hint: "Un solide pur seul dans sa phase a une activité de 1.",
        why: "Les deux solides sont purs, chacun dans sa phase : leurs activités valent 1. Seul le gaz compte, par p(CO₂)/p°. À l'équilibre, la pression de CO₂ est fixée par la température seule. Leçon « Activité, quotient de réaction et constante d'équilibre »." },
      quotient: { prompt: "Pour N₂ + 3 H₂ ⇌ 2 NH₃ entre gaz parfaits sous la pression totale p, comment s'écrit Q en fonction des quantités de matière ?",
        options: { a: "Q = n(NH₃)²/(n(N₂) n(H₂)³), sans la pression.", b: "Q = n(NH₃)² p²/(n(N₂) n(H₂)³ n_tot² p°²).", c: "Q = 2 n(NH₃)/(n(N₂) + 3 n(H₂)).", d: "Q = n(NH₃)² n_tot² p°²/(n(N₂) n(H₂)³ p²)." },
        why: "Chaque activité vaut x_i p/p°. Il y a deux pressions au numérateur et quatre au dénominateur : Q contient (p°/p)² et n_tot². Comprimer abaisse donc Q, et la synthèse avance. Leçons « Activité, quotient de réaction et constante d'équilibre » et « Évolution spontanée d'un système chimique »." },
      equilibre: { prompt: "On dissout de l'acide éthanoïque à 0,1\u00a0mol·L⁻¹ dans l'eau ; K° = 1,75 × 10⁻⁵ à 298\u00a0K. Que vaut [H₃O⁺] à l'équilibre ?",
        options: { a: "Environ 1,3 × 10⁻³\u00a0mol·L⁻¹ : pH ≈ 2,9.", b: "0,1\u00a0mol·L⁻¹ : la dissociation est totale, pH = 1.", c: "1,75 × 10⁻⁶\u00a0mol·L⁻¹ : K° multiplié par la concentration.", d: "Environ 4,2 × 10⁻³\u00a0mol·L⁻¹ : la racine de K°." },
        hint: "h²/(c \u2212 h) = K°, avec h ≪ c.",
        why: "Avec h ≪ c, h ≈ √(K° c) = √(1,75 × 10⁻⁶) ≈ 1,32 × 10⁻³\u00a0mol·L⁻¹. L'hypothèse se vérifie : h/c ≈ 1,3\u00a0%. La force ionique vaut alors 1,3 × 10⁻³\u00a0mol·L⁻¹ : prendre a = c/c° fausse l'activité d'environ 4\u00a0%. Leçon « Activité, quotient de réaction et constante d'équilibre »." },
      perturbation: { prompt: "Un mélange de N₂O₄ et de NO₂ est à l'équilibre sous 1\u00a0bar. On ajoute de l'argon, la pression totale restant de 1\u00a0bar. Que se passe-t-il ?",
        options: { a: "Rien : l'argon ne réagit pas.", b: "Les pressions partielles baissent, Q passe sous K° : il se forme du NO₂.", c: "Q augmente : il se forme du N₂O₄.", d: "K° diminue, car le mélange est dilué." },
        why: "Q = p(NO₂)²/(p(N₂O₄) p°). Diluer par un gaz inerte à p fixée multiplie chaque pression partielle par le même facteur f < 1, et Q par f. Q < K° : la dissociation avance. K° ne dépend que de T. Leçon « Évolution spontanée d'un système chimique »." },
      dilution: { prompt: "Pour A + B ⇌ C en solution, K° = 10⁶, et l'on part de 10⁻²\u00a0mol·L⁻¹ de A et de B. Quelle part de A reste à l'équilibre ?",
        options: { a: "10⁻⁶ : la constante est très grande.", b: "Rien : la transformation est totale.", c: "Environ 1\u00a0% : 1/√(K° c₀/c°) = 1/√(10⁴).", d: "Environ 50\u00a0%, comme pour K° = 1." },
        why: "(1 \u2212 ρ)/(ρ² c₀/c°) = K° donne ρ ≈ 1/√(K° c₀/c°) = 10⁻² : c'est juste au seuil usuel de 1\u00a0%. À 10⁻⁴\u00a0mol·L⁻¹, il resterait 10\u00a0%. Leçon « Évolution spontanée d'un système chimique »." },
      rupture: { prompt: "Un carbonate se décompose selon MCO₃(s) ⇌ MO(s) + CO₂(g) ; à 1 000\u00a0K on suppose K° = 0,2. On chauffe 0,01\u00a0mol de MCO₃ dans un récipient vide de 10\u00a0L. Quel est l'état final ? On prendra RT ≈ 8,3\u00a0kJ·mol⁻¹.",
        options: { a: "Un équilibre, avec p(CO₂) = 0,2\u00a0bar.", b: "Un équilibre, avec p(CO₂) = 0,083\u00a0bar.", c: "Aucune décomposition, car K° < 1.", d: "Tout le carbonate se décompose : p(CO₂) ≈ 0,083\u00a0bar reste sous 0,2\u00a0bar, et l'état final n'est pas un équilibre." },
        hint: "Calculez la pression si tout le carbonate se décomposait, puis comparez-la à K° p°.",
        why: "Tout décomposé : p = nRT/V = 0,01 × 8 314/0,01 ≈ 8,3 × 10³\u00a0Pa = 0,083\u00a0bar. Q = 0,083 < K° = 0,2 : le système voudrait avancer, mais il n'a plus de solide. C'est une rupture d'équilibre. Avec 0,1\u00a0mol, il resterait du carbonate et p(CO₂) vaudrait 0,2\u00a0bar. Leçon « Évolution spontanée d'un système chimique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

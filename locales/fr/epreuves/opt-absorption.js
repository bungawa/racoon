/* Épreuve de l'étape « Absorption et écrans » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lame: { prompt: "Une lame de 1\u00a0cm transmet une fraction e⁻¹ ≈ 36,8\u00a0% de l’intensité d’une lumière de 589\u00a0nm, réflexions négligées. Que vaut la partie imaginaire n″ de son indice ?",
        options: { a: "4,7 × 10⁻⁶.", b: "9,4 × 10⁻⁶.", c: "2,3 × 10⁻⁶.", d: "1, puisque l’intensité est divisée par e." },
        hint: "αΔz = 1, et α = 2ωn″/c = 4πn″/λ.",
        why: "α = 1/Δz = 100\u00a0m⁻¹, donc n″ = αλ/(4π) = 100 × 589 × 10⁻⁹/(4π) ≈ 4,7 × 10⁻⁶. Oublier le facteur 2 entre amplitude et intensité donne 9,4 × 10⁻⁶. Leçon « L’absorption »." },
      loin: { prompt: "Un gaz dilué a une seule résonance, à la pulsation ω₀ = 3,2 × 10¹⁵\u00a0rad·s⁻¹, avec γ = 10⁸\u00a0s⁻¹. On l’éclaire à ω = ω₀/2. Que vaut à peu près n″/(n′ \u2212 1) ?",
        options: { a: "0,5.", b: "2 × 10⁻⁸.", c: "3 × 10⁻⁸, soit γ/ω₀.", d: "1, l’absorption et le retard étant toujours comparables." },
        why: "Par l’indice complexe de « L’absorption », n″/(n′ \u2212 1) = γω/(ω₀² \u2212 ω²) = (γω₀/2)/(3ω₀²/4) = 2γ/(3ω₀) ≈ 2 × 10⁻⁸. Loin de la résonance, la lumière est retardée sans être absorbée : c’est la transparence du verre dans le visible." },
      faible: { prompt: "Une raie d’absorption est faible : sa profondeur optique au centre vaut τ₀ = 0,01. On double le nombre d’atomes traversés. Que devient sa largeur équivalente ?",
        options: { a: "Elle croît d’environ 41\u00a0%.", b: "Elle ne change pas.", c: "Elle double.", d: "Elle quadruple." },
        why: "Pour une raie faible, chaque atome retire sa part de lumière sans que les autres le masquent : W ≈ (π/2)τ₀γ, proportionnelle au nombre d’atomes. La croissance en racine carrée ne vient qu’une fois le centre noir. Leçon « L’absorption »." },
      laser: { prompt: "Un pointeur laser de 1\u00a0mW éclaire uniformément 1\u00a0mm². Quelle est l’amplitude E₀ du champ électrique de l’onde ?",
        options: { a: "614\u00a0V·m⁻¹.", b: "1,2\u00a0kV·m⁻¹.", c: "27\u00a0V·m⁻¹.", d: "868\u00a0V·m⁻¹." },
        hint: "L’intensité vaut 1000\u00a0W·m⁻² ; pour une onde sinusoïdale, elle vaut ε₀cE₀²/2.",
        why: "E₀ = √(2S/(ε₀c)) = √(2 × 1000/2,654 × 10⁻³) ≈ 868\u00a0V·m⁻¹ ; 614\u00a0V·m⁻¹ est la valeur efficace, E₀/√2. Leçon « L’énergie transportée par une onde électrique »." },
      alpha: { prompt: "Dans le bilan d’énergie d’une lame mince, d’où vient la valeur ε₀c du coefficient qui relie l’intensité à la moyenne de E² ?",
        options: { a: "Du champ que rayonnent les atomes de la lame : il fixe le terme croisé, et seule cette valeur l’égale au travail reçu par les électrons.", b: "D’une mesure de l’intensité du Soleil.", c: "Du frottement γ des électrons, qui fixe l’énergie absorbée.", d: "De l’onde réfléchie, qui emporte l’énergie manquante." },
        why: "Le terme croisé vaut \u2212α NΔz q⟨Es v⟩/(ε₀c), le travail NΔz q⟨Es v⟩ : le bilan ne tient que pour α = ε₀c. Le frottement s’élimine, et l’onde réfléchie est du second ordre. Leçon « L’énergie transportée par une onde électrique »." },
      densite: { prompt: "Le bilan d’énergie au premier ordre d’une lame mince néglige certains termes. Lesquels ?",
        options: { a: "Le terme croisé 2α⟨EsEa⟩, petit devant α⟨Es²⟩.", b: "Le terme α⟨Ea²⟩ et l’onde réfléchie, tous deux proportionnels à (NΔz)².", c: "Le travail fourni aux électrons.", d: "Rien : le bilan est exact." },
        why: "On garde tout ce qui est proportionnel au nombre d’atomes par mètre carré, NΔz, et on néglige ce qui est en (NΔz)². Négliger le terme croisé reviendrait à oublier la lame. Leçon « L’énergie transportée par une onde électrique »." },
      bouchon: { prompt: "Un écran opaque est percé d’un trou de 5\u00a0mm, éclairé en lumière visible. Le champ en un point P derrière l’écran est, au signe près :",
        options: { a: "Nul, puisque l’écran est opaque.", b: "Le champ de la source seule, sans aucune modification.", c: "Le champ que rayonneraient, dans l’écran complet, les charges du bouchon qui fermerait le trou.", d: "Le champ des charges du bord du trou seulement." },
        why: "Écran percé : E_P = E_s + E_mur. Écran bouché : 0 = E_s + E′_mur + E′_bouchon. Pour un trou de milliers de longueurs d’onde, E_mur ≈ E′_mur, d’où E_P ≈ \u2212E′_bouchon. Leçon « Diffraction de la lumière par un écran »." },
      poisson: { prompt: "Un trou circulaire découvre N = 3 zones de Fresnel vu d’un point P de l’axe. On remplace l’écran percé par un disque opaque de même rayon. Quelles intensités trouve-t-on en P, rapportées à celle sans écran ?",
        options: { a: "4 derrière le trou, 0 derrière le disque.", b: "0 derrière le trou, 1 derrière le disque.", c: "4 derrière le trou, 4 derrière le disque.", d: "4 derrière le trou, 1 derrière le disque." },
        hint: "Le champ du disque est l’onde libre moins le champ du trou.",
        why: "Trou : |1 \u2212 e^(\u22123iπ)|² = 4. Disque, par le principe de Babinet : |e^(\u22123iπ)|² = 1. C’est la tache de Poisson, au centre de l’ombre. Leçon « Diffraction de la lumière par un écran »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

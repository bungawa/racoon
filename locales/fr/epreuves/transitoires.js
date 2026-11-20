/* Épreuve de l'étape « Amortissement et régimes transitoires » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      raie: { prompt: "Une raie d'absorption est centrée sur f₀ = 10\u00a0MHz ; sa largeur à mi-hauteur vaut 2\u00a0kHz. En combien de temps l'énergie de l'oscillateur libre décroît-elle d'un facteur e, et que vaut Q ?",
        options: { a: "τ ≈ 80\u00a0µs et Q = 5 000.", b: "τ = 0,5\u00a0ms et Q = 5 000.", c: "τ ≈ 80\u00a0µs et Q = 2 000.", d: "τ = 0,1\u00a0µs et Q = 5." },
        hint: "La largeur Δω vaut γ, et τ = 1/γ.",
        why: "Δω = 2π × 2\u00a0kHz = 1,26 × 10⁴ rad·s⁻¹ = γ, donc τ = 1/γ ≈ 80\u00a0µs. Q = f₀/Δf = 5 000 = ω₀τ. Leçon « La résonance dans la nature »." },
      largeur: { prompt: "La raie d'un cristal mesure trois fois la largeur 1/τ qu'on attend de l'amortissement de sa vibration. Quelle explication est possible ?",
        options: { a: "La réponse du cristal est parfaitement linéaire.", b: "Des régions du cristal, sous contrainte, ont des fréquences propres un peu différentes, ou la fente du spectromètre est trop large.", c: "L'amortissement est trois fois plus faible que prévu.", d: "La largeur d'une raie ne dépend jamais de l'amortissement." },
        why: "Un amortissement plus faible affinerait la raie. Des courbes étroites décalées et empilées, ou une fenêtre d'analyse trop large, élargissent la courbe mesurée : sa largeur n'est alors qu'un majorant de γ. Leçon « La résonance dans la nature »." },
      qenergie: { prompt: "En régime établi à la résonance, un oscillateur garde en moyenne 20\u00a0mJ et reçoit 0,4\u00a0mJ par période. Que vaut son facteur de qualité ?",
        options: { a: "50.", b: "8.", c: "Environ 314.", d: "0,02." },
        hint: "Q = 2π × énergie stockée / travail par période.",
        why: "(24.7) : Q = 2π × 20/0,4 = 2π × 50 ≈ 314. Sans le facteur 2π, on compare à l'énergie perdue par radian. Leçon « L'énergie d'un oscillateur »." },
      constante: { prompt: "Une boule sur un ressort, amortie, est forcée en régime établi. Pour quelle pulsation de la force son énergie stockée reste-t-elle constante au cours de la période ?",
        options: { a: "Pour toute pulsation : le régime est établi.", b: "Seulement à basse fréquence, quand la force varie lentement.", c: "Jamais : l'énergie cinétique s'annule deux fois par période.", d: "Seulement à ω₀ : cinétique et élastique s'échangent exactement, la force compense le frottement à chaque instant." },
        why: "Avec x = x₀ cos(ωt \u2212 φ), E = ¼ m x₀²[(ω² + ω₀²) + (ω₀² \u2212 ω²) cos 2(ωt \u2212 φ)] : l'ondulation s'annule seulement si ω = ω₀. En régime établi, c'est la moyenne de E qui est constante. Leçon « L'énergie d'un oscillateur »." },
      regime: { prompt: "Un oscillateur libre a ω₀ = 10\u00a0rad·s⁻¹ et γ = 15 s⁻¹. Comment revient-il à l'équilibre ?",
        options: { a: "En oscillant, avec une pseudo-période d'environ 0,95\u00a0s.", b: "Sans osciller : le régime est apériodique.", c: "Au régime critique.", d: "En oscillant à la période 2π/ω₀ = 0,63\u00a0s exactement." },
        hint: "Comparez γ/2 à ω₀.",
        why: "γ/2 = 7,5 s⁻¹ < ω₀ : Q = 0,67 > 1/2, régime pseudo-périodique. ω_γ = √(100 \u2212 56,25) = 6,6\u00a0rad·s⁻¹, pseudo-période 0,95\u00a0s, bien plus longue que T₀. Leçon « Les oscillations amorties »." },
      decrement: { prompt: "Deux maximums successifs d'une oscillation libre sont dans le rapport 0,8. Que vaut à peu près le facteur de qualité ?",
        options: { a: "0,8.", b: "Environ 14.", c: "Environ 4.", d: "Environ 30." },
        why: "Le décrément logarithmique vaut δ = ln(1/0,8) = 0,22 = π/(Q√(1 \u2212 1/4Q²)), soit Q ≈ π/δ ≈ 14 ; la correction en 1/(4Q²) est de 0,1\u00a0%. Leçon « Les oscillations amorties »." },
      joule: { prompt: "On charge un condensateur de 10\u00a0µF de 0 à 12\u00a0V par un échelon, à travers une bobine et une résistance. Quelle énergie la résistance dissipe-t-elle ?",
        options: { a: "Rien si la résistance est assez petite.", b: "1,44\u00a0mJ, toute l'énergie fournie.", c: "0,72\u00a0mJ, la moitié de l'énergie fournie, quelles que soient R et L.", d: "Cela dépend de R : il faut connaître sa valeur." },
        why: "Le générateur fournit E·Δq = C E² = 1,44\u00a0mJ ; le condensateur garde ½ C E² = 0,72\u00a0mJ ; la résistance prend le reste, 0,72\u00a0mJ, indépendamment de R et L. Leçon « Régimes transitoires électriques »." },
      critique: { prompt: "Un circuit RLC série a L = 20 mH et C = 50 nF. À partir de quelle résistance totale la réponse à un échelon cesse-t-elle d'osciller ?",
        options: { a: "632\u00a0Ω.", b: "316\u00a0Ω.", c: "20\u00a0Ω.", d: "Environ 1,26\u00a0kΩ." },
        hint: "Le seuil est Q = 1/2.",
        why: "R_c = 2√(L/C) = 2√(4 × 10⁵) Ω ≈ 1 265\u00a0Ω. √(L/C) = 632\u00a0Ω donnerait Q = 1. Leçon « Régimes transitoires électriques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

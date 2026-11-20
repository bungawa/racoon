/* Épreuve de l'étape « Amortissement par rayonnement » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      antenne: { prompt: "Un fil de 2\u00a0m, alimenté en son milieu, émet à 3\u00a0MHz (λ = 100\u00a0m). Quelle est sa résistance de rayonnement ?",
        options: { a: "Environ 79\u00a0mΩ.", b: "Environ 0,32\u00a0Ω.", c: "73\u00a0Ω, celle de tout dipôle.", d: "Environ 3,9\u00a0Ω." },
        hint: "L/λ = 0,02, et le courant d’un fil court alimenté au centre tombe à zéro aux bouts.",
        why: "Le fil est court : (π/6)Z₀(L/λ)² ≈ 197 × 0,02² ≈ 0,079\u00a0Ω. Un courant uniforme donnerait quatre fois plus, 0,32\u00a0Ω ; les 73\u00a0Ω ne valent qu’en demi-onde. Leçon « La résistance de rayonnement »." },
      rendement: { prompt: "Une antenne a une résistance de rayonnement de 0,08\u00a0Ω et une résistance de pertes de 0,12\u00a0Ω. L’émetteur lui fournit 500\u00a0W. Quelle puissance est rayonnée ?",
        options: { a: "300\u00a0W.", b: "200\u00a0W.", c: "500\u00a0W.", d: "80\u00a0W." },
        why: "Les deux résistances sont en série, parcourues par le même courant : la part rayonnée vaut 0,08/(0,08 + 0,12) = 40\u00a0%, soit 200\u00a0W. Les 300\u00a0W restants chauffent le cuivre. Leçon « La résistance de rayonnement »." },
      courant: { prompt: "On triple le courant dans une antenne, à fréquence fixe. Comment change la puissance qu’elle rayonne ?",
        options: { a: "Elle triple.", b: "Elle est multipliée par 6.", c: "Elle est multipliée par 9.", d: "Elle ne change pas : la résistance de rayonnement est fixée." },
        why: "Les champs sont proportionnels au courant, le flux (32.1) au carré du champ : P = R⟨I²⟩ est multipliée par 9. La résistance, elle, ne change pas. Leçon « La résistance de rayonnement »." },
      larmor: { prompt: "Un électron subit pendant un instant une accélération de 10¹⁸\u00a0m·s⁻², à vitesse faible devant c. Quelle puissance rayonne-t-il ?",
        options: { a: "Environ 2,9 × 10⁻¹⁸\u00a0W.", b: "Environ 5,7 × 10⁻³⁶\u00a0W.", c: "Environ 1,1 × 10⁻¹⁷\u00a0W.", d: "Environ 5,7 × 10⁻¹⁸\u00a0W." },
        hint: "(32.5), sans moyenne sur une période.",
        why: "q²a²/(6πε₀c³) = (1,60 × 10⁻¹⁹)² × 10³⁶/(6π × 8,85 × 10⁻¹² × 2,69 × 10²⁵) ≈ 5,7 × 10⁻¹⁸\u00a0W. La moitié de cette valeur serait la moyenne d’une oscillation d’accélération maximale 10¹⁸\u00a0m·s⁻², (32.6). Leçon « La puissance rayonnée »." },
      cones: { prompt: "Quelle part de la puissance d’une charge oscillante part à moins de 45° de l’axe de son accélération, des deux côtés ?",
        options: { a: "Environ 12\u00a0%.", b: "Environ 29\u00a0%, la part de la sphère que couvrent ces deux cônes.", c: "50\u00a0%.", d: "Rien du tout." },
        hint: "Le flux suit sin²θ : il est faible près de l’axe, sans y être nul partout.",
        why: "La bande à moins de 45° de l’équateur emporte (3/2)(sin 45° \u2212 sin³ 45°/3) ≈ 88\u00a0% de la puissance ; il reste 12\u00a0% pour les deux cônes, qui couvrent pourtant 29\u00a0% de la sphère. Le flux n’est nul que dans l’axe même. Leçon « La puissance rayonnée »." },
      qualite: { prompt: "Quel est le facteur de qualité d’un électron lié qui rayonne à 100\u00a0nm, dans l’ultraviolet, seul dans le vide ?",
        options: { a: "5 × 10⁷, celui de tout atome.", b: "Environ 8,5 × 10⁶.", c: "Environ 3 × 10⁸.", d: "Environ 1,4 × 10⁶." },
        why: "Q = 3λ/(4πr₀) = 3 × 10⁻⁷/(4π × 2,82 × 10⁻¹⁵) ≈ 8,5 × 10⁶ : Q est proportionnel à λ, et vaut 5 × 10⁷ seulement vers 589\u00a0nm. Leçon « L’amortissement par rayonnement »." },
      duree: { prompt: "Le modèle classique donne une durée de vie de 15,6\u00a0ns à un électron qui émet à 589\u00a0nm. Que donne-t-il à 1178\u00a0nm ?",
        options: { a: "15,6\u00a0ns : la durée ne dépend que de l’électron.", b: "31\u00a0ns.", c: "62\u00a0ns.", d: "7,8\u00a0ns." },
        hint: "La durée de vie vaut Q/ω₀.",
        why: "Q double avec λ, et ω₀ est divisée par 2 : τ = Q/ω₀ est multipliée par 4, soit 62\u00a0ns. γ = q²ω₀²/(6πε₀mc³) varie comme 1/λ². Leçon « L’amortissement par rayonnement »." },
      largeur: { prompt: "Quelle largeur naturelle Δλ le modèle classique donne-t-il à la raie Lyman α de l’hydrogène, à 121,6\u00a0nm ?",
        options: { a: "2,4 × 10⁻¹⁵\u00a0m, proportionnelle à λ.", b: "5,7 × 10⁻¹⁴\u00a0m.", c: "2,8 × 10⁻¹⁵\u00a0m, le rayon classique de l’électron.", d: "1,18 × 10⁻¹⁴\u00a0m, comme pour toute raie." },
        why: "Δλ = λ/Q = 4πr₀/3 : Q est proportionnel à λ, et λ disparaît. La raie est en revanche plus large en fréquence que celle du sodium, d’un facteur (589/121,6)² ≈ 23. Leçon « L’amortissement par rayonnement »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

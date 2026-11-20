/* Épreuve de l'étape « Lumière et solution générale des équations de Maxwell » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      retard: { prompt: "Une charge oscille à 300\u00a0m d'une antenne de réception. Le champ qui arrive sur l'antenne à l'instant t dépend de l'état de la charge à quel instant ?",
        options: { a: "À t \u2212 1\u00a0µs environ : le temps que met la lumière à parcourir la distance retardée de 300\u00a0m.", b: "À t, puisque le champ électrique est instantané.", c: "À t \u2212 1\u00a0s.", d: "À t + 1\u00a0µs." },
        hint: "c ≈ 3 × 10⁸\u00a0m·s⁻¹.",
        why: "300/(3 × 10⁸) = 10⁻⁶\u00a0s. Le champ de (21.1) se calcule avec la position et le mouvement de la charge à l'instant retardé t \u2212 r′/c. Leçon « La lumière et les ondes électromagnétiques »." },
      loin: { prompt: "Un électron oscille à 1\u00a0GHz (λ ≈ 30\u00a0cm). À 3\u00a0m de lui, sur la perpendiculaire à son mouvement, que vaut le deuxième terme de (21.1) devant le troisième ?",
        options: { a: "Il est du même ordre.", b: "Environ 1,6\u00a0% : le rapport vaut 1/(kr), et kr = 2π × 10 ≈ 63.", c: "Environ 2,5 × 10⁻⁴ : le rapport vaut 1/(kr)².", d: "Il est dix fois plus grand." },
        hint: "Pour un mouvement périodique, chaque terme vaut kr fois le précédent.",
        why: "kr = 2π r/λ ≈ 63. Le terme 2 vaut 1/(kr) ≈ 1,6\u00a0% du terme 3, le terme 1 en vaut 1/(kr)² ≈ 2,5 × 10⁻⁴ : à 10\u00a0λ, le champ est déjà presque tout rayonné. Leçon « La lumière et les ondes électromagnétiques »." },
      secteur: { prompt: "Des charges oscillent à 50\u00a0Hz dans un câble. À 1\u00a0m du câble, quelle forme de (21.1) suffit ?",
        options: { a: "Le seul terme en 1/r′ : c'est un champ rayonné.", b: "Aucune : (21.1) ne vaut qu'en haute fréquence.", c: "Le champ de Coulomb des positions actuelles : λ ≈ 6\u00a0000\u00a0km, kr ≈ 10⁻⁶, et les termes 1 et 2 s'en écartent de (kr)²/2 ≈ 5 × 10⁻¹³.", d: "Le Coulomb retardé seul, sans le deuxième terme." },
        why: "λ = c/f = 6 × 10⁶\u00a0m. Le retard est négligeable, le prolongement linéaire du terme 2 le compense presque exactement, et le terme 3 est (kr)² fois plus petit : le régime est quasi statique. Leçon « La lumière et les ondes électromagnétiques »." },
      gauss: { prompt: "Une charge concentrée varie sur τ = 10\u00a0ns. On mesure le flux de \u2212ε0∇φ à travers une sphère de 3\u00a0cm de rayon qui l'entoure. Que donne-t-il ?",
        options: { a: "La charge telle qu'elle était 10\u00a0ns plus tôt.", b: "Zéro, puisque la charge varie.", c: "La moitié de la charge.", d: "La charge actuelle à 10⁻⁴ près environ : R/(cτ) = 0,01, et le terme en temps de (21.7) intégré sur la boule est de l'ordre de (R/cτ)²." },
        hint: "cτ = 3\u00a0m.",
        why: "Le flux vaut \u2212S(t \u2212 R/c) \u2212 (R/c)Ṡ(t \u2212 R/c) : ses deux écarts à \u2212S(t) se compensent au premier ordre, il reste un terme en (R/cτ)². Le théorème de Gauss vaut pour une sphère petite devant cτ. Leçon « Ondes sphériques d'une source ponctuelle »." },
      centre: { prompt: "ψ = f(t \u2212 r/c)/r résout l'équation d'onde sans source pour r > 0. Quelle source faut-il placer à l'origine pour qu'elle résolve ∇²ψ \u2212 (1/c²)∂²ψ/∂t² = \u2212s partout ?",
        options: { a: "Une source ponctuelle d'intensité totale S(t) = 4π f(t).", b: "Aucune : l'onde se crée seule.", c: "Une source d'intensité f(t \u2212 r/c).", d: "Une source répartie sur toute la sphère de rayon ct." },
        why: "Près de l'origine, ψ ≈ f(t)/r est un potentiel de Coulomb, et ∇²ψ = \u2212s avec ∫s dV = 4π f. Le terme en temps y est négligeable, ses dérivées ne croissant qu'en 1/r. Leçon « Ondes sphériques d'une source ponctuelle »." },
      axe: { prompt: "Une antenne droite de 50\u00a0cm, à courant uniforme, rayonne à 300\u00a0MHz (λ = 1\u00a0m). Loin d'elle, sur son axe, que vaut son potentiel vecteur rapporté à celui d'une source ponctuelle de même courant ?",
        options: { a: "1 : elle est petite.", b: "Environ 0,64 : X = π L/λ = π/2, et sin X/X = 2/π.", c: "Zéro : les contributions s'annulent.", d: "2 : les contributions s'ajoutent." },
        hint: "X = π L cos θ/λ, θ = 0 sur l'axe.",
        why: "Sur l'axe, les retards s'étalent sur une demi-période d'un bout à l'autre : les contributions ne sont pas en phase, sans encore s'annuler. Il faut L = λ pour un zéro. Leçon « Solution générale des équations de Maxwell »." },
      lorenz: { prompt: "On calcule φ par (21.15) et A par (21.16) pour un courant qui circule dans un fil droit, sans tenir compte des charges qui s'accumulent à ses bouts. Que devient la condition de Lorenz (21.6) ?",
        options: { a: "Elle reste vraie : elle ne dépend que de A.", b: "Elle reste vraie loin du fil.", c: "Elle est fausse : elle traduit la conservation de la charge, et un courant qui s'arrête au bout d'un fil sans y déposer de charge la viole.", d: "Elle est vraie si le courant est sinusoïdal." },
        why: "(21.6) équivaut, pour les potentiels retardés, à ∂ρ/∂t + ∇·j = 0. Avec les charges ±(I0/ω) sin ωt aux bouts, le résidu calculé est inférieur à 10⁻⁴ ; sans elles, il vaut tout le terme. Leçon « Solution générale des équations de Maxwell »." },
      diagramme: { prompt: "Qu'est-ce qui donne à une antenne longue de plusieurs longueurs d'onde un diagramme de rayonnement, avec des directions privilégiées ?",
        options: { a: "Le retard commun r/c entre l'antenne et l'observateur.", b: "La décroissance en 1/r du potentiel.", c: "La valeur du courant.", d: "L'écart des retards d'un élément à l'autre, kL cos θ : sans retard, la somme vaudrait la même chose dans toutes les directions." },
        why: "Le retard commun ne change que la phase globale. Ce sont les différences de chemin entre éléments, rapportées à λ, qui font interférer les contributions. Leçon « Solution générale des équations de Maxwell »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Les niveaux de l'atome d'hydrogène » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      helium: { prompt: "Quelle énergie faut-il pour arracher l'électron de l'ion He⁺ dans son état fondamental, dans le modèle de Schrödinger à noyau fixe ?",
        options: { a: "13,6 eV.", b: "27,2 eV.", c: "54,4 eV : E_R Z², avec Z = 2.", d: "6,8 eV." },
        why: "Une charge Z q_e multiplie l'énergie de Rydberg par Z² et divise le rayon par Z : 4 × 13,6 ≈ 54,4 eV. Leçon « L'équation de Schrödinger de l'atome d'hydrogène »." },
      masse: { prompt: "La raie Lyman α de l'hydrogène vaut 121,50 nm pour un proton infiniment lourd. Que donne la masse réduite ?",
        options: { a: "121,57 nm : E_R diminue de m_e/m_p ≈ 5,4 × 10⁻⁴, la longueur d'onde augmente d'autant.", b: "121,43 nm.", c: "Rien : la masse du proton n'entre pas dans les niveaux.", d: "243 nm, puisque deux corps bougent." },
        why: "μ = m_e m_p/(m_e + m_p) : E_R est multipliée par 1/(1 + m_e/m_p). La valeur mesurée, 121,567 nm, confirme la correction ; il reste la structure fine, de l'ordre de 5 × 10⁻⁶. Leçon « L'équation de Schrödinger de l'atome d'hydrogène »." },
      serie: { prompt: "Dans la résolution des états s par la série (19.22), que se passe-t-il pour α = 0,4 ?",
        options: { a: "La série s'arrête à k = 2.", b: "Elle ne s'arrête pas : αk \u2212 1 ne s'annule pour aucun entier, ψ diverge comme e^(+0,4ρ) ; ε = \u22120,16 n'est pas un niveau.", c: "On obtient le niveau n = 2,5.", d: "La série converge vers zéro." },
        hint: "Pour quels α le facteur αk \u2212 1 s'annule-t-il ?",
        why: "Il faudrait α = 1/n : 0,4 tombe entre 1/2 et 1/3. Les coefficients finissent par croître comme ceux de e^(2αρ). Leçon « Les solutions à symétrie sphérique »." },
      niveaux: { prompt: "Quelle longueur d'onde a la raie émise entre les niveaux n = 4 et n = 2 de l'hydrogène ?",
        options: { a: "656 nm.", b: "122 nm.", c: "1 875 nm.", d: "486 nm : ΔE = 13,6 (1/4 \u2212 1/16) ≈ 2,55 eV." },
        hint: "λ ≈ 1 240 nm·eV / ΔE.",
        why: "ΔE = 13,6 × 3/16 ≈ 2,55 eV, λ ≈ 1 240/2,55 ≈ 486 nm : la raie bleu-vert Balmer β. Leçon « Les solutions à symétrie sphérique »." },
      noyau: { prompt: "Pourquoi les niveaux s de l'hydrogène dépendent-ils un peu de la taille du proton ?",
        options: { a: "Parce que les états s ont une densité non nulle au centre : l'électron passe une fraction de l'ordre de (r_p/r_B)³ ≈ 4 × 10⁻¹⁵ de son temps dans le proton.", b: "Parce que les états s sont plus gros.", c: "Parce qu'ils ont un moment cinétique.", d: "Ils n'en dépendent pas." },
        why: "ψ_s(0) ≠ 0, alors que les états l ≥ 1 s'annulent au centre. L'effet est minuscule pour l'électron ; un muon, plus lourd et plus proche, l'amplifie, ce qui a permis la mesure de 2010. Leçon « Les solutions à symétrie sphérique »." },
      angle: { prompt: "Un électron est dans l'état p de m = 0 selon z. Quelle est la densité dans le plan xy, rapportée à celle le long de z ?",
        options: { a: "La même.", b: "Nulle : |Y₁₀|² ∝ cos²θ, et θ = 90° dans le plan xy.", c: "La moitié.", d: "Le double." },
        why: "(19.36) : l'amplitude angulaire est cos θ. Le plan xy est un plan nodal de l'état p_z. Leçon « Les états à dépendance angulaire »." },
      etats: { prompt: "Pour n = 3, combien d'états de l'hydrogène ont la même énergie, sans compter le spin ?",
        options: { a: "3.", b: "6.", c: "9 : l = 0, 1, 2 donnent 1 + 3 + 5 états, tous à \u2212E_R/9 dans ce modèle.", d: "5." },
        why: "Pour un n donné, l va de 0 à n \u2212 1, et chaque l a 2l + 1 états : n² en tout. Que les états de l différents aient la même énergie est propre au potentiel en 1/r. Leçons « Les états à dépendance angulaire » et « Les solutions à symétrie sphérique »." },
      parite: { prompt: "Une transition dipolaire électrique change la parité. Entre quels états de l'hydrogène peut-elle se faire ?",
        options: { a: "Entre deux états s.", b: "Entre deux états de même l.", c: "Entre deux états de même parité.", d: "Entre un état s et un état p, par exemple : la parité (\u22121)^l change quand l change d'une unité." },
        why: "La parité d'un état de moment orbital l vaut (\u22121)^l. Un photon dipolaire emporte un moment cinétique 1 et change la parité : Δl = ±1. Leçon « Les états à dépendance angulaire »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

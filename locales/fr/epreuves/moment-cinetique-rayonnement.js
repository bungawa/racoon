/* Épreuve de l'étape « Rayonnement et positronium » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      haut: { prompt: "Un atome de spin 1, m = \u22121, se désexcite vers un état de spin 0. Quelle polarisation a le photon émis le long de +z ?",
        options: { a: "Circulaire droite.", b: "Circulaire gauche : il doit emporter \u2212ħ selon z, sa direction de propagation.", c: "Linéaire.", d: "Aucun photon ne part le long de +z." },
        why: "Vers +z, la composante J_z du photon est son hélicité : il faut \u2212ħ, donc un photon gauche. Vers \u2212z, ce serait un photon droit. C'est le miroir de la leçon « Le rayonnement dipolaire électrique quantique »." },
      angle: { prompt: "Pour la transition m = +1 → 0, quelle fraction de la lumière émise à θ = 120° est polarisée circulairement à droite ?",
        options: { a: "La moitié.", b: "Les trois quarts.", c: "Un dixième : (1 + cos θ)²/4 = 0,0625 contre (1 \u2212 cos θ)²/4 = 0,5625.", d: "Aucune : au-delà de 90°, tout est gauche." },
        hint: "cos 120° = \u22120,5.",
        why: "IR = (1 \u2212 0,5)²/4 = 0,0625 ; IL = (1 + 0,5)²/4 = 0,5625. La part droite vaut 0,0625/0,625 = 10 %. Leçon « Le rayonnement dipolaire électrique quantique »." },
      diffusion: { prompt: "Une lumière polarisée selon x arrive le long de z sur un atome de spin 0. On observe dans le plan xz à 60°. Quelle intensité, rapportée à la diffusion vers l'avant ?",
        options: { a: "1/4, soit cos²60°, et polarisée selon x′.", b: "1, la diffusion est isotrope.", c: "1/2.", d: "3/4, soit sin²60°." },
        why: "(18.17) : l'amplitude vaut ac cos θ, l'intensité cos²θ = 0,25, et (18.18) dit que la polarisation reste dans le plan. Leçon « La diffusion de la lumière par un atome »." },
      ciel: { prompt: "On regarde le ciel à 90° du Soleil. Pourquoi un filtre polariseur bien orienté l'assombrit-il fortement ?",
        options: { a: "Parce que le filtre absorbe le bleu.", b: "Parce que la lumière du ciel y est presque totalement polarisée linéairement, perpendiculairement au plan Soleil-molécule-œil.", c: "Parce que la lumière y est polarisée circulairement.", d: "Parce que l'air absorbe la lumière polarisée." },
        why: "À 90°, seule la composante incidente perpendiculaire au plan de diffusion est diffusée : le taux de polarisation sin²θ/(1 + cos²θ) vaut 1. Les diffusions multiples l'abaissent un peu. Leçon « La diffusion de la lumière par un atome »." },
      positronium: { prompt: "On place deux polariseurs linéaires parallèles sur les deux photons d'annihilation d'un positronium de spin 0. Quelle fraction des paires donne une coïncidence ?",
        options: { a: "1/4, comme pour des photons indépendants.", b: "1/2.", c: "1, les photons sont identiques.", d: "0 : l'état (18.19) donne des polarisations toujours perpendiculaires." },
        why: "P = sin²(φ₁ \u2212 φ₂)/2 = 0 pour des polariseurs parallèles. Des photons non corrélés donneraient 1/4. Leçon « L'annihilation du positronium »." },
      trois: { prompt: "Pourquoi le positronium de spin 1 vit-il environ mille fois plus longtemps que celui de spin 0 ?",
        options: { a: "Parce que deux photons ne peuvent pas former un état de spin 1 : il doit en émettre trois, un processus beaucoup moins probable.", b: "Parce qu'il est plus lié.", c: "Parce que son positon est plus lourd.", d: "Parce que ses photons ont moins d'énergie." },
        why: "Les symétries interdisent la voie à deux photons ; la voie à trois a un taux plus petit, d'un facteur de l'ordre de la constante de structure fine, 1/137, fois un facteur numérique voisin de 1/10. 142 ns contre 0,12 ns dans le vide. Leçon « L'annihilation du positronium »." },
      legendre: { prompt: "Un noyau de spin 2 est dans l'état m = 0 selon z. Quelle est la probabilité de le trouver dans l'état m′ = 0 selon un axe incliné de 90° ?",
        options: { a: "1/2.", b: "0.", c: "1/4, soit [P₂(0)]² = (\u22121/2)².", d: "1." },
        why: "(18.36) : l'amplitude est P₂(cos 90°) = \u22121/2, la probabilité 1/4. Leçon « La matrice de rotation d'un spin quelconque »." },
      tour: { prompt: "Un état de spin j subit une rotation de 360°. Que devient-il ?",
        options: { a: "Il revient toujours à lui-même.", b: "Il devient |j, \u2212m⟩.", c: "Il est multiplié par e^(imπ).", d: "Il est multiplié par (\u22121)^(2j) : inchangé pour un spin entier, opposé pour un spin demi-entier." },
        why: "Vu comme 2j spins 1/2, chacun prend un signe \u2212 en un tour : (\u22121)^(2j). C'est ce qui distingue fermions et bosons sous les rotations. Leçon « La matrice de rotation d'un spin quelconque »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Irréversibilité » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      uneTemperature: { prompt: "Une roue à rochet et ses ailettes baignent dans le même gaz à 300 K. Les dents, très asymétriques, ont une hauteur ε = 3 kT. Sur un grand nombre de pas, que vaut le rapport du nombre de pas en avant au nombre de pas en arrière ?",
        options: { a: "e³ ≈ 20 : la pente douce favorise l'avant.", b: "1 : les deux sens demandent de franchir la même hauteur ε, et à une seule température chaque transition est aussi fréquente que son inverse.", c: "e⁻³ ≈ 0,05 : la pente raide favorise l'arrière.", d: "Il dépend de l'asymétrie des dents." },
        hint: "Que fournit la fluctuation qui fait reculer la roue ?",
        why: "En avant, les ailettes doivent fournir ε pour monter le cliquet ; en arrière, le cliquet se soulève de lui-même avec la même énergie ε. À la même température, les deux fréquences valent (1/τ)e^(\u2212ε/kT). La forme des dents ne compte pas : la répartition d'équilibre de Boltzmann ne porte aucun courant. Leçon « Fonctionnement d'un cliquet »." },
      arret: { prompt: "Les ailettes sont à 450 K, le cliquet à 300 K, les dents ont une hauteur ε = 6 kT₂ (T₂ = 300 K). Pour quelle charge Lθ la roue s'arrête-t-elle ?",
        options: { a: "3 kT₂ : (ε + Lθ)/T₁ = ε/T₂ donne Lθ = ε(T₁/T₂ \u2212 1).", b: "6 kT₂.", c: "9 kT₂.", d: "Elle ne s'arrête jamais : la roue chaude tourne toujours." },
        hint: "Égalez les exposants des fréquences en avant et en arrière.",
        why: "(6 kT₂ + Lθ)/450 = 6 kT₂/300 donne Lθ = 6 kT₂ × 0,5 = 3 kT₂. Plus léger, le poids monte ; plus lourd, il descend. Leçon « Le cliquet comme moteur »." },
      rendement: { prompt: "Même moteur (450 K, 300 K, ε = 6 kT₂), chargé à Lθ = 2 kT₂. Quelle fraction de la chaleur prise au gaz chaud devient travail ?",
        options: { a: "33 %, le rendement de Carnot.", b: "2/6 = 33 %.", c: "Lθ/(Lθ + ε) = 2/8 = 25 %, moins que Carnot (33 %) : la roue tourne avec une puissance finie.", d: "100 % : chaque pas monte le poids." },
        hint: "Chaque pas en avant prend ε + Lθ aux ailettes et fournit Lθ au poids.",
        why: "Par pas : travail Lθ, chaleur prise ε + Lθ, d'où 2/8 = 25 %. Carnot, 1 \u2212 300/450 = 33 %, n'est atteint qu'à la charge d'arrêt, où la roue ne tourne plus. Leçons « Le cliquet comme moteur » et « Température thermodynamique »." },
      redresseur: { prompt: "Tout le dispositif est à la même température T, avec ε = 4 kT. On pousse la roue vers l'avant avec un couple tel que Lθ = \u22122 kT, puis on la tire vers l'arrière avec Lθ = +2 kT. Combien de fois sa vitesse est-elle plus grande, en valeur absolue, dans le premier cas ?",
        options: { a: "1 : le cliquet répond de la même façon dans les deux sens.", b: "2.", c: "e⁻² ≈ 0,14.", d: "e² ≈ 7,4 : (e² \u2212 1)/(1 \u2212 e⁻²) d'après (46.1)." },
        hint: "(46.1) : ω ∝ e^(\u2212Lθ/kT) \u2212 1.",
        why: "Pour Lθ = \u22122 kT, e² \u2212 1 = 6,39 ; pour Lθ = +2 kT, |e⁻² \u2212 1| = 0,865. Le rapport vaut e² ≈ 7,4 : la réponse est dissymétrique, comme celle d'une diode. Leçon « Le cliquet comme moteur »." },
      precision: { prompt: "Dans un gaz de disques, les écarts croissent comme e^(λt) avec λ ≈ 3 par unité de temps. En nombres à 10⁻¹⁶ près, le retour après renversement des vitesses échoue au-delà de 12 unités environ. Jusqu'où irait-on avec une précision de 10⁻³² ?",
        options: { a: "Indéfiniment : la précision suffit à tout.", b: "Jusqu'à 12 unités, comme avant.", c: "Jusqu'à 144 unités, le carré.", d: "Jusqu'à 24 unités environ : doubler le nombre de chiffres ne fait que doubler la durée." },
        hint: "La durée est ln(σ/δ₀)/λ.",
        why: "ln(10¹⁶)/3 ≈ 12 et ln(10³²)/3 ≈ 25 : la durée ne croît que comme le logarithme de la précision. Seul un calcul exactement réversible, en entiers, revient après n'importe quelle durée, et un seul pas de grille d'écart suffit à le perdre. Leçon « Réversibilité en mécanique »." },
      melange: { prompt: "Une mole de néon et une mole d'argon, à la même température et à la même pression, se mélangent quand on retire la cloison qui les sépare. De combien l'entropie augmente-t-elle ?",
        options: { a: "2R ln 2 ≈ 11,5 J·K⁻¹ : chaque gaz double son volume.", b: "R ln 2 ≈ 5,8 J·K⁻¹.", c: "Zéro : la température et l'énergie ne changent pas.", d: "2R ≈ 16,6 J·K⁻¹." },
        hint: "Imaginez deux pistons semi-perméables : chaque gaz se détend de V à 2V.",
        why: "Chaque mole gagne R ln 2 en doublant son volume à température constante ; deux moles, 2R ln 2 = 11,5 J·K⁻¹, soit k ln 2 par atome. Avec deux moles d'argon, l'entropie ne changerait pas. Leçon « Irréversibilité »." },
      kac: { prompt: "Dans les urnes d'Ehrenfest, avec 20 billes, combien de pas faut-il attendre en moyenne pour revoir toutes les billes à gauche ?",
        options: { a: "20 pas.", b: "2²⁰ ≈ 1,05 × 10⁶ pas : l'inverse de la probabilité 2⁻²⁰ de cet état.", c: "400 pas.", d: "Jamais : le retour est interdit." },
        hint: "Théorème de Kac : le retour moyen est l'inverse de la probabilité d'équilibre de l'état.",
        why: "À l'équilibre, chaque bille est à gauche avec la probabilité 1/2 : l'état « toutes à gauche » a la probabilité 2⁻²⁰. Le retour moyen vaut 2²⁰ ≈ 10⁶ pas. Il n'est pas interdit, il devient seulement exponentiellement rare. Leçon « Ordre et entropie »." },
      landauer: { prompt: "On efface une mémoire d'un milliard de bits à 300 K. Quelle est la chaleur minimale dégagée ?",
        options: { a: "Zéro, si l'effacement est assez lent.", b: "4,1 × 10⁻¹² J : un kT par bit.", c: "2,9 × 10⁻¹² J : kT ln 2 = 2,87 × 10⁻²¹ J par bit.", d: "1 J." },
        hint: "Effacer un bit fait passer deux états possibles à un seul : l'entropie de la mémoire baisse de k ln 2.",
        why: "10⁹ × 1,38 × 10⁻²³ × 300 × 0,693 = 2,9 × 10⁻¹² J. Un effacement lent s'approche de cette borne, sans la franchir : c'est ce qu'ont mesuré Bérut et ses collaborateurs en 2012. Leçon « Ordre et entropie »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Contact entre solides » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      roue: { prompt: "Une roue de 0,35 m de rayon roule sans glisser ; son centre avance à 7\u00a0m·s⁻¹. Quelles sont sa vitesse angulaire et la vitesse du point le plus haut de la roue ?",
        options: { a: "20\u00a0rad·s⁻¹ et 7\u00a0m·s⁻¹.", b: "20\u00a0rad·s⁻¹ et 14\u00a0m·s⁻¹.", c: "2,45\u00a0rad·s⁻¹ et 14\u00a0m·s⁻¹.", d: "40\u00a0rad·s⁻¹ et 0." },
        hint: "Rouler sans glisser : v = R ω ; puis le champ des vitesses d'un solide.",
        why: "v_g = v \u2212 R ω = 0 donne ω = 7/0,35 = 20\u00a0rad·s⁻¹. Au sommet, la rotation s'ajoute à la translation : v + R ω = 14\u00a0m·s⁻¹, par la composition des vitesses du solide (leçon « Glissement et roulement »)." },
      lancer: { prompt: "Une boule pleine est lancée sans rotation à 3,5\u00a0m·s⁻¹ sur un tapis, μ = 0,2. Au bout de combien de temps roule-t-elle, et à quelle vitesse ?",
        options: { a: "0,51\u00a0s, à 2,5\u00a0m·s⁻¹.", b: "1,78\u00a0s, à l'arrêt : le frottement l'a freinée jusqu'à zéro.", c: "0,51\u00a0s, toujours à 3,5\u00a0m·s⁻¹.", d: "0,36\u00a0s, à 2,5\u00a0m·s⁻¹." },
        hint: "La vitesse de glissement décroît à μ g (1 + 1/k).",
        why: "La fin du glissement, t* = 2 v₀/(7 μ g) = 7/(7 × 0,2 × 9,81) = 0,51\u00a0s. La vitesse finale, v_f = 5 v₀/7 = 2,5\u00a0m·s⁻¹, indépendamment de μ (leçon « Glissement et roulement »). 1,78\u00a0s serait l'arrêt d'un bloc qui glisse, v₀/(μ g)." },
      poussee: { prompt: "On pousse un bloc de 10\u00a0kg posé sur un sol horizontal (μs = 0,4) avec une force inclinée de 30° sur la verticale, vers le sol. Quelle force faut-il pour le faire glisser ?",
        options: { a: "39 N, soit μs m g.", b: "78 N.", c: "255 N.", d: "Aucune : la poussée est dans le cône de frottement." },
        hint: "tan 30° = 0,58 est-il plus petit que μs ?",
        why: "tan 30° = 0,58 > 0,4 : pas d'arc-boutement. Le seuil de glissement donne F = μs m g/(sin 30° \u2212 μs cos 30°) = 0,4 × 98,1/(0,5 \u2212 0,346) = 255 N. La composante verticale de la poussée appuie le bloc au sol et augmente d'autant le frottement disponible (leçon « Lois de Coulomb du frottement de glissement »)." },
      adherence: { prompt: "Une caisse de 50\u00a0kg est tirée horizontalement par une force de 150 N sur un sol où μs = 0,4 et μd = 0,3. Que vaut la force de frottement ?",
        options: { a: "196 N, soit μs m g.", b: "147 N, soit μd m g.", c: "0 : la caisse ne bouge pas.", d: "150 N." },
        hint: "Supposez l'adhérence, puis vérifiez.",
        why: "En adhérence, R_T compense la traction : 150 N. La vérification donne 150 ≤ μs m g = 196 N : l'hypothèse tient, la caisse reste immobile. μs m g n'est qu'un maximum (leçon « Lois de Coulomb du frottement de glissement »)." },
      puissance: { prompt: "La même caisse de 50\u00a0kg glisse à 2\u00a0m·s⁻¹ sur le sol (μd = 0,3). Quelle puissance le contact dissipe-t-il ?",
        options: { a: "0\u00a0W : le sol est fixe, il ne reçoit aucune puissance.", b: "294\u00a0W.", c: "147\u00a0W.", d: "981\u00a0W." },
        hint: "Force de frottement μd m g, multipliée par la vitesse de glissement.",
        why: "La paire de forces de contact a pour puissance \u2212μd R_N ‖v_g‖ = \u22120,3 × 491 × 2 = \u2212294\u00a0W. Elle ne dépend que de la vitesse de glissement, pas du référentiel ; la puissance reçue par le sol fixe est nulle, mais la paire, elle, ne l'est pas (leçon « Puissance des actions de contact et liaisons »)." },
      cylindre: { prompt: "Un cylindre plein (J = m R²/2) est posé sur une pente, μs = 0,2. Jusqu'à quelle inclinaison peut-il rouler sans glisser ?",
        options: { a: "11,3°, comme un bloc.", b: "19,3°.", c: "31,0°.", d: "À toute inclinaison : un solide qui roule ne glisse jamais." },
        hint: "L'énergie cinétique d'un solide qui roule, avec k = 1/2.",
        why: "tan θ ≤ (1 + k) μs/k = 3 × 0,2 = 0,6, soit 31,0°. Le roulement ne demande au sol qu'un tiers de la composante du poids le long de la pente : l'angle limite dépasse largement celui d'un bloc, arctan 0,2 = 11,3° (leçon « Puissance des actions de contact et liaisons »)." },
      regle: { prompt: "Une règle homogène de 60\u00a0cm est suspendue par une de ses extrémités à un pivot parfait. Période des petites oscillations ?",
        options: { a: "1,27\u00a0s.", b: "1,55\u00a0s, comme un pendule simple de 60\u00a0cm.", c: "1,10\u00a0s, comme un pendule simple de 30\u00a0cm.", d: "0,90\u00a0s." },
        hint: "J = m L²/3 autour du bout, d = L/2.",
        why: "La période des petites oscillations, T₀ = 2π √(J/(m g d)) = 2π √(2L/(3g)) = 2π √(0,4/9,81) = 1,27\u00a0s. La longueur équivalente est 2L/3 = 40\u00a0cm, ni L ni L/2 (leçon « Solide en rotation autour d'un axe fixe »)." },
      pivot: { prompt: "Un pendule pesant a un pivot qui frotte : ε = Γ/(m g d) = 0,005. Lâché à 10°, combien de demi-oscillations fait-il, environ, avant de s'arrêter ?",
        options: { a: "4.", b: "Une infinité : l'amplitude décroît en exponentielle.", c: "9.", d: "17." },
        hint: "L'amplitude perd 2ε radian par demi-oscillation.",
        why: "10° = 0,175 rad ; chaque demi-oscillation en retire 2ε = 0,01 rad, d'où environ 17 demi-oscillations. Le frottement sec arrête le pendule en un temps fini, contrairement à un frottement visqueux (leçon « Solide en rotation autour d'un axe fixe »)." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

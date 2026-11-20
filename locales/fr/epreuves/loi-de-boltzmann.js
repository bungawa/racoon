/* Épreuve de l'étape « La loi de Boltzmann » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      echelle: { prompt: "Dans une colonne isotherme à 250 K, la densité du diazote (28 g·mol⁻¹) est divisée par e tous les 7,6 km. Sur quelle hauteur celle de l'hélium (4 g·mol⁻¹) l'est-elle, dans la même colonne ?",
        options: { a: "7,6 km : la température est la même.", b: "1,1 km : sept fois moins.", c: "53 km : sept fois plus.", d: "20 km : √7 fois plus." },
        hint: "H = RT/(Mg).",
        why: "La hauteur d'échelle est inversement proportionnelle à la masse molaire : 7,6 × 28/4 ≈ 53 km. Plus une molécule est légère, plus l'agitation la porte haut. Leçon « L'atmosphère exponentielle »." },
      brassage: { prompt: "Une sonde mesure 20,9 % de dioxygène à 50 km d'altitude, comme au sol. Que conclure sur (40.1) ?",
        options: { a: "Rien contre elle : sous 90 km environ, le brassage turbulent est plus rapide que le tri par diffusion, et l'air n'est pas dans l'équilibre que décrit (40.1).", b: "Qu'elle est fausse : le dioxygène devrait avoir disparu.", c: "Que le dioxygène et le diazote ont la même masse.", d: "Que la température y est uniforme." },
        why: "(40.1) décrit l'équilibre d'un gaz que rien ne brasse. Chaque gaz n'y suit sa propre exponentielle qu'au-dessus de l'homopause. Leçon « L'atmosphère exponentielle »." },
      rapport: { prompt: "Deux régions d'un gaz en équilibre à la température T diffèrent de 3k_BT par l'énergie potentielle d'une molécule. Quel est le rapport des densités ?",
        options: { a: "3, en faveur de la région la plus haute en énergie.", b: "1 : l'agitation égalise tout.", c: "3, en faveur de la région la plus basse en énergie.", d: "e³ ≈ 20, en faveur de la région la plus basse en énergie." },
        why: "(40.3) : n₁/n₂ = e^(\u2212(E₁ \u2212 E₂)/k_BT) = e³ si E₁ \u2212 E₂ = \u22123k_BT. Leçon « La loi de Boltzmann »." },
      piege: { prompt: "Des particules en équilibre à 300 K se répartissent selon n ∝ e^(\u2212x²/2s²) avec s = 1 µm. Quelle force s'exerce sur une particule en x = 1 µm ?",
        options: { a: "Aucune : la répartition vient du hasard.", b: "Environ 4,1 × 10⁻¹⁵ N vers x = 0 : celle d'un ressort de raideur k_BT/s².", c: "Environ 4,1 × 10⁻²¹ N vers x = 0.", d: "Environ 4,1 × 10⁻¹⁵ N vers les x croissants." },
        hint: "(40.2) : F = k_BT d(ln n)/dx.",
        why: "d(ln n)/dx = \u2212x/s², donc F = \u2212(k_BT/s²)x : un ressort de raideur 4,1 × 10⁻⁹ N·m⁻¹. En x = 1 µm, F ≈ \u22124,1 × 10⁻¹⁵ N. Leçon « La loi de Boltzmann »." },
      boucle: { prompt: "Un champ de forces fait tourner les molécules : sa circulation sur un cercle n'est pas nulle. Quelle densité d'équilibre la loi de Boltzmann prévoit-elle ?",
        options: { a: "Aucune : il n'y a pas d'énergie potentielle, et pas d'équilibre thermique ; le champ fournit de l'énergie à chaque tour.", b: "Une densité uniforme.", c: "e^(\u2212F r/k_BT).", d: "Une densité plus grande au centre." },
        why: "ln n devrait varier de ∮F·dl/k_BT sur un tour et pourtant revenir à sa valeur. (40.3) n'existe que pour une force qui dérive d'une énergie potentielle. Leçon « La loi de Boltzmann »." },
      centrifugeuse: { prompt: "Une centrifugeuse dont la paroi va à 400 m·s⁻¹ contient de l'hexafluorure d'uranium à 300 K. Les deux isotopes diffèrent de 3 g·mol⁻¹. De combien le rapport isotopique change-t-il entre l'axe et la paroi ?",
        options: { a: "D'un facteur 1,6 × 10¹⁰.", b: "De rien : les deux molécules ont la même vitesse.", c: "D'un facteur 3.", d: "D'environ 10 % : α = e^(ΔM v²/2RT) ≈ 1,10." },
        hint: "Seule la différence des masses compte dans le rapport.",
        why: "0,003 × 400²/(2 × 8,31 × 300) ≈ 0,096, e^0,096 ≈ 1,10. Le gaz lui-même est très comprimé vers la paroi ; le rapport isotopique, lui, change peu. Leçon « La loi de Boltzmann »." },
      paire: { prompt: "Deux atomes d'argon, ε/k_B = 120 K, à 60 K. Combien de fois la seconde est-elle plus probable par unité de volume au fond du puits, en r₀, que très loin ?",
        options: { a: "2 fois : ε/k_BT.", b: "Environ 7 fois : e^(ε/k_BT) = e².", c: "120 fois.", d: "Autant : l'agitation domine." },
        why: "La probabilité par unité de volume est e^(\u2212V/k_BT), V(r₀) = \u2212ε. À 60 K, e² ≈ 7,4 ; à 30 K, e⁴ ≈ 55 : c'est la condensation. Leçon « Évaporation d'un liquide »." },
      vapeur: { prompt: "Pour l'eau, l'énergie d'arrachement d'une molécule vaut W ≈ 16,7 k_BT à 300 K. De combien le rapport n_vap/n_liq augmente-t-il entre 300 K et 310 K, si W et le préfacteur ne changent pas ?",
        options: { a: "De 3 %, comme la température.", b: "D'un facteur e^16,7.", c: "D'un facteur e^(16,7 × 10/310) ≈ 1,7.", d: "D'un facteur 2 exactement." },
        hint: "Comparez e^(\u2212W/k_BT) aux deux températures.",
        why: "W/k_B × (1/300 \u2212 1/310) = 16,7 × 300 × 10/(300 × 310) ≈ 0,54, et e^0,54 ≈ 1,7. La pression de vapeur saturante de l'eau passe en effet d'environ 3,5 kPa à 6,2 kPa. Leçon « Évaporation d'un liquide »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Interférences de sources synchrones » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      cardio: { prompt: "Deux mâts verticaux sont sur l'axe nord-sud, à λ/4 l'un de l'autre ; le courant du mât nord est en retard d'un quart de période. En unités de l'intensité d'un mât seul, que reçoit-on loin vers le nord, vers le sud, puis vers l'est ?",
        options: { a: "2, 2 et 4 : le maximum est sur la perpendiculaire.", b: "4, 0 et 2 : vers le nord les deux retards se compensent, vers le sud ils s'ajoutent, vers l'est seul compte le retard propre.", c: "0, 4 et 2 : le mât en retard rayonne vers l'arrière.", d: "4, 4 et 0, comme deux mâts en opposition." },
        hint: "Vers le nord, l'onde du mât sud a un quart de longueur d'onde de plus à parcourir.",
        why: "Par (29.17), φ₂ \u2212 φ₁ = \u2212π/2 + (π/2) sin θ. Vers le nord, 0 : intensité 4. Vers le sud, \u2212π : 0. Vers l'est, \u2212π/2 : quadrature, 1 + 1 = 2. C'est la cardioïde de « Interférence de deux dipôles rayonnants »." },
      dix: { prompt: "Deux antennes en phase sont séparées de 5\u00a0λ. À quel angle de leur faisceau principal se trouve le premier zéro, et que trouve-t-on à environ 11,5° ?",
        options: { a: "Premier zéro à 11,5°, rien au-delà.", b: "Premier zéro à 2,9° ; à 11,5°, un second zéro.", c: "Premier zéro à environ 5,7°, où la différence de marche vaut λ/2 ; à 11,5°, elle vaut λ, et un lobe aussi intense que le principal.", d: "Premier zéro à 30° ; à 11,5°, un maximum de 2." },
        why: "Zéro quand d sin θ = λ/2 : sin θ = 1/10, θ ≈ 5,7°. À sin θ = 1/5, θ ≈ 11,5°, la différence de marche vaut λ : accord, intensité 4. Avec deux antennes seulement, les lobes sont tous égaux." },
      somme: { prompt: "Deux ondes de même fréquence, d'amplitudes 1 et 2, arrivent au même point avec un déphasage de 120°. Que vaut l'intensité, en unités de celle de l'onde d'amplitude 1 ?",
        options: { a: "3 : 1 + 4 + 2 × 1 × 2 × cos 120° = 5 \u2212 2.", b: "5, la somme des intensités.", c: "9, comme si elles étaient en phase.", d: "1, comme si elles étaient en opposition." },
        why: "(29.16) : A_R² = A₁² + A₂² + 2A₁A₂ cos Δφ = 1 + 4 + 4 × (\u22121/2) = 3. Le terme d'interférence, \u22122, est négatif : interférence destructive, mais partielle." },
      contraste: { prompt: "Deux faisceaux cohérents, d'amplitudes 1 et 0,5, forment des franges. Quel est le rapport entre l'intensité des franges brillantes et celle des franges sombres ?",
        options: { a: "2, le rapport des amplitudes.", b: "4, le rapport des intensités.", c: "Infini : les franges sombres sont noires.", d: "9 : (1 + 0,5)² = 2,25 contre (1 \u2212 0,5)² = 0,25." },
        hint: "Les franges brillantes ont les deux ondes en phase, les sombres en opposition.",
        why: "En phase, A_R = 1,5 ; en opposition, A_R = 0,5. Les intensités valent 2,25 et 0,25 : rapport 9. Les franges sombres ne sont noires que pour deux amplitudes égales." },
      desaccord: { prompt: "Deux émetteurs indépendants, d'amplitudes égales, ont des fréquences qui diffèrent de 1\u00a0Hz. Un récepteur moyenne l'intensité sur 10\u00a0s. Que mesure-t-il, en unités d'un émetteur seul ?",
        options: { a: "4, puisque les deux émetteurs ont la même amplitude.", b: "2 : le déphasage fait dix tours pendant la mesure, et le terme d'interférence se moyenne à zéro.", c: "0, les deux ondes se détruisent en moyenne.", d: "Une valeur entre 0 et 4 qui dépend de l'instant du début de la mesure, à quelques pour cent près." },
        why: "(29.16) suppose les phases fixes. Ici, Δφ tourne de 2π par seconde : sur 10\u00a0s, il fait dix tours entiers, et la moyenne de cos Δφ est nulle. Il reste A₁² + A₂² = 2 : les intensités s'ajoutent, comme pour deux lampes." },
      pic: { prompt: "Douze sources identiques en phase, régulièrement espacées. Que vaut l'intensité maximale, et pour quel déphasage φ entre voisines l'intensité s'annule-t-elle pour la première fois ?",
        options: { a: "12 I₀, en φ = π.", b: "144 I₀, en φ = π/12.", c: "144 I₀, en φ = 2π/12 = 30° : les douze flèches font alors un tour complet.", d: "24 I₀, en φ = 30°." },
        why: "(30.3) : en φ = 0, I = n²I₀ = 144 I₀. Le premier zéro est en nφ/2 = π, soit φ = 2π/n = 30° : la chaîne des douze flèches se referme." },
      ordres: { prompt: "Un réseau d'antennes en phase a un pas d = 1,5\u00a0λ. Dans quelles directions, depuis la normale, a-t-il des faisceaux aussi intenses que le principal ?",
        options: { a: "À 0° et à environ ±41,8° : d sin θ = mλ n'admet que m = 0 et m = ±1.", b: "À 0° seulement, car d > λ.", c: "À 0°, ±30° et ±90°.", d: "À ±41,8° seulement : la normale est un zéro." },
        why: "(30.6) : sin θ = m/1,5. m = ±1 donne sin θ = 2/3, θ ≈ 41,8° ; m = ±2 donnerait sin θ > 1. Avec un pas inférieur à λ, seul m = 0 subsisterait." },
      balayage: { prompt: "Seize antennes au pas de λ/2. Quelle avance de phase α de chaque antenne sur la précédente envoie le faisceau principal à 30° de la normale, du côté où les antennes sont numérotées croissantes ?",
        options: { a: "α = +90° : il faut avancer les antennes vers lesquelles on vise.", b: "α = 30°, l'angle visé.", c: "α = \u2212180° : les antennes en opposition.", d: "α = \u221290° : il faut que α + kd sin θ = 0, avec kd sin 30° = π × 1/2." },
        hint: "Le faisceau principal est la direction où φ = 0.",
        why: "(30.4) : φ = α + 2π(λ/2)(1/2)/λ = α + π/2. Pour φ = 0, α = \u2212π/2 = \u221290°. Chaque antenne est retardée sur la précédente du retard de trajet qu'elle a d'avance : toutes les ondes arrivent ensemble dans cette direction." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

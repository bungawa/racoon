/* Épreuve de l'étape « Méthodes de calcul du champ » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      probleme: { prompt: "On porte à 10\u00a0kV une canette métallique fermée, isolée. Pourquoi ne peut-on pas obtenir son champ par une simple intégrale de Coulomb ?",
        options: { a: "Parce que la loi de Coulomb ne vaut pas près d'un métal.", b: "Parce que la répartition des charges sur la canette est l'inconnue : on connaît son potentiel, pas ses charges. Il faut résoudre l'équation de Laplace avec ce potentiel imposé sur la surface.", c: "Parce que la canette n'a pas de symétrie sphérique, et le champ n'existe donc pas en forme close.", d: "Parce que le champ est nul à l'extérieur d'un conducteur." },
        why: "C'est un problème aux limites, (7.1). Pour une forme quelconque, on le résout numériquement, par exemple avec des anneaux de charge ajustés pour imposer le potentiel. Leçon « Méthodes pour trouver le champ électrostatique »." },
      arete: { prompt: "Le champ vaut 2\u00a0kV·m⁻¹ à 1\u00a0mm du bord d'une plaque métallique mince. Que vaut-il à 10\u00a0µm du bord, si celui-ci est vif ?",
        options: { a: "2\u00a0kV·m⁻¹ : la plaque est équipotentielle.", b: "200\u00a0kV·m⁻¹ : il varie comme 1/r.", c: "20\u00a0kV·m⁻¹ : il varie comme r^(\u22121/2), et √100 = 10.", d: "0,2\u00a0kV·m⁻¹ : il s'éteint près du bord." },
        hint: "Le bord d'une plaque mince est un coin d'ouverture β = 360° : F = √𝔷.",
        why: "|F′| ∝ r^(π/β \u2212 1) = r^(\u22121/2). Cent fois plus près, le champ est dix fois plus fort. Leçon « Champs plans et variable complexe »." },
      creux: { prompt: "Pourquoi l'air ne s'ionise-t-il jamais au fond d'un coin rentrant à angle droit d'une électrode, alors qu'il peut s'ioniser à l'arête opposée ?",
        options: { a: "Parce qu'au fond du coin (β = 90°, F = 𝔷²) le champ varie comme r et s'annule, alors qu'à l'arête saillante (β = 270°) il varie comme r^(\u22121/3) et diverge.", b: "Parce que l'air est plus dense dans les coins.", c: "Parce que les charges se repoussent vers le fond du coin.", d: "Parce que le potentiel y est plus élevé." },
        why: "Exposant π/β \u2212 1 : +1 pour un creux à 90°, \u22121/3 pour une saillie à 270°. Les charges de surface fuient les creux et s'accumulent sur les arêtes. Leçon « Champs plans et variable complexe »." },
      ionosphere: { prompt: "La nuit, une couche ionosphérique ne réfléchit plus les ondes au-dessus de 6\u00a0MHz. Quelle est sa densité d'électrons ?",
        options: { a: "Environ 6 × 10⁶\u00a0m⁻³.", b: "Environ 10²⁹\u00a0m⁻³, celle d'un métal.", c: "Impossible à dire : la réflexion dépend de l'altitude, pas de la densité.", d: "Environ 4,5 × 10¹¹\u00a0m⁻³, d'après ω_p² = n₀ e²/(ε₀ m_e)." },
        hint: "f_p ≈ 9 √n₀, en hertz pour n₀ en m⁻³.",
        why: "n₀ = ε₀ m_e (2π f)²/e² ≈ 4,5 × 10¹¹\u00a0m⁻³. Une onde de fréquence inférieure à f_p est renvoyée, une onde plus haute traverse. Leçon « Oscillations d'un gaz d'électrons »." },
      longueur: { prompt: "Dans le modèle du gaz d'électrons froid, de quoi dépend la fréquence des oscillations de plasma ?",
        options: { a: "De la densité d'électrons seulement : ni de l'amplitude (tant que deux tranches ne se croisent pas), ni de la longueur d'onde.", b: "De la longueur d'onde, comme pour une corde vibrante.", c: "De la masse des ions.", d: "De la température, comme pour le son." },
        why: "Le champ sur une tranche ne dépend que de son déplacement, (7.21) : chaque tranche est un oscillateur de pulsation ω_p, (7.25). Les ions, des milliers de fois plus lourds, ne bougent pas ; la température n'ajoute qu'une correction. Leçon « Oscillations d'un gaz d'électrons »." },
      debye: { prompt: "Dans l'eau à 298\u00a0K, la longueur de Debye vaut 9,6\u00a0nm pour 1\u00a0mmol·L⁻¹ de sel 1:1. Que vaut-elle à 0,1\u00a0mol·L⁻¹ ?",
        options: { a: "0,096\u00a0nm, cent fois moins.", b: "0,96\u00a0nm, dix fois moins : D varie comme 1/√n₀.", c: "96\u00a0nm.", d: "9,6\u00a0nm : elle ne dépend que de la température." },
        why: "(7.35) : D² = ε kT/(2 n₀ e²). Cent fois plus d'ions, une gaine dix fois plus mince. On approche alors de la taille des ions, et le modèle des ions ponctuels devient grossier. Leçon « Particules colloïdales dans un électrolyte »." },
      sel: { prompt: "Pourquoi une suspension de particules chargées, stable dans l'eau douce, précipite-t-elle quand on ajoute du sel ?",
        options: { a: "Le sel neutralise chimiquement la charge de chaque particule.", b: "Le sel rend l'eau plus dense, et les particules flottent moins.", c: "Les gaines d'ions se resserrent : la répulsion ne porte plus qu'à très courte distance, où l'attraction de van der Waals l'emporte, et la barrière entre particules disparaît.", d: "Le sel augmente l'agitation thermique." },
        why: "Avec σ fixé, c'est la portée D de la répulsion qui chute. Pour deux sphères de polystyrène de 100\u00a0nm, la barrière passe de quelques centaines de kT à 1\u00a0mmol·L⁻¹ à zéro vers quelques centièmes de mol·L⁻¹. Leçon « Particules colloïdales dans un électrolyte »." },
      grille: { prompt: "Au-dessus d'une grille de fils fins au pas a, de combien le champ s'écarte-t-il de l'uniformité à la hauteur 2a ?",
        options: { a: "De 50\u00a0% : il faut s'éloigner de nombreuses mailles.", b: "D'environ 1/(2a), comme le champ d'un fil.", c: "De 7\u00a0%.", d: "De moins de 10⁻⁵ : l'ondulation, 1/sh(2πz/a) ≈ 2 e^(\u22122πz/a), est divisée par 535 à chaque maille." },
        why: "À z = 2a, 2 e^(\u22124π) ≈ 7 × 10⁻⁶. L'harmonique n décroît sur la longueur a/(2πn), (7.45). C'est pourquoi un grillage écrante presque comme une tôle. Leçon « Champ électrostatique d'une grille »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

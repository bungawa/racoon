/* Épreuve de l'étape « Réseau et antenne » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      ordres: { prompt: "Un réseau de 500 traits par millimètre est éclairé en incidence normale par une lumière de 600\u00a0nm. Combien de faisceaux en sortent d'un même côté, ordre 0 compris ?",
        options: { a: "7 : les ordres de \u22123 à 3, car sin θ = m × 0,3 reste sous 1 jusqu'à |m| = 3.", b: "3 : les ordres \u22121, 0 et 1 seulement.", c: "500, un par trait.", d: "Une infinité, de plus en plus faibles." },
        hint: "Calculez d, puis λ/d, et cherchez le plus grand m tel que |m λ/d| ≤ 1.",
        why: "d = 2\u00a0µm, donc λ/d = 0,3. sin θ = 0,3 m reste dans [\u22121, 1] pour m = \u22123 à 3 : 7 faisceaux, l'ordre 3 à 64°. Chaque valeur du sinus donne aussi un faisceau de l'autre côté du plan des traits. Leçon « Le réseau de diffraction »." },
      incidence: { prompt: "Un réseau au pas de 1,25\u00a0µm reçoit sous 30° une lumière de 500\u00a0nm. Dans quelle direction part l'ordre \u22121 ?",
        options: { a: "À \u221223,6°, car sin θ = \u2212λ/d = \u22120,4.", b: "À environ 5,7°, car sin θ = 0,5 \u2212 0,4 = 0,1.", c: "À 30°, comme la lumière incidente.", d: "Nulle part, un ordre négatif n'existant pas en incidence oblique." },
        hint: "Le déphasage (30.7) contient les deux sinus.",
        why: "Les maxima vérifient d (sin θ \u2212 sin θi) = mλ. Pour m = \u22121 : sin θ = 0,5 \u2212 0,4 = 0,1, soit θ ≈ 5,7°. Oublier sin θi revient à oublier que l'onde atteint chaque trait un peu après le précédent. Leçon « Le réseau de diffraction »." },
      reflexion: { prompt: "Pourquoi une couche d'atomes espacés de 0,3\u00a0nm, éclairée en lumière visible, renvoie-t-elle la lumière dans une seule direction de son côté, celle de la réflexion ?",
        options: { a: "Parce que les atomes sont trop petits pour rayonner.", b: "Parce que l'onde rebondit sur les atomes comme une balle sur un mur.", c: "Parce que d ≪ λ/2 : seul l'ordre 0 existe, sin θ = sin θi, ce qui donne côté source un angle de sortie égal à l'angle d'incidence.", d: "Parce que les ordres non nuls existent, mais sont absorbés par le métal." },
        hint: "Que devient (30.7a) quand |mλ/d| dépasse 2 pour tout m ≠ 0 ?",
        why: "Avec d/λ ≈ 5 × 10⁻⁴, aucun ordre non nul n'a de direction réelle. Il reste sin θ = sin θi : de l'autre côté, la lumière diffusée accompagne la lumière incidente ; côté source, elle repart à l'angle d'incidence. La réflexion est un ordre 0 de réseau. Leçon « Le réseau de diffraction »." },
      resolution: { prompt: "Deux raies à 500,00\u00a0nm et 500,05\u00a0nm. Un réseau de 600 traits par millimètre, large de 50\u00a0mm, est éclairé sur toute sa largeur. Les sépare-t-il en ordre 1 ?",
        options: { a: "Non : il faut au moins 600 traits par millimètre de plus.", b: "Non : le pouvoir de résolution d'un réseau ne dépasse jamais 1\u00a0000.", c: "Oui, mais seulement en ordre 2 ou plus.", d: "Oui, largement : λ/Δλ = 10\u00a0000, et m n = 30\u00a0000." },
        hint: "(30.9) : λ/Δλ = m n, avec n le nombre total de traits éclairés.",
        why: "n = 600 × 50 = 30\u00a0000 traits, donc en ordre 1 le pouvoir de résolution vaut 30\u00a0000, trois fois les 10\u00a0000 demandés. Un tiers de la largeur suffirait. La densité de traits ne compte pas ; leur nombre total, si. Leçon « Le pouvoir de résolution d’un réseau »." },
      retard: { prompt: "Un réseau de 2\u00a0000 traits travaille dans l'ordre 2 à 500\u00a0nm. Que valent le retard T entre les traits extrêmes et 1/T ?",
        options: { a: "T ≈ 6,7\u00a0ps, 1/T ≈ 150\u00a0GHz : ν/Δν = 4\u00a0000, comme m n.", b: "T ≈ 3,3\u00a0ps, 1/T ≈ 300\u00a0GHz : ν/Δν = 2\u00a0000.", c: "T ≈ 1,7\u00a0fs, la période de la lumière.", d: "T = 0 : sur un maximum, toutes les ondes sont en phase." },
        hint: "Sur l'ordre m, chaque trait ajoute m longueurs d'onde de chemin.",
        why: "T = m n λ/c = 2 × 2\u00a0000 × 5 × 10⁻⁷/(3 × 10⁸) ≈ 6,7 × 10⁻¹²\u00a0s, donc Δν = 1/T ≈ 150\u00a0GHz. Avec ν = 600\u00a0THz, ν/Δν = 4\u00a0000 = m n. Être en phase modulo 2π n'est pas être sans retard. Leçon « Le pouvoir de résolution d’un réseau »." },
      radio: { prompt: "Un radiotélescope parabolique de 100\u00a0m observe la raie de l'hydrogène à 21\u00a0cm. Quel est à peu près le plus petit angle qu'il sépare ?",
        options: { a: "Environ 1 seconde d'arc, comme un petit télescope optique.", b: "Environ 2,6 × 10⁻³\u00a0rad, soit 0,15°.", c: "Environ 0,21\u00a0rad, soit 12°.", d: "Il dépend surtout de l'espacement des plaques de la surface." },
        hint: "1,22 λ/D pour un disque.",
        why: "1,22 × 0,21/100 ≈ 2,6 × 10⁻³\u00a0rad ≈ 0,15°, un peu moins du tiers du diamètre apparent de la Lune. L'espacement des éléments n'intervient pas tant qu'il reste sous λ. Leçon « L’antenne parabolique »." },
      echelette: { prompt: "Un réseau à échelettes est taillé pour envoyer toute la lumière de 500\u00a0nm dans l'ordre 1. Selon le modèle de la leçon, que devient une lumière de 1\u00a0000\u00a0nm ?",
        options: { a: "Elle part tout entière dans l'ordre 2.", b: "Elle part tout entière dans l'ordre 1, comme à 500\u00a0nm.", c: "Elle se partage à égalité entre les ordres 0 et 1, environ 41\u00a0% chacun.", d: "Elle est absorbée par les dents de scie." },
        hint: "Le facteur d'un trait vaut sinc²(π (m \u2212 λB/λ)) ; ici λB/λ = 0,5.",
        why: "Pour m = 0 et m = 1, π (m \u2212 0,5) = ∓π/2, et sinc²(π/2) = 4/π² ≈ 0,41. La position des ordres dépend du pas ; leur part, du facteur du trait, taillé pour une seule longueur d'onde. Leçon « Le réseau de diffraction »." },
      lobes: { prompt: "Une ligne de dipôles reliés en phase a un pas de 2λ. Dans quelles directions reçoit-elle à pleine puissance ?",
        options: { a: "Seulement dans l'axe, θ = 0.", b: "Dans l'axe et à 90°, jamais ailleurs.", c: "Dans toutes les directions : un pas supérieur à λ ne focalise plus.", d: "Dans l'axe, et à sin θ = ±0,5 et ±1 : des lobes de réseau rendent la direction ambiguë." },
        hint: "Pour d > λ, (30.7a) a des solutions m ≠ 0 en incidence normale.",
        why: "En phase, sin θ = m λ/d = m/2 : m = 0, ±1 (30°), ±2 (90°). Le récepteur ne sait pas distinguer ces directions. Il faut un pas inférieur à λ, ou des éléments eux-mêmes directifs. Leçons « L’antenne parabolique » et « Le réseau de diffraction »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

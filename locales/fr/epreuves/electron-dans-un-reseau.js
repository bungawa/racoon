/* Épreuve de l'étape « Un électron dans un réseau » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      front: { prompt: "Un électron est posé sur un atome d'une chaîne, A = 0,5\u00a0eV. Après 2 × 10⁻¹⁵\u00a0s, sur combien d'atomes environ s'est-il étalé (écart type √2 At/ℏ) ?",
        options: { a: "Moins d'un atome : il n'a pas eu le temps de sauter.", b: "Environ 2 atomes : At/ℏ ≈ 1,5.", c: "Environ 100 atomes.", d: "Sur toute la chaîne : l'étalement est instantané." },
        hint: "ℏ ≈ 6,6 × 10⁻¹⁶\u00a0eV·s.",
        why: "At/ℏ = 0,5 × 2 × 10⁻¹⁵/6,6 × 10⁻¹⁶ ≈ 1,5 ; √2 × 1,5 ≈ 2,1 atomes. L'écart croît comme t, pas comme √t : l'électron est une onde. Leçon « Les états d'un électron dans un réseau à une dimension »." },
      largeur: { prompt: "Deux atomes voisins se couplent par A = 0,8\u00a0eV. Quelle est la largeur de la bande d'énergie de la chaîne ?",
        options: { a: "0,8\u00a0eV.", b: "1,6\u00a0eV.", c: "Nulle : un réseau a des niveaux discrets.", d: "3,2\u00a0eV : de E₀ \u2212 2A à E₀ + 2A." },
        why: "(13.13) : E = E₀ \u2212 2A cos kb, de E₀ \u2212 2A à E₀ + 2A, largeur 4A = 3,2\u00a0eV. Leçon « Les états d'énergie définie dans un réseau »." },
      alias: { prompt: "Pourquoi un état de nombre d'onde k + 2π/b n'est-il pas un nouvel état de la chaîne ?",
        options: { a: "Il donne les mêmes amplitudes sur tous les atomes, seuls endroits où l'électron peut être.", b: "Il a une énergie plus grande, hors de la bande.", c: "Il est interdit par le principe d'exclusion.", d: "Il se propage en sens inverse." },
        why: "e^(i(k + 2π/b)nb) = e^(iknb). Les k distincts tiennent dans \u2212π/b < k ≤ π/b. Leçon « Les états d'énergie définie dans un réseau »." },
      masse: { prompt: "Dans un cristal de pas 0,25\u00a0nm, la masse effective au bas de la bande vaut mₑ. Que vaut A ?",
        options: { a: "Environ 0,1\u00a0eV.", b: "Environ 6\u00a0eV.", c: "Environ 0,6\u00a0eV : A = ℏ²/(2 mₑ b²).", d: "On ne peut pas le savoir sans la vitesse." },
        hint: "ℏ²/(2mₑ) ≈ 3,8 × 10⁻²⁰\u00a0eV·m².",
        why: "A = ℏ²/(2 m b²) = 3,8 × 10⁻²⁰/(6,25 × 10⁻²⁰) ≈ 0,61\u00a0eV. Leçon « Les états dépendant du temps dans un réseau »." },
      vitesse: { prompt: "Pour quel nombre d'onde un paquet va-t-il le plus vite sur la chaîne ?",
        options: { a: "kb = π/2, au milieu de la bande, là où E(k) est le plus pentu.", b: "k = 0, au bas de la bande.", c: "kb = π, au haut de la bande.", d: "Tous à la même vitesse." },
        why: "v = 2Ab sin(kb)/ℏ, maximale pour sin kb = 1. En k = 0 et kb = π, E(k) est plat : vitesse nulle. Leçon « Les états dépendant du temps dans un réseau »." },
      haut: { prompt: "Un électron près du haut de la bande est poussé par une force dans le sens de son mouvement. Que se passe-t-il ?",
        options: { a: "Il accélère, comme une particule libre.", b: "Il ne réagit pas.", c: "Il quitte le cristal.", d: "Il ralentit : sa masse effective est négative." },
        why: "La courbure de E(k) est négative au-dessus de kb = π/2 : m_eff = ℏ²/(d²E/dk²) < 0. Leçon « Les états dépendant du temps dans un réseau »." },
      anisotrope: { prompt: "Réseau rectangulaire, même pas, Aₓ = 1\u00a0eV et A_y = 0,25\u00a0eV. Quel est le rapport m_y/mₓ des masses effectives ?",
        options: { a: "1/4.", b: "4 : m = ℏ²/(2Ab²) dans chaque direction.", c: "2.", d: "1 : la masse de l'électron ne dépend pas de la direction." },
        why: "Chaque direction a sa masse, inversement proportionnelle à son amplitude de saut. Le rapport est Aₓ/A_y = 4. Leçon « Un électron dans un réseau à trois dimensions »." },
      oscille: { prompt: "Un champ électrique constant agit sur un électron d'un réseau parfait, sans aucune diffusion. Que fait l'électron ?",
        options: { a: "Il accélère sans limite.", b: "Il atteint une vitesse limite, comme dans un fluide visqueux.", c: "Il oscille : k croît, l'électron parcourt la bande, sa vitesse change de signe au-delà du haut.", d: "Il reste immobile." },
        why: "La vitesse 2Ab sin(kb)/ℏ est périodique en k. Si k croît régulièrement, la vitesse oscille : ce sont les oscillations de Bloch, observées en 1996 avec des atomes froids. Leçon « Les états dépendant du temps dans un réseau »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

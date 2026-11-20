/* Épreuve de l'étape « Photon, kaon neutre et N états » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      malus: { prompt: "Un photon polarisé à 60° de x arrive sur un polaroïd d'axe x. Avec quelle probabilité passe-t-il, et dans quel état est-il s'il passe ?",
        options: { a: "1/4 ; il est alors polarisé selon x.", b: "1/2 ; polarisé à 60°.", c: "3/4 ; polarisé selon x.", d: "1/4 ; toujours polarisé à 60°, mais affaibli." },
        hint: "L'amplitude est ⟨x|x′⟩ = cos θ.",
        why: "cos² 60° = 1/4. Un photon passe entier ou pas du tout ; s'il passe, le polaroïd l'a préparé dans l'état de son axe. Leçon « Les états de polarisation du photon »." },
      trois: { prompt: "Des photons polarisés selon x traversent un polaroïd à 30°, puis un à 90°. Quelle fraction sort ?",
        options: { a: "0, car le dernier est croisé avec la source.", b: "3/16 : cos² 30° × cos² 60°.", c: "1/4.", d: "3/4." },
        hint: "Le second polaroïd est à 60° du premier.",
        why: "3/4 passent le premier et sortent polarisés à 30° ; le second, à 60° de là, en transmet cos² 60° = 1/4. Total 3/16 ≈ 0,19. Leçon « Les états de polarisation du photon »." },
      circ: { prompt: "On envoie des photons |R⟩ sur un polaroïd tourné de θ quelconque. Que vaut l'amplitude de passage ?",
        options: { a: "cos θ.", b: "1/2.", c: "e^(iθ)/√2 : son module ne dépend pas de θ, sa phase si.", d: "0." },
        why: "⟨x′|R⟩ = (cos θ + i sin θ)/√2 = e^(iθ)/√2. La probabilité 1/2 ne dépend pas de l'axe ; la phase, elle, tourne avec lui, ce qui traduit le moment cinétique du photon. Leçon « Les états de polarisation du photon »." },
      moment: { prompt: "Une lame absorbe complètement une lumière polarisée circulairement droite. Que reçoit-elle, par photon absorbé ?",
        options: { a: "Rien : la lumière n'a pas de moment cinétique.", b: "Un moment cinétique 2ħ.", c: "Un moment cinétique ħ/2, comme un électron.", d: "Un moment cinétique ħ selon la direction de propagation, comme dans l'expérience de Beth." },
        why: "Dans une rotation de θ autour de z, |R⟩ devient e^(\u2212iθ)|R⟩ : c'est l'état m = +1, de moment cinétique +ħ selon z. Le photon absorbé le transmet à la lame. Leçon « Les états de polarisation du photon »." },
      quart: { prompt: "Un faisceau de K⁰ purs vole longtemps devant la durée de vie du K₁, mais peu devant celle du K₂. Quelle fraction des kaons de départ trouve-t-on sous forme de K̄⁰ ?",
        options: { a: "1/4.", b: "1/2.", c: "0, l'étrangeté étant conservée.", d: "1." },
        hint: "Il ne reste que la composante K₂ = (K⁰ \u2212 K̄⁰)/√2.",
        why: "La moitié de la probabilité, celle du K₁, s'est désintégrée. Le K₂ qui reste est K̄⁰ avec la probabilité 1/2 : au total 1/4, la limite de (11.56). Leçon « Le méson K neutre »." },
      masse: { prompt: "Sans désintégration, la probabilité qu'un K⁰ soit devenu K̄⁰ vaut sin²(αt/2). Avec α = 5,3 × 10⁹\u00a0s⁻¹, au bout de combien de temps la bascule serait-elle complète ?",
        options: { a: "1,9 × 10⁻¹⁰\u00a0s.", b: "5,9 × 10⁻¹⁰\u00a0s : αt = π.", c: "1,2 × 10⁻⁹\u00a0s.", d: "Jamais : l'étrangeté est conservée." },
        why: "sin²(αt/2) = 1 pour αt = π : t = π/α ≈ 5,9 × 10⁻¹⁰\u00a0s, soit environ 6,6 durées de vie du K₁. Celui-ci a alors presque disparu : l'oscillation réelle reste amortie. Leçon « Le méson K neutre »." },
      reel: { prompt: "On écrit, pour un système qui se désintègre, une « énergie » complexe E \u2212 iħΓ/2. Pourquoi cela ne contredit-il pas (11.78), En = En* ?",
        options: { a: "Parce que Γ est toujours nul.", b: "Parce que (11.78) ne vaut que pour deux états.", c: "Parce que (11.78) suppose H hermitienne, donc la probabilité conservée dans les états gardés ; une désintégration fait sortir la probabilité vers des états qu'on ne garde pas.", d: "Parce que ħ est petit." },
        why: "La démonstration de (11.78) n'utilise que Hji = Hij*. Un modèle qui garde K⁰ et K̄⁰ mais laisse partir les pions n'est plus hermitien : sa « matrice » effective a des valeurs propres complexes, dont la partie imaginaire est le taux de désintégration. Leçons « La généralisation aux systèmes à N états » et « Le méson K neutre »." },
      anneau: { prompt: "Six états identiques en anneau, couplés à leurs voisins par \u2212A. Combien d'énergies distinctes, et lesquelles ?",
        options: { a: "Six énergies distinctes, entre \u2212A et +A.", b: "Deux : E₀ ± A.", c: "Trois : E₀ \u2212 2A, E₀, E₀ + 2A.", d: "Quatre : E₀ \u2212 2A, E₀ \u2212 A (double), E₀ + A (double), E₀ + 2A." },
        hint: "E = E₀ \u2212 2A cos(2πk/6), k = 0 à 5.",
        why: "cos(2πk/6) vaut 1, 1/2, \u22121/2, \u22121, \u22121/2, 1/2 : quatre valeurs, dont deux doubles. Les états doubles tournent dans les deux sens autour de l'anneau. La somme des six énergies vaut 6E₀, la trace de H. Leçon « La généralisation aux systèmes à N états »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

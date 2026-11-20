/* Épreuve de l'étape « Polarisation et désintégration du lambda » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      couple: { prompt: "Un absorbant reçoit 10\u00a0mW de lumière à 633\u00a0nm polarisée circulairement. Quel couple subit-il ?",
        options: { a: "Environ 3,4 × 10⁻¹⁸\u00a0N·m : P/ω = P λ/2πc.", b: "Environ 3,3 × 10⁻¹¹\u00a0N·m, la force P/c.", c: "Zéro : la lumière n'a pas de masse.", d: "Environ 2 × 10⁻¹⁶\u00a0N·m." },
        why: "ω = 2πc/λ ≈ 3,0 × 10¹⁵\u00a0rad·s⁻¹ ; P/ω = 10⁻² / 3,0 × 10¹⁵ ≈ 3,4 × 10⁻¹⁸\u00a0N·m. P/c est une force, pas un couple. Leçon « La lumière polarisée en amplitudes »." },
      lame: { prompt: "Une lame demi-onde transparente change une lumière circulaire droite en circulaire gauche. Quel couple reçoit-elle pour une puissance P qui la traverse ?",
        options: { a: "Aucun : elle n'absorbe pas.", b: "2P/ω : chaque photon passe de +ħ à \u2212ħ.", c: "P/ω.", d: "P/2ω." },
        why: "Bilan de moment cinétique : 2ħ par photon, soit 2P/ω. Ce qui compte n'est pas l'absorption d'énergie mais le changement d'état. Leçon « La lumière polarisée en amplitudes »." },
      classique: { prompt: "Le calcul classique d'une charge entraînée par un champ tournant donne dJ/dt ÷ dW/dt = 1/ω. Qu'y ajoute la mécanique quantique ?",
        options: { a: "Rien : le résultat est faux classiquement.", b: "Un facteur 2.", c: "La granularité : J et W arrivent par paquets ħ et ħω, d'où J = Nħ pour N photons.", d: "La masse du photon." },
        why: "Le rapport J/W = 1/ω est déjà classique. L'image quantique dit en plus que chaque photon porte exactement ħ. Leçon « La lumière polarisée en amplitudes »." },
      forme: { prompt: "On mesure pour une particule polarisée la distribution 1 + α cos θ, sans aucun terme en cos² θ, à 1 % près. Qu'en conclut-on ?",
        options: { a: "Que son spin est 1.", b: "Que la parité est conservée.", c: "Que son spin est nul.", d: "Que son spin vaut 1/2 est compatible avec la mesure : un spin plus grand donnerait en général des puissances plus élevées de cos θ." },
        why: "Pour un spin 1/2, les amplitudes contiennent cos(θ/2) et sin(θ/2), dont les carrés ne donnent que du cos θ. Leçon « La désintégration du lambda zéro »." },
      alpha: { prompt: "Pour |a|² = 0,2 et |b|² = 0,8, que vaut α, et où partent préférentiellement les protons ?",
        options: { a: "α = \u22120,6 : vers l'arrière du spin du Λ, θ proche de π.", b: "α = +0,6 : vers l'avant.", c: "α = 0 : partout également.", d: "α = \u22120,25." },
        why: "α = (0,2 \u2212 0,8)/(0,2 + 0,8) = \u22120,6. f(θ) ∝ 1 \u2212 0,6 cos θ est maximal en θ = π. Leçon « La désintégration du lambda zéro »." },
      parite: { prompt: "Pourquoi une conservation de la parité imposerait-elle α = 0 dans Λ → p + π⁻ ?",
        options: { a: "Parce que le pion n'a pas de spin.", b: "Parce que l'inversion change la vitesse du proton sans changer son spin : elle échange « spin le long de la vitesse » et « spin opposé », donc |a| et |b|.", c: "Parce que le Λ est neutre.", d: "Parce que α doit être positif." },
        why: "Le spin est un vecteur axial, la vitesse un vecteur polaire. Symétrie par inversion ⇒ |a| = |b| ⇒ α = 0. Leçons « La désintégration du lambda zéro » et « Symétrie et conservation »." },
      tour: { prompt: "Un spin 1 dans |0S⟩ est mesuré dans un appareil tourné de 90° autour de y. Avec quelle probabilité trouve-t-on 0 ?",
        options: { a: "1.", b: "1/2.", c: "0 : l'élément ⟨0T|0S⟩ vaut cos θ, nul à 90°.", d: "1/3." },
        hint: "Regardez l'élément central de la matrice du spin 1.",
        why: "⟨0T|0S⟩ = cos 90° = 0. L'état est alors (|+T⟩ \u2212 |\u2212T⟩)/√2 environ, au signe près : + ou \u2212 avec 1/2 chacun. Leçon « Récapitulatif des matrices de rotation »." },
      spin1: { prompt: "Un état de spin 1 et un état de spin 1/2 sont tournés de 360°. Lesquels reviennent identiques ?",
        options: { a: "Les deux.", b: "Aucun.", c: "Seul le spin 1/2.", d: "Seul le spin 1 ; le spin 1/2 prend un signe \u22121, qui ne se voit que par une interférence." },
        why: "Les éléments du spin 1 sont des fonctions de θ, de période 2π ; ceux du spin 1/2, de θ/2, de période 4π. Leçon « Récapitulatif des matrices de rotation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

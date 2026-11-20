/* Épreuve de l'étape « La matrice hamiltonienne » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      compose: { prompt: "On connaît U(t + Δt, t) pour tout Δt très petit. Comment obtient-on l'évolution sur une heure ?",
        options: { a: "En multipliant les matrices des pas successifs, U(t₃, t₁) = U(t₃, t₂) U(t₂, t₁) : c'est ce que (8.39) fait à la limite.", b: "En additionnant les matrices des pas successifs.", c: "On ne peut pas : il faut une autre loi pour les temps longs.", d: "En élevant H à la puissance du nombre de pas." },
        hint: "Deux appareils en série se combinent par un produit.",
        why: "Une attente se découpe en attentes courtes, qui se composent comme des appareils en série, (8.30). Leçon « L'évolution des états dans le temps »." },
      euler: { prompt: "Un programme applique C_i(t + Δt) = Σ [δ_ij \u2212 (i/ħ)H_ij Δt] C_j(t) avec EΔt/ħ = 0,1 pour l'état propre d'énergie E. Que devient la probabilité totale après 100 pas ?",
        options: { a: "Elle reste 1.", b: "Environ 2,7 : chaque pas la multiplie par 1 + 0,01.", c: "Environ 0,37 : chaque pas la multiplie par 1 \u2212 0,01.", d: "Environ 1,1 : l'erreur ne s'accumule pas." },
        why: "Un pas multiplie l'amplitude par 1 \u2212 0,1i, de module carré 1,01 ; (1,01)¹⁰⁰ ≈ 2,7. La règle du temps court n'est juste qu'au premier ordre. Leçon « L'évolution des états dans le temps »." },
      hermitienne: { prompt: "Un modèle propose H₁₁ = 2, H₂₂ = 1, H₁₂ = 0,5 + 0,3i, H₂₁ = 0,5 + 0,3i (en µeV). Qu'en dire ?",
        options: { a: "Il convient : les éléments diagonaux sont réels.", b: "Il convient : H₁₂ = H₂₁.", c: "Il ne conserve pas la probabilité : il faudrait H₂₁ = H₁₂* = 0,5 \u2212 0,3i.", d: "Il ne convient pas parce que H₁₁ ≠ H₂₂." },
        why: "La conservation de Σ|C_i|² impose (8.40), H_ij* = H_ji. Des énergies diagonales différentes sont permises. Leçon « La matrice hamiltonienne »." },
      stationnaire: { prompt: "Un système n'a qu'un état utile, d'énergie H₁₁ = E constante. Que mesure-t-on au cours du temps ?",
        options: { a: "Une probabilité qui décroît comme e^(\u2212Et/ħ).", b: "Une probabilité qui oscille à la fréquence E/h.", c: "Une amplitude qui reste constante, phase comprise.", d: "Une probabilité constante : seule la phase de l'amplitude tourne, e^(\u2212iEt/ħ)." },
        why: "C'est (8.42), un état d'énergie définie. La phase ne se voit que par comparaison avec un autre état. Leçon « La matrice hamiltonienne »." },
      melange: { prompt: "Deux états diffèrent en énergie de Δ = 60\u00a0µeV et sont couplés par |H₁₂| = 40\u00a0µeV. Partie de |1⟩, quelle part du système passe au plus en |2⟩ ?",
        options: { a: "Environ 64\u00a0%.", b: "100\u00a0%.", c: "Environ 44\u00a0%.", d: "Environ 31\u00a0%." },
        hint: "P₂,max = |H₁₂|²/((Δ/2)² + |H₁₂|²).",
        why: "1\u00a0600/(900 + 1\u00a0600) = 0,64. Un couplage comparable à l'écart mélange beaucoup ; un couplage petit devant l'écart, peu. Leçon « La matrice hamiltonienne »." },
      doublet: { prompt: "Dans le modèle de l'ammoniac, H₁₁ = H₂₂ = E₀ et H₁₂ = H₂₁ = \u2212A. Quels sont les niveaux d'énergie ?",
        options: { a: "E₀ seul, deux fois.", b: "E₀ \u2212 A pour l'état aux amplitudes égales, E₀ + A pour l'état aux amplitudes opposées.", c: "E₀ \u2212 A pour l'azote en haut, E₀ + A pour l'azote en bas.", d: "E₀ \u2212 2A et E₀ + 2A." },
        why: "C₁ + C₂ et C₁ \u2212 C₂ évoluent avec E₀ \u2212 A et E₀ + A, (8.48) et (8.49). Aucun des deux états stationnaires n'a l'azote d'un côté. Leçon « La molécule d'ammoniac »." },
      periode: { prompt: "L'écart des deux niveaux de l'ammoniac correspond à 23,87\u00a0GHz. Une molécule part de l'azote en haut. Quand l'azote est-il en bas à coup sûr pour la première fois ?",
        options: { a: "Au bout de 42\u00a0ps.", b: "Jamais à coup sûr.", c: "Au bout d'environ 21\u00a0ps.", d: "Au bout de 6,7\u00a0ps." },
        why: "P₂ = sin²(At/ħ) vaut 1 pour t = πħ/(2A) = 1/(2ν) ≈ 21\u00a0ps, une demi-période. Leçon « La molécule d'ammoniac »." },
      phase: { prompt: "On ajoute 1\u00a0eV aux deux énergies diagonales du modèle de l'ammoniac. Qu'est-ce qui change dans les mesures ?",
        options: { a: "La fréquence de la raie d'inversion augmente.", b: "La molécule cesse d'osciller.", c: "La probabilité de trouver l'azote en bas double.", d: "Rien : cela n'ajoute qu'une phase commune aux deux amplitudes ; seul l'écart 2A se mesure." },
        why: "Une constante ajoutée à H multiplie toutes les amplitudes par e^(\u2212iεt/ħ). Les probabilités et l'écart des niveaux n'en dépendent pas. Leçons « L'évolution des états dans le temps » et « La molécule d'ammoniac »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Les amplitudes dans le temps » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      stationnaire: { prompt: "Un atome est dans un état d'énergie définie. On mesure, à différents instants, la probabilité de le trouver dans un autre état quelconque. Comment varie-t-elle ?",
        options: { a: "Elle oscille à la fréquence E/h.", b: "Elle décroît exponentiellement.", c: "Elle ne varie pas : seule la phase de l'amplitude tourne.", d: "Elle croît linéairement." },
        why: "(7.1) : ψ = a e^(\u2212iE₀t/ħ). Toute amplitude vers un autre état porte le même facteur de phase, de module 1. Leçon « Les atomes au repos et les états stationnaires »." },
      origine: { prompt: "Les deux niveaux hyperfins du césium diffèrent de h × 9,19 GHz. On ajoute 1 eV à toutes les énergies. Que devient la fréquence de battement mesurée par une horloge ?",
        options: { a: "Elle reste 9,19 GHz : seule la différence des énergies compte.", b: "Elle augmente de 2,4 × 10¹⁴ Hz.", c: "Elle double.", d: "Elle s'annule." },
        why: "(7.4) : un facteur e^(\u2212iAt/ħ) commun à toutes les composantes disparaît des probabilités. Leçon « Les atomes au repos et les états stationnaires »." },
      lambda: { prompt: "Quelle est la longueur d'onde d'un électron dont l'énergie cinétique vaut 100 eV ?",
        options: { a: "1,2 nm.", b: "12 nm.", c: "1,2 µm.", d: "0,12 nm, de l'ordre des distances entre atomes." },
        hint: "λ = h/√(2 m Ec) ; λ vaut 1,2 nm à 1 eV, et varie comme 1/√Ec.",
        why: "λ(100 eV) = 1,23 nm/√100 ≈ 0,12 nm : la diffraction par un cristal est possible. Leçon « Le mouvement uniforme en amplitudes »." },
      groupe: { prompt: "Dans un paquet d'ondes de matière, non relativiste et énergie de masse retirée, les crêtes vont à p/2M. Et le paquet ?",
        options: { a: "Lui aussi à p/2M.", b: "À p/M, la vitesse de la particule : les crêtes le traversent d'avant en arrière.", c: "À c.", d: "Il reste immobile." },
        why: "v_g = dω/dk = p/M, (7.16). La vitesse de phase dépend de l'origine des énergies et ne porte rien de mesurable. Leçon « Le mouvement uniforme en amplitudes »." },
      marche: { prompt: "Un électron de 4 eV entre dans une région où son énergie potentielle vaut 3 eV. Que deviennent sa fréquence et sa longueur d'onde ?",
        options: { a: "Fréquence inchangée ; longueur d'onde doublée.", b: "Fréquence divisée par 4 ; longueur d'onde inchangée.", c: "Les deux inchangées.", d: "Fréquence doublée ; longueur d'onde divisée par 2." },
        why: "La fréquence est fixée par l'énergie totale, conservée (7.23). L'énergie cinétique passe de 4 à 1 eV, p est divisé par 2, λ doublé (7.24). Leçon « Énergie potentielle et conservation de l'énergie quantiques »." },
      tunnel: { prompt: "Une barrière épaisse transmet une fraction 10⁻⁴. On double sa largeur. Quelle fraction passe ?",
        options: { a: "2 × 10⁻⁴.", b: "5 × 10⁻⁵.", c: "10⁻⁸ : le facteur e^(\u22122p′L/ħ) est élevé au carré.", d: "Aucune." },
        why: "La loi (7.25) est exponentielle en L. C'est ce qui rend le microscope à effet tunnel si sensible à la distance. Leçon « Énergie potentielle et conservation de l'énergie quantiques »." },
      force: { prompt: "Un électron de 100 eV traverse sur 1 cm un champ électrique transverse de 1 kV/m. Le calcul par les ondes et le calcul par la force donnent-ils le même angle ?",
        options: { a: "Non, l'écart est d'un facteur 2.", b: "Non, l'onde n'est pas déviée.", c: "Oui, exactement, à toute énergie.", d: "Oui, environ 0,05 rad, à 0,25 % près : le potentiel varie lentement à l'échelle de la longueur d'onde." },
        why: "δθ = \u2212(w/pv) ∂V/∂y = eℰw/(2Ec) = 10 eV/200 eV. Les fronts d'onde pivotent du même angle ; l'écart, du second ordre, vaut environ le quart de ΔV/Ec. Leçon « Les forces et la limite classique »." },
      precession: { prompt: "Un spin 1/2 préparé selon +x est placé dans un champ selon z. Qu'observe-t-on ?",
        options: { a: "Il s'aligne sur le champ.", b: "Il tourne autour du champ à ω_p = 2μB/ħ : la probabilité d'être selon +x vaut cos²(μBt/ħ).", c: "Il reste selon +x.", d: "Il se retourne selon \u2212z." },
        why: "Les états ±z ont des énergies ±μB ; leurs phases tournent en sens opposés, et le spin précesse, (7.36) à (7.38). Leçon « La précession d'une particule de spin 1/2 »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

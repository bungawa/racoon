/* Épreuve de l'étape « Transitions et maser » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      rabi: { prompt: "À la résonance, une molécule entre dans la cavité dans l'état I. Au bout de quel temps est-elle à coup sûr dans l'état II, si μℰ₀/ħ = 10⁴\u00a0s⁻¹ ?",
        options: { a: "100\u00a0µs.", b: "314\u00a0µs.", c: "157\u00a0µs : μℰ₀T/ħ = π/2.", d: "Jamais à coup sûr." },
        why: "P_II = sin²(μℰ₀T/ħ) vaut 1 pour T = (π/2)/10⁴\u00a0s ≈ 157\u00a0µs. Leçon « Les transitions à la résonance »." },
      double: { prompt: "Un maser est réglé pour μℰ₀T/ħ = π/2. On double la longueur de la cavité. Que deviennent les molécules à la sortie ?",
        options: { a: "Elles ressortent dans l'état I : elles ont repris au champ l'énergie qu'elles lui avaient cédée.", b: "Elles ressortent toutes dans l'état II.", c: "Moitié dans chaque état.", d: "Elles restent dans la cavité." },
        why: "μℰ₀T/ħ = π, et sin²(π) = 0. Leçon « Les transitions à la résonance »." },
      vitesses: { prompt: "Pourquoi un maser à ammoniac ne convertit-il jamais toutes les molécules de l'état I en état II ?",
        options: { a: "Parce que le champ n'est jamais à la résonance.", b: "Parce que certaines molécules sont trop lourdes.", c: "Parce que l'énergie se perd dans les parois.", d: "Parce que les molécules n'ont pas toutes la même vitesse, donc pas la même durée de passage, et que le champ varie dans la cavité." },
        why: "La condition π/2 ne peut pas valoir pour toutes les vitesses à la fois. Leçon « Les transitions à la résonance »." },
      largeur: { prompt: "Les molécules passent 2\u00a0ms dans le champ. À quel écart de fréquence la probabilité de transition s'annule-t-elle pour la première fois ?",
        options: { a: "2\u00a0kHz.", b: "500\u00a0Hz.", c: "50\u00a0Hz.", d: "Elle ne s'annule jamais." },
        why: "Premier zéro à |f \u2212 f₀| = 1/T = 500\u00a0Hz, soit environ 2 × 10⁻⁸ de 23,87\u00a0GHz. Leçon « Les transitions hors résonance »." },
      premier: { prompt: "Pourquoi (9.52) donne-t-elle une probabilité supérieure à 1 quand μℰ₀T/ħ = 1,5 ?",
        options: { a: "Parce que le champ est hors résonance.", b: "Parce que la molécule est dans l'état II.", c: "Parce que c'est un premier ordre, valable seulement pour μℰ₀T/ħ ≪ 1 ; la solution exacte de (9.45) donne sin²(1,5) ≈ 0,99.", d: "Parce que la probabilité peut dépasser 1 en mécanique quantique." },
        why: "(9.52) suppose γ_I ≈ 1 tout le long ; ce n'est plus vrai quand la molécule passe presque entièrement en II. Leçon « Les transitions hors résonance »." },
      horloge: { prompt: "Comment rendre plus fine la raie qu'utilise une horloge atomique ?",
        options: { a: "En allongeant le temps pendant lequel les atomes voient le champ : la largeur est 1/T.", b: "En augmentant le champ.", c: "En choisissant des atomes de dipôle plus grand.", d: "En chauffant les atomes." },
        why: "La largeur ne dépend que de T, tant que le champ est faible. Atomes lents, ou champs séparés à la manière de Ramsey. Leçon « Les transitions hors résonance »." },
      taux: { prompt: "On éclaire des molécules par une lumière de spectre large pendant un temps T, puis pendant 3T. Combien de fois plus de transitions ?",
        options: { a: "9 fois plus.", b: "Autant.", c: "√3 fois plus.", d: "3 fois plus : le taux est constant." },
        why: "Pour un spectre large, (9.55) donne une probabilité proportionnelle à T. Leçon « L'absorption de la lumière »." },
      stimulee: { prompt: "Une lumière de la bonne fréquence éclaire des molécules dans l'état haut. Que se passe-t-il ?",
        options: { a: "Rien : seules les molécules de l'état bas absorbent.", b: "Elles passent dans l'état bas avec le même taux que des molécules de l'état bas monteraient : c'est l'émission stimulée.", c: "Elles montent encore.", d: "Elles émettent dans toutes les directions, indépendamment de la lumière." },
        why: "Le calcul de (9.55) ne dépend pas de l'état qui est le plus haut. C'est le principe du maser et du laser. Leçons « L'absorption de la lumière » et « Les transitions à la résonance »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

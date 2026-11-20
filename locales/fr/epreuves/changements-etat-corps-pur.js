/* Épreuve de l'étape « Changements d'état du corps pur » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      sublimation: { prompt: "On chauffe lentement de la glace prise à 230\u00a0K, sous une pression constante de 300\u00a0Pa. Que se passe-t-il ?",
        options: { a: "Elle se sublime vers 265\u00a0K, sans jamais fondre : 300\u00a0Pa est sous la pression du point triple, 611,657\u00a0Pa.", b: "Elle fond à 273,15\u00a0K, puis l'eau bout vers 373\u00a0K.", c: "Elle fond vers 265\u00a0K, car la basse pression abaisse la fusion.", d: "Rien jusqu'à 273,16\u00a0K, où les trois phases apparaissent." },
        hint: "Placez 300\u00a0Pa sur le diagramme (P, T), par rapport au point triple.",
        why: "Sous la pression du point triple, le liquide n'est stable à aucune température : la seule courbe traversée est celle de sublimation, qui passe par 300\u00a0Pa vers 265\u00a0K. Leçon « Diagrammes (P, T) et (P, v) »." },
      recipient: { prompt: "Un récipient rigide de 2\u00a0m³ contient 1\u00a0kg d'eau à 373\u00a0K. À cette température, vℓ\u202f=\u202f1,043\u00a0L·kg⁻¹ et vg\u202f=\u202f1,672\u00a0m³·kg⁻¹. Que contient-il ?",
        options: { a: "Un mélange de titre 0,5 : le volume est partagé.", b: "Seulement de la vapeur, sous moins de 101\u00a0kPa : v\u202f=\u202f2\u00a0m³·kg⁻¹ dépasse vg, le point est à droite de la cloche.", c: "Un mélange de titre 1,2.", d: "Du liquide surmonté d'un vide." },
        hint: "Comparez le volume massique moyen v\u202f=\u202fV/m aux bornes du palier.",
        why: "Le titre x\u202f=\u202f(v\u202f\u2212\u202fvℓ)/(vg\u202f\u2212\u202fvℓ) n'a de sens qu'entre 0 et 1. Ici il dépasserait 1 : il n'y a plus de palier, la vapeur est sèche, à une pression plus basse que psat. Leçon « Diagrammes (P, T) et (P, v) »." },
      bouilloire: { prompt: "Quelle énergie faut-il pour porter 0,5\u00a0kg d'eau de 293\u00a0K à l'ébullition complète, sous 101\u202f325\u00a0Pa ? (c\u202f=\u202f4,18\u00a0kJ·K⁻¹·kg⁻¹, Lv\u202f=\u202f2\u202f257\u00a0kJ·kg⁻¹)",
        options: { a: "167\u00a0kJ : il suffit d'atteindre 373\u00a0K.", b: "1\u202f128\u00a0kJ : la chaleur latente seule.", c: "1,30\u00a0MJ, dont 87\u00a0% pour la vaporisation.", d: "2,26\u00a0MJ : la chaleur latente d'un kilogramme." },
        hint: "Ajoutez la montée en température et le palier, pour la masse donnée.",
        why: "0,5\u202f×\u202f4,18\u202f×\u202f80\u202f=\u202f167\u00a0kJ pour chauffer, 0,5\u202f×\u202f2\u202f257\u202f=\u202f1\u202f128\u00a0kJ pour vaporiser : 1,30\u00a0MJ. Une bouilloire de 2\u00a0kW met 1,4\u00a0min à faire bouillir et près de 11\u00a0min à tout vaporiser. Leçon « Enthalpie et entropie de changement d'état »." },
      fonte: { prompt: "2\u00a0kg de glace fondent à 273,15\u00a0K sous 101\u202f325\u00a0Pa (Lf\u202f=\u202f333,55\u00a0kJ·kg⁻¹). Quelle est la variation d'entropie de la glace ?",
        options: { a: "Zéro : la température ne change pas.", b: "667\u00a0kJ·K⁻¹ : la chaleur reçue.", c: "1,22\u00a0kJ·K⁻¹ : on ne compte qu'un kilogramme.", d: "2,44\u00a0kJ·K⁻¹ : mLf/T." },
        why: "La fusion à l'équilibre est réversible et isotherme : ΔS\u202f=\u202fmLf/T\u202f=\u202f2\u202f×\u202f333\u202f550/273,15\u202f≈\u202f2\u202f442\u00a0J·K⁻¹, par Δs = L/T. Leçon « Enthalpie et entropie de changement d'état »." },
      autocuiseur: { prompt: "On estime psat(394,15\u00a0K) par (45.15), en partant de 101\u202f325\u00a0Pa à 373,12\u00a0K avec L\u202f=\u202f2\u202f257\u00a0kJ·kg⁻¹ constante. On trouve 204\u00a0kPa ; la table donne 205\u00a0kPa. Pourquoi l'accord est-il si bon ici ?",
        options: { a: "Sur 21\u00a0K, L ne varie que de 2,5\u00a0%, la vapeur s'écarte du gaz parfait de 1,5 à 2,5\u00a0% et le liquide occupe 10⁻³ du volume de la vapeur ; ici, ces petits effets se compensent en partie.", b: "Parce que (45.15) est exacte au-dessus de 373\u00a0K.", c: "Par chance : les erreurs se compensent toujours.", d: "Parce que la pression double, ce qui annule l'écart au gaz parfait." },
        hint: "Chiffrez chacune des trois hypothèses entre 373 et 394\u00a0K.",
        why: "Les trois hypothèses de (45.15) tiennent sur un petit intervalle loin du point critique. Partie de 373\u00a0K vers 300\u00a0K, la même formule se trompe de 17\u00a0%, parce que L change de 8\u00a0%. Leçon « Équation de Clausius-Clapeyron »." },
      patinoire: { prompt: "Quelle pression faut-il pour faire fondre de la glace à 272\u00a0K ? La pente de fusion vaut \u221213,5\u00a0MPa·K⁻¹ au point triple.",
        options: { a: "Environ 101\u00a0kPa : la pression atmosphérique suffit.", b: "Environ 15\u00a0MPa : 1,16\u00a0K sous le point triple, à 13,5\u00a0MPa par kelvin.", c: "Environ 1,5\u00a0MPa.", d: "Aucune : sous pression, la glace gèle plus fort." },
        why: "Δp\u202f=\u202f1,16\u202f×\u202f13,5\u00a0MPa\u202f≈\u202f15,6\u00a0MPa par la courbe de fusion linéarisée ; l'équation de l'IAPWS donne 15,1\u00a0MPa. La pente est négative parce que la glace est moins dense que l'eau, d'après la formule de Clapeyron. Leçon « Équilibre liquide-vapeur et formule de Clapeyron »." },
      travail: { prompt: "Quand 1\u00a0kg d'eau se vaporise à 373\u00a0K sous 101\u202f325\u00a0Pa, quelle part de L\u202f=\u202f2\u202f257\u00a0kJ sert à repousser l'atmosphère ?",
        options: { a: "Toute : l'énergie interne de la vapeur et du liquide est la même à la même température.", b: "Aucune : le volume ne change pas.", c: "7,5\u00a0% : pΔv\u202f=\u202f101\u202f325\u202f×\u202f1,672\u202f≈\u202f169\u00a0kJ ; le reste, 2\u202f087\u00a0kJ, défait les liaisons.", d: "50\u00a0% : moitié travail, moitié chaleur." },
        why: "L\u202f=\u202fΔh\u202f=\u202fΔu\u202f+\u202fpΔv. La vapeur n'est pas un gaz parfait à même énergie que le liquide : passer du liquide au gaz coûte surtout de l'énergie interne. Leçon « Enthalpie et entropie de changement d'état »." },
      critique: { prompt: "Andrews comprime du dioxyde de carbone à 310\u00a0K, au-dessus de sa température critique de 304\u00a0K. Qu'observe-t-il ?",
        options: { a: "Un palier de liquéfaction plus court qu'à 290\u00a0K.", b: "La formation de neige carbonique.", c: "Une liquéfaction brutale à 7\u00a0MPa.", d: "Ni palier ni ménisque : la densité croît continûment, sans que le gaz se liquéfie." },
        hint: "Où s'arrête la courbe de vaporisation ?",
        why: "Au-dessus de la température critique, l'isotherme n'a plus de palier et la chaleur latente est nulle : il n'y a qu'un seul fluide. On peut même aller du liquide au gaz en contournant le point critique, sans ébullition. Leçons « Diagrammes (P, T) et (P, v) » et « Enthalpie et entropie de changement d'état »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

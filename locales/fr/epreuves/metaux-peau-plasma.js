/* Épreuve de l'étape « Mélanges, métaux et effet de peau » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      sucre: { prompt: "On mélange à volumes égaux deux liquides d'indices 1,33 et 1,50, sans réaction chimique ni changement de volume. Que prédit la relation de Lorentz–Lorenz pour l'indice du mélange ?",
        options: { a: "Exactement 1,415, la moyenne des deux indices.", b: "1,50 : le liquide le plus réfringent impose son indice.", c: "Un peu moins que la moyenne, environ 1,412 : c'est 3(n² \u2212 1)/(n² + 2) qui se moyenne, pas n.", d: "Un peu plus que la moyenne, environ 1,42, car les dipôles des deux liquides s'ajoutent." },
        hint: "Chaque liquide garde ses molécules, deux fois moins nombreuses par unité de volume : les N α se moyennent.",
        why: "3(n² \u2212 1)/(n² + 2) vaut 0,612 et 0,882 ; leur moyenne, 0,747, redonne n ≈ 1,412. La fonction est concave en n : sa moyenne correspond à un indice un peu inférieur à la moyenne des indices. Leçon « Indice d'un mélange »." },
      regle: { prompt: "Sur une table d'eaux sucrées, la polarisabilité du sucre déduite varie de 0,7 % entre 10 et 75 % de sucre avec (32.37), et de 2,7 % si l'on additionne n² \u2212 1 sans champ local. Qu'en conclure ?",
        options: { a: "Que chaque molécule de la solution sent le champ de ses voisines polarisées : le champ local doit être compté.", b: "Que le sucre réagit chimiquement avec l'eau au-dessus de 50 %.", c: "Que l'indice ne dépend pas de la concentration.", d: "Que la règle sans champ local est meilleure, puisqu'elle varie davantage." },
        why: "Une bonne règle donne la même polarisabilité à toute concentration. Celle de Lorentz–Lorenz, qui compte le champ des voisines, s'en approche quatre fois mieux. Leçon « Indice d'un mélange »." },
      libre: { prompt: "En quoi l'indice des électrons de conduction d'un métal, (32.38), diffère-t-il de celui d'un diélectrique dense ?",
        options: { a: "Il a un frottement nul.", b: "Il a une masse effective infinie.", c: "Il garde la force de rappel mais supprime le frottement.", d: "La force de rappel est nulle, ω0 = 0, et on n'applique pas la correction de champ local, car ces électrons parcourent tout le cristal." },
        why: "Rien ne retient un électron de conduction à un atome, et le champ qu'il voit en moyenne est le champ moyen. Le frottement reste : il vient des chocs. Leçon « Ondes dans les métaux »." },
      derive: { prompt: "Dans le cuivre, τ ≈ 2,5 × 10⁻¹⁴ s. Quelle est la vitesse de dérive des électrons sous un champ de 0,1 V·m⁻¹ ?",
        options: { a: "Environ 4,4 mm·s⁻¹.", b: "Environ 0,44 mm·s⁻¹.", c: "Environ 0,22 mm·s⁻¹.", d: "Environ 4,4 km·s⁻¹." },
        hint: "v = eEτ/m, avec e = 1,6 × 10⁻¹⁹ C et m = 9,1 × 10⁻³¹ kg.",
        why: "1,6 × 10⁻¹⁹ × 0,1 × 2,5 × 10⁻¹⁴/9,1 × 10⁻³¹ ≈ 4,4 × 10⁻⁴ m·s⁻¹. La réponse c est celle qu'on obtient avec τ/2 : les vols de durée exponentielle donnent bien τ. Leçon « Ondes dans les métaux »." },
      tau: { prompt: "L'aluminium a σ = 3,8 × 10⁷ S·m⁻¹ et trois électrons libres par atome, N = 1,81 × 10²⁹ m⁻³. Que vaut τ ?",
        options: { a: "Environ 7 × 10⁻¹⁵ s.", b: "Environ 2 × 10⁻¹⁴ s.", c: "Environ 2 × 10⁻¹⁵ s.", d: "Environ 7 × 10⁻¹² s." },
        hint: "τ = mσ/(Ne²).",
        why: "9,1 × 10⁻³¹ × 3,8 × 10⁷/(1,81 × 10²⁹ × 2,56 × 10⁻³⁸) ≈ 7,4 × 10⁻¹⁵ s. Avec un seul électron par atome, on trouverait trois fois plus, 2,2 × 10⁻¹⁴ s : le choix de N fait partie du modèle. (32.43), leçon « Ondes dans les métaux »." },
      peau: { prompt: "Quelle est l'épaisseur de peau du cuivre, σ = 6,0 × 10⁷ S·m⁻¹, à 100 MHz ?",
        options: { a: "Environ 0,65 µm.", b: "Environ 65 µm.", c: "Environ 6,5 µm.", d: "Environ 9 mm." },
        hint: "δ = √(2/μ0σω), μ0 ≈ 1,26 × 10⁻⁶ H·m⁻¹.",
        why: "2/(1,26 × 10⁻⁶ × 6,0 × 10⁷ × 6,3 × 10⁸) ≈ 4,2 × 10⁻¹¹ m², δ ≈ 6,5 µm. Ici ωτ ≈ 1,6 × 10⁻⁵ : (32.48) s'applique sans réserve. Leçon « Épaisseur de peau et fréquence plasma »." },
      plasma: { prompt: "La longueur d'onde plasma de l'aluminium est d'environ 79 nm. Que prévoit le modèle des électrons libres pour un rayonnement de 50 nm sur une couche mince d'aluminium ?",
        options: { a: "Il est réfléchi totalement, comme la lumière visible.", b: "Il est absorbé sur une épaisseur de peau de quelques nanomètres.", c: "Il est amplifié par les oscillations plasma.", d: "Il traverse : au-dessus de la fréquence plasma, n² = 1 \u2212 (ωp/ω)² est positif, l'indice est réel, voisin de 0,77." },
        why: "50 nm est plus court que λp : ω > ωp. Avec ωp/ω = 50/79, n² ≈ 0,60 et n ≈ 0,77. La partie imaginaire restante, de l'ordre de 10⁻³, absorbe peu une couche mince. (32.51a), leçon « Épaisseur de peau et fréquence plasma »." },
      ordre: { prompt: "Pour le cuivre à 1 THz, ωτ ≈ 0,16. De combien la formule de l'épaisseur de peau s'écarte-t-elle de la longueur d'atténuation exacte tirée de (32.42) ?",
        options: { a: "De moins de 0,01 % : la formule est exacte tant que ω est inférieure à la fréquence plasma.", b: "D'environ 7 % : l'erreur vaut à peu près ωτ/2, et la condition ωτ ≪ 1 n'est plus tout à fait remplie.", c: "D'un facteur 10 : on est déjà au-dessus de la fréquence plasma.", d: "De 50 %, car à 1 THz le courant de déplacement domine." },
        why: "La longueur exacte vaut 61 nm, (32.48) donne 65 nm : 7 % d'écart, voisin de ωτ/2 = 8 %. Le courant de déplacement reste négligeable, ωε0/σ ≈ 10⁻⁶. Leçon « Épaisseur de peau et fréquence plasma »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

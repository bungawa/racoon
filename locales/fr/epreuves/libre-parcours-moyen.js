/* Épreuve de l'étape « Collisions et libre parcours moyen » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      chocs: { prompt: "Dans l'argon à 293 K et 101 325 Pa, le libre parcours vaut 79 nm et la vitesse moyenne 394 m·s⁻¹. Combien de chocs une molécule subit-elle par seconde, et quelle fraction des molécules vole plus de 1 ns sans choc ?",
        options: { a: "5,0 × 10⁹ chocs par seconde ; e⁻⁵, soit 0,7 %.", b: "5,0 × 10⁹ chocs par seconde ; 20 %, puisque 1 ns vaut cinq fois τ.", c: "2,0 × 10⁻¹⁰ chocs par seconde ; 37 %.", d: "5,0 × 10⁹ chocs par seconde ; aucune, car aucun vol ne dépasse 5τ." },
        hint: "τ = l/⟨v⟩, puis la survie (43.8).",
        why: "τ = 79 × 10⁻⁹/394 ≈ 2,0 × 10⁻¹⁰ s, soit 5,0 × 10⁹ chocs par seconde. 1 ns = 5τ, et P = e⁻⁵ ≈ 0,0067 : rare, pas impossible, la loi exponentielle n'a pas de borne. Leçons « Collisions entre molécules » et « Le libre parcours moyen »." },
      horloge: { prompt: "Un détecteur reçoit en moyenne un coup par seconde, à des instants indépendants. On regarde l'horloge à un instant quelconque. En moyenne, depuis combien de temps le dernier coup est-il arrivé, et dans combien de temps viendra le prochain ?",
        options: { a: "0,5 s et 0,5 s : l'instant tombe au milieu d'un intervalle d'une seconde.", b: "1 s et 1 s : l'intervalle en cours dure 2 s en moyenne.", c: "1 s et 0 s.", d: "0,5 s et 1 s." },
        hint: "Des événements indépendants n'ont pas de mémoire, dans un sens du temps comme dans l'autre.",
        why: "L'attente du prochain vaut τ = 1 s quel que soit l'instant, et le même calcul en remontant le temps donne 1 s depuis le dernier. L'intervalle qui contient l'instant dure 2 s : un instant au hasard tombe plus souvent dans un intervalle long. 0,5 s serait juste pour des coups réguliers. Leçon « Collisions entre molécules »." },
      enceinte: { prompt: "Une enceinte de 30 cm contient de l'azote à 293 K, de libre parcours 66 nm à 101 325 Pa. Au-dessous de quelle pression environ les molécules vont-elles de paroi en paroi presque sans se heurter ?",
        options: { a: "Vers 10³ Pa.", b: "Vers 10⁻⁸ Pa.", c: "Vers 2 × 10⁻² Pa.", d: "À aucune pression : le libre parcours ne dépend pas de la pression." },
        hint: "l est proportionnel à 1/P ; cherchez la pression où l = 0,3 m.",
        why: "l = 66 nm × (101 325 Pa/P) = 0,3 m pour P ≈ 2,2 × 10⁻² Pa. Au-dessous, le nombre de Knudsen dépasse 1 : c'est le vide poussé, où le gaz ne s'écoule plus comme un fluide. Leçon « Le libre parcours moyen »." },
      cibles: { prompt: "Pour une même section efficace σ_c, quel est le libre parcours d'une particule très rapide traversant de l'azote, et celui d'une molécule d'azote parmi ses semblables ?",
        options: { a: "1/(√2 n₀σ_c) pour les deux : le facteur √2 vient du gaz.", b: "1/(n₀σ_c) pour les deux : (43.11) est générale.", c: "1/(√2 n₀σ_c) pour la particule rapide, 1/(n₀σ_c) pour la molécule.", d: "1/(n₀σ_c) pour la particule rapide, dont les cibles semblent immobiles ; 1/(√2 n₀σ_c) pour la molécule, dont les cibles bougent autant qu'elle." },
        hint: "La fréquence des chocs suit la vitesse relative ; la longueur parcourue suit la vitesse propre.",
        why: "Pour la particule rapide, vitesse relative et vitesse propre se confondent : l = 1/(n₀σ_c), (43.11). Entre molécules identiques de Maxwell, la vitesse relative moyenne est √2 ⟨v⟩ : les chocs sont √2 fois plus fréquents pour la même distance. Leçon « Le libre parcours moyen »." },
      ion: { prompt: "Un ion de masse 4,65 × 10⁻²⁶ kg et de charge e, avec τ = 0,14 ns, est soumis à un champ de 1,0 × 10⁴ V·m⁻¹. Que vaut sa vitesse de dérive selon (43.13), et peut-on la croire proportionnelle au champ ?",
        options: { a: "4,8 m·s⁻¹ ; oui, car elle reste 100 fois plus petite que l'agitation thermique, 470 m·s⁻¹.", b: "2,4 m·s⁻¹ ; oui.", c: "470 m·s⁻¹ ; non, l'ion va aussi vite que l'agitation.", d: "4,8 × 10⁻⁴ m·s⁻¹ ; oui." },
        hint: "v = eEτ/m, puis comparez à ⟨v⟩.",
        why: "v = 1,602 × 10⁻¹⁹ × 10⁴ × 1,4 × 10⁻¹⁰/4,65 × 10⁻²⁶ ≈ 4,8 m·s⁻¹. Le rapport à ⟨v⟩ vaut 0,01 : la force ne change pas τ, la mobilité est constante. 2,4 m·s⁻¹ est la moitié tentante ; 4,8 × 10⁻⁴ m²·V⁻¹·s⁻¹ est la mobilité, pas la vitesse. Leçon « La vitesse de dérive »." },
      reguliers: { prompt: "Dans un modèle où les chocs arrivent exactement tous les τ et effacent la vitesse acquise, quelle est la vitesse moyenne d'une molécule soumise à une force F ?",
        options: { a: "Fτ/m, comme (43.13).", b: "Fτ/2m : la vitesse croît de 0 à Fτ/m pendant chaque vol de même durée.", c: "2Fτ/m.", d: "Zéro : les chocs effacent tout." },
        hint: "Tous les vols ont la même durée : la moyenne sur un vol est la moyenne sur le temps.",
        why: "Pour des vols égaux, la vitesse gagnée vaut en moyenne la moitié de Fτ/m. C'est l'argument que Feynman rejette pour un gaz, où les vols sont exponentiels : ⟨t²⟩/(2⟨t⟩) = τ au lieu de τ/2. Leçons « La vitesse de dérive » et « Collisions entre molécules »." },
      lourd: { prompt: "Un ion de 40 u dérive dans de l'hélium (4 u). Les chocs sont élastiques, isotropes dans le référentiel du centre de masse, de fréquence 1/τ. Que vaut sa dérive, en unités de Fτ/M ?",
        options: { a: "1 : (43.13) vaut pour toute masse.", b: "1/10 : l'hélium est dix fois plus léger.", c: "11 : il garde 10/11 de sa vitesse à chaque choc, la dérive vaut Fτ/m_r avec m_r = M m/(M + m).", d: "2, comme à masses égales." },
        hint: "Calculez la masse réduite.",
        why: "m_r = 40 × 4/44 u = M/11, donc v = 11 Fτ/M. Un ion lourd parmi des atomes légers ne repart pas à neuf : il lui faut onze chocs en moyenne pour oublier sa vitesse. Leçon « La vitesse de dérive »." },
      dilue: { prompt: "Pour appliquer (43.11) à l'air à 101 325 Pa, quel nombre sans dimension faut-il vérifier petit, et que vaut-il ?",
        options: { a: "Le nombre de Knudsen l/L, environ 10⁻⁸ dans une pièce.", b: "Le rapport v_d/⟨v⟩ de la dérive à l'agitation.", c: "Le rapport τ/T du temps entre chocs à la durée d'observation.", d: "n₀d³, de l'ordre de 10⁻³ : la fraction du volume occupée par les molécules, qui mesure aussi la part des chocs à trois." },
        hint: "(43.11) suppose des cibles ponctuelles en apparence, et des chocs à deux.",
        why: "(43.11) compte des cibles indépendantes dans un gaz dilué. Avec d = 0,37 nm et n₀ = 2,5 × 10²⁵ m⁻³, n₀d³ ≈ 1,3 × 10⁻³. Kn petit dit autre chose : que les molécules se heurtent entre elles plus que contre les parois. Leçons « Le libre parcours moyen » et « Collisions entre molécules »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

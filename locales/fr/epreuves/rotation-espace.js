/* Épreuve de l'étape « Rotation dans l'espace et gyroscope » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      cle: { prompt: "Une clé est posée le long de l'axe x ; on pousse en (0,2 ; 0 ; 0)\u00a0m avec une force (0 ; 30 ; 40)\u00a0N. La vis est portée par l'axe z. Quel moment la serre, et quel moment la fléchit ?",
        options: { a: "6\u00a0N·m la serrent, 8\u00a0N·m la fléchissent.", b: "10\u00a0N·m la serrent : la norme du moment.", c: "8\u00a0N·m la serrent, 6\u00a0N·m la fléchissent.", d: "14\u00a0N·m la serrent : la somme des deux moments plans." },
        hint: "Calculez r ∧ F, puis projetez sur l'axe de la vis.",
        why: "r ∧ F = (0 ; \u22120,2 × 40 ; 0,2 × 30) = (0 ; \u22128 ; 6)\u00a0N·m. Seule la composante sur l'axe de la vis, 6\u00a0N·m, fait tourner l'écrou ; les 8\u00a0N·m autour de y fléchissent la vis. Leçon « Moments de force en trois dimensions »." },
      miroir: { prompt: "Dans un miroir qui renverse tout par rapport à O, la position et la vitesse d'un point changent de signe. Que fait son moment cinétique ?",
        options: { a: "Il change de signe, comme tout vecteur.", b: "Il ne change pas : produit vectoriel de deux vecteurs qui changent tous deux de signe, c'est un vecteur axial.", c: "Il s'annule.", d: "Il devient parallèle à la vitesse." },
        hint: "Changez le signe de r et celui de v dans r ∧ m v.",
        why: "(\u2212r) ∧ m(\u2212v) = r ∧ m v. Moment de force, moment cinétique et vitesse angulaire sont des vecteurs axiaux : leur sens tient à la règle de la main droite. C'est cette différence qu'a mise à l'épreuve l'expérience de Wu sur la désintégration bêta. Leçon « Moments de force en trois dimensions »." },
      ordre: { prompt: "On tourne un solide de 10° autour de x puis de 10° autour de y, et l'on recommence dans l'autre ordre. De quel angle environ les deux positions finales diffèrent-elles ?",
        options: { a: "De 20°, la somme des deux angles.", b: "De rien : de petites rotations commutent exactement.", c: "D'environ 1,7° : de l'ordre de α², avec α = 0,17\u00a0rad.", d: "De 10°, l'angle d'une rotation." },
        hint: "L'écart entre les deux ordres est d'un ordre plus petit que les rotations elles-mêmes.",
        why: "Pour deux rotations égales autour d'axes perpendiculaires, l'écart vaut à peu près α². α = 10° = 0,175\u00a0rad, α² = 0,030\u00a0rad, soit 1,7°. Les rotations finies ne s'additionnent pas comme des vecteurs ; les vitesses angulaires, rotations infinitésimales, si. Leçon « Les équations de la rotation en produit vectoriel »." },
      puissance: { prompt: "Un volant tourne à 50\u00a0rad·s⁻¹ autour d'un axe vertical. Un point de sa jante est à 0,4\u00a0m de l'axe. Un moteur exerce un moment de 20\u00a0N·m le long de l'axe. Vitesse du point et puissance reçue ?",
        options: { a: "20\u00a0m·s⁻¹ et 400\u00a0W.", b: "50\u00a0m·s⁻¹ et 20\u00a0W.", c: "2\u00a0m·s⁻¹ et 1\u00a0000\u00a0W.", d: "20\u00a0m·s⁻¹ et 1\u00a0000\u00a0W." },
        hint: "La vitesse d'un point vaut ω fois sa distance à l'axe ; la puissance est le produit scalaire du moment et de ω.",
        why: "|ω ∧ r| = ω × distance à l'axe = 50 × 0,4 = 20\u00a0m·s⁻¹. P = M · ω = 20 × 50 = 1\u00a0000\u00a0W, le moment étant le long de ω. Leçon « Les équations de la rotation en produit vectoriel »." },
      roue: { prompt: "Une roue de vélo (I₃ = 0,18\u00a0kg·m², 2\u00a0kg) tourne à 30\u00a0rad·s⁻¹. On la suspend par un bout de son axe horizontal, son centre à 0,15\u00a0m du point d'attache. Quelle est sa vitesse de précession, et la formule est-elle fiable ?",
        options: { a: "Environ 0,55\u00a0rad·s⁻¹ ; fiable, car ε = I₁Mgd/(I₃ω)² vaut environ 0,01.", b: "Environ 0,55\u00a0rad·s⁻¹ ; pas fiable, car l'axe est horizontal.", c: "Environ 5,4\u00a0rad·s⁻¹ ; fiable.", d: "Zéro : une roue suspendue par un bout tombe." },
        hint: "Ω = Mgd/(I₃ω) ; le moment d'inertie autour du point d'attache vaut I₁ = I₃/2 + Md².",
        why: "Ω = 2 × 9,81 × 0,15/(0,18 × 30) ≈ 0,55\u00a0rad·s⁻¹, un tour en 11\u00a0s. I₁ = 0,09 + 2 × 0,15² = 0,135\u00a0kg·m², et ε = 0,135 × 2,94/5,4² ≈ 0,014 : la précession moyenne et la nutation, de l'ordre de ε, sont petites. Leçon « Le gyroscope »." },
      epsilon: { prompt: "On fait tourner une toupie deux fois plus vite. Que deviennent sa vitesse de précession et le paramètre ε qui mesure la qualité de la formule Ω = Mgd/(I₃ω) ?",
        options: { a: "Ω double, ε double.", b: "Ω est divisée par deux, ε par quatre : la formule devient plus précise.", c: "Ω est divisée par deux, ε ne change pas.", d: "Ω et ε ne changent pas : ils ne dépendent que de la masse et de d." },
        hint: "Ω varie comme 1/ω, ε comme 1/ω².",
        why: "Ω est inversement proportionnelle à ω ; ε = I₁Mgd/(I₃ω)² l'est à ω². L'amplitude de la nutation, environ 2ε sin θ₀, est divisée par quatre. C'est pourquoi une toupie lente plonge et une toupie rapide précesse régulièrement. Leçon « Le gyroscope »." },
      paliers: { prompt: "Un haltère de deux masses de 1\u00a0kg à 0,2\u00a0m de son centre est incliné de 45° sur un arbre qui tourne à 10\u00a0rad·s⁻¹. Quel moment fournissent les paliers, et que devient-il à 20\u00a0rad·s⁻¹ ?",
        options: { a: "Aucun : le centre de masse est sur l'arbre.", b: "4\u00a0N·m, puis 8\u00a0N·m : proportionnel à ω.", c: "4\u00a0N·m, puis 16\u00a0N·m : proportionnel à ω².", d: "0,4\u00a0N·m, constant : il ne dépend que de l'inclinaison." },
        hint: "Le moment des paliers vaut ω ∧ L, avec L proportionnel à ω ; pour l'haltère, m a² ω² sin 2α.",
        why: "m a² ω² sin 2α = 1 × 0,04 × 100 × 1 = 4\u00a0N·m à 10\u00a0rad·s⁻¹, quatre fois plus à 20\u00a0rad·s⁻¹. Un centre de masse sur l'axe annule la force résultante, pas le couple : L n'est pas le long de l'arbre et tourne avec lui. Leçon « Moment cinétique d'un solide quelconque »." },
      satellite: { prompt: "Un satellite libre, sans moment extérieur, tourne autour de son axe de plus petit moment d'inertie. Il dissipe un peu d'énergie par ses parties souples. Vers quoi évolue-t-il ?",
        options: { a: "Vers l'arrêt complet de sa rotation.", b: "Vers une rotation autour de l'axe intermédiaire.", c: "Vers une rotation plus rapide autour du même axe.", d: "Vers une rotation autour de l'axe de plus grand moment d'inertie, à moment cinétique inchangé." },
        hint: "Sans moment extérieur, L est fixé ; l'énergie d'une rotation autour d'un axe principal vaut L²/(2I).",
        why: "L se conserve, l'énergie L²/(2I) diminue : elle est la plus basse pour le plus grand I. La rotation autour de l'axe intermédiaire est instable, celle autour du plus petit axe ne résiste pas à la dissipation. C'est le cas d'Explorer 1. Leçon « Moment cinétique d'un solide quelconque »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

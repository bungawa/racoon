/* Épreuve de l'étape « Équations de Maxwell » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      ampere: { prompt: "Pourquoi Maxwell a-t-il dû compléter la loi ∇ ∧ B = j/(ε0c²), établie pour des courants permanents ?",
        options: { a: "Parce que la divergence d'un rotationnel est nulle : cette loi impose ∇ · j = 0, ce qui interdit à la charge de s'accumuler ou de partir d'un endroit.", b: "Parce qu'elle donnait un champ magnétique trop faible autour des fils.", c: "Parce qu'elle ne respectait pas la loi de Coulomb.", d: "Parce qu'elle ne valait pas dans le vide." },
        hint: "Prenez la divergence des deux membres.",
        why: "∇ · (∇ ∧ B) = 0 impose ∇ · j = 0, alors que la conservation de la charge dit ∇ · j = \u2212∂ρ/∂t. Le terme ∂E/∂t lève la contradiction. Leçon « Les équations de Maxwell »." },
      conservation: { prompt: "Laquelle de ces lois découle des équations de Maxwell complètes, sans qu'il faille la poser à part ?",
        options: { a: "La loi de Faraday.", b: "La conservation de la charge.", c: "La force de Lorentz.", d: "La loi du mouvement dp/dt = F." },
        why: "La divergence de la quatrième équation, avec la loi de Gauss ∇ · E = ρ/ε0, redonne ∇ · j + ∂ρ/∂t = 0 : (18.3) et (18.4) de « Les équations de Maxwell ». Le tableau de la physique classique est donc un peu redondant." },
      tranche: { prompt: "Une tranche de charge avance entre deux grandes plaques parallèles. En un point, la densité de courant vaut 0,3\u00a0µA·m⁻². Que vaut le courant de déplacement ε0 ∂E/∂t au même point ?",
        options: { a: "Zéro : la tranche ne contient pas de condensateur.", b: "+0,3\u00a0µA·m⁻² : il double le courant.", c: "\u22120,3\u00a0µA·m⁻² : la symétrie impose B = 0, donc j + ε0 ∂E/∂t = 0.", d: "On ne peut pas le dire sans connaître la charge totale." },
        why: "Par symétrie, B ne peut pas choisir de direction dans le plan des plaques : B = 0, et (18.1a) demande j + ε0 ∂E/∂t = 0 en chaque point. Leçon « Les équations de Maxwell »." },
      sphere: { prompt: "Une petite sphère perd sa charge par un courant radial, le même dans toutes les directions. Que vaut le champ magnétique autour d'elle ?",
        options: { a: "μ0 I/(4πr), dirigé vers l'extérieur.", b: "Il tourne autour de la direction de chaque rayon.", c: "Il dépend du cercle qu'on choisit pour appliquer le théorème d'Ampère.", d: "Zéro : le courant j et le terme ε0 ∂E/∂t s'annulent en chaque point." },
        why: "La charge intérieure diminue, donc E aussi : ∂E/∂t = \u2212j/ε0, (18.7). Le second membre de (18.1a) est nul partout, et la symétrie interdit d'ailleurs à B de choisir un sens. Leçon « Comment fonctionne le nouveau terme »." },
      condensateur: { prompt: "Un condensateur à armatures circulaires de 4\u00a0cm de rayon est chargé par un courant de 0,5\u00a0A. Que vaut B sur un cercle de 2\u00a0cm de rayon centré sur l'axe, entre les armatures ?",
        options: { a: "1,25\u00a0µT.", b: "5\u00a0µT.", c: "2,5\u00a0µT.", d: "Zéro : aucun courant ne traverse le cercle." },
        hint: "Le cercle n'enlace que la fraction r²/R² du courant de déplacement ; μ0/(2π) = 2 × 10⁻⁷\u00a0T·m·A⁻¹.",
        why: "Courant de déplacement enlacé : 0,5 × (2/4)² = 0,125\u00a0A. B = 2 × 10⁻⁷ × 0,125/0,02 = 1,25 × 10⁻⁶\u00a0T. Leçon « Comment fonctionne le nouveau terme »." },
      surfaces: { prompt: "Un cercle entoure le fil qui charge un condensateur. Pour appliquer (18.1a), on prend une poche qui s'appuie sur ce cercle et passe entre les armatures, au-delà de leur bord. Qu'est-ce qui donne le champ B sur le cercle ?",
        options: { a: "Le courant du fil, qui traverse la poche.", b: "Le flux du champ électrique à travers la poche, qui change à la vitesse I/ε0.", c: "Rien : B est nul sur ce cercle.", d: "La moitié du courant et la moitié du flux." },
        why: "La poche n'est traversée par aucun courant, mais par tout le flux de E, Q/ε0, qui change à la vitesse I/ε0. (18.1a) donne le même B qu'avec le disque plan traversé par I. Leçon « Comment fonctionne le nouveau terme »." },
      classique: { prompt: "Lequel de ces systèmes sort du tableau de la physique classique (Maxwell, Lorentz, dp/dt = F avec p = γmv, Newton) ?",
        options: { a: "La trajectoire d'un satellite GPS.", b: "Un proton de 6,8\u00a0TeV dans l'anneau du LHC.", c: "Un électron de conduction dans le cuivre.", d: "Un pendule de 1\u00a0kg." },
        hint: "Comparez la longueur d'onde h/p du corps à la taille de son mouvement.",
        why: "Pour l'électron du cuivre, λ/L ≈ 2 : pas de trajectoire, la mécanique quantique est nécessaire. Le proton du LHC est très relativiste, mais p = γmv est dans le tableau. Leçon « Toute la physique classique »." },
      gravitation: { prompt: "Quelle ligne du tableau de la physique classique la relativité a-t-elle obligé à remplacer ?",
        options: { a: "La loi de Gauss.", b: "La force de Lorentz.", c: "La quatrième équation de Maxwell.", d: "La gravitation de Newton, qui agit instantanément à distance." },
        why: "Les équations de Maxwell sont déjà relativistes, et la loi du mouvement l'est devenue par p = γmv. La gravitation de Newton, instantanée, a été remplacée par celle d'Einstein, qui explique les 43 secondes d'arc par siècle du périhélie de Mercure. Leçon « Toute la physique classique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

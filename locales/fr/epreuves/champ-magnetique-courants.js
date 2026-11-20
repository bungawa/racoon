/* Épreuve de l'étape « Champ magnétique et courants » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lancer: { prompt: "En un point, une charge d'essai au repos subit une force F0. Lancée selon l'axe x, elle subit exactement la même force F0. Qu'en conclure sur le champ magnétique en ce point ?",
        options: { a: "Il est parallèle à l'axe x, ou nul : un second lancer, dans une autre direction, tranchera.", b: "Il est nul, sans autre mesure.", c: "Il est perpendiculaire à l'axe x.", d: "Il est égal à F0 divisée par la charge." },
        hint: "Quelle composante de B ne produit aucune force sur une charge lancée selon x ?",
        why: "La force magnétique q v ∧ B ne voit que la partie de B normale à v. Une force inchangée dit que cette partie est nulle : B est parallèle à x, ou nul. F0/q, c'est E. Leçon « Le champ magnétique »." },
      terre: { prompt: "Un électron file à 10⁷ m·s⁻¹ perpendiculairement au champ terrestre, 50\u00a0µT. Quelle force magnétique subit-il, comparée à son poids (environ 9 × 10⁻³⁰ N) ?",
        options: { a: "8 × 10⁻²⁴ N, un million de fois son poids.", b: "8 × 10⁻¹⁷ N, de l'ordre de 10¹³ fois son poids.", c: "8 × 10⁻¹² N, 10¹⁸ fois son poids.", d: "Zéro : le champ terrestre ne dévie pas les électrons." },
        hint: "|q| v B = 1,6 × 10⁻¹⁹ × 10⁷ × 5 × 10⁻⁵.",
        why: "e v B = 8 × 10⁻¹⁷ N. Le poids est négligeable de treize ordres de grandeur : pour une particule chargée rapide, même le faible champ terrestre domine la pesanteur. Leçon « Le champ magnétique »." },
      sens: { prompt: "Un électron se déplace selon +x dans un champ magnétique dirigé selon +y. Dans quel sens est la force magnétique ?",
        options: { a: "Selon +z.", b: "Selon +y, le long du champ.", c: "Selon \u2212z.", d: "Elle est nulle." },
        why: "x ∧ y = z : pour une charge positive, la force serait selon +z. La charge de l'électron est négative : la force est selon \u2212z. Leçon « Le champ magnétique »." },
      derive: { prompt: "Un fil d'aluminium de 2\u00a0mm² porte 10\u00a0A. L'aluminium a 1,81 × 10²⁹ électrons libres par mètre cube. Quelle est la vitesse de dérive ?",
        options: { a: "Environ 0,17\u00a0m·s⁻¹.", b: "Environ 1,7\u00a0mm·s⁻¹.", c: "Environ 10⁶ m·s⁻¹.", d: "Environ 0,17\u00a0mm·s⁻¹." },
        hint: "v = I/(N e S).",
        why: "10/(1,81 × 10²⁹ × 1,6 × 10⁻¹⁹ × 2 × 10⁻⁶) ≈ 1,7 × 10⁻⁴ m·s⁻¹. Trois électrons libres par atome rendent la dérive plus lente que dans le cuivre à densité de courant égale. Leçon « Courant électrique et conservation de la charge »." },
      continuite: { prompt: "En un point d'un milieu conducteur, la densité de charge diminue de 2\u00a0C·m⁻³ par seconde. Que vaut la divergence de la densité de courant ?",
        options: { a: "+2\u00a0A·m⁻³ : il sort de ce point plus de charge qu'il n'en entre.", b: "\u22122\u00a0A·m⁻³.", c: "Zéro, car la charge se conserve.", d: "On ne peut rien dire sans connaître j." },
        why: "L'équation de continuité donne ∇ · j = \u2212∂ρ/∂t = +2\u00a0A·m⁻³. La conservation n'interdit pas à ρ de varier ; elle exige que toute variation soit portée par un courant. Leçon « Courant électrique et conservation de la charge »." },
      armature: { prompt: "Un fil apporte un courant de 3 mA à une armature de condensateur. On entoure l'armature d'une surface fermée que seul ce fil traverse. Que fait la charge contenue ?",
        options: { a: "Elle reste constante : la charge se conserve.", b: "Elle augmente de 3 mC par seconde.", c: "Elle diminue de 3 mC par seconde.", d: "Elle augmente, mais on ne peut pas dire de combien sans la capacité." },
        hint: "Le flux sortant de j à travers la surface vaut \u22123 mA.",
        why: "Flux sortant = \u2212dQ/dt, donc dQ/dt = +3 mA = 3 mC par seconde. La loi des nœuds ne s'applique pas ici : la charge de l'armature change. Leçon « Courant électrique et conservation de la charge »." },
      fil: { prompt: "Un fil droit de 50\u00a0cm, parcouru par 8\u00a0A, est perpendiculaire à un champ uniforme de 0,25\u00a0T. Quelle force subit-il ?",
        options: { a: "0,25\u00a0N.", b: "2\u00a0N.", c: "1\u00a0N.", d: "Zéro, car le fil est neutre." },
        why: "F = I L B = 8 × 0,5 × 0,25 = 1\u00a0N. Le fil est neutre, mais ses électrons mobiles se déplacent : la force s'exerce sur eux et passe au métal. Leçon « Force magnétique sur un courant »." },
      arc: { prompt: "Un fil en demi-cercle de 30\u00a0cm de diamètre porte 2\u00a0A dans un champ uniforme de 0,5\u00a0T, perpendiculaire au plan du fil. Quelle force totale subit-il ?",
        options: { a: "0,47\u00a0N : la longueur du demi-cercle, π × 15\u00a0cm, fois I B.", b: "Zéro : les deux moitiés se compensent.", c: "0,15\u00a0N : la moitié de la force sur le diamètre.", d: "0,3\u00a0N : la force sur un fil droit qui joindrait ses extrémités." },
        hint: "En champ uniforme, seule compte la corde entre les extrémités.",
        why: "F = I × (corde) × B = 2 × 0,3 × 0,5 = 0,3\u00a0N. La longueur en plus du demi-cercle est compensée par les directions : les forces des deux moitiés ont, le long du diamètre, des composantes opposées qui s'annulent. Leçon « Force magnétique sur un courant »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

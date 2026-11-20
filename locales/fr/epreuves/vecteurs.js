/* Épreuve de l'étape « Vecteurs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      vent: { prompt: "Un avion vole plein nord à 60\u00a0m·s⁻¹ par rapport à l'air ; le vent souffle vers l'est à 15\u00a0m·s⁻¹. On lit ensuite sa vitesse par rapport au sol dans des axes tournés de 30°. Quelle norme trouve-t-on ?",
        options: { a: "75\u00a0m·s⁻¹ : on additionne les deux vitesses.", b: "Environ 62\u00a0m·s⁻¹, dans les axes d'origine comme dans les axes tournés.", c: "Environ 62\u00a0m·s⁻¹ dans les axes d'origine, 62 cos 30° ≈ 54\u00a0m·s⁻¹ dans les axes tournés.", d: "45\u00a0m·s⁻¹ : le vent de travers retranche sa vitesse." },
        hint: "Additionnez les vecteurs composante par composante, puis demandez-vous si une longueur dépend des axes.",
        why: "Les composantes s'additionnent : (15 ; 60)\u00a0m·s⁻¹, de norme √(15² + 60²) ≈ 61,8\u00a0m·s⁻¹. Tourner les axes change les composantes, pas la norme, qui est un scalaire. L'addition vient de la leçon « Algèbre des vecteurs », l'invariance de la longueur de la leçon « Vecteurs »." },
      travail: { prompt: "Une luge avance de 10\u00a0m en ligne droite. Deux cordes la tirent à angle droit l'une de l'autre : 4\u00a0N dans le sens du déplacement, 3\u00a0N perpendiculairement. Quel travail fournissent-elles ensemble ?",
        options: { a: "70\u00a0J : (3 + 4)\u00a0N sur 10\u00a0m.", b: "50\u00a0J : la résultante vaut 5\u00a0N, multipliée par 10\u00a0m.", c: "40\u00a0J : seule la composante de la résultante le long du déplacement travaille.", d: "0\u00a0J : les deux forces se compensent en partie." },
        hint: "Calculez la résultante, puis son produit scalaire avec le déplacement.",
        why: "La résultante vaut 5\u00a0N, et non 7\u00a0N, mais elle fait avec le déplacement un angle de cosinus 4/5 : W = 5 × 10 × 0,8 = 40\u00a0J. La force perpendiculaire ne travaille pas. Somme de vecteurs : leçon « Algèbre des vecteurs » ; travail comme produit scalaire : leçon « Produit scalaire »." },
      nature: { prompt: "Laquelle de ces égalités ne peut être vraie que dans une base particulière, ce qui signale une erreur ?",
        options: { a: "F = k r, entre deux vecteurs, avec k un scalaire.", b: "Ec = ½ m v · v, avec un produit scalaire.", c: "P = F · v, puissance d'une force.", d: "Ec = ½ m vx², avec la seule composante x de la vitesse." },
        hint: "Chaque membre doit être de même nature : scalaire avec scalaire, vecteur avec vecteur.",
        why: "Une composante dépend des axes ; une énergie, non. ½ m vx² n'égale l'énergie cinétique que si la vitesse est portée par x. Les trois autres égalités relient deux vecteurs, ou deux scalaires indépendants des axes : elles valent dans toute base orthonormée. Leçons « Vecteurs » et « Produit scalaire »." },
      referentiel: { prompt: "Une balle de 0,2\u00a0kg est immobile dans un train qui roule à 30\u00a0m·s⁻¹. Un observateur sur le quai calcule son énergie cinétique, puis refait le calcul après avoir tourné ses axes de 45°. Qu'obtient-il ?",
        options: { a: "90\u00a0J les deux fois.", b: "0\u00a0J les deux fois : la balle est immobile.", c: "90\u00a0J, puis 45\u00a0J, car une seule composante reste.", d: "90\u00a0J, puis 64\u00a0J, soit 90 cos 45°." },
        hint: "Distinguez changer de base et changer de référentiel.",
        why: "Pour le quai, la balle va à 30\u00a0m·s⁻¹ : Ec = ½ × 0,2 × 30² = 90\u00a0J. Tourner les axes change la base, et un produit scalaire v · v n'en dépend pas. C'est le changement de référentiel, vers le train, qui donnerait 0\u00a0J. Leçons « Produit scalaire » et « Vecteurs »." },
      systeme: { prompt: "On compose la vitesse d'un avion léger, 60\u00a0m·s⁻¹ par rapport à l'air, et celle d'un vent uniforme de 15\u00a0m·s⁻¹, sur un trajet de 200\u00a0km. Qu'est-ce que cette somme néglige, chiffré ?",
        options: { a: "La rotation de la Terre, qui change le résultat de quelques pour cent.", b: "(v/c)², environ 6 × 10⁻¹⁴, et la taille de l'avion, 5 × 10⁻⁵ du trajet : la somme est sûre tant que le vent garde sa direction.", c: "Rien : l'addition de deux vecteurs est une définition, elle ne néglige jamais rien.", d: "La taille de l'avion, comparable au trajet : il faut suivre chaque point de l'appareil." },
        hint: "Formez des nombres sans dimension : vitesse contre c, taille contre trajet.",
        why: "La somme est une définition, mais l'appliquer à deux référentiels, c'est la composition de Galilée, fausse au niveau de (v/c)² ≈ 6 × 10⁻¹⁴. Dix mètres d'avion sur 200\u00a0km font 5 × 10⁻⁵ ; l'effet de Coriolis vaut environ 10⁻³ du poids, pas quelques pour cent. Ce qui ne se néglige pas, c'est un vent qui tourne le long du trajet : on somme alors tronçon par tronçon. Leçons « Algèbre des vecteurs » et « Vecteurs »." },
      validite: { prompt: "La tension d'une corde varie le long d'un trajet courbe de la luge. Laquelle de ces écritures cesse alors de valoir ?",
        options: { a: "La puissance de la corde, P = F · v, à chaque instant.", b: "L'énergie cinétique, Ec = ½ m v · v.", c: "Le travail W = F · Δr, avec Δr le déplacement total.", d: "Aucune : un produit scalaire vaut dans toute base." },
        hint: "Laquelle suppose une force constante et un déplacement rectiligne ?",
        why: "W = F · Δr suppose une force constante sur un déplacement rectiligne ; sinon on somme les petits travaux F · dr le long du chemin. La puissance F · v, elle, est exacte à chaque instant, avec la vitesse, dérivée du vecteur position. Ne pas dépendre de la base ne dit rien de ce domaine. Leçons « Produit scalaire » et « Algèbre des vecteurs »." },
      perpendiculaire: { prompt: "Une voiture prend un virage en gardant constante la norme de sa vitesse. Que dit le produit scalaire sur son accélération ?",
        options: { a: "Elle est nulle, puisque la norme de la vitesse ne change pas.", b: "Elle est parallèle à la vitesse, comme toute dérivée de la vitesse.", c: "On ne peut rien dire sans choisir des axes et calculer les composantes.", d: "v · v est constant, donc 2 v · a = 0 : l'accélération est perpendiculaire à la vitesse." },
        hint: "Dérivez v · v par rapport au temps.",
        why: "La dérivée du vecteur vitesse n'est pas nulle : sa direction tourne. Comme d(v · v)/dt = 2 v · dv/dt = 0, l'accélération est perpendiculaire à la vitesse, et la puissance de la force qui fait tourner est nulle. Dérivée d'un vecteur : leçon « Algèbre des vecteurs » ; dérivée de v · v : leçon « Produit scalaire »." },
      rotation: { prompt: "On tourne un livre de 90° autour de x puis de 90° autour de y, et l'on recommence dans l'ordre inverse : il finit dans deux positions différentes. Qu'est-ce que cela montre ?",
        options: { a: "Qu'une rotation finie n'est pas un vecteur : la somme de deux vecteurs, faite composante par composante, ne dépend pas de l'ordre.", b: "Que la somme de deux vecteurs dépend de l'ordre quand ils sont perpendiculaires.", c: "Qu'un angle doit être exprimé en radians pour former un vecteur.", d: "Que les lois de la mécanique dépendent de l'orientation des axes." },
        hint: "Comparez avec a + b et b + a.",
        why: "Additionner des vecteurs revient à additionner des nombres, et a + b = b + a. La composition des rotations finies n'est pas commutative : avoir un axe et un angle, donc une direction et une grandeur, ne suffit pas à faire un vecteur ; il faut la règle de transformation. Leçons « Vecteurs » et « Algèbre des vecteurs »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

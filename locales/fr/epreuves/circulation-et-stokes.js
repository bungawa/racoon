/* Épreuve de l'étape « Circulation et théorème de Stokes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      riviere: { prompt: "Une rivière de 20\u00a0m de large coule à 1\u00a0m·s⁻¹ au milieu, avec un profil parabolique nul sur les berges. Que vaut la circulation de la vitesse de surface sur un cercle de rayon 2\u00a0m centré à 5\u00a0m de l'axe, parcouru dans le sens trigonométrique, du côté où y > 0 ?",
        options: { a: "0 : l'eau va tout droit, elle ne tourne pas.", b: "12,6\u00a0m²·s⁻¹ : la vitesse au centre du cercle fois son périmètre.", c: "Environ 1,26\u00a0m²·s⁻¹ : le rotationnel 2v₀y/b² = 0,1\u00a0s⁻¹ fois l'aire π × 2².", d: "Environ \u22121,26\u00a0m²·s⁻¹ : le haut du cercle est parcouru contre le courant." },
        hint: "Calculez le rotationnel \u2212∂v/∂y au centre, puis utilisez le théorème de Stokes ; le rotationnel varie linéairement en y.",
        why: "Avec v = v₀(1 \u2212 y²/b²), le rotationnel vaut 2v₀y/b² = 2 × 1 × 5/100 = 0,1\u00a0s⁻¹ au centre du cercle. Il est linéaire en y : sa moyenne sur le disque est sa valeur au centre, et Stokes donne 0,1 × 4π ≈ 1,26\u00a0m²·s⁻¹. Le bas du cercle, dans l'eau plus rapide, l'emporte sur le haut. Leçons « La circulation d'un champ de vecteurs » et « Circulation autour d'un carré : théorème de Stokes »." },
      carre: { prompt: "Dans des rouleaux de convection de nombre d'onde k = 314\u00a0m⁻¹, on estime le rotationnel au centre d'un carré de côté a = 0,64\u00a0mm par la circulation divisée par l'aire. Quelle erreur relative attendre ?",
        options: { a: "Environ 3 × 10⁻³ : (ka)²/12 avec ka ≈ 0,2.", b: "Environ 0,2 : ka lui-même.", c: "Environ 4 × 10⁻² : (ka)².", d: "Aucune : la relation est exacte pour un carré." },
        hint: "Pour un carré centré, les termes d'ordre impair du développement s'annulent.",
        why: "ka = 314 × 0,64 × 10⁻³ ≈ 0,2. Pour ces rouleaux, le rapport exact est (sin(ka/2)/(ka/2))² ≈ 1 \u2212 (ka)²/12, soit une erreur de 3,3 × 10⁻³. L'erreur est en (a/L)², pas en a/L, parce que le carré est centré. Leçon « Circulation autour d'un carré : théorème de Stokes »." },
      bloc: { prompt: "Un liquide tourne en bloc à ω = 0,5\u00a0rad·s⁻¹. Quelle est la circulation de sa vitesse sur un cercle de rayon 0,3\u00a0m qui n'entoure pas l'axe de rotation ?",
        options: { a: "0, puisque le cercle n'entoure pas l'axe.", b: "ωπR² ≈ 0,14\u00a0m²·s⁻¹.", c: "2πRωR ≈ 0,28\u00a0m²·s⁻¹ seulement si le cercle est centré sur l'axe, 0 sinon.", d: "2ωπR² ≈ 0,28\u00a0m²·s⁻¹, où que soit le cercle." },
        why: "Le rotationnel d'une rotation en bloc vaut 2ω = 1\u00a0s⁻¹ en tout point. Par Stokes, la circulation est 2ω fois l'aire, π × 0,09 ≈ 0,28\u00a0m²·s⁻¹, sans dépendre de la position du cercle. Leçons « La circulation d'un champ de vecteurs » et « Circulation autour d'un carré : théorème de Stokes »." },
      tourbillon: { prompt: "Un tourbillon ponctuel a une vitesse Γ/(2πr) autour de son centre, avec Γ = 20\u00a0m²·s⁻¹. Lequel de ces énoncés est exact ?",
        options: { a: "Son rotationnel étant nul partout où il est défini, sa circulation est nulle sur toute boucle.", b: "Sa circulation vaut 20\u00a0m²·s⁻¹ sur toute boucle qui entoure le centre une fois, et 0 sur toute boucle qui ne l'entoure pas.", c: "Sa circulation sur un cercle centré croît avec le rayon.", d: "Il est le gradient d'une fonction continue sur tout le plan privé du centre." },
        hint: "Le théorème de Stokes demande un champ défini sur toute la surface bordée par la boucle.",
        why: "Sur un cercle centré, la vitesse Γ/(2πr) fois le périmètre 2πr donne Γ, quel que soit r. Une boucle qui entoure le centre ne borde aucune surface sans ce point : Stokes ne s'y applique pas. Le candidat potentiel, Γθ/(2π), saute de Γ à chaque tour. Leçon « Champs irrotationnels et champs à flux conservatif »." },
      identites: { prompt: "Pour des champs deux fois dérivables de dérivées continues, laquelle de ces expressions est toujours nulle ?",
        options: { a: "∇ · (∇ ∧ A), la divergence d'un rotationnel.", b: "∇ · (∇φ), la divergence d'un gradient.", c: "∇ ∧ (∇ ∧ A), le rotationnel d'un rotationnel.", d: "∇(∇ · A), le gradient d'une divergence." },
        why: "Stokes donne un flux du rotationnel nul à travers toute surface fermée, Gauss en fait l'intégrale de ∇ · (∇ ∧ A) sur tout volume : elle est nulle partout. La divergence d'un gradient est le laplacien, en général non nul. Leçons « Champs irrotationnels et champs à flux conservatif » et « Bilan de l'analyse vectorielle »." },
      flux: { prompt: "Une spire circulaire est traversée par un champ magnétique. On calcule son flux à travers le disque plat qu'elle borde, puis à travers une demi-sphère qui s'appuie sur elle, avec des normales orientées par la même règle. Que trouve-t-on ?",
        options: { a: "Deux flux différents, dans le rapport des aires.", b: "Deux flux opposés.", c: "Le même flux, parce que ∇ · B = 0 : les deux surfaces forment une surface fermée de flux sortant nul.", d: "Un flux nul à travers la demi-sphère." },
        why: "Un champ de divergence nulle est à flux conservatif : la différence des deux flux est le flux sortant de la surface fermée qu'elles forment, nul par le théorème de Gauss. C'est pourquoi on parle du flux à travers une spire sans préciser la surface. Leçon « Champs irrotationnels et champs à flux conservatif »." },
      source: { prompt: "Un disque contient une source plane de débit 20\u00a0m²·s⁻¹. Le flux sortant vaut 20\u00a0m²·s⁻¹ ; l'intégrale de la divergence sur le disque, calculée partout où le champ est défini, vaut 0. Que conclure ?",
        options: { a: "Le théorème de Gauss est faux dans le plan.", b: "Le flux a été mal calculé : il doit être nul.", c: "La source n'a pas de potentiel.", d: "Le théorème de Gauss suppose le champ dérivable dans tout le disque : le centre, singulier, porte tout le flux." },
        why: "Comme une charge ponctuelle : la divergence est nulle partout sauf au centre, où le champ n'est pas défini. Le théorème du gradient vaut, lui, puisque la source a un potentiel, logarithmique. Leçon « Bilan de l'analyse vectorielle »." },
      ampere: { prompt: "Un fil rectiligne porte un courant permanent de 10\u00a0A. Que vaut la circulation du champ magnétique sur une boucle carrée de 1\u00a0m de côté qui ne l'entoure pas ?",
        options: { a: "μ₀ × 10 ≈ 1,26 × 10⁻⁵\u00a0T·m, comme pour une boucle qui l'entoure.", b: "0 : hors du fil, le rotationnel de B est nul, et la boucle borde une surface que le fil ne traverse pas.", c: "Elle dépend de la distance de la boucle au fil.", d: "Elle est infinie, car le champ est singulier sur le fil." },
        hint: "Le champ d'un fil a la forme de celui d'un tourbillon.",
        why: "En régime permanent, ∇ ∧ B = μ₀j : nul hors du fil. Par Stokes, une boucle qui borde une surface non traversée par le courant a une circulation nulle. Une boucle qui entoure le fil a une circulation μ₀I ≈ 1,26 × 10⁻⁵\u00a0T·m, quelle que soit sa forme. Leçons « La circulation d'un champ de vecteurs » et « Circulation autour d'un carré : théorème de Stokes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

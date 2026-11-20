/* Épreuve de l'étape « Calculer un mouvement pas à pas » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      ordre: { prompt: "On veut une erreur finale 100 fois plus petite sur le même mouvement. Par combien faut-il multiplier le nombre de pas avec Euler, puis avec le saute-mouton ?",
        options: { a: "Par 100 dans les deux cas.", b: "Par 10 avec Euler, par 100 avec le saute-mouton.", c: "Par 100 avec Euler, par 10 avec le saute-mouton.", d: "Par 10⁴ avec Euler, par 100 avec le saute-mouton." },
        hint: "L'erreur d'une méthode d'ordre p est proportionnelle à hᵖ.",
        why: "Euler est d'ordre 1 : erreur proportionnelle à h, il faut 100 fois plus de pas. Le saute-mouton est d'ordre 2 : erreur proportionnelle à h², 10 fois plus de pas suffisent. Sur une orbite, diviser le pas par 2 divise de même par 4 l'avance fausse du périhélie. Leçons « Résoudre les équations pas à pas » et « Le mouvement des planètes, calculé »." },
      energie: { prompt: "Avec la méthode d'Euler, l'énergie d'un oscillateur de période 1\u00a0s est multipliée par 1 + h²ω² à chaque pas. Pour h = 0,005\u00a0s, par combien est-elle multipliée à chaque période ?",
        options: { a: "Environ 1,22.", b: "Environ 1,48.", c: "Environ 1,001.", d: "Exactement 1 : le modèle sans frottement conserve l'énergie." },
        hint: "ω = 2π\u00a0rad·s⁻¹, et une période compte 1/h pas.",
        why: "hω ≈ 0,031, le facteur par pas vaut 1,000\u202f99, et (1,000\u202f99)²⁰⁰ ≈ 1,22. À h = 0,01\u00a0s, c'est 1,48 : diviser le pas réduit la dérive sans changer son signe. Sur une orbite, la planète calculée par Euler gagne ainsi de l'énergie et s'éloigne en spirale. Leçons « Résoudre les équations pas à pas » et « Le mouvement des planètes, calculé »." },
      stable: { prompt: "Un oscillateur a une période de 2\u00a0s. À partir de quel pas le saute-mouton devient-il instable ?",
        options: { a: "Aucun pas : le saute-mouton ne fabrique jamais d'énergie.", b: "Environ 0,64\u00a0s, soit T/π : hω doit rester sous 2.", c: "1\u00a0s, la demi-période.", d: "0,01\u00a0s, comme pour Euler." },
        hint: "La condition de stabilité est hω < 2.",
        why: "ω = 2π/T = π\u00a0rad·s⁻¹ ; hω < 2 donne h < 2/π ≈ 0,64\u00a0s, moins d'un tiers de période. Au-delà, l'amplitude calculée croît à chaque pas, quelle que soit la précision des calculs. Euler, lui, gagne de l'énergie pour tout pas. Leçon « Résoudre les équations pas à pas », dont le saute-mouton sert aux orbites de la leçon « Le mouvement des planètes, calculé »." },
      systeme: { prompt: "Le calcul d'orbite suppose un Soleil seul et immobile, une planète ponctuelle et la gravitation de Newton. Pour la Terre, quelle simplification pèse le plus ?",
        options: { a: "La relativité, vers 10⁻⁸.", b: "Le mouvement du Soleil, vers 3 × 10⁻⁶.", c: "La taille de la planète, comparable à son orbite.", d: "L'attraction différentielle de Jupiter, jusqu'à 2 × 10⁻⁵." },
        hint: "Comparez des écarts relatifs.",
        why: "Écarts relatifs : 3 × 10⁻⁶ pour le mouvement du Soleil, jusqu'à 2 × 10⁻⁵ pour l'attraction différentielle de Jupiter, 10⁻⁸ pour la relativité. Une planète sphérique attire comme un point. Tous ces écarts sont bien plus petits que l'erreur d'un calcul à h = 0,1 : c'est le schéma qu'il faut juger d'abord. Leçons « Le mouvement des planètes, calculé » et « Résoudre les équations pas à pas »." },
      feynman: { prompt: "Avec le saute-mouton et h = 0,1, un calcul à la main trouve une demi-période de 2,10 ; la loi de Kepler donne 2,018. Que donnera le même calcul avec h = 0,05 ?",
        options: { a: "2,018 exactement : le saute-mouton est exact pour la gravitation.", b: "Environ 2,06 : l'écart est divisé par 2.", c: "Environ 2,04 : l'écart est divisé par 4.", d: "Encore 2,10 : l'écart vient de la physique, pas du pas." },
        hint: "Le saute-mouton est d'ordre 2.",
        why: "L'écart de 0,08 vient du pas, pas de la loi de Newton. Pour une méthode d'ordre 2, il est divisé par 4 : 2,018 + 0,02 ≈ 2,04, et le calcul pas à pas donne en effet 2,039. Leçons « Le mouvement des planètes, calculé » et « Résoudre les équations pas à pas »." },
      unites: { prompt: "En unités où GM = 1 et où l'unité de longueur est la distance moyenne Terre-Soleil, 1\u00a0au, l'orbite de la leçon « Le mouvement des planètes, calculé » a un demi-grand axe de 0,745. Que vaut sa période, en jours ?",
        options: { a: "Environ 235 jours.", b: "Environ 4 jours.", c: "Environ 117 jours.", d: "Environ 272 jours." },
        hint: "T = 2π a^(3/2) en unités réduites, et l'unité de temps vaut une année divisée par 2π, soit 58,1 jours.",
        why: "T = 2π × 0,745^(3/2) ≈ 4,04 unités, et une unité vaut 58,1 jours : environ 235 jours. C'est aussi 0,745^(3/2) année, la troisième loi de Kepler ; la période n'est pas proportionnelle au demi-grand axe. La demi-période, 2,018 unités, est celle que vise le calcul à la main. Leçon « Le mouvement des planètes, calculé »." },
      juge: { prompt: "Un calcul d'orbite au saute-mouton garde l'énergie constante à 10⁻³ près sur mille révolutions. Peut-on en conclure qu'il est juste ?",
        options: { a: "Oui : l'énergie est conservée par le modèle, donc le calcul suit la vraie orbite.", b: "Non : à grand pas, le saute-mouton garde l'énergie mais fait tourner l'orbite ; il faut aussi diviser le pas par deux et regarder ce qui change.", c: "Non : c'est Euler qui conserve l'énergie, le saute-mouton la fait dériver.", d: "Oui, à condition que l'énergie oscille au lieu de rester constante." },
        hint: "Une grandeur conservée détecte certaines erreurs, pas toutes.",
        why: "Une énergie qui dérive prouve une erreur, mais une énergie bien gardée ne prouve pas la justesse : le saute-mouton à grand pas fait avancer faussement le périhélie. On teste aussi le moment cinétique, le périhélie, et surtout la variation du résultat quand on divise le pas par deux. Euler, lui, fait toujours croître l'énergie. Leçons « Le mouvement des planètes, calculé » et « Résoudre les équations pas à pas »." },
      mercure: { prompt: "Pour voir l'effet de la relativité sur le périhélie de Mercure, 5,0 × 10⁻⁷\u00a0rad par orbite, quelle condition le calcul pas à pas doit-il remplir ?",
        options: { a: "Conserver l'énergie à mieux que 5,0 × 10⁻⁷ près.", b: "Prendre le plus petit pas possible, 10⁻¹² par exemple, pour éliminer toute erreur.", c: "Aucune : la loi de Newton contient déjà l'effet relativiste.", d: "Faire avancer faussement le périhélie de bien moins que 5,0 × 10⁻⁷\u00a0rad par orbite : environ 40\u202f000 pas par révolution au saute-mouton." },
        hint: "L'erreur à comparer est celle qui imite l'effet cherché.",
        why: "Le schéma fait lui-même tourner l'orbite ; cette avance fausse doit être très inférieure à l'effet cherché. Le saute-mouton y parvient vers h = 10⁻⁴, environ 40\u202f000 pas par révolution. Un pas trop petit ne sert à rien : les arrondis, de l'ordre de 10⁻¹⁶ en relatif, finissent par dominer. Leçons « Le mouvement des planètes, calculé » et « Résoudre les équations pas à pas »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

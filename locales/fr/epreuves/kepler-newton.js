/* Épreuve de l'étape « Kepler et la loi de Newton » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      boucles: { prompt: "Une planète tourne autour du Soleil sur une orbite presque circulaire de 4\u00a0au de rayon. Tous les combien voit-on, depuis la Terre, sa rétrogradation ?",
        options: { a: "Tous les 8 ans, la durée de son année.", b: "Tous les ans, au même mois : c'est la Terre qui la dépasse.", c: "Environ tous les 417 jours.", d: "Tous les 4 ans, en proportion de sa distance." },
        hint: "Troisième loi de Kepler pour sa période ; puis, entre deux oppositions, la Terre fait exactement un tour de plus qu'elle.",
        why: "T² = a³, en années et en au, donne T = 4^(3/2) = 8 ans (leçon « Les lois de Kepler »). La boucle a lieu quand la Terre la double, à l'opposition : 1/S = 1/1 \u2212 1/8, S = 8/7 an ≈ 417 jours (leçon « Les planètes dans le ciel »)." },
      jupiter: { prompt: "L'accélération de la Terre vers le Soleil vaut 5,93\u00a0×\u00a010⁻³\u00a0m·s⁻² à 1\u00a0au. Que prévoit, pour Jupiter à 5,20\u00a0au, la loi tirée de la troisième loi de Kepler ?",
        options: { a: "Environ 2,2\u00a0×\u00a010⁻⁴\u00a0m·s⁻².", b: "Environ 1,1\u00a0×\u00a010⁻³\u00a0m·s⁻².", c: "Environ 4,2\u00a0×\u00a010⁻⁵\u00a0m·s⁻².", d: "5,93\u00a0×\u00a010⁻³\u00a0m·s⁻² : T²/a³ est le même pour toutes les planètes." },
        hint: "Pour des orbites circulaires, 4π²r/T² avec T² = k r³ donne une accélération en 1/r².",
        why: "a = 4π²r/T² et T² = k r³ donnent a = 4π²/(k r²) (leçon « La loi de la gravitation de Newton »). On divise par 5,20² ≈ 27 : 5,93\u00a0×\u00a010⁻³/27 ≈ 2,2\u00a0×\u00a010⁻⁴\u00a0m·s⁻². Le 5,93\u00a0×\u00a010⁻³ vient de v²/R avec v = 29,8\u00a0km·s⁻¹ (leçon « Naissance de la dynamique »). Ce qui est commun aux planètes, c'est k, pas l'accélération." },
      deuxcorps: { prompt: "Une exoplanète a une masse égale à 1\u00a0% de celle de son étoile. Si l'on applique T² = 4π²a³/(GM) avec la seule masse M de l'étoile, de combien se trompe-t-on sur T² ?",
        options: { a: "De rien : la masse de la planète se simplifie, comme dans la chute libre.", b: "D'environ 1\u00a0% : la loi exacte pour deux corps contient G(M + m).", c: "D'environ 10\u00a0%, la racine de 1\u00a0%.", d: "D'environ un facteur 2 : la planète attire l'étoile autant que l'étoile l'attire." },
        hint: "Pour Jupiter, m/M ≈ 9,5\u00a0×\u00a010⁻⁴, et T²/a³ s'écarte de 9\u00a0×\u00a010⁻⁴ de la valeur commune.",
        why: "La troisième loi avec un astre central fixe cesse de valoir quand m/M n'est plus négligeable : pour deux corps, T² = 4π²a³/(G(M + m)), et l'erreur relative sur T² vaut environ m/M (leçon « Les lois de Kepler », où Jupiter s'écarte de 9\u00a0×\u00a010⁻⁴). C'est la même correction que la masse de la Lune dans le test de la Lune (leçon « La loi de la gravitation de Newton ») : les deux forces sont égales et opposées, mais l'étoile, plus lourde, bouge moins." },
      testlune: { prompt: "Le test de la Lune, Terre fixe et Lune ponctuelle, s'écarte de \u22120,95\u00a0% de la mesure. Quel oubli dans la description du système en explique l'essentiel ?",
        options: { a: "La taille de la Lune : son rayon vaut 4,5\u00a0×\u00a010⁻³ de la distance.", b: "La relativité générale, de l'ordre de GM/(c²r).", c: "La traînée du milieu interplanétaire, qui freine la Lune.", d: "La masse de la Lune, 1/81,3 de celle de la Terre : la période mesure G(M + m), d'où +1,2\u00a0%." },
        hint: "Chiffrez chaque oubli et comparez à 1\u00a0%.",
        why: "La Lune et la Terre tournent autour de leur centre de masse : la période mesure G(M + m), d'où +1,22\u00a0% ; la marée solaire retranche 0,28\u00a0% (leçon « La loi de la gravitation de Newton »). Un corps à couches sphériques attire comme un point : la taille ne compte pas. La relativité joue à 10⁻¹¹, et le vide interplanétaire ne freine rien de mesurable (leçon « Naissance de la dynamique »). Même correction que pour Jupiter dans la troisième loi (leçon « Les lois de Kepler »)." },
      mercure: { prompt: "Mercure a une excentricité e = 0,21. Comparez, entre le périhélie et l'aphélie, sa vitesse et son accélération vers le Soleil.",
        options: { a: "Au périhélie, vitesse 1,5 fois plus grande et accélération 2,3 fois plus grande.", b: "Au périhélie, vitesse et accélération toutes deux 1,5 fois plus grandes.", c: "Même vitesse, puisque la vitesse aréolaire est constante ; accélération 2,3 fois plus grande au périhélie.", d: "Au périhélie, vitesse 2,3 fois plus grande et accélération 1,5 fois plus grande." },
        hint: "Distances : a(1 \u2212 e) et a(1 + e). Loi des aires pour la vitesse, loi en 1/r² pour l'accélération.",
        why: "Au périhélie et à l'aphélie, la vitesse est perpendiculaire au rayon : la loi des aires donne vp/va = (1 + e)/(1 \u2212 e) = 1,21/0,79 ≈ 1,53 (leçon « Les lois de Kepler »). L'accélération suit 1/r² (leçon « La loi de la gravitation de Newton ») : 1,53² ≈ 2,35." },
      retrograde: { prompt: "Pendant les 60 à 81 jours où Mars recule devant les étoiles, quelle force faut-il pour expliquer ce recul ?",
        options: { a: "Une force qui freine Mars, puis la renvoie en arrière sur son orbite.", b: "L'attraction de la Terre, qui est alors au plus près.", c: "L'attraction du Soleil, qui ralentit Mars jusqu'à la faire reculer.", d: "Aucune : Mars avance toujours ; le recul vient du mouvement de la Terre, qui la double." },
        hint: "Qui regarde, et à quelle vitesse va-t-il ?",
        why: "La position vue de la Terre est la différence de deux positions héliocentriques : un changement d'origine, sans aucune force (leçon « Les planètes dans le ciel »). Sur son orbite, Mars avance par inertie, et la seule force, dirigée vers le Soleil, la fait tourner (leçon « Naissance de la dynamique »)." },
      freinee: { prompt: "Une sonde en orbite autour d'une planète traverse un gaz ténu qui la freine, par une force opposée à sa vitesse. Que devient sa vitesse aréolaire ?",
        options: { a: "Elle reste constante : la gravitation, elle, est toujours centrale.", b: "Elle diminue : la force de freinage ne passe pas par la planète, son moment n'est pas nul.", c: "Elle reste constante tant que la gravitation reste en 1/r².", d: "Elle augmente, car la sonde se rapproche de la planète et va plus vite." },
        hint: "d(r ∧ v)/dt = r ∧ F/m. Que vaut ce produit pour une force opposée à v ?",
        why: "La vitesse aréolaire est constante si et seulement si la somme des forces est parallèle au rayon (leçon « La loi de la gravitation de Newton »). Dans la construction de Newton, seules des impulsions dirigées vers le centre gardent les triangles égaux (leçon « Naissance de la dynamique »). Le freinage a une composante orthoradiale : r ∧ F ≠ 0, et |r ∧ v| décroît, même si la sonde accélère en se rapprochant." },
      chute: { prompt: "En 1\u00a0s, une pomme lâchée au repos tombe de 4,9\u00a0m. La Lune est à 60,3 rayons terrestres. Si la gravitation est en 1/r², de combien la Lune s'écarte-t-elle de sa ligne droite en 1\u00a0s ?",
        options: { a: "De 4,9\u00a0m, comme la pomme : la gravitation est universelle.", b: "D'environ 8\u00a0cm, 4,9\u00a0m divisés par 60,3.", c: "D'environ 1,3\u00a0mm.", d: "De rien : elle est en orbite, elle ne tombe pas." },
        hint: "Pendant une durée donnée, la distance de chute est proportionnelle à l'accélération.",
        why: "En 1/r², l'accélération est divisée par 60,3² ≈ 3\u202f640 : 4,9\u00a0m/3\u202f640 ≈ 1,3\u00a0mm ; la mesure tirée de l'orbite donne 1,36\u00a0mm (leçon « La loi de la gravitation de Newton »). La Lune tombe sans cesse : sans force, elle irait tout droit (leçon « Naissance de la dynamique »)." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

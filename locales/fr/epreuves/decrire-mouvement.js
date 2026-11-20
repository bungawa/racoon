/* Épreuve de l'étape « Décrire un mouvement » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      chute: { prompt: "La vitesse d'une bille lâchée sans vitesse est relevée chaque seconde : 0 ; 9,81 ; 19,62 ; 29,43\u00a0m·s⁻¹. Quelle distance a-t-elle parcourue en 3\u00a0s ?",
        options: { a: "44,1\u00a0m, que la méthode des trapèzes donne exactement, car v croît linéairement.", b: "29,4\u00a0m, la somme des rectangles pris au début de chaque seconde.", c: "58,9\u00a0m, la somme des rectangles pris à la fin de chaque seconde.", d: "88,3\u00a0m, la vitesse finale multipliée par la durée." },
        hint: "L'aire sous une droite v(t) est celle d'un triangle.",
        why: "La distance est l'aire sous v(t) : ½ × 3 × 29,43 ≈ 44,1\u00a0m, soit gt²/2. Les rectangles à gauche sous-estiment, à droite surestiment, de [v(T) \u2212 v(0)] Δt/2 ≈ 14,7\u00a0m. L'accélération étant constante, v est une droite : milieu et trapèzes sont exacts dès une tranche. Leçons « La distance, une intégrale » et « L'accélération »." },
      biais: { prompt: "L'accéléromètre d'une centrale inertielle a un biais constant de 0,01\u00a0m·s⁻². Sans recalage, quelle erreur de position accumule-t-il en 100\u00a0s ?",
        options: { a: "1\u00a0m : le biais multiplié par la durée.", b: "50\u00a0m : le biais intégré deux fois, b t²/2.", c: "100\u00a0m : le biais multiplié par le carré de la durée.", d: "0,5\u00a0m : la moitié du biais multipliée par la durée." },
        hint: "Intégrez une première fois pour la vitesse, une seconde pour la position.",
        why: "Un biais d'accélération b donne une erreur de vitesse b t, puis une erreur de position b t²/2 = 0,01 × 100²/2 = 50\u00a0m. L'erreur croît comme t² : attendre deux fois plus longtemps la multiplie par quatre. Deux intégrations, deux constantes : leçons « La distance, une intégrale » et « L'accélération »." },
      freinage: { prompt: "Une voiture freine à 5\u00a0m·s⁻², et sa position est relevée toutes les 0,1\u00a0s. De combien Δx/Δt sur un intervalle diffère-t-il de la vitesse au début de l'intervalle, puis de la vitesse à son milieu ?",
        options: { a: "De 0,25\u00a0m·s⁻¹ dans les deux cas.", b: "De 0,5\u00a0m·s⁻¹ au début, de 0,25\u00a0m·s⁻¹ au milieu.", c: "De 0,25\u00a0m·s⁻¹ au début ; de rien au milieu, car l'accélération est constante.", d: "De rien dans les deux cas : en 0,1\u00a0s, la vitesse ne change pas." },
        hint: "L'erreur de la différence avant vaut aΔt/2 ; la différence centrée est exacte pour une parabole.",
        why: "À accélération constante, x(t) est une parabole. La vitesse moyenne s'écarte de la vitesse du début de aΔt/2 = 5 × 0,1/2 = 0,25\u00a0m·s⁻¹. Elle égale exactement la vitesse à l'instant milieu : c'est la différence centrée, dont l'erreur vient de la dérivée troisième, nulle ici. Leçons « La vitesse » et « La vitesse, une dérivée »." },
      virage: { prompt: "Une voiture parcourt à 12,5\u00a0m·s⁻¹ un virage circulaire de 100\u00a0m de rayon. Son compteur ne bouge pas. Que vaut son accélération ?",
        options: { a: "Zéro, puisque la norme de la vitesse est constante.", b: "Environ 1,6\u00a0m·s⁻², le long de la vitesse.", c: "Environ 0,13\u00a0m·s⁻², vers le centre.", d: "Environ 1,6\u00a0m·s⁻², dirigée vers le centre." },
        hint: "Le vecteur vitesse tourne : a = v²/R.",
        why: "Le compteur donne la norme ; le vecteur vitesse, lui, tourne. a = v²/R = 12,5²/100 ≈ 1,6\u00a0m·s⁻², perpendiculaire à la vitesse, vers le centre. À 25\u00a0m·s⁻¹ dans le même virage, c'est quatre fois plus : 6,25\u00a0m·s⁻². Leçons « L'accélération » et « La vitesse »." },
      air: { prompt: "Pour une bille d'acier de 2\u00a0cm lâchée sans vitesse, jusqu'où le modèle x = gt²/2 donne-t-il la distance parcourue à 1\u00a0% près ?",
        options: { a: "Jusqu'à une dizaine de mètres, environ 1,5\u00a0s de chute ; au-delà, l'air rend la distance réelle plus courte, et bien plus tôt pour une balle légère.", b: "Indéfiniment : une bille d'acier est trop lourde pour sentir l'air.", c: "Sur quelques centimètres seulement : l'air freine tout corps dès le départ.", d: "Jusqu'à ce que g varie avec l'altitude, vers quelques kilomètres de chute." },
        hint: "Le frottement de l'air grandit avec la vitesse, donc avec la durée de la chute.",
        why: "Le modèle néglige l'air. Pour une bille d'acier de 2\u00a0cm, la distance réelle est 1\u00a0% plus courte dès 11\u00a0m de chute (1,5\u00a0s), et à 2\u00a0s la vitesse réelle est déjà 3\u00a0% sous gt. La variation de g n'intervient qu'à des hauteurs non négligeables devant le rayon terrestre. Leçons « Décrire le mouvement », « La vitesse » et « L'accélération »." },
      point: { prompt: "On décrit une voiture de 4\u00a0m, qui roule à 30\u00a0m·s⁻¹ sur un trajet d'un kilomètre, par une seule fonction x(t). Que néglige cette description, chiffré ?",
        options: { a: "Rien : x(t) est la définition exacte de la position, sans hypothèse.", b: "Sa taille devant le trajet, 4 × 10⁻³, et sa rotation ; et elle suppose un temps commun à tous les observateurs, faux au niveau de (v/c)² ≈ 10⁻¹⁴.", c: "Seulement l'incertitude de mesure : le point matériel est exact pour tout objet rigide.", d: "Sa vitesse, qu'une position ne contient pas : il faut une seconde fonction." },
        hint: "Que suppose-t-on en réduisant un corps à un point et en datant tous les relevés par une même horloge ?",
        why: "Les coordonnées sont une définition exacte ; l'approximation est en amont. Le corps est réduit à un point : taille petite devant le trajet, 4/1\u00a0000, rotation ignorée. Le temps est supposé commun à tous : (30/c)² ≈ 1,0 × 10⁻¹⁴. La vitesse, elle, se déduit de x(t) en dérivant. Leçons « Décrire le mouvement » et « La vitesse, une dérivée »." },
      numerique: { prompt: "En doublant le nombre de tranches, l'écart d'une somme de Riemann prise à gauche est divisé par 2, celui de la méthode du milieu par 4. À quelles dérivées numériques ces comportements correspondent-ils ?",
        options: { a: "Gauche : différence centrée ; milieu : différence avant.", b: "À aucune : intégrer et dériver n'ont pas les mêmes erreurs.", c: "Gauche : différence avant, d'ordre 1 ; milieu : différence centrée, d'ordre 2, où les termes impairs se compensent.", d: "Les deux sont d'ordre 1 ; le milieu a seulement une constante plus petite." },
        hint: "Une erreur divisée par 2 quand le pas est divisé par 2 est proportionnelle au pas.",
        why: "Prendre la valeur au bord d'une tranche fait une erreur proportionnelle à Δt, comme la différence avant ; la prendre au centre compense les erreurs deux à deux et laisse un écart en Δt², comme la différence centrée. C'est le même jeu d'ordres. Leçons « La distance, une intégrale » et « La vitesse, une dérivée »." },
      aller: { prompt: "Un mobile suit x = X cos ωt, avec X = 0,1\u00a0m et ω = 2π\u00a0rad·s⁻¹. Sur une période complète, que valent son déplacement et la distance qu'il parcourt ?",
        options: { a: "Déplacement 0,4\u00a0m, distance 0,4\u00a0m.", b: "Déplacement nul, distance nulle : il revient à son point de départ.", c: "Déplacement 0,2\u00a0m, distance 0,4\u00a0m.", d: "Déplacement nul, distance 0,4\u00a0m : l'intégrale de v est nulle, celle de |v| ne l'est pas." },
        hint: "Combien de fois parcourt-il l'amplitude X en une période ?",
        why: "L'intégrale de v sur une période vaut x(1\u00a0s) \u2212 x(0) = 0. La distance est l'intégrale de |v| : le mobile va de X à \u2212X puis revient, soit 4X = 0,4\u00a0m. Sa vitesse moyenne est donc nulle, alors que la norme de sa vitesse vaut en moyenne 0,4\u00a0m·s⁻¹. Leçons « La distance, une intégrale », « La vitesse, une dérivée » et « La vitesse »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

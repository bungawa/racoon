/* Épreuve de l'étape « Moment d'inertie et énergie de rotation » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      marteau: { prompt: "Un maillet : un manche homogène de 40\u00a0cm et 0,2\u00a0kg, et une tête de 0,8\u00a0kg centrée au bout du manche, à 40\u00a0cm. Où est son centre de masse, depuis l'autre bout du manche ?",
        options: { a: "À 36\u00a0cm : chaque partie compte pour un point de toute sa masse, en son propre centre.", b: "À 20\u00a0cm, au milieu du manche.", c: "À 32\u00a0cm : 0,8 × 40, la tête seule.", d: "À 40\u00a0cm, dans la tête : la partie lourde contient le centre de masse." },
        hint: "Le manche se remplace par 0,2\u00a0kg placé en son milieu.",
        why: "(19.2) : (0,2 × 20 + 0,8 × 40)/1,0 = 36\u00a0cm. La tête attire G sans l'y amener ; oublier de diviser par la masse totale ou oublier le manche donne les autres réponses. Leçon « Propriétés du centre de masse »." },
      gravite: { prompt: "Dans quel cas le centre de gravité d'un corps (le point où appliquer son poids total) s'écarte-t-il de son centre de masse ?",
        options: { a: "Dès que le corps n'est pas homogène.", b: "Quand le champ de pesanteur n'est pas uniforme sur le corps : l'écart est de l'ordre de L²/R pour un corps de taille L à la distance R du centre de la Terre.", c: "Quand le corps n'est pas symétrique.", d: "Jamais : ce sont deux noms du même point." },
        hint: "Le centre de masse ne dépend que des masses ; le centre de gravité dépend aussi du champ.",
        why: "En champ uniforme, le moment du poids vaut \u2212Mg(x_G \u2212 x_O) pour toute répartition des masses, homogène ou non, (19.3). L'écart vient de la non-uniformité du champ : 6 × 10⁻⁸ m pour un objet de 1\u00a0m incliné de 45°, 5 mm pour une barre de 300\u00a0m, (19.3a). Leçon « Propriétés du centre de masse »." },
      quart: { prompt: "Un quart de disque de rayon 10\u00a0cm tourne autour de l'un de ses deux bords droits et engendre une demi-boule. À quelle distance de ce bord est son centre de masse ?",
        options: { a: "5\u00a0cm, la moitié du rayon.", b: "6,4\u00a0cm, soit 2r/π.", c: "4,2\u00a0cm, soit 4r/(3π).", d: "3,3\u00a0cm, le tiers du rayon, comme pour un triangle." },
        hint: "Volume de la demi-boule : 2πr³/3 ; aire du quart de disque : πr²/4.",
        why: "Guldin (19.1b) : 2π x_G × πr²/4 = 2πr³/3, d'où x_G = 4r/(3π) ≈ 4,24\u00a0cm, la même valeur que pour le demi-disque, qui est deux quarts de disque symétriques. 2r/π est le centre d'un fil en arc. Leçon « Trouver le centre de masse »." },
      fil: { prompt: "Un fil en demi-cercle et un demi-disque plein ont le même rayon. Lequel a son centre de masse le plus loin du diamètre, et pourquoi ?",
        options: { a: "Le demi-disque, parce qu'il a plus de matière.", b: "Aucun : ils ont la même forme, donc le même centre de masse.", c: "Le demi-disque, parce que sa masse est répartie sur toute la surface.", d: "Le fil, à 2r/π ≈ 0,64 r contre 4r/(3π) ≈ 0,42 r : toute sa masse est sur le bord, le disque en a près du diamètre." },
        hint: "Premier théorème de Guldin pour le fil : la sphère a pour aire 4πr².",
        why: "Pour le fil, 2π x_G × πr = 4πr² donne 2r/π ; pour le disque, 2π x_G × πr²/2 = 4πr³/3 donne 4r/(3π). Une plaque et son contour n'ont pas le même centre de masse. Leçon « Trouver le centre de masse »." },
      coin: { prompt: "Une plaque mince de 2\u00a0kg, de 30 × 20\u00a0cm, tourne autour d'un axe perpendiculaire passant par un coin. Que vaut son moment d'inertie ?",
        options: { a: "Environ 0,087\u00a0kg·m² : I_G = M(a² + b²)/12 ≈ 0,022\u00a0kg·m², plus M d² = 2 × (0,15² + 0,10²) = 0,065\u00a0kg·m².", b: "Environ 0,022\u00a0kg·m², car l'axe reste perpendiculaire à la plaque.", c: "Environ 0,28\u00a0kg·m² : I_G plus M fois le carré de la diagonale entière.", d: "Environ 0,065\u00a0kg·m², M d² seulement." },
        hint: "Passez par G : la distance du centre au coin est la demi-diagonale.",
        why: "(19.7) : I = I_G + M d², avec I_G = 2 × (0,09 + 0,04)/12 ≈ 0,0217\u00a0kg·m² et d² = 0,0325\u00a0m². Total 0,0867\u00a0kg·m², ce qui vaut aussi M(a² + b²)/3. Oublier I_G ou M d² donne deux des distracteurs ; d est la distance de G à l'axe, la demi-diagonale, pas la diagonale entière. Leçon « Calculer un moment d'inertie »." },
      diagonale: { prompt: "Une plaque carrée mince, de masse M et de côté a, a Ma²/6 autour de l'axe perpendiculaire en son centre. Autour d'une de ses diagonales, elle a…",
        options: { a: "Ma²/6 aussi : tous les axes passant par le centre se valent.", b: "Ma²/12 : les deux diagonales sont équivalentes et perpendiculaires, et leur somme vaut Ma²/6.", c: "Ma²/3, car la diagonale est plus longue que le côté.", d: "Ma²/24, la moitié de la valeur autour d'un axe médian." },
        hint: "Théorème des axes perpendiculaires, appliqué aux deux diagonales.",
        why: "(19.4a) : I_z = I_d1 + I_d2, et par symétrie I_d1 = I_d2 = Ma²/12. C'est la même valeur qu'autour d'un axe médian, Ma²/12 : pour un carré, tous les axes du plan passant par le centre ont le même moment d'inertie. Approximation : plaque d'épaisseur négligeable. Leçon « Calculer un moment d'inertie »." },
      tabouret: { prompt: "Sur un tabouret qui tourne librement, une personne divise son moment d'inertie par deux en ramenant les bras. Que deviennent sa vitesse angulaire et son énergie cinétique ?",
        options: { a: "ω double, l'énergie se conserve.", b: "ω est multipliée par √2, l'énergie se conserve.", c: "ω double, l'énergie double : le surplus vient du travail des bras contre la force centrifuge.", d: "ω double, l'énergie est multipliée par quatre." },
        hint: "L = Iω se conserve, et T = ½Lω.",
        why: "Aucun moment extérieur autour de l'axe : L = Iω se conserve, donc ω double. T = ½Lω double aussi. Le surplus, égal à l'énergie initiale, est le travail des muscles qui tirent les masses vers l'axe. (19.8) et (19.8a), leçon « Énergie cinétique de rotation »." },
      course: { prompt: "Une sphère creuse mince et un cylindre plein roulent sans glisser sur la même pente, lâchés ensemble. Que se passe-t-il ?",
        options: { a: "La sphère creuse gagne, parce qu'elle est plus légère.", b: "Ils arrivent ensemble : seul le rayon compte.", c: "Le plus massif gagne, quelle que soit sa forme.", d: "Le cylindre plein gagne : k = 1/2 contre 2/3, la sphère met environ 5\u00a0% de temps en plus." },
        hint: "a = g sin θ/(1 + k), et t varie comme √(1 + k).",
        why: "La durée varie comme √(1 + k) : √((1 + 2/3)/(1 + 1/2)) ≈ 1,054. La masse et le rayon se simplifient dans (19.8c) ; seule la répartition de la masse, par k = I_G/(MR²), compte. Le roulement suppose un frottement statique suffisant, au moins k tan θ/(1 + k). Leçon « Énergie cinétique de rotation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

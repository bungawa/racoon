/* Épreuve de l'étape « Le principe de Fermat précisé » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lame: { prompt: "Un rayon traverse sous 45° une lame de verre à faces parallèles de 2\u00a0cm d'épaisseur, d'indice 1,5. À la sortie, il est…",
        options: { a: "parallèle au rayon incident, décalé d'environ 6,6\u00a0mm.", b: "dévié de 17° vers la normale.", c: "décalé de 2\u00a0cm, l'épaisseur de la lame.", d: "réfléchi totalement sur la seconde face." },
        hint: "La loi de Snell-Descartes s'applique deux fois, en sens inverse.",
        why: "À l'entrée, sin 45° = 1,5 sin r, r = 28,1° ; à la sortie, la même loi rend l'angle de 45°. Le décalage vaut, par (26.4a), 2\u00a0cm × sin(16,9°)/cos(28,1°) ≈ 6,6\u00a0mm. Pas de réflexion totale : on passe d'un milieu plus réfringent à l'air sous 28,1°, en dessous de l'angle limite de 41,8°. Leçon « Applications du principe de Fermat »." },
      mirage: { prompt: "L'œil est à 1,6\u00a0m au-dessus d'une route ; le bitume passe de 20\u00a0K à 30\u00a0K de plus que l'air. Que devient la « flaque » du mirage ?",
        options: { a: "Elle s'éloigne : l'air chaud dévie moins.", b: "Elle se rapproche : la dépression limite passe d'environ 0,33° à 0,40°, des rayons plus plongeants remontent.", c: "Elle ne bouge pas : seule la hauteur de l'œil compte.", d: "Elle disparaît : l'air trop chaud devient opaque." },
        why: "Δn entre l'œil et le sol croît avec la surchauffe ; par (26.4c), δc ≈ √(2Δn) aussi. La flaque commence là où le rayon de dépression δc rejoint le sol, vers 300\u00a0m puis 250\u00a0m dans le modèle. Leçon « Applications du principe de Fermat »." },
      telescope: { prompt: "Pourquoi le miroir d'un grand télescope est-il un paraboloïde plutôt qu'une sphère ?",
        options: { a: "Parce qu'une parabole est plus facile à polir.", b: "Pour qu'il réfléchisse davantage de lumière.", c: "Pour que tous les rayons d'une étoile sur l'axe arrivent au foyer en même temps ; au bord du miroir de 5,1\u00a0m du mont Palomar, une sphère s'en écarterait de 0,14\u00a0mm, des centaines de longueurs d'onde.", d: "Parce qu'une sphère ne peut pas être concave." },
        why: "Une onde plane arrive à égalité de temps sur un plan perpendiculaire à l'axe ; pour tout rayon, le chemin jusqu'au foyer doit être le même : c'est la parabole (26.3b). L'écart de la sphère croît comme r⁴ : négligeable pour un petit miroir, rédhibitoire pour un grand. Leçon « Applications du principe de Fermat »." },
      indices: { prompt: "Par rapport à l'air, le diamant a l'indice 2,417 et l'eau 1,333. Que vaut l'indice du diamant par rapport à l'eau ?",
        options: { a: "3,75, la somme des deux.", b: "0,55.", c: "1,08, la différence des deux.", d: "1,81, le rapport des deux." },
        hint: "Écrivez chaque indice comme un rapport de vitesses.",
        why: "n = v₁/v₂ pour la lumière qui passe de 1 à 2 : n(diamant/eau) = v_eau/v_diamant = 2,417/1,333 ≈ 1,81, la relation (26.5). 0,55 est l'indice de l'eau par rapport au diamant. Leçon « Applications du principe de Fermat »." },
      concave: { prompt: "A et B sont à 1\u00a0m au-dessus d'un miroir concave, à 2\u00a0m l'un de l'autre ; son rayon de courbure en O, à mi-chemin, vaut 3\u00a0m. Le trajet A → O → B est…",
        options: { a: "un minimum : le miroir est moins creux que l'ellipse de foyers A et B, de rayon 2\u00a0m en O.", b: "un maximum, comme pour tout miroir concave.", c: "plat : tous les trajets voisins ont la même durée.", d: "interdit : la lumière ne suit que des trajets de temps minimal sur un miroir plan." },
        hint: "Comparez R à d²/h, (26.3e).",
        why: "d² = 2\u00a0m², h = 1\u00a0m : Rc = 2\u00a0m. Avec R = 3\u00a0m > Rc, (26.3d) donne L″ = 2 cos β (cos β/d \u2212 1/R) > 0 : un minimum. Un maximum exigerait R < 2\u00a0m ; R = 2\u00a0m donne le cas plat. Dans tous les cas le trajet par O est stationnaire. Leçon « Énoncé précis du principe de Fermat »." },
      zone: { prompt: "Pour un miroir plan à 1\u00a0m, la zone utile autour du point de réflexion a une demi-largeur de 0,9\u00a0mm à 550\u00a0nm. Que vaut-elle pour un infrarouge de 2,2\u00a0µm ?",
        options: { a: "0,9\u00a0mm : elle ne dépend que de la géométrie.", b: "1,8\u00a0mm : elle croît comme √λ.", c: "3,6\u00a0mm : elle croît comme λ.", d: "0,45\u00a0mm : elle décroît avec λ." },
        why: "(26.3f) : s_z = √(λ/|L″|). λ est multipliée par 4, la zone par 2. Leçon « Énoncé précis du principe de Fermat »." },
      centre: { prompt: "Dans le calcul des flèches, on cache la première zone du miroir, autour du point de réflexion. La lumière reçue en B…",
        options: { a: "ne change pas : les flèches cachées s'annulaient entre elles.", b: "double : on a supprimé des flèches opposées.", c: "tombe à moins de 15\u00a0% : c'est là que les flèches, de durées presque égales, s'ajoutaient.", d: "est renvoyée vers A." },
        why: "La première zone fait la partie droite de la chaîne de flèches ; le reste du miroir s'enroule en spirales. Sans elle, la flèche totale est courte. Cacher les bords, au contraire, change peu. Leçon « Pourquoi le principe de Fermat fonctionne »." },
      limite: { prompt: "Pourquoi l'optique géométrique, et le principe de Fermat, deviennent-ils exacts quand la longueur d'onde tend vers zéro ?",
        options: { a: "Parce que la lumière va alors plus vite.", b: "Parce que les photons cessent d'interférer.", c: "Parce que les miroirs deviennent parfaits.", d: "Parce que la zone des chemins dont les flèches s'ajoutent, de demi-largeur √(λ/|L″|), se réduit au seul chemin stationnaire." },
        why: "Toutes les flèches comptent toujours ; seules celles des chemins de durée presque stationnaire, sur une largeur en √λ, ne s'annulent pas. À λ → 0, il n'en reste qu'un : le rayon. Leçons « Énoncé précis du principe de Fermat » et « Pourquoi le principe de Fermat fonctionne »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

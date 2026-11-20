/* Épreuve de l'étape « Orages et foudre » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      stabilite: { prompt: "Un jour d'été, la température de l'air baisse de 8\u00a0K par kilomètre. Une parcelle sèche se refroidit de 9,8\u00a0K par kilomètre en montant, une parcelle saturée d'environ 5. Que se passe-t-il ?",
        options: { a: "L'air sec est stable, l'air saturé est instable : il suffit de soulever de l'air humide pour qu'il continue de monter.", b: "Tout est stable : l'air ambiant se refroidit avec l'altitude.", c: "Tout est instable : l'air chaud est en bas.", d: "L'air sec est instable, l'air saturé est stable." },
        hint: "Comparez, sur un kilomètre de montée, la température de la parcelle et celle de l'air qu'elle rejoint.",
        why: "Sur 1\u00a0km, la parcelle sèche perd 9,8\u00a0K contre 8 pour l'air ambiant : elle arrive plus froide et retombe. La parcelle saturée n'en perd que 5 : elle arrive 3\u00a0K plus chaude, plus légère, et accélère. Leçon « Les orages »." },
      poussee: { prompt: "À 5\u00a0km d'altitude, une parcelle d'air est à 252\u00a0K dans un air ambiant à 250\u00a0K, à la même pression. Quelle est son accélération vers le haut, sans frottement ?",
        options: { a: "Environ 9,8\u00a0m·s⁻².", b: "Environ 0,8\u00a0m·s⁻².", c: "Environ 0,08\u00a0m·s⁻².", d: "Zéro : la pression est la même." },
        hint: "a = g (T_p \u2212 T_e)/T_e.",
        why: "À pression égale, la densité varie comme 1/T : la poussée d'Archimède dépasse le poids de la fraction ΔT/T. a = 9,81 × 2/250 ≈ 0,078\u00a0m·s⁻². Sur 5\u00a0km, cela ferait 28\u00a0m·s⁻¹ : l'ordre des courants ascendants." },
      rafale: { prompt: "Juste avant la pluie d'orage, un coup de vent frais balaie le sol. D'où vient cet air ?",
        options: { a: "C'est l'air chaud du sol aspiré vers le nuage.", b: "C'est de l'air froid d'altitude, entré dans le nuage par mélange, qui descend avec les précipitations et s'étale au sol.", c: "C'est l'air refroidi par l'évaporation des flaques.", d: "C'est le souffle du tonnerre." },
        why: "Le courant descendant amène de l'air pris en altitude. Humide, il se réchauffe peu en descendant, reste plus froid et plus dense que l'air voisin, et s'étale en arrivant au sol, un peu avant la pluie." },
      image: { prompt: "On réduit le bas d'un nuage à une charge de \u221240\u00a0C à 3,5\u00a0km au-dessus d'un sol plat et conducteur. Quel champ ce modèle donne-t-il au sol, à la verticale ?",
        options: { a: "Environ 29\u00a0kV·m⁻¹, vers le bas.", b: "Environ 29\u00a0kV·m⁻¹, vers le haut.", c: "Environ 100\u00a0V·m⁻¹, vers le bas.", d: "Environ 59\u00a0kV·m⁻¹, vers le haut." },
        hint: "Le sol conducteur ajoute une charge image, de signe opposé, à 3,5\u00a0km sous la surface.",
        why: "La charge et son image donnent chacune q/(4πε0h²) dans le même sens : E = 2 × 8,99\u00a0×\u00a010⁹ × 40/(3\u00a0500)² ≈ 59\u00a0kV·m⁻¹, dirigé vers la charge négative, donc vers le haut : le sens inverse du beau temps. Sans l'image, on trouverait la moitié. On mesure bien moins sous un vrai nuage : les ions émis par les pointes font écran. Leçon « Mécanisme de séparation des charges »." },
      recharge: { prompt: "Après un éclair qui emporte 30\u00a0C, le champ mesuré à 15\u00a0km revient à sa valeur avec une constante de temps de 6\u00a0s. Quel courant le générateur du nuage débite-t-il ?",
        options: { a: "Environ 5\u00a0A.", b: "Environ 180\u00a0A.", c: "Environ 0,2\u00a0A.", d: "Environ 10\u00a0kA." },
        why: "I ≈ ΔQ/τ = 30/6 = 5\u00a0A. C'est le courant moyen de la machine qui sépare les charges, pas celui de l'éclair, mille fois plus fort mais mille fois plus bref." },
      goutte: { prompt: "Par capture d'ions, une sphère conductrice de rayon R dans un champ E prend au plus la charge 12πε0R²E. Combien pour une goutte de 0,5\u00a0mm de rayon dans 10⁵\u00a0V·m⁻¹ ?",
        options: { a: "Environ 8\u00a0×\u00a010⁻⁹\u00a0C.", b: "Environ 8\u00a0×\u00a010⁻¹²\u00a0C.", c: "Environ 3\u00a0×\u00a010⁻¹¹\u00a0C.", d: "Environ 8\u00a0×\u00a010⁻¹⁵\u00a0C." },
        hint: "ε0 = 8,85\u00a0×\u00a010⁻¹²\u00a0F·m⁻¹ ; attention au carré du rayon.",
        why: "12π × 8,85\u00a0×\u00a010⁻¹² × (5\u00a0×\u00a010⁻⁴)² × 10⁵ ≈ 8,3\u00a0×\u00a010⁻¹²\u00a0C, soit 5\u00a0×\u00a010⁷ charges élémentaires. À ce plafond, le champ propre de la goutte, Q/(4πε0R²), égale le champ 3E qui règne à son pôle : elle n'attire plus d'ions." },
      descente: { prompt: "Un traceur par bonds descend de 3\u00a0km à la vitesse moyenne de 2\u00a0×\u00a010⁵\u00a0m·s⁻¹. Combien de temps met-il, et que voit un observateur ?",
        options: { a: "10\u00a0µs : c'est l'éclair lui-même.", b: "15\u00a0s : on le suit des yeux.", c: "15\u00a0ms : trop bref et trop peu lumineux pour l'œil, qui ne voit que l'arc en retour.", d: "1,5\u00a0s : une lueur lente." },
        why: "3\u00a0000/(2\u00a0×\u00a010⁵) = 0,015\u00a0s. Le traceur prépare le canal ; la lumière vive vient de l'arc en retour qui remonte ce canal dès le contact avec le sol. Leçon « La foudre »." },
      tige: { prompt: "Une tige de 5\u00a0m doit protéger contre les éclairs dont la sphère fictive a 45\u00a0m de rayon. Jusqu'à quelle distance de son pied le sol est-il hors d'atteinte de la sphère ?",
        options: { a: "5\u00a0m.", b: "45\u00a0m.", c: "Environ 15\u00a0m.", d: "Environ 21\u00a0m." },
        hint: "d = √(h(2r \u2212 h)).",
        why: "La sphère posée au sol et appuyée sur la pointe a son centre à la hauteur r : d² + (r \u2212 h)² = r², d = √(5 × 85) ≈ 20,6\u00a0m. Une sphère plus petite (éclair plus faible) s'approcherait davantage : avec r = 20\u00a0m, d ≈ 13\u00a0m." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Le champ électrique de l'atmosphère » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      charge: { prompt: "Par beau temps, un moulin à champ mesure 120\u00a0V·m⁻¹ au-dessus de la mer, le potentiel croissant vers le haut. Quelle est la charge de la surface de la mer, et celle de la Terre si ce champ régnait partout ?",
        options: { a: "\u22121,06\u00a0nC par mètre carré, environ \u22125,4 × 10⁵\u00a0C pour la Terre.", b: "+1,06\u00a0nC par mètre carré, environ +5,4 × 10⁵\u00a0C pour la Terre.", c: "\u2212120\u00a0C par mètre carré : σ = E.", d: "Zéro : la mer conduit, sa charge s'écoule." },
        hint: "Gauss à la surface d'un conducteur : σ = ε0 × (composante normale du champ, vers l'extérieur).",
        why: "Le champ descend vers la mer : sa composante sortante est \u2212120\u00a0V·m⁻¹, donc σ = \u2212ε0 × 120 ≈ \u22121,06 × 10⁻⁹\u00a0C·m⁻². Sur 4πR² = 5,1 × 10¹⁴\u00a0m², Q ≈ \u22125,4 × 10⁵\u00a0C. La mer conduit : c'est justement pourquoi la charge reste à sa surface. Leçon « Gradient de potentiel de l'atmosphère »." },
      mat: { prompt: "Un mât conducteur relié au sol, haut de 10\u00a0m et de 1\u00a0m de demi-largeur au pied, est assimilé à un demi-ellipsoïde. Sous 130\u00a0V·m⁻¹, quel champ règne à son sommet ?",
        options: { a: "130\u00a0V·m⁻¹ : un conducteur relié au sol ne modifie pas le champ.", b: "Environ 6\u00a0kV·m⁻¹ : le renforcement vaut près de 50 pour un élancement de 10.", c: "Environ 390\u00a0V·m⁻¹ : le triple, comme pour une demi-sphère.", d: "Zéro : le mât est au potentiel du sol." },
        hint: "Renforcement ≈ (h/b)²/(ln(2h/b) \u2212 1) pour un objet élancé.",
        why: "100/(ln 20 \u2212 1) = 100/2,0 ≈ 50 (49,3 par le calcul exact), soit 6,4\u00a0kV·m⁻¹. Le facteur 3 ne vaut que pour la demi-sphère. Le champ est nul dans le mât, pas à sa surface. Leçon « Gradient de potentiel de l'atmosphère »." },
      altitude: { prompt: "Par beau temps, la conductivité de l'air vaut 2 × 10⁻¹⁴\u00a0S·m⁻¹ au sol et 2 × 10⁻¹³\u00a0S·m⁻¹ à 12\u00a0km. Le champ au sol est de 120\u00a0V·m⁻¹. Que vaut-il à 12\u00a0km ?",
        options: { a: "120\u00a0V·m⁻¹ : le champ est uniforme entre deux électrodes planes.", b: "1\u00a0200\u00a0V·m⁻¹ : il croît avec la conductivité.", c: "12\u00a0V·m⁻¹ : le courant vertical est le même à toutes les altitudes, donc E est inversement proportionnel à σ.", d: "Zéro : à 12\u00a0km, l'air est conducteur." },
        why: "En régime permanent et sans courant horizontal, la charge ne s'accumule nulle part : j = σ E est le même partout. σ décuple, E est divisé par dix. Leçon « Courants électriques dans l'atmosphère »." },
      colonne: { prompt: "La haute atmosphère est à 250\u00a0kV au-dessus du sol, et la résistance d'une colonne d'air de 1\u00a0m² de base vaut 1,2 × 10¹⁷\u00a0Ω. Quel courant reçoit toute la Terre par beau temps ?",
        options: { a: "Environ 2\u00a0pA : celui d'une seule colonne.", b: "Environ 2 × 10¹⁷\u00a0A.", c: "Environ 30\u00a0A.", d: "Environ 1\u00a0kA : 2,1\u00a0pA par mètre carré sur 5,1 × 10¹⁴\u00a0m²." },
        hint: "Les colonnes sont en parallèle entre le sol et la haute atmosphère.",
        why: "j = V_I/R_c = 2,5 × 10⁵/1,2 × 10¹⁷ ≈ 2,1 × 10⁻¹²\u00a0A·m⁻², et I = 4πR² j ≈ 1,1\u00a0kA. Les mesures donnent 1 à 2\u00a0kA (Feynman : 1\u00a0800\u00a0A), les orages couvrant une petite part du globe. Leçon « Courants électriques dans l'atmosphère »." },
      relaxation: { prompt: "Sans générateur, en combien de temps la Terre perdrait-elle l'essentiel de sa charge si l'air au sol a une conductivité de 2 × 10⁻¹⁴\u00a0S·m⁻¹ ?",
        options: { a: "Environ 7\u00a0min : |Q|/I = ε0/σ0, de l'ordre de 440\u00a0s.", b: "Environ un an.", c: "Environ 1\u00a0µs, comme dans un métal.", d: "Jamais : l'air est isolant." },
        why: "La charge du sol vaut ε0 E0 par mètre carré, le courant σ0 E0 : leur rapport est ε0/σ0 = 8,85 × 10⁻¹²/2 × 10⁻¹⁴ ≈ 440\u00a0s. Les revues du circuit global donnent de l'ordre de 10\u00a0min. Leçons « Courants électriques dans l'atmosphère » et « Origine des courants atmosphériques »." },
      fumee: { prompt: "Au début du XXᵉ siècle, à Kew, près de Londres, le champ de beau temps montait en hiver avec la fumée de la ville. Pourquoi ?",
        options: { a: "Parce que la Terre était plus chargée.", b: "Parce que la fumée captait les petits ions : la conductivité de l'air au sol baissait, et comme le courant est fixé par toute la colonne, E = j/σ montait.", c: "Parce que les instruments étaient mal étalonnés.", d: "Parce qu'il y avait plus d'orages au-dessus de Londres." },
        why: "La résistance d'une colonne est surtout dans les premiers kilomètres, mais le courant de beau temps est fixé par le potentiel de la haute atmosphère, commun au globe. Moins d'ions près du sol : σ0 baisse plus que j, le champ local monte. Les mesures de Kew servent ainsi à reconstituer la fumée de l'époque. Leçons « Gradient de potentiel de l'atmosphère » et « Courants électriques dans l'atmosphère »." },
      universel: { prompt: "Sur tous les océans, le champ de beau temps passe par son maximum vers 19\u00a0h UTC et son minimum vers 4\u00a0h UTC. Quelle conclusion en tirer ?",
        options: { a: "Que le Soleil chauffe l'air au-dessus de chaque navire en fin d'après-midi.", b: "Que l'ionosphère se décharge la nuit.", c: "Qu'un générateur global, relié à toutes les régions de beau temps par la haute atmosphère conductrice, varie au cours du jour universel : ce sont les orages, plus nombreux quand l'après-midi tombe sur les grands foyers continentaux.", d: "Que le champ de beau temps est créé par les marées." },
        why: "Une cause locale suivrait l'heure locale. Le circuit, qui répond en une dizaine de minutes, suit sans retard l'activité orageuse du globe, et celle-ci dépend de l'heure où l'après-midi tombe sur les grands foyers continentaux. Leçon « Origine des courants atmosphériques »." },
      bilan: { prompt: "Des survols par avion donnent environ 1\u00a0A par orage à éclairs, et environ 1\u00a0500 de ces orages sont actifs à chaque instant. Que conclure ?",
        options: { a: "Que les orages déchargent la Terre, dans le même sens que le courant de beau temps.", b: "Que les orages ne suffisent pas : il manque un facteur mille.", c: "Que le courant d'un orage vaut celui d'un éclair, des dizaines de kiloampères.", d: "Qu'ils débitent environ 1,5\u00a0kA vers la haute atmosphère, avec quelques centaines d'ampères des nuages sans éclair : de quoi compenser les 1 à 2\u00a0kA du beau temps." },
        hint: "La haute atmosphère est un nœud : ce qui y entre en ressort.",
        why: "Conservation de la charge au nœud du circuit : Σ N_k ⟨I_k⟩ ≈ 2\u00a0kA, l'ordre du courant de beau temps. Les orages portent la charge négative vers le sol (éclairs, pointes) et la positive vers le haut : ils rechargent la Terre. Un éclair est intense mais bref, c'est la moyenne qui compte. Leçon « Origine des courants atmosphériques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Dipôle oscillant et charge en mouvement » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      zones: { prompt: "Une petite antenne émet à 1\u00a0MHz (λ ≈ 300\u00a0m). À 10\u00a0m d'elle, quel terme de son champ électrique domine dans le plan équatorial ?",
        options: { a: "Le terme statique en p : kr ≈ 0,21, et les trois termes valent environ 108, 23 et 5 en unités de k³p₀/(4πε₀).", b: "Le terme de rayonnement, car 10\u00a0m est déjà loin de l'antenne.", c: "Le terme d'induction en ṗ, qui domine toujours entre λ/10 et λ.", d: "Aucun : les trois sont égaux dès que r est grand devant l'antenne." },
        hint: "Calculez kr = 2πr/λ, puis 1/(kr)³, 1/(kr)² et 1/kr.",
        why: "kr = 2π × 10/300 ≈ 0,21. Les amplitudes vont comme 1/(kr)³ ≈ 108, 1/(kr)² ≈ 23 et 1/kr ≈ 4,8 : le terme statique l'emporte. Les trois ne sont égaux qu'à r = λ/2π ≈ 48\u00a0m. Leçon « Champs d'un dipôle oscillant »." },
      compensation: { prompt: "Près d'un dipôle oscillant, pourquoi la loi de Biot et Savart sans retard est-elle meilleure que la même loi simplement retardée ?",
        options: { a: "Parce que le retard est nul près du dipôle.", b: "Parce que le terme en p̈ de (21.23) compense le retard au premier ordre : l'erreur de la loi sans retard est (kr)²/2, celle de la loi retardée kr.", c: "Parce que le champ magnétique ne dépend pas du temps près du dipôle.", d: "Elle ne l'est pas : la loi retardée est toujours la meilleure." },
        why: "Le crochet ṗ(t \u2212 r/c) + (r/c) p̈(t \u2212 r/c) vaut ṗ(t) à un terme d'ordre (r/c)² près : c'est (21.23a). Retarder sans ce terme introduit une erreur d'ordre kr. Leçon « Champs d'un dipôle oscillant »." },
      loin: { prompt: "Loin d'un dipôle oscillant, à r ≫ λ, quelles sont les propriétés du champ électromagnétique ?",
        options: { a: "E est radial et décroît en 1/r², comme le champ de Coulomb.", b: "E et B décroissent en 1/r³, comme le champ d'un dipôle statique.", c: "E et B sont perpendiculaires entre eux et à r, E = cB, et leur amplitude décroît en 1/r, proportionnelle à p̈ projeté perpendiculairement à r.", d: "B est nul, seul E subsiste." },
        why: "Seuls les termes en p̈ de (21.23) et (21.26) survivent : ce sont des champs transverses en 1/r, liés par E = cB, qui emportent l'énergie à l'infini. Leçon « Champs d'un dipôle oscillant »." },
      modele: { prompt: "Quelles hypothèses sur la source le champ (21.26) du dipôle oscillant demande-t-il ?",
        options: { a: "Aucune : il est exact pour toute source.", b: "Seulement r ≫ λ.", c: "Seulement r ≪ λ.", d: "Une source petite devant r et devant λ/2π, dont les charges vont lentement devant c ; aucune condition sur r/λ." },
        why: "Toute la source est lue au même instant retardé : cela demande d ≪ λ/2π, soit v ≪ c, et d ≪ r. La formule vaut ensuite du voisinage de la source jusqu'à l'infini. Pour des charges rapides, il faut les potentiels de « Potentiels d'une charge mobile, formules de Liénard et Wiechert »." },
      facteur: { prompt: "À l'instant retardé, une charge ponctuelle avance vers le point d'observation à 0,6 c. Par combien son potentiel est-il multiplié, par rapport au potentiel de Coulomb à sa position retardée ?",
        options: { a: "Par 2,5.", b: "Par 1,25, le facteur γ.", c: "Par 0,625.", d: "Par 1 : seule la distance retardée compte." },
        hint: "Le facteur de (21.32) est 1/(1 \u2212 v_r/c).",
        why: "1/(1 \u2212 0,6) = 2,5. La lecture retardée balaie la charge pendant qu'elle avance vers l'observateur : la longueur lue est b = a/(1 \u2212 v_r/c). Leçon « Potentiels d'une charge mobile, formules de Liénard et Wiechert »." },
      origine: { prompt: "D'où vient le facteur 1/(1 \u2212 v_r/c) des potentiels de Liénard et Wiechert ?",
        options: { a: "De la contraction de Lorentz de la charge.", b: "De ce que chaque tranche de l'espace lit la charge à un instant retardé différent, pendant que la charge avance : c'est un effet de premier ordre en v/c.", c: "De l'accélération de la charge.", d: "De la dilatation du temps de la charge." },
        why: "Le raisonnement n'utilise que la propagation à c et le déplacement de la charge pendant la lecture. Le facteur vaut 1 + v_r/c au premier ordre, alors que γ ne diffère de 1 qu'au second ordre. Leçon « Potentiels d'une charge mobile, formules de Liénard et Wiechert »." },
      uniforme: { prompt: "Une charge file à 0,6 c en ligne droite (γ = 1,25). À 2\u00a0m de sa position actuelle, perpendiculairement au mouvement, que vaut son potentiel ?",
        options: { a: "Le potentiel de Coulomb à 2\u00a0m.", b: "Le potentiel de Coulomb à 2\u00a0m, divisé par 1,25.", c: "1,25 fois le potentiel de Coulomb à 2\u00a0m.", d: "2,5 fois le potentiel de Coulomb à sa distance retardée." },
        why: "(21.39) avec x = vt donne γ q/(4πε₀ r). Sur l'axe du mouvement, à la même distance, on retrouverait exactement Coulomb. Leçon « Charge à vitesse constante et formule de Lorentz »." },
      lorentz: { prompt: "Que montre le potentiel (21.39) d'une charge en mouvement uniforme, obtenu à partir des seules équations de Maxwell ?",
        options: { a: "Que les équations de Maxwell doivent être corrigées pour les grandes vitesses.", b: "Que le potentiel est celui de Coulomb à la position retardée.", c: "Que le potentiel ne dépend pas de la vitesse.", d: "Qu'il est γ fois le potentiel de Coulomb écrit dans les coordonnées x′ = (x \u2212 vt)/√(1 \u2212 v²/c²), y, z : la transformation de Lorentz est déjà dans les équations de Maxwell." },
        why: "Le calcul n'utilise que les potentiels retardés. La forme du résultat fait apparaître la transformation de Lorentz, et le facteur γ celui d'un quadrivecteur : l'électromagnétisme n'a pas eu à être corrigé pour la relativité. Leçon « Charge à vitesse constante et formule de Lorentz »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

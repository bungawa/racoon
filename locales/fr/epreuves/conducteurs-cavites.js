/* Épreuve de l'étape « Conducteurs en équilibre et cavités » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      interieur: { prompt: "Un bloc de cuivre neutre est placé dans un champ extérieur uniforme de 10\u00a0kV·m⁻¹. Une fois l'équilibre atteint, que vaut le champ au centre du bloc ?",
        options: { a: "Zéro : des charges sont apparues sur la surface, et leur champ annule le champ extérieur dans tout le métal.", b: "10\u00a0kV·m⁻¹ : un bloc neutre ne porte aucune charge, il ne change rien.", c: "La moitié, 5\u00a0kV·m⁻¹ : le métal écrante en partie.", d: "Zéro au centre seulement, par symétrie ; pas près des faces." },
        hint: "Un bloc neutre peut porter des charges + et \u2212 en des endroits différents.",
        why: "Tant qu'un champ règne dans le métal, il déplace les électrons libres. Ils s'accumulent sur une face, laissent l'autre positive, et s'arrêtent lorsque le champ de ces charges de surface annule le champ extérieur en tout point du métal. Leçon « Champ au voisinage d'un conducteur »." },
      densite: { prompt: "L'air devient conducteur au-delà d'environ 3\u00a0MV·m⁻¹. Quelle densité de charge, au plus, peut porter la surface d'un conducteur dans l'air ?",
        options: { a: "Environ 1,3 × 10⁻⁵\u00a0C·m⁻² : σ = 2ε0E, comme pour un plan.", b: "Environ 2,7 × 10⁻⁵\u00a0C·m⁻² : σ = ε0E, (5.8).", c: "Aucune limite : la charge est dans le métal.", d: "Environ 3 × 10⁶\u00a0C·m⁻² : σ = E." },
        why: "Juste dehors, E = σ/ε0. La densité maximale vaut ε0 × 3 × 10⁶ ≈ 2,7 × 10⁻⁵\u00a0C·m⁻², quelle que soit la forme du conducteur : c'est une limite locale. Leçon « Champ au voisinage d'un conducteur »." },
      pointes: { prompt: "Une sphère de 1\u00a0cm de rayon et une sphère de 10\u00a0cm, éloignées, sont reliées par un fil fin. Jusqu'à quel potentiel peut-on porter l'ensemble avant que l'air ne claque (3\u00a0MV·m⁻¹) ?",
        options: { a: "300\u00a0kV, fixé par la grande sphère.", b: "330\u00a0kV : les deux rayons s'ajoutent.", c: "Environ 30\u00a0kV : le champ de surface vaut φ/R, le plus fort sur la petite sphère.", d: "3\u00a0kV : le fil abaisse la limite." },
        hint: "Même potentiel pour les deux sphères ; le champ à la surface de chacune vaut φ/R.",
        why: "Au même potentiel, le champ de surface φ/R est dix fois plus fort sur la petite sphère : elle atteint 3\u00a0MV·m⁻¹ à φ = 3 × 10⁶ × 0,01 = 30\u00a0kV. C'est le pouvoir des pointes : la plus petite courbure fixe la limite. Leçon « Champ au voisinage d'un conducteur »." },
      cavite: { prompt: "Un conducteur chargé, de forme quelconque, contient une cavité vide de forme quelconque ; une charge est approchée de l'extérieur. Quelles lois suffisent à montrer que le champ est nul dans la cavité ?",
        options: { a: "La symétrie sphérique et le théorème de Gauss.", b: "Le théorème de Gauss seul : la paroi porte une charge nette nulle.", c: "La loi de Coulomb et un calcul de la répartition des charges.", d: "Le théorème de Gauss, pour la charge nette nulle de la paroi, et la circulation nulle du champ, qui exclut des lignes d'une partie de la paroi à une autre." },
        why: "Gauss dans le métal donne une charge nette nulle sur la paroi, ce qui laisserait la possibilité de + et de \u2212. Une ligne de champ traversant la cavité, refermée par le métal, donnerait une circulation non nulle : interdit en électrostatique. Aucune forme n'intervient. Leçon « Champ dans une cavité conductrice »." },
      paroi: { prompt: "Une charge de +3\u00a0nC est enfermée dans la cavité d'un conducteur isolé qui porte \u22121\u00a0nC. Quelles charges portent la paroi de la cavité et la face extérieure ?",
        options: { a: "\u22123\u00a0nC sur la paroi, +2\u00a0nC sur la face extérieure.", b: "\u22121\u00a0nC sur la paroi, 0 sur la face extérieure.", c: "0 sur la paroi, +2\u00a0nC sur la face extérieure.", d: "\u22123\u00a0nC sur la paroi, \u22121\u00a0nC sur la face extérieure." },
        hint: "Une surface de Gauss tracée dans le métal entoure la cavité.",
        why: "Le flux à travers une surface tracée dans le métal est nul : la paroi porte \u2212q = \u22123\u00a0nC. La charge du conducteur est conservée : \u22121 \u2212 (\u22123) = +2\u00a0nC sur la face extérieure. Leçon « Champ dans une cavité conductrice »." },
      terre: { prompt: "Un appareil chargé est enfermé dans une boîte métallique reliée à la terre. On déplace l'appareil dans la boîte. Qu'observe-t-on dehors ?",
        options: { a: "Un champ qui suit l'appareil.", b: "Aucun champ, avant comme après : la face extérieure, au potentiel de la terre, ne porte pas de charge.", c: "Un champ uniforme, celui de l'appareil au centre.", d: "Un champ qui ne change que si l'appareil touche la paroi." },
        why: "La paroi intérieure porte l'opposé de la charge de l'appareil et annule son champ dans le métal. Reliée à la terre, la face extérieure ne garde aucune charge : aucun champ ne sort, où que soit l'appareil. Leçon « Champ dans une cavité conductrice »." },
      cavendish: { prompt: "Expérience de Cavendish : la sphère extérieure porte 10⁻⁷\u00a0C, M ≈ 1, l'électromètre détecte 10⁻¹⁵\u00a0C et ne voit rien sur la sphère intérieure. Quelle borne obtient-on sur l'écart δ de l'exposant ?",
        options: { a: "|δ| < 10⁻¹⁵.", b: "|δ| < 10⁻²² : on multiplie les deux charges.", c: "|δ| < 10⁻⁸ : qa ≈ M δ qb < 10⁻¹⁵\u00a0C.", d: "Aucune : sans signal, on ne peut rien conclure." },
        why: "La charge gardée est proportionnelle à δ : qa ≈ M δ qb. Ne rien voir au-dessus de 10⁻¹⁵\u00a0C donne |δ| < 10⁻¹⁵/10⁻⁷ = 10⁻⁸. Une mesure de zéro donne une borne. Leçon « La loi en 1/r² est-elle exacte ? »." },
      echelle: { prompt: "Le test de 1971 borne l'écart de l'exposant à quelques 10⁻¹⁶ avec des coquilles d'environ un mètre. Que faut-il pour connaître la loi à l'échelle de l'atome ?",
        options: { a: "Rien : une loi vraie à un mètre l'est à toute échelle.", b: "Des coquilles plus grandes.", c: "Une coquille plus parfaitement sphérique.", d: "D'autres mesures, à cette échelle : par exemple les niveaux d'énergie de l'hydrogène, qui dépendent de la forme du potentiel du proton." },
        why: "Un écart peut dépendre de la distance, comme une portée finie en e^(\u2212r/λ). Chaque test borne la loi aux distances qu'il explore : la spectroscopie de l'hydrogène, depuis Lamb et Retherford (1947), le fait vers 10⁻¹⁰\u00a0m. Leçon « La loi en 1/r² est-elle exacte ? »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

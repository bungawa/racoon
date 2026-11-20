/* Épreuve de l'étape « Loi de Biot et Savart et dipôle magnétique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      noeud: { prompt: "Un nœud d'un réseau reçoit 5\u00a0A par une branche et 2\u00a0A par une deuxième. Une troisième branche en part. En régime permanent, quel courant porte-t-elle, et avec quel courant la somme-t-on dans (14.38a) ?",
        options: { a: "7\u00a0A, son propre courant, sur sa propre longueur.", b: "3\u00a0A, la différence des deux autres.", c: "5\u00a0A, le plus grand des deux.", d: "On ne la somme pas : seul le courant total du circuit compte." },
        hint: "La charge ne s'accumule pas au nœud.",
        why: "Ce qui entre sort : 5 + 2 = 7\u00a0A. Chaque branche entre dans la somme avec son intensité. Leçon « Potentiel vecteur d'un circuit »." },
      epais: { prompt: "Une spire de rayon 10\u00a0cm est faite d'un fil de rayon 2\u00a0cm, parcouru par un courant uniforme sur sa section. Loin d'elle, comment son champ se compare-t-il à celui de la ligne de rayon 10\u00a0cm portant le même courant ?",
        options: { a: "Identique : seul le courant compte.", b: "Plus fort d'environ 1\u00a0%.", c: "Plus faible d'environ 4\u00a0%.", d: "Plus fort d'environ 20\u00a0%." },
        hint: "Moyennez l'aire π(R + u)² entourée par chaque filament.",
        why: "Le moment vaut Iπ(R² + a²/4) : la fraction ajoutée est a²/(4R²) = 0,04/4 = 1\u00a0%. Leçon « Potentiel vecteur d'un circuit »." },
      surlefil: { prompt: "Pourquoi la formule du fil mince (14.38) ne permet-elle pas de calculer le flux d'un circuit à travers sa propre surface ?",
        options: { a: "Parce que le circuit n'est pas plan.", b: "Parce que le flux est toujours nul.", c: "Parce que le potentiel qu'elle donne diverge sur le fil lui-même : le résultat dépend du rayon du fil.", d: "Parce que le courant n'est pas permanent." },
        why: "Le flux d'un circuit à travers lui-même est la circulation de A sur le fil. La ligne donne une intégrale qui diverge comme ln d quand d → 0 ; un fil de rayon a donne une valeur finie, qui dépend de a. Leçon « Potentiel vecteur d'un circuit »." },
      centre: { prompt: "Une spire circulaire de 10\u00a0cm de rayon porte 2\u00a0A. Quel est le champ en son centre ?",
        options: { a: "4,0 × 10⁻⁶\u00a0T.", b: "2,5 × 10⁻⁵\u00a0T.", c: "6,3 × 10⁻⁶\u00a0T.", d: "1,3 × 10⁻⁵\u00a0T." },
        why: "(14.43a) en z = 0 : μ0I/(2R) = 1,26 × 10⁻⁶ × 2/0,2 ≈ 1,3 × 10⁻⁵\u00a0T. 4,0 × 10⁻⁶\u00a0T est μ0I/(2πR), le champ d'un fil infini à 10\u00a0cm. Leçon « Loi de Biot et Savart »." },
      carre: { prompt: "Un cadre carré de 10\u00a0cm de côté porte 1\u00a0A. Chaque côté est vu du centre à 5\u00a0cm, sous des angles de ±45°. Quel est le champ au centre ?",
        options: { a: "1,1 × 10⁻⁵\u00a0T.", b: "2,8 × 10⁻⁶\u00a0T.", c: "8,0 × 10⁻⁶\u00a0T.", d: "0, les contributions des côtés opposés s'annulant." },
        hint: "Un côté : μ0I/(4πd) × (sin 45° + sin 45°). Les quatre côtés donnent des contributions de même sens.",
        why: "Un côté donne 10⁻⁷ × 1/0,05 × √2 ≈ 2,8 × 10⁻⁶\u00a0T, perpendiculaire au plan. Les quatre s'ajoutent : 1,1 × 10⁻⁵\u00a0T. Des côtés opposés ont des courants opposés, mais ils sont de part et d'autre du centre : leurs champs y ont le même sens. Leçon « Loi de Biot et Savart »." },
      axe: { prompt: "Sur l'axe d'une spire de rayon R, à la distance z = R de son centre, que vaut le champ rapporté à sa valeur au centre ?",
        options: { a: "50\u00a0%.", b: "35\u00a0%.", c: "71\u00a0%.", d: "12,5\u00a0%." },
        why: "(14.43a) : B(z)/B(0) = [R²/(R² + z²)]^(3/2) = (1/2)^(3/2) ≈ 0,354. La forme lointaine du dipôle, en (R/z)³, donnerait 1/8 : à z = R, on n'est pas encore loin. Leçon « Loi de Biot et Savart »." },
      galva: { prompt: "Le cadre d'un galvanomètre a 100 spires de 2\u00a0cm × 1\u00a0cm. Il est parcouru par 50\u00a0µA, dans un champ de 0,2\u00a0T parallèle à son plan. Quel couple subit-il ?",
        options: { a: "1,0 × 10⁻⁹\u00a0N·m.", b: "2,0 × 10⁻⁵\u00a0N·m.", c: "2,0 × 10⁻⁷\u00a0N·m.", d: "Zéro : le champ est dans le plan du cadre." },
        hint: "μ = N I S, et le champ est perpendiculaire à μ.",
        why: "μ = 100 × 50 × 10⁻⁶ × 2 × 10⁻⁴ = 10⁻⁶\u00a0A·m² ; le champ, dans le plan, est perpendiculaire à μ : τ = μB = 2 × 10⁻⁷\u00a0N·m, (15.2). Le couple est maximal, pas nul. Leçon « Force sur une boucle de courant et énergie d'un dipôle »." },
      gradient: { prompt: "Une petite bobine de moment 0,1\u00a0A·m², parallèle au champ, est sur l'axe d'un électroaimant où le champ croît de 2\u00a0T par mètre en allant vers lui. Que subit-elle ?",
        options: { a: "Une force nulle, le moment étant parallèle au champ.", b: "Un couple de 0,2\u00a0N·m et aucune force.", c: "Une force de 0,2\u00a0N qui l'éloigne de l'électroaimant.", d: "Une force de 0,2\u00a0N qui l'attire vers l'électroaimant." },
        why: "(15.11a) : F = ∇(μ·B) = 0,1 × 2 = 0,2\u00a0N, vers les μ·B croissants, donc vers l'électroaimant. Moment parallèle au champ : aucun couple. Leçon « Force sur une boucle de courant et énergie d'un dipôle »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

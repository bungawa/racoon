/* Épreuve de l'étape « Tenseurs de polarisabilité et d'inertie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      polarisation: { prompt: "Un champ de 1\u00a0kV·m⁻¹ est appliqué le long de l'axe optique d'une calcite, où χ = 1,21 (χ = 1,75 en travers). Que vaut la polarisation ?",
        options: { a: "1,07 × 10⁻⁸\u00a0C·m⁻², le long du champ.", b: "1,21 × 10³\u00a0C·m⁻², le long du champ.", c: "1,55 × 10⁻⁸\u00a0C·m⁻², le long du champ.", d: "1,07 × 10⁻⁸\u00a0C·m⁻², perpendiculaire au champ." },
        hint: "L'axe optique est un axe principal : P = ε₀ χ E dans cette direction.",
        why: "Le long d'un axe principal, la polarisation suit le champ : P = ε₀ χ∥ E = 8,85 × 10⁻¹² × 1,21 × 10³ ≈ 1,07 × 10⁻⁸\u00a0C·m⁻². Oublier ε₀ donne 1,21 × 10³ ; prendre χ⊥ donne 1,55 × 10⁻⁸. Leçons « Le tenseur de polarisabilité » et « L'ellipsoïde d'énergie »." },
      mesures: { prompt: "On veut connaître le tenseur de polarisabilité d'un cristal inconnu, sans pertes. Combien de nombres indépendants faut-il mesurer ?",
        options: { a: "Trois : une susceptibilité par axe.", b: "Six : un tenseur symétrique a trois termes diagonaux et trois termes croisés.", c: "Neuf : trois composantes de P pour chacune des trois composantes de E.", d: "Un seul, si l'on choisit bien la direction du champ." },
        hint: "Un cycle de champs qui revient au départ ne doit rien rapporter.",
        why: "Neuf coefficients a priori, mais le travail d'un cycle vaut (α_xy \u2212 α_yx) E₁E₂ : sans pertes, il est nul, donc α_xy = α_yx. Restent six nombres. Trois suffiraient si l'on connaissait déjà les axes principaux, ce qui n'est pas le cas d'un cristal inconnu. Leçons « Le tenseur de polarisabilité » et « L'ellipsoïde d'énergie »." },
      tourne: { prompt: "Dans ses axes, un cristal a α/ε₀ = diag(2 ; 1 ; 1). On décrit le cristal dans des axes tournés de 45° autour de z. Que valent α′_xx/ε₀ et α′_xy/ε₀ ?",
        options: { a: "2 et 0 : tourner les axes ne change pas un cristal.", b: "1 et 1.", c: "1,5 et \u22120,5.", d: "1,5 et 0,5, toujours positif." },
        hint: "α′_xx = a cos²φ + b sin²φ, α′_xy = (b \u2212 a) sin φ cos φ.",
        why: "α′_xx = 2 × ½ + 1 × ½ = 1,5 ; α′_xy = (1 \u2212 2) × ½ = \u22120,5. Le signe dépend du sens de rotation et de l'ordre a, b ; le terme croisé dit seulement que ces axes ne sont pas ceux du cristal. Leçon « Changer de base : composantes d'un tenseur »." },
      invariant: { prompt: "Deux laboratoires mesurent le même tenseur d'inertie dans des axes différents. Lequel de ces nombres doivent-ils trouver égal ?",
        options: { a: "I_xx.", b: "Le produit d'inertie I_xy.", c: "Le plus grand des neuf coefficients.", d: "La somme I_xx + I_yy + I_zz." },
        hint: "Quelle combinaison des coefficients ne change pas dans I′ = R I Rᵀ ?",
        why: "La trace est un invariant de la règle de passage I′ = R I Rᵀ, comme le déterminant et les valeurs principales. Les coefficients pris un à un dépendent des axes. Leçons « Changer de base : composantes d'un tenseur » et « Le tenseur d'inertie »." },
      demiaxes: { prompt: "Les valeurs principales de la polarisabilité d'un cristal sont dans le rapport 1 : 4 : 9. Dans quel rapport sont les demi-axes de son ellipsoïde d'énergie ?",
        options: { a: "1 : 1/2 : 1/3, le plus long le long de la direction la moins polarisable.", b: "1 : 2 : 3, le plus long le long de la direction la plus polarisable.", c: "1 : 4 : 9, comme les valeurs principales.", d: "1 : 1 : 1 : l'énergie est la même dans toutes les directions." },
        hint: "À énergie fixée, α E² a la même valeur le long de chaque axe principal.",
        why: "À énergie fixée, α_kk E_k² = 2u₀ le long d'un axe principal : le demi-axe vaut √(2u₀/α_kk), proportionnel à 1/√α. Rapport 1 : 1/2 : 1/3. Leçon « L'ellipsoïde d'énergie »." },
      normale: { prompt: "Le champ vise un point de l'ellipsoïde d'énergie qui n'est pas un sommet. Où va la polarisation ?",
        options: { a: "Le long du champ, puisque l'énergie est fixée.", b: "Perpendiculairement à la surface de l'ellipsoïde en ce point.", c: "Tangentiellement à la surface, dans le plan de l'ellipse.", d: "Vers le centre de l'ellipsoïde." },
        hint: "∂u/∂E_i = Σ α_ij E_j.",
        why: "P est le gradient de l'énergie par rapport au champ, donc normal à la surface d'énergie constante. Elle n'est le long du champ qu'aux sommets, sur les axes principaux. Leçon « L'ellipsoïde d'énergie »." },
      coin: { prompt: "La brique d'acier de 7,85\u00a0kg (20 × 10 × 5\u00a0cm) tourne à 10\u00a0rad·s⁻¹ autour d'un axe parallèle à la petite arête, qui passe par un coin. Son énergie cinétique vaut environ…",
        options: { a: "1,6\u00a0J, comme autour du centre.", b: "0,65\u00a0J.", c: "6,5\u00a0J.", d: "26\u00a0J." },
        hint: "Huygens : I_zz,O = I_zz,G + m d², avec d la distance de G à l'axe.",
        why: "I_zz,G = m(a² + b²)/12 = 3,27 × 10⁻²\u00a0kg·m² ; d² = (a² + b²)/4 ; I_zz,O = m(a² + b²)/3 = 0,131\u00a0kg·m². E_c = ½ I_zz ω² ≈ 6,5\u00a0J : avec ω le long de z, seul I_zz compte, même si les produits d'inertie ne sont pas nuls. Leçon « Le tenseur d'inertie »." },
      paliers: { prompt: "Autour de ce coin, le moment cinétique de la brique fait environ 10° avec l'axe imposé. Que doivent faire les paliers ?",
        options: { a: "Rien : le centre de masse est hors de l'axe, mais la rotation est uniforme.", b: "Seulement porter le poids de la brique.", c: "Fournir un couple constant, dirigé le long de l'axe.", d: "Fournir un couple ω ∧ L, qui tourne avec la brique, en plus de la force qui maintient le centre de masse sur son cercle." },
        hint: "L n'est pas le long de ω : que vaut sa dérivée quand le solide tourne ?",
        why: "L n'est pas le long de ω : il tourne avec le solide et sa dérivée vaut ω ∧ L, environ 2,2\u00a0N·m ici. S'y ajoute la force centripète sur le centre de masse, hors de l'axe. Pour supprimer les deux, il faut un axe principal passant par le centre de masse : c'est l'équilibrage dynamique. Leçon « Le tenseur d'inertie »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

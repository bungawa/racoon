/* Épreuve de l'étape « Tenseur des contraintes et ordres supérieurs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      cle: { prompt: "Une force F = (0 ; 50 ; 0) N s'applique au bout d'une clé, en r = (0,3 ; 0 ; 0) m. Que contient le tableau τij = ri Fj \u2212 rj Fi ?",
        options: { a: "τxy = 15 N·m et τyx = \u221215 N·m, tout le reste nul : une rotation dans le plan xy, le vecteur (0 ; 0 ; 15) N·m.", b: "τxy = τyx = 15 N·m : le tableau est symétrique.", c: "τzz = 15 N·m, puisque la rotation se fait autour de z.", d: "Neuf termes non nuls, car le moment dépend des trois axes." },
        hint: "Seuls rx et Fy sont non nuls.",
        why: "τxy = rx Fy \u2212 ry Fx = 0,3 × 50 = 15 N·m, et τyx = \u2212τxy. La diagonale est toujours nulle. Le triplet (τyz ; τzx ; τxy) = (0 ; 0 ; 15) N·m est r ∧ F. Leçon « Le produit vectoriel comme tenseur »." },
      dimension: { prompt: "Pourquoi le moment d'une force peut-il s'écrire comme un vecteur en dimension 3, et pas dans un espace à 4 dimensions ?",
        options: { a: "Parce qu'en dimension 4 le moment d'une force n'existe pas.", b: "Un tableau antisymétrique a n(n \u2212 1)/2 termes : 3 en dimension 3, autant qu'un vecteur ; 6 en dimension 4, contre 4.", c: "Parce qu'en dimension 4 le tableau devient symétrique.", d: "Parce que le produit vectoriel exige des vecteurs unitaires." },
        hint: "Comptez les paires d'axes en dimension n.",
        why: "Le nombre de plans de coordonnées n'égale celui des axes qu'en dimension 3. En dimension 4, il faut garder le tableau : c'est le cas du champ électromagnétique dans l'espace-temps. Leçon « Le produit vectoriel comme tenseur »." },
      miroir: { prompt: "Dans un miroir, laquelle de ces grandeurs ne se réfléchit pas comme une flèche ordinaire ?",
        options: { a: "La vitesse d'un point.", b: "Une force.", c: "Le moment cinétique r ∧ p.", d: "L'accélération." },
        hint: "Laquelle est un produit vectoriel ?",
        why: "Le moment cinétique est le tableau antisymétrique ri pj \u2212 rj pi. Le tableau se transforme bien comme un tenseur, mais le triplet qu'on en tire prend un signe opposé à l'image attendue : c'est un pseudovecteur. Leçon « Le produit vectoriel comme tenseur »." },
      facette: { prompt: "En un point d'une tôle, σxx = 80 MPa, σyy = \u221240 MPa, σxy = 20 MPa. Que valent la contrainte normale et le cisaillement sur la facette dont la normale est à 45° de x ?",
        options: { a: "σn = 20 MPa et τn = 0 : c'est une facette principale.", b: "σn = 100 MPa et τn = 20 MPa.", c: "σn = 60 MPa et τn = 60 MPa.", d: "σn = 40 MPa et |τn| = 60 MPa." },
        hint: "À 45°, cos 2θ = 0 et sin 2θ = 1.",
        why: "σn = (80 \u2212 40)/2 + 0 + 20 × 1 = 40 MPa ; τn = \u2212(80 + 40)/2 × 1 + 20 × 0 = \u221260 MPa. La force par unité d'aire, (100 ; \u221220)/√2 MPa, n'est pas normale à la facette. Leçon « Le tenseur des contraintes »." },
      mohr: { prompt: "σxx = 100 MPa, σyy = 20 MPa, σxy = 30 MPa. Que donne le cercle de Mohr ?",
        options: { a: "Centre 60 MPa, rayon 50 MPa : σ1 = 110 MPa, σ2 = 10 MPa, cisaillement maximal 50 MPa.", b: "Centre 60 MPa, rayon 30 MPa : σ1 = 90 MPa, σ2 = 30 MPa.", c: "Centre 50 MPa, rayon 40 MPa : σ1 = 90 MPa, σ2 = 10 MPa.", d: "σ1 = 100 MPa et σ2 = 20 MPa : les contraintes principales sont σxx et σyy." },
        hint: "Le centre est la moyenne des contraintes normales ; le rayon combine leur demi-différence et le cisaillement.",
        why: "Centre (100 + 20)/2 = 60 MPa ; rayon √(40² + 30²) = 50 MPa. Les axes x et y ne sont pas principaux puisque σxy ≠ 0. Leçon « Le tenseur des contraintes »." },
      cisaillement: { prompt: "Acier S235 (fy = 235 MPa), γM0 = 1,00, cisaillement pur. Jusqu'à quel cisaillement le critère de l'Eurocode 3 (EN 1993-1-1) est-il vérifié ?",
        options: { a: "235 MPa : la limite est la même en traction et en cisaillement.", b: "Environ 136 MPa, soit 235/√3.", c: "117,5 MPa, la moitié de fy, comme le dit le critère de Tresca.", d: "Environ 407 MPa, soit √3 × 235." },
        hint: "Mettez σx = σz = 0 dans le critère : il reste le terme en τ, compté trois fois.",
        why: "Avec σx = σz = 0, le critère devient 3 (τ/fy)² ≤ 1, soit τ ≤ fy/√3 ≈ 136 MPa. C'est le critère de von Mises ; celui de Tresca donnerait fy/2, un peu plus sévère. Leçon « Le tenseur des contraintes »." },
      silicium: { prompt: "Deux barreaux de silicium monocristallin, l'un selon [100], l'autre selon [111], subissent la même traction. Lequel s'allonge le plus, et de combien environ ?",
        options: { a: "Le même allongement : un seul matériau, un seul module d'Young.", b: "Celui selon [111], environ 1,4 fois plus.", c: "Celui selon [100], environ 1,4 fois plus : 130 GPa contre 188 GPa.", d: "Celui selon [100], deux fois plus." },
        hint: "Le silicium est cubique : trois constantes, et le cube n'est pas une sphère.",
        why: "L'allongement est inversement proportionnel au module d'Young dans la direction de traction : 188/130 ≈ 1,44. Un tenseur d'élasticité cubique n'est isotrope que si 2C44 = C11 \u2212 C12 ; pour le silicium, le rapport vaut 1,56. Leçon « Tenseurs d'ordre supérieur »." },
      piezo: { prompt: "Le sel gemme (chlorure de sodium) a un centre d'inversion, le quartz non. Lequel peut être piézoélectrique ?",
        options: { a: "Les deux : tout cristal se polarise sous contrainte.", b: "Le sel seulement, car ses ions portent des charges.", c: "Aucun : la piézoélectricité demande un cristal isotrope.", d: "Le quartz seulement : par inversion, Pijk devient \u2212Pijk, donc un cristal symétrique par inversion a Pijk = 0." },
        hint: "Par inversion, un vecteur change de signe ; un tenseur d'ordre 2 ne change pas.",
        why: "Le champ électrique change de signe par inversion, la contrainte non. Un tenseur d'ordre 3 doit donc s'annuler dans un cristal centrosymétrique. Il reste au plus 18 coefficients, Pijk étant symétrique en jk. Leçon « Tenseurs d'ordre supérieur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

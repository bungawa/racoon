/* Épreuve de l'étape « Calculer un champ par le théorème de Gauss » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      surface: { prompt: "Pour calculer le champ d'un très long fil chargé par la loi de Gauss, quelle surface choisir ?",
        options: { a: "Un cylindre de même axe que le fil : le champ, radial, est normal et uniforme sur sa paroi, et tangent à ses bouchons.", b: "Une sphère centrée sur un point du fil.", c: "Un cube contenant un morceau du fil.", d: "N'importe laquelle : la loi de Gauss donne le champ quelle que soit la surface." },
        why: "La loi de Gauss vaut pour toute surface, mais elle ne donne que le flux. Seule une surface qui épouse la symétrie permet de sortir le champ de l'intégrale : E × 2πrh = λh/ε0. Leçon « Champ d'un fil chargé »." },
      distance: { prompt: "À 1\u00a0cm d'un long fil chargé, le champ vaut 3,6\u00a0kV·m⁻¹. Que vaut-il à 3\u00a0cm, loin des extrémités ?",
        options: { a: "0,4\u00a0kV·m⁻¹, en 1/r².", b: "1,2\u00a0kV·m⁻¹ : (5.2) décroît en 1/r.", c: "3,6\u00a0kV·m⁻¹, il ne dépend pas de la distance.", d: "Zéro, car le fil est neutre vu de loin." },
        why: "Le flux, fixé par la charge contenue, se répartit sur une paroi cylindrique d'aire proportionnelle à r : 3,6/3 = 1,2\u00a0kV·m⁻¹. Leçon « Champ d'un fil chargé »." },
      fini: { prompt: "Un bâton chargé uniformément mesure 20\u00a0cm. De combien (5.2) surestime-t-il le champ à 1\u00a0cm du bâton, en son milieu ?",
        options: { a: "De 5\u00a0%, le rapport r/L.", b: "De 30\u00a0%.", c: "D'environ 0,5\u00a0% : 1 \u2212 1/√(1 + 4r²/L²) ≈ 2r²/L².", d: "De rien, (5.2) est exacte au milieu." },
        hint: "La charge qui manque au-delà des bouts est vue sous un petit angle.",
        why: "2 × (1/20)² = 0,005. La correction est du second ordre en r/L : un bâton est un fil infini tant qu'on reste près de lui et loin de ses bouts. Leçon « Champ d'un fil chargé »." },
      coaxial: { prompt: "Un câble coaxial a une âme de 0,5\u00a0mm de rayon et une gaine de 5\u00a0mm de rayon, sous 1\u00a0000\u00a0V. Que vaut le champ à la surface de l'âme ?",
        options: { a: "1\u00a0000\u00a0V/4,5\u00a0mm ≈ 220\u00a0kV·m⁻¹, le champ moyen.", b: "Zéro, le champ est enfermé dans la gaine.", c: "2\u00a0MV·m⁻¹ : U/a.", d: "Environ 870\u00a0kV·m⁻¹ : U/(a ln(b/a)), avec ln 10 ≈ 2,3." },
        hint: "La tension est l'intégrale de λ/(2πε0 r) de a à b.",
        why: "U = λ ln(b/a)/(2πε0), donc E(a) = 1\u00a0000/(5 × 10⁻⁴ × 2,303) ≈ 8,7 × 10⁵\u00a0V·m⁻¹, quatre fois le champ moyen : le champ est le plus fort contre le conducteur le plus fin. Leçon « Champ d'un fil chargé »." },
      plan: { prompt: "Une grande plaque isolante porte 2\u00a0µC·m⁻², seule. Que vaut le champ à 1\u00a0cm d'elle, et à 2\u00a0cm ?",
        options: { a: "Environ 113\u00a0kV·m⁻¹ aux deux distances : σ/(2ε0).", b: "Environ 226\u00a0kV·m⁻¹ à 1\u00a0cm, le quart à 2\u00a0cm.", c: "Environ 113\u00a0kV·m⁻¹ à 1\u00a0cm, la moitié à 2\u00a0cm.", d: "Environ 226\u00a0kV·m⁻¹ aux deux distances : σ/ε0." },
        why: "(5.3) : 2 × 10⁻⁶/(2 × 8,854 × 10⁻¹²) ≈ 1,13 × 10⁵\u00a0V·m⁻¹, indépendant de la distance tant qu'elle reste petite devant la taille de la plaque. σ/ε0 est le champ près d'un conducteur, où tout le flux sort d'un seul côté. Leçon « Plan chargé et deux plans chargés »." },
      armatures: { prompt: "Deux grandes plaques parallèles, à 1\u00a0mm l'une de l'autre, sont sous 500\u00a0V. Quelle charge par mètre carré porte chacune ?",
        options: { a: "Environ 2,2\u00a0µC·m⁻², car chaque plaque crée σ/(2ε0).", b: "Environ 4,4\u00a0µC·m⁻² : σ = ε0 U/d, puisque le champ entre elles vaut σ/ε0 = U/d.", c: "Environ 0,5\u00a0µC·m⁻².", d: "Elle dépend de la distance au bord." },
        why: "(5.5) : E = σ/ε0 = 5 × 10⁵\u00a0V·m⁻¹, donc σ = 8,854 × 10⁻¹² × 5 × 10⁵ ≈ 4,4 × 10⁻⁶\u00a0C·m⁻². Les deux champs σ/(2ε0) s'ajoutent entre les plaques. Leçon « Plan chargé et deux plans chargés »." },
      coquille: { prompt: "Une coquille épaisse porte une charge uniforme entre 8\u00a0cm et 10\u00a0cm de rayon. Que vaut le champ à 5\u00a0cm du centre, hors du centre ?",
        options: { a: "Celui de la charge totale placée au centre.", b: "Celui de la charge entre 8\u00a0cm et 10\u00a0cm, en 1/r.", c: "Zéro : la sphère de Gauss de 5\u00a0cm ne contient aucune charge, et la symétrie impose un champ de même norme sur elle.", d: "Il est dirigé vers la paroi la plus proche." },
        why: "Sous le rayon intérieur, Q(r) = 0, quelle que soit l'épaisseur et en tout point, pas seulement au centre. Dans la paroi, le champ monte de 0 jusqu'à K Q/R². Leçon « Sphère et coquille sphérique chargées »." },
      force: { prompt: "La paroi d'une coquille mince porte σ. Le champ vaut 0 dedans et σ/ε0 dehors. Quelle force par mètre carré s'exerce sur la paroi ?",
        options: { a: "σ²/ε0, le produit de σ par le champ extérieur.", b: "Zéro, car le champ moyen est nul.", c: "Une force vers l'intérieur si σ > 0.", d: "σ²/(2ε0), vers l'extérieur quel que soit le signe : la paroi subit le champ des autres charges, σ/(2ε0)." },
        hint: "Une petite pièce de la paroi crée elle-même ±σ/(2ε0) de part et d'autre.",
        why: "Le champ des autres charges est la moyenne des deux côtés, σ/(2ε0). La force par unité d'aire vaut σ × σ/(2ε0), dans le sens qui écarte les charges les unes des autres. Leçon « Sphère et coquille sphérique chargées »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

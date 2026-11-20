/* Épreuve de l'étape « Aimantation et champ H » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      nappe: { prompt: "Un long cylindre néodyme-fer-bore est aimanté uniformément le long de son axe ; au milieu, B\u00a0=\u00a01,3\u00a0T. Quel courant d'aimantation porte sa face latérale, par mètre de longueur ?",
        options: { a: "Environ 1,0\u00a0×\u00a010⁶\u00a0A.", b: "Environ 1,3\u00a0A.", c: "Aucun : les boucles atomiques s'annulent partout.", d: "Environ 1,6\u00a0×\u00a010⁻⁶\u00a0A." },
        hint: "Un barreau long est un solénoïde de courant M par mètre.",
        why: "Loin des bouts, B\u00a0=\u00a0μ0M, donc K\u00a0=\u00a0M\u00a0=\u00a01,3/(1,26\u00a0×\u00a010⁻⁶) ≈ 1,0\u00a0×\u00a010⁶\u00a0A par mètre. Les boucles s'annulent dans le volume, pas sur la face latérale. Leçon « Courants d'aimantation »." },
      gradient: { prompt: "Dans une plaque, l'aimantation est selon z et décroît linéairement de 8\u00a0×\u00a010⁵\u00a0A·m⁻¹ à zéro sur 2\u00a0mm le long de x. Quelle densité de courant d'aimantation y circule ?",
        options: { a: "4\u00a0×\u00a010⁸\u00a0A·m⁻², selon \u2212y.", b: "4\u00a0×\u00a010⁸\u00a0A·m⁻², selon +y.", c: "4\u00a0×\u00a010⁵\u00a0A·m⁻², selon z.", d: "Aucune : M est selon z, et ne varie pas selon z." },
        why: "(36.8) : j_y\u00a0=\u00a0\u2212∂Mz/∂x\u00a0=\u00a0\u2212(\u22128\u00a0×\u00a010⁵)/(2\u00a0×\u00a010⁻³)\u00a0=\u00a0+4\u00a0×\u00a010⁸\u00a0A·m⁻². Le courant est perpendiculaire à M et à la direction où M varie. Leçon « Courants d'aimantation »." },
      charge: { prompt: "Parmi les trois parts du courant d'un milieu matériel, (36.10), lesquelles peuvent faire varier la densité de charge en un point ?",
        options: { a: "Les trois.", b: "Seulement le courant d'aimantation.", c: "Le courant libre et le courant de polarisation, jamais le courant d'aimantation.", d: "Aucune : la charge est conservée." },
        why: "La divergence de rot M est nulle : ce courant boucle sur lui-même. Celle de ∂P/∂t vaut \u2212∂ρpol/∂t, et celle du courant libre la variation des charges libres. Leçons « Courants d'aimantation » et « Charges de polarisation »." },
      disque: { prompt: "Un disque aimanté uniformément selon son axe, d'épaisseur égale au dixième de son diamètre, a M\u00a0=\u00a010⁶\u00a0A·m⁻¹. Que vaut H en son centre ?",
        options: { a: "Zéro : il n'y a aucun courant libre.", b: "Environ +0,9\u00a0×\u00a010⁶\u00a0A·m⁻¹, dans le sens de M.", c: "Environ 0,1\u00a0T.", d: "Environ \u22120,9\u00a0×\u00a010⁶\u00a0A·m⁻¹, opposé à M." },
        hint: "Au centre d'un cylindre, H\u00a0=\u00a0\u2212Nd M, avec Nd\u00a0=\u00a01\u00a0\u2212\u00a0L/√(L²\u00a0+\u00a04R²).",
        why: "Nd\u00a0=\u00a01\u00a0\u2212\u00a00,2/√(0,04\u00a0+\u00a04) ≈ 0,90 : B au centre ne vaut que 0,1\u00a0μ0M, et H\u00a0=\u00a0B/μ0\u00a0\u2212\u00a0M ≈ \u22120,9\u00a0×\u00a010⁶\u00a0A·m⁻¹. Un aimant plat subit un fort champ démagnétisant. Leçon « Le champ H »." },
      biot: { prompt: "Puisque rot H\u00a0=\u00a0j libre en statique, peut-on calculer H par la loi de Biot et Savart appliquée aux seuls courants libres ?",
        options: { a: "Non : div H\u00a0=\u00a0\u2212div M n'est pas nulle, et un champ n'est fixé que par son rotationnel et sa divergence.", b: "Oui, toujours : c'est l'intérêt de H.", c: "Oui, sauf dans le vide.", d: "Non, car rot H n'est pas égal au courant libre dans la matière." },
        why: "Biot et Savart donne le champ de divergence nulle qui a un rotationnel donné. H a aussi des sources dans sa divergence, là où M varie ou s'arrête : un aimant a un H non nul sans aucun courant libre. Leçon « Le champ H »." },
      bismuth: { prompt: "Dans du bismuth (χ ≈ \u22121,66\u00a0×\u00a010⁻⁴) où B\u00a0=\u00a01\u00a0T, de combien H diffère-t-il de B/μ0, en valeur relative ?",
        options: { a: "De zéro : H\u00a0=\u00a0B/μ0 dans tout matériau.", b: "D'environ 1,7\u00a0×\u00a010⁻⁴.", c: "D'environ 50\u00a0%.", d: "D'environ 10⁻¹⁰." },
        why: "H\u00a0=\u00a0B/(μ0(1\u00a0+\u00a0χ)) : l'écart relatif vaut |χ| à χ² près. Pour un dia- ou un paramagnétique, H et B/μ0 sont presque le même champ. Leçon « Le champ H »." },
      anneau: { prompt: "Un anneau de fer de longueur moyenne 0,3\u00a0m porte 300 spires parcourues par 2\u00a0A ; l'enroulement de mesure indique B\u00a0=\u00a01,5\u00a0T. Que vaut l'aimantation du fer ?",
        options: { a: "2\u00a0×\u00a010³\u00a0A·m⁻¹, comme H.", b: "Zéro : un anneau n'a pas de face, donc pas d'aimantation.", c: "Environ 1,19\u00a0×\u00a010⁶\u00a0A·m⁻¹.", d: "1,5\u00a0T." },
        hint: "H se lit sur le courant, B sur la tension ; M\u00a0=\u00a0B/μ0\u00a0\u2212\u00a0H.",
        why: "(36.20) : H\u00a0=\u00a0300\u00a0×\u00a02/0,3\u00a0=\u00a02\u00a0000\u00a0A·m⁻¹. M\u00a0=\u00a01,5/(1,26\u00a0×\u00a010⁻⁶)\u00a0\u2212\u00a02\u00a0000 ≈ 1,19\u00a0×\u00a010⁶\u00a0A·m⁻¹ : le fer fournit presque tout le champ. Leçon « Courbe d'aimantation »." },
      histoire: { prompt: "Deux anneaux du même fer, enroulés pareil, portent le même courant. L'un donne B\u00a0=\u00a01,2\u00a0T, l'autre 0,4\u00a0T. Qu'en conclure ?",
        options: { a: "Une erreur de mesure : à même H, même B.", b: "Que les deux fers ont des aimantations à saturation différentes.", c: "Que H diffère dans les deux anneaux.", d: "Rien d'anormal : B dépend de l'histoire du fer, par exemple d'une saturation passée dans un sens ou dans l'autre." },
        why: "H est le même, fixé par le courant. Mais la relation entre B et H n'est pas une fonction : sur un cycle d'hystérésis, un même H correspond à une branche montante et à une branche descendante. Leçon « Courbe d'aimantation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

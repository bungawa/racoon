/* Épreuve de l'étape « Champs et gradient » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      neutre: { prompt: "Une planète a une lune 16 fois moins massive qu'elle, à 500\u202f000\u00a0km de centre à centre. Sans calcul détaillé, où les deux attractions se compensent-elles sur l'axe, depuis la planète ?",
        options: { a: "À 400\u202f000\u00a0km : (d \u2212 x)/x = √(1/16) = 1/4.", b: "À environ 470\u202f000\u00a0km : (d \u2212 x)/x = 1/16.", c: "À 250\u202f000\u00a0km, au milieu.", d: "À environ 480\u202f000\u00a0km : le rapport des masses joue au carré." },
        hint: "Les attractions varient comme M/r² : ce sont les racines des masses qui se comparent.",
        why: "GM/x² = (GM/16)/(d \u2212 x)² donne (d \u2212 x)/x = 1/4, d'où x = 4d/5 = 400\u202f000\u00a0km. Les masses comptent par leur racine parce que les distances interviennent au carré. Prévoir avant de calculer : leçon « Comprendre la physique »." },
      referentiel: { prompt: "Pour la Terre et la Lune, le point où le champ de gravitation s'annule est à 346\u202f000\u00a0km de la Terre, mais l'équilibre d'un engin qui tourne avec la Lune, L1, est à 326\u202f000\u00a0km. Que faut-il en conclure ?",
        options: { a: "La carte du champ est fausse de 6\u00a0%.", b: "La gravitation de la Lune est plus forte qu'on ne le croyait.", c: "Le champ est juste ; dans le référentiel tournant s'ajoute une accélération centrifuge, qui n'est pas petite à cette distance.", d: "Il faut la relativité générale pour placer L1." },
        hint: "Qu'est-ce qui change entre une photographie du champ et un engin qui tourne avec la Lune ?",
        why: "Le champ de gravitation est le même ; c'est le référentiel qui ajoute une accélération d'entraînement, environ 0,7 fois l'attraction terrestre au point neutre. Décrire le système, référentiel compris, avant d'appliquer la loi : leçon « Comprendre la physique »." },
      isothermes: { prompt: "Près du bord chaud d'une plaque, deux isothermes à 330\u00a0K et 340\u00a0K sont distantes de 2\u00a0mm. Que vaut, à peu près, le gradient de température entre elles ?",
        options: { a: "20\u00a0K·m⁻¹, le long des isothermes.", b: "5\u202f000\u00a0K·m⁻¹, perpendiculaire aux isothermes, vers 340\u00a0K.", c: "5\u00a0K·m⁻¹, perpendiculaire aux isothermes.", d: "On ne peut rien dire sans les axes." },
        hint: "Le gradient est perpendiculaire aux surfaces de niveau ; sa norme est l'écart de valeur divisé par la distance.",
        why: "10\u00a0K sur 2 × 10⁻³ m font 5\u202f000\u00a0K·m⁻¹. Le gradient est perpendiculaire aux isothermes et pointe vers le chaud. Leçons « Champs scalaires et champs de vecteurs » et « Dériver un champ : le gradient »." },
      fenetre: { prompt: "Un courant de chaleur uniforme de 200\u00a0W·m⁻² traverse une vitre de 1,5\u00a0m² dont la normale fait 60° avec le courant. Quelle puissance traverse la vitre ?",
        options: { a: "300\u00a0W : h fois l'aire.", b: "260\u00a0W : h fois l'aire fois sin 60°.", c: "0\u00a0W : la vitre n'est pas perpendiculaire au courant.", d: "150\u00a0W : (h · n) fois l'aire." },
        hint: "Seule compte la composante de h sur la normale.",
        why: "ΔJ = h cos θ Δa = 200 × 0,5 × 1,5 = 150\u00a0W. La vitre ne présente au courant que sa projection, Δa cos θ. Leçon « Champs scalaires et champs de vecteurs », (2.10)." },
      vecteur: { prompt: "Quel argument établit que (∂T/∂x, ∂T/∂y, ∂T/∂z) est un vecteur, et pas trois nombres quelconques ?",
        options: { a: "Pour tout petit déplacement ΔR, leur produit scalaire avec ΔR donne ΔT, un scalaire qui ne dépend pas des axes.", b: "La température est positive en kelvins.", c: "Ce sont trois dérivées, et toute dérivée est un vecteur.", d: "Ils sont tous nuls là où T est maximal." },
        hint: "Rappelez le critère : un produit scalaire avec un vecteur quelconque qui donne toujours un scalaire.",
        why: "ΔT = grad T · ΔR, avec ΔT invariant et ΔR arbitraire : c'est le critère d'un vecteur. Leçon « Dériver un champ : le gradient », (2.15)." },
      forage: { prompt: "Sous un continent, le gradient de température vaut 0,03\u00a0K·m⁻¹, dirigé vers le bas. Un forage incliné à 60° de la verticale avance de 1\u202f000\u00a0m le long de son axe. De combien la température augmente-t-elle, au premier ordre ?",
        options: { a: "30\u00a0K : la longueur forée compte seule.", b: "26\u00a0K : 30 × sin 60°.", c: "15\u00a0K : 0,03 × 1\u202f000 × cos 60°.", d: "0\u00a0K : le forage n'est pas vertical." },
        hint: "ΔT = grad T · ΔR.",
        why: "Le produit scalaire ne retient que la descente verticale, 1\u202f000 × cos 60° = 500\u00a0m : 0,03 × 500 = 15\u00a0K. Leçon « Dériver un champ : le gradient »." },
      ordre: { prompt: "Laquelle de ces écritures est un vecteur physique, mesurable en un point ?",
        options: { a: "∇ seul.", b: "∇T.", c: "T∇.", d: "∇ · ∇ sans fonction." },
        hint: "∇ dérive ce qui est à sa droite.",
        why: "∇T est le gradient de T, un vecteur. ∇ seul et T∇ sont des opérateurs qui attendent une fonction ; ∇ · ∇ aussi. Leçon « L'opérateur nabla »." },
      cuve: { prompt: "Dans une cuve d'eau au repos, on passe d'un point A à un point B situé 2\u00a0m plus bas et 3\u00a0m plus loin horizontalement. De combien la pression augmente-t-elle ?",
        options: { a: "49\u00a0kPa : 9,8\u00a0kPa par mètre sur 5\u00a0m de trajet.", b: "35\u00a0kPa : 9,8\u00a0kPa par mètre sur la distance AB.", c: "0\u00a0kPa : l'eau est au repos.", d: "Environ 19,6\u00a0kPa : ∇p = ρg est vertical, seule la descente compte." },
        hint: "Calculez ∇p · ΔR.",
        why: "∇p = ρg vaut 9,8\u00a0kPa·m⁻¹ vers le bas ; ∇p · ΔR = 9,8 × 2 ≈ 19,6\u00a0kPa. Le déplacement horizontal est perpendiculaire au gradient. Leçon « L'opérateur nabla »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

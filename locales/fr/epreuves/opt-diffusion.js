/* Épreuve de l'étape « Diffusion de la lumière » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      battement: { prompt: "Deux lasers indépendants, d'amplitudes égales, diffèrent de 50\u00a0Hz. Une caméra moyenne chaque image sur 1\u00a0ms. Quel contraste garde-t-elle des battements ?",
        options: { a: "Environ 0,996 : δf T = 0,05, la caméra suit les battements.", b: "0 : deux sources indépendantes n'interfèrent pas.", c: "0,5 : la moitié du terme croisé est perdue.", d: "0,05, égal à δf T." },
        hint: "Le contraste est multiplié par sin(πδf T)/(πδf T).",
        why: "sin(0,157)/0,157 ≈ 0,996. Il faudrait δf T de l'ordre de 1 pour effacer le terme croisé. Leçon « Les sources indépendantes »." },
      lampes: { prompt: "Dans deux lampes, la différence de phase saute au hasard toutes les nanosecondes. Un détecteur moyenne sur 0,1\u00a0s. Quelle fluctuation relative du terme croisé reste-t-il, en unités de 2A₁A₂ ?",
        options: { a: "0 exactement.", b: "Environ 7 × 10⁻⁵ : √(τc/(2T)).", c: "Environ 10⁻⁸, le rapport τc/T.", d: "Environ 0,5 : un cosinus moyen vaut ½." },
        why: "Sur n = T/τc = 10⁸ trains de phases indépendantes, la moyenne des cosinus a un écart type 1/√(2n) ≈ 7 × 10⁻⁵. Leçon « Les sources indépendantes »." },
      hasard: { prompt: "Quatre cents sources de même amplitude A, de phases indépendantes, éclairent un point. Que dire de l'intensité reçue ?",
        options: { a: "Elle vaut toujours 160\u202f000 A².", b: "Elle est nulle en moyenne.", c: "Elle vaut 400 A² en moyenne, mais un tirage donné fluctue autant que cette moyenne.", d: "Elle vaut toujours exactement 400 A²." },
        why: "Les termes croisés se compensent en moyenne seulement : la somme des phaseurs est une marche au hasard de longueur typique √400 = 20 A, et son carré suit une loi exponentielle. Leçon « Les sources indépendantes »." },
      couleur: { prompt: "Dans quel rapport l'air diffuse-t-il la lumière à 400\u00a0nm et à 600\u00a0nm ?",
        options: { a: "1,5, le rapport des longueurs d'onde.", b: "2,25, le carré de ce rapport.", c: "1 : la diffusion ne dépend pas de la couleur.", d: "Environ 5 : (600/400)⁴ ≈ 5,1, un peu plus avec la dispersion de l'indice de l'air." },
        why: "Loin sous les résonances des molécules, σ ∝ ω⁴ ∝ λ⁻⁴. Le facteur (n \u2212 1)² de la section, plus grand dans le bleu, porte le rapport vers 5,3. Leçon « La diffusion de la lumière »." },
      thomson: { prompt: "Un électron libre est placé dans une onde d'amplitude E₀ = 1\u00a0kV·m⁻¹, de flux ½ε₀cE₀² ≈ 1,33\u00a0kW·m⁻². Quelle puissance diffuse-t-il ?",
        options: { a: "Environ 8,8 × 10⁻²⁶\u00a0W : σT ≈ 6,65 × 10⁻²⁹\u00a0m² fois le flux.", b: "Environ 1,33\u00a0kW : toute la puissance incidente.", c: "Zéro : un électron libre ne diffuse pas.", d: "Environ 8,8 × 10⁻²⁶\u00a0W multiplié par ω⁴, qu'il faut connaître." },
        hint: "Pour ω0 = 0, la section ne dépend pas de la fréquence.",
        why: "P = σT × ½ε₀cE₀² = 6,65 × 10⁻²⁹ × 1,33 × 10³ ≈ 8,8 × 10⁻²⁶\u00a0W. La section de Thomson ne dépend pas de ω. Leçon « La diffusion de la lumière »." },
      montagne: { prompt: "Au niveau de la mer, l'épaisseur optique des molécules de l'air vaut 0,092 à 550\u00a0nm. Que vaut-elle dans un observatoire où la pression est de 68\u202f000\u00a0Pa ?",
        options: { a: "0,092 : elle ne dépend que de la longueur d'onde.", b: "Environ 0,062 : elle est proportionnelle à la pression, qui compte les molécules de la colonne.", c: "Environ 0,14 : l'air raréfié diffuse davantage.", d: "Environ 0,042, proportionnelle au carré de la pression." },
        why: "τ = σ p NA/(M g) : la section d'une molécule ne change pas, seul change le nombre de molécules au-dessus du lieu. 0,092 × 68\u202f000/101\u202f325 ≈ 0,062. Leçon « La diffusion de la lumière »." },
      cercle: { prompt: "Ex = 3 cos ωt et Ey = 3 cos(ωt + π/2), x à droite et y en haut, la lumière venant vers l'observateur. Quelle est la polarisation ?",
        options: { a: "Rectiligne, à 45°.", b: "Circulaire, sens trigonométrique : droite selon Feynman.", c: "Circulaire, sens horaire : gauche selon Feynman.", d: "Elliptique de grand axe selon x." },
        hint: "Ey = \u22123 sin ωt : suivez le point de ωt = 0 à ωt = π/2.",
        why: "Le champ part de (3, 0) et passe par (0, \u22123) un quart de période plus tard : il tourne dans le sens horaire, à module constant. Feynman et la norme IEEE 145 l'appellent gauche ; beaucoup de livres d'optique, droite. Leçon « Le vecteur électrique de la lumière »." },
      polariseur: { prompt: "On fait passer à travers un polariseur rectiligne, qu'on tourne, d'abord une lumière naturelle, puis une lumière polarisée circulairement. Que mesure-t-on ?",
        options: { a: "La lumière circulaire passe entièrement pour une orientation, pas la naturelle.", b: "La lumière naturelle est entièrement arrêtée.", c: "La lumière circulaire est entièrement arrêtée pour une orientation.", d: "La moitié de l'intensité dans les deux cas, quelle que soit l'orientation : un polariseur seul ne les distingue pas." },
        why: "Pour un cercle, la composante selon toute direction a la même amplitude : la moitié de l'intensité passe. Pour la lumière naturelle, c'est vrai en moyenne. Il faut une lame biréfringente pour les distinguer. Leçon « Le vecteur électrique de la lumière »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

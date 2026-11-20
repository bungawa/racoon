/* Épreuve de l'étape « Conduction thermique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {

      fourier: { prompt: "Une plaque de cuivre (λ = 401 W·m⁻¹·K⁻¹) de 1,0 cm d'épaisseur a ses faces à 310 K et 300 K, en régime stationnaire. Quelle densité de flux la traverse ?",
        options: { a: "4,0 kW·m⁻².", b: "0,40 MW·m⁻², de la face chaude vers la face froide.", c: "40 W·m⁻².", d: "0,40 MW·m⁻², de la face froide vers la face chaude." },
        hint: "j = λ ΔT/e, dans le sens des températures décroissantes.",
        why: "j = 401 × 10/0,010 = 4,0 × 10⁵ W·m⁻². Le signe moins de la loi de Fourier oriente le flux vers le froid. Leçon « Loi de Fourier et équation de la chaleur »." },
      temps: { prompt: "Un mur de brique de 20 cm (D = 5,2 × 10⁻⁷ m²·s⁻¹) met environ 21 h à atteindre son régime stationnaire. Combien de temps pour un mur de 40 cm de la même brique ?",
        options: { a: "21 h : le matériau est le même.", b: "42 h.", c: "30 h.", d: "85 h environ : le temps de diffusion varie comme le carré de l'épaisseur." },
        why: "τ = L²/D : doubler L quadruple τ, soit 0,16/5,2 × 10⁻⁷ = 3,1 × 10⁵ s = 85 h. Une diffusion parcourt une distance proportionnelle à la racine carrée du temps." },
      vitre: { prompt: "Une vitre de 4 mm (λ = 0,9 W·m⁻¹·K⁻¹) sépare une pièce à 293 K d'un extérieur à 273 K. Avec les résistances de surface de la norme EN ISO 6946 (0,13 et 0,04 m²·K·W⁻¹), que vaut le flux par mètre carré, et où tombe la température ?",
        options: { a: "115 W·m⁻² ; presque toute la chute se fait dans l'air, aux deux surfaces : le verre n'en porte que 0,5 K.", b: "4 500 W·m⁻² ; toute la chute se fait dans le verre.", c: "115 W·m⁻² ; la chute se partage également entre le verre et l'air.", d: "20 W·m⁻² ; le verre est un isolant." },
        hint: "e/λ = 0,0044 m²·K·W⁻¹ pour le verre.",
        why: "R = 0,13 + 0,0044 + 0,04 = 0,174 m²·K·W⁻¹, donc 20/0,174 = 115 W·m⁻². La chute dans le verre vaut 115 × 0,0044 = 0,5 K. Un simple vitrage n'isole que par ses deux couches d'air ; 4 500 W·m⁻² suppose à tort les faces du verre à 293 K et 273 K. Leçon « Régime stationnaire et résistance thermique »." },
      serie: { prompt: "Un mur a une résistance de 0,5 m²·K·W⁻¹, surfaces comprises. On ajoute 10 cm de laine minérale (λ = 0,04 W·m⁻¹·K⁻¹). Par combien les pertes sont-elles divisées ?",
        options: { a: "Par 2,5.", b: "Par 5.", c: "Par 6 : la résistance passe de 0,5 à 3,0 m²·K·W⁻¹.", d: "Par 25." },
        why: "L'isolant ajoute e/λ = 0,10/0,04 = 2,5 m²·K·W⁻¹ en série. Le flux varie comme l'inverse de la résistance totale : 3,0/0,5 = 6." },
      surface: { prompt: "Dans ce mur isolé (3,0 m²·K·W⁻¹ au total, dont 0,13 pour la surface intérieure), par 293 K dedans et 273 K dehors, à quelle température est la face intérieure ?",
        options: { a: "283 K, la moyenne.", b: "292,1 K : la chute à la surface vaut le flux, 6,7 W·m⁻², fois 0,13.", c: "293 K exactement.", d: "287 K." },
        hint: "Dans une série, les chutes de température sont proportionnelles aux résistances.",
        why: "Flux = 20/3,0 = 6,7 W·m⁻² ; chute à la surface intérieure = 6,7 × 0,13 = 0,87 K. Sans isolant, le même calcul donnait une paroi à 287 K, froide au toucher." },
      arqs: { prompt: "Quand a-t-on le droit de remplacer un mur par sa seule résistance thermique ?",
        options: { a: "Quand les températures à ses bornes varient lentement devant son temps de diffusion e²/D : c'est l'analogue thermique des régimes quasi stationnaires.", b: "Toujours : c'est une conséquence de la loi de Fourier.", c: "Seulement si le mur est en métal.", d: "Quand le flux est faible." },
        why: "La résistance décrit le régime stationnaire, où aucune couche ne stocke d'énergie. Si les températures changent en un temps comparable à e²/D, le mur accumule et restitue : il faut une capacité dans le schéma, ou l'équation de la chaleur." },
      delta: { prompt: "La température de surface d'un sol (D = 5 × 10⁻⁷ m²·s⁻¹) oscille sur un an (ω = 2,0 × 10⁻⁷ rad·s⁻¹). Quelle est la profondeur de pénétration δ = √(2D/ω), et que reste-t-il de l'oscillation à cette profondeur ?",
        options: { a: "2,2 mm ; 37 %.", b: "2,2 m ; rien.", c: "22 m ; 50 %.", d: "2,2 m ; 37 %, avec un retard de deux mois environ." },
        why: "δ = √(10⁻⁶/2,0 × 10⁻⁷) = √5 = 2,2 m. L'amplitude y est divisée par e (37 %) et la phase retardée de 1 rad, soit 1/(2π) an ≈ 58 jours. Leçon « Régime variable et ondes thermiques »." },
      cave: { prompt: "Dans le même sol, à quelle profondeur le maximum annuel de température arrive-t-il en plein hiver, et avec quelle amplitude ?",
        options: { a: "À δ = 2,2 m, avec 37 % de l'amplitude de surface.", b: "Nulle part : le retard ne dépasse jamais un quart de période.", c: "À πδ ≈ 7 m, avec e^(\u2212π) ≈ 4 % de l'amplitude de surface.", d: "À 2πδ ≈ 14 m, avec la même amplitude qu'en surface." },
        hint: "Opposition de phase : x/δ = π.",
        why: "Le retard de phase x/δ vaut π à la profondeur πδ = 7,0 m. L'amplitude y est e^(\u2212π) = 0,043 fois celle de la surface : l'onde thermique est presque éteinte avant d'avoir parcouru une demi-longueur d'onde." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

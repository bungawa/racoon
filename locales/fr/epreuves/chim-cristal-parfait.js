/* Épreuve de l'étape « Le cristal parfait » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      blende: { prompt: "La maille cubique de la blende, ZnS, porte des ions S²⁻ aux coins et aux centres des faces, et 4 ions Zn²⁺ à l'intérieur, aux centres de 4 des 8 petits cubes d'arête a/2. Que donne le compte ?",
        options: { a: "4 S²⁻ et 4 Zn²⁺ : la formule ZnS, avec la moitié des sites tétraédriques occupés.", b: "14 S²⁻ et 4 Zn²⁺.", c: "1 S²⁻ et 4 Zn²⁺.", d: "4 S²⁻ et 8 Zn²⁺ : tous les sites tétraédriques occupés." },
        hint: "Un coin compte pour 1/8, une face pour 1/2 ; les centres des petits cubes sont les sites tétraédriques.",
        why: "S²⁻ : 8 × 1/8 + 6 × 1/2 = 4. Zn²⁺ : 4 ions intérieurs. Le rapport 1 : 1 redonne la formule. La maille a 8 sites tétraédriques : 4 sont occupés, la moitié. Leçons « Réseau, motif et maille » et « Compacité, masse volumique et sites interstitiels »." },
      reseau: { prompt: "Un cristal a un atome X à chaque coin d'un cube et un atome Y au centre. Quand son réseau est-il cubique centré ?",
        options: { a: "Toujours : le dessin est celui du cubique centré.", b: "Seulement si X et Y sont de la même espèce ; sinon le réseau est cubique simple, avec un motif de deux atomes.", c: "Seulement si Y est plus petit que X.", d: "Jamais : un réseau n'a qu'un nœud par maille." },
        hint: "Une translation du réseau doit amener chaque atome sur un atome de la même espèce.",
        why: "La translation du coin au centre amène X sur Y. C'est une translation du réseau seulement si X et Y sont identiques, comme dans le fer α. Pour le chlorure de césium, elle ne l'est pas : réseau cubique simple, motif Cs⁺ + Cl⁻. Leçon « Réseau, motif et maille »." },
      argent: { prompt: "L'argent est cubique à faces centrées, de paramètre a = 408,53\u00a0pm. Que vaut son rayon selon le modèle des sphères en contact ?",
        options: { a: "204\u00a0pm, soit a/2.", b: "177\u00a0pm, soit a√3/4.", c: "144\u00a0pm, soit a√2/4.", d: "102\u00a0pm, soit a/4." },
        hint: "Le long de quelle droite deux atomes voisins se touchent-ils ?",
        why: "Les sphères se touchent sur la diagonale d'une face, qui porte quatre rayons : 4r = a√2, r = 144,4\u00a0pm. Le long d'une arête ou d'une grande diagonale, elles ne se touchent pas. Leçon « Empilements compacts »." },
      empilements: { prompt: "Des couches compactes empilées ABAB… d'un côté, ABCABC… de l'autre. Qu'ont-elles en commun ?",
        options: { a: "Rien : l'un est un réseau de Bravais, l'autre non.", b: "La même maille cubique.", c: "Les mêmes plans compacts : quatre familles chacun.", d: "La même compacité, 0,74, la même coordinence, 12, et par sphère 2 sites tétraédriques et 1 octaédrique." },
        why: "Chaque couche se pose de la même façon dans les creux de la précédente : même volume par sphère, mêmes voisins proches, mêmes sites par intervalle. Ce qui diffère : la symétrie (une seule famille de plans compacts pour AB…, quatre pour ABC…) et l'arrangement des sites. Leçon « Empilements compacts »." },
      aluminium: { prompt: "L'aluminium, de masse molaire 26,98 × 10⁻³\u00a0kg·mol⁻¹, est cubique à faces centrées, a = 404,95\u00a0pm. Quelle masse volumique le modèle prédit-il ?",
        options: { a: "Environ 2\u202f700\u00a0kg·m⁻³.", b: "Environ 675\u00a0kg·m⁻³.", c: "Environ 5\u202f400\u00a0kg·m⁻³.", d: "Environ 10\u202f800\u00a0kg·m⁻³." },
        hint: "ρ = N M / (N_A a³), avec N la population de la maille.",
        why: "4 × 26,98 × 10⁻³ / (6,022 × 10²³ × (404,95 × 10⁻¹²)³) ≈ 2\u202f699\u00a0kg·m⁻³, pour 2\u202f700 mesurés. 675 oublie que la maille contient 4 atomes ; 5\u202f400 et 10\u202f800 en comptent 8 et 16. Leçon « Compacité, masse volumique et sites interstitiels »." },
      nickel: { prompt: "Dans le nickel, de rayon r = 124,6\u00a0pm, quel est le plus gros atome qu'un site octaédrique accueille sans écarter ses voisins ?",
        options: { a: "28,0\u00a0pm.", b: "51,6\u00a0pm.", c: "124,6\u00a0pm.", d: "91,2\u00a0pm." },
        why: "Au centre du cube, les voisins sont à a/2 = √2 r : r_O = (√2 \u2212 1) r ≈ 0,414 × 124,6 ≈ 51,6\u00a0pm. 28,0\u00a0pm est le site tétraédrique, (√(3/2) \u2212 1) r ; 91,2\u00a0pm serait le centre d'un cube de huit sphères, absent du cubique à faces centrées. Leçon « Compacité, masse volumique et sites interstitiels »." },
      insertion: { prompt: "Le palladium (a = 388,9\u00a0pm) absorbe beaucoup d'hydrogène en gardant sa structure ; le carbone peine à entrer dans le nickel. Que dit le modèle des sites ?",
        options: { a: "Le palladium a plus de sites par atome que le nickel.", b: "L'hydrogène remplace des atomes de palladium.", c: "L'atome d'hydrogène, le plus petit de tous, se loge dans les sites octaédriques du palladium (57\u00a0pm) ; le carbone, 77\u00a0pm, dépasse ceux du nickel (51,6\u00a0pm).", d: "Le nickel n'est pas cubique à faces centrées." },
        why: "Les deux métaux sont cubiques à faces centrées, avec 1 site octaédrique par atome. Ce qui compte est la taille : r_O = 0,414 × 137,5 ≈ 57\u00a0pm pour le palladium. La maille du palladium gonfle quand même, jusqu'à 402,5\u00a0pm : la sphère dure reste un modèle. Leçon « Compacité, masse volumique et sites interstitiels »." },
      fer: { prompt: "Chauffé, le fer passe du cubique centré (compacité 0,68) au cubique à faces centrées (0,74). Dans le modèle des sphères dures de même rayon, comment change son volume ?",
        options: { a: "Il augmente d'environ 9\u00a0%.", b: "Il ne change pas : c'est le même atome.", c: "Il diminue de 26\u00a0%, la part de vide du cubique à faces centrées.", d: "Il diminue d'environ 8\u00a0% : le volume varie comme l'inverse de la compacité." },
        hint: "À nombre d'atomes et rayon fixés, le volume occupé est inversement proportionnel à la compacité.",
        why: "0,680/0,740 ≈ 0,92 : environ 8\u00a0% de moins. Le fer réel varie bien moins, car la distance entre atomes change aussi d'une structure à l'autre : le rayon de contact dépend de la coordinence. Leçons « Empilements compacts » et « Compacité, masse volumique et sites interstitiels »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

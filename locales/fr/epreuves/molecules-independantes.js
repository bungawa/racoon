/* Épreuve de l'étape « Particules indépendantes en chimie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      anneau: { prompt: "Quels sont les niveaux des électrons π d'un anneau de quatre carbones, dans le modèle des électrons indépendants ?",
        options: { a: "E₀ \u2212 A quatre fois.", b: "E₀ \u2212 4A à E₀ + 4A.", c: "E₀ \u2212 2A et E₀ + 2A seulement.", d: "E₀ \u2212 2A, E₀ deux fois, E₀ + 2A : \u22122A cos(2πs/4)." },
        why: "s = 0, 1, 2, 3 : cos vaut 1, 0, \u22121, 0. Leçon « Le benzène par les particules indépendantes »." },
      remplir: { prompt: "Pourquoi range-t-on les électrons π deux par deux dans les niveaux ?",
        options: { a: "Parce qu'ils forment des paires liées.", b: "Par le principe d'exclusion : deux électrons au plus par état d'orbite, de spins opposés.", c: "Parce que chaque carbone en apporte deux.", d: "Parce que les niveaux sont doubles." },
        why: "Des fermions identiques ne partagent pas un état ; avec le spin, chaque niveau d'orbite reçoit deux électrons. Leçon « Les particules indépendantes »." },
      deloc: { prompt: "Avec A = 0,8\u00a0eV, quelle est l'énergie de délocalisation du benzène, par molécule ?",
        options: { a: "1,6\u00a0eV : 2A.", b: "0,8\u00a0eV.", c: "4,8\u00a0eV : 6A.", d: "6,4\u00a0eV : 8A." },
        why: "(15.28) : 6E₀ \u2212 8A contre 6(E₀ \u2212 A) pour trois doubles liaisons isolées : l'écart est 2A. Leçon « Le benzène par les particules indépendantes »." },
      spectre: { prompt: "La première absorption du benzène vaut 2A dans le modèle. Avec A = 2,4\u00a0eV, à quelle longueur d'onde ?",
        options: { a: "Environ 520\u00a0nm, dans le vert.", b: "Environ 1,5\u00a0µm.", c: "Environ 260\u00a0nm, dans l'ultraviolet : hc/(4,8\u00a0eV).", d: "Environ 26\u00a0nm." },
        hint: "hc ≈ 1 240\u00a0eV·nm.",
        why: "λ = 1 240/4,8 ≈ 258\u00a0nm ; le benzène absorbe au maximum vers 255\u00a0nm. Ce A est trois fois celui tiré de la liaison : l'indépendance des électrons est une approximation grossière. Leçon « Le benzène par les particules indépendantes »." },
      butadiene: { prompt: "Pourquoi les niveaux du butadiène, chaîne ouverte de 4 carbones, ne sont-ils pas ceux d'un anneau de 4 ?",
        options: { a: "Parce qu'il a plus d'électrons.", b: "Parce que l'amplitude doit s'annuler au-delà des bouts : kb = πs/5, au lieu de 2πs/4.", c: "Parce que A est différent.", d: "Ils sont les mêmes." },
        why: "(15.29) : sur une chaîne ouverte, des ondes stationnaires nulles aux bouts. Niveaux \u22121,618A, \u22120,618A, +0,618A, +1,618A. Leçon « Davantage de chimie organique »." },
      couleur: { prompt: "Pourquoi une longue chaîne de carbones conjugués peut-elle être colorée, alors que le butadiène ne l'est pas ?",
        options: { a: "Parce qu'elle contient des métaux.", b: "Parce que sa bande est plus large que 4A.", c: "Parce qu'elle a moins d'électrons π.", d: "Parce que ses niveaux se resserrent : l'écart du dernier plein au premier vide diminue et l'absorption passe dans le visible." },
        why: "Plus de carbones, plus de niveaux dans la même bande : l'écart diminue à peu près comme 1/N. Leçon « Davantage de chimie organique »." },
      regle: { prompt: "Quel ion de l'anneau à cinq carbones le modèle prévoit-il stable ?",
        options: { a: "L'ion négatif, à six électrons π : ils remplissent exactement les deux premiers niveaux.", b: "L'ion positif, à quatre électrons π.", c: "La molécule neutre, à cinq électrons π.", d: "Aucun." },
        why: "Niveaux \u22122A, puis \u22120,618A deux fois : 2 + 4 = 6 électrons ferment ces niveaux. Leçon « Davantage de chimie organique »." },
      magique: { prompt: "Que faut-il ajouter au modèle des nucléons indépendants pour obtenir tous les nombres magiques 2, 8, 20, 28, 50, 82, 126 ?",
        options: { a: "Rien : le potentiel moyen suffit.", b: "L'interaction électrique entre protons seulement.", c: "Une forte interaction spin-orbite, qui sépare les niveaux selon j.", d: "Une interaction entre neutrons seulement." },
        why: "Sans elle, les couches se ferment à 2, 8, 20, 40, 70, 112. L'interaction spin-orbite, proposée par Mayer et par Jensen, donne les autres. Leçon « Les autres usages de l'approximation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

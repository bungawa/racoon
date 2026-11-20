/* Épreuve de l'étape « Amines et sels de diazonium » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      polyalkylation: { prompt: "Ammoniac et bromoéthane à quantités égales, base auxiliaire, et autant de réactivité à chaque étape (r = 1). Quelle part du bromoéthane finit en éthylamine ?",
        options: { a: "Toute : une seule substitution a lieu.", b: "Environ 90\u00a0%, le reste en diéthylamine.", c: "Environ 37\u00a0% : le reste alkyle les amines déjà formées, et 37\u00a0% de l'ammoniac reste intact.", d: "Aucune : l'ammoniac n'est pas nucléophile." },
        hint: "L'amine formée garde son doublet et entre en concurrence avec l'ammoniac.",
        why: "Chaque amine formée réagit à son tour : à la fin, 37\u00a0% d'ammoniac intact, 37\u00a0% d'amine primaire, 18\u00a0% de secondaire, 6\u00a0% de tertiaire, 2\u00a0% d'ion quaternaire. Avec 10 équivalents d'ammoniac, 90\u00a0% du bromoéthane donne l'amine primaire. Leçon « Nucléophilie et alkylation des amines »." },
      quaternaire: { prompt: "On traite la triéthylamine par un excès d'iodoéthane. Que forme-t-on, et pourquoi la réaction s'arrête-t-elle là ?",
        options: { a: "L'iodure de tétraéthylammonium : l'azote, lié quatre fois et chargé, n'a plus de doublet non liant.", b: "La tétraéthylamine neutre, qui s'évapore.", c: "Rien : une amine tertiaire n'a pas d'hydrogène sur l'azote, elle ne peut pas réagir.", d: "Un mélange d'amines primaires, l'iodoéthane cassant les liaisons C–N." },
        why: "Le doublet de l'amine tertiaire attaque le carbone de l'iodoéthane (SN2) : il se forme l'ion (C₂H₅)₄N⁺. Sans doublet, il n'est plus nucléophile ; sans proton, il reste chargé quel que soit le pH. L'iodure réagit plus vite que le bromure, ce que Hofmann notait en 1851. Leçon « Nucléophilie et alkylation des amines »." },
      basicite: { prompt: "pKa(méthylammonium) = 10,64, pKa(anilinium) = 4,63. À pH 7, quelle part de chaque amine est sous forme libre, avec son doublet ?",
        options: { a: "La moitié pour les deux, puisque pH 7 est neutre.", b: "Toute la méthylamine et aucune aniline.", c: "0,02\u00a0% de l'aniline et presque toute la méthylamine.", d: "0,02\u00a0% de la méthylamine et presque toute l'aniline." },
        hint: "Forme libre : 1/(1 + 10^(pKa \u2212 pH)).",
        why: "Méthylamine : 1/(1 + 10^3,64) ≈ 2 × 10⁻⁴, soit 0,02\u00a0%. Aniline : 1/(1 + 10^\u22122,37) ≈ 99,6\u00a0%. L'aniline, base faible car son doublet se délocalise dans le cycle, reste libre ; la méthylamine est presque toute protonée. Leçons « Nucléophilie et alkylation des amines » et « Couplage diazoïque et colorants azoïques »." },
      nitrosonium: { prompt: "Dans la diazotation de l'aniline, quel atome attaque quel atome, au premier acte ?",
        options: { a: "L'oxygène du nitrite attaque le carbone du cycle.", b: "L'azote de l'amine, nucléophile, attaque l'azote de l'ion nitrosonium, électrophile.", c: "L'ion chlorure attaque l'azote de l'amine.", d: "Le cycle aromatique attaque l'oxygène de l'acide nitreux." },
        why: "En milieu acide, l'acide nitreux donne l'ion nitrosonium, dont l'azote est déficitaire. Le doublet de l'azote de l'amine forme la liaison N–N ; suivent pertes et transferts de protons, puis le départ d'une molécule d'eau qui laisse ArN₂⁺. Leçon « Diazotation des amines aromatiques primaires »." },
      glace: { prompt: "Benzènediazonium en solution acide : t½ ≈ 30\u00a0min à 313\u00a0K, Ea ≈ 115\u00a0kJ·mol⁻¹. Quelle part perd-on en une heure à 278\u00a0K ?",
        options: { a: "La moitié : une demi-vie ne dépend pas de la température.", b: "Environ 75\u00a0%, comme à 313\u00a0K.", c: "Environ 0,5\u00a0% : la demi-vie y dépasse cinq jours.", d: "Rien du tout : sous 300\u00a0K, la réaction ne se fait pas." },
        hint: "k(278 K)/k(313 K) = exp[\u2212(Ea/R)(1/278 \u2212 1/313)].",
        why: "(115 000/8,314) × (1/278,15 \u2212 1/313,15) ≈ 5,56 ; e^5,56 ≈ 260. La demi-vie passe de 30\u00a0min à environ 130\u00a0h, et une heure ne coûte que 0,5\u00a0%. C'est une extrapolation (mesures entre 308 et 328\u00a0K), mais l'ordre de grandeur est sûr. Leçon « Diazotation des amines aromatiques primaires »." },
      sandmeyer: { prompt: "On veut le bromobenzène à partir de l'aniline. Quelle suite ?",
        options: { a: "Nitrite de sodium et acide chlorhydrique au froid, puis bromure de cuivre(I).", b: "Bromoéthane en excès sur l'aniline.", c: "Diazotation, puis chauffage dans l'eau.", d: "Diazotation, puis couplage avec un phénolate." },
        why: "Le diazonium échange \u2212N₂⁺ contre Br en présence de cuivre(I) : réaction de Sandmeyer (1884). Le chauffage dans l'eau donnerait le phénol, le couplage un colorant azoïque, le bromoéthane des N-éthylanilines. Leçon « Diazotation des amines aromatiques primaires »." },
      ph: { prompt: "On couple un diazonium sur le 2-naphtol (pKa 9,51). Le milieu passe de pH 7,5 à pH 9,5. Comment change la vitesse initiale, le diazonium restant entier ?",
        options: { a: "Elle ne change pas : le pH ne touche que le colorant.", b: "Elle est divisée par 2.", c: "Elle double.", d: "Elle est multipliée par environ 50 : la part de naphtolate passe de 1\u00a0% à près de 50\u00a0%." },
        hint: "Seul le naphtolate, plus activé, se couple.",
        why: "α(7,5) = 1/(1 + 10^2,01) ≈ 0,0097 ; α(9,5) = 1/(1 + 10^0,01) ≈ 0,49. Rapport ≈ 50. En milieu fortement basique, en revanche, le diazonium se change en diazotates qui ne réagissent pas : le pH optimal est un compromis. Leçon « Couplage diazoïque et colorants azoïques »." },
      methylorange: { prompt: "L'hélianthine, colorant azoïque, absorbe à 458\u00a0nm sous forme basique et à 510\u00a0nm sous forme acide (pKa 3,46). Une solution à pH 2 paraît…",
        options: { a: "jaune : elle absorbe le bleu.", b: "rouge : elle est surtout sous forme acide, qui absorbe le vert.", c: "incolore : le pH 2 détruit le groupe azo.", d: "bleue : elle absorbe le rouge." },
        why: "À pH 2, 1,46 unité sous le pKa, 97\u00a0% de l'hélianthine est sous forme acide. Elle absorbe vers 510\u00a0nm, dans le vert : on voit le complément, rouge. Au-dessus de pH 4,4, la forme basique absorbe le bleu et la solution est jaune. Leçon « Couplage diazoïque et colorants azoïques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

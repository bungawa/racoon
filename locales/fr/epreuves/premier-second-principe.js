/* Épreuve de l'étape « Premier et second principes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      bilan: { prompt: "Un gaz reçoit 800\u00a0J de chaleur d'une flamme et fournit 300\u00a0J de travail à un piston. Que vaut la variation de son énergie interne ?",
        options: { a: "+500\u00a0J.", b: "+1\u202f100\u00a0J.", c: "\u2212500\u00a0J.", d: "On ne peut rien dire sans connaître le chemin suivi." },
        hint: "Convention de CPGE : ce qui est reçu est positif. Le travail reçu vaut ici \u2212300\u00a0J.",
        why: "ΔU = W + Q = \u2212300 + 800 = +500\u00a0J (44.1). W et Q dépendent du chemin, leur somme non : U est une fonction d'état. Leçon « Machines thermiques et premier principe »." },
      palettes: { prompt: "Dans une expérience de Joule sans pertes, une masse de 10\u00a0kg fait tourner des palettes dans 2\u00a0kg d'eau. De quelle hauteur totale doit-elle descendre pour échauffer l'eau de 1\u00a0K ?",
        options: { a: "Environ 8,5\u00a0m.", b: "Environ 85\u00a0m.", c: "Environ 0,85\u00a0m.", d: "Environ 850\u00a0m." },
        hint: "Il faut M c ΔT = 2 × 4\u202f184\u00a0J ; un poids qui descend de h fournit m g h.",
        why: "h = M c ΔT/(m g) = 8\u202f368/(10 × 9,81) ≈ 85\u00a0m. L'équivalence entre travail et chaleur est exacte, mais un kelvin d'eau « coûte » beaucoup de chute : d'où les descentes répétées de Joule. Leçon « Machines thermiques et premier principe »." },
      rejet: { prompt: "Sur un cycle, un moteur prend 2\u202f000\u00a0J à la chaudière et rend 1\u202f200\u00a0J au condenseur. Quel travail fournit-il, avec quel rendement ?",
        options: { a: "3\u202f200\u00a0J, rendement 160\u00a0%.", b: "1\u202f200\u00a0J, rendement 60\u00a0%.", c: "800\u00a0J, rendement 40\u00a0%.", d: "2\u202f000\u00a0J, rendement 100\u00a0% : la chaleur rendue n'est pas perdue." },
        hint: "Premier principe sur un cycle : Q₂ = Q₁ \u2212 W (44.3).",
        why: "W = Q₁ \u2212 Q₂ = 800\u00a0J, et η = W/Q₁ = 0,40. Le rejet de 1\u202f200\u00a0J n'est pas un défaut de conception : un moteur sans source froide serait monotherme. Leçons « Le second principe » et « Rendement d'une machine idéale »." },
      monotherme: { prompt: "Une machine cyclique prendrait 500\u00a0J par cycle à l'océan, à 290\u00a0K, et fournirait 500\u00a0J de travail, sans rien d'autre. Que violerait-elle ?",
        options: { a: "Le premier principe : de l'énergie serait créée.", b: "Rien : l'océan est assez grand pour ne pas refroidir.", c: "L'énoncé de Clausius seulement, car la chaleur irait du froid vers le chaud.", d: "L'énoncé de Kelvin : ce serait un moteur monotherme." },
        why: "L'énergie est conservée, l'océan perd ce que la machine fournit. Mais changer en travail, en cycle et sans autre effet, la chaleur d'une source à une seule température est exactement ce que l'énoncé de Kelvin interdit. Couplée à un réfrigérateur, elle contredirait aussi l'énoncé de Clausius : les deux sont équivalents. Leçon « Le second principe »." },
      congelateur: { prompt: "Un congélateur à 255\u00a0K fonctionne dans une cuisine à 295\u00a0K. Quel travail minimal faut-il pour en extraire 1\u202f000\u00a0J de chaleur ?",
        options: { a: "Environ 157\u00a0J.", b: "Environ 864\u00a0J.", c: "Rien : un réfrigérateur réversible ne consomme pas de travail.", d: "1\u202f000\u00a0J : il faut au moins autant de travail que de chaleur extraite." },
        hint: "Efficacité maximale d'un réfrigérateur : T₂/(T₁ \u2212 T₂).",
        why: "e_f = 255/40 ≈ 6,4, donc W ≥ 1\u202f000/6,4 ≈ 157\u00a0J, et la cuisine reçoit au moins 1\u202f157\u00a0J. Zéro travail serait un passage spontané du froid au chaud, interdit par Clausius. Leçons « Le second principe » et « Rendement d'une machine idéale »." },
      saut: { prompt: "1\u202f000\u00a0J passent directement d'un four à 400\u00a0K à une pièce à 300\u00a0K, par simple conduction. Par rapport à une machine réversible placée entre eux, qu'a-t-on perdu ?",
        options: { a: "Rien : la chaleur arrive entière dans la pièce.", b: "250\u00a0J de travail qu'une machine réversible aurait pu fournir.", c: "750\u00a0J de travail.", d: "1\u202f000\u00a0J : la conduction détruit l'énergie." },
        hint: "Combien aurait fourni une machine réversible entre 400\u00a0K et 300\u00a0K ?",
        why: "Une machine réversible aurait fourni 1\u202f000 × (1 \u2212 300/400) = 250\u00a0J et rendu 750\u00a0J à la pièce. L'énergie est conservée, mais un échange sous un écart de température fini est irréversible : l'occasion de travail est perdue. Leçon « Machines réversibles »." },
      inventeur: { prompt: "Entre 500\u00a0K et 300\u00a0K, un inventeur annonce un moteur à vapeur de 45\u00a0% de rendement, meilleur selon lui que tout moteur à gaz. Que répondre ?",
        options: { a: "C'est plausible : l'eau qui change d'état échange plus de chaleur qu'un gaz.", b: "C'est possible si le moteur est réversible.", c: "C'est impossible : aucune machine ne dépasse 1 \u2212 300/500 = 40\u00a0%, quelle que soit la substance.", d: "C'est impossible, mais seulement parce qu'un moteur à vapeur frotte." },
        why: "L'argument des poids : couplée à une machine réversible inversée, une machine meilleure tirerait du travail de la seule source froide. Toutes les machines réversibles entre deux températures se valent, et leur rendement est 1 \u2212 T₂/T₁ = 40\u00a0%. La substance n'y entre pas. Leçons « Machines réversibles » et « Rendement d'une machine idéale »." },
      chaudiere: { prompt: "Avec un condenseur à 300\u00a0K, on remplace une chaudière à 400\u00a0K par une chaudière à 800\u00a0K. Comment change le rendement de Carnot ?",
        options: { a: "Il double, de 25\u00a0% à 50\u00a0%, comme la température.", b: "Il ne change pas : seul le condenseur compte.", c: "Il passe de 75\u00a0% à 87,5\u00a0%.", d: "Il passe de 25\u00a0% à 62,5\u00a0%." },
        hint: "η = 1 \u2212 T₂/T₁, températures en kelvins.",
        why: "1 \u2212 300/400 = 0,25 et 1 \u2212 300/800 = 0,625. Le rendement dépend du rapport T₂/T₁ : la fraction rejetée, T₂/T₁, est divisée par deux, pas le rendement multiplié par deux. Leçon « Rendement d'une machine idéale »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

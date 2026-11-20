/* Leçon « Les autres usages de l'approximation » (Feynman III.15.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/autres-usages-particules-independantes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les autres usages de l'approximation",
    "crumb.jour": "Autres usages",
    "h1": "Les autres usages de l'approximation",
    "lede": "Traiter chaque particule comme si elle était seule dans un potentiel moyen, puis les ranger dans les niveaux en respectant le principe d'exclusion : l'idée qui a servi pour le benzène explique aussi le tableau périodique, et jusqu'aux noyaux, où elle prévoit des nombres « magiques » de protons et de neutrons.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : davantage de chimie organique",

    "s1.sec": "1 · Les atomes",
    "s1.h2": "Des couches d'électrons",
    "s1.p1": "Dans un atome, chaque électron sent le noyau et les autres électrons. L'approximation des particules indépendantes remplace les autres électrons par un potentiel moyen : chaque électron a alors ses propres niveaux, que l'on remplit deux par deux, de spins opposés, comme dans la leçon « Le benzène par les particules indépendantes ». Les niveaux se groupent en couches séparées par de grands écarts.",
    "s1.p2": "Un atome dont les électrons remplissent exactement des couches est peu réactif : ce sont les gaz rares, hélium, néon, argon, de numéros atomiques 2, 10, 18. Un électron de plus, et il est peu lié, facile à céder : ce sont les métaux alcalins. La chimie du tableau périodique sort de cette image, qui reste une approximation : le potentiel moyen néglige les corrélations entre électrons.",

    "s2.sec": "2 · Les noyaux",
    "s2.h2": "Des nombres magiques",
    "s2.p1": "Dans un noyau, les protons et les neutrons s'attirent par l'interaction forte, à très courte portée. On ne s'attendait pas à ce qu'ils se comportent en particules indépendantes. Pourtant, les noyaux de 2, 8, 20, 28, 50, 82 ou 126 protons ou neutrons sont plus stables que leurs voisins. Le modèle en couches l'explique : chaque nucléon se déplace dans un potentiel moyen, et ces nombres sont ceux des couches complètes, à condition d'ajouter une forte interaction entre le spin du nucléon et son mouvement orbital, l'interaction spin-orbite.",
    "fig.aria": "Remplissage des niveaux du modèle en couches du noyau, nucléon par nucléon",
    "fig.legend.plein": "niveau plein",
    "fig.legend.cours": "niveau en cours de remplissage",
    "fig.legend.vide": "niveau vide",
    "fig.n": "Nombre de protons, ou de neutrons",
    "fig.k.niveau": "Niveau qui se remplit",
    "fig.f.plein": "il est plein",
    "fig.f.cours": "encore {reste} places",
    "fig.k.magique": "Prochain nombre magique",
    "fig.f.magique": "couche complète : noyau particulièrement stable",
    "fig.f.manque": "il manque {d} nucléons",
    "fig.caption": "Chaque colonne est une couche, close par un nombre magique, écrit en haut ; chaque ligne un niveau, désigné à la manière des spectroscopistes, avec son moment cinétique total <var>j</var> et ses 2<var>j</var> + 1 places. Sans interaction spin-orbite, les couches se fermeraient à 2, 8, 20, 40, 70, 112 : les trois premiers nombres seulement sont justes. Avec elle, le niveau de plus grand <var>j</var> de chaque couche descend dans la couche du dessous, et 28, 50, 82, 126 apparaissent.",
    "s2.p2": "Les protons et les neutrons remplissent leurs niveaux séparément : un noyau peut être magique pour les uns, pour les autres, ou pour les deux à la fois, comme le plomb 208, à 82 protons et 126 neutrons.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Une approximation grossière qui marche",
    "s3.p1": "L'approximation des particules indépendantes est grossière : elle néglige les corrélations entre particules, qui ne sont petites ni dans un atome ni dans un noyau. Elle marche pourtant, parce que le principe d'exclusion empêche les particules d'une couche pleine de changer d'état facilement : elles se gênent moins qu'on ne le croirait.",
    "sys.title": "Le système décrit : ce que l'approximation donne, ce qu'elle manque",
    "sys1.body": "Elle donne l'ordre des couches et les nombres d'électrons ou de nucléons qui les ferment, donc la stabilité relative des atomes et des noyaux. Pour le benzène, elle donnait l'énergie de délocalisation à un facteur près selon la mesure choisie.",
    "sys2.body": "Elle manque ce qui vient des corrélations : l'énergie exacte des niveaux, l'écart entre la valeur de <var>A</var> tirée des liaisons et celle tirée des spectres, et, dans les noyaux, la déformation de ceux qui sont loin des nombres magiques.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Le modèle en couches du noyau",
    "hist.intro": "Le modèle des particules indépendantes a dû être proposé deux fois pour le noyau avant de s'imposer.",
    "hist.events": {
      ivanenko: { who: "Dmitri Ivanenko et E. Gapon", what: "proposent le premier modèle en couches du noyau.", context: "Le neutron vient d'être découvert ; le noyau est fait de protons et de neutrons." },
      mayer: { who: "Maria Goeppert Mayer, et indépendamment Hans Jensen", what: "expliquent tous les nombres magiques en ajoutant au modèle en couches une forte interaction spin-orbite.", context: "D'autres physiciens y travaillent en même temps." },
      nobel: { who: "Maria Goeppert Mayer et Hans Jensen", what: "reçoivent le prix Nobel de physique pour le modèle en couches du noyau.", context: "Ils le partagent avec Eugene Wigner, récompensé pour ses travaux sur le noyau atomique." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      superlourds: { name: "La recherche des noyaux superlourds", text: "Le modèle en couches prévoit d'autres nombres magiques au-delà du plomb : 184 pour les neutrons, et une valeur proche de 114 pour les protons. Les physiciens qui fabriquent des éléments superlourds cherchent les noyaux proches de ces nombres, qui devraient vivre plus longtemps." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      couches: { prompt: "Que suppose l'approximation des particules indépendantes dans un atome ?",
        options: { a: "Que les électrons n'interagissent pas avec le noyau.", b: "Que chaque électron se déplace dans un potentiel moyen dû au noyau et aux autres électrons, avec ses propres niveaux.", c: "Que tous les électrons sont dans le même état.", d: "Que les électrons sont des bosons." },
        why: "On remplace l'effet des autres électrons par une moyenne, puis on range les électrons dans les niveaux en respectant l'exclusion." },
      gaz: { prompt: "Pourquoi le néon, Z = 10, est-il peu réactif ?",
        options: { a: "Parce que ses dix électrons remplissent exactement des couches, séparées de la suivante par un grand écart.", b: "Parce qu'il est léger.", c: "Parce qu'il n'a pas de noyau.", d: "Parce que ses électrons sont libres." },
        why: "Comme le benzène à six électrons π, une couche complète est stable : prendre ou céder un électron coûte cher." },
      noyau: { prompt: "Pourquoi l'approximation des particules indépendantes surprenait-elle pour les noyaux ?",
        options: { a: "Parce que les nucléons n'ont pas de spin.", b: "Parce que les noyaux sont trop petits.", c: "Parce que les nucléons sont des bosons.", d: "Parce que les nucléons interagissent très fortement entre eux, à courte portée." },
        why: "On attendait plutôt un liquide de particules en chocs constants. Le principe d'exclusion rend pourtant leurs mouvements presque indépendants." },
      spinorbite: { prompt: "Sans interaction spin-orbite, les couches d'un potentiel d'oscillateur se ferment à 2, 8, 20, 40, 70… Qu'ajoute l'interaction spin-orbite ?",
        options: { a: "Rien.", b: "Elle supprime les couches.", c: "Elle sépare chaque niveau selon j et abaisse celui de plus grand j : les couches se ferment à 28, 50, 82, 126.", d: "Elle double tous les nombres." },
        why: "Le niveau de plus grand j de chaque couche descend dans la couche inférieure et change le nombre de places : 20 + 8 = 28, 40 + 10 = 50, etc." },
      limite: { prompt: "Qu'est-ce que l'approximation des particules indépendantes ne donne pas bien ?",
        options: { a: "Les nombres d'électrons des gaz rares.", b: "Les énergies exactes, qui dépendent des corrélations entre particules.", c: "L'ordre des couches.", d: "La stabilité du benzène." },
        why: "Elle donne la structure ; les corrélations, négligées, déplacent les énergies. Le désaccord sur A dans le benzène en est un exemple." },
      plomb: { prompt: "Le plomb 208 a 82 protons et 126 neutrons. Qu'a-t-il de particulier ?",
        options: { a: "Il est doublement magique : protons et neutrons ferment chacun une couche.", b: "Il est radioactif.", c: "Il n'a pas de couche complète.", d: "Ses nucléons sont des bosons." },
        why: "82 et 126 sont des nombres magiques ; protons et neutrons remplissent leurs niveaux séparément." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 15, §15-6 (texte original en anglais). Notations SI. Modèle en couches : Ivanenko et Gapon (1932) ; Mayer et Jensen (1949) ; prix Nobel de physique 1963. Calculs propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

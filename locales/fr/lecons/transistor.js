/* Leçon « Le transistor » (Feynman III.14.6) : textes en français.
   Une autre langue = locales/<langue>/lecons/transistor.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le transistor",
    "crumb.jour": "Transistor",
    "h1": "Le transistor",
    "lede": "Deux jonctions p-n dos à dos, si proches que les porteurs injectés par la première traversent l'entre-deux avant de disparaître : c'est un transistor. Un petit courant de base y commande un courant cent fois plus grand. Toute l'électronique en est sortie.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le redressement par une jonction",
    "eq.ch": "ch",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Émetteur, base, collecteur",
    "s1.p1": "Un transistor p-n-p est un cristal de trois régions : un émetteur de type p, une base de type n, très mince, et un collecteur de type p. La jonction émetteur-base est polarisée en sens direct : comme dans la leçon « Le redressement par une jonction », elle injecte dans la base un courant de trous qui croît exponentiellement avec la tension. La jonction base-collecteur est polarisée en sens inverse : elle n'y laisse passer que les minoritaires, c'est-à-dire, ici, les trous qui arrivent de la base.",
    "s1.p2": "Dans la base, les trous injectés sont des minoritaires. Ils diffusent vers le collecteur ; s'ils l'atteignent, le champ de la jonction base-collecteur les y emporte. Quelques-uns rencontrent un électron et disparaissent en chemin ; leur charge doit être remplacée par la base. Une fraction α du courant d'émetteur arrive au collecteur, le reste sort par la base :",
    "val.14.14a": "Exacte : conservation de la charge, avec α défini comme la fraction collectée. L'approximation est dans la valeur de α, qui néglige aussi le courant d'électrons que la base renvoie vers l'émetteur ; on le rend petit en dopant l'émetteur bien plus que la base.",
    "s1.p3": "Le courant de base commande donc un courant de collecteur bien plus grand :",
    "val.14.14b": "Exacte, comme conséquence de (14.14a). β grand demande α très proche de 1 : α = 0,99 donne β = 99. β dépend en pratique du courant et de la température, à quelques dizaines de pour cent.",
    "s1.p4": "Combien de trous traversent ? Dans la base, ils diffusent en disparaissant peu à peu ; leur densité varie sur une longueur de diffusion <var>L</var>, qui dépend de la durée de vie des minoritaires, de 10⁻⁷ à 10⁻³\u00a0s. Pour une base de largeur <var>W</var> :",
    "val.14.14c": "Approximation : diffusion à une dimension, faible injection, recombinaison seulement dans la base, émetteur parfait. La forme approchée vaut à 1\u00a0% près sur 1 \u2212 α tant que <var>W</var> < 0,15 <var>L</var>. Elle donne β ≈ 2(<var>L</var>/<var>W</var>)<sup>2</sup> : une base dix fois plus mince que <var>L</var> donne un gain de 200.",
    "fig.aria": "Gain en courant d'un transistor en fonction de la largeur de sa base",
    "fig.legend.beta": "β = α/(1 \u2212 α), avec (14.14c)",
    "fig.legend.point": "base choisie",
    "fig.xaxis": "largeur de la base sur longueur de diffusion, W/L",
    "fig.yaxis": "gain β",
    "fig.w": "Largeur de base, log₁₀(W/L)",
    "fig.v": "Tension émetteur-base",
    "fig.k.beta": "Gain en courant β",
    "fig.f.beta": "α = {a}",
    "fig.k.ic": "Courant de collecteur",
    "fig.f.ic": "courant de base {ib} ; I₀ = 10⁻¹⁴ A",
    "fig.caption": "Le gain croît comme l'inverse du carré de la largeur de base : c'est pourquoi la base est la plus mince possible. La tension émetteur-base fixe les courants, exponentiellement, mais pas leur rapport : 60\u00a0mV de plus multiplient <var>I</var><sub>C</sub> et <var>I</var><sub>B</sub> par 10 ensemble.",

    "s2.sec": "2 · Amplifier",
    "s2.h2": "Un petit courant en commande un grand",
    "s2.p1": "Faisons varier un peu le courant de base : le courant de collecteur varie β fois plus. Dans le circuit du collecteur, une résistance traduit ce courant en tension ; le signal ressort amplifié. L'énergie vient de la source qui polarise le collecteur : le transistor ne fait que la doser.",
    "s2.p2": "Un transistor n-p-n fonctionne de la même façon, avec des électrons pour minoritaires dans une base de type p, et toutes les tensions inversées. Les électrons du silicium étant plus mobiles que ses trous, ils diffusent plus vite à travers la base.",

    "s3.sec": "Décrire le système",
    "s3.h2": "La base contre la longueur de diffusion",
    "s3.p1": "Le nombre qui fait un transistor est <var>W</var>/<var>L</var> : la largeur de la base contre la distance qu'un minoritaire parcourt avant de disparaître.",
    "sys.title": "Le système décrit : base de 10\u00a0µm, longueur de diffusion 100\u00a0µm",
    "sys1.body": "<var>W</var>/<var>L</var> = 0,1 donne β ≈ {b} : l'ordre de grandeur des transistors du temps où l'on taillait des bases d'une dizaine de micromètres.",
    "sys2.body": "À 0,6\u00a0V sur la jonction émetteur-base, <var>I</var><sub>C</sub> ≈ {ic}. Une variation de tension d'émetteur de δ<var>V</var> change <var>I</var><sub>C</sub> de <var>I</var><sub>C</sub><var>e</var>δ<var>V</var>/<var>k</var><sub>B</sub><var>T</var> : la transconductance vaut {g}, fixée par <var>k</var><sub>B</sub><var>T</var>/<var>e</var> seul.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "La naissance du transistor",
    "hist.intro": "Le premier transistor n'était pas à jonctions ; la jonction est venue quelques semaines plus tard, sur le papier.",
    "hist.events": {
      bardeen: { who: "John Bardeen et Walter Brattain", what: "obtiennent aux Bell Labs, le 16 décembre, l'amplification par un dispositif à pointes sur du germanium.", context: "Ils le présentent à la direction le 23 décembre. Il amplifie les signaux jusqu'à cent fois." },
      shockley: { who: "William Shockley", what: "conçoit le transistor à jonctions, celui de cette leçon, à partir de la jonction p-n découverte par Ohl.", context: "Ses deux jonctions dos à dos remplacent les pointes, fragiles et difficiles à reproduire." },
      pierce: { who: "Les Bell Labs", what: "annoncent le transistor au public lors d'une conférence de presse à New York, le 30 juin.", context: "Le nom « transistor » est proposé par John Pierce." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      amplificateurs: { name: "Les amplificateurs", text: "Le transistor bipolaire de cette leçon reste celui des amplificateurs analogiques et des circuits de puissance ; les puces logiques utilisent surtout un autre transistor, à effet de champ, où une tension de grille ouvre ou ferme un canal." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      base: { prompt: "Dans un transistor p-n-p, pourquoi les trous injectés dans la base vont-ils au collecteur ?",
        options: { a: "Parce que la base les repousse.", b: "Parce qu'ils diffusent dans la base mince, et que la jonction base-collecteur, en inverse, emporte tous les minoritaires qui l'atteignent.", c: "Parce que le collecteur est positif.", d: "Parce qu'ils sont attirés par les électrons du collecteur." },
        why: "Pour la jonction base-collecteur, les trous de la base sont des minoritaires : elle les laisse passer tous, comme le courant I₀ d'une diode en inverse." },
      mince: { prompt: "Pourquoi la base doit-elle être très mince ?",
        options: { a: "Pour que le transistor soit léger.", b: "Pour que la tension soit plus faible.", c: "Pour diminuer la capacité.", d: "Pour que les minoritaires la traversent avant de se recombiner : 1 \u2212 α ≈ W²/2L²." },
        why: "Plus la base est mince devant la longueur de diffusion, moins de trous disparaissent en chemin, plus α est proche de 1 et β grand." },
      gain: { prompt: "α = 0,995. Que vaut le gain β ?",
        options: { a: "199.", b: "0,995.", c: "1,005.", d: "995." },
        why: "β = α/(1 \u2212 α) = 0,995/0,005 = 199." },
      dopage: { prompt: "Pourquoi dope-t-on l'émetteur bien plus fortement que la base ?",
        options: { a: "Pour qu'il conduise moins.", b: "Pour augmenter la tension de la jonction.", c: "Pour que le courant de la jonction émetteur-base soit presque entièrement fait de trous injectés dans la base, et très peu d'électrons renvoyés vers l'émetteur.", d: "Pour que la base soit plus mince." },
        why: "Le courant d'électrons de la base vers l'émetteur passe par la base sans aller au collecteur : il réduit α. Il est proportionnel aux minoritaires de l'émetteur, rares s'il est très dopé." },
      npn: { prompt: "Dans un transistor n-p-n, quels porteurs traversent la base ?",
        options: { a: "Des trous.", b: "Des électrons, minoritaires dans la base de type p.", c: "Des ions.", d: "Aucun." },
        why: "Mêmes principes, rôles inversés : l'émetteur n injecte des électrons dans la base p, où ils sont minoritaires." },
      exponentielle: { prompt: "On augmente de 60 mV la tension émetteur-base, à 300 K. Que deviennent I_C et β ?",
        options: { a: "I_C est multiplié par 10, β ne change pas.", b: "I_C double, β double.", c: "Rien ne change.", d: "I_C est multiplié par 10, β aussi." },
        why: "La tension règle exponentiellement le courant injecté, comme (14.14) ; α, donc β, dépend de la géométrie de la base, pas de la tension." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 14, §14-6 (texte original en anglais). Notations SI. Histoire : Bell Labs, transistor à pointes (décembre 1947), conception du transistor à jonctions par Shockley (1948), annonce publique (30 juin 1948). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

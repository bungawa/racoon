/* Épreuve de l'étape « Diagrammes potentiel-pH et intensité-potentiel » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      fer: { prompt: "On trace le diagramme du fer à 10⁻²\u00a0mol·L⁻¹, avec pKs(Fe(OH)₃) = 38 et pKe = 14. À quel pH la frontière Fe³⁺/Fe(OH)₃ se trouve-t-elle ?",
        options: { a: "pH 2,0 : 14 \u2212 (38 \u2212 2)/3.", b: "pH 3,3, la valeur à 10⁻⁶\u00a0mol·L⁻¹.", c: "pH 12,0 : 14 \u2212 2.", d: "pH 7,5, comme pour Fe(OH)₂." },
        hint: "Fe(OH)₃ apparaît quand [Fe³⁺][HO⁻]³ atteint Ks, avec [Fe³⁺] = 10⁻²\u00a0mol·L⁻¹.",
        why: "[HO⁻]³ = 10⁻³⁸/10⁻² = 10⁻³⁶, donc pOH = 12 et pH = 2,0. À 10⁻⁶\u00a0mol·L⁻¹, la frontière recule à pH 3,3. Leçon « Construire et lire un diagramme potentiel-pH »." },
      pente: { prompt: "Quelle est la pente de la frontière entre Fe(OH)₃ et Fe²⁺, d'après Fe(OH)₃ + 3\u00a0H⁺ + e⁻ = Fe²⁺ + 3\u00a0H₂O ?",
        options: { a: "\u22120,059\u00a0V par unité de pH.", b: "Nulle.", c: "\u22120,118\u00a0V par unité de pH.", d: "\u22120,177\u00a0V par unité de pH." },
        hint: "Pente = \u2212m × 0,059/n, avec m ions H⁺ et n électrons.",
        why: "Trois H⁺ pour un électron : \u22123 × 0,059 = \u22120,177\u00a0V par unité de pH. Les frontières Fe(OH)₃/Fe(OH)₂ et Fe(OH)₂/Fe ont la pente \u22120,059\u00a0V : un H⁺ par électron." },
      air: { prompt: "Une eau de nappe à pH 6 contient du fer(II) dissous. On l'aère. Que prévoit la superposition des diagrammes du fer et de l'eau ?",
        options: { a: "Rien : Fe²⁺ est stable dans l'eau à tout potentiel.", b: "Le dioxygène oxyde le fer(II) en Fe(OH)₃ : leurs domaines sont disjoints. La vitesse, elle, n'est pas sur le diagramme.", c: "Le fer(II) est réduit en fer métal.", d: "L'eau est réduite en dihydrogène par Fe²⁺." },
        hint: "Le domaine de Fe²⁺ touche-t-il la droite O₂/H₂O ?",
        why: "Fe²⁺ est entièrement sous la droite O₂/H₂O : la réaction est thermodynamiquement favorisée. Au-dessus de pH 2, le fer(III) précipite en Fe(OH)₃, qu'on filtre. Sa vitesse croît avec le pH : c'est la cinétique, pas le diagramme, qui le dit." },
      lent: { prompt: "Pour un même couple, une électrode A donne un courant notable dès 20\u00a0mV de surpotentiel, une électrode B seulement au-delà de 400\u00a0mV. Que conclure ?",
        options: { a: "Le potentiel standard du couple est plus élevé sur B.", b: "La solution est plus concentrée au contact de A.", c: "Le couple est rapide sur A et lent sur B : la vitesse du transfert d'électron dépend de la nature de l'électrode.", d: "B est limitée par la diffusion." },
        hint: "La thermodynamique est la même sur les deux électrodes.",
        why: "Même couple, même solution, donc même potentiel d'équilibre. Seule la cinétique diffère : H⁺/H₂ a une densité de courant d'échange de 10\u00a0A·m⁻² sur le platine, 2 × 10⁻⁹\u00a0A·m⁻² sur le plomb. Leçon « Courbes intensité-potentiel et surtensions »." },
      palier: { prompt: "Dans une solution agitée, le palier de réduction de Fe³⁺ vaut 19\u00a0A·m⁻² à 10\u00a0mmol·L⁻¹. Que vaut-il à 25\u00a0mmol·L⁻¹, sans rien changer d'autre ?",
        options: { a: "Environ 48\u00a0A·m⁻².", b: "19\u00a0A·m⁻² : le palier ne dépend que de l'électrode.", c: "Environ 7,6\u00a0A·m⁻².", d: "Environ 120\u00a0A·m⁻², car le courant croît comme le carré de la concentration." },
        hint: "jlim = nF kd c.",
        why: "Le courant limite de diffusion est proportionnel à la concentration : 19 × 2,5 ≈ 48\u00a0A·m⁻². Il est aussi proportionnel au nombre d'électrons et à l'aire de l'électrode." },
      rouille: { prompt: "Dans une eau neutre aérée, le courant de corrosion d'un acier vaut le palier de réduction du dioxygène, 0,1\u00a0A·m⁻². Quelle épaisseur perd-il en un an ? (Fe : 55,85\u00a0g·mol⁻¹, 7\u202f874\u00a0kg·m⁻³, n = 2.)",
        options: { a: "Environ 1,2\u00a0mm.", b: "Environ 0,12\u00a0mm.", c: "Environ 12\u00a0mm.", d: "Rien : en milieu neutre, l'acier est passif." },
        hint: "v = jM/(nFρ), puis multiplier par la durée d'une année.",
        why: "0,1 × 0,055\u202f85/(2 × 96\u202f485 × 7\u202f874) ≈ 3,7 × 10⁻¹²\u00a0m·s⁻¹, soit 0,12\u00a0mm par an. L'agitation, qui relève le palier du dioxygène, accélère la corrosion. Leçon « Corrosion, électrolyse et accumulateurs »." },
      tension: { prompt: "Dans une électrolyse de l'eau à 50\u00a0A·m⁻², l'anode est à 1,59\u00a0V et la cathode à \u22120,08\u00a0V ; la résistance surfacique vaut 2 × 10⁻⁴\u00a0Ω·m². Quelle tension faut-il imposer ?",
        options: { a: "1,23\u00a0V, le minimum thermodynamique.", b: "1,51\u00a0V.", c: "1,67\u00a0V.", d: "1,68\u00a0V." },
        hint: "U = Ea \u2212 Ec + r j.",
        why: "1,59 + 0,08 + 2 × 10⁻⁴ × 50 = 1,68\u00a0V. La tension dépasse 1,23\u00a0V des deux surpotentiels et de la chute ohmique, qui croissent avec le courant." },
      purifier: { prompt: "Pourquoi purifie-t-on l'électrolyte avant de déposer du zinc à partir d'une solution acide ?",
        options: { a: "Pour augmenter la conductivité de la solution.", b: "Parce que les impuretés abaissent le potentiel standard de Zn²⁺/Zn.", c: "Parce qu'une impureté sur laquelle H₂ se dégage vite, déposée sur la cathode, ferait passer le courant dans la réduction de l'eau plutôt que dans celle de Zn²⁺.", d: "Parce que le zinc ne se dépose qu'en solution neutre." },
        hint: "Le zinc ne se dépose que parce que H₂ se dégage lentement sur le zinc.",
        why: "E°(Zn²⁺/Zn) = \u22120,76\u00a0V est sous H⁺/H₂ : le dépôt n'est possible que grâce à la lenteur de H₂ sur le zinc. Une impureté plus active ouvre un chemin rapide vers H₂, et le rendement faradique s'effondre." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

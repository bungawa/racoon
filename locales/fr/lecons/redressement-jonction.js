/* Leçon « Le redressement par une jonction » (Feynman III.14.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/redressement-jonction.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le redressement par une jonction",
    "crumb.jour": "Redressement",
    "h1": "Le redressement par une jonction",
    "lede": "Appliquez 0,6\u00a0V à une jonction p-n dans un sens : un courant de l'ordre du milliampère passe. Dans l'autre sens : presque rien, dix milliards de fois moins. La raison tient en un facteur de Boltzmann : la tension appliquée abaisse ou relève la barrière que les porteurs doivent franchir.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les jonctions de semi-conducteurs",
    "eq.coten": "côté n",
    "eq.cotep": "côté p",

    "s1.sec": "1 · Deux courants de trous",
    "s1.h2": "Monter la barrière, la descendre",
    "s1.p1": "Suivons les trous d'une jonction p-n, comme dans la leçon « Les jonctions de semi-conducteurs ». Deux courants traversent la frontière. Les rares trous du côté n, qui arrivent au bord de la jonction, sont emportés par le champ vers le côté p : ce courant <var>I</var><sub>0</sub> est fixé par leur nombre, donc par la densité des minoritaires :",
    "val.14.12": "Approximation : les minoritaires qui atteignent la jonction la franchissent tous, et leur nombre ne dépend que de leur densité loin de la jonction ; équilibre thermique de chaque côté. <var>I</var><sub>0</sub> est proportionnel à <var>n</var><sub>i</sub><sup>2</sup>, donc très sensible à la température.",
    "s1.p2": "Dans l'autre sens, les nombreux trous du côté p doivent monter la barrière <var>q</var><var>V</var> ; seule une fraction e<sup>\u2212<var>q</var><var>V</var>/<var>k</var><sub>B</sub><var>T</var></sup> y parvient, et à l'équilibre les deux courants sont égaux. Appliquons maintenant une tension Δ<var>V</var> qui rend le côté p plus positif : la barrière tombe à <var>V</var> \u2212 Δ<var>V</var>. Le courant des minoritaires ne change pas, celui qui monte la barrière est multiplié par e<sup><var>q</var>Δ<var>V</var>/<var>k</var><sub>B</sub><var>T</var></sup> :",
    "val.14.13": "Approximation : la tension appliquée tombe tout entière sur la jonction, les régions neutres et les contacts ayant une résistance négligeable ; densité des porteurs injectés petite devant celle des majoritaires (faible injection). À fort courant, la chute de tension dans les régions neutres n'est plus négligeable et le courant croît moins vite.",
    "s1.p3": "Le courant total des trous est la différence des deux ; celui des électrons a la même forme, et les deux s'ajoutent dans <var>I</var><sub>0</sub> :",
    "val.14.14": "Approximation : celles de (14.12) et (14.13), sans recombinaison dans la zone de la jonction ni claquage. En sens inverse, sous une tension assez forte, la jonction claque et le courant monte brusquement : (14.14) ne le prévoit pas.",

    "s2.sec": "2 · Une caractéristique dissymétrique",
    "s2.h2": "Un sens passant, un sens bloquant",
    "s2.p1": "En sens direct, le courant croît d'un facteur <var>e</var> chaque fois que la tension augmente de <var>k</var><sub>B</sub><var>T</var>/<var>e</var>, environ 26\u00a0mV à 300\u00a0K. En sens inverse, il plafonne à \u2212<var>I</var><sub>0</sub>, le seul courant des minoritaires.",
    "fig.aria": "Caractéristique courant-tension d'une jonction p-n",
    "fig.legend.i": "courant I (14.14)",
    "fig.legend.point": "tension choisie",
    "fig.xaxis": "tension appliquée ΔV (V), côté p positif à droite",
    "fig.yaxis": "courant (mA)",
    "fig.v": "Tension appliquée, ΔV",
    "fig.i0": "Courant de saturation, log₁₀ I₀ (A)",
    "fig.t": "Température, T",
    "fig.k.i": "Courant",
    "fig.f.direct": "sens direct : la barrière est abaissée",
    "fig.f.inverse": "sens inverse : il ne reste que \u2212I₀",
    "fig.f.zero": "équilibre : les deux courants se compensent",
    "fig.k.r": "Rapport direct sur inverse",
    "fig.f.r": "à ± {v}",
    "fig.k.rd": "Résistance dynamique, k_BT/(e(I + I₀))",
    "fig.f.rd": "pente de la caractéristique au point choisi",
    "fig.caption": "Le courant reste invisible jusqu'à environ 0,5\u00a0V, puis monte à pic : c'est le « seuil » apparent d'une diode au silicium, qui n'est qu'une exponentielle vue sur une échelle linéaire. Divisez <var>I</var><sub>0</sub> par 10 : le seuil se décale de 60\u00a0mV vers la droite. Chauffez : <var>I</var><sub>0</sub> grandit, le seuil recule.",
    "s2.p2": "La même formule décrit le cliquet de la leçon « Fonctionnement d'un cliquet » : des fluctuations thermiques qui franchissent une barrière dans un sens et la descendent dans l'autre. À tension nulle, rien ne passe en moyenne : une jonction ne redresse pas le bruit thermique de son propre circuit, sans quoi elle ferait tourner un moteur avec la seule chaleur ambiante.",

    "s3.sec": "Décrire le système",
    "s3.h2": "<var>e</var>Δ<var>V</var> contre <var>k</var><sub>B</sub><var>T</var>",
    "s3.p1": "Tout se lit dans <var>e</var>Δ<var>V</var>/<var>k</var><sub>B</sub><var>T</var>. Petit, la jonction est une résistance <var>k</var><sub>B</sub><var>T</var>/(<var>e</var><var>I</var><sub>0</sub>) ; grand et positif, le courant est exponentiel ; grand et négatif, il sature.",
    "sys.title": "Le système décrit : une diode au silicium",
    "sys1.body": "À 300\u00a0K, <var>k</var><sub>B</sub><var>T</var>/<var>e</var> ≈ {kT} : il faut {dec} de plus pour multiplier le courant direct par 10. Avec <var>I</var><sub>0</sub> = 10⁻¹³\u00a0A, 0,6\u00a0V donne déjà {i}, et \u22120,6\u00a0V seulement \u221210⁻¹³\u00a0A.",
    "sys2.body": "<var>I</var><sub>0</sub> suit <var>n</var><sub>i</sub><sup>2</sup> ∝ <var>T</var><sup>3</sup> e<sup>\u2212<var>E</var><sub>g</sub>/<var>k</var><sub>B</sub><var>T</var></sup> : de 300 à 400\u00a0K, il est multiplié par environ {r}. Le courant de fuite d'une diode chaude n'est plus négligeable.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Comprendre les redresseurs",
    "hist.intro": "La théorie du redressement est venue en même temps que les redresseurs au silicium des radars.",
    "hist.events": {
      mott: { who: "Nevill Mott", what: "publie « The Theory of Crystal Rectifiers ».", context: "Proceedings of the Royal Society A, vol. 171, après sa note de 1938 sur la barrière d'un contact." },
      ohl: { who: "Russell Ohl", what: "dépose aux États-Unis le brevet d'un « Light-Sensitive Electric Device », la jonction p-n au silicium éclairée.", context: "Le brevet est délivré en 1946." },
      scaff: { who: "Jack Scaff et Russell Ohl", what: "publient leurs travaux sur les redresseurs à cristal de silicium.", context: "Bell System Technical Journal, vol. 26." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      alimentation: { name: "Les alimentations", text: "Tout appareil branché sur le secteur commence par redresser la tension alternative : quatre diodes en pont ne laissent passer le courant que dans un sens vers le reste du circuit, qu'un condensateur lisse ensuite." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      direct: { prompt: "Pourquoi le courant augmente-t-il si vite quand on rend le côté p plus positif ?",
        options: { a: "Parce que la résistance du cristal diminue.", b: "Parce que de nouveaux porteurs sont créés par la tension.", c: "Parce que la barrière baisse de ΔV, et que la fraction de majoritaires qui la franchit croît comme e^(qΔV/k_BT).", d: "Parce que les minoritaires se multiplient." },
        why: "Le facteur de Boltzmann est exponentiel : chaque k_BT/e de plus multiplie le courant par e." },
      inverse: { prompt: "En sens inverse, pourquoi le courant plafonne-t-il à \u2212I₀ ?",
        options: { a: "Parce qu'il ne reste que le courant des minoritaires, que la barrière ne gêne pas et dont le nombre est fixé par le cristal.", b: "Parce que la jonction est détruite.", c: "Parce que la barrière disparaît.", d: "Parce que les majoritaires passent en sens inverse." },
        why: "Relever la barrière éteint le courant des majoritaires ; celui des minoritaires, qui descendent la barrière, ne dépend pas de sa hauteur." },
      minoritaires: { prompt: "De quoi dépend surtout I₀ ?",
        options: { a: "De la tension appliquée.", b: "De la largeur du fil.", c: "Du nombre de majoritaires.", d: "De la densité des minoritaires, donc de nᵢ² : il croît très vite avec la température." },
        why: "(14.12) : I₀ ∝ N_p(côté n) = nᵢ²/N_D. Avec nᵢ² ∝ e^(\u2212E_g/k_BT), il est très sensible à T." },
      decade: { prompt: "À 300 K, de combien faut-il augmenter la tension directe pour multiplier le courant par 10 ?",
        options: { a: "26 mV.", b: "Environ 60 mV : (k_BT/e) ln 10.", c: "0,6 V.", d: "1 V." },
        why: "e^(eΔV/k_BT) = 10 pour ΔV = 0,026 × 2,3 ≈ 60 mV." },
      chaud: { prompt: "On chauffe une diode. À tension directe fixée, le courant :",
        options: { a: "diminue, car la mobilité baisse.", b: "ne change pas.", c: "augmente fortement, car I₀ ∝ nᵢ² croît très vite.", d: "s'annule." },
        why: "Le facteur e^(eΔV/k_BT) diminue un peu, mais I₀ augmente bien plus : le seuil apparent recule d'environ 2 mV par kelvin pour le silicium, ordre de grandeur que l'on retrouve avec (14.14)." },
      cliquet: { prompt: "Une jonction à température uniforme, sans tension appliquée, peut-elle redresser le bruit thermique de son circuit et fournir un courant moyen ?",
        options: { a: "Non : à ΔV = 0, les deux courants se compensent exactement, comme le cliquet à l'équilibre thermique.", b: "Oui, c'est le principe des cellules solaires.", c: "Oui, si la jonction est assez dissymétrique.", d: "Oui, mais très peu." },
        why: "(14.14) donne I = 0 à ΔV = 0. Le second principe interdit de tirer un travail d'une source à une seule température." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 14, §14-5 (texte original en anglais). Notations SI. Mott, Proceedings of the Royal Society A 171, 27 (1939) ; Ohl, brevet américain 2 402 662 (déposé en 1941, délivré en 1946) ; Scaff et Ohl, Bell System Technical Journal 26 (1947). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

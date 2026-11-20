/* Leçon « Amplitudes de diffusion et états liés » (Feynman III.13.8) : textes en français.
   Une autre langue = locales/<langue>/lecons/diffusion-et-etats-lies-reseau.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Amplitudes de diffusion et états liés",
    "crumb.jour": "Diffusion et états liés",
    "h1": "Amplitudes de diffusion et états liés",
    "lede": "Le même défaut diffuse les électrons de la bande et piège un électron hors de la bande. Les deux calculs sont liés : écrite en fonction de l'énergie et prolongée hors de la bande, l'amplitude de réflexion devient infinie exactement à l'énergie de l'état lié. Ce principe sert bien au-delà des cristaux.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le piégeage par une imperfection du réseau",

    "s1.sec": "1 · β en fonction de l'énergie",
    "s1.h2": "Prolonger une formule",
    "s1.p1": "L'amplitude de réflexion (13.37) dépend de <var>k</var> par 2<var>A</var> sin <var>k</var><var>b</var>. Dans la bande, (13.13) donne cos <var>k</var><var>b</var> = (<var>E</var><sub>0</sub> \u2212 <var>E</var>)/2<var>A</var>, donc 2<var>A</var> sin <var>k</var><var>b</var> = √(4<var>A</var><sup>2</sup> \u2212 (<var>E</var> \u2212 <var>E</var><sub>0</sub>)<sup>2</sup>), pour 0 < <var>k</var><var>b</var> < π :",
    "val.13.44": "Exacte dans le modèle de la leçon « La diffusion par les imperfections du réseau », pour une énergie dans la bande, |<var>E</var> \u2212 <var>E</var><sub>0</sub>| < 2<var>A</var>. Hors de la bande, elle n'a pas de sens physique direct : aucune onde n'y arrive.",
    "s1.p2": "Sous la bande, <var>E</var> < <var>E</var><sub>0</sub> \u2212 2<var>A</var>, la racine devient celle d'un nombre négatif. On choisit la racine qui correspond à <var>k</var> = iκ, l'onde qui décroît vers la droite, et l'on obtient :",
    "val.13.45": "Exacte, comme prolongement de (13.44) sous la bande, avec la racine positive. Au-dessus de la bande, l'onde qui décroît correspond à <var>k</var><var>b</var> = π + iκ et la racine change de signe : β = \u2212<var>F</var>/(<var>F</var> \u2212 √((<var>E</var> \u2212 <var>E</var><sub>0</sub>)<sup>2</sup> \u2212 4<var>A</var><sup>2</sup>)).",
    "s1.p3": "Avec <var>F</var> < 0, le dénominateur de (13.45) s'annule quand √((<var>E</var> \u2212 <var>E</var><sub>0</sub>)<sup>2</sup> \u2212 4<var>A</var><sup>2</sup>) = \u2212<var>F</var>, c'est-à-dire en <var>E</var> = <var>E</var><sub>0</sub> \u2212 √(4<var>A</var><sup>2</sup> + <var>F</var><sup>2</sup>) : l'énergie (13.43) de l'électron piégé. β y est infini : un pôle.",

    "s2.sec": "2 · Le pôle est l'état lié",
    "s2.h2": "Une réflexion sans onde incidente",
    "s2.p1": "Pourquoi un pôle ? β est le rapport de l'onde réfléchie à l'onde incidente. S'il est infini, il existe une solution avec une onde « réfléchie » et une onde « transmise » sans onde incidente : un état qui existe seul, et qui, hors de la bande, décroît des deux côtés. C'est exactement l'état lié.",
    "fig.aria": "Module de l'amplitude de réflexion prolongée à toute énergie, et pôle de l'état lié",
    "fig.legend.beta": "|β|, prolongé hors de la bande",
    "fig.legend.bande": "bande permise",
    "fig.legend.pole": "état lié (13.43)",
    "fig.xaxis": "E \u2212 E₀ (eV), A = 1 eV",
    "fig.yaxis": "|β|",
    "fig.f": "Écart d'énergie de l'impureté, F",
    "fig.k.pole": "Pôle de β",
    "fig.f.pole.sous": "sous la bande : puits, F < 0",
    "fig.f.pole.sur": "au-dessus de la bande : bosse, F > 0",
    "fig.k.lie": "État lié calculé directement",
    "fig.f.lie": "par l'état piégé, (13.43) : la même énergie",
    "fig.caption": "Dans la bande, |β| ≤ 1 : c'est une vraie réflexion. Hors de la bande, le prolongement croît jusqu'à l'infini en un seul point, l'énergie de l'état lié, puis décroît. Passez de <var>F</var> < 0 à <var>F</var> > 0 : le pôle passe de sous la bande à au-dessus.",
    "s2.p2": "L'énergie du pôle est celle que la leçon « Le piégeage par une imperfection du réseau » obtenait en cherchant directement l'état. La racine de l'autre signe donnerait, pour <var>F</var> < 0, un second pôle au-dessus de la bande, en <var>E</var><sub>0</sub> + √(4<var>A</var><sup>2</sup> + <var>F</var><sup>2</sup>) ; mais elle correspond à des amplitudes qui croissent loin du défaut, ce n'est pas un état. Au-dessus de la bande, seul <var>F</var> > 0 donne un état lié.",

    "s3.sec": "3 · Un principe général",
    "s3.h2": "Des diffusions aux particules",
    "s3.p1": "Le résultat dépasse le cristal : quand on sait calculer une amplitude de diffusion en fonction de l'énergie, ses pôles hors de la région des énergies de diffusion donnent les états liés. Les deux problèmes, diffuser et lier, sont deux faces d'une même fonction.",
    "s3.p2": "En physique des particules, on mesure des diffusions, pas des états liés. Ce principe permet de lire dans les diffusions mesurées les particules que les forces pourraient lier. Un pôle proche des énergies réelles, mais pas dessus, se voit comme un pic de diffusion : une résonance, un état presque lié de durée finie.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Ce que le pôle laisse voir",
    "s4.p1": "On compare la valeur de |β| juste à côté du pôle et loin de lui ; et l'on vérifie que le pôle de l'autre racine n'est pas un état.",
    "sys.title": "Le système décrit : <var>A</var> = 1\u00a0eV, <var>F</var> = \u22121\u00a0eV",
    "sys1.body": "Le pôle est en <var>E</var> \u2212 <var>E</var><sub>0</sub> = {E} ; à un millionième de cette énergie, |β| vaut déjà {m}. L'état lié se lit dans la formule de la diffusion sans calcul de plus.",
    "sys2.body": "Au-dessus de la bande, en <var>E</var> \u2212 <var>E</var><sub>0</sub> = √5\u00a0eV, l'énergie où (13.45) écrite telle quelle aurait un pôle, la racine de l'onde qui décroît donne |β| = {m}, fini : pas d'état lié là pour un puits.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "La matrice de diffusion",
    "hist.intro": "L'idée de tout décrire par les amplitudes de diffusion est née avec la mécanique quantique des chocs.",
    "hist.events": {
      dirac: { who: "Paul Dirac", what: "écrit la mécanique quantique des processus de choc.", context: "Zeitschrift für Physik, vol. 44 : un des premiers éléments de la théorie de la matrice de diffusion." },
      breit: { who: "Gregory Breit et Eugene Wigner", what: "donnent la forme de la capture des neutrons lents par un noyau, au voisinage d'une résonance.", context: "Physical Review, vol. 49. La forme de Breit-Wigner décrit le pic d'une résonance." },
      wheeler: { who: "John Wheeler", what: "introduit la matrice de diffusion pour décrire les noyaux légers.", context: "Physical Review, vol. 52. Heisenberg la redéveloppe indépendamment dans les années 1940." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      resonances: { name: "Les résonances en physique des particules", text: "Les pôles de la matrice de diffusion, dans le plan des énergies complexes, sont identifiés aux états liés et aux résonances. Les physiciens ajustent encore la forme de Breit-Wigner, dans sa version relativiste, sur les pics de diffusion pour en tirer la masse et la durée de vie d'une particule instable." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      pole: { prompt: "Que signifie un β infini, à une énergie hors de la bande ?",
        options: { a: "Qu'il existe une solution sans onde incidente, qui décroît des deux côtés : un état lié.", b: "Que l'impureté réfléchit infiniment d'électrons.", c: "Que le modèle cesse de valoir.", d: "Que l'électron est infiniment rapide." },
        why: "β = réfléchie/incidente. S'il diverge, on peut garder les ondes sortantes avec une onde incidente nulle : un état qui existe seul, l'état lié." },
      prolonge: { prompt: "Pourquoi écrire β en fonction de E plutôt que de k ?",
        options: { a: "Parce que k n'est pas mesurable.", b: "Parce que β ne dépend pas de k.", c: "Parce que l'énergie est toujours réelle.", d: "Parce que la formule en E se prolonge naturellement hors de la bande, où se trouvent les états liés." },
        why: "Hors de la bande, aucun k réel n'existe, mais E garde un sens. La formule de β en fonction de E se prolonge, et son pôle y donne l'état lié." },
      signe: { prompt: "A = 1 eV, F = \u22122 eV. Où est le pôle de β sous la bande ?",
        options: { a: "E \u2212 E₀ = \u22122 eV.", b: "E \u2212 E₀ = \u2212√8 ≈ \u22122,83 eV.", c: "E \u2212 E₀ = \u22124 eV.", d: "Il n'y en a pas." },
        hint: "Le dénominateur de (13.45) s'annule quand √((E \u2212 E₀)² \u2212 4A²) = \u2212F.",
        why: "(E \u2212 E₀)² = 4A² + F² = 8 : E \u2212 E₀ = \u22122,83 eV, l'énergie (13.43) de l'électron piégé." },
      haut: { prompt: "Pour F < 0, la formule (13.45) écrite telle quelle a aussi un pôle au-dessus de la bande. Est-ce un état lié ?",
        options: { a: "Oui, un second état lié.", b: "Oui, mais instable.", c: "Non : au-dessus de la bande, l'onde qui décroît correspond à l'autre racine ; ce pôle est celui d'amplitudes qui croissent loin du défaut.", d: "Non, car il est dans la bande." },
        why: "Au-dessus de la bande, kb = π + iκ et la racine change de signe. Avec la bonne racine, le pôle n'existe que pour F > 0 : une bosse lie au-dessus de la bande, un puits en dessous." },
      mesure: { prompt: "En physique des particules, à quoi sert ce principe ?",
        options: { a: "À trouver, dans les amplitudes de diffusion mesurées et prolongées, les états liés et les résonances.", b: "À calculer la masse de l'électron.", c: "À éviter les diffusions.", d: "À mesurer la température des particules." },
        why: "On mesure des diffusions. Leurs amplitudes, prolongées en énergie, ont des pôles aux états liés ; un pôle proche des énergies réelles se voit comme une résonance." },
      methode: { prompt: "Qu'apporte la formule de β sur l'état lié, par rapport au calcul direct de la leçon « Le piégeage par une imperfection du réseau » ?",
        options: { a: "Une énergie différente.", b: "La même énergie, obtenue sans chercher l'état : il suffit de trouver le pôle de l'amplitude de diffusion.", c: "Rien : β n'a pas de pôle.", d: "La durée de vie de l'état lié." },
        why: "Le pôle de (13.45) tombe sur (13.43). Diffusion et états liés sont deux faces d'une même fonction de l'énergie." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 13, §13-8 (texte original en anglais). Notations SI. Dirac, Zeitschrift für Physik 44, 585 (1927) ; Breit et Wigner, Physical Review 49, 519 (1936) ; Wheeler, Physical Review 52, 1107 (1937). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

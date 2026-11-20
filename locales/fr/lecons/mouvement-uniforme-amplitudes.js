/* Leçon « Le mouvement uniforme en amplitudes » (Feynman III.7.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/mouvement-uniforme-amplitudes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le mouvement uniforme en amplitudes",
    "crumb.jour": "Mouvement uniforme",
    "h1": "Le mouvement uniforme en amplitudes",
    "lede": "Un atome au repos a une amplitude qui tourne sur place. Vu par un observateur qui se déplace, la même amplitude devient une onde qui avance, de longueur d'onde h/p. Une seule onde ne dit pas où est l'atome ; un paquet d'ondes le dit, et il avance exactement à la vitesse de l'atome.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les atomes au repos et les états stationnaires",

    "s1.sec": "Décrire le système",
    "s1.h2": "Le même atome, vu en mouvement",
    "s1.p1": "Un atome libre, sans force, d'énergie définie, est au repos dans son propre référentiel : son amplitude est (7.1), la même partout. Un observateur qui le voit passer à la vitesse <var>v</var> utilise d'autres coordonnées, liées aux premières par la transformation de Lorentz. La phase <var>E</var><sub>0</sub><var>t</var>′/ħ, écrite dans ses coordonnées, devient :",
    "val.7.5": "Exacte pour une particule libre d'énergie et de quantité de mouvement définies, et la phase est invariante de Lorentz. Approximation dès qu'une force agit, ou que l'énergie n'est définie qu'à δ<var>E</var> près : l'onde devient un paquet, de longueur finie ħ<var>v</var>/δ<var>E</var> environ.",
    "s1.p2": "L'énergie et la quantité de mouvement sont celles de la relativité :",
    "val.7.6": "Exacte pour une particule libre. Aux vitesses faibles, <var>p</var><var>c</var> ≪ <var>E</var><sub>0</sub>, elle se réduit à <var>E</var><sub>0</sub> + <var>p</var><sup>2</sup>/2<var>M</var> avec une erreur relative de l'ordre de (<var>v</var>/<var>c</var>)<sup>2</sup> sur l'énergie cinétique. On retire alors l'énergie de masse, commune à tous les états, comme le permet (7.4).",
    "s1.p3": "À un instant donné, la phase dépend de la position : c'est une onde de nombre d'onde <var>k</var> = <var>p</var>/ħ, et de longueur d'onde :",
    "val.7.11": "Exacte : c'est la relation de de Broglie, une définition de λ une fois admise (7.5). <var>p</var> est la quantité de mouvement relativiste γ<var>M</var><var>v</var>. Pour un électron de 1\u00a0eV, λ vaut environ 1,2\u00a0nm ; pour une balle de tennis, 10<sup>\u221234</sup>\u00a0m, et aucune expérience ne la voit.",

    "s2.sec": "Où est l'atome ?",
    "s2.h2": "Vitesse de phase, vitesse de groupe",
    "s2.p1": "Une onde de quantité de mouvement définie a le même module partout : l'atome peut être n'importe où. Pour le localiser, on superpose des ondes de quantités de mouvement voisines ; elles se renforcent dans une région et se détruisent ailleurs. Cette bosse de probabilité avance à la vitesse de groupe :",
    "val.7.13": "Approximation : vaut pour un paquet dont les nombres d'onde sont proches de <var>k</var><sub>0</sub>, tant que la courbure de ω(<var>k</var>) ne l'étale pas. Un paquet d'électrons de largeur initiale σ double de taille en un temps de l'ordre de <var>M</var>σ<sup>2</sup>/ħ, environ 10<sup>\u221216</sup>\u00a0s pour σ = 0,1\u00a0nm.",
    "s2.p2": "Avec ħω = <var>E</var><sub>p</sub> et ħ<var>k</var> = <var>p</var>, <var>v</var><sub>g</sub> = <var>d</var><var>E</var><sub>p</sub>/<var>d</var><var>p</var> = <var>p</var><var>c</var><sup>2</sup>/<var>E</var><sub>p</sub>, c'est-à-dire la vitesse <var>v</var> de l'atome, exactement. Aux vitesses faibles :",
    "val.7.16": "Approximation non relativiste, (<var>v</var>/<var>c</var>)<sup>2</sup> négligé ; la forme <var>p</var><var>c</var><sup>2</sup>/<var>E</var><sub>p</sub> est exacte. La vitesse de phase ω/<var>k</var>, elle, vaut <var>c</var><sup>2</sup>/<var>v</var> si l'on garde l'énergie de masse, plus que <var>c</var>, et <var>p</var>/2<var>M</var> si on la retire : elle dépend de l'origine des énergies et ne porte rien de mesurable.",
    "s2.p3": "Ci-dessous, un paquet de 61 ondes planes autour de λ<sub>0</sub>, en unités où ħ = <var>M</var> = 1 et l'énergie de masse retirée. La courbe pleine est la probabilité |ψ|<sup>2</sup>, la courbe fine la partie réelle de ψ. Le trait orangé suit une crête. Faites avancer le temps.",
    "fig.aria.paquet": "Un paquet d'ondes : probabilité et partie réelle de l'amplitude le long de x, à l'instant choisi",
    "fig.legend.re": "partie réelle de ψ",
    "fig.legend.p": "probabilité |ψ|²",
    "fig.legend.crete": "une crête",
    "fig.t": "Temps, t",
    "fig.w": "Étalement relatif des nombres d'onde",
    "fig.ax.x": "position (en λ₀)",
    "fig.ax.psi": "amplitude, probabilité",
    "fig.k.centre": "Centre du paquet",
    "fig.f.centre": "avance à v<sub>g</sub> = <var>p</var>/<var>M</var>",
    "fig.k.crete": "Crête suivie",
    "fig.f.crete": "avance à <var>p</var>/2<var>M</var>, deux fois moins vite",
    "fig.caption": "Les crêtes traversent le paquet d'avant en arrière : elles vont deux fois moins vite que lui, avec l'énergie de masse retirée. Un paquet étroit, d'étalement relatif grand, se disperse plus vite : ses ondes ont des vitesses de groupe plus différentes.",
    "sys.title": "Le système décrit : un électron de λ = 1 nm",
    "sys1.body": "Un électron de longueur d'onde 1\u00a0nm a une vitesse de {v}, une énergie cinétique de {Ec} ; (<var>v</var>/<var>c</var>)<sup>2</sup> = {b}, et la forme non relativiste (7.16) est juste à mieux que 10<sup>\u22125</sup> près.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des ondes de matière, de l'électron aux molécules",
    "hist.intro": "La relation λ = h/p a été proposée, puis vérifiée pour des objets de plus en plus lourds.",
    "hist.events": {
      broglie: { who: "Louis de Broglie", what: "propose dans sa thèse que l'électron, comme la lumière, ait des propriétés d'onde, avec une longueur d'onde liée à sa quantité de mouvement.", context: "Il identifie la vitesse de la particule à la vitesse de groupe de l'onde." },
      davisson: { who: "Clinton Davisson et Lester Germer, et George Paget Thomson", what: "observent, indépendamment, la diffraction des électrons.", context: "Davisson et Germer travaillent aux Bell Labs, Thomson à Aberdeen. La longueur d'onde mesurée est celle de de Broglie." },
      c60: { who: "Une équipe de Vienne", what: "observe la diffraction de molécules de fullerène C₆₀.", context: "Soixante atomes de carbone, une masse de 720\u00a0u : la relation de de Broglie vaut encore." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      neutrons: { name: "Diffraction des neutrons", text: "Observée en 1936 et développée pour la cristallographie dans les années 1940, la diffraction des neutrons repose sur λ = h/p : des neutrons de longueur d'onde voisine de la distance entre atomes révèlent la structure des cristaux, et celle de leurs moments magnétiques." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      lorentz: { prompt: "D'où vient la dépendance en position de l'amplitude d'un atome en mouvement ?",
        options: { a: "D'une force qui agit sur lui.", b: "De la transformation de Lorentz de la phase de l'atome au repos : le temps propre mélange t et x.", c: "D'une hypothèse arbitraire.", d: "De sa masse." },
        why: "Au repos, la phase vaut E₀t′/ħ. Écrite dans le référentiel où l'atome bouge, elle devient (Eₚt \u2212 p·x)/ħ : (7.5)." },
      lambda: { prompt: "Un électron et un proton ont la même quantité de mouvement. Leurs longueurs d'onde…",
        options: { a: "diffèrent dans le rapport des masses.", b: "diffèrent dans le rapport des racines des masses.", c: "sont nulles.", d: "sont égales : λ = h/p ne dépend que de p." },
        why: "(7.11) ne contient que p. À même énergie cinétique, en revanche, le proton aurait une longueur d'onde √1836 ≈ 43 fois plus courte." },
      groupe: { prompt: "À quelle vitesse avance la bosse de probabilité d'un paquet d'ondes de matière ?",
        options: { a: "À la vitesse de groupe dω/dk, qui est exactement la vitesse de la particule.", b: "À la vitesse de phase.", c: "À c.", d: "Elle ne bouge pas." },
        why: "(7.13) à (7.16) : dEₚ/dp = pc²/Eₚ = v. C'est ce qui fait que la mécanique quantique redonne le mouvement classique." },
      phase: { prompt: "La vitesse de phase d'une onde de matière, énergie de masse comprise, vaut c²/v > c. Est-ce un problème ?",
        options: { a: "Oui, la relativité est violée.", b: "Oui, l'onde est fausse.", c: "Non : elle ne transporte rien de mesurable, et elle change si l'on déplace l'origine des énergies.", d: "Non, car v > c." },
        why: "Une phase seule n'est pas observable ; une crête ne porte aucune information. Seule la vitesse de groupe compte." },
      paquet: { prompt: "Pourquoi les crêtes traversent-elles le paquet d'avant en arrière, dans le calcul non relativiste ?",
        options: { a: "Elles ne le font pas.", b: "Parce qu'elles vont à p/2M, deux fois moins vite que le paquet, qui va à p/M.", c: "Parce qu'elles vont plus vite que le paquet.", d: "Parce que le paquet recule." },
        hint: "ω = ħk²/2M : comparez ω/k et dω/dk.",
        why: "ω/k = ħk/2M, dω/dk = ħk/M. Le paquet double les crêtes, qui semblent glisser vers l'arrière." },
      relat: { prompt: "Pour un électron de 1,5 eV, faut-il la forme relativiste de Eₚ ?",
        options: { a: "Non : (v/c)² ≈ 6 × 10⁻⁶, la forme p²/2M suffit largement.", b: "Oui, toujours.", c: "Oui, car l'électron est léger.", d: "On ne peut pas savoir." },
        why: "Avec λ = 1 nm, v ≈ 7 × 10⁵ m·s⁻¹. L'écart relatif sur l'énergie cinétique est de l'ordre de (v/c)²." },
      hyp: { prompt: "Qu'est-ce que la relativité seule ne donne pas, dans cette leçon ?",
        options: { a: "La forme (7.5) de l'onde.", b: "La relation λ = h/p.", c: "La valeur de Eₚ.", d: "Le fait qu'on puisse superposer des ondes de vitesses différentes pour décrire une particule : c'est une hypothèse de plus." },
        why: "La transformation de Lorentz donne l'onde pour une vitesse ; combiner des ondes de vitesses différentes demande d'admettre qu'elles décrivent un même objet." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 7, §7-2 (texte original en anglais). Notations SI. De Broglie, thèse (1924) ; Davisson et Germer (1927) ; Thomson (1927) ; diffraction de C₆₀, Vienne (1999). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

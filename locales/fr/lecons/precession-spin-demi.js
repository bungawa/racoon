/* Leçon « La précession d'une particule de spin 1/2 » (Feynman III.7.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/precession-spin-demi.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La précession d'une particule de spin 1/2",
    "crumb.jour": "Précession du spin",
    "h1": "La précession d'une particule de spin 1/2",
    "lede": "Dans un champ magnétique, les deux états de spin d'une particule ont des énergies différentes. Leurs amplitudes tournent à des fréquences différentes, et un spin préparé de travers tourne autour du champ. On retrouve la précession d'un gyroscope, calculée uniquement avec deux phases.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les forces et la limite classique",

    "s1.sec": "Décrire le système",
    "s1.h2": "Deux énergies dans un champ",
    "s1.p1": "Une particule de spin 1/2 est au repos dans un champ magnétique <var>B</var> uniforme et constant, dirigé selon <var>z</var>. Ses états +<var>z</var> et \u2212<var>z</var> ont des énergies opposées, +μ<var>B</var> et \u2212μ<var>B</var>, avec la convention de signe de Feynman : μ est compté pour que l'état + ait l'énergie +μ<var>B</var>. Ce sont des états stationnaires, au sens de « Les atomes au repos et les états stationnaires ». À l'instant 0, on prépare la particule selon +<var>x</var>, par un appareil tourné de 90° autour de <var>y</var> :",
    "val.7.35": "Exacte, dans la forme standard des amplitudes de spin 1/2 ; c'est (6.32) appliquée à l'état +<var>x</var>. Une autre convention de phase changerait les signes, pas les probabilités.",
    "s1.p2": "Chaque composante tourne à sa propre fréquence, fixée par son énergie :",
    "val.7.36": "Exacte pour un champ uniforme et constant, une particule au repos, et seulement le spin : on néglige le mouvement et les autres états de la particule, et l'on retire l'énergie commune <var>E</var><sub>0</sub>. Si <var>B</var> varie dans le temps, les deux états peuvent se mélanger, et il faut le calcul de « Le hamiltonien et la molécule d'ammoniac ».",

    "s2.sec": "Le spin tourne",
    "s2.h2": "La fréquence de précession",
    "s2.p1": "Quelle est, à l'instant <var>t</var>, l'amplitude de trouver la particule encore selon +<var>x</var> ? On repasse dans la base de <var>x</var> :",
    "val.7.37": "Exacte : c'est la loi (5.24) avec la base ±<var>z</var>. Les amplitudes ⟨+<var>x</var>|±<var>z</var>⟩ sont les conjuguées de (7.35), toutes deux 1/√2. Il vient <var>A</var><sub>+</sub>(<var>t</var>) = cos(μ<var>B</var><var>t</var>/ħ), et la probabilité cos<sup>2</sup>(μ<var>B</var><var>t</var>/ħ).",
    "s2.p2": "Cette probabilité revient à 1 quand μ<var>B</var><var>t</var>/ħ = π. Le calcul de la probabilité d'être selon +<var>y</var> donne cos<sup>2</sup>(μ<var>B</var><var>t</var>/ħ \u2212 π/4) : le spin passe de +<var>x</var> à +<var>y</var>, puis à \u2212<var>x</var>. Il tourne autour du champ à la vitesse angulaire :",
    "val.7.38": "Exacte dans le modèle à deux états, champ uniforme et constant. C'est la précession de Larmor, ω<sub><var>p</var></sub> = 2μ<var>B</var>/ħ, et aussi la pulsation (<var>E</var><sub>+</sub> \u2212 <var>E</var><sub>\u2212</sub>)/ħ entre les deux niveaux. Pour un électron, μ diffère de μ<sub>B</sub> d'environ 0,1\u00a0%, et la fréquence de 28\u00a0GHz par tesla aussi.",
    "s2.p3": "Le résultat est celui d'un gyroscope classique, un moment cinétique ħ/2 portant un moment magnétique μ, qui précesse autour du champ. Mais rien de classique n'a été supposé : deux énergies, deux phases, et la règle de composition des amplitudes.",

    "s3.sec": "Les nombres",
    "s3.h2": "Un électron qui précesse",
    "s3.p1": "Un électron, de moment μ ≈ μ<sub>B</sub>, préparé selon +<var>x</var>, dans un champ <var>B</var> selon <var>z</var>. Les courbes donnent les probabilités de le trouver selon +<var>x</var> et selon +<var>y</var>, en fonction du temps. Changez le champ.",
    "fig.aria.courbes": "Probabilités de trouver le spin selon +x et selon +y, en fonction du temps",
    "fig.legend.x": "P(+x) = cos²(μBt/ħ)",
    "fig.legend.y": "P(+y) = cos²(μBt/ħ \u2212 π/4)",
    "fig.B": "Champ magnétique, B",
    "fig.t": "Instant observé, t (ps)",
    "fig.ax.t": "temps (ps)",
    "fig.ax.p": "probabilité",
    "fig.k.f": "Fréquence de précession ω<sub><var>p</var></sub>/2π",
    "fig.f.f": "ω<sub><var>p</var></sub> = {w}",
    "fig.k.p": "P(+<var>x</var>) ; P(+<var>y</var>)",
    "fig.k.angle": "Angle tourné autour de <var>z</var>, ω<sub><var>p</var></sub><var>t</var>",
    "fig.f.angle": "ramené entre 0 et 360°",
    "fig.caption": "La courbe en tirets est la même, décalée d'un quart de période : le spin passe par +<var>y</var> un quart de tour après +<var>x</var>. Doubler le champ double la fréquence. Les probabilités reviennent après un tour de précession ; l'amplitude, elle, a changé de signe, comme dans « Les rotations autour de l'axe z ».",
    "sys.title": "Le système décrit : un électron dans 1 T",
    "sys1.body": "Dans un champ de 1\u00a0T, un électron précesse à {f}, en {T} par tour. Un proton, au moment magnétique environ 660 fois plus faible, précesse à 42,58\u00a0MHz : c'est la fréquence de l'IRM à 1\u00a0T.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Peser un moment magnétique par sa précession",
    "hist.intro": "Mesurer la fréquence de précession d'un muon dans un champ connu donne son moment magnétique. Les expériences dites « g \u2212 2 » l'ont fait de plus en plus finement.",
    "hist.events": {
      cern: { who: "Le CERN", what: "lance la première de trois expériences sur le moment magnétique anormal du muon.", context: "Elle atteint environ 2\u00a0% ; la deuxième, à partir de 1966, 0,4\u00a0% ; la troisième, de 1969 à 1979, confirme la théorie à 0,0007\u00a0% près." },
      bnl: { who: "L'expérience E821 de Brookhaven", what: "publie son rapport final sur le moment magnétique anormal du muon.", context: "Ses données ont été prises de 1997 à 2001, dans un anneau de stockage dont l'aimant sera ensuite transporté à Fermilab." },
      fnal: { who: "L'expérience Muon g \u2212 2 de Fermilab", what: "publie son résultat final, sur six ans de données.", context: "Précision de 0,127 partie par million. Les muons polarisés précessent dans un champ uniforme d'environ 1,45\u00a0T ; les positrons de leur désintégration révèlent la direction de leur spin." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      irm: { name: "Imagerie par résonance magnétique", text: "L'IRM fait précesser l'aimantation des protons de l'eau autour du champ principal, à 42,58\u00a0MHz par tesla, et capte le signal de cette précession. Les aimants cliniques vont en général de 0,1 à 3\u00a0T." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      phases: { prompt: "Dans un champ selon z, qu'arrive-t-il aux amplitudes C₊ et C₋ d'un spin 1/2 au repos ?",
        options: { a: "Leurs modules oscillent.", b: "Elles restent constantes.", c: "Elles tournent en phase à des fréquences opposées, ∓μB/ħ.", d: "Elles s'échangent." },
        why: "Les états ±z sont stationnaires, d'énergies ±μB : (7.36). Les modules ne changent pas, donc les probabilités selon z non plus." },
      px: { prompt: "Un spin parti selon +x, dans un champ selon z. Quelle est la probabilité de le trouver selon +x à l'instant t ?",
        options: { a: "cos²(μBt/ħ).", b: "1, toujours.", c: "1/2, toujours.", d: "sin²(μBt/ħ)." },
        why: "A₊(t) = (e^\u2212iμBt/ħ + e^iμBt/ħ)/2 = cos(μBt/ħ), par (7.37)." },
      periode: { prompt: "Pour un électron dans 1 T, combien de temps dure un tour de précession ?",
        options: { a: "1 s.", b: "1 µs.", c: "36 ns.", d: "Environ 36 ps : la fréquence vaut 28 GHz." },
        why: "ω_p/2π = 2μ_B·B/h ≈ 2,8 × 10¹⁰ Hz, une période de 3,6 × 10⁻¹¹ s." },
      vitesse: { prompt: "Que vaut la vitesse angulaire de précession ?",
        options: { a: "μB/ħ.", b: "2μB/ħ, l'écart d'énergie entre les deux états divisé par ħ.", c: "μB/h.", d: "Elle ne dépend pas du champ." },
        why: "(7.38) : ω_p = (E₊ \u2212 E₋)/ħ = 2μB/ħ. La probabilité cos²(μBt/ħ) revient bien à 1 en 2π/ω_p." },
      py: { prompt: "Un quart de période après le départ selon +x, où est le spin ?",
        options: { a: "Selon \u2212x.", b: "Selon +z.", c: "Selon +y : P(+y) = cos²(μBt/ħ \u2212 π/4) vaut 1 à μBt/ħ = π/4.", d: "Nulle part." },
        why: "Le spin tourne dans le plan xy, autour du champ : +x, +y, \u2212x, \u2212y, puis +x." },
      classique: { prompt: "Pourquoi le résultat ressemble-t-il à la précession d'un gyroscope classique ?",
        options: { a: "Parce qu'on a supposé un moment cinétique classique.", b: "Par coïncidence.", c: "Parce que l'électron tourne sur lui-même.", d: "Parce que les moyennes du spin suivent l'équation classique du moment magnétique dans un champ, bien que le calcul n'utilise que deux phases." },
        why: "La précession de Larmor sort des amplitudes, sans hypothèse classique. C'est un cas de la limite classique pour les moyennes." },
      mesure: { prompt: "Comment l'expérience Muon g \u2212 2 suit-elle la direction du spin des muons ?",
        options: { a: "Par les positrons de leur désintégration, dont la direction et l'énergie dépendent de celle du spin.", b: "En les faisant passer dans un appareil de Stern et Gerlach.", c: "Par leur couleur.", d: "En mesurant leur masse." },
        why: "Les muons sont stockés dans un champ connu ; la précession de leur spin module le nombre de positrons énergétiques comptés par les calorimètres." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 7, §7-5 (texte original en anglais). Notations SI. CERN (1959–1979) ; Brookhaven E821 (2006) ; Fermilab, Muon g \u2212 2 (2025). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

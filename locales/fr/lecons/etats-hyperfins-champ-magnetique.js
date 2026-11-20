/* Leçon « Les états dans un champ magnétique hyperfin » (Feynman III.12.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/etats-hyperfins-champ-magnetique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les états dans un champ magnétique hyperfin",
    "crumb.jour": "Les états dans le champ",
    "h1": "Les états dans un champ magnétique hyperfin",
    "lede": "Les énergies ne disent pas tout : dans un champ, ce sont les états eux-mêmes qui changent. En champ faible, l'atome se comporte comme une particule de spin 1 ou de spin 0 ; en champ fort, comme un électron et un proton presque indépendants. Que devient un faisceau d'hydrogène qui traverse un aimant de Stern et Gerlach ?",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'effet Zeeman hyperfin",
    "eq.III": "III",

    "s1.sec": "1 · La composition des états",
    "s1.h2": "Combien de |+\u2212⟩, combien de |\u2212+⟩",
    "s1.p1": "Le système : l'atome d'hydrogène fondamental dans un champ <var>B</var> uniforme selon <var>z</var>, décrit par (12.27) de « L'effet Zeeman hyperfin ». Les états I et II restent |++⟩ et |\u2212\u2212⟩. Les états III et IV sont des combinaisons de |+\u2212⟩ et |\u2212+⟩ ; l'une des deux équations du bloc donne le rapport de leurs amplitudes :",
    "val.12.39": "Approximation : celle de (12.27), état 1s dans un champ uniforme. Exacte dans ce modèle, pour <var>E</var> = <var>E</var><sub>III</sub> ou <var>E</var><sub>IV</sub>.",
    "s1.p2": "En champ fort, <var>E</var><sub>III</sub> ≈ \u2212<var>A</var> + μ′<var>B</var>, et le rapport devient grand :",
    "val.12.40": "Approximation : champ fort, μ′<var>B</var> ≫ 2<var>A</var> ; erreur relative (<var>A</var>/μ′<var>B</var>)<sup>2</sup>, soit 1\u00a0% à 0,25\u00a0T. L'état III tend alors vers |+\u2212⟩, l'état IV vers |\u2212+⟩.",

    "s2.sec": "2 · Le champ faible",
    "s2.h2": "Un spin 1 et un spin 0",
    "s2.p1": "En champ nul, les quatre états sont ceux de « Les niveaux d'énergie hyperfins ». Trois se rangent comme les états d'une particule de spin 1 :",
    "val.12.41": "Exacte à <var>B</var> = 0 ; en champ faible, les états propres s'en écartent d'une part de l'ordre de μ′<var>B</var>/4<var>A</var>.",
    "val.12.42": "Exacte à <var>B</var> = 0 : l'état de spin 0, qui ne change pas dans une rotation.",
    "s2.p2": "Pour chaque état, la composante <var>z</var> du moment cinétique total, spins de l'électron et du proton ensemble, vaut",
    "val.12.43": "Exacte pour les états de base selon <var>z</var> et leurs combinaisons de même <var>m</var> : <var>m</var> = +1 pour |++⟩, \u22121 pour |\u2212\u2212⟩, 0 pour |+\u2212⟩, |\u2212+⟩ et leurs combinaisons. Comme le champ selon <var>z</var> ne change pas <var>J</var><sub>z</sub>, <var>m</var> reste défini à tout champ.",
    "s2.p3": "Le champ ne mélange donc que des états de même <var>m</var> : seuls III et IV, tous deux <var>m</var> = 0, se mélangent. C'est ce qui rend le problème soluble avec une racine carrée.",

    "s3.sec": "3 · La polarisation de l'électron",
    "s3.h2": "Du couplage à l'indépendance",
    "s3.p1": "La moyenne ⟨σ<sub>z</sub>⟩ de l'électron dit à quel point son spin est orienté dans chaque état. Le champ est en échelle logarithmique, de 1\u00a0mT à 1\u00a0T.",
    "fig.aria": "Polarisation moyenne du spin de l'électron dans chacun des quatre états de l'hydrogène en fonction du champ magnétique, en échelle logarithmique",
    "fig.legend.I": "I",
    "fig.legend.II": "II",
    "fig.legend.III": "III",
    "fig.legend.IV": "IV",
    "fig.B": "Champ magnétique B (échelle logarithmique)",
    "fig.x": "log₁₀(B / 1 T)",
    "fig.y": "⟨σz⟩ de l'électron",
    "fig.k.c": "État III : <var>C</var><sub>2</sub> ; <var>C</var><sub>3</sub>",
    "fig.f.c": "rapport C2/C3 = {r}",
    "fig.k.se": "⟨σ<sub>z</sub>⟩ de l'électron",
    "fig.f.se": "I ; II ; III ; IV",
    "fig.k.pente": "d<var>E</var>/d<var>B</var>, en μ<sub>B</sub>",
    "fig.f.pente": "I ; II ; III ; IV",
    "fig.caption": "I et II valent exactement ±1 ; leurs courbes sont tracées à ±0,98 pour rester visibles. Le pointillé marque <var>B</var><sub>0</sub> = 2<var>A</var>/μ′ ≈ 0,05\u00a0T. En champ faible, III et IV ont un électron sans orientation, ⟨σ<sub>z</sub>⟩ ≈ 0 ; en champ fort, il est presque entièrement orienté. La pente d<var>E</var>/d<var>B</var> suit la même évolution : c'est le moment magnétique effectif de l'atome dans cet état.",
    "s3.p2": "Le moment effectif \u2212d<var>E</var>/d<var>B</var> fixe la force dans un champ non uniforme. En champ fort, I et III ont la même pente, environ +μ<sub>B</sub> : ils sont repoussés vers les champs faibles ; II et IV, de pente \u2212μ<sub>B</sub>, attirés vers les champs forts. Un aimant de Stern et Gerlach à champ fort sépare donc l'hydrogène en deux faisceaux, pas en quatre.",

    "s4.sec": "4 · Décrire le système",
    "s4.h2": "Un faisceau d'hydrogène dans un gradient",
    "s4.p1": "Dans un aimant de Stern et Gerlach, le champ varie de point en point ; on suppose que chaque atome suit lentement son état propre local, sans sauter de l'un à l'autre.",
    "sys.title": "Ordres de grandeur",
    "sys1.body": "Dans un gradient de {g}, un moment effectif μ<sub>B</sub> subit une force {F}, soit, pour un atome d'hydrogène, une accélération de {a}. En quelques centimètres de vol, cela suffit à séparer les faisceaux. Le résultat dépend du champ moyen, comparé à {b0} : en champ faible, III et IV ne sont presque pas déviés.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Trier les atomes d'hydrogène",
    "hist.intro": "L'aimant de Stern et Gerlach, qui avait révélé le spin, est devenu un outil pour préparer des atomes dans un état choisi.",
    "hist.events": {
      sg: { who: "Otto Stern et Walther Gerlach", what: "séparent à Francfort un jet d'atomes d'argent en deux faisceaux par un champ non uniforme.", context: "Le spin de l'électron n'est pas encore connu ; l'explication viendra en 1927." },
      pt: { who: "Thomas Phipps et John Taylor", what: "répètent l'expérience avec des atomes d'hydrogène dans leur état fondamental, où l'électron n'a pas de moment orbital : le faisceau se sépare encore en deux.", context: "C'est le spin seul de l'électron qui est dévié ; le moment du proton, environ 660 fois plus petit, ne se voit pas." },
      maser: { who: "Norman Ramsey, Mark Goldenberg et Daniel Kleppner", what: "utilisent un séparateur de type Stern et Gerlach pour produire un faisceau d'hydrogène polarisé, qui alimente le premier maser à hydrogène.", context: "Les atomes des états d'énergie haute sont envoyés dans la cavité, ceux d'énergie basse écartés." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      tri: { name: "Sélection d'état des masers", text: "Dans un maser à hydrogène, un aimant à gradient trie les atomes selon le signe de leur moment effectif, comme sur la figure, et ne laisse entrer dans la cavité que ceux du niveau haut de la transition d'horloge." },
      polar: { name: "Atomes polarisés", text: "Les mêmes forces permettent de préparer des jets d'atomes dont le spin de l'électron, ou celui du noyau, est orienté : on s'en sert comme cibles polarisées en physique des particules et pour piéger magnétiquement des atomes neutres." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      faible: { prompt: "En champ très faible, à quoi ressemblent les états III et IV ?",
        options: { a: "À |+\u2212⟩ et |\u2212+⟩.", b: "À |++⟩ et |\u2212\u2212⟩.", c: "À (|+\u2212⟩ + |\u2212+⟩)/√2 et (|+\u2212⟩ \u2212 |\u2212+⟩)/√2 : le triplet m = 0 et le singulet.", d: "À un mélange des quatre états." },
        why: "À B = 0, (12.39) donne C2/C3 = (A + A)/2A = 1 pour III, et \u22121 pour IV : les états (12.41) et (12.42)." },
      fort: { prompt: "En champ fort, que vaut ⟨σz⟩ de l'électron dans l'état III ?",
        options: { a: "0.", b: "Presque +1 : III tend vers |+\u2212⟩, électron en haut.", c: "\u22121.", d: "1/2." },
        hint: "(12.40) : C2/C3 ≈ μ′B/A, grand.",
        why: "C2 ≫ C3 : l'état est presque |+\u2212⟩, et ⟨σz⟩ = |C2|² \u2212 |C3|² tend vers 1. Le couplage n'arrive plus à garder les deux spins liés." },
      m: { prompt: "Pourquoi le champ selon z ne mélange-t-il jamais |++⟩ avec un autre état ?",
        options: { a: "Parce que le hamiltonien (12.27) conserve m, la composante z du moment cinétique total, et que |++⟩ est le seul état de m = +1.", b: "Parce que le champ est trop faible.", c: "Parce que |++⟩ a la plus haute énergie.", d: "Parce que le proton est lourd." },
        why: "Un champ selon z ne change rien à une rotation autour de z : Jz est conservé. Seuls se mélangent les états de même m ; III et IV, tous deux m = 0, sont les seuls à le faire." },
      sg: { prompt: "Un faisceau d'hydrogène traverse un aimant de Stern et Gerlach à champ fort, 1 T. En combien de faisceaux se sépare-t-il ?",
        options: { a: "Quatre, un par état.", b: "Trois, comme un spin 1.", c: "Un seul : l'hydrogène fondamental n'a pas de moment.", d: "Deux : I et III ont le moment effectif +μB environ, II et IV \u2212μB." },
        why: "En champ fort, les pentes dE/dB sont ±μB environ, selon l'orientation du seul électron. Les petites différences dues au proton et au couplage ne séparent pas visiblement les faisceaux. C'est ce qu'ont vu Phipps et Taylor." },
      zero: { prompt: "En champ faible, quel est le moment effectif \u2212dE/dB de l'état IV ?",
        options: { a: "μB.", b: "\u2212μB.", c: "Presque nul : son énergie ne varie qu'en B², et la pente s'annule en champ nul.", d: "μp." },
        why: "E_IV ≈ \u22123A \u2212 μ′²B²/4A : dE/dB ∝ B, nul en champ nul. Un atome dans l'état singulet n'est presque pas dévié par un aimant faible." },
      force: { prompt: "Un atome dans l'état I entre dans un champ fort et non uniforme. Vers où est-il poussé ?",
        options: { a: "Vers les champs forts.", b: "Vers les champs faibles : son énergie A + μB croît avec B, la force \u2212dE/dB · gradient le chasse de là où B est grand.", c: "Nulle part : la force est nulle.", d: "Perpendiculairement au champ." },
        why: "La force vaut \u2212∇E = \u2212(dE/dB) ∇B. Pour I, dE/dB = μ > 0 : l'atome va vers les B faibles. C'est un « chercheur de champ faible », qu'on peut piéger au minimum d'un champ." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 12, §12-5 (texte original en anglais). Notations SI. Stern et Gerlach, Phipps et Taylor, faisceau polarisé de Ramsey, Goldenberg et Kleppner : article « Stern–Gerlach experiment » de Wikipédia en anglais. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

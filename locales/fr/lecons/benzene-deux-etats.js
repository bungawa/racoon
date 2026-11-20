/* Leçon « La molécule de benzène à deux états » (Feynman III.10.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/benzene-deux-etats.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La molécule de benzène à deux états",
    "crumb.jour": "Le benzène",
    "h1": "La molécule de benzène à deux états",
    "lede": "Six carbones en anneau, et deux façons d'y placer trois doubles liaisons. Les chimistes dessinent l'une ou l'autre ; la molécule n'est ni l'une ni l'autre. Elle est un mélange des deux, plus stable que chacune, comme l'ammoniac est un mélange de l'azote en haut et en bas.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la molécule d'ammoniac",

    "s1.sec": "L'énigme",
    "s1.h2": "Une molécule qui devrait exister en deux versions",
    "s1.p1": "Le système : C₆H₆, six carbones en anneau, un hydrogène sur chacun. On ne regarde que les électrons de valence, un par hydrogène et quatre par carbone, trente en tout ; les deux électrons de la couche interne de chaque carbone restent en place. Les règles de valence demandent quatre liaisons par carbone : on y arrive en alternant liaisons simples et doubles autour de l'anneau. Il y a deux façons de le faire, qui se déduisent l'une de l'autre par une rotation de 60°.",
    "s1.p2": "Remplaçons deux hydrogènes voisins par des atomes de brome. Si les doubles liaisons étaient fixes, il y aurait deux orthodibromobenzènes : l'un où les deux bromes encadrent une double liaison, l'autre où ils encadrent une simple. Les chimistes n'en ont jamais trouvé qu'un. Et l'anneau est plus solidement lié qu'on ne le calcule en additionnant les énergies de trois liaisons doubles et trois simples.",

    "s2.sec": "Le modèle",
    "s2.h2": "Deux états de base, une amplitude de passage",
    "s2.p1": "Prenons les deux dispositions pour états de base, |1⟩ et |2⟩. Par symétrie, elles ont la même énergie <var>E</var><sub>0</sub>. Les électrons peuvent passer d'une disposition à l'autre, avec une amplitude \u2212<var>A</var> ; <var>A</var> est grand, parce que les électrons sont légers. C'est le système de « La molécule d'ammoniac » :",
    "val.etats": "Approximation : deux états de base seulement, électrons de valence répartis en liaisons. Les autres dispositions (liaisons longues entre carbones opposés) et la description par orbitales étendues à tout l'anneau sont négligées.",
    "s2.p2": "L'état fondamental |II⟩ est plus bas que chacune des dispositions de <var>A</var> : c'est l'excès de stabilité observé. Il donne la même amplitude aux deux dispositions : il n'existe donc qu'un orthodibromobenzène, mélange des deux dessins. Et il doit exister un état excité |I⟩, à 2<var>A</var> au-dessus. Un photon d'énergie 2<var>A</var> peut l'atteindre :",
    "val.lambda": "Exacte : longueur d'onde dans le vide d'un photon d'énergie 2<var>A</var>. L'approximation est dans le modèle qui donne 2<var>A</var> : la mesure s'en écarte de plus de 30\u00a0%.",
    "s2.p3": "Le modèle à deux états prédit même que cette absorption est faible : |I⟩ et |II⟩ ont la même répartition de charge, et le moment dipolaire de transition entre eux est nul. Une description plus complète, avec davantage d'états de base, modifie un peu les états stationnaires et rend la transition possible.",

    "s3.sec": "Interaction",
    "s3.h2": "Les deux dessins, et leur mélange",
    "s3.p1": "Les deux anneaux montrent les deux dispositions, chacune avec ses doubles liaisons d'autant plus marquées qu'elle pèse dans l'état fondamental. Réglez <var>A</var>, puis rendez les deux dispositions inégales, d'un écart δ = <var>H</var><sub>22</sub> \u2212 <var>H</var><sub>11</sub>, comme le ferait un substituant qui en favorise une.",
    "fig.aria1": "Première disposition de Kekulé : doubles liaisons sur trois côtés de l'anneau, ombrées selon son poids",
    "fig.aria2": "Seconde disposition de Kekulé : doubles liaisons sur les trois autres côtés, ombrées selon son poids",
    "fig.legend.k1": "disposition |1⟩",
    "fig.legend.k2": "disposition |2⟩",
    "fig.A": "Amplitude de passage A",
    "fig.delta": "Écart δ entre les deux dispositions",
    "fig.k.P": "Poids de |1⟩ / de |2⟩ dans l'état fondamental",
    "fig.f.P0": "dispositions égales : moitié chacune, quel que soit A",
    "fig.f.P": "la disposition la plus basse l'emporte",
    "fig.k.gain": "Gain d'énergie sur la meilleure disposition seule",
    "fig.f.gain": "A pour deux dispositions égales, moins sinon",
    "fig.k.l": "Longueur d'onde absorbée",
    "fig.f.l": "écart des deux états : {dE}",
    "fig.caption": "À δ = 0, le gain vaut <var>A</var> et les six liaisons sont équivalentes : c'est le benzène. Quand δ dépasse quelques <var>A</var>, une disposition domine, le gain tombe vers <var>A</var>²/δ, (10.8) : le mélange ne stabilise que des dispositions de même énergie.",
    "s3.p2": "La valeur de départ, <var>A</var> = 1,58\u00a0eV, est celle qu'on déduit de l'excès de stabilité mesuré. Elle prédit une absorption vers 390\u00a0nm, à la limite du visible ; le benzène absorbe en réalité vers 255\u00a0nm. Le modèle explique l'existence de l'état excité, pas sa place.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Ce que mesurent les chimistes",
    "s4.p1": "Hydrogéner le cyclohexène, qui a une double liaison, libère 120\u00a0kJ·mol⁻¹. Un anneau à trois doubles liaisons fixes devrait en libérer environ trois fois plus, 360\u00a0kJ·mol⁻¹. Le benzène n'en libère que 208 : il est plus stable de 152\u00a0kJ·mol⁻¹. Ses six liaisons carbone-carbone ont toutes la même longueur, 140\u00a0pm, entre celle d'une liaison double, 135\u00a0pm, et celle d'une simple, 147\u00a0pm.",
    "s4.p2": "Une description plus juste ne mélange pas deux dessins : elle place six électrons sur des orbitales étendues à tout l'anneau. C'est l'objet de « Le benzène par les particules indépendantes ».",
    "sys.title": "Le système décrit : l'excès de stabilité, et l'absorption",
    "sys.body": "152\u00a0kJ·mol⁻¹ font {A} par molécule : c'est <var>A</var> dans le modèle. L'état excité serait à 2<var>A</var>, un photon de {l}. La première bande d'absorption mesurée est à {lm}, soit {Em}. Les deux sont très au-dessus de <var>k</var><sub>B</sub><var>T</var> = {kT} à 300\u00a0K : à température ambiante, toutes les molécules sont dans l'état fondamental.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Un siècle pour une formule",
    "hist.intro": "La formule du benzène a été trouvée avant d'être comprise ; la solution quantique est venue d'abord par le mélange de deux dessins.",
    "hist.events": {
      faraday: { who: "Michael Faraday", what: "isole le benzène dans le résidu huileux de la production du gaz d'éclairage, et le nomme « bicarbure d'hydrogène ».", context: "Eilhard Mitscherlich l'obtient en 1833 à partir de l'acide benzoïque et le nomme « benzine »." },
      kekule: { who: "August Kekulé", what: "propose un anneau de six carbones, liaisons simples et doubles alternées.", context: "La formule explique la composition, mais elle prédit deux orthodibromobenzènes." },
      oscillation: { who: "August Kekulé", what: "suppose que les deux dispositions s'échangent sans cesse, si bien qu'aucune liaison n'est durablement simple ou double.", context: "C'est déjà l'idée d'un mélange des deux dispositions, sans la mécanique quantique pour la fonder." },
      lonsdale: { who: "Kathleen Lonsdale", what: "montre par diffraction des rayons X, sur des cristaux d'hexaméthylbenzène, que l'anneau est un hexagone plan.", context: "La diffraction des rayons X donne les positions des atomes dans le cristal, donc la forme de la molécule." },
      huckel: { who: "Erich Hückel", what: "donne la première explication quantique de la stabilité des anneaux aromatiques, par des orbitales étendues à tout l'anneau.", context: "Linus Pauling développe à la même époque la résonance entre dessins de liaisons, l'approche de cette page." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      industrie: { name: "Une matière première de la chimie", text: "Plus de la moitié du benzène produit sert à faire de l'éthylbenzène, d'où l'on tire le styrène et le polystyrène ; environ 20\u00a0% donne le cumène, d'où viennent le phénol et l'acétone ; environ 10\u00a0% le cyclohexane, d'où viennent les fibres de nylon. Dans tous ces produits, l'anneau reste : c'est sa stabilité qui le fait passer intact d'une réaction à l'autre." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      dibromo: { prompt: "Pourquoi n'existe-t-il qu'un seul orthodibromobenzène ?",
        options: { a: "Parce que l'un des deux se transforme vite en l'autre.", b: "Parce que les bromes repoussent les doubles liaisons.", c: "Parce que l'une des deux dispositions est instable.", d: "Parce que l'état fondamental est un mélange à parts égales des deux dispositions : il n'y a qu'une molécule, pas deux." },
        why: "Dans l'état stationnaire le plus bas, les deux dispositions ont la même amplitude, 1/√2. Les deux dessins sont deux composantes d'un même état, pas deux molécules." },
      fondamental: { prompt: "De combien l'état fondamental est-il plus bas que chacune des deux dispositions ?",
        options: { a: "De A.", b: "De 2A.", c: "De A/2.", d: "Il est à la même énergie E₀." },
        why: "E_II = E₀ \u2212 A. L'écart 2A sépare l'état fondamental de l'état excité E₀ + A." },
      liaisons: { prompt: "Que prédit le modèle pour les longueurs des six liaisons carbone-carbone ?",
        options: { a: "Trois courtes et trois longues.", b: "Toutes égales à celle d'une liaison double.", c: "Toutes égales, entre celle d'une liaison simple et celle d'une double.", d: "Qu'elles changent sans cesse." },
        why: "Chaque liaison est double dans une disposition et simple dans l'autre, avec le même poids : les six sont équivalentes. Mesuré : 140\u00a0pm, entre 135 et 147\u00a0pm." },
      energie: { prompt: "L'hydrogénation du cyclohexène libère 120\u00a0kJ·mol⁻¹ et celle du benzène 208\u00a0kJ·mol⁻¹. Quel excès de stabilité en déduit-on ?",
        options: { a: "88\u00a0kJ·mol⁻¹.", b: "Environ 152\u00a0kJ·mol⁻¹, l'écart à 3 × 120.", c: "208\u00a0kJ·mol⁻¹.", d: "328\u00a0kJ·mol⁻¹." },
        why: "Trois doubles liaisons fixes libéreraient environ 360\u00a0kJ·mol⁻¹ ; le benzène en libère 152 de moins : c'est l'énergie gagnée par le mélange." },
      lambda: { prompt: "Avec A = 1,58\u00a0eV, à quelle longueur d'onde le modèle place-t-il l'absorption ?",
        options: { a: "Environ 390\u00a0nm.", b: "Environ 785\u00a0nm.", c: "Environ 255\u00a0nm.", d: "Environ 1,2\u00a0µm." },
        hint: "λ = hc/(2A), et hc ≈ 1\u00a0240\u00a0eV·nm.",
        why: "2A = 3,16\u00a0eV, λ = 1\u00a0240/3,16 ≈ 390\u00a0nm. Mesuré : 255\u00a0nm. Le modèle trouve l'état excité, pas sa place." },
      dissymetrie: { prompt: "Un substituant rend une disposition plus basse que l'autre d'un écart δ = 10 A. Que devient le gain de stabilité ?",
        options: { a: "Il double.", b: "Il reste égal à A.", c: "Il devient négatif.", d: "Il tombe à environ A²/δ = A/10 : le mélange ne stabilise que des dispositions d'énergies voisines." },
        why: "C'est (10.8) : deux états d'énergies très différentes ne sont repoussés que de A²/δ, et l'état fondamental est presque la disposition la plus basse seule." },
      limite: { prompt: "Pourquoi le modèle à deux états, pris seul, prédit-il que le benzène absorbe très peu la lumière qui mènerait à l'état excité ?",
        options: { a: "Parce que A est trop grand.", b: "Parce que les photons ultraviolets ne sont pas absorbés par les molécules.", c: "Parce que les deux états ont la même répartition de charge : le moment dipolaire de transition est nul.", d: "Parce que l'état excité n'existe pas." },
        why: "Une onde électromagnétique couple deux états par leur moment dipolaire de transition. Entre les deux mélanges symétrique et antisymétrique de dispositions de même charge, il est nul : le modèle ne suffit pas à décrire l'absorption." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 10, §10-4 (texte original en anglais). Enthalpies d'hydrogénation : cyclohexène \u2212120\u00a0kJ·mol⁻¹, benzène \u2212208\u00a0kJ·mol⁻¹. Longueurs des liaisons : 140, 135 et 147\u00a0pm ; maximum d'absorption du benzène : 255\u00a0nm. Usages : parts approximatives de la production de benzène. Calculs propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Le benzène par les particules indépendantes » (Feynman III.15.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/benzene-particules-independantes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Le benzène par les particules indépendantes",
    "crumb.jour": "Benzène",
    "h1": "Le benzène par les particules indépendantes",
    "lede": "Six atomes de carbone en anneau, et six électrons qui ne sont attachés à aucune liaison en particulier. Traitons chacun comme un électron seul qui saute d'atome en atome, comme dans un cristal refermé sur lui-même, puis rangeons-les deux par deux dans les niveaux : on obtient l'énergie de liaison du benzène et la couleur qu'il absorbe, presque.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'étape « Ondes de spin »",
    "eq.cos": "cos",
    "eq.fond": "fond",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Un cristal de six atomes",
    "s1.p1": "Dans le benzène, chaque carbone est lié à deux carbones voisins et à un hydrogène ; il lui reste un électron, l'électron π, qui peut sauter vers les carbones voisins. On néglige l'interaction entre ces six électrons : chacun voit l'anneau seul, avec une énergie <var>E</var><sub>0</sub> sur chaque carbone et une amplitude de saut i<var>A</var>/ℏ. C'est la chaîne de la leçon « Les états d'énergie définie dans un réseau », refermée en anneau, de pas <var>b</var> :",
    "val.15.25": "Approximation : électrons indépendants, plus proches voisins seulement, un état par carbone. Le plus discutable est l'indépendance : deux électrons sur le même carbone se repoussent fortement, et le modèle l'ignore.",
    "s1.p2": "Sur un anneau de <var>N</var> atomes, l'amplitude doit reprendre sa valeur après un tour : e<sup>i<var>k</var><var>N</var><var>b</var></sup> = 1. Seuls <var>N</var> nombres d'onde sont permis :",
    "val.15.27": "Exacte : c'est la condition de retour sur un anneau, <var>s</var> entier, avec <var>N</var> valeurs distinctes. Pour <var>N</var> = 6, les niveaux sont <var>E</var><sub>0</sub> \u2212 2<var>A</var>, <var>E</var><sub>0</sub> \u2212 <var>A</var> deux fois, <var>E</var><sub>0</sub> + <var>A</var> deux fois, <var>E</var><sub>0</sub> + 2<var>A</var>.",
    "s1.p3": "On range les six électrons dans les niveaux les plus bas, deux par niveau, de spins opposés, comme le veut le principe d'exclusion de la leçon « Les particules indépendantes » :",
    "val.15.28": "Approximation : celle de (15.25), et état fondamental à électrons indépendants ; l'énergie de répulsion entre électrons π est omise, et elle n'est pas petite. Le résultat se compare donc à l'expérience par la différence avec une molécule de référence, où l'erreur se retranche en partie.",
    "fig.aria": "Niveaux d'énergie des électrons π d'un anneau de carbones et leur remplissage",
    "fig.legend.niv": "niveaux E₀ \u2212 2A cos(2πs/N)",
    "fig.legend.el": "électrons, deux par niveau",
    "fig.niv": "{e} A",
    "fig.n": "Atomes dans l'anneau, N",
    "fig.e": "Électrons π",
    "fig.k.tot": "Énergie totale des électrons π",
    "fig.v.tot": "{n} E₀ + ({e}) A",
    "fig.f.tot": "écart aux doubles liaisons isolées, chaque électron à E₀ \u2212 A : {d} A",
    "fig.k.gap": "Première absorption, ℏω",
    "fig.v.gap": "{g} A",
    "fig.f.gap": "du dernier niveau occupé au premier vide",
    "fig.f.gap.nul": "un niveau à moitié rempli : pas de bande interdite",
    "fig.f.gap.aucun": "tout est vide, ou tout est plein",
    "fig.caption": "Énergies en unités de <var>A</var>, comptées depuis <var>E</var><sub>0</sub>. Le niveau du bas est seul, les autres vont par deux, sauf le plus haut quand <var>N</var> est pair. Six électrons sur six atomes remplissent exactement les trois premiers niveaux. Essayez quatre électrons sur quatre atomes : le dernier niveau est à moitié plein.",

    "s2.sec": "2 · Ce que le modèle explique",
    "s2.h2": "Une énergie de délocalisation",
    "s2.p1": "Trois doubles liaisons isolées, comme dans l'éthylène, auraient chacune deux électrons d'énergie <var>E</var><sub>0</sub> \u2212 <var>A</var>, soit 6(<var>E</var><sub>0</sub> \u2212 <var>A</var>) en tout. (15.28) donne 2<var>A</var> de moins : les électrons libres de parcourir l'anneau sont mieux liés. C'est la stabilité particulière du benzène, que la chimie appelle aromaticité. L'énergie de liaison mesurée donne <var>A</var> ≈ 0,8\u00a0eV.",
    "s2.p2": "Le modèle prévoit aussi la première absorption : un électron du niveau <var>E</var><sub>0</sub> \u2212 <var>A</var> monte au niveau <var>E</var><sub>0</sub> + <var>A</var>, ℏω = 2<var>A</var>. Mais l'ultraviolet absorbé par le benzène demande un <var>A</var> de 1,4 à 2,4\u00a0eV, deux à trois fois plus que la liaison. Le désaccord vient surtout de l'hypothèse d'indépendance : un électron excité modifie la répulsion qu'il exerce sur les autres. La leçon « La molécule de benzène à deux états » décrivait la même molécule par deux structures ; ici, on va jusqu'aux électrons.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Les chiffres du benzène",
    "s3.p1": "Deux mesures fixent <var>A</var> : l'énergie de liaison et le spectre d'absorption. Leur désaccord mesure ce que l'indépendance néglige.",
    "sys.title": "Le système décrit : une molécule de benzène",
    "sys1.body": "Avec <var>A</var> = 0,8\u00a0eV, l'énergie de délocalisation 2<var>A</var> vaut {kj}\u00a0kJ par mole de benzène.",
    "sys2.body": "Avec <var>A</var> = 0,8\u00a0eV, la première absorption ℏω = 2<var>A</var> tomberait à {l0}, à la limite du rouge et de l'infrarouge. Le maximum d'absorption mesuré est vers 255\u00a0nm, dans l'ultraviolet, soit ℏω ≈ 4,9\u00a0eV : il faudrait <var>A</var> ≈ 2,4\u00a0eV, trois fois plus.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "L'anneau du benzène",
    "hist.intro": "La structure du benzène a été une énigme de la chimie pendant un siècle.",
    "hist.events": {
      faraday: { who: "Michael Faraday", what: "isole le benzène du résidu huileux de la fabrication du gaz d'éclairage.", context: "Il l'appelle « bicarbure d'hydrogène »." },
      kekule: { who: "August Kekulé", what: "propose un anneau de six carbones aux liaisons simples et doubles alternées.", context: "Bulletin de la Société chimique de Paris, vol. 3. Le modèle de cette leçon remplace l'alternance par des électrons partagés par tout l'anneau." },
      lonsdale: { who: "Kathleen Lonsdale", what: "montre par diffraction des rayons X sur l'hexaméthylbenzène que l'anneau est un hexagone plan.", context: "Les six liaisons y sont égales, comme le veut un électron délocalisé." },
      huckel: { who: "Erich Hückel", what: "publie la méthode des orbitales moléculaires qui porte son nom : celle de cette leçon, électrons π indépendants sautant d'atome en atome.", context: "Elle reste longtemps peu reconnue, puis devient un outil de base de la chimie organique." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      estimation: { name: "La méthode de Hückel", text: "Les chimistes l'enseignent et s'en servent encore pour des estimations rapides de la liaison π : ses prévisions suivent les spectres ultraviolets et visibles, les spectres de photoélectrons et les chaleurs de combustion, au moins qualitativement." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      anneau: { prompt: "Pourquoi un anneau de N atomes n'admet-il que N nombres d'onde ?",
        options: { a: "Parce que l'électron ne peut pas faire le tour.", b: "Parce que l'amplitude doit reprendre sa valeur après un tour : e^(ikNb) = 1.", c: "Parce que k doit être nul.", d: "Parce que chaque atome a un seul électron." },
        why: "(15.27) : k = 2πs/(Nb), et s et s + N donnent le même état. N atomes, N niveaux." },
      niveaux: { prompt: "Quels sont les niveaux π du benzène dans ce modèle ?",
        options: { a: "Six niveaux égaux à E₀.", b: "E₀ ± A seulement.", c: "E₀ \u2212 6A à E₀ + 6A.", d: "E₀ \u2212 2A, E₀ \u2212 A (deux fois), E₀ + A (deux fois), E₀ + 2A." },
        why: "\u22122A cos(2πs/6) pour s = 0 à 5 : \u22122A, \u2212A, +A, +2A, +A, \u2212A." },
      delocalise: { prompt: "De combien l'énergie des électrons π du benzène est-elle plus basse que celle de trois doubles liaisons isolées ?",
        options: { a: "2A : 6E₀ \u2212 8A contre 6E₀ \u2212 6A.", b: "A.", c: "6A.", d: "Elle n'est pas plus basse." },
        why: "(15.28) : 2(E₀ \u2212 2A) + 4(E₀ \u2212 A) = 6E₀ \u2212 8A. Trois doubles liaisons : 6(E₀ \u2212 A)." },
      absorption: { prompt: "Quelle est la première absorption prévue par le modèle ?",
        options: { a: "A.", b: "4A.", c: "2A, du niveau E₀ \u2212 A au niveau E₀ + A.", d: "Aucune." },
        hint: "Du dernier niveau plein au premier vide.",
        why: "Les niveaux E₀ \u2212 A sont pleins, E₀ + A vides : ℏω = 2A. On attend aussi 3A et 4A plus haut." },
      desaccord: { prompt: "La liaison donne A ≈ 0,8 eV, le spectre de 1,4 à 2,4 eV. D'où vient l'écart ?",
        options: { a: "D'une erreur de mesure.", b: "Surtout de l'hypothèse d'électrons indépendants, qui ignore leur répulsion mutuelle.", c: "Des noyaux qui bougent.", d: "Du spin de l'électron." },
        why: "La répulsion entre électrons π n'est pas petite ; elle change différemment selon qu'on lie ou qu'on excite." },
      six: { prompt: "Pourquoi six électrons sur un anneau de six atomes donnent-ils une molécule particulièrement stable ?",
        options: { a: "Parce qu'ils remplissent exactement les trois niveaux les plus bas, et laissent un écart avant le premier niveau vide.", b: "Parce que six est un nombre pair.", c: "Parce que chaque électron reste sur son atome.", d: "Parce que l'énergie est nulle." },
        why: "Niveaux pleins, écart 2A avant le suivant : c'est une couche complète. Avec quatre électrons sur quatre atomes, au contraire, un niveau double reste à moitié vide." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 15, §15-4 (texte original en anglais). Notations SI. Faraday (1825) ; Kekulé, Bulletin de la Société chimique de Paris 3, 98 (1865) ; Lonsdale (1929) ; Hückel (1931). Maximum d'absorption du benzène : 255\u00a0nm. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

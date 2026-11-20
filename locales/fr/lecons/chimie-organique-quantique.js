/* Leçon « Davantage de chimie organique » (Feynman III.15.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/chimie-organique-quantique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Davantage de chimie organique",
    "crumb.jour": "Chimie organique",
    "h1": "Davantage de chimie organique",
    "lede": "La méthode qui a donné le benzène s'applique à toute molécule où des électrons π se partagent entre carbones : des chaînes ouvertes comme le butadiène, d'autres anneaux, et jusqu'au grand anneau de la chlorophylle. Elle explique pourquoi certaines molécules sont stables, et pourquoi les longues chaînes sont colorées.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le benzène par les particules indépendantes",

    "s1.sec": "1 · Une chaîne ouverte",
    "s1.h2": "Le butadiène",
    "s1.p1": "Le butadiène a quatre carbones en ligne, chacun avec un électron π. L'électron saute de voisin en voisin comme sur l'anneau de la leçon « Le benzène par les particules indépendantes », mais la chaîne a deux bouts. On imagine un carbone fictif de plus à chaque bout, où l'amplitude doit être nulle ; les ondes e<sup>±i<var>k</var><var>x</var></sup> se combinent en sinus qui s'annulent aux deux bouts, et seuls <var>N</var> nombres d'onde sont permis :",
    "val.15.29": "Exacte dans le modèle des plus proches voisins avec <var>E</var><sub>0</sub> égal sur tous les carbones, bouts compris ; en réalité, les carbones des bouts ont un environnement un peu différent, ce qui déplace leurs niveaux de l'ordre d'une fraction de <var>A</var>.",
    "s1.p2": "Pour <var>N</var> = 4, <var>k</var><var>b</var> = π/5, 2π/5, 3π/5, 4π/5, et les quatre électrons remplissent les deux niveaux les plus bas :",
    "val.15.31": "Approximation : celle de (15.25), électrons indépendants. Les nombres 1,618 et 0,618 sont 2 cos(π/5) et 2 cos(2π/5) ; le gain de 0,472<var>A</var> sur deux doubles liaisons isolées est la délocalisation du butadiène, quatre fois plus faible que celle du benzène.",
    "fig.aria": "Niveaux des électrons π d'une chaîne ouverte de carbones et leur remplissage",
    "fig.legend.niv": "niveaux E₀ \u2212 2A cos(πs/(N + 1))",
    "fig.legend.el": "électrons π, deux par niveau",
    "fig.niv": "{e} A",
    "fig.n": "Carbones dans la chaîne, N",
    "fig.a": "Amplitude de saut, A",
    "fig.k.gap": "Écart du dernier niveau plein au premier vide",
    "fig.v.gap": "{g} A",
    "fig.f.gap": "soit {e}",
    "fig.k.lambda": "Longueur d'onde de la première absorption",
    "fig.f.uv": "ultraviolet",
    "fig.f.vis": "visible : la molécule est colorée",
    "fig.f.ir": "infrarouge",
    "fig.caption": "Allongez la chaîne : les niveaux se resserrent, l'écart entre le dernier niveau plein et le premier vide diminue, et la première absorption glisse vers le rouge. Pour une chaîne très longue, l'écart tend vers zéro : c'est la bande d'un cristal à une dimension. Le modèle n'est que qualitatif ; la valeur de <var>A</var> qu'il faut pour les spectres n'est pas celle des énergies de liaison.",

    "s2.sec": "2 · D'autres anneaux",
    "s2.h2": "Les couches complètes sont stables",
    "s2.p1": "Sur un anneau, le niveau le plus bas est seul, les suivants vont par deux. Une molécule est particulièrement stable quand ses électrons π remplissent exactement des niveaux, sans en laisser un à moitié vide : 2, 6, 10 électrons. Un anneau de cinq carbones a cinq électrons π, un de trop pour remplir deux niveaux, un de moins pour en remplir trois ; avec un électron de plus, l'ion négatif, il en a six et ferme ses niveaux. Le modèle prévoit donc cet ion stable, ce que la chimie confirme. Un anneau de trois carbones, avec trois électrons, est au contraire peu stable.",
    "s2.p2": "La chlorophylle contient un grand anneau conjugué de vingt liaisons. Ses électrons π ont des niveaux serrés, et la première absorption tombe dans le visible : c'est la couleur de la molécule.",

    "s3.sec": "Décrire le système",
    "s3.h2": "L'écart en fonction de la taille",
    "s3.p1": "Le nombre qui compte est l'écart du dernier niveau plein au premier vide, en unités de <var>A</var>. Il dit la couleur et la stabilité.",
    "sys.title": "Le système décrit : chaînes de 4, 10 et 40 carbones ; anneau de 5",
    "sys1.body": "L'écart vaut {g4} <var>A</var> pour le butadiène, {g10} <var>A</var> pour une chaîne de 10 carbones, {g40} <var>A</var> pour 40 : il décroît à peu près comme 1/<var>N</var>.",
    "sys2.body": "Sur l'anneau de cinq carbones, six électrons laissent un écart de {g6} <var>A</var> avant le premier niveau vide ; cinq électrons laissent un niveau à moitié rempli, écart {g5} : la molécule neutre est réactive, l'ion négatif stable.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "La chlorophylle",
    "hist.intro": "Le grand anneau de la chlorophylle a été isolé, puis compris, puis fabriqué.",
    "hist.events": {
      caventou: { who: "Joseph Bienaimé Caventou et Pierre Joseph Pelletier", what: "isolent le pigment vert des feuilles et le nomment chlorophylle.", context: "Le magnésium au centre de l'anneau sera trouvé en 1906." },
      fischer: { who: "Hans Fischer", what: "établit la structure générale de la chlorophylle a.", context: "Un anneau conjugué qui délocalise ses électrons π, comme le benzène, mais bien plus grand." },
      woodward: { who: "Robert Burns Woodward", what: "publie la synthèse totale de la chlorophylle a.", context: "Le dernier détail de sa structure dans l'espace sera fixé en 1967." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      couleurs: { name: "La couleur des molécules conjuguées", text: "La chlorophylle a absorbe vers 430\u00a0nm et 662\u00a0nm, dans l'éther : le bleu et le rouge. Elle transmet le vert. Les chimistes relient ainsi la longueur d'un système conjugué à sa couleur, comme le fait ici le modèle des électrons π indépendants." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      bords: { prompt: "Qu'impose la chaîne ouverte aux amplitudes, par rapport à l'anneau ?",
        options: { a: "Qu'elles s'annulent sur un carbone fictif au-delà de chaque bout : des sinus, kb = πs/(N + 1).", b: "Qu'elles reprennent leur valeur après un tour.", c: "Qu'elles soient toutes égales.", d: "Rien de plus." },
        why: "L'électron ne peut pas aller au-delà des bouts : (15.29). Sur un anneau, c'est la condition de retour (15.27)." },
      butadiene: { prompt: "Quels niveaux occupent les quatre électrons π du butadiène ?",
        options: { a: "E₀ \u2212 2A et E₀.", b: "E₀ \u2212 A, quatre fois.", c: "E₀ \u2212 1,618A et E₀ \u2212 0,618A, deux électrons chacun.", d: "E₀ + 1,618A." },
        why: "2 cos(π/5) = 1,618 et 2 cos(2π/5) = 0,618 : les deux niveaux les plus bas, pleins. (15.31)." },
      longue: { prompt: "Pourquoi une longue chaîne conjuguée absorbe-t-elle à plus grande longueur d'onde qu'une courte ?",
        options: { a: "Parce qu'elle est plus lourde.", b: "Parce que ses niveaux se resserrent : l'écart entre dernier plein et premier vide diminue, à peu près comme 1/N.", c: "Parce qu'elle a moins d'électrons.", d: "Parce que A augmente." },
        why: "Plus de carbones, plus de niveaux dans la même bande de largeur 4A : l'écart diminue, la lumière absorbée rougit." },
      anion: { prompt: "Pourquoi l'anneau de cinq carbones est-il stable sous forme d'ion négatif ?",
        options: { a: "Parce que la charge négative attire les noyaux.", b: "Parce que cinq est impair.", c: "Parce que l'électron de plus reste hors de l'anneau.", d: "Parce qu'avec six électrons π, il remplit exactement ses trois niveaux les plus bas." },
        why: "Niveaux \u22122A, \u22120,618A (deux fois), +1,618A (deux fois) : six électrons ferment les deux premiers niveaux, comme dans le benzène." },
      trois: { prompt: "Combien d'électrons π faut-il pour remplir exactement des niveaux d'un anneau ?",
        options: { a: "2, 6, 10… : 2 pour le niveau du bas, puis 4 par paire de niveaux.", b: "N, toujours.", c: "Un nombre pair quelconque.", d: "4, 8, 12…" },
        why: "Un niveau seul, puis des niveaux doubles : 2 + 4n. C'est la règle de Hückel." },
      chlorophylle: { prompt: "La chlorophylle absorbe le bleu et le rouge. Qu'en dit le modèle ?",
        options: { a: "Rien : il ne s'applique qu'au benzène.", b: "Qu'elle devrait être incolore.", c: "Que son grand anneau conjugué a des niveaux serrés, et donc une première absorption dans le visible.", d: "Qu'elle absorbe les rayons X." },
        why: "Vingt liaisons conjuguées : l'écart, en unités de A, est bien plus petit que celui du benzène, et ℏω tombe dans le visible." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 15, §15-5 (texte original en anglais). Notations SI. Histoire de la chlorophylle : Pelletier et Caventou (1817), Fischer (1940), Woodward (1960) ; absorption de la chlorophylle a dans l'éther : 430 et 662\u00a0nm. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

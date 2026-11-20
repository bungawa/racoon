/* Leçon « Des filtres de Stern et Gerlach en série » (Feynman III.5.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/filtres-stern-gerlach-serie.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Des filtres de Stern et Gerlach en série",
    "crumb.jour": "Filtres en série",
    "h1": "Des filtres de Stern et Gerlach en série",
    "lede": "Trois filtres à la suite : S, puis T tourné, puis de nouveau S. Les atomes qui sortent de T ont-ils gardé la mémoire de ce que S leur avait fait ? Non. Un filtre qui ne laisse passer qu'un état efface tout ce qui précède, et c'est ce qui rend la physique quantique calculable.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : expériences avec des atomes filtrés",

    "s1.sec": "Décrire le système",
    "s1.h2": "Trois appareils, une question",
    "s1.p1": "Un four envoie des atomes de spin 1 au hasard. Un premier appareil <var>S</var> ne laisse passer que la voie +<var>S</var>. Un deuxième, <var>T</var>, tourné de α autour de l'axe <var>y</var> du jet, ne laisse passer que 0<var>T</var>. Un troisième, <var>S</var>′, orienté comme <var>S</var>, ne laisse passer que +<var>S</var>. Tous sont des appareils idéaux, sans perte, dans le vide, sans champ parasite entre eux. Les atomes qui sortent de <var>T</var> sont tous dans l'état 0<var>T</var>. Beaucoup d'entre eux étaient +<var>S</var> une fraction de seconde plus tôt : vont-ils, plus volontiers que d'autres, repasser par la voie +<var>S</var> de <var>S</var>′ ?",
    "s1.p2": "Pour le savoir, on refait l'expérience en changeant seulement le premier filtre : il laisse passer 0<var>S</var> au lieu de +<var>S</var>. Le nombre d'atomes qui traverse <var>T</var> change, puisque les amplitudes ⟨0<var>T</var>|+<var>S</var>⟩ et ⟨0<var>T</var>|0<var>S</var>⟩ diffèrent en général. La question porte sur le rapport : parmi les atomes sortis de <var>T</var>, quelle fraction passe <var>S</var>′ ?",

    "s2.sec": "L'expérience",
    "s2.h2": "Changer le premier filtre ne change rien à la fin",
    "s2.p1": "Les barres donnent la fraction du faisceau du four qui reste après chaque appareil. Choisissez les voies ouvertes des trois filtres et l'angle de <var>T</var>. La dernière ligne refait le calcul pour chacun des trois états que le premier filtre pourrait laisser passer, et compare les rapports.",
    "fig.aria.barres": "Fraction du faisceau du four restant après chacun des trois filtres",
    "fig.fs": "Premier filtre S : voies ouvertes",
    "fig.ft": "Filtre T, tourné : voies ouvertes",
    "fig.fs2": "Dernier filtre S′ : voies ouvertes",
    "fig.b.plus": "+",
    "fig.b.zero": "0",
    "fig.b.moins": "\u2212",
    "fig.alpha": "Angle de T autour de y, α",
    "fig.etage.0": "four",
    "fig.etage.1": "après S",
    "fig.etage.2": "après T",
    "fig.etage.3": "après S′",
    "fig.k.n": "Fraction qui sort de <var>S</var>′",
    "fig.f.n": "après S : {a} ; après T : {b}",
    "fig.k.rapport": "<var>N</var><sub>3</sub>/<var>N</var><sub>2</sub>",
    "fig.f.rapport": "parmi les atomes sortis de T, ceux qui passent S′",
    "fig.k.memoire": "Mémoire du premier filtre",
    "fig.mem.oui": "gardée",
    "fig.mem.non": "effacée",
    "fig.f.mem": "rapport si le premier filtre passe +, 0 ou \u2212 : {v}",
    "fig.caption": "Avec une seule voie ouverte dans <var>T</var>, le rapport <var>N</var><sub>3</sub>/<var>N</var><sub>2</sub> est le même quel que soit le premier filtre : la mémoire est effacée. Ouvrez deux voies de <var>T</var> : le rapport dépend alors du premier filtre, parce que les atomes sortent de <var>T</var> dans un état qui n'est plus un état de base de <var>T</var>. À α ≈ 54,7°, le tiers des atomes sortis de 0<var>T</var> passe +<var>S</var>′, et aussi le tiers passe 0<var>S</var>′.",
    "s2.p2": "Les atomes qui sortent d'un filtre à une seule voie sont tous dans le même état, et rien en eux ne dit d'où ils viennent. Ce qui leur arrive ensuite dépend de cet état et des appareils qui suivent, de rien d'autre. Le premier filtre ne règle que leur nombre.",

    "s3.sec": "La loi",
    "s3.h2": "Un rapport qui ne dépend que des deux derniers appareils",
    "s3.p1": "Si <var>T</var> ne laisse passer que l'état <var>i</var><var>T</var>, les atomes qui en sortent, <var>N</var><sub>2</sub>, sont dans cet état. Ceux qui passent ensuite la voie <var>k</var> de <var>S</var>′, <var>N</var><sub>3</sub>, sont dans la proportion :",
    "val.rapport": "Exacte pour un filtre <var>T</var> idéal qui ne laisse passer qu'un état de base, et des atomes libres entre <var>T</var> et <var>S</var>′. Fausse dès que <var>T</var> laisse passer deux voies ou plus : les atomes sortent alors dans une superposition, dont la composition dépend de l'état d'entrée, et le rapport en dépend aussi. Elle cesse aussi de valoir si <var>T</var> arrête seulement une partie d'une voie, par exemple sur ses bords : il faut alors une amplitude de plus.",
    "s3.p2": "Cette proportion contient l'amplitude d'aller de l'état <var>i</var><var>T</var> à l'état <var>k</var><var>S</var>, et rien d'autre. Elle serait la même avec un troisième appareil <var>R</var> d'orientation quelconque à la place de <var>S</var>′, avec son amplitude ⟨<var>k</var><var>R</var>|<var>i</var><var>T</var>⟩. Ce que fait le premier filtre ne compte que par le nombre d'atomes qu'il laisse arriver dans <var>T</var>. « Les états de base » fait de cette observation une définition.",
    "sys.title": "Le système décrit : un angle choisi",
    "sys1.body": "Pour α = {a}°, cos<sup>2</sup> α = 1/3. Alors |⟨0<var>T</var>|+<var>S</var>⟩|<sup>2</sup> = {b} et |⟨0<var>T</var>|0<var>S</var>⟩|<sup>2</sup> = {c} : <var>T</var> reçoit autant d'atomes, que le premier filtre passe +<var>S</var> ou 0<var>S</var>. Les deux expériences ne se distinguent plus du tout à la sortie de <var>T</var> : ni par le nombre, ni par la suite. À un autre angle, les nombres diffèrent, mais le rapport <var>N</var><sub>3</sub>/<var>N</var><sub>2</sub> reste le même.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Une mesure qui efface : de l'énigme à la cryptographie",
    "hist.intro": "Qu'un filtre efface l'état précédent a d'abord paru une limite. C'est devenu une garantie : un espion qui mesure dans la mauvaise base efface ce qu'il cherche à lire, et laisse une trace.",
    "hist.events": {
      wiesner: { who: "Stephen Wiesner", what: "publie « Conjugate Coding », l'idée de coder une information dans deux bases incompatibles.", context: "Écrit au début des années 1970 à l'université Columbia, l'article est d'abord refusé par une revue de théorie de l'information. Il paraît en 1983 dans un bulletin d'informatique théorique." },
      bb84: { who: "Charles Bennett et Gilles Brassard", what: "proposent le protocole BB84 de distribution quantique de clé.", context: "L'émetteur envoie des états préparés dans l'une de deux bases, au hasard. Un espion qui mesure dans la mauvaise base perturbe l'état une fois sur deux : il ne peut lire sans être vu." },
      vienne: { who: "Un projet de recherche européen", what: "met en service à Vienne un réseau informatique protégé par distribution quantique de clé.", context: "En octobre 2008, 200\u00a0km de fibre relient six sites entre Vienne et Sankt Pölten." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      reseau: { name: "Réseaux de distribution quantique de clé", text: "Depuis octobre 2017, une ligne de fibre de 2\u00a0000\u00a0km relie Pékin, Jinan, Hefei et Shanghai par distribution quantique de clé ; à Genève, une entreprise en vend des systèmes clés en main. Le principe est celui de cette leçon : mesurer dans une base efface l'information gardée dans une autre." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      memoire: { prompt: "Des atomes sortent d'un filtre T qui ne laisse passer que 0T. Que reste-t-il, en eux, de l'état qu'ils avaient avant T ?",
        options: { a: "Une faible tendance à retourner dans leur ancien état.", b: "Leur ancienne phase, qui se manifestera dans un interféromètre.", c: "Rien : ils sont tous dans l'état 0T, et seul leur nombre dépend de ce qui précède.", d: "Tout, car l'évolution quantique est réversible." },
        why: "Un filtre à une voie prépare un état de base. Tous les atomes qui en sortent sont identiques ; le passé ne compte que par le nombre d'atomes qui ont passé." },
      tiers: { prompt: "On remplace le premier filtre +S par un filtre 0S. Le nombre d'atomes qui passe T (0T) change. Et le rapport N₃/N₂ à la sortie de S′ ?",
        options: { a: "Il ne change pas : il vaut |⟨kS′|0T⟩|².", b: "Il change dans le même rapport que N₂.", c: "Il double.", d: "Il devient nul." },
        why: "Le rapport ne dépend que de T et de S′, pas du premier filtre. À α ≈ 54,7° et pour la voie +S′, il vaut un tiers dans les deux cas." },
      nombre: { prompt: "Quel est le rôle du premier filtre S dans la chaîne S, T, S′ ?",
        options: { a: "Il fixe la direction du spin à la sortie de S′.", b: "Il n'a aucun rôle.", c: "Il fixe le rapport N₃/N₂.", d: "Il fixe le nombre d'atomes qui arrivent à T et passent T, pas ce qui leur arrive après." },
        why: "N₂ = N₁ |⟨0T|jS⟩|² dépend du premier filtre ; N₃/N₂ non. Le premier filtre agit sur le nombre seulement." },
      deuxvoies: { prompt: "Le filtre T laisse passer deux voies, +T et 0T. Le rapport N₃/N₂ dépend-il encore du premier filtre ?",
        options: { a: "Non, jamais.", b: "Oui : les atomes sortent dans une superposition de +T et 0T dont les poids et la phase relative dépendent de l'état d'entrée.", c: "Non, car chaque atome passe par une seule voie.", d: "Oui, mais seulement si α = 0." },
        why: "Avec deux voies ouvertes, les amplitudes des deux voies se recombinent ; leur rapport vient de l'état d'entrée. La mémoire n'est effacée que par un filtre qui ne laisse passer qu'un état de base." },
      ordre: { prompt: "On permute T et S′ : le faisceau +S traverse d'abord S′ (+S), puis T (0T). Combien sortent, sur N atomes +S ?",
        options: { a: "Autant que dans l'ordre S, T, S′.", b: "Aucun.", c: "N |⟨0T|+S⟩|², car S′ laisse passer tous les atomes +S.", d: "N/3." },
        hint: "Un atome +S traverse toujours un filtre +S de même orientation.",
        why: "S′ (+S) ne fait rien à un faisceau +S ; reste T, qui en laisse passer |⟨0T|+S⟩|². Dans l'ordre S, T, S′, il faut multiplier en plus par |⟨+S|0T⟩|² : l'ordre des filtres compte." },
      rapport: { prompt: "À la sortie de T (0T), on place un appareil R d'orientation quelconque, voie kR ouverte. De quoi dépend la fraction qui passe ?",
        options: { a: "De ⟨kR|0T⟩ seulement.", b: "De l'orientation de S et de R.", c: "De l'histoire de chaque atome dans le four.", d: "De la vitesse des atomes." },
        why: "La fraction vaut |⟨kR|0T⟩|² : l'état de départ de R est 0T, quel que soit le passé. Pour des appareils idéaux, la vitesse n'y entre pas." },
      cle: { prompt: "Pourquoi un espion qui intercepte des atomes préparés en +S ou en 0T, sans savoir lequel, se trahit-il ?",
        options: { a: "Parce que mesurer un atome le détruit.", b: "Parce que mesurer dans la base S un atome préparé en 0T le projette sur un état de S : renvoyé ensuite, il n'est plus en 0T, et le destinataire trouve des erreurs.", c: "Parce que les atomes portent un numéro.", d: "Parce que l'espion ne peut pas construire d'appareil S." },
        why: "Le filtre de l'espion efface l'état préparé. L'atome qu'il renvoie est dans un état de sa base, pas dans celle de l'émetteur : une part des résultats du destinataire change. C'est le principe de BB84." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 5, §5-3 (texte original en anglais). Notations SI. Wiesner (1983) ; Bennett et Brassard (1984). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

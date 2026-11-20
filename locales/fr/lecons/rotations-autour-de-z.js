/* Leçon « Les rotations autour de l'axe z » (Feynman III.6.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/rotations-autour-de-z.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les rotations autour de l'axe z",
    "crumb.jour": "Rotations autour de z",
    "h1": "Les rotations autour de l'axe z",
    "lede": "Tourner un appareil autour de son propre champ ne change pas les voies : seulement les phases des deux amplitudes. Ces phases tournent deux fois moins vite que l'appareil. Après un tour complet, l'état de spin 1/2 a changé de signe, et une expérience sur des neutrons l'a vu.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la transformation vers un repère tourné",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un appareil tourné autour de son champ",
    "s1.p1": "L'appareil <var>T</var> est l'appareil <var>S</var> tourné d'un angle φ autour de l'axe <var>z</var>, celui de son champ. Une particule qui passe la voie +<var>S</var> passe la voie +<var>T</var> : les deux appareils trient de la même façon. Les modules des amplitudes ne changent donc pas ; leurs phases le peuvent. Avec la forme standard de « La transformation vers un repère tourné », de déterminant 1, les deux phases sont opposées :",
    "val.6.16": "Exacte pour des appareils idéaux, à un signe près permis par la forme standard. Les modules sont égaux parce que la probabilité de passer +<var>T</var> est 1 pour une particule +<var>S</var>. On suppose l'espace isotrope : rien, autour de l'axe <var>z</var>, ne distingue une direction, pas même un champ parasite transverse.",
    "s1.p2": "La phase λ ne dépend que de φ. Deux rotations successives de φ<sub>1</sub> et φ<sub>2</sub> donnent la rotation de φ<sub>1</sub> + φ<sub>2</sub>, et leurs matrices se multiplient : les phases s'ajoutent. Une fonction continue qui ajoute ce qu'on ajoute est proportionnelle à l'angle, λ = <var>m</var>φ :",
    "val.6.17": "Exacte, si λ est une fonction continue de φ, ce qu'on suppose : une rotation infime ne change l'état qu'infiniment peu. <var>m</var> est un nombre fixe, le même pour toutes les rotations autour de <var>z</var> ; reste à le trouver.",

    "s2.sec": "Le tour complet",
    "s2.h2": "Un signe moins après 360°",
    "s2.p1": "Un appareil tourné de 360° est le même appareil. Ses amplitudes doivent décrire le même état physique : elles ne peuvent différer que par une phase commune. Il faut donc e<sup>2π<var>i</var><var>m</var></sup> = e<sup>\u22122π<var>i</var><var>m</var></sup>, soit <var>m</var> entier ou demi-entier. Si <var>m</var> valait 1, une rotation de 180° donnerait déjà une phase commune, \u22121 sur les deux amplitudes : elle ne changerait rien. Or une particule dont le spin est le long de <var>x</var> l'a, après un demi-tour, le long de \u2212<var>x</var>. Une valeur plus grande, 3/2 par exemple, donnerait une phase commune dès 120°. Pour deux états, la seule valeur qui convient est <var>m</var> = 1/2. Après un tour complet :",
    "val.6.18": "Exacte, dans la forme standard. Le signe moins est une phase commune : aucune mesure faite avec la seule particule tournée ne le voit. Il devient visible quand on compare, dans un interféromètre, une partie tournée et une partie non tournée de la même onde. Il faut 720° pour retrouver les amplitudes de départ.",
    "s2.p2": "La matrice d'une rotation quelconque autour de <var>z</var> s'en déduit :",
    "val.6.19": "Exacte pour un spin 1/2, dans la forme standard, à un signe près : changer φ en φ + 360° change la matrice en son opposé. Le spin 1 avait <var>m</var> = 1, et ses phases tournaient comme l'appareil : (5.39). Un spin <var>j</var> a des phases e<sup><var>i</var><var>m</var>φ</sup> avec <var>m</var> de \u2212<var>j</var> à <var>j</var>.",
    "s2.p3": "Ce demi-angle est la signature du spin 1/2. Il ne se voit pas dans une probabilité, qui dépend de |C<sub>+</sub>|<sup>2</sup> et |C<sub>\u2212</sub>|<sup>2</sup> et des phases relatives. Il se voit dans une interférence entre deux voies dont une seule a tourné.",

    "s3.sec": "L'expérience",
    "s3.h2": "Un interféromètre dont une voie tourne",
    "s3.p1": "Un faisceau de neutrons se partage en deux voies, puis se recombine. Dans l'une, un champ magnétique selon <var>z</var> fait tourner le spin d'un angle φ : c'est l'effet d'un appareil tourné. Le détecteur compte |1 + e<sup><var>i</var>φ/2</sup>|<sup>2</sup>/4 des neutrons pour chacune des deux composantes. La courbe en tirets est ce qu'on aurait avec des phases qui tournent comme l'appareil, e<sup><var>i</var>φ</sup>, celles du spin 1 dans sa voie +.",
    "fig.aria.franges": "Fraction des neutrons comptés en fonction de l'angle de rotation dans une voie de l'interféromètre",
    "fig.legend.demi": "spin 1/2 : e^(iφ/2), période 720°",
    "fig.legend.un": "phase e^(iφ), période 360°",
    "fig.phi": "Rotation dans une voie, φ",
    "fig.ax.phi": "angle de rotation φ (°)",
    "fig.ax.n": "fraction comptée",
    "fig.k.amp": "C′<sub>+</sub>/C<sub>+</sub> = e<sup><var>i</var>φ/2</sup>",
    "fig.k.demi": "Comptage, spin 1/2",
    "fig.f.demi": "cos<sup>2</sup>(φ/4)",
    "fig.k.un": "Comptage, phase e<sup><var>i</var>φ</sup>",
    "fig.caption": "À φ = 360°, la voie tournée a changé de signe et le comptage tombe à zéro : les deux voies se détruisent. Il faut 720° pour revenir au maximum. Avec une phase qui tournerait comme l'appareil, on serait déjà revenu au maximum à 360°.",
    "s3.p2": "Un tour complet ne laisse pas le neutron « inchangé » : il laisse sa probabilité inchangée et son amplitude opposée. L'interféromètre compare l'amplitude à elle-même, sans tour, et le signe devient un comptage.",
    "sys.title": "Le système décrit : des neutrons de Grenoble",
    "sys1.body": "Au réacteur de l'Institut Laue-Langevin, à Grenoble, la période mesurée correspond à un angle de 704 ± 38° pour le retour au maximum. La prédiction, 720°, en est à {z} écart type : l'accord est bon. L'angle de 360°, qu'on attendrait si l'état revenait à lui-même après un tour, en est à 9 écarts types.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Voir le signe moins",
    "hist.intro": "Le changement de signe après un tour était dans la théorie dès 1927 ; il a fallu près de cinquante ans et des interféromètres à neutrons pour le mesurer.",
    "hist.events": {
      pauli: { who: "Wolfgang Pauli", what: "décrit le spin de l'électron par une fonction d'onde à deux composantes.", context: "Ces deux composantes changent de signe dans une rotation de 360° : c'est l'objet que les mathématiciens appellent un spineur." },
      rauch: { who: "Helmut Rauch, Anton Zeilinger et leurs collègues", what: "publient « Verification of Coherent Spinor Rotation of Fermions » dans Physics Letters.", context: "L'expérience, faite au réacteur à haut flux de l'Institut Laue-Langevin à Grenoble, mesure 704 ± 38° pour la rotation qui ramène l'interférence à son état initial." },
      werner: { who: "Samuel Werner, Roberto Colella, Albert Overhauser et Carl Eagen", what: "observent, dans Physical Review Letters, le changement de signe d'une onde de neutron après une précession de 360°.", context: "Le faisceau, de longueur d'onde 0,1445\u00a0nm, traverse un champ magnétique transverse sur 2\u00a0cm dans une des deux voies, au réacteur de l'université du Michigan." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      echo: { name: "Écho de spin de neutrons", text: "Inventée par Ferenc Mezei dans les années 1970, la méthode fait tourner le spin des neutrons dans un champ avant et après un échantillon. L'angle de rotation code la vitesse de chaque neutron ; s'il n'est pas exactement compensé, l'échantillon a changé la vitesse. On mesure ainsi les mouvements lents des polymères et des protéines, jusqu'à des centaines de nanosecondes." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      module: { prompt: "Pourquoi une rotation autour de z ne change-t-elle pas |C₊| et |C₋| ?",
        options: { a: "Parce que l'appareil tourné autour de son champ trie de la même façon : une particule +S passe +T.", b: "Parce que les amplitudes sont réelles.", c: "Parce que la rotation est petite.", d: "Parce que le champ est nul." },
        why: "La probabilité de passer +T pour une particule +S est 1 : les voies sont les mêmes. Seules les phases peuvent changer." },
      lineaire: { prompt: "Pourquoi la phase λ est-elle proportionnelle à l'angle φ ?",
        options: { a: "Par hypothèse arbitraire.", b: "Parce que le champ est uniforme.", c: "Parce que deux rotations successives ajoutent leurs angles et multiplient leurs matrices, donc ajoutent leurs phases ; avec la continuité, λ = mφ.", d: "Parce que λ est petit." },
        why: "λ(φ₁ + φ₂) = λ(φ₁) + λ(φ₂) et λ continue : la seule solution est linéaire, (6.17)." },
      demi: { prompt: "Pourquoi m = 1/2 et pas m = 1 pour un spin 1/2 ?",
        options: { a: "Parce que m = 1 est réservé au photon.", b: "Avec m = 1, un demi-tour multiplierait les deux amplitudes par \u22121, une phase commune : il ne changerait rien, alors qu'un spin le long de x passe le long de \u2212x.", c: "Parce que l'expérience donne 1/2 à 10 % près.", d: "Pour que le déterminant vaille 1." },
        why: "Le raisonnement est géométrique : seule m = 1/2 fait du tour complet, et non du demi-tour, la première rotation qui ne change rien de physique." },
      tour: { prompt: "Un électron est tourné de 360°. Que deviennent les probabilités de tous les résultats possibles ?",
        options: { a: "Elles changent de signe.", b: "Elles s'annulent.", c: "Elles sont échangées entre + et \u2212.", d: "Elles restent les mêmes : seule l'amplitude change de signe, une phase commune." },
        why: "C₊ et C₋ deviennent \u2212C₊ et \u2212C₋ : toute amplitude est multipliée par \u22121, toute probabilité inchangée." },
      mesure: { prompt: "Comment le signe moins après 360° a-t-il été mesuré ?",
        options: { a: "En faisant interférer une voie dont le spin a tourné avec une voie qui n'a pas tourné, dans un interféromètre à neutrons.", b: "En mesurant la probabilité de passer +S après rotation.", c: "En pesant les neutrons.", d: "Il ne peut pas l'être." },
        why: "Le signe est une phase relative entre les deux voies : il éteint l'interférence à 360°. Rauch et al., Werner et al., 1975." },
      un: { prompt: "Pour une particule de spin 1, comment varie la phase de C₊ avec la rotation φ autour de z ?",
        options: { a: "Comme e^iφ/2.", b: "Elle ne varie pas.", c: "Comme e^iφ : m = 1, et un tour la ramène.", d: "Comme e^2iφ." },
        why: "(5.39) : e^iβ, 1, e^\u2212iβ. Le spin 1 a des phases qui tournent comme l'appareil ; le spin 1/2, deux fois moins vite." },
      deux: { prompt: "Rauch et al. mesurent 704 ± 38° pour la période. Que vaut l'écart normalisé à la prédiction de 360° ?",
        options: { a: "0,4.", b: "1.", c: "4.", d: "Environ 9 : 360° est exclu." },
        hint: "z = |mesure \u2212 prédiction| / incertitude.",
        why: "(704 \u2212 360)/38 ≈ 9 : exclu. Pour 720°, (720 \u2212 704)/38 ≈ 0,4 : compatible." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 6, §6-3 (texte original en anglais). Notations SI. Rauch, Zeilinger, Badurek, Wilfing, Bauspiess et Bonse, Physics Letters, vol. 54A (1975) ; Werner, Colella, Overhauser et Eagen, Physical Review Letters, vol. 35 (1975). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

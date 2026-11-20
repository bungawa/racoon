/* Leçon « Symétrie dans l'espace et dans le temps » (Feynman I.52.2) : textes en français. Une autre langue = locales/<langue>/lecons/symetrie-dans-l-espace-et-dans-le-temps.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Symétrie dans l'espace et dans le temps",
    "crumb.jour": "Espace et temps",
    "h1": "Symétrie dans l'espace et dans le temps",
    "lede": "Les lois ne changent ni d'un lieu à l'autre, ni d'un jour à l'autre, ni d'une direction à l'autre, ni d'un référentiel en translation uniforme à un autre. Elles changent quand on agrandit l'appareil, et une rotation continue se détecte de l'intérieur. Chaque cas se chiffre.",
    "tag.piste": "Fondements et outils",
    "tag.prereq": "Prérequis : opérations de symétrie",
    "eq.T": "T",
    "eq.sin": "sin",

    "s1.sec": "1 · Ailleurs, plus tard, tourné",
    "s1.h2": "Déplacer l'appareil, et ce qui agit sur lui",
    "s1.p1": "Un appareil construit ici et le même construit ailleurs fonctionnent de la même façon, si l'on déplace avec lui tout ce qui agit sur lui. Une boussole ne s'oriente pas de la même façon à Paris et au pôle magnétique : le champ magnétique terrestre n'a pas été déplacé avec elle. Ce n'est pas une exception à la symétrie : c'est une partie de l'expérience restée en place.",
    "s1.p2": "Décrire le système dit ce qu'on peut laisser en place. Un laboratoire monté de <var>h</var> sur une tour voit une pesanteur un peu plus faible :",
    "s1.p3": "Sur une hauteur de 10\u00a0m, l'écart relatif est {dg} : invisible pour un chronométrage de chute, mesuré par un gravimètre. Le décalage dans le temps se traite de même : un appareil lancé jeudi à 10\u00a0h et le même lancé trois jours plus tard, dans le même état, se comportent de la même façon. Et la rotation : on tourne l'appareil, la Terre avec lui si elle agit, et rien ne change.",

    "s2.sec": "2 · En mouvement",
    "s2.h2": "Une vitesse uniforme ne se voit pas ; une rotation, si",
    "s2.p1": "Dans une voiture qui roule à vitesse constante sur une route droite, une balle lancée en l'air retombe dans la main. Les lois ne changent pas quand on passe à un référentiel en translation uniforme : pour Galilée, puis pour Einstein, avec la transformation de Lorentz. C'est la relativité qui a fait de cette symétrie un principe, et de la recherche des symétries une méthode.",
    "s2.p2": "Un référentiel qui tourne n'est pas équivalent. Dans un vaisseau spatial en rotation, une bille lâchée part vers la paroi : c'est l'effet centrifuge, et la force de Coriolis dévie tout ce qui se déplace. Sans regarder dehors, on mesure la rotation. Le pendule de Foucault le fait pour la Terre : son plan d'oscillation tourne, par rapport au sol, à la vitesse angulaire",
    "s2.p3": "avec Ω la vitesse de rotation de la Terre par rapport aux étoiles et λ la latitude. À 45° de latitude, le plan fait un tour en {T}. Au pôle, en un jour sidéral ; à l'équateur, il ne tourne pas.",

    "s3.sec": "3 · Changer d'échelle",
    "s3.h2": "Deux fois plus grand n'est pas deux fois la même chose",
    "s3.p1": "Agrandissons une structure dans le rapport <var>k</var>, sans changer sa forme ni sa matière. Son poids croît comme son volume, <var>k</var>³. La section qui le porte croît comme <var>k</var>². La contrainte, le poids par unité de section, croît comme <var>k</var>. Pour un prisme droit de hauteur <var>h</var>, la contrainte au pied vaut :",
    "s3.p2": "Galilée l'a vu le premier : un os d'un animal dix fois plus grand doit être plus que dix fois plus épais pour porter son poids. Une cathédrale en allumettes, agrandie à la taille d'une vraie, s'écraserait. Les lois ne sont pas symétriques par changement d'échelle, parce que la matière ne l'est pas : un atome a une taille fixée par les constantes de la nature, le rayon de Bohr <var>a</var><sub>0</sub> = 4πε<sub>0</sub>ħ²/(<var>m</var><sub>e</sub><var>e</var>²) = {a0}. Un appareil agrandi n'est pas fait d'atomes agrandis.",
    "col.aria": "Contrainte au pied d'une colonne de béton armé en fonction de sa hauteur, en échelles logarithmiques, et la résistance caractéristique du béton",
    "col.h": "Hauteur de la colonne",
    "col.x": "hauteur h (m)",
    "col.y": "contrainte au pied (Pa)",
    "col.legend.sigma": "σ = γ h",
    "col.legend.f": "résistance caractéristique f_ck",
    "col.k.sigma": "Contrainte au pied",
    "col.k.ratio": "Rapport à la résistance",
    "col.f.sigma": "γ = 25\u00a0kN·m⁻³",
    "col.f.ratio": "tient tant que le rapport reste sous 1",
    "col.caption": "Béton armé de classe C25/30 : résistance caractéristique en compression <var>f</var><sub>ck</sub> = 25\u00a0MPa, poids volumique γ = 25\u00a0kN·m⁻³. La colonne s'écrase sous son propre poids à <var>h</var> = <var>f</var><sub>ck</sub>/γ = 1\u00a0000\u00a0m, quelle que soit sa section. Une maquette de 1\u00a0m porte mille fois son poids ; la vraie, à la même forme et mille fois plus grande, ne porte que le sien. Le calcul de structure réel divise encore <var>f</var><sub>ck</sub> par un coefficient de sécurité.",

    "s4.sec": "4 · Le sens du temps",
    "s4.h2": "Un film à l'envers",
    "s4.p1": "Un œuf qui tombe et se casse, filmé, puis passé à l'envers : personne ne s'y trompe. À notre échelle, les phénomènes sont irréversibles. Mais les mouvements des atomes, pris un par un, obéissent à des lois qui restent les mêmes quand on renverse le temps, à la seule exception connue des interactions faibles. L'irréversibilité vient du nombre : un état ordonné évolue vers l'un des innombrables états désordonnés, et le chemin inverse est d'une improbabilité écrasante. Dans « Opérations de symétrie », le frottement de l'air résume ce désordre : c'est lui qui fait échouer le renversement du temps.",

    "val.g": "Approximation : Terre sphérique à symétrie sphérique, <var>h</var> ≪ <var>R</var><sub>T</sub> ; le terme suivant est en 3(<var>h</var>/<var>R</var><sub>T</sub>)², 7\u00a0×\u00a010⁻⁶ à 10\u00a0km.",
    "val.sigma": "Exacte pour un prisme droit de section constante sous son seul poids, <var>g</var> uniforme sur <var>h</var> (à 2<var>h</var>/<var>R</var><sub>T</sub> près, 3\u00a0×\u00a010⁻⁴ pour 1\u00a0000\u00a0m). Ce qui est approché : la résistance du matériau, valeur caractéristique d'une loi statistique, et le flambement, qui arrête une colonne élancée bien avant l'écrasement.",
    "val.foucault": "Approximation : premier ordre en Ω/ω<sub>p</sub>, avec ω<sub>p</sub> la pulsation du pendule, 2\u00a0×\u00a010⁻⁴ pour un pendule de 67\u00a0m ; petites oscillations ; pas de frottement ni de dissymétrie de suspension qui fasse tourner le plan de lui-même. Ω est mesurée par rapport aux étoiles, pas au Soleil.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "L'échelle, le mouvement uniforme, la rotation",
    "hist.intro": "Chaque symétrie de cette page, ou son absence, a eu son expérience ou son raisonnement décisif.",
    "hist.events": {
      galilee: { who: "Galileo Galilei", what: "publie à Leyde, chez Elzevier, les « Discours sur deux sciences nouvelles ».", context: "La deuxième journée traite de la résistance des matériaux : les os des grands animaux doivent être proportionnellement plus épais. Il en tire qu'on ne peut agrandir à volonté ni une machine ni un animal." },
      foucault: { who: "Léon Foucault", what: "montre la rotation de la Terre, le 3 février, avec un pendule, dans la salle méridienne de l'Observatoire de Paris.", context: "En mars, il répète l'expérience en public au Panthéon : une boule de 28\u00a0kg au bout d'un fil de 67\u00a0m." },
      einstein: { who: "Albert Einstein", what: "envoie aux Annalen der Physik « Sur l'électrodynamique des corps en mouvement », reçu le 30 juin.", context: "Le principe de relativité, l'équivalence des référentiels en translation uniforme, y devient le point de départ ; la transformation de Lorentz en découle." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      bassin: { name: "Les bassins d'essais de carènes", text: "Puisque les lois ne sont pas symétriques par changement d'échelle, une maquette de navire ne se comporte pas comme le navire. Pour que les vagues qu'elle fait aient la même forme, on la remorque à une vitesse réduite dans le rapport de la racine carrée des longueurs : c'est la loi de comparaison de William Froude. Une maquette 25 fois plus petite avance 5 fois moins vite." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      boussole: { prompt: "Une boussole s'oriente autrement près du pôle magnétique qu'à Paris. Les lois de la physique dépendent-elles du lieu ?",
        options: { a: "Oui : c'est une violation de la symétrie par translation.", b: "Non : le champ magnétique terrestre fait partie de l'expérience et n'a pas été déplacé avec la boussole.", c: "Oui, mais seulement pour le magnétisme.", d: "Non, parce qu'une boussole n'obéit pas aux lois de la physique." },
        why: "Une symétrie se teste en déplaçant tout ce qui agit. Le champ terrestre agit sur l'aiguille ; on ne l'a pas déplacé. Boussole et champ déplacés ensemble, l'aiguille prend la même orientation par rapport au champ." },
      tour: { prompt: "On refait une expérience de chute 100\u00a0m plus haut. De combien la pesanteur a-t-elle changé, en valeur relative ?",
        options: { a: "De 1,6\u00a0×\u00a010⁻⁵, h/R avec R = 6\u00a0371\u00a0km.", b: "Elle n'a pas changé.", c: "De 3\u00a0×\u00a010⁻⁵, 2h/R avec R = 6\u00a0371\u00a0km.", d: "De 3\u00a0×\u00a010⁻³." },
        hint: "g varie comme 1/r² ; au premier ordre, Δg/g = \u22122Δr/r.",
        why: "2 × 100/6,371 × 10⁶ = 3,1 × 10⁻⁵. C'est un environnement qu'on ne peut pas tout à fait déplacer, mais à ce niveau il ne compte que pour une mesure de précision." },
      echelle: { prompt: "Une colonne de béton tient tout juste sous son propre poids. On construit la même, de même forme, deux fois plus grande en toutes ses dimensions. Que devient la contrainte au pied ?",
        options: { a: "Elle double : le poids est multiplié par 8, la section par 4.", b: "Elle reste la même, puisque la forme est la même.", c: "Elle est multipliée par 8, comme le poids.", d: "Elle est divisée par 2." },
        why: "σ = γ h ne dépend que de la hauteur. Doubler toutes les longueurs double h, donc σ. La colonne agrandie s'écrase : le changement d'échelle n'est pas une symétrie." },
      hauteur: { prompt: "Avec f_ck = 25\u00a0MPa et γ = 25\u00a0kN·m⁻³, quelle hauteur une colonne de béton armé peut-elle atteindre avant de s'écraser sous son poids, en ne regardant que la compression ?",
        options: { a: "25\u00a0m.", b: "100\u00a0m.", c: "Elle dépend de la section de la colonne.", d: "1\u00a0000\u00a0m." },
        why: "h = f_ck/γ = 25 × 10⁶/25 × 10³ = 1\u00a0000\u00a0m, quelle que soit la section : la section porte et pèse à la fois, elle s'élimine. En pratique, le flambement et les coefficients de sécurité arrêtent bien avant." },
      foucault: { prompt: "À 45° de latitude, combien de temps met le plan d'un pendule de Foucault pour faire un tour ?",
        options: { a: "Environ 34\u00a0h.", b: "24\u00a0h, comme la Terre.", c: "12\u00a0h.", d: "Il ne tourne pas." },
        hint: "ω = Ω sin λ, et sin 45° ≈ 0,71.",
        why: "Ω = 7,29 × 10⁻⁵\u00a0rad·s⁻¹ ; Ω sin 45° = 5,16 × 10⁻⁵\u00a0rad·s⁻¹ ; 2π/5,16 × 10⁻⁵ = 1,22 × 10⁵\u00a0s, 33,8\u00a0h. Seul le pôle donne un jour sidéral." },
      voiture: { prompt: "Pourquoi peut-on dire qu'on roule à vitesse constante sans regarder dehors, mais pas à quelle vitesse ?",
        options: { a: "Parce que la vitesse est trop faible devant c.", b: "Parce que les lois sont les mêmes dans tous les référentiels en translation uniforme : aucune expérience intérieure ne mesure cette vitesse.", c: "Parce que la voiture vibre.", d: "Parce qu'une vitesse constante n'existe pas." },
        why: "C'est la symétrie par vitesse uniforme. Une accélération ou une rotation, elles, se mesurent de l'intérieur : on est poussé contre le siège, un pendule dévie." },
      oeuf: { prompt: "Les lois du mouvement des atomes ne distinguent pas le passé du futur, à l'exception des interactions faibles. D'où vient alors qu'un œuf cassé ne se recolle pas ?",
        options: { a: "De la pesanteur, qui ne marche que vers le bas.", b: "De ce que les lois microscopiques sont en fait irréversibles.", c: "De ce que l'état ordonné de départ évolue vers l'un d'un nombre immense d'états désordonnés, et que le retour est d'une improbabilité écrasante.", d: "De la conservation de l'énergie." },
        why: "Chaque trajectoire renversée est permise par les lois, mais il faudrait préparer exactement les vitesses de toutes les molécules, environ 10²⁴ pour 50\u00a0g d'eau. L'irréversibilité est statistique." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. I, chap. 52 (texte original en anglais), §52-2. Béton : EN 1992-1-1 (classes de résistance) et EN 1991-1-1, annexe A (poids volumiques).",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

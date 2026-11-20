/* Leçon « Les forces et la limite classique » (Feynman III.7.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/forces-et-limite-classique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les forces et la limite classique",
    "crumb.jour": "Forces et limite classique",
    "h1": "Les forces et la limite classique",
    "lede": "Une onde de matière qui traverse une région où le potentiel croît d'un côté a une longueur d'onde plus grande de ce côté-là. Ses fronts d'onde pivotent, et le faisceau tourne. L'angle obtenu est exactement celui que donne la force classique \u2212∂V/∂y. La mécanique de Newton sort des amplitudes.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : énergie potentielle et conservation de l'énergie quantiques",

    "s1.sec": "Décrire le système",
    "s1.h2": "Un gradient transverse",
    "s1.p1": "Une particule de quantité de mouvement <var>p</var>, de vitesse <var>v</var>, avance selon <var>x</var> et traverse une région de longueur <var>w</var> où son énergie potentielle varie selon <var>y</var>, perpendiculairement au mouvement : par exemple un électron entre deux plaques chargées. Classiquement, la force <var>F</var><sub><var>y</var></sub> = \u2212∂<var>V</var>/∂<var>y</var> agit pendant <var>w</var>/<var>v</var> ; elle donne une quantité de mouvement transverse <var>F</var><sub><var>y</var></sub><var>w</var>/<var>v</var>, et le faisceau tourne de :",
    "val.7.26": "Approximation : déviation petite (δθ ≪ 1), <var>w</var> parcouru à vitesse presque constante, gradient uniforme sur la région, non relativiste. Classique : on suit une trajectoire, ce qui suppose que la longueur d'onde soit très petite devant les distances sur lesquelles <var>V</var> varie.",
    "s1.p2": "La question est de retrouver ce résultat avec des amplitudes, sans parler de force ni de trajectoire.",

    "s2.sec": "Le calcul par les ondes",
    "s2.h2": "Des fronts d'onde qui pivotent",
    "s2.p1": "Considérons deux points du front d'onde séparés de <var>D</var> selon <var>y</var>, où le potentiel diffère de Δ<var>V</var>. La fréquence est la même partout : l'énergie totale se conserve, (7.23). Là où <var>V</var> est plus grand, l'énergie cinétique est plus faible :",
    "val.7.29": "Approximation au premier ordre : Δ<var>V</var> ≪ <var>p</var><sup>2</sup>/2<var>M</var>, non relativiste. Le terme suivant est en (Δ<var>V</var>)<sup>2</sup>, relativement plus petit d'un facteur Δ<var>V</var>/(<var>p</var><sup>2</sup>/<var>M</var>).",
    "s2.p2": "Sur la longueur <var>w</var>, l'onde du côté le plus haut prend un retard de phase Δ<var>k</var>·<var>w</var> = (Δ<var>p</var>/ħ)<var>w</var> sur l'autre. Ce retard correspond à un décalage du front, compté en longueur :",
    "val.7.31": "Approximation au premier ordre, comme (7.29). On convertit une phase en longueur par ħ/<var>p</var>, la longueur d'onde du faisceau divisée par 2π. Δ<var>x</var> est négatif du côté où <var>V</var> est plus grand : le front y est en retard.",
    "s2.p3": "Un front qui avance plus d'un côté que de l'autre a tourné. Sur la hauteur <var>D</var>, le décalage Δ<var>x</var> est un angle δθ multiplié par <var>D</var> :",
    "val.7.33": "Approximation : petits angles et Δ<var>V</var> = <var>D</var> ∂<var>V</var>/∂<var>y</var>, gradient uniforme sur <var>D</var>. Avec <var>v</var> = <var>p</var>/<var>M</var>, c'est exactement (7.26) : δθ = \u2212(<var>w</var>/<var>p</var><var>v</var>) ∂<var>V</var>/∂<var>y</var>.",
    "s2.p4": "Le calcul par les ondes redonne le calcul classique. La condition de cet accord est que le potentiel varie lentement à l'échelle de la longueur d'onde : sur une longueur d'onde, <var>V</var> doit changer très peu devant l'énergie cinétique. C'est la <strong>limite classique</strong>. Quand elle n'est pas satisfaite, comme pour un électron dans un atome, il n'y a plus de trajectoire, et seules les amplitudes ont un sens.",

    "s3.sec": "Les nombres",
    "s3.h2": "Un électron entre deux plaques",
    "s3.p1": "Un électron d'énergie cinétique <var>E</var><sub>c</sub> traverse sur <var>w</var> = 1\u00a0cm un champ électrique transverse ℰ. On calcule l'angle de deux façons : par les phases de l'onde, accumulées à deux hauteurs séparées de 1\u00a0mm, et par la formule classique. Le dessin exagère la rotation des fronts, jusqu'à 2\u00a0000 fois.",
    "fig.aria.fronts": "Fronts d'onde qui pivotent en traversant une région de potentiel croissant vers le haut",
    "fig.E": "Énergie cinétique de l'électron, E<sub>c</sub>",
    "fig.G": "Champ électrique transverse, ℰ (kV/m)",
    "fig.k.onde": "δθ par les phases de l'onde",
    "fig.f.onde": "calcul exact des nombres d'onde à deux hauteurs",
    "fig.k.class": "δθ par la force, (7.26)",
    "fig.k.lent": "Variation de <var>V</var> sur une longueur d'onde, / <var>E</var><sub>c</sub>",
    "fig.f.lent": "λ = {l} ; ≪ 1 : limite classique",
    "fig.caption": "Les deux angles coïncident d'autant mieux que la variation de <var>V</var> sur 1\u00a0mm est petite devant <var>E</var><sub>c</sub> : leur écart relatif en vaut à peu près le quart, 0,25\u00a0% pour 100\u00a0eV et 1\u00a0kV·m<sup>\u22121</sup>. Aux faibles énergies, l'angle n'est plus petit et (7.26) cesse de valoir. Les fronts tournent vers le côté où le potentiel est le plus bas, comme le ferait une balle : la force pousse vers les <var>V</var> faibles.",
    "sys.title": "Le système décrit : un électron de 100 eV",
    "sys1.body": "Un électron de 100\u00a0eV a une longueur d'onde de {l}. Dans un champ de 1\u00a0kV·m<sup>\u22121</sup> sur 1\u00a0cm, il tourne de {d}. Sur une longueur d'onde, le potentiel change d'environ 10<sup>\u22127</sup>\u00a0eV, un milliardième de son énergie cinétique : l'électron « ne voit » pas que le potentiel varie à son échelle, et sa trajectoire est classique.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des ondes qui suivent les lois de Newton",
    "hist.intro": "Qu'une onde de matière suive, en moyenne, les trajectoires classiques a été démontré peu après la naissance de la mécanique quantique, et exploité aussitôt pour construire des lentilles à électrons.",
    "hist.events": {
      busch: { who: "Hans Busch", what: "développe la lentille électromagnétique, qui rend pratique la focalisation magnétique des faisceaux d'électrons.", context: "Elle repose sur la déviation classique des électrons par un champ, celle que (7.26) retrouve par les ondes." },
      ehrenfest: { who: "Paul Ehrenfest", what: "publie dans la Zeitschrift für Physik « Sur la validité approchée de la mécanique classique en mécanique quantique ».", context: "Pour une fonction d'onde bien concentrée, la position et la quantité de mouvement moyennes suivent approximativement les trajectoires classiques." },
      ruska: { who: "Max Knoll et Ernst Ruska", what: "obtiennent les premières images agrandies avec deux lentilles magnétiques : le microscope électronique.", context: "Ruska reçoit le prix Nobel de physique en 1986 pour cette invention." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      optique: { name: "Microscopie électronique en transmission", text: "Les microscopes électroniques guident leurs faisceaux par des lentilles magnétiques calculées en optique classique, puisque la longueur d'onde des électrons est très petite devant la distance sur laquelle les champs varient ; l'image, elle, se forme par interférence des ondes. Avec des correcteurs, leur résolution descend sous 50\u00a0pm." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      pourquoi: { prompt: "Pourquoi les fronts d'onde tournent-ils dans un gradient transverse de potentiel ?",
        options: { a: "Parce que la fréquence change d'un côté à l'autre.", b: "Parce que, à fréquence égale, la longueur d'onde est plus grande là où V est plus grand : la phase y avance moins.", c: "Parce que la particule est attirée par les plaques.", d: "Parce que l'amplitude diminue d'un côté." },
        why: "La conservation de l'énergie fixe la fréquence ; l'énergie cinétique, donc k, varie avec V. Une phase qui avance plus d'un côté fait pivoter le front." },
      sens: { prompt: "De quel côté le faisceau tourne-t-il ?",
        options: { a: "Vers les V plus grands.", b: "Il ne tourne pas.", c: "Cela dépend de la masse.", d: "Vers les V plus faibles, comme sous l'effet de la force \u2212∂V/∂y." },
        why: "Le front est en retard du côté où V est grand : il tourne vers l'autre côté, dans le sens de la force classique." },
      accord: { prompt: "Les deux calculs, par les ondes et par la force, donnent-ils le même angle ?",
        options: { a: "Oui, au premier ordre, quand V varie lentement à l'échelle de la longueur d'onde.", b: "Non, jamais.", c: "Oui, exactement, quelles que soient les conditions.", d: "Seulement pour des photons." },
        why: "(7.33) redonne (7.26) avec v = p/M. L'accord repose sur des développements au premier ordre, valables dans la limite classique." },
      limite: { prompt: "Qu'est-ce que la limite classique, dans cette leçon ?",
        options: { a: "Les grandes masses seulement.", b: "Les faibles vitesses.", c: "La situation où V change très peu, devant l'énergie cinétique, sur une longueur d'onde.", d: "Les températures élevées." },
        why: "C'est une condition sur des longueurs : λ petit devant l'échelle de variation de V. Une grande masse ou une grande vitesse y aident en réduisant λ." },
      lent: { prompt: "Pourquoi n'y a-t-il pas de trajectoire pour un électron dans un atome d'hydrogène ?",
        options: { a: "Parce qu'il va trop vite.", b: "Parce que son potentiel varie beaucoup sur une distance de l'ordre de sa longueur d'onde.", c: "Parce qu'il n'a pas de masse.", d: "Parce que la force de Coulomb est nulle." },
        why: "Dans l'atome, la longueur d'onde de l'électron est de l'ordre de la taille de l'atome, qui est aussi l'échelle de variation du potentiel : la limite classique ne s'applique pas." },
      rayon: { prompt: "Un électron de 100 eV traverse 1 cm d'un champ transverse de 1 kV/m. De quel ordre est sa déviation ?",
        options: { a: "5 × 10⁻² rad.", b: "1 rad.", c: "10⁻¹⁰ rad.", d: "Elle est nulle." },
        hint: "δθ = eℰ w/(p v) = eℰ w/(2 Ec).",
        why: "eℰ w = 10 eV, divisé par 2 Ec = 200 eV : 0,05 rad. Même résultat par les ondes et par la force." },
      masse: { prompt: "À énergie cinétique égale, un proton et un électron traversent le même gradient sur la même longueur. Lequel est le plus dévié ?",
        options: { a: "L'électron, beaucoup plus.", b: "Le proton, beaucoup plus.", c: "Aucun : δθ = F w/(p v) = F w/(2 Ec) ne dépend que de l'énergie cinétique.", d: "Cela dépend de la longueur d'onde." },
        why: "p v = 2 Ec en non relativiste. À même Ec et même force, même angle. La longueur d'onde, elle, diffère, et décide si la limite classique s'applique." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 7, §7-4 (texte original en anglais). Notations SI. Busch (1926) ; Ehrenfest, Zeitschrift für Physik, vol. 45 (1927) ; Knoll et Ruska (1931). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

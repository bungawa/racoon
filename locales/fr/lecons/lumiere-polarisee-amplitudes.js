/* Leçon « La lumière polarisée en amplitudes » (Feynman III.17.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/lumiere-polarisee-amplitudes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La lumière polarisée en amplitudes",
    "crumb.jour": "La lumière polarisée",
    "h1": "La lumière polarisée en amplitudes",
    "lede": "Un photon polarisé circulairement à droite porte un moment cinétique +ħ. Un faisceau en porte donc autant que de photons, et il fait tourner ce qui l'absorbe. Le calcul classique d'une charge entraînée par un champ tournant le confirme : moment cinétique et énergie sont dans le rapport 1/ω.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les lois de conservation quantiques",

    "s1.sec": "1 · Le moment cinétique d'un faisceau",
    "s1.h2": "Un ħ par photon",
    "s1.p1": "Le système : un faisceau de lumière monochromatique de pulsation ω, polarisée circulairement à droite, qui se propage selon <var>z</var>. Dans une rotation de φ autour de <var>z</var>, l'état |<var>R</var>⟩ d'un photon prend la phase e<sup><var>i</var>φ</sup> (« Les états de polarisation du photon », au signe de convention près) : par « Les lois de conservation quantiques », chaque photon porte <var>J</var><sub>z</sub> = +ħ. Pour <var>N</var> photons, d'énergie totale <var>W</var> = <var>N</var>ħω :",
    "val.17.30": "Exacte pour une lumière entièrement circulaire, onde plane ; pour une polarisation elliptique, seule la part circulaire nette compte. On néglige le moment cinétique orbital d'un faisceau de forme particulière.",
    "s1.p2": "Une lumière polarisée linéairement est moitié droite, moitié gauche : son moment cinétique moyen est nul.",

    "s2.sec": "2 · Le calcul classique",
    "s2.h2": "Une charge entraînée par un champ qui tourne",
    "s2.p1": "Vérifions par la physique classique. Dans la lumière circulaire, le champ électrique tourne à la pulsation ω. Une charge <var>q</var> liée élastiquement, qui absorbe un peu de cette énergie, est entraînée sur un cercle de rayon <var>r</var> à la vitesse <var>v</var> = ω<var>r</var>. Seule la composante ℰ<sub>t</sub> du champ tangente à la trajectoire travaille :",
    "val.17.31": "Exacte : la puissance de la force <var>q</var>ℰ<sub>t</sub> sur une charge de vitesse <var>v</var>. On néglige le champ magnétique de l'onde, dont la force est <var>v</var>/<var>c</var> fois plus petite.",
    "val.17.32": "Exacte : le moment par rapport à l'axe de la même force tangente, de bras <var>r</var>.",
    "s2.p2": "Le rapport des deux vaut <var>r</var>/<var>v</var> = 1/ω : le moment cinétique absorbé est l'énergie absorbée divisée par ω, comme (17.30). Le résultat ne dépend ni de <var>q</var>, ni de <var>r</var>, ni du mécanisme : la mécanique classique contient déjà le « ħ par photon », caché dans le rapport <var>W</var>/ω.",

    "s3.sec": "3 · Le couple sur un absorbant",
    "s3.h2": "Un bras de levier de λ/2π",
    "s3.p1": "Un absorbant qui reçoit la puissance <var>P</var> d'une lumière circulaire subit le couple <var>P</var>/ω. Comparez-le à la force de pression de radiation, <var>P</var>/<var>c</var> : le rapport des deux est une longueur, λ/2π.",
    "fig.aria": "Couple exercé par un faisceau de lumière polarisée circulairement absorbé, en fonction de la longueur d'onde, pour la puissance choisie",
    "fig.legend.c": "couple P/ω",
    "fig.P": "Puissance absorbée P",
    "fig.l": "Longueur d'onde λ",
    "fig.x": "λ (nm)",
    "fig.y": "couple (N·m)",
    "fig.k.n": "Photons par seconde",
    "fig.f.n": "chacun porte ħ",
    "fig.k.c": "Couple <var>P</var>/ω",
    "fig.f.c": "photons par seconde × ħ",
    "fig.k.f": "Force de radiation <var>P</var>/<var>c</var>",
    "fig.f.f": "couple / force = λ/2π = {r}",
    "fig.caption": "Absorption totale, polarisation entièrement circulaire. À puissance fixée, une longueur d'onde plus grande donne moins d'énergie par photon, donc plus de photons, et un couple plus grand. Les couples restent minuscules : un watt de lumière infrarouge exerce environ 6 × 10<sup>\u221216</sup>\u00a0N·m.",
    "s3.p2": "Une lame quart d'onde qui transforme la lumière circulaire droite en lumière linéaire ne l'absorbe pas, mais lui retire tout de même son moment cinétique : elle reçoit le même couple. Une lame demi-onde, qui la change en circulaire gauche, en reçoit le double, 2<var>P</var>/ω.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Peser le moment cinétique de la lumière",
    "hist.intro": "La polarisation est connue depuis le début du XIXᵉ siècle ; son moment cinétique a été mesuré en 1936, par une balance de torsion.",
    "hist.events": {
      malus: { who: "Étienne-Louis Malus", what: "publie la découverte de la polarisation de la lumière par réflexion.", context: "La lumière apparaît comme une onde transversale, qui a une direction propre perpendiculaire à sa propagation." },
      beth: { who: "Richard Beth", what: "suspend une lame biréfringente à une fibre de torsion et mesure le couple que lui transmet une lumière polarisée circulairement.", context: "« Mechanical Detection and Measurement of the Angular Momentum of Light », Physical Review, vol. 50 ; le couple mesuré a la valeur que prévoit (17.30)." },
      aspect: { who: "Alain Aspect et ses collaborateurs", what: "mesurent les corrélations de polarisation de paires de photons émis par des atomes de calcium.", context: "La polarisation d'un photon, système à deux états, devient l'outil des tests de l'intrication." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      pince: { name: "Rotateurs optiques", text: "Dans une pince optique, une particule biréfringente de quelques micromètres, éclairée par un laser polarisé circulairement, se met à tourner sous le couple P/ω ; on se sert de ce couple connu pour en mesurer d'autres, à l'échelle des molécules." },
      cinema: { name: "Lunettes du cinéma en relief", text: "Les lunettes à polariseurs circulaires séparent les images destinées à chaque œil : elles trient les photons selon le signe de leur moment cinétique, ±ħ." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      rapport: { prompt: "Un faisceau de lumière circulaire a l'énergie W et la pulsation ω. Quel moment cinétique porte-t-il ?",
        options: { a: "W/c.", b: "W/ω, un ħ par photon.", c: "Wω.", d: "Zéro : la lumière n'a pas de masse." },
        why: "N photons d'énergie ħω chacun font W = Nħω ; chacun porte ħ, d'où Jz = Nħ = W/ω, (17.30)." },
      lineaire: { prompt: "Et une lumière polarisée linéairement ?",
        options: { a: "W/ω.", b: "2W/ω.", c: "Zéro en moyenne : chaque photon est droite ou gauche avec la probabilité 1/2.", d: "W/2ω." },
        why: "|x⟩ = (|R⟩ + |L⟩)/√2 : la moyenne de Jz est (+ħ \u2212 ħ)/2 = 0. Une lame qui l'absorbe ne reçoit aucun couple." },
      bras: { prompt: "Le couple P/ω et la force P/c d'un faisceau absorbé sont dans le rapport λ/2π. Que représente cette longueur ?",
        options: { a: "Un bras de levier effectif de l'ordre de la longueur d'onde : le moment cinétique de la lumière vient de sa structure à l'échelle de λ.", b: "Le rayon du faisceau.", c: "La distance parcourue en une seconde.", d: "Rien de physique." },
        why: "τ/F = (P/ω)/(P/c) = c/ω = λ/2π. Pour une lumière visible, environ 0,1 µm." },
      un: { prompt: "Dans le calcul classique (17.31)–(17.32), pourquoi le résultat ne dépend-il pas du rayon r de l'orbite de la charge ?",
        options: { a: "Parce que r est petit.", b: "Parce que la charge est un électron.", c: "Parce que le champ est uniforme.", d: "Parce que la puissance et le couple contiennent tous deux qℰt, et que leur rapport r/v vaut 1/ω pour tout mouvement circulaire à la pulsation ω." },
        why: "dJz/dt ÷ dW/dt = r/v = 1/ω. Seule compte la pulsation imposée par le champ." },
      double: { prompt: "Une lame demi-onde change une lumière circulaire droite en circulaire gauche, sans l'absorber. Quel couple reçoit-elle, pour une puissance P traversante ?",
        options: { a: "Aucun : elle n'absorbe rien.", b: "2P/ω : chaque photon passe de +ħ à \u2212ħ.", c: "P/ω.", d: "P/c." },
        hint: "Faites le bilan du moment cinétique de chaque photon.",
        why: "Chaque photon perd 2ħ, que la lame reçoit. C'est le principe des moteurs optiques à lame biréfringente, et une variante de l'expérience de Beth." },
      classique: { prompt: "Pourquoi l'expérience de Beth ne prouve-t-elle pas, à elle seule, que la lumière est faite de photons ?",
        options: { a: "Parce que le rapport J/W = 1/ω se déduit aussi de l'électromagnétisme classique : seule la granularité, un ħ par quantum, est quantique.", b: "Parce qu'elle a échoué.", c: "Parce que la lumière n'a pas de moment cinétique.", d: "Parce qu'elle mesurait une force." },
        why: "Le calcul (17.31)–(17.32) donne J = W/ω sans photon. L'image quantique dit en plus que cette quantité vient par paquets de ħ." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-4 (texte original en anglais). Notations SI. Malus : article « Étienne-Louis Malus » de Wikipédia en anglais ; Beth, Physical Review 50, 115 (1936) ; Aspect : article « Aspect's experiment », même source. Rotateurs optiques : « clé de couple optique » du groupe de M. D. Wang, université Cornell. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

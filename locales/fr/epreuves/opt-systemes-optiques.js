/* Épreuve de l'étape « Systèmes optiques et limites » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      gullstrand: { prompt: "Deux lentilles minces de +10\u00a0m⁻¹ sont placées à 5\u00a0cm l'une de l'autre, dans l'air. Quelle est la focale de l'ensemble ?",
        options: { a: "6,7\u00a0cm : V = 10 + 10 \u2212 0,05 × 100 = 15\u00a0m⁻¹.", b: "5\u00a0cm : les vergences s'additionnent, 20\u00a0m⁻¹.", c: "10\u00a0cm : deux lentilles identiques gardent leur focale.", d: "20\u00a0cm : la distance s'ajoute à la focale." },
        hint: "(27.12a), avec e en mètres.",
        why: "V = V₁ + V₂ \u2212 eV₁V₂ = 15\u00a0m⁻¹, f′ = 6,67\u00a0cm. Le rayon arrive sur la seconde lentille plus près de l'axe, qui le dévie moins : l'addition n'est vraie qu'accolées. Leçon « Associations de lentilles »." },
      virtuel: { prompt: "La première lentille d'un système forme son image 10\u00a0cm après la seconde lentille. Comment traiter ce point pour la seconde ?",
        options: { a: "On l'ignore : la lumière ne l'atteint jamais.", b: "Comme un objet virtuel : les rayons qui frappent la seconde lentille convergent vers lui, et la conjugaison s'applique avec O₂A₁ = +10\u00a0cm.", c: "Comme un objet réel 10\u00a0cm devant la seconde lentille.", d: "Il faut retracer tous les rayons, la formule ne vaut plus." },
        why: "Un objet virtuel est un point vers lequel convergent les rayons incidents. Rien ne change dans la relation de conjugaison, seul le signe de la position. Leçon « Associations de lentilles »." },
      principaux: { prompt: "Un téléobjectif a une focale de 50\u00a0cm, mais 26\u00a0cm seulement séparent sa première lentille du capteur. Où est son plan principal image H′ ?",
        options: { a: "Sur la première lentille.", b: "Sur le capteur.", c: "En avant de l'objectif, 50\u00a0cm avant le foyer F′ : la focale se mesure depuis H′, qui peut sortir du système.", d: "Au milieu des deux lentilles." },
        why: "f′ = H′F′. Un groupe divergent derrière un groupe convergent repousse H′ en avant, par (27.12b) : O₂H′ = \u2212eV₁/V, grand quand V est petit. Leçon « Associations de lentilles »." },
      lunette: { prompt: "Une lunette de Kepler a un objectif de 1\u00a0m de focale et un oculaire de 25\u00a0mm. Que valent la distance entre les lentilles et le grossissement ?",
        options: { a: "97,5\u00a0cm ; G = +40.", b: "1\u00a0m ; G = \u22121.", c: "1,025\u00a0m ; G = \u22120,025.", d: "1,025\u00a0m ; G = \u221240 : le système est afocal, l'image renversée." },
        hint: "Le foyer image de l'objectif doit coïncider avec le foyer objet de l'oculaire.",
        why: "e = f′₁ + f′₂ = 1,025\u00a0m annule V dans (27.12a) : un faisceau parallèle ressort parallèle. G = \u2212f′₁/f′₂ = \u221240, (27.12c). Leçon « Associations de lentilles »." },
      spherique: { prompt: "Une lentille plan-convexe de 100\u00a0mm focalise un faisceau de 20\u00a0mm de diamètre. Côté plan vers la lumière, le bord focalise 4,4\u00a0mm avant le foyer paraxial. Que gagne-t-on en la retournant, bombé vers la lumière ?",
        options: { a: "Rien : la focale est la même dans les deux sens.", b: "Un décalage quatre fois moindre, 1,1\u00a0mm : la déviation se partage entre les deux faces.", c: "La suppression de l'aberration chromatique.", d: "Un décalage deux fois plus grand." },
        why: "La focale paraxiale ne dépend pas du sens, l'aberration sphérique si. Deux déviations moyennes valent mieux qu'une grande : κ passe de 4,38 à 1,10 dans le décalage \u2212κ h²/f′. Leçon « Les aberrations »." },
      achromat: { prompt: "Pourquoi un objectif de lunette associe-t-il un crown convergent et un flint divergent, plutôt que deux lentilles du même verre ?",
        options: { a: "Pour réduire le poids.", b: "Parce que le flint corrige l'aberration sphérique seul.", c: "Parce qu'il faut deux constringences différentes pour annuler l'écart des foyers rouge et bleu, V₁/ν₁ + V₂/ν₂ = 0, en gardant une vergence non nulle.", d: "Parce qu'un seul verre ne peut pas être assez convergent." },
        why: "Avec ν₁ = ν₂, (27.11b) imposerait V₁ = \u2212V₂ : vergence nulle. Crown (ν = 64) et flint (ν = 36) ramènent C et F au même foyer ; le chromatisme d'une lentille de 100\u00a0mm passe de 1,55\u00a0mm à 0,05\u00a0mm. Leçon « Les aberrations »." },
      optimum: { prompt: "Pour une lentille simple, l'aberration sphérique donne une tache de rayon proportionnel à a³, la diffraction une tache proportionnelle à 1/a. Que conclure ?",
        options: { a: "Il existe une ouverture optimale, où les deux taches se valent et où l'écart de chemin est de l'ordre d'une fraction de longueur d'onde.", b: "Il faut toujours ouvrir au maximum.", c: "Il faut toujours fermer au maximum.", d: "Les deux effets s'annulent à toute ouverture." },
        why: "Ouvrir agrandit la tache d'aberration, fermer celle de diffraction. Pour la plan-convexe de 100\u00a0mm, l'optimum est vers f′/2a ≈ 8, où l'écart de chemin vaut λ/3 : c'est le critère (27.17d). Leçons « Les aberrations » et « Le pouvoir séparateur »." },
      resolution: { prompt: "Un objectif de microscope à immersion, d'ouverture numérique 1,45, est éclairé à 514\u00a0nm. Quelle est la plus petite séparation qu'il distingue, selon le raisonnement des temps de trajet ?",
        options: { a: "Environ 0,35\u00a0nm : la longueur d'onde divisée par le grossissement.", b: "Environ 514\u00a0nm : la longueur d'onde elle-même.", c: "Aucune limite si le grossissement est assez grand.", d: "Environ 177\u00a0nm : d > λ/(2n sin θ)." },
        hint: "(27.17a) : le retard entre rayons extrêmes doit dépasser une période.",
        why: "d > 514/(2 × 1,45) ≈ 177\u00a0nm. Le grossissement n'y change rien : il agrandit la tache de diffraction. La convention de Rayleigh donnerait 1,22 fois plus. Leçon « Le pouvoir séparateur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Réflexion, réfraction et Fermat » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      radiotelescope: { prompt: "Un radiotélescope de 100\u00a0m de diamètre observe la raie de l'hydrogène à λ = 21\u00a0cm. Que dit l'optique géométrique de son faisceau ?",
        options: { a: "Elle donne bien le trajet des rayons vers le foyer, mais λ/D = 2,1 × 10⁻³ fixe une résolution d'environ 2,6\u00a0mrad (0,15°) qu'elle ignore.", b: "Rien : à λ = 21\u00a0cm, la lumière est faite de photons très énergétiques.", c: "Tout : λ/D est petit, donc la diffraction est nulle.", d: "Rien : l'optique géométrique ne vaut que pour la lumière visible." },
        hint: "Calculez λ/D, puis 1,22 λ/D.",
        why: "λ/D = 0,21/100 = 2,1 × 10⁻³ : assez petit pour parler de rayons et de foyer, pas assez pour que la diffraction disparaisse. Le cône 1,22 λ/D ≈ 2,6 × 10⁻³ rad borne la finesse de l'image. Le régime dépend de λ/D, pas du domaine du spectre. Leçon « La nature de la lumière »." },
      verre: { prompt: "Une lumière de 600\u00a0nm dans le vide entre dans un verre d'indice 1,5. Que valent sa fréquence et sa longueur d'onde dans le verre ?",
        options: { a: "Fréquence 3,33 × 10¹⁴\u00a0Hz, longueur d'onde 600\u00a0nm.", b: "Fréquence 5,00 × 10¹⁴\u00a0Hz, inchangée ; longueur d'onde 400\u00a0nm.", c: "Fréquence 7,50 × 10¹⁴\u00a0Hz ; longueur d'onde 400\u00a0nm.", d: "Fréquence 5,00 × 10¹⁴\u00a0Hz ; longueur d'onde 900\u00a0nm." },
        hint: "Qu'est-ce qui est imposé par la source, et qu'est-ce qui dépend de la vitesse ?",
        why: "ν = c/λ = 3,00 × 10⁸/6,00 × 10⁻⁷ = 5,00 × 10¹⁴ Hz, imposée par la source et conservée à la traversée. La vitesse devient c/1,5, donc λ = 400 nm dans le verre. Leçons « La nature de la lumière » et « Le principe de Fermat du temps minimal »." },
      fm: { prompt: "Pour une onde radio FM de 100\u00a0MHz captée à 293\u00a0K, que vaut hν/(kB T), et quel modèle convient ?",
        options: { a: "Environ 90 : le modèle des photons s'impose.", b: "Environ 1 : il faut combiner onde et photons.", c: "Environ 1,6 × 10⁻⁵ : chaque photon est noyé dans l'agitation thermique, l'onde classique suffit.", d: "Environ 4 × 10⁻⁷ : c'est l'énergie du photon en joules." },
        hint: "hν vaut 4,1 × 10⁻⁷ eV, kB T vaut 0,025 eV.",
        why: "hν = 6,63 × 10⁻³⁴ × 10⁸ ≈ 6,6 × 10⁻²⁶ J, soit 4,1 × 10⁻⁷ eV ; divisé par kB T = 4,0 × 10⁻²¹ J, cela fait 1,6 × 10⁻⁵. Le grain de la lumière est invisible : l'antenne voit un champ électrique classique. Leçon « La nature de la lumière »." },
      sinus: { prompt: "Sur la table de Ptolémée, le rapport sin θair / sin θeau vaut 1,25 à 10°, 1,34 à 50° et 1,29 à 80°. Qu'en conclure ?",
        options: { a: "Que l'indice de l'eau dépend de l'angle d'incidence.", b: "Que Snell s'est trompé et que la loi des sinus n'est qu'approchée.", c: "Que les mesures de Ptolémée sont exactes aux grands angles seulement.", d: "Que la table ne suit pas une loi des sinus : ses valeurs régulières viennent d'une interpolation, fausse aux grands angles." },
        hint: "Pour une loi des sinus, ce rapport serait le même à toutes les lignes.",
        why: "Une loi des sinus donne un rapport constant, l'indice : 1,333. Celui de la table monte puis redescend, parce que les valeurs suivent une parabole (différences secondes constantes, \u22120,5°). L'écart atteint 2,4° à 80°. Leçon « Réflexion et réfraction »." },
      prisme: { prompt: "Un rayon entre perpendiculairement dans la face d'un prisme de verre (n = 1,52) à angles de 45°, et arrive à 45° sur la grande face. Que se passe-t-il ?",
        options: { a: "Il est totalement réfléchi, car 45° dépasse l'angle limite de 41,1°.", b: "Il sort dans l'air à 45°, sans déviation.", c: "Il sort dans l'air à 65°.", d: "Il est réfléchi à 4 %, et le reste sort." },
        hint: "Calculez sin θℓ = 1/1,52.",
        why: "sin θℓ = 1/1,52 = 0,658, θℓ = 41,1°. À 45°, 1,52 sin 45° = 1,07 > 1 : aucun angle réfracté n'existe, toute la lumière est réfléchie. C'est ainsi que les jumelles replient le trajet de la lumière sans miroir métallique. Leçon « Réflexion et réfraction »." },
      rapport: { prompt: "Un sauveteur court trois fois plus vite qu'il ne nage. Sur son trajet le plus rapide, que vaut sin θ₁ / sin θ₂, angles mesurés depuis la normale au bord de l'eau ?",
        options: { a: "1/3", b: "3", c: "1, car le trajet le plus rapide est la ligne droite.", d: "9, le carré du rapport des vitesses." },
        why: "Au minimum de la durée, dT/dx = sin θ₁/v₁ \u2212 sin θ₂/v₂ = 0, donc sin θ₁/sin θ₂ = v₁/v₂ = 3. Il entre dans l'eau avec un angle plus petit, plus près de la normale : il nage le moins possible. Leçon « Le principe de Fermat du temps minimal »." },
      plat: { prompt: "Pour la lumière qui passe de l'air dans l'eau, un chemin qui entre 4\u00a0mm à côté du bon point arrive en retard d'une seule période. Pourquoi si peu ?",
        options: { a: "Parce que la lumière va très vite.", b: "Parce que 4 mm est petit devant la longueur d'onde.", c: "Parce qu'au point de Fermat dT/dx = 0 : le retard n'est que du second ordre, ½ T″ δ².", d: "Parce que l'indice de l'air vaut presque 1." },
        hint: "Au minimum d'une fonction, comment varie-t-elle quand on s'en écarte un peu ?",
        why: "La dérivée est nulle au minimum : le retard croît comme δ², pas comme δ. Avec T″ = 2,3 × 10⁻¹⁰ s·m⁻², δ = 4 mm donne 1,8 × 10⁻¹⁵ s, une période à 550 nm. 4 mm est au contraire immense devant λ. Leçon « Le principe de Fermat du temps minimal »." },
      foucault: { prompt: "Descartes et Fermat obtenaient la même loi des sinus. Quelle observation les a départagés ?",
        options: { a: "La table de Ptolémée, qui donnait des angles trop grands.", b: "La mesure de Rømer en 1676, par les éclipses de Io.", c: "La réflexion totale, que seul Fermat prévoyait.", d: "La mesure de Foucault en 1850 : la lumière est plus lente dans l'eau que dans l'air, comme le voulait Fermat." },
        why: "Descartes supposait la lumière plus rapide dans l'eau, Fermat plus lente : la même loi, des prédictions opposées sur la vitesse. Rømer avait mesuré une vitesse dans le vide, pas dans l'eau ; la réflexion totale découle de la loi, commune aux deux. Leçons « Le principe de Fermat du temps minimal » et « Réflexion et réfraction »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

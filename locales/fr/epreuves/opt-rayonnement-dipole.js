/* Épreuve de l'étape « Rayonnement d'un dipôle » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      portee: { prompt: "Un petit émetteur à 100\u00a0MHz est écouté à 1\u00a0km, puis à 100\u00a0km. Par combien sont divisés le terme rayonné de (28.3) et le terme de Coulomb retardé ?",
        options: { a: "Le terme rayonné par 100, le terme de Coulomb par 10\u00a0000 : l'un décroît comme 1/r, l'autre comme 1/r².", b: "Tous deux par 100 : ils suivent le même retard.", c: "Tous deux par 10\u00a0000, comme toute influence électrique.", d: "Le terme rayonné par 10\u00a0000, le terme de Coulomb par 100." },
        hint: "Seul le troisième terme de (28.3) peut décroître comme 1/r.",
        why: "La distance est multipliée par 100 : un champ en 1/r est divisé par 100, un champ en 1/r² par 10⁴. À 1\u00a0km, kr ≈ 2 × 10³ : le rayonnement domine déjà de loin, et il domine de plus en plus. Leçons « L’électromagnétisme et la lumière » et « Le rayonnement »." },
      frontiere: { prompt: "Une antenne Wi-Fi oscille à 2,4\u00a0GHz (λ = 12,5\u00a0cm). À quelle distance environ les trois termes du champ de ce petit dipôle sont-ils de même taille, dans son plan équatorial ?",
        options: { a: "12,5\u00a0cm, une longueur d'onde.", b: "2\u00a0cm, soit λ/2π : là, kr = 1.", c: "1\u00a0m : il faut plusieurs longueurs d'onde.", d: "Nulle part : le terme rayonné domine toujours." },
        why: "Les amplitudes sont dans les rapports 1, kr, (kr)² : égales à kr = 1, r = λ/2π = 12,5/6,28 ≈ 2\u00a0cm. À 12,5\u00a0cm, kr = 2π : le terme rayonné dépasse déjà la correction d'un facteur 6,3 et le terme de Coulomb d'un facteur 40. Leçon « L’électromagnétisme et la lumière »." },
      visee: { prompt: "Selon la règle du peintre, que rayonne vers vous une charge lointaine qui oscille le long de la ligne qui la relie à vous ?",
        options: { a: "Le maximum, puisque toute son accélération est dirigée vers vous.", b: "La moitié du maximum, la projection d'un mouvement à 45°.", c: "Rien en 1/r : sa position apparente sur la toile ne bouge pas.", d: "Un champ dirigé le long de la ligne de visée." },
        why: "(28.5) et (28.6) ne retiennent que l'accélération projetée sur le plan perpendiculaire à la ligne de visée. Une charge qui vient vers vous et s'éloigne ne fait pas bouger sa direction apparente. C'est la position 3 de la leçon « Le dipôle rayonnant ». Leçons « Le rayonnement » et « Le dipôle rayonnant »." },
      rapide: { prompt: "Une charge parcourt un cercle à v = 0,5\u00a0c, observée de très loin dans le plan du cercle. Que dit (28.5) du pic du champ, comparé à l'amplitude que donne (28.6) ?",
        options: { a: "Il est égal : (28.6) est exacte pour un mouvement uniforme sur un cercle.", b: "Il est 1,33 fois plus grand, comme 1/(1 \u2212 β²).", c: "Il est deux fois plus petit, à cause du retard.", d: "Il est 4 fois plus grand, 1/(1 \u2212 β)² : la charge qui vient vers l'observateur rattrape en partie son propre signal." },
        hint: "(28.6) suppose un retard constant ; il varie de R/c au cours du tour.",
        why: "(28.5), qui suit la position apparente avec le retard exact, donne un pic 1/(1 \u2212 0,5)² = 4 fois celui de (28.6). L'erreur de (28.6) est du premier ordre en v/c : environ 2 % à 0,01\u00a0c, pas du tout négligeable à 0,5\u00a0c. Leçon « Le rayonnement »." },
      electron: { prompt: "Un électron subit une accélération de 10¹⁸\u00a0m·s⁻², perpendiculaire à la ligne de visée. Que vaut le champ rayonné à 1\u00a0m, si (28.6) s'applique ?",
        options: { a: "Environ 1,6 × 10⁻⁸\u00a0V·m⁻¹.", b: "Environ 1,4 × 10⁻⁹\u00a0V·m⁻¹, le champ de Coulomb de l'électron à 1\u00a0m.", c: "Environ 1,6 × 10⁻²⁶\u00a0V·m⁻¹.", d: "Environ 1,6 × 10¹⁰\u00a0V·m⁻¹." },
        hint: "1/(4πε₀c²) = μ₀/4π ≈ 10⁻⁷ en unités SI.",
        why: "E = e a/(4πε₀c²r) ≈ 10⁻⁷ × 1,6 × 10⁻¹⁹ × 10¹⁸/1 = 1,6 × 10⁻⁸\u00a0V·m⁻¹. C'est dix fois le champ de Coulomb de l'électron à 1\u00a0m, 1,4 × 10⁻⁹\u00a0V·m⁻¹ ; à 10\u00a0m, le rapport passe à cent, car l'un décroît en 1/r, l'autre en 1/r². Leçons « Le rayonnement » et « L’électromagnétisme et la lumière »." },
      oblique: { prompt: "Un dipôle vertical rayonne. Le détecteur est à 30° de son axe, à la même distance qu'un détecteur placé à l'horizontale. Que capte-t-il au mieux, et dans quelle orientation ?",
        options: { a: "Autant qu'à l'horizontale, s'il est vertical.", b: "La moitié du champ, sin 30°, en étant perpendiculaire à la ligne qui le relie au dipôle, dans le plan qui contient le dipôle.", c: "Rien : hors de l'équateur, le dipôle ne rayonne pas.", d: "cos 30° ≈ 0,87 du champ, en étant parallèle au dipôle." },
        why: "Le champ est l'accélération projetée perpendiculairement à la ligne de visée : module en sin θ = 0,5, direction perpendiculaire à cette ligne, dans le plan qui contient le dipôle. Un détecteur vertical n'en capterait que la composante verticale, 0,5 × sin 30° = 0,25. Leçon « Le dipôle rayonnant »." },
      zero: { prompt: "Deux antennes en phase, à 3\u00a0GHz (λ = 10\u00a0cm), sont écartées de 30\u00a0cm. Un détecteur lointain s'écarte de leur médiatrice. Où le signal s'annule-t-il pour la première fois ?",
        options: { a: "Là où les deux distances diffèrent de 10\u00a0cm.", b: "Là où elles diffèrent de 30\u00a0cm, l'écart des antennes.", c: "Là où elles diffèrent de 5\u00a0cm, une demi-longueur d'onde, soit à environ 9,6° de la médiatrice.", d: "Nulle part : deux antennes en phase s'ajoutent partout." },
        hint: "Deux champs s'annulent quand ils arrivent avec une demi-période d'écart.",
        why: "Un écart de chemin λ/2 = 5\u00a0cm donne un écart de retard d'une demi-période : opposition. Loin, d sin θ = λ/2, sin θ = 1/6, θ ≈ 9,6°. À 10\u00a0cm d'écart, les champs sont de nouveau en phase. Leçon « Les interférences, première approche »." },
      croisees: { prompt: "On couche S₁ à l'horizontale, S₂ reste verticale, toutes deux en phase et à égale distance du détecteur. Que vaut le champ total, et dans quelle direction oscille-t-il ?",
        options: { a: "Il est nul : deux champs perpendiculaires se compensent.", b: "2 fois le champ d'une antenne, vertical.", c: "Il tourne sans changer de longueur.", d: "√2 ≈ 1,41 fois le champ d'une antenne, le long d'une droite à 45°." },
        why: "Les champs s'additionnent comme des vecteurs : un horizontal et un vertical, égaux et en phase, donnent un vecteur de longueur √2, qui oscille à 45°. Le champ ne tourne que si l'on décale les phases d'un quart de période. Leçon « Les interférences, première approche »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

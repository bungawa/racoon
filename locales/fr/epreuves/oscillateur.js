/* Épreuve de l'étape « Oscillateur harmonique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lancer: { prompt: "La boule de 0,200\u00a0kg, sur le ressort de 20\u00a0N·m⁻¹ (ω₀ = 10\u00a0rad·s⁻¹), est lancée à 6\u00a0cm de l'équilibre avec une vitesse de 0,45\u00a0m·s⁻¹. Que valent son amplitude et l'énergie de l'oscillation ?",
        options: { a: "10,5\u00a0cm et 110\u00a0mJ : les deux écarts s'ajoutent.", b: "6\u00a0cm et 36\u00a0mJ : seule la position de départ fixe l'amplitude.", c: "7,5\u00a0cm et 113\u00a0mJ.", d: "7,5\u00a0cm et 56\u00a0mJ." },
        hint: "a = √(x₀² + (v₀/ω₀)²), puis E = ½ k a².",
        why: "v₀/ω₀ = 4,5\u00a0cm ; a = √(6² + 4,5²) = 7,5\u00a0cm : la partie en cosinus et la partie en sinus sont en quadrature (leçon « Conditions initiales »), comme les deux coordonnées d'un point qui tourne (leçon « Mouvement harmonique et mouvement circulaire »). E = ½\u00a0×\u00a020\u00a0×\u00a00,075² ≈ 56\u00a0mJ ; 113\u00a0mJ oublie le facteur ½." },
      circuit: { prompt: "Un circuit est formé d'une bobine de 4\u00a0mH et d'un condensateur de 1\u00a0µF, résistance négligée. Quelle est sa fréquence propre ?",
        options: { a: "Environ 16\u00a0kHz.", b: "Environ 2,5\u00a0kHz.", c: "Environ 250\u00a0Hz.", d: "Environ 5,0\u00a0kHz, comme le circuit de 1\u00a0mH et 1\u00a0µF : la bobine ne compte pas." },
        hint: "Dans l'analogie, L joue le rôle de la masse et 1/C celui de la raideur : ω₀ = 1/√(LC).",
        why: "ω₀ = 1/√(4\u00a0×\u00a010⁻³\u00a0×\u00a010⁻⁶) ≈ 1,58\u00a0×\u00a010⁴\u00a0rad·s⁻¹, f₀ = ω₀/2π ≈ 2,5\u00a0kHz (leçon « Équations différentielles linéaires ») ; 16\u00a0kHz confond pulsation et fréquence. Inductance quatre fois plus grande, période doublée : comme une masse quatre fois plus grande sur un ressort (leçon « L'oscillateur harmonique »)." },
      sansfrottement: { prompt: "Un oscillateur réel a un facteur de qualité Q = 50. Jusqu'où peut-on approcher la résonance en gardant la formule sans frottement C = F₀/(m(ω₀² \u2212 ω²)) juste à 1\u00a0% près ?",
        options: { a: "Jusqu'à ω₀ lui-même : le frottement ne change que la phase.", b: "Jusqu'à 2\u00a0% de ω₀, la largeur ω₀/Q.", c: "Jusqu'à environ 7\u00a0% de ω₀ : il faut |ω \u2212 ω₀| > 3,5 ω₀/Q.", d: "Nulle part : dès qu'il y a un frottement, la formule est fausse à toute pulsation." },
        hint: "La leçon donne 12\u00a0% de ω₀ pour Q = 30.",
        why: "La formule sans frottement reste juste à 1\u00a0% près tant que |ω \u2212 ω₀| > 3,5 ω₀/Q = 3,5/50, soit 7\u00a0% de ω₀ (leçon « Oscillations forcées »). Plus près, le frottement limite l'amplitude à Q fois l'allongement statique au lieu de l'infini. De même, le modèle libre sans frottement ne vaut que sur un nombre de périodes petit devant Q (leçon « L'oscillateur harmonique »)." },
      ressort: { prompt: "On suspend la boule de 200\u00a0g à un ressort qui pèse 30\u00a0g, et l'on calcule la période par T₀ = 2π√(m/k) en négligeant la masse du ressort. Quelle erreur commet-on ?",
        options: { a: "On sous-estime la période d'environ 2,5\u00a0%.", b: "On sous-estime la période d'environ 7\u00a0% : il faut ajouter les 30\u00a0g à la boule.", c: "Aucune : le ressort ne fait que transmettre la force.", d: "On surestime la période d'environ 2,5\u00a0%." },
        hint: "Correction de Rayleigh : le ressort compte pour un tiers de sa masse.",
        why: "Les spires bougent de 0 au point fixe jusqu'à x au niveau de la boule : leur énergie cinétique est celle d'une masse mr/3 = 10\u00a0g. √(210/200) ≈ 1,025 : la période vraie dépasse T₀ de 2,5\u00a0% (leçon « L'oscillateur harmonique », qui donne 1,6\u00a0% pour un ressort de 10\u00a0% de la masse). L'air, lui, ne prend que 0,1\u00a0% de l'énergie par période : c'est la masse du ressort qu'il faut garder. Le circuit analogue a ses propres oublis, la résistance des fils (leçon « Équations différentielles linéaires »)." },
      acceleration: { prompt: "La boule oscille avec une amplitude de 5\u00a0cm à ω₀ = 10\u00a0rad·s⁻¹. Où son accélération est-elle maximale, et combien vaut-elle ?",
        options: { a: "Au passage à l'équilibre, où la vitesse est maximale : 5\u00a0m·s⁻².", b: "Aux extrémités : 0,5\u00a0m·s⁻².", c: "Nulle aux extrémités, puisque la boule s'y arrête.", d: "Aux extrémités, où la vitesse est nulle : 5\u00a0m·s⁻²." },
        hint: "Regardez l'ombre d'un point qui tourne : son accélération centripète vaut ω²R.",
        why: "L'accélération de l'ombre est la projection de l'accélération centripète ω²a = 100\u00a0×\u00a00,05 = 5\u00a0m·s⁻² : entière aux extrémités, nulle au milieu (leçon « Mouvement harmonique et mouvement circulaire »). C'est ẍ = \u2212ω₀²x, maximale là où l'écart l'est (leçon « L'oscillateur harmonique »). Vitesse nulle ne veut pas dire accélération nulle ; la vitesse maximale, ω₀a = 0,5\u00a0m·s⁻¹, est atteinte au milieu." },
      superposition: { prompt: "Un ressort raidi exerce \u2212kx(1 + βx²). À l'amplitude utilisée, βA² = 10⁻³. Peut-on prédire son mouvement en additionnant deux mouvements calculés séparément, sur 10\u202f000 périodes ?",
        options: { a: "Oui : une non-linéarité de 0,1\u00a0% ne donne qu'une erreur de 0,1\u00a0%.", b: "Non : le décalage de période s'accumule ; il faudrait βA² petit devant 10⁻⁴, l'inverse du nombre de périodes.", c: "Oui, car l'équation reste du deuxième ordre.", d: "Non, car le mouvement d'un ressort raidi n'est même pas périodique." },
        hint: "La non-linéarité décale un peu la période. Que devient ce décalage au bout de N périodes ?",
        why: "La superposition exige une équation linéaire (leçon « Équations différentielles linéaires »). Un terme βA² change la période d'une fraction de cet ordre (\u22123,5\u00a0% à βA² = 0,1, leçon « L'oscillateur harmonique »), et ce décalage s'accumule à chaque période : il faut comparer βA² à 1/N, ici 10⁻⁴. Le mouvement reste périodique, car l'énergie se conserve ; c'est sa période qui dépend de l'amplitude." },
      supports: { prompt: "Un moteur vibre à 50\u00a0Hz. On le pose sur des supports souples qui lui donnent une fréquence propre de 5\u00a0Hz, frottement négligé. Comparée à l'allongement statique F₀/k, l'amplitude de sa vibration vaut…",
        options: { a: "Environ 1\u00a0%, en opposition de phase avec la force.", b: "Environ 1\u00a0%, en phase avec la force.", c: "Environ 10\u00a0%, le rapport des fréquences.", d: "Environ 100 fois plus : au-dessus de la résonance, l'amplitude est amplifiée." },
        hint: "|C|/(F₀/k) = ω₀²/|ω₀² \u2212 ω²|.",
        why: "C = F₀/(m(ω₀² \u2212 ω²)) donne |C|/(F₀/k) = 1/(100 \u2212 1) ≈ 1\u00a0%, et C < 0 au-dessus de ω₀ : opposition de phase, la masse n'a pas le temps de suivre (leçon « Oscillations forcées »). La pulsation propre √(k/m) ne dépend que du ressort et de la masse (leçon « L'oscillateur harmonique ») : des supports souples la rendent petite devant ω." },
      spirale: { prompt: "Un oscillateur est freiné par un frottement de facteur de qualité Q = 100. Dans le plan (x, v/ω₀), à quoi ressemble son mouvement sur un tour ?",
        options: { a: "Un cercle fermé : un frottement aussi faible ne change pas le portrait.", b: "Une spirale dont le rayon diminue de 31\u00a0% à chaque tour.", c: "Une spirale dont le rayon diminue d'environ 3\u00a0% à chaque tour, et l'énergie d'environ 6\u00a0%.", d: "Une ellipse de plus en plus aplatie, de largeur constante." },
        hint: "Chaque tour réduit le rayon d'un facteur e^(\u2212π/Q).",
        why: "e^(\u2212π/100) ≈ 0,969 : le rayon, qui est l'amplitude, perd 3,1\u00a0% par tour ; l'énergie, en ½ka², en perd deux fois plus, 6,1\u00a0% (leçon « Conditions initiales »). Sans frottement, ce serait le cercle de rayon a de la leçon « Mouvement harmonique et mouvement circulaire »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

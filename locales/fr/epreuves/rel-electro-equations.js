/* Épreuve de l'étape « Équations de Maxwell à quatre dimensions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      temps: { prompt: "Un proton immobile crée, à 1\u00a0nm, un potentiel φ = 1,44\u00a0V. Que vaut la composante de temps de son quadripotentiel Aμ en ce point ?",
        options: { a: "4,8 × 10⁻⁹\u00a0T·m : φ/c.", b: "1,44\u00a0T·m : φ lui-même.", c: "4,3 × 10⁸\u00a0T·m : φc.", d: "0, puisqu'il n'y a pas de courant." },
        hint: "En SI, Aμ = (φ/c, A), et les quatre composantes ont la même unité.",
        why: "1,44/(3,00 × 10⁸) ≈ 4,8 × 10⁻⁹\u00a0T·m. Sans courant, la partie d'espace est nulle, pas la composante de temps. Leçon « L'électrodynamique en notation quadridimensionnelle »." },
      lorenz: { prompt: "Une charge avance à 0,6c. En un point du laboratoire, (1/c²)∂φ/∂t = 3 × 10⁻⁷\u00a0T. Que vaut ∇·A en ce point, avec les potentiels de « Le quadripotentiel d'une charge en mouvement » ?",
        options: { a: "0 : la charge a ses potentiels en jauge de Coulomb.", b: "\u22123 × 10⁻⁷\u00a0T : la condition de Lorenz impose une somme nulle.", c: "+3 × 10⁻⁷\u00a0T.", d: "1,8 × 10⁻⁷\u00a0T, soit 0,6 fois le terme de temps." },
        why: "Ces potentiels obéissent à (1/c²)∂φ/∂t + ∇·A = 0 dans tous les référentiels. La condition de Coulomb, ∇·A = 0, n'est remplie que dans celui de la charge. Leçon « L'électrodynamique en notation quadridimensionnelle »." },
      coulomb: { prompt: "Pourquoi écrit-on les équations de Maxwell à quatre dimensions en jauge de Lorenz plutôt qu'en jauge de Coulomb ?",
        options: { a: "Parce que la jauge de Coulomb donne des champs E et B faux.", b: "Parce que la jauge de Coulomb est interdite en dynamique.", c: "Parce que ∇·A = 0 n'est que la partie d'espace d'une divergence à quatre dimensions : remplie dans un référentiel, elle ne l'est pas dans un autre.", d: "Parce que la jauge de Lorenz est la seule où A existe." },
        why: "Les deux jauges donnent les mêmes champs. Seule la condition de Lorenz est un scalaire, nul pour tous les observateurs : c'est elle qui laisse □²Aμ = jμ/(ε0c²) inchangée d'un référentiel à l'autre." },
      boost: { prompt: "Dans le référentiel d'une charge, φ′ = 100\u00a0V et A′ = 0 en un événement. Vu d'un référentiel où la charge avance à 0,8c, que valent φ et cAx au même événement ?",
        options: { a: "φ = 100\u00a0V et cAx = 80\u00a0V.", b: "φ = 60\u00a0V et cAx = 48\u00a0V.", c: "φ = 166,7\u00a0V et cAx = 0.", d: "φ = 166,7\u00a0V et cAx = 133,3\u00a0V." },
        hint: "γ = 1/√(1 \u2212 0,64) ; (25.26) avec A′ = 0.",
        why: "φ = γφ′ = 5/3 × 100\u00a0V et cAx = βφ = 0,8 × 166,7\u00a0V. Leçon « Le quadripotentiel d'une charge en mouvement »." },
      invariant: { prompt: "Avec ces valeurs, que vaut √(φ² \u2212 c²A·A) ?",
        options: { a: "100\u00a0V : le potentiel dans le référentiel de la charge.", b: "166,7\u00a0V.", c: "33,3\u00a0V, la différence φ \u2212 cAx.", d: "213\u00a0V." },
        why: "√(166,7² \u2212 133,3²) = 100 : c fois la norme du quadripotentiel, la même pour tous les observateurs, (25.28a)." },
      impulsion: { prompt: "Un proton de γ = 1000 passe à b = 1\u00a0mm d'un capteur. Quelle est, en ordre de grandeur, la durée à mi-hauteur de l'impulsion de potentiel ?",
        options: { a: "10⁻¹¹\u00a0s : 2√3 b/c, sans γ.", b: "10⁻¹⁴\u00a0s : 2√3 b/(γc).", c: "10⁻⁸\u00a0s.", d: "3 × 10⁻¹⁸\u00a0s : b/(γ²c)." },
        hint: "(25.27a) dépend du temps par γvt.",
        why: "2√3 × 10⁻³/(1000 × 3 × 10⁸) ≈ 1,2 × 10⁻¹⁴\u00a0s. Le pic vaut γ fois le Coulomb à b, et sa durée est divisée par γ. Leçon « Le quadripotentiel d'une charge en mouvement »." },
      galilee: { prompt: "Changée de référentiel à la manière de Galilée à u = 0,2c, une onde lumineuse aurait une vitesse de phase de 0,8c. Quelle loi serait alors violée ?",
        options: { a: "La loi de Faraday.", b: "∇·B = 0.", c: "Le théorème d'Ampère–Maxwell, et avec lui l'équation d'onde ; Faraday resterait vraie.", d: "Aucune : seule la vitesse change." },
        why: "Faraday et ∇·B = 0 découlent de la définition des champs par les potentiels. Ampère–Maxwell impose E/(cB) = c/v, Faraday v/c : les deux ne s'accordent que pour v = c. Leçon « L'invariance des équations de l'électrodynamique »." },
      simple: { prompt: "Que montre la comparaison entre la « loi » U = 0 et □²Aμ = jμ/(ε0c²) ?",
        options: { a: "Que U = 0 contient plus de physique.", b: "Que les deux sont fausses hors du vide.", c: "Que □²Aμ = jμ/(ε0c²) remplace la conservation de la charge.", d: "Les deux sont des écritures courtes ; la seconde seule dit quelque chose de plus : écrite entre quadrivecteurs, elle a la même forme dans tous les référentiels galiléens." },
        why: "U = 0 équivaut à la liste des lois qu'on y cache. La forme quadrivectorielle, elle, garantit l'invariance par transformation de Lorentz. Leçon « L'invariance des équations de l'électrodynamique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

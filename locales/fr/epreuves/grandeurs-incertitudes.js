/* Épreuve de l'étape « Grandeurs et incertitudes » : textes en français. Une autre langue = locales/<langue>/epreuves/grandeurs-incertitudes.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/grandeurs-incertitudes.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      pendule: { prompt: "Pour un pendule, g = 4π²L/T². La longueur est connue à 0,2\u00a0% près, la période à 0,5\u00a0% près, indépendamment. Que vaut à peu près u(g)/g ?",
        options: { a: "0,7\u00a0%.", b: "0,54\u00a0%.", c: "1,0\u00a0%.", d: "1,2\u00a0%." },
        hint: "Regardez l'exposant de T, puis la façon d'ajouter des erreurs indépendantes.",
        why: "T intervient à la puissance \u22122 : son incertitude relative compte double, 1,0\u00a0%. Les erreurs étant indépendantes, on ajoute les carrés : √(0,2² + 1,0²) ≈ 1,02\u00a0%. Ajouter les incertitudes elles-mêmes, 1,2\u00a0%, c'est supposer le pire cas. La règle des puissances et la quadrature viennent de la leçon « Incertitude absolue et incertitude relative » ; l'exposant \u22122 de T sort de l'analyse dimensionnelle du pendule, dans « Homogénéité : les dimensions comptent »." },
      atmo: { prompt: "On pèse l'atmosphère avec m = p₀ × 4πR²/g, en prenant p₀ ≈ 10⁵\u00a0Pa, R ≈ 6,4\u00a0×\u00a010⁶\u00a0m et g ≈ 10\u00a0m·s⁻². Quel est l'ordre de grandeur de m ?",
        options: { a: "10¹⁸\u00a0kg, puisque le calcul donne 5\u00a0×\u00a010¹⁸\u00a0kg.", b: "10¹⁹\u00a0kg, puisque le calcul donne 5\u00a0×\u00a010¹⁸\u00a0kg.", c: "10¹²\u00a0kg : l'air est très léger.", d: "10²⁴\u00a0kg, comme la Terre." },
        hint: "Au sens des rapports, la frontière entre 10ⁿ et 10ⁿ⁺¹ n'est pas 5\u00a0×\u00a010ⁿ.",
        why: "10⁵ × 4π × (6,4\u00a0×\u00a010⁶)²/10 ≈ 5,1\u00a0×\u00a010¹⁸\u00a0kg, la référence de la leçon « Ordres de grandeur ». Sa mantisse, 5,1, dépasse √10 ≈ 3,16 : au sens des rapports, ce nombre est plus près de 10¹⁹ que de 10¹⁸. Un ordre de grandeur n'est pas la valeur arrondie au premier chiffre." },
      quadrature: { prompt: "La formule u(g)/g = √((u(L)/L)² + (2u(T)/T)²) propage les incertitudes du pendule. Quand cesse-t-elle de valoir ?",
        options: { a: "Jamais : c'est une identité exacte, comme une définition.", b: "Dès qu'on fait moins de dix mesures de T.", c: "Quand g s'écarte de 9,81\u00a0m·s⁻².", d: "Quand les incertitudes relatives ne sont plus petites (vers 100\u00a0ms sur 2\u00a0s, l'histogramme de g devient dissymétrique), ou quand les erreurs sur L et T sont liées." },
        hint: "Elle repose sur deux hypothèses : un développement au premier ordre, et des erreurs indépendantes.",
        why: "La formule est un premier ordre pour des erreurs indépendantes. Si u(T) devient grand, 1/T² n'est plus linéaire sur l'intervalle et la simulation de Monte-Carlo donne un histogramme dissymétrique. Si une même règle mal étalonnée sert deux fois, les erreurs ne se compensent plus et la quadrature sous-estime l'incertitude. Leçon « Incertitude absolue et incertitude relative »." },
      amplitude: { prompt: "On mesure g avec un pendule lâché à 15°, en appliquant g = 4π²L/T² ; l'incertitude-type relative annoncée est 0,5\u00a0%. Que fait l'amplitude qu'on a négligée ?",
        options: { a: "Elle allonge T de 0,43\u00a0%, donc abaisse g d'environ 0,9\u00a0% : un biais près de deux fois l'incertitude, à corriger, ou à réduire en baissant l'amplitude.", b: "Rien de visible : 0,43\u00a0% reste sous l'incertitude de 0,5\u00a0%.", c: "Rien : la période d'un pendule ne dépend pas de l'amplitude.", d: "Elle augmente la dispersion des mesures, mais ne décale pas leur moyenne." },
        hint: "T intervient au carré dans g, et une erreur systématique ne se moyenne pas.",
        why: "À 15°, T dépasse 2π√(L/g) de 0,43\u00a0% ; comme T est au carré, g est trop petit de 0,9\u00a0%. Ce biais est systématique : répéter les mesures ne l'efface pas, et rapporté à 0,5\u00a0% il fait un écart normalisé proche de 2. Chiffres des notes de validité des leçons « Incertitude absolue et incertitude relative » et « Homogénéité : les dimensions comptent »." },
      explosion: { prompt: "L'analyse dimensionnelle donne le rayon de l'onde de choc d'une explosion, R ∝ (Et²/ρ)^(1/5), donc E ∝ ρR⁵/t². R est mesuré à 4\u00a0% près, ρ et t sont bien connus. Quelle incertitude relative sur E ?",
        options: { a: "4\u00a0%.", b: "20\u00a0%.", c: "0,8\u00a0%.", d: "9\u00a0%." },
        hint: "Une puissance n multiplie l'incertitude relative par |n|. Les cinq facteurs R sont-ils indépendants ?",
        why: "E varie comme R⁵ : l'incertitude relative est multipliée par l'exposant, 5 × 4\u00a0% = 20\u00a0%. Les cinq facteurs R sont une seule et même mesure : pas de quadrature entre eux, qui donnerait √5 × 4\u00a0% ≈ 9\u00a0%. Loi de l'explosion de « Homogénéité : les dimensions comptent », règle des puissances d'« Incertitude absolue et incertitude relative »." },
      mesures: { prompt: "Pendule : g = 9,81\u00a0m·s⁻², u = 0,03\u00a0m·s⁻². Chute libre : g = 9,75\u00a0m·s⁻², u = 0,04\u00a0m·s⁻². Chaque équipe refait quatre fois plus de mesures répétées ; les moyennes ne bougent pas, et u est purement statistique. Que devient la conclusion ?",
        options: { a: "Rien : les moyennes n'ont pas changé, l'écart normalisé reste 1,2.", b: "Les valeurs deviennent plus compatibles : l'écart normalisé passe à 0,6.", c: "L'écart normalisé passe de 1,2 à 2,4 : les valeurs deviennent incompatibles, il faut chercher une cause.", d: "L'écart normalisé passe à 4,8, car u est divisé par 4." },
        hint: "Combien de fois plus de mesures faut-il pour diviser u par 2 ?",
        why: "Avant : z = 0,06/√(0,03² + 0,04²) = 1,2. Quatre fois plus de mesures divisent chaque u par √4 = 2, donc z = 0,06/0,025 = 2,4, au-delà du seuil usuel de 2. Une mesure plus précise juge plus sévèrement : il faut chercher une erreur systématique ou un modèle trop simple. Leçon « Incertitude absolue et incertitude relative »." },
      fermi: { prompt: "La propagation des incertitudes et l'estimation de Fermi à six facteurs reposent sur la même idée. Laquelle ?",
        options: { a: "Des erreurs indépendantes se compensent en partie : elles s'ajoutent en quadrature, sur les valeurs ou sur les logarithmes, et leur somme croît comme √n, pas comme n.", b: "Les erreurs s'annulent exactement quand on multiplie assez de facteurs.", c: "On garde toujours le pire cas, toutes les erreurs dans le même sens.", d: "Seul le facteur le plus incertain compte ; les autres sont exacts." },
        hint: "Six facteurs connus chacun à un facteur 2 près : pire cas 64, écart typique 2,7.",
        why: "Au pire, six facteurs 2 font 64 ; typiquement, l'écart n'est que d'un facteur 2,7, car sur le logarithme les erreurs s'ajoutent comme des pas au hasard. C'est la quadrature de la leçon « Incertitude absolue et incertitude relative », appliquée aux logarithmes dans « Ordres de grandeur ». La compensation est partielle et suppose des erreurs indépendantes." },
      dimension: { prompt: "Pour la masse de l'atmosphère, un élève écrit m = p₀ × 4πR²/g, un autre m = p₀ × 4πR² × g. Comment trancher sans calculatrice ?",
        options: { a: "Par l'ordre de grandeur : les deux donnent 10¹⁹\u00a0kg.", b: "On ne peut pas : l'homogénéité ne voit pas les facteurs.", c: "Les deux sont homogènes, car g est une constante.", d: "Par les dimensions : p₀R² est une force, M·L·T⁻² ; il faut la diviser par une accélération pour obtenir une masse." },
        hint: "Une pression multipliée par une aire, c'est quoi ?",
        why: "Une pression fois une aire est une force ; une force divisée par une accélération est une masse. La seconde formule a la dimension M·L²·T⁻⁴ : elle est fausse. L'homogénéité ne voit pas les facteurs sans dimension comme 4π, mais g a une dimension, et elle le voit. Leçons « Homogénéité : les dimensions comptent » et « Ordres de grandeur »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

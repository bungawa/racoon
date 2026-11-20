/* Épreuve de l'étape « Traitement du signal » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      raies: { prompt: "Des impulsions de durée 0,2 ms se répètent toutes les 1 ms. Combien de raies non nulles, hors valeur moyenne, tombent avant la fréquence où l'enveloppe du spectre s'annule pour la première fois ?",
        options: { a: "4 : les raies à 1, 2, 3 et 4 kHz.", b: "5 : les raies à 1, 2, 3, 4 et 5 kHz.", c: "1 : seul le fondamental compte.", d: "Une infinité : le spectre d'une impulsion est continu." },
        hint: "Les raies sont à n/T, l'enveloppe s'annule d'abord à 1/τ.",
        why: "Raies à n × 1 kHz ; l'enveloppe Aτ|sin(πfτ)/(πfτ)| s'annule à 1/τ = 5 kHz, où la cinquième raie est nulle. Il en reste quatre dans le lobe central, environ T/τ \u2212 1. Leçon « Spectre d'un signal périodique et non périodique »." },
      largeur: { prompt: "Un sonar doit séparer deux échos qui arrivent à 1 µs d'intervalle. Quelle largeur de bande lui faut-il, en ordre de grandeur ?",
        options: { a: "1 kHz.", b: "1 MHz.", c: "1 GHz.", d: "Aucune en particulier : seule la fréquence de la porteuse compte." },
        hint: "Durée × largeur ≳ 1.",
        why: "Pour séparer deux échos à 1 µs, les impulsions doivent durer moins de 1 µs ; leur spectre s'étale alors sur au moins 1/(1 µs) = 1 MHz. Leçon « Spectre d'un signal périodique et non périodique »." },
      harmonique: { prompt: "Un créneau de ±1 V et de 200 Hz traverse un passe-bas du premier ordre de coupure 2 kHz. Quelle est l'amplitude de son harmonique 3 en sortie ?",
        options: { a: "0,14 V.", b: "1,27 V.", c: "0,41 V.", d: "0,04 V." },
        hint: "En entrée, l'harmonique n d'un créneau a l'amplitude 4/(nπ) ; le filtre la multiplie par |H| à 600 Hz.",
        why: "4/(3π) = 0,424 V en entrée, |H| = 1/√(1 + 0,3²) = 0,958 à 600 Hz : 0,41 V. Chaque harmonique est filtré à sa propre fréquence, comme le montre la leçon « Filtrage linéaire d'un signal »." },
      triangle: { prompt: "On veut transformer un créneau de 1 kHz en triangle. Quel filtre choisir ?",
        options: { a: "Un passe-haut de coupure 50 Hz.", b: "Un passe-bas de coupure 20 kHz.", c: "Un passe-bande de facteur de qualité 10, centré sur 1 kHz.", d: "Un passe-bas du premier ordre de coupure 50 Hz." },
        why: "Tous les harmoniques sont au-dessus de 50 Hz : H ≈ ωc/(iω), le filtre intègre, et l'intégrale d'un créneau est un triangle (petit : facteur ~ fc/f₀). Le passe-bande en tirerait une sinusoïde ; le passe-bas à 20 kHz arrondirait seulement les fronts. Leçon « Filtrage linéaire d'un signal »." },
      machine: { prompt: "Un enregistreur échantillonne à 1 kHz, sans filtre d'entrée, la vibration d'une machine à 960 Hz. Quelle fréquence apparaît dans le fichier ?",
        options: { a: "40 Hz.", b: "960 Hz.", c: "500 Hz.", d: "1960 Hz." },
        hint: "Cherchez |f \u2212 m fe| entre 0 et fe/2.",
        why: "|960 \u2212 1000| = 40 Hz : une vibration rapide se fait passer pour une oscillation lente, et rien dans le fichier ne permet de la reconnaître. Leçon « Échantillonnage et critère de Shannon »." },
      disque: { prompt: "Le disque compact garde les fréquences jusqu'à 20 kHz. Pourquoi échantillonne-t-il à 44,1 kHz plutôt qu'à 40 kHz ?",
        options: { a: "Parce que le critère de Shannon exige fe > 2,2 fmax.", b: "Pour laisser au filtre anti-repliement la place de passer de « tout » à « rien » entre 20 et 22,05 kHz.", c: "Pour que l'oreille n'entende pas la fréquence d'échantillonnage.", d: "Par hasard : 40 kHz aurait aussi bien convenu." },
        why: "À 40 kHz, il faudrait un filtre qui passe 20 kHz entier et coupe tout juste au-dessus : irréalisable. Les 2,05 kHz de marge rendent le filtre possible, avec un ordre élevé. Leçon « Échantillonnage et critère de Shannon »." },
      diode: { prompt: "Porteuse de 1 MHz, son jusqu'à 4 kHz, taux de modulation 0,8. Quelle constante de temps RC donner au détecteur d'enveloppe ?",
        options: { a: "0,5 µs.", b: "1 ms.", c: "10 µs.", d: "50 µs." },
        hint: "Détecteur d'enveloppe : 1/fc ≪ RC < √(1 \u2212 m²)/(m ωm).",
        why: "1/fc = 1 µs et √(1 \u2212 0,64)/(0,8 × 2π × 4000 Hz) ≈ 30 µs : 10 µs est entre les deux. 0,5 µs laisse passer la porteuse, 50 µs et 1 ms ne suivent plus les descentes du son. Leçon « Modulation et démodulation »." },
      phase: { prompt: "L'oscillateur local d'un démodulateur synchrone est à la fréquence de la porteuse, mais déphasé de 60°. Que rend le démodulateur ?",
        options: { a: "Rien : il faut un déphasage nul.", b: "Le message, avec une fréquence décalée de 60 Hz.", c: "Le message redressé.", d: "Le message sans déformation, multiplié par cos 60° = 0,5." },
        why: "Le terme gardé par le filtre est m(t) cos φ : un déphasage constant réduit le niveau sans déformer. Un écart de fréquence, lui, ferait battre la sortie. Leçon « Modulation et démodulation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

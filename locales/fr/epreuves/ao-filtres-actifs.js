/* Épreuve de l'étape « Amplificateur opérationnel et filtres actifs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      contre: { prompt: "Un TL081 (A₀ = 2\u00a0×\u00a010⁵, f_T = 3\u00a0MHz) est monté en non-inverseur avec R₁ = 1\u00a0kΩ et R₂ = 99\u00a0kΩ. Que valent son gain à basse fréquence et sa fréquence de coupure ?",
        options: { a: "Environ 99,95, soit 0,05\u00a0% sous 100, et une coupure vers 30\u00a0kHz.", b: "Exactement 100, sans limite de fréquence.", c: "2\u00a0×\u00a010⁵, puisque le gain de l'amplificateur ne change pas.", d: "Environ 99, et une coupure à 3\u00a0MHz." },
        hint: "β = R₁/(R₁ + R₂) = 1/100 ; G = (1/β)/(1 + 1/(A₀β)), coupure ≈ β f_T.",
        why: "A₀β = 2\u00a0000, donc G = 100/(1 + 1/2\u00a0000) ≈ 99,95. Le produit gain × bande donne β f_T = 3\u00a0MHz/100 = 30\u00a0kHz. Leçon « Amplificateur opérationnel idéal et montages linéaires »." },
      masse: { prompt: "Un capteur de résistance interne 10\u00a0kΩ attaque un inverseur avec R₁ = 10\u00a0kΩ et R₂ = 100\u00a0kΩ. Quel gain mesure-t-on entre la force électromotrice du capteur et la sortie ?",
        options: { a: "\u221210, le rapport R₂/R₁.", b: "\u22125 : la résistance du capteur s'ajoute à R₁.", c: "+11, comme un non-inverseur.", d: "\u2212100 : la masse virtuelle annule la résistance du capteur." },
        why: "L'entrée \u2212 est une masse virtuelle : le courant vaut e/(10\u00a0kΩ + 10\u00a0kΩ) et traverse R₂, donc v_s = \u2212100/20 × e = \u22125e. Un non-inverseur ne prendrait aucun courant au capteur. Leçon « Amplificateur opérationnel idéal et montages linéaires »." },
      balayage: { prompt: "Un TL081 (vitesse de balayage 20\u00a0V·µs⁻¹) doit sortir une sinusoïde de 10\u00a0V d'amplitude. Jusqu'à quelle fréquence le peut-il sans la déformer en triangle ?",
        options: { a: "Jusqu'à 3\u00a0MHz, son produit gain × bande.", b: "Jusqu'à 2\u00a0MHz.", c: "Jusqu'à 320\u00a0kHz environ.", d: "Jusqu'à 32\u00a0kHz environ." },
        hint: "La pente maximale d'une sinusoïde d'amplitude V est 2πfV.",
        why: "Il faut 2πf × 10\u00a0V ≤ 20\u00a0V·µs⁻¹, soit f ≤ 20\u00a0×\u00a010⁶/(2π × 10) ≈ 318\u00a0kHz. Cette limite ne dépend que de l'amplitude de sortie, pas du gain. Leçon « Amplificateur opérationnel idéal et montages linéaires »." },
      cascade: { prompt: "Pourquoi peut-on multiplier les fonctions de transfert de deux filtres actifs mis à la suite, et pas celles de deux cellules RC passives ?",
        options: { a: "Parce que les filtres actifs n'ont pas de condensateur.", b: "Parce que l'amplificateur ajoute du gain qui compense les pertes.", c: "Parce que les filtres actifs sont du deuxième ordre.", d: "Parce que la sortie d'un étage bouclé a une impédance très faible devant l'entrée du suivant : elle ne se laisse pas tirer." },
        why: "Deux cellules RC identiques donnent 1/3 à ω = 1/(RC) au lieu du produit 1/2 : la seconde charge la première. La résistance de sortie d'un étage bouclé est celle de l'amplificateur divisée par 1 + Aβ, moins de 1\u00a0Ω à 1\u00a0kHz. Leçon « Filtres actifs et diagrammes de Bode »." },
      bode: { prompt: "Un passe-bas de Sallen–Key de Butterworth (Q = 1/√2) coupe à f₀ = 1\u00a0kHz. Que lit-on sur son diagramme de Bode en f₀ et à 10\u00a0kHz ?",
        options: { a: "\u22123\u00a0dB en f₀, environ \u221240\u00a0dB à 10\u00a0kHz.", b: "0\u00a0dB en f₀, \u221220\u00a0dB à 10\u00a0kHz.", c: "+3\u00a0dB en f₀, \u221240\u00a0dB à 10\u00a0kHz.", d: "\u22126\u00a0dB en f₀, \u221220\u00a0dB à 10\u00a0kHz." },
        why: "En f₀, |H| = Q = 1/√2, soit \u22123\u00a0dB. Au-dessus, la pente est \u221240\u00a0dB par décade : (f₀/f)² = 1/100 à 10\u00a0kHz. Leçon « Filtres actifs et diagrammes de Bode »." },
      schmitt: { prompt: "Un signal porte un parasite de 2\u00a0V crête à crête. On le met en forme par un comparateur à hystérésis non inverseur saturé à ±14\u00a0V. Quel rapport R₁/R₂ choisir ?",
        options: { a: "R₁/R₂ = 0 : un seul seuil suffit.", b: "Un peu plus de 1/14 : la largeur du cycle, 28 R₁/R₂ volts, doit dépasser 2\u00a0V.", c: "R₁/R₂ = 1, pour être sûr.", d: "Moins de 1/14, pour ne pas retarder les basculements." },
        hint: "La largeur du cycle est 2(R₁/R₂)V_sat.",
        why: "Il faut 2 × 14 × R₁/R₂ > 2\u00a0V, donc R₁/R₂ > 1/14 ≈ 0,07. Beaucoup plus large retarde inutilement les basculements ; R₁/R₂ = 1 donnerait des seuils à ±14\u00a0V, jamais atteints par un petit signal. Leçon « Comparateurs et oscillateurs »." },
      astable: { prompt: "Un astable a R₁ = R₂ et RC = 0,1\u00a0ms. Que vaut sa période avec un basculement instantané, puis avec un µA741 qui met 56\u00a0µs à basculer ?",
        options: { a: "0,1\u00a0ms dans les deux cas.", b: "0,22\u00a0ms, puis 0,17\u00a0ms : un amplificateur lent raccourcit la période.", c: "2RC ln 3 ≈ 0,22\u00a0ms, puis nettement plus, vers 0,29\u00a0ms.", d: "0,44\u00a0ms, puis 0,56\u00a0ms." },
        why: "β = 1/2 et T = 2RC ln 3 ≈ 0,22\u00a0ms. Chaque basculement ajoute du temps et retarde la charge du condensateur : la simulation donne 0,29\u00a0ms, 34\u00a0% de plus. Un TL081 s'écarte de moins de 1\u00a0%. Leçon « Comparateurs et oscillateurs »." },
      wien: { prompt: "Un oscillateur à pont de Wien a R = 10\u00a0kΩ et C = 16\u00a0nF. À quelle fréquence oscille-t-il, et quel gain d'amplificateur faut-il ?",
        options: { a: "16\u00a0Hz, avec un gain de 1.", b: "6,25\u00a0kHz, avec un gain de 3.", c: "995\u00a0Hz, avec un gain de 1/3.", d: "Vers 995\u00a0Hz, avec un gain juste supérieur à 3 pour démarrer." },
        hint: "f₀ = 1/(2πRC), et le réseau divise par 3 à cette fréquence.",
        why: "f₀ = 1/(2π × 10⁴ × 1,6\u00a0×\u00a010⁻⁸) ≈ 995\u00a0Hz, où le réseau de Wien ne déphase pas et divise par 3. Un gain un peu supérieur à 3 fait naître l'oscillation ; sans réglage automatique, la saturation l'arrête en la déformant. Leçon « Comparateurs et oscillateurs »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

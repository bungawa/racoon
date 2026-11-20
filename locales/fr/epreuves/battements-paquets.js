/* Épreuve de l'étape « Battements et paquets d'ondes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      accord: { prompt: "On accorde une corde sur un diapason de 330\u00a0Hz. On compte 8 maximums d'intensité en 2\u00a0s. En tendant très légèrement la corde, les battements ralentissent. Quelle était la fréquence de la corde ?",
        options: { a: "326\u00a0Hz : 4 battements par seconde, et tendre la corde (monter sa fréquence) rapproche de 330\u00a0Hz.", b: "334\u00a0Hz : 4 battements par seconde au-dessus du diapason.", c: "322\u00a0Hz : 8 battements par seconde.", d: "On ne peut pas savoir : les battements ne donnent pas le sens de l'écart." },
        hint: "Les battements donnent |f \u2212 330\u00a0Hz| ; le sens de variation quand on tend la corde lève l'ambiguïté.",
        why: "8 maximums en 2\u00a0s : |f \u2212 330| = 4\u00a0Hz. Tendre la corde monte sa fréquence ; si les battements ralentissent, l'écart diminue, donc f était sous 330\u00a0Hz. Seul, le nombre de battements laisserait 326 ou 334\u00a0Hz. Leçon « Somme de deux ondes »." },
      periode: { prompt: "On additionne deux sinusoïdes de même amplitude, de 6\u00a0Hz et de 10\u00a0Hz. Que valent la période des battements et la période de la somme ?",
        options: { a: "Toutes deux 0,25\u00a0s.", b: "Battements toutes les 0,25\u00a0s ; la somme ne se répète exactement qu'au bout de 0,5\u00a0s, deux battements.", c: "Battements toutes les 0,5\u00a0s ; somme non périodique.", d: "Battements toutes les 0,125\u00a0s, à la fréquence moyenne." },
        why: "Les maximums d'intensité arrivent à |10 \u2212 6| = 4 par seconde. La somme est périodique de période 1/pgcd(6, 10) = 0,5\u00a0s : 3 périodes de l'une, 5 de l'autre. Le motif ne revient à chaque battement que si le pgcd égale l'écart. Leçon « Somme de deux ondes »." },
      intensite: { prompt: "Deux ondes d'amplitudes 2 et 1 (même unité) battent. Dans quel rapport l'intensité maximale est-elle à l'intensité minimale ?",
        options: { a: "2, le rapport des amplitudes.", b: "4, le carré du rapport des amplitudes.", c: "9 : (2 + 1)² contre (2 \u2212 1)².", d: "Infini : l'intensité s'annule à chaque battement." },
        hint: "(48.8) : I = A₁² + A₂² + 2A₁A₂ cos(ω₁ \u2212 ω₂)t.",
        why: "I varie de 5 \u2212 4 = 1 à 5 + 4 = 9 autour de la moyenne 5. Elle ne s'annule que pour des amplitudes égales. Le contraste 2A₁A₂/(A₁² + A₂²) vaut 0,8 : un son deux fois plus faible bat encore très nettement. Leçon « Battements et modulation »." },
      fenetre: { prompt: "Un détecteur d'enveloppe reçoit une porteuse de 1\u00a0MHz modulée par un son allant jusqu'à 5\u00a0kHz. Quelle constante de temps choisir pour son circuit de lissage ?",
        options: { a: "0,1\u00a0µs, pour suivre la porteuse.", b: "1\u00a0ms, pour bien lisser.", c: "1\u00a0s, pour n'avoir qu'une valeur moyenne.", d: "Environ 20\u00a0µs : long devant la période de la porteuse, 1\u00a0µs, court devant celle du son le plus aigu, 200\u00a0µs." },
        why: "Plus court que 1\u00a0µs, le détecteur rend la porteuse ; plus long que 200\u00a0µs, il efface les aigus du son, puis tout le son. C'est la même fenêtre que pour entendre des battements : 1/f̄ ≪ τ ≪ 1/|f₁ \u2212 f₂|. Leçon « Battements et modulation »." },
      raies: { prompt: "Une porteuse de 600\u00a0kHz est modulée par deux sons purs : 1\u00a0kHz avec un taux 0,4 et 3\u00a0kHz avec un taux 0,2. Quel est le spectre émis ?",
        options: { a: "Cinq raies : 597, 599, 600, 601 et 603\u00a0kHz, d'amplitudes 0,1 ; 0,2 ; 1 ; 0,2 ; 0,1 ; la bande occupée fait 6\u00a0kHz.", b: "Trois raies : 600, 601 et 603\u00a0kHz.", c: "Une seule raie à 600\u00a0kHz dont l'amplitude varie.", d: "Cinq raies, mais la largeur dépend de la porteuse : 1\u00a0% de 600\u00a0kHz." },
        why: "(48.10) appliquée à chaque son : f_c ± f_m, d'amplitude b/2. La largeur, 2 × 3\u00a0kHz, ne dépend que du son le plus aigu. Leçon « Bandes latérales »." },
      blu: { prompt: "On dispose d'une bande de 30\u00a0kHz pour des liaisons téléphoniques limitées à 3\u00a0kHz de son. Combien de canaux sans recouvrement en modulation d'amplitude ordinaire, puis en bande latérale unique ?",
        options: { a: "10 dans les deux cas.", b: "5, puis 10 : chaque canal occupe 2 × 3 = 6\u00a0kHz avec ses deux bandes, 3\u00a0kHz avec une seule.", c: "10, puis 20.", d: "5 dans les deux cas : la porteuse occupe la même place." },
        why: "Les deux bandes latérales portent la même information ; n'en garder qu'une divise la largeur par deux. La porteuse, une seule raie, n'occupe pas de largeur, mais consomme au moins les deux tiers de la puissance. Leçon « Bandes latérales »." },
      vitesses: { prompt: "Une onde radio traverse un plasma d'électrons libres à une pulsation double de la pulsation plasma, ω = 2ω_p. Que valent ses vitesses de phase et de groupe ?",
        options: { a: "c toutes les deux : le plasma est transparent.", b: "1,155c pour le groupe et 0,866c pour la phase.", c: "Phase 1,155c, groupe 0,866c : n = √(1 \u2212 1/4) = 0,866, vp = c/n, vg = cn.", d: "Phase 0,866c, groupe 0,5c." },
        hint: "ω² = ω_p² + k²c² ; vp = ω/k et vp·vg = c².",
        why: "k = √(ω² \u2212 ω_p²)/c = √3 ω_p/c, d'où vp = 2c/√3 = 1,155c et vg = c²/vp = 0,866c. Un signal, une modulation, va à vg < c ; seules les crêtes dépassent c, et elles ne portent rien. Leçon « Trains d'ondes localisés »." },
      impulsion: { prompt: "Un radar veut émettre des impulsions de 0,1\u00a0µs. Quelle largeur de spectre lui faut-il au moins, et que deviennent ces impulsions dans un milieu dispersif ?",
        options: { a: "Aucune largeur : une seule fréquence assez haute suffit, et l'impulsion garde sa forme.", b: "De l'ordre de 10\u00a0kHz, et l'impulsion va à la vitesse de phase.", c: "De l'ordre de 100\u00a0MHz, et l'impulsion va à c quel que soit le milieu.", d: "De l'ordre de 10\u00a0MHz ; dans un milieu dispersif, l'enveloppe avance à la vitesse de groupe et s'étale si ω(k) n'est pas linéaire sur cette largeur." },
        why: "Durée × largeur du spectre ~ 1 : 1/(0,1\u00a0µs) = 10\u00a0MHz. Une seule fréquence ne fait qu'une onde sans début ni fin. Plus l'impulsion est brève, plus son spectre est large, et plus la dispersion la déforme. Leçon « Trains d'ondes localisés »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

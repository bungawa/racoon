/* Épreuve de l'étape « Sons musicaux et série de Fourier » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      periode: { prompt: "Une corde idéale de 0,50\u00a0m, fixée aux deux bouts, porte des ondes à 300\u00a0m·s⁻¹. On la pince. Quelle est la période du son ?",
        options: { a: "3,33\u00a0ms : un aller-retour, 2L/c ; la note est à 300\u00a0Hz.", b: "1,67\u00a0ms : un aller simple, L/c.", c: "6,67\u00a0ms : deux allers-retours.", d: "Elle dépend du point pincé." },
        hint: "Combien de réflexions faut-il pour remettre l'onde à l'endroit ?",
        why: "Chaque réflexion sur un bout fixe retourne l'onde ; après deux, sur un trajet de 2L = 1\u00a0m, la corde est dans son état initial : T = 1/300\u00a0s. Le point pincé change le motif, pas sa période. Leçon « Sons musicaux »." },
      bruit: { prompt: "Un signal est la somme d'une note de valeur efficace 0,8 et d'un bruit de valeur efficace 0,6, sans lien entre eux. Que vaut à peu près sa ressemblance r avec lui-même décalé d'une période ?",
        options: { a: "0,8, la part de la note en amplitude.", b: "0,64 : la part de la puissance qui se répète, 0,64/(0,64 + 0,36).", c: "1, puisque la note se répète.", d: "0, puisque le bruit ne se répète pas." },
        why: "Décalée d'une période, la note se superpose à elle-même, le bruit à un bruit sans lien. Seule la puissance de la note contribue : r ≈ 0,8²/(0,8² + 0,6²) = 0,64. Leçon « Sons musicaux »." },
      somme: { prompt: "Un son contient seulement 300\u00a0Hz et 450\u00a0Hz. Quelle est sa période ?",
        options: { a: "3,33\u00a0ms, celle de 300\u00a0Hz.", b: "2,22\u00a0ms, celle de 450\u00a0Hz.", c: "6,67\u00a0ms : ce sont les harmoniques 2 et 3 d'un fondamental de 150\u00a0Hz, absent mais qui fixe la période.", d: "Il n'est pas périodique." },
        hint: "Cherchez la plus grande fréquence dont 300 et 450 sont des multiples.",
        why: "300 = 2 × 150 et 450 = 3 × 150. Au bout de 1/150\u00a0s, la première a fait 2 tours, la seconde 3 : la somme se répète, et aucun temps plus court ne convient. Leçon « Série de Fourier »." },
      phase: { prompt: "Écrivez 2 cos(ωt + π/3) sous la forme a cos ωt + b sin ωt.",
        options: { a: "a = 1,73, b = 1.", b: "a = 2, b = 0 : la phase ne compte pas.", c: "a = 1, b = 1,73.", d: "a = 1, b = \u22121,73." },
        why: "Par (50.1), a = 2 cos(π/3) = 1 et b = \u22122 sin(π/3) = \u22121,73. Le signe moins vient de cos(x + y) = cos x cos y \u2212 sin x sin y. Leçon « Série de Fourier »." },
      coins: { prompt: "Le créneau et le triangle n'ont que des harmoniques impairs. Que vaut l'amplitude de l'harmonique 3 rapportée à celle du fondamental, pour chacun ?",
        options: { a: "1/3 pour le créneau, qui a des sauts ; 1/9 pour le triangle, qui n'a que des angles.", b: "1/3 pour les deux.", c: "1/9 pour le créneau, 1/3 pour le triangle.", d: "1/2 pour les deux." },
        why: "À un saut, les amplitudes tombent en 1/n (4/(nπ) pour le créneau) ; à un angle, en 1/n² (8/(n²π²) pour le triangle). C'est pourquoi le triangle sonne presque pur. Leçon « Série de Fourier »." },
      pincee: { prompt: "On pince une corde au cinquième de sa longueur. Quels harmoniques manquent dans la force qu'elle exerce sur le chevalet ?",
        options: { a: "Les harmoniques pairs.", b: "Les harmoniques 5, 10, 15… : le point pincé est un de leurs nœuds.", c: "Le fondamental.", d: "Aucun." },
        why: "Les amplitudes sont proportionnelles à sin(nπp/L)/n, nulles quand np/L est entier : n = 5, 10, 15… Leçons « Série de Fourier » et « Ondes confinées et fréquences propres »." },
      quinte: { prompt: "Sur un la à 440\u00a0Hz, on joue la quinte tempérée, 440 × 1,4983 = 659,26\u00a0Hz (sept demi-tons tempérés). Quel battement lent entend-on ?",
        options: { a: "Aucun : la quinte tempérée est juste.", b: "0,74\u00a0Hz, comme à 220\u00a0Hz.", c: "1,49\u00a0Hz, entre l'harmonique 3 du la (1320\u00a0Hz) et l'harmonique 2 de la quinte (1318,5\u00a0Hz).", d: "219\u00a0Hz, l'écart des fondamentaux." },
        hint: "Quels harmoniques coïncideraient si la quinte était juste ?",
        why: "En accord juste, 3f₁ = 2f₂. Tempérée, 2f₂ est 0,11\u00a0% trop bas : 1320 \u2212 1318,51 = 1,49\u00a0Hz. Le battement double à chaque octave : 0,74\u00a0Hz à 220\u00a0Hz. Leçon « Timbre et consonance »." },
      phases: { prompt: "Un orgue garde les amplitudes de ses huit harmoniques et tire leurs phases au hasard. Que change-t-il ?",
        options: { a: "La hauteur de la note.", b: "La puissance moyenne.", c: "Rien de mesurable.", d: "La forme du motif et sa crête ; la puissance ½ΣAₙ² et, à peu de chose près, le son entendu restent les mêmes." },
        why: "Les phases n'entrent pas dans la puissance ni dans les fréquences. Elles déplacent les harmoniques les uns par rapport aux autres, donc changent le motif et sa crête : un micro le voit, l'oreille à peine. Leçon « Timbre et consonance »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

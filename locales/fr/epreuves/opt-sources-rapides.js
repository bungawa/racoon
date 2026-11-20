/* Épreuve de l'étape « Rayonnement de sources rapides » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      recu: { prompt: "Une charge oscille à la pulsation ω₀, mesurée par l'observateur, perpendiculairement à la ligne de visée, tout en venant droit vers lui à 0,8c. À quelle pulsation reçoit-il le champ ?",
        options: { a: "5ω₀.", b: "ω₀/0,6 ≈ 1,67ω₀.", c: "1,8ω₀.", d: "ω₀/5." },
        hint: "Utilisez (34.4a) avec dz/dτ = \u22120,8c.",
        why: "dt/dτ = 1 \u2212 0,8 = 0,2 : l'observateur voit le mouvement cinq fois plus vite. ω₀ est ici la pulsation mesurée par l'observateur ; pour une pulsation propre, il faudrait ajouter la dilatation du temps, dans « L’effet Doppler ». Leçon « Les sources en mouvement »." },
      profil: { prompt: "Une charge oscille perpendiculairement à la ligne de visée, à 0,99c au plus, sans s'approcher ni s'éloigner. Quel champ reçoit un observateur lointain sur cette ligne ?",
        options: { a: "Une impulsion brève par période.", b: "Un champ sinusoïdal à ω₀, sans déformation.", c: "Aucun champ.", d: "Un champ sinusoïdal à 7ω₀, γ fois plus rapide." },
        why: "z reste nul : le retard est constant, et (34.3) reproduit l'accélération transverse décalée. Seule la vitesse le long de la visée déforme le champ. Leçon « Les sources en mouvement »." },
      critere: { prompt: "Quel nombre décide si la formule à retard constant, (28.6) de « Le rayonnement », suffit pour une source qui se déplace ?",
        options: { a: "La vitesse totale de la source sur c, au carré.", b: "L'accélération de la source.", c: "La vitesse de la source le long de la ligne de visée, sur c.", d: "La distance de la source sur la longueur d'onde." },
        hint: "Qu'est-ce qui fait varier le retard ?",
        why: "Le retard varie comme z(τ)/c : seul compte (1/c) dz/dτ, au premier ordre. Ce n'est pas un effet de relativité, qui viendrait en (v/c)². Leçons « Les sources en mouvement » et « Trouver le mouvement apparent »." },
      roue: { prompt: "Une charge parcourt un cercle de rayon R à 0,8c. Quelle roue trace la courbe dépliée de son mouvement apparent ?",
        options: { a: "Une roue de rayon R, la charge sur la jante, qui roule à 0,8c.", b: "Une roue de rayon 0,8R, la charge sur la jante.", c: "Une roue de rayon R/0,8, la charge sur la jante.", d: "Une roue de rayon 1,25R qui roule à c, la charge à R de son centre." },
        why: "Le point qui tourne à Ω et va à c est à R/β = 1,25R du centre. La charge, plus près du centre, trace une cycloïde raccourcie : ses pointes sont arrondies tant que β < 1. Leçon « Trouver le mouvement apparent »." },
      pic: { prompt: "Sur un cercle parcouru à 0,95c, combien de fois le pic du champ dépasse-t-il le champ calculé avec un retard constant ?",
        options: { a: "400 fois.", b: "20 fois.", c: "3,2 fois.", d: "8 000 fois." },
        hint: "(34.5b) au point de rebroussement.",
        why: "1/(1 \u2212 0,95)² = 400 : une compression du temps d'un facteur 20, au carré parce que le champ suit une dérivée seconde. Leçon « Trouver le mouvement apparent »." },
      critique: { prompt: "Sur le même rayon, on fait passer γ de 1 000 à 3 000. Comment change la longueur d'onde critique λc ?",
        options: { a: "Elle est divisée par 9.", b: "Elle est divisée par 27.", c: "Elle est divisée par 3.", d: "Elle est divisée par 81." },
        why: "λc = (4π/3)R/γ³, par (34.5d) : la durée de l'impulsion varie comme 1/γ³, et non comme le carré de la compression, qui donnerait 1/γ⁴. Leçons « Trouver le mouvement apparent » et « Le rayonnement synchrotron »." },
      rayon: { prompt: "Des électrons de 3 GeV circulent dans des aimants de 1,5 T. Quel est le rayon de courbure ?",
        options: { a: "0,67\u00a0m.", b: "2\u00a0m.", c: "6,7\u00a0m.", d: "20\u00a0m." },
        hint: "(34.9) de « Le rayonnement synchrotron », avec pc ≈ W.",
        why: "R = pc/(c q_e B) = 3 × 10⁹/(3 × 10⁸ × 1,5) ≈ 6,7\u00a0m. À 3 GeV, mc² est 6 000 fois plus petit que W : pc = W à 10⁻⁸ près. Leçon « Le rayonnement synchrotron »." },
      perte: { prompt: "On double l'énergie des électrons d'un anneau sans changer son rayon. Comment change l'énergie rayonnée par tour ?",
        options: { a: "Elle double.", b: "Elle est multipliée par 4.", c: "Elle est multipliée par 8.", d: "Elle est multipliée par 16." },
        why: "U₀ = q²β³γ⁴/(3ε₀R), avec β ≈ 1 : U₀ varie comme γ⁴, donc comme W⁴ à rayon fixe. Les cavités doivent rendre seize fois plus d'énergie à chaque tour. Leçon « Le rayonnement synchrotron »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Coefficients de Fourier et énergie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      marche: { prompt: "Un signal de période T vaut 2\u00a0V pendant la première moitié de la période et 0 pendant la seconde. Que valent a₀ et b₁ ?",
        options: { a: "a₀ = 1\u00a0V et b₁ = 4/π\u00a0V ≈ 1,27\u00a0V : le signal est 1\u00a0V plus un créneau de crête 1\u00a0V.", b: "a₀ = 2\u00a0V et b₁ = 0.", c: "a₀ = 1\u00a0V et b₁ = 2/π\u00a0V ≈ 0,64\u00a0V.", d: "a₀ = 0 et b₁ = 8/π\u00a0V ≈ 2,55\u00a0V." },
        hint: "Écrivez le signal comme sa moyenne plus une forme de moyenne nulle.",
        why: "a₀ est la moyenne, 1\u00a0V. Ce qui reste vaut +1\u00a0V puis \u22121\u00a0V : un créneau de crête 1\u00a0V, dont b₁ = 4/π\u00a0V. Leçon « Coefficients de Fourier »." },
      fenetre: { prompt: "Pour mesurer a₃ d'un son de fondamental 200\u00a0Hz, on moyenne f(t) cos(2π × 600\u00a0Hz × t) pendant 12,5\u00a0ms. Le résultat est-il exact ?",
        options: { a: "Oui : toute durée convient, pourvu qu'on multiplie par la bonne référence.", b: "Non : 12,5\u00a0ms font 2,5 périodes du son ; les produits croisés ne s'annulent que sur un nombre entier de périodes.", c: "Oui, car la fenêtre contient 7,5 périodes de la référence.", d: "Non : il faudrait moyenner pendant exactement 1\u00a0s." },
        why: "La période du son est 5\u00a0ms. Sur 10\u00a0ms ou 15\u00a0ms, la méthode est exacte ; sur 12,5\u00a0ms, chaque harmonique laisse un reste de l'ordre de T/(πΔ). Leçon « Coefficients de Fourier »." },
      points: { prompt: "Un son contient des harmoniques jusqu'au rang 20. Pour calculer a₅ par une somme sur m échantillons d'une période, sans aucune erreur, combien de points faut-il au moins ?",
        options: { a: "10, deux par rang mesuré.", b: "20, autant que le plus haut rang.", c: "26 : il faut m > 20 + 5, sinon un rang présent se confond avec le rang 5.", d: "40, toujours le double du plus haut rang." },
        hint: "Avec m points, le rang k se confond avec le rang |k \u2212 m|.",
        why: "Avec m = 25, le rang 20 se replie sur |20 \u2212 25| = 5 et fausse a₅. Avec m = 26, il tombe sur 6, sans effet sur a₅. Pour tous les rangs à la fois, il faudrait m > 40. Leçon « Coefficients de Fourier »." },
      puissance: { prompt: "Une tension se compose de 3\u00a0V continus et de deux harmoniques d'amplitudes 4\u00a0V et 2\u00a0V. Quelle puissance moyenne reçoit une résistance de 10\u00a0Ω ?",
        options: { a: "8,1\u00a0W, soit (3 + 4 + 2)²/10.", b: "2,9\u00a0W, soit (3² + 4² + 2²)/10.", c: "0,9\u00a0W : seul le continu dissipe en moyenne.", d: "1,9\u00a0W, soit (3² + 4²/2 + 2²/2)/10." },
        why: "Par le théorème de Parseval, ⟨u²⟩ = a₀² + Σ Aₙ²/2 = 9 + 8 + 2 = 19\u00a0V² ; P = 19/10 = 1,9\u00a0W. Les harmoniques n'interfèrent pas entre eux en moyenne. Leçon « Énergie et théorème de Parseval »." },
      reste: { prompt: "Quelle part de la puissance d'un créneau reste en dehors de ses harmoniques 1, 3 et 5 ?",
        options: { a: "6,7\u00a0%, la racine carrée de cette part étant l'écart efficace de la somme des trois.", b: "19\u00a0%, ce qui manque au seul fondamental.", c: "0 : trois harmoniques suffisent.", d: "9\u00a0%, le dépassement de Gibbs." },
        why: "Les parts sont (8/π²)(1 + 1/9 + 1/25) = 93,3\u00a0% ; il reste 6,7\u00a0%, et l'écart efficace vaut √0,067 = 0,26. Le dépassement de Gibbs mesure autre chose, l'écart ponctuel près du saut. Leçon « Énergie et théorème de Parseval »." },
      distorsion: { prompt: "Un amplificateur obéit à x_s = K(x + εx²), avec ε = 0,04\u00a0V⁻¹. Quel est son taux de distorsion harmonique pour une sinusoïde d'entrée de 0,5\u00a0V d'amplitude ?",
        options: { a: "4\u00a0%.", b: "1\u00a0% : εA/2.", c: "2\u00a0% : εA.", d: "0,5\u00a0%." },
        why: "L'harmonique 2 vaut KεA²/2 et le fondamental KA : rapport εA/2 = 0,04 × 0,5/2 = 1\u00a0%. Il double si l'amplitude double. Leçon « Réponses non linéaires »." },
      melange: { prompt: "Un récepteur mélange une station à 1\u202f000\u00a0kHz et un oscillateur local à 1\u202f455\u00a0kHz dans un composant dont la réponse contient un terme en x². Quelles fréquences sortent du mélangeur ?",
        options: { a: "1\u202f000 et 1\u202f455\u00a0kHz seulement.", b: "2\u202f455\u00a0kHz seulement.", c: "Les deux d'entrée, et 0, 455, 2\u202f000, 2\u202f455 et 2\u202f910\u00a0kHz.", d: "727,5\u00a0kHz, la moitié de la somme." },
        why: "Le carré de la somme donne la composante continue, les doubles 2\u202f000 et 2\u202f910\u00a0kHz, la somme 2\u202f455\u00a0kHz et la différence 455\u00a0kHz, que le récepteur garde. Leçon « Réponses non linéaires »." },
      phases: { prompt: "Deux sons ont les mêmes amplitudes harmoniques Aₙ mais des phases différentes. Qu'ont-ils en commun à coup sûr ?",
        options: { a: "La même forme d'onde.", b: "La même crête.", c: "Les mêmes coefficients aₙ et bₙ.", d: "La même puissance moyenne et la même valeur efficace." },
        why: "La puissance moyenne ne dépend que des Aₙ² (théorème de Parseval). La forme, la crête et le partage entre aₙ et bₙ dépendent des phases. Leçons « Coefficients de Fourier » et « Énergie et théorème de Parseval »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

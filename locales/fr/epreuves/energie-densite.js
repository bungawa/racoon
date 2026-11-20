/* Épreuve de l'étape « Énergie électrostatique et densité d'énergie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      goutte: { prompt: "Une goutte uniformément chargée (charge Q, rayon a) se divise en deux gouttes identiques, de même densité de charge, qui s'éloignent l'une de l'autre. Que devient l'énergie électrostatique totale, une fois les gouttes très éloignées ?",
        options: { a: "Elle diminue d'environ 37\u00a0% : chaque goutte a Q/2 et un rayon a/2^(1/3).", b: "Elle ne change pas : la charge totale est la même.", c: "Elle est divisée par 4, comme Q².", d: "Elle augmente, car il a fallu séparer les gouttes." },
        hint: "Appliquez (8.7) à chaque goutte : le volume est divisé par 2, le rayon par 2^(1/3).",
        why: "2 × (3/5)(Q/2)²/(4πε0 a 2^(\u22121/3)) = 2^(1/3)/2 ≈ 0,63 fois l'énergie de départ. L'énergie de la paire tend vers zéro avec la distance. La différence est devenue énergie cinétique : c'est le ressort de la fission des noyaux lourds. Leçon « Énergie d'une distribution de charges, sphère uniforme »." },
      couches: { prompt: "On construit une boule uniforme couche par couche. Quelle part de l'énergie totale coûtent les couches situées dans les 10\u00a0% extérieurs du rayon, de 0,9a à a ?",
        options: { a: "10\u00a0%, comme l'épaisseur.", b: "Environ 41\u00a0% : U(r) croît comme r⁵, et 1 \u2212 0,9⁵ ≈ 0,41.", c: "Environ 27\u00a0%, comme le volume de cette couche.", d: "Presque rien, car le champ est nul au bord." },
        why: "Le coût de la couche d'épaisseur dr croît comme r⁴ : elle est plus grande et arrive sur une boule plus chargée. La part du volume serait 1 \u2212 0,9³ ≈ 27\u00a0%. Leçon « Énergie d'une distribution de charges, sphère uniforme »." },
      triangle: { prompt: "Trois charges de 1\u00a0nC sont aux sommets d'un triangle équilatéral de 1\u00a0cm de côté. Quel travail a-t-il fallu fournir pour les amener de l'infini ?",
        options: { a: "Environ 0,9\u00a0µJ : une seule paire compte.", b: "Environ 1,8\u00a0µJ : deux paires.", c: "Environ 2,7\u00a0µJ : trois paires, chacune q²/(4πε0d).", d: "Environ 5,4\u00a0µJ : chaque paire dans les deux sens." },
        why: "(8.3) : un terme par paire. 3 × 8,99 × 10⁹ × 10⁻¹⁸/0,01 ≈ 2,7 × 10⁻⁶ J, quel que soit l'ordre d'arrivée. Leçon « Énergie d'une distribution de charges, sphère uniforme »." },
      grains: { prompt: "Une boule uniforme est remplacée par 125 charges ponctuelles égales, une au centre de chacune de 125 cellules de même volume. La somme (8.3) sur leurs paires est :",
        options: { a: "égale à (8.7), car la charge totale est la même.", b: "infinie, à cause des charges ponctuelles.", c: "supérieure à (8.7) de 1/125.", d: "inférieure à (8.7) de quelques pour cent, de l'ordre de 125^(\u22122/3) ≈ 4\u00a0%." },
        hint: "Que compte (8.7), pour chaque cellule, que la somme sur les paires ne compte pas ?",
        why: "Il manque l'énergie de chaque grain avec lui-même, s'il était étalé dans sa cellule : environ N^(\u22122/3) de (8.7). (8.3) ne compte pas les énergies propres, même infinies. Leçon « Énergie d'une distribution de charges, sphère uniforme »." },
      conducteur: { prompt: "Une sphère conductrice porte une charge Q. Quelle part de son énergie, comptée par ε0E²/2, se trouve à l'intérieur de la sphère ?",
        options: { a: "Aucune : le champ y est nul, toute l'énergie est dans le champ extérieur.", b: "1/6, comme pour la boule uniforme.", c: "La moitié.", d: "Toute, puisque les charges y sont." },
        why: "La charge est en surface, le champ est nul dedans. Dehors, le champ d'une charge ponctuelle contient Q²/(8πε0a), toute l'énergie de la sphère. La boule uniforme, elle, a un champ intérieur qui porte 1/6 de son énergie. Leçon « Énergie dans le champ électrostatique »." },
      densite: { prompt: "Entre les armatures d'un condensateur dans le vide, le champ vaut 1\u00a0MV·m⁻¹. Quelle est la densité d'énergie ?",
        options: { a: "Environ 10⁶ J·m⁻³.", b: "Environ 4,4\u00a0J·m⁻³.", c: "Environ 8,9\u00a0J·m⁻³.", d: "Environ 4,4 × 10⁻⁶ J·m⁻³." },
        why: "ε0E²/2 = 8,85 × 10⁻¹² × 10¹²/2 ≈ 4,4\u00a0J·m⁻³. La réponse c oublie le facteur 1/2, la réponse d confond MV et V. Leçon « Énergie dans le champ électrostatique »." },
      bilan: { prompt: "On intègre ε0E²/2 à l'intérieur d'une sphère de rayon 3a centrée sur une boule uniformément chargée de rayon a. Quelle part de l'énergie totale trouve-t-on ?",
        options: { a: "100\u00a0% : toute la charge est dedans.", b: "1/6, l'énergie du champ intérieur seulement.", c: "Environ 72\u00a0% : il manque Q²/(8πε0·3a), l'énergie du champ au-delà de 3a.", d: "Environ 28\u00a0%." },
        hint: "Le champ d'une charge ponctuelle contient Q²/(8πε0r) au-delà de r.",
        why: "Total 3/5, au-delà de 3a : 1/6 (en unités de Q²/(4πε0a)) ; (3/5 \u2212 1/6)/(3/5) ≈ 0,72. ½∫ρφ dV, elle, donnerait déjà 100\u00a0% : le terme de surface φQ/2 fait la différence. Leçon « Énergie dans le champ électrostatique »." },
      proton: { prompt: "Deux protons, pris comme ponctuels, sont à 2\u00a0fm l'un de l'autre. L'énergie ε0E²/2 de leur champ total est infinie. Qu'est-ce qui détermine la force entre eux ?",
        options: { a: "Rien : la force est infinie elle aussi.", b: "La somme des deux énergies propres, qui dépend de la distance.", c: "Seulement le champ entre les deux protons.", d: "Le terme croisé ε0E1·E2, dont l'intégrale vaut e²/(4πε0d) ≈ 0,72\u00a0MeV et varie avec d ; les énergies propres, infinies, n'en dépendent pas." },
        why: "La force est la dérivée de l'énergie par rapport à la distance. Les énergies propres de charges rigides sont constantes ; le terme croisé, fini, donne la loi de Coulomb. 1,44\u00a0MeV·fm/2\u00a0fm = 0,72\u00a0MeV. Leçon « Énergie d'une charge ponctuelle »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

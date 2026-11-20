/* Épreuve de l'étape « Composition des moments cinétiques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      preparation: { prompt: "Dans l'expérience ¹²C + ¹²C → ²⁰Ne* + α₁, pourquoi ne garde-t-on que les α₁ émises dans l'axe du faisceau ?",
        options: { a: "Pour que le néon excité soit dans l'état m = 0 selon l'axe : toutes les particules ont un spin nul, et un mouvement le long de z n'a pas de moment orbital selon z.", b: "Parce que ce sont les plus énergétiques.", c: "Pour éviter le fond de rayonnement.", d: "Parce que α₁ ne peut partir que dans l'axe." },
        why: "La sélection fixe l'état de départ. Sans elle, plusieurs m contribueraient et la loi angulaire ne serait plus un simple carré de polynôme de Legendre. Leçon « La mesure d'un spin nucléaire »." },
      loi: { prompt: "Les coïncidences α₂ sont maximales à 0°, nulles vers 54,7° et de nouveau non nulles à 90°. Quel est le spin de l'état ?",
        options: { a: "1.", b: "3.", c: "2 : P₂(cos θ) = (3cos²θ \u2212 1)/2 s'annule en cos²θ = 1/3, soit 54,7°.", d: "0." },
        why: "P₂ a un seul zéro entre 0° et 90°, à 54,7°, et vaut \u22121/2 à 90°. P₁ s'annulerait à 90°, P₃ à 39,2° et à 90°. Leçon « La mesure d'un spin nucléaire »." },
      valeurs: { prompt: "Un électron de spin 1/2 et un noyau de spin 3/2 : quelles valeurs du moment cinétique total, et combien d'états ?",
        options: { a: "J = 2 seulement ; 5 états.", b: "J = 1 et 2 ; 8 états, 3 + 5.", c: "J = 1/2 et 3/2 ; 6 états.", d: "J = 0, 1, 2 ; 9 états." },
        why: "(18.58) : de 3/2 + 1/2 = 2 à 3/2 \u2212 1/2 = 1. Compte : 3 + 5 = 8 = 2 × 4. Leçon « La composition des moments cinétiques »." },
      probabilite: { prompt: "Un deutérium est dans l'état |J = 3/2, M = \u22121/2⟩ = √(1/3)|e,+1/2 ; d,\u22121⟩ + √(2/3)|e,\u22121/2 ; d,0⟩. Quelle est la probabilité que le deutéron soit dans l'état m = 0 ?",
        options: { a: "1/3.", b: "1/2.", c: "1.", d: "2/3." },
        why: "Le deutéron est en m = 0 dans le second terme seulement : (√(2/3))² = 2/3. Leçon « La composition des moments cinétiques »." },
      singulet: { prompt: "Deux spins 1/2 dans l'état (|+ \u2212⟩ \u2212 |\u2212 +⟩)/√2. Quel est leur moment cinétique total ?",
        options: { a: "J = 0 : c'est le singulet, antisymétrique, qu'aucune rotation ne change.", b: "J = 1, puisque M = 0.", c: "J = 1/2.", d: "Il n'est pas défini." },
        why: "La combinaison symétrique de même M appartient au triplet J = 1 ; l'antisymétrique forme le singulet J = 0. Dans l'hydrogène, le passage du triplet au singulet donne la raie à 21 cm. Leçon « La composition des moments cinétiques »." },
      binome: { prompt: "Dans le calcul de la matrice de rotation par 2j spins 1/2, d'où vient le facteur (\u22121)^k de (18.71) ?",
        options: { a: "De la normalisation des états.", b: "De ce qu'un spin parti en bas qui finit en haut apporte le facteur \u2212S, alors qu'un spin parti en haut qui finit en bas apporte +S.", c: "De la parité.", d: "Des polynômes de Legendre." },
        why: "R_y|\u2212⟩ = |\u2212⟩C \u2212 |+⟩S : chaque spin du bas retourné coûte un signe \u2212. Il y en a k dans le terme d'indice k. Leçon « Note 1 sur la matrice de rotation »." },
      parite: { prompt: "Un état excité pair se désexcite vers un état fondamental pair en émettant un photon. Que dit la parité de l'état du photon émis le long de l'axe ?",
        options: { a: "Il est impair : |R_haut⟩ \u2212 |L_bas⟩.", b: "La transition est impossible.", c: "Il n'a pas de parité définie.", d: "Il est pair : |R_haut⟩ + |L_bas⟩ ; c'est une transition dipolaire magnétique, beaucoup plus lente qu'une dipolaire électrique." },
        why: "Pair = pair × parité du photon : le photon emporte une parité +1. À 90°, sa polarisation linéaire est tournée de 90° par rapport au cas impair vers pair. Leçon « Note 2 sur la parité de l'émission de photon »." },
      laporte: { prompt: "Pourquoi les transitions entre orbitales d d'un complexe octaédrique sont-elles faibles ?",
        options: { a: "Parce que les orbitales d sont trop éloignées du noyau.", b: "Parce qu'elles violent la conservation de l'énergie.", c: "Parce qu'elles sont paires vers paires dans une molécule à centre d'inversion : la règle de Laporte interdit la voie dipolaire électrique.", d: "Parce que le cobalt n'absorbe pas la lumière visible." },
        why: "C'est la règle de parité de l'émission de photon appliquée aux molécules centrosymétriques : seules les vibrations, qui brisent un instant la symétrie, rendent la transition un peu permise. Leçon « Note 2 sur la parité de l'émission de photon »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

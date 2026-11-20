/* Épreuve de l'étape « Symétrie et conservation » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      commute: { prompt: "Un système à deux états a pour matrice H = ((E₀, \u2212A), (\u2212A, E₀)). L'échange P = ((0, 1), (1, 0)) est-il une symétrie ? Et pour H′ = ((E₀ + ε, \u2212A), (\u2212A, E₀)) ?",
        options: { a: "Oui pour H, car P·H = H·P ; non pour H′, où le commutateur a des éléments ±ε.", b: "Oui pour les deux : les couplages sont égaux.", c: "Non pour les deux.", d: "Non pour H, oui pour H′." },
        why: "P·H échange les lignes, H·P les colonnes : égaux si H₁₁ = H₂₂ et H₁₂ = H₂₁. Avec ε, la différence vaut ε hors de la diagonale. Leçon « La symétrie en mécanique quantique »." },
      piege: { prompt: "On observe que P(1 → 1) = P(2 → 2) à tout instant dans un système à deux états. Peut-on en conclure que l'échange est une symétrie ?",
        options: { a: "Oui.", b: "Non : pour deux états, ces deux probabilités sont toujours égales, par la conservation de la probabilité ; il faut tester la commutation avec H.", c: "Oui, si les probabilités oscillent.", d: "Non, car elles sont toujours différentes." },
        why: "|U₁₁| = |U₂₂| pour toute matrice unitaire 2 × 2. L'observation ne contraint donc pas la symétrie. Leçon « La symétrie en mécanique quantique »." },
      phase: { prompt: "À t = 0, Q|ψ⟩ = \u2212|ψ⟩, et Q commute avec H. Que vaut Q|ψ(t)⟩ à t = 1 s ?",
        options: { a: "|ψ(t)⟩.", b: "On ne peut pas savoir sans connaître H.", c: "\u2212|ψ(t)⟩ : la phase \u22121 est conservée.", d: "e^(\u2212iEt/ħ)|ψ(t)⟩." },
        why: "Q|ψ(t)⟩ = Q·U|ψ⟩ = U·Q|ψ⟩ = \u2212U|ψ⟩ = \u2212|ψ(t)⟩, quel que soit H pourvu qu'il commute avec Q. Leçon « Symétrie et conservation »." },
      parite: { prompt: "Pourquoi l'inversion P ne peut-elle avoir que les valeurs propres +1 et \u22121 ?",
        options: { a: "Parce qu'elle est hermitienne.", b: "Parce que l'espace a trois dimensions.", c: "Parce que les états sont réels.", d: "Parce que P² = 1 : deux inversions successives ramènent chaque point à sa place." },
        why: "Si P|ψ⟩ = λ|ψ⟩, alors |ψ⟩ = P²|ψ⟩ = λ²|ψ⟩ et λ² = 1. Leçon « Symétrie et conservation »." },
      degen: { prompt: "Un état stationnaire d'un système symétrique par inversion n'a pas de parité définie. Que peut-on en déduire ?",
        options: { a: "Qu'il est dégénéré : un autre état indépendant a la même énergie, et l'inversion les mélange.", b: "Que la parité n'est pas conservée.", c: "Que c'est impossible.", d: "Que son énergie est nulle." },
        why: "P|ψ₀⟩ a la même énergie, (17.21). S'il n'est pas proportionnel à |ψ₀⟩, c'est un autre état de même énergie. On peut alors former |ψ₀⟩ ± P|ψ₀⟩, de parités définies. Leçon « Symétrie et conservation »." },
      impulsion: { prompt: "Un état est multiplié par e^(ika) dans toute translation de a, avec k = 5 × 10⁹ m⁻¹. Quelle quantité de mouvement porte-t-il ?",
        options: { a: "5 × 10⁹ kg·m·s⁻¹.", b: "ħk ≈ 5,3 × 10⁻²⁵ kg·m·s⁻¹.", c: "h/k.", d: "Aucune : une phase n'est pas mesurable." },
        why: "p = ħk = 1,055 × 10⁻³⁴ × 5 × 10⁹ ≈ 5,3 × 10⁻²⁵ kg·m·s⁻¹. Une phase globale est invisible, mais la façon dont elle dépend du décalage est une grandeur physique. Leçon « Les lois de conservation quantiques »." },
      rotation: { prompt: "Un état est multiplié par \u22121 dans une rotation de 2π autour de z. Que peut valoir sa composante Jz ?",
        options: { a: "Un multiple entier de ħ.", b: "0.", c: "Un multiple demi-entier de ħ, comme ±ħ/2 : e^(2iπm) = \u22121 impose m demi-entier.", d: "N'importe quelle valeur." },
        why: "e^(imφ) en φ = 2π vaut \u22121 si m est demi-entier. C'est le cas du spin 1/2. Leçon « Les lois de conservation quantiques »." },
      cristal: { prompt: "Dans un cristal de pas b = 0,3 nm, deux états d'un électron ont k = 1 × 10⁹ m⁻¹ et k′ = k + 2π/b. Peut-on les distinguer par une translation du réseau ?",
        options: { a: "Oui : leurs quantités de mouvement diffèrent.", b: "Oui, par une translation d'un demi-pas.", c: "Non, sauf à basse température.", d: "Non : pour toute translation de n pas, e^(ik′nb) = e^(iknb) ; la symétrie ne fixe k qu'à 2π/b ≈ 2,1 × 10¹⁰ m⁻¹ près." },
        why: "Le cristal n'est symétrique que pour des multiples de b, et e^(i2πn) = 1. Un demi-pas n'est pas une symétrie. Leçon « Les lois de conservation quantiques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Théorie cinétique des gaz » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      dilue: { prompt: "De l'argon à 300\u00a0K sous 10⁵\u00a0Pa contient 2,4 × 10²⁵ atomes par m³. Leur diamètre vaut environ 0,3\u00a0nm. Peut-on lui appliquer la théorie cinétique de ce chapitre ?",
        options: { a: "Oui : la distance moyenne entre atomes, (n*)^(\u22121/3) ≈ 3,5\u00a0nm, vaut une dizaine de diamètres ; le gaz est dilué, et λ/d ≈ 0,005 le rend classique.", b: "Non : 2,4 × 10²⁵ atomes par m³, c'est un gaz dense.", c: "Non : l'argon est trop lourd pour être un gaz parfait.", d: "Oui, mais seulement au-dessus de 1\u00a0000\u00a0K." },
        hint: "Comparez le diamètre à la distance moyenne d = (n*)^(\u22121/3).",
        why: "(2,4 × 10²⁵)^(\u22121/3) ≈ 3,5 × 10⁻⁹\u00a0m : σ/d ≈ 0,09. L'onde thermique de l'argon à 300\u00a0K, 1,6 × 10⁻¹¹\u00a0m, est bien plus petite que d. Les deux conditions de la leçon « Propriétés de la matière » sont remplies ; les corrections de Van der Waals restent sous 0,3 %." },
      pression: { prompt: "Du diazote à 300\u00a0K : n* = 2,41 × 10²⁵\u00a0m⁻³, masse d'une molécule 4,65 × 10⁻²⁶\u00a0kg, vitesse quadratique moyenne 517\u00a0m·s⁻¹. Quelle pression exerce-t-il ?",
        options: { a: "3,0 × 10⁵\u00a0Pa : n*m⟨v²⟩.", b: "1,0 × 10⁵\u00a0Pa : n*m⟨v²⟩/3.", c: "1,5 × 10⁵\u00a0Pa : n*m⟨v²⟩/2.", d: "5,8 × 10²\u00a0Pa : n*m√⟨v²⟩/3." },
        why: "(39.5) et (39.7) : P = n*m⟨v_x²⟩ = n*m⟨v²⟩/3 = 2,41 × 10²⁵ × 4,65 × 10⁻²⁶ × 517²/3 ≈ 1,0 × 10⁵\u00a0Pa. Le facteur 1/3 vient de l'isotropie : seule la composante v_x compte pour le piston. Leçon « La pression d'un gaz »." },
      adiabatique: { prompt: "On comprime lentement 2\u00a0L d'argon à 10⁵\u00a0Pa jusqu'à 1\u00a0L, dans une enceinte qui ne laisse pas passer la chaleur. Quelle pression atteint-il ?",
        options: { a: "2 × 10⁵\u00a0Pa : la pression double comme le volume diminue de moitié.", b: "2,6 × 10⁵\u00a0Pa : 2^1,4 fois plus.", c: "3,2 × 10⁵\u00a0Pa : 2^(5/3) fois plus, et sa température monte de 2^(2/3).", d: "8 × 10⁵\u00a0Pa : 2³ fois plus." },
        hint: "L'argon est monoatomique : PV = (2/3)U.",
        why: "(39.14) avec γ = 5/3 pour un gaz monoatomique : 2^(5/3) ≈ 3,17. Le doublement de la pression serait l'isotherme ; 2^1,4 l'air ; 2³ un gaz dont les chocs ne mélangeraient pas les directions, comme dans la simulation sans chocs." },
      photons: { prompt: "Du rayonnement en équilibre dans une enceinte à parois réfléchissantes se détend lentement jusqu'à 27 fois son volume. Que devient sa température ?",
        options: { a: "Elle est divisée par 27.", b: "Elle est divisée par 9.", c: "Elle ne change pas : un gaz de photons n'a pas de température.", d: "Elle est divisée par 3 : PV^(4/3) constant et P ∝ T⁴ donnent T ∝ V^(\u22121/3)." },
        why: "Pour des photons, PV = U/3, donc γ = 4/3 (39.18). Avec P = aT⁴/3, T⁴V^(4/3) est constant : T ∝ V^(\u22121/3), et 27^(1/3) = 3. Leçon « Compressibilité du rayonnement »." },
      etoile: { prompt: "Dans un plasma stellaire de masse volumique fixée, on multiplie la température par 10. Par combien est multiplié le rapport de la pression du rayonnement à celle du gaz ?",
        options: { a: "1\u00a0000 : P_rad ∝ T⁴ et P_gaz ∝ ρT.", b: "10.", c: "10\u00a0000.", d: "1 : le rapport ne dépend que de la masse volumique." },
        why: "Le rapport croît comme T³/ρ. Au centre du Soleil, il vaut environ 5 × 10⁻⁴ ; à température dix fois plus haute et même densité, il dépasserait 0,3 : le rayonnement porterait une part notable de la pression, et l'exposant adiabatique descendrait vers 4/3." },
      vitesses: { prompt: "Hélium (4\u00a0u) et xénon (131\u00a0u) sont mélangés à l'équilibre à 300\u00a0K. La vitesse quadratique moyenne de l'hélium vaut 1\u00a0370\u00a0m·s⁻¹. Que vaut celle du xénon ?",
        options: { a: "1\u00a0370\u00a0m·s⁻¹ : même température, même vitesse.", b: "Environ 240\u00a0m·s⁻¹ : √(131/4) ≈ 5,7 fois moins.", c: "Environ 42\u00a0m·s⁻¹ : 131/4 fois moins.", d: "Environ 7\u00a0800\u00a0m·s⁻¹ : le plus lourd va plus vite." },
        hint: "L'équilibre égalise une énergie, pas une vitesse.",
        why: "(39.21) : ⟨½mv²⟩ est le même pour les deux espèces, (3/2)k_BT. Donc √⟨v²⟩ ∝ 1/√m : 1\u00a0370/5,72 ≈ 240\u00a0m·s⁻¹. Leçon « Température et énergie cinétique »." },
      chocs: { prompt: "Dans la simulation du mélange, on n'autorise que les chocs entre atomes de la même espèce. Les deux températures restent à 100\u00a0K et 500\u00a0K. Qu'est-ce que cela montre ?",
        options: { a: "Que la température n'est pas liée à l'énergie cinétique.", b: "Que la simulation ne conserve pas l'énergie.", c: "Que ce sont les chocs entre espèces différentes, où la direction de w finit par ne plus rien devoir à celle de v_G, qui égalisent les énergies moyennes.", d: "Que les atomes lourds ne se heurtent jamais." },
        why: "Un choc entre semblables redistribue l'énergie dans une espèce sans rien donner à l'autre. L'égalisation (39.21) découle de ⟨w·v_G⟩ = 0 pour des paires de masses différentes (39.19) : il faut qu'elles se rencontrent." },
      avogadro: { prompt: "Un ballon contient 1\u00a0L d'hélium, un autre 1\u00a0L de diazote, tous deux à 293\u00a0K sous 101\u00a0325\u00a0Pa. Que peut-on dire de leur contenu ?",
        options: { a: "Même masse de gaz.", b: "Sept fois plus de molécules d'hélium, plus légères.", c: "Rien sans connaître la taille des molécules.", d: "Le même nombre de molécules, 2,5 × 10²², à 0,1 % près ; le diazote pèse 7 fois plus." },
        why: "PV = Nk_BT (39.22) ne contient pas la nature du gaz : c'est l'hypothèse d'Avogadro. N = PV/(k_BT) ≈ 2,5 × 10²². Les écarts au gaz parfait, Z \u2212 1, sont de l'ordre de 10⁻³ dans ces conditions. Masse : 28/4 = 7. Leçon « La loi des gaz parfaits »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

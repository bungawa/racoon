/* Épreuve de l'étape « Dynamique relativiste » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      force: { prompt: "Un proton part du repos sous une force constante F. Au bout du temps t, sa quantité de mouvement vaut Ft = 3mc. Que vaut v/c ?",
        options: { a: "Environ 0,95.", b: "3, comme le dirait Newton.", c: "Exactement 1.", d: "0,75." },
        hint: "p = γmv = 3mc donne γv/c = 3.",
        why: "γβ = 3 donne β = 3/√(1 + 9) = 3/√10 ≈ 0,949. La quantité de mouvement croît sans limite sous la force ; la vitesse tend vers c sans l'atteindre. Leçon « La dynamique relativiste »." },
      aimants: { prompt: "Des aimants courbent des électrons de 1\u00a0GeV d'énergie cinétique sur un cercle de rayon donné. Quel champ faut-il pour des électrons de 2\u00a0GeV sur le même cercle ?",
        options: { a: "Le même : à ces énergies, la vitesse des électrons est c à 10⁻⁷ près.", b: "Presque exactement le double.", c: "√2 fois plus.", d: "Quatre fois plus." },
        hint: "Le rayon vaut p/(eB) ; pour un électron de 1\u00a0GeV, mc² ≪ E.",
        why: "B = p/(eρ), et pour des électrons de 1 ou 2\u00a0GeV, pc ≈ E : la quantité de mouvement double, le champ aussi. La vitesse, elle, ne change presque pas. Leçons « La dynamique relativiste » et « L'énergie relativiste »." },
      batterie: { prompt: "Une batterie reçoit 1\u00a0MJ en se chargeant, sans échanger de matière. Comment change sa masse ?",
        options: { a: "Elle ne change pas : aucun atome n'est entré.", b: "Elle augmente de 1,1 × 10⁻⁵\u00a0kg.", c: "Elle augmente de 1,1 × 10⁻¹¹\u00a0kg.", d: "Elle diminue de 1,1 × 10⁻¹¹\u00a0kg." },
        hint: "Δm = ΔE/c².",
        why: "Δm = 10⁶/(3 × 10⁸)² ≈ 1,1 × 10⁻¹¹\u00a0kg : toute énergie stockée pèse, quelle que soit sa forme. La fraction est bien trop petite pour une balance. Leçon « L'équivalence de la masse et de l'énergie »." },
      invariant: { prompt: "Un corps reçoit de l'énergie seulement par le travail d'une force. Si son énergie vaut mᵥc² et sa quantité de mouvement mᵥv, que fait (mᵥc)² \u2212 (mᵥv)² pendant le mouvement ?",
        options: { a: "Elle croît comme l'énergie cinétique.", b: "Elle décroît vers zéro quand v tend vers c.", c: "Elle oscille autour de m²c².", d: "Elle reste constante, égale à m²c², sa valeur au repos." },
        hint: "Les deux termes ont la même dérivée par rapport au temps.",
        why: "De dE/dt = F·v et F = d(mᵥv)/dt, on tire c² d(mᵥ²)/dt = d(mᵥ²v²)/dt : la différence est constante, et vaut m²c² au repos. D'où mᵥ = m/√(1 \u2212 v²/c²). Leçon « L'équivalence de la masse et de l'énergie »." },
      choc: { prompt: "Dans le choc élastique vu de la voiture, le corps 2 avance horizontalement à u = 0,8\u00a0c, le corps 1 monte lentement. Quel rapport faut-il entre le coefficient mᵥ du corps 2 et celui du corps 1 ?",
        options: { a: "Environ 1,67, l'inverse de √(1 \u2212 u²/c²).", b: "1 : les deux corps sont identiques.", c: "0,6, la valeur de √(1 \u2212 u²/c²).", d: "1,25." },
        hint: "La vitesse verticale du corps 2 est réduite d'un facteur √(1 \u2212 u²/c²) = 0,6.",
        why: "Pour que les quantités de mouvement verticales se compensent, le corps 2, dont la vitesse verticale est 0,6 fois celle du corps 1, doit avoir un coefficient 1/0,6 ≈ 1,67 fois plus grand. Leçon « La masse relativiste »." },
      vocabulaire: { prompt: "Pourquoi l'usage actuel réserve-t-il le mot « masse » à m et n'emploie-t-il plus la masse relativiste γm ?",
        options: { a: "Parce que γm est faux : la quantité de mouvement vaut mv à toute vitesse.", b: "Parce que γm dépend de l'observateur, n'est que E/c², et ne décrit pas l'inertie dans le sens de la vitesse, qui vaut γ³m.", c: "Parce que la masse d'un corps formé par un choc est la somme des masses de ses morceaux.", d: "Parce que γm n'a jamais été mesuré." },
        hint: "Comparez la réponse d'un corps rapide à une force perpendiculaire, puis parallèle à sa vitesse.",
        why: "γm reste le coefficient exact de la quantité de mouvement, mais c'est l'énergie divisée par c², qui change d'un observateur à l'autre ; l'inertie vaut γm en travers et γ³m dans le sens de la vitesse. La masse m, elle, est la même pour tous. Leçon « La masse relativiste »." },
      scission: { prompt: "Un corps de masse 10\u00a0GeV/c² au repos se scinde en deux fragments identiques de masse 4\u00a0GeV/c². Quelle énergie cinétique emporte chaque fragment ?",
        options: { a: "Aucune : la masse doit se conserver, la scission est impossible.", b: "2\u00a0GeV.", c: "1\u00a0GeV.", d: "5\u00a0GeV." },
        hint: "L'énergie libérée est (M \u2212 2m)c², partagée entre deux fragments identiques.",
        why: "(M \u2212 2m)c² = 10 \u2212 8 = 2\u00a0GeV, soit 1\u00a0GeV par fragment, puisqu'ils sont identiques et partent en sens opposés. Leçon « L'énergie relativiste »." },
      ultra: { prompt: "Un électron (mc² = 0,511\u00a0MeV) a une quantité de mouvement telle que pc = 10\u00a0GeV. De combien son énergie totale E dépasse-t-elle pc ?",
        options: { a: "De 0,511\u00a0MeV, son énergie au repos.", b: "De 10\u00a0GeV.", c: "De rien : E = pc exactement.", d: "D'environ 13\u00a0eV." },
        hint: "E² = p²c² + m²c⁴, donc E \u2212 pc ≈ (mc²)²/(2pc).",
        why: "E \u2212 pc = (mc²)²/(E + pc) ≈ 0,511²/(2 × 10⁴)\u00a0MeV ≈ 1,3 × 10⁻⁵\u00a0MeV, soit 13\u00a0eV. À haute énergie, E et pc se confondent ; la masse se lit dans E² \u2212 p²c². Leçon « L'énergie relativiste »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

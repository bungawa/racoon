/* Épreuve de l'étape « Jonctions et transistor » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      barriere: { prompt: "Jonction au silicium à 300\u00a0K, N_A = 10²⁴ et N_D = 10²¹\u00a0m⁻³, nᵢ = 10¹⁶\u00a0m⁻³. Tension de la jonction ?",
        options: { a: "1,12\u00a0V.", b: "26\u00a0mV.", c: "Environ 0,77\u00a0V : (k_BT/e) ln(N_A N_D/nᵢ²).", d: "Environ 3\u00a0V." },
        hint: "ln(10⁴⁵/10³²) = ln(10¹³) ≈ 29,9.",
        why: "0,0259 × 29,9 ≈ 0,77\u00a0V, moins que E_g/e. Leçon « Les jonctions de semi-conducteurs »." },
      boltzmann: { prompt: "Une jonction a une tension V = 0,78\u00a0V à 300\u00a0K. Combien de fois moins de trous y a-t-il côté n que côté p ?",
        options: { a: "Environ 10¹³ : e^(eV/k_BT) = e^30.", b: "Environ 30.", c: "Environ 2.", d: "Autant des deux côtés." },
        why: "(14.10) : le rapport vaut e^(\u2212eV/k_BT) = e^(\u221230) ≈ 10⁻¹³. Leçon « Les jonctions de semi-conducteurs »." },
      voltmetre: { prompt: "Pourquoi ne peut-on pas tirer de courant d'une jonction p-n à température uniforme, dans l'obscurité ?",
        options: { a: "Parce que sa tension est trop faible.", b: "Parce que le cristal est isolant.", c: "Parce que les trous ne bougent pas.", d: "Parce que les contacts avec les fils ont aussi leurs tensions, qui annulent celle de la jonction le long du circuit : sinon on violerait le second principe." },
        why: "Une boucle à une seule température ne peut pas fournir de travail. Leçon « Les jonctions de semi-conducteurs »." },
      direct: { prompt: "Diode de courant de saturation I₀ = 10⁻¹²\u00a0A, à 300\u00a0K, sous 0,5\u00a0V en direct. Courant ?",
        options: { a: "10⁻¹²\u00a0A.", b: "Environ 0,2\u00a0mA : I₀ e^(0,5/0,026).", c: "0,5\u00a0A.", d: "Environ 1\u00a0A." },
        hint: "e^(19,3) ≈ 2,4 × 10⁸.",
        why: "I ≈ 10⁻¹² × 2,4 × 10⁸ ≈ 2,4 × 10⁻⁴\u00a0A. Leçon « Le redressement par une jonction »." },
      inverse: { prompt: "La même diode sous 0,5\u00a0V en sens inverse. Courant ?",
        options: { a: "Environ \u221210⁻¹²\u00a0A : il ne reste que le courant des minoritaires.", b: "\u22120,2\u00a0mA.", c: "Zéro exactement.", d: "Il croît sans limite." },
        why: "(14.14) : I = I₀(e^(\u221219,3) \u2212 1) ≈ \u2212I₀. Leçon « Le redressement par une jonction »." },
      temperature: { prompt: "Pourquoi le courant inverse d'une diode croît-il très vite avec la température ?",
        options: { a: "Parce que la barrière disparaît.", b: "Parce que la mobilité augmente.", c: "Parce que les majoritaires deviennent minoritaires.", d: "Parce qu'il est proportionnel à la densité des minoritaires, donc à nᵢ² ∝ e^(\u2212E_g/k_BT)." },
        why: "(14.12) : I₀ ∝ N_p(côté n) = nᵢ²/N_D. Leçon « Le redressement par une jonction »." },
      gain: { prompt: "Dans un transistor, 0,5\u00a0% des trous injectés se recombinent dans la base. Gain en courant β ?",
        options: { a: "0,995.", b: "0,5.", c: "199 : α/(1 \u2212 α) avec α = 0,995.", d: "200 000." },
        why: "β = 0,995/0,005 = 199. Leçon « Le transistor »." },
      base: { prompt: "On divise par deux la largeur de la base d'un transistor, W ≪ L. Le gain :",
        options: { a: "est divisé par deux.", b: "est multiplié par quatre : β ≈ 2(L/W)².", c: "ne change pas.", d: "est multiplié par deux." },
        why: "1 \u2212 α ≈ W²/2L² est divisé par quatre, donc β multiplié par quatre. Leçon « Le transistor »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

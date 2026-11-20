/* Épreuve de l'étape « Électrons et trous » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      paire: { prompt: "Quelle est la plus grande longueur d'onde de lumière capable de créer une paire électron-trou dans le silicium, de bande interdite 1,12\u00a0eV ?",
        options: { a: "Environ 400\u00a0nm, dans le violet.", b: "Environ 1,1\u00a0µm, dans l'infrarouge proche : λ = hc/E_g.", c: "Environ 10\u00a0µm.", d: "Toute longueur d'onde convient." },
        hint: "hc ≈ 1,24\u00a0eV·µm.",
        why: "λ = hc/E_g = 1,24/1,12 ≈ 1,1\u00a0µm. Au-delà, le photon n'a pas assez d'énergie. Leçon « Les électrons et les trous dans les semi-conducteurs »." },
      intrinseque: { prompt: "Dans un cristal pur, pourquoi le nombre d'électrons libres est-il égal à celui des trous ?",
        options: { a: "Parce que les trous sont des électrons.", b: "Par hasard.", c: "Parce que les électrons repoussent les trous.", d: "Parce qu'ils naissent et meurent par paires : chaque électron libéré laisse un trou." },
        why: "Sans impureté, chaque porteur vient d'une paire. N_n = N_p = nᵢ, et (14.4) donne nᵢ². Leçon « Les électrons et les trous dans les semi-conducteurs »." },
      froid: { prompt: "On passe un silicium pur de 300\u00a0K à 250\u00a0K. Sa densité de porteurs est divisée par environ, d'après (14.4a) :",
        options: { a: "100 : (300/250)^(3/2) e^(E_g/2k_B × (1/250 \u2212 1/300)), avec E_g = 1,12\u00a0eV.", b: "1,2, le rapport des températures.", c: "10⁹.", d: "Elle ne change pas." },
        hint: "E_g/2k_B ≈ 6 500\u00a0K.",
        why: "6 500 × (1/250 \u2212 1/300) ≈ 4,3 ; e^4,3 ≈ 76, et le facteur (300/250)^(3/2) ≈ 1,3 porte le rapport à environ 100. La densité intrinsèque est extrêmement sensible à la température. Leçon « Les électrons et les trous dans les semi-conducteurs »." },
      minoritaires: { prompt: "Silicium de type p, N_A = 10²³\u00a0m⁻³, nᵢ = 10¹⁶\u00a0m⁻³. Combien d'électrons par mètre cube ?",
        options: { a: "10²³.", b: "10¹⁶.", c: "10⁹ : nᵢ²/N_A.", d: "Aucun." },
        why: "N_n = nᵢ²/N_p = 10³²/10²³ = 10⁹\u00a0m⁻³. Leçon « Les semi-conducteurs dopés »." },
      type: { prompt: "On dope du germanium à l'aluminium, élément à trois électrons de valence. De quel type est-il ?",
        options: { a: "p : chaque aluminium accepte un électron et laisse un trou mobile.", b: "n.", c: "Intrinsèque.", d: "Métallique." },
        why: "Un accepteur prend un électron à une liaison voisine ; les trous sont majoritaires. Leçon « Les semi-conducteurs dopés »." },
      sigma: { prompt: "Silicium de type n, N_D = 10²²\u00a0m⁻³, μₙ = 0,15\u00a0m²·V⁻¹·s⁻¹. Que vaut sa conductivité ?",
        options: { a: "10²² S·m⁻¹.", b: "0,15\u00a0S·m⁻¹.", c: "Environ 6 × 10⁷\u00a0S·m⁻¹, celle du cuivre.", d: "Environ 240\u00a0S·m⁻¹ : e N μ." },
        why: "σ = e N_D μₙ = 1,6 × 10⁻¹⁹ × 10²² × 0,15 ≈ 240\u00a0S·m⁻¹ ; les trous sont négligeables. Leçon « Les semi-conducteurs dopés »." },
      hall: { prompt: "Plaque de 1\u00a0mm d'épaisseur, courant 2\u00a0mA, champ 0,5\u00a0T, tension de Hall 0,625\u00a0mV. Densité de porteurs ?",
        options: { a: "10²⁸\u00a0m⁻³.", b: "On ne peut pas la connaître sans la mobilité.", c: "10²²\u00a0m⁻³ : N = I·B/(q V e_p).", d: "10¹⁶\u00a0m⁻³." },
        why: "N = 2 × 10⁻³ × 0,5/(1,6 × 10⁻¹⁹ × 6,25 × 10⁻⁴ × 10⁻³) = 10²²\u00a0m⁻³. Leçon « L'effet Hall »." },
      signe: { prompt: "Qu'est-ce que l'effet Hall mesure qu'une mesure de courant ne peut pas mesurer ?",
        options: { a: "La vitesse de la lumière dans le cristal.", b: "Le signe de la charge des porteurs, et leur densité.", c: "La masse effective.", d: "La bande interdite." },
        why: "Le courant est le même pour des positifs vers la droite ou des négatifs vers la gauche. La tension de Hall change de signe entre les deux, et vaut I·B/(q N e_p). Leçon « L'effet Hall »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

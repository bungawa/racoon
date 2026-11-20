/* Épreuve de l'étape « La taille de l'atome et ses niveaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      fente: { prompt: "Des électrons de 100\u00a0eV, puis des neutrons de 0,443\u00a0nm, traversent la même fente de 2\u00a0µm. Comment se comparent les étalements de leur quantité de mouvement verticale, mesurés au premier minimum ?",
        options: { a: "Ils sont égaux, h/B ≈ 3,3 × 10⁻²⁸\u00a0kg·m·s⁻¹ : seule compte la largeur de la fente.", b: "Celui des neutrons est 1\u202f839 fois plus grand : ils sont plus lourds.", c: "Celui des électrons est plus grand : leur longueur d'onde est plus courte.", d: "Ils sont nuls tous deux : les particules arrivent sans mouvement vertical." },
        hint: "Écrivez Δp = p₀ sin θ₁ avec sin θ₁ = λ/B, puis remplacez p₀λ.",
        why: "Δp = p₀λ/B = h/B = 6,63 × 10⁻³⁴/2 × 10⁻⁶ ≈ 3,3 × 10⁻²⁸\u00a0kg·m·s⁻¹ pour toute particule. Les angles diffèrent, l'étalement non. Leçon « Mesurer la position et la quantité de mouvement »." },
      train: { prompt: "Une impulsion lumineuse dure 1\u00a0ps. Quelle largeur de fréquence, Δν = Δω/2π, doit au moins avoir son spectre, en ordre de grandeur ?",
        options: { a: "1\u00a0Hz : une impulsion a une seule fréquence.", b: "10¹²\u00a0Hz : Δω ≈ 2π/T.", c: "10¹⁵\u00a0Hz, la fréquence de la lumière visible.", d: "10⁶\u00a0Hz." },
        why: "Un train d'onde qui dure T a Δω ≈ 2π/T, donc Δν ≈ 1/T = 10¹²\u00a0Hz. C'est une propriété de toutes les ondes ; la mécanique quantique y ajoute E = ℏω, d'où une énergie incertaine de h/T. Leçon « Mesurer la position et la quantité de mouvement »." },
      bragg: { prompt: "Des électrons de 100\u00a0eV (λ = 0,123\u00a0nm) frappent des plans d'atomes espacés de 0,2\u00a0nm. Combien de réflexions de Bragg existent, et à quel angle des plans est la première ?",
        options: { a: "Une seule, à 38°.", b: "Aucune : λ est plus petite que d.", c: "Trois, la première à environ 18° : sin θ = λ/2d = 0,31.", d: "Une infinité, à tous les angles." },
        hint: "Les ordres vérifient n ≤ 2d/λ.",
        why: "2d/λ = 0,4/0,123 ≈ 3,25 : n = 1, 2, 3. Pour n = 1, sin θ = 0,123/0,4 ≈ 0,31, θ ≈ 18°. Leçon « La diffraction par un cristal »." },
      graphite: { prompt: "Un long bloc de graphite (plans espacés de 0,335\u00a0nm) reçoit des neutrons de toutes les vitesses. Que trouve-t-on à la sortie ?",
        options: { a: "Les neutrons les plus rapides, les seuls à traverser.", b: "Des neutrons de 0,335\u00a0nm exactement, sélectionnés par les plans.", c: "Rien : le graphite absorbe tous les neutrons.", d: "Seulement des neutrons de λ > 0,67\u00a0nm, plus lents que 590\u00a0m·s⁻¹ environ : aucun plan ne peut les renvoyer." },
        why: "Pour λ < 2d, des cristaux bien orientés renvoient les neutrons de côté, encore et encore. Pour λ > 2d, la condition de Bragg n'a pas de solution : v = h/(m λ) < 6,63 × 10⁻³⁴/(1,675 × 10⁻²⁷ × 0,67 × 10⁻⁹) ≈ 590\u00a0m·s⁻¹. Leçon « La diffraction par un cristal »." },
      helium: { prompt: "Un ion He⁺ n'a qu'un électron, autour d'un noyau de charge 2qₑ. Que donne l'argument d'incertitude de la leçon « La taille d'un atome », l'énergie électrique devenant \u22122qₑ²/(4πε₀a) ?",
        options: { a: "Une taille a₀/2 et une énergie quatre fois celle de l'hydrogène, environ \u221254\u00a0eV.", b: "Une taille 2a₀ et une énergie de \u22126,8\u00a0eV.", c: "La même taille et une énergie double.", d: "Aucun minimum : l'électron tombe sur le noyau." },
        hint: "Dans la dérivée de E(a), le terme électrique est multiplié par 2.",
        why: "dE/da = 0 donne a = 4πε₀ℏ²/(2 mₑ qₑ²) = a₀/2 ; l'énergie au minimum vaut \u22122qₑ²/(8πε₀a) = 4E₀ ≈ \u221254,4\u00a0eV. L'énergie varie comme Z², la taille comme 1/Z. Leçon « La taille d'un atome »." },
      compression: { prompt: "Selon l'estimation par l'incertitude, quelle énergie faut-il fournir pour comprimer un atome d'hydrogène à la moitié du rayon de Bohr ?",
        options: { a: "Aucune : l'électron se rapproche du noyau qui l'attire, l'énergie baisse.", b: "Environ 13,6\u00a0eV : l'énergie cinétique passe de 13,6 à 54,4\u00a0eV, l'énergie électrique de \u221227,2 à \u221254,4\u00a0eV.", c: "Environ 27,2\u00a0eV : l'énergie électrique double.", d: "Une énergie infinie." },
        why: "L'énergie cinétique varie en 1/a², l'énergie électrique en \u22121/a. À a₀/2, le total passe de \u221213,6\u00a0eV à 0 : il faut fournir 13,6\u00a0eV, environ 2,2 × 10⁻¹⁸\u00a0J. C'est pourquoi la matière résiste à la compression. Leçon « La taille d'un atome »." },
      ritz: { prompt: "L'hydrogène émet la raie de 3 à 2 à 656,5\u00a0nm et celle de 2 à 1 à 121,6\u00a0nm (dans le vide). Où doit se trouver la raie du saut direct de 3 à 1 ?",
        options: { a: "À 778,1\u00a0nm, la somme des longueurs d'onde.", b: "À 534,9\u00a0nm, leur différence.", c: "À environ 102,6\u00a0nm : les pulsations, donc les inverses des longueurs d'onde, s'additionnent.", d: "Nulle part : un saut ne peut pas enjamber un niveau." },
        hint: "C'est l'énergie, donc ω et 1/λ, qui s'additionne.",
        why: "ω₃₁ = ω₃₂ + ω₂₁, donc 1/λ = 1/656,5 + 1/121,6 nm⁻¹, λ ≈ 102,6\u00a0nm : c'est la deuxième raie de Lyman, bien observée. Leçon « Les niveaux d'énergie »." },
      prevision: { prompt: "Dans un gaz, chaque choc multiplie par environ 370 l'erreur sur la direction d'une molécule. Si l'on connaît sa position à 10⁻³⁰ près au lieu de 10⁻¹⁰, combien de chocs de plus peut-on prédire ?",
        options: { a: "10²⁰ fois plus.", b: "Aucun : la mécanique classique ne prédit rien.", c: "Une infinité : la physique classique est déterministe.", d: "Environ huit, soit trois fois plus en tout : le nombre de chocs croît comme le logarithme de la précision." },
        why: "n = ln(1/ε)/ln A : ln(10¹⁰)/ln 370 ≈ 3,9 chocs, ln(10³⁰)/ln 370 ≈ 11,7. Vingt chiffres de plus ne font gagner que huit chocs, à peine plus d'une nanoseconde dans l'air. Le hasard n'est pas une invention quantique. Leçon « Les implications philosophiques »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

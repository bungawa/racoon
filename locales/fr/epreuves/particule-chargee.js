/* Épreuve de l'étape « Particule chargée » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      poids: { prompt: "Un proton de 1\u00a0keV traverse un champ électrique de 10\u00a0kV·m⁻¹. Que vaut le rapport de son poids à la force électrique, et qu'en conclure ?",
        options: { a: "Environ 10⁻¹¹ : on écrit la deuxième loi avec la seule force électrique, sans remords.", b: "Environ 10⁻³ : le poids corrige la trajectoire au millième.", c: "Environ 1 : il faut garder les deux forces.", d: "On ne peut pas comparer une force électrique et un poids, qui n'ont pas la même nature." },
        hint: "m g = 1,67\u00a0×\u00a010⁻²⁷\u00a0× 9,81 ; e E = 1,6\u00a0×\u00a010⁻¹⁹\u00a0× 10⁴.",
        why: "mg ≈ 1,6\u00a0×\u00a010⁻²⁶\u00a0N, eE ≈ 1,6\u00a0×\u00a010⁻¹⁵\u00a0N : un rapport de 10⁻¹¹. Les deux sont des forces, en newtons, et se comparent. Le poids ne compte que pour un objet qui ne porte que quelques charges, comme la goutte d'huile de Millikan. Leçon « Force de Lorentz »." },
      canon: { prompt: "Un ion de charge 2e, parti du repos, franchit une différence de potentiel de 5\u00a0kV. Quelle énergie cinétique a-t-il gagnée ?",
        options: { a: "5\u00a0keV, comme toute particule sous 5\u00a0kV.", b: "10\u00a0keV : l'énergie gagnée vaut qU, quelle que soit la masse.", c: "2,5\u00a0keV : l'énergie se partage entre les deux charges.", d: "Il faut connaître sa masse pour répondre." },
        why: "Le travail de la force électrique entre deux points vaut q(V₁ \u2212 V₂) = 2e × 5\u00a0kV = 10\u00a0keV, sans dépendre ni du chemin ni de la masse. La masse ne fixe que la vitesse atteinte. Leçons « Force de Lorentz » et « Particule dans un champ électrique uniforme »." },
      deviation: { prompt: "Dans un canon, les électrons sont accélérés sous U puis déviés par deux plaques. On passe U de 2\u00a0kV à 8\u00a0kV. Comment change la déviation du spot ?",
        options: { a: "Elle est multipliée par 4 : les électrons ont plus d'énergie.", b: "Elle est divisée par 2, puisque v₀ double.", c: "Elle est divisée par 4 : la déviation varie comme 1/v₀², donc comme 1/U.", d: "Elle ne change pas : seule compte la tension entre les plaques." },
        hint: "Dans y = qE x²/(2mv₀²), remplacez m v₀² par 2qU.",
        why: "y = E x²/(4U) : quatre fois plus de tension, quatre fois moins de déviation. La vitesse ne fait que doubler, mais la déviation dépend de son carré. Leçon « Particule dans un champ électrique uniforme »." },
      relativite: { prompt: "On accélère des électrons sous 50\u00a0kV. Que dit (v/c)², calculé avec la vitesse de Newton ?",
        options: { a: "Environ 4\u00a0×\u00a010⁻³ : Newton suffit largement.", b: "Exactement 1 : l'électron atteint la vitesse de la lumière.", c: "Il ne dépend pas de la tension pour un électron.", d: "Environ 0,2 : Newton surestime la vitesse d'environ 7\u00a0%, il faut la relativité." },
        hint: "Selon Newton, (v/c)² = 2eU/(mc²) = U/(255\u00a0kV).",
        why: "(v/c)² = 50/255 ≈ 0,2. L'erreur de Newton sur la vitesse vaut environ (3/8)(v/c)² ≈ 7\u00a0%. Sous 1\u00a0kV, le même nombre vaut 4\u00a0×\u00a010⁻³ et l'erreur 0,15\u00a0%. Leçon « Particule dans un champ électrique uniforme »." },
      travail: { prompt: "Un électron décrit un cercle dans un champ magnétique uniforme, sans champ électrique. Que vaut le travail de la force de Lorentz pendant un demi-tour ?",
        options: { a: "Zéro : la force reste perpendiculaire à la vitesse, sa puissance est nulle à chaque instant.", b: "2|q|vBR : la force multipliée par le diamètre.", c: "π|q|vBR : la force multipliée par la longueur du demi-cercle.", d: "Il est négatif : l'électron perd de l'énergie à chaque demi-tour." },
        why: "La puissance q(v ∧ B)·v est nulle, donc le travail sur n'importe quel morceau de trajectoire aussi. Le déplacement d'un diamètre ne change rien : ce n'est pas le déplacement qui compte, mais le produit scalaire de la force et de la vitesse à chaque instant. Leçons « Force de Lorentz » et « Particule dans un champ magnétique uniforme »." },
      rayon: { prompt: "Un proton de 1\u00a0MeV décrit un cercle de 14 cm de rayon dans un champ magnétique. Quel rayon décrit, dans le même champ, un proton de 4\u00a0MeV ?",
        options: { a: "56 cm : le rayon est proportionnel à l'énergie.", b: "28 cm : R = mv/(eB), et la vitesse double quand l'énergie quadruple.", c: "14 cm : le rayon ne dépend que du champ.", d: "7 cm : un proton plus rapide est plus dévié." },
        hint: "R est proportionnel à la vitesse ; v est proportionnelle à la racine de l'énergie.",
        why: "R = mv/(eB) et Ec = mv²/2 : R est proportionnel à √Ec. Quatre fois plus d'énergie, deux fois plus de vitesse, deux fois plus de rayon. (v/c)² ≈ 8\u00a0×\u00a010⁻³ : Newton suffit. Leçon « Particule dans un champ magnétique uniforme »." },
      periode: { prompt: "Pourquoi un cyclotron peut-il accélérer des protons avec une tension alternative de fréquence fixe, tant qu'ils restent sous quelques dizaines de MeV ?",
        options: { a: "Parce que le champ magnétique les accélère de plus en plus à chaque tour.", b: "Parce que la tension est si élevée que quelques tours suffisent.", c: "Parce que la période de rotation, 2πm/(eB), ne dépend pas de leur vitesse : ils repassent dans l'intervalle au même rythme.", d: "Parce que leur rayon reste constant pendant l'accélération." },
        why: "Le rayon grandit comme v, la circonférence aussi : la durée d'un tour est la même. La tension alternative, réglée sur f_c = eB/(2πm), les pousse à chaque passage. En relativité, la période grandit comme γ, ce qui borne le cyclotron classique. Leçon « Particule dans un champ magnétique uniforme »." },
      filtre: { prompt: "Dans un filtre de Wien, E = 3\u00a0×\u00a010⁴\u00a0V·m⁻¹ est perpendiculaire à B = 0,2\u00a0T, tous deux perpendiculaires au faisceau. Un ion qui va à 10⁵\u00a0m·s⁻¹ y entre. Que lui arrive-t-il ?",
        options: { a: "Il passe tout droit, puisque v est perpendiculaire aux deux champs.", b: "Il passe tout droit si sa charge est positive, il est dévié sinon.", c: "Il est dévié du côté de la force magnétique, plus forte que la force électrique.", d: "Il est dévié du côté de la force électrique : il va moins vite que E/B = 1,5\u00a0×\u00a010⁵\u00a0m·s⁻¹, et qvB < qE." },
        why: "Seuls passent tout droit les ions à v = E/B = 1,5\u00a0×\u00a010⁵\u00a0m·s⁻¹, quel que soit le signe de q (les deux forces changent de sens ensemble). À 10⁵\u00a0m·s⁻¹, qvB = 2\u00a0×\u00a010⁴ q contre qE = 3\u00a0×\u00a010⁴ q : la force électrique l'emporte. Leçon « Force de Lorentz »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

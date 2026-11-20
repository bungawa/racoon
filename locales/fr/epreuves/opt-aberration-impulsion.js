/* Épreuve de l'étape « Aberration et impulsion de la lumière » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      travers: { prompt: "Dans le référentiel S, une onde lumineuse monte selon y. Un observateur avance à 0,8c selon x. Que mesure-t-il ?",
        options: { a: "La même pulsation et la même direction : il se déplace en travers de l'onde.", b: "Une pulsation 0,6 fois plus petite, et une onde qui penche vers l'avant.", c: "Une pulsation 1,67 fois plus grande, et une onde qui monte en reculant, à 53° de la verticale.", d: "Une onde qui va selon x, à c \u2212 0,8c." },
        hint: "Appliquez (34.21a) avec kx = 0 : ω′ = γω, kx′ = \u2212γvω/c².",
        why: "γ = 1/√(1 \u2212 0,64) = 1,67 : c'est le Doppler transverse. La composante kx′ n'est plus nulle : la direction penche vers l'arrière, avec sin δ = 0,8, soit 53°. Pulsation et direction changent ensemble, par un seul changement de quadrivecteur. Leçons « Le quadrivecteur pulsation-vecteur d’onde » et « L’aberration de la lumière »." },
      dipole: { prompt: "Le fond diffus cosmologique est un corps noir à 2,725\u00a0K. Si nous nous déplaçons à 370\u00a0km·s⁻¹ par rapport au référentiel où il est isotrope, quel écart de température voyons-nous entre la direction du mouvement et la moyenne ?",
        options: { a: "Environ 3,4\u00a0mK, T₀β avec β ≈ 1,2 × 10⁻³.", b: "Environ 4\u00a0µK, T₀β² : l'effet est du second ordre.", c: "Aucun : un corps noir n'a pas de direction.", d: "Environ 2,7\u00a0K : la température double devant." },
        hint: "Chaque onde se transforme par (34.21a) ; la température suit ω′/ω = γ(1 + β cos θ).",
        why: "T(θ) = T₀/(γ(1 \u2212 β cos θ)) ≈ T₀(1 + β cos θ) : l'écart dipolaire vaut T₀β = 2,725 × 1,23 × 10⁻³ ≈ 3,4\u00a0mK. Les termes en β² sont mille fois plus petits. La mesure du dipôle sert à l'inverse, à trouver notre vitesse. Leçon « Le quadrivecteur pulsation-vecteur d’onde »." },
      ellipse: { prompt: "Quelle trajectoire apparente décrit en un an, du fait de l'aberration, une étoile située à 30° de latitude écliptique ?",
        options: { a: "Un cercle de 20,5″ de rayon, comme toutes les étoiles.", b: "Une ellipse de demi-axes 20,5″ et 10,2″.", c: "Un segment de 41″, comme sur l'écliptique.", d: "Une ellipse de demi-axes 41″ et 20,5″." },
        hint: "(34.23b) : δ ≈ β sin θ ; la composante de la vitesse le long de la visée ne compte pas.",
        why: "Le demi-grand axe est la constante d'aberration κ = 20,5″ ; le petit vaut κ sin 30° = 10,2″. Au pôle de l'écliptique, un cercle ; sur l'écliptique, un segment de 2κ. Leçon « L’aberration de la lumière »." },
      ciel: { prompt: "Un vaisseau avance à 0,6c. Une étoile est à 90° de sa vitesse dans le référentiel des étoiles. Dans quelle direction l'équipage la voit-il ?",
        options: { a: "À 90°, car elle est perpendiculaire au mouvement.", b: "À 59°, inclinée de 31°, l'angle de Galilée arctan 0,6.", c: "Derrière lui, à 127°.", d: "À 53° de la vitesse, inclinée de 37° vers l'avant." },
        hint: "(34.23a) avec cos θ = 0 : cos θ′ = β.",
        why: "cos θ′ = 0,6 donne θ′ = 53,1°, et l'inclinaison δ = 36,9° vérifie sin δ = 0,6, (34.23). Galilée donne arctan 0,6 = 31° : à cette vitesse, l'écart se mesure. Toutes les étoiles se serrent vers l'avant. Leçon « L’aberration de la lumière »." },
      orbite: { prompt: "Un télescope spatial en orbite basse va à 7,7\u00a0km·s⁻¹ autour de la Terre. Quelle aberration supplémentaire, au plus, son mouvement orbital ajoute-t-il, et sur quelle durée change-t-elle de sens ?",
        options: { a: "Environ 5,3″, qui s'inverse en une demi-orbite, une cinquantaine de minutes.", b: "Environ 0,3″, comme l'aberration diurne au sol.", c: "Aucune : seule compte la vitesse de la Terre autour du Soleil.", d: "Environ 20,5″, la constante d'aberration." },
        hint: "δ ≈ v/c en radians ; 1\u00a0rad = 206\u00a0265″.",
        why: "7\u00a0700/3 × 10⁸ ≈ 2,6 × 10⁻⁵\u00a0rad ≈ 5,3″. Seule compte la vitesse de l'instrument, et elle s'inverse en une demi-orbite : les logiciels de pointage la corrigent en continu, en plus des 20,5″ annuels. Leçon « L’aberration de la lumière »." },
      voile: { prompt: "Une voile miroir de 100\u00a0m² reçoit 0,91\u00a0mN du Soleil à 1\u00a0au. Que reçoit-elle à 2\u00a0au, et comment varie le rapport de cette poussée à l'attraction du Soleil ?",
        options: { a: "0,45\u00a0mN ; le rapport diminue de moitié.", b: "0,91\u00a0mN : la poussée ne dépend pas de la distance.", c: "0,23\u00a0mN ; le rapport est divisé par quatre.", d: "Environ 0,23\u00a0mN ; le rapport ne change pas, car poussée et gravitation varient toutes deux en 1/r²." },
        hint: "L'intensité du Soleil décroît en 1/r², comme sa gravitation.",
        why: "I est divisée par 4, donc la poussée (1 + R) I A/c aussi : 0,23\u00a0mN. La gravitation l'est aussi, et le rapport ne dépend que de la masse par unité d'aire. C'est pourquoi la queue de poussières d'une comète pointe à l'opposé du Soleil à toute distance. Leçon « La quantité de mouvement de la lumière »." },
      laser: { prompt: "Un laser de 10\u00a0W est entièrement absorbé par un objet de 1\u00a0g, libre dans l'espace. Quelle vitesse a-t-il gagnée au bout d'une journée ?",
        options: { a: "Environ 0,3\u00a0mm·s⁻¹.", b: "Environ 2,9\u00a0m·s⁻¹ : F = P/c = 33\u00a0nN, a = 3,3 × 10⁻⁵\u00a0m·s⁻².", c: "Environ 5,8\u00a0m·s⁻¹ : la lumière absorbée donne 2P/c.", d: "Aucune : un objet noir absorbe l'énergie sans être poussé." },
        hint: "(34.24) : ⟨F⟩ = (dW/dt)/c, puis v = a t.",
        why: "F = 10/(3 × 10⁸) = 3,3 × 10⁻⁸\u00a0N, a = F/m = 3,3 × 10⁻⁵\u00a0m·s⁻², v = a × 86\u00a0400\u00a0s ≈ 2,9\u00a0m·s⁻¹. Le facteur 2 est pour un miroir. Il faut aussi que l'objet réémette sa chaleur également dans toutes les directions, sinon cette réémission pousse aussi. Leçon « La quantité de mouvement de la lumière »." },
      recul: { prompt: "Un atome de sodium, 23\u00a0u, absorbe un photon de 589\u00a0nm. Quelle vitesse de recul prend-il ?",
        options: { a: "Environ 3\u00a0km·s⁻¹, la vitesse d'agitation thermique.", b: "Aucune : le photon n'a pas de masse.", c: "Environ 3\u00a0cm·s⁻¹ : p = h/λ ≈ 1,1 × 10⁻²⁷\u00a0kg·m·s⁻¹, divisé par la masse de l'atome.", d: "Environ 3\u00a0m·s⁻¹ : p = W/c avec W ≈ 2\u00a0eV." },
        hint: "(34.26) : p = ħk = h/λ ; m = 23 × 1,66 × 10⁻²⁷\u00a0kg.",
        why: "v = (6,63 × 10⁻³⁴/589 × 10⁻⁹)/(3,82 × 10⁻²⁶) ≈ 2,9 × 10⁻²\u00a0m·s⁻¹. Un photon ne change presque rien, mais des dizaines de milliers de photons absorbés à la suite, tous du même côté, freinent un atome thermique : c'est le principe du refroidissement par laser. p = W/c et p = h/λ sont la même chose ; 3\u00a0m·s⁻¹ est une erreur d'un facteur 100. Leçon « La quantité de mouvement de la lumière »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

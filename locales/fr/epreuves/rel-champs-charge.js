/* Épreuve de l'étape « Champs d'une charge rapide » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      projetee: { prompt: "Une charge allait à 0,9c, puis s'est arrêtée net. En un point P où le signal de l'arrêt n'est pas encore arrivé, quels potentiels mesure-t-on ?",
        options: { a: "Ceux d'une charge fictive qui aurait gardé sa vitesse de 0,9c : (26.1) appliquée à la position projetée, loin devant la position réelle.", b: "Ceux d'une charge au repos à sa position d'arrêt.", c: "Zéro, puisque la charge ne bouge plus.", d: "Le potentiel de Coulomb de la position actuelle, sans facteur de vitesse." },
        hint: "De quoi dépendent les potentiels en P : de la position et de la vitesse à quel instant ?",
        why: "Les potentiels ne dépendent que de la position et de la vitesse à l'instant retardé, antérieur à l'arrêt. La charge fictive continue tout droit ; ses potentiels par (26.1) sont exactement ceux de Liénard et Wiechert. Le champ, lui, n'obéit pas à ce jeu dès que la charge accélère. Leçon « Potentiels d'une charge en mouvement rapide »." },
      crepe: { prompt: "Un proton a γ = 100. À 1\u00a0m de sa position actuelle, combien vaut son champ électrique, comparé au champ de Coulomb à la même distance, sur le côté puis devant lui ?",
        options: { a: "100 fois plus fort sur le côté et devant.", b: "100 fois plus fort sur le côté, 10\u00a0000 fois plus faible devant.", c: "10 fois plus fort sur le côté, 100 fois plus faible devant.", d: "Le même partout : seule la direction change." },
        why: "(26.10) : facteur γ = 100 sur le côté. (26.11) : facteur 1 \u2212 v²/c² = 1/γ² = 10⁻⁴ devant. Le champ se concentre dans une crêpe de demi-largeur angulaire voisine de 0,77/γ ≈ 0,44°. Leçon « Champs d'une charge en mouvement uniforme »." },
      impulsion: { prompt: "Un électron très rapide (v ≈ c) passe à 1\u00a0cm d'un atome. On multiplie son énergie par 10. Que devient la quantité de mouvement transverse donnée à un électron de l'atome, supposé immobile pendant le passage ?",
        options: { a: "Multipliée par 10, comme la crête du champ.", b: "Divisée par 10, comme la durée de l'impulsion.", c: "Presque inchangée : ∫E dt = 2q/(4π ε0 b v) ne dépend pas de γ.", d: "Multipliée par 100." },
        hint: "La crête monte comme γ, la durée baisse comme 1/γ.",
        why: "L'intégrale (26.3q) ne contient que b et v, et v ≈ c ne change presque pas. L'impulsion de champ devient plus brève et plus intense, mais porte la même quantité de mouvement transverse. Leçon « Champs d'une charge en mouvement uniforme »." },
      vu: { prompt: "Un proton traverse à 0,8c, perpendiculairement, un champ magnétique pur de 0,5\u00a0T. Quel champ électrique voit-il dans son propre référentiel ?",
        options: { a: "Aucun : un champ magnétique reste magnétique.", b: "vB = 120\u00a0MV·m⁻¹.", c: "vB/γ = 72\u00a0MV·m⁻¹.", d: "γvB = 200\u00a0MV·m⁻¹." },
        hint: "Pour β = 0,8, γ = 5/3.",
        why: "(26.22q) : E′⊥ = γ(E + v ∧ B)⊥ = γvB = 5/3 × 2,4\u00a0×\u00a010⁸ × 0,5 = 2\u00a0×\u00a010⁸\u00a0V·m⁻¹. Le proton, immobile dans ce référentiel, n'est poussé que par ce champ électrique. Leçon « Transformation relativiste des champs »." },
      invariant: { prompt: "Dans un laboratoire, E = 4\u00a0MV·m⁻¹ et cB = 2\u00a0MV·m⁻¹, perpendiculaires. Que peut-on affirmer ?",
        options: { a: "Il existe un référentiel, en mouvement à 0,5c selon E ∧ B, où il ne reste qu'un champ électrique, de 2√3 ≈ 3,5\u00a0MV·m⁻¹.", b: "Il existe un référentiel où il ne reste qu'un champ magnétique.", c: "Aucun référentiel ne simplifie les champs.", d: "Dans tout référentiel, E′ = 4\u00a0MV·m⁻¹." },
        hint: "Regardez le signe de E² \u2212 c²B², et E·B.",
        why: "E·B = 0 et E² \u2212 c²B² = 12 (MV·m⁻¹)² > 0 : le référentiel qui va à c²B/E = 0,5c selon E ∧ B annule B, et il reste E′ = √12 ≈ 3,46\u00a0MV·m⁻¹, ce qu'imposent les invariants (26.22r). Leçon « Transformation relativiste des champs »." },
      propre: { prompt: "Pourquoi la loi du mouvement s'écrit-elle avec des dérivées par rapport au temps propre s plutôt qu'au temps t du laboratoire ?",
        options: { a: "Parce que s est plus facile à mesurer que t.", b: "Parce que ds = dt√(1 \u2212 v²/c²) est le même pour tous les observateurs : d/ds change un quadrivecteur en quadrivecteur, et m0 d²x_μ/ds² = q u_ν F_μν a la même forme partout.", c: "Parce que la force de Lorentz est fausse en temps t.", d: "Parce que s est toujours plus grand que t." },
        why: "dt dépend du référentiel ; ds, l'intervalle divisé par c, n'en dépend pas. (26.39) contient la même physique que (26.24), mais sa forme montre qu'elle est la même pour tous. Leçon « Équations du mouvement en notation relativiste »." },
      croises: { prompt: "Un électron est lâché au repos dans E = 450\u00a0kV·m⁻¹ et B = 1\u00a0mT, perpendiculaires. Newton prédit une dérive à E/B. Qu'en est-il ?",
        options: { a: "L'électron dérive à 1,5c, comme le dit Newton.", b: "L'électron dérive à c exactement.", c: "E > cB : aucun référentiel n'annule E ; l'électron est accéléré sans fin, sans jamais atteindre c.", d: "L'électron reste immobile." },
        hint: "Comparez E à cB = 300\u00a0kV·m⁻¹.",
        why: "E/B = 4,5\u00a0×\u00a010⁸\u00a0m·s⁻¹ = 1,5c : impossible. E² \u2212 c²B² > 0, donc il existe un référentiel où il ne reste qu'un champ électrique, qui accélère l'électron indéfiniment. L'intégration de (26.39) en temps propre le montre. Leçon « Équations du mouvement en notation relativiste »." },
      pression: { prompt: "Dans un champ électrostatique uniforme E dirigé selon x, que valent les flux de quantité de mouvement S_xx et S_yy du tenseur énergie-impulsion ?",
        options: { a: "S_xx = S_yy = ε0E²/2 : une pression dans toutes les directions.", b: "S_xx = 0 et S_yy = ε0E².", c: "S_xx = ε0E²/2 et S_yy = \u2212ε0E²/2.", d: "S_xx = \u2212ε0E²/2, une tension le long du champ, et S_yy = +ε0E²/2, une pression en travers." },
        hint: "S_ij = δ_ij u \u2212 ε0 E_i E_j, avec u = ε0E²/2.",
        why: "S_xx = u \u2212 ε0E² = \u2212ε0E²/2 ; S_yy = u. Les lignes de champ tirent le long d'elles-mêmes et se repoussent en travers : c'est la force qui rapproche les armatures d'un condensateur, ε0E²/2 par unité d'aire. Leçon « Le tenseur énergie-impulsion électromagnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

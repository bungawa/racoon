/* Épreuve de l'étape « Spin 1/2 : rotations quelconques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      demi: { prompt: "Une particule a C₊ = 0,6 et C₋ = 0,8. Que valent ses amplitudes dans la base d'un appareil retourné de 180° autour de y ?",
        options: { a: "0,6 et 0,8.", b: "C′₊ = 0,8 et C′₋ = \u22120,6 : les voies s'échangent, avec un signe.", c: "0,8 et 0,6.", d: "\u22120,6 et \u22120,8." },
        why: "(6.27) : C′₊ = C₋, C′₋ = \u2212C₊. Les probabilités s'échangent : 0,64 par +T, 0,36 par \u2212T. Leçon « Les rotations de 180° et de 90° autour de y »." },
      signe: { prompt: "D'où vient le signe moins de (6.27) ?",
        options: { a: "De ce que deux demi-tours font un tour complet, qui multiplie les amplitudes par \u22121.", b: "D'une mesure.", c: "Du choix de l'axe y.", d: "De la normalisation." },
        why: "Appliquer deux fois C′₊ = e^(iβ) C₋, C′₋ = e^(iγ) C₊ doit donner \u22121 : e^(i(β+γ)) = \u22121. Le choix de y ne fixe que β = 0. Leçon « Les rotations de 180° et de 90° autour de y »." },
      quart: { prompt: "Une particule est dans l'état +S. T est tourné de 90° autour de y. Que valent C′₊ et C′₋ ?",
        options: { a: "1 et 0.", b: "0 et 1.", c: "1/2 et 1/2.", d: "1/√2 et \u22121/√2 : une chance sur deux pour chaque voie." },
        why: "(6.32) avec C₊ = 1, C₋ = 0. Leçon « Les rotations de 180° et de 90° autour de y »." },
      x: { prompt: "Comment écrit-on la rotation d'un angle α autour de x à partir des rotations connues ?",
        options: { a: "R_x(α) = R_y(α) R_z(α).", b: "R_x(α) = R_y(α).", c: "R_x(α) = R_z(90°) R_y(α) R_z(\u221290°) : \u221290° autour de z, α autour du nouvel y, +90° autour de z.", d: "R_x(α) = R_z(α) R_y(90°)." },
        why: "Le premier quart de tour amène x en y. Le produit donne (6.34), avec i sin(α/2) hors de la diagonale. Leçon « Les rotations autour de x »." },
      xplus: { prompt: "L'état (+S + \u2212S)/√2 est le spin selon +x. T est tourné de 60° autour de x. Quelle fraction passe +T ?",
        options: { a: "1/2 : l'axe de T reste perpendiculaire à x.", b: "3/4.", c: "1.", d: "1/4." },
        why: "Autour de x, l'axe de T tourne dans le plan yz. Autour de y, la même inclinaison donnerait une autre valeur. Leçon « Les rotations autour de x »." },
      ordre: { prompt: "Un quart de tour autour de x puis de y, ou l'inverse : partie de +S, la particule passe +T avec la probabilité 1/2 dans les deux cas. Les deux suites de rotations donnent-elles le même état ?",
        options: { a: "Oui, les probabilités sont égales.", b: "Oui, les rotations commutent.", c: "Non, car les probabilités diffèrent.", d: "Non : la phase de C′₊ vaut \u221245° dans un cas, +45° dans l'autre." },
        why: "Les matrices ne commutent pas. L'égalité des probabilités dans une base ne fait pas l'égalité des états. Leçon « Les rotations autour de x »." },
      axe: { prompt: "Une particule est dans l'état + selon l'axe θ = 60°, φ = 0. T est orienté selon z. Quelle fraction passe +T ?",
        options: { a: "1/4.", b: "1/2.", c: "3/4, soit cos² 30°.", d: "1." },
        hint: "(6.36) : C₊ = cos(θ/2) e^(\u2212iφ/2).",
        why: "|C₊|² = cos²(θ/2) = cos² 30° = 0,75. En général, cos²(Θ/2), Θ l'angle entre les axes. Leçon « Les rotations quelconques du spin 1/2 »." },
      spin1: { prompt: "Qu'est-ce qui distingue le spin 1/2 du spin 1, du point de vue des états possibles ?",
        options: { a: "Rien.", b: "Tout état de spin 1/2 est l'état + selon un axe ; un spin 1 a des états, comme 0 selon z, qui ne le sont selon aucun axe.", c: "Le spin 1/2 n'a pas de direction.", d: "Le spin 1 n'a que deux états." },
        why: "Deux amplitudes normées, à une phase près, c'est deux angles θ et φ : une direction. Le spin 1 a trois amplitudes, et plus de liberté. Leçon « Les rotations quelconques du spin 1/2 »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

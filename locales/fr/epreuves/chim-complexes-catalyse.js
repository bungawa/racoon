/* Épreuve de l'étape « Complexes et catalyse » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      no: { prompt: "Dans [RhI₃(CH₃)(CO)₂]⁻, quels sont le nombre d'oxydation du rhodium (groupe 9) et le nombre d'électrons de valence du complexe ?",
        options: { a: "+3 et 18.", b: "+1 et 16.", c: "\u22121 et 18.", d: "+4 et 17." },
        hint: "Trois iodido et un méthyle sont des ligands X ; les deux CO sont des ligands L.",
        why: "x = \u22121 \u2212 (\u22124) = +3 : rhodium(III), d⁶. Six ligands à 2 électrons : 6 + 12 = 18. C'est l'intermédiaire formé par l'addition oxydante de CH₃I sur [RhI₂(CO)₂]⁻ (Rh(I), 16 électrons). Leçon « Structure des complexes »." },
      regle: { prompt: "Lequel de ces complexes stables s'écarte de la règle des 18 électrons ?",
        options: { a: "[Cr(CO)₆].", b: "[Fe(CO)₅].", c: "[Co(NH₃)₆]³⁺.", d: "[RhCl(PPh₃)₃], d⁸ plan carré." },
        why: "Rh(I) d⁸ et quatre ligands : 16 électrons, comme la plupart des complexes d⁸ plan carré. Les trois autres en comptent 18. La règle est un modèle, valable surtout avec des ligands à champ fort : son écart est souvent ce qui rend un complexe réactif." },
      retro: { prompt: "Pourquoi les ligands π-accepteurs comme CO donnent-ils des complexes bas spin qui suivent la règle des 18 électrons ?",
        options: { a: "Parce qu'ils donnent plus de deux électrons chacun.", b: "La rétrodonation abaisse les orbitales t₂g et agrandit l'écart Δₒ : les électrons d s'apparient dans t₂g, non liantes, et rien n'entre dans les antiliantes eg*.", c: "Parce qu'ils oxydent le métal.", d: "Parce qu'ils occupent deux positions chacun." },
        why: "Un π-accepteur reçoit des électrons t₂g dans sa π* : t₂g descend, Δₒ grandit. Le prix d'un électron dans eg* devient trop élevé : bas spin, liantes et non liantes pleines à 18. Avec un ligand à champ faible comme l'eau, eg* se peuple : [Ni(H₂O)₆]²⁺ compte 20 électrons." },
      bilan: { prompt: "Au cours d'un tour du cycle de Wilkinson entrent H₂, C₂H₄ et une molécule de solvant S ; sortent S et C₂H₆. Quel est le bilan ?",
        options: { a: "H₂ + C₂H₄ + S → C₂H₆ + S + [RhCl(PPh₃)₂(S)].", b: "C₂H₆ → C₂H₄ + H₂.", c: "C₂H₄ + H₂ → C₂H₆ : le solvant s'élimine, comme le catalyseur.", d: "C₂H₄ + 2 H₂ → C₂H₆ + H₂." },
        why: "Ce qui entre moins ce qui sort : S apparaît des deux côtés et s'élimine, le catalyseur aussi. Reste l'hydrogénation de l'éthène. Leçon « Cycles catalytiques et hydrogénation homogène »." },
      etape: { prompt: "Une étape fait passer [RhI₃(CH₃)(CO)₂]⁻ à [RhI₃(COCH₃)(CO)]⁻, sans échange avec le milieu. Laquelle ?",
        options: { a: "Une insertion 1,1 de CO dans la liaison Rh–CH₃ : nombre d'oxydation +3 inchangé, électrons de 18 à 16.", b: "Une élimination réductrice de CH₃CO.", c: "Une addition oxydante de CO.", d: "Une dissociation de CO." },
        why: "Le méthyle et un CO voisins deviennent un seul ligand acétyle, X comme le méthyle : x reste +3, le métal perd deux électrons et une position. Rien n'est sorti : ce n'est pas une dissociation. Un CO entre ensuite pour revenir à 18." },
      tof: { prompt: "0,20\u00a0mmol de complexe forment 1,0\u00a0mol de produit en 2,0\u00a0h. Que valent le nombre de cycles N et la fréquence de cycles f ?",
        options: { a: "N = 0,20 et f = 0,10\u00a0h⁻¹.", b: "N = 5\u202f000 et f ≈ 0,69\u00a0s⁻¹.", c: "N = 5\u202f000 et f = 2\u202f500\u00a0s⁻¹.", d: "N = 5 et f ≈ 2,5\u00a0h⁻¹." },
        hint: "f = N/Δt, avec Δt en secondes.",
        why: "N = 1,0/(2,0 × 10⁻⁴) = 5\u202f000 cycles par atome de métal. Δt = 7\u202f200\u00a0s, donc f = 5\u202f000/7\u202f200 ≈ 0,69\u00a0s⁻¹. La valeur réelle par centre actif est plus grande si une partie du métal ne travaille pas." },
      motif: { prompt: "Un polymère vinylique linéaire a pour motif –CH₂–CH(C₄H₉)–. Quel alcène a-t-on polymérisé par coordination ?",
        options: { a: "L'hexane.", b: "Le but-1-ène.", c: "L'hex-1-ène, CH₂=CH–C₄H₉.", d: "L'éthène et le butane." },
        why: "On referme la double liaison entre les deux carbones de la chaîne du motif : CH₂=CH–C₄H₉, l'hex-1-ène, C₆H₁₂, mêmes atomes que le motif. En petite quantité avec l'éthène, il donne le polyéthylène linéaire basse densité. Leçon « Polymérisation des alcènes par coordination »." },
      chaines: { prompt: "Un métallocène à site unique polymérise l'éthène (M₀ = 28,05\u00a0g·mol⁻¹) avec vₚ/vₜ = 1\u202f999. Que prévoit la loi de Schulz et Flory ?",
        options: { a: "X̄ₙ = 1\u202f999 exactement et Đ = 1.", b: "Mₙ ≈ 28\u00a0g·mol⁻¹ et Đ ≈ 2.", c: "Mₙ ≈ 112\u00a0kg·mol⁻¹ et Đ ≈ 4.", d: "X̄ₙ = 2\u202f000, Mₙ ≈ 56\u00a0kg·mol⁻¹ et Đ ≈ 2." },
        hint: "X̄ₙ = 1 + vₚ/vₜ et Đ = 1 + p.",
        why: "X̄ₙ = 1 + 1\u202f999 = 2\u202f000 motifs, Mₙ = 2\u202f000 × 28,05 ≈ 5,6 × 10⁴\u00a0g·mol⁻¹ = 56\u00a0kg·mol⁻¹. p = 0,9995, donc Đ ≈ 2 : un site unique ne donne jamais plus. Đ ≈ 4 signalerait plusieurs sortes de sites, comme sur un catalyseur de Ziegler–Natta." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

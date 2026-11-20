/* Épreuve de l'étape « Matrices de Pauli » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      energies: { prompt: "Un électron au repos est dans un champ de 0,5\u00a0T dirigé selon (1, 1, 1)/√3. On prend |μ| = μB ≈ 9,27 × 10⁻²⁴\u00a0J·T⁻¹. Quelles énergies peut-on mesurer, et quel est l'écart en fréquence ?",
        options: { a: "±4,6 × 10⁻²⁴\u00a0J, soit un écart de 14\u00a0GHz, comme pour un champ de 0,5\u00a0T le long de z.", b: "±4,6 × 10⁻²⁴\u00a0J divisé par √3, la projection sur z.", c: "Une infinité de valeurs, selon l'orientation du spin.", d: "±8,0 × 10⁻²⁴\u00a0J, la somme des trois composantes." },
        hint: "Les énergies sont les valeurs propres de \u2212μσ·B, et (σ·n)² = 1.",
        why: "Les valeurs propres de \u2212μσ·B sont ±μ|B| = ±4,6 × 10⁻²⁴\u00a0J, quelle que soit la direction. L'écart 9,3 × 10⁻²⁴\u00a0J correspond à 14\u00a0GHz. La projection sur z n'est que le coefficient H11. Leçon « Les matrices de spin de Pauli »." },
      table: { prompt: "Que vaut σ̂x|\u2212⟩, puis σ̂y σ̂x|\u2212⟩ ?",
        options: { a: "|\u2212⟩, puis \u2212i|\u2212⟩.", b: "|+⟩, puis i|\u2212⟩.", c: "\u2212|\u2212⟩, puis |+⟩.", d: "|+⟩, puis \u2212i|+⟩." },
        hint: "Un produit agit de droite à gauche ; σ̂y|+⟩ = i|\u2212⟩.",
        why: "σ̂x échange |+⟩ et |\u2212⟩ : σ̂x|\u2212⟩ = |+⟩. Puis σ̂y|+⟩ = i|\u2212⟩. Vérification : σ̂yσ̂x = \u2212iσ̂z, et \u2212iσ̂z|\u2212⟩ = i|\u2212⟩. Leçon « Les matrices de spin comme opérateurs »." },
      produit: { prompt: "Que vaut le produit σx σy σz ?",
        options: { a: "La matrice nulle.", b: "σx.", c: "i fois la matrice unité.", d: "\u2212σz." },
        hint: "Remplacez σxσy par iσz.",
        why: "σxσy = iσz, puis iσz σz = i·1, puisque σz² = 1. Leçons « Les matrices de spin de Pauli » et « Les matrices de spin comme opérateurs »." },
      demitour: { prompt: "Un spin pointe selon +x. On lui applique σ̂z. Vers où pointe-t-il, et que lui a-t-on fait ?",
        options: { a: "Toujours selon +x : σ̂z ne change que la phase globale.", b: "Selon +z : σ̂z le projette sur z.", c: "Selon \u2212z : σ̂z change le signe de sa composante z.", d: "Selon \u2212x : σ̂z le fait tourner de 180° autour de z, en changeant le signe de C\u2212." },
        hint: "Le spin selon +x est (|+⟩ + |\u2212⟩)/√2.",
        why: "σ̂z(|+⟩ + |\u2212⟩)/√2 = (|+⟩ \u2212 |\u2212⟩)/√2, l'état selon \u2212x. Le signe relatif des amplitudes est une phase relative de π : une rotation de 180° autour de z. Leçon « Les matrices de spin comme opérateurs »." },
      fictif: { prompt: "Un système à deux états a pour matrice hamiltonienne H11 = 3, H22 = 1, H12 = H21 = 1, en unités de 10⁻²⁴\u00a0J. Quel est son « champ fictif » a et quelles sont ses énergies ?",
        options: { a: "a = (1, 0, 1), E = 2 ± √2, en 10⁻²⁴\u00a0J.", b: "a = (1, 1, 2), E = 2 ± √6.", c: "a = (0, 0, 2), E = 3 et 1.", d: "a = (1, 0, 3), E = ±√10." },
        hint: "E0 = (H11 + H22)/2, az = (H11 \u2212 H22)/2, ax \u2212 i ay = H12.",
        why: "E0 = 2, az = 1, ax = 1, ay = 0. Les énergies sont E0 ± |a| = 2 ± √2 ≈ 3,41 et 0,59. Le couplage écarte les niveaux de 3 et 1. Leçon « La résolution des équations à deux états »." },
      stark: { prompt: "On double un champ électrique faible (μℰ ≪ A) appliqué à l'ammoniac. De combien varie le déplacement des niveaux ?",
        options: { a: "Il double.", b: "Il est multiplié par 4 : en champ faible, E = ±(A + μ²ℰ²/2A).", c: "Il ne change pas.", d: "Il est multiplié par √2." },
        why: "√(A² + μ²ℰ²) ≈ A + μ²ℰ²/2A : le déplacement est quadratique. Ce n'est qu'en champ fort que l'effet devient linéaire. Leçon « La résolution des équations à deux états »." },
      bascule: { prompt: "Pour un système H = Aσz + Wσx parti de l'état +1 de σz, on mesure une probabilité maximale de basculement de 1/2. Que vaut W/A ?",
        options: { a: "1/2.", b: "√2.", c: "1 : le champ fictif est incliné à 45°.", d: "2." },
        hint: "Le maximum vaut W²/(A² + W²).",
        why: "W²/(A² + W²) = 1/2 donne W = A. Le spin fictif tourne alors sur un cône de demi-angle 45° autour d'un axe à 45° de z, et passe par l'équateur sans atteindre \u2212z. Leçon « La résolution des équations à deux états »." },
      duree: { prompt: "Pour faire subir à un électron l'opération σ̂x avec un champ de 1\u00a0mT le long de x, combien de temps faut-il appliquer le champ ?",
        options: { a: "Aucun : un opérateur agit instantanément.", b: "Environ 36\u00a0ns, une précession complète.", c: "Environ 9\u00a0ns, un quart de tour.", d: "Environ 18\u00a0ns, un demi-tour à 2μB B/ħ ≈ 1,8 × 10⁸\u00a0rad·s⁻¹." },
        why: "σ̂x est une rotation de 180° autour de x, à une phase près. La précession se fait à 2μB B/ħ ≈ 1,76 × 10⁸\u00a0rad·s⁻¹ ; π radians prennent 17,9\u00a0ns. L'opérateur est instantané, le processus physique qui le réalise ne l'est pas. Leçons « Les matrices de spin comme opérateurs » et « La résolution des équations à deux états »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

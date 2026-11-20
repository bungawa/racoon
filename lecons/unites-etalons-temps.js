/* Calcul de la leçon « Unités et étalons de temps » (Feynman I, §5-5) : dérive d'une horloge,
   écart entre le temps de la rotation terrestre et le temps atomique, décalage gravitationnel. SI. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const CS = Cst.dnu_Cs, C = Cst.c, G0 = Cst.g0;
  const DAY = 86400;                  // s (secondes SI)
  const YEAR = 365.25 * DAY;          // année julienne, s

  /* dérive accumulée par une horloge d'écart relatif de fréquence y pendant t : Δt = y t */
  function drift(y, t) {
    if (!(y >= 0) || !(t >= 0)) throw new RangeError("y ≥ 0 et t ≥ 0 attendus");
    return y * t;
  }

  /* durée au bout de laquelle la dérive atteint d */
  function timeToDrift(y, d) {
    if (!(d > 0)) throw new RangeError("dérive cible > 0 attendue");
    if (!(y >= 0)) throw new RangeError("y ≥ 0 attendu");
    return y === 0 ? Infinity : d / y;
  }

  /* nombre de périodes de la transition du césium pendant t */
  const cesiumCycles = t => t * CS;

  /* Écart cumulé entre le temps atomique et le temps de la rotation terrestre.
     Chaque jour solaire dure 86 400 s + e(Y), e en s, avec e(Y) = e0 + a Y (Y en années, a en s par jour et par an).
     Écart après Y années : X(Y) = J (e0 Y + a Y² / 2), J = 365,25 jours par an. */
  const offset = (e0, a, Y) => 365.25 * (e0 * Y + a * Y * Y / 2);

  /* première durée Y > 0 (en années) où |X(Y)| atteint D (en s) ; Infinity si jamais */
  function yearsToOffset(e0, a, D) {
    if (!(D > 0)) throw new RangeError("seuil > 0 attendu");
    const J = 365.25, roots = [];
    for (const s of [1, -1]) {                       // J (a/2) Y² + J e0 Y - s D = 0
      const A = J * a / 2, B = J * e0, Cc = -s * D;
      if (A === 0) { if (B !== 0) roots.push(-Cc / B); continue; }
      const disc = B * B - 4 * A * Cc;
      if (disc < 0) continue;
      const q = -(B + Math.sign(B || 1) * Math.sqrt(disc)) / 2;   // forme stable
      roots.push(q / A); if (q !== 0) roots.push(Cc / q);
    }
    const pos = roots.filter(r => r > 0 && isFinite(r));
    return pos.length ? Math.min(...pos) : Infinity;
  }

  /* décalage relatif de fréquence entre deux horloges séparées d'une hauteur h : Δf/f = g h / c² */
  const gravShift = (h, g) => (g == null ? G0 : g) * h / (C * C);

  const api = { CS, C, G0, DAY, YEAR, drift, timeToDrift, cesiumCycles, offset, yearsToOffset, gravShift };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Etalons = api;
})(typeof self !== "undefined" ? self : this);

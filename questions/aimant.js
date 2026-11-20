/* Calcul de l'article « C'est quoi un aimant ? » : champ d'un dipôle, lignes de champ, aimantation de Weiss.
   SI : longueurs en m, champs en T, moments en A·m². Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const MU0 = Cst.mu0, MU_B = Cst.mu_B;
  const B_TERRE_H = 20e-6;                // composante horizontale du champ terrestre en France, ≈ 2 × 10⁻⁵ T

  /* champ d'un dipôle m porté par +x, placé à l'origine, au point (x, y) du plan qui le contient → [Bx, By]
     B = μ0/(4π r³) [3 (m·r̂) r̂ − m] */
  function dipole(m, x, y) {
    const r2 = x * x + y * y;
    if (!(r2 > 0)) throw new RangeError("dipôle : point confondu avec le dipôle");
    const r = Math.sqrt(r2), c = MU0 * m / (4 * Math.PI * r2 * r);
    return [c * (3 * x * x / r2 - 1), c * 3 * x * y / r2];
  }

  /* champ total : dipôle + champ uniforme b porté par +y (le nord géographique, en haut du dessin) */
  function total(m, x, y, b) { const d = dipole(m, x, y); return [d[0], d[1] + (b || 0)]; }

  /* ligne de champ du dipôle seul : r = C sin²θ (θ compté depuis l'axe), demi-plan y ≥ 0 ; n + 1 points */
  function ligne(C, n) {
    if (!(C > 0)) throw new RangeError("ligne : C > 0 attendu");
    n = n || 120;
    const out = [];
    for (let i = 0; i <= n; i++) {
      const th = 0.02 + (Math.PI - 0.04) * i / n, r = C * Math.sin(th) ** 2;
      out.push([r * Math.cos(th), r * Math.sin(th)]);
    }
    return out;
  }

  /* distance, sur l'axe, où le champ du dipôle vaut b : 2 μ0 m / (4π r³) = b */
  function rAxe(m, b) {
    if (!(m > 0) || !(b > 0)) throw new RangeError("rAxe : m et b > 0 attendus");
    return Math.cbrt(2 * MU0 * m / (4 * Math.PI * b));
  }

  /* moment d'un aimant uniformément aimanté : m = Br V / μ0 */
  function moment(Br, V) {
    if (!(Br >= 0) || !(V > 0)) throw new RangeError("moment : Br ≥ 0 et V > 0 attendus");
    return Br * V / MU0;
  }

  /* aimantation réduite de Weiss (spin 1/2, champ moyen) : M/Ms = tanh((M/Ms) / t), t = T/Tc.
     Pour t ≥ 1 la seule solution est 0 ; sinon, la racine non nulle, par dichotomie. */
  function weiss(t) {
    if (!(t >= 0)) throw new RangeError("weiss : T/Tc ≥ 0 attendu");
    if (t >= 1) return 0;
    if (t < 1e-3) return 1;
    let lo = 0, hi = 1;
    for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (mid - Math.tanh(mid / t) < 0) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }

  const api = { MU0, MU_B, B_TERRE_H, dipole, total, ligne, rAxe, moment, weiss };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Aimant = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de la leçon « Ordres de grandeur » (X.mesure.2). Pur, sans DOM, SI.
   Ordre de grandeur = puissance de dix la plus proche, au sens logarithmique ; estimations de Fermi. */
(function (root) {
  /* x = m × 10^e avec 1 ≤ |m| < 10 */
  function sciParts(x) {
    if (!isFinite(x) || x === 0) throw new Error("sciParts: nombre fini non nul attendu");
    let e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    if (Math.abs(m) >= 10 - 1e-12) { m /= 10; e += 1; }
    if (Math.abs(m) < 1) { m *= 10; e -= 1; }
    return { m, e };
  }
  /* ordre de grandeur : on arrondit le logarithme décimal ; la frontière entre 10ⁿ et 10ⁿ⁺¹ est √10 × 10ⁿ ≈ 3,16 × 10ⁿ */
  function oom(x) {
    if (!(Math.abs(x) > 0) || !isFinite(x)) throw new Error("oom: nombre fini non nul attendu");
    return Math.round(Math.log10(Math.abs(x)));
  }
  /* écart en « décades » entre deux estimations : |log₁₀(a/b)| */
  function decades(a, b) { return Math.abs(Math.log10(a / b)); }

  /* estimation de Fermi : produit de facteurs vᵢ^pᵢ ; factors = [[v, p], …] */
  function product(factors) { return factors.reduce((q, [v, p]) => q * Math.pow(v, p == null ? 1 : p), 1); }

  /* chaque facteur est connu à un facteur k près (log₁₀ de l'erreur uniforme sur [−log k ; +log k]) :
     pire cas k^n ; cas typique (écart-type du log) k^(√(n/3)), car les erreurs indépendantes se compensent */
  function spread(n, k) {
    const s = Math.log10(k) * Math.sqrt(n / 3);
    return { worst: Math.pow(k, n), typical: Math.pow(10, s), sigmaLog: s };
  }
  /* simulation : fraction des estimations à moins d'un facteur `within` de la vraie valeur */
  function simulate(n, k, within, trials, rand) {
    const lk = Math.log10(k), lw = Math.log10(within); let ok = 0;
    for (let t = 0; t < trials; t++) { let s = 0; for (let i = 0; i < n; i++) s += lk * (2 * rand() - 1); if (Math.abs(s) <= lw) ok++; }
    return ok / trials;
  }

  /* position sur une échelle logarithmique [lo, hi] (exposants), en fraction 0..1 */
  function logPos(x, lo, hi) { return Math.min(1, Math.max(0, (Math.log10(x) - lo) / (hi - lo))); }

  const api = { sciParts, oom, decades, product, spread, simulate, logPos };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Ordres = api;
})(typeof self !== "undefined" ? self : this);

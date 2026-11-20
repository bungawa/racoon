/* Geometry of large distances (Feynman I, §5-6): triangulation, parallax, time of flight, inverse square law. SI units, angles in rad. Pure, UMD. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, AU = Cst.au, PC = Cst.pc;
  const ARCSEC = Math.PI / 648000;              // rad

  /* Triangle on a baseline b between A and B; alpha, beta = angles between the baseline and the two lines of sight.
     Returns the distance from the target to the baseline (the height of the triangle), or NaN if no triangle closes. */
  function triangulate(b, alpha, beta) {
    if (!(b > 0) || !(alpha > 0) || !(beta > 0) || !(alpha + beta < Math.PI)) return NaN;
    return b * Math.sin(alpha) * Math.sin(beta) / Math.sin(alpha + beta);
  }

  /* Symmetric case: the target, seen from the baseline's perpendicular bisector, subtends the half-angle p (the parallax). */
  const distance = (b, p) => b > 0 && p > 0 && p < Math.PI / 2 ? b / 2 / Math.tan(p) : NaN;
  const angle = (b, d) => b > 0 && d > 0 ? Math.atan(b / 2 / d) : NaN;

  /* What an angle uncertainty dp does: the true target lies between near and far (Infinity once dp ≥ p). */
  function interval(b, p, dp) {
    const d = distance(b, p), near = distance(b, Math.min(p + dp, Math.PI / 2 - 1e-12));
    const far = p - dp > 0 ? distance(b, p - dp) : Infinity;
    return { d, near, far, rel: dp / p };        // rel = first-order relative uncertainty Δd/d = Δp/p
  }
  /* Relative uncertainty for a target at distance d: grows linearly with d when p is small. */
  const relError = (b, d, dp) => dp / angle(b, d);
  /* The farthest target measured to a relative uncertainty r. */
  const reach = (b, dp, r) => distance(b, dp / r);

  /* Time of flight: the echo travels there and back. */
  const echo = dt => C * dt / 2;
  const roundTrip = d => 2 * d / C;

  /* Standard candle: a source of power L seen with flux F (W·m⁻²) lies at d = √(L / 4πF). */
  const fluxAt = (L, d) => L / (4 * Math.PI * d * d);
  const candle = (L, F) => L > 0 && F > 0 ? Math.sqrt(L / (4 * Math.PI * F)) : NaN;

  const api = { C, AU, PC, ARCSEC, triangulate, distance, angle, interval, relError, reach, echo, roundTrip, fluxAt, candle };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Dist = api;
})(typeof self !== "undefined" ? self : this);

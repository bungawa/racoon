/* Short distances (Feynman I, §5-7): diffraction limit, electron wavelength, Bragg's law, nuclear size by cross section. SI units. Pure, UMD. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const H = Cst.h, C = Cst.c, E = Cst.e, ME = Cst.m_e, NA = Cst.N_A;
  const R0 = 1.2e-15;                                                                                           // m, nuclear radius constant

  /* Abbe: smallest separation a microscope resolves, for wavelength lambda and numerical aperture na = n sin α. */
  const abbe = (lambda, na) => lambda > 0 && na > 0 ? lambda / (2 * na) : NaN;

  /* de Broglie wavelength of an electron accelerated through U volts, relativistic. */
  function electronWavelength(U) {
    if (!(U > 0)) return NaN;
    const K = E * U;
    return H / Math.sqrt(2 * ME * K * (1 + K / (2 * ME * C * C)));
  }

  /* Bragg: planes spaced d reflect wavelength lambda at the glancing angle θ when 2 d sin θ = n λ. */
  const braggAngle = (d, lambda, n) => { const s = n * lambda / (2 * d); return d > 0 && lambda > 0 && s > 0 && s <= 1 ? Math.asin(s) : NaN; };
  const braggOrders = (d, lambda) => { const out = []; for (let n = 1; n * lambda <= 2 * d; n++) out.push(braggAngle(d, lambda, n)); return out; };
  /* Path difference between neighbouring planes, in wavelengths. */
  const pathRatio = (d, lambda, theta) => 2 * d * Math.sin(theta) / lambda;
  /* Intensity reflected by N equally spaced planes, relative to the peak (1 at a Bragg angle). */
  function braggIntensity(d, lambda, theta, N) {
    const phi = 2 * Math.PI * pathRatio(d, lambda, theta), s = Math.sin(phi / 2);
    if (Math.abs(s) < 1e-9) return 1;
    const r = Math.sin(N * phi / 2) / (N * s);
    return r * r;
  }

  /* Rock salt: 4 NaCl per cubic cell of edge a, so a³ = 4 M / (ρ N_A). Chemistry gives the spacing that X-rays measure. */
  const cubicCell = (rho, M, perCell) => Math.cbrt(perCell * M / (rho * NA));

  /* Nuclei. */
  const nuclearRadius = A => R0 * Math.cbrt(A);
  const geometric = r => Math.PI * r * r;
  const numberDensity = (rho, M) => rho * NA / M;               // atoms per m³
  /* Fraction of a beam stopped by a slab of thickness x: Feynman's thin-slab count, and the exact exponential. */
  const blockedThin = (n, sigma, x) => n * sigma * x;
  const blocked = (n, sigma, x) => -Math.expm1(-n * sigma * x);
  /* Back from counts n1 (in) and n2 (out) to the cross section. */
  const sigmaThin = (n1, n2, n, x) => (n1 - n2) / (n1 * n * x);
  const sigmaExact = (n1, n2, n, x) => n2 > 0 && n2 <= n1 ? Math.log(n1 / n2) / (n * x) : NaN;

  const api = { H, C, E, ME, NA, R0, abbe, electronWavelength, braggAngle, braggOrders, pathRatio, braggIntensity, cubicCell,
    nuclearRadius, geometric, numberDensity, blockedThin, blocked, sigmaThin, sigmaExact };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Petit = api;
})(typeof self !== "undefined" ? self : this);

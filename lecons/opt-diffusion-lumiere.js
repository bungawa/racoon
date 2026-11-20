/* Le ciel coloré de la leçon « La diffusion de la lumière » (Feynman I.32.5) : la lumière du Soleil à travers l'atmosphère de
   Rayleigh de optique-ondulatoire.js (epaisseurRayleigh, masseAir), le Soleil en corps noir de statistique.js (planckLambda,
   T_SOLEIL). Pur, sans DOM, UMD (global CielRayleigh). SI partout. Les teintes : CouleursOptiques.couleurSpectre (couleurs-optiques.js). */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const O = node ? require("../optique-ondulatoire.js") : root.OptOnd;
  const S = node ? require("../statistique.js") : root.Statistique;
  const err = m => { throw new Error("CielRayleigh : " + m); };

  /* ciel(h, o): sunlight at elevation h (rad) through the Rayleigh atmosphere. soleil(λ): the direct beam, B(λ) e^{−τ m};
     zenith(λ): the light scattered once toward a viewer looking straight up, from every layer of the column,
     B(λ) e^{−τ} (1 − e^{−τ(m − 1)})/(m − 1) (→ B τ e^{−τ} when m → 1), up to a factor that does not depend on λ.
     B: Planck at the Sun's effective temperature (o.Ts, else 5 772 K), relative to its value at 550 nm. o is passed to masseAir
     and epaisseurRayleigh (p, g, F, T, R). Model: single scattering, molecules only (no aerosols, no ozone absorption), flat
     layers for the downward path. */
  function ciel(h, o) {
    o = o || {};
    const Ts = o.Ts === undefined ? S.T_SOLEIL : o.Ts;
    if (!(Ts > 0)) err("Ts doit être un nombre > 0");
    const m = O.masseAir(h, o).m, B0 = S.planckLambda(550e-9, Ts);
    const B = l => S.planckLambda(l, Ts) / B0, tau = l => O.epaisseurRayleigh(l, o).tau;
    return { m, tau, B,
      soleil: l => B(l) * Math.exp(-tau(l) * m),
      zenith: l => { const t = tau(l); return B(l) * Math.exp(-t) * (m - 1 > 1e-9 ? -Math.expm1(-t * (m - 1)) / (m - 1) : t); } };
  }

  const api = { ciel };
  if (node) module.exports = api;
  else root.CielRayleigh = api;
})(typeof self !== "undefined" ? self : this);

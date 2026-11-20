/* Calcul de la leçon « Mesurer le mouvement : temps et distance » (Feynman I, §5-1). Pur, sans DOM, SI.
   La rigole de Galilée : une bille roule, on marque sa position à chaque « tic » d'une horloge plus ou moins régulière. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G = Cst.g_CPGE;                                    // m·s⁻²
  /* bille pleine roulant sans glisser sur un plan incliné d'angle α : a = (5/7) g sin α */
  function accel(alphaDeg, g) { return (5 / 7) * (g || G) * Math.sin(alphaDeg * Math.PI / 180); }
  function distance(a, t) { return a * t * t / 2; }

  const gauss = (typeof module !== "undefined" && module.exports ? require("./incertitude-absolue-relative.js") : root.Incert).gauss;   // one copy, in Incert
  /* instants des tics : chaque intervalle vaut period × (1 + irr × N(0,1)), jamais négatif ; arrêt après tMax */
  function ticks(period, irr, tMax, rand) {
    if (!(period > 0)) throw new Error("ticks: période positive attendue");
    const out = []; let t = 0;
    for (let k = 0; k < 1000; k++) { t += period * Math.max(0.05, 1 + irr * gauss(rand)); if (t > tMax) break; out.push(t); }
    return out;
  }
  /* l'expérience : marques de position aux tics, tant que la bille est sur la rigole de longueur len */
  function experiment(alphaDeg, len, period, irr, rand) {
    const a = accel(alphaDeg), tEnd = Math.sqrt(2 * len / a);
    const ts = ticks(period, irr, tEnd, rand);
    return { a, tEnd, ts, ds: ts.map(t => distance(a, t)) };
  }
  /* ajustement d ≈ c × kᵖ par moindres carrés sur (ln k, ln d) : p = 2 pour une horloge régulière */
  function powerFit(ds) {
    const n = ds.length; if (n < 2) return { p: NaN, c: NaN };
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    ds.forEach((d, i) => { const x = Math.log(i + 1), y = Math.log(d); sx += x; sy += y; sxx += x * x; sxy += x * y; });
    const p = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    return { p, c: Math.exp((sy - p * sx) / n) };
  }
  /* rapports dₖ/d₁ : 1, 4, 9, 16… pour une horloge parfaite */
  function ratios(ds) { return ds.map(d => d / ds[0]); }

  const api = { G, accel, distance, gauss, ticks, experiment, powerFit, ratios };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Mouv = api;
})(typeof self !== "undefined" ? self : this);

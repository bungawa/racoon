/* Calcul de la leçon « Incertitude absolue et incertitude relative » (X.mesure.1). Pur, sans DOM, SI.
   Incertitudes-types (écart-type de la grandeur), composition en quadrature, Monte-Carlo, écart normalisé. */
(function (root) {
  /* --- évaluation de type A : série de n mesures indépendantes --- */
  function mean(xs) { if (!xs.length) return NaN; let s = 0; for (const x of xs) s += x; return s / xs.length; }
  function stdev(xs) {                                    // écart-type expérimental, n − 1 au dénominateur
    if (xs.length < 2) return NaN;
    const m = mean(xs); let s = 0; for (const x of xs) s += (x - m) * (x - m);
    return Math.sqrt(s / (xs.length - 1));
  }
  /* type A : la moyenne de n mesures a pour incertitude-type s/√n */
  function typeA(xs) { const s = stdev(xs); return { n: xs.length, mean: mean(xs), s, u: s / Math.sqrt(xs.length) }; }

  /* --- évaluation de type B : valeur seulement encadrée, x ∈ [x0 − a, x0 + a], loi uniforme --- */
  function typeB(a) { if (!(a >= 0)) throw new Error("typeB: demi-étendue négative"); return a / Math.sqrt(3); }

  /* --- composition (grandeurs indépendantes) --- */
  const quad = (...us) => Math.sqrt(us.reduce((s, u) => s + u * u, 0));
  /* somme ou différence : les incertitudes absolues s'ajoutent en quadrature */
  function uSum(...us) { return quad(...us); }
  /* produit, quotient, puissances : q = Π xᵢ^nᵢ → u(q)/|q| = √Σ (nᵢ u(xᵢ)/xᵢ)² ; terms = [[x, u, n], …] */
  function uRelProduct(terms) { return quad(...terms.map(([x, u, n]) => (n == null ? 1 : n) * u / Math.abs(x))); }

  /* --- pendule simple : g = 4π² L / T² --- */
  function pendulum(L, T, uL, uT) {
    if (!(L > 0 && T > 0)) throw new Error("pendule: L et T doivent être positifs");
    const g = 4 * Math.PI * Math.PI * L / (T * T);
    const rL = uL / L, rT = 2 * uT / T, r = Math.hypot(rL, rT);
    const tot = rL * rL + rT * rT;
    return { g, rL, rT, r, u: g * r, shareL: tot ? rL * rL / tot : 0.5, shareT: tot ? rT * rT / tot : 0.5 };
  }

  /* --- Monte-Carlo : tirages gaussiens de L et T, histogramme de g --- */
  function gauss(rand) { let u = 0; while (u === 0) u = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand()); }
  function monteCarlo(L, T, uL, uT, n, rand) {
    const gs = new Float64Array(n);
    for (let i = 0; i < n; i++) { const l = L + uL * gauss(rand), t = T + uT * gauss(rand); gs[i] = 4 * Math.PI * Math.PI * l / (t * t); }
    return gs;
  }
  function histogram(xs, lo, hi, bins) {
    const c = new Array(bins).fill(0), w = (hi - lo) / bins;
    for (const x of xs) { const k = Math.floor((x - lo) / w); if (k >= 0 && k < bins) c[k]++; }
    return c;
  }

  /* --- écriture : u à deux chiffres significatifs (au plus), valeur arrondie à la même décimale --- */
  function round(x, u, sig) {
    sig = sig || 2;
    if (!(u > 0) || !isFinite(x)) return { x, u, decimals: null };
    const e = Math.floor(Math.log10(u)) - (sig - 1);           // rang du dernier chiffre gardé
    let ur = Math.round(u / Math.pow(10, e)) * Math.pow(10, e);
    let last = e;
    if (Math.floor(Math.log10(ur)) - (sig - 1) > e) last = e + 1; // 0,0996 → 0,10 : un rang de plus
    const p = Math.pow(10, last), xr = Math.round(x / p) * p;
    ur = Math.round(ur / p) * p;
    return { x: +xr.toPrecision(15), u: +ur.toPrecision(15), decimals: Math.max(0, -last) };
  }

  /* --- comparaison de deux valeurs : écart normalisé z = |x₁ − x₂| / √(u₁² + u₂²) --- */
  function zScore(x1, u1, x2, u2) { const d = Math.hypot(u1, u2); return d > 0 ? Math.abs(x1 - x2) / d : (x1 === x2 ? 0 : Infinity); }

  const api = { mean, stdev, typeA, typeB, uSum, uRelProduct, pendulum, gauss, monteCarlo, histogram, round, zScore };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Incert = api;
})(typeof self !== "undefined" ? self : this);

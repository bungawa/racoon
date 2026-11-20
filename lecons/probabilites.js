/* Calcul de l'étape « Probabilités » (Feynman vol. I, chap. 6). Pur, sans DOM, SI. UMD (global Proba).
   Une seule copie pour les cinq leçons : fréquences, loi binomiale, marche au hasard, loi normale, inégalité de Heisenberg.
   Tirages : une fonction rand() → [0 ; 1[ (Quiz.rng pour une suite reproductible). Moyenne, écart-type, histogramme
   et tirage gaussien viennent de « Incertitude absolue et incertitude relative » (global Incert), pas d'une seconde copie. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Incert = node ? require("./incertitude-absolue-relative.js") : root.Incert;
  const C = node ? require("../constantes.js") : root.Constantes;

  /* ---------- 6.1 : fréquence d'un événement ---------- */
  /* événements du dessin : probabilité exacte et tirage d'une épreuve (rand → vrai si l'événement a lieu) */
  const EVENTS = {
    pile: { p: 1 / 2, draw: r => r() < 0.5 },
    six: { p: 1 / 6, draw: r => Math.floor(6 * r()) === 5 },
    doubleUn: { p: 1 / 36, draw: r => Math.floor(6 * r()) === 0 && Math.floor(6 * r()) === 0 },
    carte: { p: 1 / 52, draw: r => Math.floor(52 * r()) === 0 },
  };
  /* N épreuves de plus ; state = {n, k} (épreuves, succès) modifié en place */
  function trials(ev, state, N, rand) { const e = EVENTS[ev]; for (let i = 0; i < N; i++) { state.n++; if (e.draw(rand)) state.k++; } return state; }

  /* probabilité de collision dans une lame mince (6.3) : n noyaux sur l'aire A, section σ chacun ; nv par m³, épaisseur e */
  const collisionThin = (nv, e, sigma) => nv * e * sigma;
  /* sans l'hypothèse « lame mince » : les noyaux se masquent, P = 1 − exp(−nv e σ) */
  const collisionThick = (nv, e, sigma) => -Math.expm1(-nv * e * sigma);

  /* ---------- 6.2 : loi binomiale ---------- */
  const lnFactCache = [0];
  function lnFact(n) {
    if (!(n >= 0) || n !== Math.floor(n)) throw new Error("lnFact : entier positif attendu");
    for (let i = lnFactCache.length; i <= n; i++) lnFactCache[i] = lnFactCache[i - 1] + Math.log(i);
    return lnFactCache[n];
  }
  /* coefficient binomial (6.4), exact tant qu'il reste sous 2⁵³ */
  function choose(n, k) {
    if (k < 0 || k > n) return 0;
    k = Math.min(k, n - k); let c = 1;
    for (let i = 1; i <= k; i++) c = c * (n - k + i) / i;
    return Math.round(c);
  }
  /* P(k, n) = C(n, k) pᵏ qⁿ⁻ᵏ (6.6) ; p = 1/2 donne (6.5). En logarithmes : tient jusqu'à n ~ 10⁶. */
  function binomial(k, n, p) {
    if (p == null) p = 0.5;
    if (k < 0 || k > n || k !== Math.floor(k)) return 0;
    if (p === 0) return k === 0 ? 1 : 0;
    if (p === 1) return k === n ? 1 : 0;
    return Math.exp(lnFact(n) - lnFact(k) - lnFact(n - k) + k * Math.log(p) + (n - k) * Math.log1p(-p));
  }
  const binomialAll = (n, p) => Array.from({ length: n + 1 }, (_, k) => binomial(k, n, p));
  /* nombre de « pile » en n lancers de probabilité p */
  function heads(n, p, rand) { let k = 0; for (let i = 0; i < n; i++) if (rand() < p) k++; return k; }
  /* M séries de n lancers : combien de séries ont donné k piles, k = 0…n (le tableau 6-1 de Feynman : M = 100, n = 30) */
  function series(M, n, p, rand) { const c = new Array(n + 1).fill(0); for (let j = 0; j < M; j++) c[heads(n, p, rand)]++; return c; }
  const mode = counts => counts.indexOf(Math.max(...counts));

  /* ---------- 6.3 : marche au hasard ---------- */
  /* un pas : ±1 (pile ou face), ou longueur uniforme sur [−√3 ; √3], de même ⟨S²⟩ = 1 (le pas variable de 6.4) */
  const STEPS = { pm1: r => (r() < 0.5 ? -1 : 1), uniforme: r => Math.sqrt(3) * (2 * r() - 1) };
  /* positions D₀ = 0, D₁, …, D_N d'une marche */
  function walk(N, rand, step) {
    const s = STEPS[step || "pm1"], D = new Float64Array(N + 1);
    for (let i = 1; i <= N; i++) D[i] = D[i - 1] + s(rand);
    return D;
  }
  /* position finale seulement, pour M marcheurs */
  function finals(M, N, rand, step) {
    const s = STEPS[step || "pm1"], out = new Float64Array(M);
    for (let j = 0; j < M; j++) { let d = 0; for (let i = 0; i < N; i++) d += s(rand); out[j] = d; }
    return out;
  }
  const meanSquare = xs => { let s = 0; for (const x of xs) s += x * x; return xs.length ? s / xs.length : NaN; };
  /* ⟨D_N²⟩ = N (6.9) pour des pas ±1 ; sur M marches, sa moyenne mesurée fluctue de √((2N² − 2N)/M) (variance de D_N²) */
  const msdSpread = (N, M) => Math.sqrt((2 * N * N - 2 * N) / M);
  /* fraction de « pile » après chaque lancer : fractions[i] = N_H/(i + 1) */
  function runningFraction(N, p, rand) {
    const f = new Float64Array(N); let k = 0;
    for (let i = 0; i < N; i++) { if (rand() < p) k++; f[i] = k / (i + 1); }
    return f;
  }
  /* (6.14) : la fraction de pile s'écarte de 1/2 d'environ 1/(2√N) (écart-type) */
  const fractionSpread = N => 1 / (2 * Math.sqrt(N));

  /* ---------- 6.4 : densité de probabilité, loi normale ---------- */
  const normalPdf = (x, sigma, mu) => { const z = (x - (mu || 0)) / sigma; return Math.exp(-z * z / 2) / (sigma * Math.sqrt(2 * Math.PI)); };
  /* fonction d'erreur complémentaire, approximation de Tchebychev (Numerical Recipes, erfcc) : erreur relative < 1,2 × 10⁻⁷ partout,
     y compris dans la queue, où 1 − erf perdrait tous ses chiffres */
  function erfc(x) {
    const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
    const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
      t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
  const erf = x => 1 - erfc(x);
  /* (6.18) pour la loi normale : P(x₁ < D < x₂), aire sous la courbe */
  const normalProb = (x1, x2, sigma, mu) => { const k = sigma * Math.SQRT2, m = mu || 0; return 0.5 * (erf((x2 - m) / k) - erf((x1 - m) / k)); };
  /* au-delà de zσ d'un seul côté (critère de découverte « 5σ ») */
  const upperTail = z => 0.5 * erfc(z / Math.SQRT2);
  /* densité estimée : histogramme divisé par (nombre × largeur), pour la comparer à p(x) ; bins de largeur w depuis lo */
  function density(xs, lo, w, bins) {
    const c = Incert.histogram(xs, lo, lo + w * bins, bins), n = xs.length;
    return c.map(k => k / (n * w));
  }
  /* pas ±1 : D a la parité de N ; cases de largeur 2 centrées sur les valeurs permises, de −zσ à +zσ environ */
  function parityBins(N, z) {
    let c = Math.min(N, Math.ceil(z * Math.sqrt(N)));            // valeurs permises symétriques : de −c à c
    if ((c + N) % 2) c += 1;                                      // c ≤ N reste vrai : N a la bonne parité
    return { lo: -c - 1, w: 2, bins: c + 1 };
  }

  /* ---------- 6.5 : inégalité de Heisenberg, Δx Δp ≥ ħ/2 ---------- */
  const minDp = dx => C.hbar / (2 * dx);
  const minDv = (dx, m) => C.hbar / (2 * m * dx);              // (6.22) : Δv ≥ ħ/(2mΔx), tant que Δv ≪ c
  /* l'électron confiné à la taille de l'atome, Δx = a₀ : Δv = ħ/(2 m_e a₀) = αc/2 */
  const hydrogen = () => ({ dx: C.a0, dv: minDv(C.a0, C.m_e), alphaC: C.hbar / (C.m_e * C.a0) });

  const api = { EVENTS, trials, collisionThin, collisionThick,
    lnFact, choose, binomial, binomialAll, heads, series, mode,
    STEPS, walk, finals, meanSquare, msdSpread, runningFraction, fractionSpread,
    normalPdf, erf, erfc, normalProb, upperTail, density, parityBins,
    minDp, minDv, hydrogen,
    mean: Incert.mean, stdev: Incert.stdev, gauss: Incert.gauss };
  if (node) module.exports = api;
  else root.Proba = api;
})(typeof self !== "undefined" ? self : this);

/* Cx — nombres complexes et logarithmes par racines carrées successives. Pur, sans DOM, UMD (global Cx).
   Partagé par les leçons de l'algèbre (I.22) et de la résonance (I.23). Un complexe est un objet {re, im} ;
   chaque fonction rend un objet neuf et ne modifie jamais ses arguments.

   Construction   c(re, im = 0)            polar(r, θ) = r·e^(iθ)
   Arithmétique   add(a, b)  sub(a, b)  mul(a, b)  div(a, b)  neg(a)  conj(a)  scale(a, k)   (k réel)
   Mesures        abs(a) = |a| (Math.hypot : pas de dépassement)   abs2(a) = |a|²   arg(a) ∈ ]−π, π]
   Fonctions      exp(a)   log(a) (branche principale)   pow(a, b) = exp(b·log a), et pow(0, b) = 0 si Re b > 0
   Angles         wrap(θ) : θ ramené dans ]−π, π]
   Comparaison    close(a, b, tol = 1e-12) : |a − b| ≤ tol·max(1, |b|)
   Affichage      text(a, num) : « x + yi » ou « x − yi », num(nombre réel ≥ 0) → chaîne, signe moins U+2212
   Séries         expSeries(z, n) → {sum, bound} : Σ_{k<n} zᵏ/k! et la borne du reste |z|ⁿ/n! / (1 − |z|/(n + 1)),
                  valable si n + 1 > |z| (sinon bound = Infinity)
   Procédé de Feynman (vol. I, § 22.4 et 22.6), base b > 1 :
     roots(b, n)        → [{k, s, v, eps}], k = 0…n : s = 2⁻ᵏ, v = b^s par k racines carrées, eps = v − 1 calculé
                          sans soustraction (eps' = eps / (1 + √(1 + eps))), donc sans élimination catastrophique
     slopes(b, n, how)  → [{k, s, q, x}] : q = (b^s − 1)/s, pente de b^s en 0, qui tend vers ln b ;
                          x = 2q_k − q_(k−1), l'extrapolation « les écarts se divisent par deux » ;
                          how = "naive" calcule b^s − 1 par soustraction, "stable" (défaut) prend eps
     logRoots(x, b, n)  → {value, whole, used, rest, tail, slope} : log_b x par divisions successives par les racines
                          (whole = partie entière, used = les k retenus, rest = facteur restant proche de 1,
                          tail = (rest − 1)/slope, la dernière correction linéaire)
     iSquares(L, n)     → [{k, s, z}] : z₀ = 1 + i·L·2⁻ⁿ (premier ordre, L ≈ ln b) puis k élévations au carré,
                          z_k ≈ b^(i·s) avec s = 2^(k−n) */
(function (root) {
  const c = (re, im) => ({ re: +re, im: im == null ? 0 : +im });
  const polar = (r, t) => c(r * Math.cos(t), r * Math.sin(t));
  const add = (a, b) => c(a.re + b.re, a.im + b.im);
  const sub = (a, b) => c(a.re - b.re, a.im - b.im);
  const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
  const neg = a => c(-a.re, -a.im);
  const conj = a => c(a.re, -a.im);
  const scale = (a, k) => c(a.re * k, a.im * k);
  const abs = a => Math.hypot(a.re, a.im);
  const abs2 = a => a.re * a.re + a.im * a.im;
  const arg = a => Math.atan2(a.im, a.re);
  /* division par le conjugué, mise à l'échelle (Smith, 1962) : pas de dépassement quand |b| est très grand ou très petit */
  function div(a, b) {
    if (b.re === 0 && b.im === 0) throw new RangeError("Cx.div : division par zéro");
    if (Math.abs(b.re) >= Math.abs(b.im)) { const r = b.im / b.re, d = b.re + b.im * r; return c((a.re + a.im * r) / d, (a.im - a.re * r) / d); }
    const r = b.re / b.im, d = b.re * r + b.im; return c((a.re * r + a.im) / d, (a.im * r - a.re) / d);
  }
  const exp = a => polar(Math.exp(a.re), a.im);
  function log(a) { if (a.re === 0 && a.im === 0) throw new RangeError("Cx.log : log 0"); return c(Math.log(abs(a)), arg(a)); }
  function pow(a, b) {
    if (a.re === 0 && a.im === 0) { if (b.re > 0) return c(0, 0); throw new RangeError("Cx.pow : 0 à une puissance de partie réelle ≤ 0"); }
    return exp(mul(b, log(a)));
  }
  function wrap(t) { const T = 2 * Math.PI; let r = t - T * Math.round(t / T); if (r <= -Math.PI) r += T; return r; }
  const close = (a, b, tol) => abs(sub(a, b)) <= (tol == null ? 1e-12 : tol) * Math.max(1, abs(b));
  function text(a, num) {
    const M = "−", re = (a.re < 0 ? M : "") + num(Math.abs(a.re)), im = num(Math.abs(a.im));
    return re + (a.im < 0 || Object.is(a.im, -0) ? " " + M + " " : " + ") + im + " i";
  }

  function expSeries(z, n) {
    let term = c(1, 0), sum = c(0, 0);
    for (let k = 0; k < n; k++) { sum = add(sum, term); term = scale(mul(term, z), 1 / (k + 1)); }
    const r = abs(z); let tn = 1; for (let k = 1; k <= n; k++) tn *= r / k;
    return { sum, bound: n + 1 > r ? tn / (1 - r / (n + 1)) : Infinity };
  }

  function roots(b, n) {
    if (!(b > 1)) throw new RangeError("Cx.roots : base > 1 attendue");
    const out = [{ k: 0, s: 1, v: b, eps: b - 1 }];
    for (let k = 1; k <= n; k++) { const p = out[k - 1], v = Math.sqrt(p.v); out.push({ k, s: p.s / 2, v, eps: p.eps / (1 + Math.sqrt(1 + p.eps)) }); }
    return out;
  }
  function slopes(b, n, how) {
    const naive = how === "naive";
    const out = roots(b, n).map(r => ({ k: r.k, s: r.s, q: (naive ? r.v - 1 : r.eps) / r.s }));
    out.forEach((r, i) => { r.x = i ? 2 * r.q - out[i - 1].q : NaN; });
    return out;
  }
  function logRoots(x, b, n) {
    if (!(x > 0)) throw new RangeError("Cx.logRoots : x > 0 attendu");
    const R = roots(b, n), S = slopes(b, n), slope = S[n].x;
    let whole = 0, y = x;
    while (y >= b) { y /= b; whole++; }
    while (y < 1) { y *= b; whole--; }
    let frac = 0; const used = [];
    for (let k = 1; k <= n; k++) if (y >= R[k].v) { y /= R[k].v; frac += R[k].s; used.push(k); }
    const tail = (y - 1) / slope;
    return { value: whole + frac + tail, whole, used, rest: y, tail, slope };
  }
  function iSquares(L, n) {
    const out = [{ k: 0, s: Math.pow(2, -n), z: c(1, L * Math.pow(2, -n)) }];
    for (let k = 1; k <= n; k++) { const p = out[k - 1]; out.push({ k, s: p.s * 2, z: mul(p.z, p.z) }); }
    return out;
  }

  /* (a + b) + c against a + (b + c) in double precision: { gauche, droite, absolu, relatif } (relatif = absolu/|droite|) */
  function ecartAssociativite(a, b, x) {
    const g = (a + b) + x, d = a + (b + x), e = Math.abs(g - d);
    return { gauche: g, droite: d, absolu: e, relatif: d === 0 ? (e === 0 ? 0 : Infinity) : e / Math.abs(d) };
  }

  const api = { c, polar, add, sub, mul, div, neg, conj, scale, abs, abs2, arg, exp, log, pow, wrap, close, text, expSeries, roots, slopes, logRoots, iSquares, ecartAssociativite };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Cx = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de la leçon « Homogénéité : les dimensions comptent » (X.mesure.3). Pur, sans DOM.
   Une dimension = vecteur d'exposants sur les 7 grandeurs de base du SI, dans l'ordre M, L, T, I, Θ, N, J.
   Analyse dimensionnelle = système linéaire résolu en fractions exactes. */
(function (root) {
  const BASE = ["M", "L", "T", "I", "Θ", "N", "J"];

  /* --- fractions exactes --- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  function fr(n, d) { d = d == null ? 1 : d; if (d === 0) throw new Error("fraction: dénominateur nul"); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g + 0, d: d / g }; }   // + 0 : jamais de −0
  const add = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d), sub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
  const mul = (a, b) => fr(a.n * b.n, a.d * b.d), div = (a, b) => fr(a.n * b.d, a.d * b.n);
  const isZero = a => a.n === 0;
  const val = a => a.n / a.d;

  /* --- dimensions --- */
  function dim(o) { return BASE.map(b => (o && o[b]) || 0); }
  const times = (a, b) => a.map((x, i) => x + b[i]);
  const power = (a, p) => a.map(x => x * p);
  const same = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-12);
  const none = a => a.every(x => x === 0);
  /* [[symbole, exposant], …] des exposants non nuls, dans l'ordre M, L, T, I, Θ, N, J */
  const parts = a => BASE.map((b, i) => [b, a[i]]).filter(p => p[1] !== 0);

  /* --- analyse dimensionnelle : trouver x tel que Σ xⱼ dimⱼ = cible ---
     Retour : status "unique" | "family" | "none" ; x (solution particulière, variables libres à 0) ;
     groups : base des nombres sans dimension (noyau), un vecteur d'exposants par groupe. */
  function solve(target, dims) {
    const n = dims.length, m = BASE.length;
    const A = BASE.map((_, i) => dims.map(d => fr(d[i])).concat([fr(target[i])]));
    const pivots = []; let r = 0;
    for (let c = 0; c < n && r < m; c++) {
      let p = r; while (p < m && isZero(A[p][c])) p++;
      if (p === m) continue;
      [A[r], A[p]] = [A[p], A[r]];
      const inv = A[r][c];
      for (let j = c; j <= n; j++) A[r][j] = div(A[r][j], inv);
      for (let i = 0; i < m; i++) if (i !== r && !isZero(A[i][c])) { const f = A[i][c]; for (let j = c; j <= n; j++) A[i][j] = sub(A[i][j], mul(f, A[r][j])); }
      pivots.push(c); r++;
    }
    for (let i = r; i < m; i++) if (!isZero(A[i][n])) return { status: "none", rank: r, x: null, groups: [] };
    const x = new Array(n).fill(null).map(() => fr(0));
    pivots.forEach((c, i) => { x[c] = A[i][n]; });
    const free = [...Array(n).keys()].filter(c => !pivots.includes(c));
    const groups = free.map(f => { const v = new Array(n).fill(null).map(() => fr(0)); v[f] = fr(1); pivots.forEach((c, i) => { v[c] = fr(-A[i][f].n, A[i][f].d); }); return v; });
    return { status: free.length ? "family" : "unique", rank: r, x, free, groups };
  }

  /* vérification : la combinaison trouvée a bien la dimension cible */
  function combine(dims, x) { return dims.reduce((acc, d, j) => acc.map((a, i) => a + d[i] * val(x[j])), new Array(BASE.length).fill(0)); }

  const api = { BASE, fr, add, sub, mul, div, val, dim, times, power, same, none, parts, solve, combine };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Dims = api;
})(typeof self !== "undefined" ? self : this);

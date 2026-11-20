/* MaxwellDielectrique — la réponse en temps d'un diélectrique, leçon « Équations de Maxwell dans un diélectrique »
   (Feynman II.32.2). Pur, sans DOM, UMD (global MaxwellDielectrique). SI partout. Tests :
   test/lecons/maxwell-dans-un-dielectrique.test.js.
     reponseTemporelle(o)   (32.1) en temps sous E(t) quelconque (RK4) : { t, E, x, P, D = ε0E + P (32.14), chi0 }. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const EPS0 = Cst.eps0, QE = Cst.e, ME = Cst.m_e;
  const err = m => { throw new Error("Maxwell dans un diélectrique : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const positif0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être positif ou nul"); return x; };

  /* §32-1 and §32-2, in time: N charges per m³ of one mode { w0, gamma, f }, (32.1) m(ẍ + γẋ + ω0² x) = f q E(t)
     (f folds the strength in), from rest, under a field E(t) given as a function, by RK4 (Integ.rk4) over duree in n steps.
     P = N q x (32.8 in time), D = ε0 E + P (32.14). For a sinusoid, D/E tends to ε0(1 + Nα(ω)) once the transient (time
     2/γ) is gone; for any other E(t), D(t) is not a constant times E(t): (32.18) is a sinusoidal statement. Same model
     limits as (32.1): linear spring, field uniform over the atom, no local field. o = { N, mode, E, duree, n, q, m }. */
  function reponseTemporelle(o) {
    const N = positif(o.N, "N"), md = o.mode || err("mode { w0, gamma, f } attendu");
    const w0 = positif(md.w0, "w0"), g = positif0(md.gamma == null ? 0 : md.gamma, "gamma"), f = positif0(md.f == null ? 1 : md.f, "f");
    const q = o.q == null ? QE : positif(o.q, "q"), m = o.m == null ? ME : positif(o.m, "m"), E = o.E;
    if (typeof E !== "function") err("E doit être une fonction du temps");
    const duree = positif(o.duree, "duree"), n = o.n == null ? 2000 : o.n;
    if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
    const h = duree / n, F = (t, y) => [y[1], f * q * E(t) / m - g * y[1] - w0 * w0 * y[0]];
    let y = [0, 0];
    const T = [0], X = [0], Es = [fini(E(0), "E(0)")];
    for (let j = 1; j <= n; j++) { y = Integ.rk4(F, (j - 1) * h, y, h); T.push(j * h); X.push(y[0]); Es.push(E(j * h)); }
    const P = X.map(x => N * q * x);
    return { t: T, E: Es, x: X, P, D: Es.map((e, j) => EPS0 * e + P[j]), chi0: f * N * q * q / (EPS0 * m * w0 * w0) };
  }

  const api = { reponseTemporelle };
  if (node) module.exports = api;
  else root.MaxwellDielectrique = api;
})(typeof self !== "undefined" ? self : this);

/* AutresElements — la physique de la leçon « Autres éléments de circuit » (Feynman II.22.8). Pur, sans DOM, UMD
   (global AutresElements). SI partout. Les erreurs lèvent un message en français : elles signalent un appel faux.
     oscillateurNegatif(o)  circuit L, C, R série fermé sur une résistance négative v = −r i + b i³, pas à pas (Integ.rk4) :
                            { t, q, i, w0, f0, sigma, mu, amplitude } ; croissance, extinction, amplitude limite de van der Pol. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Integ = node ? require("./integration.js") : root.Integ;
  const err = m => { throw new Error("autres éléments de circuit : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const positif0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être positif ou nul"); return x; };
  const entier = (n, nom, min) => { if (!Number.isInteger(n) || n < min) err(nom + " doit être un entier ≥ " + min); return n; };

  /* §22-8. A series L, C, R loop closed on an element of negative resistance, v = −r i + b i³ (b ≥ 0: the element
     saturates). L di/dt + R i + q/C − r i + b i³ = 0, by RK4 (Integ.rk4), from q0, i0 over duree in n steps.
     Linear (b = 0): i ≈ i0 e^(−σt) cos ω0 t with σ = (R − r)/(2L), for |σ| ≪ ω0 = 1/√(LC): it dies out for r < R, keeps its
     amplitude for r = R, grows without bound for r > R. With b > 0 and r > R it settles (van der Pol) on the amplitude
     2√((r − R)/(3b)), valid while μ = (r − R)/(L ω0) ≪ 1. { t, q, i, w0, f0, sigma, mu, amplitude } */
  function oscillateurNegatif(o) {
    const L = positif(o.L, "L"), C = positif(o.C, "C"), R = positif0(o.R, "R"), r = positif0(o.r, "r");
    const b = positif0(o.b == null ? 0 : o.b, "b"), duree = positif(o.duree, "duree"), n = entier(o.n, "n", 1);
    const rk4 = Integ.rk4, h = duree / n, f = (t, y) => [y[1], -((R - r) * y[1] + b * y[1] ** 3 + y[0] / C) / L];
    let y = [fini(o.q0 == null ? 0 : o.q0, "q0"), fini(o.i0, "i0")];
    const T = [0], Q = [y[0]], I = [y[1]];
    for (let j = 1; j <= n; j++) { y = rk4(f, (j - 1) * h, y, h); T.push(j * h); Q.push(y[0]); I.push(y[1]); }
    const w0 = 1 / Math.sqrt(L * C);
    return { t: T, q: Q, i: I, w0, f0: w0 / (2 * Math.PI), sigma: (R - r) / (2 * L), mu: (r - R) / (L * w0),
      amplitude: r > R ? (b > 0 ? 2 * Math.sqrt((r - R) / (3 * b)) : Infinity) : 0 };
  }

  const api = { oscillateurNegatif };
  if (node) module.exports = api;
  else root.AutresElements = api;
})(typeof self !== "undefined" ? self : this);

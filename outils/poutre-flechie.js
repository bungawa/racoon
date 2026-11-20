/* Poutre d'Euler-Bernoulli : efforts, moment, flèche. Unités SI (m, N, Pa, m⁴).
   Conventions : charges vers le bas positives, moment positif quand la fibre inférieure est tendue,
   flèche w vers le bas positive.
   Appuis : "appuis" (deux appuis simples en x = 0 et x = L) ou "console" (encastrement en x = 0, bout libre en L). */
(function (root) {
  /* Errors carry a code: the page shows the text "err.<code>" of its table; the message is for developers. */
  const fail = (code, msg) => { throw Object.assign(new Error(msg), { code }); };
  const CODES = ["portee", "rigidite", "appuis", "force", "dims", "epaisseur"];

  function check(b) {
    if (!(b.L > 0)) fail("portee", "poutre : portée L > 0 requise");
    if (!(b.E > 0) || !(b.I > 0)) fail("rigidite", "poutre : E > 0 et I > 0 requis");
    if (!["appuis", "console"].includes(b.appuis)) fail("appuis", "poutre : appuis inconnus " + b.appuis);
    (b.forces || []).forEach(f => { if (!(f.a >= 0 && f.a <= b.L)) fail("force", "poutre : force hors de la poutre (a = " + f.a + ")"); });
  }

  // reactions and internal forces by statics (exact, no discretisation)
  function reactions(b) {
    const q = b.q || 0, F = b.forces || [], L = b.L, tot = q * L + F.reduce((s, f) => s + f.F, 0);
    if (b.appuis === "appuis") {
      const RB = (q * L * L / 2 + F.reduce((s, f) => s + f.F * f.a, 0)) / L;
      return { RA: tot - RB, RB, MA: 0 };
    }
    return { RA: tot, RB: 0, MA: -(q * L * L / 2 + F.reduce((s, f) => s + f.F * f.a, 0)) };
  }

  function V(b, x) {
    const q = b.q || 0, F = b.forces || [];
    if (b.appuis === "appuis") return reactions(b).RA - q * x - F.reduce((s, f) => s + (x > f.a ? f.F : 0), 0);
    return q * (b.L - x) + F.reduce((s, f) => s + (x < f.a ? f.F : 0), 0);
  }

  function M(b, x) {
    const q = b.q || 0, F = b.forces || [];
    if (b.appuis === "appuis") return reactions(b).RA * x - q * x * x / 2 - F.reduce((s, f) => s + (x > f.a ? f.F * (x - f.a) : 0), 0);
    return -q * (b.L - x) ** 2 / 2 - F.reduce((s, f) => s + (x < f.a ? f.F * (f.a - x) : 0), 0);
  }

  /* Deflection: integrate v'' = M/(EI) twice (upward v), apply boundary conditions, return w = −v.
     Trapezoidal rule on n intervals; error O(1/n²). */
  function solve(b, n) {
    check(b); n = n || 2000;
    const L = b.L, EI = b.E * b.I, h = L / n, xs = [], m = [], th = [0], v = [0];
    for (let i = 0; i <= n; i++) { xs.push(i * h); m.push(M(b, i * h)); }
    for (let i = 1; i <= n; i++) th.push(th[i - 1] + h * (m[i - 1] + m[i]) / (2 * EI));
    for (let i = 1; i <= n; i++) v.push(v[i - 1] + h * (th[i - 1] + th[i]) / 2);
    // appuis: v(0)=0 and v(L)=0 → add linear term c·x ; console: v(0)=v'(0)=0 already satisfied
    const c = b.appuis === "appuis" ? -v[n] / L : 0;
    const w = v.map((vi, i) => -(vi + c * xs[i]));
    const Vs = xs.map(x => V(b, x));
    const at = arr => arr.reduce((best, y, i) => Math.abs(y) > Math.abs(best.y) ? { x: xs[i], y } : best, { x: 0, y: 0 });
    return { x: xs, V: Vs, M: m, w, Mmax: at(m), Vmax: at(Vs), wmax: at(w), R: reactions(b) };
  }

  /* Sections: area A, second moment I (bending about the strong axis), elastic and plastic moduli. */
  function rect(bw, h) { return { type: "rect", A: bw * h, I: bw * h ** 3 / 12, v: h / 2, Wel: bw * h ** 2 / 6, Wpl: bw * h ** 2 / 4, ame: bw * h }; }
  function profilI(h, bw, tw, tf) {
    if (!(2 * tf < h && tw <= bw)) fail("dims", "section : dimensions incohérentes");
    const hw = h - 2 * tf, I = (bw * h ** 3 - (bw - tw) * hw ** 3) / 12;
    return { type: "I", A: 2 * bw * tf + tw * hw, I, v: h / 2, Wel: I / (h / 2), Wpl: bw * tf * (h - tf) + tw * hw ** 2 / 4, ame: tw * hw };
  }
  function tube(d, t) {
    if (!(t > 0 && 2 * t <= d)) fail("epaisseur", "section : épaisseur incohérente");
    const di = d - 2 * t, I = Math.PI * (d ** 4 - di ** 4) / 64;
    return { type: "tube", A: Math.PI * (d * d - di * di) / 4, I, v: d / 2, Wel: I / (d / 2), Wpl: (d ** 3 - di ** 3) / 6, ame: Math.PI * (d * d - di * di) / 8 };
  }

  /* Elastic stresses and a theory-only check against a yield strength (no design code). */
  function contraintes(r, s, fy) {
    const sigma = Math.abs(r.Mmax.y) / s.Wel;
    const tau = s.type === "rect" ? 1.5 * Math.abs(r.Vmax.y) / s.A : Math.abs(r.Vmax.y) / s.ame; // rect: exact max; I and tube: mean over the web / half-section
    const vm = Math.sqrt(sigma ** 2 + 3 * tau ** 2);                                           // conservative: both maxima combined
    return { sigma, tau, vonMises: vm, Mel: s.Wel * fy, Mpl: s.Wpl * fy, taux: fy ? sigma / fy : null };
  }

  /* Display names live in the page table: "mat.<key>". */
  const MATERIAUX = {
    acier: { E: 210e9, fy: 235e6 },
    acier355: { E: 210e9, fy: 355e6 },
    alu: { E: 70e9, fy: 160e6 },
    bois: { E: 11e9, fy: 24e6 },
  };

  const api = { CODES, check, reactions, V, M, solve, rect, profilI, tube, contraintes, MATERIAUX };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Poutre = api;
})(typeof self !== "undefined" ? self : this);

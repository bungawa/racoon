/* Laplace — transformée de Laplace unilatérale et circuit RLC série avec conditions initiales. Pur, sans DOM, UMD (global Laplace).
   Leçon « Transformée de Laplace et notation complexe » (étape « Systèmes linéaires »). SI partout.
   Dépendances : lecons/complexes.js (Cx), lecons/integration.js (Integ, par ondes.js), ondes.js (Ondes : impédances en régime
   sinusoïdal et réponse pas à pas RK4, la vérification indépendante). Rien n'est recalculé ici de ce qu'Ondes sait déjà.

   Convention : F(s) = ∫₀^∞ f(t) e^(−st) dt, signaux causaux (nuls pour t < 0), s complexe. Régime sinusoïdal : u(t) = Re(û e^(iωt)),
   donc la notation complexe est F pris en s = iω. Les erreurs lèvent un message en français : elles signalent un appel faux.

   transformee(f, s, o)        F(s) par la méthode de Simpson sur [0, T], s réel > 0 (o.T, défaut 40/s ; o.n pas, pair, défaut 4000).
   convolution(f, g, t, n)     (f ∗ g)(t) = ∫₀^t f(τ) g(t − τ) dτ, Simpson à n pas.
   impedance(R, L, C, s)       Z(s) = R + Ls + 1/(Cs), s = Cx ≠ 0 : l'impédance généralisée du RLC série.
   poles(R, L, C)              racines de L s² + R s + 1/C, { p: [p₁, p₂] (Cx), double }.
   rlc(o)                      o = { R, L, C, E0, w, q0, i0 } : e(t) = E₀ cos ωt (ω = 0 : échelon E₀), q(0) = q₀, i(0) = i₀.
                               → { poles, termes, Q(s), q(t), i(t), qTransitoire, iTransitoire, qEtabli, iEtabli,
                                   complexe: { qhat, q(t), i(t) } (notation complexe seule, par Ondes.reseau), tau, finale }
                               tau = 1/min|Re p| : la constante de temps du transitoire, celle du pôle le plus lent.
   valeurInitiale(F, S)        S·F(S) pour S grand (théorème de la valeur initiale : f(0⁺)).
   valeurFinale(F, poles, eps) lim s→0 de s F(s) si tous les pôles de F sont à partie réelle < 0, sauf au plus un pôle simple en 0 ;
                               null sinon (le théorème ne s'applique pas : f n'a pas de limite).
   boucle(R, L, C, K)          le même circuit, H(s) = U_C/E = 1/(LCs² + RCs + 1), dans une boucle à gain proportionnel K :
                               pôles de la boucle fermée, racines de 1 + K H(s) = 0.
   verifier(o, duree, n)       la même réponse par Runge–Kutta d'ordre 4 (Ondes.repondre), sans transformée : { t, q, i }. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cx = node ? require("./complexes.js") : root.Cx;
  const Ondes = node ? require("../ondes.js") : root.Ondes;

  const err = m => { throw new Error("laplace: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const fonction = (f, name) => { if (typeof f !== "function") err(name + " doit être une fonction"); return f; };
  const { c, add, sub, mul, div, scale, exp } = Cx;

  /* Simpson composite sur [a, b], n pas pair */
  function simpson(f, a, b, n) {
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * f(a + k * h);
    return s * h / 3;
  }
  const pair = (n, name) => { if (!Number.isInteger(n) || n < 2 || n % 2) err(name + " entier pair ≥ 2"); return n; };

  /* Approximation : troncature à T, reste ≤ max|f| e^(−sT)/s (e^(−40) ≈ 4 × 10⁻¹⁸ par défaut) si |f| est bornée ;
     erreur de Simpson en h⁴, h = T/n : il faut beaucoup de pas par période de f. */
  function transformee(f, s, o) {
    fonction(f, "f"); positive(s, "s"); o = o || {};
    const T = o.T == null ? 40 / s : positive(o.T, "T"), n = pair(o.n == null ? 4000 : o.n, "n");
    return simpson(t => f(t) * Math.exp(-s * t), 0, T, n);
  }
  function convolution(f, g, t, n) {
    fonction(f, "f"); fonction(g, "g"); finite(t, "t"); if (t < 0) err("t ≥ 0 : signaux causaux");
    if (t === 0) return 0;
    return simpson(u => f(u) * g(t - u), 0, t, pair(n == null ? 400 : n, "n"));
  }

  function circuit(R, L, C) { positive(R, "R"); positive(L, "L"); positive(C, "C"); }
  /* Exacte pour des dipôles idéaux, linéaires et invariants, en régime quasi stationnaire. En s = iω : R + iLω + 1/(iCω). */
  function impedance(R, L, C, s) {
    circuit(R, L, C);
    if (!s || typeof s.re !== "number" || typeof s.im !== "number") err("s = { re, im }");
    if (s.re === 0 && s.im === 0) err("s = 0 : le condensateur a une impédance infinie");
    return add(c(R + L * s.re, L * s.im), div(c(1), scale(s, C)));
  }

  /* L s² + R s + 1/C = 0. Discriminant R² − 4L/C : < 0 pseudo-périodique, > 0 apériodique (racines réelles calculées sans
     élimination), ≈ 0 critique : deux pôles confondus si |p₁ − p₂| < 10⁻⁶ |p|, ce qui change la réponse de moins de 10⁻⁹ en
     relatif sur 20 constantes de temps. */
  const DOUBLE = 1e-6;
  function poles(R, L, C) {
    circuit(R, L, C);
    const d = R * R - 4 * L / C, m = -R / (2 * L);
    if (Math.sqrt(Math.abs(d)) / R < DOUBLE / 2) return { p: [c(m), c(m)], double: true };
    if (d < 0) { const w = Math.sqrt(-d) / (2 * L); return { p: [c(m, w), c(m, -w)], double: false }; }
    const q = -(R + Math.sqrt(d)) / 2;
    return { p: [c(q / L), c(1 / (C * q))], double: false };
  }

  /* Le circuit RLC série, L q̈ + R q̇ + q/C = e(t), q(0) = q₀, q̇(0) = i₀.
     Laplace : L(s²Q − s q₀ − i₀) + R(sQ − q₀) + Q/C = E(s), avec E(s) = E₀ s/(s² + ω²) (E₀/s si ω = 0), donc
     Q(s) = [E(s) + L i₀ + (Ls + R) q₀] / (L s² + R s + 1/C)  et  I(s) = sQ − q₀ = [E(s) + L i₀ − q₀/(Cs)] / Z(s).
     Q = N/D avec D = L Π(s − pₖ) : pôles du circuit p₁, p₂ et de la source ±iω (0 pour un échelon). Chaque pôle p donne un terme
     (c₀ + c₁ t) e^(pt) (c₁ ≠ 0 seulement pour un pôle double), le résidu de Q(s) e^(st) en p. q(t) = Re Σ termes, pour t ≥ 0.
     Transitoire : les termes des pôles du circuit ; établi : ceux de la source, égaux à la notation complexe.
     Exacte pour ce modèle (dipôles idéaux, R > 0) ; à l'arrondi près, 10⁻¹² en relatif. */
  function rlc(o) {
    if (!o) err("{ R, L, C, E0, w, q0, i0 }");
    const { R, L, C } = o; circuit(R, L, C);
    const E0 = finite(o.E0 == null ? 0 : o.E0, "E₀"), w = finite(o.w == null ? 0 : o.w, "ω"), q0 = finite(o.q0 || 0, "q₀"), i0 = finite(o.i0 || 0, "i₀");
    if (w < 0) err("ω ≥ 0");
    const P = poles(R, L, C), [p1, p2] = P.p;
    const ww = c(w * w), A = s => add(scale(s, L * q0), c(L * i0 + R * q0));      // L q₀ s + L i₀ + R q₀
    const N = w > 0 ? s => add(scale(s, E0), mul(A(s), add(mul(s, s), ww))) : s => add(c(E0), mul(A(s), s));
    const dN = w > 0 ? s => add(add(c(E0), mul(scale(c(1), L * q0), add(mul(s, s), ww))), mul(A(s), scale(s, 2)))
      : s => add(scale(s, 2 * L * q0), c(L * i0 + R * q0));
    const source = w > 0 ? [c(0, w), c(0, -w)] : [c(0)];
    const tous = [p1, p2].concat(source);
    const D = s => scale(tous.reduce((a, p) => mul(a, sub(s, p)), c(1)), L);
    const Q = s => div(N(s), D(s));

    const termes = [];
    const simple = (p, role, j) => {
      const M = tous.reduce((a, q, k) => k === j ? a : mul(a, sub(p, q)), c(L));
      termes.push({ pole: p, c0: div(N(p), M), c1: c(0), role });
    };
    if (P.double) {
      const autres = source, M = autres.reduce((a, q) => mul(a, sub(p1, q)), c(L));
      const somme = autres.reduce((a, q) => add(a, div(c(1), sub(p1, q))), c(0));
      termes.push({ pole: p1, c1: div(N(p1), M), c0: div(sub(dN(p1), mul(N(p1), somme)), M), role: "circuit" });
    } else { simple(p1, "circuit", 0); simple(p2, "circuit", 1); }
    source.forEach((p, k) => simple(p, "source", 2 + k));

    const causal = t => { finite(t, "t"); if (t < 0) err("t ≥ 0 : signal causal, la transformée ne dit rien avant 0"); return t; };
    const somme = (role, deriv) => t => {
      causal(t);
      return termes.filter(x => !role || x.role === role).reduce((s, x) => {
        const e = exp(scale(x.pole, t));
        const a = deriv ? add(add(mul(x.pole, x.c0), x.c1), scale(mul(x.pole, x.c1), t)) : add(x.c0, scale(x.c1, t));
        return s + mul(a, e).re;
      }, 0);
    };

    /* la notation complexe seule, par l'autre chemin : q̂ = Ê/(iω Ẑ), Ẑ par Ondes.reseau. Elle ignore q₀ et i₀. */
    let complexe = null;
    if (w > 0) {
      const Z = Ondes.reseau(["serie", ["R", R], ["L", L], ["C", C]], w), qhat = div(c(E0), mul(c(0, w), Z));
      const at = (h, t) => mul(h, c(Math.cos(w * t), Math.sin(w * t))).re;
      complexe = { Z, qhat, ihat: mul(c(0, w), qhat), q: t => at(qhat, t), i: t => at(mul(c(0, w), qhat), t) };
    } else complexe = { Z: null, qhat: c(C * E0), ihat: c(0), q: () => C * E0, i: () => 0 };

    return {
      R, L, C, E0, w, q0, i0, poles: { circuit: [p1, p2], source, double: P.double }, termes, Q, N, D,
      q: somme(null, false), i: somme(null, true),
      qTransitoire: somme("circuit", false), iTransitoire: somme("circuit", true),
      qEtabli: somme("source", false), iEtabli: somme("source", true),
      complexe, tau: 1 / Math.min(-p1.re, -p2.re),                 // la plus lente des décroissances : 2L/R sous le critique
      finale: valeurFinale(Q, tous),
    };
  }

  /* Exacte à la limite : f(0⁺) = lim s→∞ s F(s). Écart en 1/S : S doit dépasser de loin les pôles (10⁶ fois ici, erreur ~ 10⁻⁶). */
  function valeurInitiale(F, S) { fonction(F, "F"); positive(S, "S"); const v = F(c(S)); return S * v.re; }
  /* Exacte quand elle s'applique : f(∞) = lim s→0 s F(s), si f a une limite, c'est-à-dire si les pôles de s F(s) sont tous
     dans le demi-plan gauche. Sinon (pôle ±iω d'une source sinusoïdale, pôle à droite) : null. eps ≪ |pôles|. */
  function valeurFinale(F, ps, eps) {
    fonction(F, "F"); if (!Array.isArray(ps)) err("pôles = [Cx…]");
    const zero = ps.filter(p => p.re === 0 && p.im === 0).length;
    if (zero > 1 || ps.some(p => p.re > 0 || (p.re === 0 && p.im !== 0))) return null;
    const e = eps == null ? 1e-9 : positive(eps, "ε");
    return e * F(c(e)).re;
  }

  /* boucle fermée : consigne → K → circuit → u_C, retour unitaire. 1 + K H = 0 ⟺ LC s² + RC s + 1 + K = 0 : le gain raidit le
     « ressort » de 1/C à (1 + K)/C. Pôles : −R/(2L) ± i√((1 + K)/(LC) − R²/(4L²)) : la partie réelle ne bouge pas, la partie
     imaginaire croît avec K. Stable pour tout K > −1 (second ordre) ; un retard ou un troisième pôle, négligés ici, changent cela.
     Exacte pour ce modèle linéaire (amplificateur idéal, sans saturation). */
  function boucle(R, L, C, K) {
    circuit(R, L, C); finite(K, "K"); if (!(K > -1)) err("K > −1 : sinon un pôle passe à droite dès le gain statique");
    const P = poles(R, L, C / (1 + K));
    return { poles: P.p, double: P.double, stable: P.p.every(p => p.re < 0), w0: Math.sqrt((1 + K) / (L * C)),
      zeta: R / 2 * Math.sqrt(C / ((1 + K) * L)), gainStatique: K / (1 + K) };
  }

  /* la vérification sans transformée : ẍ + (ω₀/Q) ẋ + ω₀² x = e(t)/L, ω₀ = 1/√(LC), Q = Lω₀/R, pas à pas (Ondes.repondre, RK4) */
  function verifier(o, duree, n) {
    const { R, L, C } = o; circuit(R, L, C);
    const w0 = 1 / Math.sqrt(L * C), E0 = o.E0 || 0, w = o.w || 0;
    const r = Ondes.repondre({ w0, Q: L * w0 / R }, t => E0 * Math.cos(w * t) / L, duree, n, o.q0 || 0, o.i0 || 0);
    return { t: r.t, q: r.x, i: r.v };
  }

  const api = { transformee, convolution, impedance, poles, rlc, valeurInitiale, valeurFinale, boucle, verifier };
  if (node) module.exports = api;
  else root.Laplace = api;
})(typeof self !== "undefined" ? self : this);

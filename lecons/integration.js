/* Integ — step-by-step solution of Newton's equation  ẍ = a(t, x, ẋ), as in Feynman I.9.5–9.7.
   Pure, no DOM, UMD (global Integ). SI or any consistent units. Shared by sens-des-equations-dynamique, resolution-numerique,
   mouvement-des-planetes, and meant for the later lessons (oscillators, pendulum, central forces, charged particle).

   State    s = { t, x: [x1…xd], v: [v1…vd] }   x and v of the same length d: 1 for a spring, 2 or 3 for a planet, 3N for N bodies.
   System   a(t, x, v) → [a1…ad], the acceleration F/m. Pure: it must not modify x or v.
   Methods  (METHODS, h the step, n the step number, aₙ = a(tₙ, xₙ, vₙ))
     "euler"     explicit Euler:        xₙ₊₁ = xₙ + h vₙ,   vₙ₊₁ = vₙ + h aₙ.
                 Order 1. On an oscillator it multiplies the energy by (1 + h²ω²) at every step: it always gains energy.
     "eulerSI"   semi-implicit Euler (Euler–Cromer): vₙ₊₁ = vₙ + h aₙ,   xₙ₊₁ = xₙ + h vₙ₊₁ (the new speed).
                 Order 1, symplectic: on a conservative system the energy oscillates, it does not drift.
     "leapfrog"  Feynman's half-step speed, written kick–drift–kick (velocity Verlet):
                 v½ = vₙ + (h/2) aₙ,   xₙ₊₁ = xₙ + h v½,   vₙ₊₁ = v½ + (h/2) a(tₙ₊₁, xₙ₊₁).
                 The positions are exactly Feynman's (v at half steps, started with v(h/2) = v₀ + (h/2) a₀).
                 Order 2, time-reversible and symplectic when a does not depend on v; exact for a uniform field;
                 one force evaluation per step. Unstable on an oscillator when hω > 2.
                 If a depends on v (friction, magnetic force), pass { vdep: true }: the last kick is then corrected once,
                 which keeps order 2 (one more evaluation; no longer exactly reversible).
   First-order systems  y′ = f(t, y), y an array of any length (several unknowns written one after the other)
     rk4(f, t, y, h)  → y(t + h): one classical Runge–Kutta step, order 4, f evaluated four times in the order k1, k2, k3, k4:
                 k1 = f(t, y), k2 = f(t + h/2, y + (h/2) k1), k3 = f(t + h/2, y + (h/2) k2), k4 = f(t + h, y + h k3),
                 y(t + h) = y + (h/6)(k1 + 2 k2 + 2 k3 + k4). Exact for a polynomial y of degree ≤ 4 when f does not depend on y.
                 Neither symplectic nor reversible: on an oscillator the energy drifts, slowly (h⁵ per step).
                 f may return null where y′ is not defined (a source of a field): the step then returns null. y is not modified.
   API
     step(method, a, s, h, o)       → the state one step later; s is not modified. h finite and ≠ 0; h < 0 goes back in time.
     run(method, a, s0, h, n, o)    → { t: [..], x: [[..]..], v: [[..]..] }: n steps, the n + 1 states (o.every = k keeps one in k,
                                       and always the last). n integer ≥ 0.
     spring(w)   ẍ = −ω²x in any dimension: { a, energy(s) per unit mass, exact(s0, t) }.
     uniform(g)  ẍ = g, g a vector: { a, energy(s) = v²/2 − g·x per unit mass, exact(s0, t) }.
     kepler(GM)  ẍ = −GM x/r³ (2D or 3D, fixed centre): { a, energy(s), elements(s) → {E, L, a, e, varpi}, perihelia(run) → [{t, angle}] }.
     perturbation(mu, r, R)  a third body (mass ratio mu to the centre) at R, aligned with the planet at r < R: its direct pull and
                 its differential (tidal) pull, both relative to the central pull on the planet.
   Errors are thrown with a French message: they mean the call is wrong, never that the motion is unusual. */
(function (root) {
  const METHODS = ["euler", "eulerSI", "leapfrog"];

  const err = m => { throw new Error("integ: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); };
  function checkState(s) {
    if (!s || !Array.isArray(s.x) || !Array.isArray(s.v) || !s.x.length || s.x.length !== s.v.length) err("état { t, x, v } avec x et v de même longueur non nulle");
    finite(s.t, "t"); s.x.forEach(q => finite(q, "x")); s.v.forEach(q => finite(q, "v"));
  }
  function checkStep(h) { finite(h, "le pas h"); if (h === 0) err("le pas h ne peut pas être nul : le temps n'avancerait pas"); }
  function checkMethod(m) { if (!METHODS.includes(m)) err("méthode inconnue « " + m + " » (" + METHODS.join(", ") + ")"); }
  function accel(a, t, x, v) {
    const r = a(t, x, v);
    if (!Array.isArray(r) || r.length !== x.length) err("a(t, x, v) doit rendre un tableau de même longueur que x");
    return r;
  }
  const axpy = (y, k, d) => y.map((q, i) => q + k * d[i]);       // y + k·d, a new array

  /* one step; acc = a(t, x, v) when the caller already has it (leapfrog without v: the previous step's last kick) */
  function advance(method, a, t, x, v, h, vdep, acc) {
    const a0 = acc || accel(a, t, x, v);
    if (method === "euler") return { t: t + h, x: axpy(x, h, v), v: axpy(v, h, a0) };
    if (method === "eulerSI") { const v1 = axpy(v, h, a0); return { t: t + h, x: axpy(x, h, v1), v: v1 }; }
    const vh = axpy(v, h / 2, a0), x1 = axpy(x, h, vh);
    let a1 = accel(a, t + h, x1, vh);
    if (vdep) a1 = accel(a, t + h, x1, axpy(vh, h / 2, a1));       // predictor–corrector on the speed, keeps order 2
    return { t: t + h, x: x1, v: axpy(vh, h / 2, a1), acc: vdep ? null : a1 };
  }

  function step(method, a, s, h, o) {
    checkMethod(method); checkState(s); checkStep(h);
    const r = advance(method, a, s.t, s.x, s.v, h, !!(o && o.vdep));
    return { t: r.t, x: r.x, v: r.v };
  }

  function run(method, a, s0, h, n, o) {
    o = o || {};
    checkMethod(method); checkState(s0); checkStep(h);
    if (!Number.isInteger(n) || n < 0) err("n, le nombre de pas, doit être un entier ≥ 0");
    const every = o.every == null ? 1 : o.every;
    if (!Number.isInteger(every) || every < 1) err("every doit être un entier ≥ 1");
    const vdep = !!o.vdep, out = { t: [s0.t], x: [s0.x.slice()], v: [s0.v.slice()] };
    let t = s0.t, x = s0.x.slice(), v = s0.v.slice(), acc = null;
    for (let k = 1; k <= n; k++) {
      const r = advance(method, a, t, x, v, h, vdep, method === "leapfrog" ? acc : null);
      t = s0.t + k * h; x = r.x; v = r.v; acc = r.acc || null;     // t from k·h: no rounding drift on very long runs
      if (k % every === 0 || k === n) { out.t.push(t); out.x.push(x); out.v.push(v); }
    }
    return out;
  }

  /* one Runge–Kutta 4 step of y′ = f(t, y); null if f is not defined at one of the four points */
  function rk4(f, t, y, h) {
    checkStep(h);
    const k1 = f(t, y); if (!k1) return null;
    if (!Array.isArray(y) || !Array.isArray(k1) || k1.length !== y.length) err("rk4 : y tableau, f(t, y) tableau de même longueur");
    const k2 = f(t + h / 2, axpy(y, h / 2, k1)); if (!k2) return null;
    const k3 = f(t + h / 2, axpy(y, h / 2, k2)); if (!k3) return null;
    const k4 = f(t + h, axpy(y, h, k3)); if (!k4) return null;
    return y.map((q, i) => q + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
  }

  /* ---------- reference systems ---------- */
  const dot = (p, q) => p.reduce((s, c, i) => s + c * q[i], 0);

  /* harmonic oscillator ẍ = −ω²x: the spring–mass with ω² = k/m. Energy per unit mass (v² + ω²x²)/2. */
  function spring(w) {
    finite(w, "ω"); if (!(w > 0)) err("ω doit être strictement positif");
    const w2 = w * w;
    return {
      w, a: (t, x) => x.map(q => -w2 * q),
      energy: s => (dot(s.v, s.v) + w2 * dot(s.x, s.x)) / 2,
      exact: (s0, t) => { const c = Math.cos(w * (t - s0.t)), sn = Math.sin(w * (t - s0.t));
        return { t, x: s0.x.map((q, i) => q * c + s0.v[i] / w * sn), v: s0.v.map((p, i) => p * c - w * s0.x[i] * sn) }; },
    };
  }

  /* uniform field ẍ = g (weight near the ground, charge in a uniform E field). Energy per unit mass v²/2 − g·x. */
  function uniform(g) {
    if (!Array.isArray(g) || !g.length) err("g doit être un vecteur non vide"); g.forEach(q => finite(q, "g"));
    return {
      g, a: () => g.slice(),
      energy: s => dot(s.v, s.v) / 2 - dot(g, s.x),
      exact: (s0, t) => { const d = t - s0.t; return { t, x: s0.x.map((q, i) => q + s0.v[i] * d + g[i] * d * d / 2), v: s0.v.map((p, i) => p + g[i] * d) }; },
    };
  }

  /* point mass around a fixed attracting centre, ẍ = −GM x/r³ (the Sun held still). Per unit mass. */
  function kepler(GM) {
    finite(GM, "GM"); if (!(GM > 0)) err("GM doit être strictement positif");
    const norm = x => Math.sqrt(dot(x, x));
    const a = (t, x) => { const r = norm(x); if (r === 0) err("le point est au centre attracteur (r = 0)"); const k = -GM / (r * r * r); return x.map(q => k * q); };
    const energy = s => dot(s.v, s.v) / 2 - GM / norm(s.x);
    /* orbital elements from a state: energy E, angular momentum L (norm), semi-major axis (Infinity if E ≥ 0), eccentricity,
       and varpi, the angle of the eccentricity vector (towards the perihelion) in the x–y plane */
    function elements(s) {
      if (s.x.length !== 2 && s.x.length !== 3) err("elements : état à 2 ou 3 dimensions");
      const x = s.x.length === 2 ? [s.x[0], s.x[1], 0] : s.x, v = s.v.length === 2 ? [s.v[0], s.v[1], 0] : s.v;
      const r = norm(x), v2 = dot(v, v), rv = dot(x, v), E = v2 / 2 - GM / r;
      const L = [x[1] * v[2] - x[2] * v[1], x[2] * v[0] - x[0] * v[2], x[0] * v[1] - x[1] * v[0]];
      const ev = x.map((q, i) => ((v2 - GM / r) * q - rv * v[i]) / GM);
      return { E, L: norm(L), a: E < 0 ? -GM / (2 * E) : Infinity, e: norm(ev), varpi: Math.atan2(ev[1], ev[0]) };
    }
    /* perihelion passages of a run (local minima of r), each refined by a parabola through three samples:
       time and polar angle (unwrapped, in rad). The advance of the angle from one passage to the next is the precession. */
    function perihelia(tr) {
      const r = tr.x.map(norm), out = [];
      let last = null;
      for (let i = 1; i < r.length - 1; i++) {
        if (!(r[i] < r[i - 1] && r[i] <= r[i + 1])) continue;
        const den = r[i - 1] - 2 * r[i] + r[i + 1], u = den > 0 ? (r[i - 1] - r[i + 1]) / (2 * den) : 0;   // u in [−1/2, 1/2] steps
        const ang = j => Math.atan2(tr.x[j][1], tr.x[j][0]);
        let a0 = ang(i - 1), a1 = ang(i), a2 = ang(i + 1);
        const near = (p, q) => q - Math.round((q - p) / (2 * Math.PI)) * 2 * Math.PI;                     // q moved next to p
        a0 = near(a1, a0); a2 = near(a1, a2);
        let th = a1 + u * (a2 - a0) / 2 + u * u * (a2 - 2 * a1 + a0) / 2;
        if (last != null) th = near(last, th);                    // one turn per orbit removed: what is left is the precession
        const ti = tr.t[i] + u * (tr.t[i + 1] - tr.t[i - 1]) / 2;
        out.push({ t: ti, angle: th }); last = th;
      }
      return out;
    }
    return { GM, a, energy, elements, perihelia };
  }

  /* A body of mass mu·M at distance R from the centre, on the same side as the planet at r < R (Jupiter at opposition, seen
     from the Earth). Its direct pull on the planet is mu r²/(R − r)² of the central one. But in the frame of the centre, which
     it also pulls, only the difference perturbs the orbit: mu r² (1/(R − r)² − 1/R²). Point masses, Newton. */
  function perturbation(mu, r, R) {
    finite(mu, "mu"); finite(r, "r"); finite(R, "R");
    if (!(mu > 0 && r > 0 && R > r)) err("il faut mu > 0 et 0 < r < R");
    const near = r * r / ((R - r) * (R - r));
    return { directe: mu * near, differentielle: mu * (near - r * r / (R * R)) };
  }

  const api = { METHODS, step, run, rk4, spring, uniform, kepler, perturbation };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Integ = api;
})(typeof self !== "undefined" ? self : this);

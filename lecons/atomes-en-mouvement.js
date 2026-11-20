/* Physics for lesson I-1 (1-1, 1-2). Reduced units: sigma = eps = m = k_B = 1. */
(function (root) {
  /* --- Lennard-Jones particles in a reflecting cube [0,L]^3 --- */
  function ljWorld(n, L, spacing) {
    const side = Math.ceil(Math.cbrt(n)), p = new Float64Array(3 * n), v = new Float64Array(3 * n), f = new Float64Array(3 * n);
    const off = (L - (side - 1) * spacing) / 2;
    for (let i = 0; i < n; i++) {
      p[3 * i] = off + (i % side) * spacing;
      p[3 * i + 1] = off + (Math.floor(i / side) % side) * spacing;
      p[3 * i + 2] = off + Math.floor(i / (side * side)) * spacing;
    }
    const w = { n, L, p, v, f, pe: 0, rc2: 6.25 };
    ljForces(w);
    return w;
  }

  function ljForces(w) {
    const { n, p, f, rc2 } = w;
    f.fill(0); let pe = 0;
    const shift = 4 * (Math.pow(rc2, -6) - Math.pow(rc2, -3));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const dx = p[3 * i] - p[3 * j], dy = p[3 * i + 1] - p[3 * j + 1], dz = p[3 * i + 2] - p[3 * j + 2];
      const r2 = dx * dx + dy * dy + dz * dz;
      if (r2 > rc2) continue;
      const ir2 = 1 / Math.max(r2, 0.64), ir6 = ir2 * ir2 * ir2;
      const s = 24 * ir6 * (2 * ir6 - 1) * ir2;
      pe += 4 * ir6 * (ir6 - 1) - shift;
      f[3 * i] += s * dx; f[3 * i + 1] += s * dy; f[3 * i + 2] += s * dz;
      f[3 * j] -= s * dx; f[3 * j + 1] -= s * dy; f[3 * j + 2] -= s * dz;
    }
    w.pe = pe;
  }

  function kinetic(v) { let k = 0; for (let i = 0; i < v.length; i++) k += v[i] * v[i]; return k / 2; }
  function temperature(v) { return 2 * kinetic(v) / v.length; } // (1/2)kT per degree of freedom

  /* velocity Verlet; walls reflect; optional Berendsen thermostat (tau > 0) */
  function ljStep(w, dt, targetT, tau) {
    const { n, L, p, v, f } = w;
    for (let i = 0; i < 3 * n; i++) { v[i] += 0.5 * dt * f[i]; p[i] += dt * v[i];
      if (p[i] < 0) { p[i] = -p[i]; v[i] = -v[i]; } else if (p[i] > L) { p[i] = 2 * L - p[i]; v[i] = -v[i]; } }
    ljForces(w);
    for (let i = 0; i < 3 * n; i++) v[i] += 0.5 * dt * f[i];
    if (tau > 0) {
      const T = temperature(v);
      const lam = T > 0 ? Math.sqrt(1 + (dt / tau) * (targetT / T - 1)) : 1;
      for (let i = 0; i < 3 * n; i++) v[i] *= lam;
    }
  }

  function heat(w, T, rand) { // Maxwell-Boltzmann kick
    for (let i = 0; i < w.v.length; i++) w.v[i] = Math.sqrt(T) * gauss(rand);
  }
  const gauss = (typeof module !== "undefined" && module.exports ? require("./incertitude-absolue-relative.js") : root.Incert).gauss;   // one copy, in Incert

  /* --- 2D ideal gas under a piston: box width W, piston at height h, piston velocity u --- */
  function gasWorld(n, W, h, T, rand) {
    const g = { n, W, h, u: 0, x: new Float64Array(n), y: new Float64Array(n), vx: new Float64Array(n), vy: new Float64Array(n), impulse: 0, time: 0 };
    for (let i = 0; i < n; i++) { g.x[i] = rand() * W; g.y[i] = rand() * h; g.vx[i] = Math.sqrt(T) * gauss(rand); g.vy[i] = Math.sqrt(T) * gauss(rand); }
    return g;
  }

  function gasStep(g, dt) {
    g.h += g.u * dt;
    for (let i = 0; i < g.n; i++) {
      g.x[i] += g.vx[i] * dt; g.y[i] += g.vy[i] * dt;
      if (g.x[i] < 0) { g.x[i] = -g.x[i]; g.vx[i] = -g.vx[i]; }
      else if (g.x[i] > g.W) { g.x[i] = 2 * g.W - g.x[i]; g.vx[i] = -g.vx[i]; }
      if (g.y[i] < 0) { g.y[i] = -g.y[i]; g.vy[i] = -g.vy[i]; }
      else if (g.y[i] > g.h && g.vy[i] > g.u) {   // hits piston (moving at u): elastic in piston frame
        const vnew = 2 * g.u - g.vy[i];
        g.impulse += g.vy[i] - vnew;                // momentum given to piston (m = 1)
        g.vy[i] = vnew; g.y[i] = Math.min(g.y[i], g.h) - 1e-9;
      }
      if (g.y[i] > g.h) g.y[i] = g.h - 1e-9;
    }
    g.time += dt;
  }

  /* 2D: force per unit length. Ideal value: n k T / area */
  function gasPressure(g) { const P = g.impulse / (g.time * g.W); g.impulse = 0; g.time = 0; return P; }
  function gasTemperature(g) { let k = 0; for (let i = 0; i < g.n; i++) k += g.vx[i] ** 2 + g.vy[i] ** 2; return k / (2 * g.n); }

  /* --- 1-1: how wrong is "mass is constant"?  m/m0 - 1 = gamma - 1 --- */
  const C = (typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes).c;
  function gammaMinusOne(v) { // v in m/s
    const b2 = (v / C) ** 2;
    return b2 < 1e-6 ? b2 / 2 + 3 * b2 * b2 / 8 : 1 / Math.sqrt(1 - b2) - 1; // series avoids cancellation
  }

  /* --- SI display. LJ model scaled so the triple point (T* ~ 0.69) sits at 273 K. --- */
  const K_PER_LJ = 273 / 0.69, K_PER_GAS = 300;
  const api = { K_PER_LJ, K_PER_GAS, ljWorld, ljForces, ljStep, kinetic, temperature, heat, gasWorld, gasStep, gasPressure, gasTemperature, gammaMinusOne, C };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Phys = api;
})(typeof self !== "undefined" ? self : this);

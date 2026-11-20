/* Atomic processes (Feynman I, §1-3): molecules leave a condensed phase and come back; equilibrium is two equal flows.
   2D model in reduced units (lengths, time); temperatures in K. A condensed phase (liquid water, or a salt crystal) fills
   the bottom in rows of `cols` sites; only its top row can lose molecules. Free molecules (vapour, or dissolved ions) move above it.
   Pure, UMD: no DOM, the random source is passed in. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const R = Cst.R;                  // J·mol⁻¹·K⁻¹
  const T0 = 300;                   // K, reference temperature of the rate constants

  /* Two processes, one mechanism. Rates follow Arrhenius around T0. Values are chosen to be watchable, not those of real water or salt,
     except the activation of evaporation: 44 kJ·mol⁻¹, the enthalpy of vaporization of water near 300 K (≈ +6 % per kelvin). */
  const MODES = {
    vapeur: { kOut: 0.1, eaOut: 44000, stick: 1, eaIn: 0, speed: 30, walk: 0, dT: 0.3, tau: 5 },
    solution: { kOut: 0.08, eaOut: 40000, stick: 0.35, eaIn: 30000, speed: 12, walk: 0.15, dT: 0, tau: 5 },
  };
  const arrhenius = (k0, ea, T) => k0 * Math.exp(-ea / R * (1 / T - 1 / T0));

  function world(o) {
    o = Object.assign({ W: 100, H: 100, cols: 50, row: 2, n0: 600, mode: "vapeur", T: T0, cap: 4000 }, o);
    const m = MODES[o.mode];
    if (!m) throw new Error("processus: unknown mode " + o.mode);
    return { W: o.W, H: o.H, cols: o.cols, row: o.row, mode: o.mode, m, NL: o.n0, n: 0, cap: o.cap,
      x: new Float64Array(o.cap), y: new Float64Array(o.cap), vx: new Float64Array(o.cap), vy: new Float64Array(o.cap),
      T: o.T, Tamb: o.T, open: false, time: 0, out: 0, back: 0, lost: 0 };
  }
  const level = w => w.row * Math.ceil(w.NL / w.cols);          // height of the condensed phase
  const sites = w => Math.min(w.cols, w.NL);                     // molecules exposed at the surface
  const kOut = w => arrhenius(w.m.kOut, w.m.eaOut, w.T);
  const stick = w => Math.min(1, arrhenius(w.m.stick, w.m.eaIn, w.T));
  const speed = w => w.m.speed * Math.sqrt(w.T / T0);

  function launch(w, x, y, rand, up) {
    if (w.n >= w.cap) return false;
    /* leaving a surface, directions follow Lambert's cosine law (p(a) ∝ sin a from the surface): the flux of an isotropic gas */
    const a = up ? Math.acos(1 - 2 * rand()) : 2 * Math.PI * rand(), v = speed(w), i = w.n++;
    w.x[i] = x; w.y[i] = y; w.vx[i] = v * Math.cos(a); w.vy[i] = v * Math.sin(a);       // up: a in (0, π), so vy ≥ 0
    return true;
  }
  function remove(w, i) { const j = --w.n; w.x[i] = w.x[j]; w.y[i] = w.y[j]; w.vx[i] = w.vx[j]; w.vy[i] = w.vy[j]; }

  /* One time step dt. Returns {out, back}: molecules that left and that came back during the step. */
  function step(w, dt, rand) {
    let out = 0, back = 0;
    /* departures: each surface molecule escapes with probability kOut dt (only the most agitated do) */
    const p = kOut(w) * dt, s = sites(w);
    for (let k = 0; k < s; k++) if (rand() < p && w.NL > 0) {
      const top = level(w);
      if (!launch(w, rand() * w.W, top + 1e-6, rand, true)) break;
      w.NL--; out++;
    }
    /* motion of free molecules */
    const v = speed(w), st = stick(w), walk = w.m.walk;
    for (let i = w.n - 1; i >= 0; i--) {
      if (walk && rand() < walk) { const a = 2 * Math.PI * rand(); w.vx[i] = v * Math.cos(a); w.vy[i] = v * Math.sin(a); }
      else { const u = Math.hypot(w.vx[i], w.vy[i]) || 1; w.vx[i] *= v / u; w.vy[i] *= v / u; }   // follow the temperature
      w.x[i] += w.vx[i] * dt; w.y[i] += w.vy[i] * dt;
      if (w.x[i] < 0) { w.x[i] = -w.x[i]; w.vx[i] = -w.vx[i]; }
      if (w.x[i] > w.W) { w.x[i] = 2 * w.W - w.x[i]; w.vx[i] = -w.vx[i]; }
      if (w.y[i] > w.H) {
        if (w.open) { remove(w, i); w.lost++; continue; }       // fan, or running water: what reaches the top is carried away
        w.y[i] = 2 * w.H - w.y[i]; w.vy[i] = -w.vy[i];
      }
      const top = level(w);
      if (w.y[i] <= top) {
        if (rand() < st) { remove(w, i); w.NL++; back++; continue; }
        w.y[i] = 2 * top - w.y[i]; w.vy[i] = Math.abs(w.vy[i]);
      }
    }
    /* each departure carries away more than the average energy; each return brings it back; the surroundings restore Tamb */
    w.T += (w.Tamb - w.T) * dt / w.m.tau - w.m.dT * (out - back);
    w.time += dt; w.out += out; w.back += back;
    return { out, back };
  }

  /* Add free molecules (humid air, or extra dissolved salt), or take away a fraction of them (dry air, dilution). */
  function inject(w, k, rand) { let a = 0; const top = level(w); for (; a < k; a++) if (!launch(w, rand() * w.W, top + rand() * (w.H - top), rand, false)) break; return a; }
  function withdraw(w, frac, rand) { let r = 0; for (let i = w.n - 1; i >= 0; i--) if (rand() < frac) { remove(w, i); r++; } return r; }

  /* Steady state of the closed vapour box: departures cols·kOut balance returns s·ρ·v·W/π (2D flux of an isotropic gas). */
  function equilibrium(w) { const hg = w.H - level(w); return Math.PI * hg * sites(w) * kOut(w) / (stick(w) * speed(w)); }

  const api = { R, T0, MODES, arrhenius, world, level, sites, kOut, stick, speed, step, inject, withdraw, equilibrium };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Equil = api;
})(typeof self !== "undefined" ? self : this);

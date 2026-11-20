/* Inertie — a pendulum hung in a vehicle that accelerates in translation (Feynman I.12.5; CPGE: changement de référentiel,
   force d'inertie d'entraînement). Pure, no DOM, UMD (global Inertie). SI. In a page, load /constantes.js and
   /lecons/integration.js first.
   The vehicle frame R′ is in translation relative to the ground, with acceleration ae = [ax, az] (x forward, z up).
   In R′ a mass m feels, besides the real forces, the inertial force −m ae: it behaves as if gravity were g′ = g − ae.
     apparent(ae, g)       { gx, gz, norme, angle }: g′ = [−ax, −g − az]; angle of the apparent vertical from the true one (rad,
                           > 0 towards +x): atan2(−ax, g + az). g defaults to 9,81.
     periode(L, gp)        small oscillations about the apparent vertical: 2π √(L/g′); Infinity when g′ = 0.
     pendule(o)            the motion in R′. o = { L, ae, g, theta0, omega0, h (default 1e-3 s), duree }.
                           θ from the downward vertical, bob at L (sin θ, −cos θ) from the pivot:  L θ̈ = g′x cos θ + g′z sin θ.
                           Returns { t, theta, omega, tension } arrays; tension per unit mass T/m = g′·(sin θ, −cos θ) + L θ̇²,
                           and mou: true if the string ever goes slack (T < 0), where the model of a taut string stops.
     tournant(omega, r, v) a frame turning at omega (rad·s⁻¹): entrainement ω² r at distance r from the axis, coriolis 2 ω v for a
                           speed v perpendicular to the axis (largest value); both in m·s⁻².
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const G = Cst.g_CPGE;

  const err = m => { throw new Error("inertie: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  function acc(ae) { if (!Array.isArray(ae) || ae.length !== 2) err("ae = [ax, az]"); ae.forEach((q, i) => finite(q, "ae[" + i + "]")); return ae; }

  function apparent(ae, g) {
    acc(ae); g = g == null ? G : positive(g, "g");
    const gx = -ae[0], gz = -g - ae[1];
    return { gx, gz, norme: Math.hypot(gx, gz), angle: Math.atan2(gx, -gz) };
  }
  function periode(L, gp) { positive(L, "L"); finite(gp, "g′"); if (gp < 0) err("g′, une norme, ≥ 0"); return gp === 0 ? Infinity : 2 * Math.PI * Math.sqrt(L / gp); }

  function pendule(o) {
    o = o || {};
    const L = positive(o.L, "L"), ap = apparent(o.ae, o.g), h = o.h == null ? 1e-3 : positive(o.h, "h"), duree = positive(o.duree, "duree");
    const th0 = o.theta0 == null ? 0 : finite(o.theta0, "theta0"), w0 = o.omega0 == null ? 0 : finite(o.omega0, "omega0");
    const a = (t, x) => [(ap.gx * Math.cos(x[0]) + ap.gz * Math.sin(x[0])) / L];
    const n = Math.ceil(duree / h), run = Integ.run("leapfrog", a, { t: 0, x: [th0], v: [w0] }, duree / n, n);
    const theta = run.x.map(x => x[0]), omega = run.v.map(v => v[0]);
    const tension = theta.map((q, i) => ap.gx * Math.sin(q) - ap.gz * Math.cos(q) + L * omega[i] * omega[i]);
    return { t: run.t, theta, omega, tension, mou: tension.some(T => T < -1e-9), apparent: ap };
  }

  function tournant(omega, r, v) { finite(omega, "omega"); finite(r, "r"); finite(v, "v"); if (r < 0) err("r ≥ 0"); return { entrainement: omega * omega * r, coriolis: 2 * Math.abs(omega * v) }; }

  const api = { G, apparent, periode, pendule, tournant };
  if (node) module.exports = api;
  else root.Inertie = api;
})(typeof self !== "undefined" ? self : this);

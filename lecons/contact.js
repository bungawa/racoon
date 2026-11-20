/* Contact — contact between solids, the CPGE notion « contact entre solides » (X.contact_solides.1 to .4): sliding speed,
   a ball launched sliding that ends up rolling, Coulomb's laws as a cone, the power of contact actions on an incline, and the
   solid turning about a fixed axis (compound pendulum, pivot with dry friction).
   Pure, no DOM, UMD (global Contact). SI throughout: m, kg, s, rad, N. Builds on Constantes, Forces (forces.js) and Integ
   (integration.js). It does not repeat them: g and the friction pairs come from Forces, the steps from Integ.

   Conventions. Motion along x on a horizontal or tilted plane; the solid of revolution (radius R, mass m) has J = k m R² about
   its axis through G: k = 2/5 full ball, 2/3 hollow sphere, 1/2 full cylinder, 1 ring (FORMES). ω > 0 when the top of the solid
   moves forward, so that the contact point I moves at
     v_g = v − R ω          (sliding speed of the solid on the fixed support; v_g = 0 is rolling without sliding).
   Quantities « per unit mass » are written in N·kg⁻¹ (accelerations) or J·kg⁻¹ (energies).

   Rolling and sliding
     glissement(v, Rw)            v − Rω.
     lancer(o)                    ball launched with v0 and Rω0 on a horizontal plane, kinetic friction μ (Coulomb, constant):
                                  v̇ = −μ g s, R ω̇ = μ g s / k, s = sign(v_g0), until v_g = 0, then rolling at constant speed.
                                  → { vg0, s, tRoule, vf, Rwf, xRoule, E0, dissipee, fraction, at(t) → { v, Rw, x, vg } }.
                                  Rolling resistance, air and the spin about the vertical are neglected.
   Coulomb's cone
     poussee(o)                   a block of weight m g pushed by F = f m g at angle α from the inward normal; static μs,
                                  kinetic μk: adherence while F sin α ≤ μs (m g + F cos α); jamming (arc-boutement) when
                                  tan α ≤ μs: no force, however large, makes it slide. → { N, T, adhere, arcBoute, fSeuil,
                                  angleReaction, demiAngle, a } (N, T per m g; a per g, along the plane).
   Power of contact actions
     puissanceContact(Rt, vg)     total power of the two contact forces between two solids: R_T · v_g, frame-independent.
     planIncline(o)               solid of revolution released at rest on an incline θ: rolls while tan θ ≤ μs (1 + k)/k, with
                                  a = g sin θ/(1 + k); otherwise slides with a = g (sin θ − μk cos θ). → { roule, a, aRw, T, N,
                                  tanMax, thetaMax, puissance(t), fractions { translation, rotation, chaleur } of the lost
                                  potential energy }.
   Fixed axis
     barre(o)                     homogeneous rod of length L, pivot at d from its centre: J = m (L²/12 + d²),
                                  ω0 = √(m g d / J), T0, equivalent length ℓ_eq = J/(m d), shortest period at d = L/√12,
                                  conjugate pivot d' = L²/(12 d) with the same period (Huygens, Kater).
     pivotSec(o)                  compound pendulum whose pivot has a constant dry-friction torque Γ = ε m g d:
                                  θ̈ = −ω0² (sin θ + ε sign θ̇), stopped for good when θ̇ = 0 and |sin θ| ≤ ε.
                                  → { t, th, om, arret, thArret }. Small angles: the amplitude drops by 2ε every half period.
   Errors are thrown with a French message: they mean the call is wrong, never that the motion is unusual. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Forces = node ? require("./forces.js") : root.Forces;
  const Integ = node ? require("./integration.js") : root.Integ;
  const G = Forces.G0, TAU = 2 * Math.PI;
  const FORMES = { boule: 2 / 5, sphere_creuse: 2 / 3, cylindre: 1 / 2, anneau: 1 };

  const err = m => { throw new Error("contact: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const nonneg = (v, name) => { finite(v, name); if (v < 0) err(name + " doit être positif ou nul"); return v; };
  const gOf = g => g == null ? G : positive(g, "g");
  const kOf = k => typeof k === "string" ? (FORMES[k] || err("forme inconnue « " + k + " »")) : positive(k, "k");
  const sign = x => x > 0 ? 1 : x < 0 ? -1 : 0;

  /* ---------- rolling and sliding ---------- */
  const glissement = (v, Rw) => finite(v, "v") - finite(Rw, "Rω");

  function lancer(o) {
    o = o || {};
    const v0 = finite(o.v0, "v0"), Rw0 = finite(o.Rw0 == null ? 0 : o.Rw0, "Rω0"), mu = positive(o.mu, "μ"), k = kOf(o.k == null ? "boule" : o.k), g = gOf(o.g);
    const vg0 = v0 - Rw0, s = sign(vg0), dv = -mu * g * s, dRw = mu * g * s / k;
    const tRoule = Math.abs(vg0) * k / (mu * g * (1 + k));          // v_g decreases at μ g (1 + 1/k)
    const vf = (v0 + k * Rw0) / (1 + k), xRoule = v0 * tRoule + dv * tRoule * tRoule / 2;
    const E0 = (v0 * v0 + k * Rw0 * Rw0) / 2, dissipee = vg0 * vg0 * k / (2 * (1 + k));
    function at(t) {
      finite(t, "t"); if (t < 0) err("t ≥ 0");
      if (t <= tRoule) { const v = v0 + dv * t, Rw = Rw0 + dRw * t; return { v, Rw, x: v0 * t + dv * t * t / 2, vg: v - Rw }; }
      return { v: vf, Rw: vf, x: xRoule + vf * (t - tRoule), vg: 0 };
    }
    return { vg0, s, k, tRoule, vf, Rwf: vf, xRoule, E0, dissipee, fraction: E0 > 0 ? dissipee / E0 : 0, at };
  }

  /* ---------- Coulomb's cone ---------- */
  function poussee(o) {
    o = o || {};
    const al = finite(o.alpha, "α"), f = nonneg(o.f, "f"), mus = nonneg(o.mus, "μs"), muk = nonneg(o.muk == null ? mus : o.muk, "μk");
    if (al < 0 || al >= Math.PI / 2) err("α entre 0 et π/2 (exclu) : la poussée appuie sur le plan");
    if (muk > mus) err("μk ≤ μs");
    const N = 1 + f * Math.cos(al), Treq = f * Math.sin(al), demiAngle = Forces.angleLimite(mus);
    const arcBoute = Math.tan(al) <= mus, adhere = Forces.adhere(Treq, N, mus);
    const fSeuil = arcBoute ? Infinity : mus / (Math.sin(al) - mus * Math.cos(al));
    const T = adhere ? Treq : muk * N;
    return { N, T, Treq, adhere, arcBoute, fSeuil, demiAngle, angleReaction: Math.atan2(T, N), a: adhere ? 0 : Treq - muk * N };
  }

  /* ---------- power of contact actions ---------- */
  function puissanceContact(Rt, vg) {
    if (Array.isArray(Rt)) { if (!Array.isArray(vg) || vg.length !== Rt.length) err("R_T et v_g de même dimension"); return Rt.reduce((p, r, i) => p + finite(r, "R_T") * finite(vg[i], "v_g"), 0); }
    return finite(Rt, "R_T") * finite(vg, "v_g");
  }

  function planIncline(o) {
    o = o || {};
    const th = finite(o.theta, "θ"), k = kOf(o.k == null ? "boule" : o.k), mus = nonneg(o.mus, "μs"), muk = nonneg(o.muk == null ? mus : o.muk, "μk"), g = gOf(o.g);
    if (th < 0 || th > Math.PI / 2) err("θ entre 0 et π/2"); if (muk > mus) err("μk ≤ μs");
    const s = Math.sin(th), c = Math.cos(th), N = g * c, tanMax = mus * (1 + k) / k, thetaMax = Math.atan(tanMax);
    const Troule = g * s * k / (1 + k);
    const roule = Troule <= mus * N + 1e-15;
    if (roule) {
      const a = g * s / (1 + k);
      return { roule, a, aRw: a, T: Troule, N, tanMax, thetaMax, puissance: () => 0,
        fractions: { translation: 1 / (1 + k), rotation: k / (1 + k), chaleur: 0 } };
    }
    const a = g * (s - muk * c), aRw = muk * g * c / k, T = muk * N, lost = g * s * a;
    return { roule, a, aRw, T, N, tanMax, thetaMax,
      puissance: t => -T * (a - aRw) * nonneg(t, "t"),              // R_T · v_g per unit mass, v_g = (a − R ω̇) t
      fractions: { translation: a * a / lost, rotation: k * aRw * aRw / lost, chaleur: T * (a - aRw) / lost } };
  }

  /* ---------- fixed axis ---------- */
  function barre(o) {
    o = o || {};
    const L = positive(o.L, "L"), d = positive(o.d, "d"), m = o.m == null ? 1 : positive(o.m, "m"), g = gOf(o.g);
    if (d > L / 2) err("le pivot est sur la barre : d ≤ L/2");
    const jG = m * L * L / 12, J = jG + m * d * d, w0 = Math.sqrt(m * g * d / J), dMin = L / Math.sqrt(12);
    return { J, jG, w0, T0: TAU / w0, lEq: J / (m * d), dMin, Tmin: TAU * Math.sqrt(2 * dMin / g), dConj: L * L / (12 * d) };
  }

  function pivotSec(o) {
    o = o || {};
    const w = positive(o.w0, "ω0"), th0 = finite(o.th0, "θ0"), eps = nonneg(o.eps == null ? 0 : o.eps, "ε");
    const T0 = TAU / w, h = o.h == null ? T0 / 400 : positive(o.h, "h"), duree = positive(o.duree == null ? 20 * T0 : o.duree, "durée");
    if (Math.abs(th0) >= Math.PI) err("|θ0| < π");
    const t = [0], th = [th0], om = [0];
    if (Math.abs(Math.sin(th0)) <= eps) return { t, th, om, arret: 0, thArret: th0 };
    let s = { t: 0, x: [th0], v: [0] }, dir = -sign(Math.sin(th0)), arret = NaN;
    /* first half-step: the speed starts at 0, its sign is that of the restoring torque */
    const accel = (x, d) => [-w * w * (Math.sin(x[0]) + eps * d)];
    while (s.t < duree - 1e-12) {
      const n = Integ.step("leapfrog", (tt, x) => accel(x, dir), s, h);
      if (sign(n.v[0]) !== dir) {                                       // the speed reached 0 during the step: a turning point
        const f = s.v[0] / (s.v[0] - n.v[0]), x = s.x[0] + f * (n.x[0] - s.x[0]), tt = s.t + f * h;
        t.push(tt); th.push(x); om.push(0);
        if (Math.abs(Math.sin(x)) <= eps) { arret = tt; break; }        // static friction holds it for good
        dir = -dir; s = { t: tt, x: [x], v: [0] }; continue;
      }
      s = n; t.push(s.t); th.push(s.x[0]); om.push(s.v[0]);
    }
    return { t, th, om, arret, thArret: isNaN(arret) ? NaN : th[th.length - 1] };
  }

  const api = { G, FORMES, glissement, lancer, poussee, puissanceContact, planIncline, barre, pivotSec };
  if (node) module.exports = api;
  else root.Contact = api;
})(typeof self !== "undefined" ? self : this);

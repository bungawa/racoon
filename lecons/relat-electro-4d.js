/* Electro4D — l'électrodynamique à quatre dimensions des leçons « L'électrodynamique en notation quadridimensionnelle »,
   « Le quadripotentiel d'une charge en mouvement » et « L'invariance des équations de l'électrodynamique »
   (Feynman II.25.4 à 25.6), étape « Équations de Maxwell à quatre dimensions ». Pur, sans DOM, UMD (global Electro4D).
   SI partout. Quadripotentiel A_μ = [φ/c, Ax, Ay, Az] ; un champ est une fonction de l'événement e = [ct, x, y, z] (m).
   S'appuie sur relativite.js (quadriChampVu, dalembertien, gamma) et ondes-milieux.js (maxwellVide). Tests :
   test/lecons/relat-electro-4d.test.js.
     quadripotentielCharge(q, v)  (25.25) puis (25.26) : charge à v selon x, à l'origine en t = 0 ; { A(e), phi(e), repos(e) }.
     jauges(F, e, h)            { temps = (1/c²)∂φ/∂t, espace = ∇·A, lorenz = ∂_μA_μ (25.23), echelle } par différences.
     champsQuadri(F, e, h)      { E, B } : E = −∇φ − ∂A/∂t, B = ∇ ∧ A, par différences.
     residusVide(F, e, h)       désaccords relatifs de □²A_μ (25.22), ∂_μA_μ, Gauss, Ampère, Faraday, ∇·B ; U = Σ carrés (25.32).
     passageCharge(q, v, b)     la charge passe à b d'un observateur : { pic = γ q/(4π ε0 b), largeur = 2√3 b/(γv), A(t),
                                phi(t), invariant(t) = c√(A_μA_μ) = φ′ (25.28a) } ; (25.27a).
     ondePlaneQuadri(E0, λ), galileeVu(F, u)  onde plane A_y = (E0/ω) sin(kx − ωt) ; un champ relu par Galilée, pour comparer.
     ondeVue(o)                 { E0, λ, u, transfo } : l'onde plane vue à u par « lorentz » ou « galilee » : k′, ω′, vPhase,
                                rapport E′/(cB′), residus. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Rel = node ? require("../relativite.js") : root.Relativite;
  const OM = node ? require("../ondes-milieux.js") : root.OndesMilieux;
  const C = Cst.c, K = 1 / (4 * Math.PI * Cst.eps0);
  const err = m => { throw new Error("électrodynamique à quatre dimensions : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const vitesse = (v, nom) => { fini(v, nom); if (!(Math.abs(v) < C)) err("|" + nom + "| doit rester inférieure à c"); return v; };
  const champ4 = (F, nom) => (typeof F === "function" ? F : err(nom + " doit être une fonction de l'événement [ct, x, y, z]"));
  const evt4 = e => { if (!Array.isArray(e) || e.length !== 4) err("e doit être un événement [ct, x, y, z]");
    e.forEach((x, i) => fini(x, "e[" + i + "]")); return e; };
  const comp = (F, k) => e => { const v = F(e); if (!Array.isArray(v) || v.length !== 4) err("le champ doit rendre un quadrivecteur [At, Ax, Ay, Az]"); return v[k]; };
  /* ∂F_k/∂x_j by centred differences of step h along the axis j of the event [ct, x, y, z] */
  const d = (F, k, j, e, h) => { const a = e.slice(), b = e.slice(); a[j] += h; b[j] -= h; return (comp(F, k)(a) - comp(F, k)(b)) / (2 * h); };

  /* (25.25) then (25.26): the four-potential A_μ = [φ/c, Ax, Ay, Az] (V·s·m⁻¹ = T·m) of a charge q moving at the constant
     speed v along x, at the origin at t = 0, as a function of the event e = [ct, x, y, z] of the laboratory. Route of
     Feynman II.25.5: in the frame of the charge, Coulomb's φ′ = q/(4π ε0 r′) and A′ = 0; the laboratory moves at −v
     relative to it, so A_μ is that four-vector boosted by −β (Relativite.quadriChampVu). Exact for a point charge in
     uniform motion forever, |v| < c; singular on the charge. { A(e), phi(e), repos(e) → [φ′/c, 0, 0, 0], gamma, beta }. */
  function quadripotentielCharge(q, v) {
    fini(q, "q"); vitesse(v, "v");
    const R = Rel, beta = v / C;
    function repos(e) {
      const r = Math.hypot(e[1], e[2], e[3]);
      if (!(r > 0)) err("le point d'observation est sur la charge");
      return [K * q / r / C, 0, 0, 0];
    }
    const A = R.quadriChampVu(repos, -beta);
    return { A: e => A(evt4(e)), phi: e => C * A(evt4(e))[0], repos: e => repos(evt4(e)), gamma: R.gamma(v), beta };
  }

  /* The two terms of the Lorenz condition (25.23) for a four-potential field F(e) = [φ/c, A]: temps = ∂(φ/c)/∂(ct) =
     (1/c²) ∂φ/∂t, espace = ∇·A (the Coulomb condition asks espace = 0), lorenz = their sum, ∂_μ A_μ, invariant; echelle =
     |temps| + |espace|. Centred differences of step h (m): error ≈ h² × third derivative. */
  function jauges(F, e, h) {
    champ4(F, "F"); evt4(e); positif(h, "h");
    const temps = d(F, 0, 0, e, h), espace = d(F, 1, 1, e, h) + d(F, 2, 2, e, h) + d(F, 3, 3, e, h);
    return { temps, espace, lorenz: temps + espace, echelle: Math.abs(temps) + Math.abs(espace) };
  }

  /* E = −∇φ − ∂A/∂t = −c (∇A_t + ∂A/∂(ct)), B = ∇ ∧ A, from a four-potential field F(e) = [φ/c, A], by centred
     differences of step h (m). { E (V·m⁻¹), B (T) }. Exact definitions of the fields from the potentials (18.19), (18.16). */
  function champsQuadri(F, e, h) {
    champ4(F, "F"); evt4(e); positif(h, "h");
    const E = [1, 2, 3].map(i => -C * (d(F, 0, i, e, h) + d(F, i, 0, e, h)));
    const B = [d(F, 3, 2, e, h) - d(F, 2, 3, e, h), d(F, 1, 3, e, h) - d(F, 3, 1, e, h), d(F, 2, 1, e, h) - d(F, 1, 2, e, h)];
    return { E, B };
  }

  /* How well a four-potential field F(e) obeys electrodynamics in the vacuum (j = 0) at the event e, each mismatch divided
     by the size of its own terms: dalembert[μ] = □²A_μ (25.22), lorenz = ∂_μA_μ (25.23), gauss = ∇·E, ampere = the
     largest component of c²∇ ∧ B − ∂E/∂t, faraday = of ∇ ∧ E + ∂B/∂t, flux = ∇·B. The last two vanish for any potentials:
     they are identities, not laws. U = Σ mismatch² (25.32), with this normalisation. h: step of the differences (m); the
     fields use h, the residues of the fields use h again (maxwellVide). Residues of order (h/λ)² or rounding mean zero. */
  function residusVide(F, e, h) {
    champ4(F, "F"); evt4(e); positif(h, "h");
    const R = Rel, rel = (x, s) => (s > 0 ? Math.abs(x) / s : 0);
    const dal = [0, 1, 2, 3].map(k => {
      const f = comp(F, k), f0 = f(e), d2 = j => { const a = e.slice(), b = e.slice(); a[j] += h; b[j] -= h; return (f(a) - 2 * f0 + f(b)) / (h * h); };
      const t = [d2(0), d2(1), d2(2), d2(3)];
      return rel(R.dalembertien(f, e, h), t.reduce((s, x) => s + Math.abs(x), 0));
    });
    const g = jauges(F, e, h), lorenz = rel(g.lorenz, g.echelle);
    const champ = (r, t) => champsQuadri(F, [C * t, r[0], r[1], r[2]], h);
    const m = OM.maxwellVide(champ, [e[1], e[2], e[3]], e[0] / C, h), s = m.echelle;
    const big = v => Math.max(...v.map(Math.abs));
    const res = { dalembert: dal, lorenz, gauss: rel(m.I, s), ampere: rel(big(m.IV), s * C), faraday: rel(big(m.II), s), flux: rel(m.III, s / C) };
    res.U = dal.reduce((a, x) => a + x * x, 0) + lorenz ** 2 + res.gauss ** 2 + res.ampere ** 2 + res.faraday ** 2 + res.flux ** 2;
    return res;
  }

  /* The charge of quadripotentielCharge passes at the distance b from an observer at (0, b, 0); the time t is counted from
     the closest approach. (25.27) there: φ(t) = γ q/(4π ε0 √(γ²v²t² + b²)), A_x = vφ/c² (25.28). { gamma, beta, coulomb =
     q/(4π ε0 b), pic = γ coulomb, largeur = 2√3 b/(γ|v|) (full width at half peak, Infinity at v = 0), A(t), phi(t),
     invariant(t) = c √(A_t² − A·A) = φ′ (25.28a), the potential in the frame of the charge }. Same domain as above. */
  function passageCharge(q, v, b) {
    fini(q, "q"); vitesse(v, "v"); positif(b, "b");
    const Q = quadripotentielCharge(q, v), coulomb = K * q / b;
    const ev = t => [C * fini(t, "t"), 0, b, 0];
    return {
      gamma: Q.gamma, beta: Q.beta, coulomb, pic: Q.gamma * coulomb,
      largeur: v === 0 ? Infinity : 2 * Math.sqrt(3) * b / (Q.gamma * Math.abs(v)),
      A: t => Q.A(ev(t)), phi: t => Q.phi(ev(t)),
      invariant: t => { const a = Q.A(ev(t)); return C * Math.sign(a[0]) * Math.sqrt(Math.max(0, (a[0] - a[1]) * (a[0] + a[1]) - a[2] * a[2] - a[3] * a[3])); },
    };
  }

  /* A plane wave in the vacuum along +x, polarised along y, in the gauge φ = 0: A_y = (E0/ω) sin(kx − ωt), so that
     E_y = E0 cos(kx − ωt), B_z = (E0/c) cos(kx − ωt). F(e) = [0, 0, A_y, 0] with ω = ck. Exact solution of (25.22) with
     j = 0; it also obeys the Lorenz condition (∇·A = 0, φ = 0). { F, k, omega }. */
  function ondePlaneQuadri(E0, lambda) {
    fini(E0, "E0"); positif(lambda, "λ");
    const k = 2 * Math.PI / lambda, omega = C * k, a = E0 / omega;
    return { F: e => { evt4(e); return [0, 0, a * Math.sin(k * (e[1] - e[0])), 0]; }, k, omega };
  }

  /* For comparison: a field read from a frame moving at u along x by the change of frame of Galileo, x = x′ + ut′,
     t = t′, the four components kept as they are (a scalar φ and a vector A of Newton's physics). Not a law of nature:
     it is what one would write if time were common to all frames. e′ = [ct′, x′, y′, z′]. */
  function galileeVu(F, u) {
    champ4(F, "F"); fini(u, "u");
    return e => { evt4(e); return F([e[0], e[1] + u * e[0] / C, e[2], e[3]]); };
  }

  /* The plane wave of ondePlaneQuadri seen from a frame that moves at u along x, by "lorentz" (the four-potential boosted,
     (25.24)) or by "galilee" (galileeVu). Measured on the transformed field, at the event [0, λ/8, 0, 0] of that frame:
     { k, omega, vPhase = ω′/k′, rapport = E′_y/(c B′_z), E, B, residus (residusVide) }. k′ and ω′ are those of each
     transformation, lorentz k′ = γ(k − βω/c), ω′ = γ(ω − βck), galilee k′ = k, ω′ = ω − uk ; rapport is measured on the
     fields and equals vPhase/c (Faraday holds in both). Exact for the wave; the differences are the approximation. */
  function ondeVue(o) {
    const E0 = fini(o.E0 == null ? 1 : o.E0, "E0"), lambda = positif(o.lambda == null ? 1 : o.lambda, "λ"), u = vitesse(o.u, "u");
    const transfo = o.transfo === "galilee" || o.transfo === "lorentz" ? o.transfo : err("transfo : « lorentz » ou « galilee »");
    const R = Rel, w = ondePlaneQuadri(E0, lambda), beta = u / C;
    const F = transfo === "lorentz" ? R.quadriChampVu(w.F, beta) : galileeVu(w.F, u);
    let k = w.k, omega = w.omega;
    if (transfo === "lorentz") { const g = R.gamma(u); k = g * (w.k - beta * w.omega / C); omega = g * (w.omega - beta * C * w.k); }
    else omega = w.omega - u * w.k;
    const lp = 2 * Math.PI / Math.abs(k), h = o.h == null ? lp / 400 : positif(o.h, "h"), e = [0, lp / 8, 0, 0];
    const f = champsQuadri(F, e, h);
    return { transfo, u, k, omega, vPhase: omega / k, rapport: f.E[1] / (C * f.B[2]), E: f.E, B: f.B, residus: residusVide(F, e, h) };
  }

  const api = { quadripotentielCharge, jauges, champsQuadri, residusVide, passageCharge, ondePlaneQuadri, galileeVu, ondeVue };
  if (node) module.exports = api;
  else root.Electro4D = api;
})(typeof self !== "undefined" ? self : this);

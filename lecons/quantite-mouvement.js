/* Calculs des leçons « Conservation de la quantité de mouvement » (Feynman I.10.1 à I.10.5, programme de CPGE) :
   deux corps qui se repoussent, centre de masse, chocs à une et deux dimensions, fusée, quantité de mouvement relativiste.
   Pur, sans DOM, UMD (global QteMvt). SI : m en kg, v en m·s⁻¹, x en m, p en kg·m·s⁻¹, énergies en J.
   Les vecteurs du plan sont des tableaux [x, y]. Partagé par troisieme-loi-de-newton, conservation-quantite-de-mouvement,
   chocs, quantite-de-mouvement-et-energie et quantite-de-mouvement-relativiste. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G = Cst.g_CPGE, C = Cst.c;        // G : valeur arrondie utilisée en CPGE

  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) throw new Error("qtemvt: " + name + " doit être un nombre fini"); };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) throw new Error("qtemvt: " + name + " doit être strictement positif"); };
  const nonneg = (v, name) => { finite(v, name); if (!(v >= 0)) throw new Error("qtemvt: " + name + " doit être positif ou nul"); };
  const vec = (v, name) => { if (!Array.isArray(v) || v.length !== 2) throw new Error("qtemvt: " + name + " doit être un vecteur [x, y]"); finite(v[0], name + "x"); finite(v[1], name + "y"); };
  const restitution = e => { finite(e, "e"); if (!(e >= 0 && e <= 1)) throw new Error("qtemvt: le coefficient de restitution e doit être dans [0, 1]"); };

  /* ---------- I.10.1 : deux corps qui se repoussent ----------
     Un ressort comprimé entre deux chariots libère l'énergie E. Système isolé horizontalement, parti du repos :
     m1 v1 + m2 v2 = 0 et ½ m1 v1² + ½ m2 v2² = E. Le chariot 1 part vers les x négatifs. */
  function release(m1, m2, E) {
    positive(m1, "m1"); positive(m2, "m2"); nonneg(E, "E");
    const M = m1 + m2, v1 = -Math.sqrt(2 * E * m2 / (m1 * M)), v2 = Math.sqrt(2 * E * m1 / (m2 * M));
    return { v1, v2, p1: m1 * v1, p2: m2 * v2, ec1: m1 * v1 * v1 / 2, ec2: m2 * v2 * v2 / 2 };
  }
  /* Accélération d'un corps de masse M sous la réaction d'un corps de masse m soumis à son poids (la Terre sous la pomme). */
  const reactionAcceleration = (m, M, g) => { positive(m, "m"); positive(M, "M"); return m * (g == null ? G : g) / M; };

  /* Ce qu'on néglige : impulsion d'une force extérieure d'accélération aExt pendant τ, rapportée à la variation de vitesse Δv
     due aux forces intérieures. Petit ⇒ système pseudo-isolé pendant τ. */
  function externalShare(aExt, tau, dv) {
    nonneg(aExt, "aExt"); nonneg(tau, "τ"); finite(dv, "Δv");
    if (dv === 0) throw new Error("qtemvt: Δv nul, rapport sans objet");
    return aExt * tau / Math.abs(dv);
  }

  /* Référentiel terrestre : pour un bilan horizontal, l'accélération centrifuge est déjà dans g ; reste Coriolis,
     dont la composante horizontale vaut au plus 2 Ω v (Ω : rotation sidérale de la Terre, 2π / 86 164 s). */
  const OMEGA_TERRE = Cst.Omega_E;        // rad·s⁻¹
  const coriolis = (v, omega) => { finite(v, "v"); return 2 * (omega == null ? OMEGA_TERRE : omega) * Math.abs(v); };

  /* ---------- I.10.2 : centre de masse ----------
     bodies : [{m, x, v}] avec x et v nombres (1D) ou vecteurs [x, y] (2D). */
  function centre(bodies) {
    if (!Array.isArray(bodies) || !bodies.length) throw new Error("qtemvt: au moins un corps");
    const dim = Array.isArray(bodies[0].v) ? 2 : 1, M = bodies.reduce((s, b) => { positive(b.m, "m"); return s + b.m; }, 0);
    const sum = k => dim === 1 ? bodies.reduce((s, b) => { finite(b[k], k); return s + b.m * b[k]; }, 0)
      : [0, 1].map(i => bodies.reduce((s, b) => { vec(b[k], k); return s + b.m * b[k][i]; }, 0));
    const p = sum("v"), mx = bodies.every(b => b.x != null) ? sum("x") : null;
    const div = a => a == null ? null : dim === 1 ? a / M : a.map(c => c / M);
    return { M, p, vG: div(p), xG: div(mx) };
  }
  /* Barque : une personne de masse m marche de L vers l'avant sur une barque de masse M. Eau sans frottement :
     le centre de masse ne bouge pas, la barque recule de m L / (m + M). */
  function boat(m, M, L) {
    positive(m, "m"); positive(M, "M"); finite(L, "L");
    const back = m * L / (m + M);
    return { boat: -back, person: L - back, xG: 0 };
  }

  /* ---------- I.10.3 : chocs à une dimension ----------
     Coefficient de restitution e : vitesse relative après = −e × vitesse relative avant (e = 1 élastique, e = 0 mou).
     Forme stable : chaque vitesse finale = vitesse initiale + petite correction ; pas de différence de grands nombres
     quand une masse écrase l'autre. */
  function collide(m1, m2, u1, u2, e) {
    positive(m1, "m1"); positive(m2, "m2"); finite(u1, "u1"); finite(u2, "u2");
    e = e == null ? 1 : e; restitution(e);
    const M = m1 + m2, w = u1 - u2, k = (1 + e) * w / M;
    const v1 = u1 - m2 * k, v2 = u2 + m1 * k, mu = m1 * m2 / M;
    const vG = m1 / M * u1 + m2 / M * u2;
    return { v1, v2, vG, J: m1 * m2 * k,                                   // J : impulsion reçue par le corps 2
      p0: m1 * u1 + m2 * u2, p1: m1 * v1 + m2 * v2,
      ec0: (m1 * u1 * u1 + m2 * u2 * u2) / 2, ec1: (m1 * v1 * v1 + m2 * v2 * v2) / 2,
      lost: mu * (1 - e * e) * w * w / 2,                                    // ½ μ (1 − e²) (u1 − u2)², sans soustraction
      ecG: M * vG * vG / 2, ecStar0: mu * w * w / 2 };                       // König : Ec = ½ M vG² + ½ μ w²
  }
  /* Forme naïve, pour la comparaison : v1 = ((m1 − e m2) u1 + (1 + e) m2 u2)/M. Juste en exact, fragile en flottants. */
  function collideNaive(m1, m2, u1, u2, e) {
    const M = m1 + m2;
    return { v1: ((m1 - e * m2) * u1 + (1 + e) * m2 * u2) / M, v2: ((m2 - e * m1) * u2 + (1 + e) * m1 * u1) / M };
  }

  /* Pendule balistique : la balle (m, vitesse u) s'enfonce de d dans le bloc (M) suspendu à des fils de longueur L.
     Modèle : force de freinage constante, la vitesse relative passe de u à 0 en τ = 2d/u. Le bloc accélère de 0 à
     V = m u/(m + M) et parcourt x = V τ/2 = m d/(m + M) ; les fils s'inclinent de θ ≈ x/L. */
  function penetration(m, M, u, d, L) {
    positive(m, "m"); positive(M, "M"); positive(u, "u"); positive(d, "d"); positive(L, "L");
    const tau = 2 * d / u, V = m * u / (m + M), x = V * tau / 2;
    return { tau, V, x, theta: Math.asin(Math.min(1, x / L)) };
  }

  /* ---------- I.10.4 : chocs dans le plan ----------
     Deux disques lisses de rayons r1, r2 ; le 1 arrive avec u1, le 2 avec u2. b : paramètre d'impact, distance entre la
     droite du mouvement relatif et le centre de 2, en unités de r1 + r2 (|b| < 1, sinon pas de choc).
     Au contact, n est l'axe des centres : la composante normale suit le choc 1D, la tangentielle ne change pas. */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const scale = (a, k) => [a[0] * k, a[1] * k], dot = (a, b) => a[0] * b[0] + a[1] * b[1], norm = a => Math.hypot(a[0], a[1]);
  function collide2D(m1, m2, u1, u2, b, e) {
    positive(m1, "m1"); positive(m2, "m2"); vec(u1, "u1"); vec(u2, "u2"); finite(b, "b");
    e = e == null ? 1 : e; restitution(e);
    if (!(Math.abs(b) < 1)) throw new Error("qtemvt: |b| ≥ 1, les disques ne se touchent pas");
    const w = sub(u1, u2), W = norm(w);
    if (W === 0) throw new Error("qtemvt: vitesse relative nulle, pas de choc");
    const t = scale(w, 1 / W), perp = [-t[1], t[0]];
    const n = add(scale(t, Math.sqrt(1 - b * b)), scale(perp, -b));        // axe des centres, de 1 vers 2, au contact
    const r = collide(m1, m2, dot(u1, n), dot(u2, n), e);
    const v1 = add(u1, scale(n, r.v1 - dot(u1, n))), v2 = add(u2, scale(n, r.v2 - dot(u2, n)));
    const M = m1 + m2, vG = add(scale(u1, m1 / M), scale(u2, m2 / M));
    const ec = (a, c) => (m1 * dot(a, a) + m2 * dot(c, c)) / 2;
    return { v1, v2, n, vG, p0: add(scale(u1, m1), scale(u2, m2)), p1: add(scale(v1, m1), scale(v2, m2)), ec0: ec(u1, u2), ec1: ec(v1, v2),
      lost: r.lost, angle: angleBetween(v1, v2) };
  }
  function angleBetween(a, b) {                                             // en radians, NaN si un vecteur est nul
    const na = norm(a), nb = norm(b);
    if (na === 0 || nb === 0) return NaN;
    return Math.atan2(Math.abs(a[0] * b[1] - a[1] * b[0]), dot(a, b));     // atan2 : précis aussi près de 0 et de π
  }
  /* changement de référentiel galiléen : on retranche la vitesse V du référentiel */
  const inFrame = (v, V) => Array.isArray(v) ? sub(v, V) : v - V;

  /* ---------- I.10.4 : propulsion ----------
     Fusée loin de tout astre : elle éjecte (m0 − mf) en n paquets égaux, chacun à la vitesse u par rapport à elle juste après.
     Avant l'éjection d'un paquet δ, la fusée et le paquet ont la masse Mk et la vitesse v ; après, M v = (Mk − δ) v′ + δ (v′ − u),
     d'où v′ = v + δ u / Mk. Quand n → ∞ : Δv = u ln(m0/mf) (Tsiolkovski). */
  function rocketDiscrete(m0, mf, u, n) {
    positive(m0, "m0"); positive(mf, "mf"); finite(u, "u");
    if (!(mf <= m0)) throw new Error("qtemvt: la masse finale dépasse la masse initiale");
    if (!Number.isInteger(n) || n < 1) throw new Error("qtemvt: n entier ≥ 1");
    const d = (m0 - mf) / n; let v = 0;
    for (let k = 0; k < n; k++) v += d * u / (m0 - k * d);
    return v;
  }
  function rocket(m0, mf, u) {
    positive(m0, "m0"); positive(mf, "mf"); finite(u, "u");
    if (!(mf <= m0)) throw new Error("qtemvt: la masse finale dépasse la masse initiale");
    return u * Math.log1p((m0 - mf) / mf);                                  // log1p : juste aussi quand m0 ≈ mf
  }
  /* poussée u q (q débit en kg·s⁻¹) et perte par la pesanteur pour une montée verticale de durée tb : Δv = u ln(m0/mf) − g tb */
  const thrust = (u, q) => { finite(u, "u"); nonneg(q, "q"); return u * q; };
  const rocketVertical = (m0, mf, u, tb, g) => { nonneg(tb, "tb"); return rocket(m0, mf, u) - (g == null ? G : g) * tb; };

  /* ---------- I.10.5 : relativité ----------
     β = v/c. γ calculé par (1 − β)(1 + β) : pas de perte quand β → 1 ; γ − 1 par β²γ²/(γ + 1) : pas d'annulation quand β → 0. */
  function gamma(beta) { finite(beta, "β"); if (!(Math.abs(beta) < 1)) throw new Error("qtemvt: |β| < 1 attendu"); return 1 / Math.sqrt((1 - beta) * (1 + beta)); }
  function gammaMinusOne(beta) { const g = gamma(beta); return beta * beta * g * g / (g + 1); }
  const momentumRel = (m, v) => { nonneg(m, "m"); return gamma(v / C) * m * v; };                // p = γ m v
  const energyRel = (m, v) => { nonneg(m, "m"); return gamma(v / C) * m * C * C; };              // E = γ m c²
  const kineticRel = (m, v) => { nonneg(m, "m"); return gammaMinusOne(v / C) * m * C * C; };    // (γ − 1) m c²
  /* écart relatif de ½ m v² à l'énergie cinétique vraie (γ − 1) m c², rapporté à la vraie : 1 − β²/(2(γ − 1)),
     écrit (2γ + 1)(γ − 1)/(2γ²) pour ne pas retrancher deux nombres voisins de 1 ; ≈ 3β²/4 aux petites vitesses */
  const classicalKineticError = beta => { const g = gamma(beta); return (2 * g + 1) * gammaMinusOne(beta) / (2 * g * g); };
  /* vitesse d'un corps de vitesse v vue d'un référentiel de vitesse V (même axe) */
  function addVelocity(v, V) {
    finite(v, "v"); finite(V, "V");
    if (!(Math.abs(v) < C && Math.abs(V) < C)) throw new Error("qtemvt: vitesses inférieures à c attendues");
    return (v - V) / (1 - v * V / (C * C));
  }
  /* Deux corps s'accrochent (choc mou) : un seul corps de masse M et de vitesse V après. Conservation de E et de p :
     V = p c²/E, M c² = √(E² − p²c²). La masse M dépasse m1 + m2 : l'énergie cinétique perdue est devenue masse. */
  function stick(m1, v1, m2, v2) {
    positive(m1, "m1"); positive(m2, "m2");
    const E = energyRel(m1, v1) + energyRel(m2, v2), p = momentumRel(m1, v1) + momentumRel(m2, v2);
    const pc = p * C, M = Math.sqrt((E - pc) * (E + pc)) / (C * C);
    return { V: p * C * C / E, M, E, p };
  }

  const api = { G, C, OMEGA_TERRE, release, reactionAcceleration, externalShare, coriolis, penetration, classicalKineticError, centre, boat, collide, collideNaive, collide2D, angleBetween, inFrame,
    rocketDiscrete, rocket, thrust, rocketVertical, gamma, gammaMinusOne, momentumRel, energyRel, kineticRel, addVelocity, stick,
    vec: { add, sub, scale, dot, norm } };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.QteMvt = api;
})(typeof self !== "undefined" ? self : this);

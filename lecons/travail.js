/* Travail — work, power and kinetic energy of a point mass (Feynman I.13.1–13.2; CPGE « approche énergétique du mouvement
   d'un point matériel »). Pure, no DOM, UMD (global Travail). SI throughout: m, kg, s, N, J, W.
   In a vertical plane a position is [x, z], z pointing up; every vector function also takes 3 components.
   Shared by energie-corps-qui-tombe, travail-du-poids and the three lessons I.14.3–I.14.5 below:
   the API below is stable; change it only with test/lecons/travail.test.js.

   Vectors
     scalaire(a, b)                 a·b, a and b of the same length (1 to 3).
     puissance(F, v)                P = F·v in W: the rate at which the force changes the kinetic energy (13.7).
   Force fields, r → F in N (pure functions of the position)
     poids(m, g, dim)               uniform weight, [0, −m g] (dim 2, default) or [0, 0, −m g] (dim 3); g defaults to 9,81.
     gravitation(GM, m)             Newton's pull towards the origin, −GMm r/r³, any dimension.
     constante(F)                   a constant force F.
   Paths r(u), u from 0 to 1, from A to B; built by the chemin.* functions, each a function with .A and .B
     chemin.droite(A, B)            the segment.
     chemin.escalier(A, B, n, o)    n steps, each a horizontal then a vertical move (o = "hv", default) or the reverse ("vh").
     chemin.arc(A, B, f)            the chord bent by f·sin(πu) along its normal (f > 0: to the left of A→B; in a vertical plane
                                    from upper left to lower right, that is above the chord).
     chemin.boucle(A, B, R)         the segment with a full vertical circle of radius R inserted at its midpoint.
     chemin.cycloide(A, B)          the brachistochrone from A down to B, B at its lowest point: needs xB − xA = π (zA − zB)/2.
     chemin.polyligne(points)       straight pieces through the points, u shared by length.
     points(path, n)                n + 1 points of the path, u = i/n.
     longueur(path, n)              length of the polyline of n pieces (n default 2000).
   Work
     travail(F, path, n)            ∫ F·dr along the path, n pieces (default 2000), midpoint rule: exact for a uniform field
                                    on straight pieces, error O(1/n²) otherwise.
     travailOppose(f, path, n)      work of a force of constant norm f always against the motion: −f × length (path-dependent).
     travailPoids(m, zA, zB, g)     m g (zA − zB), closed form, g default 9,81.
     travailGravitation(GM, m, rA, rB)  GMm (1/rB − 1/rA), closed form (13.12).
     ecartMgh(h)                    relative error of m g0 h against the exact work of the Earth's 1/r² weight from the ground to h,
                                    g0 = GM/RT² (Dyna): equals h/RT.
     integrale(t, y)                trapezoid ∫ y dt over samples (t increasing).
   Motion
     glissade(path, o)              a bead on a fixed wire in a vertical plane, from A at speed o.v0 (default 0) along the path, no friction.
                                    o = { m, g, k, h, tmax }: k ≥ 0 quadratic air drag per unit mass (m⁻¹), acceleration −k v|v|;
                                    h time step (default 1e-3 s); tmax (default 60 s). Leapfrog of integration.js on the arc length s.
                                    Returns { t, s, x, z, v, ec, pPoids, pAir, wPoids, wAir } (arrays, one per step, v signed along the
                                    path), longueur, arrivee (time at B, NaN if not reached), vB (speed at B, NaN if not reached).
                                    The reaction of the wire is normal to the velocity: it does no work and is not computed.
     kAir(d, m)                     k of a sphere of diameter d (m) and mass m (kg) in air at sea level: ρ C_x S/(2 m), C_x = 0,44
                                    (forces.js; valid for 10³ < Re < 2 × 10⁵).
   Conservative forces (I.14.3; forces-conservatives)
     gradient(U, r, h)              grad U at r by central differences (h default 10⁻⁶ max(1, |r|)); champGradient(U, h) → r ↦ −grad U.
     profil({ ep, d1?, d2?, domaine, m, echelle? })  a 1D energy profile Ep(x) for a point of mass m; d1, d2 numerical if absent.
     profils.doublePuits(E0, a, m, F), profils.pendule(m, L, g) (x = arc length), profils.lennardJones(eps, sig, mu) (x = distance,
                                    mu the reduced mass).
     equilibres(P, n)               zeros of Ep' on the domain → [{ x, ep, d2, nature: "stable" | "instable" | "marginal" }].
     omega0(P, x)                   √(Ep''(x)/m), NaN where Ep'' ≤ 0.
     rebroussements(P, E, x)        turning points [xl, xr] around x for the energy E (NaN on a side where the domain is left).
     oscillation(P, x0, o)          release at rest from x0, leapfrog: { t, x, v, em, periode, sortie, h }; o = { h, tmax, every }.
   Non-conservative forces (I.14.4; forces-non-conservatives)
     ressortFrottement(o)           spring k and dry friction μ, exact piecewise: { t, x, v, ec, ep, em, wf, arrets, colle, tArret,
                                    xArret, chaleur, d, omega }; o = { m, k, mu, x0, g, dt, duree }. em[i] − em[0] = wf[i] exactly.
   Potentials and fields (I.14.5; potentiels-et-champs)
     masses(list, o)                [{ m, r }] → { phi(r), champ(r), G }; o.G replaces G.
     ligneDeChamp(champ, depart, o) points of a field line; o = { pas, n, sens, boite, puits, rayon } (AnaVec.ligneDeChamp).
     isolignes(f, boite, n, niveau) segments of the curve f = niveau (marching squares on n × n cells, AnaVec.isolignes).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Dyna = node ? require("./dynamique.js") : root.Dyna;
  const Forces = node ? require("./forces.js") : root.Forces;
  const Integ = node ? require("./integration.js") : root.Integ;
  const AnaVec = node ? require("../analyse-vectorielle.js") : root.AnaVec;
  const G = Cst.g_CPGE;

  const err = m => { throw new Error("travail: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  function vec(v, name) {
    if (!Array.isArray(v) || v.length < 1 || v.length > 3) err((name || "vecteur") + " de 1 à 3 composantes");
    v.forEach((q, i) => finite(q, (name || "v") + "[" + i + "]"));
    return v;
  }
  function scalaire(a, b) { vec(a, "a"); vec(b, "b"); if (a.length !== b.length) err("vecteurs de dimensions différentes"); return a.reduce((s, q, i) => s + q * b[i], 0); }
  const puissance = (F, v) => scalaire(F, v);
  const norme = v => Math.sqrt(v.reduce((s, q) => s + q * q, 0));

  /* ---------- force fields ---------- */
  function poids(m, g, dim) {
    positive(m, "m"); g = g == null ? G : finite(g, "g"); dim = dim == null ? 2 : dim;
    if (dim !== 2 && dim !== 3) err("dim vaut 2 ou 3");
    const F = dim === 2 ? [0, -m * g] : [0, 0, -m * g];
    return () => F.slice();
  }
  function gravitation(GM, m) {
    positive(GM, "GM"); positive(m, "m");
    return r => { const d = norme(r); if (!(d > 0)) err("point au centre attracteur"); const k = -GM * m / (d * d * d); return r.map(q => k * q); };
  }
  const constante = F => { vec(F, "F"); return () => F.slice(); };

  /* ---------- paths ---------- */
  const lerp = (A, B, u) => A.map((q, i) => q + (B[i] - q) * u);
  function ends(A, B) { vec(A, "A"); vec(B, "B"); if (A.length !== B.length) err("A et B de dimensions différentes"); }
  const mk = (A, B, f) => { f.A = A.slice(); f.B = B.slice(); return f; };
  function polyligne(P) {
    if (!Array.isArray(P) || P.length < 2) err("au moins deux points");
    P.forEach((p, i) => vec(p, "point " + i)); if (P.some(p => p.length !== P[0].length)) err("points de dimensions différentes");
    const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + norme(P[i].map((q, j) => q - P[i - 1][j])));
    const tot = L[L.length - 1];
    return mk(P[0], P[P.length - 1], u => {
      if (!(tot > 0)) return P[0].slice();
      const s = Math.min(Math.max(u, 0), 1) * tot; let i = 1; while (i < L.length - 1 && L[i] < s) i++;
      const d = L[i] - L[i - 1]; return lerp(P[i - 1], P[i], d > 0 ? (s - L[i - 1]) / d : 0);
    });
  }
  const chemin = {
    droite(A, B) { ends(A, B); return mk(A, B, u => lerp(A, B, u)); },
    escalier(A, B, n, o) {
      ends(A, B); if (!Number.isInteger(n) || n < 1) err("n, le nombre de marches, entier ≥ 1");
      if (A.length !== 2) err("escalier dans le plan vertical : points [x, z]");
      const hv = (o || "hv") === "hv"; if (o && o !== "hv" && o !== "vh") err("ordre « hv » ou « vh »");
      const P = [A.slice()];
      for (let i = 1; i <= n; i++) {
        const x = A[0] + (B[0] - A[0]) * i / n, z = A[1] + (B[1] - A[1]) * i / n, last = P[P.length - 1];
        P.push(hv ? [x, last[1]] : [last[0], z]); P.push([x, z]);
      }
      return polyligne(P);
    },
    arc(A, B, f) {
      ends(A, B); finite(f, "f"); if (A.length !== 2) err("arc dans le plan vertical : points [x, z]");
      const dx = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dx, dz); if (!(L > 0)) err("A et B confondus");
      const n = [-dz / L, dx / L];
      return mk(A, B, u => { const b = f * Math.sin(Math.PI * u); return [A[0] + dx * u + b * n[0], A[1] + dz * u + b * n[1]]; });
    },
    boucle(A, B, R) {
      ends(A, B); positive(R, "R"); if (A.length !== 2) err("boucle dans le plan vertical : points [x, z]");
      const M = lerp(A, B, 0.5), half = norme([B[0] - A[0], B[1] - A[1]]) / 2, C = 2 * Math.PI * R, tot = 2 * half + C;
      const u1 = half / tot, u2 = (half + C) / tot;
      return mk(A, B, u => {
        if (u <= u1) return lerp(A, M, u / u1);
        if (u >= u2) return lerp(M, B, (u - u2) / (1 - u2));
        const th = 2 * Math.PI * (u - u1) / (u2 - u1);                      // from M, centre above M, counter-clockwise
        return [M[0] + R * Math.sin(th), M[1] + R * (1 - Math.cos(th))];
      });
    },
    cycloide(A, B) {
      ends(A, B); if (A.length !== 2) err("cycloïde dans le plan vertical : points [x, z]");
      const H = A[1] - B[1], X = B[0] - A[0];
      if (!(H > 0)) err("la cycloïde descend : B plus bas que A");
      if (Math.abs(X - Math.PI * H / 2) > 1e-9 * Math.max(1, X)) err("cycloïde : il faut xB − xA = π (zA − zB)/2");
      const a = H / 2;
      return mk(A, B, u => { const th = Math.PI * u; return [A[0] + a * (th - Math.sin(th)), A[1] - a * (1 - Math.cos(th))]; });
    },
    polyligne,
  };
  function pathOf(p) { if (typeof p !== "function" || !p.A) err("chemin attendu (chemin.*)"); return p; }
  function count(n) { n = n == null ? 2000 : n; if (!Number.isInteger(n) || n < 1) err("n, le nombre de morceaux, entier ≥ 1"); return n; }
  function points(path, n) { pathOf(path); n = count(n); const out = []; for (let i = 0; i <= n; i++) out.push(path(i / n)); return out; }
  function longueur(path, n) { const P = points(path, n); let L = 0; for (let i = 1; i < P.length; i++) L += norme(P[i].map((q, j) => q - P[i - 1][j])); return L; }

  /* ---------- work ---------- */
  function travail(F, path, n) {
    if (typeof F !== "function") err("F doit être un champ r → F");
    const P = points(path, n); let W = 0;
    for (let i = 1; i < P.length; i++) {
      const mid = P[i].map((q, j) => (q + P[i - 1][j]) / 2), dr = P[i].map((q, j) => q - P[i - 1][j]);
      W += scalaire(vec(F(mid), "F"), dr);
    }
    return W;
  }
  const travailOppose = (f, path, n) => { finite(f, "f"); if (f < 0) err("f, une norme, ≥ 0"); return -f * longueur(path, n); };
  const travailPoids = (m, zA, zB, g) => { positive(m, "m"); finite(zA, "zA"); finite(zB, "zB"); return m * (g == null ? G : finite(g, "g")) * (zA - zB); };
  const travailGravitation = (GM, m, rA, rB) => { positive(GM, "GM"); positive(m, "m"); positive(rA, "rA"); positive(rB, "rB"); return GM * m * (1 / rB - 1 / rA); };
  function ecartMgh(h) {
    finite(h, "h"); if (!(h > 0)) err("h doit être strictement positif");
    const exact = travailGravitation(Dyna.GM, 1, Dyna.RT + h, Dyna.RT), approx = Dyna.GM / (Dyna.RT * Dyna.RT) * h;
    return approx / exact - 1;
  }
  function integrale(t, y) {
    if (!Array.isArray(t) || !Array.isArray(y) || t.length !== y.length) err("t et y de même longueur");
    let s = 0; for (let i = 1; i < t.length; i++) s += (t[i] - t[i - 1]) * (y[i] + y[i - 1]) / 2; return s;
  }

  /* ---------- a bead on a wire ---------- */
  const kAir = (d, m) => { positive(d, "d"); positive(m, "m"); return Forces.FLUIDS.air.rho * Forces.CX_SPHERE * Math.PI * d * d / 4 / (2 * m); };
  function glissade(path, o) {
    pathOf(path); o = o || {};
    if (path.A.length !== 2) err("glissade dans le plan vertical : chemin de points [x, z]");
    const m = positive(o.m, "m"), g = o.g == null ? G : positive(o.g, "g"), k = o.k == null ? 0 : finite(o.k, "k");
    const h = o.h == null ? 1e-3 : positive(o.h, "h"), tmax = o.tmax == null ? 60 : positive(o.tmax, "tmax"), v0 = o.v0 == null ? 0 : finite(o.v0, "v0");
    if (k < 0) err("k ≥ 0");
    /* the wire as a table: arc length S[i] at points P[i]; the slope dz/ds is constant on each piece */
    const N = 4000, P = points(path, N), S = [0];
    for (let i = 1; i <= N; i++) S.push(S[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const Ltot = S[N];
    if (!(Ltot > 0)) err("chemin de longueur nulle");
    const piece = s => { let lo = 0, hi = N; while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (S[mid] <= s) lo = mid; else hi = mid; } return lo; };
    const slope = s => { const i = piece(Math.min(Math.max(s, 0), Ltot)), ds = S[i + 1] - S[i]; return ds > 0 ? (P[i + 1][1] - P[i][1]) / ds : 0; };
    const at = s => { const c = Math.min(Math.max(s, 0), Ltot), i = piece(c), ds = S[i + 1] - S[i], u = ds > 0 ? (c - S[i]) / ds : 0; return lerp(P[i], P[i + 1], u); };
    const a = (t, x, v) => [-g * slope(x[0]) - k * v[0] * Math.abs(v[0])];
    const out = { t: [], s: [], x: [], z: [], v: [], ec: [], pPoids: [], pAir: [], wPoids: [], wAir: [], longueur: Ltot, arrivee: NaN, vB: NaN };
    const push = (t, s, v) => {
      const r = at(s), pP = -m * g * slope(s) * v, pA = -m * k * Math.abs(v) * v * v, n = out.t.length;
      out.t.push(t); out.s.push(s); out.x.push(r[0]); out.z.push(r[1]); out.v.push(v); out.ec.push(m * v * v / 2);
      out.pPoids.push(pP); out.pAir.push(pA);
      out.wPoids.push(n ? out.wPoids[n - 1] + (t - out.t[n - 1]) * (pP + out.pPoids[n - 1]) / 2 : 0);
      out.wAir.push(n ? out.wAir[n - 1] + (t - out.t[n - 1]) * (pA + out.pAir[n - 1]) / 2 : 0);
    };
    let st = { t: 0, x: [0], v: [v0] }; push(0, 0, v0);
    while (st.t < tmax) {
      const nx = Integ.step("leapfrog", a, st, h, { vdep: k > 0 });
      if (nx.x[0] >= Ltot) {                                           // reaches B during this step: cut the step there
        const f = (Ltot - st.x[0]) / (nx.x[0] - st.x[0]), t = st.t + f * h, v = st.v[0] + f * (nx.v[0] - st.v[0]);
        push(t, Ltot, v); out.arrivee = t; out.vB = Math.abs(v); break;
      }
      if (nx.x[0] < 0) { push(nx.t, 0, nx.v[0]); break; }              // back past A: the bead leaves the wire's start
      st = nx; push(st.t, st.x[0], st.v[0]);
    }
    return out;
  }

  /* ---------- conservative forces: gradient, profiles, equilibria (I.14.3) ---------- */
  function gradient(U, r, h) {
    if (typeof U !== "function") err("U doit être une fonction r → nombre"); vec(r, "r");
    h = h == null ? 1e-6 * Math.max(1, norme(r)) : positive(h, "h");
    return r.map((_, i) => { const p = r.slice(), q = r.slice(); p[i] += h; q[i] -= h; return (U(p) - U(q)) / (2 * h); });
  }
  const champGradient = (U, h) => r => gradient(U, r, h).map(c => -c);
  function profil(o) {
    o = o || {};
    if (typeof o.ep !== "function") err("profil : ep(x) attendu");
    const m = positive(o.m, "m"), D = o.domaine;
    if (!Array.isArray(D) || D.length !== 2 || !(finite(D[0], "domaine") < finite(D[1], "domaine"))) err("profil : domaine [a, b] avec a < b");
    const s = o.echelle == null ? D[1] - D[0] : positive(o.echelle, "echelle"), h1 = 1e-5 * s, h2 = 1e-3 * s;
    const d1 = o.d1 || (x => (o.ep(x + h1) - o.ep(x - h1)) / (2 * h1));
    const d2 = o.d2 || (x => (o.ep(x + h2) - 2 * o.ep(x) + o.ep(x - h2)) / (h2 * h2));
    return { ep: o.ep, d1, d2, m, domaine: D.slice(), echelle: s };
  }
  const profils = {
    /* E0 ((x/a)² − 1)² + F x: two wells at ±a (F = 0) separated by a barrier E0; F tilts the profile (a uniform force −F) */
    doublePuits(E0, a, m, F) {
      positive(E0, "E0"); positive(a, "a"); F = F == null ? 0 : finite(F, "F");
      const a4 = a ** 4;
      return profil({ m, domaine: [-2 * a, 2 * a], echelle: a, ep: x => E0 * ((x / a) ** 2 - 1) ** 2 + F * x,
        d1: x => 4 * E0 * x * (x * x - a * a) / a4 + F, d2: x => E0 * (12 * x * x - 4 * a * a) / a4 });
    },
    /* simple pendulum, s = L θ the arc length: Ep = m g L (1 − cos θ); the domain goes a little past the top, θ = ±π */
    pendule(m, L, g) {
      positive(L, "L"); g = g == null ? G : positive(g, "g"); positive(m, "m");
      return profil({ m, domaine: [-1.05 * Math.PI * L, 1.05 * Math.PI * L], echelle: L, ep: s => m * g * L * (1 - Math.cos(s / L)),
        d1: s => m * g * Math.sin(s / L), d2: s => m * g / L * Math.cos(s / L) });
    },
    /* two atoms, Lennard-Jones (forces.js), x = their distance r; the relative motion is that of the reduced mass mu */
    lennardJones(eps, sig, mu) {
      positive(eps, "eps"); positive(sig, "sig"); positive(mu, "mu");
      return profil({ m: mu, domaine: [0.85 * sig, 4 * sig], echelle: sig, ep: r => Forces.ljU(r, eps, sig), d1: r => -Forces.ljF(r, eps, sig),
        d2: r => { const s6 = (sig / r) ** 6; return 4 * eps * (156 * s6 * s6 - 42 * s6) / (r * r); } });
    },
  };
  function profilOf(P) { if (!P || typeof P.ep !== "function" || typeof P.d1 !== "function" || !P.domaine) err("profil attendu (profil, profils.*)"); return P; }
  function equilibres(P, n) {
    profilOf(P); n = n == null ? 4000 : n; if (!Number.isInteger(n) || n < 2) err("n entier ≥ 2");
    const [a, b] = P.domaine, xs = [], out = [];
    for (let i = 0; i <= n; i++) xs.push(a + (b - a) * i / n);
    const f = xs.map(P.d1), big = Math.max(...xs.map(x => Math.abs(P.d2(x))));
    for (let i = 0; i < n; i++) {
      let lo = xs[i], hi = xs[i + 1], flo = f[i], fhi = f[i + 1], x;
      if (flo === 0) x = lo; else if (fhi === 0 || flo * fhi > 0) continue;
      else { for (let k = 0; k < 200 && hi - lo > 1e-15 * P.echelle; k++) { const mid = (lo + hi) / 2, fm = P.d1(mid); if (fm === 0) { lo = hi = mid; break; } if (fm * flo > 0) { lo = mid; flo = fm; } else hi = mid; } x = (lo + hi) / 2; }
      if (out.length && Math.abs(out[out.length - 1].x - x) < 1e-9 * P.echelle) continue;
      const k = P.d2(x);
      out.push({ x, ep: P.ep(x), d2: k, nature: Math.abs(k) <= 1e-9 * big ? "marginal" : k > 0 ? "stable" : "instable" });
    }
    return out;
  }
  const omega0 = (P, x) => { profilOf(P); finite(x, "x"); const k = P.d2(x); return k > 0 ? Math.sqrt(k / P.m) : NaN; };
  function rebroussements(P, E, x) {
    profilOf(P); finite(E, "E"); finite(x, "x");
    if (P.ep(x) > E) err("le point de départ doit être accessible : Ep(x) ≤ E");
    const [a, b] = P.domaine, step = (b - a) / 4000;
    const side = dir => {
      let p = x, q = x + dir * step;
      while (q > a && q < b && P.ep(q) <= E) { p = q; q += dir * step; }
      if (!(q > a && q < b)) return NaN;
      for (let k = 0; k < 100; k++) { const m = (p + q) / 2; if (P.ep(m) <= E) p = m; else q = m; }
      return (p + q) / 2;
    };
    return [side(-1), side(1)];
  }
  /* released at rest from x0: leapfrog of integration.js on m ẍ = −Ep'(x). The period is the time of the second turning
     point after the start (each leg between turning points takes half a period). o = { h, tmax, every } */
  function oscillation(P, x0, o) {
    profilOf(P); finite(x0, "x0"); o = o || {};
    const [a, b] = P.domaine;
    if (!(x0 > a && x0 < b)) err("x0 hors du domaine du profil");
    let h = o.h;
    if (h == null) { const w = Math.max(...equilibres(P, 400).map(e => omega0(P, e.x)).filter(isFinite), 0); if (!(w > 0)) err("aucun équilibre stable : donner o.h"); h = 2 * Math.PI / w / 2000; }
    positive(h, "h");
    const tmax = o.tmax == null ? 4000 * 50 * h : positive(o.tmax, "tmax"), every = o.every == null ? 1 : o.every;
    const acc = (t, x) => [-P.d1(x[0]) / P.m];
    const out = { t: [0], x: [x0], v: [0], em: [P.ep(x0)], periode: NaN, sortie: false, h };
    let s = { t: 0, x: [x0], v: [0] }, turns = 0, i = 0;
    while (s.t < tmax) {
      const nx = Integ.step("leapfrog", acc, s, h);
      i++;
      if (!(nx.x[0] > a && nx.x[0] < b)) { out.sortie = true; break; }
      if (i > 1 && s.v[0] !== 0 && (nx.v[0] === 0 || s.v[0] * nx.v[0] < 0)) {
        turns++;
        if (turns === 2) { out.periode = s.t + h * s.v[0] / (s.v[0] - nx.v[0]); s = nx; break; }
      }
      s = nx;
      if (i % every === 0) { out.t.push(s.t); out.x.push(s.x[0]); out.v.push(s.v[0]); out.em.push(P.m * s.v[0] * s.v[0] / 2 + P.ep(s.x[0])); }
    }
    return out;
  }

  /* ---------- non-conservative forces: a spring and Coulomb's dry friction (I.14.4) ----------
     m ẍ = −k x − μ m g sign(ẋ), released at rest at x0, static coefficient taken equal to μ. Exact, piece by piece: on each
     half-swing the motion is harmonic around c = −sign(ẋ) μ m g/k, so the amplitude drops by 2 μ m g/k; the block sticks
     as soon as |x| ≤ μ m g/k at a stop. o = { m, k, mu, x0, g, dt, duree } (duree default 30 s, dt default T/200). */
  function ressortFrottement(o) {
    o = o || {};
    const m = positive(o.m, "m"), k = positive(o.k, "k"), mu = o.mu == null ? 0 : finite(o.mu, "mu"), x0 = finite(o.x0, "x0");
    const g = o.g == null ? G : positive(o.g, "g"), w = Math.sqrt(k / m), dt = o.dt == null ? 2 * Math.PI / w / 200 : positive(o.dt, "dt");
    const duree = o.duree == null ? 30 : positive(o.duree, "duree");
    if (mu < 0) err("mu ≥ 0");
    const d = mu * m * g / k, out = { t: [], x: [], v: [], ec: [], ep: [], em: [], wf: [], arrets: [{ t: 0, x: x0 }], d, omega: w, colle: false };
    let t0 = 0, x = x0, wf = 0;
    const push = (t, X, V, W) => { out.t.push(t); out.x.push(X); out.v.push(V); out.ec.push(m * V * V / 2); out.ep.push(k * X * X / 2); out.em.push(m * V * V / 2 + k * X * X / 2); out.wf.push(W); };
    push(0, x, 0, 0);
    while (t0 < duree) {
      if (Math.abs(x) <= d || x === 0) { out.colle = true; break; }
      const s = -Math.sign(x), c = -s * d, A = x - c, half = Math.PI / w;
      for (let tau = dt; tau < half && t0 + tau < duree; tau += dt) {
        const X = c + A * Math.cos(w * tau);
        push(t0 + tau, X, -A * w * Math.sin(w * tau), wf - mu * m * g * Math.abs(X - x));
      }
      if (t0 + half > duree) break;
      const x1 = 2 * c - x; wf -= mu * m * g * Math.abs(x1 - x); t0 += half; x = x1;
      push(t0, x, 0, wf); out.arrets.push({ t: t0, x });
    }
    out.tArret = out.colle ? t0 : NaN; out.xArret = out.colle ? x : NaN; out.chaleur = 0 - wf;
    return out;
  }

  /* ---------- potentials and fields (I.14.5) ---------- */
  /* point masses [{ m, r }]: φ(r) = −Σ G mᵢ/|r − rᵢ| (J·kg⁻¹), field g = −grad φ (m·s⁻²). o.G replaces G (G = 1: reduced units). */
  function masses(list, o) {
    if (!Array.isArray(list) || !list.length) err("au moins une masse");
    const Gc = o && o.G != null ? positive(o.G, "G") : Cst.G;
    list.forEach((q, i) => { positive(q.m, "m[" + i + "]"); vec(q.r, "r[" + i + "]"); if (q.r.length !== list[0].r.length) err("positions de dimensions différentes"); });
    const dist = (r, q) => { vec(r, "r"); if (r.length !== q.r.length) err("point et masses de dimensions différentes"); const d = norme(r.map((c, i) => c - q.r[i])); if (!(d > 0)) err("point sur une masse"); return d; };
    return {
      G: Gc,
      phi: r => list.reduce((s, q) => s - Gc * q.m / dist(r, q), 0),
      champ: r => list.reduce((F, q) => { const d = dist(r, q), k = -Gc * q.m / (d * d * d); return F.map((c, i) => c + k * (r[i] - q.r[i])); }, r.map(() => 0)),
    };
  }
  /* a field line in the plane: steps of o.pas along ±the unit field (o.sens = −1 goes against the field, away from attracting
     masses); stops after o.n steps, out of o.boite [x0, x1, y0, y1], or within o.rayon of a point of o.puits */
  function ligneDeChamp(champ, depart, o) {
    if (typeof champ !== "function") err("champ r → vecteur attendu"); vec(depart, "depart"); o = o || {};
    const pas = positive(o.pas == null ? 0.01 : o.pas, "pas"), n = o.n == null ? 2000 : o.n, sens = o.sens == null ? 1 : o.sens;
    const B = o.boite, P = o.puits || [], R = o.rayon == null ? 2 * pas : o.rayon;
    const arret = q => (B && (q[0] < B[0] || q[0] > B[1] || q[1] < B[2] || q[1] > B[3])) || P.some(s => norme(q.map((c, j) => c - s[j])) < R);
    return AnaVec.ligneDeChamp(champ, depart, pas, n, sens, arret);
  }
  /* the curve f = niveau on a grid of n × n cells over boite [x0, x1, y0, y1]: segments [[x, y], [x, y]].
     Where f throws or is not finite (on a mass, on a wire) the grid takes a value far below every level. */
  function isolignes(f, boite, n, niveau) {
    if (typeof f !== "function") err("f(r) attendue"); finite(niveau, "niveau");
    if (!Array.isArray(boite) || boite.length !== 4) err("boite [x0, x1, y0, y1]");
    if (!Number.isInteger(n) || n < 2) err("n entier ≥ 2");
    const g = r => { let v; try { v = f(r); } catch (e) { v = NaN; } return isFinite(v) ? v : niveau - 1e300; };
    return AnaVec.isolignes(g, boite[0], boite[1], n + 1, boite[2], boite[3], n + 1, niveau);
  }

  const api = { G, scalaire, puissance, poids, gravitation, constante, chemin, points, longueur, travail, travailOppose, travailPoids,
    travailGravitation, ecartMgh, integrale, kAir, glissade,
    gradient, champGradient, profil, profils, equilibres, omega0, rebroussements, oscillation, ressortFrottement, masses, ligneDeChamp, isolignes };
  if (node) module.exports = api;
  else root.Travail = api;
})(typeof self !== "undefined" ? self : this);

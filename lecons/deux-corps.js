/* Deux corps et collisions — calculs des leçons X.diffusion_rutherford.1 à 4 (problème à deux corps, états liés et de
   diffusion, section efficace, expérience de Rutherford). Pur, sans DOM, UMD (global DeuxCorps). SI partout.
   Rien n'est recopié : l'intégrateur vient d'Integ, Jupiter de Kepler, la troisième loi exacte de
   FC.deuxCorps, les constantes de constantes.js.

   Problème à deux corps (leçon 1)
     reduite(m1, m2)                 μ = m1 m2/(m1 + m2).
     separer(m1, m2, s1, s2)         états { x, v } des deux corps → { M, mu, G, vG, r = x2 − x1, v = v2 − v1,
                                     ecG = ½ M vG², ecRel = ½ μ v², ec = somme des deux énergies cinétiques }.
     recomposer(m1, m2, G, r)        [x1, x2] = [G − (m2/M) r, G + (m1/M) r].
     simuler(m1, m2, s1, s2, k, h, n) les deux corps intégrés ensemble (saute-mouton, 4 coordonnées), attraction k/r² ;
                                     { t, x1, x2, G, r, derive } ; derive = écart maximal de G au mouvement rectiligne
                                     uniforme, rapporté à la plus grande distance entre les corps.
     relatif(m1, m2, s1, s2, k, h, n) la particule fictive de masse μ, centre fixe, même force : { t, r }.
     periodeRelative(q)              q = m/M : période du couple / période autour de M immobile = 1/√(1 + q).
     barycentre(M, m, a)             distance de M au centre de masse : a m/(M + m).
     jupiterSoleil()                 { d, surRayon = d/R☉, vSoleil, vJupiter } : orbites circulaires de rayon a (Kepler).
     decalageIsotopique(l, mA, mB)   λ_A − λ_B pour une raie de longueur d'onde l émise avec un noyau de masse mA :
                                     λ ∝ 1/μ, μ = mₑ m/(mₑ + m).
   États liés et états de diffusion (leçon 2), en unités réduites : énergies en |E|, longueurs en d = |k|/|E|
     etats(sigma, s, ell)            sigma = +1 attraction (Ep = −|k|/r), −1 répulsion ; s = signe de E ; ell = L/√(2μ|E|).
                                     Ep,eff/|E| = −sigma/x + ell²/x², x = r/d. { eff, niveau = s, etat, tournants, p, e,
                                     deviation (diffusion : tan(θ/2) = 1/(2 ell)) } ; etat : "lie", "circulaire",
                                     "diffusion", "impossible".
     trajectoire(sigma, s, ell, rmax, n)  points [x, y] de la conique (unité d), foyer à l'origine, péricentre sur +x,
                                     parcourue dans le sens trigonométrique, coupée à r ≤ rmax pour une diffusion.
     coulomb(Z1, Z2)                 k = Z1 Z2 e²/(4π ε0), J·m.
     MeV                             1 MeV en joules.
   Collisions et section efficace (leçon 3)
     sphereDure(b, R)                déviation d'un point sur une sphère dure fixe de rayon R : 2 arccos(b/R), 0 si b ≥ R.
     alea(graine)                    générateur pseudo-aléatoire reproductible dans [0, 1[ (mulberry32).
     tirer(N, bmax, graine)          N paramètres d'impact répartis uniformément sur le disque de rayon bmax.
     histogramme(v, bornes)          effectifs de v dans les classes [bornes[i], bornes[i+1][.
     isotrope(N, R, bmax, t1, t2)    effectif attendu entre t1 et t2 pour les sphères dures : N (R/bmax)² (cos t1 − cos t2)/2.
     transmission(n, sigma, x)       exp(−n σ x) ; libreParcours(n, sigma) = 1/(n σ).
     densite(rho, A)                 nombre d'atomes par m³ : rho N_A/(A × 10⁻³ kg·mol⁻¹).
     angleLabo(tc, m, M)             angle de déviation dans le laboratoire (cible M au repos) pour l'angle tc dans le
                                     référentiel du centre de masse : tan θ = sin tc/(cos tc + m/M).
     angleMax(m, M)                  déviation maximale dans le laboratoire d'un projectile m > M : arcsin(M/m) ; π sinon.
     facteurK(m, M, theta)           énergie après un choc élastique / énergie avant, projectile m dévié de theta (labo).
     ecm(E, m, M)                    énergie cinétique du mouvement relatif : E M/(m + M).
   Expérience de Rutherford (leçon 4)
     impact(theta, d)                b = (d/2) cot(θ/2), d = k/E distance d'arrêt d'un choc frontal.
     deviation(b, d)                 θ = 2 arctan(d/(2b)).
     approche(b, d)                  plus courte distance : (d + √(d² + 4b²))/2.
     differentielle(theta, d)        dσ/dΩ = (d/4)²/sin⁴(θ/2).
     auDela(theta, d)                section efficace des déviations supérieures à θ : π b(θ)².
     rutherford(N, bmax, d, graine)  N déviations tirées : { theta, bornes, compte (par classe), attendu (même classe) }.
     GM1913                          Geiger et Marsden (1913), tableau II, or : [angle en degrés, nombre de scintillations].
     masseAlpha                      CODATA 2022, kg.
   Les erreurs lèvent un message en français : elles signalent un appel faux, jamais un mouvement inhabituel. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Kepler = node ? require("./kepler.js") : root.Kepler;
  const FC = node ? require("./forces-centrales.js") : root.FC;
  const err = m => { throw new Error("deux-corps: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const vec = (u, name) => { if (!Array.isArray(u) || u.length !== 2) err(name + " doit être un vecteur [x, y]"); u.forEach(c => finite(c, name)); return u; };
  const etat = (s, name) => { if (!s) err(name + " : état { x, v } attendu"); vec(s.x, name + ".x"); vec(s.v, name + ".v"); return s; };
  const comb = (a, p, b, q) => [a * p[0] + b * q[0], a * p[1] + b * q[1]];
  const norm = p => Math.hypot(p[0], p[1]);
  const masseAlpha = 6.6446573450e-27;           // kg, CODATA 2022
  const MeV = 1e6 * Cst.e;

  /* ---------- problème à deux corps ---------- */
  const reduite = (m1, m2) => { positive(m1, "m1"); positive(m2, "m2"); return m1 * m2 / (m1 + m2); };
  function separer(m1, m2, s1, s2) {
    const mu = reduite(m1, m2), M = m1 + m2; etat(s1, "s1"); etat(s2, "s2");
    const G = comb(m1 / M, s1.x, m2 / M, s2.x), vG = comb(m1 / M, s1.v, m2 / M, s2.v);
    const r = comb(1, s2.x, -1, s1.x), v = comb(1, s2.v, -1, s1.v), sq = p => p[0] * p[0] + p[1] * p[1];
    return { M, mu, G, vG, r, v, ecG: M * sq(vG) / 2, ecRel: mu * sq(v) / 2, ec: (m1 * sq(s1.v) + m2 * sq(s2.v)) / 2 };
  }
  function recomposer(m1, m2, G, r) {
    positive(m1, "m1"); positive(m2, "m2"); vec(G, "G"); vec(r, "r");
    const M = m1 + m2; return [comb(1, G, -m2 / M, r), comb(1, G, m1 / M, r)];
  }
  function simuler(m1, m2, s1, s2, k, h, n) {
    positive(m1, "m1"); positive(m2, "m2"); etat(s1, "s1"); etat(s2, "s2"); positive(k, "k");
    const a = (t, x) => {
      const dx = x[2] - x[0], dy = x[3] - x[1], r = Math.hypot(dx, dy);
      if (r === 0) err("les deux corps se touchent (r = 0)");
      const f = k / (r * r * r);                  // force sur 1 : +f (x2 − x1) ; sur 2 : l'opposée
      return [f * dx / m1, f * dy / m1, -f * dx / m2, -f * dy / m2];
    };
    const run = Integ.run("leapfrog", a, { t: 0, x: s1.x.concat(s2.x), v: s1.v.concat(s2.v) }, h, n);
    const M = m1 + m2, x1 = run.x.map(q => [q[0], q[1]]), x2 = run.x.map(q => [q[2], q[3]]);
    const G = x1.map((p, i) => comb(m1 / M, p, m2 / M, x2[i])), r = x1.map((p, i) => comb(1, x2[i], -1, p));
    const S = separer(m1, m2, s1, s2), rmax = Math.max(...r.map(norm));
    const derive = Math.max(...G.map((g, i) => norm(comb(1, g, -1, comb(1, S.G, run.t[i], S.vG))))) / rmax;
    return { t: run.t, x1, x2, G, r, derive };
  }
  function relatif(m1, m2, s1, s2, k, h, n) {
    const S = separer(m1, m2, s1, s2); positive(k, "k");
    const run = Integ.run("leapfrog", Integ.kepler(k / S.mu).a, { t: 0, x: S.r, v: S.v }, h, n);
    return { t: run.t, r: run.x };
  }
  const periodeRelative = q => { finite(q, "q"); if (!(q >= 0)) err("q ≥ 0"); return 1 / Math.sqrt(FC.deuxCorps(q).kepler3); };
  function barycentre(M, m, a) { positive(M, "M"); finite(m, "m"); if (!(m >= 0)) err("m ≥ 0"); positive(a, "a"); return a * m / (M + m); }
  function jupiterSoleil() {
    const J = Kepler.PLANETES.jupiter, a = J.j2000.a * Cst.au, q = J.masse, T = Kepler.periode("jupiter");
    const d = barycentre(1, q, a), vRel = 2 * Math.PI * a / T;
    return { a, q, d, surRayon: d / Cst.R_sun, vSoleil: vRel * q / (1 + q), vJupiter: vRel / (1 + q) };
  }
  function decalageIsotopique(l, mA, mB) {
    positive(l, "λ"); const me = Cst.m_e, muA = reduite(me, mA), muB = reduite(me, mB);
    return l * (1 - muA / muB);
  }

  /* ---------- états liés et états de diffusion (unités réduites) ---------- */
  function etats(sigma, s, ell) {
    if (sigma !== 1 && sigma !== -1) err("sigma vaut +1 (attraction) ou −1 (répulsion)");
    if (s !== 1 && s !== -1) err("s, le signe de l'énergie, vaut +1 ou −1");
    finite(ell, "ell"); if (!(ell >= 0)) err("ell ≥ 0");
    const eff = x => -sigma / x + ell * ell / (x * x);
    const e2 = 1 + 4 * s * ell * ell, e = Math.sqrt(Math.max(0, e2)), p = 2 * ell * ell;
    let et, tp = [];
    if (s === 1) { et = "diffusion"; tp = [(-sigma + Math.sqrt(1 + 4 * ell * ell)) / 2]; }
    else if (sigma === -1) et = "impossible";
    else if (e2 < -1e-12) et = "impossible";
    else if (Math.abs(e2) <= 1e-12) { et = "circulaire"; tp = [0.5, 0.5]; }
    else { const q = Math.sqrt(e2); et = "lie"; tp = [(1 - q) / 2, (1 + q) / 2]; }
    const deviation = et === "diffusion" ? 2 * Math.atan2(1, 2 * ell) : NaN;
    return { eff, niveau: s, etat: et, tournants: tp, p, e, deviation, sigma, ell };
  }
  function trajectoire(sigma, s, ell, rmax, n) {
    const o = etats(sigma, s, ell); n = n || 400; rmax = rmax == null ? 20 : positive(rmax, "rmax");
    if (o.etat === "impossible") return [];
    if (o.etat === "circulaire") return Array.from({ length: n + 1 }, (_, i) => { const a = 2 * Math.PI * i / n; return [0.5 * Math.cos(a), 0.5 * Math.sin(a)]; });
    if (o.ell === 0) {                          // choc frontal : aller-retour sur l'axe (dessiné de rmax au tournant)
      const r0 = o.tournants[o.tournants.length - 1], r1 = s === 1 ? rmax : o.tournants[0];
      return Array.from({ length: n + 1 }, (_, i) => [r1 + (r0 - r1) * i / n, 0]);
    }
    const r = sigma === 1 ? (f => o.p / (1 + o.e * Math.cos(f))) : (f => o.p / (o.e * Math.cos(f) - 1));
    let lim = Math.PI;
    if (s === 1) {
      const fInf = sigma === 1 ? Math.acos(-1 / o.e) : Math.acos(1 / o.e);
      /* r(f) = rmax : attraction cos f = (p/rmax − 1)/e ; répulsion cos f = (p/rmax + 1)/e */
      const c = sigma === 1 ? (o.p / rmax - 1) / o.e : (o.p / rmax + 1) / o.e;
      lim = c >= 1 ? 0 : Math.min(fInf * (1 - 1e-9), Math.acos(Math.max(-1, c)));
    }
    return Array.from({ length: n + 1 }, (_, i) => { const f = -lim + 2 * lim * i / n, q = r(f); return [q * Math.cos(f), q * Math.sin(f)]; });
  }
  const coulomb = (Z1, Z2) => { positive(Z1, "Z1"); positive(Z2, "Z2"); return Z1 * Z2 * Cst.e * Cst.e / (4 * Math.PI * Cst.eps0); };

  /* ---------- collisions et section efficace ---------- */
  function sphereDure(b, R) { finite(b, "b"); positive(R, "R"); b = Math.abs(b); return b >= R ? 0 : 2 * Math.acos(b / R); }
  function alea(graine) {
    let a = (graine >>> 0) || 1;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function tirer(N, bmax, graine) {
    if (!Number.isInteger(N) || N < 0) err("N entier ≥ 0"); positive(bmax, "bmax");
    const u = alea(graine == null ? 1 : graine); return Array.from({ length: N }, () => bmax * Math.sqrt(u()));
  }
  function histogramme(v, bornes) {
    if (!Array.isArray(bornes) || bornes.length < 2) err("au moins deux bornes");
    const c = new Array(bornes.length - 1).fill(0);
    for (const x of v) { for (let i = 0; i < c.length; i++) if (x >= bornes[i] && x < bornes[i + 1]) { c[i]++; break; } }
    return c;
  }
  function isotrope(N, R, bmax, t1, t2) {
    positive(R, "R"); positive(bmax, "bmax"); if (R > bmax) err("R ≤ bmax");
    return N * (R / bmax) ** 2 * (Math.cos(t1) - Math.cos(t2)) / 2;
  }
  const transmission = (n, sigma, x) => { positive(n, "n"); positive(sigma, "σ"); finite(x, "x"); return Math.exp(-n * sigma * x); };
  const libreParcours = (n, sigma) => 1 / (positive(n, "n") * positive(sigma, "σ"));
  const densite = (rho, A) => positive(rho, "ρ") * Cst.N_A / (positive(A, "A") * 1e-3);
  function angleLabo(tc, m, M) { finite(tc, "θ"); positive(m, "m"); positive(M, "M"); return Math.atan2(Math.sin(tc), Math.cos(tc) + m / M); }
  const angleMax = (m, M) => { positive(m, "m"); positive(M, "M"); return m > M ? Math.asin(M / m) : Math.PI; };
  function facteurK(m, M, theta) {
    positive(m, "m"); positive(M, "M"); finite(theta, "θ");
    const s = Math.sin(theta), d = M * M - m * m * s * s;
    if (d < 0) err("déviation impossible pour ce rapport de masses");
    return ((m * Math.cos(theta) + Math.sqrt(d)) / (m + M)) ** 2;
  }
  const ecm = (E, m, M) => { finite(E, "E"); positive(m, "m"); positive(M, "M"); return E * M / (m + M); };

  /* ---------- expérience de Rutherford ---------- */
  const impact = (theta, d) => { positive(d, "d"); finite(theta, "θ"); return d / (2 * Math.tan(theta / 2)); };
  const deviation = (b, d) => { positive(d, "d"); finite(b, "b"); return 2 * Math.atan2(d, 2 * Math.abs(b)); };
  const approche = (b, d) => { positive(d, "d"); finite(b, "b"); return (d + Math.sqrt(d * d + 4 * b * b)) / 2; };
  const differentielle = (theta, d) => { positive(d, "d"); return (d / 4) ** 2 / Math.sin(theta / 2) ** 4; };
  const auDela = (theta, d) => Math.PI * impact(theta, d) ** 2;
  function rutherford(N, bmax, d, graine, bornes) {
    positive(d, "d");
    const theta = tirer(N, bmax, graine).map(b => deviation(b, d));
    bornes = bornes || [5, 10, 15, 22.5, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map(x => x * Math.PI / 180);
    const compte = histogramme(theta, bornes);
    /* attendu : N/(π bmax²) × [π b(t1)² − π b(t2)²], sans les déviations sous l'angle minimal du disque tiré */
    const tmin = deviation(bmax, d), S = Math.PI * bmax * bmax;
    const au = t => t <= tmin ? S : auDela(t, d);
    const attendu = compte.map((_, i) => N * (au(bornes[i]) - au(bornes[i + 1])) / S);
    return { theta, bornes, compte, attendu, tmin };
  }
  const GM1913 = Object.freeze([[150, 33.1], [135, 43.0], [120, 51.9], [105, 69.5], [75, 211], [60, 477], [45, 1435],
    [37.5, 3300], [30, 7800], [22.5, 27300], [15, 132000]].map(Object.freeze));

  const api = Object.freeze({ reduite, separer, recomposer, simuler, relatif, periodeRelative, barycentre, jupiterSoleil,
    decalageIsotopique, etats, trajectoire, coulomb, MeV, sphereDure, alea, tirer, histogramme, isotrope, transmission,
    libreParcours, densite, angleLabo, angleMax, facteurK, ecm, impact, deviation, approche, differentielle, auDela,
    rutherford, GM1913, masseAlpha });
  if (node) module.exports = api; else root.DeuxCorps = api;
})(typeof self !== "undefined" ? self : this);

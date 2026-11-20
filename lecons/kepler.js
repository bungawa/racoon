/* Kepler — the planets as they are seen, as Kepler described them, as Newton explained them (Feynman I.7.1–7.4).
   Pure, no DOM, UMD (global Kepler). Reads Constantes (au, GM_sun, GM_E, R_E_mean, g0, R_sun) and Integ (kepler(GM), run,
   perturbation): no physical constant is written here.

   Data, each from a cited source (numbers copied digit for digit):
   - PLANETES: Standish & Williams, « Keplerian elements for approximate positions of the major planets », table 1, as published
     by the Solar System Dynamics group of the Jet Propulsion Laboratory. Mean ecliptic and equinox J2000, fitted on 1800–2050:
     a [ua], e, I [°], L mean longitude [°], ϖ longitude of perihelion [°], Ω longitude of the node [°], then their rates per
     Julian century. « terre » is the Earth–Moon barycentre. Nominal error on the heliocentric longitude: 15″ (Mercury) to
     600″ (Saturn); 20″ for the Earth, 40″ for Mars.
   - masse: Sun/planet mass ratio, IAU 2009 system of astronomical constants (Earth: Earth + Moon).
   - LUNE: NASA lunar fact sheet, semi-major axis 0,3844 × 10⁶ km and sidereal period 27,3217 days; Earth/Moon mass ratio
     81,300 56 (IAU 2009).
   Times are Julian dates (days); TT − UTC (about 69 s) is ignored, far below the error of the elements.

   API
     PLANETES, LUNE, IDS                      the data above; IDS in order from the Sun
     jd(ms) / ms(jd)                          Unix time in ms ↔ Julian date
     anomalie(M, e)                           eccentric anomaly E (rad) solving E − e sin E = M, 0 ≤ e < 1
     elements(id, jd)                         the elements at that date {a, e, I, L, peri, node} (ua, degrees)
     position(id, jd)                         heliocentric ecliptic [x, y, z], ua
     vue(id, jd)                              the planet seen from the Earth: [x, y, z] (ua) and longitude λ (rad, 0 to 2π)
     periode(id), synodique(id)               sidereal and synodic periods, s
     retrogradations(id, jd0, jd1, pas)       [{debut, fin, duree (days), arc (rad), milieu}]: the planet goes backwards
                                              between two stations; milieu = same heliocentric longitude as the Earth
                                              (opposition for an outer planet, inferior conjunction for an inner one)
     troisiemeLoi()                           per planet {id, a (m), T (s), q = T²/a³, ecart = q GM/(4π²) − 1, masse, interieure}
     pente()                                  least-squares slopes: ln T against ln a (3/2) and ln(4π²a/T²) against ln a (−2);
                                              GM, the geometric mean of 4π²a³/T²
     ellipse(a, e, n)                         n + 1 points of the ellipse, focus at the origin, perihelion on +x
     secteurs(e, n, pas)                      Kepler's 2nd law computed with Integ: n arcs of equal duration, their areas
     polygone(n, e, tours, sansForce)         Newton's construction: straight drifts and central kicks (Integ eulerSI);
                                              sansForce: no kick, the straight line of inertia
     testLune(n)                              the Moon test for a force in 1/rⁿ, with the corrections that close it
     systeme(id)                              what the two-point model of Sun + planet neglects, as pure numbers;
                                              perihelie: the planet's own perihelion advance, ° per century (table rate)
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const Integ = typeof module !== "undefined" && module.exports ? require("./integration.js") : root.Integ;
  const err = m => { throw new Error("kepler: " + m); };
  const DEG = Math.PI / 180, JOUR = 86400, SIECLE = 36525, J2000 = 2451545, UNIX = 2440587.5, TOUR = 2 * Math.PI;

  /*            a           e           I            L               ϖ              Ω
                ȧ           ė           İ            L̇               ϖ̇              Ω̇            Sun/planet */
  const T1 = {
    mercure: [[0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593],
      [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081], 6023600],
    venus: [[0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255],
      [0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418], 408523.71],
    terre: [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0],
      [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0], 328900.5614],
    mars: [[1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
      [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343], 3098708],
    jupiter: [[5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
      [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106], 1047.3486],
    saturne: [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
      [-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794], 3497.898],
    uranus: [[19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503],
      [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589], 22902.98],
    neptune: [[30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
      [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664], 19412.24],
  };
  const NOMS = ["a", "e", "I", "L", "peri", "node"];
  const IDS = Object.keys(T1);
  const PLANETES = Object.freeze(Object.fromEntries(IDS.map(id => [id, Object.freeze({
    id, j2000: Object.freeze(Object.fromEntries(NOMS.map((k, i) => [k, T1[id][0][i]]))),
    taux: Object.freeze(Object.fromEntries(NOMS.map((k, i) => [k, T1[id][1][i]]))), masse: 1 / T1[id][2],
  })])));
  const LUNE = Object.freeze({ a: 384400e3, T: 27.3217 * JOUR, masse: 1 / 81.30056 });   // m, s, Moon/Earth

  const planete = id => PLANETES[id] || err("planète inconnue « " + id + " » (" + IDS.join(", ") + ")");
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); };

  const jd = ms => { fini(ms, "la date"); return ms / (JOUR * 1000) + UNIX; };
  const ms = j => { fini(j, "la date julienne"); return (j - UNIX) * JOUR * 1000; };

  /* Kepler's equation by Newton's method, started at E = M + e sin M; converges for every M when e < 1 */
  function anomalie(M, e) {
    fini(M, "M"); fini(e, "e"); if (!(e >= 0 && e < 1)) err("l'excentricité doit être dans [0, 1[");
    let E = M + e * Math.sin(M);
    for (let k = 0; k < 50; k++) { const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-15) break; }
    return E;
  }

  function elements(id, j) {
    const p = planete(id); fini(j, "la date julienne");
    const T = (j - J2000) / SIECLE;
    return Object.fromEntries(NOMS.map(k => [k, p.j2000[k] + p.taux[k] * T]));
  }

  /* the recipe of the source: ω = ϖ − Ω, M = L − ϖ, Kepler's equation, then three rotations */
  function position(id, j) {
    const el = elements(id, j), w = (el.peri - el.node) * DEG, O = el.node * DEG, I = el.I * DEG;
    const M = ((el.L - el.peri) % 360 + 540) % 360 - 180, E = anomalie(M * DEG, el.e);
    const xp = el.a * (Math.cos(E) - el.e), yp = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
    const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
    return [(cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
      (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
      sw * sI * xp + cw * sI * yp];
  }
  const angle = v => ((Math.atan2(v[1], v[0]) % TOUR) + TOUR) % TOUR;

  function vue(id, j) {
    if (id === "terre") err("la Terre ne se voit pas depuis la Terre");
    const p = position(id, j), t = position("terre", j), x = p.map((q, i) => q - t[i]);
    return { x, lambda: angle(x) };
  }

  const periode = id => TOUR / (planete(id).taux.L * DEG) * SIECLE * JOUR;
  function synodique(id) {
    if (id === "terre") err("la Terre n'a pas de période synodique par rapport à elle-même");
    return 1 / Math.abs(1 / periode(id) - 1 / periode("terre"));
  }

  /* the apparent longitude, unwrapped; stations where its rate changes sign, refined by a parabola on three samples */
  function retrogradations(id, j0, j1, pas) {
    pas = pas == null ? 1 : pas; fini(j0, "j0"); fini(j1, "j1"); fini(pas, "le pas");
    if (!(j1 > j0 && pas > 0)) err("il faut j0 < j1 et un pas positif");
    if ((j1 - j0) / pas > 2e5) err("trop d'échantillons : augmentez le pas");
    const ts = [], ls = [];
    for (let j = j0; j <= j1 + 1e-9; j += pas) {
      let l = vue(id, j).lambda;
      if (ls.length) l += TOUR * Math.round((ls[ls.length - 1] - l) / TOUR);
      ts.push(j); ls.push(l);
    }
    const stations = [];
    for (let i = 1; i < ls.length - 1; i++) {
      const d0 = ls[i] - ls[i - 1], d1 = ls[i + 1] - ls[i];
      if (d0 === 0 || Math.sign(d0) === Math.sign(d1)) continue;
      const den = ls[i - 1] - 2 * ls[i] + ls[i + 1], u = den !== 0 ? (ls[i - 1] - ls[i + 1]) / (2 * den) : 0;
      stations.push({ t: ts[i] + u * pas, l: ls[i] + u * (ls[i + 1] - ls[i - 1]) / 2 + u * u * den / 2, versArriere: d0 > 0 });
    }
    const out = [];
    for (let k = 0; k + 1 < stations.length; k++) {
      const a = stations[k], b = stations[k + 1];
      if (!a.versArriere) continue;
      /* same heliocentric longitude as the Earth: the middle of the loop, found by bisection */
      const f = j => { const d = angle(position(id, j)) - angle(position("terre", j)); return ((d + 3 * Math.PI) % TOUR) - Math.PI; };
      let lo = a.t, hi = b.t, milieu = NaN;
      if (Math.sign(f(lo)) !== Math.sign(f(hi))) { for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (Math.sign(f(m)) === Math.sign(f(lo))) lo = m; else hi = m; } milieu = (lo + hi) / 2; }
      out.push({ debut: a.t, fin: b.t, duree: b.t - a.t, arc: a.l - b.l, milieu });
    }
    return out;
  }

  /* Kepler's third law on the data: T from the rate of the mean longitude, a from the table */
  function troisiemeLoi() {
    let dedans = 0;
    return IDS.map(id => {
      const p = PLANETES[id], a = p.j2000.a * Cst.au, T = periode(id), q = T * T / (a * a * a);
      dedans += p.masse;
      return { id, a, T, q, ecart: q * Cst.GM_sun / (4 * Math.PI * Math.PI) - 1, masse: p.masse, interieure: dedans };
    });
  }
  const pente1 = pts => {
    const n = pts.length, mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
    const sxy = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0), sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
    return { pente: sxy / sxx, origine: my - sxy / sxx * mx };
  };
  function pente() {
    const r = troisiemeLoi();
    const kep = pente1(r.map(x => [Math.log(x.a), Math.log(x.T)]));
    const acc = pente1(r.map(x => [Math.log(x.a), Math.log(4 * Math.PI * Math.PI * x.a / (x.T * x.T))]));
    const GM = Math.exp(r.reduce((s, x) => s + Math.log(4 * Math.PI * Math.PI * x.a ** 3 / (x.T * x.T)), 0) / r.length);
    return { kepler: kep.pente, force: acc.pente, GM };
  }

  function ellipse(a, e, n) {
    fini(a, "a"); fini(e, "e"); if (!(a > 0 && e >= 0 && e < 1)) err("ellipse : a > 0 et 0 ≤ e < 1");
    n = n || 180;
    return Array.from({ length: n + 1 }, (_, i) => { const th = TOUR * i / n, r = a * (1 - e * e) / (1 + e * Math.cos(th)); return [r * Math.cos(th), r * Math.sin(th)]; });
  }

  /* GM = 1, a = 1, start at perihelion: period 2π. The orbit is integrated (leapfrog), then cut into n equal durations;
     the area of each arc is the sum of the thin triangles Sun–x_k–x_{k+1}. Exact: π a b / n. */
  function secteurs(e, n, pas) {
    fini(e, "e"); if (!(e >= 0 && e < 1)) err("secteurs : 0 ≤ e < 1");
    if (!Number.isInteger(n) || n < 2) err("secteurs : n entier ≥ 2");
    pas = pas || 400;
    if (!Number.isInteger(pas) || pas < 10) err("secteurs : au moins 10 pas par arc");
    const K = Integ.kepler(1), s0 = { t: 0, x: [1 - e, 0], v: [0, Math.sqrt((1 + e) / (1 - e))] };
    const r = Integ.run("leapfrog", K.a, s0, TOUR / (n * pas), n * pas);
    const arcs = [];
    for (let k = 0; k < n; k++) {
      let A = 0; const pts = [];
      for (let i = k * pas; i <= (k + 1) * pas; i++) { pts.push(r.x[i]); if (i > k * pas) A += (r.x[i - 1][0] * r.x[i][1] - r.x[i - 1][1] * r.x[i][0]) / 2; }
      arcs.push({ aire: A, points: pts });
    }
    return { arcs, exacte: Math.PI * Math.sqrt(1 - e * e) / n, vitesses: { perihelie: Math.hypot(...r.v[0]), aphelie: Math.sqrt((1 - e) / (1 + e)) }, fin: r.x[n * pas] };
  }

  /* Newton's construction (Principia, book I, prop. 1): straight motion by inertia, and at equal intervals a kick towards the
     Sun. That is exactly the semi-implicit Euler step of Integ: v += h a(x), then x += h v. Both moves keep x × v, so each
     triangle Sun–x_k–x_{k+1} has the same area h |x × v| / 2, whatever h. GM = 1, start at aphelion of an ellipse of
     semi-major axis 1 and eccentricity e. */
  function polygone(n, e, tours, sansForce) {
    if (!Number.isInteger(n) || n < 3) err("polygone : au moins 3 impulsions par tour");
    e = e == null ? 0.5 : e; fini(e, "e"); if (!(e >= 0 && e < 1)) err("polygone : 0 ≤ e < 1");
    tours = tours || 1;
    const K = Integ.kepler(1), s0 = { t: 0, x: [-(1 + e), 0], v: [0, -Math.sqrt((1 - e) / (1 + e))] };
    const a = sansForce ? () => [0, 0] : K.a;                    // no force: inertia alone, a straight line
    const r = Integ.run("eulerSI", a, s0, TOUR / n, Math.round(n * tours));
    const aires = r.x.slice(1).map((x, i) => (r.x[i][0] * x[1] - r.x[i][1] * x[0]) / 2);
    return { sommets: r.x, aires, h: TOUR / n, attendue: TOUR / n * Math.sqrt(1 - e * e) / 2 };
  }

  /* The Moon test. Measured: the centripetal acceleration 4π²d/T² of the Moon. Predicted: the weight at the surface,
     carried to the Moon by a law in 1/rⁿ. Corrections that close the gap for n = 2: the Moon's own mass (the period
     measures G(M + m)), and the Sun's tide, which on average pulls the Moon outward by GM☉ d/(2D³). */
  function testLune(n) {
    n = n == null ? 2 : n; fini(n, "n");
    const d = LUNE.a, R = Cst.R_E_mean, mesure = 4 * Math.PI * Math.PI * d / (LUNE.T * LUNE.T);
    const g = Cst.GM_E / (R * R), predite = g * Math.pow(R / d, n);
    const masse = Cst.GM_E * LUNE.masse / (d * d), soleil = -Cst.GM_sun * d / (2 * Cst.au ** 3);
    const corrigee = Cst.GM_E / (d * d) + masse + soleil;
    return { d, T: LUNE.T, R, rapport: d / R, mesure, g, g0: Cst.g0, predite, ecart: predite / mesure - 1,
      feynman: Cst.g0 / 3600, masse, soleil, corrigee, ecartCorrige: corrigee / mesure - 1, chute: mesure / 2 };
  }

  /* What the two-point model Sun + planet neglects, for one planet, as pure numbers:
     the sizes against the distance, the Sun's motion about the centre of mass, the tidal pull of the biggest neighbour,
     and what all the other planets together do to the ellipse: the advance of its perihelion, ϖ̇ of the table (° per century,
     fixed J2000 ecliptic and equinox: the general precession is not in it). */
  function systeme(id) {
    const p = planete(id), a = p.j2000.a * Cst.au, mu = p.masse;
    const bary = a * mu / (1 + mu);
    const voisin = id === "jupiter" ? "saturne" : "jupiter";
    let maree = null;
    if (IDS.indexOf(id) < IDS.indexOf(voisin)) {
      const P = Integ.perturbation(PLANETES[voisin].masse, p.j2000.a, PLANETES[voisin].j2000.a);
      maree = { voisin, directe: P.directe, differentielle: P.differentielle };
    }
    return { a, masse: mu, soleil: Cst.R_sun / a, barycentre: bary, barycentreSoleil: bary / Cst.R_sun,
      terre: id === "terre" ? Cst.R_E_mean / a : null, maree, perihelie: p.taux.peri };
  }

  const api = { PLANETES, LUNE, IDS, jd, ms, anomalie, elements, position, vue, periode, synodique, retrogradations,
    troisiemeLoi, pente, ellipse, secteurs, polygone, testLune, systeme };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Kepler = api;
})(typeof self !== "undefined" ? self : this);

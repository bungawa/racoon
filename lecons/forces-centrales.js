/* Forces centrales — calculs des leçons X.forces_centrales.1 à 4 (programme de CPGE, première année : moment cinétique,
   force centrale et loi des aires, énergie potentielle effective, champ newtonien). Contexte : Feynman I §18-3 et §18-4.
   Pur, sans DOM, UMD (global FC). SI partout. Rien n'est recopié : le produit vectoriel vient d'AlgVec, l'intégrateur et les
   éléments d'orbite d'Integ (kepler(GM).elements), l'équation de Kepler et les planètes de Kepler, J₂ de Potentiel,
   les constantes de constantes.js.

   Moment cinétique (leçon 1)
     moment(m, r, v)                 L_O = r × (m v), vecteurs de 2 ou 3 composantes, rendu à 3 composantes.
     momentForce(r, F)               M_O = r × F.
     force(id, o)                    une force de la liste FORCES, par unité de masse : { a(t, x, v), centrale, vdep }.
                                     newton { k } : −k r/r³ ;  ressort { w } : −ω² r ;  uniforme { g } : vecteur g constant ;
                                     freinee { k, alpha } : newton plus frottement fluide −α v ;  puissance { k, n } : −k r/rⁿ⁺¹.
     suivre(id, o, s0, h, n, m)      le mouvement d'un point de masse m (saute-mouton) et, à chaque pas, L_z, M_z, et
                                     L_z(0) + ∫ M_z dt (trapèzes) : { t, x, v, L, M, integrale, ecart } ; ecart = écart maximal
                                     entre L_z et L_z(0) + ∫ M_z dt, rapporté à max |L_z| : le théorème du moment cinétique.
   Loi des aires (leçon 2)
     aires(id, o, s0, nSect, pas, h) n secteurs de même durée nSect·pas·h : { aires, C0 = |r × v| au départ, vitesseAreolaire
                                     = C0/2, ecart = écart relatif maximal des aires à la moyenne, points }.
     planeite(id, o, s0, h, n)       écart maximal de la trajectoire au plan perpendiculaire à L(0), rapporté à r(0).
     fractionApogee(e)               part de la période passée du côté de l'apogée de la corde focale perpendiculaire au grand
                                     axe (anomalie vraie de 90° à 270°), par l'équation de Kepler.
     fractionPetitAxe(e)             part de la période passée au-delà du petit axe, côté apogée (anomalie excentrique de 90° à
                                     270°) : 1/2 + e/π. Ce n'est pas la même moitié que la précédente.
     mareeSolaire(d, D)              marée du Soleil sur la Lune (distance d de la Terre, D du Soleil ; défaut : Lune, 1 ua),
                                     rapportée à l'attraction de la Terre sur la Lune : { radiale = moyenne de la partie radiale,
                                     (1/2)(M☉/M⊕)(d/D)³, centrale ; tangentielle = maximum de la partie orthoradiale, (3/2)(M☉/M⊕)(d/D)³,
                                     la seule qui ne soit pas centrale }.
   Énergie potentielle effective (leçon 3)
     newtonien(k, m, C)              Ep = −k/r ; { ep, centrifuge, eff, rc, min, tournants(Em), etat(Em) } ;
                                     etat : "impossible", "circulaire", "lie", "diffusion".
     tournants(f, Em, r0, r1, n)     zéros de f(r) − Em sur [r0, r1] (balayage puis dichotomie) : pour tout Ep,eff.
     courbure(k, n, m, C)            force −k/rⁿ : rayon rc de l'orbite circulaire et Ep,eff''(rc) (différences finies) ;
                                     positive (stable) si n < 3, nulle ou négative sinon.
     perturbe(k, n, rc, eps, tours, pas)  orbite circulaire de rayon rc pour la force −k/rⁿ, vitesse multipliée par 1 + eps :
                                     { rmin, rmax, ecart = max |r − rc|/rc } sur « tours » périodes circulaires.
   Champ newtonien (leçon 4)
     excentricite(GM, E, C)          e = √(1 + 2 E C²/(GM)²), E énergie mécanique massique, C constante des aires.
     type(E, GM, r)                  "ellipse" (E < 0), "parabole" (E = 0 à 10⁻⁹ près de GM/r), "hyperbole".
     orbite(GM, s)                   éléments d'un état { x, v } par Integ.kepler : { E, C, a, e, p, type, rp, ra, T }.
     canon(h, v0, R, GM)             tir horizontal à l'altitude h : orbite(...) plus { R, touche : rp < R } ; défaut Terre.
     seuilChute(h, R)                v/v₁(R + h) sous lequel un tir horizontal à l'altitude h recoupe la sphère de rayon R :
                                     √(2R/(2R + h)) ; défaut : rayon moyen de la Terre.
     conique(p, e, varpi, n)         points de la conique r = p/(1 + e cos(θ − ϖ)), branche utile seulement.
     vol(o, n)                       pour o = canon(...) : la trajectoire parcourue depuis le tir, dans le sens du mouvement :
                                     l'ellipse entière, ou l'arc jusqu'au sol, ou la branche sortante d'une conique ouverte.
     cosmiques(R, GM)                { v1 = √(GM/R), v2 = √(2GM/R) } ; défaut : Terre, rayon moyen.
     geostationnaire()               { T (jour sidéral), r, h (au-dessus de l'équateur), v }.
     periode(GM, a)                  2π √(a³/GM) : la troisième loi de Kepler avec a, le demi-grand axe.
   Décrire le système
     deuxCorps(q)                    q = m/M : masse réduite μ/m = 1/(1 + q) ; la troisième loi exacte contient G(M + m).
     precessionJ2(a, e, i)           aplatissement de la Terre : dΩ/dt (nœud) et dω/dt (périgée), rad·s⁻¹, et J₂ (R/a)².
     rotationPropre(k, R)            moment cinétique de rotation propre de la Terre, k M R² Ω, rapporté à son moment cinétique
                                     orbital M a² n (a = 1 ua, n = 2π par année julienne) ; k = 0,4 pour une boule homogène.
     relativite(id)                  avance relativiste du périhélie d'une planète, ″ par siècle : 6πGM/(c² a (1 − e²)) par tour.
   Les erreurs lèvent un message en français : elles signalent un appel faux, jamais un mouvement inhabituel. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Integ = node ? require("./integration.js") : root.Integ;
  const Kepler = node ? require("./kepler.js") : root.Kepler;
  const AlgVec = node ? require("./algebre-vectorielle.js") : root.AlgVec;
  const Potentiel = node ? require("./potentiel.js") : root.Potentiel;
  const err = m => { throw new Error("fc: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const TOUR = 2 * Math.PI, JOUR = 86400, SIECLE = 36525 * JOUR, SECONDE_ARC = Math.PI / 648000;
  const v3 = u => { if (!Array.isArray(u) || u.length < 2 || u.length > 3) err("vecteur à 2 ou 3 composantes attendu"); return u.length === 3 ? u.slice() : [u[0], u[1], 0]; };
  const dot = (p, q) => p.reduce((s, c, i) => s + c * q[i], 0);
  const norm = p => Math.sqrt(dot(p, p));

  /* ---------- moment cinétique ---------- */
  const moment = (m, r, v) => { positive(m, "m"); return AlgVec.vectoriel(v3(r), v3(v).map(c => m * c)); };
  const momentForce = (r, F) => AlgVec.vectoriel(v3(r), v3(F));

  const FORCES = ["newton", "ressort", "uniforme", "freinee", "puissance", "mixte"];
  function force(id, o) {
    o = o || {};
    if (id === "newton") { positive(o.k, "k"); return { a: Integ.kepler(o.k).a, centrale: true, vdep: false }; }
    if (id === "ressort") { positive(o.w, "ω"); return { a: Integ.spring(o.w).a, centrale: true, vdep: false }; }
    if (id === "uniforme") { if (!Array.isArray(o.g)) err("uniforme : g vecteur"); return { a: Integ.uniform(o.g).a, centrale: false, vdep: false }; }
    if (id === "freinee") {
      positive(o.k, "k"); finite(o.alpha, "α"); const K = Integ.kepler(o.k).a;
      return { a: (t, x, v) => K(t, x).map((c, i) => c - o.alpha * v[i]), centrale: o.alpha === 0, vdep: true };
    }
    if (id === "puissance") {
      positive(o.k, "k"); finite(o.n, "n");
      return { a: (t, x) => { const r = norm(x); if (r === 0) err("le point est au centre (r = 0)"); const c = -o.k / Math.pow(r, o.n + 1); return x.map(q => c * q); }, centrale: true, vdep: false };
    }
    if (id === "mixte") {
      const P = force("puissance", o), U = force("uniforme", o);
      return { a: (t, x, v) => { const p = P.a(t, x), u = U.a(t, x); return p.map((c, i) => c + u[i]); }, centrale: o.g.every(c => c === 0), vdep: false };
    }
    return err("force inconnue « " + id + " » (" + FORCES.join(", ") + ")");
  }

  function suivre(id, o, s0, h, n, m) {
    m = m == null ? 1 : positive(m, "m");
    const f = force(id, o), r = Integ.run("leapfrog", f.a, s0, h, n, { vdep: f.vdep });
    const L = [], M = [], integrale = [];
    r.x.forEach((x, i) => {
      const v = r.v[i], a = f.a(r.t[i], x, v);
      L.push(moment(m, x, v)[2]); M.push(momentForce(x, a.map(c => m * c))[2]);
      integrale.push(i ? integrale[i - 1] + (M[i - 1] + M[i]) / 2 * (r.t[i] - r.t[i - 1]) : L[0]);
    });
    const big = Math.max(...L.map(Math.abs), 1e-300);
    const ecart = Math.max(...L.map((l, i) => Math.abs(l - integrale[i]))) / big;
    return { t: r.t, x: r.x, v: r.v, L, M, integrale, ecart, centrale: f.centrale };
  }

  /* ---------- loi des aires ---------- */
  function aires(id, o, s0, nSect, pas, h) {
    if (!Number.isInteger(nSect) || nSect < 2) err("aires : au moins 2 secteurs");
    if (!Number.isInteger(pas) || pas < 4) err("aires : au moins 4 pas par secteur");
    positive(h, "h");
    const f = force(id, o), r = Integ.run("leapfrog", f.a, s0, h, nSect * pas, { vdep: f.vdep });
    const out = [], points = [];
    for (let k = 0; k < nSect; k++) {
      let A = 0; const pts = [];
      for (let i = k * pas; i <= (k + 1) * pas; i++) { pts.push(r.x[i]); if (i > k * pas) A += (r.x[i - 1][0] * r.x[i][1] - r.x[i - 1][1] * r.x[i][0]) / 2; }
      out.push(A); points.push(pts);
    }
    const C0 = norm(moment(1, s0.x, s0.v)), moy = out.reduce((s, a) => s + a, 0) / nSect;
    return { aires: out, C0, vitesseAreolaire: C0 / 2, duree: pas * h, ecart: Math.max(...out.map(a => Math.abs(a / moy - 1))), points };
  }

  function planeite(id, o, s0, h, n) {
    const f = force(id, o), r = Integ.run("leapfrog", f.a, s0, h, n, { vdep: f.vdep });
    const L0 = moment(1, s0.x, s0.v), l = norm(L0);
    if (l === 0) err("planeite : L(0) nul, le mouvement est rectiligne");
    const u = L0.map(c => c / l);
    return Math.max(...r.x.map(x => Math.abs(dot(v3(x), u)))) / norm(s0.x);
  }

  function fractionApogee(e) {
    finite(e, "e"); if (!(e >= 0 && e < 1)) err("fractionApogee : 0 ≤ e < 1");
    const E = Math.acos(e), M = E - e * Math.sin(E);        // anomalie vraie 90° : cos E = e ; Kepler.anomalie le vérifie
    return 1 - M / Math.PI;
  }
  function fractionPetitAxe(e) {
    finite(e, "e"); if (!(e >= 0 && e < 1)) err("fractionPetitAxe : 0 ≤ e < 1");
    return 0.5 + e / Math.PI;                                  // anomalie moyenne de π/2 − e à 3π/2 + e
  }
  function mareeSolaire(d, D) {
    d = d == null ? Kepler.LUNE.a : positive(d, "d"); D = D == null ? Cst.au : positive(D, "D");
    const q = Cst.GM_sun / Cst.GM_E * (d / D) ** 3;
    return { radiale: q / 2, tangentielle: 1.5 * q };
  }

  /* ---------- énergie potentielle effective ---------- */
  function newtonien(k, m, C) {
    positive(k, "k"); positive(m, "m"); finite(C, "C");
    const ep = r => -k / r, centrifuge = r => m * C * C / (2 * r * r), eff = r => ep(r) + centrifuge(r);
    const rc = C === 0 ? 0 : m * C * C / k, min = C === 0 ? -Infinity : -k * k / (2 * m * C * C);
    const tol = E => 1e-12 * Math.max(Math.abs(E), Math.abs(min));
    function tournants(E) {
      finite(E, "Em");
      if (C === 0) return E < 0 ? [k / -E] : [];
      if (E < min - tol(E)) return [];
      if (Math.abs(E - min) <= tol(E)) return [rc, rc];
      if (E === 0) return [m * C * C / (2 * k)];
      const d = Math.sqrt(k * k + 2 * E * m * C * C), r1 = (-k + d) / (2 * E), r2 = (-k - d) / (2 * E);
      return E < 0 ? [Math.min(r1, r2), Math.max(r1, r2)] : [r1];
    }
    function etat(E) {
      if (C !== 0 && E < min - tol(E)) return "impossible";
      if (C !== 0 && Math.abs(E - min) <= tol(E)) return "circulaire";
      return E < 0 ? "lie" : "diffusion";
    }
    return { ep, centrifuge, eff, rc, min, tournants, etat };
  }

  function tournants(f, E, r0, r1, n) {
    positive(r0, "r0"); positive(r1, "r1"); if (!(r1 > r0)) err("tournants : r0 < r1");
    n = n || 2000; const out = [], g = r => f(r) - E, q = Math.pow(r1 / r0, 1 / n);
    let a = r0, ga = g(a);
    for (let i = 1; i <= n; i++) {
      const b = r0 * Math.pow(q, i), gb = g(b);
      if (ga === 0) out.push(a);
      else if (ga * gb < 0) { let lo = a, hi = b; for (let j = 0; j < 80; j++) { const mid = (lo + hi) / 2; if (g(mid) * g(lo) > 0) lo = mid; else hi = mid; } out.push((lo + hi) / 2); }
      a = b; ga = gb;
    }
    return out;
  }

  /* force −k/rⁿ : Ep = −k/((n − 1) rⁿ⁻¹) (n ≠ 1) ; rc tel que k/rcⁿ = m C²/rc³ */
  function courbure(k, n, m, C) {
    positive(k, "k"); finite(n, "n"); positive(m, "m"); positive(C, "C");
    if (n === 3) return { rc: NaN, courbure: 0, ep: r => -k / (2 * r * r) };   // k = m C² ou aucun cercle : jamais stable
    if (n === 1) err("courbure : n = 1 donne un potentiel logarithmique, hors du modèle");
    const rc = Math.pow(m * C * C / k, 1 / (3 - n)), ep = r => -k / ((n - 1) * Math.pow(r, n - 1)), eff = r => ep(r) + m * C * C / (2 * r * r);
    const d = rc * 1e-4;
    return { rc, courbure: (eff(rc + d) - 2 * eff(rc) + eff(rc - d)) / (d * d), ep, eff, attendue: k * (3 - n) / Math.pow(rc, n + 1) };
  }

  function perturbe(k, n, rc, eps, tours, pas) {
    positive(k, "k"); finite(n, "n"); positive(rc, "rc"); finite(eps, "eps");
    tours = tours || 5; pas = pas || 2000;
    const vc = Math.sqrt(k / Math.pow(rc, n - 1)), T = TOUR * rc / vc;
    const f = force("puissance", { k, n }), s0 = { t: 0, x: [rc, 0], v: [0, vc * (1 + eps)] };
    const r = Integ.run("leapfrog", f.a, s0, T / pas, Math.round(tours * pas));
    let rmin = Infinity, rmax = 0, ecart = 0;
    for (const x of r.x) { const q = Math.hypot(x[0], x[1]); if (!isFinite(q)) break; rmin = Math.min(rmin, q); rmax = Math.max(rmax, q); ecart = Math.max(ecart, Math.abs(q / rc - 1)); }
    return { rmin, rmax, ecart, T };
  }

  /* ---------- champ newtonien ---------- */
  function excentricite(GM, E, C) {
    positive(GM, "GM"); finite(E, "E"); finite(C, "C");
    return Math.sqrt(Math.max(0, 1 + 2 * E * C * C / (GM * GM)));
  }
  function type(E, GM, r) {
    finite(E, "E");
    const echelle = GM && r ? GM / r : Math.abs(E) || 1;
    return Math.abs(E) <= 1e-9 * echelle ? "parabole" : E < 0 ? "ellipse" : "hyperbole";
  }
  const periode = (GM, a) => TOUR * Math.sqrt(positive(a, "a") ** 3 / positive(GM, "GM"));
  function orbite(GM, s) {
    const el = Integ.kepler(GM).elements({ t: 0, x: s.x, v: s.v }), r = norm(v3(s.x));
    const C = el.L, p = C * C / GM, ty = type(el.E, GM, r), rp = p / (1 + el.e);
    return { E: el.E, C, a: el.a, e: el.e, varpi: el.varpi, p, type: ty, rp, ra: ty === "ellipse" ? p / (1 - el.e) : Infinity,
      T: ty === "ellipse" ? periode(GM, el.a) : Infinity };
  }
  function canon(h, v0, R, GM) {
    R = R == null ? Cst.R_E_mean : R; GM = GM == null ? Cst.GM_E : GM;
    finite(h, "h"); if (!(h >= 0)) err("canon : h ≥ 0"); finite(v0, "v0");
    const o = orbite(GM, { x: [R + h, 0], v: [0, v0] });
    return Object.assign(o, { R, h, touche: o.rp < R * (1 - 1e-12) });
  }
  function seuilChute(h, R) {
    R = R == null ? Cst.R_E_mean : positive(R, "R"); finite(h, "h"); if (!(h >= 0)) err("seuilChute : h ≥ 0");
    return Math.sqrt(2 * R / (2 * R + h));                     // périgée = R pour un apogée R + h
  }
  function conique(p, e, varpi, n) {
    positive(p, "p"); finite(e, "e"); if (!(e >= 0)) err("conique : e ≥ 0");
    varpi = varpi || 0; n = n || 360;
    const lim = e > 1 ? Math.acos(-1 / e) * 0.98 : e === 1 ? Math.PI * 0.97 : Math.PI;
    return Array.from({ length: n + 1 }, (_, i) => { const th = -lim + 2 * lim * i / n, r = p / (1 + e * Math.cos(th)); return [r * Math.cos(th + varpi), r * Math.sin(th + varpi)]; });
  }
  /* the path actually flown after a horizontal launch (canon): counterclockwise from the launch point, a whole ellipse,
     or the arc until the ground, or the outgoing branch of an open conic (cut at 98 % of its asymptote) */
  function vol(o, n) {
    n = n || 360;
    const nu0 = o.rp >= o.R + o.h - 1e-6 * o.R ? 0 : Math.PI;                 // launched at perigee or at apogee
    let nu1 = nu0 + 2 * Math.PI;
    if (o.touche) nu1 = 2 * Math.PI - Math.acos(Math.max(-1, Math.min(1, (o.p / o.R - 1) / o.e)));
    else if (o.type !== "ellipse") nu1 = (o.e > 1 ? Math.acos(-1 / o.e) : Math.PI) * 0.98;
    return Array.from({ length: n + 1 }, (_, i) => { const nu = nu0 + (nu1 - nu0) * i / n, r = o.p / (1 + o.e * Math.cos(nu));
      return [r * Math.cos(nu + o.varpi), r * Math.sin(nu + o.varpi)]; });
  }
  function cosmiques(R, GM) {
    R = R == null ? Cst.R_E_mean : positive(R, "R"); GM = GM == null ? Cst.GM_E : positive(GM, "GM");
    return { v1: Math.sqrt(GM / R), v2: Math.sqrt(2 * GM / R), R, GM };
  }
  function geostationnaire() {
    const T = TOUR / Cst.Omega_E, r = Math.cbrt(Cst.GM_E * T * T / (4 * Math.PI * Math.PI));
    return { T, r, h: r - Cst.R_E_eq, v: TOUR * r / T };
  }

  /* ---------- décrire le système ---------- */
  function deuxCorps(q) {
    finite(q, "m/M"); if (!(q >= 0)) err("deuxCorps : m/M ≥ 0");
    return { reduite: 1 / (1 + q), kepler3: 1 + q, lune: Kepler.LUNE.masse };
  }
  function precessionJ2(a, e, i) {
    positive(a, "a"); finite(e, "e"); finite(i, "i"); if (!(e >= 0 && e < 1)) err("precessionJ2 : 0 ≤ e < 1");
    const R = Cst.R_E_eq, J2 = Potentiel.J2_E, n = Math.sqrt(Cst.GM_E / a ** 3), p = a * (1 - e * e), f = J2 * (R / p) ** 2 * n;
    return { noeud: -1.5 * f * Math.cos(i), perigee: 0.75 * f * (5 * Math.cos(i) ** 2 - 1), relatif: J2 * (R / a) ** 2, J2, n };
  }
  function rotationPropre(k, R) {
    positive(k, "k"); R = R == null ? Cst.R_E_mean : positive(R, "R");
    return k * (R / Cst.au) ** 2 * Cst.Omega_E * 365.25 * JOUR / TOUR;
  }
  function relativite(id) {
    const P = Kepler.PLANETES[id] || err("planète inconnue « " + id + " »");
    const a = P.j2000.a * Cst.au, e = P.j2000.e, T = Kepler.periode(id);
    const parTour = 3 * TOUR * Cst.GM_sun / (Cst.c ** 2 * a * (1 - e * e));
    return { parTour, parSiecle: parTour * SIECLE / T / SECONDE_ARC, a, e, T, rapport: Cst.GM_sun / (Cst.c ** 2 * a) };
  }

  const api = { FORCES, moment, momentForce, force, suivre, aires, planeite, fractionApogee, fractionPetitAxe, mareeSolaire,
    newtonien, tournants, courbure, perturbe, excentricite, type, orbite, canon, seuilChute, conique, vol, cosmiques, geostationnaire,
    periode, deuxCorps, precessionJ2, rotationPropre, relativite };
  if (node) module.exports = api;
  else root.FC = api;
})(typeof self !== "undefined" ? self : this);

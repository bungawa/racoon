/* OptiqueGeometrique — le module commun du monde « Optique géométrique et vision ». Pur, sans DOM, UMD (global OptiqueGeometrique). SI partout.
   Ouvert par l'étape « Réflexion, réfraction et Fermat » ; les étapes suivantes du monde l'étendent (une section par étape, ajoutée
   à la fin, sans toucher aux précédentes). Chaque fonction est un modèle : son domaine est dans son commentaire.
   Angles en radians, sauf les tables historiques (en degrés, comme publiées). Les erreurs lèvent un message en français.

   Données
     INDICE                         indices de réfraction à 589 nm (raie D du sodium), chacun avec ses conditions.
     DOMAINES                       bornes conventionnelles du spectre électromagnétique (m), du plus court au plus long.
     PTOLEMEE                       table de Ptolémée, angle dans l'air → angle dans l'eau (degrés).
   La lumière (leçon « La nature de la lumière »)
     domaine(λ)                     nom du domaine spectral d'une longueur d'onde dans le vide.
     lumiere(λ, o)                  fréquence, énergie du photon, λ/D, angle de diffraction, hν/(kB T) : de quoi choisir un modèle.
   Réflexion et réfraction (leçon « Réflexion et réfraction »)
     refraction(θ1, n1, n2)         angle réfracté par la loi de Snell-Descartes, null en réflexion totale.
     angleCritique(n1, n2)          angle limite de réflexion totale, null si n1 ≤ n2.
     differences(liste)             différences premières et secondes d'une suite.
     indiceAjuste(table)            n qui ajuste le mieux une table (angle air, angle eau) par moindres carrés, et les écarts.
   Fermat (leçon « Le principe de Fermat du temps minimal »)
     minimise(f, a, b, tol)         minimum d'une fonction unimodale sur [a, b], par la section dorée.
     tempsTrajet(x, o)              durée du trajet A → (x, 0) → B à travers une interface plane y = 0.
     fermat(o)                      point d'entrée qui rend ce temps minimal, angles et vérification de Snell-Descartes.
     courbure(x, o)                 d²T/dx² : le temps ne croît qu'au second ordre autour du minimum.
     miroir(A, B, x)                trajet A → (x, 0) → B sur un miroir plan y = 0, longueur, image B′ et point du chemin le plus court. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const C = node ? require("./constantes.js") : root.Constantes;
  const Integ = node ? require("./lecons/integration.js") : root.Integ;
  const err = m => { throw new Error("optique-geometrique: " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const indice = (n, nom) => { fini(n, nom); if (!(n >= 1)) err(nom + " doit être ≥ 1 (indice d'un milieu transparent ordinaire)"); return n; };
  const DEG = Math.PI / 180;

  /* ---------- données ---------- */
  const INDICE = Object.freeze({
    vide: 1,
    air: 1.000293,      // 589,29 nm, 273,15 K, 101 325 Pa (tables usuelles) ; 1,000 27 vers 293 K
    eau: 1.333,         // 589,29 nm, 293,15 K
    silice: 1.458,      // silice fondue, 589,29 nm, température ambiante
    verre: 1.52,        // verre crown, 1,50 à 1,54 selon la composition
    diamant: 2.417,     // 589,29 nm, température ambiante
  });

  /* bornes basses de chaque domaine (m). Conventionnelles : les domaines se recouvrent, X et γ se distinguent par leur origine. */
  const DOMAINES = Object.freeze([
    ["gamma", 0], ["x", 1e-11], ["uv", 1e-8], ["visible", 380e-9], ["ir", 780e-9], ["micro", 1e-3], ["radio", 1],
  ]);

  /* Ptolémée, Optique, livre V (IIᵉ siècle) : angle d'incidence dans l'air → angle dans l'eau, en degrés. */
  const PTOLEMEE = Object.freeze([[10, 8], [20, 15.5], [30, 22.5], [40, 29], [50, 35], [60, 40.5], [70, 45.5], [80, 50]].map(Object.freeze));

  /* ---------- la lumière ---------- */
  function domaine(lambda) {
    positif(lambda, "λ");
    let id = DOMAINES[0][0];
    for (const [k, b] of DOMAINES) if (lambda >= b) id = k;
    return id;
  }

  /* lumiere(λ, {D, T}) : λ longueur d'onde dans le vide (m), D taille de l'ouverture (m, défaut 1 cm), T température du détecteur (K, défaut 293,15).
     nu = c/λ ; E = hν (J), eV = E/e ; lD = λ/D ; theta : premier minimum de diffraction d'une ouverture circulaire, sin θ = 1,22 λ/D
     (Fraunhofer ; null si 1,22 λ/D > 1 : l'onde contourne l'ouverture) ; kT = E/(kB T) : un photon contre l'agitation thermique du détecteur. */
  function lumiere(lambda, o) {
    positif(lambda, "λ");
    const D = o && o.D !== undefined ? positif(o.D, "D") : 0.01, T = o && o.T !== undefined ? positif(o.T, "T") : 293.15;
    const nu = C.c / lambda, E = C.h * nu, s = 1.22 * lambda / D;
    return { nu, E, eV: E / C.e, lD: lambda / D, theta: s <= 1 ? Math.asin(s) : null, kT: E / (C.k_B * T), domaine: domaine(lambda) };
  }

  /* ---------- réflexion et réfraction ---------- */
  /* refraction(θ1, n1, n2) : n1 sin θ1 = n2 sin θ2. Interface localement plane à l'échelle de λ, milieux homogènes et isotropes.
     Donne la direction seulement : la part réfléchie (formules de Fresnel) n'est pas calculée ici. null : réflexion totale. */
  function refraction(theta1, n1, n2) {
    fini(theta1, "θ1"); indice(n1, "n1"); indice(n2, "n2");
    if (Math.abs(theta1) > Math.PI / 2 + 1e-12) err("θ1 doit être entre −π/2 et π/2");
    const s = n1 * Math.sin(theta1) / n2;
    return Math.abs(s) > 1 ? null : Math.asin(s);
  }

  function angleCritique(n1, n2) {
    indice(n1, "n1"); indice(n2, "n2");
    return n1 > n2 ? Math.asin(n2 / n1) : null;
  }

  function differences(liste) {
    if (!Array.isArray(liste) || liste.length < 3) err("il faut au moins trois valeurs");
    liste.forEach((v, i) => fini(v, "valeur " + i));
    const d1 = liste.slice(1).map((v, i) => v - liste[i]);
    return { d1, d2: d1.slice(1).map((v, i) => v - d1[i]) };
  }

  /* minimise Σ (θeau − arcsin(sin θair / n))², degrés, sur 1 < n ≤ 3 ; renvoie n, les écarts (degrés) et l'écart maximal. */
  function indiceAjuste(table) {
    if (!Array.isArray(table) || table.length < 2) err("table vide");
    const ecarts = n => table.map(([a, w]) => w - Math.asin(Math.sin(a * DEG) / n) / DEG);
    const S = n => ecarts(n).reduce((s, e) => s + e * e, 0);
    const n = minimise(S, 1.0001, 3, 1e-10);
    const e = ecarts(n);
    return { n, ecarts: e, max: Math.max(...e.map(Math.abs)) };
  }

  /* ---------- Fermat ---------- */
  /* section dorée : f unimodale sur [a, b] ; sinon renvoie un minimum local. Précision tol sur x. */
  function minimise(f, a, b, tol) {
    fini(a, "a"); fini(b, "b"); if (!(b > a)) err("il faut a < b");
    tol = tol === undefined ? 1e-12 * (Math.abs(a) + Math.abs(b) + 1) : positif(tol, "tol");
    const g = (Math.sqrt(5) - 1) / 2;
    let x1 = b - g * (b - a), x2 = a + g * (b - a), f1 = f(x1), f2 = f(x2);
    for (let k = 0; k < 400 && b - a > tol; k++) {
      if (f1 <= f2) { b = x2; x2 = x1; f2 = f1; x1 = b - g * (b - a); f1 = f(x1); }
      else { a = x1; x1 = x2; f1 = f2; x2 = a + g * (b - a); f2 = f(x2); }
    }
    return (a + b) / 2;
  }

  /* o = {a, b, d, v1, v2} : A = (0, a) dans le milieu 1 (y > 0), B = (d, −b) dans le milieu 2 ; interface y = 0 ; vitesses v1, v2 (m·s⁻¹).
     T(x) = √(a² + x²)/v1 + √(b² + (d − x)²)/v2 : trajets rectilignes dans chaque milieu homogène. */
  function geometrie(o) {
    if (!o) err("géométrie manquante");
    return { a: positif(o.a, "a"), b: positif(o.b, "b"), d: fini(o.d, "d"), v1: positif(o.v1, "v1"), v2: positif(o.v2, "v2") };
  }
  function tempsTrajet(x, o) {
    fini(x, "x"); const { a, b, d, v1, v2 } = geometrie(o);
    return Math.hypot(a, x) / v1 + Math.hypot(b, d - x) / v2;
  }

  /* T est convexe en x (somme de deux fonctions convexes) : un seul minimum, entre 0 et d, où dT/dx s'annule.
     On cherche ce zéro par dichotomie sur dT/dx, croissante : précis à la machine près, là où T, plat, ne l'est pas.
     θ1, θ2 mesurés depuis la normale. */
  function fermat(o) {
    const g = geometrie(o), dT = u => u / (g.v1 * Math.hypot(g.a, u)) - (g.d - u) / (g.v2 * Math.hypot(g.b, g.d - u));
    let lo = Math.min(0, g.d), hi = Math.max(0, g.d);
    for (let k = 0; k < 200 && hi - lo > 0; k++) { const m = (lo + hi) / 2; if (m === lo || m === hi) break; if (dT(m) < 0) lo = m; else hi = m; }
    const x = (lo + hi) / 2;
    const theta1 = Math.atan2(x, g.a), theta2 = Math.atan2(g.d - x, g.b);
    return { x, T: tempsTrajet(x, g), theta1, theta2, snell: (Math.sin(theta1) / g.v1) / (Math.sin(theta2) / g.v2) };
  }

  function courbure(x, o) {
    fini(x, "x"); const { a, b, d, v1, v2 } = geometrie(o);
    return a * a / (v1 * Math.pow(a * a + x * x, 1.5)) + b * b / (v2 * Math.pow(b * b + (d - x) * (d - x), 1.5));
  }

  /* miroir plan y = 0, A et B du même côté (y > 0). L(x) = AC + CB pour C = (x, 0) ; B′ = image de B ; xMin : le point où
     la droite AB′ coupe le miroir, celui du chemin le plus court, donc aussi du temps le plus court dans un milieu homogène. */
  function miroir(A, B, x) {
    const pt = (P, nom) => { if (!Array.isArray(P) || P.length !== 2) err(nom + " doit être [x, y]"); fini(P[0], nom + ".x"); positif(P[1], nom + ".y (au-dessus du miroir)"); return P; };
    pt(A, "A"); pt(B, "B");
    const Bp = [B[0], -B[1]], xMin = A[0] + (B[0] - A[0]) * A[1] / (A[1] + B[1]);
    const L = u => Math.hypot(u - A[0], A[1]) + Math.hypot(B[0] - u, B[1]);
    const r = { image: Bp, xMin, Lmin: Math.hypot(Bp[0] - A[0], Bp[1] - A[1]) };
    if (x !== undefined) { fini(x, "x"); r.L = L(x); r.thetaI = Math.atan2(x - A[0], A[1]); r.thetaR = Math.atan2(B[0] - x, B[1]); }
    return r;
  }

  /* ---------- Fermat précisé (étape « Le principe de Fermat précisé ») ----------
     lame(i, n, e, n0)              lame à faces parallèles : angle intérieur, décalage latéral du rayon émergent.
     indiceAir(T, p)                n de l'air sec à 589 nm, n − 1 proportionnel à p/T (Gladstone-Dale, gaz parfait).
     route(o)                       air au-dessus d'une route chaude : T(z), n(z), dn/dz.
     rayonStratifie(m, z0, α0, o)   tracé d'un rayon dans un milieu stratifié n(z), invariant n cos α.
     depressionLimite(m, h)         angle sous l'horizontale en dessous duquel un rayon parti de h remonte avant le sol.
     miroirCourbe(o)                A et B devant un miroir circulaire : L(s), L″(0), minimum, maximum ou plat ; zone utile.
     phaseurs(o)                    somme des flèches e^{2iπL/λ} des bandes d'un miroir plan (modèle scalaire). */
  /* un pas de Runge-Kutta d'ordre 4 pour y′ = f(x, y), y = [z, z′] : Integ.rk4 (lecons/integration.js, chargé avant ce module). */
  const rk4 = (f, x, y, h) => Integ.rk4(f, x, y, h);

  /* lame(i, n, e, n0) : lame d'indice n et d'épaisseur e (m), plongée dans un milieu d'indice n0 (défaut 1), incidence i (rad).
     r angle dans la lame ; d = e sin(i − r)/cos r, décalage mesuré perpendiculairement aux rayons ; le rayon ressort parallèle.
     Faces planes et parallèles, milieux homogènes ; réflexions multiples et absorption ignorées. null en réflexion totale (n < n0). */
  function lame(i, n, e, n0) {
    fini(i, "i"); indice(n, "n"); positif(e, "e"); n0 = n0 === undefined ? 1 : indice(n0, "n0");
    if (!(Math.abs(i) < Math.PI / 2)) err("i doit être strictement entre −π/2 et π/2");
    const r = refraction(i, n0, n);
    if (r === null) return null;
    return { r, d: e * Math.sin(i - r) / Math.cos(r), chemin: n * e / Math.cos(r) };
  }

  /* indiceAir(T, p) = 1 + (n_ref − 1)(p/p_ref)(T_ref/T), n_ref = INDICE.air à 273,15 K et 101 325 Pa. Air sec ; la loi de
     Gladstone-Dale (n − 1 proportionnel à ρ) vaut tant que n − 1 ≪ 1, et le gaz parfait à 0,1 % près dans l'air ordinaire. */
  function indiceAir(T, p) {
    positif(T, "T"); p = p === undefined ? C.atm : positif(p, "p");
    return 1 + (INDICE.air - 1) * (p / C.atm) * (273.15 / T);
  }

  /* route({Tair, dT, l, p}) : T(z) = Tair + dT exp(−z/l), z ≥ 0 hauteur au-dessus du bitume (m). Défauts : 303,15 K, 20 K, 0,1 m,
     101 325 Pa. Profil-modèle, stationnaire et horizontalement uniforme : la vraie couche chaude fluctue (l'image tremble). */
  function route(o) {
    o = o || {};
    const Tair = o.Tair === undefined ? 303.15 : positif(o.Tair, "Tair"), dT = o.dT === undefined ? 20 : fini(o.dT, "dT");
    const l = o.l === undefined ? 0.1 : positif(o.l, "l"), p = o.p === undefined ? C.atm : positif(o.p, "p");
    if (!(Tair + Math.min(dT, 0) > 0)) err("température négative au sol");
    const K = (INDICE.air - 1) * (p / C.atm) * 273.15;
    const T = z => Tair + dT * Math.exp(-Math.max(z, 0) / l);
    return { Tair, dT, l, p, T, n: z => 1 + K / T(z), dn: z => { const t = T(z); return K * dT * Math.exp(-Math.max(z, 0) / l) / (l * t * t); } };
  }

  /* rayonStratifie(m, z0, alpha0, o) : m = {n(z), dn(z)} ; rayon lancé de (0, z0) avec l'angle alpha0 sur l'horizontale
     (négatif : vers le bas), |alpha0| < π/2. Couche par couche, Snell-Descartes garde C = n cos α. On intègre en x l'équation
     z″ = n n′(z)/C² (z′ = tan α), sans singularité au point de rebroussement, par Runge-Kutta d'ordre 4, pas o.h (défaut 0,25 m), jusqu'à
     o.xmax (défaut 800 m) ou jusqu'au sol z = 0 (interpolé). Couches planes et horizontales : la courbure de la Terre est ignorée
     (sur 1 km elle abaisse le sol de x²/2R = 8 cm) ; optique géométrique : n varie sur des longueurs ≫ λ.
     → { x[], z[], sol (le rayon atteint z = 0), xSol, zMin, C, chemin = ∫ n ds (m, au premier ordre de la méthode des trapèzes) } */
  function rayonStratifie(m, z0, alpha0, o) {
    if (!m || typeof m.n !== "function" || typeof m.dn !== "function") err("milieu {n(z), dn(z)} attendu");
    positif(z0, "z0"); fini(alpha0, "α0"); if (!(Math.abs(alpha0) < Math.PI / 2)) err("|α0| doit être < π/2");
    o = o || {};
    const h = o.h === undefined ? 0.25 : positif(o.h, "h"), xmax = o.xmax === undefined ? 800 : positif(o.xmax, "xmax");
    const Cst = m.n(z0) * Math.cos(alpha0), f = (t, y) => [y[1], m.n(y[0]) * m.dn(y[0]) / (Cst * Cst)];
    const xs = [0], zs = [z0];
    let y = [z0, Math.tan(alpha0)], x = 0, chemin = 0, zMin = z0, sol = false, xSol = null;
    const ds = (a, b) => m.n(a[0]) * Math.hypot(1, a[1]) + m.n(b[0]) * Math.hypot(1, b[1]);
    while (x < xmax - 1e-12) {
      const hh = Math.min(h, xmax - x), y2 = rk4(f, x, y, hh);
      if (y2[0] <= 0) {                                   // le sol est franchi pendant ce pas : interpolation linéaire
        const u = y[0] / (y[0] - y2[0]), yS = [0, y[1] + u * (y2[1] - y[1])];
        chemin += u * hh * ds(y, yS) / 2; x += u * hh; xs.push(x); zs.push(0); sol = true; xSol = x; zMin = 0; break;
      }
      chemin += hh * ds(y, y2) / 2; y = y2; x += hh; xs.push(x); zs.push(y[0]); zMin = Math.min(zMin, y[0]);
    }
    return { x: xs, z: zs, sol, xSol, zMin, C: Cst, chemin };
  }

  /* depressionLimite(m, h) : un rayon parti de la hauteur h vers le bas avec la dépression δ remonte avant le sol si n(0) < n(h) cos δ,
     n croissant avec z. δc = arccos(n(0)/n(h)) ; null si n(0) ≥ n(h) (pas de mirage inférieur). Exact dans le modèle stratifié plan. */
  function depressionLimite(m, h) {
    positif(h, "h");
    const r = m.n(0) / m.n(h);
    return r < 1 ? Math.acos(r) : null;
  }

  /* miroirCourbe({a, h, R}) : A = (−a, h), B = (a, h) ; miroir circulaire tangent en O = (0, 0) à l'axe x, de centre (0, R).
     R > 0 : concave du côté de A et B ; R < 0 : convexe ; R = ±Infinity : plan. P(s) : point d'abscisse curviligne s, |s| < π|R|.
     L(s) = AP + PB, la longueur, donc c fois le temps dans l'air homogène. Exact pour ce miroir ; en O, L′(0) = 0 par symétrie.
     L2 = L″(0) = 2 cos β (cos β/d − 1/R), d = OA, cos β = h/d (β angle d'incidence) ; Rc = d²/h, rayon de courbure en O
     de l'ellipse de foyers A et B qui passe par O. nature : "min" (L2 > 0), "max" (L2 < 0), "plat" (|L2| d < 1e-9).
     zone(λ) = √(λ/|L2|) : demi-largeur de miroir où L − L(0) < λ/2, au second ordre ; Infinity si plat. */
  function miroirCourbe(o) {
    if (!o) err("géométrie manquante");
    const a = positif(o.a, "a"), h = positif(o.h, "h"), R = o.R;
    if (typeof R !== "number" || isNaN(R) || R === 0) err("R doit être un nombre non nul, ±Infinity pour un plan");
    const plan = !isFinite(R);
    if (!plan && R > 0 && R <= h) err("R doit dépasser h : sinon A et B sont derrière le miroir");
    const P = s => { fini(s, "s"); if (plan) return [s, 0]; if (Math.abs(s) >= Math.PI * Math.abs(R)) err("s hors du miroir"); return [R * Math.sin(s / R), R * (1 - Math.cos(s / R))]; };
    const L = s => { const [x, y] = P(s); return Math.hypot(x + a, y - h) + Math.hypot(a - x, y - h); };
    const d = Math.hypot(a, h), cb = h / d, L2 = 2 * cb * (cb / d - (plan ? 0 : 1 / R));
    const nature = Math.abs(L2) * d < 1e-9 ? "plat" : L2 > 0 ? "min" : "max";
    return { a, h, R, d, cosBeta: cb, Rc: d * d / h, L0: 2 * d, L2, nature, P, L,
      zone: lambda => { positif(lambda, "λ"); return nature === "plat" ? Infinity : Math.sqrt(lambda / Math.abs(L2)); } };
  }

  /* phaseurs({a, h, lambda, X, N, garde}) : miroir plan y = 0 de −X à X en N bandes égales (défaut 400) ; A = (−a, h), B = (a, h).
     Bande k de centre x_k : une flèche de longueur Δx = 2X/N et d'angle θ_k = 2π L(x_k)/λ, L = AP + PB (air homogène : c fois le
     temps). garde(x) → vrai si la bande est découverte (défaut : toutes). Modèle scalaire : ni facteur d'obliquité, ni 1/r ; une bande
     est assez fine tant que θ varie de moins d'un tour sur Δx (sinon erreur). L'intensité au point B est proportionnelle à |total|².
     → { x[], theta[], garde[], somme[[re, im]…] (sommes partielles, en partant de 0), total [re, im], norme2 } */
  function phaseurs(o) {
    if (!o) err("paramètres manquants");
    const a = positif(o.a, "a"), h = positif(o.h, "h"), lambda = positif(o.lambda, "λ"), X = positif(o.X, "X");
    const N = o.N === undefined ? 400 : o.N, garde = o.garde || (() => true);
    if (!Number.isInteger(N) || N < 1) err("N doit être un entier ≥ 1");
    const dx = 2 * X / N, L = x => Math.hypot(x + a, h) + Math.hypot(a - x, h);
    const slope = Math.abs((Math.abs(X) + a) / Math.hypot(X + a, h) - (a - X) / Math.hypot(a - X, h));   // |L′| maximal, au bord
    if (slope * dx > lambda) err("bandes trop larges : la phase tourne de plus d'un tour sur une bande");
    const xs = [], th = [], g = [], somme = [[0, 0]];
    let re = 0, im = 0;
    for (let k = 0; k < N; k++) {
      const x = -X + (k + 0.5) * dx, t = 2 * Math.PI * L(x) / lambda, on = !!garde(x);
      xs.push(x); th.push(t); g.push(on);
      if (on) { re += dx * Math.cos(t); im += dx * Math.sin(t); }
      somme.push([re, im]);
    }
    return { x: xs, theta: th, garde: g, somme, total: [re, im], norme2: re * re + im * im, dx };
  }

  /* ---------- Dioptres et lentilles minces (étape « Dioptres et lentilles minces ») ----------
     Convention des distances algébriques : axe optique orienté dans le sens de la lumière (+x) ; p = SA ou OA (objet),
     p′ = SA′ ou OA′ (image), R = SC (centre de courbure), f′ = SF′, f = SF, toutes algébriques. Objet réel : p < 0 ; image réelle : p′ > 0.
     R = ±Infinity : surface plane.
     exces(h, d)                    triangle de base d, hauteur h : excès de l'hypoténuse sur la base, exact et h²/2d.
     hParaxial(d, λ, q)             hauteur où l'erreur de h²/2d atteint qλ (défaut λ/4).
     dioptre({n1, n2, R})           vergence, focales, conjugaison n2/p′ − n1/p = (n2 − n1)/R et grandissement, dans les conditions de Gauss.
     trace(rayon, surfaces, n0)     tracé exact d'un rayon méridien à travers des surfaces sphériques, loi de Snell-Descartes sans approximation.
     coupeAxe(r)                    abscisse où un rayon (point, direction) coupe l'axe.
     lentille({n, R1, R2, e, n0})   lentille : vergence mince (n/n0 − 1)(1/R1 − 1/R2), vergence épaisse, foyer image d'une lentille épaisse.
     formeLentille(R1, R2, a, bord) épaisseur au centre d'une lentille d'ouverture a et d'épaisseur au bord donnée ; flèches des faces.
     conjugue(p, fp)                lentille mince : p′, grandissement, positions par rapport aux foyers (Newton). */

  /* exces : s = √(d² + h²), Δ = s − d = h²/(s + d) (écrit sans soustraction, juste même pour h ≪ d) ; approx = h²/2d.
     ecart = Δ − h²/2d ≈ −h⁴/(8d³) : la première correction, négative. Exact pour le triangle rectangle. */
  function exces(h, d) {
    fini(h, "h"); positif(d, "d");
    const s = Math.hypot(d, h), exact = h * h / (s + d), approx = h * h / (2 * d);
    return { exact, approx, ecart: exact - approx, relatif: exact === 0 ? 0 : (exact - approx) / exact };
  }

  /* hParaxial(d, λ, q) : h⁴/(8d³) = qλ ⇒ h = (8 q λ d³)^¼, q défaut ¼ (critère de Rayleigh, un quart de longueur d'onde).
     Au premier ordre de la correction ; vaut tant que h ≪ d, ce qui est le cas pour λ ≪ d. */
  function hParaxial(d, lambda, q) {
    positif(d, "d"); positif(lambda, "λ"); q = q === undefined ? 0.25 : positif(q, "q");
    return Math.pow(8 * q * lambda * d * d * d, 0.25);
  }

  /* dioptre({n1, n2, R}) : V = (n2 − n1)/R (dioptries si R en m), f′ = n2/V, f = −n1/V (±Infinity si V = 0, dioptre plan).
     conj(p) = p′ par n2/p′ − n1/p = V ; p = ±Infinity → f′ ; p = 0 → 0 ; image à l'infini → ±Infinity.
     gamma(p) = n1 p′/(n2 p) ; 1 en p = 0 (limite). Conditions de Gauss : rayons proches de l'axe et peu inclinés. */
  function dioptre(o) {
    if (!o) err("dioptre : paramètres manquants");
    const n1 = indice(o.n1, "n1"), n2 = indice(o.n2, "n2"), R = o.R;
    if (typeof R !== "number" || isNaN(R) || R === 0) err("R doit être un nombre non nul, ±Infinity pour un dioptre plan");
    const V = isFinite(R) ? (n2 - n1) / R : 0;
    const fp = V === 0 ? Infinity : n2 / V, f = V === 0 ? -Infinity : -n1 / V;
    const conj = p => {
      if (typeof p !== "number" || isNaN(p)) err("p doit être un nombre");
      if (!isFinite(p)) return V === 0 ? p : fp;
      if (p === 0) return 0;
      const s = V + n1 / p;
      return s === 0 ? Infinity : n2 / s;
    };
    const gamma = p => { const pp = conj(p); if (p === 0) return 1; if (!isFinite(p)) err("objet à l'infini : grandissement non défini"); return n1 * pp / (n2 * p); };
    return { n1, n2, R, V, fp, f, conj, gamma };
  }

  /* trace(rayon, surfaces, n0) : rayon = {x, y, u} (point de départ, angle u avec l'axe en rad, |u| < π/2, vers +x) ;
     surfaces = [{x (sommet), R (= SC, ±Infinity plan), n (indice après la surface)}…] dans l'ordre ; n0 indice de départ (défaut 1).
     À chaque surface : intersection exacte avec la calotte du côté du sommet, puis Snell-Descartes en vecteurs.
     Exact en optique géométrique (rayon méridien, milieux homogènes) ; ni réflexion partielle ni diffraction.
     → { points [[x, y]…] (départ puis chaque impact), x, y, dx, dy (dernier point, direction unitaire), n } ;
       null si le rayon manque une calotte, la frappe par l'arrière, ou subit une réflexion totale. */
  function trace(rayon, surfaces, n0) {
    if (!rayon) err("rayon manquant");
    let x = fini(rayon.x, "x"), y = fini(rayon.y, "y");
    const u = fini(rayon.u, "u");
    if (!(Math.abs(u) < Math.PI / 2)) err("|u| doit être < π/2 : le rayon va vers +x");
    if (!Array.isArray(surfaces) || !surfaces.length) err("surfaces : liste non vide attendue");
    let n = n0 === undefined ? 1 : indice(n0, "n0"), dx = Math.cos(u), dy = Math.sin(u);
    const points = [[x, y]];
    for (const [k, s] of surfaces.entries()) {
      const xv = fini(s.x, "surface " + k + ".x"), R = s.R, n2 = indice(s.n, "surface " + k + ".n");
      if (typeof R !== "number" || isNaN(R) || R === 0) err("surface " + k + " : R non nul, ±Infinity pour un plan");
      let nx, ny, t;
      if (!isFinite(R)) { t = (xv - x) / dx; nx = -1; ny = 0; }
      else {
        const xc = xv + R, px = x - xc, b = dx * px + dy * y, c = px * px + y * y - R * R, disc = b * b - c;
        if (disc < 0) return null;
        t = R > 0 ? -b - Math.sqrt(disc) : -b + Math.sqrt(disc);
        const hx = x + t * dx;
        if ((hx - xc) * R >= 0) return null;                     // impact sur l'autre hémisphère : hors de la calotte
        nx = (hx - xc) / Math.abs(R); ny = (y + t * dy) / Math.abs(R);
        if (nx * dx + ny * dy > 0) { nx = -nx; ny = -ny; }       // normale tournée vers la lumière incidente
      }
      if (!(t >= -1e-12 * (1 + Math.abs(xv)))) return null;      // surface derrière le point de départ
      x += t * dx; y += t * dy;
      const ci = -(nx * dx + ny * dy), eta = n / n2, k2 = 1 - eta * eta * (1 - ci * ci);
      if (k2 < 0) return null;
      const a = eta * ci - Math.sqrt(k2);
      dx = eta * dx + a * nx; dy = eta * dy + a * ny;
      const m = Math.hypot(dx, dy); dx /= m; dy /= m;
      if (!(dx > 0)) return null;
      n = n2; points.push([x, y]);
    }
    return { points, x, y, dx, dy, n };
  }

  /* coupeAxe(r) : abscisse où la droite du dernier segment coupe y = 0 (en avant ou, pour une image virtuelle, en arrière) ;
     ±Infinity si le rayon est parallèle à l'axe. */
  function coupeAxe(r) {
    if (!r) err("rayon manquant");
    return r.dy === 0 ? (r.y === 0 ? NaN : Infinity) : r.x - r.y * r.dx / r.dy;
  }

  /* lentille({n, R1, R2, e, n0}) : faces de sommets S1 (x = 0) et S2 (x = e), R1 = S1C1, R2 = S2C2 ; n0 milieu des deux côtés (défaut 1).
     Mince : V = (n − n0)(1/R1 − 1/R2), f′ = n0/V (formule des opticiens, e ≪ |R1|, |R2|).
     Épaisse (paraxiale exacte) : V1 = (n − n0)/R1, V2 = (n0 − n)/R2, Ve = V1 + V2 − (e/n) V1 V2 ; foyer image à
     S2F′ = (n0/Ve)(1 − e V1/n). surfaces : la liste pour trace(). */
  function lentille(o) {
    if (!o) err("lentille : paramètres manquants");
    const n = indice(o.n, "n"), n0 = o.n0 === undefined ? 1 : indice(o.n0, "n0"), e = o.e === undefined ? 0 : fini(o.e, "e");
    if (e < 0) err("e doit être ≥ 0");
    const inv = (R, nom) => { if (typeof R !== "number" || isNaN(R) || R === 0) err(nom + " doit être non nul, ±Infinity pour une face plane"); return isFinite(R) ? 1 / R : 0; };
    const c1 = inv(o.R1, "R1"), c2 = inv(o.R2, "R2");
    const V = (n - n0) * (c1 - c2), V1 = (n - n0) * c1, V2 = (n0 - n) * c2, Ve = V1 + V2 - e * V1 * V2 / n;
    return { n, n0, e, R1: o.R1, R2: o.R2, V, fp: V === 0 ? Infinity : n0 / V, Ve, fpe: Ve === 0 ? Infinity : n0 / Ve,
      xFp: Ve === 0 ? Infinity : e + (n0 / Ve) * (1 - e * V1 / n),
      surfaces: x0 => { x0 = x0 === undefined ? 0 : fini(x0, "x0"); return [{ x: x0, R: o.R1, n }, { x: x0 + e, R: o.R2, n: n0 }]; } };
  }

  /* formeLentille(R1, R2, a, bord) : flèche algébrique d'une face, z(y) = R − sgn(R) √(R² − y²) (0 si plane), à la hauteur y ≤ a < |R|.
     e = épaisseur au centre telle que l'épaisseur au bord, e + z2(a) − z1(a), vaille au moins bord, et e ≥ bord. Géométrie exacte. */
  function formeLentille(R1, R2, a, bord) {
    positif(a, "a"); positif(bord, "bord");
    const z = (R, nom) => { if (typeof R !== "number" || isNaN(R) || R === 0) err(nom + " non nul"); if (isFinite(R) && Math.abs(R) <= a) err("|" + nom + "| doit dépasser l'ouverture a"); return y => isFinite(R) ? R - Math.sign(R) * Math.sqrt(R * R - y * y) : 0; };
    const z1 = z(R1, "R1"), z2 = z(R2, "R2");
    return { e: Math.max(bord, bord + z1(a) - z2(a)), z1, z2 };
  }

  /* conjugue(p, fp) : lentille mince dans un milieu unique ; 1/p′ − 1/p = 1/f′ (Descartes), γ = p′/p.
     sigma = FA = p + f′, sigmap = F′A′ = p′ − f′, sigma·sigmap = −f′² (Newton), γ = −F′A′/f′ = f′/FA.
     Conditions de Gauss. p = −f′ : image à l'infini (pp = ±Infinity, gamma = ±Infinity). */
  function conjugue(p, fp) {
    fini(p, "p"); fini(fp, "f′"); if (fp === 0) err("f′ doit être non nul");
    const s = fp + p;
    if (s === 0) return { pp: Infinity, gamma: Infinity, sigma: 0, sigmap: Infinity, reelle: null };
    const pp = p * fp / s, gamma = fp / s;
    return { pp, gamma, sigma: s, sigmap: pp - fp, reelle: pp > 0, objetReel: p < 0, droite: gamma > 0 };
  }

  /* ---------- Systèmes optiques et limites (étape « Systèmes optiques et limites ») ----------
     Mêmes conventions algébriques. Lentilles minces dans l'air (n = 1) : [{x (centre O_k), fp (f′_k)}…], dans l'ordre des x croissants.
     systeme(lentilles)             matrice de transfert paraxiale, vergence, f′, plans principaux H, H′, foyers F, F′ ; image(xA) lentille par lentille.
     rayonMince(rayon, lentilles)   tracé paraxial d'un rayon (y, u) : u′ = u − y/f′ à chaque lentille.
     RAIES, VERRES                  raies C, d, F (m) ; indices nC, nd, nF de deux verres (catalogue du fabricant).
     indiceVerre(verre, λ)          n(λ) de Cauchy A + B/λ² + C/λ⁴ passant exactement par nC, nd, nF.
     abbe(verre)                    constringence ν = (nd − 1)/(nF − nC).
     chromatique(fp, verre)         focales d'une lentille mince en C, d, F ; écart f′F − f′C.
     achromat(fp, v1, v2)           doublet mince accolé dont les focales en C et F coïncident.
     aberrationSpherique(o)         faisceau parallèle tracé exactement : foyer de chaque hauteur, tache au meilleur plan, écart de chemin.
     besselJ1(x), airy(v)           fonction de Bessel J1, et la figure d'Airy (2 J1(v)/v)².
     deuxSources(s, o)              profil de deux taches d'Airy incohérentes séparées de s (en v), creux central.
     resolution(o)                  limites de Rayleigh (1,22 λ/D), d'Abbe λ/(2n sin θ), et le retard de Fermat entre rayons extrêmes. */

  /* systeme(lentilles) : M = L_N T(d) … L_1 agit sur (y, u) du plan de la première lentille à celui de la dernière ; T(d) = [[1, d], [0, 1]],
     L(f′) = [[1, 0], [−1/f′, 1]]. V = −C. Si V ≠ 0 : f′ = 1/V, F′ = x_N − A/C, H′ = F′ − f′, F = x_1 + D/C, H = F + f′ (air : f = −f′).
     V = 0 : système afocal, f′ = Infinity, grossissement angulaire G = D (u′ = D u pour un faisceau parallèle).
     image(xA) : objet en xA (±Infinity : à l'infini), image par chaque lentille tour à tour (conjugue) ; → { etapes [{xA, xAp, gamma}], xAp, gamma }.
     Conditions de Gauss, lentilles minces : épaisseur et aberrations ignorées. Exact pour ce modèle paraxial. */
  function systeme(lentilles) {
    if (!Array.isArray(lentilles) || !lentilles.length) err("lentilles : liste non vide attendue");
    const L = lentilles.map((l, k) => {
      fini(l.x, "lentille " + k + ".x"); fini(l.fp, "lentille " + k + ".fp"); if (l.fp === 0) err("lentille " + k + " : f′ non nul");
      if (k && l.x < lentilles[k - 1].x) err("lentilles : x croissants attendus");
      return { x: l.x, fp: l.fp };
    });
    let A = 1, B = 0, Cm = 0, D = 1;
    L.forEach((l, k) => {
      if (k) { const d = l.x - L[k - 1].x; A += d * Cm; B += d * D; }             // T(d) · M
      Cm -= A / l.fp; D -= B / l.fp;                                           // L(f′) · M
    });
    const x1 = L[0].x, xN = L[L.length - 1].x, V = -Cm, afocal = Math.abs(Cm) < 1e-15;
    const r = { lentilles: L, M: [[A, B], [Cm, D]], V, afocal, fp: afocal ? Infinity : 1 / V };
    if (afocal) { r.G = D; r.xF = r.xFp = r.xH = r.xHp = null; }
    else { r.xFp = xN - A / Cm; r.xHp = r.xFp - r.fp; r.xF = x1 + D / Cm; r.xH = r.xF + r.fp; }
    r.image = xA => {
      if (typeof xA !== "number" || isNaN(xA)) err("xA doit être un nombre");
      const etapes = [];
      let a = xA, gamma = 1;
      for (const l of L) {
        let b, g;
        if (!isFinite(a)) { b = l.x + l.fp; g = null; }
        else { const c = conjugue(a - l.x, l.fp); b = isFinite(c.pp) ? l.x + c.pp : Infinity; g = c.gamma; }
        etapes.push({ xA: a, xAp: b, gamma: g });
        gamma = g === null || gamma === null ? null : gamma * g;
        a = b;
      }
      return { etapes, xAp: a, gamma };
    };
    return r;
  }

  /* rayonMince({x, y, u}, lentilles) : droite y + u (X − x) jusqu'à chaque lentille d'abscisse ≥ x, puis u ← u − y/f′ (u est la pente,
     paraxiale). → { points [[x, y]…], x, y, u } (dernier impact et pente finale). Conditions de Gauss. */
  function rayonMince(rayon, lentilles) {
    if (!rayon) err("rayon manquant");
    let x = fini(rayon.x, "x"), y = fini(rayon.y, "y"), u = fini(rayon.u, "u");
    const points = [[x, y]];
    for (const l of lentilles) {
      if (l.x < x) continue;
      y += u * (l.x - x); x = l.x; u -= y / l.fp; points.push([x, y]);
    }
    return { points, x, y, u };
  }

  /* raies de Fraunhofer : C (hydrogène, 656,27 nm), d (hélium, 587,56 nm), F (hydrogène, 486,13 nm). */
  const RAIES = Object.freeze({ C: 656.27e-9, d: 587.56e-9, F: 486.13e-9 });
  /* indices du catalogue SCHOTT, à 293 K : N-BK7 (crown borosilicaté), recalculés par sa formule de Sellmeier ; N-F2 (flint), valeurs publiées. */
  const VERRES = Object.freeze({
    crown: Object.freeze({ nC: 1.514322, nd: 1.516800, nF: 1.522376 }),
    flint: Object.freeze({ nC: 1.61506, nd: 1.62005, nF: 1.63208 }),
  });
  const verreDe = v => { const g = typeof v === "string" ? VERRES[v] : v; if (!g || ![g.nC, g.nd, g.nF].every(n => typeof n === "number" && n >= 1)) err("verre inconnu"); return g; };

  /* indiceVerre(verre, λ) : n = A + B/λ² + C/λ⁴ résolu pour passer par (λC, nC), (λd, nd), (λF, nF). Exact aux trois raies ;
     de 480 à 660 nm, s'écarte de la formule de Sellmeier du N-BK7 de moins de 2 × 10⁻⁵ (test) ; 1,6 × 10⁻⁴ dès 436 nm : à ne pas extrapoler. */
  function indiceVerre(verre, lambda) {
    const g = verreDe(verre); positif(lambda, "λ");
    const xs = [RAIES.C, RAIES.d, RAIES.F].map(l => 1 / (l * l * 1e12)), ys = [g.nC, g.nd, g.nF];   // x = 1/λ² en µm⁻²
    const x = 1 / (lambda * lambda * 1e12);
    // polynôme de degré 2 en x par Lagrange
    return ys.reduce((s, yk, k) => s + yk * xs.reduce((p, xj, j) => j === k ? p : p * (x - xj) / (xs[k] - xj), 1), 0);
  }

  function abbe(verre) { const g = verreDe(verre); return (g.nd - 1) / (g.nF - g.nC); }

  /* chromatique(fp, verre) : lentille mince de focale fp à la raie d. V ∝ n − 1 (la forme ne dépend pas de λ) : fp(λ) = fp (nd − 1)/(n(λ) − 1).
     → { C, d, F (focales), dFC = f′F − f′C, approx = −fp/ν }. Lentille mince, conditions de Gauss. */
  function chromatique(fp, verre) {
    fini(fp, "f′"); if (fp === 0) err("f′ non nul");
    const g = verreDe(verre), f = n => fp * (g.nd - 1) / (n - 1);
    return { C: f(g.nC), d: fp, F: f(g.nF), dFC: f(g.nF) - f(g.nC), approx: -fp / abbe(g) };
  }

  /* achromat(fp, v1, v2) : V = V1 + V2 (accolées, minces) et V1/ν1 + V2/ν2 = 0 ⇒ V1 = V ν1/(ν1 − ν2), V2 = −V ν2/(ν1 − ν2).
     → { fp1, fp2, V1, V2, focale(λ) } ; focale(λ) : focale du doublet à λ, par indiceVerre. Le spectre secondaire reste : f′(d) ≠ f′(C) = f′(F). */
  function achromat(fp, v1, v2) {
    fini(fp, "f′"); if (fp === 0) err("f′ non nul");
    const g1 = verreDe(v1), g2 = verreDe(v2), n1 = abbe(g1), n2 = abbe(g2);
    if (Math.abs(n1 - n2) < 1e-9) err("deux verres de même constringence ne s'achromatisent pas");
    const V = 1 / fp, V1 = V * n1 / (n1 - n2), V2 = -V * n2 / (n1 - n2);
    const focale = lambda => 1 / (V1 * (indiceVerre(g1, lambda) - 1) / (g1.nd - 1) + V2 * (indiceVerre(g2, lambda) - 1) / (g2.nd - 1));
    return { V1, V2, fp1: 1 / V1, fp2: 1 / V2, focale };
  }

  /* aberrationSpherique({surfaces, n0, a, N, x0}) : faisceau parallèle à l'axe, N rayons (défaut 41) de hauteurs h ∈ [−a, a], lancés de x0
     (défaut : 1 cm avant la première surface), tracés exactement par trace(). xP = foyer paraxial (rayon de hauteur a·10⁻⁴) ;
     foyer(h) = coupeAxe ; lsa = foyer(a) − xP (aberration longitudinale du bord). meilleur = plan où le rayon de la tache (max |y|) est minimal
     (section dorée entre foyer(a) et xP), rayon = ce rayon. chemin(h, xI) : chemin optique de x0 au point (xI, 0) ; W(h) = chemin(h) − chemin(0).
     Optique géométrique, rayons méridiens, milieux homogènes ; ni diffraction ni réflexions partielles. null si un rayon se perd. */
  function aberrationSpherique(o) {
    if (!o || !Array.isArray(o.surfaces) || !o.surfaces.length) err("surfaces attendues");
    const a = positif(o.a, "a"), N = o.N === undefined ? 41 : o.N, n0 = o.n0 === undefined ? 1 : indice(o.n0, "n0");
    if (!Number.isInteger(N) || N < 3) err("N doit être un entier ≥ 3");
    const x0 = o.x0 === undefined ? o.surfaces[0].x - 0.01 : fini(o.x0, "x0");
    const lance = h => trace({ x: x0, y: h, u: 0 }, o.surfaces, n0);
    const pr = lance(a * 1e-4), bord = lance(a);
    if (!pr || !bord) return null;
    const xP = coupeAxe(pr), hs = [], rs = [];
    for (let k = 0; k < N; k++) { const h = -a + 2 * a * k / (N - 1), r = lance(h); if (!r) return null; hs.push(h); rs.push(r); }
    const yA = (r, X) => r.y + (X - r.x) * r.dy / r.dx;
    const tache = X => rs.reduce((m, r) => Math.max(m, Math.abs(yA(r, X))), 0);
    const xB = coupeAxe(bord), lo = Math.min(xB, xP), hi = Math.max(xB, xP);
    const meilleur = hi - lo < 1e-15 ? xP : minimise(tache, lo, hi, 1e-12 * (1 + Math.abs(hi)));
    const nOf = k => k === 0 ? n0 : o.surfaces[k - 1].n;
    const chemin = (h, xI) => {
      const r = lance(h); if (!r) return null;
      let s = 0;
      for (let k = 1; k < r.points.length; k++) s += nOf(k - 1) * Math.hypot(r.points[k][0] - r.points[k - 1][0], r.points[k][1] - r.points[k - 1][1]);
      return s + r.n * Math.hypot(xI - r.x, r.y);
    };
    return { xP, lsa: xB - xP, foyer: h => { const r = lance(h); return r ? coupeAxe(r) : null; }, h: hs, rayons: rs,
      meilleur, rayon: tache(meilleur), tache, chemin, W: (h, xI) => chemin(h, xI) - chemin(a * 1e-6, xI) };
  }

  /* besselJ1(x) = (1/π) ∫₀^π cos(τ − x sin τ) dτ (intégrale de Bessel), par Simpson à 400 intervalles : erreur < 10⁻¹⁰ pour |x| < 30.
     Au-delà, erreur (pas assez de points par oscillation). */
  function besselJ1(x) {
    fini(x, "x"); if (Math.abs(x) > 30) err("|x| doit rester ≤ 30");
    const n = 400, h = Math.PI / n, f = tau => Math.cos(tau - x * Math.sin(tau));
    let s = f(0) + f(Math.PI);
    for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * f(k * h);
    return s * h / 3 / Math.PI;
  }

  /* airy(v) : I/I₀ = (2 J1(v)/v)², v = π D sin θ / λ. Ouverture circulaire sans obstruction, éclairée uniformément, diffraction de
     Fraunhofer (image au foyer d'un système sans aberration). Premier zéro en v = 3,8317, soit sin θ = 1,2197 λ/D. */
  function airy(v) { fini(v, "v"); if (Math.abs(v) < 1e-8) return 1; const j = 2 * besselJ1(v) / v; return j * j; }

  /* deuxSources(s, {vmax, N}) : deux points de même éclat, incohérents (les intensités s'ajoutent), en v = ±s/2. Profil I(v) = airy(v − s/2)
     + airy(v + s/2) sur [−vmax, vmax] (défaut s/2 + 6, plafonné à 28), N points (défaut 241). creux = I(0)/max I (1 : pas de creux).
     Le critère de Rayleigh, s = 3,8317, donne un creux de 0,735. */
  function deuxSources(s, o) {
    fini(s, "s"); if (s < 0) err("s doit être ≥ 0");
    o = o || {};
    const vmax = o.vmax === undefined ? Math.min(28, s / 2 + 6) : positif(o.vmax, "vmax"), N = o.N === undefined ? 241 : o.N;
    if (s / 2 > vmax || vmax > 29) err("s/2 ≤ vmax ≤ 29 attendu");
    if (!Number.isInteger(N) || N < 3) err("N doit être un entier ≥ 3");
    const I = v => airy(v - s / 2) + airy(v + s / 2);
    const v = [], i = [];
    for (let k = 0; k < N; k++) { const x = -vmax + 2 * vmax * k / (N - 1); v.push(x); i.push(I(x)); }
    const pic = s === 0 ? 0 : minimise(x => -I(x), 0, Math.min(s / 2 + 1, vmax), 1e-10);
    const max = Math.max(I(pic), I(0));
    return { v, I: i, creux: I(0) / max, max, pic, f: I };
  }

  /* resolution({lambda, D, n, theta, d}) : lambda dans le vide (m) ; D diamètre de la pupille (m) ; n indice côté objet ; theta demi-angle
     d'ouverture côté objet (rad) ; d séparation de deux points objets (m), pour le retard.
     rayleigh = 1,2197 λ/D (rad), angle entre deux étoiles à la limite (D ≫ λ, petits angles) ; fermatAngle = λ/D (retard d'une période) ;
     abbe = λ/(2 n sin θ) (m) ; retard = 2 n d sin θ / c (s) entre les rayons extrêmes venus de deux points séparés de d ; periodes = retard ν. */
  function resolution(o) {
    if (!o) err("paramètres manquants");
    const lambda = positif(o.lambda, "λ"), r = { lambda, nu: C.c / lambda };
    if (o.D !== undefined) { const D = positif(o.D, "D"); r.rayleigh = 1.2197 * lambda / D; r.fermatAngle = lambda / D; }
    if (o.theta !== undefined) {
      const n = o.n === undefined ? 1 : indice(o.n, "n"), th = fini(o.theta, "θ");
      if (!(th > 0 && th <= Math.PI / 2)) err("θ doit être dans ]0, π/2]");
      r.ON = n * Math.sin(th); r.abbe = lambda / (2 * r.ON);
      if (o.d !== undefined) { const d = fini(o.d, "d"); r.retard = 2 * n * Math.abs(d) * Math.sin(th) / C.c; r.periodes = r.retard * r.nu; }
    }
    return r;
  }

  /* ---------- Miroirs sphériques (étape « Miroirs sphériques ») ----------
     Axe orienté dans le sens de la lumière incidente (+x), sommet S en x = 0 ; R = SC algébrique : concave R < 0 (centre devant le
     miroir, du côté d'où vient la lumière), convexe R > 0, plan R = ±Infinity. p = SA et p′ = SA′ sur ce même axe : objet réel p < 0,
     image réelle p′ < 0 (devant le miroir, là où repart la lumière réfléchie).
     miroirSpherique(R)             foyer SF = SF′ = R/2, vergence −2/R ; conj(p) par 1/p′ + 1/p = 2/R ; image(p) : γ = −p′/p, formes au centre et de Newton.
     reflexion(rayon, R)            tracé exact d'un rayon méridien sur la calotte, loi de la réflexion sans approximation.
     foyerExact(R, h)               abscisse où un rayon parallèle à l'axe, de hauteur h, recoupe l'axe après réflexion.
     montage(elements, xA)          lentilles minces et miroirs dans l'ordre où la lumière les rencontre : images successives, sens, grandissement.
     rayonMontage(rayon, elements)  tracé paraxial d'un rayon à travers ce montage, aller et retour. */

  const rayonDeCourbure = R => { if (typeof R !== "number" || isNaN(R) || R === 0) err("R doit être un nombre non nul, ±Infinity pour un miroir plan"); return R; };

  /* miroirSpherique(R) : f = SF = SF′ = R/2 (les deux foyers sont confondus), V = −2/R (positive pour un miroir concave, qui converge).
     conj(p) = p′ par 1/p′ + 1/p = 2/R ; objet à l'infini → foyer ; plan : p′ = −p. C'est (n2/p′ − n1/p = (n2 − n1)/R) avec n2 = −n1.
     image(p), p fini : { pp, gamma = −p′/p, reelle (p′ < 0), objetReel (p < 0), droite, ca = CA, cap = CA′, sigma = FA, sigmap = FA′ } ;
     on vérifie 1/CA′ + 1/CA = 2/CS, γ = CA′/CA, FA·FA′ = f², γ = −f/FA = −FA′/f. Conditions de Gauss : rayons proches de l'axe et peu inclinés. */
  function miroirSpherique(R) {
    rayonDeCourbure(R);
    const plan = !isFinite(R), f = plan ? Infinity : R / 2, V = plan ? 0 : -2 / R;
    const conj = p => {
      if (typeof p !== "number" || isNaN(p)) err("p doit être un nombre");
      if (!isFinite(p)) return plan ? -p : f;
      if (p === 0) return 0;
      const s = (plan ? 0 : 2 / R) - 1 / p;
      return s === 0 ? Infinity : 1 / s;
    };
    const image = p => {
      fini(p, "p");
      const pp = conj(p), gamma = p === 0 ? 1 : isFinite(pp) ? -pp / p : Infinity;
      return { pp, gamma, reelle: isFinite(pp) ? pp < 0 : null, objetReel: p < 0, droite: gamma > 0,
        ca: p - R, cap: pp - R, sigma: p - f, sigmap: pp - f };
    };
    return { R, plan, nature: plan ? "plan" : R < 0 ? "concave" : "convexe", f, V, conj, image };
  }

  /* reflexion({x, y, u}, R) : rayon méridien parti de (x, y), d'angle u avec l'axe (|u| < π/2, vers +x), sur la calotte de sommet S (x = 0)
     et de centre C (x = R). Intersection exacte avec l'hémisphère qui contient S, puis d′ = d − 2 (d·n) n. Exact en optique géométrique ;
     le miroir est supposé parfaitement réfléchissant et sans épaisseur. → { points [[x, y], [xI, yI]], x, y, dx, dy } (impact et direction
     réfléchie unitaire), null si le rayon manque la calotte ou part de derrière le miroir. */
  function reflexion(rayon, R) {
    if (!rayon) err("rayon manquant");
    rayonDeCourbure(R);
    const x0 = fini(rayon.x, "x"), y0 = fini(rayon.y, "y"), u = fini(rayon.u, "u");
    if (!(Math.abs(u) < Math.PI / 2)) err("|u| doit être < π/2 : le rayon va vers +x");
    let dx = Math.cos(u), dy = Math.sin(u), t, nx, ny;
    if (!isFinite(R)) { t = -x0 / dx; nx = -1; ny = 0; }
    else {
      const px = x0 - R, b = dx * px + dy * y0, c = px * px + y0 * y0 - R * R, disc = b * b - c;
      if (disc < 0) return null;
      t = R > 0 ? -b - Math.sqrt(disc) : -b + Math.sqrt(disc);
      const hx = x0 + t * dx;
      if ((hx - R) * R >= 0) return null;                          // impact sur l'autre hémisphère : hors de la calotte
      nx = (hx - R) / Math.abs(R); ny = (y0 + t * dy) / Math.abs(R);
    }
    if (!(t >= -1e-12 * (1 + Math.abs(x0)))) return null;
    const x = x0 + t * dx, y = y0 + t * dy, k = dx * nx + dy * ny;
    dx -= 2 * k * nx; dy -= 2 * k * ny;
    const m = Math.hypot(dx, dy);
    return { points: [[x0, y0], [x, y]], x, y, dx: dx / m, dy: dy / m };
  }

  /* foyerExact(R, h) : un rayon parallèle à l'axe, de hauteur h, frappe la calotte sous l'incidence i, sin i = |h|/|R|. Le triangle isocèle
     de sommets C, I et du point F_h où le rayon réfléchi recoupe l'axe donne CF_h = |R|/(2 cos i) : x(F_h) = R (1 − 1/(2 cos i)).
     Exact (|h| < |R|). Développement : R/2 − h²/(4R) + … : F_h se rapproche du miroir quand h grandit (aberration sphérique). */
  function foyerExact(R, h) {
    rayonDeCourbure(R); fini(h, "h");
    if (!isFinite(R)) err("miroir plan : pas de foyer");
    if (!(Math.abs(h) < Math.abs(R))) err("|h| doit être < |R|");
    const s = Math.abs(h) / Math.abs(R), ci = Math.sqrt(1 - s * s);
    return R * (1 - 1 / (2 * ci));
  }

  /* montage(elements, xA) : elements = [{type: "lentille", x, fp} | {type: "miroir", x, R}…] dans l'ordre où la lumière les rencontre
     (une lentille traversée à l'aller et au retour figure deux fois). x en abscisse du laboratoire ; R = SC compté sur l'axe +x du laboratoire ;
     f′ est propre à la lentille (> 0 convergente), quel que soit le sens de la lumière. La lumière part vers +x (sens = +1) ; chaque miroir
     inverse le sens. À chaque élément, distances comptées dans le sens de la lumière incidente : p = sens·(xA − x) ; lentille : conjugue(p, f′) ;
     miroir : miroirSpherique(sens·R). Objet à l'infini (xA = ±Infinity) : image au foyer, grandissement non défini (null).
     → { etapes [{type, x, xA, xAp, gamma, sens, objetReel, reelle}], xAp, gamma, sens (sens final) }. Conditions de Gauss, éléments minces. */
  function montage(elements, xA) {
    if (!Array.isArray(elements) || !elements.length) err("elements : liste non vide attendue");
    if (typeof xA !== "number" || isNaN(xA)) err("xA doit être un nombre");
    const etapes = [];
    let a = xA, s = 1, gamma = 1;
    elements.forEach((e, k) => {
      if (!e) err("élément " + k + " manquant");
      const x = fini(e.x, "élément " + k + ".x"), p = s * (a - x);
      let pp, g, sOut;
      if (e.type === "lentille") {
        fini(e.fp, "élément " + k + ".fp"); if (e.fp === 0) err("élément " + k + " : f′ non nul");
        if (!isFinite(a)) { pp = e.fp; g = null; } else { const c = conjugue(p, e.fp); pp = c.pp; g = c.gamma; }
        sOut = s;
      } else if (e.type === "miroir") {
        const m = miroirSpherique(s * rayonDeCourbure(e.R));
        pp = m.conj(p); g = isFinite(a) ? m.image(p).gamma : null; sOut = -s;
      } else err("élément " + k + " : type « lentille » ou « miroir » attendu");
      const b = isFinite(pp) ? x + s * pp : s * pp;
      etapes.push({ type: e.type, x, xA: a, xAp: b, gamma: g, sens: s, objetReel: isFinite(a) ? p < 0 : null, reelle: isFinite(b) ? sOut * (b - x) > 0 : null });
      gamma = g === null || gamma === null ? null : gamma * g;
      a = b; s = sOut;
    });
    return { etapes, xAp: a, gamma, sens: s };
  }

  /* rayonMontage({x, y, u}, elements) : u = dy/dx, pente dans le repère du laboratoire ; la lumière part vers +x. Droite jusqu'à chaque élément
     (qui doit être en aval), puis lentille : u ← u − sens·y/f′ ; miroir : u ← −u − 2y/R, et le sens s'inverse. → { points, x, y, u, sens }.
     Conditions de Gauss : pentes et hauteurs petites, sinon reflexion() et trace() donnent le tracé exact. */
  function rayonMontage(rayon, elements) {
    if (!rayon) err("rayon manquant");
    if (!Array.isArray(elements) || !elements.length) err("elements : liste non vide attendue");
    let x = fini(rayon.x, "x"), y = fini(rayon.y, "y"), u = fini(rayon.u, "u"), s = 1;
    const points = [[x, y]];
    elements.forEach((e, k) => {
      const xe = fini(e.x, "élément " + k + ".x");
      if (s * (xe - x) < -1e-12 * (1 + Math.abs(xe))) err("élément " + k + " en amont du rayon : ordre de rencontre attendu");
      y += u * (xe - x); x = xe;
      if (e.type === "lentille") { fini(e.fp, "élément " + k + ".fp"); if (e.fp === 0) err("élément " + k + " : f′ non nul"); u -= s * y / e.fp; }
      else if (e.type === "miroir") { const R = rayonDeCourbure(e.R); u = -u - (isFinite(R) ? 2 * y / R : 0); s = -s; }
      else err("élément " + k + " : type « lentille » ou « miroir » attendu");
      points.push([x, y]);
    });
    return { points, x, y, u, sens: s };
  }

  /* ---------- L'œil et la couleur (étape « L'œil et la couleur ») ----------
     Données
       OEIL                      œil réduit : une surface réfringente, V = 60 m⁻¹, indice 4/3, longueur axiale L = n/V = 22,22 mm, R = (n − 1)/V.
       RETINE                    cônes 4,6 × 10⁶ et bâtonnets 92 × 10⁶ (Curcio et al., 1990), fibres du nerf optique 1,244 × 10⁶ (Balazsi et al., 1984),
                                 densité des cônes au centre de la fovéa 199 000 mm⁻² (Curcio, moyenne ; 100 000 à 324 000 selon l'œil).
       CIE_X, CIE_Y, CIE_Z       fonctions colorimétriques x̄, ȳ, z̄ de l'observateur de référence CIE 1931 (2°), de 380 à 780 nm par pas de 5 nm ;
                                 ȳ est la fonction V(λ) photopique de 1924.
       CIE_VP                    V′(λ) scotopique (CIE 1951), mêmes longueurs d'onde.
       KM, KMP                   efficacités lumineuses maximales : 683 lm·W⁻¹ (photopique, 555 nm), 1700 lm·W⁻¹ (scotopique, 507 nm ; 1699 selon les sources).
       PRIMAIRES_1931            primaires de la CIE, 700, 546,1 et 435,8 nm ; M : colonnes = XYZ d'une unité de chaque primaire (matrice exacte de 1931).
       SRGB                      chromaticités x, y des primaires sRGB et du blanc D65 (IEC 61966-2-1).
     L'œil humain (leçon « L'œil humain »)
       accommodation(age)        amplitude d'accommodation selon Hofstetter (1950), min, moy, max (m⁻¹), bornée à 0.
       oeil(o)                   mise au point de l'œil réduit : accommodation requise et utilisée, défocalisation, image, flou angulaire, PP et PR.
       echantillonnage(rho)      pas d'un réseau hexagonal de cônes de densité rho (m⁻²) et angle qu'il sous-tend au point nodal.
     La couleur dépend de l'intensité (leçon « La couleur dépend de l’intensité »)
       V(λ), Vp(λ)               efficacités lumineuses relatives photopique et scotopique, interpolées linéairement, 0 hors de 380–780 nm.
       mesopique(L)              coefficient m de CIE 191:2010 pour une luminance L (cd·m⁻²) et régime de vision.
       Vmes(λ, m)                efficacité mésopique normalisée, (m V + (1 − m) V′)/M(m).
     Mesurer la sensation de couleur (leçon « Mesurer la sensation de couleur »)
       cmf(λ)                    [x̄, ȳ, z̄] interpolés.
       resoudre3(M, v)           solution de M c = v (3 × 3, Cramer), null si M est singulière.
       primairesSpectrales(λs)   matrice dont les colonnes sont les XYZ de trois lumières monochromatiques de radiance unité.
       egalisation(xyz, P)       quantités des trois primaires (colonnes de P) qui égalisent le stimulus ; une quantité négative s'ajoute au test.
       melange(c, P)             XYZ du mélange P c.
       rgb1931(λ)                fonctions colorimétriques r̄, ḡ, b̄ de la CIE 1931.
       versSRGB(xyz), gammaSRGB(c)   composantes sRGB linéaires (non bornées) d'un stimulus XYZ normalisé à Y = 1 pour le blanc, puis codage d'affichage. */
  const OEIL = Object.freeze({ V: 60, n: 4 / 3, L: (4 / 3) / 60, R: (4 / 3 - 1) / 60 });
  const RETINE = Object.freeze({ cones: 4.6e6, batonnets: 92e6, fibres: 1.244e6, rhoFovea: 199000e6 });
  const CIE_X = Object.freeze([0.001368,0.002236,0.004243,0.00765,0.01431,0.02319,0.04351,0.07763,0.1344,0.2148,0.2839,0.3285,0.3483,0.3481,0.3362,0.3187,0.2908,0.2511,0.1954,0.1421,0.09564,0.05795,0.03201,0.0147,0.0049,0.0024,0.0093,0.0291,0.06327,0.1096,0.1655,0.2257,0.2904,0.3597,0.4334,0.5121,0.5945,0.6784,0.7621,0.8425,0.9163,0.9786,1.026,1.057,1.062,1.046,1.003,0.9384,0.8544,0.7514,0.6424,0.5419,0.4479,0.3608,0.2835,0.2187,0.1649,0.1212,0.0874,0.0636,0.04677,0.0329,0.0227,0.01584,0.01136,0.008111,0.00579,0.004109,0.002899,0.002049,0.00144,0.0009999,0.0006901,0.000476,0.0003323,0.0002348,0.0001662,0.0001174,0.000083,0.000059,0.000042]);
  const CIE_Y = Object.freeze([0.000039,0.000064,0.00012,0.000217,0.000396,0.00064,0.00121,0.00218,0.004,0.0073,0.0116,0.01684,0.023,0.0298,0.038,0.048,0.06,0.0739,0.09098,0.1126,0.139,0.1693,0.208,0.2586,0.323,0.4073,0.503,0.6082,0.71,0.7932,0.862,0.9149,0.954,0.9803,0.995,1,0.995,0.9786,0.952,0.9154,0.87,0.8163,0.757,0.6949,0.631,0.5668,0.503,0.4412,0.381,0.321,0.265,0.217,0.175,0.1382,0.107,0.0816,0.061,0.04458,0.032,0.0232,0.017,0.01192,0.00821,0.005723,0.004102,0.002929,0.002091,0.001484,0.001047,0.00074,0.00052,0.0003611,0.0002492,0.0001719,0.00012,0.000085,0.00006,0.000042,0.00003,0.000021,0.000015]);
  const CIE_Z = Object.freeze([0.00645,0.01055,0.02005,0.03621,0.06785,0.1102,0.2074,0.3713,0.6456,1.039,1.386,1.623,1.747,1.783,1.772,1.744,1.669,1.528,1.288,1.042,0.813,0.6162,0.4652,0.3533,0.272,0.2123,0.1582,0.1117,0.07825,0.05725,0.04216,0.02984,0.0203,0.0134,0.00875,0.00575,0.0039,0.00275,0.0021,0.0018,0.00165,0.0014,0.0011,0.001,0.0008,0.0006,0.00034,0.00024,0.00019,0.0001,0.00005,0.00003,0.00002,0.00001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const CIE_VP = Object.freeze([0.000589,0.001108,0.002209,0.00453,0.00929,0.01852,0.03484,0.0604,0.0966,0.1436,0.1998,0.2625,0.3281,0.3931,0.455,0.513,0.567,0.62,0.676,0.734,0.793,0.851,0.904,0.949,0.982,0.998,0.997,0.975,0.935,0.88,0.811,0.733,0.65,0.564,0.481,0.402,0.3288,0.2639,0.2076,0.1602,0.1212,0.0899,0.0655,0.0469,0.03315,0.02312,0.01593,0.01088,0.00737,0.00497,0.003335,0.002235,0.001497,0.001005,0.000677,0.000459,0.0003129,0.0002146,0.000148,0.0001026,0.000072,0.00005,0.000035,0.000025,0.000018,0.000013,0.000009,0.000007,0.000005,0.000003,0.000003,0.000002,0.000001,0.000001,0.000001,0.000001,0,0,0,0,0]);
  const KM = 683, KMP = 1700;
  const PRIMAIRES_1931 = Object.freeze({ lambda: Object.freeze([700e-9, 546.1e-9, 435.8e-9]),
    M: Object.freeze([[0.49, 0.31, 0.2], [0.17697, 0.8124, 0.01063], [0, 0.01, 0.99]].map(r => Object.freeze(r.map(v => v / 0.17697)))) });
  const SRGB = Object.freeze({ r: [0.64, 0.33], g: [0.3, 0.6], b: [0.15, 0.06], blanc: [0.3127, 0.329] });

  /* table(T, λ) : interpolation linéaire d'une table CIE (pas de 5 nm, 380–780 nm) ; 0 hors de la table (au-delà, ces fonctions sont < 10⁻⁵ du maximum). */
  function table(T, lambda) {
    positif(lambda, "λ");
    const i = (lambda * 1e9 - 380) / 5;
    if (i < 0 || i > 80) return 0;
    const k = Math.min(79, Math.floor(i)), t = i - k;
    return T[k] + t * (T[k + 1] - T[k]);
  }

  /* accommodation(age) : Hofstetter (1950), ajustement linéaire des mesures de Duane (1922) ; écart d'un individu à l'autre de plusieurs m⁻¹.
     Domaine : environ 8 à 60 ans ; borné à 0 au-delà. */
  function accommodation(age) {
    fini(age, "âge"); if (age < 0) err("âge doit être ≥ 0");
    const b = v => Math.max(0, v);
    return { min: b(15 - 0.25 * age), moy: b(18.5 - 0.3 * age), max: b(25 - 0.4 * age) };
  }

  /* oeil({d, A, K, Vc, D}) : d distance de l'objet devant la cornée (m, Infinity admis) ; A amplitude d'accommodation disponible (m⁻¹) ;
     K amétropie (m⁻¹ : la vergence du verre qui corrige la vision de loin ; myopie K < 0, hypermétropie K > 0), défaut 0 ;
     Vc vergence d'un verre correcteur, supposé accolé à la cornée (lentille de contact ; un verre de lunettes à 12 mm diffère de quelques %), défaut 0 ;
     D diamètre de la pupille (m), défaut 3 mm.
     Œil réduit : vergence au repos OEIL.V − K. Net si U + (V − K) + a + Vc = n/L, U = −1/d : requise = 1/d + K − Vc ; utilisée = requise bornée à [0, A].
     dV = requise − utilisée : > 0 image derrière la rétine, < 0 devant. flou = D |dV| (rad), exact au premier ordre (paraxial).
     PR et PP : distances (m) où requise = 0 et requise = A ; Infinity si la vergence correspondante est ≤ 0 (prVirtuel : point virtuel derrière l'œil). */
  function oeil(o) {
    if (!o) err("oeil : paramètres manquants");
    const d = o.d === Infinity ? Infinity : positif(o.d, "d"), A = fini(o.A, "A"), K = o.K === undefined ? 0 : fini(o.K, "K"), Vc = o.Vc === undefined ? 0 : fini(o.Vc, "Vc");
    const D = o.D === undefined ? 3e-3 : positif(o.D, "D");
    if (A < 0) err("A doit être ≥ 0");
    const U = isFinite(d) ? -1 / d : 0, requise = -U + K - Vc, utilisee = Math.min(A, Math.max(0, requise)), dV = requise - utilisee;
    const Up = U + OEIL.V - K + utilisee + Vc, image = Up > 0 ? OEIL.n / Up : Infinity;
    const far = Vc - K, near = A + Vc - K;
    return { requise, utilisee, dV, image, flou: D * Math.abs(dV), tache: D * Math.abs(dV) * OEIL.L / OEIL.n,
      pr: far > 0 ? 1 / far : Infinity, prVirtuel: far < 0, pp: near > 0 ? 1 / near : Infinity };
  }

  /* echantillonnage(rho) : réseau hexagonal de densité rho (m⁻²) ; pas s = √(2/(√3 rho)) ; angle = s/(L − R), vu du point nodal de l'œil réduit
     (le centre de courbure). Ordre de grandeur : la mosaïque réelle n'est hexagonale qu'au centre de la fovéa. */
  function echantillonnage(rho) {
    positif(rho, "rho");
    const s = Math.sqrt(2 / (Math.sqrt(3) * rho));
    return { s, angle: s / (OEIL.L - OEIL.R) };
  }

  const V = lambda => table(CIE_Y, lambda), Vp = lambda => table(CIE_VP, lambda);

  /* mesopique(L) : m = 0,7670 + 0,3334 log₁₀ L, borné à [0, 1] (CIE 191:2010). La recommandation itère sur la luminance mésopique et le rapport S/P
     de la source ; ici L tient lieu de luminance mésopique : écart de quelques % sur m au milieu du domaine. */
  function mesopique(L) {
    positif(L, "L");
    const m = Math.min(1, Math.max(0, 0.767 + 0.3334 * Math.log10(L)));
    return { m, regime: L >= 5 ? "photopique" : L <= 0.005 ? "scotopique" : "mesopique" };
  }

  /* Vmes(λ, m) : M(m) est le maximum sur la table ; une interpolation linéaire atteint son maximum en un nœud : le calcul est exact. */
  function Vmes(lambda, m) {
    fini(m, "m"); if (m < 0 || m > 1) err("m doit être entre 0 et 1");
    let M = 0;
    for (let k = 0; k < 81; k++) M = Math.max(M, m * CIE_Y[k] + (1 - m) * CIE_VP[k]);
    return (m * V(lambda) + (1 - m) * Vp(lambda)) / M;
  }

  const cmf = lambda => [table(CIE_X, lambda), table(CIE_Y, lambda), table(CIE_Z, lambda)];

  function resoudre3(M, v) {
    if (!Array.isArray(M) || M.length !== 3 || !Array.isArray(v) || v.length !== 3) err("resoudre3 : matrice 3 × 3 et vecteur de 3 attendus");
    const det = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    const d = det(M), echelle = Math.max(...M.flat().map(Math.abs)) ** 3;
    if (!(Math.abs(d) > 1e-12 * echelle)) return null;
    return [0, 1, 2].map(j => det(M.map((r, i) => r.map((x, k) => (k === j ? v[i] : x)))) / d);
  }

  /* primairesSpectrales([λ1, λ2, λ3]) : colonnes = cmf(λi). L'unité de chaque primaire est arbitraire ; elle change l'échelle des quantités, pas leur signe. */
  function primairesSpectrales(ls) {
    if (!Array.isArray(ls) || ls.length !== 3) err("trois longueurs d'onde attendues");
    const c = ls.map(cmf);
    return [0, 1, 2].map(i => c.map(col => col[i]));
  }
  const egalisation = (xyz, P) => resoudre3(P, xyz);
  const melange = (c, P) => P.map(r => r[0] * c[0] + r[1] * c[1] + r[2] * c[2]);
  const rgb1931 = lambda => egalisation(cmf(lambda), PRIMAIRES_1931.M);

  /* versSRGB(xyz) : matrice déduite des chromaticités des primaires et du blanc D65 (Y = 1) ; composantes linéaires, hors gamut si < 0 ou > 1. */
  const SRGB_M = (() => {
    const col = ([x, y]) => [x / y, 1, (1 - x - y) / y], P = [SRGB.r, SRGB.g, SRGB.b].map(col);
    const Mp = [0, 1, 2].map(i => P.map(c => c[i])), S = resoudre3(Mp, col(SRGB.blanc));
    return Mp.map(r => r.map((v, j) => v * S[j]));
  })();
  const versSRGB = xyz => resoudre3(SRGB_M, xyz);
  const gammaSRGB = c => { c = Math.min(1, Math.max(0, fini(c, "c"))); return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };

  /* ---------- Chromaticité (étape « Chromaticité ») ----------
     Le diagramme de chromaticité (leçon « Le diagramme de chromaticité »)
       chromaticite(xyz)          {x, y, z} = composantes divisées par S = X + Y + Z ; l'intensité disparaît, il reste deux nombres.
       versXYZ(x, y, Y)           le stimulus de chromaticité (x, y) et de luminance relative Y.
       locus(pas)                 lieu spectral [{lambda, x, y}] de 380 à 700 nm (au-delà de 700 nm, le point bouge de moins de 10⁻³).
       melangeDeux(a, b)          a, b = {x, y, Y} : chromaticité et luminance du mélange ; barycentre de poids S = Y/y.
       dominante(xy, blanc)       longueur d'onde dominante (ou complémentaire, sur la ligne des pourpres) et pureté d'excitation.
       complementaire(λ, blanc)   raie qui, mélangée à λ, peut donner le blanc ; null si la droite sort par la ligne des pourpres.
       dansTriangle(xy, P)        le point est-il un mélange à quantités positives des trois primaires P = [[x, y]…] ?
       aire(poly)                 aire d'un polygone (formule du lacet) ; aireLocus() : aire du domaine des couleurs réelles.
       dansLocus(xy)              le point est-il la chromaticité d'une lumière réelle ?
       couleurAffichable(x, y)    [r, g, b] sRGB 0–255 d'une chromaticité, désaturée hors du triangle ; grilleCouleurs(pas) : de quoi peindre le diagramme.
       proportionBlanc(λ1, λ2, b) part de luminance de λ1 qui, mélangée à λ2, donne le blanc b ; null si elles ne sont pas complémentaires.
       BT2020                     chromaticités des primaires de la recommandation UIT-R BT.2020 (2012), blanc D65.
     Le mécanisme de la vision des couleurs (leçon « Le mécanisme de la vision des couleurs »)
       COPONCTUELS                points de convergence des droites de confusion : protanope (0,747 ; 0,253) et deutéranope (1,08 ; −0,08),
                                  Judd (1944) d'après les égalisations de Pitt (1935) ; tritanope (0,171 ; 0), Wyszecki et Stiles (1982).
       CONES                      matrice T, LMS = T XYZ : ses colonnes inverses sont les trois points coponctuels ; échelle : L = M = S
                                  pour le blanc d'égale énergie (X = Y = Z).
       lms(xyz), fondamentales(λ) réponses des trois cônes à un stimulus, et à une raie de radiance unité.
       confusion(type, xy)        la droite de confusion du dichromate qui passe par xy : ses deux sorties du domaine réel
                                  (raie, ou ligne des pourpres) ; ce que ce dichromate ne distingue pas de xy.
       confondus(type, xyz)       les deux bouts de cette droite, dosés pour être indiscernables de xyz par ce dichromate.
       pointNeutre(type, blanc)   raies que ce dichromate confond avec le blanc.
     Physico-chimie de la vision des couleurs (leçon « Physico-chimie de la vision des couleurs »)
       PIGMENTS                   λmax des pigments humains par microspectrophotométrie (Dartnall, Bowmaker et Mollon, 1983).
       gabarit(λ, λmax)           absorbance relative d'un pigment à rétinal (A1), gabarit de Govardovskii et al. (2000), bandes α et β.
       largeur(λmax)              largeur à mi-hauteur de la bande α du gabarit (m).
       meilleurGabarit(f)         λmax du gabarit le plus proche de f(λ), et l'écart quadratique moyen.
       polyene(k, l)              modèle de l'électron libre : k doubles liaisons conjuguées, 2k électrons π dans une boîte de longueur
                                  2k l (l = 0,140 nm) ; énergie et longueur d'onde de la première absorption. */
  const XY_ = v => { const s = v[0] + v[1] + v[2]; if (!(s > 0)) err("X + Y + Z doit être > 0"); return s; };
  function chromaticite(xyz) {
    if (!Array.isArray(xyz) || xyz.length !== 3) err("chromaticite : [X, Y, Z] attendu");
    xyz.forEach((v, i) => fini(v, "XYZ"[i]));
    const s = XY_(xyz);
    return { x: xyz[0] / s, y: xyz[1] / s, z: xyz[2] / s };
  }
  function versXYZ(x, y, Y) {
    fini(x, "x"); positif(y, "y"); fini(Y, "Y"); if (Y < 0) err("Y doit être ≥ 0");
    return [x * Y / y, Y, (1 - x - y) * Y / y];
  }
  function locus(pas) {
    const p = pas === undefined ? 5e-9 : positif(pas, "pas"), out = [];
    for (let l = 380e-9; l <= 700e-9 + 1e-15; l += p) { const c = chromaticite(cmf(l)); out.push({ lambda: l, x: c.x, y: c.y }); }
    return out;
  }
  /* melangeDeux : par (35.6), les XYZ s'ajoutent ; X = x S, Y = y S, avec S = Y/y, donc x = (S_a x_a + S_b x_b)/(S_a + S_b). */
  function melangeDeux(a, b) {
    if (!a || !b) err("melangeDeux : deux lumières {x, y, Y} attendues");
    const A = versXYZ(a.x, a.y, a.Y), B = versXYZ(b.x, b.y, b.Y), M = A.map((v, i) => v + B[i]);
    const Sa = a.Y / a.y, Sb = b.Y / b.y, c = chromaticite(M);
    return { x: c.x, y: c.y, Y: M[1], xyz: M, poids: Sa / (Sa + Sb) };
  }
  /* frontiere : le lieu spectral (pas 0,5 nm) fermé par la ligne des pourpres. Segment k : de B[k] à B[k+1] ; le dernier est la ligne des pourpres. */
  const FRONTIERE = (() => locus(0.5e-9))();
  const croise = (W, d, P, Q) => {                         // demi-droite W + t d (t > 0) contre le segment PQ : {t, u} ou null
    const ex = Q.x - P.x, ey = Q.y - P.y, den = d[0] * ey - d[1] * ex;
    if (Math.abs(den) < 1e-15) return null;
    const wx = P.x - W[0], wy = P.y - W[1], t = (wx * ey - wy * ex) / den, u = (wx * d[1] - wy * d[0]) / den;
    return t > 1e-12 && u >= -1e-12 && u <= 1 + 1e-12 ? { t, u } : null;
  };
  function sortie(W, d) {                                   // où la demi-droite issue de W sort du domaine : raie ou ligne des pourpres
    const B = FRONTIERE, n = B.length;
    for (let k = 0; k < n; k++) {
      const P = B[k], Q = B[(k + 1) % n], r = croise(W, d, P, Q);
      if (r) return k === n - 1 ? { x: W[0] + r.t * d[0], y: W[1] + r.t * d[1], lambda: null, t: r.t }
        : { x: W[0] + r.t * d[0], y: W[1] + r.t * d[1], lambda: P.lambda + r.u * (Q.lambda - P.lambda), t: r.t };
    }
    return null;
  }
  const blancDe = b => { const w = b === undefined ? SRGB.blanc : b; if (!Array.isArray(w) || w.length !== 2) err("blanc : [x, y] attendu"); return w.map((v, i) => fini(v, "xy"[i])); };
  function dominante(xy, blanc) {
    const W = blancDe(blanc), C = [fini(xy[0], "x"), fini(xy[1], "y")], d = [C[0] - W[0], C[1] - W[1]], r = Math.hypot(d[0], d[1]);
    if (r < 1e-12) return { lambda: null, complementaire: false, purete: 0 };
    const s = sortie(W, d);
    if (!s || s.t < 1 - 1e-9) err("dominante : point hors du domaine des couleurs réelles");
    const purete = 1 / s.t;                                  // |WC| / |WB|
    if (s.lambda !== null) return { lambda: s.lambda, complementaire: false, purete, bord: [s.x, s.y] };
    const o = sortie(W, [-d[0], -d[1]]);
    return { lambda: o.lambda, complementaire: true, purete, bord: [s.x, s.y] };
  }
  function complementaire(lambda, blanc) {
    const W = blancDe(blanc), c = chromaticite(cmf(positif(lambda, "λ"))), s = sortie(W, [W[0] - c.x, W[1] - c.y]);
    return s && s.lambda !== null ? s.lambda : null;
  }
  function dansTriangle(xy, P) {
    if (!Array.isArray(P) || P.length !== 3) err("trois primaires [x, y] attendues");
    const [a, b, c] = P, p = xy, det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    if (Math.abs(det) < 1e-15) err("primaires alignées");
    const l1 = ((b[0] - p[0]) * (c[1] - p[1]) - (c[0] - p[0]) * (b[1] - p[1])) / det;
    const l2 = ((c[0] - p[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (c[1] - p[1])) / det;
    return l1 >= -1e-12 && l2 >= -1e-12 && 1 - l1 - l2 >= -1e-12;
  }
  function aire(poly) {
    if (!Array.isArray(poly) || poly.length < 3) err("aire : au moins trois sommets");
    let s = 0;
    poly.forEach((p, i) => { const q = poly[(i + 1) % poly.length], P = Array.isArray(p) ? p : [p.x, p.y], Q = Array.isArray(q) ? q : [q.x, q.y]; s += P[0] * Q[1] - Q[0] * P[1]; });
    return Math.abs(s) / 2;
  }
  const aireLocus = () => aire(FRONTIERE);
  /* dansLocus(xy) : le point est-il la chromaticité d'une lumière réelle (dans le lieu spectral fermé par la ligne des pourpres) ? Parité des croisements. */
  function dansLocus(xy) {
    const px = fini(xy[0], "x"), py = fini(xy[1], "y"), B = FRONTIERE; let dedans = false;
    for (let i = 0, j = B.length - 1; i < B.length; j = i++) {
      const a = B[i], b = B[j];
      if ((a.y > py) !== (b.y > py) && px < (b.x - a.x) * (py - a.y) / (b.y - a.y) + a.x) dedans = !dedans;
    }
    return dedans;
  }
  /* couleurAffichable(x, y) : [r, g, b] entiers 0–255 codés sRGB pour la chromaticité (x, y), à luminosité maximale ; hors du triangle sRGB,
     les composantes négatives sont ramenées à 0 : une approximation désaturée. grilleCouleurs(pas) : cellules carrées [x, y, rgb] (centres)
     qui touchent le domaine réel, pour peindre le diagramme. */
  function couleurAffichable(x, y) {
    const c = versSRGB(versXYZ(x, y, 1)).map(v => Math.max(0, v)), m = Math.max(...c) || 1;
    return c.map(v => Math.round(255 * gammaSRGB(v / m)));
  }
  function grilleCouleurs(pas) {
    const h = pas === undefined ? 0.01 : positif(pas, "pas"), out = [];
    for (let x = h / 2; x < 0.75; x += h) for (let y = h / 2; y < 0.85; y += h)
      if ([[0, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]].some(([a, b]) => dansLocus([x + a * h / 2, y + b * h / 2]))) out.push([x, y, couleurAffichable(x, y)]);
    return out;
  }
  /* proportionBlanc(λ1, λ2, blanc) : part Y1/(Y1 + Y2) de la luminance de la raie λ1 pour que le mélange ait la chromaticité du blanc ;
     null si les deux raies ne sont pas complémentaires à 0,002 près (le blanc hors du segment). Par (35.6) : S1/S2 = |W c2|/|W c1|, Y = S y. */
  function proportionBlanc(l1, l2, blanc) {
    const W = blancDe(blanc), a = chromaticite(cmf(positif(l1, "λ1"))), b = chromaticite(cmf(positif(l2, "λ2")));
    const da = Math.hypot(a.x - W[0], a.y - W[1]), db = Math.hypot(b.x - W[0], b.y - W[1]), ab = Math.hypot(a.x - b.x, a.y - b.y);
    if (Math.abs(da + db - ab) > 0.002 * ab) return null;
    const Ya = a.y * db, Yb = b.y * da;
    return Ya / (Ya + Yb);
  }
  const BT2020 = Object.freeze({ r: [0.708, 0.292], g: [0.17, 0.797], b: [0.131, 0.046], blanc: [0.3127, 0.329] });

  const COPONCTUELS = Object.freeze({ protan: Object.freeze([0.747, 0.253]), deutan: Object.freeze([1.08, -0.08]), tritan: Object.freeze([0.171, 0]) });
  const CONE_DE = Object.freeze({ protan: 0, deutan: 1, tritan: 2 });
  /* CONES : un protanope n'a pas de cônes L ; ajouter à un stimulus ce qui n'excite que L ne change rien pour lui. Ce stimulus est le point
     coponctuel des protanopes : colonne 0 de T⁻¹. De même M (deutéranope) et S (tritanope). Échelles : T⁻¹ (1, 1, 1) ∝ (1, 1, 1). */
  const CONES = (() => {
    const p = ["protan", "deutan", "tritan"].map(k => { const [x, y] = COPONCTUELS[k]; return [x, y, 1 - x - y]; });
    const Mc = [0, 1, 2].map(i => p.map(c => c[i])), s = resoudre3(Mc, [1, 1, 1]);
    const Ti = Mc.map(r => r.map((v, j) => v * s[j])), cols = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(e => resoudre3(Ti, e));
    return Object.freeze({ T: Object.freeze([0, 1, 2].map(i => Object.freeze(cols.map(c => c[i])))), Tinv: Object.freeze(Ti.map(Object.freeze)) });
  })();
  const lms = xyz => { if (!Array.isArray(xyz) || xyz.length !== 3) err("lms : [X, Y, Z] attendu"); return CONES.T.map(r => r[0] * xyz[0] + r[1] * xyz[1] + r[2] * xyz[2]); };
  const fondamentales = lambda => lms(cmf(lambda));
  const typeDe = t => { if (!(t in CONE_DE)) err("type : protan, deutan ou tritan"); return t; };
  /* confusion : la droite qui joint xy au point coponctuel. Les deux sorties du domaine réel, de part et d'autre de xy. */
  function confusion(type, xy) {
    const P = COPONCTUELS[typeDe(type)], C = [fini(xy[0], "x"), fini(xy[1], "y")], d = [C[0] - P[0], C[1] - P[1]];
    if (Math.hypot(d[0], d[1]) < 1e-12) err("confusion : le point coponctuel n'a pas de droite propre");
    const a = sortie(C, d), b = sortie(C, [-d[0], -d[1]]);
    return { coponctuel: P, bords: [a, b].filter(Boolean) };
  }
  /* confondus(type, xyz) : les deux bouts de la droite de confusion du stimulus xyz, dosés pour que le dichromate ne les distingue pas de lui :
     xyz + t P_k, P_k = colonne k de T⁻¹ (k = cône manquant). → [{lambda, x, y, xyz, lms}] ; seules les réponses du cône k diffèrent. */
  function confondus(type, xyz) {
    const k = CONE_DE[typeDe(type)], Pk = CONES.Tinv.map(r => r[k]), c = chromaticite(xyz), S = XY_(xyz), Ps = Pk[0] + Pk[1] + Pk[2];
    return confusion(type, [c.x, c.y]).bords.map(b => {
      const dx = Pk[0] - b.x * Ps, dy = Pk[1] - b.y * Ps;
      const tt = Math.abs(dx) > Math.abs(dy) ? (b.x * S - xyz[0]) / dx : (b.y * S - xyz[1]) / dy;
      const v = xyz.map((u, i) => u + tt * Pk[i]);
      return { lambda: b.lambda, x: b.x, y: b.y, xyz: v, lms: lms(v) };
    });
  }
  function pointNeutre(type, blanc) {
    return confusion(type, blancDe(blanc)).bords.map(s => s.lambda).filter(l => l !== null).sort((u, v) => u - v);
  }

  const PIGMENTS = Object.freeze({ S: 419.0e-9, M: 530.8e-9, L: 558.4e-9, batonnet: 496.3e-9 });
  /* gabarit : x = λmax/λ ; α = 1/(exp(A(a − x)) + exp(B(b − x)) + exp(C(c − x)) + D), A = 69,7, a = 0,8795 + 0,0459 exp(−(λmax − 300)²/11940)
     (λmax en nm), B = 28, b = 0,922, C = −14,9, c = 1,104, D = 0,674 ; β = 0,26 exp(−((λ − λβ)/d)²), λβ = 189 + 0,315 λmax,
     d = −40,5 + 0,195 λmax. Ajusté par les auteurs sur des pigments A1 de λmax entre 350 et 600 nm environ. */
  function gabarit(lambda, lmax) {
    const L = positif(lambda, "λ") * 1e9, M = positif(lmax, "λmax") * 1e9, x = M / L;
    const a = 0.8795 + 0.0459 * Math.exp(-((M - 300) ** 2) / 11940);
    const alpha = 1 / (Math.exp(69.7 * (a - x)) + Math.exp(28 * (0.922 - x)) + Math.exp(-14.9 * (1.104 - x)) + 0.674);
    const lb = 189 + 0.315 * M, d = -40.5 + 0.195 * M;
    return alpha + 0.26 * Math.exp(-(((L - lb) / d) ** 2));
  }
  function largeur(lmax) {
    const M = positif(lmax, "λmax"), f = l => 1 / (Math.exp(69.7 * (0.8795 + 0.0459 * Math.exp(-(((M * 1e9) - 300) ** 2) / 11940) - M / l))
      + Math.exp(28 * (0.922 - M / l)) + Math.exp(-14.9 * (1.104 - M / l)) + 0.674);
    const pic = f(M), moitie = (a, b) => { for (let k = 0; k < 80; k++) { const m = (a + b) / 2; if ((f(m) - pic / 2) * (f(a) - pic / 2) <= 0) b = m; else a = m; } return (a + b) / 2; };
    return moitie(M, 2 * M) - moitie(M / 2, M);
  }
  /* meilleurGabarit(f) : le λmax dont le gabarit suit le mieux f(λ) (maximum 1 attendu), de 400 à 650 nm au pas de 5 nm ; balayage de λmax
     entre lo et hi (défaut 450–550 nm) au pas de 0,5 nm. → {lmax, rms}. */
  function meilleurGabarit(f, lo, hi) {
    if (typeof f !== "function") err("meilleurGabarit : une fonction f(λ) attendue");
    const a = lo === undefined ? 450e-9 : positif(lo, "lo"), b = hi === undefined ? 550e-9 : positif(hi, "hi");
    let best = { lmax: null, rms: Infinity };
    for (let L = a; L <= b + 1e-15; L += 0.5e-9) {
      let s = 0, n = 0;
      for (let l = 400e-9; l <= 650e-9 + 1e-15; l += 5e-9) { s += (gabarit(l, L) - f(l)) ** 2; n++; }
      const r = Math.sqrt(s / n); if (r < best.rms) best = { lmax: L, rms: r };
    }
    return best;
  }
  function polyene(k, l) {
    if (!Number.isInteger(k) || k < 1) err("k : nombre entier de doubles liaisons ≥ 1");
    const b = l === undefined ? 0.140e-9 : positif(l, "l"), N = 2 * k, L = N * b;
    const E = C.h * C.h * (N + 1) / (8 * C.m_e * L * L);
    return { N, L, E, eV: E / C.e, lambda: C.h * C.c / E };
  }

  /* ---------- La rétine et les bâtonnets (étape « La rétine et les bâtonnets ») ----------
     La sensation de couleur (leçon « La sensation de couleur »)
       adaptation(stim, fond, D)  règle de von Kries, adaptation partielle : chaque réponse de cône du stimulus est multipliée par
                                  g = D/fond + (1 − D), fond = réponse du même cône au fond (lms, blanc d'égale énergie = 1, 1, 1).
                                  D = 1 : adaptation complète, le fond paraît blanc ; D = 0 : aucune. Même forme que CAT02 (CIECAM02),
                                  mais appliquée ici aux cônes de CONES : ordre de grandeur, pas un modèle d'apparence.
       antagonistes(lms)          trois signaux : clarte = (L + M)/2, rv = L − M (> 0 rougeâtre, < 0 verdâtre), jb = (L + M)/2 − S
                                  (> 0 jaunâtre, < 0 bleuâtre) ; rv = jb = 0 pour le blanc d'égale énergie. Seuls les signes servent :
                                  les vrais canaux mêlent les cônes avec d'autres poids (le violet paraît rougeâtre, ce que L − M ne donne pas).
       ombreColoree(o)            {k, lambda, D} : une lampe blanche d'égale énergie (Y = 1) et une lampe rouge monochromatique λ (défaut
                                  620 nm) de luminance k ; l'écran reçoit les deux, l'ombre portée par un objet devant la lampe rouge ne
                                  reçoit que le blanc. → fond et ombre (XYZ physiques), vue (XYZ de l'ombre après adaptation au fond),
                                  chromaticités, dominante de la vue (blanc d'égale énergie), antagonistes ; horsDomaine si la vue
                                  sort du domaine des couleurs réelles (couleur « supersaturée », dominante null).
     La physiologie de l'œil (leçon « La physiologie de l’œil »)
       CORNEE                     face avant de la cornée : rayon 7,8 mm (moyenne adulte, 7,5 à 8,0), indice 1,376.
       sousLEau(o)                {nExt, d, A, D, lunettes} : œil emmétrope ; nExt indice du milieu extérieur (défaut eau 1,333), d distance
                                  de l'objet (m, Infinity admis), A accommodation disponible (m⁻¹, défaut 0), D pupille (m, défaut 3 mm),
                                  lunettes : une vitre plane garde de l'air devant la cornée. perte = (nExt − 1)/R, (27.7a) pour la face
                                  avant ; l'objet a la vergence réduite nExt/d (dans l'eau, ou vu à travers la vitre à d/nExt : la même) ;
                                  requise = nExt/d + perte, utilisee = min(A, requise), dV = requise − utilisee, flou = D dV (rad).
       grandissementCortical(E)   Horton et Hoyt (1991) : M = 17,3/(E + 0,75) mm de cortex visuel primaire par degré, E excentricité (°).
       distanceCorticale(E)       ∫ M dE depuis la fovéa : 17,3 ln(1 + E/0,75) mm, le long d'un méridien.
     Les bâtonnets (leçon « Les bâtonnets »)
       HSP                        Hecht, Shlaer et Pirenne (1942) : 54 à 148 photons à la cornée au seuil ; transmission jusqu'aux
                                  bâtonnets q = 0,96 × 0,5 × 0,2 (réflexion cornéenne 4 %, milieux 50 %, au plus 20 % absorbés par la
                                  rétine) ; 5 à 14 photons absorbés ; environ 500 bâtonnets dans la tache ; 5 à 8 événements d'après la pente.
       poisson(n, a)              probabilité de n événements pour une moyenne a.
       auMoins(k, a)              probabilité d'au moins k événements.
       frequenceVoir(N, o)        {q, k} : probabilité qu'un éclair de N photons moyens à la cornée en fasse absorber au moins k.
       seuilPhotons(p, o)         {q, k} : N tel que frequenceVoir(N) = p.
       memeBatonnet(n, Nb)        probabilité qu'au moins deux de n photons tombent sur le même des Nb bâtonnets, répartis au hasard. */
  function adaptation(stim, fond, D) {
    const tri = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " : [L, M, S] attendu"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    tri(stim, "stimulus"); tri(fond, "fond");
    const d = D === undefined ? 1 : fini(D, "D"); if (d < 0 || d > 1) err("D doit être entre 0 et 1");
    return stim.map((s, i) => { if (!(fond[i] > 0)) err("le fond doit exciter les trois cônes"); return s * (d / fond[i] + 1 - d); });
  }
  const antagonistes = v => { if (!Array.isArray(v) || v.length !== 3) err("antagonistes : [L, M, S] attendu");
    return { clarte: (v[0] + v[1]) / 2, rv: v[0] - v[1], jb: (v[0] + v[1]) / 2 - v[2] }; };
  const versXYZdeLMS = v => CONES.Tinv.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  function ombreColoree(o) {
    const p = o || {}, k = p.k === undefined ? 0.5 : fini(p.k, "k"), l = p.lambda === undefined ? 620e-9 : positif(p.lambda, "λ");
    if (k < 0) err("k doit être ≥ 0");
    const R = cmf(l); if (!(R[1] > 0)) err("λ hors du visible");
    const blanc = [1, 1, 1], rouge = R.map(v => k * v / R[1]), fond = blanc.map((w, i) => w + rouge[i]), ombre = blanc;
    const vueLMS = adaptation(lms(ombre), lms(fond), p.D), vue = versXYZdeLMS(vueLMS);
    const c = chromaticite(vue), EE = [1 / 3, 1 / 3];
    let dom = null; try { dom = dominante([c.x, c.y], EE); } catch (e) { dom = null; }
    return { fond, ombre, vue, xyFond: chromaticite(fond), xyVue: c, dominante: dom, horsDomaine: dom === null, antagonistes: antagonistes(vueLMS) };
  }

  const CORNEE = Object.freeze({ R: 7.8e-3, n: 1.376 });
  function sousLEau(o) {
    const p = o || {}, nExt = p.nExt === undefined ? INDICE.eau : indice(p.nExt, "nExt");
    const d = p.d === undefined || p.d === Infinity ? Infinity : positif(p.d, "d"), A = p.A === undefined ? 0 : fini(p.A, "A");
    const D = p.D === undefined ? 3e-3 : positif(p.D, "D");
    if (A < 0) err("A doit être ≥ 0");
    if (nExt > CORNEE.n) err("nExt au-delà de l'indice de la cornée : la face avant deviendrait divergente, hors du modèle");
    const perte = p.lunettes ? 0 : (nExt - 1) / CORNEE.R, objet = isFinite(d) ? nExt / d : 0;
    const requise = objet + perte, utilisee = Math.min(A, Math.max(0, requise)), dV = requise - utilisee;
    return { nExt, perte, face: (CORNEE.n - (p.lunettes ? 1 : nExt)) / CORNEE.R, faceAir: (CORNEE.n - 1) / CORNEE.R, objet, requise, utilisee, dV, flou: D * Math.abs(dV),
      grossissement: p.lunettes ? nExt : 1 };
  }
  const grandissementCortical = E => { fini(E, "E"); if (E < 0) err("E doit être ≥ 0"); return 17.3 / (E + 0.75); };
  const distanceCorticale = E => { fini(E, "E"); if (E < 0) err("E doit être ≥ 0"); return 17.3 * Math.log(1 + E / 0.75); };

  const HSP = Object.freeze({ cornee: Object.freeze([54, 148]), q: 0.96 * 0.5 * 0.2, absorbes: Object.freeze([5, 14]), batonnets: 500, pente: Object.freeze([5, 8]) });
  function poisson(n, a) {
    if (!Number.isInteger(n) || n < 0) err("n : entier ≥ 0"); fini(a, "a"); if (a < 0) err("a doit être ≥ 0");
    if (a === 0) return n === 0 ? 1 : 0;
    let lf = 0; for (let i = 2; i <= n; i++) lf += Math.log(i);
    return Math.exp(n * Math.log(a) - a - lf);
  }
  function auMoins(k, a) {
    if (!Number.isInteger(k) || k < 0) err("k : entier ≥ 0");
    let s = 0; for (let n = 0; n < k; n++) s += poisson(n, a);
    return Math.max(0, 1 - s);
  }
  const optHSP = o => { const p = o || {}, q = p.q === undefined ? HSP.q : positif(p.q, "q"), k = p.k === undefined ? 6 : p.k;
    if (q > 1) err("q doit être ≤ 1"); if (!Number.isInteger(k) || k < 1) err("k : entier ≥ 1"); return { q, k }; };
  function frequenceVoir(N, o) { fini(N, "N"); if (N < 0) err("N doit être ≥ 0"); const { q, k } = optHSP(o); return auMoins(k, q * N); }
  function seuilPhotons(p, o) {
    fini(p, "p"); if (!(p > 0 && p < 1)) err("p doit être entre 0 et 1 exclus");
    const { q, k } = optHSP(o); let a = 0, b = 1;
    while (auMoins(k, b) < p) b *= 2;
    for (let i = 0; i < 100; i++) { const m = (a + b) / 2; if (auMoins(k, m) < p) a = m; else b = m; }
    return (a + b) / 2 / q;
  }
  function memeBatonnet(n, Nb) {
    if (!Number.isInteger(n) || n < 0) err("n : entier ≥ 0"); if (!Number.isInteger(Nb) || Nb < 1) err("Nb : entier ≥ 1");
    let p = 1; for (let i = 1; i < n; i++) p *= Math.max(0, 1 - i / Nb);
    return 1 - p;
  }

  /* ---------- Yeux du vivant et neurologie (étape « Yeux du vivant et neurologie ») ----------
     L'œil composé des insectes (leçon « L’œil composé des insectes »)
       ABEILLE                    l'estimation de §36-4 : œil de rayon r ≈ 3 mm, λ = 400 nm, facette de 30 µm ; mesures (Kelber et
                                  Somanathan 2019, ouvrière d'Apis mellifera) : facette de 25,2 µm au plus (20,9 µm en moyenne selon
                                  Barlow 1952), d'où la plage 20 à 25 µm ; angle entre ommatidies 0,9° à 1,6°.
       flouCompose(δ, o)          {r, lambda} : geo = δ/r (36.1), diff = λ/δ (36.2), total = geo + diff (rad). Critère grossier : on somme
                                  les deux flous, et λ/δ tient lieu de 1,22 λ/δ (premier zéro de la tache d'Airy). Ordre de grandeur.
       optimumCompose(o)          {r, lambda} : δ = √(λ r) (36.4), et le flou minimal 2 √(λ/r) (36.4a).
       rayonPourAngle(a, λ)       r = 4 λ/a² : rayon d'œil composé pour un flou minimal a, en retournant (36.4a).
     Les autres yeux (leçon « Les autres yeux »)
       NAUTILE                    œil sans cristallin d'environ 10 mm, pupille de 0,4 à 2,8 mm (sténopé).
       flouStenope(D, o)          {L, lambda, lentille} : œil de profondeur L, ouverture D. Sténopé : geo = D/L, diff = λ/D, mêmes formes que
                                  (36.1) et (36.2) ; avec un cristallin qui met au point : diff seul, λ/D (36.2a), la mosaïque des récepteurs
                                  ignorée. eclairement = (D/L)² rapporté à l'œil humain (D = 3 mm, L = distance nodale 16,7 mm de OEIL).
       optimumStenope(L, λ)       D = √(λ L) et flou 2 √(λ/L) (36.4b) ; rayleigh = 1,9 √(λ L), l'ouverture que Rayleigh (1891) trouve
                                  la meilleure en photographie : le critère de la somme sous-estime l'ouverture optimale d'un facteur 2.
     La neurologie de la vision (leçon « La neurologie de la vision »)
       motifLumiere(type, n)      excitations e d'une rangée de n ommatidies : "marche" (1 puis 3), "rampe" (1, rampe linéaire sur n/5, 3),
                                  "fente" (1, une bande de n/10 à 3, 1).
       inhibitionLaterale(e, o)   {K, l, seuil} : équations de Hartline et Ratliff, r_p = e_p − Σ_{j≠p} k_pj max(0, r_j − seuil),
                                  k_pj = K exp(−|p − j|/l)/Σ_{d≠0} exp(−|d|/l) : inhibition totale K, portée l (en ommatidies) ;
                                  une fréquence ne peut être négative : r_p est ramené à 0 s'il le devient.
                                  La rangée est prolongée de part et d'autre par ses valeurs de bord. K entre 0 et 0,95 : la
                                  solution est unique, obtenue par itération (contraction). → {r, iterations}.
       bordsMach(r)               plateaux (premier et dernier points), pic, creux, depassement = pic/plateau haut − 1,
                                  creusement = 1 − creux/plateau bas. */
  const ABEILLE = Object.freeze({ r: 3e-3, lambda: 400e-9, delta: 30e-6, facette: Object.freeze([20e-6, 25e-6]), dphi: Object.freeze([0.9 * DEG, 1.6 * DEG]) });
  const optCompose = o => { const p = o || {};
    return { r: p.r === undefined ? ABEILLE.r : positif(p.r, "r"), lambda: p.lambda === undefined ? ABEILLE.lambda : positif(p.lambda, "λ") }; };
  function flouCompose(delta, o) {
    positif(delta, "δ"); const { r, lambda } = optCompose(o);
    const geo = delta / r, diff = lambda / delta;
    return { geo, diff, total: geo + diff };
  }
  function optimumCompose(o) {
    const { r, lambda } = optCompose(o), delta = Math.sqrt(lambda * r);
    return { delta, angle: 2 * Math.sqrt(lambda / r), geo: delta / r, diff: lambda / delta };
  }
  const rayonPourAngle = (a, lambda) => 4 * positif(lambda, "λ") / (positif(a, "angle") ** 2);

  const NAUTILE = Object.freeze({ L: 10e-3, pupille: Object.freeze([0.4e-3, 2.8e-3]) });
  const OEIL_REF = Object.freeze({ D: 3e-3, L: OEIL.L - OEIL.R });
  function flouStenope(D, o) {
    positif(D, "D"); const p = o || {}, L = p.L === undefined ? NAUTILE.L : positif(p.L, "L"), lambda = p.lambda === undefined ? 550e-9 : positif(p.lambda, "λ");
    const geo = p.lentille ? 0 : D / L, diff = lambda / D;
    return { geo, diff, total: geo + diff, eclairement: (D / L) ** 2 / (OEIL_REF.D / OEIL_REF.L) ** 2 };
  }
  function optimumStenope(L, lambda) {
    positif(L, "L"); const l = lambda === undefined ? 550e-9 : positif(lambda, "λ"), D = Math.sqrt(l * L);
    return { D, angle: 2 * Math.sqrt(l / L), rayleigh: 1.9 * D };
  }

  function motifLumiere(type, n) {
    const N = n === undefined ? 80 : n; if (!Number.isInteger(N) || N < 10) err("n : entier ≥ 10");
    const bas = 1, haut = 3, m = N / 2;
    if (type === "marche") return Array.from({ length: N }, (_, i) => i < m ? bas : haut);
    if (type === "rampe") { const w = N / 5, a = m - w / 2;
      return Array.from({ length: N }, (_, i) => i < a ? bas : i >= a + w ? haut : bas + (haut - bas) * (i - a) / w); }
    if (type === "fente") { const w = Math.max(1, Math.round(N / 10)), a = Math.round(m - w / 2);
      return Array.from({ length: N }, (_, i) => i >= a && i < a + w ? haut : bas); }
    return err("motif : marche, rampe ou fente");
  }
  function inhibitionLaterale(e, o) {
    if (!Array.isArray(e) || e.length < 2) err("e : tableau d'au moins deux excitations"); e.forEach((v, i) => fini(v, "e[" + i + "]"));
    const p = o || {}, K = p.K === undefined ? 0.5 : fini(p.K, "K"), l = p.l === undefined ? 3 : positif(p.l, "l"), s = p.seuil === undefined ? 0 : fini(p.seuil, "seuil");
    if (K < 0 || K > 0.95) err("K doit être entre 0 et 0,95");
    const M = Math.ceil(8 * l), n = e.length, E = [...Array(M).fill(e[0]), ...e, ...Array(M).fill(e[n - 1])], T = E.length;
    let S = 0; const w = [0]; for (let d = 1; d <= M; d++) { w[d] = Math.exp(-d / l); S += 2 * w[d]; }
    const k = w.map(v => K * v / S);
    let r = E.slice(), it = 0;
    for (; it < 2000; it++) {
      let ecart = 0;
      const a = r.map(v => Math.max(0, v - s));
      const nr = E.map((v, i) => { let inh = 0;
        for (let d = 1; d <= M; d++) { inh += k[d] * ((i - d >= 0 ? a[i - d] : a[0]) + (i + d < T ? a[i + d] : a[T - 1])); }
        return Math.max(0, v - inh); });
      for (let i = 0; i < T; i++) ecart = Math.max(ecart, Math.abs(nr[i] - r[i]));
      r = nr; if (ecart < 1e-12) break;
    }
    return { r: r.slice(M, M + n), iterations: it + 1 };
  }
  function bordsMach(r) {
    if (!Array.isArray(r) || r.length < 2) err("r : tableau attendu");
    const bas = r[0], haut = r[r.length - 1], pic = Math.max(...r), creux = Math.min(...r);
    return { bas, haut, pic, creux, depassement: pic / haut - 1, creusement: 1 - creux / bas };
  }

  const api = Object.freeze({ INDICE, DOMAINES, PTOLEMEE, domaine, lumiere, refraction, angleCritique, differences, indiceAjuste,
    minimise, tempsTrajet, fermat, courbure, miroir,
    lame, indiceAir, route, rayonStratifie, depressionLimite, miroirCourbe, phaseurs,
    exces, hParaxial, dioptre, trace, coupeAxe, lentille, formeLentille, conjugue,
    systeme, rayonMince, RAIES, VERRES, indiceVerre, abbe, chromatique, achromat, aberrationSpherique, besselJ1, airy, deuxSources, resolution,
    miroirSpherique, reflexion, foyerExact, montage, rayonMontage,
    OEIL, RETINE, CIE_X, CIE_Y, CIE_Z, CIE_VP, KM, KMP, PRIMAIRES_1931, SRGB, accommodation, oeil, echantillonnage,
    V, Vp, mesopique, Vmes, cmf, resoudre3, primairesSpectrales, egalisation, melange, rgb1931, versSRGB, gammaSRGB,
    chromaticite, versXYZ, locus, melangeDeux, dominante, complementaire, dansTriangle, aire, aireLocus, dansLocus, proportionBlanc, couleurAffichable, grilleCouleurs, BT2020,
    COPONCTUELS, CONES, lms, fondamentales, confusion, confondus, pointNeutre, PIGMENTS, gabarit, largeur, meilleurGabarit, polyene,
    adaptation, antagonistes, ombreColoree, CORNEE, sousLEau, grandissementCortical, distanceCorticale,
    HSP, poisson, auMoins, frequenceVoir, seuilPhotons, memeBatonnet,
    ABEILLE, flouCompose, optimumCompose, rayonPourAngle, NAUTILE, flouStenope, optimumStenope,
    motifLumiere, inhibitionLaterale, bordsMach });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OptiqueGeometrique = api;
})(typeof self !== "undefined" ? self : this);

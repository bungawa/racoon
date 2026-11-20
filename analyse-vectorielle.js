/* Analyse vectorielle numérique — derivatives of fields by finite differences, shared by the lessons on fields
   (Feynman II.2 and II.3). Pure, no DOM, UMD (global AnaVec). SI throughout: the caller chooses the units of f and of x.
   A field is a function of a point p = [x, y] or [x, y, z] (an array): scalar field f(p) → number,
   vector field F(p) → array of the same length as p. Any dimension n ≥ 1.

   Derivatives (centred differences: error of order h², rounding of order ε|f|/h; h ≈ 1e-5 × the size of the system)
     partielle(f, p, i, h)          ∂f/∂x_i at p.
     gradient(f, p, h)              ∇f at p: the vector of the partial derivatives.
     directionnelle(f, p, u, h)     d f/ds along the direction u (normalised here): (f(p + h û) − f(p − h û)) / 2h.
                                    Equals ∇f · û to order h²: a test of the gradient that never uses the axes.
     divergence(F, p, h)            ∇ · F = Σ ∂F_i/∂x_i.
     rotationnel(F, p, h)           ∇ × F, 3 components (a field of the plane is completed with z = 0 and F_z = 0).
     laplacien(f, p, h)             ∇²f = Σ ∂²f/∂x_i², second differences; default h = 1e-3 × the size of the system.
     laplacienVectoriel(F, p, h)    ∇²F, the Laplacian of each Cartesian component (true in Cartesian components only).
   Vector helpers
     scalaire(a, b), norme(a), unitaire(a).
   Field lines
     ligneDeChamp(F, p0, ds, n, sens, arret)
                                    points of the line through p0 tangent to F, n steps of length ds (Integ.rk4,
                                    fourth-order Runge–Kutta, on dp/ds = F/|F|), sens = +1 along F, −1 against. Stops before n where
                                    |F| = 0 or where the direction turns back within a step (a point of equilibrium, where no
                                    direction is defined): the last point is then within ds of it. Stops also after the first
                                    point p where arret(p) is true (optional: out of a frame, on a sink).
   Grids
     grille(f, x0, x1, nx, y0, y1, ny)  values of f on nx × ny points (rows y, columns x), with min and max: a heat map.
     isolignes(f, x0, x1, nx, y0, y1, ny, niveau)  the level line f = niveau, as segments [[x, y], [x, y]] (marching
                                    squares on the grid, linear interpolation on each edge: error of order the cell², the
                                    ambiguous saddle cells are cut one fixed way; a segment of zero length is dropped).
                                    Isotherms, equipotentials.
   Paths, line and surface integrals (midpoint rules: error of order 1/n², exact for a field linear along each piece)
     cercle(c, R), rectangle(x0, y0, x1, y1)
                                    closed paths of the plane, t ∈ [0, 1] → point, run counterclockwise (the normal of the
                                    surface they bound is +z, right-hand rule).
     circulation(F, chemin, n)      ∫ F · ds along chemin(t), t from 0 to 1, cut into n chords: Σ F(middle) · Δs.
                                    On a closed path, the circulation ∮ F · ds (Feynman II.3.5).
     fluxPlan(F, chemin, n)         flux of a plane field out of a closed counterclockwise path: Σ F(middle) · n Δs, n Δs = (Δy, −Δx).
     integraleRectangle(f, x0, x1, y0, y1, n)   ∬ f dx dy, n × n cells.
     integraleDisque(f, c, R, n)    ∬ f dA over the disc, n rings × 4n sectors (polar coordinates).
   Surfaces and volumes of space (same midpoint rule; Feynman II.3.2–3.3)
     fluxParallelogramme(F, c, u, v, n)  ∬ F · n da over the parallelogram c + s u + t v (s, t ∈ [−½, ½]), normal oriented
                                    along u × v (swap u and v to reverse it), n × n cells: Σ F(middle) · (u × v)/n².
     fluxCube(F, c, a, n)           outward flux through each face of the cube of centre c and side a, n × n cells per face:
                                    { faces: [+x, −x, +y, −y, +z, −z], total }.
     integraleCube(f, c, a, n)      ∭ f dV over that cube, n³ cells.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const Integ = typeof module !== "undefined" && module.exports ? require("./lecons/integration.js") : root.Integ;
  const err = m => { throw new Error("analyse-vectorielle : " + m); };
  const pas = (p, h) => {
    if (!Array.isArray(p) || p.length < 1 || !p.every(Number.isFinite)) err("point invalide " + JSON.stringify(p));
    if (h === undefined) return 1e-5 * Math.max(1, ...p.map(Math.abs));
    if (!(h > 0) || !Number.isFinite(h)) err("pas h > 0 attendu, reçu " + h);
    return h;
  };
  const decale = (p, i, d) => p.map((x, j) => j === i ? x + d : x);

  const scalaire = (a, b) => { if (a.length !== b.length) err("dimensions différentes"); return a.reduce((s, x, i) => s + x * b[i], 0); };
  const norme = a => Math.hypot(...a);
  const unitaire = a => { const n = norme(a); if (!(n > 0)) err("vecteur nul : pas de direction"); return a.map(x => x / n); };

  function partielle(f, p, i, h) {
    h = pas(p, h);
    if (!(Number.isInteger(i) && i >= 0 && i < p.length)) err("indice " + i + " hors de 0…" + (p.length - 1));
    return (f(decale(p, i, h)) - f(decale(p, i, -h))) / (2 * h);
  }
  function gradient(f, p, h) { h = pas(p, h); return p.map((_, i) => partielle(f, p, i, h)); }
  function directionnelle(f, p, u, h) {
    h = pas(p, h);
    if (!Array.isArray(u) || u.length !== p.length) err("direction de même dimension que le point attendue");
    const e = unitaire(u);
    return (f(p.map((x, i) => x + h * e[i])) - f(p.map((x, i) => x - h * e[i]))) / (2 * h);
  }
  function composante(F, i) {
    return q => { const v = F(q); if (!Array.isArray(v) || v.length !== q.length) err("le champ doit rendre un vecteur de même dimension que le point"); return v[i]; };
  }
  function divergence(F, p, h) { h = pas(p, h); return p.reduce((s, _, i) => s + partielle(composante(F, i), p, i, h), 0); }
  function rotationnel(F, p, h) {
    if (p.length !== 2 && p.length !== 3) err("rotationnel : point du plan ou de l'espace attendu");
    const plan = p.length === 2, P = plan ? [...p, 0] : p;
    const G = plan ? q => [...F([q[0], q[1]]), 0] : F;
    h = pas(P, h);
    const d = (i, j) => partielle(composante(G, i), P, j, h);   // ∂G_i/∂x_j
    return [d(2, 1) - d(1, 2), d(0, 2) - d(2, 0), d(1, 0) - d(0, 1)];
  }

  function ligneDeChamp(F, p0, ds, n, sens, arret) {
    pas(p0, 1);
    if (!(ds > 0)) err("pas ds > 0 attendu");
    if (!(Number.isInteger(n) && n >= 1)) err("nombre de pas entier ≥ 1 attendu");
    const s = sens === undefined ? 1 : sens;
    if (s !== 1 && s !== -1) err("sens = +1 ou −1");
    if (arret !== undefined && typeof arret !== "function") err("arret : fonction p → booléen attendue");
    let k = [];                                                    // the four slopes of the step, in order
    const dir = (t, q) => { const v = F(q), m = norme(v), d = m > 0 && Number.isFinite(m) ? v.map(x => s * x / m) : null; k.push(d); return d; };
    const pts = [p0.slice()];
    let p = p0.slice();
    for (let i = 0; i < n; i++) {
      k = [];
      const q = Integ.rk4(dir, 0, p, ds);
      if (!q || scalaire(k[0], k[3]) < 0) break;                   // the step would cross a sink
      p = q;
      pts.push(p);
      if (arret && arret(p)) break;
    }
    return pts;
  }

  function grille(f, x0, x1, nx, y0, y1, ny) {
    if (!(Number.isInteger(nx) && nx >= 2 && Number.isInteger(ny) && ny >= 2)) err("grille : au moins 2 × 2 points");
    if (![x0, x1, y0, y1].every(Number.isFinite) || x1 === x0 || y1 === y0) err("grille : bornes finies et distinctes attendues");
    let min = Infinity, max = -Infinity;
    const v = [];
    for (let j = 0; j < ny; j++) {
      const y = y0 + (y1 - y0) * j / (ny - 1), ligne = [];
      for (let i = 0; i < nx; i++) {
        const z = f([x0 + (x1 - x0) * i / (nx - 1), y]);
        ligne.push(z);
        if (z < min) min = z;
        if (z > max) max = z;
      }
      v.push(ligne);
    }
    return { v, min, max };
  }

  /* second derivatives (II.2.7): Σ (f(p + h e_i) − 2 f(p) + f(p − h e_i)) / h², error of order h², rounding ε|f|/h²:
     the default step is larger than for a first derivative, 1e-3 × the size of the system */
  function laplacien(f, p, h) {
    h = h === undefined ? 100 * pas(p) : pas(p, h);
    const f0 = f(p);
    return p.reduce((s, _, i) => s + (f(decale(p, i, h)) - 2 * f0 + f(decale(p, i, -h))) / (h * h), 0);
  }
  /* ∇²F of a vector field, component by component: valid in Cartesian components only (II.2.8) */
  function laplacienVectoriel(F, p, h) { return p.map((_, i) => laplacien(composante(F, i), p, h)); }

  /* ---------- paths, line and surface integrals (II.3.5–3.8) ---------- */
  const entier = (n, nom) => { if (!(Number.isInteger(n) && n >= 1)) err(nom + " : nombre entier ≥ 1 attendu, reçu " + n); return n; };
  function cercle(c, R) {
    pas(c, 1);
    if (c.length !== 2 || !(R > 0)) err("cercle : centre du plan et rayon R > 0 attendus");
    return t => [c[0] + R * Math.cos(2 * Math.PI * t), c[1] + R * Math.sin(2 * Math.PI * t)];
  }
  function rectangle(x0, y0, x1, y1) {
    if (![x0, y0, x1, y1].every(Number.isFinite) || !(x1 > x0 && y1 > y0)) err("rectangle : x0 < x1 et y0 < y1 attendus");
    const P = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    return t => { const u = Math.min(Math.max(t, 0), 1) * 4, k = Math.min(Math.floor(u), 3), f = u - k;
      return [P[k][0] + f * (P[k + 1][0] - P[k][0]), P[k][1] + f * (P[k + 1][1] - P[k][1])]; };
  }
  function cordes(F, chemin, n, terme) {
    if (typeof chemin !== "function") err("chemin : fonction t ∈ [0, 1] → point attendue");
    entier(n, "circulation");
    let s = 0, a = chemin(0);
    for (let k = 1; k <= n; k++) {
      const b = chemin(k / n), m = a.map((x, i) => (x + b[i]) / 2), v = F(m);
      if (!Array.isArray(v) || v.length !== m.length) err("le champ doit rendre un vecteur de même dimension que le point");
      s += terme(v, a, b);
      a = b;
    }
    return s;
  }
  const circulation = (F, chemin, n) => cordes(F, chemin, n, (v, a, b) => v.reduce((s, x, i) => s + x * (b[i] - a[i]), 0));
  const fluxPlan = (F, chemin, n) => cordes(F, chemin, n, (v, a, b) => {
    if (a.length !== 2) err("fluxPlan : chemin du plan attendu");
    return v[0] * (b[1] - a[1]) - v[1] * (b[0] - a[0]);
  });
  function integraleRectangle(f, x0, x1, y0, y1, n) {
    rectangle(x0, y0, x1, y1); entier(n, "integraleRectangle");
    const dx = (x1 - x0) / n, dy = (y1 - y0) / n;
    let s = 0;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) s += f([x0 + (i + 0.5) * dx, y0 + (j + 0.5) * dy]);
    return s * dx * dy;
  }
  function integraleDisque(f, c, R, n) {
    cercle(c, R); entier(n, "integraleDisque");
    const m = 4 * n, dr = R / n, dt = 2 * Math.PI / m;
    let s = 0;
    for (let j = 0; j < n; j++) {
      const r = (j + 0.5) * dr;
      for (let k = 0; k < m; k++) { const t = (k + 0.5) * dt; s += f([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]) * r; }
    }
    return s * dr * dt;
  }

  /* ---------- flux through surfaces of space, volume integrals (II.3.2–3.3) ---------- */
  const espace = (p, nom) => { if (!Array.isArray(p) || p.length !== 3 || !p.every(Number.isFinite)) err(nom + " : vecteur de l'espace (3 composantes finies) attendu"); return p; };
  function fluxParallelogramme(F, c, u, v, n) {
    espace(c, "centre"); espace(u, "u"); espace(v, "v"); entier(n, "fluxParallelogramme");
    const N = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    if (!(norme(N) > 0)) err("fluxParallelogramme : u et v colinéaires, pas de surface");
    let s = 0;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const a = (i + 0.5) / n - 0.5, b = (j + 0.5) / n - 0.5, p = c.map((x, k) => x + a * u[k] + b * v[k]), w = F(p);
      if (!Array.isArray(w) || w.length !== 3) err("le champ doit rendre un vecteur de l'espace");
      s += scalaire(w, N);
    }
    return s / (n * n);
  }
  function fluxCube(F, c, a, n) {
    espace(c, "centre"); if (!(a > 0) || !Number.isFinite(a)) err("fluxCube : côté a > 0 attendu"); entier(n, "fluxCube");
    const e = k => [0, 1, 2].map(i => i === k ? a : 0), faces = [];
    for (let k = 0; k < 3; k++) for (const s of [1, -1]) {
      const u = e((k + 1) % 3), v = e((k + 2) % 3), centre = c.map((x, i) => i === k ? x + s * a / 2 : x);   // u × v = a² e_k
      faces.push(s * fluxParallelogramme(F, centre, u, v, n));
    }
    return { faces, total: faces.reduce((x, y) => x + y, 0) };
  }
  function integraleCube(f, c, a, n) {
    espace(c, "centre"); if (!(a > 0) || !Number.isFinite(a)) err("integraleCube : côté a > 0 attendu"); entier(n, "integraleCube");
    const d = a / n, x0 = c.map(x => x - a / 2);
    let s = 0;
    for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) s += f([x0[0] + (i + 0.5) * d, x0[1] + (j + 0.5) * d, x0[2] + (k + 0.5) * d]);
    return s * d * d * d;
  }

  function isolignes(f, x0, x1, nx, y0, y1, ny, niveau) {
    if (!Number.isFinite(niveau)) err("isolignes : niveau fini attendu");
    const G = grille(f, x0, x1, nx, y0, y1, ny).v, X = i => x0 + (x1 - x0) * i / (nx - 1), Y = j => y0 + (y1 - y0) * j / (ny - 1);
    const segs = [];
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const c = [[X(i), Y(j), G[j][i]], [X(i + 1), Y(j), G[j][i + 1]], [X(i + 1), Y(j + 1), G[j + 1][i + 1]], [X(i), Y(j + 1), G[j + 1][i]]];
      const pts = [];
      for (let k = 0; k < 4; k++) {
        const a = c[k], b = c[(k + 1) % 4], da = a[2] - niveau, db = b[2] - niveau;
        if ((da < 0) !== (db < 0)) { const t = da / (da - db); pts.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]); }
      }
      if (pts.length === 2) { if (pts[0][0] !== pts[1][0] || pts[0][1] !== pts[1][1]) segs.push(pts); }
      else if (pts.length === 4) segs.push([pts[0], pts[1]], [pts[2], pts[3]]);
    }
    return segs;
  }

  const api = { partielle, gradient, directionnelle, divergence, rotationnel, laplacien, laplacienVectoriel, scalaire, norme, unitaire, ligneDeChamp, grille, isolignes,
    cercle, rectangle, circulation, fluxPlan, integraleRectangle, integraleDisque,
    fluxParallelogramme, fluxCube, integraleCube };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AnaVec = api;
})(typeof self !== "undefined" ? self : this);

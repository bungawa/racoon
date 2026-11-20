/* FluidesParfait — l'étape « Le fluide parfait » (II.40.1 à 40.5, « l'eau sèche ») du monde « Mécanique des fluides ».
   Pur, sans DOM, UMD (global FluidesParfait). SI partout. Module à part de Fluides parce qu'il a deux dépendances de plus :
   les dérivées et les circulations viennent d'AnaVec (/analyse-vectorielle.js), les pas de temps d'Integ.rk4
   (/lecons/integration.js). Une page charge /lecons/integration.js, /analyse-vectorielle.js, /fluides.js puis ce module.
   Champs plans : un point p = [x, y] (ou [r, z] dans une coupe verticale), une vitesse en m·s⁻¹.
   API
     seau(omega, R, h0, g)      eau d'un seau de rayon R, profondeur h0 au repos, en rotation d'ensemble à omega. Dans le
                                référentiel tournant φ = g z − ω² r²/2. → { phi([r, z]), zs(r) : surface libre à volume
                                conservé, p([r, z], rho, p0), creux = zs(R) − zs(0), omegaMax : le fond se découvre au-delà }.
     defautEquilibre(rho, phi, x0, z0, x1, z1, n)   ∮ ρ ∇φ · ds sur le rectangle, sens trigonométrique (Pa) : nul pour toute
                                boucle si et seulement si une pression vérifie ∇p = −ρ∇φ (40.1).
     convective(F, p, h)        (v · ∇) v en p : Σ_j v_j ∂v/∂x_j ; dans un écoulement stationnaire, toute l'accélération.
     trajectoire(F, p0, dt, n)  trajectoire d'une particule dans le champ stationnaire F : n pas d'Integ.rk4 sur dp/dt = F(p).
     venturi(Q, D1, D2, rho)    conduite de diamètre D1 rétrécie à D2, débit volumique Q : { A1, A2, v1, v2 (40.15),
                                dp = p1 − p2 (40.14) }.
     torricelli(h, g, r)        vitesse de sortie à h sous la surface, r = section du jet / section de la cuve (0 par
                                défaut) : √(2gh/(1 − r²)), quasi stationnaire.
     vidange(A, a, h0, Cc, g, dt)   niveau d'une cuve qui se vide, A sa section, a le trou, Cc la contraction du jet :
                                dh/dt = −(Cc a/A) torricelli(h, g, Cc a/A), par Integ.rk4 jusqu'à h = 0 → { t, h, T }.
     tempsVidange(A, a, h0, Cc, g)   la durée exacte de cette équation : (A/(Cc a)) √(2 h0 (1 − r²)/g).
     cylindreCirculation(U, R, G)   écoulement irrotationnel autour d'un cylindre de rayon R : uniforme U selon +x, doublet,
                                circulation G (sens trigonométrique > 0). → { F(p), psi(p), cp(p) = 1 − v²/U²,
                                force(rho, n) : force de pression par unité de longueur { Fx, Fy }, n points milieux,
                                arrets : les points d'arrêt }. Exact : Fx = 0 (d'Alembert), Fy = −ρ U G (Kutta–Joukowski).
     baignoire(G, g)            surface libre au-dessus d'un tourbillon libre : z(r) − z(∞) = −G²/(8π² g r²).
     vitesseTourbillons(vs, p, delta)   vitesse en p due aux tourbillons plans vs = [[x, y, G]], chacun lissé sur delta
                                (G/(2π (r² + δ²)) au lieu de G/(2π r²)) ; delta = 0 : tourbillons ponctuels.
     evolueTourbillons(vs, pts, dt, delta)   un pas d'Integ.rk4 : les tourbillons (chacun poussé par les autres) et les
                                traceurs pts, portés par l'écoulement → { vs, pts } (nouveaux tableaux).
     circulationBoucle(vs, pts, delta)   Σ v(milieu) · Δs le long du polygone fermé pts : circulation d'une boucle matérielle.
     raffineBoucle(pts, lmax)   le polygone fermé avec des points ajoutés là où un côté dépasse lmax (boucle étirée).
     vitessePaire(G, d)         vitesse de deux tourbillons ±G à la distance d : |G|/(2π d).
     vitesseAnneau(G, R, a)     anneau de tourbillon mince, rayon R, cœur a ≪ R à tourbillon uniforme (Kelvin) :
                                |G|/(4π R) (ln(8R/a) − 1/4). */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const A = node ? require("./analyse-vectorielle.js") : root.AnaVec;
  const I = node ? require("./lecons/integration.js") : root.Integ;
  const err = m => { throw new Error("fluides-parfait: " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };

  function seau(omega, R, h0, g) {
    fini(omega, "ω"); positif(R, "R"); positif(h0, "h0"); positif(g, "g");
    const w2 = omega * omega, omegaMax = Math.sqrt(4 * g * h0) / R;
    if (Math.abs(omega) > omegaMax * (1 + 1e-12)) err("au-delà de " + omegaMax.toFixed(3) + " rad·s⁻¹ le fond se découvre au centre");
    const zs = r => h0 + w2 * (r * r - R * R / 2) / (2 * g);       // moyenne sur le disque = h0 : le volume est conservé
    return { omegaMax, zs, creux: w2 * R * R / (2 * g),
      phi: p => g * p[1] - w2 * p[0] * p[0] / 2,
      p: (q, rho, p0) => (p0 || 0) + positif(rho, "ρ") * g * (zs(q[0]) - q[1]) };
  }
  function defautEquilibre(rho, phi, x0, z0, x1, z1, n) {
    if (typeof rho !== "function" || typeof phi !== "function") err("rho et phi : fonctions de [x, z] attendues");
    const h = 1e-6 * Math.max(1, Math.abs(x1 - x0), Math.abs(z1 - z0));
    return A.circulation(q => { const r = rho(q); return A.gradient(phi, q, h).map(c => r * c); }, A.rectangle(x0, z0, x1, z1), n || 400);
  }
  function convective(F, p, h) {
    const v = F(p);
    if (!Array.isArray(v) || v.length !== p.length) err("le champ doit rendre un vecteur de même dimension que le point");
    return v.map((_, i) => v.reduce((s, vj, j) => s + vj * A.partielle(q => F(q)[i], p, j, h), 0));
  }
  function trajectoire(F, p0, dt, n) {
    fini(dt, "dt"); if (!(Number.isInteger(n) && n >= 1)) err("n entier ≥ 1 attendu");
    const pts = [p0.slice()]; let p = p0.slice();
    for (let k = 0; k < n; k++) { p = I.rk4((t, y) => F(y), 0, p, dt); if (!p || !p.every(Number.isFinite)) break; pts.push(p); }
    return pts;
  }
  function venturi(Q, D1, D2, rho) {
    fini(Q, "Q"); positif(D1, "D1"); positif(D2, "D2"); positif(rho, "ρ");
    const A1 = Math.PI * D1 * D1 / 4, A2 = Math.PI * D2 * D2 / 4, v1 = Q / A1, v2 = Q / A2;
    return { A1, A2, v1, v2, dp: rho * (v2 * v2 - v1 * v1) / 2 };
  }
  function torricelli(h, g, r) {
    positif(g, "g"); if (!(fini(h, "h") >= 0)) err("h ≥ 0 attendu");
    r = r || 0; if (!(r >= 0 && r < 1)) err("rapport des sections r dans [0, 1[ attendu");
    return Math.sqrt(2 * g * h / (1 - r * r));
  }
  function tempsVidange(A0, a, h0, Cc, g) {
    positif(A0, "A"); positif(a, "a"); positif(h0, "h0"); positif(Cc, "Cc"); positif(g, "g");
    const r = Cc * a / A0; if (!(r < 1)) err("le jet doit être plus étroit que la cuve");
    return Math.sqrt(2 * h0 * (1 - r * r) / g) / r;
  }
  function vidange(A0, a, h0, Cc, g, dt) {
    const T = tempsVidange(A0, a, h0, Cc, g), r = Cc * a / A0;
    positif(dt, "dt");
    const t = [0], h = [h0], f = (s, y) => [-r * torricelli(Math.max(y[0], 0), g, r)];
    let y = [h0], s = 0;
    for (let k = 0; k < 1e6 && y[0] > 0; k++) {
      const y1 = I.rk4(f, s, y, dt);
      if (y1[0] <= 0) {                        // dernier pas : √h décroît linéairement, il s'annule après 2√h/k
        const kk = r * Math.sqrt(2 * g / (1 - r * r));
        s += Math.min(dt, 2 * Math.sqrt(y[0]) / kk); t.push(s); h.push(0); break;
      }
      s += dt; y = y1; t.push(s); h.push(y[0]);
    }
    return { t, h, T };
  }
  function cylindreCirculation(U, R, G) {
    positif(U, "U"); positif(R, "R"); fini(G, "G");
    const k = G / (2 * Math.PI), R2 = R * R;
    const F = p => { const [x, y] = p, r2 = x * x + y * y, r4 = r2 * r2;
      return [U * (1 - R2 * (x * x - y * y) / r4) - k * y / r2, -2 * U * R2 * x * y / r4 + k * x / r2]; };
    const psi = p => { const r2 = p[0] * p[0] + p[1] * p[1]; return U * p[1] * (1 - R2 / r2) - k * Math.log(r2 / R2) / 2; };
    const cp = p => { const v = F(p); return 1 - (v[0] * v[0] + v[1] * v[1]) / (U * U); };
    function force(rho, n) {
      positif(rho, "ρ"); n = n || 720;
      let Fx = 0, Fy = 0;
      for (let i = 0; i < n; i++) {
        const th = 2 * Math.PI * (i + 0.5) / n, c = Math.cos(th), s = Math.sin(th);
        const p = -0.5 * rho * U * U * (1 - cp([R * c, R * s]));     // p − (p∞ + ½ρU²) : la constante ne donne aucune force
        Fx -= p * c * R * 2 * Math.PI / n; Fy -= p * s * R * 2 * Math.PI / n;
      }
      return { Fx, Fy };
    }
    const s = G / (4 * Math.PI * U * R), arrets = [];
    if (Math.abs(s) <= 1) { const a = Math.asin(s); arrets.push([R * Math.cos(a), R * Math.sin(a)], [-R * Math.cos(a), R * Math.sin(a)]); }
    else { const b = k / U; arrets.push([0, (b + Math.sign(G) * Math.sqrt(b * b - 4 * R2)) / 2]); }
    return { F, psi, cp, force, arrets };
  }
  function baignoire(G, g) {
    fini(G, "G"); positif(g, "g");
    return r => -G * G / (8 * Math.PI * Math.PI * g * positif(r, "r") * r);
  }
  function vitesseTourbillons(vs, p, delta) {
    const d2 = (delta || 0) * (delta || 0);
    let u = 0, v = 0;
    for (const [x, y, G] of vs) {
      const dx = p[0] - x, dy = p[1] - y, r2 = dx * dx + dy * dy + d2;
      if (r2 === 0) continue;                                      // un tourbillon ponctuel ne se déplace pas lui-même
      const k = G / (2 * Math.PI * r2); u -= k * dy; v += k * dx;
    }
    return [u, v];
  }
  function evolueTourbillons(vs, pts, dt, delta) {
    fini(dt, "dt");
    const nv = vs.length, G = vs.map(w => w[2]);
    const etat = [];
    for (const q of vs.concat(pts)) etat.push(q[0], q[1]);
    const f = (t, y) => {
      const cur = G.map((g, i) => [y[2 * i], y[2 * i + 1], g]), out = new Array(y.length);
      for (let i = 0; i < y.length / 2; i++) {
        const w = vitesseTourbillons(i < nv ? cur.filter((_, j) => j !== i) : cur, [y[2 * i], y[2 * i + 1]], delta);
        out[2 * i] = w[0]; out[2 * i + 1] = w[1];
      }
      return out;
    };
    const y = I.rk4(f, 0, etat, dt);
    return { vs: G.map((g, i) => [y[2 * i], y[2 * i + 1], g]), pts: pts.map((_, k) => [y[2 * (nv + k)], y[2 * (nv + k) + 1]]) };
  }
  function circulationBoucle(vs, pts, delta) {
    if (!Array.isArray(pts) || pts.length < 3) err("boucle : au moins 3 points");
    let c = 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length], w = vitesseTourbillons(vs, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], delta);
      c += w[0] * (b[0] - a[0]) + w[1] * (b[1] - a[1]);
    }
    return c;
  }
  function raffineBoucle(pts, lmax) {
    positif(lmax, "lmax");
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length], k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / lmax));
      for (let j = 0; j < k; j++) out.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]);
    }
    return out;
  }
  const vitessePaire = (G, d) => Math.abs(fini(G, "G")) / (2 * Math.PI * positif(d, "d"));
  function vitesseAnneau(G, R, a) {
    fini(G, "G"); positif(R, "R"); positif(a, "a");
    if (!(a < R)) err("le cœur doit être plus fin que l'anneau (a < R)");
    return Math.abs(G) / (4 * Math.PI * R) * (Math.log(8 * R / a) - 0.25);
  }

  const api = Object.freeze({ seau, defautEquilibre, convective, trajectoire, venturi, torricelli, vidange, tempsVidange,
    cylindreCirculation, baignoire, vitesseTourbillons, evolueTourbillons, circulationBoucle, raffineBoucle, vitessePaire, vitesseAnneau });
  if (node) module.exports = api;
  else root.FluidesParfait = api;
})(typeof self !== "undefined" ? self : this);

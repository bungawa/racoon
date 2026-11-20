/* Calculs des leçons « Physique et astronomie », « Physique et géologie », « Physique et psychologie »
   et « Comment en est-on arrivé là ? » (Feynman I, §3-4 à §3-7). SI : m, s, kg, J, W. Pur, sans DOM, UMD. */
(function (root) {
  /* ---------- constantes ---------- */
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, U = Cst.u, G = Cst.G, L_SUN = Cst.L_sun;
  const M_H = 1.00782503223, M_HE = 4.00260325413;   // masses atomiques relatives de ¹H et ⁴He (NIST)
  const M_SUN = Cst.GM_sun / G;              // ≈ 1,989 × 10³⁰ kg
  const YEAR = 365.25 * 86400;               // s, année julienne
  const MPC = 1e6 * Cst.pc;                  // m, mégaparsec

  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : valeur > 0 attendue"); return x; };

  /* ---------- §3-4 : les étoiles brûlent de l'hydrogène ---------- */
  /* 4 ¹H → ⁴He : masse perdue par noyau d'hélium formé (kg), énergie libérée (J), fraction de la masse convertie */
  const fusionDefect = (4 * M_H - M_HE) * U;
  const fusionEnergy = fusionDefect * C * C;
  const fusionEfficiency = (4 * M_H - M_HE) / (4 * M_H);

  /* relation masse-luminosité de la séquence principale, ajustement grossier L ∝ M^3,5 ; m en masses solaires */
  const luminosity = m => L_SUN * Math.pow(pos(m, "masse"), 3.5);

  /* durée de vie sur la séquence principale (s) : on brûle une fraction f de la masse (le cœur), à l'efficacité de la fusion */
  function lifetime(m, f) {
    f = f == null ? 0.1 : f;
    if (!(f > 0 && f <= 1)) throw new RangeError("fraction brûlée : 0 < f ≤ 1 attendu");
    return f * fusionEfficiency * pos(m, "masse") * M_SUN * C * C / luminosity(m);
  }
  /* débit d'hydrogène consommé (kg·s⁻¹) et masse perdue en rayonnement (kg·s⁻¹) pour une luminosité L */
  const hydrogenRate = L => pos(L, "luminosité") / (fusionEfficiency * C * C);
  const massLossRate = L => pos(L, "luminosité") / (C * C);

  /* ---------- §3-5 : localiser un séisme ---------- */
  /* l'onde P (vitesse vp) précède l'onde S (vs < vp) ; le retard S − P croît avec la distance d */
  function checkSpeeds(vp, vs) { pos(vp, "vp"); pos(vs, "vs"); if (!(vp > vs)) throw new RangeError("vitesses : vp > vs attendu"); }
  const lagOf = (d, vp, vs) => { checkSpeeds(vp, vs); if (!(d >= 0)) throw new RangeError("distance ≥ 0 attendue"); return d / vs - d / vp; };
  const distanceOf = (lag, vp, vs) => { checkSpeeds(vp, vs); if (!(lag >= 0)) throw new RangeError("retard ≥ 0 attendu"); return lag * vp * vs / (vp - vs); };

  /* point qui accorde le mieux des cercles (centres stations[i] = [x, y], rayons radii[i]) : moindres carrés
     sur les écarts |P − Si| − ri, par grille puis raffinement. Renvoie {x, y, rms}. */
  function locate(stations, radii, box) {
    if (!Array.isArray(stations) || stations.length < 3 || radii.length !== stations.length) throw new RangeError("localisation : au moins trois stations et un rayon par station");
    const cost = (x, y) => stations.reduce((s, [sx, sy], i) => s + Math.pow(Math.hypot(x - sx, y - sy) - radii[i], 2), 0);
    const xs = stations.map(s => s[0]), ys = stations.map(s => s[1]), span = Math.max(...radii, 1);
    box = box || [Math.min(...xs) - span, Math.min(...ys) - span, Math.max(...xs) + span, Math.max(...ys) + span];
    let best = { x: (box[0] + box[2]) / 2, y: (box[1] + box[3]) / 2 }, bc = cost(best.x, best.y);
    const N = 60;
    for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) {
      const x = box[0] + (box[2] - box[0]) * i / N, y = box[1] + (box[3] - box[1]) * j / N, c = cost(x, y);
      if (c < bc) { bc = c; best = { x, y }; }
    }
    let h = Math.max(box[2] - box[0], box[3] - box[1]) / N;
    while (h > 1e-6 * span) {
      let moved = false;
      for (const [dx, dy] of [[h, 0], [-h, 0], [0, h], [0, -h], [h, h], [-h, -h], [h, -h], [-h, h]]) {
        const c = cost(best.x + dx, best.y + dy);
        if (c < bc) { bc = c; best = { x: best.x + dx, y: best.y + dy }; moved = true; }
      }
      if (!moved) h /= 2;
    }
    return { x: best.x, y: best.y, rms: Math.sqrt(bc / stations.length) };
  }

  /* ---------- §3-6 : seuils de perception ---------- */
  /* générateur pseudo-aléatoire reproductible (mulberry32) */
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  /* loi de Weber : plus petite différence perçue ΔI = k·I */
  const jnd = (I, k) => pos(k, "fraction de Weber") * pos(I, "intensité");
  /* loi de Fechner : nombre de seuils différentiels entre I0 et I, ln(I/I0) / ln(1 + k) */
  const fechnerSteps = (I, I0, k) => Math.log(pos(I, "intensité") / pos(I0, "seuil")) / Math.log(1 + pos(k, "fraction de Weber"));
  /* durée de parcours d'un influx nerveux sur une longueur L à la vitesse v */
  const conduction = (L, v) => pos(L, "longueur") / pos(v, "vitesse");

  /* escalier « deux bonnes réponses : on réduit ; une erreur : on augmente » (converge vers 70,7 % de réussite) */
  function staircase(o) {
    o = Object.assign({ start: 0.2, factor: 1.3, min: 0.002, max: 0.5, keep: 6 }, o);
    return { delta: o.start, factor: o.factor, min: o.min, max: o.max, keep: o.keep, streak: 0, dir: 0, reversals: [], trials: 0, correct: 0 };
  }
  function answer(s, ok) {
    const n = Object.assign({}, s, { reversals: s.reversals.slice(), trials: s.trials + 1, correct: s.correct + (ok ? 1 : 0) });
    let move = 0;
    if (ok) { n.streak = s.streak + 1; if (n.streak === 2) { move = -1; n.streak = 0; } }
    else { n.streak = 0; move = 1; }
    if (move) {
      if (s.dir && move !== s.dir) n.reversals.push(s.delta);
      n.dir = move;
      n.delta = Math.min(n.max, Math.max(n.min, move < 0 ? s.delta / s.factor : s.delta * s.factor));
    }
    return n;
  }
  /* estimation de la fraction de Weber : moyenne géométrique des derniers points de rebroussement */
  function estimate(s) {
    const r = s.reversals.slice(-s.keep);
    if (r.length < 2) return null;
    return Math.exp(r.reduce((a, x) => a + Math.log(x), 0) / r.length);
  }
  /* un essai : deux segments, l'un de longueur ref, l'autre ref·(1 + delta), côté tiré au hasard */
  function trial(rand, delta, lo, hi) {
    lo = lo == null ? 140 : lo; hi = hi == null ? 220 : hi;
    const ref = lo + (hi - lo) * rand(), side = rand() < 0.5 ? "gauche" : "droite", longer = ref * (1 + delta);
    return { side, gauche: side === "gauche" ? longer : ref, droite: side === "droite" ? longer : ref, jitter: [rand(), rand()] };
  }

  /* ---------- §3-7 : d'où vient le monde ---------- */
  /* temps de Hubble 1/H0 (s), H0 en km·s⁻¹·Mpc⁻¹ */
  const hubbleTime = H0 => MPC / (pos(H0, "H0") * 1e3);
  /* calendrier cosmique : l'âge de l'Univers T (années) ramené à une année de 365 jours.
     Un événement d'il y a `ago` années tombe au mois m (0–11), jour d, h:min:s. */
  const MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function cosmicDate(ago, T) {
    T = T == null ? 13.8e9 : T;
    if (!(ago >= 0 && ago <= T)) throw new RangeError("calendrier : 0 ≤ âge ≤ T attendu");
    const total = 365 * 86400, sec = (1 - ago / T) * total;
    let rest = Math.min(Math.floor(sec), total - 1), day = Math.floor(rest / 86400), m = 0;
    rest -= day * 86400;
    while (day >= MONTHS[m]) { day -= MONTHS[m]; m++; }
    return { month: m, day: day + 1, h: Math.floor(rest / 3600), min: Math.floor(rest % 3600 / 60), s: rest % 60, before: total - sec };
  }

  const api = { C, U, M_H, M_HE, G, M_SUN, L_SUN, YEAR, MPC, fusionDefect, fusionEnergy, fusionEfficiency, luminosity, lifetime, hydrogenRate, massLossRate,
    lagOf, distanceOf, locate, rng, jnd, fechnerSteps, conduction, staircase, answer, estimate, trial, hubbleTime, cosmicDate, MONTHS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Voisines = api;
})(typeof self !== "undefined" ? self : this);

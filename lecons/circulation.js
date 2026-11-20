/* Circulation — the fields and calculations of the step « Circulation et théorème de Stokes » (Feynman II.3.5–3.8):
   « La circulation d'un champ de vecteurs », « Circulation autour d'un carré : théorème de Stokes »,
   « Champs irrotationnels et champs à flux conservatif », « Bilan de l'analyse vectorielle ».
   Pure, no DOM, UMD (global Circ). SI: positions in m, the plane fields are velocities of water in m·s⁻¹,
   circulations in m²·s⁻¹, rotationals and divergences in s⁻¹. Derivatives and integrals come from AnaVec
   (/analyse-vectorielle.js).

   Plane fields (CHAMPS.<name>(params) → { F(p), rot(p): exact z component of ∇ × F, div(p): exact ∇ · F, phi?(p): a potential
   with F = ∇phi when one exists on the whole plane minus the singular point, singulier?: the point where F is not defined })
     uniforme(U)        F = (U, 0).
     bloc(omega)        rotation as a whole at angular speed omega: F = omega (−y, x); rot = 2 omega.
     riviere(v0, b)     a river of half-width b, speed v0 in the middle, zero on the banks: F = (v0 (1 − y²/b²), 0); rot = 2 v0 y / b².
     tourbillon(G)      point vortex of circulation G: F = G/(2π r²) (−y, x); rot = 0 and div = 0 everywhere but at the centre.
     rankine(G, rc)     the same vortex with a core of radius rc turning as a whole: rot = G/(π rc²) inside, 0 outside.
     source(Q)          plane source of flow rate Q per unit height: F = Q/(2π r²) (x, y); rot = 0, div = 0 but at the centre.
     selle(k)           F = ∇(k (x² − y²)/2) = k (x, −y): both rot = 0 and div = 0.
     etirement(k)       F = (k x, 0): rot = 0, div = k (water stretched along x: it does not keep its flux).
     cellules(U, k)     convection cells (Taylor–Green): F = U (sin kx cos ky, −cos kx sin ky); rot = 2Uk sin kx sin ky, div = 0.
   Cutting a loop (II.3.5)
     moities(F, c, R, n)  the circle (c, R) cut along its vertical diameter into two closed loops, each run counterclockwise:
                        → { gauche, droite, coupe }: coupe is the integral along the diameter run upwards (the left loop runs
                        it upwards, the right one downwards). gauche + droite = the circulation of the whole circle.
   Circulation around a square (II.3.6)
     carre(F, c, a, n)  the square of side a centred on c, sides numbered as in (3.31): 1 bottom (+x), 2 right (+y), 3 top (−x),
                        4 left (−y). Each side integrated with n chords. → { cotes: [Γ1, Γ2, Γ3, Γ4], total, parAire: total/a² }.
     rapportCellules(k, a)   the exact ratio (circulation/a²)/rot at the centre of a square in the cells: (sin(ka/2)/(ka/2))².
                        Its gap to 1, ≈ (ka)²/12, is the error of (3.36) at first order.
     cercleExact(name, params, c, R)   exact circulation around the circle (c, R), counterclockwise, for the fields where it has a
                        closed form (uniforme, bloc, riviere, tourbillon, rankine, selle, etirement, source); null otherwise.
   The three theorems on one disc (II.3.8)
     bilan(f, c, R, n)  f a field of CHAMPS, the disc (c, R), n chords per path and n rings for the surface integrals →
                        { haut, bas: ∫ F · ds from A = c − (R, 0) to B = c + (R, 0) by the upper and the lower half circles,
                          dphi: phi(B) − phi(A) or null, flux: outward flux, div: ∬ div dA, circ: ∮ F · ds, rot: ∬ rot dA }.
                        circ = bas − haut. Where f is singular inside the disc, flux ≠ div or circ ≠ rot: the theorems need the
                        field on the whole disc.
   Zero or not? (II.3.7)
     tester(F, points, L, h)  → { rot, div, ref }: the largest |∇ × F| and |∇ · F| over the points (numerical, AnaVec), and
                        ref = mean |F| / L, the size a rotational or a divergence would have if F changed by itself over L.
                        rot/ref and div/ref below SEUIL: zero to the precision of the calculation.
     SEUIL              1e-6.
     aleatoire(rng)     → { phi(p), A(p) }: a scalar field and a vector field of space, sums of three sines with random
                        amplitudes, wave vectors and phases (in m⁻¹), to test ∇ × ∇phi = 0 and ∇ · (∇ × A) = 0.
     rotGrad(phi, p, h), divRot(A, p, h)   those two combinations, by nested centred differences of step h.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const A = node ? require("../analyse-vectorielle.js") : root.AnaVec;
  const err = m => { throw new Error("circulation : " + m); };
  const fini = (v, nom) => { if (typeof v !== "number" || !isFinite(v)) err(nom + " doit être un nombre fini"); return v; };
  const pos = (v, nom) => { if (!(fini(v, nom) > 0)) err(nom + " doit être > 0"); return v; };
  const r2 = p => p[0] * p[0] + p[1] * p[1];
  const pasZero = (p, nom) => { if (r2(p) === 0) err(nom + " n'est pas défini au centre"); };

  /* ---------- plane fields ---------- */
  const CHAMPS = {
    uniforme(U) { fini(U, "U"); return { F: () => [U, 0], rot: () => 0, div: () => 0, phi: p => U * p[0] }; },
    bloc(omega) { fini(omega, "omega"); return { F: p => [-omega * p[1], omega * p[0]], rot: () => 2 * omega, div: () => 0 }; },
    riviere(v0, b) { fini(v0, "v0"); pos(b, "b");
      return { F: p => [v0 * (1 - p[1] * p[1] / (b * b)), 0], rot: p => 2 * v0 * p[1] / (b * b), div: () => 0 }; },
    tourbillon(G) { fini(G, "G");
      return { F: p => { pasZero(p, "le tourbillon"); const k = G / (2 * Math.PI * r2(p)); return [-k * p[1], k * p[0]]; },
        rot: () => 0, div: () => 0, singulier: [0, 0] }; },
    rankine(G, rc) { fini(G, "G"); pos(rc, "rc");
      return { F: p => { const q = r2(p), k = q < rc * rc ? G / (2 * Math.PI * rc * rc) : G / (2 * Math.PI * q); return [-k * p[1], k * p[0]]; },
        rot: p => r2(p) < rc * rc ? G / (Math.PI * rc * rc) : 0, div: () => 0 }; },
    source(Q) { fini(Q, "Q");
      return { F: p => { pasZero(p, "la source"); const k = Q / (2 * Math.PI * r2(p)); return [k * p[0], k * p[1]]; },
        rot: () => 0, div: () => 0, phi: p => Q / (4 * Math.PI) * Math.log(r2(p)), singulier: [0, 0] }; },
    selle(k) { fini(k, "k"); return { F: p => [k * p[0], -k * p[1]], rot: () => 0, div: () => 0, phi: p => k * (p[0] * p[0] - p[1] * p[1]) / 2 }; },
    etirement(k) { fini(k, "k"); return { F: p => [k * p[0], 0], rot: () => 0, div: () => k, phi: p => k * p[0] * p[0] / 2 }; },
    cellules(U, k) { fini(U, "U"); pos(k, "k");
      return { F: p => [U * Math.sin(k * p[0]) * Math.cos(k * p[1]), -U * Math.cos(k * p[0]) * Math.sin(k * p[1])],
        rot: p => 2 * U * k * Math.sin(k * p[0]) * Math.sin(k * p[1]), div: () => 0 }; },
  };

  /* ---------- cutting a loop (II.3.5) ---------- */
  function moities(F, c, R, n) {
    A.cercle(c, R);
    n = n === undefined ? 720 : n;
    const arc = (a0, a1) => t => [c[0] + R * Math.cos(a0 + t * (a1 - a0)), c[1] + R * Math.sin(a0 + t * (a1 - a0))];
    const seg = (p, q) => t => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
    const bas = [c[0], c[1] - R], haut = [c[0], c[1] + R];
    const coupe = A.circulation(F, seg(bas, haut), n);
    return { gauche: A.circulation(F, arc(Math.PI / 2, 3 * Math.PI / 2), n) + coupe,
      droite: A.circulation(F, arc(-Math.PI / 2, Math.PI / 2), n) - coupe, coupe };
  }

  /* ---------- the square of (3.31) ---------- */
  function carre(F, c, a, n) {
    if (!Array.isArray(c) || c.length !== 2 || !c.every(Number.isFinite)) err("centre du plan attendu");
    pos(a, "a");
    n = n === undefined ? 64 : n;
    const h = a / 2, [x, y] = c;
    const P = [[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h], [x - h, y - h]];
    const cotes = [0, 1, 2, 3].map(k => A.circulation(F, t => [P[k][0] + t * (P[k + 1][0] - P[k][0]), P[k][1] + t * (P[k + 1][1] - P[k][1])], n));
    const total = cotes.reduce((s, v) => s + v, 0);
    return { cotes, total, parAire: total / (a * a) };
  }
  function rapportCellules(k, a) {
    const u = pos(k, "k") * pos(a, "a") / 2;
    return Math.pow(Math.sin(u) / u, 2);
  }
  function cercleExact(nom, params, c, R) {
    pos(R, "R");
    const d2 = r2(c), [p1, p2] = params;
    switch (nom) {
      case "uniforme": case "selle": case "etirement": return 0;
      case "bloc": return 2 * p1 * Math.PI * R * R;
      case "riviere": return 2 * p1 * c[1] / (p2 * p2) * Math.PI * R * R;
      case "tourbillon": if (Math.abs(Math.sqrt(d2) - R) < 1e-12 * R) err("le contour passe par le centre du tourbillon"); return d2 < R * R ? p1 : 0;
      case "source": return 0;
      case "rankine": {
        if (d2 === 0) return R >= p2 ? p1 : p1 * R * R / (p2 * p2);
        return null;   // off-centre: the overlap of the disc and the core has no short form
      }
      default: return null;
    }
  }

  /* ---------- the three theorems on one disc (II.3.8) ---------- */
  function bilan(f, c, R, n) {
    if (!f || typeof f.F !== "function") err("champ de CHAMPS attendu");
    const cer = A.cercle(c, R);
    n = n === undefined ? 720 : n;
    const arc = (a0, a1) => t => [c[0] + R * Math.cos(a0 + t * (a1 - a0)), c[1] + R * Math.sin(a0 + t * (a1 - a0))];
    const m = Math.max(4, Math.round(n / 12));
    return {
      haut: A.circulation(f.F, arc(Math.PI, 0), n), bas: A.circulation(f.F, arc(Math.PI, 2 * Math.PI), n),
      dphi: f.phi ? f.phi([c[0] + R, c[1]]) - f.phi([c[0] - R, c[1]]) : null,
      flux: A.fluxPlan(f.F, cer, 2 * n), div: A.integraleDisque(f.div, c, R, m),
      circ: A.circulation(f.F, cer, 2 * n), rot: A.integraleDisque(f.rot, c, R, m),
    };
  }

  /* ---------- zero or not (II.3.7) ---------- */
  const SEUIL = 1e-6;
  function tester(F, points, L, h) {
    if (!Array.isArray(points) || !points.length) err("au moins un point attendu");
    pos(L, "L");
    let rot = 0, div = 0, ref = 0;
    points.forEach(p => {
      const R = A.rotationnel(F, p, h);
      rot = Math.max(rot, A.norme(p.length === 2 ? [R[2]] : R));
      div = Math.max(div, Math.abs(A.divergence(F, p, h)));
      ref += A.norme(F(p));
    });
    return { rot, div, ref: ref / points.length / L };
  }
  function aleatoire(rng) {
    if (typeof rng !== "function") err("générateur aléatoire attendu");
    const u = () => 2 * rng() - 1;
    const ondes = n => Array.from({ length: n }, () => ({ a: u(), k: [u(), u(), u()].map(x => 2 * x), f: 3 * rng() }));
    const somme = (w, p) => w.reduce((s, o) => s + o.a * Math.sin(o.k[0] * p[0] + o.k[1] * p[1] + o.k[2] * p[2] + o.f), 0);
    const wphi = ondes(3), wA = [ondes(3), ondes(3), ondes(3)];
    return { phi: p => somme(wphi, p), A: p => wA.map(w => somme(w, p)) };
  }
  const rotGrad = (phi, p, h) => A.rotationnel(q => A.gradient(phi, q, h), p, h);
  const divRot = (Af, p, h) => A.divergence(q => A.rotationnel(Af, q, h), p, h);

  const api = { CHAMPS, moities, carre, bilan, rapportCellules, cercleExact, SEUIL, tester, aleatoire, rotGrad, divRot };
  if (node) module.exports = api;
  else root.Circ = api;
})(typeof self !== "undefined" ? self : this);

/* Relativite — le module commun du monde « Relativité ». Pur, sans DOM, UMD (global Relativite). SI partout.
   Chaque étape ajoute sa section juste avant la ligne « fin des sections », par Edit seulement, avec
   Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par
   chaque étape. Constantes depuis constantes.js. Chaque fonction est un modèle : son domaine est dans son commentaire.
   Les erreurs lèvent un message en français : elles signalent un appel faux. Tests : test/relativite*.test.js.

   Sommaire
   Socle
     c                          vitesse de la lumière, m·s⁻¹ (exacte, SI 2019).
     gamma(v)                   facteur de Lorentz 1/√(1 − v²/c²), |v| < c.
     lorentz(e, u)              l'événement { t, x, y, z } vu d'un référentiel qui avance à u selon x, origines confondues
                                à t = 0 : (16.1) ; lorentz(e, −u) en est l'inverse (16.2).
   Étape « Vitesses et jumeaux » (Feynman I.16.1 à 16.3)
     galilee(u, v)              u + v : la composition de Galilée, pour comparer.
     composer(u, v)             (16.6) : vitesse au sol d'un objet qui va à v selon x dans un vaisseau qui va à u.
     composerVecteur(u, w)      la vitesse w = [wx, wy, wz] d'un référentiel qui avance à u selon x, vue du sol ; (16.7) si wx = 0.
     rapidite(v), deRapidite(φ)  atanh(v/c) ; c tanh φ. Les rapidités s'ajoutent quand les vitesses sont colinéaires.
     hyperbolique(a, t)         { v, x, tau } : départ du repos, accélération propre a constante, après la durée t au sol.
     voyage({ a, beta, D })     aller-retour du jumeau voyageur : accélère à a jusqu'à βc, croise, freine à D, revient de même.
                                { T, tau, beta, phases, etat(t) → { x, v, tau } }.
     signaux(V, periode)        { duSol, duVoyageur } : signaux lumineux émis toutes les « periode » secondes (horloge de
                                l'émetteur) ; pour chacun, l'émission et la réception, chaque date lue sur l'horloge locale.
     palet(o, t)                position, dans un laboratoire fermé, d'un palet lancé sans frottement : repos, translation
                                uniforme, accélération, rotation. { x, y } à la date t du laboratoire.
     foucault(Omega, lat)       { omega, periode } : vitesse de rotation du plan d'un pendule de Foucault, Ω sin λ.
   Étape « Intervalles d'espace-temps » (Feynman I.17.1 à 17.3)
     rotation(e, θ)             (17.2) : le point { x, y, z } lu sur des axes tournés de θ autour de z.
     galileeEvt(e, u)           x − ut, t : le changement de référentiel de Galilée d'un événement, pour comparer à (17.1).
     intervalle2(a, b)          (17.3) : c²Δt² − Δx² − Δy² − Δz² (m²), de l'origine à a, ou de a à b.
     genre(a, b, tol)           "temps", "lumiere" ou "espace" selon le signe de l'intervalle.
     region(e, tol)             "futur", "passe", "cone-futur", "cone-passe", "ailleurs" ou "origine", par rapport à O.
     vitesseSimultanee(e)       c²t/x : la vitesse selon x du référentiel où e (genre espace) est simultané avec O ; sinon null.
     memeLieu(e)                { u, tau } : le référentiel où e (genre temps) a lieu au même endroit que O, et le temps s/c
                                d'une horloge qui va de O à e à vitesse constante ; sinon null.
   Étape « Temps, longueurs et simultanéité » (Feynman I.15.4 à 15.6)
     retard(v)                  1 − 1/γ, sans perte de chiffres quand v ≪ c : la part du temps que perd une horloge.
     deCelerite(p)              v = cp/√(1 + p²) depuis p = γv/c (variable des curseurs).
     horlogeLumiere(L, u)       (15.5) : { propre, vue, demi { t, dx, chemin } } d'une horloge de lumière transverse.
     dilatation(tau, v)         (15.5a) : γ tau.
     survie(d, v, tau0)         { relativiste, galilee, libre } : muons après un vol d ; libre = γ v tau0 (15.5b).
     contraction(L0, u)         (15.6) : L0/γ.
     longueurMarquee(L0, u, dt) L0/γ + u dt : longueur lue en marquant l'avant dt après l'arrière.
     decalage(x1, x2, u)        (15.3g) : t2' − t1' de deux événements simultanés dans S.
     eclairMilieu(L0, u)        { L, arriere, avant, ecart } : éclair parti du milieu d'un vaisseau, vu du sol (15.3h).
   Étape « Quadrivecteurs et énergie-impulsion » (Feynman I.15.7, I.17.4, I.17.5) — quadrivecteur = [At, Ax, Ay, Az],
   même unité partout ([ct, x, y, z] en m, [E, pxc, pyc, pzc] en J ou eV) ; β = v/c.
     boostQuadri(A, β), boostQuadriVecteur(A, β)  (15.3q), (17.12) : les composantes vues d'un référentiel qui avance à βc
                                selon x, ou selon un vecteur β quelconque.
     tournerQuadri(A, θ)        (15.8) sur la partie d'espace ; la composante de temps ne change pas.
     scalaire(a, b), carre(a)   (17.16), (17.15) : at bt − ax bx − ay by − az bz.
     quadriImpulsion(mc², β), photon(E, n)  (17.6) : [γmc², γmc² β] ; [E, E n] pour un photon.
     sommeQuadri(liste), masseInvariante(liste), vitesseQuadri(P)  (17.13) ; √(P·P) ; pc/E, vitesse du référentiel du centre.
     dopplerPhoton(β, cos θ)    (17.12e) : E'/E = γ(1 − β cos θ).
     sCibleFixe(K, m1, m2), sCollisionneur(K1, m1, K2, m2), seuilCibleFixe(sortie, m1, m2)  √s sur cible fixe et en
                                collision frontale ; énergie cinétique de seuil (énergies au repos en entrée).
   Étape « Transformation de Lorentz » (Feynman I.15.1 à 15.3)
     gammaMoinsUn(v)            γ − 1, sans perte de chiffres quand v ≪ c.
     ecartGalilee(e, u)         { dx, dt } : (15.3) moins (15.2) pour l'événement e, sans perte de chiffres.
     vitesseVue(w, u, transfo)  pente Δx'/Δt' d'un signal à w lue par "galilee" (w − u, (15.2w)) ou "lorentz" (c pour la lumière).
     lancerWagon(o)             { u, v0, g, duree, n } → balle lancée dans un wagon : { sol, wagon, accSol, accWagon } par (15.2).
     excesAllerRetour(θ, u, contraction), allerRetour(L, θ, u, contraction)  modèle de l'éther : aller-retour d'un bras
                                à l'angle θ, (15.4) à θ = 0, (15.5) à π/2 ; contraction (15.6) : (15.7), le même partout.
     michelsonMorley(o)         { L1, L2, u, lambda, theta, contraction } → { t1, t2, dt, ordre, decalage, attendu (15.7w) }.
   Étape « Gravitation et horloges » (Feynman II.42.4 à 42.6)
     tempsPropre(v, T, n)       ∫ √(1 − v²/c²) dt de 0 à T, v fonction du temps (Simpson, n tranches).
     tempsPropreDroit(D, T)     √(T² − D²/c²) : le trajet droit et uniforme, le plus long temps propre entre deux événements.
     deuxEtapes(D, T, p)        { v1, v2, tau, approx } : la part p de D pendant la première moitié de T, le reste ensuite.
     chuteCabine({ g, A, h0 })  { gApp, tSol, h(t) } : une bille lâchée dans une cabine d'accélération A, dans un champ g.
     maree(GM, r, d), deriveMaree(GM, r, d, t)  accélérations de marée (2GMd/r³, −GMd/r³) et dérives d'un corps lâché
                                à d du centre d'une cabine en chute libre.
     fuseeRigide(g, H, T0, n), fuseeNewton(g, H, T0, n)  éclairs de la tête vers la queue d'une fusée accélérée : exacte
                                (Born, rapport 1 + gH/c²), puis à la Newton ; (42.5).
     decalageUniforme(g, H), ecartPotentiel(GM, r1, r2)  gH/c² (42.5) ; GM(1/r1 − 1/r2)/c².
     marcheOrbite(r, GM, LG)    { gravitation, vitesse, total } : horloge en orbite circulaire contre horloge du géoïde.
   Étape « Dynamique relativiste » (Feynman I.15.8, 15.9, 16.4, 16.5) — m est la masse (le m0 de Feynman), m_v = γm.
     impulsion(m, v)            (15.10) : γmv, nombre ou vecteur.
     masseVitesse(m, v), energie(m, v), cinetique(m, v)  γm ; γmc² ; (γ − 1)mc² (16.12), sans perte de chiffres à faible v.
     depuisCinetique(m, T)      { gamma, beta, unMoinsBeta, v, p, E, T } d'un corps d'énergie cinétique T.
     masseDepuis(E, p), vitesseDepuis(E, p)  (16.13) : √(E² − p²c²)/c² ; (16.14) : pc²/E.
     serieMasse(m, v, n)        les n premiers termes de m(1 − β²)^(−1/2) ; n = 2 : (15.11).
     inerties(m, v)             { transversale: γm, longitudinale: γ³m } : la réponse à une force ⊥ ou ∥ à v.
     forceConstante(m, F, t)    { p, v, x, gamma, vNewton, xNewton } : force constante depuis le repos (p = Ft).
     avanceLumiere(γ, L)        L(1 − β) : l'avance de la lumière sur le corps après un trajet L.
     champCourbure(p, q, ρ)     p/(|q|ρ) : le champ qui courbe la charge sur le rayon ρ.
     collisionTransverse(u, w, mDe)  { v, wy, mw, mv, dp1, dp2, somme, rapport } : le choc de (16.9) vu de la voiture.
     collage(m, w)              { M, exces, energie } : (16.11), M = 2γ_w m.
     energieLiberee(M, filles)  (16.11a) : (M − Σm)c².
     rayonnementLineaire(q, m, F, v)  { P, fraction } : puissance rayonnée sous une force F ∥ v, et sa part de F v.
   Étape « Courbure et équations d'Einstein » (Feynman II.42.7 à 42.9) — champ faible, Φ/c² ≪ 1.
     rectangle(o)               { H, duree, g | GM, R } → { phi, haut, ecart (42.6t), dateC } : le rectangle d'espace-temps
                                qui ne se ferme pas, chaque côté mesuré par l'horloge de son objet.
     rayonCourbure(GM, r)       c/√(GM/r³) : rayon de courbure de l'espace-temps (marées) à la distance r d'un astre.
     trajet(forme, o)           { T, g, alpha, D } → { H(t), vz(t), vx, h, T, coudes } : "parabole", "triangle" ou "palier",
                                départ du sol à t = 0, retour à T, sommet h = α gT²/8, distance horizontale D.
     excesTempsPropre(tr, g, n) (42.17) : { exces, gravite, vitesse, exact, action (42.18) } le long du trajet tr.
     (42.3), l'excès de rayon GM/(3c²) : EspacesCourbes.excesEinstein (public/lecons/espaces-courbes.js).
   Étape « Quadrivecteurs de l'électrodynamique » (Feynman II.25.1 à 25.3) — un champ est une fonction de l'événement
   e = [ct, x, y, z] (m) ; h est le pas des différences centrées, en m.
     quadriVitesse(β)           (25.5) : [γ, γβ], la quadrivitesse en unités de c.
     gradientQuadri(f, e, h)    (25.16) : [∂f/∂(ct), −∂f/∂x, −∂f/∂y, −∂f/∂z] ; gradientNaif sans les signes moins.
     divergenceQuadri(F, e, h)  (25.17) : ∂F_t/∂(ct) + ∂F_x/∂x + ∂F_y/∂y + ∂F_z/∂z.
     dalembertien(f, e, h)      (25.20) : ∂²f/∂(ct)² − ∇²f.
     scalaireVu(f, β), quadriChampVu(F, β)  le champ scalaire, ou de quadrivecteurs, lu par l'observateur qui va à βc :
                                e′ ↦ f(e) et e′ ↦ Λ F(e), e l'événement que cet observateur nomme e′.
   Étape « Champs d'une charge rapide » (Feynman II.26.3, 26.4, 31.8) — indices t, x, y, z ; E en V·m⁻¹, B en T.
     tenseurF(E, B), champsDeF(F)  table 26-1 en SI : F_xt = E_x/c, F_xy = −B_z, F_yz = −B_x, F_zx = −B_y (T) ; et retour.
     boostTenseur(T, β)         (26.22) : Λ T Λᵀ, T lu par un référentiel qui va à βc (nombre selon x, ou vecteur).
     champsVus(E, B, β), invariantsChamp(E, B)  { E, B } vus de ce référentiel ; { EB, E2c2B2, FF = Σ F_μν F_μν }.
     quadriForce(F, β), forceF(q, F, u)  (26.28) : [γF·β, γF] (N) ; (26.37) : q c u_ν F_μν, u en unités de c.
     mouvementPropre(o)         (26.39) pas à pas en temps propre (RK4), champs uniformes : { s, x, u, ecartNorme (relatif) }.
     tenseurEnergieImpulsion(E, B), traceTenseur(T)  S_μν de II.31.8 en SI (J·m⁻³) : u, S/c, flux d'impulsion ; Σ δ_μμ S_μμ.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const C = Cst.c, C2 = C * C;
  const err = m => { throw new Error("Relativite : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
  const api = { c: C };

  /* ---------- socle ---------- */
  {
    /* Lorentz factor. Exact; |v| < c. (1 − β)(1 + β) keeps the digits when v is close to c. */
    function gamma(v) { fini(v, "v"); if (!(Math.abs(v) < C)) err("|v| doit être < c"); return 1 / Math.sqrt((1 - v / C) * (1 + v / C)); }
    /* (16.1): the event { t, x, y, z } in the frame that moves at u along x, origins together at t = 0. Exact for two
       inertial frames in uniform relative motion; lorentz(e, −u) is (16.2). */
    function lorentz(e, u) {
      const g = gamma(u);
      return { t: g * (fini(e.t, "t") - u * fini(e.x, "x") / C2), x: g * (e.x - u * e.t), y: fini(e.y || 0, "y"), z: fini(e.z || 0, "z") };
    }
    Object.assign(api, { gamma, lorentz });
  }

  /* ---------- étape « Vitesses et jumeaux » (Feynman I.16.1 à 16.3) ---------- */
  {
    const vit = (v, nom) => { fini(v, nom); if (Math.abs(v) > C) err("|" + nom + "| doit être ≤ c"); return v; };
    function galilee(u, v) { return fini(u, "u") + fini(v, "v"); }
    /* (16.6). Exact for two collinear velocities; |u| < c (a frame), |v| ≤ c (light is allowed: the result is then ±c). */
    function composer(u, v) {
      api.gamma(u); vit(v, "v");
      if (Math.abs(v) === C) return v;
      return (u + v) / (1 + u * v / C2);
    }
    /* the velocity w = [wx, wy, wz] measured in a frame that moves at u along x, seen from the ground. Exact; (16.6) for
       the x component, (16.7) for y when wx = 0. |u| < c, |w| ≤ c. */
    function composerVecteur(u, w) {
      const g = api.gamma(u);
      if (!Array.isArray(w) || w.length !== 3) err("w doit être un vecteur à 3 composantes");
      w.forEach((x, i) => fini(x, "w[" + i + "]"));
      if (Math.hypot(...w) > C * (1 + 1e-12)) err("|w| doit être ≤ c");
      const d = 1 + u * w[0] / C2;
      return [(w[0] + u) / d, w[1] / (g * d), w[2] / (g * d)];
    }
    /* rapidity: v = c tanh φ. Exact; collinear rapidities add, which is (16.6) again. */
    function rapidite(v) { api.gamma(v); return Math.atanh(v / C); }
    function deRapidite(phi) { return C * Math.tanh(fini(phi, "phi")); }

    /* Constant proper acceleration a (felt by the traveller), from rest at x = 0, t = 0; t is the time on the ground.
       Exact (hyperbolic motion): γv = a t, x = (c²/a)(√(1 + (at/c)²) − 1), τ = (c/a) asinh(at/c). */
    function hyperbolique(a, t) {
      pos(a, "a"); fini(t, "t"); if (t < 0) err("t doit être ≥ 0");
      const s = a * t / C, r = Math.sqrt(1 + s * s);
      return { v: C * s / r, x: C2 / a * (s * s / (r + 1)), tau: C / a * Math.asinh(s) };
    }

    /* The travelling twin: from rest at x = 0, proper acceleration a up to βc, cruise, braking at a to rest at x = D,
       then the same way back. If D is too short to reach βc, the peak speed is what a gives over D/2. Special relativity
       only: no gravitation, Peter's frame inertial. { T, tau, beta, phases: [{ debut, fin, nom }], etat(t) }. */
    function voyage(o) {
      const a = pos(o.a, "a"), D = pos(o.D, "D"), b0 = fini(o.beta, "beta");
      if (!(b0 > 0 && b0 < 1)) err("beta doit être dans ]0, 1[");
      let g = 1 / Math.sqrt((1 - b0) * (1 + b0)), xa = C2 / a * (g - 1);
      if (2 * xa > D) { xa = D / 2; g = 1 + a * xa / C2; }
      const beta = Math.sqrt((g - 1) * (g + 1)) / g, v = beta * C;
      const ta = C / a * g * beta, taua = C / a * Math.asinh(g * beta);
      const tc = (D - 2 * xa) / v, tauc = tc / g, H = 2 * ta + tc;
      const T = 2 * H, tauH = 2 * taua + tauc, tau = 2 * tauH;
      /* first half, by the time on the ground */
      function aller(t) {
        if (t <= ta) return hyperbolique(a, t);
        if (t <= ta + tc) return { v, x: xa + v * (t - ta), tau: taua + (t - ta) / g };
        const h = hyperbolique(a, H - t);
        return { v: h.v, x: D - h.x, tau: tauH - h.tau };
      }
      function etat(t) {
        fini(t, "t"); if (t < 0 || t > T * (1 + 1e-12)) err("t doit être dans [0, T]");
        if (t <= H) return aller(t);
        const s = aller(Math.max(0, T - t));
        return { v: -s.v, x: s.x, tau: tau - s.tau };
      }
      const phases = [["accel", 0, ta], ["croisiere", ta, ta + tc], ["frein", ta + tc, H], ["demi", H, H + ta], ["croisiere", H + ta, H + ta + tc], ["frein", H + ta + tc, T]]
        .map(([nom, debut, fin]) => ({ nom, debut, fin }));
      return { T, tau, beta, gamma: g, H, a, D, phases, etat };
    }

    /* Light signals between the twins of a voyage V. duSol: Peter (x = 0) sends one every `periode` of his time, from 0 to T;
       for each, the time on Peter's clock at emission and on Paul's at reception. duVoyageur: Paul sends one every `periode`
       of his own time; emission on his clock, reception on Peter's. Exact within special relativity (light at c in
       Peter's inertial frame). Paul's worldline has |dx/dt| < c, so each reception date is a unique root (bisection). */
    function signaux(V, periode) {
      pos(periode, "periode"); if (V.T / periode > 1e5) err("trop de signaux");
      const root = (f, lo, hi) => { for (let k = 0; k < 200 && hi - lo > 1e-15 * Math.max(1, hi); k++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; } return (lo + hi) / 2; };
      const duSol = [];
      for (let k = 0; k * periode <= V.T * (1 + 1e-12); k++) {
        const te = Math.min(k * periode, V.T);
        const t = root(x => V.etat(x).x - C * (x - te), te, V.T);
        duSol.push({ emission: te, reception: V.etat(t).tau, date: t });
      }
      /* Paul's emissions: the ground date of his proper time k·periode, then the light goes x/c back home */
      const duVoyageur = [];
      for (let k = 0; k * periode <= V.tau * (1 + 1e-12); k++) {
        const tk = Math.min(k * periode, V.tau);
        const t = root(x => tk - V.etat(x).tau, 0, V.T);
        duVoyageur.push({ emission: tk, reception: t + V.etat(t).x / C, date: t });
      }
      return { duSol, duVoyageur };
    }

    /* A puck slides without friction on the table of a closed laboratory, launched at t = 0 from r0 = [x, y] with the
       velocity w0 = [wx, wy] relative to the table. Its position on the table at the laboratory time t:
       - "repos", "translation" (V along x, |V| < c): the ground sees the composed velocity (composerVecteur), the lab
         reads it back with (16.1): exact, the same straight line whatever V.
       - "acceleration" (A along x): Newtonian, x − A t²/2; valid while A t ≪ c.
       - "rotation" (Omega about z, through the centre of the table): the puck goes straight in the frame that coincides
         with the table at t = 0, read in axes that turn by Ωt. Newtonian; valid while Ω |r| ≪ c. */
    function palet(o, t) {
      fini(t, "t");
      const r0 = o.r0 || [0, 0], w0 = o.w0 || [0, 0];
      [...r0, ...w0].forEach((x, i) => fini(x, "r0, w0[" + i + "]"));
      if (o.mode === "repos") return { x: r0[0] + w0[0] * t, y: r0[1] + w0[1] * t };
      if (o.mode === "translation") {
        const V = fini(o.V, "V"), g = api.gamma(V), w = composerVecteur(V, [w0[0], w0[1], 0]);
        /* the launch event in the ground frame, then one second later on the ground, both read back in the lab */
        const e0 = { t: g * (V * r0[0] / C2), x: g * r0[0], y: r0[1] }, e1 = { t: e0.t + 1, x: e0.x + w[0], y: e0.y + w[1] };
        const p0 = api.lorentz(e0, V), p1 = api.lorentz(e1, V), dt = p1.t - p0.t;
        const vx = (p1.x - p0.x) / dt, vy = (p1.y - p0.y) / dt;
        return { x: p0.x + vx * (t - p0.t), y: p0.y + vy * (t - p0.t) };
      }
      if (o.mode === "acceleration") { const A = fini(o.A, "A"); return { x: r0[0] + w0[0] * t - A * t * t / 2, y: r0[1] + w0[1] * t }; }
      if (o.mode === "rotation") {
        const W = fini(o.Omega, "Omega");
        const vx = w0[0] - W * r0[1], vy = w0[1] + W * r0[0];      // velocity in the frame at rest: w0 + Ω ∧ r0
        const X = r0[0] + vx * t, Y = r0[1] + vy * t, c = Math.cos(W * t), s = Math.sin(W * t);
        return { x: c * X + s * Y, y: -s * X + c * Y };
      }
      return err("mode inconnu : " + o.mode);
    }

    /* Foucault pendulum: the plane of swing turns, relative to the ground, at Ω sin λ (clockwise in the northern
       hemisphere). Small oscillations, the Earth's rotation alone (Ω = sidereal rate); ignores the ellipticity that a
       launch with sideways velocity gives. { omega (rad·s⁻¹), periode (s, Infinity on the equator) }. */
    function foucault(Omega, lat) {
      pos(Omega, "Omega"); fini(lat, "lat"); if (Math.abs(lat) > Math.PI / 2) err("|lat| doit être ≤ π/2");
      const w = Omega * Math.sin(lat);
      return { omega: w, periode: w === 0 ? Infinity : 2 * Math.PI / Math.abs(w) };
    }

    Object.assign(api, { galilee, composer, composerVecteur, rapidite, deRapidite, hyperbolique, voyage, signaux, palet, foucault });
  }

  /* ---------- étape « Intervalles d'espace-temps » (Feynman I.17.1 à 17.3) ---------- */
  {
    const evt = (e, nom) => { if (!e || typeof e !== "object") err(nom + " doit être un événement { t, x, y, z }");
      const k = q => fini(e[q] === undefined ? 0 : e[q], nom + "." + q); return { t: k("t"), x: k("x"), y: k("y"), z: k("z") }; };
    const ecart = (a, b) => { const p = evt(a, "a"); if (b === undefined) return p; const q = evt(b, "b");
      return { t: q.t - p.t, x: q.x - p.x, y: q.y - p.y, z: q.z - p.z }; };
    /* (17.2): the point { x, y, z } read on axes turned by θ about z. Exact (Euclidean rotation). */
    function rotation(e, theta) {
      const p = evt(e, "e"), c = Math.cos(fini(theta, "theta")), s = Math.sin(theta);
      return { t: p.t, x: p.x * c + p.y * s, y: p.y * c - p.x * s, z: p.z };
    }
    /* Galileo's change of frame for an event, to compare with (17.1): x' = x − ut, t' = t. Valid while (u/c)² and
       ux/c² over t are negligible. */
    function galileeEvt(e, u) { const p = evt(e, "e"); fini(u, "u"); return { t: p.t, x: p.x - u * p.t, y: p.y, z: p.z }; }
    /* (17.3): the squared interval c²Δt² − Δx² − Δy² − Δz², m², from the origin to a, or from a to b. Exact definition;
       invariant under (17.1) as long as space-time is flat (no gravitation). Computed as (cΔt − r)(cΔt + r) so that a
       light-like pair gives 0 to rounding. */
    function intervalle2(a, b) {
      const d = ecart(a, b), r = Math.hypot(d.x, d.y, d.z), ct = C * d.t;
      return (ct - r) * (ct + r);
    }
    /* nature of a pair: "temps" (s² > 0), "espace" (s² < 0), "lumiere" (|s²| ≤ tol × (c²Δt² + r²), tol = 1e-12 by default). */
    function genre(a, b, tol) {
      const d = ecart(a, b), r2 = d.x * d.x + d.y * d.y + d.z * d.z, s2 = intervalle2(a, b === undefined ? undefined : b);
      const eps = (tol === undefined ? 1e-12 : fini(tol, "tol")) * (C2 * d.t * d.t + r2);
      return Math.abs(s2) <= eps ? "lumiere" : s2 > 0 ? "temps" : "espace";
    }
    /* where an event lies relative to the origin event O: "origine", "futur" or "passe" (inside the light cone),
       "cone-futur" or "cone-passe" (on it), "ailleurs" (outside: space-like). Same answer in every inertial frame. */
    function region(e, tol) {
      const p = evt(e, "e");
      if (p.t === 0 && p.x === 0 && p.y === 0 && p.z === 0) return "origine";
      const g = genre(p, undefined, tol);
      if (g === "espace") return "ailleurs";
      return (g === "lumiere" ? "cone-" : "") + (p.t > 0 ? "futur" : "passe");
    }
    /* space-like event (relative to O): the speed u along x of the frame in which it is simultaneous with O, u = c²t/x
       (t' = 0 in (17.1)). Needs y = z = 0 for a frame moving along x; null otherwise or when the pair is not space-like. */
    function vitesseSimultanee(e) {
      const p = evt(e, "e");
      if (p.y !== 0 || p.z !== 0 || genre(p) !== "espace") return null;
      return C2 * p.t / p.x;
    }
    /* time-like event: the speed u = x/t of the frame in which it happens at the same place as O, and the time that a
       clock carried from O to it at that constant speed shows, τ = s/c. null when the pair is not time-like. */
    function memeLieu(e) {
      const p = evt(e, "e");
      if (genre(p) !== "temps") return null;
      return { u: [p.x / p.t, p.y / p.t, p.z / p.t], tau: Math.sign(p.t) * Math.sqrt(intervalle2(p)) / C };
    }
    Object.assign(api, { rotation, galileeEvt, intervalle2, genre, region, vitesseSimultanee, memeLieu });
  }

  /* ---------- étape « Temps, longueurs et simultanéité » (Feynman I.15.4 à 15.6) ---------- */
  {
    /* the fraction of its time that a clock moving at v loses, 1 − 1/γ = β²/(1 + √(1 − β²)): no cancellation when
       v ≪ c (a car gives 5 × 10⁻¹⁵). Exact; |v| < c. */
    function retard(v) { const g = api.gamma(v), b = v / C; return b * b / (1 + 1 / g); }
    /* proper velocity p = γv/c (the slider variable, from 10⁻⁸ to 30) back to v = cp/√(1 + p²). Exact; any finite p. */
    function deCelerite(p) { fini(p, "p"); return C * p / Math.sqrt(1 + p * p); }
    /* (15.5): a light clock, mirrors L apart, carried at u perpendicular to its rod. Exact in special relativity: the
       transverse length is the same in both frames. propre: 2L/c, its tick in its own frame; vue: the tick seen from the
       frame where it moves; demi: one mirror-to-mirror trip seen from there, { t, dx (sideways), chemin (light path) }. */
    function horlogeLumiere(L, u) {
      pos(L, "L"); const g = api.gamma(u), t0 = L / C, t = g * t0;
      return { propre: 2 * t0, vue: 2 * t, demi: { t, dx: u * t, chemin: C * t } };
    }
    /* (15.5a): a duration tau of the moving clock's own time lasts γ tau for the frame in which it moves at v. Exact for
       a clock in uniform motion (no acceleration, no gravitation). */
    function dilatation(tau, v) { return api.gamma(v) * fini(tau, "tau"); }
    /* Muons that fly a distance d at speed v, mean proper life tau0. Exponential decay, constant speed (no energy loss in
       the air), straight path. relativiste: the fraction left, exp(−d/(γ v tau0)); galilee: the same without dilation,
       exp(−d/(v tau0)); libre: the mean free flight γ v tau0 (15.5b). */
    function survie(d, v, tau0) {
      fini(d, "d"); if (d < 0) err("d doit être ≥ 0"); pos(v, "v"); pos(tau0, "tau0");
      const libre = api.gamma(v) * v * tau0;
      return { relativiste: Math.exp(-d / libre), galilee: Math.exp(-d / (v * tau0)), libre };
    }
    /* (15.6): a length L0 at rest, measured from the frame where it moves at u along itself. Exact; the transverse
       lengths do not change. */
    function contraction(L0, u) { pos(L0, "L0"); return L0 / api.gamma(u); }
    /* What the ground S reads as the length of a rod (proper length L0, moving at u along +x) when it marks the rear end
       at t, then the front end at t + dt (S's own clocks): L0/γ + u dt. Exact; only dt = 0 measures the length. */
    function longueurMarquee(L0, u, dt) { return contraction(L0, u) + u * fini(dt, "dt"); }
    /* (15.3g): two events at the same date in S, at x1 and x2, read from S' that moves at u along x: t2' − t1'
       = γ u (x1 − x2)/c². Exact. */
    function decalage(x1, x2, u) { return api.gamma(u) * u * (fini(x1, "x1") - fini(x2, "x2")) / C2; }
    /* A ship of proper length L0 moves at u along x on the ground S; at t = 0 a flash leaves its midpoint (x = 0). The
       ship sees both ends lit at once. S sees the rear lit first (u > 0): arriere, avant = { t, x } of the two arrivals,
       ecart = avant.t − arriere.t = γ u L0/c² (15.3h). Exact; light at c in S, |u| < c. */
    function eclairMilieu(L0, u) {
      const L = contraction(L0, u), ta = L / 2 / (C + u), tv = L / 2 / (C - u);
      return { L, arriere: { t: ta, x: -L / 2 + u * ta }, avant: { t: tv, x: L / 2 + u * tv }, ecart: tv - ta };
    }
    Object.assign(api, { retard, deCelerite, horlogeLumiere, dilatation, survie, contraction, longueurMarquee, decalage, eclairMilieu });
  }

  /* ---------- étape « Quadrivecteurs et énergie-impulsion » (Feynman I.15.7, I.17.4, I.17.5) ---------- */
  {
    /* A four-vector is an array [At, Ax, Ay, Az], all four in the same unit: [ct, x, y, z] in m for an event,
       [E, px c, py c, pz c] in J (or eV) for energy and momentum. β is a speed in units of c. */
    const q4 = (A, nom) => { if (!Array.isArray(A) || A.length !== 4) err(nom + " doit être un quadrivecteur [At, Ax, Ay, Az]");
      A.forEach((x, i) => fini(x, nom + "[" + i + "]")); return A; };
    const b3 = (b, nom) => { const v = typeof b === "number" ? [b, 0, 0] : b;
      if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un nombre (selon x) ou un vecteur à 3 composantes");
      v.forEach((x, i) => fini(x, nom + "[" + i + "]")); if (!(Math.hypot(...v) < 1)) err("|" + nom + "| doit être < 1 (vitesse en unités de c)"); return v; };
    const gb = b => 1 / Math.sqrt((1 - b) * (1 + b));
    /* (15.3q), (17.12): the components seen from a frame that moves at βc along x. Exact for two inertial frames,
       origins together; the same rule for every four-vector. */
    function boostQuadri(A, beta) {
      q4(A, "A"); b3(beta, "beta"); const g = gb(beta);
      return [g * (A[0] - beta * A[1]), g * (A[1] - beta * A[0]), A[2], A[3]];
    }
    /* the same for a frame that moves at the velocity βc in any direction (the boost without rotation). Exact. */
    function boostQuadriVecteur(A, beta) {
      q4(A, "A"); const b = b3(beta, "beta"), b2 = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
      if (b2 === 0) return A.slice();
      const g = gb(Math.sqrt(b2)), bA = b[0] * A[1] + b[1] * A[2] + b[2] * A[3], k = (g - 1) * bA / b2 - g * A[0];
      return [g * (A[0] - bA), A[1] + k * b[0], A[2] + k * b[1], A[3] + k * b[2]];
    }
    /* (15.8): the space part read on axes turned by θ about z; the time part does not change. Exact. */
    function tournerQuadri(A, theta) {
      q4(A, "A"); const c = Math.cos(fini(theta, "theta")), s = Math.sin(theta);
      return [A[0], A[1] * c + A[2] * s, A[2] * c - A[1] * s, A[3]];
    }
    /* (17.16): at bt − ax bx − ay by − az bz, and (17.15) for a·a. Exact definitions; the same in every inertial frame. */
    function scalaire(a, b) { q4(a, "a"); q4(b, "b"); return a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3]; }
    function carre(a) { return scalaire(a, a); }
    /* (17.6): [γ mc², γ mc² β] for a particle of rest energy mc² (J, or eV) moving at βc; β a number (along x) or a vector.
       Exact for a particle whose mass does not change (no internal excitation). */
    function quadriImpulsion(mc2, beta) {
      if (!(Number.isFinite(mc2) && mc2 >= 0)) err("mc2 doit être un nombre ≥ 0");
      if (mc2 === 0) err("une particule de masse nulle va à c : utiliser photon(E, n)");
      const b = b3(beta, "beta"), E = mc2 * gb(Math.hypot(...b));
      return [E, E * b[0], E * b[1], E * b[2]];
    }
    /* a photon of energy E travelling along n (normalised here): [E, E n]. Exact; its square is 0. */
    function photon(E, n) {
      pos(E, "E"); const d = n === undefined ? [1, 0, 0] : n;
      if (!Array.isArray(d) || d.length !== 3) err("n doit être un vecteur à 3 composantes");
      const l = Math.hypot(...d.map((x, i) => fini(x, "n[" + i + "]"))); if (!(l > 0)) err("n ne doit pas être nul");
      return [E, E * d[0] / l, E * d[1] / l, E * d[2] / l];
    }
    /* (17.13): the sum, component by component, of the four-momenta of a list of particles. */
    function sommeQuadri(list) {
      if (!Array.isArray(list) || !list.length) err("il faut une liste non vide de quadrivecteurs");
      return list.reduce((s, A, i) => q4(A, "liste[" + i + "]").map((x, k) => s[k] + x), [0, 0, 0, 0]);
    }
    /* invariant mass of a system, as a rest energy: √(sum · sum). Exact. For two particles the square is computed as
       m1² + m2² + 2 (E1 E2 − |p1||p2| + |p1||p2| |n1 − n2|²/2), n the directions, with E − |p| set to 0 within rounding
       (a photon): the digits survive for two nearly parallel photons, where E1 E2 − p1·p2 cancels. */
    const ecartE = A => { const p = Math.hypot(A[1], A[2], A[3]), d = A[0] - p; return [Math.abs(d) <= 4e-16 * A[0] ? 0 : d, p]; };
    function masseInvariante(list) {
      const P = sommeQuadri(list);
      let s;
      if (list.length === 2) {
        const [a, b] = list, [da, pa] = ecartE(a), [db, pb] = ecartE(b);
        const n = pa > 0 && pb > 0 ? [1, 2, 3].reduce((t, i) => t + (a[i] / pa - b[i] / pb) ** 2, 0) : 0;
        s = da * (a[0] + pa) + db * (b[0] + pb) + 2 * (da * b[0] + pa * db + pa * pb * n / 2);
      } else s = carre(P);
      if (s < -1e-12 * P[0] * P[0]) err("somme de genre espace : ce n'est pas un système de particules");
      return Math.sqrt(Math.max(0, s));
    }
    /* velocity, in units of c, of the frame where the space part of P vanishes: p c/E (the centre-of-momentum frame
       for a sum). Needs E > |p c|. */
    function vitesseQuadri(P) {
      q4(P, "P"); if (!(P[0] > Math.hypot(P[1], P[2], P[3]))) err("il faut E > |p c|");
      return [P[1] / P[0], P[2] / P[0], P[3] / P[0]];
    }
    /* (17.12e): E'/E for a photon whose direction makes the angle θ with the velocity βc of the observer (θ measured in
       the first frame): γ(1 − β cos θ). θ = 0: √((1 − β)/(1 + β)). Exact in flat space-time. */
    function dopplerPhoton(beta, cosTheta) {
      b3(beta, "beta"); fini(cosTheta, "cosTheta"); if (Math.abs(cosTheta) > 1) err("|cos θ| doit être ≤ 1");
      return gb(beta) * (1 - beta * cosTheta);
    }
    /* energy available to make new particles, √s, for a projectile of kinetic energy K and rest energy m1 on a target
       m2 at rest: s = m1² + m2² + 2 (K + m1) m2 (all as energies). Exact for free particles. */
    function sCibleFixe(K, m1, m2) {
      if (!(Number.isFinite(K) && K >= 0)) err("K doit être ≥ 0"); pos(m1, "m1"); pos(m2, "m2");
      return Math.sqrt((m1 + m2) * (m1 + m2) + 2 * K * m2);
    }
    /* the same for two beams head-on, kinetic energies K1, K2: s = m1² + m2² + 2 (E1 E2 + p1 p2), p the momenta (pc). */
    function sCollisionneur(K1, m1, K2, m2) {
      [K1, K2].forEach((K, i) => { if (!(Number.isFinite(K) && K >= 0)) err("K" + (i + 1) + " doit être ≥ 0"); }); pos(m1, "m1"); pos(m2, "m2");
      const E1 = K1 + m1, E2 = K2 + m2, p1 = Math.sqrt(K1 * (K1 + 2 * m1)), p2 = Math.sqrt(K2 * (K2 + 2 * m2));
      return Math.sqrt(m1 * m1 + m2 * m2 + 2 * (E1 * E2 + p1 * p2));
    }
    /* threshold kinetic energy of the projectile m1 on the target m2 at rest to create the final masses Σm:
       ((Σm)² − (m1 + m2)²)/(2 m2); 0 when the reaction releases energy. Exact. */
    function seuilCibleFixe(sortie, m1, m2) {
      if (!Array.isArray(sortie) || !sortie.length) err("sortie : liste des masses finales"); pos(m1, "m1"); pos(m2, "m2");
      const M = sortie.reduce((s, m, i) => { if (!(Number.isFinite(m) && m >= 0)) err("sortie[" + i + "] doit être ≥ 0"); return s + m; }, 0);
      return Math.max(0, (M * M - (m1 + m2) * (m1 + m2)) / (2 * m2));
    }
    Object.assign(api, { boostQuadri, boostQuadriVecteur, tournerQuadri, scalaire, carre, quadriImpulsion, photon, sommeQuadri,
      masseInvariante, vitesseQuadri, dopplerPhoton, sCibleFixe, sCollisionneur, seuilCibleFixe });
  }

  /* ---------- étape « Transformation de Lorentz » (Feynman I.15.1 à 15.3) ---------- */
  {
    /* γ − 1 = β²/(s(1 + s)), s = √(1 − β²): no cancellation when v ≪ c (the Earth on its orbit gives 4,9 × 10⁻⁹). Exact. */
    function gammaMoinsUn(v) {
      api.gamma(v); const b = v / C, s = Math.sqrt((1 - b) * (1 + b));
      return b * b / (s * (1 + s));
    }
    /* (15.3) minus (15.2) for the event e: what Galileo gets wrong, { dx, dt } = (x'L − x'G, t'L − t'G), computed without
       cancellation: dx = (γ − 1)(x − ut), dt = (γ − 1)t − γux/c². dx is of order (u/c)²; dt has a first-order part ux/c². */
    function ecartGalilee(e, u) {
      const p = api.galileeEvt(e, u), g = api.gamma(u), k = gammaMoinsUn(u);
      return { dx: k * p.x, dt: k * p.t - g * u * (e.x || 0) / C2 };
    }
    /* A signal that moves at w along x in S (from the origin at t = 0), measured from S' that moves at u along x, through
       "galilee" (15.2) or "lorentz" (15.3): the slope Δx'/Δt' of two of its events. Galileo gives w − u (c − u for light,
       the speed (15.2w)); Lorentz gives c for light, whatever u. |w| ≤ c for "lorentz". */
    function vitesseVue(w, u, transfo) {
      fini(w, "w"); const T = transfo === "galilee" ? api.galileeEvt : transfo === "lorentz" ? api.lorentz : err("transfo : « galilee » ou « lorentz »");
      if (transfo === "lorentz" && Math.abs(w) > C) err("|w| doit être ≤ c");
      const a = T({ t: 0, x: 0 }, u), b = T({ t: 1, x: w }, u);
      return (b.x - a.x) / (b.t - a.t);
    }
    /* §15-1: a ball thrown in a train that runs at u along x, with the velocity v0 = [vx, vy] relative to the train, from
       the train's origin at t = 0. The platform sees Newton's motion under the weight alone (g down, no air drag):
       x = (u + vx)t, y = vy t − g t²/2. The train reads it through (15.2). Both accelerations come from second
       differences of the samples, each frame with its own clock: they agree, which is the principle of relativity for
       mechanics. Valid while (u/c)² is negligible (Galileo); n intervals over [0, duree]. */
    function lancerWagon(o) {
      const u = fini(o.u, "u"), g = pos(o.g, "g"), T = pos(o.duree, "duree"), n = Math.round(fini(o.n || 100, "n"));
      const v0 = o.v0 || [0, 0]; fini(v0[0], "vx"); fini(v0[1], "vy"); if (n < 2) err("n doit être ≥ 2");
      const sol = [], wagon = [];
      for (let i = 0; i <= n; i++) {
        const t = T * i / n, e = { t, x: (u + v0[0]) * t, y: v0[1] * t - g * t * t / 2 };
        sol.push(e); const w = api.galileeEvt(e, u); wagon.push({ t: w.t, x: w.x, y: w.y });
      }
      const acc = s => { const m = Math.floor(n / 2), h = s[m + 1].t - s[m].t, d2 = q => (s[m + 1][q] - 2 * s[m][q] + s[m - 1][q]) / (h * h);
        return [d2("x"), d2("y")]; };
      return { sol, wagon, accSol: acc(sol), accWagon: acc(wagon) };
    }
    /* §15-3, the ether model: light goes at c relative to an ether in which the apparatus drifts at u. The round trip of
       an arm of rest length L at the angle θ to u, exact: (2L/c) √(1 − β² sin²θ)/(1 − β²); (15.4) at θ = 0, (15.5) at
       θ = π/2. contraction: the arm shortened along u by √(1 − β²) (15.6); the round trip is then (2L/c)γ at every angle,
       (15.7). excesAllerRetour gives c t/(2L) − 1 without cancellation. */
    function excesAllerRetour(theta, u, contraction) {
      fini(theta, "theta"); const k = gammaMoinsUn(u);
      if (contraction) return k;
      const b2 = (u / C) ** 2, s2 = Math.sin(theta) ** 2;
      return b2 * (2 - s2 - b2) / ((1 - b2) * (Math.sqrt(1 - b2 * s2) + 1 - b2));
    }
    function allerRetour(L, theta, u, contraction) { return 2 * pos(L, "L") / C * (1 + excesAllerRetour(theta, u, contraction)); }
    /* The interferometer of Michelson and Morley: arm 1 (rest length L1) at the angle θ to the drift u, arm 2 (L2) at
       θ + π/2, light of wavelength lambda. { t1, t2, dt = t1 − t2, ordre = c dt/λ (fringes), decalage: the fringe shift
       when the apparatus turns from θ to θ + π/2, 2(L1 + L2)(ε(θ) − ε(θ + π/2))/λ, the difference L1 − L2 cancelling;
       attendu: its largest value, from θ = 0, ≈ 2Lβ²/λ for L1 = L2 = L (15.7w) }. Ether model, plane mirrors, no glass
       in the paths, the arms rigid unless contraction is set. */
    function michelsonMorley(o) {
      const L1 = pos(o.L1, "L1"), L2 = pos(o.L2 === undefined ? o.L1 : o.L2, "L2"), u = fini(o.u, "u"), lam = pos(o.lambda, "lambda");
      const th = fini(o.theta || 0, "theta"), ct = !!o.contraction, Q = Math.PI / 2;
      const e1 = excesAllerRetour(th, u, ct), e2 = excesAllerRetour(th + Q, u, ct);
      const dt = 2 / C * (L1 - L2 + L1 * e1 - L2 * e2);
      const rot = a => 2 * (L1 + L2) * (excesAllerRetour(a, u, ct) - excesAllerRetour(a + Q, u, ct)) / lam;
      return { t1: allerRetour(L1, th, u, ct), t2: allerRetour(L2, th + Q, u, ct), dt, ordre: C * dt / lam, decalage: rot(th), attendu: rot(0) };
    }
    Object.assign(api, { gammaMoinsUn, ecartGalilee, vitesseVue, lancerWagon, excesAllerRetour, allerRetour, michelsonMorley });
  }

  /* ---------- étape « Gravitation et horloges » (Feynman II.42.4 à 42.6) ---------- */
  {
    /* proper time of an ideal clock that moves at v(t) (m·s⁻¹, t the time of an inertial frame) from 0 to T:
       ∫ √(1 − v²/c²) dt, composite Simpson on n slices (even, default 2000). Exact in special relativity for an ideal clock,
       whose rate depends on its speed only, not on its acceleration; no gravitation. Throws if |v| reaches c. */
    function tempsPropre(v, T, n) {
      if (typeof v !== "function") err("v doit être une fonction du temps");
      pos(T, "T"); n = n == null ? 2000 : n;
      if (!(Number.isInteger(n) && n >= 2 && n % 2 === 0)) err("n doit être un entier pair ≥ 2");
      const h = T / n, f = t => 1 / api.gamma(fini(v(t), "v(t)"));
      let s = f(0) + f(T);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(i * h);
      return s * h / 3;
    }
    /* the straight, uniform trip between two events D apart in space and T apart in time (frame where they are fixed):
       √(T² − D²/c²), the longest proper time of all trips that join them. Exact in special relativity; 0 ≤ D < cT. */
    function tempsPropreDroit(D, T) {
      pos(T, "T"); fini(D, "D"); if (!(Math.abs(D) < C * T)) err("|D| doit être < cT");
      const b = D / (C * T); return T * Math.sqrt((1 - b) * (1 + b));
    }
    /* from A to B, D apart, in two halves of duration T/2: the share p of D in the first half, the rest in the second
       (p > 1 or p < 0: past B or behind A, then back). { v1, v2, tau, approx }, approx = T − (v1² + v2²)T/(4c²) the
       small-speed form, which neglects β⁴/8 per half. Exact for an ideal clock whose speed changes at once at T/2. */
    function deuxEtapes(D, T, p) {
      pos(T, "T"); fini(D, "D"); fini(p, "p");
      const v1 = 2 * p * D / T, v2 = 2 * (1 - p) * D / T;
      return { v1, v2, tau: T / 2 / api.gamma(v1) + T / 2 / api.gamma(v2), approx: T - (v1 * v1 + v2 * v2) * T / (4 * C2) };
    }
    /* a ball released at rest h0 above the floor of a closed cabin. g: the field where the cabin is (m·s⁻², downwards,
       0 far from any mass); A: the cabin's own acceleration in an inertial frame (upwards > 0; held on the ground A = 0,
       free fall A = −g, a rocket A = a). In the cabin the ball falls at g + A: { gApp, h(t), tSol } (tSol null if it
       never lands). Exact in Newtonian mechanics for a uniform field and a cabin that does not rotate. */
    function chuteCabine(o) {
      const g = fini(o.g, "g"), A = fini(o.A, "A"), h0 = pos(o.h0, "h0"), gApp = g + A;
      const tSol = gApp > 0 ? Math.sqrt(2 * h0 / gApp) : null;
      return { gApp, tSol, h: t => (tSol !== null && t >= tSol ? 0 : h0 - gApp * fini(t, "t") * t / 2) };
    }
    /* tidal acceleration, relative to the centre of a cabin falling freely at r from a point mass GM, of a body d away
       from the centre, along the radius (vertical, away) and across it (horizontal, towards the centre): { vertical:
       2GM d/r³, horizontal: −GM d/r³, omega2: GM/r³ }. First order in d/r: the terms dropped are relatively 1,5 d/r. */
    function maree(GM, r, d) {
      pos(GM, "GM"); pos(r, "r"); fini(d, "d"); const w2 = GM / (r * r * r);
      return { vertical: 2 * w2 * d, horizontal: -w2 * d, omega2: w2 };
    }
    /* drift after t of a body released at rest d from the centre of the free cabin: vertical d(cosh √2ωt − 1) > 0,
       horizontal d(cos ωt − 1) < 0, written with sinh² and sin² so that nothing cancels when ωt ≪ 1. Exact solution
       of the first-order tidal equations (ω² = GM/r³) with r and the direction of the body fixed: valid for ωt ≪ 1 (in a
       circular orbit, the horizontal part across the orbital plane stays right at any t); the cabin does not rotate. */
    function deriveMaree(GM, r, d, t) {
      const w = Math.sqrt(maree(GM, r, d).omega2), x = w * fini(t, "t");
      return { vertical: 2 * d * Math.sinh(Math.SQRT2 * x / 2) ** 2, horizontal: -2 * d * Math.sin(x / 2) ** 2 };
    }
    /* the rocket of (42.5): the tail B has proper acceleration g, the head A is H above it (proper distance; the ship is
       rigid in Born's sense, so A accelerates at g/(1 + gH/c²)). A emits a flash every T0 of its own time, n flashes.
       In the inertial frame where the ship starts at rest, x = X cosh η, ct = X sinh η with X_B = c²/g, X_A = X_B + H.
       { eclairs: [{ te, xe, ta, xa }] (s, m; emission at A, arrival at B), tauB: B's proper time between arrivals,
       rapport: T0/tauB = 1 + gH/c² }. Exact in special relativity; no gravitation. */
    function fuseeRigide(g, H, T0, n) {
      pos(g, "g"); pos(H, "H"); pos(T0, "T0"); n = n == null ? 4 : n;
      const XB = C2 / g, XA = XB + H, sh = Math.log(XA / XB), eclairs = [];
      for (let k = 0; k < n; k++) {
        const eta = C * k * T0 / XA, etaB = eta + sh;                 // light going down: x + ct is constant
        eclairs.push({ te: XA * Math.sinh(eta) / C, xe: XA * Math.cosh(eta), ta: XB * Math.sinh(etaB) / C, xa: XB * Math.cosh(etaB) });
      }
      const tauB = XB * (C * T0 / XA) / C;
      return { eclairs, tauB, rapport: T0 / tauB, XA, XB };
    }
    /* the same with Newton's rocket: both ends at x = x0 + g t²/2 from rest at t = 0, flashes every T0 of inertial time,
       light at c in that frame. { eclairs, intervalles (between arrivals) }. First order in gH/c² and in gt/c: the clocks'
       own dilation (gt/c)²/2 and the ship's contraction are neglected. */
    function fuseeNewton(g, H, T0, n) {
      pos(g, "g"); pos(H, "H"); pos(T0, "T0"); n = n == null ? 4 : n;
      const eclairs = [];
      for (let k = 0; k < n; k++) {
        const te = k * T0, xe = H + g * te * te / 2, K = xe + C * te;          // g ta²/2 + c ta = K
        const ta = 2 * K / (C + Math.sqrt(C2 + 2 * g * K));
        eclairs.push({ te, xe, ta, xa: g * ta * ta / 2 });
      }
      return { eclairs, intervalles: eclairs.slice(1).map((e, i) => e.ta - eclairs[i].ta) };
    }
    /* (42.5) for two clocks H apart in a uniform field g: gH/c², the fraction by which the higher one runs faster.
       First order in gH/c²; the field taken uniform, which errs by about H/R in front of ecartPotentiel. */
    function decalageUniforme(g, H) { return fini(g, "g") * fini(H, "H") / C2; }
    /* ΔΦ/c² between r1 and r2 from the centre of a spherical mass GM: GM(1/r1 − 1/r2)/c², > 0 when r2 > r1 (the clock
       at r2 runs faster by this fraction). First order in GM/(rc²), 7 × 10⁻¹⁰ at the Earth's surface: the terms dropped
       are of order its square, 5 × 10⁻¹⁹; the body spherical, rotation ignored. */
    function ecartPotentiel(GM, r1, r2) {
      pos(GM, "GM"); pos(r1, "r1"); pos(r2, "r2");
      return GM * (r2 - r1) / (r1 * r2 * C2);
    }
    /* a clock on a circular orbit of radius r compared with a clock on the rotating geoid: { gravitation: L_G − GM/(rc²),
       vitesse: −GM/(2rc²), total }, fractions of rate (× 86 400 s: s per day). L_G = W0/c² (IAU) already contains the
       ground clock's rotation. First order in 1/c²; the orbit circular, the Earth spherical outside (its flattening
       changes the result by about 10⁻¹³ in low orbit, less higher up). */
    function marcheOrbite(r, GM, LG) {
      GM = GM == null ? Cst.GM_E : pos(GM, "GM"); LG = LG == null ? Cst.L_G : fini(LG, "L_G"); pos(r, "r");
      const gravitation = LG - GM / (r * C2), vitesse = -GM / (2 * r * C2);
      return { gravitation, vitesse, total: gravitation + vitesse };
    }
    Object.assign(api, { tempsPropre, tempsPropreDroit, deuxEtapes, chuteCabine, maree, deriveMaree, fuseeRigide, fuseeNewton,
      decalageUniforme, ecartPotentiel, marcheOrbite });
  }

  /* ---------- étape « Dynamique relativiste » (Feynman I.15.8, 15.9, 16.4, 16.5) ---------- */
  {
    /* m is the mass (Feynman's m0, the same for every observer); m_v = γm is Feynman's « mass » that grows with speed. */
    const masse = (m, nom) => (Number.isFinite(m) && m >= 0 ? m : err((nom || "m") + " doit être un nombre ≥ 0"));
    const vitesse = v => { const w = Array.isArray(v) ? v : [fini(v, "v"), 0, 0];
      if (w.length !== 3) err("v doit être un nombre ou un vecteur à 3 composantes"); w.forEach((x, i) => fini(x, "v[" + i + "]"));
      return { w, s: Math.hypot(...w) }; };
    /* (15.10): p = γ m v, a number or a vector like v. Exact for a point body whose mass does not change; |v| < c. */
    function impulsion(m, v) {
      masse(m); const { w, s } = vitesse(v), g = api.gamma(s);
      return Array.isArray(v) ? w.map(x => g * m * x) : g * m * v;
    }
    /* m_v = γ m: the coefficient of (16.8), Feynman's relativistic mass (15.1), (16.10). Exact as a definition. */
    function masseVitesse(m, v) { masse(m); return api.gamma(vitesse(v).s) * m; }
    /* E = γ m c², total energy; T = (γ − 1) m c², kinetic energy (16.12), without cancellation at low speed. Exact. */
    function energie(m, v) { return masseVitesse(m, v) * C2; }
    function cinetique(m, v) { masse(m); return api.gammaMoinsUn(vitesse(v).s) * m * C2; }
    /* the state of a body of mass m > 0 given its kinetic energy T ≥ 0 (J). Exact. unMoinsBeta = 1 − v/c, kept to the last
       digits when γ is large: 1/(γ²(1 + β)). */
    function depuisCinetique(m, T) {
      pos(m, "m"); if (!(Number.isFinite(T) && T >= 0)) err("T doit être un nombre ≥ 0");
      const k = T / (m * C2), g = 1 + k, b2g2 = k * (k + 2), beta = Math.sqrt(b2g2) / g;
      return { gamma: g, beta, unMoinsBeta: 1 / (g * g * (1 + beta)), v: beta * C, p: m * C * Math.sqrt(b2g2), E: g * m * C2, T };
    }
    /* (16.13): the mass of a body (or of a system: total E and P) from E and p: √(E² − p²c²)/c². Exact. E ≥ |p| c. */
    function masseDepuis(E, p) {
      fini(E, "E"); const q = Math.abs(fini(p, "p")) * C;
      if (!(E >= q * (1 - 1e-12))) err("il faut E ≥ |p| c");
      return Math.sqrt(Math.max(0, (E - q) * (E + q))) / C2;
    }
    /* (16.14): v = p c²/E. Exact; |v| = c when E = |p| c (no mass). */
    function vitesseDepuis(E, p) { pos(E, "E"); fini(p, "p"); if (Math.abs(p) * C > E * (1 + 1e-12)) err("il faut E ≥ |p| c"); return p * C2 / E; }
    /* (15.11) and beyond: the first n terms of m_v = m(1 − β²)^(−1/2) = m(1 + ½β² + ⅜β⁴ + …). n = 2 is (15.11).
       The series converges for |v| < c; while β is small, the first neglected term is the error. */
    function serieMasse(m, v, n) {
      masse(m); const b2 = (vitesse(v).s / C) ** 2;
      if (!(Number.isInteger(n) && n >= 1)) err("n doit être un entier ≥ 1");
      let a = 1, s = 0;
      for (let k = 0; k < n; k++) { if (k) a *= b2 * (2 * k - 1) / (2 * k); s += a; }
      return m * s;
    }
    /* how the body answers a force, from F = dp/dt and (15.10): F ⊥ v gives a⊥ = F/(γm), F ∥ v gives a∥ = F/(γ³m).
       Exact for a point body; the « mass » that resists depends on the direction of the force. */
    function inerties(m, v) { masse(m); const g = api.gamma(vitesse(v).s); return { transversale: g * m, longitudinale: g * g * g * m }; }
    /* a constant force F along x, from rest at x = 0, t = 0: p = F t exactly, and v, x of hyperbolic motion
       (hyperbolique, a = F/m). Newton's v = F t/m, x = F t²/(2m) to compare. Exact while the force is the same in the lab
       at every speed (a uniform electric field: F = qE) and radiation is neglected. */
    function forceConstante(m, F, t) {
      pos(m, "m"); pos(F, "F"); fini(t, "t"); if (t < 0) err("t doit être ≥ 0");
      const h = api.hyperbolique(F / m, t);
      return { p: F * t, v: h.v, x: h.x, gamma: Math.sqrt(1 + (F * t / (m * C)) ** 2), vNewton: F * t / m, xNewton: F * t * t / (2 * m) };
    }
    /* the lead that light takes over a body of Lorentz factor γ after both have travelled L: L(1 − β), exact. */
    function avanceLumiere(g, L) {
      if (!(Number.isFinite(g) && g >= 1)) err("γ doit être ≥ 1"); pos(L, "L");
      const beta = Math.sqrt((g - 1) * (g + 1)) / g; return L / (g * g * (1 + beta));
    }
    /* the uniform field B ⊥ v that bends a charge q of momentum p on a circle of radius ρ: B = p/(|q| ρ). Exact (the
       force q v ∧ B is ⊥ v, so p keeps its size); radiation neglected. */
    function champCourbure(p, q, rho) { pos(p, "p"); fini(q, "q"); if (q === 0) err("q ne doit pas être nulle"); pos(rho, "rho"); return p / (Math.abs(q) * rho); }
    /* (16.8)–(16.10): the elastic collision of two equal bodies, seen from the car that moves with the horizontal velocity
       of body 1. Body 1 goes up at w and comes back down; body 2 moves at u horizontally and, by (16.7), at w√(1 − u²/c²)
       vertically, down then up. Given the law mDe(speed) for the coefficient m_v of (16.8), the vertical momentum changes
       of both bodies and their sum (0 when momentum is conserved). v is the speed of body 2, v² = u² + w²(1 − u²/c²). */
    function collisionTransverse(u, w, mDe) {
      fini(u, "u"); fini(w, "w"); if (!(Math.abs(u) < C && Math.abs(w) < C)) err("|u| et |w| doivent être < c");
      if (typeof mDe !== "function") err("mDe doit être une fonction de la vitesse");
      const wy = w * Math.sqrt((1 - u / C) * (1 + u / C)), v = Math.hypot(u, wy);
      const mw = masse(mDe(Math.abs(w)), "mDe(w)"), mv = masse(mDe(v), "mDe(v)");
      const dp1 = -2 * mw * w, dp2 = 2 * mv * wy;
      return { v, wy, mw, mv, dp1, dp2, somme: dp1 + dp2, rapport: mw / mv };
    }
    /* (16.11): two bodies of mass m at ±w stick together: the body at rest that they make has the mass M = 2 γ_w m, more
       than 2m by the kinetic energy brought in, over c². Exact within special relativity (momentum and energy conserved). */
    function collage(m, w) { pos(m, "m"); const k = api.gammaMoinsUn(fini(w, "w")) * m; return { M: 2 * m + 2 * k, exces: 2 * k, energie: 2 * k * C2 }; }
    /* (16.11a): the energy released when a body of mass M at rest becomes bodies of masses (at rest) m1, m2, …:
       (M − Σm) c². Exact; negative when the reaction needs energy. Masses in kg, the result in J. */
    function energieLiberee(M, filles) {
      masse(M, "M"); if (!Array.isArray(filles) || !filles.length) err("filles : liste non vide des masses produites");
      return (M - filles.reduce((s, m, i) => s + masse(m, "filles[" + i + "]"), 0)) * C2;
    }
    /* power radiated by a charge q of mass m pushed along its velocity by a force F (Larmor's formula, made relativistic by
       Liénard, for a linear motion: P = q²F²/(6π ε0 m² c³), the same at every speed), and the fraction P/(F v) of the
       power received that it carries away at speed v. Classical radiation; F constant in the lab. */
    function rayonnementLineaire(q, m, F, v) {
      fini(q, "q"); pos(m, "m"); pos(F, "F"); pos(v, "v");
      const P = q * q * F * F / (6 * Math.PI * Cst.eps0 * m * m * C2 * C);
      return { P, fraction: P / (F * v) };
    }
    Object.assign(api, { impulsion, masseVitesse, rayonnementLineaire, energie, cinetique, depuisCinetique, masseDepuis, vitesseDepuis, serieMasse,
      inerties, forceConstante, avanceLumiere, champCourbure, collisionTransverse, collage, energieLiberee });
  }

  /* ---------- étape « Courbure et équations d'Einstein » (Feynman II.42.7 à 42.9) ---------- */
  {
    /* The rectangle in space-time (§42-7): two objects at rest, one on the ground, one H higher, each followed for `duree`
       on its own clock (B → D below, A → C above). The field is static, so light signals sent between them always take the
       same time, and they fix which event up there is simultaneous with D: the event C′, reached when the upper clock reads
       duree (1 + φ). The side AC is too short by ecart = duree φ (42.6t); C happens at dateC = duree/(1 + φ) on the lower
       clock. φ = ΔΦ/c²: { H, duree, g } uniform field, decalageUniforme (errs by about H/R); { H, duree, GM, R } a spherical
       body of radius R, ecartPotentiel. First order in φ (error of order φ², 10⁻³¹ for 30 m on the Earth). H ≥ 0. */
    function rectangle(o) {
      const H = fini(o.H, "H"); if (H < 0) err("H doit être ≥ 0");
      const phi = o.GM !== undefined ? api.ecartPotentiel(o.GM, pos(o.R, "R"), o.R + H) : api.decalageUniforme(pos(o.g, "g"), H);
      const d = pos(o.duree, "duree");
      return { phi, haut: d * (1 + phi), ecart: d * phi, dateC: d / (1 + phi) };
    }
    /* The radius of curvature of space-time that no choice of frame removes: the tides. Outside a spherical body the
       components of the curvature are GM/(r³c²) and 2GM/(r³c²) (Schwarzschild, weak field), so the radius is of the order
       of c/√(GM/r³), m. An order of magnitude, within a factor √2. */
    function rayonCourbure(GM, r) { pos(GM, "GM"); pos(r, "r"); return C / Math.sqrt(GM / (r * r * r)); }

    /* Trajectories that leave the ground (H = 0) at t = 0 and are back at t = T, with the peak height h = α gT²/8
       (α = 1: the peak of a ball thrown up that falls back after T) and the horizontal distance D covered at the constant
       speed D/T. "parabole": H = 4h t(T − t)/T²; "triangle": up then down at constant speed; "palier": up in T/10 at
       constant speed, a wait at h, down in T/10. Kinematics only: no force is said to produce them. α ≥ 0, D ≥ 0.
       → { H(t), vz(t), vx, h, T, coudes: the times where vz jumps }. */
    function trajet(forme, o) {
      const T = pos(o.T, "T"), g = pos(o.g, "g"), al = fini(o.alpha === undefined ? 1 : o.alpha, "alpha"), D = fini(o.D || 0, "D");
      if (al < 0 || D < 0) err("alpha et D doivent être ≥ 0");
      const h = al * g * T * T / 8, vx = D / T;
      const dans = t => { fini(t, "t"); if (t < 0 || t > T * (1 + 1e-12)) err("t doit être dans [0, T]"); return Math.min(t, T); };
      if (forme === "parabole") return { h, T, vx, coudes: [],
        H: t => { t = dans(t); return 4 * h * t * (T - t) / (T * T); }, vz: t => { t = dans(t); return 4 * h * (T - 2 * t) / (T * T); } };
      if (forme === "triangle") return { h, T, vx, coudes: [T / 2],
        H: t => { t = dans(t); return h * (1 - Math.abs(2 * t / T - 1)); }, vz: t => { t = dans(t); return t < T / 2 ? 2 * h / T : t > T / 2 ? -2 * h / T : 0; } };
      if (forme === "palier") { const m = T / 10, v = h / m;
        return { h, T, vx, coudes: [m, T - m],
          H: t => { t = dans(t); return t < m ? v * t : t > T - m ? v * (T - t) : h; }, vz: t => { t = dans(t); return t < m ? v : t > T - m ? -v : 0; } }; }
      return err("forme inconnue : " + forme);
    }
    /* The excess of proper time of a clock carried along tr over a clock that stays on the ground, both read between the
       same two events (duration tr.T on the ground clock): (42.17), (1/c²)∫(gH − v²/2) dt, v² = vx² + vz². Simpson's rule
       on n intervals per smooth piece (split at tr.coudes): exact for the three shapes of trajet. Uniform static field g,
       v ≪ c, gH ≪ c². { exces, gravite (> 0), vitesse (≤ 0), exact: ∫(√(1 + 2gH/c² − v²/c²) − 1) dt, the root not expanded
       (the weak-field metric also multiplies v² by 1 − 2gH/c²: a difference of order gHv²/c⁴, beyond this form), action: (42.18) per unit mass, ∫(v²/2 − gH) dt, J·s·kg⁻¹ }. */
    function excesTempsPropre(tr, g, n) {
      pos(g, "g"); n = n === undefined ? 200 : n; if (!(Number.isInteger(n) && n >= 2 && n % 2 === 0)) err("n doit être un entier pair ≥ 2");
      const bornes = [0, ...tr.coudes, tr.T];
      const simpson = f => { let s = 0;
        for (let k = 0; k + 1 < bornes.length; k++) {
          const a = bornes[k], b = bornes[k + 1], dt = (b - a) / n;
          /* inside the piece: the corners are only touched at its ends, read just inside */
          const at = i => f(i === 0 ? a + dt * 1e-9 : i === n ? b - dt * 1e-9 : a + i * dt);
          let p = at(0) + at(n); for (let i = 1; i < n; i++) p += (i % 2 ? 4 : 2) * at(i);
          s += p * dt / 3;
        } return s; };
      const v2 = t => tr.vx * tr.vx + tr.vz(t) ** 2;
      const grav = simpson(t => g * tr.H(t)), cin = simpson(t => v2(t) / 2);
      const exact = simpson(t => { const x = (2 * g * tr.H(t) - v2(t)) / C2; return x / (Math.sqrt(1 + x) + 1); });
      return { exces: (grav - cin) / C2, gravite: grav / C2, vitesse: -cin / C2, exact, action: cin - grav };
    }

    Object.assign(api, { rectangle, rayonCourbure, trajet, excesTempsPropre });
  }

  /* ---------- étape « Quadrivecteurs de l'électrodynamique » (Feynman II.25.1 à 25.3) ---------- */
  {
    const fn = (f, nom) => (typeof f === "function" ? f : err(nom + " doit être une fonction de l'événement [ct, x, y, z]"));
    const evt4 = e => { if (!Array.isArray(e) || e.length !== 4) err("e doit être un événement [ct, x, y, z]");
      e.forEach((x, i) => fini(x, "e[" + i + "]")); return e; };
    const num = (v, nom) => (Number.isFinite(v) ? v : err(nom + " n'est pas un nombre fini en cet événement"));
    /* f at e shifted by s along the axis k */
    const decale = (f, e, k, s) => { const a = e.slice(); a[k] += s; return num(f(a), "le champ"); };
    /* (25.5): [γ, γβ] in units of c, for a velocity βc (a number along x, or a vector). Exact; |β| < 1. Its square is 1. */
    function quadriVitesse(beta) {
      const b = typeof beta === "number" ? [beta, 0, 0] : beta;
      return api.quadriImpulsion(1, b);
    }
    /* ∂f/∂x_k for the four axes, centred differences of step h: error ≈ h² f‴/6, so h must be small against the scale on
       which f changes (a wavelength over 2π, a pulse width), but not so small that rounding wins (h ≳ 1e-5 of that scale). */
    function derivees(f, e, h) {
      fn(f, "f"); evt4(e); pos(h, "h");
      return [0, 1, 2, 3].map(k => (decale(f, e, k, h) - decale(f, e, k, -h)) / (2 * h));
    }
    /* (25.16): the four-gradient of a scalar field, [∂f/∂(ct), −∂f/∂x, −∂f/∂y, −∂f/∂z], in (unit of f)·m⁻¹. Exact as a
       definition; the differences are the approximation. */
    function gradientQuadri(f, e, h) { const d = derivees(f, e, h); return [d[0], -d[1], -d[2], -d[3]]; }
    /* the wrong guess (∂/∂(ct), +∇): it does not transform like a four-vector, (25.14) and (25.15) have the wrong signs. */
    function gradientNaif(f, e, h) { return derivees(f, e, h); }
    /* (25.17): the four-divergence of a four-vector field F(e) = [Ft, Fx, Fy, Fz]: ∂Ft/∂(ct) + ∇·F. Invariant. */
    function divergenceQuadri(F, e, h) {
      fn(F, "F"); evt4(e); pos(h, "h");
      const comp = k => a => { const v = F(a); if (!Array.isArray(v) || v.length !== 4) err("F doit rendre un quadrivecteur"); return v[k]; };
      return [0, 1, 2, 3].reduce((s, k) => s + (decale(comp(k), e, k, h) - decale(comp(k), e, k, -h)) / (2 * h), 0);
    }
    /* (25.20): ∂²f/∂(ct)² − ∇²f, second differences of step h (error ≈ h² f⁗/12). Invariant scalar operator. */
    function dalembertien(f, e, h) {
      fn(f, "f"); evt4(e); pos(h, "h");
      const f0 = num(f(e), "le champ"), d2 = k => (decale(f, e, k, h) - 2 * f0 + decale(f, e, k, -h)) / (h * h);
      return d2(0) - d2(1) - d2(2) - d2(3);
    }
    /* the field as the observer moving at βc reads it, origins together: e′ is that observer's event, e = Λ⁻¹ e′ the same
       event for the first frame; a scalar keeps its value, a four-vector is boosted. Exact for a true scalar (the same
       number for every observer, like a phase) and a true four-vector field. */
    const versLui = (beta) => { if (typeof beta === "number") { fini(beta, "beta"); return e => api.boostQuadri(e, beta); }
      return e => api.boostQuadriVecteur(e, beta); };
    const versNous = (beta) => versLui(typeof beta === "number" ? -beta : beta.map(x => -x));
    function scalaireVu(f, beta) { fn(f, "f"); const back = versNous(beta); back([0, 0, 0, 0]); return e => f(back(evt4(e))); }
    function quadriChampVu(F, beta) { fn(F, "F"); const back = versNous(beta), go = versLui(beta); back([0, 0, 0, 0]); return e => go(F(back(evt4(e)))); }
    Object.assign(api, { quadriVitesse, gradientQuadri, gradientNaif, divergenceQuadri, dalembertien, scalaireVu, quadriChampVu });
  }

  /* ---------- étape « Champs d'une charge rapide » (Feynman II.26.3, 26.4, 31.8) ---------- */
  {
    /* Index order t, x, y, z; a tensor is a 4 × 4 array of arrays. Feynman writes every index down and puts the metric in
       the sums, η = diag(+1, −1, −1, −1). In SI x_t = ct and A_t = φ/c, so F_xt = E_x/c: every component in T. */
    const ETA = [1, -1, -1, -1];
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes");
      v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const t4 = (T, nom) => { if (!Array.isArray(T) || T.length !== 4 || T.some(r => !Array.isArray(r) || r.length !== 4)) err(nom + " doit être un tenseur 4 × 4");
      T.forEach((r, i) => r.forEach((x, j) => fini(x, nom + "[" + i + "][" + j + "]"))); return T; };
    const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    /* Table 26-1 in SI. Exact: the definition (26.19), F_μν = ∇_μ A_ν − ∇_ν A_μ, written with the fields. */
    function tenseurF(E, B) {
      v3(E, "E"); v3(B, "B"); const [ex, ey, ez] = E.map(x => x / C), [bx, by, bz] = B;
      return [[0, -ex, -ey, -ez], [ex, 0, -bz, by], [ey, bz, 0, -bx], [ez, -by, bx, 0]];
    }
    /* back to E and B; refuses a tensor that is not antisymmetric (to 1e-12 of its largest component). */
    function champsDeF(F) {
      t4(F, "F"); const big = Math.max(...F.flat().map(Math.abs));
      for (let i = 0; i < 4; i++) for (let j = 0; j <= i; j++)
        if (Math.abs(F[i][j] + F[j][i]) > 1e-12 * big) err("F doit être antisymétrique");
      return { E: [F[1][0] * C, F[2][0] * C, F[3][0] * C], B: [-F[2][3], -F[3][1], -F[1][2]] };
    }
    /* (26.22): T′ = Λ T Λᵀ, each index transformed like a four-vector (26.21), for a frame moving at βc (a number along x,
       or a vector). Λ T: boostQuadriVecteur on each column; then on each row. Exact for any rank-2 tensor, origins together. */
    function boostTenseur(T, beta) {
      t4(T, "T"); const cols = [0, 1, 2, 3].map(j => api.boostQuadriVecteur(T.map(r => r[j]), beta));
      return [0, 1, 2, 3].map(i => api.boostQuadriVecteur(cols.map(c => c[i]), beta));
    }
    function champsVus(E, B, beta) { return champsDeF(boostTenseur(tenseurF(E, B), beta)); }
    /* the two invariants: E·B (V·T·m⁻¹) and E² − c²B² (V²·m⁻²); FF = Σ_μν η_μ η_ν F_μν² = 2(B² − E²/c²), T². Exact. */
    function invariantsChamp(E, B) {
      v3(E, "E"); v3(B, "B"); const F = tenseurF(E, B);
      const FF = F.reduce((s, r, i) => s + r.reduce((t, x, j) => t + ETA[i] * ETA[j] * x * x, 0), 0);
      return { EB: dot3(E, B), E2c2B2: dot3(E, E) - C2 * dot3(B, B), FF };
    }
    /* (26.28): [γ F·β, γ F], N, for the ordinary force F on a particle moving at βc. Exact definition. */
    function quadriForce(F, beta) {
      v3(F, "F"); const b = typeof beta === "number" ? [beta, 0, 0] : v3(beta, "beta"), s = Math.hypot(...b);
      if (!(s < 1)) err("|beta| doit être < 1"); const g = 1 / Math.sqrt((1 - s) * (1 + s));
      return [g * dot3(F, b), g * F[0], g * F[1], g * F[2]];
    }
    /* (26.37): f_μ = q Σ_ν η_ν u_ν F_μν, with u in units of c (so a factor c): N. Exact for a point charge in a given field;
       its space part is γ q (E + v ∧ B), its time part γ q E·β. */
    function forceF(q, F, u) {
      fini(q, "q"); t4(F, "F"); if (!Array.isArray(u) || u.length !== 4) err("u doit être une quadrivitesse [ut, ux, uy, uz]");
      u.forEach((x, i) => fini(x, "u[" + i + "]"));
      return F.map(r => q * C * r.reduce((s, x, j) => s + ETA[j] * u[j] * x, 0));
    }
    /* (26.39) step by step in proper time s, uniform fields: dx_μ/ds = c u_μ (x in m, x_t = ct), du_μ/ds = f_μ/(m c).
       o = { q, m, E, B, beta0 (number along x or vector, default 0), s (total proper time), n (RK4 steps, default 2000) }.
       { s, x, u (each n + 1 samples), ecartNorme = max |u·u − 1|/u_t² }: u·u = 1 is not imposed, so it measures the error
       (relative to the size of the components, which grow without bound when E > cB).
       Classical point charge, no radiation reaction (its force is ~ q²γ⁴a²/(6π ε0 c³ v) of the work, beyond this model). */
    function mouvementPropre(o) {
      const q = fini(o.q, "q"), m = pos(o.m, "m"), F = tenseurF(o.E || [0, 0, 0], o.B || [0, 0, 0]), S = pos(o.s, "s");
      const n = o.n == null ? 2000 : o.n; if (!(Number.isInteger(n) && n >= 1 && n <= 1e6)) err("n doit être un entier entre 1 et 10⁶");
      const b0 = o.beta0 == null ? 0 : o.beta0, u0 = Math.hypot(...(typeof b0 === "number" ? [b0] : b0)) === 0 ? [1, 0, 0, 0] : api.quadriImpulsion(1, b0);
      const k = q / m, h = S / n;   // du/ds = f/(m c), f = q c Σ η u F
      const d = y => { const x = y.slice(4), a = F.map(r => k * r.reduce((s, v, j) => s + ETA[j] * x[j] * v, 0)); return [...x.map(v => C * v), ...a]; };
      let y = [0, 0, 0, 0, ...u0]; const s = [0], xs = [y.slice(0, 4)], us = [y.slice(4)]; let ecart = 0;
      const norme = u => Math.abs(u[0] * u[0] - u[1] * u[1] - u[2] * u[2] - u[3] * u[3] - 1) / (u[0] * u[0]);
      for (let i = 1; i <= n; i++) {
        const k1 = d(y), k2 = d(y.map((v, j) => v + h / 2 * k1[j])), k3 = d(y.map((v, j) => v + h / 2 * k2[j])), k4 = d(y.map((v, j) => v + h * k3[j]));
        y = y.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
        s.push(i * h); xs.push(y.slice(0, 4)); us.push(y.slice(4)); ecart = Math.max(ecart, norme(y.slice(4)));
      }
      return { s, x: xs, u: us, ecartNorme: ecart };
    }
    /* The stress-energy tensor of II.31.8 in SI: S_μν = −(1/μ0)(Σ_α η_α F_μα F_να − ¼ δ_μν Σ_αβ η_α η_β F_βα²), δ = η,
       μ0 = 1/(ε0 c²). S_tt = ε0E²/2 + B²/(2μ0) (J·m⁻³), S_ti = S_i/c (Poynting over c), S_ij = δ_ij u − ε0 E_i E_j − B_i B_j/μ0
       (Pa: the flow of i-momentum through a unit area normal to j; negative = tension). Exact in classical vacuum
       electrodynamics; the vacuum stays linear far below the field m²c³/(eħ) ≈ 1,3 × 10¹⁸ V·m⁻¹. */
    function tenseurEnergieImpulsion(E, B) {
      const F = tenseurF(E, B), FF = invariantsChamp(E, B).FF, inv = Cst.eps0 * C2;
      return F.map((r, i) => F.map((s, j) => -inv * (r.reduce((t, x, a) => t + ETA[a] * x * s[a], 0) - (i === j ? ETA[i] * FF / 4 : 0))));
    }
    function traceTenseur(T) { t4(T, "T"); return T.reduce((s, r, i) => s + ETA[i] * r[i], 0); }
    Object.assign(api, { tenseurF, champsDeF, boostTenseur, champsVus, invariantsChamp, quadriForce, forceF, mouvementPropre,
      tenseurEnergieImpulsion, traceTenseur });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.Relativite = api;
})(typeof self !== "undefined" ? self : this);

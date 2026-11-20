/* QuantAmp — le module commun du monde « Mécanique quantique : amplitudes » (Feynman I.37, I.38, III.3, III.4). Pur, sans DOM,
   UMD (global QuantAmp). SI partout : J, kg, m, s ; une énergie en électronvolts porte « eV » dans son nom. Chaque étape ajoute sa
   section juste avant la ligne « fin des sections », par Edit seulement, avec Object.assign(api, { … }) ; rien de ce qui existe
   n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par chaque étape ; un nom n'est exporté qu'une fois, sans alias
   (test/quantique-amplitudes-noms.test.js). Le module ne requiert que constantes.js et lecons/complexes.js (Cx) : ce qui a
   besoin d'un autre module (statistique.js, optique-ondulatoire.js) va dans un module de leçon public/lecons/<slug>.js.
   Chaque fonction est un modèle : son domaine est dans son commentaire. Les erreurs lèvent un message en français : elles
   signalent un appel faux. Tests : test/quantique-amplitudes*.test.js.

   Sommaire
   Socle
     h, hbar, c, e, m_e, eps0, a0   constantes de constantes.js (SI 2019 exactes ; CODATA 2022 mesurées), recopiées par référence.
     broglie(p)                 λ = h/p, m : longueur d'onde de de Broglie d'une quantité de mouvement p (kg·m·s⁻¹). Exacte
                                (définition) ; p est la quantité de mouvement relativiste γ m v.
     impulsion(m, Ec)           p (kg·m·s⁻¹) d'une particule de masse m (kg) et d'énergie cinétique Ec (J), relativiste exacte :
                                p c = √(Ec² + 2 Ec m c²) ; se réduit à √(2 m Ec) quand Ec ≪ m c².
   Étape « Les deux fentes » (Feynman I.37.1 à 37.5). Fente 1 en y = +d/2, fente 2 en y = −d/2, écran à la distance L, position x
   sur l'écran ; probabilités en unités de celle d'une fente seule au centre.
     amplitudesDeuxFentes(x, o)  { lambda, d, a, L } : { phi1, phi2 ({ re, im }), P1, P2, P12 = |φ1 + φ2|², somme = P1 + P2,
                                interference = 2√(P1 P2) cos δ, delta } ; (37.2) à (37.5). Fentes longues de largeur a, chacune
                                vue de loin (L ≫ a²/λ) ; δ = k(r2 − r1) exact.
     interfrangeFentes(λ, L, d)  λL/d, m : distance entre deux franges brillantes, tant que d ≪ L et x ≪ L.
     contrasteDetecteur(w, i)   |sinc(π w/i)| : contraste qui reste quand un détecteur de largeur w moyenne des franges d'interfrange i.
     visibiliteFranges(P1, P2)  2√(P1 P2)/(P1 + P2) : contraste des franges de deux ondes cohérentes ; 1 si P1 = P2.
     probaBalles(x, o)          { d, L, D, s } : { P1, P2, P12 = P1 + P2 } (37.1) ; balles tirées d'un canon à D du mur, chaque
                                trou donne une bosse gaussienne d'écart type s, centrée sur la droite canon-trou.
     aleaGraine(graine)         générateur reproductible sur [0, 1[ (mulberry32).
     tirerArrivees(f, x0, x1, n, alea)  n positions tirées selon la densité f ≥ 0 sur [x0, x1] (fonction de répartition inversée).
     histogrammeArrivees(xs, x0, x1, nb)  nombre d'arrivées dans chacune des nb cases égales de [x0, x1].
     fluctuationComptage(N, p)  { moyenne = N p, ecart = √(N p (1 − p)), relatif } : loi binomiale, arrivées indépendantes.
     instantsPoisson(debit, duree, alea)  instants d'arrivée d'un flux au hasard de débit moyen donné (s⁻¹) : écarts exponentiels.
   Étape « Observer et mesurer un électron » (Feynman I.37.6 à 37.8, I.38.1). Un témoin (photon diffusé, mur sur rouleaux) reste
   dans l'état χ1 ou χ2 selon le trou ; γ = ⟨χ1|χ2⟩, réel. Paquet : convention de Feynman e^(i(ωt − kx)).
     probaAvecTemoin(x, o, γ)   { P1, P2, P12, somme, P = P1 + P2 + γ·interference, delta } : o celui d'amplitudesDeuxFentes ;
                                γ = 1, rien ne distingue les trous (37.7) ; γ = 0, le témoin les distingue (37.8).
     recouvrementPhoton(d, λ)   sin(kd)/(kd), k = 2π/λ : recouvrement des états d'un photon diffusé près d'un trou ou de l'autre,
                                lumière incidente perpendiculaire à la ligne des trous, diffusion isotrope.
     contrasteEclaire(γ, n̄)     e^(−n̄(1 − γ)) : contraste qui reste quand un nombre de photons tiré selon Poisson (moyenne n̄) est
                                diffusé, chacun de recouvrement γ.
     distinguabiliteEclaire(γ, n̄)  Σ p_n √(1 − γ^(2n)) : ce que la meilleure mesure des photons dit du trou, en moyenne.
     photonsThomson(I, λ, τ)    n̄ = σ_T I τ λ/(hc) : photons diffusés par un électron libre éclairé pendant τ par une onde
                                d'intensité I (W·m⁻²), σ_T = (8π/3) r_e² ; ħω ≪ m c² (pas d'effet Compton).
     contrasteBrouille(σ)       e^(−σ²/2) : facteur du terme d'interférence quand une phase gaussienne d'écart type σ s'ajoute au hasard.
     reculPlaque(p, d, L)       Δ = p d/L : écart entre les reculs du mur selon le trou, électron arrivé en x = 0, d ≪ L.
     plaqueHeisenberg(σp, Δ)    { sigmaX = ħ/(2σp), V, recouvrement, D, Pjuste } : mur d'incertitude minimale ; V par le brouillage
                                des franges, recouvrement par les deux états de recul : le même nombre e^(−Δ²/(8σp²)).
     paquetLibre(x, t, o)       { re, im, P } : paquet gaussien libre { m, k0, sigma, repos }, ω = ħk²/(2m) (+ m c²/ħ si repos),
                                v ≪ c ; P = |ψ|² normée, m⁻¹.
     largeurPaquet(σ, m, t)     σ √(1 + (ħt/(2mσ²))²) : écart type de la position du paquet libre à l'instant t.
     vitessesOnde(m, p)         { groupe = pc²/E = v, phase = E/p = c²/v, phaseCinetique = Ec/p } : relativiste exacte.
   Étape « La taille de l'atome et ses niveaux » (Feynman I.38.2 à 38.6). Énergies en J ; eV = J/qe.
     etalementFente(B, p)       { lambda, BsurLambda, sin1 = λ/B, theta1, dpy = h/B, produit = B dpy } : fente de largeur B, champ
                                lointain ; B ≤ λ : pas de minimum, theta1 null, dpy = p.
     trainReseau(N, m, λ)       (38.4) à (38.7) : { L = N m λ, relatif = 1/(N m), dk = 2π/L, dp = h/L }.
     dureeTrain(T)              (38.8) : { domega = 2π/T, dE = h/T }.
     lambdaEnergie(m, Ec)       λ d'une particule de masse m et d'énergie cinétique Ec, relativiste ; m = 0 : photon, hc/Ec.
     seuilBragg(d, m)           { lambda = 2d, v, Ec, T = Ec/k_B } : au-delà de λ = 2d, (38.9) n'a plus de solution.
     atomeIncertitude(a, o)     (38.10) avec p ≈ ξħ/a : { cinetique, potentielle, totale }, o = { xi, m, Z } (1, m_e, 1).
     atomeOptimal(o)            (38.11) à (38.13) : { a = ξ² 4π ε0 ħ²/(m Z qe²), E = −Z qe²/(8π ε0 a), eV }.
     niveauHydrogene(n, o)      −Z² μ qe⁴/(2 (4π ε0 ħ)² n²), J ; o = { Z, M } (M absent : noyau infini, μ = m_e).
     raieTransition(Eh, Eb)     (38.14) : { omega = (Eh − Eb)/ħ, nu, lambda = 2πc/ω (vide), energie }.
     horizonPrevision(ε, A, τ)  { n = ln(1/ε)/ln A, t = n τ } : chocs avant qu'une erreur ε, multipliée par A à chaque choc, vaille 1.
   Étape « Les règles des amplitudes » (Feynman III.3.1 à 3.4). Amplitudes complexes { re, im } (Cx) ; un réel est accepté.
     amplitudeLibre(p, r)       (3.7) : e^(ipr/ħ)/r, particule libre de quantité de mouvement p, sans le facteur numérique.
     amplitudeChemins(etapes)   (3.5), (3.6) : { vecteur, total, chemins } ; etapes[n][j][i] = ⟨j du mur n + 1|i du mur n⟩,
                                produit le long de chaque chemin, somme sur les chemins.
     probaTemoinPhoton(φ1, φ2, a, b)  (3.8) à (3.10) : { D1 = |aφ1 + bφ2|², D2 = |aφ2 + bφ1|², total, faux = |(a + b)(φ1 + φ2)|² }.
     visibiliteTemoin(a, b)     (3.10a) : 2 Re(ab*)/(|a|² + |b|²), contraste de (3.10) si |φ1| = |φ2| ; c'est le γ de probaAvecTemoin.
     diffusionCristalSpin(o)    { N, phi, a, b } : rangée de N noyaux, déphasage phi d'un noyau au suivant ; { amplitude,
                                coherent = |a Σ e^(inφ)|² (3.12), incoherent = |b|² N (3.13a), total }.
                                (3.14) à (3.16) : diffusionIdentiques et amplitudeCoulomb, de l'étape « Bosons et fermions ».
   Étape « Bosons et fermions » (Feynman III.4.1 à 4.4). Choc de deux charges dans le référentiel du centre de masse, amplitudes
   sans leur facteur constant −(η/2k) e^(2iσ0) ; probabilités en unités de |f|² ; p = |a|² ΔS, probabilité d'une particule seule.
     sommerfeld(Z1, Z2, v)      η = Z1 Z2 qₑ²/(4π ε0 ħ v), v la vitesse relative (définition).
     approcheCoulomb(Z1, Z2, Ecm)  Z1 Z2 qₑ²/(4π ε0 Ecm), m : approche minimale d'un choc frontal, classique.
     amplitudeCoulomb(θ, η)     e^(−iη ln sin²(θ/2))/sin²(θ/2) : amplitude de Coulomb au facteur constant près ; v ≪ c.
     diffusionIdentiques(θ, η)  { discernables, bosons, fermions (même spin), nonPolarises (spin 1/2), interference } (4.1), (4.2).
     diffusionPhaseEchange(θ, η, δ)  { P = |f(θ) + e^(iδ) f(π − θ)|², discernables, rapport, double = e^(2iδ) }.
     especeComposee(Z, N, ne)   { fermions = Z + N + ne, signe = (−1)^fermions, espece } : objet composé qui reste entier.
     coincidencesCompteur(D, λ, α)  (4.14a) : { u = πDα/λ, bosons = 1 + sinc² u, fermions = 1 − sinc² u }, compteur carré de côté D.
     coincidencesCellules(M, u)  le même compteur en M cellules : { ordonnees, paires = ordonnees/2, bosons, fermions } (4.13), (4.14).
     coincidencesBose(ps)       (4.17), (4.20), (4.21) : { differentes = Π p, bose = n! Π p, rapport = n! }, n! Π p ≪ 1.
     probaAjoutBose(n, pw)      (4.23) : (n + 1) pw.
     remplirEtats(M, N, alea, stat)  N particules envoyées une à une dans M états : poids n_i + 1 ("bosons") ou 1 ("discernables").
     loiOccupation(M, N, k, stat)  loi exacte de ce remplissage : probabilité qu'un état donné reçoive k des N.
     tousEnsemble(M, N)         les N dans un même état donné : { bose, discernables, rapport → N! si M ≫ N², factorielle }.
     transitionsPhotons(n, p0)  (4.25) à (4.29) : { ampEmission = √(n + 1), ampAbsorption = √n, emission, absorption, spontanee, induite }.
     loiPhotonsThermique(x, n)  (4.29a) : (1 − e^(−x)) e^(−nx), loi du nombre de photons d'un état en équilibre, x = ħω/(k_B T).
     modeThermique(x), avanceMode(s, k, alea)  cet état simulé saut par saut : émissions e^(−x)(n + 1), absorptions n ; temps par n.
   Étape « Statistiques quantiques en pratique » (Feynman III.4.5 à 4.7). x = ħω/(k_B T) ; boîte de largeur 1 pour (4.44).
     ZETA32                     ζ(3/2) = 2,612… : le n λ_th³ où un gaz de Bose parfait commence à se condenser.
     occupationPhotons(x, stim)  (4.32) : n̄ = 1/(e^x − 1) ; stim = false (émission spontanée seule) : e^(−x), la loi de Wien.
     tauxPhotons(n, x, stim)    { Ng, Ne, absorption = Ng n, spontanee = Ne, stimulee = Ne n, net } par |a|², Ng + Ne = 1 (4.30).
     relaxationPhotons(n0, x, τ, stim)  n(τ) = n̄ + (n0 − n̄) e^(−γτ), γ = Ng − Ne (ou Ng sans émission stimulée), τ = t N|a|².
     modesCube(kL)              ondes stationnaires d'un cube de côté L, |k| ≤ k, deux polarisations, comptées une à une (4.34).
     modesContinu(kL)           (kL)³/(3π²), l'intégrale de (4.42) ; modesCube/modesContinu → 1 quand kL → ∞.
     spectreReduit(x, loi)      f(x) avec u(ω) dω = ((k_B T)⁴/(π² c³ ħ³)) f(x) dx : x³/(e^x − 1) "planck", x³ e^(−x) "wien", x² "rayleigh".
     tCondensation(n, m)        T_c = (2πħ²/(m k_B)) (n/ζ(3/2))^(2/3), K : gaz de Bose parfait de n atomes par m³, sans interaction.
     fractionCondensee(T, Tc)   1 − (T/T_c)^(3/2) sous T_c, 0 au-dessus (gaz parfait).
     energieFermi(n, m, g)      (ħ²/2m)(6π² n/g)^(2/3), J : gaz de Fermi parfait à T = 0, g états de spin (2 par défaut).
     etatBoite(p, x)            √2 sin(pπx) : amplitude d'une particule dans l'état p d'une boîte de largeur 1.
     amplitudeDeuxBoite(p, q, x1, x2, stat)  deux particules dans les états p et q, trouvées en x1 et x2 : "discernables",
                                "bosons" (somme normée), "fermions" (différence normée, (4.44a) : nulle si p = q ou x1 = x2).
     probaProches(p, q, stat, δ, N)  probabilité que |x1 − x2| < δ, somme sur une grille N × N.
     couchesElectrons(Z, stat)  [{ n, l, places, occ }] : Z électrons rangés dans l'ordre de Madelung, 2(2l + 1) places par
                                sous-couche ("fermions", exceptions dès Z = 24) ; "bosons" : tous en 1s.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const H = Cst.h, HBAR = Cst.hbar, C = Cst.c, E = Cst.e, ME = Cst.m_e, EPS0 = Cst.eps0, A0 = Cst.a0, KB = Cst.k_B, PI = Math.PI, TAU = 2 * PI;
  const err = m => { throw new Error("QuantAmp : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
  const positif = (x, nom) => (Number.isFinite(x) && x >= 0 ? x : err(nom + " doit être un nombre ≥ 0"));
  const entier = (n, nom) => (Number.isInteger(n) && n >= 1 ? n : err(nom + " doit être un entier ≥ 1"));
  /* sin u/u, 1 at 0 (the series below 10⁻⁶ errs by less than 10⁻²⁵) */
  const sinc = u => (Math.abs(u) < 1e-6 ? 1 - u * u / 6 : Math.sin(u) / u);

  /* λ = h/p: exact (de Broglie's definition), p the relativistic momentum */
  const broglie = p => H / pos(p, "p");
  /* p from the kinetic energy, relativistic and exact: (pc)² = Ec² + 2 Ec m c². Written without the difference of two large
     numbers, so it stays accurate when Ec ≪ m c² (then p → √(2 m Ec)). */
  const impulsion = (m, Ec) => Math.sqrt(positif(Ec, "Ec") * (Ec + 2 * pos(m, "m") * C * C)) / C;

  const api = { h: H, hbar: HBAR, c: C, e: E, m_e: ME, eps0: EPS0, a0: A0, broglie, impulsion };

  /* ---------- étape « Les deux fentes » (Feynman I.37.1 à 37.5) ---------- */
  {
    /* Two long slits of width a, centres at y = ±d/2 (slit 1 at +d/2), screen at L. Slit j alone: φj = sinc(π a sin θj/λ)·√(L/rj)
       ·e^{i k (rj − L)}, rj its exact distance to x (cylindrical wave of a long slit, amplitude in 1/√r). Each slit is seen in its
       far field (L ≫ a²/λ); the phase difference δ = k(r2 − r1) is exact. The phase is counted from k L, written without the
       difference of two large numbers: rj − L = (x − yj)²/(rj + L). P = 1 at the centre for one slit alone. */
    function amplitudesDeuxFentes(x, o) {
      fini(x, "x");
      const lam = pos(o.lambda, "lambda"), d = positif(o.d, "d"), a = positif(o.a, "a"), L = pos(o.L, "L"), k = TAU / lam;
      const fente = y => {
        const u = x - y, r = Math.hypot(L, u), A = sinc(Math.PI * a * (u / r) / lam) * Math.sqrt(L / r), ph = k * u * u / (r + L);
        return { re: A * Math.cos(ph), im: A * Math.sin(ph), r };
      };
      const f1 = fente(d / 2), f2 = fente(-d / 2);
      const P1 = f1.re ** 2 + f1.im ** 2, P2 = f2.re ** 2 + f2.im ** 2;
      const P12 = (f1.re + f2.re) ** 2 + (f1.im + f2.im) ** 2;
      const delta = k * 2 * x * d / (f1.r + f2.r);                           // r2 − r1 = ((x + d/2)² − (x − d/2)²)/(r1 + r2)
      return { phi1: { re: f1.re, im: f1.im }, phi2: { re: f2.re, im: f2.im }, P1, P2, P12, somme: P1 + P2, interference: P12 - P1 - P2, delta };
    }
    /* fringe spacing λL/d: small angles (d ≪ L, x ≪ L) */
    const interfrangeFentes = (lambda, L, d) => pos(lambda, "lambda") * pos(L, "L") / pos(d, "d");
    /* cosine fringes of spacing i averaged over a uniform detector of width w: the term 2√(P1P2) cos δ is multiplied by sinc(π w/i)
       (the envelope is taken constant over w) */
    const contrasteDetecteur = (w, i) => Math.abs(sinc(Math.PI * positif(w, "w") / pos(i, "i")));
    /* fringe visibility (Pmax − Pmin)/(Pmax + Pmin) of two coherent waves of probabilities P1 and P2 */
    const visibiliteFranges = (P1, P2) => {
      positif(P1, "P1"); positif(P2, "P2");
      return P1 + P2 > 0 ? 2 * Math.sqrt(P1 * P2) / (P1 + P2) : err("P1 + P2 doit être > 0");
    };
    /* bullets: a gun at D before the wall sprays at random; each hole gives a bump of standard deviation s on the backstop, centred
       on the straight line gun-hole, at ±(d/2)(D + L)/D. Peak 1 for each hole. P12 = P1 + P2: no interference (37.1). */
    function probaBalles(x, o) {
      fini(x, "x");
      const d = positif(o.d, "d"), L = pos(o.L, "L"), D = pos(o.D, "D"), s = pos(o.s, "s"), c = d / 2 * (D + L) / D;
      const bosse = m => Math.exp(-((x - m) ** 2) / (2 * s * s));
      const P1 = bosse(c), P2 = bosse(-c);
      return { P1, P2, P12: P1 + P2 };
    }
    /* mulberry32: reproducible uniform numbers in [0, 1[ */
    function aleaGraine(graine) {
      let a = (Number.isFinite(graine) ? graine : err("graine doit être un nombre fini")) >>> 0;
      return () => {
        a = (a + 0x6d2b79f5) >>> 0; let q = a;
        q = Math.imul(q ^ (q >>> 15), q | 1); q ^= q + Math.imul(q ^ (q >>> 7), q | 61);
        return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
      };
    }
    /* n positions drawn from the density f (≥ 0, not necessarily normalised) on [x0, x1]: the cumulative function on m cells
       (trapezoids), inverted with linear interpolation. Exact in the limit m → ∞; with m = 4000 the error on a position is below
       one cell, (x1 − x0)/m. */
    function tirerArrivees(f, x0, x1, n, alea, m) {
      fini(x0, "x0"); fini(x1, "x1"); if (!(x1 > x0)) err("x1 doit être > x0");
      if (!(Number.isInteger(n) && n >= 0)) err("n doit être un entier ≥ 0");
      m = m === undefined ? 4000 : entier(m, "m");
      const h = (x1 - x0) / m, F = new Float64Array(m + 1);
      let prev = positif(f(x0), "f(x)");
      for (let j = 1; j <= m; j++) { const v = positif(f(x0 + j * h), "f(x)"); F[j] = F[j - 1] + (prev + v) * h / 2; prev = v; }
      if (!(F[m] > 0)) err("la densité est nulle sur l'intervalle");
      const out = [];
      for (let i = 0; i < n; i++) {
        const cible = alea() * F[m];
        let lo = 0, hi = m;
        while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (F[mid] <= cible) lo = mid; else hi = mid; }
        const df = F[hi] - F[lo];
        out.push(x0 + (lo + (df > 0 ? (cible - F[lo]) / df : 0.5)) * h);
      }
      return out;
    }
    /* counts in nb equal cells of [x0, x1]; arrivals outside are left out */
    function histogrammeArrivees(xs, x0, x1, nb) {
      entier(nb, "nb"); if (!(x1 > x0)) err("x1 doit être > x0");
      const c = new Array(nb).fill(0);
      for (const x of xs) { const j = Math.floor((x - x0) / (x1 - x0) * nb); if (j >= 0 && j < nb) c[j]++; else if (x === x1) c[nb - 1]++; }
      return c;
    }
    /* N independent arrivals, each in the cell with probability p: binomial count, mean N p, standard deviation √(N p (1 − p)) */
    function fluctuationComptage(N, p) {
      if (!(Number.isInteger(N) && N >= 0)) err("N doit être un entier ≥ 0");
      if (!(p >= 0 && p <= 1)) err("p doit être entre 0 et 1");
      const moyenne = N * p, ecart = Math.sqrt(N * p * (1 - p));
      return { moyenne, ecart, relatif: moyenne > 0 ? ecart / moyenne : Infinity };
    }
    /* arrivals at random at a mean rate (s⁻¹) during duree (s): exponential gaps, −ln(1 − u)/debit */
    function instantsPoisson(debit, duree, alea) {
      pos(debit, "debit"); positif(duree, "duree");
      const out = []; let t = 0;
      for (;;) { t += -Math.log(1 - alea()) / debit; if (t > duree) return out; out.push(t); }
    }
    Object.assign(api, { amplitudesDeuxFentes, interfrangeFentes, contrasteDetecteur, visibiliteFranges, probaBalles, aleaGraine, tirerArrivees, histogrammeArrivees, fluctuationComptage, instantsPoisson });
  }

  /* ---------- étape « Observer et mesurer un électron » (Feynman I.37.6 à 37.8, I.38.1) ---------- */
  {
    const dansUn = (g, nom) => (Number.isFinite(g) && Math.abs(g) <= 1 ? g : err(nom + " doit être entre −1 et 1"));
    /* A witness left in χ1 or χ2 according to the hole: P = |φ1|² + |φ2|² + 2 Re(φ1 φ2*) ⟨χ1|χ2⟩. Exact for a pure witness whose
       overlap γ is real (a witness symmetric between the two holes). γ = 1: (37.7) ; γ = 0: (37.8). */
    function probaAvecTemoin(x, o, gamma) {
      dansUn(gamma, "gamma");
      const r = api.amplitudesDeuxFentes(x, o);
      return { P1: r.P1, P2: r.P2, P12: r.P12, somme: r.somme, P: r.somme + gamma * r.interference, delta: r.delta };
    }
    /* one photon scattered by the electron near hole 1 or hole 2 (distance d), the light coming in perpendicular to the line of the
       holes: the two photon states differ by the phase k d nₓ, n the scattering direction. Averaged over isotropic directions,
       their overlap is sin(kd)/(kd). Unpolarised dipole scattering, weight 1 + cos²θ, changes it by less than 0,08 (test). */
    const recouvrementPhoton = (d, lambda) => {
      const u = TAU * positif(d, "d") / pos(lambda, "lambda");
      return u < 1e-6 ? 1 - u * u / 6 : Math.sin(u) / u;
    };
    /* n photons scattered independently, n drawn from Poisson's law of mean n̄: overlap γⁿ, averaged Σ pₙ γⁿ = e^(−n̄(1 − γ)), exact */
    const contrasteEclaire = (gamma, nMoyen) => Math.exp(-positif(nMoyen, "nMoyen") * (1 - dansUn(gamma, "gamma")));
    /* for n photons, the best measurement on them tells the holes apart with D = √(1 − γ^(2n)) (pure states: D² + V² = 1);
       averaged over Poisson's law, summed until the tail is below 10⁻¹² */
    function distinguabiliteEclaire(gamma, nMoyen) {
      dansUn(gamma, "gamma"); positif(nMoyen, "nMoyen");
      const nMax = Math.ceil(nMoyen + 12 * Math.sqrt(nMoyen) + 30);
      let p = Math.exp(-nMoyen), s = 0;
      for (let n = 0; n <= nMax; n++) { if (n > 0) p *= nMoyen / n; s += p * Math.sqrt(Math.max(0, 1 - gamma ** (2 * n))); }
      return s;
    }
    /* photons scattered by a free electron lit for a time τ: Thomson cross-section σ_T = (8π/3) r_e², r_e = qₑ²/(4π ε0 m c²);
       n̄ = σ_T × photon flux × τ, the flux being I λ/(hc). Valid while ħω ≪ m c² (Compton shift negligible) and the electron is free. */
    const photonsThomson = (I, lambda, duree) => {
      const re = E * E / (2 * TAU * EPS0 * ME * C * C), sT = 8 * Math.PI / 3 * re * re;
      return sT * positif(I, "I") * pos(lambda, "lambda") / (H * C) * positif(duree, "duree");
    };
    /* a random phase ε, Gaussian of standard deviation σ, added between the two ways: ⟨cos(δ + ε)⟩ = e^(−σ²/2) cos δ, exact */
    const contrasteBrouille = sigma => Math.exp(-(positif(sigma, "sigma") ** 2) / 2);
    /* the wall on rollers (Fig. 37-6): an electron of momentum p that reaches x = 0 from hole 1 (+d/2) or hole 2 (−d/2) gives the
       wall the transverse momenta ∓p d/(2L): they differ by Δ = p d/L. Small angles, d ≪ L. */
    const reculPlaque = (p, d, L) => pos(p, "p") * positif(d, "d") / pos(L, "L");
    /* a wall of minimum uncertainty, Gaussian: momentum known to σp, so position spread σx = ħ/(2σp). Two ways to the same number:
       the random shift σx of the holes moves the fringes (wave number Δ/ħ near x = 0) and multiplies the contrast by
       e^(−(Δσx/ħ)²/2); the two recoil states, shifted by Δ, overlap by e^(−Δ²/(8σp²)). D = √(1 − V²); Pjuste = (1 + D)/2,
       the best guess of the hole from any measurement on the wall (Helstrom). The incoming electron wave is plane. */
    function plaqueHeisenberg(sigmaP, Delta) {
      const sP = pos(sigmaP, "sigmaP"), Dl = positif(Delta, "Delta"), sigmaX = HBAR / (2 * sP);
      const V = Math.exp(-((Dl * sigmaX / HBAR) ** 2) / 2), recouvrement = Math.exp(-Dl * Dl / (8 * sP * sP));
      const D = Math.sqrt(Math.max(0, 1 - V * V));
      return { sigmaX, V, recouvrement, D, Pjuste: (1 + D) / 2 };
    }
    /* free Gaussian packet, Feynman's sign e^(i(ωt − kx)): ψ(x, 0) = e^(−x²/(4σ²) − i k0 x), so |ψ|² has standard deviation σ and
       the packet moves towards +x. Schrödinger's free particle, ω = ħk²/(2m), exact closed form (v ≪ c); repos adds m c²/ħ to ω,
       a phase e^(i m c² t/ħ) that changes neither |ψ|² nor the group velocity. It is the complex conjugate of the usual
       e^(i(kx − ωt)) packet: same probabilities. P = |ψ|²/(σ√(2π)), normalised, m⁻¹. */
    function paquetLibre(x, t, o) {
      fini(x, "x"); fini(t, "t");
      const m = pos(o.m, "m"), k0 = fini(o.k0, "k0"), s = pos(o.sigma, "sigma"), tau = HBAR * t / (2 * m * s * s);
      const nr = -x * x / (4 * s * s), ni = k0 * x - HBAR * k0 * k0 * t / (2 * m);        // numerator, usual sign
      const z2 = 1 + tau * tau, er = (nr + ni * tau) / z2, ei = (ni - nr * tau) / z2;      // (nr + i ni)/(1 + iτ)
      const mod = Math.pow(z2, -0.25), arg = -Math.atan(tau) / 2;                          // (1 + iτ)^(−1/2)
      const A = mod * Math.exp(er), ph = -(ei + arg) + (o.repos ? m * C * C * t / HBAR : 0);
      return { re: A * Math.cos(ph), im: A * Math.sin(ph), P: A * A / (s * Math.sqrt(TAU)) };
    }
    const largeurPaquet = (sigma, m, t) => pos(sigma, "sigma") * Math.sqrt(1 + (HBAR * fini(t, "t") / (2 * pos(m, "m") * sigma * sigma)) ** 2);
    /* phase and group velocities of a free particle, relativistic and exact: E = √((pc)² + (mc²)²); E/p = c²/v; Ec/p → v/2 when
       v ≪ c; dE/dp = pc²/E = v. Ec written without the difference of two large numbers. */
    function vitessesOnde(m, p) {
      const mc2 = pos(m, "m") * C * C, pc = pos(p, "p") * C, En = Math.hypot(pc, mc2), Ec = pc * pc / (En + mc2);
      return { groupe: pc * C / En, phase: En / p, phaseCinetique: Ec / p };
    }
    Object.assign(api, { probaAvecTemoin, recouvrementPhoton, contrasteEclaire, distinguabiliteEclaire, photonsThomson, contrasteBrouille, reculPlaque, plaqueHeisenberg, paquetLibre, largeurPaquet, vitessesOnde });
  }

  /* ---------- étape « La taille de l'atome et ses niveaux » (Feynman I.38.2 à 38.6) ---------- */
  {
    /* a particle of momentum p through a slit of width B, far field (Fraunhofer): the first minimum is at sin θ1 = λ/B, λ = h/p.
       The transverse momentum that reaches it is p sin θ1 = h/B, whatever p: exact for this definition of the spread. B ≤ λ: no
       minimum, the wave fills the half-space; theta1 is null and dpy = p (the whole momentum is uncertain). */
    function etalementFente(B, p) {
      const b = pos(B, "B"), lambda = broglie(p), s = lambda / b, dpy = s <= 1 ? H / b : p;
      return { lambda, BsurLambda: b / lambda, sin1: s <= 1 ? s : null, theta1: s <= 1 ? Math.asin(s) : null, dpy, produit: dpy * b };
    }
    /* (38.4) to (38.7): a perfect grating of N lines used in the order m resolves Δλ/λ = 1/(N m) (Rayleigh's criterion); the wave
       train must be L = N m λ long to light it whole; Δk = 2π/L and, with p = ħk, Δp = h/L. */
    function trainReseau(N, m, lambda) {
      const L = entier(N, "N") * entier(m, "m") * pos(lambda, "lambda");
      return { L, relatif: 1 / (N * m), dk: TAU / L, dp: H / L };
    }
    /* (38.8): a wave train that lasts T has Δω = 2π/T; for a quantum E = ħω, ΔE = h/T. Order of magnitude, like (38.7). */
    const dureeTrain = T => ({ domega: TAU / pos(T, "T"), dE: H / T });
    /* the wavelength of a particle of mass m (kg) and kinetic energy Ec (J), relativistic and exact; m = 0: a photon of energy Ec,
       λ = hc/Ec */
    const lambdaEnergie = (m, Ec) => (m === 0 ? H * C / pos(Ec, "Ec") : broglie(impulsion(m, pos(Ec, "Ec"))));
    /* (38.9) has no solution once λ > 2d, d the spacing of the nearest planes: the threshold for a particle of mass m. λc = 2d,
       v = h/(m λc), Ec = h²/(2 m λc²) (v ≪ c, always true here), T = Ec/k_B (the convention E = k_B T of neutron physics). */
    function seuilBragg(d, m) {
      const lambda = 2 * pos(d, "d"), v = H / (pos(m, "m") * lambda), Ec = m * v * v / 2;
      return { lambda, v, Ec, T: Ec / KB };
    }
    /* (38.10) with the momentum p ≈ ξħ/a of an electron spread over a size a around a nucleus of charge Z qe: E(a) = ξ²ħ²/(2 m a²)
       − Z qe²/(4π ε0 a), J. Order of magnitude: ξ is not defined better than a factor 2 or π. Nucleus at rest (m/M neglected),
       v ≪ c. ξ = Z = 1, m = m_e: Electrostatique.energieAtome. */
    function atomeIncertitude(a, o) {
      o = o || {};
      const r = pos(a, "a"), xi = o.xi === undefined ? 1 : pos(o.xi, "xi"), m = o.m === undefined ? ME : pos(o.m, "m"), Z = o.Z === undefined ? 1 : pos(o.Z, "Z");
      const cinetique = xi * xi * HBAR * HBAR / (2 * m * r * r), potentielle = -Z * E * E / (4 * Math.PI * EPS0 * r);
      return { cinetique, potentielle, totale: cinetique + potentielle };
    }
    /* dE/da = 0 in (38.11): a = ξ² 4π ε0 ħ²/(m Z qe²), (38.12) for ξ = Z = 1, m = m_e; E = −Z qe²/(8π ε0 a), (38.13). eV = E/qe. */
    function atomeOptimal(o) {
      o = o || {};
      const xi = o.xi === undefined ? 1 : pos(o.xi, "xi"), m = o.m === undefined ? ME : pos(o.m, "m"), Z = o.Z === undefined ? 1 : pos(o.Z, "Z");
      const a = xi * xi * 4 * Math.PI * EPS0 * HBAR * HBAR / (m * Z * E * E), En = -Z * E * E / (8 * Math.PI * EPS0 * a);
      return { a, E: En, eV: En / E };
    }
    /* the levels of a hydrogen-like atom, E_n = −Z² μ qe⁴/(2 (4π ε0)² ħ² n²), J; μ = m_e M/(m_e + M), M the mass of the nucleus
       (omitted: M infinite, μ = m_e, and E_1 is (38.13)). Model: Bohr and Schrödinger, non-relativistic, point nucleus: the fine
       structure moves the levels by about (Zα)²/4 ≈ 10⁻⁵ of their value for hydrogen. */
    function niveauHydrogene(n, o) {
      o = o || {};
      const k = entier(n, "n"), Z = o.Z === undefined ? 1 : pos(o.Z, "Z"), mu = o.M === undefined ? ME : ME * pos(o.M, "M") / (ME + o.M);
      return -Z * Z * mu * E ** 4 / (2 * (4 * Math.PI * EPS0 * HBAR) ** 2 * k * k);
    }
    /* (38.14): the light of a jump from the level Ehaut to the level Ebas (J): ω = (Ehaut − Ebas)/ħ, ν = ω/2π, λ = c/ν in vacuum,
       energie = ħω. Exact (energy conservation and E = ħω); the recoil of the atom, (ħω)²/(2Mc²), is neglected. */
    function raieTransition(Ehaut, Ebas) {
      const W = fini(Ehaut, "Ehaut") - fini(Ebas, "Ebas");
      if (!(W > 0)) err("Ehaut doit dépasser Ebas");
      const omega = W / HBAR;
      return { omega, nu: omega / TAU, lambda: TAU * C / omega, energie: W };
    }
    /* classical unpredictability: an error ε (relative) on a direction grows by a factor A at each collision (A ≈ ℓ/r, the free
       path over the radius of the target), so it reaches 1 after n = ln(1/ε)/ln A collisions, at t = n τ, τ the time between
       collisions. Order of magnitude: the logarithm is the point. */
    function horizonPrevision(eps, A, tau) {
      if (!(Number.isFinite(eps) && eps > 0 && eps < 1)) err("eps doit être dans ]0, 1[");
      if (!(Number.isFinite(A) && A > 1)) err("A doit être un nombre > 1");
      const n = Math.log(1 / eps) / Math.log(A);
      return { n, t: n * pos(tau, "tau") };
    }
    Object.assign(api, { etalementFente, trainReseau, dureeTrain, lambdaEnergie, seuilBragg, atomeIncertitude, atomeOptimal,
      niveauHydrogene, raieTransition, horizonPrevision });
  }

  /* ---------- étape « Les règles des amplitudes » (Feynman III.3.1 à III.3.4) ---------- */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    /* a number or a { re, im } is a complex amplitude */
    const cx = (z, nom) => (typeof z === "number" ? Cx.c(fini(z, nom), 0)
      : z && Number.isFinite(z.re) && Number.isFinite(z.im) ? Cx.c(z.re, z.im) : err(nom + " doit être un nombre ou un complexe { re, im }"));
    /* (3.7): free particle of definite momentum p going from r1 to r2, r = |r2 − r1|. The numerical factor in front is left out;
       spin and polarisation are ignored. Spherical wave e^{ipr/ħ}/r: exact for a spinless particle of definite energy
       leaving a point; the phase grows with r (time factor e^(−iEt/ħ), the conjugate of e^(i(ωt − kx))). */
    const amplitudeLibre = (p, r) => Cx.polar(1 / pos(r, "r"), pos(p, "p") * r / HBAR);
    /* (3.5) and (3.6) for any set of walls. etapes[n][j][i] = ⟨node j of wall n + 1 | node i of wall n⟩; wall 0 is the source
       (one node). A closed hole is a row of zeros. Returns the amplitudes at the last wall, summed over the routes (vecteur, and
       total if that wall has one node), and every route with its product of amplitudes (chemins). Exact: it is only the rule
       « product along a route, sum over the indistinguishable routes ». */
    function amplitudeChemins(etapes) {
      if (!Array.isArray(etapes) || !etapes.length) err("etapes doit être une liste non vide de matrices");
      let vecteur = [Cx.c(1, 0)], chemins = [{ noeuds: [0], amplitude: Cx.c(1, 0) }];
      etapes.forEach((M, n) => {
        if (!Array.isArray(M) || !M.length) err("etapes[" + n + "] doit être une matrice non vide");
        M.forEach((ligne, j) => { if (!Array.isArray(ligne) || ligne.length !== vecteur.length) err("etapes[" + n + "][" + j + "] doit avoir " + vecteur.length + " colonnes"); });
        const A = M.map((ligne, j) => ligne.map((z, i) => cx(z, "etapes[" + n + "][" + j + "][" + i + "]")));
        vecteur = A.map(ligne => ligne.reduce((s, z, i) => Cx.add(s, Cx.mul(z, vecteur[i])), Cx.c(0, 0)));
        chemins = chemins.flatMap(ch => A.map((ligne, j) => ({ noeuds: ch.noeuds.concat(j), amplitude: Cx.mul(ligne[ch.noeuds[n]], ch.amplitude) })));
      });
      return { vecteur, total: vecteur.length === 1 ? vecteur[0] : null, chemins };
    }
    /* (3.8) to (3.10): electron through hole 1 (φ1) or 2 (φ2); a photon scattered by it into D1 with amplitude a from hole 1 and
       b from hole 2, and symmetrically into D2. D1 = |aφ1 + bφ2|², D2 = |aφ2 + bφ1|², total = D1 + D2 (3.10): distinct final states
       add as probabilities. faux = |(a + b)(φ1 + φ2)|², the forbidden sum of (3.8) and (3.9). Exact within the model: symmetric
       apparatus, one photon at most, scattering that does not change the electron's amplitudes beyond the factors a and b. */
    function probaTemoinPhoton(phi1, phi2, a, b) {
      const p1 = cx(phi1, "phi1"), p2 = cx(phi2, "phi2"), A = cx(a, "a"), B = cx(b, "b");
      const D1 = Cx.abs2(Cx.add(Cx.mul(A, p1), Cx.mul(B, p2))), D2 = Cx.abs2(Cx.add(Cx.mul(A, p2), Cx.mul(B, p1)));
      return { D1, D2, total: D1 + D2, faux: Cx.abs2(Cx.mul(Cx.add(A, B), Cx.add(p1, p2))) };
    }
    /* (3.10a): the fringe visibility of the total (3.10) when |φ1| = |φ2|: 2 Re(a b*)/(|a|² + |b|²). 0 when b = 0, 1 when b = a. */
    function visibiliteTemoin(a, b) {
      const A = cx(a, "a"), B = cx(b, "b"), n = Cx.abs2(A) + Cx.abs2(B);
      return n > 0 ? 2 * Cx.mul(A, Cx.conj(B)).re / n : err("|a|² + |b|² doit être > 0");
    }
    /* (3.12) and (3.13a) for a row of N nuclei, the phase growing by phi from one nucleus to the next (phi = 2π d (sin θout −
       sin θin)/λ in the far field), each ⟨C|i⟩⟨i|S⟩ of modulus 1. Neutron spin up, all nuclei spin down: no flip, amplitude a for
       each nucleus, summed (coherent, the sum is computed term by term); flip, amplitude b, the flipped nucleus marks the route:
       |b|² N (incoherent). Model: no recoil, no phonon, the flipped spin stays on its nucleus. */
    function diffusionCristalSpin(o) {
      const N = entier(o.N, "N"), phi = fini(o.phi, "phi"), A = cx(o.a, "a"), B = cx(o.b === undefined ? 0 : o.b, "b");
      let s = Cx.c(0, 0);
      for (let i = 0; i < N; i++) s = Cx.add(s, Cx.polar(1, i * phi));
      const coherent = Cx.abs2(Cx.mul(A, s)), incoherent = Cx.abs2(B) * N;
      return { amplitude: Cx.mul(A, s), coherent, incoherent, total: coherent + incoherent };
    }
    /* (3.14) to (3.16) for Coulomb scattering: see sommerfeld, approcheCoulomb, amplitudeCoulomb, diffusionIdentiques
       (étape « Bosons et fermions »), used as they are. */
    Object.assign(api, { amplitudeLibre, amplitudeChemins, probaTemoinPhoton, visibiliteTemoin, diffusionCristalSpin });
  }

  /* ---------- étape « Bosons et fermions » (Feynman III.4.1 à III.4.4) ---------- */
  {
    const KCOUL = E * E / (4 * PI * EPS0);                // q_e²/(4πε0), J·m
    const angle = (t, nom) => (Number.isFinite(t) && t > 0 && t < PI ? t : err(nom + " doit être dans ]0, π["));
    const naturel = (n, nom) => (Number.isInteger(n) && n >= 0 ? n : err(nom + " doit être un entier ≥ 0"));
    /* Sommerfeld's parameter η = Z1 Z2 q_e²/(4πε0 ħ v), v the relative speed (m·s⁻¹): exact definition */
    const sommerfeld = (Z1, Z2, v) => entier(Z1, "Z1") * entier(Z2, "Z2") * KCOUL / (HBAR * pos(v, "v"));
    /* head-on closest approach of two point charges of kinetic energy Ecm (J) in the centre-of-mass frame:
       d = Z1 Z2 q_e²/(4πε0 Ecm), m. Classical, exact for point charges. */
    const approcheCoulomb = (Z1, Z2, Ecm) => entier(Z1, "Z1") * entier(Z2, "Z2") * KCOUL / pos(Ecm, "Ecm");
    /* the Coulomb scattering amplitude in the centre-of-mass frame without its constant factor −(η/2k) e^(2iσ0):
       f(θ) = e^(−iη ln sin²(θ/2)) / sin²(θ/2). Exact for two point charges, non-relativistic; |f|² is Rutherford's law. */
    const amplitudeCoulomb = (theta, eta) => {
      const s2 = Math.sin(angle(theta, "θ") / 2) ** 2, ph = -positif(eta, "η") * Math.log(s2);
      return { re: Math.cos(ph) / s2, im: Math.sin(ph) / s2 };
    };
    /* (4.1) and (4.2) for two identical charges, one seen at θ in the centre-of-mass frame: direct f(θ), exchanged f(π − θ)
       (Fig. 4-1), in units of the |f|² above. discernables |f(θ)|² + |f(π − θ)|²; bosons |f(θ) + f(π − θ)|² (spin 0, or the same
       spin state); fermions |f(θ) − f(π − θ)|² (same spin state); nonPolarises: spin 1/2, unpolarised beams, 1/4 of pairs in
       the singlet (+) and 3/4 in the triplet (−): discernables − Re f(θ) f(π − θ)*. Coulomb force only, spins untouched. */
    const diffusionIdentiques = (theta, eta) => {
      const f = amplitudeCoulomb(theta, eta), g = amplitudeCoulomb(PI - theta, eta);
      const ff = f.re * f.re + f.im * f.im, gg = g.re * g.re + g.im * g.im, x = f.re * g.re + f.im * g.im;
      return { discernables: ff + gg, bosons: ff + gg + 2 * x, fermions: ff + gg - 2 * x, nonPolarises: ff + gg - x, interference: 2 * x };
    };
    /* (4.1) and (4.2) as a question: the exchanged amplitude f(π − θ) taken with a phase factor e^(iδ).
       { P: |f(θ) + e^(iδ) f(π − θ)|², discernables: |f(θ)|² + |f(π − θ)|², rapport, double: e^(2iδ) }, same units.
       Exchanging twice must give back the same process: e^(2iδ) = 1, δ = 0 (bosons) or π (fermions of the same spin). */
    const diffusionPhaseEchange = (theta, eta, delta) => {
      fini(delta, "δ");
      const f = amplitudeCoulomb(theta, eta), g = amplitudeCoulomb(PI - theta, eta);
      const gr = g.re * Math.cos(delta) - g.im * Math.sin(delta), gi = g.re * Math.sin(delta) + g.im * Math.cos(delta);
      const P = (f.re + gr) ** 2 + (f.im + gi) ** 2, d = f.re * f.re + f.im * f.im + g.re * g.re + g.im * g.im;
      return { P, discernables: d, rapport: P / d, double: { re: Math.cos(2 * delta), im: Math.sin(2 * delta) } };
    };
    /* a composite object of Z protons, N neutrons and ne electrons, all fermions: exchanging two such objects exchanges
       Z + N + ne pairs of fermions, sign (−1)^(Z + N + ne). { fermions, signe, espece: "bosons" if even, "fermions" if odd }.
       Valid while the objects stay whole: no exchange of their parts, closest approach ≫ their size. */
    const especeComposee = (Z, N, ne) => {
      const f = naturel(Z, "Z") + naturel(N, "N") + naturel(ne, "ne");
      return { fermions: f, signe: f % 2 ? -1 : 1, espece: f % 2 ? "fermions" : "bosons" };
    };
    /* (4.14) for a square counter of side D (m), the two sources seen at angles differing by alpha (rad), wavelength lambda (m):
       P2/P2(discernables) = 1 ± sinc²(π D α/λ), + for bosons, − for fermions of the same spin. The pair amplitude has fringes
       of spacing λ/α across the counter; the counter averages them like contrasteDetecteur. Plane waves of constant
       modulus over the counter, same energy and polarisation, both counted within one coherence time. */
    const coincidencesCompteur = (D, lambda, alpha) => {
      const c = api.contrasteDetecteur(positif(D, "D"), pos(lambda, "λ") / pos(alpha, "α"));
      return { u: PI * D * alpha / lambda, bosons: 1 + c * c, fermions: 1 - c * c };
    };
    /* the same counter cut into M cells along the fringes, u = π D α/λ: amplitudes a_i = e^(2iu x_i), b_i = 1, x_i = (i + 1/2)/M.
       Every value is divided by the distinguishable count Σ_ij |a_i b_j|² = M². ordonnees: Σ over ordered pairs (i, j) of
       |a_i b_j + a_j b_i|², each unordered pair met twice; paires: Σ over i < j, plus |√2 a_i b_i|² for both in one cell;
       bosons = paires = ordonnees/2 exactly, the 1/2 of (4.14); fermions: Σ over i < j of |a_i b_j − a_j b_i|². */
    const coincidencesCellules = (M, u) => {
      entier(M, "M"); fini(u, "u");
      const a = Array.from({ length: M }, (_, i) => { const p = 2 * u * (i + 0.5) / M; return [Math.cos(p), Math.sin(p)]; });
      let ord = 0, paires = 0, fer = 0;
      for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
        const sr = a[i][0] + a[j][0], si = a[i][1] + a[j][1], dr = a[i][0] - a[j][0], di = a[i][1] - a[j][1];
        const plus = sr * sr + si * si, moins = dr * dr + di * di;
        ord += plus;
        if (i < j) { paires += plus; fer += moins; } else if (i === j) paires += 2;
      }
      const N = M * M;
      return { discernables: 1, ordonnees: ord / N, paires: paires / N, bosons: paires / N, fermions: fer / N };
    };
    /* (4.17), (4.20), (4.21): n particles, each of probability ps[i] = |a|² ΔS to enter the counter when alone.
       { differentes: Π p, bose: n! Π p, rapport: n! }. Approximation: amplitudes constant over ΔS, and n! Π p ≪ 1. */
    const coincidencesBose = ps => {
      if (!Array.isArray(ps) || !ps.length) err("ps doit être une liste non vide de probabilités");
      let prod = 1, fact = 1;
      ps.forEach((p, i) => { if (!(p >= 0 && p <= 1)) err("chaque probabilité doit être dans [0, 1]"); prod *= p; fact *= i + 1; });
      return { differentes: prod, bose: fact * prod, rapport: fact };
    };
    /* (4.23): the probability that one more boson enters the state already holding n: (n + 1) pw, pw = |w|² ΔS alone */
    const probaAjoutBose = (n, pw) => (naturel(n, "n") + 1) * positif(pw, "pw");
    /* N particles sent one by one into M states equally likely for a lone particle. stat "bosons": the next one goes to
       state i with a weight n_i + 1, (4.23) normalised; "discernables": weight 1. Returns the M occupations. */
    const remplirEtats = (M, N, alea, stat = "bosons") => {
      entier(M, "M"); naturel(N, "N");
      if (stat !== "bosons" && stat !== "discernables") err("statistique inconnue : " + stat);
      const occ = new Array(M).fill(0);
      for (let k = 0; k < N; k++) {
        const total = stat === "bosons" ? M + k : M;
        let r = alea() * total, i = 0;
        for (; i < M - 1; i++) { r -= stat === "bosons" ? occ[i] + 1 : 1; if (r < 0) break; }
        occ[i]++;
      }
      return occ;
    };
    const lnC = (n, k) => { let s = 0; for (let i = 1; i <= k; i++) s += Math.log((n - k + i) / i); return s; };
    /* the exact law of that filling: the probability that a given state ends with k of the N. bosons: every set of
       occupations equally likely, C(N − k + M − 2, M − 2)/C(N + M − 1, M − 1); discernables: binomial (N, 1/M). */
    const loiOccupation = (M, N, k, stat = "bosons") => {
      entier(M, "M"); naturel(N, "N"); naturel(k, "k");
      if (k > N) return 0;
      if (stat === "bosons") return M === 1 ? (k === N ? 1 : 0) : Math.exp(lnC(N - k + M - 2, M - 2) - lnC(N + M - 1, M - 1));
      if (stat === "discernables") return M === 1 ? (k === N ? 1 : 0) : Math.exp(lnC(N, k) + k * Math.log(1 / M) + (N - k) * Math.log(1 - 1 / M));
      return err("statistique inconnue : " + stat);
    };
    /* all N in one given state of the M: { bose: 1/C(N + M − 1, N), discernables: M^(−N), rapport, factorielle: N! }.
       rapport → N! when M ≫ N², as in (4.21). */
    const tousEnsemble = (M, N) => {
      entier(M, "M"); naturel(N, "N");
      let f = 1; for (let i = 2; i <= N; i++) f *= i;
      const bose = Math.exp(-lnC(N + M - 1, N)), discernables = Math.exp(-N * Math.log(M));
      return { bose, discernables, rapport: Math.exp(N * Math.log(M) - lnC(N + M - 1, N)), factorielle: f };
    };
    /* (4.25) to (4.29): one photon state holding n photons, one atom that can emit into it with probability p0 alone.
       Amplitudes √(n + 1) (emission) and √n (absorption) times the lone one; probabilities (n + 1) p0 and n p0, the emission
       split into spontaneous p0 and induced n p0. Exact within first-order transitions, p0 ≪ 1. */
    const transitionsPhotons = (n, p0) => {
      naturel(n, "n"); positif(p0, "p0");
      return { ampEmission: Math.sqrt(n + 1), ampAbsorption: Math.sqrt(n), emission: (n + 1) * p0, absorption: n * p0, spontanee: p0, induite: n * p0 };
    };
    /* the probability that the photon state holds n photons, in equilibrium with atoms whose populations stay in Boltzmann's
       ratio N_e/N_g = e^(−x), x = ħω/(k_B T): (1 − e^(−x)) e^(−nx). From (4.28) and (4.29) by detailed balance; its mean is
       occupationPhotons(x). The atoms are a reservoir: their populations do not change with n. */
    const loiPhotonsThermique = (x, n) => -Math.expm1(-pos(x, "x")) * Math.exp(-naturel(n, "n") * x);
    /* that photon state simulated: rates e^(−x)(n + 1) for an emission, n for an absorption (unit N_g|a|² per unit time).
       modeThermique(x) is the empty state; avanceMode(s, k, alea) makes k jumps (exponential waiting times) and keeps the
       time spent at each n (s.temps), the counts of spontaneous, induced emissions and absorptions, and the time mean. */
    const modeThermique = x => ({ x: pos(x, "x"), n: 0, temps: [], duree: 0, spontanees: 0, induites: 0, absorptions: 0, moyenne: 0 });
    const avanceMode = (s, k, alea) => {
      naturel(k, "k");
      const r = Math.exp(-s.x);
      for (let j = 0; j < k; j++) {
        const em = r * (s.n + 1), ab = s.n, R = em + ab, tau = -Math.log(1 - alea()) / R;
        s.temps[s.n] = (s.temps[s.n] || 0) + tau; s.duree += tau; s.moyenne += (s.n * tau - s.moyenne * tau) / s.duree;
        const u = alea() * R;
        if (u < r) { s.spontanees++; s.n++; } else if (u < em) { s.induites++; s.n++; } else { s.absorptions++; s.n--; }
      }
      return s;
    };
    Object.assign(api, { sommerfeld, approcheCoulomb, amplitudeCoulomb, diffusionIdentiques, diffusionPhaseEchange, especeComposee, coincidencesCompteur,
      coincidencesCellules, coincidencesBose, probaAjoutBose, remplirEtats, loiOccupation, tousEnsemble, transitionsPhotons,
      loiPhotonsThermique, modeThermique, avanceMode });
  }

  /* ---------- étape « Statistiques quantiques en pratique » (Feynman III.4.5 à III.4.7) ---------- */
  {
    /* ζ(3/2) = Σ k^(−3/2): the n λ_th³ at which an ideal Bose gas starts to condense (tested against the series) */
    const ZETA32 = 2.612375348685488;
    /* (4.30)-(4.32): one photon state of frequency ω in equilibrium with atoms of two levels ħω apart, x = ħω/(k_B T).
       Emission ∝ N_e (n + 1), absorption ∝ N_g n. stimulee = false keeps only the spontaneous 1 of n + 1: equilibrium then
       gives e^(−x) (Wien) instead of Bose's 1/(e^x − 1) (Planck). Exact within the two-level model. */
    const occupationPhotons = (x, stimulee = true) => {
      pos(x, "x");
      if (!stimulee) return Math.exp(-x);
      return x > 700 ? 0 : 1 / Math.expm1(x);
    };
    /* the rates into and out of that state when it holds n photons, per |a|², for one atom shared between the two levels
       in Boltzmann's ratio (4.30): N_g + N_e = 1. */
    const tauxPhotons = (n, x, stimulee = true) => {
      positif(n, "n"); pos(x, "x");
      const Ne = 1 / (1 + Math.exp(x)), Ng = 1 - Ne;
      const spontanee = Ne, induite = stimulee ? Ne * n : 0, absorption = Ng * n;
      return { Ng, Ne, absorption, spontanee, stimulee: induite, net: spontanee + induite - absorption };
    };
    /* n(τ) from n0 under dn/dτ = net, τ = t N|a|²: n̄ + (n0 − n̄) e^(−γτ), γ = N_g − N_e (with n + 1) or N_g (with 1). Exact. */
    const relaxationPhotons = (n0, x, tau, stimulee = true) => {
      positif(n0, "n0"); positif(tau, "τ");
      const r = tauxPhotons(0, x, stimulee), g = stimulee ? r.Ng - r.Ne : r.Ng, nb = occupationPhotons(x, stimulee);
      return nb + (n0 - nb) * Math.exp(-g * tau);
    };
    /* (4.34) in three directions: standing waves in a cube of side L, k = (π/L)(j_x, j_y, j_z), j ≥ 1, two polarisations.
       modesCube counts them exactly up to |k| ≤ k (argument kL); modesContinu is the integral of (4.42),
       (kL)³/(3π²). The exact count lacks a wall term ≈ (3/(4π))(kL)² (Weyl, waves vanishing on the walls): a relative
       deficit ≈ 9π/(4kL), 7 % at kL = 100. */
    const modesCube = kL => {
      const R = positif(kL, "kL") / PI, R2 = R * R, J = Math.floor(R);
      let n = 0;
      for (let a = 1; a <= J; a++) for (let b = 1; a * a + b * b < R2 && b <= J; b++) {
        const r = R2 - a * a - b * b;
        n += Math.floor(Math.sqrt(r) + 1e-12);
      }
      return 2 * n;
    };
    const modesContinu = kL => positif(kL, "kL") ** 3 / (3 * PI * PI);
    /* the black-body energy density in reduced form: u(ω) dω = ((k_B T)⁴/(π² c³ ħ³)) f(x) dx, x = ħω/k_B T, with
       f = x³/(e^x − 1) for "planck" ((4.43), photons as bosons), x³ e^(−x) for "wien" (no stimulated emission),
       x² for "rayleigh" (k_B T per mode). */
    const spectreReduit = (x, loi = "planck") => {
      positif(x, "x");
      if (loi === "planck") return x === 0 ? 0 : x > 700 ? 0 : x ** 3 / Math.expm1(x);
      if (loi === "wien") return x ** 3 * Math.exp(-x);
      if (loi === "rayleigh") return x * x;
      return err("loi inconnue : " + loi);
    };
    /* ideal Bose gas of n atoms per m³ of mass m (kg): T_c where n λ_th³ = ζ(3/2), λ_th = h/√(2π m k_B T):
       T_c = (2π ħ²/(m k_B)) (n/ζ(3/2))^(2/3). Approximation: no interaction between the atoms (false in a liquid). */
    const tCondensation = (n, m) => (2 * PI * HBAR * HBAR / (pos(m, "m") * KB)) * (pos(n, "n") / ZETA32) ** (2 / 3);
    /* the condensed fraction of that ideal gas: 1 − (T/T_c)^(3/2) below T_c, 0 above */
    const fractionCondensee = (T, Tc) => (positif(T, "T") >= pos(Tc, "Tc") ? 0 : 1 - (T / Tc) ** 1.5);
    /* ideal Fermi gas at T = 0, g spin states (2 for spin 1/2): E_F = (ħ²/2m)(6π² n/g)^(2/3), J */
    const energieFermi = (n, m, g = 2) => (HBAR * HBAR / (2 * pos(m, "m"))) * (6 * PI * PI * pos(n, "n") / pos(g, "g")) ** (2 / 3);
    /* (4.44) in a box: a particle in a box of width 1 (x in [0, 1]) in state p has the amplitude φ_p(x) = √2 sin(pπx).
       Two particles in states p and q, found at x1 and x2: "discernables" φ_p(x1)φ_q(x2); "bosons" the normalised sum
       with the exchanged term (φ_p(x1)φ_p(x2) alone when p = q); "fermions" the normalised difference, zero when p = q. */
    const etatBoite = (p, x) => Math.SQRT2 * Math.sin(entier(p, "p") * PI * fini(x, "x"));
    const amplitudeDeuxBoite = (p, q, x1, x2, stat) => {
      const d = etatBoite(p, x1) * etatBoite(q, x2), e = etatBoite(q, x1) * etatBoite(p, x2);
      if (stat === "discernables") return d;
      if (stat === "bosons") return p === q ? d : (d + e) / Math.SQRT2;
      if (stat === "fermions") return (d - e) / Math.SQRT2;
      return err("statistique inconnue : " + stat);
    };
    /* the probability that the two are less than delta apart, |x1 − x2| < delta: midpoint sum on an N × N grid. A cell whose
       centre lies on the edge |i − j| = delta N is cut in half by it and counts 1/2: without that, the sum is off by O(1/N)
       (38,7 % instead of 38,4 % for p = 1, q = 2, singlet, delta = 0,1, N = 200). */
    const probaProches = (p, q, stat, delta, N = 200) => {
      positif(delta, "delta"); entier(N, "N");
      const K = delta * N;
      let s = 0;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const k = Math.abs(i - j), w = k < K - 1e-9 ? 1 : Math.abs(k - K) <= 1e-9 ? 0.5 : 0;
        if (w) s += w * amplitudeDeuxBoite(p, q, (i + 0.5) / N, (j + 0.5) / N, stat) ** 2;
      }
      return s / (N * N);
    };
    /* electrons placed one by one in the subshells n, l, taken in Madelung's order (n + l, then n), 2(2l + 1) places each.
       stat "fermions": the real atom, a model with exceptions from Z = 24 (Cr, Cu…); "bosons": all Z in 1s.
       Returns [{ n, l, places, occ }] for the subshells holding at least one electron. */
    const ORDRE = [];
    for (let s = 1; s <= 8; s++) for (let n = 1; n <= s; n++) { const l = s - n; if (l < n && l <= 3) ORDRE.push([n, l]); }
    const couchesElectrons = (Z, stat = "fermions") => {
      entier(Z, "Z"); if (Z > 118) err("Z doit être ≤ 118");
      if (stat === "bosons") return [{ n: 1, l: 0, places: Z, occ: Z }];
      if (stat !== "fermions") err("statistique inconnue : " + stat);
      const out = []; let reste = Z;
      for (const [n, l] of ORDRE) { if (!reste) break; const places = 2 * (2 * l + 1), occ = Math.min(places, reste); out.push({ n, l, places, occ }); reste -= occ; }
      return out;
    };
    Object.assign(api, { ZETA32, occupationPhotons, tauxPhotons, relaxationPhotons, modesCube, modesContinu, spectreReduit,
      tCondensation, fractionCondensee, energieFermi, etatBoite, amplitudeDeuxBoite, probaProches, couchesElectrons });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.QuantAmp = api;
})(typeof self !== "undefined" ? self : this);

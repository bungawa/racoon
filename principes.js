/* Principes — le module commun du monde « Principes et symétries ». Pur, sans DOM, UMD (global Principes). SI partout.
   Chaque étape ajoute sa section juste avant la ligne « fin des sections », par Edit seulement, avec
   Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par
   chaque étape. Chaque fonction est un modèle : son domaine est dans son commentaire.
   Les erreurs lèvent un message en français : elles signalent un appel faux. Tests : test/principes.test.js, une section
   par étape, avant sa propre ligne « fin des sections ».

   Sommaire
   Socle
     fini(x, nom), vec3(v, nom)   contrôles d'appel : un nombre fini ; un tableau de 3 nombres finis.
   Le principe de moindre action (étape « Le principe de moindre action »)
     pesanteur(m, g), ressort(m, k)        systèmes à une dimension, L = m ẋ²/2 − V(x) : V, V′, raideur, trajet vrai entre deux bornes.
     actionDiscrete(sys, xs, h)            S d'une suite de positions espacées de h (énergie cinétique par différences, V par trapèzes).
     gradientDiscret(sys, xs, h)           ∂S/∂xᵢ aux points intérieurs : nul sur le trajet du saute-mouton.
     action(sys, x, b, n), essai(…)        S d'un trajet x(t) entre les bornes b ; trajet vrai + a sin(nπ(t − t1)/T).
     courbure(sys, T, n), modesNegatifs    S = S0 + c a² exactement (lagrangien quadratique) ; nombre de modes où c < 0.
     largeurQuantique(sys, T, n)           écart a pour lequel la phase S/ħ change d'un radian.
     capaCoaxiale, capaEssai, essaiCoax,   capacité linéique d'un condensateur cylindrique : exacte, par un potentiel d'essai,
     capaQuadratique, alphaOptimal         famille quadratique de paramètre α et son meilleur α.
     parallele(I, R), dissipation(Ik, R)   partage d'un courant entre conducteurs ohmiques en parallèle ; puissance Σ R I².
     egaliser(I, f), branches(I, liste)    courants qui égalisent des fonctions croissantes ; conducteurs V = R i + β i³ :
                                           partage réel (tensions égales) et partage de dissipation minimale.
   Parité et antimatière (étape « Parité et antimatière ») — vecteurs [x, y, z], n la normale d'un miroir plan.
     vectorielMain(a, b, main)              a × b, main = +1 (règle de la main droite) ou −1 (main gauche). Les images dans
                                           un miroir passent par miroir et transformer (étape « Symétries et lois de conservation »).
     champFil(I, u, r, main)                champ B d'un fil rectiligne infini (axe par l'origine, direction u, courant I) en r.
     forceFil(o), miroirFil(o, n)           { B, F } : la charge q de vitesse v en r, près du fil ; l'expérience vue dans le miroir.
     distributionBeta(a), fractionAvant(a)  W(θ) = 1 + a cos θ des électrons d'une désintégration β ; part émise vers θ < 90°.
     coefficientWu(A, P, beta)              a = A P β : asymétrie, polarisation des noyaux, vitesse v/c des électrons.
     betaCinetique(T, mc2)                  v/c d'une particule d'énergie cinétique T et d'énergie de masse mc² (J).
     cosMiroir(J, p, n)                     cos(J, p) après réflexion : J axial (spin), p polaire (impulsion).
     helicite(s, p)                         s·p/(|s||p|), le signe de la projection du spin sur l'impulsion.
     etat(o), transforme(e, ops), existe(e) une particule { nom, anti, q, p, s } ; C, P, T appliqués de droite à gauche ;
                                           un neutrino sans masse n'existe que gaucher, un antineutrino que droitier.
     annihilation(T, thetaCM)               e⁺ d'énergie cinétique T sur e⁻ au repos → deux photons : énergies, angle.
     coulombSphere(Z, R), ecartMiroir(A, r0)  énergie coulombienne d'une boule uniforme de charge Ze ; écart entre noyaux
                                           miroirs de nombre de masse A impair, rayon r0 A^(1/3).
   Symétries et lois de conservation (étape « Symétries et lois de conservation »)
     mouvement(e0, env, t)                 balle dans g uniforme, frottement linéaire (tau, vent) : solution exacte, avant ou arrière.
     OPERATIONS, operation(nom, p)         translation, temps, rotation, reflexion, vitesse, renversement : { evt, env }.
     epreuveSymetrie(op, e0, env, o)       image du mouvement contre la loi appliquée à l'image du départ ; ecart (m), relatif.
     contraintePied, hauteurLimite,        σ = γ h au pied d'un prisme ; h = f/γ ; même forme ×k : poids ×k³, section ×k²,
     similitude(k)                         contrainte ×k.
     CAS, deuxCorps(cas, p),               deux masses et un ressort, avec ou sans potentiel extérieur (rainure, centre) ou
     conservation(cas, p, s0, h, n)        raideur pulsée : px, py, Lz, E le long d'un saute-mouton, et leurs écarts.
     dephaser, probabilite, interference   (52.1) : ψ e^{iΔ} ; |ψ|² ; |ψ1 e^{iΔ1} + ψ2 e^{iΔ2}|².
     TETRAEDRE, MIROIR_TETRA, SYM_TETRA,   tétraèdre régulier, miroir x = y, ses 24 symétries dont 12 rotations ;
     ROTATIONS_TETRA, reflechir, accord,   accord(subst, R) : groupes de l'image tournée posés sur un sommet, et de même nom ;
     superposable(subst)                   chiral si aucune rotation ne ramène l'image sur la molécule.
     POUVOIR_SACCHAROSE, rotationOptique   loi de Biot α = [α] ℓ c ; saccharose 0,665 17 °·m²·kg⁻¹ (589 nm, 20 °C).
     miroir(n), NATURES, transformer,      matrice I − 2nnᵀ ; polaire : M v, axial : det M · M v ; nature d'un produit ;
     natureProduit, lorentzMiroir          F = q v × B dans le monde et dans son image.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const err = m => { throw new Error("Principes : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const vec3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
  const api = { fini, vec3 };

  /* ---------- étape « Le principe de moindre action » ----------
     Mouvement à une dimension entre deux bornes b = { t1, x1, t2, x2 } (s, m), lagrangien L = m ẋ²/2 − V(x).
     Modèle : un point matériel, une force conservative, v ≪ c ; un frottement n'a pas de place ici. */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const pos = (x, nom) => (fini(x, nom) > 0 ? x : err(nom + " doit être strictement positif"));
    const entier = (n, nom, min) => (Number.isInteger(n) && n >= min ? n : err(nom + " doit être un entier ≥ " + min));
    const mode = n => entier(n === undefined ? 1 : n, "le mode n", 1);
    const bornes = b => { if (!b || typeof b !== "object") err("bornes { t1, x1, t2, x2 } attendues");
      ["t1", "x1", "t2", "x2"].forEach(k => fini(b[k], k)); if (!(b.t2 > b.t1)) err("t2 > t1 attendu"); return b; };
    const systeme = s => (s && typeof s.V === "function" && typeof s.dV === "function" && s.m > 0 ? s : err("système { m, V, dV, vrai } attendu"));
    const droite = (b, t) => b.x1 + (b.x2 - b.x1) * (t - b.t1) / (b.t2 - b.t1);
    const simpson = (f, a, b, n) => { const h = (b - a) / n; let s = f(a) + f(b);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };

    /* pesanteur uniforme, axe vers le haut : V = m g x. Exacte pour un champ uniforme ; près du sol, g décroît de 3 × 10⁻⁷ par mètre. */
    const pesanteur = (m, g) => { pos(m, "m"); fini(g, "g");
      return { m, raideur: 0, V: x => m * g * x, dV: () => m * g,
        vrai: b => (bornes(b), t => droite(b, t) + g / 2 * (t - b.t1) * (b.t2 - t)) }; };
    /* ressort de raideur k, V = k x²/2, ω = √(k/m). Trajet vrai unique sauf si ωT est un multiple de π (point conjugué) : erreur. */
    const ressort = (m, k) => { pos(m, "m"); pos(k, "k"); const w = Math.sqrt(k / m);
      return { m, raideur: k, omega: w, V: x => k * x * x / 2, dV: x => k * x,
        vrai: b => { bornes(b); const s = Math.sin(w * (b.t2 - b.t1));
          if (Math.abs(s) < 1e-9) err("ωT multiple de π : une infinité de trajets vrais (point conjugué)");
          return t => (b.x1 * Math.sin(w * (b.t2 - t)) + b.x2 * Math.sin(w * (t - b.t1))) / s; } }; };

    /* S = Σ h [ m/2 ((xᵢ₊₁ − xᵢ)/h)² − (V(xᵢ) + V(xᵢ₊₁))/2 ] : approche ∫ L dt à O(h²) près pour un trajet régulier. */
    const actionDiscrete = (sys, xs, h) => { systeme(sys); pos(h, "h"); if (!Array.isArray(xs) || xs.length < 2) err("au moins deux positions");
      let S = 0;
      for (let i = 0; i + 1 < xs.length; i++) { const v = (fini(xs[i + 1], "x") - fini(xs[i], "x")) / h; S += h * (sys.m * v * v / 2 - (sys.V(xs[i]) + sys.V(xs[i + 1])) / 2); }
      return S; };
    /* ∂S/∂xᵢ = m (2xᵢ − xᵢ₋₁ − xᵢ₊₁)/h − h V′(xᵢ). Nul ⇔ m (xᵢ₊₁ − 2xᵢ + xᵢ₋₁)/h² = −V′(xᵢ) : le schéma du saute-mouton. */
    const gradientDiscret = (sys, xs, h) => { systeme(sys); pos(h, "h"); if (!Array.isArray(xs) || xs.length < 3) err("au moins trois positions");
      return xs.slice(1, -1).map((x, j) => sys.m * (2 * x - xs[j] - xs[j + 2]) / h - h * sys.dV(x)); };
    const action = (sys, x, b, n) => { bornes(b); n = entier(n === undefined ? 2000 : n, "n", 1);
      if (typeof x !== "function") err("x doit être une fonction du temps");
      const h = (b.t2 - b.t1) / n;
      return actionDiscrete(sys, Array.from({ length: n + 1 }, (_, i) => x(b.t1 + i * h)), h); };
    /* trajet d'essai : le trajet vrai + a sin(nπ(t − t1)/T), mêmes bornes. */
    const essai = (sys, b, a, n) => { const x = systeme(sys).vrai(b), T = b.t2 - b.t1; fini(a, "a"); n = mode(n);
      return t => x(t) + a * Math.sin(n * Math.PI * (t - b.t1) / T); };
    /* c = (T/4)(m n²π²/T² − k) : S(a) = S0 + c a², exactement, quand V est un polynôme de degré ≤ 2 (aucun terme en a). */
    const courbure = (sys, T, n) => { systeme(sys); pos(T, "T"); n = mode(n); return T / 4 * (sys.m * (n * Math.PI / T) ** 2 - sys.raideur); };
    /* nombre de modes n ≥ 1 où c < 0 : 0 ⇒ minimum ; 1 ou plus ⇒ col. Pour un ressort, le nombre d'entiers n < ωT/π. */
    const modesNegatifs = (sys, T) => { systeme(sys); pos(T, "T"); if (!(sys.raideur > 0)) return 0;
      let k = 0; while (courbure(sys, T, k + 1) < 0) k++; return k; };
    /* a tel que |c| a² = ħ : un trajet plus écarté a sa phase S/ħ décalée de plus d'un radian. Infini si c = 0. */
    const largeurQuantique = (sys, T, n) => { const c = Math.abs(courbure(sys, T, n)); return c > 0 ? Math.sqrt(Cst.hbar / c) : Infinity; };

    /* condensateur cylindrique, rayons a < b, vide, longueur ≫ b (effets de bord négligés) : C = 2π ε0 / ln(b/a), en F·m⁻¹. */
    const rayons = (a, b) => { pos(a, "a"); pos(b, "b"); if (!(b > a)) err("b > a attendu"); };
    const capaCoaxiale = (a, b) => { rayons(a, b); return 2 * Math.PI * Cst.eps0 / Math.log(b / a); };
    /* potentiel d'essai φ(r) de dérivée dphi(r) : C = 2π ε0 ∫ φ′² r dr / (φ(a) − φ(b))². Toujours ≥ la vraie capacité (U* minimum). Simpson, n pair. */
    const capaEssai = (phi, dphi, a, b, n) => { rayons(a, b); n = entier(n === undefined ? 400 : n, "n", 2); if (n % 2) err("n doit être pair");
      const U = phi(a) - phi(b); if (!(Math.abs(U) > 0)) err("φ(a) ≠ φ(b) attendu");
      return 2 * Math.PI * Cst.eps0 * simpson(r => dphi(r) ** 2 * r, a, b, n) / (U * U); };
    /* famille quadratique : φ = 1 + α u − (1 + α) u², u = (r − a)/(b − a) ; α = −1 donne le potentiel linéaire. */
    const essaiCoax = (a, b, alpha) => { rayons(a, b); fini(alpha, "α"); const d = b - a;
      return { phi: r => { const u = (r - a) / d; return 1 + alpha * u - (1 + alpha) * u * u; }, dphi: r => (alpha - 2 * (1 + alpha) * (r - a) / d) / d }; };
    const capaQuadratique = (a, b, alpha) => { rayons(a, b); fini(alpha, "α");
      return 2 * Math.PI * Cst.eps0 * a / (b - a) * (b / a * (alpha * alpha / 6 + 2 * alpha / 3 + 1) + alpha * alpha / 6 + 1 / 3); };
    const alphaOptimal = (a, b) => { rayons(a, b); return -2 * b / (b + a); };

    /* conducteurs ohmiques en parallèle, courant total I : Iₖ = I (1/Rₖ)/Σ(1/Rⱼ), tension U commune, puissance P = U I. */
    const resistances = R => { if (!Array.isArray(R) || !R.length) err("liste de résistances attendue"); R.forEach((r, k) => pos(r, "R[" + k + "]")); return R; };
    const parallele = (I, R) => { fini(I, "I"); resistances(R); const G = R.reduce((s, r) => s + 1 / r, 0), U = I / G;
      return { I: R.map(r => U / r), U, P: U * I }; };
    const dissipation = (Ik, R) => { resistances(R); if (!Array.isArray(Ik) || Ik.length !== R.length) err("autant de courants que de résistances");
      return Ik.reduce((s, i, k) => s + R[k] * fini(i, "I[" + k + "]") ** 2, 0); };
    /* f : fonctions strictement croissantes, nulles en 0. Courants Iₖ de somme I qui rendent tous les fₖ(Iₖ) égaux (à λ), par dichotomie. */
    const egaliser = (I, f) => { fini(I, "I"); if (!Array.isArray(f) || !f.length || f.some(g => typeof g !== "function")) err("liste de fonctions attendue");
      const M = Math.abs(I) || 1, N = 90;
      const inv = (g, y) => { let lo = -M, hi = M; for (let i = 0; i < N; i++) { const c = (lo + hi) / 2; if (g(c) < y) lo = c; else hi = c; } return (lo + hi) / 2; };
      let lo = Math.min(...f.map(g => g(-M))), hi = Math.max(...f.map(g => g(M)));
      for (let i = 0; i < N; i++) { const c = (lo + hi) / 2; if (f.reduce((s, g) => s + inv(g, c), 0) < I) lo = c; else hi = c; }
      const lambda = (lo + hi) / 2; return { I: f.map(g => inv(g, lambda)), lambda }; };
    /* branches en parallèle, V(i) = R i + β i³ (β ≥ 0 ; β = 0 : Ohm). reel : tensions égales (Kirchhoff) ; minimum : dissipation Σ i V(i) minimale. */
    const branches = (I, liste) => { if (!Array.isArray(liste) || !liste.length) err("liste de branches { R, beta } attendue");
      const L = liste.map((c, k) => { const beta = c.beta === undefined ? 0 : fini(c.beta, "beta[" + k + "]"); if (beta < 0) err("beta doit être ≥ 0");
        return { R: pos(c.R, "R[" + k + "]"), beta }; });
      const V = L.map(c => i => c.R * i + c.beta * i ** 3), dP = L.map(c => i => 2 * c.R * i + 4 * c.beta * i ** 3);
      const puissance = Ik => Ik.reduce((s, i, k) => s + i * V[k](i), 0);
      const r = egaliser(I, V), m = egaliser(I, dP);
      return { reel: { I: r.I, U: r.lambda, P: puissance(r.I) }, minimum: { I: m.I, U: m.I.map((i, k) => V[k](i)), P: puissance(m.I) },
        tension: (k, i) => V[k](i), puissance }; };

    Object.assign(api, { pesanteur, ressort, actionDiscrete, gradientDiscret, action, essai, courbure, modesNegatifs, largeurQuantique,
      capaCoaxiale, capaEssai, essaiCoax, capaQuadratique, alphaOptimal, parallele, dissipation, egaliser, branches });
  }

  /* ---------- étape « Parité et antimatière » ----------
     Réflexion dans un miroir, règles de la main, désintégration β orientée, C, P et T sur une particule, annihilation,
     noyaux miroirs. Vecteurs [x, y, z] en SI ; un vecteur axial (B, spin, moment) est défini par une règle de la main. */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const scalaire = (a, b) => { vec3(a, "a"); vec3(b, "b"); return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
    const norme = v => Math.sqrt(scalaire(v, v));
    const main = m => (m === undefined ? 1 : m === 1 || m === -1 ? m : err("main doit valoir +1 (droite) ou −1 (gauche)"));
    /* a × b with the right-hand rule (main = +1), or its opposite with the left-hand rule. Exact. */
    function vectorielMain(a, b, m) {
      vec3(a, "a"); vec3(b, "b"); const k = main(m);
      return [k * (a[1] * b[2] - a[2] * b[1]), k * (a[2] * b[0] - a[0] * b[2]), k * (a[0] * b[1] - a[1] * b[0])];
    }
    const unitaire = (n, nom) => { const l = norme(vec3(n, nom)); if (!(l > 0)) err(nom + " ne doit pas être nul"); return n.map(x => x / l); };
    /* the image of v in the plane mirror of normal n: miroir and transformer of the step « Symétries et lois de
       conservation » (read at call time: that section is loaded after this one). */
    const reflexion = (v, n, genre) => api.transformer(api.miroir(n), v, genre === undefined ? "polaire" : genre);
    /* field of an infinite straight wire (axis through the origin, direction u, current I in A, positive along u) at r:
       μ0 I/(2π d) along u × d̂, d the distance to the axis; main = −1 gives the field of the left-hand convention.
       Model: thin wire, steady current, r not on the axis; near the middle of a real wire of length L the field
       is weaker by 2(d/L)² (factor 1/√(1 + 4d²/L²)). */
    function champFil(I, u, r, m) {
      fini(I, "I"); const n = unitaire(u, "u"); vec3(r, "r");
      const a = scalaire(r, n), d = r.map((x, i) => x - a * n[i]), d2 = scalaire(d, d);
      if (!(d2 > 0)) err("le point est sur le fil : le champ n'y est pas défini");
      const k = Cst.mu0 * I / (2 * Math.PI * d2);
      return vectorielMain(n, d, m).map(x => k * x);
    }
    const experience = o => { if (!o || typeof o !== "object") err("expérience { I, u, q, v, r, main } attendue");
      return { I: fini(o.I, "I"), u: vec3(o.u, "u"), q: fini(o.q, "q"), v: vec3(o.v, "v"), r: vec3(o.r, "r"), main: main(o.main) }; };
    /* a charge q (C) of velocity v (m·s⁻¹) at r, beside the wire: B = champFil, F = q v × B with the same hand.
       Two hand rules in a row: F does not depend on the convention. Model: v ≪ c, the charge's own field neglected. */
    function forceFil(o) {
      const e = experience(o), B = champFil(e.I, e.u, e.r, e.main), F = vectorielMain(e.v, B, e.main).map(x => e.q * x);
      return { B, F };
    }
    /* the same experiment built in the mirror of normal n: positions, current direction and velocity are polar vectors,
       charges and current intensities are scalars. The laws (and the hand) are kept. */
    function miroirFil(o, n) {
      const e = experience(o);
      return { I: e.I, q: e.q, main: e.main, u: reflexion(e.u, n), v: reflexion(e.v, n), r: reflexion(e.r, n) };
    }
    const coefficient = a => (fini(a, "a") >= -1 && a <= 1 ? a : err("|a| ≤ 1 : une distribution ne peut pas être négative"));
    /* W(θ) = 1 + a cos θ, the angular distribution of the electrons of an oriented β decay per unit solid angle (mean 1),
       θ measured from the nuclear spin. Model: allowed decay, first order in cos θ. */
    function distributionBeta(a) { coefficient(a); return theta => 1 + a * Math.cos(fini(theta, "θ")); }
    /* the share emitted into the hemisphere θ < 90°: (1/2)(1 + a/2). Exact for W(θ) = 1 + a cos θ. */
    const fractionAvant = a => (1 + coefficient(a) / 2) / 2;
    /* a = A P β: A the asymmetry of the decay (−1 for a pure Gamow-Teller transition such as ⁶⁰Co → ⁶⁰Ni*, in the
       V − A theory), P the polarisation of the nuclei (0 to 1), β = v/c of the electron. */
    function coefficientWu(A, P, beta) {
      if (!(fini(A, "A") >= -1 && A <= 1)) err("|A| ≤ 1 attendu");
      if (!(fini(P, "P") >= 0 && P <= 1)) err("0 ≤ P ≤ 1 attendu");
      if (!(fini(beta, "β") >= 0 && beta < 1)) err("0 ≤ β < 1 attendu");
      return A * P * beta;
    }
    /* v/c from the kinetic energy T and the rest energy mc² (same unit). Exact in special relativity:
       √(k(k + 2))/(1 + k), k = T/mc², with no loss of digits at small T. */
    function betaCinetique(T, mc2) {
      if (!(fini(T, "T") >= 0)) err("T ≥ 0 attendu"); if (!(fini(mc2, "mc2") > 0)) err("mc2 > 0 attendu");
      const k = T / mc2; return Math.sqrt(k * (k + 2)) / (1 + k);
    }
    const cosinus = (a, b) => { const l = norme(a) * norme(b); if (!(l > 0)) err("vecteur nul : pas d'angle"); return scalaire(a, b) / l; };
    /* cos of the angle between a spin J (axial) and a momentum p (polar), before and after the mirror of normal n.
       Whatever n, the sign changes: a law W(cos θ) that is not even in cos θ is not its own mirror image. */
    const cosMiroir = (J, p, n) => ({ avant: cosinus(J, p), apres: cosinus(reflexion(J, n, "axial"), reflexion(p, n)) });
    /* helicity sign: s·p/(|s||p|), −1 for a particle spinning left-handed about its motion. */
    const helicite = (s, p) => cosinus(vec3(s, "s"), vec3(p, "p"));
    /* a particle state: name, particle or antiparticle, charge in units of e, momentum p (polar), spin s (axial). */
    function etat(o) {
      if (!o || typeof o.nom !== "string") err("état { nom, anti, q, p, s } attendu");
      return { nom: o.nom, anti: !!o.anti, q: fini(o.q === undefined ? 0 : o.q, "q"), p: vec3(o.p, "p").slice(), s: vec3(o.s, "s").slice() };
    }
    /* C (particle ↔ antiparticle, charges reversed), P (space inversion: p reversed, s kept), T (motion reversed: p and s
       reversed), written as in an operator product: "CP" applies P first, then C. Exact on these labels; a real state
       carries more (wave function, phases) that these four numbers do not keep. */
    function transforme(e, ops) {
      let x = etat(e);
      if (typeof ops !== "string" || !/^[CPT]*$/.test(ops)) err("opérations : une suite de C, P et T");
      for (const op of [...ops].reverse()) {
        if (op === "C") x = { ...x, anti: !x.anti, q: -x.q };
        else if (op === "P") x = { ...x, p: x.p.map(v => -v) };
        else x = { ...x, p: x.p.map(v => -v), s: x.s.map(v => -v) };
      }
      return x;
    }
    /* whether nature has this state. Massless-neutrino model of the weak interaction (V − A): a neutrino is always
       left-handed, an antineutrino right-handed; their real masses, tiny, make the other helicity appear with a
       probability of order (mc²/E)², negligible here. Other particles: any helicity. */
    function existe(e) {
      const x = etat(e);
      if (x.nom !== "neutrino") return true;
      const h = helicite(x.s, x.p);
      return x.anti ? h > 0 : h < 0;
    }
    /* a positron of kinetic energy T (J) meets an electron at rest; the pair turns into two photons emitted at the angle
       thetaCM from the positron's direction in the centre-of-mass frame. Energies (J) and lab angle between the photons.
       Exact in special relativity (two-photon channel only, electron free and at rest: its binding of a few eV neglected). */
    function annihilation(T, thetaCM) {
      if (!(fini(T, "T") >= 0)) err("T ≥ 0 attendu"); fini(thetaCM, "θ");
      const mc2 = Cst.m_e * Cst.c * Cst.c, E = T + 2 * mc2, pc = Math.sqrt(T * (T + 2 * mc2)), M = Math.sqrt(2 * mc2 * E);
      const b = pc / E, g = E / M, e = M / 2, c = Math.cos(thetaCM), s = Math.sin(thetaCM);
      const ph = k => ({ E: g * e * (1 + k * b * c), p: [g * e * (k * c + b), k * e * s, 0] });
      const [a, d] = [ph(1), ph(-1)];
      const angle = Math.acos(Math.max(-1, Math.min(1, cosinus(a.p, d.p))));
      return { mc2, M, betaCM: b, E1: a.E, E2: d.E, p1: a.p, p2: d.p, angle };
    }
    /* electrostatic energy of a uniformly charged ball of Z protons and radius R (m): (3/5) Z(Z − 1) e²/(4π ε0 R), J.
       Z(Z − 1): the pairs of protons, a proton does not repel itself. Model: uniform charge, no exchange or surface terms. */
    function coulombSphere(Z, R) {
      if (!(Number.isInteger(Z) && Z >= 0)) err("Z entier ≥ 0 attendu"); if (!(fini(R, "R") > 0)) err("R > 0 attendu");
      return 0.6 * Z * (Z - 1) * Cst.e * Cst.e / (4 * Math.PI * Cst.eps0 * R);
    }
    /* mirror nuclei of odd mass number A: Z = (A + 1)/2 protons against Z − 1, same radius r0 A^(1/3). If the nuclear force
       treats p and n alike, their binding energies differ by the Coulomb energy only: (3/5)(A − 1) e²/(4π ε0 R). */
    function ecartMiroir(A, r0) {
      if (!(Number.isInteger(A) && A >= 3 && A % 2 === 1)) err("A entier impair ≥ 3 attendu");
      const r = r0 === undefined ? 1.2e-15 : fini(r0, "r0");
      if (!(r > 0)) err("r0 > 0 attendu");
      const Z = (A + 1) / 2, R = r * Math.cbrt(A);
      return { Z, N: Z - 1, R, dE: coulombSphere(Z, R) - coulombSphere(Z - 1, R) };
    }
    Object.assign(api, { vectorielMain, champFil, forceFil, miroirFil, distributionBeta, fractionAvant, coefficientWu,
      betaCinetique, cosMiroir, helicite, etat, transforme, existe, annihilation, coulombSphere, ecartMiroir });
  }

  /* ---------- étape « Symétries et lois de conservation » (Feynman I.52.1 à 52.5) ---------- */
  {
    const Tn = node ? require("./tenseurs.js") : root.Tenseurs;
    const Integ = node ? require("./lecons/integration.js") : root.Integ;
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const plus = (a, b, k) => a.map((x, i) => x + (k === undefined ? 1 : k) * b[i]);
    const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
    const dist = (a, b) => Math.hypot(...a.map((x, i) => x - b[i]));
    const unitaire = (n, nom) => { const l = Math.hypot(...vec3(n, nom)); if (!(l > 0)) err(nom + " ne peut pas être nul"); return n.map(x => x / l); };
    const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));

    /* --- opérations de symétrie appliquées à une loi --- */
    const ENV = { g: [0, 0, -Cst.g_CPGE], tau: Infinity, vent: [0, 0, 0] };
    function environnement(o) {
      const E = Object.assign({}, ENV, o || {});
      vec3(E.g, "g"); vec3(E.vent, "vent");
      if (!(E.tau > 0)) err("tau doit être > 0 (Infinity : sans frottement)");
      return E;
    }
    const evenement = e => { if (!e) err("événement { t, r, v } attendu"); fini(e.t, "t"); vec3(e.r, "r"); vec3(e.v, "v"); return e; };
    /* A ball in a uniform field g, with a drag linear in its speed relative to the air (time constant tau, air at vent):
       dv/dt = g − (v − vent)/tau. Exact solution of this model, forward or backward in time (t < e0.t allowed).
       tau = Infinity: no drag. The model: g uniform (it falls by 3 × 10⁻⁷ per metre of height), drag linear (Stokes,
       Reynolds number ≲ 1; for a ball in air the drag is quadratic). */
    function mouvement(e0, o, t) {
      evenement(e0); const E = environnement(o), d = fini(t, "t") - e0.t;
      if (E.tau === Infinity) return { t, r: e0.r.map((x, i) => x + e0.v[i] * d + E.g[i] * d * d / 2), v: e0.v.map((x, i) => x + E.g[i] * d) };
      const vl = E.g.map((g, i) => E.vent[i] + g * E.tau), f = Math.exp(-d / E.tau), w = -Math.expm1(-d / E.tau);
      return { t, r: e0.r.map((x, i) => x + vl[i] * d + (e0.v[i] - vl[i]) * E.tau * w), v: e0.v.map((x, i) => vl[i] + (x - vl[i]) * f) };
    }
    /* An operation acts on an event { t, r, v } (evt) and on the environment (env: what the experimenter can carry along).
       translation a (m), temps s (s), rotation θ (rad, about the horizontal axis y), reflexion n (plane through O, normal n),
       vitesse u (m·s⁻¹: the motion seen from a frame moving at −u, Galileo: valid while (u/c)² ≪ 1), renversement (t → −t). */
    const OPERATIONS = ["translation", "temps", "rotation", "reflexion", "vitesse", "renversement"];
    function operation(nom, p) {
      const meme = E => E, lin = A => ({ evt: e => ({ t: e.t, r: A(e.r), v: A(e.v) }), env: E => Object.assign({}, E, { g: A(E.g), vent: A(E.vent) }) });
      switch (nom) {
        case "translation": { const a = vec3(p, "a").slice(); return { nom, evt: e => ({ t: e.t, r: plus(e.r, a), v: e.v.slice() }), env: meme }; }
        case "temps": { const s = fini(p, "s"); return { nom, evt: e => ({ t: e.t + s, r: e.r.slice(), v: e.v.slice() }), env: meme }; }
        case "rotation": { const R = Tn.rotation([0, 1, 0], fini(p, "θ")); return Object.assign({ nom }, lin(v => Tn.appliquer(R, v))); }
        case "reflexion": { const n = unitaire(p, "n"); return Object.assign({ nom }, lin(v => plus(v, n, -2 * dot(v, n)))); }
        case "vitesse": { const u = vec3(p, "u").slice();
          return { nom, evt: e => ({ t: e.t, r: plus(e.r, u, e.t), v: plus(e.v, u) }), env: E => Object.assign({}, E, { vent: plus(E.vent, u) }) }; }
        case "renversement": return { nom, evt: e => ({ t: -e.t, r: e.r.slice(), v: e.v.map(x => -x) }), env: meme };
        default: return err("opération inconnue « " + nom + " » (" + OPERATIONS.join(", ") + ")");
      }
    }
    /* Is the operation a symmetry of the law? The image of the motion, point by point, against the motion the law gives
       from the image of the start, in the environment carried along (entrainer) or left in place. ecart (m) is the largest
       distance between the two at the same date; relatif divides it by the size of the motion. ancre "fin": the law starts
       from the image of the last event instead (time reversal: reverse the speed at the end and let it run). */
    function epreuveSymetrie(op, e0, o, opts) {
      const { duree, n = 60, entrainer = true, ancre = "debut" } = opts || {};
      pos(duree, "duree"); if (!(Number.isInteger(n) && n > 0)) err("n doit être un entier > 0");
      if (ancre !== "debut" && ancre !== "fin") err("ancre « debut » ou « fin »");
      const E = environnement(o), E2 = entrainer ? environnement(op.env(E)) : E;
      const d0 = op.evt(ancre === "fin" ? mouvement(evenement(e0), E, e0.t + duree) : evenement(e0));
      const ref = [], image = [], loi = [];
      let ecart = 0, taille = 0;
      for (let k = 0; k <= n; k++) {
        const e = mouvement(e0, E, e0.t + duree * k / n), im = op.evt(e), l = mouvement(d0, E2, im.t);
        ref.push(e); image.push(im); loi.push(l);
        ecart = Math.max(ecart, dist(im.r, l.r)); taille = Math.max(taille, dist(e.r, e0.r));
      }
      return { ref, image, loi, ecart, relatif: taille > 0 ? ecart / taille : 0 };
    }

    /* --- le changement d'échelle --- */
    /* stress at the foot of a uniform prism of height h under its own weight: σ = γ h, γ = ρ g the unit weight (N·m⁻³).
       Exact for a prism of constant section; g uniform over h (relative error h/R_Terre, 1,6 × 10⁻⁴ for 1 km). */
    function contraintePied(h, gamma) { if (!(h >= 0)) err("h doit être ≥ 0"); return pos(gamma, "γ") * h; }
    function hauteurLimite(f, gamma) { return pos(f, "f") / pos(gamma, "γ"); }
    /* same shape, every length × k: weight × k³, section × k², stress × k. */
    function similitude(k) { pos(k, "k"); return { longueur: k, section: k * k, poids: k * k * k, contrainte: k }; }

    /* --- symétries et lois de conservation --- */
    /* Two point masses in a plane, a spring between them (stiffness k, rest length l0): the internal force is along the line
       that joins them. Cases: "isole"; "rainure", each mass also in U = K x²/2 (depends on x only); "centre", U = K r²/2
       about O; "pulsation", k(t) = k (1 + eps sin Ωt). State x = [x1, y1, x2, y2], v likewise (SI). */
    const CAS = ["isole", "rainure", "centre", "pulsation"];
    function deuxCorps(cas, p) {
      if (!CAS.includes(cas)) err("cas inconnu « " + cas + " » (" + CAS.join(", ") + ")");
      const q = Object.assign({ m1: 1, m2: 2, k: 20, l0: 1, K: 2, eps: 0.5, Omega: 3 }, p || {});
      ["m1", "m2", "k", "l0"].forEach(c => pos(q[c], c)); ["K", "eps", "Omega"].forEach(c => fini(q[c], c));
      const kt = t => (cas === "pulsation" ? q.k * (1 + q.eps * Math.sin(q.Omega * t)) : q.k);
      const Kx = cas === "rainure" || cas === "centre" ? q.K : 0, Ky = cas === "centre" ? q.K : 0;
      function a(t, x) {
        const dx = x[2] - x[0], dy = x[3] - x[1], r = Math.hypot(dx, dy);
        if (!(r > 0)) err("les deux masses sont au même point");
        const f = kt(t) * (r - q.l0) / r;
        return [(f * dx - Kx * x[0]) / q.m1, (f * dy - Ky * x[1]) / q.m1, (-f * dx - Kx * x[2]) / q.m2, (-f * dy - Ky * x[3]) / q.m2];
      }
      function bilan(s) {
        const [x1, y1, x2, y2] = s.x, [u1, w1, u2, w2] = s.v, r = Math.hypot(x2 - x1, y2 - y1);
        return {
          px: q.m1 * u1 + q.m2 * u2, py: q.m1 * w1 + q.m2 * w2,
          Lz: q.m1 * (x1 * w1 - y1 * u1) + q.m2 * (x2 * w2 - y2 * u2),
          E: (q.m1 * (u1 * u1 + w1 * w1) + q.m2 * (u2 * u2 + w2 * w2)) / 2 + kt(s.t) * (r - q.l0) ** 2 / 2
            + Kx * (x1 * x1 + x2 * x2) / 2 + Ky * (y1 * y1 + y2 * y2) / 2,
        };
      }
      return { cas, p: q, a, bilan };
    }
    /* n leapfrog steps of h (Integ). Returns the positions x, the series and, per quantity, its largest gap to the start (ecarts) and the
       scale it is compared with (echelles: the largest |value| met, or the largest kinetic energy for E). The leapfrog keeps P
       and Lz to rounding when the forces allow it; E oscillates by O(h²) and does not drift. */
    function conservation(cas, p, s0, h, n) {
      const sys = deuxCorps(cas, p), run = Integ.run("leapfrog", sys.a, s0, h, n);
      const serie = run.t.map((t, i) => Object.assign({ t }, sys.bilan({ t, x: run.x[i], v: run.v[i] })));
      const ecarts = {}, echelles = {};
      ["px", "py", "Lz", "E"].forEach(c => {
        ecarts[c] = Math.max(...serie.map(b => Math.abs(b[c] - serie[0][c])));
        echelles[c] = Math.max(...serie.map(b => Math.abs(b[c])));
      });
      return { serie, ecarts, echelles, p: sys.p, x: run.x };
    }
    /* (52.1): ψ′ = ψ e^{iΔ}, ψ = [re, im]. |ψ′|² = |ψ|² exactly; only a phase difference between two amplitudes shows. */
    function dephaser(psi, delta) {
      fini(psi[0], "Re ψ"); fini(psi[1], "Im ψ"); fini(delta, "Δ");
      const c = Math.cos(delta), s = Math.sin(delta);
      return [psi[0] * c - psi[1] * s, psi[0] * s + psi[1] * c];
    }
    const probabilite = psi => psi[0] * psi[0] + psi[1] * psi[1];
    function interference(psi1, psi2, d1, d2) { const a = dephaser(psi1, d1), b = dephaser(psi2, d2); return probabilite([a[0] + b[0], a[1] + b[1]]); }

    /* --- réflexion dans un miroir : un carbone asymétrique --- */
    /* the four vertices of a regular tetrahedron, unit vectors; the mirror x = y maps it onto itself (swaps vertices 1 and 2). */
    const TETRAEDRE = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(v => v.map(x => x / Math.sqrt(3)));
    const MIROIR_TETRA = [Math.SQRT1_2, -Math.SQRT1_2, 0];
    const permutations = a => (a.length <= 1 ? [a] : a.flatMap((x, i) => permutations(a.filter((_, j) => j !== i)).map(p => [x, ...p])));
    /* the 24 linear maps that permute the vertices: M = (3/4) Σ e_σ(i) e_iᵀ (Σ e_i e_iᵀ = 4/3 I). det = +1 for the 12 rotations. */
    const SYM_TETRA = permutations([0, 1, 2, 3]).map(s => {
      const M = [0, 1, 2].map(r => [0, 1, 2].map(c => 0.75 * s.reduce((acc, j, i) => acc + TETRAEDRE[j][r] * TETRAEDRE[i][c], 0)));
      return { perm: s, M, det: Tn.det(M) };
    });
    const ROTATIONS_TETRA = SYM_TETRA.filter(x => x.det > 0).map(x => x.M);
    function reflechir(v, n) { const u = unitaire(n, "n"); return plus(vec3(v, "v"), u, -2 * dot(v, u)); }
    /* image of the molecule (substituent labels on the vertices) in the mirror, turned by R: how many of its 4 groups
       sit on a vertex of the original (tolerance tol, rad) and how many of those carry the same label. */
    function accord(subst, R, tol) {
      if (!Array.isArray(subst) || subst.length !== 4) err("4 substituants attendus");
      tol = tol === undefined ? 0.05 : tol;
      let poses = 0, memes = 0;
      subst.forEach((lab, j) => {
        const p = Tn.appliquer(R, reflechir(TETRAEDRE[j], MIROIR_TETRA));
        const i = TETRAEDRE.findIndex(e => Math.acos(Math.max(-1, Math.min(1, dot(e, p)))) < tol);
        if (i >= 0) { poses++; if (subst[i] === lab) memes++; }
      });
      return { poses, memes };
    }
    /* chiral = no rotation brings the mirror image onto the molecule. Searches the 12 rotations of the tetrahedron. */
    function superposable(subst) {
      let best = { memes: -1 };
      ROTATIONS_TETRA.forEach(R => { const a = accord(subst, R); if (a.memes > best.memes) best = Object.assign({ R }, a); });
      return { superposable: best.memes === 4, meilleur: best.memes, R: best.R };
    }
    /* Biot's law α = [α] ℓ c (°), [α] in °·m²·kg⁻¹, ℓ (m), c (kg·m⁻³). Approximation: dilute solution, α proportional to c;
       [α] holds for one wavelength and one temperature. */
    const POUVOIR_SACCHAROSE = 0.66517;       // °·m²·kg⁻¹ = 66,517 °·mL·g⁻¹·dm⁻¹, 589,44 nm, 20 °C (NIST, SRM 17f)
    function rotationOptique(pouvoir, l, c) { return fini(pouvoir, "[α]") * pos(l, "ℓ") * (c >= 0 ? c : err("c doit être ≥ 0")); }

    /* --- vecteurs polaires et vecteurs axiaux --- */
    function miroir(n) { const u = unitaire(n, "n"); return [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? 1 : 0) - 2 * u[i] * u[j])); }
    /* a polar vector is carried like a displacement, M v; an axial vector (defined by a right-hand rule) takes det M in
       addition: −M v in a mirror, M v in a rotation. Exact for an orthogonal M. */
    const NATURES = ["polaire", "axial"];
    function transformer(M, v, nature) {
      if (!NATURES.includes(nature)) err("nature « polaire » ou « axial »");
      const w = Tn.appliquer(M, vec3(v, "v"));
      return nature === "axial" ? w.map(x => Tn.det(M) * x) : w;
    }
    /* the nature of a product: vectoriel (a × b) or scalaire (a · b) of two vectors of given natures. */
    function natureProduit(op, na, nb) {
      if (!NATURES.includes(na) || !NATURES.includes(nb)) err("nature « polaire » ou « axial »");
      const pair = (na === "axial") !== (nb === "axial");
      if (op === "vectoriel") return pair ? "polaire" : "axial";
      if (op === "scalaire") return pair ? "pseudoscalaire" : "scalaire";
      return err("produit « vectoriel » ou « scalaire »");
    }
    /* F = q v × B in the world and in its mirror image (normal n). The mirror world computes F′ = q v′ × B′ with v′ = M v and
       B′ transformed as natureB. The law is the same in the mirror when F′ = M F (F is a force: polar). ecart = |F′ − M F| (N). */
    function lorentzMiroir(q, v, B, n, natureB) {
      fini(q, "q"); const M = miroir(n), F = Tn.vectoriel(vec3(v, "v"), vec3(B, "B")).map(x => q * x);
      const vp = Tn.appliquer(M, v), Bp = transformer(M, B, natureB), Fp = Tn.vectoriel(vp, Bp).map(x => q * x), image = Tn.appliquer(M, F);
      return { F, image, calculee: Fp, vp, Bp, ecart: dist(Fp, image) };
    }

    Object.assign(api, { mouvement, OPERATIONS, operation, epreuveSymetrie, contraintePied, hauteurLimite, similitude,
      CAS, deuxCorps, conservation, dephaser, probabilite, interference,
      TETRAEDRE, MIROIR_TETRA, SYM_TETRA, ROTATIONS_TETRA, reflechir, accord, superposable, POUVOIR_SACCHAROSE, rotationOptique,
      miroir, NATURES, transformer, natureProduit, lorentzMiroir });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.Principes = api;
})(typeof self !== "undefined" ? self : this);

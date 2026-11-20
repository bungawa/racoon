/* ChimArchi — le module commun du monde « Architecture de la matière et transformations » (chimie de PCSI et MPSI). Pur, sans
   DOM, UMD (global ChimArchi). Chaque étape ajoute sa section juste avant la ligne « fin des sections », par une petite modification
   en place, avec Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici
   par chaque étape ; un nom n'est exporté qu'une fois. Le module ne requiert que constantes.js. Unités : quantités en mol, volumes
   de solution en L (concentrations en mol·L⁻¹, l'usage de la chimie), pressions en bar pour les activités (p° = 1 bar), en Pa
   ailleurs, températures en K, énergies en J·mol⁻¹. Chaque fonction est un modèle : son domaine est dans son commentaire. Les
   erreurs lèvent un message en français.

   Sommaire
   Socle
     C0, P0                     concentration standard 1 mol·L⁻¹, pression standard 1 bar (= 10⁵ Pa).
   Étape « Avancement et équilibre » (chim-avancement)
     REACTIONS                  les réactions des leçons de l'étape : espèces { id, nu, etat }, constante K et sa source.
     quantites(n0, nu, xi)      n_i = n_i,0 + ν_i ξ.
     bornes(esp, n0)            ξ_min, ξ_max et les réactifs limitants dans chaque sens.
     activites(esp, n, ctx)     activités du modèle idéal : soluté c/c°, gaz p_i/p°, phase condensée pure ou solvant 1, mélange x_i.
     lnQ(esp, n, ctx)           ln Q = Σ ν_i ln a_i ; quotient(…) = Q.
     dichotomie(f, a, b, o)     zéro d'une fonction monotone changeant de signe sur [a, b].
     etatFinal(esp, n0, K, ctx) état final d'une transformation modélisée par une réaction unique : équilibre ou rupture.
     sens(Q, K)                 +1 sens direct, −1 sens inverse, 0 équilibre.
     gammaDH(z, I, A)           loi limite de Debye-Hückel : coefficient d'activité d'un ion.
     ecartGazParfait(B, p, T)   écart relatif au gaz parfait au premier ordre du viriel, Bp/(RT).
     defautDeMasse(dH, m)       variation relative de masse |ΔrH|/(m c²) d'un système qui échange l'énergie ΔrH.
     kDepuisDfG(esp, dfG, T)    K° = exp(−Σ ν_i Δ_fG°_i / RT), à partir d'enthalpies libres standard de formation.
   Étape « Vitesse des réactions » (chim-vitesse-reaction) ; lit à la demande lecons/integration.js, statistique.js et lecons/incertitude-absolue-relative.js
     moindresCarres(xs, ys)     droite des moindres carrés : pente, ordonnée, r², résidus.
     concentrationOrdre(n, k, c0, t), demiReaction(n, k, c0)   A → produits d'ordre 0, 1, 2 : loi intégrée, t½.
     suiviSimule(o, rand)       un suivi [A](t) bruité, pour tester les méthodes.
     methodeIntegrale(t, c), methodeDifferentielle(t, c), vitesses(t, c), ordreParDemiVies(c0s, t12s)   ordre tiré des mesures.
     ecartDegenerescence(r, q)  écart relatif de k_app quand [B]₀ = r [A]₀.
     kArrhenius(A, Ea, T), energieActivation(Ts, ks), eaDeuxPoints(k1, T1, k2, T2)   loi d'Arrhenius et Ea mesurée.
     kModifie(A, m, E0, T, Tref), eaApparente(m, E0, T), droiteArrhenius(o)   préfacteur en T^m : ce que la droite néglige.
     mecanisme(o), mecanismeExact(o, t)   A ⇌ I → P : Runge-Kutta d'ordre 4, et solution exacte.
     raideur(o, duree)          constantes de temps λ± et pas de Runge-Kutta stables : ce que l'AEQS évite.
     aeqs(o, t), preEquilibre(o, t), etapeDeterminante(o, t), ecartApprox(o, f, duree, n)   les trois approximations, leur écart.
   Étape « Orbitales moléculaires » (chim-orbitales-moleculaires) ; énergies d'orbitales en eV, longueurs en m
     RY_EV, ORBITALES_EV        énergie de Rydberg (eV) ; énergies des orbitales de valence de H, B, C, N, O, F (table de Gray).
     hydrogenoide(Z, n)         { E, r } : −RY Z²/n² et n² a0/Z, atome à un électron.
     configuration(Z), zEffectif(Z, n), valenceSlater(Z)   Z ≤ 18 : sous-couches, charge effective de Slater, orbitale de valence.
     interactionDeux(a1, a2, b, S)   deux orbitales, recouvrement S : énergies et coefficients exacts dans la base des deux.
     wolfsbergHelmholz(a1, a2, S, K), interactionPerturbative(a1, a2, b, S)   couplage tiré de S ; second ordre.
     ordreLiaison(nl, na), diatomique(sym, charge)   indice de liaison ; diagramme qualitatif de A₂ (Li à Ne), règle de Hund.
     stabilisationFrontiere(eHO, eBV, b), frontiereExacte(eHO, eBV, b)   interaction HO–BV à deux électrons.
   Étape « L'atome et la classification périodique » (chim-atome) ; Z ≤ 36, lit à la demande lecons/tableau-periodique-quantique.js
     ISOTOPES, Mu               masses et abondances (NIST, UICPA) de H, C, Si, Cl, Cu ; constante de masse molaire N_A u.
     masseMolaire(iso), composition(sym, f), quantiteMatiere(m, M)   M = Σ x_i A_r,i M_u ; isotope majoritaire à la fraction f ; n, N.
     defautMasse(Z, A, masse), rayonNoyau(A)   défaut de masse et énergie de liaison par nucléon ; r0 A^(1/3).
     klechkowski(N), configurationAtome(Z), configurationIon(Z, q)   la règle seule ; l'état fondamental (Cr, Cu) ; un ion.
     celibataires(c), bloc(Z), position(Z), famille(Z), caractere(Z), ionUsuel(Z)   Hund ; période, colonne, valence ; familles.
     slater(Z, n, l, c), externe(Z), rayonSlater(Z)   charge effective de Slater (blocs s, p, d) ; rayon n*² a0/Z*.
     CHI_PAULING, RAYON_COVALENT, ionisation(Z)   électronégativité de Pauling, rayon de covalence (m), énergie d'ionisation (J).
   Étape « Molécules et interactions » (chim-molecules) ; moments dipolaires en D, longueurs en m sauf mention
     DEBYE                      1 D = 10⁻²¹/c C·m.
     electronsValence(s), doubletsLewis(formule, z)   électrons de valence ; électrons et doublets d'une entité.
     LEWIS, formeLewis(id, k)   les entités de la leçon « Schémas de Lewis et mésomérie », une forme mésomère.
     bilanLewis(s), ordresMoyens(formes), anglesLibres(dirs, k)   charges formelles et octets ; ordre moyen sur des formes mésomères ; dessin des doublets.
     vsepr(p, q), momentMolecule(A, X, q), momentCoude(μL, θ), momentLiaison(μ, θ)   géométrie AXpEq (p + q ≤ 4) ; moment dipolaire.
     LONGUEURS, coefficientsVdW(m1, m2, T), MOLECULES_VDW, EBULLITION_HYDRURES   longueurs mesurées ; Keesom, Debye, London ; données.
     SOLVANTS, energiePaire(z1, z2, r, εr), longueurBjerrum(εr, T), fractionRestante(K, Vorg, Vaq, n), logP(co, ce)   solvants, extraction.
   Étape « Types de cristaux » (chim-types-cristaux) ; longueurs en m, énergies en J·mol⁻¹ ; madelung lit à la demande lecons/probabilites.js
     RAYONS, rayon(ion, cn)     rayons ioniques de Shannon (1976) par coordinence.
     STRUCTURES_IONIQUES        NaCl, CsCl, CaF2, ZnS : a (NBS), motif chargé ; distanceIons(id), additivite(id) : d contre r⁺ + r⁻.
     A_SEL_GEMME                arêtes de six sels de structure NaCl (NBS).
     ewald(motif, alpha), madelung(id)   énergie de Coulomb d'une maille par sommation d'Ewald ; constante de Madelung (à d, par |z⁺z⁻|).
     POLYEDRES, rapportCritique(cn), coordinencePredite(rho), section(cn, rho)   rapport des rayons et coordinence 4, 6, 8.
     BH, bornHaber(id)          cycle de Born–Haber à 298 K : étapes et enthalpie réticulaire.
     energieModele(r, M, zz, d0, n), bornLande(M, zz, d0, n), exposantBorn(id, Kv), N_BORN, nPauling(c, a), kapustinskii(nu, zz, d)
     SOLIDES, TYPES, cohesionSurRT(E, Tf), typeDevine(p)   quinze solides, leurs données ; E/(R Tf) ; tri par propriétés.
     CO2, KC, EV_MOL            glace carbonique (Pa3̄) ; N_A e²/(4π ε0) ; 1 eV par entité en J·mol⁻¹. */
(function (root) {
  const K = typeof require === "function" ? require("./constantes.js") : root.Constantes;
  const C0 = 1, P0 = 1;                                   // mol·L⁻¹, bar
  const ETATS = new Set(["aq", "g", "s", "l", "solvant", "x"]);
  const api = { C0, P0 };

  /* ---------- étape chim-avancement : avancement, quotient de réaction, état final ---------- */
  /* Une espèce : { id, nu, etat } ; nu < 0 pour un réactif, > 0 pour un produit (convention de l'équation écrite).
     etat : "aq" soluté, "g" gaz, "s" ou "l" phase condensée pure, "solvant" (activité 1, jamais limitant : très en excès),
     "x" constituant d'un mélange liquide idéal sans solvant (activité = fraction molaire dans ce mélange). */
  function verifier(esp, n) {
    if (!Array.isArray(esp) || !esp.length) throw new Error("chim : réaction sans espèce");
    esp.forEach(s => {
      if (!ETATS.has(s.etat)) throw new Error("chim : état inconnu « " + s.etat + " » pour " + s.id);
      if (!Number.isFinite(s.nu) || s.nu === 0) throw new Error("chim : coefficient stœchiométrique nul ou invalide pour " + s.id);
    });
    if (n) {
      if (n.length !== esp.length) throw new Error("chim : " + n.length + " quantités pour " + esp.length + " espèces");
      n.forEach((v, i) => { if (!(v >= 0) || !Number.isFinite(v)) throw new Error("chim : quantité négative ou invalide pour " + esp[i].id); });
    }
  }
  /* Exacte pour une réaction unique : conservation des éléments, chaque espèce varie de ν_i ξ. */
  const quantites = (n0, nu, xi) => n0.map((v, i) => v + nu[i] * xi);

  /* Les valeurs extrêmes de ξ où une quantité s'annule ; le solvant n'est jamais limitant.
     limitants : indices des espèces qui s'annulent en ξ_max (sens direct), en ξ_min (sens inverse). Égalité à 10⁻¹² près. */
  function bornes(esp, n0) {
    verifier(esp, n0);
    let max = Infinity, min = -Infinity;
    esp.forEach((s, i) => {
      if (s.etat === "solvant") return;
      if (s.nu < 0) max = Math.min(max, n0[i] / -s.nu);
      else min = Math.max(min, -n0[i] / s.nu);
    });
    const proche = (a, b) => Math.abs(a - b) <= 1e-12 * Math.max(Math.abs(a), Math.abs(b), 1e-300);
    const limitants = (b, signe) => esp.map((s, i) => i).filter(i => esp[i].etat !== "solvant" && Math.sign(esp[i].nu) === signe && proche(n0[i] / -esp[i].nu, b));
    return { xiMax: max, xiMin: min, limitants: Number.isFinite(max) ? limitants(max, -1) : [], limitantsInverse: Number.isFinite(min) ? limitants(min, 1) : [] };
  }

  /* Activités du modèle idéal. ctx : { V } volume de la solution en L (solutés) ; { p } pression totale en bar (gaz à p fixée),
     ou { Vg, T } volume en m³ et température en K (gaz à volume fixé). Approximation : solution diluée idéale (a = c/c°) et
     mélange de gaz parfaits (a = p_i/p°) ; voir gammaDH et ecartGazParfait pour l'écart. */
  function activites(esp, n, ctx) {
    verifier(esp, n);
    ctx = ctx || {};
    const nGaz = esp.reduce((t, s, i) => t + (s.etat === "g" ? n[i] : 0), 0), nX = esp.reduce((t, s, i) => t + (s.etat === "x" ? n[i] : 0), 0);
    return esp.map((s, i) => {
      switch (s.etat) {
        case "aq": if (!(ctx.V > 0)) throw new Error("chim : volume de solution V (L) requis pour " + s.id); return n[i] / ctx.V / C0;
        case "g":
          if (ctx.p > 0) return nGaz > 0 ? n[i] / nGaz * ctx.p / P0 : 0;
          if (ctx.Vg > 0 && ctx.T > 0) return n[i] * K.R * ctx.T / ctx.Vg / (P0 * 1e5);
          throw new Error("chim : pression totale p (bar), ou volume Vg (m³) et température T (K), requis pour " + s.id);
        case "x": return nX > 0 ? n[i] / nX : 0;
        default: return 1;                                  // s, l, solvant : phase condensée pure ou solvant
      }
    });
  }
  /* Exacte : c'est la définition de Q à partir des activités. ln 0 = −∞ : un produit absent donne Q = 0, un réactif absent Q = +∞. */
  function lnQ(esp, n, ctx) {
    const a = activites(esp, n, ctx);
    return esp.reduce((t, s, i) => t + s.nu * Math.log(a[i]), 0);
  }
  const quotient = (esp, n, ctx) => Math.exp(lnQ(esp, n, ctx));

  /* Zéro de f, monotone sur [a, b] avec f(a) et f(b) de signes opposés (±∞ permis aux bornes). Chaque pas divise l'intervalle
     par deux : |b − a|/2ⁿ après n pas. o.tol : largeur absolue visée (défaut : 10⁻¹⁵ de la plus grande borne), o.iter : 200 au plus. */
  function dichotomie(f, a, b, o) {
    o = o || {};
    let fa = f(a), fb = f(b);
    if (Number.isNaN(fa) || Number.isNaN(fb)) throw new Error("chim : fonction non définie à une borne");
    if (fa === 0) return { x: a, iter: 0 };
    if (fb === 0) return { x: b, iter: 0 };
    if (Math.sign(fa) === Math.sign(fb)) throw new Error("chim : pas de changement de signe sur l'intervalle");
    const tol = o.tol || 1e-15 * Math.max(Math.abs(a), Math.abs(b), 1e-300), iter = o.iter || 200;
    let k = 0;
    for (; k < iter && Math.abs(b - a) > tol; k++) {
      const m = (a + b) / 2;
      if (m === a || m === b) break;                       // plus de nombre flottant entre les deux
      const fm = f(m);
      if (fm === 0) return { x: m, iter: k + 1 };
      if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else { b = m; fb = fm; }
    }
    return { x: (a + b) / 2, iter: k };
  }

  const sens = (Q, Kc, rel) => { rel = rel === undefined ? 1e-9 : rel; const r = Math.log(Q / Kc); return Math.abs(r) <= rel ? 0 : r < 0 ? 1 : -1; };

  /* État final d'une transformation modélisée par une réaction unique, à T fixée (K constante).
     ln Q croît avec ξ (dérivée Σ ν_i²/n_i, moins (Σ ν_gaz)²/n_gaz à p fixée : positive par Cauchy-Schwarz), d'où un seul ξ_éq.
     type : "equilibre" (Q = K atteint), "rupture" (une phase condensée pure ou le dernier réactif disparaît avant : Q ≠ K, l'état
     final n'est pas un équilibre), "equilibre-initial". tau : ξ_f/ξ_max, le taux d'avancement final (sens direct). */
  function etatFinal(esp, n0, Kc, ctx) {
    if (!(Kc > 0) || !Number.isFinite(Kc)) throw new Error("chim : constante d'équilibre K > 0 attendue");
    const b = bornes(esp, n0), nu = esp.map(s => s.nu), lnK = Math.log(Kc);
    const g = xi => lnQ(esp, quantites(n0, nu, xi).map(v => Math.max(v, 0)), ctx) - lnK;
    const fin = (xi, type) => { const n = quantites(n0, nu, xi).map(v => Math.max(v, 0));
      return { xi, n, type, Q: Math.exp(lnQ(esp, n, ctx)), tau: Number.isFinite(b.xiMax) && b.xiMax > 0 ? xi / b.xiMax : NaN, bornes: b }; };
    const g0 = g(0);
    if (Math.abs(g0) <= 1e-12) return fin(0, "equilibre-initial");
    const [lo, hi] = g0 < 0 ? [0, b.xiMax] : [b.xiMin, 0];
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) throw new Error("chim : avancement non borné dans le sens de l'évolution");
    const bout = g0 < 0 ? hi : lo, gb = g(bout);
    if (g0 < 0 ? gb <= 0 : gb >= 0) return fin(bout, "rupture");
    return fin(dichotomie(g, lo, hi).x, "equilibre");
  }

  /* Loi limite de Debye-Hückel dans l'eau à 298 K : log₁₀ γ = −A z² √I, A = 0,509 (mol·L⁻¹)^(−1/2).
     Approximation : fiable sous I ≈ 10⁻³ mol·L⁻¹ ; à 10⁻² elle surestime déjà l'écart (γ = 0,889 contre 0,902 par Davies). */
  function gammaDH(z, I, A) {
    if (!(I >= 0)) throw new Error("chim : force ionique I ≥ 0 attendue");
    return Math.pow(10, -(A === undefined ? 0.509 : A) * z * z * Math.sqrt(I));
  }
  /* Z − 1 = Bp/(RT), premier ordre du développement du viriel ; B en m³·mol⁻¹, p en Pa, T en K. Diazote à 300 K :
     B = −4,466 × 10⁻⁶ m³·mol⁻¹ (Hellmann, Garberoglio et Harvey, 2026). */
  const ecartGazParfait = (B, p, T) => B * p / (K.R * T);
  const B_N2_300K = -4.466e-6;
  /* Δm/m = |ΔrH|/(m c²) : dH en J par mole de réaction, m en kg par mole de réaction (masse des réactifs). */
  const defautDeMasse = (dH, m) => Math.abs(dH) / (m * K.c * K.c);
  /* K° = exp(−ΔrG°/RT), ΔrG° = Σ ν_i Δ_fG°_i ; dfG en J·mol⁻¹, indexé par id. Exacte une fois les Δ_fG° donnés (tables à 298,15 K). */
  function kDepuisDfG(esp, dfG, T) {
    const dG = esp.reduce((t, s) => { if (!(s.id in dfG)) throw new Error("chim : Δ_fG° manquant pour " + s.id); return t + s.nu * dfG[s.id]; }, 0);
    return Math.exp(-dG / (K.R * T));
  }

  /* Réactions des leçons. Valeurs de K vérifiées :
     - estérification, K ≈ 4 (rapport des fractions molaires ; Berthelot et Péan de Saint-Gilles, 1862 : limite de 2/3 en
       proportions équimolaires) ; une mesure industrielle donne 3,7 entre 323 et 423 K ;
     - acide éthanoïque dans l'eau à 298 K, pKa = 4,756 (tables CRC) ;
     - N2O4 ⇌ 2 NO2 à 298 K : Δ_fG° = 97,89 et 51,31 kJ·mol⁻¹ (tables NBS), K° ≈ 0,15 ; Kp = 0,0694 kPa⁻¹ pour la dimérisation ;
     - AgCl, Ks = 1,82 × 10⁻¹⁰ à 298,15 K. */
  const DFG_298 = { N2O4: 97.89e3, NO2: 51.31e3 };
  const REACTIONS = {
    ch4: { esp: [{ id: "CH4", nu: -1, etat: "g" }, { id: "O2", nu: -2, etat: "g" }, { id: "CO2", nu: 1, etat: "g" }, { id: "H2O", nu: 2, etat: "g" }] },
    nh3: { esp: [{ id: "N2", nu: -1, etat: "g" }, { id: "H2", nu: -3, etat: "g" }, { id: "NH3", nu: 2, etat: "g" }] },
    agcl: { esp: [{ id: "Ag+", nu: -1, etat: "aq" }, { id: "Cl-", nu: -1, etat: "aq" }, { id: "AgCl", nu: 1, etat: "s" }], K: 1 / 1.82e-10 },
    ester: { esp: [{ id: "acide", nu: -1, etat: "x" }, { id: "alcool", nu: -1, etat: "x" }, { id: "ester", nu: 1, etat: "x" }, { id: "eau", nu: 1, etat: "x" }], K: 4 },
    ethanoique: { esp: [{ id: "CH3COOH", nu: -1, etat: "aq" }, { id: "H2O", nu: -1, etat: "solvant" }, { id: "CH3COO-", nu: 1, etat: "aq" }, { id: "H3O+", nu: 1, etat: "aq" }], K: Math.pow(10, -4.756) },
    n2o4: { esp: [{ id: "N2O4", nu: -1, etat: "g" }, { id: "NO2", nu: 2, etat: "g" }] },
    dissolutionAgCl: { esp: [{ id: "AgCl", nu: -1, etat: "s" }, { id: "Ag+", nu: 1, etat: "aq" }, { id: "Cl-", nu: 1, etat: "aq" }], K: 1.82e-10 },
  };
  REACTIONS.n2o4.K = kDepuisDfG(REACTIONS.n2o4.esp, DFG_298, 298.15);

  Object.assign(api, { REACTIONS, DFG_298, B_N2_300K, quantites, bornes, activites, lnQ, quotient, dichotomie, sens, etatFinal, gammaDH, ecartGazParfait, defautDeMasse, kDepuisDfG });

  /* ---------- étape chim-vitesse-reaction : vitesse, ordre, Arrhenius, mécanismes ---------- */
  {                                                       // bloc : ses noms (err, pos, lazy…) ne gênent pas les autres sections
    /* Réacteur fermé, parfaitement agité, isotherme, de volume constant : la concentration est la même partout, et
       v = −(1/α) d[A]/dt. Concentrations en mol·L⁻¹, temps en s, k dans l'unité qui rend v en mol·L⁻¹·s⁻¹.
       Les modules lus à la demande (Integ.rk4, Statistique.arrhenius, Incert.gauss) ne sont chargés que par les pages qui s'en servent. */
    const node = typeof module !== "undefined" && module.exports;
    const lazy = (file, name) => () => (node ? require(file) : root[name]) || err(name + " absent : charger /" + file.slice(2));
    const INTEG = lazy("./lecons/integration.js", "Integ"), STAT = lazy("./statistique.js", "Statistique");
    const INCERT = lazy("./lecons/incertitude-absolue-relative.js", "Incert");
    const err = m => { throw new Error("chim : " + m); };
    const pos = (v, nom) => { if (!(v > 0) || !Number.isFinite(v)) err(nom + " > 0 attendu"); return v; };
    const ordreOk = n => { if (![0, 1, 2].includes(n)) err("ordre 0, 1 ou 2 attendu"); return n; };

    /* Droite des moindres carrés y = pente x + ordonnee. Exacte : c'est la définition de l'ajustement ; r2, le coefficient de
       détermination ; ecartMax, le plus grand |résidu|. Au moins deux abscisses distinctes. */
    function moindresCarres(xs, ys) {
      const n = xs.length;
      if (n < 2 || ys.length !== n) err("au moins deux points, autant de x que de y");
      let sx = 0, sy = 0; for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; }
      const mx = sx / n, my = sy / n;
      let sxx = 0, sxy = 0, syy = 0;
      for (let i = 0; i < n; i++) { const dx = xs[i] - mx, dy = ys[i] - my; sxx += dx * dx; sxy += dx * dy; syy += dy * dy; }
      if (!(sxx > 0)) err("abscisses toutes égales");
      const pente = sxy / sxx, ordonnee = my - pente * mx, residus = ys.map((y, i) => y - (pente * xs[i] + ordonnee));
      const sres = residus.reduce((s, r) => s + r * r, 0);
      return { pente, ordonnee, r2: syy > 0 ? 1 - sres / syy : 1, residus, ecartMax: Math.max(...residus.map(Math.abs)) };
    }

    /* d[A]/dt = −k[A]^n, réactif unique A → produits (α = 1), n = 0, 1 ou 2. Lois intégrées, exactes pour ce modèle :
       ordre 0 : [A]₀ − kt (nul après [A]₀/k : la réaction s'arrête, le modèle ne vaut plus) ; ordre 1 : [A]₀ e^(−kt) ;
       ordre 2 : [A]₀/(1 + k[A]₀t). */
    function concentrationOrdre(n, k, c0, t) {
      ordreOk(n); pos(k, "k"); pos(c0, "[A]₀");
      if (!(t >= 0)) err("t ≥ 0 attendu");
      return n === 0 ? Math.max(c0 - k * t, 0) : n === 1 ? c0 * Math.exp(-k * t) : c0 / (1 + k * c0 * t);
    }
    /* Temps de demi-réaction du même modèle : [A]₀/(2k), ln 2/k, 1/(k[A]₀). Seul l'ordre 1 ne dépend pas de [A]₀. */
    function demiReaction(n, k, c0) {
      ordreOk(n); pos(k, "k"); pos(c0, "[A]₀");
      return n === 0 ? c0 / (2 * k) : n === 1 ? Math.LN2 / k : 1 / (k * c0);
    }
    /* Suivi simulé : points instants régulièrement espacés de 0 à duree, bruit relatif gaussien (écart-type bruit) sur chaque
       mesure, tiré par rand (uniforme sur [0, 1[, reproductible). Une concentration négative ou nulle est retirée. */
    function suiviSimule(o, rand) {
      const { n, k, c0, duree, points = 12, bruit = 0 } = o;
      pos(duree, "duree"); if (!(points >= 3)) err("au moins trois instants");
      const t = [], c = [];
      for (let i = 0; i < points; i++) {
        const ti = duree * i / (points - 1), u = rand ? INCERT().gauss(rand) : 0;
        const ci = concentrationOrdre(n, k, c0, ti) * (1 + bruit * u);
        if (ci > 0) { t.push(ti); c.push(ci); }
      }
      return { t, c };
    }
    /* Méthode intégrale : pour chaque ordre supposé, la grandeur qui doit être affine en t ([A], ln[A], 1/[A]), sa droite et
       le k qu'elle donne (−pente pour 0 et 1, +pente pour 2). L'ordre retenu est celui dont la droite a le plus grand r2 :
       c'est un test du modèle, pas une preuve ; il faut un avancement assez grand (au moins 50 %) pour départager. */
    const LINEARISE = [c => c, c => Math.log(c), c => 1 / c];
    function methodeIntegrale(t, c) {
      c.forEach(v => pos(v, "[A]"));
      const ordres = LINEARISE.map((f, n) => { const d = moindresCarres(t, c.map(f)); return { n, k: n === 2 ? d.pente : -d.pente, r2: d.r2, droite: d }; });
      return { ordres, meilleur: ordres.reduce((a, b) => b.r2 > a.r2 ? b : a).n };
    }
    /* Vitesse par différences : centrée à l'intérieur (erreur en Δt²), décentrée aux deux bouts (erreur en Δt). v = −d[A]/dt. */
    function vitesses(t, c) {
      if (t.length < 3 || c.length !== t.length) err("au moins trois points, autant de t que de [A]");
      const last = t.length - 1;
      return t.map((_, i) => { const a = Math.max(i - 1, 0), b = Math.min(i + 1, last); return -(c[b] - c[a]) / (t[b] - t[a]); });
    }
    /* Méthode différentielle : ln v = ln k + n ln[A], droite de ln v en fonction de ln[A] ; n est la pente. Les points où la
       vitesse estimée n'est pas positive (bruit) sont écartés. Sensible au bruit : dériver amplifie l'erreur de mesure. */
    function methodeDifferentielle(t, c) {
      const v = vitesses(t, c), x = [], y = [];
      v.forEach((vi, i) => { if (vi > 0 && c[i] > 0) { x.push(Math.log(c[i])); y.push(Math.log(vi)); } });
      const d = moindresCarres(x, y);
      return { n: d.pente, k: Math.exp(d.ordonnee), r2: d.r2 };
    }
    /* Ordre par les temps de demi-réaction : t½ ∝ [A]₀^(1 − n), donc n = 1 − pente de ln t½ en fonction de ln [A]₀. */
    function ordreParDemiVies(c0s, t12s) {
      const d = moindresCarres(c0s.map(v => Math.log(pos(v, "[A]₀"))), t12s.map(v => Math.log(pos(v, "t½"))));
      return { n: 1 - d.pente, r2: d.r2 };
    }
    /* Dégénérescence de l'ordre : v = k[A]^p[B]^q avec [B]₀ = r [A]₀, r ≫ 1. On écrit k_app = k[B]₀^q ; à la fin de la
       réaction [B] = [B]₀ − [A]₀ (α = β = 1), d'où l'écart relatif de k_app, exact pour ce modèle : 1 − (1 − 1/r)^q. */
    const ecartDegenerescence = (r, q) => { pos(r, "r"); if (r <= 1) err("[B]₀ > [A]₀ attendu"); return 1 - Math.pow(1 - 1 / r, q); };

    /* Arrhenius. k = A e^(−Ea/RT) : Statistique.arrhenius, Ea en J·mol⁻¹. */
    const kArrhenius = (A, Ea, T) => STAT().arrhenius(A, Ea, T);
    /* Énergie d'activation tirée de mesures : droite de ln k en fonction de 1/T, pente −Ea/R. */
    function energieActivation(Ts, ks) {
      const d = moindresCarres(Ts.map(T => 1 / pos(T, "T")), ks.map(k => Math.log(pos(k, "k"))));
      return { Ea: -d.pente * K.R, A: Math.exp(d.ordonnee), r2: d.r2, droite: d };
    }
    /* Deux températures : Ea = R ln(k₂/k₁)/(1/T₁ − 1/T₂). */
    function eaDeuxPoints(k1, T1, k2, T2) {
      pos(k1, "k₁"); pos(k2, "k₂"); pos(T1, "T₁"); pos(T2, "T₂"); if (T1 === T2) err("deux températures différentes attendues");
      return K.R * Math.log(k2 / k1) / (1 / T1 - 1 / T2);
    }
    /* Modèle à préfacteur variable (Kooij, 1893) : k = A (T/Tref)^m e^(−E0/RT). m = 1/2 pour des chocs de sphères dures (vitesse
       moyenne ∝ √T). Son énergie d'activation, au sens Ea = RT² d ln k/dT : E0 + mRT, exactement. */
    function kModifie(A, m, E0, T, Tref) { pos(T, "T"); return A * Math.pow(T / (Tref || 298.15), m) * Math.exp(-E0 / (K.R * T)); }
    const eaApparente = (m, E0, T) => E0 + m * K.R * pos(T, "T");
    /* Ce que coûte la droite d'Arrhenius sur [T1, T2] quand le vrai modèle est kModifie : n températures également
       espacées en 1/T, droite des moindres carrés, Ea lue, plus grand écart relatif entre k et la droite (e^|résidu| − 1). */
    function droiteArrhenius(o) {
      const { m = 0, E0, T1, T2, n = 15 } = o;
      pos(T1, "T1"); pos(T2, "T2"); if (!(T2 > T1)) err("T2 > T1 attendu");
      const Ts = Array.from({ length: n }, (_, i) => 1 / (1 / T1 + (1 / T2 - 1 / T1) * i / (n - 1)));
      const ks = Ts.map(T => kModifie(1, m, E0, T, T1)), r = energieActivation(Ts, ks);
      return { Ts, ks, Ea: r.Ea, A: r.A, ecartMax: Math.expm1(r.droite.ecartMax), droite: r.droite };
    }

    /* Mécanisme A ⇌ I (k1, km1), I → P (k2), actes élémentaires d'ordre 1 ; km1 = 0 : actes successifs A → I → P.
       o = { k1, km1, k2, a0, duree, pas } ; [I]₀ = [P]₀ = 0. Exact : dA/dt = −k1A + km1 I, dI/dt = k1A − (km1 + k2)I, dP/dt = k2 I.
       mecanisme : Runge-Kutta d'ordre 4 (Integ.rk4), pas constant duree/pas ; le pas doit rester petit devant 1/(k1 + km1 + k2). */
    function verifMeca(o) {
      pos(o.k1, "k1"); if (!(o.km1 >= 0)) err("km1 ≥ 0 attendu"); if (!(o.k2 >= 0)) err("k2 ≥ 0 attendu"); pos(o.a0, "[A]₀");
      return { k1: o.k1, km1: o.km1 || 0, k2: o.k2, a0: o.a0 };
    }
    function mecanisme(o) {
      const { k1, km1, k2, a0 } = verifMeca(o), pas = o.pas || 2000, h = pos(o.duree, "duree") / pas;
      const f = (t, y) => [-k1 * y[0] + km1 * y[1], k1 * y[0] - (km1 + k2) * y[1], k2 * y[1]];
      const t = [0], A = [a0], I = [0], P = [0], dI = [k1 * a0];
      let y = [a0, 0, 0];
      for (let i = 1; i <= pas; i++) {
        y = INTEG().rk4(f, (i - 1) * h, y, h);
        t.push(i * h); A.push(y[0]); I.push(y[1]); P.push(y[2]); dI.push(f(0, y)[1]);
      }
      return { t, A, I, P, dI };
    }
    /* La solution exacte du même système linéaire : deux constantes de temps 1/λ±, λ± racines de
       λ² − (k1 + km1 + k2) λ + k1 k2 = 0. Sert à contrôler l'intégration numérique. */
    function mecanismeExact(o, t) {
      const { k1, km1, k2, a0 } = verifMeca(o), s = k1 + km1 + k2, d = Math.sqrt(Math.max(s * s - 4 * k1 * k2, 0));
      const lp = (s + d) / 2, lm = (s - d) / 2;
      if (lp - lm < 1e-12 * s) {                                     // racine double : k1 = k2, km1 = 0
        const l = s / 2, A = a0 * Math.exp(-l * t) * (1 + (km1 + k2 - l) * t), I = a0 * k1 * t * Math.exp(-l * t);
        return { A, I, P: a0 - A - I };
      }
      /* I = a0 k1 (e^(−λ− t) − e^(−λ+ t))/(λ+ − λ−) ; A tiré de dI/dt + (km1 + k2) I = k1 A */
      const em = Math.exp(-lm * t), ep = Math.exp(-lp * t), I = a0 * k1 * (em - ep) / (lp - lm);
      const dI = a0 * k1 * (-lm * em + lp * ep) / (lp - lm), A = (dI + (km1 + k2) * I) / k1;
      return { A, I, P: a0 - A - I };
    }
    /* AEQS sur I : dI/dt ≈ 0, [I] = k1[A]/(km1 + k2), v = k_app [A], k_app = k1 k2/(km1 + k2). Vaut, après un temps d'induction
       de quelques 1/(km1 + k2), quand I disparaît bien plus vite qu'il ne se forme : k1 ≪ km1 + k2. */
    function aeqs(o, t) {
      const { k1, km1, k2, a0 } = verifMeca(o); pos(km1 + k2, "km1 + k2");
      const kapp = k1 * k2 / (km1 + k2), A = a0 * Math.exp(-kapp * t), I = k1 * A / (km1 + k2);
      return { kapp, A, I, P: a0 - A - I };
    }
    /* Pré-équilibre rapide : [I] = K[A], K = k1/km1 à chaque instant, et A + I décroît en k2 K/(1 + K). Vaut quand l'équilibre
       A ⇌ I s'établit bien avant que I parte vers P : k2 ≪ k1 + km1. */
    function preEquilibre(o, t) {
      const { k1, km1, k2, a0 } = verifMeca(o); pos(km1, "km1");
      const Kc = k1 / km1, kapp = k2 * Kc / (1 + Kc), S = a0 * Math.exp(-kapp * t);
      return { kapp, K: Kc, A: S / (1 + Kc), I: S * Kc / (1 + Kc), P: a0 - S };
    }
    /* Étape cinétiquement déterminante, actes successifs (km1 = 0) : la plus lente impose son rythme, [P] ≈ a0 (1 − e^(−k_min t)).
       Écart à la solution exacte de l'ordre de k_min/k_max sur [P]/a0 ; il disparaît quand k_min/k_max → 0. */
    function etapeDeterminante(o, t) {
      const { k1, km1, k2, a0 } = verifMeca(o); if (km1 !== 0) err("actes successifs seulement (km1 = 0) ; sinon preEquilibre");
      const kmin = Math.min(k1, k2);
      return { lente: k1 <= k2 ? 1 : 2, kapp: kmin, P: a0 * (1 - Math.exp(-kmin * t)) };
    }
    /* Raideur du système : les deux constantes de temps 1/λ±, et le nombre de pas qu'un Runge-Kutta d'ordre 4 explicite
       demande pour rester stable sur duree, h λ+ ≤ 2,785 (bord de sa région de stabilité sur l'axe réel). Quand
       λ+/λ− ≫ 1, presque tous ces pas suivent un intermédiaire déjà stationnaire : c'est ce que l'AEQS évite de calculer. */
    function raideur(o, duree) {
      const { k1, km1, k2 } = verifMeca(o), s = k1 + km1 + k2, d = Math.sqrt(Math.max(s * s - 4 * k1 * k2, 0));
      const lp = (s + d) / 2, lm = (s - d) / 2;
      return { lent: lm, rapide: lp, rapport: lm > 0 ? lp / lm : Infinity, pas: duree > 0 ? Math.ceil(duree * lp / 2.785) : NaN };
    }
    /* Plus grand écart, rapporté à a0, entre [P] exact et [P] d'une approximation, sur n instants de 0 à duree. */
    function ecartApprox(o, approx, duree, n) {
      n = n || 400; let e = 0;
      for (let i = 0; i <= n; i++) { const t = duree * i / n; e = Math.max(e, Math.abs(mecanismeExact(o, t).P - approx(o, t).P) / o.a0); }
      return e;
    }

    Object.assign(api, { moindresCarres, concentrationOrdre, demiReaction, suiviSimule, methodeIntegrale, vitesses, methodeDifferentielle,
      ordreParDemiVies, ecartDegenerescence, kArrhenius, energieActivation, eaDeuxPoints, kModifie, eaApparente, droiteArrhenius,
      mecanisme, mecanismeExact, raideur, aeqs, preEquilibre, etapeDeterminante, ecartApprox });
  }

  /* ---------- étape chim-orbitales-moleculaires : orbitales atomiques et moléculaires ---------- */
  {
    /* Énergies d'orbitales en eV, l'usage de la chimie orbitalaire (1 eV = e × 1 J/C, exact) ; longueurs en m.
       Un électron, une orbitale : l'approximation orbitalaire. Noyaux immobiles (Born et Oppenheimer). */
    const err = m => { throw new Error("chim : " + m); };
    const fini = (v, nom) => (Number.isFinite(v) ? v : err(nom + " doit être un nombre fini"));
    const RY_EV = K.hbar * K.hbar / (2 * K.m_e * K.a0 * K.a0) / K.e;      // 13,606 eV : énergie de Rydberg, noyau infiniment lourd
    /* Énergies des orbitales de valence (eV) : opposées des énergies d'ionisation moyennes de chaque sous-couche, table de
       H. B. Gray (Electrons and Chemical Bonding, 1964), arrondies à 0,1 eV ; H 1s : énergie d'ionisation de l'hydrogène (NIST,
       13,598 eV). Le 2s du fluor manque : les tables disponibles divergent (de −40 à −46 eV). */
    const ORBITALES_EV = Object.freeze({ H: { "1s": -13.6 }, B: { "2s": -14.0, "2p": -8.3 }, C: { "2s": -19.5, "2p": -10.7 },
      N: { "2s": -25.5, "2p": -13.1 }, O: { "2s": -32.4, "2p": -15.9 }, F: { "2p": -18.7 } });
    /* Atome à un électron, noyau de charge Ze : E = −RY Z²/n², rayon de l'orbitale (maximum de la densité radiale des orbitales
       l = n − 1) n² a0/Z. Exacts pour ce modèle ; masse réduite (5 × 10⁻⁴ en relatif pour H) et structure fine (~α² ≈ 5 × 10⁻⁵) négligées. */
    const entier = (v, nom, a, b) => (Number.isInteger(v) && v >= a && v <= b ? v : err(nom + " entier de " + a + " à " + b + " attendu"));
    const hydrogenoide = (Z, n) => { entier(n, "n", 1, 7); if (!(Z > 0)) err("Z > 0 attendu"); return { E: -RY_EV * Z * Z / (n * n), r: n * n * K.a0 / Z }; };
    /* Configuration de l'état fondamental, Z ≤ 18, ordre 1s 2s 2p 3s 3p (règle de Klechkowski, sans exception jusqu'à l'argon). */
    const SOUS_COUCHES = [[1, 0, 2], [2, 0, 2], [2, 1, 6], [3, 0, 2], [3, 1, 6]];
    const configuration = Z => { entier(Z, "Z", 1, 18); let reste = Z; const out = [];
      for (const [n, l, cap] of SOUS_COUCHES) { if (!reste) break; const e = Math.min(cap, reste); out.push({ n, l, e }); reste -= e; }
      return out; };
    /* Règles de Slater (1930) pour un électron s ou p de la couche n, Z ≤ 18 : chaque autre électron du groupe (ns, np) écrante
       de 0,35 (0,30 dans 1s), chaque électron de la couche n − 1 de 0,85, les plus profonds de 1. Z* = Z − σ. Empiriques : elles
       donnent des tendances, pas des énergies (voir energieSlater). */
    const zEffectif = (Z, n) => {
      const conf = configuration(Z), dans = conf.filter(c => c.n === n).reduce((s, c) => s + c.e, 0);
      if (!dans) err("aucun électron dans la couche n = " + n + " pour Z = " + Z);
      const sigma = conf.reduce((s, c) => s + (c.n === n ? (n === 1 ? 0.30 : 0.35) * c.e : c.n === n - 1 ? 0.85 * c.e : c.n < n ? c.e : 0), 0)
        - (n === 1 ? 0.30 : 0.35);                                          // l'électron considéré ne s'écrante pas lui-même
      return Z - sigma;
    };
    /* Orbitale de valence de l'atome Z (couche la plus haute occupée) dans le modèle hydrogénoïde de charge Z* : { n, zEff, r, E }.
       r = n² a0/Z* : bonne tendance (le rayon décroît le long d'une période). E = −RY Z*²/n² surestime l'énergie de liaison
       d'un facteur 3 à 5 du bore au fluor (C 2p : −35,9 eV contre −10,7 eV) : ce n'est pas l'énergie d'ionisation. */
    const valenceSlater = Z => { const conf = configuration(Z), n = conf[conf.length - 1].n, zEff = zEffectif(Z, n);
      return { n, zEff, r: n * n * K.a0 / zEff, E: -RY_EV * zEff * zEff / (n * n) }; };

    /* Deux orbitales normées χ1, χ2 d'énergies a1, a2 (eV), couplage b = ⟨χ1|H|χ2⟩ (eV, < 0 pour un recouvrement S > 0), recouvrement
       S = ⟨χ1|χ2⟩, |S| < 1. Combinaison c1 χ1 + c2 χ2 : det(H − E S) = 0, soit (1 − S²)E² − (a1 + a2 − 2bS)E + a1a2 − b² = 0.
       Exact dans la base des deux orbitales (méthode CLOA réduite à deux orbitales) ; les autres orbitales sont négligées. Coefficients
       normés : c1² + c2² + 2S c1c2 = 1, le plus grand en valeur absolue positif. stabilisation = min(a1, a2) − E_liante ;
       destabilisation = E_antiliante − max(a1, a2). Pour a1 = a2 = a : (aS − b)/(1 ± S), la déstabilisation l'emporte dès que S > 0
       et b < aS (couplage effectif b − aS négatif, ce que donne wolfsbergHelmholz avec K > 1 et a < 0) ; si b > aS, l'inverse. */
    function interactionDeux(a1, a2, b, S) {
      fini(a1, "a1"); fini(a2, "a2"); fini(b, "b"); S = S === undefined ? 0 : fini(S, "S");
      if (!(Math.abs(S) < 1)) err("|S| < 1 attendu");
      const A = 1 - S * S, B = a1 + a2 - 2 * b * S, C = a1 * a2 - b * b, d = Math.sqrt(Math.max(B * B - 4 * A * C, 0));
      const etat = (E, i) => {
        const u = [-(b - E * S), a1 - E], v = [a2 - E, -(b - E * S)], c = Math.hypot(...u) >= Math.hypot(...v) ? u : v;
        const nn = c[0] * c[0] + c[1] * c[1] + 2 * S * c[0] * c[1];
        if (!(nn > 0)) return { E, c: i ? [0, 1] : [1, 0] };              // a1 = a2 et b = a1 S : rien ne mélange les deux orbitales
        const k = (Math.abs(c[0]) >= Math.abs(c[1]) ? Math.sign(c[0]) : Math.sign(c[1])) / Math.sqrt(nn);
        return { E, c: [c[0] * k, c[1] * k] };
      };
      const liante = etat((B - d) / (2 * A), 0), antiliante = etat((B + d) / (2 * A), 1);
      return { liante, antiliante, stabilisation: Math.min(a1, a2) - liante.E, destabilisation: antiliante.E - Math.max(a1, a2) };
    }
    /* Approximation de Wolfsberg et Helmholz (1952) : b = K S (a1 + a2)/2, K = 1,75 (méthode de Hückel étendue, Hoffmann 1963).
       Empirique : relie le couplage au recouvrement ; ordres de grandeur seulement. */
    const wolfsbergHelmholz = (a1, a2, S, Kwh) => (Kwh === undefined ? 1.75 : Kwh) * fini(S, "S") * (fini(a1, "a1") + fini(a2, "a2")) / 2;
    /* Perturbation au second ordre, orbitales d'énergies différentes : E_liante ≈ a_bas − (b − a_bas S)²/Δ, E_antiliante ≈
       a_haut + (b − a_haut S)²/Δ, Δ = a_haut − a_bas > 0. Valable tant que |b − aS| ≪ Δ ; l'écart à interactionDeux croît comme (b/Δ)². */
    function interactionPerturbative(a1, a2, b, S) {
      S = S === undefined ? 0 : S; const lo = Math.min(a1, a2), hi = Math.max(a1, a2), D = hi - lo;
      if (!(D > 0)) err("deux énergies différentes attendues (sinon interactionDeux)");
      return { liante: lo - (b - lo * S) ** 2 / D, antiliante: hi + (b - hi * S) ** 2 / D };
    }
    /* Indice (ordre) de liaison : (électrons liants − électrons antiliants)/2. Exact : c'est une définition. */
    const ordreLiaison = (nl, na) => (fini(nl, "nl") - fini(na, "na")) / 2;
    /* Orbitales moléculaires de valence d'une molécule A₂ de la deuxième période, axe z, schéma qualitatif. Ordre : 1σg, 1σu*,
       puis 2σg sous les deux 1πu pour O, F, Ne ; au-dessus pour Li à N, où le mélange 2s–2p (écart 2s–2p de 5,7 eV pour B, 12,4 eV
       pour N, 16,5 eV pour O) remonte 2σg. Le basculement entre N et O est lu sur les spectres (N₂ : HO σ, 15,58 eV ; π à 16,70 eV). */
    const Z_PERIODE2 = { Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10 };
    function diatomique(sym, charge) {
      const Z = Z_PERIODE2[sym] || err("élément de la deuxième période attendu (Li à Ne)");
      charge = charge === undefined ? 0 : charge; entier(charge, "charge", -2, 2);
      const ne = 2 * (Z - 2) - charge;
      if (ne < 0 || ne > 16) err("nombre d'électrons de valence hors de 0 à 16");
      const s = [{ id: "1sg", liante: true, deg: 1 }, { id: "1su", liante: false, deg: 1 }];
      const sp = { id: "2sg", liante: true, deg: 1 }, pi = { id: "1pu", liante: true, deg: 2 };
      const niveaux = s.concat(Z <= 7 ? [pi, sp] : [sp, pi], [{ id: "1pg", liante: false, deg: 2 }, { id: "2su", liante: false, deg: 1 }])
        .map(o => Object.assign({}, o));
      let reste = ne;
      for (const o of niveaux) { o.e = Math.min(2 * o.deg, reste); reste -= o.e; }
      /* règle de Hund : un niveau dégénéré à moitié rempli ou moins garde ses électrons célibataires */
      const celibataires = niveaux.reduce((t, o) => t + (o.e <= o.deg ? o.e : 2 * o.deg - o.e), 0);
      const nl = niveaux.filter(o => o.liante).reduce((t, o) => t + o.e, 0), na = ne - nl;
      const ho = niveaux.filter(o => o.e > 0).pop(), bv = niveaux.find(o => o.e < 2 * o.deg);
      return { Z, ne, niveaux, nl, na, ordre: ordreLiaison(nl, na), celibataires, HO: ho ? ho.id : null, BV: bv ? bv.id : null };
    }
    /* Interaction entre la HO d'un nucléophile (eHO) et la BV d'un électrophile (eBV), couplage b (eV), deux électrons :
       stabilisation au second ordre 2b²/(eBV − eHO). Approximation des orbitales frontalières : les autres paires d'orbitales
       négligées, recouvrement négligé, valable tant que |b| ≪ eBV − eHO ; frontiereExacte la compare au calcul à deux orbitales. */
    const stabilisationFrontiere = (eHO, eBV, b) => { const D = fini(eBV, "eBV") - fini(eHO, "eHO"); if (!(D > 0)) err("eBV > eHO attendu"); return 2 * b * b / D; };
    const frontiereExacte = (eHO, eBV, b) => 2 * interactionDeux(eHO, eBV, b, 0).stabilisation;

    Object.assign(api, { RY_EV, ORBITALES_EV, hydrogenoide, configuration, zEffectif, valenceSlater, interactionDeux, wolfsbergHelmholz,
      interactionPerturbative, ordreLiaison, Z_PERIODE2, diatomique, stabilisationFrontiere, frontiereExacte });
  }

  /* ---------- étape chim-atome : atome, isotopes, configuration électronique, classification ---------- */
  {                                                       // bloc : ses noms ne gênent pas les autres sections
    /* Configurations des atomes neutres et énergies d'ionisation : lecons/tableau-periodique-quantique.js (TableauQ, Z ≤ 36),
       lu à la demande ; seules les pages qui s'en servent le chargent (chemin dans une variable : tools/charger-dependances.js
       ne l'impose pas aux autres pages du monde). */
    const node = typeof module !== "undefined" && module.exports;
    const err = m => { throw new Error("chim : " + m); };
    const FICHIER_TQ = "./lecons/tableau-periodique-quantique.js";
    const TQ = () => (node ? require(FICHIER_TQ) : root.TableauQ) || err("TableauQ absent : charger /lecons/tableau-periodique-quantique.js");
    const ZMAX = 36;
    const zOk = Z => (Number.isInteger(Z) && Z >= 1 && Z <= ZMAX ? Z : err("Z entier de 1 à " + ZMAX + " attendu"));
    const SYMBOLES = [null, "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
      "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];

    /* Isotopes : masse atomique relative A_r (masse de l'atome neutre en u) et fraction molaire x dans la nature. NIST, « Atomic
       Weights and Isotopic Compositions » (compositions de l'UICPA). intervalle : masse atomique standard de l'UICPA, un intervalle
       quand la composition varie d'un échantillon naturel à l'autre (H, C, Cl, Si), une valeur ± incertitude sinon (Cu). Les
       isotopes de fraction inférieure à 10⁻⁹ (³H, ¹⁴C) sont omis. */
    const ISOTOPES = {
      H: { Z: 1, intervalle: [1.00784, 1.00811], isotopes: [{ A: 1, masse: 1.00782503223, x: 0.999885 }, { A: 2, masse: 2.01410177812, x: 0.000115 }] },
      C: { Z: 6, intervalle: [12.0096, 12.0116], isotopes: [{ A: 12, masse: 12, x: 0.9893 }, { A: 13, masse: 13.00335483507, x: 0.0107 }] },
      Si: { Z: 14, intervalle: [28.084, 28.086], isotopes: [{ A: 28, masse: 27.97692653465, x: 0.92223 }, { A: 29, masse: 28.9764946649, x: 0.04685 }, { A: 30, masse: 29.973770136, x: 0.03092 }] },
      Cl: { Z: 17, intervalle: [35.446, 35.457], isotopes: [{ A: 35, masse: 34.968852682, x: 0.7576 }, { A: 37, masse: 36.965902602, x: 0.2424 }] },
      Cu: { Z: 29, intervalle: [63.543, 63.549], isotopes: [{ A: 63, masse: 62.92959772, x: 0.6915 }, { A: 65, masse: 64.9277897, x: 0.3085 }] },
    };
    /* Constante de masse molaire M_u = N_A u : 1,000 000 001 05 × 10⁻³ kg·mol⁻¹ (CODATA 2022). Depuis 2019, N_A est fixée et u
       mesurée : M_u n'est plus exactement 1 g·mol⁻¹, l'écart relatif est de 1 × 10⁻⁹. */
    const Mu = K.N_A * K.u;
    /* M = Σ x_i A_r,i M_u en kg·mol⁻¹. Exacte une fois la composition donnée ; les fractions doivent sommer à 1 (à 10⁻⁶ près). */
    function masseMolaire(isotopes) {
      if (!Array.isArray(isotopes) || !isotopes.length) err("au moins un isotope attendu");
      let s = 0, m = 0;
      for (const i of isotopes) { if (!(i.x >= 0) || !(i.masse > 0)) err("fraction ≥ 0 et masse > 0 attendues"); s += i.x; m += i.x * i.masse; }
      if (Math.abs(s - 1) > 1e-6) err("les fractions somment à " + s + ", 1 attendu");
      return m * Mu;
    }
    /* La composition d'un élément quand l'isotope majoritaire a la fraction f, les autres gardant leurs proportions naturelles. */
    function composition(sym, f) {
      const e = ISOTOPES[sym] || err("élément sans données isotopiques : " + sym);
      if (!(f >= 0 && f <= 1)) err("fraction entre 0 et 1 attendue");
      const iso = e.isotopes, k = iso.reduce((b, i, j) => (i.x > iso[b].x ? j : b), 0), reste = 1 - iso[k].x;
      return iso.map((i, j) => Object.assign({}, i, { x: j === k ? f : i.x * (1 - f) / reste }));
    }
    /* Défaut de masse d'un atome neutre (Z protons, A − Z neutrons, Z électrons) de masse atomique relative masse :
       defaut (u), relatif (sur la masse de l'atome), energie (J), parNucleonMeV. Exacte pour les masses données ; l'énergie de
       liaison des électrons y est comptée, mais elle est des milliers de fois plus petite que celle du noyau. */
    function defautMasse(Z, A, masse) {
      if (!(Number.isInteger(Z) && Number.isInteger(A) && A >= Z && Z >= 1)) err("Z et A entiers, A ≥ Z ≥ 1, attendus");
      const somme = (Z * (K.m_p + K.m_e) + (A - Z) * K.m_n) / K.u, defaut = somme - masse, energie = defaut * K.u * K.c * K.c;
      return { somme, defaut, relatif: defaut / masse, energie, parNucleonMeV: energie / A / (K.e * 1e6), ecartA: (masse - A) / A };
    }
    /* Rayon du noyau r = r0 A^(1/3), r0 = 1,2 fm. Approximation : noyau sphérique de densité uniforme ; r0 vaut de 1,2 à 1,5 fm
       selon la définition du rayon retenue (Blatt et Weisskopf, Theoretical Nuclear Physics, 1952) : un ordre de grandeur. */
    const R0_NOYAU = 1.2e-15;
    const rayonNoyau = A => (A >= 1 ? R0_NOYAU * Math.cbrt(A) : err("A ≥ 1 attendu"));
    /* n = m/M, N = n N_A. Exactes : définitions ; m en kg, M en kg·mol⁻¹. */
    function quantiteMatiere(m, M) {
      if (!(m >= 0) || !(M > 0)) err("m ≥ 0 et M > 0 attendus");
      const n = m / M; return { n, N: n * K.N_A };
    }

    /* Configurations. Une sous-couche : { n, l, occ }. Ordre de Klechkowski : n + l croissant, puis n croissant. */
    const ORDRE = [];
    for (let s = 1; s <= 8; s++) for (let n = 1; n <= s; n++) { const l = s - n; if (l < n && l <= 3) ORDRE.push([n, l]); }
    const places = l => 2 * (2 * l + 1);
    /* Remplissage de N électrons dans l'ordre de Klechkowski, sans exception : la règle seule. */
    function klechkowski(N) {
      if (!(Number.isInteger(N) && N >= 0 && N <= 118)) err("nombre d'électrons entier de 0 à 118 attendu");
      const out = []; let reste = N;
      for (const [n, l] of ORDRE) { if (!reste) break; const occ = Math.min(places(l), reste); out.push({ n, l, occ }); reste -= occ; }
      return out;
    }
    /* Atome neutre dans son état fondamental (TableauQ : Klechkowski corrigé de Cr et Cu, les deux exceptions de Z ≤ 36). */
    const configurationAtome = Z => TQ().configuration(zOk(Z)).map(s => ({ n: s.n, l: s.l, occ: s.occ }));
    const EXCEPTIONS = [24, 29];
    /* Ion monoatomique de charge q (en e). Cation : les électrons partent de la sous-couche de plus grand n, à n égal de plus
       grand l (4s avant 3d) ; c'est l'ordre observé pour les cations des 36 premiers éléments, qui n'est pas l'ordre inverse
       du remplissage. Anion : électrons ajoutés dans l'ordre de Klechkowski, pour les blocs s et p seulement (|q| ≤ 3). */
    function configurationIon(Z, q) {
      zOk(Z); if (!Number.isInteger(q) || q > Z || q < -3) err("charge entière, au plus Z, au moins \u22123, attendue");
      const c = configurationAtome(Z);
      if (q < 0) { if (bloc(Z) === "d") err("anion d'un élément du bloc d : hors du modèle"); return klechkowski(Z - q); }
      for (let k = 0; k < q; k++) {
        const s = c.reduce((b, x) => (x.n > b.n || (x.n === b.n && x.l > b.l) ? x : b));
        s.occ -= 1; if (!s.occ) c.splice(c.indexOf(s), 1);
      }
      return c.sort((a, b) => a.n + a.l - (b.n + b.l) || a.n - b.n);
    }
    /* Électrons non appariés (règle de Hund : une sous-couche se remplit d'abord à raison d'un électron par case). */
    const celibataires = c => c.reduce((t, s) => { const m = 2 * s.l + 1; return t + (s.occ <= m ? s.occ : 2 * m - s.occ); }, 0);
    /* Position : période = plus grand n occupé ; bloc = l de la dernière sous-couche remplie par Klechkowski (l'hélium, 1s², est
       placé en colonne 18 avec les gaz nobles) ; colonne de 1 à 18. Électrons de valence : ceux du plus grand n, plus ceux de la
       sous-couche (n − 1)d pour un élément du bloc d ; leur nombre est le numéro de colonne (blocs s et d) ou ce numéro moins 10
       (bloc p). */
    const bloc = Z => "spdf"[klechkowski(zOk(Z)).slice(-1)[0].l];
    function position(Z) {
      const c = configurationAtome(zOk(Z)), nmax = Math.max(...c.map(s => s.n)), b = bloc(Z);
      const ext = c.filter(s => s.n === nmax).reduce((t, s) => t + s.occ, 0), d = b === "d" ? c.filter(s => s.n === nmax - 1 && s.l === 2).reduce((t, s) => t + s.occ, 0) : 0;
      const valence = ext + d, colonne = Z === 2 ? 18 : b === "p" ? valence + 10 : valence;
      return { periode: nmax, bloc: b, colonne, valence };
    }
    /* Familles du programme et caractère métallique. Non-métaux de Z ≤ 36 : H, C, N, O, P, S, Se, les halogènes et les gaz nobles ;
       B, Si, Ge, As sont rangés à part (semi-métaux : la frontière est une convention, ils conduisent mal et forment des
       oxydes amphotères ou acides) ; le reste est métallique. */
    const NON_METAUX = new Set([1, 6, 7, 8, 15, 16, 34]), SEMI_METAUX = new Set([5, 14, 32, 33]);
    function famille(Z) {
      const p = position(zOk(Z));
      if (Z === 1) return "hydrogene";
      if (p.colonne === 1) return "alcalin";
      if (p.colonne === 2) return "alcalinoTerreux";
      if (p.colonne === 17) return "halogene";
      if (p.colonne === 18) return "gazNoble";
      return null;
    }
    const caractere = Z => { const f = famille(zOk(Z));
      return NON_METAUX.has(Z) || f === "halogene" || f === "gazNoble" ? "nonMetal" : SEMI_METAUX.has(Z) ? "semiMetal" : "metal"; };
    /* Ion monoatomique usuel des blocs s et p : la charge qui donne la configuration du gaz noble le plus proche ; null quand
       l'élément n'en forme pas en solution ni dans les cristaux ioniques courants (B, C, Si, Ge, As, gaz nobles). H : H⁺ (H⁻ existe
       dans les hydrures salins). */
    const SANS_ION = new Set([2, 5, 6, 10, 14, 18, 32, 33, 36]);
    function ionUsuel(Z) {
      const p = position(zOk(Z));
      if (p.bloc === "d" || SANS_ION.has(Z)) return null;
      const v = p.valence;
      return v <= 3 ? v : v - 8;
    }

    /* Règles de Slater (Phys. Rev. 36, 57, 1930) : charge effective Z* = Z − σ vue par un électron de la sous-couche (n, l), dans
       la configuration c. Groupes (1s)(2s,2p)(3s,3p)(3d)(4s,4p)(4d)… ; pour s ou p : 0,35 par autre électron du groupe (0,30 en 1s),
       0,85 par électron de nombre n − 1, 1 au-dessous ; pour d : 0,35 dans le groupe, 1 pour tout groupe à gauche.
       Approximation : écrantage moyen à constantes ajustées ; nombre quantique effectif n* = 1, 2, 3, 3,7, 4, 4,2. */
    const NSTAR = [0, 1, 2, 3, 3.7, 4.0, 4.2];
    const groupe = s => (s.l <= 1 ? [s.n, 0] : [s.n, s.l - 1]);
    const avant = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);   // ordre des groupes de Slater
    function slater(Z, n, l, c) {
      c = c || configurationAtome(zOk(Z));
      const cible = c.find(s => s.n === n && s.l === l) || err("sous-couche " + n + "spdf"[l] + " vide");
      const g = groupe(cible); let sigma = 0;
      for (const s of c) {
        const h = groupe(s), meme = h[0] === g[0] && h[1] === g[1], k = s === cible ? s.occ - 1 : s.occ;
        if (meme) sigma += k * (n === 1 ? 0.30 : 0.35);
        else if (l <= 1) { if (s.n === n - 1) sigma += 0.85 * k; else if (s.n < n - 1) sigma += k; }
        else if (avant(h, g)) sigma += k;
      }
      return { zEff: Z - sigma, sigma, nEff: NSTAR[n] };
    }
    /* L'électron de valence le moins lié : plus grand n, à n égal plus grand l. */
    const externe = Z => configurationAtome(zOk(Z)).reduce((b, s) => (s.n > b.n || (s.n === b.n && s.l > b.l) ? s : b));
    /* Rayon de l'orbitale de Slater, maximum de densité radiale : n*² a0 / Z*. Approximation : ordre de grandeur et tendances,
       pas un rayon mesuré. */
    function rayonSlater(Z) { const s = externe(Z), x = slater(Z, s.n, s.l); return x.nEff * x.nEff * K.a0 / x.zEff; }

    /* Électronégativité de Pauling, valeurs révisées par A. L. Allred (J. Inorg. Nucl. Chem. 17, 215, 1961), telles que les
       reprend le CRC Handbook ; null pour He, Ne, Ar (aucun composé pour fixer la valeur). */
    const CHI_PAULING = [null, 2.20, null, 0.98, 1.57, 2.04, 2.55, 3.04, 3.44, 3.98, null, 0.93, 1.31, 1.61, 1.90, 2.19, 2.58, 3.16,
      null, 0.82, 1.00, 1.36, 1.54, 1.63, 1.66, 1.55, 1.83, 1.88, 1.91, 1.90, 1.65, 1.81, 2.01, 2.18, 2.55, 2.96, 3.00];
    /* Rayons de covalence en m : B. Cordero et al., Dalton Trans. 2008, 2832 (analyse statistique des distances de la Cambridge
       Structural Database). Carbone sp³ ; Mn, Fe, Co : valeurs bas spin. Gaz nobles : distances de quelques composés ou de
       contacts, à lire avec prudence. */
    const RAYON_COVALENT = [null, 31, 28, 128, 96, 84, 76, 71, 66, 57, 58, 166, 141, 121, 111, 107, 105, 102, 106, 203, 176, 170,
      160, 153, 139, 139, 132, 126, 124, 132, 122, 122, 120, 119, 120, 120, 116].map(r => (r === null ? null : r * 1e-12));
    /* Énergie d'ionisation en J (TableauQ, NIST). */
    const ionisation = Z => TQ().IONISATION_EV[zOk(Z)] * K.e;
    Object.assign(api, { ZMAX_ATOME: ZMAX, SYMBOLES, ISOTOPES, Mu, masseMolaire, composition, defautMasse, R0_NOYAU, rayonNoyau, quantiteMatiere,
      ORDRE_KLECHKOWSKI: ORDRE, klechkowski, configurationAtome, EXCEPTIONS_KLECHKOWSKI: EXCEPTIONS, configurationIon, celibataires, bloc, position, famille, caractere,
      ionUsuel, NSTAR, slater, externe, rayonSlater, CHI_PAULING, RAYON_COVALENT, ionisation });
  }

  /* ---------- étape chim-molecules : Lewis, VSEPR, interactions entre entités, solvants ---------- */
  {                                                       // bloc : ses noms (err, pos…) ne gênent pas les autres sections
    const err = m => { throw new Error("chim : " + m); };
    const pos = (v, nom) => { if (!(v > 0) || !Number.isFinite(v)) err(nom + " > 0 attendu"); return v; };
    const DEBYE = 1e-21 / K.c;                            // C·m, exact : 10⁻²¹/c (3,335 64 × 10⁻³⁰ C·m)
    const EV = K.e, ANG3 = 1e-30;                         // J par eV ; m³ par Å³
    const QPE = 4 * Math.PI * K.eps0;

    /* Symbole → Z, électrons de valence et électronégativité : la section de l'étape « L'atome et la classification périodique »
       (SYMBOLES, position, CHI_PAULING), Z ≤ 36. Électrons de valence d'un élément des blocs s et p : la colonne (1, 2), ou la
       colonne moins 10 (13 à 18). Exacte dans le modèle de Lewis : la sous-couche 3d remplie de Br ne compte pas. */
    const numero = s => { const Z = api.SYMBOLES.indexOf(s); if (!(Z > 0)) err("élément inconnu « " + s + " »"); return Z; };
    function electronsValence(s) {
      const p = api.position(numero(s));
      if (p.bloc !== "s" && p.bloc !== "p") err(s + " : étude limitée aux blocs s et p"); return p.valence;
    }
    const chi = s => { const x = api.CHI_PAULING[numero(s)]; if (x == null) err(s + " : pas d'électronégativité de Pauling"); return x; };
    /* Électrons et doublets d'une entité de formule { élément: nombre } et de charge z : N = Σ v − z, N/2 doublets.
       Exacte : un décompte. Un nombre impair d'électrons signale un radical (NO, NO₂). */
    function doubletsLewis(formule, z) {
      let n = 0; for (const [s, k] of Object.entries(formule)) n += electronsValence(s) * k;
      n -= z || 0; if (n < 0) err("charge plus grande que le nombre d'électrons de valence");
      return { electrons: n, doublets: Math.floor(n / 2), radical: n % 2 === 1 };
    }
    /* Une structure de Lewis : { charge, atomes: [{ el, x, y, libres }], liaisons: [[i, j, ordre]] } ; libres = doublets non liants.
       Charge formelle d'un atome : v − 2·libres − Σ ordres. Électrons autour : 2·libres + 2·Σ ordres (octet : 8 ; duet : 2 pour H).
       lacunes : doublets qui manquent pour l'octet (B dans BF₃ : une lacune). coherent : électrons dessinés = électrons comptés,
       et aucun atome au-delà de l'octet (période 2). Exacte : des définitions ; la règle de l'octet, elle, est un modèle. */
    function bilanLewis(s) {
      const n = s.atomes.length, somme = new Array(n).fill(0);
      for (const [i, j, o] of s.liaisons) {
        if (!(i >= 0 && i < n && j >= 0 && j < n && i !== j)) err("liaison entre atomes inconnus");
        if (![1, 2, 3].includes(o)) err("ordre de liaison 1, 2 ou 3 attendu");
        somme[i] += o; somme[j] += o;
      }
      const atomes = s.atomes.map((a, i) => {
        const v = electronsValence(a.el), autour = 2 * (a.libres || 0) + 2 * somme[i];
        const cible = a.el === "H" ? 2 : 8;
        return { el: a.el, charge: v - 2 * (a.libres || 0) - somme[i], autour, cible, lacunes: Math.max(0, (cible - autour) / 2) };
      });
      const formule = {}; s.atomes.forEach(a => formule[a.el] = (formule[a.el] || 0) + 1);
      const dessines = 2 * (s.atomes.reduce((t, a) => t + (a.libres || 0), 0) + s.liaisons.reduce((t, l) => t + l[2], 0));
      const attendus = doubletsLewis(formule, s.charge || 0).electrons;
      return { atomes, dessines, attendus, chargeTotale: atomes.reduce((t, a) => t + a.charge, 0),
        coherent: dessines === attendus && atomes.every(a => a.autour <= a.cible) };
    }
    /* Les entités dessinées par la leçon « Schémas de Lewis et mésomérie » : squelette commun (x, y dans le sens de l'écran,
       longueur de liaison ~1), puis une ou plusieurs formes { libres: doublets non liants de chaque atome, liaisons }.
       formeLewis(id, k) rend la k-ième forme au format de bilanLewis. */
    const hexa = (r, k) => [r * Math.cos(Math.PI / 6 + k * Math.PI / 3), r * Math.sin(Math.PI / 6 + k * Math.PI / 3)];
    const LEWIS = {
      h2o: { charge: 0, atomes: [["O", 0, 0], ["H", -0.8, 0.6], ["H", 0.8, 0.6]], formes: [{ libres: [2, 0, 0], liaisons: [[0, 1, 1], [0, 2, 1]] }] },
      nh3: { charge: 0, atomes: [["N", 0, 0], ["H", -1, 0.35], ["H", 1, 0.35], ["H", 0, 1]], formes: [{ libres: [1, 0, 0, 0], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] }] },
      ch4: { charge: 0, atomes: [["C", 0, 0], ["H", 1, 0], ["H", -1, 0], ["H", 0, 1], ["H", 0, -1]], formes: [{ libres: [0, 0, 0, 0, 0], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] }] },
      co2: { charge: 0, atomes: [["O", -1.2, 0], ["C", 0, 0], ["O", 1.2, 0]], formes: [{ libres: [2, 0, 2], liaisons: [[0, 1, 2], [1, 2, 2]] }] },
      hcn: { charge: 0, atomes: [["H", -1.1, 0], ["C", 0, 0], ["N", 1.2, 0]], formes: [{ libres: [0, 0, 1], liaisons: [[0, 1, 1], [1, 2, 3]] }] },
      co: { charge: 0, atomes: [["C", -0.6, 0], ["O", 0.6, 0]], formes: [{ libres: [1, 1], liaisons: [[0, 1, 3]] }] },
      nh4: { charge: 1, atomes: [["N", 0, 0], ["H", 1, 0], ["H", -1, 0], ["H", 0, 1], ["H", 0, -1]], formes: [{ libres: [0, 0, 0, 0, 0], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] }] },
      h3o: { charge: 1, atomes: [["O", 0, 0], ["H", -1, 0.35], ["H", 1, 0.35], ["H", 0, 1]], formes: [{ libres: [1, 0, 0, 0], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] }] },
      bf3: { charge: 0, atomes: [["B", 0, 0], ["F", 0, -1.1], ["F", 0.95, 0.55], ["F", -0.95, 0.55]], formes: [{ libres: [0, 3, 3, 3], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] }] },
      o3: { charge: 0, atomes: [["O", -1, 0.55], ["O", 0, 0], ["O", 1, 0.55]], formes: [
        { libres: [2, 1, 3], liaisons: [[0, 1, 2], [1, 2, 1]] }, { libres: [3, 1, 2], liaisons: [[0, 1, 1], [1, 2, 2]] }] },
      co3: { charge: -2, atomes: [["C", 0, 0], ["O", 0, -1.2], ["O", 1.04, 0.6], ["O", -1.04, 0.6]], formes: [
        { libres: [0, 2, 3, 3], liaisons: [[0, 1, 2], [0, 2, 1], [0, 3, 1]] }, { libres: [0, 3, 2, 3], liaisons: [[0, 1, 1], [0, 2, 2], [0, 3, 1]] },
        { libres: [0, 3, 3, 2], liaisons: [[0, 1, 1], [0, 2, 1], [0, 3, 2]] }] },
      ethanoate: { charge: -1, atomes: [["C", -1.2, 0], ["C", 0, 0], ["O", 0.7, -0.95], ["O", 0.7, 0.95], ["H", -2.2, 0], ["H", -1.2, -1], ["H", -1.2, 1]], formes: [
        { libres: [0, 0, 2, 3, 0, 0, 0], liaisons: [[0, 1, 1], [1, 2, 2], [1, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1]] },
        { libres: [0, 0, 3, 2, 0, 0, 0], liaisons: [[0, 1, 1], [1, 2, 1], [1, 3, 2], [0, 4, 1], [0, 5, 1], [0, 6, 1]] }] },
      benzene: { charge: 0, atomes: [0, 1, 2, 3, 4, 5].map(k => ["C", ...hexa(1, k)]).concat([0, 1, 2, 3, 4, 5].map(k => ["H", ...hexa(1.9, k)])), formes: [0, 1].map(d => ({
        libres: new Array(12).fill(0), liaisons: [0, 1, 2, 3, 4, 5].map(k => [k, (k + 1) % 6, (k + d) % 2 ? 1 : 2]).concat([0, 1, 2, 3, 4, 5].map(k => [k, k + 6, 1])) })) },
    };
    function formeLewis(id, k) {
      const e = LEWIS[id] || err("entité de Lewis inconnue « " + id + " »"), f = e.formes[k || 0] || err("forme " + k + " absente");
      return { charge: e.charge, atomes: e.atomes.map(([el, x, y], i) => ({ el, x, y, libres: f.libres[i] })), liaisons: f.liaisons };
    }
    /* Ordre moyen de chaque liaison sur des formes mésomères de même squelette, à poids égaux : { "i-j": ordre }.
       Approximation : formes équivalentes de même poids ; des formes inégales (charges séparées) pèsent moins. */
    function ordresMoyens(formes) {
      if (!formes.length) err("au moins une forme");
      const cle = (i, j) => Math.min(i, j) + "-" + Math.max(i, j), out = {};
      formes.forEach(f => f.liaisons.forEach(([i, j, o]) => out[cle(i, j)] = (out[cle(i, j)] || 0) + o / formes.length));
      return out;
    }
    /* Angles (rad, sens de l'écran) où dessiner k doublets non liants (ou lacunes) autour d'un atome dont les liaisons partent
       dans les directions données : parmi 24 directions (pas de 15°), les k qui maximisent le plus petit écart angulaire entre
       tous les traits (liaisons et doublets), puis la somme des écarts. k ≤ 4. Un choix de dessin, pas une géométrie : la
       géométrie est celle de vsepr(). */
    function anglesLibres(directions, k) {
      if (!Number.isInteger(k) || k < 0 || k > 4) err("0 à 4 doublets par atome");
      if (!k) return [];
      const C = Array.from({ length: 24 }, (_, i) => -Math.PI / 2 + i * Math.PI / 12);
      const ecart = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
      let best = null, bmin = -1, bsum = -1;
      const essai = choix => {
        const all = directions.concat(choix); let m = Infinity, sum = 0;
        for (let u = 0; u < all.length; u++) for (let v = u + 1; v < all.length; v++) { const e = ecart(all[u], all[v]); m = Math.min(m, e); sum += Math.min(e, Math.PI / 2); }
        if (m > bmin + 1e-9 || (m > bmin - 1e-9 && sum > bsum + 1e-9)) { bmin = m; bsum = sum; best = choix.slice(); }
      };
      const rec = (start, choix) => { if (choix.length === k) return essai(choix);
        for (let i = start; i < C.length; i++) { choix.push(C[i]); rec(i + 1, choix); choix.pop(); } };
      rec(0, []);
      return best;
    }
    /* Modèle VSEPR, AXpEq avec p ≥ 1 et p + q = 2, 3 ou 4 (le programme de PCSI). Directions unitaires des p liaisons, puis
       des q doublets libres, autour de A : droite, triangle équilatéral, tétraèdre régulier. angle : l'angle X–A–X idéal (°).
       Approximation : doublets de même encombrement ; un doublet libre, plus encombrant, ferme les angles (NH₃ 106,7°, H₂O 104,5°). */
    const U3 = 1 / Math.sqrt(3);
    const FIGURES = {
      2: { figure: "droite", angle: 180, d: [[1, 0, 0], [-1, 0, 0]] },
      3: { figure: "triangle", angle: 120, d: [[1, 0, 0], [-0.5, Math.sqrt(3) / 2, 0], [-0.5, -Math.sqrt(3) / 2, 0]] },
      4: { figure: "tetraedre", angle: Math.acos(-1 / 3) * 180 / Math.PI, d: [[U3, U3, U3], [U3, -U3, -U3], [-U3, U3, -U3], [-U3, -U3, U3]] },
    };
    const FORMES = { "2,0": "lineaire", "3,0": "triangulaire", "2,1": "coudee", "1,2": "lineaire", "4,0": "tetraedrique",
      "3,1": "pyramidale", "2,2": "coudee", "1,3": "lineaire" };
    function vsepr(p, q) {
      q = q || 0;
      if (!Number.isInteger(p) || !Number.isInteger(q) || p < 1 || q < 0 || !FIGURES[p + q]) err("AXpEq avec p ≥ 1 et p + q = 2, 3 ou 4 attendu");
      const f = FIGURES[p + q];
      return { code: "AX" + p + (q ? "E" + q : ""), figure: f.figure, forme: FORMES[p + "," + q], angle: p >= 2 ? f.angle : null,
        directions: f.d.slice(0, p), doublets: f.d.slice(p) };
    }
    /* Moment dipolaire d'une molécule AXp... : somme vectorielle de moments de liaison. ligands : symboles des X dans l'ordre
       des directions de vsepr(). Chaque moment de liaison est pris égal à (χ_A − χ_X) fois la direction A→X : il va du pôle −
       vers le pôle +, la convention des physiciens et du programme. Unité arbitraire (« Δχ »).
       Approximation : moment de liaison proportionnel à Δχ, sans les doublets libres ni la polarisation mutuelle ; le sens
       et la nullité (par symétrie) sont sûrs, la norme ne l'est pas (NH₃ et NF₃ ont des moments très différents). */
    function momentMolecule(centre, ligands, q) {
      const g = vsepr(ligands.length, q), cA = chi(centre), v = [0, 0, 0];
      ligands.forEach((x, i) => { const w = cA - chi(x); for (let k = 0; k < 3; k++) v[k] += w * g.directions[i][k]; });
      const n = Math.hypot(...v);
      return { vecteur: v, norme: n < 1e-12 ? 0 : n, polaire: n >= 1e-12 };
    }
    /* Molécule coudée AX₂ symétrique : μ = 2 μ_liaison cos(θ/2) ; momentLiaison(μ, θ) l'inverse. θ en degrés.
       Approximation : deux moments de liaison qui s'ajoutent comme des vecteurs, sans contribution des doublets libres. */
    const momentCoude = (muL, theta) => 2 * muL * Math.cos(theta * Math.PI / 360);
    const momentLiaison = (mu, theta) => { const c = Math.cos(theta * Math.PI / 360); if (!(c > 1e-12)) err("angle < 180° attendu"); return mu / (2 * c); };

    /* Longueurs de liaison mesurées (pm), molécules gazeuses : NIST CCCBDB (Herzberg 1966 ; O₂ Huber et Herzberg 1979 ;
       H₂O₂ Redington et al. 1962). */
    const LONGUEURS = { benzene: 139.7, ethane: 153.6, ethene: 133.9, ozone: 127.8, peroxyde: 147.5, dioxygene: 120.75 };

    /* Interactions de van der Waals entre deux molécules neutres, éloignées (r ≫ taille), en phase gazeuse : énergie libre
       moyenne −C/r⁶ et ses trois parts (coefficients C en J·m⁶). m = { mu (D), alpha (volume de polarisabilité, Å³), I (eV) }.
       Keesom (orientation, moyenne de Boltzmann) : μ₁²μ₂² / (3 (4πε₀)² k_B T) ; Debye (induction) : (μ₁² α′₂ + μ₂² α′₁)/(4πε₀) ;
       London (dispersion) : (3/2) α′₁ α′₂ I₁ I₂ / (I₁ + I₂).
       Approximation : dipôles ponctuels ; Keesom suppose |U| ≪ k_B T (faux au contact pour H₂O) ; London prend l'énergie
       d'ionisation pour la fréquence caractéristique (à un facteur ~ 1,5 près). L'énergie moyenne de Keesom vaut le double
       de cette énergie libre. */
    function coefficientsVdW(m1, m2, T) {
      pos(T, "T");
      const mu1 = (m1.mu || 0) * DEBYE, mu2 = (m2.mu || 0) * DEBYE, a1 = pos(m1.alpha, "alpha") * ANG3, a2 = pos(m2.alpha, "alpha") * ANG3;
      const I1 = pos(m1.I, "I") * EV, I2 = pos(m2.I, "I") * EV;
      const keesom = mu1 * mu1 * mu2 * mu2 / (3 * QPE * QPE * K.k_B * T), debye = (mu1 * mu1 * a2 + mu2 * mu2 * a1) / QPE;
      const london = 1.5 * a1 * a2 * I1 * I2 / (I1 + I2), total = keesom + debye + london;
      return { keesom, debye, london, total };
    }
    /* Données des molécules : μ (D, CCCBDB et NIST, base de données des diatomiques pour HCl), α′ (Å³, CCCBDB, Olney et al. 1997),
       I (eV, NIST WebBook). */
    const MOLECULES_VDW = {
      ar: { mu: 0, alpha: 1.664, I: 15.759 }, ch4: { mu: 0, alpha: 2.448, I: 12.61 }, hcl: { mu: 1.1086, alpha: 2.515, I: 12.744 },
      hi: { mu: 0.448, alpha: 5.453, I: 10.386 }, nh3: { mu: 1.47, alpha: 2.103, I: 10.070 }, h2o: { mu: 1.855, alpha: 1.501, I: 12.621 },
    };
    /* Températures d'ébullition sous 1 atm (K) des hydrures des colonnes 14 à 17, périodes 2 à 5 : NIST WebBook, CRC (via PubChem),
       Wikipédia pour SiH₄, SnH₄, H₂Te, HBr ; HI : 237,8 K à 0,3 K près selon la source. */
    const EBULLITION_HYDRURES = {
      14: [["CH4", 111.66], ["SiH4", 161.25], ["GeH4", 185.05], ["SnH4", 221]],
      15: [["NH3", 239.81], ["PH3", 185.45], ["AsH3", 210.65], ["SbH3", 256.15]],
      16: [["H2O", 373.12], ["H2S", 212.87], ["H2Se", 231.90], ["H2Te", 270.95]],
      17: [["HF", 292.7], ["HCl", 188.10], ["HBr", 206.35], ["HI", 237.8]],
    };

    /* Solvants moléculaires : μ (D, gaz, CCCBDB), εr (liquide, à la température T en K : tables Burdick & Jackson), protique
       (protogène : donne des liaisons hydrogène par un H lié à O ou N). */
    const SOLVANTS = [
      { id: "eau", mu: 1.855, epsr: 78.4, T: 298.15, protique: true },
      { id: "methanol", mu: 1.67, epsr: 32.7, T: 298.15, protique: true },
      { id: "ethanol", mu: 1.68, epsr: 24.55, T: 298.15, protique: true },
      { id: "dmso", mu: 3.96, epsr: 46.7, T: 293.15, protique: false },
      { id: "acetonitrile", mu: 3.92, epsr: 37.5, T: 293.15, protique: false },
      { id: "propanone", mu: 2.88, epsr: 20.7, T: 298.15, protique: false },
      { id: "dichloromethane", mu: 1.62, epsr: 8.93, T: 298.15, protique: false },
      { id: "ethoxyethane", mu: 1.15, epsr: 4.33, T: 293.15, protique: false },
      { id: "toluene", mu: 0.33, epsr: 2.38, T: 298.15, protique: false },
      { id: "cyclohexane", mu: 0, epsr: 2.02, T: 293.15, protique: false },
      { id: "hexane", mu: 0, epsr: 1.88, T: 298.15, protique: false },
    ];
    /* Énergie d'une paire d'ions z₁e, z₂e à la distance r (m) dans un milieu continu de permittivité relative εr :
       z₁z₂e²/(4πε₀εr r) (J). Longueur de Bjerrum : la distance où |U| = k_B T entre deux charges élémentaires.
       Approximation : solvant continu ; faux à moins de quelques diamètres moléculaires de l'ion (vers 0,3 nm), où les
       molécules de solvant se voient une à une et où l'εr efficace chute. */
    const energiePaire = (z1, z2, r, epsr) => z1 * z2 * K.e * K.e / (QPE * pos(epsr, "epsr") * pos(r, "r"));
    const longueurBjerrum = (epsr, T) => K.e * K.e / (QPE * pos(epsr, "epsr") * K.k_B * pos(T, "T"));
    /* Extraction d'un soluté d'une phase aqueuse (V_aq) par un volume total V_org de solvant, en n fois égales :
       fraction restée dans l'eau ( 1 + K V_org/(n V_aq) )⁻ⁿ, K = c_org/c_aq la constante de partage.
       Approximation : K constant (solutions diluées, pas d'association ni de réaction), équilibre atteint à chaque fois,
       solvants non miscibles. */
    function fractionRestante(Kp, Vorg, Vaq, n) {
      pos(Kp, "K"); pos(Vorg, "V_org"); pos(Vaq, "V_aq");
      if (!Number.isInteger(n) || n < 1) err("nombre d'extractions entier ≥ 1 attendu");
      return Math.pow(1 + Kp * Vorg / (n * Vaq), -n);
    }
    /* log P = log₁₀(c_octanol / c_eau) à l'équilibre de partage. Exacte : une définition. */
    const logP = (cOct, cEau) => Math.log10(pos(cOct, "c_oct") / pos(cEau, "c_eau"));

    Object.assign(api, { DEBYE, electronsValence, doubletsLewis, bilanLewis, LEWIS, formeLewis, ordresMoyens, anglesLibres, vsepr,
      momentMolecule, momentCoude, momentLiaison, LONGUEURS, coefficientsVdW, MOLECULES_VDW, EBULLITION_HYDRURES, SOLVANTS,
      energiePaire, longueurBjerrum, fractionRestante, logP });
  }

  /* ---------- étape chim-types-cristaux : types de cristaux, rayons ioniques, énergie réticulaire ---------- */
  {
    /* Longueurs en m, énergies en J·mol⁻¹ (par mole d'unités formulaires), températures en K. Les ions sont des sphères ou des
       charges ponctuelles : c'est le modèle ionique, dont chaque fonction dit ce qu'il néglige. Proba.erfc (lecons/probabilites.js,
       erreur relative < 1,2 × 10⁻⁷) est lue à la demande par madelung : les pages qui s'en servent chargent probabilites.js. */
    const node = typeof module !== "undefined" && module.exports;
    const err = m => { throw new Error("chim : " + m); };
    const pos = (v, nom) => { if (!(v > 0) || !Number.isFinite(v)) err(nom + " > 0 attendu"); return v; };
    const PROBA = () => (node ? require("./lecons/probabilites.js") : root.Proba) || err("Proba absent : charger /lecons/probabilites.js");
    const PM = 1e-12;
    const KC = K.N_A * K.e * K.e / (4 * Math.PI * K.eps0);      // N_A e²/(4π ε0) = 1,389 × 10⁻⁴ J·m·mol⁻¹
    const EV_MOL = K.e * K.N_A;                                 // 1 eV par entité = 96 485 J·mol⁻¹ (exact depuis 2019)

    /* Rayons ioniques effectifs (Shannon, Acta Cryst. A32, 751, 1976, table 1), en m, par coordinence. Ils reposent sur
       r(O²⁻, VI) = 140 pm : une convention, pas une mesure ; seules les sommes r⁺ + r⁻ se comparent aux distances. */
    const RAYONS = Object.freeze(Object.fromEntries(Object.entries({
      "Li+": [1, { 4: 59, 6: 76 }], "Na+": [1, { 6: 102, 8: 118 }], "K+": [1, { 6: 138 }], "Cs+": [1, { 6: 167, 8: 174 }],
      "Mg2+": [2, { 6: 72 }], "Ca2+": [2, { 6: 100, 8: 112 }], "Zn2+": [2, { 4: 60, 6: 74 }],
      "F-": [-1, { 4: 131, 6: 133 }], "Cl-": [-1, { 6: 181 }], "Br-": [-1, { 6: 196 }], "I-": [-1, { 6: 220 }],
      "O2-": [-2, { 4: 138, 6: 140 }], "S2-": [-2, { 6: 184 }],
    }).map(([id, [z, r]]) => [id, Object.freeze({ z, r: Object.freeze(Object.fromEntries(Object.entries(r).map(([cn, v]) => [cn, v * PM]))) })])));
    /* le rayon d'un ion à une coordinence ; à défaut, celui de la coordinence tabulée la plus proche (proche : true) */
    function rayon(ion, cn) {
      const x = RAYONS[ion] || err("ion inconnu : « " + ion + " »");
      if (x.r[cn]) return { r: x.r[cn], cn, proche: false };
      const c = Object.keys(x.r).map(Number).sort((p, q) => Math.abs(p - cn) - Math.abs(q - cn) || q - p)[0];
      return { r: x.r[c], cn: c, proche: true };
    }

    /* Quatre structures ioniques cubiques, mailles conventionnelles. a : NBS Circular 539 (Swanson et coll., 1953–1955), vers
       298 K. Motif en coordonnées réduites, charge q en e. Même forme que Cristaux.STRUCTURES (lecons/cristaux.js) : atomes()
       et voisins() de Cristaux s'en servent tels quels. */
    const CFC = [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]];
    const dec = (f, d) => f.map((x, i) => (x + d[i]) % 1);
    const site = (e, q, fs) => fs.map(f => ({ e, q, f }));
    const STRUCTURES_IONIQUES = Object.freeze({
      NaCl: { reseau: "cfc", a: 564.02 * PM, formule: 4, cation: "Na+", anion: "Cl-", coord: [6, 6],
        motif: site("Na", 1, CFC).concat(site("Cl", -1, CFC.map(f => dec(f, [0.5, 0, 0])))) },
      CsCl: { reseau: "cp", a: 412.3 * PM, formule: 1, cation: "Cs+", anion: "Cl-", coord: [8, 8],
        motif: [{ e: "Cs", q: 1, f: [0, 0, 0] }, { e: "Cl", q: -1, f: [0.5, 0.5, 0.5] }] },
      CaF2: { reseau: "cfc", a: 546.26 * PM, formule: 4, cation: "Ca2+", anion: "F-", coord: [8, 4],
        motif: site("Ca", 2, CFC).concat(site("F", -1, CFC.map(f => dec(f, [0.25, 0.25, 0.25]))), site("F", -1, CFC.map(f => dec(f, [0.75, 0.75, 0.75])))) },
      ZnS: { reseau: "cfc", a: 540.60 * PM, formule: 4, cation: "Zn2+", anion: "S2-", coord: [4, 4],
        motif: site("Zn", 2, CFC).concat(site("S", -2, CFC.map(f => dec(f, [0.25, 0.25, 0.25])))) },
    });
    /* Arêtes de maille de sels de structure NaCl (NBS Circular 539, vers 298 K ; MgO : Straumanis et Ievins 1936) : d = a/2. */
    const A_SEL_GEMME = Object.freeze({ LiF: 402.69 * PM, NaCl: 564.02 * PM, NaBr: 597.72 * PM, KCl: 629.31 * PM, KBr: 660.00 * PM, MgO: 421.15 * PM });
    const structure = id => STRUCTURES_IONIQUES[id] || err("structure inconnue : « " + id + " » (NaCl, CsCl, CaF2, ZnS)");
    /* plus courte distance cation–anion, en fraction de a, cherchée dans le motif et ses 26 voisins */
    function dReduite(s) {
      let d = Infinity;
      s.motif.forEach(m => { if (m.q <= 0) return; s.motif.forEach(n => { if (n.q >= 0) return;
        for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++)
          d = Math.min(d, Math.hypot(n.f[0] + i - m.f[0], n.f[1] + j - m.f[1], n.f[2] + k - m.f[2])); }); });
      return d;
    }
    const distanceIons = id => dReduite(structure(id)) * structure(id).a;
    /* Somme r⁺ + r⁻ des rayons de Shannon (à la coordinence de chaque ion dans la structure) contre la distance mesurée. */
    function additivite(id) {
      const s = structure(id), rp = rayon(s.cation, s.coord[0]), rm = rayon(s.anion, s.coord[1]), d = distanceIons(id);
      return { d, somme: rp.r + rm.r, ecart: (rp.r + rm.r) / d - 1, cation: rp, anion: rm };
    }

    /* Énergie électrostatique d'une maille cubique d'arête 1, charges ponctuelles q_i aux positions réduites f_i, entourée de ses
       copies : sommation d'Ewald (1921), en unités e²/(4π ε0 a). Exacte pour le réseau infini et neutre (somme conditionnellement
       convergente, prise ici sans dipôle de surface) ; erreur numérique ≈ 10⁻⁷, celle de Proba.erfc. alpha : partage entre
       somme directe (erfc(α r)/r, courte portée) et somme réciproque (exp(−k²/4α²)/k²). Le résultat n'en dépend pas. */
    function ewald(motif, alpha) {
      if (!Array.isArray(motif) || !motif.length) err("motif vide");
      const q = motif.map(m => m.q), f = motif.map(m => m.f), Q = q.reduce((s, x) => s + x, 0);
      if (Math.abs(Q) > 1e-12) err("maille chargée (" + Q + " e) : l'énergie d'un réseau chargé est infinie");
      const a = alpha === undefined ? 3.2 : pos(alpha, "alpha"), erfc = PROBA().erfc;
      const rc = 5.5 / a, nmax = Math.ceil(rc) + 1, kmax = Math.ceil(2 * a * Math.sqrt(30) / (2 * Math.PI)) + 1;
      let direct = 0, recip = 0;
      for (let i = 0; i < q.length; i++) for (let j = 0; j < q.length; j++) {
        for (let x = -nmax; x <= nmax; x++) for (let y = -nmax; y <= nmax; y++) for (let z = -nmax; z <= nmax; z++) {
          if (i === j && !x && !y && !z) continue;
          const r = Math.hypot(f[j][0] - f[i][0] + x, f[j][1] - f[i][1] + y, f[j][2] - f[i][2] + z);
          if (r < rc) direct += q[i] * q[j] * erfc(a * r) / r;
        }
      }
      for (let h = -kmax; h <= kmax; h++) for (let k = -kmax; k <= kmax; k++) for (let l = -kmax; l <= kmax; l++) {
        if (!h && !k && !l) continue;
        const k2 = 4 * Math.PI * Math.PI * (h * h + k * k + l * l);
        let c = 0, s = 0;
        for (let i = 0; i < q.length; i++) { const p = 2 * Math.PI * (h * f[i][0] + k * f[i][1] + l * f[i][2]); c += q[i] * Math.cos(p); s += q[i] * Math.sin(p); }
        recip += 4 * Math.PI / k2 * Math.exp(-k2 / (4 * a * a)) * (c * c + s * s);
      }
      const propre = -a / Math.sqrt(Math.PI) * q.reduce((t, x) => t + x * x, 0);
      return direct / 2 + recip / 2 + propre;                   // volume de la maille : 1
    }
    /* Constante de Madelung M, rapportée à la distance d cation–anion la plus courte et à |z⁺ z⁻| :
       E_coulomb = −N_A M |z⁺ z⁻| e²/(4π ε0 d) par mole d'unités formulaires. Elle ne dépend que de la géométrie. */
    function madelung(id, alpha) {
      const s = structure(id), zz = Math.abs(RAYONS[s.cation].z * RAYONS[s.anion].z);
      return -ewald(s.motif, alpha) / s.formule * dReduite(s) / zz;
    }

    /* Coordinence et rapport des rayons ρ = r⁺/r⁻ : ions sphères dures, anions de rayon 1. Section plane du polyèdre, côté s :
       les anions se touchent si s·dAA = 2, le cation touche ses anions si s·dCA = 1 + ρ. La plus grande des deux contraintes
       fixe s. Cation au contact de ses voisins et anions séparés tant que ρ ≥ ρc = 2 dCA/dAA − 1 : en dessous, le cation
       « flotte » dans sa cage. cn 8 : plan diagonal du cube (CsCl) ; 6 : plan équatorial de l'octaèdre (NaCl) ; 4 : plan
       diagonal du petit cube qui porte le tétraèdre (ZnS), deux anions dans le plan, les deux autres projetés au-dessus. */
    const POLYEDRES = Object.freeze({
      8: { dAA: 1, dCA: Math.sqrt(3) / 2, l: Math.SQRT2, h: 1, anions: [[0, 0], [1, 0], [0, 1], [1, 1]], horsPlan: [] },
      6: { dAA: 1, dCA: Math.SQRT1_2, l: 1, h: 1, anions: [[0, 0], [1, 0], [0, 1], [1, 1]], horsPlan: [] },
      4: { dAA: Math.SQRT2, dCA: Math.sqrt(3) / 2, l: Math.SQRT2, h: 1, anions: [[0, 0], [1, 0]], horsPlan: [[0.5, 1]] },
    });
    const poly = cn => POLYEDRES[cn] || err("coordinence 4, 6 ou 8 attendue");
    const rapportCritique = cn => 2 * poly(cn).dCA / poly(cn).dAA - 1;
    function coordinencePredite(rho) {
      pos(rho, "rho");
      return [8, 6, 4].find(cn => rho >= rapportCritique(cn) - 1e-12) || 3;
    }
    /* positions (anion de rayon 1) : { s, largeur, hauteur, anions, horsPlan, cation, contact: "anions" | "cation", jeu } ;
       jeu : écart entre anions voisins (contact cation) ou entre cation et anions (contact anions), en rayons d'anion. */
    function section(cn, rho) {
      const p = poly(cn); pos(rho, "rho");
      const sA = 2 / p.dAA, sC = (1 + rho) / p.dCA, s = Math.max(sA, sC);
      const pt = ([u, v]) => [u * p.l * s, v * p.h * s];
      return { s, largeur: p.l * s, hauteur: p.h * s, anions: p.anions.map(pt), horsPlan: p.horsPlan.map(pt), cation: pt([0.5, 0.5]),
        contact: sC >= sA ? "cation" : "anions", jeu: sC >= sA ? s * p.dAA - 2 : s * p.dCA - 1 - rho };
    }

    /* Cycle de Born–Haber à 298,15 K. Enthalpies de formation : NIST-JANAF (Chase 1998, solides) et clés CODATA (Cox, Wagman,
       Medvedev 1989, gaz) ; énergies d'ionisation : NIST ASD ; affinités électroniques : Cl 3,612 724 eV (Berzinsh et coll. 1995),
       F 3,401 190 eV (Blondel et coll. 1989). Les énergies d'ionisation et les affinités sont des énergies à 0 K : convertir en
       enthalpies à 298 K ajoute 5RT/2 par électron arraché et retire 5RT/2 par électron capté ; MX et MX₂ en arrachent autant
       qu'ils en captent, les deux corrections se compensent exactement (gaz parfaits, électron compris). */
    const BH = Object.freeze({
      NaCl: { M: "Na", X: "Cl", n: 1, dfH: -411.12e3, metal: 107.5e3, halogene: 121.301e3, EI: [5.13907696], AE: 3.612724 },
      KCl: { M: "K", X: "Cl", n: 1, dfH: -436.68e3, metal: 89.0e3, halogene: 121.301e3, EI: [4.34066373], AE: 3.612724 },
      CsCl: { M: "Cs", X: "Cl", n: 1, dfH: -442.83e3, metal: 76.5e3, halogene: 121.301e3, EI: [3.89390572743], AE: 3.612724 },
      NaF: { M: "Na", X: "F", n: 1, dfH: -575.38e3, metal: 107.5e3, halogene: 79.38e3, EI: [5.13907696], AE: 3.4011895 },
      LiF: { M: "Li", X: "F", n: 1, dfH: -616.93e3, metal: 159.3e3, halogene: 79.38e3, EI: [5.391714996], AE: 3.4011895 },
      CaF2: { M: "Ca", X: "F", n: 2, dfH: -1225.91e3, metal: 177.8e3, halogene: 79.38e3, EI: [6.1131549210, 11.871719], AE: 3.4011895 },
    });
    /* les cinq étapes du cycle, partant du cristal MXn(s) : ΔretH° = −ΔfH°(MXn) + ΔfH°(M, g) + n ΔfH°(X, g) + Σ EI − n AE.
       Exacte (loi de Hess) ; ce qui est approché, ce sont les données, à ±1 kJ·mol⁻¹ environ. */
    function bornHaber(id) {
      const d = BH[id] || err("composé sans données de Born–Haber : « " + id + " »");
      const etapes = [
        { id: "formation", dH: -d.dfH }, { id: "metal", dH: d.metal }, { id: "halogene", dH: d.n * d.halogene },
        { id: "ionisation", dH: d.EI.reduce((s, x) => s + x, 0) * EV_MOL }, { id: "attachement", dH: -d.n * d.AE * EV_MOL },
      ];
      return { etapes, dH: etapes.reduce((s, e) => s + e.dH, 0) };
    }

    /* Modèle de Born–Landé (1918) : énergie d'une mole d'unités formulaires à la distance r,
       E(r) = −N_A M |z⁺z⁻| e²/(4π ε0 r) + B/rⁿ, B fixé pour que le minimum tombe à la distance mesurée d0. */
    function energieModele(r, M, zz, d0, n) {
      pos(r, "r"); pos(M, "M"); pos(zz, "|z+ z-|"); pos(d0, "d0"); if (!(n > 1)) err("l'exposant de Born doit dépasser 1 : sinon pas de minimum");
      const A = KC * M * zz;
      return -A / r + A * Math.pow(d0, n - 1) / n / Math.pow(r, n);
    }
    /* Énergie réticulaire de Born–Landé, positive (énergie à fournir) : N_A M |z⁺z⁻| e²/(4π ε0 d0) (1 − 1/n). */
    function bornLande(M, zz, d0, n) { return -energieModele(d0, M, zz, d0, n); }
    /* Exposant de Born tiré de la compressibilité : V = c d³ par unité formulaire, module d'incompressibilité Kv = V d²E/dV² au
       minimum, d'où n = 1 + 9 c d0⁴ Kv/(M |z⁺z⁻| e²/(4π ε0)). Kv mesuré à 298 K, modèle statique : un ordre de grandeur. */
    function exposantBorn(id, Kv) {
      const s = structure(id), d0 = distanceIons(id), c = Math.pow(s.a, 3) / s.formule / Math.pow(d0, 3);
      const zz = Math.abs(RAYONS[s.cation].z * RAYONS[s.anion].z);
      return 1 + 9 * c * Math.pow(d0, 4) * pos(Kv, "Kv") / (KC / K.N_A * madelung(id) * zz);
    }
    /* Exposants de Born de Pauling, par configuration de gaz noble ; pour un sel, la moyenne de ceux de ses deux ions.
       Zn²⁺ (3d¹⁰) prend la valeur du type Cu⁺, 9. */
    const N_BORN = Object.freeze({ He: 5, Ne: 7, Ar: 9, Kr: 10, Xe: 12 });
    const COEUR = Object.freeze({ "Li+": "He", "Na+": "Ne", "Mg2+": "Ne", "F-": "Ne", "O2-": "Ne", "K+": "Ar", "Ca2+": "Ar", "Cl-": "Ar",
      "S2-": "Ar", "Zn2+": "Ar", "Br-": "Kr", "Cs+": "Xe", "I-": "Xe" });
    const nPauling = (cation, anion) => (N_BORN[COEUR[cation] || err("ion sans exposant : " + cation)] + N_BORN[COEUR[anion] || err("ion sans exposant : " + anion)]) / 2;
    /* Forme de Kapustinskii (1956) : sans connaître la structure, M/ν remplacé par celui du sel (M_NaCl/2), d = r⁺ + r⁻ et
       répulsion exponentielle de portée 34,5 pm (Born–Mayer) : E ≈ N_A (M_NaCl/2) e²/(4π ε0) ν |z⁺z⁻|/d (1 − 34,5 pm/d).
       Erreur typique de quelques % ; ν : nombre d'ions par unité formulaire. */
    function kapustinskii(nu, zz, d) {
      pos(nu, "nu"); pos(zz, "|z+ z-|"); pos(d, "d");
      return KC * madelung("NaCl") / 2 * nu * zz / d * (1 - 34.5 * PM / d);
    }

    /* Données de quinze solides pour les comparer. Tf : point de fusion sous 1 bar, K (ITS-90 pour Zn, Al, Ag, Cu ; NIST pour
       Na ; CRC Handbook pour les autres). E : énergie de cohésion, J·mol⁻¹, vers les entités du solide : atomes gazeux pour les
       métaux et les covalents (ΔfH° du gaz, clés CODATA), molécules gazeuses pour I₂ (CODATA), ions gazeux pour les ioniques
       (cycle de Born–Haber ci-dessus). Propriétés qualitatives : conduction électrique du solide et du liquide, solubilité dans
       l'eau, comportement sous le marteau. */
    const SOLIDES = Object.freeze([
      ["Na", "metallique", 370.96, 107.5e3, ["oui", "oui", "reagit", "malleable"]],
      ["Mg", "metallique", 923, 147.1e3, ["oui", "oui", "non", "malleable"]],
      ["Zn", "metallique", 692.677, 130.40e3, ["oui", "oui", "non", "malleable"]],
      ["Al", "metallique", 933.473, 330.0e3, ["oui", "oui", "non", "malleable"]],
      ["Ag", "metallique", 1234.93, 284.9e3, ["oui", "oui", "non", "malleable"]],
      ["Cu", "metallique", 1357.77, 337.4e3, ["oui", "oui", "non", "malleable"]],
      ["NaCl", "ionique", 1073.85, null, ["non", "oui", "oui", "fragile"]],
      ["KCl", "ionique", 1043.15, null, ["non", "oui", "oui", "fragile"]],
      ["CsCl", "ionique", 919.15, null, ["non", "oui", "oui", "fragile"]],
      ["NaF", "ionique", 1266.15, null, ["non", "oui", "oui", "fragile"]],
      ["LiF", "ionique", 1118.15, null, ["non", "oui", "peu", "fragile"]],
      ["CaF2", "ionique", 1691.15, null, ["non", "oui", "non", "fragile"]],
      ["Si", "covalent", 1687, 450e3, ["peu", "oui", "non", "fragile"]],
      ["Ge", "covalent", 1211.40, 372e3, ["peu", "oui", "non", "fragile"]],
      ["I2", "moleculaire", 386.85, 62.42e3, ["non", "non", "peu", "tendre"]],
    ].map(([id, type, Tf, E, [solide, liquide, eau, marteau]]) =>
      Object.freeze({ id, type, Tf, E: E === null ? bornHaber(id).dH : E, solide, liquide, eau, marteau })));
    const TYPES = Object.freeze(["metallique", "ionique", "covalent", "moleculaire"]);
    /* nombre sans dimension E/(R Tf) : énergie de cohésion contre énergie d'agitation thermique au point de fusion */
    const cohesionSurRT = (E, Tf) => pos(E, "E") / (K.R * pos(Tf, "Tf"));
    /* Deviner le type d'un solide d'après ses données qualitatives : règles du cours, dans cet ordre. Un modèle de tri, pas une loi :
       le graphite, conducteur et covalent, ou le mercure, liquide, le mettent en défaut. */
    function typeDevine(p) {
      if (p.solide === "oui") return "metallique";
      if (p.liquide === "oui" && p.solide === "non") return "ionique";
      if (p.Tf !== undefined && p.Tf < 600) return "moleculaire";
      return "covalent";
    }

    /* Glace carbonique, CO₂ solide sous 1 bar : groupe Pa3̄, C aux positions d'un empilement cubique à faces centrées, chaque molécule
       le long d'une diagonale différente du cube : les quatre molécules ne se déduisent pas l'une de l'autre par translation, le
       réseau est cubique simple, motif de quatre molécules. a = 557,8 pm à 80 K (diffraction X, Icarus 2017), x fixé par la liaison C=O de
       116,8 pm (diffraction X à 1 GPa, corrigée de l'agitation thermique) : x = d/(a√3). Même forme que Cristaux.STRUCTURES (atomes()). */
    const A_CO2 = 557.8 * PM, X_CO2 = 116.8 * PM / (A_CO2 * Math.sqrt(3)), xo = X_CO2;
    const CO2 = Object.freeze({ reseau: "cp", a: A_CO2, formule: 4, motif: site("C", 0, CFC).concat([
      [xo, xo, xo], [-xo, -xo, -xo], [0.5 - xo, -xo, 0.5 + xo], [0.5 + xo, xo, 0.5 - xo],
      [-xo, 0.5 + xo, 0.5 - xo], [xo, 0.5 - xo, 0.5 + xo], [0.5 + xo, 0.5 - xo, -xo], [0.5 - xo, 0.5 + xo, xo],
    ].map(f => ({ e: "O", q: 0, f: f.map(v => ((v % 1) + 1) % 1) }))) });

    Object.assign(api, { RAYONS, rayon, STRUCTURES_IONIQUES, A_SEL_GEMME, distanceIons, additivite, ewald, madelung, POLYEDRES, rapportCritique,
      coordinencePredite, section, BH, bornHaber, energieModele, bornLande, exposantBorn, N_BORN, nPauling, kapustinskii,
      SOLIDES, TYPES, cohesionSurRT, typeDevine, CO2, KC, EV_MOL });
  }

  /* ---------- fin des sections ---------- */
  Object.freeze(api);
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ChimArchi = api;
})(typeof self !== "undefined" ? self : this);

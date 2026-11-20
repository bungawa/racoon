/* Thermodynamique, monde « thermo » : module commun. Pure, no DOM, UMD (global Thermo). SI throughout: m³, Pa, K, J, mol.
   Started by the step « Entropie et énergie interne » (Feynman I.44.5, I.44.6, I.45.1, I.45.2). Other steps extend it with Edit.

   First and second laws (I.44.1 to I.44.4, step « Premier et second principes »). Q and W received by the system unless said.
     C_EAU                          4 184 J·kg⁻¹·K⁻¹, liquid water near 293 K (4,1844 kJ at 20 °C; within 1 % from 273 to 373 K).
     palettes(m, h, M, o)           Joule's paddle wheel: weights m (kg) falling h (m), o.n times, stir water M (kg):
                                    { W: n m g h, dT: W/(M c) }, o = { n: 1, g: 9,81, c: C_EAU }. No loss, c constant.
     cv(n, gamma)                   Cv = nR/(γ − 1), J·K⁻¹: ΔU = Cv ΔT for a perfect gas.
     cycleCarnot(n, gamma, T1, T2, Va, Vb)  the reversible cycle a → b (isotherm T1) → c (adiabat) → d (isotherm T2) → a:
                                    { etats: { a, b, c, d } each { V, P, T }, etapes: [{ id, type, Q, W }] received by the gas,
                                      Q1 > 0 taken at T1, Q2 > 0 given at T2, W = Q1 − Q2 > 0 given, eta = W/Q1 }.
     arbitre(T1, T2, Q1, W)         a cyclic machine between two reservoirs, T1 > T2: takes Q1 at T1, gives W, gives
                                    Q2 = Q1 − W at T2 (44.3), all algebraic. { Q2, Wrev = Q1 (1 − T2/T1), ecart = W − Wrev,
                                    verdict: "reversible"|"possible"|"impossible", role, enonce: "kelvin"|"clausius"|null }.
                                    Impossible iff W > Wrev (the reservoirs' entropy (Wrev − W)/T2 would fall), whatever the signs.
                                    enonce: "kelvin" when W > 0 (with a reversed reversible engine, the pair draws W − Wrev from the
                                    cold reservoir alone), "clausius" when W ≤ 0 (with a reversible engine, heat climbs alone).
     couplage(T1, T2, Q1, Wb)       engine B gives Wb from Q1; reversible A, run backward with W = Q1 (1 − T2/T1), returns Q1:
                                    { W, net: Wb − W, chaud: 0, froid: Wb − W } (net heat taken from each reservoir).
     trois(T1, T2, T3, Q1)          (44.8): engine 1 reversible T1 → T3, engine 2 reversible run backward between T3 and T2:
                                    { Q3, Q2, W13, W32, W12 } with W13 − W32 = W12 whatever T3.
     efficacites(T1, T2)            reversible fridge T2/(T1 − T2) and heat pump T1/(T1 − T2).
     vitesseSon(gamma, M, T)        √(γRT/M), m·s⁻¹: a piston slow against it keeps the gas uniform (quasi-static).
   Thermodynamic temperature (I.44.5)
     T_PT                           273,16 K, triple point of water: exact from 1954 to 2019, now measured (k_B is fixed instead).
     temperature(Q, Qref, Tref)     T = Tref·Q/Qref (44.10a): the heat a reversible engine takes at T, against the heat Qref
                                    it gives at Tref. No substance enters.
     carnot(T1, T2)                 { eta: 1 − T2/T1 (44.14), q2q1: T2/T1 (44.12) }, T1 > T2 > 0.
     chaine(Q1, T1, T2, n)          n reversible engines in series between T1 and T2, each giving the same work:
                                    { T: the n + 1 reservoir temperatures, Q: the heat through each, W: the work of each }.
   Entropy (I.44.6), perfect gas of n moles, γ = Cp/Cv constant
     pression(n, V, T)              nRT/V.
     dS(n, gamma, a, b)             S(b) − S(a) = nR [ln(Vb/Va) + ln(Tb/Ta)/(γ − 1)], states a, b = { V, T }.
     chemin(n, gamma, a, legs, N)   a reversible path from a, legs = [{ type: "isotherme"|"isochore"|"adiabatique", V|T }],
                                    integrated numerically (N slices per leg, midpoint): { Q, W, dS, fin, pts: [[V, P]] }.
                                    Q and W are received by the gas; dS = ∫ dQ/T (44.16).
     joule(n, V1, V2)               free expansion into vacuum: Q = W = 0, ΔS = nR ln(V2/V1) > 0, T unchanged.
     contact(C1, T1, C2, T2)        two bodies of heat capacities C1, C2 (J·K⁻¹) left in contact: { Tf, dS1, dS2, dS }.
     thermostats(Q, T1, T2)         Q passing from a reservoir at T1 to one at T2: ΔS = Q/T2 − Q/T1 (44.19).
   Internal energy (I.45.1)
     GAZ                            van der Waals a (Pa·m⁶·mol⁻²), b (m³·mol⁻¹), cv = Cv,m/R for He, Ar, N2.
     vdw(g)                         (n, V, T) → nRT/(V − nb) − a n²/V².
     dUdX(Y, X, T, h)               T (∂Y/∂T)_X − Y, numerically (centred): (∂U/∂X)_T when the system gives the work Y dX.
                                    Gas: Y = P, X = V (45.7). Rubber band: Y = −f, X = L. Cell: Y = E, X = q (45.9).
     joulevdw(g, n, V1, V2, T1)     free expansion of a van der Waals gas: T2 = T1 − a n (1/V1 − 1/V2)/Cv,m.
     ecarts(g, n, V, T)             what the perfect gas neglects: { b: nb/V, a: a n/(RTV) }.
     cpMoinsCv(P, n, V, T)          T (∂P/∂T)_V (∂V/∂T)_P, numerically: nR for a perfect gas (Mayer).
     thermoelastiques(P, n, V, T)   step « Gaz réels »: { P, dPdT, dPdV, alpha = (1/V)(∂V/∂T)_P, beta = (1/P)(∂P/∂T)_V,
                                    chiT = −(1/V)(∂V/∂P)_T, l = T (∂P/∂T)_V (Pa), cpcv = T V α²/χ_T (J·K⁻¹) }, numerically;
                                    α = P β χ_T by construction. Refused where (∂P/∂V)_T ≥ 0 (unstable part of a loop).
   Rubber band (I.45.2): ideal (entropic) rubber, nominal stress σ = G(T)(λ − 1/λ²), G ∝ T
     CAOUTCHOUC                     G0 = 0,6 MPa at T0 = 293,15 K, ρ = 920 kg·m⁻³, c = 1 950 J·kg⁻¹·K⁻¹.
     contrainte(lam, T, m)          σ in Pa, force per unstretched cross-section.
     travail(lam, T, m)             ∫₁^λ σ dλ at constant T, J·m⁻³ of rubber, received by the band.
     adiabatique(lam, m)            T after a slow stretch with no heat exchange, from T0: U depends on T only, so ρc dT = σ dλ,
                                    T = T0 exp[(G0/(T0 ρ c)) (λ²/2 + 1/λ − 3/2)].
   Pure substance, two phases (step « Changements d'état du corps pur »): water from the IAPWS releases SR1-86(1992), R14-08(2011)
     EAU                            M, triple and critical points, Teb, ρ of ice, Lf, heat capacities of ice, water, vapour.
     psat(T), dpsat(T), TsatEau(p)  liquid-vapour saturation pressure (Pa), its slope (Pa·K⁻¹), its inverse; 273,16 K to Tc.
     rhoLiq(T), rhoVap(T)           saturated liquid and vapour densities. saturationEau(T): { p, dp, rhoL, … }.
     Lvap(T)                        h'' − h' (J·kg⁻¹), zero at the critical point.
     pFusion, dpFusion, Tfusion     melting of ice Ih, 251,165 K to 273,16 K (negative slope). pSublimation, dpSublimation: 50 K up.
     phaseEau(T, p)                 "solide" | "liquide" | "gaz" | "supercritique", null above 208,566 MPa (other ices) or below 50 K.
     clapeyron(L, T, dv)            dp/dT = L/(T Δv); latenteClapeyron(T, dv, dpdT) = T Δv dp/dT.
     clausiusClapeyron(T, T0, p0, L, M)  (45.15) p0 exp[−(LM/R)(1/T − 1/T0)]; negligesCC(T): { vSurV, Z, dL10 } what it drops.
     vdwReduit(Tr, vr), maxwell(Tr), isothermeReduite(Tr)   reduced van der Waals, its equal-area plateau { p, vl, vg }.
     titre(v, vl, vg)               vapour fraction by the lever rule.
     chauffage(q, o)                1 kg of ice from o.T0 heated at constant o.p by q (J·kg⁻¹): { T, etat, x, h, s, paliers }.
   Real machines (step « Machines thermiques réelles », X.machines_thermiques.1 to 3). Per kilogram that flows, received.
     AIR                            dry air as a perfect gas, cp = 7r/2 constant.
     composant(o)                   o = { type: "compresseur"|"turbine"|"detendeur", T1, p1, p2, eta }: adiabatic, steady flow.
                                    { T2, T2s (isentropic), w = Δh = cp (T2 − T1), ws, q: 0, sc: s2 − s1 (all created) }.
     ditherme(mode, Tc, Tf, sigma)  mode "moteur"|"pac"|"frigo", sigma = entropy created per joule of useful heat (K⁻¹):
                                    { e (efficiency or COP), carnot, T0 (surroundings: Tf, or Tc for a fridge), perdu: T0 sigma }.
                                    T0 is the reservoir whose heat is eliminated between the two balances: lost work = T0 × Sc.
     pincement(mode, Tc, Tf, dT)    the fluid works between temperatures dT away from the sources, reversibly inside:
                                    { e, sigma (created in the two exchangers), Th, Tl }.
     curzonAhlborn(Tc, Tf)          1 − √(Tf/Tc), efficiency at maximum power of an engine limited by its exchangers.
     CENTRALES                      three plants from Curzon and Ahlborn (1975), table I: Tc, Tf, observed efficiency.
     FLUIDES                        saturation tables of water and propane (CoolProp 8.0.0), propane superheated vapour.
     critique(f), saturation(f, T)  { T, p, hl, hv, sl, sv, vl, vv, L }: linear in T, ln p and ln vv affine in 1/T.
     Tsat(f, p), melange(f, T, x)   inverse of the saturation curve; a liquid-vapour mixture of quality x (lever rule).
     vapeur(f, Tsat, cle)           superheated vapour on the isobar p(Tsat), cle = { dT } | { s } | { h }: { T, dT, p, h, s }.
     rankine(o)                     o = { Tc, Tf, etaT }, saturated steam, no superheat: { etats, wT, wP, qC, qF, eta, carnot,
                                    x4s, sc }.
     compressionVapeur(o)           o = { Te, Tc, etaC, surchauffe }, propane: { etats, e2s, w, qF, qC, cop: { frigo, pac },
                                    carnot, sc: { compresseur, detendeur } }.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const K = typeof require === "function" ? require("./constantes.js") : root.Constantes, R = K.R;
  const err = m => { throw new Error("thermo : " + m); };
  const pos = (v, n) => { if (!(typeof v === "number" && v > 0 && isFinite(v))) err(n + " > 0 attendu, reçu " + v); return v; };
  const gam = g => { if (!(g > 1 && isFinite(g))) err("γ > 1 attendu, reçu " + g); return g; };

  /* ---------- premier et second principes ---------- */
  /* eau liquide : 4,2199 / 4,1844 / 4,2157 kJ·kg⁻¹·K⁻¹ à 273 / 293 / 373 K (Engineering ToolBox) ; 4 184 = la calorie thermochimique × 1 000 */
  const C_EAU = 4184;
  function palettes(m, h, M, o = {}) {
    const n = o.n == null ? 1 : o.n, g = o.g == null ? K.g_CPGE : o.g, c = o.c == null ? C_EAU : o.c;
    pos(m, "m"); pos(h, "h"); pos(M, "M"); pos(n, "n"); pos(g, "g"); pos(c, "c");
    const W = n * m * g * h;
    return { W, dT: W / (M * c) };
  }
  const cv = (n, gamma) => pos(n, "n") * R / (gam(gamma) - 1);
  function cycleCarnot(n, gamma, T1, T2, Va, Vb) {
    carnot(T1, T2); pos(Va, "Va"); pos(Vb, "Vb"); if (!(Vb > Va)) err("Vb > Va attendu (détente isotherme)");
    const C = cv(n, gamma), r = Math.pow(T1 / T2, 1 / (gamma - 1));          // (44.6): T V^(γ−1) constant on each adiabat
    const st = (V, T) => ({ V, T, P: pression(n, V, T) });
    const etats = { a: st(Va, T1), b: st(Vb, T1), c: st(Vb * r, T2), d: st(Va * r, T2) };
    const iso = (T, V0, V1) => { const Q = n * R * T * Math.log(V1 / V0); return { Q, W: -Q }; };   // U constant (44.4)
    const etapes = [
      Object.assign({ id: "ab", type: "isotherme" }, iso(T1, etats.a.V, etats.b.V)),
      { id: "bc", type: "adiabatique", Q: 0, W: C * (T2 - T1) },
      Object.assign({ id: "cd", type: "isotherme" }, iso(T2, etats.c.V, etats.d.V)),
      { id: "da", type: "adiabatique", Q: 0, W: C * (T1 - T2) },
    ];
    const Q1 = etapes[0].Q, Q2 = -etapes[2].Q, W = -etapes.reduce((s, e) => s + e.W, 0);
    return { etats, etapes, Q1, Q2, W, eta: W / Q1 };
  }
  function arbitre(T1, T2, Q1, W) {
    carnot(T1, T2);
    if (!(isFinite(Q1) && isFinite(W))) err("Q1 et W finis attendus");
    const Q2 = Q1 - W, Wrev = Q1 * (1 - T2 / T1), ecart = W - Wrev, tol = 1e-9 * (Math.abs(Q1) + Math.abs(W) + 1e-300);
    const verdict = Math.abs(ecart) <= tol ? "reversible" : ecart > 0 ? "impossible" : "possible";
    const role = W > 0 ? "moteur" : W < 0 && Q2 < 0 ? "recepteur" : W < 0 ? "dissipation" : Q1 === 0 ? "rien" : "conduction";
    return { Q2, Wrev, ecart, verdict, role, enonce: verdict !== "impossible" ? null : W > 0 ? "kelvin" : "clausius" };
  }
  function couplage(T1, T2, Q1, Wb) {
    const W = pos(Q1, "Q1") * carnot(T1, T2).eta;
    if (!isFinite(Wb)) err("Wb fini attendu");
    return { W, net: Wb - W, chaud: 0, froid: Wb - W };
  }
  function trois(T1, T2, T3, Q1) {
    carnot(T1, T2); pos(T3, "T3"); pos(Q1, "Q1"); if (!(T3 < T1)) err("T3 < T1 attendu");
    const Q3 = Q1 * T3 / T1, Q2 = Q3 * T2 / T3;                              // (44.7) for each reversible engine
    return { Q3, Q2, W13: Q1 - Q3, W32: Q2 - Q3, W12: Q1 - Q2 };
  }
  function efficacites(T1, T2) { carnot(T1, T2); return { frigo: T2 / (T1 - T2), pompe: T1 / (T1 - T2) }; }
  const vitesseSon = (gamma, M, T) => Math.sqrt(gam(gamma) * R * pos(T, "T") / pos(M, "M"));

  /* ---------- température thermodynamique ---------- */
  const T_PT = 273.16;
  const temperature = (Q, Qref, Tref = T_PT) => pos(Tref, "Tref") * pos(Q, "Q") / pos(Qref, "Qref");
  function carnot(T1, T2) {
    pos(T1, "T1"); pos(T2, "T2"); if (!(T1 > T2)) err("T1 > T2 attendu");
    return { eta: 1 - T2 / T1, q2q1: T2 / T1 };
  }
  function chaine(Q1, T1, T2, n) {
    pos(Q1, "Q1"); carnot(T1, T2); if (!(Number.isInteger(n) && n >= 1)) err("n entier ≥ 1 attendu");
    const T = Array.from({ length: n + 1 }, (_, k) => T1 - k * (T1 - T2) / n), Q = T.map(Tk => Q1 * Tk / T1);
    return { T, Q, W: Q.slice(1).map((q, k) => Q[k] - q) };
  }

  /* ---------- entropie du gaz parfait ---------- */
  const pression = (n, V, T) => pos(n, "n") * R * pos(T, "T") / pos(V, "V");
  const etat = (s, nom) => { if (!s) err("état " + nom + " manquant"); pos(s.V, nom + ".V"); pos(s.T, nom + ".T"); return s; };
  function dS(n, gamma, a, b) {
    pos(n, "n"); gam(gamma); etat(a, "a"); etat(b, "b");
    return n * R * (Math.log(b.V / a.V) + Math.log(b.T / a.T) / (gamma - 1));
  }
  function chemin(n, gamma, a, legs, N = 2000) {
    pos(n, "n"); gam(gamma); etat(a, "a");
    const Cv = n * R / (gamma - 1);
    let V = a.V, T = a.T, Q = 0, W = 0, S = 0;
    const pts = [[V, pression(n, V, T)]];
    for (const leg of legs) {
      const V0 = V, T0 = T;
      let at;                                                    // s ∈ [0, 1] → { V, T } along the leg
      if (leg.type === "isotherme") { const V1 = pos(leg.V, "V"); at = s => ({ V: V0 * Math.pow(V1 / V0, s), T: T0 }); }
      else if (leg.type === "isochore") { const T1 = pos(leg.T, "T"); at = s => ({ V: V0, T: T0 + s * (T1 - T0) }); }
      else if (leg.type === "adiabatique") { const V1 = pos(leg.V, "V");
        at = s => { const v = V0 * Math.pow(V1 / V0, s); return { V: v, T: T0 * Math.pow(V0 / v, gamma - 1) }; }; }
      else err("type d'étape inconnu : " + leg.type);
      for (let i = 0; i < N; i++) {
        const p = at(i / N), q = at((i + 1) / N), m = at((i + 0.5) / N);
        const dW = -pression(n, m.V, m.T) * (q.V - p.V), dQ = Cv * (q.T - p.T) - dW;   // first law: dU = Cv dT = dQ + dW
        Q += dQ; W += dW; S += dQ / m.T;
        if ((i + 1) % Math.max(1, N / 50) === 0) pts.push([q.V, pression(n, q.V, q.T)]);
      }
      const e = at(1); V = e.V; T = e.T;
    }
    return { Q, W, dS: S, fin: { V, T }, pts };
  }
  const joule = (n, V1, V2) => ({ Q: 0, W: 0, dS: pos(n, "n") * R * Math.log(pos(V2, "V2") / pos(V1, "V1")) });
  function contact(C1, T1, C2, T2) {
    pos(C1, "C1"); pos(C2, "C2"); pos(T1, "T1"); pos(T2, "T2");
    const Tf = (C1 * T1 + C2 * T2) / (C1 + C2), dS1 = C1 * Math.log(Tf / T1), dS2 = C2 * Math.log(Tf / T2);
    return { Tf, dS1, dS2, dS: dS1 + dS2 };
  }
  const thermostats = (Q, T1, T2) => Q / pos(T2, "T2") - Q / pos(T1, "T1");

  /* ---------- énergie interne ---------- */
  /* Weast, CRC Handbook of Chemistry and Physics, 53rd ed. (1972): a in L²·bar·mol⁻² × 0,1 → Pa·m⁶·mol⁻², b in L·mol⁻¹ × 10⁻³ */
  const GAZ = Object.freeze({
    He: Object.freeze({ a: 0.00346, b: 2.38e-5, cv: 1.5 }),
    Ar: Object.freeze({ a: 0.1355, b: 3.201e-5, cv: 1.5 }),
    N2: Object.freeze({ a: 0.1370, b: 3.87e-5, cv: 2.5 }),
  });
  const gaz = g => { const G = typeof g === "string" ? GAZ[g] : g; if (!G) err("gaz inconnu : " + g); return G; };
  function vdw(g) {
    const { a, b } = gaz(g);
    return (n, V, T) => { if (!(V > n * b)) err("V > nb attendu"); return n * R * T / (V - n * b) - a * n * n / (V * V); };
  }
  function dUdX(Y, X, T, h) {
    pos(T, "T"); h = h || T * 1e-4;
    return T * (Y(X, T + h) - Y(X, T - h)) / (2 * h) - Y(X, T);
  }
  function joulevdw(g, n, V1, V2, T1) {
    const G = gaz(g); pos(n, "n"); pos(V1, "V1"); pos(V2, "V2"); pos(T1, "T1");
    return T1 - G.a * n * (1 / V1 - 1 / V2) / (G.cv * R);
  }
  function ecarts(g, n, V, T) {
    const G = gaz(g); pos(n, "n"); pos(V, "V"); pos(T, "T");
    return { b: n * G.b / V, a: G.a * n / (R * T * V) };
  }
  function cpMoinsCv(P, n, V, T) {
    pos(V, "V"); pos(T, "T");
    const hT = T * 1e-4, hV = V * 1e-4;
    const dPdT = (P(n, V, T + hT) - P(n, V, T - hT)) / (2 * hT), dPdV = (P(n, V + hV, T) - P(n, V - hV, T)) / (2 * hV);
    return -T * dPdT * dPdT / dPdV;                              // (∂V/∂T)_P = −(∂P/∂T)_V / (∂P/∂V)_T
  }
  /* coefficients thermoélastiques et calorimétriques de n moles décrites par P(n, V, T), numériquement (étape « Gaz réels ») */
  function thermoelastiques(P, n, V, T) {
    pos(n, "n"); pos(V, "V"); pos(T, "T");
    const hT = T * 1e-4, hV = V * 1e-4, p = P(n, V, T);
    const dPdT = (P(n, V, T + hT) - P(n, V, T - hT)) / (2 * hT), dPdV = (P(n, V + hV, T) - P(n, V - hV, T)) / (2 * hV);
    if (!(dPdV < 0)) err("(∂P/∂V)_T < 0 attendu : état instable");
    const chiT = -1 / (V * dPdV), alpha = dPdT * chiT;            // α = −(∂P/∂T)_V/(V (∂P/∂V)_T), cyclic relation
    return { P: p, dPdT, dPdV, alpha, beta: dPdT / p, chiT, l: T * dPdT, cpcv: T * V * alpha * alpha / chiT };
  }

  /* ---------- l'élastique ---------- */
  /* G0 : module de cisaillement d'un caoutchouc mou (Wikipedia « Shear modulus » : 0,6 MPa), valeur typique, dépend de la vulcanisation ;
     ρ et c : caoutchouc naturel, NETZSCH (0,91–0,93 g·cm⁻³ ; 1,91–2,08 J·g⁻¹·K⁻¹). */
  const CAOUTCHOUC = Object.freeze({ G0: 0.6e6, T0: 293.15, rho: 920, c: 1950 });
  const lam1 = l => { if (!(l >= 1 && isFinite(l))) err("allongement λ ≥ 1 attendu, reçu " + l); return l; };
  const contrainte = (lam, T, m = CAOUTCHOUC) => m.G0 * (pos(T, "T") / m.T0) * (lam - 1 / (lam * lam));
  const prim = l => l * l / 2 + 1 / l - 1.5;                    // ∫₁^λ (x − 1/x²) dx
  const travail = (lam, T, m = CAOUTCHOUC) => m.G0 * (pos(T, "T") / m.T0) * prim(lam1(lam));
  const adiabatique = (lam, m = CAOUTCHOUC) => m.T0 * Math.exp(m.G0 / (m.T0 * m.rho * m.c) * prim(lam1(lam)));

  /* ---------- corps pur diphasé (étape « Changements d'état du corps pur ») ---------- */
  /* EAU : point critique et saturation liquide-vapeur de l'IAPWS SR1-86(1992), fusion de la glace Ih et sublimation de
     l'IAPWS R14-08(2011), M = Rm/R de l'IAPWS-95 (8,314 51/0,461 518 05 = 18,015 268 g·mol⁻¹, Wagner et Pruß 2002). Teb : la température où SR1-86 (1) donne 101 325 Pa (sa table 1).
     rhoGlace : glace Ih à 273,15 K (la valeur de Fluides.RHO.glace). Lf : fusion de la glace à 273,15 K sous 101 325 Pa.
     c : capacités thermiques massiques à pression constante, glace à 263 K, eau liquide à 298 K, vapeur à 373 K (Wikipedia « Table of
     specific heat capacities »). Lf : Wikipedia « Enthalpy of fusion ». */
  const EAU = Object.freeze({ M: 0.018015268, Tt: 273.16, pt: 611.657, Tc: 647.096, pc: 22.064e6, rhoc: 322, Teb: 373.1243,
    rhoGlace: 916.7, Lf: 333.55e3, pFusionMax: 208.566e6, c: Object.freeze({ glace: 2050, eau: 4182, vapeur: 2030 }) });
  const SAT = { a: [-7.85951783, 1.84408259, -11.7866497, 22.6807411, -15.9618719, 1.80122502], ea: [1, 1.5, 3, 3.5, 4, 7.5],
    b: [1.99274064, 1.09965342, -0.510839303, -1.75493479, -45.5170352, -6.74694450e5], eb: [1, 2, 5, 16, 43, 110].map(e => e / 3),
    c: [-2.03150240, -2.68302940, -5.38626492, -17.2991605, -44.7586581, -63.9201063], ec: [2, 4, 8, 18, 37, 71].map(e => e / 6),
    dA: -1135.905627715, dP: 2319.5246, d: [-5.65134998e-8, 2690.66631, 127.287297, -135.003439, 0.981825814] };
  const somme = (k, e, x) => k.reduce((s, ki, i) => s + ki * Math.pow(x, e[i]), 0);
  const tauSat = T => { if (!(T >= EAU.Tt - 1e-9 && T <= EAU.Tc + 1e-9)) err("T entre 273,16 K et 647,096 K attendu (équilibre liquide-vapeur), reçu " + T);
    return Math.max(0, 1 - T / EAU.Tc); };

  /* SR1-86 (1) : pression de vapeur saturante, Pa ; incertitude 0,025 % à 373 K (table 3 des tables squelettes de l'IAPS). */
  const psat = T => { const t = tauSat(T); return EAU.pc * Math.exp(EAU.Tc / T * somme(SAT.a, SAT.ea, t)); };
  /* sa dérivée exacte, Pa·K⁻¹ : d ln p/dT = −(Tc/T²) Σ − (1/T) Σ' */
  function dpsat(T) {
    const t = tauSat(T), S = somme(SAT.a, SAT.ea, t), dS = SAT.a.reduce((s, a, i) => s + a * SAT.ea[i] * Math.pow(t, SAT.ea[i] - 1), 0);
    return psat(T) * (-EAU.Tc / (T * T) * S - dS / T);
  }
  /* SR1-86 (2) et (3) : masses volumiques du liquide et de la vapeur saturants, kg·m⁻³ */
  const rhoLiq = T => EAU.rhoc * (1 + somme(SAT.b, SAT.eb, tauSat(T)));
  const rhoVap = T => EAU.rhoc * Math.exp(somme(SAT.c, SAT.ec, tauSat(T)));
  /* SR1-86 (4) à (9) : enthalpie et entropie massiques des deux phases saturantes ; h' = 0,61 J·kg⁻¹ et s' = 0 au point triple */
  function auxiliaires(T) {
    tauSat(T); const th = T / EAU.Tc, d = SAT.d;
    const alpha = 1000 * (SAT.dA + d[0] * th ** -19 + d[1] * th + d[2] * th ** 4.5 + d[3] * th ** 5 + d[4] * th ** 54.5);
    const phi = 1000 / EAU.Tc * (SAT.dP + 19 / 20 * d[0] * th ** -20 + d[1] * Math.log(th) + 9 / 7 * d[2] * th ** 3.5 + 5 / 4 * d[3] * th ** 4 + 109 / 107 * d[4] * th ** 53.5);
    return { alpha, phi, dp: dpsat(T) };
  }
  function saturationEau(T) {
    const { alpha, phi, dp } = auxiliaires(T), rl = rhoLiq(T), rv = rhoVap(T);
    return { T, p: psat(T), dp, rhoL: rl, rhoV: rv, hL: alpha + T * dp / rl, hV: alpha + T * dp / rv, sL: phi + dp / rl, sV: phi + dp / rv };
  }
  /* chaleur latente de vaporisation h'' − h' = T (1/ρ'' − 1/ρ') dp/dT, J·kg⁻¹ : la formule de Clapeyron, sur laquelle
     l'IAPWS construit h' et h'' ; nulle au point critique */
  const Lvap = T => { const s = saturationEau(T); return s.hV - s.hL; };
  /* inverse de psat par dichotomie, p entre pt et pc */
  function TsatEau(p) {
    if (!(p >= EAU.pt * (1 - 1e-9) && p <= EAU.pc)) err("p entre 611,657 Pa et 22,064 MPa attendue, reçue " + p);
    let a = EAU.Tt, b = EAU.Tc;
    for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (psat(m) < p) a = m; else b = m; }
    return (a + b) / 2;
  }

  /* R14-08 (1) : fusion de la glace Ih, 251,165 K à 273,16 K ; incertitude 2 % sur p. Pa, et sa dérivée en Pa·K⁻¹ (négative). */
  const FUS = { a: [0.119539337e7, 0.808183159e5, 0.333826860e4], b: [3, 25.75, 103.75] };
  const thFus = T => { if (!(T >= 251.165 - 1e-9 && T <= EAU.Tt + 1e-9)) err("T entre 251,165 K et 273,16 K attendu (fusion de la glace Ih), reçu " + T); return T / EAU.Tt; };
  const pFusion = T => { const th = thFus(T); return EAU.pt * (1 + FUS.a.reduce((s, a, i) => s + a * (1 - th ** FUS.b[i]), 0)); };
  const dpFusion = T => { const th = thFus(T); return -EAU.pt / EAU.Tt * FUS.a.reduce((s, a, i) => s + a * FUS.b[i] * th ** (FUS.b[i] - 1), 0); };
  function Tfusion(p) {
    if (!(p >= EAU.pt * (1 - 1e-9) && p <= EAU.pFusionMax)) err("p entre 611,657 Pa et 208,566 MPa attendue (glace Ih), reçue " + p);
    let a = 251.165, b = EAU.Tt;
    for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (pFusion(m) > p) a = m; else b = m; }
    return (a + b) / 2;
  }
  /* R14-08 (6) : sublimation de la glace Ih, 50 K à 273,16 K. Pa, et sa dérivée en Pa·K⁻¹. */
  const SUB = { a: [-0.212144006e2, 0.273203819e2, -0.610598130e1], b: [0.333333333e-2, 0.120666667e1, 0.170333333e1] };
  const thSub = T => { if (!(T >= 50 && T <= EAU.Tt + 1e-9)) err("T entre 50 K et 273,16 K attendu (sublimation), reçu " + T); return T / EAU.Tt; };
  const pSublimation = T => { const th = thSub(T); return EAU.pt * Math.exp(somme(SUB.a, SUB.b, th) / th); };
  const dpSublimation = T => { const th = thSub(T), S = somme(SUB.a, SUB.b, th), dS = SUB.a.reduce((s, a, i) => s + a * SUB.b[i] * th ** (SUB.b[i] - 1), 0);
    return pSublimation(T) * (dS / th - S / (th * th)) / EAU.Tt; };

  /* phase de l'eau en (T, p) : "solide" (glace Ih), "liquide", "gaz", "supercritique" (T > Tc et p > pc) ; null hors du domaine
     de la glace Ih (p > 208,566 MPa, où d'autres glaces apparaissent) ou sous 50 K. Sur une courbe, la phase du côté p plus grand. */
  function phaseEau(T, p) {
    pos(T, "T"); pos(p, "p");
    if (p > EAU.pFusionMax || T < 50) return null;
    if (T >= EAU.Tc) return p > EAU.pc ? "supercritique" : "gaz";
    if (T >= EAU.Tt) return p < psat(T) ? "gaz" : "liquide";
    if (p < pSublimation(T)) return "gaz";
    return T >= 251.165 && p > pFusion(T) ? "liquide" : "solide";
  }

  /* formule de Clapeyron : dp/dT = L/(T Δv), Δv = v(phase d'arrivée) − v(phase de départ), m³·kg⁻¹ ; et L = T Δv dp/dT */
  const clapeyron = (L, T, dv) => { pos(T, "T"); if (!(dv !== 0 && isFinite(dv))) err("Δv non nul attendu"); return L / (T * dv); };
  const latenteClapeyron = (T, dv, dpdT) => pos(T, "T") * dv * dpdT;
  /* Clausius-Clapeyron intégrée (45.15) : vapeur gaz parfait, volume du liquide négligé, L constant :
     p = p0 exp[−(L M/R)(1/T − 1/T0)]. L massique (J·kg⁻¹), M en kg·mol⁻¹. */
  const clausiusClapeyron = (T, T0, p0, L, M = EAU.M) => pos(p0, "p0") * Math.exp(-pos(L, "L") * M / R * (1 / pos(T, "T") - 1 / pos(T0, "T0")));
  /* ce que néglige Clausius-Clapeyron sur la courbe de l'eau à T : v'/v'' (volume du liquide), 1 − Z (écart au gaz parfait
     de la vapeur saturante, Z = p M/(ρ'' R T)) et la variation relative de L sur 10 K */
  function negligesCC(T) {
    const s = saturationEau(T), Z = s.p * EAU.M / (s.rhoV * R * T);
    const T2 = Math.min(T + 10, EAU.Tc - 1e-9);
    return { vSurV: s.rhoV / s.rhoL, Z, dL10: Math.abs(Lvap(T2) - Lvap(T)) / Lvap(T) * 10 / (T2 - T) };
  }

  /* Van der Waals en variables réduites : pr = 8 Tr/(3 vr − 1) − 3/vr² (Tc, pc, vc du gaz) */
  const vdwReduit = (Tr, vr) => { if (!(vr > 1 / 3)) err("vr > 1/3 attendu"); return 8 * Tr / (3 * vr - 1) - 3 / (vr * vr); };
  /* palier de Maxwell à Tr ∈ [0,5 ; 1[ : pression de vapeur saturante réduite et volumes réduits des deux phases, par l'égalité
     des aires (∫ p dv = p (vg − vl)) ; null pour Tr ≥ 1 (au-delà du point critique, pas de palier) */
  function maxwell(Tr) {
    if (!(Tr >= 0.5)) err("Tr ≥ 0,5 attendu, reçu " + Tr);
    if (Tr >= 1) return null;
    const bis = (f, a, b) => { let fa = f(a); for (let i = 0; i < 100; i++) { const m = (a + b) / 2, fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
    const spin = v => 4 * Tr * v ** 3 - (3 * v - 1) ** 2;      // dp/dv = 0 : spinodales, de part et d'autre de vr = 1
    const v1 = bis(spin, 0.3334, 1), v2 = bis(spin, 1, 1e3), pmin = vdwReduit(Tr, v1), pmax = vdwReduit(Tr, v2);
    const vols = P => { const g = v => vdwReduit(Tr, v) - P; return [bis(g, 1 / 3 + 1e-12, v1), bis(g, v2, 1e9)]; };
    const aire = P => { const [l, g] = vols(P); return 8 * Tr / 3 * Math.log((3 * g - 1) / (3 * l - 1)) + 3 * (1 / g - 1 / l) - P * (g - l); };
    const p = bis(aire, Math.max(pmin, 0) + 1e-12, pmax), [vl, vg] = vols(p);
    return { p, vl, vg, spinodales: [v1, v2] };
  }
  /* isotherme réduite avec son palier : pr(vr), la pression lue sur le diagramme (P, v) */
  const isothermeReduite = Tr => { const m = maxwell(Tr); return vr => (m && vr > m.vl && vr < m.vg ? m.p : vdwReduit(Tr, vr)); };
  /* titre en vapeur, théorème des moments : x = (v − vl)/(vg − vl), pour v entre vl et vg */
  function titre(v, vl, vg) {
    if (!(vg > vl)) err("vg > vl attendu");
    if (!(v >= vl - 1e-12 && v <= vg + 1e-12)) err("v entre vl et vg attendu (mélange diphasé)");
    return Math.min(1, Math.max(0, (v - vl) / (vg - vl)));
  }

  /* chauffage de 1 kg d'eau à p constante, glace à T0 au départ : q (J·kg⁻¹) reçu → { T, etat, x, h, s }.
     etat ∈ glace, fusion, eau, ebullition, vapeur ; x : fraction fondue (fusion) ou vaporisée (ébullition) ; h = q ;
     s : entropie reçue depuis le départ, J·K⁻¹·kg⁻¹. Modèle : capacités constantes (EAU.c), Lf constante, palier de fusion
     à Tfusion(p), d'ébullition à TsatEau(p) avec Lvap(TsatEau(p)). Paliers : les q de début et de fin de chaque palier. */
  function chauffage(q, o = {}) {
    const p = pos(o.p == null ? K.atm : o.p, "p"), T0 = pos(o.T0 == null ? 250 : o.T0, "T0"), c = EAU.c;
    if (!(q >= 0)) err("q ≥ 0 attendu");
    const Tf = Tfusion(p), Te = TsatEau(p), Le = Lvap(Te);
    if (!(T0 <= Tf)) err("T0 ≤ Tf attendu : on part de la glace");
    const q1 = c.glace * (Tf - T0), q2 = q1 + EAU.Lf, q3 = q2 + c.eau * (Te - Tf), q4 = q3 + Le;
    const s1 = c.glace * Math.log(Tf / T0), s2 = s1 + EAU.Lf / Tf, s3 = s2 + c.eau * Math.log(Te / Tf), s4 = s3 + Le / Te;
    let r;
    if (q <= q1) { const T = T0 + q / c.glace; r = { T, etat: "glace", x: 0, s: c.glace * Math.log(T / T0) }; }
    else if (q <= q2) { const x = (q - q1) / EAU.Lf; r = { T: Tf, etat: "fusion", x, s: s1 + x * EAU.Lf / Tf }; }
    else if (q <= q3) { const T = Tf + (q - q2) / c.eau; r = { T, etat: "eau", x: 0, s: s2 + c.eau * Math.log(T / Tf) }; }
    else if (q <= q4) { const x = (q - q3) / Le; r = { T: Te, etat: "ebullition", x, s: s3 + x * Le / Te }; }
    else { const T = Te + (q - q4) / c.vapeur; r = { T, etat: "vapeur", x: 0, s: s4 + c.vapeur * Math.log(T / Te) }; }
    return Object.assign(r, { h: q, paliers: [q1, q2, q3, q4], Tf, Te, Le });
  }

  /* ---------- machines thermiques réelles (étape « Machines thermiques réelles », X.machines_thermiques.1 à 3) ---------- */
  const unit = (v, n) => { if (!(typeof v === "number" && v > 0 && v <= 1)) err(n + " dans ]0, 1] attendu, reçu " + v); return v; };
  /* air sec, gaz parfait diatomique : M = 28,965 g·mol⁻¹ (atmosphère type ISO 2533 : 28,9644), cp = 7r/2 = 1 004,7 J·kg⁻¹·K⁻¹
     (vrai cp, CoolProp 8.0.0 : 1 006 à 300 K, 1 054 à 600 K) */
  const AIR = Object.freeze({ M: 0.028965, r: R / 0.028965, cp: 3.5 * R / 0.028965, gamma: 1.4 });
  function composant(o) {
    const g = o.gaz || AIR, T1 = pos(o.T1, "T1"), p1 = pos(o.p1, "p1"), p2 = pos(o.p2, "p2"), type = o.type;
    const T2s = T1 * Math.pow(p2 / p1, g.r / g.cp), ws = g.cp * (T2s - T1);
    let w, T2;
    if (type === "compresseur") { if (!(p2 > p1)) err("compresseur : p2 > p1 attendu"); w = ws / unit(o.eta == null ? 1 : o.eta, "η"); T2 = T1 + w / g.cp; }
    else if (type === "turbine") { if (!(p2 < p1)) err("turbine : p2 < p1 attendu"); w = ws * unit(o.eta == null ? 1 : o.eta, "η"); T2 = T1 + w / g.cp; }
    else if (type === "detendeur") { if (!(p2 < p1)) err("détendeur : p2 < p1 attendu"); w = 0; T2 = T1; }
    else err("composant inconnu : " + type);
    return { T2, T2s, w, ws, q: 0, sc: g.cp * Math.log(T2 / T1) - g.r * Math.log(p2 / p1) };
  }

  /* machines dithermes : Tc chaud, Tf froid ; sigma = entropie créée par joule utile (K⁻¹) */
  const MODES = ["moteur", "pac", "frigo"];
  const mode = m => { if (!MODES.includes(m)) err("mode inconnu : " + m); return m; };
  function ditherme(m, Tc, Tf, sigma = 0) {
    mode(m); carnot(Tc, Tf); if (!(sigma >= 0 && isFinite(sigma))) err("σ ≥ 0 attendu, reçu " + sigma);
    const T0 = m === "frigo" ? Tc : Tf;                          // l'ambiance : où va la chaleur dont personne ne veut
    const e = m === "moteur" ? 1 - Tf / Tc - Tf * sigma : m === "pac" ? 1 / (1 - Tf / Tc + Tf * sigma) : 1 / (Tc / Tf - 1 + Tc * sigma);
    const rev = m === "moteur" ? 1 - Tf / Tc : m === "pac" ? Tc / (Tc - Tf) : Tf / (Tc - Tf);
    return { e, carnot: rev, T0, perdu: T0 * sigma };
  }
  function pincement(m, Tc, Tf, dT) {
    mode(m); carnot(Tc, Tf); if (!(dT >= 0 && isFinite(dT))) err("ΔT ≥ 0 attendu, reçu " + dT);
    const s = m === "moteur" ? -1 : 1, Th = Tc + s * dT, Tl = Tf - s * dT;   // le fluide est plus froid que la source chaude d'un moteur
    if (!(Th > Tl && Tl > 0)) err("pincement trop grand : le fluide n'a plus d'écart de température");
    const e = ditherme(m, Th, Tl).carnot;
    /* chaleur échangée par joule utile, à chaque source, et entropie créée dans les deux échangeurs */
    const qc = m === "frigo" ? Th / Tl : 1, qf = m === "frigo" ? 1 : Tl / Th;
    const sigma = m === "moteur" ? qc * (1 / Th - 1 / Tc) + qf * (1 / Tf - 1 / Tl) : qc * (1 / Tc - 1 / Th) + qf * (1 / Tl - 1 / Tf);
    return { e, sigma, Th, Tl };
  }
  const curzonAhlborn = (Tc, Tf) => { carnot(Tc, Tf); return 1 - Math.sqrt(Tf / Tc); };
  /* Curzon et Ahlborn, Am. J. Phys. 43, 22 (1975), tableau I : températures des sources (K), rendement observé */
  const CENTRALES = Object.freeze([
    Object.freeze({ id: "westThurrock", Tc: 838, Tf: 298, eta: 0.36 }),
    Object.freeze({ id: "candu", Tc: 573, Tf: 298, eta: 0.30 }),
    Object.freeze({ id: "larderello", Tc: 523, Tf: 353, eta: 0.16 }),
  ]);

  /* corps purs diphasés : tables de saturation [T (K), p (Pa), hl, hv (J·kg⁻¹), sl, sv (J·kg⁻¹·K⁻¹), vl, vv (m³·kg⁻¹)],
     calculées avec CoolProp 8.0.0 : eau, IAPWS-95 (Wagner et Pruß, J. Phys. Chem. Ref. Data 31, 387, 2002), états de
     référence u = s = 0 pour le liquide au point triple ; propane (R290), Lemmon, McLinden et Wagner (J. Chem. Eng. Data 54,
     3141, 2009), référence IIR (h = 200 kJ·kg⁻¹, s = 1 kJ·kg⁻¹·K⁻¹ pour le liquide saturé à 273,15 K). Seules les différences
     ont un sens. Dernière ligne : le point critique. Vapeur sèche du propane : lignes [Tsat, h, s pour ΔT = 0, 10, …, 80 K]. */
  const FLUIDES = Object.freeze({
    eau: Object.freeze({ M: 0.018015268, sat: [
      [273.16, 611.655, 1, 2500915, 0, 9155.5, 0.0010002, 205.99],
      [275, 698.451, 7760, 2504290, 28.3, 9106.6, 0.0010001, 181.6],
      [280, 991.82, 28796, 2513448, 104.1, 8977.9, 0.0010001, 130.19],
      [285, 1389.03, 49780, 2522587, 178.4, 8854.9, 0.0010005, 94.602],
      [290, 1920, 70729, 2531703, 251.3, 8737.4, 0.0010012, 69.625],
      [295, 2621.24, 91654, 2540794, 322.8, 8625, 0.0010022, 51.865],
      [300, 3536.81, 112565, 2549854, 393.1, 8517.4, 0.0010035, 39.078],
      [305, 4719.35, 133467, 2558881, 462.2, 8414.4, 0.001005, 29.764],
      [310, 6231.12, 154366, 2567869, 530.1, 8315.6, 0.0010067, 22.903],
      [315, 8145.08, 175266, 2576815, 597, 8221, 0.0010086, 17.795],
      [320, 10546, 196170, 2585711, 662.9, 8130.2, 0.0010107, 13.954],
      [325, 13531.5, 217079, 2594554, 727.7, 8043, 0.001013, 11.039],
      [330, 17213.2, 237997, 2603336, 791.5, 7959.2, 0.0010155, 8.805],
      [335, 21717.7, 258925, 2612051, 854.5, 7878.7, 0.0010181, 7.0788],
      [340, 27187.8, 279866, 2620693, 916.5, 7801.3, 0.0010209, 5.7339],
      [345, 33783.3, 300820, 2629254, 977.7, 7726.7, 0.0010239, 4.6776],
      [350, 41681.7, 321791, 2637727, 1038, 7654.9, 0.001027, 3.8419],
      [355, 51079.8, 342781, 2646104, 1097.5, 7585.7, 0.0010303, 3.1759],
      [360, 62193.6, 363791, 2654376, 1156.2, 7519, 0.0010337, 2.6414],
      [365, 75259.6, 384825, 2662535, 1214.2, 7454.5, 0.0010373, 2.2098],
      [370, 90535.2, 405884, 2670573, 1271.5, 7392.3, 0.001041, 1.859],
      [375, 108299, 426972, 2678479, 1328.1, 7332.1, 0.0010449, 1.5722],
      [380, 128853, 448092, 2686245, 1383.9, 7273.8, 0.001049, 1.3364],
      [385, 152520, 469247, 2693861, 1439.2, 7217.4, 0.0010532, 1.1414],
      [390, 179645, 490439, 2701316, 1493.8, 7162.7, 0.0010575, 0.97928],
      [395, 210597, 511673, 2708600, 1547.8, 7109.7, 0.001062, 0.84389],
      [400, 245769, 532953, 2715704, 1601.3, 7058.1, 0.0010667, 0.73024],
      [405, 285576, 554281, 2722615, 1654.1, 7008.1, 0.0010715, 0.63441],
      [410, 330454, 575662, 2729325, 1706.5, 6959.3, 0.0010765, 0.55323],
      [415, 380867, 597101, 2735821, 1758.3, 6911.9, 0.0010817, 0.48418],
      [420, 437297, 618601, 2742094, 1809.7, 6865.6, 0.001087, 0.4252],
      [425, 500251, 640167, 2748131, 1860.6, 6820.5, 0.0010926, 0.37463],
      [430, 570260, 661804, 2753923, 1911, 6776.4, 0.0010983, 0.3311],
      [435, 647874, 683516, 2759459, 1961, 6733.3, 0.0011042, 0.2935],
      [440, 733669, 705310, 2764726, 2010.6, 6691.1, 0.0011103, 0.2609],
      [445, 828240, 727190, 2769714, 2059.8, 6649.8, 0.0011166, 0.23255],
      [450, 932204, 749162, 2774411, 2108.7, 6609.2, 0.0011232, 0.20781],
      [455, 1046200, 771232, 2778805, 2157.1, 6569.4, 0.0011299, 0.18616],
      [460, 1170890, 793406, 2782883, 2205.3, 6530.3, 0.0011369, 0.16715],
      [465, 1306950, 815691, 2786633, 2253.2, 6491.7, 0.0011442, 0.15041],
      [470, 1455080, 838094, 2790041, 2300.7, 6453.8, 0.0011517, 0.13564],
      [475, 1616010, 860622, 2793094, 2348, 6416.4, 0.0011594, 0.12255],
      [480, 1790470, 883283, 2795777, 2395, 6379.4, 0.0011675, 0.11094],
      [485, 1979230, 906085, 2798074, 2441.8, 6342.8, 0.0011758, 0.10061],
      [490, 2183070, 929037, 2799968, 2488.4, 6306.6, 0.0011845, 0.09139],
      [495, 2402780, 952149, 2801443, 2534.8, 6270.8, 0.0011935, 0.083149],
      [500, 2639200, 975431, 2802478, 2581, 6235.1, 0.0012029, 0.075764],
      [505, 2893150, 998892, 2803055, 2627.1, 6199.7, 0.0012127, 0.069131],
      [510, 3165500, 1022546, 2803152, 2673.1, 6164.5, 0.0012228, 0.063161],
      [515, 3457130, 1046404, 2802745, 2718.9, 6129.3, 0.0012334, 0.057776],
      [520, 3768950, 1070481, 2801808, 2764.7, 6094.2, 0.0012445, 0.05291],
      [525, 4101880, 1094790, 2800313, 2810.4, 6059.1, 0.0012561, 0.048503],
      [530, 4456860, 1119349, 2798232, 2856.1, 6023.9, 0.0012682, 0.044503],
      [535, 4834870, 1144176, 2795528, 2901.9, 5988.5, 0.0012809, 0.040868],
      [540, 5236910, 1169291, 2792167, 2947.6, 5953, 0.0012942, 0.037556],
      [545, 5663990, 1194714, 2788106, 2993.5, 5917.1, 0.0013083, 0.034535],
      [550, 6117180, 1220473, 2783300, 3039.4, 5880.9, 0.0013231, 0.031772],
      [555, 6597560, 1246593, 2777697, 3085.5, 5844.3, 0.0013387, 0.029242],
      [560, 7106250, 1273108, 2771238, 3131.9, 5807.1, 0.0013553, 0.02692],
      [565, 7644410, 1300054, 2763855, 3178.5, 5769.3, 0.0013729, 0.024786],
      [570, 8213230, 1327471, 2755473, 3225.4, 5730.7, 0.0013917, 0.02282],
      [575, 8813980, 1355409, 2746001, 3272.7, 5691.2, 0.0014118, 0.021005],
      [580, 9447970, 1383925, 2735334, 3320.5, 5650.6, 0.0014334, 0.019328],
      [585, 10116500, 1413087, 2723349, 3369, 5608.7, 0.0014567, 0.017773],
      [590, 10821200, 1442976, 2709895, 3418.1, 5565.4, 0.001482, 0.016329],
      [595, 11563400, 1473692, 2694792, 3468, 5520.3, 0.0015095, 0.014984],
      [600, 12344800, 1505360, 2677815, 3519, 5473.1, 0.0015399, 0.013728],
      [605, 13167200, 1538138, 2658678, 3571.3, 5423.4, 0.0015735, 0.012552],
      [610, 14032600, 1572238, 2637011, 3625.2, 5370.7, 0.0016112, 0.011446],
      [615, 14942900, 1607958, 2612318, 3681.1, 5314.2, 0.0016541, 0.0104],
      [620, 15900600, 1645735, 2583899, 3739.6, 5252.8, 0.0017039, 0.0094067],
      [625, 16908300, 1686270, 2550716, 3801.9, 5185.1, 0.0017634, 0.0084538],
      [630, 17969000, 1730743, 2511079, 3869.8, 5108.4, 0.0018374, 0.0075279],
      [635, 19086300, 1781240, 2461842, 3946.3, 5018.1, 0.0019353, 0.0066074],
      [640, 20265200, 1841773, 2395505, 4037.5, 4902.7, 0.0020767, 0.0056451],
      [642, 20755900, 1871118, 2359672, 4081.7, 4842.7, 0.0021567, 0.0052211],
      [644, 21258900, 1907355, 2312575, 4136.3, 4765.5, 0.0022689, 0.0047395],
      [646, 21774900, 1963490, 2238063, 4221.4, 4646.5, 0.0024816, 0.0041074],
      [647, 22038400, 2029438, 2148560, 4322.4, 4506.5, 0.0027984, 0.0034903],
      [647.096, 22064000, 2084256, 2084256, 4407, 4407, 0.0031056, 0.0031056]] }),
    propane: Object.freeze({ M: 0.04409562, sat: [
      [200, 20192, 32531, 488630, 292.6, 2573.1, 0.0016249, 1.846],
      [205, 27192.2, 43213, 494630, 345.3, 2547.4, 0.0016393, 1.401],
      [210, 36032.5, 53981, 500644, 397.1, 2524.1, 0.0016541, 1.0794],
      [215, 47041.1, 64840, 506665, 448.2, 2503.2, 0.0016694, 0.84324],
      [220, 60574.5, 75797, 512687, 498.4, 2484.3, 0.0016851, 0.66712],
      [225, 77016.3, 86857, 518702, 548, 2467.3, 0.0017013, 0.53395],
      [230, 96775.6, 98027, 524706, 597, 2452.1, 0.001718, 0.43193],
      [235, 120285, 109313, 530690, 645.3, 2438.4, 0.0017353, 0.35285],
      [240, 148000, 120721, 536648, 693.2, 2426.2, 0.0017532, 0.29084],
      [245, 180395, 132259, 542571, 740.5, 2415.3, 0.0017717, 0.24172],
      [250, 217964, 143934, 548452, 787.4, 2405.5, 0.001791, 0.20242],
      [255, 261218, 155753, 554283, 833.9, 2396.8, 0.0018111, 0.17069],
      [260, 310684, 167724, 560053, 880.1, 2389, 0.001832, 0.14486],
      [265, 366903, 179856, 565753, 925.9, 2382.1, 0.0018539, 0.12365],
      [270, 430429, 192158, 571373, 971.4, 2375.9, 0.0018768, 0.10612],
      [275, 501830, 204640, 576899, 1016.7, 2370.4, 0.0019008, 0.091512],
      [280, 581686, 217311, 582319, 1061.9, 2365.5, 0.0019261, 0.079264],
      [285, 670588, 230185, 587618, 1106.8, 2361, 0.0019528, 0.06893],
      [290, 769140, 243273, 592778, 1151.7, 2356.9, 0.0019811, 0.060156],
      [295, 877961, 256591, 597781, 1196.4, 2353, 0.0020111, 0.052665],
      [300, 997683, 270154, 602603, 1241.2, 2349.4, 0.0020431, 0.046233],
      [305, 1128950, 283982, 607219, 1286, 2345.8, 0.0020774, 0.040681],
      [310, 1272440, 298097, 611596, 1331, 2342.3, 0.0021144, 0.035864],
      [315, 1428840, 312525, 615697, 1376.1, 2338.5, 0.0021544, 0.031662],
      [320, 1598860, 327299, 619473, 1421.4, 2334.5, 0.0021981, 0.027978],
      [325, 1783260, 342458, 622866, 1467.2, 2330, 0.0022462, 0.024732],
      [330, 1982840, 358055, 625798, 1513.4, 2324.7, 0.0022996, 0.021855],
      [335, 2198460, 374158, 628160, 1560.3, 2318.5, 0.0023597, 0.019288],
      [340, 2431050, 390861, 629801, 1608.2, 2310.9, 0.0024285, 0.016984],
      [345, 2681660, 408303, 630507, 1657.3, 2301.4, 0.0025089, 0.014895],
      [350, 2951450, 426696, 629953, 1708.2, 2289, 0.0026058, 0.012982],
      [355, 3241820, 446409, 627598, 1761.9, 2272.3, 0.0027278, 0.0112],
      [360, 3554540, 468177, 622364, 1820.4, 2248.7, 0.0028937, 0.0094903],
      [365, 3892110, 494009, 611327, 1888.8, 2210.2, 0.0031578, 0.0077337],
      [367, 4035000, 507021, 603095, 1923.1, 2184.9, 0.0033354, 0.0069369],
      [368, 4108350, 514982, 596943, 1944.1, 2166.8, 0.0034661, 0.0064741],
      [369, 4183140, 525406, 587454, 1971.6, 2139.8, 0.0036715, 0.0058964],
      [369.89, 4251170, 555235, 555235, 2051.6, 2051.6, 0.0045356, 0.0045356]], vapeur: Object.freeze({ pas: 10, lignes: [
      [230, 524706, 2452.1, 539201, 2513.8, 554014, 2574.2, 569168, 2633.7, 584686, 2692.2, 600585, 2750.1, 616882, 2807.2, 633588, 2863.9, 650713, 2920],
      [235, 530690, 2438.4, 545468, 2500, 560556, 2560.4, 575981, 2619.7, 591765, 2678.2, 607929, 2735.9, 624487, 2793, 641454, 2849.5, 658838, 2905.6],
      [240, 536648, 2426.2, 551722, 2487.7, 567096, 2548, 582801, 2607.3, 598861, 2665.7, 615296, 2723.4, 632124, 2780.4, 649356, 2836.9, 667004, 2892.9],
      [245, 542571, 2415.3, 557955, 2476.8, 573628, 2537.1, 589623, 2596.3, 605967, 2654.7, 622683, 2712.3, 639786, 2769.4, 657290, 2825.8, 675207, 2881.8],
      [250, 548452, 2405.5, 564160, 2467.1, 580144, 2527.4, 596441, 2586.7, 613080, 2645.1, 630083, 2702.7, 647469, 2759.7, 665252, 2816.2, 683443, 2872.1],
      [255, 554283, 2396.8, 570331, 2458.5, 586640, 2518.9, 603249, 2578.2, 620192, 2636.7, 637492, 2694.3, 655168, 2751.4, 673236, 2807.8, 691706, 2863.8],
      [260, 560053, 2389, 576459, 2450.9, 593107, 2511.5, 610042, 2570.9, 627299, 2629.4, 644904, 2687.1, 662879, 2744.2, 681237, 2800.7, 699993, 2856.7],
      [265, 565753, 2382.1, 582537, 2444.3, 599540, 2505, 616814, 2564.6, 634396, 2623.2, 652316, 2681, 670595, 2738.1, 689252, 2794.6, 708298, 2850.7],
      [270, 571373, 2375.9, 588556, 2438.4, 605931, 2499.4, 623557, 2559.1, 641476, 2617.9, 659720, 2675.8, 678314, 2733, 697275, 2789.6, 716618, 2845.7],
      [275, 576899, 2370.4, 594506, 2433.3, 612273, 2494.6, 630267, 2554.5, 648535, 2613.5, 667113, 2671.5, 686029, 2728.9, 705301, 2785.5, 724947, 2841.7],
      [280, 582319, 2365.5, 600379, 2428.8, 618558, 2490.5, 636935, 2550.7, 655565, 2609.9, 674489, 2668.1, 693735, 2725.5, 713327, 2782.3, 733281, 2838.5],
      [285, 587618, 2361, 606162, 2424.9, 624777, 2487, 643556, 2547.5, 662562, 2606.9, 681841, 2665.4, 701427, 2723, 721346, 2779.9, 741615, 2836.2],
      [290, 592778, 2356.9, 611844, 2421.5, 630921, 2484, 650120, 2545, 669517, 2604.7, 689165, 2663.3, 709101, 2721.1, 729354, 2778.2, 749945, 2834.6],
      [295, 597781, 2353, 617412, 2418.5, 636980, 2481.6, 656621, 2543, 676425, 2603, 696453, 2661.9, 716750, 2719.9, 737346, 2777.1, 758267, 2833.7],
      [300, 602603, 2349.4, 622851, 2415.8, 642943, 2479.6, 663050, 2541.4, 683278, 2601.8, 703701, 2661, 724369, 2719.3, 745317, 2776.6, 766574, 2833.3],
      [305, 607219, 2345.8, 628144, 2413.3, 648798, 2477.9, 669397, 2540.3, 690069, 2601.1, 710902, 2660.7, 731952, 2719.1, 753262, 2776.7, 774863, 2833.6],
      [310, 611596, 2342.3, 633272, 2411.1, 654532, 2476.5, 675651, 2539.5, 696790, 2600.8, 718047, 2660.7, 739493, 2719.5, 761176, 2777.3, 783130, 2834.3],
      [315, 615697, 2338.5, 638214, 2408.9, 660130, 2475.3, 681804, 2539.1, 703431, 2600.9, 725132, 2661.1, 746987, 2720.2, 769052, 2778.3, 791368, 2835.5],
      [320, 619473, 2334.5, 642943, 2406.7, 665576, 2474.3, 687842, 2538.8, 709984, 2601.2, 732147, 2661.9, 754426, 2721.3, 776886, 2779.7, 799573, 2837.1],
      [325, 622866, 2330, 647430, 2404.4, 670851, 2473.3, 693752, 2538.8, 716439, 2601.8, 739086, 2663, 761805, 2722.8, 784672, 2781.4, 807740, 2839.1],
      [330, 625798, 2324.7, 651639, 2401.9, 675935, 2472.3, 699522, 2538.8, 722785, 2602.5, 745939, 2664.3, 769116, 2724.5, 792404, 2783.4, 815864, 2841.4],
      [335, 628160, 2318.5, 655531, 2399.1, 680806, 2471.3, 705135, 2538.9, 729012, 2603.4, 752698, 2665.8, 776352, 2726.4, 800075, 2785.7, 823938, 2843.9],
      [340, 629801, 2310.9, 659058, 2395.8, 685438, 2470.1, 710575, 2539, 735106, 2604.4, 759354, 2667.4, 783504, 2728.5, 807679, 2788.2, 831958, 2846.7],
      [345, 630507, 2301.4, 662164, 2391.9, 689803, 2468.6, 715824, 2539, 741056, 2605.4, 765895, 2669.1, 790565, 2730.8, 815208, 2790.9, 839917, 2849.7],
      [350, 629953, 2289, 664783, 2387.1, 693869, 2466.9, 720862, 2538.9, 746847, 2606.4, 772311, 2670.8, 797525, 2733.1, 822654, 2793.6, 847807, 2852.8]] }) }),
  });
  const fluide = f => { const F = typeof f === "string" ? FLUIDES[f] : f; if (!F || !F.sat) err("fluide inconnu : " + f); return F; };
  const critique = f => { const t = fluide(f).sat, c = t[t.length - 1]; return { T: c[0], p: c[1], h: c[2], s: c[4] }; };
  function saturation(f, T) {
    const t = fluide(f).sat, n = t.length;
    if (!(T >= t[0][0] && T <= t[n - 1][0])) err("T = " + T + " K hors de la table de saturation [" + t[0][0] + ", " + t[n - 1][0] + "]");
    let i = 0, j = n - 1;
    while (j - i > 1) { const k = (i + j) >> 1; if (t[k][0] <= T) i = k; else j = k; }
    const a = t[i], b = t[j], u = (T - a[0]) / (b[0] - a[0]), lin = k => a[k] + u * (b[k] - a[k]);
    const v = (1 / T - 1 / a[0]) / (1 / b[0] - 1 / a[0]), log = k => Math.exp(Math.log(a[k]) + v * (Math.log(b[k]) - Math.log(a[k])));   // ln p affine en 1/T
    const hl = lin(2), hv = lin(3);
    return { T, p: log(1), hl, hv, sl: lin(4), sv: lin(5), vl: lin(6), vv: log(7), L: hv - hl };
  }
  function Tsat(f, p) {
    const t = fluide(f).sat; pos(p, "p");
    let lo = t[0][0], hi = t[t.length - 1][0];
    if (!(p >= t[0][1] && p <= t[t.length - 1][1])) err("p = " + p + " Pa hors de la table de saturation");
    for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (saturation(f, m).p < p) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* mélange liquide-vapeur de titre x à T : règle des moments */
  function melange(f, T, x) {
    if (!(x >= 0 && x <= 1)) err("titre x dans [0, 1] attendu, reçu " + x);
    const s = saturation(f, T);
    return { T, p: s.p, x, h: s.hl + x * s.L, s: s.sl + x * (s.sv - s.sl), v: s.vl + x * (s.vv - s.vl) };
  }
  /* vapeur sèche à la pression de saturation de Tsat, repérée par cle = { dT } (surchauffe, K), { s } ou { h } */
  function vapeur(f, Ts, cle) {
    const V = fluide(f).vapeur; if (!V) err("pas de table de vapeur sèche pour ce fluide");
    const L = V.lignes, n = L.length;
    if (!(Ts >= L[0][0] && Ts <= L[n - 1][0])) err("Tsat = " + Ts + " K hors de la table de vapeur [" + L[0][0] + ", " + L[n - 1][0] + "]");
    const ligne = row => {
      const m = (row.length - 1) / 2, H = k => row[1 + 2 * k], S = k => row[2 + 2 * k];
      let k, u;
      if (cle.dT != null) { const q = cle.dT / V.pas; k = Math.min(Math.max(Math.floor(q), 0), m - 2); u = q - k; }
      else {
        const Y = cle.s != null ? S : H, y = cle.s != null ? cle.s : cle.h;
        if (!isFinite(y)) err("clé { dT }, { s } ou { h } attendue");
        k = 0; while (k < m - 2 && Y(k + 1) < y) k++;
        u = (y - Y(k)) / (Y(k + 1) - Y(k));
      }
      return { dT: V.pas * (k + u), h: H(k) + u * (H(k + 1) - H(k)), s: S(k) + u * (S(k + 1) - S(k)) };
    };
    let i = Math.min(Math.floor((Ts - L[0][0]) / (L[1][0] - L[0][0])), n - 2);
    const a = ligne(L[i]), b = ligne(L[i + 1]), u = (Ts - L[i][0]) / (L[i + 1][0] - L[i][0]), lin = k => a[k] + u * (b[k] - a[k]);
    const dT = lin("dT");
    if (dT < -0.5) err("état diphasé : sous la courbe de rosée");
    if (dT > V.pas * ((L[0].length - 1) / 2 - 1) + 1e-9) err("surchauffe au-delà de la table");
    return { T: Ts + dT, dT, p: saturation(f, Ts).p, h: lin("h"), s: lin("s") };
  }
  /* cycle de Rankine sans surchauffe : 1 liquide saturé à Tf → pompe → 2 → chaudière → 3 vapeur saturée à Tc → turbine → 4 → condenseur */
  function rankine(o) {
    const f = o.fluide || "eau", Tc = pos(o.Tc, "Tc"), Tf = pos(o.Tf, "Tf"), etaT = unit(o.etaT == null ? 1 : o.etaT, "ηT");
    if (!(Tc > Tf)) err("Tc > Tf attendu");
    const b = saturation(f, Tf), c = saturation(f, Tc), wP = b.vl * (c.p - b.p);   // liquide incompressible, pompe isentropique
    const e1 = { T: Tf, p: b.p, h: b.hl, s: b.sl, x: 0 }, e2 = { T: Tf, p: c.p, h: b.hl + wP, s: b.sl, x: null };
    const e3 = { T: Tc, p: c.p, h: c.hv, s: c.sv, x: 1 };
    const x4s = (e3.s - b.sl) / (b.sv - b.sl);
    if (!(x4s >= 0 && x4s <= 1)) err("détente isentropique hors du domaine diphasé");
    const h4 = e3.h - etaT * (e3.h - (b.hl + x4s * b.L)), x4 = (h4 - b.hl) / b.L;
    if (x4 > 1) err("vapeur surchauffée en sortie de turbine : hors du modèle");
    const e4 = { T: Tf, p: b.p, h: h4, s: b.sl + x4 * (b.sv - b.sl), x: x4 };
    const wT = e3.h - e4.h, qC = e3.h - e2.h, qF = e4.h - e1.h;
    return { etats: { 1: e1, 2: e2, 3: e3, 4: e4 }, wT, wP, qC, qF, eta: (wT - wP) / qC, carnot: 1 - Tf / Tc, x4s, sc: { turbine: e4.s - e3.s } };
  }
  /* cycle à compression de vapeur : 1 vapeur à Te (surchauffée de dTs) → compresseur → 2 → condenseur → 3 liquide saturé à Tc
     → détendeur (isenthalpe) → 4 → évaporateur */
  function compressionVapeur(o) {
    const f = o.fluide || "propane", Te = pos(o.Te, "Te"), Tc = pos(o.Tc, "Tc"), etaC = unit(o.etaC == null ? 1 : o.etaC, "ηC");
    const dTs = o.surchauffe || 0;
    if (!(Tc > Te)) err("Tc > Te attendu");
    const ev = saturation(f, Te), co = saturation(f, Tc);
    const e1 = Object.assign(dTs > 0 ? vapeur(f, Te, { dT: dTs }) : { T: Te, p: ev.p, h: ev.hv, s: ev.sv }, { x: dTs > 0 ? null : 1 });
    const e2s = vapeur(f, Tc, { s: e1.s }), e2 = Object.assign(vapeur(f, Tc, { h: e1.h + (e2s.h - e1.h) / etaC }), { x: null });
    const e3 = { T: Tc, p: co.p, h: co.hl, s: co.sl, x: 0 }, x4 = (co.hl - ev.hl) / ev.L;
    const e4 = { T: Te, p: ev.p, h: co.hl, s: ev.sl + x4 * (ev.sv - ev.sl), x: x4 };
    const w = e2.h - e1.h, qF = e1.h - e4.h, qC = e2.h - e3.h;
    return { etats: { 1: e1, 2: e2, 3: e3, 4: e4 }, e2s, w, qF, qC, cop: { frigo: qF / w, pac: qC / w },
      carnot: { frigo: Te / (Tc - Te), pac: Tc / (Tc - Te) }, sc: { compresseur: e2.s - e1.s, detendeur: e4.s - e3.s } };
  }

  const api = {
    /* premier et second principes */ C_EAU, palettes, cv, cycleCarnot, arbitre, couplage, trois, efficacites, vitesseSon,
    /* température thermodynamique */ T_PT, temperature, carnot, chaine,
    /* entropie */ pression, dS, chemin, joule, contact, thermostats,
    /* énergie interne, élastique */ GAZ, vdw, dUdX, joulevdw, ecarts, cpMoinsCv, thermoelastiques, CAOUTCHOUC, contrainte, travail, adiabatique,
    /* corps pur diphasé */ EAU, psat, dpsat, rhoLiq, rhoVap, saturationEau, Lvap, TsatEau, pFusion, dpFusion, Tfusion, pSublimation,
    dpSublimation, phaseEau, clapeyron, latenteClapeyron, clausiusClapeyron, negligesCC, vdwReduit, maxwell, isothermeReduite, titre, chauffage,
    /* machines thermiques réelles */ AIR, composant, MODES, ditherme, pincement, curzonAhlborn, CENTRALES, FLUIDES, critique, saturation, Tsat,
    melange, vapeur, rankine, compressionVapeur };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Thermo = api;
})(typeof self !== "undefined" ? self : this);

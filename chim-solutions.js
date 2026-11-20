/* Solutions aqueuses, monde « chim-solutions » : module commun. Pure, no DOM, UMD (global ChimSolutions).
   Units: amounts in mol, volumes in L, concentrations in mol·L⁻¹ (c° = 1 mol·L⁻¹), potentials in V, T in K.
   Started by the step « Oxydoréduction » (X.chim_redox.1 to 3). Other steps extend it with Edit, in their own section.

   Species are written as plain strings: "MnO4^-", "Cr2O7^2-", "Fe^3+", "H2O", "Cu", "Fe(CN)6^3-".
     formule(s)                  { atomes: { Mn: 1, O: 4 }, charge: −1 }.
     texte(s)                    "MnO₄⁻" : subscripts and superscripts, for display.
     nombreOxydation(s, X)       oxidation number of element X in s (mean value if several atoms of X: 2,5 for S in S4O6^2-).
                                 Fixed values for the other elements: F −1, O −2, H +1, alkali +1, alkaline earth +2.
                                 The element asked loses its rule: O in H2O2 gives −1, H in NaH gives −1.
                                 Throws if another element without a rule is present (two unknowns).
   Oxydoréduction. An equation is { gauche: { espèce: ν }, droite: { espèce: ν } }, "e-" for the electron.
     demiEquation(ox, red, milieu)  ox + … + n e⁻ = red + …, balanced in "acide" (H⁺, H₂O) or "basique" (HO⁻, H₂O) medium,
                                 smallest integers: { gauche, droite, n }. Throws if ox is not the oxidant of red.
     bilan(c1, c2, milieu)       the oxidant of couple c1 = { ox, red } on the reductant of couple c2, electrons cancelled
                                 with the least common multiple: { gauche, droite, n } (n electrons exchanged).
     cote(o), ecrire(eq)         "MnO₄⁻ + 8 H⁺ + 5 e⁻" (one side), "MnO₄⁻ + 8 H⁺ + 5 e⁻ = Mn²⁺ + 4 H₂O" (both).
     COUPLES                     { id, ox, red, E0 } at 298,15 K, aqueous, standard state p° = 1 bar, c° = 1 mol·L⁻¹.
     phase(s)                    "solvant" (H2O), "solide" (a metal), "gaz" (H2, O2, Cl2) or "aq".
     pente(T)                    RT ln 10/F, V: 0,059 16 V at 298,15 K.
     quotient(eq, a)             Π a(droite)^ν / Π a(gauche)^ν; an activity left out is 1 (solvent, solid); "e-" is ignored.
     nernst(E0, n, q, T)         E = E0 + (RT/nF) ln q, q = Π a(ox side)^ν / Π a(red side)^ν of the half-equation.
     potentiel(couple, a, milieu, T)  Nernst for a couple, its half-equation built here; a = activities (c/c°, p/p°).
     lgK(E0ox, E0red, n, T)      log₁₀ K° = n (E°ox − E°red)/pente(T), from ΔrG° = −nF ΔE° = −RT ln K°.
     etatFinal(eq, n0, lgK, o)   final amounts of eq from n0 (mol), log₁₀ K°, o = { V (L), phases, fixes }:
                                 fixes = { espèce: activity } held constant (buffered H⁺) and not counted.
                                 Solves Q = K°, or stops when a reactant is used up (rupture), forward or backward.
                                 { xi, n, total, sens: 1|−1|0 }. A remainder as small as 10⁻⁴⁰ mol is computed, not rounded to 0.
     pile(A, B, T)               two metal electrodes M^z+/M: A, B = { E0, z, c, V, m? (mol of metal, default unlimited) }.
                                 { plus: "A"|"B", n, xiMax, Q (C), e0 (V), etat(xi) → { Eplus, Emoins, e, c+ , c− } }. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("./constantes.js") : root.Constantes;
  const F_ = Cst.N_A * Cst.e;                        // Faraday constant, exact since 2019: 96 485,332 12… C·mol⁻¹
  const C0 = 1, P0 = 1e5, T0 = 298.15;
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a), lcm = (a, b) => a / gcd(a, b) * b;

  /* ---------- formules ---------- */
  function formule(s) {
    const m = /^(.*?)(?:\^(\d*)([+-]))?$/.exec(s);
    const corps = m[1], charge = m[3] ? (m[3] === "+" ? 1 : -1) * (m[2] ? +m[2] : 1) : 0;
    let i = 0;
    const groupe = () => {
      const at = {};
      while (i < corps.length && corps[i] !== ")") {
        let sous;
        if (corps[i] === "(") { i++; sous = groupe(); if (corps[i++] !== ")") throw new Error("formule : parenthèse ouverte dans " + s); }
        else { const e = /^[A-Z][a-z]?/.exec(corps.slice(i)); if (!e) throw new Error("formule : « " + s + " » illisible"); i += e[0].length; sous = { [e[0]]: 1 }; }
        const d = /^\d+/.exec(corps.slice(i)), k = d ? +d[0] : 1; if (d) i += d[0].length;
        for (const X in sous) at[X] = (at[X] || 0) + k * sous[X];
      }
      return at;
    };
    const atomes = groupe();
    if (i !== corps.length || !Object.keys(atomes).length) throw new Error("formule : « " + s + " » illisible");
    return { atomes, charge };
  }
  const SUB = "₀₁₂₃₄₅₆₇₈₉", SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function texte(s) {
    if (s === "e-") return "e⁻";
    const m = /^(.*?)(?:\^(\d*)([+-]))?$/.exec(s);
    return m[1].replace(/\d/g, d => SUB[d]) + (m[3] ? (m[2] || "").replace(/\d/g, d => SUP[d]) + (m[3] === "+" ? "⁺" : "⁻") : "");
  }
  const REGLES = { F: -1, O: -2, H: 1, Li: 1, Na: 1, K: 1, Rb: 1, Cs: 1, Be: 2, Mg: 2, Ca: 2, Sr: 2, Ba: 2 };
  function nombreOxydation(s, X) {
    const f = formule(s);
    if (!f.atomes[X]) throw new Error(X + " absent de " + s);
    let reste = f.charge;
    for (const Y in f.atomes) {
      if (Y === X) continue;
      if (!(Y in REGLES)) throw new Error("nombreOxydation : " + Y + " et " + X + " inconnus tous deux dans " + s);
      reste -= REGLES[Y] * f.atomes[Y];
    }
    return reste / f.atomes[X];
  }

  /* ---------- équations ---------- */
  const OH = new Set(["O", "H"]);
  /* net map: positive = left (oxidant side), negative = right */
  function versCotes(net) {
    const g = {}, d = {};
    for (const k in net) if (net[k] > 0) g[k] = net[k]; else if (net[k] < 0) d[k] = -net[k];
    return { gauche: g, droite: d };
  }
  function demiNet(ox, red, milieu) {
    const fo = formule(ox), fr = formule(red);
    const elems = [...new Set([...Object.keys(fo.atomes), ...Object.keys(fr.atomes)])];
    const lourds = elems.filter(X => !OH.has(X));
    let X = lourds[0];
    if (!X) X = ["O", "H"].find(Y => fo.atomes[Y] && fr.atomes[Y] && nombreOxydation(ox, Y) !== nombreOxydation(red, Y));
    if (!X || !fo.atomes[X] || !fr.atomes[X]) throw new Error("demiEquation : " + ox + " et " + red + " ne forment pas un couple");
    const g = gcd(fo.atomes[X], fr.atomes[X]), a = fr.atomes[X] / g, b = fo.atomes[X] / g;
    for (const Y of lourds) if (a * (fo.atomes[Y] || 0) !== b * (fr.atomes[Y] || 0)) throw new Error("demiEquation : " + Y + " ne s'équilibre pas entre " + ox + " et " + red);
    const at = (f, Y) => f.atomes[Y] || 0;
    const w = OH.has(X) ? 0 : a * at(fo, "O") - b * at(fr, "O");          // H₂O on the right when w > 0
    const h = b * at(fr, "H") + 2 * w - a * at(fo, "H");                  // H⁺ on the left when h > 0
    const n = a * fo.charge + h - b * fr.charge;
    if (!(n > 0)) throw new Error("demiEquation : " + ox + " n'est pas l'oxydant de " + red);
    const net = {};
    const add = (k, v) => { if (v) net[k] = (net[k] || 0) + v; };
    add(ox, a); add(red, -b); add("H2O", -w); add("H^+", h); add("e-", n);
    if (milieu === "basique" && net["H^+"]) { const k = net["H^+"]; delete net["H^+"]; add("H2O", k); add("HO^-", -k); if (!net.H2O) delete net.H2O; }
    return { net, n };
  }
  function demiEquation(ox, red, milieu = "acide") {
    const { net, n } = demiNet(ox, red, milieu);
    return Object.assign(versCotes(net), { n });
  }
  function bilan(c1, c2, milieu = "acide") {
    const h1 = demiNet(c1.ox, c1.red, milieu), h2 = demiNet(c2.ox, c2.red, milieu);
    const n = lcm(h1.n, h2.n), k1 = n / h1.n, k2 = n / h2.n, net = {};
    for (const s in h1.net) net[s] = (net[s] || 0) + k1 * h1.net[s];
    for (const s in h2.net) net[s] = (net[s] || 0) - k2 * h2.net[s];
    delete net["e-"];
    const all = Object.values(net).filter(v => v).map(Math.abs), g = all.reduce(gcd, 0) || 1;
    for (const s in net) net[s] /= g;
    return Object.assign(versCotes(net), { n: n / g });
  }
  const ORDRE = s => s === "e-" ? 4 : s === "H2O" ? 3 : s === "HO^-" ? 2 : s === "H^+" ? 1 : 0;
  const cote = o => Object.keys(o).sort((a, b) => ORDRE(a) - ORDRE(b)).map(s => (o[s] === 1 ? "" : o[s] + " ") + texte(s)).join(" + ");
  const ecrire = (eq, signe = "=") => cote(eq.gauche) + " " + signe + " " + cote(eq.droite);

  /* ---------- potentiels ---------- */
  /* E° at 298,15 K vs the standard hydrogen electrode. Bard, Parsons, Jordan, « Standard Potentials in Aqueous Solution » (1985)
     and Vanýsek, CRC Handbook of Chemistry and Physics, « Electrochemical series », rounded to 0,01 V. */
  const COUPLES = Object.freeze([
    { id: "mg", ox: "Mg^2+", red: "Mg", E0: -2.37 },
    { id: "al", ox: "Al^3+", red: "Al", E0: -1.66 },
    { id: "zn", ox: "Zn^2+", red: "Zn", E0: -0.76 },
    { id: "fe2", ox: "Fe^2+", red: "Fe", E0: -0.44 },
    { id: "ni", ox: "Ni^2+", red: "Ni", E0: -0.26 },
    { id: "pb", ox: "Pb^2+", red: "Pb", E0: -0.13 },
    { id: "h", ox: "H^+", red: "H2", E0: 0 },
    { id: "s4o6", ox: "S4O6^2-", red: "S2O3^2-", E0: 0.08 },
    { id: "cu21", ox: "Cu^2+", red: "Cu^+", E0: 0.16 },
    { id: "cu", ox: "Cu^2+", red: "Cu", E0: 0.34 },
    { id: "cu1", ox: "Cu^+", red: "Cu", E0: 0.52 },
    { id: "i2", ox: "I2", red: "I^-", E0: 0.54 },
    { id: "o2h2o2", ox: "O2", red: "H2O2", E0: 0.70 },
    { id: "fe32", ox: "Fe^3+", red: "Fe^2+", E0: 0.77 },
    { id: "ag", ox: "Ag^+", red: "Ag", E0: 0.80 },
    { id: "o2", ox: "O2", red: "H2O", E0: 1.23 },
    { id: "cr", ox: "Cr2O7^2-", red: "Cr^3+", E0: 1.33 },
    { id: "cl2", ox: "Cl2", red: "Cl^-", E0: 1.36 },
    { id: "mn", ox: "MnO4^-", red: "Mn^2+", E0: 1.51 },
    { id: "h2o2", ox: "H2O2", red: "H2O", E0: 1.78 },
  ].map(Object.freeze));
  const GAZ = new Set(["H2", "O2", "Cl2"]);
  function phase(s) {
    if (s === "H2O") return "solvant";
    if (GAZ.has(s)) return "gaz";
    const f = formule(s), X = Object.keys(f.atomes);
    return f.charge === 0 && X.length === 1 && !/^(I|Br|Cl|F|O|H|N|S)$/.test(X[0]) ? "solide" : "aq";
  }
  const pente = (T = T0) => Cst.R * T * Math.LN10 / F_;
  function quotient(eq, a = {}) {
    let l = 0;
    for (const s in eq.droite) if (s !== "e-" && s in a) l += eq.droite[s] * Math.log(a[s]);
    for (const s in eq.gauche) if (s !== "e-" && s in a) l -= eq.gauche[s] * Math.log(a[s]);
    return Math.exp(l);
  }
  /* q is written ox side over red side, the reverse of the reaction quotient of the reduction */
  const nernst = (E0, n, q, T = T0) => E0 + Cst.R * T / (n * F_) * Math.log(q);
  function potentiel(couple, a, milieu = "acide", T = T0) {
    const d = demiEquation(couple.ox, couple.red, milieu);
    return nernst(couple.E0, d.n, 1 / quotient(d, a), T);
  }
  const lgK = (E0ox, E0red, n, T = T0) => n * (E0ox - E0red) / pente(T);

  /* ---------- état final ---------- */
  function etatFinal(eq, n0, lgKval, o = {}) {
    const V = o.V || 1, fixes = o.fixes || {}, ph = s => (o.phases && o.phases[s]) || phase(s);
    const species = [...new Set([...Object.keys(eq.gauche), ...Object.keys(eq.droite)])].filter(s => s !== "e-");
    const nu = s => (eq.droite[s] || 0) - (eq.gauche[s] || 0);           // signed, products positive
    const counted = s => !(s in fixes) && ph(s) !== "solvant";
    const lnK = lgKval * Math.LN10;
    /* ln a of each species for amounts n (Map), or −∞ / null for absent */
    const lnQ = amounts => {
      let l = 0;
      for (const s of species) {
        const v = nu(s); if (!v) continue;
        let la;
        if (s in fixes) la = Math.log(fixes[s]);
        else if (ph(s) === "solvant" || ph(s) === "solide") la = 0;
        else la = amounts.ln[s] - Math.log(V * C0);
        l += v * la;
      }
      return l;
    };
    const start = {}; for (const s of species) start[s] = n0[s] || 0;
    /* one direction: dir = 1 forward, −1 backward; reactants are the species with dir·ν < 0 */
    function solve(dir) {
      const k = s => -(dir * nu(s));                                       // > 0 for a reactant in this direction
      const reac = species.filter(s => counted(s) && k(s) > 0);
      if (!reac.length) return null;
      const lim = reac.reduce((m, s) => start[s] / k(s) < start[m] / k(m) ? s : m), kL = k(lim);
      const xiMax = start[lim] / kL;
      /* Two exact parametrisations, so that neither a tiny product nor a tiny remainder is lost to rounding:
         by ln ξ (start of the reaction), or by ln n_L, the limiting reactant (near completion). */
      const parXi = lnXi => {
        const xi = Math.exp(lnXi), n = {}, ln = {};
        for (const s of species) {
          if (!counted(s)) continue;
          const v = -k(s);
          if (v > 0 && start[s] === 0) { ln[s] = Math.log(v) + lnXi; n[s] = Math.exp(ln[s]); }
          else { n[s] = Math.max(start[s] + v * xi, 0); ln[s] = Math.log(n[s]); }
        }
        return { xi, n, ln };
      };
      const parL = lnL => {
        const nL = Math.exp(lnL), xi = Math.max((start[lim] - nL) / kL, 0), n = {}, ln = {};
        for (const s of species) {
          if (!counted(s)) continue;
          const v = -k(s);
          if (v < 0) {
            const exces = start[s] - k(s) * xiMax, r = k(s) / kL;
            if (exces > 1e-12 * start[s]) { n[s] = exces + r * nL; ln[s] = Math.log(n[s]); }
            else { ln[s] = Math.log(r) + lnL; n[s] = Math.exp(ln[s]); }
          } else { n[s] = start[s] + v * xi; ln[s] = Math.log(n[s]); }
        }
        return { xi, n, ln };
      };
      const lnKd = dir * lnK;
      const f = am => dir * lnQ(am) - lnKd;                                // < 0 : the reaction goes on in this direction
      if (!(f(parXi(-Infinity)) < 0)) return null;                       // NaN: a reactant and a product both absent
      const bisect = (par, lo, hi, signLo) => {                           // f(par(lo)) has the sign signLo
        for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Math.sign(f(par(m))) === signLo) lo = m; else hi = m; }
        return par((lo + hi) / 2);
      };
      const out = (r, total) => ({ xi: dir * r.xi, n: r.n, total });
      if (ph(lim) === "solide") {                                         // its activity stays 1 while it lasts
        const fin = parXi(Math.log(xiMax)); fin.n[lim] = 0;
        if (f(fin) <= 0) return out(fin, true);                            // used up before Q reaches K: rupture
        return out(bisect(parXi, Math.log(xiMax) - 2000, Math.log(xiMax), -1), false);
      }
      const half = Math.log(xiMax / 2);
      if (f(parXi(half)) >= 0) return out(bisect(parXi, half - 2000, half, -1), false);
      const lnHalf = Math.log(start[lim] / 2);
      return out(bisect(parL, lnHalf - 2000, lnHalf, 1), false);
    }
    const r = solve(1) || solve(-1);
    if (!r) { const n = {}; for (const s of species) if (counted(s)) n[s] = start[s]; return { xi: 0, n, total: false, sens: 0 }; }
    return Object.assign(r, { sens: Math.sign(r.xi) });
  }

  /* ---------- pile ---------- */
  function pile(A, B, T = T0) {
    const E = (el, c) => el.E0 + pente(T) / el.z * Math.log10(c / C0);
    const [p, m, plus] = E(A, A.c) >= E(B, B.c) ? [A, B, "A"] : [B, A, "B"];
    const n = lcm(p.z, m.z), kp = n / p.z, km = n / m.z;                   // kp M+^z+ + km M− → kp M+ + km M−^z+
    const xiMax = Math.min(p.c * p.V / kp, (m.m === undefined ? Infinity : m.m) / km);
    const etat = xi => {
      const cp = (p.c * p.V - kp * xi) / p.V, cm = (m.c * m.V + km * xi) / m.V;
      const Eplus = E(p, cp), Emoins = E(m, cm);
      return { Eplus, Emoins, e: Eplus - Emoins, cplus: cp, cmoins: cm };
    };
    return { plus, n, xiMax, Q: n * F_ * xiMax, e0: etat(0).e, etat, lgK: lgK(p.E0, m.E0, n, T) };
  }

  /* ============ Thermochimie (step « Thermochimie », X.chim_enthalpie.1 to 3) ============
     Standard state: p° = P0 = 1 bar; a gas is the pure perfect gas at p°, a condensed phase the pure body at p°, a solute the
     infinitely dilute solution extrapolated to c° = 1 mol·L⁻¹. Energies in J·mol⁻¹, T in K. A reaction is { espèce: ν },
     ν < 0 for a reactant (the convention of the programme: ΔrX = Σ νᵢ Xᵢ).
     ESPECES                     { id: { f (formula for formule()), etat: "g"|"l"|"aq", dfH (J·mol⁻¹ at 298,15 K), sh? } }.
                                 dfH: NIST-JANAF tables (Chase 1998) for the gases and water, CODATA Key Values (Cox, Wagman,
                                 Medvedev 1989) for HO⁻(aq), NIST WebBook for propane (Pittam and Pilcher 1972) and liquid
                                 ethanol (mean of 6 values, ± 2 kJ·mol⁻¹). sh: Shomate ranges [Tmin, Tmax, A, B, C, D, E, F, H] of
                                 the NIST WebBook (Chase 1998): Cp = A + Bt + Ct² + Dt³ + E/t², t = T/1000 K, and
                                 H°(T) − H°(298,15 K) = At + Bt²/2 + Ct³/3 + Dt⁴/4 − E/t + F − H in kJ·mol⁻¹.
                                 Water vapour: the 500–1700 K range is used down to 298,15 K (Cp within 0,1 % of JANAF there).
     cpStd(id, T), dH(id, T)     Cp° (J·mol⁻¹·K⁻¹) and H°(T) − H°(298,15 K) (J·mol⁻¹); outside the ranges: throws.
     verifier(nu)                throws unless every species is known and elements and charge balance; returns nu.
     combustion(id, eau)         complete combustion of one mole of a CHO fuel into CO2 and water ("H2O(g)" or "H2O(l)").
     drH(nu, T)                  Σ ν ΔfH° at 298,15 K (Hess); at T, + Σ ν [H°(T) − H°(298,15 K)] (Kirchhoff integrated,
                                 no phase change: throws for a species without heat capacities when T ≠ 298,15 K).
     drCp(nu, T), dnGaz(nu)      Σ ν Cp°, Σ ν over gases.
     drU(nu, T)                  ΔrH° − Δν(gaz) RT: perfect gases, volume of the condensed phases neglected.
     REACTIONS                   the reactions of the step's pages.
     flamme(o)                   adiabatic, monobaric, complete combustion of one mole of fuel, reactants at 298,15 K, water
                                 as vapour, no dissociation. o = { combustible, comburant: "air"|"O2", exces (fraction of
                                 oxygen above stoichiometry, ≥ 0), modele: "cpT" (Shomate) | "cp0" (Cp° at 298,15 K) }.
                                 Air = O2 + 3,76 N2. { Tf, Q (J, released at 298,15 K), produits: { id: n }, h(T) (J, enthalpy
                                 of the products from 298,15 K to T), C0 (J·K⁻¹, Σ n Cp° at 298,15 K), horsTable }.
                                 horsTable ("cpT" only): Tf beyond 6 000 K, the end of the tables (Tf is then null).
     emballement(o)              closed, stirred reactor, one first-order reaction k = kRef exp[−(Ea/R)(1/T − 1/TRef)],
                                 dX/dt = k(1 − X), dT/dt = dTad dX/dt − (T − Tc)/tau (tau = Infinity: adiabatic).
                                 o = { T0, Tc (default T0), tau, dTad, Ea, kRef, TRef, tmax, n }: RK4, { t, T, X } arrays.
     semenov(o)                  ψ = tau kRef(Tc) dTad Ea/(R Tc²): Semenov's number, runaway for ψ > 1/e (zero order). */
  const SH = {
    CO2: [[298, 1200, 24.99735, 55.18696, -33.69137, 7.948387, -0.136638, -403.6075, -393.5224],
      [1200, 6000, 58.16639, 2.720074, -0.492289, 0.038844, -6.447293, -425.9186, -393.5224]],
    H2O: [[298, 1700, 30.092, 6.832514, 6.793435, -2.53448, 0.082139, -250.881, -241.8264],
      [1700, 6000, 41.96426, 8.622053, -1.49978, 0.098119, -11.15764, -272.1797, -241.8264]],
    H2Ol: [[298, 500, -203.606, 1523.29, -3196.413, 2474.455, 3.855326, -256.5478, -285.8304]],
    N2: [[100, 500, 28.98641, 1.853978, -9.647459, 16.63537, 0.000117, -8.671914, 0],
      [500, 2000, 19.50583, 19.88705, -8.598535, 1.369784, 0.527601, -4.935202, 0],
      [2000, 6000, 35.51872, 1.128728, -0.196103, 0.014662, -4.55376, -18.97091, 0]],
    O2: [[100, 700, 31.32234, -20.23531, 57.86644, -36.50624, -0.007374, -8.903471, 0],
      [700, 2000, 30.03235, 8.772972, -3.988133, 0.788313, -0.741599, -11.32468, 0],
      [2000, 6000, 20.91111, 10.72071, -2.020498, 0.146449, 9.245722, 5.337651, 0]],
    H2: [[298, 1000, 33.066178, -11.363417, 11.432816, -2.772874, -0.158558, -9.980797, 0],
      [1000, 2500, 18.563083, 12.257357, -2.859786, 0.268238, 1.97799, -1.147438, 0],
      [2500, 6000, 43.41356, -4.293079, 1.272428, -0.096876, -20.533862, -38.515158, 0]],
    CO: [[298, 1300, 25.56759, 6.09613, 4.054656, -2.671301, 0.131021, -118.0089, -110.5271],
      [1300, 6000, 35.1507, 1.300095, -0.205921, 0.01355, -3.28278, -127.8375, -110.5271]],
    CH4: [[298, 1300, -0.703029, 108.4773, -42.52157, 5.862788, 0.678565, -76.84376, -74.8731],
      [1300, 6000, 85.81217, 11.26467, -2.114146, 0.13819, -26.42221, -153.5327, -74.8731]],
    NH3: [[298, 1400, 19.99563, 49.77119, -15.37599, 1.921168, 0.189174, -53.30667, -45.89806],
      [1400, 6000, 52.02427, 18.48801, -3.765128, 0.248541, -12.45799, -85.53895, -45.89806]],
  };
  const ESPECES = Object.freeze({
    "CH4": { f: "CH4", etat: "g", dfH: -74873, sh: SH.CH4 },
    "C3H8": { f: "C3H8", etat: "g", dfH: -104700 },
    "C2H5OH(l)": { f: "C2H6O", etat: "l", dfH: -276000 },
    "H2": { f: "H2", etat: "g", dfH: 0, sh: SH.H2 },
    "O2": { f: "O2", etat: "g", dfH: 0, sh: SH.O2 },
    "N2": { f: "N2", etat: "g", dfH: 0, sh: SH.N2 },
    "CO": { f: "CO", etat: "g", dfH: -110527, sh: SH.CO },
    "CO2": { f: "CO2", etat: "g", dfH: -393522, sh: SH.CO2 },
    "H2O(g)": { f: "H2O", etat: "g", dfH: -241826, sh: SH.H2O },
    "H2O(l)": { f: "H2O", etat: "l", dfH: -285830, sh: SH.H2Ol },
    "NH3": { f: "NH3", etat: "g", dfH: -45898, sh: SH.NH3 },
    "NO2": { f: "NO2", etat: "g", dfH: 33100 },             // NIST-JANAF (Chase 1998); step « Enthalpie libre et potentiel chimique »
    "N2O4": { f: "N2O4", etat: "g", dfH: 9080 },            // idem
    "NO": { f: "NO", etat: "g", dfH: 90290, sh: [[298, 1200, 23.83491, 12.58878, -1.139011, -1.497459, 0.214194, 83.35783, 90.29114],
      [1200, 6000, 35.99169, 0.957170, -0.148032, 0.009974, -3.004088, 73.10787, 90.29114]] },   // NIST WebBook (Chase 1998); step « Chimie industrielle minérale »
    "H^+": { f: "H^+", etat: "aq", dfH: 0 },
    "HO^-": { f: "HO^-", etat: "aq", dfH: -230015 },
  });
  const espece = id => { const e = ESPECES[id]; if (!e) throw new Error("thermochimie : espèce inconnue « " + id + " »"); return e; };
  const gamme = (id, T) => {
    const e = espece(id), r = e.sh && e.sh.find(g => T >= g[0] - 1e-9 && T <= g[1] + 1e-9);
    if (!r) throw new Error("thermochimie : pas de capacité thermique pour " + id + " à " + T + " K");
    return r;
  };
  function cpStd(id, T) {
    const [, , A, B, C, D, E] = gamme(id, T), t = T / 1000;
    return A + B * t + C * t * t + D * t ** 3 + E / (t * t);
  }
  function dH(id, T) {
    if (Math.abs(T - T0) < 1e-9) return 0;
    const [, , A, B, C, D, E, F, H] = gamme(id, T), t = T / 1000;
    return 1000 * (A * t + B * t * t / 2 + C * t ** 3 / 3 + D * t ** 4 / 4 - E / t + F - H);
  }
  function verifier(nu) {
    const at = {}; let q = 0;
    for (const id in nu) {
      const f = formule(espece(id).f); q += nu[id] * f.charge;
      for (const X in f.atomes) at[X] = (at[X] || 0) + nu[id] * f.atomes[X];
    }
    const faux = Object.keys(at).filter(X => Math.abs(at[X]) > 1e-9);
    if (faux.length || Math.abs(q) > 1e-9) throw new Error("thermochimie : réaction non équilibrée (" + (faux.join(", ") || "charge") + ")");
    return nu;
  }
  function combustion(id, eau = "H2O(g)") {
    const a = formule(espece(id).f).atomes, x = a.C || 0, y = a.H || 0, z = a.O || 0;
    if (Object.keys(a).some(X => !"CHO".includes(X))) throw new Error("thermochimie : " + id + " n'est pas un combustible CHO");
    const nu = { [id]: -1 }, o2 = x + y / 4 - z / 2;
    if (o2) nu.O2 = -o2;
    if (x) nu.CO2 = x;
    if (y) nu[eau] = y / 2;
    return verifier(nu);
  }
  const somme = (nu, g) => Object.keys(nu).reduce((s, id) => s + nu[id] * g(id), 0);
  const drH = (nu, T = T0) => somme(verifier(nu), id => espece(id).dfH + dH(id, T));
  const drCp = (nu, T = T0) => somme(nu, id => cpStd(id, T));
  const dnGaz = nu => somme(nu, id => espece(id).etat === "g" ? 1 : 0);
  const drU = (nu, T = T0) => drH(nu, T) - dnGaz(nu) * Cst.R * T;
  const REACTIONS = Object.freeze({
    combustionMethane: Object.freeze({ CH4: -1, O2: -2, CO2: 1, "H2O(g)": 2 }),
    ammoniac: Object.freeze({ N2: -1, H2: -3, NH3: 2 }),
    vaporeformage: Object.freeze({ CH4: -1, "H2O(g)": -1, CO: 1, H2: 3 }),
    gazAEau: Object.freeze({ CO: -1, "H2O(g)": -1, CO2: 1, H2: 1 }),
    neutralisation: Object.freeze({ "H^+": -1, "HO^-": -1, "H2O(l)": 1 }),
  });
  const TMAX = 6000;
  function flamme(o) {
    const nu = combustion(o.combustible, "H2O(g)"), exces = o.exces || 0, modele = o.modele || "cpT";
    if (!(exces >= 0)) throw new Error("thermochimie : excès négatif");
    if (o.comburant !== "air" && o.comburant !== "O2") throw new Error("thermochimie : comburant « air » ou « O2 »");
    const o2 = -nu.O2, produits = {};
    for (const id in nu) if (nu[id] > 0) produits[id] = nu[id];
    if (exces) produits.O2 = exces * o2;
    if (o.comburant === "air") produits.N2 = 3.76 * (1 + exces) * o2;
    const Q = -drH(nu), C0p = somme(produits, id => cpStd(id, T0));
    const h = T => modele === "cp0" ? C0p * (T - T0) : somme(produits, id => dH(id, T));
    let Tf = null, horsTable = false;
    if (modele === "cp0") Tf = T0 + Q / C0p;
    else if (h(TMAX) < Q) horsTable = true;
    else {
      let lo = T0, hi = TMAX;
      for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (h(m) < Q) lo = m; else hi = m; }
      Tf = (lo + hi) / 2;
    }
    return { Tf, Q, produits, h, C0: C0p, horsTable };
  }
  function emballement(o) {
    const Tc = o.Tc === undefined ? o.T0 : o.Tc, tau = o.tau === undefined ? Infinity : o.tau, n = o.n || 2000, dt = o.tmax / n;
    const k = T => o.kRef * Math.exp(-o.Ea / Cst.R * (1 / T - 1 / o.TRef));
    const f = ([X, T]) => { const r = k(T) * Math.max(1 - X, 0); return [r, o.dTad * r - (tau === Infinity ? 0 : (T - Tc) / tau)]; };
    const t = [0], TT = [o.T0], XX = [0];
    let y = [0, o.T0];
    const add = (a, b, s) => [a[0] + s * b[0], a[1] + s * b[1]];
    const pas = h => { const k1 = f(y), k2 = f(add(y, k1, h / 2)), k3 = f(add(y, k2, h / 2)), k4 = f(add(y, k3, h));
      y = [y[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), y[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])]; };
    for (let i = 1; i <= n; i++) {
      for (let s = 0; s < dt;) {                         // sub-steps with k h ≤ 0,05: the runaway stays resolved
        const h = Math.min(dt - s, 0.05 / (k(y[1]) + (tau === Infinity ? 0 : 1 / tau)));
        pas(h); s += h;
      }
      t.push(i * dt); XX.push(y[0]); TT.push(y[1]);
    }
    return { t, T: TT, X: XX };
  }
  function semenov(o) {
    const Tc = o.Tc === undefined ? o.T0 : o.Tc, k = o.kRef * Math.exp(-o.Ea / Cst.R * (1 / Tc - 1 / o.TRef));
    return o.tau * k * o.dTad * o.Ea / (Cst.R * Tc * Tc);
  }
  const THERMOCHIMIE = { ESPECES, cpStd, dH, verifier, combustion, drH, drCp, dnGaz, drU, REACTIONS, flamme, emballement, semenov };

  /* ============ Enthalpie libre (step « Enthalpie libre et potentiel chimique », X.chim_potentiel.1 to 4) ============
     Same conventions as Thermochimie: ESPECES, reactions { espèce: ν }, J·mol⁻¹, K, p° = P0. Gases are perfect.
     S0                          { id: S° (J·K⁻¹·mol⁻¹) at 298,15 K and p° }: NIST-JANAF (Chase 1998) for the gases,
                                 CODATA Key Values (Cox, Wagman, Medvedev 1989) for liquid water, as given by the NIST WebBook.
     dS(id, T)                   S°(T) − S°(298,15 K) = ∫ Cp°/T dT over the Shomate ranges crossed (throws outside them).
     drS(nu, T)                  Σ ν S°(T); at 298,15 K needs S0 only.
     drG(nu, T, modele)          ΔrG°(T). "ellingham" (default): ΔrH°(298,15 K) − T ΔrS°(298,15 K), no heat capacity;
                                 "cpT": ΔrH°(T) − T ΔrS°(T) with the Shomate Cp°(T).
     lnK(nu, T, modele)          −ΔrG°/RT (K° = exp of it).
     vantHoff(K1, T1, T2, dH)    K1 exp[−(dH/R)(1/T2 − 1/T1)]: (van 't Hoff) integrated with ΔrH° = dH constant.
     muGaz(mu0, p, T)            μ° + RT ln(p/p°), perfect gas at partial pressure p (Pa).
     muCondense(mu0, Vm, p)      μ° + Vm (p − p°), pure incompressible condensed phase of molar volume Vm (m³·mol⁻¹).
     osmose(c, T, Vm)            osmotic pressure of a dilute solution of solute particles c (mol·m⁻³) in water:
                                 { ideale: −(RT/Vm) ln x_solvant (x from c Vm, ideal solution), vantHoff: cRT }, Pa. Vm default 1,807 × 10⁻⁵.
     psatModele(T, modele)       vapour pressure of water from ΔvapG°(T): p° exp(−ΔvapG°/RT) (H2O(l) = H2O(g)), Pa.
     melangeGaz(nu, n0, T, p, o) a closed mixture of perfect gases at fixed T and p (Pa), n0 = { espèce: mol } (a species not
                                 in nu is inert). o = { lnK } or { modele }. Returns
                                 { lnK, xiMin, xiMax, n(xi), x(xi), lnQ(xi), drG(xi) = RT (lnQ − lnK) (J·mol⁻¹),
                                   G(xi) = Σ nᵢ [μᵢ° + RT ln(p xᵢ/p°)] up to a constant (J), equilibre: { xi, n, x, rendement } }.
                                 ΔrG(ξ) increases with ξ: the equilibrium is its root, found by bisection on the open interval
                                 where every amount is positive; rendement = (ξ − xiMin)/(xiMax − xiMin). */
  const S0 = Object.freeze({ H2: 130.68, N2: 191.61, O2: 205.15, NH3: 192.77, CO2: 213.79, "H2O(g)": 188.84, "H2O(l)": 69.95,
    NO2: 240.04, N2O4: 304.38, NO: 210.76 });
  const s0 = id => { if (!(id in S0)) throw new Error("enthalpie libre : pas d'entropie standard pour « " + id + " »"); return S0[id]; };
  function dS(id, T) {
    if (Math.abs(T - T0) < 1e-9) return 0;
    const e = espece(id), [a, b] = T > T0 ? [T0, T] : [T, T0];
    if (!e.sh || a < e.sh[0][0] - 1e-9 || b > e.sh[e.sh.length - 1][1] + 1e-9) throw new Error("thermochimie : pas de capacité thermique pour " + id + " à " + T + " K");
    let s = 0;
    for (const [lo, hi, A, B, C, D, E] of e.sh) {
      const u = Math.max(a, lo) / 1000, v = Math.min(b, hi) / 1000;
      if (v > u) s += A * Math.log(v / u) + B * (v - u) + C * (v * v - u * u) / 2 + D * (v ** 3 - u ** 3) / 3 - E / 2 * (1 / (v * v) - 1 / (u * u));
    }
    return T > T0 ? s : -s;
  }
  const drS = (nu, T = T0) => somme(verifier(nu), id => s0(id) + dS(id, T));
  function drG(nu, T = T0, modele = "ellingham") {
    if (modele === "ellingham") return drH(nu) - T * drS(nu);
    if (modele === "cpT") return drH(nu, T) - T * drS(nu, T);
    throw new Error("enthalpie libre : modèle « ellingham » ou « cpT »");
  }
  const lnK = (nu, T = T0, modele) => -drG(nu, T, modele) / (Cst.R * T);
  const vantHoff = (K1, T1, T2, dHr) => K1 * Math.exp(-dHr / Cst.R * (1 / T2 - 1 / T1));
  const muGaz = (mu0, p, T = T0) => mu0 + Cst.R * T * Math.log(p / P0);
  const muCondense = (mu0, Vm, p) => mu0 + Vm * (p - P0);
  const VM_EAU = 1.807e-5;                                   // m³·mol⁻¹: M/ρ = 0,018 015 kg·mol⁻¹ / 997,0 kg·m⁻³ at 298,15 K
  function osmose(c, T = T0, Vm = VM_EAU) {
    const r = c * Vm;                                        // solute particles per mole of water, dilute: x_solute ≈ r/(1 + r)
    return { ideale: Cst.R * T / Vm * Math.log(1 + r), vantHoff: c * Cst.R * T };
  }
  const VAPORISATION = Object.freeze({ "H2O(l)": -1, "H2O(g)": 1 });
  const psatModele = (T, modele) => P0 * Math.exp(lnK(VAPORISATION, T, modele));
  function melangeGaz(nu, n0, T, p, o = {}) {
    verifier(nu);
    const ids = [...new Set([...Object.keys(nu), ...Object.keys(n0)])];
    for (const id of ids) if (espece(id).etat !== "g") throw new Error("enthalpie libre : " + id + " n'est pas un gaz");
    const lk = o.lnK !== undefined ? o.lnK : lnK(nu, T, o.modele);
    const v = id => nu[id] || 0, n00 = id => n0[id] || 0;
    let xiMin = -Infinity, xiMax = Infinity;
    for (const id of ids) { if (v(id) > 0) xiMin = Math.max(xiMin, -n00(id) / v(id)); if (v(id) < 0) xiMax = Math.min(xiMax, n00(id) / -v(id)); }
    if (!(xiMax > xiMin)) throw new Error("enthalpie libre : aucun avancement possible");
    const n = xi => Object.fromEntries(ids.map(id => [id, n00(id) + v(id) * xi]));
    const tot = am => ids.reduce((s, id) => s + am[id], 0);
    const x = xi => { const am = n(xi), N = tot(am); return Object.fromEntries(ids.map(id => [id, am[id] / N])); };
    const lnQ = xi => { const am = n(xi), N = tot(am); return ids.reduce((s, id) => s + v(id) * Math.log(am[id] * p / (N * P0)), 0); };
    const dG = xi => Cst.R * T * (lnQ(xi) - lk);
    const mu0 = id => espece(id).dfH - T * s0(id) + (o.modele === "cpT" ? dH(id, T) - T * dS(id, T) : 0);
    const G = xi => { const am = n(xi), N = tot(am);
      return ids.reduce((s, id) => s + (am[id] > 0 ? am[id] * (mu0(id) + Cst.R * T * Math.log(am[id] * p / (N * P0))) : 0), 0); };
    let lo = xiMin, hi = xiMax;
    for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (m === lo || m === hi) break; if (dG(m) < 0) lo = m; else hi = m; }
    const xe = (lo + hi) / 2;
    return { lnK: lk, xiMin, xiMax, n, x, lnQ, drG: dG, G,
      equilibre: { xi: xe, n: n(xe), x: x(xe), rendement: (xe - xiMin) / (xiMax - xiMin) } };
  }
  const ENTHALPIE_LIBRE = { S0, dS, drS, drG, lnK, vantHoff, muGaz, muCondense, VM_EAU, osmose, VAPORISATION, psatModele, melangeGaz };

  /* ---------- complexes et catalyse (étape « Complexes et catalyse », X.chim_complexes.1 to 3) ----------
     Ionic convention of the programme: each metal–ligand pair is given to the ligand, the more electronegative.
     A ligand is X (it leaves with the pair: charge −1, Cl⁻, H⁻, CH₃⁻) or L (neutral donor: CO, PPh₃, alkene). It gives
     e electrons and takes s positions (η⁵-C₅H₅⁻: 6 electrons, 3 positions by convention).
     A complex is { m: "Rh", L: [["Cl", 1], ["PPh3", 3]], z: 0 }: ligands in writing order, z the charge of the complex.
       METAUX                     group number of each metal: its valence electrons, all counted as d once it is bound.
       LIGANDS                    { f (display), q (−1 for X, 0 for L), e, s, pi: "accepteur" | "donneur" | null, at (atoms) }.
       complexe(c)                { x: oxidation number, d: d electrons, Ne: valence electrons, s: positions, n: ligands }.
                                  x = z − Σ q ; d = group − x ; Ne = d + Σ e. Throws if 0 ≤ d ≤ 10 fails.
       ecrireComplexe(c)          "[RhCl(PPh₃)₃]", "[Co(NH₃)₆]³⁺": monoatomic ligands bare, the others in parentheses.
       atomesComplexe(c)          atoms of the coordination sphere; the solvent S counts for nothing.
       ml6(d, basSpin = true)     σ-only octahedral ML₆: { t2g, eg, celibataires } for d electrons.
       etape(a, b, entre, sort)   the elementary process a → b, entre and sort the molecules that come in and go out:
                                  { type, dx, dNe, ds }, type "association", "dissociation", "echange", "additionOxydante",
                                  "eliminationReductrice", "insertion", "desinsertion", told apart by Δx, the molecules
                                  in and out, and the X and L ligands gained and lost (insertion: X + L → X′).
                                  Throws if atoms are not conserved or if no process fits.
       cycleCatalytique(k)        k = { depart, etapes: [{ vers, entre, sort }], annexes: [{ entre, sort }] }: each step typed,
                                  each intermediate counted; bilan { gauche, droite }: what comes in minus what goes out,
                                  annexes (reactions outside the metal) included. Throws if the cycle does not close on
                                  depart or if the bilan does not conserve atoms.
       CYCLES                     wilkinson (alkene hydrogenation, with its precursor), monsanto (methanol carbonylation),
                                  coordination (alkene polymerisation on a zirconocene: growth and transfer, not closed).
       ton(nP, nCat), tof(nP, nCat, dt)   turnover number, turnover frequency (s⁻¹). */
  const METAUX = Object.freeze({ Ti: 4, V: 5, Cr: 6, Mn: 7, Fe: 8, Co: 9, Ni: 10, Cu: 11, Zr: 4, Mo: 6, Ru: 8, Rh: 9, Pd: 10, W: 6, Ir: 9, Pt: 10 });
  const lig = (f, q, e, s, pi, at) => Object.freeze({ f, q, e, s, pi, at });
  const LIGANDS = Object.freeze({
    CO: lig("CO", 0, 2, 1, "accepteur", "CO"), PPh3: lig("PPh₃", 0, 2, 1, "accepteur", "PPh3"),
    NH3: lig("NH₃", 0, 2, 1, null, "NH3"), H2O: lig("H₂O", 0, 2, 1, "donneur", "H2O"), S: lig("S", 0, 2, 1, null, ""),
    en: lig("en", 0, 4, 2, null, "C2H8N2"), C2H4: lig("C₂H₄", 0, 2, 1, "accepteur", "C2H4"),
    CH2CHR: lig("CH₂=CHR", 0, 2, 1, "accepteur", "C2H3R"),
    Cl: lig("Cl", -1, 2, 1, "donneur", "Cl"), I: lig("I", -1, 2, 1, "donneur", "I"), CN: lig("CN", -1, 2, 1, "accepteur", "CN"),
    H: lig("H", -1, 2, 1, null, "H"), CH3: lig("CH₃", -1, 2, 1, null, "CH3"), C2H5: lig("C₂H₅", -1, 2, 1, null, "C2H5"),
    COCH3: lig("COCH₃", -1, 2, 1, null, "COCH3"), R: lig("R", -1, 2, 1, null, "R"), CH2CH2R: lig("CH₂CH₂R", -1, 2, 1, null, "C2H4R"),
    C5H5: lig("C₅H₅", -1, 6, 3, null, "C5H5"),
  });
  const ligand = id => { const l = LIGANDS[id]; if (!l) throw new Error("complexe : ligand inconnu « " + id + " »"); return l; };
  function complexe(c) {
    const g = METAUX[c.m];
    if (g === undefined) throw new Error("complexe : métal inconnu « " + c.m + " »");
    let q = 0, e = 0, s = 0, n = 0;
    for (const [id, k] of c.L) { const l = ligand(id); q += k * l.q; e += k * l.e; s += k * l.s; n += k; }
    const x = (c.z || 0) - q, d = g - x;
    if (!(d >= 0 && d <= 10)) throw new Error("complexe : " + c.m + " au nombre d'oxydation " + x + " aurait " + d + " électrons d");
    return { x, d, Ne: d + e, s, n };
  }
  const exposant = z => !z ? "" : (Math.abs(z) === 1 ? "" : String(Math.abs(z)).replace(/\d/g, k => SUP[k])) + (z > 0 ? "⁺" : "⁻");
  const indice = k => k === 1 ? "" : String(k).replace(/\d/g, d => SUB[d]);
  function ecrireComplexe(c) {
    const mono = id => /^[A-Z][a-z]?$/.test(ligand(id).at);
    return "[" + c.m + c.L.map(([id, k]) => (mono(id) ? ligand(id).f : "(" + ligand(id).f + ")") + indice(k)).join("") + "]" + exposant(c.z || 0);
  }
  const ajoute = (acc, at, k) => { for (const X in at) acc[X] = (acc[X] || 0) + k * at[X]; return acc; };
  const atomesEspece = sp => sp === "S" ? {} : formule(sp).atomes;
  function atomesComplexe(c) {
    const acc = { [c.m]: 1 };
    for (const [id, k] of c.L) { const at = ligand(id).at; if (at) ajoute(acc, formule(at).atomes, k); }
    return acc;
  }
  const memes = (a, b) => { const k = new Set([...Object.keys(a), ...Object.keys(b)]); for (const X of k) if ((a[X] || 0) !== (b[X] || 0)) return false; return true; };
  function ml6(d, basSpin = true) {
    if (!(Number.isInteger(d) && d >= 0 && d <= 10)) throw new Error("ml6 : " + d + " électrons d");
    const t2g = basSpin ? Math.min(d, 6) : d <= 5 ? Math.min(d, 3) : 3 + Math.min(d - 5, 3);
    const eg = d - t2g, seuls = (n, orb) => n <= orb ? n : 2 * orb - n;
    return { t2g, eg, celibataires: seuls(t2g, 3) + seuls(eg, 2) };
  }
  function etape(a, b, entre = [], sort = []) {
    if (a.m !== b.m) throw new Error("étape : le métal change (" + a.m + " → " + b.m + ")");
    const A = complexe(a), B = complexe(b);
    const avant = entre.reduce((acc, sp) => ajoute(acc, atomesEspece(sp), 1), atomesComplexe(a));
    const apres = sort.reduce((acc, sp) => ajoute(acc, atomesEspece(sp), 1), atomesComplexe(b));
    if (!memes(avant, apres)) throw new Error("étape : les atomes ne se conservent pas de " + ecrireComplexe(a) + " à " + ecrireComplexe(b));
    if ((a.z || 0) !== (b.z || 0)) throw new Error("étape : la charge du complexe change");
    const dx = B.x - A.x, dNe = B.Ne - A.Ne, ds = B.s - A.s, i = entre.length, o = sort.length;
    /* ligands gained and lost, counted as X (anionic) and L (neutral) */
    const ka = Object.fromEntries(a.L), kb = Object.fromEntries(b.L), plus = { X: 0, L: 0 }, moins = { X: 0, L: 0 };
    for (const id of new Set([...Object.keys(ka), ...Object.keys(kb)])) {
      const v = (kb[id] || 0) - (ka[id] || 0), t = ligand(id).q ? "X" : "L";
      if (v > 0) plus[t] += v; else moins[t] -= v;
    }
    const est = (p, m) => plus.X === p[0] && plus.L === p[1] && moins.X === m[0] && moins.L === m[1];
    let type = null;
    if (dx === 2 && i === 1 && o === 0 && est([2, 0], [0, 0])) type = "additionOxydante";
    else if (dx === -2 && i === 0 && o === 1 && est([0, 0], [2, 0])) type = "eliminationReductrice";
    else if (dx === 0 && i === 1 && o === 0 && est([0, 1], [0, 0])) type = "association";
    else if (dx === 0 && i === 0 && o === 1 && est([0, 0], [0, 1])) type = "dissociation";
    else if (dx === 0 && i === 1 && o === 1 && est([0, 1], [0, 1])) type = "echange";
    else if (dx === 0 && !i && !o && est([1, 0], [1, 1])) type = "insertion";
    else if (dx === 0 && !i && !o && est([1, 1], [1, 0])) type = "desinsertion";
    if (!type) throw new Error("étape : aucun processus élémentaire ne mène de " + ecrireComplexe(a) + " à " + ecrireComplexe(b));
    return { type, dx, dNe, ds };
  }
  const memeComplexe = (a, b) => a.m === b.m && (a.z || 0) === (b.z || 0) && memes(Object.fromEntries(a.L.map(([id, k]) => [id, k])), Object.fromEntries(b.L.map(([id, k]) => [id, k])));
  function cycleCatalytique(k) {
    let cur = k.depart;
    const net = {}, compte = (sp, v) => { net[sp] = (net[sp] || 0) + v; };
    const etapes = k.etapes.map(s => {
      const r = Object.assign(etape(cur, s.vers, s.entre || [], s.sort || []), { de: cur, vers: s.vers, entre: s.entre || [], sort: s.sort || [], compte: complexe(s.vers) });
      r.entre.forEach(sp => compte(sp, 1)); r.sort.forEach(sp => compte(sp, -1));
      cur = s.vers; return r;
    });
    if (!memeComplexe(cur, k.depart)) throw new Error("cycle : le catalyseur n'est pas régénéré (" + ecrireComplexe(cur) + " au lieu de " + ecrireComplexe(k.depart) + ")");
    for (const a of k.annexes || []) { (a.entre || []).forEach(sp => compte(sp, 1)); (a.sort || []).forEach(sp => compte(sp, -1)); }
    const gauche = {}, droite = {};
    for (const sp in net) if (net[sp] > 0) gauche[sp] = net[sp]; else if (net[sp] < 0) droite[sp] = -net[sp];
    const tot = o => Object.entries(o).reduce((acc, [sp, v]) => ajoute(acc, atomesEspece(sp), v), {});
    if (!memes(tot(gauche), tot(droite))) throw new Error("cycle : le bilan ne conserve pas les atomes");
    return { depart: Object.assign({ c: k.depart }, complexe(k.depart)), etapes, bilan: { gauche, droite } };
  }
  const cx = (m, L, z = 0) => Object.freeze({ m, L: Object.freeze(L.map(p => Object.freeze(p))), z });
  const CYCLES = Object.freeze({
    /* the programme's form of the Osborn–Wilkinson cycle (J. Chem. Soc. A, 1966): S a solvent molecule */
    wilkinson: Object.freeze({
      precurseur: cx("Rh", [["Cl", 1], ["PPh3", 3]]),
      activation: Object.freeze({ entre: ["S"], sort: ["PPh3"] }),
      depart: cx("Rh", [["Cl", 1], ["PPh3", 2], ["S", 1]]),
      etapes: Object.freeze([
        { vers: cx("Rh", [["Cl", 1], ["H", 2], ["PPh3", 2], ["S", 1]]), entre: ["H2"] },
        { vers: cx("Rh", [["Cl", 1], ["H", 2], ["PPh3", 2], ["C2H4", 1]]), entre: ["C2H4"], sort: ["S"] },
        { vers: cx("Rh", [["Cl", 1], ["H", 1], ["C2H5", 1], ["PPh3", 2]]) },
        { vers: cx("Rh", [["Cl", 1], ["H", 1], ["C2H5", 1], ["PPh3", 2], ["S", 1]]), entre: ["S"] },
        { vers: cx("Rh", [["Cl", 1], ["PPh3", 2], ["S", 1]]), sort: ["C2H6"] },
      ].map(Object.freeze)),
    }),
    /* rhodium cycle of the Monsanto process (Paulik and Roth, 1968), and the two reactions of iodine around it */
    monsanto: Object.freeze({
      depart: cx("Rh", [["I", 2], ["CO", 2]], -1),
      etapes: Object.freeze([
        { vers: cx("Rh", [["I", 3], ["CH3", 1], ["CO", 2]], -1), entre: ["CH3I"] },
        { vers: cx("Rh", [["I", 3], ["COCH3", 1], ["CO", 1]], -1) },
        { vers: cx("Rh", [["I", 3], ["COCH3", 1], ["CO", 2]], -1), entre: ["CO"] },
        { vers: cx("Rh", [["I", 2], ["CO", 2]], -1), sort: ["CH3COI"] },
      ].map(Object.freeze)),
      annexes: Object.freeze([
        Object.freeze({ entre: ["CH3OH", "HI"], sort: ["CH3I", "H2O"] }),
        Object.freeze({ entre: ["CH3COI", "H2O"], sort: ["CH3COOH", "HI"] }),
      ]),
    }),
    /* Cossee–Arlman growth on a zirconocene cation (Kaminsky's homogeneous catalyst), then transfer by β-hydride elimination */
    coordination: Object.freeze({
      depart: cx("Zr", [["C5H5", 2], ["R", 1]], 1),
      croissance: Object.freeze([
        { vers: cx("Zr", [["C5H5", 2], ["R", 1], ["C2H4", 1]], 1), entre: ["C2H4"] },
        { vers: cx("Zr", [["C5H5", 2], ["CH2CH2R", 1]], 1) },
      ].map(Object.freeze)),
      transfert: Object.freeze([
        { vers: cx("Zr", [["C5H5", 2], ["H", 1], ["CH2CHR", 1]], 1) },
        { vers: cx("Zr", [["C5H5", 2], ["H", 1]], 1), sort: ["CH2CHR"] },
        { vers: cx("Zr", [["C5H5", 2], ["H", 1], ["C2H4", 1]], 1), entre: ["C2H4"] },
        { vers: cx("Zr", [["C5H5", 2], ["C2H5", 1]], 1) },
      ].map(Object.freeze)),
    }),
  });
  const ton = (nP, nCat) => nP / nCat;
  const tof = (nP, nCat, dt) => nP / nCat / dt;
  const COMPLEXES = { METAUX, LIGANDS, complexe, ecrireComplexe, atomesComplexe, ml6, etape, cycleCatalytique, CYCLES, ton, tof };

  /* ---------- précipitation et complexation (step « Précipitation et complexation », X.chim_solubilite.1 to 3) ----------
     Data: Martell and Smith, « Critical Stability Constants », vol. 1–4 (Plenum, 1976), 25 °C and I = 0 unless stated.
     A solid is "solide"; its activity is 1. Concentrations c in mol·L⁻¹, activities a ≈ c/c° unless γ is given.
     SELS                          { sel: { pKs, ions: [[ion, ν], …] } }, the cation first.
     ks(sel)                       10^−pKs.
     solubiliteEau(sel)            s = (Ks / Π ν^ν)^(1/Σν): the solid alone in pure water, no other reaction.
     solubilite(sel, c0, o)        s ≥ 0 with Π (c0_i + ν_i s)^ν_i = Ks (common ion: c0 = { ion: c }); 0 if the solution is
                                   already saturated. o.pKs overrides; o.gamma = { ion: γ } divides Ks by Π γ^ν.
     saturation(sel, c)            Q/Ks for ion concentrations c: > 1 the solid precipitates, < 1 it cannot exist.
     ionique(c)                    ionic strength I = ½ Σ c_i z_i².
     davies(z, I)                  activity coefficient γ, log γ = −A z² (√I/(1 + √I) − 0,3 I), A = 0,509 at 298,15 K.
     solubiliteDavies(sel, c0, autres)  the same s, γ from Davies at the ionic strength of all ions (autres: spectators),
                                   iterated to a fixed point: { s, I, gamma }.
     partage(cTot, sels)           one cation shared by several salts M_aX_b, sels = [{ sel, c, pKs? }] (c: total anion).
                                   { M: free cation, sels: { sel: { libre, solide } } }, solide in formula units per litre.
     PKE, ANIONS_BASIQUES  pKe = 14,00 at 298,15 K; pKa of the acids whose base is an anion of SELS.
     solubilitePH(sel, pH, o)      s at a fixed pH (buffer): a hydroxide with its hydroxo complexes (o.complexes: the indices
                                   i of M(OH)i kept, default all of FORMATION), or a salt of a weak acid.
                                   { s, especes: { "M": c, "1": c, … } } (hydroxide) or { s, alpha } (salt of a weak acid).
     phPrecipitation(sel, c, o)    pH range [0, 14] where the solid exists for a total cation concentration c: [{ de, a }].
     FORMATION                     { cle: { M, L, lgK: [successive log K_i] } }.
     lgBeta(lgK)                   cumulative log β_n = Σ log K_i.
     distributionComplexes(lgK, pL)  fractions α_0…α_n of M, ML, …, ML_n at free ligand pL = −log [L].
     predominance(lgK, a, b)       on pL ∈ [a, b], the species of largest fraction: [{ i, de, a }] in increasing pL.
     solubiliteComplexant(sel, cle, cL)  the salt M X_ν in excess in a ligand L of total concentration cL:
                                   { s, L, fractions }. The ligand's own acid-base reactions are neglected. */
  const SELS = Object.freeze({
    "AgCl": { pKs: 9.74, ions: [["Ag^+", 1], ["Cl^-", 1]] },
    "AgBr": { pKs: 12.3, ions: [["Ag^+", 1], ["Br^-", 1]] },
    "AgI": { pKs: 16.08, ions: [["Ag^+", 1], ["I^-", 1]] },
    "Ag2CrO4": { pKs: 11.92, ions: [["Ag^+", 2], ["CrO4^2-", 1]] },
    "BaSO4": { pKs: 9.96, ions: [["Ba^2+", 1], ["SO4^2-", 1]] },
    "CaSO4": { pKs: 4.62, ions: [["Ca^2+", 1], ["SO4^2-", 1]] },
    "CaCO3": { pKs: 8.35, ions: [["Ca^2+", 1], ["CO3^2-", 1]] },          // calcite
    "CaF2": { pKs: 10.41, ions: [["Ca^2+", 1], ["F^-", 2]] },
    "Mg(OH)2": { pKs: 11.15, ions: [["Mg^2+", 1], ["HO^-", 2]] },
    "Cu(OH)2": { pKs: 19.32, ions: [["Cu^2+", 1], ["HO^-", 2]] },
    "Zn(OH)2": { pKs: 15.52, ions: [["Zn^2+", 1], ["HO^-", 2]] },        // amorphous
    "Fe(OH)3": { pKs: 38.8, ions: [["Fe^3+", 1], ["HO^-", 3]] },
    "Al(OH)3": { pKs: 33.5, ions: [["Al^3+", 1], ["HO^-", 3]] },        // α
  });
  for (const k in SELS) { Object.freeze(SELS[k]); SELS[k].ions.forEach(Object.freeze); Object.freeze(SELS[k].ions); }
  const sel_ = s => { const d = SELS[s]; if (!d) throw new Error("sel inconnu : " + s); return d; };
  const ks = s => Math.pow(10, -sel_(s).pKs);
  function solubiliteEau(s) {
    const { ions } = sel_(s), n = ions.reduce((a, [, v]) => a + v, 0);
    return Math.pow(ks(s) / ions.reduce((a, [, v]) => a * Math.pow(v, v), 1), 1 / n);
  }
  function solubilite(s, c0 = {}, o = {}) {
    const { ions } = sel_(s), pKs = o.pKs !== undefined ? o.pKs : sel_(s).pKs, g = o.gamma || {};
    let lnK = -pKs * Math.LN10;
    for (const [x, v] of ions) lnK -= v * Math.log(g[x] || 1);
    const f = l => ions.reduce((a, [x, v]) => a + v * Math.log((c0[x] || 0) + v * Math.exp(l)), 0) - lnK;   // increasing
    if (ions.every(([x]) => c0[x] > 0) && f(-Infinity) >= 0) return 0;
    let hi = (lnK - ions.reduce((a, [, v]) => a + v * Math.log(v), 0)) / ions.reduce((a, [, v]) => a + v, 0), lo = hi - 400;
    for (let k = 0; k < 120; k++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
    return Math.exp((lo + hi) / 2);
  }
  const saturation = (s, c) => sel_(s).ions.reduce((a, [x, v]) => a * Math.pow(c[x] || 0, v), 1) / ks(s);
  const ionique = c => Object.keys(c).reduce((a, x) => a + c[x] * formule(x).charge ** 2, 0) / 2;
  const A_DH = 0.509;
  const davies = (z, I) => Math.pow(10, -A_DH * z * z * (Math.sqrt(I) / (1 + Math.sqrt(I)) - 0.3 * I));
  function solubiliteDavies(s, c0 = {}, autres = {}) {
    const { ions } = sel_(s);
    let gamma = {}, sol = solubilite(s, c0), I = 0;
    for (let k = 0; k < 200; k++) {
      const c = Object.assign({}, autres);
      for (const x in c0) c[x] = (c[x] || 0) + c0[x];
      for (const [x, v] of ions) c[x] = (c[x] || 0) + v * sol;
      I = ionique(c);
      gamma = {}; for (const [x] of ions) gamma[x] = davies(formule(x).charge, I);
      const next = solubilite(s, c0, { gamma });
      if (Math.abs(next - sol) <= 1e-12 * sol) { sol = next; break; }
      sol = (sol + next) / 2;
    }
    return { s: sol, I, gamma };
  }
  function partage(cTot, sels) {
    const parts = sels.map(({ sel, c, pKs }) => { const [[, a], [, b]] = sel_(sel).ions; return { sel, c, a, b, K: pKs === undefined ? ks(sel) : Math.pow(10, -pKs) }; });
    const at = M => {
      const out = {}; let pris = 0;
      for (const p of parts) {
        const libre = Math.pow(M, p.a) * Math.pow(p.c, p.b) > p.K ? Math.pow(p.K / Math.pow(M, p.a), 1 / p.b) : p.c;
        out[p.sel] = { libre, solide: (p.c - libre) / p.b }; pris += p.a * out[p.sel].solide;
      }
      return { out, pris };
    };
    if (!(cTot > 0)) return { M: 0, sels: at(0).out };
    let lo = Math.log(cTot) - 400, hi = Math.log(cTot);
    for (let k = 0; k < 120; k++) { const m = (lo + hi) / 2; if (Math.exp(m) + at(Math.exp(m)).pris > cTot) hi = m; else lo = m; }
    const M = Math.exp((lo + hi) / 2);
    return { M, sels: at(M).out };
  }
  const PKE = 14.00;                     // 13,99 at 298,15 K and 0,1 MPa
  const ANIONS_BASIQUES = Object.freeze({ "CO3^2-": [6.352, 10.329], "F^-": [3.17], "CrO4^2-": [6.51], "SO4^2-": [1.99] });
  /* fraction of the acid H_nA whose fully deprotonated form is the anion, pKa in increasing order */
  function alphaBase(pKa, pH) {
    const n = pKa.length; let somme = 1, terme = 0;            // Σ_k h^k / (Ka_n … Ka_{n−k+1}), relative to [A]
    for (let k = 1; k <= n; k++) { terme += pKa[n - k] - pH; somme += Math.pow(10, terme); }
    return 1 / somme;
  }
  function solubilitePH(s, pH, o = {}) {
    const { ions } = sel_(s), [[M, vm], [X, vx]] = ions, pKe = o.pKe || PKE;
    if (X === "HO^-") {
      if (vm !== 1) throw new Error("solubilitePH : hydroxyde M(OH)n attendu");
      const lw = pH - pKe, cle = Object.keys(FORMATION).find(k => FORMATION[k].M === M && FORMATION[k].L === "HO^-");
      const lb = cle ? lgBeta(FORMATION[cle].lgK) : [0];
      const garder = o.complexes || lb.map((_, i) => i).slice(1);
      const lM = -sel_(s).pKs - vx * lw, especes = { M: Math.pow(10, lM) };
      let tot = especes.M;
      for (const i of garder) { if (!(i in lb) || i === 0) continue; especes[i] = Math.pow(10, lM + lb[i] + i * lw); tot += especes[i]; }
      return { s: tot, especes };
    }
    const pKa = ANIONS_BASIQUES[X];
    if (!pKa) throw new Error("solubilitePH : " + X + " n'est ni HO⁻ ni la base d'un acide connu");
    const alpha = alphaBase(pKa, pH);
    return { s: solubilite(s, {}, { gamma: { [X]: alpha } }), alpha };   // [X]free = α · c(X), like a coefficient
  }
  function phPrecipitation(s, c, o = {}) {
    const ex = pH => solubilitePH(s, pH, o).s < c, out = [];
    const bord = (a, b) => { const ea = ex(a); for (let k = 0; k < 60; k++) { const m = (a + b) / 2; if (ex(m) === ea) a = m; else b = m; } return (a + b) / 2; };
    let de = ex(0) ? 0 : null;
    for (let k = 1; k <= 1400; k++) {
      const p0 = (k - 1) / 100, p1 = k / 100;
      if (ex(p0) !== ex(p1)) { const b = bord(p0, p1); if (de === null) de = b; else { out.push({ de, a: b }); de = null; } }
    }
    if (de !== null) out.push({ de, a: 14 });
    return out;
  }
  const FORMATION = Object.freeze({
    "Ag-NH3": { M: "Ag^+", L: "NH3", lgK: [3.31, 3.91] },
    "Cu-NH3": { M: "Cu^2+", L: "NH3", lgK: [4.04, 3.43, 2.80, 1.48] },
    "Zn-HO": { M: "Zn^2+", L: "HO^-", lgK: [5.0, 6.1, 2.5, 1.2] },     // K2, K4 less reliable (bracketed in the source)
    "Al-HO": { M: "Al^3+", L: "HO^-", lgK: [9.01, 9.69, 8.3, 6.0] },  // K2, K3 less reliable
    "Fe-SCN": { M: "Fe^3+", L: "SCN^-", lgK: [3.02] },
    "Ca-EDTA": { M: "Ca^2+", L: "Y^4-", lgK: [10.69] },                // 20 °C, I = 0,1 mol·L⁻¹
    "Mg-EDTA": { M: "Mg^2+", L: "Y^4-", lgK: [8.79] },                 // 20 °C, I = 0,1 mol·L⁻¹
  });
  for (const k in FORMATION) { Object.freeze(FORMATION[k]); Object.freeze(FORMATION[k].lgK); }
  const lgBeta = lgK => lgK.reduce((a, k) => (a.push(a[a.length - 1] + k), a), [0]);
  function distributionComplexes(lgK, pL) {
    if (pL === Infinity) return lgBeta(lgK).map((_, i) => i ? 0 : 1);
    const lb = lgBeta(lgK), y = lb.map((b, i) => b - i * pL), m = Math.max(...y);
    const w = y.map(v => Math.pow(10, v - m)), tot = w.reduce((a, v) => a + v, 0);
    return w.map(v => v / tot);
  }
  function predominance(lgK, a, b) {
    const lb = lgBeta(lgK), out = [];
    let i = lb.reduce((best, v, k) => v - k * b >= lb[best] - best * b ? k : best, 0), haut = b;
    for (;;) {                                   // walk down in pL: the next species is the first line to cross over
      let next = null, x = -Infinity;
      for (let j = i + 1; j < lb.length; j++) { const p = (lb[j] - lb[i]) / (j - i); if (p >= x) { x = p; next = j; } }
      if (next === null || x <= a) { out.unshift({ i, de: a, a: haut }); return out; }
      if (x < haut) { out.unshift({ i, de: x, a: haut }); haut = x; }
      i = next;
    }
  }
  function solubiliteComplexant(s, cle, cL) {
    const { ions } = sel_(s), [[M, vm], [, vx]] = ions, cx = FORMATION[cle];
    if (vm !== 1 || cx.M !== M) throw new Error("solubiliteComplexant : " + s + " et " + cle + " ne vont pas ensemble");
    const b = lgBeta(cx.lgK).map(v => Math.pow(10, v));
    const at = L => {
      const sigma = b.reduce((a, v, i) => a + v * Math.pow(L, i), 0), lie = b.reduce((a, v, i) => a + i * v * Math.pow(L, i), 0) / sigma;
      const sol = Math.pow(ks(s) * sigma / Math.pow(vx, vx), 1 / (1 + vx));
      return { s: sol, pris: sol * lie, sigma };
    };
    if (!(cL > 0)) return { s: solubiliteEau(s), L: 0, fractions: distributionComplexes(cx.lgK, Infinity) };
    let lo = Math.log(cL) - 400, hi = Math.log(cL);
    for (let k = 0; k < 120; k++) { const m = (lo + hi) / 2, L = Math.exp(m); if (L + at(L).pris > cL) hi = m; else lo = m; }
    const L = Math.exp((lo + hi) / 2);
    return { s: at(L).s, L, fractions: distributionComplexes(cx.lgK, -Math.log10(L)) };
  }
  const PRECIPITATION = { SELS, ks, solubiliteEau, solubilite, saturation, ionique, davies, solubiliteDavies, partage, PKE, ANIONS_BASIQUES,
    alphaBase, solubilitePH, phPrecipitation, FORMATION, lgBeta, distributionComplexes, predominance, solubiliteComplexant };

  /* ---------- acides et bases (X.chim_acidobase.1 to 4) ----------
     Brønsted couples in water at 298,15 K, activity = c/c° (ideal dilute solution), PKE of the section above (14,00; 13,995 measured).
     A system is one polyacid: { id, formes: ["H3PO4", "H2PO4^-", …], pKa: [2.16, 7.21, 12.32] (ascending), z: charge of formes[0] }.
     Form j has lost j protons: charge z − j. pKa[j] is the couple formes[j]/formes[j+1].
     ACIDES                      systems of the programme, pKa from CRC Handbook (86th ed., 2005), section 8.
     fractions(pKa, pH)          α_j = [form j]/c, sum 1, computed in log space (no overflow at pH −3 or 17).
     apports → solution          what is poured in: [{ id, j, c }] (id of ACIDES, form j, mol·L⁻¹), or { pKa: [..], z, j, c } (any acid,
                                 forms A0, A1, … ; pH and especes only), or { id: "H3O+", c } (strong acid,
                                 Cl⁻ counter-ion), { id: "HO-", c } (strong base, Na⁺ counter-ion). Each form comes with its
                                 counter-ion (Na⁺ or Cl⁻), so the solution is neutral: solution(apports) → { systemes, q }.
     melange(parts)              [{ V (L), apports }] → apports of the mixture, every c diluted by V/ΣV.
     pH(apports, o)              exact: root of the charge balance h − Ke/h + Σ c (z − ⟨j⟩) + q = 0, which falls strictly with pH
                                 (bisection, 1e-12 in pH). o = { pKe }.
     especes(apports, pH)        { "CH3COOH": c, …, "H3O^+": h, "HO^-": Ke/h } (species named as in texte()).
     pouvoirTampon(apports, pH)  β = dc_base/dpH = ln 10 (h + Ke/h + Σ c Var(j)), mol·L⁻¹ per pH unit: exact for the model.
     reactionPreponderante(apports, o)  the method of the programme: the strongest acid present on the strongest base present,
                                 total if K° ≥ o.seuil (default 10⁴), until the next one has K° < seuil; that one is the
                                 equilibrium RP, solved alone. { etapes: [{ acide, base, lgK, totale, x }], pH, final, couple,
                                 controle: neglected over kept, the a posteriori check of the method (≪ 1 when it holds) }.
     formules usuelles           pHFort(c), pHFaible(pKa, c), pHBaseFaible(pKa, c), pHAmpholyte(pKa1, pKa2), pHTampon(pKa, ca, cb):
                                 each one a RP plus one approximation, compared to pH() in test/chim-solutions.test.js.
     forceIonique(apports, pH)   I = ½ Σ c z², every form and counter-ion included; γ from davies(z, I) of the section above.
     titrage(analyte, titrant, V) pH after V (L) of titrant: analyte = { V0, apports }, titrant = apports per litre.
     INDICATEURS                 { id, zone: [pH1, pH2], pK }, CRC Handbook « Acid-Base Indicators » (Covington). */
  const LN10 = Math.LN10;
  const ACIDES = Object.freeze([
    { id: "ethanoique", formes: ["CH3COOH", "CH3COO^-"], pKa: [4.76], z: 0 },
    { id: "methanoique", formes: ["HCOOH", "HCOO^-"], pKa: [3.75], z: 0 },
    { id: "benzoique", formes: ["C6H5COOH", "C6H5COO^-"], pKa: [4.20], z: 0 },
    { id: "ammonium", formes: ["NH4^+", "NH3"], pKa: [9.25], z: 1 },
    { id: "hydrogenosulfate", formes: ["HSO4^-", "SO4^2-"], pKa: [1.99], z: -1 },
    { id: "carbonique", formes: ["CO2", "HCO3^-", "CO3^2-"], pKa: [6.35, 10.33], z: 0 },
    { id: "phosphorique", formes: ["H3PO4", "H2PO4^-", "HPO4^2-", "PO4^3-"], pKa: [2.16, 7.21, 12.32], z: 0 },
  ].map(a => Object.freeze(Object.assign(a, { formes: Object.freeze(a.formes), pKa: Object.freeze(a.pKa) }))));
  const INDICATEURS = Object.freeze([
    { id: "helianthine", zone: [3.2, 4.4], pK: 3.46 }, { id: "rougeMethyle", zone: [4.8, 6.0], pK: 5.00 },
    { id: "bleuBromothymol", zone: [6.0, 7.6], pK: 7.30 }, { id: "phenolphtaleine", zone: [8.2, 10.0], pK: 9.5 },
  ].map(Object.freeze));
  const acide = id => { const a = ACIDES.find(x => x.id === id); if (!a) throw new Error("acide inconnu : " + id); return a; };
  /* an acid of the reader's choice: { pKa: [..], z, j, c }, forms named A0, A1, … */
  const libre = p => { if (!p.pKa.every((k, i) => Number.isFinite(k) && (i === 0 || k > p.pKa[i - 1]))) throw new Error("pKa non croissants : " + p.pKa);
    return { id: "pKa " + p.pKa.join(" ") + " z " + (p.z || 0), formes: p.pKa.concat([0]).map((_, i) => "A" + i), pKa: p.pKa, z: p.z || 0 }; };
  function fractions(pKa, pH) {
    const lw = [0];                                       // lg of [form j]/[form 0] = Σ_{i<j} (pH − pKa_i)
    for (let i = 0; i < pKa.length; i++) lw.push(lw[i] + pH - pKa[i]);
    const m = Math.max(...lw), w = lw.map(l => Math.pow(10, l - m)), s = w.reduce((a, b) => a + b, 0);
    return w.map(x => x / s);
  }
  function solution(apports) {
    const sys = new Map(); let q = 0;
    for (const p of apports) {
      if (!(p.c >= 0)) throw new Error("concentration négative ou absente : " + JSON.stringify(p));
      if (p.id === "H3O+") { q -= p.c; continue; }       // H3O⁺ + Cl⁻ : Cl⁻ stays in the balance, H3O⁺ is in h
      if (p.id === "HO-") { q += p.c; continue; }        // Na⁺ + HO⁻
      const a = p.pKa ? libre(p) : acide(p.id), j = p.j || 0;
      if (!(j >= 0 && j <= a.pKa.length && Number.isInteger(j))) throw new Error("forme " + j + " absente de " + p.id);
      q -= (a.z - j) * p.c;                               // the counter-ion carries the opposite charge
      const s = sys.get(a.id) || { id: a.id, formes: a.formes, pKa: a.pKa, z: a.z, c: 0 }; s.c += p.c; sys.set(a.id, s);
    }
    return { systemes: [...sys.values()], q };
  }
  function melange(parts) {
    const V = parts.reduce((s, p) => s + p.V, 0);
    if (!(V > 0)) throw new Error("volume total nul");
    return parts.flatMap(p => p.apports.map(a => Object.assign({}, a, { c: a.c * p.V / V })));
  }
  const moyenneJ = (pKa, pH) => fractions(pKa, pH).reduce((s, a, j) => s + a * j, 0);
  function bilanCharge(sol, pH, pKe) {
    const h = Math.pow(10, -pH), w = Math.pow(10, pH - pKe);
    return sol.systemes.reduce((s, x) => s + x.c * (x.z - moyenneJ(x.pKa, pH)), h - w + sol.q);
  }
  function pH(apports, o) {
    const pKe = (o && o.pKe) || PKE, sol = solution(apports);
    let lo = -3, hi = pKe + 3;
    if (bilanCharge(sol, lo, pKe) < 0 || bilanCharge(sol, hi, pKe) > 0) throw new Error("pH hors de [−3, " + (pKe + 3) + "]");
    while (hi - lo > 1e-12) { const m = (lo + hi) / 2; if (bilanCharge(sol, m, pKe) > 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function especes(apports, p, o) {
    const pKe = (o && o.pKe) || PKE, sol = solution(apports), out = { "H3O^+": Math.pow(10, -p), "HO^-": Math.pow(10, p - pKe) };
    for (const s of sol.systemes) fractions(s.pKa, p).forEach((a, j) => out[s.formes[j]] = s.c * a);
    return out;
  }
  function pouvoirTampon(apports, p, o) {
    const pKe = (o && o.pKe) || PKE, sol = solution(apports);
    const v = sol.systemes.reduce((s, x) => { const f = fractions(x.pKa, p), m = f.reduce((t, a, j) => t + a * j, 0);
      return s + x.c * f.reduce((t, a, j) => t + a * (j - m) * (j - m), 0); }, 0);
    return LN10 * (Math.pow(10, -p) + Math.pow(10, p - pKe) + v);
  }
  /* the method of the programme, step by step */
  function reactionPreponderante(apports, o) {
    o = o || {}; const pKe = o.pKe || PKE, seuil = o.seuil || 1e4, lgSeuil = Math.log10(seuil);
    const n = { "H3O^+": 0, "HO^-": 0 }, couples = [];             // concentrations of every form
    for (const p of apports) {
      if (p.id === "H3O+" || p.id === "HO-") { n[p.id === "H3O+" ? "H3O^+" : "HO^-"] += p.c; continue; }
      const a = acide(p.id);
      a.formes.forEach(f => n[f] = n[f] || 0);
      n[a.formes[p.j || 0]] += p.c;
      if (!couples.some(c => c.sys === a.id)) a.pKa.forEach((k, i) => couples.push({ sys: a.id, acide: a.formes[i], base: a.formes[i + 1], pKa: k }));
    }
    couples.push({ sys: "eau+", acide: "H3O^+", base: "H2O", pKa: 0 }, { sys: "eau-", acide: "H2O", base: "HO^-", pKa: pKe });
    const dispo = s => s === "H2O" || n[s] > 0, conc = s => s === "H2O" ? 1 : n[s];  // water: solvent, activity 1, never runs out
    /* a posteriori check: what the method left out, over what it kept. Water couple: autoprotolysis, Ke/h over h (or h over
       Ke/h). Weak couple: its reaction on water, h + Ke/h over the smaller of its two forms. Under 0,1, the pH is right to ~0,05. */
    const controle = (c, p) => { const h = Math.pow(10, -p), w = Math.pow(10, p - pKe);
      return c.acide === "H3O^+" ? w / h : c.base === "HO^-" ? h / w : (h + w) / Math.min(conc(c.acide), conc(c.base)); };
    const etapes = [];
    for (let k = 0; k < 50; k++) {
      const A = couples.filter(c => dispo(c.acide)).sort((a, b) => a.pKa - b.pKa)[0];
      const B = couples.filter(c => dispo(c.base)).sort((a, b) => b.pKa - a.pKa)[0];
      if (A === B || (A.acide === B.base && A.base === B.acide)) {       // acid and base of one couple: nothing left to react
        const p = A.pKa + Math.log10(conc(A.base) / conc(A.acide));
        return { etapes, pH: p, final: Object.assign({}, n), couple: A, controle: controle(A, p) };
      }
      const lgK = B.pKa - A.pKa, eau = s => s === "H2O";
      /* net change per unit of x, water left out: an ampholyte (2 HCO₃⁻ = CO₂ + CO₃²⁻) counts twice */
      const d = {};
      for (const [s, v] of [[A.acide, -1], [B.base, -1], [A.base, 1], [B.acide, 1]]) if (!eau(s)) d[s] = (d[s] || 0) + v;
      const borne = sg => Math.min(...Object.entries(d).filter(([, v]) => v * sg < 0).map(([s, v]) => n[s] / Math.abs(v)), Infinity);
      const xmax = borne(1), xmin = -borne(-1);
      const avance = x => { for (const s in d) { n[s] += d[s] * x; if (n[s] < 1e-15 * Math.abs(x)) n[s] = 0; } };
      if (lgK >= lgSeuil) {                                          // total: the limiting reactant is used up
        if (!Number.isFinite(xmax)) throw new Error("réaction totale sans réactif limitant");
        avance(xmax);
        etapes.push({ acide: A.acide, base: B.base, produits: [A.base, B.acide], lgK, totale: true, x: xmax });
        continue;
      }
      /* equilibrium RP, alone: lg Q(x) − lgK rises with x */
      const lgQ = x => Object.entries(d).reduce((s, [sp, v]) => s + v * Math.log10(n[sp] + v * x), 0);
      let lo = Number.isFinite(xmin) ? xmin : -1, hi = Number.isFinite(xmax) ? xmax : 1;
      for (let i = 0; i < 400; i++) { const m = (lo + hi) / 2; if (m === lo || m === hi) break; if (lgQ(m) < lgK) lo = m; else hi = m; }
      const x = (lo + hi) / 2;
      avance(x);
      etapes.push({ acide: A.acide, base: B.base, produits: [A.base, B.acide], lgK, totale: false, x });
      const c = n["H3O^+"] > 0 && (A.acide === "H3O^+" || B.acide === "H3O^+") ? { pKa: 0, acide: "H3O^+", base: "H2O" }
        : n["HO^-"] > 0 && (A.base === "HO^-" || B.base === "HO^-") ? { pKa: pKe, acide: "H2O", base: "HO^-" } : A;
      const p = c.pKa + Math.log10(conc(c.base) / conc(c.acide));
      return { etapes, pH: p, final: Object.assign({}, n), couple: c, controle: controle(c, p) };
    }
    throw new Error("réaction prépondérante : pas de fin en 50 étapes");
  }
  const pHFort = c => -Math.log10(c);
  const pHFaible = (pKa, c) => (pKa - Math.log10(c)) / 2;
  const pHBaseFaible = (pKa, c, pKe) => ((pKe || PKE) + pKa + Math.log10(c)) / 2;
  const pHAmpholyte = (pKa1, pKa2) => (pKa1 + pKa2) / 2;
  const pHTampon = (pKa, ca, cb) => pKa + Math.log10(cb / ca);
  function forceIonique(apports, p, o) {
    const pKe = (o && o.pKe) || PKE, sol = solution(apports);
    let s = Math.pow(10, -p) + Math.pow(10, p - pKe);
    for (const x of sol.systemes) fractions(x.pKa, p).forEach((a, j) => s += x.c * a * (x.z - j) ** 2);
    for (const a of apports) {                            // counter-ions Na⁺, Cl⁻, one charge each
      const zf = a.id === "H3O+" ? -1 : a.id === "HO-" ? 1 : (a.pKa ? libre(a) : acide(a.id)).z - (a.j || 0);
      s += a.c * Math.abs(zf);
    }
    return s / 2;
  }
  const titrage = (analyte, titrant, V) => pH(melange([{ V: analyte.V0, apports: analyte.apports }, { V, apports: titrant }]));
  const ACIDE_BASE = { ACIDES, INDICATEURS, fractions, solution, melange, pH, especes, pouvoirTampon, reactionPreponderante,
    pHFort, pHFaible, pHBaseFaible, pHAmpholyte, pHTampon, forceIonique, titrage };

  /* ---------- diagrammes potentiel-pH, courbes intensité-potentiel (étape « Diagrammes potentiel-pH et intensité-potentiel ») ----------
     A species s of the element M carries one atom of M, formula M O_a H_b^z. Its formation from the metal, M + a H₂O = s + α H⁺ + n e⁻,
     gives α = 2a − b and n = z + 2a − b, the oxidation number of M. Its reduced free enthalpy, in volts:
       G(pH, E)/F = g° − α p pH − n E + p lg a(s),  p = RT ln 10/F,  g° = 0 for the metal.
     At (pH, E), the stable species minimises G: each domain is a convex polygon, each frontier a straight line.
     systemeEpH(def)       def = { element, pKe = PKE (14,00), especes: [{ s, phase: "solide"|"aq", and one of: g0 (V); E0 and red, the couple s/red;
                           pKs and ion, s(solide) = ion + k HO⁻, Ks = [ion][HO⁻]^k }] }, each relation naming a species defined before.
                           → { element, pKe, especes: [{ s, phase, a, b, z, n, alpha, g0 }] }.
     diagrammeEpH(sys, o)  o = { c (mol·L⁻¹, default 10⁻²), pH: [0, 14], E: [−1, 1,5] (V) }. Tracing convention: a dissolved species at
                           activity c (so two dissolved species have equal concentrations on their frontier), a solid at activity 1.
                           → { c, especes: [{ …, poly: [[pH, E], …] }] (poly = [] when the species has no domain: it dismutes),
                               frontieres: [{ s1, s2, verticale, pH | pente (V per pH unit), E0 (V at pH 0), seg: [[pH, E], [pH, E]] }] }.
     especeStable(d, pH, E)  the species of diagram d stable at (pH, E).
     eau(pH, o)            { O2, H2 }: E of O₂/H₂O and of H⁺/H₂ at that pH, o.pO2 and o.pH2 in bar (default 1).
     FER                   iron: Fe, Fe²⁺, Fe³⁺, Fe(OH)₂, Fe(OH)₃; E° of COUPLES (fe2, fe32), pKs 15 and 38, the rounded values of CPGE.
     courant(E, b)         current density (A·m⁻²) of the couple b = { E0 (V, at the pH of the solution), n, k0 (m·s⁻¹), cox, cred (mol·L⁻¹),
                           kdA, kdC (m·s⁻¹, diffusion of Red and Ox; Infinity: no limit, the electrode metal or the solvent), alpha = 0,5, T }:
                           Butler–Volmer with a stationary diffusion layer,
                           i = nF k0 (cred eᴬ − cox eᶜ)/(1 + k0 eᴬ/kdA + k0 eᶜ/kdC), eᴬ = exp(α n f (E − E0)), eᶜ = exp(−(1 − α) n f (E − E0)).
                           i = 0 at the Nernst potential; plateaus nF kdA cred and −nF kdC cox. A model for drawing: the programme is qualitative.
     K_H2                  k0 (m·s⁻¹) of H⁺/H₂ on a metal, from the exchange current density j0 = 2F k0 c° measured in 1 mol·L⁻¹ HCl
                           (Trasatti 1972): pt 10 A·m⁻², hg 2 × 10⁻⁸ A·m⁻², pb 2 × 10⁻⁹ A·m⁻².
     brancheH2(pH, k0)     reduction of the solvent into H₂ (no H₂ present): E0 = −p pH, α = 0,75, cathodic Tafel slope 0,118 V per decade.
     brancheO2(pH, k0 = 1e−13)  oxidation of the solvent into O₂ (no O₂ present): E0 = 1,23 − p pH, α = 0,25, 0,059 V per decade. Model values.
     brancheO2red(pH, c, kd)  reduction of dissolved O₂ at c (mol·L⁻¹), limited by diffusion (kd, m·s⁻¹): plateau 4F kd c.
     courbeIE(bs, [E1, E2], N = 400)  N + 1 points [E, j] of the summed curve, for drawing.
     potentielPourCourant(bs, j, [E1, E2])  E where the sum of the currents of the couples bs is j (monotone: bisection); null out of [E1, E2].
     potentielMixte(bs, [E1, E2])  { E, j }: the sum is zero; j = anodic current of the electrode (corrosion current density).
     electrolyse(anode, cathode, j, r, [E1, E2])  { Ea, Ec, U }: U = Ea − Ec + r j, r = area resistance (Ω·m²); null when j is out of reach.
     masseFaraday(I, t, M, n, rendement)  mass (kg) formed by I (A) during t (s): rendement · I t M/(nF), M in kg·mol⁻¹.
     vitesseCorrosion(j, M, n, rho)  thickness lost per second (m·s⁻¹) at the anodic current density j (A·m⁻²), rho in kg·m⁻³. */
  function systemeEpH(def) {
    const X = def.element, pKe = def.pKe === undefined ? PKE : def.pKe, by = {}, p = pente(T0);
    const especes = def.especes.map(d => {
      const f = formule(d.s);
      if (f.atomes[X] !== 1) throw new Error("systemeEpH : " + d.s + " doit porter un seul atome de " + X);
      for (const Y in f.atomes) if (Y !== X && Y !== "O" && Y !== "H") throw new Error("systemeEpH : " + Y + " dans " + d.s + ", seuls " + X + ", O et H");
      const a = f.atomes.O || 0, b = f.atomes.H || 0, alpha = 2 * a - b, n = f.charge + alpha, z = f.charge;
      const phase = d.phase || (z === 0 && a === 0 ? "solide" : "aq");
      const de = s => { if (!by[s]) throw new Error("systemeEpH : " + s + " doit être défini avant " + d.s); return by[s]; };
      let g0;
      if ("g0" in d) g0 = d.g0;
      else if ("E0" in d) {
        const r = de(d.red);
        if (!(n > r.n)) throw new Error("systemeEpH : " + d.s + " n'est pas l'oxydant de " + d.red);
        g0 = r.g0 + (n - r.n) * d.E0;                                       // ΔrG° = −(n − n_red) F E° for s + … e⁻ = red
      } else if ("pKs" in d) {
        const ion = de(d.ion), k = alpha - ion.alpha;
        if (phase !== "solide" || ion.n !== n || !(k > 0)) throw new Error("systemeEpH : " + d.s + " n'est pas un hydroxyde de " + d.ion);
        g0 = ion.g0 + p * (k * pKe - d.pKs);                                // s + k H⁺ = ion + k H₂O, lg K = k pKe − pKs
      } else throw new Error("systemeEpH : " + d.s + " sans g0, E0 ni pKs");
      return by[d.s] = Object.freeze({ s: d.s, phase, a, b, z, n, alpha, g0 });
    });
    if (!especes.some(e => e.g0 === 0 && e.n === 0)) throw new Error("systemeEpH : le métal " + X + " (g0 = 0) manque");
    return Object.freeze({ element: X, pKe, especes: Object.freeze(especes) });
  }
  function diagrammeEpH(sys, o = {}) {
    const c = o.c === undefined ? 1e-2 : o.c, [x0, x1] = o.pH || [0, 14], [y0, y1] = o.E || [-1, 1.5], p = pente(T0);
    if (!(c > 0)) throw new Error("diagrammeEpH : concentration de tracé " + c);
    /* G/F = k − A pH − B E */
    const L = sys.especes.map(e => ({ k: e.g0 + (e.phase === "aq" ? p * Math.log10(c / C0) : 0), A: e.alpha * p, B: e.n }));
    const G = (i, x, y) => L[i].k - L[i].A * x - L[i].B * y;
    const diff = (i, j) => ([x, y]) => G(i, x, y) - G(j, x, y);
    const tol = 1e-9 * (1 + Math.abs(y1 - y0) + Math.abs(x1 - x0));
    const clip = (poly, f) => {
      const out = [];
      poly.forEach((P, k) => {
        const Q = poly[(k + 1) % poly.length], fp = f(P), fq = f(Q);
        if (fp <= tol) out.push(P);
        if ((fp < -tol && fq > tol) || (fp > tol && fq < -tol)) { const t = fp / (fp - fq); out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]); }
      });
      return out;
    };
    const aire = poly => Math.abs(poly.reduce((s, P, k) => { const Q = poly[(k + 1) % poly.length]; return s + P[0] * Q[1] - Q[0] * P[1]; }, 0)) / 2;
    const especes = sys.especes.map((e, i) => {
      let poly = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      for (let j = 0; j < L.length && poly.length; j++) if (j !== i) poly = clip(poly, diff(i, j));
      return Object.assign({}, e, { poly: poly.length >= 3 && aire(poly) > tol ? poly : [] });
    });
    const frontieres = [];
    for (let i = 0; i < especes.length; i++) for (let j = i + 1; j < especes.length; j++) {
      const P = especes[i].poly, f = diff(i, j);
      let seg = null;
      P.forEach((A, k) => { const B = P[(k + 1) % P.length];
        if (Math.abs(f(A)) <= 10 * tol && Math.abs(f(B)) <= 10 * tol && Math.hypot(B[0] - A[0], B[1] - A[1]) > tol) seg = [A, B]; });
      if (!seg || !especes[j].poly.length) continue;
      const dk = L[i].k - L[j].k, dA = L[i].A - L[j].A, dB = L[i].B - L[j].B;
      frontieres.push(dB === 0 ? { s1: especes[i].s, s2: especes[j].s, verticale: true, pH: dk / dA, seg }
        : { s1: especes[i].s, s2: especes[j].s, verticale: false, pente: -dA / dB, E0: dk / dB, seg });
    }
    return { c, pH: [x0, x1], E: [y0, y1], especes, frontieres, G };
  }
  function especeStable(d, pH, E) {
    let best = 0;
    d.especes.forEach((e, i) => { if (d.G(i, pH, E) < d.G(best, pH, E)) best = i; });
    return d.especes[best];
  }
  const E0_ = id => COUPLES.find(c => c.id === id).E0;
  function eau(pH, o = {}) {
    const p = pente(T0), pO2 = o.pO2 === undefined ? 1 : o.pO2, pH2 = o.pH2 === undefined ? 1 : o.pH2;
    return { O2: E0_("o2") - p * pH + p / 4 * Math.log10(pO2 * 1e5 / P0), H2: E0_("h") - p * pH - p / 2 * Math.log10(pH2 * 1e5 / P0) };
  }
  const FER = systemeEpH({ element: "Fe", especes: [
    { s: "Fe", phase: "solide", g0: 0 },
    { s: "Fe^2+", E0: E0_("fe2"), red: "Fe" },
    { s: "Fe^3+", E0: E0_("fe32"), red: "Fe^2+" },
    { s: "Fe(OH)2", phase: "solide", pKs: 15, ion: "Fe^2+" },
    { s: "Fe(OH)3", phase: "solide", pKs: 38, ion: "Fe^3+" }] });

  function courant(E, b) {
    const T = b.T || T0, f = F_ / (Cst.R * T), al = b.alpha === undefined ? 0.5 : b.alpha, n = b.n;
    const kdA = b.kdA === undefined ? Infinity : b.kdA, kdC = b.kdC === undefined ? Infinity : b.kdC;
    const la = al * n * f * (E - b.E0), lc = -(1 - al) * n * f * (E - b.E0);
    /* divided by the largest exponential, so that no term overflows */
    const m = Math.max(la, lc, 0), eA = Math.exp(la - m), eC = Math.exp(lc - m), e0 = Math.exp(-m);
    const num = n * F_ * b.k0 * 1000 * (b.cred * eA - b.cox * eC);          // c in mol·L⁻¹ → mol·m⁻³
    const den = e0 + b.k0 * eA / kdA + b.k0 * eC / kdC;
    return num / den;
  }
  const sommeCourants = (bs, E) => bs.reduce((s, b) => s + courant(E, b), 0);
  const K_H2 = Object.freeze({ pt: 10 / (2 * F_ * 1000), hg: 2e-8 / (2 * F_ * 1000), pb: 2e-9 / (2 * F_ * 1000) });
  const brancheH2 = (pH, k0) => ({ E0: -pente(T0) * pH, n: 2, k0, cox: 1, cred: 0, alpha: 0.75 });
  const brancheO2 = (pH, k0 = 1e-13) => ({ E0: E0_("o2") - pente(T0) * pH, n: 4, k0, cox: 0, cred: 1, alpha: 0.25 });
  const brancheO2red = (pH, c, kd) => ({ E0: E0_("o2") - pente(T0) * pH, n: 4, k0: 1e-13, cox: c, cred: 0, alpha: 0.75, kdC: kd });
  const courbeIE = (bs, [E1, E2], N = 400) => Array.from({ length: N + 1 }, (_, k) => { const E = E1 + (E2 - E1) * k / N; return [E, sommeCourants(bs, E)]; });
  function potentielPourCourant(bs, j, [E1, E2] = [-3, 3]) {
    if (!(sommeCourants(bs, E1) <= j && sommeCourants(bs, E2) >= j)) return null;
    let lo = E1, hi = E2;
    for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (sommeCourants(bs, m) < j) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function potentielMixte(bs, range) {
    const E = potentielPourCourant(bs, 0, range);
    return E === null ? null : { E, j: bs.reduce((s, b) => s + Math.max(courant(E, b), 0), 0) };
  }
  function electrolyse(anode, cathode, j, r = 0, range) {
    const Ea = potentielPourCourant(anode, j, range), Ec = potentielPourCourant(cathode, -j, range);
    return Ea === null || Ec === null ? null : { Ea, Ec, U: Ea - Ec + r * j };
  }
  const masseFaraday = (I, t, M, n, rendement = 1) => rendement * I * t * M / (n * F_);
  const vitesseCorrosion = (j, M, n, rho) => j * M / (n * F_ * rho);
  const DIAGRAMMES = { systemeEpH, diagrammeEpH, especeStable, eau, FER, courant, K_H2, brancheH2, brancheO2, brancheO2red, courbeIE, potentielPourCourant, potentielMixte, electrolyse, masseFaraday, vitesseCorrosion };

  /* ============ Diagrammes binaires (step « Diagrammes binaires », X.chim_binaires.1 to 4) ============
     Exported as ChimSolutions.Binaires, its own namespace. Isobaric diagrams of a binary {a, b}: x is the mole fraction of a,
     the first body named (the more volatile one, or the first metal); T in K, p in Pa, M in kg·mol⁻¹, energies in J·mol⁻¹.
     CORPS                        { id: { M, antoine?: [[Tmin, Tmax, A, B, C]], Tf?, dHfus? } }. Antoine: log₁₀(p/bar) =
                                  A − B/(T + C), NIST WebBook: water Bridgeman and Aldrich (1964), ethanol Ambrose and Sprake
                                  (1970), benzene Williamham et al. (1945) then Eon et al. (1971), toluene Williamham et al.
                                  (1945). Ranges stretched past the source, in the data: water 373 → 373,2 K, ethanol
                                  366,63 → 374 K, benzene 373,5 → 385 K. Fusion: CRC Handbook (84th ed., 2003); Tf of tin is
                                  the ITS-90 fixed point. Limonene: Teb only, 451 ± 4 K (NIST mean of 13 values).
     psat(id, T)                  Pa; throws outside the ranges.
     Teb(id, p)                   boiling temperature of the pure body under p (default P_ATM = 101 325 Pa).
     SYSTEMES                     { id: { a, b, mesures? } }: "benzene-toluene" ideal (Raoult, pᵢ = xᵢ psatᵢ(T)); "ethanol-eau"
                                  measured under 101,3 kPa (Lai, Lin and Tu, J. Chem. Thermodyn. 68, 13 (2014), via NIST
                                  ThermoML): mesures = [[x, T, y]], 16 points, azeotrope 351,32 K at x = 0,891, read through
                                  a monotone cubic interpolation (Fritsch and Carlson 1980). A system can also be given as
                                  { a, b }: Raoult with the bodies' Antoine equations, for any pair.
     bulle(sys, x, p)             bubble point { T, y } (y: mole fraction of a in the first vapour). The dew curve is the
                                  set of (y, T): a vapour of composition y starts to condense at that T. A measured system
                                  only under its own pressure (± 0,5 kPa).
     courbes(sys, p, n)           n + 1 points { x, y, T } from x = 0 to 1, for drawing.
     azeotrope(sys, p)            { x, T } where y = x inside ]0, 1[, or null.
     conode(sys, x0, T, p)        the state of an overall composition x0 at T: { domaine: "L" | "V" | "L+V", xL, yV, fV }; in
                                  "L+V", the tie line from the boiling liquid xL to the dew vapour yV = y(xL), fV the vapour
                                  fraction of the amount (lever rule). Searched on the side of the azeotrope that holds x0.
     etages(sys, x0, N, p)        fractional distillation at total reflux, N theoretical plates from a boiler liquid x0:
                                  [{ x, y, T }] for the boiler then each plate; the liquid of plate k + 1 is the vapour of
                                  plate k condensed (x_{k+1} = y_k). Stops at the azeotrope, which it cannot cross.
     nonMiscibles(a, b, p)        two liquids with nil miscibility: { T, ya, rapportMasse = m_b/m_a in the distillate }
                                  from psat_a(T) + psat_b(T) = p (heteroazeotrope; Raoult, each liquid pure).
     roseeNM(a, b, ya, p)         dew temperature of a vapour ya over two immiscible liquids: { T, liquide: "a" | "b" | "a+b" }
                                  (pure a condenses first when ya > ya of the heteroazeotrope: ya p = psat_a(T)).
     massique(x, Ma, Mb), molaire(w, Ma, Mb)   mole fraction of a → mass fraction of a, and back.
     moments(x0, x1, x2)          lever rule on a tie line from x1 (phase 1) to x2 (phase 2): { f1, f2 } fractions of the
                                  amount (mole fractions) or of the mass (mass fractions) in each phase. Throws if x0 is outside.
     variance(c, phi, o)          c − o.relations + 2 − φ − (o.pFixee ? 1 : 0): number of intensive variables free.
   Solid–liquid with nil miscibility in the solid (each solid pure), ideal liquid (Schröder 1893, van Laar):
     solubilite(id, T)            mole fraction of id in the liquid in equilibrium with pure solid id: exp[−(ΔH/R)(1/T − 1/Tf)].
     liquidus(id, x)              the inverse: T = 1/(1/Tf − R ln x/ΔH).
     eutectique(a, b)             { x (fraction of a in the eutectic liquid), T }.
     courbesSL(a, b, n)           the two liquidus branches for drawing: { E, a: [[x, T]] from x = 1 to E.x, b: [[x, T]] from
                                  E.x to x = 0 }, n segments each.
     etatSL(a, b, x0, T)          { domaine: "L" | "L+a" | "L+b" | "a+b", xL (fraction of a in the liquid), fL (liquid fraction
                                  of the amount), solide: "a" | "b" | null }; at T = T_E exactly, the liquid side.
     enthalpieSL(a, b, x0, T, cp) H(T) per mole of mixture with ΔH of fusion released by the solid formed; cp equal in all
                                  phases (J·mol⁻¹·K⁻¹). { H, Hsolide (end of the eutectic plateau, at T_E) }.
     refroidissement(a, b, x0, o) cooling curve at constant heat-loss power: o = { T0 (TL + 60 K), T1 (TE − 60 K), P (0,5 W per mole: 1 K·min⁻¹ for the liquid), cp (30), n (400) }.
                                  { t[], T[], fL[], TL (start of solidification), TE, debut, palier: [t1, t2], fin }. */
  const BINAIRES = (() => {
    const R = Cst.R, P_ATM = Cst.atm;
    const CORPS = Object.freeze({
      eau: { M: 18.015e-3, antoine: [[344, 373.2, 5.08354, 1663.125, -45.622]] },
      ethanol: { M: 46.069e-3, antoine: [[292.77, 374, 5.24677, 1598.673, -46.424]] },
      benzene: { M: 78.114e-3, antoine: [[287.7, 354.07, 4.01814, 1203.835, -53.226], [354.07, 385, 4.72583, 1660.652, -1.461]] },
      toluene: { M: 92.141e-3, antoine: [[308.52, 384.66, 4.07827, 1343.943, -53.773]] },
      limonene: { M: 136.24e-3, Teb: 451 },
      Bi: { M: 208.98e-3, Tf: 544.55, dHfus: 11145 },
      Cd: { M: 112.41e-3, Tf: 594.22, dHfus: 6210 },
      Pb: { M: 207.2e-3, Tf: 600.61, dHfus: 4782 },
      Sn: { M: 118.71e-3, Tf: 505.078, dHfus: 7173 },
    });
    const err = m => { throw new Error("binaires : " + m); };
    const corps = id => CORPS[id] || err("corps inconnu « " + id + " »");
    function psat(id, T) {
      const c = corps(id);
      if (!c.antoine) err("pas de pression de vapeur pour " + id);
      const s = c.antoine.find(r => T >= r[0] && T <= r[1]);
      if (!s) err(id + " : T = " + T + " K hors des domaines de l'équation d'Antoine");
      return 1e5 * Math.pow(10, s[2] - s[3] / (T + s[4]));
    }
    const domaine = id => { const a = corps(id).antoine; return [a[0][0], a[a.length - 1][1]]; };
    const dicho = (f, lo, hi, n = 100) => { let flo = f(lo);
      if (flo * f(hi) > 0) err("pas de racine entre " + lo + " et " + hi);
      for (let i = 0; i < n; i++) { const m = (lo + hi) / 2, fm = f(m); if (fm * flo > 0) { lo = m; flo = fm; } else hi = m; }
      return (lo + hi) / 2; };
    function Teb(id, p = P_ATM) { const c = corps(id); if (!c.antoine) return c.Teb; const [a, b] = domaine(id); return dicho(T => psat(id, T) - p, a, b); }

    const LAI_2014 = [[0, 373.15, 0], [0.015, 369.27, 0.139], [0.035, 365.61, 0.261], [0.1, 359.79, 0.436], [0.183, 356.66, 0.525],
      [0.292, 354.88, 0.585], [0.394, 353.89, 0.611], [0.501, 353.06, 0.648], [0.543, 352.73, 0.669], [0.631, 352.04, 0.714],
      [0.749, 351.67, 0.781], [0.794, 351.64, 0.814], [0.848, 351.4, 0.855], [0.899, 351.33, 0.898], [0.949, 351.37, 0.946], [1, 351.45, 1]];
    const SYSTEMES = Object.freeze({
      "benzene-toluene": Object.freeze({ a: "benzene", b: "toluene" }),
      "ethanol-eau": Object.freeze({ a: "ethanol", b: "eau", p: 101300, mesures: LAI_2014, az: Object.freeze({ x: 0.891, T: 351.32 }) }),
    });
    const systeme = s => typeof s === "string" ? (SYSTEMES[s] || err("système inconnu « " + s + " »")) : s;
    /* monotone cubic Hermite interpolation (Fritsch and Carlson 1980): no overshoot between measured points */
    function pchip(X, Y) {
      const n = X.length, h = [], d = [], m = new Array(n);
      for (let i = 0; i < n - 1; i++) { h.push(X[i + 1] - X[i]); d.push((Y[i + 1] - Y[i]) / h[i]); }
      m[0] = d[0]; m[n - 1] = d[n - 2];
      for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : 3 * (h[i - 1] + h[i]) / ((2 * h[i] + h[i - 1]) / d[i - 1] + (h[i] + 2 * h[i - 1]) / d[i]);
      return x => {
        let i = 0; while (i < n - 2 && x > X[i + 1]) i++;
        const t = (x - X[i]) / h[i], t2 = t * t, t3 = t2 * t;
        return (2 * t3 - 3 * t2 + 1) * Y[i] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * Y[i + 1] + (t3 - t2) * h[i] * m[i + 1];
      };
    }
    const interp = new Map();
    const lecture = S => { if (!interp.has(S)) { const X = S.mesures.map(r => r[0]);
      interp.set(S, { T: pchip(X, S.mesures.map(r => r[1])), y: pchip(X, S.mesures.map(r => r[2])) }); } return interp.get(S); };
    function bulle(s, x, p = P_ATM) {
      if (!(x >= 0 && x <= 1)) err("x dans [0, 1] attendu, reçu " + x);
      const S = systeme(s);
      if (S.mesures) {
        if (Math.abs(p - S.p) > 500) err("mesures sous " + S.p + " Pa seulement, demandé " + p);
        const L = lecture(S); return { T: L.T(x), y: x === 0 ? 0 : x === 1 ? 1 : Math.min(Math.max(L.y(x), 0), 1) };
      }
      const [la, ha] = domaine(S.a), [lb, hb] = domaine(S.b), lo = Math.max(la, lb), hi = Math.min(ha, hb);
      const pa = T => x * psat(S.a, T), pt = T => pa(T) + (1 - x) * psat(S.b, T);
      const T = dicho(T => pt(T) - p, lo, hi);
      return { T, y: pa(T) / pt(T) };
    }
    const courbes = (s, p = P_ATM, n = 100) => Array.from({ length: n + 1 }, (_, i) => { const x = i / n, b = bulle(s, x, p); return { x, y: b.y, T: b.T }; });
    function azeotrope(s, p = P_ATM) {
      const g = x => bulle(s, x, p).y - x, N = 200;
      for (let i = 1; i < N - 1; i++) {
        const a = i / N, b = (i + 1) / N;
        if (g(a) * g(b) <= 0 && g(a) !== g(b)) { const x = dicho(g, a, b, 60); return { x, T: bulle(s, x, p).T }; }
      }
      return null;
    }
    function conode(s, x0, T, p = P_ATM) {
      const az = azeotrope(s, p), [lo, hi] = !az ? [0, 1] : x0 <= az.x ? [0, az.x] : [az.x, 1];
      const g = x => bulle(s, x, p).T - T, Tb = bulle(s, x0, p).T;
      if (T <= Tb) return { domaine: "L", xL: x0, yV: null, fV: 0 };
      if (g(lo) * g(hi) > 0) return { domaine: "V", xL: null, yV: x0, fV: 1 };
      const xL = dicho(g, lo, hi, 60), yV = bulle(s, xL, p).y;
      if ((x0 - xL) * (x0 - yV) > 0 || Math.abs(yV - xL) < 1e-12) return { domaine: "V", xL: null, yV: x0, fV: 1 };
      return { domaine: "L+V", xL, yV, fV: moments(x0, xL, yV).f2 };
    }
    function etages(s, x0, N, p = P_ATM) {
      if (!(Number.isInteger(N) && N >= 0)) err("nombre de plateaux entier ≥ 0 attendu, reçu " + N);
      const az = azeotrope(s, p), out = [];
      let x = x0;
      for (let k = 0; k <= N; k++) {
        const b = bulle(s, x, p); out.push({ x, y: b.y, T: b.T });
        if (az && Math.abs(b.y - x) < 1e-6) break;     // at the azeotrope, vapour = liquid: no more enrichment
        x = b.y;
      }
      return out;
    }
    function nonMiscibles(a, b, p = P_ATM) {
      const [la, ha] = domaine(a), [lb, hb] = domaine(b);
      const T = dicho(T => psat(a, T) + psat(b, T) - p, Math.max(la, lb), Math.min(ha, hb));
      const ya = psat(a, T) / p;
      return { T, ya, rapportMasse: (1 - ya) * corps(b).M / (ya * corps(a).M) };
    }
    function roseeNM(a, b, ya, p = P_ATM) {
      if (!(ya >= 0 && ya <= 1)) err("ya dans [0, 1] attendu, reçu " + ya);
      const h = nonMiscibles(a, b, p);
      if (Math.abs(ya - h.ya) < 1e-12) return { T: h.T, liquide: "a+b" };
      const id = ya > h.ya ? a : b, yi = ya > h.ya ? ya : 1 - ya, [lo, hi] = domaine(id);
      return { T: dicho(T => psat(id, T) - yi * p, Math.max(lo, h.T - 1e-9), hi), liquide: ya > h.ya ? "a" : "b" };
    }
    const massique = (x, Ma, Mb) => x * Ma / (x * Ma + (1 - x) * Mb);
    const molaire = (w, Ma, Mb) => (w / Ma) / (w / Ma + (1 - w) / Mb);
    function moments(x0, x1, x2) {
      if (x1 === x2) err("conode de longueur nulle");
      const f2 = (x0 - x1) / (x2 - x1);
      if (f2 < -1e-12 || f2 > 1 + 1e-12) err("x0 = " + x0 + " hors de la conode [" + x1 + ", " + x2 + "]");
      return { f1: 1 - f2, f2 };
    }
    function variance(c, phi, o = {}) {
      const v = c - (o.relations || 0) + 2 - phi - (o.pFixee ? 1 : 0);
      if (v < 0) err("variance négative : " + phi + " phases ne peuvent pas coexister");
      return v;
    }

    const fusion = id => { const c = corps(id); if (!c.Tf) err("pas de données de fusion pour " + id); return c; };
    const solubilite = (id, T) => { const c = fusion(id); return Math.exp(-c.dHfus / R * (1 / T - 1 / c.Tf)); };
    const liquidus = (id, x) => { if (!(x > 0 && x <= 1)) err("x dans ]0, 1] attendu, reçu " + x); const c = fusion(id); return 1 / (1 / c.Tf - R * Math.log(x) / c.dHfus); };
    function eutectique(a, b) {
      const x = dicho(x => liquidus(a, x) - liquidus(b, 1 - x), 1e-9, 1 - 1e-9);
      return { x, T: liquidus(a, x) };
    }
    function courbesSL(a, b, n = 100) {
      const E = eutectique(a, b), pts = (x0, x1, f) => Array.from({ length: n + 1 }, (_, i) => { const x = x0 + (x1 - x0) * i / n; return [x, f(x)]; });
      return { E, a: pts(1, E.x, x => liquidus(a, x)), b: pts(E.x, 0, x => x === 0 ? fusion(b).Tf : liquidus(b, 1 - x)) };
    }
    function etatSL(a, b, x0, T) {
      if (!(x0 >= 0 && x0 <= 1)) err("x0 dans [0, 1] attendu, reçu " + x0);
      if (x0 === 1 || x0 === 0) { const id = x0 === 1 ? a : b;          // pure body: solid below Tf, liquid from Tf
        return T < fusion(id).Tf ? { domaine: x0 === 1 ? "a" : "b", xL: null, fL: 0, solide: x0 === 1 ? "a" : "b" } : { domaine: "L", xL: x0, fL: 1, solide: null }; }
      const E = eutectique(a, b);
      if (T < E.T) return { domaine: "a+b", xL: null, fL: 0, solide: null };
      if (x0 >= E.x) { const xa = solubilite(a, T);                    // a-rich side: pure solid a, liquid saturated in a
        return xa < x0 ? { domaine: "L+a", xL: xa, fL: (1 - x0) / (1 - xa), solide: "a" } : { domaine: "L", xL: x0, fL: 1, solide: null }; }
      const xb = solubilite(b, T);
      return xb < 1 - x0 ? { domaine: "L+b", xL: 1 - xb, fL: x0 / (1 - xb), solide: "b" } : { domaine: "L", xL: x0, fL: 1, solide: null };
    }
    /* temperature of the plateau and its latent heat per mole of mixture when everything freezes */
    const palierSL = (a, b, x0) => x0 === 1 ? fusion(a).Tf : x0 === 0 ? fusion(b).Tf : eutectique(a, b).T;
    const dHtotal = (a, b, x0) => x0 * fusion(a).dHfus + (1 - x0) * fusion(b).dHfus;
    function enthalpieSL(a, b, x0, T, cp = 30) {
      const Tp = palierSL(a, b, x0), Hsolide = cp * Tp - dHtotal(a, b, x0);
      if (T < Tp) return { H: cp * T - dHtotal(a, b, x0), Hsolide };
      const e = etatSL(a, b, x0, T), ns = 1 - e.fL;                   // amount of the pure solid formed, per mole
      return { H: cp * T - (e.solide === "a" ? fusion(a).dHfus : e.solide === "b" ? fusion(b).dHfus : 0) * ns, Hsolide };
    }
    const liquidusDe = (a, b, x0) => x0 === 1 ? fusion(a).Tf : x0 === 0 ? fusion(b).Tf : x0 >= eutectique(a, b).x ? liquidus(a, x0) : liquidus(b, 1 - x0);
    function refroidissement(a, b, x0, o = {}) {
      const cp = o.cp || 30, P = o.P || 0.5, n = o.n || 400, Tp = palierSL(a, b, x0), TL = liquidusDe(a, b, x0);
      const T0 = o.T0 === undefined ? TL + 60 : o.T0, T1 = o.T1 === undefined ? Tp - 60 : o.T1;
      if (!(T0 > TL && T1 < Tp)) err("refroidissement : T0 > " + TL + " K et T1 < " + Tp + " K attendus");
      const H = T => enthalpieSL(a, b, x0, T, cp).H, H0 = H(T0), Hp = H(Tp), Hs = cp * Tp - dHtotal(a, b, x0);
      const fLp = etatSL(a, b, x0, Tp).fL;
      const etat = h => {                                               // T and liquid fraction for an enthalpy h
        if (h <= Hs) return [(h + dHtotal(a, b, x0)) / cp, 0];
        if (h < Hp) return [Tp, fLp * (h - Hs) / (Hp - Hs)];
        const T = dicho(T => H(T) - h, Tp, T0 + 1, 60); return [T, etatSL(a, b, x0, T).fL];
      };
      const tfin = (H0 - H(T1)) / P, t = [], TT = [], fL = [];
      for (let i = 0; i <= n; i++) { const ti = tfin * i / n, [Ti, f] = etat(H0 - P * ti); t.push(ti); TT.push(Ti); fL.push(f); }
      return { t, T: TT, fL, TL, TE: Tp, debut: (H0 - H(TL)) / P, palier: [(H0 - Hp) / P, (H0 - Hs) / P], fin: (H0 - Hs) / P };
    }
    return Object.freeze({ P_ATM, CORPS, psat, Teb, SYSTEMES, bulle, courbes, azeotrope, conode, etages, nonMiscibles, roseeNM,
      massique, molaire, moments, variance, solubilite, liquidus, eutectique, courbesSL, etatSL, enthalpieSL, refroidissement });
  })();

  /* ============ Ellingham (step « Élaboration des métaux », X.ellingham.1 to 4) ============
     Exported as ChimSolutions.Ellingham. Data from the corps tables below; reproduce JANAF_DRG with the tables cited.
     Standard state p° = P0; condensed phases pure (activity 1), gases perfect. Energies in J·mol⁻¹, T in K, reactions { corps: ν }.
     CORPS                       { id: { f (display), a (composition), etat at 298,15 K: "s"|"l"|"g", H = ΔfH°, S = S° at 298,15 K,
                                 tr: [[T, ΔtrH (J·mol⁻¹), "allo"|"fus"|"vap"]], Tmax (end of the table, K) } }.
                                 NIST-JANAF tables, 4th ed. (Chase 1998), janaf.nist.gov; ZnO: CODATA Key Values (Cox, Wagman,
                                 Medvedev 1989), 298,15 K only. FeO is wüstite Fe₀,₉₄₇O (JANAF), solid up to 1 650 K, the fusion of the FeO table;
                                 the crystal tables of Fe3O4 and Fe2O3 are used up to 1 800 K. Tmax is the last T used, not a property.
                                 A vaporisation is the liquid → gas at 1 bar of the reference table (Zn 1 180 K, Mg 1 366 K).
     equilibrer(red, ox, X2)     a red + X2 = b ox, X2 = "O2" (default) or "Cl2": { [red]: −a, [X2]: −1, [ox]: b }, one mole of X2.
     ELLINGHAM                   { id: { nu, red?, ox?, gaz? } }: the couples (per mole of O2 or Cl2) and the reactions of the step.
     etatCorps(id, T)            "s", "l" or "g" at T (the transitions of tr crossed).
     ellingham(nu, T)            approximation of Ellingham: each corps keeps H and S of 298,15 K, plus ΔtrH and ΔtrH/Ttr for each
                                 transition below T: { H, S, G = H − T S } of the reaction. Piecewise linear in T, continuous.
                                 Throws below 298,15 K or beyond the Tmax of a corps.
     JANAF_DRG                   { id: [ΔrG° (kJ·mol⁻¹) at 300, 400, … 2 400 K] }, from the ΔfG° of the same tables, null when a corps
                                 is out of its table. No ZnO: not in JANAF.
     drGE(id, T, modele)         ΔrG° (J·mol⁻¹) of ELLINGHAM[id]: "ellingham" (default) or "janaf" (linear in T between table rows,
                                 null outside 300–2 400 K, beyond tmaxE or without data).
     tmaxE(id)                   last T of the approximation for id: the smallest Tmax of its corps.
     pointsE(id, T1, T2)         [[T, ΔrG°]] at T1, the transitions between, T2: the exact polyline of the approximation.
     croisements(idA, idB, T1, T2, modele)  temperatures where ΔrG°A = ΔrG°B, ascending (scan by 5 K, then bisection).
     pX2(id, T, modele)          equilibrium pressure (Pa) of O2 (or Cl2) over the couple: p° exp(ΔrG°/RT).
     rapportGaz(idOx, idGaz, T, modele)  equilibrium p(oxidised gas)/p(reduced gas) for the reduction of the oxide of idOx by the
                                 gas of idGaz ("co2": CO/CO2, "h2o": H2/H2O): exp[−(ΔrG°gaz − ΔrG°ox)/(c RT)], c = ν of the oxidised gas.
     boudouard(T, p, modele)     x(CO) in a CO–CO2 mixture at equilibrium with graphite, C + CO2 = 2 CO, total pressure p (Pa, default P0).
     combinaison(c, T, modele)   Σ c[id] ΔrG°(id) (J·mol⁻¹) for c = { id of ELLINGHAM: coefficient }: Hess, O2 and Cl2 cancelled by the
                                 caller's choice of coefficients; null when one term is (janaf out of range).
     TW(modele)                  temperature of the triple point Fe–FeO–Fe3O4 (wüstite stable above): crossing of feo and fe3o4.
     ferStable(T, xCO, modele)   the iron phase stable under a CO–CO2 gas of CO fraction xCO: "Fe", "FeO", "Fe3O4" or "Fe2O3"
                                 (Chaudron's diagram; FeO only above TW, T ≤ 1 650 K). */
  const ELLINGHAM_API = (() => {
    const ELL_CORPS = {
      O2: { f: "O2", a: { O: 2 }, etat: "g", H: 0, S: 205.147, tr: [], Tmax: 6000 },
      C: { f: "C", a: { C: 1 }, etat: "s", H: 0, S: 5.74, tr: [], Tmax: 6000 },
      CO: { f: "CO", a: { C: 1, O: 1 }, etat: "g", H: -110527, S: 197.653, tr: [], Tmax: 6000 },
      CO2: { f: "CO2", a: { C: 1, O: 2 }, etat: "g", H: -393522, S: 213.795, tr: [], Tmax: 6000 },
      H2: { f: "H2", a: { H: 2 }, etat: "g", H: 0, S: 130.68, tr: [], Tmax: 6000 },
      H2O: { f: "H2O", a: { H: 2, O: 1 }, etat: "g", H: -241826, S: 188.834, tr: [], Tmax: 6000 },
      Cl2: { f: "Cl2", a: { Cl: 2 }, etat: "g", H: 0, S: 223.079, tr: [], Tmax: 6000 },
      Fe: { f: "Fe", a: { Fe: 1 }, etat: "s", H: 0, S: 27.321, tr: [[1184, 900, "allo"], [1665, 837, "allo"], [1809, 13807, "fus"], [3133.34, 349585, "vap"]], Tmax: 6000 },
      FeO: { f: "FeO", a: { Fe: 0.947, O: 1 }, etat: "s", H: -266270, S: 57.588, tr: [], Tmax: 1650 },
      Fe3O4: { f: "Fe3O4", a: { Fe: 3, O: 4 }, etat: "s", H: -1120894, S: 145.266, tr: [], Tmax: 1800 },
      Fe2O3: { f: "Fe2O3", a: { Fe: 2, O: 3 }, etat: "s", H: -825503, S: 87.4, tr: [[950, 669, "allo"]], Tmax: 1800 },
      Zn: { f: "Zn", a: { Zn: 1 }, etat: "s", H: 0, S: 41.717, tr: [[692.73, 7322, "fus"], [1180.17, 115311, "vap"]], Tmax: 6000 },
      ZnO: { f: "ZnO", a: { Zn: 1, O: 1 }, etat: "s", H: -350460, S: 43.65, tr: [], Tmax: 2000 },
      Si: { f: "Si", a: { Si: 1 }, etat: "s", H: 0, S: 18.82, tr: [[1685, 50208, "fus"], [3504.62, 384548, "vap"]], Tmax: 6000 },
      SiO2: { f: "SiO2", a: { Si: 1, O: 2 }, etat: "s", H: -910857, S: 41.463, tr: [[847, 728, "allo"], [1696, 7677, "fus"]], Tmax: 4500 },
      SiC: { f: "SiC", a: { Si: 1, C: 1 }, etat: "s", H: -73220, S: 16.61, tr: [], Tmax: 4000 },
      Ti: { f: "Ti", a: { Ti: 1 }, etat: "s", H: 0, S: 30.759, tr: [[1166, 4172, "allo"], [1939, 14146, "fus"], [3630.96, 409984, "vap"]], Tmax: 6000 },
      TiO2: { f: "TiO2", a: { Ti: 1, O: 2 }, etat: "s", H: -944747, S: 50.292, tr: [[2130, 66944, "fus"]], Tmax: 4000 },
      TiC: { f: "TiC", a: { Ti: 1, C: 1 }, etat: "s", H: -184096, S: 24.229, tr: [[3290, 71128, "fus"]], Tmax: 4500 },
      TiCl4: { f: "TiCl4", a: { Ti: 1, Cl: 4 }, etat: "g", H: -763162, S: 354.889, tr: [], Tmax: 6000 },
      Mg: { f: "Mg", a: { Mg: 1 }, etat: "s", H: 0, S: 32.671, tr: [[923, 8477, "fus"], [1366.1, 127867, "vap"]], Tmax: 6000 },
      MgO: { f: "MgO", a: { Mg: 1, O: 1 }, etat: "s", H: -601241, S: 26.924, tr: [[3105, 77823, "fus"]], Tmax: 5000 },
      MgCl2: { f: "MgCl2", a: { Mg: 1, Cl: 2 }, etat: "s", H: -641616, S: 89.629, tr: [[987, 43095, "fus"]], Tmax: 2500 },
      Al: { f: "Al", a: { Al: 1 }, etat: "s", H: 0, S: 28.275, tr: [[933.45, 10711, "fus"], [2790.81, 294002, "vap"]], Tmax: 6000 },
      Al2O3: { f: "Al2O3", a: { Al: 2, O: 3 }, etat: "s", H: -1675692, S: 50.95, tr: [[2327, 111086, "fus"]], Tmax: 4000 },
      Cu: { f: "Cu", a: { Cu: 1 }, etat: "s", H: 0, S: 33.164, tr: [[1358, 13138, "fus"], [2843.26, 300677, "vap"]], Tmax: 6000 },
      Cu2O: { f: "Cu2O", a: { Cu: 2, O: 1 }, etat: "s", H: -170707, S: 92.36, tr: [[1516.7, 64768, "fus"]], Tmax: 2000 },
      Ca: { f: "Ca", a: { Ca: 1 }, etat: "s", H: 0, S: 41.588, tr: [[716, 930, "allo"], [1115, 8540, "fus"], [1773.66, 149047, "vap"]], Tmax: 6000 },
      CaO: { f: "CaO", a: { Ca: 1, O: 1 }, etat: "s", H: -635089, S: 38.212, tr: [[3200, 79496, "fus"]], Tmax: 4500 },
    };
    for (const id in ELL_CORPS) { const c = ELL_CORPS[id]; c.tr.forEach(Object.freeze); Object.freeze(c.tr); Object.freeze(c.a); Object.freeze(c); }
    const CORPS = Object.freeze(ELL_CORPS);
    const corps = id => { const c = CORPS[id]; if (!c) throw new Error("Ellingham : corps inconnu « " + id + " »"); return c; };
    function equilibrer(red, ox, X2 = "O2") {
      const X = X2 === "Cl2" ? "Cl" : "O", ar = corps(red).a, ao = corps(ox).a;
      const M = Object.keys(ao).find(e => e !== X);
      if (!M || !ar[M] || Object.keys(ar).some(e => e !== M && e !== X) || Object.keys(ao).some(e => e !== M && e !== X))
        throw new Error("Ellingham : " + red + " et " + ox + " ne forment pas un couple de " + X2);
      const b = 2 / (ao[X] - (ar[X] || 0) * ao[M] / ar[M]), a = b * ao[M] / ar[M];
      if (!(b > 0)) throw new Error("Ellingham : " + ox + " n'est pas plus oxydé que " + red);
      return { [red]: -a, [X2]: -1, [ox]: b };
    }
    const couple = (red, ox, gaz = "O2") => Object.freeze({ red, ox, gaz, nu: Object.freeze(equilibrer(red, ox, gaz)) });
    const ELLINGHAM = Object.freeze({
      cu2o: couple("Cu", "Cu2O"), h2o: couple("H2", "H2O"), co2: couple("CO", "CO2"), fe2o3: couple("Fe3O4", "Fe2O3"),
      fe3o4: couple("FeO", "Fe3O4"), feo: couple("Fe", "FeO"), fefe3o4: couple("Fe", "Fe3O4"), zno: couple("Zn", "ZnO"),
      cco2: couple("C", "CO2"), cco: couple("C", "CO"), sio2: couple("Si", "SiO2"), tio2: couple("Ti", "TiO2"),
      al2o3: couple("Al", "Al2O3"), mgo: couple("Mg", "MgO"), cao: couple("Ca", "CaO"),
      ticl4: couple("Ti", "TiCl4", "Cl2"), mgcl2: couple("Mg", "MgCl2", "Cl2"),
      tic: Object.freeze({ nu: Object.freeze({ TiO2: -1, C: -3, TiC: 1, CO: 2 }) }),
      sic: Object.freeze({ nu: Object.freeze({ SiO2: -1, C: -3, SiC: 1, CO: 2 }) }),
    });
    const reactionE = id => { const r = ELLINGHAM[id]; if (!r) throw new Error("Ellingham : réaction inconnue « " + id + " »"); return r; };
    function etatCorps(id, T) {
      const c = corps(id); let e = c.etat;
      for (const [Tt, , k] of c.tr) if (T > Tt) e = k === "fus" ? "l" : k === "vap" ? "g" : e;
      return e;
    }
    function ellingham(nu, T) {
      let H = 0, S = 0;
      for (const id in nu) {
        const c = corps(id);
        if (!(T >= T0 - 1e-9 && T <= c.Tmax + 1e-9)) throw new Error("Ellingham : " + id + " hors de sa table à " + T + " K");
        let h = c.H, s = c.S;
        for (const [Tt, dh] of c.tr) if (T > Tt) { h += dh; s += dh / Tt; }
        H += nu[id] * h; S += nu[id] * s;
      }
      return { H, S, G: H - T * S };
    }
    const JANAF_DRG = Object.freeze({
      cu2o: [-295.5, -280.2, -265, -249.9, -235, -220.2, -205.5, -191, -176.7, -162.4, -148.3, -132.6, -114.9, -104.4, -95.5, -86.9, -78.4, -70, null, null, null, null],
      h2o: [-457, -447.8, -438.1, -428, -417.6, -407, -396.2, -385.2, -374.1, -362.9, -351.5, -340.2, -328.8, -317.3, -305.8, -294.2, -282.6, -271.1, -259.4, -247.8, -236.2, -224.5],
      co2: [-514.1, -496.7, -479.1, -461.4, -443.8, -426.2, -408.7, -391.2, -373.9, -356.6, -339.3, -322.2, -305.1, -288.1, -271.1, -254.2, -237.4, -220.6, -203.9, -187.2, -170.5, -154],
      fe2o3: [-390.9, -364.8, -338.8, -312.7, -285.9, -258.2, -229.3, -200.8, -173.2, -145.7, -118.3, -91, -63.8, -36.8, -10, 16.7, 43.1, 69.4, 95.5, 121.4, 147.1, 172.5],
      fe3o4: [-578.4, -548.4, -518.4, -489.1, -461.1, -434.7, -410.2, -386.8, -363.6, -340.5, -317.4, -294.2, -271, -247.6, -224, -200.3, -176.4, -152.2, -127.8, -103.3, -78.5, -53.5],
      feo: [-490, -476.2, -462.8, -449.7, -436.8, -424.1, -411.5, -398.8, -385.9, -372.8, -359.7, -346.7, -333.9, -321.1, -308.4, -295.8, -281.8, -267.8, -253.7, -239.7, -225.7, -211.7],
      fefe3o4: [-508.4, -491.2, -474.3, -457.9, -441.9, -426.3, -411.2, -396.3, -381.2, -366.1, -350.9, -335.8, -320.8, -305.8, -290.9, -275.9, -259.9, -243.7, -227.5, -211.3, -195.1, -178.8],
      cco2: [-394.4, -394.7, -394.9, -395.2, -395.4, -395.6, -395.7, -395.9, -396, -396.1, -396.2, -396.2, -396.3, -396.3, -396.3, -396.4, -396.3, -396.3, -396.3, -396.3, -396.2, -396.1],
      cco: [-274.7, -292.7, -310.8, -329, -347, -365, -382.8, -400.6, -418.1, -435.6, -453, -470.3, -487.5, -504.6, -521.6, -538.5, -555.3, -572.1, -588.7, -605.3, -621.9, -638.3],
      sio2: [-856.1, -837.8, -819.5, -801.4, -783.3, -765.5, -747.8, -730.3, -712.8, -695.4, -678.1, -660.9, -643.7, -626.6, -609.1, -589.6, -570.2, -550.9, -531.7, -512.7, -493.7, -474.8],
      tio2: [null, null, -852.2, -833.9, -815.9, -797.9, -780.1, -762.4, -744.8, -727.1, -709.3, -691.5, -673.8, -656.2, -638.6, -621, -603.5, -585.5, -567.3, -551.2, -536.1, -521.1],
      al2o3: [-1054.5, -1033.5, -1012.5, -991.5, -970.7, -950, -929.3, -907.6, -885.5, -863.5, -841.5, -819.6, -797.7, -776, -754.2, -732.6, -711, -689.4, -667.9, -646.5, -625.1, -606.1],
      mgo: [-1137.5, -1115.8, -1094.2, -1072.6, -1051.2, -1029.9, -1008.6, -985.9, -962.8, -939.7, -916.6, -887.1, -845.5, -804.1, -762.8, -721.7, -680.8, -640, -599.5, -559, -518.7, -478.6],
      cao: [-1206.6, -1185.5, -1164.6, -1144, -1123.4, -1102.7, -1082, -1061.4, -1040.6, -1018.5, -996.2, -973.9, -951.6, -929.4, -907.3, -880.8, -842, -803.4, -765, -726.8, -688.8, -651],
      ticl4: [-363.3, -357.2, -351.2, -345.1, -339.2, -333.2, -327.2, -321.3, -315.3, -309.3, -303.2, -297, -290.9, -284.8, -278.6, -272.5, -266.3, -259.9, -253.4, -246.7, -240.1, -233.4],
      mgcl2: [-591.8, -575.4, -559.3, -543.6, -528.1, -512.8, -497.7, -482.6, -471.3, -460.2, -449.2, -435.3, -415.3, -395.6, -376.1, -356.8, -337.6, -318.7, -299.9, -281.2, -262.7, -244.4],
      tic: [null, null, 363.3, 328.1, 293, 258.2, 223.6, 189.2, 155.1, 121.2, 87.4, 53.9, 20.5, -12.7, -45.8, -78.7, -111.5, -144.2, -176.8, -207, -236.1, -265.1],
      sic: [510.6, 475.1, 439.5, 404, 368.7, 333.6, 298.9, 264.4, 230.1, 196, 162, 128.2, 94.6, 61.2, 27.9, -4.8, -37.3, -69.6, -101.7, -133.7, -165.5, -197.2],
    });
    function drGE(id, T, modele = "ellingham") {
      if (modele === "ellingham") return ellingham(reactionE(id).nu, T).G;
      if (modele !== "janaf") throw new Error("Ellingham : modèle « ellingham » ou « janaf »");
      const v = JANAF_DRG[id], u = (T - 300) / 100, i = Math.floor(u);
      if (!v || !(u >= 0 && u <= v.length - 1) || T > tmaxE(id) + 1e-9) return null;
      const a = v[i], b = i + 1 < v.length ? v[i + 1] : a;
      if (a === null || b === null) return null;
      return 1000 * (a + (b - a) * (u - i));
    }
    const tmaxE = id => Math.min(...Object.keys(reactionE(id).nu).map(s => corps(s).Tmax));
    function pointsE(id, T1, T2) {
      const nu = reactionE(id).nu, Ts = new Set([T1, T2]);
      for (const s in nu) for (const [Tt] of corps(s).tr) if (Tt > T1 && Tt < T2) Ts.add(Tt);
      return [...Ts].sort((a, b) => a - b).map(T => [T, ellingham(nu, T).G]);
    }
    function croisements(idA, idB, T1, T2, modele) {
      const d = T => { const a = drGE(idA, T, modele), b = drGE(idB, T, modele); return a === null || b === null ? null : a - b; };
      const out = [];
      for (let T = T1; T < T2; T = Math.min(T + 5, T2)) {
        const U = Math.min(T + 5, T2), da = d(T), db = d(U);
        if (da === null || db === null || (da === 0 && db === 0)) continue;             // a coincident piece is not a crossing
        if (da === 0) { if (!out.length || out[out.length - 1] < T - 5) out.push(T); continue; }
        if (da * db < 0) {
          let lo = T, hi = U;
          for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (d(m) * da > 0) lo = m; else hi = m; }
          out.push((lo + hi) / 2);
        }
      }
      if (d(T2) === 0 && d(Math.max(T1, T2 - 5)) !== 0) out.push(T2);
      return out;
    }
    const pX2 = (id, T, modele) => P0 * Math.exp(drGE(id, T, modele) / (Cst.R * T));
    function rapportGaz(idOx, idGaz, T, modele) {
      const g = reactionE(idGaz), c = g.nu[g.ox];
      return Math.exp(-(drGE(idGaz, T, modele) - drGE(idOx, T, modele)) / (c * Cst.R * T));
    }
    function boudouard(T, p = P0, modele) {
      const K = Math.exp(-(drGE("cco", T, modele) - drGE("co2", T, modele)) / 2 / (Cst.R * T)), P = p / P0;
      return (-K + Math.sqrt(K * K + 4 * P * K)) / (2 * P);           // x²P/(1 − x) = K, the root in ]0, 1[
    }
    function combinaison(c, T, modele) {
      let s = 0;
      for (const id in c) { const g = drGE(id, T, modele); if (g === null) return null; s += c[id] * g; }
      return s;
    }
    const TW = modele => croisements("feo", "fe3o4", 600, 1650, modele)[0];
    function ferStable(T, xCO, modele) {
      if (!(xCO >= 0 && xCO <= 1)) throw new Error("Ellingham : x(CO) entre 0 et 1");
      const r = (1 - xCO) / xCO, reduit = id => r < rapportGaz(id, "co2", T, modele);     // the gas reduces the oxide of id
      if (T > TW(modele)) return reduit("feo") ? "Fe" : reduit("fe3o4") ? "FeO" : reduit("fe2o3") ? "Fe3O4" : "Fe2O3";
      return reduit("fefe3o4") ? "Fe" : reduit("fe2o3") ? "Fe3O4" : "Fe2O3";
    }
    return Object.freeze({ CORPS, equilibrer, ELLINGHAM, etatCorps, ellingham, JANAF_DRG, drGE, tmaxE, pointsE, croisements, pX2, rapportGaz, boudouard, combinaison, TW, ferStable });
  })();

  /* ============ Chimie industrielle minérale (step « Chimie industrielle minérale », X.chimie_industrielle.1 to 4) ============
     Ammonia, nitric acid, chlorine and caustic soda. Units of the sections above: SI, J·mol⁻¹, K, Pa, p° = P0, c° = 1 mol·L⁻¹.
     MASSES, masse(s)            IUPAC conventional atomic weights (g·mol⁻¹); masse(s) in kg·mol⁻¹, s written as for formule().
     fraction(s, X)              mass fraction of element X in s: 0,350 for N in NH4NO3.
     Ammoniac. Feed N₂ + 3 H₂, no inert; X = converted fraction of N₂ (the « rendement » of melangeGaz for this feed).
     quotientHaber(X, p)         Q = 16 X² (2 − X)² / [27 (1 − X)⁴] × (p°/p)², perfect gases.
     xEquilibre(T, p, modele)    root of Q = K°, K° = exp lnK(REACTIONS.ammoniac, T, modele), modele "cpT" by default.
     vitesseHaber(X, T, p, o)    dX/dθ = Da exp[−(Ea/R)(1/T − 1/Tref)] (p/pRef) x(N₂) (1 − Q/K°): forward rate of first order in N₂,
                                 times the de Donder factor 1 − Q/K°. A model for drawing, not a measured rate law:
                                 o = { Da = 1, Ea = 1e5 J·mol⁻¹, Tref = 700 K, pRef = 2e7 Pa, K (K° if already known) }.
     passage(T, p, o)            one pass through the reactor, θ from 0 to 1: { X, Xeq }. With X = Xeq (1 − e⁻ᵘ),
                                 θ(u) = ∫ (Xeq − X)/(dX/dθ) du has a bounded integrand: Simpson in u, no stiffness near equilibrium.
     optimum(p, o, [T1, T2])     the temperature that maximises X after one pass: { T, X, Xeq } (grid, then golden section).
     Acide nitrique.
     OSTWALD                     no: 4 NH3 + 5 O2 = 4 NO + 6 H2O(g) ; n2: 4 NH3 + 3 O2 = 2 N2 + 6 H2O(g) ; no2: 2 NO + O2 = 2 NO2.
     rapportNO2(T, pO2, modele)  p(NO₂)/p(NO) at the equilibrium no2 under pO2 (Pa): √(K° pO2/p°); modele "ellingham" (no Cp° for NO2).
     nitrate(rOx, rAbs)          from 1 kg of NH3, yields rOx (NH3 → NO) and rAbs (NO → HNO3): { hno3 (kg of HNO3),
                                 part (fraction of the NH3 sent to the acid when the rest neutralises it), nitrate (kg of NH4NO3) }.
     Chlore et soude. U = U0 + K j, the linear law of the European reference document on chlor-alkali (BREF 2014, after Euro Chlor 2011):
     CELLULES                    { membrane, diaphragme, mercure }: { U0 (V), K (V·m²·A⁻¹, middle of the range given), j: [min, max] (A·m⁻²) }.
     tensionCellule(tech, j)     U0 + K j (V).
     energieChlore(U, rendement) electricity per kg of Cl₂ (J·kg⁻¹), rendement = faradaic yield: 2FU/(rendement M(Cl₂)).
     uRev(pH)                    E°(Cl₂/Cl⁻) − E(H₂O/H₂ at pH), other activities 1: 2,19 V at pH 14.
     coproduits()                { soude, dihydrogene }: kg of NaOH and of H2 per kg of Cl₂, exact by stoichiometry.
     Chlore en solution. Cl₂ is the gas at p° (the diagram is traced for p(Cl₂) = p°); Cl⁻, HClO, ClO⁻ are dissolved.
     CHLORE                      { E0: E°(Cl₂/Cl⁻) of COUPLES, E0HClO: E°(HClO/Cl₂) = 1,63 V, pKa: 7,53 (HClO/ClO⁻) }.
     lgKDismutation              lg K° of Cl₂(g) + H₂O = HClO + H⁺ + Cl⁻: (E0 − E0HClO)/pente, −4,56.
     SYSTEME_CHLORE              the system of diagrammeEpH, per chlorine atom: ½ Cl₂ (gas, activity 1), Cl⁻, HClO, ClO⁻.
     diagrammeChlore(c, o)       diagrammeEpH(SYSTEME_CHLORE, { c, pH, E }).
     pHDismutation(c)            end of the Cl₂ domain at tracing concentration c: (E0HClO − E0)/pente + 2 lg c.
     pDichlore(pH, cOx, cCl)     p(Cl₂) (Pa) in equilibrium with active chlorine cOx = [HClO] + [ClO⁻] and chloride cCl (mol·L⁻¹). */
  const INDUSTRIE = (() => {
    const MASSES = Object.freeze({ H: 1.008, C: 12.011, N: 14.007, O: 15.999, Na: 22.990, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078 });
    const masse = s => { const a = formule(s).atomes; let m = 0;
      for (const X in a) { if (!(X in MASSES)) throw new Error("industrie : pas de masse atomique pour " + X); m += a[X] * MASSES[X]; }
      return m / 1000; };
    const fraction = (s, X) => (formule(s).atomes[X] || 0) * MASSES[X] / 1000 / masse(s);

    /* ---------- ammoniac ---------- */
    function quotientHaber(X, p) {
      if (!(X >= 0 && X < 1)) throw new Error("ammoniac : X dans [0, 1[");
      return 16 * X * X * (2 - X) ** 2 / (27 * (1 - X) ** 4) * (P0 / p) ** 2;
    }
    const K_ = (T, modele = "cpT") => Math.exp(lnK(REACTIONS.ammoniac, T, modele));
    function xEquilibre(T, p, modele) {
      const K = K_(T, modele);
      let lo = 0, hi = 1;
      for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (m === lo || m === hi) break; if (quotientHaber(m, p) < K) lo = m; else hi = m; }
      return (lo + hi) / 2;
    }
    const DEF = Object.freeze({ Da: 1, Ea: 1e5, Tref: 700, pRef: 2e7 });
    function vitesseHaber(X, T, p, o = {}) {
      const q = Object.assign({}, DEF, o), K = q.K === undefined ? K_(T) : q.K;
      return q.Da * Math.exp(-q.Ea / Cst.R * (1 / T - 1 / q.Tref)) * (p / q.pRef) * (1 - X) / (4 - 2 * X) * (1 - quotientHaber(X, p) / K);
    }
    function passage(T, p, o = {}) {
      const K = K_(T), Xeq = xEquilibre(T, p), q = Object.assign({}, o, { K });
      const g = u => { const X = Xeq * (1 - Math.exp(-u)); return (Xeq - X) / vitesseHaber(X, T, p, q); };
      const du = 0.02, UMAX = 60;
      let u = 0, th = 0, gu = g(0);
      while (u < UMAX) {
        const g1 = g(u + du), dth = du / 6 * (gu + 4 * g(u + du / 2) + g1);
        if (th + dth >= 1) {                                   // θ = 1 inside this step: bisection on the partial Simpson sum
          let lo = 0, hi = du;
          for (let k = 0; k < 50; k++) { const h = (lo + hi) / 2, t = th + h / 6 * (gu + 4 * g(u + h / 2) + g(u + h)); if (t < 1) lo = h; else hi = h; }
          return { X: Xeq * (1 - Math.exp(-(u + (lo + hi) / 2))), Xeq };
        }
        th += dth; u += du; gu = g1;
      }
      return { X: Xeq, Xeq };
    }
    function optimum(p, o = {}, [T1, T2] = [500, 1000]) {
      const f = T => passage(T, p, o).X, N = 50, h = (T2 - T1) / N, r = (Math.sqrt(5) - 1) / 2;
      let best = T1, fb = f(T1);
      for (let k = 1; k <= N; k++) { const T = T1 + h * k, v = f(T); if (v > fb) { best = T; fb = v; } }
      let a = Math.max(T1, best - h), b = Math.min(T2, best + h);
      for (let k = 0; k < 40; k++) { const c = b - r * (b - a), d = a + r * (b - a); if (f(c) > f(d)) b = d; else a = c; }
      const T = (a + b) / 2, s = passage(T, p, o);
      return { T, X: s.X, Xeq: s.Xeq };
    }

    /* ---------- acide nitrique ---------- */
    const OSTWALD = Object.freeze({
      no: Object.freeze({ NH3: -4, O2: -5, NO: 4, "H2O(g)": 6 }),
      n2: Object.freeze({ NH3: -4, O2: -3, N2: 2, "H2O(g)": 6 }),
      no2: Object.freeze({ NO: -2, O2: -1, NO2: 2 }),
    });
    const rapportNO2 = (T, pO2, modele = "ellingham") => Math.sqrt(Math.exp(lnK(OSTWALD.no2, T, modele)) * pO2 / P0);
    function nitrate(rOx = 1, rAbs = 1) {
      if (!(rOx > 0 && rOx <= 1 && rAbs > 0 && rAbs <= 1)) throw new Error("nitrate : rendements dans ]0, 1]");
      const r = rOx * rAbs, nNH3 = 1 / masse("NH3"), part = 1 / (1 + r);
      return { hno3: r * nNH3 * masse("HNO3"), part, nitrate: (1 - part) * nNH3 * masse("NH4NO3") };
    }

    /* ---------- chlore et soude ---------- */
    const CELLULES = Object.freeze({
      membrane: Object.freeze({ U0: 2.35, K: 0.2e-3, j: Object.freeze([1000, 6500]) }),
      diaphragme: Object.freeze({ U0: 2.35, K: 0.45e-3, j: Object.freeze([800, 2700]) }),
      mercure: Object.freeze({ U0: 3.15, K: 0.14e-3, j: Object.freeze([2200, 14500]) }),
    });
    const cellule = tech => { const c = CELLULES[tech]; if (!c) throw new Error("électrolyse : technique inconnue « " + tech + " »"); return c; };
    const tensionCellule = (tech, j) => { const c = cellule(tech); return c.U0 + c.K * j; };
    const energieChlore = (U, rendement = 1) => 2 * F_ * U / (rendement * masse("Cl2"));
    const uRev = (pH = 14) => E0_("cl2") + pente(T0) * pH;
    const coproduits = () => ({ soude: 2 * masse("NaOH") / masse("Cl2"), dihydrogene: masse("H2") / masse("Cl2") });

    /* ---------- chlore en solution ---------- */
    const CHLORE = Object.freeze({ E0: E0_("cl2"), E0HClO: 1.63, pKa: 7.53 });
    const lgKDismutation = (CHLORE.E0 - CHLORE.E0HClO) / pente(T0);
    const SYSTEME_CHLORE = Object.freeze({ element: "Cl", pKe: PKE, especes: Object.freeze([
      Object.freeze({ s: "Cl2", phase: "gaz", a: 0, b: 0, z: 0, n: 0, alpha: 0, g0: 0 }),
      Object.freeze({ s: "Cl^-", phase: "aq", a: 0, b: 0, z: -1, n: -1, alpha: 0, g0: -CHLORE.E0 }),
      Object.freeze({ s: "HClO", phase: "aq", a: 1, b: 1, z: 0, n: 1, alpha: 1, g0: CHLORE.E0HClO }),
      Object.freeze({ s: "ClO^-", phase: "aq", a: 1, b: 0, z: -1, n: 1, alpha: 2, g0: CHLORE.E0HClO + pente(T0) * CHLORE.pKa }),
    ]) });
    const diagrammeChlore = (c, o = {}) => diagrammeEpH(SYSTEME_CHLORE, Object.assign({ pH: [0, 14], E: [0, 2] }, o, { c }));
    const pHDismutation = c => (CHLORE.E0HClO - CHLORE.E0) / pente(T0) + 2 * Math.log10(c / C0);
    function pDichlore(pH, cOx, cCl) {
      const hclo = cOx * fractions([CHLORE.pKa], pH)[0];
      return P0 * hclo * Math.pow(10, -pH) * cCl / Math.pow(10, lgKDismutation);
    }

    return Object.freeze({ MASSES, masse, fraction, quotientHaber, xEquilibre, vitesseHaber, passage, optimum,
      OSTWALD, rapportNO2, nitrate, CELLULES, tensionCellule, energieChlore, uRev, coproduits,
      CHLORE, lgKDismutation, SYSTEME_CHLORE, diagrammeChlore, pHDismutation, pDichlore });
  })();


  const api = Object.freeze({ F: F_, C0, P0, T0, gcd, lcm, formule, texte, nombreOxydation, demiEquation, bilan, cote, ecrire,
    COUPLES, phase, pente, quotient, nernst, potentiel, lgK, etatFinal, pile, ...THERMOCHIMIE, ...ENTHALPIE_LIBRE, ...COMPLEXES, ...PRECIPITATION, ...ACIDE_BASE, ...DIAGRAMMES, Binaires: BINAIRES, Ellingham: ELLINGHAM_API, Industrie: INDUSTRIE });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ChimSolutions = api;
})(typeof self !== "undefined" ? self : this);

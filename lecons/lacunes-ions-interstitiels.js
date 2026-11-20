/* CristalReel — the real crystal of the chemistry programme: point defects at thermal equilibrium, the non-stoichiometric
   oxide Fe₁₋ₓO, the ionic character of the halides NaCl, CsCl, AgCl. Pure, no DOM, UMD (global CristalReel). SI throughout
   (m, kg, mol, J, J·mol⁻¹, kg·m⁻³, K). Shared by the three lessons of the step « Le cristal réel » (chim-cristal-reel):
   « Lacunes et ions interstitiels », « Non-stœchiométrie de l'oxyde de fer », « Caractère ionique des halogénures ».
   Constants from public/constantes.js; Born–Landé and the Madelung sum of rock salt from Cristaux (public/lecons/cristaux.js);
   ρ = N M/(N_A a³) and the aluminium cell from CristalParfait (public/lecons/reseau-motif-maille.js).

   Point defects at equilibrium. A defect costs an enthalpy H and brings a vibrational entropy S; the configurational
   entropy of n defects among N sites is k_B ln C(N, n). Minimising G for n ≪ N gives the Boltzmann law:
     fraction(d, T)            defects per formula unit (per atom for a metal):
                               "lacune"   n/N = exp(S/k_B) exp(−H/(k_B T))
                               "schottky" n/N = exp(S/(2k_B)) exp(−H/(2k_B T))   (one cation and one anion vacancy)
                               "frenkel"  n/N = √(Ni/N) exp(S/(2k_B)) exp(−H/(2k_B T))   (Ni interstitial sites)
                               The 2 of Schottky and Frenkel: each pair brings two independent sets of positions.
     densite(d, T)             defects per m³ (fraction × formula units per m³).
     distance(d, T)            mean distance between defects, densite^(−1/3) (m).
     DEFAUTS                   { Al, NaCl, AgCl }: { type, H (J), S (J·K⁻¹), Tf (K, melting), entites (per m³), Ni (per formula
                               unit, Frenkel only), dPlusProche (m) }. Sources in the comment of DEFAUTS.
     entropieDepuisMesure(c, H, T)   S that reproduces a measured fraction c at T: k_B ln(c e^(H/k_B T)).

   Non-stoichiometry: wüstite Fe₁₋ₓO, rock salt with x of the Fe sites empty, O sublattice full; each vacancy is paid by two
   Fe²⁺ turned into Fe³⁺.
     wustite(x)                per formula Fe₁₋ₓO: { fe2: 1 − 3x, fe3: 2x, lacunes: x, partFe3: 2x/(1 − x) of the iron,
                               nombreOxydation: 2/(1 − x) mean }. 0 ≤ x ≤ 1/3 (x = 1/3: all Fe³⁺, the composition of Fe₂O₃).
     parametreWustite(x)       a = 4,334 − 0,478 x (Å), the empirical fit of McCammon and Liu (1984), in m.
     masseVolumiqueWustite(x, modele)   4 formula units per cell, a = parametreWustite(x):
                               "lacunes":       Fe₁₋ₓO, 4 [(1 − x) M_Fe + M_O]
                               "interstitiels": the same Fe/O ratio with the Fe sites full and extra O in interstices,
                                                FeO_{1/(1−x)}, 4 [M_Fe + M_O/(1 − x)].
     teneurFer(x), xDepuisTeneur(w)   mass fraction of iron w = (1 − x) M_Fe / ((1 − x) M_Fe + M_O), and the inverse.
     JETTE_FOOTE               iron mass fractions of the samples of Jette and Foote (1933): 76,08 % to 76,72 %.

   Ionic character of the halides MCl.
     HALOGENURES               { NaCl, CsCl, AgCl }: structure, a (m), alpha (Madelung, reference d), nBorn (Born exponent),
                               dfH (ΔfH° of the crystal, J·mol⁻¹), subM (ΔfH° of M(g)), EI (first ionisation energy of M, J),
                               rM, rCl (Shannon effective ionic radii, m), chi (Pauling electronegativity of M).
     CHLORE                    { dfH: ΔfH° of Cl(g), AE: electron affinity (J), chi }.
     distanceMX(h)             d = a/2 (rock salt), a √3/2 (CsCl).
     cycleBornHaber(h)         the steps M(s) + ½Cl₂(g) → M(g) → M⁺(g) and Cl(g) → Cl⁻(g), and back to MCl(s):
                               [{ id, dH (J·mol⁻¹) }…] and U = −ΔfH + subM + N_A EI + dfH(Cl) − N_A AE (J·mol⁻¹), the
                               enthalpy to pull the crystal apart into gaseous ions at 298 K.
     energieCoulomb(h)         N_A α e²/(4π ε0 d): the ionic model with point charges and no repulsion.
     modeleIonique(h, n)       Born–Landé, (1 − 1/n) energieCoulomb (Cristaux.energieReticulaire).
     ecart(h, n)               (U_BornHaber − U_modèle)/U_BornHaber.
     nNecessaire(h)            the Born exponent that would make the model equal the cycle: 1/(1 − U/U_C); Infinity when the
                               cycle exceeds the point-charge energy (no repulsion can close the gap).
     madelungCsCl(L)           Evjen-type sum for CsCl: mean of the two cubes of half-side L and L + 1 (units a/2), reference d.
                               → 1,762 675 (error ~ 1/L²).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const X = node ? require("./cristaux.js") : root.Cristaux;
  const P = node ? require("./reseau-motif-maille.js") : root.CristalParfait;
  const err = m => { throw new Error("cristal réel : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être positif"); };
  const eV = Cst.e, kB = Cst.k_B;

  /* ---------- point defects ---------- */
  function entropieDepuisMesure(c, H, T) { positif(c, "c"); positif(H, "H"); positif(T, "T"); return kB * Math.log(c * Math.exp(H / (kB * T))); }
  /* Sources. Al: Simmons and Balluffi, Phys. Rev. 117, 52 (1960), dilatometry against X-ray lattice parameter: excess sites
     3(ΔL/L − Δa/a) = 9,4 × 10⁻⁴ at the melting point, formation energy 0,76 eV; S is computed from the two. Tf = 933,473 K
     (ITS-90 fixed point). NaCl: Dreyfus and Nowick, J. Appl. Phys. 33, 473 (1962): Schottky pair H = 2,12 eV, S = 6,2 k_B;
     Tf = 1073,8 K (NIST-JANAF), a = 564,02 pm (NBS Circular 539, vol. II, 1953). AgCl: cation Frenkel pair, H ≈ 1,4 eV
     (extrapolation of thermal expansion, Fouchaux and Simmons, Phys. Rev. 136, A1664, 1964; compilations give 1,4 to
     1,6 eV); S not included (no reliable value): S = 0. Ag⁺ interstitials sit in the tetrahedral holes of the Cl⁻ fcc
     sublattice, 2 per formula unit. Tf = 728 K (CRC Handbook), a = 554,91 pm (NBS Circular 539, vol. IV, 1953). */
  const AL = P.METAUX_CFC.Al;
  const DEFAUTS = Object.freeze({
    Al: Object.freeze({ type: "lacune", H: 0.76 * eV, S: entropieDepuisMesure(9.4e-4, 0.76 * eV, 933.473), Tf: 933.473,
      entites: 4 / Math.pow(AL.a, 3), dPlusProche: AL.a / Math.SQRT2, mesure: Object.freeze({ c: 9.4e-4, T: 933.473 }) }),
    NaCl: Object.freeze({ type: "schottky", H: 2.12 * eV, S: 6.2 * kB, Tf: 1073.8, entites: 4 / Math.pow(564.02e-12, 3), dPlusProche: 564.02e-12 / 2 }),
    AgCl: Object.freeze({ type: "frenkel", H: 1.4 * eV, S: 0, Tf: 728, Ni: 2, entites: 4 / Math.pow(554.91e-12, 3), dPlusProche: 554.91e-12 / 2 }),
  });
  function verifierDefaut(d) {
    if (!d || !["lacune", "schottky", "frenkel"].includes(d.type)) err("type de défaut inconnu");
    positif(d.H, "H"); fini(d.S, "S");
    if (d.type === "frenkel") positif(d.Ni, "Ni");
  }
  function fraction(d, T) {
    verifierDefaut(d); positif(T, "T");
    if (d.type === "lacune") return Math.exp(d.S / kB - d.H / (kB * T));
    const f = Math.exp(d.S / (2 * kB) - d.H / (2 * kB * T));
    return d.type === "schottky" ? f : Math.sqrt(d.Ni) * f;
  }
  function densite(d, T) { positif(d.entites, "entites"); return fraction(d, T) * d.entites; }
  function distance(d, T) { return Math.pow(densite(d, T), -1 / 3); }

  /* ---------- wüstite Fe₁₋ₓO ---------- */
  const M_FE = 55.845e-3, M_O = 15.999e-3;              // kg·mol⁻¹, CIAAW standard atomic weights (O: conventional value)
  const JETTE_FOOTE = Object.freeze({ wMin: 0.7608, wMax: 0.7672 });
  function verifierX(x) { fini(x, "x"); if (x < 0 || x > 1 / 3) err("x doit être entre 0 et 1/3 : au-delà, il n'y a plus de Fe²⁺ à oxyder"); }
  function wustite(x) {
    verifierX(x);
    return { fe2: 1 - 3 * x, fe3: 2 * x, lacunes: x, partFe3: 2 * x / (1 - x), nombreOxydation: 2 / (1 - x) };
  }
  function parametreWustite(x) { verifierX(x); return (4.334 - 0.478 * x) * 1e-10; }
  function masseVolumiqueWustite(x, modele) {
    verifierX(x);
    const M = modele === "lacunes" ? (1 - x) * M_FE + M_O : modele === "interstitiels" ? M_FE + M_O / (1 - x) : err("modèle « lacunes » ou « interstitiels »");
    return P.masseVolumique(4, M, parametreWustite(x));
  }
  function teneurFer(x) { verifierX(x); return (1 - x) * M_FE / ((1 - x) * M_FE + M_O); }
  function xDepuisTeneur(w) { fini(w, "w"); if (!(w > 0 && w < 1)) err("w doit être entre 0 et 1"); return 1 - w * M_O / ((1 - w) * M_FE); }

  /* ---------- halides ---------- */
  /* Sources. ΔfH°(cr): NIST-JANAF 4th ed. (NaCl −411,12 kJ·mol⁻¹, CsCl −442,83 kJ·mol⁻¹); CODATA Key Values (AgCl
     −127,01 kJ·mol⁻¹; Na(g) 107,5, Cs(g) 76,5, Ag(g) 284,9, Cl(g) 121,301 kJ·mol⁻¹). Ionisation energies: NIST Atomic Spectra
     Database (Na 5,139 077 eV, Cs 3,893 906 eV, Ag 7,576 234 eV). Electron affinity of Cl: Berzinsh et al., Phys. Rev. A 51,
     231 (1995), 29 138,59 cm⁻¹ = 3,612 72 eV. a at 298–299 K: NBS Circular 539 (NaCl 5,6402 Å, CsCl 4,123 Å, AgCl 5,5491 Å).
     Radii: Shannon, Acta Cryst. A32, 751 (1976), effective ionic radii: Na⁺ (VI) 1,02 Å, Cs⁺ (VIII) 1,74 Å, Ag⁺ (VI) 1,15 Å,
     Cl⁻ (VI) 1,81 Å. Born exponents: 7 (Ne), 9 (Ar), 10 (Kr), 12 (Xe), averaged over the two ions (Pauling; Huheey's table:
     NaCl 8; Ag⁺ like Kr, AgBr 10). Electronegativities: Pauling scale as revised by Allred, J. Inorg. Nucl. Chem. 17, 215
     (1961). Madelung: rock salt from Cristaux.madelungNaCl, CsCl 1,762 675 (madelungCsCl). */
  const MAD_NACL = 1.747565, MAD_CSCL = 1.762675;
  const HALOGENURES = Object.freeze({
    NaCl: Object.freeze({ M: "Na", structure: "NaCl", a: 5.6402e-10, alpha: MAD_NACL, nBorn: 8, dfH: -411.12e3, subM: 107.5e3, EI: 5.13907696 * eV, rM: 1.02e-10, rCl: 1.81e-10, chi: 0.93, coordinence: 6 }),
    CsCl: Object.freeze({ M: "Cs", structure: "CsCl", a: 4.123e-10, alpha: MAD_CSCL, nBorn: 10.5, dfH: -442.83e3, subM: 76.5e3, EI: 3.89390572743 * eV, rM: 1.74e-10, rCl: 1.81e-10, chi: 0.79, coordinence: 8 }),
    AgCl: Object.freeze({ M: "Ag", structure: "NaCl", a: 5.5491e-10, alpha: MAD_NACL, nBorn: 9.5, dfH: -127.01e3, subM: 284.9e3, EI: 7.576234 * eV, rM: 1.15e-10, rCl: 1.81e-10, chi: 1.93, coordinence: 6 }),
  });
  const CHLORE = Object.freeze({ dfH: 121.301e3, AE: 3.61272 * eV, chi: 3.16 });
  function verifierH(h) { if (!h || !["NaCl", "CsCl"].includes(h.structure)) err("halogénure inconnu"); positif(h.a, "a"); }
  function distanceMX(h) { verifierH(h); return h.structure === "NaCl" ? h.a / 2 : h.a * Math.sqrt(3) / 2; }
  function cycleBornHaber(h) {
    verifierH(h);
    const pas = [
      { id: "sublimation", dH: h.subM },
      { id: "atomisation", dH: CHLORE.dfH },
      { id: "ionisation", dH: Cst.N_A * h.EI },
      { id: "attachement", dH: -Cst.N_A * CHLORE.AE },
      { id: "formation", dH: -h.dfH },
    ];
    return { pas, U: pas.reduce((s, p) => s + p.dH, 0) };
  }
  /* (1 − 1/2) = 1/2: Born–Landé with n = 2 is half the point-charge energy. */
  function energieCoulomb(h) { return 2 * X.energieReticulaire(h.alpha, distanceMX(h), 2); }
  function modeleIonique(h, n) { return X.energieReticulaire(h.alpha, distanceMX(h), n === undefined ? h.nBorn : n); }
  function ecart(h, n) { const U = cycleBornHaber(h).U; return (U - modeleIonique(h, n)) / U; }
  function nNecessaire(h) { const r = cycleBornHaber(h).U / energieCoulomb(h); return r >= 1 ? Infinity : 1 / (1 - r); }
  function cube(L) {
    let s = 0;
    for (let i = -L; i <= L; i++) for (let j = -L; j <= L; j++) for (let k = -L; k <= L; k++) {
      if (!i && !j && !k) continue;
      const p = Math.abs(i) % 2;
      if (Math.abs(j) % 2 !== p || Math.abs(k) % 2 !== p) continue;                     // Cs at even, Cl at odd (units a/2)
      const w = (Math.abs(i) === L ? 0.5 : 1) * (Math.abs(j) === L ? 0.5 : 1) * (Math.abs(k) === L ? 0.5 : 1);
      s -= w * (p ? -1 : 1) / Math.sqrt(i * i + j * j + k * k);
    }
    return s * Math.sqrt(3);                                                          // reference d = √3 (a/2)
  }
  function madelungCsCl(L) { if (!Number.isInteger(L) || L < 1) err("L doit être un entier ≥ 1"); return (cube(L) + cube(L + 1)) / 2; }

  const api = Object.freeze({
    fraction, densite, distance, DEFAUTS, entropieDepuisMesure,
    wustite, parametreWustite, masseVolumiqueWustite, teneurFer, xDepuisTeneur, JETTE_FOOTE, M_FE, M_O,
    HALOGENURES, CHLORE, distanceMX, cycleBornHaber, energieCoulomb, modeleIonique, ecart, nNecessaire, madelungCsCl,
  });
  if (node) module.exports = api;
  else root.CristalReel = api;
})(typeof self !== "undefined" ? self : this);

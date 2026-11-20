/* Noyau — the nuclear force seen through what it does: binding energy per nucleon, saturation, short range (Feynman I.12.6).
   Pure, no DOM, UMD (global Noyau). Energies in MeV, distances in fm (10⁻¹⁵ m), as in nuclear tables; densities in kg·m⁻³.
   In a page, load /constantes.js and /lecons/forces.js first (range ħ/(mc), α and ħc come from forces.js).
     COEF                  liquid-drop coefficients, MeV (Rohlf, Modern Physics from α to Z⁰, 1994): volume, surface, Coulomb,
                           asymmetry, pairing (δ = ±aP/√A).
     liaison(A, Z)         semi-empirical binding energy (Weizsäcker 1935): { B, BA, termes: { volume, surface, coulomb, asymetrie,
                           appariement } } in MeV (terms with their sign). Model: A ≳ 20, off by a few % below; shells ignored.
     zStable(A)            the Z that maximises B for this A (integer, 1 ≤ Z ≤ A).
     courbe(A)             BA of the most bound isobar: liaison(A, zStable(A)).BA.
     MESURES               measured B/A of some nuclides (AME2020, Wang et al., Chinese Physics C 45, 030003, 2021), MeV:
                           { id: { A, Z, BA } }, id like "Fe56".
     reaction(avant, apres) Q = Σ B(after) − Σ B(before), MeV, from MESURES; ids, "n" for a free neutron (B = 0).
                           Refused if A or Z is not conserved.
     rayon(A)              R = r0 A^(1/3), fm, r0 = 1,2 fm (charge radii; 1,2 to 1,25 fm depending on the probe).
     masseVolumique()      ρ = u / (4/3 π r0³): the same for every nucleus, in kg·m⁻³.
     coulombPP(r)          Coulomb energy of two protons r fm apart, αħc/r, MeV.
     MEV                   one MeV in joules, 10⁶ e (exact since 2019).
     yukawa(r, R)          e^(−r/R): how much faster a Yukawa interaction of range R dies out than a 1/r one, at r.
     PORTEE                range of the pion exchange, ħ/(m_π c), fm (forces.js).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const Forces = node ? require("./forces.js") : root.Forces;

  const err = m => { throw new Error("noyau: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const posInt = (v, name) => { if (!Number.isInteger(v) || v < 1) err(name + " doit être un entier ≥ 1"); return v; };

  const COEF = Object.freeze({ aV: 15.75, aS: 17.8, aC: 0.711, aA: 23.7, aP: 11.18 });
  const R0 = 1.2;

  function liaison(A, Z) {
    posInt(A, "A"); if (!Number.isInteger(Z) || Z < 0 || Z > A) err("Z entier entre 0 et A");
    const c = COEF, a3 = Math.cbrt(A), N = A - Z;
    const pair = A % 2 ? 0 : (Z % 2 ? -1 : 1) * c.aP / Math.sqrt(A);
    const termes = { volume: c.aV * A, surface: -c.aS * a3 * a3, coulomb: -c.aC * Z * (Z - 1) / a3, asymetrie: -c.aA * (N - Z) * (N - Z) / A, appariement: pair };
    const B = Object.values(termes).reduce((s, x) => s + x, 0);
    return { B, BA: B / A, termes };
  }
  function zStable(A) {
    posInt(A, "A");
    const c = COEF, k = 1 / Math.cbrt(A), z = (4 * c.aA + c.aC * k) / (2 * c.aC * k + 8 * c.aA / A);
    let best = 1, bB = -Infinity;
    for (let Z = Math.max(1, Math.floor(z) - 2); Z <= Math.min(A, Math.ceil(z) + 2); Z++) { const B = liaison(A, Z).B; if (B > bB) { bB = B; best = Z; } }
    return best;
  }
  const courbe = A => liaison(A, zStable(A)).BA;

  /* AME2020, binding energy per nucleon (keV) / 1000 */
  const M = (A, Z, keV) => Object.freeze({ A, Z, BA: keV / 1000 });
  const MESURES = Object.freeze({
    H2: M(2, 1, 1112.283), H3: M(3, 1, 2827.265), He3: M(3, 2, 2572.680), He4: M(4, 2, 7073.915), Li6: M(6, 3, 5332.331),
    Li7: M(7, 3, 5606.440), Be9: M(9, 4, 6462.669), B11: M(11, 5, 6927.732), C12: M(12, 6, 7680.144), N14: M(14, 7, 7475.614),
    O16: M(16, 8, 7976.207), Ne20: M(20, 10, 8032.241), Mg24: M(24, 12, 8260.710), Si28: M(28, 14, 8447.744), S32: M(32, 16, 8493.130),
    Ca40: M(40, 20, 8551.304), Ti48: M(48, 22, 8723.012), Fe56: M(56, 26, 8790.356), Ni62: M(62, 28, 8794.555), Zn64: M(64, 30, 8735.905),
    Kr92: M(92, 36, 8512.675), Zr90: M(90, 40, 8709.969), Ag107: M(107, 47, 8553.901), Sn120: M(120, 50, 8504.488), Ba138: M(138, 56, 8393.422),
    Ba141: M(141, 56, 8326.077), Gd160: M(160, 64, 8183.017), W184: M(184, 74, 8005.077), Au197: M(197, 79, 7915.654), Pb208: M(208, 82, 7867.453),
    Th232: M(232, 90, 7615.033), U235: M(235, 92, 7590.915), U238: M(238, 92, 7570.126),
  });
  const NEUTRON = Object.freeze({ A: 1, Z: 0, BA: 0 });
  const nuclide = id => { const x = id === "n" ? NEUTRON : MESURES[id]; if (!x) err("noyau inconnu : " + id); return x; };
  function reaction(avant, apres) {
    if (!Array.isArray(avant) || !Array.isArray(apres) || !avant.length || !apres.length) err("listes de noyaux attendues");
    const sum = (l, f) => l.map(nuclide).reduce((s, x) => s + f(x), 0);
    if (sum(avant, x => x.A) !== sum(apres, x => x.A)) err("le nombre de nucléons A n'est pas conservé");
    if (sum(avant, x => x.Z) !== sum(apres, x => x.Z)) err("la charge Z n'est pas conservée");
    return sum(apres, x => x.A * x.BA) - sum(avant, x => x.A * x.BA);
  }

  const rayon = A => { finite(A, "A"); if (!(A > 0)) err("A > 0"); return R0 * Math.cbrt(A); };
  const masseVolumique = () => Cst.u / (4 / 3 * Math.PI * Math.pow(R0 * 1e-15, 3));
  const coulombPP = r => { finite(r, "r"); if (!(r > 0)) err("r > 0"); return Forces.alpha() * Forces.HBARC / r; };
  const yukawa = (r, R) => { finite(r, "r"); finite(R, "R"); if (!(r >= 0 && R > 0)) err("r ≥ 0 et R > 0"); return Math.exp(-r / R); };
  const PORTEE = Forces.range(Forces.MPI);
  const MEV = 1e6 * Cst.e;

  const api = { COEF, R0, liaison, zStable, courbe, MESURES, reaction, rayon, masseVolumique, coulombPP, yukawa, PORTEE, MEV };
  if (node) module.exports = api;
  else root.Noyau = api;
})(typeof self !== "undefined" ? self : this);

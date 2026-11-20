/* Calculs des leçons du panorama de Feynman, vol. I, chap. 2 (§2-1 à §2-4) :
   approximation relativiste, forces électrique et gravitationnelle, échelle du spectre électromagnétique,
   inégalité de Heisenberg et taille de l'atome, portée d'une force et masse du médiateur, particules du Modèle standard.
   SI : m, kg, s, J, C ; énergies des particules aussi en eV (unité en usage avec le SI). Pur, sans DOM. UMD. */
(function (root) {
  /* constantes : SI 2019 (exactes) et CODATA 2022, depuis constantes.js */
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const C = Cst.c, H = Cst.h, HBAR = Cst.hbar, E = Cst.e, NA = Cst.N_A, ME = Cst.m_e, MP = Cst.m_p, MN = Cst.m_n;
  const EPS0 = Cst.eps0, G = Cst.G, G0 = Cst.g0;
  const K = 1 / (4 * Math.PI * EPS0);        // N·m²·C⁻²
  const A0 = Cst.a0;                         // m, rayon de Bohr, pour contrôle
  const MEV = 1e6 * E;                       // J
  const FM = 1e-15;                          // m
  const HBARC = HBAR * C / MEV / FM;         // MeV·fm ≈ 197,327

  const finite = (x, name) => { if (typeof x !== "number" || !isFinite(x)) throw new RangeError(name + " : nombre fini attendu"); return x; };
  const positive = (x, name) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(name + " : nombre > 0 attendu"); return x; };

  /* ---------- §2-1 : approximation et raffinement ---------- */
  /* γ − 1 = 1/√(1 − β²) − 1, sous une forme qui ne perd pas de chiffres quand β est petit */
  function gammaMinus1(v) {
    finite(v, "vitesse");
    const b2 = (v / C) * (v / C);
    if (!(b2 < 1)) throw new RangeError("vitesse : |v| < c attendu");
    const s = Math.sqrt(1 - b2);
    return b2 / (s * (1 + s));
  }
  const gamma = v => 1 + gammaMinus1(v);
  /* vitesse à laquelle l'écart relatif γ − 1 atteint eps : β = √(eps(2 + eps)) / (1 + eps) */
  function speedForDeviation(eps) {
    positive(eps, "écart");
    return C * Math.sqrt(eps * (2 + eps)) / (1 + eps);
  }
  /* la correction relativiste se voit-elle à la précision relative donnée ? */
  const detectable = (v, precision) => gammaMinus1(v) > positive(precision, "précision");

  /* ---------- §2-2 : électricité contre gravitation ---------- */
  /* rapport des forces électrique et gravitationnelle entre deux charges ponctuelles massives ; indépendant de la distance */
  function coulombOverNewton(q1, q2, m1, m2) {
    positive(m1, "masse"); positive(m2, "masse");
    return Math.abs(K * finite(q1, "charge") * finite(q2, "charge")) / (G * m1 * m2);
  }
  /* grain de quartz (SiO₂) : 30 électrons par motif, M = 60,08 g·mol⁻¹, ρ = 2650 kg·m⁻³ */
  const SAND = { rho: 2650, molar: 60.08e-3, electrons: 30 };
  function grainMass(diameter) { positive(diameter, "diamètre"); return SAND.rho * Math.PI * diameter ** 3 / 6; }
  function grainElectronCharge(diameter) { return grainMass(diameter) / SAND.molar * NA * SAND.electrons * E; }
  /* force entre deux grains identiques dont une fraction f des électrons n'est pas compensée, à la distance d */
  function grainForce(fraction, d, diameter) {
    diameter = diameter == null ? 1e-3 : diameter;
    if (!(fraction >= 0 && fraction <= 1)) throw new RangeError("fraction : entre 0 et 1");
    positive(d, "distance");
    const q = fraction * grainElectronCharge(diameter);
    return K * q * q / (d * d);
  }
  /* fraction de déséquilibre qui donne la force F entre deux grains à la distance d */
  function fractionForForce(F, d, diameter) {
    positive(F, "force");
    return Math.sqrt(F / grainForce(1, d, diameter));
  }

  /* ---------- §2-2 : l'échelle du spectre ---------- */
  const wavelength = f => C / positive(f, "fréquence");
  const photonEnergy = f => H * positive(f, "fréquence");             // J
  const photonEnergyEV = f => photonEnergy(f) / E;                   // eV
  /* bandes conventionnelles, bornes en Hz ; X et γ se recouvrent en réalité : on les distingue par leur origine */
  const VIS_RED = C / 750e-9, VIS_VIOLET = C / 380e-9;
  const BANDS = [
    { id: "elf", from: 0, to: 3e3 },
    { id: "radio", from: 3e3, to: 3e8 },
    { id: "micro", from: 3e8, to: 3e11 },
    { id: "ir", from: 3e11, to: VIS_RED },
    { id: "visible", from: VIS_RED, to: VIS_VIOLET },
    { id: "uv", from: VIS_VIOLET, to: 3e16 },
    { id: "x", from: 3e16, to: 3e19 },
    { id: "gamma", from: 3e19, to: Infinity },
  ];
  function band(f) { positive(f, "fréquence"); return BANDS.find(b => f >= b.from && f < b.to).id; }
  /* les lignes du tableau 2-1 de Feynman (fréquence en Hz) */
  const LADDER = [
    { id: "secteur", f: 1e2 }, { id: "radio", f: 1e6 }, { id: "fm", f: 1e8 }, { id: "radar", f: 1e10 },
    { id: "lumiere", f: 5e14 }, { id: "x", f: 1e18 }, { id: "noyau", f: 1e21 }, { id: "synchro", f: 1e24 }, { id: "cosmique", f: 1e27 },
  ];

  /* ---------- §2-3 : Heisenberg ---------- */
  const deltaPMin = dx => HBAR / (2 * positive(dx, "Δx"));            // kg·m·s⁻¹
  /* énergie cinétique relativiste d'une impulsion p : √(p²c² + m²c⁴) − mc², écrite pour rester juste aux faibles p */
  function kinetic(p, m) {
    finite(p, "impulsion"); positive(m, "masse");
    const pc = p * C, mc2 = m * C * C;
    return pc * pc / (Math.sqrt(pc * pc + mc2 * mc2) + mc2);
  }
  /* énergie cinétique minimale d'une particule confinée sur Δx */
  const confinementEnergy = (dx, m) => kinetic(deltaPMin(dx), m);
  /* estimation de l'énergie d'un électron à la distance r d'un noyau de charge Ze, avec p ≈ ħ/r :
     E(r) = ħ²/(2 m r²) − Z e²/(4πε0 r) */
  const atomKinetic = (r, m) => HBAR * HBAR / (2 * (m || ME) * positive(r, "r") ** 2);
  const atomPotential = (r, Z) => -(Z || 1) * K * E * E / positive(r, "r");
  const atomEnergy = (r, Z, m) => atomKinetic(r, m) + atomPotential(r, Z);
  /* minimum de E(r) : r* = 4πε0 ħ² / (Z m e²), E* = −Z² m e⁴ / (2 (4πε0)² ħ²) */
  const atomRadius = (Z, m) => HBAR * HBAR / ((Z || 1) * (m || ME) * K * E * E);
  const atomGround = (Z, m) => atomEnergy(atomRadius(Z, m), Z, m);
  /* longueur d'onde de de Broglie d'un électron accéléré sous la tension U (relativiste) */
  function electronWavelength(U) {
    positive(U, "tension");
    const T = E * U, mc2 = ME * C * C, pc = Math.sqrt(T * (T + 2 * mc2));
    return H * C / pc;
  }

  /* ---------- §2-4 : noyaux et particules ---------- */
  /* médiateur d'une force de portée R : mc² ≈ ħc / R (Yukawa), en MeV ; et l'inverse */
  const yukawaMassMeV = R => HBARC / (positive(R, "portée") / FM);
  const rangeForMassMeV = mc2 => HBARC / positive(mc2, "énergie de masse") * FM;
  /* énergie libérée par kilogramme de combustible : Q par noyau de nombre de masse A, en J·kg⁻¹ */
  const nuclearPerKg = (QMeV, A) => positive(QMeV, "Q") * MEV / (positive(A, "A") * 1e-3 / NA);
  const TNT = 4.184e6;                                              // J·kg⁻¹, convention
  const mevToKg = mc2 => mc2 * MEV / (C * C);

  /* les 17 particules élémentaires du Modèle standard. mc² en MeV (PDG 2024 ; quarks légers : schéma MS-barre à 2 GeV) ;
     neutrinos : borne supérieure de KATRIN (2025), 0,45 eV ; charge en unités de e (num/den) ; year : première observation */
  const PARTICLES = [
    { id: "u", kind: "quark", gen: 1, mc2: 2.16, q: [2, 3], year: 1969 },
    { id: "d", kind: "quark", gen: 1, mc2: 4.70, q: [-1, 3], year: 1969 },
    { id: "c", kind: "quark", gen: 2, mc2: 1273.0, q: [2, 3], year: 1974 },
    { id: "s", kind: "quark", gen: 2, mc2: 93.5, q: [-1, 3], year: 1969 },
    { id: "t", kind: "quark", gen: 3, mc2: 172570, q: [2, 3], year: 1995 },
    { id: "b", kind: "quark", gen: 3, mc2: 4183, q: [-1, 3], year: 1977 },
    { id: "e", kind: "lepton", gen: 1, mc2: 0.51099895069, q: [-1, 1], year: 1897 },
    { id: "nue", kind: "lepton", gen: 1, mc2: 0.45e-6, upper: true, q: [0, 1], year: 1956 },
    { id: "mu", kind: "lepton", gen: 2, mc2: 105.6583755, q: [-1, 1], year: 1936 },
    { id: "numu", kind: "lepton", gen: 2, mc2: 0.45e-6, upper: true, q: [0, 1], year: 1962 },
    { id: "tau", kind: "lepton", gen: 3, mc2: 1776.9, q: [-1, 1], year: 1975 },
    { id: "nutau", kind: "lepton", gen: 3, mc2: 0.45e-6, upper: true, q: [0, 1], year: 2000 },
    { id: "gluon", kind: "boson", mc2: 0, q: [0, 1], year: 1979 },
    { id: "photon", kind: "boson", mc2: 0, q: [0, 1], year: null },
    { id: "w", kind: "boson", mc2: 80369.2, q: [1, 1], year: 1983 },
    { id: "z", kind: "boson", mc2: 91188.0, q: [0, 1], year: 1983 },
    { id: "higgs", kind: "boson", mc2: 125200, q: [0, 1], year: 2012 },
  ];
  /* interactions que ressent chaque particule (la gravitation agit sur toutes) */
  function feels(p) {
    const out = [];
    if (p.kind === "quark" || p.id === "gluon") out.push("forte");
    if (p.q[0] !== 0 || p.id === "w") out.push("em");
    if (p.kind !== "boson" || p.id === "w" || p.id === "z" || p.id === "higgs") out.push("faible");
    return out;
  }

  const api = { C, H, HBAR, E, NA, ME, MP, MN, EPS0, K, G, G0, A0, MEV, FM, HBARC, TNT,
    gammaMinus1, gamma, speedForDeviation, detectable,
    coulombOverNewton, SAND, grainMass, grainElectronCharge, grainForce, fractionForForce,
    wavelength, photonEnergy, photonEnergyEV, BANDS, band, LADDER,
    deltaPMin, kinetic, confinementEnergy, atomKinetic, atomPotential, atomEnergy, atomRadius, atomGround, electronWavelength,
    yukawaMassMeV, rangeForMassMeV, nuclearPerKg, mevToKg, PARTICLES, feels };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Fondamentale = api;
})(typeof self !== "undefined" ? self : this);

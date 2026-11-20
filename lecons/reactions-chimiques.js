/* Chemical reactions (Feynman I, §1-4): atoms change partners. Atom bookkeeping, reaction enthalpies (Hess), bond-enthalpy estimate,
   and 3D shapes of small molecules built from their bond graph (lengths in Å = 10⁻¹⁰ m, for display only). Pure, UMD. */
(function (root) {
  const MASS = { H: 1.008, C: 12.011, O: 15.999 };          // g·mol⁻¹
  const VALENCE = { H: 1, C: 4, O: 2 };

  /* Species: atom counts and standard enthalpy of formation at 298 K, kJ·mol⁻¹ (gas, except graphite). */
  const SPECIES = {
    C: { atoms: { C: 1 }, dfH: 0 },
    O2: { atoms: { O: 2 }, dfH: 0 },
    CO: { atoms: { C: 1, O: 1 }, dfH: -110.5 },
    CO2: { atoms: { C: 1, O: 2 }, dfH: -393.5 },
    H2O: { atoms: { H: 2, O: 1 }, dfH: -241.8 },
    CH4: { atoms: { C: 1, H: 4 }, dfH: -74.6 },
  };
  /* Reactions as stoichiometric coefficients; `fuel` names the species whose mass the page lets you vary. */
  const REACTIONS = {
    c_co2: { fuel: "C", left: { C: 1, O2: 1 }, right: { CO2: 1 } },
    c_co: { fuel: "C", left: { C: 2, O2: 1 }, right: { CO: 2 } },
    co_co2: { fuel: "CO", left: { CO: 2, O2: 1 }, right: { CO2: 2 } },
    ch4: { fuel: "CH4", left: { CH4: 1, O2: 2 }, right: { CO2: 1, H2O: 2 } },
  };

  function count(side) {
    const n = {};
    for (const [s, k] of Object.entries(side)) for (const [a, m] of Object.entries(SPECIES[s].atoms)) n[a] = (n[a] || 0) + k * m;
    return n;
  }
  function balanced(r) { const a = count(r.left), b = count(r.right), keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every(k => a[k] === b[k]); }
  const molarMass = s => Object.entries(SPECIES[s].atoms).reduce((m, [a, k]) => m + k * MASS[a], 0);   // g·mol⁻¹
  const sum = side => Object.entries(side).reduce((h, [s, k]) => h + k * SPECIES[s].dfH, 0);
  /* Hess: ΔrH = Σ products − Σ reactants, kJ per mole of reaction as written. */
  const deltaH = r => sum(r.right) - sum(r.left);
  /* Energy released per kilogram of fuel, J·kg⁻¹, and mass of CO₂ produced per kilogram of fuel. */
  const perKg = r => -deltaH(r) * 1e3 / (r.left[r.fuel] * molarMass(r.fuel) * 1e-3);
  const co2PerKg = r => (r.right.CO2 || 0) * molarMass("CO2") / (r.left[r.fuel] * molarMass(r.fuel));

  /* Mean bond enthalpies, kJ·mol⁻¹ (C=O as in CO₂). Breaking costs, forming releases. */
  const BOND = { "C-H": 413, "O=O": 498, "C=O": 799, "O-H": 463 };
  const bondEstimate = (broken, formed) => Object.entries(broken).reduce((e, [b, k]) => e + k * BOND[b], 0) - Object.entries(formed).reduce((e, [b, k]) => e + k * BOND[b], 0);

  /* ---------- molecular shapes ---------- */
  /* heavy atoms + bonds [i, j, order]; hydrogens are added to fill valences unless h gives them per atom */
  const MOLECULES = {
    o2: { atoms: ["O", "O"], bonds: [[0, 1, 2]] },
    co: { atoms: ["C", "O"], bonds: [[0, 1, 3]], h: [0, 0] },
    co2: { atoms: ["O", "C", "O"], bonds: [[0, 1, 2], [1, 2, 2]] },
    h2o: { atoms: ["O"], bonds: [] },
    ch4: { atoms: ["C"], bonds: [] },
    /* α-ionone, (3E)-4-(2,6,6-trimethylcyclohex-2-en-1-yl)but-3-en-2-one: the scent of violets */
    ionone: { atoms: ["C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C", "O", "C"],
      bonds: [[0, 1, 1], [1, 2, 2], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1], [1, 6, 1], [5, 7, 1], [5, 8, 1], [0, 9, 1], [9, 10, 2], [10, 11, 1], [11, 12, 2], [11, 13, 1]] },
  };
  const LENGTH = { "C-H1": 1.09, "H-O1": 0.96, "C-C1": 1.54, "C-C2": 1.34, "C-O1": 1.43, "C-O2": 1.21, "C-O3": 1.13, "O-O2": 1.21 };
  const bondLength = (a, b, o, linear) => (a === "C" && b === "O" || a === "O" && b === "C") && o === 2 && linear ? 1.16 : LENGTH[[a, b].sort().join("-") + o];

  function graph(name) {
    const m = MOLECULES[name];
    if (!m) throw new Error("chem: unknown molecule " + name);
    const atoms = m.atoms.slice(), bonds = m.bonds.map(b => b.slice());
    m.atoms.forEach((a, i) => {
      const used = bonds.filter(b => b[0] === i || b[1] === i).reduce((s, b) => s + b[2], 0);
      const nh = m.h ? m.h[i] : VALENCE[a] - used;
      for (let k = 0; k < nh; k++) { atoms.push("H"); bonds.push([i, atoms.length - 1, 1]); }
    });
    return { atoms, bonds };
  }
  const formula = name => { const n = {}; graph(name).atoms.forEach(a => n[a] = (n[a] || 0) + 1); return n; };

  /* Target distances: bonds (1-2), bond angles (1-3) from each centre's geometry, then relaxation with soft repulsion. */
  function embed(name, rand, sweeps, tries) {
    const { atoms, bonds } = graph(name), N = atoms.length, nb = atoms.map(() => []);
    bonds.forEach(([i, j, o]) => { nb[i].push([j, o]); nb[j].push([i, o]); });
    const D = new Map(), key = (i, j) => i < j ? i + "," + j : j + "," + i;
    const linear = i => nb[i].some(([, o]) => o === 3) || nb[i].filter(([, o]) => o === 2).length >= 2;
    bonds.forEach(([i, j, o]) => D.set(key(i, j), bondLength(atoms[i], atoms[j], o, linear(i) || linear(j))));
    atoms.forEach((a, c) => {
      const n = nb[c]; if (n.length < 2) return;
      const ang = linear(c) ? Math.PI : n.some(([, o]) => o === 2) ? 2 * Math.PI / 3 : a === "O" ? 104.5 * Math.PI / 180 : Math.acos(-1 / 3);
      for (let p = 0; p < n.length; p++) for (let q = p + 1; q < n.length; q++) {
        const r1 = D.get(key(c, n[p][0])), r2 = D.get(key(c, n[q][0]));
        D.set(key(n[p][0], n[q][0]), Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(ang)));
      }
    });
    const pairs = [...D].map(([k, d]) => { const [i, j] = k.split(",").map(Number); return [i, j, d]; });
    const lines = atoms.map((a, c) => linear(c) ? [nb[c][0][0], c, nb[c][1][0]] : null).filter(Boolean);
    const flats = atoms.map((a, c) => !linear(c) && nb[c].length === 3 && nb[c].some(([, o]) => o === 2) ? [c, nb[c].map(x => x[0])] : null).filter(Boolean);
    const near = (i, j) => D.has(key(i, j));
    sweeps = sweeps || 3000;
    /* several random starts, keep the least strained: a start can tangle a ring into a shape no relaxation undoes */
    let best = null;
    for (let tr = 0; tr < (tries || 6); tr++) {
      const P = Array.from({ length: N }, () => [rand() * 8 - 4, rand() * 8 - 4, rand() * 8 - 4]);
      for (let s = 0; s < sweeps; s++) {
        for (const [i, j, d] of pairs) relax(P, i, j, d, 0.5, false);
        for (const [a, c, b] of lines) straighten(P, a, c, b);             // near 180° a distance alone barely pulls
        for (const [c, n] of flats) flatten(P, c, n);                      // an sp² carbon sits in the plane of its three neighbours
        if (s % 4 === 0 && s < 0.8 * sweeps) for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (!near(i, j)) {
          const m = atoms[i] === "H" && atoms[j] === "H" ? 1.9 : atoms[i] === "H" || atoms[j] === "H" ? 2.2 : 2.5;   // below 1-4 contacts
          relax(P, i, j, m, 0.2, true);
        }                                                                  // the last fifth polishes bonds and angles alone
      }
      const stress = pairs.reduce((e, [i, j, d]) => e + Math.pow(dist(P, i, j) / d - 1, 2), 0);
      if (!best || stress < best.stress) best = { P, stress };
    }
    const P = best.P, c = [0, 1, 2].map(k => P.reduce((s, p) => s + p[k], 0) / N);
    return { atoms, bonds, stress: best.stress, pos: P.map(p => p.map((v, k) => v - c[k])) };
  }
  /* move an sp² centre halfway to the plane of its three neighbours (the 360° the angle targets cannot always enforce in a ring) */
  function flatten(P, c, [a, b, d]) {
    const u = [0, 1, 2].map(k => P[b][k] - P[a][k]), v = [0, 1, 2].map(k => P[d][k] - P[a][k]);
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], l = Math.hypot(...n);
    if (l < 1e-9) return;
    const h = [0, 1, 2].reduce((s, k) => s + (P[c][k] - P[a][k]) * n[k], 0) / l;
    for (let k = 0; k < 3; k++) P[c][k] -= 0.5 * h * n[k] / l;
  }
  /* move the two ends of a linear centre halfway toward the straight line through it */
  function straighten(P, a, c, b) {
    const ra = dist(P, a, c), rb = dist(P, b, c);
    const u = [0, 1, 2].map(k => (P[a][k] - P[b][k]));
    const n = Math.hypot(...u) || 1e-6;
    for (let k = 0; k < 3; k++) {
      const ta = P[c][k] + u[k] / n * ra, tb = P[c][k] - u[k] / n * rb;
      P[a][k] += 0.5 * (ta - P[a][k]); P[b][k] += 0.5 * (tb - P[b][k]);
    }
  }
  function relax(P, i, j, d, f, onlyPush) {
    const a = P[i], b = P[j], dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], r = Math.hypot(dx, dy, dz) || 1e-6;
    if (onlyPush && r >= d) return;
    const k = f * (r - d) / r / 2;
    a[0] += k * dx; a[1] += k * dy; a[2] += k * dz; b[0] -= k * dx; b[1] -= k * dy; b[2] -= k * dz;
  }
  const dist = (p, i, j) => Math.hypot(p[i][0] - p[j][0], p[i][1] - p[j][1], p[i][2] - p[j][2]);
  function angle(p, a, c, b) {
    const u = [0, 1, 2].map(k => p[a][k] - p[c][k]), v = [0, 1, 2].map(k => p[b][k] - p[c][k]);
    return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / (Math.hypot(...u) * Math.hypot(...v)))));
  }

  const api = { MASS, SPECIES, REACTIONS, BOND, MOLECULES, count, balanced, molarMass, deltaH, perKg, co2PerKg, bondEstimate,
    graph, formula, embed, bondLength, dist, angle };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Chem = api;
})(typeof self !== "undefined" ? self : this);

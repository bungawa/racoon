/* CristalParfait — the perfect crystal of the chemistry programme: counting in a cell, compactness, density, interstitial
   sites, compact layers. Pure, no DOM, UMD (global CristalParfait). SI throughout (m, kg, mol, kg·m⁻³). Shared by the three
   lessons of the step « Le cristal parfait » (chim-cristal-parfait): « Réseau, motif et maille », « Empilements compacts »,
   « Compacité, masse volumique et sites interstitiels »; the later crystal steps of the same world can require it. Crystal
   positions, neighbours and compact layers come from Cristaux (public/lecons/cristaux.js), constants from public/constantes.js.

   A structure is Cristaux's { reseau, a, motif: [{ e, f }] }, f the
   fractional coordinates of an atom in the conventional cubic cell of edge a.
     poids(f)                  share of an atom at f (fractional) that lies in the cell: 1 inside, 1/2 on a face, 1/4 on an
                               edge, 1/8 on a corner (1/2^k, k coordinates equal to 0 or 1); 0 outside.
     decompte(s, e)            the atoms of species e (all species if omitted) drawn in one closed cell, sorted by place:
                               { coins, aretes, faces, interieur, population } (counts, then Σ poids). The population is
                               computed from the drawn atoms, not read from the motif: the two must agree.
     STRUCTURES                { Cu, Fe, CsCl, NaCl, diamant }: Cu, NaCl and diamant are Cristaux.STRUCTURES; Fe is α-iron
                               (cubic body-centred), CsCl a simple cubic lattice with a motif of two ions.
     METAUX_CFC                { Cu, Al, Ag, Au, Ni }: { a (m), M (kg·mol⁻¹), rho (measured density near 293 K, kg·m⁻³) }.
     rayonContactCFC(a)        r = a √2/4: spheres touching along a face diagonal.
     parametreCFC(r)           a = 2 √2 r, the inverse.
     masseVolumique(N, M, a)   ρ = N M / (N_A a³): N entities of molar mass M in a cube of edge a.
     compacite(N, r, a)        C = N (4/3) π r³ / a³.
     SITES_CFC                 { T: 8 tetrahedral sites, O: 13 octahedral sites (centre and 12 edge midpoints) } of the closed
                               cell, fractional. Populations: 8 and 4.
     habitabilite(type, r)     radius of the largest sphere that fits a site of type "T" or "O" between host spheres of radius
                               r in contact: (√(3/2) − 1) r and (√2 − 1) r.
     rayonSite(a, f)           the same, measured: distance from the point f·a to the nearest node of the fcc lattice of edge a,
                               minus the contact radius a √2/4.
     coucheCFC(f)              letter A, B or C of the compact plane x + y + z = n (n integer) that holds the fcc node f:
                               "ABC"[n mod 3]. Along a body diagonal, the fcc lattice is the stacking ABC.
     troisieme(l1, l2)         the letter of A, B, C that is neither l1 nor l2.
     sitesEntreCouches(bas, haut, n, d)   the interstices between a compact layer bas (z = 0) and the layer haut above it
                               (z = h = d √(2/3)), both made of n × n spheres of diameter d (Cristaux.couche): { T, O } as
                               [[x, y, z]…]. T: under each sphere of haut (z = h/4) and over each sphere of bas (z = 3h/4);
                               O: over the hollows that neither layer covers (z = h/2). Per sphere: 2 T and 1 O.

   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes;
  const X = node ? require("./cristaux.js") : root.Cristaux;
  const err = m => { throw new Error("cristal parfait : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être positif"); };
  const TOL = 1e-9;

  /* ---------- perfect crystal: counting ---------- */
  function poids(f) {
    if (!Array.isArray(f) || f.length !== 3) err("f doit être [x, y, z]");
    f.forEach((x, k) => fini(x, "f[" + k + "]"));
    if (f.some(x => x < -TOL || x > 1 + TOL)) return 0;
    const k = f.filter(x => Math.abs(x) <= TOL || Math.abs(x - 1) <= TOL).length;
    return 1 / Math.pow(2, k);
  }
  function decompte(s, e) {
    const at = X.atomes(s, 1).filter(o => e === undefined || o.e === e);
    if (e !== undefined && !at.length) err("aucun atome « " + e + " » dans la structure");
    const out = { coins: 0, aretes: 0, faces: 0, interieur: 0, population: 0 };
    const NOM = ["interieur", "faces", "aretes", "coins"];
    at.forEach(o => { const f = o.r.map(x => x / s.a), w = poids(f); out[NOM[Math.round(-Math.log2(w))]]++; out.population += w; });
    return out;
  }

  /* ---------- structures and data ---------- */
  const STRUCTURES = Object.freeze({
    Cu: X.STRUCTURES.Cu,
    Fe: X.cubique("cc", 286.65e-12, "Fe"),                 // α-iron, Im-3m: Kohlhaas et al. 1967 (WebElements)
    CsCl: { reseau: "cp", a: 412.3e-12, formule: 1,       // Pm-3m, a = 4,123 Å (ILPI)
      motif: [{ e: "Cs", f: [0, 0, 0] }, { e: "Cl", f: [0.5, 0.5, 0.5] }] },
    NaCl: X.STRUCTURES.NaCl,
    diamant: X.STRUCTURES.diamant,
  });
  // a: WebElements (Cu: Straumanis & Yu 1969; Al: Witt 1967; Ag: Liu & Bassett 1973; Au: Maeland & Flanagan 1964; Ni: Taylor 1950).
  // M: CIAAW standard atomic weights 2024. rho: CRC Handbook, near room temperature (Wikipedia, densities of the elements).
  const METAUX_CFC = Object.freeze({
    Cu: Object.freeze({ a: 361.49e-12, M: 63.546e-3, rho: 8960 }),
    Al: Object.freeze({ a: 404.95e-12, M: 26.9815384e-3, rho: 2700 }),
    Ag: Object.freeze({ a: 408.53e-12, M: 107.8682e-3, rho: 10490 }),
    Au: Object.freeze({ a: 407.82e-12, M: 196.96657e-3, rho: 19300 }),
    Ni: Object.freeze({ a: 352.4e-12, M: 58.6934e-3, rho: 8908 }),
  });

  /* ---------- compactness, density, sites ---------- */
  const rayonContactCFC = a => { positif(a, "a"); return a * Math.SQRT2 / 4; };
  const parametreCFC = r => { positif(r, "r"); return 2 * Math.SQRT2 * r; };
  function masseVolumique(N, M, a) { positif(N, "N"); positif(M, "M"); positif(a, "a"); return N * M / (Cst.N_A * a * a * a); }
  function compacite(N, r, a) { positif(N, "N"); positif(r, "r"); positif(a, "a"); return N * 4 / 3 * Math.PI * r * r * r / (a * a * a); }

  const q = 0.25, t = 0.75, h = 0.5;
  const SITES_CFC = Object.freeze({
    T: Object.freeze([[q, q, q], [t, q, q], [q, t, q], [q, q, t], [t, t, q], [t, q, t], [q, t, t], [t, t, t]]),
    O: Object.freeze([[h, h, h],
      [h, 0, 0], [h, 1, 0], [h, 0, 1], [h, 1, 1], [0, h, 0], [1, h, 0], [0, h, 1], [1, h, 1], [0, 0, h], [1, 0, h], [0, 1, h], [1, 1, h]]),
  });
  const FACTEUR = { T: Math.sqrt(1.5) - 1, O: Math.SQRT2 - 1 };
  function habitabilite(type, r) {
    if (!(type in FACTEUR)) err("site « " + type + " » inconnu (T ou O)");
    positif(r, "r"); return FACTEUR[type] * r;
  }
  const NOEUDS = X.atomes(X.cubique("cfc", 1, "X"), 3).map(o => o.r);   // fcc nodes of 3 × 3 × 3 unit cells, edge 1
  function rayonSite(a, f) {
    positif(a, "a");
    if (!Array.isArray(f) || f.length !== 3 || f.some(x => !(x >= 0 && x <= 1))) err("f doit être [x, y, z] dans la maille");
    const p = f.map(x => x + 1);                                      // the middle cell of the block: a lattice translation
    const dmin = Math.min(...NOEUDS.map(n => Math.hypot(n[0] - p[0], n[1] - p[1], n[2] - p[2])));
    return (dmin - Math.SQRT2 / 4) * a;
  }

  /* ---------- compact layers ---------- */
  function coucheCFC(f) {
    if (!Array.isArray(f) || f.length !== 3) err("f doit être [x, y, z]");
    const s = f[0] + f[1] + f[2], n = Math.round(s);
    if (Math.abs(s - n) > 1e-6 || Math.abs(2 * f[0] - Math.round(2 * f[0])) > 1e-6) err("f n'est pas un nœud du réseau cubique à faces centrées");
    return "ABC"[((n % 3) + 3) % 3];
  }
  function troisieme(l1, l2) {
    if (!/^[ABC]$/.test(l1) || !/^[ABC]$/.test(l2) || l1 === l2) err("deux lettres différentes parmi A, B, C");
    return "ABC".replace(l1, "").replace(l2, "");
  }
  function sitesEntreCouches(bas, haut, n, d) {
    const o = troisieme(bas, haut), H = d * Math.sqrt(2 / 3);
    const at = (l, z) => X.couche(l, n, d).map(p => [p[0], p[1], z]);
    return { T: at(haut, H / 4).concat(at(bas, 3 * H / 4)), O: at(o, H / 2) };
  }

  const api = Object.freeze({
    poids, decompte, STRUCTURES, METAUX_CFC, rayonContactCFC, parametreCFC, masseVolumique, compacite,
    SITES_CFC, habitabilite, rayonSite, coucheCFC, troisieme, sitesEntreCouches,
  });
  if (node) module.exports = api;
  else root.CristalParfait = api;
})(typeof self !== "undefined" ? self : this);

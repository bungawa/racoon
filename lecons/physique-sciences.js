/* Calculs des leçons « La physique et les autres sciences » (Feynman I, §3-1 à §3-3). SI partout : m, s, kg, J, K, Pa.
   §3-1 : échelles de longueur, disciplines, rayon au-delà duquel la gravité arrondit un corps.
   §3-2 : loi d'Arrhenius ; configuration électronique par la règle de Klechkowski et place dans le tableau périodique.
   §3-3 : vitesse de l'influx nerveux avec et sans myéline ; transcription et traduction par le code génétique standard.
   Pur, sans DOM, UMD. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G = Cst.G, R = Cst.R;
  const ATOM = 1e-10;                   // m, ordre de grandeur d'un diamètre atomique

  /* ---------- §3-1 : échelles ---------- */
  /* tailles caractéristiques, en m (Wikipedia, « Orders of magnitude (length) » ; ribosome : 20 nm chez les bactéries ;
     disque stellaire de la Voie lactée : ≈ 10⁵ années-lumière) */
  const OBJECTS = [
    ["proton", 1.75e-15], ["atome", 1.06e-10], ["eau", 2.8e-10], ["adn", 2e-9], ["ribosome", 2e-8], ["bacterie", 2e-6],
    ["globule", 7e-6], ["humain", 1.75], ["everest", 8848], ["terre", 1.2756e7], ["soleil", 1.39e9], ["ua", 1.496e11],
    ["galaxie", 1e21], ["univers", 8.7e26],
  ].map(([id, L]) => ({ id, L }));
  /* domaines (de, à) en m où chaque science pose ses questions propres ; la physique les couvre tous */
  const DISCIPLINES = [
    ["physique", 1e-16, 1e27], ["chimie", 1e-11, 1e-7], ["biologie", 1e-9, 1e2], ["psychologie", 1e-5, 1e1],
    ["geologie", 1e-6, 1.3e7], ["astronomie", 1e5, 1e27],
  ].map(([id, from, to]) => ({ id, from, to }));

  const lg = Math.log10;
  function nearest(L) {
    if (!(L > 0)) throw new RangeError("échelle : L > 0 attendu");
    return OBJECTS.reduce((b, o) => Math.abs(lg(o.L / L)) < Math.abs(lg(b.L / L)) ? o : b);
  }
  const active = L => DISCIPLINES.filter(d => L >= d.from && L <= d.to).map(d => d.id);
  const atomsAcross = L => L / ATOM;

  /* Rayon « patate » (Lineweaver et Norman, 2010, éq. 4) : la pression au centre d'un corps de masse volumique rho
     dépasse la limite d'élasticité sigma, la matière s'écoule et le corps s'arrondit. R ≈ √(2σ / (πGρ²)). */
  function potatoRadius(sigma, rho) {
    if (!(sigma > 0) || !(rho > 0)) throw new RangeError("rayon : σ et ρ > 0 attendus");
    return Math.sqrt(2 * sigma / (Math.PI * G * rho * rho));
  }
  const ROCK = { sigma: 1e7, rho: 2500 };                     // silicates : 10 MPa, 2 500 kg·m⁻³ (même article)
  const NUCLEAR = 1e-14;                                      // m : au-delà, l'interaction forte ne se fait plus sentir
  /* interaction qui donne sa forme à un objet de taille L (diamètre) */
  function regime(L) {
    if (L < NUCLEAR) return "forte";
    return L > 2 * potatoRadius(ROCK.sigma, ROCK.rho) ? "gravite" : "electromagnetique";
  }

  /* ---------- §3-2 : Arrhenius ---------- */
  /* k(T2)/k(T1) = exp(Ea/R · (1/T1 − 1/T2)), Ea en J·mol⁻¹, T en K */
  function arrhenius(Ea, T1, T2) {
    if (!(T1 > 0) || !(T2 > 0)) throw new RangeError("Arrhenius : températures absolues > 0 attendues");
    return Math.exp(Ea / R * (1 / T1 - 1 / T2));
  }
  /* énergie d'activation qui multiplie la vitesse par q entre T et T + dT */
  const eaFor = (q, T, dT) => R * Math.log(q) / (1 / T - 1 / (T + (dT == null ? 10 : dT)));
  /* facteur de Boltzmann : fraction des chocs assez énergétiques, à l'ordre de grandeur */
  const boltzmann = (Ea, T) => Math.exp(-Ea / (R * T));
  /* règle du Q10 : facteur q par tranche de 10 K */
  const q10 = (q, T1, T2) => Math.pow(q, (T2 - T1) / 10);

  /* ---------- §3-2 : configuration électronique ---------- */
  const L_LETTER = "spdf", CAP = l => 2 * (2 * l + 1);
  /* sous-couches dans l'ordre de Klechkowski : n + l croissant, puis n croissant */
  const ORDER = [];
  for (let n = 1; n <= 7; n++) for (let l = 0; l < Math.min(n, 4); l++) ORDER.push({ n, l });
  ORDER.sort((a, b) => (a.n + a.l) - (b.n + b.l) || a.n - b.n);
  /* exceptions mesurées parmi Z ≤ 36 : un électron 4s passe en 3d (Cr : 3d⁵ 4s¹, Cu : 3d¹⁰ 4s¹) */
  const EXCEPTIONS = { 24: 1, 29: 1 };
  const ZMAX = 36;
  function configuration(Z) {
    if (!(Number.isInteger(Z) && Z >= 1 && Z <= ZMAX)) throw new RangeError("configuration : Z entier de 1 à " + ZMAX);
    const out = [];
    let left = Z;
    for (const s of ORDER) { if (!left) break; const e = Math.min(left, CAP(s.l)); out.push({ n: s.n, l: s.l, e }); left -= e; }
    const shift = EXCEPTIONS[Z] || 0;
    if (shift) {
      const s4 = out.find(x => x.n === 4 && x.l === 0), d3 = out.find(x => x.n === 3 && x.l === 2);
      s4.e -= shift; d3.e += shift;
    }
    return out;
  }
  const label = s => s.n + L_LETTER[s.l];
  /* bloc = sous-couche remplie en dernier selon Klechkowski ; période = n le plus grand ; colonne de 1 à 18 */
  function place(Z) {
    const c = configuration(Z), last = c[c.length - 1];
    const kl = (() => { let left = Z, cur = null; for (const s of ORDER) { if (!left) break; cur = s; left -= Math.min(left, CAP(s.l)); } return cur; })();
    const period = Math.max(...c.map(s => s.n)), get = (n, l) => (c.find(s => s.n === n && s.l === l) || { e: 0 }).e;
    const block = L_LETTER[kl.l], ns = get(period, 0);
    let column;
    if (Z === 2) column = 18;                                  // l'hélium, 1s², se range avec les gaz nobles
    else if (block === "s") column = ns;
    else if (block === "p") column = 10 + ns + get(period, 1);
    else column = ns + get(period - 1, 2);
    const outer = c.filter(s => s.n === period).reduce((a, s) => a + s.e, 0);
    return { Z, period, column, block, outer, last: label(last), config: c };
  }

  /* ---------- §3-3 : influx nerveux ---------- */
  /* fibre myélinisée : v ≈ 5,7 m·s⁻¹ par µm de diamètre de fibre (Boyd et Kalu 1979, groupes I et α)
     axone nu : v ∝ √d (Hodgkin 1954), coefficient calé sur les fibres C : 1 µm → 1 m·s⁻¹ */
  const K_MYEL = 5.7e6;                  // s⁻¹ (5,7 m·s⁻¹ par µm)
  const K_NU = 1 / Math.sqrt(1e-6);      // m^½·s⁻¹ (1 m·s⁻¹ pour 1 µm)
  const vMyelin = D => { if (!(D > 0)) throw new RangeError("diamètre > 0 attendu"); return K_MYEL * D; };
  const vBare = d => { if (!(d > 0)) throw new RangeError("diamètre > 0 attendu"); return K_NU * Math.sqrt(d); };
  /* diamètre d'un axone nu qui irait à la vitesse v */
  const bareFor = v => (v / K_NU) * (v / K_NU);
  const delay = (L, v) => L / v;

  /* ---------- §3-3 : code génétique standard ---------- */
  /* table 1 (code standard), bases dans l'ordre T, C, A, G pour la 1re, 2e et 3e position ; « * » = codon stop */
  const BASES = "TCAG";
  const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  const CODE = {};
  for (let i = 0; i < 64; i++) CODE[BASES[i >> 4] + BASES[(i >> 2) & 3] + BASES[i & 3]] = AA[i];
  const clean = s => { s = String(s).toUpperCase(); if (/[^ACGTU]/.test(s)) throw new RangeError("séquence : A, C, G, T ou U seulement"); return s; };
  /* brin codant de l'ADN → ARN messager : même séquence, U à la place de T */
  const transcribe = dna => clean(dna).replace(/T/g, "U");
  const codonAA = c => CODE[clean(c).replace(/U/g, "T")];
  /* traduction : du premier AUG jusqu'au premier stop (exclu) → [{codon, aa}] ; stop: true si un stop a été lu */
  function translate(rna) {
    const s = clean(rna).replace(/T/g, "U"), start = s.indexOf("AUG"), out = [];
    if (start < 0) return { start, codons: out, stop: false };
    for (let i = start; i + 3 <= s.length; i += 3) {
      const c = s.slice(i, i + 3), aa = codonAA(c);
      if (aa === "*") return { start, codons: out, stop: true, stopCodon: c };
      out.push({ codon: c, aa });
    }
    return { start, codons: out, stop: false };
  }
  /* substitution d'une base, et son effet sur la protéine */
  const mutate = (dna, i, b) => { dna = clean(dna); if (!(i >= 0 && i < dna.length)) throw new RangeError("position hors de la séquence"); return dna.slice(0, i) + clean(b) + dna.slice(i + 1); };
  function effect(dnaRef, dnaMut) {
    const a = translate(transcribe(dnaRef)), b = translate(transcribe(dnaMut));
    const pa = a.codons.map(c => c.aa).join(""), pb = b.codons.map(c => c.aa).join("");
    if (a.start !== b.start) return "depart";
    if (pa === pb) return "silencieuse";
    if (pb.length < pa.length && pa.startsWith(pb) && b.stop) return "non-sens";
    return "faux-sens";
  }
  /* nombre de codons par acide aminé */
  const degeneracy = () => Object.values(CODE).reduce((m, a) => (m[a] = (m[a] || 0) + 1, m), {});

  const api = { G, R, ATOM, OBJECTS, DISCIPLINES, nearest, active, atomsAcross, potatoRadius, ROCK, NUCLEAR, regime,
    arrhenius, eaFor, boltzmann, q10, ORDER, ZMAX, configuration, label, place,
    K_MYEL, K_NU, vMyelin, vBare, bareFor, delay, CODE, transcribe, codonAA, translate, mutate, effect, degeneracy };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Sciences = api;
})(typeof self !== "undefined" ? self : this);

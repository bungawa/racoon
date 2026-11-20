/* Calculs des leçons « Conservation de l'énergie » (Feynman I.4.1 à I.4.4) : bilan d'une grandeur conservée,
   machines qui soulèvent des poids, chute libre, ordres de grandeur des énergies.
   Pur, sans DOM, UMD (global Energie). SI : m en kg, h en m, v en m·s⁻¹, énergies en J.
   Partagé par qu-est-ce-que-l-energie, energie-potentielle-pesanteur, energie-cinetique et autres-formes-energie. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G = Cst.g_CPGE, C = Cst.c, U = Cst.u;   // G : valeur arrondie utilisée en CPGE
  const EV = Cst.e;                       // J : 1 eV = e × 1 V

  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) throw new Error("energie: " + name + " doit être un nombre fini"); };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) throw new Error("energie: " + name + " doit être strictement positif"); };
  const nonneg = (v, name) => { finite(v, name); if (!(v >= 0)) throw new Error("energie: " + name + " doit être positif ou nul"); };

  /* ---------- formules de base ---------- */
  const potential = (m, h, g) => { finite(m, "m"); finite(h, "h"); return m * (g == null ? G : g) * h; };      // Ep = m g h, origine au sol
  const kinetic = (m, v) => { finite(m, "m"); finite(v, "v"); return m * v * v / 2; };                          // Ec = m v²/2
  const speedFromHeight = (h, g) => { nonneg(h, "h"); return Math.sqrt(2 * (g == null ? G : g) * h); };       // v = √(2 g h)
  const heightFromSpeed = (v, g) => { finite(v, "v"); return v * v / (2 * (g == null ? G : g)); };            // h = v²/(2 g)
  const spring = (k, x) => { nonneg(k, "k"); finite(x, "x"); return k * x * x / 2; };                         // ½ k x²
  const thermal = (m, c, dT) => { nonneg(m, "m"); nonneg(c, "c"); finite(dT, "ΔT"); return m * c * dT; };     // m c ΔT
  const massEnergy = m => { finite(m, "m"); return m * C * C; };                                                // m c²

  /* ---------- I.4.1 : le bilan des billes ----------
     Camille possède N billes indestructibles. Certaines sont visibles, d'autres enfermées dans une boîte scellée
     (on pèse la boîte), d'autres au fond d'un aquarium opaque (on lit la hauteur d'eau), d'autres sorties de la chambre. */
  const BILLES = { N: 40, bille: 0.005, boite: 0.120, h0: 0.150, section: 0.01, volume: 2.0e-6 };   // verre : 2,5 g·cm⁻³
  /* une répartition {sol, boite, eau, dehors} → ce que l'on mesure sans ouvrir la boîte ni vider l'aquarium */
  function measure(r, P) {
    P = P || BILLES;
    for (const k of ["sol", "boite", "eau", "dehors"]) { nonneg(r[k], k); if (!Number.isInteger(r[k])) throw new Error("energie: " + k + " doit être entier"); }
    return { vues: r.sol, masse: P.boite + r.boite * P.bille, hauteur: P.h0 + r.eau * P.volume / P.section };
  }
  /* le bilan : ce qui est vu + ce que l'on déduit de la masse et de la hauteur. Constant tant que rien ne sort. */
  function ledger(m, P) {
    P = P || BILLES;
    return { vues: m.vues, boite: (m.masse - P.boite) / P.bille, eau: (m.hauteur - P.h0) * P.section / P.volume,
      total: m.vues + (m.masse - P.boite) / P.bille + (m.hauteur - P.h0) * P.section / P.volume };
  }

  /* ---------- I.4.2 : machines qui soulèvent des poids ----------
     Une machine abaisse une masse m1 de h1 et soulève une masse m2. η = 1 : machine réversible. */
  function lift(m1, h1, m2, eta) {
    positive(m1, "m1"); nonneg(h1, "h1"); positive(m2, "m2");
    eta = eta == null ? 1 : eta; nonneg(eta, "η");
    return eta * m1 * h1 / m2;
  }
  /* Cycle de Feynman : la machine B (rendement η) abaisse m1 de h1 et monte m2 ; la machine réversible, à l'envers,
     redescend m2 et remonte m1. Bilan : m2 revient à sa place, m1 a gagné (η - 1) h1. Positif = mouvement perpétuel. */
  function cycle(m1, h1, m2, eta) {
    const y = lift(m1, h1, m2, eta), back = lift(m2, y, m1, 1);
    return { y, back, gain: back - h1, perpetuel: back - h1 > 1e-12 * h1 };
  }
  /* Machines simples, idéales : la force (en newtons) qui équilibre une charge de masse m, et le déplacement de l'effort
     pour une montée de la charge de 1 m. Le produit force × déplacement est toujours m g × 1 m. */
  const MACHINES = {
    levier: (m, r) => ({ force: m * G / r, course: r }),         // r = bras de l'effort / bras de la charge
    palan: (m, n) => ({ force: m * G / n, course: n }),          // n brins porteurs
    plan: (m, r) => ({ force: m * G / r, course: r }),           // r = longueur / hauteur du plan, r ≥ 1
  };
  function machine(kind, m, r) {
    if (!MACHINES[kind]) throw new Error("energie: machine inconnue " + kind);
    positive(m, "m"); positive(r, "rapport");
    if (kind !== "levier" && r < 1) throw new Error("energie: rapport ≥ 1 attendu pour " + kind);
    return MACHINES[kind](m, r);
  }
  /* Travaux virtuels : une barre porte des charges ; on donne pour chacune sa masse et sa montée quand l'effort descend
     de d. La masse W de l'effort est Σ m_i δ_i / d. */
  function virtualWork(loads, d) {
    positive(d, "d");
    if (!Array.isArray(loads) || !loads.length) throw new Error("energie: au moins une charge");
    return loads.reduce((s, l) => { finite(l.m, "m"); finite(l.dh, "δh"); return s + l.m * l.dh; }, 0) / d;
  }

  /* ---------- I.4.3 : la chute libre, bilan d'énergie ---------- */
  function fall(m, h0, t, g) {
    positive(m, "m"); nonneg(h0, "h0"); nonneg(t, "t"); g = g == null ? G : g;
    const tf = Math.sqrt(2 * h0 / g), s = Math.min(t, tf), h = h0 - g * s * s / 2, v = g * s;
    return { t: s, tf, h, v, ep: m * g * h, ec: m * v * v / 2, total: m * g * h0 };
  }
  const kmh = v => v * 3.6, ms = v => v / 3.6;

  /* ---------- I.4.4 : ordres de grandeur ----------
     Énergie libérée ou stockée par kilogramme (J/kg). Sources : tables usuelles (essence 46,4 MJ/kg, TNT 4,184 MJ/kg par
     convention, glucides 17 kJ/g et lipides 37 kJ/g du règlement européen d'étiquetage), 200 MeV par fission de U-235. */
  const FISSION = 200e6 * EV / (235.0439 * U);
  const SPECIFIQUE = {
    chute: G * 100,             // 1 kg d'eau qui descend de 100 m
    chauffe: 4184 * 10,         // 1 kg d'eau chauffé de 10 K
    batterie: 0.6e6,            // accumulateur lithium-ion, 0,4 à 0,9 MJ/kg
    tnt: 4.184e6,
    sucre: 17e6,
    graisse: 37e6,
    essence: 46.4e6,
    uranium: FISSION,
    masse: C * C,
  };
  function massFor(E, form) {
    nonneg(E, "E");
    if (!(form in SPECIFIQUE)) throw new Error("energie: forme inconnue " + form);
    return E / SPECIFIQUE[form];
  }
  const KWH = 3.6e6;

  const api = { G, C, EV, U, potential, kinetic, speedFromHeight, heightFromSpeed, spring, thermal, massEnergy,
    BILLES, measure, ledger, lift, cycle, MACHINES: Object.keys(MACHINES), machine, virtualWork, fall, kmh, ms,
    FISSION, SPECIFIQUE, massFor, KWH };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Energie = api;
})(typeof self !== "undefined" ? self : this);

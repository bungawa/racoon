/* Polymérisation des alcènes par coordination (X.chim_complexes.3). Pure, no DOM, UMD (global PolyCoord).
   Uses ChimOrga (chim-organique.js) for molar masses and drawings; the growth steps themselves are in chim-solutions.js
   (CYCLES.coordination, typed by ChimSolutions.etape).
     MONOMERES                  { id: { brute: { C, H }, R: mol spec of the substituent (null for ethene) } }: CH2=CHR.
     motif(id)                  repeat unit –CH2–CHR–: { brute, M (kg·mol⁻¹), texte "CH₂–CH(CH₃)" }; same atoms as the monomer.
     monomere(brute)            the id whose repeat unit has these atoms, or null: the way back from a polymer to its alkene.
     probabilite(r)             p = r/(1 + r), r = v_propagation/v_transfert: the chance that a growing chain adds one more unit.
     schulzFlory(p)             { Xn: 1/(1 − p), Xw: (1 + p)/(1 − p), D: 1 + p, nombre(n), masse(n) }: one site, p constant.
     chaine(n, mode, rng, q)    configurations ±1 of n stereocentres: "iso" all alike, "syndio" alternate, "ata" random
                                (q = chance that a centre repeats the previous one, 0,5 by default).
     meso(conf)                 fraction of meso diads (two neighbours alike).
     dessinChaine(conf, R)      ChimOrga mol spec of a zigzag backbone, substituent R on every second carbon, wedge (+1)
                                or hash (−1). */
(function (root) {
  const ChimOrga = typeof module !== "undefined" && module.exports ? require("../chim-organique.js") : root.ChimOrga;
  const MONOMERES = Object.freeze({
    ethene: Object.freeze({ brute: { C: 2, H: 4 }, R: null, texte: "H" }),
    propene: Object.freeze({ brute: { C: 3, H: 6 }, R: ["C"], texte: "CH₃" }),
    butene: Object.freeze({ brute: { C: 4, H: 8 }, R: ["C", "C"], texte: "C₂H₅" }),
    hexene: Object.freeze({ brute: { C: 6, H: 12 }, R: ["C", "C", "C", "C"], texte: "C₄H₉" }),
  });
  const monomereDe = id => { const m = MONOMERES[id]; if (!m) throw new Error("polymérisation : monomère inconnu « " + id + " »"); return m; };
  function motif(id) {
    const m = monomereDe(id), brute = Object.assign({}, m.brute);
    return { brute, M: ChimOrga.masseMolaire(brute), texte: m.R ? "CH₂–CH(" + m.texte + ")" : "CH₂–CH₂" };
  }
  function monomere(brute) {
    for (const id in MONOMERES) { const b = MONOMERES[id].brute; if (b.C === brute.C && b.H === brute.H && Object.keys(brute).length === 2) return id; }
    return null;
  }
  const probabilite = r => { if (!(r >= 0)) throw new Error("polymérisation : rapport des vitesses négatif"); return r / (1 + r); };
  function schulzFlory(p) {
    if (!(p >= 0 && p < 1)) throw new Error("polymérisation : p doit être dans [0, 1[");
    const q = 1 - p;
    return { p, Xn: 1 / q, Xw: (1 + p) / q, D: 1 + p,
      nombre: n => q * Math.pow(p, n - 1),                  // fraction of the chains made of n units
      masse: n => n * q * q * Math.pow(p, n - 1) };         // fraction of the mass in chains of n units
  }
  function chaine(n, mode, rng, q = 0.5) {
    const out = [1];
    for (let i = 1; i < n; i++) {
      if (mode === "iso") out.push(out[i - 1]);
      else if (mode === "syndio") out.push(-out[i - 1]);
      else if (mode === "ata") out.push(rng() < q ? out[i - 1] : -out[i - 1]);
      else throw new Error("polymérisation : tacticité « iso », « syndio » ou « ata »");
    }
    return out;
  }
  function meso(conf) {
    if (conf.length < 2) throw new Error("polymérisation : il faut deux centres pour une diade");
    let m = 0; for (let i = 1; i < conf.length; i++) if (conf[i] === conf[i - 1]) m++;
    return m / (conf.length - 1);
  }
  /* backbone C0…C(2n): zigzag, stereocentres at odd indices (top of the zigzag), substituent drawn upwards */
  function dessinChaine(conf, R) {
    const at = [], li = [], n = conf.length, h = 0.5, dx = 0.866;
    for (let i = 0; i <= 2 * n; i++) at.push("C " + (i * dx).toFixed(3) + " " + (i % 2 ? h : 0));
    for (let i = 0; i < 2 * n; i++) li.push(i + "-" + (i + 1));
    conf.forEach((c, k) => {
      const i = 2 * k + 1;
      let prev = i, y = h + 1, x = i * dx;
      R.forEach((e, j) => {
        const idx = at.length; at.push(e + " " + (x + (j % 2 ? dx : 0)).toFixed(3) + " " + (y + j * h).toFixed(3));
        li.push(prev + (j === 0 ? (c > 0 ? "w" : "h") : "-") + idx); prev = idx;
      });
    });
    return at.join("; ") + " | " + li.join(" ");
  }
  const api = Object.freeze({ MONOMERES, motif, monomere, probabilite, schulzFlory, chaine, meso, dessinChaine });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.PolyCoord = api;
})(typeof self !== "undefined" ? self : this);

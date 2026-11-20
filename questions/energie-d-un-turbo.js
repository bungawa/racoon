/* Calcul de l'article « D'où vient l'énergie d'un turbo ? ». Un cylindre (système fermé pendant le cycle) suit le cycle de
   Beau de Rochas à air standard ; le turbo (deux systèmes ouverts sur un même arbre) prend l'énergie des gaz d'échappement
   et la rend en comprimant l'air d'admission. Les travaux des systèmes ouverts viennent de « Isolé, fermé, ouvert :
   quel système choisir ? » (module Systemes). Air gaz parfait, γ et cp constants, combustion à volume constant (q par kg),
   balayage complet (aucun gaz résiduel), air refroidi à T1 après le compresseur. SI, par kilogramme d'air.

     otto(o)        o = { r (10), p1 (Pa, atm), T1 (300), q (1,8 × 10⁶ J·kg⁻¹), gamma (1,4), pa (atm) }.
                    { etats 1 à 4 { p, v, T }, et 5 : fin de la détente prolongée jusqu'à pa ; w (travail net du cycle fermé),
                      eta = 1 − r^(1−γ), queue : ce que le gaz donnerait encore en se détendant de 4 jusqu'à pa,
                      moins pa(v5 − v4) ; aire perdue quand la soupape s'ouvre au point mort bas, 0 si p4 ≤ pa }.
     moteur(o)      o = otto(o) plus { pi (pression d'admission / pa, 1), etaT (0,7), etaC (0,7) }.
                    Le gaz sort du cylindre vers un collecteur à pression constante pe : cp Te = cv T4 + pe v4 (bouffée,
                    puis poussée du piston à pe). La turbine le détend de pe à pa ; elle doit fournir le travail du
                    compresseur : etaT cp Te (1 − (pa/pe)^k) = cp T1 (pi^k − 1)/etaC, k = (γ − 1)/γ. Résolu en pe.
                    { pe, Te, wc (travail du compresseur), cycle (otto à p1 = pi·pa), wb (boucle de transvasement du
                      piston, (pi·pa − pe)(v1 − v2) : positive, le turbo pousse aussi le piston), w (cycle + boucle),
                      paye (ce que le piston paie en poussant à pe plutôt qu'à pa : (pe − pa)(v1 − v2)),
                      echappement (wc − paye : la part du travail du turbo prise aux gaz qui seraient sortis sans travailler),
                      masse (rapport des masses d'air par cycle à cylindrée égale : pi, l'air étant refroidi à T1),
                      puissance (rapport des travaux par cycle au moteur atmosphérique : pi · w / w0) }.
     mecanique(o)   le même gavage par un compresseur entraîné par le vilebrequin : { wc, w : cycle − wc, puissance }. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("../constantes.js") : root.Constantes, Sys = node ? require("./systemes-thermodynamiques.js") : root.Systemes;
  const R = Sys.R_AIR, PA = Cst.atm;
  const pos = (x, what) => { if (!(x > 0) || !isFinite(x)) throw new RangeError(what + " : > 0 attendu"); return x; };
  const eff = (x, what) => { if (!(x > 0 && x <= 1)) throw new RangeError(what + " : entre 0 et 1 attendu"); return x; };
  function base(o) {
    o = o || {};
    const r = o.r == null ? 10 : o.r; if (!(r > 1) || !isFinite(r)) throw new RangeError("r : > 1 attendu");
    const gamma = o.gamma == null ? 1.4 : o.gamma; Sys.cp(gamma);
    return { r, gamma, p1: pos(o.p1 == null ? PA : o.p1, "p1"), T1: pos(o.T1 == null ? 300 : o.T1, "T1"),
      q: pos(o.q == null ? 1.8e6 : o.q, "q"), pa: pos(o.pa == null ? PA : o.pa, "pa") };
  }

  function otto(o) {
    const { r, gamma, p1, T1, q, pa } = base(o), cv = Sys.cv(gamma);
    const s1 = { p: p1, v: R * T1 / p1, T: T1 }, v2 = s1.v / r, T2 = T1 * Math.pow(r, gamma - 1);
    const s2 = { p: R * T2 / v2, v: v2, T: T2 }, T3 = T2 + q / cv, s3 = { p: R * T3 / v2, v: v2, T: T3 };
    const T4 = T3 * Math.pow(r, 1 - gamma), s4 = { p: R * T4 / s1.v, v: s1.v, T: T4 };
    let s5 = s4, queue = 0;
    if (s4.p > pa) {
      const v5 = s4.v * Math.pow(s4.p / pa, 1 / gamma);
      s5 = { p: pa, v: v5, T: pa * v5 / R };
      queue = (s4.p * s4.v - pa * v5) / (gamma - 1) - pa * (v5 - s4.v);
    }
    const w = q - cv * (T4 - T1);
    return { etats: { 1: s1, 2: s2, 3: s3, 4: s4, 5: s5 }, w, eta: w / q, queue, q, r, gamma, pa };
  }

  function moteur(o) {
    o = o || {};
    const b = base(o), pi = o.pi == null ? 1 : o.pi, etaT = eff(o.etaT == null ? 0.7 : o.etaT, "etaT"), etaC = eff(o.etaC == null ? 0.7 : o.etaC, "etaC");
    if (!(pi >= 1) || !isFinite(pi)) throw new RangeError("pi : ≥ 1 attendu");
    const g = b.gamma, k = (g - 1) / g, cp = Sys.cp(g), cv = Sys.cv(g);
    const cycle = otto(Object.assign({}, b, { p1: pi * b.pa })), s4 = cycle.etats[4];
    const wc = Sys.adiabatique({ T1: b.T1, p1: b.pa, pi, gamma: g }).ouvert / etaC;
    const Te = pe => (cv * s4.T + pe * s4.v) / cp;
    const wt = pe => etaT * -Sys.adiabatique({ T1: Te(pe), p1: pe, pi: b.pa / pe, gamma: g }).ouvert;   // détente pe → pa
    let lo = b.pa, hi = b.pa;
    if (wc > 0) {
      while (wt(hi) < wc) { hi *= 2; if (hi > 1e3 * b.pa) throw new RangeError("turbo trop faible pour ce gavage"); }
      for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (wt(m) < wc) lo = m; else hi = m; }
    }
    const pe = (lo + hi) / 2, vd = cycle.etats[1].v - cycle.etats[2].v;
    const wb = (pi * b.pa - pe) * vd, paye = (pe - b.pa) * vd, w = cycle.w + wb, w0 = otto(b).w;
    return { pi, pe, Te: Te(pe), wc, cycle, wb, w, paye, echappement: wc - paye, masse: pi, puissance: pi * w / w0, etaT, etaC };
  }

  function mecanique(o) {
    o = o || {};
    const b = base(o), pi = o.pi == null ? 1 : o.pi, etaC = eff(o.etaC == null ? 0.7 : o.etaC, "etaC");
    const cycle = otto(Object.assign({}, b, { p1: pi * b.pa })), wc = Sys.adiabatique({ T1: b.T1, p1: b.pa, pi, gamma: b.gamma }).ouvert / etaC;
    const vd = cycle.etats[1].v - cycle.etats[2].v, w = cycle.w + (pi - 1) * b.pa * vd - wc;   // admission à pi·pa, échappement à pa
    return { wc, w, puissance: pi * w / otto(b).w };
  }

  const api = { PA, otto, moteur, mecanique };
  if (node) module.exports = api;
  else root.Turbo = api;
})(typeof self !== "undefined" ? self : this);

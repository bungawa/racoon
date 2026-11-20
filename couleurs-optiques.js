/* CouleursOptiques — la teinte d'une lumière dont on connaît le spectre, pour les leçons « Lames minces colorées et cristaux »
   (couleurFilm), « La diffusion de la lumière » (couleurSpectre) et « La biréfringence » (couleurLame). Pur, sans DOM, UMD
   (global CouleursOptiques). SI partout. Les fonctions colorimétriques CIE et sRGB sont celles d'optique-geometrique.js ; la lame
   mince et la lame biréfringente, celles d'optique-ondulatoire.js (film, entreCroises, dephasageLame). Tests :
   test/couleurs-optiques.test.js.

   Sommaire
     couleurSpectre(f, pas)     XYZ, sRGB linéaire, teinte (rgb 0–255) et saturation d'une puissance spectrale f(λ), 380 à 780 nm.
     couleurFilm(o)             la même pour la lumière qu'une lame mince réfléchit (OptOnd.film), pas assez fin pour ses franges.
     couleurLame(Δn, e, o)      la même pour une lame biréfringente entre polariseurs (o.alpha, o.analyseur), en lumière blanche. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const OG = node ? require("./optique-geometrique.js") : root.OptiqueGeometrique;
  const OO = node ? require("./optique-ondulatoire.js") : root.OptOnd;
  const err = m => { throw new Error("CouleursOptiques : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));

  /* couleurSpectre(f, pas): the colour of a spectral power f(λ) (λ in m), sampled every pas (5 nm by default) from 380 to
     780 nm under an equal-energy white (illuminant E). xyz normalised so that f = 1 gives Y = 1 (Y: the luminance factor);
     then von Kries scaling of E onto the D65 white (X × 0,950 47, Z × 1,088 83) and sRGB. lin: linear sRGB, unbounded.
     rgb: integers 0–255, negative parts set to 0 and scaled so that the largest is 1: the hue at full brightness, as seen
     against a dark background. saturation: 1 − the smallest/largest linear component (0: white). Model: the CIE 1931 observer
     of optique-geometrique.js; a sum on a grid, so pas must follow the fastest wiggle of f (8 samples per period at least). */
  function couleurSpectre(f, pas) {
    if (typeof f !== "function") err("f doit être une fonction de λ");
    const h = pas === undefined ? 5e-9 : pos(pas, "pas"), N = Math.round(400e-9 / h);
    const L = Array.from({ length: N + 1 }, (_, k) => 380e-9 + 400e-9 * k / N), cm = L.map(OG.cmf);
    const sy = cm.reduce((s, c) => s + c[1], 0), F = L.map(f);
    const xyz = [0, 1, 2].map(i => F.reduce((s, v, k) => s + v * cm[k][i], 0) / sy);
    const lin = OG.versSRGB([xyz[0] * 0.95047, xyz[1], xyz[2] * 1.08883]);
    const p0 = lin.map(v => Math.max(0, v)), M = Math.max(...p0);
    return { xyz, Y: xyz[1], lin, rgb: M > 0 ? p0.map(v => Math.round(255 * OG.gammaSRGB(v / M))) : [0, 0, 0],
      saturation: M > 0 ? 1 - Math.min(...p0) / M : 0 };
  }
  /* couleurFilm(o): the colour of the light a thin film reflects (o as OptOnd.film, without lambda). Its spectrum oscillates
     with period λ²/(2 n e cos θ1) in λ: at least 8 samples per period, 5 nm at most, 40 000 samples at most. Same model as
     film (flat faces, no absorption, n independent of λ) and as couleurSpectre. */
  function couleurFilm(o) {
    const dif = OO.film(Object.assign({}, o, { lambda: 550e-9 })).difference;
    const pas = Math.max(400e-9 / 40000, Math.min(5e-9, (380e-9) ** 2 / (8 * Math.max(dif, 1e-12))));
    return couleurSpectre(l => OO.film(Object.assign({}, o, { lambda: l })).R, pas);
  }
  /* couleurLame(dn, e, o): colour of a plate (dn, e) between two polarisers in white light, axis at o.alpha from the
     polariser (default π/4), analyser o.analyseur "croises" (default) or "parallele". dn constant over the spectrum: the
     spectrum T(λ) = sin²2α sin²(π dn e/λ) (OptOnd.entreCroises) has period ≈ λ²/(dn e) in λ, sampled 8 times at least.
     Model: ideal polarisers, normal incidence, dn taken the same at every λ (its dispersion is left out). */
  function couleurLame(dn, e, o) {
    const a = o && o.alpha !== undefined ? fini(o.alpha, "α") : Math.PI / 4, par = o && o.analyseur === "parallele";
    if (o && o.analyseur !== undefined && o.analyseur !== "croises" && !par) err("analyseur : croises ou parallele");
    const G = Math.abs(fini(dn, "Δn")) * Math.max(0, fini(e, "e"));
    const T = l => { const c = OO.entreCroises(a, OO.dephasageLame(dn, e, l)); return par ? c.parallele : c.croises; };
    return couleurSpectre(T, Math.min(5e-9, (380e-9) ** 2 / (8 * Math.max(G, 1e-12))));
  }

  const api = { couleurSpectre, couleurFilm, couleurLame };
  if (node) module.exports = api;
  else root.CouleursOptiques = api;
})(typeof self !== "undefined" ? self : this);

/* Calcul de la leçon « Les temps longs » (Feynman I, §5-4) : décroissance radioactive et datation.
   Durées dans l'unité de la demi-vie fournie (an, s…) : le calcul est le même. Pur, sans DOM. */
(function (root) {
  const YEAR = 365.25 * 86400;        // année julienne, s

  /* Demi-vies, en années, et ce qui se mesure.
     fraction : N/N0, le père restant (le stock initial est connu, ex. carbone 14 de l'atmosphère) ;
     ratio : D/P, le fils radiogénique sur le père restant (aucun fils au départ, ex. plomb dans un zircon). */
  const ISOTOPES = {
    c14: { half: 5700, mode: "fraction" },
    u238: { half: 4.468e9, mode: "ratio" },
    u235: { half: 7.04e8, mode: "ratio" },
  };

  const check = T => { if (!(T > 0)) throw new RangeError("demi-vie > 0 attendue"); };

  /* fraction restante après t : N/N0 = 2^(-t/T) */
  function remaining(t, T) { check(T); return Math.pow(2, -t / T); }

  /* constante radioactive λ = ln 2 / T et vie moyenne τ = T / ln 2 */
  const lambda = T => { check(T); return Math.LN2 / T; };
  const meanLife = T => { check(T); return T / Math.LN2; };

  /* âge à partir de la fraction restante : t = T log2(N0/N) */
  function ageFromFraction(f, T) {
    check(T);
    if (!(f > 0 && f <= 1)) throw new RangeError("fraction dans ]0, 1] attendue");
    return -T * Math.log2(f);
  }

  /* âge à partir du rapport fils/père : D/P = 2^(t/T) - 1, donc t = T log2(1 + D/P) */
  function ageFromRatio(r, T) {
    check(T);
    if (!(r >= 0)) throw new RangeError("rapport ≥ 0 attendu");
    return T * Math.log2(1 + r);
  }

  /* rapport fils/père attendu après t (inverse du précédent) */
  function ratioAfter(t, T) { check(T); return Math.pow(2, t / T) - 1; }

  /* incertitude absolue sur l'âge pour une incertitude relative e sur la grandeur mesurée (au premier ordre) :
     fraction : δt = τ e ; rapport : δt = τ e r/(1 + r) */
  function ageUncertainty(mode, x, T, e) {
    const tau = meanLife(T);
    if (mode === "fraction") return tau * e;
    if (mode === "ratio") return tau * e * x / (1 + x);
    throw new RangeError("mode inconnu : " + mode);
  }

  /* âge selon l'isotope : x est la fraction (c14) ou le rapport (u238, u235) */
  function age(id, x) {
    const iso = ISOTOPES[id];
    if (!iso) throw new RangeError("isotope inconnu : " + id);
    return iso.mode === "fraction" ? ageFromFraction(x, iso.half) : ageFromRatio(x, iso.half);
  }

  const api = { YEAR, ISOTOPES, remaining, lambda, meanLife, ageFromFraction, ageFromRatio, ratioAfter, ageUncertainty, age };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TempsLongs = api;
})(typeof self !== "undefined" ? self : this);

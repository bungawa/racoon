/* Synthèse au laboratoire et rendement (leçon de programme X.chim_orga_meca.4). Pur, sans DOM, UMD (global Synthese).
   Unités SI : masses en kg, volumes en m³, masses volumiques en kg·m⁻³, masses molaires en kg·mol⁻¹, quantités en mol.
   Dans une page, charger /constantes.js et /chim-architecture.js d'abord (bornes : avancement maximal et réactif limitant).
     quantiteSolide(m, M), quantiteLiquide(V, rho, M)   n = m/M ; n = ρV/M.
     bilan(reactifs, nuProduit, Mproduit, mObtenue)     réactifs [{ n, nu }] (nu < 0) : ξ_max, réactifs limitants (indices),
                                                        n_max = ν ξ_max, m_max, rendement η = m obtenue / m_max.
     rendementGlobal(etapes)                            Π ηᵢ : pertes successives qui se multiplient.
     rf(distance, front)                                rapport frontal d'une chromatographie sur couche mince, 0 ≤ Rf ≤ 1.
   Les erreurs lèvent un message en français. */
(function (root) {
  const err = m => { throw new Error("synthese : " + m); };
  const CA = () => root.ChimArchi || (typeof require === "function" ? require("../chim-architecture.js") : err("chim-architecture.js manquant"));
  const pos = (x, nom) => { if (!(x > 0) || !Number.isFinite(x)) err(nom + " > 0 attendu"); return x; };
  const quantiteSolide = (m, M) => pos(m, "m") / pos(M, "M");
  const quantiteLiquide = (V, rho, M) => pos(V, "V") * pos(rho, "ρ") / pos(M, "M");
  /* Exacte : définitions (ξ_max, m_max) ; le rendement compare la masse pesée à celle d'une transformation totale. Il dépasse 1
     quand le solide pesé n'est pas le produit pur : humide, mêlé de réactif ou de sous-produit. */
  function bilan(reactifs, nuProduit, Mproduit, mObtenue) {
    if (!Array.isArray(reactifs) || !reactifs.length) err("au moins un réactif");
    reactifs.forEach((r, i) => { if (!(r.nu < 0)) err("réactif " + i + " : nu < 0 attendu"); if (!(r.n >= 0)) err("réactif " + i + " : n ≥ 0 attendu"); });
    pos(nuProduit, "ν du produit"); pos(Mproduit, "M du produit");
    if (!(mObtenue >= 0)) err("masse obtenue ≥ 0 attendue");
    const esp = reactifs.map((r, i) => ({ id: "r" + i, nu: r.nu, etat: "aq" })).concat([{ id: "p", nu: nuProduit, etat: "aq" }]);
    const b = CA().bornes(esp, reactifs.map(r => r.n).concat([0]));
    const nMax = nuProduit * b.xiMax, mMax = nMax * Mproduit;
    return { xiMax: b.xiMax, limitants: b.limitants, nMax, mMax, rendement: mMax > 0 ? mObtenue / mMax : NaN };
  }
  /* Exacte si chaque ηᵢ est le rapport de ce qui sort d'une opération à ce qui y entre. */
  function rendementGlobal(etapes) {
    if (!Array.isArray(etapes) || !etapes.length) err("au moins une étape");
    return etapes.reduce((p, e) => { if (!(e >= 0 && e <= 1)) err("rendement d'étape entre 0 et 1 attendu : " + e); return p * e; }, 1);
  }
  /* Exacte : une définition. Rf dépend de l'éluant, de la plaque, de la température et de la saturation de la cuve. */
  function rf(d, front) {
    pos(front, "distance du front");
    if (!(d >= 0) || d > front) err("la tache doit être entre la ligne de dépôt et le front");
    return d / front;
  }
  const api = { quantiteSolide, quantiteLiquide, bilan, rendementGlobal, rf };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Synthese = api;
})(typeof self !== "undefined" ? self : this);

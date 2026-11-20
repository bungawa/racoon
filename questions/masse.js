/* Calcul de l'article « C'est quoi la masse d'un objet ? » : balance, poussée, chute, équivalence masse-énergie, balance de Kibble.
   SI : masses en kg, forces en N, accélérations en m·s⁻², énergies en J. Pur, sans DOM. */
(function (root) {
  const Cst = typeof module !== "undefined" && module.exports ? require("../constantes.js") : root.Constantes;
  const G0 = Cst.g0, C = Cst.c, H = Cst.h;
  const EV = Cst.e;                         // électronvolt, J
  const LIEUX = { terre: G0, mars: 3.69, lune: 1.62 };   // pesanteur à la surface, m·s⁻² (NASA, fiches planétaires)

  const pos = (x, name) => { if (!(x > 0)) throw new RangeError(name + " > 0 attendu"); return x; };

  /* force qu'exerce un objet posé sur le plateau : son poids */
  const poids = (m, g) => pos(m, "masse") * pos(g, "pesanteur");
  /* une balance de cuisine mesure une force et la divise par g0 : elle affiche m g / g0 */
  const lecture = (m, g) => poids(m, g) / G0;
  /* même poussée, n'importe où : a = F/m */
  const acceleration = (F, m) => F / pos(m, "masse");
  /* chemin parcouru depuis le repos sous accélération constante */
  const chemin = (a, t) => a * t * t / 2;
  /* chute libre si la masse inerte mi et la masse grave mg différaient : a = g mg / mi */
  const chute = (g, mg, mi) => g * pos(mg, "masse grave") / pos(mi, "masse inerte");
  /* paramètre d'Eötvös : écart relatif des accélérations de deux corps en chute */
  const eta = (a1, a2) => 2 * (a1 - a2) / (a1 + a2);
  /* équivalence masse-énergie, objet au repos : E = m c² */
  const energie = m => m * C * C;
  const masse = E => E / (C * C);
  /* balance de Kibble : pesée (m g = B L I) puis déplacement (U = B L v) ⇒ m = U I / (g v) */
  const kibble = (U, I, g, v) => U * I / (pos(g, "pesanteur") * pos(v, "vitesse"));
  /* part de la masse du proton (uud) dans la somme des masses des trois quarks, masses en MeV/c² */
  const partQuarks = (mu, md, mp) => (2 * mu + md) / pos(mp, "masse du proton");

  const api = { G0, C, H, EV, LIEUX, poids, lecture, acceleration, chemin, chute, eta, energie, masse, kibble, partQuarks };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Masse = api;
})(typeof self !== "undefined" ? self : this);

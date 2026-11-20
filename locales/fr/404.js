/* Page introuvable (404.html) : servie pour toute adresse sans fichier — textes en français.
   Une autre langue = locales/<langue>/404.js, mêmes clés. */
(function (root) {
  const T = {
    "h1": "Page introuvable",
    "lede": "Cette adresse ne mène à aucune page du cours. Elle a peut-être changé : repartez du parcours ou de l'Atlas.",
    "atlas": "L'Atlas",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

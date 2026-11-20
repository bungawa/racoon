/* Liste des articles « C'est quoi… ? » — textes en français. */
(function (root) {
  const T = {
    "crumb.questions": "Questions",
    "h1": "C'est quoi… ?",
    "lede": "De petits articles qui partent d'une chose du quotidien et la relient à la théorie. Chacun renvoie aux notions de la carte qui l'expliquent.",
    "erreur": "Liste des articles illisible pour cette visite.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

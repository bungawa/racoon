/* Programmes officiels (programmes.html) : la liste rapide des programmes de CPGE en vigueur — textes en français. */
(function (root) {
  const pl = (n, un, des) => n + "\u00a0" + (n > 1 ? des : un);
  const T = {
    "h1": "Programmes officiels",
    "crumb.atlas": "Atlas",
    "crumb.programmes": "Programmes",
    "lede": "Les programmes en vigueur des classes préparatoires aux grandes écoles (CPGE), filière par filière et année par année. Chacun ouvre l'Atlas sur ses notions ; une première année l'ouvre aussi avec chaque seconde année qui la suit.",
    "head.atlas": "Atlas des notions",
    "annee.1": "Première année",
    "annee.2": "Seconde année",
    "atlas.seul": "{sigle} sur l'Atlas",
    "atlas.deux": "{sigle}, les deux années",
    "texte": "Texte officiel\u00a0:",
    "notions": v => pl(v.n, "notion", "notions"),
    "parties": v => pl(v.n, "partie", "parties") + " et leurs notions",
    "lacunes": v => v.n > 1 ? v.n + "\u00a0contenus sans notion sur l'Atlas" : "1\u00a0contenu sans notion sur l'Atlas",
    "vide": "Aucun programme n'est encore relevé.",
    "foot": "Sources : les textes officiels des programmes, cités filière par filière. Le contenu est rangé ici dans les notions de l'Atlas ; un contenu qui n'a pas encore de notion est compté à part.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

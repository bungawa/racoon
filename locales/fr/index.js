/* Parcours (index.html, la page d'accueil) : la carte des mondes et de leurs étapes — textes en français.
   Titres des mondes et des étapes, états : locales/<langue>/parcours.js. Une autre langue = locales/<langue>/index.js, mêmes clés. */
(function (root) {
  const T = {
    "page.title": "Parcours",
    "h1": "Le parcours",
    "lede": "Le cours se lit comme une carte de jeu. Chaque monde est fait d'étapes ; une étape, c'est quelques leçons à comprendre ensemble, puis une épreuve. Réussie à 80 %, l'étape est acquise : le gros bouton bleu mène à la suivante. Une étape grisée attend ses prérequis, mais s'ouvre quand même.",
    "head.atlas": "Atlas des notions",
    "head.questions": "C'est quoi… ? Les articles",
    "head.programmes": "Programmes officiels",
    "head.progression": "Ma progression",
    "bilan.k": "Étapes acquises",
    "bilan.v": "{n} / {total}",
    "bilan.f": "Hors bonus. {lecons} leçons sur la carte.",
    "ici.k": "Étape en cours",
    "ici.fin": "Tout est acquis",
    "monde.rang": "Monde {n}",
    "monde.bonus": "Bonus",
    "monde.bilan": "{n} / {total} étapes acquises",
    "chemin.aria": "Étapes du monde « {monde} », dans l'ordre",
    "etape.aria": "Étape {n} : {titre}, {etat}",
    "etape.aria.ici": "Étape {n} : {titre}, {etat}. Étape en cours",
    "load.parcours": "Carte du parcours illisible. Rechargez la page dans un instant.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

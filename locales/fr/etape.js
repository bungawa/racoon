/* Une étape du parcours (etape.html?id=<étape>) : prérequis, leçons, épreuve — textes en français.
   Titres et objectifs : locales/<langue>/parcours.js ; questions d'une épreuve : locales/<langue>/epreuves/<étape>.js. */
(function (root) {
  const T = {
    "page.title": "Étape",
    "ici": "Étape en cours",
    "bonus": "Bonus",
    "bonus.p": "Étape bonus : elle ne bloque aucune autre étape.",
    "prereq.sec": "Prérequis",
    "prereq.aucun": "Aucun prérequis : un point de départ.",
    "prereq.manque": "Prérequis manquants",
    "prereq.manque.p": "Les étapes en pointillés ne sont pas encore acquises. Vous pouvez suivre celle-ci quand même ; leurs leçons vous aideront.",
    "lecons.sec": "Leçons, dans l'ordre",
    "lecons.aucune": "Les leçons de cette étape sont à venir.",
    "lecon.a-venir": "à venir",
    "lecon.sans-titre": "Leçon en préparation",
    "epreuve.sec": "Épreuve",
    "epreuve.h2": "Valider l'étape",
    "epreuve.consigne": "{total} questions qui mêlent les leçons de l'étape. Répondez à toutes, puis validez : l'étape est acquise à partir de {seuil} / {total}, soit 80 %.",
    "epreuve.preparation": "Épreuve en préparation. Les leçons sont déjà là ; l'épreuve suivra.",
    "epreuve.a-venir": "Pas d'épreuve tant que les leçons sont à venir.",
    "deja": "Déjà acquise, meilleur score {score} / {total} : vous pouvez la repasser.",
    "resultat.ok.b": "Étape acquise",
    "resultat.ok.p": "{score} / {total}. On passe à la suite.",
    "resultat.ko.b": "Pas encore",
    "resultat.ko.p": "{score} / {total} : il en faut {seuil}. Relisez les explications et les leçons, puis recommencez.",
    "resultat.suivante": "Étape suivante : {titre}",
    "resultat.fin": "Toutes les étapes ouvertes sont acquises.",
    "resultat.parcours": "Retour au parcours",
    "save.done": "Enregistré dans ce navigateur : l'étape est acquise.",
    "save.memoire": "Étape acquise pour cette visite : ce navigateur refuse de garder des données, elle sera perdue en fermant la page.",
    "save.fail": "Épreuve réussie, mais ce navigateur n'a pas pu l'enregistrer.",
    "load.parcours": "Carte du parcours illisible. Rechargez la page dans un instant.",
    "introuvable.h1": "Étape introuvable",
    "introuvable.lede": "Aucune étape du parcours ne porte ce nom.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

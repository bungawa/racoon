/* Shared strings (quiz, timeline), French. Another language = locales/<lang>/kit.js with the same keys. */
(function (root) {
  const T = {
    "quiz.hint": "Indice",
    "quiz.again": "Recommencer, ordre mélangé",
    "quiz.right": ["Exactement.", "Bien vu.", "Juste.", "Correct."],
    "quiz.wrong": ["Pas tout à fait.", "Presque, mais non.", "Réfléchissez encore.", "Non, regardez de plus près."],
    "quiz.score": v => v.score + " / " + v.total + (v.score === v.total ? ". Sans faute." : v.score >= v.total * 0.7 ? ". Solide. Relisez les erreurs." : ". Relisez la section, puis recommencez."),
    "timeline.bce": "{y} av. J.-C.",
    "sigles.note": "Sigles :",
    "nav.label": "Leçons voisines",
    "nav.prev": "← {titre}",
    "nav.next": "{titre} →",
    "nav.etape": "Étape : {titre}",
    "crumb.parcours": "Parcours",
    "quiz.submit": "Valider l'épreuve",
    "quiz.answered": "{n} / {total} réponses",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

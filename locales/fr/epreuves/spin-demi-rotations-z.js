/* Épreuve de l'étape « Spin 1/2 : rotations autour de z » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      deux: { prompt: "Les états (+S + \u2212S)/√2 et (+S \u2212 \u2212S)/√2 sont analysés par un appareil S. Puis par un appareil T tourné de 90° autour de y. Que voit-on ?",
        options: { a: "Moitié-moitié pour les deux dans S ; dans T, l'un passe tout par +T, l'autre tout par \u2212T.", b: "Les mêmes résultats dans S et dans T.", c: "Des résultats différents dans S, identiques dans T.", d: "Rien ne passe dans T." },
        why: "Les modules sont les mêmes, la phase relative diffère. Elle ne compte pas pour S, elle décide de tout pour T. Leçon « La transformation des amplitudes »." },
      phase: { prompt: "On multiplie par e^(iδ) les deux amplitudes d'un état de spin 1/2. Combien de nombres réels décrivent réellement cet état ?",
        options: { a: "Quatre : deux modules et deux phases.", b: "Trois.", c: "Deux : le partage θ entre + et \u2212, et la phase relative η ; c'est une direction de l'espace.", d: "Un seul." },
        why: "Quatre réels, moins la normalisation, moins la phase commune qui ne change rien : deux. Leçon « La transformation des amplitudes »." },
      compose: { prompt: "Deux physiciens écrivent chacun une matrice de rotation avec une phase arbitraire, 40° et \u221270°. Le produit de leurs matrices diffère de la matrice directe de la rotation composée par…",
        options: { a: "rien.", b: "une phase commune de \u221230°, qui ne change aucune probabilité mais casse la cohérence des matrices.", c: "une phase de 110°.", d: "un facteur 2." },
        why: "(6.12) : la phase parasite est la somme des phases choisies, 40 \u2212 70 = \u221230°. Leçon « La transformation vers un repère tourné »." },
      det: { prompt: "Après avoir divisé chaque matrice par la racine de son déterminant, quel arbitraire reste-t-il dans la matrice d'une rotation de spin 1/2 ?",
        options: { a: "Aucun.", b: "Une phase quelconque.", c: "Un facteur réel.", d: "Un signe : R et \u2212R ont le même déterminant, 1." },
        why: "det(\u2212R) = det R pour une matrice 2 × 2 : la forme standard (6.15) est définie au signe près. Leçon « La transformation vers un repère tourné »." },
      z90: { prompt: "Une particule a C₊ = 0,6 et C₋ = 0,8. On la décrit dans la base d'un appareil tourné de 90° autour de z. Que valent C′₊ et C′₋ ?",
        options: { a: "0,6 e^(iπ/4) et 0,8 e^(\u2212iπ/4) : seules les phases changent.", b: "0,8 et 0,6.", c: "0,6 i et \u22120,8 i.", d: "0,6 et 0,8, inchangés." },
        hint: "(6.19) avec φ = 90°.",
        why: "C′± = e^(±iφ/2) C± avec φ/2 = 45°. Les probabilités 0,36 et 0,64 ne changent pas. Leçon « Les rotations autour de l'axe z »." },
      tour: { prompt: "Pourquoi m = 1/2 dans C′₊ = e^(imφ) C₊, pour un spin 1/2 ?",
        options: { a: "Parce que l'expérience de Stern et Gerlach donne deux jets.", b: "Parce que le déterminant doit valoir 1.", c: "Parce que seule cette valeur fait du tour complet, et non du demi-tour, la première rotation qui ne change rien de physique.", d: "Par convention." },
        why: "Avec m = 1, 180° donnerait une phase commune \u22121 : le demi-tour ne changerait rien, ce qui est faux pour un spin le long de x. m = 1/2 donne \u22121 à 360°. Leçon « Les rotations autour de l'axe z »." },
      interfero: { prompt: "Dans un interféromètre à neutrons, une voie fait tourner le spin de 360° autour de z. Que compte le détecteur, par rapport à la situation sans rotation ?",
        options: { a: "La même chose.", b: "La moitié.", c: "Le double.", d: "Rien : la voie tournée a changé de signe et les deux voies se détruisent." },
        why: "|1 + e^(iπ)|²/4 = 0. Il faut 720° pour revenir au maximum. Leçon « Les rotations autour de l'axe z »." },
      mesure: { prompt: "Rauch et al. (1975) mesurent 704 ± 38° pour la période de l'interférence. Que conclure ?",
        options: { a: "La prédiction de 720° est exclue.", b: "720° est compatible, à 0,4 écart type ; 360° est exclu, à environ 9 écarts types.", c: "Rien, l'incertitude est trop grande.", d: "Le spin du neutron vaut 1." },
        why: "|720 \u2212 704|/38 ≈ 0,4 et |704 \u2212 360|/38 ≈ 9. Leçon « Les rotations autour de l'axe z »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

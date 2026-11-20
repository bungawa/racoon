/* Épreuve de l'étape « Symétries et lois de conservation » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      entrainer: { prompt: "Dans une voiture qui roule à 20\u00a0m·s⁻¹, vitres fermées, on lâche une plume. Elle tombe comme dans une voiture à l'arrêt. Vitres ouvertes, non. La symétrie par vitesse uniforme est-elle en défaut ?",
        options: { a: "Oui : la plume révèle la vitesse de la voiture, la loi dépend du référentiel.", b: "Oui, mais seulement pour les objets légers.", c: "Non : vitres ouvertes, l'air extérieur fait partie de l'expérience et n'avance pas avec elle ; vitres fermées, il est entraîné.", d: "Non, car la plume tombe toujours verticalement." },
        hint: "Le frottement dépend de la vitesse de la plume par rapport à quoi ?",
        why: "Le frottement dépend de la vitesse relative à l'air. Une symétrie se teste en entraînant tout ce qui agit : l'air de l'habitacle avance avec la voiture, celui de la route non. Leçon « Opérations de symétrie »." },
      echelle: { prompt: "Une maquette de pont en béton de 1\u00a0m de haut subit au pied une contrainte de 25\u00a0kPa sous son poids. Le vrai pont, de même forme et de même béton, est 50 fois plus grand. Quelle contrainte au pied ?",
        options: { a: "25\u00a0kPa : même forme, même contrainte.", b: "1,25\u00a0MPa : la contrainte croît comme les longueurs.", c: "62,5\u00a0MPa : comme le carré des longueurs.", d: "3,1\u00a0GPa : comme le poids, le cube des longueurs." },
        why: "Le poids est multiplié par 50³, la section par 50² : la contrainte par 50. 25\u00a0kPa × 50 = 1,25\u00a0MPa. Le changement d'échelle n'est pas une symétrie. Leçon « Symétrie dans l'espace et dans le temps »." },
      foucault: { prompt: "Au pôle Nord, le plan d'un pendule de Foucault tourne d'un tour en un jour sidéral. À 30° de latitude, en combien de temps ?",
        options: { a: "Un demi-jour sidéral.", b: "Un jour sidéral : la Terre tourne à la même vitesse partout.", c: "Il ne tourne pas, comme à l'équateur.", d: "Deux jours sidéraux, car sin 30° = 1/2." },
        why: "ω = Ω sin λ : à 30°, la moitié de Ω, donc deux fois plus de temps. Une rotation se détecte de l'intérieur ; la vitesse uniforme, non. Leçon « Symétrie dans l'espace et dans le temps »." },
      rainure: { prompt: "Un palet glisse sans frottement sur une table inclinée selon x, horizontale selon y. Quelle grandeur se conserve ?",
        options: { a: "La composante py de la quantité de mouvement : rien ne change si l'on déplace le palet selon y.", b: "La composante px.", c: "Le moment cinétique par rapport au centre de la table.", d: "Aucune, pas même l'énergie." },
        why: "L'énergie potentielle dépend de x, pas de y : la translation selon y est une symétrie, py se conserve. Rien ne dépend de la date : l'énergie mécanique aussi. Leçon « Symétrie et lois de conservation »." },
      energie: { prompt: "Une balançoire est poussée par un enfant qui plie et tend les jambes au bon rythme. Pourquoi son énergie mécanique peut-elle croître sans qu'aucune loi soit violée ?",
        options: { a: "Parce que la pesanteur augmente pendant le mouvement.", b: "Parce que la quantité de mouvement se conserve.", c: "Parce que le système pendule, vu seul, a un paramètre qui dépend de la date : la translation dans le temps n'est plus une symétrie, et l'énergie de l'enfant est fournie au pendule.", d: "Parce qu'une balançoire n'a pas d'énergie potentielle." },
        why: "La longueur du pendule change avec le temps : la loi du pendule seul n'est pas invariante par décalage dans le temps, son énergie n'est pas conservée. L'énergie totale, muscles compris, l'est. Comme le ressort dont la raideur bat, dans « Symétrie et lois de conservation »." },
      alanine: { prompt: "On remplace l'alanine (H, CH₃, NH₂, CO₂H autour d'un carbone) par la glycine (H, H, NH₂, CO₂H). Que devient la relation entre la molécule et son image ?",
        options: { a: "Elles restent distinctes : tout carbone tétraédrique est chiral.", b: "L'image est la même molécule tournée de 90°.", c: "Elles diffèrent par leur masse.", d: "Elles deviennent superposables : échanger les deux H est une symétrie de la molécule, qui compense le miroir." },
        why: "Le miroir permute les sommets de façon impaire, une rotation de façon paire. Avec deux groupes identiques, la transposition de ces deux-là ne change rien : l'image se superpose. Leçon « Réflexion dans un miroir »." },
      toupie: { prompt: "Une toupie tourne autour d'un axe horizontal, perpendiculaire à un miroir vertical placé devant elle. Son moment cinétique pointe vers le miroir. Où pointe celui de l'image ?",
        options: { a: "Dans la même direction que celui de la toupie, donc en s'éloignant du miroir : la composante d'un vecteur axial perpendiculaire au miroir ne change pas.", b: "Vers le miroir, comme l'image d'une flèche.", c: "Parallèlement au miroir.", d: "Il est nul dans l'image." },
        hint: "Regardées toutes deux dans la direction de l'axe, la toupie et son image tournent-elles dans le même sens ?",
        why: "Les points de la toupie se déplacent parallèlement au miroir : leurs images ont les mêmes vitesses. Vue dans la même direction, l'image tourne dans le même sens, et son moment cinétique a la même direction que l'original. L'image d'une flèche polaire, elle, pointerait vers le miroir. Leçon « Vecteurs polaires et vecteurs axiaux »." },
      lorentz: { prompt: "Un électron à 10⁶\u00a0m·s⁻¹ traverse perpendiculairement un champ de 0,5\u00a0T. Quelle force subit-il, et que doit être B pour que cette loi soit la même dans un miroir ?",
        options: { a: "8\u00a0×\u00a010⁻¹⁴\u00a0N ; B doit être polaire, comme v.", b: "8\u00a0×\u00a010⁻¹⁴\u00a0N ; B doit être axial, car polaire × axial donne un vecteur polaire, comme une force.", c: "1,6\u00a0×\u00a010⁻¹³\u00a0N ; B peut être l'un ou l'autre.", d: "Zéro : un champ magnétique ne travaille pas." },
        why: "|F| = |q| v B = 1,6 × 10⁻¹⁹ × 10⁶ × 0,5 = 8 × 10⁻¹⁴\u00a0N. La force est polaire, v aussi : il faut B axial pour que v × B soit polaire. Le champ magnétique ne travaille pas, mais il dévie : la force n'est pas nulle. Leçon « Vecteurs polaires et vecteurs axiaux »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

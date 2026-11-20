/* Épreuve de l'étape « Les distances » : textes en français. Une autre langue = locales/<langue>/epreuves/les-distances.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/les-distances.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      lune: { prompt: "Un écho laser revient de la Lune après Δt ≈ 2,56\u00a0s ; la distance vaut cΔt/2. Une erreur de 1\u00a0ps sur la datation de l'écho fait sur la distance une erreur de…",
        options: { a: "0,3\u00a0mm.", b: "0,15\u00a0mm.", c: "0,3\u00a0m.", d: "1,5\u00a0mm." },
        hint: "La lumière parcourt 0,3\u00a0mm en 1\u00a0ps.",
        why: "δd = c δt/2 = 3,0\u00a0×\u00a010⁸ × 10⁻¹²/2 = 1,5\u00a0×\u00a010⁻⁴\u00a0m : l'aller-retour divise par deux. D'où une datation à quelques picosecondes pour gagner le millimètre. Temps de vol de la leçon « Les grandes distances », c exacte comme dans « Les temps courts »." },
      corrections: { prompt: "Pour viser une précision millimétrique sur la distance Terre–Lune par d = cΔt/2, que faut-il décrire et corriger ?",
        options: { a: "Rien : c est exacte par définition depuis 1983, donc la formule l'est aussi.", b: "Seulement la courbure de la Terre.", c: "La vitesse de la Terre autour du Soleil, qui change c de 10⁻⁴.", d: "Le retard dans l'atmosphère, équivalent à 2\u00a0m de trajet, et le déplacement de la Lune pendant les 2,56\u00a0s, 2,6\u00a0km : chacun dépasse le millimètre de plusieurs ordres de grandeur." },
        hint: "La formule suppose une lumière en ligne droite dans le vide, et une cible immobile.",
        why: "c est exacte dans le vide, mais la formule suppose aussi un trajet dans le vide et une cible immobile. L'air ajoute l'équivalent de 2\u00a0m ; la Lune parcourt 2,6\u00a0km pendant l'aller-retour. Sans ces corrections, pas de millimètre. Note de validité du temps de vol, leçon « Les grandes distances »." },
      parallaxe: { prompt: "Un satellite mesure les parallaxes avec une incertitude Δp fixée. Pour une étoile proche, Δd/d = 1\u00a0%. Que vaut Δd/d pour une étoile 20 fois plus lointaine ?",
        options: { a: "20\u00a0%.", b: "1\u00a0%.", c: "4,5\u00a0%.", d: "400\u00a0%." },
        hint: "p varie comme 1/d, et l'instrument fixe Δp, pas Δp/p.",
        why: "Δd/d ≈ Δp/p. La parallaxe est 20 fois plus petite et Δp ne change pas : Δd/d est 20 fois plus grand, 20\u00a0%. La règle des puissances (une puissance \u22121 garde l'incertitude relative) est juste, mais c'est Δp que fixe l'instrument. Leçon « Les grandes distances », règle de la leçon « Incertitude absolue et incertitude relative »." },
      abbe: { prompt: "Microscope optique à immersion, n sin α = 1,4, lumière verte de 550\u00a0nm. D'après la limite d'Abbe d = λ/(2n sin α), que distingue-t-on encore ?",
        options: { a: "Des détails d'environ 0,4\u00a0µm : une bactérie et un virus d'une centaine de nanomètres.", b: "Des détails d'environ 2\u00a0nm : jusqu'aux protéines.", c: "Des détails d'environ 0,2\u00a0µm : une bactérie de 1\u00a0µm, pas un virus d'une centaine de nanomètres.", d: "Des détails d'environ 0,2\u00a0nm : la distance entre atomes." },
        hint: "Calculez λ/(2 × 1,4), puis comparez aux tailles des objets.",
        why: "550\u00a0×\u00a010⁻⁹/(2 × 1,4) ≈ 2,0\u00a0×\u00a010⁻⁷\u00a0m. Une bactérie de 10⁻⁶\u00a0m est cinq fois plus grande ; un virus de 10⁻⁷\u00a0m est sous la limite. Grossir davantage n'y change rien : il faut une onde plus courte, rayons X ou électrons. Leçon « Les petites distances »." },
      concordance: { prompt: "Triangulation, temps de vol, diffraction des rayons X, masse volumique du sel : qu'est-ce qui autorise à dire que ces méthodes mesurent toutes « la » distance ?",
        options: { a: "Elles reposent toutes sur le même étalon matériel, une règle de platine.", b: "Là où deux méthodes s'appliquent ensemble, elles donnent le même nombre : triangle et règle sur Terre, rayons X et chimie pour le sel.", c: "La définition du mètre par c les rend toutes exactes.", d: "Rien : ce sont des distances différentes, qu'on ne peut pas comparer." },
        hint: "Chaque méthode change un peu la définition de la distance. Que faut-il vérifier ?",
        why: "Chaque méthode prolonge la précédente. La confiance vient du recouvrement : sur Terre, triangle et règle concordent ; pour le sel, l'arête (4M/ρN_A)^(1/3) = 564\u00a0pm vaut le double des 282\u00a0pm entre plans mesurés par diffraction, comme le veut la structure du cristal. Leçons « Les grandes distances » et « Les petites distances »." },
      epaisse: { prompt: "Une plaque de graphite de 1\u00a0cm arrête 2,6\u00a0% d'un faisceau : nσe ≈ 0,026 par centimètre. Que prédit la formule mince « fraction arrêtée = nσe » pour 50\u00a0cm, et que vaut la fraction réelle ?",
        options: { a: "2,6\u00a0% par centimètre quelle que soit l'épaisseur : 2,6\u00a0% en tout.", b: "50 × 2,6\u00a0% = 130\u00a0% : tout est arrêté avant 50\u00a0cm.", c: "13\u00a0%.", d: "Elle prédit 130\u00a0%, ce qui est absurde : les noyaux se masquent. La loi exacte 1 \u2212 exp(\u2212nσe) donne environ 73\u00a0%." },
        hint: "La formule mince suppose nσe très petit devant 1.",
        why: "La formule mince suppose nσe ≪ 1 : aucun noyau caché derrière un autre. À 50\u00a0cm, nσe ≈ 1,3 et la formule dépasse 100\u00a0%. La loi exacte, exponentielle, donne 1 \u2212 e^(\u22121,3) ≈ 0,73. Note de validité de la section efficace, leçon « Les petites distances »." },
      poussiere: { prompt: "Dans le plan de la Galaxie, la poussière divise par 2,5 le flux reçu d'une étoile lointaine. Si l'on applique d = √(L/(4πφ)) sans en tenir compte, la distance est…",
        options: { a: "surestimée d'environ 60\u00a0%.", b: "surestimée d'un facteur 2,5.", c: "sous-estimée d'environ 60\u00a0%.", d: "inchangée, puisque la poussière ne change pas la puissance L de l'étoile." },
        hint: "d varie comme 1/√φ.",
        why: "φ est divisé par 2,5 ; d varie comme 1/√φ, donc la distance calculée est multipliée par √2,5 ≈ 1,58. La formule suppose une émission isotrope et rien d'absorbé en chemin : c'est sa limite dans le plan de la Galaxie. Note de validité de la leçon « Les grandes distances » ; une racine carrée divise l'incertitude relative par deux, leçon « Incertitude absolue et incertitude relative »." },
      echelle: { prompt: "Les céphéides lointaines sont étalonnées sur les parallaxes de quelques céphéides proches, entachées d'une erreur systématique de 3\u00a0%. Mesurer mille céphéides lointaines au lieu de dix réduit-il cette erreur ?",
        options: { a: "Oui, d'un facteur √100 = 10.", b: "Oui, d'un facteur 100.", c: "Non : l'erreur est commune à toutes les mesures, la moyenne n'y peut rien ; il faut améliorer le premier barreau.", d: "Oui, à condition de les choisir à des distances variées." },
        hint: "Le facteur 1/√n suppose des erreurs indépendantes.",
        why: "Le facteur 1/√n ne vaut que pour des erreurs indépendantes. Une erreur d'étalonnage commune déplace toutes les mesures dans le même sens, comme un chronomètre qui retarde. C'est pourquoi chaque gain sur les parallaxes, de Hipparcos à Gaia, a fait bouger toute l'échelle. Leçons « Les grandes distances » et « Incertitude absolue et incertitude relative »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Diagrammes binaires » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      raoult: { prompt: "Un liquide équimolaire benzène-toluène bout sous 101,3\u00a0kPa à 365,2\u00a0K, où p*(benzène) = 144,7\u00a0kPa et p*(toluène) = 57,9\u00a0kPa. Quelle est la composition de la première bulle de vapeur ?",
        options: { a: "Équimolaire, comme le liquide.", b: "Du benzène pur, le corps le plus volatil.", c: "71\u00a0% de benzène en moles : y = x p*(benzène)/p = 0,5 × 144,7/101,3.", d: "29\u00a0% de benzène : le corps le plus volatil part en dernier." },
        hint: "La loi de Raoult donne la pression partielle du benzène ; divisez par la pression totale.",
        why: "Pression partielle du benzène : 0,5 × 144,7 = 72,4\u00a0kPa, soit y = 0,714. La vapeur s'enrichit en corps volatil, sans être pure : il faudra plusieurs équilibres pour le séparer. Leçons « Binaires liquide-vapeur et azéotropes » et « Distillation fractionnée et hydrodistillation »." },
      azeo: { prompt: "Sous 101,3\u00a0kPa, le mélange éthanol-eau à x = 0,891 bout à 351,32\u00a0K et donne une vapeur de même composition. Quelle affirmation est juste ?",
        options: { a: "C'est un azéotrope à minimum : aucune distillation sous cette pression ne le dépasse, mais sa composition change avec la pression, ce n'est donc pas un composé.", b: "C'est un composé défini de formule fixe.", c: "La loi de Raoult le prévoit exactement.", d: "Une colonne de 40 plateaux le franchit sans peine." },
        why: "En un extremum de T(x) à p fixée, y = x (Gibbs-Konovalov) : la vapeur n'est plus enrichie. Raoult, lui, prévoit une ébullition 10\u00a0K trop chaude à x = 0,1 et aucun azéotrope. Leçons « Binaires liquide-vapeur et azéotropes » et « Distillation fractionnée et hydrodistillation »." },
      colonne: { prompt: "Un bouilleur contient du benzène-toluène à x = 0,2. À reflux total, combien de plateaux théoriques au-dessus du bouilleur faut-il pour un distillat à au moins 0,95 de benzène ?",
        options: { a: "Aucun : la distillation simple suffit.", b: "Un seul.", c: "Quarante : le fuseau est étroit.", d: "Quatre : les vapeurs successives valent 0,378 ; 0,600 ; 0,791 ; 0,906 ; 0,961." },
        hint: "Chaque plateau théorique est une marche : vaporiser, puis condenser.",
        why: "Le bouilleur donne 0,378, chaque plateau ajoute une marche : 0,600, 0,791, 0,906, puis 0,961 au quatrième. À reflux partiel ou avec des plateaux réels, il en faut davantage. Leçon « Distillation fractionnée et hydrodistillation »." },
      hydro: { prompt: "L'eau et le toluène, non miscibles, bouillent ensemble sous 101\u202f325\u00a0Pa. À quelle température, et que recueille-t-on ?",
        options: { a: "À 373,15\u00a0K, de l'eau d'abord, puis du toluène.", b: "À 357,5\u00a0K, sous les deux ébullitions, un distillat à composition fixe qui contient 80\u00a0% de toluène en masse.", c: "À 383,8\u00a0K, l'ébullition du toluène.", d: "Entre 373 et 384\u00a0K, selon les proportions des deux liquides." },
        why: "Chaque liquide pur exerce sa pleine pression de vapeur : 56,3 + 45,0 = 101,3\u00a0kPa à 357,5\u00a0K (mesure : 357,25\u00a0K). Trois phases à p fixée : variance nulle, palier. Le toluène, 44\u00a0% des moles, fait 80\u00a0% de la masse. Leçon « Distillation fractionnée et hydrodistillation »." },
      liquidus: { prompt: "Le plomb fond à 600,61\u00a0K, avec Δfus H = 4,78\u00a0kJ·mol⁻¹. Selon l'équation de Schröder et van Laar, de combien 1\u00a0% d'atomes d'étain abaisse-t-il le début de sa solidification ?",
        options: { a: "De 0,6\u00a0K.", b: "De 1\u00a0% de 600,61\u00a0K, soit 6,0\u00a0K, quel que soit le métal.", c: "D'environ 6,3\u00a0K : R Tfus²/Δfus H = 627\u00a0K par unité de fraction molaire.", d: "De rien : l'étain fond plus bas que le plomb." },
        hint: "Près de x = 1, ln x ≈ \u2212(1 \u2212 x).",
        why: "ΔT ≈ (R Tfus²/Δfus H) xB = 8,314 × 600,61²/4\u202f782 × 0,01 ≈ 6,3\u00a0K. Une faible enthalpie de fusion donne un liquidus raide. Leçon « Binaires solide-liquide, eutectiques et composés définis »." },
      eutectique: { prompt: "Le modèle idéal (liquide idéal, solides purs) place l'eutectique plomb-étain à 355\u00a0K ; le NIST le mesure à 455,35\u00a0K. D'où vient l'écart ?",
        options: { a: "D'une erreur de mesure du NIST.", b: "Les solides ne sont pas purs : le plomb solide dissout jusqu'à 18,91\u00a0% d'étain en masse, ce qui le stabilise et relève le liquidus.", c: "De la pression atmosphérique, qui abaisse la fusion.", d: "D'un composé défini Pb-Sn à fusion congruente." },
        why: "Miscibilité partielle à l'état solide : l'hypothèse « solides purs » tombe. Pour bismuth-cadmium, où elle tient, le même modèle ne se trompe que de 11\u00a0K. Leçon « Binaires solide-liquide, eutectiques et composés définis »." },
      courbe: { prompt: "Un alliage bismuth-cadmium à x(Cd) = 0,3 refroidit dans un four. Que montre sa courbe de refroidissement, d'après le modèle de l'étape ?",
        options: { a: "Une rupture de pente à 475,6\u00a0K, où le bismuth commence à cristalliser (variance 1), puis un palier à 407,6\u00a0K où trois phases coexistent (variance 0).", b: "Un seul palier à 544,55\u00a0K.", c: "Deux paliers, à 544,55 et 594,22\u00a0K.", d: "Une droite : un alliage ne change pas de pente." },
        why: "Entre le liquidus et l'eutectique, la cristallisation du bismuth ralentit le refroidissement sans l'arrêter ; à l'eutectique, la variance nulle impose un palier, de 30 minutes à 5\u00a0K par minute. Leçon « Analyse thermique, théorème des moments et alliages »." },
      moments: { prompt: "Plomb-étain à 40\u00a0% d'étain en masse, juste sous 455,35\u00a0K : deux solides, (Pb) à 18,91\u00a0% et (Sn) à 96,59\u00a0% d'étain. Quelle part de la masse est la phase (Sn) ?",
        options: { a: "40\u00a0%, la composition de l'alliage.", b: "48,8\u00a0%, la part de liquide juste au-dessus du palier.", c: "72,9\u00a0% : (96,59 \u2212 40)/(96,59 \u2212 18,91).", d: "27,1\u00a0% : (40 \u2212 18,91)/(96,59 \u2212 18,91)." },
        hint: "Le bras de levier d'une phase est du côté opposé.",
        why: "m(Sn) (96,59 \u2212 40) = m(Pb) (40 \u2212 18,91) : la phase (Sn) fait 21,09/77,68 = 27,1\u00a0% de la masse. Le rapport inverse, 72,9\u00a0%, est la part de (Pb). Leçon « Analyse thermique, théorème des moments et alliages »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

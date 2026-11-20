/* Épreuve de l'étape « Méthode des images » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      pointes: { prompt: "Un ellipsoïde conducteur de 10\u00a0cm de long et 2\u00a0cm de large est porté à 30\u00a0kV dans l'air. Le champ juste dehors vaut 6,4\u00a0MV·m⁻¹ aux pointes. Que vaut-il à l'équateur, et que fait l'air ?",
        options: { a: "6,4\u00a0MV·m⁻¹ aussi : la surface est équipotentielle, donc le champ y est le même partout.", b: "32\u00a0MV·m⁻¹ : le champ est plus fort là où la surface est la plus large.", c: "1,3\u00a0MV·m⁻¹, cinq fois moins : seules les pointes dépassent le champ de claquage de l'air, environ 3\u00a0MV·m⁻¹.", d: "0,26\u00a0MV·m⁻¹, vingt-cinq fois moins, comme le rapport des courbures." },
        hint: "Sur un ellipsoïde, σ est proportionnel à la distance du centre au plan tangent.",
        why: "Le potentiel est le même partout, pas le champ. Le champ vaut σ/ε0, et σ au pôle sur σ à l'équateur vaut a/b = 5, pas le rapport des courbures, 25. 6,4/5 ≈ 1,3\u00a0MV·m⁻¹ : l'air s'ionise aux pointes seulement. Leçon « Champ des conducteurs chargés »." },
      unicite: { prompt: "On trouve, par une astuce, une distribution de charges qui donne le bon potentiel sur un conducteur et la bonne charge totale. Pourquoi est-ce la solution ?",
        options: { a: "Parce que le problème n'a qu'une solution : la différence de deux solutions n'a pas de source, est constante sur le métal et ne porte aucun flux, donc elle est nulle.", b: "Parce que toute distribution de charges donne un conducteur équipotentiel.", c: "Parce que l'astuce a été vérifiée sur la sphère.", d: "Ce n'en est pas une : il faut encore vérifier que le champ est nul dans le métal en calculant l'intégrale de σ." },
        why: "C'est l'argument d'unicité qui justifie l'essai-correction comme la méthode des images : toute fonction qui vérifie les conditions est la solution. Leçons « Champ des conducteurs chargés » et « La méthode des images »." },
      metal: { prompt: "Dans le champ de q = +1\u00a0nC et q′ = \u22120,6\u00a0nC, on remplit de métal une équipotentielle fermée qui entoure q′, et l'on retire q′. Quelle charge porte le métal, et que devient le champ dehors ?",
        options: { a: "Zéro, et le champ dehors devient celui de q seule.", b: "+1\u00a0nC, et le champ dehors double.", c: "\u22121\u00a0nC, car toutes les lignes de q finissent sur le métal.", d: "\u22120,6\u00a0nC, et le champ dehors ne change pas : 60\u00a0% des lignes de q finissent sur le métal." },
        why: "Le champ dehors est inchangé, donc le flux à travers une surface juste au-dessus du métal aussi : le métal porte q′. Ses lignes reçoivent 0,6 du flux de q ; le reste part à l'infini. Leçon « La méthode des images »." },
      disque: { prompt: "Une charge q est à la hauteur a d'un grand plan conducteur relié à la terre. Quelle part de la charge induite se trouve dans le disque de rayon a autour de son pied ?",
        options: { a: "La moitié.", b: "Environ 29\u00a0%, soit 1 \u2212 1/√2.", c: "Toute : la charge induite est concentrée sous la charge.", d: "Environ 10\u00a0%." },
        hint: "La charge du disque de rayon R vaut \u2212q (1 \u2212 a/√(a² + R²)).",
        why: "Pour R = a : 1 \u2212 1/√2 ≈ 0,29. Il faut aller à R = √3 a pour la moitié, et 10\u00a0% de la charge est encore au-delà de 10 a : σ décroît comme 1/ρ³. Leçon « Charge près d'un plan conducteur »." },
      electron: { prompt: "Un électron est à 2\u00a0nm d'une surface métallique plane. Que valent, d'après l'image, la force qui l'attire et l'énergie qu'il faut pour l'éloigner ?",
        options: { a: "14\u00a0pN et 0,18\u00a0eV : l'énergie est la moitié de celle de l'interaction de deux charges à 4\u00a0nm.", b: "58\u00a0pN et 0,72\u00a0eV.", c: "14\u00a0pN et 0,36\u00a0eV : l'énergie d'interaction de deux charges à 4\u00a0nm.", d: "29\u00a0pN et 0,18\u00a0eV." },
        hint: "La force (6.30) va comme 1/a² ; l'énergie s'obtient en l'intégrant de a à l'infini.",
        why: "F = e²/(4π ε0 (2a)²) = 14,4\u00a0pN à a = 2\u00a0nm. Le travail, ∫ F dx de a à l'infini, vaut e²/(16π ε0 a) = 0,18\u00a0eV : la moitié de e²/(4π ε0 · 2a), car l'image recule avec l'électron. À 2\u00a0nm, quelques fois la distance entre atomes, ce n'est qu'un ordre de grandeur. Leçon « Charge près d'un plan conducteur »." },
      image: { prompt: "Une charge q est à 40\u00a0cm du centre d'une sphère conductrice de 10\u00a0cm de rayon, reliée à la terre. Que vaut son image, et où est-elle ?",
        options: { a: "\u2212q à 10\u00a0cm sous la surface.", b: "\u2212q/4 au centre.", c: "\u2212q/4, à 2,5\u00a0cm du centre, sur le rayon qui mène à q.", d: "\u2212q/2, à 5\u00a0cm du centre." },
        why: "(6.31) : q′ = \u2212q a/b = \u2212q/4, à a²/b = 100/40 = 2,5\u00a0cm du centre. La sphère porte en tout \u2212q/4. Leçon « Charge près d'une sphère conductrice »." },
      loin: { prompt: "On double la distance entre une charge et une petite sphère conductrice isolée et neutre, loin d'elle. Par combien la force est-elle divisée ?",
        options: { a: "Par 4, comme la loi de Coulomb.", b: "Par 8 : la sphère porte la charge \u2212q a/b.", c: "Par 2.", d: "Par 32 : la sphère est un dipôle induit, proportionnel au champ de q, et la force va comme 1/b⁵." },
        why: "Le moment induit 4π ε0 a³ E est en 1/b², son champ sur q en 1/b³ de plus : F ≈ 2 q² a³/(4π ε0 b⁵). 2⁵ = 32. Reliée à la terre, la sphère porterait \u2212q a/b, et la force varierait en 1/b³. Leçon « Charge près d'une sphère conductrice »." },
      schottky: { prompt: "Un champ de 10⁹\u00a0V·m⁻¹ tire les électrons hors d'une cathode. Que prévoit le modèle de l'image, et que vaut-il ?",
        options: { a: "Un abaissement de 0,38\u00a0eV, le même qu'à 10⁸\u00a0V·m⁻¹, à un sommet situé à 1,9\u00a0nm.", b: "Un abaissement d'environ 1,2\u00a0eV, √10 fois celui à 10⁸\u00a0V·m⁻¹, au sommet situé à 0,6\u00a0nm : à peine plus que quelques distances atomiques, le modèle devient grossier.", c: "Un abaissement de 3,8\u00a0eV, dix fois celui à 10⁸\u00a0V·m⁻¹, sûr car l'image est exacte.", d: "Aucun abaissement : l'image ne compte qu'en l'absence de champ." },
        why: "ΔW = √(e³E/(4π ε0)) croît comme √E : 0,38 × √10 ≈ 1,2\u00a0eV. Le sommet, à √(e/(16π ε0 E)), se rapproche comme 1/√E : 0,6\u00a0nm, et le métal n'est plus un plan lisse à cette échelle. Leçon « Charge près d'un plan conducteur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

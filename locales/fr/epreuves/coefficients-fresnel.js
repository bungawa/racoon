/* Épreuve de l'étape « Coefficients de réflexion et réflexion totale » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      vitre: { prompt: "Une vitre d'indice 1,50 est éclairée en incidence normale. Quelle fraction de la lumière traverse ses deux faces, en négligeant les réflexions multiples ?",
        options: { a: "Environ 92\u00a0% : chaque face en renvoie 4\u00a0%, et 0,96² ≈ 0,92.", b: "96\u00a0% : seule la première face réfléchit.", c: "80\u00a0%, le carré de l'amplitude transmise 0,8 à chaque face, puis 0,8² à la sortie.", d: "100\u00a0% : le verre est transparent." },
        hint: "Pour chaque face, R = ((n1 \u2212 n2)/(n1 + n2))², et T = 1 \u2212 R.",
        why: "R = (0,5/2,5)² = 0,04 par face, de l'air au verre comme du verre à l'air. T = 0,96 × 0,96 ≈ 0,92. L'amplitude 0,8 ne se compare pas à 1 sans le facteur de flux : T = 1,5 × 0,8² = 0,96. Leçon « Ondes réfléchie et transmise »." },
      direction: { prompt: "Quelle condition fixe à la fois la loi de la réflexion et celle de Snell-Descartes ?",
        options: { a: "La conservation de l'énergie à travers la surface.", b: "L'égalité des composantes k_y des trois ondes, imposée parce que les conditions de passage valent en tout point de la surface.", c: "La continuité de la composante normale de E.", d: "L'égalité des intensités incidente et réfléchie." },
        why: "La somme des champs doit vérifier les conditions de passage pour tout y : k_y″ = k_y′ = k_y, (33.41). Avec |k′| = |k| on obtient θr = θi, avec |k″| = n2 ω/c la loi de Snell-Descartes. Aucune amplitude n'intervient." },
      brewster: { prompt: "On regarde, à travers un polariseur, le reflet du Soleil sur un lac (indice 1,33). Sous quelle incidence, et pour quelle orientation du polariseur, le reflet disparaît-il ?",
        options: { a: "En incidence normale, polariseur horizontal.", b: "À 41,8°, polariseur vertical.", c: "À 53°, polariseur qui ne laisse passer que E dans le plan d'incidence, c'est-à-dire vertical.", d: "À 90°, quelle que soit l'orientation." },
        hint: "tan θB = n2/n1.",
        why: "arctan 1,33 = 53,1° : là, R∥ = 0 et le reflet est entièrement polarisé avec E parallèle à la surface du lac, horizontal. Un polariseur qui ne laisse passer que E vertical, dans le plan d'incidence, l'éteint. Leçon « Ondes réfléchie et transmise »." },
      signe: { prompt: "Une onde polarisée normalement au plan d'incidence se réfléchit, en incidence normale, de l'air sur le verre puis, ailleurs, du verre sur l'air. Que dire des deux amplitudes réfléchies E0′/E0 ?",
        options: { a: "Elles valent toutes deux \u22120,2.", b: "Elles valent toutes deux +0,2.", c: "Elles sont nulles : en incidence normale, il n'y a pas de plan d'incidence.", d: "Elles valent \u22120,2 puis +0,2 : la réflexion sur le milieu le plus réfringent inverse le champ." },
        why: "(33.51) donne (k_x \u2212 k_x″)/(k_x + k_x″) = (n1 \u2212 n2)/(n1 + n2) : \u22120,2 de l'air au verre, +0,2 du verre à l'air. Les intensités, elles, sont les mêmes, 4\u00a0%." },
      metal: { prompt: "Un milieu a pour indice n = 0,05 \u2212 3,0i (convention n = n_R \u2212 i n_I). Quel est, environ, son facteur de réflexion en incidence normale ?",
        options: { a: "25\u00a0%, comme un diélectrique d'indice 3.", b: "Environ 98\u00a0% : |(1 \u2212 n)/(1 + n)|² = (0,95² + 9)/(1,05² + 9).", c: "Environ 5\u00a0% : seule la partie réelle compte pour la réflexion.", d: "0\u00a0% : tout est absorbé." },
        hint: "(33.57a) : R = ((1 \u2212 n_R)² + n_I²)/((1 + n_R)² + n_I²).",
        why: "(0,9025 + 9)/(1,1025 + 9) = 9,9025/10,1025 ≈ 0,980. Un indice presque imaginaire pur réfléchit presque tout ; ce qui entre, 2\u00a0%, est absorbé sur c/(3ω). Leçon « Réflexion sur les métaux »." },
      uv: { prompt: "Dans le modèle des électrons libres, le potassium a une longueur d'onde plasma voisine de 280\u00a0nm. Que fait une couche mince de potassium à 250\u00a0nm et à 500\u00a0nm ?",
        options: { a: "Elle transmet à 250\u00a0nm et réfléchit presque tout à 500\u00a0nm.", b: "Elle réfléchit à 250\u00a0nm et transmet à 500\u00a0nm.", c: "Elle réfléchit aux deux longueurs d'onde, comme tout métal.", d: "Elle absorbe aux deux longueurs d'onde." },
        why: "Au-dessus de ωp (λ < λp), n² = 1 \u2212 (ωp/ω)² > 0 : le métal est un diélectrique transparent. En dessous (λ > λp), n² < 0, l'indice est presque imaginaire et R ≈ 1. C'est la transparence des alcalins dans l'ultraviolet observée par Wood. Leçon « Réflexion sur les métaux »." },
      prisme: { prompt: "Un prisme d'indice 1,50 à 45° renvoie un faisceau par réflexion totale. On pose un second prisme identique à 0,3\u00a0µm de la face, dans l'air, pour une lumière de 633\u00a0nm. Que se passe-t-il ?",
        options: { a: "Rien : au-delà de l'angle critique, la réflexion est totale quoi qu'il y ait derrière.", b: "Toute la lumière passe dans le second prisme.", c: "La lumière est absorbée dans la lame d'air.", d: "Une part notable passe, de l'ordre de 20 à 40\u00a0% : la queue évanescente, qui décroît en 0,28\u00a0µm, atteint le second verre." },
        hint: "1/k_I = λ0/(2π√(n² sin²θ \u2212 1)).",
        why: "√(1,125 \u2212 1) = 0,354 et 1/k_I = 285\u00a0nm. La lame fait à peu près une profondeur : le calcul exact donne T = 19\u00a0% pour E normal au plan d'incidence et 37\u00a0% pour E dans le plan. Leçon « Réflexion totale interne »." },
      phase: { prompt: "En réflexion totale, les deux polarisations reviennent entières. Qu'est-ce qui les distingue encore ?",
        options: { a: "Leur direction : l'une est réfléchie, l'autre réfractée.", b: "Leur fréquence, décalée par la réflexion.", c: "Leur phase : (33.51a) a une phase qui dépend de la polarisation, et une lumière rectiligne à 45° revient elliptique.", d: "Rien : en réflexion totale, les deux polarisations sont équivalentes." },
        why: "|r| = 1 pour les deux, mais les phases diffèrent : 36,9° pour E⊥ et 73,7° pour B∥, à 45° dans un verre d'indice 1,50. Deux réflexions sous 54,6° dans un verre d'indice 1,51 décalent les deux composantes d'un quart de période : c'est le losange de Fresnel. Leçon « Réflexion totale interne »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

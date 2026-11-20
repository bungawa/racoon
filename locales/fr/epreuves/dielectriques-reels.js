/* Épreuve de l'étape « Liquides, solides et ferroélectricité » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      trou: { prompt: "Dans un liquide de constante diélectrique κ = 5, le champ moyen vaut E. Quel champ règne dans un trou sphérique creusé dans ce liquide, la polarisation restant figée ?",
        options: { a: "Environ 2,33 E.", b: "5 E.", c: "E.", d: "Environ 1,33 E." },
        hint: "(11.25), avec P = (κ \u2212 1) ε0 E.",
        why: "E + P/(3ε0) = E [1 + (κ \u2212 1)/3] = E (κ + 2)/3 = 7E/3 ≈ 2,33 E. C'est un tiers du chemin entre E (fente parallèle au champ) et 5E (fente perpendiculaire). Leçon « Champ dans une cavité d'un diélectrique »." },
      aiguille: { prompt: "Dans le même liquide, on creuse un trou en forme d'aiguille très fine, parallèle au champ. Quel champ y règne-t-il ?",
        options: { a: "5 E : les parois sont chargées.", b: "Environ 2,33 E, comme dans la sphère.", c: "E : la circulation du champ sur un contour fermé est nulle, et les parois, parallèles à P, ne portent pas de charge.", d: "Zéro." },
        why: "Le facteur de dépolarisation d'une aiguille est nul. Les charges de polarisation ne sont qu'aux deux bouts, très loin : il reste le champ moyen. Le champ dans un trou dépend de sa forme, de E à κE." },
      argon: { prompt: "Pour l'argon liquide, on déduit du gaz Nα = 0,441. Que prédit la relation de Clausius-Mossotti, et que donnerait l'oubli du champ des voisins ?",
        options: { a: "1,441 dans les deux cas.", b: "Environ 1,52 ; sans le champ des voisins, 1,44. On mesure 1,54.", c: "Environ 1,15 ; sans le champ des voisins, 1,44.", d: "Environ 3,6 ; sans le champ des voisins, 1,44." },
        hint: "(11.28) : κ \u2212 1 = Nα/(1 \u2212 Nα/3).",
        why: "κ \u2212 1 = 0,441/(1 \u2212 0,147) = 0,517. La mesure, 1,54, est à 1,5\u00a0% de la prédiction et à 6\u00a0% de la valeur sans champ local. Leçon « Constante diélectrique des liquides, relation de Clausius-Mossotti »." },
      retour: { prompt: "Un liquide non polaire a une constante diélectrique de 2,0. Sa vapeur est 500 fois moins dense. Quelle valeur de κ \u2212 1 attend-on pour la vapeur ?",
        options: { a: "0,002.", b: "0,004.", c: "0,000\u00a05.", d: "0,001\u00a05." },
        hint: "Nα = 3 (κ \u2212 1)/(κ + 2) dans le liquide, puis divisez par le rapport des densités.",
        why: "Dans le liquide, Nα = 3 × 1/4 = 0,75. Dans la vapeur, Nα = 0,75/500 = 0,001\u00a05, et κ \u2212 1 = Nα à 5\u00a0×\u00a010⁻⁴ près en valeur relative. Diviser directement κ \u2212 1 = 1 par 500 donnerait 0,002 : 33\u00a0% de trop, parce que le liquide doit un quart de sa polarisation au champ des voisins." },
      eau: { prompt: "Le même calcul, mené pour l'eau à partir de sa vapeur, donne Nα = 13,2 et une constante diélectrique négative ; on mesure 80. Pourquoi cet échec ?",
        options: { a: "La molécule d'eau a un moment permanent : le champ du trou sphérique n'est pas le champ qui l'oriente, et la relation ne vaut que pour des moments induits.", b: "L'eau liquide conduit le courant.", c: "La vapeur d'eau n'est pas un gaz parfait.", d: "Le facteur 1/3 doit être remplacé par 1 dans tous les liquides." },
        why: "Une molécule polaire polarise son entourage, qui crée en retour un champ sur elle ; ce champ tourne avec la molécule et ne contribue pas à l'orienter. Le compter, c'est surestimer la rétroaction au point de dépasser le seuil Nα = 3. La correction est due à Onsager." },
      face: { prompt: "Un cristal polaire a une polarisation permanente de 10⁻³\u00a0C·m⁻². Quel champ créerait une de ses faces si elle était nue, et que se passe-t-il dans l'air ?",
        options: { a: "Environ 10²\u00a0V·m⁻¹ : rien de visible.", b: "Environ 10⁵\u00a0V·m⁻¹ : un champ permanent, comme celui d'un aimant.", c: "Environ 10⁸\u00a0V·m⁻¹, bien au-dessus du claquage de l'air : des charges libres viennent compenser la face.", d: "Environ 10¹¹\u00a0V·m⁻¹ : le cristal se brise." },
        why: "P/ε0 = 10⁻³/8,85\u00a0×\u00a010⁻¹² ≈ 1,1\u00a0×\u00a010⁸\u00a0V·m⁻¹, près de quarante fois les 3\u00a0MV·m⁻¹ où l'air claque. Les ions de l'air neutralisent les faces : un cristal polaire au repos ne montre aucun champ. Leçon « Diélectriques solides »." },
      pastille: { prompt: "Une pastille pyroélectrique de 4\u00a0mm², entre deux électrodes reliées par un fil, voit sa polarisation varier de 5\u00a0×\u00a010⁻⁶\u00a0C·m⁻² quand un corps chaud passe devant elle. Quelle charge traverse le fil ?",
        options: { a: "2\u00a0×\u00a010⁻⁵\u00a0C.", b: "2\u00a0×\u00a010⁻¹¹\u00a0C.", c: "1,25\u00a0C.", d: "2\u00a0×\u00a010⁻⁸\u00a0C." },
        hint: "ΔQ = A ΔP, avec l'aire en mètres carrés.",
        why: "ΔQ = 4\u00a0×\u00a010⁻⁶ × 5\u00a0×\u00a010⁻⁶ = 2\u00a0×\u00a010⁻¹¹\u00a0C. On ne détecte que la variation de polarisation : un corps immobile ne donne aucun signal." },
      weiss: { prompt: "Au-dessus de sa température critique, un ferroélectrique suit la loi de Curie-Weiss. Sa constante diélectrique vaut 10\u00a0000 à 20\u00a0K au-dessus de Tc. Que vaut-elle à 5\u00a0K au-dessus ?",
        options: { a: "2\u00a0500.", b: "10\u00a0000 : elle ne dépend pas de la température.", c: "20\u00a0000.", d: "Environ 40\u00a0000." },
        why: "κ \u2212 1 varie comme 1/(T \u2212 Tc) : en divisant l'écart par 4, on la multiplie par 4. La divergence vient du dénominateur 1 \u2212 Nα/3 de la relation de Clausius-Mossotti, que la dilatation du cristal fait passer par zéro à Tc. Leçon « Ferroélectricité et titanate de baryum »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

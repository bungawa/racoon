/* Épreuve de l'étape « La rétine et les bâtonnets » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      ombre: { prompt: "Un écran est éclairé par une lampe blanche et par une lampe rouge à 620\u00a0nm ; un objet arrête la lampe rouge. L'œil est adapté au fond. Quelle est la dominante de l'ombre vue, dans le modèle de von Kries ?",
        options: { a: "Environ 492\u00a0nm, la complémentaire de 620\u00a0nm : un bleu-vert.", b: "620\u00a0nm : l'ombre reste rouge, en plus sombre.", c: "Aucune : l'ombre ne reçoit que du blanc, elle est vue blanche.", d: "Environ 580\u00a0nm : un jaune." },
        hint: "L'œil prend le fond, blanc + rouge, pour référence du blanc.",
        why: "Divisée cône par cône par le fond, l'ombre est vue comme le blanc privé de rouge : la teinte qui, ajoutée au rouge, redonnerait le blanc. Le modèle donne 492\u00a0nm. Un spectromètre, lui, n'y mesure que du blanc. Leçon « La sensation de couleur »." },
      fond: { prompt: "Dans la même expérience, on double la luminance de la lampe rouge, l'adaptation restant complète. Que devient l'ombre vue ?",
        options: { a: "Elle redevient blanche : l'œil sature.", b: "Plus saturée, de même dominante : la pureté passe de 56\u00a0% à 94\u00a0% quand k passe de 0,5 à 1.", c: "Elle vire au jaune.", d: "Elle reste identique : seule compte la lampe blanche, qui l'éclaire." },
        why: "Plus le fond est rouge, plus les cônes L baissent leur gain, et plus l'ombre paraît manquer de rouge. La dominante reste celle de la complémentaire, vers 491 à 492\u00a0nm ; la pureté croît. Au-delà, le modèle sort même du domaine des couleurs réelles. Leçon « La sensation de couleur »." },
      orange: { prompt: "Une raie à 600\u00a0nm donne, dans le modèle minimal, rv = L \u2212 M = 0,30 et jb = (L + M)/2 \u2212 S = 0,52. Comment est-elle vue ?",
        options: { a: "Vert bleuâtre.", b: "Rouge verdâtre : les deux signaux sont positifs.", c: "Orange : rougeâtre et jaunâtre à la fois.", d: "Blanche : les deux signaux se compensent." },
        why: "rv > 0 : rougeâtre ; jb > 0 : jaunâtre. Un orange est un « rouge jaunâtre ». « Rouge verdâtre » est impossible : rouge et vert sont les deux signes d'un même signal. Leçon « La sensation de couleur »." },
      plongee: { prompt: "Un plongeur a une cornée de rayon 7,6\u00a0mm à l'avant. De combien sa vergence baisse-t-elle quand il ouvre les yeux sous l'eau, sans masque ?",
        options: { a: "De 5,7\u00a0m⁻¹, la vergence de la face avant dans l'eau.", b: "De 60\u00a0m⁻¹ : l'œil ne converge plus du tout.", c: "De 0,33\u00a0m⁻¹, l'écart d'indice entre l'eau et l'air.", d: "D'environ 44\u00a0m⁻¹ : (1,333 \u2212 1)/7,6\u00a0mm." },
        hint: "Seule la face avant de la cornée change de milieu.",
        why: "Par (27.7a), ΔV = (n_ext \u2212 1)/R = 0,333/7,6 × 10⁻³\u00a0m = 43,8\u00a0m⁻¹. La face arrière et le cristallin ne changent pas : l'œil garde une quinzaine de m⁻¹, et devient très hypermétrope. Aucune accommodation humaine, 16\u00a0m⁻¹ au plus, ne compense. Leçon « La physiologie de l’œil »." },
      masque: { prompt: "Derrière un masque à vitre plane, un poisson nage à 2\u00a0m. Où le plongeur le voit-il ?",
        options: { a: "À 1,5\u00a0m, 1,33 fois plus grand : la vitre réfracte sans converger.", b: "À 2\u00a0m, net et à sa taille réelle.", c: "À 2,67\u00a0m, plus petit.", d: "Flou : la vitre ne rend pas la cornée efficace." },
        why: "La vitre garde de l'air devant la cornée, qui retrouve ses 48\u00a0m⁻¹. Mais l'interface plane eau-air rapproche l'image à d/1,333 = 1,5\u00a0m, et l'objet paraît 1,33 fois plus grand. Leçon « La physiologie de l’œil »." },
      chiasma: { prompt: "Une tumeur de l'hypophyse comprime le milieu du chiasma optique. Quelle perte de champ attend-on ?",
        options: { a: "Toute la vision d'un œil.", b: "Les deux moitiés temporales du champ : les fibres croisées viennent des moitiés nasales des rétines.", c: "La moitié droite du champ, des deux yeux.", d: "Le centre du champ seulement." },
        hint: "Seules les fibres des moitiés nasales des rétines croisent au chiasma.",
        why: "Les fibres qui croisent viennent des moitiés nasales, qui voient le côté temporal du champ. Les comprimer au milieu du chiasma ôte les deux champs temporaux. Une lésion d'un hémisphère, en arrière, ôterait au contraire une même moitié du champ aux deux yeux. Leçon « La physiologie de l’œil »." },
      eclair: { prompt: "Un éclair apporte en moyenne 50 photons à la cornée ; 9,6\u00a0% sont absorbés par des bâtonnets, et l'on voit dès 6 photons absorbés. Quelle est la probabilité de voir l'éclair ?",
        options: { a: "100\u00a0% : 50 photons dépassent le seuil.", b: "0 : 4,8 photons absorbés sont sous le seuil.", c: "Environ 35\u00a0% : le nombre absorbé suit la loi de Poisson de moyenne 4,8.", d: "9,6\u00a0%, la part absorbée." },
        why: "a = 0,096 × 50 = 4,8. La probabilité d'au moins 6 événements pour une loi de Poisson de moyenne 4,8 vaut 0,35. Le seuil n'est pas atteint en moyenne, mais les fluctuations le franchissent souvent. Leçon « Les bâtonnets »." },
      pente: { prompt: "Pour un observateur, il faut multiplier le nombre de photons par 2,9 pour passer de 10\u00a0% à 90\u00a0% de détection. Que conclut-on, sans connaître la part absorbée q ?",
        options: { a: "Qu'un photon suffit pour voir.", b: "Que q vaut 2,9\u00a0%.", c: "Rien : il faudrait connaître q.", d: "Que le seuil vaut environ 6 photons absorbés : q décale la courbe, seul k fixe sa raideur." },
        why: "Sur un axe logarithmique, q translate la courbe ; sa raideur ne dépend que de k. Le rapport vaut 22 pour k = 1, 4,8 pour k = 3, 2,9 pour k = 6. C'est l'argument de Hecht, Shlaer et Pirenne. Leçon « Les bâtonnets »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

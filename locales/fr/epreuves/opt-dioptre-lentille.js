/* Épreuve de l'étape « Dioptres et lentilles minces » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      exces: { prompt: "Un rayon part de l'axe et atteint, 50\u00a0cm plus loin, un point situé à 5\u00a0mm de l'axe. De combien son trajet est-il plus long que le trajet sur l'axe ?",
        options: { a: "25\u00a0µm", b: "5\u00a0mm", c: "0,5\u00a0mm", d: "2,5\u00a0µm" },
        hint: "L'excès de l'hypoténuse sur la base vaut h²/2d.",
        why: "(27.1) : (5 × 10⁻³\u00a0m)²/(2 × 0,5\u00a0m) = 2,5 × 10⁻⁵\u00a0m = 25\u00a0µm. C'est 45 longueurs d'onde de lumière verte : l'excès est petit devant h, pas devant λ. Leçon « Introduction à l'optique géométrique »." },
      gauss: { prompt: "Un photographe ferme le diaphragme de son objectif pour obtenir une image plus nette. Pourquoi cela marche-t-il ?",
        options: { a: "Parce que moins de lumière fait moins de diffraction.", b: "Parce qu'on ne garde que les rayons proches de l'axe : on se rapproche des conditions de Gauss, et l'aberration sphérique, qui croît comme h², diminue.", c: "Parce que la focale de l'objectif augmente.", d: "Parce que la lumière passe alors plus vite dans le verre." },
        why: "Les relations de conjugaison sont paraxiales ; les rayons du bord coupent l'axe à côté de l'image de Gauss, d'un écart en h². Fermer trop finit par élargir l'image par la diffraction, qui croît comme λ/D. Leçons « Introduction à l'optique géométrique » et « Distance focale d’un dioptre sphérique »." },
      dioptre: { prompt: "Une goutte d'eau (n = 1,333) a une face d'entrée de rayon R = +2\u00a0cm. Où converge, dans l'eau, un faisceau parallèle venu de l'air ?",
        options: { a: "À 2\u00a0cm du sommet, au centre de courbure.", b: "À 6\u00a0cm du sommet.", c: "À 8\u00a0cm du sommet.", d: "À 2,7\u00a0cm du sommet." },
        hint: "f′ = n₂R/(n₂ \u2212 n₁).",
        why: "(27.4a) : f′ = 1,333 × 2\u00a0cm/0,333 = 8,0\u00a0cm. La vergence est de 16,7\u00a0m⁻¹. 6\u00a0cm serait la focale objet en valeur absolue, |f| = R/(n \u2212 1). Leçon « Distance focale d’un dioptre sphérique »." },
      focales: { prompt: "Un dioptre air-verre (n = 1,5) a une focale image f′ = 12\u00a0cm. Que vaut sa focale objet f ?",
        options: { a: "\u221212\u00a0cm", b: "\u221218\u00a0cm", c: "+8\u00a0cm", d: "\u22128\u00a0cm" },
        why: "(27.4b) : f′/n₂ = \u2212f/n₁, donc f = \u221212\u00a0cm/1,5 = \u22128\u00a0cm. Les deux foyers ne sont pas symétriques : la focale est plus longue du côté le plus réfringent. Leçon « Distance focale d’un dioptre sphérique »." },
      planconvexe: { prompt: "Une lentille plan-convexe de verre (n = 1,5) a une face de rayon 10\u00a0cm. Quelle est sa vergence dans l'air ?",
        options: { a: "5\u00a0m⁻¹ (f′ = 20\u00a0cm)", b: "10\u00a0m⁻¹ (f′ = 10\u00a0cm)", c: "15\u00a0m⁻¹", d: "Elle dépend du sens dans lequel on la monte." },
        hint: "Une face plane a 1/R = 0.",
        why: "(27.11) : V = 0,5 × (1/0,10\u00a0m \u2212 0) = 5\u00a0m⁻¹. Retournée, la lentille a la même focale ; seule son aberration sphérique change. Leçon « Distance focale d’une lentille »." },
      accolees: { prompt: "On accole une lentille mince de +5\u00a0δ et une lentille mince de \u22122\u00a0δ. Que vaut la focale de l'ensemble ?",
        options: { a: "3\u00a0m", b: "33\u00a0cm", c: "\u221250\u00a0cm", d: "10\u00a0cm" },
        hint: "Appliquez (27.12) deux fois : l'image donnée par la première sert d'objet à la seconde.",
        why: "Pour deux lentilles minces au contact, 1/p′ \u2212 1/p = V₁ + V₂ = 3\u00a0m⁻¹ : les vergences s'additionnent, f′ = 0,33\u00a0m. C'est l'intérêt de la dioptrie. Leçon « Distance focale d’une lentille »." },
      grandissement: { prompt: "Une lentille de focale 5\u00a0cm forme l'image d'un objet réel situé 7,5\u00a0cm devant elle. L'image est…",
        options: { a: "virtuelle, droite, 2 fois plus grande.", b: "réelle, droite, 3 fois plus grande.", c: "réelle, renversée, 2 fois plus grande, à 15\u00a0cm derrière la lentille.", d: "réelle, renversée, 2 fois plus petite." },
        why: "σ = \u22127,5 + 5 = \u22122,5\u00a0cm ; (27.13) : γ = 5/(\u22122,5) = \u22122. (27.16) : σ′ = 25/2,5 = 10\u00a0cm, p′ = 15\u00a0cm. Vérification par (27.15a) : 15/(\u22127,5) = \u22122. Leçon « Le grandissement »." },
      reduction: { prompt: "Avec une lentille de focale 10\u00a0cm, on veut une image réelle 4 fois plus petite que l'objet. Où placer l'objet ?",
        options: { a: "À 40\u00a0cm devant la lentille.", b: "À 12,5\u00a0cm devant la lentille.", c: "Au foyer objet.", d: "À 50\u00a0cm devant la lentille ; l'image sera à 12,5\u00a0cm derrière." },
        hint: "Image réelle d'un objet réel : γ = \u22121/4.",
        why: "(27.13) : σ = f′/γ = \u221240\u00a0cm, donc p = σ \u2212 f′ = \u221250\u00a0cm. (27.16) : σ′ = f′²/40\u00a0cm = 2,5\u00a0cm, p′ = 12,5\u00a0cm. Leçon « Le grandissement »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Statique des fluides » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      barrage: { prompt: "Un barrage-poids retient 20\u00a0m d'eau douce. Quelle force l'eau exerce-t-elle sur un mètre de largeur de barrage, et où s'applique-t-elle ?",
        options: { a: "Environ 1,96\u00a0MN, à 13,3\u00a0m sous la surface : ½\u202fρgh² et le centre de poussée à ⅔\u202fh.", b: "Environ 196\u00a0kN, à mi-hauteur : la pression au fond sur un mètre carré.", c: "Environ 3,9\u00a0MN, au pied du barrage, là où la pression est maximale.", d: "Environ 1,96\u00a0MN, à 10\u00a0m sous la surface, au milieu de la paroi." },
        hint: "La pression croît linéairement de 0 à ρgh : le profil est un triangle.",
        why: "F\u202f=\u202f½\u202f×\u202f1\u202f000\u202f×\u202f9,81\u202f×\u202f20²\u202f≈\u202f1,96\u202f×\u202f10⁶\u00a0N par mètre. Le profil triangulaire place la résultante aux deux tiers de la profondeur, 13,3\u00a0m. Leçon « Pression et forces de pression »." },
      manometre: { prompt: "Un tube en U contient du mercure ; une branche est reliée à un réservoir de gaz, l'autre est ouverte. Le mercure est 5,0\u00a0cm plus haut côté air libre. Quelle est la surpression du gaz ?",
        options: { a: "490\u00a0Pa : ρgh avec la masse volumique de l'eau.", b: "6,7\u00a0kPa : ρ_Hggh, avec ρ_Hg\u202f=\u202f13\u202f595\u00a0kg·m⁻³.", c: "67\u00a0kPa : le mercure multiplie la pression par 13,6 à chaque centimètre.", d: "Elle est négative : le mercure monte vers la basse pression." },
        why: "Deux points du mercure à la même hauteur sont à la même pression, puisque dp/dz = \u2212ρg. La dénivellation mesure donc l'écart : 13\u202f595\u202f×\u202f9,81\u202f×\u202f0,050\u202f≈\u202f6,7\u00a0kPa. Le mercure est poussé vers le côté de basse pression, ici l'air libre. Leçon « Relation fondamentale de la statique des fluides »." },
      gradient: { prompt: "Dans l'océan au repos, quelle est la force de pression résultante sur 1\u00a0L d'eau de mer, et pourquoi ne tombe-t-il pas ?",
        options: { a: "Nulle : la pression est la même tout autour du litre.", b: "1\u00a0atm\u202f×\u202fla surface du litre, vers l'intérieur : il est comprimé, pas soulevé.", c: "Environ 10\u00a0N vers le haut : \u2212grad\u202fp\u202fdτ, avec |grad\u202fp|\u202f=\u202fρg\u202f≈\u202f10,1\u00a0kPa par mètre ; elle compense son poids.", d: "Elle dépend de la profondeur : nulle en surface, maximale au fond." },
        hint: "Écrivez dF = \u2212grad\u202fp\u202fdτ, puis \u2212grad\u202fp\u202f+\u202fρg\u202f=\u202f0.",
        why: "L'équivalent volumique des forces de pression est \u2212grad\u202fp\u202fdτ. Au repos, grad\u202fp\u202f=\u202fρg : 1\u202f027\u202f×\u202f9,81\u202f≈\u202f10,1\u00a0kPa·m⁻¹, soit 10,1\u00a0N sur 10⁻³\u00a0m³, vers le haut, exactement le poids du litre, à toute profondeur." },
      moitie: { prompt: "Dans une atmosphère isotherme à 288\u00a0K, à quelle altitude la pression vaut-elle la moitié de celle du sol ?",
        options: { a: "8,4\u00a0km, la hauteur d'échelle H.", b: "4,2\u00a0km, la moitié de H.", c: "Il n'y en a pas : la pression ne s'annule jamais.", d: "5,8\u00a0km : H\u202fln\u202f2, avec H\u202f=\u202fRT/(Mg)\u202f=\u202f8,43\u00a0km." },
        why: "p\u202f=\u202fp₀\u202fe^(\u2212z/H) vaut p₀/2 pour z\u202f=\u202fH\u202fln\u202f2\u202f=\u202f0,693\u202f×\u202f8,43\u202f≈\u202f5,8\u00a0km. À H, la pression est divisée par e, pas par 2. Dans l'atmosphère type, plus froide, la moitié est atteinte un peu plus bas, vers 5,5\u00a0km." },
      mat: { prompt: "On calcule l'écart de pression entre le pied et le sommet d'un mât de 50\u00a0m en traitant l'air comme incompressible. Quelle erreur commet-on ?",
        options: { a: "Environ 0,3\u00a0% : Δz/(2H), avec H\u202f=\u202f8,4\u00a0km.", b: "Environ 6\u00a0% : l'air est un gaz, donc compressible.", c: "Aucune : sur 50\u00a0m, la loi linéaire est exacte.", d: "Environ 50\u00a0% : l'erreur vaut Δz/H multiplié par 100." },
        why: "Ce qui décide n'est pas la nature du fluide mais le rapport Δz/H\u202f=\u202f6\u202f×\u202f10⁻³. La loi linéaire se trompe de la moitié, 0,3\u00a0% : l'air est incompressible à cette échelle. Il cesse de l'être, à 1\u00a0% près, au-delà de 170\u00a0m." },
      helium: { prompt: "Si l'hélium (M\u202f=\u202f4,0\u00a0g·mol⁻¹) et le diazote (28\u00a0g·mol⁻¹) se répartissaient chacun à l'équilibre thermique, sans brassage, quel serait le rapport de leurs hauteurs d'échelle ?",
        options: { a: "1 : la hauteur d'échelle ne dépend que de T.", b: "7 : H\u202f=\u202fk_B T/(mg) est inversement proportionnelle à la masse moléculaire.", c: "√7\u202f≈\u202f2,6 : les molécules légères vont plus vite en √(1/m).", d: "1/7 : l'hélium, plus léger, reste plus près du sol." },
        why: "Le facteur de Boltzmann e^(\u2212mgz/(k_B T)) donne H\u202f∝\u202f1/m : 28/4\u202f=\u202f7. La vitesse moyenne varie bien en √(1/m), mais c'est l'énergie mgz comparée à k_B T qui fixe la répartition." },
      iceberg: { prompt: "Un bloc de glace (916,7\u00a0kg·m⁻³) flotte dans un lac d'eau douce. Quelle fraction de son volume émerge ?",
        options: { a: "10,7\u00a0% : comme en mer.", b: "91,7\u00a0% : le rapport des masses volumiques.", c: "8,3\u00a0% : 1\u202f\u2212\u202fρ_c/ρ_f\u202f=\u202f1\u202f\u2212\u202f0,917.", d: "Aucune : en eau douce, la glace coule." },
        why: "La fraction immergée vaut ρ_c/ρ_f : 0,917 ; il émerge 8,3\u00a0%. En mer (1\u202f027\u00a0kg·m⁻³), il émerge 10,7\u00a0% : l'eau salée, plus dense, porte mieux. Leçon « La poussée d'Archimède »." },
      ballon: { prompt: "Un ballon contient 10\u00a0L d'hélium à 288\u00a0K et 101\u202f325\u00a0Pa (ρ_He\u202f=\u202f0,169\u00a0kg·m⁻³). Quelle masse d'enveloppe et de ficelle peut-il soulever au plus, au niveau de la mer ?",
        options: { a: "12\u00a0g : la masse de l'air déplacé.", b: "1,7\u00a0g : la masse de l'hélium.", c: "Aucune : 10\u00a0L, c'est trop peu pour soulever quoi que ce soit.", d: "Environ 10,6\u00a0g : (ρ_air\u202f\u2212\u202fρ_He)V, l'air déplacé moins l'hélium." },
        hint: "La poussée porte aussi le gaz du ballon.",
        why: "La poussée de l'air vaut ρ_airVg, le poids de 12,3\u00a0g d'air. Elle doit porter l'hélium, 1,7\u00a0g, puis le reste : 12,3\u202f\u2212\u202f1,7\u202f≈\u202f10,6\u00a0g. Plus haut, l'air se raréfie et la poussée diminue avec lui, ce qui fixe l'altitude où le ballon s'arrête s'il ne se dilate plus." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

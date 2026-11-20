/* Épreuve de l'étape « Centre de masse et rotation plane » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      barycentre: { prompt: "Trois points : 1\u00a0kg en (0 ; 0), 2\u00a0kg en (3\u00a0m ; 0) et 1\u00a0kg en (0 ; 4\u00a0m). Où est leur centre de masse ?",
        options: { a: "En (1,5\u00a0m ; 1\u00a0m).", b: "En (1\u00a0m ; 1,33\u00a0m), le centre du triangle.", c: "En (3\u00a0m ; 4\u00a0m).", d: "En (1,5\u00a0m ; 2\u00a0m), le milieu de l'hypoténuse." },
        hint: "Moyenne des positions, pondérée par les masses : divisez par la masse totale, 4\u00a0kg.",
        why: "x = (1 × 0 + 2 × 3 + 1 × 0)/4 = 1,5\u00a0m ; y = (1 × 0 + 2 × 0 + 1 × 4)/4 = 1\u00a0m. Le centre géométrique du triangle serait le centre de masse de trois masses égales ; ici la masse de 2\u00a0kg tire G vers elle. Leçon « Le centre de masse »." },
      barque: { prompt: "Une personne de 60\u00a0kg marche de 4\u00a0m, d'un bout à l'autre d'une barque de 140\u00a0kg posée sur une eau calme. On néglige l'eau. De combien la barque recule-t-elle ?",
        options: { a: "De 4\u00a0m : elle recule d'autant que la personne avance.", b: "De 1,2\u00a0m.", c: "De 1,7\u00a0m, le rapport des masses multiplié par 4\u00a0m.", d: "De rien : les forces sont intérieures." },
        hint: "Le centre de masse de la personne et de la barque ne bouge pas. La personne avance de 4\u00a0m par rapport à la barque, pas par rapport à l'eau.",
        why: "Si la barque recule de x, la personne avance de 4 \u2212 x par rapport à l'eau. G immobile : 60 (4 \u2212 x) = 140 x, donc x = 240/200 = 1,2\u00a0m. Les forces sont bien intérieures : c'est pour cela que G ne bouge pas, pas la barque. Leçon « Le centre de masse »." },
      obus: { prompt: "Un obus de 10\u00a0kg retomberait à 400\u00a0m du tir. Il éclate en vol en deux morceaux de 4\u00a0kg et 6\u00a0kg, qui touchent le sol au même instant ; celui de 4\u00a0kg tombe à 100\u00a0m du tir. Où tombe l'autre ?",
        options: { a: "À 300\u00a0m.", b: "À 400\u00a0m, comme l'obus intact.", c: "À 600\u00a0m.", d: "À 700\u00a0m." },
        hint: "Jusqu'à l'impact simultané, seul le poids agit du dehors.",
        why: "Le centre de masse suit la parabole de l'obus intact et arrive à 400\u00a0m. 400 = (4 × 100 + 6 x)/10 donne x = 600\u00a0m. Si les morceaux tombaient à des instants différents, le sol agirait sur le premier et ce calcul ne vaudrait plus. Leçon « Le centre de masse »." },
      cle: { prompt: "Une force de 80\u00a0N s'exerce au bout d'une clé de 25\u00a0cm, en faisant un angle de 30° avec la clé. Quel couple exerce-t-elle sur l'écrou ?",
        options: { a: "20\u00a0N·m.", b: "17,3\u00a0N·m.", c: "320\u00a0N·m.", d: "10\u00a0N·m." },
        hint: "Seule la composante perpendiculaire à la clé fait tourner.",
        why: "τ = r F sin φ = 0,25 × 80 × sin 30° = 10\u00a0N·m. Le bras de levier vaut 0,25 × 0,5 = 12,5\u00a0cm. 20\u00a0N·m serait le couple à angle droit ; 17,3\u00a0N·m utilise le cosinus. Leçon « Rotation d'un solide »." },
      moteur: { prompt: "Un moteur fournit un couple de 20\u00a0N·m à un arbre qui tourne à 100\u00a0rad·s⁻¹. Quelle puissance fournit-il ?",
        options: { a: "2\u00a0kW.", b: "200\u00a0W.", c: "0,2\u00a0W.", d: "On ne peut pas savoir sans le rayon de l'arbre." },
        hint: "Divisez ΔW = τΔθ par Δt.",
        why: "P = τ ω = 20 × 100 = 2\u00a0000\u00a0W. Le rayon de l'arbre n'intervient pas : le couple contient déjà force et bras de levier. Leçon « Rotation d'un solide »." },
      corde: { prompt: "Deux patineurs se tiennent par une corde tendue et tournent ensemble autour de leur centre de masse. Ils tirent sur la corde pour se rapprocher. Que se passe-t-il ?",
        options: { a: "Ils tournent à la même vitesse angulaire : les forces sont intérieures.", b: "Ils tournent plus vite : le moment cinétique total se conserve et le moment d'inertie diminue.", c: "Ils tournent moins vite, car ils se rapprochent de l'axe.", d: "Ils cessent de tourner, car la corde n'est plus tendue de la même façon." },
        hint: "La tension de la corde est une force intérieure, portée par la droite qui joint les patineurs.",
        why: "La tension de la corde est intérieure et portée par la droite qui joint les patineurs : elle ne change pas le moment cinétique total. Leur moment d'inertie diminue, donc ω augmente. Les forces intérieures ne changent pas L, mais elles changent I. Leçons « Moment cinétique d'un solide » et « Conservation du moment cinétique »." },
      patineuse: { prompt: "Une patineuse, modélisée par un moment d'inertie de 4\u00a0kg·m² bras tendus (valeur de modèle), tourne à 6,28\u00a0rad·s⁻¹, puis ramène les bras jusqu'à 1,6\u00a0kg·m². Quel travail ses bras ont-ils fourni ?",
        options: { a: "Aucun : le moment cinétique se conserve.", b: "Environ 79\u00a0J, son énergie de départ.", c: "Environ 118\u00a0J.", d: "Environ 197\u00a0J." },
        hint: "Énergie de départ ½ I ω², puis L²/2I avec le même L.",
        why: "L = 4 × 6,28 = 25,1\u00a0kg·m²·s⁻¹. Ec passe de ½ × 4 × 6,28² ≈ 79\u00a0J à 25,1²/(2 × 1,6) ≈ 197\u00a0J : les bras ont fourni la différence, environ 118\u00a0J. ω est multiplié par 2,5, l'énergie aussi. Leçon « Conservation du moment cinétique »." },
      alignees: { prompt: "La quantité de mouvement totale d'un système isolé se conserve dès que les forces intérieures sont opposées deux à deux. Que faut-il de plus pour que son moment cinétique total se conserve ?",
        options: { a: "Rien de plus : les deux conservations ont les mêmes conditions.", b: "Que le système soit rigide.", c: "Que le centre de masse soit immobile.", d: "Que les deux forces de chaque paire soient portées par la droite qui joint les deux points." },
        hint: "Deux forces opposées n'ont des couples opposés que si elles ont le même bras de levier.",
        why: "Des forces opposées s'annulent dans la somme des forces. Leurs couples ne s'annulent que si elles ont le même bras de levier, donc sont portées par la même droite. La rigidité n'est pas requise : une patineuse ou un gaz conservent aussi leur moment cinétique. Leçon « Moment cinétique d'un solide »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

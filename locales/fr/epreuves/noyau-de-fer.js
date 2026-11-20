/* Épreuve de l'étape « Noyaux de fer et électroaimants » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      chaleur: { prompt: "Le noyau d'une bobine a un volume de 50\u00a0cm³, et la boucle d'hystérésis de son fer une aire de 200\u00a0J·m⁻³. Quelle puissance le noyau dissipe-t-il par hystérésis à 50\u00a0Hz ?",
        options: { a: "0,5\u00a0W : l'aire par cycle, multipliée par la fréquence et par le volume.", b: "10\u00a0kW : l'aire multipliée par la fréquence, sans le volume.", c: "0,01\u00a0J : l'aire multipliée par le volume, sans la fréquence.", d: "Rien : le fer revient au même état à chaque cycle." },
        hint: "Chaque cycle laisse dans chaque mètre cube l'aire de la boucle, en joules.",
        why: "∮ H dB\u00a0=\u00a0200\u00a0J·m⁻³ par cycle ; 200\u00a0×\u00a050\u00a0×\u00a05\u00a0×\u00a010⁻⁵\u00a0=\u00a00,5\u00a0W. Le fer revient au même état, mais la source a fourni un travail qui n'est stocké nulle part : il devient chaleur. Leçon « Inductances à noyau de fer »." },
      inductance: { prompt: "Un anneau de fer de μr\u00a0=\u00a0500, de section 4\u00a0cm² et de longueur moyenne 0,4\u00a0m porte 1\u202f000 spires. Que vaut son inductance pour de petits courants ?",
        options: { a: "Environ 1,3\u00a0mH.", b: "Environ 0,63\u00a0H.", c: "Environ 630\u00a0H.", d: "Environ 0,63\u00a0mH." },
        hint: "L\u00a0=\u00a0μr μ0 N² A/l, avec A en m².",
        why: "500\u00a0×\u00a01,26\u00a0×\u00a010⁻⁶\u00a0×\u00a010⁶\u00a0×\u00a04\u00a0×\u00a010⁻⁴/0,4 ≈ 0,63\u00a0H. Sans fer, μr\u00a0=\u00a01 : 1,3\u00a0mH. La formule ne vaut que pour un petit cycle autour d'un point : μr n'est pas une constante du fer. Leçon « Inductances à noyau de fer »." },
      saturation: { prompt: "On pousse le courant de la même bobine jusqu'à saturer le fer. Que devient l'inductance différentielle, celle que voit un petit signal alternatif ?",
        options: { a: "Elle reste égale à μr μ0 N² A/l.", b: "Elle devient infinie.", c: "Elle tombe vers μ0 N² A/l, celle de la bobine sans fer.", d: "Elle s'annule exactement." },
        why: "Saturé, le fer n'ajoute plus d'aimantation : dB/dH tend vers μ0, la pente du vide. L'inductance différentielle N² A (dB/dH)/l tend vers celle de l'anneau sans fer, des centaines de fois plus petite. Leçon « Inductances à noyau de fer »." },
      entrefer: { prompt: "Un électroaimant a une culasse de 0,4\u00a0m, un entrefer de 1\u00a0mm, et un fer qu'on suppose linéaire avec μr\u00a0=\u00a02\u202f000. Combien d'ampères-tours faut-il pour 1,2\u00a0T dans l'entrefer ?",
        options: { a: "Environ 190\u00a0A·tours : la culasse seule.", b: "Environ 380\u00a0kA·tours : la culasse sans le fer.", c: "Environ 950\u00a0A·tours : l'entrefer seul.", d: "Environ 1\u202f150\u00a0A·tours." },
        hint: "B (l1\u00a0+\u00a0l2/μr)/μ0\u00a0=\u00a0N I.",
        why: "1,2\u00a0×\u00a0(0,001\u00a0+\u00a00,4/2\u202f000)/(1,26\u00a0×\u00a010⁻⁶) ≈ 1\u202f150\u00a0A. L'entrefer, quatre cents fois plus court que la culasse, en prend plus des quatre cinquièmes. Leçon « Électroaimants »." },
      portance: { prompt: "Un électroaimant en U touche une plaque d'acier par deux faces polaires de 20\u00a0cm² chacune, où le champ vaut 1,5\u00a0T. Quelle force exerce-t-il sur la plaque ?",
        options: { a: "Environ 3,6\u00a0kN, le poids de plus de 350\u00a0kg.", b: "Environ 1,8\u00a0kN : une seule face compte.", c: "Environ 7,2\u00a0kN : sans le facteur ½.", d: "Environ 2,4\u00a0kN : la force croît comme B, pas comme B²." },
        hint: "Chaque face tire avec B² S/(2μ0).",
        why: "B² S/(2μ0)\u00a0=\u00a02,25\u00a0×\u00a02\u00a0×\u00a010⁻³/(2,51\u00a0×\u00a010⁻⁶) ≈ 1,8\u00a0kN par face, 3,6\u00a0kN pour deux. Une rouille ou un jeu de quelques dixièmes de millimètre fait chuter B, et la force comme B². Leçon « Électroaimants »." },
      aimant: { prompt: "On sature un circuit de fer à entrefer, puis on coupe le courant. Pourquoi faut-il un matériau à cycle large pour en faire un bon aimant permanent ?",
        options: { a: "Parce qu'un cycle large réduit les pertes par hystérésis.", b: "Parce que l'entrefer impose dans le fer un H opposé à B : le point de fonctionnement est dans le deuxième quadrant, et seul un fort champ coercitif y garde un B élevé.", c: "Parce qu'un cycle large augmente la perméabilité.", d: "Parce que H est nul dans un aimant sans courant." },
        why: "Avec N I\u00a0=\u00a00, la droite de l'entrefer passe par l'origine avec une pente négative et coupe la branche descendante pour H\u00a0<\u00a00. Un cycle étroit donnerait un champ faible ; c'est l'inverse du noyau d'inductance, qui veut un cycle étroit pour chauffer peu. Leçons « Électroaimants » et « Inductances à noyau de fer »." },
      curieweiss: { prompt: "Un ferromagnétique a son point de Curie à 600\u00a0K. En champ faible, au-dessus de ce point, par combien sa susceptibilité est-elle multipliée quand on passe de 900\u00a0K à 660\u00a0K ?",
        options: { a: "Environ 1,4, le rapport des températures.", b: "Elle ne change pas.", c: "Environ 5.", d: "Environ 0,2." },
        hint: "La loi de Curie-Weiss remplace T par T\u00a0\u2212\u00a0Tc.",
        why: "M/H varie comme 1/(T\u00a0\u2212\u00a0Tc) : (900\u00a0\u2212\u00a0600)/(660\u00a0\u2212\u00a0600)\u00a0=\u00a05. La loi de Curie seule, en 1/T, aurait donné 1,4. Chaque moment aligné aide ses voisins à s'aligner. Leçon « Aimantation spontanée »." },
      echange: { prompt: "Le champ moyen avec λ\u00a0=\u00a0⅓ donne pour le nickel un point de Curie d'environ 0,24\u00a0K, contre environ 630\u00a0K mesurés. Quelle conclusion en tirer ?",
        options: { a: "Le modèle est faux sur toute la ligne : il n'y a pas d'aimantation spontanée.", b: "λ vaut 1 et non ⅓ : il suffit de changer la forme du trou.", c: "Le nickel des mesures était mal refroidi.", d: "La forme du modèle tient, mais l'alignement ne vient pas du champ magnétique des moments : il faudrait un champ local de près de mille teslas." },
        why: "Il faudrait λ de l'ordre de 900, soit k Tc/μB ≈ 930\u00a0T de champ local, quand tous les moments alignés n'en produisent qu'environ 1\u00a0T. L'alignement vient d'une interaction d'échange entre spins voisins, électrostatique et quantique. Leçon « Aimantation spontanée »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

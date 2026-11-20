/* Leçon « Matériaux ferromagnétiques » (Feynman II.37.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/materiaux-ferromagnetiques.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Matériaux ferromagnétiques",
    "crumb.jour": "Matériaux ferromagnétiques",
    "h1": "Matériaux ferromagnétiques",
    "lede": "Le même fer peut avoir un champ coercitif de quelques dixièmes d'ampère par mètre ou de dizaines de milliers. Ce n'est pas l'atome qui change, c'est la facilité avec laquelle les parois se déplacent. Un transformateur veut des parois libres, un aimant permanent des parois bloquées : les deux s'obtiennent par la composition, la structure et le traitement.",
    "tag.piste": "Électromagnétisme",
    "tag.prereq": "Prérequis : cycle d'hystérésis",
    "eq.max": "max",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "« Le fer » n'est pas un matériau",
    "s1.p1": "Deux nombres résument un cycle d'hystérésis : l'induction rémanente <var>B</var><sub>r</sub>, où le cycle coupe l'axe des <var>B</var>, et le champ coercitif <var>H</var><sub>c</sub>, où il coupe l'axe des <var>H</var>. Voici les valeurs typiques d'un tableau des années 1960, converties en SI, avec l'énergie perdue par cycle et par mètre cube pour un cycle qui monte jusqu'à <var>B</var><sub>r</sub>, et la puissance correspondante à 50\u00a0Hz :",
    "mat.noms": { supermalloy: "Supermalloy", silicium: "Acier au silicium de transformateur", armco: "Fer Armco", alnico: "Alnico V" },
    "mat.ligne": "<var>B</var><sub>r</sub> {Br} · <var>H</var><sub>c</sub> {Hc} · {W} par cycle · {P}",
    "s1.p2": "Le champ coercitif varie d'un facteur supérieur à cent mille entre le premier et le dernier, pour des matériaux faits surtout de fer et de nickel. Les propriétés magnétiques d'usage ne sont pas celles des atomes : elles dépendent de la facilité avec laquelle les parois se déplacent, donc des défauts, des contraintes, des impuretés et de la structure cristalline.",
    "sys.title": "Décrire le système avant d'appliquer la loi",
    "sys1.body": "La structure compte autant que la composition. Le fer pur est cubique centré au-dessous de 1\u00a0185\u00a0K <span class=\"aux\">(912\u00a0°C)</span> ; au-dessus, il devient cubique à faces centrées, mais il a déjà perdu son ferromagnétisme à 1\u00a0044\u00a0K <span class=\"aux\">(771\u00a0°C)</span>, son point de Curie. Un acier inoxydable à 18\u00a0% de chrome et 8\u00a0% de nickel garde la structure cubique à faces centrées jusqu'à la température ambiante, et il est en grande partie non magnétique : avec presque les mêmes atomes, un autre arrangement supprime l'aimantation spontanée.",

    "s2.sec": "2 · Les matériaux doux",
    "s2.h2": "Des parois qui glissent",
    "s2.p1": "Dans un transformateur ou un moteur, le fer parcourt son cycle cinquante fois par seconde, et chaque cycle laisse dans le métal la chaleur ∮<var>H</var>\u00a0d<var>B</var>, l'aire du cycle étudiée dans « Inductances à noyau de fer ». Pour un cycle de forme régulière, d'amplitude <var>B</var><sub>m</sub> :",
    "val.pertes": "Approximation : les deux branches sont séparées de 2<var>H</var><sub>c</sub> à chaque valeur de <var>B</var>, ce qui est exact pour un cycle dont la branche montante est l'image de la descendante décalée, et vaut à un facteur de l'ordre de 1 pour un cycle réel. Les courants de Foucault, qui s'y ajoutent et croissent avec la fréquence, sont laissés de côté.",
    "s2.p2": "Il faut donc un <var>H</var><sub>c</sub> aussi petit que possible : peu de défauts, peu de contraintes, un métal bien recuit. Deux effets gênent encore le glissement des parois. L'anisotropie, d'abord : le fer préfère les arêtes du cube, [100], le nickel les diagonales, [111] ; dans un alliage des deux, il existe une composition où la préférence s'annule. La magnétostriction, ensuite : elle change de signe entre le fer et le nickel et s'annule vers 80\u00a0% de nickel. Les permalloys, entre 70 et 80\u00a0% de nickel, se placent là où les deux sont petites. Une paroi y traverse le cristal sans presque rien coûter.",
    "s2.p3": "Ces alliages sont fragiles à leur manière : une déformation au-delà de la limite d'élasticité crée des dislocations qui accrochent les parois, et les propriétés s'effondrent. Un recuit les rétablit. Il faut donc les mettre en forme avant le dernier recuit, et ne plus les tordre ensuite.",

    "s3.sec": "3 · Les matériaux durs",
    "s3.h2": "Des parois bloquées, et un aimant sur un entrefer",
    "s3.p1": "Un aimant permanent veut l'inverse : des parois si bien bloquées qu'un champ opposé ne puisse pas les déplacer. L'alnico V en est l'exemple : environ 51\u00a0% de fer, 8\u00a0% d'aluminium, 14\u00a0% de nickel, 24\u00a0% de cobalt et 3\u00a0% de cuivre. Il contient une seconde phase précipitée, des contraintes, des grains alignés, et on le refroidit dans un champ pendant sa fabrication. Son cycle est environ 700 fois plus large que celui d'un fer doux. Un aimant sert à créer un champ dans un entrefer : un aimant de longueur <var>l</var><sub>m</sub> fermé par du fer doux sur un entrefer <var>l</var><sub>e</sub>, sans aucun courant, obéit à (36.27) avec <var>N</var><var>I</var>\u00a0=\u00a00 :",
    "val.36.27b": "Approximation : celle de (36.27), fer doux de perméabilité infinie, même section pour l'aimant et l'entrefer, ni fuites ni épanouissement du flux. Le champ <var>H</var> dans l'aimant est opposé à <var>B</var> : l'aimant travaille dans le second quadrant de son cycle, sur la branche descendante.",
    "s3.p2": "Le point de fonctionnement est l'intersection de cette droite avec la branche descendante. Le produit \u2212<var>B</var><var>H</var> y mesure l'énergie qu'un mètre cube d'aimant entretient dans l'entrefer, et il passe par un maximum, (<var>B</var><var>H</var>)<sub>max</sub>, la meilleure façon d'utiliser l'aimant. Pour une branche qui reste au-dessus de la droite joignant (\u2212<var>H</var><sub>c</sub>, 0) à (0, <var>B</var><sub>r</sub>) :",
    "val.bhmax": "Exacte : la borne haute est le rectangle sous lequel reste toute branche ; la borne basse est le maximum de \u2212<var>B</var><var>H</var> sur la droite, atteint en son milieu. Pour l'alnico 5 d'aujourd'hui, 1,28\u00a0T et 51\u00a0kA·m⁻¹, le rectangle vaut 65\u00a0kJ·m⁻³ et la droite 16\u00a0kJ·m⁻³ ; la mesure donne 43,8\u00a0kJ·m⁻³.",
    "fig.aria": "Second quadrant de la branche descendante de l'alnico 5, droite de l'entrefer et point de fonctionnement.",
    "fig.legend.branche": "branche descendante (modèle ajusté)",
    "fig.legend.droite": "droite de l'entrefer, (36.27b)",
    "fig.legend.bh": "hyperbole \u2212<var>B</var><var>H</var>\u00a0=\u00a0(<var>B</var><var>H</var>)<sub>max</sub>",
    "fig.r": "Rapport <var>l</var><sub>e</sub>/<var>l</var><sub>m</sub>",
    "fig.ax.x": "H (kA·m⁻¹)",
    "fig.ax.y": "B (T)",
    "fig.k.b": "Induction dans l'entrefer",
    "fig.f.b": "<var>B</var>, avec un champ opposé de {H} dans l'aimant",
    "fig.k.bh": "Produit \u2212B·H",
    "fig.f.bh": "{p}\u00a0% du (<var>B</var><var>H</var>)<sub>max</sub> de l'alnico 5",
    "fig.k.vol": "Énergie dans l'entrefer",
    "fig.f.vol": "par mètre cube d'aimant, \u2212<var>B</var><var>H</var>/2 : c'est elle que le (<var>B</var><var>H</var>)<sub>max</sub> rend maximale",
    "fig.caption": "Un entrefer étroit rend la droite raide : l'aimant travaille près de sa rémanence, mais l'entrefer contient peu d'énergie. Un entrefer large la couche : le champ opposé approche <var>H</var><sub>c</sub> et <var>B</var> s'effondre. Entre les deux, la droite touche l'hyperbole au point du (<var>B</var><var>H</var>)<sub>max</sub>. La branche est un modèle en tangente hyperbolique, ajusté pour redonner <var>B</var><sub>r</sub>, <var>H</var><sub>c</sub> et (<var>B</var><var>H</var>)<sub>max</sub> de l'alnico 5 ; sa forme exacte entre ces points n'est pas celle d'une mesure.",
    "s3.p3": "Choisir un matériau, c'est donc choisir un cycle. Un noyau qui travaille en alternatif veut une aire minimale : <var>H</var><sub>c</sub> petit, des parois libres. Un aimant veut un (<var>B</var><var>H</var>)<sub>max</sub> élevé et un <var>H</var><sub>c</sub> qui résiste aux champs opposés : des parois bloquées, ou pas de parois du tout dans des grains assez fins pour rester d'un seul domaine. Les aimants modernes au néodyme, évoqués dans « Le champ H », poussent cette logique beaucoup plus loin.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Inventer des cycles",
    "hist.intro": "Au début du vingtième siècle, les laboratoires du téléphone cherchaient des matériaux doux, et les métallurgistes japonais des aimants durs.",
    "hist.events": {
      elmen: { who: "Gustav Elmen", what: "invente le permalloy pour le réseau téléphonique Bell : un alliage d'environ 80 % de nickel et 20 % de fer, de très haute perméabilité.", context: "Il sert d'abord à la compensation inductive des câbles télégraphiques. Elmen et Arnold le décrivent en 1923." },
      honda: { who: "Kotaro Honda", what: "met au point un acier pour aimants au cobalt, au tungstène et au chrome, avec 30 à 40 % de cobalt.", context: "Selon une page d'histoire de riken.jp, il résiste environ trois fois mieux à la désaimantation que l'acier au tungstène, l'aimant de l'époque." },
      mishima: { who: "Tokushichi Mishima", what: "découvre qu'en ajoutant de l'aluminium à un acier au nickel non magnétique, on obtient un acier fortement magnétique.", context: "Cet alliage fer-nickel-aluminium est l'ancêtre des alnicos." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      micros: { name: "Les aimants d'alnico", text: "L'alnico reste employé dans des moteurs, des capteurs, des microphones, des haut-parleurs et les micros de guitare électrique, même si les aimants aux terres rares le remplacent souvent. Son atout est thermique : un point de Curie vers 1\u00a0130\u00a0K et une température d'usage qui peut monter vers 800\u00a0K. L'énergie d'échange, de l'ordre de <var>k</var><var>T</var><sub>c</sub>, y est grande, et l'ordre magnétique résiste à la chaleur." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      fer: { prompt: "Le supermalloy et l'alnico V sont faits surtout de fer et de nickel, et leurs champs coercitifs diffèrent d'un facteur supérieur à cent mille. Pourquoi ?",
        options: { a: "Parce que leurs atomes portent des moments très différents.", b: "Parce que la facilité de déplacement des parois dépend des défauts, des contraintes et de la structure, pas des atomes.", c: "Parce que leurs points de Curie diffèrent d'un facteur cent mille.", d: "Parce que l'un est diamagnétique." },
        why: "Le champ coercitif est le champ qu'il faut pour déplacer ou retourner les domaines ; il dépend de la microstructure, que la composition et le traitement fixent." },
      inox: { prompt: "Un acier inoxydable à 18 % de chrome et 8 % de nickel est en grande partie non magnétique, alors qu'il contient surtout du fer. Pourquoi ?",
        options: { a: "Parce que le chrome est diamagnétique et compense le fer.", b: "Parce que son point de Curie est bien supérieur à la température ambiante.", c: "Parce que ses domaines sont trop petits pour être vus.", d: "Parce qu'il garde la structure cubique à faces centrées, qui n'a pas d'aimantation spontanée dans ces conditions." },
        why: "Le fer cubique centré est ferromagnétique ; la structure cubique à faces centrées ne l'est pas. Le nickel stabilise cette structure jusqu'à la température ambiante." },
      permalloy: { prompt: "Pourquoi les permalloys, entre 70 et 80 % de nickel, sont-ils des matériaux si doux ?",
        options: { a: "Parce que l'anisotropie et la magnétostriction y sont presque nulles, et que rien n'y retient les parois.", b: "Parce que le nickel n'a pas de point de Curie.", c: "Parce qu'ils sont isolants, sans courants de Foucault.", d: "Parce qu'ils ne contiennent aucun domaine." },
        why: "Le fer et le nickel préfèrent des directions différentes et leurs magnétostrictions sont de signes opposés : l'alliage se place là où les deux s'annulent presque." },
      pertes: { prompt: "Un acier de transformateur a un champ coercitif d'environ 4 A·m⁻¹ et travaille jusqu'à 1,2 T. Quelle énergie l'hystérésis dissipe-t-elle à peu près par cycle et par mètre cube ?",
        options: { a: "Environ 0,02 J·m⁻³.", b: "Environ 5 J·m⁻³.", c: "Environ 20 J·m⁻³, soit de l'ordre du kilowatt par mètre cube à 50 Hz.", d: "Environ 2\u00a0×\u00a010⁴ J·m⁻³." },
        hint: "W\u00a0≈\u00a04\u00a0Hc\u00a0Bm.",
        why: "4\u00a0×\u00a04\u00a0×\u00a01,2\u00a0≈\u00a019 J·m⁻³ par cycle ; cinquante cycles par seconde donnent environ 1 kW·m⁻³, à quoi s'ajoutent les courants de Foucault." },
      entrefer: { prompt: "On élargit progressivement l'entrefer d'un aimant permanent. Que devient le point de fonctionnement sur la branche descendante ?",
        options: { a: "Il remonte vers la rémanence.", b: "Il descend vers le champ coercitif : le champ opposé dans l'aimant grandit et l'induction baisse.", c: "Il ne bouge pas : l'aimant impose B.", d: "Il passe dans le premier quadrant." },
        why: "La droite B\u00a0=\u00a0\u2212μ0(lm/le)H se couche quand l'entrefer s'élargit : elle coupe la branche plus près de Hc." },
      choix: { prompt: "On doit choisir entre deux matériaux : l'un a un cycle étroit et haut, l'autre un cycle large. Lequel pour le noyau d'un transformateur, lequel pour un aimant de haut-parleur ?",
        options: { a: "Le cycle large pour les deux, car il stocke plus d'énergie.", b: "Le cycle étroit pour les deux, car il perd moins.", c: "Le cycle large pour le transformateur, l'étroit pour l'aimant.", d: "Le cycle étroit pour le transformateur, le large pour l'aimant." },
        why: "Le transformateur parcourt son cycle en permanence : son aire est une perte. L'aimant reste sur sa branche descendante et doit résister aux champs opposés : il lui faut un Hc élevé." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol.\u00a0II, chap.\u00a037, §37-4, tableau 37-1 converti en SI (texte original en anglais). Fer, structures et point de Curie : Wikipédia, « Allotropes of iron ». Alnico 5 : Wikipédia, « Alnico », tableau des propriétés et usages. Permalloy : Wikipédia, « Permalloy ». Honda : riken.jp, page d'histoire de son acier, et l'article de Wikipédia en anglais sur cet acier. Mishima : l'article de Wikipédia en anglais sur son acier. Branche de l'alnico et bornes du (<var>B</var><var>H</var>)<sub>max</sub> : calculs propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

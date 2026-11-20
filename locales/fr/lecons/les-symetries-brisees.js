/* Leçon « Les symétries brisées » (Feynman I.52.9) : textes en français.
   Une autre langue = locales/<langue>/lecons/les-symetries-brisees.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les symétries brisées",
    "crumb.jour": "Symétries brisées",
    "h1": "Les symétries brisées",
    "lede": "Beaucoup de symétries de la nature sont presque exactes. Les forces nucléaires traitent le proton et le neutron de la même façon, mais la répulsion électrique ne touche que les protons. Le miroir et l'échange de la matière et de l'antimatière, réunis, semblaient exacts ; ils ne le sont pas non plus. Une symétrie brisée se mesure : on chiffre de combien elle manque.",
    "tag.piste": "Fondements et outils",
    "tag.prereq": "Prérequis : « L'antimatière »",

    "s1.sec": "Le proton et le neutron",
    "s1.h2": "Une symétrie que l'électricité dérange",
    "s1.p1": "Les forces nucléaires entre deux protons, entre deux neutrons, entre un proton et un neutron, sont à peu près les mêmes. Échanger partout protons et neutrons ne changerait presque rien aux noyaux. Presque : les protons sont chargés et se repoussent, les neutrons non. La force électrique est bien plus faible que la force nucléaire à ces distances, si bien que la symétrie n'est brisée qu'un peu.",
    "s1.p2": "Le test le plus net compare deux noyaux miroirs, où l'on a échangé protons et neutrons. Le tritium (un proton, deux neutrons) est lié par {bh}, l'hélium 3 (deux protons, un neutron) par {bhe} : un écart de {d}, alors qu'il y a plus de 7 MeV de liaison de chaque côté. Si la force nucléaire ne fait pas la différence, l'écart vient de la répulsion entre les deux protons de l'hélium 3. Pour une boule uniformément chargée de rayon {R}, elle vaut {m}. Pour une paire de noyaux miroirs de nombre de masse <var>A</var> impair, avec <var>Z</var> = (<var>A</var> + 1)/2 protons contre <var>Z</var> \u2212 1 :",
    "val.coulomb": "Approximation : noyau en boule uniformément chargée de rayon <var>r</var><sub>0</sub><var>A</var><sup>1/3</sup>, <var>r</var><sub>0</sub> ≈ 1,2\u00a0fm, même rayon pour les deux noyaux, énergie Z(Z \u2212 1) des paires de protons. Pour <var>A</var> = 3, le modèle donne 1,0\u00a0MeV quand l'écart mesuré vaut 0,76\u00a0MeV ; des calculs avec des forces nucléaires réalistes trouvent environ 0,64\u00a0MeV d'énergie coulombienne. Le reste vient d'une petite différence entre les forces nucléaires elles-mêmes.",

    "s2.sec": "Mesurer une brisure",
    "s2.h2": "Combien manque-t-il à la symétrie ?",
    "s2.p1": "La courbe donne l'écart coulombien entre deux noyaux miroirs, selon <var>A</var>. Il croît comme <var>A</var><sup>2/3</sup>. Rapporté à l'énergie de liaison totale, environ 8\u00a0MeV par nucléon au-delà des noyaux légers, il reste de quelques pour cent : c'est la mesure de la brisure. Le point est la mesure pour le tritium et l'hélium 3.",
    "fig.aria": "Écart d'énergie coulombienne entre noyaux miroirs selon le nombre de masse",
    "fig.x": "nombre de masse A",
    "fig.y": "écart (MeV) ; part de la liaison (%), en tirets",
    "fig.mesure": "³H et ³He, mesuré",
    "fig.l.de": "écart coulombien",
    "fig.l.r": "part de la liaison",
    "fig.a": "Paire de noyaux miroirs",
    "fig.paire": "A = {A} : {Z} protons contre {N}",
    "fig.k.de": "Écart coulombien",
    "fig.f.de": "boule de rayon {R}",
    "fig.k.b": "Liaison totale",
    "fig.f.b": "environ 8 MeV par nucléon",
    "fig.k.r": "Brisure relative",
    "fig.f.r": "écart rapporté à la liaison",
    "fig.caption": "Pour <var>A</var> = 41, l'écart atteint 8,4\u00a0MeV, mais la liaison dépasse 300\u00a0MeV : environ 2,5\u00a0%. La symétrie entre proton et neutron décrit les noyaux à quelques pour cent près, et l'on sait exactement ce qui la brise.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Une échelle des brisures",
    "s3.p1": "Chaque symétrie approchée se décrit par un nombre sans dimension : ce qui la brise, rapporté à ce qu'elle décrit. Petit, on peut appliquer la symétrie et corriger ensuite ; d'ordre un, elle n'a plus de sens.",
    "echelle.rows": {
      isospin: "masses : (m<sub>n</sub> \u2212 m<sub>p</sub>)/m<sub>p</sub>, le neutron un peu plus lourd que le proton",
      coulomb: "énergie coulombienne de deux noyaux miroirs rapportée à leur liaison, pour A = 41 (modèle de la boule)",
      cp: "CP : part des kaons neutres à longue durée de vie qui se désintègrent en deux pions chargés, environ une sur 500",
      parite: "P dans la désintégration β : coefficient |a| du cobalt 60, noyaux tous alignés, électrons les plus rapides",
    },
    "s3.p2": "La symétrie entre proton et neutron est brisée au millième ou au centième ; CP au millième ; P, dans l'interaction faible, l'est entièrement. Une loi qui respecte une symétrie à 10<sup>\u22123</sup> près s'applique sans hésiter à une mesure à 1\u00a0% ; pas à une mesure à 10<sup>\u22124</sup>.",

    "s4.sec": "Après 1957",
    "s4.h2": "CP aussi",
    "s4.p1": "En 1964, à Brookhaven, James Cronin, Val Fitch et leurs collègues observent que des kaons neutres de longue durée de vie se désintègrent parfois en deux pions. Si CP était exacte, ces kaons, dont les désintégrations en pions seuls donnent normalement trois pions, ne le pourraient pas : c'est l'énigme τ–θ de « La parité n'est pas conservée », un cran plus loin. Environ une désintégration sur 500 donne deux pions chargés. Les instructions au correspondant lointain de « L'antimatière » peuvent donc être complétées : la matière se distingue de l'antimatière par une expérience, sans convention.",
    "s4.p2": "Il reste une symétrie : CPT, le miroir, l'échange de charge et le renversement du temps ensemble. Elle découle de principes très généraux, la relativité et la mécanique quantique des champs, et aucune expérience ne l'a prise en défaut. Puisque CPT tient et que CP ne tient pas, T seul ne tient pas non plus : les lois microscopiques distinguent un peu le passé de l'avenir.",
    "s4.p3": "Pourquoi la nature est-elle presque symétrique ? On n'en sait rien. Les Grecs voyaient dans le cercle la courbe parfaite : les orbites des planètes sont presque des cercles, et c'est la dynamique de Newton qui a expliqué pourquoi elles ne le sont pas tout à fait. Peut-être les symétries presque exactes attendent-elles une explication du même genre. À Nikkō, au Japon, le portail Yōmeimon a douze piliers, et le motif de l'un d'eux est sculpté à l'envers, exprès : ce qui atteint la perfection, dit la tradition, ne peut plus que décliner. Feynman, qui raconte qu'il s'agissait de ne pas rendre les dieux jaloux de la perfection humaine, suggère en souriant que Dieu a peut-être fait les lois presque symétriques pour la même raison.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des symétries qu'on trouve, puis qu'on brise",
    "hist.intro": "La symétrie entre proton et neutron est proposée dès la découverte du neutron ; les symétries discrètes tombent l'une après l'autre, sauf CPT.",
    "hist.events": {
      heisenberg: { who: "Werner Heisenberg", what: "propose de voir le proton et le neutron comme deux états d'une même particule.", context: "Les forces nucléaires ne distinguent pas les deux états ; seule l'électricité le fait." },
      wigner: { who: "Eugene Wigner", what: "nomme « spin isotopique » cette symétrie entre proton et neutron.", context: "Le mot vient de l'analogie mathématique avec le spin : deux états, et des opérations qui les mélangent, comme les rotations mélangent les deux orientations d'un spin ½." },
      cpt: { who: "Gerhart Lüders et Wolfgang Pauli", what: "démontrent que toute théorie relativiste des champs est symétrique par CPT.", context: "Julian Schwinger l'avait déjà rencontrée en 1951 ; John Bell la démontre aussi à la même époque. La preuve ne dit rien de C, P ou T séparément." },
      cronin: { who: "James Christenson, James Cronin, Val Fitch et René Turlay", what: "observent au synchrotron de Brookhaven la désintégration en deux pions du kaon neutre de longue durée de vie.", context: "Environ 45 désintégrations sur quelques dizaines de milliers : la symétrie CP est violée. Cronin et Fitch reçoivent le prix Nobel en 1980." },
      sakharov: { who: "Andreï Sakharov", what: "relie la violation de CP à l'excès de matière sur l'antimatière dans l'Univers.", context: "Il faut, écrit-il, des processus qui ne conservent pas le nombre de baryons, une violation de CP et un écart à l'équilibre thermique pendant l'expansion de l'Univers primitif. L'article, soumis en septembre 1966, paraît en 1967." },
      bmesons: { who: "Expériences BaBar (Stanford, Californie) et Belle (Japon)", what: "observent une grande violation de CP dans les désintégrations des mésons B neutres.", context: "Les deux collaborations publient en août dans Physical Review Letters. BaBar mesure sin 2β = 0,59 ± 0,15." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      lhcb: { name: "Compter les différences entre matière et antimatière", text: "Au CERN, l'expérience LHCb mesure la violation de CP dans de très grands nombres de désintégrations. Le 21 mars 2019, elle annonce la première observation dans les mésons charmés : l'asymétrie entre le D<sup>0</sup> et son antiparticule n'est pas la même pour la désintégration en deux kaons et pour la désintégration en deux pions ; la différence des deux asymétries vaut \u22120,154 ± 0,029\u00a0%, à 5,3 écarts types de zéro. Les violations de CP connues paraissent trop faibles pour expliquer l'excès de matière dans l'Univers : on en cherche d'autres." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      nucleaire: { prompt: "Pourquoi la symétrie entre proton et neutron n'est-elle qu'approchée ?",
        options: { a: "Parce que les forces nucléaires distinguent fortement les deux.", b: "Parce que la force électrique, bien plus faible que la force nucléaire, ne s'exerce qu'entre protons.", c: "Parce que le neutron est instable.", d: "Parce que le proton est une antiparticule." },
        why: "La force nucléaire est presque la même pour pp, nn et np. La répulsion électrique ne touche que les protons : elle brise la symétrie, mais peu, parce qu'elle est faible devant la liaison nucléaire." },
      miroirs: { prompt: "Le tritium est lié par 8,48 MeV, l'hélium 3 par 7,72 MeV. Qu'en conclure ?",
        options: { a: "Que le neutron est plus fortement lié que le proton par la force nucléaire, d'un facteur deux.", b: "Que la symétrie est fausse.", c: "Que la liaison ne dépend pas des charges.", d: "Que l'écart de 0,76 MeV vient pour l'essentiel de la répulsion des deux protons de l'hélium 3, environ 10 % de la liaison." },
        why: "Les deux noyaux sont images l'un de l'autre par l'échange proton-neutron. Si la force nucléaire est symétrique, l'écart est coulombien. Un calcul réaliste en donne environ 0,64 MeV ; le reste mesure une petite asymétrie de la force nucléaire elle-même." },
      croissance: { prompt: "Selon le modèle de la boule chargée, comment l'écart coulombien entre noyaux miroirs varie-t-il avec A ?",
        options: { a: "Comme A^(2/3) : il croît, mais moins vite que la liaison, proportionnelle à A.", b: "Comme A² : il finit par dépasser la liaison.", c: "Il est constant.", d: "Comme 1/A." },
        hint: "ΔE_C ∝ (A \u2212 1)/R et R ∝ A^(1/3).",
        why: "(A \u2212 1)/A^(1/3) ≈ A^(2/3). La liaison croît comme A : la brisure relative décroît lentement, de 4 % pour A = 3 à 2 % vers A = 100 dans ce modèle." },
      kaon: { prompt: "Qu'ont observé Cronin, Fitch et leurs collègues en 1964 ?",
        options: { a: "Que la parité est conservée dans les kaons.", b: "Que le kaon est sa propre antiparticule.", c: "Que des kaons neutres de longue durée de vie se désintègrent parfois en deux pions, ce que CP interdirait.", d: "Que l'antimatière tombe vers le haut." },
        why: "Quand le kaon neutre de longue durée de vie ne donne que des pions, il en donne normalement trois. Une désintégration sur 500 environ donne deux pions chargés, état de CP opposé : CP n'est pas exacte." },
      cpt: { prompt: "CPT est une symétrie, CP ne l'est pas. Que peut-on dire de T ?",
        options: { a: "T n'est pas une symétrie exacte non plus : sinon CPT et T donneraient CP.", b: "T est exacte.", c: "On ne peut rien en dire.", d: "T est violée au même degré que P." },
        why: "Si CPT et T étaient exactes, leur produit, CP, le serait. CP ne l'est pas, donc T non plus. Les lois microscopiques distinguent un peu le passé de l'avenir." },
      univers: { prompt: "Pourquoi la violation de CP intéresse-t-elle les cosmologistes ?",
        options: { a: "Parce qu'elle explique l'expansion de l'Univers.", b: "Parce qu'elle crée la matière noire.", c: "Parce qu'elle fixe la vitesse de la lumière.", d: "Parce que, sans elle, la matière et l'antimatière auraient été produites à égalité, et l'excès de matière d'aujourd'hui serait inexplicable." },
        why: "Sakharov l'a montré en 1967 : pour qu'un Univers symétrique au départ finisse avec plus de matière que d'antimatière, il faut une violation de CP, des processus qui changent le nombre de baryons et un écart à l'équilibre. Les violations de CP mesurées semblent trop faibles : on en cherche d'autres." },
      grec: { prompt: "Quelle leçon Feynman tire-t-il des orbites presque circulaires ?",
        options: { a: "Que les orbites sont exactement des cercles.", b: "Qu'une symétrie presque exacte appelle une explication : pour les orbites, c'est la dynamique de Newton qui l'a donnée.", c: "Que la symétrie circulaire est brisée par la relativité.", d: "Que les Grecs avaient tort de mesurer les orbites." },
        why: "Le cercle parfait n'explique pas des orbites presque circulaires ; la loi de la gravitation explique à la fois la forme et l'écart. Les symétries presque exactes des lois attendent peut-être une explication du même genre." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. I, chap. 52, §52-9 (texte original en anglais), complété pour la violation de CP, postérieure. Notations SI. Énergies de liaison du tritium et de l'hélium 3, énergie coulombienne calculée : Triangle Universities Nuclear Laboratory, évaluation des données nucléaires, A = 3. Rayon nucléaire et liaison par nucléon : cours de physique nucléaire de l'université du Tennessee. Isospin : Heisenberg 1932, nom donné par Wigner en 1937. CPT : Lüders, Pauli, Bell, Schwinger. J. H. Christenson, J. W. Cronin, V. L. Fitch et R. Turlay, <i>Phys. Rev. Lett.</i> 13, 138 (1964) ; <i>CERN Courier</i>, « CP violation's early days ». A. D. Sakharov, lettre au <i>Journal de physique expérimentale et théorique</i> soviétique, vol. 5, p. 24 (1967). BaBar et Belle : <i>Physics Today</i>, 2001. LHCb : <i>CERN Courier</i>, mai 2019. Masses du proton et du neutron : CODATA 2022. Portail Yōmeimon : notice du ministère japonais du Territoire, des Infrastructures, des Transports et du Tourisme. Graphe et calculs propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les jonctions de semi-conducteurs » (Feynman III.14.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/jonctions-semi-conducteurs.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les jonctions de semi-conducteurs",
    "crumb.jour": "Jonctions",
    "h1": "Les jonctions de semi-conducteurs",
    "lede": "Collez une région de type p contre une région de type n dans le même cristal. Les électrons et les trous se ruent de l'autre côté, puis s'arrêtent : une tension d'un peu moins d'un volt est apparue à la frontière, et la retient. Cette tension, on ne peut pas la mesurer avec un voltmètre, et pourtant tous les composants électroniques en dépendent.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : l'étape « Électrons et trous »",
    "eq.coten": "côté n",
    "eq.cotep": "côté p",
    "eq.ln": "ln",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Une frontière entre deux dopages",
    "s1.p1": "Un même cristal de silicium est dopé p d'un côté, n de l'autre, avec une frontière nette. Du côté p, beaucoup de trous, très peu d'électrons ; du côté n, l'inverse, comme dans la leçon « Les semi-conducteurs dopés ». Les porteurs diffusent là où ils sont rares : des trous passent du côté n, des électrons du côté p.",
    "s1.p2": "Mais en partant, ils laissent derrière eux les ions des dopants, fixes : le côté p, qui a perdu des trous, se charge négativement ; le côté n positivement. Une différence de potentiel <var>V</var> apparaît, qui repousse les porteurs vers leur côté d'origine. À l'équilibre, le flux de diffusion et le flux dû au champ se compensent pour chaque sorte de porteurs. Dans un potentiel, à l'équilibre thermique, les densités suivent la loi de Boltzmann, comme l'atmosphère dans un champ de pesanteur :",
    "val.14.10": "Approximation : équilibre thermique, porteurs suivant la loi de Boltzmann (non dégénérés). <var>V</var> est le potentiel du côté n moins celui du côté p, pris loin de la frontière, là où les densités sont uniformes ; ce qui se passe dans la zone de transition, quelques dixièmes de micromètre, ne compte pas pour ce rapport.",
    "val.14.11": "Approximation : celle de (14.10). Avec <var>q</var><sub><var>n</var></sub> = \u2212<var>e</var>, le rapport est grand : les électrons préfèrent le côté n, de potentiel plus élevé. Le produit de (14.10) et (14.11) redonne (14.4) des deux côtés.",
    "s1.p3": "Loin de la frontière, <var>N</var><sub><var>p</var></sub>(côté p) ≈ <var>N</var><sub>A</sub> et <var>N</var><sub><var>p</var></sub>(côté n) ≈ <var>n</var><sub>i</sub><sup>2</sup>/<var>N</var><sub>D</sub>. (14.10) donne alors la tension de la jonction :",
    "val.14.11a": "Approximation : dopants tous ionisés, <var>N</var><sub>A</sub> et <var>N</var><sub>D</sub> ≫ <var>n</var><sub>i</sub>, non dégénéré. Pour le silicium à 300\u00a0K, de 0,5 à 1\u00a0V selon les dopages : toujours moins que <var>E</var><sub>g</sub>/<var>e</var>.",
    "fig.aria": "Densités d'électrons et de trous de part et d'autre d'une jonction p-n",
    "fig.legend.n": "électrons",
    "fig.legend.p": "trous",
    "fig.xaxis": "position, côté p à gauche, côté n à droite (schéma)",
    "fig.yaxis": "densité (m⁻³)",
    "fig.a": "Accepteurs côté p, N_A",
    "fig.d": "Donneurs côté n, N_D",
    "fig.t": "Température, T",
    "fig.k.v": "Tension de la jonction, V",
    "fig.f.v": "silicium ; à comparer à E_g/e = {g}",
    "fig.k.r": "Rapport e^(\u2212eV/k_BT)",
    "fig.f.r": "trous côté n sur trous côté p, (14.10)",
    "fig.caption": "Chaque densité passe de sa valeur de majoritaire à sa valeur de minoritaire à travers la frontière ; la forme de la transition est un schéma, ses deux bouts sont exacts. Les courbes sont symétriques sur l'échelle logarithmique : leur produit vaut <var>n</var><sub>i</sub><sup>2</sup> partout. Plus les dopages sont forts, plus la tension est grande.",

    "s2.sec": "2 · Une tension qu'on ne mesure pas",
    "s2.h2": "Les fils ont aussi leurs jonctions",
    "s2.p1": "Branchons un voltmètre sur les deux côtés de la jonction. Rien. Les fils métalliques forment eux aussi des contacts avec le semi-conducteur, et chacun a sa différence de potentiel ; tout le long de la boucle, elles s'annulent. Sinon, on aurait une pile qui débiterait sans fin à partir de la seule agitation thermique, ce que le second principe interdit.",
    "s2.p2": "Il en va autrement si les jonctions ne sont pas à la même température, ou si on éclaire la jonction. La lumière crée des paires électron-trou près de la frontière ; le champ de la jonction pousse les électrons du côté n, les trous du côté p, et un courant circule dans le circuit extérieur : c'est une cellule photovoltaïque. Les porteurs créés en excès disparaissent par recombinaison, en un temps qui va de 10⁻⁷ à 10⁻³\u00a0s selon le cristal.",

    "s3.sec": "Décrire le système",
    "s3.h2": "<var>e</var><var>V</var> contre <var>k</var><sub>B</sub><var>T</var>",
    "s3.p1": "Le nombre qui règle tout est <var>e</var><var>V</var>/<var>k</var><sub>B</sub><var>T</var> : il fixe le rapport des densités d'un même porteur des deux côtés.",
    "sys.title": "Le système décrit : silicium à 300\u00a0K, <var>N</var><sub>A</sub> = 10²³, <var>N</var><sub>D</sub> = 10²²\u00a0m⁻³",
    "sys1.body": "<var>k</var><sub>B</sub><var>T</var>/<var>e</var> ≈ {kT} et (14.11a) donne <var>V</var> ≈ {V} : <var>e</var><var>V</var> vaut plus de trente fois <var>k</var><sub>B</sub><var>T</var>, et les densités d'un même porteur diffèrent d'un facteur 10<sup>13</sup> à 10<sup>14</sup> entre les deux côtés.",
    "sys2.body": "La zone de transition est fine, une fraction de micromètre pour ces dopages, mais longue devant le pas du réseau, 0,5\u00a0nm environ : on peut y parler d'un potentiel qui varie lentement à l'échelle de l'atome, et (14.10) reste valable.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Du détecteur à galène à la jonction",
    "hist.intro": "Les redresseurs à semi-conducteur ont fonctionné des décennies avant qu'on sache pourquoi.",
    "hist.events": {
      redresseur: { who: "Premiers redresseurs à pointe", what: "l'effet redresseur d'un contact entre une pointe métallique et un semi-conducteur est découvert.", context: "Son explication attendra plus de soixante ans." },
      schottky: { who: "Boris Davydov, Nevill Mott et Walter Schottky", what: "expliquent indépendamment le redressement par une barrière dissymétrique, due à une accumulation de charges à la surface du semi-conducteur.", context: "La diode à barrière de Schottky porte aujourd'hui le nom du troisième." },
      ohl: { who: "Russell Ohl et Jack Scaff", what: "découvrent aux Bell Labs, dans une plaquette de silicium, une frontière entre deux régions d'impuretés différentes : la jonction p-n.", context: "Éclairée, la plaquette produit un courant. Les noms p et n, pour positif et négatif, datent de là." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      solaire: { name: "Les cellules solaires", text: "Une cellule photovoltaïque est une grande jonction p-n éclairée. Les Bell Labs en ont présenté la première cellule pratique au silicium le 25 avril 1954 ; le principe des panneaux d'aujourd'hui est le même." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      diffusion: { prompt: "Pourquoi une tension apparaît-elle à une jonction p-n ?",
        options: { a: "Parce qu'une pile est cachée dans le cristal.", b: "Parce que les porteurs diffusent de l'autre côté et laissent derrière eux les ions fixes des dopants, qui créent un champ.", c: "Parce que les électrons sont attirés par les trous.", d: "Parce que les deux côtés ont des températures différentes." },
        why: "Les trous partis du côté p laissent des accepteurs chargés négativement, les électrons partis du côté n des donneurs positifs : le champ qui en résulte arrête la diffusion." },
      equilibre: { prompt: "À l'équilibre, des porteurs diffusent toujours à travers la jonction. Pourquoi n'y a-t-il pas de courant ?",
        options: { a: "Parce que la diffusion s'arrête complètement.", b: "Parce que les porteurs se recombinent tous dans la jonction.", c: "Parce que les électrons et les trous ont la même masse.", d: "Parce que, pour chaque porteur, le flux de diffusion est exactement compensé par le flux entraîné par le champ." },
        why: "L'équilibre est dynamique : des majoritaires franchissent la barrière, des minoritaires la descendent, à débits égaux. C'est ce qui impose la loi de Boltzmann (14.10)." },
      fils: { prompt: "Pourquoi un voltmètre branché sur une jonction p-n au repos lit-il zéro ?",
        options: { a: "Parce que les contacts entre les fils et le semi-conducteur ont aussi leurs tensions, et qu'elles s'annulent le long de la boucle.", b: "Parce que la tension est trop petite.", c: "Parce que le voltmètre court-circuite la jonction.", d: "Parce que la tension n'existe qu'à 0 K." },
        why: "Sinon, une boucle à température uniforme ferait circuler un courant sans source d'énergie : le second principe l'interdit." },
      valeur: { prompt: "Silicium à 300 K, N_A = N_D = 10²² m⁻³, nᵢ = 10¹⁶ m⁻³. Tension de la jonction ?",
        options: { a: "1,12 V, la bande interdite.", b: "26 mV.", c: "Environ 0,71 V : 0,0259 × ln(10⁴⁴/10³²).", d: "Environ 10 V." },
        hint: "ln(10¹²) ≈ 27,6.",
        why: "V = (k_BT/e) ln(N_A N_D/nᵢ²) = 0,0259 × 27,6 ≈ 0,71 V, moins que E_g/e." },
      lumiere: { prompt: "On éclaire une jonction p-n reliée à une résistance. Que se passe-t-il ?",
        options: { a: "Un courant circule : les paires créées près de la jonction sont séparées par son champ, électrons côté n, trous côté p.", b: "Rien : la jonction est à l'équilibre.", c: "La jonction s'échauffe seulement.", d: "La tension de la jonction s'annule." },
        why: "La lumière ajoute des porteurs que le champ de la jonction trie : c'est le principe de la cellule photovoltaïque." },
      dopage: { prompt: "On dope dix fois plus fort les deux côtés. De combien la tension de la jonction augmente-t-elle à 300 K ?",
        options: { a: "Elle est multipliée par 10.", b: "De (k_BT/e) ln 100 ≈ 0,12 V.", c: "Elle ne change pas.", d: "Elle est multipliée par 100." },
        why: "V = (k_BT/e) ln(N_A N_D/nᵢ²) : le produit est multiplié par 100, la tension augmente de 0,026 × 4,6 ≈ 0,12 V." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 14, §14-4 (texte original en anglais). Notations SI. Histoire : redresseur à pointe (1874) ; Davydov, Mott, Schottky (1938) ; Ohl et Scaff aux Bell Labs (1940) ; première cellule solaire pratique au silicium (1954). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

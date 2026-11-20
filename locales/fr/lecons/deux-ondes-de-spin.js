/* Leçon « Deux ondes de spin » (Feynman III.15.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/deux-ondes-de-spin.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Deux ondes de spin",
    "crumb.jour": "Deux ondes de spin",
    "h1": "Deux ondes de spin",
    "lede": "Retournons deux spins au lieu d'un. Le problème a maintenant deux positions à suivre, une infinité au carré d'états de base. Pourtant, tant que les deux spins retournés ne se touchent pas, la solution est un simple produit de deux ondes, et les énergies s'ajoutent : deux particules qui s'ignorent.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : les ondes de spin",
    "eq.cos": "cos",
    "eq.cte": "constante",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Deux spins retournés",
    "s1.p1": "Chaîne de la leçon « Les ondes de spin », mêmes couplages. Les états de base |<var>x</var><sub><var>m</var></sub>, <var>x</var><sub><var>n</var></sub>⟩ ont deux spins retournés, sur les atomes <var>m</var> et <var>n</var>. Chacun peut s'échanger avec un voisin ; si les deux retournés ne sont pas voisins, quatre échanges sont possibles, et l'équation des amplitudes stationnaires est :",
    "val.15.16": "Approximation : vraie quand les deux spins retournés ne sont pas voisins. S'ils le sont, |<var>m</var> \u2212 <var>n</var>| = 1, deux des quatre échanges ne changent rien et le terme diagonal diffère : l'équation de ces états-là est autre. On la néglige ici ; sur une chaîne de <var>N</var> atomes, ces états ne sont qu'une fraction 2/<var>N</var> environ des paires.",
    "s1.p2": "Chaque spin retourné saute pour son compte : on essaie le produit de deux ondes, l'une pour l'atome <var>m</var>, l'autre pour l'atome <var>n</var>.",
    "val.15.18": "Approximation : solution exacte de (15.16), donc fausse seulement par les états voisins négligés. Le même essai ne vaut pas pour <var>m</var> = <var>n</var>, qui n'est pas un état : un spin ne se retourne pas deux fois.",
    "val.15.19": "Approximation : celle de (15.16). Pour deux ondes, la solution exacte avec les voisins existe aussi : une onde du centre des deux spins, multipliée par une fonction de leur écart, de même énergie ; la différence n'est qu'une phase entre les ondes.",
    "val.15.20": "Approximation : celle de (15.16) ; <var>E</var><sub>1</sub> et <var>E</var><sub>2</sub> sont les énergies (15.12) de chaque onde seule. L'écart à la somme, quand les ondes interagissent, décroît comme l'inverse de la longueur de la chaîne.",
    "fig.aria": "Énergies de deux ondes de spin sur la relation de dispersion",
    "fig.legend.e": "E(k) d'une onde seule, (15.12)",
    "fig.legend.k1": "première onde, k₁",
    "fig.legend.k2": "seconde onde, k₂",
    "fig.xaxis": "kb (rad)",
    "fig.yaxis": "E/A",
    "fig2.aria": "Partie réelle de l'amplitude des deux spins retournés selon leurs positions",
    "fig2.legend.pos": "Re a(m, n) > 0",
    "fig2.legend.neg": "Re a(m, n) < 0",
    "fig2.xaxis": "atome m du premier spin retourné",
    "fig2.yaxis": "atome n du second",
    "fig.k1": "Nombre d'onde de la première, k₁b",
    "fig.k2": "Nombre d'onde de la seconde, k₂b",
    "fig.k.e": "Énergie totale",
    "fig.v.e": "{e} A",
    "fig.f.e": "somme de {e1} A et {e2} A",
    "fig.caption": "En haut, les deux ondes sur la même bande : l'énergie totale est la somme. En bas, l'amplitude <var>a</var><sub><var>m</var>,<var>n</var></sub> dans le plan des deux positions : une onde plane à deux dimensions, de vecteur (<var>k</var><sub>1</sub>, <var>k</var><sub>2</sub>). La diagonale, vide, n'est pas un état. Échangez les deux nombres d'onde : le motif se retourne autour de la diagonale, l'énergie ne change pas.",

    "s2.sec": "2 · Deux particules indépendantes",
    "s2.h2": "Un problème à deux corps qui se sépare",
    "s2.p1": "Un état à deux spins retournés se comporte comme deux magnons, chacun avec son nombre d'onde et son énergie, qui ne se voient pas. C'est remarquable : le problème mêle tous les spins de la chaîne, et il se réduit à deux particules libres. L'approximation ne néglige que les configurations où les deux spins retournés se touchent.",
    "s2.p2": "Il reste une question : la paire (<var>k</var><sub>1</sub>, <var>k</var><sub>2</sub>) et la paire (<var>k</var><sub>2</sub>, <var>k</var><sub>1</sub>) ont la même énergie. Sont-elles le même état ? Un spin retourné en <var>m</var> et un en <var>n</var>, c'est la même chose qu'un en <var>n</var> et un en <var>m</var> : les deux magnons sont identiques. La leçon « Les particules indépendantes » en tire la conséquence.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Une chaîne peu peuplée",
    "s3.p1": "Le nombre qui mesure l'approximation est la fraction des paires de positions où les deux spins retournés sont voisins : petite si la chaîne est longue et les magnons rares.",
    "sys.title": "Le système décrit : 1 000 spins, deux retournés",
    "sys1.body": "Les deux spins retournés sont voisins dans {f}\u00a0% des paires de positions : (15.20) est juste à ce niveau près.",
    "sys2.body": "Avec beaucoup de magnons, à plus haute température, ils se rencontrent souvent : leurs interactions, faibles, deviennent sensibles, et les énergies ne s'ajoutent plus tout à fait.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des magnons qui interagissent peu",
    "hist.intro": "Que des ondes de spin puissent s'ajouter sans se gêner n'allait pas de soi : il a fallu le démontrer.",
    "hist.events": {
      bloch: { who: "Felix Bloch", what: "traite les ondes de spin comme indépendantes et en tire la baisse de l'aimantation avec la température.", context: "Zeitschrift für Physik, vol. 61." },
      dyson: { who: "Freeman Dyson", what: "donne la théorie générale des interactions entre ondes de spin et montre qu'elles se comportent comme des quasi-particules faiblement couplées.", context: "Physical Review, vol. 102." },
      brockhouse: { who: "Bertram Brockhouse", what: "observe les ondes de spin de la magnétite par diffusion inélastique de neutrons.", context: "Physical Review, vol. 106." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      interactions: { name: "Le gaz de magnons", text: "Parce que les magnons interagissent peu, on décrit les excitations d'un aimant à basse température comme un gaz de quasi-particules indépendantes : c'est le point de départ des calculs de l'aimantation et de la chaleur massique magnétique, que l'on corrige ensuite de leurs interactions." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      etats: { prompt: "Sur une chaîne de N atomes, combien y a-t-il environ d'états de base à deux spins retournés ?",
        options: { a: "2N.", b: "N(N \u2212 1)/2 : le nombre de paires d'atomes.", c: "N.", d: "N²." },
        why: "On choisit deux atomes distincts, sans ordre : N(N \u2212 1)/2. Le problème a la taille d'un problème à deux dimensions." },
      somme: { prompt: "Deux ondes de spin ont les énergies 0,3 A et 1,1 A. Quelle est l'énergie de l'état à deux magnons, dans cette approximation ?",
        options: { a: "1,4 A.", b: "0,8 A.", c: "0,33 A.", d: "4 A." },
        why: "(15.20) : E = E₁ + E₂. Les deux magnons sont indépendants." },
      voisins: { prompt: "Qu'est-ce que (15.16) néglige ?",
        options: { a: "Le couplage entre voisins.", b: "Les spins non retournés.", c: "Le spin des électrons.", d: "Les configurations où les deux spins retournés sont voisins, dont l'équation est différente." },
        why: "Deux spins retournés voisins s'échangent sans rien changer : le terme diagonal et les sauts ne sont plus ceux de (15.16)." },
      exacte: { prompt: "Que dit la solution exacte à deux ondes, voisins compris ?",
        options: { a: "Que les énergies ne s'ajoutent plus du tout.", b: "Qu'il n'y a pas de solution.", c: "Que l'énergie reste (15.19) ; seule une phase entre les deux ondes change.", d: "Que les magnons se repoussent infiniment." },
        why: "Une onde du centre, multipliée par une fonction de l'écart, donne la même énergie : l'interaction ne se voit qu'à l'ordre 1/N." },
      dilue: { prompt: "Quand l'approximation des magnons indépendants cesse-t-elle de valoir ?",
        options: { a: "Quand les magnons sont nombreux et se rencontrent souvent.", b: "Quand la chaîne est longue.", c: "Quand A est grand.", d: "Jamais." },
        why: "La fraction de configurations voisines croît avec la densité de magnons : à plus haute température, leurs interactions comptent." },
      k: { prompt: "On échange les nombres d'onde des deux magnons, k₁ ↔ k₂. Que devient l'énergie ?",
        options: { a: "Elle change de signe.", b: "Elle ne change pas : E₁ + E₂ = E₂ + E₁.", c: "Elle double.", d: "Elle s'annule." },
        why: "Mêmes deux ondes, même énergie. Ce sont même, pour des magnons identiques, deux écritures du même état." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 15, §15-2 (texte original en anglais). Notations SI. Bloch, Zeitschrift für Physik 61, 206 (1930) ; Dyson, Physical Review 102, 1217 (1956) ; Brockhouse, Physical Review 106, 859 (1957). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

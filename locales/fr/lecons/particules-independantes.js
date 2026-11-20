/* Leçon « Les particules indépendantes » (Feynman III.15.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/particules-independantes.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les particules indépendantes",
    "crumb.jour": "Particules indépendantes",
    "h1": "Les particules indépendantes",
    "lede": "Deux ondes de spin de nombres d'onde k₁ et k₂ : laquelle est en m, laquelle en n ? La question n'a pas de sens, les deux spins retournés sont indiscernables. La bonne amplitude est donc symétrique, et les magnons se révèlent des bosons, qui aiment se retrouver au même endroit.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : deux ondes de spin",

    "s1.sec": "1 · Deux écritures du même état",
    "s1.h2": "Symétriser l'amplitude",
    "s1.p1": "La leçon « Deux ondes de spin » a trouvé l'amplitude stationnaire <var>a</var><sub><var>m</var>,<var>n</var></sub> ∝ e<sup>i<var>k</var><sub>1</sub><var>x</var><sub><var>m</var></sub></sup>e<sup>i<var>k</var><sub>2</sub><var>x</var><sub><var>n</var></sub></sup>. Mais l'état |<var>x</var><sub><var>m</var></sub>, <var>x</var><sub><var>n</var></sub>⟩ est le même que |<var>x</var><sub><var>n</var></sub>, <var>x</var><sub><var>m</var></sub>⟩ : deux spins retournés, sur les atomes <var>m</var> et <var>n</var>. Le produit échangé est donc aussi une solution, de même énergie :",
    "val.15.23": "Approximation : celle de (15.16), spins retournés jamais voisins. Exacte comme solution de cette équation, avec la même énergie (15.20) que le produit non échangé.",
    "s1.p2": "Une amplitude doit avoir une seule valeur pour un même état ; elle doit donc être la même pour (<var>m</var>, <var>n</var>) et (<var>n</var>, <var>m</var>). La combinaison qui le garantit est la somme :",
    "val.15.24": "Approximation : celle de (15.16) pour l'énergie ; exacte pour la symétrie, qui vient de ce que les deux spins retournés ne sont que des positions dans la chaîne, sans étiquette. C'est la règle des bosons de la leçon « Les bosons et les fermions ».",
    "s1.p3": "Comparons trois règles pour la probabilité de trouver les deux magnons à <var>d</var> atomes l'un de l'autre : des particules discernables, qui n'auraient pas à être symétrisées ; des bosons, (15.24) ; des fermions, avec une différence au lieu de la somme.",
    "fig.aria": "Probabilité relative de trouver deux particules à une distance donnée, bosons, fermions ou discernables",
    "fig.legend.b": "bosons (15.24) : 2 + 2 cos((k₁ \u2212 k₂)d)",
    "fig.legend.f": "fermions : 2 \u2212 2 cos((k₁ \u2212 k₂)d)",
    "fig.legend.d": "discernables, pour comparer",
    "fig.xaxis": "distance d entre les deux spins retournés (en pas)",
    "fig.yaxis": "|a|², sans normalisation",
    "fig.k1": "Première onde, k₁b",
    "fig.k2": "Seconde onde, k₂b",
    "fig.k.proche": "À un pas : bosons et fermions",
    "fig.v.proche": "{b} et {f}",
    "fig.f.proche": "en unités de la valeur des discernables",
    "fig.k.meme": "Période du motif, 2π/|k₁ \u2212 k₂|",
    "fig.v.meme0": "infinie",
    "fig.f.meme": "en pas : au-delà, les règles se mélangent",
    "fig.caption": "Seuls comptent les points entiers, les atomes ; la courbe est un guide. À courte distance, deux bosons sont jusqu'à deux fois plus souvent ensemble que deux particules discernables, deux fermions presque jamais. Rapprochez <var>k</var><sub>1</sub> de <var>k</var><sub>2</sub> : le motif s'étale ; à <var>k</var><sub>1</sub> = <var>k</var><sub>2</sub>, les fermions disparaissent partout.",

    "s2.sec": "2 · Des bosons dans un aimant",
    "s2.h2": "Une règle qui vient du modèle",
    "s2.p1": "On n'a rien supposé sur la statistique des magnons : elle sort du modèle. Retourner un spin en <var>m</var> puis en <var>n</var>, ou en <var>n</var> puis en <var>m</var>, donne le même état ; l'amplitude est symétrique, donc les magnons sont des bosons. Deux magnons peuvent même avoir le même nombre d'onde : (15.24) devient 2<var>K</var>e<sup>i<var>k</var>(<var>x</var><sub><var>m</var></sub> + <var>x</var><sub><var>n</var></sub>)</sup>, non nulle.",
    "s2.p2": "Des fermions, au contraire, auraient une amplitude antisymétrique, la différence des deux produits. Elle s'annule si <var>k</var><sub>1</sub> = <var>k</var><sub>2</sub> : deux fermions identiques ne peuvent pas être dans le même état, c'est le principe d'exclusion. On peut donc traiter une assemblée de particules qui interagissent peu comme des particules indépendantes, à condition de respecter leur statistique. C'est l'approximation des particules indépendantes, que la leçon « Le benzène par les particules indépendantes » applique aux électrons des molécules.",

    "s3.sec": "Décrire le système",
    "s3.h2": "Quand la statistique se voit",
    "s3.p1": "La symétrisation ne change rien à l'énergie, mais tout aux corrélations : elle se voit quand les deux ondes se recouvrent, sur des distances plus courtes que 2π/|<var>k</var><sub>1</sub> \u2212 <var>k</var><sub>2</sub>|.",
    "sys.title": "Le système décrit : deux magnons de nombres d'onde voisins",
    "sys1.body": "Avec |<var>k</var><sub>1</sub> \u2212 <var>k</var><sub>2</sub>|<var>b</var> = 0,01, le motif d'interférence s'étend sur {l} pas : sur toute cette distance, deux bosons sont plus souvent ensemble que deux particules discernables.",
    "sys2.body": "À l'équilibre thermique, beaucoup de magnons de petit <var>k</var> occupent les mêmes états : leur nombre par état suit la loi de Bose, pas celle de Boltzmann. C'est ce qui fixe la loi de l'aimantation à basse température.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des magnons qui se condensent",
    "hist.intro": "Des bosons peuvent s'accumuler dans un même état. Pour des magnons, cela a été observé au tournant du siècle.",
    "hist.events": {
      dyson: { who: "Freeman Dyson", what: "montre que les ondes de spin se comportent comme des quasi-particules faiblement couplées.", context: "Physical Review, vol. 102." },
      nikuni: { who: "Nikuni et ses collègues", what: "établissent la condensation de Bose-Einstein de magnons dans un composé antiferromagnétique, TlCuCl₃.", context: "Physical Review Letters, vol. 84." },
      demokritov: { who: "Demokritov et ses collègues", what: "obtiennent un condensat de magnons à température ambiante dans un ferrimagnétique, en y créant les magnons par pompage.", context: "Nature, vol. 443." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      condensat: { name: "Les condensats de magnons", text: "Un condensat de magnons, où un grand nombre d'entre eux occupent le même état, a été proposé comme source micro-onde accordable. C'est la statistique de bosons de (15.24) mise à profit." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      identiques: { prompt: "Pourquoi deux spins retournés sont-ils indiscernables ?",
        options: { a: "Parce qu'ils ont la même énergie.", b: "Parce qu'ils sont sur le même atome.", c: "Parce que l'état est défini par les deux atomes dont le spin est retourné, sans dire lequel est « le premier ».", d: "Ils sont discernables." },
        why: "|xₘ, xₙ⟩ et |xₙ, xₘ⟩ désignent le même état : les spins retournés n'ont pas d'étiquette." },
      symetrique: { prompt: "Pourquoi l'amplitude doit-elle être symétrique, aₘ,ₙ = aₙ,ₘ ?",
        options: { a: "Parce qu'une amplitude ne peut avoir qu'une valeur pour un même état, et que (m, n) et (n, m) sont le même état.", b: "Parce que l'énergie est symétrique.", c: "Parce que A est le même partout.", d: "Par convention." },
        why: "Symétrique sans choix : c'est le comportement des bosons. Le modèle l'impose." },
      fermions: { prompt: "Deux fermions identiques ont des amplitudes en différence de produits. Que se passe-t-il si k₁ = k₂ ?",
        options: { a: "L'énergie double.", b: "Ils se repoussent.", c: "Rien de particulier.", d: "L'amplitude s'annule partout : deux fermions ne peuvent pas être dans le même état." },
        why: "e^(ik xₘ)e^(ik xₙ) \u2212 e^(ik xₘ)e^(ik xₙ) = 0. C'est le principe d'exclusion." },
      regroupe: { prompt: "Deux magnons de nombres d'onde voisins. À un pas l'un de l'autre, sont-ils plus ou moins souvent que deux particules discernables ?",
        options: { a: "Moins souvent.", b: "Presque deux fois plus souvent : 2 + 2 cos((k₁ \u2212 k₂)) ≈ 4, contre 2 en moyenne.", c: "Autant.", d: "Jamais." },
        why: "Pour des bosons, les deux termes de (15.24) interfèrent de façon constructive à courte distance : ils se regroupent." },
      energie: { prompt: "La symétrisation de (15.24) change-t-elle l'énergie des deux magnons ?",
        options: { a: "Non : les deux produits ont la même énergie E₁ + E₂, leur somme aussi.", b: "Oui, elle la double.", c: "Oui, elle l'annule.", d: "Oui, elle la rend négative." },
        why: "(15.23) et (15.18) sont deux solutions de même énergie ; leur somme l'est aussi. Seules les corrélations de position changent." },
      bosons: { prompt: "Qu'est-ce qui permet de traiter beaucoup de magnons comme des particules indépendantes ?",
        options: { a: "Le fait qu'ils n'ont pas de masse.", b: "Le fait qu'ils sont chargés.", c: "Le fait qu'ils interagissent peu, à condition de respecter leur statistique de bosons.", d: "Rien : c'est impossible." },
        why: "L'approximation des particules indépendantes : chacune dans son état, énergies additives, et l'amplitude totale symétrisée (bosons) ou antisymétrisée (fermions)." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 15, §15-3 (texte original en anglais). Notations SI. Dyson, Physical Review 102, 1217 (1956) ; Nikuni et coll., Physical Review Letters 84, 5868 (2000) ; Demokritov et coll., Nature 443, 430 (2006). Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

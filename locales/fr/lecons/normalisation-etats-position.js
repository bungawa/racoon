/* Leçon « La normalisation des états en x » (Feynman III.16.4) : textes en français.
   Une autre langue = locales/<langue>/lecons/normalisation-etats-position.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La normalisation des états en x",
    "crumb.jour": "Normaliser les états en x",
    "h1": "La normalisation des états en x",
    "lede": "Pour des états de base discrets, ⟨i|j⟩ vaut 1 ou 0. Pour les états |x⟩ d'une droite, que vaut ⟨x′|x⟩ ? Ni 1 ni 0 : il faut un objet nul partout sauf en un point, et pourtant d'intégrale 1. C'est la fonction delta de Dirac, et elle n'a de sens que sous une intégrale.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la fonction d'onde",

    "s1.sec": "Le problème",
    "s1.h2": "Ce que doit valoir ⟨x′|x⟩",
    "s1.p1": "Le système : une particule sur une droite, décrite par les états de base |<var>x</var>⟩. Une règle des amplitudes vaut pour toute base : un état de base |<var>x</var>′⟩, décomposé sur la base, se retrouve lui-même. Appliquée à l'amplitude ψ(<var>x</var>′) = ⟨<var>x</var>′|ψ⟩, la règle de composition (16.19) donne :",
    "val.16.38": "Exacte : c'est la règle de composition des amplitudes, prise avec φ = |<var>x</var>′⟩. Elle doit valoir pour tout ψ ; c'est ce qui fixe ⟨<var>x</var>′|<var>x</var>⟩.",
    "s1.p2": "Cette égalité doit tenir pour toute fonction ψ. Le noyau ⟨<var>x</var>′|<var>x</var>⟩ doit donc « choisir » la valeur de ψ en <var>x</var>′ et ignorer toutes les autres. Il est nul pour <var>x</var> ≠ <var>x</var>′, puisque deux positions différentes sont des états orthogonaux. S'il avait une valeur finie en <var>x</var> = <var>x</var>′, l'intégrale d'une fonction nulle partout sauf en un point vaudrait zéro : il doit y être infini, d'une façon précise.",

    "s2.sec": "La fonction delta",
    "s2.h2": "Un pic d'aire 1",
    "s2.p1": "Prenons un rectangle de largeur ε et de hauteur 1/ε, d'aire 1, centré en <var>x</var>′. Multiplié par ψ et intégré, il donne la moyenne de ψ sur l'intervalle. Quand ε tend vers zéro, cette moyenne tend vers ψ(<var>x</var>′) : c'est la propriété que l'on cherche. On appelle δ la limite, et on la définit par ce qu'elle fait sous une intégrale :",
    "val.16.43": "Exacte : définition de δ, pour toute fonction ψ continue en <var>x</var>′. δ n'est pas une fonction ordinaire : aucune fonction n'a ces deux propriétés à la fois. C'est une limite de fonctions de plus en plus étroites, ou, depuis Laurent Schwartz, une distribution.",
    "val.16.44": "Exacte : c'est la normalisation des états |<var>x</var>⟩ qui rend (16.19) vraie. Elle remplace ⟨<var>i</var>|<var>j</var>⟩ = δ<sub><var>ij</var></sub> des bases discrètes. ⟨<var>x</var>|<var>x</var>⟩ est infini : un état |<var>x</var>⟩ n'est pas un état physique normé, c'est un idéal dont on approche les états réels.",
    "fig.aria": "Partie réelle d'une fonction d'onde et noyau étroit centré au point choisi, avec la valeur filtrée et la vraie valeur",
    "fig.legend.psi": "Re ψ(x), un paquet qui oscille",
    "fig.legend.noyau": "noyau δ_ε(x \u2212 x′), réduit d'un facteur 10",
    "fig.b.rect": "rectangle",
    "fig.b.gauss": "gaussienne",
    "fig.eps": "Largeur du noyau ε",
    "fig.xp": "Point x′",
    "fig.x": "x (nm)",
    "fig.y": "Re ψ (nm⁻¹ᐟ²)",
    "fig.k.filtre": "∫ δ<sub>ε</sub>(<var>x</var> \u2212 <var>x</var>′) Re ψ(<var>x</var>) d<var>x</var>",
    "fig.f.filtre": "contre Re ψ(x′) = {v}",
    "fig.k.ecart": "Écart",
    "fig.f.ecart": "prévu : ψ'' ε²/24 ou ψ'' ε²/2 = {v}",
    "fig.caption": "Le point orange est la valeur filtrée, le point bleu la vraie valeur. Le rectangle moyenne ψ sur sa largeur ; la gaussienne d'écart type ε, sur une zone plus large. Leur écart tombe comme ε<sup>2</sup>, proportionnel à la courbure de ψ : nul là où ψ est droite, de signe opposé à ψ'' ailleurs. La forme du noyau ne compte plus dans la limite.",

    "s3.sec": "Dans l'espace",
    "s3.h2": "Trois dimensions, trois deltas",
    "s3.p1": "Dans l'espace, une particule a pour états de base |<b>r</b>⟩ = |<var>x</var>, <var>y</var>, <var>z</var>⟩. Les amplitudes ⟨<b>r</b>|ψ⟩ = ψ(<b>r</b>) forment sa fonction d'onde, et la somme sur les états de base devient une intégrale de volume :",
    "val.16.47": "Exacte : règle de composition sur la base des |<b>r</b>⟩, avec la normalisation (16.48). Pour une particule sans spin ; avec un spin, il y a une fonction d'onde par état de spin.",
    "val.16.48": "Exacte : normalisation des états |<b>r</b>⟩, produit de trois deltas, une par coordonnée. δ<sup>3</sup> a pour unité m<sup>\u22123</sup>, comme |ψ|<sup>2</sup>.",
    "s3.p2": "L'unité dit tout : δ(<var>x</var>) est en m<sup>\u22121</sup>, puisque son intégrale sur <var>x</var> vaut 1 sans dimension. Les états |<var>x</var>⟩ ainsi normés ont une amplitude ⟨<var>x</var>|ψ⟩ en m<sup>\u22121/2</sup>, et l'on retrouve que |ψ|<sup>2</sup> est une densité.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Une position mesurée à ε près",
    "s4.p1": "Aucun appareil ne prépare l'état |<var>x</var>′⟩ : il repère une position à ε près. Ce qu'il lit est ψ filtrée par un noyau de largeur ε. Le nombre sans dimension qui dit si l'on peut l'oublier est ε divisé par l'échelle de variation de ψ, ici sa longueur d'onde.",
    "sys.title": "Le paquet de la figure, de longueur d'onde 0,31\u00a0nm",
    "sys1.body": "Au centre du paquet, un noyau rectangulaire de 0,01\u00a0nm donne Re ψ à {e1}\u00a0% près ; de 0,05\u00a0nm, à {e2}\u00a0% ; de 0,1\u00a0nm, à {e3}\u00a0%. La limite ε → 0 n'est qu'une commodité : dès que ε est petit devant {l}, la forme exacte du noyau ne se voit plus.",
    "sys2.body": "La même règle vaut pour toute fonction d'onde réelle : un état |<var>x</var>⟩ idéal est un bon modèle de détecteur tant que sa résolution est petite devant la longueur d'onde de la particule, {l} ici.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Une fonction qui n'en est pas une",
    "hist.intro": "Les physiciens se servent de la delta bien avant que les mathématiciens ne sachent dire ce qu'elle est. Elle apparaît dès qu'on décompose une fonction en ondes.",
    "hist.events": {
      fourier: { who: "Joseph Fourier", what: "publie la « Théorie analytique de la chaleur », où figure le théorème de l'intégrale de Fourier.", context: "Recomposer une fonction à partir de ses ondes revient à intégrer contre un noyau qui vaut, à la limite, une delta : c'est le plus ancien usage connu de l'idée." },
      dirac: { who: "Paul Dirac", what: "introduit la fonction delta dans un article de mécanique quantique.", context: "Il lui donne le nom de « delta » parce qu'elle est l'analogue continu du symbole δ_ij de Kronecker, celui de ⟨i|j⟩ pour une base discrète." },
      principes: { who: "Paul Dirac", what: "publie « The Principles of Quantum Mechanics », qui répand l'usage de la delta.", context: "La normalisation (16.44) des états de position et de quantité de mouvement y devient la règle commune." },
      schwartz: { who: "Laurent Schwartz", what: "fonde la théorie des distributions, qui donne à la delta un sens rigoureux.", context: "δ y est une forme linéaire : elle associe à chaque fonction régulière sa valeur en un point. C'est exactement ce que dit (16.43)." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      impulsion: { name: "La réponse impulsionnelle", text: "En traitement du signal, un système linéaire dont les propriétés ne changent pas avec le temps est entièrement décrit par sa réponse à une delta : sa réponse impulsionnelle. La sortie pour n'importe quel signal est la convolution de l'entrée par cette réponse, comme ψ(<var>x</var>′) est l'intégrale de ψ contre δ(<var>x</var> \u2212 <var>x</var>′). Un peigne de deltas, enfin, décrit l'échantillonnage d'un signal numérique." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      noyau: { prompt: "Pourquoi ⟨x′|x⟩ ne peut-il pas valoir 1 pour x = x′ et 0 ailleurs, comme pour une base discrète ?",
        options: { a: "Parce que l'intégrale d'une fonction nulle partout sauf en un point vaut zéro : ∫⟨x′|x⟩ψ(x)dx ne rendrait jamais ψ(x′).", b: "Parce que les états |x⟩ ne sont pas orthogonaux.", c: "Parce qu'une amplitude ne peut pas valoir 1.", d: "Parce que x est complexe." },
        why: "Pour retrouver ψ(x′) par une intégrale, le noyau doit avoir une aire 1 concentrée en x′. Une valeur finie en un seul point a une aire nulle. Il faut un pic infiniment haut et étroit : δ(x \u2212 x′)." },
      aire: { prompt: "Un rectangle de largeur ε = 0,02 nm approche δ(x). Quelle est sa hauteur ?",
        options: { a: "1, sans dimension.", b: "0,02 nm.", c: "50 nm⁻¹, pour que l'aire vaille 1.", d: "Infinie." },
        why: "Aire = hauteur × largeur = 1, donc hauteur = 1/ε = 50 nm⁻¹. Quand ε → 0, la hauteur grandit sans borne, l'aire reste 1." },
      dimension: { prompt: "Quelle est l'unité de δ(x), x étant une longueur ?",
        options: { a: "Aucune.", b: "Le mètre.", c: "m⁻¹ᐟ².", d: "m⁻¹, puisque ∫δ(x)dx vaut 1 sans dimension." },
        why: "dx est en mètres et l'intégrale vaut 1 : δ(x) est en m⁻¹. Dans l'espace, δ(x)δ(y)δ(z) est en m⁻³, comme |ψ|²." },
      ortho: { prompt: "Que vaut ⟨x|x⟩ pour un état de position idéal ?",
        options: { a: "1, comme tout état normé.", b: "L'infini : δ(0). Un état |x⟩ n'est pas un état physique normé, mais un idéal.", c: "0.", d: "ħ/2." },
        why: "⟨x′|x⟩ = δ(x \u2212 x′) diverge en x = x′. Aucun état physique n'est exactement localisé : on approche |x⟩ par des paquets de plus en plus étroits, dont la norme reste 1." },
      largeur: { prompt: "On filtre ψ par un rectangle de largeur ε pour approcher ψ(x′). On divise ε par 2. Comment change l'écart ?",
        options: { a: "Il est divisé par 4 environ, car il vaut ψ''ε²/24 au premier ordre.", b: "Il est divisé par 2.", c: "Il ne change pas.", d: "Il est multiplié par 2, car le pic est plus haut." },
        hint: "Développez ψ autour de x′ et moyennez sur [x′ \u2212 ε/2, x′ + ε/2].",
        why: "Le terme d'ordre 1 se compense par symétrie ; reste la moyenne de ψ''(x \u2212 x′)²/2, soit ψ''ε²/24. Un écart en ε² : divisé par 4. Faites-le avec le curseur." },
      trois: { prompt: "Comment sont normés les états |r⟩ d'une particule dans l'espace ?",
        options: { a: "⟨r′|r⟩ = δ(|r \u2212 r′|).", b: "⟨r′|r⟩ = 1 si r = r′.", c: "⟨r′|r⟩ = δ(x \u2212 x′) δ(y \u2212 y′) δ(z \u2212 z′).", d: "⟨r′|r⟩ = δ(x \u2212 x′) + δ(y \u2212 y′) + δ(z \u2212 z′)." },
        why: "Les trois coordonnées sont indépendantes : la normalisation est le produit de trois deltas, de sorte que ∫⟨r′|r⟩ψ(r)dV = ψ(r′). Une somme ne serait pas nulle quand une seule coordonnée diffère." },
      mesure: { prompt: "Un détecteur repère la position d'un électron à 0,1 nm près. La fonction d'onde a une longueur d'onde de 0,3 nm. Peut-on dire qu'il mesure |ψ(x)|² ?",
        options: { a: "Oui, exactement : la delta est un modèle exact de tout détecteur.", b: "Non : sa résolution n'est pas petite devant la longueur d'onde ; il lit une moyenne de ψ sur 0,1 nm, nettement écartée de la valeur au point.", c: "Oui, car 0,1 nm est la taille d'un atome.", d: "Non, car un détecteur ne mesure que la quantité de mouvement." },
        why: "L'état |x⟩ idéal suppose ε ≪ λ. Ici ε/λ ≈ 1/3 : la moyenne sur la fenêtre s'écarte de plusieurs pour cent de la valeur au point (17 % au centre du paquet de la figure). La delta est un modèle, valable dans une limite." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 16, §16-4 (texte original en anglais). Notations SI. Fourier : <i>Théorie analytique de la chaleur</i> (1822). Dirac : <i>The Principles of Quantum Mechanics</i> (1930) ; l'article de 1927 et le nom de la fonction : Wikipédia, « Dirac delta function ». Schwartz : Wikipédia, « Dirac delta function », qui date la théorie des distributions de 1945. Réponse impulsionnelle : même article. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Indice de réfraction et dispersion » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      somme: { prompt: "Derrière une lame de verre, l'onde semble avoir traversé le verre à c/n. Qu'est-ce qui s'est réellement propagé moins vite que c ?",
        options: { a: "Le champ de la source, freiné par les atomes.", b: "Rien : le champ de la source et ceux de tous les électrons de la lame vont à c ; c'est leur somme qui a la phase d'une onde retardée.", c: "Le champ des électrons, retardé à c/n dans le verre.", d: "L'énergie seulement, le champ allant à c." },
        hint: "Écrivez le champ en P comme une somme, (31.2).",
        why: "Chaque contribution est retardée à c. Le champ des électrons, en quadrature avec la source, en fait tourner la phase : la somme ressemble à une onde retardée. Leçons « L’indice de réfraction » et « Le champ créé par le milieu »." },
      lame: { prompt: "Une lame de gaz d'indice n = 1,0003, épaisse de 0,1\u00a0mm, est traversée par une lumière de 600\u00a0nm. De combien retarde-t-elle la phase de l'onde ?",
        options: { a: "0,05\u00a0rad.", b: "3,1\u00a0rad.", c: "1 × 10⁻¹⁶\u00a0rad.", d: "0,31\u00a0rad." },
        hint: "φ = 2π(n \u2212 1)Δz/λ.",
        why: "2π × 3 × 10⁻⁴ × 10⁻⁴/(6 × 10⁻⁷) ≈ 0,31\u00a0rad. Oublier 2π donne 0,05 ; 10⁻¹⁶ est le retard en secondes, (n \u2212 1)Δz/c, pas une phase. À 0,31\u00a0rad, le premier ordre (31.8) se trompe déjà de 5 % sur l'amplitude." },
      quadrature: { prompt: "Pourquoi le champ des électrons d'une lame mince retarde-t-il l'onde au lieu de simplement l'affaiblir ou la renforcer ?",
        options: { a: "Parce que le champ d'une nappe suit la vitesse de ses charges, en quadrature avec leur position, donc avec la source sous la résonance : ajouté à la source, il en tourne la phase.", b: "Parce que les électrons absorbent puis réémettent la lumière plus tard.", c: "Parce que le champ des électrons est opposé à celui de la source.", d: "Parce que les électrons oscillent à une fréquence plus basse que la source." },
        why: "(30.18) et (31.17) : Ea ∝ \u2212iωx0. Un champ en quadrature change la phase de la somme sans en changer le module au premier ordre. Opposé, il affaiblirait ; en phase, il renforcerait. Leçon « Le champ créé par le milieu »." },
      chauffe: { prompt: "Un gaz dilué a n \u2212 1 = 1,2 × 10⁻⁴ à 273\u00a0K. On le chauffe à 546\u00a0K à pression constante. Que devient n \u2212 1, la lumière restant la même ?",
        options: { a: "1,2 × 10⁻⁴ : l'indice d'un atome ne dépend pas de la température.", b: "2,4 × 10⁻⁴ : les électrons, plus agités, rayonnent davantage.", c: "6 × 10⁻⁵ : le nombre de molécules par mètre cube est divisé par deux.", d: "3 × 10⁻⁵ : il varie comme 1/T²." },
        hint: "Dans (31.19), qu'est-ce qui dépend de la température ?",
        why: "À pression constante, N = p/(kB T) est divisé par deux, et n \u2212 1 ∝ N. Les électrons, eux, ont les mêmes ω0, q et m." },
      epaisseur: { prompt: "Pourquoi l'épaisseur Δz de la lame disparaît-elle de la formule finale de l'indice, (31.19) ?",
        options: { a: "Parce que la lame est infiniment mince.", b: "Parce que l'indice est défini pour une lame d'un mètre.", c: "Parce que le champ des électrons ne dépend pas du nombre d'électrons.", d: "Parce que les deux expressions du champ de la lame, par l'indice (31.8) et par les électrons (31.17), sont toutes deux proportionnelles à Δz, la seconde par η = NΔz." },
        why: "(31.18) porte Δz des deux côtés. Doubler l'épaisseur double le retard de phase, pas l'indice. Leçon « Le champ créé par le milieu »." },
      plasma: { prompt: "Une couche ionosphérique contient 4 × 10¹² électrons libres par mètre cube. Que vaut sa fréquence plasma, ωp/(2π) avec ωp = √(N e²/(ε0 m)) ?",
        options: { a: "Environ 18\u00a0MHz.", b: "Environ 9\u00a0MHz.", c: "Environ 36\u00a0MHz.", d: "Environ 4,5\u00a0MHz." },
        hint: "10¹² électrons par mètre cube donnent environ 9\u00a0MHz.",
        why: "fp = 8,98 √N\u00a0Hz : √(4 × 10¹²) = 2 × 10⁶, soit 18\u00a0MHz. Quadrupler N double fp. Sous 18\u00a0MHz, une onde radio est renvoyée ; au-dessus, elle passe avec n < 1. Leçon « La dispersion »." },
      fuchsine: { prompt: "Une solution de fuchsine absorbe le vert. Que prévoit (31.20) pour la partie réelle de son indice de part et d'autre de cette bande ?",
        options: { a: "Elle croît régulièrement du rouge au violet, comme dans le verre.", b: "Elle est la même partout, la solution étant diluée.", c: "Elle est plus grande juste du côté rouge de la bande que juste du côté violet : l'ordre des couleurs s'y inverse, c'est la dispersion anormale.", d: "Elle devient nulle dans tout le spectre." },
        why: "Sous une résonance, n′ \u2212 1 est grand et positif ; juste au-dessus, il est négatif. Le rouge, sous la bande, est plus réfracté que le violet, au-dessus. C'est l'observation de Christiansen, 1870. Leçon « La dispersion »." },
      rasant: { prompt: "Pour des rayons X, un solide a n \u2212 1 ≈ \u22124,5 × 10⁻⁶. Que devient un rayon X qui arrive du vide sur sa surface plane, sous une incidence très rasante ?",
        options: { a: "Il pénètre toujours, comme la lumière dans le verre.", b: "Il est totalement réfléchi si l'angle rasant est inférieur à environ √(2|n \u2212 1|) ≈ 3\u00a0mrad : le vide est ici le milieu le plus réfringent.", c: "Il est toujours totalement réfléchi, quel que soit l'angle.", d: "Il est absorbé en surface, l'indice étant inférieur à 1." },
        hint: "Écrivez la loi de Snell-Descartes avec n < 1 et cherchez quand sin θ dépasserait 1.",
        why: "sin θ = sin θ0/n > 1 dès que cos α < n, α l'angle rasant : α < arccos n ≈ √(2(1 \u2212 n)) ≈ 3\u00a0mrad. C'est ainsi que travaillent les miroirs à rayons X sous incidence rasante. Leçons « L’indice de réfraction » et « La dispersion »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

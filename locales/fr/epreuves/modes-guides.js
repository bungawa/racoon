/* Épreuve de l'étape « Modes guidés et technique des guides » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      noeuds: { prompt: "Sur une ligne fendue fermée par une plaque, à 8,2\u00a0GHz (λ0 = 3,66\u00a0cm), deux minimums successifs de la lecture sont à 3,04\u00a0cm l'un de l'autre. Quelle largeur a du guide en déduit-on ?",
        options: { a: "Environ 22,9\u00a0mm : λg = 6,09\u00a0cm, et (24.19) inversée donne a = λ0/(2√(1 \u2212 (λ0/λg)²)).", b: "Environ 18,3\u00a0mm, la moitié de λ0.", c: "Environ 30,4\u00a0mm, l'écart des minimums.", d: "On ne peut rien en déduire : l'écart des minimums ne dépend que de la position de la plaque." },
        hint: "Deux minimums sont à λg/2 l'un de l'autre.",
        why: "λg = 2 × 3,04 = 6,09\u00a0cm. De λg = λ0/√(1 \u2212 (λ0/2a)²), on tire 2a = λ0/√(1 \u2212 (λ0/λg)²) = 3,66/0,80 ≈ 4,57\u00a0cm, soit a ≈ 22,9\u00a0mm : le guide de 22,86\u00a0mm. Leçon « Observer les ondes guidées »." },
      ros: { prompt: "Le détecteur d'une ligne fendue, quadratique, indique 4 fois plus aux maximums qu'aux minimums. Quelle fraction de la puissance incidente la charge renvoie-t-elle ?",
        options: { a: "Les trois quarts.", b: "Un neuvième : S = 2, |Γ| = 1/3, |Γ|² = 1/9.", c: "Un quart, le rapport des lectures.", d: "La moitié." },
        hint: "Le détecteur lit le carré du champ ; S = (1 + |Γ|)/(1 \u2212 |Γ|).",
        why: "Rapport des lectures = S² = 4, donc S = 2 et |Γ| = (S \u2212 1)/(S + 1) = 1/3. La puissance réfléchie est |Γ|² = 1/9 de l'incidente, environ 11\u00a0%. Leçon « Observer les ondes guidées »." },
      sous: { prompt: "Le générateur est réglé à 5\u00a0GHz dans un guide de 22,86\u00a0mm (coupure à 6,56\u00a0GHz). La lecture tombe d'environ 8\u00a0dB par centimètre en s'éloignant de l'antenne. Que devient l'énergie que le générateur ne transmet pas ?",
        options: { a: "Elle chauffe les parois sur le premier centimètre.", b: "Elle sort par la fente de la ligne de mesure.", c: "Elle n'est pas emportée : le guide présente au générateur une charge réactive, qui lui renvoie sa puissance.", d: "Elle est absorbée par la charge au bout du guide." },
        why: "Sous la coupure, kz est imaginaire : le champ décroît sans osciller et ne transporte pas de puissance en moyenne. Il n'y a pas de dissipation : la puissance revient vers le générateur. Les rangées d'images de signes alternés de « Une autre façon de voir les ondes guidées » donnent la même décroissance, sans aucune perte." },
      claquage: { prompt: "À 10\u00a0GHz, le guide de 22,86\u00a0mm × 10,16\u00a0mm transporte environ 1\u00a0MW quand le champ maximal atteint 3\u00a0MV·m⁻¹. Que devient cette limite à 7\u00a0GHz, où la vitesse de groupe tombe de 0,76 c à 0,35 c ?",
        options: { a: "Elle double : l'onde est plus lente, donc moins énergétique.", b: "Elle ne change pas : seul le champ maximal compte.", c: "Elle devient nulle : 7\u00a0GHz est sous la coupure.", d: "Elle tombe à environ 0,49\u00a0MW, dans le rapport des vitesses de groupe." },
        hint: "(24.32p) : P = ε0 E²max ab vg/4.",
        why: "À champ maximal fixé, l'énergie par mètre de guide est la même ; la puissance est cette énergie fois la vitesse de groupe. 1,05\u00a0MW × 0,35/0,76 ≈ 0,49\u00a0MW. Près de la coupure, le guide perd en puissance admissible et ses pertes augmentent. Leçons « La plomberie des guides d'onde » et « Modes d'un guide »." },
      coupleur: { prompt: "Un coupleur à trous espacés de λg/4 à 10\u00a0GHz est essayé à 9\u00a0GHz. Avec deux trous égaux, sa directivité est d'environ 11\u00a0dB. Que donne trois trous de poids 1, 2, 1 ?",
        options: { a: "Environ 22\u00a0dB : l'onde arrière vaut 4 cos²(kz d), le carré du cas à deux trous.", b: "Encore 11\u00a0dB : seul l'espacement compte.", c: "Environ 33\u00a0dB, le triple.", d: "Moins de 11\u00a0dB, car le trou du milieu renvoie plus vers l'arrière." },
        hint: "1 + 2u + u² = (1 + u)², avec u = e^(\u22122i kz d).",
        why: "L'onde arrière est |1 + u|² au lieu de |1 + u| (rapportée à 4 au lieu de 2) : |cos kz d|² au lieu de |cos kz d|, donc deux fois plus de décibels, 21,9\u00a0dB. Les poids binomiaux élargissent la bande de bonne directivité. Leçon « La plomberie des guides d'onde »." },
      modes: { prompt: "On veut transmettre 5\u00a0GHz sur le seul mode TE₁₀, dans un guide de hauteur b = a/2. Quelle largeur a choisir ?",
        options: { a: "a = 2,5\u00a0cm : c'est la plus petite, donc la plus sûre.", b: "a = 4,0\u00a0cm : coupure de TE₁₀ à 3,75\u00a0GHz, de TE₂₀ à 7,5\u00a0GHz, et 5\u00a0GHz bien entre les deux.", c: "a = 8,0\u00a0cm : un guide large perd moins.", d: "a = 6,1\u00a0cm : la coupure de TE₁₀ est loin, à 2,46\u00a0GHz." },
        hint: "Il faut c/(2a) < 5\u00a0GHz < c/a.",
        why: "Pour a = 2,5\u00a0cm, la coupure est à 6\u00a0GHz : rien ne passe. Pour 6,1\u00a0cm, TE₂₀ coupe à 4,91\u00a0GHz et passe déjà. Pour 8\u00a0cm, plusieurs modes passent. a = 4\u00a0cm met 5\u00a0GHz à 1,33 fois la coupure de TE₁₀ et à 0,67 fois celle de TE₂₀. Leçon « Modes d'un guide »." },
      tm: { prompt: "À 17\u00a0GHz, dans le guide de 22,86\u00a0mm × 10,16\u00a0mm, combien de modes TM passent ?",
        options: { a: "Aucun : un guide rectangulaire ne guide que des modes TE.", b: "Deux : TM₁₀ et TM₁₁.", c: "Un seul, TM₁₁, dont la coupure à 16,2\u00a0GHz est celle de TE₁₁.", d: "Quatre, autant que de modes TE." },
        why: "Un mode TM a un champ Ez en sin(mπx/a) sin(nπy/b), nul partout si m ou n est nul : TM₁₀ et TM₀₁ n'existent pas. Le premier, TM₁₁, coupe à (c/2)√((1/a)² + (1/b)²) ≈ 16,2\u00a0GHz. À 17\u00a0GHz passent TE₁₀, TE₂₀, TE₀₁, TE₁₁ et TM₁₁. Leçon « Modes d'un guide »." },
      images: { prompt: "Dans le guide de 22,86\u00a0mm à 12\u00a0GHz (λ0 = 2,50\u00a0cm), on décrit le mode TE₁₀ par deux ondes planes. Quel angle font-elles avec l'axe, et à quelle vitesse le motif avance-t-il le long du guide ?",
        options: { a: "90°, et le motif est immobile : les ondes vont d'un mur à l'autre.", b: "0°, à la vitesse c.", c: "Environ 57°, à c sin θ ≈ 0,84 c.", d: "Environ 33°, à c/cos θ ≈ 1,19 c : la vitesse de phase, plus grande que c." },
        hint: "(24.33) : sin θ = λ0/(2a).",
        why: "sin θ = 2,50/4,572 ≈ 0,546, θ ≈ 33°. Les crêtes se croisent sur un point qui glisse à c/cos θ ≈ 1,19 c ; l'énergie avance à c cos θ ≈ 0,84 c, et le produit des deux vaut c². Leçon « Une autre façon de voir les ondes guidées »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

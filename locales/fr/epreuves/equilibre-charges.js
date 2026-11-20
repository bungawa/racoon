/* Épreuve de l'étape « Équilibre et stabilité des charges » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      gauss: { prompt: "Deux champs E1 et E2 ont le même flux que le champ de Coulomb de charges données, à travers toute surface fermée. Qu'en conclure ?",
        options: { a: "Rien de plus : ils peuvent différer d'un champ de divergence nulle. Il faut aussi un rotationnel nul et un champ qui tend vers zéro loin des charges pour qu'ils soient égaux.", b: "Ils sont égaux : la loi de Gauss détermine le champ.", c: "Ils diffèrent au plus d'un champ uniforme.", d: "Ils sont égaux si les charges sont ponctuelles." },
        hint: "Un tourbillon ne change aucun flux.",
        why: "Le flux est une intégrale : un seul nombre par surface, pour un champ à trois composantes. Ajouter un champ de divergence nulle, un tourbillon par exemple, ne change aucun flux. Rotationnel nul et condition à l'infini rendent le champ unique. Leçon « Théorème de Gauss et rotationnel nul »." },
      tourbillon: { prompt: "Au champ de charges fixes, on ajoute le champ ω ez ∧ r avec ω = 10⁵ V·m⁻². Que vaut alors la circulation sur un cercle de 2 cm de rayon centré à l'origine, dans le plan z = 0 ?",
        options: { a: "Zéro, puisque le champ de charges fixes a une circulation nulle.", b: "Environ 250 V : 2ωπR² = 2 × 10⁵ × π × 4 × 10⁻⁴.", c: "Environ 126 V : ωπR².", d: "Elle dépend des charges à l'intérieur du cercle." },
        why: "La circulation du champ des charges est nulle sur toute boucle ; celle du tourbillon vaut son rotationnel, 2ω, fois l'aire πR² : 2 × 10⁵ × 1,26 × 10⁻³ ≈ 251 V. Un champ électrostatique ne peut pas contenir un tel terme. Leçon « Théorème de Gauss et rotationnel nul »." },
      triangle: { prompt: "Au centre d'un triangle de trois charges de \u22121 nC à 3 cm, une charge de +1 nC a, hors du plan du triangle, la raideur +1,0 × 10⁻³ N·m⁻¹. Que valent les deux raideurs dans le plan ?",
        options: { a: "+1,0 × 10⁻³ N·m⁻¹ chacune : le triangle est symétrique.", b: "Zéro : le champ est nul au centre.", c: "\u22125,0 × 10⁻⁴ N·m⁻¹ chacune : la somme des trois raideurs est nulle.", d: "+5,0 × 10⁻⁴ N·m⁻¹ chacune." },
        hint: "La somme des raideurs vaut q Δφ.",
        why: "Au centre, il n'y a pas de charge : Δφ = 0, donc k1 + k2 + k3 = 0. Par symétrie, les deux raideurs du plan sont égales : chacune vaut \u22121,0 × 10⁻³ / 2. La charge est repoussée dans le plan, vers l'une des charges négatives. Leçon « Équilibre dans un champ électrostatique »." },
      cube: { prompt: "Au centre d'un cube portant huit charges égales à ses sommets, les trois raideurs d'une charge d'essai sont nulles. Est-elle en équilibre stable ?",
        options: { a: "Oui : sans raideur négative, rien ne la pousse.", b: "Elle est en équilibre indifférent : elle reste où on la pose.", c: "Oui, si elle est de signe opposé aux charges du cube.", d: "Non : l'énergie varie alors en s⁴, et ce terme d'ordre quatre monte dans certaines directions mais descend dans d'autres." },
        why: "La symétrie cubique annule l'ordre deux : la somme nulle impose trois raideurs égales, donc nulles. L'ordre quatre décide : selon une arête l'énergie monte, selon une grande diagonale elle descend, ou l'inverse selon le signe. Il n'existe jamais de minimum dans le vide. Leçon « Équilibre dans un champ électrostatique »." },
      image: { prompt: "Une charge de 2 nC est à 1 cm d'un grand plan métallique relié à la terre. Quelle force le plan exerce-t-il sur elle ?",
        options: { a: "Une répulsion de 9 × 10⁻⁵ N, car les charges induites ont le même signe.", b: "Une attraction d'environ 9 × 10⁻⁵ N : celle de son image \u22122 nC à 2 cm, K q²/(2z)².", c: "Une attraction de 3,6 × 10⁻⁴ N : K q²/z².", d: "Aucune : le plan est au potentiel nul." },
        why: "L'image est \u2212q, en symétrique, à 2z = 2 cm : F = 9 × 10⁹ × 4 × 10⁻¹⁸ / 4 × 10⁻⁴ = 9 × 10⁻⁵ N, attractive quel que soit le signe de q. Le facteur 1/2 de l'énergie \u2212Kq²/(4z) ne change pas cette force. Leçon « Équilibre en présence de conducteurs »." },
      figee: { prompt: "On déplace une charge en équilibre près de conducteurs, d'abord en gardant figées leurs charges, puis en les laissant se réarranger. Que dit-on de l'énergie, comparée au cas figé ?",
        options: { a: "Elle est plus basse ou égale, avec la même valeur et la même pente à l'équilibre : là où le cas figé descend, le cas libre descend encore plus.", b: "Elle est plus haute : les conducteurs résistent au déplacement.", c: "Elle est égale : les conducteurs ne changent rien.", d: "Elle dépend du signe de la charge." },
        why: "Libérées, les charges des conducteurs vont vers un nouvel équilibre en dissipant de la chaleur : l'énergie ne peut que baisser. Le cas figé est un système de charges fixes, avec un col ; le cas libre creuse ce col. Chaque raideur diminue. Leçon « Équilibre en présence de conducteurs »." },
      chute: { prompt: "Un électron classique en orbite de rayon a0 tombe sur le proton en 16 ps en rayonnant. En combien de temps tomberait-il depuis une orbite de rayon 2 a0 ?",
        options: { a: "32 ps : la durée est proportionnelle au rayon.", b: "64 ps : la durée est proportionnelle au carré du rayon.", c: "16 ps : la durée ne dépend pas du rayon.", d: "Environ 125 ps : la durée est proportionnelle au cube du rayon initial." },
        hint: "r³ = r0³ \u2212 4re²ct.",
        why: "La chute dure r0³/(4re²c) : doubler r0 multiplie la durée par 8, soit 8 × 15,6 ps ≈ 125 ps. Ce reste une fraction de nanoseconde : aucun atome classique ne durerait. Leçon « Stabilité des atomes »." },
      muon: { prompt: "Le muon a la charge de l'électron et une masse environ 207 fois plus grande. D'après l'estimation E(a) = ħ²/(2ma²) \u2212 Ke²/a, quelle est la taille d'un muon lié à un proton, en négligeant le mouvement du proton ?",
        options: { a: "52,9 pm, comme l'hydrogène : seule la charge compte.", b: "207 fois plus grande, environ 11 nm.", c: "Environ 0,26 pm : la taille optimale ħ²/(mKe²) est inversement proportionnelle à la masse.", d: "Zéro : un muon lourd tombe sur le proton." },
        hint: "Où est le minimum de E(a), et comment dépend-il de m ?",
        why: "Le minimum est en a = ħ²/(mKe²) : 207 fois plus lourd, 207 fois plus petit, 52,9/207 ≈ 0,26 pm, avec une énergie 207 fois plus grande. Le proton n'est plus infiniment lourd devant le muon, environ 9 fois plus lourd seulement : la masse réduite corrige ces valeurs d'environ 10 %. Leçon « Stabilité des atomes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

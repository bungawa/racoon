/* Épreuve de l'étape « Théorème de Larmor et moment cinétique quantique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      frequence: { prompt: "Un atome sans spin est placé dans un champ de 2,0\u00a0T. À quelle fréquence tourne le repère de Larmor de ses électrons ?",
        options: { a: "56,0\u00a0GHz.", b: "28,0\u00a0GHz.", c: "14,0\u00a0GHz.", d: "28,0\u00a0MHz." },
        hint: "f_L = q_e B/(4π m), soit μ_B/h ≈ 14,0 GHz par tesla.",
        why: "14,0 × 2,0 = 28,0 GHz. La moitié de la fréquence cyclotron q_e B/(2π m), qui donnerait 56,0 GHz : le repère de Larmor tourne deux fois moins vite qu'un électron libre sur son cercle. Leçon « Théorème de Larmor »." },
      precession: { prompt: "Un électron libre est dans un champ de 0,35\u00a0T. Quelle est la fréquence qui correspond à l'écart entre ses deux niveaux magnétiques ?",
        options: { a: "4,9\u00a0GHz.", b: "14,9\u00a0MHz.", c: "0,35\u00a0GHz.", d: "9,8\u00a0GHz." },
        hint: "L'écart vaut g μ_B B avec g ≈ 2 ; divisez par h.",
        why: "2,002 × 14,0 GHz·T⁻¹ × 0,35 T ≈ 9,8 GHz : c'est aussi la fréquence de précession du spin dans ce champ. 4,9 GHz oublie le facteur g. Leçon « Énergie magnétique des atomes »." },
      anomal: { prompt: "Pourquoi les raies d'un atome dont le spin électronique compte se séparent-elles en un motif « anomal », et non en trois raies ?",
        options: { a: "Parce que le moment de spin précesse à environ deux fois la pulsation de Larmor : aucun repère tournant unique n'efface le champ.", b: "Parce que le champ n'est pas uniforme à l'échelle de l'atome.", c: "Parce que le noyau tourne aussi.", d: "Parce que le champ est trop faible pour le théorème de Larmor." },
        why: "Le théorème suppose le même rapport μ/J pour tout ce qui tourne. Le spin, de g ≈ 2, ne suit pas l'orbite, de g = 1 : le motif se complique. Leçon « Théorème de Larmor »." },
      gaz: { prompt: "Un gaz classique de charges, tenu dans une boîte fixe à l'équilibre thermique, est placé dans un champ statique. Les orbites intérieures portent chacune en moyenne \u2212k_B T/B. Que vaut le moment total ?",
        options: { a: "\u2212N k_B T/B : le diamagnétisme de Larmor.", b: "+N k_B T/B : les charges du bord l'emportent.", c: "Zéro : les charges qui rebondissent le long de la paroi portent exactement le moment opposé.", d: "Il dépend de la forme de la boîte." },
        why: "L'énergie ne dépend pas du champ, donc la distribution d'équilibre non plus : le moment moyen est nul pour toute boîte. Les orbites de bord compensent exactement l'intérieur. Leçon « La physique classique ne donne ni diamagnétisme ni paramagnétisme »." },
      etoile: { prompt: "Le raisonnement qui montre qu'un système classique à l'équilibre n'a pas d'aimantation ne s'applique pas à une étoile isolée. Pourquoi ?",
        options: { a: "Parce qu'une étoile est trop chaude.", b: "Parce qu'elle n'est pas tenue dans une boîte fixe : établir le champ peut la mettre en rotation, et un corps chargé qui tourne porte un moment.", c: "Parce que sa gravitation travaille sur les charges.", d: "Parce que les étoiles sont des objets quantiques." },
        why: "Le théorème suppose que l'ensemble ne peut pas tourner. Un système libre peut acquérir un moment cinétique en même temps qu'un moment magnétique. Leçon « La physique classique ne donne ni diamagnétisme ni paramagnétisme »." },
      spin52: { prompt: "Pour un noyau de spin 5/2, que valent J·J et le plus petit angle entre J et un axe ?",
        options: { a: "25ħ²/4, et 0° : il peut être aligné.", b: "35ħ²/4, et 0°.", c: "25ħ²/4, et environ 32°.", d: "35ħ²/4, et environ 32°." },
        hint: "J·J = j(j + 1)ħ² ; cos θ_min = j/√(j(j + 1)).",
        why: "(5/2)(7/2) = 35/4. cos θ_min = 2,5/√8,75 ≈ 0,845, soit environ 32° : la plus grande composante, 5ħ/2, reste plus courte que le vecteur. Leçon « Moment cinétique en mécanique quantique »." },
      rotation: { prompt: "Une molécule diatomique rigide émet sa raie J = 1 → 0 à 115\u00a0GHz. À quelle fréquence est sa raie J = 3 → 2 ?",
        options: { a: "345\u00a0GHz.", b: "230\u00a0GHz.", c: "575\u00a0GHz.", d: "1,04\u00a0THz." },
        hint: "E_J est proportionnelle à J(J + 1).",
        why: "E₃ \u2212 E₂ = (12 \u2212 6) = 6 unités, E₁ \u2212 E₀ = 2 unités : trois fois plus, 345 GHz. Avec J² au lieu de J(J + 1), on aurait trouvé 5 × 115 = 575 GHz. Leçon « Moment cinétique en mécanique quantique »." },
      niveaux: { prompt: "Un atome de spin 1 et de facteur g = 3/2 est placé dans un champ de 0,50\u00a0T. Combien de niveaux, et quel écart entre deux voisins ?",
        options: { a: "Deux niveaux, écartés de 4,3 × 10⁻⁵\u00a0eV.", b: "Trois niveaux, écartés de 2,9 × 10⁻⁵\u00a0eV.", c: "Trois niveaux, écartés de 4,3 × 10⁻⁵\u00a0eV.", d: "Quatre niveaux, écartés de 4,3 × 10⁻⁵\u00a0eV." },
        hint: "μ_B ≈ 5,79 × 10⁻⁵ eV·T⁻¹.",
        why: "2j + 1 = 3 niveaux, J_z = ħ, 0, \u2212ħ ; écart g μ_B B = 1,5 × 5,79 × 10⁻⁵ × 0,50 ≈ 4,3 × 10⁻⁵ eV. Sans le facteur g, 2,9 × 10⁻⁵ eV. Leçon « Énergie magnétique des atomes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

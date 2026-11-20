/* Épreuve de l'étape « Condensateurs, cristaux ioniques et noyaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      isole: { prompt: "Deux armatures planes de 10\u00a0cm × 10\u00a0cm, à 1\u00a0mm l'une de l'autre, portent ±10\u00a0nC et sont isolées. Quelle force les attire (bords négligés) ?",
        options: { a: "Environ 0,56\u00a0mN, quel que soit l'écart.", b: "Environ 1,1\u00a0mN : chaque armature subit le champ E0 = σ/ε0.", c: "Environ 0,56\u00a0mN à 1\u00a0mm, et quatre fois moins à 2\u00a0mm.", d: "Zéro : le champ est nul hors du condensateur." },
        hint: "(8.17) : Q²/(2ε0A).",
        why: "(10⁻⁸)²/(2 × 8,85 × 10⁻¹² × 0,01) ≈ 5,6 × 10⁻⁴\u00a0N. À charge fixée, 1/C croît comme l'écart : la force n'en dépend pas. Chaque armature ne subit que le champ de l'autre, E0/2. Leçon « Énergie d'un condensateur et forces sur les conducteurs »." },
      generateur: { prompt: "Un condensateur reste branché sur un générateur de tension V pendant qu'on écarte lentement ses armatures. Que reçoit le générateur ?",
        options: { a: "Rien : à tension fixée, aucune charge ne circule.", b: "Le double de l'énergie que perd le condensateur ; l'opérateur fournit la différence, contre l'attraction.", c: "Exactement ce que perd le condensateur.", d: "Il fournit de l'énergie au condensateur, qui en gagne." },
        why: "C baisse de |ΔC| : le condensateur perd ½V²|ΔC|, une charge V|ΔC| retourne au générateur, qui reçoit V²|ΔC|. L'opérateur fournit ½V²|ΔC| : c'est (8.15a), la même force qu'à charge fixée. Leçon « Énergie d'un condensateur et forces sur les conducteurs »." },
      ressort: { prompt: "Une plaque de 200\u00a0µm de côté, tenue par un ressort de 4\u00a0N·m⁻¹, est à 3\u00a0µm d'une électrode. On monte lentement la tension. Quand bascule-t-elle ?",
        options: { a: "Vers 4,8\u00a0V, quand elle a avancé de la moitié de l'écart.", b: "Vers 19\u00a0V, quand elle touche l'électrode.", c: "Vers 9,5\u00a0V, quand elle a avancé de 1\u00a0µm, le tiers de l'écart.", d: "Jamais : le ressort finit toujours par l'emporter." },
        hint: "(8.15c) : Vb² = 8 k d0³/(27 ε0 A).",
        why: "8 × 4 × (3 × 10⁻⁶)³/(27 × 8,85 × 10⁻¹² × 4 × 10⁻⁸) ≈ 90\u00a0V², Vb ≈ 9,5\u00a0V. Au-delà de d0/3, l'attraction en 1/(d0 \u2212 x)² croît plus vite que la force du ressort. Leçon « Énergie d'un condensateur et forces sur les conducteurs »." },
      rangees: { prompt: "Dans le sel, la rangée qui passe par un ion donne 1,386 (en e²/(4πε0a)), et le cristal entier 1,748. Quelle part de l'énergie apportent toutes les autres rangées ?",
        options: { a: "Presque tout : la rangée de l'ion compte peu.", b: "Rien : les autres rangées sont neutres.", c: "Environ 50\u00a0% : il y a autant de rangées voisines que d'ions sur la rangée.", d: "Environ 21\u00a0%, apportés surtout par les quatre rangées les plus proches." },
        why: "(1,748 \u2212 1,386)/1,748 ≈ 21\u00a0%. Les quatre rangées à la distance a apportent +0,473, les quatre à √2a \u22120,109, et la suite tombe vite : une rangée neutre ne se voit presque plus à deux espacements. Leçon « Énergie électrostatique d'un cristal ionique »." },
      ordre: { prompt: "Pourquoi la somme de Madelung du sel donne-t-elle 1,748 par rangées ou par cubes neutres, mais aucune valeur par sphères croissantes ?",
        options: { a: "Elle ne converge que grâce aux compensations : une sphère contient une charge nette sur son bord, dont le potentiel au centre ne s'annule pas quand le rayon croît.", b: "Les sphères comptent deux fois certains ions.", c: "Les sphères oublient les ions de même signe.", d: "Par erreur d'arrondi : il faudrait plus de chiffres." },
        why: "Une série semi-convergente dépend de l'ordre de ses termes. Une région neutre et sans dipôle donne la bonne valeur ; une sphère ne l'est pas. Emersleben l'a démontré en 1951. Leçon « Énergie électrostatique d'un cristal ionique »." },
      distance: { prompt: "Le potentiel d'une rangée alternée d'ions, d'espacement a, vaut 0,118 e/(4πε0a) à la distance a. À la distance 2a, il vaut environ :",
        options: { a: "0,059, deux fois moins, comme une charge.", b: "0,0037, environ 30 fois moins : il s'éteint comme e^(\u2212πρ/a).", c: "0,030, quatre fois moins, comme un dipôle.", d: "0,118 : une rangée infinie produit un potentiel uniforme." },
        hint: "Premier terme de (8.21a) : K0(u) ≈ e^(\u2212u)√(π/2u).",
        why: "K0(2π)/K0(π) ≈ e^(\u2212π)/√2 ≈ 0,031. Les plus et les moins voisins se compensent d'autant mieux qu'on est loin : aucune loi de puissance. Leçon « Énergie électrostatique d'un cristal ionique »." },
      miroir: { prompt: "Le calcium 39 (20 protons) est plus lourd que le potassium 39 (19 protons) de 6,52\u00a0MeV. Quel rayon la boule uniforme (8.23b) donne-t-elle ? (e²/(4πε0) = 1,44\u00a0MeV·fm)",
        options: { a: "5,0\u00a0fm.", b: "4,1\u00a0fm.", c: "4,5\u00a0fm.", d: "3,7\u00a0fm." },
        hint: "Ajoutez d'abord 0,782\u00a0MeV, la différence de masse entre un neutron et un proton plus un électron.",
        why: "ΔE = 6,52 + 0,78 = 7,31\u00a0MeV ; R = (6 × 19/5) × 1,44/7,31 ≈ 4,5\u00a0fm. Sans les 0,78\u00a0MeV, on trouverait 5,0\u00a0fm ; (8.25) donne 4,1\u00a0fm et le modèle du dernier proton 3,7\u00a0fm. Leçon « Énergie électrostatique des noyaux »." },
      paires: { prompt: "Pour l'hélium 3 (2 protons), de combien (8.22), qui compte Z², et (8.23), qui compte Z(Z \u2212 1), diffèrent-elles ?",
        options: { a: "De 1/Z², négligeable.", b: "De 5\u00a0%.", c: "Elles sont égales pour Z = 2.", d: "D'un facteur 2 : un proton n'interagit pas avec lui-même, et ici il n'y a qu'une paire." },
        why: "Z² = 4, Z(Z \u2212 1) = 2. L'erreur relative de (8.22), de l'ordre de 1/Z, est énorme pour les noyaux légers, où l'on tire justement les rayons des noyaux miroirs. Leçon « Énergie électrostatique des noyaux »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Diamagnétisme et moments magnétiques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      force: { prompt: "Un aimant fait flotter une goutte d'eau en un point où le champ décroît vers le haut. On pose au même point une bille d'aluminium, paramagnétique. Que se passe-t-il ?",
        options: { a: "Elle tombe : la force magnétique, dirigée vers le champ fort, s'ajoute à son poids.", b: "Elle flotte aussi : la force ne dépend que de B dB/dz.", c: "Elle est projetée vers le haut, son χ étant plus grand en valeur absolue.", d: "Rien de magnétique : l'aluminium n'est pas ferromagnétique." },
        hint: "La force vaut χ V B dB/dz/μ0 : regardez le signe de χ.",
        why: "L'eau, χ < 0, est poussée vers le champ faible, ici vers le haut. L'aluminium, χ > 0, est tiré vers le champ fort, vers le bas : la force s'ajoute au poids. Leçon « Diamagnétisme et paramagnétisme »." },
      temperature: { prompt: "On refroidit de 300\u00a0K à 150\u00a0K de l'eau et un sel de fer paramagnétique. Que devient l'aimantation de chacun, dans le même champ ?",
        options: { a: "Elle double pour les deux.", b: "Celle du sel augmente nettement, celle de l'eau presque pas.", c: "Celle de l'eau double, celle du sel ne change pas.", d: "Les deux s'annulent." },
        why: "L'alignement des moments permanents du sel lutte contre l'agitation thermique : il croît quand la température baisse. Le moment induit de l'eau, diamagnétique, est créé dans chaque molécule par le champ et ne dépend que de ⟨r²⟩." },
      orbite: { prompt: "Un électron parcourt un cercle de rayon 1,0 × 10⁻¹⁰\u00a0m à 1,0 × 10⁶\u00a0m·s⁻¹. Quel est son moment magnétique orbital ?",
        options: { a: "9,27 × 10⁻²⁴\u00a0J·T⁻¹, le magnéton de Bohr, quelle que soit l'orbite.", b: "1,6 × 10⁻²³\u00a0J·T⁻¹.", c: "8,0 × 10⁻²⁴\u00a0J·T⁻¹.", d: "4,0 × 10⁻²⁴\u00a0J·T⁻¹." },
        hint: "μ = q v r/2.",
        why: "1,6 × 10⁻¹⁹ × 10⁶ × 10⁻¹⁰/2 = 8,0 × 10⁻²⁴\u00a0J·T⁻¹. Sans le facteur ½, on trouve le double ; avec un facteur ¼, la moitié. Le magnéton de Bohr correspond à une orbite précise, de moment cinétique ħ." },
      g: { prompt: "Une boule de masse uniforme, dont la charge est répartie sur la surface, tourne sur elle-même. Quel est son facteur g, rapport de μ/J à Q/(2M) ?",
        options: { a: "1, comme toute charge qui tourne.", b: "2, comme le spin de l'électron.", c: "2/5.", d: "5/3." },
        hint: "Comparez les carrés moyens des distances à l'axe : 2R²/3 pour une sphère, 2R²/5 pour une boule pleine.",
        why: "g = ⟨s²⟩charge/⟨s²⟩masse = (2/3)/(2/5) = 5/3. Un modèle classique peut donner tout g ; mais un électron-boule assez petit tournerait plus vite que la lumière. Leçon « Moments magnétiques et moment cinétique »." },
      proton: { prompt: "À quelle fréquence précessent les protons dans un champ de 0,50\u00a0T ?",
        options: { a: "21,3\u00a0MHz.", b: "42,6\u00a0MHz.", c: "14,0\u00a0GHz.", d: "3,81\u00a0MHz." },
        hint: "Le proton : g = 5,59, et 7,62\u00a0MHz·T⁻¹ pour g = 1 avec la masse du proton.",
        why: "5,59 × 7,62 × 0,50 ≈ 21,3\u00a0MHz. 42,6\u00a0MHz est la valeur pour 1\u00a0T ; 14,0\u00a0GHz celle d'un électron libre ; 3,81\u00a0MHz oublie le facteur g du proton. Leçon « Précession des aimants atomiques »." },
      angle: { prompt: "On mesure la fréquence de précession d'un même atome avec son moment cinétique à 10°, puis à 80° du champ. Qu'observe-t-on ?",
        options: { a: "Elle est environ 5,7 fois plus grande à 80°, comme sin θ.", b: "La même fréquence.", c: "Elle est plus grande à 10°, où le moment est presque aligné.", d: "À 80°, le moment s'aligne au lieu de précesser." },
        why: "Le couple μB sin θ et le rayon J sin θ du cercle décrit par la pointe de J varient ensemble : ω_p = (μ/J)B ne dépend pas de θ. Le couple, perpendiculaire à J, ne le rapproche jamais du champ." },
      sens: { prompt: "Un atome sans moment permanent a deux électrons qui tournent en sens contraires. On établit un champ. Que devient son moment ?",
        options: { a: "Il reste nul : les deux changements se compensent.", b: "Il devient parallèle au champ : l'électron qui tourne dans le bon sens l'emporte.", c: "Il devient opposé au champ : les deux électrons gagnent le même moment induit.", d: "Il oscille autour de zéro tant que le champ est appliqué." },
        why: "Le champ électrique induit exerce le même couple sur les deux électrons : même ΔJ, même Δμ = \u2212q²r²B/(4m), opposé au champ quel que soit le sens de l'orbite. Leçon « Diamagnétisme »." },
      taille: { prompt: "Si les électrons d'un atome étaient en moyenne deux fois plus loin du noyau, sa susceptibilité diamagnétique serait :",
        options: { a: "inchangée : elle ne dépend que du nombre d'électrons.", b: "doublée.", c: "divisée par quatre, le champ agissant moins loin du noyau.", d: "multipliée par quatre." },
        why: "χ est proportionnelle à ⟨r²⟩, (34.17a) : doubler les distances multiplie la susceptibilité par 4. C'est pourquoi la susceptibilité d'un gaz rare mesure la taille de ses atomes." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

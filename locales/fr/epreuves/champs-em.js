/* Épreuve de l'étape « Champs électrique et magnétique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      protons: { prompt: "Deux protons se repoussent électriquement et s'attirent par gravitation. À 1\u00a0m l'un de l'autre, le rapport des deux forces vaut 1,24 × 10³⁶. Que vaut-il à 1\u00a0fm, la taille d'un noyau, si l'on ne considère que ces deux lois ?",
        options: { a: "Toujours 1,24 × 10³⁶ : les deux forces varient en 1/r², le rapport ne dépend pas de la distance.", b: "1,24 × 10⁶ : il est divisé par le rapport des distances au carré.", c: "1,24 × 10⁶⁶ : la force électrique gagne à courte distance.", d: "Environ 1 : à cette distance la gravitation rattrape la force électrique." },
        hint: "Écrivez Fe/Fg avec les deux lois.",
        why: "Fe/Fg = e²/(4π ε0 G mp²) : les 1/r² se simplifient. À 1\u00a0fm, Fe ≈ 230\u00a0N et Fg ≈ 1,9 × 10⁻³⁴\u00a0N. Ce qui change à cette échelle, c'est l'apparition de la force forte, pas le rapport. Leçon « Les forces électriques »." },
      exces: { prompt: "Avec 1\u00a0% d'électrons en excès chacune, deux personnes de 70\u00a0kg à 1\u00a0m se repousseraient avec environ 1,3 × 10²⁵\u00a0N. Et avec un excès de 10⁻⁶ seulement ?",
        options: { a: "Environ 1,3 × 10²¹\u00a0N : la force est proportionnelle à l'excès.", b: "Environ 1,3 × 10¹⁷\u00a0N : la force varie comme le carré de l'excès, divisé ici par 10⁴.", c: "Environ 1,3 × 10⁹\u00a0N : la force varie comme la puissance quatre de l'excès.", d: "Zéro : un excès aussi faible ne crée aucune force." },
        hint: "Chaque charge est proportionnelle à l'excès, et la force au produit des deux charges.",
        why: "q ∝ f, donc F ∝ f². Diviser f par 10⁴ divise F par 10⁸ : 1,3 × 10¹⁷\u00a0N, encore le poids de dix mille milliards de tonnes. La neutralité réelle de la matière est bien meilleure que 10⁻⁶. Leçon « Les forces électriques »." },
      electron: { prompt: "Un électron se déplace à 1\u202f000\u00a0km·s⁻¹, perpendiculairement au champ magnétique terrestre, pris égal à 50\u00a0µT. Quelle force magnétique subit-il, et quel champ électrique lui donnerait la même force ?",
        options: { a: "8 × 10⁻²⁴\u00a0N ; 5 × 10⁻⁵\u00a0V·m⁻¹.", b: "Aucune force : le champ terrestre est trop faible pour agir sur un électron.", c: "8 × 10⁻¹⁸\u00a0N ; 50\u00a0V·m⁻¹.", d: "8 × 10⁻¹⁸\u00a0N, parallèle à sa vitesse ; 50\u00a0V·m⁻¹." },
        hint: "(1.1) : la force magnétique vaut e v B quand v est perpendiculaire à B.",
        why: "evB = 1,6 × 10⁻¹⁹ × 10⁶ × 5 × 10⁻⁵ ≈ 8 × 10⁻¹⁸\u00a0N, perpendiculaire à la vitesse et au champ, jamais parallèle à v. Le champ électrique équivalent est E = vB = 50\u00a0V·m⁻¹. Leçon « Champ électrique et champ magnétique »." },
      fils: { prompt: "Deux longs fils parallèles distants de 6\u00a0cm sont parcourus chacun par 10\u00a0A. Que vaut le champ magnétique au milieu de leur segment, si les courants sont de sens opposés ?",
        options: { a: "Zéro : les deux champs se compensent au milieu.", b: "6,7 × 10⁻⁵\u00a0T, le champ d'un seul fil à 3\u00a0cm.", c: "3,3 × 10⁻⁵\u00a0T : chaque fil en donne la moitié.", d: "1,3 × 10⁻⁴\u00a0T : les deux champs, chacun de 6,7 × 10⁻⁵\u00a0T, ont même direction et même sens." },
        hint: "Tracez les cercles de B autour de chaque fil, l'un tournant dans un sens, l'autre dans l'autre.",
        why: "Chaque fil donne μ0 I/(2π r) = 2 × 10⁻⁷ × 10/0,03 ≈ 6,7 × 10⁻⁵\u00a0T. En sens opposés, au milieu, les deux champs s'ajoutent : superposition (1.3). En sens identiques, ils s'annuleraient. Leçons « Champ électrique et champ magnétique » et « Les lois de l'électromagnétisme »." },
      flux: { prompt: "Un champ de vecteurs a un flux non nul à travers certaines surfaces fermées, mais une circulation nulle le long de toute boucle. Lequel de ces champs se comporte ainsi ?",
        options: { a: "Le champ électrique de charges immobiles.", b: "Le champ magnétique d'un fil rectiligne.", c: "La vitesse d'un disque qui tourne.", d: "Un champ uniforme." },
        hint: "Le flux signale des sources ; la circulation, ce qui tourne.",
        why: "Le champ de charges immobiles jaillit des charges, (1.6), et ne tourne pas : sa circulation est nulle en régime permanent, (1.7). Le fil et le disque ont une circulation ; le champ uniforme n'a ni flux net ni circulation. Leçon « Ce qui caractérise un champ de vecteurs »." },
      ampere: { prompt: "Une boucle carrée entoure un fil parcouru par 20\u00a0A ; un second fil, parcouru par 50\u00a0A, passe à l'extérieur de la boucle, tout près. Que vaut la circulation de B le long de la boucle ?",
        options: { a: "μ0 × 70\u00a0A ≈ 8,8 × 10⁻⁵\u00a0T·m : tous les courants comptent.", b: "μ0 × 20\u00a0A ≈ 2,5 × 10⁻⁵\u00a0T·m : seul compte le courant enlacé.", c: "Zéro, car la boucle est carrée et non circulaire.", d: "Elle dépend de la distance du second fil." },
        hint: "Essayez de déplacer le cercle dans l'interaction d'Ampère.",
        why: "D'après (1.9) en régime permanent, la circulation de B vaut μ0 fois le courant qui traverse une surface bordée par la boucle, quelle que soit sa forme. Le second fil modifie B le long de la boucle, mais sa contribution à la circulation est nulle. Leçon « Les lois de l'électromagnétisme »." },
      delai: { prompt: "Une antenne de 50\u00a0cm est parcourue par un courant qui oscille à 1\u00a0GHz. Le courant change notablement en Δt ≈ 1\u00a0ns. Peut-on traiter l'interaction entre les charges de ses deux extrémités comme instantanée ?",
        options: { a: "Oui : la lumière parcourt 50\u00a0cm en un temps négligeable.", b: "Oui, si l'antenne est en cuivre.", c: "Non : L/(cΔt) ≈ 1,7 ; le délai de propagation est du même ordre que la durée du mouvement, il faut les champs et leur propagation.", d: "Non, car aucune interaction n'est jamais traitée comme instantanée." },
        hint: "Calculez L/c, puis comparez à Δt.",
        why: "L/c ≈ 1,7\u00a0ns, comparable à Δt : le nombre L/(cΔt) ≈ 1,7 n'est pas petit. Pour un circuit de 1\u00a0m alimenté à 50\u00a0Hz, avec Δt ≈ 3\u00a0ms, il vaudrait 10⁻⁶ et l'image instantanée serait excellente. C'est la raison pour laquelle une antenne rayonne. Leçon « Que sont les champs ? »." },
      antenne: { prompt: "Une station de radio émet à 100\u00a0MHz. Quelle longueur d'onde, et quelle longueur pour une antenne demi-onde ? Et d'où vient la vitesse qui sert au calcul ?",
        options: { a: "30\u00a0cm et 15\u00a0cm ; c est une constante de la mécanique, sans lien avec l'électricité.", b: "300\u00a0m et 150\u00a0m ; c vient de la vitesse du son dans l'air.", c: "3\u00a0m et 3\u00a0m ; c ne se calcule pas, elle se mesure seulement.", d: "3\u00a0m et 1,5\u00a0m ; c = 1/√(ε0 μ0), tirée de deux constantes de l'électricité et du magnétisme." },
        why: "λ = c/f = 3 × 10⁸ / 10⁸ = 3\u00a0m ; λ/2 = 1,5\u00a0m. Les équations de Maxwell donnent aux ondes la vitesse 1/√(ε0 μ0), que Maxwell a reconnue comme celle de la lumière. Leçons « L'électromagnétisme dans la science et la technique » et « Les lois de l'électromagnétisme »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

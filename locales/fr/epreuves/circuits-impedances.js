/* Épreuve de l'étape « Impédances et réseaux en régime sinusoïdal » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      bobine: { prompt: "Une bobine de 10\u00a0mH, dont le fil fait 5\u00a0Ω, est branchée sur le secteur à 50\u00a0Hz, puis sur un générateur à 20\u00a0kHz. Dans quel cas est-elle une inductance à quelques pour cent près ?",
        options: { a: "À 20\u00a0kHz seulement : Lω = 1,26\u00a0kΩ y écrase les 5\u00a0Ω du fil, alors qu'à 50\u00a0Hz Lω = 3,1\u00a0Ω leur est inférieure.", b: "À 50\u00a0Hz seulement : une inductance n'est idéale qu'à basse fréquence.", c: "Dans les deux cas : l'impédance d'une bobine est toujours iLω.", d: "Dans aucun : une bobine réelle n'est jamais une inductance." },
        hint: "Comparez r et Lω à chaque fréquence.",
        why: "Le nombre qui mesure ce qu'on néglige est r/(Lω) : 1,6 à 50\u00a0Hz, 4 × 10⁻³ à 20\u00a0kHz. Plus haut encore, la capacité entre spires prend le relais : avec 20\u00a0pF, la bobine résonne à 356\u00a0kHz et devient capacitive au-delà. Leçon « Impédances »." },
      condensateur: { prompt: "Un condensateur de 100\u00a0nF a des connexions de 10\u00a0nH. À 20\u00a0MHz, son impédance est…",
        options: { a: "capacitive, \u22120,08i\u00a0Ω environ : 1/(iωC) avec C = 100\u00a0nF.", b: "inductive : au-dessus de 1/(2π√(LC)) = 5,0\u00a0MHz, iωL l'emporte sur 1/(iωC).", c: "nulle.", d: "infinie." },
        hint: "Calculez la fréquence où iωL et 1/(iωC) se compensent.",
        why: "À 20\u00a0MHz, ωL ≈ 1,26\u00a0Ω et 1/(Cω) ≈ 0,08\u00a0Ω : l'inductance des connexions domine, et le « condensateur » se comporte comme une bobine. C'est la fréquence de résonance propre des fiches techniques. Leçon « Impédances »." },
      pile: { prompt: "Une pile de ℰ = 1,5\u00a0V et de résistance interne 0,2\u00a0Ω débite dans une résistance de 0,2\u00a0Ω. La tension à ses bornes vaut…",
        options: { a: "1,5\u00a0V : un générateur impose sa tension.", b: "0,3\u00a0V.", c: "0,75\u00a0V : la moitié de ℰ chute dans la résistance interne.", d: "1,2\u00a0V." },
        hint: "V = ℰ R/(r + R).",
        why: "I = 1,5/0,4 = 3,75\u00a0A et V = ℰ \u2212 rI = 0,75\u00a0V. Le modèle idéal se trompe de |zᵢ|/|zᵢ + Z| = 50\u00a0% : la charge n'est pas grande devant l'impédance interne. Leçon « Générateurs »." },
      generateur: { prompt: "Une bobine fixe près d'un aimant qui tourne, et une bobine qui tourne dans le champ fixe d'un aimant : qu'est-ce qui les distingue, vu des bornes ?",
        options: { a: "Le signe de la tension.", b: "La première ne produit de tension que si l'intensité est nulle.", c: "La seconde ne produit aucune tension, car aucun champ ne varie.", d: "Rien : dans les deux cas, la tension est la dérivée du flux, imposée de l'extérieur." },
        hint: "Que vaut la force totale sur une charge d'un conducteur parfait qui bouge ?",
        why: "Dans le premier cas, la tension vient de ∂B/∂t ; dans le second, de E + v ∧ B = 0 dans le fil qui bouge, (22.12). Les deux donnent la dérivée du flux. Leçon « Générateurs »." },
      compte: { prompt: "Un réseau connexe compte 6 nœuds et 9 branches. Combien d'équations indépendantes donnent les lois de Kirchhoff ?",
        options: { a: "5 lois des nœuds et 4 mailles : 9 équations pour 9 intensités.", b: "6 lois des nœuds et 9 mailles.", c: "6 lois des nœuds et 3 mailles.", d: "5 lois des nœuds et 9 mailles." },
        hint: "n \u2212 1 et b \u2212 n + 1.",
        why: "La dernière loi des nœuds est la somme des autres : n \u2212 1 = 5. Les mailles indépendantes sont celles des branches hors d'un arbre couvrant : b \u2212 n + 1 = 4. Une équation de plus serait une combinaison des autres. Leçon « Réseaux d'éléments idéaux et lois de Kirchhoff »." },
      pont: { prompt: "Un pont de Maxwell–Wien a R₂ = R₃ = 100\u00a0Ω. Il s'équilibre pour R₁ = 500\u00a0Ω et C₁ = 1\u00a0μF. La bobine mesurée vaut…",
        options: { a: "500\u00a0Ω et 1\u00a0mH.", b: "20\u00a0Ω et 10\u00a0mH, à toute fréquence.", c: "20\u00a0Ω et 10\u00a0mH, à 1\u00a0kHz seulement.", d: "5\u00a0Ω et 100\u00a0mH." },
        hint: "Rₓ = R₂R₃/R₁, Lₓ = R₂R₃C₁.",
        why: "Rₓ = 10⁴/500 = 20\u00a0Ω et Lₓ = 10⁴ × 10⁻⁶ = 10\u00a0mH. La pulsation se simplifie dans la condition d'équilibre ; seule la précision du réglage dépend de la fréquence. Leçon « Réseaux d'éléments idéaux et lois de Kirchhoff »." },
      thevenin: { prompt: "Une boîte noire donne 9\u00a0V à vide et 3\u00a0A en court-circuit, en continu. Sur une résistance de 6\u00a0Ω, sa tension vaut…",
        options: { a: "9\u00a0V.", b: "18\u00a0V.", c: "6\u00a0V : ℰeff = 9\u00a0V en série avec zeff = 3\u00a0Ω, diviseur 6/(3 + 6).", d: "3\u00a0V." },
        hint: "zeff = tension à vide / intensité de court-circuit.",
        why: "zeff = 9/3 = 3\u00a0Ω. Sur 6\u00a0Ω : V = 9 × 6/9 = 6\u00a0V. Deux mesures suffisent pour prévoir la boîte sur toute charge, à cette fréquence. Leçon « Circuits équivalents »." },
      accord: { prompt: "À 1\u00a0kHz, une boîte a pour impédance équivalente zeff = \u2212200i\u00a0Ω. Quelle charge y ferait passer une intensité infinie, selon le modèle ?",
        options: { a: "Une résistance de 200\u00a0Ω.", b: "Un condensateur de 0,8\u00a0μF.", c: "Aucune : une intensité infinie est impossible dans un réseau linéaire.", d: "Une bobine de 31,8\u00a0mH : zeff + iωL = 0 ; en réalité, les résistances négligées limitent l'intensité." },
        hint: "I = ℰeff/(zeff + Z).",
        why: "Z = +200i\u00a0Ω, soit L = 200/(2π × 1 000) ≈ 31,8\u00a0mH. Près de cet accord, |zeff + Z| est petit devant |zeff| : ce sont les éléments négligés du modèle qui décident. Leçon « Circuits équivalents »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Cavités résonantes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      thevenin: { prompt: "On mesure, à 1\u00a0kHz puis à 1\u00a0MHz, le courant d'un dipôle inconnu, linéaire, pour plusieurs tensions. Que peut-on affirmer ?",
        options: { a: "Il suffit d'une seule mesure de ℰ et de z, valable à toutes les fréquences.", b: "Il n'existe aucun modèle simple, puisque le dipôle est inconnu.", c: "À chaque fréquence, I = (V \u2212 ℰ)/z, mais ℰ et z peuvent être différents à 1\u00a0kHz et à 1\u00a0MHz.", d: "z est forcément réel." },
        hint: "La linéarité fixe la forme de la relation ; que dit-elle de sa dépendance en fréquence ?",
        why: "Toutes les équations d'un réseau linéaire sont linéaires : I dépend linéairement de V à chaque fréquence, (23.1). Mais les impédances internes dépendent de ω, donc ℰ(ω) et z(ω) aussi. Leçon « Éléments de circuit réels »." },
      bobine: { prompt: "Une bobine de 10\u00a0µH, enroulée avec 2,5\u00a0m de fil, a sa première résonance vers 34\u00a0MHz. Juste au-dessus, comment se comporte-t-elle, et pourquoi un seul élément localisé ne la décrit-il pas ?",
        options: { a: "Elle est capacitive ; son fil, près de 0,3 λ, n'est pas petit devant la longueur d'onde, et le courant n'est plus le même tout le long.", b: "Elle est inductive ; sa taille de 3\u00a0cm est comparable à λ.", c: "Elle est résistive ; la résistance de son fil l'emporte.", d: "Elle est inductive ; un seul élément suffit à toute fréquence." },
        why: "Au-dessus de sa première résonance, le courant passe par les capacités entre spires : la bobine est capacitive. λ ≈ 9\u00a0m à 34\u00a0MHz : le corps de 3\u00a0cm est petit, mais pas les 2,5\u00a0m de fil. Leçon « Éléments de circuit réels »." },
      induit: { prompt: "Entre les armatures d'un condensateur plan alimenté en alternatif, quel enchaînement rend le champ électrique non uniforme ?",
        options: { a: "Les charges se concentrent au centre des armatures par répulsion.", b: "Le courant des fils traverse l'espace entre les armatures.", c: "Le champ magnétique terrestre dévie le champ électrique.", d: "E variable crée B par Ampère–Maxwell ; B variable crée, par Faraday, une correction de E qui dépend de la distance à l'axe." },
        why: "(23.5) donne B ∝ ωr, puis (23.6) une correction \u2212(ωr/c)²/4 du champ, et ainsi de suite jusqu'à J0(ωr/c). Leçon « Condensateur aux hautes fréquences »." },
      seuil: { prompt: "Des armatures de 5\u00a0cm de rayon et d'autres de 10\u00a0cm de rayon : à quelle fréquence le champ au bord devient-il 1\u00a0% plus faible qu'au centre, pour chacune ?",
        options: { a: "191\u00a0MHz pour les deux : l'écartement seul compte.", b: "191\u00a0MHz pour 5\u00a0cm, 96\u00a0MHz pour 10\u00a0cm : l'écart dépend de ωa/c.", c: "191\u00a0MHz pour 5\u00a0cm, 382\u00a0MHz pour 10\u00a0cm.", d: "48\u00a0MHz pour 5\u00a0cm, 191\u00a0MHz pour 10\u00a0cm." },
        hint: "L'écart au bord vaut environ (ωa/c)²/4.",
        why: "L'écart ne dépend que de x = ωa/c ; il vaut 1\u00a0% pour x ≈ 0,2. Doubler a divise la fréquence par deux. L'écartement h se simplifie. Leçon « Condensateur aux hautes fréquences »." },
      boite: { prompt: "On veut une boîte cylindrique qui résonne à 2,45\u00a0GHz dans le mode où E est parallèle à l'axe et ne dépend que de r. Quel rayon lui donner ?",
        options: { a: "Environ 4,7\u00a0cm.", b: "Environ 12\u00a0cm, la longueur d'onde.", c: "Environ 2,4\u00a0cm.", d: "Il dépend surtout de la hauteur." },
        hint: "(23.18) : ω0 = 2,405c/a.",
        why: "a = 2,405c/(2πf) = 2,405 × 3 × 10⁸/(2π × 2,45 × 10⁹) ≈ 4,7\u00a0cm. Le premier zéro de J0 doit tomber sur la paroi ; la hauteur n'y entre pas. Leçon « Cavité résonante »." },
      qualite: { prompt: "Une boîte de cuivre résonne à 3\u00a0GHz avec Q ≈ 2 × 10⁴. Pourquoi sa résonance est-elle si fine, et que vaut sa largeur ?",
        options: { a: "Parce que la boîte rayonne peu ; 1,5\u00a0MHz.", b: "Parce que le cuivre est un isolant à 3\u00a0GHz ; 15\u00a0kHz.", c: "Parce que le courant ne pénètre les parois que sur environ 1\u00a0µm, alors que l'énergie occupe tout le volume ; f0/Q ≈ 150\u00a0kHz.", d: "Parce que le champ magnétique est nul sur les parois ; 3\u00a0GHz." },
        why: "Q = 2(volume/surface)/δ pour ce mode : l'énergie stockée dans le volume l'emporte de loin sur ce que dissipent les quelques micromètres de paroi parcourus par le courant. Largeur f0/Q = 3 × 10⁹/2 × 10⁴ = 150\u00a0kHz. Leçon « Cavité résonante »." },
      modes: { prompt: "Une boîte de 7,62\u00a0cm de diamètre et 6,35\u00a0cm de haut résonne vers 3010, 3300 et 3820\u00a0MHz. D'où viennent ces trois résonances ?",
        options: { a: "Des trois premiers zéros de J0.", b: "D'harmoniques du générateur.", c: "Des trous percés pour les boucles.", d: "De trois arrangements différents des champs, trois modes : E axial, E transverse, E des côtés vers le fond et le couvercle." },
        why: "Le deuxième zéro de J0 donnerait plus de 6900\u00a0MHz. Les modes TM010, TE111 et TM011 tombent à 3012, 3300 et 3827\u00a0MHz. Leçon « Modes d'une cavité »." },
      rentrante: { prompt: "Une cavité rentrante de 4\u00a0cm de rayon résonne vers 1,4\u00a0GHz, la boîte vide de même rayon vers 2,9\u00a0GHz. Quelle description en circuit l'explique ?",
        options: { a: "La cavité rentrante a moins de capacité et plus d'inductance.", b: "Le petit intervalle entre les plots forme une capacité concentrée, le tore autour une inductance d'une spire : ω0 ≈ 1/√(LC) est plus bas.", c: "La boîte vide n'a aucune inductance.", d: "Les deux ont les mêmes L et C ; seule la résistance diffère." },
        why: "C ≈ ε0πb²/g et L ≈ μ0h ln(a/b)/2π. Le circuit et la cavité sont deux extrêmes d'une même famille ; plus le champ électrique est concentré, plus la résonance descend pour une taille donnée. Leçon « Cavités et circuits résonants »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

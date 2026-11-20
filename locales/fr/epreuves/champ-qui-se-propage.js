/* Épreuve de l'étape « Propagation d'un champ et vitesse de la lumière » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      front: { prompt: "Derrière un front plan de champs uniformes qui avance à v, la loi de Faraday exige E = vB et celle d'Ampère–Maxwell E = c²B/v. Que vaut le rapport des deux exigences si l'on suppose v = 2c ?",
        options: { a: "1/4 : Ampère–Maxwell demande quatre fois moins de champ électrique que Faraday, aucun champ ne convient.", b: "4 : Ampère–Maxwell demande quatre fois plus de champ électrique.", c: "1 : les deux lois s'accordent à toute vitesse.", d: "2 : seul compte le rapport des vitesses." },
        hint: "Le rapport des deux exigences vaut c²/v².",
        why: "c²B/v divisé par vB donne c²/v² = 1/4 pour v = 2c. Les deux lois ne s'accordent qu'en v = c. Leçon « Un champ qui se propage »." },
      nappe: { prompt: "Une nappe porte un courant surfacique de 2\u00a0A·m⁻¹, allumé d'un coup. Que valent B et E derrière le front ?",
        options: { a: "B = 2,5\u00a0µT et E = 754\u00a0V·m⁻¹.", b: "B = 1,26\u00a0µT et E = 377\u00a0V·m⁻¹.", c: "B = 0,63\u00a0µT et E = 188\u00a0V·m⁻¹.", d: "B = 1,26\u00a0µT et E = 1,26\u00a0µV·m⁻¹." },
        hint: "B = J/(2ε0c²) = μ0J/2, puis E = cB.",
        why: "μ0 × 2/2 = 1,26\u00a0µT, et E = cB = 377\u00a0V·m⁻¹. La nappe partage son champ entre ses deux côtés : d'où le facteur 1/2. Leçon « Un champ qui se propage »." },
      impulsion: { prompt: "Le courant de la nappe reste allumé 10\u00a0ns, puis s'arrête. 30\u00a0ns après l'allumage, où se trouve le champ du côté x > 0 ?",
        options: { a: "Entre 0 et 9\u00a0m : le champ reste attaché à la nappe.", b: "Entre 0 et 3\u00a0m.", c: "Entre 6\u00a0m et 9\u00a0m : un bloc de 3\u00a0m d'épaisseur, détaché de la nappe.", d: "Nulle part : le champ disparaît quand le courant s'arrête." },
        why: "Le front avant est à c × 30\u00a0ns = 9\u00a0m, le front arrière, parti à 10\u00a0ns, à c × 20\u00a0ns = 6\u00a0m. Entre la nappe et 6\u00a0m, le champ est nul. Le bloc s'entretient par Faraday et le terme de Maxwell. Leçon « Un champ qui se propage »." },
      unite: { prompt: "On adopte une unité de charge égale à 1 000 coulombs (et l'unité de courant qui va avec). Que deviennent ε0, ε0c² et c dans ce système ?",
        options: { a: "Les trois sont multipliés par 10⁶.", b: "ε0 est divisé par 10⁶, ε0c² ne change pas, c est divisé par 1 000.", c: "ε0 et ε0c² sont multipliés par 10⁶, c ne change pas.", d: "ε0 et ε0c² sont divisés par 10⁶, c ne change pas." },
        hint: "Pour les mêmes forces, les charges et les courants comptés dans la nouvelle unité sont 1 000 fois plus petits.",
        why: "F = q²/(4πε0r²) avec q mille fois plus petit : ε0 est 10⁶ fois plus petit. De même pour ε0c² avec les courants. Le rapport c² ne dépend d'aucune unité de charge. Leçon « La vitesse de la lumière »." },
      fils: { prompt: "Une pesée entre deux fils de 50 cm, à 5\u00a0mm l'un de l'autre, est dépouillée avec la formule des fils infinis. Quelle erreur commet-on sur c ?",
        options: { a: "c sort trop grand d'environ 0,5\u00a0%.", b: "c sort trop petit d'environ 1\u00a0%.", c: "Aucune : la formule est exacte pour tout fil rectiligne.", d: "c sort trop grand d'environ 1\u00a0%." },
        hint: "Des fils finis s'attirent moins que des fils infinis, d'environ d/l ; c est une racine carrée.",
        why: "d/l = 1\u00a0% : la force réelle est 1\u00a0% trop faible, ε0c² lu 1\u00a0% trop grand, et c, sa racine carrée, environ 0,5\u00a0% trop grand. Leçon « La vitesse de la lumière »." },
      fizeau: { prompt: "Pourquoi la comparaison de Maxwell, entre le rapport de Weber et Kohlrausch et la mesure de Fizeau, a-t-elle tant de poids ?",
        options: { a: "Parce que les deux mesures utilisent de la lumière.", b: "Parce que l'une vient de pesées électriques sans lumière, l'autre de l'optique seule, et qu'elles donnent la même vitesse.", c: "Parce que Fizeau mesurait des ondes radio.", d: "Parce que Weber et Kohlrausch avaient fixé c par définition." },
        why: "Weber et Kohlrausch obtiennent 3,107 × 10⁸ m·s⁻¹ par des charges et des courants ; Fizeau, environ 3,1 × 10⁸ m·s⁻¹ par une roue dentée. L'accord suggère que la lumière est une onde électromagnétique. Leçon « La vitesse de la lumière »." },
      jauge: { prompt: "On remplace A par A + ∇ψ et φ par φ \u2212 ∂ψ/∂t, avec ψ(x) une bosse fixe dans le temps. Qu'est-ce qui change ?",
        options: { a: "Le champ électrique, qui gagne une composante selon x.", b: "Le champ magnétique.", c: "Ni E ni B ; mais la condition de Lorenz n'est plus satisfaite, car ∂²ψ/∂x² n'est pas nul.", d: "Rien du tout, la condition de Lorenz comprise." },
        why: "(18.20) laisse toujours E et B inchangés. La condition ∇·A + (1/c²)∂φ/∂t = 0 gagne ∇²ψ \u2212 (1/c²)∂²ψ/∂t², nul seulement si ψ vérifie l'équation d'onde. Leçon « Potentiels et équation d'onde »." },
      retard: { prompt: "Un câble de 30\u00a0m transporte un courant à 1\u00a0MHz. Peut-on calculer ses potentiels avec les formules de la statique, sans retard ?",
        options: { a: "Oui : 1\u00a0MHz est une fréquence basse.", b: "Oui, si le courant est faible.", c: "Non, parce que le câble est conducteur.", d: "Non : L/(cT) = 0,1, le retard sur la longueur du câble atteint un dixième de période." },
        hint: "Comparez L/c = 100\u00a0ns à la période de 1\u00a0µs.",
        why: "L/(cT) = 30 × 10⁶/3 × 10⁸ = 0,1. Le déphasage d'un bout à l'autre, 2π × 0,1, n'est plus négligeable : il faut l'équation d'onde (18.24). Leçon « Potentiels et équation d'onde »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

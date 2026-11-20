/* Épreuve de l'étape « Applications de la théorie cinétique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      vide: { prompt: "De l'eau maintenue à 300 K s'évapore dans le vide ; sa pression de vapeur saturante passe de 3,54 kPa à 17,2 kPa quand on la porte à 330 K. Par combien le flux d'évaporation est-il multiplié ?",
        options: { a: "Par 4,6 environ : comme p_sat/√T.", b: "Par 4,9 exactement : comme p_sat seule.", c: "Par 1,1 : comme T.", d: "Par 23 : comme p_sat au carré." },
        hint: "Le flux de Hertz-Knudsen vaut α p_sat/√(2πm k_BT).",
        why: "Le flux est celui des molécules de la vapeur saturante qui frapperaient la surface : p_sat/√(2πmk_BT). Le rapport vaut (17,2/3,54) × √(300/330) ≈ 4,86 × 0,953 ≈ 4,6. Presque toute la variation vient de l'exponentielle contenue dans p_sat. Leçon « Vitesse d'évaporation »." },
      maxwell: { prompt: "Les molécules qui s'échappent d'un liquide à la température T ont dû fournir l'énergie W pour sortir. Quelle est la distribution des vitesses de la vapeur qu'elles forment au-dessus du liquide ?",
        options: { a: "Celle d'une température T \u2212 W/k_B, plus basse.", b: "Celle de Maxwell à la température T du liquide.", c: "Celle d'une température plus haute, puisque seules les plus rapides partent.", d: "Une distribution où toutes ont la même vitesse √(2W/m)." },
        why: "Ne sortent que celles qui avaient une énergie W + E ; e^(\u2212(W + E)/k_BT) = e^(\u2212W/k_BT) e^(\u2212E/k_BT), donc l'énergie E qui leur reste suit encore e^(\u2212E/k_BT). L'exponentielle n'a pas de mémoire : la vapeur est à la température du liquide. Leçon « Vitesse d'évaporation »." },
      filament: { prompt: "Un filament de tungstène (ϕ = 4,5 V) débite 3,2 kA·m⁻² à 2 500 K. Que débite-t-il à 2 000 K ?",
        options: { a: "2,6 kA·m⁻² : comme T².", b: "2,0 kA·m⁻² : comme T.", c: "Environ 11 A·m⁻², soit 290 fois moins.", d: "Rien : l'émission s'arrête sous 2 500 K." },
        hint: "q_eϕ/k_BT passe de 20,9 à 26,1.",
        why: "j = A T² e^(\u2212q_eϕ/k_BT) : l'exponentielle perd e^(\u22125,2) ≈ 1/180, et T² un facteur 1,56 de plus. 3,2 kA·m⁻²/290 ≈ 11 A·m⁻². D'où la nécessité de tenir la température du filament serrée. Leçon « Émission thermoïonique »." },
      droite: { prompt: "Sur la droite ln(j/T²) en fonction de 1/T d'un métal, on lit une pente qui correspond à 4,5 V, et une constante A trois fois plus faible que la valeur théorique A₀. Quelle explication la mesure ne permet-elle pas d'exclure ?",
        options: { a: "Que le métal ne soit pas à la température indiquée.", b: "Que l'électron ait une autre charge.", c: "Que la loi exponentielle soit fausse.", d: "Qu'un travail de sortie croissant comme W₀ + a k_BT, avec a ≈ 1,1, se cache dans A, la pente ne donnant que W₀." },
        why: "e^(\u2212(W₀ + a k_BT)/k_BT) = e^(\u2212a) e^(\u2212W₀/k_BT) : un facteur constant que rien ne distingue d'un préfacteur plus faible. e^(\u22121,1) ≈ 1/3. C'est la remarque de Feynman sur l'ambiguïté du préfacteur. Leçon « Émission thermoïonique »." },
      place: { prompt: "De l'hydrogène à 10²⁰ noyaux par mètre cube est à moitié ionisé vers 9 000 K, où k_BT ne vaut que W/17,5. Qu'est-ce qui compense le facteur e^(\u221217,5) ≈ 2,5 × 10⁻⁸ ?",
        options: { a: "Le nombre d'états offerts à l'électron libre, de l'ordre de 1/(nλ_e³) ≈ 2 × 10⁷, où λ_e est sa longueur d'onde thermique.", b: "L'énergie cinétique des protons.", c: "Le rayonnement, qui ionise le gaz à toute température.", d: "La répulsion entre électrons." },
        hint: "Dans l'équation de Saha, le volume V_a devient λ_e³.",
        why: "f²/(1 \u2212 f) = λ_e⁻³ e^(\u2212W/k_BT)/n : à f = 1/2, W/k_BT = ln(2/(nλ_e³)). Un électron lié a un état, un électron libre en a autant que de cases λ_e³ dans le volume 1/n. Plus le gaz est dilué, plus l'ionisation est facile. Leçon « Ionisation thermique »." },
      arrhenius: { prompt: "Une réaction de barrière 80 kJ·mol⁻¹ est menée à 300 K. Par combien sa vitesse est-elle multipliée si l'on chauffe de 10 K ?",
        options: { a: "Par 1,03 : comme T.", b: "Par 2,8 environ.", c: "Par 10.", d: "Par 32, soit E_a/RT." },
        why: "k(T + 10)/k(T) = exp[(E_a/R)(1/300 \u2212 1/310)] = exp(9 622 × 1,075 × 10⁻⁴) ≈ e^1,03 ≈ 2,8. Une barrière de 53 kJ·mol⁻¹ donnerait 2 : plus la barrière est haute, plus la vitesse est sensible à la température. Leçon « Cinétique chimique »." },
      catalyse: { prompt: "Un catalyseur abaisse de 30 kJ·mol⁻¹ la barrière d'une réaction A + B ⇌ AB à 300 K. Que deviennent les constantes de vitesse k_f, k_r et la constante d'équilibre K ?",
        options: { a: "k_f est multipliée par 1,7 × 10⁵, k_r et K ne changent pas.", b: "k_f et K sont multipliées par 1,7 × 10⁵.", c: "k_f et k_r sont multipliées par le même facteur, e^(30 000/RT) ≈ 1,7 × 10⁵ ; K ne change pas.", d: "Rien ne change : un catalyseur ne participe pas à la réaction." },
        why: "La barrière vue des produits, E_a \u2212 ΔE, baisse autant que celle vue des réactifs. L'équilibre ne dépend que de W (ΔE), la vitesse de A* (E_a) : (42.10) et (42.11) le disent. Leçon « Cinétique chimique »." },
      induite: { prompt: "Pourquoi Einstein a-t-il dû ajouter l'émission induite à l'absorption et à l'émission spontanée ?",
        options: { a: "Pour expliquer que les lasers existent.", b: "Parce que l'émission spontanée violait la conservation de l'énergie.", c: "Parce que les atomes avaient plus de deux niveaux.", d: "Parce que sans elle l'équilibre avec le rayonnement donnerait I ∝ e^(\u2212ħω/k_BT) : la loi de Wien, fausse aux grandes longueurs d'onde, au lieu de celle de Planck." },
        why: "L'équilibre entre émission et absorption donne I = A/(B_nm e^(ħω/k_BT) \u2212 B_mn). Le \u22121 de Planck exige B_mn = B_nm, et A/B = ħω³/(π²c²). Le laser est venu quarante ans plus tard, par l'inversion de population. Leçon « Lois du rayonnement d'Einstein »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

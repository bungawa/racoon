/* Épreuve de l'étape « Réactivité et mécanismes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      carbonyle: { prompt: "Un nucléophile réagit avec la propanone, CH₃–CO–CH₃. Quel atome attaque-t-il, et pourquoi ?",
        options: { a: "Le carbone du groupe carbonyle : la liaison C=O (Δχ = 0,89) le rend δ+.", b: "L'oxygène, qui porte deux doublets.", c: "Un carbone d'un méthyle, le plus accessible.", d: "Un hydrogène, car C–H est polarisée." },
        hint: "Cherchez l'atome pauvre en électrons, pas l'atome riche.",
        why: "χ(O) \u2212 χ(C) = 3,44 \u2212 2,55 = 0,89 : le carbone du carbonyle est δ+, site électrophile. L'oxygène, riche en doublets, est un site nucléophile ou basique ; C–H (0,35) n'est pas polarisée. Leçon « Nucléophiles et électrophiles »." },
      iodure: { prompt: "Dans l'eau à 298\u00a0K, n vaut 5,0 pour l'ion iodure et 4,2 pour l'ion hydroxyde (échelle de Swain et Scott, s = 1). Combien de fois l'iodure réagit-il plus vite sur le bromométhane ?",
        options: { a: "0,8 fois : l'ion hydroxyde, base plus forte, est plus rapide.", b: "Environ 6 fois : 10 puissance 0,8, bien que l'iodure soit une base beaucoup plus faible.", c: "Environ 2 fois : e puissance 0,8.", d: "Autant : les deux sont des anions." },
        hint: "log₁₀(k/k₀) = s n : la différence des n est un logarithme décimal.",
        why: "k(iodure)/k(hydroxyde) = 10^(5,0 \u2212 4,2) = 10^0,8 ≈ 6,3. La nucléophilie est une vitesse, la basicité un équilibre : l'iodure, gros et polarisable, peu solvaté, attaque plus vite. Leçon « Nucléophiles et électrophiles »." },
      vanthoff: { prompt: "L'acte élémentaire 2 A → A₂ a lieu en solution diluée. On double la concentration de A. Que devient la vitesse de l'acte ?",
        options: { a: "Elle double.", b: "Elle ne change pas.", c: "Elle est multipliée par 4 : v = k[A]².", d: "On ne peut rien dire sans mesure." },
        why: "Pour un acte élémentaire, la loi de Van 't Hoff donne les ordres à partir des nombres stœchiométriques : v = k[A]², et 2² = 4. Pour une réaction quelconque, il faudrait mesurer. Leçon « Acte élémentaire, intermédiaire et complexe activé »." },
      determinant: { prompt: "Profil à deux actes, enthalpies libres depuis les réactifs : complexe activé 1 à 70\u00a0kJ·mol⁻¹, intermédiaire à 50, complexe activé 2 à 95. Quel acte est déterminant à 298\u00a0K ?",
        options: { a: "L'acte 1, parce qu'il vient en premier.", b: "L'acte 1, parce que sa barrière locale (70\u00a0kJ·mol⁻¹) dépasse celle de l'acte 2 (45\u00a0kJ·mol⁻¹).", c: "Aucun : il faut connaître les produits.", d: "L'acte 2 : son complexe activé est 25\u00a0kJ·mol⁻¹ plus haut, ce qui pèse un facteur e^(25 000/RT) ≈ 2 × 10⁴." },
        hint: "Dans k_app, chaque col compte par sa hauteur mesurée depuis les réactifs.",
        why: "k_app = (k_B T/h) / Σ exp(ΔG‡ᵢ/RT). Le terme du col à 95\u00a0kJ·mol⁻¹ vaut 2,4 × 10⁴ fois celui du col à 70 : l'acte 2 fixe la vitesse, bien que sa barrière locale soit plus petite. Leçon « Acte élémentaire, intermédiaire et complexe activé »." },
      eyring: { prompt: "Un catalyseur abaisse de 5,7\u00a0kJ·mol⁻¹ l'enthalpie libre d'activation d'un acte, à 298\u00a0K, sans changer le préfacteur. Que devient la constante de vitesse ?",
        options: { a: "Elle est multipliée par environ 10 : 5,7\u00a0kJ·mol⁻¹ vaut RT ln 10.", b: "Elle augmente de 5,7\u00a0%.", c: "Elle double.", d: "Elle ne change pas : un catalyseur ne modifie que l'équilibre." },
        why: "k ∝ exp(\u2212ΔG‡/RT) et RT ln 10 = 8,314 × 298 × 2,303 ≈ 5,7\u00a0kJ·mol⁻¹. Le catalyseur ne change pas la constante d'équilibre, seulement le temps pour l'atteindre. Leçons « Acte élémentaire, intermédiaire et complexe activé » et « Facteurs cinétiques et flèches courbes »." },
      fleches: { prompt: "NH₃ + H–Cl → NH₄⁺ + Cl⁻ en un acte. Quelles flèches courbes l'écrivent ?",
        options: { a: "Une flèche de H vers N, une de Cl vers H.", b: "Du doublet de N vers H, et de la liaison H–Cl vers Cl.", c: "Du doublet de N vers Cl, et de la liaison H–Cl vers N.", d: "Une seule flèche, du doublet de N vers H." },
        hint: "Une flèche part toujours d'un doublet : non liant, ou de liaison.",
        why: "L'azote donne son doublet au proton ; dans le même acte, le doublet de H–Cl part sur le chlore, sinon l'hydrogène aurait quatre électrons. Charges : N passe à +1, Cl à \u22121, la somme reste nulle. Leçon « Facteurs cinétiques et flèches courbes »." },
      heterolyse: { prompt: "On dessine une seule flèche, de la liaison C–Br du bromométhane vers le brome. Quelles espèces obtient-on ?",
        options: { a: "Deux radicaux CH₃• et Br•.", b: "CH₃⁻ et Br⁺.", c: "Le carbocation CH₃⁺ (six électrons, une lacune) et l'ion bromure Br⁻.", d: "Rien : une liaison ne peut pas se rompre seule." },
        why: "Le doublet de liaison part en entier sur le brome : hétérolyse. Le brome gagne un doublet (charge \u22121), le carbone en perd un (charge +1, lacune). Deux radicaux demanderaient deux flèches en hameçon. Leçon « Facteurs cinétiques et flèches courbes »." },
      rendement: { prompt: "On fait réagir 10,0\u00a0g d'acide salicylique (M = 138,12\u00a0g·mol⁻¹) avec un excès d'anhydride éthanoïque, mole à mole. On obtient 9,8\u00a0g d'aspirine sèche et pure (M = 180,16\u00a0g·mol⁻¹). Quel est le rendement ?",
        options: { a: "98\u00a0% : 9,8\u00a0g sur 10,0\u00a0g.", b: "54\u00a0%, en divisant par la masse de tous les réactifs.", c: "100\u00a0%, puisque l'anhydride est en excès.", d: "Environ 75\u00a0% : 9,8\u00a0g sur la masse maximale de 13,0\u00a0g." },
        hint: "La masse maximale se calcule par l'avancement maximal, fixé par le réactif limitant.",
        why: "n = 10,0/138,12 = 72,4\u00a0mmol d'acide salicylique, limitant. Masse maximale : 0,0724 × 180,16 ≈ 13,0\u00a0g. η = 9,8/13,0 ≈ 0,75. Comparer des masses de réactif et de produit n'a pas de sens. Leçon « Synthèse au laboratoire et rendement »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

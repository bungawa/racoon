/* Épreuve de l'étape « Le cristal réel » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      fraction: { prompt: "Dans l'aluminium, une lacune coûte H = 0,76\u00a0eV et l'entropie de formation multiplie la fraction par 12 environ. Quelle fraction de sites vides à 600\u00a0K, où k_B T ≈ 0,052\u00a0eV ?",
        options: { a: "Environ 5 × 10⁻⁶.", b: "Environ 4 × 10⁻⁷, sans le facteur entropique, qui ne compte pas.", c: "Environ 10⁻³, comme à la fusion.", d: "Environ 2 × 10⁻¹², comme à 300\u00a0K." },
        hint: "n/N = 12 exp(\u2212H/k_B T), et H/k_B T ≈ 14,7.",
        why: "exp(\u221214,7) ≈ 4 × 10⁻⁷, multiplié par 12 : 5 × 10⁻⁶. Entre 300\u00a0K et la fusion, la fraction gagne près de neuf ordres de grandeur : tout se joue dans l'exponentielle. Leçon « Lacunes et ions interstitiels »." },
      paire: { prompt: "Une paire de Schottky de NaCl coûte H = 2,12\u00a0eV, avec S = 6,2 k_B. À la fusion, 1074\u00a0K, la fraction vaut 2 × 10⁻⁴ par formule, et non 6 × 10⁻⁸. D'où vient la différence ?",
        options: { a: "De l'entropie de formation, qui multiplie la fraction par 500.", b: "De ce que la paire occupe deux jeux de places indépendants : l'exposant est H/2k_B T et non H/k_B T.", c: "Des impuretés, toujours présentes dans NaCl.", d: "De ce que la fusion crée des lacunes juste avant de se produire." },
        hint: "Comptez les façons de placer n lacunes de cations et n lacunes d'anions.",
        why: "L'entropie de configuration compte deux fois, une par sous-réseau : (n/N)² = e^(S/k_B) e^(\u2212H/k_B T), donc n/N = e^(S/2k_B) e^(\u2212H/2k_B T) ≈ 22 × 1,1 × 10⁻⁵. Sans le 2, on trouverait 6 × 10⁻⁸. Leçon « Lacunes et ions interstitiels »." },
      dopage: { prompt: "Un cristal de NaCl contient un ion Ca²⁺ pour 10⁴ ions Na⁺. À 700\u00a0K, la fraction thermique de lacunes de Na⁺ est 5 × 10⁻⁷. Combien de lacunes de Na⁺ par formule ?",
        options: { a: "5 × 10⁻⁷ : seules comptent les lacunes thermiques.", b: "2 × 10⁻⁴ : la valeur à la fusion.", c: "Environ 10⁻⁴ : chaque Ca²⁺ impose une lacune de Na⁺, et ces lacunes dominent de loin.", d: "Aucune : le calcium comble les lacunes." },
        why: "Ca²⁺ à la place de Na⁺ apporte une charge positive de trop ; une lacune de Na⁺ la compense. 10⁻⁴ est deux cents fois la fraction thermique : c'est le dopage qui fixe le nombre de lacunes, et donc la conductivité ionique, à basse température. Leçon « Lacunes et ions interstitiels »." },
      nacl: { prompt: "Pour NaCl, le modèle ionique avec n = 8 donne U = 753\u00a0kJ·mol⁻¹, le cycle de Born-Haber 787. Que conclure ?",
        options: { a: "NaCl est en partie covalent, comme AgCl.", b: "Le cycle de Born-Haber est faux de 4\u00a0%.", c: "La constante de Madelung de NaCl est mal connue.", d: "L'écart, 4\u00a0%, se comble avec n ≈ 12 et les distances suivent les rayons ioniques : le modèle ionique décrit NaCl." },
        hint: "L'attraction de Coulomb seule donne 861\u00a0kJ·mol⁻¹.",
        why: "Le cycle reste sous l'énergie des charges seules : une répulsion un peu plus raide suffit. Pour AgCl, au contraire, le cycle dépasse même les charges seules. Leçon « Caractère ionique des halogénures »." },
      formule: { prompt: "Un échantillon de wüstite a pour formule Fe₀,₉₀O. Quelle part de son fer est à l'état Fe³⁺, et quel est le nombre d'oxydation moyen du fer ?",
        options: { a: "22\u00a0% de Fe³⁺, nombre d'oxydation moyen +2,22.", b: "10\u00a0% de Fe³⁺, +2,10.", c: "20\u00a0% de Fe³⁺, +2,20.", d: "Aucun Fe³⁺ : le nombre d'oxydation reste +2." },
        hint: "Par oxygène : 1 \u2212 3x Fe²⁺ et 2x Fe³⁺, avec x = 0,10.",
        why: "0,20 Fe³⁺ pour 0,90 fer : 22\u00a0%. La charge positive par oxygène reste +2, répartie sur 0,90 fer : 2/0,90 = +2,22. Leçon « Non-stœchiométrie de l'oxyde de fer »." },
      densite: { prompt: "Pour Fe₀,₉₂O, de paramètre de maille 429,6\u00a0pm, le modèle à lacunes de fer prévoit 5646\u00a0kg·m⁻³, le modèle à oxygène interstitiel 6137. On mesure 5650\u00a0kg·m⁻³ à 1\u00a0% près. Que conclure ?",
        options: { a: "Rien : les deux modèles sont dans l'incertitude.", b: "Les sites de fer sont en partie vides : l'écart entre modèles, 9\u00a0%, dépasse de loin l'incertitude, et la mesure tombe sur le modèle à lacunes.", c: "L'oxygène est interstitiel.", d: "L'échantillon est stœchiométrique." },
        why: "L'écart normalisé entre la mesure et le modèle interstitiel est de l'ordre de 9, celui avec le modèle à lacunes inférieur à 1 : la mesure tranche. C'est l'argument de Jette et Foote en 1933. Leçon « Non-stœchiométrie de l'oxyde de fer »." },
      pression: { prompt: "Dans le modèle des défauts dilués, x varie comme la puissance 1/6 de la pression d'oxygène. On double cette pression à température fixée. Que devient x ?",
        options: { a: "Il double.", b: "Il diminue : l'oxygène comble les lacunes.", c: "Il augmente de 12\u00a0% environ : 2^(1/6) ≈ 1,12.", d: "Il ne change pas : x ne dépend que de la température." },
        hint: "Un oxygène fixé crée une lacune et deux Fe³⁺ : K° ∝ x (2x)²/p^(1/2).",
        why: "4x³ ∝ p^(1/2), donc x ∝ p^(1/6) : doubler la pression multiplie x par 1,12. Dans la wüstite réelle, les défauts s'associent en amas, et la puissance 1/6 n'est qu'une tendance ; le sens, lui, est sûr. Leçon « Non-stœchiométrie de l'oxyde de fer »." },
      agcl: { prompt: "AgCl : distance Ag–Cl 277,5\u00a0pm contre 296\u00a0pm pour la somme des rayons ; cycle 916\u00a0kJ·mol⁻¹ contre 875 pour les charges seules, sans répulsion. Que montrent ces deux écarts ?",
        options: { a: "Que les rayons ioniques de Ag⁺ sont mal mesurés.", b: "Que AgCl a des défauts de Frenkel.", c: "Que l'exposant de Born de AgCl dépasse 40.", d: "Une attraction absente du modèle ionique, qui rapproche les ions et renforce le cristal : un partage partiel d'électrons, la liaison est en partie covalente." },
        why: "Les deux tests vont dans le même sens : ions plus proches, cristal plus lié. Aucun exposant ne rejoint 916, puisque toute répulsion abaisse l'énergie du modèle sous 875. Ag⁺ polarise Cl⁻ ; l'écart d'électronégativité, 1,23, est moitié de celui de NaCl. Leçon « Caractère ionique des halogénures »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

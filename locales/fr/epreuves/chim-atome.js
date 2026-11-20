/* Épreuve de l'étape « L'atome et la classification périodique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      cuivre: { prompt: "Le cuivre naturel contient 69,15\u00a0% de cuivre 63 (A_r = 62,93) et 30,85\u00a0% de cuivre 65 (A_r = 64,93). Que vaut sa masse molaire ?",
        options: { a: "63,55 g·mol⁻¹, la moyenne des masses pondérée par les fractions molaires.", b: "63,93 g·mol⁻¹, la moyenne simple des deux isotopes.", c: "63,00 g·mol⁻¹, celle de l'isotope majoritaire arrondie.", d: "64,00 g·mol⁻¹, le nombre de masse moyen arrondi." },
        hint: "M = Σ x_i M_i.",
        why: "0,6915 × 62,93 + 0,3085 × 64,93 = 43,52 + 20,03 = 63,55 g·mol⁻¹, la valeur des tables, 63,546. Leçon « Atome, isotopes et mole »." },
      atomes: { prompt: "Combien d'atomes contient un fil de cuivre de 1,0 g (M = 63,55 g·mol⁻¹) ?",
        options: { a: "6,0 × 10²³, une mole.", b: "Environ 9,5 × 10²¹.", c: "Environ 3,8 × 10²⁵.", d: "63,55." },
        hint: "n = m/M, puis N = n N_A.",
        why: "n = 1,0/63,55 = 1,57 × 10⁻² mol, et N = 1,57 × 10⁻² × 6,022 × 10²³ ≈ 9,5 × 10²¹ atomes. Le produit m × M n'a pas de sens physique. Leçon « Atome, isotopes et mole »." },
      hydrogene: { prompt: "La règle M ≈ A g·mol⁻¹ s'écarte de 0,78\u00a0% pour l'hydrogène 1 (A_r = 1,0078), bien plus que pour le chlore 35 (A_r = 34,969). Pourquoi ?",
        options: { a: "Parce que la masse de l'hydrogène est mal mesurée.", b: "Parce que l'électron de l'hydrogène pèse 0,78\u00a0% de l'atome.", c: "Parce que u est le douzième d'un atome de carbone 12, dont les nucléons sont liés et donc allégés de 0,8\u00a0% environ, alors que le proton de l'hydrogène n'est lié à rien.", d: "Parce que la constante d'Avogadro est fixée depuis 2019." },
        why: "Le défaut de masse du carbone 12 fixe l'unité. Pour le chlore 35, une liaison un peu plus forte (8,5 MeV par nucléon contre 7,7) et l'excès de neutrons, plus lourds que les protons, se compensent presque ; un proton seul, sans liaison, pèse 0,8\u00a0% de plus que la part d'un nucléon du carbone 12. L'électron, lui, ne pèse que 5 × 10⁻⁴ de l'atome d'hydrogène. Leçon « Atome, isotopes et mole »." },
      fer: { prompt: "Le fer est [Ar] 3d⁶ 4s². Quelle est la configuration de l'ion Fe³⁺, et combien d'électrons célibataires porte-t-il ?",
        options: { a: "[Ar] 3d³ 4s², 3 électrons célibataires.", b: "[Ar] 3d⁴ 4s¹, 5 électrons célibataires.", c: "[Ar] 3d⁶, 4 électrons célibataires.", d: "[Ar] 3d⁵ : 5 électrons célibataires, un par orbitale 3d." },
        hint: "Un cation perd d'abord ses électrons 4s ; puis la règle de Hund.",
        why: "Les deux électrons 4s partent d'abord, puis un électron 3d : [Ar] 3d⁵. Cinq électrons sur cinq orbitales 3d, de spins parallèles par la règle de Hund. Leçon « Configuration électronique »." },
      selenium: { prompt: "Le sélénium a Z = 34. Que vaut son nombre d'électrons de valence, et où se trouve-t-il ?",
        options: { a: "6 électrons de valence, 4s² 4p⁴ : période 4, colonne 16, sous le soufre.", b: "16 électrons de valence : période 4, colonne 16.", c: "4 électrons de valence, 4p⁴ : période 4, colonne 14.", d: "6 électrons de valence : période 3, colonne 16." },
        why: "[Ar] 3d¹⁰ 4s² 4p⁴ : la sous-couche 3d, pleine, est dans le cœur. Couche de valence n = 4, donc période 4 ; 6 électrons de valence dans le bloc p, donc colonne 16, la colonne de l'oxygène et du soufre. Leçons « Configuration électronique » et « Classification périodique et électronégativité »." },
      chrome: { prompt: "Le chrome (Z = 24) est [Ar] 3d⁵ 4s¹ et non [Ar] 3d⁴ 4s² comme le prévoit la règle de Klechkowski. Combien d'électrons célibataires a-t-il ?",
        options: { a: "4, comme le prévoit la règle.", b: "6 : cinq électrons 3d et un électron 4s, tous non appariés.", c: "5 : seuls les électrons d comptent.", d: "2, comme le titane." },
        hint: "Comptez, sous-couche par sous-couche, les orbitales occupées par un seul électron.",
        why: "3d⁵ : cinq orbitales, un électron chacune ; 4s¹ : un électron seul. Total 6, contre 4 pour la configuration de la règle. Les exceptions ne sont pas à connaître, mais elles changent ce que l'on en déduit. Leçon « Configuration électronique »." },
      chi: { prompt: "Rangez K, Na, Cl et F par électronégativité croissante.",
        options: { a: "F < Cl < Na < K.", b: "Na < K < F < Cl.", c: "K < Na < Cl < F.", d: "Cl < F < K < Na." },
        hint: "χ croît vers la droite d'une période et vers le haut d'une colonne.",
        why: "Sur l'échelle de Pauling : K 0,82, Na 0,93, Cl 3,16, F 3,98. Un alcalin, gros atome à faible charge effective, tient mal son électron de valence ; un halogène de la période 2, petit et à forte charge effective, attire ceux des autres. Leçon « Classification périodique et électronégativité »." },
      brome: { prompt: "On verse du dibrome dans deux tubes, l'un contenant des ions chlorure, l'autre des ions iodure. Que se passe-t-il ?",
        options: { a: "Le dibrome oxyde les deux.", b: "Il n'oxyde aucun des deux.", c: "Il oxyde les ions chlorure seulement.", d: "Il oxyde les ions iodure seulement : son pouvoir oxydant est entre celui du dichlore et celui du diiode." },
        why: "Dans la colonne des halogènes, le pouvoir oxydant du corps simple décroît du haut vers le bas, comme l'électronégativité : Cl₂ > Br₂ > I₂. Br₂ + 2 I⁻ → 2 Br⁻ + I₂ a lieu ; Br₂ ne peut prendre d'électrons aux ions Cl⁻. Leçon « Classification périodique et électronégativité »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

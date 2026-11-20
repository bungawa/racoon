/* Épreuve de l'étape « Spectroscopies » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      photon: { prompt: "Un spectre infrarouge montre une bande à 1 715 cm⁻¹. Quelle énergie porte une mole de ces photons, et que peuvent-ils faire à 298 K ?",
        options: { a: "20,5 kJ·mol⁻¹, environ 8 RT : exciter une vibration de liaison, hors de portée de l'agitation thermique.", b: "479 kJ·mol⁻¹ : faire passer un électron dans une orbitale vide.", c: "2,5 kJ·mol⁻¹, soit RT : rien que l'agitation thermique ne fasse déjà.", d: "0,2 kJ·mol⁻¹ : faire tourner la molécule." },
        hint: "E = N_A h c σ, avec σ = 171 500 m⁻¹.",
        why: "N_A h c σ = 6,02 × 10²³ × 6,63 × 10⁻³⁴ × 3,00 × 10⁸ × 1,715 × 10⁵ ≈ 20,5 kJ·mol⁻¹, soit 8 fois RT = 2,48 kJ·mol⁻¹ : c'est l'énergie d'un quantum de vibration d'un C=O. Les transitions électroniques demandent des photons UV, une vingtaine de fois plus énergétiques. Leçon « Spectroscopies UV-visible et infrarouge »." },
      etalonnage: { prompt: "Une solution étalon à 2,0 × 10⁻⁴ mol·L⁻¹ a une absorbance de 0,48 au maximum de sa bande, dans une cuve de 1 cm. Une solution inconnue donne 1,20 dans la même cuve. Quelle est sa concentration ?",
        options: { a: "4,0 × 10⁻⁴ mol·L⁻¹", b: "5,0 × 10⁻⁴ mol·L⁻¹", c: "2,4 × 10⁻³ mol·L⁻¹", d: "1,2 × 10⁻⁴ mol·L⁻¹" },
        why: "Beer-Lambert : A est proportionnelle à c. c = 2,0 × 10⁻⁴ × 1,20/0,48 = 5,0 × 10⁻⁴ mol·L⁻¹ (ε = 2 400 L·mol⁻¹·cm⁻¹). La proportionnalité suppose une lumière presque monochromatique et peu de lumière parasite : à A = 1,2, il ne passe que 6 % de la lumière. Leçon « Spectroscopies UV-visible et infrarouge »." },
      isotope: { prompt: "La bande O–H libre d'un alcool est vers 3 640 cm⁻¹. Où attend-on la bande O–D de la molécule deutérée, la raideur de la liaison étant la même ?",
        options: { a: "Vers 1 820 cm⁻¹ : la masse de l'hydrogène double.", b: "Vers 3 640 cm⁻¹ : la raideur ne change pas.", c: "Vers 2 650 cm⁻¹ : σ varie comme 1/√μ, et μ passe de 0,95 à 1,79 u.", d: "Vers 5 150 cm⁻¹ : la liaison est plus lourde, donc vibre plus vite." },
        why: "Oscillateur harmonique : σ = √(k/μ)/(2πc). μ(O, H) ≈ 0,95 u, μ(O, D) ≈ 1,79 u ; le rapport des nombres d'onde vaut √(0,95/1,79) ≈ 0,73, d'où environ 2 650 cm⁻¹. La masse réduite ne double pas, car l'oxygène compte aussi. Leçon « Spectroscopies UV-visible et infrarouge »." },
      aldehyde: { prompt: "Le produit d'une oxydation montre en infrarouge une bande forte vers 1 730 cm⁻¹ et deux bandes moyennes vers 2 720 et 2 820 cm⁻¹, sans bande large entre 2 500 et 3 550 cm⁻¹. Que contient-il ?",
        options: { a: "Un alcool qui n'a pas réagi.", b: "Un acide carboxylique.", c: "Une cétone.", d: "Un aldéhyde." },
        why: "C=O vers 1 720–1 740 cm⁻¹ et C–H d'aldéhyde, en doublet entre 2 695 et 2 830 cm⁻¹ : un aldéhyde. Un acide aurait un O–H très large de 2 500 à 3 300 cm⁻¹, un alcool un O–H large vers 3 300 cm⁻¹, une cétone pas de bande C–H d'aldéhyde. Leçon « Spectroscopies UV-visible et infrarouge »." },
      basChamp: { prompt: "Dans l'éthanol, le CH₃ (triplet, J = 7 Hz) est à 1,25 ppm et le OH à 1,32 ppm. Sur un spectromètre de paillasse à 60 MHz, quel écart sépare ces deux signaux ?",
        options: { a: "4,2 Hz : moins que la largeur du triplet, 14 Hz ; les signaux se chevauchent. À 400 MHz, 28 Hz les séparent.", b: "0,07 Hz : trop peu pour être mesuré.", c: "4,2 Hz, ce qui suffit à les séparer nettement.", d: "420 Hz : ils sont très loin l'un de l'autre." },
        hint: "Δν = Δδ × ν₀, et le triplet s'étend sur 2J.",
        why: "Δν = 0,07 × 10⁻⁶ × 60 × 10⁶ Hz = 4,2 Hz, alors que le triplet s'étale sur 2J = 14 Hz, quel que soit le champ. À 400 MHz, l'écart vaut 28 Hz et les signaux se séparent. Leçons « RMN du proton » et « Couplages du premier ordre en RMN »." },
      melange: { prompt: "Un mélange d'acétone et d'éthanoate d'éthyle donne un singulet à 2,17 ppm (6 H de l'acétone) d'aire 3,0 et un quadruplet à 4,12 ppm (2 H de l'ester) d'aire 2,0. Que vaut n(acétone)/n(ester) ?",
        options: { a: "1,5", b: "0,5", c: "3", d: "1" },
        why: "Chaque aire est divisée par le nombre de protons du signal : 3,0/6 = 0,5 pour l'acétone, 2,0/2 = 1,0 pour l'ester. Le rapport des quantités de matière vaut 0,5. Leçon « RMN du proton »." },
      ethyles: { prompt: "Un spectre de RMN du proton montre un triplet d'aire 9 à 1,03 ppm et un quadruplet d'aire 6 à 2,53 ppm, de même J = 7 Hz, et rien d'autre. Quelle molécule ?",
        options: { a: "L'éthanol.", b: "L'éthoxyéthane.", c: "La triéthylamine.", d: "Le propan-2-ol." },
        why: "Triplet et quadruplet de même J : des éthyles CH₃–CH₂–, ici trois équivalents (9 H et 6 H). Le CH₂ à 2,53 ppm est moins déplacé que celui de l'éthoxyéthane (3,48 ppm, aires 6 et 4) : l'azote est moins électronégatif que l'oxygène. L'éthanol aurait un OH, le propan-2-ol un doublet et un septuplet. Leçons « RMN du proton » et « Couplages du premier ordre en RMN »." },
      secondOrdre: { prompt: "À 60 MHz, deux protons de carbones voisins résonnent à 3,95 et 4,05 ppm, avec J = 7 Hz. Que montre le spectre ?",
        options: { a: "Deux doublets du premier ordre bien séparés, d'intensités égales.", b: "Un singulet : les deux protons sont équivalents.", c: "Un triplet 1 : 2 : 1.", d: "Un massif du second ordre : Δν = 6 Hz est voisin de J, les raies intérieures dominent et la règle des n + 1 ne s'applique plus." },
        why: "Δν = 0,10 × 60 = 6 Hz, Δν/J ≈ 0,86 : loin de Δν ≫ J. Le calcul exact du système AB donne des raies intérieures plus de 7 fois plus hautes que les extérieures et des positions qui ne sont plus ν ± J/2. À 600 MHz, Δν/J ≈ 8,6 et l'on retrouve presque deux doublets. Leçon « Couplages du premier ordre en RMN »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Lignes de transmission et guide rectangulaire » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      echo: { prompt: "Une impulsion de 2\u00a0V part sur 30\u00a0m de câble de 75\u00a0Ω, isolé au polyéthylène (v = 2,0 × 10⁸\u00a0m·s⁻¹), fermé sur une résistance de 25\u00a0Ω. Que revient-il à l'entrée, et quand ?",
        options: { a: "Une impulsion de \u22121\u00a0V, 300\u00a0ns après le départ.", b: "Une impulsion de +1\u00a0V, 150\u00a0ns après le départ.", c: "Rien : une résistance absorbe toute l'onde.", d: "Une impulsion de \u22122\u00a0V, 300\u00a0ns après le départ." },
        hint: "Γ = (RL \u2212 z0)/(RL + z0), et l'écho fait l'aller et le retour.",
        why: "Γ = (25 \u2212 75)/(25 + 75) = \u22120,5 : l'écho vaut \u22121\u00a0V. Il parcourt 60\u00a0m à 2,0 × 10⁸\u00a0m·s⁻¹, soit 300\u00a0ns. Seule une charge égale à z0 absorbe tout. Leçon « La ligne de transmission »." },
      geometrie: { prompt: "Un câble au polyéthylène a b/a = 3,5 et z0 = 50\u00a0Ω. On double b sans changer a ni l'isolant. Que deviennent l'impédance et la vitesse ?",
        options: { a: "z0 double, la vitesse aussi.", b: "z0 ≈ 78\u00a0Ω, la vitesse ne change pas.", c: "z0 ≈ 78\u00a0Ω, la vitesse baisse.", d: "Rien ne change : seul l'isolant compte." },
        hint: "z0 dépend de ln(b/a), la vitesse seulement de εr.",
        why: "z0 ∝ ln(b/a) : 50 × ln 7/ln 3,5 ≈ 78\u00a0Ω. Le produit L0C0 vaut εr/c² quelle que soit la géométrie, donc v = c/√εr reste 2,0 × 10⁸\u00a0m·s⁻¹. Leçon « La ligne de transmission »." },
      sous: { prompt: "Un guide rectangulaire a 15\u00a0mm de large. On l'alimente à 8\u00a0GHz avec le champ à une arche. Que se passe-t-il ?",
        options: { a: "L'onde se propage, avec λg > λ0.", b: "L'onde se propage plus vite que la lumière, sans autre changement.", c: "Rien ne se propage : le champ s'éteint, d'un facteur e tous les 8\u00a0mm environ.", d: "Le champ reste uniforme dans tout le guide." },
        hint: "Comparez 8\u00a0GHz à c/(2a).",
        why: "La coupure est à c/(2a) ≈ 10\u00a0GHz. À 8\u00a0GHz, k′ = √((π/a)² \u2212 (ω/c)²) ≈ 126\u00a0m⁻¹ : le champ décroît en e^(\u2212k′z), d'un facteur e tous les 8\u00a0mm. Leçons « Le guide d'onde rectangulaire » et « Fréquence de coupure »." },
      longueur: { prompt: "Dans le guide de 22,86\u00a0mm de large, à 8\u00a0GHz (λ0 = 3,75\u00a0cm), quelle est la longueur d'onde mesurée le long du guide ?",
        options: { a: "3,75\u00a0cm, comme dans le vide.", b: "2,1\u00a0cm.", c: "4,6\u00a0cm.", d: "6,5\u00a0cm." },
        hint: "λ0/(2a) ≈ 0,82.",
        why: "λg = λ0/√(1 \u2212 (λ0/2a)²) = 3,75/√(1 \u2212 0,67) ≈ 6,5\u00a0cm. Près de la coupure, λg grandit vite. Leçon « Le guide d'onde rectangulaire »." },
      vitesses: { prompt: "Un guide est alimenté à deux fois sa fréquence de coupure. Que valent ses vitesses de phase et de groupe ?",
        options: { a: "vφ ≈ 1,15 c et vg ≈ 0,87 c.", b: "vφ = vg = c.", c: "vφ ≈ 0,87 c et vg ≈ 1,15 c.", d: "vφ = 2c et vg = c/2." },
        hint: "√(1 \u2212 (1/2)²) ≈ 0,87.",
        why: "vg = c√(1 \u2212 (ωc/ω)²) ≈ 0,87 c, et vφ = c²/vg ≈ 1,15 c. Le produit vaut c² ; seul vg, inférieur à c, porte l'énergie et le signal. Leçon « Vitesse des ondes guidées »." },
      trajet: { prompt: "Un signal de bande étroite, à 1,25 fois la fréquence de coupure, parcourt 20\u00a0m de guide. Combien de temps met-il ?",
        options: { a: "67\u00a0ns, comme la lumière dans le vide.", b: "111\u00a0ns.", c: "40\u00a0ns, puisque la vitesse de phase dépasse c.", d: "Il n'arrive jamais : à cette fréquence, le guide est coupé." },
        hint: "Le signal va à la vitesse de groupe.",
        why: "vg = c√(1 \u2212 0,8²) = 0,6 c = 1,8 × 10⁸\u00a0m·s⁻¹ ; 20/(1,8 × 10⁸) ≈ 111\u00a0ns. La vitesse de phase, 1,67 c, ne dit rien du signal. Leçon « Vitesse des ondes guidées »." },
      grille: { prompt: "Une grille de ventilation est faite d'alvéoles carrées de 5\u00a0mm de côté et de 20\u00a0mm de profondeur. Quelle atténuation donne le modèle du guide sous la coupure à 100\u00a0MHz ?",
        options: { a: "Aucune : les trous sont ouverts.", b: "Environ 27\u00a0dB.", c: "Environ 110\u00a0dB.", d: "Environ 1\u00a0100\u00a0dB." },
        hint: "Loin sous la coupure, 27,3\u00a0dB par largeur traversée.",
        why: "La coupure, vers 30\u00a0GHz, est très au-dessus de 100\u00a0MHz : k′ ≈ π/a, soit 20 log10(e) π ≈ 27,3\u00a0dB par largeur a. Quatre largeurs de profondeur : environ 109\u00a0dB. Leçon « Fréquence de coupure »." },
      monomode: { prompt: "Un guide a une section intérieure de 40\u00a0mm × 20\u00a0mm. Dans quelle bande de fréquences un seul arrangement du champ se propage-t-il ?",
        options: { a: "Au-dessus de 7,5\u00a0GHz.", b: "De 0 à 3,75\u00a0GHz.", c: "De 3,75 à 15\u00a0GHz.", d: "De 3,75 à 7,5\u00a0GHz." },
        hint: "Cherchez la première et la deuxième coupure : c/(2a), c/a et c/(2b).",
        why: "La première coupure, une arche selon x, est à c/(2a) ≈ 3,75\u00a0GHz. La deuxième est à 7,5\u00a0GHz, où apparaissent ensemble deux arches selon x (c/a) et une arche selon y (c/(2b)), puisque a = 2b. Au-dessous de 3,75\u00a0GHz, rien ne passe. Leçons « Fréquence de coupure » et « Le guide d'onde rectangulaire »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

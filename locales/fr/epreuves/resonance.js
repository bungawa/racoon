/* Épreuve de l'étape « La résonance » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      bande: { prompt: "Le circuit de la leçon (L = 0,10\u00a0H, C = 0,10\u00a0µF, f₀ ≈ 1,59\u00a0kHz) voit sa résistance totale portée à 200\u00a0Ω. Que valent son facteur de qualité et sa bande passante ?",
        options: { a: "Q ≈ 13 et environ 120\u00a0Hz, comme avec la résistance ajoutée à zéro.", b: "Q = 5 et 2\u202f000\u00a0Hz.", c: "Q = 5 et environ 320\u00a0Hz.", d: "Q = 0,2 et environ 8\u00a0kHz." },
        hint: "Q = (1/R)√(L/C), et la largeur vaut Δω = R/L = ω₀/Q.",
        why: "√(L/C) = √(10⁶) = 1\u202f000\u00a0Ω, Q = 1\u202f000/200 = 5 (leçon « Résonance électrique »). Δω = R/L = 2\u202f000\u00a0rad·s⁻¹, soit Δf = 2\u202f000/2π ≈ 320\u00a0Hz = f₀/Q : c'est la largeur γ = c/m de l'oscillateur mécanique, traduite par c → R et m → L (leçon « L'oscillateur forcé amorti »). 2\u202f000\u00a0Hz confond pulsation et fréquence." },
      surtension: { prompt: "Un circuit RLC série de facteur de qualité Q = 40 est alimenté à sa fréquence propre, sous 5\u00a0V d'amplitude. Quelle tension supporte le condensateur ?",
        options: { a: "200\u00a0V, en opposition avec celle de la bobine.", b: "5\u00a0V : la somme des tensions de la maille vaut celle du générateur.", c: "Presque rien : à la résonance, les tensions de la bobine et du condensateur s'annulent.", d: "40\u00a0V." },
        hint: "À ω₀, I₀ = e₀/R et u_C = I₀/(Cω₀).",
        why: "u_C = e₀/(RCω₀) = Q e₀ = 200\u00a0V (leçon « Résonance électrique »). Les tensions de la bobine et du condensateur se compensent dans la maille, mais chacune existe : il faut le savoir avant de choisir les composants. C'est l'analogue de l'amplitude de position, Q fois l'allongement statique à ω₀ (leçon « L'oscillateur forcé amorti »)." },
      produit: { prompt: "Pour la boule sur son ressort, laquelle de ces opérations n'est pas permise avec les amplitudes complexes ?",
        options: { a: "Remplacer chaque dérivée par un facteur iω, en régime établi.", b: "Additionner les amplitudes complexes de deux forces de même pulsation.", c: "Traiter un frottement proportionnel à la vitesse par un terme iωc x̂.", d: "Calculer la puissance instantanée F v comme la partie réelle de F̂ v̂ e^(2iωt)." },
        hint: "La partie réelle commute avec la somme et la dérivée. Et avec le produit ?",
        why: "Re(a) Re(b) n'est pas Re(ab) : une puissance, une énergie ou une force en x³ ne se calculent pas sur les amplitudes complexes (leçon « Nombres complexes et mouvement harmonique »). La moyenne d'un produit se calcule par ½ Re(F̂ v̂*) ; en régime établi, elle égale la puissance dissipée, ½cV² (leçon « L'oscillateur forcé amorti »). Les trois autres opérations sont linéaires." },
      plafond: { prompt: "Le circuit de la leçon plafonne à Q ≈ 13 avec la résistance ajoutée à zéro : il reste 50\u00a0Ω de sortie du générateur, 20\u00a0Ω de fil de bobine, 5\u00a0Ω de pertes du condensateur. Quel changement permet d'atteindre Q ≈ 50 ?",
        options: { a: "Remplacer le condensateur par un modèle à film polypropylène, à 0,1\u00a0Ω de pertes.", b: "Un générateur de résistance de sortie quasi nulle et le condensateur polypropylène : R ≈ 20\u00a0Ω.", c: "Doubler L, pour un pic deux fois plus étroit.", d: "Augmenter la tension du générateur." },
        hint: "Q = (1/R)√(L/C), avec √(L/C) = 1\u202f000\u00a0Ω et R la résistance totale.",
        why: "Décrire le système, c'est compter toutes les résistances. Polypropylène seul : R ≈ 70\u00a0Ω, Q ≈ 14. Générateur seul : R = 25\u00a0Ω, Q = 40. Les deux : R ≈ 20\u00a0Ω, Q ≈ 50 (leçon « Résonance électrique »). Doubler L ne multiplie Q que par √2. La tension du générateur ne change pas Q, car le circuit est linéaire (leçon « Nombres complexes et mouvement harmonique »)." },
      quadrature: { prompt: "On balaie lentement la pulsation de la force appliquée à un oscillateur amorti de facteur de qualité Q = 1. Quel signe repère le plus sûrement sa pulsation propre ω₀ ?",
        options: { a: "Le maximum de l'amplitude de la position.", b: "Le point où l'amplitude de la vitesse vaut son maximum divisé par √2.", c: "Le point où la position est en phase avec la force.", d: "Le retard de π/2 de la position sur la force, là où l'amplitude de la vitesse est maximale." },
        hint: "Pour Q = 1, la courbe de position culmine à 0,71 ω₀.",
        why: "À ω₀, le dénominateur de x̂ est purement imaginaire : retard π/2 quel que soit Q, et vitesse maximale, en phase avec la force (leçon « L'oscillateur forcé amorti »). Le maximum de position est à 0,71 ω₀ pour Q = 1, et disparaît sous Q = 1/√2. Multiplier par iω, c'est tourner d'un quart de tour : vitesse en phase, position en quadrature (leçon « Nombres complexes et mouvement harmonique »)." },
      puissance: { prompt: "La boule (m = 0,200\u00a0kg, ω₀ = 10\u00a0rad·s⁻¹) est freinée par l'aimant avec Q = 10 et forcée à ω₀ par une force d'amplitude F₀ = 0,05\u00a0N. En régime établi, quelle puissance moyenne la force fournit-elle ?",
        options: { a: "Rien : en régime établi, l'énergie de l'oscillateur ne change pas.", b: "Environ 12,5\u00a0mW, F₀ fois l'amplitude de la vitesse.", c: "Environ 6,3\u00a0mW.", d: "Environ 3,1\u00a0mW, comme pour Q = 5." },
        hint: "c = mω₀/Q, V = F₀/c à ω₀, puissance moyenne ½F₀V.",
        why: "c = 0,2\u00a0×\u00a010/10 = 0,2\u00a0kg·s⁻¹ ; à ω₀, la vitesse est en phase avec la force, V = F₀/c = 0,25\u00a0m·s⁻¹ ; la moyenne vaut ½F₀V = 6,25\u00a0mW (leçon « L'oscillateur forcé amorti », qui trouve 3,1\u00a0mW pour Q = 5). Le ½ vient de la moyenne d'un produit de deux sinusoïdes, ½ Re(F̂ v̂*) (leçon « Nombres complexes et mouvement harmonique »). L'énergie de l'oscillateur reste constante parce que le frottement dissipe exactement ce que la force fournit." },
      etabli: { prompt: "Partie du repos, la boule (ω₀ = 10\u00a0rad·s⁻¹, T₀ = 0,63\u00a0s) est forcée à ω₀ avec Q = 10. Au bout de combien de temps la partie libre est-elle tombée à 5\u00a0%, et que décrit l'amplitude complexe avant ?",
        options: { a: "Environ 0,6\u00a0s, une période ; l'amplitude complexe décrit tout le mouvement dès le départ.", b: "Environ 6\u00a0s, une dizaine de périodes ; avant, x̂ e^(iωt) ne décrit que la partie qui suit la force.", c: "Environ 60\u00a0s ; l'amplitude complexe ne vaut jamais, car la partie libre ne s'éteint pas.", d: "Immédiatement : avec un frottement, il n'y a pas de partie libre." },
        hint: "La partie libre décroît en e^(\u2212ω₀t/(2Q)) ; 5\u00a0% demande 6Q/ω₀.",
        why: "6Q/ω₀ = 6\u00a0×\u00a010/10 = 6\u00a0s, soit 3Q/π ≈ 10 périodes (leçon « L'oscillateur forcé amorti », 18\u00a0s pour Q = 30). L'amplitude complexe ne décrit que la partie qui suit la force : la méthode suppose un régime établi (leçon « Nombres complexes et mouvement harmonique »). Plus Q est grand, plus le pic est haut, et plus il faut attendre." },
      jumeau: { prompt: "La boule de 0,200\u00a0kg, sur un ressort de 20\u00a0N·m⁻¹, freinée avec c = 0,4\u00a0kg·s⁻¹ (Q = 5), a un jumeau électrique RLC série. Lequel ?",
        options: { a: "L = 0,200\u00a0H, C = 0,05\u00a0F, R = 0,4\u00a0Ω.", b: "L = 0,200\u00a0H, C = 20\u00a0F, R = 0,4\u00a0Ω.", c: "L = 0,05\u00a0H, C = 0,200\u00a0F, R = 2,5\u00a0Ω.", d: "L = 20\u00a0H, C = 0,200\u00a0F, R = 0,4\u00a0Ω." },
        hint: "m ↔ L, c ↔ R, k ↔ 1/C.",
        why: "La masse devient l'inductance, le frottement la résistance, la raideur l'inverse de la capacité : C = 1/k = 0,05\u00a0F, un condensateur énorme (leçon « Résonance électrique »). Vérification : 1/√(LC) = 1/√(0,01) = 10\u00a0rad·s⁻¹ et Q = Lω₀/R = 0,2\u00a0×\u00a010/0,4 = 5, comme mω₀/c (leçon « L'oscillateur forcé amorti »)." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

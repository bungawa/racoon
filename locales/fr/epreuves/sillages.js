/* Épreuve de l'étape « Sillages et écoulement de Couette » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      pile: { prompt: "Une pile de pont de 1\u00a0m de diamètre dans une rivière à 1\u00a0m·s⁻¹ (ν = 1,0\u00a0×\u00a010⁻⁶\u00a0m²·s⁻¹). Dans quel régime est son sillage ?",
        options: { a: "Re ≈ 10⁶ : dans la crise de traînée, où le coefficient dépend de la rugosité et de la turbulence amont.", b: "Re ≈ 10³ : allée de tourbillons régulière, Cx ≈ 1.", c: "Re ≈ 1 : écoulement rampant, symétrique.", d: "Re ≈ 50 : deux tourbillons attachés." },
        hint: "Re = U D/ν ; comparez à 1,5 × 10⁵ et 3,5 × 10⁶.",
        why: "Re = 1 × 1/10⁻⁶ = 10⁶, entre 1,5 × 10⁵ et 3,5 × 10⁶ : la couche limite devient turbulente avant de décoller, Cx est plus bas que le palier et sensible à l'état de surface. Leçon « Écoulement autour d'un cylindre »." },
      fil: { prompt: "Un fil de 3\u00a0mm vibre dans un vent de 15\u00a0m·s⁻¹ (air, ν = 1,5\u00a0×\u00a010⁻⁵\u00a0m²·s⁻¹). Quelle fréquence de détachement attendre ?",
        options: { a: "100\u00a0Hz.", b: "1\u00a0kHz.", c: "10\u00a0kHz.", d: "Aucune : à ce Re, les tourbillons restent attachés." },
        hint: "Vérifiez d'abord le régime, puis f = St U/D.",
        why: "Re = 15 × 0,003/1,5 × 10⁻⁵ = 3\u202f000 : régime de l'allée, St ≈ 0,2. f = 0,2 × 15/0,003 = 1\u202f000\u00a0Hz. Leçon « Écoulement autour d'un cylindre », St = fD/U ≈ 0,2." },
      paradoxe: { prompt: "Pourquoi n'existe-t-il pas de « loi de Stokes » pour un cylindre infini, alors qu'il y en a une pour une sphère ?",
        options: { a: "Parce qu'un cylindre n'a pas de traînée à faible vitesse.", b: "Parce que l'écoulement autour d'un cylindre est toujours turbulent.", c: "Parce que les équations sans inertie n'ont pas de solution collée au cylindre et uniforme à l'infini : il faut garder l'inertie loin du cylindre.", d: "Parce que la viscosité d'un fluide dépend de la forme de l'obstacle." },
        why: "C'est le paradoxe de Stokes. La perturbation d'un cylindre décroît trop lentement : loin de lui, à une distance de l'ordre de D/Re, l'inertie compte toujours. Lamb en tient compte et obtient sa formule, avec un logarithme de Re. Leçon « Écoulement autour d'un cylindre »." },
      cable: { prompt: "Un câble de 2\u00a0cm de diamètre et 10\u00a0m de long est dans un vent de 20\u00a0m·s⁻¹ (ρ = 1,2\u00a0kg·m⁻³, Re ≈ 2,7\u00a0×\u00a010⁴). Quelle force de traînée subit-il ?",
        options: { a: "Environ 0,5\u00a0N.", b: "Environ 5\u00a0N.", c: "Environ 500\u00a0N.", d: "Environ 50\u00a0N." },
        hint: "Au palier, Cx ≈ 1 ; F = ½ ρ U² D ℓ Cx.",
        why: "F = ½ × 1,2 × 20² × 0,02 × 10 × 1 ≈ 48\u00a0N. Au palier, entre 10³ et 10⁵, Cx reste voisin de 1 : la force suit U². Leçon « Écoulement autour d'un cylindre », (41.22a) et l'ajustement de White." },
      aspiration: { prompt: "Sur une paroi aspirante, on divise la viscosité cinématique par 4, aspiration et vitesse fixées. Que deviennent l'épaisseur de la couche et la contrainte à la paroi ?",
        options: { a: "L'épaisseur est divisée par 4, la contrainte ne change pas.", b: "Les deux sont divisées par 4.", c: "L'épaisseur est divisée par 2, la contrainte aussi.", d: "L'épaisseur ne change pas, la contrainte est divisée par 4." },
        why: "δ = ν/va est divisée par 4 ; τp = η U/δ = ρ U va ne dépend pas de ν. La couche s'amincit sans que la force sur la paroi diminue : la limite ν → 0 n'est pas le fluide parfait. Leçon « La limite de viscosité nulle », (41.23a) et (41.23b)." },
      limite: { prompt: "Pourquoi l'écoulement d'un fluide de viscosité très petite n'est-il pas celui du fluide parfait, même loin de toute turbulence ?",
        options: { a: "Parce que la viscosité de l'eau et de l'air n'est pas si petite.", b: "Parce que le terme visqueux contient les dérivées les plus élevées : près de la paroi, les gradients grandissent quand ν diminue, et le terme reste du même ordre que l'inertie.", c: "Parce que le fluide parfait est compressible.", d: "Parce que la pression d'un fluide visqueux est toujours plus grande." },
        hint: "Que vaut ν U/δ² quand δ ∼ D/√Re ?",
        why: "ν U/δ² = U²/D quand δ ∼ D/√Re : dans la couche limite, viscosité et inertie s'équilibrent quelle que soit la petitesse de ν. Rayer le terme abaisse l'ordre de l'équation et supprime l'adhérence. Leçon « La limite de viscosité nulle », (41.23c)." },
      couette: { prompt: "De l'huile remplit l'entrefer de deux cylindres coaxiaux. Dans quelle configuration le critère de Rayleigh prédit-il une instabilité ?",
        options: { a: "Cylindre extérieur seul en rotation.", b: "Les deux cylindres à la même vitesse angulaire.", c: "Cylindre intérieur seul en rotation.", d: "Aucune : l'écoulement de Couette est une solution exacte, donc toujours stable." },
        why: "Intérieur seul, r v décroît de ωa a² à zéro vers l'extérieur : instable. Extérieur seul, il croît : stable. Rotation en bloc : r v = ω r² croît, stable. Une solution exacte peut être instable. Leçon « L'écoulement de Couette », le critère de Rayleigh." },
      taylor: { prompt: "Cylindre intérieur de 20\u00a0mm de rayon, extérieur immobile, eau (ν = 1,0\u00a0×\u00a010⁻⁶\u00a0m²·s⁻¹). Avec un entrefer de 2\u00a0mm, les anneaux de Taylor apparaissent vers 3,4\u00a0rad·s⁻¹. Avec un entrefer de 1\u00a0mm ?",
        options: { a: "Vers 1,7\u00a0rad·s⁻¹ : l'entrefer est deux fois plus petit.", b: "Toujours vers 3,4\u00a0rad·s⁻¹.", c: "Vers 6,8\u00a0rad·s⁻¹.", d: "Vers 9,4\u00a0rad·s⁻¹." },
        hint: "Ta = Re² h/R0 avec Re = ωa a h/ν : à seuil fixé, ωa varie comme h^(\u22123/2).",
        why: "Re_c = √(1\u202f708 R0/h) = √(1\u202f708 × 20,5/1) ≈ 187, donc ωa = Re_c ν/(a h) = 187 × 10⁻⁶/(0,02 × 0,001) ≈ 9,4\u00a0rad·s⁻¹. Un entrefer étroit freine plus fort la particule déplacée. Leçon « L'écoulement de Couette », le seuil de Taylor, 1\u202f708." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

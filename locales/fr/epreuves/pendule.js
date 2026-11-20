/* Épreuve de l'étape « Le pendule » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      mesureg: { prompt: "Pour mesurer g, on lâche un pendule de 1\u00a0m à 30° et l'on utilise T₀ = 2π√(ℓ/g). Quelle erreur commet-on sur g ?",
        options: { a: "Aucune : la période ne dépend pas de l'amplitude.", b: "On sous-estime g d'environ 3,4\u00a0%.", c: "On sous-estime g d'environ 1,7\u00a0%.", d: "On surestime g d'environ 3,4\u00a0%." },
        hint: "À 30°, la période vraie dépasse T₀ d'environ θ₀²/16 ; et g varie comme 1/T².",
        why: "θ₀ = 0,524\u00a0rad : θ₀²/16 ≈ 1,7\u00a0%, la formule exacte donne +1,74\u00a0% (leçon « Période aux grandes amplitudes »). Avec g = 4π²ℓ/T² et une période trop longue, g est sous-estimé d'environ 2\u00a0×\u00a01,7 ≈ 3,4\u00a0%. T₀ ne vaut à 0,1\u00a0% près que sous 7° (leçon « Pendule simple : équation du mouvement »)." },
      lune: { prompt: "Sur Terre, un pendule de 1\u00a0m et une boule sur un ressort ont la même période, 2,0\u00a0s. Sur la Lune, où g = 1,62\u00a0m·s⁻², que deviennent leurs périodes ?",
        options: { a: "Toutes deux 4,9\u00a0s : tout oscille plus lentement quand la pesanteur est plus faible.", b: "Toutes deux 2,0\u00a0s : la masse se simplifie dans les deux équations.", c: "Pendule 4,9\u00a0s, ressort 2,0\u00a0s.", d: "Pendule 2,0\u00a0s, ressort 4,9\u00a0s." },
        hint: "D'où vient le rappel, dans chacun des deux ?",
        why: "Le rappel du pendule vient du poids : T₀ = 2π√(ℓ/g) = 2π√(1/1,62) ≈ 4,9\u00a0s (leçon « Pendule simple : équation du mouvement »). Celui du ressort vient de k : T₀ = 2π√(m/k) ne contient pas g, le poids ne fait que déplacer l'équilibre (leçon « L'oscillateur harmonique »)." },
      borda: { prompt: "L'erreur de la formule de Borda sur la période vaut environ 5\u00a0×\u00a010⁻⁵ à 20°. Que vaut-elle à 40° ?",
        options: { a: "Environ 8\u00a0×\u00a010⁻⁴.", b: "Environ 1\u00a0×\u00a010⁻⁴.", c: "Environ 2\u00a0×\u00a010⁻⁴.", d: "Toujours 5\u00a0×\u00a010⁻⁵ : Borda corrige justement l'effet de l'amplitude." },
        hint: "Le premier terme que Borda néglige varie comme θ₀⁴.",
        why: "Doubler l'angle multiplie l'erreur par 2⁴ = 16 : 5\u00a0×\u00a010⁻⁵\u00a0×\u00a016 ≈ 8\u00a0×\u00a010⁻⁴, et le calcul exact donne 8,5\u00a0×\u00a010⁻⁴ (leçon « Période aux grandes amplitudes »). Elle passe 0,1\u00a0% vers 41,6° et 1\u00a0% vers 74° : au-delà, il faut la formule exacte. Borda n'est que le premier terme correctif ; T₀ seul se trompe déjà de θ₀²/16 (leçon « Pendule simple : équation du mouvement »)." },
      boule: { prompt: "Au bout d'une tige de 1\u00a0m, une boule de 5\u00a0cm de diamètre écarte la période du modèle « point » de 1,25\u00a0×\u00a010⁻⁴. Avec une boule de 10\u00a0cm de diamètre au même endroit, l'écart devient…",
        options: { a: "1,25\u00a0×\u00a010⁻⁴ : seule la distance du pivot au centre compte.", b: "2,5\u00a0×\u00a010⁻⁴, proportionnel au rayon.", c: "1\u00a0×\u00a010⁻³, proportionnel au volume de la boule.", d: "5\u00a0×\u00a010⁻⁴ : il varie comme r²/(5ℓ²)." },
        hint: "Le moment d'inertie vaut m(ℓ² + 2r²/5).",
        why: "La boule tourne sur elle-même en se balançant : J = m(ℓ² + 2r²/5) au lieu de mℓ², d'où un écart relatif d'environ r²/(5ℓ²) sur la période. Rayon doublé, écart multiplié par 4 : 5\u00a0×\u00a010⁻⁴ (leçon « Pendule simple : équation du mouvement »). La taille change T₀, pas la loi d'anisochronisme en θ₀ (leçon « Période aux grandes amplitudes »)." },
      tour: { prompt: "On lance le pendule de 1\u00a0m depuis le point bas. Quelle vitesse minimale faut-il pour qu'il fasse le tour complet, avec une tige rigide, puis avec un fil souple ?",
        options: { a: "6,3\u00a0m·s⁻¹ dans les deux cas : il suffit d'atteindre le sommet.", b: "7,0\u00a0m·s⁻¹ dans les deux cas.", c: "Un peu plus de 6,3\u00a0m·s⁻¹ avec la tige, 7,0\u00a0m·s⁻¹ avec le fil.", d: "Un peu plus de 6,3\u00a0m·s⁻¹ avec le fil, 7,0\u00a0m·s⁻¹ avec la tige, plus lourde." },
        hint: "Tige : il suffit de franchir la séparatrice, v₀² > 4gℓ. Fil : la tension doit rester positive au sommet.",
        why: "Avec la tige, il faut une énergie au-dessus de la séparatrice, 2mgℓ : v₀² > 4gℓ, v₀ > 6,3\u00a0m·s⁻¹ (leçon « Portrait de phase du pendule »). Un fil ne peut que tirer : au sommet, il faut v² ≥ gℓ, d'où v₀² ≥ 5gℓ, v₀ ≥ 7,0\u00a0m·s⁻¹ (leçon « Pendule simple : équation du mouvement »). Entre les deux, la boule quitte le cercle au-dessus de l'horizontale." },
      col: { prompt: "Un pendule à tige de 1\u00a0m est posé à la verticale haute, écarté de 10⁻⁶\u00a0rad : l'écart atteint 1\u00a0rad en 4,6\u00a0s environ. S'il est écarté de 10⁻⁹\u00a0rad seulement, combien de temps faut-il ?",
        options: { a: "Environ 4,6\u00a0×\u00a010³\u00a0s : un écart mille fois plus petit met mille fois plus longtemps.", b: "Environ 6,8\u00a0s : chaque facteur 1\u202f000 n'ajoute que ln(1\u202f000)/ω₀ ≈ 2,2\u00a0s.", c: "Toujours 4,6\u00a0s : la durée ne dépend que de ω₀.", d: "Un temps infini : on ne quitte jamais un équilibre." },
        hint: "Près du col, l'écart croît comme e^(ω₀t), avec 1/ω₀ = 0,32\u00a0s.",
        why: "Au sommet, l'énergie potentielle est maximale : l'équilibre est instable et l'écart croît exponentiellement (leçon « Portrait de phase du pendule »). t = arcosh(1/φ₀)/ω₀ : arcosh(10⁹)/3,13 ≈ 6,8\u00a0s. La même lenteur près du sommet fait diverger la période, mais seulement de façon logarithmique, quand θ₀ tend vers 180° (leçon « Période aux grandes amplitudes »)." },
      cycloide: { prompt: "Huygens fait suivre à la boule une cycloïde au lieu d'un cercle. Pourquoi sa période ne dépend-elle plus de l'amplitude ?",
        options: { a: "Parce que, courbe de descente la plus rapide, elle rend la période la plus courte possible.", b: "Parce que la boule y va moins vite, donc l'air la freine moins.", c: "Parce que la cycloïde est plus plate au fond : les grands angles n'y sont jamais atteints.", d: "Parce que le rappel le long de la courbe y est exactement proportionnel à l'abscisse curviligne : c'est l'oscillateur harmonique, sans approximation." },
        hint: "Sur le cercle, le rappel vaut \u2212mg sin θ, alors que s = ℓθ.",
        why: "Sur le cercle, le rappel \u2212mg sin θ croît moins vite que s = ℓθ : le pendule n'est pas isochrone (leçon « Pendule simple : équation du mouvement »). Sur la cycloïde, z = s²/8a donne un rappel \u2212(mg/4a)s, exactement linéaire : la période ne dépend pas de la hauteur de départ (leçon « Période aux grandes amplitudes »). Être la courbe de descente la plus rapide est une autre propriété de la même courbe." },
      separatrice: { prompt: "Un pendule à tige lâché sans vitesse à 168,5° a une période de 2,35 T₀, où T₀ est la période des petites oscillations. Lâché à 178,9°, beaucoup plus près du sommet, sa période vaut…",
        options: { a: "Environ 3,8 T₀ : chaque facteur 100 sur l'écart à la séparatrice n'ajoute qu'environ 1,5 T₀.", b: "Environ 235 T₀ : dix fois plus près du sommet, cent fois plus long.", c: "Infinie : il faut un temps infini pour approcher le sommet.", d: "Environ 2,4 T₀ : au-delà de 160°, la période ne change presque plus." },
        hint: "168,5° correspond à 1 \u2212 k² = 10⁻², 178,9° à 10⁻⁴.",
        why: "Près de la séparatrice, la période ne diverge que logarithmiquement : chaque facteur 100 sur 1 \u2212 k² ajoute 1,47 T₀ (leçon « Portrait de phase du pendule »). La formule exacte, par la moyenne arithmético-géométrique, donne 2,35 + 1,47 ≈ 3,8 T₀ (leçon « Période aux grandes amplitudes »). La période n'est infinie que sur la séparatrice exactement." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

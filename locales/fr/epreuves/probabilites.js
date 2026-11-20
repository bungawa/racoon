/* Épreuve de l'étape « Probabilités » : textes en français. Une autre langue = locales/<langue>/epreuves/probabilites.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/probabilites.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      frequence: { prompt: "On lance 400 fois une pièce équilibrée. De combien la fraction de piles s'écarte-t-elle typiquement de 1/2 ?",
        options: { a: "D'environ 0,025 : elle tombe entre 0,475 et 0,525 à peu près deux fois sur trois.", b: "De 0 : la pièce est équilibrée.", c: "D'environ 0,05, puisque √400 = 20 et 20/400 = 0,05.", d: "D'environ 0,0025, un centième de l'écart d'un seul lancer." },
        hint: "L'excès de piles vaut la moitié de la position d'un marcheur au hasard.",
        why: "L'excès de piles a pour écart quadratique moyen ½√N = 10, soit 10/400 = 0,025 en fraction : c'est (6.14). Oublier le facteur ½ donne 0,05. Un écart-type n'est pas une borne : la fraction en sort environ une fois sur trois. Leçons « La marche au hasard » et « Hasard et vraisemblance »." },
      quatre: { prompt: "Quatre lancers d'une pièce équilibrée. Quelle est la probabilité d'exactement deux piles ?",
        options: { a: "1/2 : deux, c'est la moitié de quatre.", b: "6/16 = 3/8.", c: "1/5 : il y a cinq scores possibles, de 0 à 4.", d: "1/16." },
        hint: "Ligne 4 du triangle de Pascal : 1 4 6 4 1.",
        why: "Les 16 suites de quatre lancers sont également probables ; (6.4) en compte 4!/(2! 2!) = 6 avec deux piles, d'où (6.5) : 6/16. Les cinq scores ne sont pas également probables. 1/16 est la probabilité d'une suite donnée. Leçon « Les fluctuations »." },
      lame: { prompt: "Une lame porte n/A = 10²⁶ noyaux par m², chacun de section efficace σ = 10⁻²⁸ m². Quelle est la probabilité qu'un projectile y subisse une collision ?",
        options: { a: "10⁻⁵⁴, le produit des deux nombres sans les unités.", b: "100 : il y a cent noyaux par projectile.", c: "10⁻², soit 1 % ; la lame est bien mince, (6.3) s'applique.", d: "1 : il y a toujours un noyau sur le chemin." },
        hint: "nσ/A est sans dimension : m⁻² × m².",
        why: "(6.3) : P = (n/A)σ = 10²⁶ × 10⁻²⁸ = 10⁻². La fraction de surface couverte par les cibles est petite, elles ne se masquent pas : l'écart à 1 \u2212 exp(\u2212nσ/A) est d'environ 0,5 %. Leçon « Hasard et vraisemblance »." },
      diffusion: { prompt: "Une molécule de parfum, dans l'air immobile, s'écarte en moyenne quadratique de 1 mm en 1 s. De combien en 100 s ?",
        options: { a: "De 100 mm : la distance est proportionnelle au temps.", b: "De 0 : en moyenne, elle revient à son point de départ.", c: "De 1 mm : la diffusion atteint vite un état stationnaire.", d: "De 10 mm : la distance croît comme la racine du nombre de pas, donc du temps." },
        hint: "Cent fois plus de temps, c'est cent fois plus de pas.",
        why: "Dᵣₘₛ = ℓ√N (6.10), et N est proportionnel au temps : √100 = 10, d'où 10 mm. La position moyenne est nulle, mais pas le carré moyen. Leçon « La marche au hasard »." },
      queue: { prompt: "Un marcheur fait 100 pas indépendants, de moyenne nulle et de carré moyen ⟨S²⟩ = 1 m². Quelle est à peu près la probabilité qu'il finisse à plus de 20 m de son départ, d'un côté ou de l'autre ?",
        options: { a: "Environ 5 % : σ = √100 × 1 m = 10 m, et 20 m font 2σ.", b: "Environ 32 % : c'est la probabilité de sortir de ±σ.", c: "0 : la moyenne est nulle.", d: "Environ 20 %, puisque 20 m sur 100 pas." },
        hint: "Calculez σ par (6.16), puis lisez la gaussienne.",
        why: "(6.16) donne ⟨D²⟩ = 100 m², donc σ = 10 m. Pour N = 100, la loi de D est très proche de la gaussienne (6.20) ; l'aire au-delà de ±2σ vaut 4,6 %. 32 % serait la réponse pour 10 m. Leçons « Une distribution de probabilité » et « La marche au hasard »." },
      densite: { prompt: "Une position suit une loi normale d'écart-type 2 mm. Que vaut sa densité de probabilité au sommet ?",
        options: { a: "0,2, sans unité : une densité est une probabilité, donc inférieure à 1.", b: "Environ 199 m⁻¹ : 1/(σ√(2π)) avec σ = 0,002 m.", c: "1, par normalisation.", d: "Environ 199 m." },
        hint: "p(x)Δx est sans dimension, et Δx est une longueur.",
        why: "(6.20) au sommet : 1/(0,002 × 2,507) ≈ 199 m⁻¹. Une densité n'est pas une probabilité : elle peut dépasser 1, et seule l'aire sous la courbe (6.19) vaut 1. Leçon « Une distribution de probabilité »." },
      electron: { prompt: "Un électron est localisé à Δx = 1 nm près. Quelle est la plus petite incertitude possible sur sa vitesse ?",
        options: { a: "Environ 58 m·s⁻¹.", b: "0 : il suffit d'un meilleur instrument.", c: "Environ 58 km·s⁻¹ : ħ/(2 mₑ Δx).", d: "Environ 3 × 10⁸ m·s⁻¹." },
        hint: "ħ ≈ 1,05 × 10⁻³⁴ J·s, mₑ ≈ 9,11 × 10⁻³¹ kg.",
        why: "(6.22) : 1,05 × 10⁻³⁴/(2 × 9,11 × 10⁻³¹ × 10⁻⁹) ≈ 5,8 × 10⁴ m·s⁻¹. Aucun instrument ne descend sous cette limite : elle porte sur les densités de probabilité elles-mêmes. Comme Δv ≪ c, la forme en Δv vaut. Leçon « Le principe d'incertitude »." },
      proton: { prompt: "Un proton est confiné dans un noyau, Δx ≈ 10⁻¹⁵ m. La forme Δx Δv ≥ ħ/(2m) est-elle encore utilisable ?",
        options: { a: "Non : elle ne vaut que pour l'électron.", b: "Oui, sans aucune réserve, quel que soit Δv.", c: "Non : la probabilité n'a pas de sens à l'intérieur d'un noyau.", d: "À la limite : elle donne Δv ≥ 3 × 10⁷ m·s⁻¹, soit 0,1 c ; p = mv n'y est faux que d'environ 0,5 %, donc l'ordre de grandeur tient." },
        hint: "Calculez Δv/c, puis relisez la note de validité de (6.22).",
        why: "ħ/(2 mₚ Δx) ≈ 3,2 × 10⁷ m·s⁻¹ ≈ 0,105 c. La forme en Δv suppose p = mv ; à 0,1 c, l'écart relativiste est de 0,5 %. Pour un électron dans le même noyau, on trouverait 200 c : là, il faut raisonner sur Δp. Leçon « Le principe d'incertitude »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

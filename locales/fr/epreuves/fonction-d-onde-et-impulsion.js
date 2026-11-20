/* Épreuve de l'étape « De l'amplitude à la fonction d'onde » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      continu: { prompt: "Une chaîne d'atomes de pas 0,3 nm porte un électron d'amplitude de saut A. À quelle condition peut-on remplacer l'équation des sauts par une équation aux dérivées partielles en x ?",
        options: { a: "Il faut que A soit petit devant E₀.", b: "Il faut que la chaîne soit infinie, et cela suffit.", c: "Il faut que l'amplitude varie peu d'un atome au suivant : longueur d'onde grande devant le pas, kb ≪ 1.", d: "Toujours : la limite continue est exacte pour tout état." },
        hint: "Le développement de Taylor de C(x ± b) doit converger vite.",
        why: "2C(x) \u2212 C(x + b) \u2212 C(x \u2212 b) ≈ \u2212b² C'' demande que C varie peu sur un pas. L'erreur relative sur l'énergie cinétique vaut environ (kb)²/12 : 1 % pour une longueur d'onde de 18 pas. Leçon « Les amplitudes sur une droite »." },
      masse: { prompt: "Une chaîne a un pas b = 0,2 nm. Quelle amplitude de saut A donnerait à l'électron sa masse ordinaire, mₑ ?",
        options: { a: "Environ 0,95 eV, puisque mₑ = ħ²/(2Ab²).", b: "Environ 3,8 eV, la valeur pour b = 0,1 nm.", c: "Environ 0,24 eV.", d: "Aucune : une masse effective est toujours plus grande que mₑ." },
        hint: "ħ²/(2mₑ) ≈ 0,038 eV·nm².",
        why: "A = ħ²/(2mₑb²) = 0,0381 eV·nm²/0,04 nm² ≈ 0,95 eV. Doubler le pas divise A par quatre à masse égale : 3,8 eV pour 0,1 nm. Une masse effective peut être plus petite que mₑ, comme dans l'arséniure de gallium. Leçon « Les amplitudes sur une droite »." },
      densite: { prompt: "Un électron a une fonction d'onde gaussienne de largeur σ = 0,1 nm. Quelle est à peu près la probabilité de le trouver dans une fenêtre de 0,01 nm centrée sur le maximum de |ψ|² ?",
        options: { a: "1 %, puisque la fenêtre fait le dixième de σ.", b: "Environ 4 %, |ψ(0)|² Δx, avec une erreur de moins de 0,1 % car Δx ≪ σ.", c: "Environ 68 %.", d: "Zéro, puisqu'une probabilité en un point est nulle." },
        hint: "|ψ(0)|² = 1/(σ√(2π)).",
        why: "|ψ(0)|² = 1/(0,1 nm × 2,507) ≈ 3,99 nm⁻¹ ; fois 0,01 nm : 3,99 %. Δx/σ = 0,1 : l'écart relatif vaut (0,1)²/24 ≈ 0,04 %. Leçon « La fonction d'onde »." },
      unite: { prompt: "Dans l'espace à trois dimensions, quelle est l'unité de la fonction d'onde ψ(r) d'une particule ?",
        options: { a: "m⁻¹ᐟ², comme sur une droite.", b: "Aucune.", c: "m⁻³.", d: "m⁻³ᐟ², pour que |ψ|² dV soit une probabilité." },
        why: "∫|ψ|² dV = 1, sans dimension : |ψ|² est en m⁻³ et ψ en m⁻³ᐟ². Sur une droite, |ψ|² dx : ψ en m⁻¹ᐟ². Leçon « La fonction d'onde »." },
      recouvrement: { prompt: "Deux paquets gaussiens de même largeur σ, de même quantité de mouvement, ont leurs centres écartés de 2σ. Que vaut la probabilité |⟨φ|ψ⟩|² ?",
        options: { a: "e⁻¹ ≈ 0,37 : les deux états se recouvrent encore beaucoup.", b: "0 : ils sont à des endroits différents.", c: "0,5.", d: "e⁻⁴ ≈ 0,018." },
        hint: "|⟨φ|ψ⟩|² = e^(\u2212d²/4σ²) à quantités de mouvement égales.",
        why: "d²/4σ² = 1, donc |⟨φ|ψ⟩|² = e⁻¹ ≈ 0,37. Deux paquets écartés de deux fois leur largeur sont loin d'être orthogonaux : un test ne les distingue qu'une fois sur deux ou trois. Leçon « La fonction d'onde »." },
      fourier: { prompt: "On divise par deux la largeur d'un paquet gaussien. Que devient sa densité de probabilité en quantité de mouvement ?",
        options: { a: "Elle devient deux fois plus étroite.", b: "Elle ne change pas : la largeur en x et la quantité de mouvement sont indépendantes.", c: "Elle devient deux fois plus large et deux fois moins haute : son écart type η = ħ/(2σ) double.", d: "Elle se couvre de franges." },
        why: "φ(p) est la transformée de Fourier de ψ : pour une gaussienne, η = ħ/(2σ). Le produit ησ reste ħ/2, la borne de Δx Δp ≥ ħ/2. Leçon « Les états de quantité de mouvement définie »." },
      franges: { prompt: "Un électron a une fonction d'onde faite de deux paquets écartés de 2 nm. Que montre sa densité de probabilité en quantité de mouvement ?",
        options: { a: "Rien de nouveau : la somme de deux gaussiennes de même centre.", b: "Des franges de période h/d ≈ 3,3 × 10⁻²⁵ kg·m·s⁻¹ sous l'enveloppe d'un paquet seul.", c: "Deux pics, aux quantités de mouvement ±h/d.", d: "Une densité plus étroite qu'un paquet seul, car Δx a grandi." },
        hint: "φ(p) contient le facteur cos(pd/2ħ).",
        why: "Les deux paquets donnent deux amplitudes qui diffèrent d'une phase pd/ħ : |φ|² ∝ 1 + cos(pd/ħ), de période 2πħ/d = h/d ≈ 6,63 × 10⁻³⁴/2 × 10⁻⁹ ≈ 3,3 × 10⁻²⁵ kg·m·s⁻¹. L'enveloppe reste celle d'un paquet : Δp change peu. Leçon « Les états de quantité de mouvement définie »." },
      borne: { prompt: "Un atome d'hydrogène de masse 1,67 × 10⁻²⁷ kg est piégé et localisé à σ = 10 nm. Quelle est la dispersion minimale de sa vitesse, et que néglige-t-on en la calculant par Δp ≥ ħ/(2σ) ?",
        options: { a: "Environ 3 × 10⁻⁸ m·s⁻¹ ; on néglige le spin.", b: "Environ 3 km·s⁻¹ ; on néglige la gravité.", c: "Zéro, car un atome piégé est immobile.", d: "Environ 3 m·s⁻¹ ; on traite l'atome comme une particule libre sans structure, non relativiste, ce que (v/c)² ≈ 10⁻¹⁶ justifie largement." },
        hint: "Δv = ħ/(2σm).",
        why: "Δv = 1,055 × 10⁻³⁴/(2 × 10⁻⁸ × 1,67 × 10⁻²⁷) ≈ 3,2 m·s⁻¹, de l'ordre de l'agitation d'un gaz vers le millikelvin. À ces vitesses, (v/c)² ≈ 10⁻¹⁶ : la description non relativiste, à une seule coordonnée de centre de masse, suffit. Leçons « Les états de quantité de mouvement définie » et « La fonction d'onde »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « L'équation de Schrödinger » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      delta: { prompt: "On approche δ(x \u2212 x′) par un rectangle de largeur ε = 0,02 nm pour lire une fonction d'onde de longueur d'onde 0,3 nm. Que vaut à peu près l'erreur relative, et pourquoi ?",
        options: { a: "Environ 10 %, car ε n'est pas nul.", b: "Zéro, car le rectangle a une aire 1.", c: "Environ 0,7 % : l'écart vaut ψ''ε²/24, soit (kε)²/24 en relatif pour une onde.", d: "Environ 7 %, car ε/λ ≈ 0,07." },
        hint: "Pour une onde, ψ'' = \u2212k²ψ, avec k = 2π/λ.",
        why: "k = 2π/0,3 nm ≈ 21 nm⁻¹, kε ≈ 0,42 et (kε)²/24 ≈ 0,73 % ; le calcul exact, sin(kε/2)/(kε/2) \u2212 1, donne \u22120,73 %. L'erreur est d'ordre ε², pas ε. Leçon « La normalisation des états en x »." },
      unite: { prompt: "Quelle est l'unité de ⟨x′|x⟩ = δ(x \u2212 x′) ?",
        options: { a: "m⁻¹ : son intégrale sur x vaut 1, sans dimension.", b: "Aucune, comme toute amplitude.", c: "m.", d: "m⁻¹ᐟ²." },
        why: "∫δ(x \u2212 x′)dx = 1 et dx est en mètres : δ est en m⁻¹. Les états |x⟩ ainsi normés ne sont pas des états physiques de norme 1. Leçon « La normalisation des états en x »." },
      laplacien: { prompt: "Comment passe-t-on de iħ dC_i/dt = Σ H_ij C_j à l'équation de Schrödinger d'une particule dans un potentiel ?",
        options: { a: "En remplaçant H_ij par l'énergie totale E.", b: "La somme devient une intégrale sur x′ ; pour un potentiel local, le noyau H(x, x′) ne garde que la dérivée seconde et V(x)ψ(x).", c: "En négligeant les termes non diagonaux.", d: "Par un passage à la limite classique ħ → 0." },
        why: "Les états |x⟩ remplacent les indices discrets ; l'amplitude en x ne dépend que des amplitudes infiniment voisines, d'où \u2212(ħ²/2m)∂²ψ/∂x² + Vψ. Leçons « L'équation de Schrödinger » et « Les amplitudes sur une droite »." },
      norme: { prompt: "Un paquet d'électron rencontre une barrière. Au bout de 60 fs, 37 % de la probabilité est au-delà. Que vaut la probabilité du côté de départ, et qu'est-ce qui le garantit ?",
        options: { a: "37 %, par symétrie.", b: "100 %, la barrière ne prend rien.", c: "On ne peut pas le savoir sans mesurer.", d: "63 % : l'évolution de Schrödinger conserve ∫|ψ|²dx, la probabilité passe d'un côté à l'autre sans se créer ni se perdre." },
        why: "L'hamiltonien est hermitien : la norme de ψ est conservée. Réflexion et transmission se partagent la probabilité totale, 1. Leçon « L'équation de Schrödinger »." },
      tunnel: { prompt: "Un électron de 0,2 eV arrive sur une barrière de 0,25 eV. Combien vaut à peu près la longueur de décroissance 1/κ de ψ sous la barrière ?",
        options: { a: "0,87 nm, avec κ = √(2m(V₀ \u2212 E))/ħ ≈ 1,15 nm⁻¹.", b: "0,1 nm, la taille d'un atome.", c: "Infinie, puisque E < V₀.", d: "2,7 nm, la longueur d'onde de l'électron." },
        hint: "√(2mₑ × 1 eV)/ħ ≈ 5,12 nm⁻¹.",
        why: "κ = 5,12 nm⁻¹ × √0,05 ≈ 1,15 nm⁻¹ : 1/κ ≈ 0,87 nm. Une barrière de quelques dixièmes de nanomètre laisse donc passer une bonne part du paquet ; quelques nanomètres, presque rien. Leçon « L'équation de Schrödinger »." },
      tir: { prompt: "On intègre (16.58) depuis la gauche d'un puits. Pour E = 0,10 eV, la solution part vers \u2212∞ à droite ; pour E = 0,30 eV, vers +∞. Qu'en conclure ?",
        options: { a: "Que le puits n'a pas d'état lié.", b: "Qu'il y a un nombre impair de niveaux entre 0,10 et 0,30 eV : la queue, continue en E, change de signe en passant chacun.", c: "Que la méthode de Numerov diverge.", d: "Que 0,20 eV est un niveau." },
        why: "La queue dépend continûment de E et s'annule à chaque niveau. Un changement de signe signale un nombre impair de niveaux entre les deux énergies, en pratique un seul ; une dichotomie le trouve. Leçon « Les niveaux d'énergie quantifiés »." },
      boite: { prompt: "On divise par deux la largeur d'un puits aux murs infinis. Que devient l'énergie du niveau fondamental ?",
        options: { a: "Elle est divisée par deux.", b: "Elle ne change pas.", c: "Elle est multipliée par quatre : E₁ = π²ħ²/(2mL²).", d: "Elle est multipliée par deux." },
        why: "E_n ∝ 1/L² : confiner deux fois plus fortement multiplie la quantité de mouvement minimale par deux et l'énergie cinétique par quatre. C'est pourquoi une boîte quantique plus petite émet plus bleu. Leçon « Les niveaux d'énergie quantifiés »." },
      validite: { prompt: "Pour l'électron de l'atome d'hydrogène, que néglige l'équation de Schrödinger avec le seul potentiel de Coulomb, et de combien ?",
        options: { a: "La masse de l'électron, petite devant celle du proton.", b: "Rien : elle est exacte pour l'hydrogène.", c: "L'interaction électron-proton, traitée à part.", d: "Les effets relativistes et magnétiques, spin compris : des corrections relatives d'ordre α² ≈ 5 × 10⁻⁵ sur les niveaux." },
        why: "Dans l'hydrogène, v/c ≈ α ≈ 1/137 : les termes relativistes et magnétiques sont d'ordre α² relatif, et donnent la structure fine. La masse finie du proton, elle, se prend en compte par la masse réduite. Leçons « L'équation de Schrödinger » et « Les niveaux d'énergie quantifiés »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

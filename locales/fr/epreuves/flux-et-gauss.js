/* Épreuve de l'étape « Flux et théorème de Gauss » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      chemin: { prompt: "Sur une plaque, T(1) = 295,0\u00a0K et T(2) = 315,6\u00a0K. On additionne ∇T · Δs le long d'un détour sinueux de 1 à 2, coupé en cordes de plus en plus courtes. Vers quoi tend la somme ?",
        options: { a: "Vers 20,6\u00a0K, comme pour tout autre chemin de 1 à 2.", b: "Vers une valeur plus grande que 20,6\u00a0K, car le détour est plus long.", c: "Vers zéro, car les montées et les descentes se compensent.", d: "Vers une valeur qui dépend du nombre de cordes, même très grand." },
        hint: "La somme des variations de T est télescopique.",
        why: "Chaque terme ∇T · Δs est, au premier ordre, la variation de T sur la corde ; la somme ne garde que T(2) \u2212 T(1) = 20,6\u00a0K. L'erreur de chaque terme décroît plus vite que le terme : avec plus de cordes, elle disparaît. La longueur du chemin n'intervient pas. Leçon « Intégrale curviligne d'un gradient »." },
      capteur: { prompt: "Un petit capteur, face à une lampe isotrope, reçoit 8\u00a0mW à 1\u00a0m. On le place à 2\u00a0m et on incline sa normale de 60° sur la direction de la lampe. Que reçoit-il ?",
        options: { a: "4\u00a0mW : seule l'inclinaison compte.", b: "1\u00a0mW : quatre fois moins par la distance, deux fois moins par l'inclinaison.", c: "2\u00a0mW : seule la distance compte.", d: "3,5\u00a0mW : le courant décroît en 1/r et l'inclinaison donne sin 60°." },
        why: "Le courant de la lampe décroît en 1/r² : 8/4 = 2\u00a0mW à 2\u00a0m, face à la lampe. Le flux ne retient que la composante normale, h a cos θ : 2 × cos 60° = 1\u00a0mW. Leçon « Le flux d'un champ de vecteurs »." },
      enveloppe: { prompt: "Une source de 100\u00a0W est enfermée dans une boîte en forme de pomme de terre, en régime permanent. Quel flux de chaleur sort de la boîte ?",
        options: { a: "Il dépend de la forme : une sphère est nécessaire pour le calculer.", b: "Moins de 100\u00a0W si la source est près d'une paroi.", c: "100\u00a0W, quelle que soit la forme et la place de la source.", d: "Zéro, car la divergence est nulle partout hors de la source." },
        why: "En régime permanent, tout ce que la source produit doit sortir. Par le théorème de Gauss, le flux sortant égale ce qui est produit dedans ; la divergence est nulle partout sauf au point de la source, qu'il faut compter à part. La sphère ne sert qu'à calculer h en chaque point, pas le flux total. Leçons « Le flux d'un champ de vecteurs » et « Flux à travers un cube : théorème de Gauss »." },
      chauffage: { prompt: "Une résistance noyée dans un bloc y produit uniformément 2\u00a0kW par mètre cube. En régime permanent, quel flux de chaleur sort d'un cube de 10\u00a0cm de côté pris à l'intérieur du bloc ?",
        options: { a: "Zéro, puisque rien ne change en régime permanent.", b: "2\u00a0kW.", c: "120\u00a0W, proportionnel à l'aire des six faces.", d: "2\u00a0W." },
        hint: "∇ · h = 2\u202f000\u00a0W·m⁻³ ; V = 10⁻³ m³.",
        why: "Par (3.21) en régime permanent, ∇ · h égale la puissance produite par unité de volume. Le flux sortant est ∫ ∇ · h dV = 2\u202f000 × 10⁻³ = 2\u00a0W, où que soit le cube. Leçons « Flux à travers un cube : théorème de Gauss » et « Conduction thermique : l'équation de diffusion »." },
      petit: { prompt: "Pour h = k x³ e_x, on estime le flux sortant d'un cube de 50\u00a0cm par (∇ · h)(centre) × a³ et on trouve un écart de 5,5\u00a0%. Quel écart attendre pour un cube de 10\u00a0cm au même centre ?",
        options: { a: "Environ 0,2\u00a0% : l'écart relatif varie comme a².", b: "Environ 1,1\u00a0% : l'écart relatif varie comme a.", c: "5,5\u00a0% : l'écart vient du champ, pas de la taille du cube.", d: "Environ 0,04\u00a0% : l'écart relatif varie comme a³." },
        why: "Pour un cube centré sur le point, les termes d'ordre 1 se compensent d'une face à l'autre ; l'erreur relative est d'ordre (a/L)². Cinq fois plus petit, vingt-cinq fois moins : 5,5/25 ≈ 0,2\u00a0%. Leçon « Flux à travers un cube : théorème de Gauss »." },
      boucle: { prompt: "On mesure la circulation d'un champ de vecteurs C sur un chemin fermé et on trouve 25 unités, avec une erreur de mesure de 0,5. Que peut-on conclure ?",
        options: { a: "Que C est un gradient, mais que la mesure est mauvaise.", b: "Que C n'est le gradient d'aucune fonction.", c: "Que la divergence de C est non nulle.", d: "Rien : un seul chemin ne prouve rien." },
        why: "L'intégrale d'un gradient sur un chemin fermé est nulle, quel que soit le chemin. Un seul contre-exemple, nettement au-dessus de l'erreur, suffit à réfuter « C = ∇ψ ». La divergence n'a rien à voir : un tourbillon a une divergence nulle et une circulation non nulle. Leçon « Intégrale curviligne d'un gradient »." },
      duree: { prompt: "L'inox a une diffusivité de 4,2 × 10⁻⁶ m²·s⁻¹. En quel ordre de temps la chaleur traverse-t-elle par diffusion une paroi d'inox de 2\u00a0cm ?",
        options: { a: "Environ 5\u00a0ms : L/D.", b: "Environ 5\u00a0s.", c: "Environ 100\u00a0s : L²/D.", d: "Environ 3\u00a0h." },
        hint: "Le temps de diffusion sur L est de l'ordre de L²/D.",
        why: "t ~ L²/D = (0,02)²/4,2 × 10⁻⁶ ≈ 95\u00a0s. L/D n'a même pas la dimension d'un temps. Une paroi deux fois plus épaisse demanderait quatre fois plus longtemps. Leçon « Conduction thermique : l'équation de diffusion »." },
      maximum: { prompt: "Dans un bloc de cuivre sans source, la température présente en un point un maximum local, en forme de bosse. Comment varie-t-elle en ce point ?",
        options: { a: "Elle reste constante, puisque son gradient y est nul.", b: "Elle augmente : la chaleur converge vers le point le plus chaud.", c: "Elle oscille autour de sa valeur.", d: "Elle diminue : ∇²T y est négatif." },
        why: "Le gradient nul dit seulement que la pente s'annule. ∂T/∂t = D ∇²T, et en un maximum ∇²T < 0 : le point est plus chaud que la moyenne de ses voisins, il leur cède de la chaleur. La diffusion efface les bosses. Leçons « Conduction thermique : l'équation de diffusion » et « Flux à travers un cube : théorème de Gauss »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « L'opérateur nabla » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      divergence: { prompt: "Un gaz s'écoule avec la vitesse v = (3x, \u2212y, 2z), coefficients en s⁻¹. Que vaut ∇ · v, et que dit ce nombre ?",
        options: { a: "4 s⁻¹ partout : le volume d'un petit élément de gaz augmente au taux relatif de 4 par seconde.", b: "(3, \u22121, 2) s⁻¹ : la divergence a trois composantes.", c: "6 s⁻¹ : on additionne les valeurs absolues des coefficients.", d: "0 : le gaz entre selon y autant qu'il sort selon x et z." },
        hint: "Dérivez chaque composante par rapport à sa propre variable.",
        why: "∂(3x)/∂x + ∂(\u2212y)/∂y + ∂(2z)/∂z = 3 \u2212 1 + 2 = 4 s⁻¹, un scalaire. Pour une vitesse, la divergence est le taux relatif de variation du volume d'un élément de fluide : (1/V) dV/dt = 4 s⁻¹. Leçon « Calculer avec nabla »." },
      rotationnel: { prompt: "Un plateau tourne à 2 rad·s⁻¹ ; sa vitesse est v = 2(\u2212y, x, 0) en m·s⁻¹. Que vaut ∇ ∧ v ?",
        options: { a: "Zéro au centre, de plus en plus grand vers le bord.", b: "(0, 0, 4) s⁻¹ en tout point : deux fois la vitesse angulaire.", c: "(0, 0, 2) s⁻¹, la vitesse angulaire elle-même.", d: "Zéro : les lignes de courant sont des cercles fermés." },
        hint: "(∇ ∧ v)_z = ∂v_y/∂x \u2212 ∂v_x/∂y.",
        why: "∂(2x)/∂x \u2212 ∂(\u22122y)/∂y = 2 + 2 = 4 s⁻¹, la même valeur partout : chaque petit élément tourne comme le plateau, à 2 rad·s⁻¹, et le rotationnel vaut le double. Leçon « Calculer avec nabla »." },
      fourier: { prompt: "Une tige de cuivre (κ = 401 W·m⁻¹·K⁻¹) de 10 cm et de 1 cm de diamètre relie, en régime permanent, de l'eau à 373 K et un bain à 293 K. Quelle puissance thermique transporte-t-elle ?",
        options: { a: "3,2 × 10⁵ W : c'est κ ΔT/L.", b: "3,2 W : l'aire de la section est de l'ordre de 10⁻⁵ m².", c: "Environ 25 W : h = κ ΔT/L ≈ 3,2 × 10⁵ W·m⁻², multiplié par l'aire de la section, 7,9 × 10⁻⁵ m².", d: "Rien : en régime permanent, la température ne change plus." },
        hint: "κ ΔT/L est une densité de courant, en W·m⁻² : il manque une aire.",
        why: "h = 401 × 80 / 0,1 ≈ 3,2 × 10⁵ W·m⁻², vers le froid. La section vaut π × 0,005² ≈ 7,9 × 10⁻⁵ m², d'où J ≈ 25 W. En régime permanent, la chaleur traverse sans s'accumuler : le flux est le même tout le long. Leçon « L'équation de la chaleur »." },
      vitre: { prompt: "Diffusivité du verre : 3,4 × 10⁻⁷ m²·s⁻¹. Une face d'une vitre de 4 mm est brusquement chauffée. En combien de temps environ la chaleur a-t-elle traversé l'épaisseur ?",
        options: { a: "En 10⁻² s environ : 4 mm, c'est très mince.", b: "En 4 × 10⁻³ / 3,4 × 10⁻⁷ ≈ 10⁴ s : le temps est proportionnel à l'épaisseur.", c: "En plusieurs jours : le verre est un isolant.", d: "En une cinquantaine de secondes : le temps de diffusion vaut L²/a ≈ 47 s." },
        hint: "La longueur chauffée croît comme √(a t).",
        why: "√(a t) = L donne t = L²/a = (4 × 10⁻³)² / 3,4 × 10⁻⁷ ≈ 47 s. Le temps croît comme le carré de l'épaisseur : une vitre deux fois plus épaisse demande quatre fois plus de temps. Leçon « L'équation de la chaleur »." },
      identites: { prompt: "Un champ magnétique doit vérifier ∇ · B = 0. Pourquoi l'écrire B = ∇ ∧ A garantit-il cette condition, quel que soit A ?",
        options: { a: "Parce que ∇ · (∇ ∧ A) = 0 pour tout champ A régulier : la divergence d'un rotationnel est nulle.", b: "Parce que A est toujours nul.", c: "Parce que ∇ ∧ A est un gradient.", d: "Ce n'est vrai que si ∇ · A = 0." },
        why: "Comme A · (A ∧ B) = 0, ∇ · (∇ ∧ A) = 0 : en composantes, les dérivées croisées se compensent par paires. Réciproquement, un champ de divergence nulle partout est un rotationnel. Leçon « Dérivées secondes des champs »." },
      moyenne: { prompt: "Dans une plaque, en un point, T = 350 K ; la moyenne des six voisins à 2 mm vaut 349,9 K. Que vaut ∇²T, et que va faire ce point d'après l'équation de la chaleur ?",
        options: { a: "+1,5 × 10⁵ K·m⁻² ; il va se réchauffer.", b: "\u22121,5 × 10⁵ K·m⁻² ; il est au-dessus de ses voisins et va se refroidir.", c: "\u22120,1 K·m⁻² ; il ne bouge presque pas.", d: "0 : un écart de 0,1 K est négligeable." },
        hint: "Moyenne \u2212 T ≈ a² ∇²T / 6.",
        why: "∇²T ≈ 6 × (\u22120,1) / (2 × 10⁻³)² = \u22121,5 × 10⁵ K·m⁻². Négatif : le point est une bosse de température, et ∂T/∂t = a∇²T < 0. Leçons « Dérivées secondes des champs » et « L'équation de la chaleur »." },
      polaire: { prompt: "Un élève calcule la divergence du champ E = r e_r (en coordonnées cylindriques, sans composante z) par ∂E_r/∂r + (1/r) ∂E_θ/∂θ et trouve 1. Qu'en dire ?",
        options: { a: "C'est juste : les formules cartésiennes valent dans toute base orthonormée.", b: "C'est juste à un facteur r près.", c: "C'est faux : la bonne formule (1/r) ∂(r E_r)/∂r donne 2, comme ∂x/∂x + ∂y/∂y en cartésiennes.", d: "C'est faux : la divergence de ce champ est nulle." },
        why: "Les vecteurs e_r et e_θ tournent d'un point à l'autre ; dériver les composantes comme des nombres oublie l'écartement des rayons, le terme E_r/r. En cartésiennes, E = (x, y) et ∇ · E = 2. Leçon « Les pièges »." },
      deuxnablas: { prompt: "Que vaut (∇ψ) ∧ (∇φ) pour ψ = x + y et φ = x \u2212 y ?",
        options: { a: "Zéro, puisque ∇ ∧ ∇ = 0.", b: "Zéro, puisque ψ et φ sont linéaires.", c: "(0, 0, 2).", d: "(0, 0, \u22122) : ∇ψ = (1, 1, 0) et ∇φ = (1, \u22121, 0) ne sont pas parallèles." },
        hint: "Calculez chaque gradient, puis leur produit vectoriel.",
        why: "Les deux ∇ agissent sur des fonctions différentes : ce sont deux vecteurs quelconques. (1, 1, 0) ∧ (1, \u22121, 0) = (0, 0, 1 × (\u22121) \u2212 1 × 1) = (0, 0, \u22122). Seul ∇ ∧ (∇ψ), où les deux ∇ dérivent la même fonction, est toujours nul. Leçon « Les pièges »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

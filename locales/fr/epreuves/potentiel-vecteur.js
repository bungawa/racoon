/* Épreuve de l'étape « Potentiel vecteur » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      superpos: { prompt: "Deux longs fils parallèles, à 2\u00a0cm l'un de l'autre, portent 20\u00a0A en sens contraires. Que vaut le champ magnétique au milieu ?",
        options: { a: "800\u00a0µT : les deux champs, de 400\u00a0µT chacun, pointent dans le même sens.", b: "Zéro : les courants sont opposés, leurs champs se compensent.", c: "400\u00a0µT : seul le fil le plus proche compte.", d: "200\u00a0µT : la moyenne des deux fils." },
        hint: "Dessinez le sens de rotation de chaque champ au point milieu.",
        why: "Chaque fil crée μ₀I/(2πr) = 2 × 10⁻⁷ × 20/0,01 = 400\u00a0µT. Entre deux courants opposés, les deux champs tournent en sens contraires mais pointent du même côté : ils s'ajoutent. Ils se compensent loin de la paire, pas entre les fils. Leçon « Superposition des champs et règle de la main droite »." },
      miroir: { prompt: "On construit l'image exacte, dans un miroir, d'un montage de bobines, d'aimants et de fils. Que donnent les mesures dans le montage image ?",
        options: { a: "Des forces opposées aux images des forces réelles.", b: "Des forces et des mouvements qui sont les images exactes des réels ; seules les flèches de B sont les images retournées.", c: "Des champs B qui sont les images exactes des champs réels, et des forces retournées.", d: "Rien de comparable : l'électromagnétisme distingue la droite de la gauche." },
        why: "B est un vecteur axial : défini par une règle de la main droite, il se retourne en plus d'être réfléchi. La règle sert deux fois entre un courant et la force sur un autre : les forces sont des vecteurs polaires, images exactes. L'électromagnétisme respecte la symétrie du miroir ; l'interaction faible, non. Leçon « Superposition des champs et règle de la main droite »." },
      force: { prompt: "Deux câbles parallèles de jeu de barres, à 10\u00a0cm l'un de l'autre, portent chacun 1\u00a0000\u00a0A dans le même sens. Quelle force par mètre subissent-ils ?",
        options: { a: "0,2\u00a0N·m⁻¹, attractive.", b: "20\u00a0N·m⁻¹, répulsive.", c: "2\u00a0N·m⁻¹, attractive.", d: "2\u00a0N·m⁻¹, répulsive : les champs de même sens se repoussent." },
        hint: "μ₀I²/(2πd), et des courants de même sens s'attirent.",
        why: "F/ℓ = μ₀I²/(2πd) = 2 × 10⁻⁷ × 10⁶/0,1 = 2\u00a0N·m⁻¹, le poids d'environ 200\u00a0g par mètre. Leçon « Superposition des champs et règle de la main droite »." },
      jauge: { prompt: "Pour un champ uniforme de 0,5\u00a0T selon z, on hésite entre A = (\u2212B₀y, 0, 0) et le potentiel symétrique (14.8). Au point x = 0,2\u00a0m, y = 0, que conclure ?",
        options: { a: "Seul le potentiel symétrique est juste : l'autre ne tourne pas autour de l'axe.", b: "Le premier vaut 0, le second 0,05\u00a0T·m : ils donnent des champs différents en ce point.", c: "Les deux sont faux : un champ uniforme n'a pas de potentiel vecteur.", d: "Les deux sont justes : ils valent 0 et 0,05\u00a0T·m en ce point, mais diffèrent d'un gradient et donnent le même B partout." },
        why: "Leur différence est le gradient de ψ = \u2212B₀xy/2, de rotationnel nul : même champ. La valeur de A en un point n'a pas de sens physique en magnétostatique ; seules ses dérivées, et ses circulations sur des courbes fermées, en ont. Leçon « Le potentiel vecteur »." },
      circulation: { prompt: "Un long solénoïde de 2\u00a0cm de rayon enferme un champ uniforme de 0,1\u00a0T, nul à l'extérieur. Que vaut |A| sur un cercle coaxial de 5\u00a0cm de rayon, avec le potentiel qui tourne autour de l'axe ?",
        options: { a: "4,0 × 10⁻⁴\u00a0T·m, bien que B y soit nul.", b: "Zéro, puisque B est nul sur le cercle.", c: "2,5 × 10⁻³\u00a0T·m, soit B₀r/2.", d: "1,26 × 10⁻⁴\u00a0T·m, le flux enfermé." },
        hint: "La circulation de A vaut le flux de B enfermé.",
        why: "D'après (14.11), 2πr|A| = πa²B₀ : |A| = a²B₀/(2r) = 4,0 × 10⁻⁴\u00a0T·m. B₀r/2 ne vaut qu'à l'intérieur, et 1,26 × 10⁻⁴ est le flux enfermé, en T·m², pas le potentiel. Leçons « Le potentiel vecteur » et « Potentiel vecteur d'un long solénoïde »." },
      poisson: { prompt: "Un long conducteur cylindrique porte une densité de courant uniforme j_z. À quel problème d'électrostatique le calcul de A_z se ramène-t-il ?",
        options: { a: "À celui d'un plan chargé.", b: "Au potentiel d'un long cylindre uniformément chargé, de densité ε₀μ₀j_z.", c: "Au potentiel d'une sphère chargée de même rayon.", d: "À aucun : A_z n'obéit pas à l'équation de Poisson." },
        why: "∇²A_z = \u2212μ₀j_z a la forme de ∇²φ = \u2212ρ/ε₀ avec ρ = ε₀μ₀j_z : même équation, même solution. C'est le chemin de la leçon « Potentiel vecteur d'un fil rectiligne ». Leçon « Potentiel vecteur de courants connus »." },
      composante: { prompt: "Une spire de 5\u00a0cm de rayon porte 10\u00a0A. Un étudiant somme μ₀I ds/(4πr) sur les longueurs des éléments et trouve 4,4\u00a0µT·m sur l'axe, à 5\u00a0cm du centre. Que vaut vraiment A en ce point ?",
        options: { a: "4,4\u00a0µT·m, dirigé selon l'axe.", b: "2,2\u00a0µT·m : il faut diviser par deux.", c: "Zéro : les éléments opposés donnent des contributions opposées ; sommer des longueurs revient à sommer une composante azimutale comme une composante cartésienne.", d: "Il est infini sur l'axe." },
        why: "(14.19) ne se somme que sur des axes fixes. Sur l'axe, chaque élément a un vis-à-vis opposé à la même distance : A = 0. Le champ, lui, n'est pas nul : B dépend des dérivées de A. Leçon « Potentiel vecteur de courants connus »." },
      derivee: { prompt: "Pourquoi calcule-t-on souvent A, puis B = ∇ ∧ A, plutôt que B directement ?",
        options: { a: "Parce que B ne se calcule pas à partir des courants.", b: "Parce que A est mesurable et B ne l'est pas.", c: "Parce que A est un scalaire.", d: "Parce que chaque composante de A est une intégrale en 1/r, comme un potentiel électrique, et qu'il est plus simple de dériver ensuite que d'intégrer un produit vectoriel en 1/r²." },
        why: "La loi de Biot et Savart intègre directement un produit vectoriel en 1/r² ; (14.19) intègre des nombres en 1/r. Le rotationnel s'en déduit par dérivation, un calcul local. Leçons « Le potentiel vecteur » et « Potentiel vecteur de courants connus »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

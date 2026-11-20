/* Épreuve de l'étape « Bosons et fermions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      signe: { prompt: "Deux électrons de même spin se heurtent lentement. Dans le référentiel du centre de masse, quelle est la probabilité qu'un compteur placé à 90° compte un électron, comparée au calcul qui les croit discernables ?",
        options: { a: "Nulle : à 90°, f(θ) = f(π \u2212 θ) et les deux amplitudes se retranchent.", b: "Deux fois plus grande.", c: "La même.", d: "La moitié." },
        hint: "Les électrons sont des fermions : quel signe porte l'amplitude échangée ?",
        why: "(4.2) : f(θ) \u2212 f(π \u2212 θ), nulle à 90°. Des électrons non polarisés donneraient la moitié du calcul discernable, une paire sur quatre étant dans un état de spin qui compte avec le signe +. Leçon « Les bosons et les fermions »." },
      compose: { prompt: "Un atome neutre de deutérium contient un proton, un neutron et un électron. Comment se comportent deux tels atomes qui se heurtent sans se briser ?",
        options: { a: "Comme deux bosons : le noyau, un proton et un neutron, est un boson.", b: "Comme deux fermions : chaque atome contient trois fermions, un nombre impair.", c: "Comme deux particules discernables, car ils sont composés.", d: "Comme des bosons à basse énergie et des fermions à haute énergie." },
        why: "1 + 1 + 1 = 3 fermions : échanger deux atomes change le signe trois fois, (\u22121)³ = \u22121. Le noyau seul, le deutéron, est bien un boson ; l'électron en fait un fermion. Leçon « Les bosons et les fermions »." },
      compteur: { prompt: "Deux sources lointaines, vues sous l'angle α, envoient chacune un boson vers un compteur carré dont le côté vaut la moitié de λ/α. Que vaut à peu près le rapport des coïncidences à celles de particules discernables ?",
        options: { a: "2 : le compteur est plus petit que λ/α.", b: "1 : le compteur est trop grand.", c: "1,4 environ : 1 + (sin w/w)² avec w = π/2.", d: "4, comme dans (4.6)." },
        hint: "Calculez w = π D α/λ, puis sin w / w.",
        why: "w = π/2, sin w / w = 2/π ≈ 0,64, son carré 0,41 : le rapport vaut 1,41. Il ne vaut 2 que pour un compteur bien plus petit que λ/α. Leçon « Les états à deux bosons », (4.14a)." },
      moitie: { prompt: "Dans le calcul de la probabilité que deux bosons identiques entrent dans un même compteur, on divise par 2 l'intégrale de |a₁b₂ + a₂b₁|² dS₁ dS₂ sur le compteur. Pourquoi ?",
        options: { a: "Pour compenser le facteur 4 de |a₁b₂ + a₂b₁|².", b: "Parce que l'un des deux bosons n'est pas compté.", c: "Parce que la probabilité doit être normée à 1.", d: "Parce que chaque paire d'éléments de surface est rencontrée deux fois par l'intégrale double, alors que |a₁b₂ + a₂b₁|² contient déjà les deux attributions." },
        why: "C'est un comptage : (dS₁, dS₂) et (dS₂, dS₁) désignent la même paire d'éléments. Pour des particules discernables, ce sont deux événements distincts et il ne faut pas diviser. Leçon « Les états à deux bosons », (4.13) et (4.14)." },
      quatrieme: { prompt: "Un état contient déjà trois bosons. Par combien est multipliée la probabilité qu'un quatrième boson identique y entre, par rapport à un état vide ?",
        options: { a: "Par 4.", b: "Par 3.", c: "Par 4! = 24.", d: "Par 1 : les bosons s'ignorent." },
        why: "(4.23) : le facteur vaut n + 1 = 4. Des particules discernables, elles, entrent chacune avec la même probabilité, quel que soit le nombre des autres. Leçon « Les états à n bosons »." },
      ensemble: { prompt: "Quatre bosons identiques, venus de quatre diffuseurs, entrent dans un même petit compteur. Leur probabilité d'y entrer ensemble est combien de fois celle de quatre particules discernables ?",
        options: { a: "4 fois.", b: "24 fois.", c: "16 fois.", d: "576 fois, (4!)²." },
        hint: "L'amplitude vaut 4! abcd, mais l'intégration compte chaque ensemble d'éléments 4! fois.",
        why: "(4.21) : P₄(Bose) = 4! P₄(différentes) = 24 P₄(différentes). Le carré (4!)² de l'amplitude est divisé par 4! au cours de l'intégration. Leçon « Les états à n bosons »." },
      radio: { prompt: "Rayonnement thermique à 300\u00a0K et onde radio de 100\u00a0MHz : un état contient en moyenne quelque 6 × 10⁴ photons. Quelle émission domine dans cet état ?",
        options: { a: "L'émission spontanée, comme dans le Soleil.", b: "Aucune : un état aussi peuplé n'émet plus.", c: "L'émission induite, environ 6 × 10⁴ fois plus forte que l'émission spontanée.", d: "Les deux sont égales, par l'équilibre." },
        why: "Le rapport de l'émission induite à l'émission spontanée vaut le nombre de photons de l'état, n. À 100\u00a0MHz, ħω est 1,6 × 10⁻⁵ fois k_B T : n̄ ≈ k_B T/ħω ≈ 6 × 10⁴. Leçon « Émission et absorption de photons »." },
      bilan: { prompt: "Un état de photons en contient 1\u00a0000. On y place un atome excité et un atome dans l'état fondamental, couplés de la même façon à cet état. Que vaut le rapport de la probabilité d'émission du premier à la probabilité d'absorption du second ?",
        options: { a: "1\u00a0000.", b: "1, exactement.", c: "0,001.", d: "1,001 : (n + 1)/n, l'émission spontanée en plus." },
        why: "(4.28) et (4.29) : (n + 1)|a|² contre n|a|². Avec beaucoup de photons, émission induite et absorption se compensent presque ; seule l'émission spontanée, |a|², fait la différence. Leçon « Émission et absorption de photons »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

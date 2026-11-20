/* Épreuve de l'étape « Observer et mesurer un électron » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lampe: { prompt: "Deux trous distants de 1\u00a0µm, des électrons éclairés par une lampe qui diffuse en moyenne un photon par électron. Avec quelle lumière les franges reviennent-elles presque entièrement ?",
        options: { a: "Avec λ = 10\u00a0µm : chaque photon ne garde presque rien du trou, γ ≈ 0,94.", b: "Avec λ = 100\u00a0nm : les photons sont plus doux.", c: "Avec λ = 2\u00a0µm : γ y est le plus grand.", d: "Avec aucune : tout photon diffusé efface les franges." },
        hint: "Le recouvrement des deux états du photon vaut γ = sin(kd)/(kd), k = 2π/λ.",
        why: "À λ = 10 d, kd = 0,63 et γ ≈ 0,94 : le contraste vaut e^(\u2212n̄(1 \u2212 γ)) ≈ 0,94. À λ = 2 d, γ = 0 ; à λ = d/10, γ ≈ 0 et le coup du photon peut atteindre dix interfranges. Leçon « Observer les électrons »." },
      photons: { prompt: "Une lumière bleue, de longueur d'onde bien plus petite que l'écart des trous, diffuse en moyenne 2 photons par électron, au hasard. Quel contraste reste-t-il aux franges, tous électrons confondus ?",
        options: { a: "0 : la lampe est allumée.", b: "Environ 14 % : seuls les électrons qu'aucun photon n'a touchés interfèrent, une part e⁻² des électrons.", c: "50 % : un électron sur deux est vu.", d: "100 % : deux photons ne suffisent pas à déranger un électron." },
        why: "Le nombre de photons suit une loi de Poisson : la part des électrons non vus est e^(\u2212n̄) = e⁻² ≈ 0,14. Les électrons vus se distribuent selon P₁ + P₂ ; les autres font des franges. Leçon « Observer les électrons »." },
      fleches: { prompt: "En un point de l'écran, les amplitudes des deux trous valent φ₁ = 0,5 et φ₂ = \u22120,3. Que valent la probabilité P avec les deux trous ouverts, et P₁ + P₂ ?",
        options: { a: "P = 0,64 et P₁ + P₂ = 0,34.", b: "P = 0,2 et P₁ + P₂ = 0,2.", c: "P = 0,04 et P₁ + P₂ = 0,34 : ouvrir le second trou retire des électrons ici.", d: "P = 0,34 dans les deux cas." },
        hint: "On additionne les amplitudes, puis on prend le carré du module.",
        why: "(37.7) : P = |0,5 \u2212 0,3|² = 0,04 ; P₁ + P₂ = 0,25 + 0,09 = 0,34. Une théorie où chaque électron choisit son trou d'avance donnerait P ≥ P₁ = 0,25. Leçon « Premiers principes de la mécanique quantique »." },
      enregistre: { prompt: "Un appareil enregistre à coup sûr le trou traversé par chaque électron, sur un disque que personne ne lit. Quelle règle donne la probabilité d'arrivée ?",
        options: { a: "Les amplitudes s'additionnent : personne ne connaît le chemin.", b: "Aucune : on ne peut plus rien prédire.", c: "Une moyenne des deux règles, à poids égaux.", d: "Les probabilités s'additionnent : l'expérience est capable de déterminer le chemin." },
        why: "C'est (37.8), et non (37.7) : la règle porte sur ce que l'appareil peut déterminer, pas sur ce que quelqu'un sait. Les deux états du disque, selon le trou, ont un recouvrement nul : le terme d'interférence disparaît. Leçon « Premiers principes de la mécanique quantique »." },
      atome: { prompt: "Un électron est confiné dans une région d'écart type 0,1\u00a0nm, la taille d'un atome. Quelle est, au minimum, l'incertitude sur sa vitesse (écart type) ?",
        options: { a: "Environ 6 × 10⁵\u00a0m·s⁻¹ : ħ/(2 mₑ Δx).", b: "Environ 6\u00a0m·s⁻¹.", c: "Environ 3 × 10⁸\u00a0m·s⁻¹, la vitesse de la lumière.", d: "Aucune : un électron immobile peut être placé où l'on veut." },
        hint: "Δp ≥ ħ/(2Δx), puis Δv = Δp/mₑ, mₑ ≈ 9,11 × 10⁻³¹ kg.",
        why: "Δp ≥ 1,055 × 10⁻³⁴/(2 × 10⁻¹⁰) ≈ 5,3 × 10⁻²⁵ kg·m·s⁻¹, Δv ≥ 5,8 × 10⁵ m·s⁻¹, environ 0,2 % de c. C'est l'ordre de grandeur des vitesses des électrons dans les atomes. Leçon « Le principe d'incertitude de Heisenberg »." },
      compromis: { prompt: "Une plaque sur rouleaux, d'incertitude minimale, laisse aux franges un contraste V = 0,6. Que peut-elle dire, au mieux, du trou traversé ?",
        options: { a: "Rien : D = 0, puisque des franges restent.", b: "D = 0,8 : la meilleure mesure sur la plaque trouve le bon trou 9 fois sur 10.", c: "D = 0,4 : D + V = 1.", d: "Tout : D = 1, puisque la plaque recule." },
        why: "Pour deux états purs, D² + V² = 1 : D = √(1 \u2212 0,36) = 0,8, et la meilleure mesure trouve le bon trou avec la probabilité (1 + D)/2 = 0,9. Leçon « Le principe d'incertitude de Heisenberg »." },
      etalement: { prompt: "Deux paquets d'électrons libres partent avec des largeurs σ et 3σ. Combien de fois plus de temps met le second pour voir sa largeur multipliée par √2 ?",
        options: { a: "3 fois.", b: "Autant : l'étalement ne dépend que de la masse.", c: "9 fois : ce temps vaut 2mσ²/ħ.", d: "1/3 de fois : un paquet large s'étale plus vite." },
        hint: "σₓ(t) = σ √(1 + (ħt/(2mσ²))²).",
        why: "σₓ = σ√2 quand ħt/(2mσ²) = 1, soit t = 2mσ²/ħ, proportionnel à σ². Le paquet large a une quantité de mouvement 3 fois mieux définie, et ses composantes se séparent moins vite. Leçon « Les ondes d'amplitude de probabilité »." },
      masse: { prompt: "On décrit un électron de 50\u00a0keV (v = 0,41\u00a0c) en comptant, ou non, son énergie de masse dans E = ħω. Qu'est-ce qui change ?",
        options: { a: "La vitesse de son paquet, de 0,41\u00a0c à 2,4\u00a0c.", b: "La probabilité de le trouver en chaque point.", c: "Sa longueur d'onde h/p.", d: "Seulement la vitesse des crêtes, 2,4\u00a0c ou 0,22\u00a0c, qui ne s'observe pas ; le paquet va à 0,41\u00a0c dans les deux cas." },
        why: "Changer le zéro des énergies ajoute une constante à ω : la vitesse de phase ω/k change, la vitesse de groupe dω/dk = v et |φ|² non. Leçons « Les ondes d'amplitude de probabilité » et « Amplitudes de probabilité des particules »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

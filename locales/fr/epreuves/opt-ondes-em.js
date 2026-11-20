/* Épreuve de l'étape « Ondes électromagnétiques sinusoïdales » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      retard: { prompt: "Un éclair de foudre éclate à 30\u00a0km d'un récepteur radio. Quand le récepteur reçoit-il le champ rayonné par le début de l'éclair ?",
        options: { a: "100\u00a0µs après le début de l'éclair : le temps r/c.", b: "Au même instant : le champ suit la charge.", c: "1\u00a0ms après : la lumière parcourt 30\u00a0km par milliseconde.", d: "10\u00a0ms après." },
        hint: "La lumière parcourt 300\u00a0m par microseconde.",
        why: "Le champ en r porte l'accélération des charges à l'instant t \u2212 r/c ; 3\u00a0×\u00a010⁴\u00a0m divisés par 3\u00a0×\u00a010⁸\u00a0m·s⁻¹ font 10⁻⁴\u00a0s." },
      photo: { prompt: "Une charge, au repos jusqu'à t\u00a0=\u00a00, oscille ensuite à 100\u00a0MHz. On photographie le champ à t\u00a0=\u00a050\u00a0ns, perpendiculairement à son mouvement. Que voit-on ?",
        options: { a: "Une sinusoïde qui remplit tout l'espace.", b: "Une sinusoïde de longueur d'onde 3\u00a0m jusqu'à 15\u00a0m de la charge, et rien au-delà.", c: "Une sinusoïde de longueur d'onde 15\u00a0m.", d: "Un champ nul partout tant que la charge oscille." },
        hint: "Où est le front 50\u00a0ns après le départ ?",
        why: "Le front est à ct = 15\u00a0m ; au-delà, l'instant retardé est négatif et la charge y était au repos. En deçà, la photo est l'histoire de l'oscillation, de période 10\u00a0ns, soit λ = 3\u00a0m." },
      angle: { prompt: "Une antenne verticale courte rayonne. Comparé à un récepteur à l'horizontale, que reçoit un récepteur à la même distance mais vu sous 30° de la verticale ?",
        options: { a: "Le même champ.", b: "Un champ deux fois plus fort.", c: "Un champ deux fois plus faible, et une intensité quatre fois plus faible.", d: "Rien du tout." },
        why: "Le champ rayonné va en sin\u00a0θ, avec θ mesuré depuis l'axe du mouvement : sin\u00a030° = 1/2. L'intensité, en E², est divisée par 4." },
      carre: { prompt: "Un oscillateur linéaire, petit et loin de la source, est soumis à une onde. On double l'amplitude du champ. Que devient l'énergie qu'il reçoit ?",
        options: { a: "Elle double.", b: "Elle ne change pas : seule la fréquence compte.", c: "Elle est multipliée par 8.", d: "Elle quadruple : déplacement, vitesse et accélération doublent, l'énergie va en carré." },
        why: "Dans un système linéaire, la réponse est proportionnelle au champ ; l'énergie cinétique, en v², l'est au carré du champ." },
      cone: { prompt: "Un émetteur rayonne en espace libre. À 1\u00a0km, on mesure 4\u00a0mW·m⁻². Que mesure-t-on à 4\u00a0km, dans la même direction ?",
        options: { a: "0,25\u00a0mW·m⁻² : l'intensité décroît en 1/r².", b: "1\u00a0mW·m⁻² : elle décroît en 1/r.", c: "4\u00a0mW·m⁻² : la puissance se conserve.", d: "0,0625\u00a0mW·m⁻² : elle décroît en 1/r⁴." },
        why: "La puissance dans un cône est la même à toute distance ; l'aire découpée croît en r², donc l'intensité décroît en 1/r² : 4/16 = 0,25." },
      intensite: { prompt: "Une onde sinusoïdale a, dans le vide, un champ électrique d'amplitude 30\u00a0V·m⁻¹. Quelle est son intensité ?",
        options: { a: "2,4\u00a0W·m⁻².", b: "1,2\u00a0W·m⁻².", c: "0,04\u00a0W·m⁻².", d: "1,2\u00a0kW·m⁻²." },
        hint: "I = ε₀ c E₀²/2, et ε₀ c ≈ 2,65\u00a0×\u00a010⁻³\u00a0S.",
        why: "2,65\u00a0×\u00a010⁻³ × 900/2 ≈ 1,19\u00a0W·m⁻². Oublier le facteur 1/2, la moyenne de cos², donne 2,4." },
      onde: { prompt: "Un radar émet à 10\u00a0GHz. Que valent sa longueur d'onde et son nombre d'onde dans le vide ?",
        options: { a: "λ = 30\u00a0m, k ≈ 0,21\u00a0rad·m⁻¹.", b: "λ = 3\u00a0cm, k = 3\u00a0×\u00a010¹⁰\u00a0rad·m⁻¹.", c: "λ = 3\u00a0cm, k ≈ 209\u00a0rad·m⁻¹.", d: "λ = 3\u00a0mm, k ≈ 2\u202f094\u00a0rad·m⁻¹." },
        why: "λ = c/ν = 3\u00a0×\u00a010⁸/10¹⁰ = 0,03\u00a0m ; k = 2π/λ ≈ 209\u00a0rad·m⁻¹, soit aussi ω/c." },
      zone: { prompt: "On veut mesurer le diagramme de rayonnement d'une petite antenne à 1\u00a0GHz en utilisant (29.1), à mieux que 1\u00a0% près. À quelle distance minimale faut-il se placer ?",
        options: { a: "À 1\u00a0cm : il suffit de sortir de l'antenne.", b: "À 30\u00a0cm, une longueur d'onde.", c: "À 5\u00a0cm, λ/(2π).", d: "À environ 5\u00a0m : il faut λ/(2πr) < 0,01." },
        hint: "λ = 30\u00a0cm ; loin, les termes négligés valent environ λ/(2πr).",
        why: "λ/(2πr) < 0,01 impose r > 100λ/(2π) ≈ 16λ ≈ 4,8\u00a0m. À une longueur d'onde, les termes proches pèsent encore 16\u00a0%." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

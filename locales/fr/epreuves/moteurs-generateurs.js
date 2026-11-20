/* Épreuve de l'étape « Moteurs, générateurs et transformateurs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      spire: { prompt: "Une bobine de 150 spires de 8\u00a0cm × 10\u00a0cm tourne à 25 tours par seconde autour d'un axe perpendiculaire à un champ uniforme de 50\u00a0mT. Quelle est l'amplitude de la force électromotrice recueillie par deux bagues ?",
        options: { a: "Environ 9,4\u00a0V.", b: "1,5\u00a0V.", c: "Environ 6,7\u00a0V.", d: "Zéro : le flux moyen est nul." },
        hint: "ℰ = N B S ω sin ωt, avec ω = 2πf.",
        why: "N B S ω = 150 × 0,05 × 0,008 × 2π × 25 ≈ 9,4\u00a0V. Oublier le 2π donne 1,5\u00a0V ; 6,7\u00a0V est la valeur efficace, 9,4/√2. Le flux moyen est nul, mais sa dérivée ne l'est pas. Leçon « Moteurs et générateurs »." },
      moteur: { prompt: "Un moteur à courant continu a k = 0,1\u00a0N·m·A⁻¹ et une résistance d'induit de 1\u00a0Ω ; il est alimenté sous 24\u00a0V et entraîne une charge de couple 0,5\u00a0N·m. Quels sont son courant et sa vitesse en régime établi ?",
        options: { a: "24\u00a0A et 0\u00a0rad·s⁻¹.", b: "5\u00a0A et 190\u00a0rad·s⁻¹.", c: "5\u00a0A et 240\u00a0rad·s⁻¹.", d: "0,05\u00a0A et 190\u00a0rad·s⁻¹." },
        hint: "Le couple fixe le courant ; la tension fixe alors la force contre-électromotrice.",
        why: "C = kI donne I = 0,5/0,1 = 5\u00a0A. U = kω + RI donne ω = (24 \u2212 5)/0,1 = 190\u00a0rad·s⁻¹. 240\u00a0rad·s⁻¹ est la vitesse à vide, 24\u00a0A le courant moteur bloqué. Le même k sert dans les deux relations : c'est la conservation de l'énergie. Leçon « Moteurs et générateurs »." },
      transfo: { prompt: "Un transformateur idéal abaisse 230\u00a0V à 12\u00a0V. Son primaire a 1\u202f150 spires et son secondaire débite 2\u00a0A. Combien de spires au secondaire, et quel courant au primaire ?",
        options: { a: "60 spires et 2\u00a0A.", b: "22\u202f000 spires et 0,1\u00a0A.", c: "60 spires et environ 0,1\u00a0A.", d: "60 spires et 38\u00a0A." },
        why: "N₂ = 1\u202f150 × 12/230 = 60. La puissance se conserve : i₁ = 2 × 12/230 ≈ 0,104\u00a0A, soit i₂ N₂/N₁. Multiplier au lieu de diviser donnerait 38\u00a0A. Le courant magnétisant, négligé ici, s'ajoute à vide. Leçon « Transformateurs et inductances »." },
      coupure: { prompt: "Une bobine de relais (0,5\u00a0H, 50\u00a0Ω) porte 0,2\u00a0A. Un transistor coupe brutalement son courant ; une résistance de 1\u00a0kΩ est placée en parallèle sur la bobine. Que voit-on juste après la coupure ?",
        options: { a: "Rien : le courant s'annule instantanément.", b: "Une tension de 10\u00a0V, celle de l'alimentation.", c: "Une tension de 200\u00a0V, et un courant qui s'éteint en 10\u00a0ms.", d: "Une tension d'environ 200\u00a0V aux bornes de la résistance, et un courant qui s'éteint avec τ ≈ 0,5\u00a0ms." },
        hint: "Le courant de la bobine ne peut pas changer brutalement : il passe dans la résistance.",
        why: "Le courant continue dans la boucle bobine + résistance : u = Rₚ I₀ = 1\u202f000 × 0,2 = 200\u00a0V, puis décroît avec τ = L/(R + Rₚ) = 0,5/1\u202f050 ≈ 0,48\u00a0ms. 10\u00a0ms serait L/R, la bobine seule en court-circuit. Leçon « Transformateurs et inductances »." },
      anneau: { prompt: "Pourquoi un anneau d'aluminium posé sur une bobine alimentée en alternatif est-il repoussé en moyenne, alors que la force change de sens au cours de chaque période ?",
        options: { a: "Parce que son inductance retarde son courant de plus d'un quart de période sur celui de la bobine : la part en opposition de phase repousse en moyenne.", b: "Parce que l'aluminium est diamagnétique.", c: "Parce que la bobine attire l'anneau pendant une demi-période et le repousse pendant l'autre, à force égale.", d: "Parce que l'anneau s'échauffe et se dilate." },
        why: "Une pure résistance donnerait un courant en quadrature, de force moyenne nulle. Le retard φ, tan φ = Lω/R, ajoute une part en opposition de phase, toujours répulsive. Fendu, l'anneau ne porte aucun courant et ne bouge pas. Leçon « Forces sur les courants induits »." },
      glissement: { prompt: "Un moteur asynchrone est alimenté par un réseau à 50\u00a0Hz qui crée un champ tournant à 50 tours par seconde. Un moteur thermique l'entraîne à 51 tours par seconde. Que se passe-t-il ?",
        options: { a: "Rien : au-delà du synchronisme, aucun courant n'est induit dans le rotor.", b: "La machine oppose un couple résistant et renvoie de l'énergie au réseau : elle fonctionne en générateur.", c: "Le moteur accélère encore, entraîné par le champ.", d: "Le champ se met à tourner à 51 tours par seconde." },
        why: "Le glissement ωg = ω \u2212 Ω est négatif : le courant induit change de signe, le couple aussi. Le rotor, plus rapide que le champ, est freiné, et la puissance mécanique repart vers le réseau. Au synchronisme exact, le couple est nul. Leçon « Forces sur les courants induits »." },
      ligne: { prompt: "Une ligne triphasée dont chaque conducteur a 5\u00a0Ω de résistance doit livrer 100\u00a0MW. Quelle part de la puissance perd-elle sous 20\u00a0kV, puis sous 200\u00a0kV ?",
        options: { a: "1,25\u00a0% dans les deux cas.", b: "125\u00a0% puis 12,5\u00a0%.", c: "R P/U² vaut 1,25 sous 20\u00a0kV, impossible, puis 1,25\u00a0% sous 200\u00a0kV.", d: "12,5\u00a0% puis 1,25\u00a0%." },
        hint: "Les pertes relatives valent R P/U².",
        why: "5 × 10⁸/(2 × 10⁴)² = 1,25 : la ligne perdrait plus que ce qu'elle livre, le modèle n'a plus de sens. Sous 200\u00a0kV, le rapport est divisé par 100 : 1,25\u00a0%. C'est pourquoi on transporte sous haute tension, ce que seul le transformateur permet. Leçon « Technologie électrique »." },
      toles: { prompt: "On remplace les tôles de 0,5\u00a0mm d'un noyau de transformateur par des tôles de 0,25\u00a0mm du même acier. Que deviennent les pertes par courants de Foucault, à même champ ?",
        options: { a: "Elles doublent, faute de fer.", b: "Elles ne changent pas.", c: "Elles sont divisées par deux.", d: "Elles sont divisées par quatre." },
        why: "Les pertes par unité de volume valent π²f²B₀²e²/(6ρ) : l'épaisseur entre au carré. Diviser e par deux les divise par quatre, tant que la tôle reste mince devant l'épaisseur de peau. Les pertes par hystérésis, elles, ne changent pas. Leçon « Technologie électrique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

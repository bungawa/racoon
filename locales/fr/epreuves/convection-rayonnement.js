/* Épreuve de l'étape « Convection et rayonnement » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {

      newton: { prompt: "Une paroi à 320 K échange avec de l'air à 295 K, avec un coefficient h = 12 W·m⁻²·K⁻¹. Quelle puissance cède 0,50 m² de paroi, et que représente h ?",
        options: { a: "300 W ; h est la conductivité de l'air.", b: "6 W ; h est la conductivité de la paroi.", c: "150 W ; h est une propriété de l'air, indépendante de sa vitesse.", d: "150 W ; h résume la couche limite : il dépend de l'écoulement et de la géométrie, pas seulement du fluide." },
        hint: "Loi de Newton : φ = h(T_p \u2212 T_f), par unité d'aire.",
        why: "12 × 25 × 0,50 = 150 W. Le coefficient h vaut à peu près la conductivité du fluide divisée par l'épaisseur de la couche limite thermique ; souffler l'amincit et augmente h. Leçon « Convection, loi de Newton et ailette »." },
      biot: { prompt: "Une bille de verre (λ = 0,9 W·m⁻¹·K⁻¹) de 3 cm de rayon est plongée dans une eau agitée (h = 1 000 W·m⁻²·K⁻¹). Son nombre de Biot, calculé sur V/S = 1 cm, vaut 11. Comment se refroidit-elle ?",
        options: { a: "En bloc : sa température reste uniforme et décroît exponentiellement.", b: "Par la surface d'abord : celle-ci prend vite la température de l'eau, et le cœur suit avec le temps de diffusion L²/D.", c: "Elle ne se refroidit pas : le verre est isolant.", d: "Instantanément." },
        why: "Bi = hL/λ compare la résistance interne à la résistance de surface. Grand devant 1, il dit que la conduction dans le verre limite tout. Le modèle à température uniforme demande Bi < 0,1." },
      ailette: { prompt: "Une tige de cuivre (λ = 401 W·m⁻¹·K⁻¹) de 2 mm de rayon est dans un air où h = 10 W·m⁻²·K⁻¹. Sur quelle longueur 1/m = √(λr/(2h)) sa température décroît-elle ?",
        options: { a: "20 cm.", b: "2 mm.", c: "2 cm.", d: "2 m." },
        hint: "λr/(2h) = 401 × 0,002/20.",
        why: "√(0,0401) = 0,20 m. Cette longueur compare la conduction le long de la tige à la fuite par sa surface latérale ; elle croît avec λ et avec le rayon." },
      longue: { prompt: "Le flux évacué par une ailette est proportionnel à tanh(mL). Une ailette a mL = 3. On double sa longueur. Que gagne-t-on ?",
        options: { a: "Le double de flux.", b: "40 % de flux en plus.", c: "Moins de 1 % : tanh(3) = 0,995, le bout de l'ailette est déjà à la température de l'air.", d: "Rien, et le flux diminue." },
        why: "tanh(6) = 1,000 contre tanh(3) = 0,995. Le métal ajouté, à la température de l'air, n'échange rien. Une ailette utile ne dépasse pas deux ou trois fois 1/m." },
      wien: { prompt: "La surface du Soleil est à 5 772 K ; son spectre par unité de longueur d'onde culmine à 502 nm. À quelle longueur d'onde culmine celui d'un sol à 288 K ?",
        options: { a: "25 nm.", b: "10 µm, dans l'infrarouge : λ_max T est constant.", c: "502 nm : le maximum ne dépend pas de la température.", d: "1 mm." },
        why: "λ_max = 2,898 × 10⁻³/288 = 1,0 × 10⁻⁵ m. Vingt fois plus froid, vingt fois plus long. C'est cette séparation des deux spectres qui permet l'effet de serre. Leçon « Corps noir et lois de Planck, de Wien et de Stefan »." },
      stefan: { prompt: "Un corps noir à 300 K émet 459 W·m⁻². Combien émet-il à 900 K ?",
        options: { a: "1,4 kW·m⁻².", b: "4,1 kW·m⁻².", c: "12 kW·m⁻².", d: "37 kW·m⁻² : 3⁴ = 81 fois plus." },
        hint: "M = σT⁴.",
        why: "459 × 81 = 37 200 W·m⁻². La puissance quatrième fait du rayonnement le mode d'échange dominant à haute température." },
      equilibre: { prompt: "Mars reçoit du Soleil un éclairement de 586 W·m⁻² et son albédo est 0,25. Quelle est sa température d'équilibre radiatif, T_e = [S₀(1 \u2212 A)/(4σ)]^(1/4) ?",
        options: { a: "210 K.", b: "297 K.", c: "255 K.", d: "148 K." },
        hint: "Flux absorbé moyen : 586 × 0,75/4 = 110 W·m⁻².",
        why: "(110/5,67 × 10⁻⁸)^(1/4) = (1,94 × 10⁹)^(1/4) = 210 K. On mesure 214 K au sol : l'atmosphère de Mars, ténue, retient peu. 297 K oublie le facteur 4, rapport de la sphère qui émet au disque qui reçoit. Leçon « Bilans radiatifs et effet de serre »." },
      serre: { prompt: "Sans atmosphère, le bilan radiatif donne 255 K pour la Terre. Avec une couche d'atmosphère transparente au Soleil et opaque à l'infrarouge, quelle température de sol le modèle donne-t-il, et pourquoi dépasse-t-il les 288 K mesurés ?",
        options: { a: "255 K : une couche ne change rien.", b: "510 K : le sol reçoit deux fois plus.", c: "303 K, soit 2^(1/4) × 255 : le sol reçoit autant de la couche que du Soleil ; le modèle ignore la convection et l'évaporation, qui refroidissent le sol réel, et suppose l'absorption totale.", d: "288 K exactement." },
        why: "σT_s⁴ = 2σT_e⁴ donne T_s = 1,189 × 255 = 303 K. Doubler le flux ne double pas la température : elle varie comme sa racine quatrième. Une couche qui n'absorbe que 77 % de l'infrarouge donne 288 K." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

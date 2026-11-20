/* Épreuve de l'étape « Gravitation et horloges » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      droit: { prompt: "Deux bornes A et B, fixes dans un référentiel galiléen, sont à une distance que la lumière parcourt en 30\u00a0s. Un voyageur part de A et doit arriver en B 100\u00a0s plus tard selon les horloges des bornes. Quel est le plus grand temps que puisse marquer sa montre ?",
        options: { a: "95,4\u00a0s, en allant tout droit à vitesse constante, 0,3\u00a0c.", b: "100\u00a0s, en partant au dernier moment.", c: "70\u00a0s, la durée moins la distance en secondes de lumière.", d: "91\u00a0s, soit 100 × (1 \u2212 0,3²)." },
        hint: "Le trajet droit et uniforme marque √(T² \u2212 D²/c²).",
        why: "τ ≤ √(T² \u2212 D²/c²) = √(100² \u2212 30²) ≈ 95,4\u00a0s, avec égalité pour le seul mouvement rectiligne uniforme. Partir tard oblige à aller plus vite ensuite, et la perte croît comme le carré de la vitesse. Leçon « Géométrie dans l'espace-temps »." },
      detour: { prompt: "À petite vitesse, un voyageur couvre la distance D en restant immobile pendant la première moitié de la durée T, puis à la vitesse 2D/T. Combien perd-il sur les horloges fixes, comparé à celui qui va à D/T tout du long ?",
        options: { a: "Autant : la vitesse moyenne est la même.", b: "Deux fois plus : la perte vaut ∫v² dt/2c², et (2v)² pendant T/2 donne 2v²T contre v²T.", c: "Quatre fois plus, puisque la vitesse est doublée.", d: "Moitié moins, puisqu'il est immobile la moitié du temps." },
        hint: "La perte aux petites vitesses vaut ∫v² dt/2c².",
        why: "Uniforme : v²T/2c². Deux étapes : (2v)²(T/2)/2c² = v²T/c², le double. L'excès de vitesse sur une moitié coûte plus que l'immobilité de l'autre ne rapporte. Leçon « Géométrie dans l'espace-temps »." },
      cabine: { prompt: "Un pendule simple de 1\u00a0m oscille dans une cabine fermée. Dans quel cas sa période diffère-t-elle de celle qu'il a dans la cabine posée au sol ?",
        options: { a: "Quand la cabine est une fusée poussée à 9,81\u00a0m·s⁻² loin de toute masse.", b: "Quand la cabine est posée au sommet d'une tour de 10\u00a0m : la pesanteur y est nettement plus faible.", c: "Quand la cabine est en chute libre : la pesanteur apparente g \u2212 a_c y est nulle, et le pendule n'oscille plus.", d: "Jamais : la période d'un pendule ne dépend que de sa longueur." },
        hint: "Dans la cabine, tout se passe comme dans un champ g \u2212 a_c.",
        why: "La période vaut 2π√(L/g_app) avec g_app = g \u2212 a_c. Au sol ou dans la fusée à 9,81\u00a0m·s⁻², g_app est la même : aucune mesure intérieure ne les distingue. En chute libre, g_app = 0. À 10\u00a0m de hauteur, g ne baisse que de 3 × 10⁻⁶. Leçon « Gravitation et principe d’équivalence »." },
      maree: { prompt: "Une cabine haute de 100\u00a0m tombe en chute libre près du sol. Quelle accélération prend, par rapport à la cabine, un objet lâché au plafond, 50\u00a0m au-dessus de son centre ?",
        options: { a: "Aucune : en chute libre, tout flotte exactement.", b: "9,81\u00a0m·s⁻² vers le plancher.", c: "1,5 × 10⁻⁴\u00a0m·s⁻², vers le centre de la cabine.", d: "Environ 1,5 × 10⁻⁴\u00a0m·s⁻², vers le haut : le champ, plus faible au plafond, le retient un peu moins que le centre de la cabine." },
        hint: "L'accélération de marée verticale vaut 2GMd/r³, soit 2d/r fois le champ.",
        why: "2GMd/r³ = 2 × 3,99 × 10¹⁴ × 50/(6,37 × 10⁶)³ ≈ 1,5 × 10⁻⁴\u00a0m·s⁻², vers le haut, en s'éloignant du centre. C'est 1,6 × 10⁻⁵ fois g : l'équivalence avec l'espace vide n'est exacte qu'en un point. Leçon « Gravitation et principe d’équivalence »." },
      etagere: { prompt: "Deux horloges optiques identiques sont posées, l'une au sol, l'autre sur une étagère 3\u00a0m plus haut. De combien s'écartent-elles en un an ?",
        options: { a: "D'environ 10\u00a0ns : celle du haut avance de gH/c² ≈ 3,3 × 10⁻¹⁶.", b: "D'environ 10\u00a0ns, mais c'est celle du haut qui retarde.", c: "D'environ 10\u00a0µs : celle du haut avance.", d: "De rien : elles sont immobiles l'une par rapport à l'autre." },
        hint: "gH/c² vaut 1,1 × 10⁻¹⁶ par mètre ; un an dure 3,16 × 10⁷\u00a0s.",
        why: "gH/c² = 9,81 × 3/c² ≈ 3,3 × 10⁻¹⁶ ; × 3,16 × 10⁷\u00a0s ≈ 1,0 × 10⁻⁸\u00a0s. L'horloge du haut avance : (42.6). Leçon « La marche des horloges dans un champ de gravitation »." },
      pound: { prompt: "Des photons gamma descendent de 22,5\u00a0m, du haut d'une tour vers un absorbeur placé au pied. Que mesure-t-on en bas ?",
        options: { a: "Une fréquence plus basse, car le photon perd de l'énergie en tombant.", b: "Une fréquence plus haute de gH/c² ≈ 2,5 × 10⁻¹⁵ : le photon gagne de l'énergie en tombant, comme une pierre.", c: "La même fréquence : un photon n'a pas de masse au repos.", d: "Une fréquence plus haute de 2,5 × 10⁻⁹." },
        hint: "Un photon de pulsation ω a la masse ℏω/c².",
        why: "En tombant de H, le photon gagne (ℏω/c²)gH : ω augmente d'une fraction gH/c² = 9,81 × 22,5/c² ≈ 2,5 × 10⁻¹⁵. C'est (42.5), retrouvée aussi par l'effet Doppler dans une fusée et par la conservation de l'énergie : (42.12). Leçon « La marche des horloges dans un champ de gravitation »." },
      gps: { prompt: "Les horloges des satellites GPS avancent de 38,6\u00a0µs par jour sur celles du sol. Sans correction, de combien l'erreur de distance sur chaque satellite grandirait-elle chaque jour ?",
        options: { a: "D'environ 1\u00a0m.", b: "D'environ 39\u00a0m.", c: "D'environ 11,6\u00a0km : la lumière parcourt c × 38,6\u00a0µs.", d: "De rien : toutes les horloges des satellites avancent de la même façon." },
        hint: "Le récepteur convertit un temps de trajet en distance par la vitesse de la lumière.",
        why: "c × 38,6 × 10⁻⁶\u00a0s ≈ 1,16 × 10⁴\u00a0m. Ce bilan est +45,8\u00a0µs par l'altitude, (42.5u), et \u22127,2\u00a0µs par la vitesse, (42.5v). D'où l'oscillateur réglé au sol à 10,229\u202f999\u202f995\u202f43\u00a0MHz. Leçon « La marche des horloges dans un champ de gravitation »." },
      orbite: { prompt: "Une horloge est placée sur une orbite circulaire à 1\u00a0000\u00a0km d'altitude. Comparée à une horloge du sol, que fait-elle ?",
        options: { a: "Elle avance, comme celles du GPS, puisqu'elle est plus haute.", b: "Elle avance de 45,8\u00a0µs par jour, comme celles du GPS.", c: "Elle marche au même rythme : les deux effets se compensent à toute altitude.", d: "Elle retarde d'environ 18\u00a0µs par jour : à cette altitude, le terme de vitesse, \u221226\u00a0µs, l'emporte sur celui d'altitude, +8\u00a0µs." },
        hint: "Les deux effets se compensent vers 3\u00a0200\u00a0km d'altitude.",
        why: "Sur une orbite circulaire, v² = GM/r. À 1\u00a0000\u00a0km, ΔΦ/c² ≈ 9,6 × 10⁻¹¹ et v²/2c² ≈ 3,0 × 10⁻¹⁰ : bilan \u22122,0 × 10⁻¹⁰, \u221217,7\u00a0µs par jour. Plus bas que 3\u00a0200\u00a0km environ, une horloge en orbite retarde. Leçon « La marche des horloges dans un champ de gravitation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

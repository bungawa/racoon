/* Épreuve de l'étape « Transformation de Lorentz » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      wagon: { prompt: "Dans un train qui roule à 50 m·s⁻¹ en ligne droite, sans à-coups, Moe lâche une bille. Joe, sur le quai, filme la chute. Que mesurent-ils ?",
        options: { a: "La même accélération, g vers le bas, mais pas la même trajectoire : une verticale pour Moe, une parabole pour Joe.", b: "La même trajectoire verticale, puisque la bille tombe à la verticale.", c: "Des accélérations différentes : Joe mesure en plus 50 m·s⁻² vers l'avant.", d: "Pour Joe, la bille tombe en arrière du point de lâcher, car le train avance sous elle." },
        hint: "Dérivez deux fois x′ = x \u2212 ut avec u constante.",
        why: "Par (15.2), les vitesses diffèrent de u = 50 m·s⁻¹ et les accélérations sont égales. Joe voit la bille avancer avec le train : une parabole qui part et arrive à l'aplomb de la main de Moe. L'écart à Galilée est de l'ordre de (u/c)² ≈ 3 × 10⁻¹⁴. Leçon « Le principe de relativité »." },
      simultaneite: { prompt: "Deux éclairs sont simultanés pour Joe, à 3\u202f000\u00a0km l'un de l'autre selon x. Moe passe à 30 km·s⁻¹ selon x. Pour Moe, quel écart sépare leurs dates ?",
        options: { a: "Aucun : à 30 km·s⁻¹, la transformation de Galilée suffit.", b: "Environ 1 µs, le terme ux/c² de la transformation de Lorentz.", c: "Environ 10 ms, le temps que met la lumière à parcourir 3\u202f000\u00a0km.", d: "Environ 10⁻¹⁴ s, un effet du second ordre en u/c." },
        hint: "t′ = (t \u2212 ux/c²)/√(1 \u2212 u²/c²), avec t = 0 pour les deux éclairs.",
        why: "uL/c² = 3 × 10⁴ × 3 × 10⁶/(9 × 10¹⁶) ≈ 1,0 µs. C'est un effet du premier ordre en u/c, multiplié par L/c : une horloge atomique le voit. « u ≪ c » ne suffit pas pour appliquer Galilée ; il faut aussi uL/c² petit devant l'incertitude sur les dates. Leçon « La transformation de Lorentz »." },
      lumiere: { prompt: "Un éclair part de l'origine selon x = ct pour Joe. Moe avance à u = 0,6 c. À quelle vitesse voit-il passer l'éclair ?",
        options: { a: "0,4 c, par la transformation de Galilée, qui est exacte pour la lumière.", b: "1,6 c, car il va vers l'éclair.", c: "c : par la transformation de Lorentz, x′ = ct′ pour tout u.", d: "0,8 c, le facteur √(1 \u2212 u²/c²) appliqué à c." },
        why: "x′ = γ(c \u2212 u)t et t′ = γ(1 \u2212 u/c)t, donc x′/t′ = c. Galilée donnerait c \u2212 u = 0,4 c : c'est ce désaccord avec l'électromagnétisme qui a fait abandonner (15.2). Leçons « La transformation de Lorentz » et « Le principe de relativité »." },
      allerretour: { prompt: "Dans le modèle de l'éther, un interféromètre aux bras de 11 m avance à u = 10⁻⁴ c, un bras parallèle au mouvement, l'autre perpendiculaire. De combien les durées des deux allers-retours diffèrent-elles ?",
        options: { a: "D'environ 7 ps, un effet du premier ordre en u/c.", b: "De zéro, car les bras sont égaux.", c: "D'environ 73 ns, la durée d'un aller-retour.", d: "D'environ 4 × 10⁻¹⁶ s : (L/c)(u/c)², le bras parallèle étant le plus lent." },
        hint: "Développez (15.4) et (15.5) au premier ordre en (u/c)².",
        why: "(15.4) vaut (2L/c)(1 + u²/c²) et (15.5) (2L/c)(1 + u²/(2c²)) : l'écart est (L/c)(u/c)² = 3,7 × 10⁻⁸ × 10⁻⁸ ≈ 3,7 × 10⁻¹⁶ s. Le premier ordre s'est compensé entre l'aller et le retour. Leçon « L'expérience de Michelson et Morley »." },
      rotation: { prompt: "Pourquoi Michelson et Morley font-ils tourner leur appareil d'un quart de tour au lieu de lire une seule fois la position des franges ?",
        options: { a: "Parce que les bras ne sont jamais égaux à une longueur d'onde près : seul le changement des franges quand les bras échangent leurs rôles mesure l'effet.", b: "Parce que l'éther tourne avec la Terre.", c: "Pour annuler l'effet du mercure sur la lumière.", d: "Parce qu'un appareil immobile ne produit pas de franges." },
        why: "Une différence de longueur des bras décale les franges de la même façon dans les deux orientations ; elle s'élimine dans la différence. L'effet cherché, lui, change de signe : 2Lu²/(λc²) d'une orientation à l'autre. Leçon « L'expérience de Michelson et Morley »." },
      contraction: { prompt: "Selon (15.6), de combien un bras de 11 m qui avance à 30 km·s⁻¹ le long de lui-même se raccourcit-il ?",
        options: { a: "D'environ 0,5 mm.", b: "D'environ 55 nm, soit L u²/(2c²).", c: "D'environ 1,1 mm, soit L u/c.", d: "De rien : la contraction ne concerne que les objets plus rapides que 0,1 c." },
        hint: "√(1 \u2212 u²/c²) ≈ 1 \u2212 u²/(2c²) quand u ≪ c.",
        why: "11 × (10⁻⁴)²/2 = 5,5 × 10⁻⁸ m, une fraction de longueur d'onde : juste de quoi compenser l'écart des allers-retours, à tous les ordres d'après (15.7). Aucune règle ne la mesure directement : elle est relative, comme le montre « La contraction de Lorentz »." },
      inverse: { prompt: "L'horloge de Moe, à son origine x′ = 0, marque t′ = T. Où et quand est cet événement pour Joe, Moe avançant à u ?",
        options: { a: "x = 0, t = T : Joe et Moe ont le même temps.", b: "x = uT, t = T, comme le dit Galilée à toute vitesse.", c: "x = uT/√(1 \u2212 u²/c²), t = T/√(1 \u2212 u²/c²).", d: "x = uT√(1 \u2212 u²/c²), t = T√(1 \u2212 u²/c²)." },
        hint: "Utilisez la transformation inverse, qui change u en \u2212u.",
        why: "Par (15.3w), t = (t′ + ux′/c²)γ = γT et x = (x′ + ut′)γ = γuT : Joe date l'événement plus tard que ne l'indique l'horloge de Moe. C'est la dilatation du temps, étudiée dans « La dilatation du temps ». Leçon « La transformation de Lorentz »." },
      limite: { prompt: "On refait l'expérience de 1887 avec des bras dix fois plus longs, et on ne voit toujours aucun déplacement au-delà de 0,01 frange. Dans le modèle de l'éther, quelle vitesse de la Terre par rapport à l'éther cela permet-il encore ?",
        options: { a: "Moins de 3 km·s⁻¹ : la limite est divisée par 10.", b: "Moins de 4,7 km·s⁻¹ : la longueur ne change rien.", c: "Moins de 0,47 km·s⁻¹ : la limite est divisée par 100.", d: "Moins d'environ 1,5 km·s⁻¹ : l'effet attendu passe de 0,4 à 4 franges, et la limite sur u est divisée par √10." },
        hint: "Le déplacement attendu est proportionnel à L u².",
        why: "Avec 110 m, on attend 4 franges à 30 km·s⁻¹. Pour rester sous 0,01, il faut u² 400 fois plus petit : u < 30/20 = 1,5 km·s⁻¹. Comme la vitesse orbitale de la Terre change d'un bout à l'autre de l'année, un éther immobile est exclu ; le principe de relativité l'explique. Leçons « L'expérience de Michelson et Morley » et « Le principe de relativité »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

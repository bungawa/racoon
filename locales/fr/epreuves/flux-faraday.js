/* Épreuve de l'étape « Règle du flux et loi de Faraday » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      aimant: { prompt: "Un aimant passe à 3\u00a0m·s⁻¹ devant une boucle immobile : un côté de 5\u00a0cm de la boucle est dans l'entrefer, à 0,4\u00a0T, le côté opposé est dehors. Quelle force électromotrice, et quelle force pousse les porteurs ?",
        options: { a: "60\u00a0mV, par le champ électrique induit : les porteurs de la boucle sont au repos.", b: "60\u00a0mV, par la force magnétique qv ∧ B sur les porteurs.", c: "Zéro : la boucle ne bouge pas.", d: "6\u00a0mV, par le champ électrique induit." },
        hint: "Seul le mouvement relatif compte pour la valeur ; pour la cause, regardez ce qui bouge.",
        why: "ℰ = Bbv = 0,4 × 0,05 × 3 = 0,06\u00a0V, comme si la boucle bougeait. Mais des porteurs au repos ne sentent que la force électrique : c'est le champ induit E = \u2212u ∧ B de l'aimant en mouvement. Leçon « La physique de l'induction »." },
      statique: { prompt: "Un circuit en fil se déforme dans un champ magnétique statique. Que vaut la circulation du champ électrique le long du circuit ?",
        options: { a: "\u2212dΦ/dt, par (17.3).", b: "Zéro : le champ est statique, aucun champ électrique n'est induit ; toute la force électromotrice vient de v ∧ B.", c: "La moitié de \u2212dΦ/dt.", d: "Elle est indéterminée tant qu'on ne connaît pas la résistance du fil." },
        why: "(17.1) ne donne de champ électrique que si B varie. Le flux change parce que le contour bouge : c'est le terme v ∧ B qui donne \u2212dΦ/dt. (17.3) ne vaut que pour un contour fixe. Leçon « La physique de l'induction »." },
      solenoide: { prompt: "Un long solénoïde de 10\u00a0cm² de section voit son champ intérieur croître de 2\u00a0T·s⁻¹. Une spire de 20\u00a0cm de rayon l'entoure en son milieu, là où le champ extérieur est nul. Quelle est sa force électromotrice ?",
        options: { a: "Zéro : B est nul sur la spire.", b: "Environ 2 × 10⁻⁵\u00a0V, réduite par le rapport des aires.", c: "2\u00a0mV.", d: "0,25\u00a0V, le champ croissant sur toute l'aire de la spire." },
        hint: "Seul compte le flux à travers la spire, quelle que soit sa taille.",
        why: "Le flux à travers la spire est celui du solénoïde : 10⁻³\u00a0m² × 2\u00a0T·s⁻¹ = 2\u00a0mV. Le champ électrique induit existe sur la spire, où B = 0 ; c'est le principe du bêtatron. Leçons « La physique de l'induction » et « Accélération par un champ induit et bêtatron »." },
      disque: { prompt: "Un disque de Faraday de 10\u00a0cm de rayon tourne à 300\u00a0rad·s⁻¹ dans un champ axial uniforme de 0,2\u00a0T ; un balai sur un axe fin, l'autre au bord. Quelle force électromotrice ?",
        options: { a: "0,6\u00a0V.", b: "Zéro : le flux à travers le circuit est constant.", c: "3\u00a0V.", d: "0,3\u00a0V." },
        hint: "ℰ = ωBa²/2.",
        why: "300 × 0,2 × 0,01/2 = 0,3\u00a0V. La règle du flux, appliquée au circuit fixe, prédit zéro à tort : les porteurs tournent avec le disque et subissent qv ∧ B. Oublier le 1/2 donne 0,6\u00a0V. Leçon « Exceptions à la règle du flux »." },
      plaques: { prompt: "Deux plaques en contact basculent dans un champ uniforme ; le flux à travers le circuit qui passe par leur point de contact change beaucoup, mais le galvanomètre dévie à peine. Pourquoi ?",
        options: { a: "Le circuit change de matière : le contact glisse bien plus vite que le métal, et seule la vitesse du métal pousse les porteurs.", b: "Le champ électrique induit compense exactement la variation de flux.", c: "La résistance du contact est trop grande.", d: "La règle du flux ne vaut qu'en courant alternatif." },
        why: "La force sur les porteurs est q v ∧ B, v la vitesse du métal. Le point de contact n'est pas un objet ; sa course ne pousse aucune charge. Appliquée à un contour qui suit le métal, la règle redonne la valeur vraie. Leçon « Exceptions à la règle du flux »." },
      betatron: { prompt: "Dans un bêtatron, le champ sur l'orbite de 0,5\u00a0m de rayon monte de 0 à 0,4\u00a0T. De combien doit monter le champ moyen à l'intérieur de l'orbite, et quelle quantité de mouvement l'électron atteint-il ?",
        options: { a: "0,4\u00a0T, et 60\u00a0MeV/c.", b: "0,8\u00a0T, et 60\u00a0MeV/c.", c: "0,8\u00a0T, et 120\u00a0MeV/c.", d: "0,2\u00a0T, et 30\u00a0MeV/c." },
        hint: "(17.12), puis p = q r B sur l'orbite.",
        why: "Le champ moyen doit varier deux fois plus que le champ sur l'orbite : 0,8\u00a0T. Alors p = erB = 0,5 × 0,4 × 3 × 10⁸\u00a0eV/c = 60\u00a0MeV/c. Prendre le champ moyen pour B donne 120\u00a0MeV/c. Leçon « Accélération par un champ induit et bêtatron »." },
      limite: { prompt: "Qu'est-ce qui limite l'énergie d'un bêtatron à électrons à quelques centaines de MeV ?",
        options: { a: "La vitesse de la lumière, que l'électron ne peut dépasser.", b: "La condition 2:1, qui cesse de valoir à haute énergie.", c: "Le rayonnement : la perte par tour croît comme γ⁴/r et rattrape le gain par tour, qu'un aimant de taille raisonnable ne peut augmenter.", d: "Le champ électrique induit, qui change de signe au-delà de 100\u00a0MeV." },
        why: "Le gain par tour est la force électromotrice d'une spire qui suit l'orbite, quelques kilovolts ; la perte par rayonnement, q²β³γ⁴/(3ε₀r), dépasse la moitié de ce gain vers 300\u00a0MeV sur un mètre. La condition 2:1 vaut à toute énergie. Leçon « Accélération par un champ induit et bêtatron »." },
      paradoxe: { prompt: "Sur un disque immobile, 0,5\u00a0µC sont répartis sur un cercle de 5\u00a0cm de rayon, autour du milieu d'un long solénoïde de 1\u00a0cm de rayon dont le champ intérieur vaut 0,5\u00a0T. On coupe le courant. Quel moment cinétique le disque reçoit-il, et d'où vient-il ?",
        options: { a: "Zéro : le moment cinétique total du disque et de la bobine se conserve.", b: "Environ 1,3 × 10⁻¹¹\u00a0kg·m²·s⁻¹, créé par la coupure.", c: "Environ 7,9 × 10⁻¹¹\u00a0kg·m²·s⁻¹, venu du champ.", d: "Environ 1,3 × 10⁻¹¹\u00a0kg·m²·s⁻¹, que portait le champ électromagnétique avant la coupure." },
        hint: "ΔL = QΦ/(2π), Φ le flux à travers le cercle des charges.",
        why: "Φ ≈ 0,5 × π × 10⁻⁴ = 1,6 × 10⁻⁴\u00a0Wb, d'où ΔL = 0,5 × 10⁻⁶ × 1,6 × 10⁻⁴/(2π) ≈ 1,3 × 10⁻¹¹\u00a0kg·m²·s⁻¹ ; sans le 2π, 7,9 × 10⁻¹¹. Le moment cinétique total se conserve bien, à condition de compter celui du champ, ε₀∫r ∧ (E ∧ B) dV, qui passe au disque. Leçon « Un paradoxe de l'induction »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

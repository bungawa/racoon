/* Épreuve de l'étape « Référentiels non galiléens » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      composition: { prompt: "Un manège tourne à 0,5\u00a0rad·s⁻¹. Un enfant y marche radialement vers l'extérieur, à 1\u00a0m·s⁻¹ par rapport au plateau, et passe à 4\u00a0m de l'axe. Quelle est alors sa vitesse par rapport au sol ?",
        options: { a: "2,24\u00a0m·s⁻¹ : la vitesse relative, radiale, et la vitesse d'entraînement ω r = 2\u00a0m·s⁻¹, tangentielle, sont perpendiculaires.", b: "3\u00a0m·s⁻¹ : on ajoute les normes.", c: "1\u00a0m·s⁻¹ : seule compte la vitesse mesurée sur le plateau.", d: "2\u00a0m·s⁻¹ : seule compte la vitesse du plateau." },
        hint: "va = vr + ve ; dessinez les deux vecteurs.",
        why: "Composition des vitesses : va = vr + ω ∧ O′M. Les deux vecteurs sont perpendiculaires : √(1² + 2²) ≈ 2,24\u00a0m·s⁻¹. On additionne des vecteurs, pas des normes. Leçon « Changer de référentiel »." },
      marcher: { prompt: "Le même enfant, de 30\u00a0kg, marche droit et à vitesse constante par rapport au plateau. Quelle force horizontale le plateau exerce-t-il sur lui, à 4\u00a0m de l'axe ?",
        options: { a: "30\u00a0N vers l'axe, pour compenser la force centrifuge.", b: "Environ 42\u00a0N : 30\u00a0N vers l'axe et 30\u00a0N dans le sens de la rotation, pour compenser les deux forces d'inertie.", c: "Aucune : il marche à vitesse constante.", d: "60\u00a0N vers l'axe." },
        hint: "Dans R′, ar = 0 : la force réelle compense f_ie + f_ic.",
        why: "f_ie = m ω² r = 30 × 0,25 × 4 = 30\u00a0N vers l'extérieur ; f_ic = 2 m ω vr = 30\u00a0N, opposée au sens de la rotation pour un mouvement vers l'extérieur. Le plateau doit fournir l'opposé : √(30² + 30²) ≈ 42\u00a0N. Leçon « Forces d'inertie d'entraînement et de Coriolis »." },
      nacelle: { prompt: "Dans la nacelle d'une grande roue, qui reste horizontale pendant que la roue tourne, quelles forces d'inertie faut-il ajouter pour appliquer la deuxième loi ?",
        options: { a: "La force centrifuge et la force de Coriolis, comme sur un manège.", b: "Aucune : la nacelle ne tourne pas sur elle-même.", c: "Seulement la force d'inertie d'entraînement, \u2212m fois l'accélération du point d'attache, pas de force de Coriolis.", d: "Seulement la force de Coriolis." },
        hint: "Les axes de la nacelle gardent-ils leur direction ? Son point d'attache, lui, accélère.",
        why: "La nacelle est en translation circulaire : son vecteur rotation est nul, donc pas de terme de Coriolis. Mais son point d'attache accélère vers l'axe de la roue : la force d'entraînement vaut \u2212m a(O′). Leçon « Changer de référentiel »." },
      sac: { prompt: "Un sac est posé sur un manège qui tourne à 1\u00a0rad·s⁻¹, à 3\u00a0m de l'axe. Le coefficient de frottement entre le sac et le plateau vaut 0,2. Que fait-il ?",
        options: { a: "Il reste en place : le frottement suffit toujours sur un plateau horizontal.", b: "Il glisse vers l'axe.", c: "Il reste en place, car la force de Coriolis le retient.", d: "Il glisse vers l'extérieur : ω² r = 3\u00a0m·s⁻² dépasse ce que le frottement peut fournir, 0,2 g ≈ 2\u00a0m·s⁻²." },
        hint: "Comparez ω² r à μ g.",
        why: "Immobile dans R′, il ne subit que la force d'entraînement, m ω² r. Le frottement statique peut l'équilibrer jusqu'à μ m g. Ici 3 > 1,96\u00a0m·s⁻² : il part. Pas de Coriolis tant qu'il est immobile. Leçon « Forces d'inertie d'entraînement et de Coriolis »." },
      peser: { prompt: "On pèse la même masse au niveau de la mer, au pôle puis à l'équateur, avec un dynamomètre parfait. Que trouve-t-on ?",
        options: { a: "Environ 0,5\u00a0% de plus au pôle ; l'entraînement dû à la rotation en explique les deux tiers, l'aplatissement le reste.", b: "Environ 0,35\u00a0% de plus au pôle, entièrement dû à la rotation.", c: "La même valeur : le poids est m g partout.", d: "Environ 5\u00a0% de plus au pôle." },
        hint: "Deux causes s'ajoutent : la force d'inertie d'entraînement, nulle au pôle, et la forme aplatie de la Terre.",
        why: "La pesanteur normale passe de 9,780\u00a0m·s⁻² à l'équateur à 9,832\u00a0m·s⁻² aux pôles : 0,53\u00a0%. Le terme d'entraînement, Ω² R = 0,034\u00a0m·s⁻², en fait 65\u00a0% ; le reste vient de la forme aplatie de la Terre. Leçon « Dynamique terrestre »." },
      tour: { prompt: "On lâche une bille sans vitesse du haut d'une tour de 100\u00a0m, à l'équateur. Où touche-t-elle le sol, air négligé ?",
        options: { a: "2,2\u00a0cm à l'ouest du pied de la verticale.", b: "2,2\u00a0cm à l'est.", c: "Exactement au pied de la verticale : à l'équateur, l'effet de Coriolis s'annule.", d: "22\u00a0cm à l'est." },
        hint: "Déviation vers l'est : (2√2/3) Ω cos λ √(h³/g).",
        why: "À l'équateur, cos λ = 1 : 0,943 × 7,29 × 10⁻⁵ × √(10⁶/9,81) ≈ 2,2 × 10⁻²\u00a0m, vers l'est. Ce qui s'annule à l'équateur, c'est l'effet sur les mouvements horizontaux, en sin λ. Leçon « Dynamique terrestre »." },
      latitude: { prompt: "Le plan d'oscillation d'un pendule de Foucault fait un tour en 47,9\u00a0h. À quelle latitude est-il ?",
        options: { a: "Vers 60°.", b: "Vers 45°.", c: "Vers 30° : sin λ = 23,93\u00a0h / 47,9\u00a0h ≈ 0,5.", d: "Au pôle." },
        hint: "La période de rotation du plan vaut le jour sidéral divisé par sin λ.",
        why: "Pendule de Foucault : la période vaut le jour sidéral divisé par |sin λ|. Un tour en deux jours sidéraux donne sin λ = 1/2, λ = 30°, au Nord comme au Sud (le sens de rotation, lui, change). Leçon « Dynamique terrestre »." },
      rossby: { prompt: "Lequel de ces mouvements est le plus gouverné par la force de Coriolis due à la rotation de la Terre, à 45° de latitude ?",
        options: { a: "L'eau d'une baignoire qui se vide, 0,1\u00a0m·s⁻¹ sur 1\u00a0m.", b: "Une balle de fusil, 900\u00a0m·s⁻¹ pendant 1\u00a0s.", c: "Une voiture à 30\u00a0m·s⁻¹ sur 1\u00a0km.", d: "Un courant océanique à 0,1\u00a0m·s⁻¹ sur 100\u00a0km." },
        hint: "Comparez les nombres de Rossby, v/(2Ω sin λ L).",
        why: "2Ω sin 45° ≈ 1,0 × 10⁻⁴\u00a0s⁻¹. Ro vaut environ 10³ pour la baignoire, 10⁴ pour la balle, 3 × 10² pour la voiture, mais 10⁻² pour le courant : c'est lui que Coriolis domine. La vitesse seule ne décide pas, c'est la vitesse rapportée à l'échelle. Leçon « Dynamique terrestre »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

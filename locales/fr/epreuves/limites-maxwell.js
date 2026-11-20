/* Épreuve de l'étape « Limites de la théorie de Maxwell » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      contraintes: { prompt: "Une charge q est répartie sur une sphère de rayon a. Si l'on divise a par 2, par combien est multipliée la pression électrostatique σ²/(2ε₀) qui tire la surface vers l'extérieur ?",
        options: { a: "Par 16 : σ varie comme 1/a², la pression comme 1/a⁴.", b: "Par 4 : la pression varie comme σ, donc comme 1/a².", c: "Par 2 : comme l'énergie q²/(8πε₀a).", d: "Elle ne change pas : la charge totale est la même." },
        hint: "σ = q/(4πa²).",
        why: "σ est multipliée par 4, σ² par 16. Plus l'électron est petit, plus les forces non électriques qui le tiennent ensemble, les contraintes de Poincaré, doivent être grandes. Leçon « Force d'un électron sur lui-même »." },
      haltere: { prompt: "Un haltère formé de deux charges qe/2 à la distance d avance à vitesse constante, perpendiculairement à sa tige. Que vaut la force nette d'une moitié sur l'autre, le long du mouvement ?",
        options: { a: "Elle freine l'haltère d'autant plus que d est petit.", b: "Elle est nulle : le champ d'une charge en mouvement uniforme pointe depuis sa position présente, juste en face de l'autre moitié.", c: "Elle l'accélère, à cause du retard d/c.", d: "Elle vaut la masse U/c² fois la vitesse." },
        why: "Il n'y a de force propre que pendant une accélération. Avec une accélération, le premier terme vaut (U/c²) ẍ : c'est la masse électromagnétique de l'haltère. Leçon « Force d'un électron sur lui-même »." },
      infini: { prompt: "Dans la force d'un électron sphérique de rayon a sur lui-même, (28.9), quel terme reste fini et non nul quand a tend vers 0 ?",
        options: { a: "Le terme de masse, en ẍ/a.", b: "Aucun : tous deviennent infinis.", c: "Le terme en x⃛, indépendant du rayon : le freinage par rayonnement.", d: "Le terme en a x⁗." },
        why: "Le terme de masse diverge comme 1/a, les termes suivants s'annulent avec a, et le terme en x⃛ garde son coefficient (2/3)qₑ²/(4πε₀c³) quelle que soit la répartition. Leçon « Force d'un électron sur lui-même »." },
      energie: { prompt: "Un électron oscille : x = A sin ωt. Pourquoi le travail fourni contre le terme \u2212(2/3)qₑ²x⃛/(4πε₀c³) pendant une période égale-t-il l'énergie rayonnée ?",
        options: { a: "Parce que x⃛ est nul en moyenne.", b: "Parce que le terme de masse rend toute l'énergie à la fin de la période.", c: "Parce que l'énergie rayonnée est nulle sur une période.", d: "Parce que \u2212x⃛ẋ = \u2212d(ẋẍ)/dt + ẍ², et que ẋẍ reprend la même valeur après une période : il reste la moyenne de ẍ², celle de (28.10)." },
        why: "La puissance instantanée diffère, mais l'écart est la dérivée d'une grandeur périodique. Sans ce terme, l'énergie ne se conserverait pas. Leçon « Tentatives de modifier la théorie de Maxwell »." },
      dirac: { prompt: "Dirac fait agir l'électron sur lui-même par la moitié de la différence entre ses champs retardés et avancés. Qu'obtient-il pour un électron ponctuel ?",
        options: { a: "Une masse électromagnétique finie et aucun freinage.", b: "Le freinage \u2212(2/3)qₑ²x⃛/(4πε₀c³) seul, sans masse électromagnétique.", c: "Une force nulle.", d: "Le double de la force retardée." },
        hint: "Renverser le temps change le signe des dérivées d'ordre impair.",
        why: "Le terme de masse, en ẍ, est le même dans les forces retardée et avancée : il disparaît de la différence. Le terme en x⃛ change de signe : il reste entier. Les suivants s'annulent avec a. Leçon « Tentatives de modifier la théorie de Maxwell »." },
      bopp: { prompt: "Dans la théorie de Bopp, une charge contribue au potentiel en 1 seulement si l'intervalle s₁₂² est à ±a² près de zéro. Pour r₁₂ = 100 a, de combien le retard t₁ \u2212 t₂ s'écarte-t-il au plus de r₁₂/c, en valeur relative ?",
        options: { a: "De a²/(2r₁₂²) = 5 × 10⁻⁵ : la théorie redonne les potentiels retardés de Maxwell.", b: "De a/r₁₂ = 10⁻² : la théorie diffère nettement de celle de Maxwell.", c: "De 50 % : le retard n'a plus de sens.", d: "De zéro exactement." },
        why: "c(t₁ \u2212 t₂) = √(r₁₂² ± a²) ≈ r₁₂(1 ± a²/(2r₁₂²)), d'où (28.16a). Loin des charges, la théorie de Bopp est celle de Maxwell ; près d'une charge, elle rend le potentiel fini. Leçon « Tentatives de modifier la théorie de Maxwell »." },
      masses: { prompt: "Le pion chargé a une énergie de masse de 139,57\u00a0MeV, le pion neutre de 134,98\u00a0MeV. Que montre cet écart ?",
        options: { a: "Que le pion neutre n'a pas de masse électromagnétique et que le pion chargé est entièrement électromagnétique.", b: "Que les forces nucléaires distinguent les pions chargés des neutres.", c: "Rien : l'écart est dans l'incertitude des mesures.", d: "Qu'une part de la masse d'une particule chargée est électromagnétique : environ 4,6\u00a0MeV, neuf masses d'électron." },
        why: "Pour les forces nucléaires, les trois pions sont une même particule. La différence des masses des quarks u et d ne change presque pas leur écart : il vient du champ, et c'est la masse électromagnétique, de quelques masses d'électron. Leçon « Tentatives de modifier la théorie de Maxwell »." },
      yukawa: { prompt: "Une force a un potentiel de Yukawa K e^(\u2212r/R)/r. À r = 3R, quelle fraction reste-t-il du potentiel de Coulomb K/r, et quelle masse a le quantum si R = 1\u00a0fm ? (ħc = 197\u00a0MeV·fm)",
        options: { a: "e⁻¹ ≈ 37 %, et 197\u00a0keV.", b: "Tout le potentiel, et une masse nulle.", c: "e⁻³ ≈ 5 %, et 197\u00a0MeV.", d: "1/3, et 591\u00a0MeV." },
        why: "e^(\u2212r/R) = e⁻³ ≈ 0,05 ; m c² = ħc/R = 197\u00a0MeV. Le pion, de 140\u00a0MeV, correspond à une portée de 1,4\u00a0fm. Leçon « Le champ de force nucléaire »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

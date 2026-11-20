/* Épreuve de l'étape « Théorème d'Ampère et relativité des champs » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      enlace: { prompt: "Un contour fermé entoure deux fils : l'un porte 5\u00a0A, l'autre 2\u00a0A en sens inverse. Un troisième fil, à côté du contour, porte 10\u00a0A. Que vaut ∮ B·ds le long du contour, parcouru dans le sens direct par rapport au premier fil ?",
        options: { a: "Environ 3,8 × 10⁻⁶\u00a0T·m : μ0 × (5 \u2212 2)\u00a0A.", b: "Environ 2,1 × 10⁻⁵\u00a0T·m : μ0 × (5 + 2 + 10)\u00a0A.", c: "Environ 8,8 × 10⁻⁶\u00a0T·m : μ0 × (5 + 2)\u00a0A.", d: "Zéro : le fil extérieur crée un champ sur le contour, qui annule le reste." },
        hint: "Seuls comptent les courants qui traversent une surface bordée par le contour, avec leur signe.",
        why: "Le courant enlacé vaut 5 \u2212 2 = 3\u00a0A ; μ0 × 3 ≈ 3,8 × 10⁻⁶\u00a0T·m. Le fil extérieur crée bien un champ sur le contour, mais sa circulation y est nulle. Leçon « Champ des courants permanents et théorème d'Ampère »." },
      fil: { prompt: "Un long fil rectiligne porte 20\u00a0A. Que vaut le champ magnétique à 5\u00a0cm de son axe ?",
        options: { a: "Environ 4 × 10⁻⁶\u00a0T.", b: "Environ 8 × 10⁻⁵\u00a0T.", c: "Environ 2,5 × 10⁻⁴\u00a0T.", d: "Environ 1,6 × 10⁻³\u00a0T." },
        hint: "μ0/(2π) ≈ 2 × 10⁻⁷\u00a0T·m·A⁻¹.",
        why: "B = μ0 I/(2πr) = 2 × 10⁻⁷ × 20/0,05 = 8 × 10⁻⁵\u00a0T, (13.17). Le fil doit être long devant 5\u00a0cm, et son retour loin. Leçon « Fil rectiligne, solénoïde et courants atomiques »." },
      solenoide: { prompt: "Une bobine longue et fine compte 500 spires sur 25\u00a0cm et porte 4\u00a0A. Que vaut le champ en son centre ?",
        options: { a: "Environ 2,5 × 10⁻³\u00a0T.", b: "Environ 6,3 × 10⁻⁴\u00a0T.", c: "Environ 1,0 × 10⁻²\u00a0T.", d: "Environ 2,5\u00a0T." },
        hint: "Combien de spires par mètre ?",
        why: "n = 500/0,25 = 2\u00a0000 spires par mètre ; B = μ0 n I ≈ 1,26 × 10⁻⁶ × 2\u00a0000 × 4 ≈ 1,0 × 10⁻²\u00a0T, (13.19). Le rayon n'intervient pas tant que la bobine est longue devant lui. Leçon « Fil rectiligne, solénoïde et courants atomiques »." },
      court: { prompt: "Un solénoïde a une longueur égale à quatre fois son rayon. Que vaut le champ en son centre, rapporté à μ0 n I ?",
        options: { a: "Exactement 1 : le théorème d'Ampère ne dépend pas de la longueur.", b: "0,5, comme aux extrémités.", c: "Environ 0,875 : 1 \u2212 2R²/L².", d: "Environ 0,89 : le cosinus de l'angle sous lequel on voit le bord d'une extrémité, 2/√5." },
        hint: "Sur l'axe, au centre : cos α avec tan α = R/(L/2).",
        why: "Au centre, (L/2)/√((L/2)² + R²) = 2R/√(5R²) = 2/√5 ≈ 0,894. L'approximation 2R²/L² ne vaut que pour L ≫ R ; ici elle donnerait 0,875. Le rectangle d'Ampère suppose un champ extérieur négligeable, faux pour une bobine courte. Leçon « Fil rectiligne, solénoïde et courants atomiques »." },
      charge: { prompt: "Un fil neutre est parcouru par un courant. Dans le référentiel où les électrons de conduction sont immobiles, comment est le fil ?",
        options: { a: "Chargé positivement : les ions en mouvement sont plus serrés, les électrons au repos moins serrés que dans le référentiel du fil.", b: "Neutre : la charge est un invariant.", c: "Chargé négativement : les électrons au repos se rassemblent.", d: "Sans courant : les électrons ne bougent plus." },
        why: "La charge de chaque particule est invariante, mais les densités ne le sont pas : contraction des longueurs. La charge nette vaut ρ+ (v²/c²)/√(1 \u2212 v²/c²), (13.27). Et il reste un courant, celui des ions. Leçon « Relativité des champs électrique et magnétique »." },
      rapport: { prompt: "Une charge longe un fil neutre à 0,6 c. Dans le référentiel du fil, elle subit une force magnétique F. Dans son propre référentiel, une force électrique F′. Que vaut F′/F ?",
        options: { a: "1, puisque la physique est la même.", b: "1,25.", c: "0,8.", d: "0,36." },
        hint: "γ = 1/√(1 \u2212 0,36).",
        why: "F′ = F/√(1 \u2212 v²/c²) = F/0,8 = 1,25 F, (13.30). Ce qui est le même dans les deux référentiels, c'est l'impulsion transverse : la durée propre de la charge est 0,8 fois celle mesurée dans le référentiel du fil, (13.33). Leçon « Relativité des champs électrique et magnétique »." },
      propre: { prompt: "Un faisceau d'électrons a, au laboratoire, la densité de charge ρ et la vitesse 0,6 c. Que valent sa densité de charge et sa densité de courant dans le référentiel des électrons ?",
        options: { a: "1,25 ρ et 0,6 ρc.", b: "ρ et 0 : la densité ne dépend pas du référentiel.", c: "0,8 ρ et 0 : la densité propre est la plus petite en valeur absolue.", d: "0,8 ρ et 0,48 ρc." },
        hint: "Appliquez (13.35) avec u = v, ou utilisez l'invariant c²ρ² \u2212 j².",
        why: "j = 0,6 ρc ; ρ′ = γ(ρ \u2212 u j/c²) = 1,25 × (1 \u2212 0,36) ρ = 0,8 ρ, et j′ = γ(j \u2212 uρ) = 0. Vérification : c²ρ² \u2212 j² = 0,64 c²ρ² = c²(0,8ρ)². Leçon « Transformation des courants et des charges »." },
      secteur: { prompt: "Un câble de 2\u00a0m alimente un appareil sous 50\u00a0Hz. Peut-on appliquer à chaque instant le théorème d'Ampère, établi pour des courants permanents ?",
        options: { a: "Non : un courant alternatif n'est jamais permanent.", b: "Oui, mais seulement quand le courant est maximal.", c: "Non : il faut toujours ajouter le courant de déplacement, du même ordre que le courant du câble.", d: "Oui : le terme négligé pèse (2πfL/c)², environ 4 × 10⁻¹², car le circuit est minuscule devant la longueur d'onde, 6\u00a0000\u00a0km." },
        why: "Ce qui compte, c'est la lenteur des variations à l'échelle du temps de traversée de la lumière : L/(c × 1/2πf) ≈ 2 × 10⁻⁶. Le régime quasi stationnaire vaut ; il cesse pour une antenne. Leçon « Champ des courants permanents et théorème d'Ampère »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

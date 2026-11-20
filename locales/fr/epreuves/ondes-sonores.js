/* Épreuve de l'étape « Le son et l'équation d'onde » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      echo: { prompt: "Face à une falaise, dans l'air à 293\u00a0K, on frappe dans ses mains ; l'écho revient 1,2\u00a0s plus tard. À quelle distance est la falaise ?",
        options: { a: "Environ 206\u00a0m : le son a fait l'aller et le retour à 343\u00a0m·s⁻¹.", b: "Environ 412\u00a0m, la distance parcourue en 1,2\u00a0s.", c: "Environ 174\u00a0m, avec la vitesse isotherme de Newton.", d: "On ne peut pas savoir sans la forme du claquement." },
        hint: "L'écho fait le trajet deux fois ; la forme d'une onde non dispersive voyage intacte.",
        why: "c = √(γRT/M) = 343\u00a0m·s⁻¹ à 293\u00a0K ; 343 × 1,2/2 ≈ 206\u00a0m. La forme du claquement n'intervient pas : f(x \u2212 ct) garde sa forme. Avec la vitesse isotherme, 290\u00a0m·s⁻¹, on se tromperait de 15\u00a0%. Leçons « Qu'est-ce qu'une onde ? », « Solutions de l'équation d'onde » et « La vitesse du son »." },
      houle: { prompt: "Une tempête lointaine émet à la fois un grondement sonore et un train de vagues. Lequel des deux arrive avec la forme qu'il avait au départ ?",
        options: { a: "Les vagues : l'eau est moins compressible que l'air.", b: "Le son : dans l'air, sa vitesse ne dépend presque pas de la fréquence ; en eau profonde, les vagues longues vont plus vite que les courtes, et le train s'étale.", c: "Aucun : toute onde se déforme en se propageant.", d: "Les deux, puisque les deux équations sont linéaires." },
        why: "Linéaire ne suffit pas : il faut aussi que toutes les sinusoïdes avancent à la même vitesse. Pour les vagues, ω = √(gk) : la vitesse de phase dépend de λ, et l'énergie va à la vitesse de groupe, moitié de celle des crêtes. Leçon « Qu'est-ce qu'une onde ? »." },
      deplacement: { prompt: "Un son de 500\u00a0Hz à 80\u00a0dB traverse l'air à 293\u00a0K. De combien chaque tranche d'air se déplace-t-elle au plus ?",
        options: { a: "De 2\u00a0mm, l'ordre de grandeur d'une membrane de haut-parleur.", b: "De 0,2\u00a0nm, la taille d'un atome.", c: "D'environ 0,22\u00a0µm : p₀ = √2 × 0,2\u00a0Pa, u₀ = p₀/(ρc) ≈ 0,7\u00a0mm·s⁻¹, χ₀ = u₀/ω.", d: "De 0,69\u00a0m, la longueur d'onde." },
        hint: "Partez de (47.1) pour la surpression efficace, puis u₀ = p₀/(ρ₀c) et χ₀ = u₀/ω.",
        why: "80\u00a0dB : p_eff = 2 × 10⁻⁵ × 10⁴ = 0,2\u00a0Pa, crête 0,28\u00a0Pa. u₀ = 0,28/(1,20 × 343) = 6,8 × 10⁻⁴\u00a0m·s⁻¹. χ₀ = u₀/(2π × 500) = 2,2 × 10⁻⁷\u00a0m. Leçon « Propagation du son »." },
      continu: { prompt: "À 0\u00a0dB, l'air se déplace de 10⁻¹¹\u00a0m, bien moins que le libre parcours moyen (66\u00a0nm). Pourquoi le traiter quand même comme un milieu continu ?",
        options: { a: "On ne le peut pas : le modèle continu est faux à 0\u00a0dB.", b: "Parce que le libre parcours est en fait plus petit que 10⁻¹¹\u00a0m.", c: "Parce que l'air se comporte comme un solide à faible niveau.", d: "Parce que la condition porte sur la longueur d'onde, λ/ℓ ≈ 5 × 10⁶ à 1\u00a0kHz : chaque tranche contient des milliards de molécules, et le déplacement est leur moyenne." },
        why: "Le continu exige des tranches petites devant λ et grandes devant ℓ. Le déplacement collectif ressort de la moyenne sur une foule de molécules, même s'il est bien plus petit qu'un libre parcours. Leçon « Propagation du son »." },
      "premier-ordre": { prompt: "En établissant l'équation d'onde, on remplace ρ par ρ₀ dans la masse d'une tranche et on jette le produit ρe ∂χ/∂x. De combien ces termes sont-ils plus petits que ceux qu'on garde ?",
        options: { a: "D'un facteur ε = ρe/ρ₀ : 2 × 10⁻⁷ à 60\u00a0dB, 2 × 10⁻³ à 140\u00a0dB.", b: "D'un facteur γ = 1,4.", c: "D'un facteur λ/ℓ.", d: "Ils ne sont pas plus petits : (47.14) est exacte." },
        why: "Chaque terme négligé est un terme gardé multiplié par ε. C'est ce qui rend l'équation linéaire, et c'est aussi sa limite : à grande amplitude, les compressions vont plus vite que c. Leçon « L'équation d'onde »." },
      choc: { prompt: "Une onde sinusoïdale de 1\u00a0kHz se raidit en choc après environ 23\u00a0m à 140\u00a0dB. Après quelle distance à 160\u00a0dB ?",
        options: { a: "Après 230\u00a0m : plus fort, l'onde est plus stable.", b: "Après environ 2,3\u00a0m : la distance de choc est inversement proportionnelle à l'amplitude ε, multipliée par 10.", c: "Après 23\u00a0m, la distance ne dépend que de la fréquence.", d: "Jamais : la forme d'une onde sonore ne change pas." },
        hint: "+20\u00a0dB multiplie la surpression par 10.",
        why: "Le sommet va plus vite que le pied d'une fraction (γ + 1)ε/2 de c : il le rattrape sur λ/(2π(γ + 1)ε/2). Dix fois plus d'amplitude, dix fois moins de distance. Leçons « L'équation d'onde » et « Qu'est-ce qu'une onde ? »." },
      croisement: { prompt: "Deux bosses de déplacement de signes opposés se croisent ; à l'instant où elles se superposent, χ = 0 partout. Que fait alors l'air, et que se passe-t-il ensuite ?",
        options: { a: "Il est au repos ; les deux ondes se sont détruites.", b: "Il est comprimé au maximum ; les ondes rebondissent.", c: "Il passe par sa position de repos à vitesse maximale : l'énergie est toute cinétique, et chaque bosse repart intacte.", d: "Il chauffe, l'énergie a été convertie en chaleur." },
        why: "χ = F(x \u2212 ct) + G(x + ct) avec G = \u2212F décalé : les déplacements s'annulent mais les vitesses \u2212cF′ + cG′ s'ajoutent. L'énergie totale ne change pas ; les deux formes poursuivent leur route. Leçon « Solutions de l'équation d'onde »." },
      helium: { prompt: "Que vaut la vitesse du son dans l'hélium à 300\u00a0K (M = 4,0 g·mol⁻¹, γ = 5/3), et que donnerait l'hypothèse de Newton ?",
        options: { a: "Environ 340\u00a0m·s⁻¹ dans les deux cas, comme l'air.", b: "Environ 1\u202f019\u00a0m·s⁻¹ selon Newton, 789\u00a0m·s⁻¹ en adiabatique.", c: "Environ 1\u202f019\u00a0m·s⁻¹ dans les deux cas : γ ne compte pas pour un gaz monoatomique.", d: "Environ 1\u202f019\u00a0m·s⁻¹ en adiabatique, √(γRT/M) ; l'isotherme donnerait 789\u00a0m·s⁻¹, trop lente d'un facteur √(5/3)." },
        why: "√(5/3 × 8,314 × 300/0,0040) ≈ 1\u202f019\u00a0m·s⁻¹ ; √(RT/M) ≈ 789\u00a0m·s⁻¹. Les compressions sont adiabatiques : la chaleur diffuse sur δ ≪ λ pendant une période. Leçons « La vitesse du son » et « Propagation du son »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

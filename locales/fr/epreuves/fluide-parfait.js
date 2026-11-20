/* Épreuve de l'étape « Le fluide parfait » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      seau: { prompt: "De l'eau tourne d'un bloc à la vitesse angulaire ω dans un seau. Pourquoi sa surface libre est-elle un paraboloïde ?",
        options: { a: "La force centrifuge pousse l'eau contre la paroi, qui la renvoie vers le haut.", b: "La viscosité entraîne l'eau du bord plus vite que celle du centre.", c: "Dans le référentiel du seau, l'eau est au repos et p + ρφ y est constant, avec φ = gz \u2212 ω²r²/2 ; la surface, où p = p0, est une équipotentielle.", d: "La pression est la même partout dans l'eau, donc la surface suit la vitesse locale." },
        hint: "Écrivez l'équilibre dans le référentiel où l'eau ne bouge pas.",
        why: "Au repos dans le référentiel tournant, ∇p = \u2212ρ∇φ avec le potentiel de pesanteur et celui de la force d'inertie d'entraînement. Toute isobare est une équipotentielle, la surface aussi : z = z0 + ω²r²/(2g). La viscosité n'a servi qu'à mettre l'eau en rotation d'ensemble. Leçon « Hydrostatique »." },
      convection: { prompt: "Dans une cuve d'eau immobile au départ, la masse volumique varie de 1\u00a0% d'une paroi latérale à l'autre, à hauteur fixée. L'eau peut-elle rester immobile ?",
        options: { a: "Oui, la variation est trop faible pour compter.", b: "Non : ∇ρ × ∇φ ≠ 0, aucune pression ne compense le poids partout ; sur le bord de la cuve, la circulation de ρ∇φ n'est pas nulle.", c: "Oui : la pression devient simplement plus forte du côté lourd.", d: "Non, parce que l'eau est compressible." },
        why: "L'équilibre exige que ρ∇φ soit un gradient, donc que son rotationnel ∇ρ × ∇φ soit nul : les surfaces d'égale ρ doivent être horizontales. Une variation horizontale, si petite soit-elle, met l'eau en mouvement : c'est la convection. Le même terme crée du tourbillon dans (40.9) quand ρ varie. Leçons « Hydrostatique » et « Les équations du mouvement d'un fluide »." },
      tourbillon: { prompt: "Dans l'eau, un tourbillon libre stationnaire a v = Γ/(2πr), avec Γ = 0,5\u00a0m²·s⁻¹. Quel gradient de pression règne à r = 0,4\u00a0m ?",
        options: { a: "Aucun : l'écoulement est stationnaire et irrotationnel, les particules n'accélèrent pas.", b: "Environ 0,1 Pa·m⁻¹.", c: "Environ 99 Pa·m⁻¹, la pression décroissant vers l'extérieur.", d: "Environ 99 Pa·m⁻¹, la pression croissant vers l'extérieur : \u2212∇p fournit l'accélération v²/r vers le centre." },
        hint: "Stationnaire ne veut pas dire sans accélération : (v·∇)v.",
        why: "v = 0,5/(2π × 0,4) ≈ 0,20\u00a0m·s⁻¹, et (v·∇)v vaut v²/r ≈ 0,099\u00a0m·s⁻² vers le centre. Il faut ρv²/r ≈ 99 Pa·m⁻¹, la pression montant vers l'extérieur. Ω = 0 n'empêche pas l'accélération : le moulinet ne tourne pas, mais il fait le tour. Leçons « Les équations du mouvement d'un fluide » et « Circulation dans un fluide »." },
      regime: { prompt: "Un insecte de 2\u00a0mm vole à 0,5\u00a0m·s⁻¹ ; un avion de ligne vole à 250\u00a0m·s⁻¹ en altitude, où le son va à 295\u00a0m·s⁻¹. Lequel est bien décrit par un fluide parfait incompressible ?",
        options: { a: "Aucun : l'insecte a Re ≈ 70, la viscosité compte autour de lui ; l'avion a Ma ≈ 0,85, la masse volumique de l'air change.", b: "L'insecte : il va lentement, l'air reste incompressible.", c: "L'avion : son nombre de Reynolds dépasse 10⁷.", d: "Les deux : l'air est un fluide parfait." },
        hint: "Il faut à la fois Re ≫ 1 et (v/c)² ≪ 1.",
        why: "Insecte : Re = vL/ν = 0,5 × 0,002/1,5 × 10⁻⁵ ≈ 70, la couche visqueuse est épaisse comme l'insecte. Avion : Re est immense, mais Ma²/2 ≈ 0,36 : l'estimation sort de son domaine (Ma ≪ 1), et dit l'essentiel : la masse volumique change de plusieurs dizaines de pour cent, il faut la dynamique des gaz. Le fluide parfait incompressible vaut entre les deux : une voiture, un nageur. Leçon « Les équations du mouvement d'un fluide »." },
      venturi: { prompt: "Une conduite horizontale de 10\u00a0cm de diamètre transporte 0,02\u00a0m³·s⁻¹ d'eau et se resserre à 5\u00a0cm. Quelle est la différence de pression entre l'amont et le col, sans pertes ?",
        options: { a: "Environ 3\u00a0kPa.", b: "Environ 49\u00a0kPa.", c: "Environ 97\u00a0kPa.", d: "Environ 12\u00a0kPa." },
        why: "v1 = Q/A1 ≈ 2,55\u00a0m·s⁻¹ ; la section est quatre fois plus petite au col, v2 ≈ 10,2\u00a0m·s⁻¹ (40.15). Bernoulli (40.13) : p1 \u2212 p2 = ρ(v2² \u2212 v1²)/2 ≈ 500 × (103,8 \u2212 6,5) ≈ 49\u00a0kPa, environ 5\u00a0m de colonne d'eau. 3\u00a0kPa ne compte que ρv1²/2, 97\u00a0kPa oublie le facteur 1/2. Leçon « Écoulement stationnaire : le théorème de Bernoulli »." },
      vidange: { prompt: "Une cuve se vide par un trou rond en paroi mince. On le remplace par un tube rentrant de même diamètre. La durée de la vidange…",
        options: { a: "est divisée par deux.", b: "ne change pas : l'eau sort toujours à √(2gh).", c: "augmente d'environ 24\u00a0% : le débit est proportionnel à Cc, qui passe de 0,62 à 0,5.", d: "double." },
        why: "La vitesse dans la partie la plus étroite du jet reste √(2gh) ; c'est la section du jet, Cc a, qui change. La durée T = (A/(Cc a)) √(2h0/g) varie comme 1/Cc : 0,62/0,5 ≈ 1,24. Leçon « Écoulement stationnaire : le théorème de Bernoulli »." },
      portance: { prompt: "Un cylindre tourne dans un courant d'air uniforme et entraîne une circulation Γ autour de lui. Que prédit le fluide parfait ?",
        options: { a: "Une traînée et une portance, toutes deux proportionnelles à U².", b: "Aucune force : un fluide parfait ne pousse pas un corps.", c: "Une traînée ρUΓ dans le sens du courant.", d: "Une force ρUΓ par mètre, perpendiculaire au courant, et aucune traînée." },
        why: "La circulation accélère l'air d'un côté et le ralentit de l'autre : Bernoulli donne une différence de pression, et l'intégrale sur la paroi vaut \u2212ρUΓ perpendiculairement à U (Kutta–Joukowski). Le long du courant, la force reste nulle : paradoxe de d'Alembert. Le réel ajoute la traînée du sillage. Leçon « Circulation dans un fluide »." },
      anneau: { prompt: "Un anneau de fumée grossit : son rayon R augmente, sa circulation Γ et son cœur a ne changent pas. Que devient sa vitesse ?",
        options: { a: "Elle diminue : dans Γ/(4πR) (ln(8R/a) \u2212 1/4), le facteur 1/R l'emporte sur le logarithme.", b: "Elle augmente comme ln R.", c: "Elle ne change pas : Kelvin conserve la circulation.", d: "Elle augmente comme R." },
        hint: "Comparez la croissance de ln R et celle de R.",
        why: "Γ est bien conservé (théorème de Kelvin), mais la vitesse dépend aussi de la taille : chaque morceau de l'anneau est poussé par le reste, d'autant moins que le reste est loin. C'est aussi pourquoi, dans le saute-mouton, l'anneau qui s'élargit ralentit. Leçon « Les lignes de tourbillon »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

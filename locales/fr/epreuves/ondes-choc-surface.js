/* Épreuve de l'étape « Ondes de choc et ondes de surface » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      mach: { prompt: "Une balle file à 1\u00a0000\u00a0m·s⁻¹ dans l'air à 293\u00a0K, où le son va à 343\u00a0m·s⁻¹. Loin de la balle, quel est le demi-angle du cône qu'elle traîne ?",
        options: { a: "20°, puisque sin θ = 343/1\u00a0000.", b: "70°, puisque cos θ = 343/1\u00a0000.", c: "Aucun : il faut que la balle vibre pour émettre un son.", d: "90° : le cône est un plan perpendiculaire à la trajectoire." },
        hint: "En τ, le front émis a un rayon cτ, son centre est à vτ derrière la balle.",
        why: "(51.1) : sin θ = c/v = 0,343, θ = 20,1°. La balle n'a pas besoin de vibrer : elle écarte l'air en passant. Près d'elle, la surpression est forte, l'onde y va plus vite que c et le cône s'ouvre. Leçons « Ondes d'étrave » et « Ondes de choc »." },
      tcherenkov: { prompt: "Un électron traverse un verre d'indice 1,5 à β = 0,9. Émet-il de la lumière Tcherenkov, et sous quel angle avec sa trajectoire ?",
        options: { a: "Non : rien ne peut dépasser c.", b: "Oui, à 42° : β > 1/n = 0,67, et cos θc = 1/(nβ) = 0,74.", c: "Oui, à 48° : sin θc = 1/(nβ).", d: "Non : il faudrait β > 1,5." },
        why: "La limite est c, pas c/n. Ici βc = 2,7 × 10⁸\u00a0m·s⁻¹ > c/n = 2,0 × 10⁸\u00a0m·s⁻¹. L'angle de la lumière avec la trajectoire est le complément du demi-angle du cône de (51.1) : cos θc = 1/(1,5 × 0,9), θc = 42,2°. Leçon « Ondes d'étrave »." },
      mascaret: { prompt: "Un mascaret remonte un chenal d'eau calme de 1\u00a0m de profondeur et laisse 2\u00a0m derrière lui. À quelle vitesse avance-t-il, et à quelle vitesse l'eau le suit-elle ?",
        options: { a: "3,1\u00a0m·s⁻¹, la vitesse √(gh₁) des ondes longues ; l'eau ne bouge pas.", b: "4,4\u00a0m·s⁻¹, √(gh₂) ; l'eau le suit à la même vitesse.", c: "5,4\u00a0m·s⁻¹, par u² = gh₂(h₁ + h₂)/(2h₁) ; l'eau le suit à u/2 = 2,7\u00a0m·s⁻¹, par la conservation de la masse.", d: "On ne peut rien dire sans décrire la turbulence du front." },
        hint: "Deux bilans écrits loin du front : la masse, v h₂ = u(h₂ \u2212 h₁), et la quantité de mouvement.",
        why: "u² = 9,81 × 2 × 3/2 = 29,4\u00a0m²·s⁻², u = 5,42\u00a0m·s⁻¹, plus vite que les ondes devant (3,13\u00a0m·s⁻¹). v = u(h₂ \u2212 h₁)/h₂ = u/2. La turbulence fixe seulement l'énergie dissipée, ΔH = (h₂ \u2212 h₁)³/(4h₁h₂) = 12,5\u00a0cm de charge. Leçon « Ondes de choc »." },
      choc: { prompt: "Un choc porte l'air au repos de 101\u00a0325 à 152\u00a0000\u00a0Pa. Pourquoi un observateur devant lui n'entend-il rien avant son arrivée ?",
        options: { a: "Parce que le choc absorbe tous les sons qu'il rattrape.", b: "Parce que l'air comprimé est opaque au son.", c: "Parce qu'il entend en fait un grondement d'avertissement, mais trop faible.", d: "Parce que le choc va plus vite que le son dans l'air calme (M = 1,20) ; derrière, l'air est plus chaud et avance, et un son émis là va plus vite que le choc." },
        why: "Rankine–Hugoniot pour p₂/p₁ = 1,5 : M = 1,195, T₂/T₁ = 1,125, l'air suit à 0,30c₁, un son émis derrière va à 1,36c₁ > 1,195c₁. Aucune perturbation ne précède le choc dans l'air calme ; celles nées derrière le rattrapent et l'entretiennent. Leçon « Ondes de choc »." },
      seisme: { prompt: "Une roche a ν = 1/4 et vP = 6,0\u00a0km·s⁻¹. Un sismographe enregistre l'onde S 30\u00a0s après l'onde P. À quelle distance est le séisme ?",
        options: { a: "Environ 250\u00a0km : vS = vP/√3 = 3,46\u00a0km·s⁻¹, et d = Δt/(1/vS \u2212 1/vP).", b: "180\u00a0km : 30\u00a0s × 6,0\u00a0km·s⁻¹.", c: "104\u00a0km : 30\u00a0s × 3,46\u00a0km·s⁻¹.", d: "On ne peut pas savoir sans l'heure du séisme." },
        hint: "Pour ν = 1/4, vP/vS = √(2(1 \u2212 ν)/(1 \u2212 2ν)).",
        why: "vP/vS = √3 pour ν = 1/4. d = 30/(0,2887 \u2212 0,1667) = 246\u00a0km. L'heure du séisme s'élimine : seule compte la différence des temps de trajet. Leçon « Ondes dans les solides »." },
      atomes: { prompt: "Dans un cristal, les atomes sont espacés de 0,3\u00a0nm. Quelle est la plus courte longueur d'onde d'une onde de compression le long d'une file d'atomes, et que vaut sa vitesse de groupe ?",
        options: { a: "0,3\u00a0nm, et la même vitesse que le son.", b: "0,6\u00a0nm, deux voisins en sens opposés ; vitesse de groupe nulle, c'est une onde stationnaire.", c: "Aucune limite : le solide est continu.", d: "0,6\u00a0nm ; vitesse de groupe double de la vitesse du son." },
        why: "Aux seuls atomes, k et k + 2π/a donnent les mêmes déplacements : λ ≥ 2a. Pour ω = 2√(K/m)|sin(ka/2)|, vg = a√(K/m) cos(ka/2) s'annule en ka = π. Leçon « Ondes dans les solides »." },
      houle: { prompt: "Une tempête à 1\u00a0500\u00a0km du rivage lève une houle de période 12\u00a0s, en eau profonde. Quand arrive-t-elle ?",
        options: { a: "Après 22\u00a0h : elle va à sa vitesse de phase, gT/(2π) = 18,7\u00a0m·s⁻¹.", b: "Presque tout de suite : la houle va à √(gh) sur 4\u00a0000\u00a0m de fond, 200\u00a0m·s⁻¹.", c: "Après environ 44\u00a0h : l'énergie va à la vitesse de groupe gT/(4π) = 9,4\u00a0m·s⁻¹.", d: "En même temps que les vagues courtes, qui partent ensemble." },
        hint: "λ = gT²/(2π) = 225\u00a0m : l'océan est-il profond pour cette onde ?",
        why: "λ = 225\u00a0m ≪ 4\u00a0000\u00a0m : eau profonde. vg = vφ/2 = gT/(4π) = 9,4\u00a0m·s⁻¹ ; 1,5 × 10⁶/9,4 ≈ 1,6 × 10⁵\u00a0s ≈ 44\u00a0h. Les vagues plus courtes, plus lentes, arrivent après. Leçon « Ondes de surface »." },
      sillage: { prompt: "Un petit bateau double sa vitesse en eau profonde, en restant à faible nombre de Froude. Que devient son sillage ?",
        options: { a: "Il se referme deux fois plus, comme un cône de Mach.", b: "Il s'ouvre, parce que les vagues sont plus fortes.", c: "Il disparaît : au-delà de 0,23\u00a0m·s⁻¹, plus aucune vague ne tient derrière.", d: "Son demi-angle reste 19,47° ; ses vagues transverses s'allongent d'un facteur 4, λ₀ = 2πv²/g." },
        why: "Le coin de Kelvin, sin ψ = 1/3, ne dépend que de vg = vφ/2. La vague transverse a vφ = v, donc λ₀ = 2πv²/g. Seul un nombre de Froude au-delà de 0,5 environ referme l'angle comme 1/v. Leçons « Ondes de surface » et « Ondes d'étrave »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

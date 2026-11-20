/* Épreuve de l'étape « Bilans et écoulements réels » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      pelton: { prompt: "Une roue Pelton reçoit tout un jet de 10\u00a0kg·s⁻¹ à 40\u00a0m·s⁻¹. Ses augets défilent à 20\u00a0m·s⁻¹ et renvoient l'eau à 180°, sans frottement. Quelle puissance reçoit-elle ?",
        options: { a: "4\u00a0kW : la moitié de la puissance du jet.", b: "16\u00a0kW : le débit fois v².", c: "8\u00a0kW, toute la puissance cinétique du jet : F = 10 × 20 × 2 = 400\u00a0N, fois 20\u00a0m·s⁻¹.", d: "Rien : l'eau repart à la même vitesse relative, elle ne perd pas d'énergie." },
        hint: "F = qₘ w (1 \u2212 cos θ), avec w = v \u2212 u ; P = F u.",
        why: "Dans le référentiel de l'auget, l'eau arrive à 20\u00a0m·s⁻¹ et repart à 20\u00a0m·s⁻¹ en sens inverse : F = 10 × 20 × 2 = 400\u00a0N, P = 400 × 20 = 8\u00a0kW = ½ × 10 × 40². Dans le sol, l'eau repart immobile. La vitesse relative est conservée, pas la vitesse absolue. Leçon « Bilans sur un système ouvert »." },
      pompe: { prompt: "Une pompe monte 2\u00a0kg·s⁻¹ d'eau de 15\u00a0m. Le réseau perd 30\u00a0kPa de charge ; vitesse et pression sont les mêmes à l'entrée et à la sortie. Quelle puissance utile doit-elle fournir ?",
        options: { a: "Environ 350\u00a0W : 2 × (9,81 × 15 + 30\u202f000/1\u202f000).", b: "Environ 290\u00a0W : seule l'altitude compte.", c: "Environ 60\u00a0W : seule la perte compte.", d: "Environ 60\u00a0kW : 2 × 30\u202f000." },
        why: "Le bilan d'énergie par kilogramme donne wᵤ = gΔz + Δp_perte/ρ = 147 + 30 = 177\u00a0J·kg⁻¹, fois 2\u00a0kg·s⁻¹ : 354\u00a0W. La perte de charge s'ajoute à l'altitude ; elle finit en chaleur dans l'eau. Leçons « Bilans sur un système ouvert » et « Pertes de charge, laminaire et turbulent »." },
      huile: { prompt: "De l'huile s'écoule en régime laminaire dans une conduite. À débit fixé, on double le diamètre. La perte de charge régulière est divisée par…",
        options: { a: "2.", b: "16 : en laminaire, Δp ∝ Q/D⁴.", c: "32, comme en turbulent rugueux.", d: "4, le rapport des sections." },
        hint: "Combinez λ = 64/Re et Δp = λ (L/D) ρv²/2, avec v ∝ Q/D².",
        why: "Δp = 32ρνLv/D², et v = 4Q/(πD²) : Δp ∝ Q/D⁴, la loi de Hagen-Poiseuille. Doubler D divise la perte par 16. En turbulent rugueux, Δp ∝ Q²/D⁵ et le facteur serait 32. Leçon « Pertes de charge, laminaire et turbulent »." },
      rugueux: { prompt: "Dans une conduite de rugosité relative 0,01, à Re = 10⁶, on double le débit. Que deviennent λ et la perte de charge ?",
        options: { a: "λ est divisé par 2, la perte double.", b: "λ double, la perte est multipliée par 8.", c: "λ ne change pas, la perte double.", d: "λ reste vers 0,038, la perte est multipliée par 4." },
        why: "À droite du diagramme de Moody, les courbes rugueuses sont horizontales : Colebrook donne λ ≈ 0,038, indépendant de Re. Δp = λ (L/D) ρv²/2 croît alors comme v², donc comme Q² : facteur 4. Leçon « Pertes de charge, laminaire et turbulent »." },
      elargissement: { prompt: "De l'eau à 2\u00a0m·s⁻¹ passe brusquement dans une conduite de section double. Quelle perte de charge singulière, d'après Borda-Carnot ?",
        options: { a: "Aucune : la pression remonte.", b: "Environ 2\u00a0kPa : toute la pression dynamique ρv²/2.", c: "Environ 0,5\u00a0kPa : K = (1 \u2212 1/2)² = 0,25 fois ρv₁²/2 = 2\u00a0kPa.", d: "Environ 1\u00a0kPa : la moitié de la pression dynamique." },
        why: "Le bilan de quantité de mouvement sur le liquide entre la marche et l'aval donne K = (1 \u2212 S₁/S₂)² = 0,25 : 0,25 × 998 × 4/2 ≈ 0,5\u00a0kPa. La pression monte quand même, de ρv₁²σ(1 \u2212 σ) = 1\u00a0kPa : la charge baisse, pas la pression. Leçons « Bilans sur un système ouvert » et « Pertes de charge, laminaire et turbulent »." },
      epaisseur: { prompt: "De l'eau (ν = 1,0 × 10⁻⁶\u00a0m²·s⁻¹) coule à 0,5\u00a0m·s⁻¹ le long d'une plaque lisse. Quelle est l'épaisseur de la couche limite à 20\u00a0cm du bord d'attaque ?",
        options: { a: "Environ 3\u00a0mm : Re_x = 10⁵, laminaire, δ = 4,91 √(νx/U).", b: "Environ 20\u00a0cm : la couche a la longueur de la plaque.", c: "Environ 30\u00a0µm : la couche limite est moléculaire.", d: "Environ 3\u00a0cm, car l'eau est turbulente à cette vitesse." },
        hint: "Calculez d'abord Re_x = Ux/ν pour savoir quelle loi appliquer.",
        why: "Re_x = 0,5 × 0,2/10⁻⁶ = 10⁵ < 5 × 10⁵ : Blasius s'applique. δ = 4,91 × √(10⁻⁶ × 0,2/0,5) = 3,1\u00a0mm, soit δ/x = 4,91/√Re_x ≈ 1,6\u00a0%. Mince devant x, comme l'annonce δ ∼ √(νx/U). Leçon « La couche limite »." },
      parfait: { prompt: "Pour une aile à Re = 10⁷, on calcule la pression avec le modèle du fluide parfait, puis le frottement avec la couche limite. Qu'est-ce qui justifie ce partage ?",
        options: { a: "La viscosité de l'air est nulle loin de l'aile.", b: "La couche limite est mince, δ/x de l'ordre de 1/√Re en laminaire et d'environ 1,5\u00a0% en turbulent à ce Re : hors d'elle, les forces visqueuses sont négligeables devant l'inertie.", c: "Le fluide parfait est exact pour l'air, la couche limite n'est qu'une correction de mesure.", d: "L'écoulement est compressible au-delà de Re = 10⁶." },
        why: "La viscosité ne compte que là où les gradients de vitesse sont forts, c'est-à-dire sur l'épaisseur δ. Ailleurs, la force visqueuse est en 1/Re devant l'inertie. Le partage échoue là où la couche décolle : derrière, il faut un autre modèle. Leçon « La couche limite »." },
      tuyere: { prompt: "De l'air (γ = 1,4) au repos à 300\u00a0K se détend dans une tuyère de Laval dont la sortie a 1,6875 fois la section du col, en régime supersonique. Mach et température de sortie ?",
        options: { a: "M = 1,6875 et 300\u00a0K : la tuyère est calorifugée.", b: "M = 0,37 et 292\u00a0K.", c: "M = 1 et 250\u00a0K : on ne dépasse pas le son dans une tuyère.", d: "M = 2 et environ 167\u00a0K : T0/T = 1 + 0,2 × 4 = 1,8." },
        why: "Sur la branche supersonique, A/Ac = 1,6875 donne M = 2 ; alors T = 300/1,8 ≈ 167\u00a0K, et v = M√(γrT) ≈ 518\u00a0m·s⁻¹ = √(2cₚ(300 \u2212 167)). Calorifugée ne veut pas dire isotherme : l'enthalpie devient vitesse. M = 0,37 est la solution subsonique du même rapport. Leçon « Écoulements compressibles : tuyère et nombre de Mach »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

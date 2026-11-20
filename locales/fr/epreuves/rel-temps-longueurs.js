/* Épreuve de l'étape « Temps, longueurs et simultanéité » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      parcours: { prompt: "Une particule instable a une durée de vie moyenne propre de 10\u00a0ns. Elle file à γ = 5 dans un détecteur. Quel parcours moyen y fait-elle avant de se désintégrer ?",
        options: { a: "Environ 2,9\u00a0m : sa vitesse multipliée par 10\u00a0ns.", b: "Environ 0,6\u00a0m : sa durée de vie est divisée par γ.", c: "Environ 14,7\u00a0m : sa durée de vie, pour le détecteur, est γ fois plus longue.", d: "Environ 75\u00a0m : γ² fois le parcours sans dilatation." },
        hint: "ℓ = vγτ₀, avec v = c√(1 \u2212 1/γ²).",
        why: "v = 0,98\u00a0c, et pour le détecteur la particule vit γτ₀ = 50\u00a0ns : ℓ = 0,98 × 3 × 10⁸ × 5 × 10⁻⁸ ≈ 14,7\u00a0m, selon (15.5b) de « La dilatation du temps ». Vue de la particule, c'est le détecteur qui est contracté du même facteur." },
      horloge: { prompt: "Une horloge de lumière dont les miroirs sont à 1,5\u00a0m l'un de l'autre bat 10\u00a0ns à bord d'un vaisseau. Le vaisseau passe à 0,8\u00a0c, la tige perpendiculaire au mouvement. Quelle durée le sol mesure-t-il pour un tic ?",
        options: { a: "16,7\u00a0ns : la lumière suit une ligne brisée plus longue, à la même vitesse c.", b: "6\u00a0ns : le tic est raccourci du facteur √(1 \u2212 0,64).", c: "10\u00a0ns : une horloge de lumière ne dépend pas de l'observateur.", d: "27,8\u00a0ns : γ² fois le tic propre." },
        hint: "γ = 1/0,6.",
        why: "Pour le sol, chaque montée suit l'hypoténuse d'un triangle dont la hauteur reste 1,5\u00a0m : le tic dure γ × 10\u00a0ns = 16,7\u00a0ns, selon (15.5) de « La dilatation du temps »." },
      volume: { prompt: "Un vaisseau cubique de 10\u00a0m de côté passe à 0,6\u00a0c, une arête parallèle à sa vitesse. Quel volume le sol lui trouve-t-il ?",
        options: { a: "512\u00a0m³ : chaque arête est multipliée par 0,8.", b: "800\u00a0m³ : seule l'arête parallèle à la vitesse est raccourcie.", c: "1\u00a0000\u00a0m³ : le volume est le même pour tous.", d: "1\u00a0250\u00a0m³ : le volume est multiplié par γ." },
        why: "La contraction n'agit que dans la direction du mouvement : 8\u00a0m × 10\u00a0m × 10\u00a0m. Les arêtes perpendiculaires ne peuvent pas changer, sinon des repères tracés au croisement diraient qui bouge. Leçon « La contraction de Lorentz »." },
      sonde: { prompt: "Une sonde va à 0,8\u00a0c vers un relais situé, dans le référentiel du relais, à 3,0 × 10¹¹\u00a0m, que la lumière parcourt en 1\u00a0000\u00a0s. Combien dure le voyage pour l'horloge de la sonde, et comment la sonde l'explique-t-elle ?",
        options: { a: "1\u00a0250\u00a0s : pour la sonde, la distance ne change pas.", b: "1\u00a0250\u00a0s, mais son horloge le lit 750\u00a0s parce qu'elle est déréglée.", c: "2\u00a0083\u00a0s : pour la sonde, la distance est allongée.", d: "750\u00a0s : pour la sonde, la distance est contractée à 1,8 × 10¹¹\u00a0m, parcourue à 0,8\u00a0c." },
        hint: "Pour le relais, le voyage dure 1\u00a0000/0,8 s ; γ = 5/3.",
        why: "Pour le relais : 1\u00a0250\u00a0s, et l'horloge de la sonde ne compte que 1\u00a0250/γ = 750\u00a0s. Pour la sonde, son horloge marche bien ; c'est la distance qui vaut 0,6 × 3,0 × 10¹¹\u00a0m, parcourue en 750\u00a0s. Deux récits, la même lecture d'horloge à l'arrivée : leçons « La dilatation du temps » et « La contraction de Lorentz »." },
      eclairs: { prompt: "Deux éclairs frappent, au même instant pour le quai, ses deux bouts A et B, distants de 400\u00a0m. Un train passe à 0,6\u00a0c, de A vers B. Pour le train, lequel frappe le premier, et de combien ?",
        options: { a: "B, environ 1,0\u00a0µs avant A.", b: "A, environ 1,0\u00a0µs avant B.", c: "Aucun : ils restent simultanés.", d: "B, environ 0,8\u00a0µs avant A." },
        hint: "(15.3g) : γu(x₁ \u2212 x₂)/c², avec 400\u00a0m/c ≈ 1,33\u00a0µs.",
        why: "L'événement le plus loin vers l'avant est le plus ancien pour le train : B frappe d'abord, de 1,25 × 0,6 × 1,33\u00a0µs ≈ 1,0\u00a0µs. Oublier γ donne 0,8\u00a0µs. Leçon « La simultanéité »." },
      synchro: { prompt: "Un vaisseau de longueur propre 600\u00a0m passe à 0,8\u00a0c ; ses deux horloges ont été synchronisées à bord par un éclair parti du milieu. À un même instant du sol, que marquent-elles ?",
        options: { a: "La même chose : elles ont été synchronisées.", b: "L'arrière avance de 1,6\u00a0µs sur l'avant.", c: "L'avant avance de 1,6\u00a0µs sur l'arrière.", d: "L'arrière avance de 2,7\u00a0µs sur l'avant." },
        hint: "L'écart lu sur les horloges vaut uL₀/c² ; L₀/c = 2\u00a0µs.",
        why: "Pour le sol, l'arrière a été mis à zéro γuL₀/c² ≈ 2,7\u00a0µs avant l'avant, et chaque horloge du vaisseau bat γ fois moins vite : elle a compté 2,7/γ = 0,8 × 2\u00a0µs = 1,6\u00a0µs d'avance. Leçon « La simultanéité »." },
      ordre: { prompt: "Pour le sol, l'événement E₁ précède E₂ de 1\u00a0µs, et E₂ a lieu 900\u00a0m plus loin selon x. Existe-t-il un observateur pour qui E₂ précède E₁ ?",
        options: { a: "Non : aucun changement de référentiel ne renverse l'ordre de deux événements.", b: "Oui, mais seulement s'il va plus vite que la lumière.", c: "Oui : tout observateur allant selon +x à plus de c/3 ; aucun signal ne peut d'ailleurs relier ces deux événements.", d: "Oui : tout observateur allant selon \u2212x, quelle que soit sa vitesse." },
        hint: "t₂′ \u2212 t₁′ = γ(Δt \u2212 uΔx/c²) ; comparez cΔt = 300\u00a0m à Δx.",
        why: "L'ordre s'inverse dès que u > c²Δt/Δx = c × 300/900 = c/3. C'est possible parce que la lumière ne parcourt que 300\u00a0m en 1\u00a0µs : aucune cause en E₁ ne peut atteindre E₂. Si un signal pouvait les relier, l'ordre serait le même pour tous. Leçon « La simultanéité »." },
      visible: { prompt: "Une horloge a une incertitude relative de 10⁻¹⁷ sur sa fréquence. À partir de quelle vitesse relative la dilatation du temps, v²/(2c²), dépasse-t-elle cette incertitude ?",
        options: { a: "Environ 1\u00a0300\u00a0m·s⁻¹.", b: "Environ 0,01\u00a0m·s⁻¹.", c: "Environ 3\u00a0000\u00a0m·s⁻¹ : il faut la vitesse d'un satellite.", d: "Environ 1,3\u00a0m·s⁻¹, la vitesse d'un piéton." },
        hint: "v = c√(2 × 10⁻¹⁷).",
        why: "c√(2 × 10⁻¹⁷) = 3 × 10⁸ × 4,5 × 10⁻⁹ ≈ 1,3\u00a0m·s⁻¹. Un effet est invisible tant que sa taille relative reste très inférieure à l'incertitude relative de la mesure : leçons « La dilatation du temps » et « Incertitude absolue et incertitude relative »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

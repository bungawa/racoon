/* Épreuve de l'étape « Diffusion moléculaire » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      mobilites: { prompt: "Deux plaques de 1 m², à 10 cm l'une de l'autre dans l'air, présentent à faible tension une résistance de 5 × 10¹² Ω. L'air contient 5 × 10⁸ petits ions par mètre cube de chaque signe. Que vaut la somme des mobilités électriques k₊ + k₋ ?",
        options: { a: "2,5 × 10⁻⁴ m²·V⁻¹·s⁻¹ : σ = b/(RA) = 2 × 10⁻¹⁴ S·m⁻¹, puis σ/(e n).", b: "2,5 × 10⁻⁸ m²·V⁻¹·s⁻¹.", c: "1,3 × 10⁻⁴ m²·V⁻¹·s⁻¹, la mobilité d'un seul signe.", d: "On ne peut pas la déduire sans connaître le temps entre deux chocs." },
        hint: "(43.20) : 1/R = σ A/b, et σ = e n (k₊ + k₋) pour deux sortes d'ions.",
        why: "σ = b/(RA) = 0,1/(5 × 10¹² × 1) = 2 × 10⁻¹⁴ S·m⁻¹, la conductivité mesurée de l'air près du sol. k₊ + k₋ = σ/(e n) = 2 × 10⁻¹⁴/(1,6 × 10⁻¹⁹ × 5 × 10⁸) = 2,5 × 10⁻⁴ m²·V⁻¹·s⁻¹. Le temps entre chocs n'est pas nécessaire : c'est au contraire la mesure de R qui le donne. Leçons « Conductivité ionique » et « La vitesse de dérive »." },
      saturation: { prompt: "Dans l'air, q = 6,6 × 10⁶ paires d'ions sont produites par mètre cube et par seconde. Entre deux plaques de 1 m² à 10 cm, sous 100 V, quel courant passe ?",
        options: { a: "Mille fois le courant à 0,1 V, par la loi d'Ohm.", b: "Environ 1,1 × 10⁻¹³ A : toutes les paires produites sont recueillies, I = e q b A, quelle que soit la tension.", c: "Zéro : à forte tension, les ions se recombinent tous.", d: "Un courant qui croît sans limite avec la tension." },
        hint: "Au-dessus de V_s ≈ 0,1 V, le champ emporte les ions avant qu'ils se recombinent.",
        why: "La loi d'Ohm (43.19) suppose nᵢ fixé ; ici, le champ retire les ions bien plus vite que la recombinaison, en 5 min environ. Le courant ne peut dépasser la production : I = e q b A = 1,6 × 10⁻¹⁹ × 6,6 × 10⁶ × 0,1 × 1 ≈ 1,1 × 10⁻¹³ A. Leçon « Conductivité ionique »." },
      etalement: { prompt: "L'oxygène diffuse dans l'air avec D = 2,1 × 10⁻⁵ m²·s⁻¹. Combien de temps faut-il, environ, pour que ses molécules s'étalent de 1 cm par la seule diffusion ?",
        options: { a: "0,02 s.", b: "8 min : 1 cm à la vitesse D/(1 cm).", c: "2 s : t = L²/(2D).", d: "7 h." },
        hint: "L'écart quadratique croît comme 2Dt.",
        why: "t = L²/(2D) = 10⁻⁴/(4,2 × 10⁻⁵) ≈ 2,4 s. Le temps croît comme le carré de la distance : 0,02 s pour 1 mm, 7 h pour 1 m. Leçons « Diffusion moléculaire » et « Marche aléatoire et mouvement brownien »." },
      einstein: { prompt: "Un petit ion de l'air a une mobilité électrique de 2 × 10⁻⁴ m²·V⁻¹·s⁻¹. Quel est son coefficient de diffusion à 300 K ?",
        options: { a: "2 × 10⁻⁴ m²·s⁻¹, la même valeur.", b: "7,7 × 10⁻³ m²·s⁻¹ : la mobilité divisée par 25,9 mV.", c: "Il faut connaître son libre parcours et sa vitesse.", d: "5,2 × 10⁻⁶ m²·s⁻¹ : la mobilité multipliée par k_BT/e = 25,9 mV." },
        hint: "(43.31) avec μ = k/e : D = k k_BT/e.",
        why: "La mobilité de Feynman, par force, vaut μ = k/e ; D = μ k_B T = k × k_BT/e = 2 × 10⁻⁴ × 0,0259 ≈ 5,2 × 10⁻⁶ m²·s⁻¹. La relation d'Einstein est exacte : aucun libre parcours n'est nécessaire. Leçons « Diffusion moléculaire » et « Conductivité ionique »." },
      pression: { prompt: "À température fixée, on divise par deux la pression d'un gaz, son libre parcours restant petit devant le récipient. Que deviennent le coefficient de diffusion D et la conductivité thermique κ ?",
        options: { a: "D double ; κ ne change pas.", b: "D et κ doublent.", c: "D ne change pas ; κ est divisée par deux.", d: "D et κ sont divisés par deux." },
        hint: "D ∝ l v ; κ ∝ n l v.",
        why: "l = 1/(nσ) double et v ne dépend que de T : D = lv/3 double. κ contient n l, qui ne change pas : deux fois moins de porteurs d'énergie, qui vont deux fois plus loin. Leçons « Diffusion moléculaire » et « Conductivité thermique d'un gaz »." },
      exacte: { prompt: "Dans la simulation de la leçon « Diffusion moléculaire », D mesuré sans force et μkT mesuré sous une force coïncident pour toute règle de choc, alors que D = lv/3 se trompe de 15 % à plus d'un facteur 10. Pourquoi ?",
        options: { a: "Parce que la simulation impose D = μkT dans son code.", b: "Parce que D = μkT découle de l'équilibre de Boltzmann et de la compensation des courants de diffusion et de dérive, sans aucun détail des chocs.", c: "Parce que lv/3 néglige la force appliquée.", d: "Parce que les erreurs de D et de μ sont aléatoires et se compensent." },
        hint: "Quelles hypothèses demandent (43.35) et (43.40) ?",
        why: "Les deux mesures sont indépendantes : l'une regarde l'étalement sans force, l'autre la dérive sous une force. Leur rapport est fixé par l'argument d'Einstein, qui n'utilise que l'équilibre ; lv/3 suppose un nouveau départ à chaque choc et ignore la persistance des vitesses, qui multiplie D et μ ensemble. Leçon « Diffusion moléculaire »." },
      knudsen: { prompt: "Deux plaques sont à 1 mm l'une de l'autre dans du diazote à 300 K et 1 Pa, où le libre parcours vaut environ 7 mm. Que vaut, à peu près, le flux de chaleur par kelvin d'écart ?",
        options: { a: "26 W·m⁻²·K⁻¹ : κ/L, puisque κ ne dépend pas de la pression.", b: "Zéro : sans chocs, aucune chaleur ne passe.", c: "Environ 1 W·m⁻²·K⁻¹ : les molécules vont d'une plaque à l'autre sans choc, et le flux est proportionnel à la pression.", d: "260 W·m⁻²·K⁻¹ : le libre parcours long accélère le transport." },
        hint: "Comparez l et L : quel régime ?",
        why: "l/L ≈ 7 : le gaz est dans le régime des molécules libres, où (43.43) ne vaut plus. Le flux vaut environ 1,2 W·m⁻²·K⁻¹ par pascal pour le diazote : 1,2 W·m⁻²·K⁻¹ à 1 Pa, vingt fois moins que κ/L. Les molécules portent encore de l'énergie d'une plaque à l'autre : le flux n'est pas nul. Leçon « Conductivité thermique d'un gaz »." },
      independant: { prompt: "À température fixée et libre parcours petit devant le récipient, laquelle de ces grandeurs ne dépend pas de la pression du gaz ?",
        options: { a: "La mobilité μ d'un ion dans le gaz.", b: "Le coefficient de diffusion D.", c: "La conductivité d'un gaz dont la densité d'ions nᵢ est fixée.", d: "La conductivité thermique κ." },
        hint: "Laquelle contient le produit n l ?",
        why: "μ = τ/m et D = lv/3 sont proportionnels au libre parcours, donc à 1/P ; la conductivité ionique μ q² nᵢ aussi, à nᵢ fixé. Seule κ contient n l, indépendant de la densité : c'est (43.43). Leçons « Conductivité ionique », « Diffusion moléculaire » et « Conductivité thermique d'un gaz »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

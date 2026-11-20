/* Épreuve de l'étape « Systèmes linéaires » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      petitsangles: { prompt: "Un pendule forcé oscille avec une amplitude de 0,3 rad. Quelle erreur relative fait-on sur le rappel en écrivant sin θ ≈ θ pour rendre son équation linéaire ?",
        options: { a: "Environ 1,5 % : θ²/6 à 0,3 rad.", b: "Environ 30 % : l'amplitude elle-même.", c: "Environ 0,15 % : θ²/60.", d: "Aucune : un pendule est toujours linéaire." },
        hint: "sin θ ≈ θ \u2212 θ³/6.",
        why: "L'erreur relative de sin θ ≈ θ vaut θ²/6 au premier ordre : 0,09/6 = 1,5 %. À 0,1 rad, elle tombe à 0,17 %. Le modèle linéaire tient tant que ce terme négligé reste sous la précision voulue. Leçons « Linéarité d'une équation différentielle » et « Superposition des solutions »." },
      poles: { prompt: "Un circuit RLC série (L = 0,10 H, C = 0,10 µF, R = 200 Ω), condensateur chargé, est branché à t = 0 sur une source sinusoïdale. Ses pôles sont \u22121 000 ± 9 950i s⁻¹. Au bout de combien de temps le transitoire est-il divisé par 1 000 ?",
        options: { a: "Environ 0,7 ms.", b: "Environ 6,9 ms.", c: "Environ 1 ms, une constante de temps.", d: "Jamais : la source l'entretient." },
        hint: "Chaque pôle p donne un terme en e^(pt) ; seule sa partie réelle fait décroître.",
        why: "Re p = \u2212R/(2L) = \u22121 000 s⁻¹ ; e^(\u22121000 t) = 10⁻³ donne t = ln 1000/1000 ≈ 6,9 ms. La source n'ajoute que ses pôles ±iω, sur l'axe imaginaire : le régime établi, celui de la notation complexe. Leçon « Transformée de Laplace et notation complexe »." },
      superposition: { prompt: "Un oscillateur linéaire, parti du repos, répond à la force F₁ par x₁(t), d'amplitude 2 mm, et à F₂ par x₂(t), d'amplitude 3 mm, à une autre fréquence. Sous F₁ + F₂ ?",
        options: { a: "Le mouvement est sinusoïdal, d'amplitude 3,6 mm.", b: "Le mouvement est celui de la plus forte, 3 mm.", c: "Le mouvement est x₁(t) + x₂(t) : son écart ne dépasse jamais 5 mm.", d: "On ne peut rien dire sans résoudre l'équation complète." },
        why: "Par (25.8), la réponse à une somme est la somme des réponses. Deux fréquences différentes : la somme n'est pas une sinusoïde, ses maxima atteignent 5 mm quand les deux sont en phase. Leçon « Superposition des solutions »." },
      impedance: { prompt: "Pour le même circuit, Z(s) = R + Ls + 1/(Cs). Que vaut |Z| en s = iω, avec ω = 1,0 × 10⁴ rad·s⁻¹, et que représente ce nombre ?",
        options: { a: "0 : à la résonance, le circuit est un court-circuit.", b: "2 000 Ω, la résistance critique.", c: "1 000 Ω, l'impédance Lω de la bobine seule.", d: "200 Ω : iLω et 1/(iCω) s'annulent à ω₀ ; c'est l'impédance complexe du régime établi." },
        hint: "ω₀ = 1/√(LC).",
        why: "ω = 1/√(LC) = ω₀ : Z(iω₀) = R + i(Lω₀ \u2212 1/(Cω₀)) = 200 Ω. La règle d/dt → iω de la notation complexe est la transformée de Laplace prise en s = iω ; elle ne garde que le régime établi. Leçons « Transformée de Laplace et notation complexe » et « Impédances en série et en parallèle »." },
      declin: { prompt: "Un oscillateur à frottement visqueux garde 73 % de son amplitude d'une période à l'autre (Q = 10). Que reste-t-il après 5 périodes ?",
        options: { a: "Environ 21 %.", b: "Environ 27 %, perte de 73 % répartie.", c: "0 : 5 × 27 % dépasse 100 %.", d: "Environ 63 %." },
        why: "(25.10) : 0,73⁵ = 0,21. Le rapport par période est le même à toute amplitude, parce que l'équation est linéaire ; la décroissance est géométrique, donc exponentielle dans le temps. Leçon « Oscillations dans les systèmes linéaires »." },
      sec: { prompt: "Un bloc sur un ressort (ω₀ = 10 rad·s⁻¹) glisse sur une table, µ = 0,1, g = 9,81 m·s⁻². Lâché sans vitesse à 10 cm, à quelle distance de l'équilibre est-il au bout d'une période ?",
        options: { a: "7,3 cm, la même fraction perdue qu'un oscillateur visqueux.", b: "6,1 cm : il perd 4d = 3,9 cm par période, d = µg/ω₀².", c: "9,8 cm : la perte est de d seulement.", d: "0 : le frottement sec l'arrête en une période." },
        hint: "Chaque demi-période est une demi-oscillation harmonique autour de ±d.",
        why: "d = 0,1 × 9,81/100 = 9,8 mm ; |x| perd 2d par demi-période, 4d = 3,9 cm par période : 10 \u2212 3,9 = 6,1 cm. Décroissance arithmétique : la signature d'une équation non linéaire. Leçon « Oscillations dans les systèmes linéaires »." },
      analogue: { prompt: "Pour simuler la caisse d'un quart de voiture (m = 300 kg) par un circuit, on accélère le temps de α = 1 000 et on prend une échelle d'impédance ζ = 30 Ω·m·N⁻¹·s⁻¹. Quelle bobine faut-il ?",
        options: { a: "300 H.", b: "9 H.", c: "9 mH.", d: "0,3 mH." },
        why: "L = ζ m/α² = 30 × 300/10⁶ = 9 mH. Sans changement d'échelle, il faudrait 300 H. Le facteur de qualité, sans dimension, ne dépend d'aucune échelle. Leçon « Analogies en physique »." },
      bouchon: { prompt: "Une bobine de 10 mH, dont le fil fait 5 Ω, est en parallèle sur un condensateur de 100 nF. Que vaut l'impédance à la fréquence où elle est réelle ?",
        options: { a: "5 Ω.", b: "316 Ω, √(L/C).", c: "Infinie.", d: "20 kΩ." },
        hint: "Combinez r + iLω et 1/(iCω) par (25.17).",
        why: "Ẑ = (r + iLω)/(1 \u2212 LCω² + i r C ω) est réelle pour ω² = 1/(LC) \u2212 r²/L², et vaut là L/(r C) = 10⁻²/(5 × 10⁻⁷) = 20 kΩ. Infinie seulement pour r = 0. Leçon « Impédances en série et en parallèle »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

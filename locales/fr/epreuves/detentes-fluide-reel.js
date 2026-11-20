/* Épreuve de l'étape « Détentes d'un fluide réel » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {

      conserve: { prompt: "Quelle grandeur du gaz est la même avant et après chacune des deux détentes, pour des parois calorifugées ?",
        options: { a: "La température dans les deux cas.", b: "L'entropie dans les deux cas : aucune chaleur n'est échangée.", c: "L'énergie interne pour Joule–Gay-Lussac, l'enthalpie pour Joule–Thomson.", d: "L'enthalpie pour Joule–Gay-Lussac, l'énergie interne pour Joule–Thomson." },
        hint: "Dans l'une, rien ne pousse le gaz ; dans l'autre, le gaz d'amont le pousse et il pousse le gaz d'aval.",
        why: "Dans le vide, W = Q = 0 : ΔU = 0. À travers le bouchon, la tranche reçoit P₁V₁ et cède P₂V₂ : Δ(U + PV) = 0. L'entropie augmente dans les deux cas. Leçons « Détente de Joule–Gay-Lussac » et « Détente de Joule–Thomson »." },
      vide: { prompt: "Une mole d'argon (a = 0,136 Pa·m⁶·mol⁻², C_V = 12,5 J·K⁻¹·mol⁻¹) à 300 K passe de 0,50 L à 5,0 L dans le vide. Que prévoit l'équation de Van der Waals ?",
        options: { a: "Un refroidissement de 20 K environ : ΔT = \u2212(a/C_V)(1/V₁ \u2212 1/V₂).", b: "Aucun changement : ΔU = 0 impose ΔT = 0.", c: "Un refroidissement de 2 K environ.", d: "Un échauffement de 20 K environ : le gaz reçoit le travail du vide." },
        hint: "1/V₁ \u2212 1/V₂ = 2 000 \u2212 200 = 1 800 m⁻³.",
        why: "ΔT = \u22120,136 × 1 800/12,5 = \u221219,6 K. ΔU = 0 n'impose ΔT = 0 que si U ne dépend pas du volume, donc pour un gaz parfait. Ici U = C_V T \u2212 a/V : l'énergie potentielle d'attraction augmente, la température baisse." },
      creee: { prompt: "Un gaz parfait triple de volume dans le vide, parois calorifugées. Que valent l'entropie échangée et l'entropie créée, par mole ?",
        options: { a: "Échangée R ln 3, créée nulle.", b: "Toutes deux nulles : Q = 0.", c: "Échangée \u2212R ln 3, créée R ln 3.", d: "Échangée nulle, créée R ln 3 ≈ 9,1 J·K⁻¹." },
        why: "Aucune chaleur reçue : pas d'entropie échangée. L'entropie est une fonction d'état, calculée sur une isotherme réversible entre les mêmes états : R ln(V₂/V₁) = 8,314 × 1,099 = 9,1 J·K⁻¹. Elle est entièrement créée : la détente est irréversible." },
      bouchon: { prompt: "Du diazote à 300 K traverse un bouchon poreux de 2,1 MPa à 0,1 MPa. Son coefficient de Joule–Thomson est voisin de 2,1 K·MPa⁻¹ sur cet intervalle. Température de sortie ?",
        options: { a: "304 K.", b: "296 K.", c: "300 K : le diazote est un gaz parfait à cette pression.", d: "258 K." },
        hint: "ΔT ≈ μ_JT ΔP.",
        why: "ΔT ≈ 2,1 × (0,1 \u2212 2,1) = \u22124,2 K. Le gaz parfait donnerait 0 : c'est justement l'écart au gaz parfait que la détente mesure. Leçon « Détente de Joule–Thomson »." },
      signes: { prompt: "À 300 K sous 0,1 MPa, une détente de Joule–Thomson refroidit le diazote et réchauffe le dihydrogène. Pourquoi ?",
        options: { a: "300 K est sous la température d'inversion du diazote (607 K) et au-dessus de celle du dihydrogène (200 K).", b: "Le dihydrogène est plus léger, donc plus rapide.", c: "Le dihydrogène fournit moins de travail.", d: "Le diazote échange de la chaleur avec le bouchon, pas le dihydrogène." },
        why: "μ_JT C_P ≈ 2a/(RT) \u2212 b : l'attraction refroidit, la répulsion réchauffe. Le puits d'attraction du dihydrogène est si peu profond que la répulsion l'emporte dès 200 K." },
      isenthalpe: { prompt: "Dans le plan (P, T), une isenthalpe du diazote passe par un maximum de température vers 39 MPa. Du gaz part de 45 MPa sur cette courbe et se détend jusqu'à 20 MPa. Que fait sa température ?",
        options: { a: "Elle baisse tout au long de la détente.", b: "Elle ne change pas : l'enthalpie est constante.", c: "Elle monte jusqu'au maximum, puis baisse : la détente traverse la courbe d'inversion.", d: "Elle monte tout au long de la détente." },
        hint: "μ_JT est la pente de l'isenthalpe ; la détente se lit de droite à gauche.",
        why: "À droite du maximum, μ_JT < 0 : détendre réchauffe. À gauche, μ_JT > 0 : détendre refroidit. Le maximum est sur la courbe d'inversion." },
      viriel: { prompt: "À basse pression, μ_JT C_P ≈ T dB/dT \u2212 B, où B(T) est le second coefficient du viriel. Que vaut μ_JT à la température de Boyle, où B = 0 ?",
        options: { a: "Zéro : le gaz y est parfait.", b: "Une valeur négative.", c: "On ne peut rien dire.", d: "Une valeur positive, T dB/dT / C_P : la température d'inversion est plus haute que la température de Boyle." },
        why: "B croît avec T à la température de Boyle, donc dB/dT > 0 et μ_JT > 0. À cette température, Z = 1 à basse pression, mais l'énergie interne et l'enthalpie dépendent encore de la densité. Pour le diazote : Boyle à 326 K, inversion à 607 K. Leçon « Ce que les détentes révèlent des interactions »." },
      liquide: { prompt: "Pourquoi un liquéfacteur de Linde et Hampson liquéfie-t-il l'air pris à 300 K, mais pas l'hélium pris à 300 K ?",
        options: { a: "Parce que l'hélium n'a pas d'état liquide.", b: "Parce que le rendement n'est positif que si le gaz entre sous sa température d'inversion : 607 K pour le diazote, 45 K pour l'hélium, qu'il faut donc prérefroidir.", c: "Parce que l'hélium fuit par les joints.", d: "Parce que l'hélium est monoatomique et que sa capacité thermique est trop faible." },
        why: "Le bilan d'enthalpie donne y = (h_b \u2212 h_e)/(h_b \u2212 h_ℓ), positif seulement si l'enthalpie baisse avec la pression à la température d'entrée, c'est-à-dire si μ_JT > 0. Kamerlingh Onnes a utilisé plusieurs étages de prérefroidissement en 1908." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

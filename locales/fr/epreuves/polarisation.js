/* Épreuve de l'étape « Polarisation d'un diélectrique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lame: { prompt: "Un condensateur plan a ses armatures à 2\u00a0mm. On glisse entre elles, sans les toucher, une lame de verre de 1\u00a0mm d'épaisseur et de constante diélectrique 6. Par combien sa capacité est-elle multipliée ?",
        options: { a: "Environ 1,7.", b: "6.", c: "3,5, la moyenne de 1 et de 6.", d: "2, comme avec une lame de métal." },
        hint: "Le champ vaut σ/ε0 dans le vide et σ/(κε0) dans la lame ; additionnez les tensions.",
        why: "C/C0 = d/(d \u2212 b + b/κ) = 2/(1 + 1/6) ≈ 1,71. Une lame de métal de même épaisseur donnerait 2 (κ → ∞, (10.3)) ; un remplissage complet, 6. Leçon « Constante diélectrique »." },
      isole: { prompt: "Un condensateur plan est chargé sous 50\u00a0V, puis débranché. On remplit alors l'intervalle d'un liquide de κ = 5. Que deviennent la charge des armatures et la tension ?",
        options: { a: "La charge est multipliée par 5, la tension ne change pas.", b: "La charge ne change pas, la tension tombe à 10\u00a0V.", c: "La charge ne change pas, la tension monte à 250\u00a0V.", d: "Les deux sont divisées par 5." },
        why: "Débranché, le condensateur garde sa charge. Le champ dans le liquide est divisé par 1 + χ = 5, (10.9), donc la tension aussi. Branché sur le générateur, c'est la charge qui aurait été multipliée par 5. Leçons « Constante diélectrique » et « Charges de polarisation »." },
      decalage: { prompt: "Un solide contient 5 × 10²⁸ atomes par mètre cube. Sa polarisation vaut 10⁻⁵\u00a0C·m⁻². Si l'on attribue P au décalage d'une charge élémentaire par atome, de combien cette charge est-elle décalée ?",
        options: { a: "D'environ 10⁻¹⁰\u00a0m, la taille d'un atome.", b: "D'environ 10⁻¹²\u00a0m.", c: "D'environ 10⁻¹⁵\u00a0m.", d: "D'environ 10⁻¹⁹\u00a0m." },
        hint: "P = N q δ, (10.4).",
        why: "δ = P/(N e) = 10⁻⁵/(5 × 10²⁸ × 1,6 × 10⁻¹⁹) ≈ 1,3 × 10⁻¹⁵\u00a0m, cent mille fois moins que l'atome : la réponse de la matière est linéaire. Leçon « Vecteur polarisation P »." },
      pression: { prompt: "L'air a κ = 1,000\u202f59 à 293\u00a0K et 101\u202f325\u00a0Pa. Que prévoit le modèle d'un gaz dilué pour l'air à la même température et à dix fois cette pression ?",
        options: { a: "1,000\u202f59 : κ est une propriété du matériau.", b: "1,000\u202f059 : les molécules se gênent.", c: "10,005\u202f9 : tout est multiplié par dix.", d: "1,005\u202f9 : χ est proportionnelle au nombre de molécules par unité de volume." },
        why: "Chaque molécule se polarise de la même façon ; P = N p, donc χ = κ \u2212 1 est proportionnelle à N, et N à la pression (gaz parfait). χ passe de 5,9 × 10⁻⁴ à 5,9 × 10⁻³. Leçons « Vecteur polarisation P » et « Charges de polarisation »." },
      faces: { prompt: "Les armatures d'un condensateur portent ±8\u00a0µC·m⁻², et l'intervalle est rempli d'un isolant de κ = 4. Quelle charge par unité d'aire porte chaque face de l'isolant ?",
        options: { a: "6\u00a0µC·m⁻², de signe opposé à l'armature voisine.", b: "2\u00a0µC·m⁻², de signe opposé à l'armature voisine.", c: "8\u00a0µC·m⁻², comme les armatures.", d: "32\u00a0µC·m⁻², κ fois la charge des armatures." },
        hint: "Le champ dans l'isolant est (σ libre \u2212 σ pol)/ε0, et il vaut σ libre/(κε0).",
        why: "σ_pol = P = σ_libre (1 \u2212 1/κ) = 8 × 3/4 = 6\u00a0µC·m⁻². Il reste 2\u00a0µC·m⁻² pour faire le champ, le quart de celui du vide. Leçon « Charges de polarisation »." },
      rampe: { prompt: "Dans une plaque de 1\u00a0mm d'épaisseur, la polarisation est perpendiculaire aux faces et croît linéairement de 0 à 2 × 10⁻⁵\u00a0C·m⁻². Quelle est la densité de charge de polarisation dans le volume ?",
        options: { a: "Nulle : la polarisation ne laisse de charges qu'aux faces.", b: "\u22120,02\u00a0C·m⁻³, uniforme.", c: "+0,02\u00a0C·m⁻³, uniforme.", d: "\u22122 × 10⁻⁵\u00a0C·m⁻³." },
        hint: "ρ pol = \u2212div P, (10.16).",
        why: "ρ = \u2212dP/dx = \u2212(2 × 10⁻⁵)/(10⁻³) = \u22120,02\u00a0C·m⁻³. La face où P vaut 2 × 10⁻⁵ porte +2 × 10⁻⁵\u00a0C·m⁻², l'autre rien : le total est nul. Leçon « Charges de polarisation »." },
      interface: { prompt: "Un condensateur plan contient deux couches parallèles aux armatures, de constantes diélectriques 3 et 6, sans charge libre entre elles. Quel est le rapport du champ électrique dans la première couche à celui dans la seconde ?",
        options: { a: "1/2 : le champ est plus fort là où κ est grand.", b: "1 : les deux couches sont sous la même tension.", c: "2 : D est la même dans les deux couches, et E = D/(κε0).", d: "Il dépend des épaisseurs des couches." },
        why: "div D = ρ libre = 0 à l'interface : la composante normale de D est continue, et D = σ libre partout. E = D/(κε0) vaut donc deux fois plus dans la couche de κ = 3. Leçon « Équations de l'électrostatique avec diélectriques »." },
      loi: { prompt: "Dans un ferroélectrique, P n'est pas proportionnelle à E. Laquelle de ces relations reste vraie ?",
        options: { a: "D = εE.", b: "P = χ ε0 E.", c: "C = κ ε0 A/d, avec κ fixée.", d: "div D = ρ libre, avec D = ε0 E + P." },
        why: "D = ε0 E + P est une définition, et div D = ρ libre découle de div E = ρ/ε0 et de ρ pol = \u2212div P, sans hypothèse sur la matière. Les trois autres relations supposent une réponse linéaire. Leçons « Équations de l'électrostatique avec diélectriques » et « Charges de polarisation »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

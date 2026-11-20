/* Épreuve de l'étape « Tension superficielle » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      laplace: { prompt: "Une bulle d'air de 10\u00a0µm de rayon est piégée dans de l'eau à 293\u00a0K (γ = 72,7\u00a0mN·m⁻¹). De combien la pression de l'air qu'elle contient dépasse-t-elle celle de l'eau autour ?",
        options: { a: "De 14,5\u00a0kPa : 2γ/R, une seule interface.", b: "De 29,1\u00a0kPa : 4γ/R, comme une bulle de savon.", c: "De 7,3\u00a0kPa : γ/R.", d: "De rien : une bulle dans un liquide est à la pression du liquide." },
        hint: "Combien d'interfaces séparent l'air de l'eau ?",
        why: "Une bulle dans un liquide n'a qu'une interface : Δp = 2γ/R = 2 × 0,0727/10⁻⁵ ≈ 14,5\u00a0kPa. Le 4γ/R est celui d'une bulle de savon, dont le film a deux faces. Leçon « Tension superficielle : une énergie de surface », Δp = 2γ/R." },
      energie: { prompt: "Sur un cadre dont la tige mobile mesure 5\u00a0cm, on étire de 2\u00a0cm un film de savon de tension 30\u00a0mN·m⁻¹. Quel travail a-t-on fourni ?",
        options: { a: "30\u00a0µJ : γ fois l'aire balayée par la tige.", b: "60\u00a0µJ : 2γLx, car le film a deux faces.", c: "1,5\u00a0mJ : γ fois le périmètre du cadre.", d: "Un travail qui croît comme x², comme pour un ressort." },
        why: "L'aire de chaque face croît de L x = 10⁻³\u00a0m², il y a deux faces : W = 2γ L x = 2 × 0,03 × 0,05 × 0,02 = 6 × 10⁻⁵\u00a0J. La force 2γ L est constante, le travail est donc linéaire en x. Leçon « Interpréter un protocole de mesure », F = 2γL." },
      temperature: { prompt: "Un tensiomètre est étalonné sur la table de l'IAPWS à 293\u00a0K, mais l'eau de la cuve est à 298\u00a0K. Quel γ doit-il lire ?",
        options: { a: "72,74\u00a0mN·m⁻¹ : γ ne dépend pas de la température à 5\u00a0K près.", b: "73,5\u00a0mN·m⁻¹ : γ augmente avec T.", c: "Environ 72,0\u00a0mN·m⁻¹ : γ baisse de 0,15\u00a0mN·m⁻¹ par kelvin.", d: "Environ 65\u00a0mN·m⁻¹ : γ baisse de 2\u00a0% par kelvin." },
        why: "D'après la formule de l'IAPWS, γ vaut 71,97\u00a0mN·m⁻¹ à 298,15\u00a0K : \u22120,151\u00a0mN·m⁻¹·K⁻¹, soit 0,2\u00a0% par kelvin. 5\u00a0K d'écart font 1\u00a0%, le double de l'incertitude de la table : la température se tient. Leçons « Tension superficielle : une énergie de surface » et « Mesurer une tension superficielle »." },
      jurin: { prompt: "Un tube de verre propre de 0,1\u00a0mm de rayon intérieur plonge dans de l'eau. Jusqu'où l'eau monte-t-elle ?",
        options: { a: "1,5\u00a0cm.", b: "30\u00a0cm : la loi de Jurin est en 1/r².", c: "Elle ne monte pas : le tube est plus fin que la longueur capillaire.", d: "Environ 15\u00a0cm." },
        hint: "h r = 2 ℓc², avec ℓc = 2,7 mm pour l'eau.",
        why: "h = 2γ\u00a0cos\u00a0θ/(ρ g r) = 2 × 0,0727/(998 × 9,81 × 10⁻⁴) ≈ 0,149\u00a0m. C'est parce que r ≪ ℓc que le ménisque est sphérique et que la loi de Jurin s'applique. Leçon « Interpréter un protocole de mesure »." },
      moitie: { prompt: "Dans le tube de la question précédente, l'eau est montée. Que représente l'énergie potentielle de pesanteur gagnée par la colonne, comparée au travail W fourni par les interfaces ?",
        options: { a: "W/2 : l'autre moitié a été dissipée par la viscosité pendant la montée.", b: "W : l'énergie mécanique se conserve.", c: "2W, car la paroi tire aussi la colonne.", d: "Rien : à l'équilibre, la colonne n'a pas d'énergie potentielle." },
        why: "E(h) = \u2212W(h) + Ep(h), W ∝ h, Ep ∝ h² : au minimum, Ep = W/2. Égaler W et Ep donnerait une hauteur double. Leçon « Interpréter un protocole de mesure », l'énergie E(h)." },
      lc: { prompt: "Une goutte d'éthanol de 0,5\u00a0mm de rayon (γ = 22,4\u00a0mN·m⁻¹, ρ = 791\u00a0kg·m⁻³) est-elle déformée par son poids ?",
        options: { a: "Oui, beaucoup : l'éthanol a une tension trois fois plus faible que l'eau.", b: "Peu : ℓc = 1,7\u00a0mm, Bo = (R/ℓc)² ≈ 0,09 ≪ 1, la goutte reste presque sphérique.", c: "Non, jamais : une goutte est toujours sphérique.", d: "On ne peut rien dire sans connaître la pression atmosphérique." },
        why: "ℓc = √(γ/ρg) = √(0,0224/(791 × 9,81)) ≈ 1,7\u00a0mm. Bo ≈ (0,5/1,7)² ≈ 0,09 : la surface l'emporte sur la pesanteur. Une tension plus faible ne suffit pas : c'est le rapport γ/ρ qui compte. Leçon « Tension superficielle : une énergie de surface », la longueur capillaire ℓc." },
      wilhelmy: { prompt: "Une lame de Wilhelmy de 40,2\u00a0mm de périmètre mouillé donne, extrapolée à immersion nulle, une force de 2,924\u00a0mN. On suppose θ = 0. Que vaut γ ?",
        options: { a: "146\u00a0mN·m⁻¹ : F₀ divisée par la largeur seule.", b: "36,4\u00a0mN·m⁻¹ : F₀ divisée par le double du périmètre.", c: "72,7\u00a0mN·m⁻¹ : F₀/P.", d: "Rien de sûr : il faut d'abord ajouter la poussée d'Archimède à F₀." },
        why: "γ = F₀/P = 2,924 × 10⁻³/0,0402 ≈ 72,7\u00a0mN·m⁻¹, la valeur de l'eau à 293\u00a0K. À d = 0, la poussée est nulle : c'est la raison de l'extrapolation. Leçon « Mesurer une tension superficielle », γ = F₀/P." },
      biais: { prompt: "Un groupe mesure γ = 71,6 ± 0,25\u00a0mN·m⁻¹ (incertitude type) pour de l'eau à 293\u00a0K ; la référence est 72,74 ± 0,36\u00a0mN·m⁻¹. Que faire ?",
        options: { a: "Conclure à l'accord : l'écart n'est que de 1,5\u00a0%.", b: "Doubler l'incertitude annoncée pour que les valeurs se recouvrent.", c: "Corriger la valeur de référence, qui date de 1976.", d: "Chercher un biais : z ≈ 2,6 ≥ 2 ; un angle de contact non nul en est un candidat." },
        why: "z = 1,14/√(0,25² + 0,36²) ≈ 2,6. Un écart incompatible signale une erreur non comptée : lame mal nettoyée (θ ≈ 10° donne \u22121,5\u00a0%), pollution de la surface, thermostat décalé. Gonfler l'incertitude après coup cacherait le défaut. Leçon « Mesurer une tension superficielle », l'écart normalisé z." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

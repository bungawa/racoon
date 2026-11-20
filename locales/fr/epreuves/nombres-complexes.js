/* Épreuve de l'étape « Nombres complexes » : textes en français. Une autre langue = locales/<langue>/epreuves/nombres-complexes.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/nombres-complexes.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      produit: { prompt: "z a pour module 2 et pour argument π/6 ; w a pour module 3 et pour argument π/3. Que vaut zw ?",
        options: { a: "6i.", b: "5i.", c: "6.", d: "6 e^(iπ/18)." },
        hint: "En polaire, que deviennent les modules et les arguments dans un produit ?",
        why: "Multiplier, c'est multiplier les modules et additionner les arguments : module 6, argument π/6 + π/3 = π/2, soit 6 e^(iπ/2) = 6i. La règle des arguments est celle des exposants, e^(iθ₁) e^(iθ₂) = e^(i(θ₁ + θ₂)). Leçons « Nombres complexes » et « Exponentielles imaginaires »." },
      puissance: { prompt: "Que vaut (1 + i)⁸ ?",
        options: { a: "16i.", b: "8.", c: "16.", d: "\u221216." },
        hint: "1 + i a pour module √2 et pour argument π/4.",
        why: "1 + i = √2 e^(iπ/4). À la puissance 8 : (√2)⁸ = 16, et 8 × π/4 = 2π, un tour complet. Les règles des puissances, gardées pour les exposants imaginaires, font de l'élévation à une puissance une multiplication des angles. Leçons « Nombres complexes » et « Exponentielles imaginaires »." },
      amorti: { prompt: "Un oscillateur amorti a pour racines caractéristiques \u22120,1 ± 10i, en s⁻¹ : x(t) est la partie réelle de A e^((\u22120,1 + 10i)t). Combien d'oscillations environ fait-il pendant que son amplitude est divisée par e ?",
        options: { a: "Environ 100.", b: "Environ 1,6.", c: "Environ 0,1.", d: "Environ 16." },
        hint: "e^((\u22120,1 + 10i)t) = e^(\u22120,1 t) e^(10it).",
        why: "La règle des exposants sépare les deux parties. e^(\u22120,1 t) divise l'amplitude par e en 10\u00a0s ; e^(10it) tourne à 10\u00a0rad·s⁻¹, période 2π/10 ≈ 0,63\u00a0s. En 10\u00a0s : 10/0,63 ≈ 16 oscillations. Partie réelle, l'amortissement ; partie imaginaire, la pulsation. Leçons « Nombres complexes » et « Exponentielles imaginaires »." },
      modele: { prompt: "L'oscillateur amorti mx'' + cx' + kx = 0 se résout exactement par les complexes. Quand cette description cesse-t-elle de valoir ?",
        options: { a: "Jamais : l'identité e^(iθ) = cos θ + i sin θ est exacte.", b: "Quand l'amplitude sort du domaine linéaire du ressort, ou que le frottement n'est plus proportionnel à la vitesse. Et si c² ≥ 4mk, les racines sont réelles : il n'y a plus d'oscillation.", c: "Quand θ dépasse 2π.", d: "Quand la partie imaginaire des racines est négative." },
        hint: "La résolution est exacte ; qu'en est-il du modèle ?",
        why: "La résolution est exacte, le modèle ne l'est pas : ressort idéal de raideur k, frottement en cx'. Le signe de c² \u2212 4mk décide du régime : négatif, des racines complexes et des oscillations amorties ; positif, une décroissance sans oscillation. Note de validité de la leçon « Nombres complexes » ; l'identité d'Euler, exacte, vient de la leçon « Exponentielles imaginaires »." },
      serie: { prompt: "Une calculatrice somme la série 1 + z + z²/2 + … de e^(iθ) pour θ = 40, sans ramener θ dans ]\u2212π, π]. Pourquoi le résultat est-il faux, même avec 160 termes ?",
        options: { a: "Parce que la série diverge quand |θ| dépasse π.", b: "Parce que 160 termes ne suffisent pas à rendre la troncature négligeable.", c: "Parce que le plus grand terme, 40⁴⁰/40! ≈ 1,5\u00a0×\u00a010¹⁶, porte à lui seul une erreur d'arrondi de l'ordre de 1, autant que le résultat, de module 1.", d: "Parce que e^(40i) n'existe pas : θ doit être un angle entre \u2212π et π." },
        hint: "Une machine garde environ 16 chiffres significatifs.",
        why: "La série converge pour tout θ, et au-delà de 110 termes la troncature ne compte plus. Mais avec 16 chiffres, un terme de 10¹⁶ n'est connu qu'à l'unité près : les termes géants s'éliminent et emportent les chiffres, comme dans la soustraction 10^s \u2212 1. Ramené dans ]\u2212π, π], vingt termes suffisent. Leçon « Exponentielles imaginaires » ; élimination catastrophique, leçon « Approcher les irrationnels »." },
      quart: { prompt: "Pour quelle valeur réelle de s a-t-on 10^(is) = i ?",
        options: { a: "s ≈ 0,682.", b: "s = π/2 ≈ 1,571.", c: "s = 0,25.", d: "s ≈ 2,729." },
        hint: "10^(is) = e^(i s ln 10), avec ln 10 ≈ 2,3026.",
        why: "10^(is) = e^(iθ) avec θ = s ln 10. i correspond à θ = π/2, d'où s = 1,5708/2,3026 ≈ 0,682. Le tour complet, 10^(is) = 1, demande s = 2π/ln 10 ≈ 2,729. Formule d'Euler, leçon « Exponentielles imaginaires » ; changement de base, leçon « Les opérations inverses »." },
      racine: { prompt: "On écrit √(\u22124) × √(\u22129) = √36 = 6. Où est l'erreur ?",
        options: { a: "Nulle part : le produit de deux racines est la racine du produit.", b: "La règle √a √b = √(ab) n'a été établie que pour a et b positifs ; ici 2i × 3i = \u22126.", c: "√(\u22124) n'existe pas, même parmi les complexes.", d: "Il fallait écrire √(\u221236) = 6i." },
        hint: "Pour quels nombres la règle √a √b = √(ab) a-t-elle été démontrée ?",
        why: "Une règle prolongée ne vaut que là où on l'a construite. √(\u22124) = 2i et √(\u22129) = 3i ; leur produit vaut 6i² = \u22126. C'est le même piège que les puissances fractionnaires d'une base négative. Leçons « Nombres complexes » et « Abstraction et généralisation »." },
      derivee: { prompt: "x(t) est la partie réelle de A e^(iωt). Que dit l'écriture complexe de la vitesse ?",
        options: { a: "Elle vaut ω fois la position, en phase avec elle.", b: "Elle est en retard d'un quart de tour sur la position.", c: "Elle est nulle, car le module de e^(iωt) est constant.", d: "Dériver multiplie par iω : la vitesse a pour amplitude ω|A| et est en avance d'un quart de tour, π/2, sur la position." },
        hint: "Que fait géométriquement la multiplication par i ?",
        why: "La dérivée de e^(iωt) est iω e^(iωt), et multiplier par i, c'est tourner de π/2 dans le plan. La vitesse est donc en avance d'un quart de tour sur la position ; dériver deux fois multiplie par (iω)² = \u2212ω². Leçons « Exponentielles imaginaires » et « Nombres complexes »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

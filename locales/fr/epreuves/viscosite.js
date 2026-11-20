/* Épreuve de l'étape « Viscosité et nombre de Reynolds » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      plaque: { prompt: "Une plaque de 0,5\u00a0m² glisse à 0,2\u00a0m·s⁻¹ sur un film d'eau de 0,5\u00a0mm, à 293\u00a0K, au-dessus d'un fond immobile. Quelle force faut-il pour l'entretenir ?",
        options: { a: "Environ 0,2\u00a0N.", b: "Environ 2 × 10⁻⁴\u00a0N.", c: "Environ 0,4\u00a0N.", d: "Environ 200\u00a0N." },
        hint: "F = η A v₀/d, avec η ≈ 10⁻³\u00a0Pa·s.",
        why: "F = 10⁻³ × 0,5 × 0,2/(5 × 10⁻⁴) = 0,2\u00a0N. Le profil est linéaire tant que v₀d/ν = 100 reste bien sous 1\u202f440. Leçon « La viscosité »." },
      gaz: { prompt: "On chauffe de l'air de 283 à 353\u00a0K à pression constante. Que fait sa viscosité dynamique, et pourquoi ?",
        options: { a: "Elle diminue, comme celle de tout fluide qu'on chauffe.", b: "Elle augmente d'environ 18\u00a0% : les molécules, plus rapides, transportent plus vite la quantité de mouvement d'une couche à l'autre.", c: "Elle ne change pas : la viscosité d'un gaz ne dépend que de la pression.", d: "Elle augmente de 25\u00a0%, comme la température absolue." },
        hint: "Dans un gaz, qui porte la quantité de mouvement entre les couches ?",
        why: "Dans un gaz, la viscosité vient du brassage des couches par les molécules libres : elle croît avec leur vitesse d'agitation, donc avec T, et ne dépend pas de la pression. Celle d'un liquide, au contraire, chute : les sauts moléculaires sont activés par la chaleur. Leçon « La viscosité »." },
      cinematique: { prompt: "L'eau a une viscosité dynamique 55 fois plus grande que l'air. Pourquoi l'air est-il pourtant « plus visqueux » quand on compare viscosité et inertie ?",
        options: { a: "Parce que l'air est compressible.", b: "Parce que la viscosité de l'air croît avec la vitesse.", c: "Parce que l'air est 830 fois moins dense : sa viscosité cinématique ν = η/ρ est 15 fois plus grande.", d: "Parce que l'air colle mieux aux parois." },
        hint: "Le nombre de Reynolds s'écrit VD/ν.",
        why: "C'est ν qui fixe à la fois la diffusion de la quantité de mouvement et le nombre de Reynolds. À 293\u00a0K, ν vaut 1,5 × 10⁻⁵\u00a0m²·s⁻¹ dans l'air, 1,0 × 10⁻⁶ dans l'eau. Leçons « La viscosité » et « Le nombre de Reynolds »." },
      catheter: { prompt: "On remplace un cathéter par un autre de même longueur, de rayon 1,5 fois plus grand. Sous la même pression, en régime laminaire, le débit est multiplié par…",
        options: { a: "1,5.", b: "2,25.", c: "3,4.", d: "environ 5." },
        hint: "Le débit de Poiseuille varie comme une puissance du rayon : laquelle ?",
        why: "Q = π G R⁴/(8η) : 1,5⁴ = 5,06. La section gagne un facteur 2,25 et la vitesse moyenne, proportionnelle à R², un autre facteur 2,25. Leçon « Écoulement visqueux »." },
      laminaire: { prompt: "De l'eau à 293\u00a0K coule à 0,5\u00a0m·s⁻¹ en moyenne dans un tube de 1\u00a0mm de diamètre. La loi de Poiseuille s'applique-t-elle ?",
        options: { a: "Oui : Re ≈ 500, sous le seuil de 2\u202f300, l'écoulement est laminaire loin de l'entrée.", b: "Non : Re ≈ 5 × 10⁵, il est turbulent.", c: "Non : l'eau est trop peu visqueuse pour un écoulement laminaire.", d: "Oui, quelle que soit la vitesse, car le tube est fin." },
        hint: "Re = v D/ν, avec ν = 10⁻⁶\u00a0m²·s⁻¹.",
        why: "Re = 0,5 × 10⁻³/10⁻⁶ = 500. Sous 2\u202f300, le profil parabolique est stable. À 5\u00a0m·s⁻¹, Re = 5\u202f000 et la loi ne vaudrait plus. Leçon « Écoulement visqueux »." },
      diffusion: { prompt: "Un tourbillon de 5\u00a0mm de rayon naît dans de l'eau calme à 293\u00a0K. En combien de temps environ la viscosité l'étale-t-elle sur une distance comparable à sa taille ?",
        options: { a: "En une milliseconde.", b: "En une vingtaine de secondes.", c: "En une heure.", d: "Jamais : le tourbillon d'un fluide visqueux se conserve." },
        hint: "Le tourbillon obéit à une équation de diffusion de diffusivité ν : t ≈ ℓ²/ν.",
        why: "t ≈ (5 × 10⁻³)²/10⁻⁶ = 25\u00a0s. C'est le terme ν∇²Ω de (41.17) : sans lui, dans un fluide parfait, le tourbillon serait conservé. Leçon « Écoulement visqueux »." },
      maquette: { prompt: "La maquette au 1/5 d'une voiture roulant à 36\u00a0m·s⁻¹ dans l'air au sol est testée dans un bassin d'eau à 293\u00a0K. À quelle vitesse faut-il la déplacer pour reproduire l'écoulement ?",
        options: { a: "À 180\u00a0m·s⁻¹, cinq fois plus vite.", b: "À 36\u00a0m·s⁻¹, la même vitesse.", c: "À environ 12\u00a0m·s⁻¹.", d: "À environ 2,5\u00a0m·s⁻¹." },
        hint: "Gardez V L/ν : L est divisé par 5, ν par environ 15.",
        why: "V = 36 × 5 × ν_eau/ν_air = 36 × 5/14,5 ≈ 12\u00a0m·s⁻¹. L'eau, 15 fois moins visqueuse au sens de ν, compense presque le facteur 5 sur la taille. Leçon « Le nombre de Reynolds »." },
      pression: { prompt: "Pour tester des maquettes d'ailes au nombre de Reynolds du vol, la soufflerie à densité variable de 1923 comprimait l'air jusqu'à 2\u00a0MPa. Pourquoi cela marche-t-il ?",
        options: { a: "La pression augmente la viscosité de l'air, donc Re.", b: "L'air comprimé est plus chaud, donc plus visqueux.", c: "La pression augmente la vitesse du son, ce qui permet de souffler plus vite.", d: "La pression multiplie ρ par 20 sans changer η : ν est divisée par 20, et Re multiplié par 20 à vitesse et maquette égales." },
        hint: "La viscosité d'un gaz dépend-elle de sa pression ?",
        why: "η d'un gaz ne dépend pas de la pression (Maxwell, 1866), ρ lui est proportionnelle : Re = ρVD/η croît comme la pression. La vitesse du son, elle, ne dépend que de T : le nombre de Mach ne change pas. Leçons « La viscosité » et « Le nombre de Reynolds »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Le temps » : textes en français. Une autre langue = locales/<langue>/epreuves/le-temps.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/le-temps.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      quartz: { prompt: "Réglée sur les petites oscillations mais battant à 5°, une horloge à pendule retarde de 41\u00a0s par jour, un écart relatif de 4,8\u00a0×\u00a010⁻⁴. Une montre à quartz a un écart relatif d'environ 6\u00a0×\u00a010⁻⁶. De combien dérive-t-elle par jour ?",
        options: { a: "Environ 6\u00a0µs.", b: "Environ 0,5\u00a0s.", c: "Environ 5\u00a0s.", d: "Environ 41\u00a0s, comme toute horloge réglée." },
        hint: "Un jour compte 86\u202f400\u00a0s ; la dérive vaut l'écart relatif fois la durée.",
        why: "La dérive vaut y·t : 6\u00a0×\u00a010⁻⁶ × 86\u202f400\u00a0s ≈ 0,52\u00a0s par jour, quatre-vingts fois moins que le pendule. Formule de dérive de la leçon « Unités et étalons de temps », écart du pendule à 5° de la leçon « Le temps »." },
      carbone: { prompt: "Un os ne contient plus que le huitième du carbone 14 d'un organisme vivant (demi-vie 5\u202f700 ans, vie moyenne τ ≈ 8\u202f200 ans). La fraction restante est mesurée à 1\u00a0% près. Âge et incertitude ?",
        options: { a: "Environ 17\u202f100 ans, à 1\u00a0% près, soit ± 170 ans.", b: "Environ 45\u202f600 ans, à ± 80 ans.", c: "Environ 17\u202f100 ans, à ± 80 ans environ.", d: "Environ 17\u202f100 ans, à ± 57 ans." },
        hint: "Un huitième, c'est 2⁻³. L'âge vaut τ ln(N₀/N) : dérivez par rapport à N.",
        why: "Un huitième, c'est trois demi-vies : 3 × 5\u202f700 = 17\u202f100 ans. L'âge vaut t = τ ln(N₀/N) : une erreur relative de 1\u00a0% sur N donne une erreur absolue de τ × 0,01 ≈ 82 ans, quel que soit l'âge. Décroissance de la leçon « Les temps longs », propagation de la leçon « Incertitude absolue et incertitude relative »." },
      pion: { prompt: "Un pion neutre vit en moyenne τ ≈ 8,4\u00a0×\u00a010⁻¹⁷\u00a0s dans son propre référentiel. Lancé avec βγ = 4, quel parcours moyen ℓ = βγcτ laisse-t-il avant de se désintégrer ?",
        options: { a: "Environ 1\u00a0×\u00a010⁻⁷\u00a0m.", b: "Environ 2,5\u00a0×\u00a010⁻⁸\u00a0m.", c: "Environ 6\u00a0×\u00a010⁻⁹\u00a0m.", d: "Environ 0,3\u00a0m." },
        hint: "c ≈ 3,0\u00a0×\u00a010⁸\u00a0m·s⁻¹.",
        why: "ℓ = 4 × 3,0\u00a0×\u00a010⁸ × 8,4\u00a0×\u00a010⁻¹⁷ ≈ 1,0\u00a0×\u00a010⁻⁷\u00a0m, mesurable au microscope dans une émulsion. Aucun oscillateur ne compte 10⁻¹⁶\u00a0s, mais une longueur et une vitesse connue donnent la durée : c'est la définition opérationnelle « distance divisée par vitesse ». Oublier βγ donne cτ ≈ 2,5\u00a0×\u00a010⁻⁸\u00a0m, quatre fois trop court. Leçons « Les temps courts » et « Mesurer le mouvement : temps et distance »." },
      isochrone: { prompt: "On veut une horloge à pendule qui ne dérive pas de plus d'une seconde par jour, soit 1,2\u00a0×\u00a010⁻⁵ en relatif. Pourquoi la formule T = 2π√(L/g), valable « aux petites oscillations », ne suffit-elle pas à la régler ?",
        options: { a: "Parce qu'elle ne vaut qu'au-dessous de 0,1°.", b: "Parce que la masse du pendule modifie la période.", c: "Parce que g change de 10⁻⁵ d'un jour à l'autre.", d: "Parce qu'à 5° elle se trompe déjà de 4,8\u00a0×\u00a010⁻⁴, soit 41\u00a0s par jour : il faut une amplitude constante, pas seulement petite." },
        hint: "Comparez l'écart de la formule à 5° à la tolérance demandée.",
        why: "L'écart de la formule croît comme θ₀²/16 (formule de Borda) : 4,8\u00a0×\u00a010⁻⁴ à 5°, quarante fois la tolérance. « Petit » n'est pas « nul ». L'horloge reste juste si l'amplitude ne varie pas, car on règle alors L sur la période réelle : d'où l'échappement, qui entretient une amplitude fixe. Leçon « Le temps » ; la tolérance s'exprime en écart relatif comme dans « Unités et étalons de temps »." },
      altitude: { prompt: "Deux horloges identiques sont posées l'une au rez-de-chaussée, l'autre 30\u00a0m plus haut. Dire qu'elles battent au même rythme néglige un écart relatif gh/c². Pour quelles horloges serait-il visible ?",
        options: { a: "gh/c² ≈ 3\u00a0×\u00a010⁻¹⁵ : visible pour une fontaine à césium (10⁻¹⁶) ou une horloge optique, pas pour une montre à quartz (6\u00a0×\u00a010⁻⁶).", b: "Pour aucune : le temps s'écoule pareil pour tous les observateurs immobiles.", c: "Pour toutes : 30\u00a0m donnent un écart de 3\u00a0×\u00a010⁻⁶.", d: "Seulement si les horloges bougent l'une par rapport à l'autre." },
        hint: "g ≈ 9,8\u00a0m·s⁻², c ≈ 3,0\u00a0×\u00a010⁸\u00a0m·s⁻¹. Comparez à l'écart relatif de chaque horloge.",
        why: "9,81 × 30/(3,0\u00a0×\u00a010⁸)² ≈ 3,3\u00a0×\u00a010⁻¹⁵. Un effet est invisible quand sa taille relative est très inférieure à l'incertitude relative de l'instrument : 10⁻¹⁶ le voit, 6\u00a0×\u00a010⁻⁶ non. La leçon « Unités et étalons de temps » donne 1,1\u00a0×\u00a010⁻¹⁶ par mètre, et les écarts relatifs des horloges." },
      etalon: { prompt: "On ne peut tester une horloge qu'avec une autre horloge. Comment a-t-on pu établir que la rotation de la Terre est irrégulière ?",
        options: { a: "En la comparant au temps vrai, que mesurent les astronomes.", b: "En constatant que le jour dure toujours 86\u202f400\u00a0s exactement.", c: "Des horloges de principes sans rapport, quartz puis césium, s'accordent entre elles bien mieux qu'avec la Terre : on retient l'étalon qui s'accorde le mieux avec tout le reste.", d: "On ne l'a pas établi : c'est une convention adoptée en 1967." },
        hint: "Il n'existe pas de temps « vrai » auquel comparer.",
        why: "La confiance vient de l'accord de mécanismes qui n'ont rien en commun ; chaque nouvelle horloge révèle les irrégularités de l'ancienne. Les horloges atomiques montrent un jour qui fluctue de quelques millisecondes et s'allonge d'environ 1,8\u00a0ms par siècle. Leçons « Le temps » et « Unités et étalons de temps »." },
      choix: { prompt: "Il faut dater un zircon de 2 milliards d'années, et chronométrer une particule qui vit 10⁻¹⁶\u00a0s. Quelles méthodes ?",
        options: { a: "Le carbone 14 pour le zircon, un oscilloscope pour la particule.", b: "L'uranium–plomb pour le zircon ; pour la particule, la longueur de son parcours à vitesse connue.", c: "L'uranium–plomb pour le zircon, une horloge à césium pour la particule.", d: "Compter des varves pour le zircon, un oscillateur à quartz pour la particule." },
        hint: "Une horloge doit avoir une période comparable à la durée à mesurer.",
        why: "Une horloge radioactive sert si sa demi-vie est comparable à la durée : 4,5 milliards d'années pour l'uranium 238, alors que 2 milliards d'années font 3,5\u00a0×\u00a010⁵ demi-vies du carbone 14, dont il ne reste rien. À 10⁻¹⁶\u00a0s, aucun oscillateur ne suit : la période du césium, 10⁻¹⁰\u00a0s, est un million de fois plus longue. On mesure une distance divisée par une vitesse. Leçons « Les temps longs » et « Les temps courts »." },
      jour: { prompt: "Supposons le jour solaire plus long que 86\u202f400 secondes SI de 1\u00a0ms, constamment. Au bout de combien de temps la rotation terrestre retarde-t-elle d'une seconde sur le temps atomique ?",
        options: { a: "Au bout d'un jour.", b: "Environ 1\u202f000 ans.", c: "Jamais : on corrige la seconde SI pour suivre la Terre.", d: "Environ 1\u202f000 jours, près de 3 ans." },
        hint: "Chaque jour ajoute le même retard.",
        why: "Chaque jour ajoute 1\u00a0ms : la seconde est atteinte après 1\u202f000 jours, 2,7 ans. C'est le premier terme de l'écart cumulé de la leçon « Unités et étalons de temps » ; si le jour s'allonge en plus, l'écart finit par croître comme le carré du temps. La seconde SI, comptée sur le césium, ne change jamais : on corrige l'étiquette des instants d'UTC. Durée comme nombre de répétitions d'un phénomène, leçon « Le temps »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Ce qu'est la physique » : textes en français. Une autre langue = locales/<langue>/epreuves/panorama-physique.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/panorama-physique.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      gps: { prompt: "Un satellite de navigation va à 3\u202f874\u00a0m·s⁻¹ par rapport au centre de la Terre : γ \u2212 1 ≈ v²/(2c²) ≈ 8\u00a0×\u00a010⁻¹¹. Quel retard son horloge prend-elle par jour, effet de vitesse seul ?",
        options: { a: "Environ 7\u00a0ns.", b: "Environ 7\u00a0µs.", c: "Environ 7\u00a0ms.", d: "Aucun : 8\u00a0×\u00a010⁻¹¹, c'est nul en pratique." },
        hint: "Un jour compte 86\u202f400\u00a0s.",
        why: "8,3\u00a0×\u00a010⁻¹¹ × 86\u202f400\u00a0s ≈ 7,2\u00a0×\u00a010⁻⁶\u00a0s. Invisible pour une balance, cet écart est énorme pour une horloge atomique : la lumière parcourt 2\u00a0km en 7\u00a0µs, et le système de navigation doit le corriger. « Invisible » n'est pas « inexistant ». Leçon « Qu'est-ce que la physique ? »." },
      seuil: { prompt: "Quand la mécanique de Newton, qui tient la masse pour indépendante de la vitesse, cesse-t-elle de valoir ?",
        options: { a: "Au-delà d'une vitesse fixe, environ 0,1 c, quelle que soit la mesure.", b: "Jamais aux vitesses humaines : la correction y est nulle.", c: "Dès que l'objet bouge.", d: "Quand la correction γ \u2212 1 ≈ v²/(2c²) atteint la précision de la mesure : vers 4\u00a0×\u00a010⁵\u00a0m·s⁻¹ pour une précision relative de 10⁻⁶." },
        hint: "Une loi est juste à une précision près. Égalez la correction à la précision.",
        why: "Une loi n'est ni vraie ni fausse : elle est juste à une précision près. v²/(2c²) = 10⁻⁶ donne v = c√(2\u00a0×\u00a010⁻⁶) ≈ 4,2\u00a0×\u00a010⁵\u00a0m·s⁻¹. Le seuil dépend de l'instrument autant que de la vitesse. Leçon « Qu'est-ce que la physique ? » ; même démarche pour les lois de Coulomb et de Newton, leçon « La physique avant 1920 »." },
      grains: { prompt: "Pour comparer force électrique et poids, on traite deux grains de quartz de 1\u00a0mm, distants de 30\u00a0m, comme des charges ponctuelles immobiles. Qu'est-ce qui rend cette description légitime ?",
        options: { a: "Leur taille vaut 3\u00a0×\u00a010⁻⁵ fois leur distance, et les charges ne bougent pas : ni forme, ni champ magnétique, ni retard de propagation à prendre en compte.", b: "La force électrique ne dépend pas de la distance.", c: "Leur charge totale est trop petite pour compter.", d: "La loi de Coulomb est exacte pour tout objet, à toute distance." },
        hint: "La loi en 1/r² vaut pour quels objets, et dans quel état de mouvement ?",
        why: "La loi de Coulomb vaut pour des charges ponctuelles ou à symétrie sphérique, immobiles. 1\u00a0mm devant 30\u00a0m, c'est un rapport de 3\u00a0×\u00a010⁻⁵ ; pour des charges rapides s'ajouteraient le champ magnétique et le retard de propagation. Note de validité de la leçon « La physique avant 1920 » ; le champ qui voyage à vitesse finie, même leçon." },
      confine: { prompt: "On enferme une particule dans 10⁻¹⁵\u00a0m, la taille d'un noyau. Avec Δp ≈ ħ/(2Δx), quelle énergie cinétique minimale pour un électron et pour un proton, face aux 8\u00a0MeV qui lient un nucléon ?",
        options: { a: "Quelques électronvolts pour les deux : ils tiennent.", b: "Environ 5\u00a0MeV pour l'électron, 100\u00a0MeV pour le proton.", c: "Environ 100\u00a0MeV pour l'électron, qui ne tient pas ; environ 5\u00a0MeV pour le proton, qui tient.", d: "Plus de 100\u00a0MeV pour les deux : aucun ne tient." },
        hint: "La même quantité de mouvement coûte bien plus d'énergie à une particule légère.",
        why: "Δp ≈ 5\u00a0×\u00a010⁻²⁰\u00a0kg·m·s⁻¹. Pour l'électron, pc ≈ 100\u00a0MeV, très au-dessus de son énergie de masse : énergie cinétique ≈ 98\u00a0MeV. Pour le proton, 1\u202f836 fois plus lourd, p²/(2m) ≈ 5\u00a0MeV. Seul le proton reste sous les 8\u00a0MeV de liaison. Leçons « La physique quantique » et « Noyaux et particules »." },
      yukawa: { prompt: "La force nucléaire porte à environ 1,4\u00a0fm. Avec R ≈ ħ/(mc) et ħc ≈ 197,3\u00a0MeV·fm, quelle énergie de masse a son messager ?",
        options: { a: "Environ 140\u00a0MeV.", b: "Environ 0,5\u00a0MeV.", c: "Environ 280\u00a0MeV.", d: "Environ 940\u00a0MeV." },
        hint: "mc² ≈ ħc/R.",
        why: "mc² ≈ ħc/R = 197,3/1,4 ≈ 141\u00a0MeV : la masse du pion chargé, 139,57\u00a0MeV. L'argument combine l'inégalité de Heisenberg, qui ne tolère un emprunt d'énergie mc² que pendant ħ/(mc²), et la vitesse limite c ; il ne vaut qu'à un facteur 2 près. Leçons « Noyaux et particules » et « La physique quantique »." },
      photon: { prompt: "Un photon de lumière visible a une fréquence d'environ 5\u00a0×\u00a010¹⁴\u00a0Hz ; un photon radio, 10⁸\u00a0Hz. Avec E = hf, lequel peut modifier une liaison chimique, qui vaut quelques électronvolts ?",
        options: { a: "Les deux : l'énergie d'une onde dépend de son intensité, pas de sa fréquence.", b: "Le photon visible, environ 2\u00a0eV, l'échelle d'une liaison ; le photon radio, 4\u00a0×\u00a010⁻⁷\u00a0eV, n'y touche pas.", c: "Le photon radio, dont la longueur d'onde est plus grande.", d: "Aucun : seuls les rayons gamma portent des électronvolts." },
        hint: "h ≈ 4,1\u00a0×\u00a010⁻¹⁵\u00a0eV·s.",
        why: "E = hf = 4,1\u00a0×\u00a010⁻¹⁵ × 5\u00a0×\u00a010¹⁴ ≈ 2,1\u00a0eV : la lumière visible échange son énergie par paquets hf, de la taille d'une liaison chimique. Un photon radio en porte cinq millions de fois moins. C'est la même onde électromagnétique ; seule change la fréquence, et avec elle le comportement qui domine. Leçons « La physique avant 1920 », « La physique quantique » et « Noyaux et particules »." },
      newton: { prompt: "Pourquoi enseigne-t-on encore la mécanique de Newton, que la relativité a mise en défaut ?",
        options: { a: "Parce qu'elle est exacte tant que la vitesse reste inférieure à c.", b: "Parce que la relativité n'est pas encore confirmée par l'expérience.", c: "Parce que, dans son domaine, ses écarts sont plus petits que la précision des mesures ; on dit en même temps où elle cesse de valoir.", d: "Par tradition : elle est fausse, mais plus simple." },
        hint: "Une approximation peut être numériquement excellente et conceptuellement fausse.",
        why: "La correction vaut 7\u00a0×\u00a010⁻¹⁵ pour une voiture ; elle devient visible pour une horloge en orbite, et la relativité générale explique les 43″ par siècle du périhélie de Mercure. On enseigne la loi simple avec son domaine chiffré, et l'expérience reste seule juge. Leçons « Qu'est-ce que la physique ? » et « La physique avant 1920 »." },
      gravite: { prompt: "Le Modèle standard ne contient pas la gravitation. Pourquoi peut-on pourtant l'ignorer dans une collision entre deux protons ?",
        options: { a: "Parce que la gravitation ne s'exerce pas entre particules élémentaires.", b: "Parce que la gravitation a une portée de l'ordre du femtomètre.", c: "Parce que les protons ne sont pas élémentaires.", d: "Parce qu'entre deux protons, l'attraction gravitationnelle est 10³⁶ fois plus faible que la répulsion électrique, à toute distance, et plus faible encore que la force nucléaire." },
        hint: "Gravitation et force électrique décroissent toutes deux en 1/r².",
        why: "Les deux forces décroissent en 1/r² : leur rapport, 1,2\u00a0×\u00a010³⁶ pour deux protons, ne dépend pas de la distance. La gravitation n'est pas absente, elle est négligeable à cette échelle ; elle ne domine que pour des masses énormes et électriquement neutres. Leçons « La physique avant 1920 » et « Noyaux et particules »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

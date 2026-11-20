/* Épreuve de l'étape « Intervalles d'espace-temps » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      melange: { prompt: "Un vaisseau passe à l'origine à 0,6\u00a0c selon x. Au même instant pour le sol (ct = 0), un événement a lieu en x = 3\u00a0m. Quelle coordonnée ct′ le vaisseau lui donne-t-il ?",
        options: { a: "\u22122,25\u00a0m : pour le vaisseau, l'événement a eu lieu avant son passage.", b: "0 : simultané pour le sol, il l'est pour tous.", c: "+2,25\u00a0m : il a lieu après.", d: "\u22121,8\u00a0m : seul le terme ux/c² compte, sans facteur γ." },
        hint: "ct′ = γ(ct \u2212 βx), avec γ = 1,25 pour β = 0,6.",
        why: "ct′ = 1,25 × (0 \u2212 0,6 × 3\u00a0m) = \u22122,25\u00a0m. La position x s'est mélangée au temps du vaisseau. Leçons « La géométrie de l'espace-temps » et « Passé, présent, futur : le cône de lumière »." },
      invariant: { prompt: "Qu'est-ce qui reste inchangé quand on tourne les axes d'un plan, et quand on change de référentiel par la transformation de Lorentz ?",
        options: { a: "Les coordonnées x et y dans un cas, la date t dans l'autre.", b: "x² + y² pour la rotation ; c²t² \u2212 x² \u2212 y² \u2212 z² pour Lorentz.", c: "x² + y² dans les deux cas.", d: "Rien dans un cas comme dans l'autre." },
        why: "Une rotation conserve la somme des carrés, la distance. Lorentz conserve une différence de carrés, l'intervalle : les fonctions hyperboliques y remplacent cos et sin. Leçons « La géométrie de l'espace-temps » et « L'intervalle d'espace-temps »." },
      metre: { prompt: "Mesurée en « mètres de temps », c'est-à-dire par ct, que vaut une durée de 1\u00a0µs ?",
        options: { a: "3,34\u00a0m.", b: "3 × 10⁸\u00a0m.", c: "Environ 300\u00a0m.", d: "1\u00a0µm." },
        why: "ct = 299\u202f792\u202f458\u00a0m·s⁻¹ × 10⁻⁶\u00a0s ≈ 300\u00a0m. Réciproquement, un mètre de temps vaut 3,34\u00a0ns. Leçon « L'intervalle d'espace-temps »." },
      horloge: { prompt: "Deux événements sont séparés au sol de Δx = 900\u00a0m et Δt = 4\u00a0µs. Un vaisseau va de l'un à l'autre à vitesse constante. Que marque son horloge ?",
        options: { a: "Rien : l'intervalle est de genre espace, aucun vaisseau ne peut les relier.", b: "4\u00a0µs, comme au sol.", c: "0 : l'intervalle est de genre lumière.", d: "Environ 2,6\u00a0µs : l'intervalle est de genre temps, et l'horloge marque s/c." },
        hint: "Comparez cΔt à Δx, puis calculez s² = (cΔt)² \u2212 Δx².",
        why: "cΔt ≈ 1199\u00a0m > 900\u00a0m : genre temps. s² ≈ 1199² \u2212 900² ≈ 6,3 × 10⁵\u00a0m², s ≈ 792\u00a0m, soit s/c ≈ 2,64\u00a0µs. Pour le vaisseau, les deux événements ont lieu au même endroit. Leçon « L'intervalle d'espace-temps »." },
      autre: { prompt: "Un observateur trouve s² = \u221216\u00a0m² entre deux événements. Que trouve un autre observateur qui va à 0,9\u00a0c par rapport au premier ?",
        options: { a: "\u221216\u00a0m² aussi : l'intervalle est de genre espace pour tous.", b: "+16\u00a0m².", c: "\u221216\u00a0m² multiplié par γ² ≈ 5,3.", d: "0, car à 0,9\u00a0c tout intervalle tend vers zéro." },
        why: "s² ne dépend pas de l'observateur, à toute vitesse inférieure à c : (17.3). Son signe, donc le genre, non plus. Leçon « L'intervalle d'espace-temps »." },
      simultane: { prompt: "Par rapport à O, un événement P est en x = 4\u00a0m, ct = 2\u00a0m. Existe-t-il un observateur, en mouvement selon x, pour qui P et O sont simultanés ?",
        options: { a: "Non : P est dans le futur de O.", b: "Oui, à u = 0,5\u00a0c ; plus vite dans ce sens, il voit P avant O.", c: "Non : il faudrait u = 2\u00a0c.", d: "Oui, à u = 0,5\u00a0c, mais l'ordre ne s'inverse jamais au-delà." },
        hint: "u = c²t/x, soit u/c = ct/x.",
        why: "ct = 2\u00a0m < x = 4\u00a0m : P est dans l'ailleurs de O. u/c = 2/4 = 0,5. Au-delà, t′ change de signe : l'ordre de deux événements de genre espace dépend de l'observateur. Leçon « Passé, présent, futur : le cône de lumière »." },
      region: { prompt: "Un événement P a lieu à 3\u00a0m de O, 5\u00a0ns après lui. Dans quelle région de O se trouve-t-il ?",
        options: { a: "Dans le futur de O : il a lieu après.", b: "Sur le cône de lumière de O.", c: "Dans l'ailleurs de O : rien de ce qui part de O ne peut l'atteindre.", d: "Dans le passé de O." },
        hint: "Combien de mètres la lumière parcourt-elle en 5\u00a0ns ?",
        why: "c × 5\u00a0ns ≈ 1,5\u00a0m < 3\u00a0m : l'intervalle est de genre espace. « Après » n'est vrai que pour certains observateurs. Leçon « Passé, présent, futur : le cône de lumière »." },
      detecteurs: { prompt: "Une même onde gravitationnelle, venue de très loin à la vitesse c, arrive à deux détecteurs distants de 3002\u00a0km. Quel écart entre les deux arrivées est impossible ?",
        options: { a: "0\u00a0ms.", b: "7\u00a0ms.", c: "10\u00a0ms.", d: "15\u00a0ms." },
        hint: "3002\u00a0km/c ≈ 10\u00a0ms.",
        why: "L'écart ne peut pas dépasser le trajet de la lumière d'un site à l'autre, 10\u00a0ms : les deux arrivées sont de genre espace ou lumière, jamais l'une dans le futur de l'autre. 7\u00a0ms est l'écart observé le 14 septembre 2015. Leçon « Passé, présent, futur : le cône de lumière »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

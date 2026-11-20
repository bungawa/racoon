/* Épreuve de l'étape « Orbitales moléculaires » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      rayon: { prompt: "Selon les règles de Slater, la charge effective d'un électron 2p passe de 3,25 (carbone) à 4,55 (oxygène). Que devient le rayon n²a₀/Z* de l'orbitale 2p ?",
        options: { a: "Il diminue d'environ 29\u00a0% : de 65 à 47\u00a0pm, car il varie comme 1/Z*.", b: "Il augmente, car l'oxygène a plus d'électrons.", c: "Il ne change pas : n reste égal à 2.", d: "Il diminue de moitié, car il varie comme 1/Z*²." },
        hint: "Le rayon est proportionnel à n²/Z*.",
        why: "r = n²a₀/Z* : 4 × 52,9/3,25 ≈ 65\u00a0pm, 4 × 52,9/4,55 ≈ 47\u00a0pm. Chaque proton ajouté dans la période n'est écranté qu'à 0,35 par l'électron ajouté. C'est l'énergie hydrogénoïde qui varie comme Z*², et elle chiffre mal. Leçon « Orbitales atomiques en chimie »." },
      electroneg: { prompt: "Les orbitales 2p valent \u221210,7\u00a0eV pour le carbone et \u221215,9\u00a0eV pour l'oxygène. Que dit cet écart ?",
        options: { a: "Le carbone est plus électronégatif : ses orbitales sont plus proches de zéro.", b: "L'oxygène retient mieux ses électrons et attire ceux du carbone : il est plus électronégatif, et la liaison C=O est polarisée vers lui.", c: "Rien sur la liaison : les énergies atomiques disparaissent dans la molécule.", d: "Que l'oxygène est plus polarisable que le carbone." },
        why: "Une orbitale de valence basse traduit une charge effective forte : c'est l'électronégativité. Dans la molécule, la liante porte le plus gros coefficient sur l'atome aux orbitales basses. Leçons « Orbitales atomiques en chimie » et « Interaction de deux orbitales et orbitales de fragments »." },
      recouvrement: { prompt: "Deux orbitales identiques, d'énergie α, se recouvrent avec S = 0,25. Dans quel rapport sont la montée de l'antiliante et la descente de la liante ?",
        options: { a: "1 : les deux déplacements sont égaux.", b: "0,6 : la liante descend davantage.", c: "(1 + S)/(1 \u2212 S) ≈ 1,67 : l'antiliante monte davantage.", d: "4, le rapport 1/S." },
        hint: "Les énergies sont (α ± β)/(1 ± S).",
        why: "Montée (αS \u2212 β)/(1 \u2212 S), descente (αS \u2212 β)/(1 + S) : rapport 1,25/0,75 ≈ 1,67. C'est pourquoi quatre électrons dans une liante et une antiliante repoussent, comme dans He₂. Négliger S rend les déplacements égaux, avec une erreur de l'ordre de S. Leçon « Interaction de deux orbitales et orbitales de fragments »." },
      dissymetrie: { prompt: "Dans le fluorure d'hydrogène, la 1s de H (\u221213,6\u00a0eV) interagit avec la 2p de F (\u221218,7\u00a0eV). Que sont la σ liante et la σ* ?",
        options: { a: "Toutes deux également partagées entre H et F.", b: "La liante surtout sur H, l'antiliante surtout sur F.", c: "Deux orbitales non liantes du fluor.", d: "La liante surtout sur F, l'antiliante surtout sur H : chacune ressemble à l'orbitale atomique la plus proche en énergie." },
        why: "Écart 5,1\u00a0eV : le mélange est inégal. La liante descend sous la 2p du fluor et lui emprunte son caractère ; la liaison est polarisée vers F. Les 2pₓ et 2p_y du fluor, de symétrie π, restent non liantes. Leçons « Interaction de deux orbitales et orbitales de fragments » et « Diagramme d'orbitales moléculaires »." },
      o2: { prompt: "Que prévoit le diagramme d'orbitales moléculaires pour O₂ que le schéma de Lewis ne prévoit pas ?",
        options: { a: "Deux électrons célibataires de même spin dans les deux π*, donc une molécule paramagnétique, avec un indice de liaison 2.", b: "Une liaison triple.", c: "Une molécule diamagnétique d'indice 2.", d: "L'absence de liaison." },
        why: "Douze électrons de valence ; les deux derniers vont, un par orbitale, dans deux π* de même énergie (Hund). Indice (8 \u2212 4)/2 = 2. Faraday avait vu en 1847 que l'oxygène est attiré par un aimant. Leçon « Diagramme d'orbitales moléculaires »." },
      melange: { prompt: "La plus haute orbitale occupée de N₂ est σ, celle de O₂ est π*. Qu'est-ce qui place σ (2p) au-dessus des π dans N₂ ?",
        options: { a: "Le nombre d'électrons plus petit de N₂.", b: "Le mélange des orbitales σ issues de 2s et de 2p, fort quand l'écart 2s–2p est petit : 12,4\u00a0eV pour N, contre 16,5\u00a0eV pour O.", c: "Le recouvrement latéral, plus grand que l'axial.", d: "La règle de Hund." },
        hint: "2s et 2p_z ont la même symétrie σ.",
        why: "Deux orbitales de même symétrie interagissent d'autant plus que leurs énergies sont proches. Le mélange repousse σ (2p) vers le haut. La photoélectronique le mesure : N₂ perd d'abord un électron σ, à 15,58\u00a0eV ; un électron π coûte 16,70\u00a0eV. Leçons « Diagramme d'orbitales moléculaires » et « Interaction de deux orbitales et orbitales de fragments »." },
      carbonyle: { prompt: "Un nucléophile attaque un aldéhyde. Sur quel atome, et pourquoi ?",
        options: { a: "Sur l'oxygène, plus électronégatif.", b: "Sur l'oxygène, qui porte le plus gros coefficient de la π.", c: "Sur le carbone : la BV est la π*, et elle porte son plus gros coefficient sur le carbone.", d: "Sur l'hydrogène de l'aldéhyde." },
        why: "Le nucléophile donne sa HO à la BV de l'électrophile. La π* du carbonyle ressemble à la 2p du carbone, la plus haute des deux : coefficient plus grand, recouvrement plus grand. L'approche se fait vers 105° de la liaison C=O (Bürgi et Dunitz). Leçon « Orbitales frontalières et réactivité »." },
      ecart: { prompt: "Deux nucléophiles ont leur HO à \u221210\u00a0eV et à \u22128\u00a0eV ; l'électrophile a sa BV à 0\u00a0eV ; le couplage vaut \u22121\u00a0eV pour les deux. Quel rapport des stabilisations prévoit l'approximation des orbitales frontalières ?",
        options: { a: "1 : seul le couplage compte.", b: "0,8 en faveur du premier.", c: "1,56, le carré de 10/8.", d: "1,25 en faveur du second : 2β²/8 contre 2β²/10." },
        hint: "ΔE ≈ 2β²/[E(BV) \u2212 E(HO)].",
        why: "0,25\u00a0eV contre 0,20\u00a0eV : la HO la plus haute réagit le mieux. L'approximation vaut ici car |β| = 1\u00a0eV ≪ 8\u00a0eV ; le calcul à deux orbitales donne un écart inférieur à 3\u00a0%. Elle cesse de valoir entre ions de charges opposées, sous contrôle de charge. Leçon « Orbitales frontalières et réactivité »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

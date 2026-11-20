/* Épreuve de l'étape « Synchrotron cosmique et effet Doppler » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      spectre: { prompt: "Les filaments de la nébuleuse du Crabe donnent un spectre de raies, sa région centrale un spectre continu et polarisé. Quelle description de la région centrale rend compte des deux propriétés ?",
        options: { a: "Des électrons d'énergies très variées qui tournent autour des lignes d'un champ magnétique.", b: "Un gaz très chaud d'atomes qui vibrent à leurs fréquences propres.", c: "De la poussière éclairée par les étoiles voisines.", d: "Des atomes qui s'approchent et s'éloignent : l'effet Doppler étale leurs raies." },
        why: "Chaque électron rayonne jusqu'à sa fréquence critique, en γ² ; la distribution des énergies remplit le spectre. La lumière est polarisée perpendiculairement à la projection du champ sur le ciel. Leçon « Le rayonnement synchrotron cosmique »." },
      energie: { prompt: "Dans un champ de 30\u00a0nT, un électron rayonne jusqu'à 5 × 10¹⁴\u00a0Hz (visible). Quel γ faut-il pour qu'il rayonne jusqu'à 2 × 10¹⁸\u00a0Hz (rayons X), dans le même champ ?",
        options: { a: "4000 fois plus grand.", b: "Environ 63 fois plus grand.", c: "Le même : la fréquence ne dépend que du champ.", d: "16 fois plus grand." },
        hint: "La fréquence critique croît comme γ²B.",
        why: "Le rapport des fréquences vaut 4000 ; γ croît comme sa racine, √4000 ≈ 63. Leçon « Le rayonnement synchrotron cosmique »." },
      vie: { prompt: "La durée de vie d'un électron synchrotron vaut τ = γmₑc²/P avec P ∝ γ²B². Qu'en conclut-on de la lumière X du Crabe, vue près de mille ans après l'explosion ?",
        options: { a: "Rien : les électrons de l'explosion suffisent à toutes les fréquences.", b: "Que le champ magnétique y est nul.", c: "Que des électrons neufs sont injectés en permanence : ceux qui émettent les rayons X ne vivent que des années ou des dizaines d'années.", d: "Que les électrons gagnent de l'énergie en rayonnant." },
        why: "τ ∝ 1/(γB²) : plus la fréquence est haute, plus γ est grand et plus la vie est courte. C'est le pulsar central, découvert en 1968, qui fournit cette énergie. Leçon « Le rayonnement synchrotron cosmique »." },
      cone: { prompt: "Un électron de γ = 20 est dévié par un noyau, son accélération perpendiculaire à sa vitesse. Dans quel cône part la moitié de l'énergie rayonnée ?",
        options: { a: "Dans un demi-espace, vers l'avant.", b: "Dans un cône de 20° environ.", c: "Dans un cône de 1/γ² ≈ 0,14°.", d: "Dans un cône de demi-angle 0,55/γ ≈ 1,6° autour de la vitesse." },
        why: "Le facteur (1 \u2212 β cos θ)⁵ du dénominateur concentre le rayonnement dans un cône de quelques 1/γ ; la moitié de l'énergie est à moins de 0,55/γ. Leçon « Le rayonnement de freinage »." },
      tube: { prompt: "Un tube à rayons X fonctionne sous 60\u00a0kV. Quelle est la plus courte longueur d'onde de son spectre continu ?",
        options: { a: "Environ 21\u00a0pm, par λₘᵢₙ = hc/(eU).", b: "Environ 2,1\u00a0nm.", c: "Aucune : le spectre de freinage s'étend à toutes les fréquences.", d: "Environ 60\u00a0pm, fixée par le tungstène de l'anode." },
        hint: "hc/e ≈ 1,24 × 10⁻⁶\u00a0V·m.",
        why: "1,24 × 10⁻⁶/60\u202f000 ≈ 2,1 × 10⁻¹¹\u00a0m. Un électron ne peut céder à un photon plus que son énergie eU : loi de Duane et Hunt, hors de portée du calcul classique. Leçon « Le rayonnement de freinage »." },
      approche: { prompt: "Une source de pulsation propre ω₀ s'approche à v = 0,8c. Quelle pulsation reçoit l'observateur ?",
        options: { a: "5ω₀, par 1/(1 \u2212 β).", b: "3ω₀.", c: "1,8ω₀, par 1 + β.", d: "ω₀/3." },
        hint: "√((1 + β)/(1 \u2212 β)).",
        why: "√(1,8/0,2) = 3. Le rapprochement des crêtes donne 1/(1 \u2212 β) = 5 ; la dilatation du temps de l'horloge de l'atome multiplie par √(1 \u2212 β²) = 0,6. Leçon « L’effet Doppler »." },
      transverse: { prompt: "Une source passe à 0,8c, sa vitesse perpendiculaire à la ligne de visée au moment de l'émission (θ = 90°, mesuré par l'observateur). La pulsation reçue vaut :",
        options: { a: "ω₀ : il n'y a ni rapprochement ni éloignement.", b: "ω₀/0,6 ≈ 1,67ω₀.", c: "0,6ω₀ : il reste la dilatation du temps, ω = ω₀/γ.", d: "0,2ω₀." },
        why: "ω = ω₀/(γ(1 \u2212 β cos θ)) avec cos θ = 0 : ω₀/γ = 0,6ω₀. C'est l'effet Doppler transverse ; Ives et Stilwell en ont mesuré la cause, la dilatation du temps, en 1938. Leçon « L’effet Doppler »." },
      symetrie: { prompt: "Le calcul de la source qui avance donne ω₀√(1 \u2212 β²)/(1 \u2212 β), celui de l'observateur qui avance ω₀(1 + β)/√(1 \u2212 β²). Que montre leur comparaison ?",
        options: { a: "Que la lumière a un milieu de propagation, comme le son.", b: "Que l'effet Doppler dépend de qui se déplace vraiment.", c: "Que les deux formules diffèrent au premier ordre en β.", d: "Qu'elles sont identiques, et ne le sont que grâce aux facteurs de dilatation du temps : seule compte la vitesse relative." },
        why: "Multiplier haut et bas de la première par 1 + β donne la seconde. Sans les racines, on aurait 1/(1 \u2212 β) et 1 + β, qui diffèrent au second ordre. Leçon « L’effet Doppler »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

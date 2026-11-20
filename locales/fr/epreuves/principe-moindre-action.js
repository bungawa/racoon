/* Épreuve de l'étape « Le principe de moindre action » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      mode: { prompt: "Une boule de 0,26 kg reste 1 s en l'air. On ajoute à son trajet vrai 20 cm × sin(2πt/T), qui s'annule aux deux bouts. De combien l'action change-t-elle ?",
        options: { a: "Elle augmente d'environ 0,10 J·s : m a² n²π²/(4T), quatre fois plus que le mode 1 à amplitude égale.", b: "Elle diminue d'environ 0,10 J·s : le mode 2 abaisse toujours l'action.", c: "Elle augmente d'environ 0,05 J·s, proportionnellement à a.", d: "Elle ne change pas : un mode pair a une moyenne nulle." },
        hint: "Pesanteur uniforme : l'écart est exactement ½ m ∫ η̇² dt.",
        why: "Pour la pesanteur, k = 0 : ΔS = (a²T/4) m n²π²/T² = 0,04 × 0,26 × 4π²/4 ≈ 0,10 J·s. Il n'y a pas de terme en a, le trajet vrai étant stationnaire, et le terme en a² est positif pour tout mode : un minimum. Leçon « Le principe de moindre action »." },
      col: { prompt: "Un ressort de 10 N·m⁻¹ porte 0,1 kg. La masse part de l'équilibre et doit y être 0,7 s plus tard. Que dire du trajet vrai, rester au repos ?",
        options: { a: "C'est un minimum de l'action, comme tout trajet vrai.", b: "C'est un col : les modes 1 et 2 abaissent l'action, les suivants l'élèvent.", c: "C'est un maximum : tous les modes abaissent l'action.", d: "Il n'existe pas : aucun trajet ne relie ces deux états." },
        hint: "Comptez les entiers n inférieurs à ωT/π.",
        why: "ω = 10 rad·s⁻¹, ωT/π = 7/π ≈ 2,2. Le facteur m n²π²/T² \u2212 k est négatif pour n = 1 et 2, positif à partir de 3. Le trajet reste stationnaire, mais ce n'est pas un minimum. Leçon « Le principe de moindre action »." },
      phase: { prompt: "Pour une boule de 0,26 kg en l'air 1 s, la phase S/ħ d'un trajet voisin tourne d'un radian dès un écart de 10⁻¹⁷ m ; pour un électron libre pendant 1 ns, dès 0,2 µm. Qu'en conclure ?",
        options: { a: "Les deux suivent une trajectoire nette, puisque le principe d'action vaut pour les deux.", b: "Aucun des deux n'a de trajectoire : la mécanique quantique s'applique à tout.", c: "La boule a une trajectoire nette ; l'électron explore des trajets écartés de dimensions atomiques et plus, il n'a pas de trajectoire à cette échelle.", d: "L'électron va plus vite que la boule, donc sa phase tourne moins." },
        why: "Seuls les trajets dont la phase diffère de moins d'un radian environ du trajet stationnaire ajoutent leurs amplitudes. Pour la boule, cette bande est minuscule ; pour l'électron, elle dépasse la taille d'un atome. Leçon « Le principe de moindre action »." },
      capa: { prompt: "Condensateur cylindrique, b/a = 4. La vraie valeur de C/(2πε0) est 0,721. Un potentiel d'essai linéaire donne 0,833, le meilleur essai quadratique 0,733. Que montrent ces nombres ?",
        options: { a: "Que l'essai quadratique est faux, puisqu'il ne donne pas 0,721.", b: "Que l'estimation peut tomber d'un côté ou de l'autre de la vraie valeur.", c: "Que l'erreur sur C est du même ordre que l'erreur sur le potentiel.", d: "Que toute estimation est trop grande, et que l'essai le plus bas est le meilleur : 16 % d'erreur avec une droite, 1,7 % avec le meilleur quadratique." },
        hint: "Le vrai potentiel minimise U*, et U* = ½ C V².",
        why: "Tout potentiel d'essai a un U* au moins égal au minimum : C est surestimée, et l'on peut classer deux essais sans connaître la vraie valeur. L'erreur est du second ordre : un essai moyen donne déjà un bon résultat. Leçons « Le principe de moindre action » et « Compléments sur la moindre action »." },
      parallele: { prompt: "Un courant de 7 A se partage entre 10 Ω, 20 Ω et 40 Ω en parallèle. Quel partage rend la chaleur minimale, et que vaut-elle ?",
        options: { a: "4 A, 2 A et 1 A sous 40 V : 280 W, le partage d'Ohm.", b: "7/3 A dans chaque branche : le partage égal.", c: "7 A dans 10 Ω seulement : 490 W.", d: "1 A, 2 A et 4 A : plus de courant dans la plus grande résistance." },
        hint: "Au minimum, toutes les branches ont la même tension.",
        why: "Conductance totale 0,1 + 0,05 + 0,025 = 0,175 S : U = 7/0,175 = 40 V, d'où 4, 2 et 1 A et P = U I = 280 W. Le partage égal dissiperait 7²/9 × 70 ≈ 381 W. Leçon « Compléments sur la moindre action »." },
      non: { prompt: "Une des branches suit V = R i + β i³. Le partage réel des courants est-il celui de chaleur minimale ?",
        options: { a: "Oui : la nature minimise toujours la chaleur dégagée.", b: "Non : le partage réel égalise les tensions, ce qui minimise le contenu, somme des ∫ V di ; il ne coïncide avec la chaleur minimale que pour des conducteurs ohmiques.", c: "Non : le partage réel maximise la chaleur.", d: "Oui, mais seulement si β est négatif." },
        why: "Le contenu vaut P/2 pour Ohm, et non pour une caractéristique courbée. Avec 10 Ω et 20 Ω + 20 V·A⁻³ sous 1 A : partage réel 0,687 A, chaleur minimale à 0,702 A, où les tensions diffèrent de 0,53 V. Leçon « Compléments sur la moindre action »." },
      bord: { prompt: "En établissant l'équation de Poisson par la variation de U*, on obtient un terme de surface. Pourquoi disparaît-il ?",
        options: { a: "Parce que le champ est nul sur les conducteurs.", b: "Parce qu'on néglige les termes du second ordre.", c: "Parce que la variation f du potentiel est nulle sur les conducteurs, dont le potentiel est imposé.", d: "Parce que la charge ρ est nulle partout." },
        why: "Comme η(t1) = η(t2) = 0 pour les trajets, on compare des potentiels qui prennent les valeurs imposées sur les conducteurs : f y est nulle, et le terme ∫ f ∇φ·n da aussi. Leçon « Le principe de moindre action »." },
      entropie: { prompt: "Un réseau de conducteurs ohmiques dissipe 280 W dans un milieu à 350 K. Quelle entropie produit-il par seconde, et dans quel domaine sa minimisation garde-t-elle un sens ?",
        options: { a: "98 000 W·K⁻¹ ; pour tout système.", b: "Zéro, puisque le régime est permanent ; à l'équilibre seulement.", c: "280 W·K⁻¹ ; seulement pour des gaz.", d: "0,8 W·K⁻¹ ; pour des états stationnaires proches de l'équilibre, où les flux sont proportionnels aux forces." },
        why: "P/T = 280/350 = 0,8 W·K⁻¹. À température uniforme, minimiser la chaleur ou l'entropie produite revient au même ; le théorème de production minimale d'entropie ne vaut que dans le régime linéaire. Leçon « Compléments sur la moindre action »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Structure hyperfine de l'hydrogène » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      base: { prompt: "Un atome de deutérium a un électron de spin 1/2 et un noyau de spin 1, à trois états. Combien d'états de base de spin compte son état fondamental ?",
        options: { a: "6 = 2 × 3.", b: "5 = 2 + 3.", c: "4, comme l'hydrogène.", d: "9 = 3 × 3." },
        why: "Un état de base dit l'état de chaque particule : 2 choix pour l'électron, 3 pour le noyau, 6 combinaisons. Leçon « Les états de base de deux particules de spin 1/2 »." },
      produit: { prompt: "L'état (|++⟩ + |\u2212\u2212⟩)/√2 est-il un produit d'un état de l'électron et d'un état du proton ?",
        options: { a: "Oui : l'électron et le proton selon +x.", b: "Non : C₁C₄ \u2212 C₂C₃ = 1/2 ≠ 0, il est intriqué.", c: "Oui, car ses amplitudes sont réelles.", d: "On ne peut pas le savoir sans le hamiltonien." },
        hint: "Un produit vérifie C₁C₄ = C₂C₃.",
        why: "C₁ = C₄ = 1/√2 et C₂ = C₃ = 0 : C₁C₄ \u2212 C₂C₃ = 1/2. Les deux spins sont toujours trouvés égaux selon z, sans qu'aucun n'ait de direction propre. Leçon « Les états de base de deux particules de spin 1/2 »." },
      symetrie: { prompt: "Pourquoi, sans champ extérieur, le hamiltonien de spin de l'hydrogène fondamental doit-il être E₀ + A σe·σp ?",
        options: { a: "Parce que l'électron est beaucoup plus léger que le proton.", b: "Parce que les moments magnétiques sont parallèles aux spins.", c: "Parce qu'aucune direction n'est privilégiée : le seul scalaire linéaire en chaque spin est σe·σp.", d: "Parce que la mesure de la raie l'impose." },
        why: "Un terme comme σez ou σpx changerait quand on tourne l'atome. La symétrie de rotation laisse une constante et σe·σp ; la valeur de A vient de l'expérience. Leçon « Le hamiltonien de l'état fondamental de l'hydrogène »." },
      action: { prompt: "Que vaut σe·σp |\u2212+⟩ ?",
        options: { a: "|\u2212+⟩.", b: "\u22123|\u2212+⟩.", c: "2|\u2212+⟩ \u2212 |+\u2212⟩.", d: "2|+\u2212⟩ \u2212 |\u2212+⟩." },
        hint: "σxσx et σyσy retournent les deux spins ; σzσz donne le produit des signes.",
        why: "σexσpx|\u2212+⟩ = |+\u2212⟩, σeyσpy|\u2212+⟩ = (\u2212i)(i)|+\u2212⟩ = |+\u2212⟩, σezσpz|\u2212+⟩ = \u2212|\u2212+⟩. Total 2|+\u2212⟩ \u2212 |\u2212+⟩, (12.12). Leçon « Le hamiltonien de l'état fondamental de l'hydrogène »." },
      dirac: { prompt: "Avec la règle de Dirac σe·σp = 2Péch \u2212 1, que vaut σe·σp sur (|+\u2212⟩ \u2212 |\u2212+⟩)/√2 ?",
        options: { a: "\u22123 fois cet état : l'échange le change de signe, 2 × (\u22121) \u2212 1 = \u22123.", b: "+1 fois cet état.", c: "0.", d: "Ce n'est pas un état propre." },
        why: "Échanger les spins change |+\u2212⟩ \u2212 |\u2212+⟩ en |\u2212+⟩ \u2212 |+\u2212⟩ = \u2212(|+\u2212⟩ \u2212 |\u2212+⟩) : Péch = \u22121, d'où σe·σp = \u22123 et l'énergie \u22123A. Leçons « Le hamiltonien de l'état fondamental de l'hydrogène » et « Les niveaux d'énergie hyperfins »." },
      niveaux: { prompt: "Un atome est préparé dans |+\u2212⟩. Avec quelles probabilités une mesure d'énergie donne-t-elle A et \u22123A ?",
        options: { a: "1 et 0 : |+\u2212⟩ est dans le triplet.", b: "1/2 et 1/2 : |+\u2212⟩ = (triplet m = 0 + singulet)/√2.", c: "3/4 et 1/4, comme les poids statistiques.", d: "0 et 1 : |+\u2212⟩ est l'état fondamental." },
        why: "|+\u2212⟩ = [(|+\u2212⟩ + |\u2212+⟩)/√2 + (|+\u2212⟩ \u2212 |\u2212+⟩)/√2]/√2 : probabilité 1/2 pour chacun. C'est pourquoi |+\u2212⟩ bascule vers |\u2212+⟩ : il superpose deux énergies. Leçons « Le hamiltonien de l'état fondamental de l'hydrogène » et « Les niveaux d'énergie hyperfins »." },
      raie: { prompt: "La raie de l'hydrogène vaut 1 420 405 751,768 Hz. Combien d'oscillations le champ d'une onde à cette fréquence fait-il pendant le basculement |+\u2212⟩ → |\u2212+⟩ → |+\u2212⟩ d'un atome ?",
        options: { a: "Environ 1,4 milliard.", b: "Deux.", c: "Une : la période du basculement, h/4A, est celle de la raie.", d: "Aucune : le basculement est instantané." },
        why: "Le basculement se fait à la fréquence de la différence des deux énergies, 4A/h = f. Une période de basculement dure 1/f ≈ 0,70 ns, une période de l'onde. Leçons « Le hamiltonien de l'état fondamental de l'hydrogène » et « Les niveaux d'énergie hyperfins »." },
      doppler: { prompt: "Un radiotélescope reçoit la raie de l'hydrogène à 1 420,88 MHz. Comment se déplace le nuage qui l'émet ?",
        options: { a: "Il s'éloigne à environ 100 km·s⁻¹.", b: "Il est immobile : la raie est trop fine pour être décalée.", c: "Il est plus chaud que le Soleil.", d: "Il s'approche, à environ 100 km·s⁻¹ : Δf = +0,47 MHz = f v/c." },
        hint: "Une fréquence reçue plus haute signifie une source qui s'approche.",
        why: "Δf = 1 420,88 \u2212 1 420,41 ≈ 0,47 MHz ; v = c Δf/f ≈ 3 × 10⁸ × 0,47/1 420 ≈ 1,0 × 10⁵ m·s⁻¹, vers nous. Leçon « Les niveaux d'énergie hyperfins »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

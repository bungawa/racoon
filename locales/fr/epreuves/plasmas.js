/* Épreuve de l'étape « Plasmas : propagation et confinement » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      ionosonde: { prompt: "Une ionosonde voit ses échos disparaître au-dessus de 4,5\u00a0MHz, de nuit. Quelle est la densité d'électrons au maximum de la couche ?",
        options: { a: "Environ 2,5\u00a0×\u00a010¹¹ électrons par mètre cube.", b: "Environ 5\u00a0×\u00a010⁵ électrons par mètre cube.", c: "Environ 2,5\u00a0×\u00a010¹⁴ électrons par mètre cube.", d: "Environ 4,5\u00a0×\u00a010⁶ électrons par mètre cube." },
        hint: "fp ≈ 8,98 √n, n en m⁻³ et fp en hertz.",
        why: "n = (4,5\u00a0×\u00a010⁶/8,98)² ≈ 2,5\u00a0×\u00a010¹¹ m⁻³. Au-dessus de foF2, la fréquence de l'onde dépasse partout la fréquence plasma locale : l'onde traverse et ne revient pas. Leçons « Modèle du plasma » et « Propagation dans un plasma et ionosphère »." },
      neutralite: { prompt: "Un tube à décharge de 1\u00a0cm de diamètre contient 10¹⁶ électrons par mètre cube à 10⁴ K. Peut-on le traiter comme un plasma quasi neutre ?",
        options: { a: "Non : la longueur de Debye, environ 7\u00a0mm, est comparable au tube.", b: "Oui : la longueur de Debye vaut environ 70\u00a0µm, cent fois moins que le tube.", c: "Non : il faudrait au moins 10²⁰ électrons par mètre cube.", d: "Oui, mais seulement si les ions sont à la même température." },
        hint: "λD = √(ε0 kB T/(n e²)).",
        why: "λD = √(8,85\u00a0×\u00a010⁻¹²\u00a0×\u00a01,38\u00a0×\u00a010⁻¹⁹/(10¹⁶\u00a0×\u00a02,57\u00a0×\u00a010⁻³⁸)) ≈ 6,9\u00a0×\u00a010⁻⁵ m. Les écarts à la neutralité se limitent aux gaines de quelques λD contre la paroi. Leçon « Modèle du plasma »." },
      puissance: { prompt: "Une onde radio de 10\u00a0MHz traverse une couche ionosphérique où les collisions sont négligeables. Quelle puissance moyenne cède-t-elle aux électrons ?",
        options: { a: "La moitié de la puissance qu'elle transporte.", b: "Une puissance proportionnelle à n e² E0²/(me ω).", c: "Aucune : la conductivité est imaginaire pure, le courant est en quadrature avec le champ, et ⟨j·E⟩ = ½ Re(σ) E0² = 0.", d: "Toute sa puissance, si la fréquence est inférieure à la fréquence plasma." },
        why: "Les électrons accélérés puis freinés par le champ lui rendent, pendant un quart de période, l'énergie reçue pendant le précédent. Même sous la coupure, l'onde n'est pas absorbée : elle est réfléchie. Seules les collisions donnent une partie réelle à σ. Leçon « Modèle du plasma »." },
      groupe: { prompt: "Une impulsion de fréquence porteuse 2 fp traverse un plasma uniforme. À quelle vitesse avance-t-elle ?",
        options: { a: "c, comme dans le vide.", b: "1,15 c, la vitesse de phase.", c: "c/2.", d: "Environ 0,87 c, la vitesse de groupe c√(1 \u2212 fp²/f²)." },
        hint: "vφ vg = c².",
        why: "vg = c√(1 \u2212 1/4) ≈ 0,866 c ; la vitesse de phase vaut c²/vg ≈ 1,15 c, mais les crêtes ne portent pas l'impulsion. Leçon « Propagation dans un plasma et ionosphère »." },
      evanescence: { prompt: "Une onde de 1\u00a0MHz arrive sur un plasma de 10¹² électrons par mètre cube (fp ≈ 9\u00a0MHz). Sur quelle profondeur le champ pénètre-t-il ?",
        options: { a: "Environ 5\u00a0m : δ = c/√(ωp² \u2212 ω²), presque c/ωp.", b: "Environ 300\u00a0m, la longueur d'onde dans le vide.", c: "Environ 2\u00a0mm, la longueur de Debye.", d: "Indéfiniment : le plasma est transparent." },
        hint: "Sous la coupure, k est imaginaire pur.",
        why: "ωp ≈ 5,6\u00a0×\u00a010⁷ rad·s⁻¹, ω ≈ 6,3\u00a0×\u00a010⁶ rad·s⁻¹ : δ ≈ 3\u00a0×\u00a010⁸/5,6\u00a0×\u00a010⁷ ≈ 5,3\u00a0m. L'onde évanescente ne transporte aucune puissance en moyenne ; l'onde incidente repart entière. Leçon « Propagation dans un plasma et ionosphère »." },
      bifrequence: { prompt: "Un récepteur mesure un retard ionosphérique de 3\u00a0m sur le signal L1 du GPS (1\u202f575,42\u00a0MHz). Que vaut le retard sur L2 (1\u202f227,60\u00a0MHz) ?",
        options: { a: "3\u00a0m : l'ionosphère retarde de la même façon toutes les fréquences.", b: "Environ 4,9\u00a0m, car le retard varie comme 1/f².", c: "Environ 3,9\u00a0m, car le retard varie comme 1/f.", d: "Environ 2,3\u00a0m, car le retard croît avec la fréquence." },
        hint: "ΔL ≈ 40,3 Nc/f².",
        why: "3\u00a0×\u00a0(1\u202f575,42/1\u202f227,60)² ≈ 3\u00a0×\u00a01,647 ≈ 4,9\u00a0m. La différence des deux pseudo-distances donne Nc, et la combinaison (f1² P1 \u2212 f2² P2)/(f1² \u2212 f2²) supprime le retard au premier ordre. Leçon « Propagation dans un plasma et ionosphère »." },
      cone: { prompt: "Un miroir magnétique a un rapport Bmax/B0 = 2. Les vitesses des particules au centre sont réparties uniformément dans toutes les directions. Quelle fraction s'échappe au premier passage ?",
        options: { a: "La moitié, celles qui vont vers un bout.", b: "Aucune : le champ magnétique ne travaille pas.", c: "Environ 29 % : le cône de perte a un demi-angle de 45°, et les deux cônes couvrent la fraction 1 \u2212 cos 45° des directions.", d: "Les électrons seulement, plus légers." },
        hint: "sin² αc = B0/Bmax ; un cône de demi-angle α couvre la fraction (1 \u2212 cos α)/2 des directions.",
        why: "sin² αc = 1/2, αc = 45°. Deux cônes : 2\u00a0×\u00a0(1 \u2212 cos 45°)/2 ≈ 0,29. Le résultat ne dépend ni de la masse, ni de la charge, tant que μ est un invariant. Leçon « Confinement magnétique et fusion »." },
      lawson: { prompt: "Un plasma de deutérium et de tritium à 10\u00a0keV contient 10²⁰ électrons par mètre cube. Dans le modèle à zéro dimension, quel temps de confinement de l'énergie faut-il pour l'allumage ?",
        options: { a: "Environ 3\u00a0ms.", b: "Environ 0,3\u00a0s.", c: "Environ 30\u00a0s.", d: "Environ 3\u00a0s : n τE = 12 kB T/(⟨σv⟩ Eα) ≈ 3\u00a0×\u00a010²⁰ s·m⁻³, avec ⟨σv⟩ ≈ 1,1\u00a0×\u00a010⁻²² m³·s⁻¹." },
        hint: "Eα = 3,5\u00a0MeV ; kB T = 10\u00a0keV.",
        why: "12\u00a0×\u00a010/(1,14\u00a0×\u00a010⁻²²\u00a0×\u00a03\u202f500) ≈ 3,0\u00a0×\u00a010²⁰ s·m⁻³, donc τE ≈ 3\u00a0s. Le rayonnement et l'hélium, oubliés, rendent le vrai seuil plus exigeant. Leçon « Confinement magnétique et fusion »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

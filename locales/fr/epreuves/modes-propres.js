/* Épreuve de l'étape « Modes propres » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      lourde: { prompt: "Une bosse passe d'une corde à une corde quatre fois plus lourde par mètre, sous la même tension. Quelle part de son amplitude revient, et avec quel signe ?",
        options: { a: "Un tiers, retournée : Z₂ = 2Z₁ et r = (Z₁ \u2212 Z₂)/(Z₁ + Z₂) = \u22121/3.", b: "Un tiers, du même côté.", c: "Les trois quarts, retournée.", d: "Rien : la tension est la même des deux côtés." },
        hint: "L'impédance d'une corde vaut √(Tμ).",
        why: "Z = √(Tμ) double quand μ quadruple. (49.2b) donne r = \u22121/3 : un écho retourné qui emporte r² = 1/9 de l'énergie ; les 8/9 passent. Leçon « Réflexion des ondes »." },
      noeuds: { prompt: "Une onde sinusoïdale de 500\u00a0Hz, sur une corde où c = 200\u00a0m·s⁻¹, se réfléchit sur un bout fixe. Où la corde reste-t-elle immobile ?",
        options: { a: "Tous les 40\u00a0cm, à partir de 20\u00a0cm du bout.", b: "Sur le bout, puis tous les 20\u00a0cm : λ/2 = c/(2f).", c: "Nulle part : l'onde avance.", d: "Seulement sur le bout." },
        why: "(49.3) : l'amplitude vaut 2|sin(ωx/c)|, nulle tous les λ/2. Ici λ = 200/500 = 0,40\u00a0m. Leçon « Réflexion des ondes »." },
      quinte: { prompt: "Une corde de 65\u00a0cm donne 330\u00a0Hz. On la bloque de sorte que seuls ses deux tiers vibrent (43,3\u00a0cm), sans changer la tension. Quel est le nouveau fondamental ?",
        options: { a: "220\u00a0Hz.", b: "330\u00a0Hz : la tension n'a pas changé.", c: "495\u00a0Hz : f₁ = c/2L, inversement proportionnel à la longueur.", d: "660\u00a0Hz." },
        why: "(49.6a) : 330 × 3/2 = 495\u00a0Hz, la quinte. Leçon « Ondes confinées et fréquences propres »." },
      cinquieme: { prompt: "On pince une corde au cinquième de sa longueur. Quels modes, parmi les douze premiers, ne sont pas excités ?",
        options: { a: "Les modes pairs.", b: "Aucun : pincer excite tous les modes.", c: "Le mode 1 seulement.", d: "Les modes 5 et 10 : le point pincé est un de leurs nœuds." },
        why: "(49.6b) : bₙ ∝ sin(nπ/5), nul pour n multiple de 5. Leçon « Ondes confinées et fréquences propres »." },
      carre: { prompt: "Membrane carrée, bords fixes. Que vaut le rapport des fréquences du mode (1, 2) et du mode (1, 1) ?",
        options: { a: "√(5/2) ≈ 1,58, et le mode (2, 1) a exactement la même fréquence que (1, 2).", b: "2, comme pour une corde.", c: "√2 ≈ 1,41.", d: "5/2." },
        why: "(49.10a) : ω ∝ √(n² + m²) pour a = b, soit √5 contre √2. Les deux modes (1, 2) et (2, 1) sont dégénérés : leur mélange est encore un mode. Leçon « Modes propres à deux dimensions »." },
      pendules: { prompt: "Deux pendules identiques de période 1\u00a0s sont reliés par un ressort tel que k/(mω₀²) = 0,1. Quelles sont les fréquences des deux modes ?",
        options: { a: "1\u00a0Hz et 1,2\u00a0Hz : la pulsation du mode rapide est multipliée par 1 + 2k/(mω₀²).", b: "1\u00a0Hz et 1,095\u00a0Hz : ω₂² = ω₀² + 2k/m = 1,2 ω₀².", c: "0,95\u00a0Hz et 1,05\u00a0Hz.", d: "1,05\u00a0Hz seulement : le ressort impose une fréquence commune." },
        hint: "Écrivez (49.17) et résolvez pour ω².",
        why: "(49.18) : ω₁ = ω₀ (en phase, le ressort ne travaille pas), ω₂ = ω₀√1,2. Pour toute autre fréquence, (49.16) n'a que la solution nulle. Leçon « Pendules couplés »." },
      perles: { prompt: "Trois perles de 5\u00a0g sont enfilées à 25\u00a0cm l'une de l'autre sur un fil d'un mètre tendu à 50\u00a0N. Que vaut la fréquence de leur mode le plus grave ?",
        options: { a: "25,0\u00a0Hz exactement, comme la corde continue de même masse.", b: "50\u00a0Hz.", c: "24,4\u00a0Hz : 2√(T/(ma)) sin(π/8)/2π, un peu sous les 25\u00a0Hz de la corde continue.", d: "Il y a trois fondamentaux de même fréquence." },
        why: "(49.18b) : √(50/(0,005 × 0,25)) = 200\u00a0s⁻¹, ω₁ = 400 sin(π/8) = 153\u00a0rad·s⁻¹. La corde de même masse linéique (20\u00a0g·m⁻¹) a c = 50\u00a0m·s⁻¹ et f₁ = 25\u00a0Hz. Leçon « Modes d'un système linéaire »." },
      boite: { prompt: "Un électron est confiné entre deux murs infranchissables distants de 1\u00a0nm (E₁ = 0,376\u00a0eV). Quelle énergie faut-il pour le faire passer du niveau 1 au niveau 2 ?",
        options: { a: "0,376\u00a0eV : les niveaux sont équidistants, comme les fréquences d'une corde.", b: "0,752\u00a0eV.", c: "1,50\u00a0eV.", d: "1,13\u00a0eV : Eₙ = n²E₁, donc E₂ \u2212 E₁ = 3E₁." },
        why: "(49.5a) : les nombres d'onde sont ceux de la corde, nπ/L, mais l'énergie est en k². 3 × 0,376 = 1,13\u00a0eV, celle d'un photon de 1,1\u00a0µm environ. Leçon « Modes d'un système linéaire »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

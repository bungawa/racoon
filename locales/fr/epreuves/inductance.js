/* Épreuve de l'étape « Inductance » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      alternateur: { prompt: "Un alternateur donne une force électromotrice sinusoïdale d'amplitude 40\u00a0V et débite dans une résistance de 20\u00a0Ω ; l'inductance de la bobine est négligeable. Quelle puissance moyenne faut-il fournir à son arbre, frottements mis à part ?",
        options: { a: "40\u00a0W.", b: "80\u00a0W.", c: "20\u00a0W.", d: "Zéro : la force électromotrice a une moyenne nulle." },
        hint: "La puissance mécanique est ℰ i à chaque instant ; prenez sa moyenne.",
        why: "ℰ₀²/(2R) = 1\u202f600/40 = 40\u00a0W. 80\u00a0W oublie le facteur ½ de la moyenne de sin² ; la force électromotrice a une moyenne nulle, pas son produit par le courant. Leçon « Alternateur »." },
      barre: { prompt: "Une barre de 200\u00a0g et de 20\u00a0cm glisse sans frottement sur deux rails reliés par 0,05\u00a0Ω, dans un champ de 0,5\u00a0T perpendiculaire au plan. Lancée à 1\u00a0m·s⁻¹, quelle est sa constante de temps de freinage, et quelle distance parcourt-elle ?",
        options: { a: "0,1\u00a0s et 10\u00a0cm.", b: "1\u00a0s et 1\u00a0m.", c: "1\u00a0s et une distance infinie, puisque la vitesse ne s'annule jamais.", d: "10\u00a0s et 10\u00a0m." },
        hint: "τ = mR/(B²w²) ; la distance est v₀τ.",
        why: "τ = 0,2 × 0,05/(0,25 × 0,04) = 1\u00a0s, et l'intégrale de v₀e^(\u2212t/τ) vaut v₀τ = 1\u00a0m. La vitesse tend vers zéro sans s'annuler, mais la distance converge. Leçon « Alternateur »." },
      mutuelle: { prompt: "Un solénoïde de 500 spires, 25\u00a0cm de long et 2\u00a0cm² de section porte en son milieu une bobine de 100 spires. Que vaut leur inductance mutuelle, et quelle force électromotrice apparaît dans la bobine si le courant du solénoïde monte de 2\u00a0A en 1\u00a0ms ?",
        options: { a: "50\u00a0mH et 100\u00a0V.", b: "5\u00a0µH et 10\u00a0mV.", c: "Environ 50\u00a0µH et 0,1\u00a0V.", d: "Environ 50\u00a0µH, mais la tension dépend du rayon de la bobine de 100 spires." },
        why: "M = μ₀N₁N₂S/l = 1,26 × 10⁻⁶ × 500 × 100 × 2 × 10⁻⁴/0,25 ≈ 5,0 × 10⁻⁵\u00a0H, et |ℰ₂| = M dI₁/dt = 5 × 10⁻⁵ × 2\u202f000 = 0,1\u00a0V. Le rayon de la bobine extérieure ne compte pas : le champ hors d'un solénoïde long est presque nul. Leçon « Inductance mutuelle »." },
      symetrie: { prompt: "Pour mesurer l'inductance mutuelle entre une grande bobine de chauffage par induction et une petite sonde, on préfère alimenter la sonde et lire la tension aux bornes de la grande bobine. Obtient-on la même valeur qu'en faisant l'inverse ?",
        options: { a: "Non : la petite sonde crée un champ trop faible, M serait sous-estimée.", b: "Non : M₁₂ et M₂₁ ne sont égales que pour deux bobines identiques.", c: "Oui, mais seulement si les deux bobines sont coaxiales.", d: "Oui : M₁₂ = M₂₁ pour deux circuits quelconques, la formule de Neumann étant symétrique." },
        why: "L'intégrale double ∮∮ ds₁·ds₂/r₁₂ ne change pas quand on échange les circuits, quelles que soient leurs tailles et positions. La figure de « Inductance mutuelle » le vérifie en sommant les deux flux point par point." },
      serie: { prompt: "Deux bobines de 3\u00a0mH et 12\u00a0mH, branchées en série de façon que leurs flux s'ajoutent, présentent 21\u00a0mH. Que valent leur inductance mutuelle et leur coefficient de couplage ?",
        options: { a: "M = 3\u00a0mH et k = 0,5.", b: "M = 6\u00a0mH et k = 1.", c: "M = 1,5\u00a0mH et k = 0,25.", d: "M = 3\u00a0mH et k = 0,25." },
        hint: "L = L₁ + L₂ + 2M, puis k = M/√(L₁L₂).",
        why: "2M = 21 \u2212 15 = 6\u00a0mH, donc M = 3\u00a0mH ; √(3 × 12) = 6\u00a0mH, et k = 3/6 = 0,5. Oublier le facteur 2 donnerait 6\u00a0mH et un couplage parfait. Leçon « Auto-inductance »." },
      nagaoka: { prompt: "Une bobine d'une couche a 100 spires, 1\u00a0cm de rayon et 2\u00a0cm de long. La formule du solénoïde long donne environ 197\u00a0µH. Que vaut à peu près son inductance réelle ?",
        options: { a: "197\u00a0µH : la formule est exacte pour une couche.", b: "Environ 136\u00a0µH : le coefficient de Nagaoka vaut 0,69 pour une bobine aussi longue que large.", c: "Environ 280\u00a0µH, car les bouts ajoutent du flux.", d: "Environ 49\u00a0µH, le quart." },
        why: "Vers les bouts, le champ faiblit et une partie du flux ne traverse pas les spires extrêmes : K ≈ 0,69 pour ℓ = 2a, donc 197 × 0,69 ≈ 136\u00a0µH. Leçon « Auto-inductance »." },
      energie: { prompt: "Deux bobines de 2\u00a0mH et 8\u00a0mH, d'inductance mutuelle 3\u00a0mH, portent 2\u00a0A et \u22121\u00a0A. Quelle est leur énergie magnétique ?",
        options: { a: "14\u00a0mJ.", b: "8\u00a0mJ.", c: "2\u00a0mJ.", d: "Une valeur négative, puisque les courants sont de signes opposés." },
        hint: "U = ½L₁I₁² + ½L₂I₂² + M I₁I₂.",
        why: "4 + 4 \u2212 6 = 2\u00a0mJ. Le terme d'interaction est négatif, mais l'énergie totale reste positive parce que M² = 9 < L₁L₂ = 16 (mH)². 14\u00a0mJ oublie le signe de I₂. Leçon « Inductance et énergie magnétique »." },
      poynting: { prompt: "Un fil de cuivre de 1\u00a0mm de rayon et 2\u00a0m de long porte 10\u00a0A continus. Combien vaut le flux du vecteur de Poynting à travers sa surface latérale, et dans quel sens ?",
        options: { a: "Zéro : l'énergie suit le fil d'un bout à l'autre.", b: "Environ 1,1\u00a0W, sortant du fil vers l'air.", c: "Environ 11\u00a0W, entrant.", d: "Environ 1,1\u00a0W, entrant : c'est exactement l'effet Joule RI²." },
        hint: "R = ρℓ/(πa²) avec ρ = 1,68 × 10⁻⁸\u00a0Ω·m.",
        why: "R ≈ 10,7\u00a0mΩ et RI² ≈ 1,07\u00a0W. E le long du fil et B autour donnent E ∧ B/μ₀ dirigé vers l'axe : l'énergie entre par la surface et devient chaleur. Leçon « Inductance et énergie magnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

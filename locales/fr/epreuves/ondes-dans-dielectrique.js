/* Épreuve de l'étape « Ondes dans un diélectrique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      quadrature: { prompt: "La lumière éclaire des atomes exactement à la pulsation propre ω₀ de leurs électrons. Le dipôle de chaque atome a un quart de période de retard sur le champ. Qu'en conclure ?",
        options: { a: "Les atomes prennent de l'énergie à l'onde : la polarisabilité est purement imaginaire, c'est l'absorption.", b: "Les atomes ne font rien : un dipôle en quadrature ne rayonne pas.", c: "Les atomes rendent toute l'énergie qu'ils reçoivent, puisque le mouvement est périodique.", d: "La polarisabilité est réelle et négative." },
        hint: "Quel est le travail moyen de la force qE sur une charge dont la vitesse est en phase avec E ?",
        why: "Un déplacement en quadrature, c'est une vitesse en phase avec le champ : la force fait un travail moyen positif, que le frottement γ dissipe. À ω = ω₀, α = \u2212i × q²/(mε₀γω₀). Leçons « Polarisation de la matière » et « Indice de réfraction complexe »." },
      polarisabilite: { prompt: "Un électron dont la résonance est à 100\u00a0nm a une polarisabilité statique d'environ 9 × 10⁻³⁰\u00a0m³. Que vaut-elle pour une résonance à 50\u00a0nm, plus raide ?",
        options: { a: "Environ 4,5 × 10⁻³⁰\u00a0m³, deux fois moins.", b: "Environ 2,2 × 10⁻³⁰\u00a0m³, quatre fois moins.", c: "Environ 18 × 10⁻³⁰\u00a0m³, deux fois plus.", d: "La même : α(0) ne dépend que de la charge et de la masse." },
        hint: "α(0) = q²/(mε₀ω₀²).",
        why: "Une longueur d'onde deux fois plus courte, c'est ω₀ deux fois plus grand, et α(0) en 1/ω₀² : quatre fois moins. Un électron très lié se laisse peu déplacer. Leçon « Polarisation de la matière »." },
      impulsion: { prompt: "Pourquoi ne peut-on pas écrire D(t) = εE(t) avec un ε unique pour une impulsion de lumière de quelques femtosecondes dans un verre ?",
        options: { a: "Parce que D n'existe pas dans un verre.", b: "Parce que la polarisation devient non linéaire dès qu'une impulsion est brève.", c: "Parce que le milieu répond avec un retard qui dépend de la fréquence : chaque composante sinusoïdale de l'impulsion a son propre ε(ω).", d: "Parce que les charges de polarisation ρ = \u2212∇·P deviennent infinies." },
        why: "La relation D = εE est un énoncé du régime sinusoïdal établi. Une impulsion brève contient un large éventail de fréquences ; les électrons, oscillateurs amortis, ont une mémoire de l'ordre de 2/γ. Leçon « Équations de Maxwell dans un diélectrique »." },
      transverse: { prompt: "Une onde plane traverse un bloc de verre homogène. Quelles sources faut-il mettre dans les équations de Maxwell du vide à l'intérieur ?",
        options: { a: "Aucune : le verre est neutre.", b: "La charge ρ = \u2212∇·P seulement.", c: "Les charges et les courants libres du verre.", d: "Le courant ∂P/∂t seulement : P est transverse, ∇·P = 0." },
        why: "P est parallèle à E, perpendiculaire à la propagation, et ne varie que le long de celle-ci : sa divergence est nulle. Mais P oscille, et le courant des charges liées ∂P/∂t est du même ordre que ε₀∂E/∂t. Leçons « Équations de Maxwell dans un diélectrique » et « Ondes dans un diélectrique »." },
      azote: { prompt: "L'azote gazeux, à la température de la glace fondante sous 101\u00a0325\u00a0Pa, a n \u2212 1 = 2,98 × 10⁻⁴. Le liquide est 646 fois plus dense. Avec la même polarisabilité par molécule, quel indice prévoit-on pour le liquide, mesuré à 1,199 ?",
        options: { a: "1,201 avec le champ local ; 1,177 sans.", b: "1,193 dans les deux cas.", c: "1,385, puisque n \u2212 1 est proportionnel à N.", d: "1,0003 : la polarisabilité ne dépend pas de la densité." },
        hint: "Nα du gaz ≈ 2(n \u2212 1) ; multipliez par 646, puis 3(n² \u2212 1)/(n² + 2) = Nα.",
        why: "Nα = 646 × 5,96 × 10⁻⁴ = 0,385. Avec le champ local, n² = 1 + 0,385/0,872 = 1,441, n = 1,2006 ; sans, n = √1,385 = 1,177, trop bas de 2 %. Leçon « Ondes dans un diélectrique »." },
      resonance: { prompt: "Un milieu dense a une seule résonance atomique à 100\u00a0nm et une susceptibilité statique χ₀ = 1,25 sans champ local. Où le champ local place-t-il sa résonance ?",
        options: { a: "À 100\u00a0nm : le champ local ne change que l'amplitude.", b: "Vers 131\u00a0nm : ω₀′ = ω₀√(1 \u2212 χ₀/3) ≈ 0,76ω₀.", c: "Vers 76\u00a0nm : la résonance monte en fréquence.", d: "Nulle part : avec χ₀ > 1, il n'y a plus de résonance." },
        hint: "ω₀′² = ω₀² \u2212 fNq²/(3ε₀m), et χ₀ = fNq²/(ε₀mω₀²).",
        why: "ω₀′²/ω₀² = 1 \u2212 χ₀/3 = 0,583, ω₀′ = 0,764ω₀, λ = 100/0,764 ≈ 131\u00a0nm. Il n'y aurait plus de résonance réelle que pour χ₀ ≥ 3. Leçons « Ondes dans un diélectrique » et « Indice de réfraction complexe »." },
      fibre: { prompt: "Une fibre de silice perd 0,2\u00a0dB/km à 1550\u00a0nm. Sur quelle longueur l'intensité est-elle divisée par e ?",
        options: { a: "5\u00a0km.", b: "1\u00a0km.", c: "Environ 22\u00a0km, ce qui correspond à n_I ≈ 6 × 10⁻¹².", d: "Environ 43\u00a0km." },
        hint: "Un facteur e en intensité, c'est 10 log₁₀(e) ≈ 4,34\u00a0dB.",
        why: "4,34/0,2 ≈ 22\u00a0km = 1/β. Si toute la perte était une absorption, n_I = βλ/(4π) ≈ 5,7 × 10⁻¹² ; la diffusion Rayleigh en fait en réalité la plus grande part. 43\u00a0km est la longueur où l'amplitude, et non l'intensité, est divisée par e. Leçon « Indice de réfraction complexe »." },
      verre: { prompt: "Un verre a n_I = 10⁻⁷ à 500\u00a0nm. Quelle fraction de l'intensité traverse 1\u00a0cm, réflexions aux faces mises à part ?",
        options: { a: "37\u00a0%, un facteur e.", b: "Environ 10\u00a0%.", c: "Rien : un indice complexe signifie un milieu opaque.", d: "Environ 97,5\u00a0% : β = 4πn_I/λ ≈ 2,5\u00a0m⁻¹." },
        hint: "β = 2ωn_I/c = 4πn_I/λ, puis e^(\u2212βd).",
        why: "β = 4π × 10⁻⁷/(5 × 10⁻⁷) ≈ 2,5\u00a0m⁻¹ ; e^(\u22120,025) ≈ 0,975. Transparent sur un centimètre, ce verre absorberait 92\u00a0% sur un mètre. Leçon « Indice de réfraction complexe »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

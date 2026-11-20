/* Épreuve de l'étape « Équipartition de l'énergie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      miroir: { prompt: "Un miroir est suspendu à une fibre de constante de torsion C = 2 × 10⁻¹⁵ N·m·rad⁻¹, dans l'air à 300 K. Quel est l'angle quadratique moyen θ_rms de son tremblement thermique ?",
        options: { a: "1,4 mrad : ½C⟨θ²⟩ = ½k_BT donne θ_rms = √(k_BT/C).", b: "2,1 µrad : k_BT/C, sans la racine.", c: "Zéro : sans courant, le miroir est immobile.", d: "2,0 mrad : √(2k_BT/C), en comptant l'énergie cinétique avec l'énergie potentielle." },
        hint: "Un seul terme quadratique contient θ.",
        why: "L'énergie potentielle ½Cθ² reçoit ½k_BT : ⟨θ²⟩ = k_BT/C = 2,07 × 10⁻⁶ rad², θ_rms = 1,4 mrad. L'énergie cinétique a sa propre part, mais ne contient pas θ. Leçon « Équipartition de l'énergie »." },
      johnson: { prompt: "Quelle est la tension de bruit thermique V_rms d'une résistance de 10 kΩ à 290 K, mesurée sur une bande de 1 MHz ?",
        options: { a: "6,3 µV : √(k_BTRΔf).", b: "12,7 µV : √(4k_BTRΔf).", c: "Elle ne dépend pas de R : 4k_BTΔf, soit 16 fW.", d: "Nulle : une résistance au repos ne produit aucune tension." },
        why: "⟨V²⟩ = 4k_BTRΔf = 1,60 × 10⁻¹⁰ V². Ce qui ne dépend pas de R, c'est la puissance ⟨V²⟩/R par unité de bande, (41.3). Leçon « Équipartition de l'énergie »." },
      piege: { prompt: "Une bille est retenue par une pince optique qui exerce une force de rappel \u2212κr dans les trois directions, dans de l'eau à T. Quelle est son énergie moyenne totale, cinétique et potentielle ?",
        options: { a: "(3/2) k_BT : seule l'énergie cinétique compte.", b: "k_BT/2 : un seul degré de liberté.", c: "3 k_BT : six termes quadratiques, trois de vitesse et trois de position, chacun ½ k_BT.", d: "Elle dépend de κ : plus la pince est raide, plus l'énergie est grande." },
        why: "L'équipartition donne ½k_BT à chaque terme quadratique, quelle que soit la raideur : une pince plus raide réduit ⟨x²⟩ = k_BT/κ, pas l'énergie. Leçon « Équipartition de l'énergie »." },
      coupure: { prompt: "Selon la loi de Rayleigh, l'énergie du rayonnement à l'équilibre comptée jusqu'à la pulsation ω_max vaut E₁. Que vaut-elle jusqu'à 2ω_max ?",
        options: { a: "2E₁.", b: "4E₁.", c: "E₁ : le rayonnement de haute fréquence ne compte pas.", d: "8E₁ : elle croît comme ω_max³, sans limite." },
        why: "u(ω) ∝ ω²k_BT, et ∫₀^ω_max ω² dω = ω_max³/3. C'est la catastrophe ultraviolette : la vraie énergie, elle, est finie. Leçon « Équilibre thermique du rayonnement »." },
      infrarouge: { prompt: "À 300 K et λ = 10 µm, ħω/k_BT = 4,8. Par quel facteur la loi de Rayleigh surestime-t-elle l'intensité mesurée ?",
        options: { a: "Environ 25 : (e^4,8 \u2212 1)/4,8.", b: "Environ 4,8.", c: "Aucun : à 10 µm, la loi de Rayleigh est juste.", d: "Environ 1,1." },
        why: "Le rapport Rayleigh/Planck est k_BT/⟨E⟩ = (e^x \u2212 1)/x = 25. La loi de Rayleigh ne vaut que pour x ≪ 1, aux longueurs d'onde millimétriques et au-delà à cette température. Leçons « Équilibre thermique du rayonnement » et « Équipartition et oscillateur quantique »." },
      marche: { prompt: "Quelle est l'énergie moyenne d'un oscillateur quantique dont la marche ħω est égale à k_BT ?",
        options: { a: "k_BT : l'équipartition vaut toujours.", b: "0,58 k_BT : ħω/(e^1 \u2212 1).", c: "ħω/2 = 0,5 k_BT.", d: "Zéro : l'oscillateur est gelé." },
        hint: "Utilisez (41.15).",
        why: "1/(e \u2212 1) = 0,582. Pour ħω ≪ k_BT on retrouverait k_BT, pour ħω ≫ k_BT presque rien. Leçon « Équipartition et oscillateur quantique »." },
      chaud: { prompt: "La température d'une enceinte passe de 300 K à 3000 K. Par combien la densité d'énergie totale du rayonnement qu'elle contient est-elle multipliée ?",
        options: { a: "Par 10.", b: "Par 1 000, comme l'intensité au maximum.", c: "Par 10⁴ : l'intégrale de la loi de Planck vaut aT⁴.", d: "Elle est infinie dans les deux cas." },
        why: "La pulsation du maximum est multipliée par 10, l'intensité au maximum (par unité de pulsation) par 10³ ; l'aire sous la courbe, par 10 × 10³ = 10⁴. Leçon « Équipartition et oscillateur quantique »." },
      bille: { prompt: "Une sphère de rayon 1 µm est en suspension dans de l'eau de viscosité 1,0 mPa·s à 300 K. Quelle est sa distance quadratique moyenne au point de départ après 60 s, en trois dimensions ?",
        options: { a: "Zéro : elle oscille autour de son point de départ.", b: "Une dizaine de centimètres : elle file à sa vitesse thermique, quelques millimètres par seconde, pendant 60 s.", c: "5,1 µm : √(2Dt), une seule direction.", d: "8,9 µm : ⟨R²⟩ = 6k_BTt/(6πηa)." },
        why: "D = k_BT/(6πηa) = 2,2 × 10⁻¹³ m²·s⁻¹, et ⟨R²⟩ = 6Dt = 7,9 × 10⁻¹¹ m². La vitesse thermique est effacée en moins d'une microseconde : sur 60 s, la sphère fait une marche aléatoire. Leçon « Marche aléatoire et mouvement brownien »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

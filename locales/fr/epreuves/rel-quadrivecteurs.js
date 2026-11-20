/* Épreuve de l'étape « Quadrivecteurs et énergie-impulsion » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      hyperbole: { prompt: "Un événement a, dans un référentiel R, x = 3\u00a0m et ct = 5\u00a0m. Dans un référentiel R′ qui avance selon x, on mesure ct′ = 4\u00a0m. Que vaut x′ ?",
        options: { a: "0\u00a0m : l'événement a lieu à l'origine des positions de R′.", b: "3\u00a0m, car x ne dépend pas du référentiel.", c: "4\u00a0m.", d: "5\u00a0m." },
        hint: "(ct)² \u2212 x² est le même dans les deux référentiels.",
        why: "25 \u2212 9 = 16 dans R ; dans R′, 16 \u2212 x′² = 16, donc x′ = 0. R′ est le référentiel qui va de l'origine à l'événement, à u = 3c/5. Leçon « Les quadrivecteurs »." },
      rapidites: { prompt: "On enchaîne deux changements de référentiel selon x, de rapidité 0,5 chacun. Quelle est la vitesse relative du premier et du dernier référentiel ?",
        options: { a: "c, puisque 0,5 + 0,5 = 1.", b: "Environ 0,76c, car c th(1) ≈ 0,762c.", c: "Environ 0,92c, le double de c th(0,5).", d: "0,5c." },
        hint: "Ce sont les rapidités qui s'ajoutent ; la vitesse est c th φ.",
        why: "La rapidité totale vaut 1 et th 1 ≈ 0,762. Ajouter les vitesses, 2 × 0,462c, donnerait 0,92c : c'est la composition de Galilée, fausse ici. Leçon « Les quadrivecteurs »." },
      quadri: { prompt: "Lequel de ces quadruplets est un quadrivecteur ?",
        options: { a: "(c, vx, vy, vz) pour une particule de vitesse v.", b: "(m, px, py, pz) pour une particule de masse m.", c: "(E, px c, py c, pz c) pour une particule d'énergie E et d'impulsion p.", d: "(t, x, y, z) avec t en secondes et x, y, z en mètres." },
        hint: "Il faut quatre grandeurs de même unité, qui se transforment comme (ct, x, y, z).",
        why: "L'énergie et l'impulsion se transforment par (17.12), comme ct et x. c ne change pas d'un référentiel à l'autre, la masse non plus, et t n'a pas l'unité de x. Leçon « Le quadrivecteur énergie-impulsion »." },
      proton: { prompt: "Un proton (mc² = 938\u00a0MeV) a une impulsion telle que pc = 2,00\u00a0GeV. Quelle est son énergie ?",
        options: { a: "2,94\u00a0GeV, la somme de mc² et de pc.", b: "1,06\u00a0GeV, leur différence.", c: "2,00\u00a0GeV, puisque E = pc.", d: "Environ 2,21\u00a0GeV, soit √((mc²)² + (pc)²)." },
        hint: "(17.7) : E² = p²c² + m²c⁴.",
        why: "√(0,938² + 2,00²) ≈ √4,88 ≈ 2,21\u00a0GeV. E = pc ne vaut que pour une particule de masse nulle. Leçon « Le quadrivecteur énergie-impulsion »." },
      electron: { prompt: "Au sol, un électron a E = 1,00\u00a0MeV et px c = 0,86\u00a0MeV. Quelle énergie mesure-t-on dans un vaisseau qui avance à 0,6c selon x ?",
        options: { a: "Environ 0,61\u00a0MeV.", b: "1,25\u00a0MeV, γ fois l'énergie au sol.", c: "0,40\u00a0MeV.", d: "0,51\u00a0MeV, son énergie au repos." },
        hint: "γ = 1,25 à 0,6c ; E′ = γ(E \u2212 u px).",
        why: "E′ = 1,25 × (1,00 \u2212 0,6 × 0,86) ≈ 0,605\u00a0MeV, et p′x c = 1,25 × (0,86 \u2212 0,6) ≈ 0,33\u00a0MeV. Contrôle : E′² \u2212 p′²c² ≈ 0,26\u00a0MeV², comme au sol, soit (0,51\u00a0MeV)². Leçon « Le quadrivecteur énergie-impulsion »." },
      photons: { prompt: "Deux photons de 3\u00a0GeV et 12\u00a0GeV partent d'un même point à angle droit. Quelle est la masse invariante du système, en énergie ?",
        options: { a: "15\u00a0GeV, la somme des énergies.", b: "Environ 8,5\u00a0GeV.", c: "Environ 12,4\u00a0GeV.", d: "0, puisque chaque photon est de masse nulle." },
        hint: "M²c⁴ = 2E₁E₂(1 \u2212 cos θ).",
        why: "2 × 3 × 12 × (1 \u2212 0) = 72, et √72 ≈ 8,49\u00a0GeV. 12,4\u00a0GeV serait la norme de l'impulsion totale, |Σpc| = √(9 + 144). Leçon « Algèbre des quadrivecteurs »." },
      paire: { prompt: "Un photon frappe un électron au repos et crée une paire électron-positon : γ + e⁻ → e⁻ + e⁻ + e⁺. Quelle énergie minimale le photon doit-il avoir ? (mec² = 0,511\u00a0MeV)",
        options: { a: "1,02\u00a0MeV, la masse de la paire créée.", b: "1,53\u00a0MeV, trois masses d'électron.", c: "2,04\u00a0MeV, quatre masses d'électron.", d: "0,511\u00a0MeV." },
        hint: "Au seuil, s = (3mec²)² ; sur cible fixe, s = me²c⁴ + 2Eγ mec² pour un photon.",
        why: "9me² = me² + 2Eγ me donne Eγ = 4mec² ≈ 2,04\u00a0MeV. La moitié de cette énergie part dans le mouvement des trois particules finales, imposé par la conservation de l'impulsion. Leçon « Algèbre des quadrivecteurs »." },
      sonde: { prompt: "Une sonde s'éloigne de la Terre à 0,2c. Un laser terrestre de longueur d'onde 500\u00a0nm la vise. Quelle longueur d'onde reçoit-elle ?",
        options: { a: "400\u00a0nm.", b: "600\u00a0nm.", c: "625\u00a0nm.", d: "Environ 612\u00a0nm." },
        hint: "ν′/ν = √((1 \u2212 u/c)/(1 + u/c)).",
        why: "ν′/ν = √(0,8/1,2) ≈ 0,816 ; λ′ = 500/0,816 ≈ 612\u00a0nm. 600 et 625\u00a0nm sont les formules sans relativité, selon que l'on tient la source ou l'observateur pour mobile ; la relativité donne une valeur entre les deux, la même dans les deux descriptions. Leçon « Algèbre des quadrivecteurs »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

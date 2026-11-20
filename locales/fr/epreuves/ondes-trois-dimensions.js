/* Épreuve de l'étape « Ondes en trois dimensions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      broglie: { prompt: "Quelle est la longueur d'onde d'un électron d'énergie cinétique 100\u00a0eV ?",
        options: { a: "0,123\u00a0nm : λ = h/p avec p = √(2mT), l'ordre des distances entre atomes.", b: "12,4\u00a0nm : la longueur d'onde d'un photon de 100\u00a0eV.", c: "2,43\u00a0pm : la longueur d'onde de Compton de l'électron.", d: "Elle n'est pas définie pour une particule lente." },
        hint: "À 100\u00a0eV, v/c ≈ 0,02 : la formule non relativiste suffit.",
        why: "p = √(2 × 9,11 × 10⁻³¹ × 1,60 × 10⁻¹⁷) = 5,40 × 10⁻²⁴\u00a0kg·m·s⁻¹, et λ = h/p = 0,123\u00a0nm. C'est pourquoi un cristal diffracte les électrons. Leçon « Amplitudes de probabilité des particules »." },
      paquet: { prompt: "Un électron libre va à 0,8c. À quelles vitesses avancent le paquet qui le décrit et les crêtes de ce paquet (énergie comptée avec mc²) ?",
        options: { a: "Les deux à 0,8c.", b: "Le paquet à 0,8c, les crêtes à 1,25c : vp = c²/v, vg = v.", c: "Le paquet à 1,25c, les crêtes à 0,8c.", d: "Le paquet à 0,4c, les crêtes à 0,8c." },
        why: "(48.22b) : vg = c²p/E = v, exactement. (48.22a) : vp = E/p = c²/v = 1,25c. Les crêtes ne portent aucun signal. Leçon « Amplitudes de probabilité des particules »." },
      origine: { prompt: "On ajoute la même constante à l'énergie de toutes les ondes d'un paquet (on change l'origine des énergies). Qu'est-ce qui change dans ce qu'on peut observer ?",
        options: { a: "La vitesse du paquet.", b: "La longueur d'onde h/p.", c: "Rien : seule la vitesse de phase change, et elle n'est pas observable ; |ψ|² et dω/dk restent les mêmes.", d: "La probabilité de présence au centre du paquet." },
        why: "ω devient ω + constante pour toutes les ondes : la phase commune ne change pas |ψ|², et dω/dk ne voit pas la constante. Leçon « Amplitudes de probabilité des particules »." },
      retard: { prompt: "Une onde sonore plane (c = 343\u00a0m·s⁻¹) arrive sur deux microphones distants de 20\u00a0cm, son vecteur d'onde faisant 30° avec la normale à la ligne qui les joint. Quel est le retard entre les deux signaux ?",
        options: { a: "0,58\u00a0ms : d/c.", b: "0,50\u00a0ms : d cos θ/c.", c: "Aucun, l'onde est plane.", d: "0,29\u00a0ms : d sin θ/c." },
        hint: "Projetez le vecteur d'onde sur la ligne des microphones.",
        why: "Le front parcourt d sin θ = 10\u00a0cm entre les deux contacts, en 0,1/343 = 0,29\u00a0ms. Le long de la ligne, il glisse à c/sin θ = 686\u00a0m·s⁻¹. Leçon « Ondes à trois dimensions »." },
      compton: { prompt: "Un électron et un photon ont la même longueur d'onde, h/(m_e c) = 2,43\u00a0pm. Que vaut le rapport de leurs pulsations, ω_électron/ω_photon ?",
        options: { a: "√2 : ω²/c² = k² + (m_e c/ħ)², et ici k = m_e c/ħ.", b: "1 : même longueur d'onde, même pulsation.", c: "2.", d: "1/√2." },
        why: "(48.24a) : pour l'électron, ω = c√(k² + μ²) ; pour le photon, ω = ck. Avec k = μ = m_e c/ħ, le rapport vaut √2. Le terme de masse de (48.24) fait toute la différence. Leçon « Ondes à trois dimensions »." },
      transfert: { prompt: "Deux pendules identiques de période 1\u00a0s sont couplés par un ressort tel que K/(mω₀²) = 0,01. On lance l'un, l'autre étant au repos. Au bout de combien de temps le premier est-il arrêté ?",
        options: { a: "1\u00a0s environ.", b: "50\u00a0s environ : π/(ω₂ \u2212 ω₁), avec ω₂ \u2212 ω₁ ≈ 0,01 ω₀.", c: "100\u00a0s environ.", d: "Jamais : il garde toujours une partie de son énergie." },
        hint: "ω₂ = ω₀√(1 + 2K/(mω₀²)).",
        why: "ω₂ \u2212 ω₁ ≈ ω₀ × 0,01 = 0,0628\u00a0rad·s⁻¹, et τ = π/0,0628 = 50\u00a0s : 50 périodes. Pendules identiques : le transfert est complet. Leçon « Modes normaux »." },
      opposition: { prompt: "On écarte les deux pendules couplés de la même quantité, en sens opposés, et on les lâche. Que se passe-t-il ?",
        options: { a: "L'énergie passe d'un pendule à l'autre, comme quand on en lance un seul.", b: "Les pendules s'arrêtent vite, le ressort freine.", c: "Ils oscillent indéfiniment en opposition, à la pulsation √(ω₀² + 2K/m), sans rien échanger : c'est un mode.", d: "Ils se mettent en phase au bout d'un temps de transfert." },
        why: "Lâché dans un mode, un système linéaire sans frottement y reste. Les échanges d'énergie viennent des battements entre deux modes, et ici un seul est présent. Leçon « Modes normaux »." },
      desaccord: { prompt: "Le pendule B est 2\u00a0% plus long que A, et K/(mω₀²) = 0,005. On lance A seul. Quelle part de l'énergie passe au plus en B ?",
        options: { a: "Toute, mais plus lentement.", b: "Aucune.", c: "La moitié, toujours.", d: "Environ 20\u00a0% : le désaccord des pulsations propres dépasse la largeur créée par le couplage." },
        hint: "f_max = (K/m)²/(((ωA² \u2212 ωB²)/2)² + (K/m)²).",
        why: "(ωA² \u2212 ωB²)/2 ≈ 0,0098 ω₀², deux fois K/m = 0,005 ω₀² : f_max = 0,005²/(0,0098² + 0,005²) ≈ 0,21. Un transfert complet demande des pendules accordés, comme une résonance. Leçon « Modes normaux »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

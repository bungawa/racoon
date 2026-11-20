/* Épreuve de l'étape « Films colorés et diffraction » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      huile: { prompt: "Un film d'indice 1,50, épais de 150\u00a0nm, flotte sur de l'eau (indice 1,33) et est vu de face. Quelle longueur d'onde du visible éteint-il, et de quelle couleur paraît-il ?",
        options: { a: "Il éteint 450\u00a0nm, le bleu, et paraît jaune orangé.", b: "Il éteint 225\u00a0nm et paraît blanc.", c: "Il éteint 600\u00a0nm, l'orange, et paraît bleu.", d: "Il n'éteint rien : l'eau supprime la réflexion de la face arrière." },
        hint: "L'indice croît à la face avant et décroît à la face arrière, comme pour une bulle de savon dans l'air.",
        why: "Une seule des deux réflexions change de signe, comme pour une bulle : R s'annule pour λ = 2ne/p. 2 × 1,50 × 150 = 450\u00a0nm : le bleu est éteint, il reste le vert, le jaune et le rouge. La face arrière réfléchit moins que dans l'air, (1,50 \u2212 1,33)/(2,83) ≈ 0,06 en amplitude, mais elle réfléchit. Leçon « Lames minces colorées et cristaux »." },
      biais: { prompt: "Le même film est vu de biais, sous une incidence telle que cos θ₁ = 0,80 dans le film. Où passe la longueur d'onde éteinte ?",
        options: { a: "À 560\u00a0nm : le trajet oblique est plus long.", b: "À 360\u00a0nm, dans l'ultraviolet : le film paraît alors presque blanc.", c: "Elle ne bouge pas : l'épaisseur n'a pas changé.", d: "À 450\u00a0nm, mais l'extinction devient partielle." },
        hint: "La différence de marche vaut 2ne cos θ₁.",
        why: "2 × 1,50 × 150 × 0,80 = 360\u00a0nm. La différence de marche diminue quand on incline : les teintes défilent comme si le film s'amincissait, et l'extinction sort du visible par le bleu. Leçon « Lames minces colorées et cristaux »." },
      antireflet: { prompt: "On dépose sur un verre une couche d'indice 1,25 pour supprimer la réflexion à 600\u00a0nm. Quelle épaisseur faut-il, et pourquoi ?",
        options: { a: "240\u00a0nm, une demi-longueur d'onde dans la couche.", b: "600\u00a0nm, pour que l'aller et retour fasse deux longueurs d'onde.", c: "120\u00a0nm, λ/(4n) : les deux réflexions changent toutes deux de signe et s'opposent quand l'aller et retour fait λ/2.", d: "Aussi mince que possible, pour ne pas absorber." },
        why: "L'indice croît aux deux faces : les deux réflexions changent de signe, et seule la différence de marche 2ne les sépare. Elles s'opposent pour 2ne = λ/2, e = 600/(4 × 1,25) = 120\u00a0nm. Avec √1,52 ≈ 1,23, l'annulation serait presque totale. Leçon « Lames minces colorées et cristaux »." },
      ordres: { prompt: "Des plans atomiques espacés de 200\u00a0pm sont éclairés par des rayons X de 154\u00a0pm. Combien de réflexions de Bragg existe-t-il, et sous quels angles rasants ?",
        options: { a: "Une seule, sous 45°.", b: "Aucune : λ est trop proche de d.", c: "Trois, sous 22,6°, 50,4° et 90°.", d: "Deux, sous 22,6° et 50,4° ; la troisième demanderait sin θ = 1,16." },
        hint: "2d sin θ = pλ, avec sin θ ≤ 1.",
        why: "sin θ = pλ/(2d) = 0,385 p. p = 1 : 22,6° ; p = 2 : 0,770, soit 50,4° ; p = 3 : 1,155, impossible. Il faut λ ≤ 2d/p : c'est pourquoi la lumière visible ne donne aucune réflexion sur un cristal. Leçon « Lames minces colorées et cristaux »." },
      frange: { prompt: "Un bord rectiligne est éclairé par une onde plane de 600\u00a0nm ; l'écran est à 2\u00a0m. Que vaut l'intensité au bord de l'ombre géométrique, et où est le premier maximum ?",
        options: { a: "I₀/2 au bord ; premier maximum à 0,77\u00a0mm.", b: "I₀/4 au bord ; premier maximum, 1,37 I₀, à environ 0,94\u00a0mm du bord, côté éclairé.", c: "0 au bord ; premier maximum à 1,2\u00a0µm.", d: "I₀/4 au bord ; premier maximum à 0,94\u00a0mm, dans l'ombre." },
        hint: "Le premier maximum est en u = 1,217, avec u = x √(2/(λs)).",
        why: "Au bord, la flèche va du point d'inflexion de la spirale de Cornu à son centre : moitié d'amplitude, quart d'intensité. √(λs/2) = √(0,6 × 10⁻⁶) ≈ 0,77\u00a0mm, et 1,217 × 0,77 ≈ 0,94\u00a0mm, du côté éclairé : dans l'ombre, l'intensité décroît sans osciller. Leçon « Diffraction par des écrans opaques »." },
      recul: { prompt: "On recule l'écran d'observation de 1\u00a0m à 9\u00a0m derrière le bord. Comment changent les franges ?",
        options: { a: "Elles sont neuf fois plus larges.", b: "Elles ne changent pas : la source est à l'infini.", c: "Elles sont trois fois plus larges, avec exactement la même forme.", d: "Elles disparaissent : à 9\u00a0m, on est en diffraction à l'infini." },
        why: "Le profil ne dépend que de u = x √(2/(λs)) : une même valeur de u correspond à un x proportionnel à √s, et √9 = 3. La diffraction à l'infini ne concerne qu'une ouverture de taille finie, quand √(λs) la dépasse ; un bord seul n'en a pas. Leçon « Diffraction par des écrans opaques »." },
      disque: { prompt: "Un disque de charges oscillantes, à bord net, couvre exactement la première zone de Fresnel vue d'un point P de son axe. Comparé au plan infini, que reçoit P ?",
        options: { a: "Le même champ : seule la première zone compte.", b: "La moitié du champ.", c: "Rien : une zone seule s'annule elle-même.", d: "Deux fois le champ, donc quatre fois l'intensité." },
        hint: "Sur le cercle de la somme des anneaux, une zone fait un demi-tour.",
        why: "La somme des anneaux parcourt un demi-tour du cercle de rayon c/ω : elle arrive au point opposé au départ, à deux fois la distance du départ au centre. Le plan infini, adouci, s'arrête au centre. Deux fois l'amplitude, quatre fois l'intensité : c'est le principe de la lame à zones. Leçon « Le champ d’un plan de charges oscillantes »." },
      nappe: { prompt: "Un plan de charges porte un courant surfacique qui oscille avec l'amplitude 0,5\u00a0A·m⁻¹. Quel champ rayonne-t-il, et avec quel retard à 3\u00a0m ?",
        options: { a: "Environ 94\u00a0V·m⁻¹, en phase avec la vitesse des charges, retardé de 10\u00a0ns.", b: "Environ 188\u00a0V·m⁻¹, en phase avec leur accélération, retardé de 10\u00a0ns.", c: "Environ 94\u00a0V·m⁻¹, en phase avec leur accélération, sans retard.", d: "Environ 0,5\u00a0V·m⁻¹, en phase avec leur déplacement." },
        hint: "E₀ = K₀/(2ε₀c), et 1/(2ε₀c) ≈ 188\u00a0Ω.",
        why: "188,4 × 0,5 ≈ 94\u00a0V·m⁻¹. La somme des zones porte un facteur 1/(iω) : le champ du plan suit la vitesse des charges, pas leur accélération, avec le retard du chemin le plus court, z/c = 3/(3 × 10⁸) = 10\u00a0ns. Leçon « Le champ d’un plan de charges oscillantes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

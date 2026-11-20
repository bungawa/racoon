/* Épreuve de l'étape « Algèbre du spin 1 » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      triangle: { prompt: "Des atomes +S traversent T, tourné de 60° et grand ouvert, puis un filtre 0S. Les trois produits ⟨0S|iT⟩⟨iT|+S⟩ valent 0,46, \u22120,31 et \u22120,15. Combien d'atomes passent, et combien passeraient si un témoin marquait la voie prise dans T ?",
        options: { a: "Un tiers dans les deux cas.", b: "Aucun dans les deux cas.", c: "Aucun ; avec le témoin, environ un tiers : 0,46² + 0,31² + 0,15² ≈ 0,33.", d: "Environ 0,33 sans témoin, aucun avec." },
        why: "Sans marquage, on ajoute les amplitudes : 0,46 \u2212 0,31 \u2212 0,15 = 0, (5.20). Marquées, les voies mènent à des états finaux différents et ce sont les carrés qui s'ajoutent. Leçon « Des amplitudes qui interfèrent »." },
      base: { prompt: "On calcule ⟨χ|φ⟩ en sommant sur les états de base d'un appareil T, puis sur ceux d'un appareil R d'une autre orientation. Les deux résultats…",
        options: { a: "sont égaux : (5.24) vaut pour toute base complète.", b: "diffèrent d'une phase.", c: "sont égaux seulement si T et R sont parallèles.", d: "diffèrent, car les produits ne sont pas les mêmes." },
        why: "Un appareil grand ouvert ne fait rien, quelle que soit son orientation. Les termes de la somme changent, leur total non. Leçon « Des amplitudes qui interfèrent »." },
      conj: { prompt: "On mesure |⟨χ|φ⟩|² = 0,2 pour des atomes préparés en φ et filtrés en χ. On prépare maintenant en χ et on filtre en φ. Quelle probabilité attend-on ?",
        options: { a: "0,8.", b: "0,04.", c: "On ne peut pas savoir sans la phase.", d: "0,2 : ⟨φ|χ⟩ = ⟨χ|φ⟩*, de même module." },
        why: "(5.26) : l'amplitude inverse est la conjuguée, et les probabilités sont égales. Leçon « Des amplitudes qui interfèrent »." },
      ordre: { prompt: "A fait tourner le spin de 90° autour de y, B de 90° autour de x. Partis de +S, les atomes sont analysés par T tourné de 90° autour de y. Avec A puis B, tous sortent par \u2212T. Et avec B puis A ?",
        options: { a: "Tous par \u2212T aussi.", b: "1/4, 1/2, 1/4 par +T, 0T, \u2212T : AB n'est pas BA.", c: "Tous par +T.", d: "Aucun ne sort." },
        why: "La matrice de l'ensemble est BA dans un cas, AB dans l'autre, (5.36). Des rotations autour d'axes différents ne commutent pas. Dans la base de S, les deux ordres donneraient pourtant les mêmes probabilités : seules les phases diffèrent. Leçon « La machinerie de la mécanique quantique »." },
      filtre: { prompt: "Quelle est la matrice, dans la base de S, d'un filtre S qui ne laisse passer que la voie 0 ?",
        options: { a: "Un seul 1, au centre ; des zéros ailleurs. Elle n'est pas unitaire.", b: "La matrice unité.", c: "Des 1 sur la ligne du milieu.", d: "1/3 partout." },
        why: "⟨0S|A|0S⟩ = 1, tous les autres éléments sont nuls. Une colonne nulle signifie que les atomes de cet état sont arrêtés : le filtre perd des atomes. Leçon « La machinerie de la mécanique quantique »." },
      z: { prompt: "Un état a pour amplitudes C₊ = 0,6, C₀ = 0,8 i, C₋ = 0 dans la base de S. Que deviennent-elles pour T tourné de β = 90° autour de z ?",
        options: { a: "0,6 ; 0,8 i ; 0, inchangées.", b: "0 ; 0,8 i ; 0,6 : les voies + et \u2212 s'échangent.", c: "0,6 i ; 0,8 i ; 0 : seules les phases changent, par (5.39).", d: "0,6 ; 0 ; 0,8 i." },
        hint: "(5.39) : e^(iβ), 1, e^(\u2212iβ) sur la diagonale.",
        why: "C′₊ = e^(iπ/2) × 0,6 = 0,6 i, C′₀ = 0,8 i, C′₋ = 0. Les probabilités 0,36 et 0,64 ne changent pas. Leçon « Le changement de base »." },
      vecteur: { prompt: "L'état 0S a pour vecteur (5.42) l'axe z lui-même. T est tourné de 60° autour de y. Quelle fraction des atomes 0S sort par 0T ?",
        options: { a: "1/2.", b: "3/4.", c: "Aucune.", d: "1/4 : la projection de z sur z′ vaut cos 60°, au carré." },
        why: "C′₀ = C′_z = cos 60° = 1/2, probabilité 1/4, en accord avec ⟨0T|0S⟩ = cos α de (5.38). Les trois amplitudes tournent comme un vecteur. Leçon « Le changement de base »." },
      melange: { prompt: "Faisceau 1 : chaque atome est dans l'état (+S \u2212 \u2212S)/√2. Faisceau 2 : moitié +S, moitié \u2212S. Les deux entrent dans T tourné de 90° autour de y. Quelle fraction de chacun sort par 0T ?",
        options: { a: "La moitié pour les deux.", b: "Tous pour le premier, la moitié pour le second.", c: "La moitié pour le premier, tous pour le second.", d: "Un tiers pour les deux." },
        why: "Le faisceau 1 est un état pur, l'état 0 selon x : tout passe 0T à 90°. Le faisceau 2 est un mélange : on moyenne les probabilités, (1/2 + 1/2)/2 = 1/2. Un appareil S ne les distinguait pas. Leçon « Autres situations de spin 1 »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

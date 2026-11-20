/* Épreuve de l'étape « Statistiques quantiques en pratique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      occupation: { prompt: "Dans une cavité à l'équilibre, un état de photons a ħω = k_BT. Combien de photons contient-il en moyenne ?",
        options: { a: "Environ 0,58, soit 1/(e \u2212 1).", b: "Environ 0,37, soit e^(\u22121).", c: "Exactement 1, puisque ħω = k_BT.", d: "Environ 1,72, soit e \u2212 1." },
        hint: "Écrivez l'équilibre entre absorptions N_g n̄ et émissions N_e (n̄ + 1).",
        why: "(4.32) avec x = 1 : n̄ = 1/(e \u2212 1) ≈ 0,58. La valeur e^(\u22121) est celle qu'on trouverait sans émission stimulée. Leçon « Le spectre du corps noir par les bosons »." },
      stimulee: { prompt: "À l'équilibre, dans un état de photons où ħω = 0,1 k_BT, combien d'émissions stimulées y a-t-il par émission spontanée ?",
        options: { a: "Environ 0,1 : l'émission stimulée est toujours faible.", b: "Environ 9,5 : autant que de photons dans l'état, n̄ = 1/(e^0,1 \u2212 1).", c: "Exactement 1.", d: "Aucune : à l'équilibre, l'émission stimulée s'annule." },
        why: "Les émissions vers un état qui contient n photons sont dans le rapport (n + 1) : 1 au cas sans photon ; la part stimulée est n̄ fois la spontanée. Aux basses fréquences, elle domine : c'est elle qui donne la loi de Planck au lieu de celle de Wien. Leçon « Le spectre du corps noir par les bosons »." },
      modes: { prompt: "On double le côté d'une cavité cubique, très grande devant la longueur d'onde. Par combien est multiplié le nombre de modes entre ω et ω + Δω ?",
        options: { a: "Par 2, comme le côté.", b: "Par 4, comme la surface des parois.", c: "Par 8, comme le volume.", d: "Il ne change pas : il ne dépend que de ω." },
        why: "(4.42) : le nombre de modes vaut V ω² Δω/(π² c³), proportionnel au volume tant que kL ≫ 1. Le terme de paroi, proportionnel à la surface, n'est qu'une correction relative en 1/kL. Leçon « Le spectre du corps noir par les bosons »." },
      sansn: { prompt: "Si l'émission ne dépendait pas du nombre de photons déjà présents, de combien l'énergie totale du rayonnement d'une cavité serait-elle fausse, et où ?",
        options: { a: "De 50\u00a0%, également répartis sur tout le spectre.", b: "De rien : seul le maximum du spectre se déplacerait.", c: "D'un facteur infini, aux hautes fréquences.", d: "D'environ 8\u00a0% en moins, surtout aux basses fréquences, sous le maximum du spectre." },
        hint: "Les aires sous x³/(e^x \u2212 1) et x³e^(\u2212x) valent π⁴/15 et 6.",
        why: "6/(π⁴/15) ≈ 0,924. Les 85\u00a0% de ce manque se trouvent sous le maximum du spectre, x ≈ 2,82. Les deux lois se confondent quand ħω ≫ k_BT, et diffèrent quand x approche 1 ou moins, là où les états contiennent plusieurs photons. Leçon « Le spectre du corps noir par les bosons »." },
      isotopes: { prompt: "À 1\u00a0K, l'hélium 4 et l'hélium 3 liquides ont tous deux nλ_th³ ≈ 15. Pourquoi l'un est-il superfluide et pas l'autre ?",
        options: { a: "L'hélium 4 est un boson : ses atomes tendent à occuper tous le même état ; ceux de l'hélium 3, des fermions, remplissent les états un à un.", b: "L'hélium 3 est trop léger pour que ses ondes se recouvrent.", c: "L'hélium 3 est plus dense, donc plus visqueux.", d: "L'hélium 4 est le seul des deux à être liquide à 1\u00a0K." },
        why: "Les deux liquides sont dégénérés : leurs ondes se recouvrent. Ce qui les distingue est le signe de l'amplitude d'échange. L'hélium 3 ne devient superfluide que sous 3\u00a0mK, en formant des paires. Leçons « L'hélium liquide » et « Le principe d'exclusion de Pauli »." },
      rubidium: { prompt: "Un gaz de rubidium 87 contient 10¹⁹ atomes par mètre cube. Si on le traite comme un gaz de bosons parfait, vers quelle température commence-t-il à se condenser ?",
        options: { a: "Vers 2\u00a0K, comme l'hélium.", b: "Vers 90\u00a0nK : à cette densité, il faut descendre très bas pour que nλ_th³ atteigne 2,612.", c: "Vers 300\u00a0K.", d: "Jamais : un gaz dilué ne se condense pas." },
        hint: "T_c varie comme n^(2/3)/m ; ce gaz est un milliard de fois moins dense que l'hélium liquide.",
        why: "T_c = (2πħ²/(m k_B))(n/2,612)^(2/3) ≈ 8,6 × 10⁻⁸\u00a0K. Les atomes y interagissent peu : la formule du gaz parfait, à 45\u00a0% près pour l'hélium liquide, est presque juste pour ces gaz. Leçon « L'hélium liquide »." },
      souscouche: { prompt: "Combien d'électrons une sous-couche d (ℓ = 2) peut-elle contenir au plus ?",
        options: { a: "2 : deux états de spin.", b: "5 : un par orientation.", c: "10 : cinq états d'espace, deux spins par état.", d: "18 : toute la couche n = 3." },
        why: "2(2ℓ + 1) = 10. Le principe d'exclusion n'autorise qu'un électron par état ; chaque état d'espace a deux états de spin. La couche n = 3 entière en contient 2n² = 18. Leçon « Le principe d'exclusion de Pauli »." },
      liaison: { prompt: "Pourquoi la liaison chimique la plus forte entre deux atomes ne met-elle que deux électrons entre les noyaux ?",
        options: { a: "Parce que deux électrons suffisent à neutraliser deux noyaux.", b: "Parce que la répulsion entre trois électrons serait trop forte.", c: "Parce que deux électrons de même spin s'attirent.", d: "Parce que l'exclusion ne permet pas plus de deux électrons, de spins opposés, à peu près au même endroit." },
        why: "Au même endroit, deux électrons doivent avoir des spins opposés ; un troisième n'a plus d'état disponible et doit aller ailleurs. Pour des spins opposés, l'amplitude d'espace est symétrique et la densité entre les noyaux est renforcée. Leçon « Le principe d'exclusion de Pauli »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

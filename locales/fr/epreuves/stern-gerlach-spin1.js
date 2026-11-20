/* Épreuve de l'étape « Filtres de Stern et Gerlach » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      deviation: { prompt: "Dans un appareil de Stern et Gerlach, un atome de 100\u00a0u et de moment μ_B traverse à 500\u00a0m·s⁻¹ un aimant de 10\u00a0cm dont le gradient vaut 100\u00a0T·m⁻¹, puis vole 20\u00a0cm. On double la vitesse. Que devient la déviation sur l'écran, et pourquoi ?",
        options: { a: "Elle est divisée par 2 : la force agit deux fois moins longtemps.", b: "Elle est divisée par 4 : la vitesse transverse acquise est deux fois plus faible, et le vol jusqu'à l'écran deux fois plus court.", c: "Elle ne change pas : la force μ_z ∂B/∂z ne dépend pas de la vitesse.", d: "Elle double : l'atome arrive plus vite." },
        hint: "Comptez le temps passé dans l'aimant, puis le temps de vol.",
        why: "z = μ_zG L (L/2 + D)/(m v²) : en 1/v². Avec ces valeurs, la déviation vaut environ 0,56\u00a0mm, plus de cinq fois la largeur d'une fente de 0,1\u00a0mm ; à 1\u00a0000\u00a0m·s⁻¹, elle tombe à 0,14\u00a0mm et les taches commencent à se recouvrir. Leçon « Filtrer des atomes avec un appareil de Stern et Gerlach »." },
      trois: { prompt: "Pourquoi, avec un atome de spin 1, voit-on trois taches et non une bande continue ?",
        options: { a: "Parce que le four émet les atomes dans trois directions.", b: "Parce que l'aimant a trois pôles.", c: "Parce que la diffraction par la fente découpe le jet en trois.", d: "Parce que la composante μ_z ne prend que trois valeurs, +μ, 0 et \u2212μ, et que la force ne dépend que d'elle." },
        why: "F_z = μ_z ∂B/∂z : un jet par valeur de μ_z. Une orientation classique au hasard donnerait une bande. La diffraction est négligeable : λ de de Broglie ≈ 10⁻¹¹\u00a0m, 10⁷ fois plus petite que la fente. Leçon « Filtrer des atomes avec un appareil de Stern et Gerlach »." },
      incline: { prompt: "Des atomes +S entrent dans un appareil T tourné de 90° autour de l'axe du jet. Quelles fractions sortent par +T, 0T et \u2212T ?",
        options: { a: "1/4, 1/2, 1/4.", b: "1/3 chacune.", c: "1, 0, 0.", d: "1/2, 0, 1/2." },
        why: "À 90°, |⟨+T|+S⟩|² = (1 + cos α)²/4 = 1/4, |⟨0T|+S⟩|² = sin² α/2 = 1/2, |⟨\u2212T|+S⟩|² = 1/4. Le partage 1/2, 0, 1/2 est celui d'un atome 0S. Leçon « Expériences avec des atomes filtrés »." },
      somme: { prompt: "Un appareil T réel arrête 2\u00a0% des atomes sur ses bords. Que devient la relation (5.10) pour des atomes +S ?",
        options: { a: "Elle reste exacte : la somme vaut 1.", b: "Elle devient fausse : la somme peut dépasser 1.", c: "La somme des trois probabilités vaut 0,98 ; la perte est une quatrième issue.", d: "Elle ne s'applique plus du tout." },
        why: "(5.10) dit que chaque atome sort par une des trois voies : exacte pour un appareil sans perte. Une perte est une issue de plus, et les trois probabilités en gardent le reste. Leçon « Expériences avec des atomes filtrés »." },
      serie: { prompt: "Filtres S (+S), puis T à 60° (0T), puis S′ (+S). Quelle fraction des atomes sortis de S traverse S′ ?",
        options: { a: "3/8.", b: "9/64, soit 3/8 × 3/8.", c: "1/3.", d: "Zéro, car ⟨+S|+S⟩ = 1 ne laisse rien à T." },
        hint: "|⟨0T|+S⟩|² = sin² α/2, et |⟨+S|0T⟩|² est le même nombre.",
        why: "À 60°, sin² α/2 = 3/8. La fraction est le produit |⟨0T|+S⟩|² × |⟨+S|0T⟩|² = (3/8)² = 9/64 ≈ 0,14. Leçon « Des filtres de Stern et Gerlach en série »." },
      memoire: { prompt: "Dans la chaîne S, T (0T), S′, on remplace le premier filtre +S par un filtre \u2212S. Que change-t-on ?",
        options: { a: "Le nombre d'atomes qui atteignent S′, mais pas la fraction de ceux-là qui passe S′.", b: "La fraction qui passe S′ parmi ceux sortis de T.", c: "Rien du tout.", d: "La voie par laquelle les atomes sortent de T." },
        why: "Un filtre à une voie efface le passé : tous les atomes sortent de T dans l'état 0T. N₂ dépend du premier filtre ; N₃/N₂ = |⟨kS′|0T⟩|² non. Leçon « Des filtres de Stern et Gerlach en série »." },
      ouvert: { prompt: "Des atomes +S traversent T (à 60°) grand ouvert, puis un filtre 0S′. Combien passent ? Et si l'on ne garde que la voie 0T ?",
        options: { a: "Un tiers dans les deux cas.", b: "Tous, puis aucun.", c: "Une fraction 9/64, puis 3/32.", d: "Aucun, puis une fraction 3/32 ≈ 0,094." },
        why: "Grand ouvert, T ne fait rien : les atomes restent +S, et ⟨0S|+S⟩ = 0. Avec la seule voie 0T : 3/8 × cos² 60° = 3/8 × 1/4 = 3/32. Fermer des voies fait passer plus d'atomes : (5.17) et (5.15). Leçon « Les états de base »." },
      base: { prompt: "Lequel de ces ensembles n'est pas un ensemble d'états de base pour un atome de spin 1 ?",
        options: { a: "+T, 0T, \u2212T pour un appareil T d'orientation quelconque.", b: "+S, 0S, \u2212S.", c: "+S et \u2212S seulement.", d: "Les trois états d'un appareil orienté selon x." },
        why: "Une base doit être complète : un atome 0S n'est trouvé ni en +S ni en \u2212S. Toute orientation fournit une base de trois états. Leçon « Les états de base »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

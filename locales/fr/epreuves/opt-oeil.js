/* Épreuve de l'étape « L’œil et la couleur » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      presbyte: { prompt: "À 45 ans, l'amplitude d'accommodation moyenne est de 5\u00a0m⁻¹. Un œil sans autre défaut voit-il net un texte à 15\u00a0cm ?",
        options: { a: "Non : il faudrait 1/0,15 ≈ 6,7\u00a0m⁻¹ d'accommodation ; le point le plus proche est à 1/5 = 20\u00a0cm.", b: "Oui : 5\u00a0m⁻¹ suffisent jusqu'à 5\u00a0cm.", c: "Oui, en fermant la pupille, l'image devient exacte.", d: "Non : à 45 ans, plus rien n'est net de près." },
        hint: "a_req = 1/d + K \u2212 Vc, de « L’œil humain », avec K = 0 et Vc = 0.",
        why: "L'accommodation requise vaut 1/d. Elle dépasse 5\u00a0m⁻¹ sous 20\u00a0cm. Fermer la pupille réduit le flou, sans l'annuler : à 3\u00a0mm, il manque 1,7\u00a0m⁻¹, soit 5 × 10⁻³\u00a0rad, 17′. Leçon « L’œil humain »." },
      myope: { prompt: "Un myope voit net jusqu'à 50\u00a0cm au plus, sans verre. Quel verre, supposé accolé à l'œil, lui rend la vision de loin ?",
        options: { a: "+2\u00a0m⁻¹ : il faut l'aider à converger.", b: "\u22122\u00a0m⁻¹ : son œil a 2\u00a0m⁻¹ de trop pour l'infini.", c: "\u22120,5\u00a0m⁻¹, l'inverse de la distance en centimètres.", d: "Aucun : il suffit qu'il accommode davantage." },
        why: "Le point le plus lointain est à 1/(Vc \u2212 K) ; 50\u00a0cm donne K = \u22122\u00a0m⁻¹. Le verre Vc = K = \u22122\u00a0m⁻¹ le renvoie à l'infini. Accommoder ajoute de la vergence : cela aggrave la myopie au lieu de la corriger. Leçon « L’œil humain »." },
      flou: { prompt: "Un œil a une erreur de mise au point de 0,5\u00a0m⁻¹ et une pupille de 4\u00a0mm. Quel est son flou angulaire, et le voit-il ?",
        options: { a: "0,5\u00a0rad : il ne voit plus rien.", b: "2 × 10⁻⁴\u00a0rad : sous la minute d'arc, invisible.", c: "2 × 10⁻³\u00a0rad, environ 7′ : sept fois le pas de l'acuité, nettement flou.", d: "Aucun : le flou ne dépend que de la distance." },
        hint: "β ≈ D |ΔV|.",
        why: "β = 4 × 10⁻³ × 0,5 = 2 × 10⁻³\u00a0rad = 6,9′. L'acuité normale distingue une période d'une minute d'arc environ. À 2\u00a0mm de pupille, le flou serait deux fois moindre. Leçon « L’œil humain »." },
      fovea: { prompt: "Au centre de la fovéa, les cônes sont à 2,4\u00a0µm l'un de l'autre, soit une demi-minute d'arc. Une pupille de 3\u00a0mm donne une tache de diffraction de 0,77′ à 550\u00a0nm. Qu'en conclure ?",
        options: { a: "Que la rétine est trop grossière pour l'optique de l'œil.", b: "Que la diffraction est négligeable dans l'œil.", c: "Que les cônes sont espacés au hasard.", d: "Que la mosaïque échantillonne la tache de diffraction au plus juste : deux cônes par période d'une minute d'arc, ni gaspillage d'optique, ni gaspillage de capteurs." },
        why: "Pour voir une alternance, il faut deux cônes par période : 1′. C'est l'acuité de 10/10, du même ordre que 1,22 λ/D. Des cônes plus serrés ne verraient rien de plus fin ; plus espacés, ils perdraient ce que l'optique donne. Leçon « L’œil humain »." },
      purkinje: { prompt: "Deux lumières de même radiance, l'une à 470\u00a0nm, l'autre à 620\u00a0nm. Laquelle paraît la plus claire, de jour, puis de nuit ?",
        options: { a: "De jour la rouge, 4,2 fois plus ; de nuit la bleue, 92 fois plus : les bâtonnets ne voient presque pas le rouge.", b: "Toujours la bleue, plus énergétique par photon.", c: "Toujours la rouge, mieux transmise par l'œil.", d: "Elles paraissent toujours égales, puisque la radiance est la même." },
        hint: "Comparez V et V′ aux deux longueurs d'onde.",
        why: "V(620)/V(470) = 0,381/0,091 ≈ 4,2 ; V′(470)/V′(620) = 0,676/0,0074 ≈ 92. C'est l'effet Purkinje. Leçon « La couleur dépend de l’intensité »." },
      rue: { prompt: "Une place est éclairée à 1\u00a0cd·m⁻². Que donne le modèle mésopique de « La couleur dépend de l’intensité » ?",
        options: { a: "m = 0 : seuls les bâtonnets voient.", b: "m ≈ 0,77 : les cônes dominent, mais les bâtonnets comptent encore ; le maximum de sensibilité glisse sous 555\u00a0nm.", c: "m = 1 : la vision est photopique.", d: "Le modèle ne vaut qu'au-dessus de 5\u00a0cd·m⁻²." },
        why: "m = 0,7670 + 0,3334 × log₁₀ 1 = 0,767. Le domaine mésopique va de 0,005 à 5\u00a0cd·m⁻² ; une lumière riche en bleu y paraît plus efficace que ne le dit V(λ) seule. Leçon « La couleur dépend de l’intensité »." },
      negatif: { prompt: "Avec les primaires de la CIE, une raie à 520\u00a0nm demande r̄ = \u22120,093, ḡ = 0,175, b̄ = 0,012. Comment réalise-t-on cette égalisation ?",
        options: { a: "En retirant du rouge du mélange avec un filtre.", b: "C'est impossible : aucune égalisation n'existe.", c: "En ajoutant 0,093 de rouge à la raie : raie + 0,093 R paraît identique à 0,175 G + 0,012 B.", d: "En baissant l'intensité de la raie." },
        why: "Par la loi (35.3), un terme qui change de côté change de signe : c'est le sens d'une quantité négative dans (35.4). La raie est plus saturée que tout mélange de ces trois primaires. Leçon « Mesurer la sensation de couleur »." },
      somme: { prompt: "Un orangé vaut 0,30 R + 0,10 G + 0,00 B, un bleu-vert \u22120,05 R + 0,12 G + 0,08 B. Que vaut leur mélange, et sur quoi repose le calcul ?",
        options: { a: "0,30 R + 0,12 G + 0,08 B : on garde le plus grand de chaque.", b: "On ne peut rien dire sans mesurer le spectre du mélange.", c: "0,125 R + 0,11 G + 0,04 B : la moyenne.", d: "0,25 R + 0,22 G + 0,08 B : les quantités s'ajoutent, par (35.6), parce que la loi de Grassmann (35.3) permet de remplacer chaque couleur par son mélange équivalent." },
        why: "Une couleur est un vecteur à trois composantes ; le mélange est leur somme. Cela vaut en vision de jour ; au crépuscule, les bâtonnets rompent les égalités. Leçon « Mesurer la sensation de couleur »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Miroirs sphériques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      foyer: { prompt: "Un miroir concave concentre la lumière du Soleil en un point situé à 30 cm devant lui. Avec l'axe orienté dans le sens de la lumière incidente, que valent son rayon de courbure et sa vergence ?",
        options: { a: "R = +60 cm, V = \u22123,3 m⁻¹.", b: "R = \u221260 cm, V = +3,3 m⁻¹.", c: "R = \u221230 cm, V = +6,7 m⁻¹.", d: "R = \u221215 cm, V = +13 m⁻¹." },
        hint: "Le foyer est à mi-chemin du sommet et du centre ; V = \u22122/R.",
        why: "Le Soleil est à l'infini : son image est au foyer, f = \u221230 cm. Par f = R/2, R = 2f = \u221260 cm, le centre étant devant le miroir ; par V = \u22122/R, V = 3,3 m⁻¹. Leçon « Miroirs concaves et convexes : centre, sommet, foyer »." },
      aberration: { prompt: "Un faisceau parallèle de 10 cm de diamètre frappe un miroir concave de 1 m de rayon. De combien les rayons du bord manquent-ils le foyer de Gauss, et de quel côté ?",
        options: { a: "De 2,5 mm, plus loin du miroir.", b: "De rien : un miroir sphérique est stigmatique pour un objet à l'infini.", c: "De 25 mm, plus près du miroir.", d: "D'environ 0,6 mm, plus près du miroir." },
        hint: "F F_h ≈ \u2212h²/(4R) avec h = 5 cm.",
        why: "h²/(4|R|) = 0,0025/4 ≈ 0,63 mm, vers le miroir : dans le triangle isocèle CF_h = |R|/(2 cos i), 1/cos i > 1 éloigne du centre le point de croisement. C'est l'aberration sphérique, en h² ; seul le paraboloïde en est exempt sur l'axe. Leçon « Miroirs concaves et convexes : centre, sommet, foyer »." },
      conjugaison: { prompt: "Un objet réel est à 30 cm d'un miroir concave de focale \u221220 cm. Où est l'image, et comment est-elle ?",
        options: { a: "Réelle, à 60 cm devant le miroir, renversée, deux fois plus grande.", b: "Virtuelle, à 60 cm derrière le miroir, droite, deux fois plus grande.", c: "Réelle, à 12 cm devant le miroir, renversée, réduite.", d: "À l'infini : l'objet est au foyer." },
        hint: "1/p′ = 1/f \u2212 1/p, puis γ = \u2212p′/p.",
        why: "1/p′ = \u22125 + 3,33 = \u22121,67 m⁻¹, p′ = \u221260 cm : devant le miroir, réelle. γ = \u2212(\u22120,6)/(\u22120,3) = \u22122. L'objet est entre C et F, l'image au-delà de C. Leçon « Relations de conjugaison et de grandissement dans les conditions de Gauss »." },
      retroviseur: { prompt: "Un rétroviseur convexe de 1,2 m de rayon montre une voiture située à 20 m. Où est son image, et de combien est-elle réduite ?",
        options: { a: "Réelle, à 60 cm devant le miroir, réduite 33 fois.", b: "Virtuelle, à 1,2 m derrière le miroir, réduite 17 fois.", c: "Virtuelle, à environ 58 cm derrière le miroir, droite, réduite environ 34 fois.", d: "Virtuelle, à 20 m derrière le miroir, de même taille." },
        hint: "f = +0,6 m ; l'image d'un objet lointain est presque au foyer.",
        why: "1/p′ = 1/0,6 + 1/20 = 1,717 m⁻¹, p′ = +0,58 m : derrière le miroir, virtuelle, un peu en deçà du foyer. γ = \u2212p′/p = 0,58/20 ≈ 0,029 : droite, environ 34 fois plus petite. Comparée à un miroir plan, où elle serait à 20 m et de même taille, l'image est vue sous un angle plus petit. Leçon « Relations de conjugaison et de grandissement dans les conditions de Gauss »." },
      newton: { prompt: "Un objet réel est 10 cm au-delà du foyer d'un miroir concave de focale \u221225 cm. Que donne la relation de Newton ?",
        options: { a: "L'image est 62,5 cm de l'autre côté du foyer, entre F et S.", b: "L'image est 62,5 cm au-delà du foyer, du même côté que l'objet, et γ = \u22122,5.", c: "L'image est au foyer.", d: "L'image est 2,5 cm au-delà du foyer, et γ = \u22120,4." },
        hint: "Le produit des distances au foyer vaut f², positif.",
        why: "σ = \u221210 cm, σ′ = f²/σ = 625/(\u221210) = \u221262,5 cm : du même côté du foyer que l'objet, puisque σσ′ > 0. γ = \u2212f/σ = \u22122,5. Vérification par la relation de conjugaison au sommet : p = \u221235 cm, p′ = \u221287,5 cm, γ = \u2212p′/p = \u22122,5. Leçon « Relations de conjugaison et de grandissement dans les conditions de Gauss »." },
      autocollimation: { prompt: "On place un miroir plan quelques centimètres derrière une lentille convergente, puis on déplace une mire éclairée jusqu'à voir son image nette dans son propre plan. Que mesure-t-on ?",
        options: { a: "Le rayon de courbure du miroir.", b: "La moitié de la focale, puisque la lumière traverse deux fois la lentille.", c: "La distance entre la lentille et le miroir.", d: "La focale : la mire est au foyer objet, et son image revient dans le même plan, renversée, quelle que soit la distance au miroir." },
        why: "Issue du plan focal, la lumière sort parallèle de la lentille, revient parallèle du miroir plan, et la lentille la refocalise dans le plan focal : γ = γ₁ γ₂ γ₃ = \u22121. La distance lentille-miroir n'intervient pas : c'est l'autocollimation. Leçon « Constructions d’images, montages lentilles et miroirs »." },
      accole: { prompt: "Une lentille convergente de 50 cm de focale est accolée à un miroir concave de 1 m de rayon. Quelle est la focale du miroir équivalent ?",
        options: { a: "Environ \u221216,7 cm : la vergence vaut 2 × 2 + 2 = 6 m⁻¹.", b: "\u221225 cm : les focales s'ajoutent en inverse une seule fois.", c: "\u221250 cm : la lentille ne compte pas, le miroir seul fait l'image.", d: "\u221233 cm : la vergence vaut 2 + 1 = 3 m⁻¹." },
        hint: "La lumière traverse deux fois la lentille.",
        why: "Par V = 2 V_L + V_M, V = 2/f′ \u2212 2/R = 4 + 2 = 6 m⁻¹, et f = \u22121/V ≈ \u221216,7 cm. Chaque traversée de la lentille ajoute sa vergence ; la réflexion ajoute celle du miroir. Leçon « Constructions d’images, montages lentilles et miroirs »." },
      virtuel: { prompt: "Dans un télescope, un miroir concave de 40 cm de rayon reçoit un faisceau qui convergeait vers un point situé 20 cm derrière lui. Où le faisceau converge-t-il après réflexion ?",
        options: { a: "Nulle part : un objet virtuel ne donne pas d'image.", b: "À 20 cm derrière le miroir : un objet virtuel donne une image virtuelle.", c: "À 10 cm devant le miroir, en une image réelle droite, deux fois plus petite.", d: "À 40 cm devant le miroir, au centre." },
        hint: "L'objet virtuel est en p = +0,2 m ; R = \u22120,4 m.",
        why: "1/p′ = 2/R \u2212 1/p = \u22125 \u2212 5 = \u221210 m⁻¹, p′ = \u221210 cm : devant le miroir, réelle. γ = \u2212p′/p = 0,5 : droite. Dans un montage, l'image d'un élément est souvent un objet virtuel pour le suivant, et la même relation s'applique. Leçon « Constructions d’images, montages lentilles et miroirs »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

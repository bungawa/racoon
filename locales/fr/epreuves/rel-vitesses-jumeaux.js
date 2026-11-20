/* Épreuve de l'étape « Vitesses et jumeaux » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      deux: { prompt: "Un vaisseau va à 0,6 c par rapport au sol ; à bord, une sonde est lancée vers l'avant à 0,6 c. Quelle est la vitesse de la sonde au sol ?",
        options: { a: "Environ 0,88 c.", b: "1,2 c.", c: "0,6 c.", d: "Exactement c." },
        hint: "(16.6) : divisez la somme par 1 + uv/c².",
        why: "(0,6 + 0,6)/(1 + 0,36) = 1,2/1,36 ≈ 0,88 : la vitesse au sol reste sous c. 1,2 c est l'addition de Galilée, qui néglige uv/c² = 0,36 : rien de négligeable ici. Leçon « La composition des vitesses »." },
      inverse: { prompt: "Au sol, on mesure une particule à 0,9 c, dans le sens d'un vaisseau qui va à 0,6 c. Quelle est sa vitesse mesurée à bord ?",
        options: { a: "0,3 c, la différence des deux.", b: "Environ 0,65 c.", c: "Environ 0,21 c.", d: "0,9 c : la vitesse ne dépend pas du référentiel." },
        hint: "Pour le vaisseau, c'est le sol qui recule à \u22120,6 c : composez avec \u2212u.",
        why: "(0,9 \u2212 0,6)/(1 \u2212 0,9 × 0,6) = 0,3/0,46 ≈ 0,65 c. Composer avec \u2212u, c'est échanger les rôles du sol et du vaisseau : le passager a les mêmes lois que le sol, au signe de la vitesse près. Leçon « La composition des vitesses »." },
      jumeaux: { prompt: "Paul va à 0,6 c vers une étoile située, pour Pierre, à la distance que la lumière parcourt en 6 ans, et revient aussitôt. Demi-tours instantanés : quel âge ont-ils gagné chacun ?",
        options: { a: "Pierre 10 ans, Paul 8 ans.", b: "Pierre 16 ans, Paul 20 ans.", c: "Pierre 20 ans, Paul 16 ans.", d: "20 ans chacun : le mouvement est relatif." },
        hint: "T = 2D/v pour Pierre ; τ = T√(1 \u2212 β²) pour Paul.",
        why: "T = 2 × 6/0,6 = 20 ans ; √(1 \u2212 0,36) = 0,8, donc τ = 16 ans. Celui qui a fait demi-tour, et l'a senti, est le plus jeune. Leçon « Le paradoxe des jumeaux »." },
      accel: { prompt: "Paul part du repos avec une accélération propre constante de 9,81 m·s⁻², pour laquelle c/a ≈ 0,97 an. Combien de temps passe-t-il à bord avant d'atteindre 0,6 c ?",
        options: { a: "Environ 0,58 an, soit v/a.", b: "Environ 0,73 an.", c: "Environ 0,97 an.", d: "Environ 0,67 an." },
        hint: "τₐ = (c/a) argth β, et argth 0,6 = ln 2.",
        why: "τₐ = 0,97 × 0,693 ≈ 0,67 an à bord. Au sol, la même phase dure (c/a)γβ = 0,97 × 0,75 ≈ 0,73 an ; v/a = 0,58 an serait la réponse de Newton. Leçon « Le paradoxe des jumeaux »." },
      eclairs: { prompt: "Pendant ce voyage de 20 ans à 0,6 c, Pierre envoie un éclair à chacun de ses anniversaires. Combien Paul en reçoit-il pendant son retour, qui dure 8 ans pour lui ?",
        options: { a: "16, un tous les 6 mois.", b: "8, un par an.", c: "4, un tous les 2 ans.", d: "10, la moitié des anniversaires de Pierre." },
        hint: "Au retour, les éclairs arrivent rapprochés du facteur k = √((1 \u2212 β)/(1 + β)) = 0,5.",
        why: "Au retour, Paul reçoit 2 éclairs par an pendant 8 ans : 16. À l'aller, un tous les 2 ans : 4 en 8 ans, plus celui du départ. Il en compte 21 en tout, les anniversaires 0 à 20 de Pierre : les deux jumeaux sont d'accord. Leçon « Le paradoxe des jumeaux »." },
      oblique: { prompt: "Dans un vaisseau qui va à 0,6 c, un objet se déplace perpendiculairement au mouvement, à 0,5 c par rapport au vaisseau. Quelle est sa vitesse au sol ?",
        options: { a: "Environ 0,78 c, √(0,6² + 0,5²).", b: "Environ 0,72 c, car sa composante transverse devient 0,4 c.", c: "Environ 0,91 c, par (16.6).", d: "0,5 c, car seule compte la vitesse à bord." },
        hint: "(16.7) : la composante transverse est multipliée par √(1 \u2212 u²/c²) = 0,8.",
        why: "Composante selon le mouvement : 0,6 c ; composante transverse : 0,5 × 0,8 = 0,4 c ; et √(0,36 + 0,16) ≈ 0,72 c. Entre deux mêmes événements, le sol mesure une durée γ fois plus longue que le bord, pour la même distance transverse : la composante transverse diminue. Leçon « La composition des vitesses »." },
      train: { prompt: "Vous êtes dans un wagon sans fenêtre, sur des rails parfaitement lisses. Que pouvez-vous détecter sans regarder dehors ?",
        options: { a: "La vitesse du train, en mesurant la vitesse de la lumière dans le wagon.", b: "Rien du tout : tout mouvement est relatif.", c: "Les virages et les freinages, pas une vitesse constante en ligne droite.", d: "La vitesse du train, mais seulement si elle dépasse 100 m·s⁻¹." },
        why: "Le principe de relativité ne porte que sur la translation uniforme : aucune expérience intérieure ne la révèle, la lumière va à c dans le wagon. Un virage ou un freinage produit des forces d'inertie mesurables. Ce partage est un résultat d'expérience. Leçon « La relativité et les philosophes »." },
      foucault: { prompt: "À la latitude 30°, en combien de temps le plan d'un pendule de Foucault fait-il un tour par rapport au sol ? Le jour sidéral dure 23,9 h.",
        options: { a: "23,9 h, comme partout.", b: "Jamais : le plan ne tourne qu'au pôle.", c: "12 h.", d: "Environ 48 h." },
        hint: "Le plan tourne à Ω sin λ, et sin 30° = 0,5.",
        why: "La période vaut 23,9 h/sin λ = 23,9/0,5 ≈ 48 h. Au pôle, un jour sidéral ; à l'équateur, jamais. Le pendule mesure la rotation de la Terre sans regarder les étoiles. Leçon « La relativité et les philosophes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

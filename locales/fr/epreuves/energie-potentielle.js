/* Épreuve de l'étape « Énergie potentielle et forces conservatives » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      liberation: { prompt: "Au sol, le potentiel de gravitation de la Terre vaut \u221262,6\u00a0MJ·kg⁻¹, nul à l'infini. Sans air ni rotation de la Terre, quelle vitesse minimale faut-il donner à un projectile pour qu'il s'échappe, et dans quelle direction ?",
        options: { a: "7,9\u00a0km·s⁻¹, à l'horizontale, comme pour l'orbite rasante.", b: "11,2\u00a0km·s⁻¹, dans n'importe quelle direction qui ne recoupe pas le sol.", c: "11,2\u00a0km·s⁻¹, mais seulement à la verticale.", d: "Aucune vitesse finie ne suffit : le potentiel ne s'annule qu'à l'infini." },
        hint: "Il faut une énergie mécanique positive ou nulle : ½v² + φ ≥ 0.",
        why: "Em ≥ 0 donne ½v² ≥ 62,6\u00a0MJ·kg⁻¹, v ≥ √(2\u00a0×\u00a062,6\u00a0×\u00a010⁶) ≈ 11,2\u00a0km·s⁻¹ (φ de la leçon « Potentiels et champs », bilan de la leçon « Forces conservatives »). L'énergie potentielle ne dépend que de la distance au centre : la direction n'importe pas. 7,9\u00a0km·s⁻¹, √2 fois moins, est la vitesse de l'orbite rasante." },
      skieur: { prompt: "Un skieur de 80\u00a0kg part au repos et descend 50\u00a0m de dénivelé. Il arrive en bas à 20\u00a0m·s⁻¹. Que vaut le travail des frottements, neige et air ensemble ?",
        options: { a: "Environ +23\u00a0kJ : les frottements ont fourni l'écart.", b: "Environ \u221239\u00a0kJ, toute l'énergie potentielle perdue.", c: "On ne peut pas conclure sans la forme de la piste et la loi du frottement.", d: "Environ \u221223\u00a0kJ." },
        hint: "Théorème de l'énergie mécanique : ΔEm égale le travail des forces non conservatives.",
        why: "ΔEc = ½\u00a0×\u00a080\u00a0×\u00a020² = 16\u00a0kJ ; ΔEp = \u221280\u00a0×\u00a09,81\u00a0×\u00a050 ≈ \u221239,2\u00a0kJ ; Wnc = ΔEc + ΔEp ≈ \u221223\u00a0kJ (leçon « Forces non conservatives »). Pour le poids, conservatif, seuls les états initial et final comptent (leçon « Forces conservatives ») : la forme de la piste n'entre que dans Wnc, qu'on obtient sans la connaître." },
      champuniforme: { prompt: "On calcule une énergie potentielle de pesanteur avec φ = g z, champ uniforme. Dans laquelle de ces situations l'erreur relative dépasse-t-elle le pour cent ?",
        options: { a: "Un satellite à 400\u00a0km d'altitude : l'erreur, de l'ordre de h/R, atteint 6\u00a0%.", b: "Un avion à 10\u00a0km d'altitude : g y a beaucoup diminué.", c: "Une balle lancée à 50\u00a0m de haut dans un stade.", d: "Aucune : g z est exacte tant qu'on reste hors de la Terre." },
        hint: "L'erreur relative de g z vaut à peu près h/R, avec R ≈ 6\u202f371\u00a0km.",
        why: "Le développement au premier ordre en h/R a pour erreur h/R (leçon « Potentiels et champs ») : de l'ordre de 10⁻⁵ pour 50\u00a0m, 1,6\u00a0×\u00a010⁻³ pour 10\u00a0km, 6,3\u00a0% pour 400\u00a0km. Au-delà, on prend \u2212GMm/r, l'énergie potentielle de la gravitation d'un astre (leçon « Forces conservatives »)." },
      bloc: { prompt: "Un bloc d'acier de 0,5\u00a0kg relié à un ressort glisse sur une table, μ = 0,1. À sa vitesse maximale, 1,3\u00a0m·s⁻¹, l'air exerce environ 2\u00a0×\u00a010⁻³\u00a0N. Que garder dans le bilan d'énergie ?",
        options: { a: "Les deux forces : toute force qui dépend de la vitesse doit être gardée.", b: "Ni l'une ni l'autre : deux forces non conservatives d'effet comparable se compensent.", c: "Le frottement sur la table, environ 0,49\u00a0N, plus de 200 fois la traînée ; l'air se néglige.", d: "L'air seulement : le frottement solide, constant, se compense sur un aller-retour." },
        hint: "Calculez μ m g et comparez.",
        why: "μ m g = 0,1\u00a0×\u00a00,5\u00a0×\u00a09,81 ≈ 0,49\u00a0N, quelque 250 fois la traînée (leçon « Forces non conservatives »). La règle : comparer chaque force non conservative à la force principale, sur toute la durée du mouvement (leçon « Forces conservatives », bille d'acier contre balle de ping-pong). Un frottement solide ne se compense jamais : son travail est négatif à l'aller comme au retour." },
      amortir: { prompt: "Même bloc de 0,5\u00a0kg, ressort de 20\u00a0N·m⁻¹, mais μ = 0,2 au lieu de 0,1. Que deviennent la perte d'amplitude à chaque demi-oscillation et la période ?",
        options: { a: "La perte double, 2μmg/k ≈ 9,8\u00a0cm ; la période ne change pas.", b: "La perte double ; la période s'allonge, car le bloc est freiné.", c: "La perte reste 4,9\u00a0cm, mais l'amplitude décroît exponentiellement.", d: "La perte est multipliée par 4, comme l'énergie ; la période ne change pas." },
        hint: "Sur chaque demi-oscillation, le mouvement est sinusoïdal autour d'un centre décalé de μmg/k.",
        why: "Le frottement constant décale le centre de ±μmg/k : l'amplitude perd 2μmg/k = 2\u00a0×\u00a00,2\u00a0×\u00a00,5\u00a0×\u00a09,81/20 ≈ 9,8\u00a0cm par demi-oscillation, linéairement (leçon « Forces non conservatives »). La période, 2π√(m/k), vient de la courbure de l'énergie potentielle du ressort, que le frottement ne change pas (leçon « Forces conservatives »)." },
      amas: { prompt: "Un amas d'étoiles isolé a une énergie potentielle de gravitation de \u22124\u00a0×\u00a010⁴⁰\u00a0J, chaque paire comptée une fois, et une énergie cinétique de 1,5\u00a0×\u00a010⁴⁰\u00a0J. Quelle énergie minimale faut-il fournir pour disperser ses étoiles à l'infini et les y laisser au repos ?",
        options: { a: "4\u00a0×\u00a010⁴⁰\u00a0J, l'opposé de l'énergie potentielle.", b: "2,5\u00a0×\u00a010⁴⁰\u00a0J, l'opposé de l'énergie mécanique.", c: "5,5\u00a0×\u00a010⁴⁰\u00a0J : il faut en plus arrêter les étoiles.", d: "8\u00a0×\u00a010⁴⁰\u00a0J, car chaque paire attire ses deux étoiles." },
        hint: "À l'infini et au repos, l'énergie mécanique est nulle.",
        why: "Em = Ec + Ep = 1,5 \u2212 4 = \u22122,5\u00a0×\u00a010⁴⁰\u00a0J. Pour atteindre Em = 0, il faut fournir 2,5\u00a0×\u00a010⁴⁰\u00a0J : l'énergie de liaison, plus petite que |Ep| parce que les étoiles bougent déjà (leçon « Énergie d'un système de points »). Compter chaque paire deux fois donnerait 2Ep, et une somme qui n'est pas conservée." },
      centre: { prompt: "Au centre d'une planète homogène, le champ de gravitation est nul. Qu'en est-il du potentiel ?",
        options: { a: "Nul aussi : un champ nul veut dire un potentiel nul.", b: "Égal à sa valeur à la surface, \u2212GM/R, comme à l'intérieur d'une coquille.", c: "Plus bas qu'à la surface : c'est le minimum du potentiel.", d: "Plus haut qu'à la surface : le champ y est le plus faible, donc le potentiel le plus grand." },
        hint: "Le champ pointe vers les potentiels décroissants. Dans la boule, vers où pointe-t-il ?",
        why: "Dans la boule, le champ, proportionnel à r, pointe vers le centre (leçon « Champ de gravitation des corps étendus ») ; or il pointe vers les φ décroissants (leçon « Potentiels et champs »). Le potentiel baisse donc jusqu'au centre, où son gradient s'annule : un minimum. Dans une coquille, au contraire, le champ est nul partout à l'intérieur et le potentiel y est constant." },
      equipotentielle: { prompt: "Entre la Terre et la Lune, on déplace lentement une sonde le long d'une équipotentielle du système, d'un point à un autre. Que vaut le travail de la gravitation ?",
        options: { a: "Positif : le champ n'est pas nul le long du chemin.", b: "Nul seulement si le champ est nul partout sur le chemin.", c: "Il dépend du chemin suivi sur la surface.", d: "Nul : W = \u2212m Δφ et φ ne change pas, bien que le champ ne soit pas nul." },
        hint: "Le champ est perpendiculaire aux équipotentielles.",
        why: "Pour une force conservative, W = \u2212ΔEp = \u2212m Δφ (leçon « Forces conservatives »). Sur une équipotentielle, Δφ = 0 : le champ, perpendiculaire à la surface, l'est aussi à chaque déplacement (leçon « Potentiels et champs »)." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

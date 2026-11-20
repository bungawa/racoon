/* Leçon « La diffusion de la lumière par un atome » (Feynman III.18.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/diffusion-lumiere-atome-quantique.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La diffusion de la lumière par un atome",
    "crumb.jour": "La diffusion par un atome",
    "h1": "La diffusion de la lumière par un atome",
    "lede": "Un atome dans son état fondamental de spin 0 absorbe un photon, puis en réémet un, dans une autre direction. Les seules règles du moment cinétique donnent la loi angulaire de cette diffusion et la polarisation de la lumière diffusée : celle du bleu du ciel, retrouvée sans modèle de l'atome.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : le rayonnement dipolaire quantique",
    "eq.cos": "cos",

    "s1.sec": "Absorber, puis réémettre",
    "s1.h2": "Deux étapes, deux amplitudes",
    "s1.p1": "Le système : un atome de spin 0, au repos, éclairé par un photon qui arrive le long de +<var>z</var>, d'énergie loin de toute résonance. Un photon droit apporte +ħ : l'atome passe dans un état de spin 1, <var>m</var> = +1, avec une amplitude <var>c</var>. Puis il retombe à l'état de spin 0 en émettant un photon, exactement comme dans « Le rayonnement dipolaire électrique quantique ». L'amplitude de diffusion vers θ est le produit :",
    "val.18.3": "Exacte dans le modèle à un état intermédiaire de spin 1 et de parité impaire, en transition dipolaire électrique ; <var>a</var> et <var>c</var> ne sont pas donnés par les symétries. Pour une lumière loin de la résonance, l'état intermédiaire n'est pas occupé longtemps : il ne sert qu'à porter le moment cinétique.",
    "val.18.4": "Exacte dans le même modèle. Les deux autres amplitudes, ⟨<var>R</var>′|<var>S</var>|<var>L</var>⟩ et ⟨<var>L</var>′|<var>S</var>|<var>L</var>⟩, s'obtiennent de la même façon, par symétrie : \u2212<var>ac</var>(1 \u2212 cos θ)/2 et <var>ac</var>(1 + cos θ)/2.",
    "s1.p2": "Vers l'avant, θ = 0, le photon diffusé garde sa polarisation circulaire ; vers l'arrière, θ = 180°, il revient avec la polarisation opposée, ce qui conserve le moment cinétique selon <var>z</var>, puisqu'il va en sens inverse.",

    "s2.sec": "La lumière polarisée linéairement",
    "s2.h2": "Passer en polarisations x et y",
    "s2.p1": "Une lumière polarisée linéairement est une superposition des deux polarisations circulaires :",
    "val.18.7": "Exacte : changement de base des états de polarisation d'un photon, à une phase près selon la convention choisie pour |<var>R</var>⟩ et |<var>L</var>⟩.",
    "s2.p2": "Prenons le plan de diffusion <var>xz</var>. Avec ces quatre amplitudes et les composantes de |<var>x</var>⟩, l'amplitude de sortir polarisé selon <var>x</var>′, la direction de <var>x</var> tournée de θ, est :",
    "val.18.17": "Exacte dans le modèle : c'est l'amplitude d'un dipôle classique qui oscille selon <var>x</var>, vu sous l'angle θ. Une lumière incidente polarisée selon <var>y</var>, perpendiculaire au plan de diffusion, donne ⟨<var>y</var>′|<var>S</var>|<var>y</var>⟩ = <var>ac</var> pour tout θ.",
    "val.18.18": "Exacte dans le modèle : la lumière diffusée garde la polarisation <var>x</var>, aucun mélange avec <var>y</var>. Elle cesse de valoir si l'atome a un spin non nul, qui peut se retourner pendant la diffusion.",

    "s3.sec": "Explorer la diffusion",
    "s3.h2": "Intensité et polarisation selon l'angle",
    "s3.p1": "La lumière incidente est polarisée linéairement à l'angle χ du plan de diffusion. La courbe bleue est l'intensité diffusée, cos<sup>2</sup>χ cos<sup>2</sup>θ + sin<sup>2</sup>χ ; la verte, celle d'une lumière non polarisée, moyenne sur χ ; la tiretée, le taux de polarisation de la lumière diffusée quand l'incidente n'est pas polarisée.",
    "fig.aria": "Intensité diffusée par un atome de spin 0 en fonction de l'angle de diffusion, pour une lumière incidente polarisée et non polarisée, avec le taux de polarisation de la lumière diffusée",
    "fig.legend.pol": "polarisée à χ",
    "fig.legend.nonpol": "non polarisée, (1 + cos² θ)/2",
    "fig.legend.degre": "taux de polarisation, sin² θ/(1 + cos² θ)",
    "fig.chi": "Polarisation incidente χ, depuis le plan de diffusion",
    "fig.theta": "Angle de diffusion θ",
    "fig.x": "angle de diffusion θ",
    "fig.y": "intensité, unité : vers l'avant",
    "fig.k.i": "Intensité diffusée à θ",
    "fig.f.i": "amplitudes x′ : {x} ; y′ : {y}",
    "fig.k.degre": "Taux de polarisation, lumière non polarisée",
    "fig.f.degre": "intensité non polarisée : {v}",
    "fig.caption": "Polarisée dans le plan de diffusion, χ = 0, la lumière ne diffuse pas à 90° : l'atome devrait y émettre le long de son propre dipôle. Polarisée perpendiculairement, χ = 90°, elle diffuse également dans toutes les directions du plan. Non polarisée, elle ressort totalement polarisée à 90°.",

    "s4.sec": "Décrire le système",
    "s4.h2": "Le bleu et la polarisation du ciel",
    "s4.p1": "Ce modèle vaut pour une diffusion élastique par des molécules petites devant la longueur d'onde, loin de leurs résonances : c'est la diffusion Rayleigh de l'air. Le moment cinétique fixe la forme angulaire ; l'intensité, elle, croît comme ω<sup>4</sup>, soit 1/λ<sup>4</sup>, loin des résonances.",
    "sys.title": "La lumière du Soleil dans l'air",
    "sys1.body": "Le bleu à 450\u00a0nm diffuse {r} fois plus que le rouge à 700\u00a0nm : le ciel est bleu, et le Soleil couchant, vu à travers beaucoup d'air, rougit. Le violet diffuse plus encore, mais le Soleil en émet moins et l'œil y est peu sensible.",
    "sys2.body": "Pour une molécule de 0,3\u00a0nm et une lumière de 500\u00a0nm, <var>ka</var> = {ka} : l'approximation dipolaire est excellente. À 90° du Soleil, la lumière du ciel est fortement polarisée ; elle ne l'est pas totalement, parce qu'une partie a diffusé plusieurs fois, et que les molécules d'air ne sont pas parfaitement isotropes.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Le ciel, de Tyndall à Raman",
    "hist.intro": "Pourquoi le ciel est bleu, et pourquoi sa lumière est polarisée : deux questions du XIXe siècle, dont les réponses classiques ont la forme exacte de (18.17).",
    "hist.events": {
      tyndall: { who: "John Tyndall", what: "observe que la lumière diffusée par de très petites particules en suspension est légèrement bleue.", context: "Il suppose que la lumière du ciel vient d'une diffusion semblable, sans pouvoir expliquer pourquoi le bleu est favorisé." },
      rayleigh: { who: "Lord Rayleigh", what: "publie deux articles sur la couleur et la polarisation de la lumière du ciel.", context: "La lumière diffusée par des particules petites devant la longueur d'onde varie comme l'inverse de la puissance quatrième de la longueur d'onde : c'est la diffusion Rayleigh." },
      raman: { who: "C. V. Raman et K. S. Krishnan", what: "découvrent qu'une infime partie de la lumière diffusée change de fréquence.", context: "Environ un photon diffusé sur un million l'est ainsi : l'atome ou la molécule ne revient pas dans son état de départ. Raman reçoit le prix Nobel de physique de 1930." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      ciel: { name: "Le filtre polariseur du photographe", text: "Un filtre polariseur tourné de façon à arrêter la polarisation dominante assombrit le ciel, d'autant plus qu'on vise à 90° du Soleil, là où la lumière diffusée est la plus polarisée. Vers le Soleil ou à l'opposé, il n'a presque aucun effet : la lumière diffusée vers l'avant ou vers l'arrière n'est pas polarisée." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      deux: { prompt: "Comment s'obtient l'amplitude de diffusion d'un photon par un atome de spin 0 ?",
        options: { a: "En ajoutant l'amplitude d'absorption et celle d'émission.", b: "Par le seul carré de l'amplitude d'émission.", c: "En multipliant l'amplitude d'absorption c, qui porte l'atome dans un état de spin 1, par l'amplitude d'émission vers θ.", d: "Elle est toujours la même dans toutes les directions." },
        why: "Deux étapes successives : les amplitudes se multiplient. L'absorption fixe m = +1 (photon droit le long de z) ; l'émission vers θ suit (18.1) et (18.2)." },
      lineaire: { prompt: "Un faisceau polarisé selon x arrive le long de z. Quelle est l'intensité diffusée à l'angle θ dans le plan xz ?",
        options: { a: "Proportionnelle à cos²θ, nulle à 90°.", b: "Indépendante de θ.", c: "Proportionnelle à (1 + cos θ)²/4.", d: "Proportionnelle à sin²θ." },
        why: "(18.17) : ⟨x′|S|x⟩ = ac cos θ. À 90°, l'atome devrait rayonner le long de son dipôle oscillant, ce qu'un dipôle ne fait pas. Un faisceau polarisé selon y donnerait une intensité indépendante de θ dans ce plan." },
      quatrevingtdix: { prompt: "Une lumière non polarisée est diffusée à 90°. Comment est la lumière diffusée ?",
        options: { a: "Non polarisée.", b: "Polarisée circulairement.", c: "Polarisée dans le plan de diffusion.", d: "Totalement polarisée, perpendiculairement au plan de diffusion." },
        hint: "Décomposez la lumière incidente en x (dans le plan) et y (perpendiculaire).",
        why: "La composante x diffuse avec cos²90° = 0 ; la composante y, avec 1. Il ne reste que y : une polarisation linéaire perpendiculaire au plan de diffusion. Le taux de polarisation vaut sin²θ/(1 + cos²θ) = 1." },
      perp: { prompt: "Pourquoi ⟨y′|S|x⟩ = 0, (18.18), est-il remarquable ?",
        options: { a: "Parce qu'il viole la conservation du moment cinétique.", b: "Parce qu'il est obtenu sans modèle de l'atome, par les seules symétries, et qu'il redonne le résultat d'un électron classique lié élastiquement.", c: "Parce qu'il montre que l'atome n'absorbe pas la lumière polarisée selon x.", d: "Parce qu'il n'est vrai qu'à θ = 0." },
        why: "Le calcul n'utilise que le moment cinétique et la parité, et il retrouve la diffusion par un oscillateur classique : la lumière diffusée garde la polarisation x à tout angle. Ce n'est plus vrai pour un atome de spin non nul." },
      ciel: { prompt: "Le bleu à 450 nm diffuse environ combien de fois plus que le rouge à 700 nm ?",
        options: { a: "1,6 fois, le rapport des longueurs d'onde.", b: "2,4 fois, le rapport des carrés.", c: "5,9 fois, le rapport des puissances quatrièmes.", d: "Autant : la diffusion ne dépend pas de la couleur." },
        why: "Loin des résonances, l'intensité diffusée croît comme ω⁴ : (700/450)⁴ ≈ 5,9. La forme angulaire, elle, est la même pour toutes les couleurs." },
      classique: { prompt: "Que montre la comparaison entre (18.17) et le modèle de l'électron lié par un ressort ?",
        options: { a: "Les deux donnent la même dépendance angulaire et la même polarisation : celles-ci ne dépendent que du moment cinétique en jeu.", b: "Le modèle classique est faux pour la polarisation.", c: "Le modèle quantique donne une intensité nulle à 0°.", d: "Ils diffèrent d'un facteur 2 à tout angle." },
        why: "Un dipôle qui oscille selon x rayonne avec une amplitude cos θ dans le plan xz, polarisée selon x′. La mécanique quantique, avec un état intermédiaire de spin 1, donne la même chose : la forme du rayonnement est fixée par le spin 1 du photon et la symétrie." },
      energie: { prompt: "Dans ce modèle, l'atome revient dans son état de spin 0 de départ. Que peut-on dire de la fréquence de la lumière diffusée ?",
        options: { a: "Elle est doublée.", b: "Elle est la même que celle de la lumière incidente : la diffusion est élastique, au recul de l'atome près.", c: "Elle est plus basse, l'atome gardant une partie de l'énergie.", d: "Elle dépend de l'angle θ comme cos θ." },
        why: "Même état initial et final : même énergie, donc même fréquence. Si l'atome ou la molécule finit dans un autre état, la fréquence change : c'est la diffusion Raman, environ un photon diffusé sur un million." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 18, §18-2 (texte original en anglais). Notations SI. Tyndall, Rayleigh et la loi en λ<sup>\u22124</sup> : Wikipédia, « Rayleigh scattering ». Raman et Krishnan, prix Nobel de 1930, proportion de diffusion Raman : Wikipédia, « Raman scattering ». Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

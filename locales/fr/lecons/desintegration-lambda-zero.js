/* Leçon « La désintégration du lambda zéro » (Feynman III.17.5) : textes en français.
   Une autre langue = locales/<langue>/lecons/desintegration-lambda-zero.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "La désintégration du lambda zéro",
    "crumb.jour": "La désintégration du Λ⁰",
    "h1": "La désintégration du lambda zéro",
    "lede": "Un Λ⁰ polarisé se désintègre en un proton et un pion. Le proton part plus souvent dans le sens du spin qu'à l'opposé. Sans rien savoir des forces, la conservation du moment cinétique impose la forme exacte de la distribution : 1 + α cos θ. Et le fait même que α ne soit pas nul prouve que la parité n'est pas conservée.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la lumière polarisée en amplitudes",
    "eq.cos": "cos",
    "eq.sin": "sin",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Un spin 1/2 qui donne un spin 1/2 et un spin 0",
    "s1.p1": "Le système : un Λ⁰ au repos, de spin 1/2 orienté selon +<var>z</var>, qui se désintègre par l'interaction faible en un proton, de spin 1/2, et un pion π<sup>\u2212</sup>, de spin 0 : Λ⁰ → p + π<sup>\u2212</sup>. Dans le référentiel du Λ, proton et pion partent dos à dos ; on repère la direction du proton par l'angle θ avec <var>z</var>.",
    "sys.title": "Les nombres du Λ⁰",
    "sys1.body": "Masse 1\u202f115,683\u00a0MeV/<var>c</var><sup>2</sup> environ ({m}), durée de vie moyenne {tau} : à une vitesse proche de <var>c</var>, il parcourt quelques centimètres, assez pour qu'on voie dans un détecteur le « V » de ses produits de désintégration, loin du point de production.",
    "s1.p2": "Le moment cinétique selon <var>z</var> vaut +ħ/2 avant ; il le vaut après. Pour un proton émis selon +<var>z</var>, le pion n'emporte aucun moment orbital autour de <var>z</var> : le spin du proton est donc +<var>z</var>, le long de sa direction de vol. Appelons <var>a</var> l'amplitude de cette désintégration. Pour un proton émis selon \u2212<var>z</var>, son spin est encore +<var>z</var>, cette fois opposé à sa vitesse ; amplitude <var>b</var>. Pour une direction θ quelconque, on tourne, comme dans « La matrice de projection du spin 1 » : l'amplitude d'un proton de spin le long de sa vitesse vaut",
    "val.17.33": "Exacte, par la seule rotation des amplitudes de spin 1/2 et la conservation du moment cinétique ; <var>a</var> contient toute la dynamique inconnue.",
    "val.17.34": "Exacte de la même façon ; amplitude pour un proton de spin opposé à sa vitesse.",

    "s2.sec": "2 · La distribution angulaire",
    "s2.h2": "Une seule forme possible",
    "s2.p1": "Les deux états finaux, spin du proton le long ou à l'opposé de sa vitesse, se distinguent en principe : leurs probabilités s'ajoutent.",
    "val.17.35": "Exacte pour un Λ entièrement polarisé selon +<var>z</var> ; pour une polarisation <var>P</var>, α est remplacé par α<var>P</var> dans (17.37).",
    "val.17.37": "Exacte : (17.35) réécrite avec cos²(θ/2) = (1 + cos θ)/2, où β = (|<var>a</var>|² + |<var>b</var>|²)/2 et α = (|<var>a</var>|² \u2212 |<var>b</var>|²)/(|<var>a</var>|² + |<var>b</var>|²). Aucun terme en cos² θ : c'est la signature d'un spin 1/2.",
    "s2.p2": "La mesure donne α = +0,75 : |<var>a</var>| vaut environ 2,6 fois |<var>b</var>|, et le proton part de préférence dans le sens du spin du Λ, son propre spin le long de sa vitesse. Les mesures du début des années 1960 donnaient 0,62 en valeur absolue, à 0,05 près. Or, si la parité était conservée, la réflexion échangerait les deux états finaux, et |<var>a</var>| = |<var>b</var>| : α serait nul. Un α non nul est donc une violation de la parité par l'interaction faible, que la seule forme de la courbe suffit à établir. Inversement, une distribution à un spin 3/2 contiendrait des termes en cos² θ et cos³ θ : leur absence montre que le Λ a le spin 1/2.",

    "s3.sec": "3 · Une expérience simulée",
    "s3.h2": "Combien de désintégrations pour mesurer α ?",
    "s3.p1": "Tirons <var>N</var> désintégrations de Λ de polarisation <var>P</var>, selon (17.37) avec α = +0,75, et estimons α par 3⟨cos θ⟩/<var>P</var>. Changez le tirage pour voir les fluctuations.",
    "fig.aria": "Histogramme des cosinus de l'angle du proton pour des désintégrations simulées de lambda polarisés, avec la loi théorique",
    "fig.legend.h": "désintégrations simulées",
    "fig.legend.loi": "loi (1 + αP cos θ)/2",
    "fig.N": "Nombre de désintégrations N (échelle log)",
    "fig.P": "Polarisation P des Λ",
    "fig.g": "Tirage n°",
    "fig.x": "cos θ",
    "fig.y": "densité de probabilité",
    "fig.k.a": "α estimé",
    "fig.f.a": "3⟨cos θ⟩ = {m}",
    "fig.k.z": "Écart normalisé à α<var>P</var>",
    "fig.f.z": "|z| < 2 dans 95 % des tirages",
    "fig.caption": "L'erreur sur α vaut √((3 \u2212 α²<var>P</var>²)/<var>N</var>)/<var>P</var> : environ 1,6/√<var>N</var> pour un Λ entièrement polarisé. Avec 100 désintégrations, α n'est connu qu'à ±0,16 près ; il en faut environ mille pour ±0,05, et plus de cent mille pour la précision actuelle, ±0,004. Si <var>P</var> = 0, la distribution est plate et α n'est plus mesurable.",
    "s3.p2": "Le même raisonnement se retourne : connaissant α, l'asymétrie mesurée donne la polarisation <var>P</var> du Λ. Le Λ devient un polarimètre, qui dit dans quel sens tournait la matière qui l'a produit.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Une particule étrange devenue instrument",
    "hist.intro": "Le Λ⁰ a d'abord été une trace en V sur des plaques photographiques ; il sert aujourd'hui à mesurer la rotation de la matière la plus chaude jamais produite.",
    "hist.events": {
      hopper: { who: "V. D. Hopper et S. Biswas", what: "identifient à l'université de Melbourne une particule neutre en V dont l'un des produits de désintégration est un proton : le Λ⁰.", context: "Découverte rapportée en octobre 1950." },
      wu: { who: "Chien-Shiung Wu et ses collaborateurs", what: "observent la violation de la parité dans la désintégration bêta du cobalt 60.", context: "Dès lors, une asymétrie comme celle de (17.37) devient une façon de mesurer la violation de la parité." },
      star: { who: "La collaboration STAR, au RHIC de Brookhaven", what: "mesure une polarisation globale des Λ produits dans les collisions de noyaux d'or, alignée sur le moment cinétique de la collision.", context: "Nature, vol. 548 : « evidence for the most vortical fluid ». La polarisation est lue par l'asymétrie (17.37)." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      polarimetre: { name: "Le Λ comme polarimètre", text: "Dans les collisions d'ions lourds, la polarisation des Λ, déduite de l'asymétrie de leurs désintégrations, mesure la vorticité du plasma de quarks et de gluons : la matière y tourne plus vite que dans tout autre fluide connu." },
      cp: { name: "Tester la symétrie CP", text: "En comparant le paramètre α du Λ et celui de son antiparticule, qui doivent être opposés si CP est conservée, les expériences sur les désintégrations d'hypérons cherchent de nouvelles sources de violation de CP." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      deux: { prompt: "Pourquoi un proton émis selon \u2212z, par un Λ de spin +z, a-t-il forcément son spin selon +z ?",
        options: { a: "Parce que le proton est plus lourd que le pion.", b: "Par convention.", c: "Parce que le moment cinétique selon z, +ħ/2, est conservé, et que ni le pion, de spin 0, ni le mouvement orbital le long de z ne peuvent en emporter.", d: "Parce que la parité est conservée." },
        why: "Le mouvement le long de l'axe z n'a pas de moment orbital autour de z. Tout le +ħ/2 doit être dans le spin du proton." },
      cos: { prompt: "La distribution (17.37) ne contient que 1 et cos θ. Qu'est-ce qui l'impose ?",
        options: { a: "Le spin 1/2 du Λ : les amplitudes contiennent cos(θ/2) et sin(θ/2), dont les carrés ne donnent que du cos θ.", b: "La masse du Λ.", c: "L'interaction faible.", d: "Une approximation de petit angle." },
        why: "Une particule de spin j donne des puissances de cos θ jusqu'à 2j. Pour j = 1/2, seulement cos θ. C'est ainsi qu'on a établi le spin du Λ." },
      spin: { prompt: "Une mesure donne une distribution 1 + 0,3 cos θ + 0,2 cos² θ. Que conclure sur le spin de la particule ?",
        options: { a: "Qu'il vaut 1/2.", b: "Qu'il vaut au moins 1 : un spin 1/2 ne peut pas donner de terme en cos² θ.", c: "Qu'il est nul.", d: "Rien." },
        why: "Le terme en cos² θ exige des amplitudes en cos²(θ/2) au moins au carré, c'est-à-dire un spin d'au moins 1. C'est une réfutation du spin 1/2, à la précision de la mesure." },
      parite: { prompt: "Pourquoi α ≠ 0 prouve-t-il que la parité n'est pas conservée dans la désintégration ?",
        options: { a: "Parce que α est négatif.", b: "Parce que le Λ est instable.", c: "Parce que le pion est pseudoscalaire.", d: "Parce que la réflexion d'espace change un proton de spin le long de sa vitesse en un proton de spin opposé ; si elle était une symétrie, |a| = |b| et α = 0." },
        why: "L'inversion change la vitesse sans changer le spin, un vecteur axial : elle échange les deux états finaux. Conserver la parité imposerait des probabilités égales." },
      ba: { prompt: "Avec α = +0,75, que vaut |a|²/|b|² ?",
        options: { a: "0,75.", b: "1.", c: "7 : (1 + α)/(1 \u2212 α) = 1,75/0,25.", d: "Environ 2,6." },
        hint: "α = (|a|² \u2212 |b|²)/(|a|² + |b|²).",
        why: "|a|²/|b|² = (1 + α)/(1 \u2212 α) = 7, donc |a|/|b| ≈ 2,6 : le proton sort le plus souvent avec son spin le long de sa vitesse." },
      n: { prompt: "Combien de désintégrations de Λ entièrement polarisés faut-il pour mesurer α à ±0,05 près ?",
        options: { a: "Environ 100.", b: "Environ 1 000 : l'erreur vaut √((3 \u2212 α²)/N), soit 1,6/√N pour α = 0,75.", c: "Environ 10.", d: "Environ 10⁶." },
        why: "√((3 \u2212 0,56)/N) = 0,05 donne N ≈ 980. Avec une polarisation P < 1, il en faut 1/P² fois plus." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-5 (texte original en anglais). Notations SI ; masse en MeV/<var>c</var><sup>2</sup>, l'usage de la physique des particules. Masse, durée de vie et découverte du Λ⁰ : article « Lambda baryon » de Wikipédia en anglais. Wu et collaborateurs : article « Parity (physics) », même source. Paramètre α : mesure faite à Pékin sur des paires de Λ et d'anti-Λ, Phys. Rev. Lett. 129, 131801 (2022), α = 0,7519 ± 0,0036 ± 0,0024 pour le Λ et \u22120,7559 pour son antiparticule ; la source citée donne \u22120,62 ± 0,05, valeur et signe de l'époque. STAR : « Global Λ hyperon polarization in nuclear collisions », Nature 548, 62 (2017). Simulation propre à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

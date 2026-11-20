/* Leçon « Symétrie et conservation » (Feynman III.17.2) : textes en français.
   Une autre langue = locales/<langue>/lecons/symetrie-et-conservation.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Symétrie et conservation",
    "crumb.jour": "Symétrie et conservation",
    "h1": "Symétrie et conservation",
    "lede": "Si une opération ne fait que multiplier un état par un nombre, ce nombre ne change plus jamais, quoi qu'il se passe à l'intérieur du système, pourvu que l'opération soit une symétrie. C'est l'origine quantique de toutes les lois de conservation.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la symétrie en mécanique quantique",
    "eq.I": "I",
    "eq.II": "II",

    "s1.sec": "1 · Une phase qui se conserve",
    "s1.h2": "Les états qu'une opération ne change pas",
    "s1.p1": "Le système : l'ion H₂⁺ symétrique de « La symétrie en mécanique quantique », avec sa réflexion <var>P̂</var>. Ses deux états d'énergie définie, |I⟩ = (|1⟩ + |2⟩)/√2 et |II⟩ = (|1⟩ \u2212 |2⟩)/√2, ne sont pas changés par la réflexion, sauf d'un signe :",
    "val.17.12": "Exacte : on applique (17.1) aux deux combinaisons. |1⟩ seul, lui, devient |2⟩ : il n'a pas de parité définie.",
    "s1.p2": "Plus généralement, supposons qu'à l'instant 0 une opération de symétrie <var>Q̂</var> ne fasse que multiplier l'état par un nombre de module 1. Par (17.10), l'état évolué |ψ<sub>2</sub>⟩ = <var>Û</var>|ψ<sub>1</sub>⟩ vérifie <var>Q̂</var>|ψ<sub>2</sub>⟩ = <var>Û</var><var>Q̂</var>|ψ<sub>1</sub>⟩ = e<sup><var>i</var>δ</sup>|ψ<sub>2</sub>⟩ :",
    "val.17.15": "Exacte si <var>Q̂</var> commute avec <var>Û</var>. Aucune hypothèse sur ce qui se passe dans le système : collisions, réactions, désintégrations comprises, tant que la symétrie est exacte.",
    "s1.p3": "Le nombre e<sup><var>i</var>δ</sup> est une grandeur conservée. On n'a rien eu à savoir des forces : la symétrie seule le garantit.",

    "s2.sec": "2 · La parité",
    "s2.h2": "Deux valeurs seulement",
    "s2.p1": "Prenons pour <var>Q̂</var> l'inversion <var>P̂</var>, qui envoie (<var>x</var>, <var>y</var>, <var>z</var>) en (\u2212<var>x</var>, \u2212<var>y</var>, \u2212<var>z</var>) : une réflexion suivie d'une rotation d'un demi-tour. Appliquée deux fois, elle ne change rien ; donc (e<sup><var>i</var>δ</sup>)<sup>2</sup> = 1 :",
    "val.17.17": "Exacte pour un état qui est multiplié par un nombre ; ce nombre ne peut valoir que +1, parité paire, ou \u22121, parité impaire.",
    "s2.p2": "Quels états ont une parité définie ? Si <var>Q̂</var> commute avec <var>Ĥ</var> et que |ψ<sub>0</sub>⟩ a l'énergie <var>E</var>, alors <var>Q̂</var>|ψ<sub>0</sub>⟩ a aussi l'énergie <var>E</var> :",
    "val.17.21": "Exacte : (17.11) appliquée à |ψ<sub>0</sub>⟩.",
    "s2.p3": "Si une seule direction d'état a l'énergie <var>E</var>, état non dégénéré, <var>Q̂</var>|ψ<sub>0</sub>⟩ est donc proportionnel à |ψ<sub>0</sub>⟩ : tout état stationnaire non dégénéré d'un système symétrique pour <var>P̂</var> a une parité définie. La parité est conservée par les interactions électromagnétiques et fortes, pas par l'interaction faible, comme le raconte « La parité n'est pas conservée ».",

    "s3.sec": "3 · Voir la conservation",
    "s3.h2": "La parité moyenne ne bouge pas",
    "s3.p1": "Préparons l'ion dans une superposition de |I⟩ et |II⟩, de parité moyenne ⟨<var>P</var>⟩ choisie, puis laissons-le évoluer. L'électron se déplace d'un proton à l'autre (pointillé : différence des probabilités d'être près de 1 et près de 2), mais ⟨<var>P</var>⟩ reste constant. Brisez la symétrie par δ.",
    "fig.aria": "Parité moyenne et position moyenne de l'électron de l'ion H2+ en fonction du temps, pour une superposition et une dissymétrie choisies",
    "fig.legend.p": "parité moyenne ⟨P⟩",
    "fig.legend.site": "P(près de 1) \u2212 P(près de 2)",
    "fig.m": "Parité moyenne au départ",
    "fig.d": "Dissymétrie δ, en unités de A",
    "fig.x": "t (fs)",
    "fig.y": "valeur moyenne",
    "fig.k.p": "⟨<var>P</var>⟩ sur la durée tracée",
    "fig.f.p": "minimum … maximum",
    "fig.k.com": "max |(<var>P</var>·<var>H</var> \u2212 <var>H</var>·<var>P</var>)<sub><var>ij</var></sub>|",
    "fig.f.com": "nul : la parité est conservée",
    "fig.caption": "Couplage <var>A</var> = 1\u00a0eV. ⟨<var>P</var>⟩ = |<var>C</var><sub>I</sub>|² \u2212 |<var>C</var><sub>II</sub>|² ne dépend que des probabilités des états d'énergie définie, qui ne changent pas si <var>P</var> commute avec <var>H</var>. Avec δ ≠ 0, |I⟩ et |II⟩ ne sont plus états d'énergie définie, et ⟨<var>P</var>⟩ oscille.",
    "s3.p2": "La position de l'électron change, la parité moyenne pas : une grandeur conservée n'est pas une grandeur figée de tout le système, c'est une grandeur qui ne change pas pendant que le reste évolue.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Une conservation qui tombe",
    "hist.intro": "On a longtemps cru la parité conservée par toutes les interactions ; l'interaction faible a montré le contraire.",
    "hist.events": {
      leeyang: { who: "Tsung-Dao Lee et Chen Ning Yang", what: "remarquent que la conservation de la parité n'a jamais été testée dans l'interaction faible et proposent des expériences pour la mettre à l'épreuve.", context: "Physical Review, 1956." },
      wu: { who: "Chien-Shiung Wu, Ernest Ambler, Raymond Hayward, Dale Hoppes et Ralph Hudson", what: "observent une violation nette de la parité dans la désintégration bêta du cobalt 60 polarisé.", context: "Les électrons sortent de préférence d'un côté, par rapport au spin des noyaux." },
      cp: { who: "James Cronin, Val Fitch et leurs collaborateurs", what: "observent que la symétrie CP, la parité jointe à l'échange particule–antiparticule, n'est pas exacte non plus.", context: "Désintégration en deux pions du kaon neutre à vie longue, voir « Le méson K neutre »." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      spectro: { name: "Règle de Laporte", text: "Dans un atome, un photon émis par le dipôle électrique change la parité de l'état : les raies dipolaires électriques ne relient que des états de parités opposées. La règle vaut pour les atomes et les molécules qui ont un centre de symétrie ; les spectroscopistes s'en servent pour identifier les niveaux." },
      edm: { name: "Moment dipolaire électrique du neutron", text: "Un moment dipolaire électrique permanent d'une particule violerait la parité et le renversement du temps. Des expériences cherchent celui du neutron avec une sensibilité toujours plus grande : sa valeur, encore jamais vue, contraint les théories au-delà du modèle standard." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      phase: { prompt: "Pourquoi, si Q commute avec U et que Q|ψ₁⟩ = e^(iδ)|ψ₁⟩, a-t-on Q|ψ₂⟩ = e^(iδ)|ψ₂⟩ plus tard ?",
        options: { a: "Parce que l'état ne change pas.", b: "Parce que δ est petit.", c: "Parce que Q|ψ₂⟩ = Q·U|ψ₁⟩ = U·Q|ψ₁⟩ = U e^(iδ)|ψ₁⟩ = e^(iδ)|ψ₂⟩.", d: "Parce que Q est la parité." },
        why: "La commutation permet de faire passer Q avant l'évolution. Le nombre e^(iδ) sort de U, linéaire. Rien n'a été supposé sur le contenu de U." },
      pm: { prompt: "Pourquoi la parité ne peut-elle valoir que +1 ou \u22121 ?",
        options: { a: "Parce que deux inversions successives ne changent rien : (e^(iδ))² = 1.", b: "Par convention.", c: "Parce que les états sont réels.", d: "Parce que l'espace a trois dimensions." },
        why: "P² = 1. Un nombre dont le carré vaut 1 vaut ±1." },
      definie: { prompt: "L'état |1⟩ de H₂⁺, électron près du proton 1, a-t-il une parité définie ?",
        options: { a: "Oui, +1.", b: "Oui, \u22121.", c: "Oui, car il est réel.", d: "Non : P le change en |2⟩, un autre état. Il est la superposition (|I⟩ + |II⟩)/√2 de deux parités." },
        why: "Seuls les états que P multiplie par un nombre ont une parité. |1⟩ n'est ni pair ni impair, et sa parité moyenne vaut 0." },
      degen: { prompt: "Pourquoi le théorème « un état stationnaire a une parité définie » exige-t-il un état non dégénéré ?",
        options: { a: "Parce que les états dégénérés n'existent pas.", b: "Parce que, si plusieurs états ont la même énergie, Q|ψ₀⟩ peut être un autre de ces états ; on peut seulement choisir des combinaisons de parité définie.", c: "Parce que la parité n'est pas conservée.", d: "Il ne l'exige pas." },
        why: "(17.21) dit que Q|ψ₀⟩ a l'énergie E. S'il n'y a qu'un état d'énergie E, Q|ψ₀⟩ lui est proportionnel. Sinon, Q peut mélanger les états dégénérés." },
      un: { prompt: "Dans la figure, avec δ = 0, la position moyenne de l'électron oscille alors que ⟨P⟩ reste fixe. Comment est-ce possible ?",
        options: { a: "Par une erreur numérique.", b: "Parce que l'électron ne bouge pas vraiment.", c: "Parce que ⟨P⟩ ne dépend que des probabilités de |I⟩ et |II⟩, constantes, alors que la position dépend de leur phase relative, qui tourne.", d: "Parce que P commute avec la position." },
        why: "|I⟩ et |II⟩ ont des énergies différentes : leur phase relative tourne, ce qui déplace l'électron. Leurs modules, eux, ne changent pas : la parité moyenne est conservée." },
      brise: { prompt: "On introduit une dissymétrie δ ≠ 0. Que devient ⟨P⟩ ?",
        options: { a: "Il varie dans le temps : P ne commute plus avec H, et la parité n'est plus conservée.", b: "Il reste constant.", c: "Il vaut 0.", d: "Il vaut ±1." },
        why: "Le commutateur vaut δA. Les états d'énergie définie ne sont plus |I⟩ et |II⟩ ; la parité moyenne oscille. C'est la signature expérimentale d'une symétrie brisée." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-2 (texte original en anglais). Notations SI. Lee et Yang, Wu et collaborateurs : article « Parity (physics) » de Wikipédia en anglais ; Cronin et Fitch : article « CP violation », même source ; règle de Laporte et moment dipolaire électrique du neutron : articles « Laporte rule » et « Neutron electric dipole moment », même source. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les états de base de deux particules de spin 1/2 » (Feynman III.12.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/etats-de-base-deux-spins.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les états de base de deux particules de spin 1/2",
    "crumb.jour": "Deux spins 1/2",
    "h1": "Les états de base de deux particules de spin 1/2",
    "lede": "L'atome d'hydrogène dans son état fondamental semble n'avoir qu'un état. Mais l'électron et le proton ont chacun un spin 1/2 : cela fait quatre états. Comment les décrire, et que dire d'un état où aucun des deux spins n'a de direction ?",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la généralisation aux systèmes à N états",

    "s1.sec": "1 · Décrire le système",
    "s1.h2": "Un atome, deux spins",
    "s1.p1": "Le système : un atome d'hydrogène au repos, dans son état fondamental 1s, hors de tout champ. La distribution spatiale de l'électron est fixée ; il ne reste que les orientations des deux spins, celui de l'électron et celui du proton.",
    "sys.title": "Pourquoi oublier les autres états",
    "sys1.body": "Le premier état excité de l'atome est {dE} au-dessus du fondamental ; l'écart hyperfin, que l'on cherche, vaut {hf}, {r} fois moins. À {T}, le facteur de Boltzmann vers l'état excité, e<sup>\u2212Δ<var>E</var>/<var>k</var><sub>B</sub><var>T</var></sup>, vaut environ {b} : on peut le négliger tout à fait. Le modèle à quatre états néglige aussi le mouvement de l'atome et tout champ extérieur.",
    "s1.p2": "Choisissons pour chaque particule les deux états de spin selon <var>z</var>. Les états de base de l'ensemble disent l'un et l'autre, électron d'abord, proton ensuite :",
    "val.12.1": "Exacte comme base : tout état de spin des deux particules s'y décompose. Le choix de <var>z</var> est libre, et d'autres bases, mieux adaptées aux énergies, seront trouvées dans « Les niveaux d'énergie hyperfins ».",
    "val.12.3": "Exacte : la décomposition d'un état quelconque sur la base (12.1). Quatre amplitudes complexes, de somme des modules carrés 1.",

    "s2.sec": "2 · États produits, états intriqués",
    "s2.h2": "Tous les états ne se factorisent pas",
    "s2.p1": "Si l'électron est dans l'état <var>a</var><sub>+</sub>|+⟩ + <var>a</var><sub>\u2212</sub>|\u2212⟩ et le proton dans <var>b</var><sub>+</sub>|+⟩ + <var>b</var><sub>\u2212</sub>|\u2212⟩, sans lien entre eux, l'amplitude de chaque état de base est le produit des deux amplitudes :",
    "val.12.3a": "Exacte pour deux particules préparées indépendamment ; les amplitudes de processus indépendants se multiplient.",
    "s2.p2": "Un état produit vérifie donc toujours",
    "val.12.3b": "Exacte : c'est la condition nécessaire et suffisante pour que l'état soit un produit ; elle se vérifie en développant (12.3a).",
    "s2.p3": "L'état (|+\u2212⟩ \u2212 |\u2212+⟩)/√2 a <var>C</var><sub>1</sub> = <var>C</var><sub>4</sub> = 0 et <var>C</var><sub>2</sub><var>C</var><sub>3</sub> = \u22121/2 : il viole (12.3b). Aucun état de l'électron et aucun état du proton ne le reproduisent. Les deux spins y sont <em>intriqués</em> : on ne peut donner aucune direction au spin de l'électron seul, mais une mesure qui trouve l'électron en haut trouve, à coup sûr, le proton en bas, quel que soit l'axe choisi. Cet état est l'état fondamental de l'atome d'hydrogène, comme le montrera « Les niveaux d'énergie hyperfins ».",

    "s3.sec": "3 · Construire un état",
    "s3.h2": "Du produit à l'intrication",
    "s3.p1": "Orientez les spins de l'électron et du proton dans le plan (<var>x</var>, <var>z</var>) : l'état est un produit. Puis mélangez-y peu à peu l'état intriqué (|+\u2212⟩ \u2212 |\u2212+⟩)/√2.",
    "fig.aria": "Probabilités des quatre états de base, plus plus, plus moins, moins plus et moins moins, pour l'état construit",
    "fig.legend.p": "probabilités |C₁|² à |C₄|²",
    "fig.legend.base": "1/4, quatre états également probables",
    "fig.te": "Angle θ du spin de l'électron",
    "fig.tp": "Angle θ du spin du proton",
    "fig.s": "Part de l'état intriqué",
    "fig.x": "états |++⟩, |+\u2212⟩, |\u2212+⟩, |\u2212\u2212⟩, de gauche à droite",
    "fig.y": "probabilité",
    "fig.k.c": "|<var>C</var><sub>1</sub>|² ; |<var>C</var><sub>2</sub>|² ; |<var>C</var><sub>3</sub>|² ; |<var>C</var><sub>4</sub>|²",
    "fig.f.c": "somme 1",
    "fig.k.int": "2|<var>C</var><sub>1</sub><var>C</var><sub>4</sub> \u2212 <var>C</var><sub>2</sub><var>C</var><sub>3</sub>|",
    "fig.f.prod": "nul : un état produit",
    "fig.f.intr": "non nul : un état intriqué",
    "fig.k.e": "⟨σ<sub>z</sub>⟩ de l'électron",
    "fig.f.e": "±1 si son spin est sûrement le long de z",
    "fig.caption": "La grandeur 2|<var>C</var><sub>1</sub><var>C</var><sub>4</sub> \u2212 <var>C</var><sub>2</sub><var>C</var><sub>3</sub>| vaut 0 pour un état produit et 1 pour l'état intriqué pur. Avec la part 1, |+\u2212⟩ et |\u2212+⟩ ont chacun la probabilité 1/2, |++⟩ et |\u2212\u2212⟩ zéro, et ⟨σ<sub>z</sub>⟩ de l'électron est nul.",
    "s3.p2": "Les probabilités des quatre états ne suffisent pas à reconnaître l'intrication : (|+\u2212⟩ + |\u2212+⟩)/√2 a les mêmes que (|+\u2212⟩ \u2212 |\u2212+⟩)/√2, et un mélange statistique de |+\u2212⟩ et |\u2212+⟩ aussi. Ce qui les distingue, ce sont les phases relatives, qui se voient dans des mesures selon d'autres axes.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "L'intrication, d'un paradoxe à un outil",
    "hist.intro": "Les états à deux particules qui ne se factorisent pas ont d'abord été proposés comme une objection à la mécanique quantique.",
    "hist.events": {
      epr: { who: "Albert Einstein, Boris Podolsky et Nathan Rosen", what: "publient un argument selon lequel la mécanique quantique serait incomplète, fondé sur les corrélations de deux particules dans un état non factorisable.", context: "La même année, dans une lettre à Einstein, Erwin Schrödinger nomme ces états « verschränkt », intriqués." },
      ws: { who: "Chien-Shiung Wu et Irving Shaknov", what: "mesurent les corrélations de polarisation des deux photons émis par l'annihilation d'un électron et d'un positon.", context: "Les corrélations observées sont celles d'un état intriqué." },
      bell: { who: "John Bell", what: "montre qu'aucune théorie où chaque particule porte ses propres propriétés, sans action à distance, ne reproduit toutes les corrélations d'un état intriqué.", context: "Les inégalités qui portent son nom ont été mises à l'épreuve à partir des années 1970." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      qubits: { name: "Deux qubits", text: "Deux qubits ont exactement les quatre états de base (12.1), notés |00⟩, |01⟩, |10⟩, |11⟩. Les états intriqués comme (|01⟩ \u2212 |10⟩)/√2 sont la ressource des protocoles de calcul et de communication quantiques." },
      ortho: { name: "Hydrogène ortho et para", text: "Dans la molécule H₂, les spins des deux protons forment un état d'ensemble de spin 1 (ortho) ou de spin 0 (para), comme l'électron et le proton de l'atome. La conversion de l'ortho en para, lente sans catalyseur, dégage plus de chaleur qu'il n'en faut pour vaporiser le liquide : on convertit donc l'hydrogène avant de le stocker liquide." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      nombre: { prompt: "Combien d'états de base faut-il pour décrire les spins de trois particules de spin 1/2 ?",
        options: { a: "6, deux par particule.", b: "8 = 2³ : chaque particule double le nombre d'états.", c: "3.", d: "4, comme pour deux." },
        why: "Un état de base dit l'orientation de chaque spin : 2 × 2 × 2 = 8 combinaisons. Avec N spins, 2^N : c'est la croissance qui rend les grands systèmes quantiques difficiles à simuler." },
      produit: { prompt: "L'état (|++⟩ + |+\u2212⟩ + |\u2212+⟩ + |\u2212\u2212⟩)/2 est-il un produit ?",
        options: { a: "Oui : c'est l'électron et le proton tous deux selon +x.", b: "Non : les quatre états y sont mélangés.", c: "Non : C₁C₄ \u2212 C₂C₃ ≠ 0.", d: "On ne peut pas savoir sans mesurer." },
        hint: "Calculez C₁C₄ \u2212 C₂C₃.",
        why: "C₁C₄ \u2212 C₂C₃ = 1/4 \u2212 1/4 = 0 : c'est un produit, ((|+⟩ + |\u2212⟩)/√2) ⊗ ((|+⟩ + |\u2212⟩)/√2), chaque spin selon +x. Mélanger tous les états de base ne suffit pas à intriquer." },
      singulet: { prompt: "Dans l'état (|+\u2212⟩ \u2212 |\u2212+⟩)/√2, on mesure le spin de l'électron selon z et on le trouve en haut. Que donnera la mesure du proton selon z ?",
        options: { a: "En haut ou en bas, avec la probabilité 1/2.", b: "En haut, sûrement.", c: "Rien : le proton n'a pas de spin défini.", d: "En bas, sûrement : seul |+\u2212⟩ a l'électron en haut." },
        why: "Après la mesure, il ne reste que la composante |+\u2212⟩ : le proton est en bas. Avant la mesure, ni l'un ni l'autre n'avait d'orientation définie." },
      electron: { prompt: "Dans ce même état intriqué, que vaut la moyenne ⟨σz⟩ du spin de l'électron ?",
        options: { a: "+1.", b: "\u22121.", c: "0 : haut et bas sont également probables, quel que soit l'axe.", d: "1/2." },
        why: "|C₂|² = |C₃|² = 1/2 : l'électron est en haut ou en bas avec la même probabilité. Il en va de même selon tout axe, car cet état est le même dans toutes les bases ; le spin de l'électron seul n'a aucune direction." },
      trois: { prompt: "Pourquoi peut-on ignorer, pour l'atome d'hydrogène fondamental, tous les états autres que les quatre états de spin ?",
        options: { a: "Parce que le premier état excité est 10 eV plus haut, des millions de fois l'écart hyperfin, et qu'aucune perturbation considérée n'y mène.", b: "Parce que l'électron n'a pas d'autres états.", c: "Parce que le proton est trop lourd.", d: "Parce que la température est nulle." },
        why: "Le modèle garde les états qu'on peut atteindre. L'écart de 10 eV est 10⁶ fois plus grand que les quelques microélectronvolts des énergies de spin, et environ 400 fois kBT à la température ambiante." },
      choix: { prompt: "On aurait pu prendre comme états de base, pour chaque particule, les spins selon x. Que changerait ce choix ?",
        options: { a: "Les énergies de l'atome.", b: "Les amplitudes Ci d'un état donné, mais aucune prévision physique.", c: "Le nombre d'états de base.", d: "L'intrication de l'état fondamental." },
        why: "Une base est un choix de description. Les amplitudes changent, les probabilités de chaque résultat de mesure non. L'état intriqué (|+\u2212⟩ \u2212 |\u2212+⟩)/√2 garde la même forme dans toutes les bases." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 12, §12-1 (texte original en anglais). Notations SI. Histoire : article « Quantum entanglement » de Wikipédia en anglais (Einstein, Podolsky et Rosen, Schrödinger 1935 ; Wu et Shaknov 1949 ; Bell 1964). Hydrogène ortho et para : article « Spin isomers of hydrogen », même source. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* Leçon « Les amplitudes et les vecteurs » (Feynman III.8.1) : textes en français.
   Une autre langue = locales/<langue>/lecons/amplitudes-et-vecteurs.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les amplitudes et les vecteurs",
    "crumb.jour": "Amplitudes et vecteurs",
    "h1": "Les amplitudes et les vecteurs",
    "lede": "La loi de composition des amplitudes ressemble trait pour trait au produit scalaire de deux vecteurs écrit dans une base. On peut pousser l'analogie jusqu'à couper un crochet en deux et parler de « vecteurs d'état ». Elle a ses limites : les amplitudes sont complexes, et l'ordre compte.",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : la précession d'une particule de spin 1/2",

    "s1.sec": "Décrire le système",
    "s1.h2": "Deux lois qui se ressemblent",
    "s1.p1": "On a établi, pour le spin 1 puis pour le spin 1/2, la loi fondamentale : l'amplitude d'aller d'un état φ à un état χ se calcule en passant par un ensemble complet d'états de base, qu'un appareil soit là ou non :",
    "val.8.1": "Exacte pour toute base complète, sans marquage des états intermédiaires. C'est (5.24), écrite une fois pour toutes. Une base incomplète, qui oublie des états accessibles, la rend fausse.",
    "s1.p2": "Comparons avec le produit scalaire de deux vecteurs ordinaires, écrit avec trois vecteurs unitaires perpendiculaires :",
    "val.8.2": "Exacte pour trois vecteurs unitaires orthonormés, <var>e</var>⃗<sub><var>i</var></sub>·<var>e</var>⃗<sub><var>j</var></sub> = δ<sub><var>i</var><var>j</var></sub>, comme ⟨<var>i</var>|<var>j</var>⟩ = δ<sub><var>i</var><var>j</var></sub>. Le parallèle est formel : les états ne sont pas des flèches de l'espace ordinaire, et leur nombre n'est pas trois en général.",
    "s1.p3": "Une différence : le produit scalaire est symétrique, <var>B</var>⃗·<var>A</var>⃗ = <var>A</var>⃗·<var>B</var>⃗. Une amplitude ne l'est pas :",
    "val.8.5": "Exacte, c'est (5.26). L'astérisque est le complexe conjugué ; les probabilités |⟨φ|χ⟩|<sup>2</sup> et |⟨χ|φ⟩|<sup>2</sup> sont égales, les amplitudes non. L'analogie avec les vecteurs réels oublie ce conjugué.",

    "s2.sec": "Couper le crochet",
    "s2.h2": "Bras, kets et la grande loi",
    "s2.p1": "Dans le produit scalaire, on peut retirer <var>B</var>⃗ et écrire <var>A</var>⃗ = Σ <var>e</var>⃗<sub><var>i</var></sub>(<var>e</var>⃗<sub><var>i</var></sub>·<var>A</var>⃗) : un vecteur est la somme de ses composantes sur la base. Faisons de même dans (8.1) en retirant ⟨χ|. Il reste :",
    "val.8.8": "Exacte, mais c'est une équation sur des demi-symboles : ni |φ⟩ ni |<var>i</var>⟩ ne sont des nombres. Elle prend un sens dès qu'on la complète à gauche par un bra ⟨χ| quelconque, et redonne alors (8.1). Dirac appelle « ket » la moitié droite d'un crochet, « bra » la moitié gauche.",
    "s2.p2": "On peut aller plus loin et retirer aussi |φ⟩. Il reste la relation de fermeture, que Feynman appelle la grande loi de la mécanique quantique :",
    "val.8.9": "Exacte pour une base complète : c'est le symbole de l'appareil grand ouvert, qu'on peut glisser entre un bra et un ket sans rien changer. Elle est fausse pour une base incomplète : il manque alors des termes, et la somme n'est qu'un filtre.",
    "s2.p3": "|φ⟩ s'appelle un <strong>vecteur d'état</strong>. Il appartient à un espace dont les vecteurs unitaires sont les |<var>i</var>⟩ et dont les composantes sont les amplitudes ⟨<var>i</var>|φ⟩, nombres complexes : deux pour un spin 1/2, trois pour un spin 1, une infinité pour une position. Ce n'est pas l'espace où l'on vit, et les rotations de l'un ne sont pas celles de l'autre.",

    "s3.sec": "Les nombres",
    "s3.h2": "Une amplitude n'est pas un produit scalaire de directions",
    "s3.p1": "φ est l'état +<var>z</var> d'un spin 1/2 ; χ est l'état + selon la direction (θ, φ), par (6.36). Le plan complexe montre ⟨χ|φ⟩ et ⟨φ|χ⟩. Comparez la probabilité |⟨χ|φ⟩|<sup>2</sup> au produit scalaire des deux directions de l'espace.",
    "fig.aria.plan": "Les amplitudes ⟨χ|φ⟩ et ⟨φ|χ⟩ dans le plan complexe",
    "fig.legend.cd": "⟨χ|φ⟩",
    "fig.legend.dc": "⟨φ|χ⟩ = ⟨χ|φ⟩*",
    "fig.theta": "Direction de χ : angle depuis z, θ",
    "fig.phi": "Direction de χ : angle autour de z, φ",
    "fig.k.amp": "⟨χ|φ⟩",
    "fig.f.amp": "⟨φ|χ⟩ = {b}",
    "fig.k.p": "Probabilité |⟨χ|φ⟩|<sup>2</sup>",
    "fig.f.p": "cos<sup>2</sup>(θ/2) = (1 + cos θ)/2",
    "fig.k.dir": "Produit scalaire des directions, cos θ",
    "fig.f.dir": "négatif au-delà de 90° ; une probabilité ne l'est jamais",
    "fig.caption": "Les deux flèches sont symétriques par rapport à l'axe réel : l'ordre change la phase, pas le module. À θ = 90°, les directions sont perpendiculaires, cos θ = 0, mais la probabilité vaut 1/2 : deux états de spin 1/2 ne sont « orthogonaux » que pour des directions opposées.",
    "sys.title": "Le système décrit : deux états opposés",
    "sys1.body": "L'état + selon \u2212<var>z</var> est l'état \u2212<var>z</var>. Son amplitude ⟨\u2212<var>z</var>|+<var>z</var>⟩ a pour module {a} : les deux kets sont orthogonaux dans l'espace des états, alors que les deux directions sont opposées, pas perpendiculaires, dans l'espace ordinaire. L'angle entre vecteurs d'état est la moitié de l'angle entre directions.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Des états qui sont des vecteurs",
    "hist.intro": "L'idée de traiter les états comme des vecteurs d'un espace abstrait s'est imposée en moins de dix ans, de la physique aux mathématiques et retour.",
    "hist.events": {
      dirac: { who: "Paul Dirac", what: "publie The Principles of Quantum Mechanics, où l'état est un vecteur d'un espace abstrait.", context: "Il y part des états et de leur superposition, avant tout modèle de l'atome." },
      neumann: { who: "John von Neumann", what: "publie chez Springer, à Berlin, les Mathematische Grundlagen der Quantenmechanik.", context: "L'espace des états y devient un espace de Hilbert, et les appareils des opérateurs linéaires sur cet espace." },
      notation: { who: "Paul Dirac", what: "propose la notation des bras et des kets, ⟨ | et | ⟩, dans un article de trois pages.", context: "Couper un crochet en deux, c'est l'opération de cette leçon : elle passe en 1947 dans la troisième édition de son traité." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      simulateur: { name: "Simulation de circuits quantiques", text: "Un programme qui simule un ordinateur quantique de <var>n</var> qubits garde en mémoire le vecteur d'état, soit 2^<var>n</var> amplitudes complexes, une par état de base. À 16 octets par amplitude, 30 qubits demandent environ 17 milliards d'octets : la taille de l'espace des états limite la simulation." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      ordre: { prompt: "En quoi ⟨χ|φ⟩ diffère-t-il d'un produit scalaire de vecteurs réels ?",
        options: { a: "Il n'en diffère pas.", b: "Il est toujours réel.", c: "Échanger χ et φ donne le complexe conjugué, pas le même nombre.", d: "Il n'a pas de base." },
        why: "(8.5) : ⟨φ|χ⟩ = ⟨χ|φ⟩*. Les modules sont égaux, les phases opposées." },
      demi: { prompt: "Que représente |φ⟩ seul, sans bra devant ?",
        options: { a: "Un demi-symbole, le vecteur d'état, qui devient un nombre quand on le complète par un bra.", b: "Un nombre complexe.", c: "Une probabilité.", d: "Un appareil." },
        why: "(8.8) n'a de sens que complétée par ⟨χ|. Le ket est un vecteur de l'espace des états ; ses composantes sont les ⟨i|φ⟩." },
      un: { prompt: "Que dit la relation 1 = Σ |i⟩⟨i| ?",
        options: { a: "Que tous les états de base ont la même probabilité.", b: "Que la somme des amplitudes vaut 1.", c: "Que chaque état de base vaut 1.", d: "Qu'un appareil grand ouvert ne change rien : on peut l'insérer entre tout bra et tout ket." },
        why: "C'est (8.9), la fermeture, valable pour une base complète. Insérée dans ⟨χ|φ⟩, elle redonne (8.1)." },
      oppose: { prompt: "Les états +z et \u2212z d'un spin 1/2 sont orthogonaux. Quel angle font leurs directions dans l'espace ?",
        options: { a: "90°.", b: "180° : opposées.", c: "0°.", d: "45°." },
        why: "⟨\u2212z|+z⟩ = 0 pour des directions opposées. Deux directions perpendiculaires donnent une probabilité 1/2, pas 0." },
      analogie: { prompt: "Pourquoi l'analogie entre états et vecteurs de l'espace ordinaire est-elle seulement formelle ?",
        options: { a: "Parce que les états n'ont pas de composantes.", b: "Parce qu'il y a toujours trois états de base.", c: "Parce que les composantes d'un état sont complexes, leur nombre est celui des états de base, et l'espace des états n'est pas celui où l'on vit.", d: "Parce que le produit scalaire n'existe pas pour les états." },
        why: "Deux composantes complexes pour un spin 1/2, une infinité pour une position : l'espace des états a sa propre géométrie." },
      dim: { prompt: "Combien de composantes complexes a le vecteur d'état d'un spin 1 ?",
        options: { a: "Trois, une par état de base +, 0, \u2212.", b: "Deux.", c: "Six.", d: "Une infinité." },
        why: "Le nombre de composantes est celui des états de base. C'est aussi trois combinaisons qui tournent comme un vecteur, (5.42), mais complexes." },
      nombre: { prompt: "Un simulateur garde le vecteur d'état de 30 qubits, 16 octets par amplitude. Quelle mémoire faut-il ?",
        options: { a: "480 octets.", b: "16 kilooctets.", c: "30 mégaoctets.", d: "Environ 1,7 × 10¹⁰ octets : 2³⁰ amplitudes." },
        hint: "2¹⁰ ≈ 1 000.",
        why: "2³⁰ ≈ 1,07 × 10⁹ amplitudes, × 16 octets ≈ 1,7 × 10¹⁰ octets. Chaque qubit de plus double la mémoire." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 8, §8-1 (texte original en anglais). Notations SI. Dirac, The Principles of Quantum Mechanics (1930) ; von Neumann, Mathematische Grundlagen der Quantenmechanik (1932) ; Dirac, Proceedings of the Cambridge Philosophical Society, vol. 35 (1939). Calculs numériques propres à cette page."
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Les règles des amplitudes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      phases: { prompt: "Trois chemins indiscernables mènent au détecteur. Leurs amplitudes ont le même module, 0,3, et des phases 0, 2π/3 et 4π/3. Quelle est la probabilité d'arriver ?",
        options: { a: "0,27 : trois fois 0,09.", b: "0,81 : le carré de 0,3 + 0,3 + 0,3.", c: "Zéro : les trois flèches, à 120° l'une de l'autre, se referment en triangle.", d: "0,09 : un seul chemin compte." },
        hint: "Mettez les trois flèches bout à bout avant de prendre le carré.",
        why: "Les amplitudes s'ajoutent avant le carré. Trois flèches de même longueur tournées de 120° forment un triangle fermé : la somme est nulle, la probabilité aussi. La somme des probabilités, 0,27, n'est que la moyenne sur des phases au hasard. Leçon « Les lois de composition des amplitudes »." },
      produit: { prompt: "Un seul trou est ouvert. L'amplitude d'aller de la source au trou vaut 0,5, celle d'aller du trou au détecteur vaut 0,4 avec une phase de π/2. Quelle est la probabilité d'arriver au détecteur ?",
        options: { a: "0,04 : le produit des amplitudes a pour module 0,2.", b: "0,9 : on ajoute les deux amplitudes.", c: "0,41 : on ajoute les deux probabilités.", d: "Zéro : la phase π/2 annule tout." },
        why: "Le long d'un chemin, les amplitudes des étapes se multiplient, (3.5) de « Les lois de composition des amplitudes ». Le module du produit est 0,5 × 0,4 = 0,2, sa phase π/2 ; la probabilité est 0,2² = 0,04. Une phase seule ne compte que devant une autre amplitude." },
      temoin: { prompt: "Derrière deux fentes, un photon diffusé part vers D1 avec l'amplitude a depuis la fente 1 et b depuis la fente 2, avec b/a = 1/3, réels. On compte tous les électrons, quel que soit le compteur. Que vaut le contraste des franges ?",
        options: { a: "Zéro : un témoin, même imparfait, efface les franges.", b: "1/3, le rapport b/a.", c: "1 : les franges sont entières.", d: "0,6, soit 2ab/(a² + b²)." },
        hint: "Prenez a = 1, b = 1/3.",
        why: "Les deux compteurs sont des états finaux distincts : on ajoute leurs probabilités, (3.10) de « La figure d'interférence à deux fentes ». Le contraste qui en résulte vaut 2ab/(a² + b²) = (2/3)/(10/9) = 0,6 : un compteur qui se trompe une fois sur dix laisse des franges bien visibles." },
      coincidence: { prompt: "Le compteur D1 ne reçoit jamais de photon d'un électron passé par la fente 2. On ne garde que les électrons comptés en même temps qu'un photon dans D1. Quelle figure dessinent-ils ?",
        options: { a: "Les franges de deux fentes.", b: "La figure d'une seule fente, celle de la fente 1.", c: "La somme des figures des deux fentes.", d: "Une figure uniforme." },
        why: "Avec b = 0, l'amplitude d'un électron en x et d'un photon en D1 se réduit à aφ1 : seul le chemin par la fente 1 y mène. Les électrons triés ainsi dessinent la figure de la fente 1, |a|²|φ1|²." },
      cristal: { prompt: "Des neutrons sont diffusés par un cristal de N noyaux de spin 1/2. Au sommet d'un pic de Bragg, la probabilité est 1000 fois celle du fond qui l'entoure. On prend un cristal deux fois plus grand, du même matériau. Que devient ce rapport, au sommet du pic ?",
        options: { a: "2000 : le pic croît comme N², le fond comme N.", b: "1000 : tout double.", c: "4000 : le pic croît comme N², le fond reste fixe.", d: "500 : le fond croît plus vite que le pic." },
        why: "Sans retournement de spin, les N amplitudes s'ajoutent : au sommet du pic, la probabilité croît comme N². Avec retournement, le noyau retourné marque le chemin, et les N probabilités s'ajoutent : le fond croît comme N. Le rapport double. Le pic devient aussi deux fois plus étroit : son aire, elle, ne fait que doubler. Leçon « La diffusion par un cristal »." },
      paralleles: { prompt: "Dans le même cristal, on oriente tous les spins des noyaux dans le même sens que celui des neutrons incidents. Qu'observe-t-on ?",
        options: { a: "Un fond deux fois plus fort.", b: "Un fond sans pics.", c: "Plus aucun neutron diffusé.", d: "Des pics sans fond dû au spin : deux spins parallèles ne peuvent pas s'échanger." },
        why: "La diffusion conserve la somme des spins : avec deux spins déjà parallèles, l'échange ne change rien, et aucun noyau n'est retourné. Aucun chemin n'est marqué, toutes les amplitudes interfèrent. Il ne reste que les pics." },
      helium: { prompt: "On lance des particules α sur de l'hélium 4, puis sur de l'hélium 3. À 90° dans le centre de masse, combien vaut, dans chaque cas, la probabilité de comptage comparée au calcul qui additionne |f(θ)|² et |f(π \u2212 θ)|² ?",
        options: { a: "2 pour les deux : ce sont deux noyaux d'hélium.", b: "2 sur l'hélium 4, identique à la particule α ; 1 sur l'hélium 3, discernable.", c: "1 pour les deux.", d: "0 sur l'hélium 4, 1 sur l'hélium 3." },
        hint: "Seul compte le fait qu'on puisse, en principe, dire lequel des deux noyaux est arrivé.",
        why: "Sur l'hélium 4, les deux chemins sont indiscernables : |f + f|² = 4|f|², deux fois 2|f|². Sur l'hélium 3, la masse distingue les noyaux : on ajoute les probabilités, le calcul classique tient. Leçon « Des particules identiques en amplitudes »." },
      electrons: { prompt: "Un faisceau d'électrons non polarisés frappe une cible d'électrons non polarisés, à basse énergie. À 90° dans le centre de masse, que vaut la probabilité, comparée au calcul qui traite les électrons comme discernables ?",
        options: { a: "Le double, comme pour les particules α.", b: "La même.", c: "La moitié : nulle dans la moitié des cas à spins parallèles, normale dans l'autre.", d: "Zéro, toujours." },
        why: "À spins parallèles, l'échange entre avec un signe moins : f(π/2) \u2212 f(π/2) = 0. À spins opposés, le spin distingue les électrons et l'on ajoute les probabilités. En moyenne, ½ × 0 + ½ × 2|f|² = |f|², la moitié du résultat classique." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

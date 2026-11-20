/* Épreuve de l'étape « Yeux du vivant et neurologie » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      facette: { prompt: "Un insecte a un œil composé de rayon 1\u00a0mm et voit surtout vers 500\u00a0nm. Quel diamètre de facette rend son image la plus nette, d'après (36.4) ?",
        options: { a: "0,5\u00a0µm, la longueur d'onde.", b: "1\u00a0mm, le rayon de l'œil.", c: "22\u00a0µm environ.", d: "0,5\u00a0mm environ." },
        hint: "δ = √(λ r), avec λ = 5 × 10⁻⁷\u00a0m et r = 10⁻³\u00a0m.",
        why: "√(5 × 10⁻⁷ × 10⁻³) = 2,2 × 10⁻⁵\u00a0m. Plus petite, la facette diffracte (λ/δ) ; plus grande, le grain δ/r grossit. Au minimum les deux flous sont égaux, √(λ/r) ≈ 0,02\u00a0rad chacun. Leçon « L’œil composé des insectes »." },
      racine: { prompt: "On multiplie par 9 la taille d'un œil. De combien diminue le flou minimal s'il est composé, et s'il est à lentille ?",
        options: { a: "Composé : divisé par 3. À lentille : divisé par 9.", b: "Les deux : divisés par 9.", c: "Composé : divisé par 9. À lentille : divisé par 3.", d: "Les deux : divisés par 3." },
        why: "(36.4a) : 2 √(λ/r) décroît comme 1/√r. (36.2a) : λ/D décroît comme 1/D. C'est pourquoi les grands animaux ont des yeux à lentille, et pourquoi un œil composé aussi fin que le nôtre serait plus grand qu'une tête. Leçons « L’œil composé des insectes » et « Les autres yeux »." },
      uv: { prompt: "La plupart des fleurs blanches pour nous paraissent colorées à une abeille. Pourquoi ?",
        options: { a: "Parce que l'abeille voit plus fin que nous.", b: "Parce que la polarisation de la lumière change la couleur des pétales.", c: "Parce que l'abeille voit le rouge mieux que nous.", d: "Parce qu'elles renvoient l'ultraviolet en proportions différentes, et que l'abeille le voit." },
        why: "La vision de l'abeille s'étend jusque vers 300\u00a0nm et s'arrête avant le rouge profond. Deux blancs identiques pour nous peuvent différer dans l'ultraviolet. Masquer le motif ultraviolet d'une rudbeckie fait chuter les visites. Leçon « L’œil composé des insectes »." },
      stenope: { prompt: "Un œil sans cristallin, profond de 25\u00a0mm, regarde en lumière de 550\u00a0nm. Quel trou donne l'image la plus nette, et avec quel flou, d'après (36.4b) ?",
        options: { a: "3\u00a0mm, et un flou d'une minute d'arc.", b: "0,12\u00a0mm environ, et un flou d'environ 0,5°.", c: "0,55\u00a0µm, et aucun flou.", d: "25\u00a0mm, et un flou de 1°." },
        hint: "D = √(λ L), flou 2 √(λ/L).",
        why: "√(5,5 × 10⁻⁷ × 0,025) = 1,2 × 10⁻⁴\u00a0m ; 2 √(2,2 × 10⁻⁵) = 9,4 × 10⁻³\u00a0rad ≈ 0,54°. Ce trou laisse passer très peu de lumière : le nautile ouvre beaucoup plus grand et accepte le flou. Leçon « Les autres yeux »." },
      pieuvre: { prompt: "Pourquoi la pieuvre n'a-t-elle pas de tache aveugle ?",
        options: { a: "Parce que ses récepteurs regardent la lumière et que ses fibres nerveuses partent par l'arrière de la rétine.", b: "Parce qu'elle a deux nerfs optiques par œil.", c: "Parce que son cristallin bouge.", d: "Parce qu'elle n'a qu'un pigment visuel." },
        why: "Chez nous, les fibres passent devant les récepteurs et doivent percer la rétine pour sortir. Chez la pieuvre, la rétine est montée à l'endroit. Le même plan d'œil est apparu deux fois, indépendamment. Leçons « Les autres yeux » et « La physiologie de l’œil »." },
      calmar: { prompt: "La pupille du calmar géant mesure 9\u00a0cm, trente fois la nôtre. Qu'y gagne-t-il surtout ?",
        options: { a: "Une finesse trente fois meilleure, utile pour lire les détails d'une proie.", b: "La vision des couleurs.", c: "Neuf cents fois plus de lumière, pour repérer de loin une lueur faible dans les profondeurs.", d: "Une meilleure vision de la polarisation." },
        why: "La lumière recueillie croît comme D² : 30² = 900. La diffraction de 9\u00a0cm, 6 × 10⁻⁶\u00a0rad, est bien plus fine que ce que la rétine peut séparer. Leçon « Les autres yeux »." },
      plateau: { prompt: "Une rangée d'ommatidies de limule voit un bord net : excitation 1 d'un côté, 3 de l'autre. Inhibition totale K = 0,25. Que deviennent les plateaux, loin du bord ?",
        options: { a: "1 et 3 : l'inhibition ne joue qu'aux bords.", b: "0 et 3 : le côté sombre est réduit au silence.", c: "1 et 2,4 : seul le côté clair est inhibé.", d: "0,8 et 2,4 : tout baisse dans le rapport 1/(1 + K), le rapport 3 est conservé ; seul le voisinage du bord est déformé." },
        hint: "Sur un plateau, tous les rythmes sont égaux : r = e \u2212 K r.",
        why: "r = e/(1 + K) = 0,8 e. Le contraste entre plateaux reste 3. Au ras du bord, le côté clair déborde et le côté sombre se creuse : ce sont les bandes de Mach. Leçon « La neurologie de la vision »." },
      grenouille: { prompt: "Une fibre du nerf optique de la grenouille ne décharge que pendant qu'un bord entre dans son champ ou en sort. Quel capteur moderne fait la même chose ?",
        options: { a: "Le capteur d'un appareil photo ordinaire, qui mesure l'éclairement de chaque pixel.", b: "Une caméra à événements, dont chaque pixel ne signale qu'un changement d'éclairement.", c: "Un photomètre, qui mesure l'éclairement moyen.", d: "Un polariseur." },
        why: "C'est la fibre de type 3, détectrice de contraste qui change. Une scène fixe ne la fait pas répondre, comme un pixel de caméra à événements. Leçon « La neurologie de la vision »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

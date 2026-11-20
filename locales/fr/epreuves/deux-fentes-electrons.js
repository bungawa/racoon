/* Épreuve de l'étape « Les deux fentes » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      longueur: { prompt: "Un électron de 150\u00a0eV (2,4 × 10⁻¹⁷\u00a0J) a une longueur d'onde d'environ 0,1\u00a0nm. Derrière deux trous distants de 1\u00a0mm, sur un écran à 1\u00a0m, que voit-on ?",
        options: { a: "Des franges espacées de 0,1\u00a0µm : λ/d ≈ 10⁻⁷, il faudrait un détecteur bien plus fin que 0,1\u00a0µm pour les voir ; un cristal, dont les rangées d'atomes sont espacées de quelques dixièmes de nanomètre, les écarte bien plus.", b: "Rien : les électrons ne franchissent pas des trous d'un millimètre.", c: "Des franges espacées de 1\u00a0mm, la taille des trous.", d: "Des franges espacées de 0,1\u00a0nm, la longueur d'onde." },
        hint: "L'interfrange vaut λL/d.",
        why: "λL/d = 10⁻¹⁰ × 1/10⁻³ = 10⁻⁷\u00a0m. Tout détecteur plus large en fait la moyenne et ne voit que P1 + P2. Avec d de l'ordre de λ, comme dans un cristal, les angles deviennent grands. Leçons « Les lois de la mécanique atomique » et « Les ondes et les deux fentes »." },
      balles: { prompt: "Avec des balles, une case reçoit 0,3 % des tirs quand seul le trou 1 est ouvert, 0,1 % quand seul le trou 2 l'est. Quelle part des tirs reçoit-elle avec les deux trous ouverts ?",
        options: { a: "Entre 0,05 % et 0,75 %, selon la position.", b: "0,4 %.", c: "0,2 %.", d: "0,3 %, la plus grande des deux." },
        why: "Chaque balle passe par un trou ou par l'autre, et les probabilités s'ajoutent : P12 = P1 + P2, (37.1). Les valeurs entre 0,05 % et 0,75 % seraient celles d'ondes cohérentes. Leçon « Les balles et les deux fentes »." },
      vagues: { prompt: "Dans la cuve, en un point, I1 = 9 et I2 = 1 (mêmes unités). Entre quelles valeurs l'intensité I12 varie-t-elle quand on déplace un peu le détecteur, d'une frange à la suivante ?",
        options: { a: "Entre 8 et 10.", b: "Entre 0 et 10.", c: "Entre 4 et 16.", d: "Elle reste égale à 10." },
        hint: "Les amplitudes valent 3 et 1.",
        why: "(37.4) : I12 = 10 + 2√9 cos δ = 10 + 6 cos δ, de 4 à 16, soit (3 \u2212 1)² et (3 + 1)². Leçon « Les ondes et les deux fentes »." },
      moyenne: { prompt: "Pourquoi un détecteur d'électrons large de plusieurs interfranges mesure-t-il presque P1 + P2, sans franges ?",
        options: { a: "Parce qu'un grand détecteur arrête l'interférence.", b: "Parce qu'il fait passer les électrons un par un.", c: "Parce que les électrons qui le touchent perdent leur phase.", d: "Parce que le terme 2√(P1 P2) cos δ a une moyenne nulle sur un nombre entier de franges : le détecteur additionne franges claires et sombres." },
        why: "Le détecteur somme les arrivées sur sa largeur. Le terme d'interférence change de signe d'une demi-frange à l'autre ; sur une largeur w, il est multiplié par sinc(πw/i), presque nul quand w ≫ i. C'est aussi pourquoi les balles ne montrent pas de franges. Leçons « Les lois de la mécanique atomique » et « Les balles et les deux fentes »." },
      grains: { prompt: "Qu'ont en commun les électrons et les balles dans ces expériences, que les vagues n'ont pas ?",
        options: { a: "Ils arrivent par grains entiers, tous identiques, un à la fois.", b: "Leur probabilité d'arrivée est P1 + P2.", c: "Ils passent tous par la même fente.", d: "Leur intensité peut prendre n'importe quelle valeur." },
        why: "Un clic entier par électron, une balle entière dans le sable ; l'intensité d'une vague, elle, varie de façon continue. Mais seules les balles donnent P1 + P2. Leçons « Les électrons et les deux fentes » et « Les ondes et les deux fentes »." },
      fermer: { prompt: "Avec des électrons, en un point où P1 = P2 = 0,5 (unités arbitraires), on mesure P12 = 0,02 avec les deux fentes ouvertes. On ferme la fente 2. Par combien le compte en ce point est-il multiplié ?",
        options: { a: "Par 0,5 : on a fermé la moitié des fentes.", b: "Par 25 : il passe de 0,02 à P1 = 0,5.", c: "Par 1 : la fente 2 n'envoyait rien ici.", d: "Par 50." },
        why: "La fente 1 seule donne P1 = 0,5 ; avec les deux, φ1 et φ2 s'annulent presque : 0,02. Fermer une fente augmente le compte, ce qu'aucune histoire d'électrons passant par l'une ou l'autre fente n'explique. Leçon « L'interférence des ondes d'électrons »." },
      comptage: { prompt: "Une case de l'écran attend en moyenne 400 électrons. De combien son compte fluctue-t-il, en valeur relative ?",
        options: { a: "0,25 %.", b: "2 %.", c: "5 %.", d: "20 %." },
        hint: "L'écart type vaut à peu près √n.",
        why: "σ ≈ √400 = 20, soit 5 % de 400. Pour voir un contraste de quelques pour cent, il faut des milliers d'arrivées par case. Leçon « Les électrons et les deux fentes »." },
      regle: { prompt: "Quelle règle donne la figure obtenue avec des électrons, quand on ne cherche pas par quelle fente ils passent ?",
        options: { a: "On ajoute les probabilités P1 et P2.", b: "On multiplie les probabilités P1 et P2.", c: "On prend la plus grande des deux probabilités.", d: "On ajoute les amplitudes complexes φ1 et φ2, puis on prend le carré du module de la somme." },
        why: "P12 = |φ1 + φ2|², (37.5b) : la mathématique des vagues, (37.2), appliquée à une probabilité d'arrivée de grains. Leçon « L'interférence des ondes d'électrons »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

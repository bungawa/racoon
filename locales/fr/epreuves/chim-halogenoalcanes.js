/* Épreuve de l'étape « Halogénoalcanes et organomagnésiens » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      loi: { prompt: "Un bromoalcane réagit avec l'ion hydroxyde. On double la concentration de l'ion hydroxyde, à [RX] fixé : la vitesse initiale passe de 2,0 × 10⁻⁵ à 3,0 × 10⁻⁵ mol·L⁻¹·s⁻¹. Quelle part de la vitesse initiale venait de la voie bimoléculaire ?",
        options: { a: "50 % : la voie qui dépend de [HO⁻] a apporté le supplément de 1,0 × 10⁻⁵, égal à sa contribution de départ.", b: "100 %, puisque la vitesse a augmenté.", c: "0 %, puisque la vitesse n'a pas doublé.", d: "33 %, le rapport de l'augmentation à la nouvelle vitesse." },
        hint: "v = k₁[RX] + k₂[RX][Nu⁻] : doubler [Nu⁻] double seulement le second terme.",
        why: "Le terme bimoléculaire double, le terme monomoléculaire ne bouge pas. L'augmentation, 1,0 × 10⁻⁵, est donc égale au terme bimoléculaire de départ : la moitié de 2,0 × 10⁻⁵. L'ordre apparent par rapport au nucléophile vaut 0,5. Leçon « Substitutions nucléophiles SN2 et SN1 »." },
      walden: { prompt: "Le (S)-1-bromo-1-fluoroéthane réagit par SN2 avec le méthanolate. Quel est le descripteur du produit ?",
        options: { a: "R, parce qu'une SN2 change toujours la lettre.", b: "S : la configuration est inversée, mais le fluor passe au rang 1 et le méthoxy au rang 2 ; deux rangs échangés compensent l'inversion.", c: "Un racémique, parce que le carbone est secondaire.", d: "Aucun : le produit n'est pas chiral." },
        why: "Avant : Br > F > CH₃ > H. Après : F > OCH₃ > CH₃ > H. L'attaque par l'arrière inverse la géométrie ; l'échange des rangs 1 et 2 inverse le sens de lecture. Deux inversions : la lettre reste S. Leçons « Substitutions nucléophiles SN2 et SN1 » et « Chiralité et descripteurs stéréochimiques »." },
      mixte: { prompt: "Un halogénoalcane tertiaire énantiomériquement pur est dissous dans l'eau. Que donne la substitution, et avec quelle loi ?",
        options: { a: "Un seul énantiomère, inversé, avec v = k[RX][H₂O].", b: "Un seul énantiomère, de même configuration, avec v = k[RX].", c: "Un mélange racémique, avec v = k[RX] : ionisation lente, puis capture du carbocation plan par ses deux faces.", d: "Aucun produit : un tertiaire ne subit pas de substitution." },
        why: "Le tertiaire est trop encombré pour l'attaque arrière mais forme un carbocation stabilisé, d'autant mieux que l'eau, protique polaire, solvate les ions. L'acte lent ne fait pas intervenir le nucléophile ; l'intermédiaire plan perd la configuration. Leçon « Substitutions nucléophiles SN2 et SN1 »." },
      anti: { prompt: "Le (2R,3R)-2-bromo-3-méthylpentane et son diastéréoisomère (2R,3S) subissent chacun une E2 vers le 3-méthylpent-2-ène. Que donnent-ils ?",
        options: { a: "Le même mélange de Z et de E.", b: "Le même alcène E, le plus stable.", c: "Aucun alcène : le carbone 3 n'a qu'un hydrogène.", d: "Deux alcènes de configurations opposées : un seul hydrogène du carbone 3 peut être anti du brome, et sa position est fixée par la configuration." },
        hint: "Combien de conformations du carbone 3 mettent un hydrogène anti du brome ?",
        why: "Une seule conformation anti-périplanaire par diastéréoisomère : les groupes qui sont du même côté dans la projection de Newman le restent dans l'alcène. Inverser le carbone 3 échange ses deux groupes carbonés, donc échange Z et E : l'E2 est stéréospécifique. Leçon « Élimination E2, stéréochimie et régiosélectivité »." },
      zaitsev: { prompt: "Le 2-bromo-2-méthylbutane réagit avec l'éthanolate de potassium, puis avec le tert-butanolate de potassium. Que devient la part du 2-méthylbut-2-ène ?",
        options: { a: "Elle passe d'environ 70 % à environ 28 % : la base encombrée atteint mieux les hydrogènes des méthyles terminaux.", b: "Elle reste de 70 % : seule la stabilité de l'alcène compte.", c: "Elle passe de 30 % à 72 %.", d: "Elle tombe à 0 % : la base encombrée ne fait que des substitutions." },
        why: "Base peu encombrée : l'alcène le plus substitué domine, règle de Zaïtsev. Base volumineuse : le CH₂ interne est difficile d'accès, le 2-méthylbut-1-ène domine. Mesures de Brown, 1956. Leçon « Élimination E2, stéréochimie et régiosélectivité »." },
      polarite: { prompt: "Électronégativités de Pauling : C 2,55 ; Br 2,96 ; Mg 1,31. Que devient le carbone lié au brome quand le magnésium s'insère dans la liaison ?",
        options: { a: "Il reste électrophile, avec une charge partielle positive plus grande.", b: "Il passe de δ+ (Δχ = 0,41 avec Br) à δ\u2212 (Δχ = 1,24 avec Mg) : d'électrophile, il devient nucléophile.", c: "Il devient neutre : les deux effets se compensent.", d: "Il devient un carbocation." },
        why: "Dans C–Br, le doublet est tiré vers le brome ; dans C–Mg, vers le carbone. Le même atome change de rôle : c'est l'inversion de polarité. Leçon « Organomagnésiens mixtes et inversion de polarité »." },
      eau: { prompt: "On prépare 50 mmol d'organomagnésien dans 200 mL d'éthoxyéthane (ρ = 0,713 kg·L⁻¹) qui contient 200 mg d'eau par kilogramme. Quelle part du réactif l'eau détruit-elle ?",
        options: { a: "Environ 0,3 %.", b: "Environ 32 %.", c: "Environ 3 % : 143 g d'éther, 29 mg d'eau, 1,6 mmol.", d: "Tout le réactif." },
        hint: "Une molécule d'eau détruit une molécule de R–MgX.",
        why: "0,713 × 0,200 = 0,143 kg d'éther ; 200 × 10⁻⁶ × 143 g = 28,5 mg d'eau, soit 1,58 mmol. 1,58/50 ≈ 3,2 %. Un éther mal séché coûte vite une part sensible du rendement. Leçon « Organomagnésiens mixtes et inversion de polarité »." },
      classe: { prompt: "On veut le 2-phénylbutan-2-ol, C₆H₅–C(OH)(CH₃)–CH₂CH₃, par addition d'un organomagnésien puis hydrolyse. Quel couple ne convient pas ?",
        options: { a: "Bromure de phénylmagnésium et butanone.", b: "Bromure d'éthylmagnésium et 1-phényléthanone.", c: "Bromure de méthylmagnésium et 1-phénylpropan-1-one.", d: "Bromure d'éthylmagnésium et benzaldéhyde." },
        hint: "Un alcool tertiaire vient d'une cétone ; un aldéhyde donne un alcool secondaire.",
        why: "Le carbone fonctionnel porte trois groupes carbonés : phényle, méthyle, éthyle. Chacun peut venir de l'organomagnésien, les deux autres de la cétone. Le benzaldéhyde porte un H : il donnerait le 1-phénylpropan-1-ol, secondaire. Le produit est racémique : les deux faces de la cétone sont équivalentes. Leçon « Addition nucléophile sur les aldéhydes, les cétones et le dioxyde de carbone »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

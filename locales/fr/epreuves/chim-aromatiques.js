/* Épreuve de l'étape « Composés aromatiques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      huckel: { prompt: "Lequel de ces cycles plans est aromatique selon la règle de Hückel ?",
        options: { a: "L'anion cyclopropényle C₃H₃⁻, à 4 électrons π.", b: "Le cation tropylium C₇H₇⁺, à 6 électrons π sur sept carbones.", c: "Le cation cyclopentadiényle C₅H₅⁺, à 4 électrons π.", d: "Le cyclooctatétraène C₈H₈, à 8 électrons π." },
        hint: "Comptez les électrons π : 4n + 2 ?",
        why: "Sept orbitales p, sept électrons moins un pour la charge + : 6 = 4 × 1 + 2. Les deux ions à 4 électrons auraient une couche ouverte ; le cyclooctatétraène, à 8 électrons, se plie et n'est pas plan. Leçon « Aromaticité et structure du benzène »." },
      stab: { prompt: "Hydrogéner le cyclohexène libère 118 kJ·mol⁻¹, le benzène 206 kJ·mol⁻¹. À 298 K (RT ≈ 2,48 kJ·mol⁻¹), combien de fois RT vaut la stabilisation du benzène ?",
        options: { a: "Environ 60 : (3 × 118 \u2212 206)/2,48.", b: "Environ 83 : 206/2,48.", c: "Environ 143 : 354/2,48.", d: "Environ 48 : 118/2,48." },
        why: "Un cyclohexatriène à doubles liaisons indépendantes libérerait 354 kJ·mol⁻¹ ; le benzène en libère 148 de moins. 148/2,48 ≈ 60 : aucune collision thermique ne défait la délocalisation. Leçon « Aromaticité et structure du benzène »." },
      mecanisme: { prompt: "Dans la nitration du benzène, quel acte fixe la vitesse ?",
        options: { a: "Toujours la formation de l'ion nitronium.", b: "La perte de l'ion H⁺ par l'intermédiaire.", c: "L'attaque de l'ion nitronium par le cycle, qui forme l'intermédiaire de Wheland.", d: "La rupture d'une liaison N–O de l'acide nitrique." },
        hint: "Un composé marqué au tritium se nitre aussi vite que le composé ordinaire.",
        why: "Si la perte de H⁺ limitait la vitesse, la liaison C–T, plus lente à rompre, ralentirait la réaction : ce n'est pas le cas. L'attaque, qui détruit la délocalisation, est l'acte lent. Leçon « Substitution électrophile aromatique »." },
      localisation: { prompt: "Modèle de Hückel, stabilisations π : benzène 8 |β|, intermédiaire de Wheland 5,46 |β|, diène d'une addition 4,47 |β|. Avec |β| ≈ 74 kJ·mol⁻¹, combien la substitution gagne-t-elle sur l'addition, côté π ?",
        options: { a: "≈ 73 kJ·mol⁻¹", b: "≈ 188 kJ·mol⁻¹", c: "Rien", d: "≈ 261 kJ·mol⁻¹ : (8 \u2212 4,47) × 74." },
        why: "La substitution rend les 8 |β| du benzène ; l'addition s'arrête à 4,47 |β|. L'écart, 3,53 |β|, vaut environ 261 kJ·mol⁻¹. Les liaisons σ ne sont pas comptées : un ordre de grandeur. Leçon « Substitution électrophile aromatique »." },
      friedel: { prompt: "Pour obtenir le propylbenzène, à chaîne linéaire, à partir du benzène, quelle voie choisir ?",
        options: { a: "Une acylation par le chlorure de propanoyle et AlCl₃, puis la réduction de la cétone.", b: "Une alkylation par le 1-chloropropane et AlCl₃.", c: "Une nitration, puis une réduction.", d: "L'addition du propène, sans catalyseur." },
        why: "Avec le 1-chloropropane, le cation propyle se réarrange en cation isopropyle : il se forme aussi du cumène. L'ion acylium ne se réarrange pas, et la cétone désactive le cycle : une seule substitution. Leçon « Substitution électrophile aromatique »." },
      facteurs: { prompt: "Le chlorobenzène se nitre environ 0,03 fois aussi vite que le benzène, avec 35 % d'ortho, 1 % de méta et 64 % de para. Que vaut le facteur partiel de vitesse en para ?",
        options: { a: "0,64", b: "Environ 0,12 : 6 × 0,03 × 0,64.", c: "Environ 19", d: "0,03" },
        why: "f_p = 6 k_rel x_p ≈ 0,12 : la position para du chlorobenzène réagit environ 9 fois plus lentement qu'une position du benzène. Désactivé partout par induction, le cycle reste orienté en para par la mésomérie du chlore. Leçon « Polysubstitution, orientation et activation »." },
      polysub: { prompt: "On nitre le 4-nitrotoluène. Où entre le second groupe nitro ?",
        options: { a: "En méta du méthyle.", b: "Sur le carbone qui porte le méthyle.", c: "En ortho du méthyle, qui est aussi en méta du nitro : les deux groupes s'accordent.", d: "En ortho du nitro." },
        why: "Le méthyle vise ses positions ortho (son para est pris) ; le nitro vise ses positions méta : ce sont les mêmes. On obtient le 2,4-dinitrotoluène, en route vers le trinitrotoluène. Leçon « Polysubstitution, orientation et activation »." },
      aniline: { prompt: "On veut la 4-nitroaniline à partir de l'aniline. Quelle suite d'étapes choisir ?",
        options: { a: "Une nitration directe en milieu sulfonitrique.", b: "Une bromation, puis une nitration.", c: "Une protonation par l'acide sulfurique, puis une nitration.", d: "Une acétylation de l'azote, une nitration (para majoritaire), puis l'hydrolyse de l'amide." },
        why: "En milieu sulfonitrique, l'aniline (pKa 4,6 de l'ion anilinium) est presque entièrement protonée : NH₃⁺ oriente en méta, et près de la moitié du produit est la 3-nitroaniline. L'acétanilide, moins activé et non protoné, donne 79 % de para. Leçon « Phénols et anilines »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

/* généré par graph/build.js depuis graph/graph.js : ne pas modifier */
/* Graphe des notions. Sources : Feynman Lectures, programmes de CPGE (actuels et passés), écoles d'ingénieurs ; d'autres viendront.
   "couvre" : sections des Feynman Lectures ("I.21" = chapitre entier, "I.1.1-2" = sections 1 à 2, "II.31.8" = une section).
   "extras" : leçons d'autres sources (CPGE, écoles d'ingénieurs).
   prereq : nœuds à avoir vus avant (déblocage souple). */
(function (root) {
  const PISTES = {
    fond: "Fondements et outils",
    thermo: "Thermodynamique et physique statistique",
    chim: "Chimie",
    meca: "Mécanique du point",
    relat: "Relativité",
    solide: "Mécanique du solide",
    fluides: "Mécanique des fluides",
    ondes: "Oscillations et ondes",
    optique: "Optique et rayonnement",
    em: "Électromagnétisme",
    quant: "Physique quantique",
    genie_civil: "Génie civil et structures",
    meca_ing: "Mécanique et matériaux de l'ingénieur",
    energie_procedes: "Énergie et procédés",
    elec_auto: "Génie électrique et automatique",
  };

  const N = (id, piste, titre, couvre, prereq, extras) => ({ id, piste, titre, couvre, prereq: prereq || [], extras: extras || [] });
  // Leçons des autres sources : clés "X.<notion>.<n>", livrées avant les sections des Feynman Lectures de la notion.
  const X = (id, titres) => titres.map((titre, i) => ({ key: `X.${id}.${i + 1}`, titre }));
  // Notion d'un programme passé de CPGE : périodes d'enseignement et texte officiel d'origine.
  const H = (node, periodes, source) => Object.assign(node, { historique: { periodes, source } });
  const P84 = "Programmes de mathématiques supérieures et spéciales M, M', P, P', arrêtés de 1984 modifiés en 1987–1988 (archive.org : programme-mp-m-p-1987-1988)";
  const P04 = "Programmes de physique-chimie PCSI/PC 2003–2004 (B.O. hors-série n° 6 du 16 septembre 2004)";
  const P95 = "Programmes de 1995–1996 (B.O. hors-série du 20 juillet 1995 et du 18 juillet 1996), d'après les leçons du CAPES 2004";
  const P14 = "Programme de physique-chimie PC 2014 (B.O. spécial n° 1 du 23 janvier 2014)";

  const NOEUDS = [
    // Fondements et outils
    N("atomes", "fond", "Atomes en mouvement", ["I.1"], ["mesure"]),
    N("panorama", "fond", "La physique et les autres sciences", ["I.2", "I.3"], ["atomes"]),
    N("energie", "fond", "Conservation de l'énergie", ["I.4"], ["atomes"]),
    N("mesure", "fond", "Grandeurs, mesures, ordres de grandeur", ["I.5"], [], X("mesure", [
      "Incertitude absolue et incertitude relative",
      "Ordres de grandeur",
      "Homogénéité : les dimensions comptent",
    ])),
    N("proba", "fond", "Probabilités", ["I.6"]),
    N("algebre", "fond", "Algèbre et nombres complexes", ["I.22"]),
    N("vecteurs", "fond", "Vecteurs et symétries", ["I.11"], ["dynamique"]),
    N("calcul_vectoriel", "fond", "Analyse vectorielle", ["II.2", "II.3"], ["vecteurs"]),
    N("tenseurs", "fond", "Tenseurs", ["II.31.1-7"], ["rotation_espace", "dielectriques"]),
    N("moindre_action", "fond", "Principe de moindre action", ["II.19"], ["travail", "fermat"]),
    N("symetrie", "fond", "Symétries des lois physiques", ["I.52"], ["rotation_espace", "relat_restreinte"]),

    // Chimie (programme de CPGE)
    N("chim_structure", "chim", "Structure électronique et classification périodique", [], ["atomes"], X("chim_structure", [
      "Atome, isotopes, quantité de matière et mole",
      "Configuration électronique : règles de Klechkowski, Hund et Pauli",
      "Classification périodique, électronégativité, rayon atomique"])),
    N("chim_liaison", "chim", "Liaisons, molécules et interactions", [], ["chim_structure"], X("chim_liaison", [
      "Schémas de Lewis et mésomérie",
      "Géométrie VSEPR et polarité des molécules",
      "Interactions de van der Waals et liaison hydrogène",
      "Solvants : polarité, proticité, solubilité"])),
    N("chim_cristallo", "chim", "Cristallographie", [], ["chim_liaison"], X("chim_cristallo", [
      "Modèle du cristal parfait : réseau, motif, maille",
      "Empilements compacts : cubique à faces centrées, hexagonal compact",
      "Compacité, masse volumique, sites interstitiels",
      "Cristaux métalliques, ioniques, covalents et moléculaires"])),
    N("chim_transfo", "chim", "Transformations chimiques et équilibre", [], ["atomes"], X("chim_transfo", [
      "Avancement, réactif limitant, tableau d'avancement",
      "Activité, quotient de réaction, constante d'équilibre",
      "Évolution spontanée : comparer Q et K"])),
    N("chim_cinetique", "chim", "Cinétique chimique", [], ["chim_transfo", "boltzmann"], X("chim_cinetique", [
      "Vitesse de réaction, ordre, temps de demi-réaction",
      "Loi d'Arrhenius et énergie d'activation",
      "Mécanismes : actes élémentaires, AEQS, étape cinétiquement déterminante"])),
    N("chim_acidobase", "chim", "Acides et bases, pH", [], ["chim_transfo"], X("chim_acidobase", [
      "Couples acide-base, Ka, pKa, diagramme de prédominance",
      "Méthode de la réaction prépondérante",
      "Calcul de pH : acide fort, acide faible, ampholyte, mélanges",
      "Solutions tampons et titrages"])),
    N("chim_solubilite", "chim", "Précipitation et complexation", [], ["chim_acidobase"], X("chim_solubilite", [
      "Produit de solubilité et condition de précipitation",
      "Effet d'ion commun et influence du pH",
      "Complexes : constantes de formation, diagrammes de distribution"])),
    N("chim_redox", "chim", "Oxydoréduction", [], ["chim_transfo"], X("chim_redox", [
      "Nombres d'oxydation, couples, équilibrage",
      "Piles, potentiel d'électrode, formule de Nernst",
      "Prévision des réactions, constante d'équilibre redox"])),
    N("chim_enthalpie", "chim", "Thermochimie : premier principe", [], ["thermo", "chim_transfo"], X("chim_enthalpie", [
      "Grandeurs de réaction et état standard",
      "Enthalpie standard de réaction, loi de Hess, enthalpies de formation",
      "Température de flamme, transferts thermiques en réacteur"])),
    N("chim_potentiel", "chim", "Potentiel chimique et équilibres", [], ["chim_enthalpie"], X("chim_potentiel", [
      "Enthalpie libre et second principe",
      "Potentiel chimique : μ = μ° + RT ln a",
      "Enthalpie libre de réaction : ΔrG° = −RT ln K°",
      "Déplacement d'équilibre : température (van 't Hoff) et pression"])),
    N("chim_diagrammes", "chim", "Diagrammes E-pH et courbes intensité-potentiel", [], ["chim_redox", "chim_solubilite", "chim_potentiel"], X("chim_diagrammes", [
      "Construction et lecture d'un diagramme E-pH",
      "Courbes intensité-potentiel et surtensions",
      "Corrosion, électrolyse, accumulateurs"])),
    // Chimie organique, d'après les programmes de PCSI (2.1, 2.3, 6.1–6.4) et de PC (2.2, 2.3, 3.1–3.2)
    N("chim_orga_base", "chim", "Structure des entités organiques", [], ["chim_liaison"], X("chim_orga_base", [
      "Isomérie de constitution et représentation topologique",
      "Conformations : représentation de Newman, barrière conformationnelle",
      "Configuration : chiralité, énantiomérie, diastéréoisomérie, descripteurs R, S, Z, E",
      "Activité optique, loi de Biot, séparation des stéréoisomères"])),
    N("chim_orga_meca", "chim", "Réactivité organique et mécanismes", [], ["chim_orga_base", "chim_cinetique"], X("chim_orga_meca", [
      "Nucléophiles et électrophiles : de la structure à la réactivité",
      "Mécanisme réactionnel : acte élémentaire, molécularité, complexe activé, intermédiaire",
      "Facteurs cinétiques et formalisme des flèches courbes",
      "Synthèse au laboratoire : transformation, séparation, purification, caractérisation, rendement"])),
    N("chim_orga_halo", "chim", "Halogénoalcanes : substitution et élimination", [], ["chim_orga_meca", "chim_acidobase"], X("chim_orga_halo", [
      "Substitutions nucléophiles SN2 et SN1 : cinétique et stéréochimie",
      "Élimination E2 : stéréochimie et régiosélectivité"])),
    N("chim_orga_mg", "chim", "Organomagnésiens et addition nucléophile", [], ["chim_orga_halo"], X("chim_orga_mg", [
      "Organomagnésiens mixtes : préparation, nucléophilie, inversion de polarité",
      "Addition nucléophile sur les aldéhydes, les cétones et le dioxyde de carbone"])),
    N("chim_spectro", "chim", "Spectroscopies UV-visible, IR et RMN", [], ["chim_orga_base", "paramagnetisme"], X("chim_spectro", [
      "Spectroscopies d'absorption UV-visible et infrarouge",
      "RMN du proton : déplacement chimique, intégration, constante de couplage",
      "Couplages du premier ordre AmXp et AmMpXq"])),
    N("chim_orga_redox", "chim", "Oxydoréduction en chimie organique", [], ["chim_orga_mg", "chim_redox"], X("chim_orga_redox", [
      "Niveau d'oxydation des groupes caractéristiques",
      "Oxydation des alcools selon leur classe, oxydation contrôlée",
      "Réduction des aldéhydes et cétones par NaBH₄"])),
    N("chim_orga_activation", "chim", "Activation de groupes caractéristiques", [], ["chim_orga_redox"], X("chim_orga_activation", [
      "Activation nucléophile des alcools : alcoolates, synthèse de Williamson",
      "Activation électrophile des alcools : protonation, esters sulfoniques",
      "Activation électrophile du carbonyle : acétalisation, hémiacétalisation du glucose"])),
    N("chim_orga_strategie", "chim", "Protection et stratégie de synthèse", [], ["chim_orga_activation"], X("chim_orga_strategie", [
      "Protection et déprotection des groupes carbonyle et hydroxyle",
      "Approche élémentaire de l'analyse rétrosynthétique"])),
    N("chim_orbitales", "chim", "Orbitales moléculaires et réactivité", [], ["hydrogene"], X("chim_orbitales", [
      "Orbitales atomiques",
      "Interaction de deux orbitales atomiques, orbitales de fragments",
      "Diagramme d'orbitales moléculaires, HO et BV, ordre de liaison",
      "Approximation des orbitales frontalières : prévoir la réactivité"])),
    N("chim_complexes", "chim", "Complexes et catalyse", [], ["chim_orbitales", "chim_cinetique", "chim_solubilite"], X("chim_complexes", [
      "Structure des complexes",
      "Cycles catalytiques, hydrogénation en catalyse homogène",
      "Polymérisation des alcènes par coordination"])),
    N("chim_orga_conversion", "chim", "Conversion de groupes caractéristiques", [], ["chim_orga_strategie", "chim_orbitales", "chim_potentiel"], X("chim_orga_conversion", [
      "Familles fonctionnelles, aspects thermodynamiques et cinétiques, géométrie d'approche",
      "Additions électrophiles sur les doubles liaisons C=C",
      "Addition nucléophile puis départ d'un nucléofuge : esters, amides, protection, polyesters et polyamides, peptides",
      "Oxydoréduction : hydrogénation hétérogène, époxydation, ouverture des époxydes, réduction des esters"])),
    N("chim_orga_cc", "chim", "Création de liaisons carbone-carbone", [], ["chim_orga_conversion"], X("chim_orga_cc", [
      "Réaction de Diels-Alder",
      "Énolates : C-alkylation, aldolisation non dirigée et dirigée",
      "Crotonisation (E1cb) et réaction de Michael",
      "Organomagnésiens sur les époxydes et les esters"])),

    // Programme actuel de CPGE, fréquent aux concours
    N("statique_fluides", "fluides", "Statique des fluides", [], ["forces", "boltzmann"], X("statique_fluides", [
      "Pression, forces de pression, équivalent volumique",
      "Relation fondamentale de la statique des fluides : fluide incompressible, atmosphère isotherme",
      "Poussée d'Archimède"])),
    N("dyn_fluides", "fluides", "Dynamique des fluides : bilans et écoulements réels", [], ["fluides_visqueux"], X("dyn_fluides", [
      "Bilans de masse, de quantité de mouvement et d'énergie sur un système ouvert",
      "Pertes de charge, régimes laminaire et turbulent",
      "Couche limite",
      "Écoulements compressibles : tuyère, nombre de Mach"])),
    N("non_galileen", "meca", "Mécanique en référentiel non galiléen", [], ["rotation_espace"], X("non_galileen", [
      "Changement de référentiel : composition des vitesses et des accélérations",
      "Forces d'inertie d'entraînement et de Coriolis",
      "Dynamique terrestre : pesanteur, déviation vers l'est, pendule de Foucault"])),
    N("particule_champ", "meca", "Particule chargée dans un champ électrique ou magnétique", [], ["travail", "em_intro"], X("particule_champ", [
      "Force de Lorentz ; la force magnétique ne travaille pas",
      "Mouvement dans un champ électrique uniforme : accélération, déviation",
      "Mouvement dans un champ magnétique uniforme : trajectoire circulaire, pulsation cyclotron"])),
    N("forces_centrales", "meca", "Moment cinétique et forces centrales conservatives", [], ["travail", "vecteurs"], X("forces_centrales", [
      "Moment cinétique d'un point, théorème du moment cinétique",
      "Force centrale : mouvement plan, loi des aires",
      "Énergie potentielle effective : états liés et états de diffusion",
      "Champ newtonien : coniques, lois de Kepler, vitesses cosmiques"])),
    N("pendule", "meca", "Pendule simple : au-delà des petites oscillations", [], ["oscillateur", "travail"], X("pendule", [
      "Pendule simple : équation du mouvement, linéarisation",
      "Portrait de phase : oscillations, révolutions, séparatrice",
      "Période aux grandes amplitudes : anisochronisme, formule de Borda"])),
    N("changements_etat", "thermo", "Changements d'état du corps pur", [], ["thermo"], X("changements_etat", [
      "Diagrammes (P, T) et (P, v) : point triple, point critique",
      "Enthalpie et entropie de changement d'état",
      "Équilibre liquide-vapeur et formule de Clapeyron"])),
    N("machines_thermiques", "thermo", "Machines thermiques et systèmes ouverts", [], ["changements_etat"], X("machines_thermiques", [
      "Premier et second principes pour un système ouvert en écoulement stationnaire",
      "Machines dithermes réelles : moteurs, pompes à chaleur, réfrigérateurs",
      "Cycles avec changement d'état : diagrammes (P, h) et (T, s)"])),
    N("transferts_thermiques", "thermo", "Transferts thermiques : conduction et convection", [], ["diffusion", "calcul_vectoriel"], X("transferts_thermiques", [
      "Loi de Fourier et équation de la diffusion thermique",
      "Régime stationnaire et résistance thermique",
      "Convection : loi de Newton, ailette",
      "Régime variable et ondes thermiques"])),
    N("corps_noir", "thermo", "Rayonnement thermique", [], ["brownien", "transferts_thermiques"], X("corps_noir", [
      "Corps noir : lois de Planck, de Wien et de Stefan",
      "Bilans radiatifs et effet de serre"])),
    N("elec_ao", "em", "Électronique : amplificateur opérationnel, filtres, oscillateurs", [], ["circuits_ac"], X("elec_ao", [
      "Amplificateur opérationnel idéal et montages linéaires",
      "Filtres actifs du premier et du second ordre, diagrammes de Bode",
      "Comparateurs et oscillateurs : multivibrateur, pont de Wien"])),
    N("signal", "ondes", "Traitement du signal", [], ["elec_ao", "fourier"], X("signal", [
      "Spectre d'un signal périodique et non périodique",
      "Filtrage linéaire d'un signal",
      "Échantillonnage, critère de Shannon, numérisation",
      "Modulation, démodulation, détection synchrone"])),
    N("conversion_em", "em", "Conversion électromécanique et électronique de puissance", [], ["circuits_ac", "rotation_plan"], X("conversion_em", [
      "Transformateur",
      "Machines à courant continu et synchrone : couple, force électromotrice, bilan de puissance",
      "Électronique de puissance : hacheur, onduleur, redresseur"])),
    N("plasmas", "em", "Plasmas : propagation et confinement", [], ["indice_dense", "mouvement_charges"], X("plasmas", [
      "Modèle du plasma : électrons libres, fréquence plasma",
      "Propagation dans un plasma : relation de dispersion, coupure, ionosphère",
      "Confinement magnétique et fusion"])),
    N("chim_binaires", "chim", "Diagrammes binaires liquide-vapeur et solide-liquide", [], ["chim_potentiel", "changements_etat"], X("chim_binaires", [
      "Binaires liquide-vapeur : miscibilité totale, azéotropes",
      "Distillation fractionnée et hydrodistillation",
      "Binaires solide-liquide : eutectiques, composés définis",
      "Courbes d'analyse thermique, théorème des moments, alliages"])),

    // Programmes passés de CPGE (sources : corpus/programmes-abandonnes.json)
    H(N("diffusion_rutherford", "meca", "Collisions, section efficace et expérience de Rutherford", [], ["rotation_plan"], X("diffusion_rutherford", [
      "Problème à deux corps : référentiel du centre de masse, masse réduite",
      "États liés et états de diffusion dans un potentiel central",
      "Collisions et section efficace (sphères dures)",
      "Diffusion des particules α et expérience de Rutherford"])), ["1984–1995"], P84),
    H(N("contact_solides", "solide", "Contact entre solides : glissement, roulement, liaisons", [], ["rotation_plan"], X("contact_solides", [
      "Vitesse de glissement, roulement sans glissement",
      "Lois de Coulomb du frottement de glissement",
      "Puissance des actions de contact, liaisons parfaites pivot et rotule",
      "Solide en rotation autour d'un axe fixe avec contact frottant"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("gaz_reels", "thermo", "Gaz réels : Van der Waals et viriel", [], ["gaz_cinetique", "chim_liaison"], X("gaz_reels", [
      "Limites du gaz parfait : volume des molécules et interactions",
      "Équation de Van der Waals : covolume et pression interne",
      "Développement du viriel",
      "Coefficients thermoélastiques et calorimétriques d'un fluide réel"])), ["1984–1995"], P84),
    H(N("detentes", "thermo", "Détentes de Joule–Gay-Lussac et de Joule–Thomson", [], ["gaz_reels"], X("detentes", [
      "Détente de Joule–Gay-Lussac : énergie interne constante, bilan d'entropie",
      "Détente de Joule–Thomson : écoulement à enthalpie constante",
      "Ce que les détentes révèlent des interactions moléculaires"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("tension_superficielle", "fluides", "Tension superficielle et capillarité", [], ["statique_fluides", "travail"], X("tension_superficielle", [
      "Coefficient de tension superficielle : une énergie de surface",
      "Interprétation énergétique d'un protocole de mesure",
      "Mesure d'un coefficient de tension superficielle"])), ["2013–2022"], P14),
    H(N("miroirs_spheriques", "optique", "Miroirs sphériques", [], ["optique_geom"], X("miroirs_spheriques", [
      "Miroirs concaves et convexes : centre, sommet, foyer",
      "Relations de conjugaison et de grandissement dans les conditions de Gauss",
      "Constructions d'images, montages lentilles et miroirs"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("ellingham", "chim", "Élaboration des métaux : diagrammes d'Ellingham", [], ["chim_diagrammes"], X("ellingham", [
      "Approximation d'Ellingham et diagrammes d'Ellingham",
      "Pyrométallurgie : haut-fourneau, réduction des oxydes",
      "Hydrométallurgie du zinc et électrolyse",
      "Élaboration du silicium et du titane"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("defauts_cristal", "chim", "Cristal réel : défauts et non-stœchiométrie", [], ["cristaux"], X("defauts_cristal", [
      "Du cristal parfait au cristal réel : lacunes, ions interstitiels",
      "Non-stœchiométrie : l'oxyde Fe₁₋ₓO",
      "Caractère ionique des halogénures (NaCl, CsCl, AgCl)"])), ["1984–1995", "1995–2004"], P84),
    H(N("energie_reticulaire", "chim", "Énergie réticulaire des cristaux ioniques", [], ["chim_cristallo", "energie_electrostatique"], X("energie_reticulaire", [
      "Cristal ionique : dimensions des ions",
      "Énergie réticulaire : définition, ordres de grandeur",
      "Modèle électrostatique et constante de Madelung",
      "Comparer les types de solides à partir de leurs données physiques"])), ["1984–1995"], P84),
    H(N("chimie_industrielle", "chim", "Chimie industrielle minérale : ammoniac, chlore, soude", [], ["chim_diagrammes", "chim_cinetique"], X("chimie_industrielle", [
      "Synthèse de l'ammoniac : contraintes thermodynamiques et cinétiques",
      "Acide nitrique et engrais azotés",
      "Électrolyse du chlorure de sodium : dichlore et soude",
      "Le chlore en solution aqueuse"])), ["1984–1995"], P84),
    H(N("aromatiques", "chim", "Aromatiques et substitution électrophile aromatique", [], ["chim_orga_meca", "chim_orbitales", "particules_indep"], X("aromatiques", [
      "Aromaticité et structure du benzène",
      "Substitution électrophile aromatique : halogénation, nitration, Friedel-Crafts",
      "Polysubstitution : orientation et activation",
      "Phénols et anilines"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("diazonium", "chim", "Amines, sels de diazonium et couplage azoïque", [], ["aromatiques", "chim_orga_conversion"], X("diazonium", [
      "Nucléophilie et alkylation des amines",
      "Diazotation des amines aromatiques primaires",
      "Couplage diazoïque et colorants azoïques"])), ["1984–1995", "1995–2004"], P84),
    H(N("synthese_complements", "chim", "Compléments de synthèse : Wittig, malonique, cuprates, LiAlH₄", [], ["chim_orga_cc"], X("synthese_complements", [
      "Réaction de Wittig",
      "Synthèse malonique",
      "Additions conjuguées : organocuprates",
      "Réductions par LiAlH₄, hydrolyse des nitriles et des amides"])), ["1995–2004", "2003–2014", "2013–2022"], P95),
    H(N("alcenes_alcynes", "chim", "Alcènes et alcynes : oxydations et coupures", [], ["chim_orga_conversion", "chim_complexes"], X("alcenes_alcynes", [
      "Hydrogénation des alcènes, hydrogénation partielle des alcynes",
      "Syn-dihydroxylation et coupure des diols",
      "Ozonolyse et coupures oxydantes",
      "Additions radicalaires ; alcynes vrais et ions acétylure"])), ["1984–1995", "1995–2004", "2003–2014"], P84),
    H(N("polymeres", "chim", "Polymérisations et propriétés des polymères", [], ["chim_orga_meca"], X("polymeres", [
      "Polymères : unité de répétition, degré de polymérisation, architectures",
      "Polymérisation radicalaire : amorçage, propagation, terminaison",
      "Polymérisation anionique, tacticité, copolymères",
      "Transition vitreuse, semi-cristallinité, propriétés mécaniques"])), ["1995–2004", "2003–2014", "2013–2022"], P95),

    // Mécanique du point
    N("cinematique", "meca", "Cinématique", ["I.8"], ["mesure"]),
    N("gravitation", "meca", "Théorie de la gravitation", ["I.7"], ["cinematique"]),
    N("dynamique", "meca", "Lois de Newton", ["I.9"], ["cinematique"]),
    N("quantite_mvt", "meca", "Conservation de la quantité de mouvement", ["I.10"], ["dynamique"]),
    N("forces", "meca", "Caractéristiques des forces", ["I.12"], ["dynamique"]),
    N("travail", "meca", "Travail et énergie potentielle", ["I.13", "I.14"], ["forces", "energie", "gravitation"]),

    // Relativité
    N("relat_restreinte", "relat", "Relativité restreinte", ["I.15"], ["quantite_mvt", "travail"]),
    N("relat_energie", "relat", "Énergie et quantité de mouvement relativistes", ["I.16"], ["relat_restreinte"]),
    N("espace_temps", "relat", "Espace-temps", ["I.17"], ["relat_energie", "vecteurs"]),
    N("electro_relat", "relat", "Électrodynamique relativiste", ["II.25", "II.26", "II.31.8"], ["ondes_em", "espace_temps", "tenseurs"]),
    N("relativite_generale", "relat", "Espace courbe et relativité générale", ["II.42"], ["espace_temps"]),

    // Solide et milieux continus
    N("rotation_plan", "solide", "Rotation plane, centre de masse, moment d'inertie", ["I.18", "I.19"], ["quantite_mvt", "travail"]),
    N("rotation_espace", "solide", "Rotation dans l'espace", ["I.20"], ["rotation_plan", "vecteurs"]),
    N("cristaux", "solide", "Géométrie interne des cristaux", ["II.30"], ["forces", "chim_cristallo"]),
    N("elasticite", "solide", "Élasticité", ["II.38", "II.39"], ["tenseurs"]),
    N("fluides_parfaits", "fluides", "Écoulement de l'eau sèche (fluide parfait)", ["II.40"], ["calcul_vectoriel", "travail", "statique_fluides"]),
    N("fluides_visqueux", "fluides", "Écoulement de l'eau mouillée (fluide visqueux)", ["II.41"], ["fluides_parfaits"]),

    // Oscillations et ondes
    N("oscillateur", "ondes", "Oscillateur harmonique", ["I.21"], ["dynamique"]),
    N("resonance", "ondes", "Résonance et régimes transitoires", ["I.23", "I.24"], ["oscillateur", "algebre"]),
    N("lineaires", "ondes", "Systèmes linéaires", ["I.25"], ["resonance"], X("lineaires", ["Transformée de Laplace et notation complexe"])),
    N("son", "ondes", "Le son, équation d'onde", ["I.47"], ["oscillateur", "gaz_cinetique"]),
    N("battements", "ondes", "Battements", ["I.48"], ["son", "resonance"]),
    N("modes", "ondes", "Modes propres", ["I.49"], ["battements", "lineaires"]),
    N("fourier", "ondes", "Harmoniques et séries de Fourier", ["I.50"], ["modes"]),
    N("ondes_diverses", "ondes", "Ondes de choc, de surface, dans les solides", ["I.51"], ["son"]),

    // Optique et rayonnement
    N("fermat", "optique", "Principe de Fermat", ["I.26"], ["cinematique"]),
    N("optique_geom", "optique", "Optique géométrique", ["I.27"], ["fermat"]),
    N("rayonnement", "optique", "Rayonnement électromagnétique", ["I.28"], ["oscillateur", "vecteurs"]),
    N("interferences", "optique", "Interférences et diffraction", ["I.29", "I.30"], ["rayonnement", "resonance"]),
    N("indice", "optique", "Origine de l'indice, diffusion de la lumière", ["I.31", "I.32"], ["interferences"]),
    N("polarisation", "optique", "Polarisation", ["I.33"], ["indice"]),
    N("rayonnement_relat", "optique", "Effets relativistes dans le rayonnement", ["I.34"], ["rayonnement", "espace_temps"]),
    N("vision", "optique", "Vision des couleurs et mécanismes de la vision", ["I.35", "I.36"], ["optique_geom"]),

    // Thermodynamique et physique statistique
    N("gaz_cinetique", "thermo", "Théorie cinétique des gaz", ["I.39"], ["quantite_mvt", "thermo"]),
    N("boltzmann", "thermo", "Principes de la physique statistique", ["I.40"], ["gaz_cinetique", "proba"]),
    N("brownien", "thermo", "Mouvement brownien, équipartition", ["I.41"], ["boltzmann", "oscillateur"]),
    N("cinetique_appl", "thermo", "Applications de la théorie cinétique", ["I.42"], ["brownien"]),
    N("diffusion", "thermo", "Diffusion", ["I.43"], ["boltzmann"]),
    N("thermo", "thermo", "Lois de la thermodynamique", ["I.44", "I.45"], ["energie"]),
    N("cliquet", "thermo", "Le cliquet et l'irréversibilité", ["I.46"], ["boltzmann"]),

    // Électromagnétisme
    N("em_intro", "em", "Électromagnétisme : vue d'ensemble", ["II.1"], ["forces", "vecteurs"]),
    N("electrostatique", "em", "Électrostatique et théorème de Gauss", ["II.4", "II.5"], ["em_intro", "calcul_vectoriel"]),
    N("dipoles_conducteurs", "em", "Dipôles, conducteurs, images", ["II.6"], ["electrostatique"]),
    N("methodes_champ", "em", "Méthodes de calcul du champ", ["II.7"], ["dipoles_conducteurs", "algebre", "boltzmann", "oscillateur"]),
    N("energie_electrostatique", "em", "Énergie électrostatique", ["II.8"], ["electrostatique", "travail"]),
    N("atmosphere", "em", "L'électricité dans l'atmosphère", ["II.9"], ["dipoles_conducteurs", "diffusion"]),
    N("dielectriques", "em", "Diélectriques", ["II.10", "II.11"], ["dipoles_conducteurs", "boltzmann"]),
    N("analogies", "em", "Analogies électrostatiques", ["II.12"], ["dipoles_conducteurs", "diffusion"]),
    N("magnetostatique", "em", "Magnétostatique", ["II.13", "II.14"], ["electrostatique", "relat_restreinte"]),
    N("potentiel_vecteur", "em", "Potentiel vecteur", ["II.15"], ["magnetostatique", "energie_electrostatique", "quantique_comportement"]),
    N("induction", "em", "Induction", ["II.16", "II.17"], ["magnetostatique"]),
    N("maxwell", "em", "Équations de Maxwell", ["II.18"], ["induction"]),
    N("ondes_em", "em", "Ondes électromagnétiques", ["II.20", "II.21"], ["maxwell", "son", "rayonnement"]),
    N("circuits_ac", "em", "Circuits en régime sinusoïdal", ["II.22"], ["induction", "lineaires"]),
    N("cavites", "em", "Cavités résonantes et guides d'ondes", ["II.23", "II.24"], ["circuits_ac", "ondes_em"]),
    N("energie_champ", "em", "Énergie et quantité de mouvement du champ", ["II.27"], ["maxwell", "energie_electrostatique"]),
    N("masse_em", "em", "Masse électromagnétique", ["II.28"], ["energie_champ", "relat_energie"]),
    N("mouvement_charges", "em", "Mouvement des charges dans E et B", ["II.29"], ["magnetostatique", "optique_geom"]),
    N("indice_dense", "em", "Indice des milieux denses, réflexion", ["II.32", "II.33"], ["ondes_em", "dielectriques", "indice"]),
    N("magnetisme_atomique", "em", "Magnétisme de la matière", ["II.34"], ["potentiel_vecteur", "rotation_espace"]),
    N("paramagnetisme", "em", "Paramagnétisme et résonance magnétique", ["II.35"], ["magnetisme_atomique", "boltzmann"]),
    N("ferromagnetisme", "em", "Ferromagnétisme et matériaux magnétiques", ["II.36", "II.37"], ["paramagnetisme", "induction"]),

    // Physique quantique (vol. III 1–2 = vol. I 37–38)
    N("quantique_comportement", "quant", "Comportement quantique, ondes et particules", ["I.37", "I.38", "III.1", "III.2"], ["interferences", "quantite_mvt"]),
    N("amplitudes", "quant", "Amplitudes de probabilité", ["III.3"], ["quantique_comportement"]),
    N("identiques", "quant", "Particules identiques", ["III.4"], ["amplitudes", "brownien"]),
    N("spin1", "quant", "Spin 1", ["III.5"], ["amplitudes", "rotation_espace"]),
    N("spin_demi", "quant", "Spin 1/2", ["III.6"], ["spin1"]),
    N("evolution", "quant", "Évolution temporelle des amplitudes", ["III.7"], ["spin_demi"]),
    N("hamiltonien", "quant", "Matrice hamiltonienne", ["III.8"], ["evolution"]),
    N("maser", "quant", "Le maser à ammoniac", ["III.9"], ["hamiltonien", "dipoles_conducteurs"]),
    N("deux_etats", "quant", "Systèmes à deux états", ["III.10", "III.11"], ["hamiltonien", "polarisation"]),
    N("hyperfin", "quant", "Structure hyperfine de l'hydrogène", ["III.12"], ["deux_etats"]),
    N("reseau_cristal", "quant", "Propagation dans un réseau cristallin", ["III.13"], ["deux_etats", "cristaux"]),
    N("semiconducteurs", "quant", "Semi-conducteurs", ["III.14"], ["reseau_cristal", "boltzmann", "magnetostatique"]),
    N("particules_indep", "quant", "Approximation des particules indépendantes", ["III.15"], ["reseau_cristal"]),
    N("fonction_onde", "quant", "Fonction d'onde, équation de Schrödinger", ["III.16"], ["reseau_cristal"]),
    N("sym_conservation", "quant", "Symétries et lois de conservation", ["III.17"], ["deux_etats", "symetrie"]),
    N("moment_cinetique_q", "quant", "Moment cinétique", ["III.18"], ["sym_conservation", "hyperfin"]),
    N("hydrogene", "quant", "Atome d'hydrogène et tableau périodique", ["III.19"], ["fonction_onde", "moment_cinetique_q"]),
    N("operateurs", "quant", "Opérateurs", ["III.20"], ["fonction_onde", "moment_cinetique_q"]),
    N("supraconductivite", "quant", "Schrödinger en contexte classique : supraconductivité", ["III.21"], ["operateurs", "potentiel_vecteur"]),
  ];

  // Vol. III chap. 1–2 reprennent mot pour mot le vol. I chap. 37–38 : une seule livraison.
  const ALIAS = { "III.1": "I.37", "III.2": "I.38" };
  function canon(key) {
    const [v, c, sec] = key.split("."), a = ALIAS[v + "." + c];
    return a ? a + "." + sec : key;
  }


  /* Pourquoi chaque flèche existe : "prérequis>notion" → raison, avec les sections qui la fondent. */
  const RAISONS = {
    "mesure>atomes": "I.1.2 chiffre tout en ordres de grandeur : rayon d'un atome de 10⁻¹⁰ m, grossissements successifs jusqu'à 10⁹. Il faut savoir estimer et comparer des puissances de dix.",
    "atomes>panorama": "La « physique de base » (I.2) et le lien avec la chimie et la biologie (I.3) partent de l'image atomique : tout ce que font les êtres vivants, des atomes le font.",
    "atomes>energie": "Les formes d'énergie (I.4.4) se lisent à l'échelle atomique : la chaleur est l'agitation des molécules, l'énergie chimique un réarrangement d'atomes.",
    "dynamique>vecteurs": "I.11.6 réécrit les lois de Newton de I.9 en notation vectorielle : il faut d'abord les équations par composantes.",
    "vecteurs>calcul_vectoriel": "Gradient, divergence et rotationnel (II.2) sont des opérations sur des champs de vecteurs ; le produit scalaire (I.11.7) y sert partout.",
    "rotation_espace>tenseurs": "Le tenseur d'inertie (II.31.4) explique pourquoi le moment cinétique d'un solide n'est pas parallèle à la rotation (I.20.4).",
    "dielectriques>tenseurs": "Le premier exemple de tenseur est la polarisabilité d'un cristal anisotrope (II.31.1) : il faut la polarisation P (II.10.2).",
    "travail>moindre_action": "L'action est l'intégrale de énergie cinétique moins énergie potentielle (II.19.1) : il faut l'énergie potentielle et les forces conservatives (I.14).",
    "fermat>moindre_action": "Feynman présente la moindre action comme l'analogue mécanique du principe du moindre temps de la lumière (I.26).",
    "rotation_espace>symetrie": "Vecteurs polaires et axiaux (I.52.5) : le moment d'une force et le moment cinétique sont des produits vectoriels (I.20.2), qui changent de signe autrement dans un miroir.",
    "relat_restreinte>symetrie": "La symétrie dans l'espace et le temps (I.52.2) inclut l'invariance par transformation de Lorentz (I.15.2).",
    "mesure>cinematique": "Décrire un mouvement (I.8.1), c'est des distances en fonction du temps : il faut savoir ce que l'on mesure, avec quels étalons (I.5), et vérifier qu'une vitesse a bien la dimension L·T⁻¹.",
    "cinematique>gravitation": "Les lois de Kepler (I.7.2) et la loi de Newton (I.7.4) parlent de vitesse et d'accélération vers le Soleil : notions de I.8.",
    "cinematique>dynamique": "Les lois de Newton relient force et dérivée de la quantité de mouvement (I.9.1) : il faut vitesse et accélération comme dérivées (I.8.3, I.8.5).",
    "dynamique>quantite_mvt": "La conservation de la quantité de mouvement découle de la troisième loi de Newton appliquée à F = dp/dt (I.10.1–2).",
    "dynamique>forces": "I.12 examine ce qu'est une force dans F = dp/dt (I.9.4) : frottement, forces moléculaires, forces d'inertie.",
    "forces>travail": "Le travail est l'intégrale d'une force le long du chemin (I.14.1) ; la distinction conservative / non conservative (I.14.3–4) suppose de connaître les forces.",
    "energie>travail": "I.13–14 rendent quantitative la conservation de l'énergie posée qualitativement en I.4.",
    "gravitation>travail": "Le premier exemple est l'énergie potentielle de gravitation, y compris pour un corps étendu (I.13.2, I.13.4), avec la loi de I.7.4.",
    "quantite_mvt>relat_restreinte": "La dynamique relativiste (I.15.8) garde la conservation de la quantité de mouvement en changeant p = mv ; I.10.5 l'annonce.",
    "travail>relat_restreinte": "L'équivalence masse-énergie (I.15.9) s'obtient en calculant l'énergie cinétique, donc le travail des forces.",
    "relat_restreinte>relat_energie": "I.16 tire les conséquences de la transformation de Lorentz : paradoxe des jumeaux, composition des vitesses, énergie relativiste.",
    "relat_energie>espace_temps": "La géométrie de l'espace-temps (I.17) réunit énergie et quantité de mouvement en un quadrivecteur (I.17.4).",
    "vecteurs>espace_temps": "Les quadrivecteurs généralisent les vecteurs à trois composantes et leur produit scalaire (I.11) à quatre dimensions (I.17.5).",
    "ondes_em>electro_relat": "Le quadripotentiel d'une charge en mouvement (II.25.5) vient des potentiels de Liénard-Wiechert (II.21.5).",
    "espace_temps>electro_relat": "L'électrodynamique en notation quadridimensionnelle (II.25) utilise les quadrivecteurs et l'invariant scalaire de I.17.",
    "tenseurs>electro_relat": "Les champs E et B forment un tenseur (II.26.3, II.31.8) : il faut savoir transformer les composantes d'un tenseur (II.31.2).",
    "espace_temps>relativite_generale": "La relativité générale est une géométrie de l'espace-temps courbe (II.42.4, II.42.7) : il faut d'abord l'espace-temps plat de I.17.",
    "quantite_mvt>rotation_plan": "Le centre de masse (I.18.1) se déduit de la conservation de la quantité de mouvement d'un système de particules.",
    "travail>rotation_plan": "Le travail d'un couple (I.18.2) et l'énergie cinétique de rotation (I.19.4) prolongent le théorème du travail.",
    "rotation_plan>rotation_espace": "La rotation dans l'espace (I.20) généralise moment, moment cinétique et moment d'inertie du cas plan (I.18–19).",
    "vecteurs>rotation_espace": "En trois dimensions, couple et moment cinétique s'écrivent avec le produit vectoriel (I.20.2).",
    "forces>cristaux": "Liaisons chimiques (II.30.2) et résistance des métaux (II.30.7) reposent sur les forces moléculaires (I.12.3).",
    "chim_cristallo>cristaux": "II.30 prolonge la maille, les empilements et les types de cristaux vus en cristallographie, vers les symétries (II.30.5–6) et la résistance des métaux (II.30.7).",
    "atomes>chim_structure": "La structure électronique détaille ce que I.1 pose : la matière est faite d'atomes, qui s'attirent et se lient.",
    "chim_structure>chim_liaison": "Le nombre d'électrons de valence et l'électronégativité fixent les schémas de Lewis et la polarité des liaisons.",
    "chim_liaison>chim_cristallo": "La nature de la liaison (métallique, ionique, covalente, van der Waals) décide du type de cristal.",
    "atomes>chim_transfo": "Une transformation chimique est un réarrangement d'atomes entre molécules (I.1.4) ; on compte ces atomes en moles.",
    "chim_transfo>chim_cinetique": "La cinétique décrit à quelle vitesse l'avancement évolue vers l'équilibre.",
    "boltzmann>chim_cinetique": "La loi d'Arrhenius est la loi de Boltzmann (I.40.2) appliquée à l'énergie d'activation ; Feynman le montre en I.42.4.",
    "chim_transfo>chim_acidobase": "Un équilibre acide-base est un équilibre chimique : Ka est une constante d'équilibre, comparée au quotient de réaction.",
    "chim_acidobase>chim_solubilite": "La solubilité de nombreux sels dépend du pH : il faut les diagrammes de prédominance et la réaction prépondérante.",
    "chim_transfo>chim_redox": "Un échange d'électrons entre couples est un équilibre chimique, avec sa constante et son quotient de réaction.",
    "thermo>chim_enthalpie": "La thermochimie applique le premier principe (I.44.1) au système chimique : ΔH = transfert thermique à pression constante.",
    "chim_transfo>chim_enthalpie": "Les grandeurs de réaction sont des dérivées par rapport à l'avancement.",
    "chim_enthalpie>chim_potentiel": "L'enthalpie libre G = H − TS combine l'enthalpie de réaction et l'entropie du second principe (I.44.6).",
    "chim_redox>chim_diagrammes": "Un diagramme E-pH superpose les domaines des couples redox donnés par la formule de Nernst.",
    "chim_solubilite>chim_diagrammes": "Les frontières entre espèce dissoute et solide (hydroxydes) viennent des produits de solubilité et de l'effet du pH.",
    "chim_potentiel>chim_diagrammes": "ΔrG = −nFE relie le potentiel d'électrode au potentiel chimique, et justifie la formule de Nernst.",
    "chim_liaison>chim_orga_base": "La géométrie VSEPR et la polarité des liaisons donnent la forme des molécules organiques et leurs groupes caractéristiques.",
    "chim_orga_base>chim_orga_meca": "Repérer sites nucléophiles et électrophiles demande la structure : polarité des liaisons, doublets non liants, géométrie.",
    "chim_cinetique>chim_orga_meca": "Acte élémentaire, molécularité, complexe activé et intermédiaire réactionnel sont des notions de cinétique chimique.",
    "chim_orga_meca>chim_orga_halo": "SN et E s'écrivent avec les flèches courbes et se distinguent par leurs actes élémentaires.",
    "chim_acidobase>chim_orga_halo": "Un nucléophile est souvent aussi une base : la compétition substitution / élimination se raisonne avec les pKa.",
    "chim_orga_halo>chim_orga_mg": "L'organomagnésien se prépare à partir d'un halogénoalcane ; l'insertion du magnésium inverse la polarité de la liaison carbone-halogène.",
    "chim_orga_mg>chim_orga_redox": "Oxydation des alcools et réduction des carbonyles relient les deux groupes rencontrés avec l'addition nucléophile sur les carbonyles.",
    "chim_redox>chim_orga_redox": "Le niveau d'oxydation des groupes caractéristiques applique les nombres d'oxydation et les couples redox.",
    "chim_orga_redox>chim_orga_activation": "On active les alcools et carbonyles que l'oxydoréduction interconvertit ; Williamson est une SN2, l'acétalisation une addition nucléophile sur le carbonyle.",
    "chim_orga_activation>chim_orga_strategie": "Protéger un groupe, c'est le transformer de façon réversible : l'acétalisation sert de protection du carbonyle.",
    "chim_orbitales>chim_complexes": "La structure et la réactivité des complexes s'interprètent avec les orbitales du métal et des ligands.",
    "chim_cinetique>chim_complexes": "Un cycle catalytique est un mécanisme : actes élémentaires, intermédiaires, catalyseur régénéré.",
    "chim_solubilite>chim_complexes": "La stabilité des complexes en solution reprend les constantes de formation et les diagrammes de distribution.",
    "chim_orga_strategie>chim_orga_conversion": "La deuxième année prolonge la stratégie de synthèse : nouvelles conversions, protection des groupes carboxyle, amino et hydroxyle par esters et amides.",
    "chim_orbitales>chim_orga_conversion": "Sites réactifs, régiosélectivité et géométrie d'approche des réactifs se prévoient avec les orbitales frontalières.",
    "chim_potentiel>chim_orga_conversion": "Les aspects thermodynamiques d'une transformation organique (équilibre d'estérification, déplacement d'équilibre) utilisent ΔrG° et K°.",
    "chim_orga_conversion>chim_orga_cc": "Énolates, aldolisation et réaction de Michael réutilisent les additions et conversions de groupes ; Diels-Alder se lit avec les orbitales frontalières.",
    "forces>statique_fluides": "La force de pression est une force de surface ; l'équilibre d'une particule de fluide est un bilan de forces (I.12.1).",
    "boltzmann>statique_fluides": "La pression vient des chocs moléculaires (I.39.2) ; l'atmosphère isotherme est l'atmosphère exponentielle de I.40.1.",
    "statique_fluides>fluides_parfaits": "Feynman commence l'écoulement des fluides par l'hydrostatique (II.40.1).",
    "fluides_visqueux>dyn_fluides": "Pertes de charge et couche limite viennent de la viscosité et du nombre de Reynolds (II.41.1–3) ; les bilans d'énergie en écoulement appliquent le premier principe (I.44.1) à un fluide en mouvement.",
    "travail>particule_champ": "La puissance de la force magnétique est nulle : l'énergie cinétique d'une charge dans B est constante (théorème de l'énergie cinétique, I.13–14).",
    "em_intro>particule_champ": "La force de Lorentz F = q(E + v × B) est posée en II.1.1.",
    "travail>forces_centrales": "Une force centrale ne dépendant que de r dérive d'une énergie potentielle ; l'énergie mécanique se conserve (I.14.3). La gravitation (I.7) en est le modèle.",
    "vecteurs>forces_centrales": "Le moment cinétique L = r × p est un produit vectoriel (I.11, I.20.1).",
    "oscillateur>pendule": "Aux petits angles, le pendule est un oscillateur harmonique (I.21.2) ; au-delà, la linéarisation cesse de valoir.",
    "travail>pendule": "Le portrait de phase se lit sur l'énergie mécanique conservée (I.14.3).",
    "rotation_espace>non_galileen": "La force de Coriolis −2m ω × v utilise le vecteur rotation et le produit vectoriel (I.20.2) ; Feynman en donne l'idée avec les pseudo-forces (I.12.5).",
    "thermo>changements_etat": "Changer d'état à pression constante échange de l'enthalpie ; la formule de Clapeyron est établie en I.45.3.",
    "changements_etat>machines_thermiques": "Les cycles réels (machine à vapeur, réfrigérateur) font changer d'état leur fluide de travail.",
    "diffusion>transferts_thermiques": "La conduction thermique (I.43.6) et la loi de Fourier prolongent la diffusion moléculaire.",
    "calcul_vectoriel>transferts_thermiques": "L'équation de la chaleur s'écrit avec la divergence du flux thermique (II.2.6, II.3.4).",
    "brownien>corps_noir": "L'équilibre thermique du rayonnement (I.41.2) fonde le corps noir ; la loi de Planck sort de la quantification de l'oscillateur (I.41.3).",
    "transferts_thermiques>corps_noir": "Le rayonnement est le troisième mode de transfert thermique, combiné à la conduction et à la convection dans un bilan.",
    "circuits_ac>elec_ao": "Les montages à amplificateur opérationnel se calculent en impédances complexes avec les lois de Kirchhoff (II.22.1, II.22.3).",
    "elec_ao>signal": "Filtrer et démoduler se réalisent avec les filtres et montages à amplificateur opérationnel.",
    "fourier>signal": "Le spectre d'un signal est sa décomposition de Fourier (I.50.2–4).",
    "circuits_ac>conversion_em": "Transformateur et machines s'analysent en régime sinusoïdal ; l'induction (II.16–17) fournit couples et forces électromotrices.",
    "rotation_plan>conversion_em": "Le couple sur le rotor et la puissance mécanique utilisent la dynamique de rotation (I.18.2–4).",
    "indice_dense>plasmas": "La relation de dispersion d'un plasma est le cas des électrons libres de II.32.6–7.",
    "mouvement_charges>plasmas": "Le confinement magnétique repose sur le mouvement des charges dans B (II.29.1, II.29.8).",
    "chim_potentiel>chim_binaires": "L'équilibre entre phases d'un mélange s'écrit avec l'égalité des potentiels chimiques.",
    "changements_etat>chim_binaires": "Un binaire généralise le changement d'état du corps pur : palier, variance, courbes d'analyse thermique.",
    "rotation_plan>diffusion_rutherford": "Le problème à deux corps se ramène au centre de masse (I.18.1, I.19.1) ; le moment cinétique conservé (I.18.4) fixe les constantes du mouvement.",
    "rotation_plan>contact_solides": "Roulement sans glissement et frottement de Coulomb sur un solide en rotation s'appuient sur la dynamique du solide (I.18–19) et le frottement (I.12.2).",
    "gaz_cinetique>gaz_reels": "Van der Waals corrige le gaz parfait (I.39.5) de la taille des molécules et de leur attraction, les deux écarts annoncés en I.1.2.",
    "chim_liaison>gaz_reels": "La pression interne vient des interactions de van der Waals entre molécules.",
    "gaz_reels>detentes": "Une détente de Joule ne refroidit qu'un gaz réel : elle mesure les interactions décrites par Van der Waals.",
    "statique_fluides>tension_superficielle": "La surpression dans une goutte s'écrit comme un équilibre de forces de pression.",
    "travail>tension_superficielle": "Le coefficient de tension superficielle est une énergie par unité de surface : le travail pour créer de l'interface (I.14.1).",
    "optique_geom>miroirs_spheriques": "Mêmes conditions de Gauss et relations de conjugaison que pour les lentilles (I.27.2–4), avec la réflexion à la place de la réfraction.",
    "chim_diagrammes>ellingham": "Ellingham trace ΔrG°(T) des oxydations ; l'hydrométallurgie utilise diagrammes E-pH et courbes intensité-potentiel.",
    "cristaux>defauts_cristal": "Le cristal réel s'écarte du cristal parfait ; II.30.8 traite déjà les dislocations.",
    "chim_cristallo>energie_reticulaire": "On somme les interactions sur le réseau du cristal ionique (structures NaCl, CsCl).",
    "energie_electrostatique>energie_reticulaire": "L'énergie réticulaire est l'énergie électrostatique d'un cristal ionique, calculée par Feynman en II.8.3.",
    "chim_diagrammes>chimie_industrielle": "L'électrolyse du chlorure de sodium se raisonne avec les courbes intensité-potentiel.",
    "chim_cinetique>chimie_industrielle": "La synthèse de l'ammoniac est un compromis entre thermodynamique et cinétique : catalyseur, température, pression.",
    "chim_orga_meca>aromatiques": "La substitution électrophile aromatique se fait en deux actes élémentaires, par un intermédiaire de Wheland.",
    "chim_orbitales>aromatiques": "L'aromaticité est une délocalisation des électrons π, lue sur les orbitales moléculaires du benzène.",
    "particules_indep>aromatiques": "Feynman traite le benzène en particules indépendantes (III.15.4), après le modèle à deux états (III.10.4).",
    "aromatiques>diazonium": "Les sels de diazonium viennent des amines aromatiques ; le couplage azoïque est une substitution électrophile aromatique.",
    "chim_orga_conversion>diazonium": "La nucléophilie des amines et leur alkylation prolongent les conversions de groupes azotés (amides).",
    "chim_orga_cc>synthese_complements": "Wittig, synthèse malonique et additions conjuguées complètent la création de liaisons C–C ; LiAlH₄ complète la réduction des esters.",
    "chim_orga_conversion>alcenes_alcynes": "Dihydroxylation, ozonolyse et coupures oxydantes complètent l'époxydation et l'hydrogénation des alcènes.",
    "chim_complexes>alcenes_alcynes": "L'hydrogénation catalytique et la dihydroxylation à l'osmium passent par des complexes métalliques.",
    "chim_orga_meca>polymeres": "Amorçage, propagation, terminaison : une polymérisation en chaîne est un mécanisme radicalaire ou anionique, avec sa loi de vitesse.",
    "hydrogene>chim_orbitales": "La méthode CLOA combine les orbitales atomiques de l'hydrogène (III.19.5) ; l'ion H₂⁺ en est le modèle à deux états (III.10.1). Elle réussit là où les schémas de Lewis échouent : le dioxygène paramagnétique.",
    "chim_orga_base>chim_spectro": "On lit un spectre UV-visible (ultraviolet-visible), IR (infrarouge) ou RMN en termes de groupes caractéristiques et d'environnement des protons. Une bande IR est la fréquence propre d'une liaison vue comme un oscillateur harmonique (I.21.2).",
    "paramagnetisme>chim_spectro": "La RMN est la résonance magnétique nucléaire de II.35.6, appliquée aux protons d'une molécule ; l'ultraviolet et l'infrarouge sondent, eux, les électrons et les vibrations.",
    "tenseurs>elasticite": "Déformation et élasticité sont des tenseurs (II.39.1–2) ; même la loi de Hooke en 3D (II.38.2) en a besoin.",
    "calcul_vectoriel>fluides_parfaits": "Les équations du mouvement d'un fluide (II.40.2) s'écrivent avec gradient, divergence et rotationnel ; la circulation (II.40.4) avec le théorème de Stokes (II.3.6).",
    "travail>fluides_parfaits": "Le théorème de Bernoulli (II.40.3) est la conservation de l'énergie le long d'une ligne de courant.",
    "fluides_parfaits>fluides_visqueux": "L'eau « mouillée » (II.41) ajoute la viscosité aux équations de l'eau « sèche » (II.40.2).",
    "dynamique>oscillateur": "L'oscillateur harmonique (I.21.2) est la loi de Newton avec une force de rappel F = −kx.",
    "oscillateur>resonance": "La résonance (I.23) est la réponse forcée de l'oscillateur de I.21.5, avec amortissement.",
    "algebre>resonance": "I.23.1 traite l'oscillateur avec des exponentielles complexes : il faut les nombres complexes et e^(iθ) (I.22.5–6).",
    "resonance>lineaires": "I.25 généralise : superposition des solutions (I.25.2), analogies électriques et impédances (I.25.4–5) construites en I.23–24.",
    "oscillateur>son": "Chaque tranche d'air oscille autour de sa position d'équilibre ; l'équation d'onde (I.47.3) relie ces oscillateurs.",
    "gaz_cinetique>son": "La vitesse du son (I.47.5) dépend de la compressibilité du gaz, donc de P = nk_BT et de γ (I.39.4–5).",
    "son>battements": "Les battements (I.48.1) superposent deux ondes de I.47.",
    "resonance>battements": "L'addition de deux ondes se fait avec des exponentielles complexes, comme en I.23.1.",
    "battements>modes": "Les modes propres (I.49) prolongent les modes normaux introduits en I.48.7.",
    "lineaires>modes": "Les modes n'ont de sens que pour un système linéaire (I.49.5) : superposition de I.25.2.",
    "modes>fourier": "La série de Fourier (I.50.2) décompose un son en modes harmoniques d'une corde (I.49.2).",
    "son>ondes_diverses": "Ondes d'étrave et ondes de choc (I.51.1–2) sont des ondes sonores dont la source va plus vite que le son.",
    "cinematique>fermat": "Le temps de parcours est distance sur vitesse ; le minimiser (I.26.3) utilise la dérivée de I.8.3.",
    "fermat>optique_geom": "Distance focale d'un dioptre et d'une lentille (I.27.2–3) se déduisent du principe du moindre temps.",
    "oscillateur>rayonnement": "La source élémentaire est le dipôle oscillant (I.28.3) : une charge en mouvement harmonique.",
    "vecteurs>rayonnement": "Le champ rayonné (I.28.2) s'écrit avec le vecteur unitaire vers la position retardée de la charge : c'est un champ de vecteurs.",
    "rayonnement>interferences": "Les interférences (I.29.4) superposent les champs de deux dipôles rayonnants de I.28.",
    "resonance>interferences": "La « mathématique des interférences » (I.29.5) additionne des amplitudes complexes, outil de I.23.1.",
    "interferences>indice": "L'indice (I.31.1) vient de la superposition de l'onde incidente et du champ d'un plan de charges oscillantes (I.30.7).",
    "indice>polarisation": "Biréfringence (I.33.3) = indice différent selon la direction ; polarisation de la lumière diffusée (I.33.2) prolonge I.32.5.",
    "rayonnement>rayonnement_relat": "I.34 reprend la formule du champ rayonné de I.28 pour une source rapide.",
    "espace_temps>rayonnement_relat": "Effet Doppler et aberration (I.34.6–8) se traitent avec le quadrivecteur (ω, k) de l'espace-temps.",
    "optique_geom>vision": "L'œil est un système optique (I.35.1, I.36.2) : lentille, image, ouverture.",
    "quantite_mvt>gaz_cinetique": "La pression est la quantité de mouvement transférée à la paroi par unité de temps et de surface (I.39.2).",
    "thermo>gaz_cinetique": "La théorie cinétique explique le cadre thermodynamique : compression adiabatique où chaleur et travail se distinguent (I.39.2–3), température cinétique (I.39.4) identifiée à la température thermodynamique (I.44.5).",
    "gaz_cinetique>boltzmann": "L'atmosphère exponentielle (I.40.1) applique la loi des gaz parfaits à une colonne d'air dans la pesanteur.",
    "proba>boltzmann": "La loi de Boltzmann (I.40.2) et la distribution des vitesses (I.40.4) sont des distributions de probabilité (I.6.4).",
    "boltzmann>brownien": "L'équipartition (I.41.1) découle de la loi de Boltzmann.",
    "oscillateur>brownien": "I.41.1 et I.41.3 appliquent l'équipartition puis la quantification à l'oscillateur harmonique.",
    "brownien>cinetique_appl": "Les lois du rayonnement d'Einstein (I.42.5) partent de l'équilibre thermique du rayonnement (I.41.2).",
    "boltzmann>diffusion": "Vitesse de dérive et mobilité (I.43.3) font intervenir k_BT et la distribution des vitesses de I.40.",
    "energie>thermo": "Le premier principe (I.44.1) étend la conservation de l'énergie de I.4 à la chaleur ; l'argument des machines réversibles (I.44.3) est celui des machines à soulever des poids (I.4.2).",
    "boltzmann>cliquet": "Le cliquet (I.46.2) est une machine thermique qu'on confronte au second principe (I.44.2) ; la probabilité qu'un choc le soulève est en exp(−ε/k_BT) (I.46.1), loi de I.40.2.",
    "forces>em_intro": "L'électromagnétisme commence par les forces électriques et la notion de champ (II.1.1–2), introduite en I.12.4.",
    "vecteurs>em_intro": "E et B sont des champs de vecteurs ; II.1.3 caractérise un champ par flux et circulation.",
    "em_intro>electrostatique": "L'électrostatique est le cas des équations de Maxwell (II.1.4) où rien ne dépend du temps (II.4.1).",
    "calcul_vectoriel>electrostatique": "Théorème de Gauss et E = −∇φ (II.4.4–6) utilisent gradient, flux et divergence (II.2–3).",
    "electrostatique>dipoles_conducteurs": "Dipôles, conducteurs et images (II.6) résolvent l'équation du potentiel de II.4–5 dans des cas types.",
    "dipoles_conducteurs>methodes_champ": "II.7 poursuit II.6 avec d'autres méthodes de calcul du champ.",
    "algebre>methodes_champ": "Les champs plans (II.7.2) se calculent avec les fonctions d'une variable complexe.",
    "boltzmann>methodes_champ": "Autour d'une particule colloïdale (II.7.4), les ions se répartissent selon la loi de Boltzmann.",
    "oscillateur>methodes_champ": "Les oscillations de plasma (II.7.3) sont un oscillateur harmonique collectif des électrons.",
    "electrostatique>energie_electrostatique": "L'énergie électrostatique (II.8) se calcule avec le potentiel et le théorème de Gauss.",
    "travail>energie_electrostatique": "Énergie d'un système de charges = travail pour l'assembler (II.8.1), au sens de I.14.",
    "dipoles_conducteurs>atmosphere": "La Terre et l'ionosphère se traitent comme des conducteurs (II.9.1).",
    "diffusion>atmosphere": "Les courants dans l'air (II.9.2) dépendent de la mobilité des ions et de la conductivité ionique (I.43.3–4).",
    "dipoles_conducteurs>dielectriques": "Un diélectrique se comprend dans un condensateur (II.10.1) et comme un ensemble de dipôles moléculaires (II.11.1).",
    "boltzmann>dielectriques": "La polarisation d'orientation (II.11.3) est la moyenne de μ cos θ pondérée par la loi de Boltzmann.",
    "dipoles_conducteurs>analogies": "Les analogues (II.12) reprennent des solutions déjà connues, dont la méthode des images (II.6.7).",
    "diffusion>analogies": "Diffusion des neutrons et flux de chaleur (II.12.2, II.12.4) supposent la diffusion moléculaire et la conduction (I.43.5–6).",
    "electrostatique>magnetostatique": "La magnétostatique (II.13) suit le même plan que l'électrostatique : sources, champ, théorème d'Ampère au lieu de Gauss.",
    "relat_restreinte>magnetostatique": "II.13.6 montre que le champ magnétique est l'effet relativiste d'un champ électrique vu d'un autre référentiel.",
    "magnetostatique>potentiel_vecteur": "Le potentiel vecteur (II.14–15) est défini par B = ∇ × A.",
    "energie_electrostatique>potentiel_vecteur": "L'énergie des courants permanents (II.15.2–3) se construit comme l'énergie électrostatique de II.8.",
    "quantique_comportement>potentiel_vecteur": "II.15.5 montre que A agit sur la phase d'un électron (fentes d'Young autour d'un solénoïde) : il faut les amplitudes de I.37.",
    "magnetostatique>induction": "L'induction (II.16–17) est ce qui change quand les champs magnétiques de II.13 varient dans le temps.",
    "induction>maxwell": "Les équations de Maxwell (II.18.1) ajoutent le courant de déplacement aux lois d'induction et d'Ampère.",
    "maxwell>ondes_em": "Les ondes électromagnétiques (II.20) sont les solutions des équations de Maxwell dans le vide.",
    "son>ondes_em": "On résout la même équation d'onde (I.47.3–4), cette fois pour E et B.",
    "rayonnement>ondes_em": "II.21 démontre la formule du champ rayonné utilisée sans preuve en I.28.",
    "induction>circuits_ac": "Inductance et générateurs (II.22.1–2) viennent de l'induction (II.17.5–7).",
    "lineaires>circuits_ac": "Les impédances complexes en série et en parallèle (II.22.1) ont été posées en I.25.5.",
    "circuits_ac>cavites": "II.23.1–2 montrent comment un circuit LC devient une cavité quand la fréquence monte.",
    "ondes_em>cavites": "Cavités et guides (II.23–24) confinent les ondes électromagnétiques de II.20.",
    "maxwell>energie_champ": "Le vecteur de Poynting (II.27.3) se déduit des équations de Maxwell.",
    "energie_electrostatique>energie_champ": "La densité d'énergie ε₀E²/2 (II.8.5) en est le cas statique.",
    "energie_champ>masse_em": "La masse électromagnétique (II.28.3) vient de la quantité de mouvement du champ d'une charge en mouvement (II.27.6).",
    "relat_energie>masse_em": "On compare l'énergie du champ à mc² (I.16.5) : c'est là que les 4/3 posent problème.",
    "magnetostatique>mouvement_charges": "Le mouvement dans B uniforme (II.29.1) utilise la force magnétique sur une charge (II.13.3).",
    "optique_geom>mouvement_charges": "Lentilles électrostatique et magnétique, microscope électronique (II.29.3–5) reprennent focale et grandissement de I.27.",
    "ondes_em>indice_dense": "II.32.2–3 résolvent les équations de Maxwell dans un milieu.",
    "dielectriques>indice_dense": "Dans un milieu dense, le champ local (Clausius-Mossotti, II.11.5) corrige l'indice.",
    "indice>indice_dense": "II.32 refait pour les milieux denses le calcul de l'indice de I.31.",
    "potentiel_vecteur>magnetisme_atomique": "L'énergie d'un dipôle magnétique dans B (II.15.1) est la base du magnétisme atomique.",
    "rotation_espace>magnetisme_atomique": "La précession des aimants atomiques (II.34.3) est celle du gyroscope (I.20.3).",
    "magnetisme_atomique>paramagnetisme": "II.35 quantifie les moments magnétiques de II.34.7.",
    "boltzmann>paramagnetisme": "L'aimantation d'un matériau paramagnétique (II.35.4) est une moyenne de Boltzmann en μB/k_BT.",
    "paramagnetisme>ferromagnetisme": "L'aimantation spontanée (II.36.6) est un paramagnétisme où les moments s'alignent mutuellement ; sa thermodynamique (II.37.2) prolonge celle du paramagnétisme (II.35.5).",
    "induction>ferromagnetisme": "Inductances à noyau de fer et électroaimants (II.36.4–5) sont des circuits d'induction.",
    "interferences>quantique_comportement": "L'expérience avec des ondes (I.37.3) sert de référence : intensité = carré de la somme des amplitudes.",
    "quantite_mvt>quantique_comportement": "La relation p = h/λ et la mesure de la quantité de mouvement (I.38.2) supposent p bien compris.",
    "quantique_comportement>amplitudes": "III.3 formalise les règles de combinaison des amplitudes observées en I.37.",
    "amplitudes>identiques": "Bosons et fermions (III.4.1) diffèrent par le signe de l'amplitude d'échange (III.3.4).",
    "brownien>identiques": "Le spectre du corps noir (III.4.5) revient sur l'équilibre du rayonnement de I.41.2, vu avec des bosons.",
    "amplitudes>spin1": "Le formalisme des états de base (III.5.4) est la règle de combinaison des amplitudes appliquée à des filtres.",
    "rotation_espace>spin1": "Le spin est un moment cinétique : faire tourner l'appareil de Stern-Gerlach (III.5.7) change de base comme on change d'axes en 3D.",
    "spin1>spin_demi": "III.6 refait pour le spin 1/2 les transformations de base faites pour le spin 1.",
    "spin_demi>evolution": "La précession d'un spin 1/2 (III.7.5) est le premier exemple d'évolution temporelle.",
    "evolution>hamiltonien": "La matrice hamiltonienne (III.8.5) généralise la dépendance en exp(−iEt/ħ) des états stationnaires (III.7.1).",
    "hamiltonien>maser": "Le maser est un système à deux états décrit par une matrice hamiltonienne 2 × 2 (III.8.6, III.9.1).",
    "dipoles_conducteurs>maser": "Dans un champ électrique, l'énergie de la molécule dépend de son dipôle (III.9.2), énergie μE de II.6.2.",
    "hamiltonien>deux_etats": "Les systèmes à deux états (III.10–11) sont des hamiltoniens 2 × 2.",
    "polarisation>deux_etats": "Les états de polarisation du photon (III.11.4) sont un système à deux états : il faut la polarisation de I.33.",
    "deux_etats>hyperfin": "La structure hyperfine (III.12) combine deux spins 1/2 avec les matrices de Pauli (III.11.1).",
    "deux_etats>reseau_cristal": "Un électron dans un réseau (III.13.1) est un système à N états, généralisation de III.11.6.",
    "cristaux>reseau_cristal": "On utilise la géométrie des réseaux cristallins (II.30.4).",
    "reseau_cristal>semiconducteurs": "Électrons et trous (III.14.1) sont des états de propagation dans le réseau de III.13.",
    "boltzmann>semiconducteurs": "La densité de porteurs varie en exp(−E/k_BT) (III.14.1–2).",
    "magnetostatique>semiconducteurs": "L'effet Hall (III.14.3) vient de la force magnétique sur les porteurs en mouvement (II.13.3).",
    "reseau_cristal>particules_indep": "Les ondes de spin (III.15.1) se propagent sur un réseau comme l'électron de III.13.",
    "reseau_cristal>fonction_onde": "Feynman obtient l'équation de Schrödinger (III.16.5) comme limite continue du réseau de III.13.",
    "deux_etats>sym_conservation": "III.17 relie symétries et conservation avec des opérateurs agissant sur des états de base, outillage de III.10–11.",
    "symetrie>sym_conservation": "C'est la version quantique de I.52.3 : symétrie et lois de conservation, parité.",
    "sym_conservation>moment_cinetique_q": "Le moment cinétique (III.18) est la quantité conservée associée à la symétrie de rotation (III.17.3).",
    "hyperfin>moment_cinetique_q": "La composition des moments cinétiques (III.18.6) généralise l'addition de deux spins 1/2 de III.12.",
    "fonction_onde>hydrogene": "L'atome d'hydrogène (III.19.1) résout l'équation de Schrödinger en trois dimensions.",
    "moment_cinetique_q>hydrogene": "La dépendance angulaire des états (III.19.3) est classée par le moment cinétique (III.18).",
    "fonction_onde>operateurs": "Opérateurs position et impulsion (III.20.4–5) agissent sur la fonction d'onde.",
    "moment_cinetique_q>operateurs": "III.20.6 écrit l'opérateur moment cinétique.",
    "operateurs>supraconductivite": "Les « deux sortes d'impulsion » (III.21.3) demandent l'opérateur impulsion (III.20.5).",
    "potentiel_vecteur>supraconductivite": "L'équation de Schrödinger dans un champ magnétique (III.21.1) fait intervenir A, et la quantification du flux (III.21.7) en découle.",
  };

  // Programmes des écoles d'ingénieurs (générés depuis corpus/ingenieur-*.json par build-ingenieur.js)
  const ING = typeof module !== "undefined" && module.exports ? (() => { try { return require("./ingenieur-data.js"); } catch (e) { return null; } })() : root.INGENIEUR;
  if (ING) { ING.nodes.forEach(n => NOEUDS.push(Object.assign({}, n, { prereq: n.prereq.slice() }))); Object.assign(RAISONS, ING.raisons); }

  /* ---- pure functions ---- */

  // what a node delivers, in order: lessons from other sources first, then Feynman Lectures sections (duplicates merged)
  function slicesOf(node, sections) {
    const title = new Map(sections.map(s => [s.key, s.title])), seen = new Set(), out = node.extras.map(e => ({ key: e.key, titre: e.titre, origine: node.source ? "ecoles" : "cpge" }));
    sectionsOf(node, sections).map(canon).forEach(k => { if (!seen.has(k)) { seen.add(k); out.push({ key: k, titre: title.get(k), origine: "feynman" }); } });
    return out;
  }

  // "VOL|CH|SEC|title" lines → [{key:"I.1.1", vol, ch, sec, title}] in book order
  function parseSections(text) {
    return text.split("\n").filter(l => l && l[0] !== "#").map(l => l.split("|"))
      .filter(p => p[1] !== "C").map(([vol, ch, sec, title]) => ({ key: `${vol}.${+ch}.${+sec}`, vol, ch: +ch, sec: +sec, title }));
  }

  // expand one spec against the section list → keys
  function expand(spec, sections) {
    const m = /^(I{1,3})\.(\d+)(?:\.(\d+)(?:-(\d+))?)?$/.exec(spec);
    if (!m) throw new Error("graph: bad spec " + spec);
    const [, vol, ch, a, b] = m;
    const lo = a ? +a : 1, hi = b ? +b : a ? +a : Infinity;
    const keys = sections.filter(s => s.vol === vol && s.ch === +ch && s.sec >= lo && s.sec <= hi).map(s => s.key);
    if (!keys.length) throw new Error("graph: spec " + spec + " matches no section");
    if (b && keys.length !== hi - lo + 1) throw new Error("graph: spec " + spec + " runs past the chapter");
    return keys;
  }

  function sectionsOf(node, sections) { return node.couvre.flatMap(s => expand(s, sections)); }

  // every section covered exactly once → {missing:[], twice:[]}
  function coverage(nodes, sections) {
    const count = new Map(sections.map(s => [s.key, 0]));
    nodes.forEach(n => sectionsOf(n, sections).forEach(k => count.set(k, count.get(k) + 1)));
    return { missing: [...count].filter(([, c]) => c === 0).map(([k]) => k), twice: [...count].filter(([, c]) => c > 1).map(([k]) => k) };
  }

  function check(nodes) {
    const ids = new Set();
    nodes.forEach(n => {
      if (ids.has(n.id)) throw new Error("graph: duplicate id " + n.id);
      ids.add(n.id);
      if (!PISTES[n.piste]) throw new Error("graph: unknown piste " + n.piste + " on " + n.id);
      if (!n.couvre.length && !n.extras.length) throw new Error("graph: " + n.id + " delivers nothing");
      if (n.historique && (!n.historique.source || !n.historique.periodes.length || !n.historique.periodes.every(p => /^(19|20)\d\d–(19|20)\d\d$/.test(p)))) throw new Error("graph: bad historique on " + n.id);
      n.extras.forEach(e => { if (!e.key.startsWith("X." + n.id + ".") || !e.titre) throw new Error("graph: bad extra " + e.key + " on " + n.id); });
    });
    nodes.forEach(n => n.prereq.forEach(p => {
      if (p === n.id) throw new Error("graph: self-loop on " + n.id);
      if (!ids.has(p)) throw new Error("graph: " + n.id + " needs unknown " + p);
    }));
    return true;
  }

  // Kahn topological order; throws on a cycle
  function topo(nodes) {
    const indeg = new Map(nodes.map(n => [n.id, n.prereq.length]));
    const out = new Map(nodes.map(n => [n.id, []]));
    nodes.forEach(n => n.prereq.forEach(p => { if (!out.has(p)) throw new Error("graph: " + n.id + " needs unknown " + p); out.get(p).push(n.id); }));
    const q = nodes.filter(n => !n.prereq.length).map(n => n.id), order = [];
    while (q.length) { const id = q.shift(); order.push(id); out.get(id).forEach(c => { indeg.set(c, indeg.get(c) - 1); if (!indeg.get(c)) q.push(c); }); }
    if (order.length !== nodes.length) throw new Error("graph: cycle among " + nodes.filter(n => !order.includes(n.id)).map(n => n.id).join(", "));
    return order;
  }

  function ancestors(nodes) { // id → Set of all transitive prerequisites
    const by = new Map(nodes.map(n => [n.id, n])), memo = new Map();
    const go = id => {
      if (memo.has(id)) return memo.get(id);
      const s = new Set();
      by.get(id).prereq.forEach(p => { s.add(p); go(p).forEach(x => s.add(x)); });
      memo.set(id, s); return s;
    };
    topo(nodes).forEach(go);
    return memo;
  }

  // edges p→n that are implied by another path
  function redundantEdges(nodes) {
    const anc = ancestors(nodes), out = [];
    nodes.forEach(n => n.prereq.forEach(p => {
      if (n.prereq.some(q => q !== p && anc.get(q).has(p))) out.push(p + "→" + n.id);
    }));
    return out;
  }

  // depth = longest prerequisite chain
  function layers(nodes) {
    const by = new Map(nodes.map(n => [n.id, n])), d = new Map();
    topo(nodes).forEach(id => d.set(id, Math.max(0, ...by.get(id).prereq.map(p => d.get(p) + 1))));
    return d;
  }

  // soft unlocking: a node is open when all its prerequisites have been delivered
  function state(nodes, sections, delivered) {
    const done = new Set(delivered.map(canon)), out = new Map();
    nodes.forEach(n => {
      const keys = slicesOf(n, sections).map(x => x.key), seen = keys.filter(k => done.has(k)).length;
      const complete = seen === keys.length;
      out.set(n.id, { total: keys.length, seen, complete });
    });
    nodes.forEach(n => {
      const s = out.get(n.id);
      s.status = s.complete ? "fait" : n.prereq.every(p => out.get(p).complete) ? (s.seen ? "en_cours" : "ouvert") : "verrouille";
    });
    return out;
  }

  // progress toward the goal: every slice of every node delivered. Each slice counts once; unknown keys count for nothing.
  function progres(nodes, sections, delivered) {
    const keys = new Set(nodes.flatMap(n => slicesOf(n, sections).map(x => x.key)));
    const seen = new Set(delivered.map(canon).filter(k => keys.has(k))).size;
    return { seen, total: keys.size };
  }

  // next slice of a node: first undelivered section in book order
  function nextSlice(node, sections, delivered) {
    const done = new Set(delivered.map(canon));
    return slicesOf(node, sections).map(x => x.key).find(k => !done.has(k)) || null;
  }


  /* Radial propagation: the lessons that spread outward from one notion, ring by ring.
     Ring = longest chain from the start among its descendants, so a prerequisite reached from the start
     always comes first. Inside a ring: track order, then title. A notion is finished before the next one
     starts. Delivered slices are skipped. Prerequisites outside the start's descendants do not block (soft unlocking).
     → [{noeud, key, titre, anneau}] */
  function radial(nodes, sections, start, delivered, count) {
    const by = new Map(nodes.map(n => [n.id, n]));
    if (!by.has(start)) throw new Error("radial: notion inconnue " + start);
    const anc = ancestors(nodes), reach = nodes.filter(n => n.id === start || anc.get(n.id).has(start));
    const ring = new Map();
    topo(reach.map(n => Object.assign({}, n, { prereq: n.prereq.filter(p => p === start || reach.some(r => r.id === p)) })))
      .forEach(id => ring.set(id, id === start ? 0 : Math.max(...by.get(id).prereq.filter(p => ring.has(p)).map(p => ring.get(p) + 1))));
    const rank = k => { const i = ORDRE.indexOf(k); return i < 0 ? ORDRE.length : i; };
    const order = reach.slice().sort((a, b) => ring.get(a.id) - ring.get(b.id) || rank(a.piste) - rank(b.piste) || String(a.titre).localeCompare(String(b.titre), "fr"));
    const done = new Set(delivered.map(canon)), out = [];
    for (const n of order) for (const x of slicesOf(n, sections)) {
      if (done.has(x.key)) continue;
      if (out.length >= (count == null ? Infinity : count)) return out;
      out.push({ noeud: n.id, key: x.key, titre: x.titre, anneau: ring.get(n.id) });
    }
    return out;
  }

  // every edge has a reason, every reason is an edge → [] when consistent
  function reasonGaps(nodes, raisons) {
    const edges = new Set(nodes.flatMap(n => n.prereq.map(p => p + ">" + n.id))), out = [];
    edges.forEach(e => { if (!raisons[e] || !raisons[e].trim()) out.push("sans raison : " + e); });
    Object.keys(raisons).forEach(k => { if (!edges.has(k)) out.push("raison sans flèche : " + k); });
    return out;
  }

  /* Imported notions often list a prerequisite that another of their prerequisites already implies.
     Drop that edge and keep its reason, folded into the direct edge that carries the dependency. */
  function pruneRedundant(nodes, raisons, only) {
    const anc = ancestors(nodes), byId = new Map(nodes.map(n => [n.id, n])), out = [];
    nodes.filter(only).forEach(n => {
      const drop = n.prereq.filter(p => n.prereq.some(q => q !== p && anc.get(q).has(p)));
      drop.forEach(p => {
        const via = n.prereq.find(q => q !== p && !drop.includes(q) && anc.get(q).has(p)) || n.prereq.find(q => q !== p && anc.get(q).has(p));
        const why = raisons[p + ">" + n.id];
        if (why) raisons[via + ">" + n.id] = (raisons[via + ">" + n.id] || "") + " En amont, « " + byId.get(p).titre + " » : " + why;
        delete raisons[p + ">" + n.id]; out.push(p + "→" + n.id);
      });
      n.prereq = n.prereq.filter(p => !drop.includes(p));
    });
    return out;
  }

  function descendants(nodes) { // id → number of notions that depend on it, directly or not
    const anc = ancestors(nodes), out = new Map(nodes.map(n => [n.id, 0]));
    anc.forEach(set => set.forEach(a => out.set(a, out.get(a) + 1)));
    return out;
  }


  // label lines for a node title (map rendering and collision checks share it)
  function wrapTitle(s, max, maxLines) {
    const lines = [""];
    s.split(" ").forEach(w => { const cur = lines[lines.length - 1]; if ((cur + " " + w).trim().length > max && cur) lines.push(w); else lines[lines.length - 1] = (cur + " " + w).trim(); });
    if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,1}$/, "…"); }
    return lines;
  }


  if (ING) pruneRedundant(NOEUDS, RAISONS, n => !!n.source);


  /* Sector layout: each track owns a slice of the circle (sized by its number of notions, related tracks side by side);
     ring = dependency depth, each ring wide enough for its most crowded slice; inside a slice, a ring's notions are spread
     evenly, ordered by where their prerequisites sit. The main root sits at the centre. */
  const ORDRE = ["fond", "thermo", "energie_procedes", "chim", "quant", "relat", "em", "elec_auto", "optique", "ondes", "meca", "solide", "fluides", "meca_ing", "genie_civil"];
  function sectors(nodes, opt) {
    const o = Object.assign({ r0: 150, dr: 120, minArc: 160, center: "mesure", gap: 0.04 }, opt);
    const depth = layers(nodes), by = new Map(nodes.map(n => [n.id, n]));
    const lanes = ORDRE.filter(k => nodes.some(n => n.piste === k && n.id !== o.center)).concat(Object.keys(PISTES).filter(k => !ORDRE.includes(k) && nodes.some(n => n.piste === k)));
    const count = new Map(lanes.map(k => [k, nodes.filter(n => n.piste === k && n.id !== o.center).length]));
    const total = [...count.values()].reduce((a, b) => a + b, 0), free = 2 * Math.PI - o.gap * lanes.length;
    const sector = new Map(); let a = -Math.PI / 2;
    lanes.forEach(k => { const w = free * count.get(k) / total; sector.set(k, [a, a + w]); a += w + o.gap; });
    const pos = new Map(), parent = new Map();
    pos.set(o.center, { x: 0, y: 0, r: 0, a: 0 });
    const maxD = Math.max(...depth.values()); let prevR = 0;
    for (let d = 0; d <= maxD; d++) {
      // a ring is as large as its most crowded sector needs: k notions × minArc must fit in the sector's arc
      const need = Math.max(0, ...lanes.map(k => { const kk = nodes.filter(n => n.piste === k && n.id !== o.center && depth.get(n.id) === d).length; const [a0, a1] = sector.get(k); return kk * o.minArc / (a1 - a0); }));
      const r = Math.max(o.r0 + d * o.dr, prevR + o.dr, need); prevR = r;
      lanes.forEach(k => {
        const ids = nodes.filter(n => n.piste === k && n.id !== o.center && depth.get(n.id) === d).map(n => n.id);
        if (!ids.length) return;
        const [a0, a1] = sector.get(k), mid = (a0 + a1) / 2;
        const pref = id => { const ps = by.get(id).prereq.filter(p => pos.has(p) && pos.get(p).r > 0 && by.get(p).piste === k); return ps.length ? ps.reduce((s, p) => s + pos.get(p).a, 0) / ps.length : mid; };
        ids.sort((x, y) => pref(x) - pref(y) || x.localeCompare(y));
        const step = (a1 - a0) / ids.length;
        ids.forEach((id, i) => { const ang = a0 + (i + 0.5) * step; pos.set(id, { x: r * Math.cos(ang), y: r * Math.sin(ang), r, a: ang }); });
      });
    }
    nodes.forEach(n => {
      const cand = n.prereq.slice().sort((p, q) => depth.get(q) - depth.get(p));
      parent.set(n.id, cand.find(p => by.get(p).piste === n.piste) || "");   // main line stays inside the track
    });
    return { pos, parent, sector, radius: Math.max(...[...pos.values()].map(p => p.r)) };
  }

  const api = { sectors, pruneRedundant, wrapTitle, slicesOf, descendants, RAISONS, reasonGaps, PISTES, NOEUDS, ALIAS, canon, parseSections, expand, sectionsOf, coverage, check, topo, ancestors, redundantEdges, layers, state, progres, nextSlice, radial };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Graphe = api;
})(typeof self !== "undefined" ? self : this);

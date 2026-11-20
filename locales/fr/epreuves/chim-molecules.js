/* Épreuve de l'étape « Molécules et interactions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      nitrate: { prompt: "L'ion nitrate NO₃⁻ compte 24 électrons de valence. Dans un schéma de Lewis où chaque atome a son octet, quelles charges formelles porte-t-il ?",
        options: { a: "N : 0 ; chaque O : \u22121/3.", b: "N : \u22121 ; les trois O : 0.", c: "N : +1 ; l'O doublement lié : 0 ; les deux autres O : \u22121.", d: "Aucune : un octet complet interdit toute charge formelle." },
        hint: "q = v \u2212 2 d_nl \u2212 Σ o, atome par atome.",
        why: "L'azote a quatre liaisons (une double, deux simples) et aucun doublet non liant : 5 \u2212 0 \u2212 4 = +1. Un O doublement lié avec deux doublets : 6 \u2212 4 \u2212 2 = 0. Un O simplement lié avec trois doublets : 6 \u2212 6 \u2212 1 = \u22121. Somme : \u22121, la charge de l'ion. Une charge formelle est toujours entière ; \u22121/3 serait une moyenne sur trois formes mésomères. Leçon « Schémas de Lewis et mésomérie »." },
      mesomerie: { prompt: "Dans l'ion carbonate, les trois liaisons C–O ont la même longueur, comprise entre celle d'une liaison simple et celle d'une double. Qu'en conclure ?",
        options: { a: "Les électrons sont délocalisés : l'ion est l'hybride de trois formes mésomères, d'ordre moyen 4/3 par liaison.", b: "L'ion passe très vite d'une forme à l'autre, et la mesure fait la moyenne.", c: "Les trois liaisons sont doubles, et le carbone dépasse l'octet.", d: "Le schéma de Lewis de l'ion carbonate est impossible." },
        why: "Trois formes équivalentes, une double liaison et deux simples chacune : la moyenne vaut (2 + 1 + 1)/3 = 4/3. Ce n'est pas un équilibre entre formes : la molécule réelle est la même à chaque instant. La mesure des longueurs est la preuve expérimentale de la délocalisation. Leçon « Schémas de Lewis et mésomérie »." },
      forme: { prompt: "CO₂ et SO₂ ont tous deux deux liaisons doubles. Pourquoi CO₂ est-elle linéaire et SO₂ coudée ?",
        options: { a: "Le soufre est plus gros que le carbone.", b: "Les doubles liaisons S=O se repoussent davantage.", c: "SO₂ est un ion.", d: "Le soufre garde un doublet non liant : SO₂ est un AX₂E, de figure triangulaire, donc coudée ; le carbone de CO₂ n'en a pas : AX₂, linéaire." },
        hint: "Comptez les doublets non liants de l'atome central.",
        why: "Dans la méthode VSEPR, une liaison multiple compte pour un seul domaine. CO₂ : deux domaines, droite. SO₂ : deux liaisons et un doublet, trois domaines, triangle ; la forme ne regarde que les atomes : coudée, 119,5°. Conséquence : CO₂ est apolaire, SO₂ polaire (1,63 D). Leçon « Géométrie VSEPR et polarité »." },
      polarite: { prompt: "Laquelle de ces molécules, dont toutes les liaisons sont polarisées, a un moment dipolaire nul ?",
        options: { a: "Le dichlorométhane CH₂Cl₂.", b: "Le tétrachlorométhane CCl₄.", c: "L'ammoniac NH₃.", d: "L'eau H₂O." },
        why: "Quatre moments C–Cl égaux, aux sommets du tétraèdre régulier que prévoit la méthode VSEPR : leur somme est nulle par symétrie. Dans CH₂Cl₂, deux liaisons différentes rompent cette symétrie (1,62 D). NH₃ et H₂O ont des doublets non liants et une forme pyramidale ou coudée. Leçon « Géométrie VSEPR et polarité »." },
      ebullition: { prompt: "Rangez par température d'ébullition croissante : H₂O, H₂S, H₂Se.",
        options: { a: "H₂O < H₂S < H₂Se : par masse molaire croissante.", b: "H₂Se < H₂S < H₂O : par polarité croissante.", c: "H₂S < H₂Se < H₂O : la polarisabilité range H₂S et H₂Se, la liaison hydrogène met l'eau loin devant.", d: "Les trois bouillent à la même température : même forme coudée." },
        why: "Mesuré : 212,9 K, 231,9 K, 373,1 K. De H₂S à H₂Se, le nuage grossit et la dispersion augmente. L'eau, la plus légère, bout 140 K au-dessus de H₂Se : ses molécules sont liées par des liaisons hydrogène. Leçon « Interactions de van der Waals et liaison hydrogène »." },
      dispersion: { prompt: "Entre deux molécules d'iodure d'hydrogène HI à 298 K, quelle part de l'attraction de van der Waals domine ?",
        options: { a: "La dispersion de London, à près de 99 % : HI est très polarisable et peu polaire (0,45 D).", b: "L'interaction de Keesom, car HI est polaire.", c: "L'interaction de Debye.", d: "Les trois à parts égales." },
        why: "Le moment de HI est faible et entre à la puissance 4 dans Keesom ; son volume de polarisabilité, 5,45 × 10⁻³⁰ m³, est grand et entre au carré dans London. La dispersion l'emporte, comme pour la plupart des molécules ; seules les petites molécules très polaires comme l'eau font exception. Leçon « Interactions de van der Waals et liaison hydrogène »." },
      solvant: { prompt: "Dans le modèle du solvant continu, par quel facteur l'eau (εr ≈ 78) réduit-elle l'attraction entre deux ions, par rapport à un solvant de permittivité relative 2, à même distance ?",
        options: { a: "2.", b: "76.", c: "1 560.", d: "39." },
        hint: "L'énergie varie comme 1/εr.",
        why: "E = z₁z₂e²/(4πε₀ εr r) : le rapport vaut 78/2 = 39. Une paire Na⁺ Cl⁻ au contact vaut une centaine de fois l'énergie thermique dans un solvant apolaire, 2,5 fois dans l'eau : c'est pourquoi l'eau dissout le sel. Leçon « Solvants et solubilité »." },
      extraction: { prompt: "Constante de partage K = 4, 100 mL de solution aqueuse, 100 mL de solvant organique en tout. Quelle fraction de soluté reste dans l'eau après une extraction de 100 mL, puis après deux extractions de 50 mL ?",
        options: { a: "20 % dans les deux cas.", b: "20 % en une fois, 11 % en deux.", c: "11 % en une fois, 20 % en deux.", d: "0 % : le solvant organique prend tout." },
        hint: "Une fois : 1/(1 + K V_org/V_aq). Deux fois : (1 + K V_org/(2 V_aq))⁻².",
        why: "1/(1 + 4) = 20 % ; (1 + 2)⁻² = 1/9 ≈ 11 %. À volume total égal, fractionner vaut mieux. Le partage n'est jamais complet : il reste toujours une fraction dans l'eau. Leçon « Solvants et solubilité »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

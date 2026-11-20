/* Épreuve de l'étape « Masse électromagnétique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      energie: { prompt: "Une sphère de rayon 1\u00a0fm porte la charge élémentaire e, répartie sur sa surface. Que vaut l'énergie de son champ ?",
        options: { a: "0,72\u00a0MeV", b: "1,44\u00a0MeV", c: "0,36\u00a0MeV", d: "Elle est infinie." },
        hint: "e²/(4πε0) = 1,44\u00a0MeV·fm.",
        why: "(28.2) : U = (1/2) e²/(4πε0 a) = 0,72\u00a0MeV. 1,44\u00a0MeV oublie le facteur 1/2 ; l'énergie n'est infinie que pour a → 0. Leçon « Énergie du champ d'une charge ponctuelle »." },
      ou: { prompt: "Pour cette même sphère, quelle part de l'énergie du champ se trouve entre a et 2a ?",
        options: { a: "25\u00a0%", b: "50\u00a0%", c: "75\u00a0%", d: "100\u00a0%" },
        why: "La part contenue dans la sphère de rayon r vaut 1 \u2212 a/r, (28.1a) : la moitié à 2a. L'énergie, comme la quantité de mouvement, se concentre près de la charge. Leçon « Énergie du champ d'une charge ponctuelle »." },
      signe: { prompt: "Un électron et un positon, modélisés par la même sphère chargée, avancent à la même vitesse. Comparez les quantités de mouvement de leurs champs.",
        options: { a: "Elles sont opposées.", b: "Celle du positon est nulle.", c: "Elles sont égales : g = ε0 E ∧ B est proportionnelle à q².", d: "Celle de l'électron est plus grande, car sa charge est négative." },
        why: "Changer le signe de q retourne E et B à la fois : leur produit vectoriel ne change pas. La masse électromagnétique ne dépend pas du signe de la charge. Leçon « Quantité de mouvement du champ d'une charge mobile »." },
      impulsion: { prompt: "Une sphère de rayon a porte la charge e en surface et avance à v = 0,01c. Que vaut la quantité de mouvement de son champ ?",
        options: { a: "(1/2) e² v/(4πε0 a c²)", b: "e² v/(4πε0 a c²)", c: "(4/5) e² v/(4πε0 a c²)", d: "(2/3) e² v/(4πε0 a c²)" },
        why: "(28.3), à 5\u00a0×\u00a010⁻⁵ près à cette vitesse. Le facteur 2/3 vient de la moyenne de sin²θ ; 4/5 serait la charge répartie dans le volume, 1/2 le facteur de l'énergie. Leçon « Quantité de mouvement du champ d'une charge mobile »." },
      muon: { prompt: "Le muon a la charge de l'électron et une masse d'environ 207 mₑ. Si toute sa masse était électromagnétique, charge en surface, comment son rayon se comparerait-il au rayon (28.5) de l'électron ?",
        options: { a: "Environ 207 fois plus grand", b: "Environ 207 fois plus petit", c: "Le même", d: "Environ √207 fois plus petit" },
        why: "(28.5) : a = (2/3) e²/(4πε0 m c²) varie comme 1/m à charge égale. Plus de masse électromagnétique demande un champ plus concentré. Leçon « Masse électromagnétique »." },
      vitesse: { prompt: "À v = 0,6c, la quantité de mouvement du champ de la sphère de Lorentz, qui se contracte, vaut combien de fois m_élec v ?",
        options: { a: "1,25", b: "1,6", c: "1,19", d: "1" },
        hint: "1/√(1 \u2212 0,36).",
        why: "(28.7) : γ = 1/0,8 = 1,25. 1,19 est la loi de la sphère rigide d'Abraham à la même vitesse ; c'est l'écart que devaient trancher Kaufmann et Bucherer. Leçon « Masse électromagnétique »." },
      quatre: { prompt: "Au repos, l'énergie du champ d'une répartition de charge à symétrie sphérique vaut U. Quelle masse électromagnétique donne la quantité de mouvement de son champ, à faible vitesse ?",
        options: { a: "U/c²", b: "U/(2c²)", c: "(3/4) U/c²", d: "(4/3) U/c²" },
        why: "(28.4a) : m_élec = (4/3) U/c², pour toute répartition sphérique rigide. La relativité attendrait U/c² : c'est le désaccord des 4/3. Leçons « Quantité de mouvement du champ d'une charge mobile » et « Masse électromagnétique »." },
      isole: { prompt: "Pourquoi l'énergie du champ d'une sphère chargée en mouvement ne vaut-elle pas γ fois son énergie au repos, comme pour une particule ?",
        options: { a: "Parce que la mesure de l'énergie est trop imprécise.", b: "Parce que le champ rayonne en mouvement uniforme.", c: "Parce que le champ seul n'est pas un système isolé : les forces qui tiennent la charge rassemblée ont aussi énergie et quantité de mouvement.", d: "Parce que la relativité ne s'applique pas au champ électromagnétique." },
        why: "(28.7b) donne γU(1 + v²/3c²). La charge d'une sphère se repousse elle-même ; ce qui la retient doit être compté. Une charge en mouvement uniforme ne rayonne pas. Leçon « Masse électromagnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

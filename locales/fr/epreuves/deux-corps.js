/* Épreuve de l'étape « Deux corps et collisions » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      binaire: { prompt: "Deux étoiles de 2 et 1 masses solaires tournent l'une autour de l'autre à la distance moyenne a. Une planète légère tourne autour d'une étoile seule d'une masse solaire, à la même distance a. Que vaut le rapport de leurs périodes ?",
        options: { a: "1 : la période ne dépend que de a.", b: "Environ 0,58 : la période varie comme 1/√(m₁ + m₂), et la somme des masses vaut 3 au lieu de 1.", c: "Environ 0,71 : seule compte l'étoile de 2 masses solaires.", d: "3 : le couple est trois fois plus lourd, il tourne trois fois plus lentement." },
        hint: "Le mouvement relatif est celui d'un point autour d'un centre fixe de masse m₁ + m₂.",
        why: "Troisième loi de Kepler à deux corps : T = 2π √(a³/(G(m₁ + m₂))). Avec 3 masses solaires au lieu de 1, T est divisé par √3 ≈ 1,73. Leçon « Le problème à deux corps »." },
      positronium: { prompt: "Le positronium est un électron lié à un positon, de même masse que lui. Comparé à l'atome d'hydrogène, que vaut la masse réduite, qui fixe les niveaux d'énergie ?",
        options: { a: "La même, mₑ : le positon joue le rôle du proton.", b: "2mₑ, la masse totale.", c: "mₑ/1836, le rapport des masses.", d: "mₑ/2 : les deux particules tournent autour de leur milieu, et les énergies de liaison sont deux fois plus faibles." },
        why: "μ = mₑ·mₑ/(2mₑ) = mₑ/2. Pour l'hydrogène, μ = mₑ/(1 + mₑ/mₚ), à 5,4\u00a0×\u00a010⁻⁴ près de mₑ. Les niveaux étant proportionnels à μ, ceux du positronium sont à peu près deux fois moins profonds. Leçon « Le problème à deux corps »." },
      comete: { prompt: "À 1 ua du Soleil, la vitesse de libération vaut 42,1\u00a0km·s⁻¹. Une comète y passe à 45\u00a0km·s⁻¹, sur une trajectoire qui frôle le Soleil. Que devient-elle ?",
        options: { a: "Elle est dans un état de diffusion : son énergie mécanique est positive, elle repart à l'infini, quel que soit son moment cinétique.", b: "Elle tombe sur le Soleil, puisqu'elle le frôle.", c: "Elle est liée : la gravitation est attractive.", d: "On ne peut pas conclure sans connaître sa masse." },
        why: "Em = ½mv² \u2212 GMm/r > 0 dès que v dépasse √(2GM/r). Le moment cinétique décide de la plus courte distance, pas du caractère lié ; la masse de la comète se simplifie. Leçon « États liés et états de diffusion »." },
      signe: { prompt: "Un proton et un antiproton, puis deux protons, se croisent à la même vitesse relative, avec le même paramètre d'impact b = d/2. Que peut-on dire des deux déviations ?",
        options: { a: "Elles sont opposées en valeur : 90° pour l'une, \u221290° pour l'autre, et les plus courtes distances sont égales.", b: "Le proton et l'antiproton ne sont pas déviés, puisqu'ils s'attirent.", c: "Elles valent 90° toutes les deux, d'un côté pour l'attraction, de l'autre pour la répulsion ; la plus courte distance est plus grande de d pour la répulsion.", d: "La répulsion dévie toujours davantage que l'attraction." },
        hint: "Dans la déviation tan(θ/2) = d/(2b), tan(θ/2) ne dépend pas du signe de K ; r_min, si.",
        why: "tan(θ/2) = d/(2b) = 1 : θ = 90° dans les deux cas. r_min = (∓d + √(d² + 4b²))/2 vaut 0,207 d en attraction et 1,207 d en répulsion. Leçon « États liés et états de diffusion »." },
      spheres: { prompt: "Un gaz de sphères dures est bombardé par un faisceau large. Parmi les projectiles qui heurtent une sphère, quelle fraction repart vers l'arrière (déviation supérieure à 90°) ?",
        options: { a: "La moitié : la diffusion par une sphère dure est isotrope.", b: "Un quart : seuls les chocs presque frontaux renvoient vers l'arrière.", c: "Aucune : une sphère dure ne fait que dévier.", d: "Les trois quarts : la sphère est convexe." },
        hint: "dσ/dΩ = R²/4 ne dépend pas de θ.",
        why: "Une section efficace différentielle constante répartit les projectiles uniformément en angle solide ; l'hémisphère arrière en reçoit la moitié. Il faut b < R cos 45° pour θ > 90°, soit une surface π R²/2 : la moitié de σ. Leçon « Collisions et section efficace »." },
      feuille: { prompt: "Une feuille d'or de 2,1\u00a0×\u00a010⁻⁷\u00a0m contient 5,9\u00a0×\u00a010²⁸ atomes par mètre cube. Pour une particule alpha, la section efficace des déviations supérieures à 90° vaut 5,5\u00a0×\u00a010⁻²⁸\u00a0m². Quelle fraction des particules est renvoyée vers l'arrière ?",
        options: { a: "Environ une sur 800, une par couche d'atomes.", b: "Environ 7\u00a0×\u00a010⁻⁶, soit une sur 150\u00a0000 : n σ x.", c: "La moitié, comme pour des sphères dures.", d: "Environ 5,5\u00a0×\u00a010⁻²⁸ : la section efficace elle-même." },
        why: "P = n σ x = 5,9\u00a0×\u00a010²⁸ × 5,5\u00a0×\u00a010⁻²⁸ × 2,1\u00a0×\u00a010⁻⁷ ≈ 6,8\u00a0×\u00a010⁻⁶. Une section efficace n'est pas une probabilité : il faut la multiplier par le nombre de cibles par unité de surface. Leçons « Collisions et section efficace » et « L'expérience de Rutherford »." },
      energie: { prompt: "On ralentit les particules alpha jusqu'à diviser leur énergie par 2. Le nombre de particules comptées à 60° est multiplié par…",
        options: { a: "2 : elles restent plus longtemps près du noyau.", b: "√2.", c: "4 : d est proportionnel à 1/E, et dσ/dΩ à d².", d: "1 : la forme en 1/sin⁴(θ/2) ne dépend pas de l'énergie." },
        why: "La distance d'approche donne d ∝ 1/E, la section efficace de Rutherford dσ/dΩ ∝ d² : un facteur 4 à tous les angles. Seule l'échelle change, pas la forme. Geiger et Marsden ont trouvé cette dépendance en 1/v⁴ en 1913. Leçon « L'expérience de Rutherford »." },
      rbs: { prompt: "Dans un choc élastique frontal, une particule alpha (masse 4) rebondit sur un noyau d'or (masse 197) au repos. Quelle part de son énergie cinétique garde-t-elle ?",
        options: { a: "Toute : le choc est élastique.", b: "La moitié : l'énergie se partage entre les deux corps.", c: "4/197 ≈ 2\u00a0%.", d: "((197 \u2212 4)/(197 + 4))² ≈ 92\u00a0% : le noyau lourd emporte peu d'énergie." },
        hint: "Dans le référentiel barycentrique, la vitesse de la particule s'inverse ; revenez au laboratoire.",
        why: "Dans le référentiel barycentrique, la vitesse relative s'inverse sans changer de norme. Revenu au laboratoire, le projectile repart à (M \u2212 m)/(M + m) fois sa vitesse : il garde 0,922 de son énergie. Sur le silicium (masse 28), il n'en garde que 56\u00a0% : c'est le principe de la spectrométrie de rétrodiffusion de Rutherford. Leçons « Collisions et section efficace » et « L'expérience de Rutherford »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

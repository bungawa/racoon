/* Épreuve de l'étape « Trajectoires dans des champs E et B » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      hyper: { prompt: "Un électron part du repos dans un champ électrique uniforme de 2\u00a0MV·m⁻¹. Quelle est sa vitesse au bout de τ = mc/(eE) ≈ 0,85\u00a0ns ?",
        options: { a: "Environ 0,71\u00a0c : p = eEt = mc, donc γ = √2 et v = c/√2.", b: "c exactement : c'est la définition de τ.", c: "Environ 0,5\u00a0c.", d: "Plus de c, comme le prévoit la chute libre de Newton, mais la relativité l'interdit : le modèle ne s'applique pas." },
        hint: "dp/dt = eE vaut à toute vitesse ; v = p/(γm) avec γ = √(1 + p²/(m²c²)).",
        why: "À t = τ, p = mc, γ = √(1 + 1) = √2 et v = p/(γm) = c/√2 ≈ 0,71\u00a0c. Newton dirait v = c : l'écart est déjà de 41\u00a0%. Leçon « Mouvement dans un champ électrique ou magnétique uniforme »." },
      rigidite: { prompt: "Les protons de 7\u00a0TeV du LHC sont courbés sur 2,80\u00a0km de rayon par des dipôles de 8,33\u00a0T. Quel rayon faudrait-il avec des dipôles de 4\u00a0T ?",
        options: { a: "2,80\u00a0km : le rayon ne dépend que de l'énergie.", b: "Environ 5,8\u00a0km : à rigidité Bρ = p/e fixée, le rayon varie comme 1/B.", c: "Environ 4,0\u00a0km, en 1/√B.", d: "Environ 1,3\u00a0km." },
        why: "Bρ = p/e ≈ 23\u202f350\u00a0T·m pour 7\u00a0TeV. ρ = 23\u202f350/4 ≈ 5\u202f840\u00a0m. Le tunnel serait deux fois plus long : c'est pourquoi on pousse le champ des aimants supraconducteurs." },
      newton: { prompt: "Un électron de 2\u00a0MeV décrit un cercle dans un champ de 0,1\u00a0T. Quel est son rayon ?",
        options: { a: "Environ 4,8\u00a0cm, avec p = √(2mEc).", b: "Environ 2,0\u00a0m.", c: "Environ 8,2\u00a0cm : p = √(Ec² + 2Ec mc²)/c, puis R = p/(eB).", d: "Environ 1,2\u00a0cm." },
        hint: "Comparez 2\u00a0MeV à mc² = 0,511\u00a0MeV.",
        why: "Ec ≈ 4 mc² : l'électron est relativiste. pc = √(4 + 2 × 2 × 0,511) ≈ 2,46\u00a0MeV, p ≈ 1,31\u00a0×\u00a010⁻²¹\u00a0kg·m·s⁻¹, R = p/(eB) ≈ 8,2\u00a0cm. Le calcul de Newton, 4,8\u00a0cm, sous-estime p de 42\u00a0%." },
      diametre: { prompt: "Dans un spectromètre à demi-cercle sous 0,05\u00a0T, à quelle distance de la source arrivent des électrons de 1\u00a0MeV entrés perpendiculairement au bord du champ ?",
        options: { a: "Environ 9,5\u00a0cm, le rayon.", b: "Environ 13\u00a0cm, avec p = √(2mEc).", c: "Environ 38\u00a0cm.", d: "Environ 19\u00a0cm : le diamètre 2p/(eB), avec p ≈ 7,6\u00a0×\u00a010⁻²²\u00a0kg·m·s⁻¹." },
        why: "pc = √(1 + 2 × 0,511)\u00a0MeV ≈ 1,42\u00a0MeV, d'où p ≈ 7,6\u00a0×\u00a010⁻²²\u00a0kg·m·s⁻¹ et R ≈ 9,5\u00a0cm. Ils ressortent au bout d'un demi-cercle, à 2R ≈ 19\u00a0cm. Leçon « Analyse en quantité de mouvement »." },
      bande: { prompt: "Une fente de 1\u00a0mm est placée à 20\u00a0cm de la source d'un spectromètre à 180°, qui émet dans ±4°. Quelle est la largeur relative de la bande de quantités de mouvement comptée ?",
        options: { a: "Environ 0,75\u00a0% : 0,5\u00a0% pour la fente, w/x, et 0,24\u00a0% pour l'ouverture, θ²/2.", b: "0,5\u00a0%, la fente seule : le champ refocalise toutes les directions.", c: "Environ 7\u00a0%, l'ouverture 2θ.", d: "Environ 3,5\u00a0%, l'ouverture θ seule." },
        why: "Une particule entrée à l'angle θ arrive à 2R cos θ ≈ 2R(1 \u2212 θ²/2) : l'écart est du second ordre. Pour 4° = 0,070\u00a0rad, θ²/2 ≈ 0,24\u00a0%, à ajouter à w/x = 0,5\u00a0%." },
      comptage: { prompt: "On mesure un spectre bêta en balayant le champ devant une fente fixe. Pourquoi faut-il diviser les comptages par B ?",
        options: { a: "Parce que le champ magnétique ralentit les électrons.", b: "Parce que la bande acceptée Δp = p w/x croît comme p, donc comme B : les comptages valent p f(p) à un facteur près.", c: "Parce que le compteur est moins efficace à fort champ.", d: "Parce que le rayon varie comme 1/B², ce qui étale les électrons." },
        why: "Le compteur reçoit f(p) Δp. À géométrie fixée, Δp/p = w/x est constant : Δp ∝ p ∝ B. Sans cette division, le maximum d'un spectre continu glisse vers les grandes quantités de mouvement." },
      derive: { prompt: "E = 5\u00a0kV·m⁻¹ et B = 20\u00a0mT sont croisés. Un proton part du repos. Quelle est sa vitesse moyenne, et de combien s'écarte-t-il de son point de départ le long de E ?",
        options: { a: "Vitesse moyenne nulle : il oscille sur place.", b: "2,5\u00a0×\u00a010⁵\u00a0m·s⁻¹ et 0,14\u00a0mm, comme un électron.", c: "2,5\u00a0×\u00a010⁵\u00a0m·s⁻¹, comme un électron, mais 26\u00a0cm le long de E, 1836 fois plus qu'un électron.", d: "1,4\u00a0×\u00a010²\u00a0m·s⁻¹, 1836 fois moins qu'un électron." },
        why: "v_d = E/B = 2,5\u00a0×\u00a010⁵\u00a0m·s⁻¹ pour toute particule. La hauteur de l'arche, 2mE/(eB²), est proportionnelle à la masse : 0,14\u00a0mm pour l'électron, 26\u00a0cm pour le proton. Leçon « Champs électrique et magnétique croisés »." },
      hull: { prompt: "Un magnétron plan a 2\u00a0mm entre cathode et anode, sous 2\u00a0kV. À partir de quel champ magnétique les électrons n'atteignent-ils plus l'anode ?",
        options: { a: "Environ 1\u00a0T.", b: "Environ 7,5\u00a0mT.", c: "Environ 0,25\u00a0T.", d: "Environ 75\u00a0mT : B_c = √(2mU/e)/d, la hauteur de la cycloïde égalant d." },
        hint: "La cycloïde s'élève de 2mE/(eB²) avec E = U/d.",
        why: "2mU/(edB²) = d donne B_c = √(2mU/e)/d = √(2 × 9,11\u00a0×\u00a010⁻³¹ × 2000/1,60\u00a0×\u00a010⁻¹⁹)/0,002 ≈ 75\u00a0mT. Au-delà, les électrons dérivent le long de la cathode sans toucher l'anode." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Quadrivecteurs de l'électrodynamique » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      muon: { prompt: "Un muon cosmique traverse l'atmosphère à 0,995 c. Que valent les composantes de sa quadrivitesse, divisée par c, et le carré de celle-ci ?",
        options: { a: "Environ (10,0 ; 9,96), de carré 1, comme au repos.", b: "(1 ; 0,995), de carré 0,01.", c: "Environ (10,0 ; 9,96), de carré 199.", d: "(1 ; 0,995), de carré 1." },
        hint: "γ = 1/√(1 \u2212 0,995²) ≈ 10 ; le carré se calcule le plus simplement au repos.",
        why: "La quadrivitesse vaut γ(c, v) : (10,0 ; 9,96) en unités de c. Son carré, 10,0² \u2212 9,96², vaut 1 à l'arrondi près, comme pour la particule au repos (1 ; 0) : c'est un invariant. (1 ; 0,995) est le candidat naïf, qui n'est pas un quadrivecteur. Leçons « Les quadrivecteurs de l'électrodynamique » et « Le produit scalaire de quadrivecteurs »." },
      faisceau: { prompt: "Un faisceau de protons qui va à 0,8 c a, au laboratoire, une densité de charge de 3\u00a0µC·m⁻³. Quelle densité mesure-t-on dans le référentiel où les protons sont au repos ?",
        options: { a: "5\u00a0µC·m⁻³ : la densité propre est la plus grande.", b: "1,8\u00a0µC·m⁻³ : la densité propre ρ0 = ρ/γ est la plus petite.", c: "3\u00a0µC·m⁻³, puisque la charge est invariante.", d: "1,08\u00a0µC·m⁻³, divisée par γ²." },
        hint: "Au laboratoire, chaque élément de volume est contracté d'un facteur γ = 5/3.",
        why: "(cρ, j) = ρ0 γ(c, v) : ρ = γρ0, donc ρ0 = 3/(5/3) = 1,8\u00a0µC·m⁻³. Aucun observateur ne mesure moins que ρ0 : c'est la longueur du quadricourant, √((cρ)² \u2212 j²), divisée par c. Leçons « Les quadrivecteurs de l'électrodynamique » et « Le produit scalaire de quadrivecteurs »." },
      fil: { prompt: "Un fil neutre porte une densité de courant de 2 × 10⁶\u00a0A·m⁻² selon +x. Quelle densité de charge mesure un observateur qui le longe à 0,6 c dans le sens du courant ?",
        options: { a: "0 : un fil neutre l'est pour tous.", b: "+5 × 10⁻³\u00a0C·m⁻³", c: "\u22125 × 10⁻³\u00a0C·m⁻³", d: "\u22124 × 10⁻³\u00a0C·m⁻³" },
        hint: "ρ′ = U·j/c², avec U = γ(c, v) et j = (0, j).",
        why: "U·j = \u2212γ v j, donc ρ′ = \u2212γ v j/c² = \u22121,25 × 0,6 × 2 × 10⁶/(3 × 10⁸) ≈ \u22125 × 10⁻³\u00a0C·m⁻³. Le quadricourant du fil est de genre espace : le signe suit le sens de marche. Oublier γ donne \u22124 × 10⁻³. Leçon « Le produit scalaire de quadrivecteurs »." },
      triplet: { prompt: "Un photon crée une paire électron-positon sur un électron au repos : γ + e⁻ → e⁻ + e⁻ + e⁺. Quelle est l'énergie seuil du photon, avec mc² = 0,511\u00a0MeV ?",
        options: { a: "1,022\u00a0MeV, deux masses d'électron.", b: "1,533\u00a0MeV, trois masses d'électron.", c: "4,6\u00a0MeV, neuf masses d'électron.", d: "2,044\u00a0MeV, quatre masses d'électron." },
        hint: "Le carré de la quadri-impulsion totale vaut (3mc²)² au seuil, en énergies ; celui du photon est nul.",
        why: "Au laboratoire, le carré de la somme vaut m² + 2Em (en énergies, le photon n'ayant pas de masse). Au seuil, dans le centre de masse, il vaut (3m)². Donc 2Em = 8m², E = 4mc² ≈ 2,04\u00a0MeV. Comme pour les antiprotons, une partie de l'énergie reste dans le mouvement du centre de masse. Leçon « Le produit scalaire de quadrivecteurs »." },
      invariant: { prompt: "Parmi ces grandeurs d'une distribution de charges, laquelle tous les observateurs galiléens trouvent-ils égale ?",
        options: { a: "c²ρ² \u2212 j², le carré du quadricourant.", b: "La densité de charge ρ.", c: "La norme de la densité de courant j.", d: "La divergence ∇·j." },
        why: "Le carré d'un quadrivecteur, (cρ)² \u2212 j², est un invariant. Ses composantes ρ et j ne le sont pas, ni ∇·j seule : c'est ∂ρ/∂t + ∇·j qui est invariante. Leçons « Le produit scalaire de quadrivecteurs » et « Le gradient à quatre dimensions »." },
      plasma: { prompt: "Une onde de 15\u00a0MHz traverse un plasma froid de fréquence plasma 12\u00a0MHz. À quelle vitesse va le référentiel où son vecteur d'onde est nul ?",
        options: { a: "c, comme toute onde électromagnétique.", b: "0,6 c, la vitesse de groupe.", c: "0,8 c.", d: "1,67 c, la vitesse de phase." },
        hint: "Le carré de (ω/c, k) vaut (ωp/c)² pour tous ; k′ = 0 pour le référentiel qui va à c²k/ω.",
        why: "ck = 2π√(15² \u2212 12²)\u00a0MHz = 2π × 9\u00a0MHz, d'où v = c²k/ω = (9/15) c = 0,6 c, la vitesse de groupe. Dans ce référentiel, tout le plasma oscille en phase à 12\u00a0MHz. La vitesse de phase, 1,67 c, ne peut être celle d'un référentiel. Leçon « Le gradient à quatre dimensions »." },
      lumiere: { prompt: "Pourquoi aucun observateur ne peut-il voir une onde lumineuse du vide osciller partout en phase, avec un vecteur d'onde nul ?",
        options: { a: "Parce que sa fréquence est trop élevée.", b: "Parce qu'il faudrait un observateur plus rapide que l'onde, ce que l'effet Doppler interdit.", c: "Parce que (ω/c, k) est de genre lumière : son carré est nul, et k′ = 0 imposerait ω′ = 0.", d: "C'est possible, pour un observateur qui va à c." },
        why: "ω²/c² \u2212 k² = 0 pour tous les observateurs. Un k′ nul exigerait ω′ nul : plus d'onde du tout. Un observateur ne va jamais à c, et sa quadrivitesse n'existerait pas. Leçon « Le gradient à quatre dimensions »." },
      source: { prompt: "Une simulation trouve, en un événement, ∂ρ/∂t + ∇·j = 3\u00a0A·m⁻³ : de la charge y apparaît. Que trouve un observateur qui passe à 0,5 c ?",
        options: { a: "0 : dans son référentiel, la charge est conservée.", b: "3 × 1,15 ≈ 3,5\u00a0A·m⁻³, multiplié par γ.", c: "Une valeur qui dépend du sens de son mouvement.", d: "3\u00a0A·m⁻³, au même événement : c'est un invariant." },
        why: "∂ρ/∂t + ∇·j est la quadridivergence du quadricourant, un scalaire invariant : nulle ou non, elle a la même valeur pour tous en un même événement. Une erreur de conservation de la charge dans un code ne disparaît donc dans aucun référentiel. Leçon « Le gradient à quatre dimensions »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

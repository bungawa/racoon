/* Épreuve de l'étape « L'énergie, première approche » : textes en français. Une autre langue = locales/<langue>/epreuves/energie-premiere-approche.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/energie-premiere-approche.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      pompage: { prompt: "Une station de pompage monte 1\u00a0m³ d'eau, 1\u202f000\u00a0kg, de 900\u00a0m. Quelle masse d'essence, à 46\u00a0MJ·kg⁻¹, contient autant d'énergie ?",
        options: { a: "Environ 190\u00a0kg.", b: "Environ 2\u00a0kg.", c: "Environ 0,19\u00a0kg.", d: "Environ 19\u00a0g." },
        hint: "Calculez mgh, puis divisez par l'énergie d'un kilogramme d'essence.",
        why: "mgh = 1\u202f000 × 9,81 × 900 ≈ 8,8\u00a0MJ ; 8,8/46 ≈ 0,19\u00a0kg d'essence. La mécanique ordinaire stocke de l'ordre du kilojoule par kilogramme, la chimie quelques dizaines de mégajoules : un facteur mille à un million entre les paliers. Leçons « L'énergie potentielle de pesanteur » et « Les autres formes d'énergie »." },
      cascade: { prompt: "L'eau d'une chute de 100\u00a0m arrive en bas, puis s'immobilise dans le bassin. Si toute son énergie reste dans l'eau sous forme thermique, de combien s'échauffe-t-elle ?",
        options: { a: "D'environ 0,23\u00a0K.", b: "D'environ 23\u00a0K.", c: "D'environ 2,3\u00a0K.", d: "Pas du tout : l'énergie de la chute est perdue." },
        hint: "c ≈ 4\u202f184\u00a0J·kg⁻¹·K⁻¹ pour l'eau ; raisonnez par kilogramme.",
        why: "Par kilogramme : gh = 981\u00a0J d'énergie potentielle, devenue cinétique, puis thermique. ΔT = gh/c = 981/4\u202f184 ≈ 0,23\u00a0K. La chaleur pèse lourd : 1\u00a0K d'eau vaut 427\u00a0m de chute. Leçons « L'énergie potentielle de pesanteur », « L'énergie cinétique » et « Les autres formes d'énergie »." },
      orbite: { prompt: "On calcule mgh pour monter 1\u00a0kg du sol à 400\u00a0km d'altitude, celle d'une station spatiale. Que vaut l'erreur de la formule, et pourquoi ?",
        options: { a: "Aucune : g est une constante.", b: "Elle surestime l'énergie d'environ 6\u00a0%, l'ordre de h/R : g n'est plus uniforme sur une telle hauteur.", c: "Environ 0,2\u00a0%, comme à 10\u00a0km.", d: "Elle sous-estime l'énergie d'un facteur 2." },
        hint: "Rayon terrestre : 6\u202f400\u00a0km environ.",
        why: "mgh suppose g uniforme ; l'erreur relative est de l'ordre de h/R = 400/6\u202f371 ≈ 6\u00a0%. g diminue avec l'altitude : mgh surestime. Pour un satellite, il faut l'énergie de gravitation en 1/r. Notes de validité des leçons « L'énergie potentielle de pesanteur » et « L'énergie cinétique »." },
      pierre: { prompt: "Une pierre lâchée de 20\u00a0m arrive à √(2gh) ≈ 20\u00a0m·s⁻¹. Qu'a-t-on négligé, et avec quelle taille relative ?",
        options: { a: "Rien : la conservation de l'énergie est exacte, donc ce résultat aussi.", b: "La masse de la pierre, qui change la vitesse d'arrivée.", c: "La rotation de la Terre, qui ralentit la chute de moitié.", d: "Le frottement de l'air, de l'ordre du pourcent pour une pierre dense mais pas pour une plume ; la variation de g, h/R ≈ 3\u00a0×\u00a010⁻⁶ ; la relativité, v²/2c² ≈ 2\u00a0×\u00a010⁻¹⁵." },
        hint: "La loi de conservation est exacte ; les formules mgh et ½mv² ont chacune leur domaine.",
        why: "La conservation de l'énergie n'a pas d'exception connue ; mgh et ½mv² sont des approximations. Décrire le système, c'est chiffrer ce qu'on néglige : ici l'air domine, très loin devant g et la relativité. La masse, elle, se simplifie dans mgh = ½mv². Leçons « L'énergie cinétique » et « L'énergie potentielle de pesanteur »." },
      plan: { prompt: "Un plan incliné sans frottement a une longueur égale à 4 fois sa hauteur. On y pousse une charge de 100\u00a0kg pour la monter de 1\u00a0m. Force parallèle à la pente, et travail fourni ?",
        options: { a: "Environ 245\u00a0N, et 981\u00a0J : le travail de la montée verticale.", b: "Environ 981\u00a0N, et 981\u00a0J.", c: "Environ 245\u00a0N, et 245\u00a0J.", d: "Environ 245\u00a0N, et 3\u202f924\u00a0J." },
        hint: "Sans frottement, la force multipliée par le chemin égale le poids multiplié par la hauteur.",
        why: "On gagne en force ce qu'on perd en chemin : F × 4\u00a0m = mg × 1\u00a0m, d'où F = 981/4 ≈ 245\u00a0N. Le travail Fd reste l'énergie potentielle gagnée, 981\u00a0J, quel que soit le chemin. Leçon « L'énergie potentielle de pesanteur » ; le bilan d'énergie d'une machine sans pertes, leçon « Qu'est-ce que l'énergie ? »." },
      train: { prompt: "Un voyageur de 70\u00a0kg est assis dans un train à 30\u00a0m·s⁻¹. Pour un contrôleur sur le quai, son énergie cinétique vaut 31,5\u00a0kJ ; pour son voisin, zéro. Qui a raison ?",
        options: { a: "Le contrôleur : seule la vitesse par rapport au sol compte.", b: "Le voisin : le voyageur est immobile.", c: "Les deux, chacun dans son référentiel : l'énergie cinétique en dépend, et un bilan doit rester dans un seul référentiel.", d: "Aucun : il faut prendre la moyenne des deux, 15,75\u00a0kJ." },
        hint: "½mv² se calcule avec quelle vitesse ?",
        why: "½ × 70 × 30² = 31\u202f500\u00a0J pour le quai, 0 dans le train. L'énergie cinétique n'est définie que dans un référentiel donné ; la conservation vaut dans chacun, à condition de ne jamais mélanger des énergies calculées dans deux référentiels. Leçon « L'énergie cinétique » ; le bilan d'un système isolé, leçon « Qu'est-ce que l'énergie ? »." },
      masse: { prompt: "Brûler 1\u00a0kg d'essence libère 46\u00a0MJ ; une fission libère environ un millième de l'énergie de masse. Pourquoi dit-on que la masse se conserve en chimie, mais pas dans un noyau ?",
        options: { a: "Parce que E = mc² ne s'applique qu'aux noyaux.", b: "Parce qu'en chimie, l'énergie libérée vient de l'oxygène et non de la masse.", c: "Parce que la chimie conserve les atomes, donc exactement la masse.", d: "Parce que 46\u00a0MJ/c² ≈ 0,5\u00a0µg, 10⁻¹⁰ des 4,4\u00a0kg de réactifs, échappe à toute balance, alors qu'un millième se mesure facilement." },
        hint: "Toute énergie a une masse : Δm = ΔE/c².",
        why: "46\u00a0×\u00a010⁶/(3,0\u00a0×\u00a010⁸)² ≈ 5\u00a0×\u00a010⁻¹⁰\u00a0kg. Rapporté aux 4,4\u00a0kg d'essence et de dioxygène, c'est 10⁻¹⁰ : la conservation de la masse est une approximation excellente en chimie, mauvaise en physique nucléaire. Leçon « Les autres formes d'énergie » ; la conservation qui vaut pour tous les termes, leçon « Qu'est-ce que l'énergie ? »." },
      ressort: { prompt: "Un ressort de raideur 200\u00a0N·m⁻¹, comprimé de 10\u00a0cm, lance verticalement une bille de 10\u00a0g. Sans frottement, jusqu'à quelle hauteur monte-t-elle ?",
        options: { a: "Environ 20\u00a0m.", b: "Environ 10\u00a0m.", c: "Environ 1\u00a0m.", d: "Environ 0,1\u00a0m." },
        hint: "Énergie élastique : ½kx².",
        why: "½ × 200 × 0,1² = 1\u00a0J ; au sommet, tout est énergie potentielle : h = 1/(0,01 × 9,81) ≈ 10\u00a0m. Oublier le ½, c'est compter la force finale kx sur tout le trajet, et trouver 20\u00a0m. Le bilan suppose un ressort linéaire, loi de Hooke, de masse négligeable. Leçons « Les autres formes d'énergie » et « L'énergie potentielle de pesanteur »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

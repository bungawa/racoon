/* Épreuve de l'étape « L'espace des états » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      conj: { prompt: "On sait que ⟨χ|φ⟩ = 0,3 + 0,4 i. Que valent ⟨φ|χ⟩ et la probabilité de passer de φ à χ ?",
        options: { a: "0,3 + 0,4 i et 0,5.", b: "0,3 \u2212 0,4 i et 0,25 : le conjugué, de même module.", c: "0,4 + 0,3 i et 0,7.", d: "\u22120,3 \u2212 0,4 i et 0,25." },
        why: "(8.5) : ⟨φ|χ⟩ = ⟨χ|φ⟩*. |0,3 + 0,4 i|² = 0,09 + 0,16 = 0,25, la même dans les deux sens. Leçon « Les amplitudes et les vecteurs »." },
      fermeture: { prompt: "Que dit la relation 1 = Σ |i⟩⟨i|, pour une base complète ?",
        options: { a: "Que les amplitudes ont pour somme 1.", b: "Que chaque état de base a la probabilité 1.", c: "Qu'il n'y a qu'un état de base.", d: "Qu'on peut glisser, entre tout bra et tout ket, un appareil grand ouvert sans rien changer." },
        why: "C'est (8.9). Insérée dans ⟨χ|φ⟩, elle redonne la loi de composition (8.1). Leçon « Les amplitudes et les vecteurs »." },
      oppose: { prompt: "Deux états de spin 1/2 ont des directions perpendiculaires dans l'espace. Leurs kets sont-ils orthogonaux ?",
        options: { a: "Non : |⟨χ|φ⟩|² = cos²(45°) = 1/2. Seules des directions opposées donnent des kets orthogonaux.", b: "Oui, comme les directions.", c: "Oui, si les deux états sont dans le plan xy.", d: "La question n'a pas de sens." },
        why: "L'angle entre kets est la moitié de l'angle entre directions : 90° entre directions, 45° entre kets. Leçon « Les amplitudes et les vecteurs »." },
      comp: { prompt: "Un état a les composantes C₊ = 0,6 et C₋ = 0,8 i ; un autre, D₊ = 1, D₋ = 0. Que vaut ⟨χ|φ⟩, χ étant le second ?",
        options: { a: "0,8 i.", b: "1,4.", c: "0,6 : Σ Dᵢ* Cᵢ = 1 × 0,6 + 0 × 0,8 i.", d: "0,36." },
        why: "(8.15). χ est l'état +z ; l'amplitude est C₊. La probabilité vaut 0,36. Leçon « La décomposition des vecteurs d'état »." },
      filtre: { prompt: "Un filtre ne laisse passer que l'état +x : son opérateur est |+x⟩⟨+x|. Un spin préparé selon \u2212x le traverse. Que sort-il ?",
        options: { a: "Un spin selon +x, toujours.", b: "Rien : |+x⟩⟨+x|\u2212x⟩ est nul.", c: "Un spin selon \u2212x.", d: "La moitié des spins." },
        why: "⟨+x|\u2212x⟩ = 0 : l'état de sortie a une norme nulle, aucune particule ne passe. Pour un spin +z, la moitié passerait, toutes selon +x. Leçon « La décomposition des vecteurs d'état »." },
      deuxcalculs: { prompt: "On calcule ⟨χ|ψ⟩, avec |ψ⟩ = A|φ⟩, par les composantes de ψ, puis ⟨χ|A|φ⟩ par la matrice de A. Pourquoi trouve-t-on le même nombre ?",
        options: { a: "Parce que ce sont les mêmes sommes de produits d'amplitudes, groupées autrement : (8.26).", b: "Par hasard.", c: "Parce que A est unitaire.", d: "Ce n'est vrai que pour des amplitudes réelles." },
        why: "Σᵢ ⟨χ|i⟩ (Σⱼ ⟨i|A|j⟩⟨j|φ⟩) : regrouper autour de i ou de j ne change rien. Vrai aussi pour un filtre. Leçon « La décomposition des vecteurs d'état »." },
      base: { prompt: "Combien d'états de base faut-il pour 10 électrons discernables, chacun dans 1 000 cases d'espace avec 2 états de spin ?",
        options: { a: "20 000.", b: "10 000.", c: "2 × 10⁴⁰.", d: "2 000¹⁰ ≈ 10³³ : le nombre croît exponentiellement avec celui des particules." },
        hint: "(M s)ⁿ.",
        why: "(1 000 × 2)¹⁰ = 2¹⁰ × 10³⁰ ≈ 1,0 × 10³³. Leçon « Quels sont les états de base du monde »." },
      froid: { prompt: "Pourquoi peut-on décrire un atome d'hydrogène, dans un gaz à 300 K, par sa seule quantité de mouvement et son spin ?",
        options: { a: "Parce que l'atome n'a pas d'état excité.", b: "Parce que la température est faible devant 10 K.", c: "Parce que k_B T ≈ 0,026 eV est très petit devant les 10,2 eV du premier état excité : la proportion excitée, environ 10⁻¹⁷¹, ne se mesure pas.", d: "Parce que le proton n'a pas de structure." },
        why: "4 e^(\u2212ΔE/k_BT) avec ΔE/k_BT ≈ 395. La base choisie est un modèle, valable sous une dizaine d'électronvolts. Leçon « Quels sont les états de base du monde »." },
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

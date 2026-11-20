/* Épreuve de l'étape « Ondes de spin » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      saut: { prompt: "Dans une chaîne ferromagnétique, comment un spin retourné se déplace-t-il ?",
        options: { a: "Le couplage entre voisins contient l'échange de deux spins : il fait passer le spin retourné chez un voisin, avec une amplitude iA/ℏ.", b: "L'atome qui porte le spin se déplace dans le cristal.", c: "Il ne se déplace pas : il reste sur son atome.", d: "Un champ magnétique extérieur le pousse." },
        why: "σᵢ · σⱼ = 2Pᵢⱼ \u2212 1 : (15.7) est l'équation d'un électron qui saute d'atome en atome. Leçon « Les ondes de spin »." },
      bande: { prompt: "Quelle est la largeur de la bande des ondes de spin d'une chaîne de couplage A ?",
        options: { a: "A.", b: "2A.", c: "4A : E va de 0 à 4A.", d: "Elle est infinie." },
        why: "(15.12) : E = 2A(1 \u2212 cos kb), de 0 en k = 0 à 4A en kb = π. Leçon « Les ondes de spin »." },
      masse: { prompt: "On double le pas b de la chaîne, à couplage A égal. La masse effective du magnon :",
        options: { a: "double.", b: "est divisée par quatre : ℏ²/(2Ab²).", c: "ne change pas.", d: "est multipliée par quatre." },
        why: "(15.14) : m_eff ∝ 1/b². Leçon « Les ondes de spin »." },
      zero: { prompt: "Pourquoi une onde de spin de très grande longueur d'onde ne coûte-t-elle presque pas d'énergie ?",
        options: { a: "Parce qu'elle n'a pas de spin.", b: "Parce que A est nul pour elle.", c: "Parce qu'elle va très vite.", d: "Parce qu'elle revient presque à tourner l'aimant entier, ce qui ne coûte rien sans direction privilégiée." },
        why: "E ≈ Ab²k² → 0. L'agitation thermique les crée facilement et baisse ainsi l'aimantation. Leçon « Les ondes de spin »." },
      somme: { prompt: "Deux ondes de spin de kb = π/2 chacune, couplage A. Énergie de l'état à deux magnons, dans l'approximation indépendante ?",
        options: { a: "2A.", b: "4A : 2A(1 \u2212 cos π/2) deux fois.", c: "8A.", d: "A." },
        why: "(15.19) : E = 4A \u2212 2A cos(π/2) \u2212 2A cos(π/2) = 4A, la somme des deux énergies (15.20). Leçon « Deux ondes de spin »." },
      voisins: { prompt: "Qu'est-ce que l'approximation des deux ondes de spin indépendantes néglige ?",
        options: { a: "Les configurations où les deux spins retournés sont voisins, environ 2/N des paires sur N atomes.", b: "Le couplage A.", c: "La symétrie des amplitudes.", d: "Le spin de l'électron." },
        why: "Pour deux spins retournés voisins, l'équation diffère de (15.16). Sur une chaîne longue, ces configurations sont rares. Leçon « Deux ondes de spin »." },
      bosons: { prompt: "Pourquoi les magnons sont-ils des bosons ?",
        options: { a: "Parce qu'ils sont chargés.", b: "Parce que l'aimant est un métal.", c: "Parce qu'ils ont un spin 1/2.", d: "Parce que |xₘ, xₙ⟩ et |xₙ, xₘ⟩ sont le même état : l'amplitude doit être symétrique, (15.24)." },
        why: "Deux spins retournés n'ont pas d'étiquette. La statistique sort du modèle. Leçon « Les particules indépendantes »." },
      pauli: { prompt: "Avec des amplitudes antisymétriques, deux particules identiques de même nombre d'onde :",
        options: { a: "ont deux fois plus de chances d'être ensemble.", b: "ont une énergie nulle.", c: "n'existent pas : l'amplitude s'annule, c'est le principe d'exclusion.", d: "se comportent comme des bosons." },
        why: "La différence e^(ikxₘ)e^(ikxₙ) \u2212 e^(ikxₙ)e^(ikxₘ) est nulle : deux fermions ne partagent pas un état. Leçon « Les particules indépendantes »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

/* Épreuve de l'étape « Imperfections d'un réseau » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      gap: { prompt: "Deux niveaux atomiques séparés de 4\u00a0eV, amplitudes de saut A₀ = 0,5\u00a0eV et A₁ = 0,7\u00a0eV. Que vaut la bande interdite entre leurs bandes ?",
        options: { a: "4\u00a0eV.", b: "Aucune : les bandes se recouvrent.", c: "1,6\u00a0eV : 4 \u2212 2 × 0,5 \u2212 2 × 0,7.", d: "2,8\u00a0eV." },
        hint: "Chaque bande s'étend de 2A de part et d'autre de son niveau.",
        why: "Haut de la bande basse : E₀ + 1\u00a0eV ; bas de la bande haute : E₁ \u2212 1,4\u00a0eV. Écart : 4 \u2212 2,4 = 1,6\u00a0eV. Leçon « Les autres états d'un réseau »." },
      trou: { prompt: "Dans un cristal où un électron manque, qu'est-ce qui se propage en bande d'atome en atome ?",
        options: { a: "Le manque d'électron, qui se comporte comme une charge positive avec une masse effective.", b: "Un proton arraché à un noyau.", c: "Une excitation neutre, qui ne porte pas de courant.", d: "Rien : un atome ionisé reste fixe." },
        why: "Un voisin comble la place vide et laisse un trou chez lui : le trou saute, avec les mêmes équations qu'un électron. L'excitation neutre, c'est l'exciton. Leçon « Les autres états d'un réseau »." },
      reflexion: { prompt: "A = 1\u00a0eV, impureté F = 0,4\u00a0eV, électron au milieu de la bande (kb = π/2). Quelle fraction est réfléchie ?",
        options: { a: "40\u00a0%.", b: "0\u00a0% : une impureté faible ne réfléchit pas.", c: "16\u00a0%.", d: "Environ 4\u00a0% : F²/(F² + 4A²) = 0,16/4,16." },
        why: "(13.37) : |β|² = F²/(F² + 4A² sin² kb) = 0,16/4,16 ≈ 0,038. Leçon « La diffusion par les imperfections du réseau »." },
      bord: { prompt: "Pourquoi les électrons proches du bas de la bande sont-ils presque tous réfléchis par une impureté ?",
        options: { a: "Parce qu'ils ont une charge plus grande.", b: "Parce que sin kb → 0 : |β|² → 1, l'électron lent est très sensible au défaut.", c: "Parce qu'ils sont piégés.", d: "Parce que |β|² + |γ|² > 1 près du bord." },
        why: "|β|² = F²/(F² + 4A² sin² kb) tend vers 1 quand sin kb → 0, là où la vitesse de groupe s'annule. La somme |β|² + |γ|² reste 1. Leçon « La diffusion par les imperfections du réseau »." },
      piege: { prompt: "A = 1\u00a0eV, F = \u22121\u00a0eV. À quelle énergie se trouve l'électron piégé ?",
        options: { a: "E₀ \u2212 √5\u00a0eV ≈ E₀ \u2212 2,24\u00a0eV, 0,24\u00a0eV sous le bas de la bande.", b: "E₀ \u2212 1\u00a0eV, dans la bande.", c: "E₀ \u2212 2\u00a0eV, au bas de la bande.", d: "E₀ \u2212 3\u00a0eV." },
        why: "(13.43) : E = E₀ \u2212 √(4A² + F²) = E₀ \u2212 √5\u00a0eV. Leçon « Le piégeage par une imperfection du réseau »." },
      etendue: { prompt: "On rend l'impureté de moins en moins attractive, F → 0⁻. Que devient l'état piégé, sur une chaîne ?",
        options: { a: "Il disparaît dès que |F| < 2A.", b: "Il descend vers \u2212∞.", c: "Il remonte vers le bas de la bande et s'étend sur de plus en plus d'atomes, sans disparaître.", d: "Il passe au-dessus de la bande." },
        why: "sh(κb) = \u2212F/2A : κ → 0 avec F, l'étendue 1/κ diverge, l'énergie de liaison, de l'ordre de F²/4A, s'annule. À une dimension, tout puits lie. Leçon « Le piégeage par une imperfection du réseau »." },
      bosse: { prompt: "Une impureté F > 0 repousse l'électron. Qu'en est-il des états liés ?",
        options: { a: "Il n'y en a aucun.", b: "Il y en a un sous la bande.", c: "Il y en a deux, de part et d'autre de la bande.", d: "Il y en a un au-dessus de la bande, aux amplitudes alternées d'un atome au suivant." },
        why: "Le haut de la bande se comporte comme une masse négative, qu'une bosse attire : l'état est en E₀ + √(4A² + F²). Leçons « Le piégeage par une imperfection du réseau » et « Amplitudes de diffusion et états liés »." },
      pole: { prompt: "Que représente le pôle de l'amplitude de réflexion β, prolongée hors de la bande ?",
        options: { a: "L'énergie où la réflexion est totale dans la bande.", b: "L'état lié : une solution sans onde incidente, qui décroît des deux côtés.", c: "Le milieu de la bande.", d: "Une erreur de calcul, sans sens physique." },
        why: "β infini permet de garder les ondes sortantes sans onde incidente : un état qui existe seul. Son énergie est celle de (13.43). Leçon « Amplitudes de diffusion et états liés »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

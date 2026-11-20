/* Épreuve de l'étape « Énergie des courants permanents » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      bilan: { prompt: "Un cadre à courant maintenu est déplacé lentement près d'une bobine, elle aussi à courant maintenu. Son énergie commode U_méca = \u2212μ·B passe de \u22121\u00a0µJ à \u22124\u00a0µJ. Combien la source du cadre fournit-elle ?",
        options: { a: "3\u00a0µJ, comme la source de la bobine ; l'énergie du système augmente de 3\u00a0µJ.", b: "\u22123\u00a0µJ : la source récupère ce que les forces ont travaillé.", c: "6\u00a0µJ, à elle seule.", d: "Rien : à courant constant, une source ne fournit pas d'énergie." },
        hint: "Chaque source fournit \u2212ΔU_méca.",
        why: "Δ U_méca = \u22123\u00a0µJ. Chaque source fournit 3\u00a0µJ contre la force électromotrice induite ; l'opérateur, qui retient le cadre, en reprend 3. Le système gagne +3\u00a0µJ, soit \u2212ΔU_méca, (15.13). Leçon « Énergies mécanique et électrique »." },
      condo: { prompt: "Un condensateur reste branché sur 100\u00a0V pendant qu'on rapproche ses armatures : sa capacité augmente de 2\u00a0pF. Que deviennent l'énergie stockée et le travail de la source ?",
        options: { a: "L'énergie stockée augmente de 2 × 10⁻⁸\u00a0J, la source fournit 1 × 10⁻⁸\u00a0J.", b: "L'énergie stockée augmente de 1 × 10⁻⁸\u00a0J, la source fournit 2 × 10⁻⁸\u00a0J.", c: "L'énergie stockée diminue de 1 × 10⁻⁸\u00a0J, la source ne fournit rien.", d: "Les deux valent 1 × 10⁻⁸\u00a0J." },
        hint: "La charge augmente de VΔC sous la tension V.",
        why: "La source fournit V²ΔC = 10⁴ × 2 × 10⁻¹² = 2 × 10⁻⁸\u00a0J ; CV²/2 augmente de V²ΔC/2 = 10⁻⁸\u00a0J ; l'autre moitié est le travail des forces entre armatures. Même comptabilité qu'à courant maintenu : (15.15)." },
      flux: { prompt: "Un cadre de 2\u00a0cm × 3\u00a0cm, parcouru par 2\u00a0A, est perpendiculaire à un champ uniforme de 0,1\u00a0T créé par d'autres courants, son moment dans le sens du champ. Quelle est son énergie d'interaction (15.17) ?",
        options: { a: "\u22121,2 × 10⁻⁴\u00a0J.", b: "6 × 10⁻⁵\u00a0J.", c: "+1,2 × 10⁻⁴\u00a0J.", d: "+1,2\u00a0J." },
        why: "U = IΦ = 2 × (6 × 10⁻⁴\u00a0m² × 0,1\u00a0T) = 1,2 × 10⁻⁴\u00a0J, positive : c'est +μ·B, (15.16). La valeur négative serait l'énergie commode \u2212μ·B, qui donne les forces mais n'est pas l'énergie du système. Leçon « Énergie des courants permanents »." },
      double: { prompt: "Pour une distribution de courants permanents, ½∫j·A dV = 2\u00a0mJ. On double tous les courants. Que devient cette énergie ?",
        options: { a: "2\u00a0mJ : le ½ compense.", b: "4\u00a0mJ.", c: "1\u00a0mJ.", d: "8\u00a0mJ." },
        hint: "A est créé par les mêmes courants.",
        why: "j double et A, potentiel de ces courants (15.24), double aussi : U est quadratique, 2 × 2 × 2\u00a0mJ = 8\u00a0mJ. Comme ∫B²/(2μ₀) dV, avec B doublé." },
      mesure: { prompt: "Laquelle de ces grandeurs ne peut pas être mesurée par une sonde placée en un point ?",
        options: { a: "Le potentiel vecteur A, car on peut lui ajouter le gradient d'une fonction sans rien changer d'observable.", b: "Le champ magnétique B.", c: "Le champ électrique E.", d: "La force sur une charge d'essai." },
        why: "A n'est défini qu'à un gradient près : sa valeur en un point dépend de la jauge. Ce qui se mesure de A, c'est sa circulation sur une boucle fermée, le flux de B. Leçon « B ou A ? »." },
      franges: { prompt: "Dans une expérience à deux fentes avec des électrons, l'interfrange vaut 3\u00a0µm. Un solénoïde fin placé entre les fentes enferme un flux de h/(4e). De combien les franges se déplacent-elles ?",
        options: { a: "3\u00a0µm.", b: "0,75\u00a0µm, un quart d'interfrange.", c: "12\u00a0µm.", d: "Pas du tout : les électrons ne traversent aucun champ." },
        why: "(15.34) : la phase ajoutée vaut eΦ/ħ = 2π × Φ/(h/e) = π/2, un quart de tour, donc un quart d'interfrange : 0,75\u00a0µm. Leçon « Potentiel vecteur et mécanique quantique »." },
      signature: { prompt: "Qu'est-ce qui distingue, sur l'écran, l'effet d'un flux enfermé de celui d'un champ traversé par les électrons ?",
        options: { a: "Le flux enfermé élargit les franges.", b: "Le flux enfermé fait disparaître la figure.", c: "Avec le flux enfermé, l'enveloppe de diffraction reste en place et la figure est périodique en flux, de période h/e.", d: "Rien : les deux effets sont identiques." },
        why: "Sans champ sur les chemins, aucun électron n'est dévié : seule la phase relative change, et la figure se répète à chaque h/e. Un champ traversé dévie les faisceaux : franges et enveloppe se déplacent ensemble, d'un angle qui croît sans fin avec B." },
      retard: { prompt: "Un signal à 100\u00a0MHz parcourt un câble de 30\u00a0cm. Peut-on traiter ce câble par les lois de la statique, avec des potentiels instantanés ?",
        options: { a: "Oui : 30\u00a0cm, c'est petit.", b: "Oui, si le câble est blindé.", c: "Non, mais seulement à cause de la résistance du câble.", d: "Non : kr = 2πfL/c ≈ 0,6, le retard n'est plus négligeable." },
        hint: "Comparez la longueur à c/(2πf).",
        why: "c/(2πf) = 3 × 10⁸/(6,28 × 10⁸) ≈ 0,48\u00a0m : kr ≈ 0,3/0,48 ≈ 0,6. Le retard vaut une fraction notable de période ; il faut les potentiels retardés, ou un modèle de ligne. Leçon « Ce qui vaut en statique ne vaut pas en dynamique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

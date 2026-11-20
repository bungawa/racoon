/* Épreuve de l'étape « Puissance, réseaux en échelle et filtres » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      moteur: { prompt: "Un appareil d'impédance z = 30 + 40i Ω à 50\u00a0Hz est branché sous 230\u00a0V efficaces. Quelle puissance moyenne reçoit-il ?",
        options: { a: "Environ 635\u00a0W", b: "Environ 1058\u00a0W", c: "Environ 846\u00a0W", d: "Environ 1270\u00a0W" },
        hint: "|z| = 50\u00a0Ω donne le courant efficace ; seule la partie réelle consomme.",
        why: "I_eff = 230/50 = 4,6\u00a0A et ⟨P⟩ = R I_eff² = 30 × 21,16 ≈ 635\u00a0W, soit U_eff I_eff cos φ avec cos φ = 0,6. 1058\u00a0W est la puissance apparente U_eff I_eff ; 1270\u00a0W oublie le facteur ½ des amplitudes de crête. Leçon « Puissance en régime sinusoïdal »." },
      ligne: { prompt: "Deux installations reçoivent la même puissance moyenne sous la même tension. La seconde est très inductive. Pourquoi la ligne qui l'alimente chauffe-t-elle davantage ?",
        options: { a: "Parce que sa réactance consomme de la puissance en moyenne.", b: "Parce qu'elle appelle un courant efficace plus grand, P/(U_eff cos φ), et que la ligne dissipe r I_eff².", c: "Parce que la tension y est plus élevée.", d: "Elle ne chauffe pas davantage : seule la puissance moyenne compte." },
        why: "La réactance ne consomme rien à ses bornes, mais le courant qu'elle appelle traverse la résistance de la ligne. Les pertes croissent comme 1/cos² φ. Leçon « Puissance en régime sinusoïdal »." },
      r2r: { prompt: "Une échelle de résistances R en série et 2R en dérivation est fermée sur 2R. Quelle impédance présente-t-elle à son entrée, et que devient la tension d'un nœud au suivant ?",
        options: { a: "R(1 + √5)/2, et la tension diminue du nombre d'or.", b: "3R, et la tension diminue d'un tiers.", c: "2R, et la tension est divisée par deux exactement.", d: "Elle dépend du nombre de cellules." },
        hint: "Mettez z1 = R et z2 = 2R dans (22.27).",
        why: "z0 = R/2 + √(R²/4 + 2R²) = 2R : l'échelle fermée sur 2R est déjà son propre z0, et α = (z0 \u2212 z1)/z0 = ½. C'est le convertisseur R–2R. Leçon « Réseau en échelle »." },
      absorbe: { prompt: "Une échelle infinie de bobines et de condensateurs idéaux présente, sous sa coupure, une impédance réelle. Qu'en conclure ?",
        options: { a: "C'est une erreur de calcul : un réseau de bobines et de condensateurs a toujours une impédance imaginaire.", b: "Les bobines dissipent un peu d'énergie.", c: "L'énergie revient au générateur une demi-période plus tard.", d: "Elle absorbe de l'énergie en continu, qui part le long de l'échelle sans jamais revenir." },
        why: "Chaque cellule passe l'énergie à la suivante ; une infinité de cellules l'emporte sans fin, comme une antenne qui rayonne. Une échelle finie ouverte au bout, elle, renvoie tout. Leçon « Réseau en échelle »." },
      phase: { prompt: "Une échelle L-C passe-bas, fermée sur son impédance caractéristique, est attaquée à la moitié de sa pulsation de coupure. Le déphasage par cellule vaut alors \u221260°. Que vaut la tension à la sortie de la sixième cellule ?",
        options: { a: "Elle est nulle.", b: "Elle a la même amplitude et la même phase que la tension d'entrée.", c: "Elle a la même amplitude, en opposition de phase.", d: "Son amplitude est divisée par 2⁶." },
        hint: "Sous la coupure, |α| = 1.",
        why: "α = e^(\u2212iπ/3) ; six cellules donnent α⁶ = e^(\u22122iπ) = 1. L'amplitude ne change pas sous la coupure et le retard total vaut exactement une période. Leçon « Filtres passifs »." },
      lissage: { prompt: "Une cellule L-C (L = 0,1\u00a0H, C = 1000\u00a0µF) lisse une tension redressée double alternance à 50\u00a0Hz ; elle divise par environ 40 l'harmonique à 100\u00a0Hz. On ajoute une seconde cellule identique. Par combien l'ondulation est-elle à peu près divisée en plus ?",
        options: { a: "Par 2", b: "Par 4", c: "Par environ 40", d: "Par environ 1600" },
        hint: "Loin au-dessus de la coupure, chaque cellule multiplie l'harmonique par |α| ≈ 1/(ω²LC).",
        why: "À 100\u00a0Hz, 1/(ω²LC) ≈ 1/39 : chaque cellule ajoutée apporte à peu près ce facteur. Deux cellules ensemble divisent par environ 1600 par rapport à l'absence de filtre, une seule de plus par environ 40. La composante continue passe entière. Leçon « Filtres passifs »." },
      court: { prompt: "Deux bobines de 10\u00a0mH sont couplées par M = 8\u00a0mH. On court-circuite le secondaire. Que voit le générateur branché sur le primaire, à 1\u00a0kHz ?",
        options: { a: "Une impédance infinie.", b: "Un court-circuit parfait.", c: "La même bobine de 10\u00a0mH qu'avant.", d: "Une inductance réduite à L1(1 \u2212 M²/(L1L2)) = 3,6\u00a0mH, soit environ 22,6\u00a0Ω." },
        hint: "Dans (22.35a), prenez zc = 0.",
        why: "z = iωL1 + ω²M²/(iωL2) = iω(L1 \u2212 M²/L2) = iω × 3,6\u00a0mH. Le courant du secondaire crée un flux opposé qui réduit l'inductance vue du primaire. Leçon « Autres éléments de circuit »." },
      oscille: { prompt: "Un circuit L, C de résistance R est fermé sur un amplificateur qui se comporte, pour de petits signaux, comme une résistance \u2212r. À quelle condition une oscillation démarre-t-elle d'elle-même, et qu'est-ce qui fixe son amplitude ?",
        options: { a: "Il faut r > R ; l'amplitude est fixée par la non-linéarité de l'amplificateur, qui affaiblit sa résistance négative aux grands signaux.", b: "Il faut r < R ; l'amplitude est fixée par la tension d'alimentation.", c: "Il faut r = R exactement ; l'amplitude est celle du bruit de départ.", d: "Il faut que la résistance totale soit positive ; l'amplitude dépend de C seul." },
        why: "Avec R \u2212 r < 0, la moindre perturbation croît en e^((r \u2212 R)t/2L). Le modèle linéaire ne s'arrête jamais ; c'est la saturation de l'élément actif qui stabilise l'amplitude, indépendamment du départ. Leçon « Autres éléments de circuit »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

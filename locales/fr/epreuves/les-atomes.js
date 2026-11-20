/* Épreuve de l'étape « Les atomes » : textes en français. Une autre langue = locales/<langue>/epreuves/les-atomes.js, mêmes clés.
   Texte seulement : les bonnes réponses sont dans /epreuves/les-atomes.json. */
(function (root) {
  const T = {
    "epreuve.items": {
      gaz: { prompt: "Air à 293\u00a0K sous 10⁵\u00a0Pa. Le modèle P = n*k_BT donne la densité n* de molécules. Que valent n* et la distance moyenne entre molécules, et que justifie ce nombre ?",
        options: { a: "n* ≈ 6\u00a0×\u00a010²³\u00a0m⁻³ ; une distance d'environ 10⁻⁸\u00a0m.", b: "n* ≈ 2,5\u00a0×\u00a010²⁵\u00a0m⁻³ ; une distance d'environ 3\u00a0nm, dix à vingt fois la taille d'une molécule : leur volume propre est négligeable.", c: "n* ≈ 2,5\u00a0×\u00a010²⁵\u00a0m⁻³ ; une distance d'environ 0,3\u00a0nm : les molécules se touchent.", d: "n* ≈ 2,5\u00a0×\u00a010²⁵\u00a0m⁻³ ; une distance de 1/n* ≈ 4\u00a0×\u00a010⁻²⁶\u00a0m." },
        hint: "k_B ≈ 1,38\u00a0×\u00a010⁻²³\u00a0J·K⁻¹ ; la distance moyenne est la racine cubique de 1/n*.",
        why: "n* = P/(k_BT) = 10⁵/(1,38\u00a0×\u00a010⁻²³ × 293) ≈ 2,5\u00a0×\u00a010²⁵\u00a0m⁻³ ; la racine cubique de son inverse donne 3,4\u00a0×\u00a010⁻⁹\u00a0m. Un atome mesure 1 à 2\u00a0×\u00a010⁻¹⁰\u00a0m : les molécules sont loin les unes des autres, et le gaz est presque parfait. Modèle du gaz et taille des atomes, leçon « Atomes en mouvement » ; racine cubique d'un volume, leçon « Les petites distances »." },
      parfait: { prompt: "Quand le modèle P = n*k_BT cesse-t-il de bien décrire un gaz réel ?",
        options: { a: "À haute température, quand les chocs deviennent trop violents.", b: "Jamais : c'est une loi exacte, vérifiée par la simulation.", c: "Dès que la pression dépasse 10⁵\u00a0Pa d'un pour cent.", d: "Quand les molécules sont assez serrées pour que leur attraction et leur volume propre comptent : gaz dense, près de la liquéfaction." },
        hint: "Quelles hypothèses cache le modèle ?",
        why: "Le modèle cache deux hypothèses : ni attraction, ni volume propre. Elles valent tant que la distance entre molécules est grande devant leur taille et que l'agitation domine l'attraction. Près de la condensation, l'attraction abaisse la pression ; très comprimé, le volume propre l'augmente. Leçons « Atomes en mouvement » et « Processus atomiques »." },
      vapeur: { prompt: "Dans un bocal fermé, l'eau est en équilibre avec sa vapeur à 293\u00a0K. On passe à 303\u00a0K. La quantité de vapeur d'équilibre est multipliée par environ…",
        options: { a: "1,8.", b: "1,03.", c: "1,3.", d: "10." },
        hint: "Le flux de départs suit exp(\u2212L_m/RT), avec L_m ≈ 44\u00a0kJ·mol⁻¹ et R ≈ 8,31\u00a0J·mol⁻¹·K⁻¹.",
        why: "Les départs suivent le facteur de Boltzmann : exp[(44\u202f000/8,31)(1/293 \u2212 1/303)] ≈ 1,8, environ 6\u00a0% par kelvin. Les retours suivent la quantité de vapeur, qui grandit jusqu'à les égaler. Raisonner comme pour un gaz en quantité fixée, P ∝ T, ne donnerait que 3\u00a0%. Leçons « Processus atomiques » et « Atomes en mouvement »." },
      soupe: { prompt: "Souffler sur une soupe la refroidit. Que fait le souffle, à l'échelle des molécules ?",
        options: { a: "Il augmente le nombre de molécules qui quittent la surface.", b: "Il apporte de l'air froid ; c'est le seul effet.", c: "Il chasse la vapeur avant que les molécules reviennent : les départs, qui emportent chacun plus que l'énergie moyenne, ne sont plus compensés.", d: "Il ralentit directement les molécules de la surface par les chocs de l'air." },
        hint: "De quoi dépend le nombre de départs ? Et celui des retours ?",
        why: "Le nombre de départs ne dépend que de la surface et de la température. Partent les molécules qui ont reçu le plus d'énergie ; dans un bocal fermé, les retours rendent cette énergie. En chassant la vapeur, on supprime les retours : le liquide perd ses molécules les plus agitées et refroidit. Leçon « Processus atomiques » ; la chaleur comme agitation, leçon « Atomes en mouvement »." },
      balance: { prompt: "La combustion d'une mole de carbone libère 393,5\u00a0kJ et forme 44\u00a0g de CO₂. Une balance précise à 10⁻⁶ en relatif verrait-elle la masse emportée par cette énergie ?",
        options: { a: "Oui : 393,5\u00a0kJ, c'est beaucoup d'énergie.", b: "Non : ΔE/c² ≈ 4\u00a0×\u00a010⁻¹²\u00a0kg sur 44\u00a0g, soit 10⁻¹⁰, dix mille fois sous sa précision.", c: "Non : en chimie, la masse se conserve exactement.", d: "Oui : la masse augmente, puisque l'oxygène s'ajoute au carbone." },
        hint: "Δm = ΔE/c², avec c ≈ 3,0\u00a0×\u00a010⁸\u00a0m·s⁻¹.",
        why: "393,5\u00a0×\u00a010³/(3,0\u00a0×\u00a010⁸)² ≈ 4,4\u00a0×\u00a010⁻¹²\u00a0kg, soit 10⁻¹⁰ des 44\u00a0g. « La masse se conserve » est une loi approchée, exacte à mieux que toute balance : c'est le statut de toute loi, selon la leçon « Atomes en mouvement ». Chiffres de la note de validité de la leçon « Réactions chimiques »." },
      monoxyde: { prompt: "Dans un moteur, une partie du carbone s'arrête en CO au lieu de CO₂. Former CO libère 110,5\u00a0kJ par mole de carbone, CO₂ 393,5\u00a0kJ. Quelle part de l'énergie de la combustion complète obtient-on pour ce carbone ?",
        options: { a: "Toute : l'énergie se conserve.", b: "La moitié, puisqu'il manque un oxygène sur deux.", c: "72\u00a0%.", d: "28\u00a0% ; les 283\u00a0kJ restants sont encore dans le CO, qui peut capter un second oxygène." },
        hint: "Le bilan ne dépend que des états initial et final.",
        why: "110,5/393,5 ≈ 0,28. Le bilan ne dépend que des états initial et final (loi de Hess) : C → CO → CO₂ libère au total 110,5 + 283 = 393,5\u00a0kJ. L'énergie n'est pas détruite, elle reste dans le CO rejeté. Leçon « Réactions chimiques »." },
      equilibre: { prompt: "Un cristal de sel repose des semaines dans une solution saturée. Sa masse ne change pas, mais sa forme se modifie. Comment est-ce possible ?",
        options: { a: "L'équilibre est dynamique : des ions quittent le cristal et d'autres s'y redéposent en nombre égal, mais pas aux mêmes endroits.", b: "C'est impossible : à saturation, plus rien ne bouge.", c: "L'eau use le cristal sans le dissoudre.", d: "Des molécules de NaCl entières glissent à la surface du cristal." },
        hint: "Saturé veut-il dire « sans échanges » ?",
        why: "Saturé veut dire départs = retours, pas absence d'échanges : rien ne bouge à notre échelle, tout bouge à celle des ions. Et il n'y a pas de molécule NaCl dans le cristal : chaque ion a six voisins de l'autre espèce. Leçon « Processus atomiques » ; le mouvement perpétuel des atomes, leçon « Atomes en mouvement »." },
      etats: { prompt: "Dans la simulation de 125 molécules d'eau, on chauffe : solide, puis goutte, puis vapeur. Qu'est-ce qui change d'un état à l'autre ?",
        options: { a: "La taille des molécules, qui grossissent à chaud.", b: "L'attraction entre molécules, qui disparaît à chaud.", c: "L'agitation des molécules face à leur attraction : faible, elles vibrent sur place ; plus forte, elles glissent en restant groupées ; plus forte encore, elles se séparent.", d: "Au froid, les molécules s'arrêtent complètement ; au chaud, elles se mettent à bouger." },
        hint: "Les règles de la simulation ne changent pas avec la température.",
        why: "Les règles restent les mêmes : mouvement perpétuel, attraction à petite distance, répulsion au contact. Seule l'agitation, la température, change face à l'attraction. Même au zéro absolu, la vibration garde un minimum non nul. Leçon « Atomes en mouvement » ; une molécule qui s'arrache à l'attraction, c'est l'évaporation de la leçon « Processus atomiques »." }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

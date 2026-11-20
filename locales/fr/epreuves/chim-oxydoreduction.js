/* Épreuve de l'étape « Oxydoréduction » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      electrons: { prompt: "L'ion dichromate Cr₂O₇²⁻ est réduit en ions Cr³⁺ en milieu acide. Combien d'électrons capte chaque ion dichromate ?",
        options: { a: "6 : deux atomes de chrome passent chacun de +VI à +III.", b: "3 : le chrome passe de +VI à +III.", c: "14 : autant que d'ions H⁺ dans la demi-équation.", d: "7 : autant que d'atomes d'oxygène." },
        hint: "Électrons = atomes qui changent × variation du nombre d'oxydation.",
        why: "2 × (6 \u2212 3) = 6. La charge le confirme : Cr₂O₇²⁻ + 14\u00a0H⁺ + 6\u00a0e⁻ = 2\u00a0Cr³⁺ + 7\u00a0H₂O, \u22122 + 14 \u2212 6 = +6 à gauche et à droite. Leçon « Nombres d'oxydation et équilibrage »." },
      basique: { prompt: "La demi-équation MnO₄⁻ + 8 H⁺ + 5 e⁻ = Mn²⁺ + 4 H₂O, réécrite en milieu basique, devient :",
        options: { a: "MnO₄⁻ + 8 HO⁻ + 5 e⁻ = Mn²⁺ + 4 H₂O", b: "MnO₄⁻ + 4 H₂O + 5 e⁻ = Mn²⁺ + 8 HO⁻", c: "MnO₄⁻ + 4 H₂O = Mn²⁺ + 8 HO⁻ + 5 e⁻", d: "MnO₄⁻ + 5 e⁻ = Mn²⁺ + 4 O²⁻" },
        hint: "Ajoutez 8 HO⁻ aux deux membres.",
        why: "8 H⁺ + 8 HO⁻ donnent 8 H₂O à gauche, dont 4 se simplifient avec la droite ; 8 HO⁻ restent à droite. Les électrons ne changent ni de nombre ni de côté. L'écriture est formelle : en milieu basique, le produit réel est MnO₂. Leçon « Nombres d'oxydation et équilibrage »." },
      nernst: { prompt: "Une lame d'argent plonge dans une solution d'ions Ag⁺ à 1,0 × 10⁻³\u00a0mol·L⁻¹, à 298\u00a0K. E°(Ag⁺/Ag) = 0,80\u00a0V. Son potentiel vaut :",
        options: { a: "0,80\u00a0V : un métal pur a une activité 1.", b: "0,71\u00a0V", c: "0,62\u00a0V", d: "0,98\u00a0V" },
        why: "E = 0,80 + 0,059 log(10⁻³) = 0,80 \u2212 0,18 = 0,62\u00a0V, avec n = 1. C'est l'argent métallique qui a une activité 1, pas les ions. À 10⁻³\u00a0mol·L⁻¹, une solution d'ions de charge 1 est assez diluée pour a = c/c°. Leçon « Piles, potentiel d'électrode et formule de Nernst »." },
      pile: { prompt: "Une pile associe Ag⁺/Ag (0,10\u00a0mol·L⁻¹, E° = 0,80\u00a0V) et Cu²⁺/Cu (0,10\u00a0mol·L⁻¹, E° = 0,34\u00a0V). Sa tension à vide et son pôle + :",
        options: { a: "0,46\u00a0V, le cuivre est le pôle +.", b: "1,14\u00a0V, l'argent est le pôle +.", c: "0,46\u00a0V, l'argent est le pôle \u2212.", d: "0,43\u00a0V, l'argent est le pôle +." },
        hint: "Calculez chaque potentiel par la formule de Nernst avant de faire la différence.",
        why: "E(Ag) = 0,80 + 0,059 log 0,1 = 0,74\u00a0V ; E(Cu) = 0,34 + 0,030 log 0,1 = 0,31\u00a0V. e = 0,43\u00a0V, l'argent au pôle +. La différence des E° seule donnerait 0,46\u00a0V : le facteur n, 1 pour l'argent et 2 pour le cuivre, ne joue pas de la même façon des deux côtés. Leçon « Piles, potentiel d'électrode et formule de Nernst »." },
      capacite: { prompt: "La pile précédente contient 50\u00a0mL d'ions Ag⁺ à 0,10\u00a0mol·L⁻¹ et du cuivre en excès. Sa capacité vaut environ :",
        options: { a: "482\u00a0C : un électron par ion Ag⁺, 5,0 × 10⁻³\u00a0mol.", b: "965\u00a0C : deux électrons par ion Ag⁺.", c: "241\u00a0C : un électron pour deux ions Ag⁺.", d: "48\u00a0C : la quantité d'ions Ag⁺ en millimoles fois 10." },
        why: "2\u00a0Ag⁺ + Cu = 2\u00a0Ag + Cu²⁺ : chaque ion Ag⁺ capte un électron. 5,0 × 10⁻³\u00a0mol d'électrons × 96\u202f485\u00a0C·mol⁻¹ ≈ 482\u00a0C, soit 0,13\u00a0A·h. Leçon « Piles, potentiel d'électrode et formule de Nernst »." },
      lgk: { prompt: "Le diiode oxyde le thiosulfate : I₂ + 2 S₂O₃²⁻ = 2 I⁻ + S₄O₆²⁻, avec E°(I₂/I⁻) = 0,54\u00a0V et E°(S₄O₆²⁻/S₂O₃²⁻) = 0,08\u00a0V. log K° vaut environ :",
        options: { a: "7,8", b: "15,6", c: "0,46", d: "31" },
        why: "n = 2 : log K° = 2 × 0,46/0,059 = 15,6. Avec n = 1, on trouverait 7,8 ; 0,46 est l'écart des E° en volts. La réaction est quasi totale : c'est le dosage iodométrique. Leçon « Prévoir une réaction d'oxydoréduction »." },
      dismut: { prompt: "Le fer(II) est l'oxydant du couple Fe²⁺/Fe (\u22120,44\u00a0V) et le réducteur du couple Fe³⁺/Fe²⁺ (0,77\u00a0V). Une solution d'ions Fe²⁺, à l'abri de l'air :",
        options: { a: "se dismute en fer et en ions Fe³⁺, log K° = 41.", b: "se dismute à moitié.", c: "ne se dismute pas : c'est l'inverse, Fe³⁺ et Fe se médiamutent en Fe²⁺, log K° = 41.", d: "oxyde l'eau en dioxygène." },
        hint: "Comparez la position de Fe²⁺ oxydant et de Fe²⁺ réducteur sur l'échelle.",
        why: "Comme oxydant, Fe²⁺ est bas (\u22120,44\u00a0V) ; comme réducteur, haut (0,77\u00a0V). La dismutation a log K° = 2 × (\u22120,44 \u2212 0,77)/0,059 = \u221241 : elle ne se fait pas. La médiamutation 2\u00a0Fe³⁺ + Fe = 3\u00a0Fe²⁺ a log K° = +41. Leçon « Prévoir une réaction d'oxydoréduction »." },
      cinetique: { prompt: "Une réaction d'oxydoréduction a log K° = 30. Qu'en conclure ?",
        options: { a: "Elle est rapide.", b: "Elle est totale et rapide.", c: "Elle n'a lieu qu'en milieu acide.", d: "Si elle se fait, elle est quasi totale ; K° ne dit rien de sa vitesse." },
        why: "K° fixe l'état d'équilibre, pas le temps pour l'atteindre. Le permanganate sur l'eau a log K° = 95 et reste lent ; sur Fe²⁺, log K° = 62 et il est rapide. La vitesse se lit sur « Courbes intensité-potentiel et surtensions ». Leçon « Prévoir une réaction d'oxydoréduction »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);

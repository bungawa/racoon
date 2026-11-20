/* Épreuve de l'étape « Énergie du champ et vecteur de Poynting » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      global: { prompt: "Une théorie propose qu'une charge disparaisse en un point et réapparaisse au même instant à 3\u00a0m de là, sans rien entre les deux. Le total reste constant dans le référentiel du laboratoire. Pourquoi cette théorie est-elle inacceptable ?",
        options: { a: "Parce que la charge totale du monde changerait dans le laboratoire.", b: "Parce que pour un observateur en mouvement, les deux événements ne sont pas simultanés : il verrait la charge totale changer pendant le transfert.", c: "Parce qu'une charge ne peut pas aller plus vite que la lumière, et 3\u00a0m prennent 10\u00a0ns.", d: "Elle est acceptable : la conservation globale suffit." },
        hint: "« Au même instant » en deux lieux éloignés : pour qui ?",
        why: "La simultanéité dépend de l'observateur. Pour un référentiel qui défile, la charge apparaît d'un côté avant de partir de l'autre, ou l'inverse, et le total n'est plus constant. Seule une loi locale, (27.1), est la même pour tous. Leçon « Conservation locale »." },
      transit: { prompt: "Dans le référentiel mobile, comment le modèle où la charge voyage par un fil garde-t-il un total constant ?",
        options: { a: "La charge du fil est négligeable devant celle des deux points.", b: "Le fil ralentit la charge jusqu'à ce que les deux instants coïncident.", c: "Le total n'est constant que si le fil est infiniment court.", d: "La charge en transit, comptée avec le terme vj/c² de la densité vue en mouvement, compense exactement l'avance ou le retard aux deux bouts." },
        why: "Vue du référentiel mobile, la densité de charge vaut γ(ρ \u2212 vj_x/c²). Avec ce terme, la charge comptée dans le fil à un instant t′ comble l'écart entre les deux bouts, pour toute vitesse inférieure à c. Leçon « Conservation locale »." },
      bilan: { prompt: "Une boîte ne contient que du vide. Une impulsion lumineuse de 470\u00a0nJ par mètre carré y entre, puis en ressort entière. Que vaut, une fois l'impulsion passée, le flux de S intégré dans le temps sur les parois ?",
        options: { a: "Zéro : il est entré autant d'énergie qu'il en est sorti, et rien n'a été cédé à la matière.", b: "470\u00a0nJ par mètre carré, l'énergie de l'impulsion.", c: "\u2212470\u00a0nJ par mètre carré.", d: "On ne peut pas le dire sans connaître la forme de l'impulsion." },
        why: "Dans le vide, E·j = 0. La boîte est vide au début et à la fin : par (27.4), la sortie nette est nulle. Leçon « Conservation de l'énergie et électromagnétisme »." },
      pile: { prompt: "Un circuit simple : une pile débite dans une résistance. Où le terme E·j est-il négatif ?",
        options: { a: "Dans la résistance.", b: "Nulle part : il est toujours positif.", c: "Dans la pile, où la matière pousse les charges contre le champ et cède de l'énergie au champ.", d: "Dans les fils de connexion, s'ils sont parfaits." },
        hint: "E·j est la puissance que le champ cède à la matière, par unité de volume.",
        why: "Dans la pile, le courant remonte le champ : E·j < 0, la matière fournit l'énergie au champ. Dans la résistance, E·j > 0. Dans des fils parfaits, E = 0 et E·j = 0. Entre la pile et la résistance, l'énergie voyage par S, dans l'espace autour des fils. Leçons « Conservation de l'énergie et électromagnétisme » et « Densité et flux d'énergie du champ électromagnétique »." },
      identite: { prompt: "Pour trouver S, on doit écrire E·(∇ ∧ B) comme une divergence. Que vaut ∇·(B ∧ E) ?",
        options: { a: "E·(∇ ∧ B) \u2212 B·(∇ ∧ E).", b: "E·(∇ ∧ B), par la règle du produit mixte.", c: "B·(∇ ∧ E) \u2212 E·(∇ ∧ B).", d: "Zéro, car la divergence d'un produit vectoriel est nulle." },
        why: "La dérivée agit sur B et sur E : (27.11). Le terme \u2212B·(∇ ∧ E) devient, par la loi de Faraday, la dérivée de l'énergie magnétique ε0c²B²/2. Leçon « Densité et flux d'énergie du champ électromagnétique »." },
      laser: { prompt: "Un faisceau laser de 1\u00a0W est concentré sur 1\u00a0mm². Quelle est la densité d'énergie moyenne du champ dans le faisceau ?",
        options: { a: "Environ 1\u00a0J·m⁻³.", b: "Environ 3,3 × 10⁻³\u00a0J·m⁻³.", c: "Environ 3 × 10⁵\u00a0J·m⁻³.", d: "Environ 10⁶\u00a0J·m⁻³." },
        hint: "Pour une onde qui va dans une seule direction, S = cu.",
        why: "S = 1\u00a0W/10⁻⁶\u00a0m² = 10⁶\u00a0W·m⁻², et u = S/c = 10⁶/(3 × 10⁸) ≈ 3,3 × 10⁻³\u00a0J·m⁻³. Peu d'énergie par volume, mais elle passe à la vitesse de la lumière. (27.15e) de « Densité et flux d'énergie du champ électromagnétique »." },
      fil: { prompt: "Un fil résistif est parcouru par un courant continu. Par où l'énergie dissipée dans le fil y entre-t-elle, selon (27.15) ?",
        options: { a: "Par les extrémités du fil, le long de son axe.", b: "Elle ne vient de nulle part : elle est créée dans le fil.", c: "Par la surface latérale du fil, depuis le champ qui l'entoure : S pointe vers l'axe.", d: "Par le centre du fil, d'où elle diffuse vers la surface." },
        why: "E est le long du fil, B tourne autour : E ∧ B pointe vers l'axe. Le flux de S à travers la surface latérale égale la puissance RI² dissipée. Poynting l'a montré en 1884. Leçons « Densité et flux d'énergie du champ électromagnétique » et « Inductance et énergie magnétique »." },
      reflexion: { prompt: "Une onde plane frappe une surface qui en réfléchit 36\u00a0% de la puissance, donc une amplitude relative r = 0,6. Devant la surface, à quelle vitesse moyenne l'énergie avance-t-elle ?",
        options: { a: "c, comme toute onde électromagnétique.", b: "0,4c.", c: "0,64c.", d: "Environ 0,47c." },
        hint: "⟨S⟩/⟨u⟩ = c(1 \u2212 r²)/(1 + r²).",
        why: "(1 \u2212 0,36)/(1 + 0,36) = 0,64/1,36 ≈ 0,47. Le flux net est la différence des deux ondes, la densité leur somme. Leçon « Densité et flux d'énergie du champ électromagnétique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

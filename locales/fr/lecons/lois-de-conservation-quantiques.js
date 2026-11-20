/* Leçon « Les lois de conservation quantiques » (Feynman III.17.3) : textes en français.
   Une autre langue = locales/<langue>/lecons/lois-de-conservation-quantiques.js, mêmes clés.
   Texte seulement : années, types d'événement, bonnes réponses et identifiants restent dans la page. */
(function (root) {
  const T = {
    "title": "Les lois de conservation quantiques",
    "crumb.jour": "Les lois de conservation",
    "h1": "Les lois de conservation quantiques",
    "lede": "Énergie, quantité de mouvement, moment cinétique : trois lois de conservation, trois symétries. En mécanique quantique, chacune est la phase que prend un état quand on le décale dans le temps, dans l'espace ou en angle. Pourquoi ces phases sont-elles justement l'énergie, l'impulsion et le moment cinétique ?",
    "tag.piste": "Physique quantique",
    "tag.prereq": "Prérequis : symétrie et conservation",

    "s1.sec": "1 · Trois décalages, trois phases",
    "s1.h2": "Les états qu'un décalage ne fait que déphaser",
    "s1.p1": "Le système : un système isolé, dont les lois ne changent pas si on le déplace, si on attend, ou si on le tourne. Par « Symétrie et conservation », un état qu'un de ces décalages ne fait que multiplier par une phase garde cette phase. Pour une translation de <var>a</var> selon <var>x</var>, la phase doit être proportionnelle à <var>a</var>, puisque deux translations s'ajoutent et que leurs phases se multiplient :",
    "val.17.23": "Exacte pour un système invariant par translation selon <var>x</var> : vide, ou cristal pour des <var>a</var> multiples du pas. Le signe dépend de ce qu'on décale, les axes ou le système ; (17.23) fixe une convention, qu'il faut garder ensuite.",
    "val.17.24": "Exacte pour un système dont les lois ne dépendent pas du temps ; le signe \u2212 est une convention, choisie pour que ħω soit l'énergie.",
    "val.17.22": "Exacte pour un système invariant par rotation autour de <var>z</var>. Un tour complet doit redonner l'état à un signe près : 2<var>m</var> est entier.",
    "s1.p2": "ħ<var>k</var>, ħω et <var>m</var>ħ sont conservés. Reste à les reconnaître : ce sont la quantité de mouvement, l'énergie et le moment cinétique, parce que ces nombres se comportent comme eux dans la limite classique. Pour l'énergie, c'est la définition même du hamiltonien.",

    "s2.sec": "2 · Les opérateurs",
    "s2.h2": "Un petit décalage définit un opérateur",
    "s2.p1": "Un décalage très petit diffère de 1 par un terme proportionnel au décalage. Le coefficient est un opérateur, et c'est lui qu'on appelle énergie, impulsion ou moment cinétique :",
    "val.17.26": "Approximation : au premier ordre en Δ<var>t</var> ; c'est la définition de <var>Ĥ</var> comme générateur des décalages dans le temps.",
    "val.17.27": "Approximation : au premier ordre en Δ<var>x</var> ; définition de l'opérateur <var>p̂</var><sub>x</sub>. Un état de (17.23) le multiplie par ħ<var>k</var>.",
    "val.17.29": "Exacte pour un état de (17.22) : <var>Ĵ</var><sub>z</sub>, défini par une petite rotation comme <var>p̂</var><sub>x</sub> par une petite translation, a la valeur propre <var>m</var>ħ.",
    "s2.p2": "Le même schéma vaut pour toute symétrie continue : son générateur est conservé. Pour une symétrie discrète, comme la parité, il n'y a pas de petit décalage ni d'opérateur générateur ; seule la phase, ±1, est conservée.",

    "s3.sec": "3 · Un anneau d'atomes",
    "s3.h2": "Décaler d'un site",
    "s3.p1": "Prenons l'anneau de <var>N</var> atomes de « Un électron dans un réseau », d'énergie \u22122<var>A</var> cos <var>kb</var>. On décale le système d'un site : un état d'énergie définie est multiplié par une phase, qui donne <var>k</var>, donc ħ<var>k</var>. Mélangez-y l'état voisin : l'état n'a plus de <var>k</var> défini.",
    "fig.aria": "Énergies des états d'un anneau de N atomes en fonction de kb, avec l'état choisi",
    "fig.legend.e": "les N états, E = \u22122A cos kb",
    "fig.legend.sel": "état choisi",
    "fig.N": "Nombre d'atomes N",
    "fig.k": "Indice de l'état",
    "fig.s": "Part de l'état voisin mélangé",
    "fig.x": "kb (rad)",
    "fig.y": "E / A",
    "fig.k.phase": "Phase prise dans un décalage d'un site",
    "fig.f.phase": "attendue : {a}°",
    "fig.k.ecart": "Écart à un état propre du décalage",
    "fig.f.propre": "nul : k est défini",
    "fig.f.non": "non nul : pas de k défini",
    "fig.k.p": "ħ<var>k</var>",
    "fig.f.p": "pour un pas b = {b}",
    "fig.caption": "Ici on décale le système, pas les axes : la phase est e<sup>\u2212<var>i</var><var>kb</var></sup>, l'inverse de (17.23). Les <var>N</var> valeurs de <var>kb</var> sont 2π<var>j</var>/<var>N</var>, ramenées entre \u2212π et π : sur un réseau, <var>k</var> n'est défini qu'à 2π/<var>b</var> près. Mélanger deux états de <var>k</var> différents donne un état qu'aucune phase ne décrit.",
    "s3.p2": "Dans un cristal, la symétrie n'est que pour des translations d'un nombre entier de pas : <var>k</var> est conservé, mais seulement à 2π/<var>b</var> près. C'est la quantité de mouvement « cristalline », conservée dans les collisions d'un électron avec un réseau parfait.",

    "hist.sec": "Histoire et pratique",
    "hist.h2": "Symétries, lois de conservation et leurs failles",
    "hist.intro": "Les trois grandes lois de conservation se lisent comme des symétries ; l'expérience a montré qu'une autre symétrie, la parité, ne vaut pas partout.",
    "hist.events": {
      noether: { who: "Emmy Noether", what: "démontre qu'à chaque symétrie continue d'une théorie correspond une grandeur conservée.", context: "« Invariante Variationsprobleme », Nachrichten de Göttingen." },
      beth: { who: "Richard Beth", what: "mesure le moment cinétique transporté par la lumière polarisée circulairement, en accord avec ħ par photon.", context: "Physical Review, vol. 50 : le moment cinétique de (17.29) se mesure sur un faisceau, voir « La lumière polarisée en amplitudes »." },
      wu: { who: "Chien-Shiung Wu et ses collaborateurs", what: "observent que l'interaction faible ne respecte pas la parité.", context: "Une symétrie discrète peut tomber là où les symétries continues d'espace et de temps tiennent." },
    },
    "uses.h3": "Toujours à l'œuvre aujourd'hui",
    "uses.tag": "Usage",
    "uses.items": {
      cristal: { name: "Diffusion dans les cristaux", text: "Dans les expériences de diffusion de neutrons ou de rayons X, la conservation de ħ<var>k</var> à un vecteur du réseau près fixe les directions où l'on observe des pics : c'est la loi de Bragg vue comme une loi de conservation." },
      particules: { name: "Bilans en physique des particules", text: "Énergie, quantité de mouvement et moment cinétique se conservent dans toutes les réactions observées ; on s'en sert pour reconstruire les particules invisibles, comme les neutrinos, à partir de ce qui manque au bilan." },
    },

    "quiz.sec": "Vérifiez votre compréhension",
    "quiz.h2": "Quiz",
    "quiz.items": {
      phase: { prompt: "Pourquoi la phase prise dans une translation de a doit-elle être proportionnelle à a ?",
        options: { a: "Par convention.", b: "Parce que deux translations a et a′ font une translation a + a′, et que leurs phases se multiplient : seule une phase linéaire en a le permet.", c: "Parce que a est petit.", d: "Parce que l'état est réel." },
        why: "Pour deux longueurs u et w, e^(iφ(u)) e^(iφ(w)) = e^(iφ(u + w)) impose φ(u) + φ(w) = φ(u + w), donc φ(u) = ku." },
      energie: { prompt: "Quelle symétrie garantit la conservation de l'énergie ?",
        options: { a: "La rotation.", b: "La parité.", c: "La translation dans l'espace.", d: "L'invariance des lois dans le temps : décaler l'expérience d'une durée τ ne change rien." },
        why: "Un état d'énergie définie prend la phase e^(\u2212iωτ) dans un décalage de τ ; si les lois ne dépendent pas du temps, cette phase, donc l'énergie ħω, se conserve." },
      m: { prompt: "Un état prend la phase e^(2iφ) dans une rotation de φ autour de z. Que vaut sa composante Jz ?",
        options: { a: "2ħ.", b: "ħ/2.", c: "0.", d: "\u22122ħ." },
        why: "(17.22) avec m = 2 : Jz = mħ = 2ħ, (17.29)." },
      sup: { prompt: "Dans la figure, on mélange deux états de k différents. Pourquoi l'écart à un état propre du décalage n'est-il plus nul ?",
        options: { a: "Par une erreur d'arrondi.", b: "Parce que le décalage n'est plus une symétrie.", c: "Parce que les deux parties prennent des phases différentes : aucune phase unique ne décrit l'état décalé.", d: "Parce que l'énergie n'est plus conservée." },
        why: "Chaque composante est multipliée par sa propre phase. La symétrie tient toujours ; c'est l'état qui n'a pas de k défini. Sa quantité de mouvement moyenne reste conservée." },
      cristal: { prompt: "Dans un cristal de pas b, pourquoi k n'est-il conservé qu'à 2π/b près ?",
        options: { a: "Parce que les électrons sont lents.", b: "Parce que la symétrie n'est que pour des translations multiples de b : e^(ikb) ne change pas si k augmente de 2π/b.", c: "Parce que l'énergie n'est pas conservée.", d: "Il est conservé exactement." },
        why: "Seule la phase e^(ikb) est conservée. Deux k qui diffèrent de 2π/b donnent la même phase pour toutes les translations permises : la symétrie ne peut pas les distinguer." },
      signe: { prompt: "Dans la figure, la phase vaut \u2212kb alors que (17.23) écrit e^(+ika). Contradiction ?",
        options: { a: "Non : la page décale le système, (17.23) décale les axes ; décaler les axes de a revient à décaler le système de \u2212a.", b: "Oui : la page se trompe.", c: "Oui : (17.23) est approximative.", d: "Non : k est toujours négatif." },
        why: "Les deux conventions décrivent la même physique. L'important est de garder la même tout au long d'un calcul." },
    },

    "foot": "Source : Feynman, <i>Lectures on Physics</i>, vol. III, chap. 17, §17-3 (texte original en anglais). Notations SI. Noether : article « Noether's theorem » de Wikipédia en anglais. Beth, Physical Review 50, 115 (1936). Wu et collaborateurs : article « Parity (physics) » de Wikipédia en anglais. Calculs numériques propres à cette page.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

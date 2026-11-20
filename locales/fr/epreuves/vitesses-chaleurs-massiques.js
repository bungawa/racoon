/* Épreuve de l'étape « Vitesses moléculaires et chaleurs massiques » : textes en français. */
(function (root) {
  const T = {
    "epreuve.items": {
      queue: { prompt: "Dans un gaz à 300 K, 1 % des molécules qui traversent un plan vers le haut ont une composante v_z supérieure à u. Quelle est cette fraction à 600 K, pour le même u ?",
        options: { a: "2 % : elle double avec T.", b: "1,4 % : elle suit √T.", c: "10 % : e^(\u2212mu²/2k_BT) passe de e^(\u22124,6) à e^(\u22122,3).", d: "1 % : la fraction ne dépend que de u." },
        hint: "(40.4) : la fraction vaut e^(\u2212mu²/2k_BT).",
        why: "e^(\u2212a) = 0,01 donne a = ln 100 ≈ 4,6. Doubler T divise l'exposant par deux : e^(\u22122,3) = 0,1. Une queue exponentielle réagit beaucoup plus que les vitesses typiques, qui ne gagnent que √2. Leçon « Distribution des vitesses moléculaires »." },
      vitesses: { prompt: "À la même température, combien de fois la vitesse la plus probable du dihydrogène (2 g·mol⁻¹) dépasse-t-elle celle du dioxygène (32 g·mol⁻¹) ?",
        options: { a: "4 fois : √(32/2).", b: "16 fois : le rapport des masses.", c: "1 fois : même température, mêmes vitesses.", d: "2 fois : √(32/2)/2." },
        why: "v_p = √(2k_BT/m) : les vitesses sont en 1/√m. À même T, l'énergie cinétique moyenne est la même, pas la vitesse. Leçon « Distribution des vitesses moléculaires »." },
      forme: { prompt: "Chaque composante de la vitesse a sa valeur la plus probable en 0. Pourquoi la distribution des normes F(v) est-elle pourtant nulle en v = 0 ?",
        options: { a: "Parce que les molécules ne s'arrêtent jamais, à cause des chocs.", b: "Parce que (40.7) est fausse près de 0.", c: "Parce qu'une molécule immobile n'exerce pas de pression.", d: "Parce que les vitesses de norme v remplissent une coquille de volume 4πv² dv dans l'espace des vitesses, qui s'annule en v = 0." },
        why: "La densité (40.9) est maximale à l'origine de l'espace des vitesses, mais le nombre de vecteurs de norme comprise entre v et v + dv est proportionnel à v². D'où F(v) ∝ v² e^(\u2212mv²/2k_BT). Leçon « Distribution des vitesses moléculaires »." },
      chocs: { prompt: "On prépare un gaz dont toutes les molécules ont la même vitesse v₀, dans des directions au hasard, puis on le laisse évoluer par des chocs élastiques. Quel état final ?",
        options: { a: "Toutes les molécules gardent la vitesse v₀ : les chocs élastiques conservent l'énergie.", b: "La distribution de Maxwell, à la température T = mv₀²/3k_B fixée par l'énergie totale.", c: "Une distribution uniforme entre 0 et 2v₀.", d: "La moitié des molécules à l'arrêt, l'autre moitié à √2 v₀." },
        why: "Un choc conserve l'énergie totale mais la redistribue entre les deux molécules. Après quelques chocs par molécule, la distribution est celle de Maxwell, avec ⟨½mv²⟩ = ½mv₀² = (3/2)k_BT. Leçon « Distribution des vitesses moléculaires »." },
      eau: { prompt: "La vapeur d'eau est une molécule non linéaire de trois atomes. Que prévoit la physique classique pour γ si la molécule est rigide, et si elle vibre ?",
        options: { a: "4/3 rigide (f = 6) ; 1 + 2/12 ≈ 1,17 avec ses trois modes de vibration (f = 12).", b: "7/5 dans les deux cas.", c: "5/3 rigide ; 9/7 avec vibrations.", d: "4/3 dans les deux cas : la vibration ne compte pas en physique classique." },
        hint: "Translation 3, rotation 3 pour une molécule non linéaire, et 2 termes par mode de vibration (3r \u2212 6 modes).",
        why: "Rigide : 3 + 3 = 6 termes, γ = 1 + 2/6. Avec 3 × 3 \u2212 6 = 3 modes de vibration, 6 termes de plus : f = 12. En physique classique, une vibration compte toujours, quelle que soit la raideur. Leçon « Chaleurs massiques des gaz »." },
      azote: { prompt: "Le diazote (28 g·mol⁻¹) se comporte à température ordinaire comme une molécule rigide. Quelle est sa capacité thermique massique à volume constant ?",
        options: { a: "Environ 297 J·kg⁻¹·K⁻¹ : R/M.", b: "Environ 20,8 J·kg⁻¹·K⁻¹.", c: "Environ 742 J·kg⁻¹·K⁻¹ : (5/2)R/M.", d: "Environ 1 040 J·kg⁻¹·K⁻¹ : (7/2)R/M." },
        why: "C_V,m = (5/2)R = 20,8 J·mol⁻¹·K⁻¹, divisée par 0,028 kg·mol⁻¹. (7/2)R/M est la capacité à pression constante c_P, ou la valeur à volume constant si la vibration prenait sa part. Leçon « Chaleurs massiques des gaz »." },
      niveaux: { prompt: "À la température T = θ_vib d'une molécule (k_BT = ħω), combien de molécules sont au premier niveau excité de vibration pour 100 au niveau fondamental ?",
        options: { a: "100 : k_BT suffit à peupler le niveau.", b: "50.", c: "Aucune : la vibration est gelée.", d: "Environ 37 : e^(\u22121)." },
        why: "(40.11) : n₁/n₀ = e^(\u2212ħω/k_BT) = e^(\u22121) ≈ 0,37. À cette température, la vibration a déjà récupéré 92 % de sa capacité classique. Leçon « L'échec de la physique classique »." },
      iode: { prompt: "À 300 K, le diiode (θ_vib = 307 K) a γ proche de 9/7, le dihydrogène (θ_vib = 5 980 K) γ = 7/5. Quelle explication ?",
        options: { a: "Le diiode est plus lourd, donc ses molécules vont moins vite et se heurtent moins.", b: "Les niveaux de vibration du diiode sont serrés devant k_BT : sa vibration prend sa part classique. Ceux du dihydrogène sont vingt fois k_BT au-dessus : sa vibration est gelée.", c: "Le dihydrogène n'a pas de liaison qui vibre.", d: "Le diiode a plus d'électrons, qui prennent de l'énergie." },
        why: "Tout se joue sur x = θ_vib/T : 1 pour le diiode, 20 pour le dihydrogène. La physique classique ne voit pas cette différence ; les niveaux quantifiés, si. Leçon « L'échec de la physique classique »." },
    },
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else (root.LOCALES = root.LOCALES || {}).fr = Object.assign((root.LOCALES || {}).fr || {}, T);
})(typeof self !== "undefined" ? self : this);

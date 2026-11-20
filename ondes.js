/* Ondes — le module commun du monde « Ondes ». Pur, sans DOM (sauf jouer, qui sort un son dans le navigateur), UMD (global Ondes). SI partout.
   Ouvert par l'étape « Systèmes linéaires » ; les étapes suivantes du monde l'étendent (une section par étape, ajoutée
   à la fin, sans toucher aux précédentes). Dépendances : lecons/integration.js (Integ.rk4), lecons/complexes.js (Cx).
   Ce qui existe déjà n'est pas réécrit ici : oscillateur forcé, résonance, circuit RLC série (lecons/resonance.js,
   global Resonance), mouvement libre amorti (lecons/amortissement.js, global Amort), pulsations (lecons/oscillateur.js,
   global Osc). Chaque fonction est un modèle : son domaine est dans son commentaire.
   Les erreurs lèvent un message en français : elles signalent un appel faux.

   Systèmes linéaires (étape « Systèmes linéaires », Feynman I.25)
     MODELES                          les trois équations d'un oscillateur forcé que la page compare.
     acceleration(o)                  ẍ = a(x, ẋ) + f(t) : l'oscillateur o = { w0, Q, modele, kappa }.
     repondre(o, f, duree, n, x0, v0) la réponse x(t), ẋ(t) à la force par unité de masse f(t), pas à pas (RK4).
     ecartLinearite(o, f1, f2, a, b, duree, n)  écart entre la réponse à a f1 + b f2 et a x1 + b x2 (zéro si linéaire).
     transfertRLC(R, L, C, w)         u_C/e d'un circuit RLC série en régime sinusoïdal : le récepteur accordé.
     accord(L, f)                     la capacité qui accorde une bobine L sur la fréquence f.
     sortieRadio(R, L, C, stations, t)  u_C(t) sous plusieurs stations à la fois : somme des réponses à chacune.
     frottementSec(w0, d, x0)         le mouvement libre d'un oscillateur à frottement de Coulomb, exact.
     analogue(m, c, k, alpha, zeta)   le circuit RLC qui simule un oscillateur mécanique, avec changement d'échelle.
     mecanique(L, R, C, alpha, zeta)  l'inverse.
     dipole(type, valeur, w)          impédance complexe d'un dipôle idéal R, L ou C.
     serie(zs), parallele(zs)         (25.16) et (25.17).
     reseau(arbre, w)                 impédance d'un réseau série-parallèle décrit par un arbre.
     bouchon(R, L, C)                 bobine réelle (R, L) en parallèle sur C : pulsation où Z est réelle, et Z là. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Integ = node ? require("./lecons/integration.js") : root.Integ;
  const Cx = node ? require("./lecons/complexes.js") : root.Cx;

  const err = m => { throw new Error("ondes: " + m); };
  const finite = (v, name) => { if (typeof v !== "number" || !isFinite(v)) err(name + " doit être un nombre fini"); return v; };
  const positive = (v, name) => { finite(v, name); if (!(v > 0)) err(name + " doit être strictement positif"); return v; };
  const fonction = (f, name) => { if (typeof f !== "function") err(name + " doit être une fonction du temps"); return f; };

  /* ---------- étape « Systèmes linéaires » ---------- */

  /* Trois équations, γ = ω₀/Q :
       "lineaire"     ẍ + γẋ + ω₀²x = f(t)                      linéaire : (25.3) et (25.4) exactes ;
       "sinus"        ẍ + γẋ + ω₀² sin x = f(t)                 le pendule sans l'approximation sin x ≈ x ;
       "quadratique"  ẍ + γẋ + κ|ẋ|ẋ + ω₀²x = f(t)             un frottement fluide en v² en plus (κ en unité de x⁻¹).
     Les deux dernières ne sont linéaires que dans la limite des petits mouvements : x ≪ 1 rad, κ|ẋ| ≪ γ. */
  const MODELES = ["lineaire", "sinus", "quadratique"];
  function acceleration(o) {
    if (!o) err("oscillateur { w0, Q, modele }");
    const w0 = positive(o.w0, "ω₀"), g = w0 / positive(o.Q, "Q"), m = o.modele || "lineaire", w2 = w0 * w0;
    if (!MODELES.includes(m)) err("modèle inconnu « " + m + " » (" + MODELES.join(", ") + ")");
    const kappa = m === "quadratique" ? finite(o.kappa, "κ") : 0;
    if (kappa < 0) err("κ ≥ 0");
    if (m === "sinus") return (x, v) => -w2 * Math.sin(x) - g * v;
    if (m === "quadratique") return (x, v) => -w2 * x - g * v - kappa * Math.abs(v) * v;
    return (x, v) => -w2 * x - g * v;
  }
  /* la réponse à f(t) (force par unité de masse) depuis x₀, v₀ à t = 0 : n pas de Runge–Kutta d'ordre 4 sur [0, durée].
     Erreur relative ~ (ω₀h)⁴ par période : 10⁻⁸ avec 200 pas par période. Rend { t, x, v }, n + 1 échantillons. */
  function repondre(o, f, duree, n, x0, v0) {
    const a = acceleration(o); fonction(f, "f"); positive(duree, "durée");
    if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1");
    const h = duree / n, F = (t, y) => [y[1], a(y[0], y[1]) + f(t)];
    let y = [finite(x0 || 0, "x₀"), finite(v0 || 0, "v₀")];
    const T = [0], X = [y[0]], V = [y[1]];
    for (let j = 1; j <= n; j++) { y = Integ.rk4(F, (j - 1) * h, y, h); T.push(j * h); X.push(y[0]); V.push(y[1]); }
    return { t: T, x: X, v: V };
  }
  /* linéarité mise à l'épreuve : depuis le repos, x₁ répond à f₁, x₂ à f₂ (f₂ = null : x₂ = 0), x₁₂ à a f₁ + b f₂.
     ecart = max|x₁₂ − (a x₁ + b x₂)| / max|a x₁ + b x₂| sur [0, durée]. Nul (à l'arrondi du schéma près, < 10⁻¹²) pour le
     modèle linéaire, quels que soient a, b, f₁, f₂ : le schéma RK4 est lui-même linéaire en (x, v, f). */
  function ecartLinearite(o, f1, f2, a, b, duree, n) {
    fonction(f1, "f₁"); if (f2 != null) fonction(f2, "f₂"); finite(a, "a"); b = f2 == null ? 0 : finite(b, "b");
    const zero = () => 0, g2 = f2 || zero;
    const r1 = repondre(o, f1, duree, n), r2 = f2 ? repondre(o, g2, duree, n) : null;
    const r12 = repondre(o, t => a * f1(t) + b * g2(t), duree, n);
    let num = 0, den = 0;
    for (let j = 0; j <= n; j++) {
      const s = a * r1.x[j] + (r2 ? b * r2.x[j] : 0);
      num = Math.max(num, Math.abs(r12.x[j] - s)); den = Math.max(den, Math.abs(s));
    }
    if (den === 0) err("réponse nulle : rien à comparer");
    return { ecart: num / den, r1, r2, r12 };
  }

  /* le récepteur accordé : circuit RLC série attaqué par la force électromotrice e de l'antenne, sortie u_C.
     u_C/e = 1/(1 − LCω² + iRCω), ω > 0. Convention du cours : u(t) = Re(û e^(iωt)), un retard est un argument négatif ;
     retard ∈ [0, π] est le retard de u_C sur e. Exacte pour des dipôles linéaires en régime sinusoïdal établi. */
  function transfertRLC(R, L, C, w) {
    positive(R, "R"); positive(L, "L"); positive(C, "C"); positive(w, "ω");
    const H = Cx.div(Cx.c(1), Cx.c(1 - L * C * w * w, R * C * w));
    return { re: H.re, im: H.im, module: Cx.abs(H), retard: -Cx.arg(H) };
  }
  /* C = 1/(L(2πf)²) : la capacité qui place la pulsation propre 1/√(LC) sur 2πf */
  const accord = (L, f) => 1 / (positive(L, "L") * (2 * Math.PI * positive(f, "f")) ** 2);
  /* stations = [{ f, e0 }] : e(t) = Σ e₀ cos 2πft. Par superposition (25.8), u_C(t) = Σ |H| e₀ cos(2πft − retard),
     régime établi (transitoire éteint : t ≫ 2L/R). */
  function sortieRadio(R, L, C, stations, t) {
    if (!Array.isArray(stations) || !stations.length) err("stations = [{ f, e0 }]");
    finite(t, "t");
    return stations.reduce((s, st) => { const H = transfertRLC(R, L, C, 2 * Math.PI * st.f);
      return s + H.module * finite(st.e0, "e₀") * Math.cos(2 * Math.PI * st.f * t - H.retard); }, 0);
  }

  /* oscillateur à frottement sec (Coulomb, coefficients statique et dynamique égaux) lâché du repos en x₀ :
     ẍ + ω₀²x = −ω₀² d sgn ẋ, d = μ g/ω₀² (= μ m g/k) le demi-intervalle où le bloc peut rester au repos.
     Chaque demi-période π/ω₀ est une demi-oscillation harmonique autour de ±d : |x| perd 2d par demi-période, 4d par période
     (décroissance arithmétique, pas géométrique). Arrêt au premier point de rebroussement où |x| ≤ d. Exacte pour ce modèle ;
     un coefficient statique plus grand que le dynamique arrête le bloc plus tôt. d = 0 : oscillation harmonique sans fin. */
  function frottementSec(w0, d, x0) {
    positive(w0, "ω₀"); finite(d, "d"); if (d < 0) err("d ≥ 0"); finite(x0, "x₀");
    const demi = Math.PI / w0, arcs = [];
    if (d === 0) {
      const x = t => x0 * Math.cos(w0 * t), v = t => -x0 * w0 * Math.sin(w0 * t);
      return { d, demi, arcs: null, sommets: [{ t: 0, x: x0 }], tArret: Infinity, xFinal: null, x, v };
    }
    let x = x0;
    while (Math.abs(x) > d) { const s = Math.sign(x), A = Math.abs(x) - d; arcs.push({ c: s * d, A: s * A }); x = s * (2 * d - Math.abs(x)); }
    const N = arcs.length, xFinal = x, tArret = N * demi;
    const sommets = [{ t: 0, x: x0 }].concat(arcs.map((a, k) => ({ t: (k + 1) * demi, x: a.c - a.A })));
    const arc = t => Math.min(Math.floor(t / demi), N);
    const xt = t => { if (!(t >= 0)) err("t ≥ 0"); const k = arc(t); return k >= N ? xFinal : arcs[k].c + arcs[k].A * Math.cos(w0 * (t - k * demi)); };
    const vt = t => { if (!(t >= 0)) err("t ≥ 0"); const k = arc(t); return k >= N ? 0 : -arcs[k].A * w0 * Math.sin(w0 * (t - k * demi)); };
    return { d, demi, arcs, sommets, tArret, xFinal, x: xt, v: vt };
  }

  /* le calculateur analogique : m ẍ + c ẋ + k x = F simulé par L q̈ + R q̇ + q/C = u, avec deux changements d'échelle.
     alpha : le circuit va alpha fois plus vite (q(s) ∝ x(alpha·s), s le temps du circuit) ; zeta (Ω par kg·s⁻¹) : l'échelle des
     impédances, rapport (u/F)/(q/x). Alors L = zeta m/alpha², R = zeta c/alpha, C = 1/(zeta k). Q = √(mk)/c ne change pas :
     c'est un nombre sans dimension, il ne dépend d'aucune échelle. Exacte (même équation) ; les composants réels ajoutent
     leurs propres résistances, à compter dans R. */
  function analogue(m, c, k, alpha, zeta) {
    positive(m, "m"); finite(c, "c"); if (c < 0) err("c ≥ 0"); positive(k, "k"); positive(alpha, "α"); positive(zeta, "ζ");
    const w0 = Math.sqrt(k / m);
    return { L: zeta * m / (alpha * alpha), R: zeta * c / alpha, C: 1 / (zeta * k), w0m: w0, w0e: alpha * w0,
      Q: c > 0 ? Math.sqrt(m * k) / c : Infinity };
  }
  function mecanique(L, R, C, alpha, zeta) {
    positive(L, "L"); finite(R, "R"); if (R < 0) err("R ≥ 0"); positive(C, "C"); positive(alpha, "α"); positive(zeta, "ζ");
    return { m: L * alpha * alpha / zeta, c: R * alpha / zeta, k: 1 / (zeta * C) };
  }

  /* impédances complexes (û = Ẑ î), convention e^(iωt) : R → R, bobine → iLω, condensateur → 1/(iCω) = −i/(Cω).
     Exactes pour des dipôles idéaux en régime sinusoïdal établi ; un dipôle réel est un réseau de dipôles idéaux. */
  const TYPES = ["R", "L", "C"];
  function dipole(type, valeur, w) {
    if (!TYPES.includes(type)) err("dipôle inconnu « " + type + " » (R, L, C)");
    positive(valeur, type); positive(w, "ω");
    return type === "R" ? Cx.c(valeur) : type === "L" ? Cx.c(0, valeur * w) : Cx.c(0, -1 / (valeur * w));
  }
  /* (25.16) en série : les tensions s'ajoutent, même intensité : Ẑ = Σ Ẑₖ */
  function serie(zs) { if (!Array.isArray(zs) || !zs.length) err("série : au moins une impédance"); return zs.reduce((s, z) => Cx.add(s, z), Cx.c(0)); }
  /* (25.17) en parallèle : les intensités s'ajoutent, même tension : 1/Ẑ = Σ 1/Ẑₖ. Une branche d'impédance nulle court-circuite
     tout (Ẑ = 0) ; une somme d'admittances nulle (bouchon idéal à sa pulsation propre) donne Ẑ infini : erreur. */
  function parallele(zs) {
    if (!Array.isArray(zs) || !zs.length) err("parallèle : au moins une impédance");
    if (zs.some(z => z.re === 0 && z.im === 0)) return Cx.c(0);
    const Y = zs.reduce((s, z) => Cx.add(s, Cx.div(Cx.c(1), z)), Cx.c(0));
    if (Y.re === 0 && Y.im === 0) err("admittance nulle : impédance infinie");
    return Cx.div(Cx.c(1), Y);
  }
  /* arbre : ["R", 10] | ["L", 0.01] | ["C", 1e-7] | ["serie", a, b, …] | ["parallele", a, b, …] */
  function reseau(arbre, w) {
    if (!Array.isArray(arbre) || !arbre.length) err("arbre [type, …]");
    const [type, ...rest] = arbre;
    if (type === "serie") return serie(rest.map(a => reseau(a, w)));
    if (type === "parallele") return parallele(rest.map(a => reseau(a, w)));
    if (rest.length !== 1) err("dipôle [type, valeur]");
    return dipole(type, rest[0], w);
  }
  /* bobine réelle (L, résistance R du fil) en parallèle sur C : Ẑ = (R + iLω)/(1 − LCω² + iRCω).
     Ẑ réelle pour ω_a² = 1/(LC) − R²/L² (existe si R < √(L/C)), et là Ẑ = L/(RC), exactement.
     R = 0 : ω_a = 1/√(LC) et Ẑ infinie (rend Z = Infinity). */
  function bouchon(R, L, C) {
    finite(R, "R"); if (R < 0) err("R ≥ 0"); positive(L, "L"); positive(C, "C");
    const w2 = 1 / (L * C) - R * R / (L * L);
    if (!(w2 > 0)) return { w: null, Z: null };
    return { w: Math.sqrt(w2), Z: R === 0 ? Infinity : L / (R * C) };
  }

  /* ---------- étape « Le son et l'équation d'onde » (Feynman I.47) ----------
     Dépendances chargées à l'appel, par les pages de cette étape seulement : constantes.js (Constantes), thermo.js (Thermo).
     GAZ_SON, MESURES_SON                gaz parfaits { M (kg·mol⁻¹), gamma } et vitesses du son mesurées, pour comparer.
     celerite(gaz, T)                    (47.24) √(γRT/M), adiabatique (Laplace).   celeriteNewton(gaz, T)   √(RT/M), isotherme.
     vitesseQuadratique(gaz, T)          √(3RT/M) = √⟨v²⟩ des molécules (47.25).
     milieu(gaz, T, P)                   { rho, c, kappa = c², Z = ρc } du gaz au repos.
     P_REF, niveau(pEff), pressionEfficace(L)   (47.1) : niveau en dB d'une surpression efficace, et l'inverse.
     amplitudes(L, f, m)                 onde plane progressive sinusoïdale de niveau L (dB) et fréquence f dans le milieu m.
     libreParcours(T, P, d), epaisseurThermique(f, D)   les deux longueurs que le son doit dominer.
     paquet(k0, sigma, omega, nk)        paquet d'ondes gaussien sous une relation ω(k) quelconque.   RELATIONS : son, eau profonde.
     bosse(A, w, x0), progressives(c, F, G), depuisConditions(c, f, v), energies(s, rho0, x0, x1, n, t)   d'Alembert.
     tranches(o), distanceChoc(eps, w, gamma)   l'air découpé en tranches, sans linéariser : ce que (47.14) néglige. */
  const lazy = (file, name) => () => (node ? require(file) : root[name]) || err(name + " absent : charger /" + file.slice(2));
  const CST = lazy("./constantes.js", "Constantes"), TH = lazy("./thermo.js", "Thermo");

  /* M : masses molaires (IUPAC) ; γ = cp/cv vers 300 K. Gaz monoatomiques : γ = 5/3 exactement (trois degrés de liberté).
     Air sec et H₂ : γ ≈ 1,40, diatomiques à rotation libre ; CO₂ : γ ≈ 1,30 vers 273 K, qui baisse quand T monte (vibrations). */
  const GAZ_SON = Object.freeze({
    air: Object.freeze({ M: 0.028965, gamma: 1.4 }),
    helium: Object.freeze({ M: 0.0040026, gamma: 5 / 3 }),
    argon: Object.freeze({ M: 0.039948, gamma: 5 / 3 }),
    hydrogene: Object.freeze({ M: 0.0020159, gamma: 1.405 }),
    co2: Object.freeze({ M: 0.04401, gamma: 1.3 }),
  });
  /* mesures sous la pression atmosphérique : air à 273,15 K, Smith et Harlow (1963) ; air à 293,15 K, 343,2 (valeur usuelle) ;
     les autres, Engineering ToolBox (« Speed of sound in gases »), arrondies au m·s⁻¹. */
  const MESURES_SON = Object.freeze([
    { gaz: "air", T: 273.15, c: 331.45 }, { gaz: "air", T: 293.15, c: 343.2 }, { gaz: "helium", T: 273.15, c: 973 },
    { gaz: "argon", T: 300.15, c: 323 }, { gaz: "hydrogene", T: 300.15, c: 1320 }, { gaz: "co2", T: 273.15, c: 258 },
    { gaz: "co2", T: 324.15, c: 280 },
  ].map(Object.freeze));
  const gaz = g => {
    const o = typeof g === "string" ? GAZ_SON[g] : g;
    if (!o || !(o.M > 0) || !(o.gamma > 1)) err("gaz inconnu « " + g + " » (" + Object.keys(GAZ_SON).join(", ") + ", ou { M, gamma })");
    return o;
  };
  /* (47.24) c² = γRT/M : gaz parfait, compressions adiabatiques réversibles (λ ≫ épaisseur thermique, λ ≫ libre parcours) */
  const celerite = (g, T) => { const o = gaz(g); return TH().vitesseSon(o.gamma, o.M, positive(T, "T")); };
  /* Newton (1687) : compressions isothermes, c² = P/ρ = RT/M, trop lent d'un facteur √γ */
  const celeriteNewton = (g, T) => Math.sqrt(CST().R * positive(T, "T") / gaz(g).M);
  const vitesseQuadratique = (g, T) => Math.sqrt(3 * CST().R * positive(T, "T") / gaz(g).M);
  /* ρ = PM/(RT), gaz parfait (écart du gaz réel : 3 × 10⁻⁴ pour l'air à 300 K sous 10⁵ Pa) */
  function milieu(g, T, P) {
    const o = gaz(g); positive(T, "T"); positive(P, "P");
    const rho = P * o.M / (CST().R * T), c = celerite(o, T);
    return { gaz: o, T, P, rho, c, kappa: c * c, Z: rho * c };
  }

  /* (47.1) niveau = 20 log₁₀(p_eff/P_REF) dB, P_REF = 2 × 10⁻⁵ Pa efficace (le seuil d'audition vers 1 kHz) */
  const P_REF = 2e-5;
  const niveau = pEff => 20 * Math.log10(positive(pEff, "p_eff") / P_REF);
  const pressionEfficace = L => P_REF * Math.pow(10, finite(L, "L") / 20);
  /* onde plane progressive sinusoïdale, linéaire (47.14) : p₀ = √2 p_eff (crête), vitesse u₀ = p₀/(ρc), déplacement χ₀ = u₀/ω,
     ρe/ρ₀ = p₀/(ρc²) = u₀/c (aussi le nombre de Mach), ΔT = (γ − 1)/γ · T p₀/P (adiabatique), λ = c/f.
     m : milieu(...) ; par défaut, l'air à 293,15 K sous 101 325 Pa. */
  function amplitudes(L, f, m) {
    positive(f, "f"); m = m || milieu("air", 293.15, CST().atm);
    const pEff = pressionEfficace(L), p0 = Math.SQRT2 * pEff, w = 2 * Math.PI * f, u0 = p0 / m.Z, g = m.gaz.gamma;
    return { pEff, p0, u0, chi0: u0 / w, eps: u0 / m.c, dT: (g - 1) / g * m.T * p0 / m.P, lambda: m.c / f };
  }
  /* libre parcours moyen ℓ = k_B T/(√2 π d² P), sphères dures de diamètre d. D_AIR = 3,7 × 10⁻¹⁰ m rend 66 nm à 293 K sous
     101 325 Pa (valeurs publiées : 64 à 68 nm, selon la définition du diamètre). */
  const D_AIR = 3.7e-10;
  const libreParcours = (T, P, d = D_AIR) => CST().k_B * positive(T, "T") / (Math.SQRT2 * Math.PI * positive(d, "d") ** 2 * positive(P, "P"));
  /* épaisseur de diffusion thermique pendant une période : δ = √(2D/ω). D : diffusivité thermique, 2 × 10⁻⁵ m²·s⁻¹ pour l'air
     vers 300 K (1,9 à 2,2 × 10⁻⁵ selon les tables). δ ≪ λ : la chaleur n'a pas le temps de passer d'une compression à une détente. */
  const D_TH_AIR = 2e-5;
  const epaisseurThermique = (f, D = D_TH_AIR) => Math.sqrt(2 * positive(D, "D") / (2 * Math.PI * positive(f, "f")));

  /* paquet gaussien : χ(x, t) = Re Σⱼ Aⱼ e^(i(kⱼx − ω(kⱼ)t)) δk / Σⱼ Aⱼ δk, Aⱼ = e^(−(kⱼ − k₀)²/(2σ²)), nk nombres d'onde sur
     k₀ ± 6σ (le reste pèse e^(−18)). À t = 0 : cos(k₀x) e^(−σ²x²/2), amplitude 1 au centre. La somme est périodique en x de
     période 2π/δk (rendue) : ne la lire que sur |x| < π/δk. Exacte pour un milieu linéaire de relation ω(k) ; enveloppe(x, t) = |somme|. */
  const RELATIONS = Object.freeze({
    son: c => k => positive(c, "c") * k,                      // ω = ck, non dispersive
    eau: g => k => Math.sqrt(positive(g, "g") * Math.abs(k)), // eau profonde, ondes de gravité : profondeur ≫ λ, λ ≫ 2 cm (capillarité)
  });
  function paquet(k0, sigma, omega, nk = 241) {
    positive(k0, "k₀"); positive(sigma, "σ"); fonction(omega, "ω(k)");
    if (!Number.isInteger(nk) || nk < 3) err("nk entier ≥ 3");
    if (6 * sigma >= k0) err("σ < k₀/6 : le paquet ne doit pas déborder sur k ≤ 0");
    const dk = 12 * sigma / (nk - 1), K = [], A = [], W = [];
    for (let j = 0; j < nk; j++) { const k = k0 - 6 * sigma + j * dk; K.push(k); A.push(Math.exp(-((k - k0) ** 2) / (2 * sigma * sigma))); W.push(omega(k)); }
    const S = A.reduce((s, a) => s + a, 0);
    const somme = (x, t) => { let re = 0, im = 0; for (let j = 0; j < nk; j++) { const ph = K[j] * x - W[j] * t; re += A[j] * Math.cos(ph); im += A[j] * Math.sin(ph); } return [re / S, im / S]; };
    const h = 1e-6 * k0;
    return { periode: 2 * Math.PI / dk, vphase: omega(k0) / k0, vgroupe: (omega(k0 + h) - omega(k0 - h)) / (2 * h),
      chi: (x, t) => somme(x, t)[0], enveloppe: (x, t) => Math.hypot(...somme(x, t)) };
  }

  /* d'Alembert. Une forme est { f, d } : la fonction et sa dérivée. bosse : f(u) = A e^(−((u − x₀)/w)²). */
  function bosse(A, w, x0 = 0) {
    finite(A, "A"); positive(w, "w"); finite(x0, "x₀");
    const f = u => A * Math.exp(-(((u - x0) / w) ** 2));
    return { f, d: u => -2 * (u - x0) / (w * w) * f(u) };
  }
  const forme = (F, n) => { if (!F || typeof F.f !== "function" || typeof F.d !== "function") err(n + " = { f, d }"); return F; };
  /* χ(x, t) = F(x − ct) + G(x + ct) : (47.15)–(47.17), exacte pour (47.14) quels que soient F et G (deux fois dérivables).
     Rend χ, ∂χ/∂t (vitesse de l'air), ∂χ/∂x (−ρe/ρ₀ par (47.9)), et les deux ondes séparées. G = null : rien vers −x. */
  function progressives(c, F, G) {
    positive(c, "c"); forme(F, "F"); if (G != null) forme(G, "G");
    const z = { f: () => 0, d: () => 0 }, g = G || z;
    return { c, droite: (x, t) => F.f(x - c * t), gauche: (x, t) => g.f(x + c * t),
      chi: (x, t) => F.f(x - c * t) + g.f(x + c * t),
      vitesse: (x, t) => -c * F.d(x - c * t) + c * g.d(x + c * t),
      deformation: (x, t) => F.d(x - c * t) + g.d(x + c * t) };
  }
  /* depuis χ(x, 0) = f.f(x) et ∂χ/∂t(x, 0) = v.f(x), v = { f: vitesse initiale, V: une primitive } (null : repos) :
     F = f/2 − V/(2c), G = f/2 + V/(2c). Lâché au repos, une bosse se coupe en deux moitiés qui partent en sens opposés. */
  function depuisConditions(c, f, v) {
    positive(c, "c"); forme(f, "f");
    if (v != null && (typeof v.f !== "function" || typeof v.V !== "function")) err("v = { f, V } : la vitesse et une primitive");
    const V = v ? v.V : () => 0, vf = v ? v.f : () => 0;
    return progressives(c, { f: u => f.f(u) / 2 - V(u) / (2 * c), d: u => f.d(u) / 2 - vf(u) / (2 * c) },
      { f: u => f.f(u) / 2 + V(u) / (2 * c), d: u => f.d(u) / 2 + vf(u) / (2 * c) });
  }
  /* énergie acoustique par unité de surface sur [x₀, x₁] (n trapèzes) : cinétique ½ρ₀(∂χ/∂t)², potentielle ½ρ₀c²(∂χ/∂x)²
     (= ½ pe²/(ρ₀c²), la compression du gaz). Mêmes approximations que (47.14) : termes d'ordre 3 en ε négligés. */
  function energies(s, rho0, x0, x1, n, t) {
    positive(rho0, "ρ₀"); finite(x0, "x₀"); finite(x1, "x₁"); finite(t, "t");
    if (!(x1 > x0)) err("x₁ > x₀"); if (!Number.isInteger(n) || n < 2) err("n entier ≥ 2");
    const h = (x1 - x0) / n; let ec = 0, ep = 0;
    for (let j = 0; j <= n; j++) {
      const x = x0 + j * h, wt = j === 0 || j === n ? 0.5 : 1, v = s.vitesse(x, t), e = s.deformation(x, t);
      ec += wt * v * v; ep += wt * e * e;
    }
    ec *= 0.5 * rho0 * h; ep *= 0.5 * rho0 * s.c * s.c * h;
    return { cinetique: ec, potentielle: ep, totale: ec + ep };
  }

  /* l'air en N tranches, sans linéariser. Interfaces i = 0…N, au repos en Xᵢ = iΔx, Δx = L/N ; chaque interface porte la masse
     ρ₀Δx (par unité de surface). Tranche j entre les interfaces j et j + 1 : ρⱼ = ρ₀Δx/(xⱼ₊₁ − xⱼ), la masse conservée (47.5)
     exactement ; Pⱼ = P (ρⱼ/ρ₀)^γ, adiabatique (47.22) exacte pour un gaz parfait sans échange de chaleur. Newton (47.10) :
     ρ₀Δx ẍᵢ = Pᵢ₋₁ − Pᵢ ; extrémités immobiles. Schéma de Verlet, pas dt = cfl·Δx/c (cfl ≤ 1).
     Seule approximation : le découpage. Vitesse du schéma pour une sinusoïde : c sin(kΔx/2)/(kΔx/2), écart (kΔx)²/24 :
     < 10⁻³ pour une bosse de largeur w ≥ 10Δx. Ni viscosité ni conduction : après la distance de choc, le calcul oscille
     (l'air réel forme un choc de quelques libres parcours d'épaisseur, que ce modèle ne décrit pas).
     Départ : une onde simple exacte qui va vers +x, ρ/ρ₀ = 1 + ε e^(−((X − x₀)/w)²), vitesse u = 2c/(γ − 1)·((ρ/ρ₀)^((γ−1)/2) − 1)
     (invariant de Riemann : rien ne part vers −x, même à grande amplitude).
     o = { gaz: "air", T: 293.15, P: Constantes.atm, L: 3, N: 600, eps, w: 0.1, x0: 0.4, duree, images: 60, cfl: 0.5 }.
     Rend { c, rho0, dt, X: centres des tranches au repos, images: [{ t, x: centres réels, s: ρe/ρ₀ par tranche }],
     ecrase: l'instant où une tranche a pris une épaisseur négative (le calcul s'arrête là, bien après le choc), ou null }. */
  function tranches(o) {
    o = Object.assign({ gaz: "air", T: 293.15, P: CST().atm, L: 3, N: 600, w: 0.1, x0: 0.4, images: 60, cfl: 0.5 }, o);
    const m = milieu(o.gaz, o.T, o.P), g = m.gaz.gamma, c = m.c, P0 = o.P, rho0 = m.rho;
    const L = positive(o.L, "L"), N = o.N, eps = finite(o.eps, "ε"), w = positive(o.w, "w"), x0 = finite(o.x0, "x₀"), duree = positive(o.duree, "durée");
    if (!Number.isInteger(N) || N < 10) err("N entier ≥ 10");
    if (!(eps > -1)) err("ε > −1");
    if (!(o.cfl > 0 && o.cfl <= 1)) err("cfl dans ]0, 1]");
    const dx = L / N, mass = rho0 * dx, steps = Math.ceil(duree / (o.cfl * dx / c)), dt = duree / steps;
    const every = Math.max(1, Math.round(steps / o.images));
    const sAt = X => eps * Math.exp(-(((X - x0) / w) ** 2));
    const uOf = r => 2 * c / (g - 1) * (Math.pow(r, (g - 1) / 2) - 1);
    /* positions : la tranche j a l'épaisseur Δx/(1 + s(Xⱼ₊½)), l'extrémité droite reste en L */
    const x = new Float64Array(N + 1), v = new Float64Array(N + 1), a = new Float64Array(N + 1), p = new Float64Array(N);
    x[N] = L;
    for (let j = N - 1; j >= 0; j--) x[j] = x[j + 1] - dx / (1 + sAt((j + 0.5) * dx));
    for (let i = 1; i < N; i++) v[i] = uOf(1 + 0.5 * (sAt((i - 0.5) * dx) + sAt((i + 0.5) * dx)));
    const accel = () => {
      for (let j = 0; j < N; j++) { const e = x[j + 1] - x[j]; if (!(e > 0)) return false; p[j] = P0 * Math.pow(dx / e, g); }
      for (let i = 1; i < N; i++) a[i] = (p[i - 1] - p[i]) / mass;
      return true;
    };
    const X = Array.from({ length: N }, (_, j) => (j + 0.5) * dx), images = [];
    const snap = t => {
      const xs = new Float64Array(N), s = new Float64Array(N);
      for (let j = 0; j < N; j++) { xs[j] = 0.5 * (x[j] + x[j + 1]); s[j] = dx / (x[j + 1] - x[j]) - 1; }
      images.push({ t, x: xs, s });
    };
    accel(); snap(0);
    let ecrase = null;
    for (let k = 1; k <= steps; k++) {
      for (let i = 1; i < N; i++) { v[i] += 0.5 * dt * a[i]; x[i] += dt * v[i]; }
      if (!accel()) { ecrase = k * dt; break; }
      for (let i = 1; i < N; i++) v[i] += 0.5 * dt * a[i];
      if (k % every === 0 || k === steps) snap(k * dt);
    }
    return { c, rho0, dt, X, images, ecrase };
  }
  /* distance où une bosse gaussienne d'amplitude ε (ρe/ρ₀) forme un choc : chaque point de l'onde va à c(1 + βs), β = (γ + 1)/2,
     le sommet rattrape le pied ; pente maximale ε√2 e^(−1/2)/w, d'où x_s = w√e/(√2 β ε). Approximation : ε ≪ 1, sans absorption. */
  const distanceChoc = (eps, w, gamma = 1.4) => positive(w, "w") * Math.sqrt(Math.E) / (Math.SQRT2 * (gamma + 1) / 2 * positive(eps, "ε"));

  const api = { MODELES, acceleration, repondre, ecartLinearite, transfertRLC, accord, sortieRadio, frottementSec,
    analogue, mecanique, TYPES, dipole, serie, parallele, reseau, bouchon,
    GAZ_SON, MESURES_SON, celerite, celeriteNewton, vitesseQuadratique, milieu, P_REF, niveau, pressionEfficace, amplitudes,
    D_AIR, libreParcours, D_TH_AIR, epaisseurThermique, RELATIONS, paquet, bosse, progressives, depuisConditions, energies,
    tranches, distanceChoc };
  /* ---------- étape « Battements et paquets d'ondes » (Feynman I.48) ----------
     deuxSinus(A1, w1, A2, w2)       s(t) = A₁ cos ω₁t + A₂ cos ω₂t, ses écritures (48.6) et (48.7), l'intensité (48.8).
     pgcd(a, b), periodeSomme(f1, f2)  la période de la somme de deux fréquences entières (Hz) : 1/pgcd ; le battement : 1/|f₁ − f₂|.
     modulee(b, wc, wm)              (48.9) et ses trois raies (48.10) ; part de la puissance moyenne dans les bandes latérales.
     spectreAM(fc, sons)             les raies d'une porteuse modulée par plusieurs sons [{ f, b }], et la bande occupée.
     peigne(N, f0, df)               N cosinus de même amplitude, régulièrement espacés de δf autour de f₀ : un train localisé.
     pulsationPlasma(N)              ω_p = √(N e²/(ε₀ mₑ)), N électrons libres par m³.
     plasma(wp, c)                   ω² = ω_p² + c²k² (électrons libres) : k(ω), n(ω), vitesses de phase et de groupe, vp·vg = c².
     indiceX(N, w)                   (48.12).   kFeynman(w, a, c) (48.14), vgFeynman(w, a, c) (48.18).
     vitesseModulation(w1, k1, w2, k2)  (48.16). Le paquet gaussien sous une relation ω(k) quelconque : paquet (étape précédente). */

  /* deux sinusoïdes de phases nulles à t = 0. ω̄ = (ω₁ + ω₂)/2, δ = (ω₁ − ω₂)/2.
     (48.7) : A₁e^(iω₁t) + A₂e^(iω₂t) = e^(iω̄t) B(t), B(t) = A₁e^(iδt) + A₂e^(−iδt) = (A₁ + A₂) cos δt + i (A₁ − A₂) sin δt.
     D'où s(t) = |B| cos(ω̄t + arg B), exactement, pour toutes fréquences : enveloppe |B|, phase lente arg B.
     |B|² = A₁² + A₂² + 2A₁A₂ cos(ω₁ − ω₂)t, (48.8) exacte ; « enveloppe » n'a le sens d'une amplitude lentement variable
     que si |ω₁ − ω₂| ≪ ω̄. A₁ = A₂ = A : s = 2A cos ω̄t cos δt, (48.6). */
  function deuxSinus(A1, w1, A2, w2) {
    finite(A1, "A₁"); finite(A2, "A₂"); if (A1 < 0 || A2 < 0) err("amplitudes ≥ 0 (une phase opposée se met dans ω)");
    positive(w1, "ω₁"); positive(w2, "ω₂");
    const moyenne = (w1 + w2) / 2, d = (w1 - w2) / 2;
    const crochet = t => [(A1 + A2) * Math.cos(d * t), (A1 - A2) * Math.sin(d * t)];
    return { moyenne, demiEcart: d, battement: Math.abs(w1 - w2), periodeBattement: d === 0 ? Infinity : Math.PI / Math.abs(d),
      Imax: (A1 + A2) ** 2, Imin: (A1 - A2) ** 2,
      s: t => A1 * Math.cos(w1 * t) + A2 * Math.cos(w2 * t),
      crochet, enveloppe: t => Math.hypot(...crochet(t)), phase: t => { const b = crochet(t); return Math.atan2(b[1], b[0]); },
      intensite: t => A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos((w1 - w2) * t),
      /* les deux vecteurs tournants de la figure 48-2, dans le plan complexe, et leur somme */
      vecteurs: t => [[A1 * Math.cos(w1 * t), A1 * Math.sin(w1 * t)], [A2 * Math.cos(w2 * t), A2 * Math.sin(w2 * t)]] };
  }
  /* plus grand commun diviseur de deux entiers ≥ 1 */
  function pgcd(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 1 || b < 1) err("pgcd : deux entiers ≥ 1");
    while (b) [a, b] = [b, a % b];
    return a;
  }
  /* f₁, f₂ entières (en Hz, ou dans n'importe quelle unité commune) : la somme est périodique de période 1/pgcd(f₁, f₂), un nombre
     entier de battements, |f₁ − f₂|/pgcd. Le motif se répète exactement à chaque battement si pgcd = |f₁ − f₂| (8 et 10 : oui ;
     440 et 443 : tous les trois battements). Deux fréquences incommensurables : la somme n'est jamais exactement périodique. */
  function periodeSomme(f1, f2) {
    const g = pgcd(f1, f2), e = Math.abs(f1 - f2);
    return { periode: 1 / g, battement: e === 0 ? Infinity : 1 / e, battementsParPeriode: e / g };
  }

  /* (48.9) S = (1 + b cos ω_m t) cos ω_c t, ω_c > ω_m > 0, b ≥ 0 le taux de modulation.
     (48.10) trois raies : la porteuse (amplitude 1) et deux bandes latérales ω_c ± ω_m d'amplitude b/2. Identité exacte.
     Puissance moyenne (sur un temps ≫ 2π/ω_m) : porteuse 1/2, chaque bande b²/8 ; part des bandes b²/(2 + b²), 1/3 au plus sans
     surmodulation. b > 1 : 1 + b cos ω_m t change de signe, l'enveloppe |S| n'est plus le son (détecteur d'enveloppe faussé). */
  function modulee(b, wc, wm) {
    finite(b, "b"); if (b < 0) err("b ≥ 0"); positive(wc, "ω_c"); positive(wm, "ω_m");
    if (!(wm < wc)) err("ω_m < ω_c : la porteuse doit être plus rapide que le son");
    return { s: t => (1 + b * Math.cos(wm * t)) * Math.cos(wc * t), enveloppe: t => 1 + b * Math.cos(wm * t),
      raies: [{ w: wc - wm, a: b / 2 }, { w: wc, a: 1 }, { w: wc + wm, a: b / 2 }],
      partBandes: b * b / (2 + b * b), surmodulee: b > 1 };
  }
  /* porteuse fc modulée par plusieurs sons : S = (1 + Σ bᵢ cos 2πfᵢt) cos 2πfc t. Raies : fc (1), fc ± fᵢ (bᵢ/2), par (48.10)
     appliquée à chaque son (linéarité en S de la modulation d'amplitude). Bande occupée : [fc − max fᵢ, fc + max fᵢ], largeur
     2 max fᵢ, indépendante de fc. Exacte ; un récepteur réel coupe aussi un peu les bords. */
  function spectreAM(fc, sons) {
    positive(fc, "fc");
    if (!Array.isArray(sons) || !sons.length) err("sons = [{ f, b }]");
    let fmax = 0;
    const raies = [{ f: fc, a: 1 }];
    for (const x of sons) {
      positive(x.f, "f"); finite(x.b, "b"); if (x.b < 0) err("b ≥ 0");
      if (!(x.f < fc)) err("f < fc"); fmax = Math.max(fmax, x.f);
      raies.push({ f: fc - x.f, a: x.b / 2 }, { f: fc + x.f, a: x.b / 2 });
    }
    raies.sort((p, q) => p.f - q.f);
    return { raies, bas: fc - fmax, haut: fc + fmax, largeur: 2 * fmax,
      s: t => (1 + sons.reduce((s, x) => s + x.b * Math.cos(2 * Math.PI * x.f * t), 0)) * Math.cos(2 * Math.PI * fc * t) };
  }

  /* N cosinus d'amplitude 1/N, fréquences fⱼ = f₀ + (j − (N − 1)/2) δf, j = 0…N − 1 (symétriques autour de f₀), phases nulles à t = 0.
     Somme exacte : s(t) = cos(2πf₀t) · D(t), D(t) = sin(Nπ δf t)/(N sin(π δf t)) (D = 1 en t = 0 et en t multiple de 1/δf).
     Un sommet de demi-largeur 1/(N δf) (premier zéro de D), répété toutes les 1/δf : plus le spectre est large (N δf), plus le
     sommet est bref, demi-largeur × N δf = 1 exactement. Exige f₀ > (N − 1) δf/2 (toutes les fréquences positives). */
  function peigne(N, f0, df) {
    if (!Number.isInteger(N) || N < 1) err("N entier ≥ 1"); positive(f0, "f₀"); positive(df, "δf");
    if (!(f0 - (N - 1) * df / 2 > 0)) err("f₀ > (N − 1) δf/2 : toutes les fréquences doivent rester positives");
    const freqs = Array.from({ length: N }, (_, j) => f0 + (j - (N - 1) / 2) * df);
    const D = t => { const u = Math.PI * df * t, sn = Math.sin(u);
      if (Math.abs(sn) < 1e-12) { const m = Math.round(df * t); return (N % 2 === 0 && m % 2 !== 0) ? -1 : 1; }
      return Math.sin(N * u) / (N * sn); };
    return { freqs, D, enveloppe: t => Math.abs(D(t)), s: t => freqs.reduce((s, f) => s + Math.cos(2 * Math.PI * f * t), 0) / N,
      demiLargeur: 1 / (N * df), recurrence: 1 / df, largeurSpectrale: N * df };
  }

  /* électrons libres, N par m³ : ω_p² = N e²/(ε₀ mₑ) ; f_p ≈ 9 MHz pour N = 10¹² m⁻³. Verre pour les rayons X :
     les électrons de cœur aussi comptent comme libres dès que ħω dépasse leurs énergies de liaison. */
  const pulsationPlasma = N => Math.sqrt(positive(N, "N") * CST().e ** 2 / (CST().eps0 * CST().m_e));
  /* plasma froid sans collisions ni champ magnétique : ω² = ω_p² + c²k², n = ck/ω = √(1 − ω_p²/ω²) < 1.
     vp = ω/k = c/n > c, vg = dω/dk = c²k/ω = cn < c, vp·vg = c² exactement. ω < ω_p : k imaginaire, l'onde ne passe pas
     (réflexion ionosphérique). Approximation : agitation thermique des électrons ≪ vp, fréquence des collisions ≪ ω, ions immobiles. */
  function plasma(wp, c) {
    positive(wp, "ω_p"); c = c == null ? CST().c : positive(c, "c");
    const passe = w => { positive(w, "ω"); if (!(w > wp)) err("ω ≤ ω_p : l'onde ne se propage pas"); return w; };
    const n = w => Math.sqrt(1 - (wp / passe(w)) ** 2);
    return { wp, c, omega: k => Math.sqrt(wp * wp + c * c * k * k), k: w => Math.sqrt(passe(w) ** 2 - wp * wp) / c, n,
      vp: w => c / n(w), vg: w => c * n(w) };
  }
  /* (48.12) n = 1 − N e²/(2ε₀ mₑ ω²) = 1 − ω_p²/(2ω²) : le développement de √(1 − ω_p²/ω²) au premier ordre, erreur ~ (ω_p/ω)⁴/8 */
  const indiceX = (N, w) => 1 - pulsationPlasma(N) ** 2 / (2 * positive(w, "ω") ** 2);
  /* (48.14) k = ω/c − a/(ωc), a = N e²/(2ε₀ mₑ) = ω_p²/2 : kc = nω avec n de (48.12). (48.18) vg = c/(1 + a/ω²), sa dérivée exacte.
     Les deux héritent de (48.12) : valables pour a/ω² ≪ 1 ; vg exacte du plasma, c√(1 − 2a/ω²), diffère de 3(a/ω²)²/2 en relatif. */
  const kFeynman = (w, a, c) => { positive(w, "ω"); finite(a, "a"); c = c == null ? CST().c : c; return w / c - a / (w * c); };
  const vgFeynman = (w, a, c) => { positive(w, "ω"); finite(a, "a"); c = c == null ? CST().c : c; return c / (1 + a / (w * w)); };
  /* (48.16) la vitesse de la modulation de deux ondes (ω₁, k₁), (ω₂, k₂) : le zéro de (ω₁ − ω₂)t − (k₁ − k₂)x se déplace à
     (ω₁ − ω₂)/(k₁ − k₂). Exacte pour deux ondes ; sa limite ω₂ → ω₁ est dω/dk (48.17). */
  function vitesseModulation(w1, k1, w2, k2) {
    [w1, k1, w2, k2].forEach((v, i) => finite(v, ["ω₁", "k₁", "ω₂", "k₂"][i]));
    if (k1 === k2) err("k₁ = k₂ : la modulation ne se propage pas");
    return (w1 - w2) / (k1 - k2);
  }
  Object.assign(api, { deuxSinus, pgcd, periodeSomme, modulee, spectreAM, peigne, pulsationPlasma, plasma, indiceX,
    kFeynman, vgFeynman, vitesseModulation });

  /* ---------- étape « Ondes de choc et ondes de surface » (Feynman I.51) ----------
     Les vitesses des ondes élastiques et la distance d'un séisme existent déjà : Elasticite.vitessesIsotropes, distanceSeisme
     (lecons/elasticite.js). La formation d'un choc dans l'air : tranches, distanceChoc (plus haut). La tension superficielle
     de l'eau : Fluides.gammaEau (fluides.js).
     angleMach(c, v)                 (51.1) sin θ = c/v : demi-angle du cône, null si v ≤ c.
     fronts(c, v, t, n)              les fronts émis par une source qui passe en x = 0 à l'instant 0 : [{ x, r, tau }].
     PARTICULES, tcherenkov(n, T, mc2)   le cône de lumière d'une particule chargée d'énergie cinétique T dans un milieu d'indice n.
     mascaret(h1, h2, g, rho)        le ressaut qui avance dans une eau de profondeur h₁ et laisse h₂ derrière lui (§51-2).
     chocNormal(M, gamma), machDeSurpression(r, gamma)   un choc droit dans un gaz parfait au repos (Rankine–Hugoniot).
     chaine(K, m, a)                 une file d'atomes de masse m, de pas a, reliés par des ressorts K : ω(k), vp, vg.
     surface(o)                      ondes à la surface de l'eau : gravité, tension superficielle, profondeur finie.
     stationnaires(U, o)             les deux longueurs d'onde immobiles devant un obstacle dans un courant U.
     angleSillage(r), kelvin(v, g, n, m)   demi-angle de sillage si vg = r vp ; les crêtes du sillage d'un bateau (Kelvin). */

  /* (51.1) sin θ = c/v, θ entre la trajectoire et la surface du cône. Exacte pour une onde non dispersive de vitesse c et une
     source ponctuelle de vitesse v constante ; près d'un objet réel, le choc fort va plus vite que c et l'angle s'ouvre. */
  const angleMach = (c, v) => { positive(c, "c"); positive(v, "v"); return v > c ? Math.asin(c / v) : null; };
  /* la source va vers +x à v et passe en x = 0 à t = 0 ; on regarde à l'instant t. Le front émis à l'instant t − τ (τ = jt/n,
     j = 1…n) est un cercle de centre x = v(t − τ) − vt = −vτ (repère où la source est en 0 à l'instant t) et de rayon cτ. */
  function fronts(c, v, t, n) {
    positive(c, "c"); finite(v, "v"); if (v < 0) err("v ≥ 0"); positive(t, "t");
    if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1");
    return Array.from({ length: n }, (_, j) => { const tau = (j + 1) * t / n; return { tau, x: -v * tau, r: c * tau }; });
  }

  /* énergies de masse (CODATA 2022), en J */
  const MEV = 1e6 * (node ? require("./constantes.js") : root.Constantes).e;   // chargé avec le module : PARTICULES en a besoin dès le départ
  const PARTICULES = Object.freeze({
    electron: Object.freeze({ mc2: 0.51099895069 * MEV }),
    muon: Object.freeze({ mc2: 105.6583755 * MEV }),
    proton: Object.freeze({ mc2: 938.27208943 * MEV }),
  });
  /* Tcherenkov : la lumière va à c/n dans le milieu ; une particule de vitesse βc > c/n émet sur un cône. Avec (51.1),
     l'angle entre la trajectoire et la direction de la lumière (la normale au front) vaut θc, cos θc = 1/(nβ).
     β = √(1 − 1/γ²), γ = 1 + T/(mc²). Seuil : β > 1/n, T_seuil = mc²(1/√(1 − 1/n²) − 1). Approximation : n pris constant
     (dans l'eau, il varie de 1,33 à 1,34 sur le visible), particule qui ne ralentit pas sur la longueur considérée. */
  function tcherenkov(n, T, mc2) {
    finite(n, "n"); if (!(n > 1)) err("n > 1 : sinon aucune particule ne dépasse c/n"); finite(T, "T"); if (T < 0) err("T ≥ 0"); positive(mc2, "mc²");
    const g = 1 + T / mc2, beta = Math.sqrt(1 - 1 / (g * g)), seuil = mc2 * (1 / Math.sqrt(1 - 1 / (n * n)) - 1);
    const emet = n * beta > 1;
    return { beta, gamma: g, seuil, emet, theta: emet ? Math.acos(1 / (n * beta)) : null, thetaMax: Math.acos(1 / n) };
  }

  /* §51-2 : le mascaret. Eau de profondeur h₁ au repos devant ; derrière, profondeur h₂ > h₁ et vitesse v ; le front avance à u.
     Masse : v h₂ = u (h₂ − h₁). Quantité de mouvement : (ρh₂u − ρh₂v) v = ½ρg(h₂² − h₁²), pression hydrostatique.
     D'où u² = g h₂ (h₁ + h₂)/(2h₁). Dans le repère du front, l'eau arrive à u et repart à u − v ; la charge u²/2g + h perd
     ΔH = (h₂ − h₁)³/(4h₁h₂) : puissance dissipée par mètre de largeur ρ g u h₁ ΔH (turbulence, puis chaleur).
     Approximation : eau incompressible, pression hydrostatique loin du front (longueurs ≫ h), fond plat sans frottement,
     vitesse uniforme sur la verticale. Rend aussi √(gh₁), √(gh₂) et le nombre de Froude de l'eau derrière, (u − v)/√(gh₂) < 1. */
  function mascaret(h1, h2, g, rho) {
    positive(h1, "h₁"); positive(h2, "h₂"); g = g == null ? CST().g0 : positive(g, "g"); rho = rho == null ? 1000 : positive(rho, "ρ");
    if (!(h2 >= h1)) err("h₂ ≥ h₁ : un ressaut inverse perdrait de l'eau sans dissiper, il s'étale (§51-2)");
    const u = Math.sqrt(g * h2 * (h1 + h2) / (2 * h1)), v = u * (h2 - h1) / h2, dH = (h2 - h1) ** 3 / (4 * h1 * h2);
    const c1 = Math.sqrt(g * h1), c2 = Math.sqrt(g * h2);
    return { u, v, c1, c2, froude1: u / c1, froude2: (u - v) / c2, dH, puissance: rho * g * u * h1 * dH };
  }

  /* choc droit qui avance à W = M c₁ dans un gaz parfait au repos (p₁, ρ₁, T₁, c₁), γ constant. Rankine–Hugoniot :
     p₂/p₁ = 1 + 2γ(M² − 1)/(γ + 1) ; ρ₂/ρ₁ = (γ + 1)M²/((γ − 1)M² + 2) ; T₂/T₁ = (p₂/p₁)(ρ₁/ρ₂) ; c₂/c₁ = √(T₂/T₁).
     Le gaz derrière avance à v = W(1 − ρ₁/ρ₂) ; le choc vu de ce gaz va à M₂ c₂, M₂ = (W − v)/c₂ < 1 : plus lent que le son
     derrière, plus rapide que le son devant. Entropie : Δs = c_v ln[(p₂/p₁)(ρ₁/ρ₂)^γ] > 0 pour M > 1.
     Approximation : épaisseur du choc (quelques libres parcours) ≪ toute autre longueur, γ constant (air : vrai jusqu'à
     M ≈ 3 à 5, au-delà les vibrations puis la dissociation des molécules comptent). */
  function chocNormal(M, gamma = 1.4) {
    finite(M, "M"); if (!(M >= 1)) err("M ≥ 1 : un choc de détente ferait baisser l'entropie"); finite(gamma, "γ"); if (!(gamma > 1)) err("γ > 1");
    const g = gamma, m2 = M * M, p = 1 + 2 * g * (m2 - 1) / (g + 1), rho = (g + 1) * m2 / ((g - 1) * m2 + 2), T = p / rho;
    const c = Math.sqrt(T), v = M * (1 - 1 / rho), M2 = (M - v) / c;
    return { M, p, rho, T, c, v, M2, arriere: v + c, entropie: Math.log(p * Math.pow(rho, -g)) };
  }
  /* le nombre de Mach d'un choc qui porte la pression de p₁ à r p₁ : l'inverse de p₂/p₁ ci-dessus */
  function machDeSurpression(r, gamma = 1.4) {
    finite(r, "p₂/p₁"); if (!(r >= 1)) err("p₂/p₁ ≥ 1"); finite(gamma, "γ"); if (!(gamma > 1)) err("γ > 1");
    return Math.sqrt(1 + (gamma + 1) * (r - 1) / (2 * gamma));
  }

  /* §51-3 : file d'atomes, ressorts entre plus proches voisins. ω = 2√(K/m) |sin(ka/2)|, k ∈ [0, π/a] suffit (au-delà, la
     même onde vue aux seuls atomes). Grandes longueurs d'onde : ω ≈ c₀k, c₀ = a√(K/m) ; k = π/a : λ = 2a, atomes voisins en
     opposition, vg = 0. Exacte pour ce modèle (ressorts linéaires, voisins seulement) ; un vrai cristal a plusieurs branches. */
  function chaine(K, m, a) {
    positive(K, "K"); positive(m, "m"); positive(a, "a");
    const w0 = Math.sqrt(K / m), kmax = Math.PI / a;
    const dans = k => { finite(k, "k"); if (!(k > 0 && k <= kmax * (1 + 1e-12))) err("k dans ]0, π/a]"); return k; };
    return { c0: a * w0, kmax, wmax: 2 * w0,
      omega: k => 2 * w0 * Math.abs(Math.sin(dans(k) * a / 2)),
      vp: k => 2 * w0 * Math.sin(dans(k) * a / 2) / k,
      vg: k => a * w0 * Math.cos(dans(k) * a / 2) };
  }

  /* §51-4 : ondes à la surface d'un liquide de masse volumique ρ, tension superficielle σ, profondeur h (Infinity : profonde).
     ω² = (gk + σk³/ρ) th(kh). Profond : vp = √(g/k + σk/ρ), la formule de la source avec k = 2π/λ ; gravité seule
     vp = √(gλ/2π), vg = vp/2 ; capillarité seule vp = √(2πσ/(λρ)), vg = 3vp/2 ; peu profond (kh ≪ 1) vp → √(gh).
     Minimum de vp en eau profonde : k_m = √(ρg/σ), v_min = (4gσ/ρ)^(1/4), et là vg = vp.
     Approximation : écoulement parfait et irrotationnel, amplitude ≪ λ (linéaire), ni vent ni viscosité (une ride de 1 mm
     s'amortit en une fraction de seconde). o = { g, sigma, rho, h } ; défauts : g₀, σ = 0,0728 N·m⁻¹ (eau à 293 K), 998 kg·m⁻³. */
  function surface(o) {
    o = Object.assign({ sigma: 0.0728, rho: 998, h: Infinity }, o);
    const g = o.g == null ? CST().g0 : positive(o.g, "g"), s = o.sigma, rho = positive(o.rho, "ρ"), h = o.h;
    finite(s, "σ"); if (s < 0) err("σ ≥ 0");
    if (!(h === Infinity || h > 0)) err("h > 0 ou Infinity");
    const th = k => h === Infinity ? 1 : Math.tanh(k * h);
    const F = k => g * k + s * k ** 3 / rho, w = k => { positive(k, "k"); return Math.sqrt(F(k) * th(k)); };
    const vg = k => { const W = w(k), t = th(k), dth = h === Infinity ? 0 : h * (1 - t * t);
      return ((g + 3 * s * k * k / rho) * t + F(k) * dth) / (2 * W); };
    const kMin = s > 0 ? Math.sqrt(rho * g / s) : Infinity;
    return { g, sigma: s, rho, h, omega: w, vp: k => w(k) / k, vg, kMin,
      lambdaMin: 2 * Math.PI / kMin, vMin: s > 0 ? Math.pow(4 * g * s / rho, 0.25) : 0 };
  }
  /* un obstacle fixe dans un courant U : une onde reste immobile si sa vitesse de phase vaut U. Pour U > v_min il y en a deux
     (eau profonde) : une ride courte (k > k_m, vg > vp : son énergie remonte le courant, les rides sont devant l'obstacle) et
     une onde de gravité longue (k < k_m, vg < vp : derrière). En eau de profondeur h, la branche longue n'existe que si
     U < √(gh). Dichotomie sur vp(k) − U de chaque côté du minimum. Rend { court, long } : { k, lambda, vp, vg } ou null. */
  function stationnaires(U, o) {
    positive(U, "U"); const S = o && o.vp ? o : surface(o);
    if (!(S.sigma > 0)) err("σ > 0 : sans tension superficielle, pas de branche courte");
    let km = S.kMin;
    if (S.h !== Infinity) { let a = km / 100, b = km * 100; for (let i = 0; i < 200; i++) { const m1 = a + (b - a) / 3, m2 = b - (b - a) / 3; if (S.vp(m1) < S.vp(m2)) b = m2; else a = m1; } km = (a + b) / 2; }
    const vm = S.vp(km);
    const racine = (a, b) => { const fa = S.vp(a) - U; for (let i = 0; i < 200; i++) { const m = Math.sqrt(a * b); if ((S.vp(m) - U > 0) === (fa > 0)) a = m; else b = m; } return Math.sqrt(a * b); };
    const sol = k => ({ k, lambda: 2 * Math.PI / k, vp: S.vp(k), vg: S.vg(k) });
    if (!(U > vm)) return { court: null, long: null, vMin: vm };
    const court = sol(racine(km, km * 1e8));
    const kbas = km * 1e-9, long = S.vp(kbas) > U ? sol(racine(kbas, km)) : null;
    return { court, long, vMin: vm };
  }

  /* sillage d'une source à vitesse v sur un milieu où vg = r vp (r < 1 constant). Une onde dont la normale fait l'angle φ avec la
     trajectoire reste immobile si vp = v cos φ ; son énergie, vue de la source, recule à (−v + r v cos²φ, r v cos φ sin φ).
     Avec t = tan φ : tan ψ = r t/(1 + t² − r), maximal pour t² = 1 − r : tan ψ = r/(2√(1 − r)). Eau profonde, r = 1/2 :
     sin ψ = 1/3, ψ = 19,47°, quelle que soit la vitesse. Exacte pour ce modèle ; source ponctuelle (la taille finie de la coque
     referme l'angle aux grands nombres de Froude). */
  const angleSillage = r => { finite(r, "r"); if (!(r > 0 && r < 1)) err("r dans ]0, 1[ : avec vg ≥ vp, l'énergie remonte devant la source"); return Math.atan(r / (2 * Math.sqrt(1 - r))); };
  /* crêtes de Kelvin, gravité en eau profonde : la crête n (n = 1, 2…) derrière une source à v est la courbe
     x = −a cos φ (1 + sin²φ), y = ±a cos²φ sin φ, a = 2πn v²/g, φ ∈ [−π/2, π/2] (source en 0, trajectoire vers +x).
     Sur l'axe (φ = 0) : x = −nλ₀, λ₀ = 2πv²/g, la longueur d'onde des vagues transverses. Pointe (sin²φ = 1/3) sur la droite
     tan ψ = 1/(2√2). m points ; rend { a, lambda0, points: [[x, y]…] }. Approximation : celle de angleSillage, ondes linéaires. */
  function kelvin(v, g, n, m = 121) {
    positive(v, "v"); g = g == null ? CST().g0 : positive(g, "g");
    if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1"); if (!Number.isInteger(m) || m < 3) err("m entier ≥ 3");
    const a = 2 * Math.PI * n * v * v / g, points = [];
    for (let j = 0; j < m; j++) { const p = -Math.PI / 2 + Math.PI * j / (m - 1), c = Math.cos(p), s = Math.sin(p); points.push([-a * c * (1 + s * s), a * c * c * s]); }
    return { a, lambda0: 2 * Math.PI * v * v / g, points };
  }

  Object.assign(api, { angleMach, fronts, PARTICULES, tcherenkov, mascaret, chocNormal, machDeSurpression, chaine, surface,
    stationnaires, angleSillage, kelvin });

  /* ---------- étape « Ondes en trois dimensions » (Feynman I.48.5–I.48.7) ----------
     Le paquet d'ondes est paquet(...) (plus haut) ; la relation ω(k) d'une particule libre est celle du plasma froid,
     plasma(mc²/ħ) : ω² = (mc²/ħ)² + c²k², la même équation, une autre « pulsation de coupure ».
     particule(m, o)                 (48.20)–(48.22) : o = { v } ou { T } ; E, p, ω, k, λ = h/p, vp = c²/v, vg = v.
     relationParticule(m)            plasma(mc²/ħ) : omega(k), k(ω), vp(ω), vg(ω), et la relation sans l'énergie de masse.
     ecartDispersion(k, w, c, mu)    ω²/c² − |k|² − μ² : nul si e^(i(ωt − k·r)) vérifie (48.23) (μ = 0) ou (48.24) (μ = mc/ħ).
     ondePlane(k, w)                 P(r, t) = cos(ωt − k·r), k = [kx, ky, kz], et son laplacien et ∂²/∂t² exacts.
     retards(c, theta, xs), directionArrivee(c, d, dt)   front plan sur des capteurs alignés : instants d'arrivée, et l'angle.
     pendulesCouples(wA, wB, wK)     deux pendules (masses égales) reliés par un ressort : modes, mouvement, énergies. */

  /* (48.20) E = γmc², (48.21) p = γmv, d'où (48.22) E² − p²c² = m²c⁴. Avec E = ħω, p = ħk : vp = ω/k = E/p = c²/v > c,
     vg = dω/dk = c²k/ω = c²p/E = v. Exacte en relativité restreinte pour une particule libre (aucun champ, gravité comprise :
     gh/c² ~ 10⁻¹⁶ par mètre). vpCinetique : la vitesse des crêtes si l'on retire mc² de E (ω' = T/ħ), qui tend vers v/2 aux
     faibles vitesses ; vg n'en dépend pas (la constante ajoutée à ω disparaît dans dω/dk). */
  function particule(m, o) {
    positive(m, "m"); if (!o) err("particule(m, { v } ou { T })");
    const c = CST().c, hb = CST().hbar, mc2 = m * c * c;
    let v;
    if (o.v != null) { v = positive(o.v, "v"); if (!(v < c)) err("v < c"); }
    else { const T = positive(o.T, "T"), g = 1 + T / mc2; v = c * Math.sqrt(1 - 1 / (g * g)); }
    const g = 1 / Math.sqrt(1 - (v / c) ** 2), E = g * mc2, p = g * m * v, T = (g - 1) * mc2;
    return { m, v, gamma: g, E, p, T, omega: E / hb, k: p / hb, lambda: 2 * Math.PI * hb / p, vp: c * c / v, vg: v,
      vpCinetique: T / p, invariant: E * E - (p * c) ** 2 };
  }
  /* ω(k) = c√(k² + (mc/ħ)²) : (48.22) résolue. cinetique(k) = ω(k) − mc²/ħ, la même relation avec l'origine des énergies
     au repos. Pulsation de coupure mc²/ħ : 7,76 × 10²⁰ rad·s⁻¹ pour l'électron. */
  function relationParticule(m) {
    positive(m, "m"); const c = CST().c, w0 = m * c * c / CST().hbar, P = plasma(w0, c);
    return Object.assign({}, P, { m, mu: w0 / c, cinetique: k => P.omega(k) - w0 });
  }
  /* ω²/c² − (kx² + ky² + kz²) − μ² : e^(i(ωt − k·r)) donne −kx² − ky² − kz² dans le laplacien et −ω² dans ∂²/∂t². Zéro exact
     pour (48.23) (son, μ = 0, c = vitesse du son) et (48.24) (μ = mc/ħ). Le son lui-même n'obéit à (48.23) que pour des
     surpressions ≪ P (linéarisation de « L'équation d'onde ») dans un air homogène, au repos, sans viscosité. */
  const vec3 = (k, n) => { if (!Array.isArray(k) || k.length !== 3) err(n + " = [x, y, z]"); k.forEach((v, i) => finite(v, n + "[" + i + "]")); return k; };
  function ecartDispersion(k, w, c, mu = 0) {
    vec3(k, "k"); finite(w, "ω"); positive(c, "c"); finite(mu, "μ");
    return (w / c) ** 2 - (k[0] ** 2 + k[1] ** 2 + k[2] ** 2) - mu * mu;
  }
  function ondePlane(k, w) {
    vec3(k, "k"); finite(w, "ω"); const k2 = k[0] ** 2 + k[1] ** 2 + k[2] ** 2;
    const P = (r, t) => { vec3(r, "r"); return Math.cos(w * t - (k[0] * r[0] + k[1] * r[1] + k[2] * r[2])); };
    return { k, omega: w, norme: Math.sqrt(k2), lambda: k2 > 0 ? 2 * Math.PI / Math.sqrt(k2) : Infinity,
      P, laplacien: (r, t) => -k2 * P(r, t), d2t: (r, t) => -w * w * P(r, t) };
  }
  /* front plan dont la normale fait l'angle θ avec la normale à une ligne de capteurs (axe x) : il touche le capteur
     d'abscisse x à l'instant x sin θ/c (zéro en x = 0). Le long de la ligne, la phase avance à c/sin θ ≥ c : le front glisse
     plus vite que l'onde. Inverse : deux capteurs distants de d, décalage Δt, sin θ = cΔt/d. Approximation : source loin
     devant la ligne (courbure du front ≪ : rayon ≫ L²/λ pour une ligne de longueur L), air homogène et sans vent. */
  function retards(c, theta, xs) {
    positive(c, "c"); finite(theta, "θ"); if (!Array.isArray(xs)) err("xs : tableau d'abscisses");
    return xs.map(x => finite(x, "x") * Math.sin(theta) / c);
  }
  function directionArrivee(c, d, dt) {
    positive(c, "c"); positive(d, "d"); finite(dt, "Δt");
    const s = c * dt / d; if (Math.abs(s) > 1 + 1e-12) err("|cΔt/d| > 1 : aucun front plan ne donne ce décalage");
    return Math.asin(Math.max(-1, Math.min(1, s)));
  }

  /* §48-7 : deux pendules simples de même masse, pulsations propres ωA, ωB (petits angles : ω² = g/ℓ), reliés par un ressort
     de raideur K, ωK² = K/m, détendu au repos. ẍA = −ωA² xA − ωK²(xA − xB), ẍB = −ωB² xB − ωK²(xB − xA).
     Modes : les vecteurs propres de la matrice [[ωA² + ωK², −ωK²], [−ωK², ωB² + ωK²]]. Pendules identiques : en phase ω₁ = ω₀
     (le ressort ne travaille pas), en opposition ω₂ = √(ω₀² + 2ωK²). Lâchés de (xA0, xB0) avec les vitesses (vA0, vB0),
     le mouvement est la somme des deux modes, exactement (le système est linéaire). Énergies par unité de masse :
     ½v² + ½ω²x² pour chaque pendule, ½ωK²(xA − xB)² dans le ressort. Pendules identiques, B lâché au repos en 0 : tout passe
     de A à B en π/(ω₂ − ω₁). Approximation : angles petits (sin θ ≈ θ, erreur θ²/6 : 0,2 % à 6°), ressort linéaire, ni
     frottement ni mouvement du support. */
  function pendulesCouples(wA, wB, wK) {
    positive(wA, "ωA"); positive(wB, "ωB"); finite(wK, "ωK"); if (wK < 0) err("ωK ≥ 0");
    const a = wA * wA + wK * wK, d = wB * wB + wK * wK, b = -wK * wK;
    const moy = (a + d) / 2, rac = Math.sqrt(((a - d) / 2) ** 2 + b * b);
    const l1 = moy - rac, l2 = moy + rac;
    if (!(l1 > 0)) err("mode instable");
    /* vecteurs propres normés (u = [uA, uB]) ; sans couplage, chaque pendule est son propre mode */
    const vecteur = l => { if (b === 0) return (Math.abs(l - a) <= Math.abs(l - d)) ? [1, 0] : [0, 1];
      const u = [-b, a - l], n = Math.hypot(u[0], u[1]); return u[0] < 0 ? [-u[0] / n, -u[1] / n] : [u[0] / n, u[1] / n]; };
    const u1 = vecteur(l1), u2 = vecteur(l2), w1 = Math.sqrt(l1), w2 = Math.sqrt(l2);
    function lacher(xA0, xB0, vA0 = 0, vB0 = 0) {
      [xA0, xB0, vA0, vB0].forEach((v, i) => finite(v, ["xA0", "xB0", "vA0", "vB0"][i]));
      const c1 = u1[0] * xA0 + u1[1] * xB0, c2 = u2[0] * xA0 + u2[1] * xB0;
      const s1 = (u1[0] * vA0 + u1[1] * vB0) / w1, s2 = (u2[0] * vA0 + u2[1] * vB0) / w2;
      const q1 = t => c1 * Math.cos(w1 * t) + s1 * Math.sin(w1 * t), q2 = t => c2 * Math.cos(w2 * t) + s2 * Math.sin(w2 * t);
      const p1 = t => w1 * (s1 * Math.cos(w1 * t) - c1 * Math.sin(w1 * t)), p2 = t => w2 * (s2 * Math.cos(w2 * t) - c2 * Math.sin(w2 * t));
      const xA = t => u1[0] * q1(t) + u2[0] * q2(t), xB = t => u1[1] * q1(t) + u2[1] * q2(t);
      const vA = t => u1[0] * p1(t) + u2[0] * p2(t), vB = t => u1[1] * p1(t) + u2[1] * p2(t);
      const energies = t => { const XA = xA(t), XB = xB(t), VA = vA(t), VB = vB(t);
        const A = (VA * VA + wA * wA * XA * XA) / 2, B = (VB * VB + wB * wB * XB * XB) / 2, R = wK * wK * (XA - XB) ** 2 / 2;
        return { A, B, ressort: R, totale: A + B + R }; };
      return { xA, xB, vA, vB, energies, amplitudes: [Math.hypot(c1, s1), Math.hypot(c2, s2)] };
    }
    /* pendules lâchés depuis A seul : fraction maximale de l'énergie qui passe en B, (2u₁ᴬu₁ᴮ)² au premier ordre en ωK²/ω²
       (1 pour des pendules identiques ; ωK⁴/(((ωA² − ωB²)/2)² + ωK⁴) sinon) */
    return { w1, w2, modes: [u1, u2], battement: w2 - w1, transfert: Math.PI / (w2 - w1),
      fractionMax: (2 * u1[0] * u1[1]) ** 2, lacher };
  }

  Object.assign(api, { particule, relationParticule, ecartDispersion, ondePlane, retards, directionArrivee, pendulesCouples });

  /* ---------- étape « Modes propres » (Feynman I.49) ----------
     Les deux pendules de §49-4 sont pendulesCouples (plus haut) ; la file d'atomes infinie est chaine (étape suivante du monde).
     impedanceCorde(T, mu)           c = √(T/μ) et Z = √(Tμ) = T/c d'une corde tendue (petites pentes).
     jonction(Z1, Z2)                r = (Z₁ − Z₂)/(Z₁ + Z₂), τ = 1 + r ; parts de l'énergie réfléchie r², transmise 1 − r².
     reflexion(c1, F, o)             une bosse F venue de x < 0 sur un bout fixe (49.2), un bout libre, ou une seconde corde.
     stationnaire(r, k)              incidente + réfléchie en x = 0 : amplitude √(1 + r² + 2r cos 2kx), rapport d'ondes stationnaires.
     cordeFixee(L, c)                (49.5), (49.6) : kₙ = nπ/L, ωₙ = nπc/L, forme sin kₙx.
     pincee(L, c, p, h)              corde pincée en p à la hauteur h, lâchée : coefficients, somme de N modes, solution exacte, énergies.
     inharmonicite(E, d, T, L)       corde raide : fₙ = n f₁ √(1 + Bn²), B = π³Ed⁴/(64TL²).
     membrane(a, b, c)               (49.9)–(49.12) : ω(n, m) = πc√((n/a)² + (m/b)²), forme (49.11b), les modes triés.
     determinant(wA, wB, wK, w)      (49.17) pour deux pendules quelconques : nul aux pulsations des modes.
     rapportAmplitudes(wA, wK, w)    B/A tiré de la première équation (49.16).
     modesPropres(m, K)              M ẍ = −K x, M diagonale : pulsations, formes (uᵀMu = 1), mouvement depuis (x₀, v₀), énergies.
     perles(N, T, m, L)              N perles sur un fil tendu fixé aux deux bouts : la corde discrète, comparée à la continue.
     niveauxBoite(m, L)              Eₙ = (nπħ/L)²/(2m) : une onde de matière confinée entre deux murs, non relativiste. */

  /* corde de tension T, de masse linéique μ : T ∂²y/∂x² = μ ∂²y/∂t², c = √(T/μ). Impédance Z = √(Tμ) : force transverse
     −T ∂y/∂x = Z ∂y/∂t pour une onde vers +x. Approximation : pentes ≪ 1 (la tension ne varie pas : ΔT/T ~ (EA/T) × pente²/2),
     corde parfaitement souple (raideur : voir inharmonicite), aucun frottement. */
  function impedanceCorde(T, mu) { positive(T, "T"); positive(mu, "μ"); return { c: Math.sqrt(T / mu), Z: Math.sqrt(T * mu) }; }
  /* raccord en x = 0 : continuité de y et de la force transverse. Z₂ = Infinity : bout fixe (r = −1) ; Z₂ = 0 : bout libre
     (anneau sans masse sur une tige sans frottement, r = +1). Énergie transmise (Z₂/Z₁)τ² = 1 − r². Exacte pour le modèle. */
  function jonction(Z1, Z2) {
    positive(Z1, "Z₁");
    if (!(Z2 === Infinity || (typeof Z2 === "number" && isFinite(Z2) && Z2 >= 0))) err("Z₂ ≥ 0 ou Infinity");
    const r = Z2 === Infinity ? -1 : (Z1 - Z2) / (Z1 + Z2);
    return { r, tau: 1 + r, R: r * r, T: 1 - r * r };
  }
  /* une forme F = { f, d } (bosse) avance vers +x sur la corde 1 (x < 0). o = { bout: "fixe" } (49.2) : y = F(x − c₁t) − F(−x − c₁t) ;
     { bout: "libre" } : le signe +, pente nulle en 0 ; { c2 } : une seconde corde de même tension (Z₂/Z₁ = c₁/c₂), transmise
     τF(c₁x/c₂ − c₁t) en x > 0. reflechie(x, t) est aussi l'« image » qui avance vers −x derrière le mur (x > 0). */
  function reflexion(c1, F, o) {
    positive(c1, "c₁"); forme(F, "F"); o = o || {};
    let r, c2 = null;
    if (o.bout === "fixe") r = -1;
    else if (o.bout === "libre") r = 1;
    else if (o.c2 != null) { c2 = positive(o.c2, "c₂"); r = jonction(1 / c1, 1 / c2).r; }
    else err("o = { bout: \"fixe\" | \"libre\" } ou { c2 }");
    const incidente = (x, t) => F.f(x - c1 * t), reflechie = (x, t) => r * F.f(-x - c1 * t);
    const transmise = (x, t) => (c2 == null ? 0 : (1 + r) * F.f(c1 * x / c2 - c1 * t));
    const y = (x, t) => { finite(x, "x"); finite(t, "t"); return x <= 0 ? incidente(x, t) + reflechie(x, t) : (c2 == null ? NaN : transmise(x, t)); };
    return { r, tau: 1 + r, c1, c2, incidente, reflechie, transmise, y };
  }
  /* onde incidente cos(ωt − kx) venue de x < 0, réfléchie r cos(ωt + kx) en x = 0. Amplitude locale
     |e^(−ikx) + r e^(ikx)| = √(1 + r² + 2r cos 2kx). r = −1 : 2|sin kx|, (49.3) : nœuds tous les λ/2, le premier sur le mur.
     Rapport d'ondes stationnaires (1 + |r|)/(1 − |r|), infini si tout est réfléchi. Exacte pour une onde sinusoïdale sans pertes. */
  function stationnaire(r, k) {
    finite(r, "r"); if (Math.abs(r) > 1) err("|r| ≤ 1"); positive(k, "k");
    const amplitude = x => Math.sqrt(Math.max(0, 1 + r * r + 2 * r * Math.cos(2 * k * finite(x, "x"))));
    const ar = Math.abs(r);
    return { r, k, amplitude, max: 1 + ar, min: 1 - ar, ros: ar === 1 ? Infinity : (1 + ar) / (1 - ar), interNoeuds: Math.PI / k,
      y: (x, t, w) => Math.cos(w * t - k * x) + r * Math.cos(w * t + k * x) };
  }

  /* corde fixée en 0 et L : sin kL = 0, (49.5) kL = nπ, (49.6) ωₙ = nπc/L, λₙ = 2L/n. Exacte pour une corde idéale
     (souple, petites pentes, extrémités parfaitement fixes). */
  const entier1 = (n, nm) => { if (!Number.isInteger(n) || n < 1) err(nm + " entier ≥ 1"); return n; };
  function cordeFixee(L, c) {
    positive(L, "L"); positive(c, "c");
    return { L, c, f1: c / (2 * L), k: n => entier1(n, "n") * Math.PI / L, omega: n => entier1(n, "n") * Math.PI * c / L,
      lambda: n => 2 * L / entier1(n, "n"), forme: n => { entier1(n, "n"); return x => Math.sin(n * Math.PI * x / L); } };
  }
  /* corde pincée : forme initiale en triangle (hauteur h en x = p), lâchée sans vitesse. Mode n : bₙ sin(nπx/L) cos ωₙt,
     bₙ = 2hL² sin(nπp/L)/(n²π²p(L − p)) ; bₙ = 0 si p est un nœud du mode n. exacte(x, t) : d'Alembert, moyenne des deux
     moitiés du prolongement impair et 2L-périodique de la forme. Énergies divisées par T : ½∫(y_t²/c² + y_x²)dx ;
     mode n : (L/4)(nπ/L)²bₙ², constante ; totale h²(1/p + 1/(L − p))/2. Approximation : celle de impedanceCorde (h ≪ p, L − p). */
  function pincee(L, c, p, h) {
    const C = cordeFixee(L, c); finite(p, "p"); if (!(p > 0 && p < L)) err("p dans ]0, L["); finite(h, "h");
    const initiale = x => (x <= p ? h * x / p : h * (L - x) / (L - p));
    const ext = u => { const v = ((u % (2 * L)) + 2 * L) % (2 * L); return v <= L ? initiale(v) : -initiale(2 * L - v); };
    const coefficient = n => { entier1(n, "n"); return 2 * h * L * L * Math.sin(n * Math.PI * p / L) / (n * n * Math.PI * Math.PI * p * (L - p)); };
    const somme = (x, t, N) => { entier1(N, "N"); let s = 0;
      for (let n = 1; n <= N; n++) s += coefficient(n) * Math.sin(n * Math.PI * x / L) * Math.cos(n * Math.PI * c * t / L); return s; };
    const energieMode = n => L / 4 * (n * Math.PI / L) ** 2 * coefficient(n) ** 2, energie = h * h / 2 * (1 / p + 1 / (L - p));
    return Object.assign({}, C, { p, h, initiale, coefficient, somme, exacte: (x, t) => (ext(x - c * t) + ext(x + c * t)) / 2,
      energieMode, energie, fraction: n => energieMode(n) / energie });
  }
  /* corde d'acier de module d'Young E, de diamètre d, tendue à T, longueur L : sa raideur en flexion ajoute un terme en k⁴,
     fₙ = n f₁ √(1 + Bn²), B = π³Ed⁴/(64TL²) (f₁ : la corde souple, c/2L). Approximation : Bn² ≪ 1, extrémités articulées. */
  function inharmonicite(E, d, T, L) {
    positive(E, "E"); positive(d, "d"); positive(T, "T"); positive(L, "L");
    const B = Math.PI ** 3 * E * d ** 4 / (64 * T * L * L);
    return { B, f: (n, f1) => entier1(n, "n") * positive(f1, "f₁") * Math.sqrt(1 + B * n * n) };
  }

  /* membrane rectangulaire a × b (x le long de a), bords fixes, vitesse c. Quatre ondes planes (49.11a) donnent
     (49.11b) φ = 4 sin(kₓx) sin(k_y y) e^(iωt) avec kₓ = nπ/a, k_y = mπ/b ; (49.10) k² = kₓ² + k_y² d'où
     ω(n, m) = πc√((n/a)² + (m/b)²), (49.9) en longueur d'onde. a = 2b, ω₀ = πc/b : (ω/ω₀)² = (4m² + n²)/4, (49.12).
     liste(K) : les K premiers modes, triés, à égalité par n croissant. Exacte pour une membrane idéale (tension uniforme,
     petites pentes, bords parfaitement fixes, air ignoré : un vrai tambour est chargé par l'air qu'il déplace). */
  function membrane(a, b, c) {
    positive(a, "a"); positive(b, "b"); positive(c, "c");
    const omega = (n, m) => Math.PI * c * Math.hypot(entier1(n, "n") / a, entier1(m, "m") / b);
    const forme = (n, m) => { entier1(n, "n"); entier1(m, "m"); return (x, y) => Math.sin(n * Math.PI * x / a) * Math.sin(m * Math.PI * y / b); };
    function liste(K) {
      entier1(K, "K"); const nmax = K * Math.ceil(a / b) + 1, mmax = K * Math.ceil(b / a) + 1, out = [];
      for (let n = 1; n <= nmax; n++) for (let m = 1; m <= mmax; m++) out.push({ n, m, omega: omega(n, m) });
      out.sort((u, v) => (Math.abs(u.omega - v.omega) > 1e-12 * u.omega ? u.omega - v.omega : u.n - v.n));
      return out.slice(0, K);
    }
    return { a, b, c, omega, forme, liste, lambda: (n, m) => 2 * Math.PI * c / omega(n, m) };
  }

  /* §49-4 : x = A e^(iωt), y = B e^(iωt) (49.15) dans (49.14) ; pendules de pulsations propres ωA, ωB, ωK² = k/m.
     (49.16) (ω² − ωA² − ωK²)A = −ωK²B et (ω² − ωB² − ωK²)B = −ωK²A ; une solution non nulle exige
     D(ω) = (ω² − ωA² − ωK²)(ω² − ωB² − ωK²) − ωK⁴ = 0, (49.17) quand ωA = ωB. Exacte pour le modèle (petits angles). */
  function determinant(wA, wB, wK, w) {
    positive(wA, "ωA"); positive(wB, "ωB"); finite(wK, "ωK"); finite(w, "ω");
    return (w * w - wA * wA - wK * wK) * (w * w - wB * wB - wK * wK) - wK ** 4;
  }
  function rapportAmplitudes(wA, wK, w) {
    positive(wA, "ωA"); positive(wK, "ωK"); finite(w, "ω");
    return -(w * w - wA * wA - wK * wK) / (wK * wK);
  }

  /* valeurs et vecteurs propres d'une matrice symétrique réelle, rotations de Jacobi cycliques ; triés par valeur croissante */
  function jacobi(S) {
    const n = S.length, a = S.map(r => r.slice()), V = a.map((_, i) => a.map((_, j) => (i === j ? 1 : 0)));
    const sc = Math.max(1e-300, ...a.map(r => Math.max(...r.map(Math.abs))));
    const off = () => { let s = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) s += a[i][j] * a[i][j]; return Math.sqrt(s); };
    for (let balayage = 0; balayage < 100 && off() > 1e-15 * sc; balayage++)
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (a[p][q] === 0) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const u = a[k][p], v = a[k][q]; a[k][p] = c * u - s * v; a[k][q] = s * u + c * v; }
        for (let k = 0; k < n; k++) { const u = a[p][k], v = a[q][k]; a[p][k] = c * u - s * v; a[q][k] = s * u + c * v; }
        for (let k = 0; k < n; k++) { const u = V[k][p], v = V[k][q]; V[k][p] = c * u - s * v; V[k][q] = s * u + c * v; }
      }
    if (off() > 1e-10 * sc) err("Jacobi n'a pas convergé");
    return a.map((r, i) => ({ l: r[i], v: V.map(row => row[i]) })).sort((x, y) => x.l - y.l);
  }
  /* §49-5 : système linéaire à N degrés de liberté, M ẍ = −K x, M = diag(m), K symétrique définie positive. Modes : K u = ω² M u
     (en coordonnées √m x, une matrice symétrique). Formes normées uᵀMu = 1, première composante non nulle > 0.
     lacher(x0, v0) : coordonnées normales qⱼ(0) = uⱼᵀM x₀, q̇ⱼ(0) = uⱼᵀM v₀ ; chaque qⱼ est un oscillateur harmonique
     indépendant, x(t) = Σ uⱼ qⱼ(t) exactement. Énergie ½ẋᵀMẋ + ½xᵀKx = Σ ½(q̇ⱼ² + ωⱼ²qⱼ²). Exacte pour le modèle linéaire
     (sans frottement : avec un frottement proportionnel à la vitesse, les formes ne sont les mêmes que s'il est « proportionnel »). */
  function modesPropres(m, K) {
    if (!Array.isArray(m) || !m.length) err("m : tableau de masses");
    const N = m.length; m.forEach((v, i) => positive(v, "m[" + i + "]"));
    if (!Array.isArray(K) || K.length !== N || K.some(r => !Array.isArray(r) || r.length !== N)) err("K : matrice N × N");
    K.forEach((r, i) => r.forEach((v, j) => finite(v, "K[" + i + "][" + j + "]")));
    const sc = Math.max(...K.map(r => Math.max(...r.map(Math.abs))));
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (Math.abs(K[i][j] - K[j][i]) > 1e-12 * sc) err("K doit être symétrique");
    const s = m.map(Math.sqrt), P = jacobi(K.map((r, i) => r.map((v, j) => v / (s[i] * s[j]))));
    if (!(P[0].l > 1e-12 * sc / Math.max(...m))) err("K doit être définie positive (sinon un mode a une pulsation nulle ou croît)");
    const omega = P.map(e => Math.sqrt(e.l));
    const formes = P.map(e => { const u = e.v.map((x, i) => x / s[i]), j = u.findIndex(x => Math.abs(x) > 1e-9 * Math.max(...u.map(Math.abs)));
      return u[j] < 0 ? u.map(x => -x) : u; });
    const proj = (u, x) => u.reduce((S, ui, i) => S + ui * m[i] * x[i], 0);
    function lacher(x0, v0) {
      const vec = (x, nm) => { if (!Array.isArray(x) || x.length !== N) err(nm + " : " + N + " composantes"); x.forEach((v, i) => finite(v, nm + "[" + i + "]")); return x; };
      vec(x0, "x₀"); v0 = v0 == null ? Array(N).fill(0) : vec(v0, "v₀");
      const q0 = formes.map(u => proj(u, x0)), s0 = formes.map((u, j) => proj(u, v0) / omega[j]);
      const q = t => q0.map((a, j) => a * Math.cos(omega[j] * t) + s0[j] * Math.sin(omega[j] * t));
      const qp = t => q0.map((a, j) => omega[j] * (s0[j] * Math.cos(omega[j] * t) - a * Math.sin(omega[j] * t)));
      const comb = c => formes[0].map((_, i) => c.reduce((S, cj, j) => S + cj * formes[j][i], 0));
      const position = t => comb(q(finite(t, "t"))), vitesse = t => comb(qp(finite(t, "t")));
      const energiesModes = q0.map((a, j) => (omega[j] * omega[j] * (a * a + s0[j] * s0[j])) / 2);
      const energie = t => { const x = position(t), v = vitesse(t);
        let E = 0; for (let i = 0; i < N; i++) { E += m[i] * v[i] * v[i] / 2; for (let j = 0; j < N; j++) E += x[i] * K[i][j] * x[j] / 2; } return E; };
      return { coordonnees: q, position, vitesse, energiesModes, energie,
        cinetiques: t => vitesse(t).map((v, i) => m[i] * v * v / 2) };
    }
    return { N, m, K, omega, formes, lacher };
  }
  /* N perles de masse m sur un fil de tension T, longueur L fixée aux deux bouts, espacement a = L/(N + 1). Petites pentes :
     m ÿⱼ = (T/a)(yⱼ₋₁ − 2yⱼ + yⱼ₊₁). Modes sin(nπj/(N + 1)), ωₙ = 2√(T/(ma)) sin(nπ/(2(N + 1))) = chaine(T/a, m, a) en k = nπ/L.
     continu(n) : la corde de même masse linéique μ = m/a, nπc/L avec c = √(Ta/m) ; écart relatif (nπ/(N + 1))²/24 aux petits n. */
  function perles(N, T, m, L) {
    entier1(N, "N"); positive(T, "T"); positive(m, "m"); positive(L, "L");
    const a = L / (N + 1), k = T / a;
    const K = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => (i === j ? 2 * k : Math.abs(i - j) === 1 ? -k : 0)));
    const S = modesPropres(Array(N).fill(m), K), ch = chaine(k, m, a), c = Math.sqrt(T * a / m);
    return Object.assign(S, { a, c, x: Array.from({ length: N }, (_, i) => (i + 1) * a),
      analytique: n => { entier1(n, "n"); if (n > N) err("n ≤ N : N perles, N modes"); return ch.omega(n * Math.PI / L); },
      continu: n => entier1(n, "n") * Math.PI * c / L });
  }
  /* §49-5 : une onde de matière confinée (deux murs infranchissables, distants de L) n'a que kₙ = nπ/L, comme la corde (49.5) ;
     E = ħ²k²/(2m) : Eₙ = (nπħ/L)²/(2m). Approximation : non relativiste (E ≪ mc²), murs infinis. Électron, L = 1 nm : 0,376 eV. */
  function niveauxBoite(m, L) {
    positive(m, "m"); positive(L, "L"); const hb = CST().hbar;
    return { E: n => (entier1(n, "n") * Math.PI * hb / L) ** 2 / (2 * m) };
  }

  Object.assign(api, { impedanceCorde, jonction, reflexion, stationnaire, cordeFixee, pincee, inharmonicite, membrane,
    determinant, rapportAmplitudes, modesPropres, perles, niveauxBoite });

  /* ---------- étape « Sons musicaux et série de Fourier » (Feynman I.50.1–3) ----------
     Les modes de la corde et la corde pincée existent déjà : cordeFixee, pincee, inharmonicite (plus haut).
     bruit(n, graine)                 n valeurs pseudo-aléatoires uniformes dans [−1, 1], reproductibles (un « bruit »).
     autocorrelation(y, kmax)         r(k) = ressemblance du signal échantillonné avec lui-même décalé de k pas, normée (−1 à 1).
     periodeDetectee(y, dt, o)        la plus courte période qui ramène le signal sur lui-même ; null s'il ne se répète pas.
     penteChevalet(L, c, p, h)        la pente de la corde pincée au chevalet : un créneau de période 2L/c, ses harmoniques.
     serieFourier(a0, a, b, w)        (50.2) : f(t) = a₀ + Σ aₙ cos nωt + bₙ sin nωt, a[0] = a₁.
     versCosSin(A, phi), versAmplitude(a, b)  (50.1) : A cos(ωt + φ) = a cos ωt + b sin ωt, dans les deux sens.
     signal(nom, q)                   créneau, dent de scie, triangle, impulsions de rapport q : f(u) exacte (u = t/T) et ses coefficients.
     partielle(F, N)                  la somme des N premiers harmoniques d'une forme ; ecartForme(F, N, m) : son pire écart.
     harmoniques(f0, A, phi)          un son de fondamental f₀ : Σ Aₙ cos(2πnf₀t + φₙ) ; spectre, puissance, crête.
     echantillonner(s, fe, duree, fondu)  s(t) à fe échantillons par seconde, normé, avec fondu : ce qu'une page fait entendre.
     sequence(morceaux, fe, duree, fondu)  plusieurs s(t) échantillonnés, normés chacun, bout à bout.
     jouer(morceaux, duree, o)        les fait entendre (navigateur seulement) ; false s'il n'y a pas de sortie son.
     cents(r), tempere(k), INTERVALLES   un rapport de fréquences en cents ; 2^(k/12) ; intervalles justes et tempérés.
     consonance(f1, f2, N, seuil)     les paires d'harmoniques des deux notes qui coïncident ou battent à moins de seuil (Hz). */

  /* générateur « mulberry32 » : reproductible d'un appel à l'autre (les tests et la page voient le même bruit) */
  function bruit(n, graine) {
    if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1");
    let s = (Number.isInteger(graine) ? graine : 1) >>> 0;
    return Array.from({ length: n }, () => { s = (s + 0x6D2B79F5) >>> 0; let z = s;
      z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
      return 2 * (((z ^ (z >>> 14)) >>> 0) / 4294967296) - 1; });
  }
  const echantillons = (y, nm) => { if (!Array.isArray(y) && !(y instanceof Float32Array) && !(y instanceof Float64Array)) err(nm + " : un tableau");
    for (let j = 0; j < y.length; j++) finite(y[j], nm + "[" + j + "]"); return y; };
  /* r(k) = Σ yⱼ yⱼ₊ₖ / √(Σ yⱼ² Σ yⱼ₊ₖ²), sommes sur les n − k paires : 1 si le signal décalé de k pas est le même à un facteur
     positif près. Exacte comme définition ; pour un signal de période T non multiple du pas, r(T/dt arrondi) < 1 d'un écart
     ~ (2π dt/T)² × (part des harmoniques élevés) : quelques 10⁻³ pour 50 points par période. */
  function autocorrelation(y, kmax) {
    echantillons(y, "y"); const n = y.length;
    if (!Number.isInteger(kmax) || kmax < 1 || kmax >= n) err("kmax entier, 1 ≤ kmax < longueur du signal");
    const r = new Array(kmax + 1).fill(0);
    for (let k = 0; k <= kmax; k++) { let s = 0, a = 0, b = 0;
      for (let j = 0; j + k < n; j++) { s += y[j] * y[j + k]; a += y[j] * y[j]; b += y[j + k] * y[j + k]; }
      r[k] = a > 0 && b > 0 ? s / Math.sqrt(a * b) : 0; }
    return r;
  }
  /* la période d'un signal échantillonné au pas dt : le premier sommet de r(k) entre kmin et kmax qui atteint 95 % du plus haut
     (le plus haut peut tomber sur 2T ou 3T, qui ramènent aussi le signal sur lui-même), affiné par une parabole sur trois points.
     Musical si r ≥ seuil (0,9 par défaut). o = { kmin, kmax, seuil }. Un modèle de détecteur : il exige au moins deux périodes
     dans l'enregistrement et se trompe d'octave si le fondamental est très faible devant le deuxième harmonique. */
  function periodeDetectee(y, dt, o) {
    echantillons(y, "y"); positive(dt, "dt"); o = o || {};
    const n = y.length, kmin = o.kmin == null ? 2 : o.kmin, kmax = o.kmax == null ? Math.floor(n / 2) : o.kmax, seuil = o.seuil == null ? 0.9 : o.seuil;
    if (!Number.isInteger(kmin) || !Number.isInteger(kmax) || kmin < 1 || kmax <= kmin + 1) err("1 ≤ kmin < kmax − 1, entiers");
    const r = autocorrelation(y, kmax);
    let haut = -Infinity; for (let k = kmin; k <= kmax; k++) haut = Math.max(haut, r[k]);
    let k0 = -1;
    for (let k = kmin + 1; k < kmax; k++) if (r[k] >= r[k - 1] && r[k] >= r[k + 1] && r[k] >= 0.95 * haut) { k0 = k; break; }
    if (k0 < 0 || haut < seuil) return { periode: null, r: haut, periodique: false, correlation: r };
    const g = r[k0 - 1], m = r[k0], d = r[k0 + 1], den = g - 2 * m + d, dk = den < 0 ? Math.max(-0.5, Math.min(0.5, (g - d) / (2 * den))) : 0;
    return { periode: (k0 + dk) * dt, r: m, periodique: true, correlation: r };
  }

  /* (50.2) f(t) = a₀ + Σₙ (aₙ cos nωt + bₙ sin nωt), n = 1…max(longueurs) ; a[n − 1] = aₙ, b[n − 1] = bₙ, un manque vaut 0.
     Exacte pour une somme finie ; une somme infinie converge vers f pour une f physique (continue par morceaux, de variation
     bornée), vers la moyenne des deux valeurs à un saut. */
  function serieFourier(a0, a, b, w) {
    finite(a0, "a₀"); a = a || []; b = b || []; positive(w, "ω");
    if (!Array.isArray(a) || !Array.isArray(b)) err("a, b : tableaux de coefficients");
    a.forEach((v, i) => finite(v, "a" + (i + 1))); b.forEach((v, i) => finite(v, "b" + (i + 1)));
    const N = Math.max(a.length, b.length);
    return t => { finite(t, "t"); let s = a0;
      for (let n = 1; n <= N; n++) s += (a[n - 1] || 0) * Math.cos(n * w * t) + (b[n - 1] || 0) * Math.sin(n * w * t); return s; };
  }
  /* (50.1) A cos(ωt + φ) = A cos φ cos ωt − A sin φ sin ωt : a = A cos φ, b = −A sin φ ; inversement A = √(a² + b²),
     φ = atan2(−b, a) dans ]−π, π]. Identité exacte. */
  const versCosSin = (A, phi) => { finite(A, "A"); finite(phi, "φ"); return { a: A * Math.cos(phi), b: -A * Math.sin(phi) }; };
  const versAmplitude = (a, b) => { finite(a, "a"); finite(b, "b"); return { A: Math.hypot(a, b), phi: Math.atan2(-b, a) }; };

  /* des formes périodiques de période 1 en u = t/T, crête 1 (impulsions : saut 1), moyenne nulle, et leurs coefficients exacts :
       "creneau"     signe de sin 2πu                    bₙ = 4/(nπ), n impair ;
       "scie"        2(u − ⌊u + ½⌋), monte de −1 à 1     bₙ = 2(−1)ⁿ⁺¹/(nπ) ;
       "triangle"    (2/π) arcsin(sin 2πu)               bₙ = 8(−1)^((n−1)/2)/(n²π²), n impair ;
       "impulsions"  1 − q sur |u| < q/2, −q ailleurs     aₙ = 2 sin(nπq)/(nπ) : nul quand nq est entier.
     Les coefficients décroissent en 1/n à un saut, en 1/n² à un angle : c'est ce qui rend le triangle si proche d'un son pur. */
  function signal(nom, q) {
    const tour = u => u - Math.floor(u);
    if (nom === "creneau") return { nom, a0: 0, saut: true, f: u => (tour(finite(u, "u")) < 0.5 ? (tour(u) === 0 ? 0 : 1) : (tour(u) === 0.5 ? 0 : -1)),
      a: () => 0, b: n => (entier1(n, "n") % 2 ? 4 / (n * Math.PI) : 0) };
    if (nom === "scie") return { nom, a0: 0, saut: true, f: u => { finite(u, "u"); const v = tour(u + 0.5); return v === 0 ? 0 : 2 * v - 1; },
      a: () => 0, b: n => 2 * (entier1(n, "n") % 2 ? 1 : -1) / (n * Math.PI) };
    if (nom === "triangle") return { nom, a0: 0, saut: false, f: u => 2 / Math.PI * Math.asin(Math.max(-1, Math.min(1, Math.sin(2 * Math.PI * finite(u, "u"))))),
      a: () => 0, b: n => (entier1(n, "n") % 2 ? 8 * ((n - 1) / 2 % 2 ? -1 : 1) / (n * n * Math.PI * Math.PI) : 0) };
    if (nom === "impulsions") {
      finite(q, "q"); if (!(q > 0 && q < 1)) err("q dans ]0, 1[");
      return { nom, q, a0: 0, saut: true, f: u => { const v = Math.abs(tour(finite(u, "u") + 0.5) - 0.5);
          return Math.abs(v - q / 2) < 1e-15 ? 0.5 - q : (v < q / 2 ? 1 - q : -q); },
        a: n => 2 * Math.sin(entier1(n, "n") * Math.PI * q) / (n * Math.PI), b: () => 0 };
    }
    return err("signal : \"creneau\", \"scie\", \"triangle\" ou \"impulsions\"");
  }
  /* somme des N premiers harmoniques d'une forme, en u = t/T */
  function partielle(F, N) {
    if (!F || typeof F.a !== "function") err("F : une forme"); entier1(N, "N");
    const a = Array.from({ length: N }, (_, i) => F.a(i + 1)), b = Array.from({ length: N }, (_, i) => F.b(i + 1));
    return serieFourier(F.a0, a, b, 2 * Math.PI);
  }
  /* plus grand écart |somme − forme| sur m points d'une période, et le plus grand dépassement au-dessus de la crête de la forme.
     À un saut, le dépassement ne s'éteint pas quand N grandit : il tend vers 9 % du saut (phénomène de Gibbs), il se resserre. */
  function ecartForme(F, N, m) {
    const S = partielle(F, N); m = m || 4000; entier1(m, "m");
    let e = 0, haut = -Infinity, crete = -Infinity;
    for (let j = 0; j < m; j++) { const u = j / m, s = S(u), f = F.f(u); e = Math.max(e, Math.abs(s - f)); haut = Math.max(haut, s); crete = Math.max(crete, f); }
    return { ecart: e, haut, depassement: haut - crete };
  }

  /* corde pincée en p (hauteur h), lâchée sans vitesse, chevalet en x = 0. La pente ∂y/∂x(0, t) vaut, par d'Alembert (voir pincee),
     la pente du triangle prolongé en u = ct : h/p pendant 2p/c, −h/(L − p) pendant 2(L − p)/c, et recommence toutes les 2L/c.
     Un créneau de rapport q = p/L, de moyenne nulle : pente = hL/(p(L − p)) × signal("impulsions", p/L)(ct/2L). Harmonique n :
     cₙ cos(nπct/L), cₙ = (nπ/L) bₙ de pincee = 2hL sin(nπp/L)/(nπp(L − p)). La force sur le chevalet est −T fois cette pente,
     d'où le son de la table. Approximation : celle de impedanceCorde, et un chevalet immobile (il bouge à peine : sa masse
     effective ≫ celle de la corde). */
  function penteChevalet(L, c, p, h) {
    const P = pincee(L, c, p, h), I = signal("impulsions", p / L), s = h * L / (p * (L - p)), T = 2 * L / c;
    return { periode: T, f1: 1 / T, q: p / L, haut: h / p, bas: -h / (L - p), dureeHaut: 2 * p / c,
      pente: t => s * I.f(finite(t, "t") / T), coefficient: n => s * I.a(n), coefficientCorde: n => n * Math.PI / L * P.coefficient(n) };
  }

  /* un son périodique de fondamental f₀ : s(t) = Σₙ Aₙ cos(2πnf₀t + φₙ), A[n − 1] = Aₙ ≥ 0, φ manquant = 0. Puissance moyenne
     ½ ΣAₙ², qui ne dépend pas des phases ; la crête (max |s|), elle, en dépend. Exacte pour le modèle (harmoniques exacts). */
  function harmoniques(f0, A, phi) {
    positive(f0, "f₀"); if (!Array.isArray(A) || !A.length) err("A : tableau d'amplitudes");
    A.forEach((v, i) => { finite(v, "A" + (i + 1)); if (v < 0) err("A" + (i + 1) + " ≥ 0 (une phase opposée se met dans φ)"); });
    phi = phi || []; if (!Array.isArray(phi)) err("φ : tableau de phases"); phi.forEach((v, i) => finite(v, "φ" + (i + 1)));
    const w = 2 * Math.PI * f0, ph = A.map((_, i) => phi[i] || 0);
    const s = t => { finite(t, "t"); let x = 0; for (let n = 1; n <= A.length; n++) x += A[n - 1] * Math.cos(n * w * t + ph[n - 1]); return x; };
    const crete = (m = 2048) => { let c = 0; for (let j = 0; j < m; j++) c = Math.max(c, Math.abs(s(j / (m * f0)))); return c; };
    return { f0, periode: 1 / f0, s, raies: A.map((a, i) => ({ n: i + 1, f: (i + 1) * f0, A: a, phi: ph[i] })),
      puissance: A.reduce((p, a) => p + a * a, 0) / 2, crete };
  }
  /* fe échantillons par seconde pendant duree : normé à une crête de 1, fondu linéaire de fondu secondes aux deux bouts
     (sinon un claquement). Pour être entendu sans repliement, le plus haut harmonique doit rester sous fe/2. */
  function echantillonner(s, fe, duree, fondu) {
    fonction(s, "s"); positive(fe, "fe"); positive(duree, "durée"); fondu = fondu == null ? 0.02 : fondu;
    finite(fondu, "fondu"); if (fondu < 0 || 2 * fondu > duree) err("0 ≤ fondu ≤ durée/2");
    const n = Math.round(fe * duree), y = new Float32Array(n); let c = 0;
    for (let j = 0; j < n; j++) { y[j] = s(j / fe); c = Math.max(c, Math.abs(y[j])); }
    const nf = Math.round(fe * fondu);
    for (let j = 0; j < n; j++) { const g = nf ? Math.min(1, j / nf, (n - 1 - j) / nf) : 1; y[j] = c ? y[j] * g / c : 0; }
    return y;
  }
  /* des morceaux s(t) (fonctions), chacun échantillonné et normé par echantillonner, mis bout à bout : ce que jouer envoie. */
  function sequence(morceaux, fe, duree, fondu) {
    if (!Array.isArray(morceaux) || !morceaux.length) err("morceaux : au moins une fonction s(t)");
    const parts = morceaux.map(s => echantillonner(s, fe, duree, fondu)), y = new Float32Array(parts.reduce((k, p) => k + p.length, 0));
    let k = 0; for (const p of parts) { y.set(p, k); k += p.length; }
    return y;
  }
  /* fait entendre sequence(morceaux, fe, duree, fondu). Navigateur seulement (Web Audio) : rend true si le son part, false,
     sans rien lever, s'il n'y a pas de sortie son (node, navigateur sans Web Audio, refus) ; la page affiche alors son message.
     Un appel faux (morceaux, durée) lève comme ailleurs. o = { fe = 44 100 Hz, fondu = 0,03 s, gain = 0,15, contexte } ;
     contexte : un AudioContext à utiliser (les tests en passent un faux) ; sinon un seul est créé et gardé pour la page. */
  let contexteAudio = null;
  function jouer(morceaux, duree, o) {
    o = o || {}; const fe = o.fe == null ? 44100 : o.fe, gain = o.gain == null ? 0.15 : o.gain; finite(gain, "gain");
    if (gain < 0 || gain > 1) err("0 ≤ gain ≤ 1");
    const y = sequence(morceaux, fe, duree, o.fondu == null ? 0.03 : o.fondu), AC = root.AudioContext || root.webkitAudioContext;
    if (!o.contexte && !AC) return false;
    try {
      const ctx = o.contexte || (contexteAudio = contexteAudio || new AC());
      const buf = ctx.createBuffer(1, y.length, fe); buf.getChannelData(0).set(y);
      const src = ctx.createBufferSource(), g = ctx.createGain(); g.gain.value = gain;
      src.buffer = buf; src.connect(g); g.connect(ctx.destination); src.start();
      return true;
    } catch (e) { return false; }
  }

  /* un intervalle de rapport r en cents : 1200 log₂ r ; l'octave fait 1200 cents, le demi-ton tempéré 100. */
  const cents = r => 1200 * Math.log2(positive(r, "r"));
  const tempere = k => 2 ** (finite(k, "k") / 12);
  /* intervalles justes : rapports de petits entiers ; k demi-tons tempérés pour le même intervalle */
  const INTERVALLES = Object.freeze({
    unisson: Object.freeze({ p: 1, q: 1, k: 0 }), tierceMineure: Object.freeze({ p: 6, q: 5, k: 3 }),
    tierceMajeure: Object.freeze({ p: 5, q: 4, k: 4 }), quarte: Object.freeze({ p: 4, q: 3, k: 5 }),
    quinte: Object.freeze({ p: 3, q: 2, k: 7 }), sixteMajeure: Object.freeze({ p: 5, q: 3, k: 9 }), octave: Object.freeze({ p: 2, q: 1, k: 12 }) });
  /* deux notes de fondamentaux f1 ≤ f2, chacune avec ses N premiers harmoniques exacts. Pour chaque harmonique n de la première,
     l'harmonique m de la seconde le plus proche ; gardé si |nf₁ − mf₂| < seuil. battement = |nf₁ − mf₂| (Hz), 0 si les deux
     coïncident (à 10⁻⁹ près en relatif). Rapport juste p/q irréductible : coïncidences à n = pj, m = qj ; la première est
     l'harmonique p de la note grave. Modèle : harmoniques exacts (une corde raide les décale, voir inharmonicite). */
  function consonance(f1, f2, N, seuil) {
    positive(f1, "f₁"); positive(f2, "f₂"); if (f2 < f1) [f1, f2] = [f2, f1]; entier1(N, "N"); positive(seuil, "seuil");
    const paires = [];
    for (let n = 1; n <= N; n++) {
      const m = Math.max(1, Math.round(n * f1 / f2)); if (m > N) continue;
      const d = Math.abs(n * f1 - m * f2);
      if (d < seuil) paires.push({ n, m, f: n * f1, battement: d < 1e-9 * n * f1 ? 0 : d });
    }
    return { f1, f2, paires, coincidences: paires.filter(x => x.battement === 0), battements: paires.filter(x => x.battement > 0) };
  }

  Object.assign(api, { bruit, autocorrelation, periodeDetectee, serieFourier, versCosSin, versAmplitude, signal, partielle,
    ecartForme, penteChevalet, harmoniques, echantillonner, sequence, jouer, cents, tempere, INTERVALLES, consonance });

  /* ---------- étape « Traitement du signal » (programme de CPGE, X.signal.1–4) ----------
     Réutilise : signal (formes et coefficients exacts), serieFourier, modulee (plus haut). Convention : u(t) = Re(û e^(iωt)).
     fourier(u, a, b, n)           U(f) = ∫ₐᵇ u(t) e^(−2iπft) dt par la méthode de Simpson (n pas, pair) : f ↦ Cx.
     tfRectangle(A, tau)           U(f) = Aτ sinc(πfτ), l'impulsion de hauteur A et de durée τ centrée en 0 (exacte).
     trainImpulsions(A, tau, T)    impulsions de hauteur A, durée τ, période T : raies n/T d'amplitude 2Aτ/T |sinc(nπτ/T)|,
                                   et l'enveloppe (2/T)|U(f)| qui ne dépend que de τ.
     fft(re, im)                   transformée discrète, N puissance de 2 (Cooley–Tukey, itérative) : Xₖ = Σⱼ xⱼ e^(−2iπjk/N).
     spectre(y, fe)                amplitudes unilatérales d'un signal échantillonné (N puissance de 2) : raie k à k fe/N.
     FILTRES, transfertS(type, s, Q), transfert(type, x, Q), bode(type, x, Q)
                                   H(s) d'un filtre du premier ou du deuxième ordre, s réduit (s/ω₀, Cx) ; en régime sinusoïdal
                                   x = ω/ω₀ et H(ix) : la notation complexe est H(s) pris en s = iω.
     filtrerPeriodique(F, f0, type, fc, Q, N)  une forme de signal (F = signal(…)) de fondamental f₀ filtrée harmonique par harmonique.
     passeBasNumerique(x, Te, tau) la récurrence d'Euler y_{k+1} = y_k + (Te/τ)(x_k − y_k) : un passe-bas du premier ordre numérique.
     replie(f, fe), images(f, fe, m), prelever(u, fe, n, t0), reconstruire(y, fe, t0)
                                   repliement, raies du signal échantillonné, échantillons, formule de Whittaker et Shannon.
     detecteurEnveloppe(s, dt, n, RC)            diode idéale et RC : v suit les crêtes, se décharge en e^(−t/RC) entre elles.
     demodulationSynchrone(s, wc, phi, dw, dt, n, tau)  s × 2cos((ω_c + δω)t + φ), puis passe-bas du premier ordre exact.
     ecartRms(y, z, k0)            √(moy (y − z)²)/√(moy z²) à partir de l'indice k0 (le transitoire écarté). */

  const sinc = x => (Math.abs(x) < 1e-8 ? 1 - x * x / 6 : Math.sin(x) / x);
  function fourier(u, a, b, n) {
    fonction(u, "u"); finite(a, "a"); finite(b, "b"); if (!(b > a)) err("b > a"); n = n == null ? 2000 : n;
    if (!Number.isInteger(n) || n < 2 || n % 2) err("n entier pair ≥ 2");
    const h = (b - a) / n, ys = Array.from({ length: n + 1 }, (_, j) => u(a + j * h));
    return f => { finite(f, "f"); let re = 0, im = 0;
      for (let j = 0; j <= n; j++) { const w = j === 0 || j === n ? 1 : j % 2 ? 4 : 2, p = -2 * Math.PI * f * (a + j * h);
        re += w * ys[j] * Math.cos(p); im += w * ys[j] * Math.sin(p); }
      return Cx.c(re * h / 3, im * h / 3); };
  }
  /* exacte : ∫ A e^(−2iπft) sur [−τ/2, τ/2] = Aτ sin(πfτ)/(πfτ). Zéros en f = k/τ (k ≠ 0) : le lobe central a la largeur 2/τ. */
  const tfRectangle = (A, tau) => { finite(A, "A"); positive(tau, "τ"); return f => A * tau * sinc(Math.PI * finite(f, "f") * tau); };
  /* le train : moyenne Aτ/T, harmonique n d'amplitude A × aₙ de signal("impulsions", τ/T) = 2A sin(nπq)/(nπ) = (2/T) U(n/T).
     Exacte (série de Fourier d'un créneau). Quand T grandit à τ fixé, les raies se resserrent (1/T) et baissent (en 1/T) :
     T × raie tend vers 2|U(f)|, une densité continue. */
  function trainImpulsions(A, tau, T) {
    finite(A, "A"); positive(tau, "τ"); positive(T, "T"); if (!(tau < T)) err("τ < T : sinon le signal est constant");
    const q = tau / T, I = signal("impulsions", q), U = tfRectangle(A, tau);
    return { q, f0: 1 / T, moyenne: A * q, raie: n => A * I.a(n), enveloppe: f => 2 / T * Math.abs(U(f)), U,
      u: t => A * (Math.abs(finite(t, "t") / T - Math.round(t / T)) < q / 2 ? 1 : 0) };
  }
  /* Cooley–Tukey en base 2 : renversement des bits, puis log₂ N étages de papillons. Exacte en arithmétique exacte ;
     arrondi ~ 10⁻¹⁵ log₂ N en relatif. re, im : tableaux de même longueur N = 2^p ; ils ne sont pas modifiés. */
  function fft(re, im) {
    const N = re.length; im = im || new Array(N).fill(0);
    if (!N || (N & (N - 1)) || im.length !== N) err("fft : N puissance de 2, re et im de même longueur");
    const X = Array.from(re, Number), Y = Array.from(im, Number);
    for (let i = 1, j = 0; i < N; i++) { let b = N >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b;
      if (i < j) { [X[i], X[j]] = [X[j], X[i]]; [Y[i], Y[j]] = [Y[j], Y[i]]; } }
    for (let len = 2; len <= N; len <<= 1) {
      const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
      for (let i = 0; i < N; i += len) { let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const p = i + k, q = p + len / 2, tr = X[q] * cr - Y[q] * ci, ti = X[q] * ci + Y[q] * cr;
          X[q] = X[p] - tr; Y[q] = Y[p] - ti; X[p] += tr; Y[p] += ti;
          const n = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = n; } }
    }
    return { re: X, im: Y };
  }
  /* raie k (0 ≤ k ≤ N/2) à k fe/N : amplitude |Xₖ|/N pour k = 0 et N/2, 2|Xₖ|/N sinon. Une sinusoïde qui fait un nombre entier
     de périodes dans la fenêtre donne une seule raie, exacte ; sinon elle « fuit » sur les voisines (fenêtre de durée N/fe). */
  function spectre(y, fe) {
    echantillons(y, "y"); positive(fe, "fe"); const N = y.length, X = fft(y);
    return Array.from({ length: N / 2 + 1 }, (_, k) => ({ f: k * fe / N, A: (k === 0 || k === N / 2 ? 1 : 2) * Math.hypot(X.re[k], X.im[k]) / N }));
  }

  /* H(s), s réduit (s/ω₀). Premier ordre : ω₀ = 1/τ ; deuxième ordre : ω₀ la pulsation propre, Q le facteur de qualité.
     Modèles : composants idéaux, sortie à vide (charge ≫ impédance de sortie), régime quasi stationnaire. */
  const FILTRES = ["passeBas1", "passeHaut1", "passeBas2", "passeBande2"];
  function transfertS(type, s, Q) {
    if (!s || typeof s.re !== "number") err("s : un complexe { re, im }");
    const un = Cx.c(1), d2 = () => { positive(Q, "Q"); return Cx.add(Cx.add(Cx.mul(s, s), Cx.scale(s, 1 / Q)), un); };
    if (type === "passeBas1") return Cx.div(un, Cx.add(un, s));
    if (type === "passeHaut1") return Cx.div(s, Cx.add(un, s));
    if (type === "passeBas2") return Cx.div(un, d2());
    if (type === "passeBande2") return Cx.div(Cx.scale(s, 1 / Q), d2());
    return err("type : " + FILTRES.join(", "));
  }
  const transfert = (type, x, Q) => { finite(x, "x"); if (x < 0) err("x ≥ 0"); return transfertS(type, Cx.c(0, x), Q); };
  /* gain en décibels 20 log₁₀ |H| et phase arg H dans ]−π, π] */
  function bode(type, x, Q) { const H = transfert(type, x, Q), m = Cx.abs(H); return { H, module: m, gainDb: 20 * Math.log10(m), phase: Cx.arg(H) }; }
  /* une forme F (signal(…), période 1 en u = f₀t), fondamental f₀, filtre de fréquence caractéristique fc (ω₀ = 2πfc) :
     entrée Σ (aₙ cos 2πnf₀t + bₙ sin 2πnf₀t), sortie : chaque harmonique multiplié par |H(nf₀/fc)| et déphasé de arg H.
     Exacte pour un filtre linéaire invariant en régime établi ; la somme s'arrête à N harmoniques. */
  function filtrerPeriodique(F, f0, type, fc, Q, N) {
    if (!F || typeof F.a !== "function") err("F : une forme (signal)"); positive(f0, "f₀"); positive(fc, "fc"); entier1(N, "N");
    const H0 = transfert(type, 0, Q), raies = [];
    for (let n = 1; n <= N; n++) {
      const a = F.a(n), b = F.b(n), A = Math.hypot(a, b), H = transfert(type, n * f0 / fc, Q);
      raies.push({ n, f: n * f0, a, b, A, gain: Cx.abs(H), phase: Cx.arg(H), Asortie: A * Cx.abs(H) });
    }
    const somme = sortie => t => { finite(t, "t"); let y = sortie ? F.a0 * H0.re : F.a0; const w = 2 * Math.PI * f0 * t;
      for (const r of raies) { if (!r.A) continue; const g = sortie ? r.gain : 1, p = sortie ? r.phase : 0;
        y += g * (r.a * Math.cos(r.n * w + p) + r.b * Math.sin(r.n * w + p)); }
      return y; };
    return { raies, entree: somme(false), sortie: somme(true) };
  }
  /* Euler explicite sur τ dy/dt = x − y : y_{k+1} = y_k + (Te/τ)(x_k − y_k). Approximation : erreur relative ~ Te/(2τ) sur la
     constante de temps ; stable tant que Te < 2τ, oscille entre τ et 2τ. y₀ = x₀ (repos sur l'entrée initiale). */
  function passeBasNumerique(x, Te, tau) {
    echantillons(x, "x"); positive(Te, "Te"); positive(tau, "τ"); const a = Te / tau, y = new Array(x.length);
    y[0] = x[0]; for (let k = 0; k + 1 < x.length; k++) y[k + 1] = y[k] + a * (x[k] - y[k]);
    return y;
  }

  /* la fréquence apparente d'une sinusoïde f échantillonnée à fe : cos(2πf k/fe) = cos(2πf_a k/fe) pour f_a = |f − m fe|,
     m l'entier le plus proche de f/fe ; f_a ∈ [0, fe/2]. Exacte : identité des échantillons, pas une approximation. */
  const replie = (f, fe) => { finite(f, "f"); positive(fe, "fe"); f = Math.abs(f); return Math.abs(f - fe * Math.round(f / fe)); };
  /* raies du signal échantillonné : f, et toutes les |m fe ± f|, m = 1…mmax, triées */
  function images(f, fe, mmax) {
    finite(f, "f"); positive(fe, "fe"); entier1(mmax, "m"); f = Math.abs(f); const r = [f];
    for (let m = 1; m <= mmax; m++) r.push(Math.abs(m * fe - f), m * fe + f);
    return r.sort((p, q) => p - q);
  }
  function prelever(u, fe, n, t0) {
    fonction(u, "u"); positive(fe, "fe"); entier1(n, "n"); t0 = t0 == null ? 0 : finite(t0, "t₀");
    const t = Array.from({ length: n }, (_, k) => t0 + k / fe);
    return { t, y: t.map(u) };
  }
  /* u(t) = Σₖ yₖ sinc(π(fe(t − t₀) − k)) : exacte pour un signal de bande < fe/2 et une suite infinie d'échantillons ;
     avec n échantillons, l'erreur loin des bords décroît comme 1/(distance au bord en périodes d'échantillonnage). */
  function reconstruire(y, fe, t0) {
    echantillons(y, "y"); positive(fe, "fe"); t0 = t0 == null ? 0 : finite(t0, "t₀");
    return t => { const v = fe * (finite(t, "t") - t0); let s = 0; for (let k = 0; k < y.length; k++) s += y[k] * sinc(Math.PI * (v - k)); return s; };
  }

  /* détecteur de crête : diode idéale (aucune chute de tension, charge instantanée), C en parallèle sur R.
     Si s dépasse v, la diode conduit et v = s ; sinon elle bloque et v se décharge : v ← v e^(−dt/RC).
     Fonctionne si 1/fc ≪ RC (ondulation à la porteuse ~ 1/(fc RC)) et RC ≪ 1/(2π fm b) pour suivre la descente de l'enveloppe. */
  function detecteurEnveloppe(s, dt, n, RC) {
    fonction(s, "s"); positive(dt, "dt"); entier1(n, "n"); positive(RC, "RC");
    const k = Math.exp(-dt / RC), t = new Array(n), v = new Array(n), x = new Array(n); let w = 0;
    for (let j = 0; j < n; j++) { t[j] = j * dt; x[j] = s(t[j]); w = Math.max(x[j], w * k); v[j] = w; }
    return { t, s: x, v };
  }
  /* produit par l'oscillateur local 2cos((ω_c + δω)t + φ), puis passe-bas τ dy/dt = p − y intégré exactement pour p constant
     par pas : y ← p + (y − p) e^(−dt/τ). Pour s = m(t) cos ω_c t : p = m(t)[cos(δωt + φ) + cos((2ω_c + δω)t + φ)] ;
     le filtre garde m(t) cos(δωt + φ) si 1/ω_c ≪ τ ≪ 1/ω_m. φ = π/2 : rien ; δω ≠ 0 : un battement à δω. */
  function demodulationSynchrone(s, wc, phi, dw, dt, n, tau) {
    fonction(s, "s"); positive(wc, "ω_c"); finite(phi, "φ"); finite(dw, "δω"); positive(dt, "dt"); entier1(n, "n"); positive(tau, "τ");
    const k = Math.exp(-dt / tau), t = new Array(n), p = new Array(n), y = new Array(n); let w = 0;
    for (let j = 0; j < n; j++) { t[j] = j * dt; p[j] = 2 * s(t[j]) * Math.cos((wc + dw) * t[j] + phi); w = p[j] + (w - p[j]) * k; y[j] = w; }
    return { t, produit: p, y };
  }
  function ecartRms(y, z, k0) {
    echantillons(y, "y"); echantillons(z, "z"); if (y.length !== z.length) err("y et z de même longueur");
    k0 = k0 == null ? 0 : k0; if (!Number.isInteger(k0) || k0 < 0 || k0 >= y.length) err("0 ≤ k0 < longueur");
    let e = 0, r = 0; for (let j = k0; j < y.length; j++) { e += (y[j] - z[j]) ** 2; r += z[j] ** 2; }
    return r > 0 ? Math.sqrt(e / r) : Math.sqrt(e / (y.length - k0));
  }

  Object.assign(api, { sinc, fourier, tfRectangle, trainImpulsions, fft, spectre, FILTRES, transfertS, transfert, bode, filtrerPeriodique,
    passeBasNumerique, replie, images, prelever, reconstruire, detecteurEnveloppe, demodulationSynchrone, ecartRms });

  /* ---------- étape « Coefficients de Fourier et énergie » (Feynman I.50.4–6) ----------
     Les formes et leurs coefficients exacts existent déjà (signal, partielle, ecartForme), l'énergie de la corde pincée mode par
     mode aussi (pincee(…).energieMode). Ici : les coefficients d'une fonction quelconque, l'énergie, les réponses non linéaires.
     moyenneProduit(f, g, t0, duree, m)   (1/durée) ∫ f g dt sur [t₀, t₀ + durée] : le geste de Fourier, sur une fenêtre quelconque.
     coefficients(f, T, N, m)             (50.14)–(50.16) par des moyennes sur m points d'une période : a₀, aₙ, bₙ, Aₙ, φₙ.
     carreMoyen(F)                        ⟨f²⟩ exact d'une forme de signal : créneau 1, scie et triangle 1/3, impulsions q(1 − q).
     parseval(a0, a, b)                   (50.23) divisée par T : ⟨f²⟩ = a₀² + ½ Σ (aₙ² + bₙ²).
     energieHarmoniques(F, N)             la part de ⟨f²⟩ de chacun des N premiers harmoniques d'une forme, le reste, l'écart efficace.
     sommeInverses(p, N, impairs)         Σ 1/nᵖ pour 1 ≤ n ≤ N (n impairs seulement si impairs).
     nonLineaire(K, e2, e3)               (50.25) prolongée à l'ordre 3 : x ↦ K (x + ε₂x² + ε₃x³).
     sortieNonLineaire(K, e2, e3, tons)   la sortie pour l'entrée Σ Aᵢ cos 2πfᵢt : ses raies exactes et leur origine Σ pᵢfᵢ.
     distorsion(K, e2, e3, A)             un son pur d'amplitude A : les raies 0, f, 2f, 3f de la sortie et son taux de distorsion. */

  /* règle du point milieu sur m points. Exacte quand f g est une somme de sinusoïdes de périodes durée/k, k entier, 0 < k < m
     (la fenêtre contient alors un nombre entier de leurs périodes) ; à un saut de f g, erreur ~ saut/m. m = 2000 par défaut. */
  function moyenneProduit(f, g, t0, duree, m) {
    fonction(f, "f"); fonction(g, "g"); finite(t0, "t₀"); positive(duree, "durée"); m = m == null ? 2000 : m; entier1(m, "m");
    const h = duree / m; let s = 0;
    for (let j = 0; j < m; j++) { const t = t0 + (j + 0.5) * h; s += f(t) * g(t); }
    return s / m;
  }
  /* (50.14)–(50.16), ω = 2π/T : a₀ = ⟨f⟩, aₙ = 2⟨f cos nωt⟩, bₙ = 2⟨f sin nωt⟩, moyennes sur les m points milieux d'une période.
     Exacte si f est une somme d'harmoniques de rangs < m − N (plus haut, le rang k se replie sur |k − jm|) ; à un saut de f,
     erreur ~ saut/m sur chaque coefficient. m = 4096 par défaut, m > 2N exigé. Aₙ, φₙ : (50.2a), par versAmplitude. */
  function coefficients(f, T, N, m) {
    fonction(f, "f"); positive(T, "T"); entier1(N, "N"); m = m == null ? 4096 : m; entier1(m, "m");
    if (m <= 2 * N) err("m > 2N points par période, sinon les harmoniques se replient");
    const w = 2 * Math.PI / T, ts = Array.from({ length: m }, (_, j) => (j + 0.5) * T / m), y = ts.map(t => finite(f(t), "f(t)"));
    const a0 = y.reduce((s, v) => s + v, 0) / m, a = [], b = [];
    for (let n = 1; n <= N; n++) { let c = 0, s = 0;
      for (let j = 0; j < m; j++) { const x = n * w * ts[j]; c += y[j] * Math.cos(x); s += y[j] * Math.sin(x); }
      a.push(2 * c / m); b.push(2 * s / m); }
    const p = a.map((v, i) => versAmplitude(v, b[i]));
    return { a0, a, b, A: p.map(x => x.A), phi: p.map(x => x.phi) };
  }
  /* ⟨f²⟩ sur une période des formes de signal (crête 1, moyenne nulle) : exact, par l'aire sous f². */
  function carreMoyen(F) {
    if (!F || !F.nom) err("F : une forme de signal");
    if (F.nom === "creneau") return 1;
    if (F.nom === "scie" || F.nom === "triangle") return 1 / 3;
    if (F.nom === "impulsions") return F.q * (1 - F.q);
    return err("carreMoyen : forme inconnue");
  }
  /* (50.23) / T. Exacte (identité) pour une somme finie ; pour une série infinie, exacte dès que ∫f² est fini sur une période. */
  function parseval(a0, a, b) {
    finite(a0, "a₀"); a = a || []; b = b || [];
    if (!Array.isArray(a) || !Array.isArray(b)) err("a, b : tableaux de coefficients");
    return a0 * a0 + (a.reduce((s, v, i) => s + finite(v, "a" + (i + 1)) ** 2, 0) + b.reduce((s, v, i) => s + finite(v, "b" + (i + 1)) ** 2, 0)) / 2;
  }
  /* parts[n − 1] = (aₙ² + bₙ²)/2 / ⟨f²⟩ ; reste = 1 − Σ parts (avec a₀²) : la part des harmoniques au-delà de N. Par (50.23)
     appliquée à f − S_N, l'écart efficace √⟨(f − S_N)²⟩ vaut √(⟨f²⟩ × reste) : il tend vers 0, alors que le pire écart près
     d'un saut ne tend pas vers 0 (Gibbs, voir ecartForme). Exacte pour les formes de signal (coefficients exacts). */
  function energieHarmoniques(F, N) {
    entier1(N, "N"); const total = carreMoyen(F), parts = [];
    for (let n = 1; n <= N; n++) parts.push((F.a(n) ** 2 + F.b(n) ** 2) / 2 / total);
    const cumul = parts.reduce((s, x) => s + x, F.a0 * F.a0 / total), reste = Math.max(0, 1 - cumul);
    return { total, parts, cumul, reste, ecartEfficace: Math.sqrt(total * reste) };
  }
  /* Σ 1/nᵖ, n = 1…N (impairs : n = 1, 3, 5… ≤ N). Limites : p = 2, impairs, π²/8 par (50.23) pour le créneau ; p = 4, tous,
     π⁴/90 par (50.23) pour la parabole (t − T/2)². */
  function sommeInverses(p, N, impairs) {
    positive(p, "p"); entier1(N, "N"); let s = 0;
    for (let n = 1; n <= N; n += impairs ? 2 : 1) s += 1 / n ** p;
    return s;
  }

  /* (50.24) si ε₂ = ε₃ = 0 ; (50.25) si ε₃ = 0. Les ε en unité de x⁻¹ et x⁻² : la réponse reste presque linéaire tant que
     |ε₂x| ≪ 1 et |ε₃|x² ≪ 1. Un modèle de petite non-linéarité, sans mémoire (la sortie ne dépend que de l'entrée au même instant). */
  function nonLineaire(K, e2, e3) {
    finite(K, "K"); finite(e2, "ε₂"); e3 = e3 == null ? 0 : e3; finite(e3, "ε₃");
    return x => K * (x + e2 * x * x + e3 * x * x * x);
  }
  /* entrée x(t) = Σ Aᵢ cos 2πfᵢt (phases nulles, fᵢ > 0). Chaque cosinus est deux exponentielles de fréquences ±fᵢ, d'amplitude
     Aᵢ/2 ; x² et x³ sont des produits de ces raies (c'est (50.5) terme à terme). Sortie y = K(x + ε₂x² + ε₃x³) : des cosinus de
     fréquences |Σ pᵢfᵢ|, Σ|pᵢ| ≤ 3, d'amplitudes réelles (négatives : en opposition de phase). raies = [{ f, A, origines }], f
     croissantes, origines = les vecteurs (p₁, p₂…) qui tombent sur f, de fréquence ≥ 0. Exacte pour le modèle polynomial. */
  function sortieNonLineaire(K, e2, e3, tons) {
    const g = nonLineaire(K, e2, e3); e3 = e3 == null ? 0 : e3;
    if (!Array.isArray(tons) || !tons.length) err("tons = [{ A, f }]");
    tons.forEach((x, i) => { finite(x.A, "A" + (i + 1)); positive(x.f, "f" + (i + 1)); });
    const d = tons.length, fmax = Math.max(...tons.map(x => x.f));
    const add = (M, v, c) => { const k = v.join(","), o = M.get(k); if (o) o.c += c; else M.set(k, { v, c }); };
    const x1 = new Map();
    tons.forEach((x, i) => [1, -1].forEach(s => { const v = Array(d).fill(0); v[i] = s; add(x1, v, x.A / 2); }));
    const mul = (P, Q) => { const R = new Map(); P.forEach(p => Q.forEach(q => add(R, p.v.map((u, i) => u + q.v[i]), p.c * q.c))); return R; };
    const x2 = mul(x1, x1), x3 = e3 ? mul(x2, x1) : new Map(), tout = new Map();
    [[x1, K], [x2, K * e2], [x3, K * e3]].forEach(([M, k]) => { if (k) M.forEach(o => add(tout, o.v, k * o.c)); });
    /* c(−f) = c(f) : la raie de fréquence f > 0 est la somme des deux, celle de fréquence nulle est c(0) */
    const bins = new Map(), cle = f => Math.round(Math.abs(f) / (1e-9 * fmax));
    tout.forEach(o => {
      const f = o.v.reduce((s, p, i) => s + p * tons[i].f, 0), k = cle(f);
      const b = bins.get(k) || { f: Math.abs(f), A: 0, origines: new Map() }; b.A += o.c; bins.set(k, b);
      const premier = o.v.find(p => p !== 0) || 0, w = f < 0 || (k === 0 && premier < 0) ? o.v.map(p => -p + 0) : o.v;
      b.origines.set(w.join(","), w);
    });
    const echelle = Math.abs(K) * Math.max(...tons.map(x => Math.abs(x.A)), 1e-300);
    const raies = [...bins.values()].filter(b => Math.abs(b.A) > 1e-12 * echelle)
      .map(b => ({ f: b.f, A: b.A, origines: [...b.origines.values()] })).sort((p, q) => p.f - q.f);
    const entree = t => { finite(t, "t"); return tons.reduce((s, x) => s + x.A * Math.cos(2 * Math.PI * x.f * t), 0); };
    return { raies, entree, sortie: t => g(entree(t)),
      raie: f => { const b = raies.find(r => Math.abs(r.f - f) <= 1e-9 * fmax); return b ? b.A : 0; } };
  }
  /* un son pur A cos 2πft dans le modèle : y/K = ε₂A²/2 + (A + 3ε₃A³/4) cos + (ε₂A²/2) cos 2 + (ε₃A³/4) cos 3, exactement.
     Taux de distorsion harmonique (THD) = √(A₂² + A₃²)/|A₁| ; ε₃ = 0 : ε₂A/2, proportionnel à l'amplitude. */
  function distorsion(K, e2, e3, A) {
    positive(A, "A"); const S = sortieNonLineaire(K, e2, e3, [{ A, f: 1 }]);
    const c = [0, 1, 2, 3].map(n => S.raie(n));
    return { continu: c[0], A1: c[1], A2: c[2], A3: c[3], thd: c[1] ? Math.hypot(c[2], c[3]) / Math.abs(c[1]) : Infinity };
  }

  Object.assign(api, { moyenneProduit, coefficients, carreMoyen, parseval, energieHarmoniques, sommeInverses, nonLineaire,
    sortieNonLineaire, distorsion });

  if (node) module.exports = api;
  else root.Ondes = api;
})(typeof self !== "undefined" ? self : this);

/* QuantDeux — le module commun du monde « Spin et systèmes à deux états » (Feynman III.5 à III.12). Pur, sans DOM, UMD (global
   QuantDeux). SI partout : J, kg, m, s, T. Chaque étape ajoute sa section juste avant la ligne « fin des sections », par une petite
   modification en place, avec Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction,
   ajoutée ici par chaque étape ; un nom n'est exporté qu'une fois. Le module ne requiert que constantes.js et lecons/complexes.js
   (Cx). Amplitudes : complexes { re, im } (Cx) ; un réel est accepté. Une matrice M est un tableau de lignes, M[i][j] = ⟨i|M|j⟩ ;
   un état est le tableau de ses amplitudes C_i = ⟨i|φ⟩. Base de spin 1 rangée +, 0, − (indices 0, 1, 2). Chaque fonction est un
   modèle : son domaine est dans son commentaire. Les erreurs lèvent un message en français.

   Sommaire
   Socle
     h, hbar, mu_B, u            constantes de constantes.js, recopiées par référence.
     cx(z)                      un réel ou un { re, im } rendu en { re, im }.
     appliquer(M, v)            M v : amplitudes ⟨i|M|φ⟩ = Σ_j ⟨i|M|j⟩⟨j|φ⟩ (5.32), exacte.
     produitMatrices(B, A)      B·A, l'appareil A suivi de B : ⟨j|C|i⟩ = Σ_k ⟨j|B|k⟩⟨k|A|i⟩ (5.36), exacte ; l'ordre compte.
     adjointe(M)                M† : ⟨i|M†|j⟩ = ⟨j|M|i⟩* (5.26), exacte.
     norme2(v)                  Σ |C_i|², la probabilité totale de l'état.
     produitScalaire(a, b)      ⟨a|b⟩ = Σ a_i* b_i.
   Étape « Filtres de Stern et Gerlach » (Feynman III.5.1 à 5.4). Appareil T tourné de α autour de y (puis de β autour de z) par
   rapport à S ; ⟨iT|jS⟩ rangés en matrice R[i][j].
     spin1Y(α)                  (5.38) : les neuf ⟨iT|jS⟩ d'un T tourné de α autour de l'axe y commun.
     spin1Z(β)                  (5.39) : diagonale e^(iβ), 1, e^(−iβ) ; T tourné de β autour de z.
     etatBase(n, i)             l'état de base i d'une base à n états : C_j = δ_ij (5.25).
     traverser(v, R, ouverts)   l'état (dans la base S) après un appareil T de matrice R dont les voies ouverts[i] laissent passer :
                                R† P R v, P le masque. Voies fermées : leurs atomes sont arrêtés ; voies ouvertes : recombinées sans
                                être perturbées. Toutes ouvertes : v inchangé.
     chaineFiltres(v, appareils)  [{ etat, p }] après chaque appareil { R, ouverts } ; p = fraction transmise depuis le départ.
     deviationSG(o)             { F, z1, z, vz } : atome de moment μ (J·T⁻¹) le long du gradient g (T·m⁻¹), masse m, vitesse v,
                                aimant de longueur L puis vol libre D ; F = μ g, z1 = F L²/(2 m v²), z = z1 + D·F L/(m v²).
                                Classique : trajectoire du centre du paquet, gradient uniforme, g z ≪ B.
   Étape « Algèbre du spin 1 » (Feynman III.5.5 à 5.8).
     composantesVecteur(C)      (5.42) : { x = −(C₊ − C₋)/√2, y = −i(C₊ + C₋)/√2, z = C₀ } ; se transforment comme les coordonnées
                                d'un vecteur fixe dans des axes tournés par (5.38) et (5.39). Exacte.
     probaMelange(poids, etats, chi)  Σ w_k |⟨χ|φ_k⟩|² : faisceau qui contient l'état φ_k avec la probabilité w_k (Σ w_k = 1) ;
                                les probabilités s'ajoutent, pas les amplitudes.
   Étape « Spin 1/2 : rotations autour de z » (Feynman III.6.1 à 6.3). Base +, − selon z (indices 0, 1) ; R[j][i] = ⟨jT|iS⟩.
     det2(M)                    déterminant d'une matrice 2 × 2 complexe, exact.
     standardiser(R)            (6.15) : R/√(det R), branche principale de la racine ; le signe reste libre (−R aussi standard).
     demiZ(φ)                   (6.19) : diagonale e^(iφ/2), e^(−iφ/2) ; T tourné de φ autour de z. Exacte (forme standard).
   Étape « Spin 1/2 : rotations quelconques » (Feynman III.6.4 à 6.6). Formes standard de la table 6-2 de Feynman.
     demiY(φ)                   [[cos φ/2, sin φ/2], [−sin φ/2, cos φ/2]] : T tourné de φ autour de y ; (6.27) à 180°, (6.32) à 90°.
     demiX(φ)                   (6.34) : [[cos φ/2, i sin φ/2], [i sin φ/2, cos φ/2]] ; égale à demiZ(π/2)·demiY(φ)·demiZ(−π/2).
     demiEuler(α, β, γ)         (6.35), table 6-1 : β autour de z, puis α autour du nouvel x, puis γ autour du nouveau z ;
                                demiZ(γ)·demiX(α)·demiZ(β). Exacte, au signe près.
     amplitudesAxe(θ, φ)        (6.36) : [cos(θ/2) e^(−iφ/2), sin(θ/2) e^(iφ/2)], l'état « + » selon l'axe d'angles θ, φ. Exacte.
   Étape « Les amplitudes dans le temps » (Feynman III.7.1 à 7.5). Énergies en J, temps en s, longueurs en m.
     phaseTemps(E, t)           (7.1) : e^(−iEt/ħ), l'amplitude d'un état d'énergie E définie, au repos. Exacte pour un état stationnaire.
     ondePlane(E, p, x, t)      (7.5) : e^(−i(Et − px)/ħ), à une dimension. Exacte pour une particule libre d'énergie et de quantité
                                de mouvement définies.
     battement(E1, E2, t)       |e^(−iE1t/ħ) + e^(−iE2t/ħ)|²/4 = cos²((E2 − E1)t/(2ħ)) : deux états de même poids, mesurés dans une
                                base qui les mélange à parts égales.
     attenuationBarriere(m, Ec, V, L)  e^(−2p′L/ħ), p′ = √(2m(V − Ec)) (7.25) : rapport des probabilités de part et d'autre d'une
                                barrière épaisse (p′L/ħ ≫ 1), préfacteurs d'ordre 1 négligés ; 1 si Ec ≥ V.
     deviationGradient(w, p, v, dVdy)  (7.26) : δθ = −(w/(p v)) ∂V/∂y, rad ; région de longueur w, déviation petite, V lent devant λ.
     precessionSpinDemi(muB, t) (7.36), (7.37) : { Cp, Cm, Px = cos²(μBt/ħ), Py = cos²(μBt/ħ − π/4), wp = 2μB/ħ } pour un spin
                                parti selon +x, champ B selon z, μB en J (convention de Feynman : l'état + a l'énergie +μB).
   Étape « L'espace des états » (Feynman III.8.1 à 8.3).
     projecteur(v)              |v⟩⟨v|/⟨v|v⟩ : la matrice d'un filtre idéal qui ne laisse passer que l'état v, (8.23) avec un seul terme.
     nombreAmplitudes(n, M, s)  (M s)^n : nombre d'états de base de n particules discernables, chacune dans M cases d'espace et s
                                états de spin ; renvoie Infinity au-delà de 1,8 × 10³⁰⁸.
   Étape « Le hamiltonien et la molécule d'ammoniac » (Feynman III.8.4 à 8.6). H : matrice hamiltonienne 2 × 2 en J, tableau de
   lignes H[i][j] = H_ij (réels ou complexes), constante dans le temps ; état [C1, C2].
     estHermitienne(H, tol)     vrai si H_ij* = H_ji (8.40), à tol près relativement à la plus grande entrée.
     niveauxDeux(H)             { Ebas, Ehaut, moyenne, demiEcart } : valeurs propres d'un H hermitien 2 × 2, exactes.
     evolutionExacte(H, C0, t)  l'état à t, exact pour H hermitien constant : e^(−iHt/ħ) = e^(−imt/ħ)[cos(rt/ħ) − i sin(rt/ħ) K/r],
                                m la moyenne des niveaux, K = H − m, r le demi-écart.
     evolutionEuler(H, C0, t, n)  n pas (8.38) de durée t/n ; chaque pas multiplie la norme d'un H hermitien par 1 + (E dt/ħ)²
                                sur un état propre d'énergie E : (8.38) n'est juste qu'au premier ordre en dt.
     evolutionRK4(H, C0, t, n)  n pas de Runge-Kutta d'ordre 4 de (8.39) ; vaut aussi pour H non hermitien, 2 × 2.
     ammoniac(E0, A, t, depart) (8.46) à (8.54) : { C1, C2, P1, P2 } ; depart "1" (azote en haut), "I" (C1 = −C2 = 1/√2, énergie
                                E0 + A) ou "II" (C1 = C2 = 1/√2, énergie E0 − A), noms de (9.12). Deux états de base : rotation, vibration et translation figées.
     periodeAmmoniac(A)         h/(2A), s : période de P2 = sin²(At/ħ) (8.54).
     aDepuisFrequence(nu)       A = hν/2, J : le couplage qui sépare les deux niveaux de 2A = hν.
   Étape « Matrices de Pauli » (Feynman III.11.1 à 11.3). Matrices 2 × 2 dans la base |+⟩, |−⟩ selon z ; énergies en J.
     pauli                      { un, x, y, z } : 1, σx, σy, σz, (11.5) à (11.7) et (11.9). Exactes (gelées).
     hamiltonienPauli(mu, B, E0)  (11.10) : E0·1 − μ(σx Bx + σy By + σz Bz) ; mu en J·T⁻¹, B = [Bx, By, Bz] en T. Particule de spin 1/2
                                au repos, moment le long du spin ; mouvement et autres états négligés.
     vecteurPauli(H)            { E0, a } avec H = E0·1 + a·σ, pour tout H hermitien 2 × 2. Exacte.
     etatSpinDemi(θ, φ)         [cos(θ/2), e^(iφ) sin(θ/2)] : le spin 1/2 dirigé selon (θ, φ). Exacte, phase globale de C₊ réelle.
     moyenneSigma(psi)          [⟨σx⟩, ⟨σy⟩, ⟨σz⟩] : la direction moyenne du spin, normée par |ψ|². Exacte.
     probaBasculement(A, W, t)  H = A σz + W σx (11.32), départ dans l'état +1 de σz : W²/(A² + W²) sin²(√(A² + W²) t/ħ). Exacte
                                pour A, W constants.
   Étape « L'ammoniac dans un champ électrique » (Feynman III.9.1 à 9.3). Modèle à deux états de l'ammoniac, μ son moment
   dipolaire (C·m), champ ℰ (V·m⁻¹) perpendiculaire au plan des hydrogènes ; I l'état haut, II l'état bas (9.12).
     baseIII(C)                 [C_I, C_II] = [(C1 − C2)/√2, (C1 + C2)/√2] (9.13), exacte ; base12 la défait.
     base12(D)                  [C1, C2] depuis [C_I, C_II] : C1 = (C_I + C_II)/√2, C2 = (C_II − C_I)/√2, exacte.
     niveauxChamp(E0, A, μ, ℰ)  { EI, EII } = E0 ± √(A² + μ²ℰ²) (9.30), exacte pour le modèle à deux états.
     niveauxChampFaible(E0, A, μ, ℰ)  { EI, EII } = E0 ± (A + μ²ℰ²/(2A)) (9.33), (9.34) : μℰ ≪ A ; erreur relative sur le
                                décalage ≈ μ²ℰ²/(4A²).
     forceFaisceau(μ, A, grad)  (μ²/2A) ∇(ℰ²), N, grad = ∇(ℰ²) en V²·m⁻³ : poussée de l'état II vers les champs forts, de I vers
                                les champs faibles (signe à la charge de l'appelant) ; μℰ ≪ A.
     evolutionTemps(Hf, C0, t0, t1, n)  n pas de Runge-Kutta d'ordre 4 de (8.39) pour un H qui dépend du temps, Hf(t) → H 2 × 2.
     transitionsChamp(o)        { gI, gII, PI, PII } à l'instant o.t, départ γ_I = 1 : o = { s, w, w0, t, n, approx } où s = μℰ0/ħ
                                (s⁻¹), w la pulsation du champ ℰ = 2ℰ0 cos ωt (9.37), w0 = 2A/ħ ; approx "rwa" intègre (9.45),
                                "complet" intègre (9.43), exacte pour le modèle ; n pas de Runge-Kutta.
   Étape « Photon, kaon neutre et N états » (Feynman III.11.4 à 11.6).
     polarLineaire(θ)           (11.33) : [cos θ, sin θ], photon polarisé à θ de x, base |x⟩, |y⟩. Exacte (onde plane selon z).
     versCirculaire(psi)        [C_R, C_L] d'un état [Cx, Cy] : C_R = (Cx − i Cy)/√2, C_L = (Cx + i Cy)/√2, (11.34). Exacte.
     chainePolariseurs(psi, angles)  fractions transmises après chaque polariseur idéal d'axe angles[k] (rad) depuis x.
     kaonsNeutres(t, o)         { C1, C2, Cp, Cm, Pp, Pm } : K⁰ pur à t = 0, (11.53) à (11.56) ; o = { alpha, beta, gammaL }, s⁻¹ :
                                K₁ décroît à 2β et tourne à α ; K₂ décroît à gammaL (0 par défaut, comme Feynman). Modèle à deux états.
     propresSymetrique(S)       { valeurs croissantes, vecteurs normés } d'une matrice réelle symétrique, par rotations de Jacobi.
     energiesPropres(H)         (11.62) : les N énergies réelles d'une matrice hermitienne N × N, croissantes.
     matriceAnneau(n, E0, A, ferme)  n états égaux, voisins couplés par −A, en anneau (ferme) ou en chaîne ; deux états : une chaîne. Couplages lointains nuls.
     energiesAnneau(n, E0, A, ferme) E0 − 2A cos(2πk/n) (anneau) ou E0 − 2A cos(kπ/(n + 1)) (chaîne), croissantes. Exactes pour ce modèle.
     determinant(M)             déterminant d'une matrice réelle carrée, par élimination de Gauss avec pivot partiel.
   Étape « Transitions et maser » (Feynman III.9.4 à 9.6). Molécule partie de l'état I, approximation (9.45) ; s = μℰ0/ħ (s⁻¹),
   dw = ω − ω0 (rad·s⁻¹), T durée de l'interaction (s).
     probaResonance(s, T)       sin²(sT) (9.50), exacte dans (9.45) à ω = ω0.
     probaRabi(s, dw, T)        s²/(s² + dw²/4) · sin²(√(s² + dw²/4) T) : solution exacte de (9.45) hors résonance.
     probaHorsResonance(s, dw, T)  (9.52), (sT)² sinc²(dw T/2) : premier ordre en sT, valable pour sT ≪ 1.
     intensiteOnde(ℰ0)          I = 2 ε0 c ℰ0², W·m⁻² : onde plane de champ ℰ = 2ℰ0 cos ωt, moyenne sur une période.
     probaAbsorption(μ, I, T, dw)  (9.53) : onde monochromatique d'intensité I ; identique à probaHorsResonance(μℰ0/ħ, dw, T).
     probaLargeBande(μ, Iw, T)  (9.55) : 4π² μ²/(4π ε0 ħ² c) · Iw · T, Iw l'intensité par unité de pulsation à ω0
                                (W·m⁻²·(rad·s⁻¹)⁻¹), lentement variable sur 2π/T ; premier ordre.
     probaSpectreGaussien(μ, I, σ, T)  (9.54) pour une lumière de spectre gaussien centré sur ω0, d'écart type σ (rad·s⁻¹) et
                                d'intensité totale I ; intégrée numériquement. Tend vers (9.53) à dw = 0 quand σT ≪ 1, vers
                                (9.55) quand σT ≫ 1 ; premier ordre.
     moyenneFlux(f, m, Temp, n) moyenne de f(v) sur les vitesses d'un faisceau effusif à la température Temp (densité ∝ v³ e^(−mv²/2kT)),
                                par n tranches (Simpson) de 0 à 6 √(2kT/m).
   Étape « Structure hyperfine de l'hydrogène » (Feynman III.12.1 à 12.3). Base (12.1) ++, +−, −+, −− (électron d'abord), indices 0 à 3.
     baseDeuxSpins              ["++", "+-", "-+", "--"].
     kron2(A, B)                A ⊗ B pour deux matrices 2 × 2 : la matrice 4 × 4 qui agit sur l'électron par A, le proton par B. Exacte.
     sigmaElectron(k), sigmaProton(k)  σ de l'électron ou du proton, k = "x", "y", "z", en 4 × 4. Exactes.
     sigmaEP()                  σe·σp (12.4), soit (12.13) divisée par A. Exacte.
     echangeSpins()             l'opérateur d'échange des deux spins ; σe·σp = 2P − 1 (12.16). Exacte.
     hamiltonienHyperfin(A, o)  A σe·σp − μe σez B − μp σpz B, J, (12.5) et (12.27) ; o = { B (T, selon z), mue, mup (J·T⁻¹) }.
                                État 1s seul ; les autres états de l'atome, à 10 eV, négligés ; B uniforme et constant.
     etatProduit(e, p)          l'état à 4 amplitudes d'un électron dans e et d'un proton dans p. Exacte.
     intrication(psi)           2|C1 C4 − C2 C3|/|ψ|² : 0 pour un produit, 1 pour le singulet. Exacte (états purs).
     frequenceHyperfineH        1 420 405 751,768 Hz, la raie à 21 cm, mesurée. aHyperfinH = h f/4, J.
     evolutionPropre(H, psi, t) ψ(t) par les états propres d'une matrice réelle symétrique N × N (J, s). Exacte pour H constante.
   Étape « Liaisons à deux états » (Feynman III.10.1 à 10.4).
     vecteursPropresDeux(H)     { Ebas, Ehaut, bas: [a1, a2], haut: [a1', a2'] } d'un H hermitien 2 × 2 (10.3) à (10.6), états
                                normés, a2 réel ≥ 0 (phase commune choisie) ; exacte.
     ionH2LCAO(R)               { R, S, EI, EII } : énergies de l'ion H₂⁺ (J), comptées depuis H + p séparés, protons à la
                                distance R (m), dans le modèle à deux états des orbitales 1s non orthogonales (recouvrement S),
                                répulsion des protons comprise ; protons immobiles. Le minimum de EII est vers 2,49 a0, 1,76 eV.
     porteeEchange(m)           ħ/(m c), m : portée d'une interaction due à l'échange d'une particule de masse m (kg).
     yukawa(R, m)               e^(−R/r)/R avec r = porteeEchange(m), m⁻¹ ; m = 0 : 1/R (échange de photons, Coulomb).
     alphaEchange(W, m)         √(2mW)/ħ, m⁻¹ (10.10) : décroissance de l'amplitude d'une particule liée par W loin de son centre ;
                                m = m_e par défaut ; W_H donne 1/a0.
     h2Morse                    { D0, De, re, a } de H₂ (état fondamental, NIST) : D0 4,478 eV, De = D0 + énergie de point zéro.
     morse(r, o)                De[(1 − e^(−a(r − re)))² − 1], J : courbe ajustée de H₂ spins opposés ; o = h2Morse par défaut.
                                Approchée à quelques pour cent près du minimum, grossière à grande distance.
     antiMorse(r, o)            (De/2)(e^(−2a(r − re)) + 2e^(−a(r − re))), J : courbe répulsive modèle, spins parallèles.
     probaSingulet(psi)         |C2 − C3|²/(2|ψ|²) sur ++, +−, −+, −− : probabilité de l'état de spin total nul. Exacte.
     longueurOndeTransition(dE) hc/ΔE, m.
   Étape « Colorants et spin dans un champ » (Feynman III.10.5 à 10.7). Le hamiltonien (10.22) est hamiltonienPauli(mu, B) ; l'état
   (10.30) est etatSpinDemi(θ, φ) à une phase près ; A d'un colorant : aDepuisFrequence(c/λ).
     dipoleTransitionDeux(q, d) |q| d/2, C·m : moment dipolaire de transition entre (|1⟩ ∓ |2⟩)/√2 quand la charge q passe d'un
                                point à un autre distant de d. Exacte dans le modèle à deux états ; 0 si les charges coïncident.
     frequencePrecession(mu, B) 2|μ||B|/ħ, rad·s⁻¹ (sans numéro, §10-7) ; B nombre ou [Bx, By, Bz] en T.
     tournerVecteur(v, axe, a)  v tourné de a (rad) autour d'axe, sens direct (Rodrigues). Exacte.
     precessionSpin(mu, B, n0, t)  [⟨σx⟩, ⟨σy⟩, ⟨σz⟩] à t d'un spin 1/2 parti selon n0, champ B constant : évolution exacte de (10.23).
                                Égale à n0 tourné autour de B de −2μ|B|t/ħ ; spin au repos, B uniforme.
   Étape « L'hydrogène dans un champ magnétique » (Feynman III.12.4 à 12.6). Champ B uniforme et constant selon z, T ; o = { A, mue, mup }.
     muElectron, muProton       moments le long des spins, J·T⁻¹ : −(g/2) μB (g de CODATA 2022) et 1,410 606 795 45 × 10⁻²⁶ (CODATA 2022).
     niveauxZeemanH(B, o)       { I, II, III, IV } : les quatre niveaux, J, (12.31), (12.32), (12.35). Exacts dans le modèle (12.27).
     etatZeemanH(B, etat, o)    [C2, C3] normés de l'état "III" ou "IV" sur |+−⟩, |−+⟩, (12.39). Exacte.
     projectionSpin1(a, b, c, d)  (12.53) : ⟨jT|iS⟩ du spin 1 à partir des amplitudes réelles du spin 1/2 ; lignes j, colonnes i, +, 0, −.
     demiRotationY(α)           (12.54) : { a, b, c, d } pour une rotation α autour de y.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const C = node ? require("./lecons/complexes.js") : root.Cx;
  const err = m => { throw new Error("QuantDeux : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
  const positif = (x, nom) => (Number.isFinite(x) && x >= 0 ? x : err(nom + " doit être un nombre ≥ 0"));

  const cx = z => (typeof z === "number" ? C.c(fini(z, "amplitude"), 0)
    : z && Number.isFinite(z.re) && Number.isFinite(z.im) ? C.c(z.re, z.im) : err("amplitude invalide"));
  const carree = (M, nom) => (Array.isArray(M) && M.length && M.every(l => Array.isArray(l) && l.length === M.length) ? M
    : err(nom + " doit être une matrice carrée"));
  const appliquer = (M, v) => {
    carree(M, "M"); if (!Array.isArray(v) || v.length !== M.length) err("l'état doit avoir " + M.length + " amplitudes");
    return M.map(l => l.reduce((s, m, j) => C.add(s, C.mul(cx(m), cx(v[j]))), C.c(0, 0)));
  };
  const produitMatrices = (B, A) => {
    carree(A, "A"); carree(B, "B"); if (A.length !== B.length) err("matrices de tailles différentes");
    return B.map(l => A.map((_, i) => l.reduce((s, b, k) => C.add(s, C.mul(cx(b), cx(A[k][i]))), C.c(0, 0))));
  };
  const adjointe = M => (carree(M, "M"), M.map((_, i) => M.map(l => C.conj(cx(l[i])))));
  const norme2 = v => v.reduce((s, z) => s + C.abs2(cx(z)), 0);
  const produitScalaire = (a, b) => {
    if (a.length !== b.length) err("états de tailles différentes");
    return a.reduce((s, z, i) => C.add(s, C.mul(C.conj(cx(z)), cx(b[i]))), C.c(0, 0));
  };

  const api = { h: Cst.h, hbar: Cst.hbar, mu_B: Cst.mu_B, u: Cst.u, cx, appliquer, produitMatrices, adjointe, norme2, produitScalaire };

  /* ---------- étape « Filtres de Stern et Gerlach » (Feynman III.5.1 à 5.4) ---------- */
  {
    const R2 = Math.SQRT1_2;
    /* (5.38), Feynman's signs: row i = state of T, column j = state of S, order +, 0, −. Exact for an ideal spin-one apparatus. */
    const spin1Y = a => {
      fini(a, "α"); const c = Math.cos(a), s = Math.sin(a);
      return [[(1 + c) / 2, s * R2, (1 - c) / 2], [-s * R2, c, s * R2], [(1 - c) / 2, -s * R2, (1 + c) / 2]].map(l => l.map(x => C.c(x, 0)));
    };
    /* (5.39): a rotation about the beam's field axis only shifts the phases */
    const spin1Z = b => {
      fini(b, "β"); const z = C.c(0, 0);
      return [[C.polar(1, b), z, z], [z, C.c(1, 0), z], [z, z, C.polar(1, -b)]];
    };
    const etatBase = (n, i) => {
      if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
      if (!Number.isInteger(i) || i < 0 || i >= n) err("i doit être un entier entre 0 et " + (n - 1));
      return Array.from({ length: n }, (_, j) => C.c(j === i ? 1 : 0, 0));
    };
    /* to T's base, mask the closed beams, back to S's base: R† P R v. Exact when the open beams are recombined undisturbed. */
    const traverser = (v, R, ouverts) => {
      carree(R, "R");
      if (!Array.isArray(ouverts) || ouverts.length !== R.length) err("ouverts doit avoir " + R.length + " valeurs");
      const w = appliquer(R, v).map((z, i) => (ouverts[i] ? z : C.c(0, 0)));
      return appliquer(adjointe(R), w);
    };
    const chaineFiltres = (v, appareils) => {
      const p0 = norme2(v); if (!(p0 > 0)) err("l'état de départ doit avoir une probabilité > 0");
      let e = v.map(cx);
      return appareils.map(a => { e = traverser(e, a.R, a.ouverts); return { etat: e, p: norme2(e) / p0 }; });
    };
    const deviationSG = o => {
      const mu = fini(o.mu, "mu"), g = fini(o.g, "g"), m = pos(o.m, "m"), v = pos(o.v, "v"), L = pos(o.L, "L"), D = positif(o.D || 0, "D");
      const F = mu * g, z1 = F * L * L / (2 * m * v * v), vz = F * L / (m * v);
      return { F, z1, z: z1 + D * vz / v, vz };
    };
    Object.assign(api, { spin1Y, spin1Z, etatBase, traverser, chaineFiltres, deviationSG });
  }

  /* ---------- étape « Le hamiltonien et la molécule d'ammoniac » (Feynman III.8.4 à 8.6) ---------- */
  {
    const HB = Cst.hbar;
    const deux = (H, nom) => (carree(H, nom), H.length === 2 ? H.map(l => l.map(cx)) : err(nom + " doit être 2 × 2"));
    const etat2 = C0 => (Array.isArray(C0) && C0.length === 2 ? C0.map(cx) : err("l'état doit avoir 2 amplitudes"));
    const estHermitienne = (H, tol = 1e-12) => {
      const M = deux(H, "H"), s = tol * Math.max(1e-300, ...M.flat().map(C.abs));
      return M.every((l, i) => l.every((z, j) => C.abs(C.sub(z, C.conj(M[j][i]))) <= s));
    };
    const herm = H => (estHermitienne(H, 1e-9) ? deux(H, "H") : err("H doit être hermitienne (8.40)"));
    const niveauxDeux = H => {
      const M = herm(H), moyenne = (M[0][0].re + M[1][1].re) / 2, d = (M[0][0].re - M[1][1].re) / 2, r = Math.hypot(d, C.abs(M[0][1]));
      return { Ebas: moyenne - r, Ehaut: moyenne + r, moyenne, demiEcart: r };
    };
    /* H = m + K with K² = r²: the exponential of a 2 × 2 Hermitian matrix in closed form */
    const evolutionExacte = (H, C0, t) => {
      const M = herm(H), v = etat2(C0); fini(t, "t");
      const { moyenne: m, demiEcart: r } = niveauxDeux(M), d = (M[0][0].re - M[1][1].re) / 2, ph = C.polar(1, -m * t / HB);
      const co = Math.cos(r * t / HB), si = r > 0 ? Math.sin(r * t / HB) / r : t / HB;     // sin(rt/ħ)/r → t/ħ as r → 0
      const mi = z => C.c(z.im * si, -z.re * si);                                           // −i sin(rt/ħ)/r · z
      const c1 = C.add(C.scale(v[0], co), mi(C.add(C.scale(v[0], d), C.mul(M[0][1], v[1]))));
      const c2 = C.add(C.scale(v[1], co), mi(C.add(C.mul(M[1][0], v[0]), C.scale(v[1], -d))));
      return [C.mul(ph, c1), C.mul(ph, c2)];
    };
    /* the right-hand side of (8.39): dC_i/dt = (−i/ħ) Σ_j H_ij C_j */
    const derivee = (M, v) => appliquer(M, v).map(z => C.c(z.im / HB, -z.re / HB));
    const axpy = (v, w, k) => v.map((z, i) => C.add(z, C.scale(w[i], k)));
    const nPas = n => (Number.isInteger(n) && n >= 1 ? n : err("n doit être un entier ≥ 1"));
    const evolutionEuler = (H, C0, t, n) => {
      const M = deux(H, "H"), dt = fini(t, "t") / nPas(n); let v = etat2(C0);
      for (let k = 0; k < n; k++) v = axpy(v, derivee(M, v), dt);
      return v;
    };
    const evolutionRK4 = (H, C0, t, n) => {
      const M = deux(H, "H"), dt = fini(t, "t") / nPas(n); let v = etat2(C0);
      for (let k = 0; k < n; k++) {
        const k1 = derivee(M, v), k2 = derivee(M, axpy(v, k1, dt / 2)), k3 = derivee(M, axpy(v, k2, dt / 2)), k4 = derivee(M, axpy(v, k3, dt));
        v = axpy(axpy(axpy(axpy(v, k1, dt / 6), k2, dt / 3), k3, dt / 3), k4, dt / 6);
      }
      return v;
    };
    const DEPARTS = { "1": [1, 0], I: [Math.SQRT1_2, -Math.SQRT1_2], II: [Math.SQRT1_2, Math.SQRT1_2] };      // (9.12)
    const ammoniac = (E0, A, t, depart = "1") => {
      const v = DEPARTS[depart] || err("depart doit être 1, I ou II");
      const [C1, C2] = evolutionExacte([[fini(E0, "E0"), -pos(A, "A")], [-A, E0]], v, t);
      return { C1, C2, P1: C.abs2(C1), P2: C.abs2(C2) };
    };
    const periodeAmmoniac = A => Cst.h / (2 * pos(A, "A"));
    const aDepuisFrequence = nu => Cst.h * pos(nu, "ν") / 2;
    Object.assign(api, { estHermitienne, niveauxDeux, evolutionExacte, evolutionEuler, evolutionRK4, ammoniac, periodeAmmoniac,
      aDepuisFrequence });
  }

  /* ---------- étape « Matrices de Pauli » (Feynman III.11.1 à 11.3) ---------- */
  {
    const z0 = C.c(0, 0), u1 = C.c(1, 0);
    const m2 = (a, b, c, d) => Object.freeze([Object.freeze([a, b]), Object.freeze([c, d])]);
    const pauli = Object.freeze({ un: m2(u1, z0, z0, u1), x: m2(z0, u1, u1, z0), y: m2(z0, C.c(0, -1), C.c(0, 1), z0), z: m2(u1, z0, z0, C.c(-1, 0)) });
    /* (11.10): E0·1 − μ σ·B, in J. A spin-1/2 particle at rest whose moment lies along its spin. */
    const hamiltonienPauli = (mu, B, E0 = 0) => {
      fini(mu, "mu"); fini(E0, "E0");
      if (!Array.isArray(B) || B.length !== 3) err("B doit être [Bx, By, Bz] en T");
      const [bx, by, bz] = B.map((b, i) => fini(b, "B" + "xyz"[i]));
      return [[C.c(E0 - mu * bz, 0), C.c(-mu * bx, mu * by)], [C.c(-mu * bx, -mu * by), C.c(E0 + mu * bz, 0)]];
    };
    /* any 2 × 2 Hermitian H = E0·1 + a·σ: H₁₂ = ax − i ay, H₁₁ − H₂₂ = 2az. Exact. */
    const vecteurPauli = H => {
      if (!api.estHermitienne(H, 1e-9)) err("H doit être hermitienne");
      const M = H.map(l => l.map(cx));
      return { E0: (M[0][0].re + M[1][1].re) / 2, a: [M[0][1].re, -M[0][1].im, (M[0][0].re - M[1][1].re) / 2] };
    };
    const etatSpinDemi = (theta, phi) => [C.c(Math.cos(fini(theta, "θ") / 2), 0), C.polar(Math.sin(theta / 2), fini(phi, "φ"))];
    /* ⟨σx⟩ = 2 Re(C₊* C₋), ⟨σy⟩ = 2 Im(C₊* C₋), ⟨σz⟩ = |C₊|² − |C₋|², over the norm. Exact. */
    const moyenneSigma = psi => {
      if (!Array.isArray(psi) || psi.length !== 2) err("l'état doit avoir 2 amplitudes");
      const v = psi.map(cx), n = norme2(v); if (!(n > 0)) err("état nul");
      const p = C.mul(C.conj(v[0]), v[1]);
      return [2 * p.re / n, 2 * p.im / n, (C.abs2(v[0]) - C.abs2(v[1])) / n];
    };
    /* H = A σz + W σx (11.32), start in the +1 state of σz: P = W²/(A² + W²) sin²(√(A² + W²) t/ħ). Exact for constant A, W. */
    const probaBasculement = (A, W, t) => {
      fini(A, "A"); fini(W, "W"); fini(t, "t");
      const r2 = A * A + W * W;
      return r2 === 0 ? 0 : (W * W / r2) * Math.sin(Math.sqrt(r2) * t / Cst.hbar) ** 2;
    };
    Object.assign(api, { pauli, hamiltonienPauli, vecteurPauli, etatSpinDemi, moyenneSigma, probaBasculement });
  }

  /* ---------- étape « L'ammoniac dans un champ électrique » (Feynman III.9.1 à 9.3) ---------- */
  {
    const HB = Cst.hbar, R2 = Math.SQRT1_2;
    const etat2 = C0 => (Array.isArray(C0) && C0.length === 2 ? C0.map(cx) : err("l'état doit avoir 2 amplitudes"));
    const baseIII = Cv => { const [a, b] = etat2(Cv); return [C.scale(C.sub(a, b), R2), C.scale(C.add(a, b), R2)]; };
    const base12 = D => { const [i, j] = etat2(D); return [C.scale(C.add(i, j), R2), C.scale(C.sub(j, i), R2)]; };
    const niveauxChamp = (E0, A, mu, champ) => {
      const r = Math.hypot(pos(A, "A"), fini(mu, "μ") * fini(champ, "ℰ"));
      return { EI: fini(E0, "E0") + r, EII: E0 - r };
    };
    const niveauxChampFaible = (E0, A, mu, champ) => {
      const d = pos(A, "A") + (fini(mu, "μ") * fini(champ, "ℰ")) ** 2 / (2 * A);
      return { EI: fini(E0, "E0") + d, EII: E0 - d };
    };
    const forceFaisceau = (mu, A, grad) => fini(mu, "μ") ** 2 / (2 * pos(A, "A")) * fini(grad, "∇(ℰ²)");
    const evolutionTemps = (Hf, C0, t0, t1, n) => {
      if (typeof Hf !== "function") err("Hf doit être une fonction du temps");
      if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
      const dt = (fini(t1, "t1") - fini(t0, "t0")) / n, M = t => Hf(t).map(l => l.map(cx));
      const der = (t, v) => appliquer(M(t), v).map(z => C.c(z.im / HB, -z.re / HB));
      const axpy = (v, w, k) => v.map((z, i) => C.add(z, C.scale(w[i], k)));
      let v = etat2(C0), t = t0;
      for (let k = 0; k < n; k++, t = t0 + k * dt) {
        const k1 = der(t, v), k2 = der(t + dt / 2, axpy(v, k1, dt / 2)), k3 = der(t + dt / 2, axpy(v, k2, dt / 2)), k4 = der(t + dt, axpy(v, k3, dt));
        v = axpy(axpy(axpy(axpy(v, k1, dt / 6), k2, dt / 3), k3, dt / 3), k4, dt / 6);
      }
      return v;
    };
    /* (9.43) and (9.45) are iħ dγ/dt = K(t) γ with an off-diagonal K: written as a "Hamiltonian" for evolutionTemps */
    const transitionsChamp = o => {
      const s = fini(o.s, "s"), w = fini(o.w, "w"), w0 = fini(o.w0, "w0"), t = fini(o.t, "t");
      const n = o.n == null ? 2000 : o.n, rwa = (o.approx || "rwa") === "rwa";
      if (!rwa && o.approx !== "complet") err("approx doit être rwa ou complet");
      const Hf = rwa ? u => { const k = C.scale(C.polar(1, -(w - w0) * u), HB * s); return [[0, k], [C.conj(k), 0]]; }
        : u => { const k = C.scale(C.polar(1, w0 * u), 2 * HB * s * Math.cos(w * u)); return [[0, k], [C.conj(k), 0]]; };
      const [gI, gII] = evolutionTemps(Hf, [1, 0], 0, t, n);
      return { gI, gII, PI: C.abs2(gI), PII: C.abs2(gII) };
    };
    Object.assign(api, { baseIII, base12, niveauxChamp, niveauxChampFaible, forceFaisceau, evolutionTemps, transitionsChamp });
  }

  /* ---------- étape « Photon, kaon neutre et N états » (Feynman III.11.4 à 11.6) ---------- */
  {
    const R2 = Math.SQRT1_2;
    /* (11.33): a photon polarized at θ from x, in the base |x⟩, |y⟩. Exact for a plane wave along z. */
    const polarLineaire = theta => [C.c(Math.cos(fini(theta, "θ")), 0), C.c(Math.sin(theta), 0)];
    /* (11.34) inverted: C_R = ⟨R|ψ⟩ = (Cx − i Cy)/√2, C_L = (Cx + i Cy)/√2. Exact. */
    const versCirculaire = psi => {
      if (!Array.isArray(psi) || psi.length !== 2) err("l'état doit avoir 2 amplitudes");
      const [x, y] = psi.map(cx), iy = C.c(-y.im, y.re);
      return [C.scale(C.sub(x, iy), R2), C.scale(C.add(x, iy), R2)];
    };
    /* ideal polarizers at angles[k] from x, in turn: each projects on its axis. Returns the fraction left after each. */
    const chainePolariseurs = (psi, angles) => {
      const p0 = norme2(psi); if (!(p0 > 0)) err("l'état de départ doit avoir une probabilité > 0");
      let e = psi.map(cx);
      return angles.map(a => {
        const u = polarLineaire(a), amp = produitScalaire(u, e);
        e = u.map(z => C.mul(amp, z));
        return norme2(e) / p0;
      });
    };
    /* (11.53) to (11.56): a K⁰ at t = 0; K₁ = (K⁰ + K̄⁰)/√2 decays at rate 2β and turns its phase at α relative to K₂.
       gammaL (s⁻¹, default 0): the decay rate of K₂, which Feynman neglects. Exact within this two-state model. */
    const kaonsNeutres = (t, o) => {
      const al = fini(o.alpha, "alpha"), be = positif(o.beta, "beta"), gL = positif(o.gammaL || 0, "gammaL"); fini(t, "t");
      const c1 = C.polar(R2 * Math.exp(-be * t), -al * t), c2 = C.c(R2 * Math.exp(-gL * t / 2), 0);
      const Cp = C.scale(C.add(c1, c2), R2), Cm = C.scale(C.sub(c1, c2), R2);
      return { C1: c1, C2: c2, Cp, Cm, Pp: C.abs2(Cp), Pm: C.abs2(Cm) };
    };
    /* Jacobi rotations on a real symmetric matrix: { valeurs (increasing), vecteurs (columns, normed) }. Exact to rounding. */
    const propresSymetrique = (S, tol = 1e-14) => {
      carree(S, "S"); const n = S.length, A = S.map(l => l.map(x => fini(+(x.re ?? x), "S")));
      for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (Math.abs(A[i][j] - A[j][i]) > 1e-9 * Math.max(1, Math.abs(A[i][j]))) err("S doit être symétrique");
      const V = A.map((l, i) => l.map((_, j) => (i === j ? 1 : 0)));
      const off = () => A.reduce((s, l, i) => s + l.reduce((u, x, j) => u + (i === j ? 0 : x * x), 0), 0);
      const scale = Math.max(1e-300, ...A.flat().map(Math.abs));
      for (let tour = 0; tour < 100 && off() > (tol * scale) ** 2; tour++)
        for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
          if (Math.abs(A[p][q]) < 1e-300) continue;
          const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), tt = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
          const c = 1 / Math.sqrt(tt * tt + 1), s = tt * c;
          for (let k = 0; k < n; k++) { const a = A[k][p], b = A[k][q]; A[k][p] = c * a - s * b; A[k][q] = s * a + c * b; }
          for (let k = 0; k < n; k++) { const a = A[p][k], b = A[q][k]; A[p][k] = c * a - s * b; A[q][k] = s * a + c * b; }
          for (let k = 0; k < n; k++) { const a = V[k][p], b = V[k][q]; V[k][p] = c * a - s * b; V[k][q] = s * a + c * b; }
        }
      const ordre = A.map((_, i) => i).sort((i, j) => A[i][i] - A[j][j]);
      return { valeurs: ordre.map(i => A[i][i]), vecteurs: ordre.map(i => V.map(l => l[i])) };
    };
    /* (11.62) for a Hermitian N × N matrix: its N real energies, by the real symmetric 2N × 2N [[Re, −Im], [Im, Re]], whose
       eigenvalues are those of H, each twice. Exact to rounding. */
    const energiesPropres = H => {
      carree(H, "H"); if (!H.every((l, i) => l.every((z, j) => C.abs(C.sub(cx(z), C.conj(cx(H[j][i])))) <= 1e-9 * Math.max(1, C.abs(cx(z)))))) err("H doit être hermitienne");
      const n = H.length, M = H.map(l => l.map(cx));
      const S = Array.from({ length: 2 * n }, (_, i) => Array.from({ length: 2 * n }, (_, j) => {
        const z = M[i % n][j % n]; return i < n === j < n ? z.re : i < n ? -z.im : z.im;
      }));
      return propresSymetrique(S).valeurs.filter((_, k) => k % 2 === 0);
    };
    /* N equal states on a ring (or a chain), neighbours coupled by −A: E_k = E0 − 2A cos(2πk/N) (ring) or E0 − 2A cos(kπ/(N + 1))
       (chain, k = 1…N). Exact for this tight-binding model; every other coupling neglected. */
    const matriceAnneau = (n, E0, A, ferme = true) => {
      if (!Number.isInteger(n) || n < 2) err("n doit être un entier ≥ 2");
      return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
        const d = Math.abs(i - j); return i === j ? E0 : d === 1 || (ferme && d === n - 1 && n > 2) ? -A : 0;
      }));
    };
    const energiesAnneau = (n, E0, A, ferme = true) => Array.from({ length: n }, (_, k) => ferme && n > 2 ? E0 - 2 * A * Math.cos(2 * Math.PI * k / n)
      : E0 - 2 * A * Math.cos((k + 1) * Math.PI / (n + 1))).sort((a, b) => a - b);
    /* det of a real square matrix, Gaussian elimination with partial pivoting. Exact to rounding. */
    const determinant = M => {
      carree(M, "M"); const A = M.map(l => l.map(x => fini(+(x.re ?? x), "M"))), n = A.length; let d = 1;
      for (let k = 0; k < n; k++) {
        let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
        if (A[p][k] === 0) return 0;
        if (p !== k) { [A[p], A[k]] = [A[k], A[p]]; d = -d; }
        d *= A[k][k];
        for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; }
      }
      return d;
    };
    Object.assign(api, { polarLineaire, versCirculaire, chainePolariseurs, kaonsNeutres, propresSymetrique, energiesPropres, matriceAnneau, energiesAnneau, determinant });
  }

  /* ---------- étape « Algèbre du spin 1 » (Feynman III.5.5 à 5.8) ---------- */
  {
    const composantesVecteur = c => {
      if (!Array.isArray(c) || c.length !== 3) err("un état de spin 1 a 3 amplitudes");
      const [p, z, m] = c.map(cx), r = Math.SQRT1_2;
      return { x: C.scale(C.sub(p, m), -r), y: C.mul(C.c(0, -r), C.add(p, m)), z };
    };
    const probaMelange = (poids, etats, chi) => {
      if (!Array.isArray(poids) || poids.length !== etats.length) err("un poids par état");
      const tot = poids.reduce((s, w) => s + positif(w, "poids"), 0);
      if (Math.abs(tot - 1) > 1e-9) err("les poids doivent avoir pour somme 1");
      return etats.reduce((s, e, k) => s + poids[k] * C.abs2(produitScalaire(chi, e)) / norme2(e), 0);
    };
    Object.assign(api, { composantesVecteur, probaMelange });
  }

  /* ---------- étape « Transitions et maser » (Feynman III.9.4 à 9.6) ---------- */
  {
    const HB = Cst.hbar, EPS0 = Cst.eps0, CL = Cst.c, KB = Cst.k_B;
    const sinc = u => (Math.abs(u) < 1e-6 ? 1 - u * u / 6 : Math.sin(u) / u);
    const probaResonance = (s, T) => Math.sin(fini(s, "s") * fini(T, "T")) ** 2;
    const probaRabi = (s, dw, T) => {
      const W2 = fini(s, "s") ** 2 + fini(dw, "dw") ** 2 / 4;
      return W2 > 0 ? s * s / W2 * Math.sin(Math.sqrt(W2) * fini(T, "T")) ** 2 : 0;
    };
    const probaHorsResonance = (s, dw, T) => (fini(s, "s") * fini(T, "T")) ** 2 * sinc(fini(dw, "dw") * T / 2) ** 2;
    const intensiteOnde = e0 => 2 * EPS0 * CL * fini(e0, "ℰ0") ** 2;
    const probaAbsorption = (mu, I, T, dw) => 2 * Math.PI * fini(mu, "μ") ** 2 / (4 * Math.PI * EPS0 * HB * HB * CL) * pos(I, "I")
      * fini(T, "T") ** 2 * sinc(fini(dw, "dw") * T / 2) ** 2;
    const probaLargeBande = (mu, Iw, T) => 4 * Math.PI ** 2 * fini(mu, "μ") ** 2 / (4 * Math.PI * EPS0 * HB * HB * CL) * fini(Iw, "Iw") * fini(T, "T");
    const moyenneFlux = (f, m, Temp, n = 400) => {
      if (typeof f !== "function") err("f doit être une fonction de la vitesse");
      if (!Number.isInteger(n) || n < 2 || n % 2) err("n doit être un entier pair ≥ 2");
      const a = Math.sqrt(2 * KB * pos(Temp, "T") / pos(m, "m")), h = 6 * a / n;
      let num = 0, den = 0;
      for (let k = 0; k <= n; k++) {
        const v = k * h, w = (k === 0 || k === n ? 1 : k % 2 ? 4 : 2) * v ** 3 * Math.exp(-((v / a) ** 2));
        if (w) { num += w * f(v); den += w; }
      }
      return num / den;
    };
    const probaSpectreGaussien = (mu, I, sig, T) => {
      pos(I, "I"); pos(sig, "σ"); pos(T, "T");
      const L = 6 * sig, n = 2 * Math.ceil(Math.max(200, 20 * L * T / Math.PI)), h = 2 * L / n, k0 = I / (sig * Math.sqrt(2 * Math.PI));
      let p = 0;
      for (let k = 0; k <= n; k++) {
        const dw = -L + k * h, w = k === 0 || k === n ? 1 : k % 2 ? 4 : 2;
        p += w * probaAbsorption(mu, k0 * Math.exp(-(dw * dw) / (2 * sig * sig)), T, dw);
      }
      return p * h / 3;
    };
    Object.assign(api, { probaResonance, probaRabi, probaHorsResonance, intensiteOnde, probaAbsorption, probaLargeBande, moyenneFlux,
      probaSpectreGaussien });
  }

  /* ---------- étape « Structure hyperfine de l'hydrogène » (Feynman III.12.1 à 12.3) ---------- */
  {
    /* (12.1): the four base states, electron sign first */
    const baseDeuxSpins = Object.freeze(["++", "+-", "-+", "--"]);
    /* A ⊗ B for 2 × 2 matrices: ⟨ab|A⊗B|cd⟩ = ⟨a|A|c⟩⟨b|B|d⟩, index 2a + b. Exact. */
    const kron2 = (A, B) => {
      const a = deux2(A), b = deux2(B);
      return [0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => C.mul(a[i >> 1][j >> 1], b[i & 1][j & 1])));
    };
    function deux2(M) { carree(M, "M"); if (M.length !== 2) err("matrice 2 × 2 attendue"); return M.map(l => l.map(cx)); }
    const P = api.pauli, un = P.un;
    const sigmaElectron = k => kron2(P[k] || err("axe x, y ou z attendu"), un);
    const sigmaProton = k => kron2(un, P[k] || err("axe x, y ou z attendu"));
    const somme = (A, B) => A.map((l, i) => l.map((z, j) => C.add(z, B[i][j])));
    const fois = (M, k) => M.map(l => l.map(z => C.scale(z, k)));
    /* (12.4): σe·σp, the 4 × 4 matrix (12.13) divided by A. Exact. */
    const sigmaEP = () => ["x", "y", "z"].map(k => produitMatrices(sigmaElectron(k), sigmaProton(k))).reduce(somme);
    /* the spin-exchange operator: |ab⟩ → |ba⟩; Dirac's rule (12.16) says σe·σp = 2P − 1. Exact. */
    const echangeSpins = () => [0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => C.c(j === ((i & 1) << 1 | i >> 1) ? 1 : 0, 0)));
    /* (12.5) with E0 = 0, plus (12.27) for a field B along z: A σe·σp − μe σez B − μp σpz B, in J.
       mue, mup: moments along the spins (J·T⁻¹), the electron's negative. Ground state 1s only; B uniform and static. */
    const hamiltonienHyperfin = (A, o = {}) => {
      fini(A, "A"); const B = fini(o.B || 0, "B"), me = fini(o.mue || 0, "mue"), mp = fini(o.mup || 0, "mup");
      return somme(fois(sigmaEP(), A), somme(fois(sigmaElectron("z"), -me * B), fois(sigmaProton("z"), -mp * B)));
    };
    /* the product of an electron state e and a proton state p, in the base (12.1). Exact. */
    const etatProduit = (e, p) => {
      if (!Array.isArray(e) || e.length !== 2 || !Array.isArray(p) || p.length !== 2) err("deux états à 2 amplitudes attendus");
      const a = e.map(cx), b = p.map(cx);
      return [C.mul(a[0], b[0]), C.mul(a[0], b[1]), C.mul(a[1], b[0]), C.mul(a[1], b[1])];
    };
    /* 2|C1 C4 − C2 C3| / |ψ|²: 0 for a product state, 1 for the singlet or the m = 0 triplet. Exact (pure states). */
    const intrication = psi => {
      if (!Array.isArray(psi) || psi.length !== 4) err("l'état doit avoir 4 amplitudes");
      const v = psi.map(cx), n = norme2(v); if (!(n > 0)) err("état nul");
      return 2 * C.abs(C.sub(C.mul(v[0], v[3]), C.mul(v[1], v[2]))) / n;
    };
    /* measured hydrogen 1s hyperfine frequency (Hz) and A = h f / 4, since the levels A and −3A are 4A apart */
    const frequenceHyperfineH = 1420.405751768e6;
    const aHyperfinH = Cst.h * frequenceHyperfineH / 4;
    /* ψ(t) = Σₙ |n⟩⟨n|ψ⟩ e^(−iEₙt/ħ) for a real symmetric H (J), by its eigenstates: exact for any N, H constant. */
    const evolutionPropre = (H, psi, t) => {
      fini(t, "t"); const { valeurs: E, vecteurs: V } = api.propresSymetrique(H), v = psi.map(cx);
      if (v.length !== V.length) err("l'état doit avoir " + V.length + " amplitudes");
      return v.map((_, i) => V.reduce((s, u, n) => C.add(s, C.scale(C.mul(C.polar(1, -E[n] * t / Cst.hbar), v.reduce((a, z, j) => C.add(a, C.scale(z, u[j])), C.c(0, 0))), u[i])), C.c(0, 0)));
    };
    Object.assign(api, { baseDeuxSpins, kron2, sigmaElectron, sigmaProton, sigmaEP, echangeSpins, hamiltonienHyperfin, etatProduit, intrication,
      frequenceHyperfineH, aHyperfinH, evolutionPropre });
  }

  /* ---------- étape « Spin 1/2 : rotations autour de z » (Feynman III.6.1 à 6.3) ---------- */
  {
    const det2 = M => {
      if (!Array.isArray(M) || M.length !== 2 || M.some(l => !Array.isArray(l) || l.length !== 2)) err("det2 attend une matrice 2 × 2");
      const m = M.map(l => l.map(cx));
      return C.sub(C.mul(m[0][0], m[1][1]), C.mul(m[0][1], m[1][0]));
    };
    const standardiser = R => {
      const d = det2(R); if (C.abs(d) === 0) err("matrice de déterminant nul");
      const r = C.polar(Math.sqrt(C.abs(d)), C.arg(d) / 2);
      return R.map(l => l.map(z => C.div(cx(z), r)));
    };
    const demiZ = f => (fini(f, "φ"), [[C.polar(1, f / 2), C.c(0, 0)], [C.c(0, 0), C.polar(1, -f / 2)]]);
    Object.assign(api, { det2, standardiser, demiZ });
  }

  /* ---------- étape « Liaisons à deux états » (Feynman III.10.1 à 10.4) ---------- */
  {
    const HB = Cst.hbar, CL = Cst.c, A0 = Cst.a0, EH = Cst.hbar ** 2 / (Cst.m_e * Cst.a0 ** 2);   // hartree, J
    /* eigenvectors from (10.5): a1/a2 = H12/(E − H11); H12 = 0: the base states themselves */
    const vecteursPropresDeux = H => {
      const n = api.niveauxDeux(H), M = H.map(l => l.map(cx));
      const vec = E => {
        let a1, a2;
        if (C.abs(M[0][1]) > 0) { a1 = M[0][1]; a2 = C.c(E - M[0][0].re, 0); }
        else { const haut = Math.abs(E - M[0][0].re) <= Math.abs(E - M[1][1].re); a1 = C.c(haut ? 1 : 0, 0); a2 = C.c(haut ? 0 : 1, 0); }
        const nr = Math.hypot(C.abs(a1), C.abs(a2)), ph = C.abs(a2) > 0 ? C.polar(1, -C.arg(a2)) : C.c(1, 0);
        return [C.scale(C.mul(a1, ph), 1 / nr), C.scale(C.mul(a2, ph), 1 / nr)];
      };
      return { Ebas: n.Ebas, Ehaut: n.Ehaut, bas: vec(n.Ebas), haut: vec(n.Ehaut) };
    };
    /* 1s orbitals on each proton, in atomic units: S = e^−R(1 + R + R²/3), Coulomb integral J = 1/R − e^−2R(1 + 1/R), exchange
       integral K = e^−R(1 + R). H11 = −1/2 − J + 1/R, H12 = −S/2 − K + S/R (the 1/R terms: proton repulsion), E = (H11 ± H12)/(1 ± S). */
    const ionH2LCAO = R => {
      const r = pos(R, "R") / A0, e = Math.exp(-r), S = e * (1 + r + r * r / 3), J = 1 / r - Math.exp(-2 * r) * (1 + 1 / r), Kx = e * (1 + r);
      const H11 = -0.5 - J + 1 / r, H12 = -S / 2 - Kx + S / r;
      return { R, S, EII: ((H11 + H12) / (1 + S) + 0.5) * EH, EI: ((H11 - H12) / (1 - S) + 0.5) * EH };
    };
    const porteeEchange = m => HB / (pos(m, "m") * CL);
    const yukawa = (R, m) => { pos(R, "R"); if (m === 0) return 1 / R; return Math.exp(-R / porteeEchange(m)) / R; };
    /* (10.9) and (10.10): an electron bound by W has an imaginary momentum i√(2mW); its amplitude to be far away falls as e^(−αR) */
    const alphaEchange = (W, m = Cst.m_e) => Math.sqrt(2 * pos(m, "m") * pos(W, "W")) / HB;
    /* H₂ ground state X¹Σg⁺ (NIST Chemistry WebBook): re = 0,741 44 Å, ωe = 4 401,213 cm⁻¹, ωe xe = 121,336 cm⁻¹, D0 = 36 118,3 cm⁻¹.
       De = D0 + ωe/2 − ωe xe/4 (zero-point energy of the anharmonic oscillator); Morse a = ωe √(μ/(2De)), μ = m_H/2. */
    const CM = Cst.h * CL * 100;                                       // J per cm⁻¹
    const h2Morse = (() => { const D0 = 36118.3 * CM, De = D0 + (4401.213 / 2 - 121.336 / 4) * CM, mu = (Cst.m_p + Cst.m_e) / 2;
      return { D0, De, re: 0.74144e-10, a: 2 * Math.PI * CL * 440121.3 * Math.sqrt(mu / (2 * De)) }; })();
    const morseOpts = o => ({ De: pos(o.De, "De"), re: pos(o.re, "re"), a: pos(o.a, "a") });
    /* Morse: De[(1 − e^(−a(r − re)))² − 1], zero for separated atoms, −De at re */
    const morse = (r, o = h2Morse) => { const { De, re, a } = morseOpts(o), x = Math.exp(-a * (pos(r, "r") - re)); return De * ((1 - x) ** 2 - 1); };
    /* a repulsive model curve for the spin-parallel state: (De/2)(e^(−2a(r − re)) + 2e^(−a(r − re))), no minimum */
    const antiMorse = (r, o = h2Morse) => { const { De, re, a } = morseOpts(o), x = Math.exp(-a * (pos(r, "r") - re)); return De / 2 * (x * x + 2 * x); };
    /* two electrons, base ++, +−, −+, −− (first electron first): probability of the singlet (|+−⟩ − |−+⟩)/√2. Exact. */
    const probaSingulet = psi => { if (!Array.isArray(psi) || psi.length !== 4) err("état à 4 amplitudes attendu");
      const v = psi.map(cx), n = api.norme2(v); if (!(n > 0)) err("état nul"); return C.abs(C.sub(v[1], v[2])) ** 2 / 2 / n; };
    /* the vacuum wavelength of a photon that carries ΔE (J) */
    const longueurOndeTransition = dE => Cst.h * CL / pos(dE, "ΔE");
    Object.assign(api, { vecteursPropresDeux, ionH2LCAO, porteeEchange, yukawa, alphaEchange, h2Morse, morse, antiMorse, probaSingulet,
      longueurOndeTransition });
  }

  /* ---------- étape « L'hydrogène dans un champ magnétique » (Feynman III.12.4 à 12.6) ---------- */
  {
    /* moments along the spins, J·T⁻¹: the electron's from g (CODATA 2022), negative; the proton's (CODATA 2022) */
    const muElectron = -1.00115965218046 * Cst.mu_B, muProton = 1.41060679545e-26;
    const opts = o => ({ A: fini(o.A ?? api.aHyperfinH, "A"), me: fini(o.mue ?? muElectron, "mue"), mp: fini(o.mup ?? muProton, "mup") });
    /* (12.31), (12.32), (12.35): the four levels I, II, III, IV of 1s hydrogen in a uniform static field B along z, J. Exact in this model. */
    const niveauxZeemanH = (B, o = {}) => {
      fini(B, "B"); const { A, me, mp } = opts(o), r = Math.sqrt(1 + ((me - mp) * B) ** 2 / (4 * A * A));
      return { I: A - (me + mp) * B, II: A + (me + mp) * B, III: A * (-1 + 2 * r), IV: -A * (1 + 2 * r) };
    };
    /* (12.39): the normed amplitudes [C2, C3] of |+−⟩ and |−+⟩ in state III or IV. Exact; at B = 0, (1, ±1)/√2. */
    const etatZeemanH = (B, etat, o = {}) => {
      const { A, me, mp } = opts(o), E = niveauxZeemanH(B, o)[etat];
      if (etat !== "III" && etat !== "IV") err("état III ou IV attendu");
      const c2 = E + A - (me - mp) * B, c3 = 2 * A, n = Math.hypot(c2, c3);     // C2/C3 = (E + A − μ′B)/2A with μ′ = −(μe − μp)
      return [c2 / n, c3 / n];
    };
    /* (12.48), (12.52), (12.49) → (12.53): ⟨jT|iS⟩ for spin 1 from the spin-1/2 amplitudes a = ⟨+T|+S⟩, b = ⟨−T|+S⟩,
       c = ⟨+T|−S⟩, d = ⟨−T|−S⟩ (real), rows j = +, 0, −, columns i = +, 0, −. Exact. */
    const projectionSpin1 = (a, b, c, d) => {
      [a, b, c, d].forEach((x, k) => fini(x, "abcd"[k])); const s = Math.SQRT2;
      return [[a * a, s * a * c, c * c], [s * a * b, a * d + b * c, s * c * d], [b * b, s * b * d, d * d]].map(l => l.map(x => C.c(x, 0)));
    };
    /* (12.54): a, b, c, d for a rotation α about y */
    const demiRotationY = al => { fini(al, "α"); return { a: Math.cos(al / 2), b: -Math.sin(al / 2), c: Math.sin(al / 2), d: Math.cos(al / 2) }; };
    Object.assign(api, { muElectron, muProton, niveauxZeemanH, etatZeemanH, projectionSpin1, demiRotationY });
  }

  /* ---------- étape « Spin 1/2 : rotations quelconques » (Feynman III.6.4 à 6.6) ---------- */
  {
    const demiY = f => { fini(f, "φ"); const c = Math.cos(f / 2), s = Math.sin(f / 2); return [[C.c(c, 0), C.c(s, 0)], [C.c(-s, 0), C.c(c, 0)]]; };
    const demiX = f => { fini(f, "φ"); const c = Math.cos(f / 2), s = Math.sin(f / 2); return [[C.c(c, 0), C.c(0, s)], [C.c(0, s), C.c(c, 0)]]; };
    const demiEuler = (a, b, g) => produitMatrices(api.demiZ(g), produitMatrices(demiX(a), api.demiZ(b)));
    const amplitudesAxe = (th, f) => { fini(th, "θ"); fini(f, "φ"); return [C.polar(Math.cos(th / 2), -f / 2), C.polar(Math.sin(th / 2), f / 2)]; };
    Object.assign(api, { demiY, demiX, demiEuler, amplitudesAxe });
  }

  /* ---------- étape « Les amplitudes dans le temps » (Feynman III.7.1 à 7.5) ---------- */
  {
    const HB = Cst.hbar;
    const phaseTemps = (E, t) => C.polar(1, -fini(E, "E") * fini(t, "t") / HB);
    const ondePlane = (E, p, x, t) => C.polar(1, -(fini(E, "E") * fini(t, "t") - fini(p, "p") * fini(x, "x")) / HB);
    const battement = (E1, E2, t) => C.abs2(C.add(phaseTemps(E1, t), phaseTemps(E2, t))) / 4;
    const attenuationBarriere = (m, Ec, V, L) => {
      pos(m, "m"); positif(Ec, "Ec"); fini(V, "V"); positif(L, "L");
      if (Ec >= V) return 1;
      return Math.exp(-2 * Math.sqrt(2 * m * (V - Ec)) * L / HB);
    };
    const deviationGradient = (w, p, v, dVdy) => -positif(w, "w") / (pos(p, "p") * pos(v, "v")) * fini(dVdy, "dVdy");
    const precessionSpinDemi = (muB, t) => {
      const a = fini(muB, "muB") * fini(t, "t") / HB, r = Math.SQRT1_2;
      return { Cp: C.polar(r, -a), Cm: C.polar(r, a), Px: Math.cos(a) ** 2, Py: Math.cos(a - Math.PI / 4) ** 2, wp: 2 * muB / HB };
    };
    Object.assign(api, { phaseTemps, ondePlane, battement, attenuationBarriere, deviationGradient, precessionSpinDemi });
  }

  /* ---------- étape « L'espace des états » (Feynman III.8.1 à 8.3) ---------- */
  {
    const projecteur = v => {
      if (!Array.isArray(v) || !v.length) err("un état a au moins une amplitude");
      const n = norme2(v); if (!(n > 0)) err("état nul");
      return v.map(a => v.map(b => C.scale(C.mul(cx(a), C.conj(cx(b))), 1 / n)));
    };
    const nombreAmplitudes = (n, M, s) => {
      [[n, "n"], [M, "M"], [s, "s"]].forEach(([x, k]) => { if (!Number.isInteger(x) || x < 1) err(k + " doit être un entier ≥ 1"); });
      return Math.pow(M * s, n);
    };
    Object.assign(api, { projecteur, nombreAmplitudes });
  }

  /* ---------- étape « Colorants et spin dans un champ » (Feynman III.10.5 à 10.7) ---------- */
  {
    /* two base states whose charge q sits at two places d apart: ⟨I|q x|II⟩ = q d/2 between (|1⟩ ∓ |2⟩)/√2. Exact in the model. */
    const dipoleTransitionDeux = (q, d) => Math.abs(fini(q, "q")) * positif(d, "d") / 2;
    const normeB = B => (Array.isArray(B) ? Math.hypot(...B.map(x => fini(x, "B"))) : Math.abs(fini(B, "B")));
    /* §10-7, unnumbered: ω = 2|μ|B/ħ, rad·s⁻¹ ; B a number (T) or [Bx, By, Bz] */
    const frequencePrecession = (mu, B) => 2 * Math.abs(fini(mu, "mu")) * normeB(B) / Cst.hbar;
    /* Rodrigues: v turned by angle (rad) about axe (any non-zero length), right-handed */
    const tournerVecteur = (v, axe, angle) => {
      const n = Math.hypot(...axe); if (!(n > 0)) err("axe nul"); const k = axe.map(x => x / n), c = Math.cos(fini(angle, "angle")), s = Math.sin(angle);
      const kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2], x = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
      return v.map((vi, i) => vi * c + x[i] * s + k[i] * kv * (1 - c));
    };
    /* the mean spin direction at t of a spin 1/2 started along n0 (unit vector), field B (T, constant), moment mu (J·T⁻¹):
       H of (10.22) = hamiltonienPauli, exact evolution. Classically: n0 turned about B by −2μ|B|t/ħ. */
    const precessionSpin = (mu, B, n0, t) => {
      const r = Math.hypot(...n0); if (!(r > 0)) err("direction nulle");
      const th = Math.acos(Math.max(-1, Math.min(1, n0[2] / r))), ph = Math.atan2(n0[1], n0[0]);
      return api.moyenneSigma(api.evolutionExacte(api.hamiltonienPauli(mu, B), api.etatSpinDemi(th, ph), fini(t, "t")));
    };
    Object.assign(api, { dipoleTransitionDeux, frequencePrecession, tournerVecteur, precessionSpin });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.QuantDeux = api;
})(typeof self !== "undefined" ? self : this);

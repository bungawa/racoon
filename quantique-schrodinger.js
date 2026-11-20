/* QuantSchro — le module commun du monde « Cristaux, Schrödinger et atomes » (Feynman III.13 à III.21). Pur, sans DOM, UMD
   (global QuantSchro). SI partout : J, kg, m, s ; une énergie en électronvolts porte « eV » dans son nom. Chaque étape ajoute sa
   section juste avant la ligne « fin des sections », par une petite modification seulement, avec Object.assign(api, { … }) ;
   rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par chaque étape ; un nom n'est exporté
   qu'une fois. Le module ne requiert que constantes.js. Chaque fonction est un modèle : son domaine est dans son commentaire.
   Les erreurs lèvent un message en français : elles signalent un appel faux. Tests : test/quantique-schrodinger*.test.js.

   Sommaire
   Socle
     hbar, e, m_e, k_B          constantes de constantes.js, recopiées par référence.
   Étape « Un électron dans un réseau » (Feynman III.13.1 à 13.4). Chaîne d'atomes de pas b, énergie E0 sur chaque atome,
   amplitude de saut iA/ħ vers les seuls plus proches voisins (A > 0, J). o = { E0, A, b }.
     bandeChaine(k, o)          (13.13) : E0 − 2A cos kb, J. Exacte dans le modèle des plus proches voisins.
     vitesseGroupeChaine(k, o)  (13.17) : dE/(ħ dk) = 2Ab sin(kb)/ħ, m·s⁻¹.
     masseEffectiveChaine(k, o) ħ²/(d²E/dk²) = ħ²/(2Ab² cos kb), kg ; (13.20) en k = 0 ; infinie en kb = π/2, négative au-delà.
     evolutionChaine(C0, o, t)  amplitudes à l'instant t d'une chaîne de N = C0.length atomes refermée en anneau, solution
                                exacte de (13.3) par ses N états stationnaires : [{ re, im, P }]. C0 : réels ou { re, im }.
     paquetChaine(N, n0, k0, s) amplitudes initiales e^(i k0 n b) e^(−(n − n0)²/(4s²)), normées, sur N atomes (k0 en rad par pas).
     moyenneSite(C)             { n = Σ n P, ecart } : position moyenne (en pas) et écart type d'une liste [{ P }].
     bande3D(k, o)              (13.24) : o = { E0, Ax, Ay, Az, a, b, c }, k = [kx, ky, kz] ; J.
     massesEffectives3D(o)      { mx, my, mz } = ħ²/(2 A_x a²)… : les trois masses du bas de bande (13.26).
   Étape « La fonction d'onde et l'impulsion » (Feynman III.16.1 à 16.3). Paquets gaussiens ψ = (2πσ²)^(−1/4) e^(−(x−x0)²/4σ²)
   e^(i p0 x/ħ), normés ; φ(p) = ⟨p|ψ⟩ (16.24), avec P(p) dp = |φ|² dp/(2πħ) (16.22). Amplitudes { re, im }.
     simpson(f, a, b, n)        ∫ f de a à b, méthode de Simpson à n tranches (n pair) ; erreur en n⁻⁴ pour f régulière.
     erf(x)                     fonction d'erreur, série entière jusqu'à |x| = 5,5, ±1 au-delà (écart < 10⁻¹³).
     dispersionParabolique(k, o)  (16.9) : (E0 − 2A) + A k² b², développement de bandeChaine tant que kb ≪ 1.
     ecartParabolique(kb)       (kb)²/(2(1 − cos kb)) − 1 : écart relatif de l'énergie cinétique parabolique, ≈ (kb)²/12.
     differenceSeconde(f, x, b)  [2f(x) − f(x + b) − f(x − b)]/b² (16.11) : −f''(x) à O(b²) près.
     paquetGaussien(x, o)       { re, im, P = |ψ|² (m⁻¹) } ; o = { sigma, x0 = 0, p0 = 0 } (16.25).
     probaIntervalle(x1, x2, o)  probabilité de trouver la particule du paquet o entre x1 et x2 : l'intégrale de (16.17).
     recouvrementGaussiennes(d, dp, σ)  ⟨φ|ψ⟩ (16.20) de deux paquets de même σ écartés de d en position, de dp en impulsion :
                                { re, im, module = e^(−d²/8σ² − dp² σ²/2ħ²), P = module² } ; phase prise au milieu des deux.
     ampImpulsionGaussienne(p, o)  φ(p) (16.31), o celui de paquetGaussien : { re, im, P = |φ|²/(2πħ), densité par unité de p }.
     transformeeImpulsion(psi, p, x0, x1, n)  (16.24) par Simpson sur [x0, x1] ; psi(x) rend { re, im } : tant que ψ est
                                négligeable hors de [x0, x1] et que les n tranches suivent les oscillations de e^(−ipx/ħ).
     deuxPaquets(x, o)          { re, im, P } : somme normée de deux paquets de largeur sigma centrés en ±d/2 ; o = { sigma, d }.
     ampImpulsionDeuxPaquets(p, o)  φ(p) de deuxPaquets : { re, im, P = |φ|²/(2πħ) }.
     ecartsDeuxPaquets(o)       { dx, dp, produit = dx dp/(ħ/2) } : écarts types exacts de deuxPaquets ; produit = 1 si d = 0.
   Étape « Fonctions d'onde et tableau périodique » (Feynman III.19.4 à 19.6). ρ = r/a0 ; énergies en unités de ER ; noyau fixe, sans
   spin ni structure fine (corrections relatives ~ α² ≈ 5 × 10⁻⁵).
     energieHydrogene(n)        −ER/n², J : (19.51).
     potentielEffectif(l, ρ)    −2/ρ + l(l + 1)/ρ², en ER : coulombien plus terme centrifuge de (19.46).
     coefficientsRadiaux(n, l)  [{ k, a }] de k = l + 1 à n, a_(l+1) = 1, récurrence (19.50) avec α = 1/n.
     radialeHydrogene(n, l, ρ)  F_(n,l)(ρ) normée : ∫ F² ρ² dρ = 1, en a0^(−3/2) ; (19.53).
     densiteRadiale(n, l, ρ)    ρ² F², par a0 : probabilité par unité de rayon.
     rayonMoyen(n, l)           ⟨ρ⟩ par intégration numérique (exact : (3n² − l(l + 1))/2).
     noeudsRadiaux(n, l)        les ρ où F s'annule (ρ > 0) : n − l − 1 nœuds.
     ORBITALES                  noms des orbitales réelles l ≤ 2 : "s", "pz", "px", "py", "dz2", "dxz", "dyz", "dxy", "dx2y2".
     angulaireReelle(nom, x, y, z)  partie angulaire réelle normée sur la sphère (∫ Y² dΩ = 1), au point de direction (x, y, z).
     lDe(nom)                   l de l'orbitale nommée.
     ondeOrbitale(n, nom, x, y, z)  ψ réelle, en a0^(−3/2), au point (x, y, z) en a0 ; son signe est la phase relative.
     densiteOrbitale(n, nom, x, y, z)  |ψ|², par a0³, au point (x, y, z) en a0.
     pointsTournants(n, l)      [ρ1, ρ2] où le potentiel effectif vaut E_n : n²(1 ∓ √(1 − l(l + 1)/n²)) ; ρ1 = 0 si l = 0.
     probaHorsClassique(n, l)   probabilité de trouver l'électron hors de [ρ1, ρ2], là où l'énergie cinétique classique serait < 0.
     ER                         ħ²/(2 m_e a0²), J : énergie de Rydberg, noyau infiniment lourd (masse réduite négligée, 5 × 10⁻⁴).
   Étape « Imperfections d'un réseau » (Feynman III.13.5 à 13.8). Chaîne de la section précédente, un atome n = 0 d'énergie
   E0 + F (F en J). o = { E0, A, F, b }.
     diffusionImpurete(k, o)    (13.36), (13.37) : { beta, gamma ({ re, im }), R = |β|², T = |γ|² } pour l'onde incidente
                                e^(ikx) de la bande, 0 < kb < π ; R + T = 1 exactement (13.38).
     etatLie(o)                 (13.42), (13.43) : l'état lié de l'impureté, F ≠ 0 : { E = E0 ∓ √(4A² + F²), kappa, r = e^(−κb),
                                signe } ; F < 0 sous la bande (amplitudes de même signe), F > 0 au-dessus (signes alternés).
     amplitudeLiee(n, o)        amplitude normée de l'état lié sur l'atome n : signe^n r^|n| √((1 − r²)/(1 + r²)).
     betaEnergie(E, o)          (13.44), (13.45) : β prolongé à toute énergie ; { re, im, module } ; module infini au pôle.
                                Sous la bande, (13.45) ; au-dessus, la racine de l'onde qui décroît, de signe opposé.
     deuxBandes(k, o2)          deux niveaux atomiques { E0, A0, E1, A1, b } : { bas, haut, gap = (E1 − 2A1) − (E0 + 2A0) } ;
                                gap < 0 : les bandes se recouvrent. Sans couplage entre les deux bandes.
   Étape « Électrons et trous » (Feynman III.14.1 à 14.3). Densités en m⁻³, mobilités en m²·V⁻¹·s⁻¹, T en K.
     SEMI                       { Si, Ge, GaAs } : { Eg (J), Nc, Nv (m⁻³, à 300 K), mun, mup, atomes } : valeurs usuelles à 300 K.
     densiteIntrinseque(m, T)   n_i = √(Nc Nv) (T/300)^(3/2) e^(−Eg/2k_BT) (14.4) ; m un élément de SEMI ou { Eg, Nc, Nv } ;
                                Eg pris constant (il baisse de quelques % entre 0 et 300 K), semi-conducteur non dégénéré.
     porteursDopes(ND, NA, ni)  { n, p } : tous les dopants ionisés, n − p = ND − NA et n p = ni² ; non dégénéré.
     vitesseDerive(q, E, tau, m)  (14.5) : q E τ/m, m·s⁻¹ ; τ temps moyen entre deux chocs.
     conductivite(n, p, mun, mup)  (14.8) avec μ = qτ/m : e (n μn + p μp), S·m⁻¹.
     champHall(j, B, q, N)      (14.9) : champ transverse j B/(q N), V·m⁻¹, signé comme q ; R_H = 1/(qN).
   Étape « Jonctions et transistor » (Feynman III.14.4 à 14.6). Tensions en V, courants en A, T en K.
     barriereJonction(ND, NA, ni, T)  (14.11a) : (k_BT/e) ln(NA ND/ni²), V : différence de potentiel d'une jonction p-n à
                                l'équilibre, dopages ≫ ni, tous les dopants ionisés.
     rapportJonction(V, T)      (14.10), (14.11) : e^(−eV/k_BT), rapport des densités d'un même porteur des deux côtés.
     courantDiode(I0, dV, T)    (14.14) : I0 (e^(e ΔV/k_BT) − 1), A ; ΔV > 0 en direct (côté p positif).
     transistorJonction(o)      { W, L, VEB, I0, T } : base de largeur W, longueur de diffusion L des minoritaires ;
                                { alpha = 1/ch(W/L), beta = α/(1 − α), IE = courantDiode(I0, VEB, T), IC = α IE, IB = IE − IC }.
   Étape « Ondes de spin » (Feynman III.15.1 à 15.3). Chaîne de spins de pas b, couplage A > 0 (J) entre voisins ; énergie
   comptée depuis l'état où tous les spins sont en haut. Un spin retourné saute comme l'électron de la chaîne : evolutionChaine
   s'applique avec E0 = 2A.
     bandeMagnon(k, o)          (15.12) : 2A(1 − cos kb), J ; o = { A, b }.
     deuxMagnons(k1, k2, o)     (15.19), (15.20) : { E1, E2, E = E1 + E2 } ; spins retournés voisins négligés.
     paireMagnons(k1, k2, d, stat)  |a|² de deux ondes, à d pas l'une de l'autre, sans normalisation :
                                "bosons" 2 + 2 cos((k1 − k2) d) (15.24) ; "fermions" 2 − 2 cos ; "discernables" 1 ;
                                k1, k2 en rad par pas, d en pas.
   Étape « Particules indépendantes en chimie » (Feynman III.15.4 à 15.6). Électrons π sur N atomes de carbone, énergie E0 sur
   chacun, saut A > 0 vers les voisins ; énergies en unités quelconques (J, ou A = 1). Deux électrons par niveau (spins opposés).
     niveauxAnneau(N, o)        (15.25), (15.27) : E0 − 2A cos(2πs/N), s = 0 … N − 1, triés ; o = { E0, A }.
     niveauxChaine(N, o)        (15.29) : E0 − 2A cos(πs/(N + 1)), s = 1 … N : chaîne ouverte (butadiène N = 4).
     remplir(niveaux, ne)       { total, haut (dernier occupé), bas (premier vide), gap } : ne électrons, deux par niveau.
     COUCHES_NOYAU              niveaux du modèle en couches avec spin-orbite, dans l'ordre : [{ nom, places }], de 1s1/2 à 1i13/2.
     MAGIQUES                   [2, 8, 20, 28, 50, 82, 126] : nombres de nucléons d'une couche complète.
   Étape « L'équation de Schrödinger » (Feynman III.16.4 à 16.6). Grilles : listes [{ re, im }] au pas dx depuis x0 ; murs
   infinis aux deux bouts (ψ = 0 au-delà). V est une fonction de x (J) pour le tir, une liste pour Crank–Nicolson.
     noyauDelta(x, ε, forme)    approximation de δ(x) de largeur ε : « rect » (1/ε sur [−ε/2, ε/2]) ou « gauss » (écart type ε).
     filtreDelta(f, x1, ε, forme, n)  ∫ δ_ε(x − x1) f(x) dx (16.43) par Simpson ; tend vers f(x1), écart ≈ f'' ε²/24 (rect), f'' ε²/2 (gauss).
     crankNicolson(psi, o, pas)  pas de temps de (16.53), o = { m, dx, dt, V } : schéma de Crank–Nicolson, unitaire (norme conservée
                                à l'arrondi près), erreur en dt² et dx² ; murs infinis aux bouts de la grille.
     grilleStats(psi, dx, x0)   { norme = Σ|ψ|²dx, moyenne, ecart } d'une grille.
     tirNumerov(V, E, o)        (16.58) intégrée par Numerov depuis x0 (a = 0) jusqu'à x1 : { x, a } ; o = { m, x0, x1, n }.
     niveauTir(V, n, o, Emin, Emax)  n-ième niveau (n = 0, 1, …) du puits V entre deux murs en x0 et x1, par dichotomie sur le
                                nombre de zéros de a (Sturm) ; Emax doit laisser au moins n + 1 niveaux en dessous.
     niveauOscillateur(n, ω)    (n + 1/2) ħω, J : oscillateur harmonique, exact.
     niveauPuitsInfini(n, L, m)  (nπħ/L)²/(2m), n ≥ 1, J : puits de murs infinis, exact.
     niveauxPuitsFini(V0, L, m)  énergies (J, comptées depuis le fond) des états liés d'un puits carré de profondeur V0, de largeur L.
   Étape « Opérateurs et valeurs moyennes » (Feynman III.20.1 à 20.4). Systèmes à deux états : amplitudes [C1, C2] et matrices
   2 × 2 [[a, b], [c, d]] de nombres { re, im } (ou réels). Énergies variationnelles en unités de ER, longueurs en a0.
     PAULI                      { x, y, z } : matrices de Pauli σx, σy, σz dans la base |+z⟩, |−z⟩.
     appliquer(M, C)            (20.3) : les amplitudes de M|ψ⟩, Σ_j M_ij C_j, pour une matrice n × n et n amplitudes.
     adjoint(M)                 (20.9) : (M†)_ij = (M_ji)*.
     estHermitien(M, tol)       M† = M à tol près (10⁻¹² par défaut).
     elementMatrice(phi, M, psi)  ⟨φ|M|ψ⟩ = Σ φ_i* M_ij ψ_j, { re, im }.
     produitScalaire(phi, psi)  ⟨φ|ψ⟩ = Σ φ_i* ψ_i, { re, im }.
     rotationZSpin(φ)           R_z(φ) d'un spin 1/2 dans la convention de Feynman : diag(e^(iφ/2), e^(−iφ/2)).
     etatSpin(θ, φ)             [cos(θ/2), e^(iφ) sin(θ/2)] : spin 1/2 orienté selon (θ, φ).
     propres2(M)                [{ E, v }] : valeurs propres croissantes et vecteurs propres normés d'une matrice 2 × 2 hermitienne.
     moyenneOperateur(M, C)     (20.20) : ⟨ψ|M|ψ⟩/⟨ψ|ψ⟩, réel pour M hermitienne.
     decomposition(M, C)        { P: [P_I, P_II], E: [E_I, E_II], moyenne = Σ P E (20.13) } : C projeté sur les états propres de M.
     tirerMesures(P, valeurs, N, graine)  N résultats tirés selon les probabilités P (générateur reproductible mulberry32).
     energieEssaiExpo(β)        ⟨E⟩ de e^(−r/(β a0)) dans l'hydrogène : 1/β² − 2/β, en ER ; minimum −1 en β = 1 (exact).
     energieEssaiGauss(a)       ⟨E⟩ de e^(−a r²/a0²) : 3a − 4√(2a/π), en ER ; minimum −8/(3π) en a = 8/(9π).
     energieMoyenneRadiale(u, ρmax, n)  (20.29) pour un état s : ∫(u'² − 2u²/ρ) dρ / ∫u² dρ, u(ρ) = ρψ, en ER ; différences
                                finies et Simpson à n tranches ; u doit s'annuler en 0 et être négligeable au-delà de ρmax.
     energieHeliumEssai(Z)      ⟨E⟩ de l'hélium pour deux électrons 1s de charge effective Z, en ER : 2(Z² − 4Z + 5Z/8) ;
                                répulsion moyenne 5Z/8 hartrees ; minimum en Z = 27/16 (exact dans ce modèle).
     moyennesGrille(psi, dx, x0)  { norme, x = ⟨x⟩, x2 = ⟨x²⟩, ecart = √(⟨x²⟩ − ⟨x⟩²) } (20.33), (20.41), par trapèzes.
     etatBoiteL(n, x, L)        √(2/L) sin(nπx/L), m^(−1/2) : état n d'un puits de murs infinis en 0 et L.
   Étape « Rayonnement et positronium » (Feynman III.18.1 à 18.4). Angles en radians ; θ mesuré depuis +z ; amplitudes réelles
   à une constante près (a = 1, ac = 1) ; R et L : photons de polarisation circulaire droite et gauche.
     emissionDipolaire(θ)       (18.1), (18.2) : { R, L, IR, IL, total = (1 + cos²θ)/2 } ; atome de spin 1, m = +1, vers spin 0.
     diffusionCirculaire(θ)     (18.3) à (18.6) : { RR, LR, RL, LL }, amplitudes ⟨sortie|S|entrée⟩ d'un atome de spin 0.
     diffusionPolarisee(θ, χ)   lumière incidente selon z, polarisée à χ de x ; diffusée à θ dans le plan xz : { ax (18.17), ay,
                                I = ax² + ay², Inonpol = (1 + cos²θ)/2, degre = sin²θ/(1 + cos²θ) } ; atome isotrope, λ ≫ taille.
     positroniumPolariseurs(φ1, φ2)  état (18.19) normé, deux polariseurs linéaires : { coincidence = sin²(φ1 − φ2)/2, un, deux,
                                conditionnelle = sin²(φ1 − φ2) } ; détecteurs et polariseurs parfaits.
     dRotation(j, m′, m, θ)     (18.35) : ⟨j, m′|R_y(θ)|j, m⟩, convention de Feynman (R_y|+⟩ = cos(θ/2)|+⟩ − sin(θ/2)|−⟩).
     matriceRotation(j, θ)      la matrice (2j + 1) × (2j + 1) de dRotation, lignes m′ et colonnes m de j à −j.
     legendre(n, x)             P_n(x) par la récurrence de Bonnet ; d^j_00(θ) = P_j(cos θ) (18.36).
   Étape « Impulsion, moment cinétique et évolution » (Feynman III.20.5 à 20.7). Grilles [{ re, im }] au pas dx (SI), nulles
   aux bouts ; dérivées par différences centrées, erreur en dx².
     moyennesImpulsion(psi, dx)  { p, p2, ecart } : ⟨p⟩ = ∫ψ*(ħ/i)ψ' dx (20.58), ⟨p²⟩ = ħ²∫|ψ'|² dx, normés par ∫|ψ|² dx.
     commutateurXP(psi, dx, x0)  [{ x, re, im }] : ((X̂P̂ − P̂X̂)ψ)/ψ aux points où |ψ| n'est pas négligeable ; vaut iħ (20.74).
     lzAnneau(c)                { moyenne, ecart } en ħ : ⟨L_z⟩ = Σ m|c_m|²/Σ|c_m|² pour ψ(φ) = Σ c_m e^(imφ) ; c = { m: { re, im } }.
     ondeAnneau(c, φ, t, o)     ψ(φ, t) = Σ c_m e^(imφ) e^(−i m² ħ t/(2I)) : rotateur libre de moment d'inertie o.I (kg·m²) ;
                                t = 0 si o est omis. { re, im, P }.
     lzDerivee(psiPhi, dphi)    ⟨L_z⟩/ħ calculé par (20.69) en coordonnées polaires, ℒ_z = (ħ/i) ∂/∂φ, sur une grille périodique.
     evolutionMoyennes(psi, o, n, k)  n points de { t, x, p, F, Fx } : ⟨x⟩, ⟨p⟩, ⟨F⟩ = ⟨−V'⟩ et F(⟨x⟩) = −V'(⟨x⟩), tous les k pas de
                                crankNicolson ; o = { m, dx, dt, x0, dV (fonction V'(x), J·m⁻¹), V (liste, J) }.
     trajectoireClassique(x, p, o, n, k)  n points { t, x, p } de m ẍ = −V'(x) par Runge–Kutta 4 au pas o.dt, un point tous les k pas.
   Étape « Composition des moments cinétiques » (Feynman III.18.5 à 18.8). Phases de Condon et Shortley pour les coefficients ;
   celles de Feynman en diffèrent parfois d'un signe global par état, sans effet sur les probabilités.
     correlationSpin(j, θ)      [P_j(cos θ)]² (18.41) : taux relatif de coïncidence d'une cascade 0 → j → 0, m′ = 0 seul permis.
     comptagesSimules(j, angles, N, alea)  comptages tirés (Poisson) pour un spin j, N attendus à θ = 0, fond plat de 2 % : une
                                simulation, pas des données.
     chi2Spin(counts, angles, j)  { a, b, chi2, ddl } : ajustement a P_j² + b pondéré par 1/n.
     clebschGordan(j1, m1, j2, m2, J, M)  ⟨j1 m1; j2 m2|J M⟩ par la formule de Racah ; 0 hors des règles (18.44), (18.58).
     composer(j1, j2)           [{ J, M, termes: [{ m1, m2, c }] }] de J = j1 + j2 à |j1 − j2| (18.58) ; Tables 18-3 à 18-7.
     coefBinome(r, s, r′, θ)    B_r′ (18.71) : élément de R_y(θ) entre 2j spins 1/2 (r en haut, s en bas) ; égal à dRotation.
     emissionParite(θ, parité)  (18.72) à (18.76) : { R, L, IR, IL, rapportAxes, axe } ; parité −1 : impair → pair (dipolaire
                                électrique), L = −(1 − cos θ)/2 ; +1 : pair → pair (dipolaire magnétique), L = +(1 − cos θ)/2.
   Étape « Schrödinger dans un champ magnétique » (Feynman III.21.1 à 21.4). Grilles [{ re, im }] au pas dx, nulles aux bouts ;
   q en C, A en T·m (composante sur x, liste ou fonction de x), flux en Wb.
     niveauxAnneauFlux(N, o, phi)  énergies (J) des N états d'un anneau de N atomes, o = { E0, K }, traversé par le flux phi en
                                unités de h/q : E_j = E0 − 2K cos(2π(j − phi)/N) ; (21.4) avec la phase de Peierls, exacte dans le modèle.
     courantAnneauFlux(N, o, phi, j)  courant de probabilité (s⁻¹) de l'état j autour de l'anneau : −(1/h) ∂E_j/∂phi.
     courantProbabilite(psi, o)  (21.12) sur la grille, o = { m, dx, q, A } : [J (s⁻¹)] = Re(ψ*(ħ/(im) ∂ − qA/m)ψ).
     probaDroite(psi, dx, j)    Σ_{i ≥ j} |ψ_i|² dx : probabilité au-delà de l'indice j.
     potentielVecteurSolenoide(Φ, r, R)  A_φ (T·m) d'un solénoïde idéal de rayon R et de flux Φ : Φ r/(2πR²) dedans, Φ/(2πr) dehors.
     vitesseSolenoide(q, m, Φ, r, R)  v_φ (m·s⁻¹) acquise par une charge au repos quand le flux passe de 0 à Φ : −qA_φ/m (21.15),
                                tant que la charge ne bouge presque pas pendant l'établissement (v ≪ r/durée).
     tirerDensite(f, x0, x1, n, graine)  n positions tirées selon la densité f ≥ 0 sur [x0, x1] (répartition inversée sur 2000 cases).
   Étape « Les niveaux de l'atome d'hydrogène » (Feynman III.19.1 à 19.3). e² de la source = q_e²/(4πε₀) ; ρ = r/r_B, ε = E/E_R ;
   électron non relativiste sans spin, potentiel de Coulomb ponctuel (corrections ~ α² ≈ 5 × 10⁻⁵).
     echellesHydrogenoide(Z, M, m)  { mu, rB = ħ²/(μ Z e²) (m), ER = μ Z² e⁴/(2ħ²) (J) } : (19.9), (19.10) ; M = Infinity pour un
                                noyau fixe ; m = m_e par défaut (une autre masse : muon, positon pour le positronium).
     raieHydrogenoide(n1, n2, Z, M, m)  λ (m) de la raie n2 → n1, (19.24) ; vide, sans structure fine.
     coefficientsSerieS(α, kmax)  [0, a₁ = 1, a₂, …] de (19.22) ; la liste s'arrête (dernier terme 0) quand α k = 1.
     fonctionS(α, ρ, kmax)      f = ρψ = e^(−αρ) Σ a_k ρ^k, (19.14) et (19.18) ; état s lié si α = 1/n, divergent sinon.
     amplitudeAngulaire(l, m, θ, φ)  (19.31) : ⟨l,0|R_y(θ)R_z(φ)|l,m⟩ = e^(imφ) dRotation(l, 0, m, θ) : { re, im, P }.
     harmoniqueSpherique(l, m, θ, φ)  Y_lm (19.33), (19.34) : l'amplitude divisée par √(4π/(2l + 1)) ; ∫ |Y|² dΩ = 1.
   Étape « Supraconductivité » (Feynman III.21.5 à 21.9). Porteurs : paires de charge q = −2e et de masse 2m_e (PAIRE) ;
   densités en m⁻³, champs en T, flux en Wb, tensions en V.
     PAIRE                      { q: −2e, m: 2m_e } : la paire de Cooper, charge et masse nues.
     quantumFlux(q)             2πħ/|q|, Wb : h/2e ≈ 2,07 × 10⁻¹⁵ Wb pour une paire (21.29), exact (constantes du SI).
     longueurLondon(n, o)       1/λ de (21.23), m : √(m/(μ0 n q²)) pour n porteurs de charge q et de masse m par m³ ; o = PAIRE
                                par défaut, n compté en paires. Modèle de London : sans cohérence non locale (ξ ≪ λ).
     profilMeissner(x, d, λ)    B(x)/B0 dans une plaque d'épaisseur d (x de −d/2 à d/2) plongée dans B0 parallèle à ses faces :
                                cosh(x/λ)/cosh(d/2λ), solution de (21.23).
     fluxPiege(Φ, q)            flux finalement piégé dans un anneau épais refroidi sous le flux Φ : le multiple de quantumFlux
                                le plus proche, (21.29) ; anneau plus épais que λ, à l'équilibre.
     momentLondon(ω, o)         B (T) dans un supraconducteur tournant à ω (rad·s⁻¹) : −(2m/q)ω, de (21.39) avec v = ω ∧ r.
     frequenceJosephson(V, q)   |q|V/h, Hz : fréquence du courant alternatif d'une jonction sous tension continue V (21.46).
     tensionShapiro(n, f, q)    n h f/|q|, V : tension de la n-ième marche sous irradiation de fréquence f.
     courantJonction(δ, J0)     J0 sin δ (21.45).
     courantSquid(Φ, J0, q)     courant maximal de deux jonctions identiques en parallèle : 2J0 |cos(|q|Φ/(2ħ))| (21.52) ;
                                inductance de l'anneau négligée.
   Étape « Symétrie et conservation » (Feynman III.17.1 à 17.3). Matrices et états : réels ou { re, im }.
     normeCommutateur(Q, H)     max |(QH − HQ)ᵢⱼ| : nul si Q est une symétrie de H (17.11). Exacte.
     etatAnneau(n, k)           l'état stationnaire k d'un anneau de n sites égaux, Cⱼ = e^(2πi kj/n)/√n. Exacte.
     decalerAnneau(C)           l'anneau décalé d'un site, C′ⱼ = Cⱼ₋₁ : l'opérateur D(b). Exacte.
     rapportPropre(C, Cp)       { lambda, phase, ecart } : Cp = λC si ecart = 0 ; sinon ecart mesure l'écart à tout λ. Exacte.
   Étape « Polarisation et désintégration du lambda » (Feynman III.17.4 à 17.6).
     photonsParSeconde(P, λ)    P λ/(h c), s⁻¹ ; coupleLumiere(P, λ) = P/ω = P λ/(2π c), N·m, lumière circulaire absorbée (17.30).
     distributionLambda(θ, a2, b2)  (17.35) : |a|² cos²(θ/2) + |b|² sin²(θ/2), proton d'un Λ de spin +z. Exacte (spins 1/2, 1/2, 0).
     asymetrieLambda(a2, b2)    α de (17.37) : (|a|² − |b|²)/(|a|² + |b|²). Exacte.
     tirerCosLambda(u, α, P)    cos θ tiré de la loi (1 + αP cos θ)/2, u uniforme dans [0, 1]. Exacte.
     estimerAlpha(cs)           { alpha = 3⟨cos θ⟩, ecart = √((3 − α²)/N) } : estimation de α à partir de N cosinus.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const err = m => { throw new Error("QuantSchro : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !Number.isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
  const api = { hbar: Cst.hbar, e: Cst.e, m_e: Cst.m_e, k_B: Cst.k_B };
  const HB = Cst.hbar;

  /* ---------- étape « Un électron dans un réseau » ---------- */
  {
    const chaine = o => { if (!o) err("paramètres { E0, A, b } manquants"); fini(o.E0 || 0, "E0"); positif(o.A, "A"); positif(o.b, "b"); return o; };
    const bandeChaine = (k, o) => { chaine(o); fini(k, "k"); return (o.E0 || 0) - 2 * o.A * Math.cos(k * o.b); };
    const vitesseGroupeChaine = (k, o) => { chaine(o); fini(k, "k"); return 2 * o.A * o.b * Math.sin(k * o.b) / HB; };
    const masseEffectiveChaine = (k, o) => { chaine(o); fini(k, "k"); const c = Math.cos(k * o.b);
      return Math.abs(c) < 1e-12 ? Infinity : HB * HB / (2 * o.A * o.b * o.b * c); };
    const cx = z => typeof z === "number" ? { re: z, im: 0 } : { re: fini(z.re, "re"), im: fini(z.im || 0, "im") };
    const evolutionChaine = (C0, o, t) => {
      if (!Array.isArray(C0) || C0.length < 2) err("C0 : au moins deux amplitudes"); chaine(o); fini(t, "t");
      const N = C0.length, c = C0.map(cx), E0 = o.E0 || 0, out = [];
      /* the stationary states of the ring: e^(i q n), q = 2πj/N, E = E0 − 2A cos q (13.13) */
      const hat = [];
      for (let j = 0; j < N; j++) {
        const q = 2 * Math.PI * j / N; let re = 0, im = 0;
        for (let n = 0; n < N; n++) { const cs = Math.cos(q * n), sn = Math.sin(q * n); re += c[n].re * cs + c[n].im * sn; im += c[n].im * cs - c[n].re * sn; }
        const ph = -(E0 - 2 * o.A * Math.cos(q)) * t / HB, cp = Math.cos(ph), sp = Math.sin(ph);
        hat.push({ q, re: (re * cp - im * sp) / N, im: (re * sp + im * cp) / N });
      }
      for (let n = 0; n < N; n++) {
        let re = 0, im = 0;
        for (const h of hat) { const cs = Math.cos(h.q * n), sn = Math.sin(h.q * n); re += h.re * cs - h.im * sn; im += h.re * sn + h.im * cs; }
        out.push({ re, im, P: re * re + im * im });
      }
      return out;
    };
    const paquetChaine = (N, n0, k0, s) => {
      if (!Number.isInteger(N) || N < 2) err("N : entier ≥ 2"); fini(n0, "n0"); fini(k0, "k0"); positif(s, "s");
      const a = []; let norme = 0;
      for (let n = 0; n < N; n++) { const g = Math.exp(-((n - n0) ** 2) / (4 * s * s)); a.push({ re: g * Math.cos(k0 * n), im: g * Math.sin(k0 * n) }); norme += g * g; }
      const r = 1 / Math.sqrt(norme);
      return a.map(z => ({ re: z.re * r, im: z.im * r }));
    };
    const moyenneSite = C => { let s = 0, m = 0, m2 = 0; C.forEach((z, n) => { s += z.P; m += n * z.P; m2 += n * n * z.P; });
      if (!(s > 0)) err("probabilité totale nulle"); m /= s; return { n: m, ecart: Math.sqrt(Math.max(0, m2 / s - m * m)) }; };
    const reseau3 = o => { if (!o) err("paramètres manquants"); for (const k of ["Ax", "Ay", "Az", "a", "b", "c"]) positif(o[k], k); return o; };
    const bande3D = (k, o) => { reseau3(o); if (!Array.isArray(k) || k.length !== 3) err("k = [kx, ky, kz]"); k.forEach(v => fini(v, "k"));
      return (o.E0 || 0) - 2 * o.Ax * Math.cos(k[0] * o.a) - 2 * o.Ay * Math.cos(k[1] * o.b) - 2 * o.Az * Math.cos(k[2] * o.c); };
    const massesEffectives3D = o => { reseau3(o);
      return { mx: HB * HB / (2 * o.Ax * o.a * o.a), my: HB * HB / (2 * o.Ay * o.b * o.b), mz: HB * HB / (2 * o.Az * o.c * o.c) }; };
    Object.assign(api, { bandeChaine, vitesseGroupeChaine, masseEffectiveChaine, evolutionChaine, paquetChaine, moyenneSite, bande3D, massesEffectives3D });
  }

  /* ---------- étape « La fonction d'onde et l'impulsion » (III.16.1 à 16.3) ---------- */
  {
    const pos = (v, nom) => { fini(v, nom); if (!(v > 0)) err(nom + " doit être > 0"); return v; };
    function simpson(f, a, b, n) {
      n = n || 1000; if (n % 2) n += 1;
      const dx = (b - a) / n; let s = f(a) + f(b);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * dx);
      return s * dx / 3;
    }
    function erf(x) {
      fini(x, "x");
      if (x < 0) return -erf(-x);
      if (x > 5.5) return 1;
      // erf x = (2/√π) e^(−x²) Σ 2ⁿ x^(2n+1)/(1·3·…·(2n+1)) : every term positive, no cancellation
      let t = x, s = x;
      for (let n = 1; n < 400 && t > 1e-17 * s; n++) { t *= 2 * x * x / (2 * n + 1); s += t; }
      return 2 / Math.sqrt(Math.PI) * Math.exp(-x * x) * s;
    }
    const dispersionParabolique = (k, o) => { if (!o) err("paramètres { E0, A, b } manquants"); fini(k, "k"); pos(o.A, "A"); pos(o.b, "b");
      return (o.E0 || 0) - 2 * o.A + o.A * k * k * o.b * o.b; };
    const ecartParabolique = kb => {
      fini(kb, "kb");
      if (Math.abs(kb) < 1e-3) return kb * kb / 12;                       // the series: 1 − cos x = x²/2 − x⁴/24 + …
      return kb * kb / (2 * (1 - Math.cos(kb))) - 1;
    };
    const differenceSeconde = (f, x, b) => (2 * f(x) - f(x + b) - f(x - b)) / (pos(b, "b") ** 2);
    const paquet = o => { if (!o) err("paquet : il faut { sigma }"); return [pos(o.sigma, "sigma"), fini(o.x0 || 0, "x0"), fini(o.p0 || 0, "p0")]; };
    function paquetGaussien(x, o) {
      const [s, x0, p0] = paquet(o), K = Math.pow(2 * Math.PI * s * s, -0.25), m = K * Math.exp(-((x - x0) ** 2) / (4 * s * s)), ph = p0 * x / HB;
      return { re: m * Math.cos(ph), im: m * Math.sin(ph), P: m * m };
    }
    function probaIntervalle(x1, x2, o) {
      const [s, x0] = paquet(o), r = Math.SQRT2 * s;
      return (erf((Math.max(x1, x2) - x0) / r) - erf((Math.min(x1, x2) - x0) / r)) / 2;
    }
    function recouvrementGaussiennes(d, dp, sigma) {
      pos(sigma, "sigma"); fini(d, "d"); fini(dp, "dp");
      const module = Math.exp(-d * d / (8 * sigma * sigma) - dp * dp * sigma * sigma / (2 * HB * HB));
      return { re: module, im: 0, module, P: module * module };
    }
    function ampImpulsionGaussienne(p, o) {
      const [s, x0, p0] = paquet(o), m = Math.pow(8 * Math.PI * s * s, 0.25) * Math.exp(-((p - p0) ** 2) * s * s / (HB * HB));
      const ph = -(p - p0) * x0 / HB;                                      // a shift x0 multiplies φ by e^(−i(p−p0)x0/ħ)
      return { re: m * Math.cos(ph), im: m * Math.sin(ph), P: m * m / (2 * Math.PI * HB) };
    }
    function transformeeImpulsion(psi, p, x0, x1, n) {
      const f = part => x => { const z = psi(x), a = -p * x / HB, c = Math.cos(a), s = Math.sin(a);
        return part ? z.re * s + z.im * c : z.re * c - z.im * s; };
      return { re: simpson(f(0), x0, x1, n || 2000), im: simpson(f(1), x0, x1, n || 2000) };
    }
    const deux = o => { if (!o) err("deux paquets : il faut { sigma, d }"); const s = pos(o.sigma, "sigma"), d = Math.abs(fini(o.d || 0, "d"));
      return [s, d, Math.exp(-d * d / (8 * s * s))]; };
    function deuxPaquets(x, o) {
      const [s, d, r] = deux(o), N = 1 / Math.sqrt(2 * (1 + r));
      const m = N * (paquetGaussien(x - d / 2, { sigma: s }).re + paquetGaussien(x + d / 2, { sigma: s }).re);
      return { re: m, im: 0, P: m * m };
    }
    function ampImpulsionDeuxPaquets(p, o) {
      const [s, d, r] = deux(o), N = 1 / Math.sqrt(2 * (1 + r));
      const m = N * 2 * Math.cos(p * d / (2 * HB)) * ampImpulsionGaussienne(p, { sigma: s }).re;
      return { re: m, im: 0, P: m * m / (2 * Math.PI * HB) };
    }
    function ecartsDeuxPaquets(o) {
      const [s, d, r] = deux(o), eta = HB / (2 * s);
      const x2 = (s * s + d * d / 4 + s * s * r) / (1 + r);
      const p2 = eta * eta - (d * d * HB * HB / (16 * s ** 4)) * r / (1 + r);
      const dx = Math.sqrt(x2), dp = Math.sqrt(p2);
      return { dx, dp, produit: dx * dp / (HB / 2) };
    }
    Object.assign(api, { simpson, erf, dispersionParabolique, ecartParabolique, differenceSeconde, paquetGaussien, probaIntervalle,
      recouvrementGaussiennes, ampImpulsionGaussienne, transformeeImpulsion, deuxPaquets, ampImpulsionDeuxPaquets, ecartsDeuxPaquets });
  }

  /* ---------- étape « Fonctions d'onde et tableau périodique » (Feynman III.19.4 à 19.6) ---------- */
  {
    const A0 = Cst.a0, PI = Math.PI, ER = Cst.hbar ** 2 / (2 * Cst.m_e * A0 * A0);
    const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
    const positif = (x, nom) => (Number.isFinite(x) && x >= 0 ? x : err(nom + " doit être un nombre ≥ 0"));
    const entier = (n, nom, min = 1) => (Number.isInteger(n) && n >= min ? n : err(nom + " doit être un entier ≥ " + min));
    /* Simpson on [a, b], N even intervals */
    const simpson = (f, a, b, N) => { const h = (b - a) / N; let s = f(a) + f(b); for (let i = 1; i < N; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
    const nl = (n, l) => { entier(n, "n"); entier(l, "l", 0); if (l > n - 1) err("l doit être ≤ n − 1 (série non terminée sinon)"); };
    const energieHydrogene = n => -ER / entier(n, "n") ** 2;
    const potentielEffectif = (l, rho) => { entier(l, "l", 0); pos(rho, "ρ"); return -2 / rho + l * (l + 1) / (rho * rho); };
    /* (19.50): a_(k+1) = 2(αk − 1)/(k(k + 1) − l(l + 1)) a_k ; the series starts at k = l + 1 (a_l would divide by zero) and
       stops at k = n, where αk − 1 = 0 */
    const coefficientsRadiaux = (n, l) => {
      nl(n, l); const al = 1 / n, out = [{ k: l + 1, a: 1 }];
      for (let k = l + 1; k < n; k++) out.push({ k: k + 1, a: out[out.length - 1].a * 2 * (al * k - 1) / (k * (k + 1) - l * (l + 1)) });
      return out;
    };
    const brute = (c, n, rho) => { let s = 0; for (const { k, a } of c) s += a * rho ** (k - 1); return Math.exp(-rho / n) * s; };
    const cache = new Map();
    const norme = (n, l) => {
      const key = n + "," + l; if (cache.has(key)) return cache.get(key);
      const c = coefficientsRadiaux(n, l), R = 40 * n + 40, I = simpson(r => (r * brute(c, n, r)) ** 2, 0, R, 8000);
      const v = { c, N: 1 / Math.sqrt(I) }; cache.set(key, v); return v;
    };
    const radialeHydrogene = (n, l, rho) => { nl(n, l); positif(rho, "ρ"); const { c, N } = norme(n, l); return N * brute(c, n, rho); };
    const densiteRadiale = (n, l, rho) => (rho * radialeHydrogene(n, l, rho)) ** 2;
    const rayonMoyen = (n, l) => { nl(n, l); return simpson(r => r * densiteRadiale(n, l, r), 0, 40 * n + 40, 8000); };
    /* the polynomial Σ a_k ρ^(k−1−l) has n − l − 1 positive roots; found by sign change on a fine grid, then bisection */
    const noeudsRadiaux = (n, l) => {
      nl(n, l); const { c } = norme(n, l), P = r => c.reduce((s, { k, a }) => s + a * r ** (k - 1 - l), 0), out = [], R = 4 * n * n + 10, M = 4000;
      for (let i = 0; i < M; i++) {
        let a = R * i / M + 1e-9, b = R * (i + 1) / M;
        if (P(a) * P(b) < 0) { for (let j = 0; j < 60; j++) { const m = (a + b) / 2; (P(a) * P(m) <= 0) ? (b = m) : (a = m); } out.push((a + b) / 2); }
      }
      return out;
    };
    /* real combinations of Table 19-1 (with "x" and "y" built as in III.19.5), normalised on the sphere */
    const s4 = 1 / Math.sqrt(4 * PI), p = Math.sqrt(3 / (4 * PI)), d = Math.sqrt(15 / (4 * PI)), d0 = Math.sqrt(5 / (16 * PI));
    const ANG = {
      s: () => s4, pz: (x, y, z) => p * z, px: (x) => p * x, py: (x, y) => p * y,
      dz2: (x, y, z) => d0 * (3 * z * z - 1), dxz: (x, y, z) => d * x * z, dyz: (x, y, z) => d * y * z,
      dxy: (x, y) => d * x * y, dx2y2: (x, y) => d / 2 * (x * x - y * y),
    };
    const ORBITALES = Object.freeze(Object.keys(ANG));
    const lDe = nom => (nom in ANG ? { s: 0, p: 1, d: 2 }[nom[0]] : err("orbitale inconnue : " + nom));
    const angulaireReelle = (nom, x, y, z) => {
      lDe(nom); const r = Math.hypot(x, y, z);
      if (!(r > 0)) return nom === "s" ? s4 : 0;
      return ANG[nom](x / r, y / r, z / r);
    };
    const ondeOrbitale = (n, nom, x, y, z) => radialeHydrogene(n, lDe(nom), Math.hypot(x, y, z)) * angulaireReelle(nom, x, y, z);
    const densiteOrbitale = (n, nom, x, y, z) => ondeOrbitale(n, nom, x, y, z) ** 2;
    const pointsTournants = (n, l) => { nl(n, l); const r = Math.sqrt(1 - l * (l + 1) / (n * n)); return [n * n * (1 - r), n * n * (1 + r)]; };
    const probaHorsClassique = (n, l) => {
      const [r1, r2] = pointsTournants(n, l), f = r => densiteRadiale(n, l, r);
      return (r1 > 0 ? simpson(f, 0, r1, 2000) : 0) + simpson(f, r2, r2 + 40 * n + 40, 8000);
    };
    Object.assign(api, { ER, pointsTournants, probaHorsClassique, energieHydrogene, potentielEffectif, coefficientsRadiaux, radialeHydrogene, densiteRadiale, rayonMoyen,
      noeudsRadiaux, ORBITALES, angulaireReelle, lDe, ondeOrbitale, densiteOrbitale });
  }

  /* ---------- étape « Imperfections d'un réseau » ---------- */
  {
    const defaut = o => { if (!o) err("paramètres { E0, A, F, b } manquants"); positif(o.A, "A"); positif(o.b, "b"); fini(o.F, "F"); fini(o.E0 || 0, "E0"); return o; };
    const diffusionImpurete = (k, o) => { defaut(o); fini(k, "k"); const s = Math.sin(k * o.b);
      if (!(s > 0)) err("k doit être dans la bande, 0 < kb < π");
      /* β = −F/(F − 2iA sin kb) (13.37), γ = 1 + β (13.36) */
      const dr = o.F, di = -2 * o.A * s, d2 = dr * dr + di * di;
      const beta = { re: -o.F * dr / d2, im: o.F * di / d2 }, gamma = { re: 1 + beta.re, im: beta.im };
      return { beta, gamma, R: beta.re ** 2 + beta.im ** 2, T: gamma.re ** 2 + gamma.im ** 2 }; };
    const etatLie = o => { defaut(o); if (o.F === 0) err("F = 0 : pas d'impureté, pas d'état lié");
      const sh = Math.abs(o.F) / (2 * o.A), kappa = Math.asinh(sh) / o.b, r = Math.exp(-kappa * o.b), signe = o.F < 0 ? 1 : -1;
      return { E: (o.E0 || 0) - signe * Math.sqrt(4 * o.A * o.A + o.F * o.F), kappa, r, signe }; };
    const amplitudeLiee = (n, o) => { if (!Number.isInteger(n)) err("n : entier"); const l = etatLie(o);
      return (l.signe < 0 && n % 2 ? -1 : 1) * Math.pow(l.r, Math.abs(n)) * Math.sqrt((1 - l.r * l.r) / (1 + l.r * l.r)); };
    const betaEnergie = (E, o) => { defaut(o); fini(E, "E"); const x = E - (o.E0 || 0), q = 4 * o.A * o.A - x * x;
      let dr, di;
      if (q >= 0) { dr = o.F; di = -Math.sqrt(q); }                       // in the band, (13.44)
      else { dr = o.F - Math.sign(x) * Math.sqrt(-q); di = 0; }           // outside: (13.45) below the band; above it, the root that decays, of the other sign
      const d2 = dr * dr + di * di;
      if (d2 === 0) return { re: Infinity, im: 0, module: Infinity };
      const re = -o.F * dr / d2, im = o.F * di / d2;
      return { re, im, module: Math.hypot(re, im) }; };
    const deuxBandes = (k, o) => { if (!o) err("paramètres manquants"); positif(o.A0, "A0"); positif(o.A1, "A1"); positif(o.b, "b"); fini(o.E0, "E0"); fini(o.E1, "E1"); fini(k, "k");
      const c = Math.cos(k * o.b);
      return { bas: o.E0 - 2 * o.A0 * c, haut: o.E1 - 2 * o.A1 * c, gap: (o.E1 - 2 * o.A1) - (o.E0 + 2 * o.A0) }; };
    Object.assign(api, { diffusionImpurete, etatLie, amplitudeLiee, betaEnergie, deuxBandes });
  }

  /* ---------- étape « L'équation de Schrödinger » (III.16.4 à 16.6) ---------- */
  {
    const pos = (v, nom) => { fini(v, nom); if (!(v > 0)) err(nom + " doit être > 0"); return v; };
    const noyauDelta = (x, eps, forme) => {
      fini(x, "x"); pos(eps, "eps");
      if (forme === "gauss") return Math.exp(-x * x / (2 * eps * eps)) / (eps * Math.sqrt(2 * Math.PI));
      if (forme && forme !== "rect") err("forme : « rect » ou « gauss »");
      return Math.abs(x) <= eps / 2 ? 1 / eps : 0;
    };
    function filtreDelta(f, x1, eps, forme, n) {
      pos(eps, "eps");
      if (forme !== "gauss") { noyauDelta(0, eps, forme); return api.simpson(f, x1 - eps / 2, x1 + eps / 2, n || 400) / eps; }   // the box: no edge to miss
      return api.simpson(x => noyauDelta(x - x1, eps, forme) * f(x), x1 - 8 * eps, x1 + 8 * eps, n || 400);
    }
    /* Crank–Nicolson for (16.53) on a grid, ψ = 0 outside: (1 + iHΔt/2ħ) ψ' = (1 − iHΔt/2ħ) ψ, solved by the Thomas algorithm */
    function crankNicolson(psi, o, pas) {
      if (!Array.isArray(psi) || psi.length < 3) err("psi : au moins trois points");
      const m = pos(o.m, "m"), dx = pos(o.dx, "dx"), dt = pos(o.dt, "dt"), N = psi.length, V = o.V || new Array(N).fill(0);
      if (V.length !== N) err("V doit avoir la longueur de psi");
      const r = HB * dt / (4 * m * dx * dx);                     // off-diagonal of iHΔt/2ħ, times i: −i r
      let re = psi.map(z => z.re), im = psi.map(z => z.im);
      const dre = V.map(v => 1), dim = V.map(v => 2 * r + v * dt / (2 * HB));
      for (let s = 0; s < (pas || 1); s++) {
        /* right side b = (1 − iA) ψ, A = tridiag(−r, 2r + VΔt/2ħ, −r) */
        const bre = new Array(N), bim = new Array(N);
        for (let j = 0; j < N; j++) {
          const lr = j ? re[j - 1] : 0, li = j ? im[j - 1] : 0, rr = j < N - 1 ? re[j + 1] : 0, ri = j < N - 1 ? im[j + 1] : 0;
          const Are = dim[j] * re[j] - r * (lr + rr), Aim = dim[j] * im[j] - r * (li + ri);
          bre[j] = re[j] + Aim; bim[j] = im[j] - Are;            // ψ − i(Aψ)
        }
        /* (1 + iA) ψ' = b : diagonal 1 + i dim, off-diagonals −i r */
        const cre = new Array(N), cim = new Array(N), gre = new Array(N), gim = new Array(N);
        const div = (ar, ai, br, bi) => { const q = br * br + bi * bi; return [(ar * br + ai * bi) / q, (ai * br - ar * bi) / q]; };
        const mul = (ar, ai, br, bi) => [ar * br - ai * bi, ar * bi + ai * br];
        let [c0r, c0i] = div(0, -r, 1, dim[0]); cre[0] = c0r; cim[0] = c0i;
        let [g0r, g0i] = div(bre[0], bim[0], 1, dim[0]); gre[0] = g0r; gim[0] = g0i;
        for (let j = 1; j < N; j++) {
          const [pr, pi] = mul(0, -r, cre[j - 1], cim[j - 1]), denr = 1 - pr, deni = dim[j] - pi;
          [cre[j], cim[j]] = div(0, -r, denr, deni);
          const [qr, qi] = mul(0, -r, gre[j - 1], gim[j - 1]);
          [gre[j], gim[j]] = div(bre[j] - qr, bim[j] - qi, denr, deni);
        }
        re[N - 1] = gre[N - 1]; im[N - 1] = gim[N - 1];
        for (let j = N - 2; j >= 0; j--) { const [pr, pi] = mul(cre[j], cim[j], re[j + 1], im[j + 1]); re[j] = gre[j] - pr; im[j] = gim[j] - pi; }
      }
      return re.map((v, j) => ({ re: v, im: im[j], P: v * v + im[j] * im[j] }));
    }
    function grilleStats(psi, dx, x0) {
      let n = 0, m1 = 0, m2 = 0;
      psi.forEach((z, j) => { const P = z.re * z.re + z.im * z.im, x = x0 + j * dx; n += P; m1 += P * x; m2 += P * x * x; });
      n *= dx; m1 *= dx; m2 *= dx;
      return { norme: n, moyenne: m1 / n, ecart: Math.sqrt(Math.max(0, m2 / n - (m1 / n) ** 2)) };
    }
    /* (16.58) by Numerov from the left: a(x0) = 0, a(x0 + h) = 1e-30 */
    function tirNumerov(V, E, o) {
      const m = pos(o.m, "m"); fini(E, "E"); fini(o.x0, "x0"); fini(o.x1, "x1");
      const n = o.n || 2000, h = (o.x1 - o.x0) / n, x = [], a = [], g = new Array(n + 1);
      for (let j = 0; j <= n; j++) { x.push(o.x0 + j * h); g[j] = 2 * m * (V(x[j]) - E) / (HB * HB); }
      a[0] = 0; a[1] = 1e-30;
      for (let j = 1; j < n; j++) {
        const f0 = 1 - h * h * g[j - 1] / 12, f1 = 1 + 5 * h * h * g[j] / 12, f2 = 1 - h * h * g[j + 1] / 12;
        a[j + 1] = (2 * f1 * a[j] - f0 * a[j - 1]) / f2;
        if (!isFinite(a[j + 1]) || Math.abs(a[j + 1]) > 1e250) { const s = 1e-200; for (let k = 0; k <= j + 1; k++) a[k] *= s; }
      }
      return { x, a };
    }
    /* the n-th level (n = 0, 1, …) between Emin and Emax: bisection on the sign of a at the far wall and on the node count */
    function niveauTir(V, n, o, Emin, Emax) {
      fini(Emin, "Emin"); fini(Emax, "Emax");
      /* count of levels below E = number of sign changes of a on (x0, x1] including the end: Sturm */
      const sous = E => { const a = tirNumerov(V, E, o).a; let c = 0, last = a[1]; for (let j = 2; j < a.length; j++) { if (a[j] && Math.sign(a[j]) !== Math.sign(last)) c++; if (a[j]) last = a[j]; } return c; };
      let lo = Emin, hi = Emax;
      if (sous(hi) <= n) err("Emax trop bas : moins de " + (n + 1) + " niveaux en dessous");
      for (let k = 0; k < 200 && hi - lo > 1e-14 * Math.max(Math.abs(hi), Math.abs(lo), 1e-40); k++) {
        const mid = (lo + hi) / 2; if (sous(mid) > n) hi = mid; else lo = mid;
      }
      return (lo + hi) / 2;
    }
    const niveauOscillateur = (n, omega) => { if (!Number.isInteger(n) || n < 0) err("n : entier ≥ 0"); return (n + 0.5) * HB * pos(omega, "omega"); };
    const niveauPuitsInfini = (n, L, m) => { if (!Number.isInteger(n) || n < 1) err("n : entier ≥ 1"); return (n * Math.PI * HB / pos(L, "L")) ** 2 / (2 * pos(m, "m")); };
    /* finite square well of depth V0 and width L (V = 0 inside, V0 outside): bound levels by the even and odd conditions */
    function niveauxPuitsFini(V0, L, m) {
      pos(V0, "V0"); pos(L, "L"); pos(m, "m");
      const z0 = L / 2 * Math.sqrt(2 * m * V0) / HB, out = [];
      const f = (z, pair) => { const k = Math.sqrt(Math.max(0, z0 * z0 - z * z)); return pair ? z * Math.tan(z) - k : -z / Math.tan(z) - k; };
      for (let j = 0; ; j++) {
        const pair = j % 2 === 0, lo0 = j * Math.PI / 2, hi0 = Math.min((j + 1) * Math.PI / 2, z0);
        if (lo0 >= z0) break;
        let lo = lo0 + 1e-12, hi = hi0 - 1e-12;
        if (f(lo, pair) * f(hi, pair) > 0) break;
        for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (f(lo, pair) * f(mid, pair) <= 0) hi = mid; else lo = mid; }
        const z = (lo + hi) / 2; out.push(2 * (HB * z / L) ** 2 / m);
      }
      return out;
    }
    Object.assign(api, { noyauDelta, filtreDelta, crankNicolson, grilleStats, tirNumerov, niveauTir, niveauOscillateur, niveauPuitsInfini, niveauxPuitsFini });
  }

  /* ---------- étape « Opérateurs et valeurs moyennes » (Feynman III.20.1 à 20.4) ---------- */
  {
    const c = z => (typeof z === "number" ? { re: z, im: 0 } : z);
    const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
    const conj = a => ({ re: a.re, im: -a.im });
    const add = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
    const ZERO = { re: 0, im: 0 }, I = { re: 0, im: 1 };
    const carree = M => { if (!Array.isArray(M) || !M.length || M.some(r => !Array.isArray(r) || r.length !== M.length)) err("matrice carrée attendue"); return M.map(r => r.map(c)); };
    const vect = (C, n) => { if (!Array.isArray(C) || C.length !== n) err(n + " amplitudes attendues"); return C.map(c); };
    const PAULI = Object.freeze({ x: [[0, 1], [1, 0]], y: [[0, { re: 0, im: -1 }], [I, 0]], z: [[1, 0], [0, -1]] });
    const appliquer = (M, C) => { const A = carree(M), v = vect(C, A.length); return A.map(r => r.reduce((s, a, j) => add(s, mul(a, v[j])), ZERO)); };
    const adjoint = M => { const A = carree(M); return A.map((r, i) => r.map((_, j) => conj(A[j][i]))); };
    const estHermitien = (M, tol = 1e-12) => { const A = carree(M), B = adjoint(A); return A.every((r, i) => r.every((a, j) => Math.abs(a.re - B[i][j].re) <= tol && Math.abs(a.im - B[i][j].im) <= tol)); };
    const produitScalaire = (phi, psi) => { const a = vect(phi, phi.length), b = vect(psi, phi.length); return a.reduce((s, x, i) => add(s, mul(conj(x), b[i])), ZERO); };
    const elementMatrice = (phi, M, psi) => produitScalaire(phi, appliquer(M, psi));
    const rotationZSpin = phi => [[{ re: Math.cos(phi / 2), im: Math.sin(phi / 2) }, 0], [0, { re: Math.cos(phi / 2), im: -Math.sin(phi / 2) }]];
    const etatSpin = (th, ph) => [{ re: Math.cos(th / 2), im: 0 }, { re: Math.cos(ph) * Math.sin(th / 2), im: Math.sin(ph) * Math.sin(th / 2) }];
    const propres2 = M => {
      const A = carree(M); if (A.length !== 2 || !estHermitien(A, 1e-9 * (1 + Math.abs(A[0][0].re) + Math.abs(A[1][1].re)))) err("matrice 2 × 2 hermitienne attendue");
      const a = A[0][0].re, d = A[1][1].re, b = A[0][1], m = (a + d) / 2, h = (a - d) / 2, r = Math.hypot(h, b.re, b.im);
      if (r === 0) return [{ E: m, v: [{ re: 1, im: 0 }, ZERO] }, { E: m, v: [ZERO, { re: 1, im: 0 }] }];
      const vec = E => { /* (a − E) x + b y = 0 → v ∝ [b, E − a], or [E − d, b*] when b is tiny */
        let v = Math.abs(E - a) + Math.hypot(b.re, b.im) > Math.abs(E - d) ? [b, { re: E - a, im: 0 }] : [{ re: E - d, im: 0 }, conj(b)];
        const n = Math.sqrt(v[0].re ** 2 + v[0].im ** 2 + v[1].re ** 2 + v[1].im ** 2); return v.map(z => ({ re: z.re / n, im: z.im / n }));
      };
      return [m - r, m + r].map(E => ({ E, v: vec(E) }));
    };
    const norme2 = C => C.reduce((s, z) => s + c(z).re ** 2 + c(z).im ** 2, 0);
    const moyenneOperateur = (M, C) => { const n = norme2(C); if (!(n > 0)) err("état nul"); return elementMatrice(C, M, C).re / n; };
    const decomposition = (M, C) => {
      const n = norme2(C); if (!(n > 0)) err("état nul");
      const p = propres2(M), P = p.map(({ v }) => { const z = produitScalaire(v, C); return (z.re ** 2 + z.im ** 2) / n; });
      return { P, E: p.map(q => q.E), moyenne: P[0] * p[0].E + P[1] * p[1].E };
    };
    const tirerMesures = (P, valeurs, N, graine = 1) => {
      if (!Array.isArray(P) || P.length !== valeurs.length || P.some(x => !(x >= 0))) err("probabilités et valeurs de même longueur, P ≥ 0");
      if (!Number.isInteger(N) || N < 1) err("N entier ≥ 1");
      let s = graine >>> 0; const alea = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
      const tot = P.reduce((a, b) => a + b, 0), out = [];
      for (let k = 0; k < N; k++) { let u = alea() * tot, i = 0; while (i < P.length - 1 && u >= P[i]) { u -= P[i]; i++; } out.push(valeurs[i]); }
      return out;
    };
    const strict = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
    const energieEssaiExpo = b => { strict(b, "β"); return 1 / (b * b) - 2 / b; };
    const energieEssaiGauss = a => { strict(a, "a"); return 3 * a - 4 * Math.sqrt(2 * a / Math.PI); };
    const energieMoyenneRadiale = (u, rmax, n = 4000) => {
      strict(rmax, "ρmax"); if (!Number.isInteger(n) || n < 10 || n % 2) err("n pair ≥ 10");
      const h = rmax / n, d = r => (u(r + h * 1e-3) - u(Math.max(0, r - h * 1e-3))) / (r + h * 1e-3 - Math.max(0, r - h * 1e-3));
      let num = 0, den = 0;
      for (let i = 0; i <= n; i++) { const r = i * h, w = (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * h / 3, v = u(r);
        num += w * (d(r) ** 2 - (r > 0 ? 2 * v * v / r : 0)); den += w * v * v; }
      if (!(den > 0)) err("u identiquement nulle"); return num / den;
    };
    const energieHeliumEssai = Z => { strict(Z, "Z"); return 2 * (Z * Z - 4 * Z + 5 * Z / 8); };
    const moyennesGrille = (psi, dx, x0 = 0) => {
      if (!Array.isArray(psi) || psi.length < 2) err("grille d'au moins deux points"); strict(dx, "dx");
      let n = 0, m1 = 0, m2 = 0;
      psi.forEach((z, i) => { const w = (i === 0 || i === psi.length - 1 ? 0.5 : 1) * dx, P = c(z).re ** 2 + c(z).im ** 2, x = x0 + i * dx; n += w * P; m1 += w * P * x; m2 += w * P * x * x; });
      if (!(n > 0)) err("état nul"); const x = m1 / n, x2 = m2 / n; return { norme: n, x, x2, ecart: Math.sqrt(Math.max(0, x2 - x * x)) };
    };
    const etatBoiteL = (n, x, L) => { if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1"); strict(L, "L"); return x < 0 || x > L ? 0 : Math.sqrt(2 / L) * Math.sin(n * Math.PI * x / L); };
    Object.assign(api, { PAULI, appliquer, adjoint, estHermitien, elementMatrice, produitScalaire, rotationZSpin, etatSpin, propres2,
      moyenneOperateur, decomposition, tirerMesures, energieEssaiExpo, energieEssaiGauss, energieMoyenneRadiale, energieHeliumEssai,
      moyennesGrille, etatBoiteL });
  }

  /* ---------- étape « Électrons et trous » ---------- */
  {
    const eV = Cst.e, KB = Cst.k_B;
    const SEMI = Object.freeze({
      Si: Object.freeze({ Eg: 1.12 * eV, Nc: 2.8e25, Nv: 1.04e25, mun: 0.15, mup: 0.045, atomes: 5.0e28 }),
      Ge: Object.freeze({ Eg: 0.66 * eV, Nc: 1.04e25, Nv: 6.1e24, mun: 0.39, mup: 0.19, atomes: 4.42e28 }),
      GaAs: Object.freeze({ Eg: 1.43 * eV, Nc: 4.7e23, Nv: 7.0e24, mun: 0.86, mup: 0.04, atomes: 4.42e28 }),
    });
    const densiteIntrinseque = (m, T) => { if (!m) err("matériau manquant"); positif(m.Eg, "Eg"); positif(m.Nc, "Nc"); positif(m.Nv, "Nv"); positif(T, "T");
      return Math.sqrt(m.Nc * m.Nv) * Math.pow(T / 300, 1.5) * Math.exp(-m.Eg / (2 * KB * T)); };
    const porteursDopes = (ND, NA, ni) => { if (!(ND >= 0) || !(NA >= 0)) err("ND et NA doivent être ≥ 0"); positif(ni, "ni");
      const d = (ND - NA) / 2, r = Math.sqrt(d * d + ni * ni);
      /* the larger root by its stable form, the smaller from n p = ni² */
      if (d >= 0) { const n = d + r; return { n, p: ni * ni / n }; }
      const p = -d + r; return { n: ni * ni / p, p }; };
    const vitesseDerive = (q, E, tau, m) => { fini(q, "q"); fini(E, "E"); positif(tau, "tau"); positif(m, "m"); return q * E * tau / m; };
    const conductivite = (n, p, mun, mup) => { if (!(n >= 0) || !(p >= 0)) err("densités ≥ 0"); positif(mun, "mun"); positif(mup, "mup"); return eV * (n * mun + p * mup); };
    const champHall = (j, B, q, N) => { fini(j, "j"); fini(B, "B"); fini(q, "q"); if (q === 0) err("q ≠ 0"); positif(N, "N"); return j * B / (q * N); };
    Object.assign(api, { SEMI, densiteIntrinseque, porteursDopes, vitesseDerive, conductivite, champHall });
  }

  /* ---------- étape « Rayonnement et positronium » (III.18.1 à 18.4) ---------- */
  {
    /* (18.1), (18.2): spin 1, m = +1 → spin 0 ; amplitude a = 1 for an RHC photon along +z */
    const emissionDipolaire = theta => { fini(theta, "theta"); const c = Math.cos(theta), R = (1 + c) / 2, L = -(1 - c) / 2;
      return { R, L, IR: R * R, IL: L * L, total: R * R + L * L }; };
    /* (18.3) to (18.6), ac = 1 */
    const diffusionCirculaire = theta => { fini(theta, "theta"); const c = Math.cos(theta);
      return { RR: (1 + c) / 2, LR: -(1 - c) / 2, RL: -(1 - c) / 2, LL: (1 + c) / 2 }; };
    /* linear light along z, polarized at χ from x; scattered at θ in the xz plane: x′ amplitude cos χ cos θ (18.17), y′ amplitude sin χ */
    const diffusionPolarisee = (theta, chi) => { fini(theta, "theta"); fini(chi, "chi");
      const ax = Math.cos(chi) * Math.cos(theta), ay = Math.sin(chi), c2 = Math.cos(theta) ** 2;
      return { ax, ay, I: ax * ax + ay * ay, Inonpol: (1 + c2) / 2, degre: (1 - c2) / (1 + c2) }; };
    /* (18.19) normed: |F⟩ = (|R1 R2⟩ − |L1 L2⟩)/√2 ; polarizers at φ1, φ2 measured the same way in the lab */
    const positroniumPolariseurs = (phi1, phi2) => { fini(phi1, "phi1"); fini(phi2, "phi2"); const s = Math.sin(phi1 - phi2);
      return { coincidence: s * s / 2, un: 0.5, deux: 0.5, conditionnelle: s * s }; };
    const fact = n => { if (!Number.isInteger(n) || n < 0) err("factorielle d'un entier ≥ 0"); let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
    const demi = (v, nom) => { fini(v, nom); if (Math.abs(2 * v - Math.round(2 * v)) > 1e-9) err(nom + " doit être entier ou demi-entier"); return Math.round(2 * v) / 2; };
    /* (18.35) */
    function dRotation(j, m2, m, theta) {
      j = demi(j, "j"); m2 = demi(m2, "m′"); m = demi(m, "m"); fini(theta, "theta");
      if (j < 0 || Math.abs(m) > j || Math.abs(m2) > j || !Number.isInteger(j + m) || !Number.isInteger(j + m2)) err("il faut |m|, |m′| ≤ j, de même parité que j");
      const C = Math.cos(theta / 2), S = Math.sin(theta / 2), pre = Math.sqrt(fact(j + m) * fact(j - m) * fact(j + m2) * fact(j - m2));
      let s = 0;
      for (let k = 0; k <= 2 * j; k++) {
        const a = m - m2 + k, b = j + m2 - k, c = j - m - k;
        if (a < 0 || b < 0 || c < 0) continue;
        s += ((k + m - m2) % 2 ? -1 : 1) * C ** (2 * j + m2 - m - 2 * k) * S ** (m - m2 + 2 * k) / (fact(a) * fact(b) * fact(c) * fact(k));
      }
      return pre * s;
    }
    /* rows m′ = j … −j, columns m = j … −j */
    const matriceRotation = (j, theta) => { j = demi(j, "j"); const ms = []; for (let m = j; m >= -j; m--) ms.push(m);
      return ms.map(m2 => ms.map(m => dRotation(j, m2, m, theta))); };
    function legendre(n, x) {
      if (!Number.isInteger(n) || n < 0) err("n : entier ≥ 0"); fini(x, "x");
      let p0 = 1, p1 = x; if (n === 0) return 1;
      for (let k = 1; k < n; k++) { const p2 = ((2 * k + 1) * x * p1 - k * p0) / (k + 1); p0 = p1; p1 = p2; }
      return p1;
    }
    Object.assign(api, { emissionDipolaire, diffusionCirculaire, diffusionPolarisee, positroniumPolariseurs, dRotation, matriceRotation, legendre });
  }

  /* ---------- étape « Impulsion, moment cinétique et évolution » (Feynman III.20.5 à 20.7) ---------- */
  {
    const nb = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
    const grille = psi => { if (!Array.isArray(psi) || psi.length < 3) err("psi : au moins trois points"); return psi; };
    const deriv = (psi, j, dx) => { const a = j ? psi[j - 1] : { re: 0, im: 0 }, b = j < psi.length - 1 ? psi[j + 1] : { re: 0, im: 0 };
      return { re: (b.re - a.re) / (2 * dx), im: (b.im - a.im) / (2 * dx) }; };
    const moyennesImpulsion = (psi, dx) => {
      grille(psi); nb(dx, "dx"); let n = 0, p = 0, p2 = 0;
      psi.forEach((z, j) => { const d = deriv(psi, j, dx); n += z.re * z.re + z.im * z.im; p += z.re * d.im - z.im * d.re; p2 += d.re * d.re + d.im * d.im; });
      if (!(n > 0)) err("état nul");
      const P = HB * p / n, P2 = HB * HB * p2 / n; return { p: P, p2: P2, ecart: Math.sqrt(Math.max(0, P2 - P * P)) };
    };
    const commutateurXP = (psi, dx, x0 = 0) => {
      grille(psi); nb(dx, "dx"); const top = Math.max(...psi.map(z => Math.hypot(z.re, z.im))), out = [];
      /* P̂ψ = −iħψ', so (X̂P̂ − P̂X̂)ψ = −iħ x ψ' + iħ (xψ)' */
      const xpsi = psi.map((z, j) => ({ re: (x0 + j * dx) * z.re, im: (x0 + j * dx) * z.im }));
      for (let j = 1; j < psi.length - 1; j++) {
        const z = psi[j], m = Math.hypot(z.re, z.im); if (m < 1e-3 * top) continue;
        const x = x0 + j * dx, a = deriv(psi, j, dx), b = deriv(xpsi, j, dx);
        const cre = HB * (b.im - x * a.im) * -1, cim = HB * (b.re - x * a.re);         // iħ(b − x a) = ħ(−Im, Re)
        const den = z.re * z.re + z.im * z.im; out.push({ x, re: (cre * z.re + cim * z.im) / den, im: (cim * z.re - cre * z.im) / den });
      }
      return out;
    };
    const coef = c => { if (!c || typeof c !== "object") err("c = { m: { re, im } }"); return Object.entries(c).map(([m, z]) => {
      if (!Number.isInteger(+m)) err("m entier : " + m); const w = typeof z === "number" ? { re: z, im: 0 } : z; return [+m, w]; }); };
    const lzAnneau = c => { const e = coef(c); let n = 0, s = 0, s2 = 0; for (const [m, z] of e) { const P = z.re * z.re + z.im * z.im; n += P; s += m * P; s2 += m * m * P; }
      if (!(n > 0)) err("état nul"); return { moyenne: s / n, ecart: Math.sqrt(Math.max(0, s2 / n - (s / n) ** 2)) }; };
    const ondeAnneau = (c, phi, t = 0, o) => { const e = coef(c), I = o ? nb(o.I, "I") : 1; let re = 0, im = 0;
      for (const [m, z] of e) { const a = m * phi - (o ? m * m * HB * t / (2 * I) : 0), cs = Math.cos(a), sn = Math.sin(a); re += z.re * cs - z.im * sn; im += z.re * sn + z.im * cs; }
      return { re, im, P: re * re + im * im }; };
    const lzDerivee = (psi, dphi) => { grille(psi); nb(dphi, "dφ"); const N = psi.length; let n = 0, s = 0;
      for (let j = 0; j < N; j++) { const a = psi[(j - 1 + N) % N], b = psi[(j + 1) % N], z = psi[j], d = { re: (b.re - a.re) / (2 * dphi), im: (b.im - a.im) / (2 * dphi) };
        n += z.re * z.re + z.im * z.im; s += z.re * d.im - z.im * d.re; }
      if (!(n > 0)) err("état nul"); return s / n; };
    const evolutionMoyennes = (psi0, o, n, k) => {
      grille(psi0); if (!o || typeof o.dV !== "function") err("o.dV : fonction V'(x)"); const dx = nb(o.dx, "dx"), x0 = Number.isFinite(o.x0) ? o.x0 : 0;
      if (!Number.isInteger(n) || n < 1 || !Number.isInteger(k) || k < 1) err("n et k entiers ≥ 1");
      let psi = psi0, out = [];
      const stats = (t) => { const s = api.grilleStats(psi, dx, x0), p = moyennesImpulsion(psi, dx).p; let F = 0, N = 0;
        psi.forEach((z, j) => { const P = z.re * z.re + z.im * z.im; N += P; F -= P * o.dV(x0 + j * dx); });
        return { t, x: s.moyenne, p, F: F / N, Fx: -o.dV(s.moyenne), ecart: s.ecart }; };
      out.push(stats(0));
      for (let i = 1; i < n; i++) { psi = api.crankNicolson(psi, o, k); out.push(stats(i * k * o.dt)); }
      return out;
    };
    const trajectoireClassique = (x, p, o, n, k) => {
      if (!o || typeof o.dV !== "function") err("o.dV : fonction V'(x)"); const m = nb(o.m, "m"), dt = nb(o.dt, "dt");
      const f = (x, p) => [p / m, -o.dV(x)], out = [{ t: 0, x, p }];
      for (let i = 1; i < n; i++) { for (let s = 0; s < k; s++) {
        const a = f(x, p), b = f(x + a[0] * dt / 2, p + a[1] * dt / 2), c = f(x + b[0] * dt / 2, p + b[1] * dt / 2), d = f(x + c[0] * dt, p + c[1] * dt);
        x += dt * (a[0] + 2 * b[0] + 2 * c[0] + d[0]) / 6; p += dt * (a[1] + 2 * b[1] + 2 * c[1] + d[1]) / 6; }
        out.push({ t: i * k * dt, x, p }); }
      return out;
    };
    Object.assign(api, { moyennesImpulsion, commutateurXP, lzAnneau, ondeAnneau, lzDerivee, evolutionMoyennes, trajectoireClassique });
  }

  /* ---------- étape « Jonctions et transistor » ---------- */
  {
    const eV = Cst.e, KB = Cst.k_B;
    const barriereJonction = (ND, NA, ni, T) => { positif(ND, "ND"); positif(NA, "NA"); positif(ni, "ni"); positif(T, "T");
      if (!(ND > ni && NA > ni)) err("dopages ≤ ni : la jonction n'a pas de barrière nette");
      return KB * T / eV * Math.log(NA * ND / (ni * ni)); };
    const rapportJonction = (V, T) => { fini(V, "V"); positif(T, "T"); return Math.exp(-eV * V / (KB * T)); };
    const courantDiode = (I0, dV, T) => { positif(I0, "I0"); fini(dV, "dV"); positif(T, "T"); return I0 * Math.expm1(eV * dV / (KB * T)); };
    const transistorJonction = o => { if (!o) err("paramètres manquants"); positif(o.W, "W"); positif(o.L, "L"); positif(o.I0, "I0"); positif(o.T, "T"); fini(o.VEB, "VEB");
      const alpha = 1 / Math.cosh(o.W / o.L), IE = courantDiode(o.I0, o.VEB, o.T);
      return { alpha, beta: alpha / (1 - alpha), IE, IC: alpha * IE, IB: (1 - alpha) * IE }; };
    Object.assign(api, { barriereJonction, rapportJonction, courantDiode, transistorJonction });
  }

  /* ---------- étape « Composition des moments cinétiques » (III.18.5 à 18.8) ---------- */
  {
    const fact = n => { if (!Number.isInteger(n) || n < 0) err("factorielle d'un entier ≥ 0"); let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
    const demi = (v, nom) => { fini(v, nom); if (Math.abs(2 * v - Math.round(2 * v)) > 1e-9) err(nom + " doit être entier ou demi-entier"); return Math.round(2 * v) / 2; };
    /* (18.41): only m′ = 0 survives along the α₂ direction; relative rate [P_j(cos θ)]² */
    const correlationSpin = (j, theta) => { if (!Number.isInteger(j) || j < 0) err("j : entier ≥ 0"); return api.legendre(j, Math.cos(theta)) ** 2; };
    /* counts drawn with Poisson noise for a spin j at the given angles, N expected at θ = 0 (a simulation, not data) */
    function comptagesSimules(j, angles, N, alea) {
      fini(N, "N"); if (!(N > 0)) err("N doit être > 0");
      const poisson = l => { if (l > 50) { let u = 0; for (let i = 0; i < 12; i++) u += alea(); return Math.max(0, Math.round(l + Math.sqrt(l) * (u - 6))); }
        let k = 0, p = 1; const L = Math.exp(-l); do { k++; p *= alea(); } while (p > L); return k - 1; };
      return angles.map(th => poisson(N * correlationSpin(j, th) + 0.02 * N));      // a flat background of 2 %
    }
    /* χ² of counts against the best scale a P_j² + background, both fitted by least squares weighted by 1/max(n, 1) */
    function chi2Spin(counts, angles, j) {
      if (counts.length !== angles.length) err("autant de comptages que d'angles");
      const f = angles.map(th => correlationSpin(j, th)), w = counts.map(n => 1 / Math.max(n, 1));
      let Sff = 0, Sf = 0, S1 = 0, Sfy = 0, Sy = 0;
      f.forEach((v, i) => { Sff += w[i] * v * v; Sf += w[i] * v; S1 += w[i]; Sfy += w[i] * v * counts[i]; Sy += w[i] * counts[i]; });
      const det = Sff * S1 - Sf * Sf, plat = Math.abs(det) < 1e-12 * Sff * S1;        // j = 0: P_0² = 1, scale and background merge
      const a = plat ? Sfy / Sff : (Sfy * S1 - Sf * Sy) / det, b = plat ? 0 : (Sff * Sy - Sf * Sfy) / det;
      const chi2 = counts.reduce((s, n, i) => s + w[i] * (n - a * f[i] - b) ** 2, 0);
      return { a, b, chi2, ddl: counts.length - 2 };
    }
    /* Clebsch–Gordan ⟨j1 m1; j2 m2|J M⟩, Racah's formula, Condon–Shortley phases */
    function clebschGordan(j1, m1, j2, m2, J, M) {
      [j1, m1, j2, m2, J, M] = [j1, m1, j2, m2, J, M].map((v, i) => demi(v, ["j1", "m1", "j2", "m2", "J", "M"][i]));
      if (m1 + m2 !== M || J < Math.abs(j1 - j2) || J > j1 + j2 || Math.abs(m1) > j1 || Math.abs(m2) > j2 || Math.abs(M) > J) return 0;
      if (!Number.isInteger(j1 + j2 + J) || !Number.isInteger(j1 + m1) || !Number.isInteger(j2 + m2) || !Number.isInteger(J + M)) return 0;
      const pre = Math.sqrt((2 * J + 1) * fact(j1 + j2 - J) * fact(j1 - j2 + J) * fact(-j1 + j2 + J) / fact(j1 + j2 + J + 1))
        * Math.sqrt(fact(J + M) * fact(J - M) * fact(j1 - m1) * fact(j1 + m1) * fact(j2 - m2) * fact(j2 + m2));
      let s = 0;
      for (let k = 0; k <= j1 + j2 + J; k++) {
        const d = [k, j1 + j2 - J - k, j1 - m1 - k, j2 + m2 - k, J - j2 + m1 + k, J - j1 - m2 + k];
        if (d.some(v => v < 0)) continue;
        s += (k % 2 ? -1 : 1) / d.reduce((p, v) => p * fact(v), 1);
      }
      return pre * s;
    }
    /* (18.58) and the states: [{ J, M, termes: [{ m1, m2, c }] }] */
    function composer(j1, j2) {
      j1 = demi(j1, "j1"); j2 = demi(j2, "j2"); if (j1 < 0 || j2 < 0) err("j1, j2 ≥ 0");
      const out = [];
      for (let J = j1 + j2; J >= Math.abs(j1 - j2) - 1e-9; J--) for (let M = J; M >= -J - 1e-9; M--) {
        const termes = [];
        for (let m1 = j1; m1 >= -j1 - 1e-9; m1--) { const m2 = M - m1; if (Math.abs(m2) <= j2 + 1e-9) { const c = clebschGordan(j1, m1, j2, m2, J, M); if (Math.abs(c) > 1e-14) termes.push({ m1, m2, c }); } }
        out.push({ J, M, termes });
      }
      return out;
    }
    /* (18.71): B_r′ for r spins up and s down, r′ up after the rotation; C = cos θ/2, S = −sin θ/2 (18.64) */
    function coefBinome(r, s, r2, theta) {
      if (![r, s, r2].every(v => Number.isInteger(v) && v >= 0) || r2 > r + s) err("r, s, r′ : entiers ≥ 0, r′ ≤ r + s");
      fini(theta, "theta");
      const s2 = r + s - r2, C = Math.cos(theta / 2), S = -Math.sin(theta / 2);
      let b = 0;
      for (let k = 0; k <= s; k++) {
        if (r - r2 + k < 0 || r2 - k < 0) continue;
        b += (k % 2 ? -1 : 1) * S ** (r - r2 + 2 * k) * C ** (s + r2 - 2 * k) * fact(r) / (fact(r - r2 + k) * fact(r2 - k)) * fact(s) / (fact(s - k) * fact(k));
      }
      return Math.sqrt(fact(r2) * fact(s2) / (fact(r) * fact(s))) * b;
    }
    /* (18.72) to (18.76): spin 1, m = +1 → spin 0, by a photon; parite = −1 (odd → even, electric dipole) or +1 (even → even,
       magnetic dipole). Amplitudes R and L at θ, polarization angle of the major axis from the plane (z, direction) */
    function emissionParite(theta, parite) {
      fini(theta, "theta"); if (parite !== 1 && parite !== -1) err("parité : +1 ou −1");
      const c = Math.cos(theta), R = (1 + c) / 2, L = parite * (1 - c) / 2;
      return { R, L, IR: R * R, IL: L * L, rapportAxes: Math.abs(c), axe: parite < 0 ? "perpendiculaire" : "dans le plan" };
    }
    Object.assign(api, { correlationSpin, comptagesSimules, chi2Spin, clebschGordan, composer, coefBinome, emissionParite });
  }

  /* ---------- étape « Schrödinger dans un champ magnétique » (Feynman III.21.1 à 21.4) ---------- */
  {
    const nb = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
    const fin = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
    const anneau = (N, o) => { if (!Number.isInteger(N) || N < 2) err("N : entier ≥ 2"); if (!o) err("o = { E0, K }"); nb(o.K, "K"); return o.E0 || 0; };
    const niveauxAnneauFlux = (N, o, phi) => { const E0 = anneau(N, o); fin(phi, "phi"); const out = [];
      for (let j = 0; j < N; j++) out.push(E0 - 2 * o.K * Math.cos(2 * Math.PI * (j - phi) / N)); return out; };
    /* I = −∂E/∂Φ, with Φ = phi h/q: the probability current around the ring is −(1/h) ∂E/∂phi */
    const courantAnneauFlux = (N, o, phi, j) => { anneau(N, o); fin(phi, "phi"); if (!Number.isInteger(j)) err("j entier");
      return -(1 / Cst.h) * (-2 * o.K * Math.sin(2 * Math.PI * (j - phi) / N) * 2 * Math.PI / N); };
    const courantProbabilite = (psi, o) => {
      if (!Array.isArray(psi) || psi.length < 3) err("psi : au moins trois points"); if (!o) err("o = { m, dx, q, A }");
      const m = nb(o.m, "m"), dx = nb(o.dx, "dx"), q = o.q || 0, N = psi.length;
      const Ax = typeof o.A === "function" ? j => o.A(j * dx) : Array.isArray(o.A) ? j => o.A[j] : () => fin(o.A || 0, "A");
      return psi.map((z, j) => { const a = j ? psi[j - 1] : { re: 0, im: 0 }, b = j < N - 1 ? psi[j + 1] : { re: 0, im: 0 };
        const dre = (b.re - a.re) / (2 * dx), dim = (b.im - a.im) / (2 * dx), P = z.re * z.re + z.im * z.im;
        return (HB / m) * (z.re * dim - z.im * dre) - q * Ax(j) * P / m; });
    };
    const probaDroite = (psi, dx, j) => { nb(dx, "dx"); let s = 0; for (let i = Math.max(0, j); i < psi.length; i++) s += psi[i].re ** 2 + psi[i].im ** 2; return s * dx; };
    const potentielVecteurSolenoide = (Phi, r, R) => { fin(Phi, "Φ"); nb(r, "r"); nb(R, "R"); return r < R ? Phi * r / (2 * Math.PI * R * R) : Phi / (2 * Math.PI * r); };
    const vitesseSolenoide = (q, m, Phi, r, R) => -fin(q, "q") * potentielVecteurSolenoide(Phi, r, R) / nb(m, "m");
    const tirerDensite = (f, x0, x1, n, graine = 1) => {
      if (typeof f !== "function") err("f : fonction"); fin(x0, "x0"); fin(x1, "x1"); if (!(x1 > x0)) err("x1 > x0");
      if (!Number.isInteger(n) || n < 1) err("n entier ≥ 1");
      const M = 2000, h = (x1 - x0) / M, cum = [0];
      for (let i = 0; i < M; i++) { const v = f(x0 + (i + 0.5) * h); if (!(v >= 0)) err("densité négative"); cum.push(cum[i] + v); }
      const tot = cum[M]; if (!(tot > 0)) err("densité nulle");
      let s = graine >>> 0; const alea = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
      const out = [];
      for (let k = 0; k < n; k++) { const u = alea() * tot; let lo = 0, hi = M; while (hi - lo > 1) { const mid = (lo + hi) >> 1; cum[mid] <= u ? (lo = mid) : (hi = mid); }
        out.push(x0 + (lo + (u - cum[lo]) / (cum[lo + 1] - cum[lo] || 1)) * h); }
      return out;
    };
    Object.assign(api, { niveauxAnneauFlux, courantAnneauFlux, courantProbabilite, probaDroite, potentielVecteurSolenoide, vitesseSolenoide, tirerDensite });
  }

  /* ---------- étape « Ondes de spin » ---------- */
  {
    const magnon = o => { if (!o) err("paramètres { A, b } manquants"); positif(o.A, "A"); positif(o.b, "b"); return o; };
    const bandeMagnon = (k, o) => { magnon(o); fini(k, "k"); return 2 * o.A * (1 - Math.cos(k * o.b)); };
    const deuxMagnons = (k1, k2, o) => { const E1 = bandeMagnon(k1, o), E2 = bandeMagnon(k2, o); return { E1, E2, E: E1 + E2 }; };
    const paireMagnons = (k1, k2, d, stat) => { fini(k1, "k1"); fini(k2, "k2"); fini(d, "d"); const c = Math.cos((k1 - k2) * d);
      if (stat === "bosons") return 2 + 2 * c; if (stat === "fermions") return 2 - 2 * c; if (stat === "discernables") return 1;
      return err("statistique inconnue : " + stat); };
    Object.assign(api, { bandeMagnon, deuxMagnons, paireMagnons });
  }

  /* ---------- étape « Particules indépendantes en chimie » ---------- */
  {
    const pi = o => { if (!o) err("paramètres { E0, A } manquants"); fini(o.E0 || 0, "E0"); positif(o.A, "A"); return o; };
    const entierN = (N, min) => { if (!Number.isInteger(N) || N < min) err("N : entier ≥ " + min); };
    const niveauxAnneau = (N, o) => { entierN(N, 3); pi(o);
      return Array.from({ length: N }, (_, s) => (o.E0 || 0) - 2 * o.A * Math.cos(2 * Math.PI * s / N)).sort((a, b) => a - b); };
    const niveauxChaine = (N, o) => { entierN(N, 2); pi(o);
      return Array.from({ length: N }, (_, i) => (o.E0 || 0) - 2 * o.A * Math.cos(Math.PI * (i + 1) / (N + 1))).sort((a, b) => a - b); };
    const remplir = (niv, ne) => { if (!Array.isArray(niv) || !niv.length) err("niveaux manquants");
      if (!Number.isInteger(ne) || ne < 0 || ne > 2 * niv.length) err("ne : entier de 0 à 2 × le nombre de niveaux");
      let total = 0; for (let i = 0; i < ne; i++) total += niv[Math.floor(i / 2)];
      const h = ne ? Math.floor((ne - 1) / 2) : -1, haut = h >= 0 ? niv[h] : null, bas = ne % 2 ? niv[h] : (h + 1 < niv.length ? niv[h + 1] : null);
      return { total, haut, bas, gap: haut === null || bas === null ? null : bas - haut }; };
    const COUCHES_NOYAU = Object.freeze([["1s1/2", 2], ["1p3/2", 4], ["1p1/2", 2], ["1d5/2", 6], ["2s1/2", 2], ["1d3/2", 4], ["1f7/2", 8],
      ["2p3/2", 4], ["1f5/2", 6], ["2p1/2", 2], ["1g9/2", 10], ["1g7/2", 8], ["2d5/2", 6], ["2d3/2", 4], ["3s1/2", 2], ["1h11/2", 12],
      ["1h9/2", 10], ["2f7/2", 8], ["2f5/2", 6], ["3p3/2", 4], ["3p1/2", 2], ["1i13/2", 14]].map(([nom, places]) => Object.freeze({ nom, places })));
    const MAGIQUES = Object.freeze([2, 8, 20, 28, 50, 82, 126]);
    Object.assign(api, { niveauxAnneau, niveauxChaine, remplir, COUCHES_NOYAU, MAGIQUES });
  }

  /* ---------- étape « Les niveaux de l'atome d'hydrogène » (III.19.1 à 19.3) ---------- */
  {
    const k2 = Cst.e * Cst.e / (4 * Math.PI * Cst.eps0);                    // e² of the source: q_e²/(4πε₀), J·m
    /* hydrogen-like ion of charge Z, nucleus of mass M (Infinity: fixed nucleus); μ = m M/(m + M) */
    function echellesHydrogenoide(Z, M, m) {
      fini(Z, "Z"); if (!(Z > 0)) err("Z doit être > 0"); m = m || Cst.m_e;
      if (!(M > 0)) err("M doit être > 0 (Infinity : noyau fixe)");
      const mu = M === Infinity ? m : m * M / (m + M);
      return { mu, rB: HB * HB / (mu * Z * k2), ER: mu * Z * Z * k2 * k2 / (2 * HB * HB) };
    }
    /* wavelength of the n2 → n1 line, m: E_R (1/n1² − 1/n2²) = hc/λ */
    function raieHydrogenoide(n1, n2, Z, M, m) {
      if (!Number.isInteger(n1) || !Number.isInteger(n2) || n1 < 1 || n2 <= n1) err("il faut 1 ≤ n1 < n2, entiers");
      const ER = echellesHydrogenoide(Z, M, m).ER;
      return Cst.h * Cst.c / (ER * (1 / (n1 * n1) - 1 / (n2 * n2)));
    }
    /* (19.22): a₁ = 1, a_(k+1) = 2(αk − 1) a_k/(k(k + 1)) ; the series stops when αk = 1 */
    function coefficientsSerieS(alpha, kmax) {
      fini(alpha, "alpha"); if (!(alpha > 0)) err("alpha doit être > 0");
      const a = [0, 1];
      for (let k = 1; k < (kmax || 400); k++) {
        const t = alpha * k - 1;
        if (Math.abs(t) < 1e-9) { a.push(0); break; }
        a.push(2 * t * a[k] / (k * (k + 1)));
      }
      return a;
    }
    /* f(ρ) = ρψ = e^(−αρ) g(ρ), g = Σ a_k ρ^k (19.14), (19.18) */
    function fonctionS(alpha, rho, kmax) {
      fini(rho, "rho"); if (rho < 0) err("rho doit être ≥ 0");
      const a = coefficientsSerieS(alpha, kmax); let g = 0, p = 1;
      for (let k = 1; k < a.length; k++) { p *= rho; g += a[k] * p; if (k > 2 * alpha * rho + 30 && Math.abs(a[k] * p) < 1e-17 * Math.abs(g)) break; }
      return Math.exp(-alpha * rho) * g;
    }
    /* ⟨l,0|R_y(θ)R_z(φ)|l,m⟩ = e^(imφ) d^l_(0m)(θ) (19.31) ; Y_lm = that/a, a = √(4π/(2l + 1)) (19.33), (19.34) */
    function amplitudeAngulaire(l, m, theta, phi) {
      if (!Number.isInteger(l) || l < 0 || !Number.isInteger(m) || Math.abs(m) > l) err("il faut l entier ≥ 0 et |m| ≤ l entier");
      fini(phi, "phi");
      const d = api.dRotation(l, 0, m, theta);
      return { re: d * Math.cos(m * phi), im: d * Math.sin(m * phi), P: d * d };
    }
    function harmoniqueSpherique(l, m, theta, phi) {
      const z = amplitudeAngulaire(l, m, theta, phi), a = Math.sqrt(4 * Math.PI / (2 * l + 1));
      return { re: z.re / a, im: z.im / a, P: z.P / (a * a) };
    }
    Object.assign(api, { echellesHydrogenoide, raieHydrogenoide, coefficientsSerieS, fonctionS, amplitudeAngulaire, harmoniqueSpherique });
  }

  /* ---------- étape « Supraconductivité » (Feynman III.21.5 à 21.9) ---------- */
  {
    const nb = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
    const fin = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
    const PAIRE = Object.freeze({ q: -2 * Cst.e, m: 2 * Cst.m_e });
    const qq = q => { const v = q === undefined ? PAIRE.q : fin(q, "q"); if (v === 0) err("q non nulle"); return Math.abs(v); };
    const quantumFlux = q => Cst.h / qq(q);
    const longueurLondon = (n, o = PAIRE) => Math.sqrt(nb(o.m, "m") / (Cst.mu0 * nb(n, "n") * qq(o.q) ** 2));
    const profilMeissner = (x, d, l) => { fin(x, "x"); nb(d, "d"); nb(l, "λ"); if (Math.abs(x) > d / 2) return 1;
      const a = d / (2 * l); return a > 300 ? Math.exp((Math.abs(x) - d / 2) / l) : Math.cosh(x / l) / Math.cosh(a); };
    const fluxPiege = (Phi, q) => { fin(Phi, "Φ"); const f = quantumFlux(q); return Math.round(Phi / f) * f; };
    const momentLondon = (w, o = PAIRE) => -2 * nb(o.m, "m") * fin(w, "ω") / fin(o.q, "q");
    const frequenceJosephson = (V, q) => qq(q) * fin(V, "V") / Cst.h;
    const tensionShapiro = (n, f, q) => { if (!Number.isInteger(n)) err("n entier"); return n * Cst.h * fin(f, "f") / qq(q); };
    const courantJonction = (d, J0) => fin(J0, "J0") * Math.sin(fin(d, "δ"));
    const courantSquid = (Phi, J0, q) => 2 * Math.abs(fin(J0, "J0")) * Math.abs(Math.cos(qq(q) * fin(Phi, "Φ") / (2 * HB)));
    Object.assign(api, { PAIRE, quantumFlux, longueurLondon, profilMeissner, fluxPiege, momentLondon, frequenceJosephson, tensionShapiro,
      courantJonction, courantSquid });
  }

  /* ---------- étape « Symétrie et conservation » (Feynman III.17.1 à 17.3) ---------- */
  {
    const z = v => (typeof v === "number" ? { re: fini(v, "élément"), im: 0 } : v && Number.isFinite(v.re) && Number.isFinite(v.im) ? v : err("élément invalide"));
    const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
    const carre = (M, nom) => (Array.isArray(M) && M.length && M.every(l => Array.isArray(l) && l.length === M.length) ? M.map(l => l.map(z)) : err(nom + " doit être une matrice carrée"));
    const prod = (A, B) => A.map((l, i) => B.map((_, j) => l.reduce((s, a, k) => { const p = mul(a, B[k][j]); return { re: s.re + p.re, im: s.im + p.im }; }, { re: 0, im: 0 })));
    /* (17.11): max |(QH − HQ)ᵢⱼ|, zero when Q is a symmetry of H. Exact. */
    const normeCommutateur = (Q, H) => {
      const a = carre(Q, "Q"), b = carre(H, "H"); if (a.length !== b.length) err("matrices de tailles différentes");
      const x = prod(a, b), y = prod(b, a);
      return x.reduce((m, l, i) => Math.max(m, ...l.map((u, j) => Math.hypot(u.re - y[i][j].re, u.im - y[i][j].im))), 0);
    };
    /* the stationary state k of a ring of n equal sites: Cⱼ = e^(2πi kj/n)/√n. Exact for the ring of « Un électron dans un réseau ». */
    const etatAnneau = (n, k) => {
      if (!Number.isInteger(n) || n < 2) err("n doit être un entier ≥ 2"); fini(k, "k");
      return Array.from({ length: n }, (_, j) => ({ re: Math.cos(2 * Math.PI * k * j / n) / Math.sqrt(n), im: Math.sin(2 * Math.PI * k * j / n) / Math.sqrt(n) }));
    };
    /* D(b): the ring moved one site along, C′ⱼ = Cⱼ₋₁ (the state that was at j − 1 is now at j). Exact. */
    const decalerAnneau = C => { if (!Array.isArray(C) || C.length < 2) err("au moins 2 amplitudes"); const v = C.map(z); return v.map((_, j) => v[(j - 1 + v.length) % v.length]); };
    /* if C′ = λ C, returns { lambda, phase = arg λ, ecart = 0 }; otherwise ecart = max |C′ − λC| with λ fitted by least squares. Exact. */
    const rapportPropre = (C, Cp) => {
      const a = C.map(z), b = Cp.map(z); if (a.length !== b.length) err("états de tailles différentes");
      const n2 = a.reduce((s, u) => s + u.re * u.re + u.im * u.im, 0); if (!(n2 > 0)) err("état nul");
      const lam = a.reduce((s, u, i) => { const p = mul({ re: u.re, im: -u.im }, b[i]); return { re: s.re + p.re / n2, im: s.im + p.im / n2 }; }, { re: 0, im: 0 });
      const ecart = a.reduce((m, u, i) => { const p = mul(lam, u); return Math.max(m, Math.hypot(b[i].re - p.re, b[i].im - p.im)); }, 0);
      return { lambda: lam, phase: Math.atan2(lam.im, lam.re), ecart };
    };
    Object.assign(api, { normeCommutateur, etatAnneau, decalerAnneau, rapportPropre });
  }

  /* ---------- étape « Polarisation et désintégration du lambda » (Feynman III.17.4 à 17.6) ---------- */
  {
    const pos = (x, nom) => (fini(x, nom) > 0 ? x : err(nom + " doit être > 0"));
    /* (17.30): photons per second N/t = P λ/(h c) and torque dJz/dt = P/ω = P λ/(2π c), N·m, for light fully absorbed and
       fully circular. Exact for a plane wave; a partly absorbed or partly circular beam gives the fraction concerned. */
    const photonsParSeconde = (P, lambda) => pos(P, "P") * pos(lambda, "λ") / (Cst.h * Cst.c);
    const coupleLumiere = (P, lambda) => pos(P, "P") * pos(lambda, "λ") / (2 * Math.PI * Cst.c);
    /* (17.35): |a|² cos²(θ/2) + |b|² sin²(θ/2), the angular distribution of the proton for a Λ of spin +z; θ from z. Exact for
       spin-1/2 Λ → spin-1/2 proton + spin-0 pion, in the Λ rest frame. */
    const distributionLambda = (theta, a2, b2) => { fini(theta, "θ"); if (!(a2 >= 0 && b2 >= 0)) err("|a|² et |b|² doivent être ≥ 0"); return a2 * Math.cos(theta / 2) ** 2 + b2 * Math.sin(theta / 2) ** 2; };
    /* (17.36) → (17.37): α = (|a|² − |b|²)/(|a|² + |b|²). Exact. */
    const asymetrieLambda = (a2, b2) => { if (!(a2 >= 0 && b2 >= 0 && a2 + b2 > 0)) err("|a|², |b|² ≥ 0, non tous deux nuls"); return (a2 - b2) / (a2 + b2); };
    /* cos θ drawn from (1 + αP cos θ)/2 on [−1, 1], P the Λ polarization, by inverting the cumulative law; u in [0, 1]. Exact. */
    const tirerCosLambda = (u, alpha, P = 1) => {
      fini(u, "u"); const k = fini(alpha, "α") * fini(P, "P");
      if (u < 0 || u > 1) err("u doit être entre 0 et 1"); if (Math.abs(k) > 1) err("|αP| doit être ≤ 1");
      if (Math.abs(k) < 1e-12) return 2 * u - 1;
      return (-1 + Math.sqrt(Math.max(0, 1 - 2 * k * (1 - k / 2 - 2 * u)))) / k;
    };
    /* α estimated from N values of cos θ: 3⟨cos θ⟩, with its standard error √((3 − α²)/N). Exact for the law (17.37). */
    const estimerAlpha = cs => {
      if (!Array.isArray(cs) || cs.length < 2) err("au moins 2 valeurs");
      const m = cs.reduce((s, c) => s + fini(c, "cos θ"), 0) / cs.length, a = 3 * m;
      return { alpha: a, ecart: Math.sqrt(Math.max(0, 3 - a * a) / cs.length) };
    };
    Object.assign(api, { photonsParSeconde, coupleLumiere, distributionLambda, asymetrieLambda, tirerCosLambda, estimerAlpha });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.QuantSchro = api;
})(typeof self !== "undefined" ? self : this);

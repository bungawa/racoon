/* OptOnd — le module commun du monde « Optique ondulatoire » (Feynman vol. I, chap. 28 à 34). Pur, sans DOM, UMD (global OptOnd).
   SI partout. Chaque étape ajoute sa section juste avant la ligne « fin des sections », par Edit seulement, avec
   Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par
   chaque étape ; un nom n'est exporté qu'une fois, sans alias (test/optique-ondulatoire-noms.test.js). Le module ne requiert
   que constantes.js et lecons/complexes.js (Cx) : ce qui a besoin d'un autre module va dans un module à part (les teintes :
   couleurs-optiques.js). Les outils communs (Simpson, sinc, vecteurs, boost, particule) sont au début, avant les sections.
   Chaque fonction est un modèle : son domaine est dans son commentaire. Les erreurs lèvent un message en français : elles
   signalent un appel faux. Tests : test/optique-ondulatoire*.test.js.

   Sommaire
   Socle
     c, eps0                    vitesse de la lumière (exacte, SI 2019), permittivité du vide (CODATA 2022).
   Étape « Les ondes électromagnétiques » (Feynman I.29.1 à 29.3)
     champRayonne(q, a, r, θ)   (29.1) : −q a sin θ/(4π ε0 c² r), V·m⁻¹, a l'accélération retardée. Composante de E sur la
                                projection de l'accélération perpendiculaire à la ligne de visée. Zone d'onde, v ≪ c.
     champRetarde(q, acc, r, t, θ)  (29.1) avec a = acc(t − r/c) : le champ en r à l'instant t.
     forme(nom, a0, τ)          { a(t), v(t), vMax } : "bosse" (accélère puis freine, s'arrête), "poussee" (accélère puis
                                garde sa vitesse), "oscillation" ((29.2), période τ, lâchée du repos à t = 0) ; a = 0 avant t = 0.
     oscillante(q, x0, ω)       { a(t), a0, E(r, t, θ) } : (29.2) et (29.3).
     intensiteMoyenne(E0)       ε0 c E0²/2, W·m⁻² : moyenne sur une période d'une onde sinusoïdale d'amplitude E0.
     dipoleRayonnant(p0, ω)     { E0(r, θ), I(r, θ), P, lambda } : dipôle court p0 cos ωt, zone d'onde ; P la puissance moyenne totale.
     puissanceCone(src, r, θ0, α, n)  { P, aire, Imoy } : puissance qui traverse la calotte de demi-angle α, axe à θ0 de
                                l'axe du dipôle, à la distance r (somme sur n × 2n cellules).
     sinusoide(f, v)            { f, omega, T, k, lambda, v } : (29.4) à (29.8), vitesse de phase v (c par défaut).
     phase(ω, k, x, t)          ωt − kx : la phase de cos(ωt − kx).
     zoneOnde(r, lambda)        { kr, rapport } : dans le plan équatorial d'un dipôle oscillant, module des termes en 1/r² et 1/r³
                                du champ E contre le terme rayonné en 1/r, √(1/(kr)² + 1/(kr)⁴).
   Étape « Interférences de sources synchrones » (Feynman I.29.4, 29.5, 30.1). Sources de même fréquence, champ lointain,
   amplitudes en unités d'une source seule, intensités en unités de l'intensité d'une source seule ; angles en radians.
     dephasage(α, d, λ, θ)      (29.17), (30.4) : α + 2π d sin θ/λ, θ compté depuis la normale à la ligne des sources.
     somme(sources)             (29.14) : Σ Aⱼ e^(iφⱼ) pour [{ A, phi }] → { re, im, A, phi, I, Iseules, interference }.
     deuxOndes(A1, A2, Δφ)      (29.16) : { I = A_R², interference = 2A₁A₂ cos Δφ, A, phi } (phase comptée depuis φ₁).
     egales(A, φ1, φ2)          (29.11), (29.12) : { A = 2A cos ½(φ₁ − φ₂) (signée), phi = ½(φ₁ + φ₂) }.
     signal(sources, ω, t)      (29.9) : Σ Aⱼ cos(ωt + φⱼ), la somme réelle.
     nOscillateurs(n, φ)        (30.2) : A_R/A = sin(nφ/2)/sin(φ/2), prolongée par continuité en φ = 2πm.
     intensiteN(n, φ)           (30.3) : I/I₀ = sin²(nφ/2)/sin²(φ/2).
     polygone(n, φ, A)          les n flèches bout à bout (sommets), le cercle qui les porte, la résultante.
     reseau({ n, d, lambda, alpha })  n sources alignées au pas d, déphasées de α de l'une à la suivante : I(θ) par (30.3) et
                                par la somme directe, premier zéro (30.5), ordres (30.6), direction du faisceau, lobe secondaire.
     lobeSecondaire(n)          le plus haut lobe secondaire de (30.3) sur n², exact, et l'estimation 4/(9π²) en φ = 3π/n.
     champExact(o)              même réseau vu à la distance finie R : somme des e^(i(jα − k rⱼ))·R/rⱼ, sans champ lointain ;
                                écart à (30.3) et nombre de Fresnel L²/(λR).
   Étape « Réseau et antennes » (Feynman I.30.2 à 30.4)
     phaseReseau(d, λ, θin, θout)  (30.7) : 2π d (sin θout − sin θin)/λ, pas de phase entre traits voisins.
     ordres(d, λ, θin)          [{ m, sin, theta }] : sin θout = sin θin + mλ/d, |sin θout| ≤ 1.
     largeurAngulaire(n, d, λ, θ)  λ/(n d cos θ), du maximum au premier zéro.
     motif(q, o)                facteur du trait, q = φ/2π : "fin", "fente" (largeur f d), "echelette" (λB).
     intensiteReseau(θout, o)   { n, d, lambda, thIn, motif } : intensité rapportée à un maximum principal de traits fins.
     efficacite(m, λ, λB)       part de la lumière d'un réseau à échelettes dans l'ordre m ; somme 1.
     limiteContinue(Φ)          (30.8) : 4 sin²(Φ/2)/Φ².
     pouvoirResolution(m, n)    (30.9) : λ/Δλ = |m| n.
     deuxRaies(o)               { n, d, lambda1, lambda2, m, thIn, N } : profil de deux raies incohérentes, creux, R demandé et R du réseau.
     retard(n, d, λ, θin, θout)  { T, dnu, nu } : retard entre chemins extrêmes et Δν = 1/T.
     diagramme(points, λ, θ)    |Σ exp(i k x sin θ)|²/N² : diagramme d'un ensemble d'antennes en phase (réception = émission).
     alignement(n, d, λ, θ)     n dipôles en ligne, en phase.
     ouvertureLineaire(L, λ, θ)  sinc²(π L sin θ/λ) : premier zéro en sin θ = λ/L.
     parabole(f, D, λ, θ, N)    { x, y, chemin, ecart, puissance } : chemins jusqu'au foyer par un réflecteur parabolique, source à θ.
     pointsDisque(D, g)         points d'un disque sur une grille g × g, pour diagramme.
   Étape « Rayonnement d'un dipôle » (Feynman I.28.1 à 28.4). Vecteurs [x, y, z] ; traj : t′ → [x, y, z], |v| < c.
     K                          1/(4π ε0), N·m²·C⁻².
     retarde(traj, P, t)        instant retardé t′ : t − t′ = |P − r(t′)|/c (racine unique si |v| < c).
     champCharge(q, traj, P, t, h)  (28.3), (28.4) : { E, B, coulomb, correction, rayonnement, tr, r, e } d'une charge en
                                mouvement quelconque, les trois termes à part ; dérivées en t par différences centrées de pas h.
     termesDipole(p0, f, r, θ)  amplitudes des trois termes de (28.3) pour une charge qui oscille près d'une charge opposée fixe :
                                K p0 √(1 + 3cos²θ)/r³, kr fois plus, K p0 k² sin θ/r ; égales à kr = 1.
     apparent(traj, n, t)       règle du peintre : { tr, s }, la position apparente r⊥(t′) vue de très loin dans la direction n.
     champLointain(q, traj, n, t, h)  (28.5) : { rE } = −K q/c² d²r⊥/dt², champ fois distance (V), exact quand r → ∞, à toute v < c.
     champ286(q, a, n)          (28.6) vectorielle : r E = −K q a⊥/c², délai constant (v ≪ c).
     signalDetecteur(E, u)      |E·u| : ce que capte un détecteur court de direction u.
     sommeDipoles(sources, P, λ)  phaseurs des champs lointains de dipôles courts [{ pos, axe, phase, p }] : { re, im, max, axe,
                                mineur, delta, r } ; polarisation (axe, mineur = 0 si rectiligne) et r₂ − r₁.
   Étape « Films colorés et diffraction » (Feynman I.30.5 à 30.7). Dépend de lecons/complexes.js (Cx). La teinte d'une lame :
   couleurs-optiques.js (couleurFilm).
     fresnelFace(ni, nj, ci, cj, pol)   coefficient de réflexion en amplitude d'une face, polarisation "s" ou "p".
     film(o)                    lame mince n, e entre n0 et n2, incidence θ : R exacte (réflexions multiples), R2 (deux ondes),
                                δ = 4π n e cos θ1/λ, différence de marche 2 n e cos θ1.
     spectreFilm(o, λs)         R pour chaque longueur d'onde.
     bragg(d, λ, ordre)         angle de Bragg, 2 d sin θ = ordre λ ; null si ordre λ > 2d. ordresBragg(d, λ) : tous les ordres.
     fresnelCS(u)               intégrales de Fresnel C(u), S(u), erreur < 10⁻⁹.
     bord(u), bordEcran(o)      intensité derrière un bord rectiligne, I/I0 = ½[(C + ½)² + (S + ½)²] ; u = x √(2/(λ s)).
     sommeSources(o)            la même par sommation directe des sources, distance exacte (vérification).
     cornu(u0, u1, n)           points de la spirale de Cornu.
     champPlan(o)               (30.18), (30.19) : champ d'un plan de charges oscillantes, E = −(η q/(2 ε0 c)) v(t − z/c).
     sommeAnneaux(o)            (30.15) anneau par anneau, densité coupée net ou adoucie au-delà de R ; (30.17) en regard.
     zoneFresnel(n, λ, z)       rayon de la n-ième zone de Fresnel, √((z + nλ/2)² − z²).
   Étape « Indice de réfraction et dispersion » (Feynman I.31.1 à 31.3). Dépend de lecons/complexes.js (Cx). Charge −e et
   masse me par défaut (o.q, o.m) ; amplitudes complexes, facteur e^(iωt) sous-entendu.
     lameIndice(n − 1, Δz, λ)   (31.5) à (31.8) : φ = 2π(n − 1)Δz/λ, facteur exact e^(−iφ), premier ordre 1 − iφ, Ea/Es, écarts.
     electronElastique(ω0, ω, E0, o)  (31.15), γ en option : { x, p, v, module, retard } de l'électron lié élastiquement.
     champMilieu(η, ω0, ω, o)   (31.17) : Ea/Es en sortie de lame, η électrons par m².
     indiceMilieu(N, ω0, ω, o)  (31.19) : n = 1 + N q²/(2 ε0 m (ω0² − ω²)).
     indiceDispersion(res, ω, o)  (31.20) : { n1 = n′, n2 = n″, pente = dn′/dω, pente2, regime } pour [{ N, w0, gamma }].
     plasmaPulsation(N)         ωp = √(N e²/(ε0 me)).
     plasmaIndice(N, ω)         (31.19a) au premier ordre, indice exact du plasma froid, indice de groupe, vitesses de phase et de groupe.
     ionoRetard(TEC, f)         retard de groupe K TEC/(c f²), K = e²/(8π² ε0 me) ≈ 40,3 m³·s⁻².
     ionoCombinaison(P1, P2, f1, f2)  combinaison bifréquence sans terme en 1/f², et le TEC qu'elle implique.
     SELLMEIER_BK7, sellmeier(coef, λ)  n² − 1 = Σ Bk λ²/(λ² − Ck) (λ en µm) ; forme diluée 1 + (n² − 1)/2 et son écart.
     oscillateursSellmeier(coef)  chaque terme comme un oscillateur : λk, ωk, densité Nk d'électrons équivalente.
   Étape « Absorption et écrans » (Feynman I.31.4 à 31.6). Raies : [{ N (m⁻³), w0, gamma, q, m }], l'électron par défaut.
     indiceComplexe(ω, raies)   (31.20), (31.21) : { n, np = n′, nsec = n″ }, n = n′ − i n″, milieu dilué.
     traversee(ω, raies, Δz)    (31.22), (31.22a) : { A, retard, T = e^{−αΔz}, alpha = 2ωn″/c, longueur }.
     profondeurCentre(raie, NΔz)  τ0 = q² N Δz/(ε0 m c γ), profondeur optique au centre d'une raie.
     largeurEquivalente(raie, NΔz)  ∫(1 − T) dω, et ses limites (π/2) τ0 γ (raie faible) et γ √(π τ0) (raie saturée).
     champIntensite(S)          (31.28a) inversée : E0 = √(2S/(ε0 c)) et la valeur efficace.
     feuille(o)                 (31.23) à (31.27) : bilan d'énergie d'une feuille d'oscillateurs, au premier ordre et exact.
     besselJ0(x)                J0, Abramowitz et Stegun 9.4.1 et 9.4.3, erreur < 10⁻⁷.
     trou(o), disque(o)         champ paraxial derrière un trou circulaire, ou un disque opaque (somme directe) : Babinet.
     ecranAbsorbant(n″, λ, d)   T = e^{−4π n″ d/λ}, profondeur de pénétration, épaisseur pour un T donné.
   Étape « Amortissement par rayonnement » (Feynman I.32.1 à 32.3). Électron par défaut (o.q, o.m).
     Z0, E2                     1/(ε0 c) ≈ 376,73 Ω, impédance du vide ; (32.7) e² = qe²/(4π ε0), J·m.
     fluxMoyen(⟨E²⟩)            (32.1) : ε0 c ⟨E²⟩, W·m⁻². fluxLarmor(q, a, r, θ) : (32.2).
     larmor(q, a)               (32.5) : q² a²/(6π ε0 c³). puissanceOscillante(q, ω, x0) : (32.6).
     fraction(θ1, θ2), bande(α)  part de la puissance de (32.4) entre deux angles, ou à ±α du plan équatorial.
     resistanceDipoleCourt(L, λ, courant)  "uniforme" (2π/3) Z0 (L/λ)², "triangle" (π/6) Z0 (L/λ)², Ω.
     dipoleMince(L, λ)          { Rmax, R, rapport } : fil mince alimenté au centre, courant sinusoïdal ; 73,1 Ω en demi-onde.
     pertesOhmiques(o)          { L, lambda, a, sigma, courant } : résistance de peau ramenée à l'alimentation, { R, Rs, delta, f }.
     rendement(Rr, Rp)          Rr/(Rr + Rp).
     facteurQ(ω, W, dW/dt)      (32.8). energieOscillateur(m, ω, x0) : (32.9). rayonClassique(o) : (32.11), r0.
     amortissement(λ, o)        (32.10) à (32.13) : { Q, w0, gamma, tau, oscillations, dlambda = 4π r0/3, dnu, r0 }.
     declin(Q, ω, t)            e^{−ωt/Q} sur l'énergie, sa racine sur l'amplitude. lorentz(Δω, γ) : profil de raie.
   Étape « Diffusion de la lumière » (Feynman I.32.4, 32.5, 33.1). Les teintes sont dans couleurs-optiques.js (couleurSpectre),
   le ciel coloré dans lecons/opt-diffusion-lumiere.js.
     interferenceMoyennee(A1, A2, δf, T, φ0)  (32.14a) : { seules, facteur = sinc(π δf T), contraste, I(t), detecte(t) }, deux
                                sources décalées de δf vues par un détecteur qui moyenne sur T.
     residuTrains(τc, T)        √(τc/(2T)) : écart type du terme croisé moyenné (unités de 2A₁A₂), phases tirées au hasard tous les τc.
     alea(graine)               générateur reproductible sur [0, 1[ (mulberry32).
     sommeAleatoire(n, A, r)    (32.14b) : n phaseurs de phases au hasard, { pas, re, im, I, Iseules = nA² }.
     dureeTrainClassique(λ)     1/γ = Q/ω0, Q = 3λ/(4π r0) : durée d'un train d'onde de l'électron classique (≈ 10⁻⁸ s).
     coherenceDoppler(λ, T, m)  { dnu, tauc = 1/Δν } : largeur Doppler à mi-hauteur d'une raie d'atomes de masse m à T.
     sectionThomson(o)          (32.19a) σT = 8π r0²/3, r0 de rayonClassique(o) ; l'électron par défaut.
     sectionDiffusion(ω, ω0, γ, o)  (32.19), forme amortie si γ : σT ω⁴/((ω² − ω0²)² + γ²ω²).
     puissanceDiffusee(E0, ω, ω0, γ, o)  (32.17), (32.18) : { S = ½ ε0 c E0², sigma, P = S σ }.
     sectionIndice(n − 1, N, λ, F)  (32.19c) : 32π³(n − 1)²/(3N²λ⁴), fois le facteur de King F (1 par défaut).
     AIR, indiceAir(λ)          air sec normal (288,15 K, 101 325 Pa, 300 ppm de CO2, M) ; n − 1 de Peck et Reeder (1972).
     epaisseurRayleigh(λ, o)    (32.19d) : { sigma, colonne = p NA/(M g), tau, N } de toute l'atmosphère au-dessus d'un lieu à p.
     masseAir(h, o)             { m, H } : air traversé à l'élévation h, en colonnes verticales ; atmosphère isotherme sphérique.
     stokes(Ax, Ay, δ)          [S0, S1, S2, S3] de E = (Ax cos ωt, Ay cos(ωt + δ)) ; S3 > 0 : sens trigonométrique vu de face.
     etatPolarisation(Ax, Ay, δ, tol)  { a, b, psi, rapport, sens, nature, chi, point(ωt) } : l'ellipse décrite par le bout de E.
     etatHasard(r), degrePolarisation(etats)  état tiré sur la sphère de Poincaré ; P = √(S1² + S2² + S3²)/S0 d'un mélange.
   Étape « Biréfringence et polariseurs » (Feynman I.33.2 à 33.4). Dépend de lecons/complexes.js (Cx). Vecteur de Jones
   J = { x, y } (complexes), champ Re(J e^{iωt}) ; angles en radians depuis x.
     rectiligne(θ, A), circulaire(sens, A)  états de Jones ; sens +1 : de x vers y, vu par qui reçoit la lumière.
     jonesVersReel(J), versEllipse(J, tol)  { Ax, Ay, delta } de stokes et etatPolarisation ; l'ellipse de J, plus son intensité I.
     dephasageLame(Δn, e, λ)    φ = 2π Δn e/λ, Δn = n(E selon l'axe) − n(E en travers) : retard de la composante selon l'axe.
     epaisseurLame(Δn, λ, fraction, ordre)  (ordre + fraction) λ/|Δn| : lame quart d'onde (¼), demi-onde (½).
     lame(J, α, φ)              lame d'axe à α, retard φ de la composante selon l'axe ; sans perte.
     polariseur(J, θ, o)        feuille dichroïque d'axe θ, transmissions en intensité o.k1 (selon l'axe, 1) et o.k2 (en travers, 0).
     chaine(J, elements), naturelle(elements)  [{ type: "polariseur" | "lame", … }] dans l'ordre ; intensité pour la lumière naturelle.
     escalier(n, angle, o)      n + 1 polariseurs tournés de angle/n chacun : { I, ideal = ½ cos^{2n}(angle/n), apres, pas }.
     entreCroises(α, φ)         lame entre polariseurs : croisés sin²2α sin²(φ/2), parallèles le reste.
     diffusion(θ, ρ)            lumière naturelle diffusée à θ : { Iperp = 1, Ipar = ρ + (1 − ρ) cos²θ, total, P }.
     rayonneDipole(p, n)        p − (p·n) n : le champ lointain d'un dipôle vu dans la direction n, à un facteur près.
     cielPolarise(soleil, vise, ρ)  { theta, P, axe } du ciel en diffusion simple ; soleil, vise : { h, az }.
     brewster(n1, n2)           arctan(n2/n1).
   Étape « Activité optique et réflexion » (Feynman I.33.5 à 33.7). Même vecteur de Jones ; dépend de la section précédente.
     helice(A, λ)               { phase = π + kA, residu = 2|sin(kA/2)|, premierOrdre = kA } : les deux côtés d'une hélice de diamètre A.
     specifiqueSI([α]), SUCRES  °·mL·dm⁻¹·g⁻¹ → rad·m²·kg⁻¹ ; pouvoirs rotatoires spécifiques à 589 nm, 293,15 K.
     rotationSolution(a, ℓ, c)  loi de Biot α = a ℓ c (rad), c en kg·m⁻³ ; α > 0 : dextrogyre (horaire pour qui reçoit la lumière).
     circulaires(J, n₊, n₋, ℓ, λ)  J à travers ℓ d'un milieu d'indices n₊, n₋ pour circulaire(+1), circulaire(−1).
     rotationCirculaire(n₊, n₋, ℓ, λ)  π(n₋ − n₊)ℓ/λ, comptée dans le sens +1. ecartCirculaire(α, ℓ, λ) : n₊ − n₋ = αλ/(πℓ), α horaire.
     polarimetre(o)             { a, l, c, beta, lambda } : { alpha (horaire), I = cos²(β − α), dn = n₊ − n₋, J }.
     reflexion(n1, n2, i)       (33.1) à (33.8) : { r, b, B, a, A, Rs, Rp, Ts, Tp, R, P, totale } ; signes de Feynman pour b et B.
     reflexionNormale(n1, n2), angleCritique(n1, n2)  ((n1 − n2)/(n1 + n2))² ; arcsin(n2/n1) si n1 > n2, sinon null.
     CRISTAUX, indiceExtra(no, ne, θ), rayonExtra(no, ne, θ)  calcite, quartz à 589 nm ; n(θ) de l'onde extraordinaire, θ depuis
                                l'axe ; direction du rayon { theta, rho = angle de séparation }.
     lameUniaxe(o)              { no, ne, axe, i, e, n1 } : rayons ordinaire et extraordinaire dans une lame, séparation en sortie.
     momentCirculaire(W, ω), couple(P, λ, Δ)  W/ω ; couple P Δ/ω d'un faisceau dont chaque photon change de Δ ħ.
   Étape « Sources rapides » (Feynman I.34.1 à 34.3). Observateur très loin sur la ligne de visée ; z compté le long de
   celle-ci en s'éloignant de lui, x et y en travers ; t le temps de l'observateur moins R0/c, τ celui de la source.
     deplie(traj, τ, h)         (34.5), (34.4a), (34.4b) : { t = τ + z/c, x, y, s = dt/dτ, compression, ax, ay = d²x′/dt² }.
     oscillationOblique(β0, α)  charge qui oscille sur une droite à α de la ligne de visée : point(τ), pic, rapport à (28.6),
                                compressionMax, harmoniques (amplitudes à kω0), fondamental (part de ⟨a²⟩).
     cercle(β, φ), cercleVu(β, Ωt)  (34.5a), (34.5b) : cycloïde raccourcie, { Ot, x, z, s, a } en unités R, 1/Ω, RΩ².
     picCercle(β)               impulsion au point de rebroussement : compression, hauteur, zero, largeur, ωc/Ω (34.5c).
     picUniversel(u)            la même impulsion quand γ ≫ 1 : { wct = ωc t, E/Epic }, indépendante de γ.
     pcEV(B, R, z)              (34.9) : pc en eV = z c B R.
     anneau({ W, B, q, m })     (34.6) à (34.9) et rayonnement : R, ω, γ, 1 − β, T0, λ0, ωc, λc, Ec, U0 par tour, perte, P, 1/γ.
     F_TOTAL, spectreF(x)       spectre synchrotron F(x) = x ∫ₓ^∞ K₅/₃, x = ω/ωc ; ∫F = 8π/(9√3).
     fractionSpectre(x1, x2)    part de la puissance entre x1 et x2.
   Étape « Synchrotron cosmique et effet Doppler » (Feynman I.34.4 à 34.6). β = v/c, γ ≥ 1 ; électron par défaut (o.q, o.m),
   o.sinAlpha le sinus de l'angle entre v et B (1 par défaut ; moyenne sur des angles au hasard pour puissanceSynchrotron).
     gyration(γ, B, o)          (34.8p) : { omega = |q|B/(γm), f, periode, rayon, beta } du mouvement autour de B.
     frequenceCritique(γ, B, o), gammaPourFrequence(ν, B, o)  νc = 3γ²|q|B sin α/(4π m), et le γ qui la donne.
     larmorRelativiste(q, γ, a⊥, a∥)  q²γ⁴(a⊥² + γ²a∥²)/(6π ε0 c³) (Liénard) ; (32.5) pour γ = 1.
     puissanceSynchrotron(γ, B, o)  2σ c β²γ² U_B sin²α, U_B = B²/(2μ0) ; (4/3)σ c β²γ² U_B en moyenne.
     tempsRefroidissement(γ, B, o), refroidir(γ0, B, t, o)  γmc²/P ; γ(t) = γ0/(1 + t/τ0) quand β ≈ 1.
     polarisationMax(p)         (p + 1)/(p + 7/3) : polarisation rectiligne la plus forte, électrons en E^(−p), champ uniforme.
     compression(β, cos θ)      (34.5p) : dt/dt′ = 1 − β cos θ, sans perte de chiffres près de θ = 0.
     distributionAngulaire(β, θ, φ, mode)  dP/dΩ en temps de la charge, unités q²a²/(16π² ε0 c³) ; a "perpendiculaire" ou
                                "parallele" à v.
     fractionCone(β, α, mode), demiCone(β, mode)  part de l'énergie à moins de α de la vitesse ; l'angle qui en contient la moitié.
     coude({ beta, R, delta })  { traj, T, a, omega } : virage d'angle δ sur un cercle de rayon R, à vitesse constante.
     dopplerSansDilatation(β), dopplerAxe(β), dopplerSource(β, cos θ)  (34.10) avec ω1 = ω0 ; (34.12) = (34.12a)
                                √((1 + β)/(1 − β)) ; (34.12b) 1/(γ(1 − β cos θ)). β > 0 : source et observateur se rapprochent.
     dopplerObservateur(ω0, k0, v)  (34.13), (34.14) pour la lumière : (ω0 + k0 v)/√(1 − v²/c²).
     transformerOnde(ω, k, v)   (34.17), (34.18) : { omega: γ(ω + kv), k: γ(k + ωv/c²) }.
     decalageZ(β), vitesseDepuisZ(z)  z = λ/λ0 − 1 d'une source qui s'éloigne à β, et l'inverse.
   Étape « Aberration et impulsion de la lumière » (Feynman I.34.7 à 34.9). Changement de référentiel par le boost du socle
   (la formule de boostQuadriVecteur de relativite.js). Onde plane : K = [ω/c, kx, ky, kz] (rad·m⁻¹) ; événement X = [ct, x, y, z] (m).
     quadriOnde(ω, n, v)        (34.19) : [ω/c, (ω/v) n], v vitesse de phase (c par défaut).
     composantes(λ, α)          (34.20) : { k, kx, ky, lambdaX = λ/|cos α|, lambdaY = λ/|sin α| }.
     phaseOnde(K, X)            (34.21) : ωt − k·r, invariant.
     ondeVue(K, β)              (34.21a) : { K, omega, k, lambda, n, rapport = ω′/ω, invariant } vue d'un observateur à βc.
     aberration(θ, β)           (34.23a) : { theta = θ′, ecart = θ − θ′, galilee, ecartGalilee, ordre1 = β sin θ, doppler = ω′/ω },
                                source vue à θ de +x dans S, observateur qui avance à βc selon +x.
     devant(β)                  (1 + β)/2 : part d'un ciel isotrope vue dans la moitié avant.
     aberrationAnnuelle(a, T, e), ellipseAberration(κ, b)  κ = 2π a/(c T √(1 − e²)) ; demi-axes κ et κ|sin b|.
     pression(I, o), forceFaisceau(P, o)  (34.24a) : { normale = (1 + R) I cos²θ/c, tangentielle, absorbe } ; force d'un faisceau P.
     quantum(λ)                 (34.25) à (34.27) : { nu, omega, k, W = ħω, eV, p = ħk, K }.
     pousseeOscillateur(ω0, ω, E0, o)  électron lié poussé par l'onde : { E(t), v(t), F(t), Fmoy, Pmoy, rapport = c Fmoy/Pmoy, retard, sigma }.
     voileSolaire(o)            { A, m, R, r } : { S, F, a, g, rapport = a/g } (indépendant de r).
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const C = Cst.c, EPS0 = Cst.eps0, TAU = 2 * Math.PI;
  const err = m => { throw new Error("OptOnd : " + m); };
  const fini = (x, nom) => (Number.isFinite(x) ? x : err(nom + " doit être un nombre fini"));
  const pos = (x, nom) => (Number.isFinite(x) && x > 0 ? x : err(nom + " doit être un nombre > 0"));
  const entier = (n, nom) => (Number.isInteger(n) && n >= 1 ? n : err(nom + " doit être un entier ≥ 1"));
  /* sin x/x, 1 at 0 (the series below 10⁻⁸ errs by less than 10⁻³²) */
  const sinc = x => (Math.abs(x) < 1e-8 ? 1 - x * x / 6 : Math.sin(x) / x);
  /* Simpson's rule on [a, b], n even intervals: error of order h⁴ f⁽⁴⁾ (b − a)/180 */
  const simpson = (f, a, b, n) => {
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
    return s * h / 3;
  };
  /* the charge and mass o.q, o.m; the electron's (−e, me) by default */
  const particule = o => ({ q: o && o.q !== undefined ? fini(o.q, "q") : -Cst.e, m: o && o.m !== undefined ? pos(o.m, "m") : Cst.m_e });
  /* 3-vectors [x, y, z] */
  const vec = (v, nom) => (Array.isArray(v) && v.length === 3 && v.every(Number.isFinite) ? v : err(nom + " doit être un vecteur [x, y, z] fini"));
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => Math.hypot(a[0], a[1], a[2]);
  const unit = (a, nom) => { const l = norm(vec(a, nom)); return l > 0 ? mul(a, 1 / l) : err(nom + " ne doit pas être nul"); };
  const perp = (a, n) => sub(a, mul(n, dot(a, n)));                   // the part of a perpendicular to the unit vector n
  /* four-vectors [t, x, y, z], metric (+, −, −, −). boost(A, β): A read in a frame moving at βc (β a 3-vector, |β| < 1), the
     formula of boostQuadriVecteur in relativite.js; scalaire4: the invariant product. Exact (special relativity). */
  const quadri = (A, nom) => (Array.isArray(A) && A.length === 4 && A.every(Number.isFinite) ? A : err(nom + " doit être un quadrivecteur [t, x, y, z] fini"));
  const boost = (A, b) => {
    const b2 = dot(b, b); if (b2 === 0) return A.slice();
    const bm = Math.sqrt(b2), g = 1 / Math.sqrt((1 - bm) * (1 + bm)), bA = b[0] * A[1] + b[1] * A[2] + b[2] * A[3], k = (g - 1) * bA / b2 - g * A[0];
    return [g * (A[0] - bA), A[1] + k * b[0], A[2] + k * b[1], A[3] + k * b[2]];
  };
  const scalaire4 = (a, b) => a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3];
  const api = { c: C, eps0: EPS0 };

  /* ---------- étape « Les ondes électromagnétiques » (Feynman I.29.1 à 29.3) ---------- */
  {
    /* (29.1): the field of a charge q at distance r, at the angle θ from the axis of its acceleration, a being the acceleration
       at the retarded time t − r/c. Signed component along the projection of the acceleration perpendicular to the line of
       sight: a positive charge accelerating "up" gives a field pointing "down". Model: wave zone (r ≫ λ, the other terms are
       of order λ/(2πr) smaller), v ≪ c, displacement of the charge ≪ r. */
    function champRayonne(q, a, r, theta) {
      return -fini(q, "q") * fini(a, "a") * Math.sin(fini(theta, "θ")) / (4 * Math.PI * EPS0 * C * C * pos(r, "r"));
    }
    /* (29.1) with the acceleration history acc(t') (m·s⁻², t' in s): the field at r at time t. */
    function champRetarde(q, acc, r, t, theta) {
      if (typeof acc !== "function") err("acc doit être une fonction du temps");
      return champRayonne(q, acc(fini(t, "t") - pos(r, "r") / C), r, theta);
    }
    /* three acceleration histories, at rest before t = 0, peak a0, duration (or period) τ. Exact kinematics:
       bosse      a = a0 sin(2πt/τ) on [0, τ]: speeds up, slows down, stops after a0 τ²/(2π); vMax = a0 τ/π at τ/2.
       poussee    a = a0 sin²(πt/τ) on [0, τ]: ends at a0 τ/2 and keeps it.
       oscillation a = a0 cos(2πt/τ) for t ≥ 0: x = −x0 cos ωt with x0 = a0/ω², released from rest at −x0 (29.2); vMax = a0/ω.
       The step of a at t = 0 for the oscillation is a model: a real release takes a finite time. */
    function forme(nom, a0, tau) {
      fini(a0, "a0"); pos(tau, "τ");
      const w = TAU / tau;
      if (nom === "bosse") return {
        a: t => (t > 0 && t < tau ? a0 * Math.sin(w * t) : 0),
        v: t => (t <= 0 ? 0 : t >= tau ? 0 : a0 / w * (1 - Math.cos(w * t))),
        vMax: Math.abs(a0) * tau / Math.PI };
      if (nom === "poussee") return {
        a: t => (t > 0 && t < tau ? a0 * Math.sin(Math.PI * t / tau) ** 2 : 0),
        v: t => (t <= 0 ? 0 : t >= tau ? a0 * tau / 2 : a0 * (t / 2 - Math.sin(w * t) / (2 * w))),
        vMax: Math.abs(a0) * tau / 2 };
      if (nom === "oscillation") return {
        a: t => (t >= 0 ? a0 * Math.cos(w * t) : 0),
        v: t => (t <= 0 ? 0 : a0 / w * Math.sin(w * t)),
        vMax: Math.abs(a0) / w };
      return err("forme inconnue : " + nom);
    }
    /* (29.2), (29.3): x = x0 cos ωt for all t, a = −ω² x0 cos ωt = a0 cos ωt. Same model as (29.1), and x0 ≪ λ (v0/c = ω x0/c). */
    function oscillante(q, x0, omega) {
      fini(q, "q"); fini(x0, "x0"); pos(omega, "ω");
      const a0 = -omega * omega * x0;
      return { a0, a: t => a0 * Math.cos(omega * fini(t, "t")),
        E: (r, t, theta) => champRayonne(q, a0 * Math.cos(omega * (fini(t, "t") - pos(r, "r") / C)), r, theta) };
    }
    /* mean intensity of a sinusoidal wave of amplitude E0 in vacuum, ε0 c E0²/2, W·m⁻². Wave zone, where B = E/c and the
       energy flows radially; the mean is over a whole number of periods. */
    function intensiteMoyenne(E0) { return EPS0 * C * fini(E0, "E0") ** 2 / 2; }
    /* a short dipole p0 cos ωt (length ≪ λ), wave zone: E0 = p0 ω² sin θ/(4π ε0 c² r) from (29.3), I = ε0 c E0²/2,
       P = p0² ω⁴/(12π ε0 c³) the mean total power (Larmor, averaged), the integral of I over any sphere. */
    function dipoleRayonnant(p0, omega) {
      fini(p0, "p0"); pos(omega, "ω");
      const E0 = (r, theta) => Math.abs(p0) * omega * omega * Math.abs(Math.sin(fini(theta, "θ"))) / (4 * Math.PI * EPS0 * C * C * pos(r, "r"));
      return { p0, omega, lambda: TAU * C / omega, E0, I: (r, theta) => intensiteMoyenne(E0(r, theta)),
        P: p0 * p0 * omega ** 4 / (12 * Math.PI * EPS0 * C ** 3) };
    }
    /* power through the spherical cap of half-angle α (0 < α ≤ π) at distance r, its axis at θ0 from the dipole axis.
       Midpoint rule, uniform in cos β (β from the cap axis) and in φ: n × 2n cells. Exact in the limit; the error falls as 1/n². */
    function puissanceCone(src, r, theta0, alpha, n) {
      pos(r, "r"); fini(theta0, "θ0"); pos(alpha, "α"); if (alpha > Math.PI) err("α doit être ≤ π");
      n = n || 60;
      const s0 = Math.sin(theta0), c0 = Math.cos(theta0), u0 = Math.cos(alpha), du = (1 - u0) / n, dphi = Math.PI / n;
      let P = 0;
      for (let i = 0; i < n; i++) {
        const cb = u0 + (i + 0.5) * du, sb = Math.sqrt(1 - cb * cb);
        for (let j = 0; j < 2 * n; j++) {
          const ph = (j + 0.5) * dphi, cz = cb * c0 - sb * Math.cos(ph) * s0;
          P += src.I(r, Math.acos(Math.max(-1, Math.min(1, cz))));
        }
      }
      const aire = TAU * r * r * (1 - u0);
      P *= r * r * du * dphi;
      return { P, aire, Imoy: P / aire };
    }
    /* (29.4) to (29.8): a sinusoidal wave of frequency f moving at phase speed v (c in vacuum). Exact definitions;
       λ = v/f holds only for a wave of a single frequency. */
    function sinusoide(f, v) {
      pos(f, "f"); v = v === undefined ? C : pos(v, "v");
      const omega = TAU * f;
      return { f, omega, T: 1 / f, k: omega / v, lambda: v / f, v };
    }
    function phase(omega, k, x, t) { return fini(omega, "ω") * fini(t, "t") - fini(k, "k") * fini(x, "x"); }
    /* the near terms of an oscillating point dipole against its radiated term, in its equatorial plane: E_θ is proportional to
       1/(kr) − i/(kr)² − 1/(kr)³ (time factor apart), so the ratio is √(1/(kr)² + 1/(kr)⁴). Exact for a point dipole in vacuum. */
    function zoneOnde(r, lambda) {
      const kr = TAU * pos(r, "r") / pos(lambda, "λ");
      return { kr, rapport: Math.sqrt(1 / (kr * kr) + 1 / kr ** 4) };
    }
    Object.assign(api, { champRayonne, champRetarde, forme, oscillante, intensiteMoyenne, dipoleRayonnant, puissanceCone, sinusoide, phase, zoneOnde });
  }

  /* ---------- étape « Interférences de sources synchrones » (Feynman I.29.4, 29.5, 30.1) ----------
     Model for the whole section: sources of one frequency and fixed phases (coherent), the observer in the far field
     (R ≫ size L of the array, R ≫ L²/λ, R ≫ λ), each source radiating the same field towards him (vertical dipoles seen in
     their horizontal plane: sin θ_axis = 1), fields that add (vacuum is linear). Amplitudes are in units of one source,
     intensities (mean of the field squared) in units of one source alone. */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    /* (29.17), (30.4): phase of source 2 minus source 1 (or of one source minus the previous one) on arrival, seen in the
       direction θ from the normal; source 2 sits at +d along the line, its own phase ahead by α. Far field only: the two
       rays are taken parallel, error of order d²/(λR) in phase. */
    function dephasage(alpha, d, lambda, theta) {
      return fini(alpha, "α") + TAU * fini(d, "d") * Math.sin(fini(theta, "θ")) / pos(lambda, "λ");
    }
    /* (29.14): the complex amplitude Σ Aⱼ e^(iφⱼ). I = A_R², Iseules = Σ Aⱼ² (what adding intensities would give),
       interference = I − Iseules. Exact: an identity on complex numbers; the physics is in "fields add". */
    function somme(sources) {
      if (!Array.isArray(sources) || !sources.length) err("sources = [{ A, phi }, …], au moins une");
      let z = Cx.c(0), seules = 0;
      for (const s of sources) { fini(s.A, "A"); fini(s.phi, "φ"); z = Cx.add(z, Cx.polar(s.A, s.phi)); seules += s.A * s.A; }
      const I = Cx.abs2(z);
      return { re: z.re, im: z.im, A: Math.sqrt(I), phi: Cx.arg(z), I, Iseules: seules, interference: I - seules };
    }
    /* (29.16): A_R² = A₁² + A₂² + 2A₁A₂ cos Δφ, Δφ = φ₂ − φ₁; phi is the resultant phase measured from φ₁. Exact identity. */
    function deuxOndes(A1, A2, dphi) {
      fini(A1, "A₁"); fini(A2, "A₂"); fini(dphi, "Δφ");
      const interference = 2 * A1 * A2 * Math.cos(dphi), I = A1 * A1 + A2 * A2 + interference;
      return { I, A: Math.sqrt(Math.max(0, I)), interference, phi: Math.atan2(A2 * Math.sin(dphi), A1 + A2 * Math.cos(dphi)) };
    }
    /* (29.11), (29.12): two equal amplitudes. A is signed: negative when the cosine of half the difference is, the phase then
       being the mean plus π. Exact identity (cos a + cos b = 2 cos ½(a + b) cos ½(a − b), (29.10)). */
    function egales(A, phi1, phi2) {
      fini(A, "A"); fini(phi1, "φ₁"); fini(phi2, "φ₂");
      return { A: 2 * A * Math.cos((phi1 - phi2) / 2), phi: (phi1 + phi2) / 2 };
    }
    /* (29.9) generalised: the real signal Σ Aⱼ cos(ωt + φⱼ) at time t. */
    function signal(sources, omega, t) {
      if (!Array.isArray(sources) || !sources.length) err("sources = [{ A, phi }, …], au moins une");
      fini(omega, "ω"); fini(t, "t");
      return sources.reduce((s, x) => s + fini(x.A, "A") * Math.cos(omega * t + fini(x.phi, "φ")), 0);
    }
    /* (30.2): A_R/A for n equal arrows turning by φ one after the other, sin(nφ/2)/sin(φ/2), signed. At φ = 2πm the ratio
       is 0/0: its limit n cos(nφ/2)/cos(φ/2) = ±n (L'Hôpital), used when |sin(φ/2)| < 1e-7 (relative error < n² × 1e-14). */
    function nOscillateurs(n, phi) {
      entier(n, "n"); fini(phi, "φ");
      const s = Math.sin(phi / 2);
      return Math.abs(s) < 1e-7 ? n * Math.cos(n * phi / 2) / Math.cos(phi / 2) : Math.sin(n * phi / 2) / s;
    }
    /* (30.3): I/I₀ = sin²(nφ/2)/sin²(φ/2), between 0 and n². Same model as (30.2). */
    function intensiteN(n, phi) { const a = nOscillateurs(n, phi); return a * a; }
    /* the chain of Fig. 30-1: n arrows of length A, the j-th at angle jφ, tip to tail from the origin. sommets: n + 1 points;
       rayon A/(2|sin(φ/2)|) of the circle through them (Infinity if φ = 2πm: the arrows are aligned), its centre; resultante
       the last point. Exact geometry. */
    function polygone(n, phi, A) {
      entier(n, "n"); fini(phi, "φ"); A = A === undefined ? 1 : fini(A, "A");
      const sommets = [[0, 0]];
      let x = 0, y = 0;
      for (let j = 0; j < n; j++) { x += A * Math.cos(j * phi); y += A * Math.sin(j * phi); sommets.push([x, y]); }
      const s = Math.sin(phi / 2), rayon = Math.abs(s) < 1e-12 ? Infinity : Math.abs(A / (2 * s));
      /* the centre sees the first arrow under the angle φ: it lies on the perpendicular bisector of [0, A] */
      const centre = rayon === Infinity ? null : [A / 2, A / (2 * Math.tan(phi / 2))];
      return { sommets, rayon, centre, resultante: [x, y], A_R: Math.hypot(x, y) };
    }
    /* n sources on a line, spacing d, the j-th driven with phase jα (α = 0: all in phase), wavelength λ, seen in the
       direction θ from the normal (−π/2 to π/2 on one side; the pattern is symmetric about the line of the sources).
       phi(θ) (30.4); I(θ) by (30.3); Isomme(θ) by the direct sum of the n phasors, to check it; premierZero: the smallest
       |θ| where φ = ±2π/n around the main beam (30.5 when α = 0), null if none; ordres: the beams φ = 2πm, sin θ = (2πm − α)λ/(2πd)
       with |sin θ| ≤ 1 (30.6 when α = 0); faisceau: the order-0 direction, null if it does not exist (|αλ/(2πd)| > 1);
       lobe: the highest side lobe over the main one, exact for this n, and Feynman's estimate 4/(9π²) at φ = 3π/n.
       Same model as the section: far field, equal sources, no coupling between the antennas (their currents are imposed). */
    function reseau(o) {
      if (!o) err("paramètres { n, d, lambda, alpha }");
      const n = entier(o.n, "n"), d = pos(o.d, "d"), lambda = pos(o.lambda, "λ"), alpha = o.alpha === undefined ? 0 : fini(o.alpha, "α");
      const phi = theta => dephasage(alpha, d, lambda, theta);
      const I = theta => intensiteN(n, phi(theta));
      const Isomme = theta => somme(Array.from({ length: n }, (_, j) => ({ A: 1, phi: j * phi(theta) }))).I;
      const versAngle = p => { const s = (p - alpha) * lambda / (TAU * d); return Math.abs(s) <= 1 ? Math.asin(s) : null; };
      const ordres = [];
      const mMin = Math.ceil((alpha - TAU * d / lambda) / TAU - 1e-12), mMax = Math.floor((alpha + TAU * d / lambda) / TAU + 1e-12);
      for (let m = mMin; m <= mMax; m++) { const th = versAngle(TAU * m); if (th !== null) ordres.push({ m: m + 0, theta: th }); }
      const faisceau = versAngle(0);
      let premierZero = null;
      if (n > 1 && faisceau !== null) {
        const z = [versAngle(TAU / n), versAngle(-TAU / n)].filter(x => x !== null).map(x => Math.abs(x - faisceau));
        if (z.length) premierZero = Math.min(...z);
      }
      return { n, d, lambda, alpha, phi, I, Isomme, ordres, faisceau, premierZero, lobe: lobeSecondaire(n) };
    }
    /* highest side lobe of (30.3) over the main one n²: maximum on ]2π/n, 4π/n[ found by golden section (unimodal there).
       Exact for this n (n ≥ 3; n = 2 has no side lobe: null). estimation: Feynman's value at φ = 3π/n with sin x ≈ x, 4/(9π²)
       = 0,045; the true limit n → ∞ is the sinc² side lobe, 0,0472 at nφ/2 = 1,4303π. */
    function lobeSecondaire(n) {
      entier(n, "n");
      if (n < 3) return null;
      let a = TAU / n, b = 2 * TAU / n;
      const g = (Math.sqrt(5) - 1) / 2, f = p => -intensiteN(n, p);
      let c = b - g * (b - a), e = a + g * (b - a);
      for (let k = 0; k < 200 && b - a > 1e-13 * b; k++) {
        if (f(c) < f(e)) { b = e; e = c; c = b - g * (b - a); } else { a = c; c = e; e = a + g * (b - a); }
      }
      const p = (a + b) / 2;
      return { phi: p, rapport: intensiteN(n, p) / (n * n), estimation: intensiteN(n, 3 * Math.PI / n) / (n * n) };
    }
    /* the same array seen at the finite distance R from its centre, in the direction θ: Σ e^(i(jα − k rⱼ)) R/rⱼ with the exact
       distances rⱼ (sources at yⱼ = (j − (n − 1)/2) d), in units of one source at R. Nothing is linearised; still point
       sources of equal strength radiating 1/r fields (wave zone of each: R ≫ λ). I: this sum; Ilointain: (30.3);
       ecart: I/Ilointain − 1 (null where (30.3) vanishes); fresnel: L²/(λR), L = (n − 1)d, small ⇒ far field. */
    function champExact(o) {
      if (!o) err("paramètres { n, d, lambda, alpha, R, theta }");
      const n = entier(o.n, "n"), d = pos(o.d, "d"), lambda = pos(o.lambda, "λ"), R = pos(o.R, "R"), theta = fini(o.theta, "θ");
      const alpha = o.alpha === undefined ? 0 : fini(o.alpha, "α"), k = TAU / lambda;
      const sources = [];
      for (let j = 0; j < n; j++) {
        const y = (j - (n - 1) / 2) * d, r = Math.hypot(R * Math.cos(theta), R * Math.sin(theta) - y);
        sources.push({ A: R / r, phi: j * alpha - k * r });
      }
      const I = somme(sources).I, Il = intensiteN(n, dephasage(alpha, d, lambda, theta)), L = (n - 1) * d;
      return { I, Ilointain: Il, ecart: Il > 1e-9 * n * n ? I / Il - 1 : null, fresnel: L * L / (lambda * R) };
    }
    Object.assign(api, { dephasage, somme, deuxOndes, egales, signal, nOscillateurs, intensiteN, polygone, reseau, lobeSecondaire, champExact });
  }

  /* ---------- étape « Réseau et antennes » (Feynman I.30.2 à 30.4) ---------- */
  {
    /* Shared model: n identical scatterers (rulings, wires, dipoles) on a line, spacing d, lit by a plane wave of wavelength λ
       coming at θin from the normal, observed at infinity (Fraunhofer) at θout. Both angles from the normal, same orientation:
       the undeviated beam has θout = θin. Each scatterer re-radiates with the same strength (single scattering, no multiple
       scattering between rulings); the field from n of them adds with the phase step φ of (30.7). */
    const angle = (x, nom) => (Number.isFinite(x) && Math.abs(x) <= Math.PI / 2 ? x : err(nom + " doit être un angle entre −π/2 et π/2"));
    /* (30.7): phase step between neighbours. Exact for a plane wave in, a direction out, equal path from each ruling to the
       distant observer (far field: (n d)²/(λ D) ≪ 1, D the distance of the observer or the focal length of the lens). */
    function phaseReseau(d, lambda, thIn, thOut) {
      return TAU * pos(d, "d") * (Math.sin(angle(thOut, "θout")) - Math.sin(angle(thIn, "θin"))) / pos(lambda, "λ");
    }
    /* (30.3), from the step « Interférences de sources synchrones »: n² on a principal maximum. */
    const facteurReseau = (phi, n) => api.intensiteN(n, phi);
    /* the directions of strong intensity: sin θout = sin θin + mλ/d for every integer m with |sin θout| ≤ 1. Each solution gives
       two beams, one on each side of the grating plane (transmitted side and reflected side), since only sin θout enters (30.7). */
    function ordres(d, lambda, thIn) {
      pos(d, "d"); pos(lambda, "λ"); angle(thIn, "θin");
      const s0 = Math.sin(thIn), r = lambda / d, out = [];
      const m0 = Math.ceil((-1 - s0) / r - 1e-12) + 0, m1 = Math.floor((1 - s0) / r + 1e-12);
      for (let m = m0; m <= m1; m++) { const s = Math.max(-1, Math.min(1, s0 + m * r)); out.push({ m, sin: s, theta: Math.asin(s) }); }
      return out;
    }
    /* angle from a principal maximum to its first zero: the phase moves by 2π/n, so Δθout = λ/(n d cos θout). First order in
       1/n (n ≥ 10: error < 1 % away from grazing); diverges at grazing exit, where the expansion fails. */
    function largeurAngulaire(n, d, lambda, thOut) {
      entier(n, "n"); pos(d, "d"); pos(lambda, "λ"); angle(thOut, "θout");
      return lambda / (n * d * Math.cos(thOut));
    }
    /* the groove factor, q = φ/2π: "fin" grooves much narrower than d → 1 (all orders equal); "fente" a slit of width f·d → sinc²(π f q);
       "echelette" a sawtooth whose phase ramps by 2π λB/λ across one period → sinc²(π (q − λB/λ)), all its light in order 1 at λ = λB.
       Scalar thin-element model: groove depth ≪ d, d ≫ λ; real gratings differ by polarization effects of tens of per cent when d ~ λ. */
    function motif(q, o) {
      fini(q, "q"); o = o || { type: "fin" };
      if (o.type === "fin") return 1;
      if (o.type === "fente") { const f = pos(o.f, "f"); if (f > 1) err("f ≤ 1"); const s = sinc(Math.PI * f * q); return s * s; }
      if (o.type === "echelette") { const x = pos(o.lambdaB, "λB") / pos(o.lambda, "λ"), s = sinc(Math.PI * (q - x)); return s * s; }
      return err("motif inconnu : " + o.type);
    }
    /* intensity at θout relative to a principal maximum of fine grooves: facteurReseau/n² × groove factor. */
    function intensiteReseau(thOut, o) {
      const phi = phaseReseau(o.d, o.lambda, o.thIn || 0, thOut);
      return facteurReseau(phi, entier(o.n, "n")) / (o.n * o.n) * motif(phi / TAU, Object.assign({ lambda: o.lambda }, o.motif || { type: "fin" }));
    }
    /* fraction of the light of a sawtooth (blazed) grating in order m, sinc²(π (m − λB/λ)): the sum over all m is 1 (Parseval). Same model. */
    function efficacite(m, lambda, lambdaB) {
      if (!Number.isInteger(m)) err("m doit être entier");
      return motif(m, { type: "echelette", lambda, lambdaB });
    }
    /* (30.8): n → ∞ with nφ = Φ fixed, intensity relative to the centre, 4 sin²(Φ/2)/Φ². Exact limit; for finite n the error is of
       order Φ²/(12 n²) relative, well under 1 % for n ≥ 20 inside the central lobe. */
    function limiteContinue(Phi) { fini(Phi, "Φ"); const s = sinc(Phi / 2); return s * s; }

    /* (30.9): resolving power λ/Δλ = m n, Rayleigh's criterion (the maximum of one line on the first zero of the other). Same model,
       plus: the source lines narrower than Δλ, every one of the n rulings lit coherently, the optics free of aberrations. */
    function pouvoirResolution(m, n) {
      if (!Number.isInteger(m) || m === 0) err("m doit être un entier non nul");
      return Math.abs(m) * entier(n, "n");
    }
    /* two lines λ1 < λ2 of equal strength, incoherent (intensities add), seen in order m: profile in θout around the order,
       positions of the two maxima, and creux = I(mid)/max(I at the maxima) (1: no dip, a single bump). At the Rayleigh limit the
       dip tends to 8/π² ≈ 0,81 when n is large. */
    function deuxRaies(o) {
      const n = entier(o.n, "n"), d = pos(o.d, "d"), l1 = pos(o.lambda1, "λ1"), l2 = pos(o.lambda2, "λ2"), m = o.m, thIn = o.thIn || 0;
      if (!Number.isInteger(m) || m === 0) err("m doit être un entier non nul");
      if (!(l2 > l1)) err("λ2 > λ1 attendu");
      const s1 = Math.sin(thIn) + m * l1 / d, s2 = Math.sin(thIn) + m * l2 / d;
      if (Math.abs(s1) >= 1 || Math.abs(s2) >= 1) err("l'ordre " + m + " n'existe pas pour ces longueurs d'onde");
      const t1 = Math.asin(s1), t2 = Math.asin(s2), lm = (l1 + l2) / 2;
      const I = th => intensiteReseau(th, { n, d, lambda: l1, thIn }) + intensiteReseau(th, { n, d, lambda: l2, thIn });
      const w = largeurAngulaire(n, d, lm, (t1 + t2) / 2), span = Math.abs(t2 - t1) / 2 + 3 * w, mid = (t1 + t2) / 2;
      const N = o.N || 401, theta = [], Iv = [];
      for (let k = 0; k < N; k++) { const th = mid - span + 2 * span * k / (N - 1); theta.push(th); Iv.push(I(th)); }
      const pic = Math.max(I(t1), I(t2));
      return { theta, I: Iv, t1, t2, creux: I(mid) / pic, f: I, R: lm / (l2 - l1), Rreseau: pouvoirResolution(m, n) };
    }
    /* Δν = 1/T: T the delay between the extreme paths, n d |sin θout − sin θin|/c = |m| n λ/c at an order. Same model; it says
       ν/Δν = |m| n, the same as (30.9), and holds for any instrument with T its longest delay between interfering paths. */
    function retard(n, d, lambda, thIn, thOut) {
      entier(n, "n"); pos(d, "d"); pos(lambda, "λ");
      const T = n * d * Math.abs(Math.sin(angle(thOut, "θout")) - Math.sin(angle(thIn, "θin"))) / C;
      return { T, dnu: T > 0 ? 1 / T : Infinity, nu: C / lambda };
    }

    /* Antennas: a source at infinity, θ from the axis (the normal of the array). Reception and emission patterns are the same
       (reciprocity). Points are positions [x, y] in the plane of the array, the source direction in the (x, z) plane:
       relative power |Σ exp(i k x sin θ)|²/N², 1 on axis. Scalar, isotropic elements, no coupling between them. */
    function diagramme(points, lambda, theta) {
      if (!Array.isArray(points) || !points.length) err("points [[x, y], …] attendu");
      const k = TAU / pos(lambda, "λ"), s = Math.sin(fini(theta, "θ"));
      let re = 0, im = 0;
      for (const p of points) { const a = k * fini(p[0], "x") * s; re += Math.cos(a); im += Math.sin(a); }
      return (re * re + im * im) / (points.length * points.length);
    }
    /* n dipoles in a line, spacing d, all fed in phase: facteurReseau(k d sin θ, n)/n². */
    function alignement(n, d, lambda, theta) { return facteurReseau(TAU * pos(d, "d") * Math.sin(fini(theta, "θ")) / pos(lambda, "λ"), entier(n, "n")) / (n * n); }
    /* a continuous line (or a uniformly lit rectangle) of length L: sinc²(π L sin θ/λ), first zero at sin θ = λ/L. The limit of
       alignement for d → 0 with n d = L; Fraunhofer zone, R > 2 L²/λ. */
    function ouvertureLineaire(L, lambda, theta) { const s = sinc(Math.PI * pos(L, "L") * Math.sin(fini(theta, "θ")) / pos(lambda, "λ")); return s * s; }
    /* a parabolic reflector y = x²/(4f), focus F = (0, f), aperture D (x from −D/2 to D/2), cut by the (x, y) plane: a curved
       line of N scatterers, uniform in x. A plane wave comes down at θ from the axis; path to F through P = (x, y), up to a
       constant: ℓ = x sin θ − y cos θ + |F − P|. On axis ℓ = f for every P (distance to F = distance to the directrix y = −f):
       exact equality of delays. Off axis, the spread of ℓ gives the received power |Σ exp(i k ℓ)|²/N². Scalar, geometric
       scattering from each point, single reflection, feed at the focus much smaller than λ. */
    function parabole(f, D, lambda, theta, N) {
      pos(f, "f"); pos(D, "D"); pos(lambda, "λ"); fini(theta, "θ"); N = N === undefined ? 401 : entier(N, "N");
      const k = TAU / lambda, s = Math.sin(theta), c = Math.cos(theta), x = [], y = [], l = [];
      let re = 0, im = 0;
      for (let j = 0; j < N; j++) {
        const xj = N === 1 ? 0 : -D / 2 + D * j / (N - 1), yj = xj * xj / (4 * f), lj = xj * s - yj * c + Math.hypot(xj, f - yj);
        x.push(xj); y.push(yj); l.push(lj); re += Math.cos(k * lj); im += Math.sin(k * lj);
      }
      const lmin = Math.min(...l), lmax = Math.max(...l);
      return { x, y, chemin: l, ecart: lmax - lmin, puissance: (re * re + im * im) / (N * N) };
    }
    /* the points of a disc of diameter D on a square grid of step D/g (g ≥ 2): for diagramme, a circular dish seen as a plane
       aperture. Converges to the Airy pattern (OptiqueGeometrique.airy) as g grows; error of order 1/g on the first zero. */
    function pointsDisque(D, g) {
      pos(D, "D"); entier(g, "g"); const h = D / g, pts = [];
      for (let i = 0; i < g; i++) for (let j = 0; j < g; j++) {
        const xx = -D / 2 + (i + 0.5) * h, yy = -D / 2 + (j + 0.5) * h;
        if (xx * xx + yy * yy <= D * D / 4) pts.push([xx, yy]);
      }
      return pts;
    }
    Object.assign(api, { phaseReseau, ordres, largeurAngulaire, motif, intensiteReseau, efficacite, limiteContinue,
      pouvoirResolution, deuxRaies, retard, diagramme, alignement, ouvertureLineaire, parabole, pointsDisque });
  }

  /* ---------- étape « Rayonnement d'un dipôle » (Feynman I.28.1 à 28.4) ----------
     Vectors are arrays [x, y, z] (m, m·s⁻², V·m⁻¹, T). A trajectory is a function t′ → [x, y, z] of a point charge moving
     slower than light (|v| < c at every instant); nothing else is assumed about it. */
  {
    const K = 1 / (4 * Math.PI * EPS0);
    const trajectoire = traj => (typeof traj === "function" ? traj : err("traj doit être une fonction t′ → [x, y, z]"));
    /* the instant t′ at which the charge sent what reaches P at t: t − t′ = |P − r(t′)|/c. g(t′) = t − t′ − |P − r(t′)|/c
       decreases strictly when |v| < c, so the root is unique; bracketed by doubling, then bisection to the last bit.
       Exact up to rounding; a trajectory that reaches c makes the bracket fail (error). */
    function retarde(traj, P, t) {
      trajectoire(traj); vec(P, "P"); fini(t, "t");
      const g = tp => t - tp - norm(sub(P, vec(traj(tp), "traj(t′)"))) / C;
      let hi = t, step = Math.max(norm(sub(P, traj(t))) / C, 1e-30), lo = t - step;
      for (let k = 0; g(lo) < 0; k++) { if (k > 200) err("instant retardé introuvable : la charge va-t-elle plus vite que la lumière ?"); step *= 2; lo = t - step; }
      for (let k = 0; k < 300; k++) { const mid = (lo + hi) / 2; if (mid === lo || mid === hi) break; if (g(mid) > 0) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    }
    /* (28.3), (28.4): the field at P, at time t, of a point charge q on the trajectory traj, with each of the three terms of
       (28.3) apart. e is the unit vector from P towards the retarded position, r′ the retarded distance; the time derivatives
       are taken with respect to t, the time at P, by centred differences of step h (s): error of order (ωh)² for a motion of
       angular frequency ω, rounding of order 1e-16/(ωh)² against the size of each term. Model: classical point charge, vacuum,
       |v| < c; (28.3) is then exact (it is the field of Liénard and Wiechert, written by Heaviside and by Feynman). P must not
       sit on the trajectory. Returns { E, B, coulomb, correction, rayonnement, tr, r, e }. */
    function champCharge(q, traj, P, t, h) {
      fini(q, "q"); trajectoire(traj); vec(P, "P"); fini(t, "t"); pos(h, "h");
      const vue = s => { const tr = retarde(traj, P, s), d = sub(traj(tr), P), r = norm(d); if (!(r > 0)) err("P est sur la trajectoire"); return { tr, r, e: mul(d, 1 / r) }; };
      const m = vue(t), a = vue(t - h), b = vue(t + h);
      const u = x => mul(x.e, 1 / (x.r * x.r));                       // e/r′²
      const coulomb = mul(u(m), -K * q);
      const correction = mul(sub(u(b), u(a)), -K * q * m.r / (C * 2 * h));
      const rayonnement = mul(add(sub(b.e, mul(m.e, 2)), a.e), -K * q / (C * C * h * h));
      const E = add(add(coulomb, correction), rayonnement);
      return { E, B: mul(cross(m.e, E), -1 / C), coulomb, correction, rayonnement, tr: m.tr, r: m.r, e: m.e };
    }
    /* amplitudes of the three terms of (28.3) for a charge q oscillating with amplitude d = p0/q along the axis, next to an
       opposite charge at rest (the pair is neutral, the static Coulomb field cancels): at distance r and angle θ from the
       axis, |coulomb| = K p0 √(1 + 3cos²θ)/r³ (the dipole field, retarded), |correction| = kr times that, |rayonnement| =
       K p0 k² sin θ/r, the E0 of dipoleRayonnant. Model: d ≪ r and d ≪ λ (first order in d), v ≪ c; the three are equal in size
       at kr = 1, r = λ/2π. */
    function termesDipole(p0, f, r, theta) {
      fini(p0, "p0"); pos(f, "f"); pos(r, "r"); fini(theta, "θ");
      const k = TAU * f / C, kr = k * r, c0 = Math.cos(theta), A = K * Math.abs(p0);
      const coulomb = A * Math.sqrt(1 + 3 * c0 * c0) / r ** 3;
      return { coulomb, correction: coulomb * kr, rayonnement: api.dipoleRayonnant(p0, TAU * f).E0(r, theta), kr, lambda: C / f };
    }
    /* the painter's rule: an observer very far away in the direction n (unit vector from the charge towards him). The time
       t is the time at the observer minus the constant transit time D/c; t′ solves t = t′ − n·r(t′)/c (unique when |v| < c).
       apparent: r⊥(t′), the position of the charge projected on the plane perpendicular to n, as the observer sees it at t.
       Exact in the limit D → ∞ (terms of relative order size/D dropped). */
    function apparent(traj, n, t) {
      trajectoire(traj); n = unit(n, "n"); fini(t, "t");
      const g = tp => tp - dot(n, vec(traj(tp), "traj(t′)")) / C - t;
      let lo = t, hi = t, step = Math.max(Math.abs(dot(n, traj(t))) / C, 1e-30);
      for (let k = 0; g(lo) > 0; k++) { if (k > 200) err("instant retardé introuvable"); lo = t - step; step *= 2; }
      step = Math.max(Math.abs(dot(n, traj(t))) / C, 1e-30);
      for (let k = 0; g(hi) < 0; k++) { if (k > 200) err("instant retardé introuvable"); hi = t + step; step *= 2; }
      for (let k = 0; k < 300; k++) { const mid = (lo + hi) / 2; if (mid === lo || mid === hi) break; if (g(mid) < 0) lo = mid; else hi = mid; }
      const tr = (lo + hi) / 2;
      return { tr, s: perp(traj(tr), n) };
    }
    /* (28.5) far away: r E = −K q/c² d²r⊥/dt², the acceleration of the apparent position (the 1/r part of d²e/dt², e ≈ −n +
       r⊥/r). Vector in V (field times distance). Second derivative by centred differences of step h (s). Exact as r → ∞ at
       any speed below c: relativity included. Returns { rE, tr, s }. */
    function champLointain(q, traj, n, t, h) {
      fini(q, "q"); pos(h, "h");
      const m = apparent(traj, n, t), a = apparent(traj, n, t - h), b = apparent(traj, n, t + h);
      const acc = mul(add(sub(b.s, mul(m.s, 2)), a.s), 1 / (h * h));
      return { rE: mul(acc, -K * q / (C * C)), tr: m.tr, s: m.s };
    }
    /* (28.6) in vector form: r E = −K q a⊥/c², a⊥ the part of the acceleration (taken at t − r/c) perpendicular to the line
       of sight n. Model: displacement ≪ r and v ≪ c, so that the delay stays r/c; error of order v/c (see champLointain). */
    function champ286(q, a, n) {
      fini(q, "q"); n = unit(n, "n");
      return mul(perp(vec(a, "a"), n), -K * fini(q, "q") / (C * C));
    }
    /* what a short straight detector of direction u (unit) picks up from a field E: |E·u|, as a fraction of |E| when it is
       aligned. Model: detector short against λ, field uniform over it. */
    function signalDetecteur(E, u) {
      vec(E, "E"); u = unit(u, "u");
      return Math.abs(dot(E, u));
    }
    /* far fields of short dipole antennas on one generator, as phasors: sources [{ pos, axe, phase, p }] (p relative strength,
       default 1; axe the direction of the oscillation; phase in rad, the advance of that antenna). At P, each gives
       p u⊥ e^(i(phase − k rⱼ))/rⱼ, u⊥ the axis projected perpendicular to the line of sight, (28.6) with a = −ω² x: in units
       of K q d k², with q d the dipole moment of a source of strength 1. Returns { re, im } (vectors), max (largest |E| over a
       period), axe (unit vector of that direction), mineur (smallest over the largest: 0 = linear polarisation),
       delta (r₂ − r₁ for two sources). Model: each source in its wave zone (k rⱼ ≫ 1), antennas ≪ λ, no coupling, no walls. */
    function sommeDipoles(sources, P, lambda) {
      if (!Array.isArray(sources) || !sources.length) err("sources = [{ pos, axe, phase, p }], au moins une");
      vec(P, "P"); const k = TAU / pos(lambda, "λ");
      let re = [0, 0, 0], im = [0, 0, 0];
      const r = sources.map(s => {
        const d = sub(P, vec(s.pos, "pos")), rj = norm(d);
        if (!(rj > 0)) err("P est sur une source");
        const n = mul(d, 1 / rj), u = perp(unit(s.axe, "axe"), n), p = s.p === undefined ? 1 : fini(s.p, "p");
        const ph = (s.phase === undefined ? 0 : fini(s.phase, "phase")) - k * rj;
        re = add(re, mul(u, p * Math.cos(ph) / rj)); im = add(im, mul(u, p * Math.sin(ph) / rj));
        return rj;
      });
      /* E(t) = re cos ωt − im sin ωt: |E|² = (A + B)/2 + (A − B)/2 cos 2ωt − C sin 2ωt */
      const A = dot(re, re), B = dot(im, im), Cc = dot(re, im), mid = (A + B) / 2, R = Math.hypot((A - B) / 2, Cc);
      const w = Math.atan2(-Cc, (A - B) / 2) / 2, top = sub(mul(re, Math.cos(w)), mul(im, Math.sin(w)));
      const max = Math.sqrt(mid + R), min = Math.sqrt(Math.max(0, mid - R));
      return { re, im, max, axe: max > 0 ? mul(top, 1 / norm(top)) : null, mineur: max > 0 ? min / max : 0, delta: r.length > 1 ? r[1] - r[0] : 0, r };
    }
    Object.assign(api, { K, retarde, champCharge, termesDipole, apparent, champLointain, champ286, signalDetecteur, sommeDipoles });
  }

  /* ---------- étape « Films colorés et diffraction » (Feynman I.30.5 à 30.7) ---------- */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;

    /* Fresnel amplitude coefficients at one face, i → j, cosines ci, cj of the angles in each medium. s: E perpendicular to
       the plane of incidence; p: E in it. Conventions such that t_ij t_ji = 1 − r_ij² (Stokes). Exact for a flat face between
       two transparent, isotropic, non-magnetic media; the film below uses them face by face. */
    function fresnelFace(ni, nj, ci, cj, pol) {
      const d = pol === "p" ? nj * ci + ni * cj : ni * ci + nj * cj;
      return pol === "p" ? (nj * ci - ni * cj) / d : (ni * ci - nj * cj) / d;
    }
    /* film({n, e, lambda, theta, n0, n2, pol}): a film of index n and thickness e (m) between a medium n0 (the light's side,
       default 1) and a medium n2 behind it (default n0), lit at the angle theta (rad, in n0, default 0) by the wavelength
       lambda (vacuum, m). pol "s", "p", or "moyenne" (default: the mean of R over the two, unpolarised light).
       delta = 4π n e cos θ1/λ, phase of one round trip in the film; difference = 2 n e cos θ1, its optical path.
       R: all the reflections summed (Airy), |(r01 + r12 e^{iδ})/(1 + r01 r12 e^{iδ})|². R2: the first two waves only,
       |r01 + (1 − r01²) r12 e^{iδ}|², the picture of two reflected waves; for a soap film (n = 1,333) R2 differs from R by < 0,002, R reaching 0,08.
       Model: flat parallel faces, no absorption, index independent of λ, light coherent over the round trip. Total
       reflection (n0 sin θ ≥ n or n2) is outside the model: error. */
    function film(o) {
      if (!o) err("film : paramètres manquants");
      const n = pos(o.n, "n"), e = fini(o.e, "e"), lambda = pos(o.lambda, "λ");
      if (e < 0) err("e doit être ≥ 0");
      const n0 = o.n0 === undefined ? 1 : pos(o.n0, "n0"), n2 = o.n2 === undefined ? n0 : pos(o.n2, "n2");
      const th = o.theta === undefined ? 0 : fini(o.theta, "θ"), s0 = n0 * Math.sin(th);
      if (Math.abs(th) >= Math.PI / 2) err("θ doit être dans ]−π/2, π/2[");
      if (Math.abs(s0) >= n || Math.abs(s0) >= n2) err("réflexion totale : hors du modèle");
      const c0 = Math.cos(th), c1 = Math.sqrt(1 - (s0 / n) ** 2), c2 = Math.sqrt(1 - (s0 / n2) ** 2);
      const delta = 4 * Math.PI * n * e * c1 / lambda, ph = Cx.polar(1, delta);
      const pols = o.pol === "s" || o.pol === "p" ? [o.pol] : o.pol === undefined || o.pol === "moyenne" ? ["s", "p"] : err("pol : « s », « p » ou « moyenne »");
      let R = 0, R2 = 0;
      for (const p of pols) {
        const r01 = fresnelFace(n0, n, c0, c1, p), r12 = fresnelFace(n, n2, c1, c2, p);
        R += Cx.abs2(Cx.div(Cx.add(Cx.c(r01), Cx.scale(ph, r12)), Cx.add(Cx.c(1), Cx.scale(ph, r01 * r12)))) / pols.length;
        R2 += Cx.abs2(Cx.add(Cx.c(r01), Cx.scale(ph, (1 - r01 * r01) * r12))) / pols.length;
      }
      return { R, R2, delta, difference: 2 * n * e * c1, theta1: Math.acos(c1), r01: fresnelFace(n0, n, c0, c1, "s"), r12: fresnelFace(n, n2, c1, c2, "s") };
    }
    /* spectreFilm(o, lambdas): R for each wavelength of the list, the rest of o unchanged. */
    function spectreFilm(o, lambdas) {
      if (!Array.isArray(lambdas)) err("lambdas : tableau attendu");
      return lambdas.map(l => film(Object.assign({}, o, { lambda: l })).R);
    }
    /* bragg(d, lambda, ordre): the glancing angle θ (rad, from the planes) of the order-th reflection on planes d apart,
       2 d sin θ = ordre λ. null if ordre λ > 2d: no such reflection. Model: an infinite, perfect crystal (the width of the
       peak, ≈ λ/(N d) for N planes, is not given), index 1 for X-rays (true to 10⁻⁵), kinematic (single) scattering. */
    function bragg(d, lambda, ordre) {
      pos(d, "d"); pos(lambda, "λ");
      const p = ordre === undefined ? 1 : ordre;
      if (!Number.isInteger(p) || p < 1) err("ordre : entier ≥ 1");
      const s = p * lambda / (2 * d);
      return s > 1 ? null : Math.asin(s);
    }
    /* ordresBragg(d, lambda): every order that exists, [{ordre, theta}]; empty if λ > 2d (visible light on atoms). */
    function ordresBragg(d, lambda) {
      const out = [];
      for (let p = 1; p * pos(lambda, "λ") <= 2 * pos(d, "d"); p++) out.push({ ordre: p, theta: bragg(d, lambda, p) });
      return out;
    }

    /* fresnelCS(u): Fresnel integrals C(u) = ∫₀ᵘ cos(πt²/2) dt, S(u) = ∫₀ᵘ sin(πt²/2) dt. Power series for |u| ≤ 2,5;
       from 2,5 to 4, the series at 2,5 plus a five-point Gauss–Legendre quadrature on steps of 0,02; beyond 4, the asymptotic
       auxiliary functions f, g (Abramowitz et Stegun 7.3.9, 7.3.10, 7.3.27, 7.3.28). Absolute error < 10⁻¹¹.
       Odd in u; C, S → ½ as u → ∞. */
    const GL5 = [[0, 128 / 225], [Math.sqrt(5 - 2 * Math.sqrt(10 / 7)) / 3, (322 + 13 * Math.sqrt(70)) / 900],
      [Math.sqrt(5 + 2 * Math.sqrt(10 / 7)) / 3, (322 - 13 * Math.sqrt(70)) / 900]];
    function serieFresnel(a) {
      const x = Math.PI * a * a / 2;
      let term = a, C = 0, S = 0;                          // term = a x^k / k!, alternately into C (even k) and S (odd k)
      for (let k = 0; k < 80; k++) {
        const part = term / (2 * k + 1);
        if (k % 4 === 0) C += part; else if (k % 4 === 1) S += part; else if (k % 4 === 2) C -= part; else S -= part;
        term *= x / (k + 1);
        if (k > 4 && Math.abs(term) < 1e-18) break;
      }
      return { C, S };
    }
    function fresnelCS(u) {
      fini(u, "u");
      const a = Math.abs(u), sg = u < 0 ? -1 : 1;
      let C, S;
      if (a <= 2.5) ({ C, S } = serieFresnel(a));
      else if (a < 4) {
        ({ C, S } = serieFresnel(2.5));
        const n = Math.ceil((a - 2.5) / 0.02), h = (a - 2.5) / n;
        for (let i = 0; i < n; i++) {
          const m = 2.5 + (i + 0.5) * h;
          for (const [xi, wi] of GL5) for (const sx of xi === 0 ? [0] : [-xi, xi]) {
            const t = m + sx * h / 2, ph = Math.PI * t * t / 2;
            C += wi * h / 2 * Math.cos(ph); S += wi * h / 2 * Math.sin(ph);
          }
        }
      } else {
        const y = Math.PI * a * a, y2 = y * y;
        let f = 1, g = 1 / y, tf = 1, tg = 1 / y, best = Infinity;
        for (let m = 1; m < 30; m++) {
          const nf = -tf * (4 * m - 3) * (4 * m - 1) / y2, ng = -tg * (4 * m - 1) * (4 * m + 1) / y2;
          if (Math.abs(nf) > best) break;                  // asymptotic series: stop at the smallest term
          best = Math.abs(nf); tf = nf; tg = ng; f += tf; g += tg;
        }
        f /= Math.PI * a; g /= Math.PI * a;
        const ph = y / 2, sn = Math.sin(ph), cs = Math.cos(ph);
        C = 0.5 + f * sn - g * cs; S = 0.5 - f * cs - g * sn;
      }
      return { C: sg * C, S: sg * S };
    }
    /* bord(u): intensity behind a straight opaque edge, relative to the unobstructed wave, at the reduced position u
       (u > 0 lit side, u < 0 in the geometric shadow): I/I0 = ½[(C(u) + ½)² + (S(u) + ½)²], the squared length of the
       chord of the Cornu spiral from the point of the edge, (−C(u), −S(u)), to the end (½, ½), over the full chord √2.
       Model: Fresnel (paraxial) diffraction of a plane wave, sources spread over the open half-plane with the phase they would
       have without the screen, scalar wave, distance s ≫ x and ≫ λ. Exact within that model; I(0) = ¼. */
    function bord(u) {
      const { C, S } = fresnelCS(u);
      return { C, S, I: ((C + 0.5) ** 2 + (S + 0.5) ** 2) / 2 };
    }
    /* bordEcran({x, lambda, s}): the edge at distance s (m) from the screen, a point x (m) from the geometric edge of the
       shadow (x > 0: lit). u = x √(2/(λ s)); echelle = √(λ s/2) is the distance where u = 1, the width of the first fringe. */
    function bordEcran(o) {
      if (!o) err("bordEcran : paramètres manquants");
      const x = fini(o.x, "x"), lambda = pos(o.lambda, "λ"), s = pos(o.s, "s"), echelle = Math.sqrt(lambda * s / 2);
      const b = bord(x / echelle);
      return { u: x / echelle, I: b.I, echelle, C: b.C, S: b.S };
    }
    /* sommeSources({x, lambda, s, H, n}): the same intensity by brute force, without the spiral: n sources of equal amplitude
       per unit length on the plane of the edge, from the edge (height −x below the foot D of the point) to H above D,
       phase k(√(s² + h²) − s) with the exact distance; a Gaussian taper over the last third removes the end of the sum.
       I/I0 = |Σ|²/(λ s), the free wave giving √(λ s) e^{iπ/4}. Agrees with bord() while x, H ≪ s (paraxial). */
    function sommeSources(o) {
      const x = fini(o.x, "x"), lambda = pos(o.lambda, "λ"), s = pos(o.s, "s"), H = pos(o.H, "H"), n = o.n || 200000;
      const k = TAU / lambda, a = -x, b = H, dh = (b - a) / n, t0 = a + 2 * (b - a) / 3, w = (b - t0) / 3;
      let re = 0, im = 0;
      for (let i = 0; i < n; i++) {
        const h = a + (i + 0.5) * dh, ph = k * (Math.sqrt(s * s + h * h) - s), amp = h > t0 ? Math.exp(-(((h - t0) / w) ** 2)) : 1;
        re += amp * Math.cos(ph) * dh; im += amp * Math.sin(ph) * dh;
      }
      return { I: (re * re + im * im) / (lambda * s), somme: Cx.c(re, im) };
    }
    /* cornu(u0, u1, n): points [C, S] of the spiral from u0 to u1, n + 1 of them. */
    function cornu(u0, u1, n) {
      fini(u0, "u0"); fini(u1, "u1"); n = n || 400;
      return Array.from({ length: n + 1 }, (_, i) => { const f = fresnelCS(u0 + (u1 - u0) * i / n); return [f.C, f.S]; });
    }

    /* champPlan({eta, q, x0, omega, z}): (30.18), (30.19). A plane of η charges q per m², each moving as x0 cos ωt in the plane;
       the field at the distance z: E(t) = −(η q/(2 ε0 c)) v(t − z/c), v(t) = −ω x0 sin ωt the velocity of the charges.
       E0 = η q ω x0/(2 ε0 c) (V·m⁻¹) its amplitude, K0 = η q ω x0 the amplitude of the surface current (A·m⁻¹), E0 = K0/(2 ε0 c).
       Model: an infinite uniform plane (or tapered smoothly, see sommeAnneaux), v ≪ c, x0 ≪ λ; true at any z, even z < λ. */
    function champPlan(o) {
      if (!o) err("champPlan : paramètres manquants");
      const eta = fini(o.eta, "η"), q = fini(o.q, "q"), x0 = fini(o.x0, "x0"), w = pos(o.omega, "ω"), z = fini(o.z, "z");
      if (z < 0) err("z doit être ≥ 0");
      const K0 = eta * q * w * x0, E0 = K0 / (2 * EPS0 * C), v = t => -w * x0 * Math.sin(w * fini(t, "t"));
      return { K0, E0, v, E: t => -(eta * q / (2 * EPS0 * C)) * v(fini(t, "t") - z / C), retard: z / C };
    }
    /* sommeAnneaux({omega, z, R, w, n}): the integral (30.13) = (30.15) done ring by ring, the density of charges being
       η(ρ)/η0 = 1 for ρ ≤ R and exp(−((ρ − R)/w)²) beyond (w = 0: a sharp circular edge at R). Steps of r of at most λ/40,
       each integrated exactly for its mean density; n caps their number (default 400 000). somme: the integral (m);
       exacte: (30.17), (c/(iω)) e^{−iωz/c}; rayon = c/ω, the radius of the circle of Fig. 30-11; points: the running sum,
       sampled for drawing (about 2000 points). Model: the field of each ring as in (30.12), obliquity left out (ρ ≪ z). */
    function sommeAnneaux(o) {
      if (!o) err("sommeAnneaux : paramètres manquants");
      const w = pos(o.omega, "ω"), z = pos(o.z, "z"), R = fini(o.R, "R"), larg = o.w === undefined ? 0 : fini(o.w, "w");
      if (R < 0 || larg < 0) err("R et w doivent être ≥ 0");
      const k = w / C, lambda = TAU / k, rho = r => Math.sqrt(Math.max(0, r * r - z * z));
      const eta = p => (p <= R ? 1 : larg > 0 ? Math.exp(-(((p - R) / larg) ** 2)) : 0);
      const pMax = R + 6 * larg, rMax = Math.sqrt(pMax * pMax + z * z), nMax = o.n || 400000;
      const steps = Math.min(nMax, Math.max(200, Math.ceil(40 * (rMax - z) / lambda))), dr = (rMax - z) / steps;
      let s = Cx.c(0);
      const every = Math.max(1, Math.floor(steps / 2000)), points = [[0, 0]];
      for (let i = 0; i < steps; i++) {
        const a = z + i * dr, b = a + dr, m = eta(rho((a + b) / 2));
        if (m > 0) s = Cx.add(s, Cx.scale(Cx.div(Cx.sub(Cx.polar(1, -k * a), Cx.polar(1, -k * b)), Cx.c(0, k)), m));
        if ((i + 1) % every === 0 || i === steps - 1) points.push([s.re, s.im]);
      }
      return { somme: s, exacte: Cx.mul(Cx.div(Cx.c(C), Cx.c(0, w)), Cx.polar(1, -k * z)), rayon: C / w, points, pas: dr };
    }
    /* zoneFresnel(nz, lambda, z): radius of the circle on the plane whose distance to P is z + nz λ/2: √((z + nz λ/2)² − z²),
       ≈ √(nz λ z) when nz λ ≪ z. Each zone (half a turn of the circle of Fig. 30-11) adds 2c/ω to the running sum, with
       alternating signs. Exact geometry. */
    function zoneFresnel(nz, lambda, z) {
      fini(nz, "n"); if (nz < 0) err("n doit être ≥ 0");
      pos(lambda, "λ"); pos(z, "z");
      return Math.sqrt((z + nz * lambda / 2) ** 2 - z * z);
    }
    Object.assign(api, { fresnelFace, film, spectreFilm, bragg, ordresBragg, fresnelCS, bord, bordEcran, sommeSources, cornu, champPlan, sommeAnneaux, zoneFresnel });
  }

  /* ---------- étape « Indice de réfraction et dispersion » (Feynman I.31.1 à 31.3) ---------- */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    const ME = Cst.m_e;
    /* (31.5) to (31.8): a plate of thickness dz and index n delays the wave by Δt = (n − 1) dz/c: it multiplies the source wave
       by e^(−iφ), φ = ω(n − 1) dz/c = 2π (n − 1) dz/λ (λ in vacuum). exact: e^(−iφ) (31.6); approx: 1 − iφ (31.7); Ea: the added
       field relative to Es, exact e^(−iφ) − 1, first order −iφ (31.8). ecartModule = |1 − iφ| − 1 = √(1 + φ²) − 1 ≈ φ²/2;
       ecartPhase = |φ| − arctan|φ| ≈ |φ|³/3. Model: plane wave at normal incidence, reflections left out (of order ((n − 1)/2)² in
       intensity), no absorption (n real). n − 1 may be negative. */
    function lameIndice(nMoins1, dz, lambda) {
      fini(nMoins1, "n − 1"); pos(dz, "Δz"); pos(lambda, "λ");
      if (!(nMoins1 > -1)) err("n doit être > 0");
      const phi = TAU * nMoins1 * dz / lambda, a = Math.abs(phi);
      const exact = Cx.polar(1, -phi), approx = Cx.c(1, -phi);
      return { phi, retard: nMoins1 * dz / C, exact, approx, Ea: Cx.sub(exact, Cx.c(1)), EaApprox: Cx.c(0, -phi),
        ecartModule: Math.sqrt(1 + phi * phi) - 1, ecartPhase: a - Math.atan(a), ecart: Cx.abs(Cx.sub(approx, exact)) };
    }
    /* (31.13) to (31.16), with a damping γ as in (31.20): an electron bound elastically (ω0 ≥ 0; 0 for a free electron) driven by
       E0 e^(iωt): x0 = q E0/(m(ω0² − ω² + iγω)). → { x, p = q x, v = iω x } (complex amplitudes), module |x0|, retard: the lag of
       p behind E, in [0, π] (0 below ω0, π above, without damping). o.q (−e by default), o.m (me), o.gamma (0). Model: linear
       restoring force (|x0| ≪ 10⁻¹⁰ m, E0 ≪ the atomic field, about 5 × 10¹¹ V·m⁻¹), magnetic force left out (v ≪ c), steady
       state (the transient has died out), driven by the source field only (n − 1 ≪ 1). */
    function electronElastique(w0, w, E0, o) {
      fini(w0, "ω0"); if (w0 < 0) err("ω0 doit être ≥ 0"); pos(w, "ω"); fini(E0, "E0");
      const { q, m } = particule(o), g = o && o.gamma !== undefined ? fini(o.gamma, "γ") : 0;
      if (g < 0) err("γ doit être ≥ 0");
      const den = Cx.c(w0 * w0 - w * w, g * w);
      if (den.re === 0 && den.im === 0) err("ω = ω0 sans amortissement : amplitude infinie");
      const x = Cx.div(Cx.c(q * E0 / m), den);
      return { x, p: Cx.scale(x, q), v: Cx.mul(Cx.c(0, w), x), module: Cx.abs(x), retard: Cx.arg(den) };
    }
    /* (31.17): the field that the electrons of a plate (η per m²) send forward, over the source field at the plate, the factor
       e^(iω(t − z/c)) taken out of both: Ea/Es = −η q (iω x0)/(2 ε0 c E0), x0 from electronElastique. It is champPlan ((30.18))
       with the velocity of (31.16). Same models: plate uniform over many Fresnel zones, z ≫ λ. */
    function champMilieu(eta, w0, w, o) {
      pos(eta, "η");
      return Cx.scale(electronElastique(w0, w, 1, o).v, -eta * particule(o).q / (2 * EPS0 * C));
    }
    /* (31.19): n = 1 + N q²/(2 ε0 m (ω0² − ω²)), N electrons per m³. Model: n − 1 ≪ 1 (dilute medium: each electron feels the
       source field only), one resonance, no damping: it diverges at ω0. It is indiceDispersion with one undamped resonance. */
    function indiceMilieu(N, w0, w, o) {
      return indiceDispersion([{ N, w0: Math.abs(fini(w0, "ω0")) }], w, o).n1;
    }
    /* (31.20): the complex index n = n′ − i n″ of several kinds of oscillators res = [{ N, w0, gamma }] (Nk electrons per m³,
       ωk, γk ≥ 0): n = 1 + q²/(2 ε0 m) Σ Nk/(ωk² − ω² + iγk ω). → { re, im, n1 = n′, n2 = n″ (≥ 0: the wave is absorbed),
       pente = dn′/dω, pente2 = dn″/dω, regime: "normale" if dn′/dω > 0, "anormale" if < 0 }. Model: as (31.19), oscillators
       independent, γ constant; o.q, o.m as electronElastique. */
    function indiceDispersion(res, w, o) {
      if (!Array.isArray(res) || !res.length) err("résonances : liste [{ N, w0, gamma }] non vide");
      pos(w, "ω");
      const { q, m } = particule(o), K = q * q / (2 * EPS0 * m);
      let s = Cx.c(0), d = Cx.c(0);
      for (const r of res) {
        const N = pos(r.N, "N"), w0 = fini(r.w0, "ω0"), g = r.gamma === undefined ? 0 : fini(r.gamma, "γ");
        if (w0 < 0 || g < 0) err("ω0 et γ doivent être ≥ 0");
        const D = Cx.c(w0 * w0 - w * w, g * w);
        if (D.re === 0 && D.im === 0) err("ω = ω0 sans amortissement : indice infini");
        s = Cx.add(s, Cx.div(Cx.c(N), D));
        d = Cx.add(d, Cx.div(Cx.mul(Cx.c(-N), Cx.c(-2 * w, g)), Cx.mul(D, D)));     // d(N/D)/dω = −N D′/D², D′ = −2ω + iγ
      }
      const n = Cx.add(Cx.c(1), Cx.scale(s, K)), dn = Cx.scale(d, K);
      return { re: n.re, im: n.im, n1: n.re, n2: -n.im, pente: dn.re, pente2: -dn.im,
        regime: dn.re > 0 ? "normale" : dn.re < 0 ? "anormale" : "nulle" };
    }
    /* plasma pulsation of N free electrons per m³, ωp = √(N e²/(ε0 me)). Exact definition. */
    function plasmaPulsation(N) { return Math.sqrt(pos(N, "N") * Cst.e * Cst.e / (EPS0 * ME)); }
    /* (31.19a): free electrons (ω0 = 0): n = 1 − ωp²/(2ω²), first order in ωp²/ω². exact: the cold-plasma index √(1 − ωp²/ω²),
       null below ωp (no wave goes through); groupe: the group index, 1 + ωp²/(2ω²) to first order, 1/√(1 − ωp²/ω²) exactly;
       vPhase = c/n > c, vGroupe = c √(1 − ωp²/ω²) < c (vPhase × vGroupe = c², exact cold plasma). Model: electrons at rest on
       average, no collisions, no magnetic field (the Earth's splits the index by a fraction of order ωc/ω, ωc = eB/me). */
    function plasmaIndice(N, w) {
      const wp = plasmaPulsation(N), x = wp * wp / (pos(w, "ω") ** 2), ex = x < 1 ? Math.sqrt(1 - x) : null;
      return { wp, x, premierOrdre: 1 - x / 2, exact: ex, groupe: 1 + x / 2, groupeExact: ex ? 1 / ex : null,
        vPhase: ex ? C / ex : null, vGroupe: ex ? C * ex : null };
    }
    /* first-order group delay of a signal at frequency f through a column of tec free electrons per m² (from (31.19a)):
       Δt = K tec/(c f²), K = e²/(8π² ε0 me) ≈ 40,3 m³·s⁻². → { K, retard (s), distance = c Δt (m) }. Model: f ≫ fp; the terms in
       1/f³ (Earth's field) and 1/f⁴ are left out, a few centimetres at most for GPS frequencies. */
    function ionoRetard(tec, f) {
      fini(tec, "TEC"); if (tec < 0) err("TEC doit être ≥ 0"); pos(f, "f");
      const K = Cst.e * Cst.e / (8 * Math.PI * Math.PI * EPS0 * ME), distance = K * tec / (f * f);
      return { K, retard: distance / C, distance };
    }
    /* two pseudoranges P1, P2 (m) of the same path at f1 and f2: the combination (f1² P1 − f2² P2)/(f1² − f2²) removes the
       1/f² term; tec = (P2 − P1)/(K (1/f2² − 1/f1²)). Same model as ionoRetard. */
    function ionoCombinaison(P1, P2, f1, f2) {
      fini(P1, "P1"); fini(P2, "P2"); pos(f1, "f1"); pos(f2, "f2");
      if (f1 === f2) err("f1 et f2 doivent différer");
      const K = ionoRetard(0, 1).K;
      return { distance: (f1 * f1 * P1 - f2 * f2 * P2) / (f1 * f1 - f2 * f2), tec: (P2 - P1) / (K * (1 / (f2 * f2) - 1 / (f1 * f1))) };
    }
    /* SCHOTT N-BK7: n² − 1 = Σ Bk λ²/(λ² − Ck), λ in µm, Ck in µm²; SCHOTT gives it from the near UV to 2,3 µm. */
    const SELLMEIER_BK7 = Object.freeze({ B: Object.freeze([1.03961212, 0.231792344, 1.01046945]), C: Object.freeze([0.00600069867, 0.0200179144, 103.560653]) });
    /* sellmeier(coef, λ) (λ in m): { n from the n² form, n2 = n², dilue = 1 + (n² − 1)/2, the same oscillators written as (31.20)
       without damping (first order in n − 1), ecart = dilue − n ≈ (n − 1)²/2 }. A fit: valid only over the fitted range. */
    function sellmeier(coef, lambda) {
      pos(lambda, "λ");
      const l2 = (lambda * 1e6) ** 2;
      const X = coef.B.reduce((s, B, k) => s + B * l2 / (l2 - coef.C[k]), 0);
      if (!(1 + X > 0)) err("λ hors du domaine de la formule");
      const n = Math.sqrt(1 + X);
      return { n, n2: 1 + X, dilue: 1 + X / 2, ecart: X / 2 - (n - 1) };
    }
    /* each Sellmeier term as an undamped oscillator: λk = √Ck (m), ωk = 2πc/λk, Nk = Bk ε0 me ωk²/e² (electrons of mass me per
       m³ that would give it). Exact rewriting: Bk λ²/(λ² − λk²) = Nk e²/(ε0 me (ωk² − ω²)). */
    function oscillateursSellmeier(coef) {
      return coef.B.map((B, k) => { const lambda = Math.sqrt(coef.C[k]) * 1e-6, w0 = TAU * C / lambda;
        return { lambda, w0, N: B * EPS0 * ME * w0 * w0 / (Cst.e * Cst.e), B }; });
    }
    Object.assign(api, { lameIndice, electronElastique, champMilieu, indiceMilieu, indiceDispersion, plasmaPulsation, plasmaIndice,
      ionoRetard, ionoCombinaison, SELLMEIER_BK7, sellmeier, oscillateursSellmeier });
  }

  /* ---------- étape « Absorption et écrans » (Feynman I.31.4 à 31.6) ---------- */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    const QE = Cst.e, ME = Cst.m_e;
    const raie = (r, i) => {
      if (!r || typeof r !== "object") err("raie " + i + " : objet { N, w0, gamma } attendu");
      const N = fini(r.N, "N"), w0 = pos(r.w0, "ω0"), gamma = fini(r.gamma, "γ");
      if (N < 0 || gamma < 0) err("N et γ doivent être ≥ 0");
      return { N, w0, gamma, q: r.q === undefined ? QE : fini(r.q, "q"), m: r.m === undefined ? ME : pos(r.m, "m") };
    };
    const raies = rs => (Array.isArray(rs) && rs.length ? rs.map(raie) : err("raies : liste non vide de { N, w0, gamma } attendue"));

    /* indiceComplexe(omega, raies): (31.20), written as (31.21). raies: [{ N (m⁻³), w0 (rad·s⁻¹), gamma (s⁻¹), q, m }], q and m
       default to the electron's. n = 1 + Σ (q²/(2 ε0 m)) N/(ω0² − ω² + iγω) = n′ − i n″ (convention e^{iωt}): n″ ≥ 0 when γ ≥ 0.
       Returns { n (Cx), np = n′, nsec = n″ }. Model: classical bound electrons with a friction γ, driven by the incident
       field alone: a dilute medium, |n − 1| ≪ 1 (in a dense one the neighbours' field adds a relative error of order |n − 1|);
       linear response (the light's field ≪ the binding fields, about 10¹¹ V·m⁻¹ in an atom). The sum is indiceDispersion's
       (step « Indice de réfraction et dispersion »), line by line so that each may carry its own q and m. */
    function indiceComplexe(omega, rs) {
      const w = pos(omega, "ω");
      let s = Cx.c(0);
      for (const r of raies(rs)) if (r.N > 0) { const d = api.indiceDispersion([r], w, { q: r.q, m: r.m }); s = Cx.add(s, Cx.c(d.re - 1, d.im)); }
      return { n: Cx.c(1 + s.re, s.im), np: 1 + s.re, nsec: -s.im };
    }

    /* traversee(omega, raies, dz): (31.22) and (31.22a), a plate of thickness dz (m) at normal incidence. A = e^{−ω n″ dz/c},
       the factor on the amplitude; retard = ω (n′ − 1) dz/c, the phase delay (rad); T = A² = e^{−α dz}, the intensity
       transmitted; alpha = 2 ω n″/c (m⁻¹); longueur = 1/α, the length over which the intensity falls by e.
       Model: (31.20) inside, no reflection at the faces (a fraction ((n − 1)/(n + 1))² of the intensity at each), uniform plate. */
    function traversee(omega, rs, dz) {
      const w = pos(omega, "ω"), d = fini(dz, "Δz");
      if (d < 0) err("Δz doit être ≥ 0");
      const { np, nsec } = indiceComplexe(w, rs), alpha = 2 * w * nsec / C;
      return { np, nsec, A: Math.exp(-w * nsec * d / C), retard: w * (np - 1) * d / C, T: Math.exp(-alpha * d), alpha,
        longueur: alpha > 0 ? 1 / alpha : Infinity };
    }

    /* profondeurCentre(r, colonne): optical depth at the centre of one line, τ0 = α dz at ω = ω0 = q² N dz/(ε0 m c γ), exact
       for (31.20) with this line alone (ω = ω0 makes the denominator iγω0). colonne = N dz, atoms per m² of the plate.
       Near the line (|ω − ω0| ≪ ω0, γ ≪ ω0) τ(ω) ≈ τ0/(1 + 4x²), x = (ω − ω0)/γ: a Lorentz profile of full width γ. */
    function profondeurCentre(r, colonne) {
      const l = raie(r, 0), col = fini(colonne, "N Δz");
      if (col < 0) err("N Δz doit être ≥ 0");
      if (!(l.gamma > 0)) err("γ doit être > 0");
      return l.q * l.q * col / (EPS0 * l.m * C * l.gamma);
    }

    /* largeurEquivalente(r, colonne, X): W = ∫ (1 − T(ω)) dω (rad·s⁻¹), the width of a fully black line that removes the same
       light. T from (31.20) and (31.22a) with the line alone, its N being colonne/dz for any dz (only N dz counts). Integrated
       over ω0 ± Xγ (X default 4000) by Simpson in u = asinh(x), then the Lorentz wings beyond, τ0/(2X) γ, added.
       Returns { W, tau0, mince = (π/2) τ0 γ, epais = γ √(π τ0) }: W → mince when τ0 ≪ 1 (W ∝ number of atoms), W → epais when
       τ0 ≫ 1 (the centre is black, only the wings grow). Requires γ ≪ ω0 (error otherwise). */
    function largeurEquivalente(r, colonne, X) {
      const l = raie(r, 0), tau0 = profondeurCentre(r, colonne), Xm = X === undefined ? 4000 : pos(X, "X");
      if (!(l.gamma < 1e-3 * l.w0)) err("γ ≪ ω0 attendu (γ < 10⁻³ ω0)");
      if (Xm * l.gamma > 0.5 * l.w0) err("X γ doit rester < ω0/2");
      const dz = 1, line = [{ N: colonne / dz, w0: l.w0, gamma: l.gamma, q: l.q, m: l.m }];
      const f = x => 1 - traversee(l.w0 + x * l.gamma, line, dz).T;
      const U = Math.asinh(Xm), W = (simpson(u => f(Math.sinh(u)) * Math.cosh(u), -U, U, 8000) + tau0 / (2 * Xm)) * l.gamma;
      return { W, tau0, mince: Math.PI / 2 * tau0 * l.gamma, epais: l.gamma * Math.sqrt(Math.PI * tau0) };
    }

    /* champIntensite(S): amplitude E0 (V·m⁻¹) of a sinusoidal plane wave of mean intensity S (W·m⁻²): (31.28a) inverted,
       √(2S/(ε0 c)); efficace = E0/√2 = √(S/(ε0 c)). Same model as intensiteMoyenne: plane wave in vacuum (or air, n − 1 ≈ 3 × 10⁻⁴). */
    function champIntensite(S) {
      const s = fini(S, "S"); if (s < 0) err("S doit être ≥ 0");
      const E0 = Math.sqrt(2 * s / (EPS0 * C));
      return { E0, efficace: E0 / Math.SQRT2 };
    }

    /* feuille(o): { eta (m⁻²), w0, gamma, omega, E0, q, m, alpha }: a sheet of η oscillators per m² (η = N Δz), lit at normal
       incidence by Es = E0 cos ωt. The sheet's own field on both sides is Ea = −(η q/(2 ε0 c)) v (31.26), at any distance from
       an infinite sheet. alpha: the trial constant of (31.24), in units of ε0 c (default 1). Averages per m² (W·m⁻²):
       ordre1: Feynman's balance, oscillators driven by Es alone. croise = 2α⟨Es Ea⟩, travail = η q ⟨Es v⟩, bilan = croise +
       travail, zero by (31.25) only when alpha = 1; carre = α⟨Ea²⟩, the term (31.24) drops; epsilon = |Ea|/|Es|, the small
       parameter (= |n − 1| ω Δz/c, the phase delay of the sheet).
       exacte: driven by Es + Ea, which adds the damping Γ = η q²/(2 ε0 m c). entree, transmise ε0c⟨(Es + Ea)²⟩, reflechie
       ε0c⟨Ea²⟩, absorbee η m γ ⟨v²⟩ (the friction's work, turned into heat); entree = transmise + reflechie + absorbee exactly.
       Model: infinite uniform sheet thinner than λ, linear oscillators, v ≪ c. */
    function feuille(o) {
      if (!o) err("feuille : paramètres manquants");
      const l = raie({ N: o.eta, w0: o.w0, gamma: o.gamma, q: o.q, m: o.m }, 0), eta = l.N, w = pos(o.omega, "ω"), E0 = pos(o.E0, "E0");
      const a = o.alpha === undefined ? 1 : pos(o.alpha, "α"), A = a * EPS0 * C, k = eta * l.q / (2 * EPS0 * C);
      const reponse = G => api.electronElastique(l.w0, w, E0, { q: l.q, m: l.m, gamma: l.gamma + G }).v;   // v̂, total damping γ + G
      const moy = (p, q2) => Cx.mul(p, Cx.conj(q2)).re / 2; // ⟨Re(p e^{iωt}) Re(q e^{iωt})⟩
      const Es = Cx.c(E0), v1 = reponse(0), Ea1 = Cx.scale(v1, -k);
      const croise = 2 * A * moy(Es, Ea1), travail = eta * l.q * moy(Es, v1), carre = A * moy(Ea1, Ea1);
      const Gam = eta * l.q * l.q / (2 * EPS0 * l.m * C), v = reponse(Gam), Ea = Cx.scale(v, -k), Et = Cx.add(Es, Ea);
      const I = z => EPS0 * C * moy(z, z);
      return {
        ordre1: { croise, travail, bilan: croise + travail, carre, epsilon: Cx.abs(Ea1) / E0, Ea: Ea1, v: v1 },
        exacte: { entree: I(Es), transmise: I(Et), reflechie: I(Ea), absorbee: eta * l.m * l.gamma * moy(v, v), Gamma: Gam, Ea, v,
          travailEs: eta * l.q * moy(Es, v) }
      };
    }

    /* besselJ0(x): Abramowitz & Stegun 9.4.1 (|x| ≤ 3, error < 5 × 10⁻⁸) and 9.4.3 (|x| > 3, error < 1,6 × 10⁻⁸ on the
       amplitude, 7 × 10⁻⁸ on the phase). Even function. */
    function besselJ0(x) {
      const ax = Math.abs(fini(x, "x"));
      if (ax <= 3) {
        const y = (ax / 3) ** 2;
        return 1 + y * (-2.2499997 + y * (1.2656208 + y * (-0.3163866 + y * (0.0444479 + y * (-0.0039444 + y * 0.0002100)))));
      }
      const y = 3 / ax;
      const f0 = 0.79788456 + y * (-0.00000077 + y * (-0.00552740 + y * (-0.00009512 + y * (0.00137237 + y * (-0.00072805 + y * 0.00014476)))));
      const t0 = ax - 0.78539816 + y * (-0.04166397 + y * (-0.00003954 + y * (0.00262573 + y * (-0.00054125 + y * (-0.00029333 + y * 0.00013558)))));
      return f0 * Math.cos(t0) / Math.sqrt(ax);
    }

    /* the paraxial field at (ρ, z) of sources spread over the annulus r0 ≤ ρ′ ≤ r1 of the plane z = 0, in units of the free
       wave: (ik/z) e^{−ikρ²/(2z)} ∫ g(ρ′) e^{−ikρ′²/(2z)} J0(kρ′ρ/z) ρ′ dρ′, g a weight (1, or a taper). Simpson, steps chosen
       for at least pas points per radian of phase (default 24; 8 keeps the error near 10⁻⁴, enough to draw). The overall phase
       e^{−ikz} is dropped. */
    const anneau = (k, z, rho, r0, r1, g, pas) => {
      const span = k * (r1 * r1 - r0 * r0) / (2 * z) + k * (r1 - r0) * rho / z;
      let n = Math.max(200, Math.ceil((pas || 24) * span)); if (n % 2) n++;
      const h = (r1 - r0) / n;
      let re = 0, im = 0;
      for (let i = 0; i <= n; i++) {
        const r = r0 + i * h, wgt = (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * g(r) * besselJ0(k * r * rho / z) * r, ph = -k * r * r / (2 * z);
        re += wgt * Math.cos(ph); im += wgt * Math.sin(ph);
      }
      re *= h / 3; im *= h / 3;
      const pre = Cx.mul(Cx.c(0, k / z), Cx.polar(1, -k * rho * rho / (2 * z)));
      return Cx.mul(pre, Cx.c(re, im));
    };
    const geometrie = o => {
      if (!o) err("paramètres manquants");
      const lambda = pos(o.lambda, "λ"), z = pos(o.z, "z"), a = pos(o.a, "a"), rho = o.rho === undefined ? 0 : fini(o.rho, "ρ");
      if (rho < 0) err("ρ doit être ≥ 0");
      return { lambda, z, a, rho: rho, k: TAU / lambda, N: a * a / (lambda * z) };
    };

    /* trou(o): { lambda, z, a, rho, pas }: the field at the distance z behind a circular hole of radius a in an opaque screen, at ρ
       from the axis, in units of the field without the screen. Feynman's argument: the field of the hole is minus that of the
       plug's charges, i.e. the incident wave's sources spread over the hole alone. Returns { E (Cx), I = |E|², N = a²/(λz),
       axe = 1 − e^{−iπN} (ρ = 0, closed form) }. Model: scalar, paraxial (a, ρ ≪ z: error of order a⁴/(λ z³) on the phase),
       obliquity left out, and a ≫ λ: the change of the wall's charges near the edge (E_mur ≠ E′_mur) is neglected, which
       only a vector theory of the edge could give; below a ≈ λ the model fails. */
    function trou(o) {
      const g = geometrie(o), E = anneau(g.k, g.z, g.rho, 0, g.a, () => 1, o.pas === undefined ? 24 : pos(o.pas, "pas"));
      return { E, I: Cx.abs2(E), N: g.N, axe: Cx.sub(Cx.c(1), Cx.polar(1, -Math.PI * g.N)) };
    }

    /* disque(o): { lambda, z, a, rho, R, w }: the same for an opaque disk of radius a (the plug alone, the rest open): the sources
       spread over ρ′ ≥ a, done directly, the plane being tapered beyond R (default 8a + 4ρ) by exp(−((ρ′ − R)/w)²) (w default
       2a), the convergence device of sommeAnneaux. It does not use trou(): adding the two tests Babinet's principle,
       trou + disque = 1. Slow (tens of thousands of points): for checking, not for drawing. */
    function disque(o) {
      const g = geometrie(o), R = o.R === undefined ? 8 * g.a + 4 * g.rho : pos(o.R, "R"), w = o.w === undefined ? 2 * g.a : pos(o.w, "w");
      if (R <= g.a) err("R doit dépasser a");
      const E = Cx.add(anneau(g.k, g.z, g.rho, g.a, R, () => 1), anneau(g.k, g.z, g.rho, R, R + 6 * w, r => Math.exp(-(((r - R) / w) ** 2))));
      return { E, I: Cx.abs2(E), N: g.N };
    }

    /* ecranAbsorbant(nsec, lambda, d): the intensity left after a thickness d (m) of a medium of index n′ − i n″, by (31.22a):
       T = e^{−4π n″ d/λ}; epaisseur(T) the thickness that leaves T. Reflection at the faces excluded (for a metal it is most
       of the loss); uniform slab, plane wave at normal incidence. */
    function ecranAbsorbant(nsec, lambda, d) {
      const n2 = pos(nsec, "n″"), l = pos(lambda, "λ"), e = fini(d, "d");
      if (e < 0) err("d doit être ≥ 0");
      return { T: Math.exp(-4 * Math.PI * n2 * e / l), penetration: l / (4 * Math.PI * n2), epaisseur: T => l * Math.log(1 / pos(T, "T")) / (4 * Math.PI * n2) };
    }

    Object.assign(api, { indiceComplexe, traversee, profondeurCentre, largeurEquivalente, champIntensite, feuille, besselJ0, trou, disque, ecranAbsorbant });
  }

  /* ---------- étape « Amortissement par rayonnement » (Feynman I.32.1 à 32.3) ---------- */
  {
    const MU0 = Cst.mu0, Z0 = 1 / (EPS0 * C);

    /* fluxMoyen(E2): (32.1), S = ε0 c ⟨E²⟩ (W·m⁻²), ⟨E²⟩ in V²·m⁻². Model: a travelling wave in vacuum, far from the source
       (r ≫ λ): nearer, the non-radiating fields add and E² no longer measures the energy that leaves. */
    function fluxMoyen(E2) {
      const e2 = fini(E2, "⟨E²⟩"); if (e2 < 0) err("⟨E²⟩ doit être ≥ 0");
      return EPS0 * C * e2;
    }

    /* fluxLarmor(q, a, r, θ): (32.2), q² a² sin²θ/(16π² ε0 r² c³) (W·m⁻²), a the retarded acceleration, θ from its direction.
       Same model as champRayonne ((29.1)): wave zone, v ≪ c. */
    function fluxLarmor(q, a, r, theta) {
      const E = api.champRayonne(q, a, r, theta);
      return fluxMoyen(E * E);
    }

    /* larmor(q, a): (32.5), q² a²/(6π ε0 c³) (W), the power radiated in all directions; a = |a| (m·s⁻²). Model: v ≪ c (at speed v
       the exact power is larger by a factor between γ⁴ and γ⁶, γ = 1/√(1 − v²/c²)); the instant of emission is not sharp:
       only the energy over a whole motion is defined. */
    function larmor(q, a) { const Q = fini(q, "q"), A = fini(a, "a"); return Q * Q * A * A / (6 * Math.PI * EPS0 * C ** 3); }

    /* puissanceOscillante(q, ω, x0): (32.6), q² ω⁴ x0²/(12π ε0 c³) (W), the mean of (32.5) over a period for x = x0 cos ωt
       (⟨a²⟩ = ω⁴ x0²/2): the P of dipoleRayonnant for p0 = q x0. Model: (32.5), plus x0 ≪ λ (the charge stays in a region small
       against the wavelength: a short dipole). */
    function puissanceOscillante(q, omega, x0) { return api.dipoleRayonnant(fini(q, "q") * fini(x0, "x0"), omega).P; }

    /* fraction(θ1, θ2): the share of the power of (32.4) radiated between the angles θ1 and θ2 from the acceleration
       (0 ≤ θ1 ≤ θ2 ≤ π): (3/4)[g(θ2) − g(θ1)], g(θ) = cos³θ/3 − cos θ, exact for the sin²θ pattern. bande(α): within ±α of the
       equatorial plane, (3/2)(sin α − sin³α/3). */
    function fraction(t1, t2) {
      const a = fini(t1, "θ1"), b = fini(t2, "θ2");
      if (a < 0 || b > Math.PI + 1e-12 || a > b) err("0 ≤ θ1 ≤ θ2 ≤ π attendu");
      const g = t => Math.cos(t) ** 3 / 3 - Math.cos(t);
      return 0.75 * (g(b) - g(a));
    }
    function bande(alpha) {
      const a = fini(alpha, "α"); if (a < 0 || a > Math.PI / 2 + 1e-12) err("0 ≤ α ≤ π/2 attendu");
      const s = Math.sin(a); return 1.5 * (s - s ** 3 / 3);
    }

    /* E2: (32.7), the historical abbreviation e² = qe²/(4π ε0) (J·m), and e = √(e²). Exact (a definition). */
    const E2 = Cst.e * Cst.e / (4 * Math.PI * EPS0);

    /* resistanceDipoleCourt(L, λ, courant): radiation resistance (Ω) of a short straight antenna of length L, from (32.6):
       uniforme   current I the same all along (charges stored at both ends, "capacity hat"): (2π/3) Z0 (L/λ)² ≈ 789 (L/λ)²;
       triangle   centre-fed thin wire, current falling linearly to zero at the ends: a quarter of that, (π/6) Z0 (L/λ)² ≈ 197 (L/λ)².
       R is referred to the current at the feed: P = R ⟨I²⟩. Model: L ≪ λ ("triangle" is low by 1,3 % at L/λ = 0,1, 5 % at 0,2,
       33 % at 0,5: see dipoleMince), in free space, nothing nearby. */
    function resistanceDipoleCourt(L, lambda, courant) {
      const x = pos(L, "L") / pos(lambda, "λ"), k = courant === undefined || courant === "triangle" ? 0.25 : courant === "uniforme" ? 1 : err("courant : \"uniforme\" ou \"triangle\"");
      return k * 2 * Math.PI / 3 * Z0 * x * x;
    }

    /* dipoleMince(L, λ): a centre-fed thin straight wire of length L (L < λ), current I(z) = Im sin(k(L/2 − |z|)). The power
       radiated, integrated over the far-field pattern (Simpson, 4000 intervals): P = (Z0 Im²/(4π)) ∫ (cos(kh cos θ) − cos kh)²/sin θ dθ,
       h = L/2. Returns { Rmax (referred to Im), R (referred to the feed current Im sin kh), rapport = R/resistanceDipoleCourt }.
       Half-wave: Rmax = R ≈ 73,1 Ω. Model: the sinusoidal current is that of a wire much thinner than λ (radius a with
       ln(L/a) ≫ 1); the reactance and the gap are not modelled. */
    function dipoleMince(L, lambda) {
      const l = pos(lambda, "λ"), Lm = pos(L, "L");
      if (Lm >= 0.95 * l) err("L < 0,95 λ attendu (au-delà, le courant d'alimentation s'annule)");
      const k = TAU / l, h = Lm / 2, ckh = Math.cos(k * h);
      const f = t => { const s = Math.sin(t); return s < 1e-12 ? 0 : (Math.cos(k * h * Math.cos(t)) - ckh) ** 2 / s; };
      const Rmax = Z0 / (2 * Math.PI) * simpson(f, 0, Math.PI, 4000), R = Rmax / Math.sin(k * h) ** 2;
      return { Rmax, R, rapport: R / resistanceDipoleCourt(Lm, l, "triangle") };
    }

    /* pertesOhmiques(o): { L, lambda, a (wire radius), sigma (S·m⁻¹, default 5,80 × 10⁷, annealed copper), courant }: the ohmic
       resistance of the wire referred to the feed, by the skin effect. Rs = √(π f μ0/σ) per square, δ = √(2/(ω μ0 σ)).
       Distribution: "uniforme" Rs L/(2πa); "triangle" a third of it; "sinus" (that of dipoleMince):
       (Rs/(2πa)) (h − sin(2kh)/(2k))/sin²(kh). Model: δ ≪ a (the current flows in a skin thinner than the wire; returns
       delta to check), wire thin against λ. */
    function pertesOhmiques(o) {
      if (!o) err("pertesOhmiques : paramètres manquants");
      const L = pos(o.L, "L"), l = pos(o.lambda, "λ"), a = pos(o.a, "a"), sigma = o.sigma === undefined ? 5.8e7 : pos(o.sigma, "σ");
      const f = C / l, Rs = Math.sqrt(Math.PI * f * MU0 / sigma), delta = Math.sqrt(1 / (Math.PI * f * MU0 * sigma)), base = Rs / (TAU * a);
      const cour = o.courant === undefined ? "sinus" : o.courant;
      let R;
      if (cour === "uniforme") R = base * L;
      else if (cour === "triangle") R = base * L / 3;
      else if (cour === "sinus") { const k = TAU / l, h = L / 2; R = base * (h - Math.sin(2 * k * h) / (2 * k)) / Math.sin(k * h) ** 2; }
      else err("courant : \"uniforme\", \"triangle\" ou \"sinus\"");
      return { R, Rs, delta, f };
    }

    /* rendement(Rr, Rp): Rr/(Rr + Rp), the share of the power delivered to the antenna that is radiated. Exact for two
       resistances in series fed by the same current. */
    function rendement(Rr, Rp) { const r = fini(Rr, "Rr"), p = fini(Rp, "Rp"); if (r < 0 || p < 0 || r + p === 0) err("résistances ≥ 0, non toutes deux nulles"); return r / (r + p); }

    /* facteurQ(ω, W, dWdt): (32.8), Q = −ω W/(dW/dt). Exact as a definition; it describes an exponential decay
       W = W0 e^{−ωt/Q} only if Q stays the same while the energy falls. */
    function facteurQ(omega, W, dWdt) {
      const d = fini(dWdt, "dW/dt"); if (!(d < 0)) err("dW/dt doit être < 0 (énergie perdue)");
      return -pos(omega, "ω") * pos(W, "W") / d;
    }

    /* energieOscillateur(m, ω, x0): (32.9), ½ m ω² x0² (J), kinetic + potential of a harmonic oscillator of amplitude x0. Exact
       for an undamped oscillator; for a damped one, true over a cycle to order 1/Q. */
    function energieOscillateur(m, omega, x0) { const x = fini(x0, "x0"); return 0.5 * pos(m, "m") * pos(omega, "ω") ** 2 * x * x; }

    /* rayonClassique(o): (32.11), r0 = q²/(4π ε0 m c²) (m); electron by default: 2,818 × 10⁻¹⁵ m. A length built from q and m,
       not a measured size. */
    function rayonClassique(o) { const p = particule(o); return p.q * p.q / (4 * Math.PI * EPS0 * p.m * C * C); }

    /* amortissement(λ, o): the radiation damping of a charge o = { q, m } (electron by default) bound elastically with natural
       wavelength λ (m). (32.10): 1/Q = 4π r0/(3λ); gamma = ω0/Q = q² ω0²/(6π ε0 m c³) (s⁻¹), the rate at which the energy
       falls; tau = 1/γ (s), the time for it to fall by e; oscillations = Q/2π, the cycles in that time; dlambda (32.13) = λ/Q
       = 4π r0/3 (m), the full width of the line in wavelength, the same for all λ; dnu = γ/2π (Hz), in frequency.
       Model: classical charge on a spring, alone in vacuum; requires Q ≫ 1 (1/Q < 10⁻² here: error otherwise). Collisions,
       Doppler effect and quantum mechanics change the result: for a strong atomic line it multiplies γ by a number of order 1. */
    function amortissement(lambda, o) {
      const l = pos(lambda, "λ"), p = particule(o), r0 = rayonClassique(p), w0 = TAU * C / l;
      const Q = 3 * l / (4 * Math.PI * r0);
      if (!(Q > 100)) err("Q ≫ 1 attendu : λ trop court pour ce modèle");
      const gamma = w0 / Q;
      return { Q, w0, gamma, tau: 1 / gamma, oscillations: Q / TAU, dlambda: l / Q, dnu: gamma / TAU, r0 };
    }

    /* declin(Q, ω, t): W/W0 = e^{−ωt/Q}, the solution of (32.8) with Q constant; amplitude: its square root. */
    function declin(Q, omega, t) { const r = Math.exp(-pos(omega, "ω") * fini(t, "t") / pos(Q, "Q")); return { energie: r, amplitude: Math.sqrt(r) }; }

    /* lorentz(Δω, γ): the line profile of an oscillator with energy damping rate γ, 1/(1 + (2Δω/γ)²), full width γ at half
       height. Model: |Δω| ≪ ω0. Widths add: radiation γ plus collisions give γ_tot = γ + γ_coll. */
    function lorentz(dw, gamma) { const g = pos(gamma, "γ"), x = 2 * fini(dw, "Δω") / g; return 1 / (1 + x * x); }

    Object.assign(api, { Z0, fluxMoyen, fluxLarmor, larmor, puissanceOscillante, fraction, bande, E2, resistanceDipoleCourt, dipoleMince,
      pertesOhmiques, rendement, facteurQ, energieOscillateur, rayonClassique, amortissement, declin, lorentz });
  }

  /* ---------- étape « Diffusion de la lumière » (Feynman I.32.4, 32.5, 33.1) ---------- */
  {
    const KB = Cst.k_B, NA = Cst.N_A;

    /* (32.14a): two sources of amplitudes A1, A2 whose frequencies differ by df (Hz), seen by a detector that averages over a
       window T (s, centred on t). The phase difference drifts linearly, φ1 − φ2 = 2π df t + φ0, so the window average of the cross
       term is exactly 2A1A2 sinc(π df T) cos(2π df t + φ0). Model: stable frequencies (no phase jumps), rectangular window,
       same polarisation. contraste: (Imax − Imin)/(Imax + Imin) of what the detector shows. */
    function interferenceMoyennee(A1, A2, df, T, phi0) {
      const a = fini(A1, "A1"), b = fini(A2, "A2"), f = fini(df, "δf"), w = fini(T, "T"), p = phi0 === undefined ? 0 : fini(phi0, "φ0");
      if (w < 0) err("T doit être ≥ 0");
      const seules = a * a + b * b, facteur = sinc(Math.PI * f * w);
      return { seules, facteur, contraste: seules > 0 ? 2 * Math.abs(a * b * facteur) / seules : 0,
        I: t => seules + 2 * a * b * Math.cos(TAU * f * fini(t, "t") + p),
        detecte: t => seules + 2 * a * b * facteur * Math.cos(TAU * f * fini(t, "t") + p) };
    }
    /* residuTrains(τc, T): sources whose phase difference jumps at random (uniform on [0, 2π[) every τc; the detector averages
       over T = n τc. The mean of the cross term is 0; its root-mean-square, in units of 2A1A2, is √(τc/(2T)) exactly for n whole
       trains (each cos has mean square ½). Model: independent trains of equal length, aligned with the window. */
    function residuTrains(tauc, T) { return Math.sqrt(pos(tauc, "τc") / (2 * pos(T, "T"))); }
    /* alea(graine): a reproducible generator on [0, 1[ (mulberry32), for the pages' random draws. */
    function alea(graine) {
      let s = (graine === undefined ? 1 : Math.floor(fini(graine, "graine"))) >>> 0;
      return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    }
    /* (32.14b): n sources of amplitude A with independent random phases. One draw: the phasors end to end (pas), their resultant
       and I = |Σ A e^{iφj}|². Averaged over draws, I → n A²: the cross terms cancel on average, not in each draw. */
    function sommeAleatoire(n, A, hasard) {
      const N = Math.round(pos(n, "n")), a = A === undefined ? 1 : fini(A, "A"), r = typeof hasard === "function" ? hasard : alea(1);
      let x = 0, y = 0; const pas = [[0, 0]];
      for (let j = 0; j < N; j++) { const f = TAU * r(); x += a * Math.cos(f); y += a * Math.sin(f); pas.push([x, y]); }
      return { pas, re: x, im: y, I: x * x + y * y, Iseules: N * a * a };
    }
    /* dureeTrainClassique(λ): 1/γ = Q/ω0 for an electron bound elastically and damped by its own radiation, Q = 3λ/(4π r0):
       the time over which the energy of the train falls by e: the tau of amortissement. About 10⁻⁸ s in the visible. Classical
       model; a real atom has its own lifetime (same order for strong lines). */
    function dureeTrainClassique(lambda) { return api.amortissement(lambda).tau; }
    /* coherenceDoppler(λ, T, m): an atom of mass m (kg) in a gas at T (K) emits at λ; the Doppler spread has full width at half
       maximum Δν = (c/λ) √(8 k T ln 2/(m c²)); tauc = 1/Δν is the time over which the phase of the light holds. Model: Gaussian
       line, thermal speeds ≪ c, no collisions (they shorten tauc further). */
    function coherenceDoppler(lambda, T, m) {
      const l = pos(lambda, "λ"), dnu = (C / l) * Math.sqrt(8 * KB * pos(T, "T") * Math.LN2 / (pos(m, "m") * C * C));
      return { dnu, tauc: 1 / dnu };
    }

    /* sectionThomson(o): (32.19a), 8π r0²/3, r0 = q²/(4π ε0 m c²) from rayonClassique (o.q, o.m; the electron's by default:
       6,65 × 10⁻²⁹ m²). */
    function sectionThomson(o) { const r = api.rayonClassique(o); return 8 * Math.PI * r * r / 3; }
    /* (32.19): σs = (8π r0²/3) ω⁴/(ω² − ω0²)², one electron bound with natural pulsation ω0 (0 for a free electron: Thomson);
       with gamma, the damped form ω⁴/((ω² − ω0²)² + γ²ω²) of (32.15). Model: classical oscillator, ω far enough from ω0 if γ = 0,
       charge and mass of the electron unless o.q, o.m. */
    function sectionDiffusion(w, w0, gamma, o) {
      const om = pos(w, "ω"), o0 = fini(w0, "ω0"), g = gamma === undefined ? 0 : fini(gamma, "γ");
      if (o0 < 0 || g < 0) err("ω0 et γ doivent être ≥ 0");
      const d = (om * om - o0 * o0) ** 2 + g * g * om * om;
      if (!(d > 0)) err("ω = ω0 sans amortissement : section infinie");
      return sectionThomson(o) * om ** 4 / d;
    }
    /* (32.17), (32.18): the power scattered in all directions by one oscillator in a wave of amplitude E0 (V·m⁻¹):
       P = (½ ε0 c E0²) σs. Same model as sectionDiffusion. */
    function puissanceDiffusee(E0, w, w0, gamma, o) {
      const S = api.intensiteMoyenne(E0), sigma = sectionDiffusion(w, w0, gamma, o);
      return { S, sigma, P: S * sigma };
    }
    /* (32.19c): the cross-section of one molecule from the index of the gas, σ = 32π³ (n − 1)²/(3 N² λ⁴), N in m⁻³. It joins
       (32.19) at ω ≪ ω0 with (31.19), n − 1 = N q²/(2 ε0 m ω0²): no oscillator parameter is left. Model: dilute gas (n − 1 ≪ 1),
       isotropic molecules (real air scatters about 5 % more: the King factor of the depolarisation, o.F), ω ≪ ω0. */
    function sectionIndice(nMoins1, N, lambda, F) {
      const d = pos(nMoins1, "n − 1"), n = pos(N, "N"), l = pos(lambda, "λ"), f = F === undefined ? 1 : pos(F, "F");
      return f * 32 * Math.PI ** 3 * d * d / (3 * n * n * l ** 4);
    }
    /* AIR: standard dry air of the refractivity formula, 288,15 K, 101 325 Pa, 300 ppm of CO2; M its mean molar mass
       (Bodhaine et al. 1999, table 1 and eq. 17). indiceAir(λ): n − 1 of that air, Peck & Reeder (1972), λ in m, 230 nm to 1,69 µm. */
    const AIR = Object.freeze({ T: 288.15, p: Cst.atm, M: 28.9640e-3 });
    function indiceAir(lambda) {
      const s2 = (1e-6 / pos(lambda, "λ")) ** 2;
      if (s2 > 1 / 0.23 ** 2 || s2 < 1 / 1.69 ** 2) err("λ hors du domaine de la formule (230 nm à 1,69 µm)");
      return (8060.51 + 2480990 / (132.274 - s2) + 17455.7 / (39.32957 - s2)) * 1e-8;
    }
    /* (32.19d): the Rayleigh optical thickness of the whole atmosphere above a site at pressure p (Pa), τ = σ p/(m g):
       the column holds p/(m g) molecules per m², each of cross-section σ (sectionIndice at the AIR state, which does not depend
       on T or p since n − 1 ∝ N). Model: single dry gas, g uniform (g0), F = 1 (Feynman's isotropic oscillator) unless o.F. */
    function epaisseurRayleigh(lambda, o) {
      o = o || {};
      const p = o.p === undefined ? AIR.p : pos(o.p, "p"), g = o.g === undefined ? Cst.g0 : pos(o.g, "g");
      const N = AIR.p / (KB * AIR.T), sigma = sectionIndice(indiceAir(lambda), N, lambda, o.F);
      const colonne = p * NA / (AIR.M * g);
      return { sigma, colonne, tau: sigma * colonne, N };
    }
    /* masseAir(h, o): the amount of air along the line of sight to a source at elevation h (rad), in units of the vertical
       column: ∫ n ds/∫ n dz, through an isothermal atmosphere of scale height H = R T/(M g) (≈ 8,4 km at 288 K) on a sphere of
       radius R_E. 1/sin h to 1 % above 20° (4 % at 10°), finite (≈ 34) at the horizon. Model: no refraction, isothermal layer. */
    function masseAir(h, o) {
      o = o || {};
      const el = fini(h, "h"), T = o.T === undefined ? AIR.T : pos(o.T, "T"), R = o.R === undefined ? Cst.R_E_mean : pos(o.R, "R");
      if (el < -1e-12 || el > Math.PI / 2 + 1e-12) err("h doit être entre 0 et π/2");
      const H = Cst.R * T / (AIR.M * Cst.g0), sh = Math.sin(el);
      /* s = H u³ concentrates the samples near the ground; the integrand is negligible beyond 40 H of altitude */
      let smax = H; while (Math.hypot(R + smax * sh, smax * Math.cos(el)) - R < 40 * H) smax *= 1.5;
      const f = u => { const s = H * u ** 3, z = Math.hypot(R + s * sh, s * Math.cos(el)) - R; return Math.exp(-z / H) * 3 * u * u; };
      return { m: simpson(f, 0, Math.cbrt(smax / H), 4000), H };
    }
    /* (33.1) and around. A monochromatic transverse field E = (Ax cos ωt, Ay cos(ωt + δ)), x to the right, y up, the light
       coming toward the viewer (z toward them). stokes(Ax, Ay, δ): S0 = Ax² + Ay², S1 = Ax² − Ay², S2 = 2AxAy cos δ,
       S3 = −2AxAy sin δ, S3 > 0 when the tip turns counterclockwise for that viewer (right-hand in Feynman's convention).
       etatPolarisation(Ax, Ay, δ): { a, b (semi-axes), psi (tilt of the major axis from x, rad, in ]−π/2, π/2]), rapport b/a,
       sens (+1 counterclockwise, −1 clockwise, 0 rectilinear; psi means nothing for a circle), nature "rectiligne" | "circulaire" | "elliptique", point(ωt) }.
       Exact for a pure sinusoid of fixed amplitudes and phase; tol sets what counts as circular or rectilinear. */
    function stokes(Ax, Ay, delta) {
      const a = fini(Ax, "Ax"), b = fini(Ay, "Ay"), d = fini(delta, "δ");
      return [a * a + b * b, a * a - b * b, 2 * a * b * Math.cos(d), -2 * a * b * Math.sin(d)];
    }
    function etatPolarisation(Ax, Ay, delta, tol) {
      const e = tol === undefined ? 1e-9 : pos(tol, "tol"), [S0, S1, S2, S3] = stokes(Ax, Ay, delta);
      if (!(S0 > 0)) err("champ nul");
      const chi = 0.5 * Math.asin(Math.max(-1, Math.min(1, S3 / S0))), psi = 0.5 * Math.atan2(S2, S1);
      const a = Math.sqrt(S0) * Math.cos(chi), b = Math.sqrt(S0) * Math.abs(Math.sin(chi)), rapport = b / a;
      const sens = Math.abs(S3) <= e * S0 ? 0 : Math.sign(S3);
      const nature = sens === 0 ? "rectiligne" : 1 - rapport <= e ? "circulaire" : "elliptique";
      return { a, b, psi: psi > Math.PI / 2 - 1e-15 ? psi - Math.PI : psi, rapport, sens, nature, chi,
        point: wt => [Ax * Math.cos(fini(wt, "ωt")), Ay * Math.cos(wt + delta)] };
    }
    /* etatHasard(r): a polarisation state drawn uniformly on the Poincaré sphere, unit intensity: { Ax, Ay, delta }. */
    function etatHasard(r) {
      const u = 2 * r() - 1, f = TAU * r(), c = Math.sqrt((1 + u) / 2), s = Math.sqrt((1 - u) / 2);
      return { Ax: c, Ay: s, delta: f };   // S1 = u, S2 = √(1 − u²) cos f, S3 = −√(1 − u²) sin f
    }
    /* degrePolarisation(etats): the light that holds each state [{ Ax, Ay, delta }] for the same time, as one detector sees it:
       Stokes parameters added, P = √(S1² + S2² + S3²)/S0, from 0 (natural light) to 1. For n states drawn at random, P ≈ 1/√n. */
    function degrePolarisation(etats) {
      if (!Array.isArray(etats) || !etats.length) err("etats doit être une liste non vide");
      const s = [0, 0, 0, 0];
      for (const e of etats) stokes(e.Ax, e.Ay, e.delta).forEach((v, i) => { s[i] += v; });
      return { S: s, P: Math.hypot(s[1], s[2], s[3]) / s[0] };
    }

    Object.assign(api, { interferenceMoyennee, residuTrains, alea, sommeAleatoire, dureeTrainClassique, coherenceDoppler,
      sectionThomson, sectionDiffusion, puissanceDiffusee, sectionIndice, AIR, indiceAir, epaisseurRayleigh, masseAir,
      stokes, etatPolarisation, etatHasard, degrePolarisation });
  }

  /* ---------- étape « Biréfringence et polariseurs » (Feynman I.33.2 à 33.4) ----------
     Vecteur de Jones J = { x: Cx, y: Cx } : le champ réel est E(t) = Re(J e^{iωt}), z vers l'observateur qui reçoit la lumière.
     Onde plane, monochromatique, incidence normale sur des lames et des polariseurs minces ; réflexions sur les faces exclues. */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    const cx = (v, nom) => (v && Number.isFinite(v.re) && Number.isFinite(v.im) ? v : typeof v === "number" ? Cx.c(fini(v, nom)) : err(nom + " doit être un complexe { re, im } ou un nombre"));
    const jones = J => (J && J.x !== undefined && J.y !== undefined ? { x: cx(J.x, "Jx"), y: cx(J.y, "Jy") } : err("vecteur de Jones { x, y } attendu"));
    const tourne = (J, a) => { const c = Math.cos(a), s = Math.sin(a);          // components along u = (cos a, sin a) and v = (−sin a, cos a)
      return { u: Cx.add(Cx.scale(J.x, c), Cx.scale(J.y, s)), v: Cx.sub(Cx.scale(J.y, c), Cx.scale(J.x, s)) }; };
    const retour = (u, v, a) => { const c = Math.cos(a), s = Math.sin(a);
      return { x: Cx.sub(Cx.scale(u, c), Cx.scale(v, s)), y: Cx.add(Cx.scale(u, s), Cx.scale(v, c)) }; };

    /* rectiligne(θ, A): linear polarisation at θ (rad) from x, amplitude A (default 1). Exact. */
    function rectiligne(theta, A) { const a = A === undefined ? 1 : fini(A, "A"); fini(theta, "θ");
      return { x: Cx.c(a * Math.cos(theta)), y: Cx.c(a * Math.sin(theta)) }; }
    /* circulaire(sens, A): circular polarisation, total intensity A² ; sens +1 : E turns from x towards y (anticlockwise for
       the observer who receives the light), −1 the other way. */
    function circulaire(sens, A) { const a = (A === undefined ? 1 : fini(A, "A")) / Math.SQRT2;
      if (sens !== 1 && sens !== -1) err("sens : +1 ou −1");
      return { x: Cx.c(a), y: Cx.c(0, -sens * a) }; }

    /* jonesVersReel(J): { Ax, Ay, delta } with Jx = Ax e^{iφx}, Jy = Ay e^{iφy}, δ = φy − φx: the form of stokes and etatPolarisation
       (section « Diffusion de la lumière »), E = (Ax cos ωt′, Ay cos(ωt′ + δ)), ωt′ = ωt + φx. versEllipse(J, tol): ellipse of
       that form, plus I = |Jx|² + |Jy|². Exact. */
    function jonesVersReel(J) {
      const { x, y } = jones(J), Ax = Cx.abs(x), Ay = Cx.abs(y);
      return { Ax, Ay, delta: Ax > 0 && Ay > 0 ? Cx.arg(Cx.mul(Cx.conj(x), y)) : 0 };
    }
    function versEllipse(J, tol) { const r = jonesVersReel(J); return Object.assign(api.etatPolarisation(r.Ax, r.Ay, r.delta, tol), { I: r.Ax ** 2 + r.Ay ** 2 }); }

    /* dephasageLame(dn, e, λ): φ = 2π dn e/λ (rad), dn = n(E along the axis) − n(E across), e thickness (m), λ in vacuum (m).
       The component along the axis comes out late by φ. Exact for a plane wave at normal incidence on a plate cut parallel to
       its optic axis (no walk-off of the two beams); dn is taken at this λ (its dispersion is the caller's). */
    function dephasageLame(dn, e, lambda) { fini(dn, "Δn"); const ep = fini(e, "e"); if (ep < 0) err("e doit être ≥ 0");
      return TAU * dn * ep / pos(lambda, "λ"); }
    /* epaisseurLame(dn, λ, fraction, ordre): the thickness that gives φ = 2π (ordre + fraction): fraction ¼ quarter-wave,
       ½ half-wave ; ordre 0 by default. */
    function epaisseurLame(dn, lambda, fraction, ordre) {
      const d = Math.abs(fini(dn, "Δn")); if (!(d > 0)) err("Δn ≠ 0 attendu");
      const m = ordre === undefined ? 0 : ordre; if (!Number.isInteger(m) || m < 0) err("ordre : entier ≥ 0");
      return (m + pos(fraction, "fraction")) * pos(lambda, "λ") / d;
    }
    /* lame(J, α, φ): a retarder whose optic axis is at α (rad) from x, phase lag φ (rad) of the component along the axis.
       Lossless: intensity kept exactly. Global phase: the component across the axis is the reference. */
    function lame(J, alpha, phi) {
      const r = tourne(jones(J), fini(alpha, "α"));
      return retour(Cx.mul(r.u, Cx.polar(1, -fini(phi, "φ"))), r.v, alpha);
    }
    /* polariseur(J, θ, o): a dichroic sheet whose pass axis is at θ (rad) from x. o.k1 intensity transmission along the axis
       (default 1), o.k2 across it (default 0) ; 0 ≤ k2 ≤ k1 ≤ 1. Amplitudes √k1, √k2, no phase difference. Model: thin sheet,
       normal incidence, k1, k2 constant over the spectrum. */
    function polariseur(J, theta, o) {
      const k1 = o && o.k1 !== undefined ? fini(o.k1, "k1") : 1, k2 = o && o.k2 !== undefined ? fini(o.k2, "k2") : 0;
      if (!(k2 >= 0 && k2 <= k1 && k1 <= 1)) err("0 ≤ k2 ≤ k1 ≤ 1 attendu");
      const r = tourne(jones(J), fini(theta, "θ"));
      return retour(Cx.scale(r.u, Math.sqrt(k1)), Cx.scale(r.v, Math.sqrt(k2)), theta);
    }
    /* chaine(J, elements): applies in order [{ type: "polariseur", theta, k1, k2 } | { type: "lame", alpha, phi }]. */
    function chaine(J, elements) {
      if (!Array.isArray(elements)) err("elements : tableau");
      return elements.reduce((j, e) => e.type === "polariseur" ? polariseur(j, e.theta, e) : e.type === "lame" ? lame(j, e.alpha, e.phi)
        : err("élément inconnu : " + (e && e.type)), jones(J));
    }
    /* naturelle(elements): intensity out of the chain for natural (unpolarised) light of intensity 1: the incoherent mean of
       two orthogonal linear states, ½[I(x) + I(y)] ; any orthogonal pair gives the same (tested). Natural light is a model:
       a source whose polarisation changes faster than the detector integrates. */
    function naturelle(elements) {
      const I = J => { const o = chaine(J, elements); return Cx.abs2(o.x) + Cx.abs2(o.y); };
      return 0.5 * (I(rectiligne(0)) + I(rectiligne(Math.PI / 2)));
    }
    /* escalier(n, angle, o): natural light of intensity 1 through n + 1 polarisers, the first along x, each next one turned by
       angle/n (angle default π/2: the last crossed with the first). Ideal: ½ cos^{2n}(angle/n). o.k1, o.k2 as in polariseur.
       Returns { I (natural light, full chain), ideal, apres (intensity after each polariser), pas }. */
    function escalier(n, angle, o) {
      if (!Number.isInteger(n) || n < 1) err("n : entier ≥ 1");
      const A = angle === undefined ? Math.PI / 2 : fini(angle, "angle"), pas = A / n;
      const els = Array.from({ length: n + 1 }, (_, k) => Object.assign({ type: "polariseur", theta: k * pas }, o));
      const apres = els.map((_, k) => naturelle(els.slice(0, k + 1)));
      return { I: apres[n], ideal: 0.5 * Math.cos(pas) ** (2 * n), apres, pas };
    }
    /* entreCroises(α, φ): fraction of the polarised intensity that crosses an analyser crossed with the polariser, a plate of
       axis at α from the polariser between them: sin²2α sin²(φ/2) ; parallele = 1 − croises. Ideal polarisers. */
    function entreCroises(alpha, phi) {
      const c = Math.sin(2 * fini(alpha, "α")) ** 2 * Math.sin(fini(phi, "φ") / 2) ** 2;
      return { croises: c, parallele: 1 - c };
    }

    /* diffusion(θ, ρ): light scattered at θ (rad, from the incident direction) by molecules small against λ, incident light
       natural. Per molecule and up to a common factor: Iperp (E normal to the scattering plane) = 1, Ipar = ρ + (1 − ρ) cos²θ,
       ρ the depolarisation ratio Ipar/Iperp at 90° (0 for isotropic molecules). P = (Iperp − Ipar)/(Iperp + Ipar),
       total = Iperp + Ipar. Model: single scattering, far field, size ≪ λ ; ρ ∈ [0, 1). */
    function diffusion(theta, rho) {
      const r = rho === undefined ? 0 : fini(rho, "ρ"); if (!(r >= 0 && r < 1)) err("ρ ∈ [0, 1) attendu");
      const c2 = Math.cos(fini(theta, "θ")) ** 2, Ipar = r + (1 - r) * c2;
      return { Iperp: 1, Ipar, total: 1 + Ipar, P: (1 - Ipar) / (1 + Ipar) };
    }
    /* rayonneDipole(p, n): the far field of an oscillating dipole p = [px, py, pz] seen in the direction n (unit), up to the
       factor −k²/(4π ε0 r): p⊥ = p − (p·n)n, the direction of champ286. The basis of diffusion, used to check it (tests). */
    function rayonneDipole(p, n) { return perp(vec(p, "p"), unit(n, "n")); }
    /* cielPolarise(soleil, vise, ρ): single-scattering sky. soleil, vise: { h, az } (rad) elevation and azimuth of the Sun and of the
       point looked at. Returns { theta (scattering angle = angle Sun–point), P (diffusion), axe }: axe the unit vector of E,
       normal to the plane Sun–observer–point (east, north, up). Model: Rayleigh sky without multiple scattering, aerosols or
       ground: it overestimates P (measured maxima 60 to 80 % against 94 % with ρ = 0,0279). */
    function cielPolarise(soleil, vise, rho) {
      const v = o => [Math.cos(fini(o.h, "h")) * Math.sin(fini(o.az, "az")), Math.cos(o.h) * Math.cos(o.az), Math.sin(o.h)];
      const s = v(soleil), d = v(vise), cr = cross(s, d);
      const c = Math.max(-1, Math.min(1, dot(s, d))), nc = norm(cr), theta = Math.acos(c);
      return { theta, P: diffusion(theta, rho).P, axe: nc > 1e-12 ? cr.map(x => x / nc) : null };
    }
    /* brewster(n1, n2): angle of incidence (rad) where the reflected p wave vanishes, tan θB = n2/n1 ; the refracted ray is then
       at 90° from the reflected one. Non-absorbing, isotropic, non-magnetic media. */
    function brewster(n1, n2) { return Math.atan(pos(n2, "n2") / pos(n1, "n1")); }

    Object.assign(api, { rectiligne, circulaire, jonesVersReel, versEllipse, dephasageLame, epaisseurLame, lame, polariseur, chaine,
      naturelle, escalier, entreCroises, diffusion, rayonneDipole, cielPolarise, brewster });
  }

  /* ---------- étape « Activité optique et réflexion » (Feynman I.33.5 à 33.7) ----------
     Angles en radians. Vecteur de Jones de la section « Biréfringence et polariseurs » : E(t) = Re(J e^{iωt}), sens +1 de x vers y
     pour qui reçoit la lumière. Les chimistes comptent α positif dans l'autre sens (dextrogyre : horaire pour l'observateur). */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    const DEG = Math.PI / 180;
    const jones = J => (J && J.x && J.y && Number.isFinite(J.x.re) && Number.isFinite(J.y.re) ? J : err("vecteur de Jones { x, y } attendu"));

    /* helice(A, λ): the corkscrew picture. The currents across the beam on the two sides of a helix of diameter A (along the
       beam) are opposite; their fields reach a far point A/c apart: phase π + kA, k = 2π/λ. residu = |1 + e^{i(π + kA)}| =
       2|sin(kA/2)|, in units of the field of one side; premierOrdre = kA, its value when kA ≪ 1. Model: two point currents,
       equal and opposite, wave zone, one molecule. */
    function helice(A, lambda) {
      const kA = TAU / pos(lambda, "λ") * pos(A, "A");
      return { phase: Math.PI + kA, residu: 2 * Math.abs(Math.sin(kA / 2)), premierOrdre: kA };
    }
    /* specifiqueSI(v): a specific rotation in the chemists' unit °·mL·dm⁻¹·g⁻¹ to rad·m²·kg⁻¹, × π/18 000. Exact. */
    const specifiqueSI = v => fini(v, "[α]") * DEG / 100;
    /* SUCRES: [α] at 589 nm and 293,15 K in water, °·mL·dm⁻¹·g⁻¹, > 0 dextrogyre. Glucose: the equilibrium of its two forms. */
    const SUCRES = { saccharose: 66.5, glucose: 52.7, fructose: -92 };
    /* rotationSolution(aSI, ℓ, c): Biot's law α = aSI ℓ c (rad), ℓ the path (m), c the mass concentration (kg·m⁻³), α > 0
       dextrogyre. Model: one wavelength, one temperature, [α] independent of c; a single reading gives α modulo π. */
    function rotationSolution(aSI, l, conc) {
      fini(aSI, "[α]"); const L = fini(l, "ℓ"), cc = fini(conc, "c");
      if (L < 0 || cc < 0) err("ℓ et c doivent être ≥ 0");
      return aSI * L * cc;
    }
    /* circulaires(J, nPlus, nMoins, ℓ, λ): J after a length ℓ (m) of a medium whose index is nPlus for circulaire(+1) and nMoins
       for circulaire(−1); each part is late by 2π n ℓ/λ. Exact for a plane wave in an isotropic, transparent, optically
       active medium (no linear birefringence, no reflection at the faces). */
    function circulaires(J, nPlus, nMoins, l, lambda) {
      const j = jones(J), P = api.circulaire(1), M = api.circulaire(-1), lam = pos(lambda, "λ"), L = fini(l, "ℓ");
      const proj = B => Cx.add(Cx.mul(Cx.conj(B.x), j.x), Cx.mul(Cx.conj(B.y), j.y));
      /* mean phase (a global phase, taken modulo 2π) and half-difference, so that a tiny n₊ − n₋ keeps its digits */
      const m = (Math.PI * (pos(nPlus, "n₊") + pos(nMoins, "n₋")) * L / lam) % TAU, d = Math.PI * (nPlus - nMoins) * L / lam;
      const cp = Cx.mul(proj(P), Cx.polar(1, -m - d)), cm = Cx.mul(proj(M), Cx.polar(1, -m + d));
      return { x: Cx.add(Cx.mul(cp, P.x), Cx.mul(cm, M.x)), y: Cx.add(Cx.mul(cp, P.y), Cx.mul(cm, M.y)) };
    }
    /* rotationCirculaire(n₊, n₋, ℓ, λ): the turn of a linear polarisation, π(n₋ − n₊)ℓ/λ, counted in the sense +1: the plane
       follows the faster circular wave. ecartCirculaire(α, ℓ, λ): the n₊ − n₋ that gives a clockwise (dextrogyre) turn α. */
    const rotationCirculaire = (np, nm, l, lambda) => Math.PI * (fini(nm, "n₋") - fini(np, "n₊")) * fini(l, "ℓ") / pos(lambda, "λ");
    const ecartCirculaire = (alpha, l, lambda) => fini(alpha, "α") * pos(lambda, "λ") / (Math.PI * pos(l, "ℓ"));
    /* polarimetre(o): { a (°·mL·dm⁻¹·g⁻¹), l (m), c (kg·m⁻³), beta (rad, analyser, clockwise like α), lambda (m, 589 nm) }.
       Polariser along x, the tube as a circularly birefringent medium of mean index 1,33 (water), an ideal analyser.
       Returns { alpha (clockwise), I = cos²(β − α) of the light leaving the polariser, dn = n₊ − n₋, J }. */
    function polarimetre(o) {
      if (!o) err("polarimetre : paramètres manquants");
      const lam = o.lambda === undefined ? 589e-9 : pos(o.lambda, "λ"), l = fini(o.l, "ℓ");
      const alpha = rotationSolution(specifiqueSI(o.a), l, o.c), beta = o.beta === undefined ? 0 : fini(o.beta, "β");
      const dn = l > 0 ? ecartCirculaire(alpha, l, lam) : 0, n0 = 1.33;
      const J = circulaires(api.rectiligne(0), n0 + dn / 2, n0 - dn / 2, l, lam), Ja = api.polariseur(J, -beta);
      return { alpha, I: Cx.abs2(Ja.x) + Cx.abs2(Ja.y), dn, J };
    }

    /* reflexion(n1, n2, i): a plane wave of unit amplitude meets, at the angle i (rad, 0 to π/2), the flat face between two
       transparent, isotropic, non-magnetic media, from n1 into n2; r the angle of refraction. s: E normal to the plane of
       incidence, amplitudes b (reflected) and a (refracted), (33.6), (33.8) b = −sin(i − r)/sin(i + r). p: E in the plane, B
       and A, (33.7), (33.8) B = −tan(i − r)/tan(i + r), Feynman's sign (the opposite of fresnelFace "p"). Computed in the
       cosine form, without the 0/0 of i = r = 0. a = 2n1 cos i/(n1 cos i + n2 cos r), A = a/cos(i − r) (33.2). Rs = b²,
       Rp = B², Ts, Tp the transmitted powers (Rs + Ts = 1), R = (Rs + Rp)/2 for natural light, P = (Rs − Rp)/(Rs + Rp) its
       degree of polarisation after reflection. n1 sin i > n2: total reflection, { totale: true, Rs = Rp = 1 }. */
    function reflexion(n1, n2, i) {
      pos(n1, "n1"); pos(n2, "n2"); fini(i, "i");
      if (i < 0 || i > Math.PI / 2 + 1e-12) err("i entre 0 et π/2 attendu");
      const s = n1 * Math.sin(i) / n2;
      if (s > 1) return { totale: true, r: null, Rs: 1, Rp: 1, Ts: 0, Tp: 0, R: 1, P: 0 };
      const r = Math.asin(s), ci = Math.cos(i), cr = Math.cos(r);
      const b = api.fresnelFace(n1, n2, ci, cr, "s"), B = -api.fresnelFace(n1, n2, ci, cr, "p");
      const a = 2 * n1 * ci / (n1 * ci + n2 * cr), A = 2 * n1 * ci / (n2 * ci + n1 * cr);
      const Ts = 4 * n1 * n2 * ci * cr / (n1 * ci + n2 * cr) ** 2, Tp = 4 * n1 * n2 * ci * cr / (n2 * ci + n1 * cr) ** 2;
      const Rs = b * b, Rp = B * B;
      return { totale: false, r, b, B, a, A, Rs, Rp, Ts, Tp, R: (Rs + Rp) / 2, P: Rs + Rp > 0 ? (Rs - Rp) / (Rs + Rp) : 0 };
    }
    /* reflexionNormale(n1, n2): ((n1 − n2)/(n1 + n2))², the limit of (33.6) and (33.7) at i = 0. angleCritique(n1, n2): arcsin(n2/n1)
       if n1 > n2, else null. Same model as reflexion. */
    const reflexionNormale = (n1, n2) => reflexion(n1, n2, 0).Rs;
    const angleCritique = (n1, n2) => (pos(n1, "n1") > pos(n2, "n2") ? Math.asin(n2 / n1) : null);

    /* CRISTAUX: no, ne at 589,3 nm. Calcite (spath d'Islande) negative, ne < no; quartz positive, ne > no. */
    const CRISTAUX = { calcite: { no: 1.6584, ne: 1.4864 }, quartz: { no: 1.5443, ne: 1.5534 } };
    /* indiceExtra(no, ne, θ): index of the extraordinary wave whose normal makes θ with the optic axis, 1/n² = cos²θ/no² +
       sin²θ/ne² ; no along the axis, ne across. rayonExtra(no, ne, θ): direction of the energy (the ray), tan θr = (no/ne)² tan θ,
       { theta: θr, rho: θr − θ }. Exact for a transparent, non-magnetic, uniaxial crystal; quartz within a few degrees of its
       axis is ruled by its optical activity instead. */
    function indiceExtra(no, ne, th) {
      const c = Math.cos(fini(th, "θ")), s = Math.sin(th);
      return 1 / Math.sqrt(c * c / pos(no, "no") ** 2 + s * s / pos(ne, "ne") ** 2);
    }
    function rayonExtra(no, ne, th) {
      pos(no, "no"); pos(ne, "ne"); fini(th, "θ");
      let t = Math.atan2(no * no * Math.sin(th), ne * ne * Math.cos(th));
      if (t - th > Math.PI / 2) t -= Math.PI; else if (th - t > Math.PI / 2) t += Math.PI;
      return { theta: t, rho: t - th };
    }
    /* lameUniaxe(o): { no, ne, axe, i, e, n1 } a plate of thickness e (m) with parallel faces, its optic axis in the plane of
       incidence at axe (rad) from the normal to the faces, lit from a medium n1 (1 by default) at the angle i (rad); angles
       counted from the inward normal, positive towards the side the incident light moves to. Ordinary: Snell with no.
       Extraordinary: the wave normal t solves n(t − axe) sin t = n1 sin i (the trace on the face is common to all waves, the
       envelope of Huygens' ellipsoids), the ray goes at psi = axe + θr. x: where each ray meets the back face, measured from
       the entry point; both leave parallel to the incident beam. ecart: their distance across the beam, |xe − xo| cos i. */
    function lameUniaxe(o) {
      if (!o) err("lameUniaxe : paramètres manquants");
      const no = pos(o.no, "no"), ne = pos(o.ne, "ne"), axe = fini(o.axe, "axe"), i = fini(o.i || 0, "i"), e = pos(o.e, "e");
      const n1 = o.n1 === undefined ? 1 : pos(o.n1, "n1"), s = n1 * Math.sin(i);
      if (Math.abs(i) >= Math.PI / 2) err("|i| < π/2 attendu");
      if (Math.abs(s) >= Math.min(no, ne)) err("n1 sin i doit rester sous les indices du cristal");
      const ro = Math.asin(s / no);
      const f = t => indiceExtra(no, ne, t - axe) * Math.sin(t) - s;
      let lo = -Math.PI / 2, hi = Math.PI / 2;
      for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; }
      const t = (lo + hi) / 2, ray = rayonExtra(no, ne, t - axe), psi = axe + ray.theta;
      if (!(Math.abs(psi) < Math.PI / 2)) err("le rayon extraordinaire ne traverse pas la lame");
      const xo = e * Math.tan(ro), xe = e * Math.tan(psi);
      return { o: { r: ro, x: xo, n: no }, e: { onde: t, n: indiceExtra(no, ne, t - axe), psi, rho: ray.rho, x: xe },
        separation: xe - xo, ecart: Math.abs(xe - xo) * Math.cos(i) };
    }

    /* momentCirculaire(W, ω): the angular momentum W/ω (J·s) carried, along the beam, by circular light of energy W (J) and
       pulsation ω; W/(ħω) photons of ħ each. couple(P, λ, delta): the torque (N·m) on a body that changes each photon's spin by
       delta ħ (1 if it absorbs circular light, 2 for a half-wave plate that turns +1 into −1): P delta λ/(2πc). Model: a
       paraxial beam, fully circular; the orbital part (beam shape) is not counted. */
    const momentCirculaire = (W, omega) => fini(W, "W") / pos(omega, "ω");
    const couple = (P, lambda, delta) => fini(P, "P") * fini(delta, "Δ") * pos(lambda, "λ") / (TAU * C);

    Object.assign(api, { helice, specifiqueSI, SUCRES, rotationSolution, circulaires, rotationCirculaire, ecartCirculaire, polarimetre,
      reflexion, reflexionNormale, angleCritique, CRISTAUX, indiceExtra, rayonExtra, lameUniaxe, momentCirculaire, couple });
  }

  /* ---------- étape « Sources rapides » (Feynman I.34.1 à 34.3) ----------
     Observer very far away on the line of sight. z is measured along it, away from the observer (the distance is
     R0 + z), x and y across it. Times: τ the source's time, t the observer's time minus the constant R0/c. A trajectory
     is a function τ → [x, y, z] in m. Model of the whole section: the observer is far (R0 ≫ size of the motion, terms of
     relative order size/R0 dropped) and in the wave zone (R0 ≫ λ); any speed below c. */
  {
    const HBAR = Cst.hbar;
    const fonction = (f, nom) => (typeof f === "function" ? f : err(nom + " doit être une fonction"));
    const beta01 = (b, nom) => (Number.isFinite(b) && b >= 0 && b < 1 ? b : err(nom + " doit être dans [0, 1["));
    const betaPos = (b, nom) => (Number.isFinite(b) && b > 0 && b < 1 ? b : err(nom + " doit être dans ]0, 1["));
    /* (34.5), (34.4a), (34.4b): the received motion at the source's time τ. t = τ + z(τ)/c (34.5); s = dt/dτ = 1 + ż/c
       (34.4a), the stretch of the observer's clock against the source's (compression = 1/s); ax, ay = d²x′/dt², d²y′/dt²
       = (ẍ s − ẋ z̈/c)/s³ (34.4b), the accelerations that (34.3) turns into the field. Derivatives in τ by centred
       differences of step h (s): error of order (ωh)² for a motion of angular frequency ω. Exact in the far zone at any
       |v| < c; a speed ≥ c is an error. */
    function deplie(traj, tau, h) {
      fonction(traj, "traj"); fini(tau, "τ"); pos(h, "h");
      const P = s => { const r = traj(s); if (!Array.isArray(r) || r.length !== 3 || !r.every(Number.isFinite)) err("traj(τ) doit rendre [x, y, z] finis"); return r; };
      const a = P(tau - h), m = P(tau), b = P(tau + h);
      const d1 = i => (b[i] - a[i]) / (2 * h), d2 = i => (b[i] - 2 * m[i] + a[i]) / (h * h);
      if (!(Math.hypot(d1(0), d1(1), d1(2)) < C)) err("la source va plus vite que la lumière");
      const s = 1 + d1(2) / C, ds = d2(2) / C, acc = i => (d2(i) * s - d1(i) * ds) / s ** 3;
      return { t: tau + m[2] / C, x: m[0], y: m[1], s, compression: 1 / s, vx: d1(0) / s, vy: d1(1) / s, ax: acc(0), ay: acc(1) };
    }
    /* a charge oscillating along a line at angle α from the line of sight, x = a sin α sin ω0τ, z = a cos α sin ω0τ, top
       speed β0 c = a ω0 (β0 < 1). Units: a, 1/ω0, a ω0². b = β0 cos α. point(τ): { t = τ + b sin τ, x = sin α sin τ,
       s = 1 + b cos τ, a = −sin α sin τ/s³ } ((34.4b) in closed form). pic: the largest |a|, at cos τ = (1 − √(1 + 24b²))/(4b);
       rapport: pic/sin α, against the amplitude that (28.6) gives with a constant delay; compressionMax = 1/(1 − |b|).
       harmoniques: amplitudes 2|c_k| of the field at k ω0 (k = 1 … 16), c_k = (1/2π)∮ a e^(−ikt) dt, on n points (trapezes,
       spectrally exact for this periodic integrand); fondamental: share of ⟨a²⟩ at ω0 (null when sin α = 0, no field). */
    function oscillationOblique(beta0, alpha, n) {
      beta01(beta0, "β0"); fini(alpha, "α");
      const N = n === undefined ? 2048 : (Number.isInteger(n) && n >= 16 ? n : err("n doit être un entier ≥ 16"));
      const sa = Math.sin(alpha), b = beta0 * Math.cos(alpha);
      const point = tau => { const s = 1 + b * Math.cos(tau); return { t: tau + b * Math.sin(tau), x: sa * Math.sin(tau), s, a: -sa * Math.sin(tau) / s ** 3 }; };
      const u = b === 0 ? 0 : (1 - Math.sqrt(1 + 24 * b * b)) / (4 * b);
      const pic = Math.abs(sa) * Math.sqrt(1 - u * u) / (1 + b * u) ** 3;
      const K8 = 16, re = new Array(K8 + 1).fill(0), im = new Array(K8 + 1).fill(0);
      let a2 = 0;
      for (let i = 0; i < N; i++) {
        const p = point(TAU * i / N), w = p.s / N;                          // dt = s dτ, mean over a period 2π
        a2 += p.a * p.a * w;
        for (let k = 1; k <= K8; k++) { re[k] += p.a * Math.cos(k * p.t) * w; im[k] -= p.a * Math.sin(k * p.t) * w; }
      }
      const harmoniques = re.slice(1).map((r, k) => 2 * Math.hypot(r, im[k + 1]));
      return { b, point, pic, rapport: sa !== 0 ? pic / Math.abs(sa) : null, compressionMax: 1 / (1 - Math.abs(b)), harmoniques, carreMoyen: a2,
        fondamental: a2 > 0 ? harmoniques[0] ** 2 / 2 / a2 : null };
    }
    /* a charge on a circle of radius R at constant speed βc, in a plane that contains the line of sight; φ = Ωτ counted
       from the z axis: x = R sin φ, z = R cos φ. Units: R, 1/Ω, RΩ². (34.5a): Ωt = φ + β cos φ, x′ = sin φ — the curtate
       cycloid, traced by a point at R from the centre of a wheel of radius R/β that rolls at c. (34.5b): a = d²x′/dt² =
       (β − sin φ)/(1 − β sin φ)³. s = dt/dτ = 1 − β sin φ. Exact in the far zone at any β < 1. */
    function cercle(beta, phi) {
      beta01(beta, "β"); fini(phi, "φ");
      const sn = Math.sin(phi), s = 1 - beta * sn;
      return { Ot: phi + beta * Math.cos(phi), x: sn, z: Math.cos(phi), s, a: (beta - sn) / s ** 3 };
    }
    /* the same at the observer's time: solves Ωt = φ + β cos φ for φ (one root: the right side grows, slope ≥ 1 − β). */
    function cercleVu(beta, Ot) {
      beta01(beta, "β"); fini(Ot, "Ωt");
      let lo = Ot - beta - 1e-12, hi = Ot + beta + 1e-12;
      for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (mid === lo || mid === hi) break; if (mid + beta * Math.cos(mid) < Ot) lo = mid; else hi = mid; }
      return Object.assign({ phi: (lo + hi) / 2 }, cercle(beta, (lo + hi) / 2));
    }
    /* the pulse of (34.5b) around the cusp φ = π/2, where the charge comes straight at the observer. compression 1/(1 − β);
       hauteur 1/(1 − β)², the peak of |a| in units of RΩ², the acceleration that (28.6) would use; zero: Ωt from the peak
       to the first zero of the field, exact: arccos β − β√(1 − β²) (→ 2/(3γ³) when γ ≫ 1); largeur: full width at half
       height, in Ωt (bisection; → 0,449/γ³); wcSurOmega: ωc/Ω = (3/2)γ³/β, with ωc = (3/2)γ³ c/R (34.5c). */
    function picCercle(beta) {
      betaPos(beta, "β");
      const g = 1 / Math.sqrt((1 - beta) * (1 + beta)), h = 1 / (1 - beta) ** 2, phiZ = Math.PI - Math.asin(beta);
      let lo = Math.PI / 2, hi = phiZ;                                          // |a| falls from h to 0 on [π/2, φz]
      for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (mid === lo || mid === hi) break; if (-cercle(beta, mid).a > h / 2) lo = mid; else hi = mid; }
      const demi = cercle(beta, (lo + hi) / 2).Ot - Math.PI / 2;
      return { gamma: g, compression: 1 / (1 - beta), hauteur: h, zero: Math.acos(beta) - beta * Math.sqrt((1 - beta) * (1 + beta)), largeur: 2 * demi, wcSurOmega: 1.5 * g ** 3 / beta };
    }
    /* the same pulse when γ ≫ 1, a curve that no longer depends on γ: with φ = π/2 + u/γ, 1 − β sin φ ≈ (1 + u²)/(2γ²), so
       ωc t = (3/4)(u + u³/3) and E/Epeak = (1 − u²)/(1 + u²)³ (E ∝ −a). Relative error of order 1/γ². */
    function picUniversel(u) { fini(u, "u"); return { wct: 0.75 * (u + u ** 3 / 3), E: (1 - u * u) / (1 + u * u) ** 3 }; }
    /* (34.9): pc in eV = (q/qe) c B R, B in T, R in m; c exact (Feynman rounds it to 3 × 10⁸). Same model as (34.7). */
    function pcEV(B, R, z) { return (z === undefined ? 1 : fini(z, "q/qe")) * C * fini(B, "B") * fini(R, "R"); }
    /* (34.6) to (34.9) and the radiation of a particle of charge q (C, default qe; sign ignored), mass m (kg, default me),
       total energy W (J) on a circle in a uniform field B (T) perpendicular to its velocity.
       R = p/(qB) (34.7); omega = qvB/p = v/R (34.8); gamma = W/mc², beta, unMoinsBeta = 1/(γ²(1 + β)) (no cancellation);
       T0 the period, lambda0 = c T0 the wavelength of the slow motion; omegaC = (3/2)γ³ c/R (34.5c), lambdaC = 2πc/ωc,
       Ec = ħωc; U0 = q²β³γ⁴/(3 ε0 R) the energy radiated per turn (Liénard), perte = U0/W, P = U0/T0; angle = 1/γ, the
       half-width of the cone. Model: B uniform and static, no electric field; the loss per turn small against W (perte
       ≪ 1), so that the circle closes; classical radiation, valid while ħωc ≪ W. */
    function anneau(o) {
      if (!o) err("anneau : paramètres manquants");
      const W = pos(o.W, "W"), B = pos(o.B, "B"), { q: qs, m } = particule(o), q = Math.abs(qs);
      if (!(q > 0)) err("q ne doit pas être nul");
      const mc2 = m * C * C;
      if (!(W > mc2)) err("W doit dépasser l'énergie de masse mc²");
      const pc = Math.sqrt((W - mc2) * (W + mc2)), p = pc / C, R = p / (q * B), gamma = W / mc2, beta = pc / W, v = beta * C;
      const omega = q * v * B / p, T0 = TAU / omega, omegaC = 1.5 * gamma ** 3 * C / R;
      const U0 = q * q * beta ** 3 * gamma ** 4 / (3 * EPS0 * R);
      return { W, B, q, m, pc, p, pcEV: pc / Cst.e, R, gamma, beta, unMoinsBeta: 1 / (gamma * gamma * (1 + beta)), v, omega, T0, lambda0: C * T0,
        omegaC, lambdaC: TAU * C / omegaC, Ec: HBAR * omegaC, U0, perte: U0 / W, P: U0 / T0, angle: 1 / gamma };
    }
    /* F(x) = x ∫ₓ^∞ K₅/₃(y) dy, x = ω/ωc: the spectrum of synchrotron radiation summed over all directions (Schwinger
       1949), dP/dω = (P/ωc) F(x)/F_TOTAL. Computed as x ∫₀^∞ e^(−x ch u) ch(5u/3)/ch u du (from K_ν(y) = ∫₀^∞ e^(−y ch u)
       ch νu du), Simpson on n intervals (default 2000), relative error < 10⁻⁶ for 10⁻⁶ ≤ x ≤ 50. Model: γ ≫ 1 (the pulse
       is short against the period, the spectrum continuous). */
    const F_TOTAL = 8 * Math.PI / (9 * Math.sqrt(3));
    function spectreF(x, n) {
      pos(x, "x");
      const N = n === undefined ? 2000 : (Number.isInteger(n) && n >= 10 && n % 2 === 0 ? n : err("n doit être un entier pair ≥ 10"));
      let U = Math.acosh(1 + 46 / x);                                         // e^(−x(ch U − 1)) e^(2U/3) < 10⁻²⁰: relative to the peak
      for (let k = 0; k < 3; k++) U = Math.acosh(1 + (46 + 2 * U / 3) / x);
      return x * simpson(u => Math.exp(-x * Math.cosh(u)) * Math.cosh(5 * u / 3) / Math.cosh(u), 0, U, N);
    }
    /* share of the radiated power between x1 = ω1/ωc and x2 (x2 may be Infinity; x1 may be 0): ∫F/F_TOTAL, Simpson in
       ln x on [max(x1, 10⁻⁹), min(x2, 60)], n intervals (default 400); what lies below 10⁻⁹ or above 60 is < 10⁻⁸. */
    function fractionSpectre(x1, x2, n) {
      if (!(x1 >= 0) || !(x2 > x1)) err("il faut 0 ≤ x1 < x2");
      const a = Math.log(Math.max(x1, 1e-9)), b = Math.log(Math.min(x2, 60));
      if (!(b > a)) return 0;
      return simpson(l => { const x = Math.exp(l); return spectreF(x) * x; }, a, b, n === undefined ? 400 : n) / F_TOTAL;
    }
    Object.assign(api, { deplie, oscillationOblique, cercle, cercleVu, picCercle, picUniversel, pcEV, anneau, F_TOTAL, spectreF, fractionSpectre });
  }

  /* ---------- étape « Synchrotron cosmique et effet Doppler » (Feynman I.34.4 à 34.6) ----------
     β = v/c, γ = 1/√(1 − β²). Charge and mass of the electron by default (o.q, o.m; |q| is used where only the size counts).
     Radiation reaction neglected over one turn or one kink: the energy radiated there is small against γmc². */
  {
    const MU0 = Cst.mu0;
    const lorentzG = g => (Number.isFinite(g) && g >= 1 ? g : err("γ doit être un nombre ≥ 1"));
    const vitesse = b => (Number.isFinite(b) && Math.abs(b) < 1 ? b : err("β doit être entre −1 et 1 (exclus)"));
    const gam = b => 1 / Math.sqrt((1 - b) * (1 + b));
    const betaDe = g => Math.sqrt((g - 1) * (g + 1)) / g;                // keeps the digits when γ is close to 1
    const sinA = o => { const s = o && o.sinAlpha !== undefined ? fini(o.sinAlpha, "sin α") : 1; return s >= 0 && s <= 1 ? s : err("sin α doit être entre 0 et 1"); };

    /* (34.8p): ω = |q|B/(γm), the angular frequency of the circle, from (34.8) ω = qvB/p with p = γmv. rayon: the radius of the
       projected circle, γ m v sin α/(|q|B), α the pitch angle between v and B. Exact for a uniform static B (the motion along
       B is free); the loss to radiation over one turn is the fraction 2π P/(ω γ m c²), see puissanceSynchrotron. */
    function gyration(gamma, B, o) {
      lorentzG(gamma); pos(B, "B"); const p = particule(o), s = sinA(o), q = Math.abs(p.q), w = q * B / (gamma * p.m);
      return { omega: w, f: w / TAU, periode: TAU / w, rayon: gamma * p.m * betaDe(gamma) * C * s / (q * B), beta: betaDe(gamma) };
    }
    /* νc = 3γ²|q|B sin α/(4π m): the critical frequency of synchrotron radiation. The light of one electron is a train of
       flashes, each lasting about the time its cone of half-angle 1/γ sweeps the line of sight, shortened by 1 − β ≈ 1/(2γ²):
       its spectrum spreads up to about νc and peaks near 0,29 νc. Model: γ ≫ 1 (the factor 3/2 comes from the exact spectrum,
       not from the estimate), B uniform over the arc of length ρ/γ that is seen, classical (hνc ≪ γmc²). */
    function frequenceCritique(gamma, B, o) {
      lorentzG(gamma); pos(B, "B"); const p = particule(o);
      return 3 * gamma * gamma * Math.abs(p.q) * B * sinA(o) / (4 * Math.PI * p.m);
    }
    /* the γ an electron needs for νc to equal ν: the inverse of frequenceCritique. */
    function gammaPourFrequence(nu, B, o) {
      pos(nu, "ν"); pos(B, "B"); const p = particule(o), s = sinA(o); if (!(s > 0)) err("sin α doit être > 0");
      return Math.max(1, Math.sqrt(4 * Math.PI * p.m * nu / (3 * Math.abs(p.q) * B * s)));
    }
    /* relativistic Larmor (Liénard): P = q²γ⁴(a⊥² + γ² a∥²)/(6π ε0 c³), a⊥ and a∥ the parts of the acceleration across and
       along v, in the frame where the charge moves at β. It reduces to (32.5) when γ = 1. Exact for a classical point
       charge; power counted in the time of the charge (the energy it loses per second). */
    function larmorRelativiste(q, gamma, aPerp, aPar) {
      lorentzG(gamma); fini(aPerp, "a⊥"); const ap = aPar === undefined ? 0 : fini(aPar, "a∥");
      return gamma ** 4 * api.larmor(q, Math.hypot(aPerp, gamma * ap));
    }
    /* P = 2σ c β²γ² U_B sin²α, U_B = B²/(2μ0), σ = (8π/3)(q²/(4π ε0 m c²))² (σT for the electron): the power a charge radiates
       while it spirals, larmorRelativiste with a⊥ = |q| v B sin α/(γm). Without o.sinAlpha, averaged over pitch angles drawn
       at random (⟨sin²α⟩ = 2/3): P = (4/3) σ c β²γ² U_B. Model: classical (the photon energy ≪ γmc²), B uniform. */
    function puissanceSynchrotron(gamma, B, o) {
      lorentzG(gamma); pos(B, "B"); const sigma = api.sectionThomson(o);
      const s2 = o && o.sinAlpha !== undefined ? sinA(o) ** 2 : 2 / 3, b = betaDe(gamma);
      return 2 * sigma * C * b * b * gamma * gamma * B * B / (2 * MU0) * s2;
    }
    /* τ = γmc²/P: the time an electron would take to radiate its whole energy at its present rate. Since P ∝ γ² when β ≈ 1,
       the energy falls as γ(t) = γ0/(1 + t/τ0): it is halved after exactly τ0 (refroidir). Model: as puissanceSynchrotron,
       γ ≫ 1, no other loss or gain (no expansion, no new acceleration). */
    function tempsRefroidissement(gamma, B, o) {
      return lorentzG(gamma) * particule(o).m * C * C / puissanceSynchrotron(gamma, B, o);
    }
    function refroidir(gamma0, B, t, o) {
      const tau = tempsRefroidissement(gamma0, B, o); if (!(fini(t, "t") >= 0)) err("t doit être ≥ 0");
      return { gamma: gamma0 / (1 + t / tau), tau };
    }
    /* the largest degree of linear polarisation of synchrotron light from electrons whose number per unit energy falls as
       E^(−p), in a uniform field: (p + 1)/(p + 7/3); the spectrum then falls as ν^(−(p − 1)/2). Model: B uniform over the
       source, no Faraday rotation, γ ≫ 1. A tangled field lowers it. */
    function polarisationMax(p) { if (!(Number.isFinite(p) && p > -1)) err("p doit être > −1"); return (p + 1) / (p + 7 / 3); }

    /* the painter's rule (34.5), generalised: an observer far away in a direction at the angle θ from the velocity receives
       in dt what the charge sent in dt′ = dt/(1 − β cos θ). compression = dt/dt′ = 1 − β cos θ: (34.5p). Exact at distances
       large against the path (terms of order path/distance dropped); written (1 − β) + β(1 − cos θ) so that no digit is lost near θ = 0. */
    function compression(beta, cosTheta) {
      vitesse(beta); const c0 = fini(cosTheta, "cos θ"); if (Math.abs(c0) > 1) err("cos θ doit être entre −1 et 1");
      return (1 - beta) + beta * (1 - c0);
    }
    /* dP/dΩ, the energy radiated per unit solid angle and per unit time of the charge, in units of q²a²/(16π² ε0 c³) (a the
       size of the acceleration). Velocity along z, direction n = (sin θ cos φ, sin θ sin φ, cos θ). "perpendiculaire":
       a along x, [(1 − β cos θ)² − (1 − β²) sin²θ cos²φ]/(1 − β cos θ)⁵. "parallele": a along z, sin²θ/(1 − β cos θ)⁵.
       From the Liénard–Wiechert field (the far field (34.1) at any speed); integrated over the sphere: (8π/3)γ⁴ and (8π/3)γ⁶,
       larmorRelativiste. Exact for a point charge, at the instant considered. */
    function distributionAngulaire(beta, theta, phi, mode) {
      vitesse(beta); fini(theta, "θ"); fini(phi, "φ");
      const s0 = Math.sin(theta), wc = (1 - beta) + 2 * beta * Math.sin(theta / 2) ** 2;       // 1 − β cos θ without loss of digits
      if (mode === "parallele") return s0 * s0 / wc ** 5;
      if (mode === undefined || mode === "perpendiculaire") { const cp = Math.cos(phi); return (wc * wc - (1 - beta) * (1 + beta) * s0 * s0 * cp * cp) / wc ** 5; }
      return err("mode « perpendiculaire » ou « parallele »");
    }
    /* the share of the radiated energy (in the time of the charge) inside the cone of half-angle α around the velocity.
       Integrated over φ in closed form, over w = 1 − β cos θ by Simpson in ln w (the peak near θ = 1/γ stays resolved): error
       below 10⁻⁸ for γ up to 10⁶ (β given to the last digit). Total: (8π/3)γ⁴ ("perpendiculaire") or (8π/3)γ⁶ ("parallele"). */
    function fractionCone(beta, alpha, mode) {
      if (!(vitesse(beta) >= 0)) err("β doit être ≥ 0 : le cône est compté autour de la vitesse"); fini(alpha, "α"); if (alpha < 0 || alpha > Math.PI) err("α doit être entre 0 et π");
      if (mode !== undefined && mode !== "perpendiculaire" && mode !== "parallele") err("mode « perpendiculaire » ou « parallele »");
      const par = mode === "parallele", g2 = 1 / ((1 - beta) * (1 + beta));
      if (alpha === 0) return 0;
      if (beta === 0) { const c = Math.cos(alpha); return par ? (2 - 3 * c + c ** 3) / 4 : (4 - 3 * c - c ** 3) / 8; }
      const f = w => { const u = (w - (1 - beta)) / beta, s2 = Math.max(0, u * (2 - u));      // u = 1 − cos θ, s2 = sin²θ
        return (par ? 2 * Math.PI * s2 / w ** 5 : (2 * Math.PI * w * w - Math.PI * (1 - beta) * (1 + beta) * s2) / w ** 5) / beta; };
      const w0 = 1 - beta, w1 = 1 - beta * Math.cos(alpha);
      const lo = Math.log(Math.min(w0, w1)), hi = Math.log(Math.max(w0, w1));
      return simpson(l => { const w = Math.exp(l); return f(w) * w; }, lo, hi, 4000) / (8 * Math.PI / 3 * g2 * g2 * (par ? g2 : 1));
    }
    /* the half-angle of the cone that holds half the energy (bisection on fractionCone); ≈ 1/γ times a number of order 1 when
       γ ≫ 1 (0,550/γ "perpendiculaire", 0,792/γ "parallele", for γ ≥ 100). */
    function demiCone(beta, mode) {
      let a = 0, b = Math.PI;
      for (let k = 0; k < 60; k++) { const m = (a + b) / 2; if (fractionCone(beta, m, mode) < 0.5) a = m; else b = m; }
      return (a + b) / 2;
    }
    /* a kink: the charge comes along z at βc, turns by the angle δ towards +x on a circle of radius R, then goes on straight.
       Speed constant, so the acceleration β²c²/R is perpendicular to v during the turn (duration T = Rδ/(βc)) and zero
       outside: a toy for the pull of a nucleus (Fig. 34-9 of the source), exact as a trajectory. traj(t′) → [x, y, z],
       t′ = 0 at the start of the turn; for OptOnd.apparent and OptOnd.champLointain. */
    function coude(o) {
      const b = vitesse(fini(o && o.beta, "β")); if (!(b > 0)) err("β doit être > 0");
      const R = pos(o.R, "R"), d = pos(o.delta, "δ"), v = b * C, w = v / R, T = d / w;
      const traj = t => (t <= 0 ? [0, 0, v * t]
        : t <= T ? [R * (1 - Math.cos(w * t)), 0, R * Math.sin(w * t)]
          : [R * (1 - Math.cos(d)) + v * (t - T) * Math.sin(d), 0, R * Math.sin(d) + v * (t - T) * Math.cos(d)]);
      return { traj, T, a: v * w, omega: w };
    }

    /* Doppler. β > 0: the source and the observer draw closer; θ the angle, in the observer's frame, between the source's
       velocity and the line from the source to the observer. All exact in special relativity for a source of proper angular
       frequency ω0 in vacuum, uniform motion (an accelerated source: the same at each instant), observer far away. */
    /* (34.10) with ω1 = ω0: 1/(1 − β), the compression of the pips alone, without the slowing of the moving clock. Sound in
       still air from a moving source obeys it (β = v/vson); light does not. */
    function dopplerSansDilatation(beta) { return 1 / (1 - vitesse(beta)); }
    /* (34.12), (34.12a): ω/ω0 = √(1 − β²)/(1 − β) = √((1 + β)/(1 − β)) on the line of motion. */
    function dopplerAxe(beta) { vitesse(beta); return Math.sqrt((1 + beta) / (1 - beta)); }
    /* (34.12b): ω/ω0 = 1/(γ(1 − β cos θ)); θ = π/2: 1/γ, the transverse effect, pure time dilation. */
    function dopplerSource(beta, cosTheta) { vitesse(beta); return 1 / (gam(beta) * compression(beta, cosTheta)); }
    /* (34.13): ω = (ω0 + k0 v)/√(1 − v²/c²), an observer moving at v towards a source at rest that sends a wave of angular
       frequency ω0 and wave number k0 along the line of motion; any wave (k0 = ω0/c for light in vacuum: (34.14)). The omega
       of transformerOnde. */
    function dopplerObservateur(omega0, k0, v) {
      fini(omega0, "ω0"); fini(k0, "k0");
      return transformerOnde(omega0, k0, v).omega;
    }
    /* (34.17), (34.18): the wave cos(ωt − kx) read by the frame of (34.15), which moves at −v along x: cos(ω′t′ − k′x′) with
       ω′ = γ(ω + kv), k′ = γ(k + ωv/c²): the boost of [ω/c, k, 0, 0] at −v. Exact (Lorentz transformation of the phase, an
       invariant). ω² − k²c² is unchanged. */
    function transformerOnde(omega, k, v) {
      fini(omega, "ω"); fini(k, "k"); const K = boost([omega / C, k, 0, 0], [-vitesse(fini(v, "v") / C), 0, 0]);
      return { omega: C * K[0], k: K[1] };
    }
    /* z = λ_observed/λ0 − 1 = ω0/ω − 1 of a source receding at β on the line of sight (β > 0 recedes here, as astronomers
       count it), and the inverse. */
    function decalageZ(beta) { return 1 / dopplerAxe(-vitesse(beta)) - 1; }
    function vitesseDepuisZ(z) { if (!(Number.isFinite(z) && z > -1)) err("z doit être > −1"); const r = (1 + z) ** 2; return (r - 1) / (r + 1); }

    Object.assign(api, { gyration, frequenceCritique, gammaPourFrequence, larmorRelativiste, puissanceSynchrotron, tempsRefroidissement,
      refroidir, polarisationMax, compression, distributionAngulaire, fractionCone, demiCone, coude, dopplerSansDilatation, dopplerAxe,
      dopplerSource, dopplerObservateur, transformerOnde, decalageZ, vitesseDepuisZ });
  }

  /* ---------- étape « Aberration et impulsion de la lumière » (Feynman I.34.7 à 34.9) ----------
     A plane wave is the four-vector K = [ω/c, kx, ky, kz] (rad·m⁻¹), an event X = [ct, x, y, z] (m); the change of frame is
     the socle's boost. β = v/c, the velocity of the observer relative to the first frame. Model of the
     whole section: flat space-time, inertial frames; a plane wave is infinite (a real beam of width D spreads over λ/D). */
  {
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;
    const vitesse3 = b => {
      const v = typeof b === "number" ? [b, 0, 0] : b;
      if (!Array.isArray(v) || v.length !== 3) err("β doit être un nombre (selon x) ou un vecteur à 3 composantes");
      v.forEach((x, i) => fini(x, "β[" + i + "]")); if (!(Math.hypot(v[0], v[1], v[2]) < 1)) err("|β| doit être < 1");
      return v;
    };
    /* quadriOnde(ω, n, v): (34.19) k = (ω/v) n, n the direction of propagation (normalised here), v the phase velocity (c by
       default: vacuum). Returns [ω/c, kx, ky, kz]. Exact: a definition. In a medium the four-vector is the same, but the medium
       has a frame of its own and v ≠ c. */
    function quadriOnde(omega, n, v) {
      pos(omega, "ω"); const u = unit(n === undefined ? [1, 0, 0] : n, "n"), vp = v === undefined ? C : pos(v, "v");
      const k = omega / vp;
      return [omega / C, k * u[0], k * u[1], k * u[2]];
    }
    /* composantes(λ, α): (34.20) for a wave travelling in the plane (x, y) at α from x: { k = 2π/λ, kx = k cos α, ky = k sin α,
       lambdaX = λ/|cos α|, lambdaY = λ/|sin α| } (Infinity along a crest). Exact for a plane wave. */
    function composantes(lambda, alpha) {
      pos(lambda, "λ"); fini(alpha, "α");
      const k = TAU / lambda, c = Math.cos(alpha), s = Math.sin(alpha);
      const sur = x => (Math.abs(x) < 1e-15 ? Infinity : lambda / Math.abs(x));
      return { k, kx: k * c, ky: k * s, lambdaX: sur(c), lambdaY: sur(s) };
    }
    /* phaseOnde(K, X): (34.21) ωt − k·r, the four-dimensional dot product of K and X (rad). The same number in every inertial
       frame: it counts crests. Exact. */
    function phaseOnde(K, X) { return scalaire4(quadri(K, "K"), quadri(X, "X")); }
    /* ondeVue(K, β): (34.21a) the same wave seen by an observer moving at βc (number: along x; or a vector): { K, omega, k, lambda,
       n (direction of propagation), rapport = ω′/ω, invariant = (ω′/c)² − k′², relative to (ω′/c)² }. Exact. */
    function ondeVue(K, beta) {
      const b = vitesse3(beta), Kp = boost(quadri(K, "K"), b), k = Math.hypot(Kp[1], Kp[2], Kp[3]);
      if (!(Kp[0] > 0)) err("pulsation ≤ 0 : K n'est pas une onde");
      return { K: Kp, omega: C * Kp[0], k, lambda: k > 0 ? TAU / k : Infinity, n: k > 0 ? [Kp[1] / k, Kp[2] / k, Kp[3] / k] : [0, 0, 0],
        rapport: Kp[0] / K[0], invariant: scalaire4(Kp, Kp) / (Kp[0] * Kp[0]) };
    }
    /* aberration(θ, β): a source seen in the frame S in the direction at θ from +x, in the plane (x, y), the light travelling
       along −(cos θ, sin θ). An observer moving at βc along +x sees it at θ′, from the boost of K: (34.23a)
       cos θ′ = (cos θ + β)/(1 + β cos θ). Returns { theta = θ′, ecart = θ − θ′ (the tilt towards the motion), galilee: the
       direction of Bradley's argument, tan θG = sin θ/(cos θ + β) (Galileo's addition of velocities), ecartGalilee, ordre1 =
       β sin θ ((34.23b)), doppler = ω′/ω = γ(1 + β cos θ) }. θ in ]−π, π]. Exact (relativistic); galilee is the model v ≪ c. */
    function aberration(theta, beta) {
      fini(theta, "θ"); if (!(Math.abs(fini(beta, "β")) < 1)) err("|β| doit être < 1");
      const w = ondeVue(quadriOnde(1, [-Math.cos(theta), -Math.sin(theta), 0]), beta);
      const tp = Math.atan2(-w.n[1], -w.n[0]), tg = Math.atan2(Math.sin(theta), Math.cos(theta) + beta);
      const wrap = a => { let r = a - TAU * Math.round(a / TAU); if (r <= -Math.PI) r += TAU; return r; };
      return { theta: tp, ecart: wrap(theta - tp), galilee: tg, ecartGalilee: wrap(theta - tg), ordre1: beta * Math.sin(theta),
        doppler: w.rapport };
    }
    /* devant(β): the fraction of an isotropic sky (sources uniform over the sphere in S) that the moving observer sees in the
       half of the sky ahead of him, cos θ′ > 0, i.e. cos θ > −β: (1 + β)/2. Exact. */
    function devant(beta) { if (!(Math.abs(fini(beta, "β")) < 1)) err("|β| doit être < 1"); return (1 + beta) / 2; }
    /* aberrationAnnuelle(a, T, e): the constant of aberration κ = 2π a/(c T √(1 − e²)) (rad), the amplitude of the annual tilt
       for an orbit of semi-major axis a (m), period T (s) and eccentricity e; first order in v/c (the second order, at most
       (κ²/4) sin 2θ ≈ 2,5 × 10⁻⁹ rad, is left out), observer at the centre of the Earth (the daily rotation adds 0,32″ × cos latitude at most). A star
       at ecliptic latitude b describes an ellipse of semi-axes κ and κ |sin b|: ellipseAberration(κ, b). */
    function aberrationAnnuelle(a, T, e) {
      pos(a, "a"); pos(T, "T"); const ex = e === undefined ? 0 : fini(e, "e"); if (!(ex >= 0 && ex < 1)) err("e doit être dans [0, 1[");
      return TAU * a / (C * T * Math.sqrt(1 - ex * ex));
    }
    function ellipseAberration(kappa, b) { pos(kappa, "κ"); fini(b, "b"); return { a: kappa, b: kappa * Math.abs(Math.sin(b)) }; }

    /* pression(I, o): (34.24a) the pressure of a plane wave of intensity I (W·m⁻², through a surface normal to the beam) on a flat
       surface at incidence o.theta (rad, [0, π/2[, 0 by default), which reflects the part o.R of the power specularly (0 to 1;
       0: black) and absorbs the rest. { normale = (1 + R) I cos²θ/c, tangentielle = (1 − R) I cos θ sin θ/c (Pa), absorbe =
       (1 − R) I cos θ (W·m⁻²) }. Exact for the momentum budget of (34.24); the model is the surface: specular, no diffuse part,
       no transmission, no thermal re-emission (which adds a push of order ε σ T⁴/c on a hot face). */
    function pression(I, o) {
      if (!(Number.isFinite(I) && I >= 0)) err("I doit être ≥ 0");
      const R = o && o.R !== undefined ? fini(o.R, "R") : 0, th = o && o.theta !== undefined ? fini(o.theta, "θ") : 0;
      if (R < 0 || R > 1) err("R doit être dans [0, 1]"); if (th < 0 || th >= Math.PI / 2) err("θ doit être dans [0, π/2[");
      const c = Math.cos(th), s = Math.sin(th);
      return { normale: (1 + R) * I * c * c / C, tangentielle: (1 - R) * I * c * s / C, absorbe: (1 - R) * I * c };
    }
    /* forceFaisceau(P, o): the force (N) of a beam of power P (W) caught whole by the surface, same o as pression:
       { normale = (1 + R) P cos θ/c, tangentielle = (1 − R) P sin θ/c }. 2P/c for a mirror at normal incidence. */
    function forceFaisceau(P, o) {
      if (!(Number.isFinite(P) && P >= 0)) err("P doit être ≥ 0");
      const th = o && o.theta !== undefined ? o.theta : 0, p = pression(1, o), c = Math.cos(th);
      return { normale: p.normale * P / c, tangentielle: p.tangentielle * P / c };
    }
    /* quantum(λ): (34.25) to (34.27) for light of wavelength λ (m) in vacuum: { nu, omega, k, W = ħω (J), eV = W/e, p = ħk
       (kg·m·s⁻¹), K = [W, pc, 0, 0] (J) }. Exact relations; W/(pc) = 1 because k = ω/c in vacuum. */
    function quantum(lambda) {
      pos(lambda, "λ"); const k = TAU / lambda, omega = C * k, W = Cst.hbar * omega, p = Cst.hbar * k;
      return { nu: C / lambda, omega, k, W, eV: W / Cst.e, p, K: [W, p * C, 0, 0] };
    }
    /* pousseeOscillateur(ω0, ω, E0, o): an electron bound elastically (electronElastique, o.gamma the damping, o.q, o.m) driven
       by the wave E = E0 cos ωt along x, B = E/c along y, travelling along +z. The magnetic force q v B is along +z (34.24):
       { E(t), v(t), F(t) = q v(t) E(t)/c, Fmoy = ⟨F⟩ (mean over a period, by sampling), Pmoy = q⟨vE⟩ (power taken from the
       wave, closed form), rapport = c Fmoy/Pmoy (1 by (34.24); null when nothing is absorbed),
       retard = lag of x behind E, sigma = Pmoy/S with S = ε0 c E0²/2 }. Model: v ≪ c (the magnetic force does not change the
       motion along x), steady state, linear spring. With γ = 0 the lag is 0 or π: v and E are in quadrature, nothing is absorbed,
       Fmoy = 0. */
    function pousseeOscillateur(w0, w, E0, o) {
      const r = api.electronElastique(w0, w, E0, o), q = particule(o).q;
      const v = r.v, Pmoy = q * E0 * v.re / 2;                                // ⟨q v E⟩ with v(t) = Re(v e^{iωt}), E = E0 cos ωt
      const vt = t => v.re * Math.cos(w * t) - v.im * Math.sin(w * t), Et = t => E0 * Math.cos(w * t);
      const S = api.intensiteMoyenne(E0), F = t => q * vt(t) * Et(t) / C, N = 64, T = TAU / w;
      let s = 0; for (let i = 0; i < N; i++) s += F(i * T / N);                // exact mean of a degree-2 trigonometric polynomial
      const Fmoy = s / N;
      return { E: Et, v: vt, F, Fmoy, Pmoy, rapport: Pmoy === 0 ? null : C * Fmoy / Pmoy, retard: r.retard, vmax: Cx.abs(v),
        sigma: S > 0 ? Pmoy / S : 0 };
    }
    /* voileSolaire(o): { A (m²), m (kg), R (0 to 1), r (m, au by default) } → { S = L⊙/(4π r²), F = (1 + R) S A/c (normal
       incidence), a = F/m, g = GM⊙/r², rapport = a/g }. rapport does not depend on r: both fall as 1/r². Model: point Sun of
       nominal luminosity, flat sail facing the Sun, specular. */
    function voileSolaire(o) {
      if (!o) err("voileSolaire({ A, m, R, r })");
      const A = pos(o.A, "A"), m = pos(o.m, "m"), r = o.r === undefined ? Cst.au : pos(o.r, "r");
      const S = Cst.L_sun / (4 * Math.PI * r * r), F = pression(S, { R: o.R }).normale * A, a = F / m, g = Cst.GM_sun / (r * r);
      return { S, F, a, g, rapport: a / g };
    }

    Object.assign(api, { quadriOnde, composantes, phaseOnde, ondeVue, aberration, devant, aberrationAnnuelle, ellipseAberration, pression,
      forceFaisceau, quantum, pousseeOscillateur, voileSolaire });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.OptOnd = api;
})(typeof self !== "undefined" ? self : this);

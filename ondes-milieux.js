/* OndesMilieux — le module commun du monde « Ondes dans les milieux ». Pur, sans DOM, UMD (global OndesMilieux). SI partout.
   Chaque étape ajoute sa section juste avant la ligne « fin des sections », par Edit seulement, avec
   Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par
   chaque étape. Le module ne requiert que constantes.js et lecons/complexes.js (Cx : douze sections calculent en
   amplitudes complexes) ; ce qui demande un autre module va dans le module de la leçon (lecons/<slug>.js). Une section
   lit le socle (en tête du code) au lieu de réécrire ses contrôles, ses complexes, ses différences ou ses intégrales.
   Un nom n'est exporté qu'une fois, sous son propre nom (test/ondes-milieux-noms.test.js). Chaque fonction est un
   modèle : son domaine est dans son commentaire. Les erreurs lèvent un message en français : elles signalent un appel
   faux. Tests : test/ondes-milieux*.test.js.

   Sommaire
   Socle, partagé par les sections et non exporté : err, fini, positif, positif0, entier, fonction, v3, cplx (contrôles
     des arguments) ; dot, cross, norm ; divergence(F, p, h), rotationnel(F, p, h) (différences centrées) ;
     simpson(f, a, b, n) ; inv(z), par(a, b) (impédances en parallèle) ; racineC(z) (racine principale). Trois fonctions
     du socle sont exportées par l'étape qui les introduit : nDepuisN2, peau, pulsationPlasmaElectrons.
   Étape « Dipôle oscillant et charge mobile » (Feynman II.21.4 à 21.6)
     champsDipole(p, pp, ppp, r, theta)  { Er, Et, Bphi } : (21.23) et (21.26) en coordonnées sphériques, dipôle selon z ;
                                p, ṗ, p̈ pris à l'instant retardé t − r/c. Exact pour un dipôle ponctuel.
     dipoleOscillant(p0, w)     p = p0 cos ωt selon z : { p(t), pp(t), ppp(t), potentiels(P, t) → { phi, A } ((21.25), (21.18)),
                                champs(P, t) → { E, B } cartésiens, spherique(r, theta, t) → { Er, Et, Bphi } }.
     termesDipole(kr)           { statique, induction, rayonnement, part } : amplitudes des termes en p, ṗ et p̈ de E_θ à
                                θ = 90°, en unités de k³ p0/(4π ε0) ; part = poids du terme de rayonnement dans leur somme.
     ecartQuasiStatique(kr)     { B: { instantane, retardeSeul }, E: { … } } : écart relatif d'amplitude au champ exact (21.23)
                                ou (21.26) de la formule statique sans retard, et de la même formule retardée sans le terme correctif.
     tempsRetarde(pos, P, t)    t' tel que t − t' = |P − pos(t')|/c, pour une trajectoire de vitesse toujours < c (bissection).
     lienardWiechert(q, pos, vit, P, t)  { phi, A, tRet, r, facteur } : (21.33) et (21.34) ; facteur = 1/(1 − v·r̂/c) au retard.
     balayage(o)                la somme (21.30) sur des tranches d'épaisseur w pour un cube de côté a qui avance à vr vers le
                                point d'observation, à r' du centre : { somme (× q/r'), N, b, bExact, tranches } ; b = a Σ parts.
     chargeUniforme(q, v)       charge à vitesse constante v selon x, à l'origine en t = 0 : { tRet(P, t) (21.37), rRet(P, t),
                                phi(P, t) (21.39), A(P, t) (21.39a), equipotentielle(phi0) → { ax, ay } (21.39c) }.
   Étape « Lumière et solution générale des équations de Maxwell » (Feynman II.21.1 à 21.3)
     champCharge(traj, p, t, o)   (21.1) terme à terme : { tau, r, u, coulomb, extrapole, rayonne, E, B }, o = { q, h } ; temps retardé par tempsRetarde ci-dessus ;
                                dérivées par différences centrées de pas h en temps d'observation.
     champUniforme(q, x0, v, p, t)  champ exact d'une charge en mouvement rectiligne uniforme (position actuelle) : le contrôle.
     oscillante(o)              charge q qui oscille selon x (a = βc/ω), vue en (0, r, 0) : échantillons des trois termes sur
                                une période, amplitudes, écart de « 1 + 2 » au Coulomb instantané. o = { beta, lambda, r, n, q }.
     gaussienne(S0, tau, t0)    { f, d, d2 } : S0 exp(−((t − t0)/τ)²) et ses deux dérivées, exactes.
     ondeSpherique(S, r, t, c)  (21.13) : S(t − r/c)/(4π r).
     bilanBoule(src, R, t, c, n)  (21.7) intégrée sur une boule de rayon R : { flux, temps, somme, S }, somme = −S(t) pour tout R.
     potentielRetarde(els, p, t, c)  (21.14) : Σ s(2, t − r12/c) dV2/(4π r12), éléments { x, dV, s(t) }, s scalaire ou vecteur.
     antenne(o)                 segment selon z, courant uniforme I0 cos ωt, charges ±(I0/ω) sin ωt aux bouts :
                                { phi(p, t), A(p, t) } par (21.15) et (21.16), o = { L, w, I0, n }.
     lorenz3D(src, p, t, o)     ∇·A + (1/c²)∂φ/∂t en trois dimensions, et l'échelle |∂φ/∂t|/c² : (21.6).
     amplitudeAntenne(L, lambda, r, theta, n)  |A|/A_point : { retarde, instantane, lointain = |sin X/X|, X = πL cos θ/λ }.
   Étape « Équations de Maxwell » (Feynman II.18.1 à 18.3)
     tranche(Q, v, D, s0)       tranche de charge gaussienne entre plans infinis, entraînée à v et qui diffuse (D) : { rho, j,
                                E (Gauss seul), deplacement = ε0 ∂E/∂t (différence en temps, sans j), total = j + ε0 ∂E/∂t (nul),
                                divJ, dRho, sigma } ; B = 0 par symétrie, que (18.1) contredirait.
     condensateur(o)            condensateur plan circulaire chargé par un fil, quasi statique : courant et ε0 dΦE/dt à travers
                                le disque ou le « sac » bordé par une boucle de rayon r (autour du fil ou entre les armatures),
                                B = μ0 total/(2πr) ((18.8), (18.9)), ampereSeul, courant radial de l'armature, jD, dE/dt.
     sphereQuiFuit(o)           petite sphère qui perd Q0 e^(−t/τ), charges émises radialement à u : { Q(r, t), j, E,
                                deplacement, dQdt, total } ; (18.5) et (18.7), total nul.
     regimeClassique(o)         { beta2, gamma, lambda, quantique = λ/L, gravite = GM/(rc²) } d'un corps m, v, L : ce que le
                                tableau de la physique classique néglige.
     systemesClassiques()       pendule, GPS, Mercure, proton du LHC, électron de conduction du cuivre, électron de l'hydrogène.
   Étape « Propagation d'un champ et vitesse de la lumière » (Feynman II.18.4 à 18.6)
     courant(o)                 { J(t), Q(t) } : courant surfacique d'une nappe, A·m⁻¹, nul avant t = 0, monté linéairement
                                en o.tau jusqu'à o.J, arrêté (même rampe) au bout de o.T ; Q = ∫J dt, C·m⁻¹.
     nappeChamps(J)             { E, B } juste à côté d'une nappe de courant surfacique J établi : J/(2ε0c) et J/(2ε0c²).
     potentielNappe(Q, x, t)    Ay = Q(t − |x|/c)/(2ε0c), φ = 0 : potentiels de Lorenz de la nappe de nappe(J, x, t)
                                (étape « Ondes planes et sphériques »), Q = ∫J dt.
     conditionsFront(v, B)      { faraday, ampere, rapport } : le E qu'exige chaque loi pour un front qui avance à v,
                                (18.10) et (18.13) ; rapport = c²/v², 1 seulement pour v = c.
     yee1D(o)                   Faraday et Ampère–Maxwell pas à pas à une dimension (schéma de Yee) : { x, Ey, xB, Bz, t, tB }.
     forceCharges(q1, q2, r, eps0), forceFils(I1, I2, d, l, eps0c2), forceFilsFinis(…)  Coulomb ; fils parallèles infinis,
                                I1 I2 l/(2π ε0c² d) ; deux segments de longueur l face à face, I1 I2 (√(l² + d²) − d)/(2π ε0c² d).
     mesurerC(m), changerUnite(k)  { eps0, eps0c2, c } d'une pesée de charges et d'une pesée de fils ; les mêmes quand l'unité
                                de charge vaut k coulombs : ε0 et ε0c² changent, c non.
     JAUGES, jaugeExemple(id, psi0, w)  fonctions de jauge ψ(x, t) et leurs dérivées : aucune, statique, onde, croissante.
     jauger(pot, psi), champsDepuisPotentiels(pot, x, t, h, k)  (18.20) ; E = −∇φ − ∂A/∂t, B = ∇ ∧ A par différences centrées.
     residuLorenz(pot, x, t, h, k)  ∇·A + (1/c²) ∂φ/∂t à une dimension, nul en jauge de Lorenz (18.23).
   Étape « Ondes planes et sphériques » (Feynman II.20.1 à 20.4)
     Z0                         1/(ε0 c) ≈ 376,73 Ω.
     paliers(liste)             { J(t), marches } : intensité surfacique en paliers [[t0, J0], …] et ses sauts { t, dJ }.
     nappe(J, x, t)             (20.3) { Ey, Bz, retard } : nappe de courant infinie en x = 0, J(t) selon +y.
     planeGenerale({ f, g, F, G })  (20.25) : (r, t) → { E, B }, ondes vers +x (f, F) et vers −x (g, G).
     maxwellVide(champ, r, t, h)  résidus de (20.12) par différences centrées, et l'échelle des termes.
     polarisation(a, b, φ)      Ey = a cos u, Ez = b cos(u + φ) : { A, B, psi, type, sens } de l'ellipse décrite par E.
     ondePlane(n, E0, f)        (20.27a) E = E0 f(t − n·r/c), B = n ∧ E/c : (r, t) → { E, B }.
     ondesPlanes(ondes, λ)      { k, omega, psi(x, y, t), champ(r, t) } : somme d'ondes planes du plan xy polarisées selon z.
     interfrange(λ, α)          λ/(2 sin(α/2)) pour deux ondes planes faisant l'angle α.
     residuOnde(ψ, r, t, h)     ∇²ψ − ψ_tt/c² par différences, rapporté au plus grand terme.
     regime(L, f)               { lambda, rapport = L/λ, phase, delai, periode } : un système de taille L sous la fréquence f.
     wien(T), X_WIEN, B_WIEN    λ_max = hc/(x k_B T) d'un corps noir.
     EAU, indiceEau(λ)          indice de l'eau à 293,15 K (Cauchy par les raies C et F).
     angleSortie(n, b), arcPrimaire(n)  θ = 4r − 2i d'un rayon d'impact b ; son maximum, l'angle de l'arc primaire.
     profilArc(n, o)            { at(θ), thetaMax } : intensité de l'arc primaire selon θ, disque solaire compris.
     spectreArc(θ, lambdas, o)  { I, pic } : le spectre reçu à l'angle θ (le graphe de l'aveugle).
     spherique(f, sens)         (20.35) : (r, t) → f(t ∓ r/c)/r.
     laplacienRadial(ψ, r, h)   (20.31) par différences.
     energieCoquille(ψ, t, r0, r1, n)  ∫ 4π r² ψ² dr sur la coquille.
     niveauEcart(r1, r2)        20 log10(r2/r1) dB : la baisse de niveau d'une onde en 1/r.
   Étape « Énergie du champ et vecteur de Poynting » (Feynman II.27.1 à 27.3)
     fondu(t, tau)              ½ (1 + tanh(t/τ)) : la marche douce de 0 à 1.
     chargeVue(o)               une charge Q passe du point 1 (x = 0) au point 2 (x = L), comptée au temps t′ d'un référentiel
                                à βc : { gamma, decalage = βL/c, saut(t′), transit(t′) } ; « saut » sans rien entre les deux
                                (total ≠ Q hors de β = 0), « transit » par un fil à la vitesse w (total = Q pour tout β).
     ligneConductrice(o)        impulsion plane E_y, B_z (schéma de Yee, cΔt = Δx) qui traverse une plaque ohmique σ :
                                bilan (27.4) d'une boîte [a, b] par m² : { t, U, sorti, joule, residu, images }.
     densiteEnergie(E, B), poynting(E, B)  (27.14), (27.15).
     bilanLocal(champ, p, t, o)  ∂u/∂t + ∇·S + E·j en un point, par différences : (27.6) ; { dudt, divS, Ej, residu, echelle }.
     identitePoynting(E, B, p, h)  ∇·(B ∧ E) et E·(∇ ∧ B) − B·(∇ ∧ E) : (27.11) ; naif = E·(∇ ∧ B) seul, la faute de (27.9).
     ondeMixte(o)               onde plane E0 vers +x et onde réfléchie r E0 : E, B, u, S, et les moyennes exactes
                                <u> = ε0E0²(1 + r²)/2, <S> = ε0cE0²(1 − r²)/2, vitesse = c(1 − r²)/(1 + r²).
     ondePlaneFlux(S)           { Eeff, Beff, u } d'une onde plane de flux moyen S.
   Étape « Exemples de flux d'énergie et impulsion du champ » (Feynman II.27.4 à 27.6)
     energieRepartie(o)         sphère chargée (« boule » ou « coquille ») : énergie dans la sphère de rayon r selon ε0E²/2
                                (champ) et selon ρφ/2 (charges), et le terme de bord qui les sépare : (27.14q).
     condensateurFlux(o)        condensateur plan circulaire qui se charge : S entrant par le bord, dU/dt, (27.19), (27.20).
     chargeAimant(o)            charge ponctuelle et dipôle magnétique : E, B, S, S dans le plan équatorial, flux de S sur une
                                sphère (nul), moment cinétique du champ μ0 q m/(4π d).
     boiteEinstein(o)           la boîte d'Einstein : recul (27.22), p = U/c, et la forme exacte U L/(M c² + U).
     fluxParticules(o)          flux d'énergie et densité de quantité de mouvement d'un faisceau de particules : rapport 1/c².
     pressionLumiere(I, R)      densité de quantité de mouvement I/c², apport I/c, pression (1 + R) I/c.
   Étape « Impédances et réseaux en régime sinusoïdal » (Feynman II.22.1 à 22.4)
     COMPOSANTS, composant(type, ω, o)  bobine, condensateur, résistance réels (modèles à constantes localisées) : { Z, Zideal,
                                ecart = |Z − Z_idéal|/|Z_idéal|, rapportTaille = taille/λ } ; (22.6), (22.9), (22.10).
     domaineIdeal(type, tol, o)  { wmin, wmax } : la plage de ω où le composant réel reste à tol près de son modèle idéal.
     generateur(ℰ, zi, Z), norton(ℰ, zi), chargerNorton(J, y, Z)  générateur réel sur une charge Z : { I, V, ecart } ;
                                sa forme de Norton J = ℰ/zi, y = 1/zi, qui donne la même tension.
     resoudre(reseau)           lois de Kirchhoff (22.17) et relation de chaque branche { de, vers, z, e } ou { de, vers, j } :
                                { V, I, U, noeuds, residuNoeuds } ; élimination de Gauss complexe.
     compter(reseau), mailles(reseau, sol)  n − 1 lois des nœuds, b − n + 1 mailles indépendantes ; Σ U sur chacune (22.14).
     thevenin(reseau, a, b), brancher(reseau, a, b, Z)  (22.22) : { E, z, Icc, J, y } vus des bornes a, b ; une charge Z.
     deuxGenerateurs(o)         le réseau de (22.20) et (22.21) : { I1, I2, I3, sansZ1, bornes } ; (22.23) par thevenin.
     pont(o), maxwellWien(R1, C1, R2, R3, ω)  pont d'impédances : { Ig, desequilibre } ; équilibre za zd = zb zc.
   Étape « Puissance en régime sinusoïdal et filtres » (Feynman II.22.5 à 22.8).
     regimeSinusoidal(z, I0, ω)  i = I0 cos ωt dans z = R + iX : u(t) (22.26), p(t), P = I0²R/2 (22.26a), Q, S, cos φ, valeurs efficaces.
     puissanceMoyenne(U, I)      ½ Re(U I*) des amplitudes complexes (22.26b).
     echelle(z1, z2, N, zt)      impédance d'entrée d'une échelle de N cellules (z1 en série, z2 en dérivation) fermée sur zt.
     impedanceCaracteristique(z1, z2), propagation(z1, z2)  (22.27), la racine physique (|α| ≤ 1) ; α (22.29).
     tensions(z1, z2, N, zt, E)  V et I à l'entrée de chaque cellule ; fermée sur z0, Vn = αⁿ E (22.30).
     echelleLC(L, C, ω, type)    échelle L-C passe-bas ou passe-haut : z0, (22.28), α, |α|, déphasage, ω0, Rc = √(L/C).
     lissage(o)                  double alternance U0|sin ωt| à travers N cellules L-C fermées sur R : harmoniques, sortie, ondulation.
     mutuelle(o)                 deux bobines couplées, M remplacée par deux générateurs liés (22.35) : I1, I2, zin, impédance ramenée (22.35a).
   Étape « Amplificateur opérationnel et filtres actifs » (programme de CPGE, X.elec_ao.1 à 3).
     AO, aoModele(ao)           µA741 et TL081 (A0, fT, SR, Vsat) ; le modèle à un pôle A(f) = A0/(1 + i f/fa), fa = fT/A0.
     montage(type, o), boucle(m, ao)  amplificateur non inverseur ou inverseur { beta, a, G idéal, Re } ; gain à A fini
                                a A/(1 + Aβ), écart à f = 0, fréquence de coupure fa(1 + A0β) ≈ β fT.
     simulerMontage(m, ao, ve, duree, n), limites(m, ao, E, f)  le montage dans le temps (saturation, vitesse de balayage) ;
                                la première limite atteinte par E sin 2πft : bande, saturation ou balayage.
     sommateur(R2, entrees, A0), integrateur(o)  −R2 Σ vk/Rk ; dérive due au décalage Vio, fuite Rp, pseudo-intégrateur.
     FILTRES_ACTIFS, filtreActif(type, o)  passe-bas et passe-haut inverseurs du premier ordre, Sallen–Key passe-bas :
                                { H0, f0, Q, H(f, ao) } avec AO idéal ou réel ; bodeH(H), asymptote(F, f) ; deuxCellules(x).
     schmitt(o), entreeBruitee(E, f, b)  comparateur simple ou à hystérésis : seuils, sortie et basculements ; entrée parasitée.
     astable(o)                 multivibrateur : T = 2RC ln((1 + β)/(1 − β)) et simulation à vitesse de balayage finie.
     oscillateurWien(o), mesurerOscillation(t, y)  oscillateur à pont de Wien : f0, σ = (K − 3)/(2RC), simulation saturée ;
                                amplitude, fréquence, taux de distorsion harmonique.
   Étape « Lignes de transmission et guide rectangulaire » (Feynman II.24.1 à 24.4)
     ligneCoaxiale(a, b, o)     { L0, C0, v, z0, facteurVitesse, fcTE11 } : (24.10), C0 = 2π ε0 εr/ln(b/a), (24.5), (24.7),
                                (24.11) ; o = { epsr, mur } ; fcTE11 ≈ v/(π(a + b)), où la ligne cesse d'être TEM seule.
     pertesCoaxiale(ligne, f, σ)  { delta, Rs, R0, rapport = R0/(L0ω), alpha, dBparMetre, lambda } : pertes des conducteurs
                                par effet de peau, δ ≪ a.
     reflexion(RL, z0)          (RL − z0)/(RL + z0) ; 1 pour une ligne ouverte (RL = Infinity).
     ligneEchelle(o)            la ligne découpée en n cellules L0Δx, C0Δx, générateur e(t) et Rg en x = 0, RL en x = l,
                                saute-mouton en temps : { x, dt, v, z0, gamma, images: [{ t, V, I }] }.
     guideRect(a, b, f, o)      mode TE_n0 d'un guide a × b : kx, kz, k′, fc, λ0, λg (24.19), vPhase (24.25), vGroupe (24.27),
                                profondeur 1/k′, dBparMetre, masse ħω_c/c², champ(x, z, t, E0) → { Ey, Bx, Bz },
                                energieLineique(E0), puissance(E0) (24.32p, E0 la crête de E_y) ; o = { n, epsr }.
     pulsationGuide(kz, a, o)   √(ω_c² + c² kz²) : la relation de dispersion du mode.
     modesRect(a, b, fmax, o)   [{ type, m, n, fc }] : les modes TE_mn et TM_mn sous fmax, par fréquence de coupure croissante.
     paquetGuide(a, b, f1, f2, o)  deux ondes TE10 : { E(z, t), enveloppe(z, t), porteuse(z, t), vEnveloppe = Δω/Δk, vPhase }.
   Étape « Cavités résonantes » (Feynman II.23.1 à 23.5)
     besselJ(n, x), besselJp(n, x)  J_n et sa dérivée, ordre entier, par l'intégrale de Bessel (|x| ≤ 100, erreur ~10⁻¹⁵).
     zeroBessel(n, k, derivee)  k-ième zéro positif de J_n, ou de J_n' : 2,405 (23.18), 5,520, 3,832, 1,841…
     serieCondensateur(x, ordre)  (23.15) tronquée à « ordre » termes : { E, B, termesE, termesB } en E0 et E0/c, x = ωr/c.
     condensateurHF(a, f)       armatures de rayon a : { x, Ebord = J0(x), Emoyen, ecartUniforme, ecartParabole, rZero, f1pc }.
     BOBINE, bobineEchelle(ω, o)  bobine réelle en N cellules (Fig. 23-3(b)) : impédance entre ses bornes, par récurrence ;
                                reseauBobine(ω, o) le même réseau en branches pour resoudre et thevenin.
     resonances(Z, ω0, ω1)      maxima de |Z(ω)| ; bobineSimple(ω, o, Cs), ajusterSimple(o)  le modèle (r + iωL) ∥ Cs calé
                                sur la première résonance de l'échelle.
     METAUX, cavite(a, h, σ)    boîte cylindrique, mode de (23.18) : { w0, f0, lambda, delta, Q = ah/(δ(a + h)), largeur }.
     champsCavite(r, a), reponse(f, f0, Q)  E = J0, B = J1 dans la boîte ; courbe de résonance 1/(1 + Q²(f/f0 − f0/f)²).
     modesCylindre(a, h, fmax), modesBoite(a, b, d, fmax), weyl(V, f)  modes TM et TE triés par fréquence ; 8πVf³/(3c³).
     caviteChargee(o)           cavité rentrante { a, b, h, g } : C = ε0πb²/g, L = μ0 h ln(a/b)/2π, f0 localisée et f0 par
                                deux lignes coaxiales en court-circuit ; kb, kh, ecartCapacite, f0Boite.
   Étape « Conversion électromécanique » (programme de PSI, X.conversion_em.1 à 3)
     transfoIdeal({ m, U1, Z })  u2 = m u1, i1 = m i2 (bornes homologues) : { U2, I2, I1, Zvue = Z/m², S1, S2 }.
     noyau({ N1, U1, f, S, l, mur })  { phiMax, Bmax, reluctance, Lm, Imu } : le courant magnétisant que fixe U1.
     ligne({ P, U, R, cosphi }), rendementTransfo({ Sn, P0, Pk, x, cosphi })  pertes en ligne R I² ; rendement du
                                transformateur, pertes fer P0 et cuivre x² Pk, maximum en x = √(P0/Pk).
     entreferPhase(θ, i, o), champStator(θ, t, o)  champ radial d'une phase (N spires dans 2n encoches) ; deux phases en
                                quadrature : le champ glissant. energieEntrefer(B, o, m) = RLe/(2μ0) ∫ B² dθ.
     machineSynchrone(o), phaseSynchrone(o)  Γ = Γmax sin α, équilibres, stabilité, couple moyen hors synchronisme ;
                                une phase de l'induit V = Rs I + jLsω I + E et son bilan Pabs = Pcu + Pem.
     mcc(o)                     moteur à courant continu : Γ = Φi, e = ΦΩ, régime établi, τ, caractéristique, démarrage (RK4).
     hacheur(o), rendementHacheur(o)  hacheur série sur (R, L, Ec), régime périodique exact, ondulation, moyennes et bilan ;
                                pertes de conduction du transistor et de la diode.
     onduleur(o), redresseur(o), harmonique(x, k)  pont en H pleine onde ou MLI sur (R, L) ; pont de diodes sur (R, L) ;
                                coefficient de Fourier d'ordre k d'une période échantillonnée.
   Étape « Ondes dans un diélectrique » (Feynman II.32.1 à 32.4) ; la réponse en temps (RK4) est dans
   lecons/maxwell-dans-un-dielectrique.js.
     polarisabiliteAtome(ω, modes, o)  α(ω) complexe, m³ : (32.6), (32.7) ; modes [{ w0, gamma, f }], o = { q, m } (électron).
     deplacement(E0, ω, mode, o)  (32.3) : { x, module, retard ∈ [0, π], p = q x } sous E = E0 e^(iωt).
     nDepuisN2(n²)               { re, im, nR, nI } : n = nR − i nI (32.35), nR ≥ 0 ; nI ≥ 0 pour un milieu passif ; sans
                                soustraction qui perde les chiffres d'une absorption faible.
     indices(ω, N, modes, o)     { alpha, Na, n2: { libre, local }, n: { gaz (32.26), libre (32.25), local (32.31) } }.
     nAlpha(n)                   3 (n² − 1)/(n² + 2) : (32.32) résolue pour Nα, n réel ou complexe.
     resonanceLocale(N, mode, o)  ω0′² = ω0² − f N q²/(3 ε0 m) (32.31a) : la résonance déplacée par le champ local.
     onde(ω, n, E0)              (32.36) : { Ex(z, t), enveloppe, lambda, vitesse, longueur = c/(ω nI), beta (32.36a), transmission, dB }.
     nIDepuisDB(a, λ)            nI d'une atténuation a en dB·m⁻¹ à la longueur d'onde λ dans le vide.
     chargesPolarisation(P, r, t, h)  (32.9), (32.10) par différences, et le résidu de continuité ∂ρ/∂t + ∇·j.
     AZOTE, azote()              N2 à 589 nm, gaz (273,15 K, 1 atm) et liquide (77,29 K) ; le liquide prédit depuis le gaz.
     indicesReels(Nα)            { gaz, libre, local } : les trois indices de indices() pour Nα réel, loin des résonances.
   Étape « Modes guidés et technique des guides » (Feynman II.24.5 à 24.8) ; guideRect, modesRect, ligneCoaxiale plus haut.
     modeRect(type, m, n, a, b, f)  mode TE_mn ou TM_mn : kc (24.16p), fc, kz, k′, λg, vitesses, champ(x, y) sur la section.
     ligneFendue(o)              sonde le long du guide, onde incidente + réfléchie (Γ) ou évanescente : (24.12p) ; nœuds,
                                λg mesurée, rapport d'onde stationnaire.
     attenuationTE10(guide, σ)   pertes des parois du mode TE10, effet de peau ; puissanceCoaxiale(ligne, Emax) (24.11p).
     coupleurTrous(o)            coupleur directif à N trous espacés de d : avant Σw, arrière |Σw e^(−2i kz j d)| (24.17p).
     bessel0(x), hankel2(x)      J0 et Y0 (Abramowitz et Stegun 9.4.1 à 9.4.3) ; H0⁽²⁾ = J0 − iY0.
     sourceEntreParois(o)        fil source entre deux plans conducteurs : champ par les modes et par la rangée d'images.
     anglesImages(λ0, a, centre)  directions des ondes planes de la rangée d'images : (24.33) à (24.35), tous ordres.
   Étape « Mélanges, métaux et effet de peau » (Feynman II.32.5 à 32.7) ; convention e^{i(ωt − kz)}, n = nR − i nI.
     indiceLL(L)                n réel tel que 3(n² − 1)/(n² + 2) = L, l'inverse de nAlpha (32.37) ; nDepuisN2 et nAlpha plus haut.
     SACCHAROSE, concentrations(w, ρ)  solutions de saccharose à 293,15 K, raie D : { w, ρ, n } (NBS C457, ICUMSA) ;
                                c1, c2 en mol·m⁻³ ; densiteSaccharose(w) interpolée entre deux lignes.
     REGLES, regleMelange(regle, calage)  f(n) = c1 a1 + c2 a2 calée sur l'eau et une ligne : « ll » (32.37),
                                « sansChampLocal » (n² − 1), « gladstoneDale » (n − 1) ; { a1, a2, predire, lignes, ecartA2, ecartN }.
     polarisabilite(a)          { alpha = a/N_A (m³, p = ε0αE), refractionMolaire = a/3 }.
     METAUX_LIBRES, drude(m)    σ à 293 K, N électrons libres par m³ ; { tau (32.43), gamma (32.40), wp, fp, lambdaP, ftau, fsigma }.
     vitesseDerive(E, τ)        (32.39).
     indiceMetal(ω, m)          (32.42) : { n2, n, nR, nI, attenuation = c/(ω nI), wtau, wSurSigma, drude }.
     marcheDrude(o)             électrons libres à une dimension, vols exponentiels de durée moyenne τ (Fig. 32-2) :
                                { t, x, derive, attendu = eEτ/m, naive = eEτ/2m, collisions }.
     peau(σ, ω), penetration(ω, m)  (32.48) ; longueur d'atténuation exacte de (32.42) contre (32.48) et c/ωp.
     indiceHauteFrequence(ω, ωp)  (32.51) : 1 − (ωp/ω)².
     ondeDansMetal(ω, m), domainePeau(m, tol)  Re E/E0 dans le métal (Fig. 32-3) ; la fréquence où (32.48) s'écarte de tol.
   Étape « Réflexion et réfraction aux interfaces » (Feynman II.33.1 à 33.3) ; surface dans le plan yz, incidence dans xy.
     snellDescartes(n1, n2, θi)  (33.1), (33.2) : { thetaR, thetaT, sinT, total }.
     reflectances(n1, n2, θi)   (33.3), (33.4), (33.5) d'une marche nette : { perp, par, normale, thetaT, brewster, critique }.
     profilTanh(n1, n2, w), profilCouche(n1, nc, d, n2)  ε(x) d'une transition lisse de largeur w, d'une couche d'épaisseur d.
     traverseeInterface(profil, o)  (33.22) et (33.24) intégrées à travers la transition (RK4), polarisation s ou p :
                                { r, R, T, points: [{ x, eps, Ex, Ey, Ez, cBx, cBy, cBz, Px, Dx, dPx, flux }] }.
     reflectanceEpstein(n1, n2, w, λ0, θ)  R exacte du profil tanh, polarisation s : sinh(πa(k1 − k2))²/sinh(πa(k1 + k2))².
     ondeAnisotrope(o), residusOndeMilieu(onde, r, t, h)  onde plane dans un milieu de ε diagonal (verre, calcite) :
                                { n, k, E, B = k ∧ E/ω (33.9), D, S, angleSk, champ } ; résidus de Maxwell par différences.
   Étape « Coefficients de réflexion et réflexion totale » (Feynman II.33.4 à 33.6) ; même géométrie, e^{i(ωt − k·r)},
   n = nR − i nI.
     qx(n, n1 sin θi)           k_x/k0 = √(n² − (n1 sin θi)²), Im ≤ 0 : (33.45) ; imaginaire pur au-delà de l'angle critique.
     fresnelInterface(n1, n2, θi)  (33.51) à (33.54), n2 réel ou complexe : { s: { r, t, R, T }, p: { rB, tB, r = −rB, t, R, T },
                                q1, q2, sinT, totale } ; R + T = 1.
     champsAuBord(n1, n2, θi, pol)  Ez, By, Bx (s) ou Bz, Ey, Dx (p) de part et d'autre de la face : (33.26) à (33.31).
     reflectanceMetal(ω, m)     incidence normale sur un métal de Drude (indiceMetal) : { R, hagenRubens, absorbe, n, profondeur }.
     indiceLorentz(ω, o)        n² = nInf² + wp²/(w0² − ω² + iγω) : l'absorbeur fort qui réfléchit ce qu'il absorbe.
     reflexionTotale(n1, n2, θi, λ0)  { critique (33.59), kappa, kI, profondeur, profondeurIntensite, phaseS, phaseP, dephasage }.
     lame(o)                    couche n2 d'épaisseur d entre n1 et n3 (Airy) : { r, t, R, T, profil(x) } ; réflexion totale frustrée.
   Étape « Masse électromagnétique » (Feynman II.28.1 à 28.3) ; energieRepartie et champUniforme plus haut.
     chargeEtendue(o)           sphère de charge q, rayon a, « coquille » ou « boule », au repos : { U0 (28.1), mElec (28.4)
                                = (4/3) U0/c², mPrime = U0/c² (28.8), fraction(r), rayon(f) }.
     electronClassique()        { r0 (28.6), lambdaC = ħ/(m_e c), alpha, aMasse (28.5), aEnergie } d'après CODATA.
     sphereMobile(o)            la même sphère contractée, en mouvement uniforme v selon x : E, B = v ∧ E/c², g, w au point p.
     impulsionChamp(o)          p et U du champ intégrés sur tout l'espace ; pFormule = γ mElec v (28.7), UFormule = γ U0 (1 + β²/3).
     masseTransverse(β, modèle)  « lorentz » γ ou « abraham » (sphère rigide, 1902), rapportée à la masse au repos.
   Étape « Quadrivecteurs de l'électrodynamique » (Feynman II.25.1 à 25.3) ; quadrivecteurs comme dans relativite.js,
   [At, Ax, Ay, Az] dans une seule unité.
     quadriCourant(ρ0, β)       [cρ, jx, jy, jz] en A·m⁻² d'un nuage de densité propre ρ0 qui va à βc : cρ0 [γ, γβ].
     densiteMesuree(J, β)       ρ que mesure un observateur qui va à βc : γ(J_t − β·J)/c = (U·J)/c², U sa quadrivitesse.
   Étape « Plasmas : propagation et confinement » (programme de CPGE, X.plasmas) ; e^{i(ωt − kz)}, n = nR − i nI.
     pulsationPlasmaElectrons(n)  ωp = √(n e²/(ε0 mₑ)).
     plasmaFroid(o), PLASMAS, KEV  o = { n, T, L } : { wp, fp, lambdaD, ND, lnLambda, nu (e–i, Spitzer), vth, eF, couplage,
                                criteres, verdict, plasma } ; milieux types (ionosphère, vent solaire, ITER, centre du Soleil, cuivre).
     conductivitePlasma(ω, n, ν), puissanceCedee(ω, n, ν, E0)  σ = n e²/(mₑ(ν + iω)) ; ½ Re σ E0².
     ondePlasma(ω, ωp, ν)       n² = 1 − ωp²/(ω(ω − iν)) : { n, k, regime, vphi, vg, lambda, profondeur }.
     interfacePlasma(ω, ωp, ν)  vide | plasma sous incidence normale : { r, t, R, transmis, champ(z, t), enveloppe(z) }.
     coucheChapman(o), hauteurVirtuelle(n(z), f, o), ionogramme(n(z), fs, o)  couche de Chapman ; sondage vertical :
                                { zr, hv = z0 + ∫ dz/√(1 − X), retard } ; frequenceMaxUtilisable(fo, hv, D) loi de la sécante.
     K_IONO, retardIono(TEC, f), combinaisonSansIono(P1, P2, f1, f2)  retard de groupe 40,3 TEC/f² ; combinaison bifréquence.
     giration(T, B, m, q), betaPlasma(n, Te, Ti, B)  rayon et pulsation cyclotron thermiques ; β = n k(Te + Ti)/(B²/2μ0).
     champMiroir(B0, R, L), boris(o), coneDePerte(R), miroir(o)  miroir magnétique paraxial ; pousseur de Boris (E = 0) ;
                                sin² αc = 1/R ; une orbite lancée au centre : { piege, zmax, zPredit, mu, pts }.
     E_ALPHA, E_FUSION, BH_DT   3,5 MeV, 17,6 MeV (en keV) et les coefficients de Bosch et Hale pour D–T.
     reactiviteDT(T), lawson(T), minimumLawson(), bilanFusion(o)  ⟨σv⟩ de Bosch et Hale (keV → m³·s⁻¹) ; n τE d'allumage
                                12 kT/(⟨σv⟩ Eα) ; bilan 0-D { Palpha, Pfusion, Ppertes, Pext, Q, allumage }.
   Étape « Limites de la théorie de Maxwell » (Feynman II.28.4 à 28.6)
     mouvementSinusoidal(A, ω)  x = A sin ωt et ses dérivées { x, v, a, j, s } (régime établi, Aω < c).
     forcePropreHaltere(o)      { F, Ex, tau } : force d'une moitié d'un haltère chargé sur l'autre (q/2 en y = ±d/2, mouvement selon x),
                                champ de Liénard–Wiechert exact, retardé ou avancé (o.sens). Le modèle de (28.9).
     serieForcePropre(o)        la même force en série de d/c : −m ẍ ± K q² x⃛/(3c³) − 3K q² d x⁗/(16c⁴) ; masse = U/c².
     masseHaltere(q, d)         K q²/(4 d c²). facteurMutuel(kd) : interférence de deux dipôles côte à côte, G(0) = 1.
     periodeHaltere(o)          une période : travail contre la force propre, mEff, b, et l'énergie rayonnée croisée attendue.
     contraintesPoincare(q, a)  sphère chargée en surface : U, masses (28.4) et (28.8), rapport 4/3, pression σ²/(2ε0).
     potentielBopp(r, a, n)     4π ε0 φ/q d'une charge immobile avec le noyau de Bopp (gaussien en s², passé seul) ; fini en 0.
     potentielYukawa(r, R)      e^{−r/R}/r, (28.18). masseYukawa(R) : { kg, J, eV } = ħ/(Rc). porteeYukawa(mc²) : ħc/(mc²).
   Étape « Champs d'une charge rapide » (Feynman II.26.1, 26.2) ; tempsRetarde, lienardWiechert, champUniforme plus haut ;
   le tenseur du champ et le mouvement en notation relativiste sont dans relativite.js.
     freinage(v0, tau)          charge qui va à v0 selon x, freine uniformément de t = 0 à τ, puis reste au repos :
                                { pos(t), vit(t), acc(t), arret = v0 τ/2 }.
     potentielsProjetes(q, pos, vit, P, t)  (26.1) appliquée à la position projetée P′ + v′(t − t′) : { phi, A, tRet,
                                retardee, projetee, v } ; égale à lienardWiechert pour tout mouvement.
     champProjete(q, pos, vit, P, t)  { E, B, projetee } : le champ qu'aurait la charge si elle gardait v′ ; faux dès
                                qu'elle accélère.
     profilHeaviside(β, ψ), largeurAngulaire(β)  E/E_Coulomb à la même distance, ψ angle avec v (26.6p) ; demi-largeur
                                angulaire à mi-hauteur autour du plan transverse (≈ 0,766/γ), null si β ≤ 0,608.
     lignesHeaviside(β, n)      angles ψ des n lignes de champ : celles de la charge au repos, x contracté par γ.
     impulsionTransverse(q, v, b)  { gamma, Ey(t), Ex(t), crete, duree, integrale } : le champ vu à la distance b quand la
                                charge passe (26.3q) ; integrale = 2Kq/(bv), sans γ.
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const api = {};

  /* ---------- Socle : ce que les sections partagent (non exporté, sauf par l'étape qui l'introduit) ---------- */
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const Cx = node ? require("./lecons/complexes.js") : root.Cx;
  const err = m => { throw new Error("ondes dans les milieux : " + m); };
  const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
  const positif = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être strictement positif"); return x; };
  const positif0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être positif ou nul"); return x; };
  const entier = (n, nom, min) => { if (!Number.isInteger(n) || n < min) err(nom + " doit être un entier ≥ " + min); return n; };
  const fonction = (f, nom) => { if (typeof f !== "function") err(nom + " doit être une fonction"); return f; };
  const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3 || v.some(x => typeof x !== "number" || !isFinite(x))) err(nom + " doit être un vecteur [x, y, z] fini"); return v; };
  /* a complex impedance, index, voltage or current: { re, im } (the shape of Cx) or a real number */
  const cplx = (z, nom) => {
    if (typeof z === "number") return Cx.c(fini(z, nom));
    if (z && typeof z.re === "number" && typeof z.im === "number" && isFinite(z.re) && isFinite(z.im)) return Cx.c(z.re, z.im);
    return err(nom + " doit être un nombre ou un complexe { re, im } fini");
  };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => Math.hypot(a[0], a[1], a[2]);
  /* centred differences in space of a field F(p) → [Fx, Fy, Fz], step h (default 1e-5 × the size of the point, as AnaVec):
     error O(h²) */
  const pasH = (p, h) => (h === undefined ? 1e-5 * Math.max(1, ...p.map(Math.abs)) : positif(h, "h"));
  const decale = (p, i, d) => p.map((x, k) => (k === i ? x + d : x));
  const derivee = (F, p, i, j, h) => (F(decale(p, j, h))[i] - F(decale(p, j, -h))[i]) / (2 * h);
  const divergence = (F, p, h) => { h = pasH(p, h); return derivee(F, p, 0, 0, h) + derivee(F, p, 1, 1, h) + derivee(F, p, 2, 2, h); };
  const rotationnel = (F, p, h) => { h = pasH(p, h); return [derivee(F, p, 2, 1, h) - derivee(F, p, 1, 2, h), derivee(F, p, 0, 2, h) - derivee(F, p, 2, 0, h), derivee(F, p, 1, 0, h) - derivee(F, p, 0, 1, h)]; };
  /* Simpson's rule on [a, b], n even intervals: error of order h⁴ f⁽⁴⁾ (b − a)/180 */
  const simpson = (f, a, b, n) => { const h = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
  /* impedances: 1/z, and a and b in parallel */
  const inv = z => Cx.div(Cx.c(1), z), par = (a, b) => inv(Cx.add(inv(a), inv(b)));
  /* principal square root (Re ≥ 0; on the negative axis Im takes the sign of Im z, −0 counting as negative), the larger
     part from the square root, the other from Im z = 2 Re Im: no cancellation when re ≫ |im| or re ≪ −|im|. */
  function racineC(z) {
    const r = Math.hypot(z.re, z.im);
    if (r === 0) return Cx.c(0, z.im);
    if (z.re >= 0) { const a = Math.sqrt((r + z.re) / 2); return Cx.c(a, z.im / (2 * a)); }
    const b = Math.sqrt((r - z.re) / 2) * (z.im < 0 || Object.is(z.im, -0) ? -1 : 1); return Cx.c(z.im / (2 * b), b);
  }
  /* the index n = nR − i nI (32.35) whose square is n2: nR ≥ 0; for a passive medium (Im n² ≤ 0) nI ≥ 0. A real negative
     n² gives n = −i √|n²|: no propagation, a field that decays (nI > 0). Exported by « Ondes dans un diélectrique ». */
  function nDepuisN2(n2) {
    const z = cplx(n2, "n²"), r = racineC(z.im === 0 ? Cx.c(z.re, -0) : z);
    return { re: r.re, im: r.im, nR: r.re, nI: -r.im };
  }
  /* δ = √(2ε0c²/(σω)) = √(2/(μ0σω)) (32.48): the low-frequency limit of (32.42), for ωτ ≪ 1 and ωε0/σ ≪ 1 (32.49).
     Exported by « Mélanges, métaux et effet de peau ». */
  const peau = (sigma, w) => Math.sqrt(2 * Cst.eps0 * Cst.c * Cst.c / (positif(sigma, "σ") * positif(w, "ω")));
  /* ωp = √(n e²/(ε0 mₑ)) of n free electrons per m³. Exported by « Plasmas : propagation et confinement ». */
  const pulsationPlasmaElectrons = n => Math.sqrt(positif(n, "n") * Cst.e * Cst.e / (Cst.eps0 * Cst.m_e));

  /* ---------- Étape « Dipôle oscillant et charge mobile » (II.21.4 à 21.6) ---------- */
  {
    const C = Cst.c, C2 = C * C, K = 1 / (4 * Math.PI * Cst.eps0);
    const sub = (a, b) => a.map((x, i) => x - b[i]);

    /* (21.26) and (21.23) for p along z, in spherical components. p* = p + (r/c) ṗ (21.27), all at t − r/c.
       E = K [3 (p*·r̂) r̂ − p*]/r³ + K/(c² r) (p̈ ∧ r̂) ∧ r̂ ; with ẑ = cos θ r̂ − sin θ θ̂ and (ẑ ∧ r̂) ∧ r̂ = sin θ θ̂.
       B = K/c² (ṗ + (r/c) p̈) ∧ r̂/r² ; ẑ ∧ r̂ = sin θ φ̂. Exact for a point dipole (size ≪ r and ≪ λ), charges slow
       enough that the whole dipole is taken at one retarded time (v ≪ c). */
    function champsDipole(p, pp, ppp, r, theta) {
      [p, pp, ppp, theta].forEach((x, i) => fini(x, ["p", "ṗ", "p̈", "θ"][i])); positif(r, "r");
      const ps = p + (r / C) * pp, s = Math.sin(theta), co = Math.cos(theta);
      return {
        Er: K * 2 * ps * co / r ** 3,
        Et: K * (ps * s / r ** 3 + ppp * s / (C2 * r)),
        Bphi: K / C2 * (pp + (r / C) * ppp) * s / (r * r),
      };
    }

    /* p(t) = p0 cos ωt along z, the dipole at the origin. Potentials (21.25) and (21.18), fields from champsDipole,
       all three read at the retarded time t − r/c. P = [x, y, z] in m. */
    function dipoleOscillant(p0, w) {
      fini(p0, "p0"); fini(w, "ω"); if (w < 0) err("ω doit être positive ou nulle");
      const p = t => p0 * Math.cos(w * t), pp = t => -w * p0 * Math.sin(w * t), ppp = t => -w * w * p0 * Math.cos(w * t);
      const spherique = (r, theta, t) => { const tr = fini(t, "t") - positif(r, "r") / C; return champsDipole(p(tr), pp(tr), ppp(tr), r, theta); };
      function potentiels(P, t) {
        v3(P, "P"); fini(t, "t"); const r = norm(P); if (!(r > 0)) err("le point d'observation ne doit pas être sur le dipôle");
        const tr = t - r / C;
        return { phi: K * (p(tr) + (r / C) * pp(tr)) * P[2] / r ** 3, A: [0, 0, K / C2 * pp(tr) / r] };
      }
      function champs(P, t) {
        v3(P, "P"); const r = norm(P); if (!(r > 0)) err("le point d'observation ne doit pas être sur le dipôle");
        const rho = Math.hypot(P[0], P[1]), theta = Math.atan2(rho, P[2]), f = spherique(r, theta, t);
        const st = rho / r, ct = P[2] / r, cp = rho > 0 ? P[0] / rho : 1, sp = rho > 0 ? P[1] / rho : 0;
        /* r̂ = (st cp, st sp, ct), θ̂ = (ct cp, ct sp, −st), φ̂ = (−sp, cp, 0) */
        const E = [f.Er * st * cp + f.Et * ct * cp, f.Er * st * sp + f.Et * ct * sp, f.Er * ct - f.Et * st];
        return { E, B: [-f.Bphi * sp, f.Bphi * cp, 0] };
      }
      return { p, pp, ppp, potentiels, champs, spherique };
    }

    /* the three terms of E_θ at θ = 90° for p = p0 cos ωt, amplitudes in units of K k³ p0 (k = ω/c, x = kr):
       p/r³ → 1/x³, (r/c) ṗ/r³ → 1/x², p̈/(c² r) → 1/x. They are equal at x = 1, r = λ/2π. Exact amplitudes of (21.26). */
    function termesDipole(kr) {
      const x = positif(kr, "kr"), s = 1 / x ** 3, i = 1 / x ** 2, r = 1 / x;
      return { statique: s, induction: i, rayonnement: r, part: r / (s + i + r) };
    }

    /* complex amplitudes for p = Re(p0 e^(iωt)), x = kr, at θ = 90°. B: exact (1 + ix) e^(−ix) (21.23), Biot–Savart
       without delay (21.24): 1, the same delayed: e^(−ix). E_θ: exact (1 + ix − x²) e^(−ix) (21.26), static: 1, static
       delayed: e^(−ix). The error is |approx − exact|/|exact|. To lowest order: instantaneous x²/2, delayed alone x. */
    function ecartQuasiStatique(kr) {
      const x = positif(kr, "kr"), ret = Cx.polar(1, -x), un = Cx.c(1), ecart = (a, e) => Cx.abs(Cx.sub(a, e)) / Cx.abs(e);
      const eB = Cx.mul(Cx.c(1, x), ret), eE = Cx.mul(Cx.c(1 - x * x, x), ret);
      return { B: { instantane: ecart(un, eB), retardeSeul: ecart(ret, eB) }, E: { instantane: ecart(un, eE), retardeSeul: ecart(ret, eE) } };
    }

    /* t' with t − t' = |P − pos(t')|/c. g(t') = t − t' − |P − pos(t')|/c decreases strictly when the speed stays below c,
       g(t) ≤ 0: one root, bracketed by stepping back, then bisected to the last bit. Exact up to rounding. */
    function tempsRetarde(pos, P, t) {
      if (typeof pos !== "function") err("pos doit être une fonction t → [x, y, z]");
      v3(P, "P"); fini(t, "t");
      const g = u => t - u - norm(sub(P, v3(pos(u), "pos(t)"))) / C;
      let hi = t, gh = g(hi);
      if (gh === 0) return t;
      let d = Math.max(norm(sub(P, pos(t))) / C, 1e-30), lo = t - d, k = 0;
      while (g(lo) < 0) { d *= 2; lo = t - d; if (++k > 200) err("pas de temps retardé : la charge va-t-elle plus vite que c ?"); }
      for (let i = 0; i < 200; i++) {
        const m = (lo + hi) / 2;
        if (m === lo || m === hi) break;
        if (g(m) > 0) lo = m; else hi = m;
      }
      return (lo + hi) / 2;
    }

    /* (21.33) and (21.34): φ = K q/[r − v·r/c]_ret, A = v_ret φ/c². r: vector from the charge at t' to P.
       pos, vit: functions of time; |vit| < c. Exact for a point charge in vacuum, any motion (Lorenz gauge). */
    function lienardWiechert(q, pos, vit, P, t) {
      fini(q, "q"); if (typeof vit !== "function") err("vit doit être une fonction t → [vx, vy, vz]");
      const tRet = tempsRetarde(pos, P, t), r = sub(P, pos(tRet)), v = v3(vit(tRet), "vit(t)"), rn = norm(r);
      if (!(rn > 0)) err("le point d'observation est sur la charge");
      if (!(norm(v) < C)) err("la charge doit aller moins vite que c");
      const den = rn - dot(v, r) / C, phi = K * q / den;
      return { phi, A: v.map(x => x * phi / C2), tRet, r, facteur: rn / den };
    }

    /* (21.30) by hand. The line of sight is x, the observer at x = 0, the cube of side a centred at −R at t' = 0 and moving
       at vr along +x (toward the observer when vr > 0); the observation time is R/c, so the centre's retarded distance is R.
       Slices of thickness w perpendicular to x, slice i read at its own retarded time t_i = R/c − |x_i|/c: the charge it
       holds is the overlap of the slice with the cube at t_i. somme = Σ (q_i/q) (R/|x_i|): 1/(1 − vr/c) when w → 0, a ≪ R.
       b = Σ (charge of slice i)/(ρ a²), Feynman's N w without the rounding of the two end slices; bExact = a/(1 − vr/c).
       Exact sum of the model; the planar slices assume a ≪ R. */
    function balayage(o) {
      const a = positif(o.a, "a"), R = positif(o.R, "R"), w = positif(o.w, "w"), vr = fini(o.vr, "vr");
      if (!(Math.abs(vr) < C)) err("|vr| doit rester inférieure à c");
      if (!(a < R)) err("le cube doit être plus petit que sa distance");
      const bExact = a / (1 - vr / C), demi = bExact / 2 + 2 * w, tobs = R / C, tranches = [];
      let somme = 0, parts = 0;
      const n0 = Math.floor((-R - demi) / w), n1 = Math.ceil((-R + demi) / w);
      for (let n = n0; n <= n1; n++) {
        const x0 = n * w, x1 = x0 + w, x = (x0 + x1) / 2, ti = tobs - Math.abs(x) / C, xc = -R + vr * ti;
        const part = Math.max(0, Math.min(x1, xc + a / 2) - Math.max(x0, xc - a / 2)) / a;
        if (part > 0) { tranches.push({ x, t: ti, xc, part }); somme += part * R / Math.abs(x); parts += part; }
      }
      return { somme, N: tranches.length, b: parts * a, bExact, tranches };
    }

    /* charge q moving at constant v along x, at the origin at t = 0 (Fig. 21-7). tRet: (21.37), the root with t' < t.
       phi: (21.39), A = v φ/c² along x (21.39a). Equipotential φ = phi0 around the present position:
       γ²(x − vt)² + ρ² = (γ K q/phi0)² (21.39c), an ellipsoid of semi-axes ax = K q/phi0 (along v) and ay = γ ax.
       Exact for uniform motion since the beginning of time, |v| < c. */
    function chargeUniforme(q, v) {
      fini(q, "q"); fini(v, "v"); if (!(Math.abs(v) < C)) err("|v| doit rester inférieure à c");
      const b2 = (v / C) ** 2, g = 1 / Math.sqrt(1 - b2);
      function tRet(P, t) {
        v3(P, "P"); fini(t, "t");
        return (t - v * P[0] / C2 - Math.sqrt((P[0] - v * t) ** 2 + (1 - b2) * (P[1] ** 2 + P[2] ** 2)) / C) / (1 - b2);
      }
      const rRet = (P, t) => C * (t - tRet(P, t));
      function phi(P, t) {
        v3(P, "P"); fini(t, "t");
        const X = g * (P[0] - v * t), s = Math.sqrt(X * X + P[1] ** 2 + P[2] ** 2);
        if (!(s > 0)) err("le point d'observation est sur la charge");
        return K * q * g / s;
      }
      const A = (P, t) => [v * phi(P, t) / C2, 0, 0];
      function equipotentielle(phi0) {
        fini(phi0, "phi0"); if (!(phi0 * q > 0)) err("phi0 doit avoir le signe de q");
        const ax = K * q / phi0; return { ax, ay: g * ax };
      }
      return { gamma: g, tRet, rRet, phi, A, equipotentielle };
    }

    Object.assign(api, { champsDipole, dipoleOscillant, termesDipole, ecartQuasiStatique, tempsRetarde, lienardWiechert, balayage, chargeUniforme });
  }

  /* ---------- Étape « Lumière et solution générale des équations de Maxwell » (II.21.1 à 21.3) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0;
    const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const mul = (k, a) => [k * a[0], k * a[1], k * a[2]];
    const vc = c => c == null ? C : positif(c, "c");

    /* (21.1) term by term, u = e_r′ the unit vector from the retarded position to p. Derivatives with respect to the
       observation time t, by centred differences of step h (default: 1/2000 of the time light takes to cross r′, or o.h).
       K = q/(4π ε0). Term 1 retarded Coulomb, term 2 its linear extrapolation over r′/c, term 3 the part in 1/r′.
       Exact up to the O(h²) of the differences, for any motion slower than light. §21-1: the retarded time is tempsRetarde
       (section « Dipôle oscillant et charge mobile », bisection). */
    function champCharge(traj, p, t, o = {}) {
      if (o.c != null) err("c est celle de Constantes"); const c = C, q = o.q == null ? 1 : fini(o.q, "q"), K = q / (4 * Math.PI * EPS0);
      const at = s => { const tau = api.tempsRetarde(traj, p, s), d = sub(p, traj(tau)), r = norm(d); if (!(r > 0)) err("le point d'observation est sur la charge"); return { tau, r, u: mul(1 / r, d) }; };
      const m = at(t), h = o.h == null ? m.r / c / 2000 : positif(o.h, "h");
      const a = at(t - h), b = at(t + h), w = s => mul(1 / (s.r * s.r), s.u);
      const coulomb = mul(K, w(m));
      const extrapole = mul(K * m.r / c / (2 * h), sub(w(b), w(a)));
      const rayonne = mul(K / (c * c * h * h), add(sub(b.u, mul(2, m.u)), a.u));
      const E = add(add(coulomb, extrapole), rayonne);
      return { tau: m.tau, r: m.r, u: m.u, coulomb, extrapole, rayonne, E, B: mul(1 / c, cross(m.u, E)) };
    }

    /* Exact field of a charge in uniform rectilinear motion x(t) = x0 + v t (|v| < c), from its present position:
       E = K (1 − β²) R/(R³ (1 − β² sin²ψ)^{3/2}), ψ the angle between v and R. The check on (21.1). */
    function champUniforme(q, x0, v, p, t) {
      fini(q, "q"); v3(x0, "x0"); v3(v, "v"); v3(p, "p"); fini(t, "t");
      const K = q / (4 * Math.PI * EPS0), b2 = dot(v, v) / (C * C);
      if (!(b2 < 1)) err("la vitesse doit être inférieure à c");
      const R = sub(p, add(x0, mul(t, v))), r = norm(R);
      const s2 = b2 === 0 ? 0 : 1 - dot(R, v) ** 2 / (r * r * dot(v, v));
      return mul(K * (1 - b2) / (r ** 3 * (1 - b2 * s2) ** 1.5), R);
    }

    /* A charge q oscillating along x, x = a sin ωt with a = βc/ω (peak speed βc), seen at (0, r, 0), on the perpendicular.
       n samples over one period of the x components (the static Coulomb field, along y, is not in them); amplitudes =
       half the peak-to-peak swing. ecart: (term 1 + term 2) − instantaneous Coulomb field of the present position. */
    function oscillante(o) {
      const beta = positif(o.beta, "β"), lambda = positif(o.lambda, "λ"), r = positif(o.r, "r"), n = entier(o.n == null ? 48 : o.n, "n", 8);
      if (!(beta < 1)) err("β doit être inférieur à 1");
      const w = 2 * Math.PI * C / lambda, a = beta * C / w, T = lambda / C, q = o.q == null ? 1 : fini(o.q, "q");
      const K = q / (4 * Math.PI * EPS0), traj = s => [a * Math.sin(w * s), 0, 0], p = [0, r, 0], h = T / 4000;
      const ech = [];
      for (let i = 0; i < n; i++) {
        const t = T * (2 + i / n), f = champCharge(traj, p, t, { q, h });
        const d = sub(p, traj(t)), inst = K * d[0] / norm(d) ** 3;
        ech.push({ t: t - 2 * T, coulomb: f.coulomb[0], extrapole: f.extrapole[0], rayonne: f.rayonne[0], total: f.E[0], instantane: inst, ecart: f.coulomb[0] + f.extrapole[0] - inst });
      }
      const amp = k => { const v = ech.map(e => e[k]); return (Math.max(...v) - Math.min(...v)) / 2; };
      return { a, T, k: w / C, ech, amplitudes: { coulomb: amp("coulomb"), extrapole: amp("extrapole"), rayonne: amp("rayonne"), total: amp("total"), instantane: amp("instantane"), ecart: amp("ecart") } };
    }

    /* §21-2. A Gaussian source strength and its two derivatives, exact. */
    function gaussienne(S0, tau, t0 = 0) {
      fini(S0, "S0"); positif(tau, "τ"); fini(t0, "t0");
      const f = t => S0 * Math.exp(-(((t - t0) / tau) ** 2));
      return { f, d: t => -2 * (t - t0) / (tau * tau) * f(t), d2: t => (4 * (t - t0) ** 2 / tau ** 4 - 2 / (tau * tau)) * f(t) };
    }

    /* (21.13): the outgoing spherical wave of a point source of strength S(t), for r > 0. */
    const ondeSpherique = (S, r, t, c) => { fonction(S, "S"); positif(r, "r"); fini(t, "t"); c = vc(c); return S(t - r / c) / (4 * Math.PI * r); };

    /* (21.7) integrated over a ball of radius R around the point source, for ψ of (21.13):
       flux of ∇ψ through the sphere = −S(t − R/c) − (R/c) S′(t − R/c), exact;
       (1/c²)∫ ∂²ψ/∂t² dV = (1/c²) ∫0^R r S″(t − r/c) dr, by Simpson with n steps.
       flux − temps = −S(t) for every R: the time term is the whole correction to Gauss, of order (R/cτ)². */
    function bilanBoule(src, R, t, c, n = 200) {
      if (!src || typeof src.f !== "function" || typeof src.d !== "function" || typeof src.d2 !== "function") err("la source = { f, d, d2 }");
      positif(R, "R"); fini(t, "t"); c = vc(c); entier(n, "n", 2); if (n % 2) n++;
      const tR = t - R / c, flux = -src.f(tR) - R / c * src.d(tR);
      const temps = simpson(r => r * src.d2(t - r / c), 0, R, n) / (c * c);
      return { flux, temps, somme: flux - temps, S: src.f(t) };
    }

    /* §21-3, (21.14): superposition of the retarded spherical waves of source elements { x, dV, s(t) }. s returns a number
       or a vector; the result has the same shape. A point of observation on an element is refused. */
    function potentielRetarde(els, p, t, c) {
      if (!Array.isArray(els) || !els.length) err("au moins un élément de source");
      v3(p, "p"); fini(t, "t"); c = vc(c);
      let tot = null;
      for (const e of els) {
        const r = norm(sub(p, v3(e.x, "x")));
        if (!(r > 0)) err("le point d'observation est sur un élément de source");
        const v = fonction(e.s, "s")(t - r / c), k = fini(e.dV, "dV") / (4 * Math.PI * r);
        const term = Array.isArray(v) ? mul(k, v) : k * v;
        tot = tot == null ? term : Array.isArray(term) ? add(tot, term) : tot + term;
      }
      return tot;
    }

    /* A straight antenna on z from −L/2 to L/2, uniform current I0 cos ωt, so charges ±(I0/ω) sin ωt pile up at the ends:
       charge is conserved (dq/dt = I). φ by (21.15) from the two end charges, A = A_z ẑ by (21.16) from n current
       elements (midpoint rule, error O((L/n)²)). Source s = ρ/ε0 for φ, j/(ε0 c²) for A, as in §21-3. */
    function antenne(o) {
      const L = positif(o.L, "L"), w = positif(o.w, "ω"), I0 = fini(o.I0 == null ? 1 : o.I0, "I0"), n = entier(o.n == null ? 400 : o.n, "n", 1);
      const dz = L / n, q = s => I0 / w * Math.sin(w * s);
      const charges = [{ x: [0, 0, L / 2], dV: 1, s: s => q(s) / EPS0 }, { x: [0, 0, -L / 2], dV: 1, s: s => -q(s) / EPS0 }];
      const courant = Array.from({ length: n }, (_, i) => ({ x: [0, 0, -L / 2 + (i + 0.5) * dz], dV: dz, s: s => [0, 0, I0 * Math.cos(w * s) / (EPS0 * C * C)] }));
      return { phi: (p, t) => potentielRetarde(charges, p, t), A: (p, t) => potentielRetarde(courant, p, t) };
    }

    /* (21.6) checked in three dimensions: ∇·A + (1/c²) ∂φ/∂t at p, centred differences of step dx and dt;
       echelle = |(1/c²) ∂φ/∂t|, to judge the residue against. src = { phi(p, t), A(p, t) }. */
    function lorenz3D(src, p, t, o = {}) {
      v3(p, "p"); fini(t, "t");
      const dx = positif(o.dx == null ? 1e-4 : o.dx, "dx"), dt = positif(o.dt == null ? 1e-12 : o.dt, "dt");
      const div = divergence(q => src.A(q, t), p, dx);
      const dphi = (src.phi(p, t + dt) - src.phi(p, t - dt)) / (2 * dt) / (C * C);
      return { residu: div + dphi, echelle: Math.abs(dphi), div, dphi };
    }

    /* The same antenna in steady state, at one frequency: A_z ∝ Σ e^{−ik r_i} dz / r_i (retarded), Σ dz / r_i (without
       retardation), each divided by the point-source value L/r. Far field of a uniform line: |sin X / X|, X = π L cos θ/λ,
       valid when r ≫ L and r ≫ L²/λ. θ measured from the axis of the antenna, observer at distance r from its middle. */
    function amplitudeAntenne(L, lambda, r, theta, n = 400) {
      positif(L, "L"); positif(lambda, "λ"); positif(r, "r"); fini(theta, "θ"); entier(n, "n", 1);
      const k = 2 * Math.PI / lambda, dz = L / n, p = [r * Math.sin(theta), 0, r * Math.cos(theta)];
      let re = 0, im = 0, inst = 0;
      for (let i = 0; i < n; i++) {
        const ri = norm(sub(p, [0, 0, -L / 2 + (i + 0.5) * dz]));
        re += Math.cos(k * ri) / ri * dz; im -= Math.sin(k * ri) / ri * dz; inst += dz / ri;
      }
      const X = Math.PI * L * Math.cos(theta) / lambda;
      return { retarde: Math.hypot(re, im) * r / L, instantane: inst * r / L, lointain: Math.abs(X) < 1e-12 ? 1 : Math.abs(Math.sin(X) / X) };
    }

    Object.assign(api, { champCharge, champUniforme, oscillante, gaussienne, ondeSpherique, bilanBoule, potentielRetarde,
      antenne, lorenz3D, amplitudeAntenne });
  }

  /* ---------- Étape « Équations de Maxwell » (II.18.1 à 18.3) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = 1 / (Cst.eps0 * Cst.c * Cst.c), H = Cst.h, HBAR = Cst.hbar;

    /* A slab of charge between infinite planes: Q per m² of the faces, gaussian of width s0 at x = 0 at t = 0, carried at v
       and spreading by diffusion D ≥ 0. The same packet as MagInd.paquet1D: σ² = s0² + 2Dt, ρ = Q/(√(2π)σ) e^(−(x − vt)²/2σ²),
       j = ρv − D ∂ρ/∂x, an exact solution of (18.2). Plane symmetry: E is along x and Gauss gives it alone,
       E = (charge left of x − Q/2)/ε0 (no outside field), by Simpson over 12σ. The displacement current ε0 ∂E/∂t is a
       centred difference in time of that E: it never uses j, so total = j + ε0 ∂E/∂t = 0 is a check, not an input.
       B = 0 by symmetry, so (18.1) would demand j = 0. Exact in this geometry, for t ≥ 0; the difference step is a
       thousandth of the time the packet takes to move by σ. */
    function tranche(Q, v, D, s0) {
      fini(Q, "Q"); fini(v, "v"); fini(D, "D"); positif(s0, "s0");
      if (D < 0) err("D doit être positif ou nul");
      const temps = t => { fini(t, "t"); if (t < 0) err("t doit être positif ou nul"); return t; };
      const sig2 = t => s0 * s0 + 2 * D * t, sigma = t => Math.sqrt(sig2(temps(t)));
      const rho = (x, t) => { const s = sig2(temps(t)), u = fini(x, "x") - v * t; return Q / Math.sqrt(2 * Math.PI * s) * Math.exp(-u * u / (2 * s)); };
      const j = (x, t) => rho(x, t) * (v + D * (x - v * t) / sig2(t));
      const gauche = (x, t) => {
        const s = Math.sqrt(sig2(t)), a = v * t - 12 * s, b = v * t + 12 * s;
        if (x <= a) return 0;
        return simpson(y => rho(y, t), a, Math.min(x, b), 600);
      };
      const E = (x, t) => (gauche(fini(x, "x"), temps(t)) - Q / 2) / EPS0;
      const pas = t => 1e-3 * Math.sqrt(sig2(t)) / (Math.abs(v) + D / Math.sqrt(sig2(t)) || 1);
      const deplacement = (x, t) => { temps(t); const h = Math.min(pas(t), t > 0 ? t : Infinity);
        if (t > 0) return EPS0 * (E(x, t + h) - E(x, t - h)) / (2 * h);
        const k = pas(0); return EPS0 * (-3 * E(x, 0) + 4 * E(x, k) - E(x, 2 * k)) / (2 * k); };     // t = 0: one-sided, second order
      const total = (x, t) => j(x, t) + deplacement(x, t);
      const dRho = (x, t) => { const h = pas(t); return (rho(x, t + h) - rho(x, Math.max(0, t - h))) / (t + h - Math.max(0, t - h)); };
      const divJ = (x, t) => { const h = 1e-4 * Math.sqrt(sig2(temps(t))); return (j(x + h, t) - j(x - h, t)) / (2 * h); };
      return { rho, j, E, deplacement, total, divJ, dRho, sigma };
    }

    /* A parallel-plate capacitor charged through a straight wire on its axis: circular plates of radius R, current I.
       Model: quasi-static (the plates small against the wavelength, (ωR/c)² ≪ 1), field uniform between the plates and
       zero outside (gap ≪ R, fringe neglected), charge spread uniformly on each plate, so the radial current in a plate at
       radius r < R is I(1 − r²/R²). A loop of radius r on the axis, either around the wire ("fil") or between the plates
       ("entre"), and a surface it bounds: the flat disc, or a bag ("sac") that reaches the other region by a cylinder of
       radius r and closes there with a disc (the bag from the wire goes down into the gap; the one from the gap goes up
       through the plate to the wire). { conduction, deplacement } are the current and ε0 dΦE/dt through that surface (A),
       total their sum; B = μ0 total/(2πr) (18.8), (18.9). ampereSeul: the field (18.1) would give with conduction alone,
       which changes with the surface. */
    function condensateur(o) {
      o = o || {};
      const I = fini(o.I, "I"), R = positif(o.R, "R"), r = positif(o.r, "r");
      const boucle = o.boucle || "fil", surface = o.surface || "disque";
      if (!["fil", "entre"].includes(boucle)) err("boucle : « fil » ou « entre »");
      if (!["disque", "sac"].includes(surface)) err("surface : « disque » ou « sac »");
      const part = Math.min(1, (r / R) ** 2);                    // the share of the plate's charge inside radius r
      const plaque = I * (1 - part);                             // radial current through the circle r of a plate
      const dPhi = I * part;                                     // ε0 dΦE/dt through a disc of radius r in the gap
      let conduction, deplacement;
      if (boucle === "fil") [conduction, deplacement] = surface === "disque" ? [I, 0] : [plaque, dPhi];
      else [conduction, deplacement] = surface === "disque" ? [0, dPhi] : [I - plaque, 0];
      const total = conduction + deplacement, B = x => MU0 * x / (2 * Math.PI * r);
      return { conduction, deplacement, total, B: B(total), ampereSeul: B(conduction), plaque,
        jD: I / (Math.PI * R * R), dEdt: I / (EPS0 * Math.PI * R * R) };
    }

    /* A small sphere at the origin holds Q0 at t = 0 and loses it as e^(−t/τ), the charges flying out radially at u.
       Inside radius r at t > r/u: Q(r, t) = Q0 e^(−(t − r/u)/τ) (what left after t − r/u has not reached r); before, Q0.
       j(r, t) = (Q0/τ) e^(−(t − r/u)/τ)/(4πr²) behind the front, 0 ahead. E = Q/(4πε0r²) radial (spherical symmetry: Gauss
       alone); deplacement = ε0 ∂E/∂t by a centred difference, independent of j. total = 0 is (18.7). Exact for this
       symmetric emission, away from the front r = ut where j jumps. */
    function sphereQuiFuit(o) {
      o = o || {};
      const Q0 = fini(o.Q0, "Q0"), tau = positif(o.tau, "tau"), u = positif(o.u, "u");
      const Q = (r, t) => { positif(r, "r"); fini(t, "t"); return t <= r / u ? Q0 : Q0 * Math.exp(-(t - r / u) / tau); };
      const j = (r, t) => { positif(r, "r"); return t <= r / u ? 0 : Q0 / tau * Math.exp(-(t - r / u) / tau) / (4 * Math.PI * r * r); };
      const E = (r, t) => Q(r, t) / (4 * Math.PI * EPS0 * r * r);
      const deplacement = (r, t) => { const h = 1e-4 * tau; return EPS0 * (E(r, t + h) - E(r, t - h)) / (2 * h); };
      const dQdt = (r, t) => { const h = 1e-4 * tau; return (Q(r, t + h) - Q(r, t - h)) / (2 * h); };
      return { Q, j, E, deplacement, dQdt, total: (r, t) => j(r, t) + deplacement(r, t) };
    }

    /* Three numbers that say whether the table of classical physics (Maxwell, the Lorentz force, dp/dt = F with
       p = γmv, Newton's gravitation) describes a body of mass m moving at v over a size L, attracted (or not) by a mass
       of parameter GM at r. beta2 = (v/c)²: already inside the table (p = γmv), no limit. quantique = λ/L with
       λ = h/(γmv) the de Broglie wavelength: ≳ 0,1 and the motion is no longer a trajectory. gravite = GM/(rc²): the
       relative size of what Newton's law leaves out (Einstein's corrections), null without gravitation in the problem.
       Orders of magnitude, not corrections: each number says what is neglected. */
    function regimeClassique(o) {
      o = o || {};
      const m = positif(o.m, "m"), v = positif(o.v, "v"), L = positif(o.L, "L");
      if (!(v < C)) err("v doit être inférieure à c");
      const b2 = (v / C) ** 2, gamma = 1 / Math.sqrt(1 - b2), lambda = H / (gamma * m * v);
      const gravite = o.GM == null ? null : positif(o.GM, "GM") / (positif(o.r, "r") * C * C);
      return { beta2: b2, gamma, lambda, quantique: lambda / L, gravite };
    }
    /* The systems of the lesson « Toute la physique classique », built from constants.js and three data:
       Mercury's semi-major axis 0,38709893 au (NASA, Mercury fact sheet), the LHC beam energy 6,8 TeV per proton (CERN, run 3)
       and its 27 km ring, the lattice constant of copper 0,3615 nm (fcc, 4 atoms per cell, one free electron each).
       GPS: a circular orbit of period half a sidereal day (π/Ω_E), Kepler's third law. A 1 kg probe mass for the pendulum,
       the satellite and the planet: their real masses are larger, so their λ/L is smaller still (majorant). */
    const A_CUIVRE = 3.615e-10, A_MERCURE = 0.38709893 * Cst.au, E_LHC = 6.8e12 * Cst.e, L_LHC = 27e3;
    function systemesClassiques() {
      const alpha = Cst.e * Cst.e / (4 * Math.PI * EPS0 * HBAR * C);
      const Tgps = Math.PI / Cst.Omega_E, agps = Math.cbrt(Cst.GM_E * Tgps * Tgps / (4 * Math.PI * Math.PI));
      const mp = Cst.m_p, pc = Math.sqrt(E_LHC * E_LHC - (mp * C * C) ** 2), vLHC = C * pc / E_LHC;
      const nCu = 4 / A_CUIVRE ** 3, vF = HBAR * Math.cbrt(3 * Math.PI * Math.PI * nCu) / Cst.m_e;
      const S = {
        pendule: { m: 1, v: 1, L: 1, GM: Cst.GM_E, r: Cst.R_E_mean, majorant: false },
        gps: { m: 1, v: Math.sqrt(Cst.GM_E / agps), L: agps, GM: Cst.GM_E, r: agps, majorant: true },
        mercure: { m: 1, v: Math.sqrt(Cst.GM_sun / A_MERCURE), L: A_MERCURE, GM: Cst.GM_sun, r: A_MERCURE, majorant: true },
        lhc: { m: mp, v: vLHC, L: L_LHC, majorant: false },
        cuivre: { m: Cst.m_e, v: vF, L: Math.cbrt(1 / nCu), majorant: false },
        hydrogene: { m: Cst.m_e, v: alpha * C, L: Cst.a0, majorant: false },
      };
      for (const k in S) S[k] = Object.freeze(Object.assign({ id: k }, S[k], regimeClassique(S[k])));
      return Object.freeze(Object.assign(S, { aGps: agps, nCuivre: nCu }));
    }

    Object.assign(api, { tranche, condensateur, sphereQuiFuit, regimeClassique, systemesClassiques });
  }

  /* ---------- Étape « Propagation d'un champ et vitesse de la lumière » (II.18.4 à 18.6) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0;

    /* A surface current switched on at t = 0 and off at t = T, each time by a linear ramp of duration tau (tau = 0: a step).
       r(t) is the ramp (0, then t/tau, then 1), R(t) = ∫r. T = Infinity: the current stays on. J in A·m⁻¹ (current per unit
       width of the sheet), Q in C·m⁻¹. Exact for the profile it defines; a real switch has a rounded edge, tau is its order. */
    function courant(o) {
      o = o || {};
      const J = fini(o.J == null ? 1 : o.J, "J"), tau = o.tau == null ? 0 : o.tau, T = o.T == null ? Infinity : o.T;
      if (!(tau >= 0) || !isFinite(tau)) err("tau doit être positif ou nul");
      if (!(T > 0)) err("T doit être strictement positif");
      if (tau > T) err("la montée tau ne peut pas durer plus que l'impulsion T");
      const r = t => t <= 0 ? 0 : t >= tau ? 1 : t / tau;
      const R = t => t <= 0 ? 0 : t >= tau ? t - tau / 2 : t * t / (2 * tau);
      return {
        J: t => J * (r(t) - (T === Infinity ? 0 : r(t - T))),
        Q: t => J * (R(t) - (T === Infinity ? 0 : R(t - T))),
        J0: J, T, tau,
      };
    }

    /* Next to the sheet, the circulation of B around a thin loop that straddles it is 2Bw = Jw/(ε0c²) (no flux of E has
       room to pass): B = J/(2ε0c²), and behind the front E = cB. Exact for an infinite sheet, at a distance small against its
       size. */
    function nappeChamps(J) {
      fini(J, "J");
      return { B: J / (2 * EPS0 * C * C), E: J / (2 * EPS0 * C) };
    }

    /* The vector potential of the sheet of nappe (étape « Ondes planes et sphériques »), J(t) along +y in the plane x = 0:
       in the Lorenz gauge φ = 0 (the sheet is neutral) and Ay = Q(t − |x|/c)/(2ε0c), Q = ∫J dt, so that Ey = −∂Ay/∂t and
       Bz = ∂Ay/∂x give back nappe's fields. Exact for an infinite sheet in vacuum; |x| small against a real sheet's size. */
    function potentielNappe(Q, x, t) {
      fonction(Q, "Q"); fini(x, "x"); fini(t, "t");
      return Q(t - Math.abs(x) / C) / (2 * EPS0 * C);
    }

    /* A front of constant E and B moving at v. Faraday on a loop the front crosses: E = vB (18.10). Ampère–Maxwell on the
       other loop: c²B = Ev (18.13). Each law asks for its own E; they agree only when v = c. Exact for a sharp plane front. */
    function conditionsFront(v, B) {
      positif(v, "v"); fini(B, "B");
      return { faraday: v * B, ampere: C * C * B / v, rapport: C * C / (v * v) };
    }

    /* Yee's scheme in one dimension: Ey on the nodes x_i = −L + i dx, Bz halfway, half a step later in time.
       ∂Bz/∂t = −∂Ey/∂x (Faraday), ∂Ey/∂t = −c² ∂Bz/∂x − jy/ε0 (Ampère–Maxwell), the sheet a current J/dx in the central
       cell. S = c dt/dx ≤ 1 (stability); S < 1 spreads a sharp front over a few cells and ripples behind it (under 1 % for
       a ramp of 15 cells); S = 1 with a sharp step splits the field into a checkerboard whose mean is right.
       The box must hold the wave: L > c·duree, or the edges (held at E = 0, a perfect conductor) reflect it. */
    function yee1D(o) {
      o = o || {};
      const J = fonction(o.J, "J"), L = positif(o.L, "L"), duree = o.duree == null ? 0 : o.duree;
      const n = 2 * Math.round((o.n == null ? 400 : o.n) / 2), S = o.S == null ? 0.5 : o.S;
      if (!(duree >= 0)) err("duree doit être positive");
      if (!(S > 0 && S <= 1)) err("S = c dt/dx doit être dans ]0, 1] (stabilité)");
      if (!(n >= 4)) err("n doit valoir au moins 4");
      const dx = 2 * L / n, dt = S * dx / C, steps = Math.round(duree / dt), m = n / 2;
      const E = new Float64Array(n + 1), B = new Float64Array(n);
      for (let k = 0; k < steps; k++) {
        for (let i = 0; i < n; i++) B[i] -= dt / dx * (E[i + 1] - E[i]);
        for (let i = 1; i < n; i++) E[i] -= C * C * dt / dx * (B[i] - B[i - 1]);
        E[m] -= dt * J((k + 0.5) * dt) / (EPS0 * dx);
      }
      return {
        x: Array.from({ length: n + 1 }, (_, i) => -L + i * dx), Ey: Array.from(E),
        xB: Array.from({ length: n }, (_, i) => -L + (i + 0.5) * dx), Bz: Array.from(B),
        t: steps * dt, tB: (steps - 0.5) * dt, dx, dt,
      };
    }

    /* Coulomb between two point charges at rest, r apart; eps0 may be that of another unit of charge. Exact for points at
       rest; for spheres of radius a, exact if the charge stays uniform, otherwise off by terms in powers of a/r. */
    function forceCharges(q1, q2, r, eps0) {
      fini(q1, "q1"); fini(q2, "q2"); positif(r, "r");
      return q1 * q2 / (4 * Math.PI * (eps0 == null ? EPS0 : positif(eps0, "ε0")) * r * r);
    }
    /* Two infinite parallel wires d apart, on a length l: Ampère's theorem gives B = I1/(2π ε0c² d) at the other wire. */
    function forceFils(I1, I2, d, l, eps0c2) {
      fini(I1, "I1"); fini(I2, "I2"); positif(d, "d"); positif(l, "l");
      return I1 * I2 * l / (2 * Math.PI * (eps0c2 == null ? EPS0 * C * C : positif(eps0c2, "ε0c²")) * d);
    }
    /* Two straight segments of the same length l, parallel and facing each other, d apart (Biot–Savart integrated twice):
       F = I1 I2 (√(l² + d²) − d)/(2π ε0c² d). For l ≫ d: forceFils times (1 − d/l). Thin wires; the leads that close the
       circuits are left out. */
    function forceFilsFinis(I1, I2, d, l, eps0c2) {
      fini(I1, "I1"); fini(I2, "I2"); positif(d, "d"); positif(l, "l");
      return I1 * I2 * (Math.hypot(l, d) - d) / (2 * Math.PI * (eps0c2 == null ? EPS0 * C * C : positif(eps0c2, "ε0c²")) * d);
    }
    /* Two static weighings: charges q, r apart, force Fe; wires I, d apart on a length l, force Fm. Read with Coulomb and
       with the infinite-wire formula; c = √(ε0c²/ε0). A wire force measured on finite wires biases c by about d/(2l). */
    function mesurerC(m) {
      if (!m) err("mesurerC : { q, r, Fe, I, d, l, Fm }");
      const eps0 = fini(m.q, "q") ** 2 / (4 * Math.PI * positif(m.r, "r") ** 2 * positif(m.Fe, "Fe"));
      const eps0c2 = fini(m.I, "I") ** 2 * positif(m.l, "l") / (2 * Math.PI * positif(m.d, "d") * positif(m.Fm, "Fm"));
      return { eps0, eps0c2, c: Math.sqrt(eps0c2 / eps0) };
    }
    /* A unit of charge worth k coulombs, and the unit of current one such unit per second. Charges and currents read in it
       are k times smaller for the same forces, so ε0 and ε0c² both become k² times smaller; their ratio c² does not move.
       Exact: it is only a change of the numbers. */
    function changerUnite(k) {
      positif(k, "k");
      const eps0 = EPS0 / (k * k), eps0c2 = EPS0 * C * C / (k * k);
      return { eps0, eps0c2, c: Math.sqrt(eps0c2 / eps0) };
    }

    /* Gauge functions ψ(x, t), V·s (that is T·m²), with their derivatives: f, dx = ∂ψ/∂x, dxx, dt = ∂ψ/∂t, dtt. g is a
       Gaussian of width w. « statique » ψ0 g(x) and « croissante » ψ0 t g(x)/τ0 (τ0 = 1 ns) break the Lorenz condition;
       « onde » ψ0 g(x − ct) keeps it, since it solves the wave equation itself. */
    const JAUGES = Object.freeze(["aucune", "statique", "onde", "croissante"]);
    function jaugeExemple(id, psi0, w) {
      fini(psi0, "ψ0"); positif(w, "w");
      const g = u => Math.exp(-u * u / (w * w)), g1 = u => -2 * u / (w * w) * g(u), g2 = u => (4 * u * u / (w * w) - 2) / (w * w) * g(u);
      const tau0 = 1e-9, z = () => 0;
      if (id === "aucune") return { f: z, dx: z, dxx: z, dt: z, dtt: z };
      if (id === "statique") return { f: x => psi0 * g(x), dx: x => psi0 * g1(x), dxx: x => psi0 * g2(x), dt: z, dtt: z };
      if (id === "onde") return { f: (x, t) => psi0 * g(x - C * t), dx: (x, t) => psi0 * g1(x - C * t), dxx: (x, t) => psi0 * g2(x - C * t),
        dt: (x, t) => -C * psi0 * g1(x - C * t), dtt: (x, t) => C * C * psi0 * g2(x - C * t) };
      if (id === "croissante") return { f: (x, t) => psi0 * t / tau0 * g(x), dx: (x, t) => psi0 * t / tau0 * g1(x), dxx: (x, t) => psi0 * t / tau0 * g2(x),
        dt: x => psi0 / tau0 * g(x), dtt: z };
      return err("jauge inconnue : " + id + " (permis : " + JAUGES.join(", ") + ")");
    }

    /* (18.20) for potentials that depend on x and t only: A' = A + ∇ψ = A + (∂ψ/∂x, 0, 0), φ' = φ − ∂ψ/∂t. Exact. */
    function jauger(pot, psi) {
      if (!pot || typeof pot.phi !== "function" || typeof pot.A !== "function") err("jauger : { phi(x, t), A(x, t) } attendu");
      if (!psi || typeof psi.dx !== "function" || typeof psi.dt !== "function") err("jauger : ψ avec ses dérivées dx et dt attendu");
      return {
        phi: (x, t) => pot.phi(x, t) - psi.dt(x, t),
        A: (x, t) => { const a = pot.A(x, t); return [a[0] + psi.dx(x, t), a[1], a[2]]; },
      };
    }
    /* E = −∇φ − ∂A/∂t, B = ∇ ∧ A, with every derivative a centred difference (steps h in x, k in t): error of order
       h² f‴ and k² f‴, wrong across a kink of the potentials (the front of a sharp pulse, the sheet itself). */
    function champsDepuisPotentiels(pot, x, t, h, k) {
      positif(h, "h"); positif(k, "k");
      const dX = f => (f(x + h, t) - f(x - h, t)) / (2 * h), dT = f => (f(x, t + k) - f(x, t - k)) / (2 * k);
      const Ai = i => (X, T) => pot.A(X, T)[i];
      return {
        E: [-dX(pot.phi) - dT(Ai(0)), -dT(Ai(1)), -dT(Ai(2))],
        B: [0, -dX(Ai(2)), dX(Ai(1))],
      };
    }
    /* ∇·A + (1/c²) ∂φ/∂t in one dimension; zero in the Lorenz gauge (18.23). Same differences as above. */
    function residuLorenz(pot, x, t, h, k) {
      positif(h, "h"); positif(k, "k");
      return (pot.A(x + h, t)[0] - pot.A(x - h, t)[0]) / (2 * h) + (pot.phi(x, t + k) - pot.phi(x, t - k)) / (2 * k) / (C * C);
    }
    Object.assign(api, { courant, nappeChamps, potentielNappe, conditionsFront, yee1D, forceCharges, forceFils, forceFilsFinis,
      mesurerC, changerUnite, JAUGES, jaugeExemple, jauger, champsDepuisPotentiels, residuLorenz });
  }

  /* ---------- Étape « Ondes planes et sphériques » (II.20.1 à 20.4) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, DEG = Math.PI / 180;
    const zero = () => 0;

    /* Z0 = 1/(ε0 c) = μ0 c ≈ 376,73 Ω : rapport E/H d'une onde plane dans le vide. Exacte (définition). */
    const Z0 = 1 / (EPS0 * C);

    /* intensité surfacique J(t) en paliers : liste = [[t0, J0], [t1, J1], …], instants strictement croissants.
       J = 0 avant t0, Jk sur [tk, tk+1[. marches : la même histoire écrite en sauts { t, dJ } (dJ = Jk − Jk−1),
       la somme de courants « allumés une fois pour toutes » de §20-1. Exacte pour le modèle. */
    function paliers(liste) {
      if (!Array.isArray(liste) || !liste.length) err("paliers : [[t0, J0], [t1, J1], …]");
      liste.forEach(([t, J], i) => { fini(t, "t" + i); fini(J, "J" + i); if (i && !(t > liste[i - 1][0])) err("les instants doivent croître strictement"); });
      const J = t => { fini(t, "t"); let v = 0; for (const [tk, Jk] of liste) { if (t >= tk) v = Jk; else break; } return v; };
      const marches = liste.map(([t, Jk], i) => ({ t, dJ: Jk - (i ? liste[i - 1][1] : 0) }));
      return { J, marches };
    }

    /* (20.3) nappe de courant infinie dans le plan x = 0, intensité surfacique J(t) selon +y (A·m⁻¹), J = 0 avant un instant
       donné : E_y = −J(t − |x|/c)/(2 ε0 c) des deux côtés, B_z = signe(x) E_y/c (E ∧ B s'éloigne de la nappe).
       En x = 0, B_z saute de μ0 J : on rend la moyenne, 0. Exacte pour une nappe infinie ; pour une nappe de taille L,
       tant que |x| ≪ L. */
    function nappe(J, x, t) {
      fonction(J, "J"); fini(x, "x"); fini(t, "t");
      const retard = Math.abs(x) / C, Ey = -J(t - retard) / (2 * EPS0 * C);
      return { Ey, Bz: x === 0 ? 0 : Math.sign(x) * Ey / C, retard };
    }

    /* (20.25) onde plane la plus générale qui va selon ±x dans le vide : f, F vers +x, g, G vers −x (fonctions d'une variable,
       en V·m⁻¹ ; absentes = 0). E = (0, f(x − ct) + g(x + ct), F(x − ct) + G(x + ct)),
       cB = (0, −F(x − ct) + G(x + ct), f(x − ct) − g(x + ct)). Rend (r, t) → { E, B }, r = x ou [x, y, z].
       Exacte (solution des équations de Maxwell sans charges). */
    function planeGenerale(o) {
      o = o || {};
      const f = o.f ? fonction(o.f, "f") : zero, g = o.g ? fonction(o.g, "g") : zero;
      const F = o.F ? fonction(o.F, "F") : zero, G = o.G ? fonction(o.G, "G") : zero;
      return (r, t) => {
        const x = fini(Array.isArray(r) ? r[0] : r, "x"); fini(t, "t");
        const u = x - C * t, w = x + C * t;
        return { E: [0, f(u) + g(w), F(u) + G(w)], B: [0, (-F(u) + G(w)) / C, (f(u) - g(w)) / C] };
      };
    }

    /* les quatre équations de Maxwell sans charges ni courants (20.12), vérifiées par différences centrées (pas h, en m ;
       pas de temps h/c) sur un champ (r, t) → { E, B } (r = [x, y, z]). Rend les résidus de I, III (en V·m⁻² et T·m⁻¹)
       et des trois composantes de II et IV, et echelle : le plus grand terme rencontré (pour juger un résidu). Erreur de
       troncature d'ordre h² ; h ≪ longueur sur laquelle le champ varie. */
    function maxwellVide(champ, r, t, h) {
      fonction(champ, "champ"); v3(r, "r"); fini(t, "t"); positif(h, "h");
      const ht = h / C, champEn = comp => q => champ(q, t)[comp];
      const dt = (comp, i) => (champ(r, t + ht)[comp][i] - champ(r, t - ht)[comp][i]) / (2 * ht);
      const rot = comp => rotationnel(champEn(comp), r, h), div = comp => divergence(champEn(comp), r, h);
      const rE = rot("E"), rB = rot("B"), dB = [0, 1, 2].map(i => dt("B", i)), dE = [0, 1, 2].map(i => dt("E", i));
      const II = rE.map((v, i) => v + dB[i]), IV = rB.map((v, i) => C * C * v - dE[i]);
      const echelle = Math.max(...rE.map(Math.abs), ...dB.map(Math.abs), ...rB.map(v => C * Math.abs(v)), ...dE.map(v => Math.abs(v) / C));
      return { I: div("E"), II, III: div("B"), IV, echelle };
    }

    /* onde plane E = E0 cos(ωt − k·r + φ) d'amplitude complexe écrite en deux composantes : Ey = a cos u, Ez = b cos(u + φ),
       u = ωt − kx (a, b ≥ 0, φ en rad). L'extrémité de E décrit une ellipse : demi-axes A ≥ B (A² + B² = a² + b²,
       AB = ab|sin φ|), grand axe à l'angle psi de y (tan 2ψ = 2ab cos φ/(a² − b²)). sens : +1 si E tourne de y vers z
       (Ey Ėz − Ez Ėy = −abω sin φ > 0), −1 en sens inverse, 0 si linéaire. Exacte pour une onde monochromatique. */
    function polarisation(a, b, phi) {
      fini(a, "a"); fini(b, "b"); fini(phi, "φ"); if (a < 0 || b < 0) err("a et b doivent être positifs ou nuls");
      if (a === 0 && b === 0) err("onde nulle");
      const s = Math.sin(phi), co = Math.cos(phi), p = a * a + b * b, q = a * b * Math.abs(s);
      const disc = Math.sqrt(Math.max(0, p * p / 4 - q * q)), A = Math.sqrt(p / 2 + disc), B = Math.sqrt(Math.max(0, p / 2 - disc));
      const psi = 0.5 * Math.atan2(2 * a * b * co, a * a - b * b), tol = 1e-9 * p;
      const type = B * B <= tol ? "lineaire" : Math.abs(A - B) <= 1e-9 * A ? "circulaire" : "elliptique";
      return { A, B, psi, type, sens: type === "lineaire" ? 0 : (-a * b * s > 0 ? 1 : -1) };
    }

    /* (20.27a) onde plane qui va selon le vecteur unitaire n : E = E0 f(t − n·r/c), B = n ∧ E/c. f : fonction d'une variable
       sans dimension ou non. Solution de (20.12) si et seulement si n·E0 = 0 (la divergence vaut −(n·E0) f′/c) : on ne la
       refuse pas, pour que maxwellVide le montre. Exacte. */
    function ondePlane(n, E0, f) {
      v3(n, "n"); v3(E0, "E0"); fonction(f, "f");
      const nn = Math.hypot(n[0], n[1], n[2]); if (!(nn > 0)) err("n ne doit pas être nul");
      const u = n.map(x => x / nn), nE = cross(u, E0).map(x => x / C);
      return (r, t) => { const s = f(t - dot(u, r) / C); return { E: E0.map(x => x * s), B: nE.map(x => x * s) }; };
    }

    /* une somme d'ondes planes monochromatiques de même pulsation dans le plan xy, toutes polarisées selon z (donc
       transverses quelle que soit leur direction) : ψ(x, y, t) = Σ A cos(ωt − k(x cos θ + y sin θ) + φ), k = 2π/λ, ω = ck.
       ondes = [{ A, theta, phi }] (theta en rad, direction de propagation). Exacte pour le modèle (vide, ondes infinies). */
    function ondesPlanes(ondes, lambda) {
      if (!Array.isArray(ondes) || !ondes.length) err("ondes = [{ A, theta, phi }]");
      positif(lambda, "λ");
      const k = 2 * Math.PI / lambda, w = C * k;
      const L = ondes.map((o, i) => ({ A: fini(o.A, "A" + i), c: Math.cos(fini(o.theta, "θ" + i)), s: Math.sin(o.theta), phi: fini(o.phi || 0, "φ" + i) }));
      const psi = (x, y, t) => L.reduce((S, o) => S + o.A * Math.cos(w * t - k * (x * o.c + y * o.s) + o.phi), 0);
      return { k, omega: w, psi, champ: (r, t) => ({ E: [0, 0, psi(r[0], r[1], t)], B: (() => {
        /* B = Σ n ∧ E/c, n = (cos θ, sin θ, 0), E selon z : n ∧ ẑ = (sin θ, −cos θ, 0) */
        let bx = 0, by = 0; for (const o of L) { const e = o.A * Math.cos(w * t - k * (r[0] * o.c + r[1] * o.s) + o.phi) / C; bx += o.s * e; by -= o.c * e; }
        return [bx, by, 0]; })() }) };
    }

    /* interfrange de deux ondes planes de même λ dont les directions font l'angle α : λ/(2 sin(α/2)), mesuré selon la
       différence des vecteurs d'onde. Infinity pour α = 0 (une seule onde). Exacte. */
    function interfrange(lambda, alpha) {
      positif(lambda, "λ"); fini(alpha, "α");
      const s = Math.abs(Math.sin(alpha / 2)); return s < 1e-15 ? Infinity : lambda / (2 * s);
    }

    /* (20.8) mise à l'épreuve : ∇²ψ − ψ_tt/c² par différences centrées (pas h en m, h/c en s), rapporté au plus grand des
       deux termes. ψ(x, y, z, t). Zéro (à O(h²) près) pour une solution de l'équation d'onde. */
    function residuOnde(psi, r, t, h) {
      fonction(psi, "ψ"); v3(r, "r"); fini(t, "t"); positif(h, "h");
      const [x, y, z] = r, p0 = psi(x, y, z, t), ht = h / C;
      const lap = (psi(x + h, y, z, t) + psi(x - h, y, z, t) + psi(x, y + h, z, t) + psi(x, y - h, z, t) + psi(x, y, z + h, t) + psi(x, y, z - h, t) - 6 * p0) / (h * h);
      const tt = (psi(x, y, z, t + ht) + psi(x, y, z, t - ht) - 2 * p0) / (ht * ht) / (C * C);
      const s = Math.max(Math.abs(lap), Math.abs(tt));
      return { laplacien: lap, temps: tt, relatif: s > 0 ? (lap - tt) / s : 0 };
    }

    /* un système de taille L sous une onde de fréquence f : λ = c/f, L/λ, déphasage 2πL/λ d'un bout à l'autre, délai L/c.
       f = 0 (champ statique) : λ = Infinity, L/λ = 0. Le champ est quasi statique sur le système tant que 2πL/λ ≪ 1. Exacte. */
    function regime(L, f) {
      positif(L, "L"); fini(f, "f"); if (f < 0) err("f doit être positive ou nulle");
      const lambda = f === 0 ? Infinity : C / f, rapport = L / lambda;
      return { lambda, rapport, phase: 2 * Math.PI * rapport, delai: L / C, periode: f === 0 ? Infinity : 1 / f };
    }

    /* loi de Wien : λ_max = hc/(x k_B T), x racine non nulle de x = 5(1 − e^(−x)) (maximum de la loi de Planck par unité
       de longueur d'onde). Exacte pour un corps noir ; la peau est un corps presque noir dans l'infrarouge. */
    const X_WIEN = (() => { let x = 5; for (let i = 0; i < 60; i++) x = 5 * (1 - Math.exp(-x)); return x; })();
    const B_WIEN = Cst.h * C / (X_WIEN * Cst.k_B);
    function wien(T) { return B_WIEN / positif(T, "T"); }

    /* indice de l'eau à 293,15 K (20 °C) dans le visible : n = A + B/λ² (Cauchy) passant par les raies C (656,3 nm, 1,3312)
       et F (486,1 nm, 1,3372). Écart à la table < 2 × 10⁻⁴ sur 400–700 nm (raie D 589,3 nm : 1,3330 ; 404,4 nm : 1,34315). */
    const EAU = Object.freeze({ C: [656.3e-9, 1.3312], D: [589.3e-9, 1.3330], F: [486.1e-9, 1.3372] });
    const CAUCHY_B = (EAU.F[1] - EAU.C[1]) / (EAU.F[0] ** -2 - EAU.C[0] ** -2), CAUCHY_A = EAU.C[1] - CAUCHY_B * EAU.C[0] ** -2;
    function indiceEau(lambda) {
      positif(lambda, "λ"); if (lambda < 380e-9 || lambda > 780e-9) err("indiceEau : λ entre 380 et 780 nm");
      return CAUCHY_A + CAUCHY_B / (lambda * lambda);
    }

    /* goutte sphérique, une réflexion interne (arc primaire), optique géométrique. Paramètre d'impact b = sin i ∈ [0, 1].
       angleSortie : θ(b) = 4r − 2i, angle entre le rayon sortant et la direction opposée au Soleil (sin r = b/n).
       arcPrimaire : le maximum de θ, atteint pour cos² i = (n² − 1)/3 ; D = π − θ est la déviation minimale. 1 < n < 2. */
    function angleSortie(n, b) {
      fini(n, "n"); fini(b, "b"); if (!(n > 1 && n < 2)) err("n entre 1 et 2"); if (b < 0 || b > 1) err("b entre 0 et 1");
      return 4 * Math.asin(b / n) - 2 * Math.asin(b);
    }
    function arcPrimaire(n) {
      fini(n, "n"); if (!(n > 1 && n < 2)) err("n entre 1 et 2");
      const i = Math.acos(Math.sqrt((n * n - 1) / 3)), r = Math.asin(Math.sin(i) / n), theta = 4 * r - 2 * i;
      return { i, r, theta, D: Math.PI - theta, b: Math.sin(i) };
    }

    /* intensité de l'arc primaire par unité d'angle solide, en fonction de l'angle θ à la direction opposée au Soleil :
       rayons d'impact b tirés sur N anneaux (poids 2πb db, la lumière qui tombe sur l'anneau), regroupés par θ dans des
       classes de largeur pas, divisés par 2π sin θ, puis moyennés sur le disque solaire (diamètre soleil, rad ; la lumière
       d'un disque uniforme vue selon un diamètre se répartit comme √(R² − u²)). Unités arbitraires communes à toutes les
       longueurs d'onde. Néglige : facteurs de Fresnel (lents), diffraction (franges d'Airy, d'échelle (λ/a)^(2/3) rad pour
       une goutte de rayon a), aplatissement des grosses gouttes. Rend { at(θ), thetaMax }. */
    function profilArc(n, o) {
      o = o || {};
      const N = o.N || 20000, pas = o.pas || 0.01 * DEG, soleil = o.soleil === undefined ? 0.53 * DEG : o.soleil;
      fini(n, "n"); positif(pas, "pas"); fini(soleil, "soleil"); if (soleil < 0) err("soleil ≥ 0");
      if (!(Number.isInteger(N) && N >= 100)) err("N entier ≥ 100");
      const tm = arcPrimaire(n).theta, M = Math.ceil((tm + soleil + 2 * pas) / pas) + 1, h = new Float64Array(M);
      for (let j = 0; j < N; j++) { const b = (j + 0.5) / N, k = Math.floor(angleSortie(n, b) / pas); if (k >= 0 && k < M) h[k] += 2 * Math.PI * b / N; }
      const dens = Array.from(h, (v, k) => v / pas / (2 * Math.PI * Math.sin((k + 0.5) * pas)));
      const R = soleil / 2, m = Math.floor(R / pas), ker = [];
      for (let u = -m; u <= m; u++) ker.push(R > 0 ? Math.sqrt(Math.max(0, R * R - (u * pas) ** 2)) : 1);
      const ks = ker.reduce((a, b) => a + b, 0), lisse = dens.map((_, k) => ker.reduce((S, w, j) => { const q = k + j - m; return q >= 0 && q < M ? S + w * dens[q] : S; }, 0) / ks);
      const at = theta => { fini(theta, "θ"); const x = theta / pas - 0.5, k = Math.floor(x), f = x - k; if (k < 0) return lisse[0]; if (k >= M - 1) return 0; return (1 - f) * lisse[k] + f * lisse[k + 1]; };
      return { at, thetaMax: tm };
    }

    /* le graphe de l'aveugle : l'intensité qui arrive à l'angle θ, longueur d'onde par longueur d'onde, sous un Soleil de
       spectre pris plat (approximation : le vrai spectre solaire n'est pas plat). lambdas en m. Rend
       { I: [...], pic } (pic : la longueur d'onde du maximum). Mêmes approximations que profilArc. */
    function spectreArc(theta, lambdas, o) {
      fini(theta, "θ"); if (!Array.isArray(lambdas) || !lambdas.length) err("lambdas : liste de longueurs d'onde");
      const I = lambdas.map(l => profilArc(indiceEau(l), o).at(theta));
      let k = 0; I.forEach((v, j) => { if (v > I[k]) k = j; });
      return { I, pic: lambdas[k] };
    }

    /* (20.35) onde sphérique : ψ = f(t − r/c)/r (sortante) ou f(t + r/c)/r (entrante, sens = −1). r > 0 : en r = 0 elle
       exige une source. Exacte hors de l'origine. */
    function spherique(f, sens) {
      fonction(f, "f"); const s = sens === undefined ? 1 : sens; if (s !== 1 && s !== -1) err("sens : 1 (sortante) ou −1 (entrante)");
      return (r, t) => { positif(r, "r"); fini(t, "t"); return f(t - s * r / C) / r; };
    }

    /* (20.31) ∇²ψ = ψ″ + 2ψ′/r pour ψ(r) à symétrie sphérique, par différences centrées de pas h (h < r). Erreur O(h²). */
    function laplacienRadial(psi, r, h) {
      fonction(psi, "ψ"); positif(r, "r"); positif(h, "h"); if (!(h < r)) err("h < r");
      const p = psi(r + h), m = psi(r - h), z = psi(r);
      return (p - 2 * z + m) / (h * h) + (2 / r) * (p - m) / (2 * h);
    }

    /* énergie d'une onde sphérique sur la coquille r0 < r < r1 à l'instant t, au facteur près qui relie ψ² à une densité
       d'énergie : ∫ 4π r² ψ² dr = 4π ∫ f(t ∓ r/c)² dr (n trapèzes, n pair ≥ 2). Indépendante de t tant que l'impulsion
       est toute entière dans la coquille : c'est l'argument de la décroissance en 1/r. */
    function energieCoquille(psi, t, r0, r1, n) {
      fonction(psi, "ψ"); fini(t, "t"); positif(r0, "r0"); positif(r1, "r1"); if (!(r1 > r0)) err("r1 > r0");
      if (!(Number.isInteger(n) && n >= 2)) err("n entier ≥ 2");
      const h = (r1 - r0) / n; let S = 0;
      for (let j = 0; j <= n; j++) { const r = r0 + j * h, v = 4 * Math.PI * r * r * psi(r, t) ** 2; S += (j === 0 || j === n ? 0.5 : 1) * v; }
      return S * h;
    }

    /* baisse de niveau entre deux distances r1 < r2 d'une source ponctuelle en champ libre : amplitude en 1/r, donc
       20 log10(r2/r1) dB (6,02 dB par doublement). Valable loin de la source (r ≫ taille, r ≫ λ/2π) et sans réflexion. */
    function niveauEcart(r1, r2) { positif(r1, "r1"); positif(r2, "r2"); return 20 * Math.log10(r2 / r1); }

    Object.assign(api, { Z0, paliers, nappe, planeGenerale, maxwellVide, polarisation, ondePlane, ondesPlanes, interfrange, residuOnde,
      regime, X_WIEN, B_WIEN, wien, EAU, indiceEau, angleSortie, arcPrimaire, profilArc, spectreArc, spherique, laplacienRadial,
      energieCoquille, niveauEcart });
  }

  /* ---------- Étape « Énergie du champ et vecteur de Poynting » (II.27.1 à 27.3) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = 1 / (EPS0 * C * C);

    /* s(t) = ½ (1 + tanh(t/τ)): the smooth step from 0 to 1 in a few τ around t = 0, and its derivative. */
    const fondu = (t, tau) => 0.5 * (1 + Math.tanh(fini(t, "t") / positif(tau, "τ")));
    const fonduPrime = (t, tau) => 0.5 / tau / Math.cosh(t / tau) ** 2;

    /* §27-1, Fig. 27-1. A charge Q moves from point 1 (x = 0) to point 2 (x = L) of the frame S, as Q s(t) over a time τ.
       Two models. « saut »: Q1 = Q (1 − s(t)), Q2 = Q s(t), nothing between: the total is Q at every time of S.
       « transit »: the charge leaves 1 at the rate Q s′(t) and travels along a wire at the speed w < c, so it reaches 2
       a time L/w later; linear density λ(x, t) = (Q/w) s′(t − x/w), current I = λ w.
       Both are counted at one time t′ of the frame S′ moving at βc along +x (origins together). The event (x, t′) has
       t = t′/γ + βx/c (Lorentz). The charge of a slice dx at fixed t′ is (λ − βI/c) dx (ρ′ = γ(ρ − v j/c²) and
       dx′ = dx/γ). Points 1 and 2 are taken as points: their size is neglected against L.
       saut(tp) → { q1, q2, total } ; transit(tp) → { q1, fil, q2, total }, the wire term by the midpoint rule on n slices.
       In S′ the total of « saut » is Q [1 − s(t′/γ) + s(t′/γ + βL/c)] ≠ Q: the charge appears at 2 before it leaves 1
       when β > 0. The total of « transit » is Q for every β, exactly (the quadrature error is O(1/n²)). */
    function chargeVue(o) {
      const Q = fini(o.Q, "Q"), L = positif(o.L, "L"), tau = positif(o.tau, "τ"), beta = fini(o.beta, "β");
      const w = positif(o.w == null ? C / 2 : o.w, "w"), n = entier(o.n == null ? 400 : o.n, "n", 1);
      if (!(Math.abs(beta) < 1)) err("|β| doit rester inférieur à 1");
      if (!(w < C)) err("la charge doit voyager moins vite que la lumière");
      const g = 1 / Math.sqrt(1 - beta * beta), v = beta * C;
      const tS = (tp, x) => fini(tp, "t′") / g + v * x / (C * C);
      function saut(tp) {
        const q1 = Q * (1 - fondu(tS(tp, 0), tau)), q2 = Q * fondu(tS(tp, L), tau);
        return { q1, q2, total: q1 + q2 };
      }
      function transit(tp) {
        const q1 = Q * (1 - fondu(tS(tp, 0), tau)), q2 = Q * fondu(tS(tp, L) - L / w, tau), dx = L / n;
        let fil = 0;
        for (let i = 0; i < n; i++) {
          const x = (i + 0.5) * dx, lam = Q / w * fonduPrime(tS(tp, x) - x / w, tau);
          fil += lam * (1 - v * w / (C * C)) * dx;
        }
        return { q1, fil, q2, total: q1 + fil + q2 };
      }
      return { gamma: g, decalage: v * L / (C * C), saut, transit };
    }

    /* §27-2. A plane pulse E_y(x, t), B_z(x, t) on a line of length L cut into n cells (Yee scheme, c Δt = Δx: exact
       propagation in vacuum), crossing an ohmic slab [x0, x1] of conductivity σ (j = σE, permittivity ε0: a model of a
       weak conductor, without dispersion or polarisation). Per square metre of wavefront:
         ∂B_z/∂t = −∂E_y/∂x,  ∂E_y/∂t = −c² ∂B_z/∂x − σE_y/ε0 ;  u = ε0E²/2 + B²/(2μ0),  S_x = E_y B_z/μ0.
       The ends absorb (first-order Mur condition, exact for c Δt = Δx in vacuum). Initial pulse: Gaussian of standard
       width a centred at xc, moving toward +x (B = E/c).
       Balance of the box [a, b], at each step: U (J·m⁻², trapezoid in x, B taken at integer time as the mean of the four
       neighbours), sorti = ∫ (S(b) − S(a)) dt, joule = ∫∫ σE² dx dt (trapezoid in time), residu = U − U(0) + sorti + joule:
       (27.4) in one dimension, zero up to the discretisation error, of order (Δx/a)².
       o = { L, n, plaque: [x0, x1], sigma, impulsion: { xc, a, E0 }, boite: [a, b], pas, tous }.
       Returns { dx, dt, x, t[], U[], sorti[], joule[], residu[], U0, images: [{ t, E }] every `tous` steps }. */
    function ligneConductrice(o) {
      const L = positif(o.L, "L"), n = entier(o.n == null ? 400 : o.n, "n", 10), sigma = fini(o.sigma == null ? 0 : o.sigma, "σ");
      if (sigma < 0) err("σ doit être positive ou nulle");
      const pl = o.plaque || [0, 0], bo = o.boite || [0, L], imp = o.impulsion || {};
      const xc = fini(imp.xc, "xc"), a = positif(imp.a, "a"), E0 = fini(imp.E0 == null ? 1 : imp.E0, "E0");
      const pas = entier(o.pas == null ? 2 * n : o.pas, "pas", 1), tous = entier(o.tous == null ? 4 : o.tous, "tous", 1);
      fini(pl[0], "x0"); fini(pl[1], "x1"); fini(bo[0], "a"); fini(bo[1], "b");
      const dx = L / n, dt = dx / C, x = Array.from({ length: n + 1 }, (_, i) => i * dx);
      const ia = Math.max(0, Math.min(n, Math.round(bo[0] / dx))), ib = Math.max(0, Math.min(n, Math.round(bo[1] / dx)));
      if (!(ib > ia)) err("la boîte doit contenir au moins une maille");
      const sig = x.map(xi => (xi >= pl[0] && xi <= pl[1] ? sigma : 0));
      const ca = sig.map(s => (1 - s * dt / (2 * EPS0)) / (1 + s * dt / (2 * EPS0))), cb = sig.map(s => C * C * dt / dx / (1 + s * dt / (2 * EPS0)));
      const gauss = y => E0 * Math.exp(-(((y - xc) / a) ** 2) / 2);
      let E = x.map(gauss);
      let Bm = Array.from({ length: n }, (_, i) => gauss((i + 1) * dx) / C);     // B at x_{i+½}, time −Δt/2: the pulse a half step back
      const out = { dx, dt, x, t: [], U: [], sorti: [], joule: [], residu: [], U0: 0, images: [] };
      const w = i => (i === ia || i === ib ? 0.5 : 1);
      let prev = null, sorti = 0, joule = 0;
      for (let k = 0; k <= pas; k++) {
        const Bp = Bm.map((b, i) => b - (dt / dx) * (E[i + 1] - E[i]));       // B at time (k + ½) Δt
        const Bn = i => { const l = i > 0 ? (Bm[i - 1] + Bp[i - 1]) / 2 : null, r = i < n ? (Bm[i] + Bp[i]) / 2 : null;
          return l == null ? r : r == null ? l : (l + r) / 2; };
        let U = 0, J = 0;
        for (let i = ia; i <= ib; i++) { const b = Bn(i); U += w(i) * (EPS0 * E[i] * E[i] / 2 + b * b / (2 * MU0)) * dx; J += w(i) * sig[i] * E[i] * E[i] * dx; }
        const flux = E[ib] * Bn(ib) / MU0 - E[ia] * Bn(ia) / MU0;
        if (prev) { sorti += (prev.flux + flux) / 2 * dt; joule += (prev.J + J) / 2 * dt; } else out.U0 = U;
        out.t.push(k * dt); out.U.push(U); out.sorti.push(sorti); out.joule.push(joule); out.residu.push(U - out.U0 + sorti + joule);
        if (k % tous === 0) out.images.push({ t: k * dt, E: E.slice() });
        prev = { flux, J };
        if (k === pas) break;
        const En = E.map((e, i) => (i === 0 || i === n ? e : ca[i] * e - cb[i] * (Bp[i] - Bp[i - 1])));
        En[0] = E[1]; En[n] = E[n - 1];                                         // Mur: what reached the edge leaves
        E = En; Bm = Bp;
      }
      return out;
    }

    /* (27.14) and (27.15): u = ε0 E·E/2 + ε0c² B·B/2 (J·m⁻³), S = ε0 c² E ∧ B (W·m⁻²). Vectors [x, y, z] in V·m⁻¹ and T.
       Exact as definitions; that they are the energy and its flow is the content of (27.13), up to the ambiguity of §27-4. */
    const densiteEnergie = (E, B) => EPS0 / 2 * dot(v3(E, "E"), E) + EPS0 * C * C / 2 * dot(v3(B, "B"), B);
    const poynting = (E, B) => cross(v3(E, "E"), v3(B, "B")).map(s => EPS0 * C * C * s);

    /* (27.6) at a point, by centred differences: champ = { E(p, t), B(p, t), j(p, t) } (j optional, zero by default).
       dudt = ∂u/∂t (step ht), divS = ∇·S (step h, centred differences), Ej = E·j, residu = dudt + divS + Ej: zero for
       fields that satisfy Maxwell's equations with that j, up to O(h²) and O(ht²). echelle = the largest of the three terms. */
    function bilanLocal(champ, p, t, o = {}) {
      if (!champ || typeof champ.E !== "function" || typeof champ.B !== "function") err("champ = { E(p, t), B(p, t), j(p, t) }");
      v3(p, "p"); fini(t, "t");
      const h = o.h == null ? undefined : positif(o.h, "h"), ht = positif(o.ht == null ? 1e-12 : o.ht, "ht");
      const u = s => densiteEnergie(champ.E(p, s), champ.B(p, s));
      const dudt = (u(t + ht) - u(t - ht)) / (2 * ht);
      const divS = divergence(q => poynting(champ.E(q, t), champ.B(q, t)), p, h);
      const Ej = champ.j ? dot(champ.E(p, t), v3(champ.j(p, t), "j")) : 0;
      return { dudt, divS, Ej, residu: dudt + divS + Ej, echelle: Math.max(Math.abs(dudt), Math.abs(divS), Math.abs(Ej)) };
    }

    /* (27.11), checked by finite differences for any two fields of space E(p), B(p):
       gauche = ∇·(B ∧ E), droite = E·(∇ ∧ B) − B·(∇ ∧ E), and the wrong guess of (27.9), naif = E·(∇ ∧ B) alone.
       Exact identity; the differences leave O(h²). */
    function identitePoynting(E, B, p, h) {
      if (typeof E !== "function" || typeof B !== "function") err("E et B doivent être des fonctions du point");
      v3(p, "p");
      const gauche = divergence(q => cross(B(q), E(q)), p, h);
      const eRotB = dot(E(p), rotationnel(B, p, h)), bRotE = dot(B(p), rotationnel(E, p, h));
      return { gauche, droite: eRotB - bRotE, naif: eRotB };
    }

    /* A plane wave of amplitude E0 toward +x and its reflection, of relative amplitude r (0: progressive, 1: standing):
       E_y = E0 [cos(kx − ωt) + r cos(kx + ωt)], B_z = (E0/c) [cos(kx − ωt) − r cos(kx + ωt)], k = 2π/λ, ω = ck. Vacuum,
       no charge: an exact solution of Maxwell's equations. Time averages, exact: <u> = ε0 E0² (1 + r²)/2 everywhere,
       <S> = ε0 c E0² (1 − r²)/2, so the energy moves on average at vitesse = <S>/<u> = c (1 − r²)/(1 + r²).
       E(x, t), B(x, t) as vectors; u, S (S_x, W·m⁻²) as numbers. */
    function ondeMixte(o) {
      const E0 = fini(o.E0, "E0"), lambda = positif(o.lambda, "λ"), r = fini(o.r == null ? 0 : o.r, "r");
      if (r < 0 || r > 1) err("r doit être entre 0 et 1");
      const k = 2 * Math.PI / lambda, w = C * k;
      const ey = (x, t) => E0 * (Math.cos(k * x - w * t) + r * Math.cos(k * x + w * t));
      const bz = (x, t) => E0 / C * (Math.cos(k * x - w * t) - r * Math.cos(k * x + w * t));
      return {
        k, w, T: 2 * Math.PI / w,
        E: (p, t) => [0, ey(p[0], t), 0], B: (p, t) => [0, 0, bz(p[0], t)],
        u: (x, t) => EPS0 / 2 * ey(x, t) ** 2 + EPS0 * C * C / 2 * bz(x, t) ** 2,
        S: (x, t) => EPS0 * C * C * ey(x, t) * bz(x, t),
        uMoy: EPS0 * E0 * E0 * (1 + r * r) / 2, SMoy: EPS0 * C * E0 * E0 * (1 - r * r) / 2, vitesse: C * (1 - r * r) / (1 + r * r),
      };
    }

    /* A plane wave of mean flux S (W·m⁻²): <E²> = S/(ε0 c), <u> = S/c, effective fields Eeff = √<E²>, Beff = Eeff/c.
       (27.15) with B = E/c, a single direction of propagation; sunlight at 1 au is that up to the Sun's angular radius. */
    function ondePlaneFlux(S) {
      positif(S, "S"); const E2 = S / (EPS0 * C);
      return { Eeff: Math.sqrt(E2), Beff: Math.sqrt(E2) / C, u: S / C };
    }

    Object.assign(api, { fondu, chargeVue, ligneConductrice, densiteEnergie, poynting, bilanLocal, identitePoynting, ondeMixte, ondePlaneFlux });
  }

  /* ---------- Étape « Exemples de flux d'énergie et impulsion du champ » (II.27.4 à 27.6) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = 1 / (EPS0 * C * C), KC = 1 / (4 * Math.PI * EPS0);

    /* §27-4. Where is the energy of a static charge Q spread over a sphere of radius R? Two densities with the same total:
       u = ε0E²/2 (in the field) and ρφ/2 (on the charges). They differ by a divergence (27.14q):
       ε0E²/2 = ρφ/2 − (ε0/2)∇·(φE), so inside the sphere of radius r: champ(r) = charges(r) − bord(r), with
       bord(r) = (ε0/2) 4πr² φ(r) E(r), the flux of (ε0/2)φE through it; bord falls as 1/r, and both totals agree.
       forme « boule »: charge uniform in volume; « coquille »: on the surface (a charged conducting sphere).
       Electrostatics in vacuum, k = 1/(4πε0): E and φ exact for these spheres; the charge itself is a continuum (its
       granularity is neglected against R). { total, champ(r), charges(r), bord(r), E(r), phi(r) }, energies in J. */
    function energieRepartie(o) {
      const Q = fini(o.Q, "Q"), R = positif(o.R, "R"), forme = o.forme || "boule";
      if (!["boule", "coquille"].includes(forme)) err("forme : « boule » ou « coquille »");
      const kq2 = KC * Q * Q, rr = r => positif0(r, "r");
      const boule = forme === "boule";
      const E = r => (rr(r) >= R ? KC * Q / (r * r) : boule ? KC * Q * r / R ** 3 : 0);
      const phi = r => (rr(r) >= R ? KC * Q / r : boule ? KC * Q * (3 * R * R - r * r) / (2 * R ** 3) : KC * Q / R);
      const total = boule ? 3 * kq2 / (5 * R) : kq2 / (2 * R);
      const champ = r => (rr(r) >= R ? total - kq2 / (2 * r) : boule ? kq2 * r ** 5 / (10 * R ** 6) : 0);
      const charges = r => (rr(r) >= R ? total : boule ? 3 * kq2 / (4 * R ** 6) * (R * R * r ** 3 - r ** 5 / 5) : 0);
      const bord = r => EPS0 / 2 * 4 * Math.PI * rr(r) * r * phi(r) * E(r);
      return { total, champ, charges, bord, E, phi };
    }

    /* §27-5, Fig. 27-3. A circular parallel-plate capacitor (radius a, gap h) at the voltage V, charged by the current I.
       Fields from condensateur (étape « Équations de Maxwell »): E = V/h uniform between the plates, B = μ0 I r/(2π a²) at
       r ≤ a (Ampère–Maxwell, displacement current alone). S = E B/μ0, toward the axis. Through the cylinder of radius r
       and height h: cote = 2π r h S = ε0 π r² h E dE/dt, the growth of the energy inside r (dUdt). (27.19), (27.20):
       U, dUdtTotal = V I, the power the source gives. Model: gap ≪ a (fringe field of relative size about h/a neglected),
       quasi-static: a constant I makes ∂B/∂t = 0, so no induced E corrects the uniform E; for a varying current the
       correction is of order (ωa/c)². { E, dEdt, B, S, cote, dUdt, U, dUdtTotal, puissance, bords = h/a } */
    function condensateurFlux(o) {
      const a = positif(o.a, "a"), h = positif(o.h, "h"), V = fini(o.V, "V"), I = fini(o.I, "I"), r = positif(o.r == null ? a : o.r, "r");
      if (r > a) err("r ≤ a attendu (entre les armatures)");
      const cd = api.condensateur({ I, R: a, r, boucle: "entre", surface: "disque" });
      const E = V / h, dEdt = cd.dEdt, B = cd.B, S = E * B / MU0;
      return { E, dEdt, B, S, cote: 2 * Math.PI * r * h * S, dUdt: EPS0 * Math.PI * r * r * h * E * dEdt,
        U: EPS0 / 2 * E * E * Math.PI * a * a * h, dUdtTotal: EPS0 * Math.PI * a * a * h * E * dEdt, puissance: V * I, bords: h / a };
    }

    /* §27-5, Fig. 27-6. A point charge q at (d, 0, 0) and a point magnetic dipole m along z at the origin (a small magnet,
       seen from distances large against its size). Static fields in vacuum: E of Coulomb, B = μ0/(4π) (3(m·r̂)r̂ − m)/r³.
       S = ε0c² E ∧ B (poynting, étape « Énergie du champ ») is not zero, yet nothing changes: its flux through any closed
       surface is zero (∇·S = B·∇∧E − E·∇∧B = 0 for static fields without current outside the magnet). In the plane z = 0,
       B = −μ0 m ẑ/(4π r³) and S lies in the plane. Field angular momentum (27.21q): L_z = q d Aφ(d) = μ0 q m/(4π d), the
       angular impulse the charge would receive if the magnet were switched off (as in paradoxeDisque, MagInd).
       { E(p), B(p), S(p), plan(x, y) → [Sx, Sy], Lz, fluxSphere(c, R, n) → { net, absolu } (midpoint rule in θ, φ) } */
    function chargeAimant(o) {
      const q = fini(o.q, "q"), d = positif(o.d, "d"), m = fini(o.m, "m"), S3 = api.poynting;
      const E = p => { v3(p, "p"); const x = p[0] - d, y = p[1], z = p[2], r = Math.hypot(x, y, z); if (!(r > 0)) return [NaN, NaN, NaN];
        const k = KC * q / r ** 3; return [k * x, k * y, k * z]; };
      const B = p => { v3(p, "p"); const r = Math.hypot(p[0], p[1], p[2]); if (!(r > 0)) return [NaN, NaN, NaN];
        const k = MU0 / (4 * Math.PI * r ** 3), mr = m * p[2] / r; return [k * 3 * mr * p[0] / r, k * 3 * mr * p[1] / r, k * (3 * mr * p[2] / r - m)]; };
      const S = p => S3(E(p), B(p));
      const plan = (x, y) => { const s = S([fini(x, "x"), fini(y, "y"), 0]); return [s[0], s[1]]; };
      function fluxSphere(c, R, n) {
        v3(c, "c"); positif(R, "R"); n = entier(n == null ? 120 : n, "n", 4);
        let net = 0, absolu = 0;
        for (let i = 0; i < n; i++) {
          const th = Math.PI * (i + 0.5) / n, st = Math.sin(th), ct = Math.cos(th);
          for (let j = 0; j < 2 * n; j++) {
            const ph = Math.PI * (j + 0.5) / n, nn = [st * Math.cos(ph), st * Math.sin(ph), ct];
            const s = S([c[0] + R * nn[0], c[1] + R * nn[1], c[2] + R * nn[2]]), f = (s[0] * nn[0] + s[1] * nn[1] + s[2] * nn[2]) * R * R * st * (Math.PI / n) ** 2;
            net += f; absolu += Math.abs(f);
          }
        }
        return { net, absolu };
      }
      return { E, B, S, plan, Lz: MU0 * q * m / (4 * Math.PI * d), fluxSphere };
    }

    /* §27-6, Fig. 27-7. Einstein's box: a car of mass M and length L, free on a frictionless track, sends the energy U from
       one end to the other (a flash of light). If the centre of mass of the whole cannot move, M x = (U/c²) L (27.22) with
       x ≪ L: the recoil x, the momentum p = U/c (27.22p), the speed v = p/M, the time of flight t = L/c. exact: the car
       moves while the flash travels, t = L/(c + v), x = U L/(M c² + U); the relative gap to the first form is U/(M c²).
       The car is rigid and slow (v ≪ c), the energy is carried by a flash with p = U/c. { m = U/c², p, v, t, x, xExact } */
    function boiteEinstein(o) {
      const M = positif(o.M, "M"), L = positif(o.L, "L"), U = positif(o.U, "U");
      const p = U / C, v = p / M;
      return { m: U / (C * C), p, v, t: L / C, x: U * L / (M * C * C), xExact: U * L / (M * C * C + U), tExact: L / (C + v) };
    }

    /* §27-6. N particles per m³ of rest mass m0, all at the speed v along a line (a beam). Energy flux through a plane
       across the beam, N v γ m0 c² (W·m⁻²), and momentum density N γ m0 v (kg·m⁻²·s⁻¹): their ratio is 1/c² at every
       speed, exactly (special relativity; no interaction between the particles). { gamma, flux, densite, rapport } */
    function fluxParticules(o) {
      const N = positif(o.N, "N"), m0 = positif(o.m0, "m0"), v = positif0(o.v, "v");
      if (!(v < C)) err("v doit rester inférieure à c");
      const g = 1 / Math.sqrt(1 - (v / C) ** 2);
      const flux = N * v * g * m0 * C * C, densite = N * g * m0 * v;
      return { gamma: g, flux, densite, rapport: flux > 0 ? densite / flux : 1 / (C * C) };
    }

    /* §27-6. A beam of intensity I (W·m⁻²) at normal incidence on a surface of reflectance R (0: black, 1: mirror):
       momentum density in the beam I/c² (27.21), momentum brought per m² and per second I/c, pressure (1 + R) I/c.
       Plane wave in vacuum, steady state; the heating of the surface and its own emission are neglected. */
    function pressionLumiere(I, R) {
      positif0(I, "I"); R = R == null ? 0 : fini(R, "R"); if (R < 0 || R > 1) err("R doit être entre 0 et 1");
      return { densite: I / (C * C), apport: I / C, pression: (1 + R) * I / C };
    }

    Object.assign(api, { energieRepartie, condensateurFlux, chargeAimant, boiteEinstein, fluxParticules, pressionLumiere });
  }

  /* ---------- Étape « Impédances et réseaux en régime sinusoïdal » (II.22.1 à 22.4) ---------- */
  {
    const { c, add, sub, mul, div } = Cx, mod = Cx.abs;

    /* Lumped models of three real components, values of catalogue order (an example, not a datasheet):
       bobine        L in series with the resistance r of its wire, the whole shunted by the turn-to-turn capacitance Cp ;
       condensateur  C shunted by the leakage resistance Rf, in series with the ESR and the inductance of its leads (esl) ;
       resistance    R in series with the inductance of its leads Ls, the whole shunted by Cp.
       Each model is itself lumped: it holds while the component (taille, m) is small against λ = 2πc/ω. */
    const COMPOSANTS = {
      bobine: { L: 10e-3, r: 5, Cp: 20e-12, taille: 0.03 },
      condensateur: { C: 100e-9, Rf: 1e9, esr: 0.05, esl: 10e-9, taille: 0.01 },
      resistance: { R: 1e3, Ls: 20e-9, Cp: 0.2e-12, taille: 0.01 },
    };
    function composant(type, w, o) {
      if (!COMPOSANTS[type]) err("composant inconnu « " + type + " » (" + Object.keys(COMPOSANTS).join(", ") + ")");
      positif(w, "ω");
      const p = Object.assign({}, COMPOSANTS[type], o || {});
      Object.keys(p).forEach(k => positif(p[k], k));
      const zL = x => c(0, w * x), zC = x => c(0, -1 / (w * x));
      let Z, Zi;
      if (type === "bobine") { Zi = zL(p.L); Z = par(add(c(p.r), Zi), zC(p.Cp)); }
      else if (type === "condensateur") { Zi = zC(p.C); Z = add(add(c(p.esr), zL(p.esl)), par(c(p.Rf), Zi)); }
      else { Zi = c(p.R); Z = par(add(c(p.R), zL(p.Ls)), zC(p.Cp)); }
      const lambda = 2 * Math.PI * Cst.c / w;
      return { Z, Zideal: Zi, ecart: mod(sub(Z, Zi)) / mod(Zi), module: mod(Z), phase: Math.atan2(Z.im, Z.re),
        taille: p.taille, lambda, rapportTaille: p.taille / lambda, parametres: p };
    }
    /* The range of ω around the best point where the real model stays within tol of the ideal impedance:
       scan from 10⁻² to 10¹³ rad·s⁻¹ (40 points per decade), then bisection in ln ω at both ends.
       wmin = 0 if the component is ideal down to the bottom of the scan, wmax = Infinity likewise at the top ;
       null if it is never within tol. The size criterion (taille ≪ λ) is separate: rapportTaille in composant. */
    function domaineIdeal(type, tol, o) {
      positif(tol, "tolérance");
      const e = lw => composant(type, Math.exp(lw), o).ecart, a = Math.log(1e-2), b = Math.log(1e13), N = 600;
      const lw = Array.from({ length: N + 1 }, (_, i) => a + (b - a) * i / N), ec = lw.map(e);
      let k = 0; ec.forEach((x, i) => { if (x < ec[k]) k = i; });
      if (ec[k] > tol) return null;
      let i0 = k, i1 = k;
      while (i0 > 0 && ec[i0 - 1] <= tol) i0--;
      while (i1 < N && ec[i1 + 1] <= tol) i1++;
      const borne = (dedans, dehors) => { for (let n = 0; n < 60; n++) { const m = (dedans + dehors) / 2; if (e(m) <= tol) dedans = m; else dehors = m; } return Math.exp(dedans); };
      return { wmin: i0 === 0 ? 0 : borne(lw[i0], lw[i0 - 1]), wmax: i1 === N ? Infinity : borne(lw[i1], lw[i1 + 1]),
        wmeilleur: Math.exp(lw[k]), ecartMin: ec[k] };
    }

    /* A real generator: the ideal emf ℰ in series with its internal impedance zi (Thévenin form), on a load Z.
       Exact for a linear source at one frequency ; a cell's zi changes with its current, its charge and its temperature.
       ecart = |V − ℰ|/|ℰ| = |zi|/|zi + Z| : the error of the ideal-generator model on this load. */
    function generateur(e, zi, Z) {
      e = cplx(e, "ℰ"); zi = cplx(zi, "z_i"); Z = cplx(Z, "Z");
      const s = add(zi, Z); if (mod(s) === 0) err("z_i + Z = 0 : courant infini");
      const I = div(e, s);
      return { I, V: mul(Z, I), ecart: mod(zi) / mod(s), ideal: { V: e, I: mod(Z) === 0 ? null : div(e, Z) } };
    }
    /* Norton form of the same source: a current source J = ℰ/zi in parallel with the admittance y = 1/zi. Exact
       equivalence seen from the terminals ; an ideal voltage source (zi = 0) has none. */
    function norton(e, zi) {
      e = cplx(e, "ℰ"); zi = cplx(zi, "z_i");
      if (mod(zi) === 0) err("un générateur de tension idéal (z_i = 0) n'a pas de forme de Norton");
      return { J: div(e, zi), y: inv(zi) };
    }
    function chargerNorton(J, y, Z) {
      J = cplx(J, "J"); y = cplx(y, "y"); Z = cplx(Z, "Z");
      const Y = add(y, mod(Z) === 0 ? err("charge nulle : V = 0") : inv(Z)), V = div(J, Y);
      return { V, I: div(V, Z) };
    }

    /* A network: names of nodes, and branches { de, vers, z, e } — impedance z in series with an emf e that drives the
       current from de to vers, so that V(de) − V(vers) = z I − e — or { de, vers, j }, an ideal current source
       (I = j from de to vers). resoudre writes Kirchhoff's rules as they stand: (22.17) at every node but the
       reference (masse, default the first), one relation per branch ; (22.14) then holds by construction, and
       mailles checks it. Unknowns: n − 1 potentials and b currents, complex Gauss elimination with partial pivoting.
       Exact for ideal lumped elements (circuit ≪ λ) ; singular, hence an error, for a loop of ideal voltage sources,
       a node fed only by current sources, or a part of the network cut from the reference. */
    function lireReseau(r) {
      if (!r || !Array.isArray(r.noeuds) || r.noeuds.length < 2) err("réseau { noeuds: [au moins deux noms], branches: […] }");
      if (new Set(r.noeuds).size !== r.noeuds.length) err("deux nœuds portent le même nom");
      if (!Array.isArray(r.branches) || !r.branches.length) err("réseau sans branche");
      const masse = r.masse == null ? r.noeuds[0] : r.masse;
      if (!r.noeuds.includes(masse)) err("masse « " + masse + " » absente des nœuds");
      const branches = r.branches.map((b, k) => {
        if (!b || !r.noeuds.includes(b.de) || !r.noeuds.includes(b.vers)) err("branche " + k + " : de et vers doivent être des nœuds");
        if (b.de === b.vers) err("branche " + k + " : ses deux bouts sont le même nœud");
        if (b.j != null) { if (b.z != null || b.e != null) err("branche " + k + " : une source de courant n'a ni z ni e"); return { de: b.de, vers: b.vers, j: cplx(b.j, "j") }; }
        return { de: b.de, vers: b.vers, z: cplx(b.z == null ? 0 : b.z, "z"), e: cplx(b.e == null ? 0 : b.e, "ℰ") };
      });
      return { noeuds: r.noeuds.slice(), masse, branches };
    }
    function gauss(A, y) {
      const n = y.length, s = Math.max(...A.map(l => Math.max(...l.map(mod))));
      for (let k = 0; k < n; k++) {
        let p = k; for (let i = k + 1; i < n; i++) if (mod(A[i][k]) > mod(A[p][k])) p = i;
        if (!(mod(A[p][k]) > 1e-13 * s)) err("réseau singulier : boucle de sources de tension idéales, nœud alimenté par des sources de courant seules, ou partie isolée");
        [A[k], A[p]] = [A[p], A[k]]; [y[k], y[p]] = [y[p], y[k]];
        for (let i = k + 1; i < n; i++) {
          const f = div(A[i][k], A[k][k]); if (f.re === 0 && f.im === 0) continue;
          for (let j = k; j < n; j++) A[i][j] = sub(A[i][j], mul(f, A[k][j]));
          y[i] = sub(y[i], mul(f, y[k]));
        }
      }
      const x = new Array(n);
      for (let i = n - 1; i >= 0; i--) { let t = y[i]; for (let j = i + 1; j < n; j++) t = sub(t, mul(A[i][j], x[j])); x[i] = div(t, A[i][i]); }
      return x;
    }
    function resoudre(r) {
      const R = lireReseau(r), libres = R.noeuds.filter(n => n !== R.masse), idx = new Map(libres.map((n, i) => [n, i]));
      const n1 = libres.length, m = R.branches.length, N = n1 + m;
      const A = Array.from({ length: N }, () => Array.from({ length: N }, () => c(0))), y = Array.from({ length: N }, () => c(0));
      R.branches.forEach((b, k) => {
        const col = n1 + k, row = n1 + k;
        if (idx.has(b.de)) A[idx.get(b.de)][col] = add(A[idx.get(b.de)][col], c(1));           // leaves de
        if (idx.has(b.vers)) A[idx.get(b.vers)][col] = sub(A[idx.get(b.vers)][col], c(1));     // enters vers
        if (b.j) { A[row][col] = c(1); y[row] = b.j; return; }
        if (idx.has(b.de)) A[row][idx.get(b.de)] = add(A[row][idx.get(b.de)], c(1));
        if (idx.has(b.vers)) A[row][idx.get(b.vers)] = sub(A[row][idx.get(b.vers)], c(1));
        A[row][col] = c(-b.z.re, -b.z.im); y[row] = c(-b.e.re, -b.e.im);
      });
      const x = gauss(A, y), V = {};
      R.noeuds.forEach(n => { V[n] = n === R.masse ? c(0) : x[idx.get(n)]; });
      const I = R.branches.map((_, k) => x[n1 + k]), U = R.branches.map(b => sub(V[b.de], V[b.vers]));
      const bilan = {}; R.noeuds.forEach(n => { bilan[n] = c(0); });
      R.branches.forEach((b, k) => { bilan[b.de] = sub(bilan[b.de], I[k]); bilan[b.vers] = add(bilan[b.vers], I[k]); });
      return { V, I, U, noeuds: bilan, residuNoeuds: Math.max(...Object.values(bilan).map(mod)), echelle: Math.max(...I.map(mod)) };
    }
    /* Independent equations of a connected network: n − 1 node laws and b − n + 1 loops, one per branch outside a
       spanning tree (breadth first from masse). Each loop is [{ branche, sens }] with sens = +1 when it is run from de to
       vers ; (22.14) reads Σ sens U = 0. */
    function compter(r) {
      const R = lireReseau(r), arbre = new Map([[R.masse, null]]), file = [R.masse], dansArbre = new Set();
      while (file.length) {
        const n = file.shift();
        R.branches.forEach((b, k) => {
          const autre = b.de === n ? b.vers : b.vers === n ? b.de : null;
          if (autre == null || arbre.has(autre)) return;
          arbre.set(autre, { k, depuis: n }); dansArbre.add(k); file.push(autre);
        });
      }
      if (arbre.size !== R.noeuds.length) err("réseau non connexe : " + R.noeuds.filter(n => !arbre.has(n)).join(", ") + " isolé(s)");
      const versMasse = n => { const p = []; for (let x = n; arbre.get(x); x = arbre.get(x).depuis) p.push(Object.assign({ noeud: x }, arbre.get(x))); return p; };
      const boucles = [];
      R.branches.forEach((b, k) => {
        if (dansArbre.has(k)) return;
        /* de → vers by the branch, then vers → masse → de along the tree, the common part cancelling out */
        const aller = versMasse(b.vers), retour = versMasse(b.de), commun = new Set(aller.map(s => s.k).filter(x => retour.some(s => s.k === x)));
        const boucle = [{ branche: k, sens: 1 }];
        aller.filter(s => !commun.has(s.k)).forEach(s => boucle.push({ branche: s.k, sens: R.branches[s.k].de === s.noeud ? 1 : -1 }));
        retour.filter(s => !commun.has(s.k)).reverse().forEach(s => boucle.push({ branche: s.k, sens: R.branches[s.k].de === s.noeud ? -1 : 1 }));
        boucles.push(boucle);
      });
      return { n: R.noeuds.length, b: R.branches.length, loisNoeuds: R.noeuds.length - 1, loisMailles: boucles.length, boucles };
    }
    function mailles(r, sol) {
      const { boucles } = compter(r), s = sol || resoudre(r);
      const sommes = boucles.map(bl => bl.reduce((t, { branche, sens }) => add(t, c(sens * s.U[branche].re, sens * s.U[branche].im)), c(0)));
      return { boucles, sommes, residu: Math.max(0, ...sommes.map(mod)), echelle: Math.max(...s.U.map(mod)) };
    }

    /* The network seen from the terminals a (+) and b: (22.22) with A = ℰ_eff, the open-circuit voltage, and
       B = z_eff, the impedance with every source killed (emf → 0, current source → open) measured by injecting 1 A.
       Icc, the short-circuit current, is computed on its own: ℰ_eff = z_eff Icc checks the whole. Exact for a linear
       network at one frequency (II.22.4) ; Norton: J = Icc, y = 1/z_eff. */
    function thevenin(r, a, b) {
      const R = lireReseau(r);
      if (!R.noeuds.includes(a) || !R.noeuds.includes(b) || a === b) err("bornes a et b : deux nœuds distincts du réseau");
      const so = resoudre(R), E = sub(so.V[a], so.V[b]);
      const passif = { noeuds: R.noeuds, masse: R.masse, branches: R.branches.map(x => x.j ? { de: x.de, vers: x.vers, j: 0 } : { de: x.de, vers: x.vers, z: x.z }).concat([{ de: b, vers: a, j: 1 }]) };
      const sp = resoudre(passif), z = sub(sp.V[a], sp.V[b]);
      const cc = resoudre({ noeuds: R.noeuds, masse: R.masse, branches: R.branches.concat([{ de: a, vers: b, z: 0 }]) });
      const Icc = cc.I[R.branches.length];
      return { E, z, Icc, J: Icc, y: mod(z) === 0 ? null : inv(z) };
    }
    /* The load Z between a and b, the whole network solved again: I from a to b through Z, V = V(a) − V(b). */
    function brancher(r, a, b, Z) {
      const R = lireReseau(r), s = resoudre({ noeuds: R.noeuds, masse: R.masse, branches: R.branches.concat([{ de: a, vers: b, z: cplx(Z, "Z") }]) });
      return { I: s.I[R.branches.length], V: sub(s.V[a], s.V[b]), solution: s };
    }

    /* Two generators, three impedances between two nodes N (masse) and P, Kirchhoff's own example (22.20), (22.21):
       branch 1 = ℰ1 then z1, branch 2 = z2, branch 3 = ℰ2 then z3, both emfs raising P above N. I1 and I2 are the
       currents of (22.20) and (22.21) (I1 down through z1, I2 down through z2), I3 = −(I1 + I2).
       sansZ1: the same network with z1 taken out, its terminals P (+) and M ; V1 = V(P) − V(M) = z1 I1. */
    function deuxGenerateurs(o) {
      if (!o) err("{ z1, z2, z3, e1, e2 }");
      const z1 = cplx(o.z1, "z1"), z2 = cplx(o.z2, "z2"), z3 = cplx(o.z3, "z3"), e1 = cplx(o.e1, "ℰ1"), e2 = cplx(o.e2, "ℰ2");
      const reseau = { noeuds: ["N", "P"], branches: [{ de: "N", vers: "P", z: z1, e: e1 }, { de: "P", vers: "N", z: z2 }, { de: "N", vers: "P", z: z3, e: e2 }] };
      const s = resoudre(reseau), I1 = c(-s.I[0].re, -s.I[0].im), I2 = s.I[1];
      const sansZ1 = { noeuds: ["N", "P", "M"], branches: [{ de: "N", vers: "M", e: e1 }, { de: "P", vers: "N", z: z2 }, { de: "N", vers: "P", z: z3, e: e2 }] };
      return { reseau, solution: s, I1, I2, I3: c(-(I1.re + I2.re), -(I1.im + I2.im)), V: s.V.P, sansZ1, bornes: ["P", "M"] };
    }

    /* The bridge: generator ℰ (internal zs) from B to A, arms za (A–C), zb (C–B), zc (A–D), zd (D–B), detector zg
       from C to D. Ig = 0 exactly when za zd = zb zc, whatever ℰ, zs and zg ; desequilibre measures the distance
       to it. Maxwell–Wien form: za = R1 ∥ C1, zb = R2, zc = R3, zd the coil under test: balance Rx = R2R3/R1,
       Lx = R2R3C1, at every frequency. */
    function pont(o) {
      if (!o) err("{ za, zb, zc, zd, zg, e, zs }");
      const k = ["za", "zb", "zc", "zd", "zg"].map(n => cplx(o[n], n)), [za, zb, zc, zd, zg] = k;
      const reseau = { noeuds: ["B", "A", "C", "D"], branches: [{ de: "B", vers: "A", z: cplx(o.zs == null ? 0 : o.zs, "zs"), e: cplx(o.e == null ? 1 : o.e, "ℰ") },
        { de: "A", vers: "C", z: za }, { de: "C", vers: "B", z: zb }, { de: "A", vers: "D", z: zc }, { de: "D", vers: "B", z: zd }, { de: "C", vers: "D", z: zg }] };
      const s = resoudre(reseau), p = mul(za, zd), q = mul(zb, zc);
      return { reseau, solution: s, Ig: s.I[5], Vg: s.U[5], desequilibre: mod(sub(p, q)) / Math.max(mod(p), mod(q)) };
    }
    function maxwellWien(R1, C1, R2, R3, w) {
      [R1, C1, R2, R3, w].forEach((x, i) => positif(x, ["R1", "C1", "R2", "R3", "ω"][i]));
      return { za: par(c(R1), c(0, -1 / (w * C1))), zb: c(R2), zc: c(R3), Rx: R2 * R3 / R1, Lx: R2 * R3 * C1 };
    }

    Object.assign(api, { COMPOSANTS, composant, domaineIdeal, generateur, norton, chargerNorton, resoudre, compter, mailles,
      thevenin, brancher, deuxGenerateurs, pont, maxwellWien });
  }

  /* ---------- Étape « Puissance en régime sinusoïdal et filtres » (II.22.5 à 22.8) ---------- */
  {
    const nul = z => z.re === 0 && z.im === 0;

    /* §22-5. A generator drives I = I0 cos ωt through z = R + iX (22.24). The voltage is the real part of I0 e^(iωt) z,
       u = I0 R cos ωt − I0 X sin ωt (22.26) = U0 cos(ωt + φ), φ = arg z. The power p = u i = P + S cos(2ωt + φ):
       mean P = I0² R/2 ((22.26a)), the swing S = U0 I0/2 (apparent power), Q = I0² X/2 (reactive power, var).
       Linear elements, steady state (the transient, of time constant ~ L/R, gone), lumped (size ≪ c/f). R may be
       negative (a source of power: §22-8). { R, X, Z, I0, U0, phi, T, i(t), u(t), p(t), P, Q, S, facteur = cos φ, Ieff, Ueff,
       rendue (J per period, see below) } */
    function regimeSinusoidal(z, I0, w) {
      z = cplx(z, "z"); positif(I0, "I0"); positif(w, "ω");
      const R = z.re, X = z.im, Z = Math.hypot(R, X);
      if (!(Z > 0)) err("z ne doit pas être nulle");
      return { R, X, Z, I0, U0: I0 * Z, phi: Math.atan2(X, R), T: 2 * Math.PI / w,
        i: t => I0 * Math.cos(w * fini(t, "t")),
        u: t => I0 * (R * Math.cos(w * fini(t, "t")) - X * Math.sin(w * t)),
        p: t => I0 * I0 * Math.cos(w * fini(t, "t")) * (R * Math.cos(w * t) - X * Math.sin(w * t)),
        P: I0 * I0 * R / 2, Q: I0 * I0 * X / 2, S: I0 * I0 * Z / 2, facteur: R / Z, Ieff: I0 / Math.SQRT2, Ueff: I0 * Z / Math.SQRT2,
        rendue: rendue(I0 * I0 * R / 2, I0 * I0 * Z / 2, w) };
    }
    /* The energy given back to the generator in one period: ∫ max(0, −p) dt with p = P + S cos θ, θ = 2ωt + φ, which runs
       twice through 2π per period; p < 0 for θ0 < θ < 2π − θ0, θ0 = arccos(−P/S): (2S sin θ0 − 2P(π − θ0))/ω.
       A pure inductance (P = 0): 2S/ω = L I0², twice the peak energy ½ L I0². */
    function rendue(P, S, w) {
      if (P >= S) return 0;                                         // a pure resistance: p ≥ 0 all the time
      const t0 = Math.acos(Math.max(-1, Math.min(1, -P / S)));
      return Math.max(0, (2 * S * Math.sin(t0) - 2 * P * (Math.PI - t0)) / w);
    }
    /* (22.26b): the mean power from the complex amplitudes (crest values), ½ Re(U I*). Exact for two sinusoids of the
       same frequency; with rms phasors it would be Re(U I*). */
    const puissanceMoyenne = (U, I) => { U = cplx(U, "U"); I = cplx(I, "I"); return (U.re * I.re + U.im * I.im) / 2; };

    /* z1 and z2 in parallel; z2 === null is an open end (z1 alone). Opposite impedances (an ideal tank at resonance) give
       an infinite impedance: error. */
    function parallele(a, b) {
      if (b === null) return a;
      if (nul(a) || nul(b)) return Cx.c(0);
      const s = Cx.add(a, b);
      if (nul(s)) err("impédances opposées en parallèle : impédance infinie");
      return Cx.div(Cx.mul(a, b), s);
    }

    /* §22-6, Fig. 22-18. A ladder of N sections, each a series z1 then a shunt z2, ended by zt across the last z2
       (zt = null: open end). By series and parallel steps from the far end: zs[k] = z1 + z2 ∥ zs[k + 1] ((22.27a) once
       the ladder is infinite), zs[N] = zt. { z = zs[0], zs }. Exact for ideal elements. */
    function echelle(z1, z2, N, zt) {
      z1 = cplx(z1, "z1"); z2 = cplx(z2, "z2"); entier(N, "N", 1);
      zt = zt == null ? null : cplx(zt, "zt");
      const zs = new Array(N + 1); zs[N] = zt;
      for (let k = N - 1; k >= 0; k--) zs[k] = Cx.add(z1, parallele(z2, zs[k + 1]));
      return { z: zs[0], zs };
    }

    /* (22.27): z0 = z1/2 ± √(z1²/4 + z1 z2), the impedance of the infinite ladder. The two roots z₊, z₋ have the
       propagation factors α = 1 − z1/z0 (22.29) α₊ = −z₋/z₊ and α₋ = −z₊/z₋, whose product is 1: the physical root is the
       one whose wave dies away from the source, |α| ≤ 1, i.e. the root of larger modulus. When both have the same modulus
       (pass band of a lossless ladder, |α| = 1), the one with Re z0 ≥ 0: the ladder takes power, it does not give it.
       This is the limit of the finite ladder when a little loss is added (tested). */
    function impedanceCaracteristique(z1, z2) {
      z1 = cplx(z1, "z1"); z2 = cplx(z2, "z2");
      if (nul(z1)) err("z1 nulle : l'échelle se réduit à des z2 en parallèle, d'impédance nulle");
      const s = racineC(Cx.add(Cx.scale(Cx.mul(z1, z1), 0.25), Cx.mul(z1, z2)));
      const h = Cx.scale(z1, 0.5), a = Cx.add(h, s), b = Cx.sub(h, s), ma = Cx.abs(a), mb = Cx.abs(b);
      if (Math.abs(ma - mb) > 1e-12 * Math.max(ma, mb)) return ma > mb ? a : b;
      return a.re >= b.re ? a : b;
    }
    /* (22.29) α = (z0 − z1)/z0: V(n + 1)/V(n) along the infinite ladder (or a finite one ended by z0). */
    function propagation(z1, z2) {
      const z0 = impedanceCaracteristique(z1, z2);
      return { z0, alpha: Cx.div(Cx.sub(z0, cplx(z1, "z1")), z0) };
    }

    /* §22-7, Fig. 22-21. The finite ladder of echelle(z1, z2, N, zt) driven by an ideal generator E at its input:
       V[k] is the voltage at the input of section k (V[0] = E, V[N] across zt), I[k] the current in its series z1.
       V[k + 1] = V[k] − z1 I[k], I[k] = V[k]/zs[k]. Ended by zt = z0 it gives V[n] = αⁿ E (22.30) exactly. */
    function tensions(z1, z2, N, zt, E) {
      const e = echelle(z1, z2, N, zt), a = cplx(z1, "z1"), V = [cplx(E == null ? 1 : E, "E")], I = [];
      for (let k = 0; k < N; k++) {
        if (nul(e.zs[k])) err("entrée en court-circuit à la section " + k);
        I.push(Cx.div(V[k], e.zs[k])); V.push(Cx.sub(V[k], Cx.mul(a, I[k])));
      }
      return { V, I, zs: e.zs, z: e.z };
    }

    /* §22-6 and 22-7, Fig. 22-20 and 22-23. The L-C ladder at ω: type "bas" (series L, shunt C: low pass, cutoff
       ω0 = 2/√(LC)) or "haut" (series C, shunt L: high pass, cutoff 1/(2√(LC))). z0 by (22.27), zMilieu = z0 − z1/2
       ((22.28) for the low pass: √(L/C − ω²L²/4)), α by (22.29): |α| = 1 in the pass band, real negative and |α| < 1
       outside ((22.32)). dephasage: the phase of α per section, in [−π, 0] for the low pass, in [0, π] for the high pass.
       Rc = √(L/C), the resistance that ends the ladder well at low frequency. Ideal L and C (no loss). */
    function echelleLC(L, C, w, type) {
      positif(L, "L"); positif(C, "C"); positif(w, "ω");
      type = type == null ? "bas" : type;
      if (type !== "bas" && type !== "haut") err("type « " + type + " » : « bas » ou « haut »");
      const bas = type === "bas", zL = Cx.c(0, w * L), zC = Cx.c(0, -1 / (w * C));
      const z1 = bas ? zL : zC, z2 = bas ? zC : zL, z0 = impedanceCaracteristique(z1, z2);
      const alpha = Cx.div(Cx.sub(z0, z1), z0);
      let ph = Cx.arg(alpha);
      if (bas && ph > Math.PI / 2) ph -= 2 * Math.PI;
      if (!bas && ph < -Math.PI / 2) ph += 2 * Math.PI;
      const w0 = bas ? 2 / Math.sqrt(L * C) : 1 / (2 * Math.sqrt(L * C));
      return { z1, z2, z0, zMilieu: Cx.sub(z0, Cx.scale(z1, 0.5)), alpha, module: Cx.abs(alpha), dephasage: ph,
        w0, passe: bas ? w < w0 : w > w0, Rc: Math.sqrt(L / C) };
    }

    /* §22-7, Fig. 22-24. A full-wave rectified voltage e(t) = U0 |sin ωt| (ω = 2πf, ideal diodes, an ideal source)
       = 2U0/π − (4U0/π) Σ cos(2kωt)/(4k² − 1), k = 1…nH, through N low-pass L-C sections ended by the load R across the last
       C (N = 0: R straight on the rectifier). Each harmonic through tensions(); the mean passes whole (no resistance in
       the L's). Linear L and C, steady state (after a few time constants). { continu, H: [{ f, module, phase }], entree(t),
       entreeSerie(t), sortie(t), ondulation (peak to peak of sortie), ondulationEntree = U0, Rc, w0, f0 } */
    function lissage(o) {
      const U0 = positif(o.U0, "U0"), f = positif(o.f, "f"), N = entier(o.N, "N", 0), R = positif(o.R, "R");
      const nH = entier(o.nH == null ? 200 : o.nH, "nH", 1), w = 2 * Math.PI * f;
      if (N > 0) { positif(o.L, "L"); positif(o.C, "C"); }
      const H = [];
      for (let k = 1; k <= nH; k++) {
        const wk = 2 * k * w;
        const h = N === 0 ? Cx.c(1) : tensions(Cx.c(0, wk * o.L), Cx.c(0, -1 / (wk * o.C)), N, Cx.c(R), Cx.c(1)).V[N];
        H.push({ f: 2 * k * f, module: Cx.abs(h), phase: Cx.arg(h), a: -4 * U0 / (Math.PI * (4 * k * k - 1)) });
      }
      const continu = 2 * U0 / Math.PI;
      const somme = (t, filtre) => H.reduce((s, h, i) => s + h.a * (filtre ? h.module : 1) * Math.cos(2 * (i + 1) * w * t + (filtre ? h.phase : 0)), continu);
      const sortie = t => somme(fini(t, "t"), true);
      let lo = Infinity, hi = -Infinity;
      for (let j = 0; j < 400; j++) { const v = sortie(j / (400 * 2 * f)); lo = Math.min(lo, v); hi = Math.max(hi, v); }
      const r = { continu, H: H.map(({ f, module, phase }) => ({ f, module, phase })), entree: t => U0 * Math.abs(Math.sin(w * fini(t, "t"))),
        entreeSerie: t => somme(fini(t, "t"), false), sortie, ondulation: hi - lo, ondulationEntree: U0 };
      if (N > 0) { r.Rc = Math.sqrt(o.L / o.C); r.w0 = 2 / Math.sqrt(o.L * o.C); r.f0 = r.w0 / (2 * Math.PI); }
      return r;
    }

    /* §22-8, Fig. 22-26. Two coupled coils L1, L2, mutual M (|M| ≤ √(L1 L2); the sign of M is the ± of (22.34)), coil 1
       in series with R1 on the generator E (crest complex amplitude), coil 2 on the load zc. Each coupling is an ideal
       generator driven by the other current, (22.35): ℰ1 = −iωM I2, ℰ2 = −iωM I1, two more linear equations; the two
       meshes (R1 + iωL1) I1 + iωM I2 = E, iωM I1 + (iωL2 + zc) I2 = 0 are solved by Cramer's rule. zin = E/I1 = R1 + iωL1 + zReflechie, zReflechie = ω²M²/(iωL2 + zc) ((22.35a)). Powers ½ Re(…).
       Linear coils (no saturation, no core loss), lumped (size ≪ c/f), winding capacitance neglected. */
    function mutuelle(o) {
      const L1 = positif(o.L1, "L1"), L2 = positif(o.L2, "L2"), M = fini(o.M, "M"), w = positif(o.w, "ω");
      const R1 = positif0(o.R1 == null ? 0 : o.R1, "R1"), zc = cplx(o.zc, "zc"), E = cplx(o.E == null ? 1 : o.E, "E");
      if (Math.abs(M) > Math.sqrt(L1 * L2) * (1 + 1e-12)) err("|M| ne peut pas dépasser √(L1 L2)");
      const jM = Cx.c(0, w * M), z11 = Cx.c(R1, w * L1), z22 = Cx.add(Cx.c(0, w * L2), zc);
      const det = Cx.sub(Cx.mul(z11, z22), Cx.mul(jM, jM));
      if (nul(det)) err("système singulier : couplage parfait sans charge ni résistance");
      const I1 = Cx.div(Cx.mul(E, z22), det), I2 = Cx.neg(Cx.div(Cx.mul(jM, E), det));
      const zin = Cx.div(E, I1);
      return { I1, I2, zin, zReflechie: Cx.sub(zin, z11), e1: Cx.neg(Cx.mul(jM, I2)), e2: Cx.neg(Cx.mul(jM, I1)),
        Uc: Cx.mul(zc, I2), P1: puissanceMoyenne(E, I1), PR1: R1 * Cx.abs2(I1) / 2, Pc: zc.re * Cx.abs2(I2) / 2, k: M / Math.sqrt(L1 * L2) };
    }

    Object.assign(api, { regimeSinusoidal, puissanceMoyenne, echelle, impedanceCaracteristique, propagation, tensions,
      echelleLC, lissage, mutuelle });
  }

  /* ---------- Étape « Amplificateur opérationnel et filtres actifs » (programme de CPGE, X.elec_ao.1 à 3) ---------- */
  {
    const borne = (x, m) => (x > m ? m : x < -m ? -m : x);
    const TAU = 2 * Math.PI;

    /* Two real op amps, typical values at ±15 V and 25 °C from their makers' data sheets (Texas Instruments SLOS094H
       for the µA741 and SLOS081O for the TL081; STMicroelectronics DocID5304 for the 741 bandwidth): static gain A0
       (V/V), unity-gain frequency fT (Hz, the gain–bandwidth product of a one-pole amplifier), slew rate SR (V·s⁻¹),
       output swing Vsat (V, on 10 kΩ). The TL081's fT is 3 MHz in its older packages, 5,25 MHz in the newer ones. */
    const AO = Object.freeze({
      ua741: Object.freeze({ nom: "µA741", A0: 2e5, fT: 1e6, SR: 0.5e6, Vsat: 14 }),
      tl081: Object.freeze({ nom: "TL081", A0: 2e5, fT: 3e6, SR: 20e6, Vsat: 13.5 }),
    });

    /* The one-pole model of a real op amp: vs = A(f) ε with A(f) = A0/(1 + i f/fa), fa = fT/A0, the output bounded by
       ±Vsat and its rate by ±SR. It neglects the input currents (pA to nA), the offset voltage (mV), the output
       resistance and every pole above fT. { A0, fT, SR, Vsat, fa, A(f) → Cx } */
    function aoModele(ao) {
      if (!ao || typeof ao !== "object") err("ao : { A0, fT, SR, Vsat }");
      const A0 = positif(ao.A0, "A0"), fT = positif(ao.fT, "fT"), SR = ao.SR === Infinity ? Infinity : positif(ao.SR, "SR");
      const Vsat = ao.Vsat === Infinity ? Infinity : positif(ao.Vsat, "Vsat");
      if (!(fT < A0 * 1e12)) err("fT incohérent avec A0");
      const fa = fT / A0;
      return { A0, fT, SR, Vsat, fa, A: f => { positif0(f, "f"); return Cx.div(Cx.c(A0), Cx.c(1, f / fa)); } };
    }

    /* A resistive feedback amplifier, ε = v+ − v− = a ve − β vs. "nonInverseur": ve on v+, R1 from v− to ground,
       R2 from vs to v− (R2 = 0: the follower); "inverseur": ve through R1 to v−, R2 from vs to v−, v+ grounded.
       β = R1/(R1 + R2), a = 1 or −R2/(R1 + R2). Ideal gain a/β (ε = 0): 1 + R2/R1 or −R2/R1. Input resistance:
       infinite (input currents neglected) or R1. { type, R1, R2, beta, a, G, Re } */
    function montage(type, o) {
      if (!o || typeof o !== "object") err("montage : { R1, R2 }");
      const R2 = positif0(o.R2, "R2");
      if (type === "nonInverseur") {
        const R1 = o.R1 === Infinity ? Infinity : positif(o.R1, "R1"), beta = R1 === Infinity ? 1 : R1 / (R1 + R2);
        return { type, R1, R2, beta, a: 1, G: 1 / beta, Re: Infinity };
      }
      if (type === "inverseur") {
        const R1 = positif(o.R1, "R1"); positif(R2, "R2");
        return { type, R1, R2, beta: R1 / (R1 + R2), a: -R2 / (R1 + R2), G: -R2 / R1, Re: R1 };
      }
      return err("montage : nonInverseur ou inverseur");
    }

    /* Closed-loop gain with a finite A: vs = A(a ve − β vs), G = a A/(1 + Aβ) = G_ideal × Aβ/(1 + Aβ), exactly, for the
       linear model. At f = 0 the relative gap to the ideal gain is 1/(1 + A0β) ≈ |G_ideal|/A0 (non-inverting);
       the −3 dB frequency is fa(1 + A0β) ≈ β fT. { G(f) → Cx, G0, ecart0, fc } */
    function boucle(m, ao) {
      const A = aoModele(ao);
      const G = f => { const Af = A.A(f); return Cx.div(Cx.scale(Af, m.a), Cx.add(Cx.c(1), Cx.scale(Af, m.beta))); };
      const G0 = m.a * A.A0 / (1 + A.A0 * m.beta);
      return { G, G0, ecart0: Math.abs(G0 - m.G) / Math.abs(m.G), fc: A.fa * (1 + A.A0 * m.beta) };
    }

    /* The same amplifier in the time domain, ve(t) any function: the one-pole op amp dvs/dt = 2π fa (A0 ε − vs) with
       ε = a ve − β vs, ve held over each step (the linear part integrated exactly, stable at any step), then the
       change per step bounded by SR h and the output by ±Vsat. n steps over duree. { t, ve, vs, ideal, eps } ; ideal
       = G ve, unbounded: the ideal op amp. Valid for h ≪ the period of ve; the linear part is exact for ve constant. */
    function simulerMontage(m, ao, ve, duree, n) {
      const A = aoModele(ao); fonction(ve, "ve"); positif(duree, "duree"); entier(n, "n", 1);
      const h = duree / n, k = TAU * A.fa * (1 + A.A0 * m.beta), dec = Math.exp(-k * h), dmax = A.SR * h;
      let vs = 0;
      const T = [0], E = [ve(0)], S = [0], I = [m.G * ve(0)], P = [m.a * ve(0)];
      for (let j = 1; j <= n; j++) {
        const e = ve((j - 0.5) * h), cible = A.A0 * m.a * e / (1 + A.A0 * m.beta);
        const lin = cible + (vs - cible) * dec;
        vs = borne(vs + borne(lin - vs, dmax), A.Vsat);
        const t = j * h, x = ve(t);
        T.push(t); E.push(x); S.push(vs); I.push(m.G * x); P.push(m.a * x - m.beta * vs);
      }
      return { t: T, ve: E, vs: S, ideal: I, eps: P };
    }

    /* What limits an amplifier of ideal gain G fed with E sin 2πft: the bandwidth (f against fc), the output swing
       (|G|E against Vsat), the slew rate (2πf|G|E against SR). fPuissance = SR/(2π Vsat): above it, no full-swing sine
       comes out undistorted. { Gid, G, ecart = 1 − |G(f)|/|Gid|, fc, crete, sature, pente, balayage, fPuissance, regime } ;
       regime = "lineaire", "bande", "saturation" or "balayage", the first limit met (bande: |G(f)| below Gid by > 1 %). */
    function limites(m, ao, E, f) {
      const A = aoModele(ao), b = boucle(m, ao); positif(E, "E"); positif(f, "f");
      const Gf = Cx.abs(b.G(f)), crete = Gf * E, pente = TAU * f * crete, ecart = 1 - Gf / Math.abs(m.G);
      const sature = crete > A.Vsat, balayage = pente > A.SR;
      const regime = sature ? "saturation" : balayage ? "balayage" : ecart > 0.01 ? "bande" : "lineaire";
      return { Gid: m.G, G: Gf, ecart, fc: b.fc, crete, sature, pente, balayage, fPuissance: A.SR / (TAU * A.Vsat), regime };
    }

    /* Inverting summer: vs = −R2 Σ vk/Rk with an ideal op amp (v− a virtual ground: the inputs do not interact). With
       a finite A0 every term is multiplied by A0β/(1 + A0β), β = (1/R2)/(1/R2 + Σ 1/Rk). { ideal, reel, beta } */
    function sommateur(R2, entrees, A0) {
      positif(R2, "R2"); if (!Array.isArray(entrees) || !entrees.length) err("entrees : [{ R, v }, …]");
      let s = 0, g = 1 / R2;
      for (const [i, x] of entrees.entries()) { s += fini(x.v, "v" + i) / positif(x.R, "R" + i); g += 1 / x.R; }
      const beta = (1 / R2) / g, ideal = -R2 * s, k = A0 == null ? 1 : positif(A0, "A0") * beta / (1 + positif(A0, "A0") * beta);
      return { ideal, reel: ideal * k, beta };
    }

    /* Inverting integrator R, C, with a leak resistance Rp across C (Rp = Infinity: none) and the op amp's offset
       voltage Vio (and input bias current Ib): ideal vs = −(1/RC)∫ve dt. With ve = 0 and no leak, the offset is
       integrated: the output drifts at Vio/(RC) (+ Ib/C) and reaches Vsat after tSat. With the leak it settles at
       Vio(1 + Rp/R) + Ib Rp and the circuit integrates only above fBas = 1/(2π Rp C): it is then the low-pass
       H = −(Rp/R)/(1 + i f/fBas). { derive, tSat, plateau, fBas, H(f) → Cx } */
    function integrateur(o) {
      if (!o || typeof o !== "object") err("integrateur : { R, C, Rp, Vio, Ib, Vsat }");
      const R = positif(o.R, "R"), C = positif(o.C, "C"), Rp = o.Rp == null || o.Rp === Infinity ? Infinity : positif(o.Rp, "Rp");
      const Vio = fini(o.Vio || 0, "Vio"), Ib = fini(o.Ib || 0, "Ib"), Vsat = positif(o.Vsat == null ? 14 : o.Vsat, "Vsat");
      const derive = Math.abs(Vio / (R * C) + Ib / C);
      const fBas = Rp === Infinity ? 0 : 1 / (TAU * Rp * C);
      const H = f => { positif(f, "f"); return Rp === Infinity ? Cx.c(0, 1 / (TAU * f * R * C)) : Cx.div(Cx.c(-Rp / R), Cx.c(1, f / fBas)); };
      return { derive, tSat: derive > 0 ? Vsat / derive : Infinity, plateau: Rp === Infinity ? Infinity : Vio * (1 + Rp / R) + Ib * Rp, fBas, H };
    }

    /* ---------- active filters ---------- */
    /* Inverting stage with impedances Z1 (input) and Z2 (feedback), op amp gain A (Cx or Infinity):
       β = Z1/(Z1 + Z2), a = −Z2/(Z1 + Z2), H = a A/(1 + Aβ) → −Z2/Z1 when A → ∞. */
    function inverseurZ(Z1, Z2, A) {
      const s = Cx.add(Z1, Z2);
      if (A === Infinity) return Cx.neg(Cx.div(Z2, Z1));
      const a = Cx.neg(Cx.div(Z2, s)), beta = Cx.div(Z1, s);
      return Cx.div(Cx.mul(a, A), Cx.add(Cx.c(1), Cx.mul(A, beta)));
    }
    /* Three active filters, components ideal, sinusoidal steady state, H = vs/ve at the frequency f:
       "passeBas1"  inverting, R1 in, R2 ∥ C in feedback: H = −(R2/R1)/(1 + i f/f0), f0 = 1/(2π R2 C) ;
       "passeHaut1" inverting, R1 in series with C at the input, R2 in feedback: H = −(R2/R1)(i f/f0)/(1 + i f/f0),
                    f0 = 1/(2π R1 C) ;
       "sallenKey"  unity-gain low-pass, R1 then R2 in series, C1 from their junction to vs, C2 from v+ to ground:
                    H = 1/(1 + i ω C2(R1 + R2) − ω² R1R2C1C2), f0 = 1/(2π √(R1R2C1C2)), Q = √(R1R2C1C2)/(C2(R1 + R2)).
       H(f, ao) : ideal op amp if ao is omitted, otherwise the one-pole model (aoModele), by the node equations.
       { type, ordre, H0, f0, Q, H(f, ao) → Cx } */
    const FILTRES_ACTIFS = ["passeBas1", "passeHaut1", "sallenKey"];
    function filtreActif(type, o) {
      if (!o || typeof o !== "object") err("filtreActif : composants");
      const Zc = (C, f) => Cx.c(0, -1 / (TAU * f * C));                       // 1/(iωC)
      if (type === "passeBas1") {
        const R1 = positif(o.R1, "R1"), R2 = positif(o.R2, "R2"), C = positif(o.C, "C");
        return { type, ordre: 1, H0: -R2 / R1, f0: 1 / (TAU * R2 * C), H(f, ao) {
          positif(f, "f"); const Z2 = Cx.div(Cx.c(R2), Cx.c(1, TAU * f * R2 * C));
          return inverseurZ(Cx.c(R1), Z2, ao ? aoModele(ao).A(f) : Infinity); } };
      }
      if (type === "passeHaut1") {
        const R1 = positif(o.R1, "R1"), R2 = positif(o.R2, "R2"), C = positif(o.C, "C");
        return { type, ordre: 1, H0: -R2 / R1, f0: 1 / (TAU * R1 * C), H(f, ao) {
          positif(f, "f"); return inverseurZ(Cx.add(Cx.c(R1), Zc(C, f)), Cx.c(R2), ao ? aoModele(ao).A(f) : Infinity); } };
      }
      if (type === "sallenKey") {
        const R1 = positif(o.R1, "R1"), R2 = positif(o.R2, "R2"), C1 = positif(o.C1, "C1"), C2 = positif(o.C2, "C2");
        const p = R1 * R2 * C1 * C2;
        return { type, ordre: 2, H0: 1, f0: 1 / (TAU * Math.sqrt(p)), Q: Math.sqrt(p) / (C2 * (R1 + R2)), H(f, ao) {
          positif(f, "f"); const s = Cx.c(0, TAU * f);
          /* follower vs = k v+, k = A/(1 + A); node v+: x = v+(1 + sR2C2); node x:
             ve/R1 = v+ [(1 + sR2C2)(1/R1 + sC1 + 1/R2) − k sC1 − 1/R2] */
          const k = ao ? (() => { const A = aoModele(ao).A(f); return Cx.div(A, Cx.add(Cx.c(1), A)); })() : Cx.c(1);
          const u = Cx.add(Cx.c(1), Cx.scale(s, R2 * C2)), y = Cx.add(Cx.c(1 / R1 + 1 / R2), Cx.scale(s, C1));
          const d = Cx.sub(Cx.sub(Cx.mul(u, y), Cx.mul(k, Cx.scale(s, C1))), Cx.c(1 / R2));
          return Cx.div(k, Cx.scale(d, R1)); } };
      }
      return err("filtreActif : " + FILTRES_ACTIFS.join(", "));
    }
    /* Bode: gain 20 log10 |H| (dB) and phase arg H (rad, in ]−π, π]) ; exact definitions. */
    function bodeH(H) { const m = Cx.abs(H); return { gainDb: 20 * Math.log10(m), phase: Cx.arg(H), module: m }; }
    /* The straight-line (asymptotic) gain in dB of a filtreActif at f: flat at 20 log|H0|, then ∓20 dB per decade
       (first order) or −40 dB per decade (second order) past f0. Gap to the true curve at f0: 3,01 dB (first order),
       |20 log Q| (second order). */
    function asymptote(F, f) {
      positif(f, "f"); const g0 = 20 * Math.log10(Math.abs(F.H0)), r = 20 * Math.log10(f / F.f0);
      if (F.type === "passeHaut1") return g0 + Math.min(0, r);
      return g0 - (F.ordre === 2 ? 2 : 1) * Math.max(0, r);
    }
    /* Two identical cells R, C (series R, C to ground) in cascade, x = RCω: without a buffer the second loads the
       first, H = 1/(1 + 3ix − x²) ; with a follower between them, H = 1/(1 + ix)², the product of the two. { libre, tampon } */
    function deuxCellules(x) {
      positif0(x, "x"); return { libre: Cx.div(Cx.c(1), Cx.c(1 - x * x, 3 * x)), tampon: Cx.div(Cx.c(1), Cx.mul(Cx.c(1, x), Cx.c(1, x))) };
    }

    /* ---------- comparators and oscillators ---------- */
    /* Open-loop comparator with hysteresis (Schmitt), ideal op amp saturated at ±Vsat:
       "inverseur"    ve on v−, R1 from v+ to ground, R2 from vs to v+: thresholds ±R1/(R1 + R2) Vsat, vs = −Vsat above ;
       "nonInverseur" ve through R1 to v+, R2 from vs to v+, v− grounded: thresholds ±(R1/R2) Vsat, vs = +Vsat above.
       R2 = Infinity (non-inverting) or R1 = 0 (inverting): the simple comparator, one threshold at 0.
       { haut, bas, largeur, sortie(ves, etat0) → { vs, basculements } } ; etat0 = +1 or −1, the starting state. */
    function schmitt(o) {
      if (!o || typeof o !== "object") err("schmitt : { R1, R2, Vsat, sens }");
      const sens = o.sens || "nonInverseur", Vsat = positif(o.Vsat, "Vsat");
      let s;
      if (sens === "inverseur") { const R1 = positif0(o.R1, "R1"), R2 = positif(o.R2, "R2"); s = R1 / (R1 + R2) * Vsat; }
      else if (sens === "nonInverseur") { const R1 = positif0(o.R1, "R1"), R2 = o.R2 === Infinity ? Infinity : positif(o.R2, "R2"); s = R1 / R2 * Vsat; }
      else err("sens : inverseur ou nonInverseur");
      const signe = sens === "inverseur" ? -1 : 1;
      function sortie(ves, etat0) {
        if (!Array.isArray(ves)) err("ves : un tableau de tensions");
        let e = etat0 === -1 ? -1 : 1, n = 0;                                    // the output is e Vsat
        const vs = ves.map((v, i) => {
          const x = signe * fini(v, "ve[" + i + "]");                           // non-inverting: v ; inverting: −v
          if (e > 0 && x < -s) { e = -1; n++; } else if (e < 0 && x > s) { e = 1; n++; }
          return e * Vsat;
        });
        return { vs, basculements: n };
      }
      return { haut: s, bas: -s, largeur: 2 * s, sortie };
    }
    /* A slow sine E sin 2πft plus an interference of amplitude b made of three fast sines (37,1 f, 53,7 f, 91,3 f) :
       a stand-in for noise that the page and the tests see alike. ve(t). */
    function entreeBruitee(E, f, b) {
      fini(E, "E"); positif(f, "f"); positif0(b, "b");
      return t => E * Math.sin(TAU * f * t) + b * (Math.sin(TAU * 37.1 * f * t) + Math.sin(TAU * 53.7 * f * t + 1) + Math.sin(TAU * 91.3 * f * t + 2)) / 3;
    }

    /* Astable multivibrator: inverting Schmitt (R1, R2, β = R1/(R1 + R2)) whose v− is a capacitor C charged through R
       from vs. Ideal switching: T = 2RC ln((1 + β)/(1 − β)). simuler(duree, n): vs moves to ±Vsat at the rate SR
       (Infinity: at once), vC by the exact exponential of each step ; { t, vs, vc, periode } with periode measured
       between the last upward zero crossings of vs (null if fewer than two). */
    function astable(o) {
      if (!o || typeof o !== "object") err("astable : { R, C, R1, R2, Vsat, SR }");
      const R = positif(o.R, "R"), C = positif(o.C, "C"), R1 = positif(o.R1, "R1"), R2 = positif(o.R2, "R2");
      const Vsat = positif(o.Vsat, "Vsat"), SR = o.SR == null || o.SR === Infinity ? Infinity : positif(o.SR, "SR");
      const beta = R1 / (R1 + R2), T = 2 * R * C * Math.log((1 + beta) / (1 - beta));
      function simuler(duree, n) {
        positif(duree, "duree"); entier(n, "n", 2);
        const h = duree / n, dec = Math.exp(-h / (R * C)), dmax = SR * h;
        let vs = Vsat, vc = 0;
        const Tt = [0], S = [vs], V = [vc], montees = [];
        for (let j = 1; j <= n; j++) {
          const cible = beta * vs > vc ? Vsat : -Vsat, avant = vs;
          vs = Math.abs(cible - vs) <= dmax ? cible : vs + Math.sign(cible - vs) * dmax;
          vc = vs + (vc - vs) * dec;
          if (avant < 0 && vs >= 0) montees.push((j - 1) * h + h * (-avant) / (vs - avant));
          Tt.push(j * h); S.push(vs); V.push(vc);
        }
        const k = montees.length;
        return { t: Tt, vs: S, vc: V, periode: k >= 2 ? (montees[k - 1] - montees[k - 2]) : null };
      }
      return { beta, T, f: 1 / T, commutation: SR === Infinity ? 0 : 2 * Vsat / SR, simuler };
    }

    /* Wien-bridge oscillator: non-inverting amplifier of gain K (= 1 + R2/R1) whose output feeds R in series with C,
       then R in parallel with C to ground, back to v+. Wien network: Hw = 1/(3 + i(x − 1/x)), x = RCω, maximum 1/3 at
       x = 1. Linear loop: (RCs)² + (3 − K) RCs + 1 = 0: f0 = 1/(2πRC), growth rate σ = (K − 3)/(2RC) for |K − 3| < 2.
       simuler(duree, n, v0): the two capacitor voltages by RK4 (h ≪ RC), vs = K v clipped at ±Vsat, from v = v0.
       { t, vs, v, amplitude, frequence, tdh } measured over the last whole periods of the run (null if too few):
       tdh = √(Σ_{n=2..9} An²)/A1, the total harmonic distortion. */
    function oscillateurWien(o) {
      if (!o || typeof o !== "object") err("oscillateurWien : { R, C, K, Vsat }");
      const R = positif(o.R, "R"), C = positif(o.C, "C"), K = positif(o.K, "K"), Vsat = positif(o.Vsat, "Vsat");
      const RC = R * C;
      const Hw = f => { positif(f, "f"); const x = TAU * f * RC; return Cx.div(Cx.c(1), Cx.c(3, x - 1 / x)); };
      function simuler(duree, n, v0) {
        positif(duree, "duree"); entier(n, "n", 2); v0 = fini(v0 == null ? 1e-3 : v0, "v0");
        const h = duree / n, sortie = v => borne(K * v, Vsat);
        const F = y => { const vs = sortie(y[1]), i = (vs - y[0] - y[1]) / R; return [i / C, (i - y[1] / R) / C]; };
        let y = [0, v0];
        const Tt = [0], S = [sortie(v0)], V = [v0];
        for (let j = 1; j <= n; j++) {
          const k1 = F(y), k2 = F([y[0] + h / 2 * k1[0], y[1] + h / 2 * k1[1]]), k3 = F([y[0] + h / 2 * k2[0], y[1] + h / 2 * k2[1]]);
          const k4 = F([y[0] + h * k3[0], y[1] + h * k3[1]]);
          y = [y[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), y[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
          Tt.push(j * h); S.push(sortie(y[1])); V.push(y[1]);
        }
        return Object.assign({ t: Tt, vs: S, v: V }, mesurerOscillation(Tt, S));
      }
      return { f0: 1 / (TAU * RC), sigma: (K - 3) / (2 * RC), Hw, simuler };
    }
    /* amplitude, frequency and distortion of a sampled oscillation over its last whole periods (up to 4), from its
       upward zero crossings ; harmonics by the trapezoid rule over exactly those periods. */
    function mesurerOscillation(t, y) {
      const up = [];
      for (let j = 1; j < y.length; j++) if (y[j - 1] < 0 && y[j] >= 0) up.push(j);
      if (up.length < 3) return { amplitude: null, frequence: null, tdh: null };
      const m = Math.min(4, up.length - 1), j0 = up[up.length - 1 - m], j1 = up[up.length - 1];
      const tz = j => t[j - 1] + (t[j] - t[j - 1]) * (-y[j - 1]) / (y[j] - y[j - 1]);
      const t0 = tz(j0), t1 = tz(j1), P = (t1 - t0) / m, w = TAU / P;
      let amp = 0; for (let j = j0; j <= j1; j++) amp = Math.max(amp, Math.abs(y[j]));
      const A = [];
      for (let k = 1; k <= 9; k++) {
        let a = 0, b = 0;
        for (let j = j0; j < j1; j++) { const dt = t[j + 1] - t[j];
          a += dt * (y[j] * Math.cos(k * w * t[j]) + y[j + 1] * Math.cos(k * w * t[j + 1])) / 2;
          b += dt * (y[j] * Math.sin(k * w * t[j]) + y[j + 1] * Math.sin(k * w * t[j + 1])) / 2; }
        const L = t[j1] - t[j0]; A.push(2 * Math.hypot(a, b) / L);
      }
      const tdh = Math.sqrt(A.slice(1).reduce((s, x) => s + x * x, 0)) / A[0];
      return { amplitude: amp, frequence: 1 / P, tdh };
    }

    Object.assign(api, { AO, aoModele, montage, boucle, simulerMontage, limites, sommateur, integrateur, FILTRES_ACTIFS,
      filtreActif, bodeH, asymptote, deuxCellules, schmitt, entreeBruitee, astable, oscillateurWien, mesurerOscillation });
  }

  /* ---------- Étape « Lignes de transmission et guide rectangulaire » (II.24.1 à 24.4) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, HBAR = Cst.hbar, NEPER_DB = 20 / Math.LN10;
    const option = (x, d, nom) => x === undefined ? d : positif(x, nom);

    /* Two coaxial cylinders of radii a < b, currents on their facing surfaces (perfect conductors, or skin depth ≪ a), a
       uniform insulator εr, μr between them. (24.10) times μr, C0 = 2π ε0 εr/ln(b/a), then (24.5), (24.7), (24.11) over √(εr/μr).
       μ0 is written 1/(ε0c²), as Feynman does, so that L0 C0 = εr μr/c² holds to the last digit. The line is TEM, and these
       values exact for lossless conductors, below the first higher mode TE11 of the coaxial guide: its cutoff is estimated by
       k_c ≈ 2/(a + b), the mean circumference equal to one wavelength (an estimate, not a solution of the Bessel equation). */
    function ligneCoaxiale(a, b, o) {
      positif(a, "a"); positif(b, "b");
      if (!(b > a)) err("le rayon extérieur b doit dépasser le rayon intérieur a");
      o = o || {};
      const er = option(o.epsr, 1, "εr"), mr = option(o.mur, 1, "μr"), ln = Math.log(b / a);
      const L0 = mr * ln / (2 * Math.PI * EPS0 * C * C), C0 = 2 * Math.PI * EPS0 * er / ln;
      const v = 1 / Math.sqrt(L0 * C0), z0 = Math.sqrt(L0 / C0);
      return { a, b, epsr: er, mur: mr, L0, C0, v, z0, facteurVitesse: v / C, fcTE11: v / (Math.PI * (a + b)) };
    }

    /* Conductor losses of ligneCoaxiale(…) at the frequency f, walls of conductivity σ, in the skin regime (δ ≪ a):
       R0 = Rs (1/a + 1/b)/(2π), Rs = 1/(σδ) = √(π f μ0/σ), and α = R0/(2 z0) in Np·m⁻¹, valid while R0 ≪ L0ω (rapport).
       The insulator's losses, a braided shield and the roughness of the walls are left out: the model underestimates α. */
    function pertesCoaxiale(ligne, f, sigma) {
      if (!ligne || !(ligne.L0 > 0) || !(ligne.z0 > 0)) err("la ligne doit venir de ligneCoaxiale");
      positif(f, "f"); positif(sigma, "σ");
      const w = 2 * Math.PI * f, delta = peau(sigma, w), Rs = 1 / (sigma * delta);
      const R0 = Rs * (1 / ligne.a + 1 / ligne.b) / (2 * Math.PI), alpha = R0 / (2 * ligne.z0);
      return { delta, peau: delta / ligne.a, Rs, R0, rapport: R0 / (ligne.L0 * w), alpha, dBparMetre: NEPER_DB * alpha,
        lambda: ligne.v / f };
    }

    /* Reflection coefficient V−/V+ at a resistive load RL closing a line of characteristic impedance z0: (RL − z0)/(RL + z0),
       from V = V+ + V−, I = (V+ − V−)/z0 (24.6) and V = RL I at the end. RL = Infinity: open line, 1. Exact for a resistance;
       a real load has a reactance that grows with f. */
    function reflexion(RL, z0) {
      positif(z0, "z0");
      if (RL === Infinity) return 1;
      fini(RL, "RL"); if (RL < 0) err("RL doit être positive ou nulle");
      return (RL - z0) / (RL + z0);
    }

    /* A line of length l cut into n cells L0Δx in series and C0Δx in parallel: the ladder whose limit Δx → 0 gives (24.1)
       and (24.2). At x = 0 a generator e(t) of internal resistance Rg (0: ideal source), at x = l a resistance RL
       (Infinity: open, 0: short). Leapfrog in time: V at the steps m Δt, I at (m + ½) Δt, Δt = q Δx/v with q ≤ 1 (stable);
       the end nodes carry C0Δx/2 and their resistances are taken at mid-step (trapezoid), so a short or Rg = 0 stays stable.
       A ladder is a line only for slow signals: a pulse must last τ ≫ Δx/v (ten cells or more), else it spreads and rings.
       o = { L0, C0, l, n, Rg, RL, e, duree, images, q } → { x, dx, dt, v, z0, gamma, images: [{ t, V, I }] }, I at the cells'
       midpoints and half a step later than V. */
    function ligneEchelle(o) {
      o = o || {};
      const L0 = positif(o.L0, "L0"), C0 = positif(o.C0, "C0"), l = positif(o.l, "l");
      const n = o.n === undefined ? 200 : o.n, q = o.q === undefined ? 0.5 : positif(o.q, "q");
      if (!Number.isInteger(n) || n < 2) err("n doit être un entier ≥ 2");
      if (q > 1) err("q > 1 : le schéma saute plus d'une cellule par pas et diverge");
      if (typeof o.e !== "function") err("e doit être une fonction du temps");
      const Rg = o.Rg === undefined ? 0 : o.Rg, RL = o.RL === undefined ? Infinity : o.RL;
      [[Rg, "Rg"], [RL, "RL"]].forEach(([r, nom]) => { if (!(r === Infinity || (typeof r === "number" && r >= 0))) err(nom + " doit être une résistance ≥ 0"); });
      if (Rg === Infinity) err("Rg infinie : le générateur ne débite rien");
      const v = 1 / Math.sqrt(L0 * C0), z0 = Math.sqrt(L0 / C0), dx = l / n, dt = q * dx / v;
      const duree = o.duree === undefined ? 2 * l / v : positif(o.duree, "durée");
      const pas = Math.ceil(duree / dt), nImages = Math.max(2, Math.min(pas + 1, o.images === undefined ? 100 : o.images));
      const Ln = L0 * dx, Cn = C0 * dx, Cb = Cn / 2, V = new Float64Array(n + 1), I = new Float64Array(n), images = [];
      const garder = (m) => images.push({ t: m * dt, V: Array.from(V), I: Array.from(I) });
      const quand = Array.from({ length: nImages }, (_, i) => Math.round(i * pas / (nImages - 1)));
      let suivante = 0;
      if (Rg === 0) V[0] = o.e(0);
      for (let m = 0; m <= pas; m++) {
        while (suivante < quand.length && quand[suivante] === m) { garder(m); suivante++; }
        if (m === pas) break;
        for (let k = 0; k < n; k++) I[k] += dt / Ln * (V[k] - V[k + 1]);
        for (let k = 1; k < n; k++) V[k] += dt / Cn * (I[k - 1] - I[k]);
        const th = (m + 0.5) * dt;
        if (Rg === 0) V[0] = o.e((m + 1) * dt);
        else { const g = 1 / (2 * Rg), s = Cb / dt; V[0] = ((s - g) * V[0] + o.e(th) / Rg - I[0]) / (s + g); }
        if (RL === 0) V[n] = 0;
        else if (RL === Infinity) V[n] += dt / Cb * I[n - 1];
        else { const g = 1 / (2 * RL), s = Cb / dt; V[n] = ((s - g) * V[n] + I[n - 1]) / (s + g); }
      }
      return { x: Array.from({ length: n + 1 }, (_, k) => k * dx), dx, dt, v, z0, gamma: reflexion(RL, z0), images };
    }

    /* Mode TE_n0 of a rectangular guide, inside a × b (a the wide side, along x; b along y), walls perfectly conducting,
       filled with a uniform insulator εr (vacuum: 1), c′ = c/√εr. E has only E_y = E0 sin(kx x) cos(ωt − kz z), (24.12) with
       kx = nπ/a (24.13), (24.14), and kz² = ω²/c′² − kx² (24.16), (24.17); B follows from Faraday's law. Below the cutoff
       ω_c = kx c′, kz = −i k′ (24.21), (24.22): E_y = E0 sin(kx x) e^(−k′z) cos ωt (24.24), source at z = 0, z ≥ 0.
       Exact for perfect walls; real walls absorb a little (skin effect), not modelled. */
    function guideRect(a, b, f, o) {
      positif(a, "a"); positif(b, "b"); positif(f, "f");
      o = o || {};
      const n = o.n === undefined ? 1 : o.n, er = option(o.epsr, 1, "εr");
      if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
      const cm = C / Math.sqrt(er), w = 2 * Math.PI * f, kx = n * Math.PI / a, k0 = w / cm, wc = kx * cm;
      const propage = w > wc, kz = propage ? Math.sqrt(k0 * k0 - kx * kx) : 0, kp = propage ? 0 : Math.sqrt(kx * kx - k0 * k0);
      const vPhase = propage ? w / kz : null, vGroupe = propage ? cm * cm * kz / w : 0;
      const energieLineique = E0 => EPS0 * er * fini(E0, "E0") ** 2 * a * b / 4;      // mean over time and cross-section, E + B
      function champ(x, z, t, E0) {
        E0 = E0 === undefined ? 1 : E0;
        const s = Math.sin(kx * x), co = Math.cos(kx * x);
        if (propage) {
          const ph = w * t - kz * z;
          return { Ey: E0 * s * Math.cos(ph), Bx: -(kz / w) * E0 * s * Math.cos(ph), Bz: -(kx / w) * E0 * co * Math.sin(ph) };
        }
        const d = Math.exp(-kp * z);
        return { Ey: E0 * s * d * Math.cos(w * t), Bx: -(kp / w) * E0 * s * d * Math.sin(w * t), Bz: -(kx / w) * E0 * co * d * Math.sin(w * t) };
      }
      return { a, b, f, n, epsr: er, c: cm, omega: w, kx, k0, kz, kPrime: kp, fc: wc / (2 * Math.PI), omegaC: wc, propage,
        lambda0: cm / f, lambdaC: 2 * a / n, lambdaG: propage ? 2 * Math.PI / kz : Infinity, vPhase, vGroupe,
        profondeur: propage ? Infinity : 1 / kp, dBparMetre: NEPER_DB * kp,
        masse: HBAR * wc / (cm * cm), champ, energieLineique,
        puissance: E0 => energieLineique(E0) * vGroupe };                               // (24.32p), E0 the crest of E_y; (24.32) takes E0 rms over time and section, crest 2E0
    }

    /* ω(kz) of the TE_n0 mode: √(ω_c² + c′² kz²), the inverse of (24.17); the same form as (24.30) with ħω_c = mc². */
    function pulsationGuide(kz, a, o) {
      fini(kz, "kz"); positif(a, "a"); o = o || {};
      const n = o.n === undefined ? 1 : o.n, cm = C / Math.sqrt(option(o.epsr, 1, "εr")), wc = n * Math.PI / a * cm;
      return Math.sqrt(wc * wc + cm * cm * kz * kz);
    }

    /* Cutoff frequencies of the modes of a rectangular guide a × b with perfect walls, below fmax, in increasing order:
       f_mn = (c′/2) √((m/a)² + (n/b)²); TE_mn for m, n ≥ 0 not both zero, TM_mn for m, n ≥ 1. The band where only TE10
       propagates runs from f_10 to the next one. */
    function modesRect(a, b, fmax, o) {
      positif(a, "a"); positif(b, "b"); positif(fmax, "fmax"); o = o || {};
      const cm = C / Math.sqrt(option(o.epsr, 1, "εr")), out = [];
      for (let m = 0; m * cm / (2 * a) <= fmax; m++) for (let n = 0; n * cm / (2 * b) <= fmax; n++) {
        if (!m && !n) continue;
        const fc = cm / 2 * Math.hypot(m / a, n / b);
        if (fc > fmax) continue;
        out.push({ type: "TE", m, n, fc });
        if (m && n) out.push({ type: "TM", m, n, fc });
      }
      return out.sort((p, q) => p.fc - q.fc || (p.type < q.type ? -1 : 1));
    }

    /* Two TE10 waves of equal amplitude at f1 and f2 (both above cutoff), E_y at x = a/2: their sum, the beat envelope
       2|cos((Δk z − Δω t)/2)|, which moves at Δω/Δk (exact for two waves), and the phase speed of the mean. The limit
       f2 → f1 of Δω/Δk is (24.27). */
    function paquetGuide(a, b, f1, f2, o) {
      const g1 = guideRect(a, b, f1, o), g2 = guideRect(a, b, f2, o);
      if (!g1.propage || !g2.propage) err("les deux fréquences doivent dépasser la coupure");
      if (f1 === f2) err("f1 = f2 : il n'y a pas de battement");
      const dw = g2.omega - g1.omega, dk = g2.kz - g1.kz, wm = (g1.omega + g2.omega) / 2, km = (g1.kz + g2.kz) / 2;
      return { g1, g2, vEnveloppe: dw / dk, vPhase: wm / km,
        E: (z, t) => Math.cos(g1.omega * t - g1.kz * z) + Math.cos(g2.omega * t - g2.kz * z),
        enveloppe: (z, t) => 2 * Math.abs(Math.cos((dk * z - dw * t) / 2)), porteuse: (z, t) => Math.cos(wm * t - km * z) };
    }

    Object.assign(api, { ligneCoaxiale, pertesCoaxiale, reflexion, ligneEchelle, guideRect, pulsationGuide, modesRect, paquetGuide });
  }

  /* ---------- Étape « Cavités résonantes » (II.23.1 à 23.5) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = Cst.mu0;
    const { c, add } = Cx, mod = Cx.abs;

    /* ---- Bessel functions of integer order ----
       besselJ: J_n(x) = (1/π) ∫₀^π cos(nτ − x sin τ) dτ. The integrand is smooth and periodic, so the trapezoid rule
       converges geometrically: with 40 + 2|x| + 2n points the error stays near 10⁻¹⁵ for |x| ≤ 100. */
    function besselJ(n, x) {
      entier(n, "n", 0); fini(x, "x"); if (Math.abs(x) > 100) err("|x| ≤ 100 pour besselJ");
      const N = 40 + 2 * Math.ceil(Math.abs(x)) + 2 * n, h = Math.PI / N;
      let s = 0.5 * (1 + Math.cos(n * Math.PI));                      // τ = 0 and τ = π, half weight each
      for (let k = 1; k < N; k++) { const t = k * h; s += Math.cos(n * t - x * Math.sin(t)); }
      return s / N;
    }
    const besselJp = (n, x) => n === 0 ? -besselJ(1, x) : 0.5 * (besselJ(n - 1, x) - besselJ(n + 1, x));
    /* the k-th positive zero of J_n (derivee: of J_n'), by a scan of step 0,05 then bisection. x = 0 is skipped:
       J_n'(0) = 0 for n ≥ 2 is not a mode of a cavity. */
    function zeroBessel(n, k, derivee) {
      entier(n, "n", 0); entier(k, "k", 1);
      const f = derivee ? x => besselJp(n, x) : x => besselJ(n, x);
      let a = Math.max(0.05, n), fa = f(a), trouve = 0;                  // j_n,1 and j'_n,1 both exceed n
      while (a < 95) {
        const b = a + 0.05, fb = f(b);
        if (fa === 0 || fa * fb < 0) {
          if (++trouve === k) { let lo = a, hi = b, flo = fa; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2, fm = f(m); if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; } } return (lo + hi) / 2; }
        }
        a = b; fa = fb;
      }
      return err("zéro hors de portée (x > 95)");
    }

    /* ---- II.23.2: the capacitor at high frequency ----
       (23.15) term by term: E_k = (−1)^k (x/2)^(2k)/(k!)² E0, x = ωr/c ; B_(k+1) is the field that the change of E_k
       makes by (23.10): i (E0/c) (−1)^k (x/2)^(2k+1)/(k!(k+1)!). ordre = number of E terms kept (1 = the uniform field).
       Exact series of J0 and J1 ; the model is the ideal plates of radius a without edge field or radiation. */
    function serieCondensateur(x, ordre) {
      fini(x, "x"); entier(ordre, "ordre", 1); if (ordre > 60) err("ordre ≤ 60");
      const E = [], B = []; let t = 1;
      for (let k = 0; k < ordre; k++) {
        if (k > 0) t *= -(x / 2) * (x / 2) / (k * k);
        E.push(t); B.push(t * (x / 2) / (k + 1));
      }
      const somme = a => a.reduce((s, v) => s + v, 0);
      return { E: somme(E), B: somme(B), termesE: E, termesB: B };
    }
    /* plates of radius a at the frequency f: x at the edge, E(a)/E0 = J0(x), mean field over the plate 2J1(x)/x
       (exact: ∫₀^a J0(kr) 2πr dr = 2πa J1(ka)/k), the gap from the uniform field at the edge, and the radius where E = 0
       if it falls on the plates. f1pc: the frequency where the edge field is 1 % below the centre field. */
    function condensateurHF(a, f) {
      positif(a, "a"); fini(f, "f"); if (f < 0) err("f doit être positive ou nulle");
      const k = 2 * Math.PI * f / C, x = k * a, J0 = besselJ(0, x);
      const z0 = zeroBessel(0, 1) / k;
      let lo = 0, hi = zeroBessel(0, 1); for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (besselJ(0, m) > 0.99) lo = m; else hi = m; }
      return { x, k, Ebord: J0, Emoyen: x === 0 ? 1 : 2 * besselJ(1, x) / x, ecartUniforme: 1 - J0, ecartParabole: x * x / 4,
        rZero: z0 <= a ? z0 : null, Bbord: besselJ(1, x), f1pc: lo * C / (2 * Math.PI * a) };
    }

    /* ---- II.23.1: a real coil ----
       Model of Fig. 23-3(b): the coil cut into N cells from the terminal 0 to the terminal N ; cell k is its share of the
       winding, r/N + iωL/N, shunted by the turn-to-turn capacitance N·Ct (so that the N cells in series show Ct) ; each
       inner node is joined to the terminal N by Cg/(N − 1), the capacitance of the winding to its own far end and to the
       surroundings. Z between the terminals by the ladder recurrence from the far end. N = 1: Fig. 23-3(c).
       Lumped at the scale of a cell: holds while a cell is ≪ λ ; mutual inductance between cells and the skin effect in
       the wire (r grows as √f) are left out. */
    const BOBINE = { L: 10e-6, r: 0.5, Ct: 0.2e-12, Cg: 5e-12, N: 20, taille: 0.03, fil: 2.5 };   // an example: 3 cm body, 2,5 m of wire
    function bobineEchelle(w, o) {
      positif(w, "ω");
      const p = Object.assign({}, BOBINE, o || {}); entier(p.N, "N", 1);
      ["L", "r", "Ct", "Cg"].forEach(k => { fini(p[k], k); if (p[k] < 0 || (k === "L" && p[k] === 0)) err(k + " doit être positif"); });
      const N = p.N, serie = c(p.r / N, w * p.L / N);
      const cellule = p.Ct > 0 ? par(serie, c(0, -1 / (w * N * p.Ct))) : serie;
      const yg = N > 1 && p.Cg > 0 ? c(0, w * p.Cg / (N - 1)) : null;
      let W = c(0);                                                          // node N is the far terminal
      for (let k = N - 1; k >= 1; k--) { const z = add(cellule, W); W = yg ? inv(add(yg, inv(z))) : z; }
      return add(cellule, W);
    }
    /* the network of bobineEchelle written as branches for resoudre/thevenin (the check by Kirchhoff) */
    function reseauBobine(w, o) {
      positif(w, "ω");
      const p = Object.assign({}, BOBINE, o || {}), N = entier(p.N, "N", 1), noeuds = Array.from({ length: N + 1 }, (_, i) => "n" + i), branches = [];
      for (let k = 1; k <= N; k++) {
        branches.push({ de: "n" + (k - 1), vers: "n" + k, z: c(p.r / N, w * p.L / N) });
        if (p.Ct > 0) branches.push({ de: "n" + (k - 1), vers: "n" + k, z: c(0, -1 / (w * N * p.Ct)) });
        if (k < N && p.Cg > 0) branches.push({ de: "n" + k, vers: "n" + N, z: c(0, -(N - 1) / (w * p.Cg)) });
      }
      return { noeuds, branches, masse: "n" + N };
    }
    /* the antiresonances (maxima of |Z|) of a function Z(ω) between w0 and w1: scan of 200 points per decade, then golden
       section in ln ω around each local maximum */
    function resonances(Zf, w0, w1) {
      positif(w0, "ω0"); positif(w1, "ω1"); if (!(w1 > w0)) err("ω1 > ω0");
      const n = Math.max(20, Math.ceil(200 * Math.log10(w1 / w0))), l0 = Math.log(w0), dl = (Math.log(w1) - l0) / n;
      const m = Array.from({ length: n + 1 }, (_, i) => mod(Zf(Math.exp(l0 + i * dl)))), out = [];
      for (let i = 1; i < n; i++) if (m[i] > m[i - 1] && m[i] >= m[i + 1]) {
        let a = l0 + (i - 1) * dl, b = l0 + (i + 1) * dl; const g = (Math.sqrt(5) - 1) / 2, F = l => -mod(Zf(Math.exp(l)));
        for (let j = 0; j < 80; j++) { const x1 = b - g * (b - a), x2 = a + g * (b - a); if (F(x1) < F(x2)) b = x2; else a = x1; }
        const w = Math.exp((a + b) / 2); out.push({ w, f: w / (2 * Math.PI), Z: mod(Zf(w)) });
      }
      return out;
    }
    /* the simple circuit of Fig. 23-3(c), (r + iωL) ∥ C, with C chosen so that its resonance falls on the first one
       of the ladder: what the simplest model gets right, and what it misses (all the others) */
    function bobineSimple(w, o, Cs) {
      positif(w, "ω"); const p = Object.assign({}, BOBINE, o || {});
      const s = c(p.r, w * p.L); return Cs > 0 ? par(s, c(0, -1 / (w * Cs))) : s;
    }
    function ajusterSimple(o) {
      const p = Object.assign({}, BOBINE, o || {}), r = resonances(w => bobineEchelle(w, p), 1e5, 1e11);
      if (!r.length) err("aucune résonance entre 10⁵ et 10¹¹ rad·s⁻¹");
      return { Cs: 1 / (p.L * r[0].w * r[0].w), premiere: r[0], toutes: r };
    }

    /* ---- II.23.3: the TM010 can ----
       (23.18) ω0 = j01 c/a, j01 = 2,405 ; E = E0 J0(j01 r/a), B = (E0/c) J1(j01 r/a), 90° out of phase, for perfect walls.
       Walls of conductivity σ: skin depth δ = √(2/(μ0σω)) and Q = ω W/P = a h/(δ(a + h)) (energy W from B in the volume,
       losses Rs|H|²/2 on side and end walls, Rs = 1/(σδ)). Holds while δ ≪ a and h (good conductor), holes and loops ignored. */
    const METAUX = { argent: 6.30e7, cuivre: 5.80e7 };                    // S·m⁻¹ at 293 K: 108,6 % and 100 % of the IACS
    function cavite(a, h, sigma) {
      positif(a, "a"); positif(h, "h");
      const j01 = zeroBessel(0, 1), w0 = j01 * C / a, f0 = w0 / (2 * Math.PI), out = { j01, w0, f0, lambda: C / f0, a, h };
      if (sigma != null) {
        positif(sigma, "σ");
        const delta = peau(sigma, w0), Q = a * h / (delta * (a + h));
        Object.assign(out, { delta, Q, Rs: 1 / (sigma * delta), largeur: f0 / Q, amortissement: Q / (Math.PI * f0) });
      }
      return out;
    }
    function champsCavite(r, a) {
      positif(a, "a"); fini(r, "r"); if (r < 0 || r > a * (1 + 1e-12)) err("0 ≤ r ≤ a");
      const x = zeroBessel(0, 1) * r / a; return { E: besselJ(0, x), B: besselJ(1, x) };
    }
    /* the response of a resonator of quality Q at f: power relative to the peak, 1/(1 + Q²(f/f0 − f0/f)²), exact for
       the RLC equivalent of one mode, the others far away */
    function reponse(f, f0, Q) { positif(f, "f"); positif(f0, "f0"); positif(Q, "Q"); const u = f / f0 - f0 / f; return 1 / (1 + Q * Q * u * u); }

    /* ---- II.23.4: modes ----
       Cylinder of radius a and height h, perfect walls: TM_mnp, k² = (j_mn/a)² + (pπ/h)², p ≥ 0 ; TE_mnp,
       k² = (j'_mn/a)² + (pπ/h)², p ≥ 1. m ≥ 1 counts twice (cos mφ and sin mφ). Sorted by f, those up to fmax. */
    function modesCylindre(a, h, fmax) {
      positif(a, "a"); positif(h, "h"); positif(fmax, "fmax");
      const kmax = 2 * Math.PI * fmax / C, out = [];
      for (const type of ["TM", "TE"]) for (let m = 0; m < kmax * a; m++) for (let n = 1; ; n++) {   // j_mn > m
        const j = zeroBessel(m, n, type === "TE"), kr = j / a; if (kr > kmax) break;
        for (let p = type === "TM" ? 0 : 1; ; p++) {
          const k = Math.hypot(kr, p * Math.PI / h); if (k > kmax) break;
          out.push({ type, m, n, p, j, f: k * C / (2 * Math.PI), polarisations: m === 0 ? 1 : 2 });
        }
      }
      return out.sort((x, y) => x.f - y.f);
    }
    /* Rectangular box a × b × d: k² = (mπ/a)² + (nπ/b)² + (pπ/d)². TE (to z): (m, n) ≠ (0, 0), p ≥ 1 ;
       TM: m, n ≥ 1, p ≥ 0. */
    function modesBoite(a, b, d, fmax) {
      [a, b, d, fmax].forEach((x, i) => positif(x, ["a", "b", "d", "fmax"][i]));
      const kmax = 2 * Math.PI * fmax / C, out = [], M = Math.floor(kmax * a / Math.PI), N = Math.floor(kmax * b / Math.PI), P = Math.floor(kmax * d / Math.PI);
      for (let m = 0; m <= M; m++) for (let n = 0; n <= N; n++) for (let p = 0; p <= P; p++) {
        const k = Math.PI * Math.hypot(m / a, n / b, p / d); if (k === 0 || k > kmax) continue;
        if ((m || n) && p >= 1) out.push({ type: "TE", m, n, p, f: k * C / (2 * Math.PI) });
        if (m >= 1 && n >= 1) out.push({ type: "TM", m, n, p, f: k * C / (2 * Math.PI) });
      }
      return out.sort((x, y) => x.f - y.f);
    }
    /* Weyl's law for the electromagnetic field: N(f) ≈ 8πVf³/(3c³), both polarisations, the leading term only
       (good when the cavity is many wavelengths across) */
    const weyl = (V, f) => 8 * Math.PI * positif(V, "V") * positif(f, "f") ** 3 / (3 * C ** 3);

    /* ---- II.23.5: the loaded (re-entrant) cavity ----
       Can of radius a and height h, two posts of radius b on the axis that leave a gap g in the middle.
       Lumped: C = ε0πb²/g (gap field uniform, no fringe), L = μ0 h ln(a/b)/(2π) (field I/(2πr) between b and a over the
       height h), ω0 = 1/√(LC). Line: each half of the torus is a coaxial line of length h/2 shorted at the end wall,
       Zc = (μ0 c/2π) ln(a/b) ; resonance when 2 Zc tan(ωh/2c) = 1/(ωC) ; it reduces to the lumped one for ωh/c ≪ 1.
       Holds for g ≪ b < a and g ≪ h ; kb measures the non-uniform gap field ((23.8): edge field 1 − (kb)²/4). */
    function caviteChargee(o) {
      const { a, b, h, g } = o || {};
      [a, b, h, g].forEach((x, i) => positif(x, ["a", "b", "h", "g"][i]));
      if (!(b < a)) err("b < a : le noyau doit être plus étroit que la boîte");
      if (!(g < h)) err("g < h : l'intervalle est dans la boîte");
      const Cg = EPS0 * Math.PI * b * b / g, L = MU0 * h * Math.log(a / b) / (2 * Math.PI), wL = 1 / Math.sqrt(L * Cg);
      const Zc = MU0 * C * Math.log(a / b) / (2 * Math.PI), F = w => 2 * Zc * Math.tan(w * h / (2 * C)) - 1 / (w * Cg);
      let lo = 1e-6 * wL, hi = Math.PI * C / h * (1 - 1e-12);
      for (let i = 0; i < 200; i++) { const m = Math.sqrt(lo * hi); if (F(m) < 0) lo = m; else hi = m; }
      const wl = Math.sqrt(lo * hi), boite = cavite(a, h);
      return { C: Cg, L, w0Localise: wL, f0Localise: wL / (2 * Math.PI), w0Ligne: wl, f0Ligne: wl / (2 * Math.PI), Zc,
        kb: wl * b / C, kh: wl * h / C, ecartCapacite: (wl * b / C) ** 2 / 4, f0Boite: boite.f0 };
    }

    Object.assign(api, { besselJ, besselJp, zeroBessel, serieCondensateur, condensateurHF, BOBINE, bobineEchelle, reseauBobine,
      resonances, bobineSimple, ajusterSimple, METAUX, cavite, champsCavite, reponse, modesCylindre, modesBoite, weyl, caviteChargee });
  }

  /* ---------- Étape « Conversion électromécanique » (programme de PSI, conversion de puissance) ---------- */
  {
    /* Monophasé, modèles linéaires, valeurs efficaces pour les grandeurs sinusoïdales. */
    const MU0 = 1 / (Cst.eps0 * Cst.c * Cst.c);
    const entre = (x, a, b, nom) => { fini(x, nom); if (x < a || x > b) err(nom + " doit être entre " + a + " et " + b); return x; };
    const { c, sub, mul, conj, div } = Cx, mod = Cx.abs, sc = Cx.scale;

    /* Ideal transformer, homologous terminals, primary in receptor convention, secondary in generator convention:
       u2 = m u1, i1 = m i2, m = N2/N1. Phasors (rms) U1 and load Z on the secondary.
       Holds for no losses (copper, iron), no leakage flux and an infinitely permeable core (no magnetising current). */
    function transfoIdeal(o) {
      const m = positif(o.m, "m"), U1 = cplx(o.U1, "U1"), Z = cplx(o.Z, "Z");
      const U2 = sc(U1, m), I2 = div(U2, Z), I1 = sc(I2, m);
      return { U2, I2, I1, Zvue: sc(Z, 1 / (m * m)), S1: mul(U1, conj(I1)), S2: mul(U2, conj(I2)) };
    }

    /* Closed core of section S, mean path l, relative permeability mur, primary of N1 turns under U1 (rms) at f.
       Faraday: Φmax = √2 U1/(N1 ω) ; Ampère with the core reluctance ℛ = l/(μ0 μr S): N1 i1 − N2 i2 = ℛ φ.
       The magnetising current ℛ φ/N1 is set by U1, whatever the load. Linear iron (no saturation), no leakage,
       winding resistance neglected in front of N1 ω Φ. */
    function noyau(o) {
      const N1 = positif(o.N1, "N1"), U1 = positif(o.U1, "U1"), f = positif(o.f, "f"), S = positif(o.S, "S");
      const l = positif(o.l, "l"), mur = positif(o.mur, "μr"), w = 2 * Math.PI * f;
      const phiMax = Math.SQRT2 * U1 / (N1 * w), reluctance = l / (MU0 * mur * S), Lm = N1 * N1 / reluctance;
      return { phiMax, Bmax: phiMax / S, reluctance, Lm, Imu: U1 / (Lm * w) };
    }

    /* Two-wire line of loop resistance R carrying the active power P under U (rms) with power factor cos φ:
       I = P/(U cos φ), losses R I². Holds while the drop R I ≪ U (chute = R I/U), line reactance and
       capacitance neglected (lines of a few tens of km at 50 Hz). */
    function ligne(o) {
      const P = positif(o.P, "P"), U = positif(o.U, "U"), R = positif0(o.R, "R"), k = o.cosphi == null ? 1 : o.cosphi;
      entre(k, 1e-6, 1, "cos φ");
      const I = P / (U * k), pertes = R * I * I;
      return { I, pertes, part: pertes / P, chute: R * I / U };
    }

    /* Efficiency of a transformer of rated apparent power Sn, iron losses P0 (no-load, constant at constant
       voltage) and copper losses Pk at rated current, loaded at x = I/In with power factor cos φ:
       η = x Sn cos φ/(x Sn cos φ + P0 + x² Pk). Maximum at x = √(P0/Pk). Secondary voltage taken constant. */
    function rendementTransfo(o) {
      const Sn = positif(o.Sn, "Sn"), P0 = positif0(o.P0, "P0"), Pk = positif(o.Pk, "Pk");
      const x = positif0(o.x, "x"), k = o.cosphi == null ? 1 : entre(o.cosphi, 0, 1, "cos φ");
      const P2 = x * Sn * k, Pcu = x * x * Pk, eta = P2 > 0 ? P2 / (P2 + P0 + Pcu) : 0;
      const xOpt = Math.sqrt(P0 / Pk), P2o = xOpt * Sn * k;
      return { P2, Pcu, Pfer: P0, eta, xOpt, etaMax: P2o > 0 ? P2o / (P2o + 2 * P0) : 0 };
    }

    /* Radial field in the air gap (thickness e, infinitely permeable iron) of one phase: N turns of current i,
       spread over 2n slots at θk = (k + ½)π/n with −sin θk conductors (normalised to N turns). Ampère across the gap
       gives jumps μ0 zk i/e ; ∮ B dθ = 0 (flux conservation) fixes the constant. n = 1: one turn in two opposite slots,
       B = ±μ0 N i/(2e). n → ∞: B → μ0 N i cos θ/(2e). Slot opening and fringing at the slot edges neglected (e ≪ R). */
    function entreferPhase(theta, i, o) {
      fini(theta, "θ"); fini(i, "i");
      const N = positif(o.N, "N"), n = o.n == null ? 1 : o.n, e = positif(o.e, "e");
      if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
      let tot = 0; for (let k = 0; k < n; k++) tot += Math.sin((k + 0.5) * Math.PI / n);
      const th = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      /* S(θ) = Σ_{θk < θ} zk, and its mean over the circle: each jump zk at θk contributes zk (2π − θk)/(2π) */
      let S = 0, moy = 0;
      for (let k = 0; k < 2 * n; k++) {
        const tk = (k + 0.5) * Math.PI / n, zk = -N * Math.sin(tk) / tot;
        if (tk < th) S += zk;
        moy += zk * (2 * Math.PI - tk) / (2 * Math.PI);
      }
      return MU0 * i * (S - moy) / e;
    }

    /* Two-phase stator, phases in space quadrature, fed in time quadrature: ia = I√2 cos ωt, ib = I√2 sin ωt.
       B(θ, t) = Ba(θ) ia + Ba(θ − π/2) ib → μ0 N I√2 cos(θ − ωt)/(2e) for a sinusoidal winding: a field that turns at ω. */
    function champStator(theta, t, o) {
      const I = positif0(o.I, "I"), w = fini(o.w, "ω"); fini(t, "t");
      const a = I * Math.SQRT2 * Math.cos(w * t), b = I * Math.SQRT2 * Math.sin(w * t);
      return entreferPhase(theta, a, o) + entreferPhase(theta - Math.PI / 2, b, o);
    }

    /* Magnetic energy of the gap, radius R, axial length L, thickness e ≪ R : E = R L e/(2μ0) ∫ B(θ)² dθ,
       by the midpoint rule on m points. B a function of θ. */
    function energieEntrefer(B, o, m) {
      const R = positif(o.R, "R"), L = positif(o.L, "L"), e = positif(o.e, "e"); m = m || 3600;
      let s = 0; for (let k = 0; k < m; k++) { const b = B((k + 0.5) * 2 * Math.PI / m); s += b * b; }
      return R * L * e / (2 * MU0) * s * 2 * Math.PI / m;
    }

    /* Smooth-pole synchronous machine, two poles, sinusoidal radial fields Bs cos(θ − ωt) (stator) and
       Br cos(θ − θr) (rotor), α = ωt − θr the lead of the stator field. Gap energy
       E = π R L e (Bs² + Br² + 2 Bs Br cos α)/(2μ0) ; torque on the rotor Γ = ∂E/∂θr = Γmax sin α at constant currents,
       Γmax = π R L e Bs Br/μ0. Linear iron, no saturation, e ≪ R. */
    function machineSynchrone(o) {
      const R = positif(o.R, "R"), L = positif(o.L, "L"), e = positif(o.e, "e"), Bs = positif0(o.Bs, "Bs"), Br = positif0(o.Br, "Br");
      const k = Math.PI * R * L * e / (2 * MU0), Gmax = 2 * k * Bs * Br;
      const energie = alpha => k * (Bs * Bs + Br * Br + 2 * Bs * Br * Math.cos(fini(alpha, "α")));
      const couple = alpha => Gmax * Math.sin(fini(alpha, "α"));
      /* stable when a small extra lag raises the torque: dΓ/dα = Γmax cos α > 0 */
      const stable = alpha => Math.cos(fini(alpha, "α")) > 0;
      function equilibre(Cr) {
        fini(Cr, "Γr"); if (Math.abs(Cr) > Gmax) return null;
        const a = Math.asin(Cr / Gmax); return { stable: a, instable: (Cr >= 0 ? Math.PI : -Math.PI) - a };
      }
      /* mean torque over a duration D when the rotor turns at Ω = r ω (r = 1: synchronism), α(0) = a0 */
      function coupleMoyen(r, w, D, a0) {
        fini(r, "r"); positif(w, "ω"); positif(D, "durée"); a0 = a0 || 0;
        const dw = w * (1 - r);
        if (Math.abs(dw * D) < 1e-9) return couple(a0);
        return Gmax * (Math.cos(a0) - Math.cos(a0 + dw * D)) / (dw * D);
      }
      return { energie, couple, coupleMax: Gmax, stable, equilibre, coupleMoyen };
    }

    /* One phase of the armature: V = Rs I + j Ls ω I + E, E the back-EMF of the rotor field, leading V by −δ
       (E = E e^{−jδ}, V real). Pabs = Re(V I*), Pcu = Rs |I|², Pem = Re(E I*) = Pabs − Pcu : the power taken by the
       back-EMF, equal to the mechanical power Γ Ω per phase. Linear model, iron losses neglected. */
    function phaseSynchrone(o) {
      const V = positif(o.V, "V"), E = positif0(o.E, "E"), delta = fini(o.delta, "δ");
      const Rs = positif0(o.Rs, "Rs"), X = positif0(o.Ls, "Ls") * positif(o.w, "ω");
      const Ec = c(E * Math.cos(delta), -E * Math.sin(delta)), I = div(sub(c(V), Ec), c(Rs, X));
      const Pabs = V * I.re, Pcu = Rs * (I.re * I.re + I.im * I.im), Pem = mul(Ec, conj(I)).re;
      return { I, E: Ec, Pabs, Pcu, Pem, cosphi: Pabs / (V * mod(I)) };
    }

    /* Separately excited DC motor: Γ = Φ i, e = Φ Ω, U = R i + L di/dt + Φ Ω, J dΩ/dt = Φ i − f Ω − Cr.
       Steady state Ω∞ = (Φ U − R Cr)/(Φ² + R f) ; with L → 0, first order of time constant τ = J R/(Φ² + R f).
       Linear model: constant flux (no armature reaction, no saturation), brush drop and iron losses neglected. */
    function mcc(o) {
      const Phi = positif(o.Phi, "Φ"), R = positif(o.R, "R"), L = positif0(o.L, "L"), J = positif(o.J, "J");
      const f = positif0(o.f, "f"), Cr = o.Cr == null ? 0 : fini(o.Cr, "Γr"), U = fini(o.U, "U");
      const den = Phi * Phi + R * f, Oinf = (Phi * U - R * Cr) / den, iinf = (U - Phi * Oinf) / R;
      const caracteristique = Om => Phi * (U - Phi * fini(Om, "Ω")) / R;
      /* RK4 from rest, i(0) = 0 (L > 0) or i(0) = U/R (L = 0) ; n steps over T */
      function demarrage(T, n) {
        positif(T, "T"); n = n || 2000; const h = T / n;
        const d = (i, Om) => [L > 0 ? (U - R * i - Phi * Om) / L : 0, (Phi * i - f * Om - Cr) / J];
        let i = L > 0 ? 0 : U / R, Om = 0; const ts = [0], is = [i], Os = [0];
        for (let k = 0; k < n; k++) {
          if (L > 0) {
            const k1 = d(i, Om), k2 = d(i + h / 2 * k1[0], Om + h / 2 * k1[1]), k3 = d(i + h / 2 * k2[0], Om + h / 2 * k2[1]), k4 = d(i + h * k3[0], Om + h * k3[1]);
            i += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); Om += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
          } else {
            const g = O => (Phi * (U - Phi * O) / R - f * O - Cr) / J;
            const k1 = g(Om), k2 = g(Om + h / 2 * k1), k3 = g(Om + h / 2 * k2), k4 = g(Om + h * k3);
            Om += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); i = (U - Phi * Om) / R;
          }
          ts.push((k + 1) * h); is.push(i); Os.push(Om);
        }
        return { t: ts, i: is, Omega: Os };
      }
      return { OmegaInf: Oinf, iInf: iinf, tau: J * R / den, tauE: L / R, iDemarrage: U / R, Omega0: U / Phi,
        coupleDemarrage: Phi * U / R, caracteristique, demarrage };
    }

    /* Buck chopper E → (R, L, Ec), period T = 1/f, duty ratio α, ideal switches, continuous conduction.
       On (0 < t < αT): L di/dt = E − Ec − R i ; off: L di/dt = −Ec − R i (free-wheeling diode, u = 0).
       Exact periodic steady state with τ = L/R ; ⟨u⟩ = α E and ⟨i⟩ = (α E − Ec)/R exactly ; ripple → α(1 − α)E/(L f)
       when T ≪ τ. discontinu: true when the computed i_min < 0 (the diode would block: this model no longer holds). */
    function hacheur(o) {
      const E = positif(o.E, "E"), a = entre(o.alpha, 0, 1, "α"), f = positif(o.f, "f");
      const R = positif(o.R, "R"), L = positif(o.L, "L"), Ec = o.Ec == null ? 0 : fini(o.Ec, "Ec");
      const T = 1 / f, tau = L / R, A = Math.exp(-a * T / tau), B = Math.exp(-(1 - a) * T / tau);
      const ion = (E - Ec) / R, ioff = -Ec / R;
      /* imax = ion + (imin − ion) A ; imin = ioff + (imax − ioff) B */
      const imin = (ioff * (1 - B) + ion * (1 - A) * B) / (1 - A * B), imax = ion + (imin - ion) * A;
      function i(t) {
        const s = ((fini(t, "t") % T) + T) % T;
        return s < a * T ? ion + (imin - ion) * Math.exp(-s / tau) : ioff + (imax - ioff) * Math.exp(-(s - a * T) / tau);
      }
      const u = t => ((((fini(t, "t") % T) + T) % T) < a * T ? E : 0);
      /* exact means over one period: ∫ (i∞ + (i0 − i∞) e^{−s/τ}) ds = i∞ d + (i0 − i∞) τ (1 − e^{−d/τ}) */
      const integ = (iinf, i0, d) => iinf * d + (i0 - iinf) * tau * (1 - Math.exp(-d / tau));
      const qOn = integ(ion, imin, a * T), qOff = integ(ioff, imax, (1 - a) * T);
      const iE = qOn / T, iMoy = (qOn + qOff) / T;
      /* ⟨i²⟩ exactly: ∫ (i∞ + D e^{−s/τ})² ds */
      const integ2 = (iinf, i0, d) => { const D = i0 - iinf, x = Math.exp(-d / tau); return iinf * iinf * d + 2 * iinf * D * tau * (1 - x) + D * D * tau / 2 * (1 - x * x); };
      const i2 = (integ2(ion, imin, a * T) + integ2(ioff, imax, (1 - a) * T)) / T;
      return { T, tau, imin, imax, ondulation: imax - imin, approx: a * (1 - a) * E / (L * f), uMoy: a * E, iMoy, iE, i2,
        Pfournie: E * iE, Pjoule: R * i2, Pfcem: Ec * iMoy, discontinu: imin < 0, i, u };
    }

    /* Losses of a buck chopper carrying I with little ripple: the transistor (on-resistance Ron) conducts α T,
       the diode (threshold VD) (1 − α) T. η = 1 − (α Ron I² + (1 − α) VD I)/(α E I). Switching losses neglected. */
    function rendementHacheur(o) {
      const E = positif(o.E, "E"), a = entre(o.alpha, 1e-9, 1, "α"), I = positif(o.I, "I");
      const Ron = positif0(o.Ron, "Ron"), VD = positif0(o.VD, "VD");
      const Pt = a * Ron * I * I, Pd = (1 - a) * VD * I, Pin = a * E * I;
      return { Pin, Pt, Pd, Pout: Pin - Pt - Pd, eta: 1 - (Pt + Pd) / Pin };
    }

    /* Exact step of L di/dt = u − R i over h with u constant */
    const pasRL = (i, u, R, L, h) => u / R + (i - u / R) * Math.exp(-R * h / L);
    /* Fourier coefficient of order k of samples x over one period of n points (rectangle rule) */
    function harmonique(x, k) {
      const n = x.length; let a = 0, b = 0;
      for (let j = 0; j < n; j++) { const p = 2 * Math.PI * k * j / n; a += x[j] * Math.cos(p); b += x[j] * Math.sin(p); }
      return { a: 2 * a / n, b: 2 * b / n, amp: 2 * Math.hypot(a, b) / n };
    }
    const tri = s => { const x = s - Math.floor(s); return x < 0.5 ? 4 * x - 1 : 3 - 4 * x; };

    /* Single-phase H-bridge on (R, L) from E. mode "pleine": u = E sign(sin ω0 t) ; mode "mli": bipolar sine–triangle
       PWM, u = +E when m sin ω0 t > carrier (triangle of frequency fp), −E otherwise. Ideal switches, dead times
       neglected. Steady state after 'periodes' periods ; the last period is returned, sampled on n points.
       Fundamental of u: 4E/π (pleine) or m E (mli, m ≤ 1, fp ≫ f0). */
    function onduleur(o) {
      const E = positif(o.E, "E"), R = positif(o.R, "R"), L = positif(o.L, "L"), f0 = positif(o.f0, "f0");
      const mode = o.mode || "mli"; if (mode !== "mli" && mode !== "pleine") err("mode doit être « mli » ou « pleine »");
      const m = mode === "mli" ? entre(o.m == null ? 0.8 : o.m, 0, 1, "m") : 1, fp = mode === "mli" ? positif(o.fp, "fp") : 0;
      const n = o.n || 4000, per = o.periodes || Math.max(6, Math.ceil(8 * L / R * f0)), sub = 8, T0 = 1 / f0, h = T0 / (n * sub), w0 = 2 * Math.PI * f0;
      const uAt = t => { const s = Math.sin(w0 * t); return mode === "pleine" ? (s >= 0 ? E : -E) : (m * s > tri(fp * t) ? E : -E); };
      let i = 0, ua = 0, ub = 0; const t = [], u = [], iv = [];
      for (let p = 0; p < per; p++) for (let j = 0; j < n; j++) {
        const t0 = (p * n + j) * T0 / n;
        if (p === per - 1) { t.push(t0 - p * T0); u.push(uAt(t0)); iv.push(i); }
        for (let s = 0; s < sub; s++) {
          const ts = t0 + (s + 0.5) * h, us = uAt(ts); i = pasRL(i, us, R, L, h);
          if (p === per - 1) { ua += us * Math.cos(w0 * ts); ub += us * Math.sin(w0 * ts); }   // fundamental of u on the fine grid
        }
      }
      const Z = Math.hypot(R, L * w0), I1 = harmonique(iv, 1).amp, U1 = 2 * Math.hypot(ua, ub) / (n * sub);
      /* every harmonic but the first: the rms of i minus that of its fundamental (the mean is zero) */
      const rms2 = iv.reduce((s, x) => s + x * x, 0) / iv.length, h2 = Math.max(0, rms2 - I1 * I1 / 2);
      return { t, u, i: iv, U1, U1th: mode === "pleine" ? 4 * E / Math.PI : m * E, I1, I1th: (mode === "pleine" ? 4 * E / Math.PI : m * E) / Z,
        dephasage: Math.atan2(L * w0, R), thd: Math.sqrt(h2) / (I1 / Math.SQRT2) };
    }

    /* Single-phase diode bridge on (R, L): u = |Um sin ωt| as long as i > 0, which always holds here (i = 0 gives
       di/dt = u/L ≥ 0). ⟨u⟩ = 2Um/π, ⟨i⟩ = 2Um/(πR) ; first harmonic of u at 2ω, of amplitude 4Um/(3π), so the
       peak-to-peak ripple ≈ 8Um/(3π |R + 2jωL|) when the higher harmonics are negligible. Ideal diodes. */
    function redresseur(o) {
      const Um = positif(o.Um, "Um"), f = positif(o.f, "f"), R = positif(o.R, "R"), L = positif0(o.L, "L");
      const n = o.n || 2000, per = o.periodes || Math.max(4, Math.ceil(8 * L / R * f)), sub = 8, T = 1 / f, h = T / (n * sub), w = 2 * Math.PI * f;
      const v = t => Um * Math.sin(w * t);
      let i = 2 * Um / (Math.PI * R); const t = [], u = [], iv = [];
      for (let p = 0; p < per; p++) for (let j = 0; j < n; j++) {
        const t0 = (p * n + j) * T / n;
        if (p === per - 1) { t.push(t0 - p * T); u.push(Math.abs(v(t0))); iv.push(i); }
        for (let s = 0; s < sub; s++) { const ts = t0 + (s + 0.5) * h; i = L > 0 ? pasRL(i, Math.abs(v(ts)), R, L, h) : Math.abs(v(ts + h / 2)) / R; }
      }
      const moy = a => a.reduce((s, x) => s + x, 0) / a.length;
      return { t, u, i: iv, uMoy: moy(u), uMoyTh: 2 * Um / Math.PI, iMoy: moy(iv), iMoyTh: 2 * Um / (Math.PI * R),
        ondulation: Math.max(...iv) - Math.min(...iv), approx: 8 * Um / (3 * Math.PI * Math.hypot(R, 2 * w * L)) };
    }

    Object.assign(api, { transfoIdeal, noyau, ligne, rendementTransfo, entreferPhase, champStator, energieEntrefer,
      machineSynchrone, phaseSynchrone, mcc, hacheur, rendementHacheur, onduleur, redresseur, harmonique });
  }

  /* ---------- Étape « Ondes dans un diélectrique » (II.32.1 à 32.4) ---------- */
  {
    const EPS0 = Cst.eps0, C = Cst.c, QE = Cst.e, ME = Cst.m_e, KB = Cst.k_B, NA = Cst.N_A;
    const { c, add, sub, mul, div } = Cx, sc = Cx.scale;

    /* a list of modes [{ w0, gamma, f }]: resonance (rad·s⁻¹), damping (s⁻¹), strength (1 by default) */
    const lesModes = liste => {
      if (!Array.isArray(liste) || !liste.length) err("modes : une liste non vide { w0, gamma, f } attendue");
      return liste.map((m, k) => ({ w0: positif(m.w0, "w0[" + k + "]"), gamma: positif0(m.gamma == null ? 0 : m.gamma, "gamma[" + k + "]"), f: positif0(m.f == null ? 1 : m.f, "f[" + k + "]") }));
    };
    const charge = o => ({ q: o && o.q != null ? positif(o.q, "q") : QE, m: o && o.m != null ? positif(o.m, "m") : ME });

    /* §32-1. (32.6) and (32.7): the polarizability α(ω) of one atom, in m³, p = ε0 α E (32.5), for fields as e^(iωt).
       α = (q²/(ε0 m)) Σ f_k/(ω0k² − ω² + iγk ω). Im α ≤ 0 for γ ≥ 0: p lags E. Model: each charge q of mass m bound by a
       spring (32.1), the field uniform over the atom (size ≪ λ) and weak beside the binding field (linear response).
       o = { q, m } (an electron by default). Diverges at ω = ω0k for γk = 0. */
    function polarisabiliteAtome(w, liste, o) {
      positif0(w, "ω"); const { q, m } = charge(o), M = lesModes(liste);
      let s = c(0);
      for (const k of M) {
        const d = c(k.w0 * k.w0 - w * w, k.gamma * w);
        if (d.re === 0 && d.im === 0) err("ω = ω0 sans amortissement : polarisabilité infinie");
        s = add(s, div(c(k.f), d));
      }
      return sc(s, q * q / (EPS0 * m));
    }

    /* §32-1. (32.3): the complex amplitude x of the displacement of the bound charge under E = E0 e^(iωt), one mode.
       { x, module = |x| (m), retard = phase lag of x (and of p) behind E, in [0, π] (π/2 at resonance), p = q x (C·m) }. */
    function deplacement(E0, w, mode, o) {
      fini(E0, "E0"); positif0(w, "ω"); const { q, m } = charge(o), k = lesModes([mode])[0];
      const d = c(k.w0 * k.w0 - w * w, k.gamma * w);
      if (d.re === 0 && d.im === 0) err("ω = ω0 sans amortissement : amplitude infinie");
      const x = sc(div(c(1), d), k.f * q * E0 / m);
      return { x, module: Math.hypot(x.re, x.im), retard: Math.atan2(d.im, d.re), p: sc(x, q) };
    }

    /* §32-3. The index of N atoms per m³, at ω, three ways, from the same α (32.6)/(32.7):
       gaz   (32.26) extended with γ: n = 1 + Nα/2, the first order in Nα (Chapter 31 of volume I);
       libre (32.25): n² = 1 + Nα, every atom polarized by the mean field E;
       local (32.31): n² = 1 + Nα/(1 − Nα/3), every atom polarized by E + P/(3ε0) (32.28): the Clausius–Mossotti form.
       All three need λ ≫ the spacing of the atoms (a continuous P); « local » needs in addition an isotropic or cubic
       arrangement, and the free-atom modes. { Na (complex), n2: { libre, local }, n: { gaz, libre, local } } */
    function indices(w, N, liste, o) {
      positif0(N, "N"); const a = polarisabiliteAtome(w, liste, o), Na = sc(a, N);
      const libre = add(c(1), Na), den = sub(c(1), sc(Na, 1 / 3));
      if (den.re === 0 && den.im === 0) err("Nα = 3 : le modèle du champ local n'a plus de réponse finie");
      const local = add(c(1), div(Na, den)), g = add(c(1), sc(Na, 1 / 2));
      return { alpha: a, Na, n2: { libre, local }, n: { gaz: { re: g.re, im: g.im, nR: g.re, nI: -g.im }, libre: nDepuisN2(libre), local: nDepuisN2(local) } };
    }

    /* (32.32) solved for Nα: 3 (n² − 1)/(n² + 2), n real or complex. Exact algebra of (32.31). */
    function nAlpha(n) {
      const z = cplx(n, "n"), n2 = mul(z, z);
      return div(sc(sub(n2, c(1)), 3), add(n2, c(2)));
    }

    /* §32-3. With the local field, a single mode resonates at ω0'² = ω0² − f N q²/(3 ε0 m) (32.31a), below ω0: the
       denominator 1 − Nα/3 of (32.31) vanishes there for γ = 0. { w0, w0Local, rapport = ω0'/ω0 }; no real ω0' when
       f N q²/(3 ε0 m) ≥ ω0² (the « catastrophe » of the static case). */
    function resonanceLocale(N, mode, o) {
      positif0(N, "N"); const { q, m } = charge(o), k = lesModes([mode])[0];
      const s = k.w0 * k.w0 - k.f * N * q * q / (3 * EPS0 * m);
      if (!(s > 0)) err("pas de résonance réelle : f N q²/(3 ε0 m) ≥ ω0²");
      return { w0: k.w0, w0Local: Math.sqrt(s), rapport: Math.sqrt(s) / k.w0 };
    }

    /* §32-4. The plane wave (32.36) E_x = E0 e^(−ω nI z/c) e^(iω(t − nR z/c)), the real part taken, in a uniform medium
       filling z ≥ 0 (no reflection at the entrance). { Ex(z, t), enveloppe(z), lambda = 2πc/(ω nR), vitesse = c/nR,
       longueur = c/(ω nI) (amplitude divided by e), beta = 2ω nI/c (32.36a, intensity ∝ e^(−βz)), transmission(d),
       dB(d) = 10 log10 of the intensity ratio, in dB (positive: a loss) }. */
    function onde(w, n, E0) {
      positif(w, "ω"); const z = cplx(n, "n"), nR = z.re, nI = -z.im; E0 = E0 == null ? 1 : fini(E0, "E0");
      if (!(nR > 0)) err("nR doit être strictement positif : pas d'onde qui avance");
      const beta = 2 * w * nI / C;
      return {
        Ex: (zz, t) => E0 * Math.exp(-w * nI * zz / C) * Math.cos(w * (t - nR * zz / C)),
        enveloppe: zz => E0 * Math.exp(-w * nI * zz / C),
        lambda: 2 * Math.PI * C / (w * nR), vitesse: C / nR, longueur: nI > 0 ? C / (w * nI) : Infinity, beta,
        transmission: d => Math.exp(-beta * d), dB: d => 10 * beta * d / Math.LN10,
      };
    }

    /* The nI of an attenuation given in dB per metre at the vacuum wavelength λ: β = (ln 10/10) a, nI = β λ/(4π). */
    function nIDepuisDB(dBparM, lambda) {
      positif0(dBparM, "atténuation"); positif(lambda, "λ");
      return Math.LN10 / 10 * dBparM * lambda / (4 * Math.PI);
    }

    /* §32-2. (32.9) and (32.10) by centred differences of step h (m) and h/C (s): ρ_pol = −∇·P, j_pol = ∂P/∂t, and the
       continuity residue ∂ρ/∂t + ∇·j, zero for any P(r, t) (it is an identity), up to the error of the differences.
       P(r, t) → [Px, Py, Pz] in C·m⁻². { rho, j, dRho, divJ, residu, echelle } */
    function chargesPolarisation(P, r, t, h) {
      if (typeof P !== "function") err("P doit être une fonction (r, t)");
      positif(h, "h"); const ht = h / C;
      const jAt = q => [0, 1, 2].map(i => (P(q, t + ht)[i] - P(q, t - ht)[i]) / (2 * ht)), divAt = dt => divergence(q => P(q, t + dt), r, h);
      const rho = -divAt(0), j = jAt(r), dRho = -(divAt(ht) - divAt(-ht)) / (2 * ht), divJ = divergence(jAt, r, h);
      return { rho, j, dRho, divJ, residu: dRho + divJ, echelle: Math.max(Math.abs(dRho), Math.abs(divJ)) };
    }

    /* Nitrogen at the sodium D line (589 nm): the gas at 273,15 K and 101 325 Pa, (n − 1) = 298 × 10⁻⁶; the liquid at its
       boiling point 77,29 K under 1 atm, n = 1,199, 807 kg·m⁻³ (Particle Data Group, Atomic and nuclear properties:
       nitrogen gas, liquid nitrogen). M = 28,0134 g·mol⁻¹. The gas taken as ideal (its second virial correction ≈ 5 × 10⁻⁴
       of N, below what n − 1 = 298 × 10⁻⁶ resolves). */
    const AZOTE = Object.freeze({ gaz: Object.freeze({ nMoins1: 298e-6, T: 273.15, p: Cst.atm }), liquide: Object.freeze({ n: 1.199, rho: 807, T: 77.29 }), M: 0.0280134 });

    /* From the gas to the liquid: Nα measured on the gas (32.32), the same α per molecule (no change of α with density
       nor with temperature), the liquid's N from its density. { Ngaz, Nliq, rapport, alpha (m³), Na, n: { gaz, libre,
       local }, mesure }: n of the liquid by (32.26), (32.25) and (32.31), α real (589 nm is far from the resonances of N2). */
    function azote(A) {
      A = A || AZOTE;
      const Ngaz = A.gaz.p / (KB * A.gaz.T), Nliq = A.liquide.rho / A.M * NA;
      const ng = 1 + A.gaz.nMoins1, NaGaz = 3 * (ng * ng - 1) / (ng * ng + 2), alpha = NaGaz / Ngaz, Na = alpha * Nliq;
      return { Ngaz, Nliq, rapport: Nliq / Ngaz, alpha, Na, n: indicesReels(Na), mesure: A.liquide.n };
    }

    /* the three indices of indices() for a real Nα (far from every resonance): { gaz (32.26), libre (32.25), local (32.31) } */
    function indicesReels(Na) {
      positif0(Na, "Nα"); if (!(Na < 3)) err("Nα doit rester sous 3 : au-delà, le modèle du champ local n'a plus de réponse finie");
      return { gaz: 1 + Na / 2, libre: Math.sqrt(1 + Na), local: Math.sqrt(1 + Na / (1 - Na / 3)) };
    }

    Object.assign(api, { polarisabiliteAtome, deplacement, nDepuisN2, indices, nAlpha, resonanceLocale, onde, nIDepuisDB,
      chargesPolarisation, AZOTE, azote, indicesReels });
  }

  /* ---------- Étape « Modes guidés et technique des guides » (II.24.5 à 24.8) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, ETA = 1 / (EPS0 * C), DB = 20 / Math.LN10;

    /* Mode (type, m, n) of an a × b rectangular guide, perfect walls, vacuum, at the frequency f. kc² = (mπ/a)² + (nπ/b)²,
       (24.14) along x and along y put into (24.16): (24.16p) ; kz = √(k0² − kc²) above cutoff, k′ = √(kc² − k0²) below, as
       in (24.17) and (24.22). TE needs (m, n) ≠ (0, 0), TM needs m, n ≥ 1 (its Ez ∝ sin(mπx/a) sin(nπy/b) vanishes otherwise).
       champ(x, y): the shape of the fields over the cross-section, up to one factor, at a crest of the wave. TE: Hz ∝ cos cos,
       E_t ∝ ẑ ∧ ∇Hz/kc ; TM: Ez ∝ sin sin, E_t ∝ ∇Ez/kc (in quadrature with Ez). guideRect (étape « Lignes de transmission et
       guide rectangulaire ») gives the full fields of TE_n0 ; modesRect the list of cutoffs. */
    function modeRect(type, m, n, a, b, f) {
      if (type !== "TE" && type !== "TM") err("type doit être « TE » ou « TM »");
      entier(m, "m", 0); entier(n, "n", 0); positif(a, "a"); positif(b, "b"); positif(f, "f");
      if (type === "TE" && m === 0 && n === 0) err("le mode TE00 n'existe pas");
      if (type === "TM" && (m < 1 || n < 1)) err("un mode TM demande m ≥ 1 et n ≥ 1");
      const p = m * Math.PI / a, q = n * Math.PI / b, kc = Math.hypot(p, q), k0 = 2 * Math.PI * f / C, d = k0 * k0 - kc * kc;
      const propage = d > 0, kz = propage ? Math.sqrt(d) : 0, kp = propage ? 0 : Math.sqrt(-d);
      const champ = (x, y) => {
        const cx = Math.cos(p * x), sx = Math.sin(p * x), cy = Math.cos(q * y), sy = Math.sin(q * y);
        return type === "TE" ? { Ex: q * cx * sy / kc, Ey: -p * sx * cy / kc, Ez: 0, Hz: cx * cy }
          : { Ex: p * cx * sy / kc, Ey: q * sx * cy / kc, Ez: sx * sy, Hz: 0 };
      };
      return { type, m, n, kc, fc: C * kc / (2 * Math.PI), k0, propage, kz, kPrime: kp, lambdaG: propage ? 2 * Math.PI / kz : Infinity,
        vPhase: propage ? C * k0 / kz : Infinity, vGroupe: propage ? C * kz / k0 : 0, dBparMetre: DB * kp, champ };
    }

    const unGuide = g => { if (!g || typeof g.propage !== "boolean" || !(g.kz >= 0) || !(g.kPrime >= 0)) err("le guide doit venir de guideRect ou de modeRect"); return g; };

    /* A slotted line: a generator at s = 0 drives one mode (guide: guideRect(…) or modeRect(…)) ; the guide ends at s = L
       on a load of reflection coefficient Γ (−1: metal plate, 0: matched absorber). The probe at s reads the square of the
       field (a square-law detector: a diode in its small-signal regime), from the two waves of (24.12) and (24.23):
       E(s) = e^(−γs) + Γ e^(−γ(2L − s)), γ = α + i kz above cutoff, α + k′ below : (24.12p). α (Np·m⁻¹, default 0): the
       walls. The probe must be small against λ0, disturb the wave little, and stay out of the generator's near field
       (a few a, where the higher modes have not yet died out). o = { guide, L, Gamma, alpha, n, s0, s1 } →
       { s, lecture, propage, lambdaG, minima, lambdaMesure (2 × node spacing), ros = √(max/min), rosTheorique } */
    function ligneFendue(o) {
      const g = unGuide(o.guide), L = positif(o.L, "L"), G = cplx(o.Gamma == null ? 0 : o.Gamma, "Γ");
      const alpha = o.alpha == null ? 0 : fini(o.alpha, "α"), n = entier(o.n == null ? 600 : o.n, "n", 10);
      const s0 = o.s0 == null ? 0 : fini(o.s0, "s0"), s1 = o.s1 == null ? L : fini(o.s1, "s1");
      if (alpha < 0) err("α doit être ≥ 0");
      if (Cx.abs2(G) > 1 + 1e-12) err("|Γ| ne peut pas dépasser 1 pour une charge passive");
      if (!(s0 >= 0 && s1 <= L && s1 > s0)) err("il faut 0 ≤ s0 < s1 ≤ L");
      const gr = alpha + (g.propage ? 0 : g.kPrime), gi = g.propage ? g.kz : 0, S = [], Y = [];
      for (let i = 0; i <= n; i++) {
        const s = s0 + (s1 - s0) * i / n, inc = Cx.exp(Cx.c(-gr * s, -gi * s)), ref = Cx.mul(G, Cx.exp(Cx.c(-gr * (2 * L - s), -gi * (2 * L - s))));
        S.push(s); Y.push(Cx.abs2(Cx.add(inc, ref)));
      }
      const minima = [], h = (s1 - s0) / n;
      for (let i = 1; i < n; i++) if (Y[i] < Y[i - 1] && Y[i] <= Y[i + 1]) {
        const den = Y[i - 1] - 2 * Y[i] + Y[i + 1];
        minima.push(S[i] + (den > 0 ? 0.5 * h * (Y[i - 1] - Y[i + 1]) / den : 0));
      }
      const lambdaMesure = minima.length > 1 ? 2 * (minima[minima.length - 1] - minima[0]) / (minima.length - 1) : NaN;
      const m = Math.sqrt(Cx.abs2(G)), max = Math.max(...Y), min = Math.min(...Y);
      return { s: S, lecture: Y, propage: g.propage, lambdaG: g.lambdaG, minima, lambdaMesure,
        ros: min > 0 ? Math.sqrt(max / min) : Infinity, rosTheorique: m < 1 ? (1 + m) / (1 - m) : Infinity };
    }

    /* Attenuation of TE10 (guide: guideRect(a, b, f), vacuum) by walls of conductivity σ, from the currents of the ideal
       mode (a perturbation): α = Rs [1 + (2b/a)(fc/f)²]/(η b √(1 − (fc/f)²)) Np·m⁻¹, η = μ0 c, Rs = 1/(σδ), δ = √(2/(ωμ0σ)).
       Valid while α λg ≪ 1, away from cutoff (α diverges at fc, where the perturbation fails), smooth clean walls (roughness
       ≪ δ). { alpha, dB, Rs, delta } */
    function attenuationTE10(guide, sigma) {
      const g = unGuide(guide); positif(sigma, "σ");
      if (g.n !== 1 || !(g.a > 0 && g.b > 0) || (g.epsr || 1) !== 1) err("le guide doit être guideRect(a, b, f), mode TE10 dans le vide");
      if (!g.propage) err("sous la coupure, l'atténuation des parois n'a pas de sens : l'onde ne se propage pas");
      const delta = peau(sigma, 2 * Math.PI * g.f), Rs = 1 / (sigma * delta), r = g.fc / g.f;
      const alpha = Rs * (1 + 2 * g.b / g.a * r * r) / (ETA * g.b * Math.sqrt(1 - r * r));
      return { alpha, dB: DB * alpha, Rs, delta };
    }
    /* Peak power of a coaxial line (ligne: ligneCoaxiale(a, b)) before its field reaches Emax: the field is largest on the
       inner conductor, V/(a ln(b/a)), and P = V²/(2 z0), so P = Emax² a² ln²(b/a)/(2 z0) = π ε0 c Emax² a² ln(b/a) in air :
       (24.11p). At fixed b, largest for b/a = √e ≈ 1,65. A sinusoidal wave on a matched line ; Emax a crest value. */
    function puissanceCoaxiale(ligne, Emax) {
      if (!ligne || !(ligne.a > 0) || !(ligne.b > ligne.a) || !(ligne.z0 > 0)) err("la ligne doit venir de ligneCoaxiale");
      positif(Emax, "Emax");
      const V = Emax * ligne.a * Math.log(ligne.b / ligne.a);
      return { V, P: V * V / (2 * ligne.z0) };
    }

    /* A multi-hole directional coupler: N small holes, spaced d, in the wall shared by the main guide (guide: guideRect or
       modeRect) and a parallel secondary guide carrying the same mode. Each hole sends into the secondary guide, both ways,
       the same small fraction of the field that passes it (weights w: uniform or binomial), without drawing on the main
       wave. Forward, every path has the same length: Σ w. Backward, hole j is late by 2 kz j d: |Σ w e^(−2i kz j d)| : (24.17p).
       Model: weak holes (no multiple scattering), small against λg, radiating equally both ways.
       o = { guide, d, N, poids } → { avant, arriere, directivite (dB), poids } */
    function coupleurTrous(o) {
      const g = unGuide(o.guide), d = positif(o.d, "d"), N = entier(o.N, "N", 1), poids = o.poids || "uniforme";
      if (poids !== "uniforme" && poids !== "binomial") err("poids doit être « uniforme » ou « binomial »");
      if (!g.propage) err("sous la coupure, aucune onde ne passe dans le guide principal");
      const w = [];
      for (let j = 0; j < N; j++) w.push(poids === "uniforme" || j === 0 ? 1 : w[j - 1] * (N - j) / j);
      let fw = 0, br = 0, bi = 0;
      w.forEach((x, j) => { fw += x; br += x * Math.cos(2 * g.kz * j * d); bi -= x * Math.sin(2 * g.kz * j * d); });
      const arriere = Math.hypot(br, bi);
      return { avant: fw, arriere, directivite: arriere > 1e-12 * fw ? DB * Math.log(fw / arriere) : Infinity, poids: w };
    }

    /* J0 and Y0 for x > 0: Abramowitz & Stegun 9.4.1, 9.4.2 (x ≤ 3) and 9.4.3 (x > 3) ; errors < 1,6 × 10⁻⁸ (J0, Y0) and
       7 × 10⁻⁸ on the phase. Polynomials, because an image map calls them a million times: besselJ (étape « Cavités
       résonantes ») is an exact integral, slower and limited to |x| ≤ 100 ; besselJ0 of optique-ondulatoire.js has no Y0. hankel2(x) = J0 − i Y0 ~ √(2/(πx)) e^(−i(x − π/4)). */
    function bessel0(x) {
      positif(x, "x");
      if (x <= 3) {
        const t = (x / 3) ** 2;
        const J = 1 + t * (-2.2499997 + t * (1.2656208 + t * (-0.3163866 + t * (0.0444479 + t * (-0.0039444 + t * 0.00021)))));
        const Y = 2 / Math.PI * Math.log(x / 2) * J + 0.36746691 + t * (0.60559366 + t * (-0.74350384 + t * (0.25300117 + t * (-0.04261214 + t * (0.00427916 - t * 0.00024846)))));
        return { J, Y };
      }
      const u = 3 / x;
      const f0 = 0.79788456 + u * (-0.00000077 + u * (-0.0055274 + u * (-0.00009512 + u * (0.00137237 + u * (-0.00072805 + u * 0.00014476)))));
      const th = x - 0.78539816 + u * (-0.04166397 + u * (-0.00003954 + u * (0.00262573 + u * (-0.00054125 + u * (-0.00029333 + u * 0.00013558)))));
      const r = f0 / Math.sqrt(x);
      return { J: r * Math.cos(th), Y: r * Math.sin(th) };
    }
    function hankel2(x) { const { J, Y } = bessel0(x); return { re: J, im: -Y }; }

    /* A line current along y at x = x0 between two perfectly conducting planes x = 0 and x = a (the top and bottom of the
       guide removed: no effect on this mode), frequency c/λ0. G solves (∇² + k²) G = −δ(x − x0) δ(z), G = 0 on the planes,
       outgoing waves (time factor e^(iωt)) ; E_y is proportional to G.
       modal(x, z, M): Σ_{m=1..M} sin(mπx0/a) sin(mπx/a) e^(−iβm|z|)/(i a βm), βm = √(k² − (mπ/a)²) or −i√((mπ/a)² − k²) ;
       exact as M → ∞, slow near z = 0 (the source's logarithm).
       images(x, z, N): the free field (−i/4) H0⁽²⁾(kρ) of the source and of its images, + at x0 + 2ja, − at −x0 + 2ja, for
       every image closer to the field point than R = (2N + 1) a, tapered by cos²(π d/(2R)) of its distance d, so that the far
       images, whose sum converges only on average, fade in smoothly (an Abel-type summation : it tends to the modal field
       as N grows, except right at a cutoff, where βm = 0) ; the images that mirror each other in a wall are equally far
       from a point of that wall, so the field vanishes there exactly, for any N. The image
       array is the point of view of (24.33): its plane waves leave at sin θ = mλ0/(2a). */
    function sourceEntreParois(o) {
      const a = positif(o.a, "a"), l0 = positif(o.lambda0, "λ0"), x0 = o.x0 == null ? a / 2 : fini(o.x0, "x0");
      if (!(x0 > 0 && x0 < a)) err("la source doit être entre les parois : 0 < x0 < a");
      const k = 2 * Math.PI / l0;
      function modal(x, z, M) {
        fini(x, "x"); fini(z, "z"); entier(M, "M", 1);
        let re = 0, im = 0;
        for (let m = 1; m <= M; m++) {
          const km = m * Math.PI / a, d = k * k - km * km, amp = Math.sin(km * x0) * Math.sin(km * x) / a;
          if (amp === 0) continue;
          if (d > 0) { const bm = Math.sqrt(d), ph = bm * Math.abs(z); re += -amp * Math.sin(ph) / bm; im += -amp * Math.cos(ph) / bm; }
          else if (d < 0) { const kp = Math.sqrt(-d); re += amp * Math.exp(-kp * Math.abs(z)) / kp; }
          else err("fréquence de coupure exacte du mode " + m + " : le champ n'est pas borné");
        }
        return { re, im };
      }
      function images(x, z, N) {
        fini(x, "x"); fini(z, "z"); entier(N, "N", 0);
        const R = (2 * N + 1) * a, j0 = Math.floor((x - R) / (2 * a)) - 1, j1 = Math.ceil((x + R) / (2 * a)) + 1;
        let re = 0, im = 0;
        for (let j = j0; j <= j1; j++) {
          for (const [xs, sg] of [[x0 + 2 * j * a, 1], [-x0 + 2 * j * a, -1]]) {
            const dx = Math.abs(x - xs); if (dx >= R) continue;
            const w = Math.cos(Math.PI * dx / (2 * R)) ** 2, r = Math.hypot(x - xs, z);
            if (r === 0) err("le point d'observation est sur une source");
            const h = hankel2(k * r);                       // (−i/4)(J0 − iY0) = −Y0/4 − i J0/4
            re += sg * w * (h.im / 4); im += sg * w * (-h.re / 4);
          }
        }
        return { re, im };
      }
      return { k, modal, images, directions: anglesImages(l0, a, x0 === a / 2) };
    }
    /* (24.33) to (24.35) for every order: the image array (spacing a, alternating signs) sends plane waves where the paths
       of neighbours differ by mλ0/2 with m odd, hence sin θm = mλ0/(2a) ; a centred source has odd m only, an off-centre
       one all m ≥ 1 (the image pairs are then 2a apart). cos θm = λ0/λg (24.34). Exact for perfect plane walls. */
    function anglesImages(lambda0, a, centre = true) {
      positif(lambda0, "λ0"); positif(a, "a");
      const out = [];
      for (let m = 1; m * lambda0 < 2 * a; m += centre ? 2 : 1) {
        const s = m * lambda0 / (2 * a), th = Math.asin(s);
        out.push({ m, sinTheta: s, theta: th, lambdaG: lambda0 / Math.cos(th) });
      }
      return out;
    }

    Object.assign(api, { modeRect, ligneFendue, attenuationTE10, puissanceCoaxiale, coupleurTrous, bessel0, hankel2,
      sourceEntreParois, anglesImages });
  }

  /* ---------- Étape « Mélanges, métaux et effet de peau » (II.32.5 à 32.7) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, QE = Cst.e, ME = Cst.m_e, NA = Cst.N_A;
    const { c, div } = Cx;
    /* ---- II.32.5: index of a mixture ----
       Lorentz–Lorenz: 3(n² − 1)/(n² + 2) = Σ N_k α_k (32.34), (32.37). Holds for a mixture of molecules whose
       polarisabilities do not depend on their neighbours (no chemistry), in an isotropic arrangement (Lorentz's local
       field E + P/3ε0, (32.28)), with λ ≫ the distance between molecules, far from absorption lines (n real). */
    const lorentzLorenz = n => api.nAlpha(positif(n, "n")).re;                         // nAlpha: step « Ondes dans un diélectrique »
    function indiceLL(L) {
      fini(L, "L"); if (!(L > -1.5 && L < 3)) err("indiceLL : 3(n² − 1)/(n² + 2) est entre −3/2 et 3");
      return Math.sqrt((1 + 2 * L / 3) / (1 - L / 3));
    }
    /* Sucrose in water at 293,15 K (20 °C), sodium D line (589 nm). w: mass fraction ; rho: kg·m⁻³, NBS Circular C457
       (1946), true specific gravity 20/4 °C × 999,972 ; n: ICUMSA, as tabulated by the OIV (method OIV-MA-AS2-02),
       water 1,3330. Molar masses: water 18,015, sucrose 342,30 g·mol⁻¹. */
    const SACCHAROSE = { M1: 18.015e-3, M2: 342.30e-3, lignes: [
      [0, 998.20, 1.33300], [0.10, 1038.11, 1.34782], [0.20, 1080.93, 1.36384], [0.30, 1126.95, 1.38115],
      [0.40, 1176.42, 1.39986], [0.50, 1229.54, 1.42009], [0.60, 1286.42, 1.44193], [0.70, 1347.13, 1.46546],
      [0.75, 1378.93, 1.47785]].map(([w, rho, n]) => ({ w, rho, n })) };
    /* amounts per unit volume, mol·m⁻³: c1 = ρ(1 − w)/M1 (water), c2 = ρw/M2 (sucrose) ; N_k = N_A c_k */
    function concentrations(w, rho, d = SACCHAROSE) {
      fini(w, "w"); if (w < 0 || w > 1) err("w est une fraction massique, entre 0 et 1"); positif(rho, "ρ");
      return { c1: rho * (1 - w) / d.M1, c2: rho * w / d.M2 };
    }
    /* Three mixing rules f(n) = c1 a1 + c2 a2, each fitted on pure water (a1) and on one row (a2):
       « ll » f = 3(n² − 1)/(n² + 2) (32.37) ; « sansChampLocal » f = n² − 1 (molecules feel the mean field, as the
       electrons of a metal do) ; « gladstoneDale » f = n − 1 (Gladstone and Dale's empirical rule). */
    const REGLES = {
      ll: { f: lorentzLorenz, inv: indiceLL },
      sansChampLocal: { f: n => positif(n, "n") ** 2 - 1, inv: f => Math.sqrt(1 + f) },
      gladstoneDale: { f: n => positif(n, "n") - 1, inv: f => 1 + f },
    };
    function regleMelange(regle, calage = 0.5, d = SACCHAROSE) {
      const R = REGLES[regle]; if (!R) err("règle inconnue : " + regle + " (ll, sansChampLocal, gladstoneDale)");
      const eau = d.lignes.find(l => l.w === 0), ref = d.lignes.find(l => Math.abs(l.w - calage) < 1e-9);
      if (!eau) err("il faut une ligne d'eau pure (w = 0)"); if (!ref || ref.w === 0) err("calage : une ligne de la table, w > 0");
      const a1 = R.f(eau.n) / concentrations(0, eau.rho, d).c1;
      const aDe = l => { const k = concentrations(l.w, l.rho, d); return (R.f(l.n) - k.c1 * a1) / k.c2; };
      const a2 = aDe(ref);
      const predire = (w, rho) => { const k = concentrations(w, rho, d); return R.inv(k.c1 * a1 + k.c2 * a2); };
      const lignes = d.lignes.map(l => ({ w: l.w, rho: l.rho, n: l.n, a2: l.w > 0 ? aDe(l) : null, nPredit: predire(l.w, l.rho) }));
      const a2s = lignes.filter(l => l.a2 != null).map(l => l.a2), moy = a2s.reduce((s, x) => s + x, 0) / a2s.length;
      return { regle, a1, a2, predire, lignes, ecartA2: (Math.max(...a2s) - Math.min(...a2s)) / moy,
        ecartN: Math.max(...lignes.map(l => Math.abs(l.nPredit - l.n))) };
    }
    /* density of the solution between two rows of the table (linear in w): error < 0,5 kg·m⁻³ (4 × 10⁻⁴) mid-step */
    function densiteSaccharose(w, d = SACCHAROSE) {
      fini(w, "w"); const L = d.lignes, last = L[L.length - 1];
      if (w < 0 || w > last.w) err("w entre 0 et " + last.w);
      let i = 0; while (i < L.length - 2 && w > L[i + 1].w) i++;
      const a = L[i], b = L[i + 1], s = (w - a.w) / (b.w - a.w);
      return a.rho + s * (b.rho - a.rho);
    }
    /* polarisability of one molecule from its share of 3(n² − 1)/(n² + 2) per mol·m⁻³: α = a/N_A, in m³ (p = ε0 α E) ;
       molar refraction R = N_A α/3, in m³·mol⁻¹ */
    const polarisabilite = a => ({ alpha: fini(a, "a") / NA, refractionMolaire: a / 3 });

    /* ---- II.32.6: waves in metals (free electrons, Drude) ----
       Free electrons: no restoring force, mean field (no local-field correction), drag γ = 1/τ (32.40), σ = N q² τ/m
       (32.41). Bound electrons, interband transitions and the anomalous skin effect (mean free path > δ) are left out. */
    /* conductivity at 293 K from the resistivity: Ag, Cu, Au (Wikipedia, « Electrical resistivity and conductivity »),
       Al (HyperPhysics, after Giancoli), Na (the same Wikipedia table, room temperature) ; N: free electrons per m³,
       Ashcroft and Mermin (HyperPhysics), alkalis consistent with their Fermi energies to 1 %. */
    const METAUX_LIBRES = {
      cuivre: { sigma: 1 / 1.68e-8, N: 8.47e28 }, argent: { sigma: 1 / 1.59e-8, N: 5.86e28 },
      or: { sigma: 1 / 2.44e-8, N: 5.90e28 }, aluminium: { sigma: 1 / 2.65e-8, N: 18.1e28 },
      sodium: { sigma: 1 / 4.77e-8, N: 2.65e28 }, lithium: { N: 4.70e28 }, potassium: { N: 1.40e28 }, rubidium: { N: 1.15e28 },
    };
    const metal = m => { const x = typeof m === "string" ? METAUX_LIBRES[m] : m; if (!x) err("métal inconnu : " + m); return x; };
    /* τ = mσ/(N q²) (32.43), γ = 1/τ, ωp² = N q²/(ε0 m) = σ/(ε0 τ) ; frequencies fτ = 1/(2πτ), fσ = σ/(2π ε0), fp = ωp/2π */
    function drude(m) {
      const { sigma, N } = metal(m); positif(sigma, "σ"); positif(N, "N");
      const tau = ME * sigma / (N * QE * QE), wp = pulsationPlasmaElectrons(N);
      return { sigma, N, tau, gamma: 1 / tau, wp, fp: wp / (2 * Math.PI), lambdaP: 2 * Math.PI * C / wp,
        sigmaSurEps0: sigma / EPS0, ftau: 1 / (2 * Math.PI * tau), fsigma: sigma / (2 * Math.PI * EPS0) };
    }
    const vitesseDerive = (E, tau) => QE * fini(E, "E") * positif(tau, "τ") / ME;   // (32.39), modulus, q = e
    /* n² = 1 + (σ/ε0)/(iω(1 + iωτ)) (32.42), same as (32.38) with γ = 1/τ ; n = nR − i nI ; attenuation length of the
       amplitude c/(ω nI) ; o = { sigma, N } or a name of METAUX_LIBRES */
    function indiceMetal(w, m) {
      positif(w, "ω"); const d = drude(m);
      const n2 = div(c(d.sigmaSurEps0), c(-w * w * d.tau, w)); n2.re += 1;
      const n = nDepuisN2(n2), nI = n.nI;
      return { n2, n, nR: n.re, nI, attenuation: nI > 0 ? C / (w * nI) : Infinity, wtau: w * d.tau, wSurSigma: w * EPS0 / d.sigma, drude: d };
    }
    /* The free-electron walk of Fig. 32-2, one dimension, field E along +x: free flights of exponential duration (mean τ),
       each collision resets the velocity to a thermal one, ±vth with equal odds. Exact between collisions.
       { t, x: [trajectories], derive (mean of x/T over the electrons), attendu = eEτ/m (32.39), naive = eEτ/2m }. */
    function marcheDrude(o = {}) {
      const tau = positif(o.tau == null ? 2.5e-14 : o.tau, "τ"), E = fini(o.E == null ? 1e6 : o.E, "E");
      const vth = positif0(o.vth == null ? 1e5 : o.vth, "vth"), nEl = o.n == null ? 200 : o.n, T = positif(o.T == null ? 200 * tau : o.T, "T");
      const nPts = o.points == null ? 200 : o.points, a = QE * E / ME;
      if (!Number.isInteger(nEl) || nEl < 1) err("n doit être un entier ≥ 1");
      let s = (o.graine == null ? 1 : o.graine) >>> 0;
      const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
      const temps = Array.from({ length: nPts + 1 }, (_, i) => T * i / nPts), trajets = [];
      let somme = 0, collisions = 0;
      for (let k = 0; k < nEl; k++) {
        let t = 0, x = 0, v = rnd() < 0.5 ? vth : -vth, j = 0; const xs = [];
        while (t < T) {
          const dt = -tau * Math.log(1 - rnd()), t1 = Math.min(T, t + dt);
          while (j <= nPts && temps[j] <= t1) { const u = temps[j] - t; xs.push(x + v * u + a * u * u / 2); j++; }
          const u = t1 - t; x += v * u + a * u * u / 2; t = t1;
          if (t < T) { v = rnd() < 0.5 ? vth : -vth; collisions++; }
        }
        while (j <= nPts) { xs.push(x); j++; }
        somme += x / T; if (k < (o.garder == null ? 8 : o.garder)) trajets.push(xs);
      }
      return { t: temps, x: trajets, derive: somme / nEl, attendu: a * tau, naive: a * tau / 2, collisions: collisions / nEl, a };
    }

    /* ---- II.32.7: low and high frequencies; skin depth (peau, in the socle) and plasma frequency ---- */
    /* exact attenuation length from (32.42) against (32.48) and against c/ωp (the plateau where ωτ ≫ 1 and ω < ωp) */
    function penetration(w, m) {
      const x = indiceMetal(w, m), d = x.drude;
      return { exacte: x.attenuation, basseFrequence: peau(d.sigma, w), plasma: C / d.wp, ecart: peau(d.sigma, w) / x.attenuation - 1, indice: x };
    }
    /* high frequency (ωτ ≫ 1): n² = 1 − (ωp/ω)² (32.50), (32.51) */
    const indiceHauteFrequence = (w, wp) => 1 - (positif(wp, "ωp") / positif(w, "ω")) ** 2;
    /* the wave in the metal, Fig. 32-3: Re E(z, t)/E0 = e^{−ω nI z/c} cos(ωt − ω nR z/c), z ≥ 0 (no reflected wave) */
    function ondeDansMetal(w, m) {
      const x = indiceMetal(w, m);
      return { champ: (z, t) => Math.exp(-w * x.nI * positif0(z, "z") / C) * Math.cos(w * fini(t, "t") - w * x.nR * z / C),
        enveloppe: z => Math.exp(-w * x.nI * positif0(z, "z") / C), longueurOnde: x.nR > 0 ? 2 * Math.PI * C / (w * x.nR) : Infinity, indice: x };
    }
    /* the lowest frequency where the exact attenuation length departs by tol from (32.48): a scan in steps of 10^0,05
       from 1 rad·s⁻¹ (the error grows from zero, then changes sign near ωτ = 1), then bisection on log ω */
    function domainePeau(m, tol = 0.01) {
      positif(tol, "tol"); const d = drude(m), hors = w => Math.abs(penetration(w, m).ecart) > tol;
      let lo = 1;
      if (hors(lo)) err("domainePeau : déjà hors tolérance à 1 rad·s⁻¹");
      while (!hors(lo * 1.1220184543019633)) { lo *= 1.1220184543019633; if (lo > 10 * d.wp) err("domainePeau : tolérance jamais atteinte"); }
      let hi = lo * 1.1220184543019633;
      for (let i = 0; i < 200; i++) { const mid = Math.sqrt(lo * hi); if (Math.abs(penetration(mid, m).ecart) > tol) hi = mid; else lo = mid; }
      return { w: lo, f: lo / (2 * Math.PI), lambda0: 2 * Math.PI * C / lo };
    }

    Object.assign(api, { indiceLL, SACCHAROSE, concentrations, REGLES, regleMelange, densiteSaccharose,
      polarisabilite, METAUX_LIBRES, drude, vitesseDerive, indiceMetal, marcheDrude, peau, penetration, indiceHauteFrequence,
      ondeDansMetal, domainePeau });
  }

  /* ---------- Étape « Réflexion et réfraction aux interfaces » (II.33.1 à 33.3) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = Cst.mu0;
    const angle = (x, nom) => { fini(x, nom); if (x < 0 || x >= Math.PI / 2) err(nom + " doit être dans [0, π/2["); return x; };
    const { mul, add, conj, div, abs2 } = Cx, cx = Cx.c, sc = Cx.scale, expi = p => Cx.polar(1, p);
    /* e^{−i k0 q x} for a complex q = qr + i qi (qi ≤ 0 : a wave that decays towards +x) */
    const prop = (q, k0x) => sc(expi(-q.re * k0x), Math.exp(q.im * k0x));
    /* √(ε − β²) on the physical branch (nDepuisN2): real ≥ 0 for a travelling wave, −i κ (κ > 0) for one that decays
       towards +x */
    const qx = (eps, beta) => { const q = nDepuisN2(eps - beta * beta); return cx(q.re, q.im); };

    /* (33.1) and (33.2): θr = θi, n1 sin θi = n2 sin θt. Real indices (no absorption), plane interface much larger than λ,
       medium isotropic. total = true when n1 sin θi > n2: no transmitted travelling wave, θt = null. */
    function snellDescartes(n1, n2, thetaI) {
      positif(n1, "n1"); positif(n2, "n2"); angle(thetaI, "θi");
      const s = n1 * Math.sin(thetaI) / n2, total = s > 1;
      return { thetaR: thetaI, thetaT: total ? null : Math.asin(s), sinT: s, total };
    }

    /* (33.3), (33.4), (33.5): intensity reflection coefficients of a sharp interface (index jump over ≪ λ) between
       two real, non-magnetic, isotropic media. perp: E perpendicular to the plane of incidence ; par: E in it. They are
       |r|² of fresnelInterface (étape « Coefficients de réflexion et réflexion totale »), whose k_x form has no 0/0 at
       θi = 0 ; Feynman's sine and tangent forms are its refutation test. Beyond the critical angle both are 1. */
    function reflectances(n1, n2, thetaI) {
      const sn = snellDescartes(n1, n2, thetaI), normale = ((n2 - n1) / (n2 + n1)) ** 2;
      const brewster = Math.atan(n2 / n1), critique = n1 > n2 ? Math.asin(n2 / n1) : null;
      if (sn.total) return { perp: 1, par: 1, normale, thetaT: null, total: true, brewster, critique };
      const f = api.fresnelInterface(n1, n2, thetaI);
      return { perp: f.s.R, par: f.p.R, normale, thetaT: sn.thetaT, total: false, brewster, critique };
    }

    /* A smooth index step: ε(x) = ε1 + (ε2 − ε1)(1 + tanh(x/w))/2, ε = n². w = 0 is the sharp step at x = 0.
       Beyond |x| = 10w, ε differs from its limit by less than 5 × 10⁻⁹ of the jump: the profile is cut there. */
    function profilTanh(n1, n2, w) {
      positif(n1, "n1"); positif(n2, "n2"); positif0(w, "w");
      const e1 = n1 * n1, e2 = n2 * n2;
      if (w === 0) return { n1, n2, nmax: Math.max(n1, n2), xa: 0, xb: 0, sauts: [0], zones: [],
        eps: x => (x < 0 ? e1 : e2) };
      return { n1, n2, nmax: Math.max(n1, n2), xa: -10 * w, xb: 10 * w, sauts: [], zones: [[-10 * w, 10 * w, w]],
        eps: x => (Math.abs(x) >= 10 * w ? (x < 0 ? e1 : e2) : e1 + (e2 - e1) * (1 + Math.tanh(x / w)) / 2) };
    }

    /* One uniform layer of index nc between x = 0 and x = d, sharp faces: n1 | nc | n2. */
    function profilCouche(n1, nc, d, n2) {
      positif(n1, "n1"); positif(nc, "nc"); positif0(d, "d"); positif(n2, "n2");
      return { n1, n2, nmax: Math.max(n1, nc, n2), xa: 0, xb: d, sauts: d > 0 ? [0, d] : [0], zones: [],
        eps: x => (x < 0 ? n1 * n1 : x < d ? nc * nc : n2 * n2) };
    }

    /* Maxwell's equations (33.22) and (33.24) integrated straight through the transition, for a plane wave of vacuum
       wavelength λ0 arriving from medium 1 at θ (in the xy plane, surface ∥ yz as in Fig. 33-3), fields ∝ e^{i(ωt − k_y y)},
       k_y = k0 n1 sin θ = k0 β conserved (the profile depends on x only). Non-magnetic media, real ε(x), no free charge.
       s (E ⊥ plane of incidence): E_z' = i k0 cB_y, (cB_y)' = i k0 (ε − β²) E_z, cB_x = β E_z.
       p (E in the plane): E_y' = −i k0 (1 − β²/ε) cB_z, (cB_z)' = −i k0 ε E_y, E_x = −β cB_z/ε (from (33.24a)).
       RK4 from the far side of medium 2 (only the transmitted wave there) back to medium 1, then split into incident and
       reflected waves; every field is scaled so that the incident E has amplitude 1 and phase 0 at x = 0.
       Returns r (reflected/incident: E_z for s, B_z for p), R = |r|², T (flux carried into medium 2 / incident flux),
       and the points { x, eps, Ex, Ey, Ez, cBx, cBy, cBz, Px, Dx, dPx, flux } with Px = P_x/ε0, Dx = D_x/ε0,
       dPx = ∂(P_x/ε0)/∂x (centred differences), flux = time-averaged S_x / incident S_x. o = { lambda0, theta, pol,
       vue: [x0, x1], pas: steps per wavelength in the densest medium (default 400) }. */
    function traverseeInterface(profil, o = {}) {
      if (!profil || typeof profil.eps !== "function") err("profil invalide : utiliser profilTanh ou profilCouche");
      const l0 = positif(o.lambda0, "λ0"), th = angle(o.theta || 0, "θ"), pol = o.pol || "s";
      if (pol !== "s" && pol !== "p") err("polarisation inconnue : " + pol + " (s ou p)");
      const pas = o.pas === undefined ? 400 : positif(o.pas, "pas"), vue = o.vue || [profil.xa - l0 / 2, profil.xb + l0 / 2];
      fini(vue[0], "vue[0]"); fini(vue[1], "vue[1]");
      const k0 = 2 * Math.PI / l0, n1 = profil.n1, e1 = n1 * n1, e2 = profil.n2 * profil.n2, beta = n1 * Math.sin(th);
      const X0 = Math.min(vue[0], profil.xa), X1 = Math.max(vue[1], profil.xb);
      const hOnde = l0 / (profil.nmax * pas);
      /* breakpoints: ends, jumps, zone edges ; each interval gets its own step */
      const bornes = [...new Set([X0, X1, ...profil.sauts, ...profil.zones.flat().filter((_, i) => i % 3 !== 2)])]
        .filter(x => x >= X0 && x <= X1).sort((a, b) => a - b);
      const hDe = (a, b) => { let h = hOnde; for (const [za, zb, w] of profil.zones) if (b > za && a < zb) h = Math.min(h, w / 40); return h; };
      const f = pol === "s"
        ? (x, y) => { const e = profil.eps(x); return [cx(-k0 * y[1].im, k0 * y[1].re), mul(cx(0, k0 * (e - beta * beta)), y[0])]; }
        : (x, y) => { const e = profil.eps(x); return [mul(cx(0, -k0 * (1 - beta * beta / e)), y[1]), mul(cx(0, -k0 * e), y[0])]; };
      const q2 = qx(e2, beta), q1 = qx(e1, beta);
      if (pol === "p" && q2.re === 0 && q2.im === 0) err("incidence critique exacte : l'onde transmise rase la surface");
      /* far side of medium 2: transmitted wave only. s: E_z = e^{−i k0 q2 x}, cB_y = −q2 E_z ; p: cB_z = e^{−i k0 q2 x}, E_y = (q2/ε2) cB_z */
      const g = prop(q2, k0 * X1);
      let y = pol === "s" ? [g, mul(cx(-q2.re, -q2.im), g)] : [div(mul(q2, g), cx(e2)), g];
      const pts = [{ x: X1, y }];
      for (let j = bornes.length - 1; j > 0; j--) {
        const a = bornes[j - 1], b = bornes[j], n = Math.max(1, Math.ceil((b - a) / hDe(a, b))), h = -(b - a) / n;
        /* inside one interval ε is smooth: sample ε just inside, so a jump at an end belongs to the right side */
        const inside = x => Math.min(b - 1e-12 * (b - a), Math.max(a + 1e-12 * (b - a), x));
        for (let i = 0; i < n; i++) {
          const x = b + i * h, lin = (u, k, s) => u.map((v, m) => add(v, sc(k[m], s)));
          const k1 = f(inside(x), y), k2 = f(inside(x + h / 2), lin(y, k1, h / 2)), k3 = f(inside(x + h / 2), lin(y, k2, h / 2)),
            k4 = f(inside(x + h), lin(y, k3, h));
          y = y.map((v, m) => add(v, sc(add(add(k1[m], sc(k2[m], 2)), add(sc(k3[m], 2), k4[m])), h / 6)));
          pts.push({ x: i === n - 1 ? a : x + h, y });
        }
      }
      pts.reverse();
      /* medium 1 at X0: split. s: E_z = A + B, cB_y = −q1 (A − B) ; p: cB_z = A + B, E_y = (q1/ε1)(A − B) */
      const y0 = pts[0].y, ph = k0 * q1.re * X0;
      const [A, Bw] = pol === "s"
        ? [sc(add(y0[0], div(y0[1], cx(-q1.re))), 0.5), sc(add(y0[0], div(y0[1], cx(q1.re))), 0.5)]
        : [sc(add(y0[1], sc(y0[0], e1 / q1.re)), 0.5), sc(add(y0[1], sc(y0[0], -e1 / q1.re)), 0.5)];
      const a = mul(A, expi(ph)), bb = mul(Bw, expi(-ph)), r = div(bb, a);
      const N = pol === "s" ? a : sc(a, 1 / n1);                      // incident E amplitude 1 at x = 0
      const S0 = q1.re;                                               // incident S_x, in units of |E|²/(2 μ0 c)
      const out = pts.map(({ x, y }) => {
        const e = profil.eps(x), u = y.map(v => div(v, N)), z = cx(0);
        const F = pol === "s" ? { Ex: z, Ey: z, Ez: u[0], cBx: sc(u[0], beta), cBy: u[1], cBz: z }
          : { Ex: sc(u[1], -beta / e), Ey: u[0], Ez: z, cBx: z, cBy: z, cBz: u[1] };
        const flux = (mul(F.Ey, conj(F.cBz)).re - mul(F.Ez, conj(F.cBy)).re) / S0;
        return Object.assign({ x, eps: e, Px: sc(F.Ex, e - 1), Dx: sc(F.Ex, e), flux }, F);
      });
      for (let i = 0; i < out.length; i++) {
        const i0 = Math.max(0, i - 1), i1 = Math.min(out.length - 1, i + 1), dx = out[i1].x - out[i0].x;
        out[i].dPx = dx > 0 ? sc(add(out[i1].Px, sc(out[i0].Px, -1)), 1 / dx) : cx(0);
      }
      return { r, R: abs2(r), T: out[out.length - 1].flux, beta, q1: q1.re, q2, k0, pol, points: out };
    }

    /* Exact R of the tanh profile of profilTanh for E ⊥ the plane of incidence (any polarisation at normal incidence):
       the wave equation E_z'' + k0²(ε(x) − β²) E_z = 0 with this ε is the Fermi-step problem of quantum mechanics,
       R = [sinh(π a (k1 − k2))/sinh(π a (k1 + k2))]², a = w/2, k_j = k0 √(ε_j − β²). w → 0 gives (33.3) and (33.5).
       Beyond the critical angle (k2 imaginary) R = 1. */
    function reflectanceEpstein(n1, n2, w, lambda0, theta = 0) {
      positif(n1, "n1"); positif(n2, "n2"); positif0(w, "w"); positif(lambda0, "λ0"); angle(theta, "θ");
      const k0 = 2 * Math.PI / lambda0, beta = n1 * Math.sin(theta), d2 = n2 * n2 - beta * beta;
      if (d2 <= 0) return 1;
      const k1 = k0 * Math.sqrt(n1 * n1 - beta * beta), k2 = k0 * Math.sqrt(d2);
      if (w === 0) return ((k1 - k2) / (k1 + k2)) ** 2;
      const u = Math.PI * (w / 2) * Math.abs(k1 - k2), v = Math.PI * (w / 2) * (k1 + k2);
      const ratio = u === 0 ? 0 : Math.exp(u - v) * Math.expm1(-2 * u) / Math.expm1(-2 * v);
      return ratio * ratio;
    }

    /* A plane wave in a non-magnetic medium whose ε is diagonal on the axes x, y, z (eps = [εx, εy, εz], relative), k in
       the xz plane at θ from z. pol "y": D and E along y, n² = εy ; pol "xz": D ⊥ k in the xz plane,
       1/n² = cos²θ/εx + sin²θ/εz (from (33.8) and (33.9) with D = ε0 ε·E). For εx = εy = εz = n² both give (33.10).
       E has amplitude E0 ; B = k ∧ E/ω (33.9) ; S = <E ∧ B>/μ0 ; angleSk = angle between S and k (0 when isotropic).
       champ(r, t) → { E, B, D, P } real fields of E0 cos(ωt − k·r). Linear, lossless, uniform medium. */
    function ondeAnisotrope(o = {}) {
      const eps = o.eps, th = fini(o.theta || 0, "θ"), pol = o.pol || "y", l0 = positif(o.lambda0, "λ0");
      const E0 = o.E0 === undefined ? 1 : fini(o.E0, "E0");
      if (!Array.isArray(eps) || eps.length !== 3) err("eps doit être [εx, εy, εz]");
      eps.forEach((e, i) => positif(e, "eps[" + i + "]"));
      const kh = [Math.sin(th), 0, Math.cos(th)];
      let n, eh;
      if (pol === "y") { n = Math.sqrt(eps[1]); eh = [0, 1, 0]; }
      else if (pol === "xz") {
        const dh = [Math.cos(th), 0, -Math.sin(th)];
        n = 1 / Math.sqrt(dh[0] * dh[0] / eps[0] + dh[2] * dh[2] / eps[2]);
        const e = [dh[0] / eps[0], 0, dh[2] / eps[2]], m = norm(e); eh = e.map(v => v / m);
      } else err("polarisation inconnue : " + pol + " (y ou xz)");
      const k0 = 2 * Math.PI / l0, w = C * k0, k = kh.map(v => n * k0 * v);
      const E = eh.map(v => E0 * v), B = cross(k, E).map(v => v / w), D = E.map((v, i) => EPS0 * eps[i] * v);
      const S = cross(E, B).map(v => v / (2 * MU0));
      const cosSk = dot(S, kh) / (norm(S) || 1), angleSk = Math.acos(Math.min(1, Math.max(-1, cosSk)));
      function champ(r, t) {
        if (!Array.isArray(r) || r.length !== 3) err("r doit être un vecteur à 3 composantes");
        const c = Math.cos(w * fini(t, "t") - dot(k, r));
        return { E: E.map(v => v * c), B: B.map(v => v * c), D: D.map(v => v * c), P: D.map((v, i) => (v - EPS0 * E[i]) * c) };
      }
      return { n, k, kHat: kh, omega: w, lambda: l0 / n, E, B, D, S, angleSk, champ };
    }

    /* Maxwell's equations in the medium, checked on onde.champ by centred differences of step h in space (and h/c in
       time): ∇ ∧ E + ∂B/∂t, c² ∇ ∧ B − (1/ε0) ∂D/∂t, ∇·D, ∇·B, each with the size of its largest term (echelle). */
    function residusOndeMilieu(onde, r, t, h) {
      positif(h, "h"); fini(t, "t");
      const ht = h / C, G = key => p => onde.champ(p, t)[key];
      const dT = key => { const a = onde.champ(r, t + ht)[key], b = onde.champ(r, t - ht)[key]; return a.map((v, m) => (v - b[m]) / (2 * ht)); };
      const rot = key => rotationnel(G(key), r, h), dv = key => divergence(G(key), r, h);
      const rE = rot("E"), rB = rot("B"), dB = dT("B"), dD = dT("D");
      const far = rE.map((v, i) => v + dB[i]), amp = rB.map((v, i) => C * C * v - dD[i] / EPS0);
      const k = norm(onde.k), b = norm(onde.B), d = norm(onde.D);
      return { faraday: norm(far), ampere: norm(amp), gaussD: Math.abs(dv("D")), gaussB: Math.abs(dv("B")),
        echelle: { faraday: onde.omega * b, ampere: onde.omega * d / EPS0, gaussD: k * d, gaussB: k * b } };
    }

    Object.assign(api, { snellDescartes, reflectances, profilTanh, profilCouche, traverseeInterface, reflectanceEpstein,
      ondeAnisotrope, residusOndeMilieu });
  }

  /* ---------- Étape « Coefficients de réflexion et réflexion totale » (II.33.4 à 33.6) ---------- */
  {
    const EPS0 = Cst.eps0;
    /* an index: a real number > 0, or { re, im } with re ≥ 0 and im ≤ 0 (n = nR − i nI, a passive medium for e^{i(ωt − k·r)}) */
    const indice = (n, nom) => {
      const z = typeof n === "number" ? { re: positif(n, nom), im: 0 } : n && typeof n === "object" ? { re: fini(n.re, nom + ".re"), im: fini(n.im == null ? 0 : n.im, nom + ".im") } : err(nom + " : un réel ou un complexe { re, im } attendu");
      if (z.re < 0 || z.im > 0) err(nom + " : milieu passif attendu, n = nR − i nI avec nR ≥ 0, nI ≥ 0");
      if (z.re === 0 && z.im === 0) err(nom + " ne peut pas être nul");
      return z;
    };
    const angle = (th, nom) => { fini(th, nom); if (th < 0 || th > Math.PI / 2 + 1e-12) err(nom + " entre 0 et π/2 attendu"); return Math.min(th, Math.PI / 2); };

    /* §33-4. k_x of a wave of the medium n whose k_y is fixed by the incident wave, in units of k0 = ω/c:
       q = √(n² − (n1 sin θi)²), (33.45) divided by k0. The root that carries energy towards +x or decays towards +x:
       Im q ≤ 0, and Re q ≥ 0 when q is real (nDepuisN2 of the step « Ondes dans un diélectrique »). n1 sin θi beyond a real
       n gives q = −i κ: the evanescent wave of §33-6. Exact for plane waves and a flat, sharp interface. */
    function qx(n, s) {
      const z = indice(n, "n"), n2 = Cx.sub(Cx.mul(z, z), Cx.c(fini(s, "n1 sin θi") ** 2));
      const r = nDepuisN2(n2);
      return Cx.c(r.re, r.im);
    }
    /* §33-4. A plane wave from the transparent medium n1 (real) meets at θi the flat face x = 0 of the medium n2 (real or
       complex), both isotropic and non-magnetic (μ = μ0). Amplitude ratios of Feynman's (33.51) to (33.54), written with
       q1 = kx/k0 = n1 cos θi and q2 = kx''/k0:
       s (E along z, normal to the plane of incidence): r = E0'/E0 = (q1 − q2)/(q1 + q2) (33.51), t = E0''/E0 = 2q1/(q1 + q2) (33.52).
       p (E in the plane of incidence, B along z for the three waves): rB = B0'/B0 = (n2² q1 − n1² q2)/(n2² q1 + n1² q2) (33.53),
       tB = B0''/B0 = 2 n2² q1/(n2² q1 + n1² q2), t = E0''/E0 = (n1/n2) tB = 2 n1 n2 q1/(…) (33.54). With B kept along +z,
       the reflected E is reversed: rE = −rB, which equals r of s at normal incidence; that is the sign of (33.56).
       R = |r|² ; T = power through x = 0 over incident power: Re(q2)|t|²/q1 (s), Re(q2/n2²)|tB|²/(q1/n1²) (p). R + T = 1:
       nothing is stored at the face. For an absorbing n2, T is the power that enters and is absorbed.
       { s: { r, t, R, T }, p: { rB, tB, r: rE, t, R, T }, q1, q2, sinT (complex if n2 is), totale } ; totale when n2 is real
       and n1 sin θi > n2 (q2 imaginary). */
    function fresnelInterface(n1, n2, theta) {
      const a = positif(n1, "n1"), b = indice(n2, "n2"), th = angle(theta, "θi");
      const s = a * Math.sin(th), q1 = Cx.c(a * Math.cos(th)), q2 = qx(b, s), b2 = Cx.mul(b, b), a2 = Cx.c(a * a);
      if (Cx.abs(Cx.add(q1, q2)) === 0) err("incidence rasante sur un milieu d'indice égal : rapport indéterminé");
      const rs = Cx.div(Cx.sub(q1, q2), Cx.add(q1, q2)), ts = Cx.div(Cx.scale(q1, 2), Cx.add(q1, q2));
      const dp = Cx.add(Cx.mul(b2, q1), Cx.mul(a2, q2));
      const rB = Cx.div(Cx.sub(Cx.mul(b2, q1), Cx.mul(a2, q2)), dp), tB = Cx.div(Cx.scale(Cx.mul(b2, q1), 2), dp);
      const tp = Cx.div(Cx.scale(Cx.mul(b, q1), 2 * a), dp);
      const Ts = q1.re > 0 ? q2.re * Cx.abs2(ts) / q1.re : 0;
      const Tp = q1.re > 0 ? Cx.div(q2, b2).re * Cx.abs2(tB) * a * a / q1.re : 0;
      const totale = b.im === 0 && s > b.re;
      return { s: { r: rs, t: ts, R: Cx.abs2(rs), T: Ts }, p: { rB, tB, r: Cx.neg(rB), t: tp, R: Cx.abs2(rB), T: Tp },
        q1, q2, sinT: Cx.div(Cx.c(s), b), totale };
    }
    /* §33-4. the field components at the face (x = 0⁻ and 0⁺), amplitudes relative to the incident one, for checking the
       boundary conditions (33.26) to (33.31): s: Ez, By (in units of E0/c) ; p: Bz, Ey (in units of cB0), Dx (in units of ε0 cB0).
       { gauche, droite } for each component. */
    function champsAuBord(n1, n2, theta, pol) {
      const f = fresnelInterface(n1, n2, theta), a = n1, b = indice(n2, "n2"), sy = n1 * Math.sin(theta);
      if (pol === "s") {
        const { r, t } = f.s;
        return { Ez: { gauche: Cx.add(Cx.c(1), r), droite: t }, By: { gauche: Cx.scale(Cx.sub(Cx.c(1), r), -f.q1.re), droite: Cx.neg(Cx.mul(f.q2, t)) },
          Bx: { gauche: Cx.scale(Cx.add(Cx.c(1), r), sy), droite: Cx.scale(t, sy) } };
      }
      if (pol !== "p") err("pol : « s » ou « p »");
      const { rB, tB } = f.p, b2 = Cx.mul(b, b);
      /* E = −(c/n²)(k/k0) ∧ B for B along z: Ey = (c q/n²) Bz for the incident wave, −(c q/n²) Bz reflected; Ex = −(c sy/n²) Bz */
      return { Bz: { gauche: Cx.add(Cx.c(1), rB), droite: tB },
        Ey: { gauche: Cx.scale(Cx.sub(Cx.c(1), rB), f.q1.re / (a * a)), droite: Cx.div(Cx.mul(f.q2, tB), b2) },
        Dx: { gauche: Cx.scale(Cx.add(Cx.c(1), rB), -sy), droite: Cx.scale(tB, -sy) } };
    }

    /* §33-5. Normal incidence from vacuum on a free-electron metal, (32.42) of the step « Mélanges, métaux et effet de
       peau » (indiceMetal): R = |(1 − n)/(1 + n)|² (33.57) with a complex n. Hagen–Rubens: R ≈ 1 − 2√(2ε0ω/σ), the limit
       ωτ ≪ 1 and ωε0/σ ≪ 1 where n ≈ (1 − i)√(σ/(2ε0ω)). Model: free electrons only (no interband transitions), local
       response (mean free path ≪ skin depth), smooth surface.
       { R, hagenRubens, absorbe = 1 − R, n, nR, nI, profondeur = c/(ω nI) (amplitude), wtau, wSurSigma, drude } */
    function reflectanceMetal(w, m) {
      const x = api.indiceMetal(positif(w, "ω"), m), f = fresnelInterface(1, { re: x.nR, im: -x.nI }, 0);
      return { R: f.s.R, hagenRubens: 1 - 2 * Math.sqrt(2 * EPS0 * w / x.drude.sigma), absorbe: 1 - f.s.R, n: x.n, nR: x.nR, nI: x.nI,
        profondeur: x.attenuation, wtau: x.wtau, wSurSigma: x.wSurSigma, drude: x.drude };
    }
    /* §33-5. One damped resonance (Lorentz): n² = nInf² + wp²/(w0² − ω² + iγω), (32.38) with a restoring force, for
       e^{iωt}. The « strong absorber » of the page: a dye whose resonance is strong (wp comparable to w0) reflects near
       w0 what it absorbs. o = { w0, wp, gamma, nInf = 1 } (rad·s⁻¹). Returns { n2, n (nR − i nI), nR, nI }. */
    function indiceLorentz(w, o) {
      positif0(w, "ω"); if (!o) err("indiceLorentz : { w0, wp, gamma } attendu");
      const w0 = positif(o.w0, "w0"), wp = positif0(o.wp, "wp"), g = positif0(o.gamma == null ? 0 : o.gamma, "γ"), ni = positif(o.nInf == null ? 1 : o.nInf, "nInf");
      const d = Cx.c(w0 * w0 - w * w, g * w);
      if (d.re === 0 && d.im === 0) err("ω = w0 sans amortissement : indice infini");
      const n2 = Cx.add(Cx.c(ni * ni), Cx.div(Cx.c(wp * wp), d)), n = nDepuisN2(n2);
      return { n2, n: Cx.c(n.re, n.im), nR: n.nR, nI: n.nI };
    }

    /* §33-6. Total internal reflection from n1 into n2 < n1 (both real) at θi beyond the critical angle: q2 = −iκ with
       κ = √((n1 sin θi)² − n2²), the field beyond the face e^{−k0 κ x} e^{i(ωt − ky y)}. { critique, kappa, kI = k0 κ (m⁻¹),
       profondeur = 1/kI (amplitude falls by e), profondeurIntensite = 1/(2kI), phaseS = arg r_s, phaseP = arg rB (the p
       component in a frame (s, p, k) tied to each beam, s along z: there E_p = −cB/n for both waves, so its ratio is rB),
       dephasage = phaseP − phaseS, what a Fresnel rhomb uses, R: { s, p } (1 and 1) } ; below the critical angle, kappa = 0
       and null depths. */
    function reflexionTotale(n1, n2, theta, lambda0) {
      const a = positif(n1, "n1"), b = positif(n2, "n2"), L = positif(lambda0, "λ0");
      const f = fresnelInterface(a, b, theta), k0 = 2 * Math.PI / L;
      const kappa = f.totale ? -f.q2.im : 0, kI = k0 * kappa;
      return { critique: a > b ? Math.asin(b / a) : null, totale: f.totale, kappa, kI, profondeur: kI > 0 ? 1 / kI : null,
        profondeurIntensite: kI > 0 ? 1 / (2 * kI) : null, phaseS: Cx.arg(f.s.r), phaseP: Cx.arg(f.p.rB),
        dephasage: Cx.wrap(Cx.arg(f.p.rB) - Cx.arg(f.s.r)), R: { s: f.s.R, p: f.p.R }, fresnel: f };
    }
    /* §33-6, Fig. 33-10. A layer n2 of thickness d between n1 and n3 (the gap between two prisms): exact plane-wave solution
       by summing the waves that go back and forth in the layer (Airy): r = (r12 + r23 e^{−2iφ})/(1 + r12 r23 e^{−2iφ}),
       t = t12 t23 e^{−iφ}/(1 + r12 r23 e^{−2iφ}), φ = k0 q2 d ; for the s field E and for the p field B (rB, tB). When the
       layer is evanescent (q2 = −iκ), e^{−iφ} = e^{−k0 κ d}: the « frustrated » total reflection. n1, n3 real, n2 real or
       complex. { r, t, R, T, profil(x) → tangential field (Ez for s, Bz for p) relative to the incident wave, x in m from
       the first face } ; R + T = 1 for transparent media. */
    function lame(o) {
      if (!o) err("lame : { n1, n2, n3, d, theta, lambda0, pol } attendu");
      const n1 = positif(o.n1, "n1"), n3 = positif(o.n3 == null ? o.n1 : o.n3, "n3"), N2 = indice(o.n2, "n2");
      const d = positif0(o.d, "d"), th = angle(o.theta == null ? 0 : o.theta, "θi"), L = positif(o.lambda0, "λ0"), pol = o.pol || "s";
      if (pol !== "s" && pol !== "p") err("pol : « s » ou « p »");
      const k0 = 2 * Math.PI / L, sy = n1 * Math.sin(th), Nc = [Cx.c(n1), N2, Cx.c(n3)];
      const q = [Cx.c(n1 * Math.cos(th)), qx(N2, sy), qx(n3, sy)];
      if (n3 < sy) err("lame : l'onde ne se propage pas dans le troisième milieu (n1 sin θi > n3)");
      /* weights: s → q ; p → q/n² (the admittance that multiplies B in Ey) */
      const w = q.map((qq, i) => pol === "s" ? qq : Cx.div(qq, Cx.mul(Nc[i], Nc[i])));
      const rij = (i, j) => Cx.div(Cx.sub(w[i], w[j]), Cx.add(w[i], w[j])), tij = (i, j) => Cx.div(Cx.scale(w[i], 2), Cx.add(w[i], w[j]));
      const r12 = rij(0, 1), r23 = rij(1, 2), t12 = tij(0, 1), t23 = tij(1, 2);
      const e1 = Cx.exp(Cx.mul(Cx.c(0, -k0 * d), q[1])), e2 = Cx.mul(e1, e1);
      const den = Cx.add(Cx.c(1), Cx.mul(Cx.mul(r12, r23), e2));
      const r = Cx.div(Cx.add(r12, Cx.mul(r23, e2)), den), t = Cx.div(Cx.mul(Cx.mul(t12, t23), e1), den);
      const R = Cx.abs2(r), T = w[2].re * Cx.abs2(t) / w[0].re;
      /* fields in the layer: A e^{−i k0 q2 x} + B e^{+i k0 q2 x}, with A + B = 1 + r and w2 (A − B) = w1 (1 − r) */
      const S = Cx.add(Cx.c(1), r), D = Cx.div(Cx.mul(w[0], Cx.sub(Cx.c(1), r)), w[1]);
      const A = Cx.scale(Cx.add(S, D), 0.5), B = Cx.scale(Cx.sub(S, D), 0.5);
      const ph = (qq, x) => Cx.exp(Cx.mul(Cx.c(0, -k0 * x), qq));
      function profil(x) {
        fini(x, "x");
        if (x < 0) return Cx.add(ph(q[0], x), Cx.mul(r, ph(Cx.neg(q[0]), x)));
        if (x <= d) return Cx.add(Cx.mul(A, ph(q[1], x)), Cx.mul(B, ph(Cx.neg(q[1]), x)));
        return Cx.mul(t, ph(q[2], x - d));
      }
      return { r, t, R, T, q, k0, kappa: -q[1].im, profil, pol };
    }

    Object.assign(api, { qx, fresnelInterface, champsAuBord, reflectanceMetal, indiceLorentz, reflexionTotale, lame });
  }

  /* ---------- Étape « Plasmas : propagation et confinement » (programme de CPGE, X.plasmas) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, MU0 = Cst.mu0, QE = Cst.e, ME = Cst.m_e, KB = Cst.k_B, UMA = Cst.u, HBAR = Cst.hbar;

    /* ---- X.plasmas.1: the model ----
       Free electrons (charge −e, mass mₑ) on a background of ions taken as fixed (mₑ/m_ion ≤ 5,4 × 10⁻⁴), classical
       (Maxwell–Boltzmann, not degenerate), weakly coupled. ωp² = n e²/(ε0 mₑ), λD = √(ε0 kT/(n e²)) (electrons only),
       ND = (4π/3) n λD³, ln Λ = ln(12π n λD³), ν = √2 n e⁴ ln Λ/(12 π^{3/2} ε0² √mₑ (kT)^{3/2}) (electron–ion
       collisions of a singly charged plasma, Spitzer–Braginskii: NRL Plasma Formulary, 2,91 × 10⁻¹² n ln Λ T_eV^{−3/2}). */
    function plasmaFroid(o) {
      const n = positif(o.n, "n"), T = positif(o.T, "T"), L = o.L == null ? null : positif(o.L, "L");
      const kT = KB * T, wp = pulsationPlasmaElectrons(n), lambdaD = Math.sqrt(EPS0 * kT / (n * QE * QE));
      const ND = 4 * Math.PI / 3 * n * lambdaD ** 3, lnLambda = Math.log(12 * Math.PI * n * lambdaD ** 3);
      const nu = Math.SQRT2 * n * QE ** 4 * Math.max(lnLambda, 1) / (12 * Math.PI ** 1.5 * EPS0 * EPS0 * Math.sqrt(ME) * kT ** 1.5);
      const eF = HBAR * HBAR * (3 * Math.PI * Math.PI * n) ** (2 / 3) / (2 * ME), a = n ** (-1 / 3);
      const couplage = QE * QE / (4 * Math.PI * EPS0 * a * kT);
      const criteres = { taille: L == null ? null : lambdaD / L, nombre: ND, collisions: nu / wp, degenerescence: eF / kT };
      const verdict = { quasiNeutre: L == null ? null : lambdaD < L / 10, collectif: ND > 10, peuCollisionnel: nu < wp, classique: eF < kT / 10 };
      return { n, T, L, wp, fp: wp / (2 * Math.PI), lambdaD, ND, lnLambda, nu, vth: Math.sqrt(kT / ME), eF, a, couplage, criteres, verdict,
        plasma: verdict.collectif && verdict.peuCollisionnel && verdict.classique && verdict.quasiNeutre !== false };
    }
    /* Typical media (n electrons per m³, T in K, L a size in m). Sources in the step's report: ionosphere F2 peak,
       ~10¹² m⁻³ by day (foF2 ≈ 9 MHz), T ~ 10³ K ; solar wind at 1 au, 3 × 10⁶ m⁻³ and 10⁵ K ; ITER reference scenario,
       ⟨ne⟩ = 1,01 × 10²⁰ m⁻³, ⟨Te⟩ = 8,8 keV, minor radius 2 m ; solar centre, 151 g·cm⁻³ and μe = 1,69 (n = ρ/(μe u)),
       1,56 × 10⁷ K ; conduction electrons of copper at 293 K (METAUX_LIBRES), degenerate: the counter-example. */
    const KEV = 1e3 * QE / KB;   // K per keV
    const PLASMAS = Object.freeze({
      ionosphere: { n: 1e12, T: 1e3, L: 1e5 }, ventSolaire: { n: 3e6, T: 1e5, L: Cst.au },
      iter: { n: 1.01e20, T: 8.8 * KEV, L: 2 }, coeurSoleil: { n: 151e3 / (1.69 * UMA), T: 1.56e7, L: 7e7 },
      cuivre: { n: 8.47e28, T: 293.15, L: 1e-3 } });
    /* σ = n e²/(mₑ(ν + iω)) for E ∝ e^{iωt}: the electrons' velocity under −e E with a drag mₑ ν v. Exact for this model;
       ν = 0: −i n e²/(mₑ ω), pure imaginary, j in quadrature with E, no mean power. */
    function conductivitePlasma(w, n, nu = 0) {
      positif(w, "ω"); positif(n, "n"); positif0(nu, "ν");
      return Cx.div(Cx.c(n * QE * QE / ME), Cx.c(nu, w));
    }
    /* mean power per m³ given to the electrons by E0 cos ωt: ½ Re σ E0² (W·m⁻³) */
    const puissanceCedee = (w, n, nu, E0) => 0.5 * conductivitePlasma(w, n, nu).re * fini(E0, "E0") ** 2;

    /* ---- X.plasmas.2: propagation ----
       Transverse plane wave e^{i(ωt − kz)} in a uniform cold plasma, ions fixed, no static B, linear (eE/(mₑω) ≪ c, the
       electron's quiver speed ≪ c): k² = (ω² − ωp²)/c² + collisions, n² = 1 − ωp²/(ω(ω − iν)) (k = ω n/c). */
    function ondePlasma(w, wp, nu = 0) {
      positif(w, "ω"); positif(wp, "ωp"); positif0(nu, "ν");
      const n2 = Cx.sub(Cx.c(1), Cx.div(Cx.c(wp * wp), Cx.c(w * w, -w * nu))), r = nDepuisN2(n2);
      const n = Cx.c(r.re, r.im), nR = r.nR, nI = r.nI, k = Cx.c(w * nR / C, -w * nI / C);
      const out = { w, wp, nu, n2, n, nR, nI, k };
      if (nu === 0) {
        if (w > wp) Object.assign(out, { regime: "transparent", vphi: C / nR, vg: C * nR, lambda: 2 * Math.PI * C / (w * nR), profondeur: Infinity });
        else if (w < wp) Object.assign(out, { regime: "reactif", vphi: null, vg: 0, lambda: Infinity, profondeur: C / Math.sqrt(wp * wp - w * w) });
        else Object.assign(out, { regime: "coupure", vphi: Infinity, vg: 0, lambda: Infinity, profondeur: Infinity });
      } else Object.assign(out, { regime: w > wp ? "transparent" : "reactif", profondeur: nI > 0 ? C / (w * nI) : Infinity, lambda: nR > 0 ? 2 * Math.PI * C / (w * nR) : Infinity });
      return out;
    }
    /* Vacuum (z < 0) onto a plasma half-space (z > 0), normal incidence, E0 = 1: r = (1 − n)/(1 + n), t = 2/(1 + n)
       (continuity of E and B at z = 0, μ = μ0), the s amplitudes of fresnelInterface (étape « Coefficients de réflexion
       et réflexion totale »). champ(z, t) = Re E. R = |r|². The mean Poynting vector in the plasma, ½ ε0 c Re(n) |t|², in
       units of the incident ½ ε0 c. At the cutoff itself (ν = 0, ω = ωp, n = 0) r = 1 and t = 2. */
    function interfacePlasma(w, wp, nu = 0) {
      const o = ondePlasma(w, wp, nu), f = o.n.re === 0 && o.n.im === 0 ? { r: Cx.c(1), t: Cx.c(2) } : api.fresnelInterface(1, o.n, 0).s;
      const r = f.r, t = f.t, k0 = w / C;
      const champ = (z, tt) => {
        fini(z, "z"); fini(tt, "t");
        if (z < 0) { const a = Cx.exp(Cx.c(0, w * tt - k0 * z)), b = Cx.mul(r, Cx.exp(Cx.c(0, w * tt + k0 * z))); return a.re + b.re; }
        return Cx.mul(t, Cx.exp(Cx.mul(Cx.c(0, -1), Cx.c(o.k.re * z - w * tt, o.k.im * z)))).re;
      };
      const enveloppe = z => z < 0 ? null : Cx.abs(t) * Math.exp(o.k.im * positif0(z, "z"));
      return { onde: o, r, t, R: Cx.abs(r) ** 2, transmis: o.nR * Cx.abs(t) ** 2, champ, enveloppe };
    }
    /* Chapman layer: n(z) = nmax exp(½(1 − u − e^{−u})), u = (z − hm)/H. A model of one ionised layer (one gas, constant
       scale height H, sun overhead, production balanced by recombination). */
    function coucheChapman(o) {
      const nmax = positif(o.nmax, "nmax"), hm = positif(o.hm, "hm"), H = positif(o.H, "H");
      const n = z => { const u = (fini(z, "z") - hm) / H; return u < -40 ? 0 : nmax * Math.exp(0.5 * (1 - u - Math.exp(-u))); };
      return { n, nmax, hm, H, fo: pulsationPlasmaElectrons(nmax) / (2 * Math.PI) };
    }
    /* Vertical sounding at f of a profile n(z) (z ≥ z0, no static B, no collisions): the wave turns back at zr where the
       local plasma frequency reaches f, X(zr) = 1 with X = fp²/f² ; a pulse travels at vg = c √(1 − X), hence the virtual
       height h′ = z0 + ∫ dz/√(1 − X) and the echo delay 2h′/c. z = zr − s² removes the 1/√ singularity at zr. */
    const fpDeN = n => pulsationPlasmaElectrons(Math.max(n, 1e-300)) / (2 * Math.PI);
    function hauteurVirtuelle(nDeZ, f, o = {}) {
      positif(f, "f"); const z0 = positif0(o.z0 == null ? 0 : o.z0, "z0"), zmax = positif(o.zmax == null ? 1e6 : o.zmax, "zmax");
      const N = o.points == null ? 4000 : o.points, X = z => { const n = nDeZ(z); return n > 0 ? (fpDeN(n) / f) ** 2 : 0; };
      if (X(z0) >= 1) err("le sondeur est déjà dans une région où fp ≥ f");
      const dz = (zmax - z0) / 20000; let z = z0;
      while (z < zmax && X(z + dz) < 1) z += dz;
      if (z >= zmax) return { traverse: true, zr: null, hv: Infinity, retard: Infinity };
      let a = z, b = z + dz; for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (X(m) < 1) a = m; else b = m; }
      const zr = a, S = Math.sqrt(zr - z0); let I = 0;
      for (let i = 0; i < N; i++) { const s = (i + 0.5) * S / N, g = 1 - X(zr - s * s); I += 2 * s / Math.sqrt(Math.max(g, 1e-300)); }
      const hv = z0 + I * S / N;
      return { traverse: false, zr, hv, retard: 2 * hv / C };
    }
    /* the ionogram h′(f) of a profile for a list of frequencies */
    const ionogramme = (nDeZ, fs, o) => fs.map(f => Object.assign({ f }, hauteurVirtuelle(nDeZ, f, o)));
    /* Oblique path over a flat Earth, mirror at the virtual height hv, ground range D: the wave of frequency f meets the layer
       at incidence φ, tan φ = D/(2hv), and is reflected where fp = f cos φ (secant law) ; the maximum usable frequency is
       fo/cos φ = fo √(1 + (D/(2hv))²). Flat Earth: the curvature sags by D²/(8 R_T), 20 km at D = 1 000 km. */
    function frequenceMaxUtilisable(fo, hv, D) {
      positif(fo, "fo"); positif(hv, "hv"); positif0(D, "D");
      const cosPhi = hv / Math.hypot(hv, D / 2);
      return { muf: fo / cosPhi, phi: Math.acos(cosPhi), secante: 1 / cosPhi };
    }
    /* Group delay of a radio signal of frequency f ≫ fp through a column of TEC electrons per m²: Δ = K TEC/f² with
       K = e²/(8π² ε0 mₑ) ≈ 40,3 m³·s⁻² (n ≈ 1 − X/2, vg ≈ c(1 − X/2), to first order in X ; the phase advances by as much).
       The ionosphere-free combination of two pseudo-ranges cancels this first-order term. */
    const K_IONO = QE * QE / (8 * Math.PI * Math.PI * EPS0 * ME);
    const retardIono = (TEC, f) => K_IONO * positif0(TEC, "TEC") / positif(f, "f") ** 2;
    function combinaisonSansIono(P1, P2, f1, f2) {
      fini(P1, "P1"); fini(P2, "P2"); positif(f1, "f1"); positif(f2, "f2"); if (f1 === f2) err("deux fréquences distinctes");
      return (f1 * f1 * P1 - f2 * f2 * P2) / (f1 * f1 - f2 * f2);
    }

    /* ---- X.plasmas.3: magnetic confinement and fusion ----
       Thermal gyration of a particle (charge q, mass m) at temperature T in B: v⊥ = √(2kT/m) (rms speed in the plane ⊥ B,
       two degrees of freedom), r = m v⊥/(|q| B), ωc = |q| B/m. Newton (kT ≪ mc²: 2 × 10⁻² for 10 keV electrons). */
    function giration(T, B, m = ME, q = -QE) {
      positif(T, "T"); positif(B, "B"); positif(m, "m"); fini(q, "q"); if (q === 0) err("q non nulle");
      const v = Math.sqrt(2 * KB * T / m), wc = Math.abs(q) * B / m;
      return { v, wc, fc: wc / (2 * Math.PI), periode: 2 * Math.PI / wc, rayon: v / wc };
    }
    /* β = n k (Te + Ti)/(B²/(2μ0)): kinetic pressure of electrons and ions (n each) over magnetic pressure */
    function betaPlasma(n, Te, Ti, B) {
      positif(n, "n"); positif(Te, "Te"); positif0(Ti, "Ti"); positif(B, "B");
      const p = n * KB * (Te + Ti), pB = B * B / (2 * MU0);
      return { p, pB, beta: p / pB };
    }
    /* Simple magnetic mirror on the axis z: Bz = B0 (1 + (R − 1) z²/L²), Br = −(r/2) dBz/dz (paraxial, ∇·B = 0 exactly ;
       ∇ ∧ B ≠ 0 at order r/L: the coils' currents are not drawn). Mirror ratio R = B(±L)/B0. */
    function champMiroir(B0, R, L) {
      positif(B0, "B0"); positif(L, "L"); fini(R, "R"); if (!(R >= 1)) err("R ≥ 1");
      const Bz = z => B0 * (1 + (R - 1) * z * z / (L * L)), dBz = z => 2 * B0 * (R - 1) * z / (L * L);
      return { B0, R, L, Bz, champ: p => { const g = dBz(p[2]); return [-p[0] * g / 2, -p[1] * g / 2, Bz(p[2])]; } };
    }
    /* Boris pusher, E = 0: kinetic energy conserved to rounding ; the phase of the gyration lags by ~(ωc dt)²/12 per step.
       o = { q, m, champ(p) → [Bx, By, Bz], x0, v0, dt, n, arret(p) → true to stop }. */
    function boris(o) {
      const q = fini(o.q, "q"), m = positif(o.m, "m"), dt = positif(o.dt, "dt"), N = o.n;
      if (!Number.isInteger(N) || N < 1) err("n entier ≥ 1");
      let x = o.x0.slice(), v = o.v0.slice(); const pts = [{ t: 0, x: x.slice(), v: v.slice() }], k = q * dt / (2 * m);
      for (let i = 1; i <= N; i++) {
        const B = o.champ(x), tt = [k * B[0], k * B[1], k * B[2]], t2 = tt[0] ** 2 + tt[1] ** 2 + tt[2] ** 2, s = tt.map(c => 2 * c / (1 + t2));
        const vp = [v[0] + v[1] * tt[2] - v[2] * tt[1], v[1] + v[2] * tt[0] - v[0] * tt[2], v[2] + v[0] * tt[1] - v[1] * tt[0]];
        v = [v[0] + vp[1] * s[2] - vp[2] * s[1], v[1] + vp[2] * s[0] - vp[0] * s[2], v[2] + vp[0] * s[1] - vp[1] * s[0]];
        x = [x[0] + v[0] * dt, x[1] + v[1] * dt, x[2] + v[2] * dt];
        pts.push({ t: i * dt, x: x.slice(), v: v.slice() });
        if (o.arret && o.arret(x)) break;
      }
      return pts;
    }
    /* Loss cone: with μ = m v⊥²/(2B) and the energy conserved, a particle of pitch angle α at the centre turns back where
       B = B0/sin²α ; it is trapped when sin²α > 1/R. Adiabatic: rL ≪ L (and ωc ≫ v/L). */
    function coneDePerte(R) { fini(R, "R"); if (!(R >= 1)) err("R ≥ 1"); return Math.asin(Math.sqrt(1 / R)); }
    /* A particle of kinetic energy Ec (J) launched from the axis at the centre with pitch angle alpha (rad), its orbit
       centred on the axis: { piege, zmax, zPredit (turning point from μ), retour, mu: { min, max, ecart }, pts }. */
    function miroir(o) {
      const M = champMiroir(o.B0, o.R, o.L), m = positif(o.m, "m"), q = fini(o.q, "q"), Ec = positif(o.Ec, "Ec"), alpha = fini(o.alpha, "α");
      if (!(alpha > 0 && alpha < Math.PI / 2 + 1e-12)) err("α entre 0 et π/2");
      const v = Math.sqrt(2 * Ec / m), vperp = v * Math.sin(alpha), vpar = v * Math.cos(alpha), wc = Math.abs(q) * M.B0 / m, rL = vperp / wc;
      const parTour = o.parTour == null ? 60 : o.parTour, dt = 2 * Math.PI / wc / parTour;
      const nMax = o.n == null ? Math.ceil((o.duree == null ? 8 * M.L / Math.max(vpar, v * 0.05) : o.duree) / dt) : o.n;
      const pts = boris({ q, m, dt, n: nMax, champ: M.champ, x0: [rL, 0, 0], v0: [0, -Math.sign(q) * vperp, vpar], arret: p => Math.abs(p[2]) > M.L });
      const muDe = p => { const B = M.champ(p.x), b = Math.hypot(...B), vb = (p.v[0] * B[0] + p.v[1] * B[1] + p.v[2] * B[2]) / b;
        return m * (v * v - vb * vb) / (2 * b); };
      const mus = pts.map(muDe), mu0 = mus[0];
      const zmax = Math.max(...pts.map(p => p.x[2])), last = pts[pts.length - 1];
      const s2 = Math.sin(alpha) ** 2, zPredit = s2 * o.R > 1 ? M.L * Math.sqrt((1 / s2 - 1) / (o.R - 1)) : null;
      return { piege: Math.abs(last.x[2]) <= M.L, zmax, zPredit, rL, wc, dt, cone: coneDePerte(o.R),
        retour: pts.some((p, i) => i > 0 && p.v[2] < 0 && pts[i - 1].v[2] >= 0),
        mu: { min: Math.min(...mus) / mu0, max: Math.max(...mus) / mu0, ecart: (Math.max(...mus) - Math.min(...mus)) / mu0 }, pts, champ: M };
    }
    /* D + T → ⁴He (3,5 MeV) + n (14,1 MeV), 17,6 MeV in all. Maxwellian reactivity ⟨σv⟩ (m³·s⁻¹) of Bosch and Hale,
       Nuclear Fusion 32 (1992) 611, for Ti from 0,2 to 100 keV (their fit: error < 0,25 % against R-matrix data). */
    const E_ALPHA = 3.5e3, E_FUSION = 17.6e3;   // keV
    const BH_DT = { BG: 34.3827, mrc2: 1124656, C: [1.17302e-9, 1.51361e-2, 7.51886e-2, 4.60643e-3, 1.35000e-2, -1.06750e-4, 1.36600e-5] };
    function reactiviteDT(T) {
      fini(T, "T (keV)"); if (T < 0.2 || T > 100) err("Bosch–Hale : T entre 0,2 et 100 keV");
      const [c1, c2, c3, c4, c5, c6, c7] = BH_DT.C;
      const theta = T / (1 - T * (c2 + T * (c4 + T * c6)) / (1 + T * (c3 + T * (c5 + T * c7))));
      const xi = (BH_DT.BG * BH_DT.BG / (4 * theta)) ** (1 / 3);
      return 1e-6 * c1 * theta * Math.sqrt(xi / (BH_DT.mrc2 * T ** 3)) * Math.exp(-3 * xi);
    }
    /* Ignition, 0-D: equal D and T, n/2 each, n electrons, Te = Ti = T (keV), energy 3nkT lost in τE, the α particles stay:
       n²/4 ⟨σv⟩ Eα ≥ 3 n kT/τE ⇒ n τE ≥ 12 kT/(⟨σv⟩ Eα). Bremsstrahlung, impurities, helium ash and profiles are left out. */
    function lawson(T) {
      const sv = reactiviteDT(T), nTau = 12 * T / (sv * E_ALPHA);
      return { T, sv, nTau, triple: nTau * T };
    }
    function minimumLawson() {
      let a = Math.log(2), b = Math.log(80); const f = u => lawson(Math.exp(u)).triple, g = (Math.sqrt(5) - 1) / 2;
      for (let i = 0; i < 120; i++) { const u1 = b - g * (b - a), u2 = a + g * (b - a); if (f(u1) < f(u2)) b = u2; else a = u1; }
      return lawson(Math.exp((a + b) / 2));
    }
    /* Power balance per m³ of the same 0-D plasma at n, T (keV), τE (s): α heating, fusion power, losses, the external
       heating that holds it steady (Pext = Ppertes − Pα, zero at ignition) and Q = Pfusion/Pext. */
    function bilanFusion(o) {
      const n = positif(o.n, "n"), T = positif(o.T, "T"), tau = positif(o.tauE, "τE"), sv = reactiviteDT(T), keV = 1e3 * QE;
      const Palpha = n * n / 4 * sv * E_ALPHA * keV, Pfusion = Palpha * E_FUSION / E_ALPHA, Ppertes = 3 * n * T * keV / tau;
      const Pext = Math.max(0, Ppertes - Palpha);
      return { sv, Palpha, Pfusion, Ppertes, Pext, Q: Pext > 0 ? Pfusion / Pext : Infinity, allumage: Palpha >= Ppertes, triple: n * T * tau, seuil: lawson(T).triple };
    }

    Object.assign(api, { pulsationPlasmaElectrons, plasmaFroid, PLASMAS, KEV, conductivitePlasma, puissanceCedee, ondePlasma,
      interfacePlasma, coucheChapman, hauteurVirtuelle, ionogramme, frequenceMaxUtilisable, K_IONO, retardIono,
      combinaisonSansIono, giration, betaPlasma, champMiroir, boris, coneDePerte, miroir, E_ALPHA, E_FUSION, BH_DT,
      reactiviteDT, lawson, minimumLawson, bilanFusion });
  }

  /* ---------- Étape « Masse électromagnétique » (II.28.1 à 28.3) ---------- */
  {
    const C = Cst.c, C2 = C * C, EPS0 = Cst.eps0, KC = 1 / (4 * Math.PI * EPS0);
    const nonNul = (x, nom) => { fini(x, nom); if (x === 0) err(nom + " ne doit pas être nul"); return x; };
    const FORMES = { coquille: 1 / 2, boule: 3 / 5 };
    const lireForme = f => { f = f == null ? "coquille" : f; if (!Object.prototype.hasOwnProperty.call(FORMES, f)) err("forme : « coquille » ou « boule »"); return f; };
    const vitesse = v => { fini(v, "v"); if (!(Math.abs(v) < C)) err("|v| doit rester inférieure à c"); return v; };

    /* §28-1. A charge q spread over a sphere of radius a (« coquille », Feynman's model) or through it (« boule »), at
       rest in vacuum. U0 = f q²/(4πε0 a), f = 1/2 (28.1) or 3/5: all of it field energy ε0E²/2 (energieRepartie, étape
       « Exemples de flux d'énergie »). At low speed the field momentum is (4/3)(U0/c²) v for any spherical distribution
       (B = v ∧ E/c², and sin²θ averages 2/3): mElec = (4/3) U0/c², 2/3 or 4/5 of kq²/(ac²) (28.4) ; mPrime = U0/c² (28.8).
       fraction(r) = share of U0 inside the sphere of radius r: 1 − a/r outside a shell. rayon(f) the radius that holds
       the share f (bisection). Classical electrostatics: the charge a continuum, its granularity neglected against a. */
    function chargeEtendue(o) {
      const q = nonNul(o.q, "q"), a = positif(o.a, "a"), forme = lireForme(o.forme);
      const R = api.energieRepartie({ Q: q, R: a, forme }), U0 = R.total;
      const fraction = r => R.champ(positif0(r, "r")) / U0;
      function rayon(f) {
        fini(f, "f"); if (!(f >= 0 && f < 1)) err("la part f doit être dans [0, 1[");
        if (f === 0) return 0;
        if (f <= fraction(a)) { let lo = 0, hi = a; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (fraction(m) < f) lo = m; else hi = m; } return (lo + hi) / 2; }
        let lo = a, hi = 2 * a; while (fraction(hi) < f) { lo = hi; hi *= 2; }
        for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (fraction(m) < f) lo = m; else hi = m; }
        return (lo + hi) / 2;
      }
      return { forme, facteur: FORMES[forme], U0, mPrime: U0 / C2, mElec: 4 / 3 * U0 / C2, rapport: 4 / 3, fraction, rayon };
    }

    /* §28-3. The classical electron: r0 = e²/(4πε0 m_e c²) (28.6), the reduced Compton wavelength ħ/(m_e c) and their
       ratio α. aMasse: the radius for which mElec = m_e, (28.5) for the shell (2/3 r0), 4/5 r0 for the ball ;
       aEnergie: the radius for which U0 = m_e c², r0/2 and 3/5 r0. All from CODATA (constantes.js). */
    function electronClassique() {
      const r0 = KC * Cst.e * Cst.e / (Cst.m_e * C2), lambdaC = Cst.hbar / (Cst.m_e * C);
      return { r0, lambdaC, alpha: r0 / lambdaC, mc2: Cst.m_e * C2,
        aMasse: { coquille: 2 / 3 * r0, boule: 4 / 5 * r0 }, aEnergie: { coquille: r0 / 2, boule: 3 / 5 * r0 } };
    }

    /* §28-2, §28-3. The same sphere in uniform motion at v along x, centre at the origin at t = 0. Outside the contracted
       sphere (γ²x² + y² + z² ≥ a²) the field is that of the point charge, champUniforme (Heaviside's field, étape « Dipôle
       oscillant et charge mobile »). Inside: zero for the shell ; for the ball, the rest-frame field kq r′/a³ at
       r′ = (γx, y, z), with E∥ = E′∥, E⊥ = γE′⊥, so E = γ kq r/a³. B = v ∧ E/c² everywhere, g = ε0 E ∧ B (27.21), w the
       energy density ε0(E² + c²B²)/2. Exact for a rigid Lorentz-contracted distribution in uniform motion. */
    function sphereMobile(o) {
      const q = nonNul(o.q, "q"), a = positif(o.a, "a"), v = vitesse(o.v == null ? 0 : o.v), forme = lireForme(o.forme);
      const beta = v / C, gamma = 1 / Math.sqrt(1 - beta * beta), CU = api.champUniforme;
      const E = p => { v3(p, "p");
        if (gamma * gamma * p[0] * p[0] + p[1] * p[1] + p[2] * p[2] >= a * a) return CU(q, [0, 0, 0], [v, 0, 0], p, 0);
        if (forme === "coquille") return [0, 0, 0];
        const k = gamma * KC * q / a ** 3; return [k * p[0], k * p[1], k * p[2]]; };
      const B = p => { const e = E(p); return [0, -v * e[2] / C2, v * e[1] / C2]; };
      const g = p => { const e = E(p), b = [0, -v * e[2] / C2, v * e[1] / C2];
        return [EPS0 * (e[1] * b[2] - e[2] * b[1]), EPS0 * (e[2] * b[0] - e[0] * b[2]), EPS0 * (e[0] * b[1] - e[1] * b[0])]; };
      const w = p => { const e = E(p), e2 = e[0] * e[0] + e[1] * e[1] + e[2] * e[2]; return EPS0 / 2 * (e2 + beta * beta * (e[1] * e[1] + e[2] * e[2])); };
      return { q, a, v, forme, beta, gamma, E, B, g, w };
    }

    /* §28-2, §28-3. Field momentum and field energy of sphereMobile, integrated over all space by the midpoint rule:
       x = s cosθ/γ, ρ = s sinθ (dV = 2π s² sinθ ds dθ/γ ; s ≥ a is the outside of the contracted sphere, mapped by
       u = a/s on ]0, 1]), n points in θ and in u (and in s inside a ball). Against the closed forms: p = γ mElec v (28.7),
       (28.3) at low speed, and U = γ U0 (1 + β²/3) (28.7b), not the γ U0 a mass m = U0/c² would have: the 4/3 problem.
       { p, U, pFormule, UFormule, mElec, U0, gamma, beta, interieur: share of p inside the sphere } */
    function impulsionChamp(o) {
      const s = sphereMobile(o), n = entier(o.n == null ? 200 : o.n, "n", 4), { a, gamma, beta } = s;
      const ch = chargeEtendue({ q: s.q, a, forme: s.forme });
      let p = 0, U = 0, pIn = 0;
      const ajoute = (sv, poids, dedans) => {
        for (let j = 0; j < n; j++) {
          const th = Math.PI * (j + 0.5) / n, st = Math.sin(th), pt = [sv * Math.cos(th) / gamma, sv * st, 0];
          const dV = 2 * Math.PI * poids * st * (Math.PI / n) / gamma;
          const dp = s.g(pt)[0] * dV; p += dp; U += s.w(pt) * dV; if (dedans) pIn += dp;
        }
      };
      for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, sv = a / u; ajoute(sv, a ** 3 / u ** 4 / n, false); }
      if (s.forme === "boule") for (let i = 0; i < n; i++) { const sv = a * (i + 0.5) / n; ajoute(sv, sv * sv * a / n, true); }
      return { p, U, pFormule: gamma * ch.mElec * s.v, UFormule: gamma * ch.U0 * (1 + beta * beta / 3), mElec: ch.mElec, U0: ch.U0,
        gamma, beta, interieur: p === 0 ? 0 : pIn / p };
    }

    /* §28-3. Transverse mass over the rest mass, for β = v/c: « lorentz » (deformable electron, and relativity) γ ;
       « abraham » (rigid sphere, surface charge, 1902) (3/(4β²)) [((1 + β²)/(2β)) ln((1 + β)/(1 − β)) − 1], its series
       written with ln((1 + β)/(1 − β)) = 2 artanh β ; its series 1 + 2β²/5 + 9β⁴/35 + 4β⁶/21 below β = 10⁻² (the
       closed form loses its digits there). */
    function masseTransverse(beta, modele) {
      fini(beta, "β"); if (!(beta >= 0 && beta < 1)) err("β doit être dans [0, 1[");
      if (modele === "lorentz") return 1 / Math.sqrt(1 - beta * beta);
      if (modele !== "abraham") err("modèle : « lorentz » ou « abraham »");
      const b2 = beta * beta;
      if (beta < 1e-2) return 1 + b2 * (2 / 5 + b2 * (9 / 35 + b2 * 4 / 21));
      return 3 / (4 * b2) * ((1 + b2) * Math.atanh(beta) / beta - 1);
    }

    Object.assign(api, { chargeEtendue, electronClassique, sphereMobile, impulsionChamp, masseTransverse });
  }

  /* ---------- Étape « Quadrivecteurs de l'électrodynamique » (Feynman II.25.1 à 25.3) ---------- */
  {
    const C = Cst.c;
    const vit = (beta, nom) => { const b = typeof beta === "number" ? [beta, 0, 0] : beta;
      if (!Array.isArray(b) || b.length !== 3) err(nom + " doit être un nombre (selon x) ou un vecteur à 3 composantes");
      b.forEach((x, i) => fini(x, nom + "[" + i + "]"));
      const b2 = b[0] * b[0] + b[1] * b[1] + b[2] * b[2]; if (!(b2 < 1)) err("|" + nom + "| doit être < 1 (vitesse en unités de c)");
      return { b, g: 1 / Math.sqrt(1 - b2) }; };
    /* j_μ = ρ0 c u_μ: a cloud of charge, density ρ0 (C·m⁻³) in its own frame, all of it moving at βc. ρ = γρ0 (the volume
       shrinks by γ along the motion, the charge does not change), j = ρ v. Exact for one velocity per point; a wire with
       ions at rest and moving electrons is the sum of two such terms. */
    function quadriCourant(rho0, beta) {
      fini(rho0, "rho0"); const { b, g } = vit(beta, "beta"), cr = C * g * rho0;
      return [cr, cr * b[0], cr * b[1], cr * b[2]];
    }
    /* the charge density measured by an observer moving at βc: the time component of J in its frame, over c. Written
       as a scalar product, (U·J)/c² with U = γ(c, βc): the same number whatever frame J and U are given in. Exact. */
    function densiteMesuree(J, beta) {
      if (!Array.isArray(J) || J.length !== 4) err("J doit être un quadrivecteur [cρ, jx, jy, jz]");
      J.forEach((x, i) => fini(x, "J[" + i + "]"));
      const { b, g } = vit(beta, "beta");
      return g * (J[0] - b[0] * J[1] - b[1] * J[2] - b[2] * J[3]) / C;
    }
    Object.assign(api, { quadriCourant, densiteMesuree });
  }

  /* ---------- Étape « Limites de la théorie de Maxwell » (II.28.4 à 28.6) ---------- */
  {
    const C = Cst.c, EPS0 = Cst.eps0, K = 1 / (4 * Math.PI * EPS0), HBAR = Cst.hbar;
    const sensDe = s => { if (s == null || s === "retarde") return -1; if (s === "avance") return 1; return err("sens : « retarde » ou « avance »"); };

    /* §28-4. x = A sin ωt along x, and its derivatives up to the fourth (v, a, j = da/dt, s = dj/dt). The motion has
       lasted forever: the steady state, with no switching on. Speed βc = Aω must stay below c. */
    function mouvementSinusoidal(A, w) {
      positif(A, "A"); positif(w, "ω");
      if (A * w >= C) err("mouvementSinusoidal : A ω doit rester inférieur à c");
      return { A, w, beta: A * w / C,
        x: t => A * Math.sin(w * t), v: t => A * w * Math.cos(w * t), a: t => -A * w * w * Math.sin(w * t),
        j: t => -A * w ** 3 * Math.cos(w * t), s: t => A * w ** 4 * Math.sin(w * t) };
    }

    /* §28-4. The self-force of a « dumbbell » electron: two point charges q/2 at y = ±d/2, rigid, moving together along x
       (perpendicular to the rod), x(t) given by mvt = { x, v, a } (any motion slower than c). Each half acts on the other
       through its exact Liénard–Wiechert field, retarded (the field leaves the source at t − τ) or advanced (at t + τ),
       τ found by bisection: c τ = |P(t) − source(t ∓ τ)|. Only E counts along x (v ∧ B has no x component when v is
       along x), and the two halves feel the same x force by the mirror y → −y. The force of each half on itself is left
       out: it is infinite for a point. Exact within classical electrodynamics for this rigid model (rigidity itself is
       not relativistic; it only matters at order β²). o = { q, d, mvt, t, sens = "retarde" | "avance" }.
       { F: total x self-force (N), Ex: field of one half at the other, tau: delay (s) } */
    function forcePropreHaltere(o) {
      if (!o || !o.mvt) err("forcePropreHaltere : { q, d, mvt, t, sens } attendu");
      const q = fini(o.q, "q"), d = positif(o.d, "d"), m = o.mvt, t = fini(o.t, "t"), sg = sensDe(o.sens);
      const xt = m.x(t), f = s => C * s - Math.hypot(xt - m.x(t + sg * s), d);
      let lo = d / C, hi = 2 * d / C, n = 0;
      while (f(hi) <= 0) { lo = hi; hi *= 2; if (++n > 200) err("forcePropreHaltere : pas de temps de propagation (v ≥ c ?)"); }
      for (let i = 0; i < 200 && hi - lo > 4e-16 * hi; i++) { const mid = 0.5 * (lo + hi); if (f(mid) > 0) hi = mid; else lo = mid; }
      const tau = 0.5 * (lo + hi), ts = t + sg * tau;
      const Rx = xt - m.x(ts), R = Math.hypot(Rx, d), nx = Rx / R, ny = d / R;
      const b = m.v(ts) / C, bd = m.a(ts) / C;
      /* retarded: (n − β), κ = 1 − n·β ; advanced: c → −c, so (n + β), κ = 1 + n·β, and the acceleration term keeps its sign */
      const ux = nx + sg * b, uy = ny, kap = 1 + sg * nx * b, k3 = kap * kap * kap;
      /* n ∧ (u ∧ β̇) with β̇ along x: x component −n_y u_y β̇ */
      const Ex = K * (q / 2) * (ux * (1 - b * b) / (k3 * R * R) - ny * uy * bd / (C * k3 * R));
      return { F: 2 * (q / 2) * Ex, Ex, tau };
    }

    /* §28-4. The same force expanded in powers of τ = d/c, to first order in the motion (the dumbbell's (28.9)):
       F_self = K q² [−ẍ/(4c²d) ± x⃛/(3c³) − 3d x⁗/(16c⁴) + …], + retarded, − advanced; the next terms go as d², d³…
       The applied force is −F_self. masse = K q²/(4 d c²) = U/c², U = K (q/2)²/d the energy of the two halves.
       The x⃛ coefficient is half of the 2/3 of a whole charge: the halves' own self-forces, left out, carry the rest.
       mvt needs { a, j, s }. Valid for ωd/c ≪ 1 (the series converges for ωd/c < 1 or so) and β ≪ 1. */
    function serieForcePropre(o) {
      if (!o || !o.mvt) err("serieForcePropre : { q, d, mvt, t, sens } attendu");
      const q = fini(o.q, "q"), d = positif(o.d, "d"), m = o.mvt, t = fini(o.t, "t"), sg = sensDe(o.sens);
      const k = K * q * q, masse = k / (4 * d * C * C);
      const termeMasse = -masse * m.a(t), termeReaction = -sg * k * m.j(t) / (3 * C ** 3), termeSuivant = -3 * k * d * m.s(t) / (16 * C ** 4);
      return { masse, termeMasse, termeReaction, termeSuivant, total: termeMasse + termeReaction + termeSuivant };
    }
    function masseHaltere(q, d) { fini(q, "q"); positif(d, "d"); return K * q * q / (4 * d * C * C); }

    /* Radiated power of two parallel dipoles side by side (separation d perpendicular to their axis), oscillating in
       phase: P = P1 + P2 + 2√(P1P2) G(kd), G(u) = (3/2)(sin u/u + cos u/u² − sin u/u³), G → 1 as u → 0. Exact for point
       dipoles, d any, far-field power. */
    function facteurMutuel(u) {
      positif(u, "kd");
      if (u < 1e-3) return 1 - u * u / 5;
      return 1.5 * (Math.sin(u) / u + Math.cos(u) / (u * u) - Math.sin(u) / (u * u * u));
    }

    /* §28-5. One period of the sinusoidal motion, sampled at n instants: the exact self-force, the work done per period
       by whoever drives the dumbbell against it (∮ −F_self v dt), and the two parts of −F_self = m_eff ẍ + b ẋ found
       by projection (Fourier): mEff, the inertia ; b, the drag. The reference: the energy per period of the cross term
       of the radiation (the part due to the interference of the two halves), (2/3) K (q²/2) ⟨ẍ²⟩/c³ × T × G(ωd/c).
       o = { q, d, A, w, sens, n = 256, demi: "difference" | "somme" } ; demi replaces the force by half the difference
       (retarded − advanced) or half the sum. */
    function periodeHaltere(o) {
      if (!o) err("periodeHaltere : { q, d, A, w, sens, n } attendu");
      const q = fini(o.q, "q"), d = positif(o.d, "d"), mvt = mouvementSinusoidal(o.A, o.w), w = o.w, n = Math.round(o.n || 256);
      if (n < 8) err("periodeHaltere : n ≥ 8");
      const T = 2 * Math.PI / w, F = t => {
        if (!o.demi) return forcePropreHaltere({ q, d, mvt, t, sens: o.sens }).F;
        const r = forcePropreHaltere({ q, d, mvt, t, sens: "retarde" }).F, a = forcePropreHaltere({ q, d, mvt, t, sens: "avance" }).F;
        if (o.demi === "difference") return 0.5 * (r - a);
        if (o.demi === "somme") return 0.5 * (r + a);
        return err("demi : « difference » ou « somme »");
      };
      const pts = [];
      let W = 0, Fa = 0, Fv = 0, aa = 0, vv = 0;
      for (let i = 0; i < n; i++) {
        const t = i * T / n, f = F(t), v = mvt.v(t), a = mvt.a(t);
        pts.push({ t, F: f, v, a });
        W += -f * v; Fa += -f * a; Fv += -f * v; aa += a * a; vv += v * v;          // periodic: the trapezoid rule is spectral
      }
      W *= T / n;
      const kd = w * d / C, A = o.A;
      const croise = (2 / 3) * K * (q * q / 2) * (w ** 4 * A * A / 2) / C ** 3 * T * facteurMutuel(kd);
      return { T, points: pts, travail: W, mEff: Fa / aa, b: Fv / vv, masse: masseHaltere(q, d), croise, kd, beta: mvt.beta };
    }

    /* §28-4. A charge q spread uniformly on a sphere of radius a (the electron of « Masse électromagnétique »):
       U = K q²/(2a) (28.1) ; m from the field momentum (2/3) K q²/(a c²) (28.4), from the energy U/c² (28.8) ;
       their ratio 4/3. pression = σ²/(2 ε0) (Pa), the outward pull per unit area that something non-electric must
       balance ; forceHemisphere = π a² × pression, what holds one half to the other. Electrostatics, exact for the
       model ; the moving case (the masses) for v ≪ c. */
    function contraintesPoincare(q, a) {
      fini(q, "q"); positif(a, "a");
      const U = K * q * q / (2 * a), sigma = q / (4 * Math.PI * a * a), p = sigma * sigma / (2 * EPS0);
      const mImpulsion = (2 / 3) * K * q * q / (a * C * C), mEnergie = U / (C * C);
      return { U, sigma, pression: p, forceHemisphere: Math.PI * a * a * p, mImpulsion, mEnergie, rapport: mImpulsion / mEnergie };
    }

    /* §28-5. Bopp's idea for a point charge at rest: φ(r) = c² q ∫ F(s²) c dt2 over the past (A₀ = φ/c, j₀ = cρ), s² = c²(t1 − t2)² − r²,
       with a narrow kernel F of width a² around s² = 0. Here F ∝ exp(−(s²/a²)²), normalised so that far away
       φ → q/(4π ε0 r). Returns 4π ε0 φ/q (m⁻¹) = ∫₀^∞ g(u² − r²) du, g(x) = (2/(a²√π)) exp(−x²/a⁴), u = c(t1 − t2).
       Far: 1/r (1 + 3a⁴/(16 r⁴) + …) ; at r = 0: 2 Γ(5/4)/(√π a) ≈ 1,0228/a, finite. Simpson, n intervals (even). */
    function potentielBopp(r, a, n) {
      if (!(r >= 0) || !isFinite(r)) err("r doit être un nombre positif ou nul"); positif(a, "a");
      const N = 2 * Math.round((n || 2000) / 2), X = 7 * a * a, a4 = a * a * a * a, g0 = 2 / (a * a * Math.sqrt(Math.PI));
      const u0 = Math.sqrt(Math.max(0, r * r - X)), u1 = Math.sqrt(r * r + X);
      return simpson(u => { const x = u * u - r * r; return g0 * Math.exp(-x * x / a4); }, u0, u1, N);
    }

    /* §28-6. Yukawa: the static, spherically symmetric solution of ∇²φ − μ²φ = 0 outside a point source, (28.18)
       φ = K' e^{−μr}/r, here with K' = 1: returns e^{−r/R}/r, R = 1/μ the range (m). Exact for a static point source
       of the scalar field ; a nucleon has a size (0,84 fm) comparable to R, and moves. */
    function potentielYukawa(r, R) { positif(r, "r"); positif(R, "R"); return Math.exp(-r / R) / r; }

    /* §28-6. The free waves of (28.17): ω²/c² = k² + μ², so E² = p²c² + (μħc)². The quantum of range R = 1/μ has
       mass m = ħ/(R c): { kg, J (= m c²), eV, R }. Exact for the free field ; tying R to a measured range is the model. */
    function masseYukawa(R) { positif(R, "R"); const kg = HBAR / (R * C), J = kg * C * C; return { R, kg, J, eV: J / Cst.e }; }
    function porteeYukawa(J) { positif(J, "m c²"); return HBAR * C / J; }

    Object.assign(api, { mouvementSinusoidal, forcePropreHaltere, serieForcePropre, masseHaltere, facteurMutuel, periodeHaltere,
      contraintesPoincare, potentielBopp, potentielYukawa, masseYukawa, porteeYukawa });
  }

  /* ---------- Étape « Champs d'une charge rapide » (Feynman II.26.1, 26.2) ---------- */
  {
    const C = Cst.c, C2 = C * C, K = 1 / (4 * Math.PI * Cst.eps0);
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const sous = (v, nom) => { if (!(Math.abs(v) < C)) err("|" + nom + "| doit rester inférieure à c"); return v; };

    /* v0 along x for t < 0, uniform braking to rest on [0, τ], at rest after; the charge passes x = 0 at t = 0.
       Exact kinematics of the model; |v0| < c. */
    function freinage(v0, tau) {
      sous(fini(v0, "v0"), "v0"); positif(tau, "tau");
      const x = t => t < 0 ? v0 * t : t < tau ? v0 * t - v0 * t * t / (2 * tau) : v0 * tau / 2;
      const v = t => t < 0 ? v0 : t < tau ? v0 * (1 - t / tau) : 0;
      return { pos: t => [x(fini(t, "t")), 0, 0], vit: t => [v(fini(t, "t")), 0, 0], acc: t => [t >= 0 && t < tau ? -v0 / tau : 0, 0, 0], arret: v0 * tau / 2 };
    }
    /* (26.1) for the charge imagined to keep its retarded velocity v′ after t′: it would be at P′ + v′(t − t′). With
       X = P − P_proj, φ = K q/(√(1 − β²) √(X∥²/(1 − β²) + X⊥²)), A = v′φ/c². Exact for any motion slower than light: the same
       numbers as (21.33) and (21.34), since √(X∥² + (1 − β²)X⊥²) = r′ − v′·r′/c (26.1q). */
    function potentielsProjetes(q, pos, vit, P, t) {
      fini(q, "q"); v3(P, "P"); fini(t, "t");
      const tRet = api.tempsRetarde(pos, P, t), retardee = v3(pos(tRet), "pos(t)"), v = v3(vit(tRet), "vit(t)");
      const b2 = dot(v, v) / C2; if (!(b2 < 1)) err("la charge doit aller moins vite que c");
      const projetee = retardee.map((x, i) => x + v[i] * (t - tRet)), X = sub(P, projetee), x2 = dot(X, X);
      const par2 = b2 === 0 ? 0 : dot(X, v) ** 2 / dot(v, v), den = Math.sqrt(par2 + (1 - b2) * (x2 - par2));
      if (!(den > 0)) err("le point d'observation est sur la charge projetée");
      const phi = K * q / den;
      return { phi, A: v.map(x => x * phi / C2), tRet, retardee, projetee, v };
    }
    /* the field the projected charge would have, (26.2) to (26.6) and (26.12) with the retarded velocity. It is the true
       field only while the charge has not accelerated between t′ and t: the field depends on the acceleration. */
    function champProjete(q, pos, vit, P, t) {
      const p = potentielsProjetes(q, pos, vit, P, t), E = api.champUniforme(q, p.projetee, p.v, P, 0);
      return { E, B: cross(p.v, E).map(x => x / C2), projetee: p.projetee };
    }
    /* (26.6p): E/E_Coulomb at the same distance from the present position, ψ the angle between v and r:
       (1 − β²)/(1 − β² sin²ψ)^(3/2); γ at ψ = 90° (26.10), 1/γ² ahead (26.11). Exact for uniform motion. */
    function profilHeaviside(beta, psi) {
      fini(beta, "beta"); if (!(Math.abs(beta) < 1)) err("|beta| doit être < 1"); fini(psi, "psi");
      const b2 = beta * beta, s = Math.sin(psi); return (1 - b2) / Math.pow(1 - b2 * s * s, 1.5);
    }
    /* the angle α, measured from the transverse plane, where E falls to half its transverse value: sin²ψ =
       (1 − 2^(2/3)(1 − β²))/β², α = π/2 − ψ ≈ √(2^(2/3) − 1)/γ = 0,766/γ for γ ≫ 1. null when E ahead is still above half
       (β² ≤ 1 − 2^(−2/3), β ≤ 0,608). */
    function largeurAngulaire(beta) {
      fini(beta, "beta"); if (!(Math.abs(beta) < 1)) err("|beta| doit être < 1");
      const b2 = beta * beta, k = Math.pow(2, 2 / 3), g2 = 1 / (1 - b2);
      if (!(k * (1 - b2) < 1)) return null;
      return Math.asin(Math.sqrt(Math.max(0, (k - 1) / (g2 * b2))));
    }
    /* the directions of n field lines in a plane through v: those of the charge at rest, equally spaced at θ0, with x
       squashed by γ: ψ = atan2(γ sin θ0, cos θ0). Exact in this sense: the fraction of lines (as cones in space) inside
       any ψ equals the fraction of the flux of (26.6p) inside it. */
    function lignesHeaviside(beta, n) {
      fini(beta, "beta"); if (!(Math.abs(beta) < 1)) err("|beta| doit être < 1");
      if (!(Number.isInteger(n) && n >= 2 && n <= 1000)) err("n doit être un entier entre 2 et 1000");
      const g = 1 / Math.sqrt(1 - beta * beta);
      return Array.from({ length: n }, (_, k) => { const t0 = 2 * Math.PI * (k + 0.5) / n; return Math.atan2(g * Math.sin(t0), Math.cos(t0)); });
    }
    /* the field at distance b from the line of a charge q passing at v (closest approach at t = 0): (26.3) and (26.6) at
       x − vt = −vt: Ey = K q γ b/(b² + γ²v²t²)^(3/2) (26.3q), Ex = −K q γ v t/(…)^(3/2). crete = γ K q/b², duree = full
       width at half height 2√(2^(2/3) − 1) b/(γv), integrale = ∫Ey dt = 2Kq/(bv), the same for every γ. Exact for uniform
       motion; the passing charge must not be deflected during the passage. */
    function impulsionTransverse(q, v, b) {
      fini(q, "q"); positif(v, "v"); sous(v, "v"); positif(b, "b");
      const g = 1 / Math.sqrt((1 - v / C) * (1 + v / C)), den = t => Math.pow(b * b + g * g * v * v * fini(t, "t") * t, 1.5);
      return { gamma: g, Ey: t => K * q * g * b / den(t), Ex: t => -K * q * g * v * t / den(t), crete: g * K * q / (b * b),
        duree: 2 * Math.sqrt(Math.pow(2, 2 / 3) - 1) * b / (g * v), integrale: 2 * K * q / (b * v) };
    }
    Object.assign(api, { freinage, potentielsProjetes, champProjete, profilHeaviside, largeurAngulaire, lignesHeaviside, impulsionTransverse });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.OndesMilieux = api;
})(typeof self !== "undefined" ? self : this);

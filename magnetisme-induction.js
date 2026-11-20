/* MagInd — le module commun du monde « Magnétisme et induction ». Pur, sans DOM, UMD (global MagInd). SI partout.
   Chaque étape ajoute sa section juste avant la ligne « fin des sections », par Edit seulement, avec
   Object.assign(api, { … }) ; rien de ce qui existe n'est réécrit. Sommaire : une ligne par fonction, ajoutée ici par
   chaque étape. Réutiliser d'abord ce qui existe : constantes.js, electrostatique.js, ondes.js, lecons/laplace.js,
   statistique.js, lecons/integration.js (Integ.rk4), lecons/complexes.js (Cx). Chaque fonction est un modèle : son
   domaine est dans son commentaire. Les erreurs lèvent un message en français : elles signalent un appel faux.

   Sommaire
   Étape « Champ magnétique et courants » (Feynman II.13.1 à 13.3)
     champsDepuisForces(q, F0, v1, F1, v2, F2)  { E, B } : les deux champs en un point, tirés de trois mesures de la force sur
                                une charge d'essai q : au repos (F0), puis à deux vitesses v1, v2 non parallèles. Inverse exact de (13.1).
     PORTEURS                   { cuivre, argent, aluminium } : électrons libres par m³ (modèle des électrons libres).
     vitesseDerive(I, S, N, q)  |I|/(N |q| S), m·s⁻¹ : (13.4) pour un courant uniforme dans une section S.
     densiteCourant(N, q, v)    N q v, A·m⁻² (13.4), vecteur.
     forcePorteurs(N, q, v, B, V)  la somme des forces q v ∧ B sur les N V porteurs d'un volume V : j ∧ B V (13.9).
     paquet1D(Q, v, D, s0)      un paquet de charge gaussien (Q par m² d'une tranche), entraîné à v et qui diffuse (D) :
                                { rho(x, t), j(x, t), advection(x, t), charge(a, b, t), apport(a, b, t1, t2, jf) }, solution exacte
                                de (13.8) à une dimension ; advection = ρv seul, le courant qui oublie la diffusion.
     filPlan(forme, a, b, n)    un fil du plan z = 0 de a à b : "droit", "arc" (demi-cercle), "zigzag", "boucle" (fermé).
     forceFil(I, points, B)     { F, couple } : Σ I Δl ∧ B au milieu de chaque segment (13.11), B vecteur ou fonction du point.
   Étape « Théorème d'Ampère et relativité des champs » (Feynman II.13.4 à 13.7)
     contoursAmpere             { cercle(c, R), carre(c, a), etoile(c, R, k), double(c, R), huit(c, R) } : chemins fermés du plan.
     enlacements(chemin, p, n)  nombre de tours du chemin fermé autour du point p (entier, signé).
     circulationFils(fils, chemin, n), courantEnlaceContour(fils, chemin, n)  ∮ B·ds de fils selon z (T·m), Σ I × tours (A) : (13.16).
     filEpais(I, a, r)          B d'un fil de rayon a, courant uniforme : μ0 I r/(2π a²) dedans, (13.17) dehors.
     solenoideInfini(n, I)      μ0 n I (13.19).
     solenoideAxe(n, I, R, L, z)  B_z sur l'axe d'un solénoïde fini (nappe de courant), forme fermée.
     solenoideSpires(N, I, R, L, rho, z)  { Brho, Bz } : le même en N spires exactes (spireExacte), sur l'axe et hors de l'axe.
     gammaLorentz(v), boostEvenement(e, u)  γ ; (13.35) gauche, événement { t, x, y, z }.
     quadricourant(rho0, v), boostCourant(k, u), invariantCourant(k), sommeCourants(liste)  (13.34) ; (13.35) droite ; c²ρ² − j².
     filEnMouvement({ lambda, v, v0, r, q })  fil neutre dans S, charge d'essai à v0 : force magnétique dans S, électrique dans S'.
     impulsions(m, dtp), filCuivre(I, S)  (13.31)–(13.33) ; λ des ions et vitesse de dérive d'un fil de cuivre.
   Étape « Potentiel vecteur » (Feynman II.13.8, II.14.1 et 14.2)
     reflexion(v, n), imageAxiale(v, n)  image d'un vecteur polaire, d'un vecteur axial, dans le miroir de normale n.
     filsMiroir(fils, n)        image de fils rectilignes selon z [{ I, x, y }] dans un miroir vertical ou horizontal.
     champFils(fils, p), forcesFils(fils)  B des fils en p (ChampsEM.champB), force par mètre sur chaque fil (N·m⁻¹).
     potentielUniforme(B0, λ, ν), jaugeUniforme(B0, λ, ν)  A de B0 ẑ : (14.8) + ∇ψ, ψ = λB0xy/2 + νB0(x² + y²)/4.
     elliptiques(m)             { K, E }, intégrales elliptiques complètes, 0 ≤ m < 1 (moyenne arithmético-géométrique).
     spireExacte(I, R, rho, z)  { Aphi, Brho, Bz } d'une spire circulaire, formules fermées.
     spireElements(I, R, N), potentielElements(els, p), champElements(els, p), aphiNaif(els, p)
                                la spire en N éléments ; (14.19) sommée composante par composante ; Biot et Savart ; la faute
                                qui somme la composante azimutale comme une composante cartésienne.
   Étape « Potentiel vecteur de circuits simples » (Feynman II.14.3 à 14.5)
     filJ(I, a), filA(I, a, r)  fil rectiligne de rayon a : (14.20), A_z nul en r = a ((14.21) dehors) ; |B| : filEpais.
     filChampA(I, a), filChampB(I, a)  les mêmes en champs de l'espace p ↦ vecteur, (14.22) et (14.23).
     segmentA(I, P1, P2, P), segmentB(I, P1, P2, P)  A et B d'un segment fin, formules fermées de (14.19) et de Biot et Savart.
     circuitA(I, sommets, P), circuitB(I, sommets, P)  leur somme sur un polygone fermé : exacte pour ce polygone.
     rectangle(a, b), polygoneRegulier(R, n, z), aireVectorielle(sommets)  circuits du plan, orientés vers +z ; ½ Σ r ∧ r'.
     solenoideA(n, I, a, r), solenoideB(n, I, a, r), solenoideChampA(n, I, a)  solénoïde idéal : (14.27) dehors, μ0 n I r/2 dedans.
     cylindreTournant(σ, a, ω)  { J, B, U, v } : cylindre chargé qui tourne ; U entre les bouts d'un fil radial entraîné.
     moment(I, sommets), dipoleA(μ, P), dipoleB(μ, P), composantesDipoleB(μ, R, θ)  (14.33), (14.34), (14.35)–(14.36).
   Étape « Loi de Biot et Savart et dipôle magnétique » (Feynman II.14.6, 14.7 et 15.1)
     anneauEpais(I, R, a, rho, z, n)  { Aphi, Brho, Bz } : spire de section circulaire de rayon a, courant uniforme, moyenne de
                                spireExacte sur n × 2n filaments d'aire égale ; le fil épais que (14.37) remplace par une ligne.
     reseauA(branches, P), reseauB(branches, P)  un réseau de fils minces [{ I, points }] : chaque branche son courant, (14.38).
     noeuds(branches)           [{ p, bilan }] : courant entrant moins sortant à chaque extrémité de branche (Kirchhoff : 0).
     spireAxe(I, R, z)          (14.43a) : B_z sur l'axe d'une spire circulaire.
     cadreFil(o)                cadre rectangulaire près d'un fil rectiligne infini : force et couple exacts, −I Φ, et les
                                mêmes au premier ordre par le dipôle, (15.2), (15.4), (15.10).
   Étape « Moteurs, générateurs et transformateurs » (Feynman II.16.1 à 16.4)
     RESISTIVITES               { cuivre, aluminium } : Ω·m à 20 °C.
     femMotionnelle(chemin, vitesse, B, n)  ∮ (v ∧ B)·ds le long d'un circuit fermé qui bouge dans un champ statique (V).
     spireTournante(o)          { N, B, S, omega, phi0 } → flux(t), fem(t) = N B S ω sin θ, redressee(t), femMax, efficace.
     machineCC(o)               machine à courant continu E = kω, C = kI : régime établi, puissances, mode, démarrage (τ = JR/k²).
     transformateur(o)          deux enroulements couplés (k) en notation complexe : U2, I1, I2, rapport, rendement.
     coupureBobine(o)           ouverture d'une bobine shuntée par Rp : τ = L/(R + Rp), tension Rp I0, énergie ½ L I0².
     mutuelleSpires(R1, R2, z), inductanceAnneau(R, a)  M et dM/dz de deux spires coaxiales ; L d'un anneau de fil rond.
     anneauSauteur(o)           anneau de Thomson sans noyau : courant induit, déphasage, force moyenne, poids.
     champTournant(B0, ω, t, phases), coupleAsynchrone(o)  champ de trois bobines à 120° ; couple moyen sur un anneau qui glisse.
     ligneTriphasee(o)          { P, U, longueur, section, rho } → R, I, pertes, fraction R P/U², chute de tension.
     pertesFoucaultTole(f, B0, e, rho)  pertes par courants de Foucault dans une tôle d'épaisseur e : π² f² B0² e²/(6ρ), W·m⁻³.
   Étape « Trajectoires dans des champs E et B » (Feynman II.29.1, 29.2 et 29.8)
     lorentzRel(o)              dp/dt = q(E + v ∧ B), p = γmv, pas à pas (Integ.rk4) ; E, B vecteurs ou fonctions (x, t).
     champEUniforme(q, m, E, v0)  solution exacte dans E = E e_x : mouvement hyperbolique, chaînette, et la parabole de Newton.
     rayonnementLineaire(q, m, E)  puissance rayonnée sur une droite (Liénard) contre |qE| c.
     rigidite(q, m, ec)         (29.1a) : Bρ = p/|q| (T·m), p relativiste ; p en GeV/c.
     demiCercle(q, B, p, θ), spectro180(o)  (29.1b), (29.1c) : sortie à 2R cos θ ; fente et ouverture → bande, transmission(p).
     champAxial(q, B, p, α)     (29.1d) : ρ = 2R |sin kz|, retour sur l'axe en zf = 2π p cos α/(|q|B).
     derive(E, B), deriveForce(F, q, B)  E ∧ B/B², F ∧ B/(qB²).
     boostChamps(E, B, u), referentielDerive(E, B)  transformation exacte des champs ; le référentiel qui annule E (E < cB) ou B.
     hauteurCycloide(q, m, E, B), coupureHull(o)  2mE/(|q|B²) ; champ de coupure du magnétron, plan ou coaxial.
   Étape « Énergie des courants permanents » (Feynman II.15.2 à 15.6)
     bilanCadreFil(o)           cadre poussé vers un fil à courants constants : travail des forces, des deux sources, (15.13).
     energieDeuxSpires(I1, I2, R1, R2, z, n)  M de deux spires coaxiales par le flux (15.17), la circulation de A (15.19),
                                la double intégrale de Neumann et le dipôle (15.16) ; U = I1 I2 M.
     coaxJA(I, a, b, n)         câble coaxial : ½∫j·A dV (15.20), A tiré de B pas à pas, contre ∫B²/(2μ0) dV et la forme fermée.
     rotationnelSpire(I, R, rho, z, h)  B d'une spire par différences centrées sur Aφ, contre la forme fermée : l'écart en h.
     longueurOndeReduite(U, q, m), quantumFlux(q), phaseMagnetique(q, flux)  ƛ = ħ/p relativiste ; 2πħ/|q| ; qΦ/ħ (15.34).
     franges(o)                 deux fentes : intensité(x), décalage des franges (15.36) et de l'enveloppe (déviation classique).
     dipoleOscillant(p0, f, r, theta, t)  φ retardé (jauge de Lorenz) contre φ statique : rapport √(1 + (kr)²), retard kr − atan kr.
   Étape « Lentilles et focalisation de faisceaux » (Feynman II.29.3 à 29.7)
     potentielTubes(V1, V2, b), potentielEinzel(V0, Vc, a)  potentiels sur l'axe { V, dV, d2V } : deux tubes (tanh), einzel (gaussienne).
     rayonE(P, r0, rp0, z0, z1, n), lentilleE(P, z0, z1, n)  rayon paraxial électrostatique (Newton) ; foyers, focales image et objet.
     minceEinzel(P, z0, z1, n)  1/f ≈ (3/16) ∫ (V'/V)² dz, lentille einzel faible.
     rayonB(B, q, p, …), lentilleB(B, q, p, z0, z1, n), busch(B, q, p, z0, z1, n)  lentille magnétique dans le référentiel tournant ;
                                foyer, rotation ; formules minces de Busch (∫B², ∫B).
     glaser(B0, a, q, p), impulsionU(q, m, U)  champ en cloche : f = −ωa/sin(ωπ), zF, rotation, forme fermée ; p relativiste après U.
     resolutionMicroscope(U, Cs)  λ, flou de diffraction 0,61 λ/α et d'aberration Cs α³, ouverture optimale, optimum de Scherzer.
     champIndice(B0, r0, n), nombresOnde(n), orbiteIndice(o)  champ de guidage d'indice n (signe de Feynman, (29.2), (29.3)) ;
                                √(1 + n), √(−n) ; écarts radial et vertical pas à pas (lorentzRel).
     quadrupole(G), focaleQuad(G, l, q, p)  B = (Gy, Gx, 0) ; 1/f = qGl/p.
     matriceMince(f), matriceVol(L), matriceQuad(K, l), chaine(liste), stabilite(M), fodo(o), doublet(f1, f2, e)
                                optique matricielle du faisceau : |tr M| < 2, cos μ = 1 − L²/(2f²), vergence (27.12a).
     kapitza(g, l, a, w), pendulePivot(g, l, a, w, th0, duree, n)  pendule renversé à pivot vibrant : a²ω² > 2gl ; pas à pas.
   Étape « Diamagnétisme et moments magnétiques » (Feynman II.34.1 à 34.4)
     SUSCEPTIBILITES, forceSusceptible(χ, V, B, gradB), levitation(χ, ρ, g)  χ et ρ de quelques corps ; χ V B gradB/μ0 ;
                                le B dB/dz qui équilibre le poids (|χ| ≪ 1).
     momentOrbite(q, m, r, v)   (34.1)–(34.3) : J, μ, μ/J = q/(2m).
     S2_FORMES, facteurGClassique(formeCharge, formeMasse), corpsTournant(o)  corps rigide en rotation : g = ⟨s²⟩charge/⟨s²⟩masse.
     PARTICULES, rapportGyromagnetique(p), vitesseEquateur(R)  g et γ = gq/(2m) (34.6)–(34.7) ; électron-boule tournante : v à l'équateur.
     frequencePrecession(p, B), precessionExacte(γ, B, J0, t), precessionPas(γ, B, J0, duree, n)  (34.10)–(34.11) ; dJ/dt = γ J ∧ B.
     orbiteDiamagnetique(o)     électron lié (force harmonique) sous un champ qu'on établit : ΔJ et Δμ pas à pas contre (34.15), (34.16).
     chiLangevin(n, Z, r2), r2DepuisChi(χ, n, Z), r2Hydrogenoide(Zeff), CHI_MOLAIRE_HELIUM  (34.17) sommée : χ ; et l'inverse.
   Étape « Règle du flux et loi de Faraday » (Feynman II.17.1 à 17.4)
     femLorentz(chemin, o, n)   ∮(E + v ∧ B)·ds d'un circuit fermé : { electrique, magnetique (femMotionnelle), totale }.
     bandeChamp(B0, L, w), troisInductions(o)  bande de champ B_z(x) ; spire qui bouge, aimant qui bouge, champ qui croît :
                                Φ(t), −dΦ/dt, ∮E·ds et ∮(v ∧ B)·ds en forme fermée, champs E et B (17.1).
     disqueFaraday(o), plaquesBasculantes(o)  ωB(a² − b²)/2 ; plaques qui basculent : fem vraie, règle du flux, contour matériel.
     champBetatron(o), rayonAdiabatique(o, b0, b1, pas), betatron(o)  champ d'indice n et E induit (17.4), B_moy = k B_orbite ;
                                rayon de l'orbite si k ≠ 2 ; énergie, gain et perte par rayonnement par tour.
     solenoideFini, fluxAnneau(spires, R), paradoxeDisque(o)  flux enlacé par l'anneau chargé, ΔL = QΦ(R)/(2π).
     anneauCharge(Q, R, rho, z), momentChamp(Q, R, spires, n)  E d'un anneau chargé ; ε0∫ r ∧ (E ∧ B) dV, à comparer à ΔL.
   Étape « Théorème de Larmor et moment cinétique quantique » (Feynman II.34.5 à 34.8)
     orbiteLarmor(o)            orbite liée (Coulomb ou harmonique) dans B, pas à pas : labo, repère de Larmor, sans champ ;
                                écart du premier ordre (labo) et du second (repère tournant, reste −ωL² r).
     zeemanNormal(f0, B)        triplet normal f0 ± eB/(4π m_e) (34.22b).
     gazDisque(o)               gaz classique dans un disque à parois réfléchissantes, arcs exacts : moment de l'intérieur
                                (−kT/B chacun), du bord, total nul à σ près (Bohr et van Leeuwen) ; traces.
     valeursJz(j), moyenneJz2(j), carreJ(j), angleMin(j)  (34.23), (34.25), (34.26) en unités de ħ ; angle minimal à l'axe.
     rotateurRigide(nu10, m1, m2)  I, r = √(I/μ) tirés de la raie J = 1 → 0 ; rNaif avec J² au lieu de J(J + 1).
     niveauxMagnetiques(j, g, B, o), ecartMagnetique(g, B), rapportThermique(g, B, T)  (34.29b) : 2j + 1 niveaux ; g μB B ; contre kT.
   Étape « Inductance » (Feynman II.17.5 à 17.8)
     alternateurCharge(o)       bobine tournante sur une charge R par sa propre L (s = iω) : i(t), couple(t), ω τ = R i² +
                                L i di/dt ; phases: 3 donne un couple constant.
     barreRails(o)              barre sur rails (17.19)–(17.22) : τ = m R/(B²w²), v(t), x(t), chaleur ; travail = ΔEc + Joule.
     mutuelleInclinee(o)        deux spires, la seconde décalée et inclinée : M par le flux de 1 dans 2, de 2 dans 1, ∮A·ds,
                                Neumann (17.30a), dipôle.
     mutuelleSolenoide(N1, N2, S, l), bobinesSerie(L1, L2, M)  (17.25) ; L1 + L2 ± 2M.
     circuitRL(o)               établissement du courant, énergies de la source, de Joule et stockée, en forme fermée.
     inductanceNappe(N, a, ℓ, n)  solénoïde en nappe : L = 2n²∫(ℓ − u)M(u)du, coefficient de Nagaoka K, formule de Wheeler.
     energieCouplee(L1, L2, M, I1, I2), energieMinimale(L1, L2, M, I1)  (17.38) ; minimum en I2, positif ssi M² < L1 L2.
     poyntingSolenoide(o), poyntingFil(o)  S = E ∧ B/μ0 : bobine longue dont le courant monte (flux = d(½LI²)/dt) ; fil
                                résistif (flux à travers le cylindre r = Joule dans r).
     bilanPoyntingFini(o)       solénoïde fini, surface fermée dans la bobine : flux de S et dU/dt par quadrature.
   Étape « États magnétiques quantifiés » (Feynman II.35.1 à 35.3)
     orientations(j)            μ_z en unités de g μB : 2j + 1 valeurs quantiques contre la bande uniforme d'un vecteur classique
                                de même longueur ; carrés moyens, maxima, écart maximal des deux répartitions.
     ARGENT, vitesseJet(v, m, T)  atome d'argent (m, j, g) ; vitesses d'un jet effusif, 2v³/vp⁴ e^(−v²/vp²).
     deviationSG(o), echelleSG(o)  (35.6) : déviation d'un atome à v ; z0 = F(L²/2 + LD)/(2 k_B T), sans la masse.
     profilVitesses(z, z0), repartitionVitesses(z, z0), profilSG(o)  densité (z0²/z³)e^(−z0/z) et sa répartition ; plaque de
                                Stern et Gerlach, quantique ou classique, fente comprise.
     rabi(dw, w1, t), basculeClassique(o)  formule de Rabi ; dμ/dt = γ μ ∧ B pas à pas, champ linéaire ou tournant (exact, spin 1/2).
     courantRabi(o), largeurRabi(o), champPi(gamma, l, v)  creux du courant au détecteur, moyenne sur le jet ; profondeur, largeur ;
                                B′ d'une bascule complète.
   Étape « Paramagnétisme et résonance magnétique nucléaire » (Feynman II.35.4 à 35.6)
     brillouin(j, x), langevinL(x)  B_j(x), x = g μ j B/(k_B T) : tanh x pour j = 1/2, Langevin quand j → ∞ ((35.21), (35.9)).
     constanteCurie(N, j, g, μ), aimantationParamagnetique(o)  C = μ0 N g² j(j + 1) μ²/(3k_B) ; M, Msat, χ, loi linéaire (35.24),
                                Langevin de même μ².
     populations(j, g, B, T, o)  les 2j + 1 niveaux de niveauxMagnetiques et leurs populations de Boltzmann.
     entropieSpin(j, y), entropieReseau(T, θ), selSpins(o), desaimantation(o)  S/k_B d'un spin (fonction de B/T seul) ; réseau
                                de Debye en T³ ; sel { j, g, b, r, θ } ; aimantation isotherme puis désaimantation réversible : Tf.
     PROTONS_EAU, aimantationNucleaire(N, γ, B, T, j)  protons par m³ d'eau ; M0 = Nγ²ħ²B/(4k_BT) et forme exacte.
     bloch(o), blochStationnaire(Δ, ω1, T1, T2, M0), balayageRMN(o), femBobine(N, S, ω, M⊥)  équations de Bloch dans le
                                référentiel tournant, pas à pas ; solution stationnaire ; balayage du champ à fm (ondulations) ; fem.
   Étape « Aimantation et champ H » (Feynman II.36.1 à 36.3)
     OERSTED, GAUSS, FER_JSAT, FER_MS  1 Oe en A·m⁻¹, 1 G en T ; fer pur : μ0 Ms = 2,15 T, Ms en A·m⁻¹.
     courantsBlocs(Mz, x0, x1, n)  plaque en n blocs aimantés : nappes K = M_{k−1} − M_k aux interfaces, somme nulle, j = −dMz/dx (36.8).
     barreauAimante(M, R, L)    cylindre aimanté uniformément = solénoïde n I = M : B, M, H = B/μ0 − M sur l'axe, Nd au centre,
                                moment, dipôle lointain, ∫H dz en forme fermée (→ 0).
     materiauLineaire(χ, B)     H, M = χH, et μ0 M/B = χ/(1 + χ).
     toreRowland(N, I, a, b), inductionDepuisFem(N2, S, t, e, B0)  H = NI/l (36.20) et H(r) dans la section ; B par ∫e dt.
     ACIER_JA, jilesAtherton(p), cycleHysteresis(p, Hmax, o)  modèle de Jiles et Atherton : première aimantation, cycles,
                                Br, Hc, perméabilité apparente.
   Étape « Noyaux de fer et électroaimants » (Feynman II.36.4 à 36.6)
     integraleHdB(pts), energieCycle(c)  ∫ H dB (36.22) le long d'une courbe ; d'un cycle : aire (chaleur par cycle), énergie
                                de la première aimantation, part rendue à la descente, B²/(2μ0) du vide.
     inductanceFer(μr, N, A, l), inductanceCourbe(pts, N, A, l)  (36.25) ; inductances apparente et différentielle le long d'une courbe.
     courantMagnetisant(c, o)   flux sinusoïdal imposé, H(θ) lu sur le cycle : courant pointu, harmoniques 3 et 5, avance de H sur B.
     droiteCharge(NI, l1, l2), pointFonctionnement(pts, NI, l1, l2)  (36.27) en SI : droite de l'entrefer, et son intersection
                                avec une branche de la courbe du fer (points a, b, c, d de l'électroaimant).
     electroaimantLineaire(NI, l1, l2, μr), forcePole(B, S)  B = μ0 NI/(l1 + l2/μr) ; force portante B² S/(2μ0).
     temperatureCurie(N, μ, λ), weiss(t, h), curieWeiss(t, h)  (36.39) ; m = tanh((h + m)/t), toutes les racines ; (36.41).
     NICKEL, nickelWeiss()      l'estimation du point de Curie du nickel avec λ = 1/3, le λ et le champ local qu'il faudrait.
   Étape « Comprendre le ferromagnétisme » (Feynman II.37.1 à 37.5)
     aimantationReduite(t, j), exposantLocal(m, t)  m(T/Tc) en champ moyen, même Tc pour tout j : tanh (37.4) pour j = 1/2,
                                Langevin pour j = Infinity ; d ln m/d ln(1 − t) (1/2 en champ moyen).
     echelleEnergies(a, μ, Tc)  énergie dipolaire de deux voisins, k_B Tc et e²/(4πε0 a) : les rapports qui écartent le dipôle.
     thermoSpin(t), bilanChampMoyen(N, Tc)  u = −m²/2 (37.5), C/(Nk) (saut de 3/2 en Tc), S/(Nk) ; saut, N k ln 2, N k Tc/2.
     magnetocalorique(T, Tc, μ, H, c_r), momentParAtome(Js, ρ, Mmol)  échauffement adiabatique sous H ; μB par atome tiré de Js.
     KAPPA_BANDES, domainesBandes(σ, Ms, L), FER_PAROI, paroi(A, K)  domaines en bandes de Kittel : largeur optimale, épaisseur
                                sous laquelle un seul domaine gagne ; σ = 4√(AK), δ = π√(A/K).
     paroiAccrochee(o)          une paroi dans un paysage d'ancrages aléatoires : branches d'équilibre, sauts de Barkhausen, cycle.
     MATERIAUX, ALNICO5, cycleModele(Br, Hc, w), largeurDepuisBHmax(Br, Hc, BHmax), aimantEntrefer(des, lm, lg, Hc)
                                tableau 37-1 en SI ; cycle tanh d'aire 4 Hc Bm, (BH)max ; aimant fermé sur un entrefer (36.27).
     deuxReseaux(o), FERRITES, momentFerrite(f)  deux sous-réseaux en champ moyen (Néel) : ferro, antiferro, ferri, compensation ;
                                le décompte de Néel pour la magnétite (4 μB) et le grenat YIG (5 μB).
*/
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const api = {};

  /* ---------- Étape « Champ magnétique et courants » (II.13.1 à 13.3) ---------- */
  {
    const { vectoriel: cross } = node ? require("./tenseurs.js") : root.Tenseurs;
    const err = m => { throw new Error("magnétisme : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const sub = (a, b) => a.map((x, i) => x - b[i]), mul = (k, a) => a.map(x => k * x), add = (a, b) => a.map((x, i) => x + b[i]);
    const simpson = (f, a, b, n) => { let s = f(a) + f(b); const h = (b - a) / n;
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };

    /* (13.1) read backwards. F0 = qE (at rest). For a velocity v, Fm = F − qE = q v ∧ B gives the part of B normal to v:
       B⊥ = Fm ∧ v/(q v²), since (v ∧ B) ∧ v = v² B − (v·B) v. The part along v1 comes from the second measurement.
       Exact for a point charge that does not disturb the sources; the measurement must be made at one point. */
    function champsDepuisForces(q, F0, v1, F1, v2, F2) {
      fini(q, "q"); if (q === 0) err("une charge d'essai nulle ne mesure rien");
      [F0, v1, F1, v2, F2].forEach((v, i) => v3(v, ["F0", "v1", "F1", "v2", "F2"][i]));
      const E = mul(1 / q, F0), w = cross(v2, v1), n2 = dot(w, w), s = dot(v1, v1) * dot(v2, v2);
      if (!(n2 > 1e-12 * s)) err("v1 et v2 doivent être non nulles et non parallèles");
      const m1 = sub(F1, F0), m2 = sub(F2, F0), v1n = Math.sqrt(dot(v1, v1)), u1 = mul(1 / v1n, v1);
      const perp = mul(1 / (q * dot(v1, v1)), cross(m1, v1));
      const b = dot(sub(m2, mul(q, cross(v2, perp))), cross(v2, u1)) / (q * dot(cross(v2, u1), cross(v2, u1)));
      return { E, B: add(perp, mul(b, u1)) };
    }

    /* free electrons per m³, free-electron model (HyperPhysics, after Ashcroft & Mermin): one per atom for Cu and Ag, three for Al */
    const PORTEURS = Object.freeze({ cuivre: 8.47e28, argent: 5.86e28, aluminium: 18.1e28 });

    /* (13.4) for a uniform current I in a section S: the mean speed of the carriers. A model: the distribution of speeds
       is replaced by its mean; holds while the current is uniform over S (direct current, or skin depth ≫ the radius). */
    function vitesseDerive(I, S, N, q) {
      fini(I, "I"); fini(S, "S"); fini(N, "N"); fini(q, "q");
      if (!(S > 0) || !(N > 0) || q === 0) err("il faut S > 0, N > 0 et q ≠ 0");
      return Math.abs(I) / (N * Math.abs(q) * S);
    }
    function densiteCourant(N, q, v) { fini(N, "N"); fini(q, "q"); v3(v, "v"); return mul(N * q, v); }
    /* N V carriers of charge q at the mean velocity v: the sum of q v ∧ B. Equals j ∧ B V, j = N q v: only j counts */
    function forcePorteurs(N, q, v, B, V) { fini(V, "V"); v3(B, "B"); return mul(N * V, mul(q, cross(v3(v, "v"), B))); }

    /* A slab of charge Q per m² of its faces, gaussian of width s0 at x = 0 at t = 0, carried at v and spreading by
       diffusion (coefficient D ≥ 0): σ² = s0² + 2Dt, ρ = Q/(√(2π) σ) exp(−(x − vt)²/2σ²), j = ρ v − D ∂ρ/∂x. Exact solution
       of ∂ρ/∂t + ∂j/∂x = 0, (13.8) in one dimension. charge(a, b, t): the charge between the planes a and b (per m²), Simpson;
       apport(a, b, t1, t2, jf): ∫ (j(a) − j(b)) dt, what crossed the two planes inward, Simpson in time; jf (default j)
       another current density to test, such as advection = ρv alone. */
    function paquet1D(Q, v, D, s0) {
      fini(Q, "Q"); fini(v, "v"); fini(D, "D"); fini(s0, "s0");
      if (D < 0 || !(s0 > 0)) err("il faut D ≥ 0 et s0 > 0");
      const sig2 = t => { const s = s0 * s0 + 2 * D * t; if (!(s > 0)) err("t trop négatif : le paquet n'existe pas encore"); return s; };
      const rho = (x, t) => { const s = sig2(t), u = x - v * t; return Q / Math.sqrt(2 * Math.PI * s) * Math.exp(-u * u / (2 * s)); };
      const j = (x, t) => rho(x, t) * (v + D * (x - v * t) / sig2(t));
      const charge = (a, b, t) => simpson(x => rho(x, t), a, b, 600);
      const apport = (a, b, t1, t2, jf) => { jf = jf || j; return simpson(t => jf(a, t) - jf(b, t), t1, t2, 600); };
      const advection = (x, t) => rho(x, t) * v;                    // ρv alone: forgets the diffusion current
      return { rho, j, advection, charge, apport, sigma: t => Math.sqrt(sig2(t)) };
    }

    /* wires of the plane z = 0 from a to b ([x, y]), as n + 1 points [x, y, 0]. "boucle": the square of diagonal ab, closed. */
    function filPlan(forme, a, b, n) {
      n = n || 64; if (!(Number.isInteger(n) && n >= 2)) err("n doit être un entier ≥ 2");
      const d = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(d[0], d[1]); if (!(L > 0)) err("a et b doivent être distincts");
      const nrm = [-d[1] / L, d[0] / L], P = (s, h) => [a[0] + s * d[0] + h * nrm[0], a[1] + s * d[1] + h * nrm[1], 0];
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const s = i / n;
        if (forme === "droit") pts.push(P(s, 0));
        else if (forme === "arc") { const th = Math.PI * (1 - s); pts.push(P(0.5 + 0.5 * Math.cos(th), 0.5 * L * Math.sin(th))); }
        else if (forme === "zigzag") { const k = s * 6, f = k - Math.floor(k); pts.push(P(s, 0.25 * L * (f < 0.5 ? 2 * f : 2 - 2 * f))); }
        else if (forme === "boucle") { const k = 4 * s, c = [[0, 0], [0.5, 0.5], [1, 0], [0.5, -0.5], [0, 0]], m = Math.min(3, Math.floor(k)), f = k - m;
          pts.push(P(c[m][0] + f * (c[m + 1][0] - c[m][0]), L * (c[m][1] + f * (c[m + 1][1] - c[m][1])))); }
        else err("forme inconnue « " + forme + " »");
      }
      return pts;
    }
    /* (13.11) summed: a thin wire, current I along the order of the points, the field taken at the middle of each segment
       (midpoint rule: error of order (segment × gradient of B / B)²). couple: about the origin, Σ r ∧ dF. */
    function forceFil(I, points, B) {
      fini(I, "I"); if (!Array.isArray(points) || points.length < 2) err("il faut au moins deux points");
      const Bf = typeof B === "function" ? B : (v3(B, "B"), () => B);
      let F = [0, 0, 0], C = [0, 0, 0];
      for (let i = 1; i < points.length; i++) {
        const p = points[i - 1], q = points[i], dl = sub(q, p), m = mul(0.5, add(p, q)), dF = mul(I, cross(dl, v3(Bf(m), "B")));
        F = add(F, dF); C = add(C, cross(m, dF));
      }
      return { F, couple: C };
    }

    Object.assign(api, { champsDepuisForces, PORTEURS, vitesseDerive, densiteCourant, forcePorteurs, paquet1D, filPlan, forceFil });
  }

  /* ---------- Étape « Potentiel vecteur » (II.13.8, II.14.1 et 14.2) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const ChampsEM = node ? require("./lecons/champs-em.js") : root.ChampsEM;
    const MU0 = Cst.mu0;
    const err = m => { throw new Error("potentiel vecteur : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const unit = (n, nom) => { v3(n, nom); const l = Math.sqrt(dot(n, n)); if (!(l > 0)) err(nom + " ne doit pas être nul"); return n.map(x => x / l); };

    /* §13-8. A mirror: the plane through the origin of normal n. A polar vector (position, velocity, force, j, E) is
       reflected: v − 2 (v·n̂) n̂. A vector defined by a right-hand rule (B, a cross product of two polar vectors) is
       reflected and reversed: the determinant of the reflection is −1. Exact: linear algebra. */
    function reflexion(v, n) { v3(v, "v"); const u = unit(n, "n"), k = 2 * dot(v, u); return v.map((x, i) => x - k * u[i]); }
    function imageAxiale(v, n) { return reflexion(v, n).map(x => -x); }
    /* wires along z, [{ I, x, y }] (ChampsEM convention, current along +z): their image in the mirror of normal n. n in the
       plane (n_z = 0): positions reflected, currents kept (j_z is unchanged). n along z: positions kept, currents reversed.
       Any other mirror tilts the wires out of the convention: refused. */
    function filsMiroir(fils, n) {
      const u = unit(n, "n");
      if (Math.abs(u[2]) > 1e-12 && Math.abs(Math.abs(u[2]) - 1) > 1e-12) err("miroir vertical (n_z = 0) ou horizontal (n selon z) attendu");
      return fils.map(w => { const p = reflexion([fini(w.x, "x"), fini(w.y, "y"), 0], u), s = Math.sign(dot([0, 0, 1], reflexion([0, 0, 1], u)));
        return { I: s * fini(w.I, "I"), x: p[0], y: p[1] }; });
    }
    /* B of the wires at p = [x, y, z] (independent of z): ChampsEM.champB, superposition of μ0 I/(2π r) */
    function champFils(fils, p) { const b = ChampsEM.champB(fils, p[0], p[1]); return [b.bx, b.by, 0]; }
    /* force per metre on each wire from all the others, N·m⁻¹: I ẑ ∧ B(the others) (13.11 per unit length). Infinite, thin,
       straight, parallel wires: the field of a wire on itself has no net force. */
    function forcesFils(fils) {
      return fils.map((w, k) => { const B = champFils(fils.filter((_, j) => j !== k), [w.x, w.y, 0]); return cross([0, 0, w.I], B); });
    }

    /* §14-1. The uniform field B0 ẑ and a family of its vector potentials (T·m): the symmetric one (14.8), plus the gradient
       of ψ = λ B0 x y/2 + ν B0 (x² + y²)/4. λ = −1: A = (−B0 y, 0); λ = +1: A = (0, B0 x); ν ≠ 0 adds a radial part whose
       divergence is ν B0. Curl B0 ẑ for every λ, ν (exact). p = [x, y] or [x, y, z]; A has the same number of components. */
    function potentielUniforme(B0, lambda, nu) {
      fini(B0, "B0"); fini(lambda, "lambda"); nu = nu == null ? 0 : fini(nu, "nu");
      return p => { const x = p[0], y = p[1], A = [-(1 - lambda) * B0 * y / 2 + nu * B0 * x / 2, (1 + lambda) * B0 * x / 2 + nu * B0 * y / 2];
        return p.length === 3 ? A.concat(0) : A; };
    }
    function jaugeUniforme(B0, lambda, nu) {
      fini(B0, "B0"); fini(lambda, "lambda"); nu = nu == null ? 0 : fini(nu, "nu");
      return p => lambda * B0 * p[0] * p[1] / 2 + nu * B0 * (p[0] * p[0] + p[1] * p[1]) / 4;
    }

    /* §14-2. A circular loop, radius R, current I, in the plane z = 0, centred on the z axis, current counterclockwise seen
       from +z. Complete elliptic integrals K(m), E(m), parameter m = k², 0 ≤ m < 1, by the arithmetic-geometric mean
       (quadratic convergence: 1e-15 in 6 steps for m ≤ 0,999). */
    function elliptiques(m) {
      fini(m, "m"); if (m < 0 || m >= 1) err("m doit vérifier 0 ≤ m < 1");
      let a = 1, b = Math.sqrt(1 - m), c = Math.sqrt(m), s = c * c / 2, p = 0.5;
      for (let i = 0; i < 40 && Math.abs(c) > 1e-16; i++) { const a1 = (a + b) / 2; c = (a - b) / 2; b = Math.sqrt(a * b); a = a1; p *= 2; s += p * c * c; }
      const K = Math.PI / (2 * a);
      return { K, E: K * (1 - s) };
    }
    /* exact field of the loop: A_φ (T·m), B_ρ, B_z (T) at (ρ, z). Thin wire: holds at distances from the wire ≫ its
       radius; NaN on the wire itself. Standard closed forms with k² = 4Rρ/((R + ρ)² + z²). */
    function spireExacte(I, R, rho, z) {
      fini(I, "I"); fini(R, "R"); fini(rho, "rho"); fini(z, "z");
      if (!(R > 0) || rho < 0) err("il faut R > 0 et rho ≥ 0");
      const s2 = (R + rho) ** 2 + z * z, d2 = (R - rho) ** 2 + z * z, m = 4 * R * rho / s2;
      if (!(d2 > 0)) return { Aphi: NaN, Brho: NaN, Bz: NaN };
      const { K, E } = elliptiques(m), s = Math.sqrt(s2), c = MU0 * I / (2 * Math.PI * s);
      const Bz = c * (K + (R * R - rho * rho - z * z) / d2 * E);
      if (rho < 1e-12 * R) return { Aphi: 0, Brho: 0, Bz };
      return { Aphi: MU0 * I / (Math.PI * Math.sqrt(m)) * Math.sqrt(R / rho) * ((1 - m / 2) * K - E), Brho: c * z / rho * (-K + (R * R + rho * rho + z * z) / d2 * E), Bz };
    }
    /* the loop cut into N current elements { p, Idl } (A·m): the middle of each of N equal arcs, Idl tangent, of length the
       arc 2πR/N. Summing over them is the midpoint rule on the circle: for a smooth periodic integrand, the error falls
       faster than any power of 1/N, like (d/R)^N far from the wire, slowly when the point nears the wire (distance d ≲ 2πR/N). */
    function spireElements(I, R, N) {
      fini(I, "I"); fini(R, "R"); if (!(R > 0)) err("R > 0 attendu"); if (!(Number.isInteger(N) && N >= 2)) err("N doit être un entier ≥ 2");
      return Array.from({ length: N }, (_, k) => { const t = 2 * Math.PI * (k + 0.5) / N, l = I * 2 * Math.PI * R / N;
        return { p: [R * Math.cos(t), R * Math.sin(t), 0], Idl: [-l * Math.sin(t), l * Math.cos(t), 0] }; });
    }
    const distance = (e, p) => { const r = Math.hypot(p[0] - e.p[0], p[1] - e.p[1], p[2] - e.p[2]); return r > 0 ? r : NaN; };
    /* (14.19) discretised: A = μ0/(4π) Σ I dl / r, each Cartesian component summed like an electrostatic potential */
    function potentielElements(els, p) {
      v3(p, "p"); const A = [0, 0, 0];
      for (const e of els) { const r = distance(e, p); for (let i = 0; i < 3; i++) A[i] += MU0 / (4 * Math.PI) * e.Idl[i] / r; }
      return A;
    }
    /* Biot and Savart, for comparison: B = μ0/(4π) Σ I dl ∧ (p − q)/|p − q|³ */
    function champElements(els, p) {
      v3(p, "p"); const B = [0, 0, 0];
      for (const e of els) { const d = [p[0] - e.p[0], p[1] - e.p[1], p[2] - e.p[2]], r = distance(e, p), c = cross(e.Idl, d);
        for (let i = 0; i < 3; i++) B[i] += MU0 / (4 * Math.PI) * c[i] / (r * r * r); }
      return B;
    }
    /* the mistake (14.19) warns against: summing the azimuthal component as if it were Cartesian, μ0/(4π) Σ |I dl|/r.
       Wrong everywhere, and visibly on the axis, where the true A is zero. */
    function aphiNaif(els, p) { v3(p, "p"); return els.reduce((s, e) => s + MU0 / (4 * Math.PI) * Math.hypot(...e.Idl) / distance(e, p), 0); }

    Object.assign(api, { reflexion, imageAxiale, filsMiroir, champFils, forcesFils, potentielUniforme, jaugeUniforme,
      elliptiques, spireExacte, spireElements, potentielElements, champElements, aphiNaif });
  }

  /* ---------- Étape « Théorème d'Ampère et relativité » (II.13.4 à 13.7) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const AV = () => (node ? require("./analyse-vectorielle.js") : root.AnaVec);
    const CEM = () => (node ? require("./lecons/champs-em.js") : root.ChampsEM);
    const MU0 = Cst.mu0, EPS0 = Cst.eps0, C = Cst.c, TAU = 2 * Math.PI;
    const err = m => { throw new Error("Ampère et relativité : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const entier = (n, nom, min) => { if (!(Number.isInteger(n) && n >= min)) err(nom + " doit être un entier ≥ " + min); return n; };

    /* §13-4. Closed paths of the plane, t ∈ [0, 1] → [x, y], counterclockwise unless said otherwise (normal +z, right-hand
       rule). cercle and carre are AnaVec's; etoile is a smooth non-convex curve r = R (1 + 0,4 cos kθ); double runs the
       circle twice; huit is a figure of eight x = R sin θ, y = −(R/2) sin 2θ: its right lobe runs counterclockwise, its left
       lobe clockwise. Exact curves; the integrals over them are approximate (midpoint rule). */
    const contoursAmpere = {
      cercle: (c, R) => AV().cercle(c, pos(R, "R")),
      carre: (c, a) => { pos(a, "a"); return AV().rectangle(c[0] - a / 2, c[1] - a / 2, c[0] + a / 2, c[1] + a / 2); },
      etoile: (c, R, k) => { pos(R, "R"); k = k == null ? 5 : entier(k, "k", 2);
        return t => { const th = TAU * t, r = R * (1 + 0.4 * Math.cos(k * th)); return [c[0] + r * Math.cos(th), c[1] + r * Math.sin(th)]; }; },
      double: (c, R) => { pos(R, "R"); return t => [c[0] + R * Math.cos(2 * TAU * t), c[1] + R * Math.sin(2 * TAU * t)]; },
      huit: (c, R) => { pos(R, "R"); return t => { const th = TAU * t; return [c[0] + R * Math.sin(th), c[1] - R / 2 * Math.sin(2 * th)]; }; },
    };
    /* winding number of the closed path around the point p: Σ of the angle increments over n chords, divided by 2π,
       rounded. Exact (an integer) when every chord subtends less than π; NaN when the path passes through p. */
    function enlacements(chemin, p, n) {
      n = n == null ? 2000 : entier(n, "n", 8);
      let s = 0, a = chemin(0), a0 = Math.atan2(a[1] - p[1], a[0] - p[0]);
      if (a[0] === p[0] && a[1] === p[1]) return NaN;
      for (let i = 1; i <= n; i++) {
        const b = chemin(i / n), dx = b[0] - p[0], dy = b[1] - p[1];
        if (!(dx * dx + dy * dy > 0)) return NaN;
        const a1 = Math.atan2(dy, dx); let d = a1 - a0;
        if (d > Math.PI) d -= TAU; else if (d < -Math.PI) d += TAU;
        s += d; a0 = a1;
      }
      return Math.round(s / TAU);
    }
    /* (13.16) checked: ∮ B · ds of infinite straight wires [{ I, x, y }] (current along +z, ChampsEM.champB) along the closed
       path, T·m, n chords (AnaVec.circulation); and Σ I × winding number, A: Ampère says the first is μ0 times the second.
       Error of the circulation of order (chord/distance to the nearest wire)². */
    function circulationFils(fils, chemin, n) {
      n = n == null ? 4000 : entier(n, "n", 8);
      return AV().circulation(q => { const b = CEM().champB(fils, q[0], q[1]); return [b.bx, b.by]; }, chemin, n);
    }
    function courantEnlaceContour(fils, chemin, n) { return fils.reduce((s, w) => s + fini(w.I, "I") * enlacements(chemin, [w.x, w.y], n), 0); }

    /* (13.17) and its extension inside: a straight wire of radius a, current I spread uniformly over its section, at the
       distance r from the axis. μ0 I r/(2π a²) inside, μ0 I/(2π r) outside, T. Infinite wire, steady current (no skin effect). */
    function filEpais(I, a, r) {
      fini(I, "I"); pos(a, "a"); fini(r, "r"); r = Math.abs(r);
      return r < a ? MU0 * I * r / (TAU * a * a) : MU0 * I / (TAU * r);
    }
    /* (13.19): μ0 n I, n turns per metre, inside an infinite solenoid. */
    function solenoideInfini(n, I) { return MU0 * pos(n, "n") * fini(I, "I"); }
    /* B_z on the axis of a solenoid of finite length L, radius R, centred at z = 0, as a uniform sheet of current n I per
       metre: (μ0 n I/2) [cos α₊ − cos α₋], the two ends seen from the point. Closed form; a winding of N turns differs by
       a ripple of relative order exp(−2π n d) at the distance d from the winding (1/n the pitch). */
    function solenoideAxe(n, I, R, L, z) {
      pos(n, "n"); fini(I, "I"); pos(R, "R"); pos(L, "L"); fini(z, "z");
      const p = z + L / 2, m = z - L / 2;
      return MU0 * n * I / 2 * (p / Math.hypot(p, R) - m / Math.hypot(m, R));
    }
    /* the same solenoid as N circular turns (spireExacte of the step « Potentiel vecteur », exact for each turn) at the
       middles of N equal slices of [−L/2, L/2]: { Brho, Bz } at (rho, z), on and off the axis, inside and outside. */
    function solenoideSpires(N, I, R, L, rho, z) {
      entier(N, "N", 1); fini(I, "I"); pos(R, "R"); pos(L, "L"); fini(rho, "rho"); fini(z, "z");
      if (typeof api.spireExacte !== "function") err("spireExacte (étape « Potentiel vecteur ») manque");
      let Brho = 0, Bz = 0;
      for (let k = 0; k < N; k++) { const b = api.spireExacte(I, R, Math.abs(rho), z - (-L / 2 + (k + 0.5) * L / N)); Brho += b.Brho; Bz += b.Bz; }
      return { Brho: rho < 0 ? -Brho : Brho, Bz };
    }

    /* §13-6, §13-7. Lorentz factor; |v| < c. */
    function gammaLorentz(v) { fini(v, "v"); if (!(Math.abs(v) < C)) err("|v| doit être < c"); return 1 / Math.sqrt((1 - v / C) * (1 + v / C)); }
    /* (13.35), left: the event { t, x, y, z } seen from a frame moving at u along x (origins together at t = 0). Exact. */
    function boostEvenement(e, u) {
      const g = gammaLorentz(u);
      return { t: g * (fini(e.t, "t") - u * fini(e.x, "x") / (C * C)), x: g * (e.x - u * e.t), y: fini(e.y, "y"), z: fini(e.z, "z") };
    }
    /* (13.34): a population of charges, density rho0 in its own rest frame (C·m⁻³, or C·m⁻¹ for a line), moving at
       v = [vx, vy, vz]: { rho: γ rho0, j: γ rho0 v }. Exact: lengths contract along v, charge is invariant. */
    function quadricourant(rho0, v) {
      fini(rho0, "rho0"); if (!Array.isArray(v) || v.length !== 3) err("v doit être un vecteur à 3 composantes");
      const g = gammaLorentz(Math.hypot(v.map((x, i) => fini(x, "v[" + i + "]"))[0], v[1], v[2]));
      return { rho: g * rho0, j: v.map(x => g * rho0 * x) };
    }
    /* (13.35), right: { rho, j } seen from a frame moving at u along x. Exact (a four-vector, like (t, x)). */
    function boostCourant(k, u) {
      const g = gammaLorentz(u), jx = fini(k.j[0], "jx");
      return { rho: g * (fini(k.rho, "rho") - u * jx / (C * C)), j: [g * (jx - u * k.rho), fini(k.j[1], "jy"), fini(k.j[2], "jz")] };
    }
    /* c²ρ² − j², the same in every frame; = c² rho0² for one population, < 0 for a neutral wire that carries a current */
    function invariantCourant(k) { return C * C * k.rho * k.rho - k.j.reduce((s, x) => s + x * x, 0); }
    function sommeCourants(list) { return list.reduce((s, k) => ({ rho: s.rho + k.rho, j: s.j.map((x, i) => x + k.j[i]) }), { rho: 0, j: [0, 0, 0] }); }

    /* §13-6, a wire along x, neutral in S: ions of charge lambda per metre (C·m⁻¹, > 0) at rest, electrons −lambda per metre
       moving at v. A test charge q at the distance r moves at v0 along x. S: B and the magnetic force (13.20). S' (the frame
       of q): the densities by contraction, ions γ0 lambda (13.24), electrons γ(w) × their rest density −lambda/γ(v), w their
       speed in S' (composition of velocities); the net charge, its field E' and the electric force (13.28), (13.29). The net
       charge also comes from (13.35): both routes must agree. Signed components along +y (the direction from the wire to q):
       F < 0 pulls q toward the wire. Exact for an infinite thin wire; ignores the field of q on the wire. */
    function filEnMouvement(o) {
      const lambda = pos(o.lambda, "lambda"), v = fini(o.v, "v"), v0 = fini(o.v0, "v0"), r = pos(o.r, "r"), q = fini(o.q, "q");
      const g0 = gammaLorentz(v0), gv = gammaLorentz(v), w = (v - v0) / (1 - v * v0 / (C * C)), gw = gammaLorentz(w);
      const I = -lambda * v, B = MU0 * I / (TAU * r), F = -q * v0 * B;
      const ions = g0 * lambda, electrons = gw * (-lambda / gv);
      /* the net charge from (13.35): ρ = 0 exactly in S, so no cancellation; ions + electrons loses every digit when
         v v0/c² < 10⁻¹⁶ (a real wire), it is returned as lambdaContraction for the check */
      const k = boostCourant(sommeCourants([{ rho: lambda, j: [0, 0, 0] }, { rho: -lambda, j: [-lambda * v, 0, 0] }]), v0), lp = k.rho;
      const Ep = lp / (TAU * EPS0 * r), Bp = MU0 * k.j[0] / (TAU * r);
      return { gamma0: g0, S: { lambda: 0, I, E: 0, B, F }, Sp: { ions, electrons, lambdaContraction: ions + electrons, lambda: lp, I: k.j[0], E: Ep, B: Bp, F: q * Ep }, rapport: q * Ep / F };
    }
    /* (13.31)–(13.33): the transverse impulses F Δt in S and F' Δt' in S', Δt = γ0 Δt' (the clock of q runs in S'). Ratio 1. */
    function impulsions(m, dtp) { pos(dtp, "dtp"); const dp = m.S.F * m.gamma0 * dtp, dpp = m.Sp.F * dtp; return { dp, dpp, rapport: dpp / dp }; }
    /* a copper wire of section S (m²) carrying I: lambda of its ions (C·m⁻¹) and the drift speed of its electrons
       (ChampsEM.nCuivre: one free electron per atom) */
    function filCuivre(I, S) { pos(S, "S"); fini(I, "I"); const lambda = CEM().nCuivre() * Cst.e * S; return { lambda, v: I / lambda }; }

    Object.assign(api, { contoursAmpere, enlacements, circulationFils, courantEnlaceContour, filEpais, solenoideInfini, solenoideAxe,
      solenoideSpires, gammaLorentz, boostEvenement, quadricourant, boostCourant, invariantCourant, sommeCourants, filEnMouvement,
      impulsions, filCuivre });
  }

  /* ---------- Étape « Potentiel vecteur de circuits simples » (II.14.3 à 14.5) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, K = MU0 / (4 * Math.PI);
    const err = m => { throw new Error("circuits simples : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const p3 = p => { if (!Array.isArray(p) || (p.length !== 2 && p.length !== 3)) err("point [x, y] ou [x, y, z] attendu"); return p.length === 2 ? [p[0], p[1], 0] : p; };

    /* §14-3. A long straight wire along z, radius a, current I (along +z when I > 0), uniform over the section (direct
       current, or skin depth ≫ a). (14.20): j = I/(π a²) inside, 0 outside. */
    function filJ(I, a) { fini(I, "I"); pos(a, "a"); return I / (Math.PI * a * a); }
    /* A_z at the distance r of the axis (T·m), the constant chosen so that A_z = 0 on the surface r = a.
       Outside, (14.21): −μ0 I/(2π) ln(r/a). Inside: −μ0 I (r²/a² − 1)/(4π), the potential of a uniformly charged cylinder
       with ρ/ε0 → μ0 j. Infinite wire: holds at distances from the middle of a straight run of length L while r ≪ L. */
    function filA(I, a, r) {
      fini(I, "I"); pos(a, "a"); fini(r, "r"); if (r < 0) err("r ≥ 0 attendu");
      return r <= a ? -MU0 * I * (r * r / (a * a) - 1) / (4 * Math.PI) : -MU0 * I / (2 * Math.PI) * Math.log(r / a);
    }
    /* |B| (T), azimuthal, (14.24) outside: μ0 I/(2π r); inside μ0 I r/(2π a²): filEpais of the step « Théorème d'Ampère et
       relativité », reused. Signed like I (B along ẑ ∧ r̂ for I > 0). */
    const filB = (I, a, r) => { if (typeof api.filEpais !== "function") err("filEpais (étape « Théorème d'Ampère et relativité ») manque"); return api.filEpais(I, a, r); };
    /* the same as fields of space p = [x, y, z] → vector: A = (0, 0, A_z), B = B(r) (−y/r, x/r, 0), (14.22) and (14.23) */
    function filChampA(I, a) { filJ(I, a); return p => [0, 0, filA(I, a, Math.hypot(p[0], p[1]))]; }
    function filChampB(I, a) {
      filJ(I, a);
      return p => { const r = Math.hypot(p[0], p[1]); if (r === 0) return [0, 0, 0]; const b = filB(I, a, r) / r; return [-b * p[1], b * p[0], 0]; };
    }

    /* A thin straight segment from P1 to P2 carrying I (from P1 to P2), at the point P: closed forms of (14.19) and of Biot and
       Savart. û the unit vector along the segment, r_i = P − P_i, s_i = û·r_i, d the distance of P to the line.
       A = μ0 I/(4π) û ln((|r1| + s1)/(|r2| + s2)), written without cancellation behind the segment.
       B = μ0 I/(4π) (û ∧ r1)/d² (s1/|r1| − s2/|r2|). A segment alone does not conserve charge: only closed circuits are
       physical, but the sum over a closed polygon is exact for that polygon (thin wire: distances ≫ its radius).
       NaN on the segment; B = 0 on its line outside it. */
    function geomSegment(P1, P2, P) {
      v3(P1, "P1"); v3(P2, "P2"); const Q = v3(p3(P), "P"), L = Math.sqrt(dot(sub(P2, P1), sub(P2, P1)));
      if (!(L > 0)) err("segment de longueur nulle");
      const u = sub(P2, P1).map(x => x / L), r1 = sub(Q, P1), r2 = sub(Q, P2), s1 = dot(u, r1), s2 = dot(u, r2);
      const n1 = Math.sqrt(dot(r1, r1)), n2 = Math.sqrt(dot(r2, r2)), w = cross(u, r1), d2 = dot(w, w);
      return { u, s1, s2, n1, n2, w, d2, L, sur: d2 <= 1e-24 * L * L && s1 >= 0 && s2 <= 0 };
    }
    function segmentA(I, P1, P2, P) {
      fini(I, "I"); const g = geomSegment(P1, P2, P);
      if (g.sur) return [NaN, NaN, NaN];
      const l = g.s1 < 0 ? Math.log((g.n2 - g.s2) / (g.n1 - g.s1)) : Math.log((g.n1 + g.s1) / (g.n2 + g.s2));
      return g.u.map(x => K * I * l * x);
    }
    function segmentB(I, P1, P2, P) {
      fini(I, "I"); const g = geomSegment(P1, P2, P);
      if (g.sur) return [NaN, NaN, NaN];
      if (g.d2 <= 1e-24 * g.L * g.L) return [0, 0, 0];
      const k = K * I * (g.s1 / g.n1 - g.s2 / g.n2) / g.d2;
      return g.w.map(x => k * x);
    }
    /* a closed polygon of vertices [[x, y, z]…] (the last joined to the first), current I in the order of the vertices */
    const polygone = s => { if (!Array.isArray(s) || s.length < 3) err("il faut au moins trois sommets"); return s.map((v, i) => v3(v, "sommet " + i)); };
    function circuitA(I, sommets, P) {
      const s = polygone(sommets), A = [0, 0, 0];
      s.forEach((v, i) => { const a = segmentA(I, v, s[(i + 1) % s.length], P); for (let k = 0; k < 3; k++) A[k] += a[k]; });
      return A;
    }
    function circuitB(I, sommets, P) {
      const s = polygone(sommets), B = [0, 0, 0];
      s.forEach((v, i) => { const b = segmentB(I, v, s[(i + 1) % s.length], P); for (let k = 0; k < 3; k++) B[k] += b[k]; });
      return B;
    }
    /* the rectangle a (along x) × b (along y) of the plane z = 0, centred at the origin, run counterclockwise seen from +z:
       its moment is +I a b ẑ. The regular n-gon of radius R (vertices on the circle), same orientation. */
    function rectangle(a, b) { pos(a, "a"); pos(b, "b"); return [[a / 2, -b / 2, 0], [a / 2, b / 2, 0], [-a / 2, b / 2, 0], [-a / 2, -b / 2, 0]]; }
    function polygoneRegulier(R, n, z) {
      pos(R, "R"); if (!(Number.isInteger(n) && n >= 3)) err("n doit être un entier ≥ 3"); z = z == null ? 0 : fini(z, "z");
      return Array.from({ length: n }, (_, k) => { const t = 2 * Math.PI * k / n; return [R * Math.cos(t), R * Math.sin(t), z]; });
    }
    /* vector area ½ Σ r_i ∧ r_{i+1} (m²): its norm is the area for a plane polygon, its direction the right-hand normal */
    function aireVectorielle(sommets) {
      const s = polygone(sommets), S = [0, 0, 0];
      s.forEach((v, i) => { const c = cross(v, s[(i + 1) % s.length]); for (let k = 0; k < 3; k++) S[k] += c[k] / 2; });
      return S;
    }

    /* §14-4. An ideal solenoid along z: n turns per metre, current I, radius a, infinitely long (holds in the middle of a
       coil of length ℓ while a ≪ ℓ and the turns are close, pitch ≪ a). Surface current J = n I (A·m⁻¹).
       A is azimuthal (T·m): inside μ0 n I r/2, outside (14.27): μ0 n I a²/(2 r). B along z: μ0 n I inside, 0 outside,
       μ0 n I/2 on the sheet itself (the mean of the two sides). */
    function solenoideA(n, I, a, r) {
      fini(n, "n"); fini(I, "I"); pos(a, "a"); fini(r, "r"); if (r < 0) err("r ≥ 0 attendu");
      return r <= a ? MU0 * n * I * r / 2 : MU0 * n * I * a * a / (2 * r);
    }
    function solenoideB(n, I, a, r) {
      fini(n, "n"); fini(I, "I"); pos(a, "a"); fini(r, "r"); if (r < 0) err("r ≥ 0 attendu");
      return r < a ? MU0 * n * I : r > a ? 0 : MU0 * n * I / 2;
    }
    /* as a field of space: A = A(r) (−y/r, x/r, 0); (14.25) and (14.26) outside, with K = μ0 n I a²/2 */
    function solenoideChampA(n, I, a) {
      solenoideA(n, I, a, 0);
      return p => { const r = Math.hypot(p[0], p[1]); if (r === 0) return p.length === 2 ? [0, 0] : [0, 0, 0];
        const A = solenoideA(n, I, a, r) / r, v = [-A * p[1], A * p[0]]; return p.length === 2 ? v : v.concat(0); };
    }
    /* A long cylinder of radius a, charge σ per m² on its surface, turning at ω about its axis (rad·s⁻¹, positive
       counterclockwise seen from +z). Surface current J = σ a ω, so a solenoid with n I = J: B = μ0 σ a ω ẑ inside.
       A thin radial conducting wire turns with it, from the axis to the surface: each of its carriers, of speed ω r, feels
       q (v ∧ B) = q ω r B r̂, outward for q > 0. At equilibrium an electric field cancels it along the wire: the surface end
       is at the potential U = ω B a²/2 above the axis end (V). For σ > 0, the axis end is negative.
       Holds while ω a ≪ c (non-relativistic speeds), and in the laboratory frame, which is inertial; the field of the wire's
       own charges and the field E of the cylinder (zero inside a long uniform cylinder) are left out. */
    function cylindreTournant(sigma, a, omega) {
      fini(sigma, "sigma"); pos(a, "a"); fini(omega, "omega");
      const J = sigma * a * omega, B = MU0 * J;
      return { J, B, U: omega * B * a * a / 2, v: Math.abs(omega) * a };
    }

    /* §14-5. A small plane loop of moment μ = I S (vector, A·m², (14.33), along the right-hand normal), at the origin, seen
       from R ≫ its size. (14.34): A = μ0/(4π) μ ∧ R/R³. B = μ0/(4π) (3 (μ·R̂) R̂ − μ)/R³, (14.35) and (14.36) for μ along z:
       the field of an electric dipole with p/ε0 → μ0 μ. Leading term of the far field: the error of order (size/R)².
       NaN at the origin. */
    function moment(I, sommets) { fini(I, "I"); return aireVectorielle(sommets).map(x => I * x); }
    function dipoleA(mu, P) {
      v3(mu, "mu"); const R = v3(p3(P), "P"), r = Math.sqrt(dot(R, R)); if (!(r > 0)) return [NaN, NaN, NaN];
      return cross(mu, R).map(x => K * x / (r * r * r));
    }
    function dipoleB(mu, P) {
      v3(mu, "mu"); const R = v3(p3(P), "P"), r = Math.sqrt(dot(R, R)); if (!(r > 0)) return [NaN, NaN, NaN];
      const m = dot(mu, R) / (r * r);
      return R.map((x, i) => K * (3 * m * x - mu[i]) / (r * r * r));
    }
    /* { Bz, Bperp } for μ along z, at the distance R and the angle θ from z: μ0 μ/(4π R³) (3 cos²θ − 1) and 3 cos θ sin θ */
    function composantesDipoleB(mu, R, theta) {
      fini(mu, "mu"); pos(R, "R"); fini(theta, "theta");
      const k = K * mu / (R * R * R), c = Math.cos(theta), s = Math.sin(theta);
      return { Bz: k * (3 * c * c - 1), Bperp: k * 3 * c * s };
    }

    Object.assign(api, { filJ, filA, filChampA, filChampB, segmentA, segmentB, circuitA, circuitB, rectangle, polygoneRegulier,
      aireVectorielle, solenoideA, solenoideB, solenoideChampA, cylindreTournant, moment, dipoleA, dipoleB, composantesDipoleB });
  }

  /* ---------- Étape « Loi de Biot et Savart et dipôle magnétique » (II.14.6, 14.7 et 15.1) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, TAU = 2 * Math.PI;
    const err = m => { throw new Error("Biot et Savart : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };

    /* §14-6. A circular loop of radius R whose wire has a circular section of radius a < R, the current I spread uniformly
       over the section (direct current; a resistive ring driven by an EMF has j ∝ 1/ρ instead, a correction of order a/R).
       The section is cut into n rings of equal area × 2n sectors; each cell is a thin filament (spireExacte) carrying I/(2n²).
       Outside the wire the average converges fast (relative 1e-10 for n = 40); inside, the log singularity of the nearest
       filaments slows it (relative 1e-4). Measured gap to the thin loop: about a²/(8 R d) on B at the distance d ≪ R from the
       wire axis; a²/(4R²) far away, where the thick loop is a dipole of moment I π (R² + a²/4). */
    function anneauEpais(I, R, a, rho, z, n) {
      fini(I, "I"); pos(R, "R"); pos(a, "a"); fini(rho, "rho"); fini(z, "z");
      if (!(a < R)) err("il faut a < R"); if (rho < 0) err("rho ≥ 0 attendu");
      n = n == null ? 24 : n; if (!(Number.isInteger(n) && n >= 2)) err("n doit être un entier ≥ 2");
      const spire = need("spireExacte"), m = 2 * n; let A = 0, Br = 0, Bz = 0;
      for (let i = 0; i < n; i++) {
        const r = a * Math.sqrt((i + 0.5) / n);
        for (let k = 0; k < m; k++) {
          const t = TAU * (k + 0.5) / m, b = spire(I, R + r * Math.cos(t), rho, z - r * Math.sin(t));
          A += b.Aphi; Br += b.Brho; Bz += b.Bz;
        }
      }
      return { Aphi: A / (n * m), Brho: Br / (n * m), Bz: Bz / (n * m) };
    }

    /* A network of thin wires: branches [{ I, points: [[x, y, z]…] }], each an open polyline run in the order of its points
       with its own current. (14.38) summed branch by branch (segmentA, segmentB: closed forms). A branch alone does not conserve
       charge; the sum is a magnetostatic field only when every node balances (noeuds). */
    const branches3 = br => { if (!Array.isArray(br) || !br.length) err("il faut au moins une branche");
      br.forEach((b, k) => { fini(b.I, "I de la branche " + k); if (!Array.isArray(b.points) || b.points.length < 2) err("branche " + k + " : au moins deux points");
        b.points.forEach((p, i) => v3(p, "branche " + k + ", point " + i)); }); return br; };
    function somme(f, br, P) {
      const s = [0, 0, 0];
      for (const b of branches3(br)) for (let i = 1; i < b.points.length; i++) { const v = f(b.I, b.points[i - 1], b.points[i], P); for (let k = 0; k < 3; k++) s[k] += v[k]; }
      return s;
    }
    function reseauA(br, P) { return somme(need("segmentA"), br, P); }
    function reseauB(br, P) { return somme(need("segmentB"), br, P); }
    /* the ends of the branches, merged when closer than 1e-9 of the network size: Σ I entering − Σ I leaving (A). A closed
       branch (last point = first) balances by itself. */
    function noeuds(br) {
      branches3(br);
      const all = br.flatMap(b => b.points), taille = Math.max(...all.map(p => Math.hypot(...p))) || 1, tol = 1e-9 * taille, liste = [];
      const at = p => { let q = liste.find(e => Math.hypot(e.p[0] - p[0], e.p[1] - p[1], e.p[2] - p[2]) <= tol); if (!q) liste.push(q = { p: p.slice(), bilan: 0 }); return q; };
      for (const b of br) { at(b.points[b.points.length - 1]).bilan += b.I; at(b.points[0]).bilan -= b.I; }
      return liste;
    }

    /* (14.43a): B_z on the axis of a thin circular loop (radius R, current I counterclockwise seen from +z), at height z. From
       (14.43): every element contributes μ0 I ds/(4π r²), r² = R² + z², at the angle whose sine is R/r from the axis; the
       transverse parts cancel in pairs. Thin wire: holds at distances from the wire ≫ its radius. */
    function spireAxe(I, R, z) { fini(I, "I"); pos(R, "R"); fini(z, "z"); return MU0 * I * R * R / (2 * Math.pow(R * R + z * z, 1.5)); }

    /* §15-1. A rectangular frame (current I) near an infinite straight wire along z through the origin (current Iw along +z).
       The frame's sides b are parallel to the wire, its sides a horizontal, centred at c = (x0, 0, 0), turned by theta about
       the vertical line through c: its horizontal side along u = (cos θ, sin θ, 0), its moment I a b n, n = ẑ ∧ u. θ = 0: the
       frame lies in a plane through the wire, n = ŷ is along B, the energy −μ·B is lowest.
       Exact (thin wires, the frame outside the wire): the horizontal sides feel opposite, aligned forces (B does not depend on
       z), the vertical ones I b ẑ ∧ B(p±) at p± = c ± (a/2) u. The energy at fixed I is −I Φ, Φ = b (A_z(p−) − A_z(p+)) the flux
       through the frame, A_z = −μ0 Iw ln r/(2π) (15.8). Dipole route (small frame): U = −μ·B(c) (15.4), C = μ ∧ B(c) (15.2),
       F = ∇(μ·B) at fixed μ (15.10), by central differences. Couples about the vertical line through c (N·m, z component). */
    function cadreFil(o) {
      const Iw = fini(o.Iw, "Iw"), I = fini(o.I, "I"), x0 = pos(o.x0, "x0"), a = pos(o.a, "a"), b = pos(o.b, "b"), th = fini(o.theta == null ? 0 : o.theta, "theta");
      if (!(a / 2 < x0)) err("le cadre doit rester hors du fil : a/2 < x0");
      const u = [Math.cos(th), Math.sin(th), 0], n = [-u[1], u[0], 0], c = [x0, 0, 0];
      const Bw = p => { const r2 = p[0] * p[0] + p[1] * p[1], k = MU0 * Iw / (TAU * r2); return [-k * p[1], k * p[0], 0]; };
      const Az = p => -MU0 * Iw / TAU * Math.log(Math.hypot(p[0], p[1]));
      const pp = c.map((x, i) => x + a / 2 * u[i]), pm = c.map((x, i) => x - a / 2 * u[i]);
      if (!(Math.hypot(pm[0], pm[1]) > 0)) err("un côté du cadre est sur le fil");
      /* current down the side p+, up the side p−: the right-hand normal is then ẑ ∧ u (checked by moment() in the tests) */
      const sommets = [[pm[0], pm[1], b / 2], [pp[0], pp[1], b / 2], [pp[0], pp[1], -b / 2], [pm[0], pm[1], -b / 2]];
      const fp = cross([0, 0, -I * b], Bw(pp)), fm = cross([0, 0, I * b], Bw(pm)), F = fp.map((x, i) => x + fm[i]);
      const C = cross(pp.map((x, i) => x - c[i]), fp)[2] + cross(pm.map((x, i) => x - c[i]), fm)[2];
      const flux = b * (Az(pm) - Az(pp)), mu = n.map(x => I * a * b * x);
      const muB = p => dot(mu, Bw(p)), h = 1e-6 * x0;
      const Fdip = [0, 1, 2].map(i => { if (i === 2) return 0; const e = [0, 0, 0]; e[i] = h;
        return (muB(c.map((x, k) => x + e[k])) - muB(c.map((x, k) => x - e[k]))) / (2 * h); });
      return { sommets, mu, B: Bw(c), F, C, flux, U: -I * flux, Fdip, Cdip: cross(mu, Bw(c))[2], Udip: -muB(c), champ: Bw };
    }

    Object.assign(api, { anneauEpais, reseauA, reseauB, noeuds, spireAxe, cadreFil });
  }

  /* ---------- Étape « Moteurs, générateurs et transformateurs » (II.16.1 à 16.4) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Cx = node ? require("./lecons/complexes.js") : root.Cx;   // complex numbers { re, im }
    const MU0 = Cst.mu0, TAU = 2 * Math.PI;
    const err = m => { throw new Error("moteurs et générateurs : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const pos0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };

    /* Resistivities at 20 °C (Ω·m), table of Wikipedia « Electrical resistivity and conductivity ». They grow by about
       0,4 % per kelvin near room temperature. */
    const RESISTIVITES = { cuivre: 1.68e-8, aluminium: 2.82e-8 };

    /* The EMF of a moving circuit: ∮ (v ∧ B)·ds along the closed polyline `chemin` (its last point joins the first), each
       segment cut into n pieces, v and B taken at the middle of each piece. vitesse(p) → m·s⁻¹, B a vector or p ↦ B. The
       force per unit charge on the carriers carried along by the wire; static B (no induced E). Midpoint rule: error in 1/n². */
    function femMotionnelle(chemin, vitesse, B, n) {
      if (!Array.isArray(chemin) || chemin.length < 3) err("il faut un chemin fermé d'au moins 3 points");
      chemin.forEach((p, i) => v3(p, "point " + i));
      if (typeof vitesse !== "function") err("vitesse doit être une fonction du point");
      const champ = typeof B === "function" ? B : (v3(B, "B"), () => B);
      n = n == null ? 50 : n; if (!(Number.isInteger(n) && n >= 1)) err("n doit être un entier ≥ 1");
      let e = 0;
      for (let i = 0; i < chemin.length; i++) {
        const a = chemin[i], b = chemin[(i + 1) % chemin.length], d = b.map((x, k) => (x - a[k]) / n);
        for (let j = 0; j < n; j++) { const p = a.map((x, k) => x + (j + 0.5) * d[k]); e += dot(cross(vitesse(p), champ(p)), d); }
      }
      return e;
    }

    /* A flat rigid coil of N turns and area S turning at ω about an axis normal to a uniform, static B. θ = ωt + φ0 is the
       angle between its normal and B. Φ = N B S cos θ (Wb), e = −dΦ/dt = N B S ω sin θ (V). With slip rings the brushes see
       e; with a two-segment commutator they see |e|. Exact for the uniform field; the field of the coil's own current is
       left out (open circuit, or a current small enough). */
    function spireTournante(o) {
      const N = pos(o.N, "N"), B = pos0(o.B, "B"), S = pos(o.S, "S"), w = pos(o.omega, "omega"), p0 = fini(o.phi0 || 0, "phi0");
      const E0 = N * B * S * w;
      return { femMax: E0, efficace: E0 / Math.SQRT2, moyenneRedressee: 2 * E0 / Math.PI, periode: TAU / w,
        flux: t => N * B * S * Math.cos(w * t + p0), fem: t => E0 * Math.sin(w * t + p0), redressee: t => Math.abs(E0 * Math.sin(w * t + p0)) };
    }

    /* A direct-current machine with constant field: E = k ω (V), C = k I (N·m), one constant k (V·s·rad⁻¹ = N·m·A⁻¹) for both:
       E I = C ω is the conservation of energy between the circuit and the shaft. Armature resistance R, supply U, load torque
       Cr (Cr < 0: the shaft is driven), friction and inductance neglected. Steady state: k I = Cr, U = E + R I.
       Modes from the signs of the powers: moteur (electric in, mechanical out), generateur (mechanical in, electric out),
       frein (both in, all turned into heat). Start from rest at fixed U and Cr, inertia J: J dω/dt = k I − Cr, ω(t) =
       ω∞ (1 − e^(−t/τ)), τ = J R/k² (L/R ≪ τ). */
    function machineCC(o) {
      const k = pos(o.k, "k"), R = pos(o.R, "R"), U = fini(o.U, "U"), Cr = fini(o.Cr || 0, "Cr");
      const I = Cr / k, w = (U - R * I) / k, E = k * w, C = k * I;
      const Pel = U * I, Pmeca = C * w, Pjoule = R * I * I;
      const mode = Pel > 0 && Pmeca >= 0 ? "moteur" : Pel < 0 && Pmeca < 0 ? "generateur" : Pel === 0 && Pmeca === 0 ? "vide" : "frein";
      const r = { I, omega: w, E, C, Pel, Pmeca, Pjoule, mode, omegaVide: U / k, Cdemarrage: k * U / R,
        rendement: mode === "moteur" ? Pmeca / Pel : mode === "generateur" ? Pel / Pmeca : null };
      if (o.J != null) { const J = pos(o.J, "J"), tau = J * R / (k * k);
        r.tau = tau; r.demarrage = t => { pos0(t, "t"); const om = w * (1 - Math.exp(-t / tau)); return { omega: om, I: (U - k * om) / R }; }; }
      return r;
    }

    /* Two coupled windings in sinusoidal steady state, complex notation (d/dt → iω, the Laplace transform at s = iω):
       U1 = (R1 + iωL1) I1 + iωM I2,  0 = (R2 + Rc + iωL2) I2 + iωM I1,  U2 = −Rc I2 across the load Rc.
       L2 = L1 (N2/N1)² (same core), M = k √(L1 L2), 0 ≤ k ≤ 1. U1 rms (V), f (Hz). The core is linear and lossless
       (no saturation, no hysteresis, no eddy currents); winding capacitances neglected. Ideal limit: k → 1, R1, R2 → 0,
       ω L1 ≫ Rc (N1/N2)²: U2/U1 → N2/N1, I1/I2 → N2/N1. Powers: P = Re(U I*) with rms phasors. */
    function transformateur(o) {
      const N1 = pos(o.N1, "N1"), N2 = pos(o.N2, "N2"), U1 = pos(o.U1, "U1"), w = TAU * pos(o.f, "f");
      const R1 = pos0(o.R1 || 0, "R1"), R2 = pos0(o.R2 || 0, "R2"), Rc = pos(o.Rc, "Rc"), L1 = pos(o.L1, "L1");
      const kc = fini(o.k == null ? 1 : o.k, "k"); if (kc < 0 || kc > 1) err("k doit être entre 0 et 1");
      const L2 = L1 * (N2 / N1) ** 2, M = kc * Math.sqrt(L1 * L2);
      const Z2 = Cx.c(R2 + Rc, w * L2), jwM = Cx.c(0, w * M);
      const Zin = Cx.add(Cx.c(R1, w * L1), Cx.div(Cx.c(w * w * M * M), Z2));
      const I1 = Cx.div(Cx.c(U1), Zin), I2 = Cx.neg(Cx.div(Cx.mul(jwM, I1), Z2)), U2 = Cx.scale(I2, -Rc);
      const P1 = U1 * I1.re, P2 = Rc * Cx.abs2(I2), pertes = R1 * Cx.abs2(I1) + R2 * Cx.abs2(I2);
      return { L2, M, Zin, I1, I2, U2, rapport: Cx.abs(U2) / U1, ideal: N2 / N1, dephasage: Cx.arg(U2),
        P1, P2, pertes, rendement: P2 / P1, magnetisant: U1 / (w * L1) };
    }

    /* Opening the circuit of a coil (inductance L, resistance R) that carries I0, with a resistor Rp left across it (a lamp,
       Rp roughly constant). The current goes on in the loop coil + Rp: i = I0 e^(−t/τ), τ = L/(R + Rp). The voltage across
       Rp (and across the opened switch, the supply aside) is Rp i: at once Rp I0, whatever the supply was. Energy ½ L I0²,
       all turned into heat, the fraction Rp/(R + Rp) in Rp. Rp → ∞ (nothing across): the voltage is limited only by an arc. */
    function coupureBobine(o) {
      const L = pos(o.L, "L"), R = pos0(o.R || 0, "R"), I0 = fini(o.I0, "I0"), Rp = pos(o.Rp, "Rp");
      const tau = L / (R + Rp);
      return { tau, upic: Rp * I0, energie: L * I0 * I0 / 2, partRp: Rp / (R + Rp),
        i: t => I0 * Math.exp(-pos0(t, "t") / tau), u: t => Rp * I0 * Math.exp(-pos0(t, "t") / tau) };
    }

    /* Two coaxial circular loops of radii R1 (at z = 0) and R2 (at height z): M = Φ/I through loop 2 = 2π R2 Aφ (spireExacte),
       dM/dz = −2π R2 Bρ/I (the force on loop 2 is I1 I2 dM/dz along z). Thin wires: holds at distances ≫ the wire radius. */
    function mutuelleSpires(R1, R2, z) {
      pos(R1, "R1"); pos(R2, "R2"); fini(z, "z");
      const b = need("spireExacte")(1, R1, R2, z);
      return { M: TAU * R2 * b.Aphi, dMdz: -TAU * R2 * b.Brho };
    }
    /* A thin ring of radius R made of round wire of radius a ≪ R, current uniform over the section (skin depth ≫ a):
       L = μ0 R (ln(8R/a) − 7/4), error of order (a/R)² ln(R/a). */
    function inductanceAnneau(R, a) { pos(R, "R"); pos(a, "a"); if (!(a < R / 4)) err("il faut a ≪ R (a < R/4)"); return MU0 * R * (Math.log(8 * R / a) - 1.75); }

    /* Elihu Thomson's ring, air-core model: a coil of N turns lumped into one loop of radius R1 at z = 0, rms current I1 at
       f; a metal ring of radius R2, wire radius a, resistivity rho, density masse (kg·m⁻³), at height z > 0 on the same axis.
       Ring: L di2/dt + R i2 = −N M di1/dt, so with s = iω: I2 = −iω N M I1/(R + iωL), lagging by π/2 + φ, tan φ = ωL/R.
       Mean force ⟨i1 i2⟩ N dM/dz = −I1² N² ω² M L (dM/dz)/(R² + ω²L²): only the part of i2 in phase with i1, which exists
       because of the lag φ. Above the coil dM/dz < 0: a repulsion. R → 0 (a superconducting ring): −I1² N² M (dM/dz)/L.
       An iron core multiplies M; it is left out here. */
    function anneauSauteur(o) {
      const N = pos(o.N, "N"), I1 = pos0(o.I1, "I1"), w = TAU * pos(o.f, "f"), R1 = pos(o.R1, "R1"), R2 = pos(o.R2, "R2");
      const a = pos(o.a, "a"), rho = pos(o.rho, "rho"), masse = pos(o.masse, "masse"), z = fini(o.z, "z"), g = o.g == null ? Cst.g0 : pos(o.g, "g");
      const { M, dMdz } = mutuelleSpires(R1, R2, z), L = inductanceAnneau(R2, a), R = rho * TAU * R2 / (Math.PI * a * a);
      const den = R * R + w * w * L * L, F = -I1 * I1 * N * N * w * w * M * L * dMdz / den;
      const I2 = Cx.neg(Cx.div(Cx.c(0, w * N * M * I1), Cx.c(R, w * L)));
      const m = masse * Math.PI * a * a * TAU * R2;
      return { M, dMdz, L, R, wLsurR: w * L / R, phi: Math.atan2(w * L, R), I2, I2eff: Cx.abs(I2), F, Fsupra: -I1 * I1 * N * N * M * dMdz / L,
        mass: m, poids: m * g, saute: F > m * g, chaleur: R * Cx.abs2(I2) };
    }

    /* Three coils whose axes are 120° apart in a plane (û_k at angle 2πk/3), each making at the centre a field B0 cos(ωt − φ_k)
       along its axis. phases = [φ0, φ1, φ2] (rad), default 0, 2π/3, 4π/3 (balanced three-phase): B turns at ω with constant
       magnitude 3 B0/2. Superposition at one point: exact for linear coils (no saturated iron). Returns [Bx, By] (T). */
    function champTournant(B0, omega, t, phases) {
      fini(B0, "B0"); fini(omega, "omega"); fini(t, "t");
      const ph = phases == null ? [0, TAU / 3, 2 * TAU / 3] : phases;
      if (!Array.isArray(ph) || ph.length !== 3) err("trois phases attendues"); ph.forEach((p, i) => fini(p, "phase " + i));
      let x = 0, y = 0;
      for (let k = 0; k < 3; k++) { const b = B0 * Math.cos(omega * t - ph[k]), u = TAU * k / 3; x += b * Math.cos(u); y += b * Math.sin(u); }
      return [x, y];
    }

    /* A closed ring (resistance R, inductance L) on an axis normal to a field turning at ω; the ring turns at Ω. In the ring's
       frame the field turns at ωg = ω − Ω (the slip speed); the flux through the ring is Φ0 cos(ωg t). Mean torque
       C = ½ ωg Φ0² R/(R² + ωg² L²) (N·m), the Joule power over ωg. Largest, Φ0²/(4L), at ωg = R/L; zero at Ω = ω
       (synchronism). Uniform field over the ring, flux amplitude fixed by the stator (its reaction neglected). */
    function coupleAsynchrone(o) {
      const P0 = pos0(o.Phi0, "Phi0"), R = pos(o.R, "R"), L = pos(o.L, "L"), wg = fini(o.omegaG, "omegaG");
      return { C: 0.5 * wg * P0 * P0 * R / (R * R + wg * wg * L * L), Cmax: P0 * P0 / (4 * L), omegaGmax: R / L };
    }

    /* A three-phase line: power P (W) delivered to a resistive load (cos φ = 1) at the line voltage U (V, between conductors),
       three conductors of length longueur (m), section (m²), resistivity rho. Per conductor R = ρ ℓ/S, current I = P/(√3 U),
       losses 3 R I² = R P²/U²: the fraction R P/U² of P. Valid while that fraction is small (the load voltage is taken as U);
       line inductance and capacitance neglected (short line, ℓ ≪ wavelength 6 000 km at 50 Hz). */
    function ligneTriphasee(o) {
      const P = pos(o.P, "P"), U = pos(o.U, "U"), l = pos(o.longueur, "longueur"), S = pos(o.section, "section"), rho = pos(o.rho, "rho");
      const R = rho * l / S, I = P / (Math.sqrt(3) * U), pertes = 3 * R * I * I;
      return { R, I, pertes, fraction: pertes / P, chute: Math.sqrt(3) * R * I / U };
    }

    /* Eddy-current loss in a sheet of thickness e (m), resistivity rho, in a uniform field B0 sin ωt (amplitude B0, T,
       frequency f) parallel to the sheet: E(x) = x dB/dt across the thickness, mean power per volume σ ⟨E²⟩ =
       π² f² B0² e²/(6 ρ) (W·m⁻³). Holds while e is small against the skin depth √(2ρ/(ω μ)) (the field enters the whole
       sheet) and the sheet is wide against e; hysteresis loss is apart. */
    function pertesFoucaultTole(f, B0, e, rho) {
      pos(f, "f"); pos0(B0, "B0"); pos(e, "e"); pos(rho, "rho");
      return Math.PI ** 2 * f * f * B0 * B0 * e * e / (6 * rho);
    }

    Object.assign(api, { RESISTIVITES, femMotionnelle, spireTournante, machineCC, transformateur, coupureBobine, mutuelleSpires,
      inductanceAnneau, anneauSauteur, champTournant, coupleAsynchrone, ligneTriphasee, pertesFoucaultTole });
  }

  /* ---------- Étape « Trajectoires dans des champs E et B » (II.29.1, 29.2 et 29.8) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const { vectoriel: cross } = node ? require("./tenseurs.js") : root.Tenseurs;
    const C = Cst.c, EPS0 = Cst.eps0;
    const err = m => { throw new Error("trajectoires : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const charge = q => { fini(q, "q"); if (q === 0) err("q = 0 : une particule neutre ne sent aucun champ"); return q; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => Math.hypot(a[0], a[1], a[2]);
    const mul = (k, a) => a.map(x => k * x), add = (a, b) => a.map((x, i) => x + b[i]);
    const champ = (F, nom) => typeof F === "function" ? F : (v3(F || [0, 0, 0], nom), () => F || [0, 0, 0]);

    /* dp/dt = q (E + v ∧ B), p = γ m v, γ = √(1 + p²/(m²c²)): the equation of motion for any speed, step by step (Integ.rk4
       on y = [x, p]). E and B are vectors, or functions (x, t) ↦ vector for fields that vary in space. Neglected: the field of
       the particle itself and the energy it radiates (rayonnementLineaire gives the size). Returns the states every o.every steps:
       { t, x, p, v, gamma }. */
    function lorentzRel(o) {
      const q = charge(o.q), m = pos(o.m, "m"), duree = pos(o.duree, "duree"), n = o.n == null ? 4000 : o.n, every = o.every || 1;
      if (!Number.isInteger(n) || n < 1) err("n, le nombre de pas, doit être un entier ≥ 1");
      const E = champ(o.E, "E"), B = champ(o.B, "B"), x0 = v3(o.x0 || [0, 0, 0], "x0");
      let p0;
      if (o.p0) p0 = v3(o.p0, "p0");
      else { const v0 = v3(o.v0 || [0, 0, 0], "v0"), s = nrm(v0); if (!(s < C)) err("|v0| doit être < c"); p0 = mul(m / Math.sqrt((1 - s / C) * (1 + s / C)), v0); }
      const mc = m * C, etat = (t, y) => { const p = y.slice(3), g = Math.sqrt(1 + dot(p, p) / (mc * mc)); return { t, x: y.slice(0, 3), p, v: mul(1 / (g * m), p), gamma: g }; };
      const f = (t, y) => { const s = etat(t, y), e = E(s.x, t), b = B(s.x, t), w = cross(s.v, b); return s.v.concat([q * (e[0] + w[0]), q * (e[1] + w[1]), q * (e[2] + w[2])]); };
      let y = x0.concat(p0); const h = duree / n, out = [etat(0, y)];
      for (let i = 1; i <= n; i++) { y = Integ().rk4(f, (i - 1) * h, y, h); if (i % every === 0 || i === n) out.push(etat(i * h, y)); }
      return out;
    }

    /* Uniform, stationary E = E e_x, any initial velocity v0: the exact solution of dp/dt = qE. p_x = p_x0 + qEt, the transverse
       momentum p⊥ stays. W = c √(m²c² + p⊥² + p_x²) the energy; x = (W − W0)/(qE); r⊥ = (p⊥ c/qE)[asinh(c p_x/W⊥) − asinh(c p_x0/W⊥)],
       W⊥ = c √(m²c² + p⊥²). From rest: hyperbolic motion. p_x0 = 0: x = (W0/qE)(cosh(qE r⊥/(p⊥c)) − 1), a catenary (chainette).
       newton: the same start under ma = qE, a parabola. tau = mc/|qE|: the time after which Newton is wrong by order 1. */
    function champEUniforme(q, m, E, v0) {
      charge(q); pos(m, "m"); fini(E, "E"); v3(v0, "v0"); if (E === 0) err("il faut E ≠ 0");
      const s = nrm(v0); if (!(s < C)) err("|v0| doit être < c");
      const g0 = 1 / Math.sqrt((1 - s / C) * (1 + s / C)), mc = m * C, F = q * E;
      const px0 = g0 * m * v0[0], pt = [0, g0 * m * v0[1], g0 * m * v0[2]], pT = Math.hypot(pt[1], pt[2]);
      const WT = C * Math.sqrt(mc * mc + pT * pT), W0 = C * Math.sqrt(mc * mc + pT * pT + px0 * px0);
      const W = t => C * Math.sqrt(mc * mc + pT * pT + (px0 + F * t) * (px0 + F * t));
      const a0 = Math.asinh(C * px0 / WT);
      const posT = t => { const k = (Math.asinh(C * (px0 + F * t) / WT) - a0) * C / F; return [k * pt[1], k * pt[2]]; };
      const position = t => { fini(t, "t"); const r = posT(t); return [(W(t) - W0) / F, r[0], r[1]]; };
      const vel = t => { fini(t, "t"); const w = W(t), c2 = C * C; return [(px0 + F * t) * c2 / w, pt[1] * c2 / w, pt[2] * c2 / w]; };
      const a = F / m;
      const newton = { pos: t => [v0[0] * t + a * t * t / 2, v0[1] * t, v0[2] * t], vel: t => [v0[0] + a * t, v0[1], v0[2]] };
      const chainette = px0 === 0 && pT > 0 ? r => (W0 / F) * (Math.cosh(F * r / (pT * C)) - 1) : null;
      return { p0: [px0, pt[1], pt[2]], W0, tau: mc / Math.abs(F), L: mc * C / Math.abs(F), pos: position, vel, gamma: t => W(t) / (mc * C),
        newton, chainette, p: t => [px0 + F * t, pt[1], pt[2]] };
    }

    /* the power a charge radiates on a straight line, Liénard's formula P = q²(dp/dt)²/(6π ε0 m² c³), exact for any speed when
       the force is along v; against the largest power the field can give, |q E| c. */
    function rayonnementLineaire(q, m, E) {
      charge(q); pos(m, "m"); fini(E, "E");
      const F = Math.abs(q * E), P = q * q * F * F / (6 * Math.PI * EPS0 * m * m * C * C * C);
      return { P, rapport: P / (F * C), tau0: q * q / (6 * Math.PI * EPS0 * m * C * C * C) };
    }

    /* (29.1a): the magnetic rigidity Bρ = p/|q| (T·m) of a particle of kinetic energy ec (J), p relativistic: what it takes to
       bend it on a circle of radius ρ. pGeV: p in GeV/c. */
    function rigidite(q, m, ec) {
      charge(q); pos(m, "m"); pos(ec, "ec");
      const mc2 = m * C * C, p = Math.sqrt(ec * (ec + 2 * mc2)) / C;
      return { p, Brho: p / Math.abs(q), pGeV: p * C / (Cst.e * 1e9), gamma: 1 + ec / mc2 };
    }

    /* (29.1b): the 180° spectrometer. B = B e_z fills the half-plane y > 0; the particle enters at the origin with a momentum p
       in the plane, at the angle theta from +y (towards +x). It turns on a circle of radius R = p/(|q|B) (29.1) and leaves on
       the line y = 0 at x = 2R cos θ, towards +x when qB > 0 (clockwise seen from +z), towards −x otherwise.
       arc(n): n + 1 points of the path in the field. Exact for a field uniform up to its edge. */
    function demiCercle(q, B, p, theta) {
      charge(q); fini(B, "B"); if (B === 0) err("il faut B ≠ 0"); pos(p, "p"); fini(theta, "theta");
      if (!(Math.abs(theta) < Math.PI / 2)) err("|theta| doit être < 90° : la particule doit entrer dans le champ");
      const R = p / Math.abs(q * B), s = q * B > 0 ? 1 : -1;
      const u = [Math.sin(theta), Math.cos(theta)], c = [s * R * u[1], -s * R * u[0]];   // the centre, R to the side the force points
      const arc = n => { const a0 = Math.atan2(-c[1], -c[0]), da = Math.PI - 2 * theta * s, out = [];
        for (let i = 0; i <= n; i++) { const a = a0 - s * da * i / n; out.push([c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]); } return out; };
      return { R, x: 2 * c[0], centre: c, arc };
    }

    /* (29.1c) The counter: a slit of width w centred at xc on the line y = 0, the source sending into ±thetaMax. A momentum p
       lands at 2p cos θ/(|q|B): transmission(p) is the fraction of the angles (uniform in θ) that land in the slit. The momenta
       accepted at all: [|q|B(xc − w/2)/2, |q|B(xc + w/2)/(2 cos θmax)]; relative width against p0 = |q|B xc/2: largeur, about
       w/xc (fente) plus θmax²/2 (angles). */
    function spectro180(o) {
      const q = charge(o.q), B = fini(o.B, "B"), xc = pos(o.xc, "xc"), w = pos(o.w, "w"), tm = fini(o.thetaMax, "thetaMax");
      if (B === 0) err("il faut B ≠ 0");
      if (!(w < 2 * xc)) err("la fente doit rester du côté de la sortie : w < 2 xc");
      if (!(tm >= 0 && tm < Math.PI / 2)) err("thetaMax doit être dans [0, 90°)");
      const k = Math.abs(q * B) / 2, p0 = k * xc, pmin = k * (xc - w / 2), pmax = k * (xc + w / 2) / Math.cos(tm);
      function transmission(p) {
        pos(p, "p"); const D = p / k;                                              // the diameter 2R
        const lo = (xc - w / 2) / D, hi = Math.min(1, (xc + w / 2) / D);          // cos θ must lie in [lo, hi]
        if (hi < lo || hi < Math.cos(tm)) return 0;
        if (tm === 0) return 1;
        const tHi = Math.min(tm, Math.acos(Math.max(lo, Math.cos(tm)))), tLo = Math.acos(hi);
        return Math.max(0, tHi - tLo) / tm;
      }
      return { p0, pmin, pmax, largeur: (pmax - pmin) / p0, fente: w / xc, angles: 1 / Math.cos(tm) - 1, transmission };
    }

    /* (29.1d): the axial-field spectrometer. B = B e_z, a source on the axis, momentum p at the angle alpha from the axis. The
       projection on a plane z = const is a circle of radius R = p sin α/(|q|B) through the axis, so ρ = 2R |sin kz| and the
       azimuth about the axis turns by kz, k = |q|B/(2p cos α): back on the axis at zf = π/k = 2π p cos α/(|q|B). Exact in a
       uniform field. angleSolide: the cone of half-angle α, 2π(1 − cos α). */
    function champAxial(q, B, p, alpha) {
      charge(q); fini(B, "B"); if (B === 0) err("il faut B ≠ 0"); pos(p, "p"); fini(alpha, "alpha");
      if (!(alpha > 0 && alpha < Math.PI / 2)) err("alpha doit être dans ]0, 90°[");
      const R = p * Math.sin(alpha) / Math.abs(q * B), k = Math.abs(q * B) / (2 * p * Math.cos(alpha)), s = q * B > 0 ? -1 : 1;
      return { R, k, zf: Math.PI / k, rho: z => 2 * R * Math.abs(Math.sin(k * fini(z, "z"))), phi: z => s * k * fini(z, "z"),
        angleSolide: 2 * Math.PI * (1 - Math.cos(alpha)) };
    }

    /* the drift of the centre of the circle under a constant force F perpendicular to B: F ∧ B/(qB²). F = qE gives E ∧ B/B²,
       the same for every charge and mass. Exact in Newton's mechanics for uniform fields and F ⊥ B; a part of F along B
       accelerates along B instead. */
    function deriveForce(F, q, B) { v3(F, "F"); charge(q); v3(B, "B"); const b2 = dot(B, B); if (!(b2 > 0)) err("il faut B ≠ 0"); return mul(1 / (q * b2), cross(F, B)); }
    function derive(E, B) { v3(E, "E"); v3(B, "B"); const b2 = dot(B, B); if (!(b2 > 0)) err("il faut B ≠ 0"); return mul(1 / b2, cross(E, B)); }

    /* the fields seen from a frame moving at u (|u| < c), exact Lorentz transformation: the parts along u stay; across u,
       E′ = γ(E + u ∧ B), B′ = γ(B − u ∧ E/c²). */
    function boostChamps(E, B, u) {
      v3(E, "E"); v3(B, "B"); v3(u, "u"); const s = nrm(u); if (!(s < C)) err("|u| doit être < c");
      if (s === 0) return { E: E.slice(), B: B.slice(), gamma: 1 };
      const g = 1 / Math.sqrt((1 - s / C) * (1 + s / C)), n = mul(1 / s, u);
      const par = a => mul(dot(a, n), n), per = a => { const pa = par(a); return a.map((x, i) => x - pa[i]); };
      return { E: add(par(E), mul(g, per(add(E, cross(u, B))))), B: add(par(B), mul(g, per(add(B, mul(-1 / (C * C), cross(u, E)))))), gamma: g };
    }

    /* E ⊥ B: the frame where the motion is simple. E < cB: u = E ∧ B/B² removes E, B′ = B/γ is left, a circle ("magnetique").
       E > cB: u = c² E ∧ B/E² removes B, E′ = E/γ is left, an acceleration without end ("electrique"). E = cB: neither. */
    function referentielDerive(E, B) {
      v3(E, "E"); v3(B, "B");
      if (Math.abs(dot(E, B)) > 1e-12 * nrm(E) * nrm(B)) err("ici E doit être perpendiculaire à B");
      const e = nrm(E), cb = C * nrm(B);
      if (Math.abs(e - cb) <= 1e-12 * (e + cb)) err("E = cB : aucun référentiel n'annule l'un des deux champs");
      const type = e < cb ? "magnetique" : "electrique", u = type === "magnetique" ? derive(E, B) : mul(C * C / (e * e), cross(E, B));
      return Object.assign({ type, u }, boostChamps(E, B, u));
    }

    /* Starting at rest in E ⊥ B (Newton): the cycloid rises 2mE/(|q|B²) along E, i.e. 2 v_d/ω. The planar magnetron (cathode
       and anode plates d apart, voltage U): an electron reaches the anode only if B < Bc = √(2mU/|q|)/d (Hull). Coaxial
       cylinders, cathode rc, anode ra: Bc = 2 ra √(2mU/|q|)/(ra² − rc²), the plane again when ra − rc ≪ ra. Electrons emitted
       at rest, no space charge, Newton ((v/c)² = 2eU/(mc²) ≪ 1). The coaxial value follows from the conserved canonical
       angular momentum m r² θ' + q B r²/2 (zero rotation at rc) and energy: at cut-off the electron grazes the anode,
       ra θ' = √(2|q|U/m), whatever the radial profile of E. */
    function hauteurCycloide(q, m, E, B) { charge(q); pos(m, "m"); fini(E, "E"); fini(B, "B"); if (B === 0) err("il faut B ≠ 0"); return 2 * m * Math.abs(E) / (Math.abs(q) * B * B); }
    function coupureHull(o) {
      const m = pos(o.m, "m"), q = charge(o.q), U = pos(o.U, "U"), v = Math.sqrt(2 * m * U / Math.abs(q));
      if (o.d != null) return v / pos(o.d, "d");
      const ra = pos(o.ra, "ra"), rc = fini(o.rc == null ? 0 : o.rc, "rc"); if (!(rc >= 0 && rc < ra)) err("il faut 0 ≤ rc < ra");
      return 2 * ra * v / (ra * ra - rc * rc);
    }

    Object.assign(api, { lorentzRel, champEUniforme, rayonnementLineaire, rigidite, demiCercle, spectro180, champAxial,
      deriveForce, derive, boostChamps, referentielDerive, hauteurCycloide, coupureHull });
  }

  /* ---------- Étape « Énergie des courants permanents » (II.15.2 à 15.6) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, TAU = 2 * Math.PI, HBAR = Cst.hbar, QE = Cst.e, C = Cst.c, ME = Cst.m_e, EPS0 = Cst.eps0;
    const err = m => { throw new Error("énergie des courants : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const entier = (n, nom, min) => { if (!(Number.isInteger(n) && n >= min)) err(nom + " doit être un entier ≥ " + min); return n; };
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };
    const simpson = (f, a, b, n) => { n += n % 2; let s = f(a) + f(b); const h = (b - a) / n;
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };

    /* §15-2. The frame of cadreFil (theta = 0: its moment along the wire's field, the lowest energy) is pushed radially from
       x0 to x1 at constant speed v, both currents held constant by their sources. M(x) = Φ/Iw, the flux through the frame
       per ampere in the wire (cadreFil with Iw = 1). Quasi-static, no kinetic energy, no self-inductance change (rigid frame):
       work of the magnetic forces on the frame I Iw ΔM; the operator supplies −I Iw ΔM; each source supplies I Iw ΔM against
       the EMF induced in its circuit (−Iw dM/dt in the frame, −I dM/dt in the wire, M12 = M21); the field energy grows by
       I Iw ΔM = −ΔU_méca (15.13). The EMF and the powers are given at the start point; the works do not depend on v. */
    function bilanCadreFil(o) {
      const Iw = fini(o.Iw, "Iw"), I = fini(o.I, "I"), a = pos(o.a, "a"), b = pos(o.b, "b"), x0 = pos(o.x0, "x0"), x1 = pos(o.x1, "x1"), v = pos(o.v, "v");
      const M = x => need("cadreFil")({ Iw: 1, I: 1, x0: x, a, b, theta: 0 }).flux;
      const h = 1e-6 * x0, dMdx = (M(x0 + h) - M(x0 - h)) / (2 * h), vx = x1 >= x0 ? v : -v;
      const dM = M(x1) - M(x0), W = I * Iw * dM;
      return { M0: M(x0), M1: M(x1), dM, duree: Math.abs(x1 - x0) / v, Umeca0: -I * Iw * M(x0), Umeca1: -I * Iw * M(x1),
        Wmag: W, Wop: -W, Wcadre: W, Wfil: W, dUtot: W, Fx: I * Iw * dMdx, fem: -Iw * dMdx * vx, Pmag: I * Iw * dMdx * vx, Psource: I * Iw * dMdx * vx };
    }

    /* §15-3. Two thin coaxial loops, radii R1 (at z = 0) and R2 (at height z), currents I1, I2 counterclockwise seen from +z.
       M by four routes: flux of the field of loop 1 through the disc of loop 2 (15.17), Simpson in ρ (n intervals, split at R1);
       circulation of its A around loop 2 (15.19), i.e. mutuelleSpires; Neumann's double integral μ0/(4π) ∮∮ ds1·ds2/r, reduced
       by symmetry to μ0 R1 R2/2 ∫ cos φ/r dφ (trapezoid, exact to rounding for a periodic integrand); and the dipole route
       μ·B (15.16) for a small loop 2, π R2² B_z on the axis. Thin wires: valid at distances ≫ the wire radius; the loops must not
       touch. U = I1 I2 M, the energy (15.19) of loop 2 in the field of loop 1, and also the total interaction energy of the pair
       by (15.20), the ½ removing the double count. */
    function energieDeuxSpires(I1, I2, R1, R2, z, n) {
      fini(I1, "I1"); fini(I2, "I2"); pos(R1, "R1"); pos(R2, "R2"); fini(z, "z");
      n = n == null ? 4000 : entier(n, "n", 8);
      if (!(Math.hypot(R1 - R2, z) > 1e-9 * (R1 + R2))) err("les deux spires se touchent");
      if (z === 0 && R2 > R1) err("z = 0 et R2 > R1 : le disque de la spire 2 coupe le fil de la spire 1, le flux d'un fil fin diverge");
      const spire = need("spireExacte"), Bz = r => spire(1, R1, r, z).Bz * TAU * r;
      const flux = R2 > R1 ? simpson(Bz, 0, R1, Math.ceil(n * R1 / R2)) + simpson(Bz, R1, R2, Math.ceil(n * (R2 - R1) / R2) + 2) : simpson(Bz, 0, R2, n);
      const circulation = need("mutuelleSpires")(R1, R2, z).M;
      const N = 4096, d2 = R1 * R1 + R2 * R2 + z * z; let s = 0;
      for (let k = 0; k < N; k++) { const p = TAU * k / N; s += Math.cos(p) / Math.sqrt(d2 - 2 * R1 * R2 * Math.cos(p)); }
      const neumann = MU0 * R1 * R2 / 2 * s * TAU / N;
      const dipole = Math.PI * R2 * R2 * MU0 * R1 * R1 / (2 * Math.pow(R1 * R1 + z * z, 1.5));
      return { M: circulation, flux, circulation, neumann, dipole, U: I1 * I2 * circulation, Umeca: -I1 * I2 * circulation };
    }

    /* (15.20) on a coaxial cable: inner conductor of radius a carrying I uniformly, return current −I on a thin outer shell of
       radius b; per metre of cable. A_z is obtained from B alone, A_z(r) = ∫_r^b B dr (A = 0 on the shell and outside, where
       B = 0), by Simpson; then ½∫ j A_z dV over the inner conductor (the shell sits at A = 0). Compared with ∫ B²/(2μ0) dV and
       with the closed form μ0 I²/(4π) (ln(b/a) + 1/4). Direct current (uniform j), thin shell, a < b. */
    function coaxJA(I, a, b, n) {
      fini(I, "I"); pos(a, "a"); pos(b, "b"); if (!(a < b)) err("il faut a < b"); n = n == null ? 400 : entier(n, "n", 8);
      const B = r => r < a ? MU0 * I * r / (TAU * a * a) : MU0 * I / (TAU * r);
      const Az = r => (r < a ? simpson(B, r, a, n) : 0) + simpson(B, Math.max(r, a), b, n);
      const j = I / (Math.PI * a * a);
      const jA = 0.5 * simpson(r => j * Az(r) * TAU * r, 0, a, n);
      const champ = simpson(r => B(r) ** 2 / (2 * MU0) * TAU * r, 0, a, n) + simpson(r => B(r) ** 2 / (2 * MU0) * TAU * r, a, b, n);
      return { jA, champ, exact: MU0 * I * I / (2 * TAU) * (Math.log(b / a) + 0.25), A: Az, A0: Az(0), Aa: Az(a) };
    }

    /* §15-4. B of a thin circular loop recovered from A by central differences on Aφ(ρ, z) of spireExacte:
       Bρ = −∂Aφ/∂z, Bz = (1/ρ) ∂(ρ Aφ)/∂ρ, step h (needs ρ > h). Four evaluations of A, each the work of the whole loop;
       truncation error ∝ h², rounding error ∝ ε/h: the measured relative gap ecart is smallest near h ≈ ε^(1/3) × size. */
    function rotationnelSpire(I, R, rho, z, h) {
      fini(I, "I"); pos(R, "R"); pos(rho, "rho"); fini(z, "z"); pos(h, "h"); if (!(h < rho)) err("il faut h < rho");
      const A = (r, zz) => need("spireExacte")(I, R, r, zz).Aphi, ex = need("spireExacte")(I, R, rho, z);
      const Br = -(A(rho, z + h) - A(rho, z - h)) / (2 * h);
      const Bz = ((rho + h) * A(rho + h, z) - (rho - h) * A(rho - h, z)) / (2 * h * rho);
      return { Bnum: [Br, Bz], Bexact: [ex.Brho, ex.Bz], ecart: Math.hypot(Br - ex.Brho, Bz - ex.Bz) / Math.hypot(ex.Brho, ex.Bz), evaluations: 4 };
    }

    /* §15-5. Reduced de Broglie wavelength ƛ = ħ/p of a particle of charge q and mass m accelerated from rest through U
       (relativistic: p c = √(qU (qU + 2 m c²))); electron by default. quantumFlux: 2πħ/|q| (h/e for an electron, h/2e for a
       Cooper pair). phaseMagnetique: the extra phase difference (q/ħ) Φ of (15.34), Φ the flux enclosed between the paths. */
    function longueurOndeReduite(U, q, m) {
      pos(U, "U"); q = q == null ? QE : Math.abs(fini(q, "q")); m = m == null ? ME : pos(m, "m"); if (!(q > 0)) err("il faut q ≠ 0");
      const T = q * U; return HBAR * C / Math.sqrt(T * (T + 2 * m * C * C));
    }
    function quantumFlux(q) { q = q == null ? QE : fini(q, "q"); if (q === 0) err("il faut q ≠ 0"); return TAU * HBAR / Math.abs(q); }
    function phaseMagnetique(q, flux) { fini(q, "q"); fini(flux, "flux"); return q * flux / HBAR; }

    /* Two slits (Fig. 15-5): separation d, width s, screen at L ≫ d, reduced wavelength ƛ, small angles (x ≪ L). The amplitude
       of each slit is a single-slit diffraction (envelope sinc² of s θ/(2ƛ)); their phase difference is δ = (x/L) d/ƛ + phi
       (15.28 and 15.34). o.phi: the Aharonov–Bohm phase of a thin solenoid between the slits (fringes move, envelope stays);
       o.alpha: a classical deflection of both beams, as by the strip of field of width w (15.37)–(15.41), where
       phi = −alpha d/ƛ and the whole pattern moves by L alpha. Returns intensite(x) (1 at the centre without field) and the
       shifts of the central fringe (−L ƛ phi/d, (15.36)) and of the envelope (L alpha). */
    function franges(o) {
      const L = pos(o.L, "L"), d = pos(o.d, "d"), s = pos(o.s, "s"), lb = pos(o.lambdabar, "lambdabar");
      const alpha = fini(o.alpha == null ? 0 : o.alpha, "alpha"), phi = fini(o.phi == null ? 0 : o.phi, "phi") - alpha * d / lb;
      if (!(s < d)) err("il faut s < d : les fentes ne se recouvrent pas");
      const sinc2 = u => (Math.abs(u) < 1e-9 ? 1 : (Math.sin(u) / u) ** 2);
      const intensite = x => { fini(x, "x"); const th = x / L; return sinc2(s * (th - alpha) / (2 * lb)) * Math.cos((th * d / lb + phi) / 2) ** 2; };
      return { intensite, phi, interfrange: TAU * lb * L / d, decalageFranges: -L * lb * phi / d, decalageEnveloppe: L * alpha };
    }

    /* §15-6. A small dipole p(t) = p0 cos ωt along z, seen at distance r and angle theta. Lorenz gauge, retarded potential:
       φ = cos θ/(4π ε0) [p(t')/r² + ṗ(t')/(r c)], t' = t − r/c: exact outside a dipole of size ≪ r and ≪ c/ω. The static
       formula keeps p(t)/r² at the same instant. Ratio of amplitudes √(1 + (kr)²), lag of the retarded one kr − atan kr, k = ω/c. */
    function dipoleOscillant(p0, f, r, theta, t) {
      fini(p0, "p0"); pos(f, "f"); pos(r, "r"); fini(theta, "theta"); fini(t, "t");
      const w = TAU * f, k = w / C, K = p0 * Math.cos(theta) / (4 * Math.PI * EPS0), tp = t - r / C;
      return { retarde: K * (Math.cos(w * tp) / (r * r) - k * Math.sin(w * tp) / r), statique: K * Math.cos(w * t) / (r * r),
        kr: k * r, rapport: Math.sqrt(1 + (k * r) ** 2), retard: k * r - Math.atan(k * r) };
    }

    Object.assign(api, { bilanCadreFil, energieDeuxSpires, coaxJA, rotationnelSpire, longueurOndeReduite, quantumFlux, phaseMagnetique,
      franges, dipoleOscillant });
  }

  /* ---------- Étape « Lentilles et focalisation de faisceaux » (II.29.3 à 29.7) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const C = Cst.c;
    const err = m => { throw new Error("focalisation : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const entier = (n, nom) => { if (!Number.isInteger(n) || n < 1) err(nom + " doit être un entier ≥ 1"); return n; };
    const fonction = (f, nom) => { if (typeof f !== "function") err(nom + " doit être une fonction de z"); return f; };
    const charge = q => { fini(q, "q"); if (q === 0) err("q = 0 : une particule neutre n'est pas focalisée"); return q; };
    const intervalle = (z0, z1) => { fini(z0, "z0"); fini(z1, "z1"); if (!(z1 > z0)) err("il faut z1 > z0"); };
    const simpson = (f, a, b, n) => { n = 2 * Math.ceil(n / 2); const h = (b - a) / n; let s = f(a) + f(b);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };

    /* Axial potentials, V(z) > 0 measured from the cathode (where the particle is at rest), with their derivatives.
       tubes: two coaxial tubes of radius b at V1 and V2, small gap: V = (V1+V2)/2 + (V2−V1)/2 tanh(1,32 z/b), a fit of the
       exact Laplace solution good to about 1 %. einzel: a model lens of width a, potential Vc in the middle, V0 on both sides,
       V = V0 + (Vc − V0) exp(−z²/a²): not a particular electrode shape, a smooth bump with the right symmetry. */
    function potentielTubes(V1, V2, b) {
      pos(V1, "V1"); pos(V2, "V2"); pos(b, "b");
      const w = 1.32 / b, m = (V1 + V2) / 2, d = (V2 - V1) / 2, th = z => Math.tanh(w * z);
      return { V: z => m + d * th(z), dV: z => d * w * (1 - th(z) ** 2), d2V: z => { const t = th(z); return -2 * d * w * w * t * (1 - t * t); },
        extremes: [V1, V2] };
    }
    function potentielEinzel(V0, Vc, a) {
      pos(V0, "V0"); pos(Vc, "Vc"); pos(a, "a");
      const g = z => Math.exp(-(z * z) / (a * a)), k = Vc - V0;
      return { V: z => V0 + k * g(z), dV: z => -2 * k * z / (a * a) * g(z), d2V: z => k * (4 * z * z / a ** 4 - 2 / (a * a)) * g(z),
        extremes: [V0, V0] };
    }
    const potentiel = P => { if (!P || ["V", "dV", "d2V"].some(k => typeof P[k] !== "function")) err("il faut un potentiel { V, dV, d2V }"); return P; };

    /* The paraxial ray equation of an electrostatic lens of revolution, Newton's mechanics (q V ≪ m c²):
       r'' + V'/(2V) r' + V''/(4V) r = 0, ' = d/dz. It holds to first order in r (field E_r = (r/2) V'') and in the slope r'.
       Neither q nor m appears: every ion follows the same ray in the same potential. Integ.rk4 on [r, r'] from z0 to z1.
       Returns n + 1 points { z, r, rp }. */
    function rayonE(P, r0, rp0, z0, z1, n) {
      potentiel(P); fini(r0, "r0"); fini(rp0, "rp0"); intervalle(z0, z1); n = entier(n == null ? 2000 : n, "n");
      const f = (z, y) => { const V = P.V(z); if (!(V > 0)) err("V(z) ≤ 0 en z = " + z + " : la particule s'arrête et repart"); return [y[1], -(P.dV(z) * y[1] / 2 + P.d2V(z) * y[0] / 4) / V]; };
      const h = (z1 - z0) / n, out = [{ z: z0, r: r0, rp: rp0 }]; let y = [r0, rp0];
      for (let i = 1; i <= n; i++) { y = Integ().rk4(f, z0 + (i - 1) * h, y, h); out.push({ z: z0 + i * h, r: y[0], rp: y[1] }); }
      return out;
    }

    /* The cardinal elements from a ray that enters parallel at height r0 (linear equation: r0 sets only the scale).
       After the lens (last point, field negligible there): image focus zF where the straight exit ray crosses the axis,
       image focal length fImage = −r0/r'(exit) (> 0 converging), image principal plane zH = zF − fImage. */
    function cardinaux(trace) {
      const a = trace[0], b = trace[trace.length - 1];
      if (a.rp !== 0) err("le rayon doit entrer parallèle à l'axe");
      if (b.rp === 0) return { fImage: Infinity, zF: Infinity, zH: NaN, rSortie: b.r };
      const fImage = -a.r / b.rp, zF = b.z - b.r / b.rp;
      return { fImage, zF, zH: zF - fImage, rSortie: b.r };
    }
    function lentilleE(P, z0, z1, n) {
      const tr = rayonE(P, 1e-3, 0, z0, z1, n), c = cardinaux(tr);
      // object side: trace a parallel ray backwards (z → −z); f/f' = √(V_object/V_image), (Lagrange–Helmholtz, Newton)
      const Q = { V: z => P.V(-z), dV: z => -P.dV(-z), d2V: z => P.d2V(-z) }, cb = cardinaux(rayonE(Q, 1e-3, 0, -z1, -z0, n));
      return Object.assign(c, { fObjet: cb.fImage, zFObjet: -cb.zF, trace: tr, rapport: Math.sqrt(P.V(z0) / P.V(z1)) });
    }

    /* The weak einzel lens (same potential on both sides): with R = r V^(1/4) the equation becomes R'' = −(3/16)(V'/V)² R,
       so to first order in the deflection 1/f ≈ (3/16) ∫ (V'/V)² dz, positive whatever the sign of Vc − V0: always converging.
       Valid while the ray height barely changes inside the lens (f ≫ lens length). */
    function minceEinzel(P, z0, z1, n) {
      potentiel(P); intervalle(z0, z1);
      return 3 / 16 * simpson(z => (P.dV(z) / P.V(z)) ** 2, z0, z1, n || 4000);
    }

    /* Magnetic lens of revolution, axial field B(z). In the frame that turns about the axis at the Larmor rate,
       dθ/dz = −q B/(2 p) (Busch), the meridional ray obeys r'' = −(q B/(2 p))² r: first order in r and r', any speed
       (p relativistic; the speed is constant in a static B). The force always points to the axis: always converging.
       Returns the trace { z, r, rp, theta }. */
    function rayonB(Bz, q, p, r0, rp0, z0, z1, n) {
      fonction(Bz, "B"); charge(q); pos(p, "p"); fini(r0, "r0"); fini(rp0, "rp0"); intervalle(z0, z1); n = entier(n == null ? 2000 : n, "n");
      const k = q / (2 * p), f = (z, y) => { const b = k * Bz(z); return [y[1], -b * b * y[0], -b]; };
      const h = (z1 - z0) / n, out = [{ z: z0, r: r0, rp: rp0, theta: 0 }]; let y = [r0, rp0, 0];
      for (let i = 1; i <= n; i++) { y = Integ().rk4(f, z0 + (i - 1) * h, y, h); out.push({ z: z0 + i * h, r: y[0], rp: y[1], theta: y[2] }); }
      return out;
    }
    function lentilleB(Bz, q, p, z0, z1, n) {
      const tr = rayonB(Bz, q, p, 1e-3, 0, z0, z1, n);
      return Object.assign(cardinaux(tr), { rotation: tr[tr.length - 1].theta, trace: tr });
    }
    /* Busch's thin-lens formulas, first order in the deflection: 1/f ≈ (q/(2p))² ∫ B² dz, rotation −(q/(2p)) ∫ B dz. */
    function busch(Bz, q, p, z0, z1, n) {
      fonction(Bz, "B"); charge(q); pos(p, "p"); intervalle(z0, z1);
      const k = q / (2 * p);
      return { inverseF: k * k * simpson(z => Bz(z) ** 2, z0, z1, n || 4000), rotation: -k * simpson(Bz, z0, z1, n || 4000) };
    }
    /* Glaser's bell-shaped field B0/(1 + (z/a)²): the paraxial equation has a closed solution. k² = (q B0 a/(2p))²,
       ω = √(1 + k²). With z = a cot φ, r = (r0/ω) sin(ω(π − φ))/sin φ is the ray parallel at height r0 from z = −∞; for
       z → +∞ it leaves as if refracted by a lens of image focal length f = −ω a/sin(ωπ), focus at zF = ω a cot(ωπ) from
       the centre; rotation −π (q B0 a/(2p)). Exact within the paraxial model; one crossing of the axis while k² < 3. */
    function glaser(B0, a, q, p) {
      fini(B0, "B0"); pos(a, "a"); charge(q); pos(p, "p");
      const kk = q * B0 * a / (2 * p), k2 = kk * kk, w = Math.sqrt(1 + k2);
      return { k2, omega: w, f: -w * a / Math.sin(w * Math.PI), zF: w * a / Math.tan(w * Math.PI), rotation: -Math.PI * kk, champ: z => B0 / (1 + (z / a) ** 2),
        uneTraversee: k2 < 3 };
    }
    /* p of a particle of charge q, mass m, accelerated from rest through U (V): relativistic, pc = √(T(T + 2mc²)), T = |q|U. */
    function impulsionU(q, m, U) { charge(q); pos(m, "m"); pos(U, "U"); const T = Math.abs(q) * U; return Math.sqrt(T * (T + 2 * m * C * C)) / C; }

    /* Electron microscope, objective lens of half-aperture α (rad), spherical aberration coefficient Cs (m), electrons of
       U volts. Diffraction blur 0,61 λ/α (Rayleigh), aberration blur Cs α³ (disc in the Gaussian image plane, referred to the
       object), added in quadrature: an order of magnitude, not a contrast-transfer calculation. Optimum α* = (0,61 λ/(√3 Cs))^(1/4).
       λ = 2π ƛ, relativistic (longueurOndeReduite). scherzer: the phase-contrast optimum, defocus Δf = −1,2 √(Cs λ), where the
       phase χ(u) = π Δf λ u² + (π/2) Cs λ³ u⁴ first returns to zero at u² = 2,4/√(Cs λ³): point resolution
       d = (Cs λ³)^(1/4)/√2,4 ≈ 0,65 (Cs λ³)^(1/4). */
    function resolutionMicroscope(U, Cs) {
      pos(U, "U"); pos(Cs, "Cs");
      const lambda = 2 * Math.PI * api.longueurOndeReduite(U), A = 0.61 * lambda;
      const diffraction = a => A / pos(a, "alpha"), aberration = a => Cs * pos(a, "alpha") ** 3, total = a => Math.hypot(diffraction(a), aberration(a));
      const alphaOpt = Math.pow(A / (Math.sqrt(3) * Cs), 0.25);
      const scherzer = { defocus: -1.2 * Math.sqrt(Cs * lambda), d: Math.pow(Cs * lambda ** 3, 0.25) / Math.sqrt(2.4) };
      return { lambda, diffraction, aberration, total, alphaOpt, deltaOpt: total(alphaOpt), scherzer, sansAberration: th => lambda / Math.sin(pos(th, "theta")) };
    }

    /* Accelerator guide field, z vertical, design orbit of radius r0 in the plane z = 0. Field index in Feynman's sign,
       n = (dB/B)/(dr/r) (29.2): B_z = B0 (ρ/r0)^n, and B_ρ = n B0 (ρ/r0)^n z/ρ, which makes ∂B_ρ/∂z = ∂B_z/∂ρ exactly (29.3);
       div B = 0 to first order in z. Returns (x, t) ↦ [Bx, By, Bz]. */
    function champIndice(B0, r0, n) {
      fini(B0, "B0"); pos(r0, "r0"); fini(n, "n"); if (B0 === 0) err("il faut B0 ≠ 0");
      return x => { const rho = Math.hypot(x[0], x[1]); if (!(rho > 0)) err("ρ = 0 : le champ d'indice n n'est pas défini sur l'axe");
        const bz = B0 * Math.pow(rho / r0, n), br = n * bz * x[2] / rho; return [br * x[0] / rho, br * x[1] / rho, bz]; };
    }
    /* Small oscillations about the design orbit, per turn: radial √(1 + n), vertical √(−n) (Feynman's sign). Stable when
       both are real: −1 < n < 0. usuel: the index in the usual sign, −n, stable for 0 < n_usuel < 1. */
    function nombresOnde(n) {
      fini(n, "n");
      return { nuR: 1 + n > 0 ? Math.sqrt(1 + n) : null, nuZ: -n > 0 ? Math.sqrt(-n) : null, stable: n > -1 && n < 0, usuel: -n };
    }
    /* A particle (q, m, kinetic energy ec) started on the design orbit of B0 at radius r0 = p/(|q|B0), shifted by dr outwards
       and dz upwards, velocity tangent to the orbit. Step by step with lorentzRel (exact Lorentz force in this field), pas
       steps per turn. Returns { r0, p, T, points: [{ tour, dr, dz }] }, tour = azimuth/2π, unwrapped. */
    function orbiteIndice(o) {
      const q = charge(o.q), m = pos(o.m, "m"), ec = pos(o.ec, "ec"), B0 = pos(o.B0, "B0"), n = fini(o.n, "n");
      const dr = fini(o.dr || 0, "dr"), dz = fini(o.dz || 0, "dz"), tours = pos(o.tours || 10, "tours"), pas = entier(o.pas || 400, "pas");
      const p = Math.sqrt(ec * (ec + 2 * m * C * C)) / C, r0 = p / (Math.abs(q) * B0), g = 1 + ec / (m * C * C), v = p / (g * m);
      const T = 2 * Math.PI * g * m / (Math.abs(q) * B0), s = q > 0 ? -1 : 1;     // q > 0 in B along +z turns clockwise seen from +z
      const tr = api.lorentzRel({ q, m, B: champIndice(B0, r0, n), x0: [r0 + dr, 0, dz], v0: [0, s * v, 0], duree: tours * T, n: Math.round(tours * pas), every: 1 });
      let prev = 0; const out = [];
      for (const e of tr) { let a = s * Math.atan2(e.x[1], e.x[0]); while (a < prev - Math.PI) a += 2 * Math.PI; prev = a;
        out.push({ tour: a / (2 * Math.PI), dr: Math.hypot(e.x[0], e.x[1]) - r0, dz: e.x[2] }); }
      return { r0, p, T, points: out };
    }

    /* Quadrupole lens, beam along +z: B = (G y, G x, 0), exact in vacuum (curl and div zero). Force on q moving at v ẑ:
       (−q v G x, +q v G y): focusing in x and defocusing in y when q G > 0. Thin lens: 1/f = q G ℓ/p in x, the opposite in y. */
    function quadrupole(G) { fini(G, "G"); return x => [G * x[1], G * x[0], 0]; }
    function focaleQuad(G, l, q, p) { fini(G, "G"); pos(l, "l"); charge(q); pos(p, "p"); if (G === 0) err("il faut G ≠ 0"); return p / (q * G * l); }

    /* 2×2 transfer matrices on (x, x'), first order: thin lens, drift, thick quadrupole of strength K = qG/p (m⁻²; K > 0
       focuses), and the product of a line of elements in the order the beam meets them. */
    const mat = (a, b, c, d) => [[a, b], [c, d]];
    const fois = (A, B) => mat(A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1],
      A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]);
    function matriceMince(f) { fini(f, "f"); if (f === 0) err("f = 0 n'a pas de sens"); return mat(1, 0, -1 / f, 1); }
    function matriceVol(L) { fini(L, "L"); if (L < 0) err("L doit être ≥ 0"); return mat(1, L, 0, 1); }
    function matriceQuad(K, l) {
      fini(K, "K"); pos(l, "l");
      if (K === 0) return matriceVol(l);
      const s = Math.sqrt(Math.abs(K)), u = s * l;
      return K > 0 ? mat(Math.cos(u), Math.sin(u) / s, -s * Math.sin(u), Math.cos(u)) : mat(Math.cosh(u), Math.sinh(u) / s, s * Math.sinh(u), Math.cosh(u));
    }
    function chaine(elements) { if (!Array.isArray(elements) || !elements.length) err("il faut une liste de matrices"); return elements.reduce((M, E) => fois(E, M), mat(1, 0, 0, 1)); }
    /* A periodic line of cells M: bounded motion when |tr M| < 2; phase advance per cell μ = acos(tr M/2). */
    function stabilite(M) { const tr = M[0][0] + M[1][1], stable = Math.abs(tr) < 2; return { trace: tr, stable, mu: stable ? Math.acos(tr / 2) : null }; }
    /* FODO cell of thin lenses: +f, drift L, −f, drift L. In x: cos μ = 1 − L²/(2f²); in y the same (lenses swapped).
       Stable for L < 2|f|. epais: { K, l } replaces the thin lenses by quadrupoles of length l (drifts L − l between centres). */
    function fodo(o) {
      const L = pos(o.L, "L");
      if (o.epais) {
        const K = fini(o.epais.K, "K"), l = pos(o.epais.l, "l"); if (!(l < L)) err("l doit être < L");
        const cell = s => chaine([matriceQuad(s * K, l / 2), matriceVol(L - l), matriceQuad(-s * K, l), matriceVol(L - l), matriceQuad(s * K, l / 2)]);
        const Mx = cell(1), My = cell(-1); return { Mx, My, x: stabilite(Mx), y: stabilite(My) };
      }
      const f = fini(o.f, "f"); if (f === 0) err("f = 0 n'a pas de sens");
      const Mx = chaine([matriceMince(f), matriceVol(L), matriceMince(-f), matriceVol(L)]);
      const My = chaine([matriceMince(-f), matriceVol(L), matriceMince(f), matriceVol(L)]);
      return { Mx, My, x: stabilite(Mx), y: stabilite(My), cosMu: 1 - L * L / (2 * f * f) };
    }
    /* Two thin lenses f1 then f2, e apart: the vergence (27.12a) V = 1/f1 + 1/f2 − e/(f1 f2). A quadrupole doublet has
       f2 = −f1 in x and the signs swapped in y: V = e/f1² in both planes. */
    function doublet(f1, f2, e) { fini(f1, "f1"); fini(f2, "f2"); fini(e, "e"); return { x: 1 / f1 + 1 / f2 - e / (f1 * f2), y: -1 / f1 - 1 / f2 - e / (f1 * f2) }; }

    /* Pendulum (length l) upside down, pivot shaken vertically as a cos ωt. θ from the upward vertical:
       θ'' = (g − a ω² cos ωt) sin θ / l. Averaged over the fast shaking (a ≪ l, ω² ≫ g/l): θ'' = −Ω² θ with
       Ω² = a²ω²/(2 l²) − g/l: stable when a²ω² > 2 g l (Kapitza). pendulePivot: the full equation step by step. */
    function kapitza(g, l, a, w) {
      pos(g, "g"); pos(l, "l"); pos(a, "a"); pos(w, "w");
      const O2 = a * a * w * w / (2 * l * l) - g / l;
      return { stable: O2 > 0, Omega: O2 > 0 ? Math.sqrt(O2) : null, seuil: Math.sqrt(2 * g * l) / a };
    }
    function pendulePivot(g, l, a, w, th0, duree, n) {
      pos(g, "g"); pos(l, "l"); fini(a, "a"); pos(w, "w"); fini(th0, "th0"); pos(duree, "duree"); n = entier(n, "n");
      const f = (t, y) => [y[1], (g - a * w * w * Math.cos(w * t)) * Math.sin(y[0]) / l];
      const h = duree / n; let y = [th0, 0], max = Math.abs(th0);
      for (let i = 1; i <= n; i++) { y = Integ().rk4(f, (i - 1) * h, y, h); max = Math.max(max, Math.abs(y[0])); }
      return { theta: y[0], max };
    }

    Object.assign(api, { potentielTubes, potentielEinzel, rayonE, lentilleE, minceEinzel, rayonB, lentilleB, busch, glaser, impulsionU,
      resolutionMicroscope, champIndice, nombresOnde, orbiteIndice, quadrupole, focaleQuad, matriceMince, matriceVol, matriceQuad, chaine,
      stabilite, fodo, doublet, kapitza, pendulePivot });
  }

  /* ---------- Étape « Règle du flux et loi de Faraday » (II.17.1 à 17.4) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const MU0 = Cst.mu0, EPS0 = Cst.eps0, C = Cst.c, TAU = 2 * Math.PI;
    const err = m => { throw new Error("règle du flux : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const pos0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };
    const logcosh = u => { const a = Math.abs(u); return a + Math.log1p(Math.exp(-2 * a)) - Math.LN2; };

    /* §17-1. ℰ = ∮ (E + v ∧ B)·ds along the closed polyline `chemin` (last point joined to the first): the two parts of the
       force per unit charge on carriers that follow the circuit. o = { E: p ↦ vector (default 0), vitesse: p ↦ velocity of the
       material at p (default 0), B: vector or p ↦ vector (default 0) }, all at one instant. Midpoint rule, n pieces per side:
       error in 1/n². The magnetic part is femMotionnelle of the step « Moteurs, générateurs et transformateurs ». */
    function femLorentz(chemin, o, n) {
      if (!Array.isArray(chemin) || chemin.length < 3) err("il faut un chemin fermé d'au moins 3 points");
      chemin.forEach((p, i) => v3(p, "point " + i));
      n = n == null ? 50 : n; if (!(Number.isInteger(n) && n >= 1)) err("n doit être un entier ≥ 1");
      const E = o.E || (() => [0, 0, 0]);
      let el = 0;
      for (let i = 0; i < chemin.length; i++) {
        const a = chemin[i], b = chemin[(i + 1) % chemin.length], d = b.map((x, k) => (x - a[k]) / n);
        for (let j = 0; j < n; j++) el += dot(v3(E(a.map((x, k) => x + (j + 0.5) * d[k])), "E"), d);
      }
      const mag = o.vitesse && o.B ? need("femMotionnelle")(chemin, o.vitesse, o.B, n) : 0;
      return { electrique: el, magnetique: mag, totale: el + mag };
    }

    /* A strip of field B_z = B0 g(x), uniform in y and z: the gap of a long magnet of width 2L along x, with soft edges of
       width w, g = ½ [tanh((x + L)/w) − tanh((x − L)/w)]. G(x) = ∫₀ˣ g, closed form. Divergence-free (B_z depends on x only),
       but a real gap of finite length in y has fringes there: the strip is long against the loops it meets. */
    function bandeChamp(B0, L, w) {
      fini(B0, "B0"); pos(L, "L"); pos(w, "w");
      const g = x => 0.5 * (Math.tanh((fini(x, "x") + L) / w) - Math.tanh((x - L) / w));
      const G = x => 0.5 * w * (logcosh((fini(x, "x") + L) / w) - logcosh((x - L) / w));
      return { g, G, Bz: x => B0 * g(x), B0, L, w };
    }

    /* §17-1. Three ways to change the flux through a rectangle a (along x) × b (along y) of the plane z = 0, run
       counterclockwise seen from +z (normal +z), left edge at x0 at t = 0, in the strip bandeChamp(B0, L, w):
       "spire": the loop moves at v along x, the magnet is still: B static, no E; ℰ = ∮(v ∧ B)·ds = −v b [Bz(xd) − Bz(xg)].
       "aimant": the loop is still, the magnet moves at −v: the same relative motion. B(x, t) = B0 g(x + vt), and the electric
         field E = −u ∧ B, u = −v x̂ the speed of the magnet, i.e. E_y = −v B_z: it obeys (17.1) exactly for this B and vanishes
         away from the magnet; it is the field of the moving magnet to first order in u/c.
       "champ": nothing moves, B0 grows at the rate dB0 (T·s⁻¹) from B0 at t = 0. E_y(x) = −dB0 G(x), odd in x (the symmetry of
         the strip fixes the constant): ∇ ∧ E = −∂B/∂t exactly, ∇·E = 0.
       Each case returns its fields at time t (B(p, t), E(p, t), vitesse(p, t)), the corners of the loop, the flux Φ(t) (Wb),
       the EMF by the flux rule −dΦ/dt and its two parts ∮E·ds and ∮(v ∧ B)·ds in closed form. The loop's own field is left out
       (open circuit). Galilean: v ≪ c. */
    function troisInductions(o) {
      const mode = o.mode, a = pos(o.a, "a"), b = pos(o.b, "b"), x0 = fini(o.x0, "x0"), v = fini(o.v || 0, "v"), dB0 = fini(o.dB0 || 0, "dB0");
      const s = bandeChamp(o.B0, o.L, o.w), B0 = s.B0;
      if (!["spire", "aimant", "champ"].includes(mode)) err("mode « spire », « aimant » ou « champ » attendu");
      const b0 = t => mode === "champ" ? B0 + dB0 * t : B0;
      const shift = t => mode === "aimant" ? v * t : 0;                        // the pattern seen at x + vt
      const gauche = t => mode === "spire" ? x0 + v * t : x0;                   // the loop in the laboratory
      const B = (p, t) => [0, 0, b0(t) * s.g(p[0] + shift(t))];
      const E = (p, t) => mode === "aimant" ? [0, -v * B(p, t)[2], 0] : mode === "champ" ? [0, -dB0 * s.G(p[0]), 0] : [0, 0, 0];
      const vitesse = () => mode === "spire" ? [v, 0, 0] : [0, 0, 0];
      const coins = t => { const g = gauche(t), d = g + a; return [[g, 0, 0], [d, 0, 0], [d, b, 0], [g, b, 0]]; };
      const xs = t => { const g = gauche(t) + shift(t); return [g, g + a]; };      // the loop's edges in the magnet's frame
      const flux = t => { const [g, d] = xs(t); return b * b0(t) * (s.G(d) - s.G(g)); };
      const femE = t => { const [g, d] = xs(t);
        return mode === "aimant" ? -v * b * b0(t) * (s.g(d) - s.g(g)) : mode === "champ" ? -b * dB0 * (s.G(d) - s.G(g)) : 0; };
      const femVB = t => { if (mode !== "spire") return 0; const [g, d] = xs(t); return -v * b * B0 * (s.g(d) - s.g(g)); };
      const fem = t => { const [g, d] = xs(t);                                   // −dΦ/dt, from Φ alone
        return mode === "champ" ? -b * dB0 * (s.G(d) - s.G(g)) : -b * B0 * v * (s.g(d) - s.g(g)); };
      return { bande: s, B, E, vitesse, coins, flux, fem, femE, femVB };
    }

    /* §17-2. Faraday's disc: a conducting disc of radius a turning at ω about its axis in a uniform axial B, one brush on the
       axle (radius b ≥ 0), one on the rim. ℰ = ∮(v ∧ B)·ds = ω B (a² − b²)/2 along any path through the disc (v ∧ B = ωBρ ρ̂ is
       a gradient there), the rest of the circuit at rest. The circuit drawn through the brushes keeps its flux: the flux rule
       applied to it gives 0. A contour that follows the material (one radius carried by the disc) sweeps the area (a² − b²)ω/2
       per second: −dΦ/dt gives the right size. Uniform B over the disc, ω a ≪ c; the field of the current is left out. */
    function disqueFaraday(o) {
      const B = fini(o.B, "B"), a = pos(o.a, "a"), b = pos0(o.b || 0, "b"), w = fini(o.omega, "omega");
      if (!(b < a)) err("il faut b < a");
      const fem = w * B * (a * a - b * b) / 2;
      return { fem, regleContourFixe: 0, regleContourMateriel: fem, vitesseBord: Math.abs(w) * a };
    }

    /* §17-2. Two plates of the plane z = 0 in a uniform B along z. Plate 1 hangs from its terminal T1 = (−h, 0), plate 2 from
       T2 = (h, 0); their facing edges are arcs of radius Rc > h whose centres start at (∓Rc, 0): they touch at the origin.
       Rocking: plate 1 turns by α about T1, plate 2 by −α about T2, α = α0 sin(2π f t). The centres stay at the same height
       −(Rc − h) sin α, so the contact P slides to (0, −(Rc − h) sin α): far, when Rc ≫ h, while the metal moves little.
       (The centres also draw closer by 2(Rc − h)(1 − cos α): the arcs would overlap, so the terminals must yield apart by as
       much to keep a single point of contact: second order in α.)
       Circuit, counterclockwise: P → T1 → wires out and around below → T2 → P (polygone(t)), normal +z.
       vraie: ∮(v ∧ B)·ds, exact: in each plate v ∧ B = Ω_k B ρ_k is the gradient of Ω_k B ρ_k²/2 (rigid rotation, Ω_k its
       angular speed, ρ_k from its terminal), so only the distances d_k = |P − T_k| count: −α̇ B (d1² + d2²)/2. No E (static B).
       regle: −d(B × area of the polygon)/dt = B h (Rc − h) cos α α̇: wrong in size by (Rc − h)/h and in sign.
       materielle: −dΦ/dt for the contour drawn through the metal points that touched at t = 0, which rise by h sin α:
       −B h² cos α α̇, the true EMF up to a relative (yP/h)², yP the shift of the contact. D: how far the wires go (they do not change the EMFs). */
    function plaquesBasculantes(o) {
      const B = fini(o.B, "B"), h = pos(o.h, "h"), Rc = pos(o.Rc, "Rc"), a0 = fini(o.alpha0, "alpha0"), w = TAU * pos(o.f, "f");
      const D = o.D == null ? h : pos(o.D, "D");
      if (!(Rc > h)) err("il faut Rc > h : le bord courbe doit dépasser la borne");
      const alpha = t => a0 * Math.sin(w * fini(t, "t")), adot = t => a0 * w * Math.cos(w * t);
      const contact = t => [0, -(Rc - h) * Math.sin(alpha(t)), 0];
      const centres = t => { const al = alpha(t); return [[-h - (Rc - h) * Math.cos(al), -(Rc - h) * Math.sin(al), 0], [h + (Rc - h) * Math.cos(al), -(Rc - h) * Math.sin(al), 0]]; };
      const T1 = [-h, 0, 0], T2 = [h, 0, 0];
      const polygone = t => [contact(t), T1, [-h - D, 0, 0], [-h - D, -2 * D - Rc, 0], [h + D, -2 * D - Rc, 0], [h + D, 0, 0], T2];
      const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
      const vraie = t => { const P = contact(t); return -adot(t) * B * (d2(P, T1) + d2(P, T2)) / 2; };
      const regle = t => B * h * (Rc - h) * Math.cos(alpha(t)) * adot(t);
      const materielle = t => -B * h * h * Math.cos(alpha(t)) * adot(t);
      /* the velocity of the metal at p, for checks: plate 1 for x < 0, plate 2 for x > 0, inside |x| < h above the wires */
      const vitesse = (p, t) => { if (Math.abs(p[0]) >= h || p[1] < -D - Rc / 2) return [0, 0, 0];
        const W = (p[0] < 0 ? 1 : -1) * adot(t), T = p[0] < 0 ? T1 : T2; return [-W * (p[1] - T[1]), W * (p[0] - T[0]), 0]; };
      return { alpha, contact, centres, polygone, vraie, regle, materielle, vitesse, T1, T2,
        flux: t => B * need("aireVectorielle")(polygone(t))[2], rapport: -h / (Rc - h) };
    }

    /* §17-3. The betatron field, axisymmetric, everything ∝ b(t), the field on the orbit r0 (T). Guide field
       B_z = b (r/r0)^n with field index −1 < n < 0, n = d ln B/d ln r: the sign of Feynman (29.2), the same as champIndice (Kerst and
       the accelerator literature write −n, 0 < n < 1). Vertical and radial focusing. B_r = n z B_z/r (from ∇ ∧ B = 0 to first
       order in z). Flux inside r: Φ = b [(k − 2/(2 + n)) π r0² + 2π r0^(−n) r^(2+n)/(2 + n)]: the core adds a fixed flux, chosen so that
       the mean field inside r0 is k b. k = 2 is the condition (17.12). Induced field E_φ = −(∂Φ/∂t)/(2π r) (17.2), axisymmetric.
       b(t) and db(t) its rate are functions. Valid in the guide region (r well outside the core, |z| ≪ r0); E_z and the field of
       the beam neglected. Returns fields (x, t) ↦ vector for lorentzRel, and flux(r, t), bmoy(r, t). */
    function champBetatron(o) {
      const r0 = pos(o.r0, "r0"), n = fini(o.n == null ? -0.5 : o.n, "n"), k = pos(o.k == null ? 2 : o.k, "k");
      if (!(n > -1 && n < 0)) err("l'indice de champ n doit être dans ]−1, 0[");
      if (typeof o.b !== "function" || typeof o.db !== "function") err("b(t) et db(t) doivent être des fonctions");
      const phi = r => (k - 2 / (2 + n)) * Math.PI * r0 * r0 + TAU * Math.pow(r0, -n) * Math.pow(r, 2 + n) / (2 + n);
      const flux = (r, t) => o.b(t) * phi(pos(r, "r"));
      const B = (x, t) => { const r = Math.hypot(x[0], x[1]), bz = o.b(t) * Math.pow(r / r0, n), br = n * x[2] * bz / r;
        return [br * x[0] / r, br * x[1] / r, bz]; };
      const E = (x, t) => { const r = Math.hypot(x[0], x[1]), e = -o.db(t) * phi(r) / (TAU * r * r); return [-e * x[1], e * x[0], 0]; };
      return { B, E, flux, bmoy: (r, t) => flux(r, t) / (Math.PI * r * r), phi, r0, n, k };
    }

    /* The radius of the orbit when k ≠ 2, quasi-static: the orbit stays circular (p = |q| r B_z(r)) and p grows by (17.6) at
       the radius where it is. With every field ∝ b: dr/db = [φ(r)/(2π r) − r β(r)]/(b (r β)′), β = (r/r0)ⁿ, φ from champBetatron.
       Integ.rk4 in b, from b0 (orbit at r0) to b1, steps pas. Holds while the field changes little in one turn and the orbit
       stays inside the guide region; the radial oscillations about this orbit are not in it. */
    function rayonAdiabatique(o, b0, b1, pas) {
      const ch = champBetatron(Object.assign({ b: () => 1, db: () => 0 }, o)), r0 = ch.r0, n = ch.n;
      pos(b0, "b0"); pos(b1, "b1"); pas = pas == null ? 400 : pas;
      const f = (b, y) => { const r = y[0], rb = r * Math.pow(r / r0, n); return [(ch.phi(r) / (TAU * r) - rb) / (b * (1 + n) * Math.pow(r / r0, n))]; };
      let y = [r0]; const h = (b1 - b0) / pas, out = [{ b: b0, r: r0 }];
      for (let i = 1; i <= pas; i++) { y = Integ().rk4(f, b0 + (i - 1) * h, y, h); out.push({ b: b0 + i * h, r: y[0] }); }
      return out;
    }

    /* A betatron fed at the frequency f: b = Bmax sin(2π f t), electrons accelerated during the rising quarter. Orbit r0, k = 2.
       Final momentum |q| r0 Bmax (29.1a), kinetic energy ec (J), turns made in the quarter at the speed c (an upper bound),
       energy gained per turn |q| dΦ/dt = |q| 2π r0² dB/dt, at the steepest point (gainMax) and on average over the quarter
       (gainMoyen), and lost per turn by radiation at the end, q² β³ γ⁴/(3 ε0 r0) (Liénard, exact for a circle). Electron by
       default. */
    function betatron(o) {
      const r0 = pos(o.r0, "r0"), Bmax = pos(o.Bmax, "Bmax"), f = pos(o.f, "f");
      const q = o.q == null ? Cst.e : Math.abs(fini(o.q, "q")), m = o.m == null ? Cst.m_e : pos(o.m, "m");
      const p = q * r0 * Bmax, mc2 = m * C * C, W = Math.sqrt(p * p * C * C + mc2 * mc2), g = W / mc2, beta = p * C / W;
      const gainMax = q * 2 * Math.PI * r0 * r0 * TAU * f * Bmax, gainMoyen = q * 2 * Math.PI * r0 * r0 * 4 * f * Bmax;
      return { p, ec: W - mc2, gamma: g, beta, tours: (1 / (4 * f)) * C / (TAU * r0), gainMax, gainMoyen,
        perte: q * q * beta ** 3 * g ** 4 / (3 * EPS0 * r0), fem: gainMax / q };
    }

    /* §17-4. A charged ring (charge Q, radius R, at z = 0) and coaxial loops of current [{ I, a, z }] (counterclockwise seen
       from +z for I > 0). Flux of the loops through the ring, Φ(R) = 2π R Σ Aφ(R, 0) (spireExacte, thin wires): it is the flux
       that a stopping current takes away, so by (17.2) the ring receives the angular impulse ΔL = Q Φ(R)/(2π) (kg·m²·s⁻¹)
       along z, whatever the speed of the stop, as long as the ring has no time to move (or turns rigidly: the torque does not
       depend on its rotation). solenoideFini(n, I, a, longueur, N): N equal loops spread over the length, each n I longueur/N. */
    function solenoideFini(n, I, a, longueur, N) {
      pos(n, "n"); fini(I, "I"); pos(a, "a"); pos(longueur, "longueur"); N = N == null ? 200 : N;
      if (!(Number.isInteger(N) && N >= 1)) err("N doit être un entier ≥ 1");
      return Array.from({ length: N }, (_, j) => ({ I: n * I * longueur / N, a, z: -longueur / 2 + (j + 0.5) * longueur / N }));
    }
    function fluxAnneau(spires, R) {
      pos(R, "R"); const sp = need("spireExacte");
      return spires.reduce((s, w) => s + TAU * R * sp(fini(w.I, "I"), pos(w.a, "a"), R, -fini(w.z, "z")).Aphi, 0);
    }
    function paradoxeDisque(o) {
      const Q = fini(o.Q, "Q"), R = pos(o.R, "R"), J = o.J == null ? null : pos(o.J, "J");
      const sp = o.spires || solenoideFini(o.n, o.I, o.a, o.longueur, o.N);
      const flux = fluxAnneau(sp, R), dL = Q * flux / TAU;
      const r = { flux, dL, spires: sp };
      if (o.n != null) { r.B0 = MU0 * o.n * o.I; r.flux0 = r.B0 * Math.PI * o.a * o.a; }
      if (J != null) r.omega = dL / J;
      return r;
    }

    /* The field of the charged ring (Q, R, at z = 0) at (ρ, z): { Erho, Ez } (V·m⁻¹), closed forms with K, E of parameter
       m = 4Rρ/((R + ρ)² + z²) (elliptiques). Thin ring: valid at distances ≫ its thickness; NaN on the ring. */
    function anneauCharge(Q, R, rho, z) {
      fini(Q, "Q"); pos(R, "R"); fini(rho, "rho"); fini(z, "z"); if (rho < 0) err("rho ≥ 0 attendu");
      const s2 = (R + rho) ** 2 + z * z, d2 = (R - rho) ** 2 + z * z; if (!(d2 > 0)) return { Erho: NaN, Ez: NaN };
      const { K, E } = need("elliptiques")(4 * R * rho / s2), s = Math.sqrt(s2), k = Q / (2 * Math.PI * Math.PI * EPS0);
      const Ez = k * z * E / (s * d2);
      if (rho < 1e-9 * R) return { Erho: 0, Ez };
      return { Erho: k / (2 * rho * s) * (K - (R * R - rho * rho + z * z) / d2 * E), Ez };
    }

    /* The angular momentum stored in the static field of the ring and the loops: L_z = ε0 ∫ (r ∧ (E ∧ B))_z dV
       = ε0 ∫∫ 2π ρ² (E_z B_ρ − E_ρ B_z) dρ dz, over the half-plane, by the midpoint rule on the map ρ = ℓ u/(1 − u), z = ℓ
       tan(πv/2) (ℓ the size of the system), n × 2n cells. The integrand has integrable singularities on the ring and on the
       wires: convergence about 1/n. To compare with Q R Aφ(R, 0) = Q Φ(R)/(2π). */
    function momentChamp(Q, R, spires, n) {
      fini(Q, "Q"); pos(R, "R"); n = n == null ? 200 : n; if (!(Number.isInteger(n) && n >= 8)) err("n doit être un entier ≥ 8");
      const sp = need("spireExacte"), l = Math.max(R, ...spires.map(w => Math.max(w.a, Math.abs(w.z))));
      let L = 0;
      for (let i = 0; i < n; i++) {
        const u = (i + 0.5) / n, rho = l * u / (1 - u), drho = l / ((1 - u) * (1 - u)) / n;
        for (let j = 0; j < 2 * n; j++) {
          const vv = -1 + (j + 0.5) / n, z = l * Math.tan(Math.PI * vv / 2), dz = l * Math.PI / 2 / Math.cos(Math.PI * vv / 2) ** 2 / n;
          const e = anneauCharge(Q, R, rho, z); let Br = 0, Bz = 0;
          for (const w of spires) { const b = sp(w.I, w.a, rho, z - w.z); Br += b.Brho; Bz += b.Bz; }
          const f = TAU * rho * rho * (e.Ez * Br - e.Erho * Bz);
          if (isFinite(f)) L += f * drho * dz;
        }
      }
      return EPS0 * L;
    }

    Object.assign(api, { femLorentz, bandeChamp, troisInductions, disqueFaraday, plaquesBasculantes, champBetatron, rayonAdiabatique,
      betatron, solenoideFini, fluxAnneau, paradoxeDisque, anneauCharge, momentChamp });
  }

  /* ---------- Étape « Diamagnétisme et moments magnétiques » (II.34.1 à 34.4) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const MU0 = Cst.mu0, QE = Cst.e, ME = Cst.m_e, MP = Cst.m_p, HBAR = Cst.hbar, C = Cst.c, TAU = 2 * Math.PI;
    const err = m => { throw new Error("moments magnétiques : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const v3 = (v, nom) => { if (!Array.isArray(v) || v.length !== 3) err(nom + " doit être un vecteur à 3 composantes"); v.forEach((x, i) => fini(x, nom + "[" + i + "]")); return v; };
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => Math.hypot(a[0], a[1], a[2]);

    /* §34-1. Volume susceptibilities χ (SI, dimensionless, 20 °C) and densities ρ (kg·m⁻³) of a few weakly magnetic solids
       and of water. χ: Wikipedia « Magnetic susceptibility » (table); ρ: LibreTexts B7, water 998 at 20 °C. */
    const SUSCEPTIBILITES = {
      bismuth: { chi: -1.66e-4, rho: 9790 }, eau: { chi: -9.035e-6, rho: 998 },
      cuivre: { chi: -9.63e-6, rho: 8960 }, aluminium: { chi: 2.2e-5, rho: 2700 },
    };
    /* A small sample of volume V and susceptibility χ in an external field of magnitude B that varies along x (gradB = dB/dx):
       its induced moment is χVB/μ0, its energy −χVB²/(2μ0), the force χ V B gradB/μ0 (N), along +x when positive. Toward the
       strong field for χ > 0, away from it for χ < 0. Holds for |χ| ≪ 1 (the field inside ≈ the field outside, the shape does
       not matter to first order in χ) and a sample small against B/|gradB|. */
    function forceSusceptible(chi, V, B, gradB) { fini(chi, "chi"); pos(V, "V"); fini(B, "B"); fini(gradB, "gradB"); return chi * V * B * gradB / MU0; }
    /* The product B dB/dz (T²·m⁻¹, z up) at which the magnetic force per unit volume χ B dB/dz/μ0 balances the weight ρg:
       negative for a diamagnet (it floats where the field weakens upward, above the centre of a coil), positive for a
       paramagnet (where it strengthens upward). Same domain as forceSusceptible. Says nothing about stability. */
    function levitation(chi, rho, g) {
      fini(chi, "chi"); pos(rho, "rho"); g = g == null ? Cst.g0 : pos(g, "g"); if (chi === 0) err("χ = 0 : aucune force");
      return MU0 * rho * g / chi;
    }

    /* §34-2. A charge q of mass m on a circle of radius r at the speed v: J = m v r (34.1), μ = q v r/2 (34.2), the ratio
       q/(2m) (34.3) whatever r and v. Non-relativistic: v ≪ c (refused at v ≥ c; error of order (v/c)²). */
    function momentOrbite(q, m, r, v) {
      fini(q, "q"); pos(m, "m"); pos(r, "r"); fini(v, "v"); if (!(Math.abs(v) < C)) err("|v| doit être < c");
      return { J: m * v * r, mu: q * v * r / 2, rapport: q / (2 * m) };
    }
    /* A rigid body of radius R turning at ω about z: μ = (ω/2) Σ q s², J = ω Σ m s², s the distance to the axis. ⟨s²⟩/R² of a
       distribution: uniform ball 2/5, spherical shell 2/3, equatorial ring 1, centre 0. g = (μ/J)/(Q/2M) = ⟨s²⟩charge/⟨s²⟩masse:
       1 whenever charge and mass are spread alike. Classical, non-relativistic (ωR ≪ c). */
    const S2_FORMES = { boule: 2 / 5, coquille: 2 / 3, anneau: 1, centre: 0 };
    const s2 = f => { if (!(f in S2_FORMES)) err("forme inconnue : " + f + " (boule, coquille, anneau, centre)"); return S2_FORMES[f]; };
    function facteurGClassique(formeCharge, formeMasse) {
      const sm = s2(formeMasse); if (sm === 0) err("une masse toute au centre n'a pas de moment cinétique"); return s2(formeCharge) / sm;
    }
    function corpsTournant(o) {
      const Q = fini(o.Q, "Q"), M = pos(o.M, "M"), R = pos(o.R, "R"), w = fini(o.omega, "omega");
      const sq = s2(o.charge), sm = s2(o.masse); if (!(Math.abs(w) * R < C)) err("ωR doit être < c");
      const mu = w / 2 * Q * sq * R * R, J = w * M * sm * R * R;
      return { mu, J, g: J === 0 ? NaN : (mu / J) / (Q / (2 * M)), vitesse: Math.abs(w) * R };
    }
    /* g of (34.6)–(34.7) and the reference charge and mass: μ = g (q/2m) J. Electron (q = −e, m_e): spin g (CODATA 2022),
       orbit 1. Proton, neutron: q = e, m = m_p, g = 2 μ/μ_N (CODATA 2022). */
    const PARTICULES = {
      electron: { g: 2.00231930436092, q: -QE, m: ME }, orbite: { g: 1, q: -QE, m: ME },
      proton: { g: 5.5856946893, q: QE, m: MP }, neutron: { g: -3.82608552, q: QE, m: MP },
    };
    const particule = p => { if (typeof p === "string") { if (!(p in PARTICULES)) err("particule inconnue : " + p); return PARTICULES[p]; }
      fini(p.g, "g"); fini(p.q, "q"); pos(p.m, "m"); return p; };
    /* γ = g q/(2m) (rad·s⁻¹·T⁻¹), signed: μ = γ J. Negative for the electron, positive for the proton, negative for the neutron. */
    function rapportGyromagnetique(p) { const s = particule(p); return s.g * s.q / (2 * s.m); }
    /* Equator speed of a classical electron: a uniform ball of mass m_e and radius R carrying J = ħ/2: v = 5ħ/(4 m_e R).
       Default R: the classical radius e²/(4πε0 m_e c²). A value > c refutes the spinning-ball picture. */
    function vitesseEquateur(R) {
      R = R == null ? QE * QE / (4 * Math.PI * Cst.eps0 * ME * C * C) : pos(R, "R");
      return { R, v: 5 * HBAR / (4 * ME * R) };
    }

    /* §34-3. Precession: dJ/dt = μ ∧ B = γ J ∧ B. J turns about B at Ω = −γ B, |Ω| = |γ| B whatever the angle θ and |J|,
       (34.10)–(34.11). frequencePrecession: { omega, f } in rad·s⁻¹ and Hz. Classical vector model of a quantum spin; uniform
       static B; the relaxations of a real sample are left out. */
    function frequencePrecession(p, B) { fini(B, "B"); const w = Math.abs(rapportGyromagnetique(p)) * Math.abs(B); return { omega: w, f: w / TAU }; }
    /* exact: J0 turned about B̂ by the angle −γ|B|t (Rodrigues) */
    function precessionExacte(gamma, B, J0, t) {
      fini(gamma, "gamma"); v3(B, "B"); v3(J0, "J0"); fini(t, "t"); const b = nrm(B); if (!(b > 0)) return J0.slice();
      const u = B.map(x => x / b), a = -gamma * b * t, c = Math.cos(a), s = Math.sin(a), k = dot(u, J0), w = cross(u, J0);
      return J0.map((x, i) => x * c + w[i] * s + u[i] * k * (1 - c));
    }
    /* step by step (Integ.rk4) over duree in n steps: { t, J } every step. The check of precessionExacte. */
    function precessionPas(gamma, B, J0, duree, n) {
      fini(gamma, "gamma"); v3(B, "B"); v3(J0, "J0"); pos(duree, "duree"); n = n == null ? 1000 : n;
      if (!Number.isInteger(n) || n < 1) err("n doit être un entier ≥ 1");
      const f = (t, J) => cross(J, B).map(x => gamma * x), h = duree / n, out = { t: [0], J: [J0.slice()] }; let J = J0.slice();
      for (let i = 1; i <= n; i++) { J = Integ().rk4(f, (i - 1) * h, J, h); out.t.push(i * h); out.J.push(J); }
      return out;
    }

    /* §34-4. An electron (or any charge q, mass m) bound to a fixed nucleus by a harmonic force −m ω0² r, on a circular orbit of
       radius r0 in the plane z = 0, turning counterclockwise (sens 1) or clockwise (−1). A uniform field B(t) ẑ is switched on
       from 0 to B1 during tau ("lineaire" or "doux": B1 (1 − cos πt/τ)/2), then held for apres periods. The induced field is
       E = −(dB/dt/2) ẑ ∧ r, the one that circles the nucleus (Faraday's law on a circle centred on it). Integ.rk4 on
       [x, y, vx, vy]; steps per orbital period: pas. Returns the mechanical J = m (x vy − y vx), the moment μ = (q/2)(x vy − y vx)
       sampled { t, B, dJ, dmu } every `every` steps, the changes at the end (mean over the last period) and the predictions
       ΔJ = −q r0² B1/2 (34.15) and Δμ = −q² r0² B1/(4m) (34.16), which hold to first order in ωL/ω0, ωL = |q|B/(2m). For the
       harmonic force the Larmor frame makes them exact up to (ωL/ω0)²: the radius does not change at first order. */
    function orbiteDiamagnetique(o) {
      const q = fini(o.q == null ? -QE : o.q, "q"), m = pos(o.m == null ? ME : o.m, "m"), r0 = pos(o.r0 == null ? Cst.a0 : o.r0, "r0");
      const w0 = pos(o.omega0 == null ? HBAR / (m * r0 * r0) : o.omega0, "omega0"), B1 = fini(o.B1, "B1"), sens = o.sens == null ? 1 : o.sens;
      if (sens !== 1 && sens !== -1) err("sens vaut 1 ou −1"); if (q === 0) err("q = 0 : rien n'est induit");
      const T0 = TAU / w0, tau = pos(o.tau == null ? 10 * T0 : o.tau, "tau"), apres = o.apres == null ? 2 : pos(o.apres, "apres");
      const pas = o.pas == null ? 256 : o.pas, every = o.every || 8, forme = o.forme || "doux";
      if (!Number.isInteger(pas) || pas < 16) err("pas doit être un entier ≥ 16");
      if (forme !== "lineaire" && forme !== "doux") err("forme : lineaire ou doux");
      const B = t => t >= tau ? B1 : forme === "lineaire" ? B1 * t / tau : B1 * (1 - Math.cos(Math.PI * t / tau)) / 2;
      const rampe = (t, apresRampe) => apresRampe ? 0 : forme === "lineaire" ? B1 / tau : B1 * Math.PI / (2 * tau) * Math.sin(Math.PI * t / tau);
      /* the ramp and the plateau are integrated separately, the step ending exactly at τ: a kink of B inside a step would cost
         Runge–Kutta its order */
      const champ = (apresRampe) => (t, y) => { const [x, yy, vx, vy] = y, b = apresRampe ? B1 : B(Math.min(t, tau)), e = -rampe(t, apresRampe) / 2;
        return [vx, vy, -w0 * w0 * x + q / m * (-e * yy + vy * b), -w0 * w0 * yy + q / m * (e * x - vx * b)]; };   // E = e ẑ ∧ r = e (−y, x)
      const lz = y => y[0] * y[3] - y[1] * y[2];
      /* a twin run without field carries the same round-off and Runge–Kutta drift of J: it is subtracted */
      const f0 = (t, y) => [y[2], y[3], -w0 * w0 * y[0], -w0 * w0 * y[1]];
      let y = [r0, 0, 0, sens * w0 * r0], z = y.slice(); const l0 = lz(y);
      const n1 = Math.ceil(tau / T0 * pas), h1 = tau / n1, n2 = Math.ceil(apres * pas), h2 = apres * T0 / n2, n = n1 + n2, fin = Math.min(pas, n2);
      const out = { t: [0], B: [0], dJ: [0], dmu: [0] }; let somme = 0, nb = 0, r2 = 0;
      const f1 = champ(false), f2 = champ(true);
      for (let i = 1; i <= n; i++) {
        const plateau = i > n1, h = plateau ? h2 : h1, t0 = plateau ? tau + (i - 1 - n1) * h2 : (i - 1) * h1, t = t0 + h;
        y = Integ().rk4(plateau ? f2 : f1, t0, y, h); z = Integ().rk4(f0, t0, z, h); const d = lz(y) - lz(z);
        if (i % every === 0 || i === n) { out.t.push(t); out.B.push(B(t)); out.dJ.push(m * d); out.dmu.push(q / 2 * d); }
        if (n - i < fin) { somme += d; nb++; r2 += y[0] * y[0] + y[1] * y[1]; }
      }
      const d = somme / nb;
      return { courbe: out, J0: m * l0, mu0: q / 2 * l0, dJ: m * d, dmu: q / 2 * d, r2: r2 / nb, omega0: w0, omegaL: Math.abs(q * B1) / (2 * m),
        predit: { dJ: -q * r0 * r0 * B1 / 2, dmu: -q * q * r0 * r0 * B1 / (4 * m) }, B: B };
    }
    /* (34.17) summed over the atom, times n atoms per m³: χ = −μ0 n Σ q² ⟨r²⟩/(6m) = −μ0 n Z e² ⟨r²⟩/(6 m_e) for Z electrons
       sharing one ⟨r²⟩ (m²). Use n = N_A for the molar susceptibility (m³·mol⁻¹). Spherical atoms (⟨x² + y²⟩ = 2⟨r²⟩/3), no
       permanent moment, |χ| ≪ 1 so that B ≈ μ0 H. r2DepuisChi: the inverse, ⟨r²⟩ per electron from a measured χ. */
    function chiLangevin(n, Z, r2) { pos(n, "n"); pos(Z, "Z"); pos(r2, "r2"); return -MU0 * n * Z * QE * QE * r2 / (6 * ME); }
    function r2DepuisChi(chi, n, Z) { fini(chi, "chi"); pos(n, "n"); pos(Z, "Z"); if (!(chi < 0)) err("il faut χ < 0 (diamagnétique)"); return -chi * 6 * ME / (MU0 * n * Z * QE * QE); }
    /* ⟨r²⟩ of a hydrogen-like 1s orbital of effective charge Zeff: 3 a0²/Zeff² (exact for that orbital). */
    function r2Hydrogenoide(Zeff) { pos(Zeff, "Zeff"); return 3 * Cst.a0 * Cst.a0 / (Zeff * Zeff); }
    /* molar susceptibility of helium gas at 20 °C, m³·mol⁻¹ (Wikipedia « Magnetic susceptibility ») */
    const CHI_MOLAIRE_HELIUM = -2.38e-11;

    Object.assign(api, { SUSCEPTIBILITES, forceSusceptible, levitation, momentOrbite, S2_FORMES, facteurGClassique, corpsTournant,
      PARTICULES, rapportGyromagnetique, vitesseEquateur, frequencePrecession, precessionExacte, precessionPas, orbiteDiamagnetique,
      chiLangevin, r2DepuisChi, r2Hydrogenoide, CHI_MOLAIRE_HELIUM });
  }

  /* ---------- Étape « Théorème de Larmor et moment cinétique quantique » (II.34.5 à 34.8) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const TAU = 2 * Math.PI, HBAR = Cst.hbar;
    const err = m => { throw new Error("Larmor et moment cinétique : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };

    /* §34-5. A charge bound by a central force, in units where m = 1, the semi-major axis a = 1 and ω0 = 1 (period 2π):
       "coulomb" F = −r/r³, started at perihelion 1 − e at the Kepler speed; "harmonique" F = −r, started at (1, 0) at the speed
       √(1 − e²) (ellipse of semi-axes 1 and √(1 − e²)). Motion in the plane z = 0, B along z. wL is the angular velocity of the
       Larmor frame, signed: ω = −qB/(2m) (34.22a), so the magnetic acceleration (q/m) v ∧ B is 2 wL ẑ ∧ v. The lab orbit starts
       with the field-free velocity seen from the frame turning at wL: v = v' + wL ẑ ∧ r. Integ.rk4 in the lab, pas steps per
       period, over tours periods; the field-free reference too. In the turning frame the exact equation is a' = F − wL² r: the
       centrifugal force and the magnetic force on the frame's own velocity leave this second-order rest. centrifuge: true adds
       −wL² r to the reference, which makes it exact (for "harmonique", the field-free motion at √(1 + wL²)).
       Returns samples { t, lab, tournant, ref } every `every` steps ([x, y] each) and the largest distances, in units of a:
       ecartLab = max |r − r_ref| (first order in wL t: the rotation is real), ecart = max |r' − r_ref| (second order). */
    function orbiteLarmor(o) {
      o = o || {};
      const force = o.force || "coulomb"; if (force !== "coulomb" && force !== "harmonique") err("force : coulomb ou harmonique");
      const wL = fini(o.wL == null ? 0.05 : o.wL, "wL"), e = fini(o.e == null ? 0.5 : o.e, "e");
      if (!(e >= 0 && e < 0.95)) err("e doit être dans [0 ; 0,95]");
      const tours = pos(o.tours == null ? 3 : o.tours, "tours"), pas = o.pas == null ? 400 : o.pas, every = o.every || 4;
      if (!Number.isInteger(pas) || pas < 50) err("pas doit être un entier ≥ 50");
      const kc = o.centrifuge ? wL * wL : 0;
      const Fc = force === "coulomb" ? (x, y) => { const r = Math.hypot(x, y), k = -1 / (r * r * r); return [k * x, k * y]; } : (x, y) => [-x, -y];
      const lab = (t, s) => { const f = Fc(s[0], s[1]); return [s[2], s[3], f[0] - 2 * wL * s[3], f[1] + 2 * wL * s[2]]; };
      const ref = (t, s) => { const f = Fc(s[0], s[1]); return [s[2], s[3], f[0] - kc * s[0], f[1] - kc * s[1]]; };
      const r0 = force === "coulomb" ? 1 - e : 1, v0 = force === "coulomb" ? Math.sqrt((1 + e) / (1 - e)) : Math.sqrt(1 - e * e);
      let y = [r0, 0, 0, v0 + wL * r0], z = [r0, 0, 0, v0];
      const n = Math.ceil(tours * pas), h = tours * TAU / n, out = { t: [0], lab: [[r0, 0]], tournant: [[r0, 0]], ref: [[r0, 0]] };
      let ecart = 0, ecartLab = 0;
      for (let i = 1; i <= n; i++) {
        const t0 = (i - 1) * h, t = i * h;
        y = Integ().rk4(lab, t0, y, h); z = Integ().rk4(ref, t0, z, h);
        const c = Math.cos(wL * t), s = Math.sin(wL * t), xr = c * y[0] + s * y[1], yr = -s * y[0] + c * y[1];   // r' = R(−wL t) r
        ecart = Math.max(ecart, Math.hypot(xr - z[0], yr - z[1])); ecartLab = Math.max(ecartLab, Math.hypot(y[0] - z[0], y[1] - z[1]));
        if (i % every === 0 || i === n) { out.t.push(t); out.lab.push([y[0], y[1]]); out.tournant.push([xr, yr]); out.ref.push([z[0], z[1]]); }
      }
      return { courbe: out, ecart, ecartLab, wL, force, e };
    }
    /* The normal Zeeman triplet: a line of frequency f0 emitted by an orbital motion (g = 1) splits, seen along B, into
       f0 ± fL with fL = e|B|/(4π m_e) (34.22b), and keeps f0 across the field. Larmor frame: weak field (fL ≪ f0). An atom with
       spin (g ≠ 1) gives the anomalous pattern instead: this model then fails. */
    function zeemanNormal(f0, B) {
      pos(f0, "f0"); fini(B, "B"); const fL = Cst.e * Math.abs(B) / (2 * TAU * Cst.m_e);
      return { fL, raies: [f0 - fL, f0, f0 + fL], rapport: fL / f0 };
    }

    /* §34-6. A classical gas of N charges (q = ±1, m = 1, kT = 1) in a disk of radius 1 with specular walls, in a uniform B
       along z. B = 1/rc, so rc = √(m kT)/(|q| B) is the thermal cyclotron radius in units of the radius of the disk.
       Positions uniform, velocities Maxwell (σ = 1 per component) — the equilibrium distribution, which B does not change.
       Each particle follows circular arcs, computed exactly: guiding centre G = r − ẑ ∧ v/ωc (ωc = qB/m), hits of the wall
       solved in closed form, reflection v' = v − 2(v·n)n. Its moment μ = (q/2)(r ∧ v)·ẑ is averaged over periodes cyclotron
       periods, also in closed form on each arc. A particle whose circle never meets the wall (|G| + ρ < 1) is "interieur":
       its moment is exactly −m v²/(2B), always against B. The others are "bord" (skipping orbits along the wall).
       Returns the sums in units of N kT/B, { interieur, bord, total, sigma, nBord, traces }: sigma is the statistical spread
       of total (√N times the spread of one particle), and the mean of total is exactly 0 for any rc (Bohr and van Leeuwen).
       traces: the paths of the first `traces` particles over `duree` periods (60 points per period). graine: the seed. */
    function gazDisque(o) {
      o = o || {};
      const N = o.N == null ? 2000 : o.N, rc = pos(o.rc == null ? 0.1 : o.rc, "rc"), periodes = pos(o.periodes == null ? 20 : o.periodes, "periodes");
      if (!Number.isInteger(N) || N < 2) err("N doit être un entier ≥ 2");
      const sq = o.q == null ? 1 : Math.sign(fini(o.q, "q")); if (!sq) err("q doit être non nul");
      const nT = o.traces || 0, duree = o.duree == null ? 3 : pos(o.duree, "duree");
      const B = 1 / rc, wc = sq * B, aw = Math.abs(wc), T = periodes * TAU / aw, Ttr = duree * TAU / aw;
      let s = o.graine == null ? 12345 : o.graine; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
      const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(TAU * rnd());
      /* time to the next hit of the wall, from the angle th0 of ρ about G; ρ turns as th0 − ωc t */
      const prochain = (G, rho, th0) => {
        const g = Math.hypot(G[0], G[1]); if (g < 1e-14) return Infinity;
        const C = (1 - g * g - rho * rho) / (2 * rho * g); if (!(C > -1 && C < 1)) return Infinity;
        const b = Math.atan2(G[1], G[0]), a = Math.acos(C); let best = Infinity;
        for (const th of [b + a, b - a]) { let d = ((th0 - th) * sq) % TAU; if (d < 0) d += TAU; if (d > 1e-9 && d < TAU - 1e-9) best = Math.min(best, d); }
        return best / aw;
      };
      let sumI = 0, sumB = 0, sum2 = 0, nBord = 0; const traces = [];
      for (let k = 0; k < N; k++) {
        const u = Math.sqrt(rnd()), ph = TAU * rnd(), x = u * Math.cos(ph), yy = u * Math.sin(ph), vx = gauss(), vy = gauss();
        let G = [x + vy / wc, yy - vx / wc]; const rho = Math.hypot(vx, vy) / aw; let th0 = Math.atan2(yy - G[1], x - G[0]);
        const tr = k < nT ? [] : null, pousse = (t1, d) => { if (!tr || t1 >= Ttr) return;
          const fin = Math.min(d, Ttr - t1), m = Math.max(1, Math.ceil(fin / Ttr * duree * 60));
          for (let i = 0; i <= m; i++) { const a = th0 - wc * fin * i / m; tr.push([G[0] + rho * Math.cos(a), G[1] + rho * Math.sin(a)]); } };
        let mu;
        if (Math.hypot(G[0], G[1]) + rho < 1) { mu = -(vx * vx + vy * vy) / (2 * B); sumI += mu; pousse(0, Ttr); }
        else {
          nBord++; let t = 0, acc = 0;
          for (;;) {
            let d = prochain(G, rho, th0); const final = t + d >= T; if (final) d = T - t;
            pousse(t, d);
            const a1 = th0 - wc * d, p0 = [rho * Math.cos(th0), rho * Math.sin(th0)], p1 = [rho * Math.cos(a1), rho * Math.sin(a1)];
            acc += sq / 2 * (G[0] * (p1[1] - p0[1]) - G[1] * (p1[0] - p0[0]) - wc * rho * rho * d);
            if (final) break;
            t += d; let P = [G[0] + p1[0], G[1] + p1[1]]; const r = Math.hypot(P[0], P[1]); P = [P[0] / r, P[1] / r];
            const v = [wc * p1[1], -wc * p1[0]], vn = v[0] * P[0] + v[1] * P[1], w = [v[0] - 2 * vn * P[0], v[1] - 2 * vn * P[1]];
            G = [P[0] + w[1] / wc, P[1] - w[0] / wc]; th0 = Math.atan2(P[1] - G[1], P[0] - G[0]);
          }
          mu = acc / T; sumB += mu;
        }
        sum2 += mu * mu; if (tr) traces.push({ bord: !(Math.hypot(x + vy / wc, yy - vx / wc) + rho < 1), mu, points: tr });
      }
      const unite = N / B, moy = (sumI + sumB) / N, sigma = Math.sqrt(Math.max(0, sum2 / N - moy * moy) * N);
      return { interieur: sumI / unite, bord: sumB / unite, total: (sumI + sumB) / unite, sigma: sigma / unite, nBord, N, rc, traces };
    }

    /* §34-7. Quantum angular momentum of spin j (an integer or a half-integer ≥ 0), in units of ħ: the 2j + 1 values of J_z,
       j, j − 1, …, −j (34.23); their mean square with equal weights (34.25), equal to j(j + 1)/3; J·J = 3⟨J_z²⟩ = j(j + 1) (34.24),
       (34.26); the smallest angle between J and the axis, acos(j/√(j(j + 1))). Isolated system, equal weights: an unpolarised
       sample. */
    const spin = j => { fini(j, "j"); if (!(j >= 0) || Math.abs(2 * j - Math.round(2 * j)) > 1e-9) err("j doit être un entier ou un demi-entier ≥ 0"); return Math.round(2 * j) / 2; };
    function valeursJz(j) { j = spin(j); const out = []; for (let k = 0; k <= 2 * j; k++) out.push(j - k); return out; }
    function moyenneJz2(j) { const v = valeursJz(j); return v.reduce((a, m) => a + m * m, 0) / v.length; }
    function carreJ(j) { j = spin(j); return j * (j + 1); }
    function angleMin(j) { j = spin(j); if (j === 0) err("j = 0 : aucune direction"); return Math.acos(j / Math.sqrt(j * (j + 1))); }
    /* A rigid diatomic rotor of atoms m1, m2 (kg): E_J = ħ² J(J + 1)/(2I), so the line J → J − 1 is at J ħ/(2π I). From the
       measured J = 1 → 0 line nu10 (Hz): I, the reduced mass, the bond length r = √(I/μ), and rNaif, the length one would
       find with J² in place of J(J + 1) (line at ħ/(4π I)): smaller by √2. Rigid: centrifugal stretching is ~10⁻⁵ at low J. */
    function rotateurRigide(nu10, m1, m2) {
      pos(nu10, "nu10"); pos(m1, "m1"); pos(m2, "m2");
      const I = HBAR / (TAU * nu10), mu = m1 * m2 / (m1 + m2);
      return { I, mu, r: Math.sqrt(I / mu), rNaif: Math.sqrt(I / (2 * mu)), raie: J => { pos(J, "J"); return J * HBAR / (TAU * I); } };
    }

    /* §34-8. Magnetic energy of the 2j + 1 states of an atom (or nucleus) of factor g in a uniform B along z:
       U = −μ_z B (34.29), with μ = −g (q_e/2m) J (34.27) for electrons: U = g μ_B B J_z/ħ (34.29b), equally spaced by g μ_B B.
       o.magneton (default μ_B) and o.signe (default +1, the electron sign; −1 for a nucleus whose moment is +g μ_N J/ħ).
       Weak field: the splitting small against the spacing of the other atomic levels (no Paschen–Back regime). */
    function niveauxMagnetiques(j, g, B, o) {
      o = o || {}; fini(g, "g"); fini(B, "B");
      const mag = o.magneton == null ? Cst.mu_B : pos(o.magneton, "magneton"), sg = o.signe == null ? 1 : o.signe;
      if (sg !== 1 && sg !== -1) err("signe vaut 1 ou −1");
      return valeursJz(j).map(m => ({ m, U: sg * g * mag * B * m }));
    }
    function ecartMagnetique(g, B, magneton) { fini(g, "g"); fini(B, "B"); return Math.abs(g * (magneton == null ? Cst.mu_B : pos(magneton, "magneton")) * B); }
    /* the splitting against the thermal energy k_B T: the number that decides whether the field orders the moments */
    function rapportThermique(g, B, T, magneton) { pos(T, "T"); return ecartMagnetique(g, B, magneton) / (Cst.k_B * T); }

    Object.assign(api, { orbiteLarmor, zeemanNormal, gazDisque, valeursJz, moyenneJz2, carreJ, angleMin, rotateurRigide,
      niveauxMagnetiques, ecartMagnetique, rapportThermique });
  }

  /* ---------- Étape « Inductance » (II.17.5 à 17.8) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, TAU = 2 * Math.PI;
    const err = m => { throw new Error("inductance : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const pos0 = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const entier = (n, nom, min) => { if (!(Number.isInteger(n) && n >= min)) err(nom + " doit être un entier ≥ " + min); return n; };
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

    /* §17-5. An alternator: a flat coil of N turns, area S, turning at ω in a uniform static B, angle θ = ωt between its normal
       and B, feeding a load R through its own inductance L (L = 0: Feynman's case). ℰ = N B S ω sin ωt. Steady state, complex
       notation (d/dt → iω, the Laplace transform at s = iω): I = ℰ/(R + iωL), i(t) = I0 sin(ωt − φ), tan φ = ωL/R.
       The torque of B on the coil carrying i, N i S B sin θ, opposes the rotation; the hand supplies ω times it, which is at every
       instant R i² + L i di/dt: Joule heat plus the change of ½ L i². phases: 3 puts three such coils at 120° on one shaft, each
       with its own load R and its own L: the torque becomes constant, (3/2) N S B I0 cos φ. Rigid coil, uniform B; the field of the
       coil's current acts only through L (no armature reaction on B); mutual inductance between the three coils neglected. */
    function alternateurCharge(o) {
      const N = pos(o.N, "N"), B = pos(o.B, "B"), S = pos(o.S, "S"), w = pos(o.omega, "omega"), R = pos(o.R, "R");
      const L = pos0(o.L == null ? 0 : o.L, "L"), ph = o.phases == null ? 1 : o.phases;
      if (ph !== 1 && ph !== 3) err("phases vaut 1 ou 3");
      /* I = ℰ/(R + iωL) with Cx: its modulus and its lag */
      const Cx = node ? require("./lecons/complexes.js") : root.Cx, E0 = N * B * S * w, Ic = Cx.div(Cx.c(E0), Cx.c(R, w * L));
      const I0 = Cx.abs(Ic), phi = -Cx.arg(Ic);
      const dec = k => TAU * (k || 0) / 3;
      const somme = f => t => { fini(t, "t"); let s = 0; for (let k = 0; k < ph; k++) s += f(t, k); return s; };
      const fem = (t, k) => E0 * Math.sin(w * t - dec(k)), i = (t, k) => I0 * Math.sin(w * t - phi - dec(k));
      const didt = (t, k) => w * I0 * Math.cos(w * t - phi - dec(k));
      const couple = somme((t, k) => N * S * B * i(t, k) * Math.sin(w * t - dec(k)));
      const c0 = N * S * B * I0 / 2;
      return { femMax: E0, I0, phi, Z: Math.hypot(R, w * L), fem, i, couple,
        pMeca: t => w * couple(t), pJoule: somme((t, k) => R * i(t, k) ** 2), dUdt: somme((t, k) => L * i(t, k) * didt(t, k)),
        pFem: somme((t, k) => fem(t, k) * i(t, k)),
        pMoy: ph * R * I0 * I0 / 2, coupleMoy: ph * c0 * Math.cos(phi),
        coupleMin: ph === 3 ? 3 * c0 * Math.cos(phi) : c0 * (Math.cos(phi) - 1), coupleMax: ph === 3 ? 3 * c0 * Math.cos(phi) : c0 * (Math.cos(phi) + 1) };
    }

    /* §17-5, the crossbar: a bar of mass m and length w slides without friction on two rails joined by a resistance R, in a
       uniform B normal to the plane; a constant force F pulls it (F = 0: launched at v0 and left alone). ℰ = v B w (17.19),
       I = ℰ/R (17.20), force on the bar −B²w² v/R (17.22): m dv/dt = F − k v, k = B²w²/R. v(t) = vLim + (v0 − vLim) e^(−t/τ),
       τ = m/k, vLim = F/k. Joule heat ∫ R I² dt in closed form: the work of F equals the change of ½ m v² plus that heat.
       Inductance of the circuit neglected (L/R ≪ τ); rails and bar of negligible resistance against R; B uniform over the path. */
    function barreRails(o) {
      const m = pos(o.m, "m"), B = pos(o.B, "B"), w = pos(o.w, "w"), R = pos(o.R, "R");
      const v0 = fini(o.v0 == null ? 0 : o.v0, "v0"), F = fini(o.F == null ? 0 : o.F, "F");
      const k = B * B * w * w / R, tau = m / k, vL = F / k, d = v0 - vL;
      const e = t => Math.exp(-pos0(t, "t") / tau);
      const v = t => vL + d * e(t), x = t => vL * t + d * tau * (1 - e(t));
      const joule = t => k * (vL * vL * t + 2 * vL * d * tau * (1 - e(t)) + d * d * tau / 2 * (1 - e(t) ** 2));
      return { k, tau, vLim: vL, v, x, joule, travail: t => F * x(t), ec: t => m * v(t) ** 2 / 2,
        fem: u => B * w * fini(u, "v"), courant: u => B * w * fini(u, "v") / R, force: u => -k * fini(u, "v") };
    }

    /* §17-6. Two thin circular loops. Loop 1: radius R1, centre 0, axis z. Loop 2: radius R2, centre (d, 0, h), its normal tilted
       by alpha from z towards x: n2 = (sin α, 0, cos α). Positive senses: counterclockwise about each normal. Five independent
       ways to the mutual inductance (H): M21 = flux of B1 (1 A) through the disk of 2; M12 = flux of B2 (1 A) through the disk of 1;
       circulation = ∮2 A1·ds2; neumann = (μ0/4π) ∮∮ ds1·ds2/r12 (17.30a), np segments per loop; dipole = π R2² B1(centre 2)·n2,
       the small-loop limit. Disks by the midpoint rule on n rings of equal area × 2n sectors: error in 1/n², slow when a loop
       nearly touches the other's disk (keep the wires apart by ≫ R/n). Thin wires: the wire radius ≪ every distance. */
    function base2(d, h, a) { const c = Math.cos(a), s = Math.sin(a); return { o: [d, 0, h], e1: [c, 0, -s], e2: [0, 1, 0], n: [s, 0, c] }; }
    const BASE1 = { o: [0, 0, 0], e1: [1, 0, 0], e2: [0, 1, 0], n: [0, 0, 1] };
    function local(b, P) { const r = [P[0] - b.o[0], P[1] - b.o[1], P[2] - b.o[2]]; return [dot(r, b.e1), dot(r, b.e2), dot(r, b.n)]; }
    function global(b, v) { return [0, 1, 2].map(i => v[0] * b.e1[i] + v[1] * b.e2[i] + v[2] * b.n[i]); }
    function champBoucle(R, b, P) {
      const [x, y, z] = local(b, P), rho = Math.hypot(x, y), f = need("spireExacte")(1, R, rho, z);
      const c = rho > 0 ? x / rho : 0, s = rho > 0 ? y / rho : 0;
      return { B: global(b, [f.Brho * c, f.Brho * s, f.Bz]), A: global(b, [-f.Aphi * s, f.Aphi * c, 0]) };
    }
    function fluxDisque(Rs, bs, Rc, bc, n) {
      let s = 0; const nt = 2 * n;
      for (let i = 0; i < n; i++) { const r = Rc * Math.sqrt((i + 0.5) / n);
        for (let j = 0; j < nt; j++) { const t = TAU * (j + 0.5) / nt, P = global(bc, [r * Math.cos(t), r * Math.sin(t), 0]).map((x, k) => x + bc.o[k]);
          s += dot(champBoucle(Rs, bs, P).B, bc.n); } }
      return s * Math.PI * Rc * Rc / (n * nt);
    }
    function pointsBoucle(R, b, np) {
      return Array.from({ length: np }, (_, j) => { const t = TAU * (j + 0.5) / np, c = Math.cos(t), s = Math.sin(t), ds = TAU * R / np;
        return { p: global(b, [R * c, R * s, 0]).map((x, k) => x + b.o[k]), ds: global(b, [-s * ds, c * ds, 0]) }; });
    }
    function mutuelleInclinee(o) {
      const R1 = pos(o.R1, "R1"), R2 = pos(o.R2, "R2"), d = fini(o.d || 0, "d"), h = fini(o.h, "h"), a = fini(o.alpha || 0, "alpha");
      const n = entier(o.n == null ? 40 : o.n, "n", 2), np = entier(o.np == null ? 360 : o.np, "np", 8), b2 = base2(d, h, a);
      const p1 = pointsBoucle(R1, BASE1, np), p2 = pointsBoucle(R2, b2, np);
      const circulation = p2.reduce((s, q) => s + dot(champBoucle(R1, BASE1, q.p).A, q.ds), 0);
      let nm = 0;
      for (const u of p1) for (const q of p2) nm += dot(u.ds, q.ds) / Math.hypot(u.p[0] - q.p[0], u.p[1] - q.p[1], u.p[2] - q.p[2]);
      return { M21: fluxDisque(R1, BASE1, R2, b2, n), M12: fluxDisque(R2, b2, R1, BASE1, n), circulation, neumann: MU0 / (4 * Math.PI) * nm,
        dipole: Math.PI * R2 * R2 * dot(champBoucle(R1, BASE1, b2.o).B, b2.n), bobine2: b2 };
    }

    /* §17-6, (17.23)–(17.25): a long solenoid of N1 turns, length l, section S, and N2 turns wound on it. B = μ0 N1 I1/l inside,
       M = μ0 N1 N2 S/l. Long solenoid: end effects of relative order a/l (see inductanceNappe); the outer coil may be wider than
       the solenoid, its flux is the same (B ≈ 0 outside a long solenoid). */
    function mutuelleSolenoide(N1, N2, S, l) { pos(N1, "N1"); pos(N2, "N2"); pos(S, "S"); pos(l, "l"); return MU0 * N1 * N2 * S / l; }

    /* §17-7. Two coils in series, the current I the same in both: the flux through the whole is (L1 + L2 ± 2M) I, + when their
       fields add (« aiding »), − when they oppose. Measuring both gives M = (Laide − Loppose)/4 without knowing L1 or L2.
       Linear coils (no iron saturation); the wiring between them adds nothing. */
    function bobinesSerie(L1, L2, M) {
      pos(L1, "L1"); pos(L2, "L2"); fini(M, "M"); if (M * M > L1 * L2) err("il faut |M| ≤ √(L1 L2)");
      return { aide: L1 + L2 + 2 * Math.abs(M), oppose: L1 + L2 - 2 * Math.abs(M) };
    }

    /* §17-7. A circuit of resistance R and inductance L switched at t = 0 onto the constant voltage U, with i(0) = i0:
       L di/dt + R i = U, i(t) = U/R + (i0 − U/R) e^(−t/τ), τ = L/R. Energies over [0, t] in closed form: source ∫U i dt,
       Joule ∫R i² dt, stored ½ L i². The mechanical twin: mass m = L, force F = U, viscous coefficient b = R, velocity v = i.
       Constant L and R (no saturation, no heating), the capacitance of the winding neglected (t ≫ √(LC)). */
    function circuitRL(o) {
      const U = fini(o.U, "U"), R = pos(o.R, "R"), L = pos(o.L, "L"), i0 = fini(o.i0 == null ? 0 : o.i0, "i0");
      const tau = L / R, iInf = U / R, d = i0 - iInf, e = t => Math.exp(-pos0(t, "t") / tau);
      const q = t => iInf * t + d * tau * (1 - e(t));      // ∫ i dt
      return { tau, iInf, i: t => iInf + d * e(t), uL: t => -R * d * e(t), source: t => U * q(t),
        joule: t => R * (iInf * iInf * t + 2 * iInf * d * tau * (1 - e(t)) + d * d * tau / 2 * (1 - e(t) ** 2)),
        stockee: t => L * (iInf + d * e(t)) ** 2 / 2 };
    }

    /* §17-8 and Nagaoka. A single-layer solenoid of N turns, radius a, length longueur, as a uniform sheet of current (pitch ≪ a):
       L = n² ∫∫ M(z − z') dz dz' = 2 n² ∫0^ℓ (ℓ − u) M(u) du, M(u) the mutual inductance of two coaxial loops of radius a at the
       distance u (mutuelleSpires). M has a log singularity at u = 0: u = ℓ t² removes it; midpoint rule on t, n points (error
       ~1/n²). K = L / (μ0 N² π a²/ℓ) is Nagaoka's coefficient, 1 for an infinitely long coil. wheeler: the empirical formula
       r²N²/(9r + 10ℓ) µH in inches, here in SI. A real winding differs from the sheet by corrections of the order of the wire
       radius over the pitch (Rosa), not modelled. */
    function inductanceNappe(N, a, longueur, n) {
      pos(N, "N"); pos(a, "a"); const l = pos(longueur, "longueur"); n = entier(n == null ? 2000 : n, "n", 8);
      const Mu = need("mutuelleSpires");
      let s = 0;
      /* below u = 1e-4 a the elliptic parameter rounds to 1: there M = μ0 a (ln(8a/u) − 2), relative error ~ (u/a)² ln(a/u) */
      const Mu0 = u => (u < 1e-4 * a ? MU0 * a * (Math.log(8 * a / u) - 2) : Mu(a, a, u).M);
      for (let j = 0; j < n; j++) { const t = (j + 0.5) / n, u = l * t * t; s += (l - u) * Mu0(u) * 2 * l * t; }
      const nn = N / l, L = 2 * nn * nn * s / n, Lideal = MU0 * N * N * Math.PI * a * a / l;
      return { L, Lideal, K: L / Lideal, wheeler: 1e-6 * N * N * a * a / (0.0254 * (9 * a + 10 * l)) };
    }

    /* §17-8. Energy of two coupled coils (17.38) U = ½ L1 I1² + ½ L2 I2² + M I1 I2, and the smallest U for a given I1, reached at
       I2 = −M I1/L2: ½ (L1 − M²/L2) I1², ≥ 0 only if M² ≤ L1 L2 (17.42). k = M/√(L1 L2) (17.43). Linear coils. */
    function energieCouplee(L1, L2, M, I1, I2) { pos(L1, "L1"); pos(L2, "L2"); fini(M, "M"); fini(I1, "I1"); fini(I2, "I2");
      return L1 * I1 * I1 / 2 + L2 * I2 * I2 / 2 + M * I1 * I2; }
    function energieMinimale(L1, L2, M, I1) { pos(L1, "L1"); pos(L2, "L2"); fini(M, "M"); fini(I1, "I1");
      return { I2: -M * I1 / L2, U: (L1 - M * M / L2) * I1 * I1 / 2, k: M / Math.sqrt(L1 * L2) }; }

    /* §17-8, Poynting. A long solenoid (n turns per metre, radius a, length ℓ ≫ a) whose current I rises at the constant rate
       dIdt. Inside, at the radius r ≤ a: B = μ0 n I along the axis, E_φ = −μ0 n r dIdt/2 (Faraday on the circle r), so
       S = E ∧ B/μ0 is radial, S_r = −μ0 n² r I dIdt/2: inward while I grows. Inflow through the cylinder r: 2π r ℓ |S_r| =
       μ0 n² π r² ℓ I dIdt = d/dt of B²/(2μ0) times the volume π r² ℓ. At r = a, d/dt (½ L I²), L = μ0 n² π a² ℓ (17.50).
       Constant dIdt: ∂E/∂t = 0, so the quasi-static fields are exact (no displacement-current correction to B; retardation
       only for a time ℓ/c after the start of the ramp); the electric energy ε0E²/2 stays constant. Ends neglected (order a/ℓ). */
    function poyntingSolenoide(o) {
      const n = pos(o.n, "n"), a = pos(o.a, "a"), l = pos(o.longueur, "longueur"), I = fini(o.I, "I"), dI = fini(o.dIdt, "dIdt");
      const rr = r => { pos0(r, "r"); if (r > a) err("r ≤ a attendu (dans la bobine)"); return r; };
      const B = MU0 * n * I, L = MU0 * n * n * Math.PI * a * a * l;
      return { B, L, E: r => -MU0 * n * rr(r) * dI / 2, S: r => -MU0 * n * n * rr(r) * I * dI / 2,
        entrant: r => MU0 * n * n * Math.PI * rr(r) ** 2 * l * I * dI, energie: r => B * B / (2 * MU0) * Math.PI * rr(r) ** 2 * l,
        dUdt: L * I * dI, U: L * I * I / 2 };
    }

    /* §17-8, Poynting. A straight round wire of radius a and resistivity rho carrying the steady current I, uniform over the
       section. Inside and just outside, E = ρ I/(π a²) along the wire (tangential E continuous); B = μ0 I r/(2π a²) inside,
       μ0 I/(2π r) outside; S = E ∧ B/μ0 points to the axis, |S| = E B/μ0. Inflow through a cylinder of radius r and length ℓ:
       ρ ℓ I² r²/(π a⁴) for r ≤ a (the Joule heat inside r), R I² = ρ ℓ I²/(π a²) beyond. Outside, it holds while E stays
       uniform: r small against the distance to the return conductor. Steady current (skin depth ≫ a). */
    function poyntingFil(o) {
      const I = fini(o.I, "I"), a = pos(o.a, "a"), rho = pos(o.rho, "rho"), l = pos(o.longueur, "longueur");
      const E = rho * I / (Math.PI * a * a), R = rho * l / (Math.PI * a * a);
      const B = r => { pos0(r, "r"); return r <= a ? MU0 * I * r / (2 * Math.PI * a * a) : MU0 * I / (2 * Math.PI * r); };
      const entrant = r => (pos0(r, "r") <= a ? rho * l * I * I * r * r / (Math.PI * a ** 4) : R * I * I);
      return { E, R, B, S: r => E * B(r) / MU0, entrant, joule: r => rho * (I / (Math.PI * a * a)) ** 2 * Math.PI * Math.min(pos0(r, "r"), a) ** 2 * l };
    }

    /* The Poynting balance of a FINITE solenoid, by quadrature: N loops of radius a spread over the length (solenoideFini, a
       sheet of n turns per metre), current I rising at dIdt. Fields from spireExacte: B, and E_φ = −(dIdt) Aφ per ampere (no
       charges, quasi-static, exact for constant dIdt). Test surface: the closed cylinder of radius b < a from −H to H (no current
       crosses it). entrant = inflow of S through its side and its two ends; dUdt = d/dt ∫ B²/(2μ0) dV inside = 2 I dIdt U(1 A).
       Simpson rule, q intervals on each side (even); fields smooth inside, so the error falls fast with q. */
    function bilanPoyntingFini(o) {
      const n = pos(o.n, "n"), a = pos(o.a, "a"), l = pos(o.longueur, "longueur"), N = entier(o.N == null ? 200 : o.N, "N", 1);
      const b = pos(o.b, "b"), H = pos(o.H, "H"), I = fini(o.I, "I"), dI = fini(o.dIdt, "dIdt"), q = entier(o.q == null ? 40 : o.q, "q", 2);
      if (!(b < a)) err("il faut b < a : la surface ne doit couper aucun courant"); if (q % 2) err("q doit être pair");
      const sp = need("solenoideFini")(n, 1, a, l, N), f = need("spireExacte");
      const champ = (rho, z) => sp.reduce((s, w) => { const c = f(w.I, w.a, rho, z - w.z); s.Aphi += c.Aphi; s.Brho += c.Brho; s.Bz += c.Bz; return s; }, { Aphi: 0, Brho: 0, Bz: 0 });
      const simpson = (g, x0, x1) => { const h = (x1 - x0) / q; let s = g(x0) + g(x1); for (let i = 1; i < q; i++) s += (i % 2 ? 4 : 2) * g(x0 + i * h); return s * h / 3; };
      /* per ampere: E_φ = −dI·Aφ, B = I·b ; S = E ∧ B/μ0 = (E_φ/μ0)(B_z ρ̂ − B_ρ ẑ) */
      const cote = simpson(z => { const c = champ(b, z); return -(-dI * c.Aphi) * (I * c.Bz) / MU0 * TAU * b; }, -H, H);
      const bout = zz => simpson(r => { const c = champ(r, zz); return -(-dI * c.Aphi) * (I * c.Brho) / MU0 * TAU * r; }, 0, b);
      const entrant = cote - bout(H) + bout(-H);
      const U1 = simpson(z => simpson(r => { const c = champ(r, z); return (c.Brho ** 2 + c.Bz ** 2) / (2 * MU0) * TAU * r; }, 0, b), -H, H);
      return { entrant, dUdt: 2 * I * dI * U1, cote, bouts: bout(-H) - bout(H) };
    }

    Object.assign(api, { alternateurCharge, barreRails, mutuelleInclinee, mutuelleSolenoide, bobinesSerie, circuitRL, inductanceNappe,
      energieCouplee, energieMinimale, poyntingSolenoide, poyntingFil, bilanPoyntingFini });
  }

  /* ---------- Étape « États magnétiques quantifiés » (II.35.1 à 35.3) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const TAU = 2 * Math.PI;
    const err = m => { throw new Error("états quantifiés : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const entier = (x, nom, min) => { if (!Number.isInteger(x) || x < min) err(nom + " doit être un entier ≥ " + min); return x; };

    /* §35-1. What a sorting of atoms by μ_z would find, for atoms of spin j oriented at random, in units of g μ_B.
       Quantum: μ_z = −g μ_B J_z/ħ ((35.3) with q = −q_e), the 2j + 1 values −m of equal weight (unpolarised sample).
       Classical: a vector of the same length √(j(j + 1)) (in g μ_B) pointing anywhere, so μ_z is uniform on [−a, a].
       Both have the same mean square j(j + 1)/3 ((34.25)); the largest values are j and a. ecart: the largest gap between the
       two cumulative distributions (Kolmogorov distance), 0 for j = 0, falling like 1/(2j + 1). Isolated atoms, weak field. */
    function orientations(j) {
      const v = api.valeursJz(j).map(m => 0 - m).sort((a, b) => a - b), n = v.length, J = (n - 1) / 2, a = Math.sqrt(api.carreJ(J));
      const Fc = x => a === 0 ? (x >= 0 ? 1 : 0) : Math.min(1, Math.max(0, (x + a) / (2 * a)));
      let ecart = 0;
      v.forEach((x, k) => { ecart = Math.max(ecart, Math.abs(Fc(x) - k / n), Math.abs(Fc(x) - (k + 1) / n)); });
      if (a === 0) ecart = 0;
      return { j: J, valeurs: v, poids: 1 / n, a, carreMoyen: { quantique: api.moyenneJz2(J), classique: a * a / 3 },
        max: { quantique: J, classique: a }, ecart, repartitionClassique: Fc,
        repartitionQuantique: x => v.filter(y => y <= x).length / n };
    }

    /* §35-2. A silver atom: mass from the standard atomic weight 107,8682 (IUPAC), ground state 5s ²S½: j = 1/2 and
       g ≈ g of the free electron spin (the orbital part is zero; the g of the atom differs from it by ~10⁻⁵). */
    const ARGENT = { m: 107.8682 * Cst.u, j: 0.5, g: api.PARTICULES.electron.g };
    /* Speeds in an effusive beam leaving an oven at T by a small hole: the flux weights each speed by v, so the density is
       v × (Maxwell) normalised, 2 v³/vp⁴ exp(−v²/vp²), vp = √(2 k_B T/m) the most probable speed of the gas in the oven
       (Statistique.vitesses). Free molecular flow: the hole small against the mean free path in the oven. s·m⁻¹. */
    const vpGaz = (m, T) => Math.sqrt(2 * Cst.k_B * pos(T, "T") / pos(m, "m"));
    function vitesseJet(v, m, T) { fini(v, "v"); const vp = vpGaz(m, T); if (v <= 0) return 0; const x = v / vp; return 2 * x * x * x * Math.exp(-x * x) / vp; }
    /* (35.6) applied to one atom: F = μ_z dB/dz (N), constant over a magnet of length L, then a field-free flight D to the
       plate; speed v along the beam, no transverse speed. z = (F/(m v²)) (L²/2 + L D), m. Uniform gradient, z small against the
       gap, and μ_z fixed: the field along the path changes slowly against the precession (adiabatic), true at ω_p ≫ v/L. */
    function deviationSG(o) {
      const muz = fini(o.muz, "muz"), G = fini(o.gradB, "gradB"), m = pos(o.m, "m"), v = pos(o.v, "v"), L = pos(o.L, "L");
      const D = o.D == null ? 0 : fini(o.D, "D"); if (D < 0) err("D doit être ≥ 0");
      const F = muz * G; return { F, z: F / (m * v * v) * (L * L / 2 + L * D), zAimant: F / (m * v * v) * L * L / 2 };
    }
    /* The scale of the deflections over a beam from an oven at T: z0 = F (L²/2 + L D)/(m vp²) = F (L²/2 + L D)/(2 k_B T),
       the deflection of an atom at vp. The mass cancels. Over the beam, ⟨1/v²⟩ = 1/vp², so the mean deflection is z0; the
       density of z = z0 vp²/v² is (z0²/z³) e^(−z0/z) (profilVitesses), largest at z0/3 (zPic), with a long tail of slow atoms. */
    function echelleSG(o) {
      const muz = fini(o.muz, "muz"), G = fini(o.gradB, "gradB"), T = pos(o.T, "T"), L = pos(o.L, "L"), D = o.D == null ? 0 : fini(o.D, "D");
      if (D < 0) err("D doit être ≥ 0");
      const z0 = muz * G * (L * L / 2 + L * D) / (2 * Cst.k_B * T); return { z0, zMoy: z0, zPic: z0 / 3 };
    }
    function profilVitesses(z, z0) { fini(z, "z"); fini(z0, "z0"); if (z0 === 0) err("z0 = 0 : toute la densité en z = 0");
      if (z * z0 <= 0) return 0; const u = z0 / z; return u * u * Math.exp(-u) / Math.abs(z); }
    /* cumulative of profilVitesses: P(Z ≤ z); for z0 > 0 it is (1 + z0/z) e^(−z0/z) at z > 0. z0 = 0: a step at 0. */
    function repartitionVitesses(z, z0) {
      fini(z, "z"); fini(z0, "z0"); const C = (s, a) => s <= 0 ? 0 : (1 + a / s) * Math.exp(-a / s);
      if (z0 === 0) return z >= 0 ? 1 : 0; return z0 > 0 ? C(z, z0) : 1 - C(-z, -z0);
    }
    /* Intensity on the plate of a Stern–Gerlach apparatus, a density in x (m⁻¹, integral 1), at the positions o.x (m).
       o = { j, g, T, gradB, L, D, fente, mode, nc }: the beam has the width fente (m) at the plate (a slit image, uniform),
       its speeds those of vitesseJet; "quantique": the 2j + 1 values μ_z = −g μ_B m, weight 1/(2j + 1) each; "classique":
       moments of length g μ_B √(j(j + 1)) oriented at random, μ_z uniform, by nc midpoints (default 400). Same model as
       echelleSG: uniform gradient, adiabatic, no transverse spread of the beam other than the slit. { I, z1, pics } with z1 the
       z0 of μ_z = μ_B and pics the most probable deflection of each quantum component (without the slit). */
    function profilSG(o) {
      const J = api.orientations(o.j), g = fini(o.g, "g"), w = pos(o.fente, "fente"), mode = o.mode || "quantique";
      if (mode !== "quantique" && mode !== "classique") err("mode : quantique ou classique");
      if (!Array.isArray(o.x)) err("x doit être un tableau de positions");
      const z1 = echelleSG({ muz: Cst.mu_B, gradB: o.gradB, T: o.T, L: o.L, D: o.D }).z0;
      const raie = (x, z0) => (repartitionVitesses(x + w / 2, z0) - repartitionVitesses(x - w / 2, z0)) / w;
      let comps;
      if (mode === "quantique") comps = J.valeurs.map(u => ({ z0: z1 * g * u, p: J.poids }));
      else { const nc = entier(o.nc == null ? 400 : o.nc, "nc", 2); comps = [];
        for (let k = 0; k < nc; k++) comps.push({ z0: z1 * g * J.a * (-1 + (2 * k + 1) / nc), p: 1 / nc }); }
      return { I: o.x.map(x => comps.reduce((s, c) => s + c.p * raie(x, c.z0), 0)), z1, pics: J.valeurs.map(u => z1 * g * u / 3) };
    }

    /* §35-3. Rabi's formula: a spin 1/2 of resonance ω_p in a field B0, plus a field B1 turning at ω in the plane normal to B0,
       in the sense of the precession, for a time t, starting in one state: probability of ending in the other,
       P = (ω1/Ω)² sin²(Ωt/2), ω1 = |γ| B1, Ω = √(ω1² + (ω − ω_p)²). Exact for that turning field. For a linear field of
       amplitude B′, only its turning half acts: ω1 = |γ| B′/2, error of order ω1/ω_p (the other half shifts the line by
       ω1²/(4ω_p), Bloch and Siegert). dw = ω − ω_p in rad·s⁻¹. */
    function rabi(dw, w1, t) {
      fini(dw, "dw"); fini(w1, "w1"); if (w1 < 0) err("w1 doit être ≥ 0"); fini(t, "t"); if (t < 0) err("t doit être ≥ 0");
      if (w1 === 0) return 0; const W = Math.hypot(w1, dw), s = Math.sin(W * t / 2); return (w1 / W) * (w1 / W) * s * s;
    }
    /* The classical moment, step by step (Integ.rk4): dμ/dt = γ μ ∧ B, B = B0 ẑ + the transverse field, "lineaire"
       B′ cos(ωt + phase) x̂ or "tournant" B1 (cos, s sin, 0)(ωt + phase), s = −sign γ (the sense of the precession).
       μ starts along +ẑ; P = (1 − μ_z/|μ|)/2. For a spin 1/2 the mean of the spin obeys this very equation, so P is the exact
       quantum probability; no rotating-wave approximation. o = { gamma, B0, B1, omega, t, forme, phase, pas }: pas steps per
       precession period (default 64). Returns { P, mu } at t. */
    function basculeClassique(o) {
      const g = fini(o.gamma, "gamma"), B0 = pos(o.B0, "B0"), B1 = fini(o.B1, "B1"), w = fini(o.omega, "omega"), t = fini(o.t, "t");
      const forme = o.forme || "lineaire", ph = o.phase == null ? 0 : fini(o.phase, "phase"), pas = entier(o.pas == null ? 64 : o.pas, "pas", 8);
      if (forme !== "lineaire" && forme !== "tournant") err("forme : lineaire ou tournant"); if (g === 0) err("gamma = 0 : aucun couple");
      if (t < 0) err("t doit être ≥ 0");
      const s = -Math.sign(g), B = forme === "lineaire" ? (tt => [B1 * Math.cos(w * tt + ph), 0, B0]) : (tt => [B1 * Math.cos(w * tt + ph), s * B1 * Math.sin(w * tt + ph), B0]);
      const f = (tt, m) => { const b = B(tt); return [g * (m[1] * b[2] - m[2] * b[1]), g * (m[2] * b[0] - m[0] * b[2]), g * (m[0] * b[1] - m[1] * b[0])]; };
      const wmax = Math.abs(g) * Math.hypot(B0, Math.abs(B1)) + Math.abs(w), n = Math.max(1, Math.ceil(t * wmax / TAU * pas)), h = t / n;
      let m = [0, 0, 1]; for (let i = 0; i < n; i++) m = Integ().rk4(f, i * h, m, h);
      const r = Math.hypot(m[0], m[1], m[2]); return { P: (1 - m[2] / r) / 2, mu: m };
    }
    /* The Rabi apparatus (Feynman's three magnets): atoms of gyromagnetic ratio gamma cross the uniform field B0 of magnet 2
       over the length l, with a linear transverse field of amplitude B1 (ω1 = |γ| B1/2), at the speeds of vitesseJet(m, T).
       An atom that flips misses the second slit. Current on the detector, relative to the current without B1:
       1 − ⟨P⟩ over the beam, t = l/v, at each frequency of o.f (Hz). Midpoints in v over 0 to 6 vp (nv, default 600).
       Assumes the selecting magnets keep every speed (in a real apparatus slow atoms are deflected more) and B1 switched on and
       off sharply at the ends. { I, fp, vp, tMoy: ⟨l/v⟩ }. */
    function courantRabi(o) {
      const g = fini(o.gamma, "gamma"), B0 = pos(o.B0, "B0"), B1 = fini(o.B1, "B1"), l = pos(o.l, "l"), m = pos(o.m, "m"), T = pos(o.T, "T");
      const nv = entier(o.nv == null ? 600 : o.nv, "nv", 10); if (!Array.isArray(o.f)) err("f doit être un tableau de fréquences");
      const vp = vpGaz(m, T), wp = Math.abs(g) * B0, w1 = Math.abs(g * B1) / 2, dv = 6 * vp / nv, vs = [], ps = [];
      for (let k = 0; k < nv; k++) { const v = (k + 0.5) * dv; vs.push(v); ps.push(vitesseJet(v, m, T) * dv); }
      const S = ps.reduce((a, b) => a + b, 0), Pm = dw => vs.reduce((s, v, k) => s + ps[k] * rabi(dw, w1, l / v), 0) / S;
      return { I: o.f.map(f => 1 - Pm(TAU * fini(f, "f") - wp)), fp: wp / TAU, vp, tMoy: vs.reduce((s, v, k) => s + ps[k] * l / v, 0) / S, Pm };
    }
    /* Depth of the dip at f = fp and its full width at half depth (Hz), from courantRabi: stepping out from the centre, then
       bisection. The width scales like v/l, not like B0: the line is set by the time spent in the field. */
    function largeurRabi(o) {
      const c = courantRabi(Object.assign({}, o, { f: [] })), P0 = c.Pm(0);
      if (!(P0 > 0)) err("aucune bascule à la résonance : B1 = 0 ?");
      let lo = 0, hi = TAU / c.tMoy / 8; while (c.Pm(hi) > P0 / 2) { lo = hi; hi *= 1.5; }
      for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (c.Pm(mid) > P0 / 2) lo = mid; else hi = mid; }
      return { profondeur: P0, largeur: 2 * (lo + hi) / 2 / TAU, fp: c.fp, tMoy: c.tMoy };
    }
    /* Amplitude B′ of the linear field that makes ω1 t = π for an atom that spends t = l/v in it: B′ = 2π v/(|γ| l). */
    function champPi(gamma, l, v) { fini(gamma, "gamma"); if (gamma === 0) err("gamma = 0"); return TAU * pos(v, "v") / (Math.abs(gamma) * pos(l, "l")); }

    Object.assign(api, { orientations, ARGENT, vitesseJet, deviationSG, echelleSG, profilVitesses, repartitionVitesses, profilSG,
      rabi, basculeClassique, courantRabi, largeurRabi, champPi });
  }

  /* ---------- Étape « Paramagnétisme et résonance magnétique nucléaire » (II.35.4 à 35.6) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const Integ = () => (node ? require("./lecons/integration.js") : root.Integ);
    const MU0 = Cst.mu0, KB = Cst.k_B, HBAR = Cst.hbar;
    const err = m => { throw new Error("paramagnétisme : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const posz = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };

    /* Moments of the 2j + 1 states along B in units of their spacing: m = j, j − 1, …, −j, the state m having the energy
       −m × (spacing). Weights e^(y m), y = spacing/(k_B T). Shifted by the largest exponent: no overflow at any y.
       Returns { lnZ, m: ⟨m⟩, m2: ⟨m²⟩ }. Independent moments in thermal equilibrium (Boltzmann factor e^(−ΔU/k_B T)). */
    function sommes(j, y) {
      const ms = api.valeursJz(j), a = Math.abs(y) * ms[0];
      let z = 0, s1 = 0, s2 = 0;
      for (const m of ms) { const w = Math.exp(y * m - a); z += w; s1 += m * w; s2 += m * m * w; }
      return { lnZ: Math.log(z) + a, m: s1 / z, m2: s2 / z };
    }
    /* §35-4. Brillouin function B_j(x), x = g μ j B/(k_B T) (the largest moment g μ j against k_B T): ⟨μ_z⟩ = g μ j B_j(x).
       j = 1/2 gives tanh x ((35.21)); small x gives (j + 1) x/(3j) ((35.24)); j → ∞ at fixed x gives Langevin's coth x − 1/x,
       the classical moment ((35.9)). Exact for independent moments of spin j and equal spacing in a field. */
    function brillouin(j, x) { fini(x, "x"); const J = api.valeursJz(j)[0]; if (J === 0) return 0; return sommes(J, x / J).m / J; }
    /* the classical limit with series near 0, so that pages need not load electrostatique.js (whose langevin is the same) */
    function langevinL(x) { fini(x, "x"); if (Math.abs(x) < 1e-3) return x / 3 - x * x * x / 45; return 1 / Math.tanh(x) - 1 / x; }
    /* Curie constant (K) of N moments per m³ of spin j and factor g: χ = C/T with C = μ0 N g² j(j + 1) μ²/(3 k_B), μ the
       magneton (default μ_B). From (35.24) and χ = μ0 M/B, which holds for |χ| ≪ 1 (B inside ≈ B applied). */
    function constanteCurie(N, j, g, magneton) {
      pos(N, "N"); fini(g, "g"); const mu = magneton == null ? Cst.mu_B : pos(magneton, "magneton");
      return MU0 * N * g * g * api.carreJ(j) * mu * mu / (3 * KB);
    }
    /* Magnetisation of N independent moments per m³ (spin j, factor g, magneton μ, default μ_B) in B at T.
       { x: g μ B/(k_B T) (spacing over k_B T, rapportThermique), xj: j x, M (A·m⁻¹, along B), Msat: N g μ j, relatif: M/Msat,
       curie: the linear law (35.24), chi: μ0 M/B, classique: Langevin for a classical moment of the same length
       g μ √(j(j + 1)) (same slope at small B, larger saturation) }. Interactions between moments, the diamagnetism of the cores
       and the demagnetising field are left out. */
    function aimantationParamagnetique(o) {
      const N = pos(o.N, "N"), g = fini(o.g, "g"), B = fini(o.B, "B"), T = pos(o.T, "T");
      const mu = o.magneton == null ? Cst.mu_B : pos(o.magneton, "magneton"), J = api.valeursJz(o.j)[0];
      const x = Math.abs(g) * mu * B / (KB * T), Msat = N * Math.abs(g) * mu * J, a = Math.abs(g) * mu * Math.sqrt(api.carreJ(J));
      const M = J === 0 ? 0 : Msat * brillouin(J, J * x), curie = N * g * g * api.carreJ(J) * mu * mu * B / (3 * KB * T);
      return { x, xj: J * x, M, Msat, relatif: Msat ? M / Msat : 0, curie, chi: B === 0 ? constanteCurie(N, J, g, mu) / T : MU0 * M / B,
        classique: N * a * langevinL(a * B / (KB * T)) };
    }
    /* Populations of the 2j + 1 levels of niveauxMagnetiques (same o: magneton, signe) at T: [{ m, U, p }], Σp = 1, p ∝ e^(−U/kT). */
    function populations(j, g, B, T, o) {
      pos(T, "T"); const lv = api.niveauxMagnetiques(j, g, B, o), u0 = Math.min(...lv.map(l => l.U));
      const w = lv.map(l => Math.exp(-(l.U - u0) / (KB * T))), z = w.reduce((s, x) => s + x, 0);
      return lv.map((l, k) => ({ m: l.m, U: l.U, p: w[k] / z }));
    }

    /* §35-5. Entropy of one moment of spin j, in units of k_B, at y = (level spacing)/(k_B T): S = ln Z − y⟨m⟩ (S = k ln Z + U/T).
       y = 0: ln(2j + 1), all states equally full; y → ∞: 0. Depends on B and T only through B/T: the law of the demagnetisation. */
    function entropieSpin(j, y) { posz(y, "y"); const s = sommes(j, y); return Math.max(0, s.lnZ - y * s.m); }
    /* Entropy of the lattice vibrations, per lattice atom, in k_B: Debye at low temperature, (4π⁴/5)(T/θ)³.
       Within 1 % for T < θ/20 or so; refused above θ/10, where the T³ law no longer holds. */
    function entropieReseau(T, thetaD) { posz(T, "T"); pos(thetaD, "thetaD"); if (T > thetaD / 10) err("T > θ/10 : la loi en T³ ne vaut plus");
      const u = T / thetaD; return 4 * Math.pow(Math.PI, 4) / 5 * u * u * u; }
    /* A paramagnetic salt, per magnetic ion, in k_B: o = { j, g, b, r, thetaD }. The moments feel B_eff = √(B² + b²): b stands for
       all that splits the levels without applied field (the fields of the neighbours, the crystal). r lattice atoms per ion,
       Debye temperature thetaD (no lattice when r = 0). Model: the interactions as a random field b, the order they create
       below b-scale temperatures left out. */
    function selSpins(o) {
      const J = api.valeursJz(o.j)[0], g = pos(Math.abs(fini(o.g, "g")), "|g|"), b = o.b == null ? 0 : posz(o.b, "b");
      const r = o.r == null ? 0 : posz(o.r, "r"), th = r > 0 ? pos(o.thetaD, "thetaD") : 1, mu = o.magneton == null ? Cst.mu_B : pos(o.magneton, "magneton");
      const S = (B, T) => entropieSpin(J, g * mu * Math.hypot(fini(B, "B"), b) / (KB * pos(T, "T"))) + (r > 0 ? r * entropieReseau(T, th) : 0);
      return { j: J, g, b, r, thetaD: th, magneton: mu, S };
    }
    /* The cycle: isothermal magnetisation at Ti up to Bi (heat k_B Ti [S(0, Ti) − S(Bi, Ti)] given to the bath per ion), then
       thermal isolation and a slow (reversible) decrease to Bf: S(Bf, Tf) = S(Bi, Ti), solved by bisection.
       { Tf, ideal: Ti Bf/Bi (no b, no lattice), interne: Ti √((Bf² + b²)/(Bi² + b²)) (exact when r = 0), xi: g μ Bi/(k_B Ti),
       chaleur (J per ion), Si, S0 (in k_B per ion) }. Reversible: a sudden switch-off leaves the temperature unchanged. */
    function desaimantation(o) {
      const s = selSpins(o), Bi = posz(o.Bi, "Bi"), Bf = posz(o.Bf, "Bf"), Ti = pos(o.Ti, "Ti");
      if (Bf > Bi) err("Bf doit être ≤ Bi : on désaimante");
      const Si = s.S(Bi, Ti), S0 = s.S(0, Ti);
      let lo = Ti * 1e-9, hi = Ti;
      if (s.S(Bf, lo) > Si) hi = lo; else for (let k = 0; k < 200; k++) { const mid = Math.sqrt(lo * hi); if (s.S(Bf, mid) > Si) hi = mid; else lo = mid; }
      return { Tf: hi, ideal: Bi > 0 ? Ti * Bf / Bi : Ti, interne: Ti * Math.hypot(Bf, s.b) / (Math.hypot(Bi, s.b) || 1), xi: s.g * s.magneton * Bi / (KB * Ti),
        chaleur: KB * Ti * (S0 - Si), Si, S0 };
    }

    /* §35-6. Protons of water: N = 2 ρ N_A/M_eau per m³ (ρ of SUSCEPTIBILITES.eau, M = 18,015 g·mol⁻¹). */
    const PROTONS_EAU = 2 * api.SUSCEPTIBILITES.eau.rho * Cst.N_A / 18.015e-3;
    /* Nuclear magnetisation at equilibrium, spin j (default 1/2), gyromagnetic ratio gamma (rad·s⁻¹·T⁻¹): exact Brillouin form
       N |γ| ħ j B_j(|γ| ħ j B/(k_B T)), and the linear law N γ² ħ² j(j + 1) B/(3 k_B T), N γ² ħ² B/(4 k_B T) for j = 1/2
       ((35.22) with μ_z = γħ/2). exces: (N₊ − N₋)/N for j = 1/2, tanh(|γ|ħB/(2k_BT)). chi: μ0 M/B. */
    function aimantationNucleaire(N, gamma, B, T, j) {
      pos(N, "N"); fini(gamma, "gamma"); fini(B, "B"); pos(T, "T"); const J = api.valeursJz(j == null ? 0.5 : j)[0], gh = Math.abs(gamma) * HBAR;
      const M = J === 0 ? 0 : N * gh * J * brillouin(J, gh * J * B / (KB * T)), lin = N * gh * gh * api.carreJ(J) * B / (3 * KB * T);
      return { M, lineaire: lin, exces: Math.tanh(gh * B / (2 * KB * T)), x: gh * B / (KB * T), chi: B === 0 ? MU0 * lin : MU0 * M / B };
    }
    /* Bloch's equations in the frame turning at the oscillator pulsation ω about B0 ẑ, the transverse field B1 along x′:
       dMx/dt = Δ My − Mx/T2, dMy/dt = ω1 Mz − Δ Mx − My/T2, dMz/dt = −ω1 My − (Mz − M0)/T1, Δ = |γ|B − ω the offset
       (rad·s⁻¹, a number or a function of t), ω1 = |γ| B1. The turning-field picture: the counter-rotating half of a linear
       field is left out (error ~ ω1/ω, as in rabi). Integ.rk4 at the step dt from t0 over duree; M0 the equilibrium
       magnetisation (any unit); M the start (default [0, 0, M0]). { t: [], M: [[Mx, My, Mz]] } every `garde` steps (default 1). */
    function bloch(o) {
      const w1 = posz(o.w1, "w1"), T1 = pos(o.T1, "T1"), T2 = pos(o.T2, "T2"), M0 = fini(o.M0 == null ? 1 : o.M0, "M0");
      const dt = pos(o.dt, "dt"), duree = posz(o.duree, "duree"), t0 = o.t0 == null ? 0 : fini(o.t0, "t0"), garde = o.garde == null ? 1 : o.garde;
      if (!Number.isInteger(garde) || garde < 1) err("garde doit être un entier ≥ 1");
      const D = typeof o.offset === "function" ? o.offset : (v => () => v)(fini(o.offset == null ? 0 : o.offset, "offset"));
      const f = (t, m) => { const d = D(t); return [d * m[1] - m[0] / T2, w1 * m[2] - d * m[0] - m[1] / T2, -w1 * m[1] - (m[2] - M0) / T1]; };
      const n = Math.round(duree / dt), out = { t: [t0], M: [] };
      let m = o.M ? o.M.slice() : [0, 0, M0]; out.M.push(m.slice());
      for (let i = 0; i < n; i++) { m = Integ().rk4(f, t0 + i * dt, m, dt); if ((i + 1) % garde === 0) { out.t.push(t0 + (i + 1) * dt); out.M.push(m.slice()); } }
      return out;
    }
    /* The steady solution of bloch at a fixed offset Δ (slow passage): Mx = M0 ω1 Δ T2²/D, My = M0 ω1 T2/D, Mz = M0 (1 + Δ²T2²)/D,
       D = 1 + Δ²T2² + ω1² T1 T2. My (absorption) is a Lorentzian of half-width √(1 + ω1²T1T2)/T2 in Δ; ω1² T1 T2 is the saturation. */
    function blochStationnaire(d, w1, T1, T2, M0) {
      fini(d, "d"); posz(w1, "w1"); pos(T1, "T1"); pos(T2, "T2"); M0 = M0 == null ? 1 : fini(M0, "M0");
      const q = 1 + d * d * T2 * T2, D = q + w1 * w1 * T1 * T2;
      return { Mx: M0 * w1 * d * T2 * T2 / D, My: M0 * w1 * T2 / D, Mz: M0 * q / D, demiLargeur: Math.sqrt(1 + w1 * w1 * T1 * T2) / T2 };
    }
    /* The field-sweep apparatus: field B0 + Bm sin(2π fm t) (the "wobble"), oscillator at f; offset Δ(t) = |γ| B(t) − 2πf.
       o = { gamma, B0, Bm, fm, f (default |γ|B0/2π, the line at the centre of the sweep), B1, T1, T2, M0, dt, t0, duree, garde }.
       Starts at t0 (default −1/(4 fm), the bottom of the sweep) from equilibrium unless o.M. Adds vitesse = |γ| Bm 2π fm, the
       rate dΔ/dt (rad·s⁻²) at the centre, and ondulations = vitesse T2²/(4π), the number of beats the free precession makes
       against the oscillator before it dies, for a passage at the centre. */
    function balayageRMN(o) {
      const g = Math.abs(fini(o.gamma, "gamma")), B0 = pos(o.B0, "B0"), Bm = posz(o.Bm, "Bm"), fm = pos(o.fm, "fm");
      const w = 2 * Math.PI * (o.f == null ? g * B0 / (2 * Math.PI) : pos(o.f, "f")), t0 = o.t0 == null ? -1 / (4 * fm) : fini(o.t0, "t0");
      const offset = t => g * (B0 + Bm * Math.sin(2 * Math.PI * fm * t)) - w, T2 = pos(o.T2, "T2");
      const r = bloch({ w1: g * posz(o.B1, "B1"), T1: o.T1, T2, M0: o.M0, dt: o.dt, duree: o.duree, t0, garde: o.garde, offset, M: o.M });
      const vitesse = g * Bm * 2 * Math.PI * fm;
      return Object.assign(r, { offset, vitesse, ondulations: vitesse * T2 * T2 / (4 * Math.PI) });
    }
    /* emf amplitude (V) in a long coil of N turns and section S filled with the sample, from the transverse magnetisation Mperp
       (A·m⁻¹) turning at ω: N μ0 S ω Mperp. A filling factor 1 and the flux of the demagnetising field left out. */
    function femBobine(N, S, omega, Mperp) { pos(N, "N"); pos(S, "S"); posz(omega, "omega"); fini(Mperp, "Mperp"); return N * MU0 * S * omega * Math.abs(Mperp); }

    Object.assign(api, { brillouin, langevinL, constanteCurie, aimantationParamagnetique, populations, entropieSpin, entropieReseau,
      selSpins, desaimantation, PROTONS_EAU, aimantationNucleaire, bloch, blochStationnaire, balayageRMN, femBobine });
  }

  /* ---------- Étape « Aimantation et champ H » (II.36.1 à 36.3) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0;
    const err = m => { throw new Error("aimantation : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const posz = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const entier = (n, nom, min) => { if (!(Number.isInteger(n) && n >= min)) err(nom + " doit être un entier ≥ " + min); return n; };
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };

    /* Units. 1 Oe = 1000/(4π) A·m⁻¹ (the CGS unit of H, named in 1930), 1 G = 10⁻⁴ T. Exact by definition of the CGS units. */
    const OERSTED = 1000 / (4 * Math.PI), GAUSS = 1e-4;
    /* §36-3. Pure iron at room temperature: saturation polarisation μ0 Ms = 2,15 T (e-magnetica, « Magnetic saturation »). */
    const FER_JSAT = 2.15, FER_MS = FER_JSAT / MU0;

    /* §36-1. A slab x0 < x < x1, infinite along y and z, cut into n blocks of width a; block k carries the magnetisation Mz of
       its middle (Mz: a number or a function of x, A·m⁻¹, along z), zero outside. Each block is a current loop: its faces
       x = const carry the sheet current M per metre of height (μ = M a b c = (M b) × (a c)). At the interface between blocks
       k − 1 and k the two sheets add: K_y = M_{k−1} − M_k (A·m⁻¹, along +y). { a, blocs: [{ x0, x1, M }], nappes: [{ x, K }]
       (n + 1 interfaces, edges included), somme: Σ K (0: the loops close), j(x): −dMz/dx (A·m⁻², centred difference, Mz a
       function) — the limit of K/a as the blocks shrink, (36.8) }. Exact for the blocks; the continuum is the limit a → 0. */
    function courantsBlocs(Mz, x0, x1, n) {
      fini(x0, "x0"); fini(x1, "x1"); if (!(x1 > x0)) err("x1 doit être > x0"); entier(n, "n", 1);
      const f = typeof Mz === "function" ? Mz : (v => () => v)(fini(Mz, "Mz")), a = (x1 - x0) / n, blocs = [];
      for (let k = 0; k < n; k++) blocs.push({ x0: x0 + k * a, x1: x0 + (k + 1) * a, M: fini(f(x0 + (k + 0.5) * a), "Mz(x)") });
      const nappes = [];
      for (let k = 0; k <= n; k++) nappes.push({ x: x0 + k * a, K: (k > 0 ? blocs[k - 1].M : 0) - (k < n ? blocs[k].M : 0) });
      const h = 1e-4 * (x1 - x0), j = x => { fini(x, "x"); return -(f(x + h) - f(x - h)) / (2 * h); };
      return { a, blocs, nappes, somme: nappes.reduce((s, q) => s + q.K, 0), j };
    }

    /* §36-1, §36-2. A cylinder of radius R and length L (centred at 0, axis z) uniformly magnetised M ẑ: its magnetisation
       currents are the sheet M on the side face, so on the axis B is that of a solenoid with n I = M (solenoideAxe).
       { B(z) (T), M(z), H(z) = B/μ0 − M (A·m⁻¹), Nd = 1 − L/√(L² + 4R²) (−H/M at the centre: the demagnetising factor of the
       cylinder, on the axis), moment M π R² L (A·m²), dipole(z) μ0 μ/(2π|z|³) sign(μ) (the far field on the axis),
       circulation(Z) = ∫ H dz from −Z to Z in closed form, M[√((Z + L/2)² + R²) − √((Z − L/2)² + R²) − L] (Z ≥ L/2), which
       tends to 0: no free current }. Rigid, uniform M (a permanent magnet far from its coercive field); on the axis only. */
    function barreauAimante(M, R, L) {
      fini(M, "M"); pos(R, "R"); pos(L, "L"); const sol = need("solenoideAxe");
      const Mz = z => (Math.abs(fini(z, "z")) < L / 2 ? M : 0), B = z => sol(1, M, R, L, z);
      const moment = M * Math.PI * R * R * L;
      return { B, M: Mz, H: z => B(z) / MU0 - Mz(z), Nd: 1 - L / Math.hypot(L, 2 * R), moment,
        dipole: z => { fini(z, "z"); return MU0 * moment / (2 * Math.PI * Math.pow(Math.abs(z), 3)); },
        circulation: Z => { fini(Z, "Z"); if (Z < L / 2) err("Z doit être ≥ L/2");
          return M * (Math.hypot(Z + L / 2, R) - Math.hypot(Z - L / 2, R) - L); } };
    }

    /* A linear, isotropic material of susceptibility χ = M/H in the field B: { H = B/(μ0(1 + χ)), M = χ H, chiB = μ0 M/B =
       χ/(1 + χ) } — chiB is the ratio used by « Paramagnétisme des matériaux massifs » (SUSCEPTIBILITES), equal to χ within χ².
       Holds for weak fields in a dia- or paramagnet; not for iron, where M depends on the history (jilesAtherton). */
    function materiauLineaire(chi, B) {
      fini(chi, "chi"); fini(B, "B"); if (!(chi > -1)) err("χ doit être > −1");
      const H = B / (MU0 * (1 + chi)); return { H, M: chi * H, chiB: chi / (1 + chi) };
    }

    /* §36-3. Rowland's ring: N turns carrying I on a torus of inner radius a and outer radius b (rectangular section). By
       (36.19), H(r) = N I/(2π r) for a < r < b, whatever the iron does (axial symmetry, no ends). { l = π(a + b), H: N I/l
       (36.20, at the mean radius), Hint, Hext, Hsection (mean over the section, N I ln(b/a)/(2π(b − a))), ecart: (Hint − Hext)/H
       = (b² − a²)/(2ab) }. Exact for a winding spread evenly round the ring; leakage between turns left out. */
    function toreRowland(N, I, a, b) {
      pos(N, "N"); fini(I, "I"); pos(a, "a"); pos(b, "b"); if (!(b > a)) err("b doit être > a");
      const NI = N * I, l = Math.PI * (a + b);
      return { l, H: NI / l, Hint: NI / (2 * Math.PI * a), Hext: NI / (2 * Math.PI * b), Hsection: NI * Math.log(b / a) / (2 * Math.PI * (b - a)),
        ecart: (b * b - a * a) / (2 * a * b) };
    }

    /* B from the emf of a secondary coil of N2 turns and section S: e = −N2 S dB/dt, so B(t_k) = B0 − (1/(N2 S)) ∫ e dt
       (trapezoids). t, e: arrays of the same length. Error of order (Δt)² × (d³B/dt³); an offset in e drifts as t. */
    function inductionDepuisFem(N2, S, t, e, B0) {
      pos(N2, "N2"); pos(S, "S"); if (!Array.isArray(t) || !Array.isArray(e) || t.length !== e.length || t.length < 2) err("t et e : deux tableaux de même longueur ≥ 2");
      const out = [B0 == null ? 0 : fini(B0, "B0")];
      for (let k = 1; k < t.length; k++) out.push(out[k - 1] - (fini(e[k], "e") + fini(e[k - 1], "e")) / 2 * (t[k] - t[k - 1]) / (N2 * S));
      return out;
    }

    /* The Jiles–Atherton model of a ferromagnet (J. Magn. Magn. Mater. 61, 1986): p = { Ms (A·m⁻¹), a (A·m⁻¹, width of the
       anhysteretic curve), k (A·m⁻¹, pinning: sets the coercive field), c (0 ≤ c < 1, reversible part), alpha (coupling) }.
       Effective field He = H + αM; anhysteretic Man = Ms L(He/a) (Langevin, langevinL); irreversible part dMirr/dHe =
       (Man − Mirr)/(δk), δ = sign of dH, and 0 when Mirr would move away from Man; M = (1 − c) Mirr + c Man. B = μ0(H + M).
       A phenomenological model, not a theory of domains: it reproduces the shape of the curves (initial curve, saturation,
       remanence, coercive field, minor loops), not a given steel. Requires αMs/(3a) < 1 (otherwise M is spontaneous at H = 0).
       Steps: Heun in H, M solved by bisection at each H. vers(H1, n) runs from the present H to H1 in n steps and returns the
       points [[H, B, M]], start included; etat() { H, M, Mirr, B }. Starts demagnetised (H = M = 0). Fails with an error if
       1 − α(c dMan/dHe + (1 − c) dMirr/dHe) ≤ 0: an avalanche the model cannot follow. */
    const ACIER_JA = Object.freeze({ Ms: 1.6e6, a: 1100, k: 2000, c: 0.2, alpha: 1.6e-3 });
    function jilesAtherton(p) {
      p = p || ACIER_JA;
      const Ms = pos(p.Ms, "Ms"), a = pos(p.a, "a"), k = pos(p.k, "k"), c = posz(p.c, "c"), al = posz(p.alpha, "alpha");
      if (!(c < 1)) err("c doit être < 1"); if (!(al * Ms / (3 * a) < 1)) err("αMs/(3a) doit être < 1");
      const Lv = need("langevinL"), dL = x => (Math.abs(x) < 1e-3 ? 1 / 3 - x * x / 15 : 1 / (x * x) - 1 / Math.pow(Math.sinh(x), 2));
      const racine = g => { let lo = -2 * Ms, hi = 2 * Ms; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; };
      const resoudre = (H, Mi) => racine(m => m - (1 - c) * Mi - c * Ms * Lv((H + al * m) / a));
      const anh = H => { fini(H, "H"); return racine(m => m - Ms * Lv((H + al * m) / a)); };
      let H = 0, Mirr = 0, M = 0;
      /* dMirr/dH at (h, mi) going the way d */
      const pente = (h, mi, d) => {
        const m = resoudre(h, mi), x = (h + al * m) / a, Man = Ms * Lv(x), dMan = Ms / a * dL(x);
        const g = Math.max(0, (Man - mi) / (d * k)), den = 1 - al * (c * dMan + (1 - c) * g);
        if (!(den > 0)) err("avalanche : le modèle ne suit plus (k trop petit devant α Ms)");
        return g / den;
      };
      function vers(H1, n) {
        fini(H1, "H1"); entier(n, "n", 1);
        const pts = [[H, MU0 * (H + M), M]], dH = (H1 - H) / n, d = Math.sign(dH);
        if (d === 0) return pts;
        /* inner steps no longer than min(k, a)/20, so that Mirr never lags far behind Man within a step */
        const m = Math.max(1, Math.ceil(Math.abs(dH) / (Math.min(k, a) / 20))), h = dH / m;
        for (let s = 0; s < n; s++) {
          const H0 = H;
          for (let q = 0; q < m; q++) {
            const k1 = pente(H, Mirr, d), k2 = pente(H + h, Mirr + k1 * h, d);
            Mirr += (k1 + k2) / 2 * h; H += h;
          }
          H = s === n - 1 ? H1 : H0 + dH; M = resoudre(H, Mirr);
          pts.push([H, MU0 * (H + M), M]);
        }
        return pts;
      }
      return { p: { Ms, a, k, c, alpha: al }, vers, anh, etat: () => ({ H, M, Mirr, B: MU0 * (H + M) }) };
    }
    /* The usual measurement: from the demagnetised state up to Hmax (initial curve), then `cycles` full cycles ±Hmax
       (o = { n: steps per half-branch, default 600; cycles, default 2 }). From the last cycle: { premiere, descendante,
       montante ([[H, B, M]]), Br (B at H = 0 going down, T), Hc (|H| where B = 0 going down, A·m⁻¹), Bmax, Mmax, muApp:
       Bmax/(μ0 Hmax), fermeture: |B at the end of the last cycle − B at its start| (T), anh: the model's anhysteretic M(H) }. */
    function cycleHysteresis(p, Hmax, o) {
      pos(Hmax, "Hmax"); o = o || {}; const n = o.n == null ? 600 : entier(o.n, "n", 10), cy = o.cycles == null ? 2 : entier(o.cycles, "cycles", 1);
      const m = jilesAtherton(p), premiere = m.vers(Hmax, n);
      let des, mon; const B0 = [];
      for (let i = 0; i < cy; i++) { B0.push(m.etat().B); des = m.vers(-Hmax, 2 * n); mon = m.vers(Hmax, 2 * n); }
      const croise = (pts, i, j) => { for (let q = 1; q < pts.length; q++) { const u = pts[q - 1], v = pts[q];
        if (u[i] * v[i] <= 0 && u[i] !== v[i]) return u[j] + (v[j] - u[j]) * (0 - u[i]) / (v[i] - u[i]); } return NaN; };
      const fin = m.etat();
      return { premiere, descendante: des, montante: mon, Br: croise(des, 0, 1), Hc: Math.abs(croise(des, 1, 0)), Bmax: fin.B, Mmax: fin.M,
        muApp: fin.B / (MU0 * Hmax), fermeture: Math.abs(fin.B - B0[cy - 1]), anh: m.anh };
    }

    Object.assign(api, { OERSTED, GAUSS, FER_JSAT, FER_MS, courantsBlocs, barreauAimante, materiauLineaire, toreRowland,
      inductionDepuisFem, ACIER_JA, jilesAtherton, cycleHysteresis });
  }

  /* ---------- Étape « Noyaux de fer et électroaimants » (II.36.4 à 36.6) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, KB = Cst.k_B;
    const err = m => { throw new Error("noyau de fer : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const posz = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const courbe = (pts, nom) => { if (!Array.isArray(pts) || pts.length < 2 || pts.some(p => !Array.isArray(p) || p.length < 2 || !isFinite(p[0]) || !isFinite(p[1])))
      err(nom + " : une suite d'au moins deux points [H, B]"); return pts; };

    /* §36-4. ∫ H dB along a curve pts [[H, B, …]] taken in its order, by trapezoids (J·m⁻³). (36.22): the work the source
       gives per unit volume of iron. Exact for the polygon; for a measured curve, error of order (ΔB)² × d²H/dB². */
    function integraleHdB(pts) {
      courbe(pts, "pts"); let s = 0;
      for (let i = 1; i < pts.length; i++) s += (pts[i][0] + pts[i - 1][0]) / 2 * (pts[i][1] - pts[i - 1][1]);
      return s;
    }
    /* The energy budget of a cycle c (cycleHysteresis): { aire: ∮ H dB over the last cycle (J·m⁻³, > 0: heat left in the iron
       at each cycle), premiere: ∫ H dB on the initial curve up to Bmax, rendue: what the iron gives back going down from
       +Hmax to H = 0 (−∫ H dB, H > 0), vide: Bmax²/(2μ0), the energy the same B would cost in vacuum }. Quasi-static: no
       eddy currents (thin laminations, low frequency). */
    function energieCycle(c) {
      if (!c || !c.descendante || !c.montante || !c.premiere) err("energieCycle attend le résultat de cycleHysteresis");
      const haut = c.descendante.filter(p => p[0] >= 0);
      return { aire: integraleHdB(c.descendante) + integraleHdB(c.montante), premiere: integraleHdB(c.premiere),
        rendue: -integraleHdB(haut), vide: c.Bmax * c.Bmax / (2 * MU0) };
    }
    /* (36.25) in SI: L = μr μ0 N² A/l for a thin ring of N turns, section A, mean length l, in a linear iron of relative
       permeability μr. Holds on a small, centred loop where B ≈ μr μ0 H (36.23); leakage between turns left out. */
    function inductanceFer(mur, N, A, l) { pos(mur, "μr"); pos(N, "N"); pos(A, "A"); pos(l, "l"); return mur * MU0 * N * N * A / l; }
    /* Along a curve pts [[H, B]] (first point excluded if H = 0): the ring's current I = H l/N, its apparent inductance
       N A B/I = N² A B/(H l) (flux linked per ampere) and its differential inductance N² A (dB/dH)/l (what a small ac
       signal sees, centred differences). [{ I, B, Lapp, Ldiff }]. Same assumptions as (36.25), without linearity. */
    function inductanceCourbe(pts, N, A, l) {
      courbe(pts, "pts"); pos(N, "N"); pos(A, "A"); pos(l, "l"); const k = N * N * A / l, out = [];
      for (let i = 1; i < pts.length - 1; i++) {
        const [H, B] = pts[i], dH = pts[i + 1][0] - pts[i - 1][0];
        if (H === 0 || dH === 0) continue;
        out.push({ I: H * l / N, B, Lapp: k * B / H, Ldiff: k * (pts[i + 1][1] - pts[i - 1][1]) / dH });
      }
      return out;
    }
    /* A sinusoidal voltage imposes a sinusoidal flux: B = Bmax cos θ. Read H(θ) off the loop c (descending branch while B
       falls, ascending while it rises): the magnetising current H l/N, peaked near the tips. o = { n: points per period,
       default 720 }. { theta, B, H (arrays), aire: ∮ H dB from the waveform, harmoniques: [h1, h3/h1, h5/h1] (amplitudes of
       H), dephasage: angle by which the fundamental of H leads B (rad; sin of it ∝ the loss) }. Quasi-static loop, no
       resistance in the winding (otherwise the voltage, not the flux, is sinusoidal). */
    function courantMagnetisant(c, o) {
      if (!c || !c.descendante || !c.montante) err("courantMagnetisant attend le résultat de cycleHysteresis");
      const n = o && o.n != null ? o.n : 720; if (!(Number.isInteger(n) && n >= 16)) err("n doit être un entier ≥ 16");
      const Bm = c.Bmax, inv = (br, b) => {
        let lo = Math.min(br[0][1], br[br.length - 1][1]), hi = Math.max(br[0][1], br[br.length - 1][1]); b = Math.max(lo, Math.min(hi, b));
        for (let q = 1; q < br.length; q++) { const u = br[q - 1], v = br[q];
          if ((u[1] - b) * (v[1] - b) <= 0 && u[1] !== v[1]) return u[0] + (v[0] - u[0]) * (b - u[1]) / (v[1] - u[1]); }
        return br[br.length - 1][0];
      };
      const theta = [], B = [], H = [];
      for (let i = 0; i < n; i++) { const th = 2 * Math.PI * i / n, b = Bm * Math.cos(th);
        theta.push(th); B.push(b); H.push(inv(th <= Math.PI ? c.descendante : c.montante, b)); }
      const four = k => { let a = 0, s = 0; for (let i = 0; i < n; i++) { a += H[i] * Math.cos(k * theta[i]); s += H[i] * Math.sin(k * theta[i]); }
        return [2 * a / n, 2 * s / n]; };
      const [a1, b1] = four(1), h1 = Math.hypot(a1, b1), h3 = Math.hypot(...four(3)), h5 = Math.hypot(...four(5));
      let aire = 0; for (let i = 0; i < n; i++) { const j = (i + 1) % n; aire += (H[i] + H[j]) / 2 * (B[j] - B[i]); }
      return { theta, B, H, aire, harmoniques: [h1, h3 / h1, h5 / h1], dephasage: Math.atan2(-b1, a1) };
    }

    /* §36-5. An iron yoke of mean length l2 with a gap l1, one section, N I ampere-turns. (36.26) with B continuous across
       the gap gives (36.27) in SI: B l1/μ0 + H l2 = N I, a straight line in the (H, B) plane of the iron: { H0 = NI/l2 (its
       intercept on the H axis), B0 = μ0 NI/l1 (on the B axis, the gap with no iron), pente = −μ0 l2/l1, B(H) }. Gap small
       next to the pole width (fringing and leakage left out). */
    function droiteCharge(NI, l1, l2) {
      fini(NI, "NI"); pos(l1, "l1"); pos(l2, "l2");
      return { H0: NI / l2, B0: MU0 * NI / l1, pente: -MU0 * l2 / l1, B: H => MU0 * (NI - fini(H, "H") * l2) / l1 };
    }
    /* Where the line (36.27) meets a branch pts [[H, B]] of the iron's curve: { H (iron), B, Hentrefer = B/μ0, fer: H l2/(NI),
       the share of the ampere-turns spent in the iron (NaN if NI = 0) }, or null if they do not meet on that branch.
       l1 = 0 (closed ring) is allowed: then H = NI/l2. Same assumptions as droiteCharge; the curve must be the one the iron
       actually follows (initial curve, or a branch chosen by the history). */
    function pointFonctionnement(pts, NI, l1, l2) {
      courbe(pts, "pts"); fini(NI, "NI"); posz(l1, "l1"); pos(l2, "l2");
      const g = p => (l1 === 0 ? p[0] - NI / l2 : p[1] - MU0 * (NI - p[0] * l2) / l1);
      for (let q = 1; q < pts.length; q++) {
        const u = pts[q - 1], v = pts[q], gu = g(u), gv = g(v);
        if (gu * gv <= 0 && gu !== gv) {
          const s = gu / (gu - gv), H = u[0] + s * (v[0] - u[0]), B = u[1] + s * (v[1] - u[1]);
          return { H, B, Hentrefer: B / MU0, fer: NI === 0 ? NaN : H * l2 / NI };
        }
      }
      return null;
    }
    /* (36.27) with B = μr μ0 H in the iron: B = μ0 NI/(l1 + l2/μr); { B, entrefer: l1/(l1 + l2/μr), the share of the
       ampere-turns spent in the gap }. Linear iron, far from saturation (B well under 1,5 T for a steel). */
    function electroaimantLineaire(NI, l1, l2, mur) {
      fini(NI, "NI"); posz(l1, "l1"); pos(l2, "l2"); pos(mur, "μr"); const d = l1 + l2 / mur;
      return { B: MU0 * NI / d, entrefer: l1 / d };
    }
    /* The pull on one pole face of section S across a gap of field B: B² S/(2μ0) (N), from the energy B²/(2μ0) per unit
       volume of the gap, which closing the gap by dx at constant flux removes. Uniform B over S, gap small next to the pole
       width; fringing and the energy in the iron left out. */
    function forcePole(B, S) { fini(B, "B"); pos(S, "S"); return B * B * S / (2 * MU0); }

    /* §36-6. Mean-field (Weiss) ferromagnet of spin-½ moments μ: (36.39) in SI, k_B Tc = μ0 λ N μ², the temperature below
       which the moments line up on their own. λ = 1/3: the local field of a spherical hole. N per m³, μ in A·m². */
    function temperatureCurie(N, mu, lambda) { pos(N, "N"); pos(mu, "μ"); pos(lambda, "λ"); return MU0 * lambda * N * mu * mu / KB; }
    /* (36.40), reduced: m = M/Msat, t = T/Tc, h = μ μ0 H/(k_B Tc); m = tanh((h + m)/t). { racines (all roots in
       (−1, 1), increasing), m: the stable one (sign of h; m ≥ 0 when h = 0), metastable: the other outer root when there are
       three (null otherwise) }. Roots by a scan of 4000 cells and bisection: two roots closer than 5 × 10⁻⁴ may be missed
       as a pair. Mean field: thermal fluctuations of the neighbours left out, so the shape near Tc is not that of a real metal. */
    function weiss(t, h) {
      pos(t, "t"); fini(h, "h");
      const g = m => m - Math.tanh((h + m) / t), K = 4000, r = [];
      let a = -1, ga = g(a);
      for (let i = 1; i <= K; i++) {
        const b = -1 + 2 * i / K, gb = g(b);
        if (gb === 0) r.push(b);
        else if (ga * gb < 0) { let lo = a, hi = b; for (let q = 0; q < 60; q++) { const mm = (lo + hi) / 2; if (g(mm) * g(lo) > 0) lo = mm; else hi = mm; } r.push((lo + hi) / 2); }
        a = b; ga = gb;
      }
      const m = h < 0 ? r[0] : r[r.length - 1];
      return { racines: r, m, metastable: r.length >= 3 ? (h < 0 ? r[r.length - 1] : r[0]) : null };
    }
    /* (36.41), reduced: above Tc, a weak field gives m = h/(t − 1). The first order of weiss in h; it diverges at Tc. */
    function curieWeiss(t, h) { pos(t, "t"); fini(h, "h"); if (!(t > 1)) err("t doit être > 1 (au-dessus de Tc)"); return h / (t - 1); }
    /* Nickel: ρ = 8 908 kg·m⁻³, M = 58,6934 g·mol⁻¹ (periodictable.com), Tc = 627 K (tables: 627 to 631 K). One Bohr
       magneton per atom, as in the estimate of §36-6 (the measured moment is smaller). { N (atoms per m³), Msat, Tc13 (36.39
       with λ = 1/3), facteur: Tc/Tc13, lambda: the λ that would give Tc, champ: k_B Tc/μB, the local field (T) that would be
       needed }. */
    const NICKEL = Object.freeze({ rho: 8908, Mmol: 58.6934e-3, Tc: 627 });
    function nickelWeiss() {
      const N = NICKEL.rho * Cst.N_A / NICKEL.Mmol, mu = Cst.mu_B, Tc13 = temperatureCurie(N, mu, 1 / 3);
      return { N, Msat: N * mu, Tc13, facteur: NICKEL.Tc / Tc13, lambda: NICKEL.Tc / Tc13 / 3, champ: KB * NICKEL.Tc / mu };
    }

    Object.assign(api, { integraleHdB, energieCycle, inductanceFer, inductanceCourbe, courantMagnetisant, droiteCharge,
      pointFonctionnement, electroaimantLineaire, forcePole, temperatureCurie, weiss, curieWeiss, NICKEL, nickelWeiss });
  }

  /* ---------- Étape « Comprendre le ferromagnétisme » (II.37.1 à 37.5) ---------- */
  {
    const Cst = node ? require("./constantes.js") : root.Constantes;
    const MU0 = Cst.mu0, KB = Cst.k_B, MUB = Cst.mu_B, NA = Cst.N_A;
    const err = m => { throw new Error("ferromagnétisme : " + m); };
    const fini = (x, nom) => { if (typeof x !== "number" || !isFinite(x)) err(nom + " doit être un nombre fini"); return x; };
    const pos = (x, nom) => { fini(x, nom); if (!(x > 0)) err(nom + " doit être > 0"); return x; };
    const posz = (x, nom) => { fini(x, nom); if (x < 0) err(nom + " doit être ≥ 0"); return x; };
    const entier = (n, nom, min) => { if (!(Number.isInteger(n) && n >= min)) err(nom + " doit être un entier ≥ " + min); return n; };
    const need = f => { if (typeof api[f] !== "function") err(f + " (étape précédente du monde) manque"); return api[f]; };
    /* the largest root of m = f(m) in (0, 1], or 0 when there is none: bisection on m − f(m), which is < 0 just above 0
       when a spontaneous root exists (slope of f at 0 above 1) and > 0 at m = 1 */
    const racinePositive = (f, pente0) => {
      if (!(pente0 > 1)) return 0;
      let lo = 1e-12, hi = 1;
      if (hi - f(hi) <= 0) return 1;
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (m - f(m) < 0) lo = m; else hi = m; }
      return (lo + hi) / 2;
    };
    /* S/(N k) of N two-level spins of mean m: ln 2 − [(1 + m) ln(1 + m) + (1 − m) ln(1 − m)]/2, with 0 ln 0 = 0 at |m| = 1 */
    const xlx = x => (x > 0 ? x * Math.log(x) : 0), sDeux = m => Math.LN2 - (xlx(1 + m) + xlx(1 - m)) / 2;

    /* §37-1. Mean-field spontaneous magnetisation m = M/Msat at t = T/Tc, h = 0, for moments of angular momentum j: m = B_j(x),
       x = 3j/(j + 1) m/t, so that every j has the same Curie constant and the same Tc (the slope at the origin is 1/t).
       j = 1/2 is (37.4), m = tanh(m/t); j = Infinity is the classical moment, m = L(3m/t) (Langevin). Same mean-field
       assumptions as weiss: the shape near Tc (m ∝ √(1 − t)) and at low t (exponential for j finite, linear in t for the
       classical moment) are those of the model, not of a metal (spin waves: 1 − m ∝ t^(3/2); near Tc, m ∝ (1 − t)^0,34). */
    function aimantationReduite(t, j) {
      pos(t, "t"); if (j !== Infinity) { pos(j, "j"); if (!Number.isInteger(2 * j)) err("j doit être un multiple de 1/2 ou Infinity"); }
      if (!(t < 1)) return 0;
      if (j === Infinity) { const L = need("langevinL"); return racinePositive(m => L(3 * m / t), 1 / t); }
      if (j === 0.5) return racinePositive(m => Math.tanh(m / t), 1 / t);
      const Bj = need("brillouin"), k = 3 * j / (j + 1); return racinePositive(m => Bj(j, k * m / t), 1 / t);
    }
    /* The local exponent d ln m/d ln(1 − t) of a curve m(t) (function), by centred differences in ln(1 − t): 1/2 for the mean
       field near Tc, whatever j; about 0,34 for nickel (measured). */
    function exposantLocal(m, t) {
      if (typeof m !== "function") err("m doit être une fonction de t"); pos(t, "t"); if (!(t < 1)) err("t doit être < 1");
      const u = Math.log(1 - t), du = 1e-3, f = v => Math.log(m(1 - Math.exp(v)));
      return (f(u + du) - f(u - du)) / (2 * du);
    }
    /* Three energies between neighbouring atoms a apart that carry moments μ, against k_B Tc: { dipolaire: μ0 μ²/(4π a³)
       (the magnetic interaction of two dipoles, J), thermique: k_B Tc, coulomb: e²/(4π ε0 a) (the electrostatic energy of two
       electrons at that distance), rapportDipole: k_B Tc/dipolaire, rapportCoulomb: k_B Tc/coulomb }. Orders of magnitude:
       the orientation factor of the dipole energy (between 1 and 2) is left out. */
    function echelleEnergies(a, mu, Tc) {
      pos(a, "a"); pos(mu, "μ"); pos(Tc, "Tc");
      const dip = MU0 * mu * mu / (4 * Math.PI * a * a * a), th = KB * Tc, cou = Cst.e * Cst.e / (4 * Math.PI * Cst.eps0 * a);
      return { dipolaire: dip, thermique: th, coulomb: cou, rapportDipole: th / dip, rapportCoulomb: th / cou };
    }

    /* §37-2. Thermodynamics of the mean-field ferromagnet of spin-½ moments, h = 0, per moment, in units of k_B (energies in
       units of k_B Tc): { m, u: −m²/2 ((37.5): U = −N k Tc m²/2), c: C/(N k) = du/dt (0 above Tc), s: S/(N k) = ln 2 −
       [(1 + m) ln(1 + m) + (1 − m) ln(1 − m)]/2, the entropy of N two-level spins whose mean is m }. du/dt in closed form:
       differentiating m = tanh(m/t) gives dm/dt = −m(1 − m²)/(t² − t(1 − m²)), and c = −m dm/dt. Just below Tc, c → 3/2.
       Mean field: no specific heat above Tc, a jump at Tc; a metal shows a peak and a tail. */
    function thermoSpin(t) {
      pos(t, "t"); const m = aimantationReduite(t, 0.5);
      if (m === 0) return { m: 0, u: 0, c: 0, s: Math.LN2 };
      const q = 1 - m * m, dm = -m * q / (t * t - t * q);
      const s = sDeux(m);
      return { m, u: -m * m / 2, c: -m * dm, s };
    }
    /* For a material: N moments per m³ (or per mole, then results per mole) and its Tc. { saut: (3/2) N k_B (J·K⁻¹ per m³ or per
       mole), entropie: N k_B ln 2 (all the entropy the spins give up when they order), energie: N k_B Tc/2 (the magnetic energy
       released from Tc down to 0 K) }. */
    function bilanChampMoyen(N, Tc) {
      pos(N, "N"); pos(Tc, "Tc");
      return { saut: 1.5 * N * KB, entropie: N * KB * Math.LN2, energie: N * KB * Tc / 2 };
    }
    /* The magnetocaloric effect of the same model: a field H switched on adiabatically at T (spins + lattice). The spin
       entropy depends on m alone; the lattice gives c_r k_B per moment (c_r = 3 for Dulong and Petit, one moment per atom).
       ΔT ≈ T ΔS_spin/(c_r k_B), with ΔS_spin from m(t, h) (weiss) minus m(t, 0): { h, m0, m1, dS (per moment, units of k_B),
       dT (K) }. First order in ΔT/T; the lattice heat capacity taken constant. μ: moment (A·m²). */
    function magnetocalorique(T, Tc, mu, H, cr) {
      pos(T, "T"); pos(Tc, "Tc"); pos(mu, "μ"); posz(H, "H"); cr = cr == null ? 3 : pos(cr, "c_r");
      const w = need("weiss"), t = T / Tc, h = mu * MU0 * H / (KB * Tc);
      const m0 = Math.abs(w(t, 0).m), m1 = Math.abs(w(t, h).m), dS = sDeux(m1) - sDeux(m0);
      return { h, m0, m1, dS, dT: -T * dS / cr };
    }
    /* Moment per atom (Bohr magnetons) from a saturation polarisation Js = μ0 Ms (T), a density ρ and a molar mass (kg·mol⁻¹):
       (Js/μ0)/(ρ N_A/Mmol)/μB. Fe at room temperature: about 2,2. Not an integer: the d electrons are shared (bands). */
    function momentParAtome(Js, rho, Mmol) { pos(Js, "Js"); pos(rho, "ρ"); pos(Mmol, "Mmol"); return Js / MU0 / (rho * NA / Mmol) / MUB; }

    /* §37-3. Stripe domains (Kittel, 1946) in a slab of thickness L magnetised along its normal, domains of width D, walls of
       energy σ (J·m⁻²): per unit area of the face, E(D) = σL/D + 2 κ μ0 Ms² D, κ = 7ζ(3)/(4π³) = 0,0678 (the field energy of the
       alternating surface poles of one face, Fourier sum). { kappa, D: √(σL/(2κ μ0 Ms²)) (the width that minimises E), E: E(D),
       Eun: μ0 Ms² L/2 (one domain, the slab's own field), energie(D), Lc: 32κσ/(μ0 Ms²) (the thickness below which one domain
       wins), domaines: L/D (walls per length L of face) }. Thick slab (D ≪ L: the two faces do not see each other); rotation
       of M inside the material (μ*) and closure domains left out. */
    const KAPPA_BANDES = 7 * 1.2020569031595942 / (4 * Math.pow(Math.PI, 3));
    function domainesBandes(sigma, Ms, L) {
      pos(sigma, "σ"); pos(Ms, "Ms"); pos(L, "L");
      const k = KAPPA_BANDES, u = MU0 * Ms * Ms, energie = D => sigma * L / pos(D, "D") + 2 * k * u * D, D = Math.sqrt(sigma * L / (2 * k * u));
      return { kappa: k, D, E: energie(D), Eun: u * L / 2, energie, Lc: 32 * k * sigma / u, domaines: L / D };
    }
    /* A 180° wall from the exchange stiffness A (J·m⁻¹) and the anisotropy K (J·m⁻³): σ = 4√(AK), δ = π√(A/K) (the usual
       Bloch-wall estimates, uniaxial K). Iron: A ≈ 2 × 10⁻¹¹ J·m⁻¹, K1 ≈ 5 × 10⁴ J·m⁻³ (cubic, so an order of magnitude). */
    const FER_PAROI = Object.freeze({ A: 2e-11, K: 5e4 });
    function paroi(A, K) { pos(A, "A"); pos(K, "K"); return { sigma: 4 * Math.sqrt(A * K), delta: Math.PI * Math.sqrt(A / K) }; }

    /* A single 180° wall that sweeps a sample of length ℓ (m) across a rugged landscape: pinning sites (dislocations,
       inclusions) at random positions, each a gaussian bump of energy per unit wall area a_k ∈ [0, amax] (J·m⁻²) and width w.
       Moving the wall by dx turns 2Ms dx per unit area: the field does work 2μ0 Ms H dx. With a demagnetising factor Nd, the
       wall feels H − Nd M. Equilibrium: H = Nd M(x) + V′(x)/(2μ0 Ms), stable while the right side increases with x. Quasi-
       static field sweep: the wall follows its branch and jumps forward (H rising) to the first point where the right side
       reaches H again — a Barkhausen jump. o = { Ms, longueur, sites (count), amax, w, Nd, graine, n (grid points) }.
       { f(x): the H at which x is an equilibrium, balayage(Hs): [{ H, M, saut }] along a list of fields (saut: |ΔM| at that
       step, 0 if none), cycle(Hmax, n): the loop from −Hmax up and back, { montee, descente, Hc, Mr, sauts (all jumps, A·m⁻¹),
       Hp: max V′/(2μ0 Ms), the field that frees the wall from its worst site } }. One wall, no rotation of M, no eddy currents:
       it gives the steps of region b and the reversible bowing of region a in Feynman's figure, not the approach to
       saturation by rotation (region c). */
    function paroiAccrochee(o) {
      o = o || {};
      const Ms = pos(o.Ms == null ? api.FER_MS : o.Ms, "Ms"), l = pos(o.longueur == null ? 1e-4 : o.longueur, "longueur");
      const ns = entier(o.sites == null ? 300 : o.sites, "sites", 0), amax = posz(o.amax == null ? 2e-5 : o.amax, "amax");
      const w = pos(o.w == null ? 1e-7 : o.w, "w"), Nd = posz(o.Nd == null ? 0 : o.Nd, "Nd"), n = entier(o.n == null ? 10000 : o.n, "n", 100);
      let s = entier(o.graine == null ? 7 : o.graine, "graine", 1) % 2147483647 || 1; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
      const sites = []; for (let i = 0; i < ns; i++) sites.push([rnd() * l, rnd() * amax]);
      const dV = x => sites.reduce((acc, [xk, ak]) => { const u = (x - xk) / w; return Math.abs(u) > 8 ? acc : acc - ak * u / w * Math.exp(-u * u / 2); }, 0);
      const X = [], F = [], Mx = x => Ms * (2 * x / l - 1);
      for (let i = 0; i <= n; i++) { const x = l * i / n; X.push(x); F.push(Nd * Mx(x) + dV(x) / (2 * MU0 * Ms)); }
      const Hp = Math.max(...X.map(x => Math.abs(dV(x)))) / (2 * MU0 * Ms);
      /* the wall starts at the left end (M = −Ms) */
      let i = 0;
      function vers(H) {
        fini(H, "H"); const i0 = i; let instable = false;
        /* the wall sits in the cell [x_i, x_{i+1}] where F crosses H: F[i] ≤ H, and it moves only when H leaves that range */
        while (i < n && F[i + 1] <= H) { if (F[i + 1] < F[i]) instable = true; i++; }
        while (i > 0 && F[i] > H) { if (F[i - 1] > F[i]) instable = true; i--; }
        /* a step that crossed a stretch where the equilibrium field falls is a jump (an avalanche); otherwise a creep */
        return { H, M: Mx(X[i]), saut: instable ? Math.abs(Mx(X[i]) - Mx(X[i0])) : 0 };
      }
      function balayage(Hs) { if (!Array.isArray(Hs)) err("Hs doit être une liste de champs"); return Hs.map(vers); }
      function cycle(Hmax, m) {
        pos(Hmax, "Hmax"); m = m == null ? 400 : entier(m, "n", 10); i = 0;
        const up = [], down = []; for (let k = 0; k <= m; k++) up.push(-Hmax + 2 * Hmax * k / m);
        for (let k = 0; k <= m; k++) down.push(Hmax - 2 * Hmax * k / m);
        balayage([-Hmax]); const montee = balayage(up), descente = balayage(down);
        /* Hc: the first field of the descent where M ≤ 0 (M often crosses zero inside a jump: no interpolation) */
        const zero = descente.find(p => p.M <= 0), Mr = descente[Math.floor(m / 2)].M; /* m even: H = 0 exactly */
        const sauts = montee.concat(descente).map(p => p.saut).filter(x => x > 0);
        return { montee, descente, Hc: zero ? Math.abs(zero.H) : NaN, Mr, sauts, Hp };
      }
      return { f: x => { fini(x, "x"); return Nd * Mx(x) + dV(x) / (2 * MU0 * Ms); }, balayage, cycle, Hp, sites: sites.length };
    }

    /* §37-4. Table 37-1 in SI: Br (T) and Hc (A·m⁻¹), from the gauss and oersted of the original (1 G = 10⁻⁴ T, 1 Oe =
       1000/(4π) A·m⁻¹). Typical values of the 1960s, not specifications. */
    const OE = 1000 / (4 * Math.PI);
    const MATERIAUX = Object.freeze({
      supermalloy: Object.freeze({ Br: 0.5, Hc: 0.004 * OE }),
      silicium: Object.freeze({ Br: 1.2, Hc: 0.05 * OE }),
      armco: Object.freeze({ Br: 0.4, Hc: 0.6 * OE }),
      alnico: Object.freeze({ Br: 1.3, Hc: 550 * OE }),
    });
    /* Alnico 5 (anisotropic, cast) today: Br 1,28 T, Hc 51 kA·m⁻¹, (BH)max 43,8 kJ·m⁻³ (Wikipedia, « Alnico », table). */
    const ALNICO5 = Object.freeze({ Br: 1.28, Hc: 51e3, BHmax: 43.8e3 });
    /* A model loop from Br, Hc and a knee width w (A·m⁻¹): the descending branch B(H) = Bs tanh((H + Hc)/w), with Bs =
       Br/tanh(Hc/w) so that B(0) = Br; the ascending branch is its image, B(H) → −B(−H). w ≪ Hc gives a square loop (Bs ≈ Br),
       w ≳ Hc a sheared one. Along B, the two branches are 2Hc apart for every B: a cycle between −Bm and +Bm (Bm < Bs)
       encloses exactly 4 Hc Bm. { Bs, w, descendante(H), montante(H), aire(Bm): 4 Hc Bm (J·m⁻³ per cycle), BHmax: the largest
       −B H on the descending branch for H in [−Hc, 0] (J·m⁻³), Hmax: H at that point }. A shape, not a theory: it fixes Br and
       Hc exactly and leaves the rest to w; real branches are not tanh, and a loop not driven to saturation is narrower. */
    function cycleModele(Br, Hc, w) {
      pos(Br, "Br"); pos(Hc, "Hc"); pos(w, "w");
      const Bs = Br / Math.tanh(Hc / w), des = H => Bs * Math.tanh((fini(H, "H") + Hc) / w), mon = H => -des(-H);
      const aire = Bm => { pos(Bm, "Bm"); if (!(Bm < Bs)) err("Bm doit être < Bs"); return 4 * Hc * Bm; };
      let best = 0, Hb = 0; const K = 4000;
      for (let k = 0; k <= K; k++) { const H = -Hc * k / K, p = -des(H) * H; if (p > best) { best = p; Hb = H; } }
      /* then a golden-section search in the two cells around the best grid point (−BH is unimodal there) */
      let a = Math.max(-Hc, Hb - Hc / K), b = Math.min(0, Hb + Hc / K); const r = (Math.sqrt(5) - 1) / 2, P = H => -des(H) * H;
      for (let q = 0; q < 60; q++) { const c = b - r * (b - a), d = a + r * (b - a); if (P(c) > P(d)) b = d; else a = c; }
      if (P((a + b) / 2) > best) { Hb = (a + b) / 2; best = P(Hb); }
      return { Bs, w, descendante: des, montante: mon, aire, BHmax: best, Hmax: Hb };
    }
    /* The knee width w that gives a loop of Br, Hc the energy product BHmax (bisection on ln w: BHmax falls as w grows, from
       Br Hc for the square loop to Br Hc/4 for the straight line). Null if BHmax is outside that range. */
    function largeurDepuisBHmax(Br, Hc, BHmax) {
      pos(Br, "Br"); pos(Hc, "Hc"); pos(BHmax, "BHmax"); const g = lw => cycleModele(Br, Hc, Math.exp(lw)).BHmax - BHmax;
      let lo = Math.log(Hc * 1e-4), hi = Math.log(Hc * 1e4); if (g(lo) < 0 || g(hi) > 0) return null;
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (g(m) > 0) lo = m; else hi = m; }
      return Math.exp((lo + hi) / 2);
    }
    /* A permanent magnet of length lm (m) closed by a gap lg through soft iron of infinite permeability, same section, no
       current: (36.27) with NI = 0, B lg/μ0 + H lm = 0, met with the descending branch des(H) of the magnet. { H, B (in the
       magnet and the gap), BH: −B H (J·m⁻³), the energy product at the working point }. Leakage and fringing left out. */
    function aimantEntrefer(des, lm, lg, Hc) {
      if (typeof des !== "function") err("des doit être une fonction B(H)"); pos(lm, "lm"); pos(lg, "lg"); pos(Hc, "Hc");
      const g = H => des(H) + MU0 * lm * H / lg; let lo = -Hc * 1.000001, hi = 0;
      if (g(lo) > 0) lo = -Hc * 10; if (g(hi) < 0 || g(lo) > 0) err("pas de point de fonctionnement entre −Hc et 0");
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; }
      const H = (lo + hi) / 2, B = des(H); return { H, B, BH: -B * H };
    }

    /* §37-5. Two sublattices A and B in mean field (Néel, 1948), reduced: each sublattice i holds n_i moments of spin j_i (g = 2)
       per formula unit; m_i = B_j(x_i) its reduced magnetisation along +z (sign included), x_i = g μB j_i B_i/(k_B T), with the
       molecular field B_i = Σ_k w_ik n_k g j_k m_k (T; w_ik in T per Bohr magneton per formula unit). o = { nA, nB,
       jA, jB, wAA, wAB, wBB, T (K), B (applied, T) }. Solved by damped iteration from a start ±1 (A up, B set by the sign of
       wAB). { mA, mB, net: nA g jA mA + nB g jB mB (μB per formula unit), convergence }. wAB < 0: the sublattices are
       antiparallel; nA jA = nB jB with wAA = wBB gives the antiferromagnet, unequal moments the ferrimagnet. Mean field. */
    function deuxReseaux(o) {
      o = o || {}; const g = 2, Bj = need("brillouin");
      const nA = posz(o.nA, "nA"), nB = posz(o.nB, "nB"), jA = pos(o.jA, "jA"), jB = pos(o.jB, "jB"), T = pos(o.T, "T");
      const wAA = fini(o.wAA || 0, "wAA"), wAB = fini(o.wAB || 0, "wAB"), wBB = fini(o.wBB || 0, "wBB"), B0 = fini(o.B || 0, "B");
      const muA = g * jA, muB = g * jB; /* in μB */
      let mA = 1, mB = wAB < 0 ? -1 : 1, ok = false;
      for (let it = 0; it < 20000; it++) {
        const BA = B0 + wAA * nA * muA * mA + wAB * nB * muB * mB, BB = B0 + wAB * nA * muA * mA + wBB * nB * muB * mB;
        const nA2 = Bj(jA, muA * MUB * BA / (KB * T)), nB2 = Bj(jB, muB * MUB * BB / (KB * T));
        const d = Math.abs(nA2 - mA) + Math.abs(nB2 - mB);
        mA += 0.5 * (nA2 - mA); mB += 0.5 * (nB2 - mB);
        if (d < 1e-12) { ok = true; break; }
      }
      return { mA, mB, net: nA * muA * mA + nB * muB * mB, convergence: ok };
    }
    /* Néel's count for a ferrite: the net moment per formula unit (μB) is |Σ up − Σ down| of the ions' spin moments; from it,
       σ = net μB N_A/Mmol (A·m²·kg⁻¹, at 0 K), and Ms = σ ρ (A·m⁻¹) when a density ρ is given. Magnetite
       [Fe³⁺]_A[Fe³⁺Fe²⁺]_B O4: 5 against 5 + 4, 4 μB; YIG Y3Fe5O12: three Fe³⁺ against two, 5 μB. Spin-only moments (orbital
       moment quenched), all spins of a sublattice parallel. */
    const FERRITES = Object.freeze({
      magnetite: Object.freeze({ haut: [5, 4], bas: [5], Mmol: 0.231533 }),
      yig: Object.freeze({ haut: [5, 5, 5], bas: [5, 5], Mmol: 0.737938 }),
    });
    function momentFerrite(f) {
      if (!f || !Array.isArray(f.haut) || !Array.isArray(f.bas)) err("ferrite : { haut, bas, Mmol, rho }");
      const net = Math.abs(f.haut.reduce((a, b) => a + b, 0) - f.bas.reduce((a, b) => a + b, 0));
      const sigma = net * MUB * NA / pos(f.Mmol, "Mmol"); return { net, sigma, Ms: f.rho == null ? null : sigma * pos(f.rho, "ρ") };
    }

    Object.assign(api, { aimantationReduite, exposantLocal, echelleEnergies, thermoSpin, bilanChampMoyen, magnetocalorique,
      momentParAtome, KAPPA_BANDES, domainesBandes, FER_PAROI, paroi, paroiAccrochee, MATERIAUX, ALNICO5, cycleModele, largeurDepuisBHmax,
      aimantEntrefer, deuxReseaux, FERRITES, momentFerrite });
  }

  /* ---------- fin des sections ---------- */
  if (node) module.exports = api;
  else root.MagInd = api;
})(typeof self !== "undefined" ? self : this);

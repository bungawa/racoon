/* Physique statistique, monde « statistique » : module commun. Pure, no DOM, UMD (global Statistique). SI throughout:
   m, m⁻³, kg, Pa, K, J. Started by the step « Théorie cinétique des gaz » (Feynman I.39.1 to I.39.5). Other steps extend it with Edit.
   Perfect-gas laws already in public/thermo.js (pression, vdw, GAZ, ecarts) are used from there, not copied.

   The system, before the law (I.39.1)
     M                              molar masses (kg·mol⁻¹) of He, Ar, N2: IUPAC standard atomic weights (abridged, 2021).
     densite(P, T)                  n* = P/(k_B T), molecules per m³ of a perfect gas.
     distance(P, T)                 mean spacing d = n*^(−1/3).
     diametre(b)                    molecular diameter σ from the van der Waals covolume b (m³·mol⁻¹): b = (2π/3) N_A σ³.
     lambdaTh(m, T)                 thermal de Broglie wavelength h/√(2π m k_B T), m in kg.
     regime(gaz, T, P)              { n, d, sigma, sd: σ/d, ld: λ/d, a, b } for gaz in Thermo.GAZ: σ/d small ⇒ dilute,
                                    λ/d small ⇒ classical; a, b are Thermo.ecarts at the molar volume RT/P.
   Pressure from impacts (I.39.2)
     pression(n, m, v2)             (39.5)-(39.8): P = n m ⟨v²⟩/3, n per m³, ⟨v²⟩ in m²·s⁻².
     vQuadratique(Mm, T)            √⟨v²⟩ = √(3RT/Mm), Mm in kg·mol⁻¹.
     adiabatique(P0, V0, V, gamma)  (39.14): { P: P0 (V0/V)^γ, T: T/T0 = (V0/V)^(γ−1) }.
     boite(o, rand)                 point molecules (no size, no mutual collision) in a box Lx × L × L, a piston at x = Lx.
                                    o = { N, L, m, T }: speeds drawn from Maxwell at T. Returns the state { N, m, L, X, u, x…vz,
                                    impulse, time }.
     avance(b, dt, o)               advances by dt; the piston moves at b.u (m·s⁻¹, < 0 compresses). A bounce on the piston is
                                    elastic in its frame: vx → 2u − vx. o.melange ∈ [0, 1]: fraction of molecules whose velocity
                                    is turned to a random direction each step, its magnitude kept (a stand-in for collisions).
     mesure(b)                      measured pressure: impulse given to the piston / (time × area), then resets the counters.
     energie(b)                     total kinetic energy Σ ½ m v² (J); energieX(b): its part Σ ½ m vx², the only one the piston
                                    feels (PV = 2 Ux, (39.4)); temperature(b) = 2U/(3 N k_B).
     gammaEffectif(U0, V0, U1, V1)  1 + ln(U1/U0)/ln(V0/V1): 5/3 when the energy spreads over three directions, 3 when not.
   Radiation (I.39.3)
     A_RAD                          radiation constant a = 8π⁵k_B⁴/(15 h³ c³), J·m⁻³·K⁻⁴ (exact from SI 2019); SIGMA = a c/4.
     rayonnement(T)                 { u: aT⁴, P: aT⁴/3 } for black-body radiation in equilibrium at T.
     pvSurU(g)                      PV/U for isotropic particles all of Lorentz factor g, U their kinetic energy:
                                    (1 + 1/g)/3, from 2/3 (slow) to 1/3 (ultra-relativistic, photons). Exact.
     etoile(rho, T, mu)             fully ionised gas of mean particle mass mu·u plus radiation: { Pgaz: ρ k_B T/(μ u), Prad, beta }.
   Temperature (I.39.4)
     melange(o, rand)               two species, o = { N1, N2, m1, m2, e1, e2 }: isotropic Gaussian velocities, mean kinetic
                                    energies e1, e2 (J). State { m: [m1, m2], v: [Float64Array 3N1, 3N2], chocs }.
     choc(s, k, rand, o)            k collisions between random pairs (any species): centre-of-mass velocity kept, relative velocity
                                    turned to a random direction, magnitude kept. Elastic: momentum and energy conserved exactly.
                                    o.memes: pairs of the same species only (then nothing passes from one species to the other).
     direction(rand)                a unit vector uniform on the sphere.
     energies(s)                    [⟨½ m1 v1²⟩, ⟨½ m2 v2²⟩].
     wvcm(s, k, rand)               (39.19): mean of w·v_CM over k random unlike pairs.
   Perfect gas law (I.39.5)
     nombre(P, V, T)                N = PV/(k_B T), (39.22).
     volumeMolaire(P, T)            RT/P.
     Z(gaz, P, T)                   compressibility PV/(nRT) of one mole of a van der Waals gas (Thermo.vdw), gas branch,
                                    by bisection; T must be above the critical temperature 8a/(27Rb).
     cinetique(r, T)                an r-atom molecule: { total: (3r/2) k_B T, cm: (3/2) k_B T, interne: (3/2)(r − 1) k_B T }.
   Boltzmann's law (step « La loi de Boltzmann », I.40.1 to I.40.3). The isothermal atmosphere with its standard-atmosphere
   comparison is Fluides.atmIsotherme (public/fluides.js); only the scale height R T/(M g) is written here, so that the pages of
   this world need not load fluides.js.
     M also holds H2, O2, CO2.     AIR_SEC: mole fractions of dry air N2, O2, Ar (78,084 %, 20,946 %, 0,934 %).
     facteur(U, T)                  (40.3): Boltzmann factor exp(−U/(k_B T)), U in J (any sign).
     nSurN0(z, Mm, T, g)            (40.1): n(z)/n(0) = exp(−z/H) for one gas of molar mass Mm in an isothermal column.
     separation(z, T, x0, g)        diffusive equilibrium, each gas its own exponential: { x: mole fractions at z, n: n(z)/n(0) }.
     forceDeDensite(xs, ns, T)      (40.2): F = k_B T d(ln n)/dx by centred differences, at xs[1…N−2].
     centrifugeuse(r, Mm, v, Rc, T) n(r)/n(0) in a gas turning rigidly at peripheral speed v = ωRc: exp(Mm v² r²/(2 R T Rc²)).
     separationCentrifuge(Ma, Mb, v, T)   [n_b/n_a](wall)/[n_b/n_a](axis) = exp((Mb − Ma) v²/(2RT)).
     LJ_AR, lj(r, p), r0(p)         Lennard-Jones pair potential, argon parameters of Rahman (1964): ε/k_B = 120 K, σ = 0,34 nm.
     gaz2D(o, rand)                 N Lennard-Jones atoms in a periodic square of side o.L (m), on a grid: { N, L, x, y, p, acc, essais }.
     metropolis(s, k, T, rand, o)   k Metropolis trial moves at T (step o.pas, default 0,2 σ): accepted with min(1, e^(−ΔU/k_B T)).
                                    The samples follow exp(−ΣV/(k_B T)) (§40-3). Cut-off 3σ, nearest image.
     energiePaires(s)               ΣV over pairs (J).   voisins(s, rc): neighbour counts within rc (default 1,5 σ).
     dense(s, k)                    fraction of atoms with at least k neighbours (default 3): the condensed part.
     extraction(T)                  water, from Thermo's saturation densities: W = −k_B d ln(ρ''/ρ')/d(1/T), the energy that takes
                                    one molecule from liquid to vapour, against Lm = L M/N_A and k_B T. 274 K to 640 K.
   Speeds and specific heats (step « Vitesses moléculaires et chaleurs massiques », I.40.4 to I.40.6). m in kg, v in m·s⁻¹.
     f1(vx, m, T)                   (40.7): density of one velocity component, √(m/2πk_BT) e^(−m vx²/2k_BT), s·m⁻¹.
     fluxAuDela(u, m, T)            (40.6): fraction of the molecules crossing a plane upward whose vz exceeds u, e^(−mu²/2k_BT).
     maxwell(v, m, T)               density of the speed |v| from (40.9): 4πv² (m/2πk_BT)^(3/2) e^(−mv²/2k_BT), s·m⁻¹.
     vitesses(m, T)                 { vp: √(2k_BT/m), moy: √(8k_BT/πm), rms: √(3k_BT/m) }.
     auDela(u, m, T)                fraction of the molecules of speed above u: erfc(x) + 2x e^(−x²)/√π, x = u/vp
                                    (erfc from Proba, public/lecons/probabilites.js, required at load like the other modules).
     isotrope(o, rand)              o = { N, m, v0 }: N molecules of one mass, all of speed v0, directions uniform; a state for choc
                                    (the N molecules split in two halves of the same species).   normes(s): their speeds |v|.
     GAMMA_MES                      Table 40-1: γ measured, at T (K), with r atoms, linear or not, molar mass (kg·mol⁻¹).
     degres(r, lin, vib)            quadratic terms of the classical energy of an r-atom molecule: 3 (translation) + 2 or 3
                                    (rotation, 0 for an atom) + 2 per vibration mode (3r − 5 or 3r − 6) when vib.
     gammaDe(f)                     γ = 1 + 2/f from PV = (γ − 1)U, U = (f/2) N k_B T.   fDe(γ): 2/(γ − 1).
     cvMolaire(γ)                   R/(γ − 1), J·mol⁻¹·K⁻¹.   cvMassique(γ, Mm): R/((γ − 1)Mm), J·kg⁻¹·K⁻¹.
     DIATOMIQUES                    H2, N2, O2, HI, Br2, I2: θvib = hcν̃/k_B with ν̃ = ωe − 2ωexe, the 0 → 1 interval, and
                                    θrot = hcBe/k_B (NIST WebBook, Huber and Herzberg); Cp measured (NIST-JANAF, Chase 1998).
     niveaux(x, n)                  (40.11): populations of the first n levels of an oscillator, levels kħω, x = ħω/k_BT,
                                    by the direct sum of the Boltzmann factors (normalised to 1 over all levels).
     eVib(theta, T)                 mean vibration energy above the ground level, in units of k_B T: x/(e^x − 1), x = θ/T.
     cVib(theta, T)                 its heat capacity per molecule, in k_B: x² e^x/(e^x − 1)², 0 (frozen) to 1 (classical).
     gammaDiatomique(g, T)          γ of a diatomic gas: translation 3/2, rotation 1 (classical), quantum vibration cVib:
                                    { cv: Cv,m/R, gamma }. g is a key of DIATOMIQUES or { thetaV }.
   Equipartition (step « Équipartition de l'énergie », I.41.1 to I.41.4). ω in rad·s⁻¹, T in K.
     oscillateurs(o, rand)          N independent damped oscillators x'' = −ω0² x − γ x' + thermal force, o = { N, m, w0, gamma, T }
                                    (m: mass or moment of inertia, w0 = 0 for a free particle); x = 0, v drawn from Maxwell at T.
     langevin(s, dt, rand)          one BAOAB step (half kick, half drift, exact Ornstein–Uhlenbeck velocity, half drift, half kick):
                                    the friction γ and the random force come together, their ratio fixed by T. Returns s.
     moyennes(s)                    { x2: ⟨x²⟩, v2: ⟨v²⟩ } over the N copies.
     thetaQuadratique(I, w0, T)     (41.1): ⟨θ²⟩ = k_B T/(I ω0²), rad².
     bruitInductance(L, w0, T)      (41.2): ⟨V_L²⟩ = L ω0² k_B T, V².   johnson(R, T, df): ⟨V²⟩ = 4 k_B T R Δf (Nyquist), V².
     R0                             classical electron radius e²/(4π ε0 m_e c²), m.
     gammaRad(w0, r0)               (41.6): radiation damping (2/3) r0 ω0²/c, s⁻¹ (r0 default R0).
     sectionEfficace(w, w0, g, r0)  (41.8): scattering cross-section of a damped oscillator, m².
     rayleigh(w, T)                 (41.13): I(ω) = ω² k_B T/(π² c²), W·m⁻² per rad·s⁻¹; u = I/c is the energy density per rad·s⁻¹.
     planck(w, T)                   (41.16): I(ω) = ħω³/(π² c² (e^(ħω/k_BT) − 1)), same unit.
     bilan(w0, T, I, o)             (41.10): power absorbed ∫ I σ_s dω by an oscillator of radiation damping γ = gammaRad(w0, o.r0)
                                    in isotropic radiation I(ω), against 3γ⟨E⟩ radiated, ⟨E⟩ = o.E (default k_B T). Numerical
                                    integral over ±o.largeurs (default 2000) widths γ. { absorbe, emis, gamma, Q }.
     energieJusqua(wmax, T, loi)    ∫0^wmax u(ω) dω (J·m⁻³), loi "rayleigh" (exact, k_BT ωmax³/(3π²c³)) or "planck" (numerical).
     eMoyenne(w, T)                 (41.15): ħω/(e^(ħω/k_BT) − 1), J.   serie(x, n): (41.14) with n terms, in units of ħω.
     xPic                           2,821 439…: root of 3(1 − e^(−x)) = x, the peak of (41.16) at ħω = xPic k_B T.
     brownien(o, rand)              N free spheres of radius a and density rho, of drag coefficient mu (kg·s⁻¹: the caller gives
                                    it, e.g. Stokes's 6πηa from Forces.stokes), o = { N, a, rho, mu, T, dim }.
                                    State { N, dim, m, mu, tau: m/μ, T, x: [Float64Array…], v: […], t }.
     pasExact(s, dt, rand)          the free Langevin particle advanced by dt exactly (joint Gaussian of Δx and Δv), any dt/τ.
     msd(t, T, mu, tau)             ⟨x²⟩ per coordinate at t from x = 0, v thermal: 2(k_BT/μ)(t − τ(1 − e^(−t/τ))), (41.20) for t ≫ τ.
     perrin(depl, dt, mu, T)        from the displacements over dt (one coordinate, Float64Array or array): { kB, NA, rel }:
                                    k_B = μ⟨Δx²⟩/(2 dt T), N_A = R/k_B, rel = √(2/n) the relative standard deviation of the estimate.
   Applications (step « Applications de la théorie cinétique », I.42.1 to I.42.5). Energies W in eV where named so, T in K.
     frappe(n, m, T)                molecules hitting a wall per m² per s in a Maxwell gas: n⟨v⟩/4 = n √(k_BT/2πm).
     hertzKnudsen(P, m, T, alpha)   (42.5a), Feynman's (42.5) made exact: evaporation flux into vacuum α P_sat/√(2π m k_B T), m⁻²·s⁻¹; α = 1 − R.
     evaporationEau(T, alpha)       water into vacuum, its surface held at T (Thermo.psat, rhoLiq, Lvap; 273,16 K to Tc):
                                    { p, Jn: m⁻²·s⁻¹, J: kg·m⁻²·s⁻¹, recul: J/ρ (m·s⁻¹), q: J·Lvap (W·m⁻²), nVa: n_vap/n_liq }.
     A_RICHARDSON                   4π m_e e k_B²/h³ = 1,2017 × 10⁶ A·m⁻²·K⁻²: free electrons, no reflection, two spin states.
     CATHODES                       { W, A } measured (W in eV, A in A·m⁻²·K⁻²): tungsten and thoriated tungsten from Dushman,
                                    Rev. Mod. Phys. 2, 381 (1930), table I (4,52 V rounded to 4,5; 60,2 and 3,0 A·cm⁻²·K⁻²);
                                    lanthanum hexaboride from Lafferty, J. Appl. Phys. 22, 299 (1951): 2,66 eV, 29 A·cm⁻²·K⁻².
     richardson(T, W, A)            Richardson–Dushman current density A T² e^(−eW/k_BT), A·m⁻².
     droiteRichardson(Ts, Js)       least squares of ln(J/T²) against 1/T: { W (eV), A } read from slope and intercept.
     W_H                            13,598 433 eV, ionisation energy of hydrogen from 1s (NIST).
     saha(T, W, g)                  (42.7) made exact: n_e n_i/n_a = g λ_e⁻³ e^(−eW/k_BT), m⁻³, λ_e = lambdaTh(m_e, T);
                                    g = 2 g_i/g_a (1 for hydrogen in its ground level).
     fractionIonisee(n, T, W, g)    (42.8) solved: f with f²/(1 − f) = saha/n, n = n_a + n_i nuclei per m³ (one ionisation).
     tDemi(n, W, g)                 T (K) where f = 1/2, by bisection in ln T over 100 K to 10⁷ K.
     arrhenius(A, Ea, T)            A e^(−Ea/RT), Ea in J·mol⁻¹.   facteurDix(Ea, T, dT): k(T + dT)/k(T), dT default 10 K.
     reaction(o)                    o = { Ea, dE, T, A, Ar, cat } (J·mol⁻¹): barrier Ea − cat above the reactants, products at dE:
                                    { kf: A e^(−Ea'/RT), kr: Ar e^(−(Ea' − dE)/RT), K: kf/kr }; K does not depend on cat.
     einstein(w, T)                 (42.13)-(42.18), equal degeneracies: { x: ħω/k_BT, pop: N_m/N_n = e^(−x), nbar: 1/(e^x − 1),
                                    AsurB: ħω³/(π²c²), I: planck(w, T), stimSpont: B I/A, ecart: residual of (42.16) over A }.
     temperatureDe(r, w)            the T that would give N_m/N_n = r: −ħω/(k_B ln r); negative for r > 1 (inversion), ∞ at r = 1.
   Collisions, mean free path, drift (step « Collisions et libre parcours moyen », I.43.1 to I.43.3). t, τ in s, σ in m².
     survie(t, tau)                 (43.8): P(t) = e^(−t/τ), the probability of going t without a collision.
     vols(o, rand)                  o = { N, tau, p, duree }: N molecules, time cut in steps dt = pτ (0 < p ≤ 1), a collision at the
                                    end of each step with probability p = dt/τ, whatever came before. From t = 0 to duree:
                                    { dt, premier: first collision times (from t = 0, an arbitrary instant), libres: the completed
                                    intervals, jusqua, depuis: time to the next and since the last collision from one random
                                    instant per molecule in [duree/4, 3 duree/4] }. p = 1: every flight lasts exactly τ.
     attente(p, tau)                exact means for those steps, a random instant: { libre: τ, jusqua: τ(1 − p/2), contenant: τ(2 − p) }.
                                    p → 0: τ, τ, 2τ (exponential flights); p = 1: τ, τ/2, τ (regular flights).
     SIGMA_C                        collision cross-sections σ (m²) of H2, He, N2, O2, Ar, CO2 (Atkins's table, 0,21 to 0,52 nm²).
     libreParcours(n, sigma, id)    (43.11): 1/(nσ), targets at rest; id true: 1/(√2 nσ), identical molecules all moving (Maxwell).
     vRel(v, m, T)                  mean relative speed of a molecule of speed v among Maxwell molecules of its mass:
                                    vp [e^(−x²)/√π + (x + 1/(2x)) erf(x)], x = v/vp. ⟨v⟩ at v = 0, √2 ⟨v⟩ averaged over Maxwell.
     parcours(g, P, T)              a dilute gas g of SIGMA_C at P, T: { n, sigma, d: √(σ/π), espacement: n^(−1/3), l (identical
                                    molecules), lCible, vmoy, tau: l/⟨v⟩, nu: 1/τ, nd3: n d³ (volume fraction, order of) }.
     vDerive(F, tau, m)             (43.13): Fτ/m.   mobilite(tau, m): (43.15), τ/m (s·kg⁻¹).
     deriveTheorie(M, m, regulier)  ⟨v⟩/(Fτ/M) of a molecule of mass M among molecules of mass m, collision rate 1/τ independent of
                                    the speeds, scattering isotropic in the centre-of-mass frame: 1 + M/m (exponential flights,
                                    i.e. Fτ/μ with μ the reduced mass), 1/2 + M/m (flights all of length τ). M ≪ m: Feynman's 1 and 1/2.
     derive(o, rand)                o = { M, m, T, F, tau, chocs, regulier, neuf }: that molecule, F along x, 3D velocities.
                                    neuf: after a collision the velocity is drawn afresh from Maxwell at T (Feynman's fresh start).
                                    Otherwise the collision partner is drawn from Maxwell at T, elastic. Exact time average of vx:
                                    { v, err (batch means, 20 batches), unite: Fτ/M, vth: √(k_B T/M), suivi: [[k, mean of vx over
                                    the first k flights]…] at about 10 counts k per decade, blocs: { x, t } the displacement along x
                                    and the duration of each batch }. o.blocs: number of batches (default 20).
   Ionic conductivity, diffusion, thermal conductivity (step « Diffusion moléculaire », I.43.4 to I.43.6). μ is Feynman's mobility
   v/F (s·kg⁻¹); k = qμ is the mobility v/E of electrochemistry and atmospheric physics (m²·V⁻¹·s⁻¹).
     conductiviteIonique(n, q, mu)  (43.20) per unit A/b: σ = μ q² n (S·m⁻¹), one kind of ion of charge q, n per m³.
     chambre(o)                     a gas between plane plates (area A, gap b, voltage V), ion pairs made at q per m³ per s, removed by
                                    recombination α n² and by the drift to the plates; o = { q, alpha, kp, kn, b, A, V }, kp and kn
                                    the field mobilities of both signs. Densities uniform and equal: α b n² + (v₊ + v₋) n = q b.
                                    { n, n0: √(q/α), I: e n (v₊ + v₋) A, ohm: the current at n = n0 (Ohm's law), sat: e q b A, frac:
                                    the fraction of the pairs that recombine }.
     dLibre(l, v)                   (43.27): lv/3.   dEinstein(mu, T): (43.31), μ k_B T.
     einsteinSim(o, rand)           o = { M, m, T, tau, chocs, regulier, neuf }: the molecule of derive, measured twice, independently.
                                    Without force: D = Σ X_b²/(2 Σ t_b) over batches of at least 30 memories (1 + M/m flights);
                                    with a weak force: μ = v/F. { D, errD, mu, errMu, rapport: D/(μ k_B T), errRapport, th (D and
                                    μ k_B T in units of k_B T τ/M, deriveTheorie or the fresh-start 1 and 1/2), lv3: (43.27) with
                                    l = ⟨v⟩τ in the same unit, 8/(3π), unite: k_B T τ/M }.
     KAPPA_MES                      thermal conductivities measured at 300 K, 100 kPa (He, H2: limit P → 0), W·m⁻¹·K⁻¹.
     kappaLibre(n, l, v, gamma)     (43.42): k_B n l v/(γ − 1), no factor 1/3 (Feynman's form).
     kappaGaz(g, T, P)              He, Ar (γ = 5/3), N2, O2, H2 (7/5) of SIGMA_C: { k42: (43.42) with l of identical molecules,
                                    k43: (43.43), k_B ⟨v⟩/((γ − 1)σ), gamma, l, vmoy, mes: KAPPA_MES[g] (300 K) }.
     conductionPlaques(o)           o = { g, P, T, L, kappa }: heat flux per kelvin (W·m⁻²·K⁻¹) between two plates a gap L apart.
                                    Dense limit hc = κ/L (κ default KAPPA_MES); free-molecule limit hfm = frappe · k_B (γ + 1)/(2(γ − 1)),
                                    every molecule taking the temperature of the plate it hits; h = 1/(1/hc + 1/hfm) between the two.
                                    { hc, hfm, h, Kn: l/L, l }.
   Ratchet and irreversibility (step « Irréversibilité », I.46.1 to I.46.5).
   Brownian ratchet, reduced units: angle in teeth (period 1), energies in k_B T, time in γθ²/(k_B T) (γ the rotational friction):
     dent(x, eps, a)                sawtooth { U, F = −dU/dx }: U rises from 0 to eps over [0, a[, falls back over [a, 1[. Forward = +x,
                                    up the slope a. It stands for the pawl's spring energy as the wheel turns (pawl and wheel lumped).
     cliquetBrownien(o, rand)       o = { N, eps, a, f, dt }: N independent wheels, overdamped, one temperature, a load f (k_B T per
                                    tooth) pulling backward. State { x, m (last well reached), t, avant, arriere }.
     pasCliquet(s, n, rand)         n Euler–Maruyama steps dx = (F − f) dt + √(2 dt) ξ; a hop counts when the next well is reached.
     vitesseCliquet(eps, a, f, n)   exact mean drift (teeth per unit time) for a tilted periodic potential (Stratonovich):
                                    (1 − e^(−F0)) / ∫∫ e^(U(x) − U(x − y) − F0 y) dx dy, F0 = −f, midpoint rule n × n. Zero at f = 0.
   Feynman's two-temperature engine (§46-2), SI: eps (J), L (N·m), theta (rad), T1 vanes, T2 ratchet (K), tau (s):
     cliquetMoteur(o)               rates avant = e^(−(ε + Lθ)/k_B T1)/τ, arriere = e^(−ε/k_B T2)/τ; { omega = θ (avant − arriere),
                                    P = Lθ (…), Q1 = (ε + Lθ)(…), Q2 = ε (…) (+ o.fuite (T1 − T2): a heat leak, W·K⁻¹, default 0),
                                    eta = P/Q1 (null unless P, Q1 > 0), etaPas = Lθ/(ε + Lθ), carnot, Larret: the stall load
                                    ε(T1/T2 − 1)/θ, Sc = Q2/T2 − Q1/T1 ≥ 0 }.
     omega461(eps, L, theta, T, tau)  (46.1): (θ/τ) e^(−ε/k_BT)(e^(−Lθ/k_BT) − 1), the equal-temperature case.
     sautsCliquet(o, n, rand)       n jumps drawn as a Markov process (Gillespie): { t, avant, arriere, angle, W, Q1, Q2 }.
   Reversible gas (§46-3, §46-4): soft disks (WCA, cut at 2^(1/6) σ), σ = ε = m = 1, time √(mσ²/ε), soft walls at 0 and L.
     gaz(o, rand)                   o = { N, L, T (k_B T/ε, default 1), dt (0,005), Q (2²⁴), entier }: grid start, no contact (U = 0),
                                    Gaussian velocities; colour 0 for the left half. Positions stored as X = Q x, with the previous step.
     evoluer(s, n)                  n position-Verlet steps X⁺ = 2X − X⁻ + a dt² Q. entier: the increment rounded to an integer, so the
                                    map is exactly invertible (bit-reversible, the idea of Levesque and Verlet, 1993).
     renverser(s)                   swaps X and X⁻: every velocity reversed. copieGaz(s), positionsGaz(s): { x, y } in σ.
     ecartGaz(a, b)                 RMS distance between the positions of two states, σ.   energieGaz(s): { K, U, E } (K from X − X⁻).
     melangeGaz(s, m)               on an m × m grid, Σ n H(b/n) over cells (b of colour 0): { S (k_B), Smax: N H(N0/N), gauche: the
                                    fraction of colour 0 in the left half }.
     entropieMelange(x)             −Σ x ln x, per molecule in k_B, for mole fractions x.
   Order and counting (§46-5)
     lnC(N, n)                      ln C(N, n): exact sums of logs up to 10⁶, Stirling with 1/(12k) beyond.
     queue(N, k)                    P(n ≥ k) for n binomial (N, 1/2), N ≤ 10⁶.   ecartRelatif(f): f ln 2f + (1 − f) ln 2(1 − f),
                                    the rate in P ≈ e^(−N D) of finding the fraction f on one side.
     ehrenfest(N, n0), pasEhrenfest(s, k, rand)  Ehrenfest's two urns: each step one of the N balls, drawn at random, changes urn;
                                    s.retours counts the visits to n = N.   retourMoyen(N, n): Kac's mean return time 2^N/C(N, n) steps.
     landauer(T)                    k_B T ln 2, J: the least heat given off to erase one bit at T.
   Real gases (step « Gaz réels », X.gaz_reels.1 to 4). One mole; V molar volume (m³·mol⁻¹). Measurements: NIST Chemistry
   WebBook (SRD 69), reference equations of state of N2 (Span et al. 2000), Ar (Tegeler et al. 1999), CO2 (Span, Wagner 1996).
     CRITIQUE                       { Tc (K), Pc (Pa), rhoc (mol·m⁻³) } of N2, Ar, CO2.
     ISO_P, ISO                     measured isotherms on ISO_P (MPa): N2 and Ar at 5 temperatures, CO2 at 5, all above Tc.
     isotherme(g, T)                { P (Pa), Z, Vm, alpha (K⁻¹), chiT (Pa⁻¹), beta (K⁻¹), cpcv (J·mol⁻¹·K⁻¹) } arrays on ISO_P.
     zMesure(g, T, P), pMesure(g, T, V)   interpolated on a measured isotherm (Z linear in P; ln P linear in ln V).
     B_MES, bMesure(g, T)           second virial coefficient from the same data, (Z − 1)/ρ at ρ → 0; linear in 1/T between points.
     boyle(g)                       the Boyle temperature, B(T_B) = 0: N2 ≈ 326 K, Ar ≈ 407 K, CO2 ≈ 720 K.
     vdwCritique(g)                 van der Waals { a, b } that put its critical point at the measured Tc, Pc: a = 27R²Tc²/(64Pc),
                                    b = RTc/(8Pc). critiqueVdw(G): { Tc: 8a/(27Rb), Pc: a/(27b²), Vc: 3b, Zc: 3/8 } (any { a, b }).
     racinesVdw(G, P, T)            the real roots V > b of the cubic, increasing; zVdw(G, P, T): Z of the largest (gas branch).
     coeffsVdw(G, V, T)             analytic { P, dPdT, dPdV, alpha, beta, chiT, l, interne: a/V², cinetique: RT/(V − b), cpcv }.
     bVdw(G, T), boyleVdw(G)        b − a/(RT) and a/(Rb), the van der Waals B and Boyle temperature.
     bReduit(T*), bLJ(T, p)         Lennard-Jones B = −2π N_A ∫ (e^(−u/k_BT) − 1) r² dr: reduced B/(N_A σ³) at T* = k_BT/ε, and in
                                    m³·mol⁻¹ with p = LJ_AR by default. Classical, pairs only: exact at low density for that potential.
     ajusteLJ(g)                    { eps (J), sigma (m), rms (m³·mol⁻¹) }: the Lennard-Jones pair that best fits B_MES[g].
     zViriel(V, B, C), zVirielP(P, T, B)   1 + B/V + C/V² ; 1 + BP/(RT), the pressure series cut after B.
     EAU_293                        liquid water at 293,15 K and 0,1 MPa (NIST, IAPWS-95): { rho, alpha, chiT }.
   Expansions of a real fluid (step « Détentes d'un fluide réel », X.detentes.1 to 3). One mole. Same NIST source, 2026-11-10.
     DET, detente(g, T)             the measured isotherm completed: U, H (J·mol⁻¹), Cv, Cp, mu (μ_JT, K·Pa⁻¹) on ISO_P.
     jouleMesure(g, T, i, j)        free expansion from table point i to point j < i: { V1, V2, dT }, U constant, Cv constant over dT.
     jouleVdw(G, cv, V1, V2)        −(a/Cv)(1/V1 − 1/V2).   entropieJouleVdw(G, cv, T1, V1, V2): entropy created, J·mol⁻¹·K⁻¹.
     muVdw(G, V, T, cv)             V(αT − 1)/Cp for van der Waals.   muVdw0(G, T, Cp): its low-pressure limit (2a/(RT) − b)/Cp.
     muViriel(B, TdBdT, Cp)         (T dB/dT − B)/Cp.   tdbLJ(T, p): T dB/dT of Lennard-Jones.   inversionLJ(p): T where it equals B.
     inversionVdw(G)                2a/(Rb).   inversionVdwP(Tr): reduced pressure 24√(3Tr) − 12Tr − 27 on the inversion curve.
     JT0, jt0(g, T)                 0,1 MPa isobars of N2, Ar, CO2, H2, He: { mu (K·Pa⁻¹), Cp }.   INVERSION_0, inversion0(g): K.
     ISENTHALPES_N2, tIsenthalpe(k, P)   T on the k-th isenthalp of nitrogen at P (Pa).   INVERSION_N2: its inversion curve.
     SAT_N2, linde(T, i)            liquid fraction of a Linde-Hampson cycle fed with nitrogen at (T, ISO_P[i]), ideal exchanger.
     CRITIQUE_LEGERS                { Tc, Pc } of H2 and He.
   Heat conduction (step « Conduction thermique », X.transferts_thermiques.1, 2, 4). SI.
     DIFFUSIVITE, LAMBDA            D (m²·s⁻¹) and λ (W·m⁻¹·K⁻¹) of common materials.   R_SURFACE: { int, ext } of EN ISO 6946.
     fourier(λ, ΔT, e)              λ ΔT/e, W·m⁻².   tempsDiffusion(L, D): L²/D.   nombreFourier(D, t, L): D t/L².
     entropieConduction(φ, Tc, Tf)  φ(1/Tf − 1/Tc), W·K⁻¹ created.
     plaque(ξ, Fo), fluxPlaque(ξ, Fo)   slab with one face stepped to 1: reduced temperature, and reduced flux at a face (1 when steady).
     rPlan(e, λ, S), rCylindre(r1, r2, λ, L), rSerie(…), rParallele(…)   thermal resistances, K·W⁻¹.
     mur(couches, Ti, Te, o)        1 m² of layered wall with surface resistances: { R, U, phi, T (air, surfaces, interfaces), Rs }.
     profondeur(D, ω)               δ = √(2D/ω).   ondeThermique(x, t, { D, omega, T0, A }).   retardOnde(x, D, ω): x/(δω), s.
     vitesseOnde(D, ω)              √(2Dω).   echelon(x, t, D): erfc(x/2√(Dt)).   gradientEchelon(ΔT, t, D): ΔT/√(πDt).
     ageKelvin(ΔT, G, D)            ΔT²/(πDG²): the time a half-space stepped by ΔT takes to reach the surface gradient G.
   Convection and radiation (step « Convection et rayonnement », X.transferts_thermiques.3, X.corps_noir.1 and 2). SI.
     newton(h, Tp, Tf)              h(Tp − Tf), W·m⁻².   biot(h, L, λ): hL/λ.   tauNewton(ρc, V, h, S): ρcV/(hS), s.
     refroidissement(t, τ, T0, Tf)  Tf + (T0 − Tf) e^(−t/τ): a body at uniform temperature (small Biot number).
     mAilette(h, λ, p, A)           √(hp/(λA)), m⁻¹.   ailette(x, L, m, bout): θ(x)/θ(0), tip "isole" (cosh) or "infinie" (e^(−mx)).
     fluxAilette(h, λ, p, A, L, θ0) √(hpλA) θ0 tanh(mL), W.   rendementAilette(mL): tanh(mL)/(mL).   efficaciteAilette(…): flux/(hAθ0).
     planckLambda(λ, T), planckNu(ν, T)   black-body exitance per unit wavelength (W·m⁻³) and frequency (W·m⁻²·Hz⁻¹).
     B_WIEN, wien(T), wienNu(T)     2,898 × 10⁻³ m·K; the two peaks (they do not coincide: X_WIEN = 4,965, xPic = 2,821).
     stefan(T, ε)                   ε σ T⁴.   fractionBande(T, λ1, λ2): share of σT⁴ between two wavelengths.
     PLANETES, T_SOLEIL             { S0, A, Ts } of Venus, Terre, Mars (NASA fact sheets); 5 772 K.
     temperatureEquilibre(S0, A)    (S0(1 − A)/(4σ))^(1/4).   serre(Te, n): Te (n + 1)^(1/4), n opaque layers.
     serreGrise(Te, ε)              Te (2/(2 − ε))^(1/4), one layer absorbing ε.   absorptionDe(Ts, Te): the ε that gives Ts.
     hRad(T, ε)                     4εσT³.   echangePlans(T1, T2, ε1, ε2): σ(T1⁴ − T2⁴)/(1/ε1 + 1/ε2 − 1).
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const req = typeof require === "function" && typeof module !== "undefined";
  const C = req ? require("./constantes.js") : root.Constantes;
  const Th = req ? require("./thermo.js") : root.Thermo;
  const gauss = (req ? require("./lecons/incertitude-absolue-relative.js") : root.Incert).gauss;   // one copy, in Incert
  const Pr = req ? require("./lecons/probabilites.js") : root.Proba;                                 // erf, erfc
  const { k_B, N_A, R, h, c, u } = C;
  const err = m => { throw new Error("statistique : " + m); };
  const pos = (v, n) => { if (!(typeof v === "number" && v > 0 && isFinite(v))) err(n + " > 0 attendu, reçu " + v); return v; };
  const gazDe = g => { const G = Th.GAZ[g]; if (!G || !M[g]) err("gaz inconnu : " + g); return G; };

  /* ---------- le système (39.1) ---------- */
  const M = Object.freeze({ He: 4.0026e-3, Ar: 39.95e-3, N2: 2 * 14.007e-3, H2: 2 * 1.008e-3, O2: 2 * 15.999e-3, CO2: 12.011e-3 + 2 * 15.999e-3 });
  const densite = (P, T) => pos(P, "P") / (k_B * pos(T, "T"));
  const distance = (P, T) => Math.cbrt(1 / densite(P, T));
  const diametre = b => Math.cbrt(3 * pos(b, "b") / (2 * Math.PI * N_A));
  const lambdaTh = (m, T) => h / Math.sqrt(2 * Math.PI * pos(m, "m") * k_B * pos(T, "T"));
  function regime(g, T, P) {
    const G = gazDe(g), n = densite(P, T), d = Math.cbrt(1 / n), sigma = diametre(G.b), lam = lambdaTh(M[g] / N_A, T);
    const e = Th.ecarts(G, 1, R * T / P, T);
    return { n, d, sigma, lambda: lam, sd: sigma / d, ld: lam / d, a: e.a, b: e.b };
  }

  /* ---------- la pression (39.2) ---------- */
  const pression = (n, m, v2) => pos(n, "n") * pos(m, "m") * pos(v2, "⟨v²⟩") / 3;
  const vQuadratique = (Mm, T) => Math.sqrt(3 * R * pos(T, "T") / pos(Mm, "M"));
  function adiabatique(P0, V0, V, gamma) {
    pos(P0, "P0"); pos(V0, "V0"); pos(V, "V"); if (!(gamma > 1 && isFinite(gamma))) err("γ > 1 attendu, reçu " + gamma);
    const r = V0 / V; return { P: P0 * Math.pow(r, gamma), T: Math.pow(r, gamma - 1) };
  }
  function boite(o, rand) {
    const N = o.N; if (!(Number.isInteger(N) && N >= 1)) err("N entier ≥ 1 attendu");
    const L = pos(o.L, "L"), m = pos(o.m, "m"), s = Math.sqrt(k_B * pos(o.T, "T") / m);
    const b = { N, m, L, X: L, u: 0, impulse: 0, time: 0 };
    for (const k of ["x", "y", "z", "vx", "vy", "vz"]) b[k] = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      b.x[i] = rand() * L; b.y[i] = rand() * L; b.z[i] = rand() * L;
      b.vx[i] = s * gauss(rand); b.vy[i] = s * gauss(rand); b.vz[i] = s * gauss(rand);
    }
    return b;
  }
  const refl = (p, v, i, L) => { if (p[i] < 0) { p[i] = -p[i]; v[i] = -v[i]; } else if (p[i] > L) { p[i] = 2 * L - p[i]; v[i] = -v[i]; } };
  function avance(b, dt, o = {}) {
    pos(dt, "dt");
    const mel = o.melange || 0, rand = o.rand, uP = b.u;
    if (mel && typeof rand !== "function") err("melange demande o.rand");
    b.X += uP * dt; if (!(b.X > 0)) err("le piston a atteint le fond");
    for (let i = 0; i < b.N; i++) {
      b.x[i] += b.vx[i] * dt; b.y[i] += b.vy[i] * dt; b.z[i] += b.vz[i] * dt;
      if (b.x[i] < 0) { b.x[i] = -b.x[i]; b.vx[i] = -b.vx[i]; }
      else if (b.x[i] > b.X) {
        const v1 = 2 * uP - b.vx[i];                              // elastic in the piston frame
        if (b.vx[i] > uP) { b.impulse += b.m * (b.vx[i] - v1); b.vx[i] = v1; }
        b.x[i] = Math.max(0, Math.min(b.X, 2 * b.X - b.x[i]));
      }
      refl(b.y, b.vy, i, b.L); refl(b.z, b.vz, i, b.L);
      if (mel && rand() < mel) {
        const v = Math.hypot(b.vx[i], b.vy[i], b.vz[i]), d = direction(rand);
        b.vx[i] = v * d[0]; b.vy[i] = v * d[1]; b.vz[i] = v * d[2];
      }
    }
    b.time += dt;
    return b;
  }
  function direction(rand) {                                       // uniform on the sphere
    const z = 2 * rand() - 1, f = 2 * Math.PI * rand(), s = Math.sqrt(1 - z * z);
    return [s * Math.cos(f), s * Math.sin(f), z];
  }
  function mesure(b) {
    if (!(b.time > 0)) err("aucune durée de mesure");
    const P = b.impulse / (b.time * b.L * b.L); b.impulse = 0; b.time = 0; return P;
  }
  function energie(b) { let e = 0; for (let i = 0; i < b.N; i++) e += b.vx[i] ** 2 + b.vy[i] ** 2 + b.vz[i] ** 2; return 0.5 * b.m * e; }
  function energieX(b) { let e = 0; for (let i = 0; i < b.N; i++) e += b.vx[i] ** 2; return 0.5 * b.m * e; }
  const temperature = b => 2 * energie(b) / (3 * b.N * k_B);
  const gammaEffectif = (U0, V0, U1, V1) => 1 + Math.log(pos(U1, "U1") / pos(U0, "U0")) / Math.log(pos(V0, "V0") / pos(V1, "V1"));

  /* ---------- le rayonnement (39.3) ---------- */
  const A_RAD = 8 * Math.PI ** 5 * k_B ** 4 / (15 * h ** 3 * c ** 3), SIGMA = A_RAD * c / 4;
  const rayonnement = T => { const uu = A_RAD * pos(T, "T") ** 4; return { u: uu, P: uu / 3 }; };
  const pvSurU = g => { if (!(g > 1 && isFinite(g))) err("facteur de Lorentz > 1 attendu, reçu " + g); return (1 + 1 / g) / 3; };
  function etoile(rho, T, mu) {
    const Pgaz = pos(rho, "ρ") * k_B * pos(T, "T") / (pos(mu, "μ") * u), Prad = rayonnement(T).P;
    return { Pgaz, Prad, beta: Pgaz / (Pgaz + Prad) };
  }

  /* ---------- la température (39.4) ---------- */
  function melange(o, rand) {
    const out = { m: [pos(o.m1, "m1"), pos(o.m2, "m2")], v: [], chocs: 0 };
    [[o.N1, o.e1, o.m1], [o.N2, o.e2, o.m2]].forEach(([N, e, m], k) => {
      if (!(Number.isInteger(N) && N >= 2)) err("N entier ≥ 2 attendu");
      const v = new Float64Array(3 * N); let s2 = 0;
      for (let i = 0; i < 3 * N; i++) { v[i] = gauss(rand); s2 += v[i] * v[i]; }
      const f = Math.sqrt(2 * pos(e, "e") * N / (m * s2));                      // exact mean energy e
      for (let i = 0; i < 3 * N; i++) v[i] *= f;
      out.v[k] = v;
    });
    return out;
  }
  function choc(s, k, rand, o = {}) {
    const N1 = s.v[0].length / 3, N2 = s.v[1].length / 3, tot = N1 + N2;
    const pick = () => { const j = Math.floor(rand() * tot); return j < N1 ? [0, j] : [1, j - N1]; };
    for (let n = 0; n < k; n++) {
      const [a, i] = pick(); let b, j;
      do { [b, j] = o.memes ? (a ? [1, Math.floor(rand() * N2)] : [0, Math.floor(rand() * N1)]) : pick(); } while (a === b && i === j);
      const ma = s.m[a], mb = s.m[b], va = s.v[a], vb = s.v[b], M2 = ma + mb;
      const cm = [0, 1, 2].map(x => (ma * va[3 * i + x] + mb * vb[3 * j + x]) / M2);
      const w = Math.hypot(va[3 * i] - vb[3 * j], va[3 * i + 1] - vb[3 * j + 1], va[3 * i + 2] - vb[3 * j + 2]), d = direction(rand);
      for (let x = 0; x < 3; x++) { va[3 * i + x] = cm[x] + mb / M2 * w * d[x]; vb[3 * j + x] = cm[x] - ma / M2 * w * d[x]; }
    }
    s.chocs += k; return s;
  }
  const energies = s => s.v.map((v, k) => { let e = 0; for (let i = 0; i < v.length; i++) e += v[i] * v[i]; return 0.5 * s.m[k] * e / (v.length / 3); });
  function wvcm(s, k, rand) {
    const [m1, m2] = s.m, [v1, v2] = s.v, N1 = v1.length / 3, N2 = v2.length / 3; let acc = 0;
    for (let n = 0; n < k; n++) {
      const i = Math.floor(rand() * N1), j = Math.floor(rand() * N2);
      for (let x = 0; x < 3; x++) acc += (v1[3 * i + x] - v2[3 * j + x]) * (m1 * v1[3 * i + x] + m2 * v2[3 * j + x]) / (m1 + m2);
    }
    return acc / k;
  }

  /* ---------- la loi des gaz parfaits (39.5) ---------- */
  const nombre = (P, V, T) => pos(P, "P") * pos(V, "V") / (k_B * pos(T, "T"));
  const volumeMolaire = (P, T) => R * pos(T, "T") / pos(P, "P");
  function Z(g, P, T) {
    const G = gazDe(g), Pv = Th.vdw(G); pos(P, "P"); pos(T, "T");
    if (!(T > 8 * G.a / (27 * R * G.b))) err("T au-dessus de la température critique attendue");
    let lo = G.b * (1 + 1e-9), hi = Math.max(10 * R * T / P, 10 * G.b);                // P(V) decreases on (b, ∞) above Tc
    for (let i = 0; i < 200; i++) { const mid = Math.sqrt(lo * hi); if (Pv(1, mid, T) > P) lo = mid; else hi = mid; }
    return P * Math.sqrt(lo * hi) / (R * T);
  }
  function cinetique(r, T) {
    if (!(Number.isInteger(r) && r >= 1)) err("nombre d'atomes entier ≥ 1 attendu"); pos(T, "T");
    return { total: 1.5 * r * k_B * T, cm: 1.5 * k_B * T, interne: 1.5 * (r - 1) * k_B * T };
  }

  /* ---------- la loi de Boltzmann (40.1 à 40.3) ---------- */
  const fin = (v, n) => { if (!(typeof v === "number" && isFinite(v))) err(n + " fini attendu, reçu " + v); return v; };
  const AIR_SEC = Object.freeze({ N2: 0.78084, O2: 0.20946, Ar: 0.00934 });
  const facteur = (U, T) => Math.exp(-fin(U, "U") / (k_B * pos(T, "T")));
  const nSurN0 = (z, Mm, T, g = C.g0) => Math.exp(-fin(z, "z") * pos(Mm, "M") * pos(g, "g") / (R * pos(T, "T")));   // H = R T/(M g)
  function separation(z, T, x0 = AIR_SEC, g) {
    const w = {}; let s = 0, s0 = 0;
    for (const k in x0) { if (!M[k]) err("gaz inconnu : " + k); s0 += x0[k]; w[k] = x0[k] * nSurN0(z, M[k], T, g); s += w[k]; }
    const x = {}; for (const k in w) x[k] = w[k] / s;
    return { x, n: s / s0 };
  }
  function forceDeDensite(xs, ns, T) {
    pos(T, "T"); if (xs.length !== ns.length || xs.length < 3) err("au moins trois points, autant de x que de n");
    const F = [];
    for (let i = 1; i < xs.length - 1; i++) F.push(k_B * T * (Math.log(pos(ns[i + 1], "n")) - Math.log(pos(ns[i - 1], "n"))) / (xs[i + 1] - xs[i - 1]));
    return F;
  }
  const centrifugeuse = (r, Mm, v, Rc, T) => Math.exp(pos(Mm, "M") * fin(v, "v") ** 2 * (fin(r, "r") / pos(Rc, "R")) ** 2 / (2 * R * pos(T, "T")));
  const separationCentrifuge = (Ma, Mb, v, T) => Math.exp((pos(Mb, "Mb") - pos(Ma, "Ma")) * fin(v, "v") ** 2 / (2 * R * pos(T, "T")));

  const LJ_AR = Object.freeze({ eps: 120 * k_B, sigma: 3.4e-10 });
  const lj = (r, p = LJ_AR) => { const s6 = (p.sigma / pos(r, "r")) ** 6; return 4 * p.eps * (s6 * s6 - s6); };
  const r0 = (p = LJ_AR) => Math.pow(2, 1 / 6) * p.sigma;
  function gaz2D(o, rand) {
    const N = o.N, L = pos(o.L, "L"), p = o.p || LJ_AR; if (!(Number.isInteger(N) && N >= 2)) err("N entier ≥ 2 attendu");
    const c = Math.ceil(Math.sqrt(N)), a = L / c;
    if (a < 0.9 * p.sigma) err("trop d'atomes pour la boîte");
    const s = { N, L, p, x: new Float64Array(N), y: new Float64Array(N), acc: 0, essais: 0 };
    for (let i = 0; i < N; i++) { s.x[i] = ((i % c) + 0.5 + 0.1 * (rand() - 0.5)) * a; s.y[i] = (Math.floor(i / c) + 0.5 + 0.1 * (rand() - 0.5)) * a; }
    return s;
  }
  function uAtome(s, i, xi, yi) {                                  // energy of atom i placed at (xi, yi) with all others
    const L = s.L, rc2 = 9 * s.p.sigma ** 2; let e = 0;
    for (let j = 0; j < s.N; j++) {
      if (j === i) continue;
      let dx = s.x[j] - xi, dy = s.y[j] - yi;
      dx -= L * Math.round(dx / L); dy -= L * Math.round(dy / L);
      const r2 = dx * dx + dy * dy; if (r2 < rc2) e += lj(Math.sqrt(r2), s.p);
    }
    return e;
  }
  function metropolis(s, k, T, rand, o = {}) {
    const kT = k_B * pos(T, "T"), d = (o.pas || 0.2) * s.p.sigma, L = s.L;
    for (let n = 0; n < k; n++) {
      const i = Math.floor(rand() * s.N), xi = s.x[i], yi = s.y[i];
      const xn = ((xi + d * (2 * rand() - 1)) % L + L) % L, yn = ((yi + d * (2 * rand() - 1)) % L + L) % L;
      const dU = uAtome(s, i, xn, yn) - uAtome(s, i, xi, yi);
      s.essais++;
      if (dU <= 0 || rand() < Math.exp(-dU / kT)) { s.x[i] = xn; s.y[i] = yn; s.acc++; }
    }
    return s;
  }
  function energiePaires(s) { let e = 0; for (let i = 0; i < s.N; i++) e += uAtome(s, i, s.x[i], s.y[i]); return e / 2; }
  function voisins(s, rc) {
    const L = s.L, r2 = (rc || 1.5 * s.p.sigma) ** 2, nb = new Uint16Array(s.N);
    for (let i = 0; i < s.N; i++) for (let j = i + 1; j < s.N; j++) {
      let dx = s.x[j] - s.x[i], dy = s.y[j] - s.y[i]; dx -= L * Math.round(dx / L); dy -= L * Math.round(dy / L);
      if (dx * dx + dy * dy < r2) { nb[i]++; nb[j]++; }
    }
    return nb;
  }
  const dense = (s, k = 3) => voisins(s).reduce((a, v) => a + (v >= k), 0) / s.N;
  function extraction(T) {
    if (!(T >= 274 && T <= 640)) err("T entre 274 K et 640 K attendue, reçu " + T);
    const lr = x => Math.log(Th.rhoVap(x) / Th.rhoLiq(x)), h = 0.05;
    const W = -k_B * (lr(T + h) - lr(T - h)) / (1 / (T + h) - 1 / (T - h));
    return { W, Lm: Th.Lvap(T) * Th.EAU.M / N_A, kT: k_B * T, rapport: Th.rhoVap(T) / Th.rhoLiq(T) };
  }

  /* ---------- vitesses et chaleurs massiques (40.4 à 40.6) ---------- */
  const kTm = (m, T) => k_B * pos(T, "T") / pos(m, "m");
  const f1 = (vx, m, T) => Math.exp(-(fin(vx, "v") ** 2) / (2 * kTm(m, T))) / Math.sqrt(2 * Math.PI * kTm(m, T));
  const fluxAuDela = (u, m, T) => fin(u, "u") <= 0 ? 1 : Math.exp(-u * u / (2 * kTm(m, T)));
  function maxwell(v, m, T) {
    const a = kTm(m, T); if (!(fin(v, "v") >= 0)) err("v ≥ 0 attendue, reçu " + v);
    return 4 * Math.PI * v * v * Math.pow(2 * Math.PI * a, -1.5) * Math.exp(-v * v / (2 * a));
  }
  const vitesses = (m, T) => { const a = kTm(m, T); return { vp: Math.sqrt(2 * a), moy: Math.sqrt(8 * a / Math.PI), rms: Math.sqrt(3 * a) }; };
  function auDela(u, m, T) {
    const x = fin(u, "u") / Math.sqrt(2 * kTm(m, T)); if (x <= 0) return 1;
    return Pr.erfc(x) + 2 * x * Math.exp(-x * x) / Math.sqrt(Math.PI);
  }
  function isotrope(o, rand) {
    const N = o.N, m = pos(o.m, "m"), v0 = pos(o.v0, "v0"); if (!(Number.isInteger(N) && N >= 4)) err("N entier ≥ 4 attendu");
    const n = [N >> 1, N - (N >> 1)], s = { m: [m, m], v: [], chocs: 0 };
    for (const k of [0, 1]) { const v = new Float64Array(3 * n[k]); for (let i = 0; i < n[k]; i++) { const d = direction(rand); for (let x = 0; x < 3; x++) v[3 * i + x] = v0 * d[x]; } s.v[k] = v; }
    return s;
  }
  function normes(s) {
    const out = new Float64Array((s.v[0].length + s.v[1].length) / 3); let j = 0;
    for (const v of s.v) for (let i = 0; i < v.length; i += 3) out[j++] = Math.hypot(v[i], v[i + 1], v[i + 2]);
    return out;
  }

  const g = (gamma, T, r, lin, Mm) => Object.freeze({ gamma, T, r, lin, M: Mm });
  const GAMMA_MES = Object.freeze({                              // Feynman, Table 40-1, temperatures converted to K
    He: g(1.660, 93.15, 1, false, 4.0026e-3), Kr: g(1.68, 292.15, 1, false, 83.798e-3), Ar: g(1.668, 288.15, 1, false, 39.95e-3),
    H2: g(1.404, 373.15, 2, true, 2.016e-3), O2: g(1.399, 373.15, 2, true, 31.998e-3), HI: g(1.40, 373.15, 2, true, 127.912e-3),
    Br2: g(1.32, 573.15, 2, true, 159.808e-3), I2: g(1.30, 458.15, 2, true, 253.809e-3),
    NH3: g(1.310, 288.15, 4, false, 17.031e-3), C2H6: g(1.22, 288.15, 8, false, 30.069e-3) });
  function degres(r, lin, vib = true) {
    if (!(Number.isInteger(r) && r >= 1)) err("nombre d'atomes entier ≥ 1 attendu");
    if (r === 1) return 3;
    const L = r === 2 || lin;
    return 3 + (L ? 2 : 3) + (vib ? 2 * (3 * r - (L ? 5 : 6)) : 0);
  }
  const gammaDe = f => 1 + 2 / pos(f, "f");
  const fDe = gamma => { if (!(gamma > 1 && isFinite(gamma))) err("γ > 1 attendu, reçu " + gamma); return 2 / (gamma - 1); };
  const cvMolaire = gamma => R * fDe(gamma) / 2;
  const cvMassique = (gamma, Mm) => cvMolaire(gamma) / pos(Mm, "M");

  const hcK = h * c / k_B * 100;                                  // K per cm⁻¹ (second radiation constant, 1,4388 cm·K)
  const di = (we, wexe, Be, cp) => Object.freeze({ thetaV: hcK * (we - 2 * wexe), thetaR: hcK * Be, cp: Object.freeze(cp) });
  const DIATOMIQUES = Object.freeze({                            // ωe, ωexe, Be in cm⁻¹; cp: [[T (K), Cp,m (J·mol⁻¹·K⁻¹)]]
    H2: di(4401.213, 121.336, 60.8530, [[298.15, 28.84], [400, 29.18], [500, 29.26], [1000, 30.20], [1500, 32.30], [2000, 34.28]]),
    N2: di(2358.57, 14.324, 1.998241, [[300, 29.12], [400, 29.25], [500, 29.58], [1000, 32.69], [1500, 34.85], [2000, 35.98]]),
    O2: di(1580.193, 11.981, 1.4376766, [[300, 29.39], [400, 30.10], [500, 31.08], [1000, 34.86], [1500, 36.55], [2000, 37.75]]),
    HI: di(2309.014, 39.6435, 6.4263650, []),
    Br2: di(325.321, 1.0774, 0.082107, [[400, 36.81], [500, 37.15], [600, 37.33]]),
    I2: di(214.502, 0.6147, 0.037372, [[500, 37.48]]) });
  function niveaux(x, n = 6) {
    pos(x, "x"); if (!(Number.isInteger(n) && n >= 1)) err("n entier ≥ 1 attendu");
    let Z = 0; for (let k = 0; k < 4000; k++) { const w = Math.exp(-k * x); Z += w; if (w < 1e-17 * Z) break; }
    return Array.from({ length: n }, (_, k) => Math.exp(-k * x) / Z);
  }
  const xDe = (theta, T) => pos(theta, "θ") / pos(T, "T");
  const eVib = (theta, T) => { const x = xDe(theta, T); return x / Math.expm1(x); };
  const cVib = (theta, T) => { const x = xDe(theta, T); if (x > 700) return 0; const e = Math.expm1(x); return x * x * (e + 1) / (e * e); };
  function gammaDiatomique(gz, T) {
    const G = typeof gz === "string" ? DIATOMIQUES[gz] : gz; if (!G || !(G.thetaV > 0)) err("molécule inconnue : " + gz);
    const cv = 2.5 + cVib(G.thetaV, T); return { cv, gamma: 1 + 1 / cv };
  }

  /* ---------- équipartition (41.1 à 41.4) ---------- */
  const { hbar, e: qe, eps0, m_e } = C;
  const entier = (n, k) => { if (!(Number.isInteger(n) && n >= k)) err("N entier ≥ " + k + " attendu, reçu " + n); return n; };
  function oscillateurs(o, rand) {
    const N = entier(o.N, 1), m = pos(o.m, "m"), w0 = o.w0 || 0, g = pos(o.gamma, "γ"), T = pos(o.T, "T");
    if (!(w0 >= 0 && isFinite(w0))) err("ω0 ≥ 0 attendue, reçu " + o.w0);
    const s = Math.sqrt(k_B * T / m), v = new Float64Array(N);
    for (let i = 0; i < N; i++) v[i] = s * gauss(rand);
    return { N, m, w0, gamma: g, T, x: new Float64Array(N), v, t: 0 };
  }
  function langevin(s, dt, rand) {
    pos(dt, "dt");
    const w2 = s.w0 * s.w0, c1 = Math.exp(-s.gamma * dt), c2 = Math.sqrt(-Math.expm1(-2 * s.gamma * dt)) * Math.sqrt(k_B * s.T / s.m);
    for (let i = 0; i < s.N; i++) {
      let x = s.x[i], v = s.v[i];
      v -= 0.5 * dt * w2 * x; x += 0.5 * dt * v;
      v = c1 * v + c2 * gauss(rand);
      x += 0.5 * dt * v; v -= 0.5 * dt * w2 * x;
      s.x[i] = x; s.v[i] = v;
    }
    s.t += dt; return s;
  }
  function moyennes(s) { let a = 0, b = 0; for (let i = 0; i < s.N; i++) { a += s.x[i] ** 2; b += s.v[i] ** 2; } return { x2: a / s.N, v2: b / s.N }; }
  const thetaQuadratique = (I, w0, T) => k_B * pos(T, "T") / (pos(I, "I") * pos(w0, "ω0") ** 2);
  const bruitInductance = (L, w0, T) => pos(L, "L") * pos(w0, "ω0") ** 2 * k_B * pos(T, "T");
  const johnson = (Rr, T, df) => 4 * k_B * pos(T, "T") * pos(Rr, "R") * pos(df, "Δf");

  const R0 = qe * qe / (4 * Math.PI * eps0 * m_e * c * c);
  const gammaRad = (w0, r0 = R0) => 2 / 3 * pos(r0, "r0") * pos(w0, "ω0") ** 2 / c;
  const sectionEfficace = (w, w0, g, r0 = R0) => {
    const w2 = pos(w, "ω") ** 2, d = w2 - pos(w0, "ω0") ** 2;
    return 8 * Math.PI * r0 * r0 / 3 * w2 * w2 / (d * d + pos(g, "γ") ** 2 * w2);
  };
  const rayleigh = (w, T) => pos(w, "ω") ** 2 * k_B * pos(T, "T") / (Math.PI ** 2 * c * c);
  const planck = (w, T) => { const x = hbar * pos(w, "ω") / (k_B * pos(T, "T")); return x > 700 ? 0 : hbar * w ** 3 / (Math.PI ** 2 * c * c * Math.expm1(x)); };
  const eMoyenne = (w, T) => { const x = hbar * pos(w, "ω") / (k_B * pos(T, "T")); return x > 700 ? 0 : hbar * w / Math.expm1(x); };
  function simpson(f, a, b, n) {                                   // n even
    const hh = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * hh);
    return s * hh / 3;
  }
  function bilan(w0, T, I, o = {}) {
    pos(T, "T"); if (typeof I !== "function") err("I(ω) doit être une fonction");
    const g = gammaRad(w0, o.r0), r0 = o.r0 || R0, K = o.largeurs || 2000, E = o.E === undefined ? k_B * T : o.E;
    const lo = Math.max(w0 * 1e-9, w0 - K * g), hi = w0 + K * g;
    /* the peak is narrow: integrate in u = atan(2(ω − ω0)/γ), where the Lorentzian is flat */
    const ua = Math.atan(2 * (lo - w0) / g), ub = Math.atan(2 * (hi - w0) / g);
    const f = uu => { const w = w0 + g / 2 * Math.tan(uu), dw = g / 2 / Math.cos(uu) ** 2; return I(w) * sectionEfficace(w, w0, g, r0) * dw; };
    const absorbe = simpson(f, ua, ub, 4000);
    return { absorbe, emis: 3 * g * E, gamma: g, Q: w0 / g };
  }
  function energieJusqua(wmax, T, loi = "rayleigh") {
    pos(wmax, "ωmax"); pos(T, "T");
    if (loi === "rayleigh") return k_B * T * wmax ** 3 / (3 * Math.PI ** 2 * c ** 3);
    if (loi !== "planck") err("loi « rayleigh » ou « planck » attendue, reçu " + loi);
    const wT = k_B * T / hbar, top = Math.min(wmax, 60 * wT);
    return simpson(w => w > 0 ? planck(w, T) / c : 0, 0, top, 4000);
  }
  function serie(x, n) {
    pos(x, "x"); entier(n, 1);
    let num = 0, den = 0; for (let k = 0; k < n; k++) { const w = Math.exp(-k * x); num += k * w; den += w; }
    return num / den;
  }
  const xPic = (() => { let x = 3; for (let i = 0; i < 50; i++) x -= (3 * -Math.expm1(-x) - x) / (3 * Math.exp(-x) - 1); return x; })();

  function brownien(o, rand) {
    const N = entier(o.N, 1), a = pos(o.a, "a"), rho = pos(o.rho, "ρ"), T = pos(o.T, "T"), dim = o.dim || 2;
    if (![1, 2, 3].includes(dim)) err("dimension 1, 2 ou 3 attendue");
    const m = rho * 4 / 3 * Math.PI * a ** 3, mu = pos(o.mu, "μ"), s = Math.sqrt(k_B * T / m);
    const x = [], v = [];
    for (let d = 0; d < dim; d++) { x.push(new Float64Array(N)); const w = new Float64Array(N); for (let i = 0; i < N; i++) w[i] = s * gauss(rand); v.push(w); }
    return { N, dim, m, mu, tau: m / mu, T, x, v, t: 0 };
  }
  function pasExact(s, dt, rand) {
    pos(dt, "dt");
    const g = 1 / s.tau, y = g * dt, s2 = k_B * s.T / s.m, em = -Math.expm1(-y), e1 = Math.exp(-y);
    const vv = s2 * -Math.expm1(-2 * y);
    /* Var Δx = (s²/γ²)(2y − 3 + 4e^(−y) − e^(−2y)); for small y the series 2y³/3 − y⁴/2 avoids the cancellation */
    const px = y < 1e-3 ? 2 * y ** 3 / 3 - y ** 4 / 2 + 7 * y ** 5 / 30 : 2 * y - 3 + 4 * e1 - Math.exp(-2 * y);
    const vx = s2 / (g * g) * px, cxv = s2 / g * em * em;
    const a = cxv / vv, b = Math.sqrt(Math.max(0, vx - a * cxv)), sv = Math.sqrt(vv);
    for (let d = 0; d < s.dim; d++) {
      const X = s.x[d], V = s.v[d];
      for (let i = 0; i < s.N; i++) {
        const dV = sv * gauss(rand), dX = a * dV + b * gauss(rand);
        X[i] += V[i] * em / g + dX; V[i] = V[i] * e1 + dV;
      }
    }
    s.t += dt; return s;
  }
  const msd = (t, T, mu, tau) => { if (!(t >= 0)) err("t ≥ 0 attendu"); pos(tau, "τ"); return 2 * k_B * pos(T, "T") / pos(mu, "μ") * (t + tau * Math.expm1(-t / tau)); };
  function perrin(depl, dt, mu, T) {
    const n = depl.length; if (n < 2) err("au moins deux déplacements");
    let s = 0; for (let i = 0; i < n; i++) s += depl[i] * depl[i];
    const kB = pos(mu, "μ") * s / n / (2 * pos(dt, "dt") * pos(T, "T"));
    return { kB, NA: R / kB, rel: Math.sqrt(2 / n) };
  }

  /* ---------- applications de la théorie cinétique (42.1 à 42.5) ---------- */
  const frappe = (n, m, T) => pos(n, "n") * Math.sqrt(k_B * pos(T, "T") / (2 * Math.PI * pos(m, "m")));
  function hertzKnudsen(P, m, T, alpha = 1) {
    if (!(alpha > 0 && alpha <= 1)) err("0 < α ≤ 1 attendu, reçu " + alpha);
    return alpha * pos(P, "P") / Math.sqrt(2 * Math.PI * pos(m, "m") * k_B * pos(T, "T"));
  }
  function evaporationEau(T, alpha = 1) {
    if (!(T >= Th.EAU.Tt && T < Th.EAU.Tc)) err("T entre 273,16 K et 647 K attendu, reçu " + T);
    const m = Th.EAU.M / N_A, p = Th.psat(T), rho = Th.rhoLiq(T), Jn = hertzKnudsen(p, m, T, alpha), J = Jn * m;
    return { p, Jn, J, recul: J / rho, q: J * Th.Lvap(T), nVa: p / (k_B * T) * m / rho };
  }
  const A_RICHARDSON = 4 * Math.PI * m_e * qe * k_B * k_B / h ** 3;
  const CATHODES = Object.freeze({ W: Object.freeze({ W: 4.5, A: 60e4 }), ThW: Object.freeze({ W: 2.63, A: 3.0e4 }), LaB6: Object.freeze({ W: 2.66, A: 29e4 }) });
  const richardson = (T, W, A = A_RICHARDSON) => pos(A, "A") * T * T * Math.exp(-pos(W, "W") * qe / (k_B * pos(T, "T")));
  function droiteRichardson(Ts, Js) {
    const n = Ts.length; if (n < 2 || Js.length !== n) err("au moins deux points, autant de T que de J");
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) { const x = 1 / pos(Ts[i], "T"), y = Math.log(pos(Js[i], "J") / (Ts[i] * Ts[i])); sx += x; sy += y; sxx += x * x; sxy += x * y; }
    const d = n * sxx - sx * sx; if (!(d > 0)) err("températures toutes égales");
    const pente = (n * sxy - sx * sy) / d, b = (sy - pente * sx) / n;
    return { W: -pente * k_B / qe, A: Math.exp(b) };
  }
  const W_H = 13.598433;
  const saha = (T, W, g = 1) => pos(g, "g") * lambdaTh(m_e, T) ** -3 * Math.exp(-pos(W, "W") * qe / (k_B * T));
  function fractionIonisee(n, T, W, g = 1) {
    const s = saha(T, W, g) / pos(n, "n");
    return s === 0 ? 0 : 2 / (1 + Math.sqrt(1 + 4 / s));               // root of f² + s f − s = 0, written without cancellation
  }
  function tDemi(n, W, g = 1) {
    let a = Math.log(100), b = Math.log(1e7);
    if (fractionIonisee(n, Math.exp(a), W, g) > 0.5 || fractionIonisee(n, Math.exp(b), W, g) < 0.5) err("f = 1/2 hors de 100 K à 10⁷ K");
    for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (fractionIonisee(n, Math.exp(m), W, g) < 0.5) a = m; else b = m; }
    return Math.exp((a + b) / 2);
  }
  const arrhenius = (A, Ea, T) => A * Math.exp(-Ea / (R * pos(T, "T")));
  const facteurDix = (Ea, T, dT = 10) => Math.exp(Ea / R * (1 / pos(T, "T") - 1 / (T + pos(dT, "dT"))));
  function reaction(o) {
    const { Ea, dE = 0, T, A = 1, Ar = A, cat = 0 } = o;
    if (!(Ea >= 0) || !(cat >= 0) || cat > Ea) err("0 ≤ cat ≤ Ea attendu");
    const e = Ea - cat; if (e - dE < 0) err("barrière sous les produits : Ea − cat ≥ dE attendu");
    const kf = arrhenius(A, e, T), kr = arrhenius(Ar, e - dE, T);
    return { kf, kr, K: A / Ar * Math.exp(-dE / (R * T)) };
  }
  function einstein(w, T) {
    const x = hbar * pos(w, "ω") / (k_B * pos(T, "T")), AsurB = hbar * w ** 3 / (Math.PI ** 2 * c * c), I = planck(w, T);
    const nbar = x > 700 ? 0 : 1 / Math.expm1(x);
    return { x, pop: Math.exp(-x), nbar, AsurB, I, stimSpont: I / AsurB, ecart: x > 700 ? 0 : (I * Math.exp(x) - AsurB - I) / AsurB };
  }
  function temperatureDe(r, w) {
    pos(r, "N_m/N_n"); pos(w, "ω");
    return r === 1 ? Infinity : -hbar * w / (k_B * Math.log(r));
  }

  /* ---------- collisions, libre parcours, dérive (43.1 à 43.15) ---------- */
  const survie = (t, tau) => { if (!(fin(t, "t") >= 0)) err("t ≥ 0 attendu"); return Math.exp(-t / pos(tau, "τ")); };
  function vols(o, rand) {
    const N = o.N, tau = pos(o.tau, "τ"), p = o.p, duree = pos(o.duree, "durée");
    if (!(Number.isInteger(N) && N >= 1)) err("N entier ≥ 1 attendu");
    if (!(p > 0 && p <= 1)) err("p = dt/τ dans ]0 ; 1] attendu, reçu " + p);
    const dt = p * tau, K = Math.ceil(duree / dt); if (N * K > 5e7) err("trop de pas : " + N * K);
    const premier = new Float64Array(N).fill(Infinity), jusqua = new Float64Array(N).fill(NaN), depuis = new Float64Array(N).fill(NaN), libres = [];
    for (let i = 0; i < N; i++) {
      const tObs = duree * (0.25 + 0.5 * rand()); let last = -1;
      for (let k = 1; k <= K; k++) {
        if (!(rand() < p)) continue;
        const t = k * dt;
        if (last < 0) premier[i] = t; else libres.push(t - last);
        if (t > tObs && isNaN(jusqua[i])) { jusqua[i] = t - tObs; depuis[i] = last < 0 ? NaN : tObs - last; }
        last = t;
      }
    }
    return { dt, premier, libres: Float64Array.from(libres), jusqua, depuis };
  }
  function attente(p, tau) {
    if (!(p > 0 && p <= 1)) err("p = dt/τ dans ]0 ; 1] attendu, reçu " + p);
    pos(tau, "τ"); return { libre: tau, jusqua: tau * (1 - p / 2), contenant: tau * (2 - p) };
  }
  const SIGMA_C = Object.freeze({ H2: 0.27e-18, He: 0.21e-18, N2: 0.43e-18, O2: 0.40e-18, Ar: 0.36e-18, CO2: 0.52e-18 });
  const libreParcours = (n, sigma, id) => 1 / ((id ? Math.SQRT2 : 1) * pos(n, "n") * pos(sigma, "σ"));
  function vRel(v, m, T) {
    const vp = Math.sqrt(2 * kTm(m, T)), x = fin(v, "v") / vp; if (x < 0) err("v ≥ 0 attendue");
    const rp = Math.sqrt(Math.PI);
    if (x >= 3) return vp * (Math.exp(-x * x) / rp + (x + 1 / (2 * x)) * Pr.erf(x));
    let t = 1, s = 1;                                                   // erf(x) = (2/√π) x s: the series, exact to 1e−15 below x = 3,
    for (let k = 1; k < 80 && Math.abs(t) > 1e-18; k++) { t *= -x * x / k; s += t / (2 * k + 1); }   // where 1 − erfc loses digits
    return vp * (Math.exp(-x * x) / rp + (2 / rp) * (x * x + 0.5) * s);
  }
  function parcours(g, P, T) {
    const sigma = SIGMA_C[g], Mm = M[g]; if (!sigma || !Mm) err("gaz inconnu : " + g);
    const n = densite(P, T), l = libreParcours(n, sigma, true), vmoy = vitesses(Mm / N_A, T).moy, d = Math.sqrt(sigma / Math.PI);
    return { n, sigma, d, espacement: Math.cbrt(1 / n), l, lCible: libreParcours(n, sigma, false), vmoy, tau: l / vmoy, nu: vmoy / l, nd3: n * d ** 3 };
  }
  const vDerive = (F, tau, m) => fin(F, "F") * pos(tau, "τ") / pos(m, "m");
  const mobilite = (tau, m) => pos(tau, "τ") / pos(m, "m");
  const deriveTheorie = (Ms, m, regulier) => (regulier ? 0.5 : 1) + pos(Ms, "M") / pos(m, "m");
  function derive(o, rand) {
    const Ms = pos(o.M, "M"), m = pos(o.m, "m"), T = pos(o.T, "T"), F = fin(o.F, "F"), tau = pos(o.tau, "τ"), K = o.chocs || 2e5;
    if (!(Number.isInteger(K) && K >= 20 && K <= 5e6)) err("chocs entier de 20 à 5 × 10⁶ attendu");
    const nb = o.blocs === undefined ? 20 : o.blocs;
    if (!(Number.isInteger(nb) && nb >= 2 && nb <= K)) err("blocs entier de 2 au nombre de chocs attendu");
    const sS = Math.sqrt(k_B * T / Ms), sg = Math.sqrt(k_B * T / m), a = F / Ms, per = Math.floor(K / nb);
    const v = [sS * gauss(rand), sS * gauss(rand), sS * gauss(rand)], suivi = [];
    const sx = new Float64Array(nb), st = new Float64Array(nb); let X = 0, t = 0, next = 1;
    for (let k = 0; k < nb * per; k++) {
      const d = o.regulier ? tau : -tau * Math.log(1 - rand()), b = (k / per) | 0;
      const ix = v[0] * d + a * d * d / 2;                           // exact ∫ vx dt over the flight
      sx[b] += ix; st[b] += d; X += ix; t += d; v[0] += a * d;
      if (k + 1 >= next) { suivi.push([k + 1, X / t]); next = Math.ceil(next * 1.2589); }
      if (o.neuf) { v[0] = sS * gauss(rand); v[1] = sS * gauss(rand); v[2] = sS * gauss(rand); continue; }
      const w = [sg * gauss(rand), sg * gauss(rand), sg * gauss(rand)], n = direction(rand);
      const g = Math.hypot(v[0] - w[0], v[1] - w[1], v[2] - w[2]), f = m / (Ms + m);
      for (let i = 0; i < 3; i++) v[i] = (Ms * v[i] + m * w[i]) / (Ms + m) + f * g * n[i];
    }
    const vb = Array.from(sx, (x, i) => x / st[i]), V = sx.reduce((s, x) => s + x, 0) / st.reduce((s, x) => s + x, 0);
    const moy = vb.reduce((s, x) => s + x, 0) / nb, e = Math.sqrt(vb.reduce((s, x) => s + (x - moy) ** 2, 0) / (nb - 1) / nb);
    return { v: V, err: e, unite: a * tau, vth: sS, suivi, blocs: { x: sx, t: st } };
  }

  /* ---------- conductivité ionique, diffusion, conductivité thermique (43.16 à 43.43) ---------- */
  const conductiviteIonique = (n, q, mu) => pos(n, "n") * fin(q, "q") ** 2 * pos(mu, "μ");
  function chambre(o) {
    const q = pos(o.q, "q"), al = pos(o.alpha, "α"), b = pos(o.b, "b"), A = pos(o.A, "A"), V = fin(o.V, "V");
    if (V < 0) err("V ≥ 0 attendue");
    const u = (pos(o.kp, "k₊") + pos(o.kn, "k₋")) * V / b, n0 = Math.sqrt(q / al);
    const n = 2 * q * b / (u + Math.sqrt(u * u + 4 * al * q * b * b));           // root of α b n² + u n − q b = 0, no cancellation
    return { n, n0, I: C.e * n * u * A, ohm: C.e * n0 * u * A, sat: C.e * q * b * A, frac: al * n * n / q };
  }
  const dLibre = (l, v) => pos(l, "l") * pos(v, "v") / 3;
  const dEinstein = (mu, T) => pos(mu, "μ") * k_B * pos(T, "T");
  function einsteinSim(o, rand) {
    const Ms = pos(o.M, "M"), m = pos(o.m, "m"), T = pos(o.T, "T"), tau = pos(o.tau, "τ"), K = o.chocs || 2e5;
    const th = o.neuf ? (o.regulier ? 0.5 : 1) : deriveTheorie(Ms, m, o.regulier);
    const per = Math.max(50, Math.ceil(30 * (o.neuf ? 1 : 1 + Ms / m))), nb = Math.floor(K / per);
    if (nb < 20) err("au moins " + 20 * per + " chocs attendus pour M/m = " + Ms / m);
    const base = { M: Ms, m, T, tau, regulier: !!o.regulier, neuf: !!o.neuf };
    const libre = derive(Object.assign({}, base, { F: 0, chocs: nb * per, blocs: nb }), rand);
    const { x, t } = libre.blocs; let sx2 = 0, st = 0;
    for (let i = 0; i < nb; i++) { sx2 += x[i] * x[i]; st += t[i]; }
    const D = sx2 / (2 * st);
    const F = 0.2 * Math.sqrt(k_B * T / Ms) * Ms / (tau * th);                   // drift 0,2 × thermal speed: a weak force
    const pousse = derive(Object.assign({}, base, { F, chocs: K }), rand);
    const mu = pousse.v / F, errMu = pousse.err / F, errD = D * Math.sqrt(2 / nb), rapport = D / (mu * k_B * T);
    return { D, errD, mu, errMu, rapport, errRapport: rapport * Math.hypot(errD / D, errMu / mu), th, lv3: 8 / (3 * Math.PI), unite: k_B * T * tau / Ms };
  }
  const KAPPA_MES = Object.freeze({ He: 0.1567, Ar: 0.0179, N2: 0.0260, O2: 0.0263, H2: 0.1869 });
  const kappaLibre = (n, l, v, gamma) => {
    if (!(gamma > 1 && isFinite(gamma))) err("γ > 1 attendu, reçu " + gamma);
    return k_B * pos(n, "n") * pos(l, "l") * pos(v, "v") / (gamma - 1);
  };
  const ATOMES = Object.freeze({ He: 1, Ar: 1, N2: 2, O2: 2, H2: 2 });
  function kappaGaz(g, T, P = 1e5) {
    if (!ATOMES[g]) err("gaz sans γ simple : " + g + " (He, Ar, N2, O2, H2)");
    const gamma = gammaDe(degres(ATOMES[g], true, false)), p = parcours(g, P, T);
    return { k42: kappaLibre(p.n, p.l, p.vmoy, gamma), k43: k_B * p.vmoy / ((gamma - 1) * p.sigma), gamma, l: p.l, vmoy: p.vmoy, mes: KAPPA_MES[g] };
  }
  function conductionPlaques(o) {
    const g = o.g, L = pos(o.L, "L"), P = pos(o.P, "P"), T = pos(o.T, "T");
    if (!ATOMES[g]) err("gaz sans γ simple : " + g + " (He, Ar, N2, O2, H2)");
    const gamma = gammaDe(degres(ATOMES[g], true, false)), p = parcours(g, P, T), kappa = o.kappa === undefined ? KAPPA_MES[g] : pos(o.kappa, "κ");
    const hc = kappa / L, hfm = frappe(p.n, M[g] / N_A, T) * k_B * (gamma + 1) / (2 * (gamma - 1));
    return { hc, hfm, h: 1 / (1 / hc + 1 / hfm), Kn: p.l / L, l: p.l };
  }

  /* ---------- cliquet et irréversibilité (46) ---------- */
  const fini = (v, n) => { if (!(typeof v === "number" && isFinite(v))) err(n + " fini attendu, reçu " + v); return v; };
  const entre01 = (v, n) => { if (!(v > 0 && v < 1)) err(n + " dans ]0, 1[ attendu, reçu " + v); return v; };
  /* dent de scie de période 1 : U monte de 0 à eps sur [0, a[, redescend sur [a, 1[ ; énergies en k_B T */
  function dent(x, eps, a) {
    const y = x - Math.floor(x);
    return y < a ? { U: eps * y / a, F: -eps / a } : { U: eps * (1 - y) / (1 - a), F: eps / (1 - a) };
  }
  function cliquetBrownien(o, rand) {
    const N = o.N, eps = fini(o.eps, "ε"), a = entre01(o.a, "a"), f = fini(o.f || 0, "f"), dt = pos(o.dt || 1e-4, "dt");
    if (!(Number.isInteger(N) && N >= 1)) err("N entier ≥ 1 attendu");
    if (eps < 0) err("ε ≥ 0 attendu");
    const x = new Float64Array(N), m = new Float64Array(N);
    for (let i = 0; i < N; i++) x[i] = a * rand();                     // départ sur la montée, au-dessus du creux 0
    return { N, eps, a, f, dt, x, m, t: 0, avant: 0, arriere: 0 };
  }
  /* un saut compte quand la roue atteint le creux suivant (x = m ± 1) depuis le dernier creux m atteint : les allers-retours
     au sommet d'une dent ne comptent pas */
  function pasCliquet(s, n, rand) {
    const q = Math.sqrt(2 * s.dt);
    for (let k = 0; k < n; k++) for (let i = 0; i < s.N; i++) {
      const x0 = s.x[i], x1 = x0 + (dent(x0, s.eps, s.a).F - s.f) * s.dt + q * gauss(rand);
      while (x1 >= s.m[i] + 1) { s.m[i]++; s.avant++; }
      while (x1 <= s.m[i] - 1) { s.m[i]--; s.arriere++; }
      s.x[i] = x1;
    }
    s.t += n * s.dt;
    return s;
  }
  function vitesseCliquet(eps, a, f, n = 400) {
    fini(eps, "ε"); entre01(a, "a"); fini(f, "f");
    const F0 = -f; let I = 0;
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) / n, Ux = dent(x, eps, a).U;
      for (let j = 0; j < n; j++) { const y = (j + 0.5) / n; I += Math.exp(Ux - dent(x - y, eps, a).U - F0 * y); }
    }
    I /= n * n;
    return -Math.expm1(-F0) / I;
  }
  function cliquetMoteur(o) {
    const eps = pos(o.eps, "ε"), L = fini(o.L, "L"), th = pos(o.theta, "θ"), T1 = pos(o.T1, "T1"), T2 = pos(o.T2, "T2");
    const tau = pos(o.tau || 1, "τ"), K = o.fuite === undefined ? 0 : o.fuite;
    if (!(K >= 0 && isFinite(K))) err("fuite ≥ 0 attendue, reçu " + K);
    const avant = Math.exp(-(eps + L * th) / (k_B * T1)) / tau, arriere = Math.exp(-eps / (k_B * T2)) / tau, net = avant - arriere;
    const P = L * th * net, Q1 = (eps + L * th) * net + K * (T1 - T2), Q2 = eps * net + K * (T1 - T2);
    return { avant, arriere, omega: th * net, P, Q1, Q2, eta: P > 0 && Q1 > 0 ? P / Q1 : null, etaPas: L * th / (eps + L * th),
      carnot: 1 - T2 / T1, Larret: eps * (T1 / T2 - 1) / th, Sc: Q2 / T2 - Q1 / T1 };
  }
  const omega461 = (eps, L, theta, T, tau = 1) =>
    (pos(theta, "θ") / pos(tau, "τ")) * Math.exp(-pos(eps, "ε") / (k_B * pos(T, "T"))) * Math.expm1(-fini(L, "L") * theta / (k_B * T));
  function sautsCliquet(o, n, rand) {
    const m = cliquetMoteur(o), r = m.avant + m.arriere, th = o.theta, Lt = o.L * th;
    let t = 0, avant = 0, arriere = 0;
    for (let k = 0; k < n; k++) { let u = 0; while (u === 0) u = rand(); t -= Math.log(u) / r; if (rand() < m.avant / r) avant++; else arriere++; }
    const net = avant - arriere;
    return { t, avant, arriere, angle: net * th, W: net * Lt, Q1: net * (o.eps + Lt), Q2: net * o.eps };
  }

  /* gaz de disques mous (WCA), unités réduites σ = ε = m = 1, temps √(mσ²/ε), parois molles en 0 et L ; Verlet en positions,
     X = Q x stocké, entier : chaque incrément arrondi à l'entier (bit-réversible, Levesque et Verlet 1993) */
  const RC2 = Math.pow(2, 1 / 3);
  function forcesGaz(s) {
    const { N, Q, L, X, Y, ax, ay } = s;
    ax.fill(0); ay.fill(0);
    const paroi = d => { if (d * d >= RC2) return 0; const i2 = 1 / (d * d), i6 = i2 * i2 * i2; return 24 * i6 * (2 * i6 - 1) / d; };
    for (let i = 0; i < N; i++) {
      const xi = X[i] / Q, yi = Y[i] / Q;
      ax[i] += paroi(xi) - paroi(L - xi); ay[i] += paroi(yi) - paroi(L - yi);
      for (let j = i + 1; j < N; j++) {
        const dx = xi - X[j] / Q, dy = yi - Y[j] / Q, r2 = dx * dx + dy * dy;
        if (r2 >= RC2) continue;
        const i2 = 1 / r2, i6 = i2 * i2 * i2, g = 24 * i6 * (2 * i6 - 1) * i2;
        ax[i] += g * dx; ay[i] += g * dy; ax[j] -= g * dx; ay[j] -= g * dy;
      }
    }
  }
  function gaz(o, rand) {
    const N = o.N, L = pos(o.L, "L"), T = pos(o.T || 1, "T"), dt = pos(o.dt || 0.005, "dt"), Q = pos(o.Q || 2 ** 24, "Q"), entier = !!o.entier;
    if (!(Number.isInteger(N) && N >= 2)) err("N entier ≥ 2 attendu");
    const rc = Math.sqrt(RC2), nc = Math.ceil(Math.sqrt(N)), pas = (L - 2 * rc) / (nc - 1);   // aucun contact au départ : U = 0
    if (!(pas >= rc)) err("trop dense : (L − 2,24 σ)/(⌈√N⌉ − 1) ≥ 1,12 σ attendu, reçu " + pas);
    const F = n => new Float64Array(n);
    const s = { N, L, T, dt, Q, entier, X: F(N), Y: F(N), Xp: F(N), Yp: F(N), ax: F(N), ay: F(N), couleur: new Uint8Array(N), pas: 0 };
    const rd = entier ? Math.round : v => v;
    for (let i = 0; i < N; i++) {
      const x = rc + (i % nc) * pas, y = rc + Math.floor(i / nc) * pas;
      s.X[i] = rd(x * Q); s.Y[i] = rd(y * Q); s.couleur[i] = x < L / 2 ? 0 : 1;
    }
    forcesGaz(s);
    const sq = Math.sqrt(T);
    for (let i = 0; i < N; i++) {
      const vx = sq * gauss(rand), vy = sq * gauss(rand);
      s.Xp[i] = s.X[i] - rd((vx * dt - 0.5 * s.ax[i] * dt * dt) * Q); s.Yp[i] = s.Y[i] - rd((vy * dt - 0.5 * s.ay[i] * dt * dt) * Q);
    }
    return s;
  }
  function evoluer(s, n) {
    const c = s.dt * s.dt * s.Q, rd = s.entier ? Math.round : v => v;
    for (let k = 0; k < n; k++) {
      forcesGaz(s);
      for (let i = 0; i < s.N; i++) {
        const x = 2 * s.X[i] - s.Xp[i] + rd(s.ax[i] * c), y = 2 * s.Y[i] - s.Yp[i] + rd(s.ay[i] * c);
        s.Xp[i] = s.X[i]; s.Yp[i] = s.Y[i]; s.X[i] = x; s.Y[i] = y;
      }
      s.pas++;
    }
    return s;
  }
  function renverser(s) { [s.X, s.Xp] = [s.Xp, s.X]; [s.Y, s.Yp] = [s.Yp, s.Y]; s.pas = -s.pas; return s; }
  function copieGaz(s) {
    const c = Object.assign({}, s);
    for (const k of ["X", "Y", "Xp", "Yp", "ax", "ay", "couleur"]) c[k] = s[k].slice();
    return c;
  }
  const positionsGaz = s => ({ x: Array.from(s.X, v => v / s.Q), y: Array.from(s.Y, v => v / s.Q) });
  function ecartGaz(a, b) {
    let e = 0;
    for (let i = 0; i < a.N; i++) e += ((a.X[i] - b.X[i]) ** 2 + (a.Y[i] - b.Y[i]) ** 2);
    return Math.sqrt(e / a.N) / a.Q;
  }
  function energieGaz(s) {                                         // vitesses au pas courant, centrées : (X⁺ − X⁻)/(2 dt) ; ici (X − Xp)/dt
    let K = 0, U = 0;
    const L = s.L, Q = s.Q, v = d => (d * d >= RC2 ? 0 : 4 * (d ** -12 - d ** -6) + 1);
    for (let i = 0; i < s.N; i++) {
      K += 0.5 * (((s.X[i] - s.Xp[i]) / (Q * s.dt)) ** 2 + ((s.Y[i] - s.Yp[i]) / (Q * s.dt)) ** 2);
      const xi = s.X[i] / Q, yi = s.Y[i] / Q;
      U += v(xi) + v(L - xi) + v(yi) + v(L - yi);
      for (let j = i + 1; j < s.N; j++) { const r = Math.hypot(xi - s.X[j] / Q, yi - s.Y[j] / Q); U += v(r); }
    }
    return { K, U, E: K + U };
  }
  /* mélange : par case d'une grille m × m, entropie de mélange idéale n H(b/n) (en k_B), somme sur les cases */
  function melangeGaz(s, m = 4) {
    const nb = new Float64Array(m * m), n = new Float64Array(m * m), w = s.L / m;
    let gauche = 0;
    for (let i = 0; i < s.N; i++) {
      const x = s.X[i] / s.Q, y = s.Y[i] / s.Q, cx = Math.min(m - 1, Math.max(0, Math.floor(x / w))), cy = Math.min(m - 1, Math.max(0, Math.floor(y / w)));
      n[cx + m * cy]++; if (s.couleur[i] === 0) { nb[cx + m * cy]++; if (x < s.L / 2) gauche++; }
    }
    let S = 0;
    for (let c = 0; c < m * m; c++) if (n[c] > 0) S += n[c] * entropieMelange([nb[c] / n[c], 1 - nb[c] / n[c]]);
    let n0 = 0; for (let i = 0; i < s.N; i++) if (s.couleur[i] === 0) n0++;
    return { S, Smax: s.N * entropieMelange([n0 / s.N, 1 - n0 / s.N]), gauche: gauche / n0 };
  }
  function entropieMelange(x) {
    let s = 0, t = 0;
    for (const v of x) { if (!(v >= 0 && v <= 1)) err("fraction dans [0, 1] attendue, reçu " + v); t += v; if (v > 0) s -= v * Math.log(v); }
    if (Math.abs(t - 1) > 1e-9) err("fractions de somme 1 attendues, somme " + t);
    return s;
  }

  /* ordre et entropie : compter les façons */
  function lnC(N, n) {
    if (!(Number.isInteger(N) && Number.isInteger(n) && n >= 0 && n <= N)) err("0 ≤ n ≤ N entiers attendus");
    if (N <= 1e6) return Pr.lnFact(N) - Pr.lnFact(n) - Pr.lnFact(N - n);
    const st = k => k === 0 ? 0 : k * Math.log(k) - k + 0.5 * Math.log(2 * Math.PI * k) + 1 / (12 * k);   // Stirling, erreur < 1/(360 k³)
    return st(N) - st(n) - st(N - n);
  }
  function queue(N, k) {                                           // P(n ≥ k), n binomial (N, 1/2), somme exacte en logarithmes
    if (!(Number.isInteger(N) && N >= 1 && N <= 1e6)) err("N entier dans [1, 10⁶] attendu");
    if (k <= 0) return 1; if (k > N) return 0;
    let m = -Infinity; const t = [];
    for (let n = Math.ceil(k); n <= N; n++) { const v = lnC(N, n) - N * Math.LN2; t.push(v); if (v > m) m = v; }
    return Math.exp(m) * t.reduce((a, v) => a + Math.exp(v - m), 0);
  }
  const ecartRelatif = f => { if (!(f >= 0 && f <= 1)) err("f dans [0, 1] attendu"); const h = v => v > 0 ? v * Math.log(2 * v) : 0; return h(f) + h(1 - f); };
  function ehrenfest(N, n0 = N) {
    if (!(Number.isInteger(N) && N >= 1 && Number.isInteger(n0) && n0 >= 0 && n0 <= N)) err("N ≥ 1 et 0 ≤ n0 ≤ N entiers attendus");
    return { N, n: n0, pas: 0, retours: 0 };
  }
  function pasEhrenfest(s, k, rand) {
    for (let i = 0; i < k; i++) { if (rand() * s.N < s.n) s.n--; else s.n++; s.pas++; if (s.n === s.N) s.retours++; }
    return s;
  }
  const retourMoyen = (N, n) => Math.exp(N * Math.LN2 - lnC(N, n));   // Kac : 2^N / C(N, n) pas
  const landauer = T => k_B * pos(T, "T") * Math.LN2;

  /* ---------- gaz réels (X.gaz_reels.1 à 4) ---------- */
  /* NIST Chemistry WebBook, SRD 69 (fluid.cgi, 2026-11-04) : points critiques des équations de référence, Pa et mol·m⁻³ */
  const CRITIQUE = Object.freeze({
    N2: Object.freeze({ Tc: 126.192, Pc: 3.3958e6, rhoc: 11183.9 }),
    Ar: Object.freeze({ Tc: 150.687, Pc: 4.863e6, rhoc: 13407.4 }),
    CO2: Object.freeze({ Tc: 304.1282, Pc: 7.3773e6, rhoc: 10624.9 }),
  });
  const ISO_P = [0.1, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 7.5, 8, 8.5, 9, 10, 12, 14, 16, 18, 20, 25, 30];   // MPa
  const ISO = Object.freeze({   // NIST (Span 2000, Tegeler 1999, Span-Wagner 1996), on ISO_P: [Z], [α T], [χ_T P], [Cp − Cv (J·mol⁻¹·K⁻¹)]
    N2: Object.freeze({
      150: [[0.99423, 0.97082, 0.94076, 0.90977, 0.87776, 0.81049, 0.73895, 0.66492, 0.59545, 0.54505, 0.53062, 0.52303, 0.52099, 0.52315, 0.53587, 0.57851, 0.6305, 0.6859, 0.74259, 0.7997, 0.94204, 1.0823],
        [1.018, 1.098, 1.211, 1.345, 1.503, 1.921, 2.538, 3.418, 4.392, 4.747, 4.558, 4.227, 3.854, 3.496, 2.903, 2.154, 1.733, 1.468, 1.286, 1.153, 0.9343, 0.8006],
        [1.012, 1.031, 1.065, 1.104, 1.148, 1.257, 1.397, 1.554, 1.631, 1.466, 1.306, 1.14, 0.9913, 0.8673, 0.6872, 0.4928, 0.3981, 0.3439, 0.3092, 0.2853, 0.2492, 0.2297],
        [8.524, 9.435, 10.77, 12.39, 14.35, 19.79, 28.32, 41.56, 58.53, 69.64, 70.17, 68.17, 64.91, 61.31, 54.64, 45.28, 39.56, 35.75, 33.03, 30.96, 27.44, 25.16]],
      200: [[0.99786, 0.98932, 0.97877, 0.96837, 0.95815, 0.93835, 0.9196, 0.90216, 0.88634, 0.87241, 0.86626, 0.86068, 0.85571, 0.85138, 0.84468, 0.83937, 0.8444, 0.85827, 0.8791, 0.90516, 0.98472, 1.0752],
        [1.008, 1.042, 1.085, 1.13, 1.177, 1.273, 1.373, 1.474, 1.573, 1.665, 1.708, 1.747, 1.783, 1.814, 1.862, 1.898, 1.861, 1.777, 1.67, 1.559, 1.311, 1.124],
        [1.004, 1.011, 1.021, 1.032, 1.042, 1.062, 1.079, 1.092, 1.101, 1.103, 1.102, 1.098, 1.092, 1.085, 1.063, 0.9997, 0.9192, 0.8353, 0.7573, 0.6889, 0.5607, 0.4797],
        [8.416, 8.834, 9.384, 9.966, 10.58, 11.91, 13.36, 14.92, 16.56, 18.23, 19.07, 19.89, 20.69, 21.47, 22.9, 25.14, 26.46, 26.97, 26.93, 26.56, 25.08, 23.59]],
      300: [[0.99983, 0.99915, 0.9984, 0.99777, 0.99726, 0.99657, 0.99636, 0.99662, 0.99737, 0.9986, 0.9994, 1.0003, 1.0014, 1.0025, 1.0052, 1.012, 1.0207, 1.0311, 1.0432, 1.0568, 1.0966, 1.143],
        [1.002, 1.012, 1.024, 1.036, 1.048, 1.07, 1.091, 1.11, 1.128, 1.145, 1.152, 1.159, 1.166, 1.172, 1.183, 1.199, 1.208, 1.211, 1.207, 1.198, 1.159, 1.106],
        [1.0, 1.001, 1.001, 1.002, 1.002, 1.001, 0.9999, 0.9975, 0.9941, 0.9897, 0.9871, 0.9843, 0.9813, 0.978, 0.9708, 0.954, 0.9344, 0.9125, 0.889, 0.8645, 0.8021, 0.7436],
        [8.353, 8.506, 8.699, 8.892, 9.086, 9.474, 9.861, 10.24, 10.62, 10.99, 11.18, 11.36, 11.53, 11.71, 12.05, 12.69, 13.26, 13.77, 14.22, 14.59, 15.27, 15.65]],
      400: [[1.0003, 1.0014, 1.0029, 1.0044, 1.0059, 1.0092, 1.0126, 1.0163, 1.0202, 1.0242, 1.0263, 1.0285, 1.0307, 1.0329, 1.0375, 1.0473, 1.0577, 1.0688, 1.0804, 1.0927, 1.1255, 1.1611],
        [1.001, 1.004, 1.009, 1.013, 1.016, 1.024, 1.03, 1.036, 1.041, 1.046, 1.048, 1.05, 1.052, 1.053, 1.056, 1.059, 1.061, 1.06, 1.057, 1.052, 1.034, 1.009],
        [0.9994, 0.9986, 0.9971, 0.9954, 0.9937, 0.99, 0.9859, 0.9815, 0.9767, 0.9716, 0.969, 0.9663, 0.9635, 0.9606, 0.9547, 0.9422, 0.9288, 0.9148, 0.9003, 0.8855, 0.8476, 0.8106],
        [8.334, 8.411, 8.507, 8.602, 8.696, 8.883, 9.065, 9.244, 9.419, 9.59, 9.674, 9.756, 9.837, 9.917, 10.07, 10.37, 10.65, 10.9, 11.14, 11.35, 11.8, 12.14]],
      600: [[1.0004, 1.0021, 1.0043, 1.0064, 1.0086, 1.0129, 1.0174, 1.0219, 1.0264, 1.031, 1.0333, 1.0356, 1.0379, 1.0402, 1.045, 1.0545, 1.0642, 1.0741, 1.0841, 1.0942, 1.1201, 1.1467],
        [1.0, 1.0, 1.0, 1.0, 0.9999, 0.9995, 0.999, 0.9983, 0.9973, 0.9964, 0.9958, 0.9952, 0.9945, 0.9938, 0.9923, 0.9889, 0.9851, 0.9808, 0.976, 0.9709, 0.9568, 0.9411],
        [0.9992, 0.9979, 0.9957, 0.9936, 0.9914, 0.987, 0.9825, 0.978, 0.9734, 0.9688, 0.9664, 0.9641, 0.9618, 0.9594, 0.9547, 0.9452, 0.9356, 0.926, 0.9163, 0.9067, 0.8828, 0.8597],
        [8.322, 8.351, 8.386, 8.422, 8.457, 8.525, 8.592, 8.658, 8.721, 8.784, 8.814, 8.845, 8.874, 8.904, 8.961, 9.072, 9.178, 9.277, 9.371, 9.459, 9.658, 9.827]],
    }),
    Ar: Object.freeze({
      160: [[0.99426, 0.97084, 0.94048, 0.90877, 0.87548, 0.80295, 0.71932, 0.61721, 0.47917, 0.34523, 0.32981, 0.3288, 0.33356, 0.34111, 0.36025, 0.40476, 0.45187, 0.49954, 0.54716, 0.59449, 0.7111, 0.82515],
        [1.017, 1.092, 1.199, 1.328, 1.485, 1.931, 2.72, 4.468, 10.19, 11.66, 7.736, 5.681, 4.53, 3.805, 2.945, 2.12, 1.709, 1.459, 1.287, 1.162, 0.9542, 0.825],
        [1.012, 1.031, 1.066, 1.107, 1.156, 1.289, 1.507, 1.94, 3.057, 2.172, 1.272, 0.8734, 0.6717, 0.5537, 0.424, 0.3125, 0.2634, 0.236, 0.2187, 0.2069, 0.1892, 0.1799],
        [8.504, 9.332, 10.55, 12.04, 13.89, 19.31, 29.37, 52.81, 135.0, 180.4, 129.4, 101.1, 84.78, 74.21, 61.29, 48.38, 41.67, 37.44, 34.47, 32.24, 28.45, 26.0]],
      200: [[0.99712, 0.98552, 0.97092, 0.9562, 0.94137, 0.91141, 0.88115, 0.85076, 0.82053, 0.79083, 0.77634, 0.76222, 0.74854, 0.73542, 0.71129, 0.67452, 0.65624, 0.65517, 0.66677, 0.68666, 0.75515, 0.83507],
        [1.009, 1.048, 1.099, 1.154, 1.213, 1.344, 1.494, 1.665, 1.858, 2.07, 2.182, 2.296, 2.409, 2.52, 2.722, 2.96, 2.905, 2.654, 2.353, 2.079, 1.588, 1.293],
        [1.006, 1.015, 1.03, 1.046, 1.063, 1.099, 1.138, 1.178, 1.22, 1.259, 1.277, 1.292, 1.305, 1.313, 1.316, 1.247, 1.096, 0.9257, 0.7791, 0.6666, 0.4954, 0.4082],
        [8.422, 8.869, 9.47, 10.12, 10.83, 12.45, 14.37, 16.63, 19.3, 22.38, 24.07, 25.85, 27.69, 29.57, 33.3, 39.4, 42.0, 41.46, 39.4, 37.01, 31.96, 28.51]],
      300: [[0.9994, 0.997, 0.99406, 0.99119, 0.98839, 0.98303, 0.97799, 0.97329, 0.96895, 0.96499, 0.96316, 0.96143, 0.95981, 0.95828, 0.95556, 0.95145, 0.94919, 0.94882, 0.95035, 0.95375, 0.96992, 0.99562],
        [1.003, 1.015, 1.03, 1.045, 1.061, 1.091, 1.121, 1.15, 1.179, 1.207, 1.22, 1.233, 1.246, 1.259, 1.283, 1.326, 1.362, 1.389, 1.407, 1.415, 1.403, 1.354],
        [1.001, 1.003, 1.006, 1.009, 1.011, 1.016, 1.02, 1.023, 1.026, 1.027, 1.028, 1.028, 1.028, 1.028, 1.026, 1.02, 1.01, 0.9951, 0.9766, 0.9548, 0.8904, 0.8215],
        [8.355, 8.517, 8.722, 8.93, 9.141, 9.572, 10.01, 10.46, 10.91, 11.37, 11.6, 11.83, 12.06, 12.29, 12.75, 13.64, 14.5, 15.29, 16.01, 16.64, 17.83, 18.49]],
      400: [[0.99998, 0.9999, 0.99983, 0.99981, 0.99982, 0.99997, 1.0003, 1.0008, 1.0014, 1.0023, 1.0027, 1.0032, 1.0038, 1.0044, 1.0057, 1.0089, 1.0128, 1.0173, 1.0224, 1.0282, 1.0454, 1.066],
        [1.001, 1.006, 1.012, 1.018, 1.024, 1.036, 1.047, 1.057, 1.067, 1.077, 1.081, 1.086, 1.09, 1.094, 1.102, 1.116, 1.128, 1.137, 1.144, 1.148, 1.15, 1.14],
        [1.0, 1.0, 1.0, 1.0, 0.9999, 0.9993, 0.9984, 0.9971, 0.9956, 0.9937, 0.9926, 0.9914, 0.9902, 0.9888, 0.9859, 0.9791, 0.9711, 0.962, 0.9517, 0.9406, 0.9093, 0.8754],
        [8.335, 8.416, 8.518, 8.62, 8.722, 8.925, 9.128, 9.329, 9.529, 9.726, 9.824, 9.922, 10.02, 10.11, 10.3, 10.67, 11.03, 11.37, 11.68, 11.98, 12.64, 13.16]],
      600: [[1.0002, 1.0012, 1.0024, 1.0036, 1.0049, 1.0074, 1.0099, 1.0125, 1.0152, 1.0179, 1.0193, 1.0206, 1.022, 1.0234, 1.0263, 1.0321, 1.0381, 1.0443, 1.0506, 1.0571, 1.074, 1.0917],
        [1.0, 1.001, 1.002, 1.003, 1.004, 1.006, 1.008, 1.009, 1.011, 1.012, 1.013, 1.013, 1.014, 1.014, 1.015, 1.016, 1.016, 1.016, 1.016, 1.015, 1.01, 1.002],
        [0.9995, 0.9988, 0.9976, 0.9963, 0.9951, 0.9925, 0.9898, 0.987, 0.9842, 0.9812, 0.9798, 0.9783, 0.9767, 0.9752, 0.9721, 0.9657, 0.959, 0.9521, 0.9451, 0.9379, 0.9193, 0.9005],
        [8.322, 8.354, 8.392, 8.431, 8.469, 8.544, 8.619, 8.692, 8.764, 8.835, 8.87, 8.905, 8.939, 8.973, 9.041, 9.172, 9.298, 9.419, 9.534, 9.645, 9.901, 10.13]],
    }),
    CO2: Object.freeze({
      310: [[0.99563, 0.97788, 0.95508, 0.93153, 0.90715, 0.85543, 0.79874, 0.73516, 0.66102, 0.56747, 0.50545, 0.41682, 0.28189, 0.24993, 0.24898, 0.27325, 0.30344, 0.335, 0.3669, 0.39881, 0.47788, 0.55555],
        [1.015, 1.077, 1.164, 1.263, 1.377, 1.666, 2.081, 2.734, 3.916, 6.785, 10.67, 24.13, 42.47, 15.17, 7.101, 3.973, 2.957, 2.428, 2.096, 1.865, 1.504, 1.289],
        [1.009, 1.023, 1.049, 1.077, 1.11, 1.189, 1.299, 1.463, 1.741, 2.358, 3.124, 5.468, 5.979, 1.695, 0.6888, 0.3697, 0.2815, 0.2402, 0.2164, 0.2011, 0.1798, 0.1692],
        [8.485, 9.216, 10.26, 11.46, 12.88, 16.59, 22.15, 31.23, 48.42, 92.22, 153.6, 371.3, 714.1, 283.6, 151.7, 97.01, 78.37, 68.35, 61.9, 57.33, 49.98, 45.48]],
      350: [[0.9971, 0.98541, 0.97061, 0.9556, 0.94037, 0.9092, 0.87702, 0.84375, 0.80934, 0.77375, 0.75552, 0.73702, 0.71827, 0.69931, 0.66097, 0.58599, 0.52518, 0.49233, 0.48492, 0.49248, 0.53841, 0.59777],
        [1.01, 1.051, 1.107, 1.167, 1.231, 1.377, 1.55, 1.758, 2.008, 2.313, 2.49, 2.686, 2.903, 3.143, 3.694, 4.99, 5.827, 5.429, 4.5, 3.701, 2.532, 1.958],
        [1.006, 1.015, 1.031, 1.047, 1.065, 1.104, 1.149, 1.201, 1.26, 1.327, 1.365, 1.404, 1.447, 1.491, 1.582, 1.725, 1.64, 1.299, 0.9697, 0.7498, 0.4857, 0.3782],
        [8.432, 8.925, 9.592, 10.32, 11.13, 12.98, 15.25, 18.05, 21.54, 25.92, 28.54, 31.48, 34.8, 38.53, 47.4, 70.32, 90.42, 92.86, 84.22, 74.8, 59.09, 50.51]],
      450: [[0.99885, 0.99424, 0.98851, 0.98281, 0.97716, 0.96596, 0.95494, 0.9441, 0.93347, 0.92308, 0.91797, 0.91294, 0.90798, 0.9031, 0.89358, 0.87569, 0.85959, 0.8456, 0.834, 0.82502, 0.81456, 0.82017],
        [1.005, 1.023, 1.047, 1.072, 1.097, 1.148, 1.201, 1.256, 1.312, 1.37, 1.399, 1.429, 1.459, 1.489, 1.549, 1.67, 1.785, 1.889, 1.979, 2.048, 2.122, 2.071],
        [1.002, 1.006, 1.012, 1.017, 1.023, 1.035, 1.046, 1.057, 1.068, 1.078, 1.083, 1.088, 1.092, 1.097, 1.105, 1.117, 1.123, 1.121, 1.111, 1.092, 1.012, 0.9085],
        [8.373, 8.608, 8.912, 9.225, 9.549, 10.23, 10.95, 11.71, 12.52, 13.36, 13.8, 14.25, 14.71, 15.18, 16.15, 18.17, 20.27, 22.38, 24.43, 26.35, 30.14, 32.24]],
      600: [[0.99974, 0.99869, 0.9974, 0.99616, 0.99496, 0.99266, 0.99052, 0.98853, 0.98669, 0.98501, 0.98422, 0.98347, 0.98276, 0.98209, 0.98086, 0.97887, 0.97752, 0.97683, 0.97682, 0.97749, 0.98222, 0.99126],
        [1.002, 1.01, 1.019, 1.029, 1.038, 1.057, 1.075, 1.093, 1.111, 1.129, 1.137, 1.146, 1.154, 1.162, 1.179, 1.21, 1.238, 1.264, 1.288, 1.308, 1.345, 1.363],
        [1.001, 1.001, 1.003, 1.004, 1.005, 1.007, 1.008, 1.01, 1.011, 1.011, 1.012, 1.012, 1.012, 1.012, 1.012, 1.01, 1.007, 1.003, 0.997, 0.9896, 0.9648, 0.9331],
        [8.342, 8.452, 8.591, 8.731, 8.871, 9.154, 9.441, 9.729, 10.02, 10.31, 10.46, 10.61, 10.75, 10.9, 11.2, 11.79, 12.37, 12.95, 13.51, 14.05, 15.32, 16.41]],
      900: [[1.0002, 1.0008, 1.0016, 1.0025, 1.0033, 1.005, 1.0068, 1.0086, 1.0104, 1.0123, 1.0133, 1.0143, 1.0152, 1.0162, 1.0182, 1.0224, 1.0267, 1.0312, 1.0358, 1.0405, 1.0531, 1.0665],
        [1.0, 1.002, 1.005, 1.007, 1.009, 1.013, 1.017, 1.021, 1.024, 1.028, 1.029, 1.031, 1.033, 1.034, 1.037, 1.042, 1.047, 1.051, 1.055, 1.058, 1.063, 1.064],
        [0.9997, 0.9992, 0.9984, 0.9975, 0.9966, 0.9948, 0.9929, 0.9909, 0.9889, 0.9868, 0.9857, 0.9846, 0.9835, 0.9823, 0.98, 0.9752, 0.9701, 0.9648, 0.9593, 0.9536, 0.9384, 0.9222],
        [8.325, 8.366, 8.417, 8.467, 8.518, 8.618, 8.717, 8.815, 8.912, 9.008, 9.055, 9.103, 9.15, 9.196, 9.289, 9.471, 9.649, 9.822, 9.99, 10.15, 10.54, 10.89]],
    }),
  });
  const B_MES = Object.freeze({   // NIST, (Z − 1)/ρ extrapolated to ρ → 0: [T (K), B (cm³·mol⁻¹)], within 1 % or 0,4 cm³·mol⁻¹
    N2: [[80, -242.0], [90, -194.4], [100, -159.7], [125, -104.2], [150, -71.7], [175, -50.5], [200, -35.7], [250, -16.4], [300, -4.5], [350, 3.5], [400, 9.2], [500, 16.7], [600, 21.3], [800, 26.4], [1000, 29.0]],
    Ar: [[100, -181.6], [110, -152.9], [120, -130.5], [130, -112.7], [150, -86.2], [175, -63.6], [200, -47.9], [250, -27.6], [300, -15.1], [350, -6.7], [400, -0.7], [450, 3.7], [500, 7.2], [600, 12.1], [700, 15.3]],
    CO2: [[220, -246.2], [250, -183.5], [275, -147.7], [300, -121.1], [350, -84.3], [400, -60.2], [450, -43.2], [500, -30.6], [600, -13.2], [700, -1.8], [800, 6.2], [900, 12.2], [1000, 16.8], [1100, 20.4]],
  });
  const EAU_293 = Object.freeze({ T: 293.15, P: 1e5, rho: 998.21, alpha: 2.068e-4, chiT: 4.590e-10 });   // NIST, IAPWS-95
  const critDe = g => { const C = typeof g === "string" ? CRITIQUE[g] : g; if (!C || !(C.Tc > 0 && C.Pc > 0)) err("gaz inconnu : " + g); return C; };
  const vdwG = G => { if (!G || !(G.a > 0 && G.b > 0)) err("gaz de Van der Waals { a, b } attendu"); return G; };
  function vdwCritique(g) { const { Tc, Pc } = critDe(g); return Object.freeze({ a: 27 * R * R * Tc * Tc / (64 * Pc), b: R * Tc / (8 * Pc) }); }
  function critiqueVdw(G) { const { a, b } = vdwG(G); return { Tc: 8 * a / (27 * R * b), Pc: a / (27 * b * b), Vc: 3 * b, Zc: 3 / 8 }; }
  function racinesVdw(G, P, T) {                                   // P V³ − (P b + R T) V² + a V − a b = 0, roots V > b
    const { a, b } = vdwG(G); pos(P, "P"); pos(T, "T");
    const f = V => R * T / (V - b) - a / (V * V) - P, out = [];
    const xs = []; for (let i = 0; i <= 400; i++) xs.push(b * (1 + 1e-9) * Math.pow(1e7, i / 400));   // b to 10⁷ b, log grid
    for (let i = 0; i < xs.length - 1; i++) {
      let lo = xs[i], hi = xs[i + 1], flo = f(lo);
      if ((flo > 0) === (f(hi) > 0)) continue;
      for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2, fm = f(m); if ((fm > 0) === (flo > 0)) { lo = m; flo = fm; } else hi = m; }
      out.push((lo + hi) / 2);
    }
    return out;
  }
  function zVdw(G, P, T) { const r = racinesVdw(G, P, T); if (!r.length) err("pas de racine"); return P * r[r.length - 1] / (R * T); }
  function coeffsVdw(G, V, T) {                                    // one mole, analytic
    const { a, b } = vdwG(G); pos(T, "T"); if (!(V > b)) err("V > b attendu");
    const P = R * T / (V - b) - a / (V * V), dPdT = R / (V - b), dPdV = -R * T / (V - b) ** 2 + 2 * a / V ** 3;
    const chiT = -1 / (V * dPdV);
    return { P, dPdT, dPdV, alpha: dPdT * chiT, beta: dPdT / P, chiT, l: T * dPdT, interne: a / (V * V), cinetique: R * T / (V - b),
      cpcv: -T * dPdT * dPdT / dPdV };
  }
  function isotherme(g, T) {
    const tab = ISO[g]; if (!tab) err("gaz inconnu : " + g);
    const d = tab[T]; if (!d) err("isotherme mesurée à " + T + " K absente pour " + g + " (" + Object.keys(tab).join(", ") + ")");
    const P = ISO_P.map(p => p * 1e6);
    return { g, T, P, Z: d[0].slice(), Vm: P.map((p, i) => d[0][i] * R * T / p), alpha: d[1].map(x => x / T), chiT: d[2].map((x, i) => x / P[i]),
      beta: d[1].map((x, i) => x / (T * d[2][i])), cpcv: d[3].slice() };
  }
  function interp(xs, ys, x) {                                     // xs increasing
    if (!(x >= xs[0] && x <= xs[xs.length - 1])) err("hors des mesures : " + x);
    let i = 1; while (xs[i] < x) i++;
    const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[i - 1] + t * (ys[i] - ys[i - 1]);
  }
  const zMesure = (g, T, P) => { const I = isotherme(g, T); return interp(I.P, I.Z, P); };
  function pMesure(g, T, V) {                                      // P on the measured isotherm at molar volume V, by ln P(ln V)
    const I = isotherme(g, T), lv = I.Vm.map(Math.log).reverse(), lp = I.P.map(Math.log).reverse();
    return Math.exp(interp(lv, lp, Math.log(pos(V, "V"))));
  }
  const bTab = g => { const t = B_MES[g]; if (!t) err("gaz inconnu : " + g); return t; };
  function bMesure(g, T) {                                         // linear in 1/T between table points, m³·mol⁻¹
    const t = bTab(g), x = 1 / pos(T, "T"), xs = t.map(r => 1 / r[0]).reverse(), ys = t.map(r => r[1] * 1e-6).reverse();
    return interp(xs, ys, x);
  }
  function boyle(g) {
    const t = bTab(g), i = t.findIndex(r => r[1] > 0); if (i < 1) err("pas de changement de signe de B mesuré");
    let lo = t[i - 1][0], hi = t[i][0];
    for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if (bMesure(g, m) < 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  const bVdw = (G, T) => { const { a, b } = vdwG(G); return b - a / (R * pos(T, "T")); };
  const boyleVdw = G => { const { a, b } = vdwG(G); return a / (R * b); };
  function bReduit(Ts) {                                           // B/(N_A σ³) for Lennard-Jones at T* = k_B T/ε
    pos(Ts, "T*");
    const f = x => { const s6 = x ** -6; return (Math.exp(-4 * (s6 * s6 - s6) / Ts) - 1) * x * x; };
    const L = 8, tail = 4 / (3 * Ts * L ** 3);                     // beyond L: e^(−u/kT) − 1 ≈ −u/kT ≈ 4 x⁻⁶/T*
    const I = -1 / 24 + simpson(f, 0.5, 1, 400) + simpson(f, 1, L, 1400) + tail;   // below 0,5 σ the integrand is −x²
    return -2 * Math.PI * I;
  }
  const bLJ = (T, p = LJ_AR) => N_A * p.sigma ** 3 * bReduit(k_B * pos(T, "T") / p.eps);
  function ajusteLJ(g) {                                           // least squares on B_MES: σ³ exact for each ε; ε scanned, then golden section
    const t = bTab(g), Bm = t.map(r => r[1] * 1e-6);
    const at = epsK => { const f = t.map(r => N_A * bReduit(r[0] / epsK)), s3 = f.reduce((s, x, i) => s + x * Bm[i], 0) / f.reduce((s, x) => s + x * x, 0);
      const rms = Math.sqrt(f.reduce((s, x, i) => s + (x * s3 - Bm[i]) ** 2, 0) / f.length); return { epsK, s3, rms }; };
    let best = 0, rmsMin = Infinity; const E = k => 20 * Math.pow(50, k / 48);      // ε/k_B scanned from 20 to 1 000 K
    for (let k = 0; k <= 48; k++) { const r = at(E(k)).rms; if (r < rmsMin) { rmsMin = r; best = k; } }
    let lo = E(Math.max(best - 1, 0)), hi = E(Math.min(best + 1, 48)); const gr = (Math.sqrt(5) - 1) / 2;
    for (let k = 0; k < 30; k++) { const m1 = hi - gr * (hi - lo), m2 = lo + gr * (hi - lo); if (at(m1).rms < at(m2).rms) hi = m2; else lo = m1; }
    const r = at((lo + hi) / 2);
    return { eps: r.epsK * k_B, sigma: Math.cbrt(r.s3), rms: r.rms };
  }
  const zViriel = (V, B, C = 0) => 1 + B / pos(V, "V") + C / (V * V);
  const zVirielP = (P, T, B) => 1 + B * pos(P, "P") / (R * pos(T, "T"));

  /* ---------- détentes (X.detentes.1 à 3) ---------- */
  /* NIST Chemistry WebBook, SRD 69 (fluid.cgi, 2026-11-10).
     DET, on the ISO isotherms and ISO_P: [U (kJ·mol⁻¹)], [Cv (J·mol⁻¹·K⁻¹)], [μ_JT (K·MPa⁻¹)].
     JT0, 0,1 MPa isobars: [T (K), μ_JT (K·MPa⁻¹), Cp (J·mol⁻¹·K⁻¹)] ; H2 is normal hydrogen.
     ISENTHALPES_N2: T (K) at constant H (kJ·mol⁻¹) on P (MPa), through (T20, 20 MPa) ; on the boiling curve where the fluid is two-phase.
     INVERSION_N2: [P (MPa), lower T, upper T] where μ_JT = 0. */
  const DET = Object.freeze({
    N2: Object.freeze({
      150: [[3.0946, 3.031, 2.9476, 2.8592, 2.7653, 2.557, 2.3146, 2.0288, 1.7005, 1.3648, 1.2131, 1.0784, 0.96096, 0.85882, 0.69091, 0.44885, 0.27637, 0.14239, 0.032624, -0.060529, -0.24636, -0.38989],
        [20.847, 21.077, 21.385, 21.717, 22.073, 22.864, 23.758, 24.7, 25.489, 25.815, 25.797, 25.712, 25.602, 25.49, 25.299, 25.076, 24.993, 24.983, 25.013, 25.066, 25.247, 25.457],
        [7.7591, 7.74, 7.7009, 7.6411, 7.5552, 7.2785, 6.8033, 6.0509, 4.9966, 3.8113, 3.2712, 2.803, 2.4103, 2.0848, 1.5907, 0.98602, 0.63788, 0.4122, 0.25363, 0.13587, -0.058584, -0.17719]],
      200: [[4.1395, 4.0989, 4.0473, 3.995, 3.9418, 3.8334, 3.7223, 3.6088, 3.4936, 3.3773, 3.3191, 3.2609, 3.203, 3.1455, 3.032, 2.8148, 2.6157, 2.4372, 2.2792, 2.1398, 1.8562, 1.6391],
        [20.815, 20.901, 21.009, 21.118, 21.226, 21.443, 21.656, 21.863, 22.061, 22.248, 22.336, 22.42, 22.499, 22.575, 22.712, 22.933, 23.094, 23.212, 23.305, 23.384, 23.562, 23.737],
        [4.6785, 4.63, 4.5653, 4.4957, 4.4212, 4.2567, 4.0716, 3.8665, 3.6436, 3.4062, 3.2835, 3.1589, 3.033, 2.9065, 2.6546, 2.1722, 1.743, 1.3809, 1.0838, 0.84259, 0.41827, 0.15597]],
      300: [[6.2238, 6.2008, 6.1722, 6.1435, 6.1149, 6.0579, 6.0012, 5.9448, 5.8889, 5.8334, 5.8059, 5.7785, 5.7513, 5.7243, 5.6707, 5.5659, 5.4644, 5.3666, 5.2727, 5.1827, 4.9752, 4.7915],
        [20.819, 20.846, 20.881, 20.915, 20.948, 21.014, 21.078, 21.141, 21.201, 21.26, 21.289, 21.317, 21.345, 21.373, 21.426, 21.529, 21.625, 21.716, 21.801, 21.882, 22.068, 22.235],
        [2.1197, 2.0902, 2.0532, 2.0159, 1.9784, 1.9029, 1.8266, 1.7501, 1.6733, 1.5967, 1.5586, 1.5206, 1.4827, 1.4451, 1.3706, 1.2252, 1.0862, 0.95459, 0.83115, 0.71625, 0.46633, 0.26565]],
      400: [[8.3116, 8.2961, 8.2769, 8.2577, 8.2386, 8.2007, 8.1631, 8.1259, 8.0891, 8.0527, 8.0346, 8.0167, 7.9988, 7.9811, 7.946, 7.877, 7.8099, 7.7447, 7.6814, 7.6199, 7.4746, 7.3407],
        [20.939, 20.953, 20.971, 20.989, 21.007, 21.042, 21.076, 21.11, 21.144, 21.177, 21.193, 21.209, 21.225, 21.241, 21.272, 21.333, 21.392, 21.449, 21.505, 21.559, 21.688, 21.81],
        [1.0089, 0.99184, 0.97066, 0.94963, 0.92875, 0.88744, 0.84671, 0.80656, 0.76701, 0.72806, 0.70883, 0.68976, 0.67085, 0.6521, 0.61513, 0.54331, 0.47446, 0.40869, 0.34608, 0.28666, 0.15188, 0.035783]],
      600: [[12.573, 12.564, 12.554, 12.543, 12.532, 12.511, 12.49, 12.469, 12.448, 12.428, 12.418, 12.408, 12.398, 12.388, 12.368, 12.329, 12.292, 12.254, 12.218, 12.183, 12.098, 12.017],
        [21.796, 21.803, 21.812, 21.821, 21.83, 21.847, 21.864, 21.881, 21.898, 21.915, 21.923, 21.932, 21.94, 21.948, 21.965, 21.998, 22.03, 22.062, 22.094, 22.125, 22.201, 22.276],
        [0.021483, 0.014617, 0.0061465, -0.0022057, -0.010444, -0.026593, -0.042329, -0.057679, -0.072662, -0.087299, -0.094492, -0.1016, -0.10864, -0.11559, -0.12928, -0.15578, -0.18117, -0.20551, -0.22886, -0.25124, -0.30323, -0.34991]],
    }),
    Ar: Object.freeze({
      160: [[1.9801, 1.9185, 1.8374, 1.7512, 1.6588, 1.4499, 1.1935, 0.84932, 0.29401, -0.53917, -0.78205, -0.93902, -1.0537, -1.1444, -1.2844, -1.4805, -1.6218, -1.7338, -1.8273, -1.908, -2.0727, -2.2031],
        [12.525, 12.746, 13.046, 13.375, 13.741, 14.617, 15.787, 17.504, 20.274, 20.442, 19.298, 18.569, 18.106, 17.793, 17.403, 17.038, 16.893, 16.841, 16.836, 16.858, 16.972, 17.121],
        [10.817, 10.713, 10.571, 10.412, 10.229, 9.7688, 9.1126, 8.0955, 6.2761, 3.4873, 2.651, 2.1378, 1.791, 1.5375, 1.1845, 0.76794, 0.51993, 0.35091, 0.2265, 0.13024, -0.038167, -0.14852]],
      200: [[2.4833, 2.4401, 2.3849, 2.3284, 2.2705, 2.1501, 2.0231, 1.8892, 1.7479, 1.5992, 1.5221, 1.4434, 1.3632, 1.2817, 1.1163, 0.7873, 0.4847, 0.22604, 0.012077, -0.16477, -0.49635, -0.73286],
        [12.497, 12.597, 12.725, 12.856, 12.989, 13.265, 13.552, 13.847, 14.148, 14.449, 14.595, 14.738, 14.876, 15.006, 15.24, 15.567, 15.711, 15.739, 15.723, 15.704, 15.709, 15.785],
        [7.4099, 7.3305, 7.2269, 7.1179, 7.0032, 6.7545, 6.4776, 6.17, 5.8302, 5.4586, 5.2617, 5.058, 4.8485, 4.6342, 4.1966, 3.3331, 2.5732, 1.9694, 1.512, 1.1683, 0.61945, 0.30612]],
      300: [[3.7351, 3.711, 3.6807, 3.6504, 3.62, 3.559, 3.4977, 3.4362, 3.3746, 3.313, 3.2822, 3.2513, 3.2206, 3.1898, 3.1284, 3.0066, 2.8864, 2.7686, 2.6537, 2.5423, 2.281, 2.0467],
        [12.479, 12.508, 12.545, 12.581, 12.616, 12.687, 12.757, 12.825, 12.892, 12.958, 12.99, 13.022, 13.053, 13.084, 13.145, 13.261, 13.369, 13.47, 13.563, 13.65, 13.84, 14.002],
        [3.6153, 3.577, 3.5287, 3.4799, 3.4307, 3.3311, 3.23, 3.1276, 3.0243, 2.9202, 2.868, 2.8157, 2.7634, 2.7111, 2.6066, 2.3993, 2.1961, 1.9993, 1.8106, 1.6315, 1.2313, 0.90147]],
      400: [[4.9842, 4.9679, 4.9476, 4.9272, 4.907, 4.8665, 4.8262, 4.786, 4.746, 4.7063, 4.6865, 4.6667, 4.6471, 4.6275, 4.5884, 4.5112, 4.4352, 4.3605, 4.2872, 4.2154, 4.0431, 3.8812],
        [12.475, 12.489, 12.507, 12.524, 12.542, 12.576, 12.61, 12.643, 12.676, 12.708, 12.724, 12.74, 12.756, 12.772, 12.803, 12.864, 12.922, 12.98, 13.035, 13.088, 13.216, 13.334],
        [1.997, 1.9756, 1.9489, 1.9223, 1.8957, 1.8425, 1.7896, 1.737, 1.6846, 1.6327, 1.6069, 1.5811, 1.5555, 1.5301, 1.4795, 1.3802, 1.2833, 1.1893, 1.0983, 1.0104, 0.80565, 0.62264]],
      600: [[7.4803, 7.4709, 7.4592, 7.4476, 7.436, 7.4129, 7.3899, 7.3671, 7.3445, 7.3221, 7.3109, 7.2997, 7.2887, 7.2776, 7.2556, 7.2122, 7.1694, 7.1273, 7.0858, 7.0451, 6.9462, 6.8515],
        [12.473, 12.479, 12.487, 12.495, 12.502, 12.517, 12.532, 12.547, 12.562, 12.577, 12.584, 12.592, 12.599, 12.607, 12.621, 12.65, 12.679, 12.707, 12.736, 12.764, 12.832, 12.9],
        [0.55603, 0.54723, 0.53628, 0.5254, 0.51458, 0.49316, 0.47201, 0.45113, 0.43053, 0.41021, 0.40016, 0.39017, 0.38025, 0.3704, 0.35092, 0.31277, 0.27571, 0.23973, 0.20482, 0.17095, 0.090732, 0.016617]],
    }),
    CO2: Object.freeze({
      310: [[20.143, 20.036, 19.898, 19.752, 19.6, 19.27, 18.895, 18.456, 17.913, 17.167, 16.621, 15.735, 13.89, 13.047, 12.442, 11.87, 11.517, 11.253, 11.037, 10.854, 10.482, 10.188],
        [29.455, 29.829, 30.318, 30.836, 31.387, 32.612, 34.065, 35.871, 38.297, 42.06, 45.159, 50.607, 53.254, 47.713, 43.993, 41.916, 41.168, 40.775, 40.54, 40.392, 40.219, 40.181],
        [9.9024, 9.9151, 9.9291, 9.9402, 9.9473, 9.9437, 9.9017, 9.7908, 9.5472, 8.9999, 8.446, 7.3321, 4.6491, 3.0582, 2.0006, 1.2558, 0.91462, 0.70607, 0.56189, 0.45483, 0.27515, 0.16124]],
      350: [[21.358, 21.275, 21.169, 21.06, 20.948, 20.714, 20.466, 20.201, 19.918, 19.613, 19.451, 19.283, 19.108, 18.925, 18.535, 17.66, 16.723, 15.888, 15.246, 14.762, 13.945, 13.406],
        [31.134, 31.354, 31.637, 31.927, 32.226, 32.85, 33.511, 34.213, 34.957, 35.745, 36.155, 36.575, 37.004, 37.441, 38.325, 39.978, 40.978, 41.1, 40.84, 40.54, 40.044, 39.838],
        [7.3293, 7.3265, 7.3204, 7.311, 7.2981, 7.2598, 7.2015, 7.1178, 7.0022, 6.8467, 6.7512, 6.642, 6.518, 6.3777, 6.0435, 5.1406, 4.0104, 2.9602, 2.1944, 1.678, 0.96858, 0.61457]],
      450: [[24.664, 24.612, 24.546, 24.48, 24.413, 24.277, 24.14, 24, 23.859, 23.716, 23.644, 23.571, 23.498, 23.424, 23.276, 22.976, 22.673, 22.369, 22.067, 21.769, 21.059, 20.422],
        [34.775, 34.855, 34.954, 35.055, 35.155, 35.359, 35.563, 35.769, 35.974, 36.179, 36.282, 36.384, 36.485, 36.586, 36.785, 37.173, 37.541, 37.883, 38.195, 38.473, 39.015, 39.365],
        [4.0212, 4.0068, 3.988, 3.9683, 3.9477, 3.9037, 3.8557, 3.8034, 3.7466, 3.685, 3.6524, 3.6185, 3.5834, 3.547, 3.4705, 3.3029, 3.1177, 2.9184, 2.7094, 2.4962, 1.9788, 1.53]],
      600: [[30.217, 30.184, 30.143, 30.102, 30.06, 29.978, 29.895, 29.813, 29.731, 29.648, 29.607, 29.566, 29.525, 29.484, 29.403, 29.24, 29.078, 28.918, 28.76, 28.603, 28.222, 27.859],
        [39.023, 39.05, 39.084, 39.119, 39.153, 39.221, 39.288, 39.356, 39.422, 39.489, 39.521, 39.554, 39.587, 39.619, 39.683, 39.809, 39.931, 40.049, 40.163, 40.272, 40.527, 40.753],
        [2.0221, 2.01, 1.9949, 1.9798, 1.9647, 1.9345, 1.9041, 1.8736, 1.8428, 1.8119, 1.7963, 1.7806, 1.7649, 1.7491, 1.7172, 1.6525, 1.5865, 1.5194, 1.4515, 1.3829, 1.2118, 1.0463]],
      900: [[42.853, 42.834, 42.811, 42.788, 42.765, 42.72, 42.675, 42.63, 42.585, 42.541, 42.519, 42.497, 42.475, 42.453, 42.409, 42.323, 42.238, 42.154, 42.071, 41.989, 41.79, 41.597],
        [44.691, 44.699, 44.708, 44.718, 44.728, 44.747, 44.766, 44.785, 44.804, 44.823, 44.833, 44.842, 44.851, 44.861, 44.879, 44.916, 44.952, 44.988, 45.024, 45.059, 45.144, 45.227],
        [0.64605, 0.64043, 0.63349, 0.62663, 0.61984, 0.60649, 0.59343, 0.58061, 0.56803, 0.55567, 0.54957, 0.54351, 0.5375, 0.53153, 0.51972, 0.49653, 0.47386, 0.45162, 0.42975, 0.4082, 0.35556, 0.30456]],
    }),
  });
  const JT0 = Object.freeze({
    N2: [[100, 16.082, 30.012], [120, 11.496, 29.611], [150, 7.7591, 29.37], [180, 5.6419, 29.268], [200, 4.6785, 29.23], [250, 3.087, 29.182], [300, 2.1197, 29.171], [350, 1.4717, 29.198], [400, 1.0089, 29.273], [500, 0.39755, 29.594], [600, 0.021483, 30.118], [700, -0.22402, 30.761], [800, -0.3909, 31.439], [1000, -0.59324, 32.703]],
    Ar: [[100, 25.048, 21.852], [120, 17.843, 21.361], [150, 12.076, 21.078], [180, 8.8588, 20.961], [200, 7.4099, 20.918], [250, 5.0397, 20.861], [300, 3.6153, 20.834], [350, 2.669, 20.819], [400, 1.997, 20.81], [500, 1.1105, 20.801], [600, 0.55603, 20.796], [700, 0.17948, 20.793], [800, -0.091058, 20.791], [1000, -0.44981, 20.789]],
    CO2: [[220, 24.907, 34.357], [250, 17.399, 35.428], [280, 12.858, 36.673], [300, 10.761, 37.52], [350, 7.3293, 39.566], [400, 5.3144, 41.446], [450, 4.0212, 43.148], [500, 3.1355, 44.689], [600, 2.0221, 47.365], [700, 1.3653, 49.593], [800, 0.94011, 51.456], [900, 0.64605, 53.016], [1000, 0.43241, 54.322], [1100, 0.27114, 55.42]],
    H2: [[30, 10.076, 21.809], [40, 6.6646, 21.309], [50, 4.7745, 21.131], [60, 3.5756, 21.137], [80, 2.1378, 21.643], [100, 1.3215, 22.635], [120, 0.82023, 23.798], [150, 0.37597, 25.41], [180, 0.11894, 26.659], [200, 0.002596, 27.292], [220, -0.086826, 27.789], [250, -0.18778, 28.331], [300, -0.30284, 28.853], [400, -0.43541, 29.189], [500, -0.50715, 29.256]],
    He: [[6, 6.0612, 24.028], [8, 4.0913, 22.267], [10, 3.0409, 21.663], [15, 1.7239, 21.153], [20, 1.0814, 20.99], [25, 0.69587, 20.917], [30, 0.43782, 20.877], [35, 0.25291, 20.853], [40, 0.11403, 20.837], [45, 0.0060802, 20.826], [50, -0.080056, 20.819], [60, -0.20835, 20.808], [80, -0.36507, 20.798], [100, -0.45474, 20.793], [150, -0.56204, 20.789], [200, -0.6044, 20.787], [300, -0.62939, 20.786]],
  });
  const ISENTHALPES_N2 = Object.freeze({ P: [0.1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40], courbes: Object.freeze([
    Object.freeze({ T20: 150, H: 0.93684, T: [77.2, 103.8, 115.6, 123.6, 129.6, 134.1, 137.3, 139.8, 141.8, 143.4, 144.7, 146.7, 148.0, 149.0, 149.6, 150.0, 150.2, 149.5, 148.4, 146.9] }),
    Object.freeze({ T20: 180, H: 2.6036, T: [91.7, 107.0, 120.6, 131.2, 139.6, 146.4, 152.0, 156.6, 160.5, 163.7, 166.5, 170.9, 174.2, 176.7, 178.6, 180.0, 182.1, 182.9, 182.8, 182.0] }),
    Object.freeze({ T20: 200, H: 3.645, T: [126.6, 135.5, 144.2, 151.8, 158.5, 164.3, 169.3, 173.7, 177.5, 180.9, 183.9, 188.8, 192.6, 195.7, 198.1, 200.0, 203.1, 204.6, 205.1, 204.8] }),
    Object.freeze({ T20: 250, H: 5.8962, T: [203.3, 207.3, 211.4, 215.3, 218.9, 222.2, 225.3, 228.1, 230.7, 233.2, 235.4, 239.4, 242.8, 245.6, 248.0, 250.0, 253.6, 255.8, 256.8, 257.1] }),
    Object.freeze({ T20: 300, H: 7.8188, T: [269.2, 271.5, 274.0, 276.3, 278.5, 280.6, 282.6, 284.4, 286.2, 287.8, 289.3, 292.1, 294.5, 296.6, 298.4, 300.0, 302.9, 304.7, 305.6, 305.7] }),
    Object.freeze({ T20: 400, H: 11.254, T: [386.9, 387.9, 388.9, 389.9, 390.8, 391.7, 392.6, 393.3, 394.1, 394.8, 395.5, 396.7, 397.7, 398.6, 399.4, 400.0, 401.1, 401.5, 401.4, 400.9] }),
    Object.freeze({ T20: 500, H: 14.478, T: [496.6, 496.9, 497.3, 497.6, 498.0, 498.3, 498.5, 498.8, 499.0, 499.2, 499.4, 499.6, 499.9, 500.0, 500.0, 500.0, 499.7, 498.9, 497.8, 496.5] }),
    Object.freeze({ T20: 600, H: 17.641, T: [602.6, 602.6, 602.6, 602.5, 602.5, 602.4, 602.4, 602.3, 602.2, 602.1, 601.9, 601.6, 601.3, 600.9, 600.5, 600.0, 598.6, 597.0, 595.2, 593.1] }),
  ]) });
  const INVERSION_N2 = Object.freeze([[0.1, null, 607.3], [1, 101.9, 602.1], [2, 103.5, 596.4], [5, 108.5, 579.3], [10, 117.7, 550.6], [15, 128.2, 520.7], [20, 140.7, 488.9], [25, 155.9, 454.3], [30, 175.5, 415.1], [35, 204, 366.9], [36, 212, 355.1], [37, 221.5, 341.8], [38, 233.7, 325.8], [39, 252.4, 303.4]]);
  const CRITIQUE_LEGERS = Object.freeze({ H2: Object.freeze({ Tc: 33.145, Pc: 1.2965e6 }), He: Object.freeze({ Tc: 5.1953, Pc: 0.2283e6 }) });   // end of the NIST saturation tables
  const SAT_N2 = Object.freeze({ P: 1e5, T: 77.244, hl: -3424.6, hv: 2159.1 });   // boiling nitrogen at 0,1 MPa, J·mol⁻¹, same reference state as DET
  function detente(g, T) {                                         // measured isotherm completed: U, H (J·mol⁻¹), Cv, Cp, μ_JT (K·Pa⁻¹)
    const I = isotherme(g, T), d = DET[g][T], U = d[0].map(u => u * 1e3), Cv = d[1].slice();
    return Object.assign(I, { U, H: U.map((u, i) => u + I.P[i] * I.Vm[i]), Cv, Cp: Cv.map((c, i) => c + I.cpcv[i]), mu: d[2].map(x => x * 1e-6) });
  }
  function jouleMesure(g, T, i, j) {                               // free expansion from table point i to point j: U(T + dT, V2) = U(T, V1), first order in dT
    const D = detente(g, T);
    if (!(Number.isInteger(i) && Number.isInteger(j) && j >= 0 && j < i && i < D.P.length)) err("points i > j attendus sur l'isotherme");
    return { V1: D.Vm[i], V2: D.Vm[j], dT: -(D.U[j] - D.U[i]) / D.Cv[j] };
  }
  function jouleVdw(G, cv, V1, V2) {                               // one mole, exact for the model: Cv does not depend on V
    const { a, b } = vdwG(G); pos(cv, "Cv"); if (!(V1 > b && V2 >= V1)) err("b < V1 ≤ V2 attendu");
    return -(a / cv) * (1 / V1 - 1 / V2);
  }
  function entropieJouleVdw(G, cv, T1, V1, V2) {                   // entropy created, J·mol⁻¹·K⁻¹: S = Cv ln T + R ln(V − b)
    const dT = jouleVdw(G, cv, V1, V2); pos(T1, "T1"); if (!(T1 + dT > 0)) err("température finale négative");
    return cv * Math.log(1 + dT / T1) + R * Math.log((V2 - G.b) / (V1 - G.b));
  }
  function muVdw(G, V, T, cv) { const c = coeffsVdw(G, V, T); return V * (c.alpha * T - 1) / (pos(cv, "Cv") + c.cpcv); }   // K·Pa⁻¹
  const muViriel = (B, TdBdT, Cp) => (TdBdT - B) / pos(Cp, "Cp");   // P → 0 limit of μ_JT
  const muVdw0 = (G, T, Cp) => { const { a, b } = vdwG(G); return muViriel(b - a / (R * pos(T, "T")), a / (R * T), Cp); };
  const inversionVdw = G => { const { a, b } = vdwG(G); return 2 * a / (R * b); };
  function inversionVdwP(Tr) {                                     // reduced pressure on the van der Waals inversion curve
    if (!(Tr >= 0.75 && Tr <= 6.75)) err("3/4 ≤ T/Tc ≤ 27/4 attendu"); return 24 * Math.sqrt(3 * Tr) - 12 * Tr - 27;
  }
  const jtTab = g => { const t = JT0[g]; if (!t) err("gaz inconnu : " + g); return t; };
  function jt0(g, T) {                                             // 0,1 MPa: μ_JT (K·Pa⁻¹) and Cp, linear between table points
    const t = jtTab(g), xs = t.map(r => r[0]);
    return { mu: interp(xs, t.map(r => r[1]), T) * 1e-6, Cp: interp(xs, t.map(r => r[2]), T) };
  }
  const INVERSION_0 = Object.freeze({ He: 45.3, H2: 200.5, N2: 607.3, Ar: 762.9 });   // K, upper inversion temperature at 0,1 MPa, from the same isobars in steps of 1 to 10 K
  function inversion0(g) { const T = INVERSION_0[g]; if (!T) err("pas d'inversion tabulée pour " + g); return T; }
  function tdbLJ(T, p = LJ_AR) { const h = pos(T, "T") * 1e-3; return T * (bLJ(T + h, p) - bLJ(T - h, p)) / (2 * h); }   // T dB/dT
  function inversionLJ(p = LJ_AR) {                                // T dB/dT = B
    let lo = 2 * p.eps / k_B, hi = 20 * p.eps / k_B; const f = T => tdbLJ(T, p) - bLJ(T, p);
    for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function tIsenthalpe(k, P) {                                     // nitrogen, curve k of ISENTHALPES_N2, P in Pa
    const c = ISENTHALPES_N2.courbes[k]; if (!c) err("isenthalpe inconnue : " + k);
    return interp(ISENTHALPES_N2.P, c.T, P / 1e6);
  }
  function linde(T, i) {                                           // liquid fraction of a Linde-Hampson cycle fed at (T, ISO_P[i]), ideal exchanger
    const D = detente("N2", T); if (!(Number.isInteger(i) && i > 0 && i < D.P.length)) err("point i ≥ 1 attendu");
    return (D.H[0] - D.H[i]) / (D.H[0] - SAT_N2.hl);
  }

  /* ---------- conduction thermique (X.transferts_thermiques.1, 2, 4) ---------- */
  /* Thermal diffusivity near 300 K, m²·s⁻¹: Wikipedia « Thermal diffusivity » (2026-11-10), which cites the CRC Handbook and Holman;
     air is nitrogen at 300 K and 0,1 MPa from NIST (λ = 0,02597 W·m⁻¹·K⁻¹, ρ = 1,1233 kg·m⁻³, cp = 1 041 J·kg⁻¹·K⁻¹). */
  const DIFFUSIVITE = Object.freeze({ cuivre: 1.11e-4, aluminium: 9.7e-5, fer: 2.3e-5, air: 2.2e-5, inox: 4.2e-6, gres: 1.15e-6, glace: 1.02e-6,
    brique: 5.2e-7, verre: 3.4e-7, eau: 1.43e-7, bois: 8.2e-8 });
  /* Thermal conductivity near 293 K, W·m⁻¹·K⁻¹: Wikipedia « List of thermal conductivities » (2026-11-10); one value inside each listed range. */
  const LAMBDA = Object.freeze({ cuivre: 401, aluminium: 237, fer: 80, inox: 16.3, glace: 2.2, beton: 1.65, verre: 0.9, brique: 0.69, eau: 0.59,
    bois: 0.10, laine: 0.04, polystyrene: 0.033, air: 0.026 });
  const R_SURFACE = Object.freeze({ int: 0.13, ext: 0.04 });        // m²·K·W⁻¹, EN ISO 6946, horizontal heat flow
  const fourier = (lambda, dT, e) => pos(lambda, "λ") * fin(dT, "ΔT") / pos(e, "e");   // W·m⁻², from hot to cold
  const tempsDiffusion = (L, D) => pos(L, "L") ** 2 / pos(D, "D");
  const nombreFourier = (D, t, L) => pos(D, "D") * fin(t, "t") / pos(L, "L") ** 2;
  const entropieConduction = (phi, Tc, Tf) => fin(phi, "φ") * (1 / pos(Tf, "Tf") - 1 / pos(Tc, "Tc"));   // W·K⁻¹ created by φ going from Tc to Tf
  function plaque(xi, Fo) {                                        // slab at 0, face ξ = 0 set to 1 at t = 0, face ξ = 1 kept at 0: θ(ξ, Fo)
    if (!(xi >= 0 && xi <= 1)) err("0 ≤ x/L ≤ 1 attendu"); if (!(Fo >= 0)) err("Fo ≥ 0 attendu");
    if (Fo === 0) return xi === 0 ? 1 : 0;
    if (Fo < 0.05) { const q = 2 * Math.sqrt(Fo); return Pr.erfc(xi / q) - Pr.erfc((2 - xi) / q) + Pr.erfc((2 + xi) / q); }   // images in the far face, then the near one
    let s = 1 - xi; for (let n = 1; n <= 60; n++) s -= 2 / (n * Math.PI) * Math.sin(n * Math.PI * xi) * Math.exp(-n * n * Math.PI * Math.PI * Fo);
    return s;
  }
  function fluxPlaque(xi, Fo) {                                    // −∂θ/∂ξ, in units of λ ΔT/L: 1 everywhere in steady state
    if (!(xi === 0 || xi === 1)) err("flux aux faces seulement : x/L = 0 ou 1"); if (!(Fo > 0)) err("Fo > 0 attendu");
    if (Fo < 0.05) return xi === 0 ? 1 / Math.sqrt(Math.PI * Fo) : Math.exp(-1 / (4 * Fo)) * 2 / Math.sqrt(Math.PI * Fo);
    let s = 1; for (let n = 1; n <= 60; n++) s += 2 * Math.cos(n * Math.PI * xi) * Math.exp(-n * n * Math.PI * Math.PI * Fo);
    return s;
  }
  const rPlan = (e, lambda, S = 1) => pos(e, "e") / (pos(lambda, "λ") * pos(S, "S"));        // K·W⁻¹
  function rCylindre(r1, r2, lambda, L = 1) { pos(r1, "r1"); if (!(r2 > r1)) err("r2 > r1 attendu"); return Math.log(r2 / r1) / (2 * Math.PI * pos(lambda, "λ") * pos(L, "L")); }
  const rSerie = (...Rs) => Rs.reduce((s, r) => s + pos(r, "R"), 0);
  const rParallele = (...Rs) => 1 / Rs.reduce((s, r) => s + 1 / pos(r, "R"), 0);
  function mur(couches, Ti, Te, o = {}) {                          // 1 m² of wall, inside to outside; couches: [{ e, lambda }]
    const { rsi = R_SURFACE.int, rse = R_SURFACE.ext } = o; if (!(Array.isArray(couches) && couches.length)) err("au moins une couche");
    const Rs = [rsi].concat(couches.map(c => rPlan(c.e, c.lambda)), [rse]).map(r => { if (!(r >= 0)) err("résistance négative"); return r; });
    const Rt = Rs.reduce((s, r) => s + r, 0), phi = (fin(Ti, "Ti") - fin(Te, "Te")) / Rt, T = [Ti]; let x = Ti;
    for (const r of Rs) { x -= phi * r; T.push(x); }                // T: air inside, inner surface, interfaces…, outer surface, air outside
    return { R: Rt, U: 1 / Rt, phi, T, Rs };
  }
  const profondeur = (D, omega) => Math.sqrt(2 * pos(D, "D") / pos(omega, "ω"));   // δ, m
  function ondeThermique(x, t, o) {                                // T(0, t) = T0 + A cos ωt on a half-space
    const { D, omega, T0 = 0, A = 1 } = o, d = profondeur(D, omega); if (!(x >= 0)) err("x ≥ 0 attendu");
    return T0 + A * Math.exp(-x / d) * Math.cos(omega * fin(t, "t") - x / d);
  }
  const retardOnde = (x, D, omega) => fin(x, "x") / (profondeur(D, omega) * omega);   // s, delay of the maximum at depth x
  const vitesseOnde = (D, omega) => Math.sqrt(2 * pos(D, "D") * pos(omega, "ω"));    // phase velocity ω δ
  function echelon(x, t, D) { if (!(x >= 0)) err("x ≥ 0 attendu"); return Pr.erfc(x / (2 * Math.sqrt(pos(D, "D") * pos(t, "t")))); }   // surface step 0 → 1
  const gradientEchelon = (dT, t, D) => fin(dT, "ΔT") / Math.sqrt(Math.PI * pos(D, "D") * pos(t, "t"));   // surface gradient, K·m⁻¹
  const ageKelvin = (dT, G, D) => fin(dT, "ΔT") ** 2 / (Math.PI * pos(D, "D") * pos(G, "G") ** 2);       // s, time for the gradient to fall to G

  /* ---------- convection et rayonnement (X.transferts_thermiques.3, X.corps_noir.1 et 2) ---------- */
  const newton = (hc, Tp, Tf) => pos(hc, "h") * (fin(Tp, "Tp") - fin(Tf, "Tf"));              // W·m⁻², from the wall to the fluid
  const biot = (hc, L, lambda) => pos(hc, "h") * pos(L, "L") / pos(lambda, "λ");
  const tauNewton = (rhoC, V, hc, Sf) => pos(rhoC, "ρc") * pos(V, "V") / (pos(hc, "h") * pos(Sf, "S"));   // s, body at uniform temperature
  const refroidissement = (t, tau, T0, Tf) => Tf + (T0 - Tf) * Math.exp(-fin(t, "t") / pos(tau, "τ"));
  const mAilette = (hc, lambda, p, A) => Math.sqrt(pos(hc, "h") * pos(p, "p") / (pos(lambda, "λ") * pos(A, "A")));   // m⁻¹
  function ailette(x, L, m, bout = "isole") {                      // θ(x)/θ(0) along a fin of length L
    pos(m, "m"); pos(L, "L"); if (!(x >= 0 && x <= L)) err("0 ≤ x ≤ L attendu");
    if (bout === "infinie") return Math.exp(-m * x);
    if (bout !== "isole") err("bout : isole ou infinie");
    return Math.cosh(m * (L - x)) / Math.cosh(m * L);
  }
  function fluxAilette(hc, lambda, p, A, L, theta0) {              // W entering the fin at its base, insulated tip
    return Math.sqrt(pos(hc, "h") * pos(p, "p") * pos(lambda, "λ") * pos(A, "A")) * fin(theta0, "θ0") * Math.tanh(mAilette(hc, lambda, p, A) * pos(L, "L"));
  }
  const rendementAilette = mL => Math.tanh(pos(mL, "mL")) / mL;     // against a fin entirely at the base temperature
  const efficaciteAilette = (hc, lambda, p, A, L) => fluxAilette(hc, lambda, p, A, L, 1) / (hc * A);   // against the bare base
  /* thermal radiation. Exitance of a black body per unit wavelength (W·m⁻³) and per unit frequency (W·m⁻²·Hz⁻¹). */
  function planckLambda(l, T) { const x = h * c / (pos(l, "λ") * k_B * pos(T, "T")); return x > 700 ? 0 : 2 * Math.PI * h * c * c / (l ** 5 * Math.expm1(x)); }
  function planckNu(nu, T) { const x = h * pos(nu, "ν") / (k_B * pos(T, "T")); return x > 700 ? 0 : 2 * Math.PI * h * nu ** 3 / (c * c * Math.expm1(x)); }
  const X_WIEN = (() => { let x = 5; for (let i = 0; i < 50; i++) x -= (5 * -Math.expm1(-x) - x) / (5 * Math.exp(-x) - 1); return x; })();   // 4,965 114…: x = 5(1 − e^(−x))
  const B_WIEN = h * c / (k_B * X_WIEN);                           // 2,897 771 955… × 10⁻³ m·K
  const wien = T => B_WIEN / pos(T, "T");                          // m, peak of planckLambda
  const wienNu = T => xPic * k_B * pos(T, "T") / h;                // Hz, peak of planckNu: not c/wien(T)
  const stefan = (T, eps = 1) => { if (!(eps >= 0 && eps <= 1)) err("0 ≤ ε ≤ 1 attendu"); return eps * SIGMA * pos(T, "T") ** 4; };
  function fractionBande(T, l1, l2) {                              // share of σT⁴ emitted between wavelengths l1 < l2
    pos(T, "T"); pos(l1, "λ1"); if (!(l2 > l1)) err("λ2 > λ1 attendu");
    const x1 = Math.min(h * c / (l1 * k_B * T), 80), x2 = h * c / (l2 * k_B * T); if (x2 >= x1) return 0;
    return 15 / Math.PI ** 4 * simpson(x => x < 1e-8 ? x * x : x ** 3 / Math.expm1(x), x2, x1, 2000);
  }
  /* NASA planetary fact sheets (nssdc.gsfc.nasa.gov, 2026-11-10): solar irradiance S0 (W·m⁻²), Bond albedo A, mean surface temperature Ts (K) */
  const PLANETES = Object.freeze({ Venus: Object.freeze({ S0: 2601.3, A: 0.77, Ts: 737 }), Terre: Object.freeze({ S0: 1361.0, A: 0.294, Ts: 288 }),
    Mars: Object.freeze({ S0: 586.2, A: 0.250, Ts: 214 }) });
  const T_SOLEIL = 5772;                                           // K, nominal effective temperature (IAU 2015 resolution B3)
  function temperatureEquilibre(S0, A) { if (!(A >= 0 && A < 1)) err("0 ≤ A < 1 attendu"); return Math.pow(pos(S0, "S0") * (1 - A) / (4 * SIGMA), 0.25); }
  const serre = (Te, n = 1) => { if (!(n >= 0)) err("n ≥ 0 attendu"); return pos(Te, "Te") * Math.pow(n + 1, 0.25); };   // n opaque layers
  function serreGrise(Te, eps) { if (!(eps >= 0 && eps <= 1)) err("0 ≤ ε ≤ 1 attendu"); return pos(Te, "Te") * Math.pow(2 / (2 - eps), 0.25); }   // one layer absorbing ε of the infrared
  const absorptionDe = (Ts, Te) => 2 - 2 * Math.pow(pos(Te, "Te") / pos(Ts, "Ts"), 4);        // the ε that gives Ts; > 1 means one layer is not enough
  const hRad = (T, eps = 1) => 4 * eps * SIGMA * pos(T, "T") ** 3;                             // W·m⁻²·K⁻¹, linearised around T
  function echangePlans(T1, T2, e1 = 1, e2 = 1) {                  // net flux between two large parallel grey planes, W·m⁻²
    if (!(e1 > 0 && e1 <= 1 && e2 > 0 && e2 <= 1)) err("0 < ε ≤ 1 attendu"); return SIGMA * (pos(T1, "T1") ** 4 - pos(T2, "T2") ** 4) / (1 / e1 + 1 / e2 - 1);
  }

  const api = Object.freeze({ M, densite, distance, diametre, lambdaTh, regime,
    pression, vQuadratique, adiabatique, boite, avance, mesure, energie, energieX, temperature, gammaEffectif, direction,
    A_RAD, SIGMA, rayonnement, pvSurU, etoile,
    melange, choc, energies, wvcm,
    nombre, volumeMolaire, Z, cinetique,
    AIR_SEC, facteur, nSurN0, separation, forceDeDensite, centrifugeuse, separationCentrifuge,
    LJ_AR, lj, r0, gaz2D, metropolis, energiePaires, voisins, dense, extraction,
    f1, fluxAuDela, maxwell, vitesses, auDela, isotrope, normes,
    GAMMA_MES, degres, gammaDe, fDe, cvMolaire, cvMassique, DIATOMIQUES, niveaux, eVib, cVib, gammaDiatomique,
    oscillateurs, langevin, moyennes, thetaQuadratique, bruitInductance, johnson, R0, gammaRad, sectionEfficace, rayleigh, planck, bilan,
    energieJusqua, eMoyenne, serie, xPic, brownien, pasExact, msd, perrin,
    frappe, hertzKnudsen, evaporationEau, A_RICHARDSON, CATHODES, richardson, droiteRichardson, W_H, saha, fractionIonisee, tDemi,
    arrhenius, facteurDix, reaction, einstein, temperatureDe,
    survie, vols, attente, SIGMA_C, libreParcours, vRel, parcours, vDerive, mobilite, deriveTheorie, derive,
    conductiviteIonique, chambre, dLibre, dEinstein, einsteinSim, KAPPA_MES, kappaLibre, kappaGaz, conductionPlaques,
    dent, cliquetBrownien, pasCliquet, vitesseCliquet, cliquetMoteur, omega461, sautsCliquet,
    gaz, evoluer, renverser, copieGaz, positionsGaz, ecartGaz, energieGaz, melangeGaz, entropieMelange,
    lnC, queue, ecartRelatif, ehrenfest, pasEhrenfest, retourMoyen, landauer,
    CRITIQUE, ISO_P, ISO, B_MES, EAU_293, vdwCritique, critiqueVdw, racinesVdw, zVdw, coeffsVdw, isotherme, zMesure, pMesure,
    bMesure, boyle, bVdw, boyleVdw, bReduit, bLJ, ajusteLJ, zViriel, zVirielP,
    DET, JT0, INVERSION_0, ISENTHALPES_N2, INVERSION_N2, CRITIQUE_LEGERS, SAT_N2, detente, jouleMesure, jouleVdw, entropieJouleVdw,
    muVdw, muViriel, muVdw0, inversionVdw, inversionVdwP, jt0, inversion0, tdbLJ, inversionLJ, tIsenthalpe, linde,
    DIFFUSIVITE, LAMBDA, R_SURFACE, fourier, tempsDiffusion, nombreFourier, entropieConduction, plaque, fluxPlaque,
    rPlan, rCylindre, rSerie, rParallele, mur, profondeur, ondeThermique, retardOnde, vitesseOnde, echelon, gradientEchelon, ageKelvin,
    newton, biot, tauNewton, refroidissement, mAilette, ailette, fluxAilette, rendementAilette, efficaciteAilette,
    planckLambda, planckNu, X_WIEN, B_WIEN, wien, wienNu, stefan, fractionBande, PLANETES, T_SOLEIL, temperatureEquilibre, serre, serreGrise,
    absorptionDe, hRad, echangePlans });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Statistique = api;
})(typeof self !== "undefined" ? self : this);

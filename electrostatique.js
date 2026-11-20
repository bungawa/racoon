/* Électrostatique — the calculations shared by the world « Électrostatique » (Feynman vol. II, chap. 4 onwards).
   Pure, no DOM, UMD (global Electrostatique). SI throughout: m, C, N, V, V·m⁻¹. Every function is a model: its domain is in the comment.
   Constants come from constantes.js; derivatives and line integrals from analyse-vectorielle.js (AnaVec); the delay L/(c Δt)
   from lecons/champs-em.js (ChampsEM). They are not copied here.

   Charges: an array [{ q, x, y, z }] of point charges (z default 0). Points: p = [x, y] (the plane z = 0) or [x, y, z].
   A field returned for a point of the plane has two components: it is the field in that plane, exact when every charge is in it.

   Étape « Loi de Coulomb et potentiel » (§4-1 to §4-4)
     regime(L, T, v)            { retard, magnetique } : L/(c T), the size of the system against the path of light during the
                                time T of the observation, and (v/c)², magnetic against electric force between charges moving at v.
                                Both small ⇒ electrostatics. ChampsEM.instantaneite for the first.
     vitesseElectron(U)         speed of an electron accelerated from rest through U volts (relativistic), m·s⁻¹.
     SYSTEMES                   { id: { L, T, v } } : four described systems for the lesson « Les lois de l'électrostatique ».
     champ(charges, p)          E at p, (4.13): Σ K q (p − p_j)/|p − p_j|³. NaN on a charge.
     contributions(charges, p)  the field of each charge alone, same order: their vector sum is champ (superposition).
     force(charges, i)          force on charge i from all the others, N: q_i × the field of the others (Coulomb, (4.9), summed).
     potentiel(charges, p)      φ at p, (4.24): Σ K q/|p − p_j|, zero at infinity. NaN on a charge.
     baguette(Q, L, n)          n point charges Q/n at the middles of n equal pieces of the segment [−L/2, L/2] of the x axis:
                                a thin uniformly charged rod, discretised (the midpoint rule of (4.16)).
     baguetteExacte(Q, L, p)    { E: [ex, ey], phi } of that rod (λ = Q/L) at the point p of the plane, closed form:
                                Ex = Kλ (1/r₊ − 1/r₋), Ey = Kλ/y ((x + L/2)/r₋ − (x − L/2)/r₊), r₋ and r₊ the distances to the
                                ends −L/2 and +L/2; φ = Kλ (asinh((x + L/2)/|y|) − asinh((x − L/2)/|y|)). NaN on the rod.
     travail(charges, chemin, n) −∫ E·ds along chemin(t), t from 0 to 1, n chords (AnaVec.circulation): the work per coulomb
                                received to carry a charge, (4.19), in V. Equals φ(b) − φ(a) for any path that avoids the charges.
     CHEMINS                    paths from a to b, t ∈ [0, 1] → point of the plane:
       droit(a, b)              the segment.
       arcRayon(a, b, o)        an arc of the circle of centre o through a, until the direction of b, then along the radius:
                                Feynman's path of §4-3 (the arc costs no work in the field of a charge at o).
       detour(a, b, c)          a parabolic arc (quadratic Bézier) with control point c.
       boucle(ch1, ch2)         ch1, then ch2 run backwards: a closed path when both join the same two points.
     champPuissance(charges, p, n, r0)  a central field K q/r0² (r0/r)ⁿ r̂, a toy law: n = 2 is Coulomb, whatever r0 (m).
                                Radial and spherically symmetric for any n: its curl is zero, its flux through a sphere is
                                Q_int/ε0 only for n = 2.
     fluxSphere(F, c, R, n)     outward flux of a field of space F([x, y, z]) → [Fx, Fy, Fz] through the sphere (centre c, radius R),
                                midpoint rule in cos θ and φ (n × 2n cells): V·m for E.

   Étape « Théorème de Gauss en électrostatique » (§4-5 to §4-8)
     angleSolideRectangle(x1, x2, y1, y2, h)  solid angle (sr) of the rectangle [x1, x2] × [y1, y2] of the plane z = h, seen
                                from the origin; signed as h (positive when the face is above the point). Exact (closed form).
                                h = 0: 0, or NaN when the point is on the rectangle.
     fluxCubeExact(q, s, c, a)  { faces: [+x, −x, +y, −y, +z, −z], total } : outward flux (V·m) of a point charge q at s through
                                each face of the cube (centre c, side a), K q Ω. Same order as AnaVec.fluxCube. NaN on a face.
     champRadial(Qr, p, c)      the field of a spherically symmetric charge, centre c (default the origin): K Qr(r)/r² r̂, Qr(r) the
                                charge inside the radius r. Gauss on the concentric sphere, (4.39) when Qr is constant.
     BOULES.uniforme(Q, R), BOULES.parabolique(Q, R)   { rho(r), charge(r) } : a ball of total charge Q, radius R, density
                                uniform, or ρ0 (1 − r²/R²) (smooth at the surface).
     fluxSurVolume(F, c, a, n)  outward flux of F through the cube (centre c, side a) divided by a³: tends to ∇·E as a → 0, (4.38).
     bouleDiscrete(Q, R, n, c)  the uniform ball as 2n³ equal point charges, one at the centre of each cell of equal volume
                                (n shells in r³, n bands in cos θ, 2n sectors in φ): the field is then a Coulomb sum, no Gauss.
     fluxCalotte(q, alpha)      flux of q alone through a cap of half-angle alpha around it: q (1 − cos α)/(2 ε0), exact.
     anglesEgalFlux(N)          the N half-angles α_k, (1 − cos α_k)/2 = (k + ½)/N: N cones that each carry q/(N ε0).
     angleArrivee(q1, q2, alpha) where the line that leaves q1 at alpha from the axis toward q2 reaches q2, measured from the axis
                                toward q1: q1 (1 − cos α) = −q2 (1 − cos β), conservation of flux along the tube of revolution.
                                Charges on one axis only. NaN when the line does not end on q2 (same signs, or it escapes).
     suivreLigne(charges, i, alpha, o)  { points, fin, angle } : the field line that leaves charge i at angle alpha from the
                                direction o.u (default [1, 0]), traced in the plane from the distance o.r0; stops within o.r0 of
                                another charge (fin = its index, angle = arrival angle from the direction toward charge i) or
                                farther than o.loin (fin = −1). o.ds, o.n: step and number of steps.

   Étape « Équilibre et stabilité des charges » (§5-1 to §5-4)
     tourbillon(om, c)          p ↦ om ẑ ∧ (p − c), V·m⁻¹ for om in V·m⁻²: divergence 0 everywhere, curl 2 om ẑ. Added to a
                                Coulomb field, it changes no flux and every circulation: Gauss alone does not fix E.
     hessien(charges, p)        3 × 3 matrix of the second derivatives ∂i∂j φ at the point p of space, V·m⁻², closed form
                                Σ K q (3 d_i d_j − r² δ_ij)/r⁵. Its trace is ∇²φ = 0 off the charges (Laplace). NaN on a charge.
     raideurs(charges, q, p)    principal stiffnesses of the potential energy U = q φ of a test charge q at p (N·m⁻¹):
                                { valeurs: [k1 ≤ k2 ≤ k3], axes, trace }. k > 0: restoring along that axis; k < 0: pushes away.
                                Needs Tenseurs (tenseurs.js), loaded only when called.
     ARRANGEMENTS               { id: (Q, a) → charges } : charges Q at the distance a from the origin, which is an equilibrium
                                point by symmetry: triangle (3, plane z = 0), carre (4, plane z = 0), cube (8 corners), axe (2,
                                on the z axis, the tube of Fig. 5-2).
     images(charges)            the charges and their images in a grounded conducting plane z = 0: −q at (x, y, −z). Exact for
                                charges above the plane (z > 0); the field is then that of the list, for z ≥ 0.
     equilibrePlan(Qs, H, q)    height z0 ∈ ]0, H[ where a test charge q on the axis, under a fixed charge Qs at height H (sign
                                opposite to q), above the grounded plane z = 0, feels no force. Bisection. NaN if no zero.
     energiesPlan(sources, q, p0)  { figee(p), libre(p), raideursFigees, raideursLibres } : the potential energy (J) of q at p,
                                from its value at p0, above the grounded plane with fixed charges sources (z > 0).
                                figee: the induced charges stay where they were with q at p0 (the image −q at p0 mirrored);
                                libre: they follow q (image at p mirrored, energy −K q²/(4 z), half the interaction with it).
                                libre ≤ figee, equal at p0 with the same slope: letting the charges move only lowers the energy.
     thomson(Q, R)              an electron at rest inside a uniform ball of charge Q, radius R (Thomson, 1904): restoring force
                                −k r, { k = K e Q/R³ (N·m⁻¹), omega (rad·s⁻¹), lambda = 2π c/ω (m) }.
     RAYON_CLASSIQUE            r_e = K e²/(m_e c²), m.
     dureeEffondrement(r0)      r0³/(4 r_e² c) : time for an electron on a circular orbit of radius r0 around a proton to
                                spiral in, radiating as Larmor says (non-relativistic, orbits stay nearly circular), s.
     rayonOrbite(r0, t)         (r0³ − 4 r_e² c t)^(1/3), m; 0 after the collapse.
     toursAvantEffondrement(r0) number of turns on the way in: ∫ dt/T(r) = r0^(3/2) √(K e²/m_e) / (4π r_e² c).
     energieAtome(a)            { cinetique: ħ²/(2 m_e a²), potentielle: −K e²/a, totale } (J): an electron confined to a size a
                                around a proton, momentum ≈ ħ/a (uncertainty, order of magnitude). Minimum at rayonOptimal().
     rayonOptimal()             ħ²/(m_e K e²) = a0, m.
   Étape « Calculer un champ par le théorème de Gauss » (§5-5 to §5-7)
     champFil(lambda, r)        λ/(2π ε0 r), (5.2): the field of an infinite straight line of charge λ (C·m⁻¹) at the distance r.
     filFini(lambda, L, r)      the field of a segment of length L on its perpendicular bisector, at the distance r, closed form:
                                champFil × (L/2)/√(r² + L²/4). Its gap to (5.2) is 1 − 1/√(1 + 4r²/L²) ≈ 2 r²/L².
     coaxial(U, a, b)           { lambda, champ(r) } : two coaxial cylinders of radii a < b at the potential difference U (inner
                                one positive for U > 0), infinitely long: λ = 2π ε0 U/ln(b/a), E = U/(r ln(b/a)) between them,
                                0 inside the inner conductor and outside the outer one.
     champPlans(plans, z)       Ez at height z of infinite planes [{ sigma, z }] parallel to z = 0: Σ sgn(z − z_i) σ_i/(2 ε0),
                                (5.3) summed; (5.5) and (5.6) for ±σ. NaN on a plane.
     disqueAxe(sigma, a, z)     Ez on the axis of a disk of radius a, charge σ per m², at the signed height z: sgn(z) σ/(2 ε0)
                                (1 − |z|/√(z² + a²)), exact, written without cancellation. → (5.3) for |z| ≪ a, K Q/z² far away.
                                NaN on the disk (z = 0).
     disquesAxe(disques, z)     the sum for coaxial disks [{ sigma, a, z }]: two finite plates of a capacitor, on their axis.
     BOULES.coquille(Q, R1, R2) { rho, charge } : a shell of charge Q, uniform between R1 and R2 (0 ≤ R1 < R2). R1 = 0 is the
                                uniform ball, R1 → R2 the thin shell of §5-7.
     champSubi(B, R, n)         the field that the charge of a spherical distribution B (charge(r), total at R) feels, averaged
                                over that charge: (1/Q) ∫ K Q(r)/r² dQ(r), n slices. Thin shell: K Q/(2R²) = σ/(2 ε0), half of
                                the field just outside; uniform ball: 3/4 of it.
     pressionElectrostatique(sigma)  σ²/(2 ε0), Pa: the outward force per unit area on a thin charged layer, σ × the field of
                                the other charges, which is the mean of the fields on both sides.
     coquilleDiscrete(Q, R, N, c)  N equal point charges spread on the sphere (centre c, radius R) along a Fibonacci spiral: a
                                thin shell, discretised; its field inside is a Coulomb sum, no Gauss.
   Étape « Conducteurs en équilibre et cavités » (§5-8 to §5-10)
     spheresReliees(a, b, d, V, tol)  two conducting spheres, radii a and b, centres at x = 0 and x = d (> a + b), joined by a thin
                                wire at the potential V (wire's own charge neglected), by successive Kelvin images until the new
                                images carry less than tol (default 10⁻¹³) of the first: { charges1, charges2, charges, Q1, Q2,
                                surface(k, θ) → [En, Et] (V·m⁻¹, just outside sphere k at the angle θ from the direction toward
                                the other one), sigma(k, θ) = ε0 En, (5.8) }. Far apart: Q = 4π ε0 R V, σ ∝ 1/R.
     coquilleCavite(o)          o = { a, b, Qc, q, s, Q, D }: a spherical conducting shell (cavity radius a, outer radius b, net
                                charge Qc), a charge q in the cavity at x = s (|s| < a), a charge Q outside at x = D (|D| > b).
                                Kelvin images, exact: { dedans, dehors (the charges that give the field in the cavity and outside),
                                V0 (the metal's potential), Qcentre, champ(p), potentiel(p), surfaceInt(θ), surfaceExt(θ)
                                ([radial, tangential] on the vacuum side), sigmaInt(θ), sigmaExt(θ) }. θ from the +x axis.
                                The cavity field depends on q and s only; the outside one on Qc + q, Q and D only.
     chargeSurface(sigma, R, n) ∫ σ(θ) dA on the sphere of radius R for an axisymmetric σ, n bands of equal area (C).
     potentielCoquillePuissance(Q, R, r, n, r0)  potential (V) at the distance r from the centre of a thin uniform shell (Q, R)
                                under the toy law of champPuissance (1 < n < 3), closed form; K Q/max(R, r) for n = 2.
     penteCavendish(a, b)       M in qa/qb ≈ M δ: two concentric thin conducting spheres a < b joined by a wire, the force in
                                1/r^(2+δ); the inner one keeps a charge proportional to δ. Exact derivative at δ = 0, dimensionless.
     cavendish(a, b, delta)     qa/qb for that δ: exact (closed-form potentials) for |δ| ≥ 10⁻⁶, M δ below (error of order δ).

   Étape « Potentiel et dipôle » (§6-1 to §6-5)
     relaxation(o)              Poisson's equation (6.6) on a square grid, successive over-relaxation (SOR): o = { nx, ny, h (m),
                                fixe(i, j) → imposed potential (V) or null, rho(i, j) → C·m⁻³ (default 0), omega, tol (V), max,
                                phi0 (rows, a start) }. Every border cell must be imposed. Returns { phi (ny rows of nx values),
                                iterations, residu }: residu = max |mean of the 4 neighbours + h²ρ/(4ε0) − φ| over the free cells, V.
                                Discretisation error of order h² × the fourth derivatives of φ; exact discrete mean-value property.
     paireDipole(q, d, u)       charges +q and −q at ±(d/2) û about the origin (û: 2 or 3 components, default ẑ): p = q d û.
     potentielDipole(p, P, o)   (6.13): K p·r/r³, r = P − o (o default the origin). Point dipole: exact for d → 0 at fixed q d.
     champDipole(p, P, o)       −∇ of it: K (3 (p·r̂) r̂ − p)/r³, same dimension as P.
     composantesDipole(p, r, theta)  { Ez, Eperp } of (6.14) and (6.15), p along z, θ from z.
     moments(charges, o)        { Q, p: [px, py, pz], quad: Q_ij = Σ q (3 d_i d_j − d² δ_ij) } about o (default the origin), (6.26).
     potentielMultipole(m, P, ordre, o)  the series (6.25): ordre 0 = K Q/R, 1 adds K p·R/R³, 2 adds K Σ Q_ij R_i R_j/(2 R⁵).
     spheresDecalees(rho, a, s) two uniform balls ±ρ of radius a, the positive one displaced by s along z: { sigma0 = ρ s (σ ≈ σ0 cos θ,
                                first order in s/a), p = (4/3) π a³ ρ s, Eint = −ρ s/(3 ε0) (uniform in the overlap, exact) }.
     baseTournee(angle)         the axes x', y', z' turned by angle (rad) about z: three unit vectors.
     changerBase(v, base)       the components of v on an orthonormal base (checked to 10⁻⁹).
     MOLECULES                  point-charge models: eau (H at 95,7 pm, angle 104,5°, charges fitted to the measured 1,8546 D),
                                co2 (O at ±116 pm, charges fitted to the measured quadrupole Θ = −4,1 × 10⁻²⁶ statC·cm²). Models:
                                only the moments they were fitted to are measured values.

   Étape « Méthode des images » (§6-6 to §6-9)
     anneau(R, z0, rho, z)      potential per coulomb (V·C⁻¹) at (rho, z) of a thin ring of radius R in the plane z = z0, axis z:
                                K/(s · AGM(1, √(1 − m))), s² = (ρ + R)² + (z − z0)², m = 4ρR/s² (complete elliptic integral by the
                                arithmetic-geometric mean). Exact for an infinitely thin ring; NaN on the ring.
     PROFILS                    meridians t ∈ [0, 1] ↦ [ρ, z] of bodies of revolution about z, from the pole z > 0 (t = 0) to the
                                other (t = 1): sphere(a); ellipsoide(a, b) (half-axis a along z, b across); cacahuete(a, e):
                                r(θ) = a (1 + e cos 2θ), pinched at the equator (concave waist for e ≳ 0,2).
     conducteurRevolution(profil, n, m)  a thin conducting surface of revolution cut into n bands of equal arc length, each with
                                a uniform σ; the potential is imposed at the middle of each band (collocation).
                                { bandes: [{ rho, z, s, w, aire }], longueur, G (n × n, V·C⁻¹), potentiels(q) (V at the middles),
                                correction(q, V) (one sweep of Gauss–Seidel: each band in turn gets the charge that puts its middle
                                at V, the others as they are: the trial and correction of §6-6), charges(V) (the direct solution, C),
                                capacite (F), sigma(q) (C·m⁻²) }. m (odd, default 7) sub-rings per band; the sub-ring through the
                                point itself is a strip of width w/m, K q (ln(16ρm/w) + 1)/(πρ). Discretisation error of order 1/n:
                                sphere, n = 80: capacity to 1,3 × 10⁻⁴, σ uniform to 0,3 %; ellipsoid 5 : 1, σ to 0,4 %.
     ellipsoideExact(a, b, Q)   prolate conducting ellipsoid (a ≥ b), charge Q, exact: { capacite = 4π ε0 a x/atanh x
                                (x = √(a² − b²)/a; 4π ε0 a for the sphere), potentiel, sigma(rho, z) = Q/(4π a b² √(ρ²/b⁴ + z²/a⁴)) }.
     apollonius(q1, x1, q2, x2) the zero-potential surface of two charges of opposite signs on the x axis: { plan (its x when
                                |q1| = |q2|, else NaN), centre, rayon (a sphere, Apollonius: r2/r1 = |q2/q1|), entoure (1 or 2: the
                                charge inside the sphere, the smaller one) }.
     sigmaPlan(q, a, rho)       (6.29): the charge per m² induced on a grounded conducting plane at the distance rho from the foot
                                of a charge q held at the height a. Exact for an infinite plane, perfect conductor.
     chargeInduitePlan(q, a, R) induced charge inside the disk of radius R around the foot: −q (1 − a/√(a² + R²)); −q for R = ∞.
     forcePlan(q, a)            (6.30): K q²/(2a)², the pull toward the plane (N, > 0), the force of the image.
     forcePlanIntegree(q, a, n) the same force summed ring by ring over the induced charge (6.29), n rings in ρ = a tan α:
                                a check of (6.30) that does not use the image.
     imagesSphere(q, b, a, o)   a charge q at x = b from the centre of a conducting sphere of radius a < b: { charges (q, the image
                                q' = −q a/b at x = a²/b, (6.31), and qCentre at the centre), qImage, xImage, qCentre, Q (net charge
                                of the sphere), V (its potential) }. o.mode: "terre" (V = 0, qCentre = 0), "isolee" (net charge o.Q,
                                default 0: qCentre = o.Q − q', (6.32) for o.Q = 0), "potentiel" (o.V imposed). Exact, outside the sphere.
     forceSphere(q, b, a, o)    force on q along the line of centres, N, > 0 when it pushes q away.
     sigmaSphere(q, b, a, o, theta)  ε0 Er just outside the sphere, θ from the direction of q, C·m⁻².
     equilibreSphere(q, a, Q)   the distance b > a where q feels no force from an insulated sphere of charge Q of the same sign
                                (repelled farther, attracted closer). Bisection; NaN for opposite signs.
     schottky(E)                an electron at the distance x outside a flat metal, applied field E (V·m⁻¹) pulling it out:
                                { energie(x) = −K e²/(4x) − e E x (J, from the electron at rest just out of the image's reach),
                                x0 = √(K e/(4E)) (the top of the barrier, m), abaissement = √(K e³ E) (J) }. Image of (6.30):
                                valid while x0 is much larger than the distance between atoms (E ≲ 10⁹ V·m⁻¹ gives x0 ≳ 0,6 nm).

   Étape « Condensateur plan et claquage » (§6-10 to §6-12)
     capacitePlan(A, d)         (6.34): ε0 A/d, F. Plates large against d, field uniform up to the edge.
     kirchhoff(a, d)            two thin coaxial disks of radius a at the distance d (Kirchhoff, 1877): ε0 π a²/d + ε0 a (ln(16π a/d) − 1),
                                the first two terms of the expansion in d/a; next term of relative order (d/a)² ln²(d/a).
     condensateurDisques(a, d, n, m)  the same two disks at ±U/2, solved: each disk cut into n flat rings (finer toward the edge),
                                σ uniform on each, potential imposed at the middle of each ring (collocation). { capacite (F),
                                ideale (6.34), kirchhoff, bords, milieux (radii, m), sigma (C·m⁻² per volt, ring by ring),
                                sigmaIdeale = ε0/d, potentiel(rho, z) (V per volt, the disks at z = ±d/2) }. Defaults n = 60, m = 5
                                sub-rings. Capacity within 10⁻³ of the asymptotic series for 0,01 ≤ d/a ≤ 10; → 4 ε0 a for d ≫ a.
     champsSpheresReliees(a, b, d, V)  { Ea, Eb (largest normal field on each sphere, V·m⁻¹), rapport = Eb/Ea, rapport635 = a/b
                                (6.35), Q1, Q2 }: the spheres of spheresReliees, exact; (6.35) neglects their influence on each other.
     AIR                        { A, B, gamma }: Townsend's α = A p exp(−B p/E) for air, A = 11,25 (Pa·m)⁻¹, B = 273,75 V·(Pa·m)⁻¹,
                                fitted for E/p from 45 to 750 V·(Pa·m)⁻¹; γ = 0,01, a typical secondary emission (model parameter).
     townsendAlpha(E, p, o)     ionising collisions per metre of an electron in a gas at the pressure p (Pa), field E: A p e^(−Bp/E).
     libreParcours(p, o)        1/(A p), m: the mean distance between collisions in that model.
     paschen(pd, o)             breakdown voltage (V) of a gap d (m) at the pressure p, uniform field: B pd/(ln(A pd) − ln ln(1 + 1/γ)),
                                Townsend's criterion α d = ln(1 + 1/γ). NaN left of the curve's asymptote (no breakdown by avalanche).
     paschenMinimum(o)          { pd = e ln(1 + 1/γ)/A, V = B pd }: the bottom of the Paschen curve.
     champPointe(L, rho, V)     a needle as a prolate conducting ellipsoid of half-length L and tip radius of curvature rho, isolated, at
                                the potential V: { E (field at the tip, V·m⁻¹) = V x/(ρ atanh x), x = √(1 − ρ/L), k = V/(ρ E) ≈ ½ ln(4L/ρ),
                                b = √(Lρ) (half-width) }. Exact for the ellipsoid; a real shank is a cone.
     barriereSN(F, phi)         x ↦ φ e − e F x − e²/(16π ε0 x), J: the energy above the Fermi level of an electron at x outside a flat
                                metal (work function phi, eV) in the field F (V·m⁻¹): triangle plus image, (6.30), the Schottky–Nordheim barrier.
     exposantWKB(F, phi, n)     2 ∫ √(2 m_e U) dx/ħ across that barrier at the Fermi level (n points), dimensionless; 0 when F lowers
                                the top below the Fermi level.
     fowlerNordheim(F, phi)     { f = e F/(4π ε0 φ²) (φ in eV: the barrier lowering squared over φ², < 1), v (exponent / triangle's),
                                t = v − (4/3) f dv/df, triangle = b φ^(3/2)/F, exposant, J = a F²/(φ t²) e^(−v b φ^(3/2)/F) (A·m⁻²),
                                Jtriangle (no image) }. a = e³/(8π h), b = 8π √(2 m_e)/(3 e h) (A_FN, B_FN, from h, e, m_e).
                                Electrons from the Fermi level at 0 K, free-electron metal: valid for f ≲ 0,8 at room temperature;
                                J NaN for f ≥ 1 (no barrier).

   Étape « Énergie électrostatique et densité d'énergie » (§8-1, §8-5, §8-6)
     energiePaires(charges)     (8.3): Σ over pairs K q_i q_j/r_ij, J. The work to bring the charges from infinity, each one a point
                                that already exists: the self-energy of each charge is not in it. NaN when two charges coincide.
     energieAssemblage(B, R, n) (8.4) summed: ∫ K Q(r) dQ(r)/r, J, for a spherical distribution B ({ charge(r) }, total at R), built
                                shell by shell from the centre, n slices (midpoint in Q). Uniform ball: (8.7); thin shell: K Q²/(2R).
     energieBoule(Q, a)         (8.7): (3/5) K Q²/a, J. The uniform ball, exact for a smooth density.
     profilEnergie(B, R, n)     where the energy is, for a spherical distribution B (rho(r), charge(r)), n slices of [0, R]:
                                { total (J, (8.30)), potentiel(r) (V), densiteChamp(r) = ε0 E²/2 × 4π r² and densiteRhoPhi(r) =
                                ρ φ/2 × 4π r² (J·m⁻¹: the energy per metre of radius), champ(r) and rhoPhi(r) (J: the energy inside
                                the radius r by each of the two densities) }. rhoPhi(R) = champ(∞) = total; champ(r) = total −
                                K Q²/(2r) for r ≥ R: the field outside r holds K Q²/(2r). surface(r) = φ(r) Q(r)/2 (J), the surface
                                term ε0/2 ∮ φ E·n dA on the sphere of radius r: rhoPhi(r) = champ(r) + surface(r). Trapezoids,
                                error of order 1/n².
     energieHorsRayon(q, r)     ∫ from r to ∞ of (8.36): K q²/(2r), J, the energy in the field of a point charge outside the radius r.
     rayonElectromagnetique(m, f, q)  the radius a where f K q²/a = m c² (q default e): f = ½ for the charge on a thin shell,
                                3/5 for a uniform ball; f = 1 gives r_e for the electron. m. A classical estimate, not a measured size.
     densiteCroisee(c1, c2, p)  ε0 E1·E2 at p (J·m⁻³), c1 and c2 two point charges { q, x, y, z }: the term of ε0 E²/2 that
                                depends on both. NaN on a charge.
     energieCroisee(q1, q2, d, n)  ε0 ∫ E1·E2 dV over all space, J, in prolate spheroidal coordinates around the two charges at the
                                distance d (n × n cells, midpoint): K q1 q2/d to 1/n, the pair energy of (8.3), found in the field.
   Étape « Méthodes de calcul du champ » (§7-1 to §7-5)
     PROFILS.cylindre(a, h)     the closed can (radius a, height h) as a meridian for conducteurRevolution, arc length ∝ t.
     capaciteDisque(a)          8 ε0 a, F: the thin conducting disk, exact (the flat limit of the oblate ellipsoid).
     boite(a, h, n)             the closed can at 1 V, by conducteurRevolution (n bands, default 120): { capacite, disque (the disk
                                it contains), sphereCirconscrite (the sphere that contains it), sphereVolume (the sphere of the same
                                volume: least capacity, Poincaré), longueur, bandes: [{ s, rho, z, sigma (C·m⁻² per volt) }] }.
                                Capacity converged to 10⁻³ at n = 120 for 0,1 ≤ h/2a ≤ 5; σ peaks at the rims (edge singularity).
     coin(beta)                 F(z) = z^(π/β): the field in a conducting wedge whose vacuum region |θ| ≤ β/2 opens by β (0 < β ≤ 2π),
                                metal at |θ| ≥ β/2, potential 0 on it. { p = π/β, exposant = p − 1 (|E| ∝ r^(p−1)), F(x, y) → [U, V],
                                dF(x, y) → [Re F′, Im F′], metal(x, y) }. NaN inside the metal. Exact, two dimensions.
     PLANS                      carre (β = π/2, z², (7.5)–(7.6), inside corner and quadrupole), plan (β = π), deuxTiers (β = 3π/2,
                                (7.13), outside corner), racine (β = 2π, (7.11)–(7.12), edge of a thin plate along x < 0),
                                ligne (ln z, (7.14), a line charge), dipole (1/z, (7.15)). Same fields as coin.
     champPlan(f, A, x, y)      { U, V, phi = A U (V), E = −A conj(F′) = [−A Re F′, A Im F′] (V·m⁻¹ for x, y in m), norme }.
     feuillets(o)               the one-dimensional cold plasma as N sheets of electrons on a uniform ion background, periodic box of
                                length 1, time in units of 1/ω_p (ω_p from Ondes.pulsationPlasma). o = { N (64), mode (1), kA (0,5),
                                duree (6π), pas (0,01), echantillon (0,05) }: at t = 0, s = 0 and v = (kA/k) sin k x0, so k s_max = kA.
                                The field on each sheet is Gauss's (the charge on its left), not (7.21); leapfrog. { t, s (rows of
                                displacements), x0, mode (the density mode −(2/kN) Σ cos k x_j), periode (from the zeros of mode),
                                croisement (first time two sheets cross, NaN if never) }. Without crossing (kA < 1) the motion is
                                exactly harmonic at ω_p; beyond, the wave breaks.
     longueurDebye(T, n0, o)    √(εr ε0 k T/(especes n0 (z e)²)), m: (7.35) for o = { epsr: 1, z: 1, especes: 2 } (a 1:1 salt, n0
                                ions of each sign per m³); especes = 1 for the electrons of a plasma.
     gouyChapman(sigma, T, n0, o)  the exact solution of (7.31) for a plane of charge σ (C·m⁻²) in a 1:1 salt, o.epsr: { D, phi0
                                (Grahame: σ = √(8 n0 ε k T) sinh(e φ0/2kT)), phi0Lineaire = σ D/ε (7.40), gamma = tanh(e φ0/4kT),
                                thermique = kT/e, phi(x) = (4kT/e) atanh(γ e^(−x/D)), phiLineaire(x) (7.36), nPlus(x), nMoins(x) }.
                                Point ions, continuous ε, no Stern layer: valid for D ≫ ion size (≈ 0,3 nm), c ≲ 0,1 mol·L⁻¹.
     dlvo(R, H, sigma, T, n0, o)  two equal spheres of radius R, Hamaker constant H (J), at the gap h, Derjaguin: { U(h) = 64π R n0 k T
                                γ² D² e^(−h/D) − H R/(12 h) (J), barriere { h, U } (U = 0 if none), D, gamma, phi0 }. Weak overlap
                                (h ≳ D) and h ≪ R; a model of the salting out of §7-4.
     grille(lambda, a)          wires of charge λ (C·m⁻¹) at x = m a in the plane z = 0, exact: { E0 = λ/(2 ε0 a), k = 2π/a,
                                potentiel(x, z) = −(λ/4π ε0) ln(2 cosh kz − 2 cos kx), champ(x, z) → [Ex, Ez], harmonique(n, z) =
                                λ e^(−nk|z|)/(2π ε0 n) (the amplitude of cos nkx, (7.44)–(7.45)), serie(x, z, N) (the uniform part and N
                                harmonics), ondulation(z) = 1/sinh(k|z|) ((Ez max − Ez min)/(2 E0)) }. Infinitely thin wires; NaN on one.
     triode(a, r0, d, c)        cathode plane z = −c at 0 V, grid (wires of radius r0, spacing a) at z = 0, anode z = d: { delta =
                                (a/2π) ln(a/(2π r0)), mu = d/δ (the amplification factor), champCathode(Vg, Vp) (V·m⁻¹, Ez),
                                potentiel(Vg, Vp) → (x, z) }. Thin wires (2π r0 < a) and c, d ≳ a: errors of order e^(−2π c/a).

   Étape « Polarisation d'un diélectrique » (§10-1 to §10-4). Linear, isotropic dielectrics: P = χ ε0 E, κ = 1 + χ ≥ 1;
   κ = Infinity is a conductor (E = 0 inside, P = σ_free: its induced charges). Plates infinite: one dimension, x from the + plate.
     couches(sigma, [{ e, kappa }])  plane layers between plates ±sigma (C·m⁻²), from the + plate: { couches: [{ x0, x1, e, kappa,
                                E = σ/(κ ε0), P = σ (1 − 1/κ), D = σ }], faces (bound charge per area on the n + 1 faces: −P0, P_(i−1) −
                                P_i, P_(n−1); sum 0), V (per plate area: V), d, capacite = ε0/Σ(e/κ) and vide = ε0/d (F·m⁻²), rapport }.
                                (10.3) for a conducting slab, (10.10) for a full dielectric.
     profilDielectrique(sigma, k, d, n)  the same with κ(x) a function on [0, d], n slices: { x, kappa, E, P, D, xm (middles), rho
                                (−dP/dx on each slice, C·m⁻³, (10.16)), V (trapezoids), capacite, vide, gauche = −P(0), droite = P(d) }.
     chargesDeplacees(P, x0, x1, Nq, bords)  the bound charge counted, not derived: a slab [x0, x1] of fixed negative charge −Nq per m³
                                and positive charge +Nq shifted by δ(u) = P(u)/(Nq) from its rest u; the net charge per area (C·m⁻²) in each
                                bin [bords_i, bords_(i+1)]. Needs 1 + dδ/du > 0. Use an exaggerated δ (Nq small): a real δ ≈ 10⁻¹⁶ m is
                                lost in the doubles.
     atomeNuage(E, a, Z, N)     nucleus +Ze in a uniform spherical cloud −Ze of radius a (thomson): { delta = 4π ε0 a³ E/(Z e) (m), relatif
                                = δ/a = E/Eatome, alpha = 4π ε0 a³ (C·m²·V⁻¹), p (C·m), Eatome = K Z e/a² }, and with N atoms per m³:
                                P = N p, (10.4), and chi = N α/ε0 (dilute: no field of the neighbours). Valid for δ < a.
     chargeDielectrique(q, k, R)  a point charge q at the centre of a dielectric ball of radius R: { lieeCentre = −q (1 − 1/κ) (around q),
                                lieeSurface = −lieeCentre, apparente = q/κ, champ(r), deplacement(r) = q/(4π r²) }.

   Étape « Le champ électrique de l'atmosphère » (§9-1 to §9-3). E0 is the magnitude of the fair-weather field, directed
   downward (the potential rises upward): E0 > 0 means a negative ground. z is the height above the ground, m.
     chargeTerre(E0, R)         { sigma = −ε0 E0 (C·m⁻²), Q = 4π R² σ } : Gauss at the surface of a conducting Earth of radius R
                                (default Constantes.R_E_mean), the field taken uniform over it.
     pieceAuSol(h, b)           a grounded conductor of height h and half-width b ≤ h standing on a flat conducting ground in the
                                uniform field E0: half a prolate spheroid (b = h: the hemisphere). Exact (the ground is its plane of
                                symmetry). { renfort = E at the top/E0 = 1 − ξ0 Q1'(ξ0)/Q1(ξ0), ξ0 = h/f, f = √(h² − b²) (3 for
                                the hemisphere, → ∞ as b/h → 0), foyer f, xi0, potentiel(x, z) per V·m⁻¹ of E0 (multiply by E0),
                                0 on the conductor and on the ground, → z far away }. Legendre Q1 by its series in 1/ξ² for ξ ≥ 4.
     moulinChamp(E0, A, f)      a field mill: an earthed plate of area A uncovered then covered f times per second: { Q = ε0 E0 A (C,
                                the charge induced on it, sign of the ground's surface charge reversed), I = 2 |Q| f (A, mean of the
                                rectified current) }. The plate flush with the ground: no enhancement.
     tempsRelaxation(sigma)     ε0/σ, s: the time in which a charge in a conductor of conductivity σ (S·m⁻¹) leaks away, e^(−t/τ).
     colonne(o)                 the fair-weather column, one dimension, steady: o = { sigmaSol (S·m⁻¹ at the ground), H (scale height
                                of σ, m), VI (ionospheric potential, V), h (depth of a ground layer, m, default 0), f ≥ 1 (σ inside it
                                is the exponential divided by f, default 1) }; σ(z) = sigmaSol e^(z/H) for z < h, f sigmaSol e^(z/H)
                                above. div j = 0 and no horizontal current: j is the same at all heights. { Rc = ∫0^∞ dz/σ (Ω·m²), j =
                                VI/Rc (A·m⁻²), Esol = j/sigmaSol, sigma(z), champ(z) = j/σ(z), potentiel(z), part(z) (fraction of Rc
                                below z), tau = ε0/sigmaSol (= Q/I of the Earth), saut (C·m⁻², the positive charge at z = h where σ
                                jumps) }. The ionosphere is put at infinity: e^(−60 km/H) ≈ 10⁻⁵ for H = 5,5 km.
     CHEMINEES                  three continental thunderstorm centres [{ id, lon (degrees east) }]: Americas −60, Africa 20, Asia 120.
     diurne(o)                  a model of the thunderstorm activity (the generator of the circuit) against Universal Time:
                                o = { regions: [{ lon, poids }] (default CHEMINEES, weights 1), pic (local solar hour of the storms,
                                default 16), largeur (h, default 3: a periodic Gaussian, von Mises), ocean (fraction of the current from
                                storms without a daily cycle, default 0) }. { activite(tu) (mean 1 over a day), heures, valeurs (every
                                5 min), max { tu, v }, min { tu, v }, ecart = (max − min)/2 }. Shapes, not data.

   Étape « Énergie d'un condensateur, cristaux et noyaux » (§8-2 to §8-4)
     forceArmatures(C, d, h)    C a function d ↦ C(d) (F), d the gap (m): { C, dC (dC/dd, central difference of step h, default
                                10⁻⁴ d), parQ(Q) = (Q²/2) d(1/C)/dd (8.14), parV(V) = (V²/2)(−dC/dd) } in N, > 0 for an attraction.
                                At the same state (Q = C V) both are the same force: virtual work, whatever is held fixed.
     bilanDeplacement(C1, C2, o)  the plates move from C1 to C2 slowly, o = { Q } (isolated) or { V } (held by a source): { U1, U2,
                                dU (J), source (work given by the source: 0, or V²(C2 − C1)), forces (work of the electric forces on
                                the conductors = source − dU), operateur = −forces }.
     basculement(k, A, d0)      a plate of area A on a spring k, gap d0 at rest, the other plate fixed, ideal capacitor (6.34):
                                { Vb = √(8 k d0³/(27 ε0 A)) (pull-in voltage), xb = d0/3, force(x, V) (N, toward the fixed plate),
                                equilibres(V) → { stable, instable } (displacement x toward the fixed plate, m; NaN beyond Vb),
                                energie(x, V) = k x²/2 − ε0 A V²/(2(d0 − x)) (J: spring + capacitor + source at fixed V, up to a
                                constant), energieQ(x, Q) = k x²/2 + Q²(d0 − x)/(2 ε0 A), equilibreQ(Q) (NaN past contact) }.
     besselK0(x)                K₀(x) = ∫₀^∞ e^(−x cosh t) dt, trapezoids of step ≤ 0,05 (error ≲ 10⁻¹⁵ relative), x > 0.
     ligneAlternee(rho, x)      the potential of the infinite line of charges (−1)ⁿ q at n a, at the axial position x a and the
                                distance rho a from the line, in units of K q/a: 4 Σ over odd m of K₀(mπρ) cos(mπx). Exact (Fourier
                                series); it falls as e^(−πρ): a neutral row is invisible a few spacings away.
     ligneDirecte(rho, x, N)    the same, summed charge by charge for |n| ≤ N: the error falls only as 1/N (the mean of N and N + 1 as 1/N²). NaN on a charge.
     madelungLignes(R)          rock salt summed row by row (Madelung's way): the row through the ion, 2 ln 2 (8.20), then the
                                parallel rows at the transverse distance ρ ≤ R (units of a), by ligneAlternee. { propre, couches:
                                [{ rho, nombre, signe, terme, cumul }], total } → 1,747 564 6 (10⁻⁶ at R = 5, 10⁻¹⁰ at R = 8).
     madelungSpheres(R)         the same sum over growing spheres |r| ≤ r (r in a, R integer ≤ 40): [{ r, M }]. It does not
                                converge: the shell at r is not neutral (refutation of a naive order).
     EXCES_N, EXCES_H           mass excesses of the neutron and of the hydrogen atom, keV (AME2020).
     MIROIRS                    [{ A, Z, bas, haut, exces: [bas, haut] (keV, AME2020) }], A = 2Z + 1 from 3 to 41: the lower member
                                has Z protons, the upper one Z + 1.
     ecartCoulomb(m)            the Coulomb energy difference of the pair, J: (Δ_haut − Δ_bas) + (m_n − m_p − m_e) c², nuclear forces
                                taken charge-symmetric (the same for both members), atomic binding of the electrons neglected (≲ keV).
     rayonMiroir(m, modele)     the radius R (m) that gives that difference: "boule" (default), Z(Z − 1) → (Z + 1)Z in (8.23):
                                6 Z K e²/(5 ΔE); "dernier", the extra proton outside a ball of Z protons: Z K e²/ΔE.
     energieCoulombNoyau(Z, R)  (8.23): (3/5) Z(Z − 1) K e²/R, J.
     energieLiaison(Z, A, exces)  Z Δ_H + (A − Z) Δ_n − Δ, J: the binding energy of the nucleus from its atomic mass excess (keV).
   Étape « Origine moléculaire de la polarisation » (§10-5, §11-1 to §11-3). α is Feynman's polarizability: p = α ε0 E, in m³
   (4π times the "polarizability volume" of the tables; atomeNuage gives α ε0, in C·m²·V⁻¹).
     lameInseree(o)             o = { L, W, d, kappa }: a slab of thickness d pushed a length x into plates L × W, d apart, edges
                                ignored: { C(x) = ε0 W (κx + L − x)/d (10.31), dC (constant), forceV(V) = (V²/2) dC (10.32),
                                forceQ(Q, x) = (Q²/2) dC/C(x)², energieV(x, V), energieQ(x, Q) } in N and J; force > 0 pulls the slab in.
                                Valid for d ≪ W and x, L − x ≳ a few d (the fringe field is then outside the variation).
     remontee(kappa, E, rho, g) the rise of a dielectric liquid of density rho between vertical plates at field E: ε0 (κ − 1) E²/(2 ρ g),
                                m (g default Constantes.g0). Capillarity is not in it.
     polarisabiliteSphere(R, kappa)  4π R³ (κ − 1)/(κ + 2), m³: a dielectric ball in a uniform field (Laplace, admitted); 4π R³ for a
                                conductor (κ = Infinity), as atomeNuage.
     forceInduite(alpha, Q, r)  a polarizable point (α, m³) at r from a charge Q: { E, U = −α ε0 E²/2, F = −2 α ε0 K² Q²/r⁵ (radial, < 0:
                                toward Q, whatever the sign of Q) }. p induced and parallel to E; size ≪ r.
     coudee(q, L, angle)        three point charges: −2q at the origin, +q at the distance L on each side of the y axis, angle (rad)
                                between the two bonds: { charges, p (C·m, along y) = 2 q L cos(angle/2) }. coudee(dE, …) is
                                MOLECULES.eau; the linear molecule (angle π) has p = 0 whatever q.
     MOLECULES_MESURES          [{ id, p (D), alpha (Å³) }] measured, NIST CCCBDB: dipole moments of the ground state and static
                                polarizabilities; pSI (C·m) and alphaF (m³, Feynman's) added. Symmetric molecules have p = 0 by symmetry.
     ATOMES                     [{ id, Ei (eV, first ionization, CRC), alphaA0 (a0³), alpha (m³ = 4π alphaA0 a0³) }]: H (9/2, exact),
                                He, Ne, Ar, Kr, Xe (Mitroy, Safronova, Clark, J. Phys. B 43, 202001, 2010, table IV, measured).
     oscillateurAtome(Ei, omega)  one electron bound by a spring of frequency ω0 = Ei/ħ (Ei in J): { omega0, lambda0 = 2π c/ω0,
                                alpha = e²/(ε0 m (ω0² − ω²)) } (11.3) and (11.7); omega default 0. Undamped: wrong near ω0.
     kappaGaz(alpha, N)         1 + N α (11.9): a dilute gas, the field of the neighbours neglected (N α ≪ 1).
     langevin(x)                coth x − 1/x (series x/3 − x³/45 + 2x⁵/945 for |x| < 10⁻²): ⟨cos θ⟩ of classical dipoles at x = p0 E/kT.
     densiteOrientation(x, u)   density of u = cos θ on [−1, 1]: x e^(xu)/(2 sinh x) (1/2 for x = 0), from (11.16).
     tirageOrientation(x, n, rand)  n values of cos θ drawn from that density (inverse of its distribution function).
     orientation(p0, E, T, N)   { x = p0 E/(k_B T), moyenne = L(x), lineaire = x/3, P = N p0 L(x), Plin = N p0² E/(3 k_B T) (11.20),
                                chi = N p0²/(3 ε0 k_B T) (11.21) } (P, Plin, chi only with N). Free rotors, classical, no local field.
     debyeGaz(o)                o = { N, alpha, p0 }: κ − 1 = N (α + p0²/(3 ε0 k_B T)), (11.9) + (11.21), at fixed N: { kappa1(T),
                                ordonnee = N α, pente = N p0²/(3 ε0 k_B) (K) }.   momentDePente(pente, N): the p0 that gives that slope.

   Étape « Mêmes équations, mêmes solutions » (§12-1 to §12-4). One equation, ∇·(k ∇ψ) = −s, four meanings: ψ = φ, T, the
   deflection u of a membrane, the neutron density N; k = ε0 κ, the thermal conductivity K, the tension τ, the diffusion
   constant D; s = ρ, the heat source per m³, the force per m², the neutrons made per m³ per s. k uniform below.
     poissonUnite(o)            ∇²ψ = −source(x, y) on the unit square, ψ = o.bord (default 0) on its border, by relaxation
                                (same five-point scheme, error of order h²): o = { n (points per side, default 41), source, fixe(x, y)
                                → imposed value or null (posts, frames; it may also override the border), tol, max }. { psi (rows),
                                h = 1/(n − 1), n, iterations, residu }. The centre of the square with source 1 is at 0,073 671.
     transposer(psi, L, s, k)   psi s L²/k: the dimensionless solution as a potential, a temperature, a height or a density.
     champGrille(g, h, x0, y0)  a grid of values (rows, step h, first node at (x0, y0)): { valeur(x, y) (bilinear), gradient(x, y)
                                (bilinear interpolation of the centred differences), penteMax }. NaN outside.
     conductionCylindre(K, L, a, b, dT)  (12.12): 2π K L dT/ln(b/a), W, the heat through a cylindrical layer of length L between
                                the radii a < b, dT the inner minus the outer temperature. Same form as coaxial's λ.
     PAROIS                     { isolante: +1, fixe: −1 }: the sign of the image source for a plane wall z = 0 that lets no heat
                                through (Feynman's case) or that is held at the temperature far away (Kennelly's buried cable).
     sourceParoi(G, K, a, paroi)  a point source of G watts at the depth a under the wall, the medium z ≤ 0 (ρ the horizontal
                                distance): { T(ρ, z) (K above the far field, or above the wall for "fixe"), h(ρ, z) → [hρ, hz]
                                (W·m⁻²), surface(ρ) ((12.15) for "isolante", 0 for "fixe"), signe }. (12.13) plus its image (12.14).
     biot(h, L, K)              h L/K: the surface exchange (h in W·m⁻²·K⁻¹) against the conduction over L. ≪ 1 ⇒ insulating
                                wall, ≫ 1 ⇒ wall at the temperature of the outside.
     membraneAnneau(u0, r0, R, r)  the membrane of a circular frame R lifted by a round post r0 to u0: u0 ln(R/r)/ln(R/r0),
                                (12.18) with f = 0; the potential of a coaxial line.
     membrane(o)                (12.18) for a circular frame of diameter o.D (m) at height 0, centre at the origin, o.poteaux =
                                [{ x, y, r, u }] posts pushing it to u (m), o.p = f/τ (m⁻¹, a uniform load, default 0), o.n points per
                                side (default 61): { u (rows, m), h, valeur, gradient, penteMax (≪ 1 for (12.18)), libre(x, y),
                                poteau(x, y) }.
     bille(m, depart, o)        a small ball released on that membrane: d²r/dt² = −f g ∇u (small slopes; f = 5/7 for a ball rolling
                                without slipping, 1 for sliding without friction), velocity Verlet, o = { v0, dt (2 ms), tmax (10 s),
                                g, facteur }. { points [[x, y, t]], fin ("bord", "poteau" or "temps"), t, v, derive (largest
                                |E − E0| per unit mass, E = v²/(2f) + g u), E0 }. From rest, f changes the time scale, not the path.
     MILNE                      0,7104: the extrapolation length of the Milne problem (isotropic scattering), in mean free paths.
     sourceSphere(S, D, a, r, Rb)  (12.26)–(12.27): the density of the neutrons made at S per m³ per s, uniformly in a ball of radius
                                a, in an infinite non-absorbing medium of diffusion constant D. With Rb: the medium ends (or absorbs
                                everything) at Rb, N(Rb) = 0, which subtracts S a³/(3 D Rb) everywhere inside.
     neutronsSphere(o, rand)    a Monte Carlo check of the diffusion picture: o = { a, Rb (in mean free paths l), N neutrons (2000),
                                couches (24 shells), lots (10 batches) }, born uniformly in the ball, exponential flights of mean l,
                                isotropic scattering, no absorption, lost beyond Rb. Collision estimator (track length = l × collisions).
                                { r, N (in S a²/D, D = l v/3), err (batch standard error), chocs, Rext = Rb + MILNE, theorie(r)
                                (sourceSphere with Rext), infini(r) (no boundary) }. Agrees within noise for a ≫ l, not for a ≲ l.
     Thunderstorms and lightning (II.9.4–9.6):
     gradientSec()              g0/cp = 9,76 K·km⁻¹ (in K·m⁻¹): cooling of a rising parcel of dry air, adiabatic, hydrostatic.
     pressionSaturante(T)       saturation vapour pressure over liquid water (Pa), Bolton (1980): 611,2 exp(17,67 θ/(θ + 243,5)),
                                θ = T − 273,15; within 0,3 % from 238 K to 308 K.
     gradientHumide(T, p)       cooling of a rising saturated parcel (K·m⁻¹): g (1 + L rs/(R T))/(cp + L² rs ε/(R T²)),
                                rs = ε es/(p − es). L (2,501 × 10⁶ J·kg⁻¹) taken constant, the condensed water leaves the parcel.
     ascension(o)               a parcel lifted through a still atmosphere: o = { T0 (K at the ground, 300), p0 (Pa, atm),
                                gamma (K·m⁻¹, lapse rate of the surroundings, 0,0065), zt (m, tropopause, isothermal above, 11 000),
                                dT (K, initial excess of the parcel, 1), humide (saturated from the ground, true), mu (m⁻¹,
                                entrainment: fraction of surrounding air mixed in per metre, 0), zmax (20 000), dz (25),
                                hr (relative humidity at the ground, 1: saturated from the ground) }. Below the cloud base the parcel
                                keeps its vapour and cools at the dry rate; it saturates where rs(T, p) falls to its ground value.
                                { z, Te, Tp, w (m·s⁻¹; 0 above the top), sommet (m, where the parcel stops), wmax, zw, base (m, cloud base), cape
                                (J·kg⁻¹, the positive buoyancy summed up to the top, without drag), gammaSec, gammaHumide0 }.
                                dTp/dz = −Γ − μ (Tp − Te); d(w²/2)/dz = g (Tp − Te)/Te − μ w². Neglects the weight of the
                                condensed water, the vapour in the density, freezing, wind shear, and the drying by mixing.
     champSousNuage(ch, D)      downward field (V·m⁻¹, fair-weather sign) on flat conducting ground at the horizontal distance D
                                (m) from the axis of point charges ch = [{ q (C), h (m) }]: Σ 2 K q h/(h² + D²)^(3/2) (images).
     inversions(ch, Dmax, n)    distances (m) below Dmax (30 km) where champSousNuage changes sign (scan of n = 3000, bisection).
     chargeSaturation(R, E0)    12π ε0 R² E0 (C): the charge at which a conducting ball of radius R in the field E0 repels
                                ions of its own sign over its whole surface (Pauthenier's limit).
     NIVEAUX_FOUDRE             EN 62305-1 lightning protection levels [{ id (I…IV), Imin (kA), Imax (kA), r (m, rolling sphere) }].
     distanceAmorcage(I)        10 I^0,65 m, I in kA: striking distance of the electrogeometric model (EN 62305-1, annex A).
     rayonProtege(h, r)         radius (m) on flat ground that a sphere of radius r cannot touch next to a vertical rod of height h:
                                √(h (2r − h)) if h < r, else r.
     traceur(o, rand)           a stepped leader, random walk towards the ground: o = { H (m, 3000), pas (m, 50), pause (s, 50e-6),
                                v (m·s⁻¹ during a step, c/6), angle (rad, largest tilt of a step, 0,9) }; rand() uniform in
                                [0, 1). { points [{ x, z, t }], pas (count), duree (s), vMoyenne = H/duree (m·s⁻¹) }.
                                vitesseTraceur(pas, pause, v) = pas/(pas/v + pause): mean speed along the path.
     distanceTonnerre(dt, T)    dt √(1,4 R T) (m): how far the flash is when the thunder comes dt seconds later, air at T (293,15 K);
                                light taken as instantaneous (error dt·v/c ≈ 10⁻⁶).
     Dense dielectrics (II.11.4–11.7):
     depolarisation(m)          depolarization factor L along the axis of revolution of a spheroid, m = length along the axis/diameter:
                                needle 0 (m → ∞), sphere 1/3, flat disk 1 (m → 0). Exact (prolate and oblate closed forms).
     champCavite(E0, P, L)      E0 + L P/ε0: field in an ellipsoidal hole cut in a uniformly polarized medium, P frozen and parallel
                                to the axis; L = 0 slot along the field (11.22 left aside), 1/3 sphere (11.25), 1 slot across (11.22).
     clausiusMossotti(Na)       κ = 1 + Nα/(1 − Nα/3) (11.28); negative above Nα = 3: the linear model has no stable answer there.
     alphaDeKappa(kappa)        Nα = 3 (κ − 1)/(κ + 2): (11.28) solved for Nα.
     LIQUIDES_CM                Feynman's table 11-1 (Handbook of Chemistry and Physics): [{ id, kGaz, dGaz, dLiq (g·cm⁻³), kLiq }]
                                for CS2, O2, CCl4, Ar.
     liquideDepuisGaz(l)        { NaGaz = kGaz − 1 (11.29), rapport = dLiq/dGaz, Na, kappa (11.28), sansVoisins = 1 + Na, mesure }.
     sommeChaine(n)             (1/π) Σ 1/k³ up to n (default 10⁵): 0,3826 = ζ(3)/π, the field of a chain of parallel dipoles on
                                one of them, in p/(ε0 a³) (11.33).
     alphaCritique(a, S)        a³/S (m³): the polarizability at which the chain holds its own polarization (S default sommeChaine()).
     curieWeiss(T, Tc, beta)    Nα = 3 − β (T − Tc) (11.30) into (11.28): { Na, kappa, approx = 1 + 9/(β (T − Tc)) (11.31) }, T > Tc.
     polarisationLocale(Na, e, p0)  the feedback with a polarizability that saturates, a model: p = Nα g(e + p/3), g(u) = u/√(1 + u²),
                                e and p in units of the saturation field Es and of ε0 Es; fixed point followed from p0 (default 0).
     cycleFerro(Na, emax, n)    e from −emax to emax and back (n points each way, 200): { e, p, ps = 3 √((Nα/3)² − 1) (0 below 3),
                                ec (where p changes sign on the way up; 0 without hysteresis) }.
     Flow, lighting and random walks (II.12.5–12.7):
     ecoulementSphere(v0, a)    steady potential flow past a fixed ball of radius a, v0 along +z far away (12.38): { potentiel(r, th)
                                = −v0 cos θ (r + a³/2r²), vitesse(r, th) → { vr = v0 cos θ (1 − a³/r³), vt = −v0 sin θ (1 + a³/2r³),
                                v }, courant(r, th) = ½ v0 sin²θ (r² − a³/r) (Stokes stream function, constant on a streamline),
                                cp(r, th) = 1 − (v/v0)² (Bernoulli), ligne(b, zmax, n) → [[z, x]] the streamline that comes in at the
                                distance b from the axis }. NaN inside the ball.
     traineePotentielle(n)      −∫ cp cos θ sin θ dθ on the ball (midpoint, n = 2000): the pressure drag coefficient of (12.38), 0.
     reynolds(v, L, nu)         v L/ν.
     regimeSphere(Re)           "rampant" (Re < 1), "sillage" (1 to 10³), "plateau" (10³ to 2 × 10⁵, drag coefficient ≈ 0,47),
                                "crise" (above): where the real flow past a ball stands.
     eclairementPoint(I, h, x)  I h/(h² + x²)^(3/2) (lux; I in cd): (12.39) on a plane at the depth h under an isotropic source,
                                at the horizontal distance x.
     eclairementTubes(phi, b, z)  parallel isotropic line sources, phi lm·m⁻¹ each, spacing b, at the height z over the plane:
                                { moyen = phi/(2b) (lux), en(x) (exact, grille), ondulation = 1/sinh(2πz/b) ((max − min)/2 over the
                                mean), harmonique = 2 exp(−2πz/b) }.
     espacementTubes(tol, z)    the widest spacing for a ripple tol: { exact = 2πz/asinh(1/tol), harmonique = 2πz/ln(2/tol),
                                estime = 2πz/ln(1/tol) (A1 taken as the mean field: Feynman's 0,91 z for 10⁻³) }.
     laplaceCarre(x, y, K)      the unit square with φ = 1 on the side y = 1 and 0 on the three others: Σ over odd k ≤ K (default 199)
                                of (4/kπ) sin(kπx) sinh(kπy)/sinh(kπ).
     reseauCarre(n)             the same problem on a lattice of n × n cells: each inner node is the mean of its four neighbours
                                (Gauss–Seidel to 10⁻¹²). Rows g[j][i], y = j/n, x = i/n.
     marcheCarre(o, rand)       o = { n, i, j, N (2000), traces (0) }: N walkers leave the node (i, j), step to one of the four
                                neighbours at random, stop on the border. { phi = fraction that ends on y = 1, err = √(phi (1 − phi)/N),
                                pas (mean number of steps), traces (the paths [[i, j], …] of the first o.traces walkers) }.
   Errors are thrown with a French message: they mean the call is wrong. */
(function (root) {
  const node = typeof module !== "undefined" && module.exports;
  const Cst = node ? require("./constantes.js") : root.Constantes;
  const AnaVec = node ? require("./analyse-vectorielle.js") : root.AnaVec;
  const ChampsEM = node ? require("./lecons/champs-em.js") : root.ChampsEM;
  const EPS0 = Cst.eps0, C = Cst.c, E = Cst.e, ME = Cst.m_e;
  const K = 1 / (4 * Math.PI * EPS0);                 // N·m²·C⁻², ≈ 8,988 × 10⁹

  const err = m => { throw new RangeError("Electrostatique : " + m); };
  const finite = (x, n) => (Number.isFinite(x) ? x : err(n + " : nombre fini attendu"));
  const positive = (x, n) => (Number.isFinite(x) && x > 0 ? x : err(n + " : nombre > 0 attendu"));
  const point = p => (Array.isArray(p) && (p.length === 2 || p.length === 3) && p.every(Number.isFinite) ? p : err("point [x, y] ou [x, y, z] attendu"));
  const liste = s => (Array.isArray(s) ? s : err("liste de charges [{ q, x, y, z }] attendue"));
  const pos = s => [finite(s.x, "x"), finite(s.y, "y"), s.z == null ? 0 : finite(s.z, "z")];

  /* ---------- §4-1 : is it electrostatics? ---------- */
  function regime(L, T, v) {
    finite(v, "v"); if (v < 0 || v >= C) err("v : 0 ≤ v < c attendu");
    return { retard: ChampsEM.instantaneite(positive(L, "L"), positive(T, "T")), magnetique: (v / C) ** 2 };
  }
  function vitesseElectron(U) {
    finite(U, "U"); if (U < 0) err("U ≥ 0 attendu");
    const g = 1 + E * U / (ME * C * C);
    return C * Math.sqrt(1 - 1 / (g * g));
  }
  const SYSTEMES = Object.freeze({
    ballon: Object.freeze({ L: 0.3, T: 1, v: 0 }),                     // a rubbed balloon, watched for a second
    tube: Object.freeze({ L: 0.3, T: 0.02, v: vitesseElectron(2e4) }),  // electron beam of a cathode-ray tube, 20 kV, one 50 Hz frame
    ligne: Object.freeze({ L: 1e6, T: 0.02, v: 0 }),                    // a 1 000 km power line, one period at 50 Hz
    wifi: Object.freeze({ L: 0.06, T: 1 / 2.4e9, v: 0 }),               // a Wi-Fi antenna, one period at 2,4 GHz
  });

  /* ---------- §4-2 : Coulomb and superposition ---------- */
  function contributions(charges, p) {
    point(p);
    const d3 = p.length === 3;
    return liste(charges).map(s => {
      const [x, y, z] = pos(s), q = finite(s.q, "q");
      const dx = p[0] - x, dy = p[1] - y, dz = (d3 ? p[2] : 0) - z, r2 = dx * dx + dy * dy + dz * dz;
      if (!(r2 > 0)) return d3 ? [NaN, NaN, NaN] : [NaN, NaN];
      const k = K * q / (r2 * Math.sqrt(r2));
      return d3 ? [k * dx, k * dy, k * dz] : [k * dx, k * dy];
    });
  }
  function champ(charges, p) {
    const c = contributions(charges, p);
    return c.reduce((s, v) => s.map((x, i) => x + v[i]), p.map(() => 0));
  }
  function force(charges, i) {
    liste(charges);
    if (!(Number.isInteger(i) && i >= 0 && i < charges.length)) err("indice de charge hors de la liste");
    const autres = charges.filter((_, j) => j !== i), e = champ(autres, pos(charges[i]));
    return e.map(x => charges[i].q * x);
  }
  function potentiel(charges, p) {
    point(p);
    let v = 0;
    for (const s of liste(charges)) {
      const [x, y, z] = pos(s), r = Math.hypot(p[0] - x, p[1] - y, (p.length === 3 ? p[2] : 0) - z);
      if (!(r > 0)) return NaN;
      v += K * finite(s.q, "q") / r;
    }
    return v;
  }
  function baguette(Q, L, n) {
    finite(Q, "Q"); positive(L, "L");
    if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    return Array.from({ length: n }, (_, k) => ({ q: Q / n, x: -L / 2 + L * (k + 0.5) / n, y: 0, z: 0 }));
  }
  function baguetteExacte(Q, L, p) {
    finite(Q, "Q"); positive(L, "L"); point(p);
    const lam = Q / L, x = p[0], y = p[1], a = x + L / 2, b = x - L / 2;     // a, b: abscissas from the two ends
    const rm = Math.hypot(a, y), rp = Math.hypot(b, y);
    if (y === 0) {
      if (Math.abs(x) <= L / 2) return { E: [NaN, NaN], phi: NaN };
      const ex = K * lam * (1 / rp - 1 / rm), phi = K * lam * Math.log((Math.abs(x) + L / 2) / (Math.abs(x) - L / 2));
      return { E: [ex, 0], phi };
    }
    const ex = K * lam * (1 / rp - 1 / rm), ey = K * lam / y * (a / rm - b / rp);
    const ay = Math.abs(y), phi = K * lam * (Math.asinh(a / ay) - Math.asinh(b / ay));
    return { E: [ex, ey], phi };
  }

  /* ---------- §4-3 : work and potential ---------- */
  function travail(charges, chemin, n) {
    liste(charges);
    return -AnaVec.circulation(p => champ(charges, p), chemin, n == null ? 2000 : n);
  }
  const point2 = (c, n) => (Array.isArray(c) && c.length === 2 && c.every(Number.isFinite) ? c : err(n + " : point [x, y] attendu"));
  const CHEMINS = Object.freeze({
    droit(a, b) { point2(a, "a"); point2(b, "b"); return t => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]; },
    arcRayon(a, b, o) {
      point2(a, "a"); point2(b, "b"); point2(o, "o");
      const ra = Math.hypot(a[0] - o[0], a[1] - o[1]), rb = Math.hypot(b[0] - o[0], b[1] - o[1]);
      if (!(ra > 0 && rb > 0)) err("arcRayon : a et b distincts du centre attendus");
      const ta = Math.atan2(a[1] - o[1], a[0] - o[0]);
      let dt = Math.atan2(b[1] - o[1], b[0] - o[0]) - ta;
      if (dt > Math.PI) dt -= 2 * Math.PI;
      if (dt < -Math.PI) dt += 2 * Math.PI;                                     // the shorter arc
      const la = ra * Math.abs(dt), lr = Math.abs(rb - ra), part = la + lr > 0 ? la / (la + lr) : 1;
      return t => {
        if (t <= part && part > 0) { const th = ta + dt * t / part; return [o[0] + ra * Math.cos(th), o[1] + ra * Math.sin(th)]; }
        const r = ra + (rb - ra) * (part < 1 ? (t - part) / (1 - part) : 1), th = ta + dt;
        return [o[0] + r * Math.cos(th), o[1] + r * Math.sin(th)];
      };
    },
    detour(a, b, c) {
      point2(a, "a"); point2(b, "b"); point2(c, "c");
      return t => [0, 1].map(i => (1 - t) * (1 - t) * a[i] + 2 * t * (1 - t) * c[i] + t * t * b[i]);
    },
    boucle(ch1, ch2) {
      if (typeof ch1 !== "function" || typeof ch2 !== "function") err("boucle : deux chemins attendus");
      return t => (t <= 0.5 ? ch1(2 * t) : ch2(2 - 2 * t));
    },
  });

  /* ---------- §4-4 : a radial field of any power ---------- */
  function champPuissance(charges, p, n, r0) {
    point(p); finite(n, "n"); positive(r0, "r0");
    const d3 = p.length === 3, s0 = p.map(() => 0);
    return liste(charges).reduce((acc, s) => {
      const [x, y, z] = pos(s), d = [p[0] - x, p[1] - y, (d3 ? p[2] : 0) - z], r = Math.hypot(...d);
      if (!(r > 0)) return acc.map(() => NaN);
      const k = K * finite(s.q, "q") / (r0 * r0) * Math.pow(r0 / r, n) / r;    // × the vector d: magnitude K q/r0² (r0/r)ⁿ
      return acc.map((v, i) => v + k * d[i]);
    }, s0);
  }
  function fluxSphere(F, c, R, n) {
    if (typeof F !== "function") err("champ F([x, y, z]) → [Fx, Fy, Fz] attendu");
    if (!(Array.isArray(c) && c.length === 3 && c.every(Number.isFinite))) err("c : centre [x, y, z] attendu");
    positive(R, "R"); n = n == null ? 120 : n;
    if (!Number.isInteger(n) || n < 4) err("n : entier ≥ 4 attendu");
    let s = 0;
    for (let i = 0; i < n; i++) {
      const u = -1 + 2 * (i + 0.5) / n, w = Math.sqrt(1 - u * u);              // u = cos θ: bands of equal area
      for (let j = 0; j < 2 * n; j++) {
        const ph = 2 * Math.PI * (j + 0.5) / (2 * n), nv = [w * Math.cos(ph), w * Math.sin(ph), u];
        const v = F([c[0] + R * nv[0], c[1] + R * nv[1], c[2] + R * nv[2]]);
        s += v[0] * nv[0] + v[1] * nv[1] + v[2] * nv[2];
      }
    }
    return s * 4 * Math.PI * R * R / (2 * n * n);
  }

  /* ---------- étape « Théorème de Gauss en électrostatique » (§4-5 to §4-8) ---------- */
  const point3 = (p, n) => (Array.isArray(p) && p.length === 3 && p.every(Number.isFinite) ? p : err(n + " : point [x, y, z] attendu"));
  /* §4-5: the flux of a point charge through a face is q Ω/(4π ε0), Ω the solid angle the face subtends */
  function angleSolideRectangle(x1, x2, y1, y2, h) {
    [x1, x2, y1, y2, h].forEach((v, i) => finite(v, "xxyyh"[i]));
    const in1 = (a, b) => 0 > Math.min(a, b) && 0 < Math.max(a, b);
    if (h === 0) return in1(x1, x2) && in1(y1, y2) ? NaN : 0;
    const ah = Math.abs(h), f = (x, y) => Math.atan(x * y / (ah * Math.sqrt(x * x + y * y + h * h)));
    return Math.sign(h) * (f(x2, y2) - f(x1, y2) - f(x2, y1) + f(x1, y1));
  }
  function fluxCubeExact(q, s, c, a) {
    finite(q, "q"); point3(s, "s"); point3(c, "c"); positive(a, "a");
    const faces = [];
    for (let i = 0; i < 3; i++) {
      const [j, k] = [(i + 1) % 3, (i + 2) % 3];
      const lo = d => c[d] - a / 2 - s[d], hi = d => c[d] + a / 2 - s[d];
      faces.push(K * q * angleSolideRectangle(lo(j), hi(j), lo(k), hi(k), hi(i)));     // face +x_i: normal +x_i
      faces.push(K * q * angleSolideRectangle(lo(j), hi(j), lo(k), hi(k), -lo(i)));    // face −x_i: normal −x_i
    }
    return { faces, total: faces.reduce((t, f) => t + f, 0) };
  }
  /* §4-6 and §4-7: spherically symmetric charge, Gauss on a concentric sphere */
  function champRadial(Qr, p, c) {
    if (typeof Qr !== "function") err("Qr : fonction r → charge intérieure attendue");
    point(p); c = c == null ? p.map(() => 0) : c;
    if (!(Array.isArray(c) && c.length === p.length && c.every(Number.isFinite))) err("c : centre de même dimension que le point attendu");
    const d = p.map((x, i) => x - c[i]), r = Math.hypot(...d);
    if (r === 0) return d.map(() => 0);
    const k = K * finite(Qr(r), "Qr(r)") / (r * r * r);
    return d.map(x => k * x);
  }
  const BOULES = Object.freeze({
    uniforme(Q, R) {
      finite(Q, "Q"); positive(R, "R");
      const rho0 = 3 * Q / (4 * Math.PI * R ** 3);
      return { rho: r => (r <= R ? rho0 : 0), charge: r => (r >= R ? Q : Q * (r / R) ** 3) };
    },
    parabolique(Q, R) {
      finite(Q, "Q"); positive(R, "R");
      const rho0 = 15 * Q / (8 * Math.PI * R ** 3);
      return { rho: r => (r <= R ? rho0 * (1 - (r / R) ** 2) : 0), charge: r => { const u = Math.min(1, r / R); return Q * (2.5 * u ** 3 - 1.5 * u ** 5); } };
    },
    coquille(Q, R1, R2) {     // §5-7
      finite(Q, "Q"); positive(R2, "R2"); finite(R1, "R1"); if (!(R1 >= 0 && R1 < R2)) err("R1 : 0 ≤ R1 < R2 attendu");
      const v = R2 ** 3 - R1 ** 3, rho0 = 3 * Q / (4 * Math.PI * v);
      return { rho: r => (r >= R1 && r <= R2 ? rho0 : 0), charge: r => (r <= R1 ? 0 : r >= R2 ? Q : Q * (r ** 3 - R1 ** 3) / v) };
    },
  });
  function fluxSurVolume(F, c, a, n) { positive(a, "a"); return AnaVec.fluxCube(F, point3(c, "c"), a, n == null ? 8 : n).total / (a * a * a); }
  function bouleDiscrete(Q, R, n, c) {
    finite(Q, "Q"); positive(R, "R"); c = c == null ? [0, 0, 0] : point3(c, "c");
    if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    const out = [], q = Q / (2 * n * n * n);
    for (let i = 0; i < n; i++) {
      const r = R * Math.cbrt((i + 0.5) / n);                                     // shells of equal volume
      for (let j = 0; j < n; j++) {
        const u = -1 + 2 * (j + 0.5) / n, w = Math.sqrt(1 - u * u);              // bands of equal area
        for (let k = 0; k < 2 * n; k++) {
          const ph = 2 * Math.PI * (k + 0.5 + 0.5 * (i + j)) / (2 * n);
          out.push({ q, x: c[0] + r * w * Math.cos(ph), y: c[1] + r * w * Math.sin(ph), z: c[2] + r * u });
        }
      }
    }
    return out;
  }
  /* §4-8: field lines as tubes of equal flux, for charges on one axis */
  function fluxCalotte(q, alpha) { finite(q, "q"); finite(alpha, "alpha"); return q * (1 - Math.cos(alpha)) / (2 * EPS0); }
  function anglesEgalFlux(N) {
    if (!(Number.isInteger(N) && N >= 1)) err("N : entier ≥ 1 attendu");
    return Array.from({ length: N }, (_, k) => Math.acos(1 - 2 * (k + 0.5) / N));
  }
  function angleArrivee(q1, q2, alpha) {
    finite(q1, "q1"); finite(q2, "q2"); finite(alpha, "alpha");
    if (!(q1 * q2 < 0)) return NaN;
    const x = -(q1 / q2) * (1 - Math.cos(alpha));
    return x <= 2 ? Math.acos(1 - x) : NaN;
  }
  function suivreLigne(charges, i, alpha, o) {
    liste(charges); o = o || {};
    if (!(Number.isInteger(i) && i >= 0 && i < charges.length)) err("indice de charge hors de la liste");
    const S = charges.map(pos), si = S[i], qi = finite(charges[i].q, "q");
    if (qi === 0) err("une charge nulle n'a pas de ligne");
    const u = o.u ? AnaVec.unitaire(o.u) : [1, 0], r0 = positive(o.r0 == null ? 1e-3 : o.r0, "r0");
    const ds = positive(o.ds == null ? r0 / 2 : o.ds, "ds"), n = o.n == null ? 20000 : o.n, loin = o.loin == null ? Infinity : o.loin;
    const ca = Math.cos(finite(alpha, "alpha")), sa = Math.sin(alpha);
    const p0 = [si[0] + r0 * (ca * u[0] - sa * u[1]), si[1] + r0 * (sa * u[0] + ca * u[1])];
    const proche = p => S.findIndex((s, j) => j !== i && Math.hypot(p[0] - s[0], p[1] - s[1]) < r0);
    const points = AnaVec.ligneDeChamp(p => champ(charges, p), p0, ds, n, qi > 0 ? 1 : -1,
      p => proche(p) >= 0 || Math.hypot(p[0] - si[0], p[1] - si[1]) > loin);
    const last = points[points.length - 1], fin = proche(last);
    let angle = NaN;
    if (fin >= 0) {
      const sj = S[fin], a = [last[0] - sj[0], last[1] - sj[1]], b = [si[0] - sj[0], si[1] - sj[1]];
      angle = Math.acos(Math.max(-1, Math.min(1, AnaVec.scalaire(a, b) / (AnaVec.norme(a) * AnaVec.norme(b)))));
    }
    return { points, fin, angle };
  }

  /* ---------- étape « Équilibre et stabilité des charges » (§5-1 to §5-4) ---------- */
  /* §5-1: a field of zero divergence and nonzero curl, the part Gauss cannot see */
  function tourbillon(om, c) {
    finite(om, "om"); c = c == null ? [0, 0] : point2(c, "c");
    return p => { point(p); const v = [-om * (p[1] - c[1]), om * (p[0] - c[0])]; return p.length === 3 ? [v[0], v[1], 0] : v; };
  }
  /* §5-2: the curvature of φ, and of the energy of a test charge */
  function hessien(charges, p) {
    point3(p, "p");
    const H = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (const s of liste(charges)) {
      const d = [p[0] - finite(s.x, "x"), p[1] - finite(s.y, "y"), p[2] - (s.z == null ? 0 : finite(s.z, "z"))], r2 = d[0] ** 2 + d[1] ** 2 + d[2] ** 2;
      if (!(r2 > 0)) return H.map(l => l.map(() => NaN));
      const k = K * finite(s.q, "q") / (r2 * r2 * Math.sqrt(r2));
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) H[i][j] += k * (3 * d[i] * d[j] - (i === j ? r2 : 0));
    }
    return H;
  }
  const Ten = () => (node ? require("./tenseurs.js") : root.Tenseurs);
  function raideurs(charges, q, p) {
    finite(q, "q");
    const H = hessien(charges, p);
    if (!H.every(l => l.every(Number.isFinite))) err("raideurs : le point est sur une charge");
    const r = Ten().propres(H.map(l => l.map(x => q * x)));
    return { valeurs: r.valeurs, axes: r.axes, trace: r.valeurs[0] + r.valeurs[1] + r.valeurs[2] };
  }
  const ARRANGEMENTS = Object.freeze({
    triangle: (Q, a) => [0, 1, 2].map(k => ({ q: Q, x: a * Math.cos(2 * Math.PI * k / 3), y: a * Math.sin(2 * Math.PI * k / 3), z: 0 })),
    carre: (Q, a) => [0, 1, 2, 3].map(k => ({ q: Q, x: a * Math.cos(Math.PI * k / 2), y: a * Math.sin(Math.PI * k / 2), z: 0 })),
    cube: (Q, a) => [0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ q: Q, x: (k & 1 ? 1 : -1) * a / Math.sqrt(3), y: (k & 2 ? 1 : -1) * a / Math.sqrt(3), z: (k & 4 ? 1 : -1) * a / Math.sqrt(3) })),
    axe: (Q, a) => [{ q: Q, x: 0, y: 0, z: a }, { q: Q, x: 0, y: 0, z: -a }],
  });
  /* §5-3: a grounded conducting plane, by images */
  function images(charges) {
    return liste(charges).flatMap(s => { const [x, y, z] = pos(s), q = finite(s.q, "q"); return [{ q, x, y, z }, { q: -q, x, y, z: -z }]; });
  }
  function equilibrePlan(Qs, H, q) {
    finite(Qs, "Qs"); positive(H, "H"); finite(q, "q");
    if (!(Qs * q < 0)) return NaN;
    const src = images([{ q: Qs, x: 0, y: 0, z: H }]);
    const fz = z => q * champ(src, [0, 0, z])[2] - K * q * q / (4 * z * z);       // upward force: sources, minus the pull of the image
    let lo = H * 1e-9, hi = H * (1 - 1e-12);
    if (!(fz(lo) < 0 && fz(hi) > 0)) return NaN;
    for (let i = 0; i < 200 && hi - lo > 1e-15 * H; i++) { const m = (lo + hi) / 2; if (fz(m) < 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function energiesPlan(sources, q, p0) {
    finite(q, "q"); point3(p0, "p0");
    if (!(p0[2] > 0)) err("p0 : point au-dessus du plan (z > 0) attendu");
    liste(sources).forEach(s => { if (!(pos(s)[2] > 0)) err("sources : charges au-dessus du plan (z > 0) attendues"); });
    const ext = images(sources), fig = ext.concat([{ q: -q, x: p0[0], y: p0[1], z: -p0[2] }]);
    const Uf = p => q * potentiel(fig, p), Ul = p => q * potentiel(ext, p) - K * q * q / (4 * p[2]);
    const f0 = Uf(p0), l0 = Ul(p0);
    const figee = p => (point3(p, "p")[2] > 0 ? Uf(p) - f0 : NaN), libre = p => (point3(p, "p")[2] > 0 ? Ul(p) - l0 : NaN);
    const Hl = hessien(ext, p0).map(l => l.map(x => q * x));
    Hl[2][2] -= K * q * q / (2 * p0[2] ** 3);
    const pr = M => { const r = Ten().propres(M); return { valeurs: r.valeurs, axes: r.axes, trace: r.valeurs[0] + r.valeurs[1] + r.valeurs[2] }; };
    return { figee, libre, raideursFigees: raideurs(fig, q, p0), raideursLibres: pr(Hl) };
  }
  /* §5-4: atoms */
  function thomson(Q, R) {
    positive(Q, "Q"); positive(R, "R");
    const k = K * E * Q / R ** 3, omega = Math.sqrt(k / ME);
    return { k, omega, lambda: 2 * Math.PI * C / omega };
  }
  const RAYON_CLASSIQUE = K * E * E / (ME * C * C);
  function dureeEffondrement(r0) { positive(r0, "r0"); return r0 ** 3 / (4 * RAYON_CLASSIQUE ** 2 * C); }
  function rayonOrbite(r0, t) {
    positive(r0, "r0"); finite(t, "t"); if (t < 0) err("t ≥ 0 attendu");
    return Math.cbrt(Math.max(0, r0 ** 3 - 4 * RAYON_CLASSIQUE ** 2 * C * t));
  }
  function toursAvantEffondrement(r0) { positive(r0, "r0"); return r0 ** 1.5 * Math.sqrt(K * E * E / ME) / (4 * Math.PI * RAYON_CLASSIQUE ** 2 * C); }
  function energieAtome(a) {
    positive(a, "a");
    const cinetique = Cst.hbar ** 2 / (2 * ME * a * a), potentielle = -K * E * E / a;
    return { cinetique, potentielle, totale: cinetique + potentielle };
  }
  const rayonOptimal = () => Cst.hbar ** 2 / (ME * K * E * E);

  /* ---------- §5-5 to §5-7 : Gauss with a symmetry ---------- */
  function champFil(lambda, r) { finite(lambda, "lambda"); positive(r, "r"); return lambda / (2 * Math.PI * EPS0 * r); }
  function filFini(lambda, L, r) { positive(L, "L"); return champFil(lambda, r) * (L / 2) / Math.hypot(r, L / 2); }
  function coaxial(U, a, b) {
    finite(U, "U"); positive(a, "a"); positive(b, "b"); if (!(b > a)) err("b > a attendu");
    const ln = Math.log(b / a);
    return { lambda: 2 * Math.PI * EPS0 * U / ln, champ: r => (positive(r, "r") < a || r > b ? 0 : U / (r * ln)) };
  }
  function champPlans(plans, z) {
    if (!Array.isArray(plans)) err("liste de plans [{ sigma, z }] attendue"); finite(z, "z");
    let e = 0;
    for (const p of plans) {
      finite(p.sigma, "sigma"); finite(p.z, "z du plan");
      if (z === p.z) return NaN;
      e += Math.sign(z - p.z) * p.sigma / (2 * EPS0);
    }
    return e;
  }
  function disqueAxe(sigma, a, z) {
    finite(sigma, "sigma"); positive(a, "a"); finite(z, "z");
    if (z === 0) return NaN;
    const h = Math.hypot(z, a);
    return Math.sign(z) * sigma / (2 * EPS0) * a * a / (h * (h + Math.abs(z)));   // 1 − |z|/h, without cancellation
  }
  function disquesAxe(disques, z) {
    if (!Array.isArray(disques)) err("liste de disques [{ sigma, a, z }] attendue"); finite(z, "z");
    return disques.reduce((e, d) => e + disqueAxe(d.sigma, d.a, z - finite(d.z, "z du disque")), 0);
  }
  function champSubi(B, R, n) {
    if (!(B && typeof B.charge === "function")) err("B : répartition { charge(r) } attendue");
    positive(R, "R"); n = n == null ? 2000 : n; if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    const Q = finite(B.charge(R), "charge totale"); if (Q === 0) err("charge totale non nulle attendue");
    let s = 0, q0 = B.charge(0);
    for (let i = 0; i < n; i++) {
      const r1 = R * (i + 1) / n, q1 = B.charge(r1), dq = q1 - q0;
      if (dq !== 0) { const qm = (q0 + q1) / 2, r = R * (i + 0.5) / n; s += K * qm / (r * r) * dq; }   // Q(r) at the middle of the slice
      q0 = q1;
    }
    return s / Q;
  }
  function pressionElectrostatique(sigma) { finite(sigma, "sigma"); return sigma * sigma / (2 * EPS0); }
  function coquilleDiscrete(Q, R, N, c) {
    finite(Q, "Q"); positive(R, "R"); c = c == null ? [0, 0, 0] : point3(c, "c");
    if (!(Number.isInteger(N) && N >= 1)) err("N : entier ≥ 1 attendu");
    const g = Math.PI * (3 - Math.sqrt(5));                                        // golden angle
    return Array.from({ length: N }, (_, k) => {
      const u = 1 - 2 * (k + 0.5) / N, w = Math.sqrt(1 - u * u);
      return { q: Q / N, x: c[0] + R * w * Math.cos(g * k), y: c[1] + R * w * Math.sin(g * k), z: c[2] + R * u };
    });
  }

  /* ---------- étape « Conducteurs en équilibre et cavités » (§5-8 to §5-10) ---------- */
  /* §5-9: two conducting spheres joined by a thin wire, by successive images */
  function spheresReliees(a, b, d, V, tol) {
    positive(a, "a"); positive(b, "b"); positive(d, "d"); finite(V, "V");
    if (!(d > a + b)) err("d > a + b attendu (sphères disjointes)");
    tol = tol == null ? 1e-13 : positive(tol, "tol");
    const s1 = [{ q: a * V / K, x: 0 }], s2 = [{ q: b * V / K, x: d }];   // each sphere alone at V: 4π ε0 R V at its centre
    let n1 = s1[0], n2 = s2[0];
    const q0 = Math.max(Math.abs(n1.q), Math.abs(n2.q)) || 1;
    for (let i = 0; i < 1e6; i++) {
      const s = d - n1.x, i2 = { q: -n1.q * b / s, x: d - b * b / s };      // image of the last charge of sphere 1 in sphere 2
      const u = n2.x, i1 = { q: -n2.q * a / u, x: a * a / u };              // and of the last of sphere 2 in sphere 1
      s2.push(i2); s1.push(i1); n1 = i1; n2 = i2;
      if (Math.abs(i1.q) + Math.abs(i2.q) < tol * q0) break;
    }
    const pts = l => l.map(c => ({ q: c.q, x: c.x, y: 0, z: 0 })), all = pts(s1).concat(pts(s2));
    const Q1 = s1.reduce((t, c) => t + c.q, 0), Q2 = s2.reduce((t, c) => t + c.q, 0);
    /* field at the point of sphere k at the angle th from the direction toward the other sphere: [normal, tangential] */
    const surface = (k, th) => {
      finite(th, "th"); if (k !== 1 && k !== 2) err("k : 1 ou 2 attendu");
      const R = k === 1 ? a : b, cx = k === 1 ? 0 : d, ux = k === 1 ? 1 : -1;
      const nv = [ux * Math.cos(th), Math.sin(th)], e = champ(all, [cx + R * nv[0], R * nv[1]]);
      return [e[0] * nv[0] + e[1] * nv[1], -e[0] * nv[1] + e[1] * nv[0]];
    };
    return { charges1: pts(s1), charges2: pts(s2), charges: all, Q1, Q2, surface, sigma: (k, th) => EPS0 * surface(k, th)[0] };
  }
  /* §5-10: a spherical conducting shell (cavity radius a, outer radius b, net charge Qc), a charge q in the cavity at x = s,
     a charge Q outside at x = D. Kelvin images, exact for these spheres. */
  function coquilleCavite(o) {
    const a = positive(o.a, "a"), b = positive(o.b, "b"), Qc = finite(o.Qc || 0, "Qc"), q = finite(o.q || 0, "q"), s = finite(o.s || 0, "s");
    const Q = finite(o.Q || 0, "Q"), D = o.D == null ? 2 * b : finite(o.D, "D");
    if (!(b > a)) err("b > a attendu"); if (!(Math.abs(s) < a)) err("|s| < a attendu : la charge est dans la cavité");
    if (Q !== 0 && !(Math.abs(D) > b)) err("|D| > b attendu : la charge extérieure est hors du métal");
    const dedans = [{ q, x: s, y: 0, z: 0 }];
    if (q !== 0 && s !== 0) dedans.push({ q: -q * a / Math.abs(s), x: a * a / s, y: 0, z: 0 });    // its image, outside r = a
    const Qcentre = Qc + q + (Q !== 0 ? Q * b / Math.abs(D) : 0);                                   // the outer surface carries Qc + q
    const dehors = [{ q: Qcentre, x: 0, y: 0, z: 0 }];
    if (Q !== 0) dehors.push({ q: Q, x: D, y: 0, z: 0 }, { q: -Q * b / Math.abs(D), x: b * b / D, y: 0, z: 0 });
    const V0 = K * Qcentre / b;                                           // the images of Q leave the sphere r = b at 0
    const radial = (l, R, th) => { const n = [Math.cos(th), Math.sin(th)], e = champ(l, [R * n[0], R * n[1]]); return [e[0] * n[0] + e[1] * n[1], -e[0] * n[1] + e[1] * n[0]]; };
    const zone = p => { point(p); const r = Math.hypot(...p); return r < a ? "cavite" : r <= b ? "metal" : "dehors"; };
    return {
      dedans, dehors, V0, Qcentre,
      champ: p => { const z = zone(p); return z === "metal" ? p.map(() => 0) : champ(z === "cavite" ? dedans : dehors, p); },
      potentiel: p => { const z = zone(p); return z === "metal" ? V0 : z === "cavite" ? potentiel(dedans, p) + V0 : potentiel(dehors, p); },
      /* surface fields [radial, tangential] on the vacuum side; σ with the normal from the metal into the vacuum */
      surfaceInt: th => radial(dedans, a, finite(th, "th")), surfaceExt: th => radial(dehors, b, finite(th, "th")),
      sigmaInt: th => -EPS0 * radial(dedans, a, finite(th, "th"))[0], sigmaExt: th => EPS0 * radial(dehors, b, finite(th, "th"))[0],
    };
  }
  /* charge carried by an axisymmetric σ(θ) on a sphere of radius R: ∫ σ 2π R² sin θ dθ, n bands of equal area */
  function chargeSurface(sigma, R, n) {
    if (typeof sigma !== "function") err("sigma : fonction θ → C·m⁻² attendue");
    positive(R, "R"); n = n == null ? 2000 : n; if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    let s = 0;
    for (let i = 0; i < n; i++) s += sigma(Math.acos(1 - 2 * (i + 0.5) / n));
    return s * 4 * Math.PI * R * R / n;
  }
  /* §5-8: a thin shell under the toy law of champPuissance, exponent n (1 < n < 3); potential of a charge K q r0^(n−2) r^(1−n)/(n−1) */
  function potentielCoquillePuissance(Q, R, r, n, r0) {
    finite(Q, "Q"); positive(R, "R"); finite(r, "r"); if (r < 0) err("r ≥ 0 attendu"); finite(n, "n"); positive(r0, "r0");
    if (!(n > 1 && n < 3)) err("n : 1 < n < 3 attendu");
    const k = K * Q * Math.pow(r0, n - 2) / (n - 1);
    if (r === 0) return k * Math.pow(R, 1 - n);
    if (r === R) return k * Math.pow(2 * R, 3 - n) / (2 * R * R * (3 - n));
    return k * (Math.pow(R + r, 3 - n) - Math.pow(Math.abs(R - r), 3 - n)) / (2 * R * r * (3 - n));
  }
  /* Cavendish (1773): an inner sphere a joined to an outer shell b (both thin, concentric) shares the charge; with the
     exponent 2 + δ, the inner one keeps qa/qb ≈ M δ. M exact (derivative at δ = 0), dimensionless, depends on a/b only. */
  function penteCavendish(a, b) {
    positive(a, "a"); positive(b, "b"); if (!(b > a)) err("b > a attendu");
    const xl = x => x * Math.log(x);
    return (-Math.log(2 * b) / b + (xl(a + b) - xl(b - a)) / (2 * a * b)) / (1 / a - 1 / b);
  }
  function cavendish(a, b, delta) {
    const M = penteCavendish(a, b); finite(delta, "delta");
    if (Math.abs(delta) < 1e-6) return M * delta;                          // linear term: relative error of order δ
    const n = 2 + delta, g = (R, r) => potentielCoquillePuissance(1, R, r, n, b);
    return (g(b, b) - g(b, a)) / (g(a, a) - g(a, b));
  }

  /* ---------- §6-1 : Poisson's equation on a grid ---------- */
  function relaxation(o) {
    const nx = o.nx, ny = o.ny;
    if (!(Number.isInteger(nx) && nx >= 3 && Number.isInteger(ny) && ny >= 3)) err("nx, ny : entiers ≥ 3 attendus");
    const h = positive(o.h, "h"), fixe = o.fixe || (() => null), rho = o.rho || (() => 0);
    const omega = o.omega == null ? 2 / (1 + Math.sin(Math.PI / Math.max(nx, ny))) : finite(o.omega, "omega");
    if (!(omega > 0 && omega < 2)) err("omega : 0 < ω < 2 attendu");
    const max = o.max == null ? 100000 : o.max;
    if (!(Number.isInteger(max) && max >= 0)) err("max : entier ≥ 0 attendu");
    const N = nx * ny, phi = new Float64Array(N), S = new Float64Array(N), libre = new Uint8Array(N);
    let echelle = 0;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const k = j * nx + i, v = fixe(i, j);
      if (v != null) { phi[k] = finite(v, "fixe(" + i + ", " + j + ")"); echelle = Math.max(echelle, Math.abs(v)); continue; }
      if (i === 0 || j === 0 || i === nx - 1 || j === ny - 1) err("bord : potentiel imposé attendu en (" + i + ", " + j + ")");
      libre[k] = 1; S[k] = h * h * finite(rho(i, j), "rho(" + i + ", " + j + ")") / EPS0;
      echelle = Math.max(echelle, Math.abs(S[k]));
      phi[k] = o.phi0 ? finite(o.phi0[j][i], "phi0") : 0;
    }
    const tol = o.tol == null ? 1e-12 * (echelle || 1) : positive(o.tol, "tol");
    const ecart = k => (phi[k - 1] + phi[k + 1] + phi[k - nx] + phi[k + nx] + S[k]) / 4 - phi[k];
    let it = 0;
    while (it < max) {
      it++; let dmax = 0;
      for (let k = nx; k < N - nx; k++) if (libre[k]) { const d = ecart(k); phi[k] += omega * d; if (Math.abs(d) > dmax) dmax = Math.abs(d); }
      if (dmax <= tol) break;
    }
    let residu = 0;
    for (let k = nx; k < N - nx; k++) if (libre[k]) residu = Math.max(residu, Math.abs(ecart(k)));
    return { phi: Array.from({ length: ny }, (_, j) => Array.from(phi.subarray(j * nx, (j + 1) * nx))), iterations: it, residu };
  }

  /* ---------- §6-2 to §6-5 : the dipole and the multipole series ---------- */
  const vec = (v, n) => (Array.isArray(v) && (v.length === 2 || v.length === 3) && v.every(Number.isFinite) ? v : err(n + " : vecteur [x, y] ou [x, y, z] attendu"));
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const relatif = (P, o, n) => {
    vec(P, "P"); if (o == null) return P.slice(); vec(o, "o");
    if (o.length !== P.length) err(n + " : P et o de même dimension attendus");
    return P.map((x, i) => x - o[i]);
  };
  function paireDipole(q, d, u) {
    finite(q, "q"); positive(d, "d"); const w = AnaVec.unitaire(u == null ? [0, 0, 1] : vec(u, "u")), h = d / 2;
    const at = (s, sg) => ({ q: s, x: sg * h * w[0], y: sg * h * w[1], z: w.length === 3 ? sg * h * w[2] : 0 });
    return [at(q, 1), at(-q, -1)];
  }
  function potentielDipole(p, P, o) {
    vec(p, "p"); const r = relatif(P, o, "potentielDipole");
    if (r.length !== p.length) err("p et P de même dimension attendus");
    const r2 = dot(r, r); return r2 === 0 ? NaN : K * dot(p, r) / (r2 * Math.sqrt(r2));
  }
  function champDipole(p, P, o) {
    vec(p, "p"); const r = relatif(P, o, "champDipole");
    if (r.length !== p.length) err("p et P de même dimension attendus");
    const r2 = dot(r, r); if (r2 === 0) return r.map(() => NaN);
    const r3 = r2 * Math.sqrt(r2), pr = dot(p, r) / r2;
    return r.map((x, i) => K * (3 * pr * x - p[i]) / r3);
  }
  function composantesDipole(p, r, theta) {
    finite(p, "p"); positive(r, "r"); finite(theta, "theta");
    const c = Math.cos(theta), s = Math.sin(theta), k = K * p / (r * r * r);
    return { Ez: k * (3 * c * c - 1), Eperp: k * 3 * c * s };
  }
  function moments(charges, o) {
    liste(charges); const c = o == null ? [0, 0, 0] : vec(o, "o").concat(o.length === 2 ? [0] : []);
    let Q = 0; const p = [0, 0, 0], quad = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    charges.forEach(s => {
      const q = finite(s.q, "q"), d = pos(s).map((x, i) => x - c[i]), d2 = dot(d, d);
      Q += q;
      for (let i = 0; i < 3; i++) { p[i] += q * d[i]; for (let j = 0; j < 3; j++) quad[i][j] += q * (3 * d[i] * d[j] - (i === j ? d2 : 0)); }
    });
    return { Q, p, quad };
  }
  function potentielMultipole(m, P, ordre, o) {
    if (!m || !Number.isFinite(m.Q) || !Array.isArray(m.p) || !Array.isArray(m.quad)) err("moments { Q, p, quad } attendus");
    if (![0, 1, 2].includes(ordre)) err("ordre : 0, 1 ou 2 attendu");
    const r = relatif(P, o, "potentielMultipole"); if (r.length === 2) r.push(0);
    const R2 = dot(r, r); if (R2 === 0) return NaN;
    const R = Math.sqrt(R2);
    let v = m.Q / R;
    if (ordre >= 1) v += dot(m.p, r) / (R2 * R);
    if (ordre >= 2) { let s = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += m.quad[i][j] * r[i] * r[j]; v += s / (2 * R2 * R2 * R); }
    return K * v;
  }
  function spheresDecalees(rho, a, s) {
    finite(rho, "rho"); positive(a, "a"); finite(s, "s");
    if (!(Math.abs(s) < 2 * a)) err("|s| < 2a attendu : les boules doivent se recouvrir");
    return { sigma0: rho * s, p: 4 / 3 * Math.PI * a * a * a * rho * s, Eint: -rho * s / (3 * EPS0) };
  }
  function baseTournee(angle) {
    finite(angle, "angle"); const c = Math.cos(angle), s = Math.sin(angle);
    return [[c, s, 0], [-s, c, 0], [0, 0, 1]];
  }
  function changerBase(v, base) {
    vec(v, "v"); if (!Array.isArray(base) || base.length !== v.length) err("base de même dimension que v attendue");
    base.forEach((e, i) => { vec(e, "base[" + i + "]"); if (e.length !== v.length) err("base de même dimension que v attendue");
      base.forEach((f, j) => { if (Math.abs(dot(e, f) - (i === j ? 1 : 0)) > 1e-9) err("base orthonormée attendue"); }); });
    return base.map(e => dot(v, e));
  }
  /* ---------- Étape « Méthode des images » (§6-6 to §6-9) ---------- */
  /* §6-6: a conductor of revolution, by rings of charge */
  function agm(a, b) { for (let i = 0; i < 60 && Math.abs(a - b) > 1e-15 * a; i++) { const m = (a + b) / 2; b = Math.sqrt(a * b); a = m; } return (a + b) / 2; }
  function anneau(R, z0, rho, z) {
    finite(R, "R"); finite(z0, "z0"); finite(rho, "rho"); finite(z, "z");
    if (R < 0 || rho < 0) err("R, rho : rayons ≥ 0 attendus");
    const s2 = (rho + R) ** 2 + (z - z0) ** 2, m = s2 > 0 ? 4 * rho * R / s2 : 0;
    if (!(s2 > 0) || m >= 1) return NaN;
    return K / (Math.sqrt(s2) * agm(1, Math.sqrt(1 - m)));
  }
  const PROFILS = Object.freeze({
    sphere: a => { positive(a, "a"); return t => [a * Math.sin(Math.PI * t), a * Math.cos(Math.PI * t)]; },
    ellipsoide: (a, b) => { positive(a, "a"); positive(b, "b"); return t => [b * Math.sin(Math.PI * t), a * Math.cos(Math.PI * t)]; },
    cacahuete: (a, e) => {
      positive(a, "a"); finite(e, "e"); if (!(e >= 0 && e < 1)) err("e : 0 ≤ e < 1 attendu");
      return t => { const th = Math.PI * t, r = a * (1 + e * Math.cos(2 * th)); return [r * Math.sin(th), r * Math.cos(th)]; };
    },
    cylindre: (a, h) => {                                    // §7-1: the closed can, radius a, height h; arc length ∝ t
      positive(a, "a"); positive(h, "h"); const L = 2 * a + h;
      return t => { const u = L * t; return u <= a ? [u, h / 2] : u <= a + h ? [a, h / 2 - (u - a)] : [Math.max(0, L - u), -h / 2]; };
    },
  });
  function conducteurRevolution(profil, n, m) {
    if (typeof profil !== "function") err("profil : fonction t ↦ [rho, z] attendue");
    if (!(Number.isInteger(n) && n >= 4 && n <= 400)) err("n : entier de 4 à 400 attendu");
    m = m == null ? 7 : m; if (!(Number.isInteger(m) && m >= 1 && m % 2 === 1)) err("m : entier impair ≥ 1 attendu");
    const N = 4000, pts = [], s = [0];
    for (let i = 0; i <= N; i++) { const p = profil(i / N); if (!(Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]) && p[0] >= -1e-12 * (1 + Math.abs(p[1])))) err("profil : [rho ≥ 0, z] attendu"); pts.push([Math.max(0, p[0]), p[1]]); }
    for (let i = 1; i <= N; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const L = s[N]; if (!(L > 0)) err("profil : courbe de longueur nulle");
    const at = u => {
      let lo = 0, hi = N; while (hi - lo > 1) { const md = (lo + hi) >> 1; if (s[md] <= u) lo = md; else hi = md; }
      const f = (u - s[lo]) / (s[hi] - s[lo] || 1); return [pts[lo][0] + f * (pts[hi][0] - pts[lo][0]), pts[lo][1] + f * (pts[hi][1] - pts[lo][1])];
    };
    const w = L / n, ws = w / m, bandes = [], subs = [];
    for (let k = 0; k < n; k++) {
      const sub = Array.from({ length: m }, (_, j) => at((k + (j + 0.5) / m) * w)), c = at((k + 0.5) * w);
      const tot = sub.reduce((a, p) => a + p[0], 0);
      if (!(tot > 0)) err("profil : une bande est sur l'axe");
      subs.push(sub.map(p => [p[0], p[1], p[0] / tot]));
      bandes.push(Object.freeze({ rho: c[0], z: c[1], s: (k + 0.5) * w, w, aire: 2 * Math.PI * tot * ws }));
    }
    /* G[i][k]: potential at the middle of band i per coulomb on band k, σ uniform on the band (m sub-rings, weights ∝ radius).
       The sub-ring through the point itself: a thin strip of width ws, on its middle line, K q (ln(16ρ/ws) + 1)/(π ρ). */
    const G = bandes.map(bi => subs.map(sub => sub.reduce((v, [r, z, wt]) =>
      v + wt * (Math.hypot(r - bi.rho, z - bi.z) < 0.25 * ws ? K * (Math.log(16 * r / ws) + 1) / (Math.PI * r) : anneau(r, z, bi.rho, bi.z)), 0)));
    const vecteur = q => { if (!(Array.isArray(q) && q.length === n && q.every(Number.isFinite))) err("q : " + n + " charges attendues"); return q; };
    const potentiels = q => { vecteur(q); return G.map(l => l.reduce((a, g, k) => a + g * q[k], 0)); };
    function correction(q, V) {
      vecteur(q); finite(V, "V"); const out = q.slice();
      for (let i = 0; i < n; i++) { let a = 0; for (let k = 0; k < n; k++) if (k !== i) a += G[i][k] * out[k]; out[i] = (V - a) / G[i][i]; }
      return out;
    }
    function charges(V) {
      finite(V, "V"); const A = G.map(l => l.slice()), x = new Array(n).fill(V);
      for (let i = 0; i < n; i++) {                                           // Gauss, partial pivoting
        let p = i; for (let j = i + 1; j < n; j++) if (Math.abs(A[j][i]) > Math.abs(A[p][i])) p = j;
        [A[i], A[p]] = [A[p], A[i]]; [x[i], x[p]] = [x[p], x[i]];
        for (let j = i + 1; j < n; j++) { const f = A[j][i] / A[i][i]; if (f) { for (let k = i; k < n; k++) A[j][k] -= f * A[i][k]; x[j] -= f * x[i]; } }
      }
      for (let i = n - 1; i >= 0; i--) { let a = x[i]; for (let k = i + 1; k < n; k++) a -= A[i][k] * x[k]; x[i] = a / A[i][i]; }
      return x;
    }
    const capacite = charges(1).reduce((a, b) => a + b, 0);
    return { bandes: Object.freeze(bandes), longueur: L, G, potentiels, correction, charges, capacite,
      sigma: q => vecteur(q).map((x, k) => x / bandes[k].aire) };
  }
  function ellipsoideExact(a, b, Q) {
    positive(a, "a"); positive(b, "b"); finite(Q, "Q"); if (b > a) err("ellipsoïde allongé : a ≥ b attendu");
    const x = Math.sqrt((a - b) * (a + b)) / a, C0 = 4 * Math.PI * EPS0 * a * (x < 1e-4 ? 1 - x * x / 3 : x / Math.atanh(x));
    return { capacite: C0, potentiel: Q / C0,
      sigma: (rho, z) => Q / (4 * Math.PI * a * b * b * Math.sqrt(finite(rho, "rho") ** 2 / b ** 4 + finite(z, "z") ** 2 / a ** 4)) };
  }
  /* §6-7: the zero-potential surface of two charges of opposite signs */
  function apollonius(q1, x1, q2, x2) {
    finite(q1, "q1"); finite(x1, "x1"); finite(q2, "q2"); finite(x2, "x2");
    if (!(q1 * q2 < 0)) err("charges de signes opposés attendues");
    if (x1 === x2) err("x1 ≠ x2 attendu");
    const k = Math.abs(q2 / q1);
    if (Math.abs(k - 1) < 1e-12) return { plan: (x1 + x2) / 2, centre: NaN, rayon: Infinity, entoure: NaN };
    const c = (x2 - k * k * x1) / (1 - k * k), R = k * Math.abs(x2 - x1) / Math.abs(1 - k * k);
    return { plan: NaN, centre: c, rayon: R, entoure: k < 1 ? 2 : 1 };
  }
  /* §6-8: a point charge q at the height a above a grounded conducting plane */
  function sigmaPlan(q, a, rho) { finite(q, "q"); positive(a, "a"); finite(rho, "rho"); return -2 * a * q / (4 * Math.PI * (a * a + rho * rho) ** 1.5); }
  function chargeInduitePlan(q, a, R) {
    finite(q, "q"); positive(a, "a"); if (!(R >= 0)) err("R ≥ 0 attendu");
    return R === Infinity ? -q : -q * (R * R / (a * a + R * R)) / (1 + a / Math.sqrt(a * a + R * R));   // −q (1 − a/√(a² + R²)), no cancellation
  }
  function forcePlan(q, a) { finite(q, "q"); positive(a, "a"); return K * q * q / (4 * a * a); }
  function forcePlanIntegree(q, a, n) {
    finite(q, "q"); positive(a, "a"); n = n == null ? 2000 : n;
    if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    let F = 0;                                    // ρ = a tan α, the ring between α and α + dα, its pull on q along −z
    for (let i = 0; i < n; i++) {
      const al = (i + 0.5) * (Math.PI / 2) / n, rho = a * Math.tan(al), dr = a / Math.cos(al) ** 2 * (Math.PI / 2) / n, r2 = a * a + rho * rho;
      F += sigmaPlan(q, a, rho) * 2 * Math.PI * rho * dr * K * q * a / (r2 * Math.sqrt(r2));
    }
    return -F;
  }
  /* §6-9: a point charge q at the distance b from the centre of a conducting sphere of radius a (b > a) */
  function imagesSphere(q, b, a, o) {
    finite(q, "q"); positive(a, "a"); positive(b, "b"); if (!(b > a)) err("b > a attendu : la charge est hors de la sphère");
    o = o || {}; const mode = o.mode || "terre";
    const qi = -q * a / b, xi = a * a / b;
    let qc;
    if (mode === "terre") qc = 0;
    else if (mode === "isolee") qc = (o.Q == null ? 0 : finite(o.Q, "Q")) - qi;
    else if (mode === "potentiel") qc = 4 * Math.PI * EPS0 * a * finite(o.V, "V");
    else err("mode : terre, isolee ou potentiel attendu");
    return { charges: [{ q, x: b, y: 0, z: 0 }, { q: qi, x: xi, y: 0, z: 0 }, { q: qc, x: 0, y: 0, z: 0 }],
      qImage: qi, xImage: xi, qCentre: qc, Q: qi + qc, V: K * qc / a };
  }
  function forceSphere(q, b, a, o) {
    const s = imagesSphere(q, b, a, o);
    return K * q * (s.qImage / (b - s.xImage) ** 2 + s.qCentre / (b * b));
  }
  function sigmaSphere(q, b, a, o, theta) {
    finite(theta, "theta"); const s = imagesSphere(q, b, a, o), u = [Math.cos(theta), Math.sin(theta)];
    const E = champ(s.charges, [a * u[0], a * u[1], 0]);
    return EPS0 * (E[0] * u[0] + E[1] * u[1]);
  }
  function equilibreSphere(q, a, Q) {
    finite(q, "q"); positive(a, "a"); finite(Q, "Q");
    if (!(q * Q > 0)) return NaN;
    const f = b => forceSphere(q, b, a, { mode: "isolee", Q });
    let lo = a * (1 + 1e-9), hi = a * 2; while (f(hi) <= 0 && hi < 1e9 * a) hi *= 2;
    if (!(f(lo) < 0 && f(hi) > 0)) return NaN;
    for (let i = 0; i < 200 && hi - lo > 1e-14 * a; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* §6-8 applied: an electron leaving a metal, pulled back by its image, pushed out by an applied field E */
  function schottky(E0) {
    positive(E0, "E");
    const x0 = Math.sqrt(K * E / (4 * E0));
    return { x0, abaissement: Math.sqrt(K * E ** 3 * E0), energie: x => -K * E * E / (4 * positive(x, "x")) - E * E0 * x };
  }

  /* Point-charge models. Geometry from spectroscopy; charges fitted so that the model has the measured moment. */
  const STATC = 0.1 / C, DEBYE = 1e-18 * STATC * 1e-2, STATC_CM2 = STATC * 1e-4;   // C (3,3356 × 10⁻¹⁰), C·m, C·m²
  const MOLECULES = (() => {
    const L = 95.7e-12, th = 104.5 * Math.PI / 180, pEau = 1.8546 * DEBYE, dE = pEau / (2 * L * Math.cos(th / 2));
    const hx = L * Math.sin(th / 2), hy = L * Math.cos(th / 2);
    const Lc = 116e-12, theta = -4.1e-26 * STATC_CM2, dC = -theta / (2 * Lc * Lc);   // Θ = Σ q x² = −2δ L², along the axis
    return Object.freeze({
      eau: Object.freeze({ charges: [{ q: -2 * dE, x: 0, y: 0 }, { q: dE, x: -hx, y: hy }, { q: dE, x: hx, y: hy }], p: pEau }),
      co2: Object.freeze({ charges: [{ q: -dC, x: -Lc, y: 0 }, { q: 2 * dC, x: 0, y: 0 }, { q: -dC, x: Lc, y: 0 }], theta }),
    });
  })();

  /* ---------- Étape « Condensateur plan et claquage » (§6-10 to §6-12) ---------- */
  /* §6-10: two thin coaxial disks ±U/2, by flat rings of charge (collocation) */
  function capacitePlan(A, d) { positive(A, "A"); positive(d, "d"); return EPS0 * A / d; }
  function kirchhoff(a, d) { positive(a, "a"); positive(d, "d"); return EPS0 * Math.PI * a * a / d + EPS0 * a * (Math.log(16 * Math.PI * a / d) - 1); }
  /* mean of ln √((x − u)² + h²) for u uniform on [−w/2, w/2] */
  function lnMoyen(x, h, w) {
    const P = t => (h > 0 ? 0.5 * t * Math.log(t * t + h * h) - t + h * Math.atan(t / h) : t === 0 ? 0 : t * Math.log(Math.abs(t)) - t);
    return (P(x + w / 2) - P(x - w / 2)) / w;
  }
  /* potential per coulomb at (ri, h) of a flat ring of radius rj and width ws (uniform σ): the thin ring (anneau), corrected
     near the strip by the difference between the strip and its middle line, both in the logarithmic approximation */
  function anneauPlat(rj, ws, ri, h) {
    h = Math.abs(h); const x = ri - rj, dist = Math.hypot(x, h);
    if (dist > 6 * ws) return anneau(rj, 0, ri, h);
    if (dist < 1e-9 * ws) return K * (Math.log(16 * rj / ws) + 1) / (Math.PI * rj);
    return anneau(rj, 0, ri, h) + K * (Math.log(dist) - lnMoyen(x, h, ws)) / (Math.PI * rj);
  }
  function resoudre(G, b) {                                   // Gauss, partial pivoting; G and b are copied
    const n = b.length, A = G.map(l => l.slice()), x = b.slice();
    for (let i = 0; i < n; i++) {
      let p = i; for (let j = i + 1; j < n; j++) if (Math.abs(A[j][i]) > Math.abs(A[p][i])) p = j;
      [A[i], A[p]] = [A[p], A[i]]; [x[i], x[p]] = [x[p], x[i]];
      for (let j = i + 1; j < n; j++) { const f = A[j][i] / A[i][i]; if (f) { for (let k = i; k < n; k++) A[j][k] -= f * A[i][k]; x[j] -= f * x[i]; } }
    }
    for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let k = i + 1; k < n; k++) s -= A[i][k] * x[k]; x[i] = s / A[i][i]; }
    return x;
  }
  function condensateurDisques(a, d, n, m) {
    positive(a, "a"); positive(d, "d");
    n = n == null ? 60 : n; m = m == null ? 5 : m;
    if (!(Number.isInteger(n) && n >= 4 && n <= 300)) err("n : entier de 4 à 300 attendu");
    if (!(Number.isInteger(m) && m >= 1 && m % 2 === 1)) err("m : entier impair ≥ 1 attendu");
    const r = Array.from({ length: n + 1 }, (_, k) => a * (1 - (1 - k / n) ** 2));   // finer toward the edge, where σ ∝ 1/√(a − ρ)
    const rc = r.slice(0, n).map((x, k) => (x + r[k + 1]) / 2);
    const subs = r.slice(0, n).map((x, k) => { const ws = (r[k + 1] - x) / m, s = Array.from({ length: m }, (_, j) => x + (j + 0.5) * ws), tot = s.reduce((u, v) => u + v, 0); return { ws, s: s.map(y => [y, y / tot]) }; });
    const sur = (ri, h) => subs.map(({ ws, s }) => s.reduce((v, [rj, wt]) => v + wt * anneauPlat(rj, ws, ri, h), 0));
    const G = rc.map(ri => { const meme = sur(ri, 0), autre = sur(ri, d); return meme.map((g, k) => g - autre[k]); });
    const q = resoudre(G, new Array(n).fill(0.5)), Q = q.reduce((u, v) => u + v, 0);     // U = 1 V: +½ V on the disk z = d/2
    const aires = r.slice(0, n).map((x, k) => Math.PI * (r[k + 1] ** 2 - x * x));
    function potentiel(rho, z) {                               // V for U = 1 V; multiply by U
      finite(rho, "rho"); finite(z, "z"); rho = Math.abs(rho);
      let v = 0;
      subs.forEach(({ ws, s }, k) => s.forEach(([rj, wt]) => { v += q[k] * wt * (anneauPlat(rj, ws, rho, z - d / 2) - anneauPlat(rj, ws, rho, z + d / 2)); }));
      return v;
    }
    return { capacite: Q, ideale: EPS0 * Math.PI * a * a / d, kirchhoff: kirchhoff(a, d), bords: r.slice(), milieux: rc,
      sigma: q.map((x, k) => x / aires[k]), sigmaIdeale: EPS0 / d, potentiel };
  }

  /* §6-11: two spheres joined by a wire; Townsend's avalanche in a gas */
  function champsSpheresReliees(a, b, d, V) {
    const s = spheresReliees(a, b, d, V == null ? 1 : V), N = 180;
    const max = k => { let m = 0; for (let i = 0; i <= N; i++) m = Math.max(m, Math.abs(s.surface(k, Math.PI * i / N)[0])); return m; };
    const Ea = max(1), Eb = max(2);
    return { Ea, Eb, rapport: Eb / Ea, rapport635: a / b, Q1: s.Q1, Q2: s.Q2 };
  }
  const AIR = Object.freeze({ A: 11.25, B: 273.75, gamma: 0.01 });   // (Pa·m)⁻¹, V·(Pa·m)⁻¹ (112,5 (kPa·cm)⁻¹, 2737,5 V/(kPa·cm))
  const gaz = o => { o = o || AIR; positive(o.A, "A"); positive(o.B, "B"); positive(o.gamma, "gamma"); return o; };
  function townsendAlpha(Ec, p, o) { o = gaz(o); positive(Ec, "E"); positive(p, "p"); return o.A * p * Math.exp(-o.B * p / Ec); }
  function libreParcours(p, o) { o = gaz(o); positive(p, "p"); return 1 / (o.A * p); }
  function paschen(pd, o) {
    o = gaz(o); positive(pd, "pd");
    const den = Math.log(o.A * pd) - Math.log(Math.log(1 + 1 / o.gamma));
    return den > 0 ? o.B * pd / den : NaN;
  }
  function paschenMinimum(o) { o = gaz(o); const pd = Math.E * Math.log(1 + 1 / o.gamma) / o.A; return { pd, V: o.B * pd }; }

  /* §6-12: a needle, its field, and the electrons that tunnel out of it */
  function champPointe(L, rho, V) {
    positive(L, "L"); positive(rho, "rho"); finite(V, "V"); if (!(rho < L)) err("rho < L attendu (aiguille allongée)");
    const b = Math.sqrt(L * rho), x = Math.sqrt((L - b) * (L + b)) / L, r = x < 1e-4 ? 1 - x * x / 3 : x / Math.atanh(x);
    return { E: V * r / rho, k: 1 / r, b };
  }
  const A_FN = E ** 3 / (8 * Math.PI * Cst.h), B_FN = 8 * Math.PI * Math.sqrt(2 * ME) / (3 * E * Cst.h);   // A·J·V⁻², J^(−3/2)·V·m⁻¹
  function barriereSN(F, phi) {
    positive(F, "F"); positive(phi, "phi");
    const W = phi * E, c = K * E * E / 4;
    return x => W - E * F * positive(x, "x") - c / x;                                 // J, above the Fermi level
  }
  function exposantWKB(F, phi, n) {
    positive(F, "F"); positive(phi, "phi"); n = n == null ? 400 : n;
    if (!(Number.isInteger(n) && n >= 2)) err("n : entier ≥ 2 attendu");
    const W = phi * E, eF = E * F, c = K * E * E / 4, disc = W * W - 4 * eF * c;
    if (!(disc > 0)) return 0;                                                        // no barrier left: f ≥ 1
    const x1 = (W - Math.sqrt(disc)) / (2 * eF), x2 = (W + Math.sqrt(disc)) / (2 * eF), U = barriereSN(F, phi);
    let s = 0;                                                                        // x = x1 + (x2 − x1)(1 − cos θ)/2: smooth at the turning points
    for (let i = 0; i < n; i++) { const th = Math.PI * (i + 0.5) / n, x = x1 + (x2 - x1) * (1 - Math.cos(th)) / 2;
      s += Math.sqrt(Math.max(0, U(x))) * (x2 - x1) * Math.sin(th) / 2 * Math.PI / n; }
    return 2 * Math.sqrt(2 * ME) * s / Cst.hbar;
  }
  function fowlerNordheim(F, phi) {
    positive(F, "F"); positive(phi, "phi");
    const W = phi * E, f = K * E * F / (phi * phi), g0 = B_FN * W ** 1.5 / F, Jt = A_FN * F * F / W * Math.exp(-g0);
    if (!(f < 1)) return { f, v: 0, t: NaN, triangle: g0, exposant: 0, J: NaN, Jtriangle: Jt };
    const v = ff => { const Ff = F * ff / f; return exposantWKB(Ff, phi) / (B_FN * W ** 1.5 / Ff); };
    const h = Math.min(1e-3, f / 10, (1 - f) / 10), v0 = v(f), t = v0 - (4 / 3) * f * (v(f + h) - v(f - h)) / (2 * h);
    return { f, v: v0, t, triangle: g0, exposant: v0 * g0, J: A_FN * F * F / (W * t * t) * Math.exp(-v0 * g0), Jtriangle: Jt };
  }

  /* ---------- Étape « Énergie électrostatique et densité d'énergie » (§8-1, §8-5, §8-6) ---------- */
  function energiePaires(charges) {
    const c = liste(charges).map(s => ({ q: finite(s.q, "q"), p: pos(s) }));
    let U = 0;
    for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) {
      const a = c[i].p, b = c[j].p, r = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      U += r > 0 ? K * c[i].q * c[j].q / r : NaN;
    }
    return U;
  }
  const repartition = B => (B && typeof B.charge === "function" ? B : err("B : répartition { charge(r) } attendue"));
  const tranches = (n, d) => { n = n == null ? d : n; return Number.isInteger(n) && n >= 2 ? n : err("n : entier ≥ 2 attendu"); };
  function energieAssemblage(B, R, n) {
    repartition(B); positive(R, "R"); n = tranches(n, 2000);
    if (B.charge(0) !== 0) err("charge au centre : énergie infinie (leçon « Énergie d'une charge ponctuelle »)");
    let U = 0, q0 = 0;
    for (let i = 1; i <= n; i++) {
      const q1 = finite(B.charge(R * i / n), "charge"), r = R * (i - 0.5) / n;   // the shell between r_(i−1) and r_i, brought from infinity
      U += K * ((q0 + q1) / 2) * (q1 - q0) / r; q0 = q1;
    }
    return U;
  }
  function energieBoule(Q, a) { finite(Q, "Q"); positive(a, "a"); return 0.6 * K * Q * Q / a; }
  function profilEnergie(B, R, n) {
    repartition(B); positive(R, "R"); n = tranches(n, 4000);
    if (B.charge(0) !== 0) err("charge au centre : énergie infinie (leçon « Énergie d'une charge ponctuelle »)");
    const h = R / n, r = Array.from({ length: n + 1 }, (_, i) => i === n ? R : h * i), Q = r.map(x => finite(B.charge(x), "charge"));
    const E = r.map((x, i) => (i === 0 ? 0 : K * Q[i] / (x * x))), Qt = Q[n];
    const phi = new Array(n + 1); phi[n] = K * Qt / R;
    for (let i = n - 1; i >= 0; i--) phi[i] = phi[i + 1] + (E[i] + E[i + 1]) / 2 * h;
    const uE = r.map((x, i) => EPS0 / 2 * E[i] * E[i] * 4 * Math.PI * x * x);
    const cE = [0], cR = [0];
    for (let i = 1; i <= n; i++) { cE.push(cE[i - 1] + (uE[i - 1] + uE[i]) / 2 * h); cR.push(cR[i - 1] + (phi[i - 1] + phi[i]) / 4 * (Q[i] - Q[i - 1])); }
    const dehors = K * Qt * Qt / 2, total = cE[n] + dehors / R;
    const interp = (t, x) => { const u = Math.min(n, x / h), i = Math.min(n - 1, Math.floor(u)); return t[i] + (t[i + 1] - t[i]) * (u - i); };
    const rayon = x => (x >= 0 ? x : err("r ≥ 0 attendu"));                       // Infinity allowed: the whole space
    const dQ = typeof B.rho === "function" ? x => B.rho(x) * 4 * Math.PI * x * x   // dQ/dr, C·m⁻¹
      : x => { const a = Math.max(0, x - h / 2), b = Math.min(R, x + h / 2); return (B.charge(b) - B.charge(a)) / (b - a); };
    return { total, charge: Qt,
      potentiel: x => (rayon(x) >= R ? K * Qt / Math.max(x, R) : interp(phi, x)),
      densiteChamp: x => (rayon(x) >= R ? dehors / (x * x) : interp(uE, x)),
      densiteRhoPhi: x => (rayon(x) > R ? 0 : dQ(x) * interp(phi, x) / 2),
      champ: x => (rayon(x) === Infinity ? total : x >= R ? total - dehors / x : interp(cE, x)),
      rhoPhi: x => (rayon(x) >= R ? cR[n] : interp(cR, x)),
      surface: x => (rayon(x) === Infinity ? 0 : x >= R ? dehors / x : interp(phi, x) * B.charge(x) / 2) };
  }
  function energieHorsRayon(q, r) { finite(q, "q"); positive(r, "r"); return K * q * q / (2 * r); }
  function rayonElectromagnetique(m, f, q) {
    positive(m, "m"); positive(f, "f"); q = q == null ? E : finite(q, "q");
    return f * K * q * q / (m * C * C);
  }
  function densiteCroisee(c1, c2, p) {
    const a = champ([c1], point(p)), b = champ([c2], p);
    return EPS0 * a.reduce((s, x, i) => s + x * b[i], 0);
  }
  function energieCroisee(q1, q2, d, n) {
    finite(q1, "q1"); finite(q2, "q2"); positive(d, "d"); n = tranches(n, 1000);
    /* σ = (r1 + r2)/d ∈ [1, ∞[, τ = (r1 − r2)/d ∈ [−1, 1], dV = (d/2)³ (σ² − τ²) dσ dτ dφ; E1·E2 = K² q1 q2 cos γ/(r1² r2²):
       ε0 ∫ E1·E2 dV = (K q1 q2/d) ∫∫ (σ² + τ² − 2)/(σ² − τ²)² dσ dτ. σ = 1/(1 − w), w ∈ [0, 1[. */
    let s = 0;
    for (let i = 0; i < n; i++) {
      const w = (i + 0.5) / n, sg = 1 / (1 - w), ds = sg * sg / n;
      for (let j = 0; j < n; j++) { const ta = -1 + 2 * (j + 0.5) / n, D = sg * sg - ta * ta; s += (sg * sg + ta * ta - 2) / (D * D) * ds * 2 / n; }
    }
    return K * q1 * q2 / d * s;
  }

  /* ---------- Étape « Méthodes de calcul du champ » (§7-1 to §7-5) ---------- */
  /* §7-1: the closed can, solved numerically by rings of charge (no exact solution); bounded by what it contains and what contains it */
  function capaciteDisque(a) { return 8 * EPS0 * positive(a, "a"); }
  function boite(a, h, n) {
    positive(a, "a"); positive(h, "h"); n = n == null ? 120 : n;
    const c = conducteurRevolution(PROFILS.cylindre(a, h), n), q = c.charges(1), s = c.sigma(q);
    return { capacite: c.capacite, disque: capaciteDisque(a), sphereVolume: 4 * Math.PI * EPS0 * Math.cbrt(0.75 * a * a * h),
      sphereCirconscrite: 4 * Math.PI * EPS0 * Math.hypot(a, h / 2), longueur: c.longueur,
      bandes: c.bandes.map((b, k) => Object.freeze({ s: b.s, rho: b.rho, z: b.z, sigma: s[k] })) };
  }

  /* §7-2: F(z) = U + iV analytic; the potential is A U (A in V per unit of U), the field lines are V = const.
     E = −A conj(F′): Ex = −A Re F′, Ey = A Im F′, from Cauchy–Riemann (7.7)–(7.8). */
  const polaire = (x, y) => [Math.hypot(finite(x, "x"), finite(y, "y")), Math.atan2(y, x)];
  function coin(beta) {
    positive(beta, "beta"); if (beta > 2 * Math.PI * (1 + 1e-12)) err("beta ≤ 2π attendu");
    const p = Math.PI / beta, h = beta / 2 * (1 + 1e-12), dedans = t => Math.abs(t) <= h;
    return Object.freeze({ p, exposant: p - 1, beta,
      F: (x, y) => { const [r, t] = polaire(x, y); return dedans(t) ? [r ** p * Math.cos(p * t), r ** p * Math.sin(p * t)] : [NaN, NaN]; },
      dF: (x, y) => { const [r, t] = polaire(x, y); if (!dedans(t) || r === 0) return [NaN, NaN];
        const m = p * r ** (p - 1); return [m * Math.cos((p - 1) * t), m * Math.sin((p - 1) * t)]; },
      metal: (x, y) => { const [r, t] = polaire(x, y); return r > 0 && Math.abs(t) >= beta / 2 * (1 - 1e-12); } });
  }
  const PLANS = Object.freeze({
    carre: coin(Math.PI / 2), plan: coin(Math.PI), deuxTiers: coin(1.5 * Math.PI), racine: coin(2 * Math.PI),
    ligne: Object.freeze({ exposant: -1,
      F: (x, y) => { const [r, t] = polaire(x, y); return r > 0 ? [Math.log(r), t] : [NaN, NaN]; },
      dF: (x, y) => { const r2 = x * x + y * y; return r2 > 0 ? [x / r2, -y / r2] : [NaN, NaN]; }, metal: () => false }),
    dipole: Object.freeze({ exposant: -2,
      F: (x, y) => { const r2 = finite(x, "x") ** 2 + finite(y, "y") ** 2; return r2 > 0 ? [x / r2, -y / r2] : [NaN, NaN]; },
      dF: (x, y) => { const r2 = x * x + y * y; return r2 > 0 ? [-(x * x - y * y) / (r2 * r2), 2 * x * y / (r2 * r2)] : [NaN, NaN]; }, metal: () => false }),
  });
  function champPlan(f, A, x, y) {
    if (!(f && typeof f.F === "function" && typeof f.dF === "function")) err("f : { F, dF } attendu (PLANS)");
    finite(A, "A"); const [U, V] = f.F(x, y), [a, b] = f.dF(x, y), E = [-A * a, A * b];
    return { U, V, phi: A * U, E, norme: Math.hypot(E[0], E[1]) };
  }

  /* §7-3: N sheets of electrons on a uniform ion background, periodic box of length 1, time in units of 1/ω_p.
     The field on each sheet comes from Gauss (the charge on its left, mean field zero), not from (7.21):
     a_i = −(1/N) [N x_i − (sheets on its left) − ½ + N/2 − Σ x_j]. Exactly −(s_i − s̄) while no two sheets cross. */
  function feuillets(o) {
    o = o || {}; const N = o.N == null ? 64 : o.N, mode = o.mode == null ? 1 : o.mode, kA = finite(o.kA == null ? 0.5 : o.kA, "kA");
    const duree = positive(o.duree == null ? 6 * Math.PI : o.duree, "duree"), dt = positive(o.pas == null ? 0.01 : o.pas, "pas");
    if (!(Number.isInteger(N) && N >= 4 && N <= 2000)) err("N : entier de 4 à 2000 attendu");
    if (!(Number.isInteger(mode) && mode >= 1 && mode < N / 2)) err("mode : entier de 1 à N/2 attendu");
    const x0 = Array.from({ length: N }, (_, j) => (j + 0.5) / N), k = 2 * Math.PI * mode;
    const x = x0.slice(), v = x0.map(u => kA / k * Math.sin(k * u));     // s = 0, v = (kA/k) sin kx0: s_max k = kA at t = π/2
    const idx = Array.from({ length: N }, (_, j) => j), rang = new Array(N), w = new Array(N);
    const accel = () => {
      let S = 0; for (let j = 0; j < N; j++) { w[j] = x[j] - Math.floor(x[j]); S += w[j]; }
      idx.sort((i, j) => w[i] - w[j]); idx.forEach((i, r) => { rang[i] = r; });
      return w.map((u, i) => -(N * u - rang[i] - 0.5 + N / 2 - S) / N);
    };
    const pasTotal = Math.round(duree / dt), tous = Math.max(1, Math.round((o.echantillon == null ? 0.05 : o.echantillon) / dt));
    const t = [], s = [], modeA = [];
    const amplitude = () => -(2 / (k * N)) * x.reduce((a, u) => a + Math.cos(k * u), 0);   // density mode: depends on the set of positions only
    const ordre = () => { for (let j = 0; j < N; j++) { const nx = (j + 1) % N; if (x[nx] + (nx === 0 ? 1 : 0) - x[j] < 0) return false; } return true; };
    let a = accel(), croise = !ordre(), premier = croise ? 0 : NaN;
    for (let n = 0; n <= pasTotal; n++) {
      if (n % tous === 0) { t.push(n * dt); s.push(x.map((u, j) => u - x0[j])); modeA.push(amplitude()); }
      if (n === pasTotal) break;
      for (let j = 0; j < N; j++) { v[j] += a[j] * dt / 2; x[j] += v[j] * dt; }
      a = accel(); for (let j = 0; j < N; j++) v[j] += a[j] * dt / 2;
      if (!croise && !ordre()) { croise = true; premier = (n + 1) * dt; }
    }
    const zeros = [];                                                   // (2/k) J1(kA sin t) before any crossing: zeros half a period apart
    for (let i = 1; i < t.length; i++) if (modeA[i - 1] !== 0 && modeA[i - 1] * modeA[i] <= 0) zeros.push(t[i - 1] + (t[i] - t[i - 1]) * modeA[i - 1] / (modeA[i - 1] - modeA[i]));
    const periode = zeros.length >= 3 ? 2 * (zeros[zeros.length - 1] - zeros[1]) / (zeros.length - 2) : NaN;
    return { t, s, mode: modeA, x0, periode, croisement: premier };
  }

  /* §7-4: ions in a potential (Boltzmann), screened by the Debye length */
  function longueurDebye(T, n0, o) {
    o = o || {}; positive(T, "T"); positive(n0, "n0");
    const epsr = positive(o.epsr == null ? 1 : o.epsr, "epsr"), z = positive(o.z == null ? 1 : o.z, "z"), especes = positive(o.especes == null ? 2 : o.especes, "especes");
    return Math.sqrt(epsr * EPS0 * Cst.k_B * T / (especes * n0 * (z * E) ** 2));
  }
  function gouyChapman(sigma, T, n0, o) {
    finite(sigma, "sigma"); o = o || {}; const epsr = o.epsr == null ? 1 : o.epsr, eps = epsr * EPS0, kT = Cst.k_B * positive(T, "T");
    const D = longueurDebye(T, n0, { epsr }), phi0 = 2 * kT / E * Math.asinh(sigma / Math.sqrt(8 * n0 * eps * kT)), gamma = Math.tanh(E * phi0 / (4 * kT));
    const x0 = x => (finite(x, "x") >= 0 ? x : err("x ≥ 0 attendu"));
    const phi = x => 4 * kT / E * Math.atanh(gamma * Math.exp(-x0(x) / D));
    return { D, phi0, phi0Lineaire: sigma * D / eps, gamma, thermique: kT / E, phi,
      phiLineaire: x => sigma * D / eps * Math.exp(-x0(x) / D),
      nPlus: x => n0 * Math.exp(-E * phi(x) / kT), nMoins: x => n0 * Math.exp(E * phi(x) / kT) };
  }
  function dlvo(R, H, sigma, T, n0, o) {
    positive(R, "R"); finite(H, "H"); const g = gouyChapman(sigma, T, n0, o), kT = Cst.k_B * T, D = g.D;
    const U = h => 64 * Math.PI * R * n0 * kT * g.gamma ** 2 * D * D * Math.exp(-positive(h, "h") / D) - H * R / (12 * h);
    let best = { h: NaN, U: -Infinity };
    for (let i = 0; i <= 600; i++) { const h = 2e-10 * Math.pow(250 * D / 2e-10, i / 600), u = U(h); if (u > best.U) best = { h, U: u }; }
    return { D, gamma: g.gamma, phi0: g.phi0, U, barriere: best.U > 0 && best.h > 2e-10 ? best : { h: NaN, U: 0 } };
  }

  /* §7-5: a plane grid of parallel wires, spacing a, charge λ per metre each, at z = 0, x = m a. Exact:
     φ = −(λ/(4π ε0)) ln(2 cosh(2πz/a) − 2 cos(2πx/a)) = −λ|z|/(2 ε0 a) + Σ (λ/(2π ε0 n)) e^(−2πn|z|/a) cos(2πnx/a). */
  function grille(lambda, a) {
    finite(lambda, "lambda"); positive(a, "a"); const k = 2 * Math.PI / a, E0 = lambda / (2 * EPS0 * a), Kl = lambda / (4 * Math.PI * EPS0);
    const parts = (x, z) => { const u = k * Math.abs(finite(z, "z")), v = k * finite(x, "x"), q = Math.exp(-u); return { u, v, q, D: 1 - 2 * q * Math.cos(v) + q * q }; };
    return { E0, k,
      potentiel: (x, z) => { const { u, D } = parts(x, z); return D > 0 ? -Kl * (u + Math.log(D)) : NaN; },
      champ: (x, z) => { const { v, q, D } = parts(x, z); if (!(D > 0)) return [NaN, NaN];
        return [E0 * 2 * q * Math.sin(v) / D, E0 * Math.sign(z) * (1 - q * q) / D]; },
      harmonique: (n, z) => { if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu"); return lambda / (2 * Math.PI * EPS0 * n) * Math.exp(-n * k * Math.abs(finite(z, "z"))); },
      serie: (x, z, N) => { if (!(Number.isInteger(N) && N >= 0)) err("N : entier ≥ 0 attendu"); let s = -E0 * Math.abs(finite(z, "z"));
        for (let n = 1; n <= N; n++) s += lambda / (2 * Math.PI * EPS0 * n) * Math.exp(-n * k * Math.abs(z)) * Math.cos(n * k * finite(x, "x")); return s; },
      ondulation: z => 1 / Math.sinh(k * Math.abs(finite(z, "z"))) };
  }
  function triode(a, r0, d, c) {
    positive(a, "a"); positive(r0, "r0"); positive(d, "d"); positive(c, "c"); if (!(2 * Math.PI * r0 < a)) err("r0 < a/(2π) attendu (fils fins)");
    const delta = a / (2 * Math.PI) * Math.log(a / (2 * Math.PI * r0)), mu = d / delta;
    const etat = (Vg, Vp) => {                                       // φ = α + β z − s|z| + grid ripple, s = λ/(2 ε0 a)
      finite(Vg, "Vg"); finite(Vp, "Vp"); const G = (Vp + Vg * d / delta) / (c + d + c * d / delta), s = (Vg - c * G) / (2 * delta);
      return { G, s, alpha: c * G, beta: G - s };
    };
    return { delta, mu,
      champCathode: (Vg, Vp) => -etat(Vg, Vp).G,
      potentiel: (Vg, Vp) => { const e = etat(Vg, Vp), g = grille(2 * EPS0 * a * e.s, a); return (x, z) => e.alpha + e.beta * z + g.potentiel(x, z); } };
  }

  /* ---------- Étape « Polarisation d'un diélectrique » (§10-1 to §10-4) ---------- */
  const kappa = (k, n) => (k === Infinity || (Number.isFinite(k) && k >= 1) ? k : err((n || "kappa") + " : κ ≥ 1 (Infinity : un conducteur) attendu"));
  function couches(sigma, cs) {
    finite(sigma, "sigma");
    if (!Array.isArray(cs) || !cs.length) err("couches : liste [{ e, kappa }] non vide attendue");
    let x = 0, V = 0, somme = 0;
    const L = cs.map(c => {
      const e = positive(c && c.e, "e"), k = kappa(c.kappa), inv = k === Infinity ? 0 : 1 / k;
      const s = { x0: x, x1: x + e, e, kappa: k, E: sigma * inv / EPS0, P: sigma * (1 - inv), D: sigma };
      x += e; V += s.E * e; somme += e * inv;
      return s;
    });
    const faces = L.map((s, i) => (i === 0 ? -s.P : L[i - 1].P - s.P)).concat([L[L.length - 1].P]);
    const C0 = EPS0 / x, Cs = somme > 0 ? EPS0 / somme : Infinity;
    return { couches: L, faces, V, d: x, capacite: Cs, vide: C0, rapport: Cs / C0 };
  }
  function profilDielectrique(sigma, k, d, n) {
    finite(sigma, "sigma"); if (typeof k !== "function") err("kappa : fonction x ↦ κ(x) attendue"); positive(d, "d"); n = tranches(n, 400);
    const h = d / n, x = [], ka = [], Ex = [], P = [], xm = [], rho = [];
    for (let i = 0; i <= n; i++) {
      const xi = i === n ? d : h * i, ki = kappa(k(xi), "kappa(x)"), inv = ki === Infinity ? 0 : 1 / ki;
      x.push(xi); ka.push(ki); Ex.push(sigma * inv / EPS0); P.push(sigma * (1 - inv));
    }
    let V = 0;
    for (let i = 0; i < n; i++) { xm.push(x[i] + h / 2); rho.push(-(P[i + 1] - P[i]) / h); V += (Ex[i] + Ex[i + 1]) / 2 * h; }
    return { x, kappa: ka, E: Ex, P, D: sigma, xm, rho, V, capacite: V > 0 ? sigma / V : Infinity, vide: EPS0 / d, gauche: -P[0], droite: P[n] };
  }
  function chargesDeplacees(P, x0, x1, Nq, bords) {
    if (typeof P !== "function") err("P : fonction x ↦ P(x) attendue"); finite(x0, "x0"); finite(x1, "x1"); if (!(x1 > x0)) err("x1 > x0 attendu");
    positive(Nq, "Nq");
    if (!Array.isArray(bords) || bords.length < 2 || !bords.every((b, i) => Number.isFinite(b) && (i === 0 || b > bords[i - 1]))) err("bords : liste croissante d'au moins deux abscisses attendue");
    const y = u => u + finite(P(u), "P") / Nq;                       // where the positive charge that rests at u sits
    for (let i = 0, m = 400, yp = y(x0); i < m; i++) { const yi = y(x0 + (x1 - x0) * (i + 1) / m); if (!(yi > yp)) err("déplacement non monotone : |dP/dx| < N q attendu"); yp = yi; }
    const y0 = y(x0), y1 = y(x1);
    const inv = b => {
      if (b <= y0) return x0; if (b >= y1) return x1;
      let lo = x0, hi = x1;
      for (let i = 0; i < 200 && hi - lo > 1e-15 * (x1 - x0); i++) { const m = (lo + hi) / 2; if (y(m) < b) lo = m; else hi = m; }
      return (lo + hi) / 2;
    };
    const dedans = b => Math.min(x1, Math.max(x0, b));
    return bords.slice(1).map((b, i) => { const a = bords[i]; return Nq * ((inv(b) - inv(a)) - (dedans(b) - dedans(a))); });
  }
  function atomeNuage(E0, a, Z, N) {
    finite(E0, "E"); positive(a, "a"); Z = Z == null ? 1 : positive(Z, "Z");
    const k = Z * thomson(Z * E, a).k, delta = Z * E * E0 / k, alpha = 4 * Math.PI * EPS0 * a ** 3;
    const o = { delta, relatif: delta / a, alpha, p: Z * E * delta, Eatome: K * Z * E / (a * a) };
    if (N != null) { positive(N, "N"); o.P = N * o.p; o.chi = N * alpha / EPS0; }
    return o;
  }
  function chargeDielectrique(q, k, R) {
    finite(q, "q"); k = kappa(k); if (k === Infinity) err("kappa fini attendu"); positive(R, "R");
    const lie = q * (1 - 1 / k);
    return { lieeCentre: -lie, lieeSurface: lie, apparente: q / k,
      champ: r => (positive(r, "r") < R ? K * q / (k * r * r) : K * q / (r * r)),
      deplacement: r => q / (4 * Math.PI * positive(r, "r") * r) };
  }

  /* ---------- étape « Le champ électrique de l'atmosphère » (§9-1 à §9-3) ---------- */
  function chargeTerre(E0, R) {
    finite(E0, "E"); R = R == null ? Cst.R_E_mean : positive(R, "R");
    const sigma = -EPS0 * E0;
    return { sigma, Q: 4 * Math.PI * R * R * sigma };
  }
  /* Legendre Q1 and its derivative for x > 1; series in 1/x² when x is large (x atanh(1/x) − 1 cancels) */
  function legendreQ1(x) {
    if (x < 4) return x * Math.atanh(1 / x) - 1;
    const u = 1 / (x * x); let s = 0, p = 1;
    for (let k = 1; k < 60; k++) { p *= u; const d = p / (2 * k + 1); s += d; if (d < 1e-17 * s) break; }
    return s;
  }
  function legendreQ1p(x) {
    if (x < 4) return Math.atanh(1 / x) - x / (x * x - 1);
    const u = 1 / (x * x); let s = 0, p = 1 / x;
    for (let k = 1; k < 60; k++) { p *= u; const d = 2 * k * p / (2 * k + 1); s += d; if (d < 1e-17 * s) break; }
    return -s;
  }
  function pieceAuSol(h, b) {
    positive(h, "h"); positive(b, "b"); if (b > h) err("b ≤ h attendu (objet plus haut que large)");
    const f = Math.sqrt((h - b) * (h + b));
    if (f < 1e-6 * h) {                                              // the hemisphere: φ = E0 z (1 − h³/r³)
      return { renfort: 3, foyer: 0, xi0: Infinity,
        potentiel: (x, z) => { const r = Math.hypot(finite(x, "x"), finite(z, "z")); return r <= h ? 0 : z * (1 - (h / r) ** 3); } };
    }
    const xi0 = h / f, q0 = legendreQ1(xi0), renfort = 1 - xi0 * legendreQ1p(xi0) / q0;
    function potentiel(x, z) {
      finite(x, "x"); finite(z, "z");
      const xi = (Math.hypot(x, z - f) + Math.hypot(x, z + f)) / (2 * f);
      if (xi <= xi0) return 0;
      return z * (1 - xi0 * legendreQ1(xi) / (xi * q0));
    }
    return { renfort, foyer: f, xi0, potentiel };
  }
  function moulinChamp(E0, A, f) {
    finite(E0, "E"); positive(A, "A"); positive(f, "f");
    const Q = EPS0 * E0 * A;
    return { Q, I: 2 * Math.abs(Q) * f };
  }
  function tempsRelaxation(sigma) { return EPS0 / positive(sigma, "sigma"); }
  function colonne(o) {
    o = o || {};
    const s0 = positive(o.sigmaSol, "sigmaSol"), H = positive(o.H, "H"), V = positive(o.VI, "VI");
    const h = o.h == null ? 0 : finite(o.h, "h"), f = o.f == null ? 1 : finite(o.f, "f");
    if (h < 0) err("h ≥ 0 attendu"); if (!(f >= 1)) err("f ≥ 1 attendu (la couche conduit moins que l'exponentielle)");
    const a = Math.exp(-h / H);
    const sigma = z => { finite(z, "z"); if (z < 0) err("z ≥ 0 attendu"); return (z < h ? s0 : f * s0) * Math.exp(z / H); };
    const resistanceSous = z => {                                    // ∫0^z dz'/σ, Ω·m²
      finite(z, "z"); if (z < 0) err("z ≥ 0 attendu");
      if (z <= h) return H * (1 - Math.exp(-z / H)) / s0;
      return H * (1 - a) / s0 + H * (a - Math.exp(-z / H)) / (f * s0);
    };
    const Rc = H * (1 - a) / s0 + H * a / (f * s0), j = V / Rc;
    return { Rc, j, Esol: j / s0, sigma, champ: z => j / sigma(z), potentiel: z => j * resistanceSous(z),
      part: z => resistanceSous(z) / Rc, tau: EPS0 / s0, saut: h > 0 ? EPS0 * j / s0 * Math.exp(-h / H) * (1 - 1 / f) : 0 };
  }
  const CHEMINEES = Object.freeze([
    Object.freeze({ id: "ameriques", lon: -60 }), Object.freeze({ id: "afrique", lon: 20 }), Object.freeze({ id: "asie", lon: 120 })]);
  function diurne(o) {
    o = o || {};
    const reg = o.regions || CHEMINEES.map(c => ({ lon: c.lon, poids: 1 }));
    if (!Array.isArray(reg) || !reg.length) err("regions : liste [{ lon, poids }] non vide attendue");
    const pic = o.pic == null ? 16 : finite(o.pic, "pic"), w = o.largeur == null ? 3 : positive(o.largeur, "largeur");
    const oc = o.ocean == null ? 0 : finite(o.ocean, "ocean"); if (oc < 0 || oc > 1) err("ocean : fraction entre 0 et 1 attendue");
    const W = reg.reduce((s, r) => s + (finite(r.poids, "poids") >= 0 ? r.poids : err("poids ≥ 0 attendu")), 0);
    if (!(W > 0)) err("au moins un poids > 0 attendu");
    const kap = 1 / (2 * Math.PI * w / 24) ** 2, n = 2400;
    let m = 0; for (let i = 0; i < n; i++) m += Math.exp(kap * (Math.cos(2 * Math.PI * i / n) - 1)); m /= n;
    const bosse = t => Math.exp(kap * (Math.cos(2 * Math.PI * t / 24) - 1)) / m;      // mean 1 over a day
    const activite = tu => oc + (1 - oc) * reg.reduce((s, r) => s + r.poids * bosse(finite(tu, "TU") + finite(r.lon, "lon") / 15 - pic), 0) / W;
    const heures = [], valeurs = [];
    for (let i = 0; i <= 288; i++) { heures.push(i / 12); valeurs.push(activite(i / 12)); }
    let iM = 0, im = 0; valeurs.forEach((v, i) => { if (v > valeurs[iM]) iM = i; if (v < valeurs[im]) im = i; });
    return { activite, heures, valeurs, max: { tu: heures[iM], v: valeurs[iM] }, min: { tu: heures[im], v: valeurs[im] },
      ecart: (valeurs[iM] - valeurs[im]) / 2 };
  }

  /* ---------- Étape « Énergie d'un condensateur, cristaux et noyaux » (§8-2 to §8-4) ---------- */
  function forceArmatures(Cde, d, h) {
    if (typeof Cde !== "function") err("C : fonction d ↦ C(d) attendue"); positive(d, "d");
    h = h == null ? 1e-4 * d : positive(h, "h"); if (!(h < d)) err("h < d attendu");
    const C0 = positive(Cde(d), "C(d)"), dC = (Cde(d + h) - Cde(d - h)) / (2 * h);
    return { C: C0, dC, parQ: Q => finite(Q, "Q") ** 2 / 2 * -dC / (C0 * C0), parV: V => finite(V, "V") ** 2 / 2 * -dC };
  }
  function bilanDeplacement(C1, C2, o) {
    positive(C1, "C1"); positive(C2, "C2"); o = o || {};
    let U1, U2, source;
    if (o.Q != null) { const Q = finite(o.Q, "Q"); U1 = Q * Q / (2 * C1); U2 = Q * Q / (2 * C2); source = 0; }
    else if (o.V != null) { const V = finite(o.V, "V"); U1 = C1 * V * V / 2; U2 = C2 * V * V / 2; source = V * V * (C2 - C1); }
    else err("{ Q } ou { V } attendu");
    const forces = source - (U2 - U1);
    return { U1, U2, dU: U2 - U1, source, forces, operateur: -forces };
  }
  function basculement(k, A, d0) {
    positive(k, "k"); positive(A, "A"); positive(d0, "d0");
    const Vb = Math.sqrt(8 * k * d0 ** 3 / (27 * EPS0 * A)), xb = d0 / 3;
    const dans = x => (finite(x, "x") >= 0 && x < d0 ? x : err("0 ≤ x < d0 attendu"));
    const force = (x, V) => EPS0 * A * finite(V, "V") ** 2 / (2 * (d0 - dans(x)) ** 2);
    const g = (x, V) => k * x - force(x, V);                         // > 0: the spring wins
    const zero = (lo, hi, V) => { for (let i = 0; i < 200 && hi - lo > 1e-15 * d0; i++) { const m = (lo + hi) / 2; if ((g(m, V) > 0) === (g(lo, V) > 0)) lo = m; else hi = m; } return (lo + hi) / 2; };
    function equilibres(V) {
      V = Math.abs(finite(V, "V"));
      if (V === 0) return { stable: 0, instable: d0 };
      if (V > Vb) return { stable: NaN, instable: NaN };
      if (V === Vb) return { stable: xb, instable: xb };
      return { stable: zero(0, xb, V), instable: zero(xb, d0 * (1 - 1e-12), V) };
    }
    return { Vb, xb, force, equilibres,
      energie: (x, V) => k * dans(x) ** 2 / 2 - EPS0 * A * finite(V, "V") ** 2 / (2 * (d0 - x)),
      energieQ: (x, Q) => k * dans(x) ** 2 / 2 + finite(Q, "Q") ** 2 * (d0 - x) / (2 * EPS0 * A),
      equilibreQ: Q => { const x = finite(Q, "Q") ** 2 / (2 * EPS0 * A * k); return x < d0 ? x : NaN; } };
  }
  function besselK0(x) {
    positive(x, "x");
    const tmax = Math.acosh(1 + 745 / x), n = Math.max(40, Math.ceil(tmax / 0.05)), h = tmax / n;
    let s = Math.exp(-x) / 2;
    for (let i = 1; i <= n; i++) s += Math.exp(-x * Math.cosh(i * h));
    return s * h;
  }
  function ligneAlternee(rho, x) {
    positive(rho, "rho"); finite(x, "x");
    let s = 0;
    for (let m = 1; m * Math.PI * rho < 42; m += 2) s += besselK0(m * Math.PI * rho) * Math.cos(m * Math.PI * x);
    return 4 * s;
  }
  function ligneDirecte(rho, x, N) {
    if (!(Number.isFinite(rho) && rho >= 0)) err("rho : nombre ≥ 0 attendu"); finite(x, "x");
    if (!(Number.isInteger(N) && N >= 0)) err("N : entier ≥ 0 attendu");
    let s = 0;
    for (let n = -N; n <= N; n++) s += (n % 2 ? -1 : 1) / Math.hypot(x - n, rho);
    return Number.isFinite(s) ? s : NaN;
  }
  function madelungLignes(R) {
    positive(R, "R");
    const groupes = new Map(), J = Math.floor(R);
    for (let j = -J; j <= J; j++) for (let k = -J; k <= J; k++) {
      const r2 = j * j + k * k; if (!r2 || r2 > R * R) continue;
      groupes.set(r2, (groupes.get(r2) || 0) + 1);
    }
    const propre = 2 * Math.LN2;
    let total = propre;
    const couches = [...groupes.keys()].sort((a, b) => a - b).map(r2 => {
      const rho = Math.sqrt(r2), nombre = groupes.get(r2), signe = r2 % 2 ? -1 : 1;   // the ion of line (j, k) at x = 0 has the sign (−1)^(j+k)
      const terme = -signe * nombre * ligneAlternee(rho, 0);
      total += terme;
      return { rho, nombre, signe, terme, cumul: total };
    });
    return { propre, couches, total };
  }
  function madelungSpheres(R) {
    if (!(Number.isInteger(R) && R >= 1 && R <= 40)) err("R : entier de 1 à 40 attendu");
    const par = new Map();
    for (let i = -R; i <= R; i++) for (let j = -R; j <= R; j++) for (let k = -R; k <= R; k++) {
      const r2 = i * i + j * j + k * k; if (!r2 || r2 > R * R) continue;
      par.set(r2, (par.get(r2) || 0) - ((i + j + k) % 2 ? -1 : 1) / Math.sqrt(r2));
    }
    let M = 0;
    return [...par.keys()].sort((a, b) => a - b).map(r2 => { M += par.get(r2); return { r: Math.sqrt(r2), M }; });
  }
  /* AME2020 (Wang et al., Chinese Physics C 45, 030003, 2021): atomic mass excesses, keV. Mirror pairs: Z protons and Z + 1
     neutrons (bas), Z + 1 protons and Z neutrons (haut), A = 2Z + 1. */
  const EXCES_N = 8071.31806, EXCES_H = 7288.971064;
  const MIROIRS = [[3, 1, "H", "He", 14949.81090, 14931.21888], [11, 5, "B", "C", 8667.708, 10649.397], [13, 6, "C", "N", 3125.00933, 5345.481],
    [15, 7, "N", "O", 101.43809, 2855.622], [17, 8, "O", "F", -808.76421, 1951.701], [19, 9, "F", "Ne", -1487.44512, 1752.054],
    [21, 10, "Ne", "Na", -5731.776, -2184.857], [23, 11, "Na", "Mg", -9529.85352, -5473.675], [25, 12, "Mg", "Al", -13192.782, -8915.974],
    [27, 13, "Al", "Si", -17196.864, -12384.505], [29, 14, "Si", "P", -21895.08154, -16952.849], [31, 15, "P", "S", -24440.54442, -19042.531],
    [33, 16, "S", "Cl", -26585.85830, -21003.340], [35, 17, "Cl", "Ar", -29013.532, -23047.289], [37, 18, "Ar", "K", -30947.679, -24800.201],
    [39, 19, "K", "Ca", -33807.19535, -27282.707], [41, 20, "Ca", "Sc", -35137.908, -28642.360]]
    .map(([A, Z, bas, haut, eb, eh]) => Object.freeze({ A, Z, bas: A + bas, haut: A + haut, exces: [eb, eh] }));
  const KEV = 1e3 * E;
  const miroir = m => (m && Number.isInteger(m.A) && Number.isInteger(m.Z) && m.A === 2 * m.Z + 1 && Array.isArray(m.exces) && m.exces.every(Number.isFinite)
    ? m : err("paire miroir { A = 2Z + 1, Z, exces: [bas, haut] } attendue"));
  function ecartCoulomb(m) {
    miroir(m);
    return (m.exces[1] - m.exces[0]) * KEV + (Cst.m_n - Cst.m_p - ME) * C * C;
  }
  function rayonMiroir(m, modele) {
    const dE = ecartCoulomb(m);
    if (!(dE > 0)) err("écart coulombien > 0 attendu");
    if (modele == null || modele === "boule") return 6 * m.Z * K * E * E / (5 * dE);
    if (modele === "dernier") return m.Z * K * E * E / dE;
    return err("modèle « boule » ou « dernier » attendu");
  }
  function energieCoulombNoyau(Z, R) {
    if (!(Number.isInteger(Z) && Z >= 0)) err("Z : entier ≥ 0 attendu"); positive(R, "R");
    return 3 / 5 * Z * (Z - 1) * K * E * E / R;
  }
  function energieLiaison(Z, A, exces) {
    if (!(Number.isInteger(Z) && Number.isInteger(A) && A >= Z && Z >= 0)) err("Z, A : entiers, 0 ≤ Z ≤ A attendus"); finite(exces, "exces");
    return (Z * EXCES_H + (A - Z) * EXCES_N - exces) * KEV;
  }

  /* ---------- Étape « Origine moléculaire de la polarisation » (§10-5, §11-1 to §11-3) ---------- */
  const KB = Cst.k_B, A3 = 1e-30, A0 = Cst.a0;
  function lameInseree(o) {
    o = o || {}; const L = positive(o.L, "L"), W = positive(o.W, "W"), d = positive(o.d, "d"), k = kappa(o.kappa);
    if (k === Infinity) err("kappa fini attendu");
    const C = x => { if (!(Number.isFinite(x) && x >= 0 && x <= L)) err("0 ≤ x ≤ L attendu"); return EPS0 * W * (k * x + L - x) / d; };
    const dC = EPS0 * W * (k - 1) / d;
    return { C, dC,
      forceV: V => finite(V, "V") ** 2 / 2 * dC,
      forceQ: (Q, x) => finite(Q, "Q") ** 2 / 2 * dC / C(x) ** 2,
      energieV: (x, V) => C(x) * finite(V, "V") ** 2 / 2,
      energieQ: (x, Q) => finite(Q, "Q") ** 2 / (2 * C(x)) };
  }
  function remontee(k, E0, rho, g) {
    k = kappa(k); if (k === Infinity) err("kappa fini attendu"); finite(E0, "E"); positive(rho, "rho");
    g = g == null ? Cst.g0 : positive(g, "g");
    return EPS0 * (k - 1) * E0 * E0 / (2 * rho * g);
  }
  function polarisabiliteSphere(R, k) {
    positive(R, "R"); k = kappa(k);
    return 4 * Math.PI * R ** 3 * (k === Infinity ? 1 : (k - 1) / (k + 2));
  }
  function forceInduite(alpha, Q, r) {
    if (!(Number.isFinite(alpha) && alpha >= 0)) err("alpha : nombre ≥ 0 attendu"); finite(Q, "Q"); positive(r, "r");
    const E0 = K * Q / (r * r);
    return { E: E0, U: -alpha * EPS0 * E0 * E0 / 2, F: -2 * alpha * EPS0 * K * K * Q * Q / r ** 5 };
  }
  function coudee(q, L, angle) {
    finite(q, "q"); positive(L, "L"); if (!(Number.isFinite(angle) && angle >= 0 && angle <= Math.PI)) err("angle dans [0, π] attendu");
    const sx = L * Math.sin(angle / 2), cy = L * Math.cos(angle / 2);
    const charges = [{ q: -2 * q, x: 0, y: 0 }, { q, x: -sx, y: cy }, { q, x: sx, y: cy }];
    return { charges, p: moments(charges).p[1] };
  }
  /* NIST CCCBDB (Computational Chemistry Comparison and Benchmark DataBase), experimental lists: dipole moments (D),
     polarizabilities (Å³). Zero moments are the symmetric molecules. */
  const MOLECULES_MESURES = [["H2O", 1.857, 1.501], ["HF", 1.827, 0.800], ["NH3", 1.476, 2.103], ["HCl", 1.093, 2.515],
    ["CO", 0.112, 1.953], ["H2", 0, 0.787], ["N2", 0, 1.710], ["O2", 0, 1.562], ["CO2", 0, 2.507], ["CH4", 0, 2.448]]
    .map(([id, p, alpha]) => Object.freeze({ id, p, alpha, pSI: p * DEBYE, alphaF: 4 * Math.PI * alpha * A3 }));
  /* First ionization energies (CRC Handbook, 84th ed.); static polarizabilities in a0³ (Mitroy, Safronova and Clark 2010, table IV:
     H exact, He from theory, the others measured from the dielectric constant, Xe from the refractive index). */
  const ATOMES = [["H", 13.59844, 4.5], ["He", 24.58738, 1.38376], ["Ne", 21.5646, 2.670], ["Ar", 15.75962, 11.081],
    ["Kr", 13.99961, 16.766], ["Xe", 12.1298, 27.34]]
    .map(([id, Ei, alphaA0]) => Object.freeze({ id, Ei, alphaA0, alpha: 4 * Math.PI * alphaA0 * A0 ** 3 }));
  function oscillateurAtome(Ei, omega) {
    positive(Ei, "Ei"); omega = omega == null ? 0 : finite(omega, "omega");
    const omega0 = Ei / Cst.hbar;
    if (Math.abs(omega) === omega0) err("omega = omega0 : résonance, le modèle sans amortissement diverge");
    return { omega0, lambda0: 2 * Math.PI * C / omega0, alpha: E * E / (EPS0 * ME * (omega0 * omega0 - omega * omega)) };
  }
  function kappaGaz(alpha, N) { finite(alpha, "alpha"); if (!(Number.isFinite(N) && N >= 0)) err("N : nombre ≥ 0 attendu"); return 1 + N * alpha; }
  function langevin(x) {
    finite(x, "x");
    if (Math.abs(x) < 1e-2) { const x2 = x * x; return x * (1 / 3 - x2 / 45 + 2 * x2 * x2 / 945); }
    return 1 / Math.tanh(x) - 1 / x;
  }
  function densiteOrientation(x, u) {
    finite(x, "x"); if (!(Number.isFinite(u) && u >= -1 && u <= 1)) err("u = cos θ dans [−1, 1] attendu");
    if (Math.abs(x) < 1e-12) return 0.5;
    const a = Math.abs(x), s = x > 0 ? u : -u;      // x e^(xu)/(2 sinh x) = a e^(a(s − 1))/(1 − e^(−2a))
    return a * Math.exp(a * (s - 1)) / -Math.expm1(-2 * a);
  }
  function tirageOrientation(x, n, rand) {
    finite(x, "x"); if (!(Number.isInteger(n) && n >= 0)) err("n : entier ≥ 0 attendu"); rand = rand || Math.random;
    const a = Math.abs(x), sg = x < 0 ? -1 : 1, out = new Array(n);
    for (let i = 0; i < n; i++) {
      const r = rand();
      /* F(u) = (e^(a(u + 1)) − 1)/(e^(2a) − 1), inverted from the top end so that large a does not overflow */
      const u = a < 1e-9 ? 2 * r - 1 : 1 + Math.log(r + (1 - r) * Math.exp(-2 * a)) / a;
      out[i] = sg * Math.max(-1, Math.min(1, u));
    }
    return out;
  }
  function orientation(p0, E0, T, N) {
    if (!(Number.isFinite(p0) && p0 >= 0)) err("p0 : nombre ≥ 0 attendu"); finite(E0, "E"); positive(T, "T");
    const kT = KB * T, x = p0 * E0 / kT, o = { x, moyenne: langevin(x), lineaire: x / 3 };
    if (N != null) { positive(N, "N"); o.P = N * p0 * o.moyenne; o.Plin = N * p0 * p0 * E0 / (3 * kT); o.chi = N * p0 * p0 / (3 * EPS0 * kT); }
    return o;
  }
  function debyeGaz(o) {
    o = o || {}; const N = positive(o.N, "N"), alpha = finite(o.alpha, "alpha"), p0 = finite(o.p0, "p0");
    const pente = N * p0 * p0 / (3 * EPS0 * KB);
    return { ordonnee: N * alpha, pente, kappa1: T => N * alpha + pente / positive(T, "T") };
  }
  function momentDePente(pente, N) {
    if (!(Number.isFinite(pente) && pente >= 0)) err("pente : nombre ≥ 0 attendu"); positive(N, "N");
    return Math.sqrt(3 * EPS0 * KB * pente / N);
  }

  /* ---------- Étape « Mêmes équations, mêmes solutions » (§12-1 to §12-4) ---------- */
  function poissonUnite(o) {
    o = o || {};
    const n = o.n == null ? 41 : o.n;
    if (!(Number.isInteger(n) && n >= 5)) err("n : entier ≥ 5 attendu");
    const h = 1 / (n - 1), s = o.source || (() => 0), fixe = o.fixe || (() => null), bord = o.bord == null ? 0 : finite(o.bord, "bord");
    const r = relaxation({ nx: n, ny: n, h, tol: o.tol, max: o.max,
      fixe: (i, j) => { const v = fixe(i * h, j * h); return v != null ? v : (i === 0 || j === 0 || i === n - 1 || j === n - 1 ? bord : null); },
      rho: (i, j) => EPS0 * finite(s(i * h, j * h), "source") });
    return { psi: r.phi, h, n, iterations: r.iterations, residu: r.residu };
  }
  function transposer(psi, L, source, coef) { return finite(psi, "psi") * finite(source, "source") * positive(L, "L") ** 2 / positive(coef, "coef"); }
  function champGrille(g, h, x0, y0) {
    if (!Array.isArray(g) || g.length < 3 || !g.every(r => Array.isArray(r) && r.length === g[0].length)) err("grille : lignes de même longueur attendues");
    positive(h, "h"); x0 = x0 == null ? 0 : finite(x0, "x0"); y0 = y0 == null ? 0 : finite(y0, "y0");
    const ny = g.length, nx = g[0].length;
    const d = (j, i) => {                                         // centred differences, one-sided on the border
      const i0 = Math.max(0, i - 1), i1 = Math.min(nx - 1, i + 1), j0 = Math.max(0, j - 1), j1 = Math.min(ny - 1, j + 1);
      return [(g[j][i1] - g[j][i0]) / ((i1 - i0) * h), (g[j1][i] - g[j0][i]) / ((j1 - j0) * h)];
    };
    const D = g.map((r, j) => r.map((_, i) => d(j, i)));
    const cellule = (x, y) => {
      const u = (finite(x, "x") - x0) / h, v = (finite(y, "y") - y0) / h;
      if (!(u >= 0 && v >= 0 && u <= nx - 1 && v <= ny - 1)) return null;
      const i = Math.min(nx - 2, Math.floor(u)), j = Math.min(ny - 2, Math.floor(v));
      return { i, j, a: u - i, b: v - j };
    };
    const bil = (c, f) => (1 - c.a) * (1 - c.b) * f(c.j, c.i) + c.a * (1 - c.b) * f(c.j, c.i + 1) + (1 - c.a) * c.b * f(c.j + 1, c.i) + c.a * c.b * f(c.j + 1, c.i + 1);
    return {
      valeur: (x, y) => { const c = cellule(x, y); return c ? bil(c, (j, i) => g[j][i]) : NaN; },
      gradient: (x, y) => { const c = cellule(x, y); return c ? [bil(c, (j, i) => D[j][i][0]), bil(c, (j, i) => D[j][i][1])] : [NaN, NaN]; },
      penteMax: Math.max(...D.flat().map(v => Math.hypot(v[0], v[1]))) };
  }

  function conductionCylindre(Kth, L, a, b, dT) {
    positive(Kth, "K"); positive(L, "L"); positive(a, "a"); positive(b, "b"); if (!(b > a)) err("b > a attendu");
    return 2 * Math.PI * Kth * L * finite(dT, "dT") / Math.log(b / a);
  }
  const PAROIS = Object.freeze({ isolante: 1, fixe: -1 });
  function sourceParoi(G, Kth, a, paroi) {
    finite(G, "G"); positive(Kth, "K"); positive(a, "a");
    const sg = PAROIS[paroi == null ? "isolante" : paroi]; if (!sg) err("paroi « isolante » ou « fixe » attendue");
    const c = G / (4 * Math.PI * Kth);
    const dans = (rho, z) => { finite(rho, "rho"); if (finite(z, "z") > 0) err("z ≤ 0 attendu : le milieu est sous la surface z = 0"); };
    const T = (rho, z) => { dans(rho, z); const r1 = Math.hypot(rho, z + a), r2 = Math.hypot(rho, z - a); return r1 === 0 ? NaN : c * (1 / r1 + sg / r2); };
    const h = (rho, z) => {                                          // −K ∇T, W·m⁻², components along ρ and z
      dans(rho, z); const r1 = Math.hypot(rho, z + a), r2 = Math.hypot(rho, z - a);
      if (r1 === 0) return [NaN, NaN];
      const k = G / (4 * Math.PI);
      return [k * (rho / r1 ** 3 + sg * rho / r2 ** 3), k * ((z + a) / r1 ** 3 + sg * (z - a) / r2 ** 3)];
    };
    return { T, h, surface: rho => T(rho, 0), signe: sg };
  }
  function biot(hc, L, Kth) { return positive(hc, "h") * positive(L, "L") / positive(Kth, "K"); }

  function membraneAnneau(u0, r0, R, r) {
    finite(u0, "u0"); positive(r0, "r0"); positive(R, "R"); if (!(R > r0)) err("R > r0 attendu");
    if (!(Number.isFinite(r) && r >= 0)) err("r : nombre ≥ 0 attendu");
    return r <= r0 ? u0 : r >= R ? 0 : u0 * Math.log(R / r) / Math.log(R / r0);
  }
  function membrane(o) {
    o = o || {};
    const Dm = positive(o.D, "D"), n = o.n == null ? 61 : o.n, R = Dm / 2, p = o.p == null ? 0 : finite(o.p, "p");
    const poteaux = (o.poteaux || []).map(q => ({ x: finite(q.x, "x"), y: finite(q.y, "y"), r: positive(q.r, "r"), u: finite(q.u, "u") }));
    const sur = (x, y) => poteaux.find(q => Math.hypot(x - q.x, y - q.y) <= q.r);
    const res = poissonUnite({ n, tol: o.tol, max: o.max, source: () => p * Dm * Dm,
      fixe: (X, Y) => { const x = (X - 0.5) * Dm, y = (Y - 0.5) * Dm, q = sur(x, y); return q ? q.u : Math.hypot(x, y) >= R ? 0 : null; } });
    const h = res.h * Dm, c = champGrille(res.psi, h, -R, -R);
    return { u: res.psi, h, n, D: Dm, iterations: res.iterations, valeur: c.valeur, gradient: c.gradient, penteMax: c.penteMax,
      libre: (x, y) => Math.hypot(x, y) < R && !sur(x, y), poteau: (x, y) => sur(x, y) || null };
  }
  function bille(m, depart, o) {
    if (!m || typeof m.gradient !== "function" || typeof m.libre !== "function") err("membrane attendue (résultat de membrane)");
    o = o || {};
    const g = o.g == null ? Cst.g0 : positive(o.g, "g"), f = o.facteur == null ? 5 / 7 : positive(o.facteur, "facteur");
    const dt = o.dt == null ? 2e-3 : positive(o.dt, "dt"), tmax = o.tmax == null ? 10 : positive(o.tmax, "tmax");
    let [x, y] = point(depart), [vx, vy] = o.v0 ? point(o.v0) : [0, 0], t = 0;
    if (!m.libre(x, y)) err("départ : point libre de la membrane attendu");
    const acc = (x, y) => { const d = m.gradient(x, y); return [-f * g * d[0], -f * g * d[1]]; };
    const energie = () => (vx * vx + vy * vy) / (2 * f) + g * m.valeur(x, y);   // per unit mass: rolling ⇒ ½ v²/f
    const E0 = energie(), points = [[x, y, 0]];
    let a = acc(x, y), fin = "temps", derive = 0;
    while (t < tmax) {
      const hx = vx + a[0] * dt / 2, hy = vy + a[1] * dt / 2, nx = x + hx * dt, ny = y + hy * dt;
      if (!m.libre(nx, ny)) { fin = m.poteau(nx, ny) ? "poteau" : "bord"; break; }
      x = nx; y = ny; a = acc(x, y); vx = hx + a[0] * dt / 2; vy = hy + a[1] * dt / 2; t += dt;
      points.push([x, y, t]);
      derive = Math.max(derive, Math.abs(energie() - E0));
    }
    return { points, fin, t, v: Math.hypot(vx, vy), derive, E0 };
  }

  const MILNE = 0.7104;                                    // extrapolation length of the Milne problem, in mean free paths
  function sourceSphere(S, Dn, a, r, Rb) {
    finite(S, "S"); positive(Dn, "D"); positive(a, "a");
    if (!(Number.isFinite(r) && r >= 0)) err("r : nombre ≥ 0 attendu");
    const N = r >= a ? S * a ** 3 / (3 * Dn * r) : S / (3 * Dn) * (1.5 * a * a - r * r / 2);
    if (Rb == null) return N;
    positive(Rb, "Rb"); if (!(Rb > a)) err("Rb > a attendu");
    return r >= Rb ? 0 : N - S * a ** 3 / (3 * Dn * Rb);
  }
  function neutronsSphere(o, rand) {
    o = o || {}; if (typeof rand !== "function") err("rand : générateur dans [0, 1[ attendu");
    const a = positive(o.a, "a"), Rb = positive(o.Rb, "Rb"); if (!(Rb > a)) err("Rb > a attendu");
    const N = o.N == null ? 2000 : o.N, nc = o.couches == null ? 24 : o.couches, lots = o.lots == null ? 10 : o.lots;
    if (!(Number.isInteger(N) && N >= lots && Number.isInteger(nc) && nc >= 2 && Number.isInteger(lots) && lots >= 2)) err("N ≥ lots ≥ 2, couches ≥ 2 : entiers attendus");
    const dr = Rb / nc, C = Array.from({ length: lots }, () => new Float64Array(nc));
    let chocs = 0;
    for (let k = 0; k < N; k++) {
      const u = Math.cbrt(rand()) * a, ct = 2 * rand() - 1, ph = 2 * Math.PI * rand(), st = Math.sqrt(1 - ct * ct);
      let x = u * st * Math.cos(ph), y = u * st * Math.sin(ph), z = u * ct;
      const lot = C[k % lots];
      for (;;) {
        const s = -Math.log(1 - rand()), c = 2 * rand() - 1, p = 2 * Math.PI * rand(), q = Math.sqrt(1 - c * c);
        x += s * q * Math.cos(p); y += s * q * Math.sin(p); z += s * c;
        const r = Math.hypot(x, y, z);
        if (r >= Rb) break;                                  // killed: the absorbing sphere (or the end of the medium)
        lot[Math.floor(r / dr)]++; chocs++;
      }
    }
    const Vs = 4 / 3 * Math.PI * a ** 3, nl = N / lots;
    const r = [], dens = [], er = [];
    for (let i = 0; i < nc; i++) {
      const Vc = 4 / 3 * Math.PI * (((i + 1) * dr) ** 3 - (i * dr) ** 3), f = Vs / (3 * a * a * Vc);
      const v = C.map(L => f * L[i] / nl), m = v.reduce((s, w) => s + w, 0) / lots;
      const sd = Math.sqrt(v.reduce((s, w) => s + (w - m) ** 2, 0) / (lots - 1) / lots);
      r.push((i + 0.5) * dr); dens.push(m); er.push(sd);
    }
    return { r, N: dens, err: er, chocs, Rext: Rb + MILNE,
      theorie: x => sourceSphere(1, 1, a, x, Rb + MILNE) / (a * a), infini: x => sourceSphere(1, 1, a, x) / (a * a) };
  }

  /* ---------- étape « Orages et foudre » (II.9.4–9.6) ---------- */
  const CP_AIR = 1004.6, R_AIR = 287.05, L_VAP = 2.501e6, EPS_EAU = 0.622;   // J·kg⁻¹·K⁻¹ (dry air), J·kg⁻¹ (273 K), M_water/M_air
  function gradientSec() { return Cst.g0 / CP_AIR; }
  function pressionSaturante(T) { const th = positive(T, "T") - 273.15; return 611.2 * Math.exp(17.67 * th / (th + 243.5)); }
  function gradientHumide(T, p) {
    const es = pressionSaturante(T); positive(p, "p"); if (es >= p) err("p : pression supérieure à la pression de vapeur saturante attendue");
    const rs = EPS_EAU * es / (p - es);
    return Cst.g0 * (1 + L_VAP * rs / (R_AIR * T)) / (CP_AIR + L_VAP * L_VAP * rs * EPS_EAU / (R_AIR * T * T));
  }
  function ascension(o) {
    o = o || {};
    const T0 = positive(o.T0 == null ? 300 : o.T0, "T0"), p0 = positive(o.p0 == null ? Cst.atm : o.p0, "p0");
    const gamma = finite(o.gamma == null ? 0.0065 : o.gamma, "gamma"), zt = positive(o.zt == null ? 11000 : o.zt, "zt");
    const dT = finite(o.dT == null ? 1 : o.dT, "dT"), humide = o.humide !== false, mu = finite(o.mu == null ? 0 : o.mu, "mu");
    const hr = o.hr == null ? 1 : finite(o.hr, "hr"); if (!(hr > 0 && hr <= 1)) err("hr : humidité relative entre 0 et 1 attendue");
    const zmax = positive(o.zmax == null ? 20000 : o.zmax, "zmax"), dz = positive(o.dz == null ? 25 : o.dz, "dz");
    if (mu < 0) err("mu : nombre ≥ 0 attendu");
    if (!(T0 - gamma * zt > 100)) err("gamma : atmosphère trop froide en altitude (T > 100 K attendu)");
    const env = z => T0 - gamma * Math.min(z, zt);
    const z = [0], Te = [T0], Tp = [T0 + dT], w = [0];
    let p = p0, T = T0 + dT, e = 0, cape = 0, sommet = null, wmax = 0, zw = 0;
    /* vapeur de la parcelle, conservée tant qu'elle ne condense pas : sèche jusqu'à saturation (base du nuage), saturée ensuite */
    const es0 = hr * pressionSaturante(T0 + dT), r0 = EPS_EAU * es0 / (p0 - es0), rs = (T, p) => { const es = pressionSaturante(T); return EPS_EAU * es / (p - es); };
    let sature = humide && hr >= 1, base = sature ? 0 : null;
    const pente = (T, p, zz) => -(sature ? gradientHumide(T, p) : gradientSec()) - mu * (T - env(zz));
    for (let i = 1; i * dz <= zmax + 1e-9; i++) {
      const za = (i - 1) * dz, zb = i * dz, zm = za + dz / 2, pm = p * Math.exp(-Cst.g0 * dz / 2 / (R_AIR * env(za + dz / 4)));
      const Tm = T + pente(T, p, za) * dz / 2, b = Cst.g0 * (Tm - env(zm)) / env(zm);          // midpoint (order 2)
      T += pente(Tm, pm, zm) * dz; p = pm * Math.exp(-Cst.g0 * dz / 2 / (R_AIR * env(zm + dz / 4)));
      if (sommet == null) {
        e = (e + b * dz) / (1 + 2 * mu * dz);                                                   // w²/2, drag −μ w² implicit
        if (b > 0) cape += b * dz;
        if (e <= 0) { sommet = i === 1 ? 0 : zb; e = 0; }
        else if (Math.sqrt(2 * e) > wmax) { wmax = Math.sqrt(2 * e); zw = zb; }
      }
      z.push(zb); Te.push(env(zb)); Tp.push(T); w.push(Math.sqrt(2 * Math.max(0, e)));
      if (humide && !sature && rs(T, p) <= r0) { sature = true; base = zb; }
    }
    if (sommet == null) sommet = zmax;
    return { z, Te, Tp, w, sommet, wmax, zw, base, cape: sommet === 0 ? 0 : cape, gammaSec: gradientSec(), gammaHumide0: gradientHumide(T0 + dT, p0) };
  }
  const nuage = ch => (Array.isArray(ch) && ch.length ? ch.map(c => ({ q: finite(c.q, "q"), h: positive(c.h, "h") })) : err("charges [{ q, h }] attendues"));
  function champSousNuage(ch, D) {
    finite(D, "D");
    return nuage(ch).reduce((s, c) => s + 2 * K * c.q * c.h / Math.pow(c.h * c.h + D * D, 1.5), 0);
  }
  function inversions(ch, Dmax, n) {
    ch = nuage(ch); Dmax = positive(Dmax == null ? 30000 : Dmax, "Dmax"); n = n || 3000;
    const f = D => champSousNuage(ch, D), out = [];
    for (let i = 0, a = 0, fa = f(0); i < n; i++) {
      const b = (i + 1) * Dmax / n, fb = f(b);
      if (fa * fb < 0) { let lo = a, hi = b, flo = fa; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2, fm = f(m); if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; } } out.push((lo + hi) / 2); }
      a = b; fa = fb;
    }
    return out;
  }
  function chargeSaturation(R, E0) { return 12 * Math.PI * EPS0 * positive(R, "R") ** 2 * finite(E0, "E0"); }
  const NIVEAUX_FOUDRE = Object.freeze([["I", 3, 200, 20], ["II", 5, 150, 30], ["III", 10, 100, 45], ["IV", 16, 100, 60]]
    .map(([id, Imin, Imax, r]) => Object.freeze({ id, Imin, Imax, r })));
  function distanceAmorcage(I) { return 10 * Math.pow(positive(I, "I"), 0.65); }
  function rayonProtege(h, r) { positive(h, "h"); positive(r, "r"); return h >= r ? r : Math.sqrt(h * (2 * r - h)); }
  function vitesseTraceur(pas, pause, v) {
    positive(pas, "pas"); positive(v, "v"); if (!(Number.isFinite(pause) && pause >= 0)) err("pause : nombre ≥ 0 attendu");
    if (v > C) err("v : v ≤ c attendu");
    return pas / (pas / v + pause);
  }
  function traceur(o, rand) {
    o = o || {}; if (typeof rand !== "function") err("rand : générateur attendu");
    const H = positive(o.H == null ? 3000 : o.H, "H"), pas = positive(o.pas == null ? 50 : o.pas, "pas");
    const pause = o.pause == null ? 50e-6 : o.pause, v = o.v == null ? C / 6 : o.v, angle = o.angle == null ? 0.9 : o.angle;
    if (!(angle >= 0 && angle < Math.PI / 2)) err("angle : 0 ≤ angle < π/2 attendu");
    if (H / (pas * Math.cos(angle)) > 1e5) err("pas : trop petit devant H");
    const vm = vitesseTraceur(pas, pause, v), points = [{ x: 0, z: H, t: 0 }];
    let x = 0, z = H, t = 0, n = 0;
    while (z > 0) {
      const a = (2 * rand() - 1) * angle, dz = pas * Math.cos(a), f = Math.min(1, z / dz);
      x += f * pas * Math.sin(a); z = Math.max(0, z - dz); t += f * pas / v + (z > 0 ? pause : 0); n++;
      points.push({ x, z, t });
    }
    return { points, pas: n, duree: t, vMoyenne: H / t, vChemin: vm };
  }
  function distanceTonnerre(dt, T) {
    if (!(Number.isFinite(dt) && dt >= 0)) err("dt : nombre ≥ 0 attendu");
    return dt * Math.sqrt(1.4 * R_AIR * positive(T == null ? 293.15 : T, "T"));
  }

  /* ---------- étape « Liquides, solides et ferroélectricité » (II.11.4–11.7) ---------- */
  function depolarisation(m) {
    positive(m, "m");
    if (Math.abs(m - 1) < 1e-4) return 1 / 3 - 4 / 15 * (m - 1);
    if (m > 1) { const e = Math.sqrt(1 - 1 / (m * m)); return (1 - e * e) / (e * e * e) * (Math.atanh(e) - e); }
    const e = Math.sqrt(1 - m * m); return (1 - m / e * Math.asin(e)) / (e * e);
  }
  function champCavite(E0, P, L) {
    L = L == null ? 1 / 3 : L; if (!(L >= 0 && L <= 1)) err("L : 0 ≤ L ≤ 1 attendu");
    return finite(E0, "E0") + L * finite(P, "P") / EPS0;
  }
  function clausiusMossotti(Na) { finite(Na, "Na"); if (Na < 0 || Na === 3) err("Na : Nα ≥ 0 et différent de 3 attendu"); return 1 + Na / (1 - Na / 3); }
  function alphaDeKappa(k) { finite(k, "kappa"); if (k < 1) err("kappa : κ ≥ 1 attendu"); return 3 * (k - 1) / (k + 2); }
  const LIQUIDES_CM = Object.freeze([["CS2", 1.0029, 0.00339, 1.293, 2.64], ["O2", 1.000523, 0.00143, 1.19, 1.507],
    ["CCl4", 1.0030, 0.00489, 1.59, 2.24], ["Ar", 1.000545, 0.00178, 1.44, 1.54]]
    .map(([id, kGaz, dGaz, dLiq, kLiq]) => Object.freeze({ id, kGaz, dGaz, dLiq, kLiq })));
  function liquideDepuisGaz(l) {
    if (!l || !(l.kGaz >= 1) || !(l.dGaz > 0) || !(l.dLiq > 0)) err("liquide { kGaz, dGaz, dLiq } attendu");
    const NaGaz = l.kGaz - 1, rapport = l.dLiq / l.dGaz, Na = NaGaz * rapport;
    return { NaGaz, rapport, Na, kappa: clausiusMossotti(Na), sansVoisins: 1 + Na, mesure: l.kLiq };
  }
  function sommeChaine(n) {
    n = n == null ? 1e5 : n; if (!(Number.isInteger(n) && n >= 1)) err("n : entier ≥ 1 attendu");
    let t = 0; for (let k = n; k >= 1; k--) t += 1 / (k * k * k);
    return t / Math.PI;
  }
  function alphaCritique(a, S) { return positive(a, "a") ** 3 / positive(S == null ? sommeChaine() : S, "S"); }
  function curieWeiss(T, Tc, beta) {
    positive(T, "T"); positive(Tc, "Tc"); positive(beta, "beta"); if (!(T > Tc)) err("T : T > Tc attendu");
    const Na = 3 - beta * (T - Tc); if (Na <= 0) err("T : trop loin de Tc pour (11.30)");
    return { Na, kappa: clausiusMossotti(Na), approx: 1 + 9 / (beta * (T - Tc)) };
  }
  function polarisationLocale(Na, e, p0) {
    positive(Na, "Na"); finite(e, "e");
    let p = p0 == null ? 0 : finite(p0, "p0");
    if (p === 0 && e === 0 && Na > 3) return 0;                // the unstable root: nothing breaks the symmetry
    for (let i = 0; i < 20000; i++) {
      const u = e + p / 3, q = Na * u / Math.sqrt(1 + u * u);
      if (Math.abs(q - p) < 1e-10) return q;
      p = q;
    }
    return p;
  }
  function cycleFerro(Na, emax, n) {
    positive(Na, "Na"); positive(emax, "emax"); n = n || 200;
    const e = [], p = []; let cur = polarisationLocale(Na, -emax, -Na), ec = 0;
    for (let k = 0; k <= 2 * n; k++) {
      const x = k <= n ? -emax + 2 * emax * k / n : emax - 2 * emax * (k - n) / n, q = polarisationLocale(Na, x, cur);
      if (k > 0 && k <= n && cur < 0 && q >= 0) ec = x;
      e.push(x); p.push(q); cur = q;
    }
    return { e, p, ps: Na > 3 ? 3 * Math.sqrt((Na / 3) ** 2 - 1) : 0, ec: Na > 3 ? Math.max(0, ec) : 0 };
  }

  /* ---------- étape « Écoulement, éclairement et unité de la nature » (II.12.5–12.7) ---------- */
  function ecoulementSphere(v0, a) {
    finite(v0, "v0"); positive(a, "a"); const a3 = a * a * a;
    const ok = r => Number.isFinite(r) && r >= a * (1 - 1e-12);
    const vitesse = (r, th) => { if (!ok(r)) return { vr: NaN, vt: NaN, v: NaN };
      const vr = v0 * Math.cos(th) * (1 - a3 / (r * r * r)), vt = -v0 * Math.sin(th) * (1 + a3 / (2 * r * r * r)); return { vr, vt, v: Math.hypot(vr, vt) }; };
    return { vitesse,
      potentiel: (r, th) => (ok(r) ? -v0 * Math.cos(th) * (r + a3 / (2 * r * r)) : NaN),
      courant: (r, th) => (ok(r) ? 0.5 * v0 * Math.sin(th) ** 2 * (r * r - a3 / r) : NaN),
      cp: (r, th) => (v0 === 0 ? NaN : 1 - (vitesse(r, th).v / v0) ** 2),
      ligne: (b, zmax, n) => { positive(b, "b"); zmax = zmax == null ? 4 * a : positive(zmax, "zmax"); n = n || 240; const pts = [];
        for (let k = 0; k <= n; k++) {                          // r³ − (b/sin θ)² r − a³ = 0, the root above a (Newton from above)
          const th = Math.PI - (k + 0.5) * Math.PI / (n + 1), c = (b / Math.sin(th)) ** 2; let r = Math.sqrt(c) + a;
          for (let i = 0; i < 60; i++) { const f = r * r * r - c * r - a3, d = 3 * r * r - c; const nr = r - f / d; if (Math.abs(nr - r) < 1e-13 * r) { r = nr; break; } r = nr; }
          const z = r * Math.cos(th); if (Math.abs(z) <= zmax) pts.push([z, r * Math.sin(th)]);
        }
        return pts; } };
  }
  function traineePotentielle(n) {
    n = n || 2000; const f = ecoulementSphere(1, 1); let s = 0;
    for (let k = 0; k < n; k++) { const th = (k + 0.5) * Math.PI / n; s -= f.cp(1, th) * Math.cos(th) * Math.sin(th) * Math.PI / n; }
    return s;
  }
  function reynolds(v, L, nu) { finite(v, "v"); return Math.abs(v) * positive(L, "L") / positive(nu, "nu"); }
  function regimeSphere(Re) { if (!(Number.isFinite(Re) && Re >= 0)) err("Re : nombre ≥ 0 attendu"); return Re < 1 ? "rampant" : Re < 1e3 ? "sillage" : Re <= 2e5 ? "plateau" : "crise"; }
  function eclairementPoint(I, h, x) { finite(I, "I"); positive(h, "h"); finite(x, "x"); return I * h / Math.pow(h * h + x * x, 1.5); }
  function eclairementTubes(phi, b, z) {
    finite(phi, "phi"); positive(b, "b"); positive(z, "z");
    const g = grille(2 * EPS0, b), moyen = phi / (2 * b), u = 2 * Math.PI * z / b;        // grille(2 ε0, b): mean field 1/b
    return { moyen, en: x => moyen * g.champ(x, z)[1] * b, ondulation: 1 / Math.sinh(u), harmonique: 2 * Math.exp(-u) };
  }
  function espacementTubes(tol, z) {
    positive(tol, "tol"); positive(z, "z"); if (tol >= 1) err("tol : tolérance < 1 attendue");
    return { exact: 2 * Math.PI * z / Math.asinh(1 / tol), harmonique: 2 * Math.PI * z / Math.log(2 / tol), estime: 2 * Math.PI * z / Math.log(1 / tol) };
  }
  function laplaceCarre(x, y, Kmax) {
    finite(x, "x"); finite(y, "y"); if (x < 0 || x > 1 || y < 0 || y > 1) err("point du carré unité attendu");
    let s = 0;
    for (let k = 1; k <= (Kmax || 199); k += 2) s += 4 / (k * Math.PI) * Math.sin(k * Math.PI * x) * Math.exp(k * Math.PI * (y - 1)) * (1 - Math.exp(-2 * k * Math.PI * y)) / (1 - Math.exp(-2 * k * Math.PI));
    return s;
  }
  const maille = n => (Number.isInteger(n) && n >= 2 && n <= 256 ? n : err("n : entier de 2 à 256 attendu"));
  function reseauCarre(n) {
    maille(n); const g = Array.from({ length: n + 1 }, (_, j) => Array.from({ length: n + 1 }, (_, i) => (j === n && i > 0 && i < n ? 1 : 0)));
    const w = 2 / (1 + Math.sin(Math.PI / n));                  // optimal over-relaxation for the square
    for (let it = 0; it < 20000; it++) {
      let d = 0;
      for (let j = 1; j < n; j++) for (let i = 1; i < n; i++) { const v = (g[j][i - 1] + g[j][i + 1] + g[j - 1][i] + g[j + 1][i]) / 4, e = v - g[j][i]; g[j][i] += w * e; if (Math.abs(e) > d) d = Math.abs(e); }
      if (d < 1e-12) break;
    }
    return g;
  }
  function marcheCarre(o, rand) {
    o = o || {}; if (typeof rand !== "function") err("rand : générateur attendu");
    const n = maille(o.n), N = o.N == null ? 2000 : o.N, i0 = o.i, j0 = o.j;
    if (!(Number.isInteger(N) && N >= 1 && N <= 1e6)) err("N : entier de 1 à 10⁶ attendu");
    if (!(Number.isInteger(i0) && Number.isInteger(j0) && i0 > 0 && i0 < n && j0 > 0 && j0 < n)) err("départ : nœud intérieur (i, j) attendu");
    let haut = 0, pas = 0; const traces = [];
    for (let k = 0; k < N; k++) {
      let i = i0, j = j0; const tr = k < (o.traces || 0) ? [[i, j]] : null;
      while (i > 0 && i < n && j > 0 && j < n) { const r = rand(); if (r < 0.25) i++; else if (r < 0.5) i--; else if (r < 0.75) j++; else j--; pas++; if (tr) tr.push([i, j]); }
      if (j === n) haut++; if (tr) traces.push(tr);
    }
    const phi = haut / N;
    return { phi, err: Math.sqrt(phi * (1 - phi) / N), pas: pas / N, traces };
  }

  const api = { K, EPS0, C, E,
    ecoulementSphere, traineePotentielle, reynolds, regimeSphere, eclairementPoint, eclairementTubes, espacementTubes,
    laplaceCarre, reseauCarre, marcheCarre,
    depolarisation, champCavite, clausiusMossotti, alphaDeKappa, LIQUIDES_CM, liquideDepuisGaz, sommeChaine, alphaCritique,
    curieWeiss, polarisationLocale, cycleFerro,
    gradientSec, pressionSaturante, gradientHumide, ascension, champSousNuage, inversions, chargeSaturation,
    NIVEAUX_FOUDRE, distanceAmorcage, rayonProtege, vitesseTraceur, traceur, distanceTonnerre,
    forceArmatures, bilanDeplacement, basculement, besselK0, ligneAlternee, ligneDirecte, madelungLignes, madelungSpheres,
    EXCES_N, EXCES_H, MIROIRS, ecartCoulomb, rayonMiroir, energieCoulombNoyau, energieLiaison,
    chargeTerre, pieceAuSol, moulinChamp, tempsRelaxation, colonne, CHEMINEES, diurne,
    capaciteDisque, boite, coin, PLANS, champPlan, feuillets, longueurDebye, gouyChapman, dlvo, grille, triode,
    energiePaires, energieAssemblage, energieBoule, profilEnergie, energieHorsRayon, rayonElectromagnetique, densiteCroisee, energieCroisee,
    capacitePlan, kirchhoff, condensateurDisques, champsSpheresReliees, AIR, townsendAlpha, libreParcours, paschen, paschenMinimum,
    champPointe, A_FN, B_FN, barriereSN, exposantWKB, fowlerNordheim,
    relaxation, paireDipole, potentielDipole, champDipole, composantesDipole, moments, potentielMultipole, spheresDecalees,
    baseTournee, changerBase, DEBYE, MOLECULES,
    tourbillon, hessien, raideurs, ARRANGEMENTS, images, equilibrePlan, energiesPlan,
    thomson, RAYON_CLASSIQUE, dureeEffondrement, rayonOrbite, toursAvantEffondrement, energieAtome, rayonOptimal,
    angleSolideRectangle, fluxCubeExact, champRadial, BOULES, fluxSurVolume, bouleDiscrete,
    fluxCalotte, anglesEgalFlux, angleArrivee, suivreLigne,
    regime, vitesseElectron, SYSTEMES,
    champ, contributions, force, potentiel, baguette, baguetteExacte,
    travail, CHEMINS, champPuissance, fluxSphere,
    champFil, filFini, coaxial, champPlans, disqueAxe, disquesAxe, champSubi, pressionElectrostatique, coquilleDiscrete,
    spheresReliees, coquilleCavite, chargeSurface, potentielCoquillePuissance, penteCavendish, cavendish,
    anneau, PROFILS, conducteurRevolution, ellipsoideExact, apollonius, sigmaPlan, chargeInduitePlan, forcePlan, forcePlanIntegree,
    imagesSphere, forceSphere, sigmaSphere, equilibreSphere, schottky,
    couches, profilDielectrique, chargesDeplacees, atomeNuage, chargeDielectrique,
    lameInseree, remontee, polarisabiliteSphere, forceInduite, coudee, MOLECULES_MESURES, ATOMES, oscillateurAtome, kappaGaz,
    langevin, densiteOrientation, tirageOrientation, orientation, debyeGaz, momentDePente,
    poissonUnite, transposer, champGrille, conductionCylindre, PAROIS, sourceParoi, biot,
    membraneAnneau, membrane, bille, MILNE, sourceSphere, neutronsSphere };
  if (node) module.exports = api;
  else root.Electrostatique = api;
})(typeof self !== "undefined" ? self : this);

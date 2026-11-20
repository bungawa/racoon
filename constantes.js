/* Physical constants, SI units, one copy for the whole site. Pure, no DOM, UMD (global Constantes).
   Only the constants some module uses. Each value is checked against its primary source (see test/constantes.test.js).
   Sources:
   - SI 2019 (26th CGPM): seven defining constants, exact. CODATA 2022 lists the derived exact ones (ħ, R).
   - CODATA 2022 (NIST, physics.nist.gov/constants): measured constants, last digits uncertain.
   - CGPM: conventional values, exact by declaration.
   - IAU / IERS Conventions 2010 / GRS80 (IUGG 1979): astronomy and geodesy. */
(function (root) {
  const h = 6.62607015e-34, k_B = 1.380649e-23, N_A = 6.02214076e23, au = 149597870700;

  const api = Object.freeze({
    /* SI 2019, exact */
    dnu_Cs: 9192631770,          // Hz, hyperfine transition of caesium 133 (defines the second)
    c: 299792458,                // m·s⁻¹ (defines the metre)
    h,                           // J·s (defines the kilogram)
    e: 1.602176634e-19,          // C (defines the ampere)
    k_B,                         // J·K⁻¹ (defines the kelvin)
    N_A,                         // mol⁻¹ (defines the mole)
    hbar: h / (2 * Math.PI),     // J·s, exact: h/2π = 1,054 571 817… × 10⁻³⁴
    R: N_A * k_B,                // J·mol⁻¹·K⁻¹, exact: N_A k_B = 8,314 462 618…

    /* CODATA 2022, measured */
    G: 6.67430e-11,              // m³·kg⁻¹·s⁻², relative uncertainty 2,2 × 10⁻⁵
    eps0: 8.8541878188e-12,      // F·m⁻¹
    mu0: 1.25663706127e-6,       // N·A⁻² (no longer exactly 4π × 10⁻⁷ since 2019)
    m_e: 9.1093837139e-31,       // kg, electron
    m_p: 1.67262192595e-27,      // kg, proton
    m_n: 1.67492750056e-27,      // kg, neutron
    u: 1.66053906892e-27,        // kg, atomic mass constant (1 u = 1 Da)
    a0: 5.29177210544e-11,       // m, Bohr radius
    mu_B: 9.2740100657e-24,      // J·T⁻¹, Bohr magneton

    /* conventional, exact */
    g0: 9.80665,                 // m·s⁻², standard acceleration of gravity (3rd CGPM, 1901)
    atm: 101325,                 // Pa, standard atmosphere (10th CGPM, 1954, resolution 4)
    g_CPGE: 9.81,                // m·s⁻², not a constant: g0 rounded to 3 digits, the value of French CPGE exercises

    /* the Earth */
    GM_E: 3.986004418e14,        // m³·s⁻², geocentric gravitational constant, TT-compatible (IERS Conventions 2010, table 1.1)
    Omega_E: 7.292115e-5,        // rad·s⁻¹, nominal mean angular velocity, relative to the stars (GRS80; IERS 2010, table 1.2)
    R_E_eq: 6378137,             // m, equatorial radius a (GRS80, IUGG 1979; same a in WGS 84)
    R_E_mean: 6371008.8,         // m, mean radius R1 = (2a + b)/3 = 6 371 008,7714 m (GRS80), to 0,1 m (IUGG)
    L_G: 6.969290134e-10,        // 1 − d(TT)/d(TCG): geoid potential W0/c², defining (IAU 2000, resolution B1.9)

    /* the Sun and distances */
    au,                          // m, astronomical unit (IAU 2012, resolution B2)
    pc: au * 648000 / Math.PI,   // m, parsec, exact: 648 000/π au (IAU 2015, resolution B2)
    GM_sun: 1.3271244e20,        // m³·s⁻², nominal solar mass parameter (IAU 2015, resolution B3)
    R_sun: 6.957e8,              // m, nominal solar radius (IAU 2015, resolution B3)
    L_sun: 3.828e26,             // W, nominal solar luminosity (IAU 2015, resolution B3)
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Constantes = api;
})(typeof self !== "undefined" ? self : this);

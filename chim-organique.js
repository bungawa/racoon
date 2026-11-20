/* Chimie organique — module commun du monde « Chimie organique ». Molécules décrites par un graphe dessiné, raisonnées
   (formule brute, isomérie, règles de Cahn, Ingold et Prelog, conformations, activité optique) et dessinées en SVG.
   Pur, sans DOM : les dessins sont des chaînes de balisage que la page place dans un <svg class="fig">. UMD (global ChimOrga). SI partout.

   Molécule  mol("C 0 0; C 0.866 0.5; O 1.732 0 | 0-1 1-2") : atomes « élément x y [hN] [AN] » séparés par « ; », puis
             après « | » les liaisons « i-j » (simple), « i=j » (double), « i#j » (triple), « iwj » (simple en coin plein,
             vers le lecteur), « ihj » (simple en coin haché, derrière le plan) ; un coin part de i, l'atome stéréogène.
             x, y en longueurs de liaison, y vers le haut. hN impose le nombre d'hydrogènes implicites, AN le nombre de masse
             (H A2 : deutérium). Sans hN, les hydrogènes implicites complètent la valence usuelle (C 4, N 3, O 2, S 2,
             halogènes 1). Objet rendu : { atomes: [{ e, x, y, h?, A? }], liaisons: [{ a, b, ordre, style }] }.
   API
     mol(spec), molecule(id)            lire une molécule ; molecule(id) lit MOLECULES[id].
     hydrogenes(m, i)                   hydrogènes implicites de l'atome i.
     formuleBrute(m), ecrireFormule(f)  { C: 4, H: 10, O: 1 } ; « C₄H₁₀O » (ordre de Hill : C, H, puis l'alphabet).
     insaturations(f)                   nombre d'insaturations (2 n_C + 2 + n_N - n_H - n_X)/2.
     masseMolaire(f)                    kg·mol⁻¹, masses atomiques conventionnelles de l'IUPAC.
     correspondances(m1, m2, max)       isomorphismes du graphe des atomes lourds (hydrogènes comptés, coins ignorés).
     groupes(m)                         groupes caractéristiques, triés : alcool, ether, aldehyde, cetone, acide, ester,
                                        amine, amide, alcene, alcyne, halogenoalcane.
     relationConstitution(m1, m2)       "differentes" (formules brutes), "identiques", "fonction", "chaine", "position".
     priorites(m, i)                    les quatre substituants de i classés par les règles CIP 1a et 2 :
                                        [{ atome (indice ou null : hydrogène implicite), rang }], null si deux sont égaux.
     comparer(m, depuis, i, j)          > 0 si la branche i (vue de l'atome depuis) l'emporte sur la branche j.
     centres(m), descripteurRS(m, i)    atomes stéréogènes ; "R", "S", ou null (pas stéréogène, ou dessin sans coin).
     doublesStereogenes(m), descripteurZE(m, a, b)   liaisons doubles stéréogènes [[a, b]] ; "Z", "E" ou null.
     descripteurs(m)                    { centres: { i: "R" }, doubles: { "a-b": "E" } }.
     relationStereo(m1, m2)             "constitution", "identiques", "enantiomeres", "diastereoisomeres".
     inverser(m, i), miroir(m)          configuration de i inversée (coins échangés) ; image dans un miroir vertical.
     dessin(m, o)                       { viewBox, html } : formule topologique, coins de Cram ; o = { texte, carbones,
                                        marques: { i: texte }, surligne: [i], echelle }.
     newman(o)                          { viewBox, html } : projection de Newman ; o = { avant: [3 étiquettes], arriere: [3],
                                        phi (degrés, angle dièdre avant[0]–arrière[0]), texte }.
     torsion(c, phi), ajusterTorsion(points)   V(φ) = Σ cₙ cos nφ (J·mol⁻¹), et les c₀…c₃ qui passent par 4 points [φ°, V].
     fractions(c, T, zones)             fractions de Boltzmann classiques des zones [[φmin, φmax]] (degrés), à T (K).
     eyring(dG, T)                      constante de vitesse k_B T/h · exp(-ΔG‡/RT) (s⁻¹), ΔG‡ en J·mol⁻¹.
     tetraedre(e, ligands), miroir3D(a), superposer(P, Q, i, j)   vue 3D d'un carbone tétraédrique (positions en m).
     biot(alpha, l, c), DEG_DM_G_ML     α = [α] ℓ c, [α] en °·m²·kg⁻¹, ℓ en m, c en kg·m⁻³ ; 1 °·dm⁻¹·g⁻¹·mL = 10⁻² °·m²·kg⁻¹.
     pouvoirMelange(constituants, l)    Σ [α]ᵢ ℓ cᵢ (loi de Biot additive) ; constituants [{ alpha, c }].
     dessin(m, { etiquettes: { i: "PPh₃" } })   écrit un groupe entier à la place de l'atome i.
   Étape « Compléments de synthèse » (chim-complements-synthese) ; huckel lit à la demande quantique-deux-etats.js
     sommeFormules(...f), economieAtomes(fCible, fReactifs)   formules ajoutées ; M(cible)/Σ M(réactifs).
     deconnecterWittig(m, a, b), voiesWittig(m)   alcène a=b → carbonyle (O sur a), ylure (P sur b), halogénure du sel de
                                        phosphonium, type d'ylure (non, semi, stabilise) et isomère majoritaire attendu.
     typeYlure(m, c, p), classeCarbone(m, i), PH3PO, PPH3   stabilisation du carbanion c ; methyle, primaire… tertiaire, vinylique.
     deconnecterMalonique(m)            acide R(R')CH–COOH → halogénures R–Br (dibromure si cycle) ; possible ou raison.
     fractionDeprotonee(pKaAH, pKaBH, eq), PKA   AH + B⁻ ⇌ A⁻ + BH à l'équilibre, eq équivalents de B⁻ ; pKa dans l'eau.
     huckel(h, liaisons, electrons), huckelEnone(hO, kCO)   méthode de Hückel simple : orbitales, HO, BV, charges π.
     hydruresConsommes(m), nombreOxydation(m, i), carboneFonctionnel(m)   ions hydrure par molécule ; n.o. formel d'un carbone.
     TRANSFORMATIONS, LIALH4, masseLiAlH4(m, M, nH, exces), dihydrogeneTrempe(n, T, p)   réductions et hydrolyses ; trempe.
     Spectro                            étape « Spectroscopies » : photon, Beer-Lambert, oscillateur IR, multiplets RMN, système AB.
   Étape « Oxydoréduction en chimie organique » (chim-redox-organique) ; tests : test/chim-organique-redox.test.js
     formuleTexte, niveauOxydation, sommeNO, bilanRedox, carbinol, alcools, oxyderAlcool, carbonyles, reduireNaBH4, NABH4,
     bilanNaBH4                         détail dans sa section, plus bas.
   Étape « Conversion de groupes caractéristiques » (chim-conversion-groupes) ; tests : test/chim-organique-conversion.test.js
     FAMILLES, familles(m)              les dix-huit familles fonctionnelles du programme : [{ famille, atomes }].
     controle(o, t), tempsEquilibre(o)  A ⇌ B, A ⇌ C (barrières d'Eyring) : fractions à t, solution exacte ; contrôle cinétique
                                        (B/C = k_B/k_C) puis thermodynamique (B/C = K_B/K_C).
     rapportVoies(ddG, T), ecartBarrieres(r, T)   r = exp(ΔΔG‡/RT) et l'inverse.
     esterification(o)                  acide + alcool ⇌ ester + eau, excès et retrait d'eau : { x, rendement }.
     carothers(p, r), conversionPour(Xn, r)   polycondensation : Xn = (1 + r)/(1 + r − 2rp).
     epoxydationCompetitive(kappa, eq)  diène, deux C=C indépendantes, k_a/k_b = kappa, eq équivalents de peroxyacide.
     EXEMPLES_FAMILLES, MECANISMES_CONVERSION, actesMecanisme(id, o)   molécules « cg… » ; mécanismes limites acte par acte,
                                        dessinés par schema (hydratation, chlorureAcyle, saponification, epoxyde, reductionEster).
   Étape « Mécanismes réactionnels » (chim-mecanismes) ; lit à la demande chim-architecture.js (anglesLibres, CHI_PAULING)
     mol("O 0 0 h1 q-1; …")             option qN : charge formelle (HO⁻ ici) ; h et valence en tiennent compte.
     electrons(m), bilanElectrons(m)    électrons non liants v − Σ ordres − h − q ; par atome : charge, octet, lacunes, radical.
     appliquer(m, fleches)              flèches { de: i | [i, j], vers: i | [i, j], demi } : { m après, bilan, depasse (octets) }.
     memeEtat(m1, m2)                   mêmes liaisons, charges et hydrogènes : les flèches mènent-elles au produit attendu ?
     schema(m, o)                       { viewBox, html, fleches, apres } : dessin + doublets, charges, marques (δ+), flèches
                                        courbes (o.fleches, o.doublets, o.marques ; cote ±1, courbure par flèche).
     polarites(m, o)                    Δχ des liaisons (seuil 0,4), δ±, sites nucléophiles et électrophiles, H acides, liaisons π.
     profil(G, n), cinetiqueProfil(G, T)   profil [G₀, G₁‡, G₁, …] dessiné ; k d'Eyring par acte, k_app (AEQS), acte déterminant.
   Étape « Aromatiques » (chim-aromatiques) ; Hückel par huckel ; tests : test/chim-organique-aromatiques.test.js
     cycle(N, q)                        monocycle plan : niveaux (Hund), S, délocalisation, couche pleine, règle 4n + 2.
     etatsSEAr()                        stabilisations π (|β|) : benzène, Wheland, addition, substitution ; localisation.
     donneur(h, k)                      benzène–X à doublet : charges π (X cède, o et p reçoivent), coûts d'attaque o, m, p.
     relation(p, q), positionsPlus(a)   ipso, ortho, meta, para ; places de la charge + du Wheland après attaque en a.
     GROUPES_AROMATIQUES, orienter(subs)   orientation, activation, nitration mesurée ; positions visées par un cycle substitué.
     facteursPartiels(krel, rep), repartition(f)   facteurs partiels de vitesse ↔ vitesse relative et répartition o/m/p.
     areneMol(o), dessinArene(o)        dérivé du benzène (Kekulé 0 ou 1), E⁺ libre ou intermédiaire de Wheland : { m, etiquettes,
                                        H, E } ; son schema (charges, flèches courbes o.fleches, sans doublets).
   Étape « Créer des liaisons carbone-carbone » (chim-liaisons-cc) ; tests : test/chim-organique-liaisons-cc.test.js
     SYSTEMES_PI, orbitalesPi(s)        éthylène, acroléine, butadiène, 1- et 2-méthoxybutadiène, pour huckel.
     cycloaddition(diene, dienophile)   [4 + 2] : écarts HO–BV des deux demandes (|β|), orientation des gros coefficients.
     PARTENAIRES_ALDOL, aldols(a, b, dirigee)   paires donneur → accepteur d'une aldolisation croisée, non dirigée ou dirigée.
     grignardEster(r, nG)               ester + nG équivalents de RMgX, cétone k₂ = r k₁ : fractions finales ester, cétone, alcool.
   Étape « Amines et sels de diazonium » (chim-amines-diazonium) ; tests : test/chim-organique-amines.test.js
     successives(k, nR)                 alkylations successives d'une amine par nR équivalents de R–X : fractions finales.
     DIAZONIUM, kDiazonium(T), perteDiazonium(T, t)   hydrolyse du benzènediazonium, ordre 1, loi d'Arrhenius ancrée sur des mesures.
     PKA_COUPLAGE, formeReactive(id, pH), transmissionSolution(b, c, l)   partenaire de couplage activé ; lumière transmise par un colorant.
   Étape « Activation et protection » (chim-activation-protection) ; tests : test/chim-organique-activation.test.js
     deprotonation, voieWilliamson, fractionProtonee, substituerSN2, acetalisation, condensatMinimal, fractionBeta,
     actesActivation, sequence (banque de réactions), rendementGlobal, deconnecter (rétrosynthèse)   détail dans sa section.
   Limites assumées : règles CIP 1a (numéro atomique, atomes dupliqués pour les liaisons multiples et les cycles) et 2 (nombre
   de masse), pas les règles 3 à 5 (descripteurs pseudo-asymétriques r, s) : relationStereo voit « identiques » le cis et le
   trans d'un cyclohexane 1,4-disubstitué, qui n'a aucun centre R ou S. Les erreurs lèvent un message en français. */
(function (root) {
  const err = m => { throw new Error("chim-organique: " + m); };
  const Z = { H: 1, C: 6, N: 7, O: 8, F: 9, Si: 14, P: 15, S: 16, Cl: 17, Br: 35, I: 53, Os: 76 };
  const A0 = { H: 1, C: 12, N: 14, O: 16, F: 19, Si: 28, P: 31, S: 32, Cl: 35, Br: 79, I: 127, Os: 192 };   // isotope le plus abondant
  const VALENCE = { H: 1, C: 4, N: 3, O: 2, F: 1, Si: 4, P: 3, S: 2, Cl: 1, Br: 1, I: 1, Os: 0 };   // Os : aucun H implicite
  const MASSE = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Br: 79.904, I: 126.90, Os: 190.23 };   // g·mol⁻¹, IUPAC
  const HALO = new Set(["F", "Cl", "Br", "I"]);
  const ELECTRONS_VALENCE = { H: 1, C: 4, Si: 4, N: 5, P: 5, O: 6, S: 6, F: 7, Cl: 7, Br: 7, I: 7, Os: 8 };
  /* Liaisons (H compris) d'un atome de charge formelle q : v ≤ 4 (H, C, Si) perd |q| liaisons (C⁺, C⁻, H⁺) ; au-delà (N, O, S,
     halogènes) en gagne q (NH₄⁺, H₃O⁺) ou en perd −q (HO⁻, Br⁻). */
  const HYPER = { S: 6, P: 5, I: 7, Os: 8 };                     // valence étendue admise au dessin (sulfonate, oxyde de phosphine, periodate, OsO₄), jamais pour compter les H
  const valenceDe = at => VALENCE[at.e] + (at.q ? (ELECTRONS_VALENCE[at.e] <= 4 ? -Math.abs(at.q) : at.q) : 0);

  /* ---------- lire ---------- */
  function mol(spec) {
    if (typeof spec !== "string") err("mol attend une chaîne");
    const [pa, pb = ""] = spec.split("|");
    const atomes = pa.split(";").map(s => s.trim()).filter(Boolean).map(tok => {
      const [e, x, y, ...opt] = tok.split(/\s+/);
      if (!(e in Z)) err("élément inconnu : " + e);
      const at = { e, x: +x, y: +y };
      if (!isFinite(at.x) || !isFinite(at.y)) err("coordonnées invalides : " + tok);
      opt.forEach(o => { if (/^h\d$/.test(o)) at.h = +o.slice(1); else if (/^A\d+$/.test(o)) at.A = +o.slice(1); else if (/^q[+-]\d$/.test(o)) { if (+o.slice(1)) at.q = +o.slice(1); } else err("option inconnue : " + o); });
      return at;
    });
    const vus = new Set();
    const liaisons = pb.trim() ? pb.trim().split(/\s+/).map(tok => {
      const r = /^(\d+)([-=#wh])(\d+)$/.exec(tok);
      if (!r) err("liaison illisible : " + tok);
      const a = +r[1], b = +r[3], k = Math.min(a, b) + "-" + Math.max(a, b);
      if (a === b || !atomes[a] || !atomes[b]) err("liaison vers un atome absent : " + tok);
      if (vus.has(k)) err("liaison en double : " + tok); vus.add(k);
      return { a, b, ordre: { "-": 1, "=": 2, "#": 3, w: 1, h: 1 }[r[2]], style: r[2] === "w" ? "coin" : r[2] === "h" ? "hache" : null };
    }) : [];
    const m = { atomes, liaisons };
    atomes.forEach((at, i) => { if (somme(m, i) + (at.h || 0) > Math.max(valenceDe(at), HYPER[at.e] || 0)) err(`valence dépassée sur l'atome ${i} (${at.e})`); });
    return m;
  }
  const voisins = (m, i) => m.liaisons.filter(l => l.a === i || l.b === i).map(l => ({ j: l.a === i ? l.b : l.a, ordre: l.ordre, l }));
  const somme = (m, i) => voisins(m, i).reduce((s, v) => s + v.ordre, 0);
  function hydrogenes(m, i) {
    const at = m.atomes[i];
    if (at.e === "H") return 0;
    return at.h !== undefined ? at.h : Math.max(0, valenceDe(at) - somme(m, i));
  }

  /* ---------- formule brute ---------- */
  function formuleBrute(m) {
    const f = {};
    m.atomes.forEach((at, i) => { f[at.e] = (f[at.e] || 0) + 1; const h = hydrogenes(m, i); if (h) f.H = (f.H || 0) + h; });
    return f;
  }
  const SUB = "₀₁₂₃₄₅₆₇₈₉", indice = n => n === 1 ? "" : String(n).replace(/\d/g, d => SUB[d]);
  function ecrireFormule(f) {
    const cles = Object.keys(f).filter(e => f[e] > 0), ordre = f.C ? ["C", "H"] : [];
    const reste = cles.filter(e => !ordre.includes(e)).sort();
    return ordre.filter(e => f[e]).concat(reste).map(e => e + indice(f[e])).join("");
  }
  const insaturations = f => (2 * ((f.C || 0) + (f.Si || 0)) + 2 + (f.N || 0) + (f.P || 0) - (f.H || 0) - [...HALO].reduce((s, e) => s + (f[e] || 0), 0)) / 2;
  const masseMolaire = f => Object.entries(f).reduce((s, [e, n]) => s + (MASSE[e] || err("masse inconnue : " + e)) * n, 0) / 1000;

  /* ---------- graphe des atomes lourds : les H ordinaires deviennent implicites ---------- */
  function lourd(m) {
    const garde = m.atomes.map((at, i) => !(at.e === "H" && (at.A || 1) === 1 && voisins(m, i).length === 1));
    const orig = [], nouveau = new Map();
    m.atomes.forEach((at, i) => { if (garde[i]) { nouveau.set(i, orig.length); orig.push(i); } });
    const atomes = orig.map(i => ({ e: m.atomes[i].e, A: m.atomes[i].A, h: hydrogenes(m, i) + voisins(m, i).filter(v => !garde[v.j]).length }));
    const liaisons = m.liaisons.filter(l => garde[l.a] && garde[l.b]).map(l => ({ a: nouveau.get(l.a), b: nouveau.get(l.b), ordre: l.ordre, style: l.style }));
    return { atomes, liaisons, orig };
  }
  function correspondances(m1, m2, max) {
    max = max || 64;
    const g1 = lourd(m1), g2 = lourd(m2), n = g1.atomes.length;
    if (n !== g2.atomes.length || g1.liaisons.length !== g2.liaisons.length) return [];
    const adj = g => g.atomes.map((_, i) => voisins(g, i));
    const a1 = adj(g1), a2 = adj(g2);
    const inv = (g, a, i) => [g.atomes[i].e, g.atomes[i].A || 0, g.atomes[i].h, a[i].map(v => v.ordre).sort().join("")].join("/");
    const k1 = g1.atomes.map((_, i) => inv(g1, a1, i)), k2 = g2.atomes.map((_, i) => inv(g2, a2, i));
    if (k1.slice().sort().join() !== k2.slice().sort().join()) return [];
    const ordre = [], vu = new Set();                                // parcours en largeur de m1, composante par composante
    for (let s = 0; s < n; s++) if (!vu.has(s)) { const f = [s]; vu.add(s); while (f.length) { const i = f.shift(); ordre.push(i); a1[i].forEach(v => { if (!vu.has(v.j)) { vu.add(v.j); f.push(v.j); } }); } }
    const p = new Array(n).fill(-1), pris = new Array(n).fill(false), out = [];
    (function suite(k) {
      if (out.length >= max) return;
      if (k === n) { out.push(p.slice()); return; }
      const i = ordre[k];
      for (let j = 0; j < n; j++) {
        if (pris[j] || k2[j] !== k1[i]) continue;
        const ok = a1[i].every(v => p[v.j] < 0 || a2[j].some(w => w.j === p[v.j] && w.ordre === v.ordre));
        if (!ok) continue;
        p[i] = j; pris[j] = true; suite(k + 1); p[i] = -1; pris[j] = false;
      }
    })(0);
    return out.map(q => ({ p: q, g1, g2 }));
  }
  const memeFormule = (m1, m2) => ecrireFormule(formuleBrute(m1)) === ecrireFormule(formuleBrute(m2));

  /* ---------- groupes caractéristiques ---------- */
  function groupes(m) {
    const g = lourd(m), out = [], V = i => voisins(g, i), e = i => g.atomes[i].e;
    const carbonyle = c => V(c).some(v => v.ordre === 2 && e(v.j) === "O");
    g.atomes.forEach((at, i) => {
      if (at.e === "O") {
        const v = V(i);
        if (v.length === 1 && v[0].ordre === 1 && e(v[0].j) === "C") out.push(carbonyle(v[0].j) ? "acide" : "alcool");
        else if (v.length === 2 && v.every(w => w.ordre === 1 && e(w.j) === "C")) out.push(v.some(w => carbonyle(w.j)) ? "ester" : "ether");
        else if (v.length === 1 && v[0].ordre === 2 && e(v[0].j) === "C") {
          const c = v[0].j, autres = V(c).filter(w => w.j !== i);
          if (autres.some(w => e(w.j) === "O" && w.ordre === 1) || autres.some(w => e(w.j) === "N")) return;   // compté par l'acide, l'ester, l'amide
          out.push(g.atomes[c].h > 0 ? "aldehyde" : "cetone");
        }
      } else if (at.e === "N") out.push(V(i).some(v => e(v.j) === "C" && carbonyle(v.j)) ? "amide" : "amine");
      else if (HALO.has(at.e)) out.push("halogenoalcane");
    });
    g.liaisons.forEach(l => { if (e(l.a) === "C" && e(l.b) === "C" && l.ordre > 1) out.push(l.ordre === 2 ? "alcene" : "alcyne"); });
    return out.sort();
  }
  function squelette(m) {                                         // les carbones seuls, liaisons simples : la chaîne
    const idx = m.atomes.map((a, i) => (a.e === "C" ? i : -1)).filter(i => i >= 0), nv = new Map(idx.map((i, k) => [i, k]));
    return { atomes: idx.map(() => ({ e: "C", x: 0, y: 0, h: 0 })), liaisons: m.liaisons.filter(l => nv.has(l.a) && nv.has(l.b)).map(l => ({ a: nv.get(l.a), b: nv.get(l.b), ordre: 1, style: null })) };
  }
  function relationConstitution(m1, m2) {
    if (!memeFormule(m1, m2)) return "differentes";
    if (correspondances(m1, m2, 1).length) return "identiques";
    if (groupes(m1).join() !== groupes(m2).join()) return "fonction";
    if (!correspondances(squelette(m1), squelette(m2), 1).length) return "chaine";
    return "position";
  }

  /* ---------- règles de Cahn, Ingold et Prelog : graphe hiérarchisé ---------- */
  /* nœud = { i: atome (-1 : H implicite ou fantôme), z, a, dup, parent: atome d'où l'on vient, chemin: Set des atomes } */
  function noeud(m, i, parent, chemin, dup) {
    if (i < 0) return { i, z: 1, a: 1, dup: false, enfants: [] };   // hydrogène implicite
    const at = m.atomes[i];
    return { i, z: Z[at.e], a: at.A || A0[at.e], dup: !!dup, parent, chemin };
  }
  function enfants(m, n) {
    if (n.enfants) return n.enfants;
    const out = [];
    if (!n.dup && n.i >= 0) {
      const ch = new Set(n.chemin); ch.add(n.i);
      voisins(m, n.i).forEach(v => {
        const copies = v.ordre - 1;
        if (v.j === n.parent) { for (let k = 0; k < copies; k++) out.push(noeud(m, v.j, n.i, ch, true)); return; }
        if (n.chemin.has(v.j)) { for (let k = 0; k <= copies; k++) out.push(noeud(m, v.j, n.i, ch, true)); return; }   // fermeture de cycle
        out.push(noeud(m, v.j, n.i, ch, false));
        for (let k = 0; k < copies; k++) out.push(noeud(m, v.j, n.i, ch, true));
      });
      for (let k = hydrogenes(m, n.i); k > 0; k--) out.push(noeud(m, -1));
    }
    n.enfants = out;
    return out;
  }
  /* Compare deux branches sphère par sphère : à chaque sphère, les ensembles de substituants dans l'ordre de rang de leurs
     parents, chaque ensemble trié par ordre décroissant ; un fantôme compte 0. cle : numéro atomique (règle 1a), ou
     numéro atomique puis nombre de masse (règle 2), qui ne sert qu'une fois la règle 1a épuisée. */
  function cmpBranches(m, x, y, cle, prof) {
    let d = cle(x) - cle(y);
    if (d) return d;
    let lx = [x], ly = [y];
    for (let s = 0; s < prof; s++) {
      const ex = lx.map(n => trier(m, enfants(m, n), cle, prof - s - 1)), ey = ly.map(n => trier(m, enfants(m, n), cle, prof - s - 1));
      for (let k = 0; k < Math.max(ex.length, ey.length); k++) {
        const A = ex[k] || [], B = ey[k] || [];
        for (let q = 0; q < Math.max(A.length, B.length); q++) {
          d = (A[q] ? cle(A[q]) : 0) - (B[q] ? cle(B[q]) : 0);
          if (d) return d;
        }
      }
      lx = ex.flat(); ly = ey.flat();
      if (!lx.length && !ly.length) return 0;
    }
    return 0;
  }
  const trier = (m, liste, cle, prof) => liste.slice().sort((p, q) => -cmpBranches(m, p, q, cle, Math.max(prof, 0)));
  const R1 = n => n.z, R2 = n => n.z * 1000 + n.a;
  const cmpCIP = (m, x, y) => { const p = m.atomes.length + 2; return cmpBranches(m, x, y, R1, p) || cmpBranches(m, x, y, R2, p); };
  function racine(m, i) { return noeud(m, i, -2, new Set(), false); }
  function comparer(m, depuis, i, j) {
    const ch = new Set([depuis]);
    return cmpCIP(m, noeud(m, i, depuis, ch, false), noeud(m, j, depuis, ch, false));
  }
  function priorites(m, i) {
    const lig = enfants(m, racine(m, i));
    if (lig.length !== 4 || lig.some(n => n.dup)) return null;
    const tri = lig.slice().sort((p, q) => -cmpCIP(m, p, q));
    for (let k = 0; k < 3; k++) if (cmpCIP(m, tri[k], tri[k + 1]) === 0) return null;
    return tri.map((n, k) => ({ atome: n.i >= 0 ? n.i : null, rang: k + 1 }));
  }
  const centres = m => m.atomes.map((a, i) => i).filter(i => m.atomes[i].e === "C" && voisins(m, i).every(v => v.ordre === 1) && priorites(m, i));

  /* position 3D d'un substituant vu de l'atome i : le dessin plus la profondeur des coins qui partent de i */
  function direction(m, i, j) {
    const a = m.atomes[i], b = m.atomes[j], l = m.liaisons.find(q => (q.a === i && q.b === j) || (q.a === j && q.b === i));
    const dx = b.x - a.x, dy = b.y - a.y, n = Math.hypot(dx, dy) || 1;
    const z = l.a === i && l.style === "coin" ? 1 : l.a === i && l.style === "hache" ? -1 : 0;
    return [dx / n, dy / n, z];
  }
  function descripteurRS(m, i) {
    const p = priorites(m, i);
    if (!p) return null;
    const exp = p.filter(q => q.atome !== null).map(q => direction(m, i, q.atome));
    const pos = p.map(q => q.atome !== null ? direction(m, i, q.atome) : null), manque = pos.indexOf(null);
    if (manque >= 0) { const s = exp.reduce((t, v) => [t[0] + v[0], t[1] + v[1], t[2] + v[2]], [0, 0, 0]); pos[manque] = [-s[0], -s[1], -s[2]]; }
    const [a, b, c, d] = pos, u = a.map((x, k) => x - d[k]), v = b.map((x, k) => x - d[k]), w = c.map((x, k) => x - d[k]);
    const V = u[0] * (v[1] * w[2] - v[2] * w[1]) + u[1] * (v[2] * w[0] - v[0] * w[2]) + u[2] * (v[0] * w[1] - v[1] * w[0]);
    if (Math.abs(V) < 1e-6) return null;                         // dessin plan : rien ne dit l'arrangement dans l'espace
    return V < 0 ? "R" : "S";                                     // x à droite, y en haut, z vers le lecteur
  }

  /* ---------- liaisons doubles ---------- */
  function substituants(m, a, b) {                               // les deux substituants de a autres que b, classés
    const ch = new Set([a]);
    const lst = voisins(m, a).filter(v => v.j !== b).map(v => noeud(m, v.j, a, ch, false));
    for (let k = hydrogenes(m, a); k > 0; k--) lst.push(noeud(m, -1));
    if (lst.length !== 2) return null;
    const d = cmpCIP(m, lst[0], lst[1]);
    return d === 0 ? null : d > 0 ? lst : [lst[1], lst[0]];
  }
  function doublesStereogenes(m) {
    return m.liaisons.filter(l => l.ordre === 2 && m.atomes[l.a].e === "C" && m.atomes[l.b].e === "C" && substituants(m, l.a, l.b) && substituants(m, l.b, l.a)).map(l => [l.a, l.b]);
  }
  function descripteurZE(m, a, b) {
    const sa = substituants(m, a, b), sb = substituants(m, b, a);
    if (!sa || !sb) return null;
    const A = m.atomes[a], B = m.atomes[b];
    const cote = (o, n) => { if (n.i < 0) return null; const P = m.atomes[n.i]; return Math.sign((B.x - A.x) * (P.y - o.y) - (B.y - A.y) * (P.x - o.x)); };
    const coteDe = (o, s) => { const c0 = cote(o, s[0]); if (c0 !== null) return c0; const c1 = cote(o, s[1]); return c1 === null ? 0 : -c1; };
    const x = coteDe(A, sa), y = coteDe(B, sb);
    if (!x || !y) return null;
    return x === y ? "Z" : "E";
  }
  function descripteurs(m) {
    const c = {}, d = {};
    centres(m).forEach(i => { c[i] = descripteurRS(m, i); });
    doublesStereogenes(m).forEach(([a, b]) => { d[a + "-" + b] = descripteurZE(m, a, b); });
    return { centres: c, doubles: d };
  }
  function relationStereo(m1, m2) {
    const cs = correspondances(m1, m2, 256);
    if (!cs.length) return "constitution";
    const d1 = descripteurs(m1), d2 = descripteurs(m2);
    const { g1, g2 } = cs[0], n1 = new Map(g1.orig.map((o, k) => [o, k])), o2 = g2.orig;
    const autre = x => x === "R" ? "S" : x === "S" ? "R" : x;
    const verifie = (p, f) => Object.entries(d1.centres).every(([i, x]) => d2.centres[o2[p[n1.get(+i)]]] === f(x))
      && Object.entries(d1.doubles).every(([k, x]) => { const [a, b] = k.split("-").map(s => o2[p[n1.get(+s)]]);
        return (d2.doubles[a + "-" + b] || d2.doubles[b + "-" + a]) === x; })
      && Object.keys(d2.centres).length === Object.keys(d1.centres).length && Object.keys(d2.doubles).length === Object.keys(d1.doubles).length;
    if (cs.some(c => verifie(c.p, x => x))) return "identiques";
    if (cs.some(c => verifie(c.p, autre))) return "enantiomeres";
    return "diastereoisomeres";
  }
  function copie(m) { return { atomes: m.atomes.map(a => Object.assign({}, a)), liaisons: m.liaisons.map(l => Object.assign({}, l)) }; }
  function inverser(m, i) {
    const r = copie(m), ls = r.liaisons.filter(l => l.a === i && l.style);
    if (!ls.length) err(`l'atome ${i} n'a pas de coin à inverser`);
    ls.forEach(l => { l.style = l.style === "coin" ? "hache" : "coin"; });
    return r;
  }
  function miroir(m) { const r = copie(m); r.atomes.forEach(a => { a.x = -a.x; }); return r; }

  /* ---------- dessin : formule topologique et coins de Cram ---------- */
  const f1 = x => (Math.round(x * 10) / 10).toString();
  const COULEUR = { O: "el-o", N: "el-n" };
  function etiquette(m, i, o) {                                   // [élément, hydrogènes] ou null pour un carbone muet
    const at = m.atomes[i], h = hydrogenes(m, i), deg = voisins(m, i).length;
    if (o.etiquettes && o.etiquettes[i] != null) return [o.etiquettes[i], ""];   // groupe écrit en entier : « PPh₃ »
    if (at.e === "C" && !o.carbones && deg > 0) return null;
    return [at.e === "H" && at.A === 2 ? "D" : at.e, h ? "H" + indice(h) : ""];
  }
  function dessin(m, o) {
    o = o || {};
    const s = o.echelle || 36, T = o.texte || (x => x), out = [];
    const P = m.atomes.map(a => [a.x * s, -a.y * s]);
    const lab = m.atomes.map((_, i) => etiquette(m, i, o));
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]), mg = 0.75 * s;
    const vb = [Math.min(...xs) - mg, Math.min(...ys) - mg, Math.max(...xs) - Math.min(...xs) + 2 * mg, Math.max(...ys) - Math.min(...ys) + 2 * mg];
    const line = (a, b, cls) => out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="stroke ${cls || ""}"/>`);
    (o.surligne || []).forEach(i => out.push(`<circle cx="${f1(P[i][0])}" cy="${f1(P[i][1])}" r="${f1(0.22 * s)}" class="stroke thin c-tint"/>`));
    m.liaisons.forEach(l => {
      let a = P[l.a], b = P[l.b];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, u = [dx / L, dy / L], nrm = [-u[1], u[0]];
      const coupe = 0.32 * s;
      if (lab[l.a]) a = [a[0] + u[0] * coupe, a[1] + u[1] * coupe];
      if (lab[l.b]) b = [b[0] - u[0] * coupe, b[1] - u[1] * coupe];
      if (l.style === "coin") {
        const w = 0.13 * s;
        out.push(`<polygon points="${f1(a[0])},${f1(a[1])} ${f1(b[0] + nrm[0] * w)},${f1(b[1] + nrm[1] * w)} ${f1(b[0] - nrm[0] * w)},${f1(b[1] - nrm[1] * w)}" class="fill c-label"/>`);
      } else if (l.style === "hache") {
        for (let k = 1; k <= 6; k++) {
          const t = k / 6, w = 0.02 * s + t * 0.11 * s, c = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
          line([c[0] + nrm[0] * w, c[1] + nrm[1] * w], [c[0] - nrm[0] * w, c[1] - nrm[1] * w], "thin");
        }
      } else if (l.ordre === 1) line(a, b);
      else {
        const off = 0.09 * s;
        if (l.ordre === 3) { line(a, b); [1, -1].forEach(k => line([a[0] + nrm[0] * off * 1.4 * k, a[1] + nrm[1] * off * 1.4 * k], [b[0] + nrm[0] * off * 1.4 * k, b[1] + nrm[1] * off * 1.4 * k])); return; }
        const autres = voisins(m, l.a).filter(v => v.j !== l.b).concat(voisins(m, l.b).filter(v => v.j !== l.a));
        const cote = autres.reduce((t, v) => t + Math.sign(nrm[0] * (P[v.j][0] - P[l.a][0]) + nrm[1] * (P[v.j][1] - P[l.a][1])), 0);
        if (!cote || lab[l.a] || lab[l.b]) [1, -1].forEach(k => line([a[0] + nrm[0] * off * k, a[1] + nrm[1] * off * k], [b[0] + nrm[0] * off * k, b[1] + nrm[1] * off * k]));
        else {
          line(a, b);
          const k = Math.sign(cote) * 2 * off, r = 0.14 * L;
          line([a[0] + nrm[0] * k + u[0] * r, a[1] + nrm[1] * k + u[1] * r], [b[0] + nrm[0] * k - u[0] * r, b[1] + nrm[1] * k - u[1] * r]);
        }
      }
    });
    m.atomes.forEach((at, i) => {
      if (!lab[i]) return;
      const [el, h] = lab[i], x = P[i][0], y = P[i][1] + 4.5, cls = COULEUR[at.e] ? ` class="fill ${COULEUR[at.e]}"` : "";
      if (o.etiquettes && o.etiquettes[i] != null && el.length > 2) {   // groupe écrit : son premier ou dernier caractère sur l'atome
        const vs = voisins(m, i), vx = vs.reduce((t, v) => t + (P[v.j][0] - P[i][0]), 0), droite = vx > 0.01;   // atome seul : centré
        const ancre = !vs.length ? "middle" : droite ? "end" : "start", dx = !vs.length ? 0 : droite ? 5 : -5;
        out.push(`<text x="${f1(x + dx)}" y="${f1(y)}" text-anchor="${ancre}"${cls}>${T(el)}</text>`);
        return;
      }
      out.push(`<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle"${cls}>${T(el)}</text>`);
      if (h) {
        const vx = voisins(m, i).reduce((t, v) => t + (P[v.j][0] - P[i][0]), 0), gauche = vx > 0.01;   // liaisons à droite : H à gauche
        const dx = (el.length > 1 ? 11 : 8) + (h.length > 1 ? 4 : 0);
        out.push(`<text x="${f1(x + (gauche ? -dx : dx))}" y="${f1(y)}" text-anchor="middle"${cls}>${T(h)}</text>`);
      }
    });
    Object.entries(o.marques || {}).forEach(([i, txt]) => {
      const v = voisins(m, +i), c = P[+i];
      let dx = -v.reduce((t, w) => t + P[w.j][0] - c[0], 0), dy = -v.reduce((t, w) => t + P[w.j][1] - c[1], 0);
      const n = Math.hypot(dx, dy); if (n < 1e-6) { dx = 0.7; dy = -0.7; } else { dx /= n; dy /= n; }
      out.push(`<text x="${f1(c[0] + dx * 0.62 * s)}" y="${f1(c[1] + dy * 0.62 * s + 4)}" text-anchor="middle" class="fill c-tint">${T(txt)}</text>`);
    });
    return { viewBox: vb.map(f1).join(" "), html: out.join("") };
  }

  /* ---------- projection de Newman ---------- */
  function newman(o) {
    const R = 56, r = 22, Rl = 70, T = o.texte || (x => x), out = [], phi = +o.phi || 0;
    if (!Array.isArray(o.avant) || o.avant.length !== 3 || !Array.isArray(o.arriere) || o.arriere.length !== 3) err("newman : trois substituants devant, trois derrière");
    const pt = (deg, rad) => [rad * Math.cos(deg * Math.PI / 180), -rad * Math.sin(deg * Math.PI / 180)];
    /* éclipsé : les liaisons de derrière sont décalées de 7° pour rester visibles, comme sur papier */
    let vis = ((phi % 120) + 120) % 120;
    vis = vis < 7 ? 7 : vis > 113 ? 113 : vis;
    const base = phi - (((phi % 120) + 120) % 120) + vis;
    o.arriere.forEach((t, k) => {
      const ang = 90 - base - 120 * k, a = pt(ang, r), b = pt(ang, R), c = pt(ang, Rl);
      out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="stroke c-label-2"/>`);
      out.push(`<text x="${f1(c[0])}" y="${f1(c[1] + 4)}" text-anchor="middle">${T(t)}</text>`);
    });
    out.push(`<circle cx="0" cy="0" r="${r}" class="stroke"/>`);
    o.avant.forEach((t, k) => {
      const ang = 90 - 120 * k, b = pt(ang, R), c = pt(ang, Rl + 4);
      out.push(`<line x1="0" y1="0" x2="${f1(b[0])}" y2="${f1(b[1])}" class="stroke bold"/>`);
      out.push(`<text x="${f1(c[0])}" y="${f1(c[1] + 4)}" text-anchor="middle" class="fill c-label">${T(t)}</text>`);
    });
    return { viewBox: "-95 -92 190 184", html: out.join("") };
  }

  /* ---------- énergie de torsion, populations, vitesse ---------- */
  const K = () => root.Constantes || (typeof require === "function" ? require("./constantes.js") : err("constantes.js manquant"));
  const rad = d => d * Math.PI / 180;
  const torsion = (c, phi) => c.reduce((s, cn, n) => s + cn * Math.cos(n * rad(phi)), 0);
  function ajusterTorsion(points) {
    if (!Array.isArray(points) || points.length !== 4) err("ajusterTorsion : quatre points [φ°, V]");
    const A = points.map(([p, v]) => [0, 1, 2, 3].map(n => Math.cos(n * rad(p))).concat(v));
    for (let k = 0; k < 4; k++) {                                // pivot de Gauss partiel
      let piv = k; for (let i = k + 1; i < 4; i++) if (Math.abs(A[i][k]) > Math.abs(A[piv][k])) piv = i;
      if (Math.abs(A[piv][k]) < 1e-12) err("ajusterTorsion : points dégénérés");
      [A[k], A[piv]] = [A[piv], A[k]];
      for (let i = 0; i < 4; i++) if (i !== k) { const f = A[i][k] / A[k][k]; for (let j = k; j < 5; j++) A[i][j] -= f * A[k][j]; }
    }
    return A.map((row, k) => row[4] / row[k]);
  }
  function fractions(c, T, zones) {
    if (!(T > 0)) err("fractions : T > 0 attendu");
    const N = 3600, w = [], RT = K().R * T, Vmin = Math.min(...Array.from({ length: 361 }, (_, k) => torsion(c, k)));
    let tot = 0;
    for (let k = 0; k < N; k++) { const p = (k + 0.5) * 360 / N, q = Math.exp(-(torsion(c, p) - Vmin) / RT); w.push([p, q]); tot += q; }
    const dans = (p, [a, b]) => { const x = ((p - a) % 360 + 360) % 360; return x < ((b - a) % 360 + 360) % 360; };
    return zones.map(z => w.reduce((s, [p, q]) => s + (dans(p, z) ? q : 0), 0) / tot);
  }
  const eyring = (dG, T) => { const C = K(); return C.k_B * T / C.h * Math.exp(-dG / (C.R * T)); };

  /* ---------- 3D : un carbone tétraédrique ---------- */
  function tetraedre(e, ligands) {
    if (!Array.isArray(ligands) || ligands.length !== 4) err("tetraedre : quatre ligands");
    const s = Math.sqrt(8) / 3, dirs = [[0, 1, 0]].concat([0, 120, 240].map(a => [s * Math.cos(rad(a)), -1 / 3, s * Math.sin(rad(a))]));
    return [{ e, r: [0, 0, 0] }].concat(ligands.map((l, k) => ({ e: l.e, r: dirs[k].map(x => x * l.d) })));
  }
  const miroir3D = a => a.map(x => ({ e: x.e, r: [-x.r[0], x.r[1], x.r[2]] }));
  function superposer(P, Q, i, j) {                               // tourne Q autour de son atome 0 : ses ligands i et j sur ceux de P
    const sub = (a, b) => a.map((x, k) => x - b[k]), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const nor = a => { const n = Math.hypot(...a); return a.map(x => x / n); }, cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const repere = (X, c) => { const u = nor(sub(X[i].r, c)), v0 = sub(X[j].r, c), v = nor(sub(v0, u.map(x => x * dot(v0, u)))); return [u, v, cr(u, v)]; };
    const cP = P[0].r, cQ = Q[0].r, FP = repere(P, cP), FQ = repere(Q, cQ);
    return Q.map(a => { const d = sub(a.r, cQ), loc = FQ.map(e => dot(e, d)); return { e: a.e, r: [0, 1, 2].map(k => cP[k] + FP[0][k] * loc[0] + FP[1][k] * loc[1] + FP[2][k] * loc[2]) }; });
  }

  /* ---------- activité optique ---------- */
  const DEG_DM_G_ML = 1e-2;                                       // 1 °·dm⁻¹·g⁻¹·mL en °·m²·kg⁻¹
  const biot = (alpha, l, c) => alpha * l * c;
  const pouvoirMelange = (cs, l) => cs.reduce((s, x) => s + biot(x.alpha, l, x.c), 0);

  /* ---------- molécules de la piste (dessin en longueurs de liaison, y vers le haut) ---------- */
  const MOLECULES = {
    /* C₄H₁₀O */
    butan1ol: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 3.464 0 | 0-1 1-2 2-3 3-4",
    butan1olBis: "O 0 1; C 0 0; C 0.866 -0.5; C 1.732 0; C 1.732 1 | 0-1 1-2 2-3 3-4",
    butan2ol: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 0.866 1.5 | 0-1 1-2 2-3 1-4",
    methylpropan1ol: "C 0 0; C 0.866 0.5; C 0.866 1.5; C 1.732 0; O 2.598 0.5 | 0-1 1-2 1-3 3-4",
    methylpropan2ol: "C -1 0; C 0 0; C 1 0; C 0 1; O 0 -1 | 0-1 1-2 1-3 1-4",
    methoxypropane: "C 0 0; C 0.866 0.5; C 1.732 0; O 2.598 0.5; C 3.464 0 | 0-1 1-2 2-3 3-4",
    methoxypropane2: "C 0 0; C 0.866 0.5; C 1.732 0; O 0.866 1.5; C 1.732 2 | 0-1 1-2 1-3 3-4",
    ethoxyethane: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; C 3.464 0 | 0-1 1-2 2-3 3-4",
    butanone: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 0.866 1.5 | 0-1 1-2 2-3 1=4",
    butanal: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 3.464 0 | 0-1 1-2 2-3 3=4",
    but1ene: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5 | 0-1 1-2 2=3",
    /* un centre stéréogène, H explicite en coin haché */
    bromochlorofluoromethane: "C 0 0; Br 0 1; F 0.95 -0.2; Cl -0.9 -0.5; H 0.35 -0.95 | 0-1 0w2 0-3 0h4",
    butan2olR: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; O 0 1; H 0 -0.9 | 0-1 1-2 2-3 1w4 1h5",
    alanine: "C 0.866 -0.5; C 0 0; C -0.866 -0.5; O -1.732 0; O -0.866 -1.5; N 0 1; H 0 -0.9 | 0-1 1-2 2-3 2=4 1w5 1h6",
    acideLactique: "C 0.866 -0.5; C 0 0; C -0.866 -0.5; O -1.732 0; O -0.866 -1.5; O 0 1; H 0 -0.9 | 0-1 1-2 2-3 2=4 1w5 1h6",
    glyceraldehyde: "O -1.732 0; C -0.866 -0.5; C 0 0; C 0.866 -0.5; O 1.732 0; O 0 1; H 0 -0.9 | 0-1 1-2 2-3 3=4 2w5 2h6",
    butenol: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; O 0 1; H 0 -0.9 | 0-1 1-2 2=3 1w4 1h5",
    /* deux centres stéréogènes */
    butanediol: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; O 0 1; O 0.866 -1.5 | 0-1 1-2 2-3 1w4 2w5",
    chlorobutanol: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; O 0 1; Cl 0.866 -1.5 | 0-1 1-2 2-3 1w4 2w5",
    /* liaisons doubles */
    but2eneE: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5 | 0-1 1=2 2-3",
    but2eneZ: "C 0 0; C 0.866 0.5; C 1.732 0; C 1.732 -1 | 0-1 1=2 2-3",
    bromochloropropene: "Br -0.866 0.5; Cl -0.866 -0.5; C 0 0; C 1 0; C 1.5 0.866 | 0-2 1-2 2=3 3-4",
  };
  const molecule = id => MOLECULES[id] ? mol(MOLECULES[id]) : err("molécule inconnue : " + id);

  /* ---------- Étape « Spectroscopies » (X.chim_spectro.1 à 3) : exporté sous ChimOrga.Spectro ----------
     SI : longueurs d'onde en m, nombres d'onde en m⁻¹ (les pages affichent des cm⁻¹, l'usage des spectroscopistes :
     1 cm⁻¹ = 100 m⁻¹), concentrations en mol·m⁻³, ε en m²·mol⁻¹ (1 L·mol⁻¹·cm⁻¹ = 0,1 m²·mol⁻¹), fréquences en Hz,
     déplacement chimique δ sans dimension (10⁻⁶ δ s'écrit 1 ppm). La fréquence de Larmor ν₀ = γB₀/2π vient de
     MagInd.frequencePrecession (public/magnetisme-induction.js) : les fonctions RMN la prennent en argument.
     photon(λ)                          { nu, sigma, E, Em } : fréquence, nombre d'onde, énergie d'un photon (J) et d'une mole (J·mol⁻¹).
     DOMAINES, domaine(λ)               bornes conventionnelles du cours (UV < 400 nm < visible < 800 nm < IR) ; l'identifiant.
     absorbance(T), transmittance(A)    A = −lg T et l'inverse.
     beerLambert(eps, l, c)             A = ε ℓ c.
     bande(b, λ), mesure(o)             ε(λ) d'une bande gaussienne { lambda0, largeur (largeur à mi-hauteur), epsMax } ;
                                        absorbance lue par un appareil : fente triangulaire de largeur à mi-hauteur o.fente,
                                        fraction o.parasite de lumière parasite non absorbée. o = { bande, c, l, lambda, fente, parasite }.
     masseReduite(a, b), nombreOnde(k, mu), raideur(sigma, mu)   oscillateur harmonique : σ = √(k/μ)/(2πc), et l'inverse.
     BANDES_IR, MOLECULES_IR, spectreIR(id, sigmas)   bandes d'une table usuelle [min, max] en m⁻¹ ; bandes de quelques molécules ;
                                        transmittance schématique (bandes gaussiennes au milieu des intervalles).
     multiplet(couplages)               premier ordre : [{ f (Hz, depuis le centre), I }], ΣI = 1 ; couplages [{ n, J }].
     raies(signaux, nu0)                [{ delta, I, signal }] : I en nombre de protons ; signaux [{ id, delta, n, couplages }].
     spectreRMN(raies, deltas, nu0, w)  somme de lorentziennes de largeur à mi-hauteur w (Hz), hauteur I.
     integrale(raies, d1, d2)           nombre de protons des raies entre δ = d1 et d2.
     MOLECULES_RMN, melange(parts)      δ et J de quelques molécules dans CDCl₃ ; signaux d'un mélange [[id, fraction molaire]].
     ab(dnu, J), abPremierOrdre(dnu, J) système AB exact (deux spins) et son approximation du premier ordre : [{ f, I }], ΣI = 2.
     karplus(phi, A, B, C), karplusMoyen(o)   ³J(φ) = A cos²φ + B cos φ + C (Hz) ; moyenne sur les trois conformations décalées. */
  const SPECTRO = (() => {
    const fail = m => { throw new Error("spectroscopies : " + m); };
    const pos = (v, nom) => (typeof v === "number" && v > 0 && isFinite(v) ? v : fail(nom + " doit être un nombre > 0"));
    const fini = (v, nom) => (typeof v === "number" && isFinite(v) ? v : fail(nom + " doit être un nombre fini"));
    const cm = v => 100 * v;                                                  // cm⁻¹ → m⁻¹

    function photon(lambda) {
      pos(lambda, "λ"); const C = K();
      return { nu: C.c / lambda, sigma: 1 / lambda, E: C.h * C.c / lambda, Em: C.N_A * C.h * C.c / lambda };
    }
    const DOMAINES = [["uv", 1e-8, 4e-7], ["visible", 4e-7, 8e-7], ["irProche", 8e-7, 2.5e-6], ["irMoyen", 2.5e-6, 2.5e-5], ["irLointain", 2.5e-5, 1e-3]];
    const domaine = lambda => { pos(lambda, "λ"); const d = DOMAINES.find(([, a, b]) => lambda >= a && lambda < b); return d ? d[0] : null; };

    const absorbance = T => (T > 0 && T <= 1 ? -Math.log10(T) : fail("T doit être dans ]0, 1]"));
    const transmittance = A => (fini(A, "A") >= 0 ? Math.pow(10, -A) : fail("A doit être ≥ 0"));
    const beerLambert = (eps, l, c) => { [eps, l, c].forEach((v, i) => { if (!(v >= 0 && isFinite(v))) fail(["ε", "ℓ", "c"][i] + " doit être ≥ 0"); }); return eps * l * c; };
    const bande = (b, lambda) => b.epsMax * Math.exp(-4 * Math.LN2 * Math.pow((lambda - b.lambda0) / b.largeur, 2));
    function mesure(o) {
      const { bande: b, c, l, lambda } = o, w = o.fente || 0, s = o.parasite || 0;
      pos(b.largeur, "largeur"); pos(b.epsMax, "epsMax"); pos(lambda, "λ");
      if (!(w >= 0) || !(s >= 0 && s < 1)) fail("fente ≥ 0, parasite dans [0, 1[");
      const vraie = beerLambert(bande(b, lambda), l, c);
      let T;
      if (w === 0) T = Math.pow(10, -vraie);
      else {                                                                    // fente triangulaire : base 2w, aire 1
        const n = 400; let num = 0, den = 0;
        for (let i = 0; i <= n; i++) { const x = -w + 2 * w * i / n, p = (1 - Math.abs(x) / w) * (i === 0 || i === n ? 0.5 : 1);
          num += p * Math.pow(10, -beerLambert(bande(b, lambda + x), l, c)); den += p; }
        T = num / den;
      }
      const Tm = (T + s) / (1 + s);
      return { A: -Math.log10(Tm), vraie, T: Tm };
    }

    /* ---------- infrarouge ---------- */
    const DALTON = () => K().u;
    const MASSES_U = Object.assign({}, MASSE, { D: 2.014102 });                 // u : masses conventionnelles, deutérium à part
    const masseAtome = e => (e in MASSES_U ? MASSES_U[e] * DALTON() : fail("élément inconnu : " + e));
    const masseReduite = (a, b) => { const ma = masseAtome(a), mb = masseAtome(b); return ma * mb / (ma + mb); };
    const nombreOnde = (k, mu) => Math.sqrt(pos(k, "k") / pos(mu, "μ")) / (2 * Math.PI * K().c);
    const raideur = (sigma, mu) => pos(mu, "μ") * Math.pow(2 * Math.PI * K().c * pos(sigma, "σ"), 2);
    /* table d'absorption IR de LibreTexts (« Infrared Spectroscopy Absorption Table ») : [min, max] en m⁻¹, intensité, allure,
       atomes de la liaison qui vibre (pour μ) */
    const B_ = (min, max, intensite, liaison, large) => ({ min: cm(min), max: cm(max), intensite, liaison, large: !!large });
    const BANDES_IR = {
      ohLibre: B_(3584, 3700, "moyenne", ["O", "H"]),
      ohAlcool: B_(3200, 3550, "forte", ["O", "H"], true),
      ohAcide: B_(2500, 3300, "forte", ["O", "H"], true),
      chAlcane: B_(2840, 3000, "moyenne", ["C", "H"]),
      chAlcene: B_(3000, 3100, "moyenne", ["C", "H"]),
      chAldehyde: B_(2695, 2830, "moyenne", ["C", "H"]),
      cn: B_(2222, 2260, "faible", ["C", "N"]),
      coEster: B_(1735, 1750, "forte", ["C", "O"]),
      coAldehyde: B_(1720, 1740, "forte", ["C", "O"]),
      coCetone: B_(1705, 1725, "forte", ["C", "O"]),
      coAcide: B_(1706, 1720, "forte", ["C", "O"]),
      ccMono: B_(1638, 1648, "forte", ["C", "C"]),
      coEther: B_(1085, 1150, "forte", ["C", "O"]),
      coAlcool: B_(1050, 1085, "forte", ["C", "O"]),
      coEsterSimple: B_(1163, 1210, "forte", ["C", "O"]),
    };
    const MOLECULES_IR = {
      ethanol: ["ohAlcool", "chAlcane", "coAlcool"],
      butanone: ["chAlcane", "coCetone"],
      butanal: ["chAlcane", "chAldehyde", "coAldehyde"],
      acideEthanoique: ["ohAcide", "coAcide"],
      acetateEthyle: ["chAlcane", "coEster", "coEsterSimple"],
      propanenitrile: ["chAlcane", "cn"],
      but1ene: ["chAlcene", "chAlcane", "ccMono"],
      ethoxyethane: ["chAlcane", "coEther"],
    };
    const PROFONDEUR = { forte: 1.2, moyenne: 0.5, faible: 0.2 };              // absorbance au sommet, schématique
    function spectreIR(id, sigmas) {
      const ids = MOLECULES_IR[id] || fail("molécule IR inconnue : " + id);
      return sigmas.map(s => Math.pow(10, -ids.reduce((A, b) => { const B = BANDES_IR[b], c = (B.min + B.max) / 2, w = Math.max(B.max - B.min, cm(12));
        return A + PROFONDEUR[B.intensite] * Math.exp(-4 * Math.LN2 * Math.pow((s - c) / w, 2)); }, 0)));
    }

    /* ---------- RMN du proton ---------- */
    const binome = n => { const r = [1]; for (let k = 1; k <= n; k++) r.push(r[k - 1] * (n - k + 1) / k); return r; };
    function multiplet(couplages) {
      let raies = [{ f: 0, I: 1 }];
      for (const { n, J } of couplages || []) {
        if (!(Number.isInteger(n) && n >= 0)) fail("n doit être un entier ≥ 0"); fini(J, "J");
        const p = binome(n), tot = Math.pow(2, n), m = new Map();
        for (const r of raies) p.forEach((c, k) => { const f = r.f + (k - n / 2) * J, cle = f.toFixed(6);
          const v = m.get(cle); if (v) v.I += r.I * c / tot; else m.set(cle, { f, I: r.I * c / tot }); });
        raies = [...m.values()];
      }
      return raies.sort((a, b) => a.f - b.f);
    }
    function raies(signaux, nu0) {
      pos(nu0, "ν₀");
      return signaux.flatMap(s => { fini(s.delta, "δ"); pos(s.n, "n");
        return multiplet(s.couplages).map(r => ({ delta: s.delta + 1e6 * r.f / nu0, I: s.n * r.I, signal: s.id })); });
    }
    function spectreRMN(rs, deltas, nu0, w) {
      pos(nu0, "ν₀"); pos(w, "w"); const h = w / 2;
      return deltas.map(d => rs.reduce((y, r) => { const df = (d - r.delta) * nu0 / 1e6; return y + r.I * h * h / (df * df + h * h); }, 0));
    }
    const integrale = (rs, d1, d2) => rs.reduce((s, r) => s + (r.delta >= Math.min(d1, d2) && r.delta <= Math.max(d1, d2) ? r.I : 0), 0);
    /* δ (ppm) et J (Hz) dans CDCl₃ à 298 K : Fulmer et al., Organometallics 29, 2176 (2010), table 1 (OH omis, sauf l'éthanol) */
    const S_ = (id, delta, n, ...c) => ({ id, delta, n, couplages: c.map(([m, J]) => ({ n: m, J })) });
    const MOLECULES_RMN = {
      ethanol: [S_("ch3", 1.25, 3, [2, 7]), S_("ch2", 3.72, 2, [3, 7]), S_("oh", 1.32, 1)],
      acetateEthyle: [S_("ch3co", 2.05, 3), S_("ch2", 4.12, 2, [3, 7]), S_("ch3", 1.26, 3, [2, 7])],
      ethoxyethane: [S_("ch3", 1.21, 6, [2, 7]), S_("ch2", 3.48, 4, [3, 7])],
      propan2ol: [S_("ch3", 1.22, 6, [1, 6]), S_("ch", 4.04, 1, [6, 6])],
      propane: [S_("ch3", 0.90, 6, [2, 7.3]), S_("ch2", 1.32, 2, [6, 7.3])],
      triethylamine: [S_("ch3", 1.03, 9, [2, 7]), S_("ch2", 2.53, 6, [3, 7])],
      acetone: [S_("ch3", 2.17, 6)],
    };
    const melange = parts => parts.flatMap(([id, x]) => { if (!(x >= 0 && x <= 1)) fail("fraction dans [0, 1]");
      return (MOLECULES_RMN[id] || fail("molécule RMN inconnue : " + id)).map(s => Object.assign({}, s, { id: id + "." + s.id, n: s.n * x })).filter(s => s.n > 0); });

    /* deux spins couplés A et B, Δν = ν_A − ν_B (Hz), J (Hz) : raies autour du centre (ν_A + ν_B)/2. Exact pour deux spins 1/2 :
       D = √(Δν² + J²), raies ±(D ± J)/2, intensités 1 ∓ J/D (les raies intérieures grandissent : effet de toit). */
    function ab(dnu, J) {
      fini(dnu, "Δν"); fini(J, "J"); const D = Math.hypot(dnu, J), s = D === 0 ? 0 : J / D;
      return [{ f: -(D + J) / 2, I: (1 - s) / 2 }, { f: -(D - J) / 2, I: (1 + s) / 2 }, { f: (D - J) / 2, I: (1 + s) / 2 }, { f: (D + J) / 2, I: (1 - s) / 2 }];
    }
    const abPremierOrdre = (dnu, J) => [-1, 1].flatMap(cote => multiplet([{ n: 1, J }]).map(r => ({ f: cote * Math.abs(dnu) / 2 + r.f, I: r.I })));
    function karplus(phi, A, B, C) {
      const p = fini(phi, "φ") * Math.PI / 180, a = A == null ? 12 : A, b = B == null ? -1 : B, c = C == null ? 2 : C;
      return a * Math.cos(p) ** 2 + b * Math.cos(p) + c;
    }
    const karplusMoyen = o => { o = o || {}; const ps = o.angles || [60, 180, 300], w = o.poids || ps.map(() => 1), t = w.reduce((s, x) => s + x, 0);
      return ps.reduce((s, p, i) => s + w[i] * karplus(p, o.A, o.B, o.C), 0) / t; };

    return { photon, DOMAINES, domaine, absorbance, transmittance, beerLambert, bande, mesure, masseReduite, nombreOnde, raideur,
      BANDES_IR, MOLECULES_IR, spectreIR, multiplet, raies, spectreRMN, integrale, MOLECULES_RMN, melange, ab, abPremierOrdre, karplus, karplusMoyen,
      L_MOL_CM: 0.1, MOL_L: 1000 };
  })();

  /* ---------- Étape « Alcènes et alcynes » (chim-alcenes-alcynes) : exporté sous ChimOrga.Alcenes ----------
     addition(m, a, b, X, mode)       X ajouté sur a et b (la liaison a=b devient simple) ; mode "syn" (une face) ou "anti".
                                      Dessin éclipsé : la molécule reste dans le plan, X sort du plan (coin, z = ±1) ; les
                                      descripteurs en découlent. { produit, faces: [{ a: "R", b: "S" }, …], issue } ; issue :
                                      "achiral", "meso" (les deux faces donnent la même molécule), "racemique", "diastereoisomeres".
     cram(gabarit, a, b, face)        dessin de Cram du produit (même numérotation) : coins de a–X et b–X choisis pour la face.
     coupure(m, liaisons, o)          coupe chaque liaison [a, b] (C=C, ou C–C d'un 1,2-diol) en deux C=O ; o.oxydant : un
                                      aldéhyde devient acide. Fragments [molécule] ; ozonolyse(m, o) coupe toutes les C=C.
     memesProduits(l1, l2)            deux listes de fragments égales à l'ordre près (graphes, coins ignorés).
     semi(S, x), alceneMax(S)         hydrogénation successive alcyne → alcène → alcane, vitesses r₁/r₂ = S x/y (sites communs) :
                                      fractions { x, y, z, h } (h : équivalents de H₂ consommés) ; maximum S^(1/(1−S)).
     courbeSemi(S, n), etatH(S, h)    [{ x, y, z, h }] de x = 1 à x = 0 ; l'état après h équivalents de H₂ (0 ≤ h ≤ 2).
     radicalaire(X)                   étapes de propagation de X• + éthène, kJ·mol⁻¹ : { bilan, DHX, DCH, e1, e2 }.
     acideBase(pKaHA, pKaBH)          K de HA + B⁻ ⇌ A⁻ + HB, et la fraction de A⁻ dans un mélange équimolaire.
     HYDROGENATION, PKA, MOLECULES    données citées (kJ·mol⁻¹, phase gazeuse) et molécules de l'étape.
     MECANISMES                       osmylation, periodate, ozonolyse, propagation, acetylure : actes { spec, fleches },
                                      dessinés par ChimOrga.actesMecanisme(id, o). */
  const ALCENES = (() => {
    const fail = m => err("alcènes : " + m);
    const lien = (m, a, b) => m.liaisons.find(l => (l.a === a && l.b === b) || (l.a === b && l.b === a));
    function addition(m, a, b, X, mode) {
      const l = lien(m, a, b);
      if (!l || l.ordre !== 2) fail(`pas de liaison double entre ${a} et ${b}`);
      if (!(X in Z)) fail("élément inconnu : " + X);
      if (mode !== "syn" && mode !== "anti") fail("mode syn ou anti");
      const face = s => {
        const p = copie(m), na = p.atomes.length, nb = na + 1;
        lien(p, a, b).ordre = 1;
        p.atomes.push({ e: X, x: m.atomes[a].x, y: m.atomes[a].y }, { e: X, x: m.atomes[b].x, y: m.atomes[b].y });
        const cote = k => (k > 0 ? "coin" : "hache");
        p.liaisons.push({ a, b: na, ordre: 1, style: cote(s) }, { a: b, b: nb, ordre: 1, style: cote(mode === "syn" ? s : -s) });
        return p;
      };
      const p1 = face(1), p2 = face(-1);
      const d = p => ({ [a]: descripteurRS(p, a), [b]: descripteurRS(p, b) });
      const faces = [d(p1), d(p2)], stereo = faces[0][a] || faces[0][b];
      const r = relationStereo(p1, p2);
      const issue = !stereo ? "achiral" : r === "identiques" ? "meso" : r === "enantiomeres" ? "racemique" : "diastereoisomeres";
      return { produit: p1, produits: [p1, p2], faces, issue };
    }
    function cram(gabarit, a, b, face) {
      const g = typeof gabarit === "string" ? mol(gabarit) : copie(gabarit);
      const la = g.liaisons.find(l => l.a === a && l.style), lb = g.liaisons.find(l => l.a === b && l.style);
      if (!la || !lb) fail("le gabarit doit porter un coin partant de chaque carbone");
      for (const sa of ["coin", "hache"]) for (const sb of ["coin", "hache"]) {
        la.style = sa; lb.style = sb;
        if (descripteurRS(g, a) === face[a] && descripteurRS(g, b) === face[b]) return copie(g);
      }
      return fail("aucun dessin du gabarit ne porte ces descripteurs");
    }
    function composantes(m) {
      const vu = new Array(m.atomes.length).fill(false), out = [];
      m.atomes.forEach((_, s) => {
        if (vu[s]) return;
        const pile = [s], ids = []; vu[s] = true;
        while (pile.length) { const i = pile.pop(); ids.push(i); voisins(m, i).forEach(v => { if (!vu[v.j]) { vu[v.j] = true; pile.push(v.j); } }); }
        ids.sort((p, q) => p - q);
        const nv = new Map(ids.map((i, k) => [i, k]));
        out.push({ atomes: ids.map(i => Object.assign({}, m.atomes[i])), liaisons: m.liaisons.filter(l => nv.has(l.a)).map(l => Object.assign({}, l, { a: nv.get(l.a), b: nv.get(l.b) })) });
      });
      return out;
    }
    function coupure(m, liaisons, o) {
      o = o || {};
      const r = copie(m), bouts = [];
      liaisons.forEach(([a, b]) => {
        const l = lien(r, a, b);
        if (!l || r.atomes[a].e !== "C" || r.atomes[b].e !== "C") fail(`pas de liaison C–C entre ${a} et ${b}`);
        const diol = [a, b].map(c => voisins(r, c).find(v => r.atomes[v.j].e === "O" && v.ordre === 1 && hydrogenes(r, v.j) === 1));
        if (l.ordre === 2) diol.forEach(x => { if (x) fail("liaison double et diol à la fois"); });
        else if (l.ordre !== 1 || !diol[0] || !diol[1]) fail(`ni C=C ni 1,2-diol entre ${a} et ${b}`);
        r.liaisons.splice(r.liaisons.indexOf(l), 1);
        [[a, b, diol[0]], [b, a, diol[1]]].forEach(([c, d, x]) => {
          if (x) { x.l.ordre = 2; x.l.style = null; }
          else bouts.push([c, d]);
        });
      });
      /* un O posé à l'opposé des voisins de c ; s'il tombe sur un atome du même fragment (cycle ouvert), on le tourne de 60° */
      const relie = c => { const vu = new Set([c]), f = [c]; while (f.length) voisins(r, f.pop()).forEach(v => { if (!vu.has(v.j)) { vu.add(v.j); f.push(v.j); } }); return vu; };
      const poser = (c, ordre, d) => {
        const at = r.atomes[c], s = voisins(r, c).reduce((t, v) => { const q = r.atomes[v.j], n = Math.hypot(q.x - at.x, q.y - at.y) || 1;
          return [t[0] - (q.x - at.x) / n, t[1] - (q.y - at.y) / n]; }, [0, 0]);
        let u = Math.hypot(s[0], s[1]) > 1e-6 ? s : d !== undefined ? [r.atomes[d].x - at.x, r.atomes[d].y - at.y] : [0, 1];
        const n = Math.hypot(u[0], u[1]); u = [u[0] / n, u[1] / n];
        const proches = [...relie(c)].filter(i => i !== c).map(i => r.atomes[i]);
        const pos = [0, 60, -60, 120, -120, 180].map(g => { const k = g * Math.PI / 180, cs = Math.cos(k), sn = Math.sin(k);
          return [at.x + cs * u[0] - sn * u[1], at.y + sn * u[0] + cs * u[1]]; }).find(p => proches.every(q => Math.hypot(q.x - p[0], q.y - p[1]) > 0.6));
        const p = pos || [at.x + u[0], at.y + u[1]];
        r.atomes.push({ e: "O", x: p[0], y: p[1] });
        r.liaisons.push({ a: c, b: r.atomes.length - 1, ordre, style: null });
      };
      bouts.forEach(([c, d]) => poser(c, 2, d));
      if (o.oxydant) new Set(liaisons.flat()).forEach(c => { if (hydrogenes(r, c) >= 1) poser(c, 1); });   // aldéhyde formé → acide ; une cétone reste
      return composantes(r);
    }
    const doublesCC = m => m.liaisons.filter(l => l.ordre === 2 && m.atomes[l.a].e === "C" && m.atomes[l.b].e === "C").map(l => [l.a, l.b]);
    const ozonolyse = (m, o) => coupure(m, doublesCC(m), o);
    function memesProduits(l1, l2) {
      if (l1.length !== l2.length) return false;
      const pris = new Array(l2.length).fill(false);
      return l1.every(p => { const k = l2.findIndex((q, j) => !pris[j] && correspondances(p, q, 1).length); if (k < 0) return false; pris[k] = true; return true; });
    }
    /* hydrogénation successive : dy/dx = −1 + y/(S x), y(1) = 0 ; S = 1 : y = −x ln x */
    /* paramètre u = x^(1/S) : l'alcène ne disparaît que pour x ~ e^(−S), hors d'atteinte d'un pas en x */
    function parU(S, u) {
      const x = Math.pow(u, S), y = u === 0 ? 0 : Math.abs(S - 1) < 1e-9 ? -u * Math.log(u) : S / (S - 1) * (u - x);
      const z = Math.max(0, 1 - x - y);
      return { x, y, z, h: (1 - x) + z };
    }
    const verifS = S => { if (!(S > 0) || !isFinite(S)) fail("S doit être un nombre > 0"); };
    function semi(S, x) {
      verifS(S);
      if (!(x >= 0 && x <= 1)) fail("x doit être entre 0 et 1");
      return Object.assign(parU(S, Math.pow(x, 1 / S)), { x });
    }
    const alceneMax = S => Math.abs(S - 1) < 1e-9 ? Math.exp(-1) : Math.pow(S, 1 / (1 - S));
    function etatH(S, h) {                                        // l'état quand h équivalents de H₂ ont été consommés
      verifS(S);
      if (!(h >= 0 && h <= 2)) fail("h doit être entre 0 et 2");
      let lo = 0, hi = 1;
      for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (parU(S, m).h > h) lo = m; else hi = m; }
      return parU(S, (lo + hi) / 2);
    }
    function courbeSemi(S, n) {
      verifS(S);
      n = n || 200;
      const out = [];
      for (let k = 0; k <= n; k++) out.push(parU(S, 1 - k / n));
      return out;
    }
    /* enthalpies de formation à 298,15 K, kJ·mol⁻¹ : clés CODATA (H, X, HX) ; NIST (éthène, iodoéthane) */
    const DF = { H: 217.998, Cl: 121.301, Br: 111.87, I: 106.76, HCl: -92.31, HBr: -36.29, HI: 26.50, ethene: 52.47, iodoethane: -7.2 };
    const BILAN_ETHENE = { Cl: -72, Br: -80.3, I: DF.iodoethane - DF.ethene - DF.HI };   // C₂H₄ + HX → C₂H₅X, gaz (NIST)
    const D_C2H5_H = 423.0;                                       // C₂H₅–H, Blanksby et Ellison (2003)
    function radicalaire(X) {
      if (!(X in BILAN_ETHENE)) fail("halogène Cl, Br ou I");
      const DHX = DF.H + DF[X] - DF["H" + X], e2 = DHX - D_C2H5_H, bilan = BILAN_ETHENE[X];
      return { X, bilan, DHX, DCH: D_C2H5_H, e1: bilan - e2, e2 };
    }
    function acideBase(pKaHA, pKaBH) {
      const K = Math.pow(10, pKaBH - pKaHA), r = Math.sqrt(K);
      return { K, fraction: r / (1 + r) };
    }
    /* enthalpies d'hydrogénation, kJ·mol⁻¹, phase gazeuse, 355 K (Kistiakowsky et coll., 1935 et 1939, revues par Cox et
       Pilcher, 1970 ; NIST) ; jusqu'au butane pour les C₄, jusqu'à l'éthane pour les C₂ */
    const HYDROGENATION = { but1ene: -125.9, but2eneZ: -118.5, but2eneE: -114.6, but2yne: -272.4, ethene: -136.3, ethyne: -312.0 };
    const PKA = { ethyne: 25, eau: 14, ammoniac: 32.5, methane: 56 };
    const MOLECULES = {
      /* dihydroxylation : alcènes (C=C en 1=2 ou 0=1) et gabarits de Cram des diols, même numérotation (X en fin) */
      but2eneZ: "C -0.5 -0.866; C 0 0; C 1 0; C 1.5 -0.866 | 0-1 1=2 2-3",
      but2eneE: "C -0.5 -0.866; C 0 0; C 1 0; C 1.5 0.866 | 0-1 1=2 2-3",
      pent2eneZ: "C -0.5 -0.866; C 0 0; C 1 0; C 1.5 -0.866; C 2.5 -0.866 | 0-1 1=2 2-3 3-4",
      cyclohexene: "C -0.5 0.866; C 0.5 0.866; C 1 0; C 0.5 -0.866; C -0.5 -0.866; C -1 0 | 0=1 1-2 2-3 3-4 4-5 5-0",
      diolButane: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; O 0 1; O 0.866 -1.5 | 0-1 1-2 2-3 1w4 2w5",
      diolPentane: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; C 2.598 -0.5; O 0 1; O 0.866 -1.5 | 0-1 1-2 2-3 3-4 1w5 2w6",
      diolCyclohexane: "C -0.5 0.866; C 0.5 0.866; C 1 0; C 0.5 -0.866; C -0.5 -0.866; C -1 0; O -1 1.732; O 1 1.732 | 0-1 1-2 2-3 3-4 4-5 5-0 0w6 1w7",
      /* ozonolyse */
      methylbut2ene: "C -0.5 0.866; C 0 0; C 1 0; C 1.5 0.866; C -0.5 -0.866 | 0-1 1=2 2-3 1-4",
      hex3eneE: "C -1.5 -0.866; C -0.5 -0.866; C 0 0; C 1 0; C 1.5 0.866; C 2.5 0.866 | 0-1 1-2 2=3 3-4 4-5",
      hex3eneZ: "C -1.5 -0.866; C -0.5 -0.866; C 0 0; C 1 0; C 1.5 -0.866; C 2.5 -0.866 | 0-1 1-2 2=3 3-4 4-5",
      but1ene: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5 | 0=1 1-2 2-3",
      methylcyclohexene: "C -0.5 0.866; C 0.5 0.866; C 1 0; C 0.5 -0.866; C -0.5 -0.866; C -1 0; C -1 1.732 | 0=1 1-2 2-3 3-4 4-5 5-0 0-6",
      limonene: "C -0.5 0.866; C 0.5 0.866; C 1 0; C 0.5 -0.866; C -0.5 -0.866; C -1 0; C -2 0; C 2 0; C 2.5 0.866; C 2.5 -0.866 | 0-1 1-2 2-3 3-4 4-5 5=0 5-6 2-7 7=8 7-9",
      /* hydrogénation partielle */
      but2yne: "C 0 0; C 1 0; C 2 0; C 3 0 | 0-1 1#2 2-3",
    };
    const molecule = id => MOLECULES[id] ? mol(MOLECULES[id]) : fail("molécule inconnue : " + id);
    /* Mécanismes limites de l'étape, même forme que MECANISMES_CONVERSION (dessinés par actesMecanisme) : { spec, fleches }.
       Chaque acte garde les indices du précédent ; un réactif ajouté prend les indices suivants ; doublets : ceux que l'acte
       dessine (les atomes qui agissent). Exacte : un décompte
       d'électrons (appliquer) ; les dessins sont schématiques, les distances des réactifs qui s'approchent aussi. */
    const MECANISMES = {
      osmylation: [                                                 // éthène + OsO₄ → ester osmique cyclique, en un acte
        { spec: "C 0 0; C 1 0; O 0 1.4; O 1 1.4; Os 0.5 2.3; O -0.5 2.9; O 1.5 2.9 | 0=1 2=4 3=4 4=5 4=6",
          fleches: [{ de: [0, 1], vers: [1, 3] }, { de: [3, 4], vers: 4 }, { de: [2, 4], vers: [2, 0] }] },
      ],
      periodate: [                                                  // ester cyclique du butane-2,3-diol → 2 éthanal + IO₃⁻
        { spec: "C 0 0; C 1 0; C -0.866 -0.5; C 1.866 -0.5; O -0.309 0.951; O 1.309 0.951; I 0.5 1.6; O 0.5 2.75; O -0.5 2.5; O 1.5 2.5 q-1 | 0-1 0-2 1-3 0-4 1-5 4-6 5-6 6=7 6=8 6-9",
          fleches: [{ de: [4, 6], vers: 6 }, { de: [0, 1], vers: [0, 4] }, { de: [5, 6], vers: [5, 1] }] },
      ],
      ozonolyse: [                                                  // but-2-ène + O₃ : ozonide primaire, rupture, ozonide secondaire
        { spec: "C 0 0; C 1 0; C -0.866 -0.5; C 1.866 -0.5; O -0.4 1.3; O 0.5 1.8 q+1; O 1.4 1.3 q-1 | 0=1 0-2 1-3 4=5 5-6", doublets: [6],
          fleches: [{ de: 6, vers: [6, 1] }, { de: [0, 1], vers: [0, 4] }, { de: [4, 5], vers: 5 }] },
        { spec: "C 0 0; C 1 0; C -0.866 -0.5; C 1.866 -0.5; O -0.309 0.951; O 0.5 1.539; O 1.309 0.951 | 0-1 0-2 1-3 0-4 4-5 5-6 6-1",
          doublets: [4], fleches: [{ de: [0, 1], vers: [1, 6] }, { de: [5, 6], vers: 5 }, { de: 4, vers: [4, 0] }] },
        { spec: "C 0 0; C 1.9 0.9; C -0.866 -0.5; C 2.8 1.4; O -0.3 1 q+1; O 0.5 1.6 q-1; O 1.5 -0.2 | 0-2 0=4 4-5 1-3 1=6",
          doublets: [5], fleches: [{ de: 5, vers: [5, 1] }, { de: [1, 6], vers: [6, 0] }, { de: [0, 4], vers: 4 }] },
      ],
      propagation: [                                                // Br• + propène, puis le radical secondaire + HBr (demi-flèches)
        { spec: "C 1.732 0; C 0.866 0.5; C 0 0; Br 2.2 1.9 h0 | 0=1 1-2",
          fleches: [{ de: 3, vers: [3, 0], demi: true, cote: -1 }, { de: [0, 1], vers: [0, 3], demi: true, cote: 1 }, { de: [0, 1], vers: 1, demi: true, cote: -1 }] },
        { spec: "C 1.732 0; C 0.866 0.5 h1; C 0 0; Br 2.598 0.5; H 0.866 2.2; Br 2.3 2.2 | 0-1 1-2 0-3 4-5",
          fleches: [{ de: 1, vers: [1, 4], demi: true, cote: 1 }, { de: [4, 5], vers: [1, 4], demi: true, cote: -1 }, { de: [4, 5], vers: 5, demi: true, cote: 1 }] },
      ],
      acetylure: [                                                  // HC≡C⁻ + bromoéthane → but-1-yne + Br⁻ (SN2)
        { spec: "C -2.1 0; C -1.1 0 q-1 h0; C 0.3 0; C 0.3 1; Br 1.5 0 | 0#1 2-3 2-4", fleches: [{ de: 1, vers: 2 }, { de: [2, 4], vers: 4 }] },
      ],
    };
    return { addition, cram, coupure, ozonolyse, composantes, memesProduits, semi, alceneMax, courbeSemi, etatH, radicalaire, acideBase,
      HYDROGENATION, PKA, DF, BILAN_ETHENE, D_C2H5_H, MOLECULES, molecule, MECANISMES };
  })();

  const api = { Z, mol, molecule, MOLECULES, hydrogenes, formuleBrute, ecrireFormule, insaturations, masseMolaire, correspondances, groupes,
    squelette, relationConstitution, comparer, priorites, centres, descripteurRS, doublesStereogenes, descripteurZE, descripteurs, relationStereo,
    inverser, miroir, dessin, newman, torsion, ajusterTorsion, fractions, eyring, tetraedre, miroir3D, superposer, DEG_DM_G_ML, biot, pouvoirMelange };
  api.Spectro = SPECTRO;                                          // étape « Spectroscopies » : sa section, plus haut
  api.Alcenes = ALCENES;                                          // étape « Alcènes et alcynes » : sa section, plus haut
  /* ---------- étape « Compléments de synthèse » (chim-complements-synthese) ---------- */
  (() => {
    Object.assign(MASSE, { Li: 6.94, Al: 26.982 });             // g·mol⁻¹, IUPAC : pour LiAlH₄, jamais dessinés
    Object.assign(MOLECULES, {
      /* Wittig : cibles et mécanisme (P : h0, son groupe « PPh₃ » est écrit par etiquettes) */
      methylenecyclohexane: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; C 0 2 | 0-1 1-2 2-3 3-4 4-5 5-0 0=6",
      pent2eneZ: "C -0.5 -0.866; C 0 0; C 1 0; C 1.5 -0.866; C 2.5 -0.866 | 0-1 1=2 2-3 3-4",
      pent2eneE: "C -0.5 0.866; C 0 0; C 1 0; C 1.5 -0.866; C 2.5 -0.866 | 0-1 1=2 2-3 3-4",
      cinnamateEthyleE: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; C 1.732 1; C 2.598 0.5; C 3.464 1; O 3.464 2; O 4.33 0.5; C 5.196 1; C 6.062 0.5 | 0=1 1-2 2=3 3-4 4=5 5-0 1-6 6=7 7-8 8=9 8-10 10-11 11-12",
      acetone: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; O 0 1 | 0-1 1-2 1=3",
      ylureMethylene: "C 0 0; P 1 0 h0 | 0=1",
      oxaphosphetane: "C 0 0; C 1 0; P 1 -1 h0; O 0 -1; C -0.71 0.71; C -0.97 -0.26 | 0-1 1-2 2-3 3-0 0-4 0-5",
      methylpropene: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 0 1 | 0-1 1-2 1=3",
      oxydePhosphine: "P 0 0 h0; O 1 0 | 0=1",
      /* synthèse malonique : le malonate et des acides cibles */
      malonateEthyle: "C 0 0; C -0.866 0.5; O -0.866 1.5; O -1.732 0; C -2.598 0.5; C -3.464 0; C 0.866 0.5; O 0.866 1.5; O 1.732 0; C 2.598 0.5; C 3.464 0 | 0-1 1=2 1-3 3-4 4-5 0-6 6=7 6-8 8-9 9-10",
      acideHexanoique: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; C 3.464 0; C 4.33 0.5; O 4.33 1.5; O 5.196 0 | 0-1 1-2 2-3 3-4 4-5 5=6 5-7",
      acideMethylbutanoique: "C 0 0; C 0.866 0.5; C 1.732 0; C 1.732 -1; C 2.598 0.5; O 2.598 1.5; O 3.464 0 | 0-1 1-2 2-3 2-4 4=5 4-6",
      acideMethylbutanoique3: "C 0 0; C 0.866 0.5; C 0.866 1.5; C 1.732 0; C 2.598 0.5; O 2.598 1.5; O 3.464 0 | 0-1 1-2 1-3 3-4 4=5 4-6",
      acidePhenylpropanoique: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; C 1.732 1; C 2.598 0.5; C 3.464 1; O 3.464 2; O 4.33 0.5 | 0=1 1-2 2=3 3-4 4=5 5-0 1-6 6-7 7-8 8=9 8-10",
      acideCyclopentanecarboxylique: "C 0.851 0; C 0.263 0.809; C -0.688 0.5; C -0.688 -0.5; C 0.263 -0.809; C 1.851 0; O 2.351 0.866; O 2.351 -0.866 | 0-1 1-2 2-3 3-4 4-0 0-5 5=6 5-7",
      acideDimethylpropanoique: "C 0 0; C 1 0; C 0 1; C 0 -1; C -1 0; O 1.5 0.866; O 1.5 -0.866 | 0-1 0-2 0-3 0-4 1=5 1-6",
      /* additions conjuguées */
      propenal: "O 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5 | 0=1 1-2 2=3",
      cyclohexenone: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O 0 2 | 0-1 1=2 2-3 3-4 4-5 5-0 0=6",
      methylcyclohexenol: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O -0.5 1.866; C 0.5 1.866 | 0-1 1=2 2-3 3-4 4-5 5-0 0-6 0-7",
      methylcyclohexanone: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O 0 2; C 1.732 -1 | 0-1 1-2 2-3 3-4 4-5 5-0 0=6 2-7",
      /* réductions et hydrolyses */
      butanoateEthyle: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 2.598 1.5; O 3.464 0; C 4.33 0.5; C 5.196 0 | 0-1 1-2 2-3 3=4 3-5 5-6 6-7",
      acideButanoique: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 2.598 1.5; O 3.464 0 | 0-1 1-2 2-3 3=4 3-5",
      butanamide: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 2.598 1.5; N 3.464 0 | 0-1 1-2 2-3 3=4 3-5",
      dimethylbutanamide: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; O 2.598 1.5; N 3.464 0; C 4.33 0.5; C 3.464 -1 | 0-1 1-2 2-3 3=4 3-5 5-6 5-7",
      butanenitrile: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; N 3.464 1 | 0-1 1-2 2-3 3#4",
      butanamine: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; N 3.464 0 | 0-1 1-2 2-3 3-4",
      dimethylbutanamine: "C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; N 3.464 0; C 4.33 0.5; C 3.464 -1 | 0-1 1-2 2-3 3-4 4-5 4-6",
      ethanol: "C 0 0; C 0.866 0.5; O 1.732 0 | 0-1 1-2",
      dimethylamine: "C 0 0; N 0.866 0.5; C 1.732 0 | 0-1 1-2",
      ammoniac: "N 0 0",
      eau: "O 0 0",
    });

    const sommeFormules = (...fs) => fs.reduce((s, f) => { Object.entries(f).forEach(([e, n]) => { s[e] = (s[e] || 0) + n; if (!s[e]) delete s[e]; }); return s; }, {});
    /* Économie d'atomes : fraction de la masse des réactifs qui finit dans la cible. Exacte (définition, bilan de matière). */
    const economieAtomes = (fCible, fReactifs) => masseMolaire(fCible) / fReactifs.reduce((s, f) => s + masseMolaire(f), 0);
    const PPH3 = { C: 18, H: 15, P: 1 }, PH3PO = { C: 18, H: 15, O: 1, P: 1 };

    /* Atomes atteints depuis depart sans franchir une liaison i–j pour laquelle coupe(i, j) est vraie. */
    function composante(m, depart, coupe) {
      const vu = new Set([depart]), pile = [depart];
      while (pile.length) { const i = pile.pop(); voisins(m, i).forEach(v => { if (!coupe(i, v.j) && !vu.has(v.j)) { vu.add(v.j); pile.push(v.j); } }); }
      return vu;
    }
    /* Sous-molécule des atomes S (ordre conservé), plus des atomes ajoutés { e, x, y, h?, lie (indice d'origine), ordre }. */
    function extraire(m, S, ajouts) {
      const idx = [...S].sort((x, y) => x - y), nv = new Map(idx.map((i, k) => [i, k]));
      const atomes = idx.map(i => Object.assign({}, m.atomes[i]));
      const liaisons = m.liaisons.filter(l => nv.has(l.a) && nv.has(l.b)).map(l => ({ a: nv.get(l.a), b: nv.get(l.b), ordre: l.ordre, style: l.style }));
      const nouveaux = ajouts.map(x => {
        const k = atomes.length, at = { e: x.e, x: x.x, y: x.y }; if (x.h !== undefined) at.h = x.h;
        atomes.push(at); liaisons.push({ a: nv.get(x.lie), b: k, ordre: x.ordre, style: null }); return k; });
      return { m: { atomes, liaisons }, nv, nouveaux };
    }
    /* Carbone i : methyle (aucun C voisin), primaire, secondaire, tertiaire (C voisins), vinylique s'il porte une liaison multiple. */
    function classeCarbone(m, i) {
      const vs = voisins(m, i);
      if (vs.some(v => v.ordre > 1)) return "vinylique";
      return ["methyle", "primaire", "secondaire", "tertiaire", "tertiaire"][vs.filter(v => m.atomes[v.j].e === "C").length];
    }
    /* Ylure : le carbanion c (lié au phosphore p) est stabilisé si un voisin porte C=O, C=N ou C≡N (conjugaison avec un groupe
       attracteur), semi-stabilisé si un voisin porte C=C (aryle, vinyle), non stabilisé sinon (alkyle, H). */
    function typeYlure(m, c, p) {
      const vs = voisins(m, c).filter(v => v.j !== p).map(v => v.j);
      const multiple = (j, els) => m.atomes[j].e === "C" && voisins(m, j).some(w => w.j !== c && w.ordre >= 2 && els.includes(m.atomes[w.j].e));
      if (vs.some(j => multiple(j, ["O", "N"]))) return "stabilise";
      if (vs.some(j => multiple(j, ["C"]))) return "semi";
      return "non";
    }
    /* Rétrosynthèse de Wittig de l'alcène a=b (liaison C=C hors cycle) : a devient le carbone du carbonyle, b celui de l'ylure
       Ph₃P=Cb, issu du sel de phosphonium de l'halogénure Br–Cb (SN2 de PPh₃). majoritaire : tendance d'un ylure sans sel de
       lithium (non → Z, semi → mélange, stabilise → E), null si la double liaison n'est pas stéréogène. */
    function deconnecterWittig(m, a, b) {
      const l = m.liaisons.find(x => (x.a === a && x.b === b) || (x.a === b && x.b === a));
      if (!l || l.ordre !== 2 || m.atomes[a].e !== "C" || m.atomes[b].e !== "C") err("deconnecterWittig : a=b doit être une liaison C=C");
      const coupe = (i, j) => (i === a && j === b) || (i === b && j === a);
      const A = composante(m, a, coupe);
      if (A.has(b)) err("deconnecterWittig : la double liaison est dans un cycle");
      const B = composante(m, b, coupe), pa = m.atomes[a], pb = m.atomes[b];
      const c = extraire(m, A, [{ e: "O", x: pb.x, y: pb.y, lie: a, ordre: 2 }]);
      const y = extraire(m, B, [{ e: "P", x: pa.x, y: pa.y, h: 0, lie: b, ordre: 2 }]);
      const x = extraire(m, B, [{ e: "Br", x: pa.x, y: pa.y, lie: b, ordre: 1 }]);
      const stereo = doublesStereogenes(m).some(([u, v]) => coupe(u, v)), type = typeYlure(y.m, y.nv.get(b), y.nouveaux[0]);
      return { carbonyle: c.m, ylure: y.m, phosphore: y.nouveaux[0], halogenure: x.m, classe: classeCarbone(x.m, x.nv.get(b)), type,
        majoritaire: stereo ? { non: "Z", semi: "melange", stabilise: "E" }[type] : null, cible: stereo ? descripteurZE(m, a, b) : null,
        economie: economieAtomes(formuleBrute(m), [formuleBrute(c.m), sommeFormules(formuleBrute(y.m), { C: 18, H: 15 })]) };
    }
    /* Les deux voies de chaque liaison C=C hors cycle. */
    function voiesWittig(m) {
      const v = [];
      m.liaisons.forEach(l => {
        if (l.ordre !== 2 || m.atomes[l.a].e !== "C" || m.atomes[l.b].e !== "C") return;
        if (composante(m, l.a, (i, j) => (i === l.a && j === l.b) || (i === l.b && j === l.a)).has(l.b)) return;
        v.push(Object.assign({ a: l.a, b: l.b }, deconnecterWittig(m, l.a, l.b)), Object.assign({ a: l.b, b: l.a }, deconnecterWittig(m, l.b, l.a)));
      });
      return v;
    }

    /* Synthèse malonique, à rebours : l'acide R(R')CH–COOH vient du malonate alkylé par R–Br puis R'–Br, hydrolysé et décarboxylé.
       Le carbone α garde au moins un H (celui que rend la décarboxylation) : trois substituants carbonés, impossible.
       Deux substituants du même fragment (cycle) : un seul dibromure, deux alkylations (synthèse de Perkin). Un halogénure
       tertiaire ou vinylique (aryle) ne fait pas de SN2 : impossible. */
    function carboxyle(m) {
      for (let c = 0; c < m.atomes.length; c++) {
        if (m.atomes[c].e !== "C") continue;
        const vs = voisins(m, c), dO = vs.some(v => v.ordre === 2 && m.atomes[v.j].e === "O");
        const sO = vs.some(v => v.ordre === 1 && m.atomes[v.j].e === "O" && hydrogenes(m, v.j) === 1), al = vs.filter(v => m.atomes[v.j].e === "C");
        if (dO && sO && al.length === 1) return { c, alpha: al[0].j };
      }
      return null;
    }
    function deconnecterMalonique(m) {
      const k = carboxyle(m);
      if (!k) err("deconnecterMalonique : pas de groupe R–COOH");
      const { c, alpha } = k, R = voisins(m, alpha).filter(v => v.j !== c);
      if (R.some(v => v.ordre !== 1 || m.atomes[v.j].e !== "C")) return { possible: false, raison: "alpha", c, alpha, alkylations: 0, halogenures: [] };
      if (R.length > 2) return { possible: false, raison: "quaternaire", c, alpha, alkylations: R.length, halogenures: [] };
      const vus = [], halogenures = [];
      R.forEach(v => {
        if (vus.some(S => S.has(v.j))) return;
        const S = composante(m, v.j, (i, j) => i === alpha || j === alpha), bouts = R.filter(w => S.has(w.j)).map(w => w.j);
        vus.push(S);
        const pos = bouts.map(j => {
          const p = m.atomes[j], o = bouts.length === 2 ? m.atomes[bouts.find(i => i !== j)] : m.atomes[alpha];
          if (bouts.length === 1) return { x: o.x, y: o.y };
          const dx = p.x - o.x, dy = p.y - o.y, n = Math.hypot(dx, dy) || 1;   // cycle : chaque Br s'écarte de l'autre bout
          return { x: p.x + dx / n, y: p.y + dy / n };
        });
        const x = extraire(m, S, bouts.map((j, n) => ({ e: "Br", x: pos[n].x, y: pos[n].y, lie: j, ordre: 1 })));
        halogenures.push({ m: x.m, classes: bouts.map(j => classeCarbone(x.m, x.nv.get(j))) });
      });
      const mauvais = halogenures.flatMap(h => h.classes).find(cl => cl === "tertiaire" || cl === "vinylique");
      return { possible: !mauvais, raison: mauvais || null, c, alpha, alkylations: R.length, cycle: vus.length < R.length, halogenures };
    }

    /* pKa dans l'eau à 298 K (Reusch, Virtual Textbook of Organic Chemistry, table des acides carbonés et des alcools). */
    const PKA = { acetoacetate: 11.0, malonate: 13.5, ester: 25, ethanol: 16, tbutanol: 19, diisopropylamine: 35.7 };
    /* AH + B⁻ ⇌ A⁻ + BH, K = 10^(pKa(BH) − pKa(AH)), 1 mol de AH et eq mol de B⁻, BH formé par la réaction seule :
       x²/((1 − x)(eq − x)) = K, racine stable de (1 − K)x² + K(1 + eq)x − K eq = 0. Modèle : activités = quantités relatives. */
    function fractionDeprotonee(pKaAH, pKaBH, eq) {
      eq = eq === undefined ? 1 : eq;
      if (!(eq > 0) || !isFinite(pKaAH) || !isFinite(pKaBH)) err("fractionDeprotonee : pKa finis, eq > 0");
      const K = Math.pow(10, pKaBH - pKaAH), a = 1 - K, b = K * (1 + eq), c = -K * eq;
      if (Math.abs(a) < 1e-12) return eq / (1 + eq);
      const D = Math.max(0, b * b - 4 * a * c);
      return (2 * -c) / (b + Math.sqrt(D));
    }

    /* Hückel simple : αᵢ = α + hᵢβ, βᵢⱼ = kᵢⱼβ, recouvrement négligé ; E = α + xβ, β < 0, donc x décroissant = énergie croissante.
       electrons[r] : électrons π apportés par l'atome r. Charges π qᵣ = electrons[r] − Σ nⱼ cⱼᵣ². */
    const FICHIER_QD = "./quantique-deux-etats.js";               // lu à la demande : seules les pages de huckel le chargent
    const QD = () => (typeof module !== "undefined" && module.exports ? require(FICHIER_QD) : root.QuantDeux) || err("QuantDeux absent : charger /quantique-deux-etats.js");
    function huckel(h, liaisons, electrons) {
      const n = h.length;
      if (!n || electrons.length !== n) err("huckel : un h et un nombre d'électrons par atome");
      const M = h.map((hi, i) => h.map((_, j) => (i === j ? hi : 0)));
      liaisons.forEach(([i, j, k]) => { M[i][j] = M[j][i] = k; });
      const { valeurs, vecteurs } = QD().propresSymetrique(M);
      const orbitales = valeurs.map((x, k) => ({ x, c: vecteurs[k] })).reverse();
      let reste = electrons.reduce((s, e) => s + e, 0);
      if (reste > 2 * n) err("huckel : trop d'électrons");
      orbitales.forEach(o => { o.n = Math.min(2, reste); reste -= o.n; });
      const HO = orbitales.map(o => o.n > 0).lastIndexOf(true);
      return { orbitales, HO, BV: HO + 1 < n ? HO + 1 : null, charges: electrons.map((e, r) => e - orbitales.reduce((s, o) => s + o.n * o.c[r] ** 2, 0)) };
    }
    /* Propénal O=C1–C2=C3, atomes 0 (O), 1, 2, 3 : hétéroatome O d'un carbonyle, un électron π par atome. */
    const huckelEnone = (hO, kCO) => huckel([hO === undefined ? 1 : hO, 0, 0, 0], [[0, 1, kCO === undefined ? 1 : kCO], [1, 2, 1], [2, 3, 1]], [1, 1, 1, 1]);

    /* Ions hydrure consommés par molécule : 1 par C=O d'aldéhyde ou de cétone, 2 par C=O lié à O ou N (ester, acide, amide) et
       par C≡N ; plus 1 par H porté par O ou N, arraché sous forme de H₂. Groupes à un seul carbone fonctionnel. */
    function hydruresConsommes(m) {
      let carbone = 0, mobiles = 0;
      m.atomes.forEach((at, i) => {
        if (at.e === "O" || at.e === "N") mobiles += hydrogenes(m, i) + voisins(m, i).filter(v => m.atomes[v.j].e === "H").length;
        if (at.e !== "C") return;
        const vs = voisins(m, i), el = v => m.atomes[v.j].e;
        if (vs.some(v => v.ordre === 3 && el(v) === "N")) carbone += 2;
        else if (vs.some(v => v.ordre === 2 && el(v) === "O")) carbone += vs.some(v => v.ordre === 1 && (el(v) === "O" || el(v) === "N")) ? 2 : 1;
      });
      return { carbone, mobiles, total: carbone + mobiles };
    }
    /* Nombre d'oxydation formel d'un carbone : +1 par liaison vers un atome plus électronégatif (N, O, S, halogène), −1 par H ou
       par liaison vers un atome moins électronégatif (P, Si), 0 vers C. Exacte : c'est une convention de comptage. */
    const ATTRACTEURS = new Set(["N", "O", "S", "F", "Cl", "Br", "I"]);
    function nombreOxydation(m, i) {
      if (m.atomes[i].e !== "C") err("nombreOxydation : un carbone attendu");
      return voisins(m, i).reduce((s, v) => { const e = m.atomes[v.j].e; return s + (e === "C" ? 0 : e === "H" ? -1 : ATTRACTEURS.has(e) ? v.ordre : -v.ordre); }, 0) - hydrogenes(m, i);
    }
    const carboneFonctionnel = m => m.atomes.reduce((best, at, i) => at.e === "C" && (best < 0 || nombreOxydation(m, i) > nombreOxydation(m, best)) ? i : best, -1);
    /* Produits (après hydrolyse du milieu, amines neutres) ; null : pas de réaction dans les conditions usuelles. */
    const TRANSFORMATIONS = {
      butanoateEthyle: { LiAlH4: ["butan1ol", "ethanol"], NaBH4: null, hydrolyse: ["acideButanoique", "ethanol"] },
      acideButanoique: { LiAlH4: ["butan1ol", "eau"], NaBH4: null, hydrolyse: null },
      butanamide: { LiAlH4: ["butanamine", "eau"], NaBH4: null, hydrolyse: ["acideButanoique", "ammoniac"] },
      dimethylbutanamide: { LiAlH4: ["dimethylbutanamine", "eau"], NaBH4: null, hydrolyse: ["acideButanoique", "dimethylamine"] },
      butanenitrile: { LiAlH4: ["butanamine"], NaBH4: null, hydrolyse: ["acideButanoique", "ammoniac"] },
      butanone: { LiAlH4: ["butan2ol"], NaBH4: ["butan2ol"], hydrolyse: null },
    };
    const LIALH4 = { Li: 1, Al: 1, H: 4 };
    /* Masse (kg) de LiAlH₄ pour réduire mSub (kg) de masse molaire M (kg·mol⁻¹), nH hydrures par molécule, 4 par LiAlH₄. */
    const masseLiAlH4 = (mSub, M, nH, exces) => mSub / M * nH / 4 * (1 + (exces || 0)) * masseMolaire(LIALH4);
    /* Trempe de n mol de LiAlH₄ restant : LiAlH₄ + 4 H₂O → LiOH + Al(OH)₃ + 4 H₂ ; volume de gaz parfait à T, p. */
    function dihydrogeneTrempe(n, T, p) {
      T = T || 293.15; p = p || K().atm;
      const R = K().R;
      return { n: 4 * n, V: 4 * n * R * T / p };
    }

    Object.assign(api, { sommeFormules, economieAtomes, PPH3, PH3PO, classeCarbone, typeYlure, deconnecterWittig, voiesWittig,
      deconnecterMalonique, PKA, fractionDeprotonee, huckel, huckelEnone, hydruresConsommes, nombreOxydation, carboneFonctionnel,
      TRANSFORMATIONS, LIALH4, masseLiAlH4, dihydrogeneTrempe });
  })();
  /* ---------- Étape « Conversion de groupes caractéristiques » (chim-conversion-groupes) ---------- */
  /* familles(m) : les dix-huit familles fonctionnelles du programme de PC, avec les atomes qui les portent. Un 1,2-diol compte
     aussi ses deux alcools ; un O d'hémiacétal ou d'acétal n'est ni alcool ni éther ; un alcool est porté par un carbone tétragonal
     (énols et phénols exclus). */
  const FAMILLES = ["alcene", "alcyne", "halogenoalcane", "alcool", "diol12", "ether", "epoxyde", "hemiacetal", "acetal", "esterSulfonique",
    "amine", "aldehyde", "cetone", "acide", "ester", "amide", "chlorureAcyle", "anhydride"];
  function familles(m) {
    const n = m.atomes.length, e = i => m.atomes[i].e, out = [];
    const lourds = i => voisins(m, i).filter(v => e(v.j) !== "H");
    const nH = i => hydrogenes(m, i) + voisins(m, i).filter(v => e(v.j) === "H").length;
    const add = (f, at) => out.push({ famille: f, atomes: at.slice().sort((a, b) => a - b) });
    const oDouble = c => lourds(c).find(v => v.ordre === 2 && e(v.j) === "O");
    const carbonyle = c => e(c) === "C" && !!oDouble(c);
    const sp3 = c => e(c) === "C" && voisins(m, c).every(v => v.ordre === 1);
    const acyleO = new Set();                                     // O simples déjà pris par un acide, un ester, un sulfonate
    m.liaisons.forEach(l => { if (e(l.a) === "C" && e(l.b) === "C" && l.ordre > 1) add(l.ordre === 2 ? "alcene" : "alcyne", [l.a, l.b]); });
    for (let c = 0; c < n; c++) {
      if (!carbonyle(c)) continue;
      const o2 = oDouble(c).j, autres = lourds(c).filter(v => v.j !== o2);
      const X = autres.find(v => HALO.has(e(v.j))), N = autres.find(v => e(v.j) === "N"), O = autres.find(v => e(v.j) === "O" && v.ordre === 1);
      if (X) add("chlorureAcyle", [c, o2, X.j]);
      else if (N) add("amide", [c, o2, N.j]);
      else if (O) {
        acyleO.add(O.j);
        const autre = lourds(O.j).find(w => w.j !== c);
        if (!autre) add("acide", [c, o2, O.j]);
        else if (carbonyle(autre.j)) { if (c < autre.j) add("anhydride", [c, o2, O.j, autre.j, oDouble(autre.j).j]); }
        else add("ester", [c, o2, O.j]);
      } else add(nH(c) > 0 ? "aldehyde" : "cetone", [c, o2]);
    }
    for (let s = 0; s < n; s++) {
      if (e(s) !== "S") continue;
      const v = lourds(s), oo = v.filter(w => w.ordre === 2 && e(w.j) === "O");
      if (oo.length !== 2) continue;
      v.filter(w => w.ordre === 1 && e(w.j) === "O").forEach(w => {
        const c = lourds(w.j).find(z => z.j !== s && e(z.j) === "C");
        if (c) { acyleO.add(w.j); add("esterSulfonique", [s, oo[0].j, oo[1].j, w.j, c.j]); }
      });
    }
    const oS = [];                                                // O à deux liaisons simples vers des carbones non carbonylés
    for (let o = 0; o < n; o++) {
      if (e(o) !== "O" || acyleO.has(o)) continue;
      const v = lourds(o);
      if (v.some(w => w.ordre !== 1 || e(w.j) !== "C" || carbonyle(w.j))) continue;
      if (v.length === 1 && nH(o) > 0) oS.push({ o, oh: true, c: [v[0].j] });
      else if (v.length === 2) oS.push({ o, oh: false, c: v.map(w => w.j) });
    }
    const surC = new Map(), pris = new Set();
    oS.forEach(x => x.c.forEach(c => { if (!surC.has(c)) surC.set(c, []); surC.get(c).push(x); }));
    surC.forEach((xs, c) => {
      if (xs.length < 2 || !sp3(c)) return;
      const oh = xs.filter(x => x.oh), or = xs.filter(x => !x.oh);
      if (oh.length && or.length) { add("hemiacetal", [c, oh[0].o, or[0].o]); pris.add(oh[0].o); pris.add(or[0].o); }
      else if (or.length >= 2) { add("acetal", [c, or[0].o, or[1].o]); pris.add(or[0].o); pris.add(or[1].o); }
    });
    const alcools = [];
    oS.forEach(x => {
      if (pris.has(x.o)) return;
      if (x.oh) { if (sp3(x.c[0])) { add("alcool", [x.o, x.c[0]]); alcools.push(x); } }
      else if (voisins(m, x.c[0]).some(v => v.j === x.c[1])) add("epoxyde", [x.o, x.c[0], x.c[1]]);
      else add("ether", [x.o]);
    });
    alcools.forEach((a, k) => alcools.slice(k + 1).forEach(b => {
      if (voisins(m, a.c[0]).some(v => v.j === b.c[0])) add("diol12", [a.c[0], b.c[0], a.o, b.o]);
    }));
    for (let i = 0; i < n; i++) {
      if (e(i) === "N" && voisins(m, i).every(v => v.ordre === 1) && !lourds(i).some(v => carbonyle(v.j) || e(v.j) === "S")) add("amine", [i]);
      if (HALO.has(e(i))) { const c = lourds(i)[0]; if (c && sp3(c.j)) add("halogenoalcane", [c.j, i]); }
    }
    return out.sort((a, b) => FAMILLES.indexOf(a.famille) - FAMILLES.indexOf(b.famille) || a.atomes[0] - b.atomes[0]);
  }

  /* controle(o, t) : deux produits B et C formés de façon renversable à partir de A (A ⇌ B, A ⇌ C, premier ordre), barrières
     d'Eyring. o = { gB, gC (ΔG‡ de A vers B, C, J·mol⁻¹), rB, rC (ΔrG° de A vers B, C, J·mol⁻¹), T (K) } ; renvoie les fractions
     { A, B, C } à l'instant t (s), partant de A pur. Solution exacte du système linéaire 2 × 2 en (B, C). */
  function constantesControle(o) {
    if (!(o.T > 0)) err("controle : T > 0 attendu");
    const k1 = eyring(o.gB, o.T), k2 = eyring(o.gC, o.T), km1 = eyring(o.gB - o.rB, o.T), km2 = eyring(o.gC - o.rC, o.T);
    const J = [[-k1 - km1, -k1], [-k2, -k2 - km2]], s = (J[0][0] + J[1][1]) / 2, det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
    const q = Math.sqrt(Math.max(s * s - det, 0)), l1 = s - q, l2 = det / l1;           // l1 la plus négative, l2 sans soustraction
    return { k1, k2, km1, km2, J, l1, l2 };
  }
  function controle(o, t) {
    if (!(t >= 0)) err("controle : t ≥ 0 attendu");
    const { k1, k2, km1, km2, J, l1, l2 } = constantesControle(o);
    const den = (k1 + km1) * (k2 + km2) - k1 * k2, yB = k1 * km2 / den, yC = k2 * km1 / den;   // équilibre : B/C = K_B/K_C
    const d0 = [-yB, -yC], I = (a, b) => (a === b ? 1 : 0);
    const ex = (a, b) => (Math.abs(l1 - l2) > 1e-12 * Math.abs(l1))
      ? (Math.exp(l1 * t) * (J[a][b] - l2 * I(a, b)) - Math.exp(l2 * t) * (J[a][b] - l1 * I(a, b))) / (l1 - l2)
      : Math.exp(l1 * t) * (I(a, b) + t * (J[a][b] - l1 * I(a, b)));
    const B = yB + ex(0, 0) * d0[0] + ex(0, 1) * d0[1], C = yC + ex(1, 0) * d0[0] + ex(1, 1) * d0[1];
    return { A: 1 - B - C, B, C };
  }
  const tempsEquilibre = o => -1 / constantesControle(o).l2;     // constante de temps du retour à l'équilibre (s)

  /* sélectivité entre deux voies parallèles : rapport des vitesses ↔ écart des barrières, ΔΔG‡ = RT ln r */
  const rapportVoies = (ddG, T) => Math.exp(ddG / (K().R * T));
  const ecartBarrieres = (r, T) => { if (!(r > 0)) err("ecartBarrieres : rapport > 0 attendu"); return K().R * T * Math.log(r); };

  /* esterification(o) : équilibre acide + alcool ⇌ ester + eau, en quantités (mol). o = { K, acide, alcool, ester (0), eau (0),
     retrait (fraction de l'eau formée retirée au fur et à mesure, 0 à 1) }. Renvoie l'avancement x (mol) et le rendement x/min. */
  function esterification(o) {
    const Kc = o.K, a = o.acide, b = o.alcool, e0 = o.ester || 0, w0 = o.eau || 0, f = o.retrait || 0;
    if (!(Kc > 0) || !(a > 0) || !(b > 0) || f < 0 || f > 1) err("esterification : K, acide, alcool > 0 et retrait dans [0, 1]");
    const xm = Math.min(a, b), Q = x => (e0 + x) * (w0 + (1 - f) * x) - Kc * (a - x) * (b - x);
    let lo = 0, hi = xm;
    if (Q(lo) > 0) err("esterification : le mélange initial est déjà au-delà de l'équilibre");
    for (let k = 0; k < 200; k++) { const mi = (lo + hi) / 2; if (Q(mi) > 0) hi = mi; else lo = mi; }
    const x = (lo + hi) / 2;
    return { x, rendement: x / xm };
  }

  /* polycondensation (Carothers) : degré de polymérisation moyen en nombre Xn = (1 + r)/(1 + r − 2 r p), r ≤ 1 rapport des
     fonctions en défaut sur celles en excès, p conversion des fonctions en défaut. r = 1 : Xn = 1/(1 − p). */
  function carothers(p, r) {
    r = r === undefined ? 1 : r;
    if (!(p >= 0 && p < 1 + 1e-15) || !(r > 0 && r <= 1)) err("carothers : 0 ≤ p ≤ 1 et 0 < r ≤ 1");
    const d = 1 + r - 2 * r * p;
    return d <= 0 ? Infinity : (1 + r) / d;
  }
  const conversionPour = (Xn, r) => { r = r === undefined ? 1 : r; const p = (1 + r - (1 + r) / Xn) / (2 * r); if (!(p >= 0 && p <= 1)) err("conversionPour : Xn hors d'atteinte pour ce r"); return p; };

  /* epoxydationCompetitive(kappa, eq) : un diène à deux doubles liaisons indépendantes a et b, kappa = k_a/k_b, eq équivalents
     de peroxyacide entièrement consommés (0 ≤ eq ≤ 2). Fraction restante de b : u ; de a : u^kappa (même oxydant, même temps).
     Renvoie les fractions de diène intact, de mono-époxydes en a et en b, de diépoxyde. */
  function epoxydationCompetitive(kappa, eq) {
    if (!(kappa > 0) || !(eq >= 0 && eq <= 2)) err("epoxydationCompetitive : kappa > 0 et 0 ≤ eq ≤ 2");
    const conso = u => (1 - Math.pow(u, kappa)) + (1 - u);
    let lo = 0, hi = 1;
    for (let k = 0; k < 200; k++) { const mi = (lo + hi) / 2; if (conso(mi) > eq) lo = mi; else hi = mi; }
    const u = (lo + hi) / 2, ua = Math.pow(u, kappa);
    return { a: ua, b: u, intact: ua * u, monoA: (1 - ua) * u, monoB: ua * (1 - u), di: (1 - ua) * (1 - u) };
  }

  /* un exemple par famille, puis deux molécules polyfonctionnelles (y vers le haut, longueurs de liaison) */
  const EXEMPLES_FAMILLES = {
    alcene: "cgPropene", alcyne: "cgPropyne", halogenoalcane: "cgBromopropane", alcool: "cgPropan2ol", diol12: "cgEthanediol",
    ether: "cgMethoxyethane", epoxyde: "cgMethyloxirane", hemiacetal: "cgMethoxyethanol", acetal: "cgDimethoxyethane",
    esterSulfonique: "cgMesylateMethyle", amine: "cgDiethylamine", aldehyde: "cgPropanal", cetone: "cgPropanone", acide: "cgAcideEthanoique",
    ester: "cgEthanoateMethyle", amide: "cgMethylethanamide", chlorureAcyle: "cgChlorureEthanoyle", anhydride: "cgAnhydrideEthanoique",
  };
  Object.assign(MOLECULES, {
    cgPropene: "C 0 0; C 0.866 0.5; C 1.732 0 | 0-1 1=2",
    cgPropyne: "C 0 0; C 1 0; C 2 0 | 0-1 1#2",
    cgBromopropane: "C 0 0; C 0.866 0.5; C 1.732 0; Br 0.866 1.5 | 0-1 1-2 1-3",
    cgPropan2ol: "C 0 0; C 0.866 0.5; C 1.732 0; O 0.866 1.5 | 0-1 1-2 1-3",
    cgEthanediol: "O 0 0; C 0.866 0.5; C 1.732 0; O 2.598 0.5 | 0-1 1-2 2-3",
    cgMethoxyethane: "C 0 0; O 0.866 0.5; C 1.732 0; C 2.598 0.5 | 0-1 1-2 2-3",
    cgMethyloxirane: "C 0 0; C 1 0; O 0.5 0.866; C -0.866 -0.5 | 0-1 1-2 2-0 0-3",
    cgMethoxyethanol: "C 0 0; C 0.866 0.5; O 0.866 1.5; O 1.732 0; C 2.598 0.5 | 0-1 1-2 1-3 3-4",
    cgDimethoxyethane: "C 0 0; C 0.866 0.5; O 0.866 1.5; C 1.732 2; O 1.732 0; C 2.598 0.5 | 0-1 1-2 2-3 1-4 4-5",
    cgMesylateMethyle: "C 0 0; S 1 0; O 1 1; O 1 -1; O 2 0; C 2.866 0.5 | 0-1 1=2 1=3 1-4 4-5",
    cgDiethylamine: "C 0 0; C 0.866 0.5; N 1.732 0; C 2.598 0.5; C 3.464 0 | 0-1 1-2 2-3 3-4",
    cgPropanal: "C 0 0; C 0.866 0.5; C 1.732 0; O 2.598 0.5 | 0-1 1-2 2=3",
    cgPropanone: "C 0 0; C 0.866 0.5; C 1.732 0; O 0.866 1.5 | 0-1 1-2 1=3",
    cgAcideEthanoique: "C 0 0; C 0.866 0.5; O 1.732 0; O 0.866 1.5 | 0-1 1-2 1=3",
    cgEthanoateMethyle: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5 | 0-1 1-2 2-3 1=4",
    cgMethylethanamide: "C 0 0; C 0.866 0.5; N 1.732 0; C 2.598 0.5; O 0.866 1.5 | 0-1 1-2 2-3 1=4",
    cgChlorureEthanoyle: "C 0 0; C 0.866 0.5; Cl 1.732 0; O 0.866 1.5 | 0-1 1-2 1=3",
    cgAnhydrideEthanoique: "C 0 0; C 0.866 0.5; O 0.866 1.5; O 1.732 0; C 2.598 0.5; O 2.598 1.5; C 3.464 0 | 0-1 1=2 1-3 3-4 4=5 4-6",
    /* β-glucopyranose sans stéréochimie : O5, C1…C5, puis O1…O4, C6, O6 */
    cgGlucopyranose: "O 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; C 0 1; O 1.732 -1; O 0 -2; O -1.732 -1; O -1.732 1; C 0 2; O 0.866 2.5 | 0-1 1-2 2-3 3-4 4-5 5-0 1-6 2-7 3-8 4-9 5-10 10-11",
    /* glycylsérine H₂N–CH₂–CO–NH–CH(CH₂OH)–COOH */
    cgGlycylserine: "N 0 0; C 0.866 0.5; C 1.732 0; O 1.732 -1; N 2.598 0.5; C 3.464 0; C 4.33 0.5; O 4.33 1.5; O 5.196 0; C 3.464 -1; O 4.33 -1.5 | 0-1 1-2 2=3 2-4 4-5 5-6 6=7 6-8 5-9 9-10",
  });

  /* mécanismes limites de l'étape, acte par acte : { spec, fleches } pour schema(mol(spec), { fleches }). Chaque acte part du
     produit du précédent, redessiné, avec le réactif suivant. */
  const MECANISMES_CONVERSION = {
    hydratation: [                                                  // propène + H₃O⁺ → propan-2-ol (Markovnikov)
      { spec: "C 0 0; C 0.866 0.5; C 1.732 0; H 0 -1.1; O 0 -2.1 q+1 | 0=1 1-2 3-4", fleches: [{ de: [0, 1], vers: [0, 3] }, { de: [3, 4], vers: 4 }] },
      { spec: "C 0 0; C 0.866 0.5 q+1; C 1.732 0; O 0.866 1.8 | 0-1 1-2", fleches: [{ de: 3, vers: 1 }] },
      { spec: "C 0 0; C 0.866 0.5; C 1.732 0; O 0.866 1.5 q+1; H 1.7 2; O 2.6 2.5 | 0-1 1-2 1-3 3-4", fleches: [{ de: 5, vers: [5, 4] }, { de: [3, 4], vers: 3 }] },
    ],
    chlorureAcyle: [                                                // chlorure d'éthanoyle + méthanol → éthanoate de méthyle protoné + Cl⁻
      { spec: "C 0 0; C 0.866 0.5; Cl 1.732 0; O 0.866 1.5; O 0.866 -0.9; C 1.732 -1.4 | 0-1 1-2 1=3 4-5", fleches: [{ de: 4, vers: 1 }, { de: [1, 3], vers: 3 }] },
      { spec: "C 0 0; C 0.866 0.5; Cl 1.732 0.5; O 0.866 1.5 q-1; O 0.866 -0.5 q+1; C 1.732 -1 | 0-1 1-2 1-3 1-4 4-5", fleches: [{ de: 3, vers: [1, 3] }, { de: [1, 2], vers: 2 }] },
    ],
    saponification: [                                               // éthanoate de méthyle + HO⁻ → éthanoate + méthanol
      { spec: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5; O 0.866 -0.9 q-1 | 0-1 1-2 2-3 1=4", fleches: [{ de: 5, vers: 1 }, { de: [1, 4], vers: 4 }] },
      { spec: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5 q-1; O 0.866 -0.5 | 0-1 1-2 2-3 1-4 1-5", fleches: [{ de: 4, vers: [1, 4] }, { de: [1, 2], vers: 2 }] },
      { spec: "C 0 0; C 0.866 0.5; O 0.866 1.5; O 1.732 0 h0; H 2.6 -0.4; O 3.5 0 q-1; C 4.366 0.5 | 0-1 1=2 1-3 3-4 5-6", fleches: [{ de: 5, vers: [5, 4] }, { de: [3, 4], vers: 3 }] },
    ],
    epoxyde: [                                                      // méthyloxirane + HO⁻ → propane-1,2-diol (attaque sur CH₂)
      { spec: "C 0 0; C 1 0; O 0.5 0.866; C -0.866 -0.5; O 2.1 -0.6 q-1 | 0-1 1-2 2-0 0-3", fleches: [{ de: 4, vers: 1 }, { de: [1, 2], vers: 2 }] },
      { spec: "C 0 0; C 1 0; O 0 1 q-1; C -0.866 -0.5; O 1.866 -0.5; H 0.8 1.6; O 1.7 2.1 | 0-1 0-2 0-3 1-4 5-6", fleches: [{ de: 2, vers: [2, 5] }, { de: [5, 6], vers: 6 }] },
    ],
    reductionEster: [                                               // éthanoate de méthyle + H⁻ → éthanal → éthanolate
      { spec: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5; H 0.866 -0.9 q-1 | 0-1 1-2 2-3 1=4", fleches: [{ de: 5, vers: 1 }, { de: [1, 4], vers: 4 }] },
      { spec: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5 q-1; H 0.866 -0.5 | 0-1 1-2 2-3 1-4 1-5", fleches: [{ de: 4, vers: [1, 4] }, { de: [1, 2], vers: 2 }] },
      { spec: "C 0 0; C 0.866 0.5; O 0.866 1.5; H 1.8 -0.1 q-1 | 0-1 1=2", fleches: [{ de: 3, vers: 1 }, { de: [1, 2], vers: 2 }] },
    ],
  };

  /* actesMecanisme(id, o) : les dessins { viewBox, html } de chaque acte avec ses flèches, puis le produit du dernier acte ;
     id dans MECANISMES_CONVERSION ou dans Alcenes.MECANISMES ; un acte peut fixer ses propres doublets (a.doublets) */
  function actesMecanisme(id, o) {
    const actes = MECANISMES_CONVERSION[id] || ALCENES.MECANISMES[id] || err("mécanisme inconnu : " + id);
    const vus = actes.map(a => api.schema(mol(a.spec), Object.assign({}, o, a.doublets ? { doublets: a.doublets } : null, { fleches: a.fleches })));
    const marge = 0.3 * ((o && o.echelle) || 36);                 // les traits des doublets dépassent leur centre
    return vus.concat([api.schema(vus[vus.length - 1].apres.m, Object.assign({}, o, { fleches: [] }))]).map(v => {
      const [x, y, w, h] = v.viewBox.split(" ").map(Number);
      return Object.assign({}, v, { viewBox: [x - marge, y - marge, w + 2 * marge, h + 2 * marge].map(f1).join(" ") });
    });
  }

  Object.assign(api, { actesMecanisme, MECANISMES_CONVERSION, FAMILLES, EXEMPLES_FAMILLES, familles, controle, tempsEquilibre, rapportVoies, ecartBarrieres, esterification, carothers, conversionPour, epoxydationCompetitive });

  /* ---------- étape « Mécanismes réactionnels » (chim-mecanismes) : électrons, flèches courbes, profil réactionnel ---------- */
  (() => {
    const CA = () => root.ChimArchi || (typeof require === "function" ? require("./chim-architecture.js") : err("chim-architecture.js manquant"));
    const cle = (a, b) => Math.min(a, b) + "-" + Math.max(a, b);
    const OCTET_STRICT = new Set(["H", "C", "N", "O", "F"]);        // période 1 et 2 : jamais plus de 2 ou 8 électrons
    /* Électrons non liants de chaque atome : v − Σ ordres − h − q. Exacte : le décompte de Lewis ; impair : radical. */
    function electrons(m) {
      return m.atomes.map((at, i) => {
        const n = ELECTRONS_VALENCE[at.e] - somme(m, i) - hydrogenes(m, i) - (at.q || 0);
        if (n < 0) err(`électrons non liants négatifs sur l'atome ${i} (${at.e}) : charge ou hydrogènes à revoir`);
        return n;
      });
    }
    /* Par atome : électrons non liants, charge, électrons autour (non liants + 2 par liaison, H compris), radical, lacunes,
       octet dépassé (H, C, N, O, F seulement : les éléments suivants peuvent porter plus de quatre doublets). */
    function bilanElectrons(m) {
      const nl = electrons(m);
      return m.atomes.map((at, i) => {
        const autour = nl[i] + 2 * (somme(m, i) + hydrogenes(m, i)), cible = at.e === "H" ? 2 : 8;
        return { nl: nl[i], charge: at.q || 0, autour, radical: nl[i] % 2 === 1, lacunes: Math.max(0, Math.floor((cible - autour) / 2)),
          depasse: OCTET_STRICT.has(at.e) && autour > cible };
      });
    }
    /* Une flèche { de, vers, demi } déplace 2 électrons (1 si demi : flèche en hameçon). de : un atome i (ses électrons non
       liants) ou une liaison [i, j]. vers : un atome (il reçoit les électrons, venus d'une liaison qui le touche ; venus d'un
       doublet d'un autre atome, ils forment la liaison entre les deux), ou une liaison [i, j], existante ou formée, qui touche
       le départ. Les hydrogènes implicites sont figés, les charges formelles recalculées. Exacte : une comptabilité ; dire si
       le mécanisme a lieu est l'affaire de la cinétique. */
    function appliquer(m, fleches) {
      const n = m.atomes.length, nl = electrons(m), h = m.atomes.map((_, i) => hydrogenes(m, i)), eb = new Map(), style = new Map();
      m.liaisons.forEach(l => { eb.set(cle(l.a, l.b), 2 * l.ordre); style.set(cle(l.a, l.b), l.style); });
      const atome = i => Number.isInteger(i) && i >= 0 && i < n;
      const paire = p => Array.isArray(p) && p.length === 2 && atome(p[0]) && atome(p[1]) && p[0] !== p[1];
      (fleches || []).forEach((f, k) => {
        const q = f.demi ? 1 : 2, nom = "flèche " + (k + 1);
        if (atome(f.de)) { if (nl[f.de] < q) err(`${nom} : pas d'électron non liant sur l'atome ${f.de}`); nl[f.de] -= q; }
        else if (paire(f.de)) { const c = cle(...f.de); if (!(eb.get(c) >= q)) err(`${nom} : pas de liaison ${c}`); eb.set(c, eb.get(c) - q); }
        else err(nom + " : départ attendu, un atome ou une liaison [i, j]");
        let cible;
        if (atome(f.vers)) {
          if (atome(f.de)) { if (f.vers === f.de) err(nom + " : arrivée sur l'atome de départ"); cible = [f.de, f.vers]; }
          else if (f.de.includes(f.vers)) { nl[f.vers] += q; return; }
          else err(`${nom} : préciser la liaison formée, [i, ${f.vers}]`);
        } else if (paire(f.vers)) {
          const src = atome(f.de) ? [f.de] : f.de;
          if (!f.vers.some(x => src.includes(x))) err(nom + " : la liaison d'arrivée doit toucher le départ");
          if (!atome(f.de) && cle(...f.vers) === cle(...f.de)) err(nom + " : arrivée sur la liaison de départ");
          cible = f.vers;
        } else err(nom + " : arrivée attendue, un atome ou une liaison [i, j]");
        const c = cle(...cible); eb.set(c, (eb.get(c) || 0) + q);
      });
      const liaisons = [];
      for (const [c, e] of eb) {
        if (e % 2) err(`liaison ${c} à un électron : une demi-flèche manque`);
        if (e > 6) err(`liaison ${c} d'ordre supérieur à 3`);
        if (e) { const [a, b] = c.split("-").map(Number); liaisons.push({ a, b, ordre: e / 2, style: e === 2 ? style.get(c) || null : null }); }
      }
      const atomes = m.atomes.map((at, i) => { const r = Object.assign({}, at); delete r.q; if (at.e !== "H") r.h = h[i]; return r; });
      const out = { atomes, liaisons };
      atomes.forEach((at, i) => { const q = ELECTRONS_VALENCE[at.e] - nl[i] - somme(out, i) - hydrogenes(out, i); if (q) at.q = q; });
      const bilan = bilanElectrons(out);
      return { m: out, bilan, depasse: bilan.map((b, i) => b.depasse ? i : -1).filter(i => i >= 0) };
    }

    /* Dessin d'un mécanisme : la formule de dessin(m, o), plus les doublets non liants (un trait ; un point pour un électron
       célibataire), les charges formelles (cerclées), les marques (o.marques : { i: "δ+" }) placées dans un angle libre, et
       les flèches courbes o.fleches = [{ de, vers, demi, cote: ±1, courbure }], validées par appliquer. o.doublets : false (aucun)
       ou la liste des atomes dont on dessine les doublets (par défaut : tous). Rend { viewBox, html, fleches: [{ debut, controle,
       fin }], apres : appliquer(m, o.fleches) }. Coordonnées de l'écran (y vers le bas), en unités du dessin. */
    function schema(m, o) {
      o = o || {};
      const s = o.echelle || 36, fl = o.fleches || [], apres = appliquer(m, fl);
      const base = dessin(m, Object.assign({}, o, { marques: null })), out = [base.html], pts = [];
      const P = m.atomes.map(a => [a.x * s, -a.y * s]), lab = m.atomes.map((_, i) => etiquette(m, i, o)), nl = electrons(m);
      const voir = o.doublets === false ? new Set() : Array.isArray(o.doublets) ? new Set(o.doublets) : null;
      const add = (p, k) => [p[0] + k[0], p[1] + k[1]], mul = (u, k) => [u[0] * k, u[1] * k], dir = th => [Math.cos(th), Math.sin(th)];
      const pt = p => (Math.round(p[0] * 10) / 10) + "," + (Math.round(p[1] * 10) / 10);
      const place = m.atomes.map((at, i) => {
        const dirs = voisins(m, i).map(v => Math.atan2(P[v.j][1] - P[i][1], P[v.j][0] - P[i][0]));
        if (lab[i] && hydrogenes(m, i)) dirs.push(voisins(m, i).reduce((t, v) => t + (P[v.j][0] - P[i][0]), 0) > 0.01 ? Math.PI : 0);
        const montre = !voir || voir.has(i), nd = montre ? Math.floor(nl[i] / 2) : 0, ne = montre ? nl[i] % 2 : 0;
        const ang = CA().anglesLibres(dirs, nd + ne), R = lab[i] ? 0.5 * s : 0.32 * s;
        const libres = ang.map((th, k) => ({ th, c: add(P[i], mul(dir(th), R)), seul: k >= nd }));
        const pris = dirs.concat(ang), r = { libres };
        if (at.q) { const th = CA().anglesLibres(pris, 1)[0]; pris.push(th); r.charge = add(P[i], mul(dir(th), lab[i] ? 0.66 * s : 0.45 * s)); }
        if (o.marques && o.marques[i] != null) { const th = CA().anglesLibres(pris, 1)[0]; r.marque = add(P[i], mul(dir(th), lab[i] ? 0.72 * s : 0.52 * s)); }
        return r;
      });
      const T = o.texte || (x => x);
      place.forEach((p, i) => {
        p.libres.forEach(d => {
          pts.push(d.c);
          if (d.seul) { out.push(`<circle cx="${f1(d.c[0])}" cy="${f1(d.c[1])}" r="${f1(0.06 * s)}" class="fill c-tint"/>`); return; }
          const u = mul([-Math.sin(d.th), Math.cos(d.th)], 0.17 * s), a = add(d.c, u), b = add(d.c, mul(u, -1));
          out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="stroke bold c-tint"/>`);
        });
        if (p.charge) {
          const c = p.charge, w = 0.09 * s; pts.push(c);
          out.push(`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(0.16 * s)}" class="stroke thin c-warn"/>`);
          out.push(`<line x1="${f1(c[0] - w)}" y1="${f1(c[1])}" x2="${f1(c[0] + w)}" y2="${f1(c[1])}" class="stroke thin c-warn"/>`);
          if (m.atomes[i].q > 0) out.push(`<line x1="${f1(c[0])}" y1="${f1(c[1] - w)}" x2="${f1(c[0])}" y2="${f1(c[1] + w)}" class="stroke thin c-warn"/>`);
        }
        if (p.marque) { pts.push(p.marque); out.push(`<text x="${f1(p.marque[0])}" y="${f1(p.marque[1] + 4)}" text-anchor="middle" class="fill c-tint">${T(o.marques[i])}</text>`); }
      });
      const G = P.reduce((g, p) => [g[0] + p[0] / P.length, g[1] + p[1] / P.length], [0, 0]);
      const lies = new Set(m.liaisons.map(l => cle(l.a, l.b)));
      const geo = fl.map(f => {
        let C, r = 0;
        const rayon = c => lab[c] ? 0.42 * s : 0.22 * s;
        if (Number.isInteger(f.vers)) { C = P[f.vers]; r = rayon(f.vers); }
        else if (lies.has(cle(...f.vers))) C = mul(add(P[f.vers[0]], P[f.vers[1]]), 0.5);
        else { const c = f.vers.find(x => !(Number.isInteger(f.de) ? [f.de] : f.de).includes(x)); C = P[c]; r = rayon(c); }
        let S;
        if (Number.isInteger(f.de)) {
          const seuls = place[f.de].libres.filter(d => d.seul);   // une demi-flèche part de l'électron célibataire, s'il y en a un
          const L = f.demi && seuls.length ? seuls : place[f.de].libres.filter(d => f.demi || !d.seul), v = [C[0] - P[f.de][0], C[1] - P[f.de][1]];
          if (L.length) {
            const d = L.reduce((b, x) => (Math.cos(x.th) * v[0] + Math.sin(x.th) * v[1] > Math.cos(b.th) * v[0] + Math.sin(b.th) * v[1] ? x : b));
            S = add(d.c, mul(dir(d.th), 0.1 * s));
          } else { const n = Math.hypot(...v) || 1; S = add(P[f.de], mul(v, 0.35 * s / n)); }
        } else S = mul(add(P[f.de[0]], P[f.de[1]]), 0.5);
        const d = [C[0] - S[0], C[1] - S[1]], L = Math.hypot(...d) || 1, nrm = [-d[1] / L, d[0] / L], M = mul(add(S, C), 0.5);
        const hgt = Math.max((f.courbure != null ? f.courbure : 0.4) * L, 0.6 * s);
        const loin = k => Math.hypot(M[0] + k * nrm[0] * hgt - G[0], M[1] + k * nrm[1] * hgt - G[1]);
        const k = f.cote ? Math.sign(f.cote) : loin(-1) > loin(1) + 1e-6 ? -1 : 1;
        const Q = add(M, mul(nrm, k * hgt));
        let E = C;
        if (r) { const w = [Q[0] - C[0], Q[1] - C[1]], n = Math.hypot(...w) || 1; E = add(C, mul(w, r / n)); }
        const tq = [E[0] - Q[0], E[1] - Q[1]], nt = Math.hypot(...tq) || 1, t = mul(tq, 1 / nt), pn = [-t[1], t[0]];
        const hl = 0.3 * s, hw = 0.12 * s, back = add(E, mul(t, -hl)), fin = add(E, mul(t, -0.5 * hl));
        out.push(`<path d="M${pt(S)} Q${pt(Q)} ${pt(fin)}" class="stroke c-tint"/>`);
        if (f.demi) { const b = add(back, mul(pn, k * hw)); out.push(`<polyline points="${pt(b)} ${pt(E)}" class="stroke c-tint"/>`); }
        else out.push(`<polygon points="${pt(E)} ${pt(add(back, mul(pn, hw)))} ${pt(add(back, mul(pn, -hw)))}" class="fill c-tint"/>`);
        pts.push(S, E, add(mul(add(S, E), 0.25), mul(Q, 0.5)));
        return { debut: S, controle: Q, fin: E };
      });
      const vb = base.viewBox.split(" ").map(Number), mg = 0.25 * s;
      let x0 = vb[0], y0 = vb[1], x1 = vb[0] + vb[2], y1 = vb[1] + vb[3];
      pts.forEach(p => { x0 = Math.min(x0, p[0] - mg); y0 = Math.min(y0, p[1] - mg); x1 = Math.max(x1, p[0] + mg); y1 = Math.max(y1, p[1] + mg); });
      return { viewBox: [x0, y0, x1 - x0, y1 - y0].map(f1).join(" "), html: out.join(""), fleches: geo, apres };
    }

    /* Polarité des liaisons et sites réactifs, du modèle de Lewis et de l'électronégativité de Pauling (ChimArchi.CHI_PAULING,
       Z ≤ 36 ; l'iode, 2,66, valeur révisée par Allred comme les autres). Une liaison est dite polarisée si |Δχ| ≥ o.seuil (0,4
       par défaut : C–H, 0,35, ne l'est pas). Par atome : d = Σ (χ du voisin − χ de l'atome) sur ses liaisons polarisées, H
       implicites compris ; delta = signe de la charge formelle, sinon de d (+1 : δ+). nucleophile : un doublet non liant et pas
       de charge positive. electrophile : charge positive, lacune, ou δ+. hAcide : porte un H implicite δ+ (O–H, N–H). pi : les
       liaisons multiples C=C et C≡C, sites nucléophiles. Approximation : un modèle de charges ; la polarisabilité (C–I) et le
       solvant n'y sont pas. */
    const CHI_I = 2.66;
    const chi = e => e === "I" ? CHI_I : CA().CHI_PAULING[Z[e]];
    function polarites(m, o) {
      const seuil = o && o.seuil != null ? o.seuil : 0.4, bil = bilanElectrons(m), d = m.atomes.map(() => 0), hAcide = m.atomes.map(() => false);
      const liaisons = m.liaisons.map(l => {
        const dx = chi(m.atomes[l.b].e) - chi(m.atomes[l.a].e), pol = Math.abs(dx) >= seuil - 1e-9;
        if (pol) { d[l.a] += dx; d[l.b] -= dx; }
        return { a: l.a, b: l.b, dchi: Math.abs(dx), polarisee: pol, negatif: dx > 0 ? l.b : dx < 0 ? l.a : null };
      });
      m.atomes.forEach((at, i) => {
        const h = hydrogenes(m, i), dx = chi(at.e) - chi("H");
        if (h && Math.abs(dx) >= seuil - 1e-9) { d[i] -= h * dx; if (dx > 0) hAcide[i] = true; }
      });
      const atomes = m.atomes.map((at, i) => {
        const q = at.q || 0, delta = q ? Math.sign(q) : Math.abs(d[i]) > 1e-9 ? Math.sign(d[i]) : 0;
        return { delta, d: d[i], nl: bil[i].nl, nucleophile: bil[i].nl >= 2 && q <= 0, electrophile: q > 0 || bil[i].lacunes > 0 || delta > 0, hAcide: hAcide[i] };
      });
      const pi = m.liaisons.filter(l => l.ordre > 1 && m.atomes[l.a].e === "C" && m.atomes[l.b].e === "C").map(l => [l.a, l.b]);
      return { atomes, liaisons, pi };
    }

    /* Profil énergétique schématique : niveaux [G₀, G₁‡, G₁, G₂‡, …, Gₙ] (minimums et états de transition alternés, nombre impair
       de valeurs, chaque maximum au-dessus de ses deux voisins). Les minimums sont également espacés sur la coordonnée de
       réaction, de 0 à 1 ; un maximum est placé entre ses voisins à la fraction ΔG‡ aller / (ΔG‡ aller + ΔG‡ retour) : il est
       proche, sur la coordonnée, du minimum dont il est proche en énergie (la tendance du postulat de Hammond). Entre deux
       extrémums, une demi-période de cosinus. Un dessin, pas un calcul : la coordonnée n'a pas d'unité. Rend { extremums:
       [{ x, G, type }], points: [[x, G]] (n points par segment), en(x) }. */
    function profil(G, n) {
      if (!Array.isArray(G) || G.length < 3 || G.length % 2 === 0 || !G.every(Number.isFinite)) err("profil : niveaux [min, max, min, …], nombre impair ≥ 3");
      for (let k = 1; k < G.length; k += 2) if (!(G[k] > G[k - 1] && G[k] > G[k + 1])) err(`profil : le niveau ${k} doit dominer ses deux voisins`);
      const nm = (G.length + 1) / 2, ext = G.map((g, k) => ({ G: g, type: k % 2 ? "max" : "min", x: k % 2 ? 0 : k / 2 / (nm - 1) }));
      for (let k = 1; k < G.length; k += 2) { const a = ext[k - 1].x, b = ext[k + 1].x, fa = G[k] - G[k - 1], fb = G[k] - G[k + 1]; ext[k].x = a + (b - a) * fa / (fa + fb); }
      const en = x => {
        if (x <= 0) return G[0]; if (x >= 1) return G[G.length - 1];
        let k = 0; while (k < ext.length - 2 && x > ext[k + 1].x) k++;
        const u = (x - ext[k].x) / (ext[k + 1].x - ext[k].x);
        return ext[k].G + (ext[k + 1].G - ext[k].G) * (1 - Math.cos(Math.PI * u)) / 2;
      };
      const pts = [], np = n || 24;
      for (let k = 0; k < ext.length - 1; k++) for (let j = k ? 1 : 0; j <= np; j++) { const x = ext[k].x + (ext[k + 1].x - ext[k].x) * j / np; pts.push([x, en(x)]); }
      return { extremums: ext, points: pts, en };
    }
    /* Constantes d'Eyring de chaque acte du profil G (J·mol⁻¹) à T : kf (aller), kb (retour). Approximation des états quasi
       stationnaires sur les intermédiaires, dernier acte sans retour : v = k_app [R], k_app = (k_B T/h) / Σ exp((G‡ᵢ − G₀)/RT),
       chaque état de transition compté depuis les réactifs ; parts : poids de chaque terme ; determinante : l'acte dont l'état
       de transition est le plus haut. Ce que l'on néglige, chiffré : ecartAeqs = max exp(−(Gᵢ − G₀)/RT) sur les intermédiaires
       (≪ 1 : intermédiaires peu peuplés), inverse = exp((Gₙ − G₀)/RT) (≪ 1 : retour des produits négligeable). */
    function cinetiqueProfil(G, T) {
      profil(G);
      if (!(T > 0)) err("cinetiqueProfil : T > 0 attendu");
      const RT = K().R * T, kf = [], kb = [], ts = [];
      for (let k = 1; k < G.length; k += 2) { kf.push(eyring(G[k] - G[k - 1], T)); kb.push(eyring(G[k] - G[k + 1], T)); ts.push(G[k]); }
      const gm = Math.max(...ts), w = ts.map(g => Math.exp((g - gm) / RT)), sw = w.reduce((a, b) => a + b, 0);
      let ecartAeqs = 0; for (let k = 2; k < G.length - 1; k += 2) ecartAeqs = Math.max(ecartAeqs, Math.exp(-(G[k] - G[0]) / RT));
      return { kf, kb, kapp: eyring(gm - G[0], T) / sw, parts: w.map(x => x / sw), determinante: ts.indexOf(gm), ecartAeqs,
        inverse: Math.exp((G[G.length - 1] - G[0]) / RT) };
    }

    /* Deux états d'un même dessin (mêmes atomes, même ordre) : mêmes liaisons, mêmes ordres, mêmes charges, mêmes hydrogènes.
       Sert à dire si des flèches mènent au produit attendu. Exacte : une comparaison de graphes étiquetés, coordonnées ignorées. */
    function memeEtat(m1, m2) {
      if (m1.atomes.length !== m2.atomes.length) return false;
      const L = m => m.liaisons.map(l => cle(l.a, l.b) + ":" + l.ordre).sort().join(" ");
      return L(m1) === L(m2) && m1.atomes.every((a, i) => a.e === m2.atomes[i].e && (a.q || 0) === (m2.atomes[i].q || 0) && hydrogenes(m1, i) === hydrogenes(m2, i));
    }

    Object.assign(api, { ELECTRONS_VALENCE, electrons, bilanElectrons, appliquer, memeEtat, schema, polarites, profil, cinetiqueProfil });
  })();
  /* ---------- étape « Oxydoréduction en chimie organique » (chim-redox-organique) ----------
     Le nombre d'oxydation d'un carbone est nombreOxydation(m, i), plus haut. Les demi-équations et les bilans sont ceux de
     public/chim-solutions.js (demiEquation, bilan) : formuleTexte(m) leur donne la formule brute en ASCII.
     formuleTexte(m)                    "C2H6O" : formule brute, ordre de Hill, chiffres ordinaires.
     niveauOxydation(m, i)              liaisons (comptées avec leur ordre) du carbone i vers des atomes plus électronégatifs :
                                        0 alcane, 1 alcool, 2 aldéhyde ou cétone, 3 acide ou dérivé, 4 CO₂.
     sommeNO(m), bilanRedox(m1, m2)     Σ des n.o. des carbones ; { electrons: Σ₂ − Σ₁, nature: oxydation | reduction | aucune },
                                        même nombre de carbones de part et d'autre (sinon : erreur).
     carbinol(m, o), alcools(m)         carbone qui porte l'oxygène o d'un alcool (null sinon) ; oxygènes des alcools.
     oxyderAlcool(m, o, mode)           mode "menagee" (oxydation contrôlée : l'aldéhyde quitte le milieu) ou "poussee" (oxydant
                                        en excès, milieu aqueux) : { classe, famille: aldehyde | cetone | acide | null, produit, c, o }.
     carbonyles(m)                      [{ o, c, famille }] : aldehyde, cetone, acide, ester, amide, halogenure.
     reduireNaBH4(m)                    aldéhydes et cétones changés en alcools, les autres carbonyles intacts :
                                        { produit, reduits: [{ o, c, famille, classe, centre }], intacts: [{ o, c, famille }] }.
     NABH4, bilanNaBH4(nCO, nB)         { Na: 1, B: 1, H: 4 } ; quatre hydrures par ion BH₄⁻ au plus :
                                        { hydrures, limitant: carbonyle | hydrure | aucun, nAlcool, resteHydrures } (mol). */
  (() => {
    Object.assign(MASSE, { Na: 22.990, B: 10.81 });               // g·mol⁻¹, IUPAC : pour NaBH₄, jamais dessiné
    Object.assign(MOLECULES, {
      /* un carbone, du plus réduit au plus oxydé */
      methane: "C 0 0",
      methanol: "C 0 0; O 1 0 | 0-1",
      methanal: "C 0 0; O 1 0 | 0=1",
      acideMethanoique: "C 0 0; O 0.866 0.5; O 0.866 -0.5 | 0=1 0-2",
      dioxydeCarbone: "O -1 0; C 0 0; O 1 0 | 0=1 1=2",
      /* deux carbones */
      ethane: "C 0 0; C 0.866 0.5 | 0-1",
      ethene: "C 0 0; C 0.866 0.5 | 0=1",
      ethyne: "C 0 0; C 1 0 | 0#1",
      ethanal: "C 0 0; C 0.866 0.5; O 1.732 0 | 0-1 1=2",
      acideEthanoique: "C 0 0; C 0.866 0.5; O 1.732 0; O 0.866 1.5 | 0-1 1-2 1=3",
      ethanoateMethyle: "C 0 0; C 0.866 0.5; O 1.732 0; C 2.598 0.5; O 0.866 1.5 | 0-1 1-2 2-3 1=4",
      chloroethane: "C 0 0; C 0.866 0.5; Cl 1.732 0 | 0-1 1-2",
      ethanamine: "C 0 0; C 0.866 0.5; N 1.732 0 | 0-1 1-2",
      /* trois carbones et plus */
      propan1ol: "C 0 0; C 0.866 0.5; C 1.732 0; O 2.598 0.5 | 0-1 1-2 2-3",
      propanal: "C 0 0; C 0.866 0.5; C 1.732 0; O 2.598 0.5 | 0-1 1-2 2=3",
      propan2ol: "C 0 0; C 0.866 0.5; C 1.732 0; O 0.866 1.5 | 0-1 1-2 1-3",
      cyclohexanol: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O 0 2 | 0-1 1-2 2-3 3-4 4-5 5-0 0-6",
      cyclohexanone: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O 0 2 | 0-1 1-2 2-3 3-4 4-5 5-0 0=6",
      oxopentanoateEthyle: "C 0 0; C 0.866 0.5; O 0.866 1.5; C 1.732 0; C 2.598 0.5; C 3.464 0; O 3.464 -1; O 4.33 0.5; C 5.196 0; C 6.062 0.5 | 0-1 1=2 1-3 3-4 4-5 5=6 5-7 7-8 8-9",
    });

    const SUBS = "₀₁₂₃₄₅₆₇₈₉";
    const formuleTexte = m => ecrireFormule(formuleBrute(m)).replace(/[₀-₉]/g, c => String(SUBS.indexOf(c)));
    const ATTRACTEURS = new Set(["N", "O", "S", "F", "Cl", "Br", "I"]);   // plus électronégatifs que C (Pauling)
    const estH = (m, j) => m.atomes[j].e === "H";
    const nH = (m, i) => hydrogenes(m, i) + voisins(m, i).filter(v => estH(m, v.j)).length;
    function niveauOxydation(m, i) {
      if (m.atomes[i].e !== "C") err("niveauOxydation : un carbone attendu");
      return voisins(m, i).reduce((s, v) => s + (ATTRACTEURS.has(m.atomes[v.j].e) ? v.ordre : 0), 0);
    }
    const carbones = m => m.atomes.map((a, i) => i).filter(i => m.atomes[i].e === "C");
    const sommeNO = m => carbones(m).reduce((s, i) => s + api.nombreOxydation(m, i), 0);
    function bilanRedox(m1, m2) {
      const n1 = carbones(m1).length, n2 = carbones(m2).length;
      if (n1 !== n2) err(`bilanRedox : ${n1} carbone(s) d'un côté, ${n2} de l'autre`);
      const d = sommeNO(m2) - sommeNO(m1);
      return { electrons: d, nature: d > 0 ? "oxydation" : d < 0 ? "reduction" : "aucune" };
    }

    /* ---- alcools ---- */
    function carbinol(m, o) {
      const at = m.atomes[o];
      if (!at || at.e !== "O" || nH(m, o) !== 1) return null;
      const v = voisins(m, o).filter(w => !estH(m, w.j));
      if (v.length !== 1 || v[0].ordre !== 1 || m.atomes[v[0].j].e !== "C") return null;
      const c = v[0].j;
      if (voisins(m, c).some(w => w.ordre > 1) || niveauOxydation(m, c) !== 1) return null;   // énol, hémiacétal : pas un alcool simple
      return c;
    }
    const alcools = m => m.atomes.map((a, i) => i).filter(i => carbinol(m, i) !== null);
    const lien = (m, a, b) => m.liaisons.find(l => (l.a === a && l.b === b) || (l.a === b && l.b === a));
    function sansAtomes(m, morts) {                               // retire des atomes, renumérote ; idx(i) : nouvel indice
      const garde = m.atomes.map((a, i) => !morts.includes(i)), nv = [];
      let k = 0; garde.forEach((g, i) => { nv[i] = g ? k++ : -1; });
      return { m: { atomes: m.atomes.filter((a, i) => garde[i]), liaisons: m.liaisons.filter(l => garde[l.a] && garde[l.b]).map(l => Object.assign({}, l, { a: nv[l.a], b: nv[l.b] })) }, idx: i => nv[i] };
    }
    function oterH(r, i, morts) {                                  // un H de moins sur i, avant d'augmenter ses liaisons
      const at = r.atomes[i];
      if (at.h !== undefined) { if (!at.h) err("plus d'hydrogène sur l'atome " + i); at.h -= 1; return; }
      if (hydrogenes(r, i) > 0) return;                            // implicite : la liaison ajoutée le retire d'elle-même
      const h = voisins(r, i).find(v => estH(r, v.j) && !morts.includes(v.j));
      if (!h) err("plus d'hydrogène sur l'atome " + i);
      morts.push(h.j);
    }
    function directionLibre(m, i) {                                // milieu du plus grand secteur laissé libre par les liaisons de i
      const a = m.atomes[i], ang = voisins(m, i).map(v => Math.atan2(m.atomes[v.j].y - a.y, m.atomes[v.j].x - a.x)).sort((p, q) => p - q);
      if (!ang.length) return 0;
      if (ang.length === 1) return ang[0] + 2 * Math.PI / 3;
      let best = 0, at = 0;
      ang.forEach((p, k) => { const q = k + 1 < ang.length ? ang[k + 1] : ang[0] + 2 * Math.PI; if (q - p > best) { best = q - p; at = p + (q - p) / 2; } });
      return at;
    }
    function oxyderAlcool(m, o, mode) {
      if (mode !== "menagee" && mode !== "poussee") err("oxyderAlcool : mode « menagee » ou « poussee »");
      const c = carbinol(m, o);
      if (c === null) err("oxyderAlcool : l'atome " + o + " n'est pas l'oxygène d'un alcool");
      const classe = voisins(m, c).filter(v => m.atomes[v.j].e === "C").length;
      if (classe === 3) return { classe, famille: null, produit: null };
      const r = copie(m), morts = [];
      oterH(r, c, morts); oterH(r, o, morts);
      const l = lien(r, c, o); l.ordre = 2; l.style = null;
      let famille = classe === 2 ? "cetone" : "aldehyde";
      if (famille === "aldehyde" && mode === "poussee") {            // le H du carbone fonctionnel devient OH
        oterH(r, c, morts);
        const th = directionLibre(r, c), k = r.atomes.length;
        r.atomes.push({ e: "O", x: r.atomes[c].x + Math.cos(th), y: r.atomes[c].y + Math.sin(th) });
        r.liaisons.push({ a: c, b: k, ordre: 1, style: null });
        famille = "acide";
      }
      const s = sansAtomes(r, morts);
      return { classe, famille, produit: s.m, c: s.idx(c), o: s.idx(o) };
    }

    /* ---- carbonyles et NaBH₄ ---- */
    function carbonyles(m) {
      const out = [];
      m.atomes.forEach((at, o) => {
        if (at.e !== "O") return;
        const v = voisins(m, o);
        if (v.length !== 1 || v[0].ordre !== 2 || m.atomes[v[0].j].e !== "C") return;
        const c = v[0].j, autres = voisins(m, c).filter(w => w.j !== o), el = w => m.atomes[w.j].e;
        const het = autres.filter(w => ATTRACTEURS.has(el(w)));
        let famille;
        if (!het.length) famille = autres.filter(w => el(w) === "C").length === 2 ? "cetone" : "aldehyde";
        else if (het.some(w => el(w) === "N")) famille = "amide";
        else if (het.some(w => el(w) === "O")) famille = het.some(w => el(w) === "O" && nH(m, w.j) > 0) ? "acide" : "ester";
        else famille = "halogenure";
        out.push({ o, c, famille });
      });
      return out;
    }
    function reduireNaBH4(m) {
      const r = copie(m), reduits = [], intacts = [];
      carbonyles(m).forEach(x => {
        if (x.famille !== "aldehyde" && x.famille !== "cetone") { intacts.push(x); return; }
        const l = lien(r, x.c, x.o); l.ordre = 1;
        [x.c, x.o].forEach(i => { if (r.atomes[i].h !== undefined) r.atomes[i].h += 1; });
        reduits.push(Object.assign({}, x, { classe: voisins(r, x.c).filter(v => r.atomes[v.j].e === "C").length }));
      });
      const cs = centres(r);
      reduits.forEach(x => { x.centre = cs.includes(x.c); });
      return { produit: r, reduits, intacts };
    }
    const NABH4 = { Na: 1, B: 1, H: 4 };
    function bilanNaBH4(nCO, nB) {
      if (!(nCO >= 0) || !(nB >= 0) || !isFinite(nCO) || !isFinite(nB)) err("bilanNaBH4 : quantités positives attendues");
      const hydrures = 4 * nB, nAlcool = Math.min(nCO, hydrures);
      const limitant = nCO === hydrures ? "aucun" : nCO < hydrures ? "carbonyle" : "hydrure";
      return { hydrures, limitant, nAlcool, resteHydrures: hydrures - nAlcool, resteCarbonyle: nCO - nAlcool };
    }

    Object.assign(api, { formuleTexte, niveauOxydation, sommeNO, bilanRedox, carbinol, alcools, oxyderAlcool, carbonyles, reduireNaBH4,
      NABH4, bilanNaBH4 });
  })();
  /* ---------- étape « Aromatiques » (chim-aromatiques) : Hückel des cycles, intermédiaire de Wheland, orientation ----------
     Hückel par api.huckel (étape « Compléments de synthèse ») : E = α + xβ, β < 0. Une stabilisation S = Σ nⱼ xⱼ se lit en |β| :
     l'énergie π vaut nₑ α − S |β|. Recouvrement négligé, σ et π séparés, système plan : hors du plan, les orbitales p ne se
     recouvrent plus et le modèle ne s'applique pas. Tests : test/chim-organique-aromatiques.test.js. */
  (() => {
    const anneau = N => Array.from({ length: N }, (_, i) => [i, (i + 1) % N, 1]);
    const chaine = N => Array.from({ length: N - 1 }, (_, i) => [i, i + 1, 1]);
    const zeros = n => new Array(n).fill(0);
    const stabilisation = r => r.orbitales.reduce((s, o) => s + o.n * o.x, 0);
    /* occupations de Hund : un niveau dégénéré partiellement rempli partage ses électrons (1 et 1, pas 2 et 0) ; S inchangé */
    function hund(orbitales, ne) {
      const n = orbitales.map(() => 0); let reste = ne;
      for (let i = 0; i < orbitales.length && reste > 0;) {
        let j = i; while (j + 1 < orbitales.length && Math.abs(orbitales[j + 1].x - orbitales[i].x) < 1e-9) j++;
        const places = 2 * (j - i + 1), mis = Math.min(places, reste);
        for (let k = i; k <= j; k++) n[k] = mis / (j - i + 1);
        reste -= mis; i = j + 1;
      }
      return n;
    }
    /* Monocycle plan de N carbones sp², de charge q : nₑ = N − q électrons π. Référence localisée : ⌊nₑ/2⌋ doubles liaisons
       isolées au plus ⌊N/2⌋ (deux électrons à α + β chacune, S = 2 par double liaison), les autres électrons à α.
       couchePleine : HO pleine et séparée de la BV ; regle : nₑ = 4n + 2. Les deux coïncident pour un monocycle. */
    function cycle(N, q) {
      q = q || 0;
      if (!Number.isInteger(N) || N < 3 || N > 12) err("cycle : N entier de 3 à 12");
      if (!Number.isInteger(q) || Math.abs(q) > 2) err("cycle : charge entière de -2 à +2");
      const ne = N - q, e = new Array(N).fill(1);
      for (let i = 0; i < Math.abs(q); i++) e[i] = q > 0 ? 0 : 2;      // la charge posée sur des atomes : seules les énergies servent
      const r = api.huckel(zeros(N), anneau(N), e);
      const S = stabilisation(r), Sloc = 2 * Math.min(Math.floor(ne / 2), Math.floor(N / 2));
      const occ = hund(r.orbitales, ne), ho = occ.map(v => v > 0).lastIndexOf(true);
      const couchePleine = ne > 0 && occ[ho] === 2 && (ho + 1 === N || r.orbitales[ho].x - r.orbitales[ho + 1].x > 1e-9);
      return { N, q, ne, orbitales: r.orbitales.map((o, k) => ({ x: o.x, n: occ[k] })), S, Sloc, delocalisation: S - Sloc,
        couchePleine, regle: ne % 4 === 2 };
    }
    /* Les états π de la substitution électrophile du benzène (stabilisations S, en |β|) : benzène (anneau de 6, 6 électrons),
       intermédiaire de Wheland (le carbone attaqué devient sp³ et sort du système π : cation pentadiényle, chaîne de 5,
       4 électrons), produit d'addition (cyclohexa-1,3-diène : chaîne de 4, 4 électrons), produit de substitution (l'anneau).
       localisation = S(benzène) − S(Wheland) : ce que coûte l'attaque côté π, exact dans ce modèle (8 − 2 − 2√3). */
    function etatsSEAr() {
      const benzene = stabilisation(api.huckel(zeros(6), anneau(6), new Array(6).fill(1)));
      const wheland = stabilisation(api.huckel(zeros(5), chaine(5), [1, 1, 0, 1, 1]));
      const addition = stabilisation(api.huckel(zeros(4), chaine(4), new Array(4).fill(1)));
      return { benzene, wheland, addition, substitution: benzene, localisation: benzene - wheland };
    }
    /* Benzène portant un atome X à doublet (atome 6, lié au carbone 0) : αX = α + hβ, βCX = kβ, deux électrons π sur X,
       huit en tout (phénol, aniline, anion benzyle si h = 0 et k = 1). charges : charges π (X cède au cycle, les carbones
       reçoivent) ; cede = charge π de X. localisation : coût π (|β|) de l'attaque en ortho (1), méta (2), para (3) ; le
       carbone attaqué sort du système, six électrons restent sur six atomes. Modèle de Hückel : h et k sont des paramètres. */
    function donneur(h, k) {
      if (!(h >= 0 && h <= 4) || !(k > 0 && k <= 2)) err("donneur : 0 <= h <= 4 et 0 < k <= 2");
      const liens = anneau(6).concat([[0, 6, k]]), H = [0, 0, 0, 0, 0, 0, h], E = [1, 1, 1, 1, 1, 1, 2];
      const r = api.huckel(H, liens, E), S0 = stabilisation(r), q = r.charges;
      const L = a => {
        const garde = [0, 1, 2, 3, 4, 5, 6].filter(i => i !== a), idx = new Map(garde.map((i, j) => [i, j]));
        const l = liens.filter(([i, j]) => i !== a && j !== a).map(([i, j, kk]) => [idx.get(i), idx.get(j), kk]);
        const e = garde.map(i => E[i]); e[0] -= 1;                      // le cation : six électrons sur six atomes
        return S0 - stabilisation(api.huckel(garde.map(i => H[i]), l, e));
      };
      return { charges: { X: q[6], ipso: q[0], ortho: q[1], meta: q[2], para: q[3] }, cede: q[6],
        localisation: { ortho: L(1), meta: L(2), para: L(3) }, benzene: etatsSEAr().localisation };
    }

    /* Positions du cycle, 0 à 5 dans le sens des aiguilles d'une montre (0 en haut) ; relation de p vue de q. */
    const pos = p => (Number.isInteger(p) && p >= 0 && p < 6 ? p : err("position entière de 0 à 5 attendue"));
    const relation = (p, q) => ["ipso", "ortho", "meta", "para"][Math.min((pos(p) - pos(q) + 6) % 6, (q - p + 6) % 6)];
    /* Intermédiaire de Wheland après attaque en a : la charge + se place, selon la forme mésomère, en ortho ou en para de a. */
    const positionsPlus = a => [1, 3, 5].map(d => (pos(a) + d) % 6);
    /* Effet d'un groupe sur la substitution électrophile aromatique. oriente : "op" (ortho et para) ou "m" ; effet : activant
       ou désactivant ; rang : ordre d'activation (1 le plus activant ; même rang, effets voisins), classement des manuels
       (OpenStax, Organic Chemistry, § 16.4) ; nitration : répartition [ortho, méta, para] mesurée (%), même source (table 16.1) ;
       krel : vitesse de nitration relative au benzène (méthyle 25, hydroxyle environ 1 000 : OpenStax ; chlore 0,03 :
       log₁₀ = −1,52, table de vitesses de nitration, PMC 8928515). Des répartitions d'autres sources diffèrent de quelques %. */
    const GROUPES_AROMATIQUES = Object.freeze({
      Ominus: { texte: "O⁻", oriente: "op", effet: "activant", rang: 1 },
      NH2: { texte: "NH₂", oriente: "op", effet: "activant", rang: 2 },
      OH: { texte: "OH", oriente: "op", effet: "activant", rang: 3, nitration: [50, 0, 50], krel: 1000 },
      OCH3: { texte: "OCH₃", oriente: "op", effet: "activant", rang: 4 },
      NHCOCH3: { texte: "NHCOCH₃", oriente: "op", effet: "activant", rang: 5, nitration: [19, 2, 79] },
      CH3: { texte: "CH₃", oriente: "op", effet: "activant", rang: 6, nitration: [63, 3, 34], krel: 25 },
      F: { texte: "F", oriente: "op", effet: "desactivant", rang: 7, nitration: [13, 1, 86] },
      Cl: { texte: "Cl", oriente: "op", effet: "desactivant", rang: 7, nitration: [35, 1, 64], krel: 0.03 },
      Br: { texte: "Br", oriente: "op", effet: "desactivant", rang: 7, nitration: [43, 1, 56] },
      I: { texte: "I", oriente: "op", effet: "desactivant", rang: 7, nitration: [45, 1, 54] },
      CHO: { texte: "CHO", oriente: "m", effet: "desactivant", rang: 8, nitration: [19, 72, 9] },
      COCH3: { texte: "COCH₃", oriente: "m", effet: "desactivant", rang: 8, nitration: [26, 72, 2] },
      CO2H: { texte: "CO₂H", oriente: "m", effet: "desactivant", rang: 8, nitration: [22, 76, 2] },
      CO2CH3: { texte: "CO₂CH₃", oriente: "m", effet: "desactivant", rang: 8, nitration: [28, 66, 6] },
      CN: { texte: "CN", oriente: "m", effet: "desactivant", rang: 9, nitration: [17, 81, 2] },
      NO2: { texte: "NO₂", oriente: "m", effet: "desactivant", rang: 10, nitration: [7, 91, 2] },
      NH3plus: { texte: "NH₃⁺", oriente: "m", effet: "desactivant", rang: 11 },
      NMe3plus: { texte: "N(CH₃)₃⁺", oriente: "m", effet: "desactivant", rang: 11, nitration: [2, 87, 11] },
    });
    const groupe = id => GROUPES_AROMATIQUES[id] || err("groupe inconnu : " + id);
    /* Où entre un nouveau groupe sur un cycle déjà substitué (subs = { position: id }). Tendances, pas lois : les groupes sont
       pris par rang croissant ; chaque rang garde, parmi les positions encore candidates, celles que le plus de ses groupes
       visent (si aucune, il ne départage rien) ; puis une position coincée entre deux groupes voisins est écartée s'il en reste
       une autre (gêne stérique). Renvoie { positions, guide (position du groupe qui a tranché le premier, ou null) }. */
    function orienter(subs) {
      const occ = Object.keys(subs || {}).map(Number);
      if (!occ.length) err("orienter : au moins un groupe");
      occ.forEach(p => { pos(p); groupe(subs[p]); });
      let cand = [0, 1, 2, 3, 4, 5].filter(p => !occ.includes(p)), guide = null;
      if (!cand.length) err("orienter : plus de position libre");
      const vise = (p, q) => { const r = relation(p, q); return groupe(subs[q]).oriente === "op" ? r === "ortho" || r === "para" : r === "meta"; };
      const rangs = [...new Set(occ.map(q => groupe(subs[q]).rang))].sort((a, b) => a - b);
      for (const rg of rangs) {
        const membres = occ.filter(q => groupe(subs[q]).rang === rg), score = p => membres.filter(q => vise(p, q)).length;
        const best = Math.max(...cand.map(score));
        if (best === 0) continue;
        const f = cand.filter(p => score(p) === best);
        if (f.length < cand.length && guide === null) guide = membres.find(q => f.some(p => vise(p, q)));
        cand = f;
      }
      const coince = p => occ.filter(q => relation(p, q) === "ortho").length >= 2, libres = cand.filter(p => !coince(p));
      if (libres.length) cand = libres;
      return { positions: cand, guide };
    }
    /* Facteurs partiels de vitesse : f = vitesse en une position / vitesse en une position du benzène (6 positions).
       krel = (2 f_o + 2 f_m + f_p)/6 ; %o = 2 f_o/(2 f_o + 2 f_m + f_p)… Définitions exactes ; les f mesurent un modèle :
       chaque position réagit indépendamment des autres, une seule substitution. */
    function facteursPartiels(krel, rep) {
      if (!(krel > 0) || !Array.isArray(rep) || rep.length !== 3) err("facteursPartiels : krel > 0 et [o, m, p] en %");
      const s = rep[0] + rep[1] + rep[2];
      if (!(s > 0)) err("facteursPartiels : répartition nulle");
      return { o: 3 * krel * rep[0] / s, m: 3 * krel * rep[1] / s, p: 6 * krel * rep[2] / s };
    }
    function repartition(f) {
      const t = 2 * f.o + 2 * f.m + f.p;
      if (!(t > 0)) err("repartition : facteurs positifs attendus");
      return { krel: t / 6, o: 200 * f.o / t, m: 200 * f.m / t, p: 100 * f.p / t };
    }

    /* Dérivé du benzène en molécule dessinable. o = { subs: { position: id ou texte }, kekule (0 ou 1), wheland: { a, E, el, h,
       plus }, electrophile: { a, E, el, h } }. Cycle de rayon 1 (longueur de liaison), position p à l'angle 90° − 60° p : atomes
       0 à 5 ; puis les groupes (positions croissantes). Wheland : H et E sur le carbone sp³ a, la charge + (q+1) en plus (une des
       positionsPlus(a)), les deux doubles liaisons ailleurs. electrophile : un E⁺ libre (élément el, Br par défaut, h hydrogènes)
       face à la position a, pour la flèche de l'attaque. E est le texte écrit à la place de l'atome. Rend { m, etiquettes, H, E }
       (indices des atomes H et E, ou null). */
    function areneMol(o) {
      o = o || {};
      const subs = o.subs || {}, W = o.wheland || null, X = o.electrophile || null, at = [], li = [], etiquettes = {};
      const ang = p => (90 - 60 * p) * Math.PI / 180, xy = (p, r, d) => [r * Math.cos(ang(p) + (d || 0)), r * Math.sin(ang(p) + (d || 0))];
      const f4 = v => v.toFixed(4), opt = (h, q) => (h !== undefined ? " h" + h : " h0") + (q ? " q+" + q : "");
      if (W) { pos(W.a); if (!positionsPlus(W.a).includes(W.plus)) err("dessinArene : la charge + va en ortho ou en para de a"); if (subs[W.a] !== undefined) err("dessinArene : a porte déjà un groupe"); }
      if (W && X) err("dessinArene : un Wheland ou un électrophile libre, pas les deux");
      let doubles;
      if (W) {
        const ch = [1, 2, 3, 4, 5].map(d => (W.a + d) % 6), c = ch.indexOf(W.plus);
        doubles = (c === 0 ? [[1, 2], [3, 4]] : c === 2 ? [[0, 1], [3, 4]] : [[0, 1], [2, 3]]).map(([u, v]) => [ch[u], ch[v]]);
      } else doubles = [0, 2, 4].map(i => [(i + (o.kekule ? 1 : 0)) % 6, (i + 1 + (o.kekule ? 1 : 0)) % 6]);
      const estDouble = (i, j) => doubles.some(([u, v]) => (u === i && v === j) || (u === j && v === i));
      for (let p = 0; p < 6; p++) {
        const [x, y] = xy(p, 1), h = subs[p] !== undefined || (W && p === W.a) ? 0 : 1;
        at.push(`C ${f4(x)} ${f4(y)} h${h}${W && p === W.plus ? " q+1" : ""}`);
      }
      for (let p = 0; p < 6; p++) { const q = (p + 1) % 6; li.push(p + (estDouble(p, q) ? "=" : "-") + q); }
      Object.keys(subs).map(Number).sort((a, b) => a - b).forEach(p => {
        pos(p); const g = subs[p], txt = GROUPES_AROMATIQUES[g] ? GROUPES_AROMATIQUES[g].texte : String(g);
        const el = { O: "O", N: "N" }[txt.replace(/^[^A-Z]*/, "")[0]] || "C", [x, y] = xy(p, 2);
        etiquettes[at.length] = txt; li.push(p + "-" + at.length); at.push(`${el} ${f4(x)} ${f4(y)} h0`);
      });
      let H = null, E = null;
      if (W) {
        const hp = xy(W.a, 1.9, Math.PI / 6), ep = xy(W.a, 1.9, -Math.PI / 6);
        H = at.length; li.push(W.a + "-" + H); at.push(`H ${f4(hp[0])} ${f4(hp[1])}`);
        E = at.length; etiquettes[E] = W.E || "E"; li.push(W.a + "-" + E); at.push(`${W.el || "Br"} ${f4(ep[0])} ${f4(ep[1])}${opt(W.h)}`);
      }
      if (X) {
        pos(X.a); const ep = xy(X.a, 2.3, -Math.PI / 6);
        E = at.length; etiquettes[E] = X.E || "E"; at.push(`${X.el || "Br"} ${f4(ep[0])} ${f4(ep[1])}${opt(X.h, 1)}`);
      }
      return { m: mol(at.join("; ") + " | " + li.join(" ")), etiquettes, H, E };
    }
    /* Dessin par schema (étape « Mécanismes ») : charges formelles cerclées, flèches courbes o.fleches entre les indices de
       areneMol, sans doublets. Rend { viewBox, html, fleches, apres }. */
    function dessinArene(o) {
      o = o || {};
      const r = areneMol(o);
      return api.schema(r.m, { texte: o.texte, echelle: o.echelle, surligne: o.surligne, etiquettes: r.etiquettes, doublets: false, fleches: o.fleches, marques: o.marques });
    }

    Object.assign(api, { cycle, etatsSEAr, donneur, relation, positionsPlus, GROUPES_AROMATIQUES, orienter, facteursPartiels, repartition, areneMol, dessinArene });
  })();

  /* ---------- étape « Créer des liaisons carbone-carbone » (chim-liaisons-cc) ----------
     Orbitales frontalières des diènes et des diénophiles (par api.huckel, étape « Compléments de synthèse »), aldolisations
     croisées, organomagnésien sur un ester. */
  {
    const fini = (x, nom) => (typeof x === "number" && isFinite(x) ? x : err(nom + " doit être un nombre fini"));

    /* Systèmes π pour huckel : h (α_X = α + h β), liaisons [i, j, k] (β_XY = k β), électrons π apportés (1 par carbone ou par
       l'oxygène d'un carbonyle, 2 pour l'oxygène d'un éther). Paramètres des hétéroatomes choisis pour le modèle (O de carbonyle
       h = 1, k = 1 ; O d'éther h = 2, k = 0,8) : ils fixent le sens des effets, pas leur valeur. extremites : les deux atomes qui
       forment les liaisons σ d'une cycloaddition (C1 et C4 d'un diène, les deux carbones de C=C). */
    const SYSTEMES_PI = {
      ethylene: { h: [0, 0], liaisons: [[0, 1, 1]], electrons: [1, 1], extremites: [0, 1] },
      acroleine: { h: [0, 0, 0, 1], liaisons: [[0, 1, 1], [1, 2, 1], [2, 3, 1]], electrons: [1, 1, 1, 1], extremites: [0, 1] },
      butadiene: { h: [0, 0, 0, 0], liaisons: [[0, 1, 1], [1, 2, 1], [2, 3, 1]], electrons: [1, 1, 1, 1], extremites: [0, 3] },
      methoxy1butadiene: { h: [0, 0, 0, 0, 2], liaisons: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 0.8]], electrons: [1, 1, 1, 1, 2], extremites: [0, 3] },
      methoxy2butadiene: { h: [0, 0, 0, 0, 2], liaisons: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [1, 4, 0.8]], electrons: [1, 1, 1, 1, 2], extremites: [0, 3] },
    };
    const systemePi = s => typeof s === "string" ? (SYSTEMES_PI[s] || err("système π inconnu : " + s)) : s;
    const orbitalesPi = s => { s = systemePi(s); return api.huckel(s.h, s.liaisons, s.electrons); };

    /* Cycloaddition [4 + 2] dans l'approximation des orbitales frontalières. Écarts HO(diène)–BV(diénophile) (demande normale)
       et BV(diène)–HO(diénophile) (demande inverse), en |β| (E = α + xβ : écart x_HO − x_BV) ; la paire d'écart le plus petit
       domine. Orientations : « a » lie diène[0]–diénophile[0] et diène[1]–diénophile[1], « b » croise. Poids (Σ c c')² : le plus
       grand l'emporte, les gros coefficients s'unissent. Approximation : second ordre, une seule paire d'orbitales, même couplage
       pour les deux liaisons. */
    function cycloaddition(diene, dieno) {
      const sd = systemePi(diene), sn = systemePi(dieno), D = orbitalesPi(sd), N = orbitalesPi(sn), o = (H, i) => H.orbitales[i];
      const normale = o(D, D.HO).x - o(N, N.BV).x, inverse = o(N, N.HO).x - o(D, D.BV).x;
      const [od, on] = normale <= inverse ? [o(D, D.HO).c, o(N, N.BV).c] : [o(D, D.BV).c, o(N, N.HO).c];
      const [d0, d1] = sd.extremites, [n0, n1] = sn.extremites;
      const a = (od[d0] * on[n0] + od[d1] * on[n1]) ** 2, b = (od[d0] * on[n1] + od[d1] * on[n0]) ** 2;
      return { normale, inverse, demande: normale <= inverse ? "normale" : "inverse", poids: { a, b },
        orientation: Math.abs(a - b) < 1e-9 ? null : a > b ? "a" : "b", diene: D, dienophile: N };
    }

    /* Aldolisations : partenaires { enolisable } (hydrogène en α d'un carbonyle). Non dirigée (base faible, tout mélangé) : tout
       partenaire énolisable est donneur, tout partenaire est accepteur. Dirigée (énolate de A préformé, total, par le LDA, puis
       B ajouté) : la seule paire A → B. Produits d'addition, sans compter les stéréoisomères ni les crotonisations. */
    const PARTENAIRES_ALDOL = {
      ethanal: { enolisable: true }, propanone: { enolisable: true }, propanal: { enolisable: true },
      benzaldehyde: { enolisable: false }, methanal: { enolisable: false },
    };
    function aldols(a, b, dirigee) {
      [a, b].forEach(x => { if (!PARTENAIRES_ALDOL[x]) err("partenaire inconnu : " + x); });
      if (dirigee) { if (!PARTENAIRES_ALDOL[a].enolisable) err(a + " n'a pas d'hydrogène en α : pas d'énolate"); return [[a, b]]; }
      const ids = a === b ? [a] : [a, b], out = [];
      ids.forEach(d => { if (PARTENAIRES_ALDOL[d].enolisable) ids.forEach(e => out.push([d, e])); });
      return out;
    }

    /* Ester E et organomagnésien G : E + G → K (k₁), puis la cétone K + G → A, alcoolate tertiaire (k₂). Mélange homogène,
       deux actes irréversibles du même ordre en G, cétone libérée dès sa formation. r = k₂/k₁, nG équivalents ajoutés d'un coup.
       dK/dE = −1 + r K/E : K = (E − Eʳ)/(r − 1) (r ≠ 1), −E ln E (r = 1) ; G consommé = 2 − 2E − K. Fin : G épuisé ou E et K
       épuisés. Renvoie les fractions finales { E, K, A, G } (G : équivalents restants). */
    function grignardEster(r, nG) {
      if (!(fini(r, "r") > 0)) err("rapport k₂/k₁ positif attendu");
      if (!(fini(nG, "nG") >= 0)) err("quantité d'organomagnésien positive attendue");
      const Kf = E => E <= 0 ? 0 : Math.abs(r - 1) < 1e-9 ? -E * Math.log(E) : (E - Math.pow(E, r)) / (r - 1);
      const conso = E => 2 - 2 * E - Kf(E);
      if (nG >= 2) return { E: 0, K: 0, A: 1, G: nG - 2 };
      let lo = 0, hi = 1;
      for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (conso(m) > nG) lo = m; else hi = m; }
      const E = (lo + hi) / 2, k = Kf(E);
      return { E, K: k, A: Math.max(0, 1 - E - k), G: 0 };
    }

    Object.assign(api, { SYSTEMES_PI, orbitalesPi, cycloaddition, PARTENAIRES_ALDOL, aldols, grignardEster });
  }

  /* ---------- étape « Halogénoalcanes » (chim-halogenoalcanes) ; tests : test/chim-organique-halogenoalcanes.test.js ----------
     sn(m, c, mec, nu)             produits de la substitution du nucléophile nu (clé de NUCLEOPHILES) sur le carbone c :
                                   mec "SN2" → [{ m, part: 1 }], configuration inversée (Walden, dessin retourné autour de c) ;
                                   mec "SN1" → [{ m, part: 0,5 }, { m, part: 0,5 }], les deux faces du carbocation plan.
     e2(m, a, o)                   éliminations anti-périplanaires du nucléofuge porté par a : [{ beta, m, ze, degre, a, b,
                                   newman }], une par alcène distinct (a, b : les carbones de la liaison double dans m ; newman :
                                   { avant: [X, …], arriere: [partant, …] }, indices dans le substrat, null pour un H implicite,
                                   dans l'ordre de ChimOrga.newman avec phi = 180°, partant anti de X) ; o.partant :
                                   élément éliminé sur le carbone β (défaut "H") ; degre : nombre de carbones liés aux deux
                                   carbones de la liaison double (règle de Zaïtsev : le plus grand, en général).
     groupeTexte(m, o, i)          formule condensée du groupe porté par o à travers i : "H" (i null), "CH₃", "C₂H₅".
     organomagnesien(m, c)         R–X → R–Mg–X (le magnésium s'insère entre c et l'halogène).
     additionMagnesien(rmg, carb)  R–Mg–X sur C=O, puis hydrolyse : [produit] ou [face 1, face 2] (les deux faces du carbonyle
                                   plan) ; sur O=C=O, l'acide carboxylique R–COOH. Chaque produit : { m, c (carbone attaqué) }.
     vitesseSN(k1, k2, rx, nu)     k1 [RX] + k2 [RX][Nu] (mol·L⁻¹·s⁻¹ ; k1 en s⁻¹, k2 en L·mol⁻¹·s⁻¹) : les deux voies en parallèle.
     partSN2(k1, k2, nu)           k2[Nu] / (k1 + k2[Nu]) : part de la voie SN2, ordre apparent par rapport à Nu, et excès
                                   énantiomérique du produit si la voie SN1 donne un racémique.
     Le magnésium (Mg, valence 2) rejoint les éléments lus par mol. Classe d'un carbone : classeCarbone ; polarité : polarites.
   Limites : chaînes ouvertes (une liaison α–β dans un cycle lève une erreur), un seul nucléofuge sur le carbone. */
  (() => {
    Object.assign(Z, { Mg: 12 }); Object.assign(A0, { Mg: 24 }); Object.assign(VALENCE, { Mg: 2 }); Object.assign(MASSE, { Mg: 24.305 }); Object.assign(ELECTRONS_VALENCE, { Mg: 2 });
    const NUCLEOPHILES = { HO: "O", CH3O: "O-C", HS: "S", I: "I", NC: "C#N" };
    function versSpec(m) {
      const at = m.atomes.map(a => [a.e, f1(a.x), f1(a.y)].concat(a.h !== undefined ? ["h" + a.h] : [], a.A ? ["A" + a.A] : [], a.q ? ["q" + (a.q > 0 ? "+" : "") + a.q] : []).join(" "));
      const ls = m.liaisons.map(l => l.a + (l.style === "coin" ? "w" : l.style === "hache" ? "h" : { 1: "-", 2: "=", 3: "#" }[l.ordre]) + l.b);
      return at.join("; ") + " | " + ls.join(" ");
    }
    function sansAtomes(m, ote) {
      const garde = m.atomes.map((_, i) => i).filter(i => !ote.has(i)), nv = new Map(garde.map((i, k) => [i, k]));
      return { m: { atomes: garde.map(i => Object.assign({}, m.atomes[i])), liaisons: m.liaisons.filter(l => nv.has(l.a) && nv.has(l.b))
        .map(l => Object.assign({}, l, { a: nv.get(l.a), b: nv.get(l.b) })) }, nv };
    }
    function sousArbre(m, r, interdits) {                           // atomes atteints depuis r sans passer par interdits
      const vu = new Set([r]), f = [r];
      while (f.length) { const i = f.shift(); voisins(m, i).forEach(v => { if (interdits.has(v.j)) { if (i !== r) err("cycle non pris en charge"); return; }
        if (!vu.has(v.j)) { vu.add(v.j); f.push(v.j); } }); }
      return vu;
    }
    const tourne = (p, o, th) => { const c = Math.cos(th), s = Math.sin(th), dx = p.x - o.x, dy = p.y - o.y; return { x: c * dx - s * dy, y: s * dx + c * dy }; };
    /* déplace le sous-arbre de r (porté par o) pour que la liaison o → r pointe à l'angle ang (degrés) depuis le point P */
    function placer(src, r, o, interdits, P, ang, cible) {
      const A = src.atomes[o], R = src.atomes[r], th = rad(ang) - Math.atan2(R.y - A.y, R.x - A.x);
      sousArbre(src, r, interdits).forEach(i => { const q = tourne(src.atomes[i], A, th); cible[i] = { x: P.x + q.x, y: P.y + q.y }; });
    }
    const halogene = (m, c) => { const x = voisins(m, c).filter(v => HALO.has(m.atomes[v.j].e) && m.atomes[v.j].e !== "F").sort((p, q) => Z[m.atomes[q.j].e] - Z[m.atomes[p.j].e]);
      return x[0] || err(`l'atome ${c} ne porte pas de nucléofuge (Cl, Br, I)`); };            // le plus lourd part : I > Br > Cl
    function greffer(m, c, iL, nu, P, u, style) {                   // remplace l'atome iL par le fragment nu, premier atome en P
      const frag = NUCLEOPHILES[nu] || err("nucléophile inconnu : " + nu), toks = frag.split(/([-=#])/);
      const { m: r, nv } = sansAtomes(m, new Set([iL])), c2 = nv.get(c);
      let prec = c2, dir = Math.atan2(u.y, u.x), pos = P, signe = 1;
      for (let k = 0; k < toks.length; k += 2) {
        const ordre = k ? { "-": 1, "=": 2, "#": 3 }[toks[k - 1]] : 1;
        if (k) { if (ordre === 1) { dir += signe * Math.PI / 3; signe = -signe; } pos = { x: pos.x + Math.cos(dir), y: pos.y + Math.sin(dir) }; }
        r.atomes.push({ e: toks[k], x: pos.x, y: pos.y });
        r.liaisons.push({ a: prec, b: r.atomes.length - 1, ordre, style: k ? null : style });
        prec = r.atomes.length - 1;
      }
      return mol(versSpec(r));
    }
    function sn(m, c, mec, nu) {
      const L = halogene(m, c), iL = L.j, A = m.atomes[c], B = m.atomes[iL], u = { x: B.x - A.x, y: B.y - A.y };
      const style = L.l.a === c ? L.l.style : null;
      const retenue = () => greffer(m, c, iL, nu, B, u, style);
      const inverse = () => {                                       // miroir autour de c, puis les autres centres remis en place
        let r = copie(m); r.atomes.forEach(a => { a.x = 2 * A.x - a.x; });
        r.atomes.forEach((_, i) => { if (i !== c && r.liaisons.some(l => l.a === i && l.style)) r = inverser(r, i); });
        const Bm = r.atomes[iL];
        return greffer(r, c, iL, nu, Bm, { x: Bm.x - A.x, y: Bm.y - A.y }, style);
      };
      if (mec === "SN2") return [{ m: inverse(), part: 1 }];
      if (mec === "SN1") return [{ m: inverse(), part: 0.5 }, { m: retenue(), part: 0.5 }];
      return err("mécanisme inconnu : " + mec);
    }
    /* signe du volume orienté des quatre directions (p, q, r vues depuis s) */
    const vol = (p, q, r, s) => { const u = p.map((x, k) => x - s[k]), v = q.map((x, k) => x - s[k]), w = r.map((x, k) => x - s[k]);
      return Math.sign(u[0] * (v[1] * w[2] - v[2] * w[1]) + u[1] * (v[2] * w[0] - v[0] * w[2]) + u[2] * (v[0] * w[1] - v[1] * w[0])); };
    /* chiralité de (p, q, r, s) autour de i, d'après le dessin ; une place null (hydrogène implicite) est complétée ; 0 : dessin plan */
    function chiralite(m, i, places) {
      const d = places.map(j => j === null ? null : direction(m, i, j)), vide = d.filter(x => x === null).length;
      if (vide > 1) return 0;
      if (vide === 1) { const s = d.filter(Boolean).reduce((t, v) => t.map((x, k) => x + v[k]), [0, 0, 0]); d[d.indexOf(null)] = s.map(x => -x); }
      return d.every(v => Math.abs(v[2]) < 1e-9) ? 0 : vol(d[0], d[1], d[2], d[3]);
    }
    const NEW = (ang, z) => [Math.cos(rad(ang)), Math.sin(rad(ang)), z];   // Newman : α devant (z > 0), β derrière en (0, 0, −1)
    function e2(m, a, o) {
      o = o || {};
      const partant = o.partant || "H", X = halogene(m, a).j;
      const autresA = voisins(m, a).map(v => v.j).filter(j => j !== X), out = [];
      /* α : X à 90°, sa[0] à −30°, sa[1] à 210° ; β : partant à −90° (anti), rb[0] à 150°, rb[1] à 30° */
      const modA = vol(NEW(90, 1 / 3), NEW(-30, 1 / 3), NEW(210, 1 / 3), [0, 0, -1]);
      const modB = vol(NEW(-90, -1 / 3), NEW(150, -1 / 3), NEW(30, -1 / 3), [0, 0, 1]);
      autresA.filter(b => m.atomes[b].e === "C").forEach(b => {
        if (m.liaisons.find(l => (l.a === a && l.b === b) || (l.a === b && l.b === a)).ordre !== 1) return;
        const sa = autresA.filter(j => j !== b), sb = voisins(m, b).map(v => v.j).filter(j => j !== a);
        while (sa.length < 2) sa.push(null);
        const cands = sb.filter(j => m.atomes[j].e === partant).map(j => ({ h: j, reste: sb.filter(k => k !== j) }));
        if (partant === "H" && hydrogenes(m, b) > 0) cands.push({ h: null, reste: sb.slice() });
        cands.forEach(cd => {
          const rb = cd.reste.slice(); while (rb.length < 2) rb.push(null);
          const chA = chiralite(m, a, [X, sa[0], sa[1], b]);
          const chB = rb[0] === null && rb[1] === null ? 1 : chiralite(m, b, [cd.h, rb[0], rb[1], a]);
          const choixA = chA ? [chA === modA ? sa : [sa[1], sa[0]]] : [sa, [sa[1], sa[0]]];
          const deuxH = cd.h === null && hydrogenes(m, b) >= 2;      // le partant et une place sont deux H implicites : deux choix
          const choixB = deuxH || !chB ? [rb, [rb[1], rb[0]]] : [chB === modB ? rb : [rb[1], rb[0]]];
          const ancien = new Map();
          choixA.forEach(pa => choixB.forEach(pb => {
            const { m: r, nv } = sansAtomes(m, new Set([X].concat(cd.h === null ? [] : [cd.h])));
            nv.forEach((k, i) => ancien.set(k, i));
            const pos = [], interdits = new Set([a, b]);
            pos[a] = { x: 0, y: 0 }; pos[b] = { x: 1, y: 0 };
            /* cis : α à −30° avec β à 30° ; dessin : α à gauche, β à droite, sa[0] et rb[1] en haut */
            [[pa[0], a, 120], [pa[1], a, 240], [pb[1], b, 60], [pb[0], b, 300]].forEach(([j, o2, ang]) => { if (j !== null) placer(m, j, o2, interdits, pos[o2], ang, pos); });
            r.atomes.forEach((at, k) => { const p = pos[ancien.get(k)]; if (p) { at.x = p.x; at.y = p.y; } delete at.h; });
            r.liaisons.forEach(l => { const ia = ancien.get(l.a), ib = ancien.get(l.b);
              if (ia === a || ia === b || ib === a || ib === b) l.style = null;
              if ((ia === a && ib === b) || (ia === b && ib === a)) l.ordre = 2; });
            const p = mol(versSpec(r)), A2 = nv.get(a), B2 = nv.get(b);
            const ze = descripteurZE(p, A2, B2), degre = [A2, B2].reduce((s, i) => s + voisins(p, i).filter(v => v.j !== A2 && v.j !== B2 && p.atomes[v.j].e === "C").length, 0);
            if (!out.some(q => relationStereo(q.m, p) === "identiques"))   // un alcène par produit distinct
              out.push({ beta: b, m: p, ze, degre, a: A2, b: B2, newman: { avant: [X, pa[0], pa[1]], arriere: [cd.h, pb[0], pb[1]] } });
          }));
        });
      });
      return out;
    }
    function organomagnesien(m, c) {
      const L = halogene(m, c), A = m.atomes[c], B = m.atomes[L.j], u = { x: B.x - A.x, y: B.y - A.y }, n = Math.hypot(u.x, u.y) || 1;
      const r = copie(m), x = r.atomes[L.j].e;
      r.atomes[L.j] = { e: "Mg", x: B.x, y: B.y };
      r.atomes.push({ e: x, x: B.x + u.x / n, y: B.y + u.y / n });
      r.liaisons.push({ a: L.j, b: r.atomes.length - 1, ordre: 1, style: null });
      return mol(versSpec(r));
    }
    function additionMagnesien(rmg, carb) {
      const g = rmg.atomes.findIndex(a => a.e === "Mg"); if (g < 0) err("organomagnésien sans magnésium");
      const rc = (voisins(rmg, g).find(v => rmg.atomes[v.j].e === "C") || err("organomagnésien sans carbone")).j;
      const co = carb.liaisons.find(l => l.ordre === 2 && [carb.atomes[l.a].e, carb.atomes[l.b].e].sort().join() === "C,O") || err("pas de C=O");
      const k = carb.atomes[co.a].e === "C" ? co.a : co.b, oA = co.a === k ? co.b : co.a;
      const s = voisins(carb, k).map(v => v.j).filter(j => j !== oA), plan = voisins(carb, k).some(v => v.j !== oA && v.ordre === 2);
      return (plan ? [0] : [1, -1]).map(face => {
        const at = [], ls = [], pos = [], ang = plan ? [210] : [210, -10];
        pos[k] = { x: 0, y: 0 }; pos[oA] = { x: 0, y: 1 };
        s.forEach((j, q) => placer(carb, j, k, new Set([k]), pos[k], ang[q], pos));
        carb.atomes.forEach((a0, i) => at.push({ e: a0.e, x: pos[i] ? pos[i].x : a0.x, y: pos[i] ? pos[i].y : a0.y, A: a0.A }));
        carb.liaisons.forEach(l => ls.push({ a: l.a, b: l.b, ordre: l === co ? 1 : l.ordre, style: l.a === k || l.b === k ? null : l.style }));
        if (!plan && s.length > 1) { const l2 = ls.find(l => (l.a === k && l.b === s[1]) || (l.b === k && l.a === s[1])); l2.a = k; l2.b = s[1]; l2.style = face > 0 ? "hache" : "coin"; }
        const cible = [], ia = new Set([g]);
        placer(rmg, rc, g, ia, pos[k], plan ? -30 : s.length > 1 ? -60 : -10, cible);
        const garde = [...sousArbre(rmg, rc, ia)], map = new Map(garde.map((i, q) => [i, at.length + q]));
        garde.forEach(i => at.push({ e: rmg.atomes[i].e, x: cible[i].x, y: cible[i].y, A: rmg.atomes[i].A }));
        rmg.liaisons.forEach(l => { if (map.has(l.a) && map.has(l.b)) ls.push({ a: map.get(l.a), b: map.get(l.b), ordre: l.ordre, style: l.style }); });
        ls.push({ a: k, b: map.get(rc), ordre: 1, style: plan ? null : face > 0 ? "coin" : "hache" });
        return { m: mol(versSpec({ atomes: at, liaisons: ls })), c: k };
      });
    }
    const vitesseSN = (k1, k2, rx, nu) => k1 * rx + k2 * rx * nu;
    const partSN2 = (k1, k2, nu) => { const d = k1 + k2 * nu; return d > 0 ? k2 * nu / d : err("k1 + k2 [Nu] doit être positif"); };
    Object.assign(MOLECULES, {
      /* nucléofuge à droite, les trois autres groupes vers la gauche : le dessin de l'attaque SN2 */
      bromomethane: "C 0 0; Br 1 0 | 0-1",
      bromoethane: "C 0 0; Br 1 0; C -0.5 0.866 | 0-1 0-2",
      bromobutane: "C 0 0; Br 1 0; C -0.5 0.866; C -1.5 0.866; C -0.35 -0.94; H -0.94 -0.34 | 0-1 0-2 2-3 0h4 0w5",
      bromofluoroethane: "C 0 0; Br 1 0; F -0.5 0.866; C -0.35 -0.94; H -0.94 -0.34 | 0-1 0-2 0w3 0h4",
      bromomethylhexane: "C 0 0; Br 1 0; C -0.5 0.866; C -1.5 0.866; C -0.35 -0.94; C -0.94 -0.34; C -1.8 -0.84; C -2.67 -0.34 | 0-1 0-2 2-3 0w4 0h5 5-6 6-7",
      bromobenzene: "C 0 0; Br 1 0; C -0.5 0.866; C -1.5 0.866; C -2 0; C -1.5 -0.866; C -0.5 -0.866 | 0-1 0=2 2-3 3=4 4-5 5=6 6-0",
      /* éliminations : chaîne en zigzag, nucléofuge en coin */
      bromomethylpentane: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; C 2.598 -0.5; Br 0 1; C 0.866 -1.5 | 0-1 1-2 2-3 3-4 1w5 2w6",
      dibromobutane: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; Br 0 1; Br 0.866 -1.5 | 0-1 1-2 2-3 1w4 2w5",
      bromomethylbutane: "C -0.866 -0.5; C 0 0; C 0.866 -0.5; C 1.732 0; Br 0 1; C 0 -1 | 0-1 1-2 2-3 1-4 1-5",
      /* carbonyles (méthanal, éthanal, butanone et dioxyde de carbone sont plus haut) */
      propanone: "C 0 0; O 0 1; C -0.866 -0.5; C 0.866 -0.5 | 0=1 0-2 0-3",
      benzaldehyde: "C 0 0; O 0 1; C -0.866 -0.5; C -0.866 -1.5; C -1.732 -2; C -2.598 -1.5; C -2.598 -0.5; C -1.732 0 | 0=1 0-2 2=3 3-4 4=5 5-6 6=7 7-2",
    });
    /* formule condensée du groupe porté par o à travers l'atome i (null : un H implicite) : "H", "Br", "CH₃", "C₂H₅" */
    function groupeTexte(m, o, i) {
      if (i === null) return "H";
      const f = {};
      sousArbre(m, i, new Set([o])).forEach(k => { const e = m.atomes[k].e; f[e] = (f[e] || 0) + 1; const h = hydrogenes(m, k); if (h) f.H = (f.H || 0) + h; });
      return ecrireFormule(f);
    }
    Object.assign(api, { NUCLEOPHILES, versSpec, sn, e2, groupeTexte, organomagnesien, additionMagnesien, vitesseSN, partSN2 });
  })();

  /* ---------- étape « Amines et sels de diazonium » (chim-amines-diazonium) ; tests : test/chim-organique-amines.test.js ----------
     successives(k, nR)                 A₀ → A₁ → … → Aₙ par un réactif commun R (Aᵢ + R → Aᵢ₊₁, k[i]) : fractions finales, R restant.
     DIAZONIUM, kDiazonium(T), perteDiazonium(T, t)   hydrolyse du benzènediazonium (ordre 1, Arrhenius) : k (s⁻¹), part perdue en t.
     PKA_COUPLAGE, formeReactive(id, pH)   part du partenaire de couplage sous sa forme qui réagit (phénolate, amine libre).
     transmissionSolution(b, c, l)      λ ↦ 10^(−ε(λ) ℓ c) d'une bande Spectro.bande : le spectre que la page donne à
                                        CouleursOptiques.couleurSpectre (la teinte vue). Aucune dépendance de plus que constantes.js. */
  {
    const fini = (x, nom) => (typeof x === "number" && isFinite(x) ? x : err(nom + " doit être un nombre fini"));

    /* Chaîne A₀ → A₁ → … → Aₙ : Aᵢ + R → Aᵢ₊₁, vitesse k[i] [Aᵢ][R], irréversible ; au départ A₀ = 1 et nR équivalents de R. Toutes
       les vitesses portent [R] : avec dτ = [R] dt la chaîne devient linéaire, et l'état final ne dépend que des rapports des k.
       Runge-Kutta d'ordre 4 en τ, pas 0,02/max k ; R = nR − Σ i Aᵢ s'annule dans le dernier pas, raffiné par dichotomie.
       Mélange homogène, actes de même ordre en R, sans retour. Renvoie { A: [A₀ … Aₙ], R: équivalents restants }. */
    function successives(k, nR) {
      if (!Array.isArray(k) || !k.length || !k.every(x => fini(x, "k") > 0)) err("successives : constantes k > 0 attendues");
      if (!(fini(nR, "nR") >= 0)) err("successives : nR ≥ 0 attendu");
      const n = k.length, reste = A => nR - A.reduce((s, a, i) => s + i * a, 0);
      if (nR >= n) return { A: k.map(() => 0).concat([1]), R: nR - n };
      const f = A => A.map((a, i) => (i ? k[i - 1] * A[i - 1] : 0) - (i < n ? k[i] * a : 0));
      const pas = (A, h) => {
        const k1 = f(A), k2 = f(A.map((a, i) => a + h / 2 * k1[i])), k3 = f(A.map((a, i) => a + h / 2 * k2[i])), k4 = f(A.map((a, i) => a + h * k3[i]));
        return A.map((a, i) => a + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      };
      const h = 0.02 / Math.max(...k);
      let A = [1].concat(k.map(() => 0));
      for (let it = 0; it < 2e6; it++) {
        const B = pas(A, h);
        if (reste(B) <= 0) {
          let lo = 0, hi = h;
          for (let j = 0; j < 60; j++) { const m = (lo + hi) / 2; if (reste(pas(A, m)) > 0) lo = m; else hi = m; }
          const F = pas(A, (lo + hi) / 2);
          return { A: F.map(a => Math.max(0, a)), R: 0 };
        }
        A = B;
      }
      return err("successives : pas de fin en 2 × 10⁶ pas (rapports des k trop grands)");
    }

    /* Hydrolyse du benzènediazonium en solution acide diluée, ArN₂⁺ + H₂O → ArOH + N₂ + H⁺ : ordre 1, k = ln 2/t½. Ancrage :
       t½ ≈ 30 min à 313 K et 8 min à 323 K (J. E. Sheats et K. G. Harbison, J. Chem. Educ. 47, 779 (1970), d'après E. A.
       Moelwyn-Hughes et P. Johnson, Trans. Faraday Soc. 36, 948 (1940)) ; Ea publiée : 27,1 à 28,2 kcal·mol⁻¹, soit 113 à
       118 kJ·mol⁻¹ ; 115 kJ·mol⁻¹ retenu. Mesures entre 308 et 328 K : en dessous, une extrapolation par Arrhenius. */
    const DIAZONIUM = Object.freeze({ Tref: 313.15, t12ref: 30 * 60, Ea: 115e3, mesures: Object.freeze([308.15, 328.15]) });
    function kDiazonium(T, o) {
      const d = Object.assign({}, DIAZONIUM, o || {}), R = K().R;
      if (!(fini(T, "T") > 0)) err("kDiazonium : T > 0 attendu");
      return Math.LN2 / d.t12ref * Math.exp(-d.Ea / R * (1 / T - 1 / d.Tref));   // Arrhenius, A = k(Tref) e^(Ea/RTref)
    }
    const perteDiazonium = (T, t, o) => { if (!(fini(t, "t") >= 0)) err("perteDiazonium : t ≥ 0 attendu"); return -Math.expm1(-kDiazonium(T, o) * t); };

    /* Partenaires d'un couplage azoïque : seule la forme activée réagit (le phénolate, l'amine libre). pKa dans l'eau à 298 K :
       2-naphtol 9,51 (PubChem) ; ion anilinium 4,63 (OpenStax, Organic Chemistry, § 24.4). Part de la forme basique d'un
       monoacide, 1/(1 + 10^(pKa − pH)) : activités = concentrations, solution diluée. */
    const PKA_COUPLAGE = Object.freeze({ naphtol: 9.51, aniline: 4.63 });
    function formeReactive(id, pH) {
      const p = PKA_COUPLAGE[id]; if (p === undefined) err("partenaire de couplage inconnu : " + id);
      return 1 / (1 + Math.pow(10, p - fini(pH, "pH")));
    }

    /* Transmission T(λ) = 10^(−ε(λ) ℓ c) de ℓ (m) d'une solution c (mol·m⁻³) d'un soluté à une bande b = { lambda0, largeur,
       epsMax } (Spectro.bande, ε en m²·mol⁻¹), solvant transparent : la fonction que CouleursOptiques.couleurSpectre attend. */
    function transmissionSolution(b, c, l) {
      if (!(fini(c, "c") >= 0) || !(fini(l, "ℓ") >= 0)) err("transmissionSolution : c ≥ 0 et ℓ ≥ 0 attendus");
      return lam => Math.pow(10, -SPECTRO.bande(b, lam) * l * c);
    }

    Object.assign(api, { successives, DIAZONIUM, kDiazonium, perteDiazonium, PKA_COUPLAGE, formeReactive, transmissionSolution });
  }

  /* ---------- étape « Activation et protection » (chim-activation-protection) ; tests : test/chim-organique-activation.test.js ----------
     PKA_ACTIVATION                 pKa dans l'eau à 298 K (convention a(H₂O) = 1 : pKa(H₂O) = 14,0, pKa(H₃O⁺) = 0,0).
     BASES_ALCOOLATE, deprotonation(alcool, base, eq)   ROH + B ⇌ RO⁻ + BH : { K, x } (x : fraction d'alcool déprotonée) ;
                                    Na et NaH : réaction totale (H₂ quitte le milieu), K = Infinity.
     voieWilliamson(classe)         R–X + R'O⁻ selon la classe du carbone de R–X : "SN2", "SN2-E2", "E2" ou "aucune".
     NUCLEOFUGES, fractionProtonee(pKa, h)   groupe partant et pKa de son acide conjugué ; h/(h + Ka), h activité de H⁺.
     substituerSN2(m, c, j, e)      SN2 sur le carbone c : l'atome j (nucléofuge) devient e, configuration de c inversée.
     acetalisation(o)               carbonyle + diol ⇌ acétal cyclique + eau (Δn = 0), o = { K, carbonyle, diol, eau, retrait } :
                                    { x, rendement } (esterification, même équation).
     AZEOTROPES, condensatMinimal(nEau, solvant)   hétéroazéotropes avec l'eau ; masse de condensat (kg) qui emporte nEau mol.
     GLUCOSE, fractionBeta(alpha)   pouvoirs rotatoires spécifiques des anomères ; fraction de β-pyranose tirée de [α] mesuré.
     MECANISMES_ACTIVATION, actesActivation(id, o)   actes { spec, fleches } dessinés par schema (williamson, hbr, acetal).
     GROUPES_PROTECTION, REACTIFS_PROTECTION, sequence(groupes, etapes)   banque de réactions : chaque réactif transforme,
                                    laisse ou détruit chaque groupe ; journal pas à pas, échec au premier groupe détruit.
     rendementGlobal(etapes), rendementConvergent(a, b)   Π ηᵢ ; branche la plus faible des deux, puis l'étape commune.
     deconnecter(m, a, b), CIBLES_RETRO   coupure d'une liaison C–O d'éther (Williamson) ou C–C d'un carbinol (organomagnésien) :
                                    synthons, équivalents synthétiques dessinables, verdict. */
  (() => {
    if (!("Na" in MASSE)) MASSE.Na = 22.990;                     // g·mol⁻¹, IUPAC : alcoolates de sodium, jamais dessinés
    /* pKa dans l'eau, 298 K. Alcools, phénol, eau, H₃O⁺, MeOH₂⁺ : table de Ripin et Evans (ACS, Organic Division) ; éthanol 15,9
       (tables usuelles, 16 chez Williams) ; HBr −9 (Bell, The Proton in Chemistry, 1973) ; acide méthanesulfonique −1,9 (Guthrie,
       1978) ; acide paratoluènesulfonique −1,3 (Serjeant et Dempsey, IUPAC, 1979 ; d'autres tables donnent −2,8) ;
       HCO₃⁻/CO₃²⁻ 10,33 (ChimSolutions). Hors de l'eau, ces nombres ne donnent que l'ordre : l'écart se garde mieux que la valeur. */
    const PKA_ACTIVATION = Object.freeze({ methanol: 15.5, ethanol: 15.9, tbutanol: 17.0, phenol: 9.95, eau: 14.0, oxonium: 0.0,
      methyloxonium: -2.2, hbr: -9, msoh: -1.9, tsoh: -1.3, hydrogenocarbonate: 10.33 });
    const BASES_ALCOOLATE = Object.freeze({ carbonate: PKA_ACTIVATION.hydrogenocarbonate, hydroxyde: PKA_ACTIVATION.eau, sodium: null, hydrure: null });
    function deprotonation(alcool, base, eq) {
      if (!(alcool in PKA_ACTIVATION)) err("deprotonation : alcool inconnu : " + alcool);
      if (!(base in BASES_ALCOOLATE)) err("deprotonation : base inconnue : " + base);
      eq = eq === undefined ? 1 : eq;
      if (!(eq > 0)) err("deprotonation : eq > 0 attendu");
      const pb = BASES_ALCOOLATE[base];
      if (pb === null) return { K: Infinity, x: Math.min(1, eq), totale: true };    // H₂ dégagé : la réaction inverse n'a plus lieu
      return { K: Math.pow(10, pb - PKA_ACTIVATION[alcool]), x: api.fractionDeprotonee(PKA_ACTIVATION[alcool], pb, eq), totale: false };
    }
    /* Tendance des manuels pour R–X + alcoolate (base forte et bon nucléophile) : SN2 sur un méthyle ou un primaire, SN2 et E2
       en concurrence sur un secondaire, E2 sur un tertiaire, aucune SN2 sur un carbone vinylique ou aromatique. */
    function voieWilliamson(classe) {
      const v = { methyle: "SN2", primaire: "SN2", secondaire: "SN2-E2", tertiaire: "E2", vinylique: "aucune" }[classe];
      return v || err("voieWilliamson : classe inconnue : " + classe);
    }
    /* Groupe partant : plus son acide conjugué est fort (pKa bas), plus il part facilement. */
    const NUCLEOFUGES = Object.freeze({ hydroxyde: PKA_ACTIVATION.eau, eau: PKA_ACTIVATION.oxonium, mesylate: PKA_ACTIVATION.msoh,
      tosylate: PKA_ACTIVATION.tsoh, bromure: PKA_ACTIVATION.hbr });
    function fractionProtonee(pKa, h) {
      if (!(h > 0) || !isFinite(pKa)) err("fractionProtonee : h > 0 et pKa fini");
      return h / (h + Math.pow(10, -pKa));
    }
    /* SN2 dessinée : le nucléophile prend la place du nucléofuge j, coins de c échangés (inversion de Walden). j perd ses
       autres voisins (le groupe tosyle, s'il est dessiné, part avec lui) ; ses hydrogènes sont ceux de e. */
    function substituerSN2(m, c, j, e) {
      if (!voisins(m, c).some(v => v.j === j)) err("substituerSN2 : j n'est pas lié à c");
      if (!(e in Z)) err("substituerSN2 : élément inconnu : " + e);
      const part = new Set(), pile = [j];
      while (pile.length) { const i = pile.pop(); part.add(i); voisins(m, i).forEach(v => { if (v.j !== c && !part.has(v.j)) pile.push(v.j); }); }
      part.delete(j);
      const r = inverser(m, c), garde = r.atomes.map((_, i) => i).filter(i => !part.has(i)), nv = new Map(garde.map((i, k) => [i, k]));
      const atomes = garde.map(i => { const a = Object.assign({}, r.atomes[i]); if (i === j) { a.e = e; delete a.h; delete a.q; } return a; });
      return { atomes, liaisons: r.liaisons.filter(l => nv.has(l.a) && nv.has(l.b)).map(l => Object.assign({}, l, { a: nv.get(l.a), b: nv.get(l.b) })) };
    }
    /* carbonyle + diol ⇌ acétal + eau : un réactif et un produit de chaque côté, comme l'estérification ; Q ne dépend pas du
       volume (Δn = 0) : quantités, concentrations et fractions molaires donnent le même K. */
    const acetalisation = o => api.esterification({ K: o.K, acide: o.carbonyle, alcool: o.diol, ester: o.acetal || 0, eau: o.eau || 0, retrait: o.retrait || 0 });
    /* Hétéroazéotropes avec l'eau à 101,325 kPa : température d'ébullition (K) et fraction massique d'eau de la vapeur
       (CRC Handbook, 44ᵉ éd., et Lange, 10ᵉ éd.) : toluène 84,1 °C, 20,2 % ; cyclohexane 69,8 °C, 8,5 %. */
    const AZEOTROPES = Object.freeze({ toluene: { T: 357.25, wEau: 0.202 }, cyclohexane: { T: 342.95, wEau: 0.085 } });
    const M_EAU = 18.015e-3;                                       // kg·mol⁻¹
    function condensatMinimal(nEau, solvant) {
      const a = AZEOTROPES[solvant] || err("condensatMinimal : solvant inconnu : " + solvant);
      if (!(nEau >= 0)) err("condensatMinimal : nEau ≥ 0");
      return nEau * M_EAU / a.wEau;
    }
    /* D-glucose dans l'eau, 20 °C, raie D du sodium : [α] en °·dm⁻¹·g⁻¹·mL. β : 18,7 (d'autres tables donnent 17,5). */
    const GLUCOSE = Object.freeze({ alpha: 112.2, beta: 18.7, equilibre: 52.7 });
    /* D-glucose : chaîne ouverte (2R,3S,4R,5R) et pyranoses vus du dessus de la projection de Haworth (coin plein : groupe
       au-dessus du cycle) ; descripteurs de PubChem : β (2R,3R,4S,5S,6R), α (2S,…) dans la numérotation de l'oxane. */
    const PYRANOSE = c1 => "C 1 0; C 0.5 -0.866; C -0.5 -0.866; C -1 0; C -0.5 0.866; O 0.5 0.866; O 2 0; O 1 -1.732; O -1 -1.732; O -2 0; C -1 1.732; O -2 1.732 | 0-1 1-2 2-3 3-4 4-5 5-0 0" + c1 + "6 1h7 2w8 3h9 4w10 10-11";
    Object.assign(MOLECULES, { glucoseOuvert: "O -0.866 0.5; C 0 0; C 0.866 0.5; C 1.732 0; C 2.598 0.5; C 3.464 0; C 4.33 0.5; O 4.33 1.5; O 0.866 1.5; O 1.732 -1; O 2.598 1.5; O 3.464 -1 | 0=1 1-2 2-3 3-4 4-5 5-6 6-7 2h8 3h9 4h10 5w11",
      betaGlucopyranose: PYRANOSE("w"), alphaGlucopyranose: PYRANOSE("h") });
    function fractionBeta(alpha, g) {
      g = g || GLUCOSE;
      if (!isFinite(alpha)) err("fractionBeta : [α] fini attendu");
      return (g.alpha - alpha) / (g.alpha - g.beta);
    }

    /* Mécanismes limites, acte par acte. H⁺ : « H q+1 », sans voisin. */
    const MECANISMES_ACTIVATION = {
      williamson: [                                                   // éthanolate + iodométhane → méthoxyéthane + I⁻
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0 q-1; C 2.9 0; I 3.9 0 | 0-1 1-2 3-4", fleches: [{ de: 2, vers: 3 }, { de: [3, 4], vers: 4 }] },
      ],
      hbr: [                                                          // éthanol + HBr : protonation, puis SN2 sur l'ion alkyloxonium
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0; H 2.6 0.5; Br 3.5 0 | 0-1 1-2 3-4", fleches: [{ de: 2, vers: [2, 3] }, { de: [3, 4], vers: 4 }] },
        { spec: "Br -0.9 1.2 q-1; C 0 0; C 0.866 0.5; O 1.732 0 q+1; H 2.6 0.5 | 1-2 2-3 3-4", fleches: [{ de: 0, vers: 2 }, { de: [2, 3], vers: 3 }] },
      ],
      acetal: [                                                       // éthanal + 2 méthanol, catalyse acide
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0; H 2.6 0.5 q+1 | 0-1 1=2", fleches: [{ de: 2, vers: [2, 3] }] },
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0 q+1; H 2.6 0.5; O 0.866 1.9; C 0 2.4 | 0-1 1=2 2-3 4-5", fleches: [{ de: 4, vers: 1 }, { de: [1, 2], vers: 2 }] },
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0; H 2.6 0.5; O 0.866 1.5 q+1 h0; C 0 2; H 1.732 2 | 0-1 1-2 2-3 1-4 4-5 4-6", fleches: [{ de: [4, 6], vers: 4 }] },
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0; H 2.6 0.5; O 0.866 1.5; C 0 2; H 2.6 -0.9 q+1 | 0-1 1-2 2-3 1-4 4-5", fleches: [{ de: 2, vers: [2, 6] }] },
        { spec: "C 0 0; C 0.866 0.5; O 1.732 0 q+1; H 2.6 0.5; O 0.866 1.5; C 0 2; H 1.732 -1 | 0-1 1-2 2-3 1-4 4-5 2-6", fleches: [{ de: 4, vers: [4, 1] }, { de: [1, 2], vers: 2 }] },
        { spec: "C 0 0; C 0.866 0.5; O 0.866 1.5 q+1; C 0 2; O 1.9 -0.3; C 2.8 0.2 | 0-1 1=2 2-3 4-5", fleches: [{ de: 4, vers: 1 }, { de: [1, 2], vers: 2 }] },
        { spec: "C 0 0; C 0.866 0.5; O 0.866 1.5; C 0 2; O 1.732 0 q+1 h0; C 2.598 0.5; H 2.6 -1.2 | 0-1 1-2 2-3 1-4 4-5 4-6", fleches: [{ de: [4, 6], vers: 4 }] },   // H loin de O : au bilan, son ⊕ ne se lit pas sur l'acétal
      ],
    };
    function actesActivation(id, o) {
      const actes = MECANISMES_ACTIVATION[id] || err("mécanisme inconnu : " + id);
      const vus = actes.map(a => api.schema(mol(a.spec), Object.assign({}, o, { fleches: a.fleches })));
      return vus.concat([api.schema(vus[vus.length - 1].apres.m, Object.assign({}, o, { fleches: [] }))]);
    }

    /* Banque de réactions : pour chaque réactif, ce que devient chaque groupe. Une chaîne : le groupe devient ce groupe ;
       "stable" : il reste ; "detruit" : réaction parasite, la séquence échoue. incompatibles : groupes qui ne peuvent coexister
       dans la molécule avec le groupe formé (un organomagnésien attaque un carbonyle, est détruit par un H acide). */
    const GROUPES_PROTECTION = ["carbonyle", "acetal", "alcool", "etherBenzylique", "etherSilyle", "halogenoalcane", "organomagnesien"];
    const REACTIFS_PROTECTION = Object.freeze({
      diol: { carbonyle: "acetal", organomagnesien: "detruit" },                       // éthane-1,2-diol, APTS, Dean-Stark
      acide: { acetal: "carbonyle", etherSilyle: "alcool", organomagnesien: "detruit" }, // H₃O⁺ dilué
      magnesium: { halogenoalcane: "organomagnesien", incompatibles: ["carbonyle", "alcool"] },
      aldehyde: { organomagnesien: "alcool", carbonyle: "stable" },                    // éthanal, puis hydrolyse acide douce
      nabh4: { carbonyle: "alcool" },
      benzylation: { alcool: "etherBenzylique", organomagnesien: "detruit" },          // NaH puis bromure de benzyle (Williamson)
      hydrogenolyse: { etherBenzylique: "alcool" },                                    // H₂, Pd/C
      silylation: { alcool: "etherSilyle", organomagnesien: "detruit" },               // chlorure de tert-butyldiméthylsilyle, base
      fluorure: { etherSilyle: "alcool", organomagnesien: "detruit" },
    });
    function effet(reactif, g) {
      const r = REACTIFS_PROTECTION[reactif] || err("réactif inconnu : " + reactif);
      if (!GROUPES_PROTECTION.includes(g)) err("groupe inconnu : " + g);
      return r[g] || "stable";
    }
    /* groupes : liste (un groupe peut figurer deux fois) ; etapes : réactifs dans l'ordre. Journal : { reactif, groupes,
       changes: [[avant, apres]], echec: null | { groupe, raison: "detruit" | "incompatible", avec } } ; s'arrête au premier échec. */
    function sequence(groupes, etapes) {
      let g = groupes.slice();
      const journal = [];
      for (const r of etapes) {
        const changes = [], suivant = [];
        let echec = null;
        g.forEach(x => { const e = effet(r, x); if (e === "detruit") echec = echec || { groupe: x, raison: "detruit" };
          else if (e === "stable") suivant.push(x); else { changes.push([x, e]); suivant.push(e); } });
        const inc = REACTIFS_PROTECTION[r].incompatibles || [];
        changes.forEach(([, apres]) => { const autre = suivant.find(x => inc.includes(x)); if (apres === "organomagnesien" && autre) echec = echec || { groupe: apres, raison: "incompatible", avec: autre }; });
        journal.push({ reactif: r, groupes: suivant, changes, echec });
        if (echec) break;
        g = suivant;
      }
      return { journal, final: g, reussi: journal.every(j => !j.echec) };
    }
    /* Exacte : le rendement global d'étapes successives est le produit des rendements. Convergente : deux branches préparées
       séparément, réunies par une étape ; le rendement par rapport au réactif de chaque branche est le produit le long de sa branche. */
    function rendementGlobal(etapes) {
      if (!Array.isArray(etapes) || etapes.some(e => !(e >= 0 && e <= 1))) err("rendementGlobal : rendements dans [0, 1]");
      return etapes.reduce((p, e) => p * e, 1);
    }
    const rendementConvergent = (a, b, fin) => Math.min(rendementGlobal(a), rendementGlobal(b)) * (fin === undefined ? 1 : fin);

    /* Rétrosynthèse : couper la liaison a–b de la cible m.
       Liaison C–O d'un éther : O garde la charge −, l'autre carbone devient R⁺ (synthons) ; équivalents : alcoolate (phénolate si
       O est lié à un carbone aromatique), halogénure R–Br ; verdict selon la classe de R–Br (voieWilliamson).
       Liaison C–C dont un carbone porte un OH (carbinol) : ce carbone devient C⁺ (équivalent : le carbonyle), l'autre C⁻
       (équivalent : l'organomagnésien R–MgBr) ; verdict "proteger" si le fragment nucléophile porte un carbonyle ou un OH,
       "chimioselectivite" si le fragment électrophile porte un autre carbonyle. Autre liaison : erreur. */
    function fragment(m, A, ajouts) {
      const idx = [...A].sort((x, y) => x - y), nv = new Map(idx.map((i, k) => [i, k]));
      const atomes = idx.map(i => { const a = Object.assign({}, m.atomes[i]); a.h = hydrogenes(m, i); return a; });
      const liaisons = m.liaisons.filter(l => nv.has(l.a) && nv.has(l.b)).map(l => Object.assign({}, l, { a: nv.get(l.a), b: nv.get(l.b) }));
      (ajouts || []).forEach(f => f(atomes, liaisons, nv));
      return { atomes, liaisons, nv };
    }
    const formuleIon = (f, q) => ecrireFormule(f) + (q > 0 ? "⁺" : "⁻");
    function deconnecter(m, a, b) {
      const l = m.liaisons.find(x => (x.a === a && x.b === b) || (x.a === b && x.b === a));
      if (!l || l.ordre !== 1) err("deconnecter : a–b doit être une liaison simple");
      const coupe = (i, j) => (i === a && j === b) || (i === b && j === a);
      const comp = d => { const vu = new Set([d]), p = [d]; while (p.length) { const i = p.pop(); voisins(m, i).forEach(v => { if (!coupe(i, v.j) && !vu.has(v.j)) { vu.add(v.j); p.push(v.j); } }); } return vu; };
      const A = comp(a);
      if (A.has(b)) err("deconnecter : la liaison est dans un cycle");
      const B = comp(b), ea = m.atomes[a].e, eb = m.atomes[b].e;
      const oh = i => voisins(m, i).find(v => v.ordre === 1 && m.atomes[v.j].e === "O" && hydrogenes(m, v.j) === 1);
      const pos = i => ({ x: m.atomes[i].x, y: m.atomes[i].y });
      const ajouteAtome = (e, p, lie, ordre, h) => (atomes, liaisons, nv) => { const k = atomes.length, at = { e, x: p.x, y: p.y }; if (h !== undefined) at.h = h;
        atomes.push(at); liaisons.push({ a: nv.get(lie), b: k, ordre, style: null }); };
      const carbonyles = (F, sauf) => F.atomes.some((at, i) => i !== sauf && at.e === "C" && F.liaisons.some(x => x.ordre === 2 && (x.a === i || x.b === i) && F.atomes[x.a === i ? x.b : x.a].e === "O"));
      const ohLibre = F => F.atomes.some((at, i) => at.e === "O" && at.h === 1);
      if ((ea === "O") !== (eb === "O") && [ea, eb].every(e => e === "O" || e === "C")) {
        const o = ea === "O" ? a : b, c = o === a ? b : a, O = o === a ? A : B, Cc = o === a ? B : A;
        const autre = voisins(m, o).find(v => v.j !== c);
        if (!autre || m.atomes[autre.j].e !== "C") err("deconnecter : l'oxygène n'est pas celui d'un éther");
        const nuc = fragment(m, O, [(at, li, nv) => { const x = at[nv.get(o)]; x.q = -1; delete x.h; }]);
        const elec = fragment(m, Cc, [ajouteAtome("Br", pos(o), c, 1)]);
        const classe = api.classeCarbone(elec, elec.nv.get(c)), voie = voieWilliamson(classe);
        const phenolate = api.classeCarbone(m, autre.j) === "vinylique";
        return { type: "williamson", nucleophile: { m: nuc, synthon: formuleIon(formuleBrute(fragment(m, O)), -1), equivalent: phenolate ? "phenolate" : "alcoolate", atome: nuc.nv.get(o) },
          electrophile: { m: elec, synthon: formuleIon(formuleBrute(fragment(m, Cc)), 1), equivalent: "halogenure", classe, atome: elec.nv.get(c) },
          voie, verdict: voie === "SN2" ? "bon" : voie === "SN2-E2" ? "moyen" : "mauvais" };
      }
      if (ea === "C" && eb === "C" && (oh(a) || oh(b)) && !(oh(a) && oh(b))) {
        const c = oh(a) ? a : b, r = c === a ? b : a, E = c === a ? A : B, N = c === a ? B : A, o = oh(c).j;
        const elec = fragment(m, E, [(at, li, nv) => { const x = li.find(y => (y.a === nv.get(c) && y.b === nv.get(o)) || (y.b === nv.get(c) && y.a === nv.get(o))); x.ordre = 2; x.style = null; delete at[nv.get(o)].h; }]);
        const nuc = fragment(m, N, [(at, li, nv) => { const k = at.length; at.push({ e: "Mg", x: m.atomes[c].x, y: m.atomes[c].y, h: 0 }); li.push({ a: nv.get(r), b: k, ordre: 1, style: null }); }]);
        const elecSeul = fragment(m, E), nucSeul = fragment(m, N);
        const gene = carbonyles(nucSeul) ? "carbonyle" : ohLibre(nucSeul) ? "alcool" : null;
        const autreCO = carbonyles(elec, elec.nv.get(c));
        return { type: "organomagnesien", nucleophile: { m: nuc, synthon: formuleIon(formuleBrute(nucSeul), -1), equivalent: "organomagnesien", atome: nuc.nv.get(r), gene },
          electrophile: { m: elec, synthon: formuleIon(formuleBrute(elecSeul), 1), equivalent: "carbonyle", atome: elec.nv.get(c) },
          verdict: gene ? "proteger" : autreCO ? "chimioselectivite" : "bon" };
      }
      err("deconnecter : ni C–O d'éther ni C–C d'un carbinol");
    }
    /* Cibles de la leçon « Analyse rétrosynthétique » : molécule et liaisons proposées à la coupure. */
    const CIBLES_RETRO = Object.freeze({
      etbe: { spec: "C -0.134 0; C 0.732 0.5; O 1.6 0; C 2.6 0; C 2.6 1; C 2.6 -1; C 3.6 0 | 0-1 1-2 2-3 3-4 3-5 3-6", coupures: [[1, 2], [2, 3]] },
      anisole: { spec: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; O 1.732 1; C 2.598 0.5 | 0=1 1-2 2=3 3-4 4=5 5-0 1-6 6-7", coupures: [[1, 6], [6, 7]] },
      phenylbutanol: { spec: "C 0 1; C 0.866 0.5; C 0.866 -0.5; C 0 -1; C -0.866 -0.5; C -0.866 0.5; C 1.732 1; O 1.732 2; C 2.598 0.5; C 3.464 1; C 1.732 0 | 0=1 1-2 2=3 3-4 4=5 5-0 1-6 6-7 6-8 8-9 6-10", coupures: [[1, 6], [6, 8], [6, 10]] },
      hydroxyheptanone: { spec: "C 0 0; C 0.866 0.5; O 0.866 1.5; C 1.732 0; C 2.598 0.5; C 3.464 0; C 4.33 0.5; O 4.33 1.5; C 5.196 0 | 0-1 1=2 1-3 3-4 4-5 5-6 6-7 6-8", coupures: [[5, 6], [6, 8]] },
    });

    Object.assign(api, { PKA_ACTIVATION, BASES_ALCOOLATE, deprotonation, voieWilliamson, NUCLEOFUGES, fractionProtonee, substituerSN2,
      acetalisation, AZEOTROPES, condensatMinimal, GLUCOSE, fractionBeta, MECANISMES_ACTIVATION, actesActivation, GROUPES_PROTECTION,
      REACTIFS_PROTECTION, sequence, rendementGlobal, rendementConvergent, deconnecter, CIBLES_RETRO });
  })();

  /* ---------- étape « Polymères » (chim-polymeres) : exporté sous ChimOrga.Polymeres ; tests : test/chim-organique-polymeres.test.js ----------
     SI : masses molaires en kg·mol⁻¹, concentrations en mol·m⁻³ (MOL_L = 1000 mol·m⁻³ dans 1 mol·L⁻¹), constantes de vitesse
     en m³·mol⁻¹·s⁻¹ (L_MOL_S = 10⁻³ : 1 L·mol⁻¹·s⁻¹), températures en K, contraintes en Pa. Ailleurs : Schulz–Flory, tacticité et
     dessin d'une chaîne dans PolyCoord (public/lecons/polymerisation-coordination.js) ; polycondensation : carothers, plus haut ;
     Arrhenius : Statistique.arrhenius.
     MONOMERES, motif(id)           monomères vinyliques CH₂=CXY (formule brute) ; motif –CH₂–CXY– : { brute, M0 } (mêmes atomes).
     moyennes(pop)                  pop = [{ n (mol), M (kg·mol⁻¹) }] : { Mn = Σ nM/Σ n, Mw = Σ nM²/Σ nM, D = Mw/Mn } (définitions).
     depuisMasses(pop)              [{ m (kg), M }] → [{ n = m/M, M }].
     pelote(N, b)                   chaîne librement articulée de N segments de longueur b : { L = Nb, R = b√N (moyenne quadratique
                                    de la distance bout à bout), rapport = L/R = √N }.
     marche(N, rng)                 N + 1 points d'une marche au hasard plane de N pas unitaires (dessin d'une pelote).
     RADICALAIRE, AMORCEURS         styrène et méthacrylate de méthyle : kp (A, Ea, valeurs de référence IUPAC), kt à 333 K, part de
                                    dismutation λ ; AIBN : ln A, Ea (s⁻¹, J·mol⁻¹), efficacité f.
     kp(id, T), kd(id, T)           constantes d'Arrhenius.
     radicalaire(o)                 AEQS sur les radicaux, o = { kd, f, kp, kt, M, I, lambda } (terminaison −d[R•]/dt = 2 kt [R•]²) :
                                    { Ri = 2 f kd [I], R = √(Ri/2kt), Rp = kp [M][R], nu = Rp/Ri, Xn = 2ν/(1 + λ), D, tau = 1/(2 kt [R]) }.
                                    D : (6 − 4a)/(2 − a)², a = 2λ/(1 + λ) part en nombre des chaînes mortes par dismutation (ν ≫ 1).
     vivante(nu)                    sans terminaison, ν monomères ajoutés par chaîne en moyenne (loi de Poisson) :
                                    { Xn = 1 + ν, Xw, D = 1 + ν/(1 + ν)², nombre(n), masse(n) }.
     eauTuee(mEau, I)               fraction des centres actifs détruits par mEau kg d'eau par m³, I en mol·m⁻³ (une molécule, une chaîne).
     triades(Pm)                    statistique de Bernoulli : { mm: Pm², mr: 2 Pm (1 − Pm), rr: (1 − Pm)² }.
     POLYMERES, etat(id, T)         Tg et Tf (K, null : amorphe), réticulé ; "vitreux", "caoutchoutique", "semicristallin", "fondu".
     moduleCaoutchouc(rho, T, Mc)   réseau affine : { G = ρRT/Mc, E = 3G } (incompressible).
     tractionCaoutchouc(G, l)       contrainte nominale néo-hookéenne G (λ − 1/λ²), λ allongement (L/L₀).
     moduleT(o, T)                  module d'Young schématique : { Ev, Ec, Tg, Tf, xc, w } → E(T) (Pa) ; marches logistiques de lg E, de
                                    largeur w (5 K), autour de Tg et Tf ; entre les deux, xc Ev + (1 − xc) Ec ; au-dessus de Tf, 10⁻³ Ec. */
  (function () {
    const fail = m => err("polymères : " + m);
    const pos = (v, nom) => (typeof v === "number" && v > 0 && isFinite(v) ? v : fail(nom + " doit être un nombre > 0"));
    const FICHIER_STAT = "./statistique.js";   // chargé seulement par les pages qui calculent des constantes d'Arrhenius
    const STAT = () => root.Statistique || (typeof module !== "undefined" && module.exports ? require(FICHIER_STAT) : fail("Statistique absent : charger /statistique.js"));
    const MOL_L = 1000, L_MOL_S = 1e-3;
    const MONOMERES = Object.freeze({
      ethene: { C: 2, H: 4 }, propene: { C: 3, H: 6 }, chlorureVinyle: { C: 2, H: 3, Cl: 1 },
      styrene: { C: 8, H: 8 }, mam: { C: 5, H: 8, O: 2 }, acrylonitrile: { C: 3, H: 3, N: 1 },
    });
    function motif(id) {
      const b = MONOMERES[id] || fail("monomère inconnu « " + id + " »");
      return { brute: Object.assign({}, b), M0: masseMolaire(b) };
    }
    function moyennes(pop) {
      if (!Array.isArray(pop) || !pop.length) fail("une population est une liste non vide de { n, M }");
      let s0 = 0, s1 = 0, s2 = 0;
      pop.forEach((p, i) => {
        if (!(p.n >= 0 && isFinite(p.n))) fail("n de la population " + i + " doit être ≥ 0");
        pos(p.M, "M de la population " + i);
        s0 += p.n; s1 += p.n * p.M; s2 += p.n * p.M * p.M;
      });
      if (!(s0 > 0)) fail("population vide");
      const Mn = s1 / s0, Mw = s2 / s1;
      return { Mn, Mw, D: Mw / Mn };
    }
    const depuisMasses = pop => pop.map((p, i) => ({ n: (p.m >= 0 ? p.m : fail("m de la population " + i + " doit être ≥ 0")) / pos(p.M, "M"), M: p.M }));
    function pelote(N, b) {
      pos(N, "N"); pos(b, "b");
      return { L: N * b, R: b * Math.sqrt(N), rapport: Math.sqrt(N) };
    }
    function marche(N, rng) {
      if (!(Number.isInteger(N) && N >= 1)) fail("N doit être un entier ≥ 1");
      const pts = [[0, 0]];
      for (let i = 0; i < N; i++) { const a = 2 * Math.PI * rng(), [x, y] = pts[i]; pts.push([x + Math.cos(a), y + Math.sin(a)]); }
      return pts;
    }
    /* kp : A et Ea des valeurs de référence IUPAC (Buback et al. 1995 ; Beuermann et al. 1997), A en L·mol⁻¹·s⁻¹ ici converti ;
       kt : ⟨kt⟩ à 333 K, faible conversion, en solution (Alghamdi et Russell 2024) ; λ : part de la terminaison par dismutation. */
    const RADICALAIRE = Object.freeze({
      styrene: Object.freeze({ kp: { A: Math.pow(10, 7.630) * L_MOL_S, Ea: 32.51e3 }, kt: 3.95e8 * L_MOL_S, lambda: 0.1 }),
      mam: Object.freeze({ kp: { A: Math.pow(10, 6.427) * L_MOL_S, Ea: 22.36e3 }, kt: 9.6e7 * L_MOL_S, lambda: 0.63 }),
    });
    /* AIBN (fiche du fabricant FUJIFILM Wako) : ln A = 36,30 (A en s⁻¹), Ea = 132,4 kJ·mol⁻¹ ; demi-vie de 10 h vers 338 K */
    const AMORCEURS = Object.freeze({ aibn: Object.freeze({ lnA: 36.30, Ea: 132.4e3, f: 0.6 }) });
    const kp = (id, T) => { const d = RADICALAIRE[id] || fail("monomère sans données : " + id); return STAT().arrhenius(d.kp.A, d.kp.Ea, pos(T, "T")); };
    const kd = (id, T) => { const d = AMORCEURS[id] || fail("amorceur inconnu : " + id); return STAT().arrhenius(Math.exp(d.lnA), d.Ea, pos(T, "T")); };
    function radicalaire(o) {
      ["kd", "f", "kp", "kt", "M", "I"].forEach(k => pos(o[k], k));
      if (o.f > 1) fail("f doit être ≤ 1");
      const lambda = o.lambda === undefined ? 0 : o.lambda;
      if (!(lambda >= 0 && lambda <= 1)) fail("λ doit être dans [0, 1]");
      const Ri = 2 * o.f * o.kd * o.I, R = Math.sqrt(Ri / (2 * o.kt)), Rp = o.kp * o.M * R, nu = Rp / Ri;
      const a = 2 * lambda / (1 + lambda);
      return { Ri, R, Rp, nu, Xn: 2 * nu / (1 + lambda), D: (6 - 4 * a) / Math.pow(2 - a, 2), tau: 1 / (2 * o.kt * R) };
    }
    function vivante(nu) {
      if (!(nu >= 0 && isFinite(nu))) fail("ν doit être ≥ 0");
      const Xn = 1 + nu, Xw = (1 + 3 * nu + nu * nu) / (1 + nu);
      const lnP = n => -nu + (n - 1) * Math.log(nu || 1e-300) - lgamma(n);          // ln P(n), n − 1 ajouts de loi de Poisson
      const nombre = n => (n < 1 || !Number.isInteger(n)) ? 0 : nu === 0 ? (n === 1 ? 1 : 0) : Math.exp(lnP(n));
      return { nu, Xn, Xw, D: Xw / Xn, nombre, masse: n => n * nombre(n) / Xn };
    }
    /* ln Γ(n) = ln (n − 1)! : Stirling avec deux corrections (erreur < 10⁻⁸ dès n = 8), somme exacte en dessous */
    function lgamma(n) {
      if (n < 8) { let s = 0; for (let k = 2; k < n; k++) s += Math.log(k); return s; }
      const x = n - 1;
      return x * Math.log(x) - x + 0.5 * Math.log(2 * Math.PI * x) + 1 / (12 * x) - 1 / (360 * x * x * x);
    }
    const eauTuee = (mEau, I) => { if (!(mEau >= 0)) fail("masse d'eau ≥ 0"); return Math.min(1, mEau / masseMolaire({ H: 2, O: 1 }) / pos(I, "I")); };
    function triades(Pm) {
      if (!(Pm >= 0 && Pm <= 1)) fail("Pm doit être dans [0, 1]");
      return { mm: Pm * Pm, mr: 2 * Pm * (1 - Pm), rr: (1 - Pm) * (1 - Pm) };
    }
    /* Tg : tables usuelles (Wikipédia, « Glass transition », et fiches des polymères) ; polyisoprène : de synthèse, 97 % cis */
    const POLYMERES = Object.freeze({
      polyisoprene: Object.freeze({ Tg: 209, Tf: null, reticule: true }),
      pp: Object.freeze({ Tg: 273, Tf: 438, reticule: false }),
      pet: Object.freeze({ Tg: 343, Tf: 533, reticule: false }),
      pa66: Object.freeze({ Tg: 343, Tf: 537, reticule: false }),
      pvc: Object.freeze({ Tg: 353, Tf: null, reticule: false }),
      ps: Object.freeze({ Tg: 373, Tf: null, reticule: false }),
      pmma: Object.freeze({ Tg: 378, Tf: null, reticule: false }),
      polycarbonate: Object.freeze({ Tg: 418, Tf: null, reticule: false }),
    });
    function etat(id, T) {
      const p = POLYMERES[id] || fail("polymère inconnu : " + id);
      pos(T, "T");
      if (T < p.Tg) return "vitreux";
      if (p.Tf === null) return "caoutchoutique";
      return T < p.Tf ? "semicristallin" : "fondu";
    }
    const moduleCaoutchouc = (rho, T, Mc) => { const G = pos(rho, "ρ") * K().R * pos(T, "T") / pos(Mc, "Mc"); return { G, E: 3 * G }; };
    const tractionCaoutchouc = (G, l) => pos(G, "G") * (pos(l, "λ") - 1 / (l * l));
    function moduleT(o, T) {
      const s = x => 1 / (1 + Math.exp(-x)), w = o.w || 5, lv = Math.log10(pos(o.Ev, "Ev")), lc = Math.log10(pos(o.Ec, "Ec"));
      pos(T, "T"); pos(o.Tg, "Tg");
      if (o.Tf == null) return Math.pow(10, lc + (lv - lc) * s((o.Tg - T) / w));
      if (!(o.Tf > o.Tg)) fail("Tf doit dépasser Tg");
      const xc = o.xc === undefined ? 0.5 : o.xc, lsc = Math.log10(xc * o.Ev + (1 - xc) * o.Ec), lf = lc - 3;   // phases en parallèle (Voigt) ; fondu
      return Math.pow(10, lf + (lsc - lf) * s((o.Tf - T) / w) + (lv - lsc) * s((o.Tg - T) / w));
    }
    api.Polymeres = Object.freeze({ MOL_L, L_MOL_S, MONOMERES, motif, moyennes, depuisMasses, pelote, marche, RADICALAIRE, AMORCEURS, kp, kd,
      radicalaire, vivante, eauTuee, triades, POLYMERES, etat, moduleCaoutchouc, tractionCaoutchouc, moduleT });
  })();

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ChimOrga = api;
})(typeof self !== "undefined" ? self : this);

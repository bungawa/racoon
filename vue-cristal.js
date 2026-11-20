/* Vue cristal — an orientable 3D view of atoms (three.js r128 + OrbitControls), for the lessons « Cristaux ». DOM only: the
   positions come from Cristaux (public/lecons/cristaux.js). Global VueCristal. Colours come from ds.css variables only.

   monter(canvas, overlay, o) → vue | null
       o = { hors: text shown in overlay when three.js is missing (then null is returned), reduit: no auto-rotation }.
   vue.montrer(atomes, o2)       atomes [{ e, r: [x, y, z] (m) }] ; o2 = {
         couleurs: { e: "--css-var" }, rayons: { e: fraction of dLiaison }, dLiaison (m): a segment joins two atoms closer
         than dLiaison × 1,01 (0: none), maille (m): edge of a cube drawn from the origin (0: none), cellule: [a, b, c] (m), a parallelepiped drawn from
         the origin, estompe: [e…] species drawn
         faded }. The view is centred on the atoms.
   vue.regarder(dir)             camera along dir ([1, 1, 1]: down a body diagonal of the cube). */
(function (root) {
  function monter(canvas, overlay, o) {
    o = o || {};
    if (!root.THREE) { if (overlay) overlay.textContent = o.hors || ""; return null; }
    const THREE = root.THREE, css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(root.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 4 / 3, 0.01, 500);
    const ctl = new THREE.OrbitControls(cam, canvas);
    ctl.enableDamping = true; ctl.autoRotate = !o.reduit; ctl.autoRotateSpeed = 0.7;
    canvas.addEventListener("pointerdown", () => { ctl.autoRotate = false; });
    scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.0));
    const sun = new THREE.DirectionalLight(0xffffff, 0.6); sun.position.set(10, 20, 15); scene.add(sun);
    const groupe = new THREE.Group(); scene.add(groupe);
    let dernier = null, rayon = 10;
    const matieres = [];
    const teinter = () => matieres.forEach(([m, v]) => m.color.set(css(v)));
    const theme = () => { teinter(); };
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", theme);
    new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function vider() {
      while (groupe.children.length) { const c = groupe.children.pop(); c.geometry && c.geometry.dispose(); c.material && c.material.dispose(); }
      matieres.length = 0;
    }
    function montrer(atomes, o2) {
      o2 = o2 || {}; vider(); dernier = [atomes, o2];
      const A = 1e-10, P = atomes.map(a => a.r.map(x => x / A));   // ångström-sized scene units
      const c = [0, 1, 2].map(k => P.reduce((s, p) => s + p[k], 0) / Math.max(P.length, 1));
      const dl = (o2.dLiaison || 0) / A;
      const especes = [...new Set(atomes.map(a => a.e))];
      especes.forEach(e => {
        const idx = atomes.map((a, i) => (a.e === e ? i : -1)).filter(i => i >= 0);
        const r = (o2.rayons && o2.rayons[e]) || 0.3, faible = (o2.estompe || []).includes(e);
        const mat = new THREE.MeshStandardMaterial({ roughness: 0.45, transparent: faible, opacity: faible ? 0.18 : 1 });
        matieres.push([mat, (o2.couleurs && o2.couleurs[e]) || "--tint"]);
        const mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(r * (dl || 2.5), 20, 14), mat, idx.length);
        const m = new THREE.Matrix4();
        idx.forEach((i, k) => { m.makeTranslation(P[i][0] - c[0], P[i][1] - c[1], P[i][2] - c[2]); mesh.setMatrixAt(k, m); });
        groupe.add(mesh);
      });
      if (dl > 0) {
        const seg = [], est = new Set(o2.estompe || []);
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
          if (est.has(atomes[i].e) || est.has(atomes[j].e)) continue;
          const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1], P[i][2] - P[j][2]);
          if (d <= dl * 1.01) seg.push(...P[i].map((x, k) => x - c[k]), ...P[j].map((x, k) => x - c[k]));
        }
        const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
        const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.7 }); matieres.push([mat, "--label-2"]);
        groupe.add(new THREE.LineSegments(g, mat));
      }
      if (o2.maille > 0) {
        const a = o2.maille / A, box = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(a, a, a)),
          new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 }));
        matieres.push([box.material, "--label-2"]);
        box.position.set(a / 2 - c[0], a / 2 - c[1], a / 2 - c[2]); groupe.add(box);
      }
      if (Array.isArray(o2.cellule)) {   // any parallelepiped: its 12 edges from the origin
        const [u, v, w] = o2.cellule.map(q => q.map(x => x / A)), seg = [];
        const pt = (i, j, k) => [0, 1, 2].map(q => i * u[q] + j * v[q] + k * w[q] - c[q]);
        for (let i = 0; i <= 1; i++) for (let j = 0; j <= 1; j++) {
          seg.push(...pt(0, i, j), ...pt(1, i, j), ...pt(i, 0, j), ...pt(i, 1, j), ...pt(i, j, 0), ...pt(i, j, 1));
        }
        const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
        const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.8 }); matieres.push([mat, "--label-2"]);
        groupe.add(new THREE.LineSegments(g, mat));
      }
      rayon = Math.max(3, ...P.map(p => Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2])));
      teinter();
      if (!cam.userData.place) regarder([1.2, 0.8, 1.6]);
    }
    function regarder(dir) {
      const n = Math.hypot(...dir), k = 3.2 * rayon / n;
      cam.position.set(dir[0] * k, dir[1] * k, dir[2] * k); cam.up.set(0, 1, 0);
      if (Math.abs(dir[1]) / n > 0.99) cam.up.set(0, 0, -1);
      ctl.target.set(0, 0, 0); cam.userData.place = true; ctl.update();
    }
    function resize() {
      const r = canvas.getBoundingClientRect(); if (!r.width) return;
      renderer.setSize(r.width, r.height, false); cam.aspect = r.width / r.height; cam.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(canvas); resize();
    let visible = true;
    new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(canvas);
    (function tick() { requestAnimationFrame(tick); if (!visible) return; ctl.update(); renderer.render(scene, cam); })();
    return { montrer, regarder, arreter: () => { ctl.autoRotate = false; }, dernier: () => dernier };
  }
  root.VueCristal = { monter };
})(typeof self !== "undefined" ? self : this);

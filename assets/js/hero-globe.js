/* ============================================================
   Hero 3D globe — homepage-only decorative accent.
   Built with three.js (loaded via CDN in index.html).
   Progressive enhancement: if three.js fails to load, or the
   container isn't present, this does nothing and the hero photo
   still looks complete on its own.
   ============================================================ */
(function () {
  if (typeof THREE === 'undefined') return;

  var container = document.getElementById('hero3d');
  if (!container) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 4.3;

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Group so we can tilt once and just spin on Y afterwards
  var group = new THREE.Group();
  group.rotation.x = 0.42;
  group.rotation.z = -0.08;
  scene.add(group);

  // Wireframe globe (clean edge lines, not the noisy default wireframe)
  var icoGeo = new THREE.IcosahedronGeometry(1.15, 1);
  var edges = new THREE.EdgesGeometry(icoGeo);
  var wire = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
  );
  group.add(wire);

  // Glowing "node" points at each vertex — reads as connected camera/sensor sites
  var points = new THREE.Points(
    icoGeo,
    new THREE.PointsMaterial({
      color: 0xd8b46a,
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95
    })
  );
  group.add(points);

  // Faint outer shell for depth
  var shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 24, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    })
  );
  group.add(shell);

  function size() {
    var w = container.clientWidth, h = container.clientHeight || w;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  size();

  if (window.ResizeObserver) {
    new ResizeObserver(size).observe(container);
  } else {
    window.addEventListener('resize', size);
  }

  var clock = new THREE.Clock();
  var running = true;
  var raf = null;

  function frame() {
    if (!running) return;
    var dt = clock.getDelta();
    group.rotation.y += dt * 0.22;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    // Respect the user's OS-level motion preference: render one still frame.
    renderer.render(scene, camera);
  } else if ('IntersectionObserver' in window) {
    // Only spend GPU/battery while the hero is actually on screen.
    var io = new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (visible && !raf) {
        running = true;
        frame();
      } else if (!visible) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      }
    }, { threshold: 0.05 });
    io.observe(container);
  } else {
    frame();
  }
})();

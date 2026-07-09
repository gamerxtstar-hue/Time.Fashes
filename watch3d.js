"/* ============ FASHES — Three.js Scroll-Driven Luxury Watch ============ */
/* Uses global THREE (loaded via CDN). Builds a stylized wristwatch:
   - Outer bezel (torus, gold)
   - Case ring
   - Dial (dark)
   - Hour markers + Fashes brand text (via canvas texture)
   - Hour, minute, second hands
   The watch face slowly rotates on load and reveals; on scroll it
   scales up and drifts to the bottom of the hero page.
*/

(function () {
  if (typeof THREE === \"undefined\") return;
  const canvas = document.getElementById(\"watch-canvas\");
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xfff3d0, 1.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd4af37, 0.9);
  rim.position.set(-5, -3, 2);
  scene.add(rim);
  const fill = new THREE.PointLight(0xe8c766, 0.6, 20);
  fill.position.set(0, 0, 4);
  scene.add(fill);

  // Group holds the whole watch
  const watch = new THREE.Group();
  scene.add(watch);

  // --- Bezel (outer gold ring)
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 1.0,
    roughness: 0.22,
    emissive: 0x2a1f08,
    emissiveIntensity: 0.35,
  });
  const bezelGeo = new THREE.TorusGeometry(1.55, 0.14, 24, 96);
  const bezel = new THREE.Mesh(bezelGeo, goldMat);
  bezel.position.z = 0.08;
  watch.add(bezel);

  // Inner ring
  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.38, 0.03, 20, 80),
    new THREE.MeshStandardMaterial({ color: 0xe8c766, metalness: 1, roughness: 0.15 })
  );
  innerRing.position.z = 0.16;
  watch.add(innerRing);

  // --- Case back / body
  const case1 = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 0.28, 96),
    new THREE.MeshStandardMaterial({ color: 0x1a1512, metalness: 0.8, roughness: 0.4 })
  );
  case1.rotation.x = Math.PI / 2;
  watch.add(case1);

  // --- Dial face texture (canvas)
  function makeDialTexture() {
    const size = 1024;
    const c = document.createElement(\"canvas\");
    c.width = c.height = size;
    const ctx = c.getContext(\"2d\");

    // Background gradient
    const g = ctx.createRadialGradient(size / 2, size / 2, 60, size / 2, size / 2, size / 2);
    g.addColorStop(0, \"#1c1810\");
    g.addColorStop(0.6, \"#0f0d08\");
    g.addColorStop(1, \"#050403\");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Concentric subtle rings
    ctx.strokeStyle = \"rgba(212,175,55,0.10)\";
    ctx.lineWidth = 1.2;
    for (let r = 60; r < size / 2; r += 40) {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const cx = size / 2, cy = size / 2;

    // Hour markers
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const r1 = size / 2 - 70;
      const r2 = size / 2 - 130;
      ctx.save();
      ctx.strokeStyle = i % 3 === 0 ? \"#e8c766\" : \"#d4af37\";
      ctx.lineWidth = i % 3 === 0 ? 10 : 5;
      ctx.lineCap = \"round\";
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
      ctx.restore();
    }

    // Minute ticks
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue;
      const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const r1 = size / 2 - 70;
      const r2 = size / 2 - 95;
      ctx.strokeStyle = \"rgba(212,175,55,0.55)\";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    // Roman numerals at 12, 3, 6, 9
    ctx.fillStyle = \"#e8c766\";
    ctx.font = \"600 62px 'Cormorant Garamond', Georgia, serif\";
    ctx.textAlign = \"center\";
    ctx.textBaseline = \"middle\";
    const rN = size / 2 - 170;
    const nums = [
      { t: \"XII\", ang: -Math.PI / 2 },
      { t: \"III\", ang: 0 },
      { t: \"VI\", ang: Math.PI / 2 },
      { t: \"IX\", ang: Math.PI },
    ];
    nums.forEach((n) => {
      ctx.fillText(n.t, cx + Math.cos(n.ang) * rN, cy + Math.sin(n.ang) * rN);
    });

    // Brand text
    ctx.fillStyle = \"#d4af37\";
    ctx.font = \"500 44px 'Cormorant Garamond', Georgia, serif\";
    ctx.fillText(\"F A S H E S\", cx, cy - 130);
    ctx.font = \"300 20px 'Outfit', sans-serif\";
    ctx.fillStyle = \"#a89f8a\";
    ctx.fillText(\"SWISS · AUTOMATIC\", cx, cy - 88);

    // Sub-dial (small circle at 6 o'clock area)
    ctx.strokeStyle = \"rgba(212,175,55,0.35)\";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy + 160, 90, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = \"#a89f8a\";
    ctx.font = \"300 16px 'Outfit', sans-serif\";
    ctx.fillText(\"60\", cx, cy + 90);
    ctx.fillText(\"30\", cx + 80, cy + 160);
    ctx.fillText(\"15\", cx, cy + 235);
    ctx.fillText(\"45\", cx - 80, cy + 160);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    return tex;
  }

  const dialTex = makeDialTexture();
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(1.4, 96),
    new THREE.MeshStandardMaterial({ map: dialTex, metalness: 0.4, roughness: 0.55 })
  );
  dial.position.z = 0.15;
  watch.add(dial);

  // Hands
  function makeHand(length, width, color, z) {
    const geo = new THREE.BoxGeometry(width, length, 0.02);
    geo.translate(0, length / 2 - 0.06, 0);
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 1, roughness: 0.25, emissive: 0x1a1206, emissiveIntensity: 0.3 });
    const m = new THREE.Mesh(geo, mat);
    m.position.z = z;
    return m;
  }
  const hourHand = makeHand(0.75, 0.09, 0xe8c766, 0.19);
  const minuteHand = makeHand(1.05, 0.06, 0xf5f1e6, 0.21);
  const secondHand = makeHand(1.15, 0.02, 0xd4af37, 0.23);
  watch.add(hourHand, minuteHand, secondHand);

  // Center cap
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.04, 32),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.15 })
  );
  cap.rotation.x = Math.PI / 2;
  cap.position.z = 0.25;
  watch.add(cap);

  // Crown (small cylinder on right side)
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.14, 0.18, 24),
    goldMat
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.set(1.72, 0, 0.05);
  watch.add(crown);

  // Initial state
  watch.scale.setScalar(1);
  watch.position.set(2.4, 0.3, 0);
  watch.rotation.set(0.15, -0.15, 0);

  // Update hands based on real time
  function updateHands() {
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    secondHand.rotation.z = -(s / 60) * Math.PI * 2;
    minuteHand.rotation.z = -(m / 60) * Math.PI * 2;
    hourHand.rotation.z = -(h / 12) * Math.PI * 2;
  }

  // Scroll-driven transform
  const state = { scroll: 0, mouseX: 0, mouseY: 0 };
  function onScroll() {
    const h = document.body.scrollHeight - window.innerHeight;
    state.scroll = Math.min(1, Math.max(0, window.scrollY / (h || 1)));
  }
  window.addEventListener(\"scroll\", onScroll, { passive: true });
  onScroll();

  window.addEventListener(\"mousemove\", (e) => {
    state.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    state.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener(\"resize\", onResize);

  // Animation loop
  let smoothScroll = 0;
  let smoothX = 0, smoothY = 0;
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    smoothScroll += (state.scroll - smoothScroll) * 0.08;
    smoothX += (state.mouseX - smoothX) * 0.05;
    smoothY += (state.mouseY - smoothY) * 0.05;

    // Scale: from 1 to 3.2 across scroll
    const scale = 1 + smoothScroll * 2.4;
    watch.scale.setScalar(scale);

    // Position: start upper-right, drift to center, then bottom-center
    // three phases
    let px, py;
    if (smoothScroll < 0.5) {
      const p = smoothScroll / 0.5; // 0..1
      px = 2.4 - p * 2.4; // 2.4 -> 0
      py = 0.3 - p * 0.3; // 0.3 -> 0
    } else {
      const p = (smoothScroll - 0.5) / 0.5;
      px = 0;
      py = 0 - p * 1.6; // 0 -> -1.6 (bottom)
    }
    watch.position.x = px + smoothX * 0.15;
    watch.position.y = py - smoothY * 0.15;

    // Gentle rotation
    watch.rotation.y = -0.15 + smoothX * 0.35 + Math.sin(t) * 0.05;
    watch.rotation.x = 0.15 + smoothY * 0.25 + Math.cos(t * 0.8) * 0.03;
    watch.rotation.z = smoothScroll * 0.4;

    updateHands();
    renderer.render(scene, camera);
  }
  animate();
})();
"
Observation: Create successful: /app/frontend/public/watches/js/watch3d.js

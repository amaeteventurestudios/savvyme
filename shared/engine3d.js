// A small turbofan in 3D, built from code: the home page hero and the "which part pushes the plane?" step of the quiz.
// mountEngine(el, { interactive, onPick }) returns { open(on), highlight(part), dispose() }.
import * as THREE from 'three';

const PARTS = { fan: 'The big fan', compressor: 'The compressor', combustor: 'The burner', nozzle: 'The exhaust nozzle' };
export { PARTS };

export function mountEngine(el, opt = {}) {
  const lite = matchMedia('(pointer: coarse)').matches || /[?&]lite\b/.test(location.search);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: !lite, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, lite ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  el.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:pan-y';
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xdfe4ff, 0x3a3150, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(4, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xb9a8ff, 1.2); rim.position.set(-6, 2, -4); scene.add(rim);

  const metal = (c, r = 0.35, m = 0.85) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const root = new THREE.Group(); scene.add(root);
  const pickables = [];
  const tag = (o, part) => { o.traverse(m => { if (m.isMesh) { m.userData.part = part; pickables.push(m); } }); return o; };
  // axis runs along x: intake at +x (right), exhaust at -x
  const along = g => { g.rotateZ(-Math.PI / 2); return g; };

  // nacelle (outer casing), a lathe of a thin aerofoil-ish profile; goes see-through when opened
  const prof = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24; const x = 1.55 - t * 3.3; const r = 1.02 + 0.1 * Math.sin(Math.PI * t) - 0.12 * t * t; prof.push(new THREE.Vector2(r, x)); }
  for (let i = 24; i >= 0; i--) { const t = i / 24; const x = 1.55 - t * 3.3; const r = 0.96 + 0.02 * Math.sin(Math.PI * t) - 0.14 * t * t; prof.push(new THREE.Vector2(r, x)); }
  const nacMat = new THREE.MeshStandardMaterial({ color: 0xe9e7f2, roughness: 0.4, metalness: 0.3, transparent: true, opacity: 1, side: THREE.DoubleSide });
  const nacelle = new THREE.Mesh(along(new THREE.LatheGeometry(prof, lite ? 40 : 64)), nacMat);
  root.add(nacelle);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.05, 12, 64), metal(0xc6c8d4, 0.25)); lip.rotation.y = Math.PI / 2; lip.position.x = 1.55; root.add(lip);

  // fan: spinner + wide swept blades
  const fan = new THREE.Group(); fan.position.x = 1.25; root.add(fan);
  const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.55, 32), metal(0x30324a, 0.3)); spinner.rotation.z = -Math.PI / 2; spinner.position.x = 0.25; fan.add(spinner);
  const bladeGeo = new THREE.BoxGeometry(0.05, 0.62, 0.2); bladeGeo.translate(0, 0.62, 0);
  const pos = bladeGeo.attributes.position; for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); pos.setZ(i, pos.getZ(i) + (y - 0.3) * 0.25 * Math.sign(pos.getZ(i) || 1) * 0.3); pos.setX(i, pos.getX(i) + (y - 0.3) * 0.12); }
  bladeGeo.computeVertexNormals();
  const bladeMat = metal(0x9fa3b8, 0.3);
  const N = lite ? 18 : 22;
  for (let i = 0; i < N; i++) { const b = new THREE.Mesh(bladeGeo, bladeMat); b.rotation.y = 0.45; const h = new THREE.Group(); h.rotation.x = (i / N) * Math.PI * 2; h.add(b); fan.add(h); }
  tag(fan, 'fan');

  // core casing (inner), compressor stages, burner ring, turbine, nozzle
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x8f93a8, roughness: 0.35, metalness: 0.8, transparent: true, opacity: 1, side: THREE.DoubleSide });
  const core = new THREE.Mesh(along(new THREE.CylinderGeometry(0.42, 0.5, 2.3, 48, 1, true)), coreMat); core.position.x = -0.05; root.add(core);
  const comp = new THREE.Group(); root.add(comp);
  for (let i = 0; i < 7; i++) { const r = 0.42 - i * 0.03; const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.06, 28), metal(0xb7bccf, 0.25)); disc.rotation.z = Math.PI / 2; disc.position.x = 0.85 - i * 0.12; comp.add(disc); }
  tag(comp, 'compressor');
  const burnMat = new THREE.MeshStandardMaterial({ color: 0xff7a1a, emissive: 0xff5a00, emissiveIntensity: 1.6, roughness: 0.5 });
  const burner = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.09, 14, 40), burnMat); burner.rotation.y = Math.PI / 2; burner.position.x = -0.1; root.add(burner); tag(burner, 'combustor');
  const turb = new THREE.Group(); root.add(turb);
  for (let i = 0; i < 3; i++) { const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.07, 28), metal(0x6b6f86, 0.4)); disc.rotation.z = Math.PI / 2; disc.position.x = -0.5 - i * 0.14; turb.add(disc); }
  const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.7, 32, 1, true), metal(0x4a4d63, 0.45)); nozzle.rotation.z = Math.PI / 2; nozzle.position.x = -1.45; root.add(nozzle); tag(nozzle, 'nozzle');
  const plug = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 24), metal(0x2b2d40, 0.5)); plug.rotation.z = Math.PI / 2; plug.position.x = -1.5; root.add(plug); tag(plug, 'nozzle');
  // pylon

  // air: bypass stream (blue, around the core) and core stream (turns orange after the burner)
  const P = lite ? 260 : 520;
  const ppos = new Float32Array(P * 3), pcol = new Float32Array(P * 3), seed = [];
  for (let i = 0; i < P; i++) { const bypass = i % 5 !== 0; const a = Math.random() * Math.PI * 2; const r = bypass ? 0.6 + Math.random() * 0.32 : Math.random() * 0.26 + 0.05; seed.push({ bypass, a, r, x: Math.random() * 4.2 - 2.4, v: 0.9 + Math.random() * 0.4 }); }
  const pgeo = new THREE.BufferGeometry(); pgeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3)); pgeo.setAttribute('color', new THREE.BufferAttribute(pcol, 3));
  const pmat = new THREE.PointsMaterial({ size: lite ? 0.05 : 0.04, vertexColors: true, transparent: true, opacity: 0.0, depthWrite: false });
  const air = new THREE.Points(pgeo, pmat); air.frustumCulled = false; root.add(air);
  const blue = new THREE.Color(0x56b6ff), hot = new THREE.Color(0xff8a3c);

  root.rotation.set(0.1, -0.65, 0.04);
  let opened = 0, openTarget = 0, hl = null, t0 = performance.now(), spin = 0, drag = null, yaw = -0.65;

  function fit() {
    const w = el.clientWidth || 1, h = el.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h;
    const a = w / h; cam.fov = 32; const need = 4.4 / (2 * Math.tan(cam.fov * Math.PI / 360) * Math.min(a, 1.25)); cam.position.set(0, 0.9, Math.max(6.5, need * 1.05)); cam.lookAt(0, (opt.lift || 0), 0); cam.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(fit); ro.observe(el); fit();

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(e) {
    const r = renderer.domElement.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, cam); const hit = ray.intersectObjects(pickables, false)[0]; return hit && hit.object.userData.part;
  }
  const cv = renderer.domElement;
  cv.addEventListener('pointerdown', e => { drag = { x: e.clientX, y0: yaw, moved: false }; });
  cv.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 6) drag.moved = true; if (drag.moved) yaw = drag.y0 + dx * 0.01; });
  cv.addEventListener('pointerup', e => { const was = drag; drag = null; if (was && !was.moved && opt.interactive && opt.onPick) { const p = pick(e); if (p) opt.onPick(p); } });

  const tmp = new THREE.Color();
  let raf, last = performance.now(), alive = true;
  function frame(now) {
    if (!alive) return; raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (document.hidden) return;
    opened += (openTarget - opened) * Math.min(1, dt * 3);
    nacMat.opacity = 1 - opened * 0.86; nacMat.depthWrite = opened < 0.5; coreMat.opacity = 1 - opened * 0.7; coreMat.depthWrite = opened < 0.5;
    pmat.opacity = opened * 0.95;
    spin += dt * (still ? 0.6 : 9); fan.rotation.x = spin; comp.rotation.x = spin * 1.6; turb.rotation.x = spin * 1.6;
    burnMat.emissiveIntensity = 1.3 + Math.sin(now / 90) * 0.3 + (hl === 'combustor' ? 1 : 0);
    if (!drag) yaw += ((opt.interactive ? -0.65 : -0.65 + Math.sin(now / 4000) * 0.35) - yaw) * Math.min(1, dt * (opt.interactive ? 1 : 0.6));
    root.rotation.y = yaw;
    for (const m of pickables) { const on = hl && m.userData.part === hl; if (m.material.emissive && m.userData.part !== 'combustor') m.material.emissive.setHex(on ? 0x4a3dff : 0x000000); }
    if (opened > 0.02) {
      for (let i = 0; i < P; i++) { const s = seed[i]; s.x -= dt * s.v * (s.bypass ? 2.2 : 1.6); if (s.x < -2.6) s.x = 2.0;
        const r = s.bypass ? s.r : (s.x > 0.9 ? s.r * 2.6 : s.r);
        ppos[i * 3] = s.x; ppos[i * 3 + 1] = Math.cos(s.a + spin * 0.05) * r; ppos[i * 3 + 2] = Math.sin(s.a + spin * 0.05) * r;
        tmp.copy(blue); if (!s.bypass && s.x < -0.05) tmp.lerp(hot, Math.min(1, (-0.05 - s.x) * 2.5));
        pcol[i * 3] = tmp.r; pcol[i * 3 + 1] = tmp.g; pcol[i * 3 + 2] = tmp.b; }
      pgeo.attributes.position.needsUpdate = true; pgeo.attributes.color.needsUpdate = true;
    }
    renderer.render(scene, cam);
  }
  raf = requestAnimationFrame(frame);
  return {
    open(on = true) { openTarget = on ? 1 : 0; },
    highlight(p) { hl = p; },
    dispose() { alive = false; cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); cv.remove(); },
  };
}

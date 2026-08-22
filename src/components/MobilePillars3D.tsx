import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Shield, Feather, BookOpen } from 'lucide-react';
import { sacredAudio } from '../lib/audio';
import { useLanguage } from '../context/LanguageContext';

interface MobilePillars3DProps {
  onColumnTouch?: () => void;
}

export const MobilePillars3D: React.FC<MobilePillars3DProps> = ({ onColumnTouch }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [activeInscription, setActiveInscription] = useState<string>('ΚΛΗΣΙΣ • 1 Timothy 6:12–14');
  const [touchHint, setTouchHint] = useState<boolean>(false);

  // Animation & Scroll Refs
  const scrollYRef = useRef<number>(0);
  const activeTouchPillarRef = useRef<THREE.Group | null>(null);
  const touchPillarAnimTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04120d, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    // 2. WebGL Renderer with performance optimization
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Architectural Cathedral Lighting
    const ambientLight = new THREE.AmbientLight(0xf5eedc, 1.2);
    scene.add(ambientLight);

    // Key Cathedral Sunbeam
    const keySunlight = new THREE.DirectionalLight(0xfff3d1, 2.8);
    keySunlight.position.set(-10, 18, 14);
    keySunlight.castShadow = true;
    scene.add(keySunlight);

    // Emerald & Gold Rim Accent Lights
    const rimEmerald = new THREE.DirectionalLight(0x10b981, 1.5);
    rimEmerald.position.set(12, -6, -8);
    scene.add(rimEmerald);

    const rimGold = new THREE.PointLight(0xffd700, 3.5, 25);
    rimGold.position.set(0, 2, 6);
    scene.add(rimGold);

    // 4. Procedural Marble & Engraved Textures
    const createPristineMarbleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Cream Pentelic Marble base
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#faf8f5');
      grad.addColorStop(0.3, '#eeeae1');
      grad.addColorStop(0.7, '#e4dfd3');
      grad.addColorStop(1, '#f6f3eb');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Natural grey-slate marble veins
      ctx.lineWidth = 1.8;
      for (let i = 0; i < 32; i++) {
        ctx.beginPath();
        let x = Math.random() * 1024;
        let y = Math.random() * 1024;
        ctx.moveTo(x, y);
        ctx.strokeStyle = `rgba(70, 75, 72, ${0.07 + Math.random() * 0.1})`;
        for (let j = 0; j < 6; j++) {
          x += (Math.random() - 0.5) * 160;
          y += Math.random() * 180;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Engraved Greek Inscription Bands
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('ΚΛΗΣΙΣ • 1 TIMOTHY 6:12', 512, 300);
      ctx.fillText('TELC CHRIST CHURCH TAMBARAM', 512, 700);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const marbleTex = createPristineMarbleTexture();

    // 5. Materials
    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.22,
      metalness: 0.08,
    });

    const darkMarbleMat = new THREE.MeshStandardMaterial({
      color: 0x07281e,
      roughness: 0.3,
      metalness: 0.2,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.18,
    });

    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
    });

    const emeraldGemMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x022c22,
      roughness: 0.1,
      metalness: 0.6,
    });

    const lightBeamMat = new THREE.MeshBasicMaterial({
      color: 0xffe89e,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    // 6. Pillar Builder Function (Corinthian / Composite order with Art Nouveau Wrought-Iron Vine Tracery)
    const createCorinthianPillar = (idName: string, inscriptionText: string) => {
      const group = new THREE.Group();
      group.name = idName;
      group.userData = { inscription: inscriptionText, isClicked: false, basePosY: 0, baseRotY: 0 };

      // A. Multi-tiered Dark Marble Plinth Base
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 2.4), darkMarbleMat);
      plinth.position.y = -4.5;
      plinth.castShadow = true;
      plinth.receiveShadow = true;
      group.add(plinth);

      // Gold Trim Ring above Base
      const baseGoldRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 16, 48), goldMat);
      baseGoldRing.rotation.x = Math.PI / 2;
      baseGoldRing.position.y = -4.0;
      group.add(baseGoldRing);

      const torusLower = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.12, 16, 48), marbleMat);
      torusLower.rotation.x = Math.PI / 2;
      torusLower.position.y = -3.8;
      group.add(torusLower);

      // B. Main Tapered Marble Shaft with Fluting & Inscriptions
      const shaftGeo = new THREE.CylinderGeometry(0.82, 0.98, 7.2, 48);
      const shaftMesh = new THREE.Mesh(shaftGeo, marbleMat);
      shaftMesh.position.y = -0.1;
      shaftMesh.castShadow = true;
      shaftMesh.receiveShadow = true;
      group.add(shaftMesh);

      // C. Art Nouveau Gold-Plated Wrought-Iron Botanical Vine Spiral winding around shaft
      const curvePoints = [];
      const turns = 2.5;
      const height = 6.8;
      const radius = 0.92;

      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        const angle = t * Math.PI * 2 * turns;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -3.4 + t * height;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const vineCurve = new THREE.CatmullRomCurve3(curvePoints);
      const vineGeo = new THREE.TubeGeometry(vineCurve, 64, 0.045, 8, false);
      const vineMesh = new THREE.Mesh(vineGeo, goldMat);
      group.add(vineMesh);

      // Leaves & Botanical Flourishes along the Vine Spiral
      for (let i = 10; i < 75; i += 12) {
        const pt = curvePoints[i];
        const leafGroup = new THREE.Group();
        leafGroup.position.copy(pt);

        // Leaf shape
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 4), goldMat);
        leaf.rotation.x = Math.PI / 3;
        leaf.rotation.y = Math.random() * Math.PI;
        leafGroup.add(leaf);

        // Emerald Gem Bud
        if (i % 24 === 0) {
          const bud = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), emeraldGemMat);
          bud.position.y = 0.15;
          leafGroup.add(bud);
        }

        group.add(leafGroup);
      }

      // D. Corinthian Capital (Sculpted Acanthus Leaves & Corner Volutes in Gold)
      const capGroup = new THREE.Group();
      capGroup.position.y = 3.6;

      // Bell Core
      const bellCore = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.82, 1.1, 32), marbleMat);
      capGroup.add(bellCore);

      // 8 Sculpted Acanthus Leaves around Capital Bell
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const leafMesh = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.9, 8), goldMat);
        leafMesh.position.set(Math.cos(angle) * 0.95, -0.1, Math.sin(angle) * 0.95);
        leafMesh.rotation.z = -Math.cos(angle) * 0.35;
        leafMesh.rotation.x = Math.sin(angle) * 0.35;
        capGroup.add(leafMesh);
      }

      // 4 Corner Volute Scrolls with Emerald Inlays
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const volute = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 12, 24), darkGoldMat);
        volute.position.set(Math.cos(angle) * 1.05, 0.42, Math.sin(angle) * 1.05);
        volute.rotation.y = angle;
        capGroup.add(volute);

        // Emerald gemstone centerpiece
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), emeraldGemMat);
        gem.position.set(Math.cos(angle) * 1.15, 0.45, Math.sin(angle) * 1.15);
        capGroup.add(gem);
      }

      // Molded Abacus Top Block
      const abacus = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.22, 2.3), darkMarbleMat);
      abacus.position.y = 0.62;
      abacus.castShadow = true;
      capGroup.add(abacus);

      const abacusGoldBorder = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.08, 2.36), goldMat);
      abacusGoldBorder.position.y = 0.74;
      capGroup.add(abacusGoldBorder);

      group.add(capGroup);

      return group;
    };

    // 7. Colonnade Composition Setup
    const pillarsGroup = new THREE.Group();
    scene.add(pillarsGroup);

    // Create dynamic multi-layered symmetrical pillars
    const pillarData = [
      { id: 'p1_left', inscription: 'ΚΛΗΣΙΣ • The Divine Calling (1 Tim 6:12)', posX: -3.0, posZ: 2, scale: 0.95, speedY: 0.002, pairId: 0 },
      { id: 'p1_right', inscription: 'TELC Christ Church Tambaram • 35th ChristFest', posX: 3.0, posZ: 2, scale: 0.95, speedY: -0.002, pairId: 0 },
      { id: 'p2_left', inscription: 'Fight the Good Fight of Faith (1 Tim 6:12)', posX: -5.6, posZ: -3.5, scale: 0.82, speedY: -0.0018, pairId: 1 },
      { id: 'p2_right', inscription: 'Take Hold of Eternal Life (1 Tim 6:12)', posX: 5.6, posZ: -3.5, scale: 0.82, speedY: 0.0018, pairId: 1 },
      { id: 'p3_center', inscription: 'Keep the Commandment Without Spot or Blemish', posX: 0, posZ: -7.5, scale: 0.72, speedY: 0.0025, pairId: 2 },
    ];

    const pillarMeshes: THREE.Group[] = [];

    pillarData.forEach((d) => {
      const p = createCorinthianPillar(d.id, d.inscription);
      p.position.set(d.posX, 0, d.posZ);
      p.scale.set(d.scale, d.scale, d.scale);
      p.userData.basePosY = 0;
      p.userData.baseRotY = d.posX < 0 ? Math.PI / 6 : d.posX > 0 ? -Math.PI / 6 : 0;
      p.userData.speedY = d.speedY;
      p.userData.pairId = d.pairId;
      p.rotation.y = p.userData.baseRotY;

      pillarsGroup.add(p);
      pillarMeshes.push(p);
    });

    // 8. Cathedral Sunbeams Cone
    const sunbeamGeo = new THREE.CylinderGeometry(0.5, 6, 16, 32, 1, true);
    const sunbeamMesh = new THREE.Mesh(sunbeamGeo, lightBeamMat);
    sunbeamMesh.position.set(-4, 2, -2);
    scene.add(sunbeamMesh);

    // 9. Ambient Gold Dust Particles
    const dustCount = 90;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 14;
      dustPositions[i + 1] = -5 + Math.random() * 12;
      dustPositions[i + 2] = (Math.random() - 0.5) * 14;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.09,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 10. Scroll Listener for Smooth Architectural Parallax
    const handleScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 11. Raycaster for Touch / Click Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pillarsGroup.children, true);

      if (intersects.length > 0) {
        // Find top-level pillar group
        let hitObj: THREE.Object3D | null = intersects[0].object;
        while (hitObj && hitObj.parent && hitObj.parent !== pillarsGroup) {
          hitObj = hitObj.parent;
        }

        if (hitObj && hitObj instanceof THREE.Group) {
          const pillarGroup = hitObj as THREE.Group;
          activeTouchPillarRef.current = pillarGroup;
          touchPillarAnimTimeRef.current = 1.0;

          // Play sacred chime audio
          sacredAudio.playChime();

          if (pillarGroup.userData.inscription) {
            setActiveInscription(pillarGroup.userData.inscription);
          }

          setTouchHint(true);
          setTimeout(() => setTouchHint(false), 3000);

          if (onColumnTouch) {
            onColumnTouch();
          }
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    domElem.addEventListener('mousedown', onMouseDown);

    // Intersection Observer for pausing rendering when offscreen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // 12. Main Render & Scroll Physics Loop
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause rendering loop when scrolled offscreen

      const elapsedTime = clock.getElapsedTime();
      const scrollY = scrollYRef.current;

      // Parallax ratio
      const scrollRatio = scrollY * 0.0025;

      // Animate Camera slightly based on scroll
      camera.position.y = -scrollRatio * 1.5;
      camera.position.z = 16 - Math.sin(scrollRatio * 0.5) * 1.5;

      // Animate Pillars dynamically with scroll parallax & subtle rotations while preserving pair symmetry
      pillarMeshes.forEach((p) => {
        const speedY = p.userData.speedY || 0.002;
        const pairId = p.userData.pairId ?? 0;

        // Base rotation
        p.rotation.y += speedY;

        // Synchronized vertical scroll parallax shift per pair (preserves symmetry)
        const targetY = (p.userData.basePosY || 0) + Math.sin(scrollRatio * 1.2 + pairId * 1.6) * 0.6;
        p.position.y = THREE.MathUtils.lerp(p.position.y, targetY, 0.05);
      });

      // Handle active touched pillar response (glow & rotation surge)
      if (activeTouchPillarRef.current && touchPillarAnimTimeRef.current > 0) {
        touchPillarAnimTimeRef.current -= 0.02;
        activeTouchPillarRef.current.rotation.y += 0.06;
        rimGold.intensity = 3.5 + touchPillarAnimTimeRef.current * 4.0;

        if (touchPillarAnimTimeRef.current <= 0) {
          activeTouchPillarRef.current = null;
        }
      } else {
        rimGold.intensity = THREE.MathUtils.lerp(rimGold.intensity, 3.5, 0.05);
      }

      // Rotate light beam & gold dust particles
      sunbeamMesh.rotation.y = elapsedTime * 0.05;
      dustParticles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Responsive Resize Handler (Adapts FOV & group scale to fit all screen aspect ratios)
    const updateResponsiveLayout = (newW: number, newH: number) => {
      const aspect = newW / newH;

      if (aspect < 0.65) {
        // Very narrow mobile screens (320px - 380px)
        camera.fov = 62;
        pillarsGroup.scale.set(0.78, 0.78, 0.78);
      } else if (aspect < 1.0) {
        // Standard mobile portrait
        camera.fov = 55;
        pillarsGroup.scale.set(0.88, 0.88, 0.88);
      } else {
        // Tablet / Landscape
        camera.fov = 50;
        pillarsGroup.scale.set(1.0, 1.0, 1.0);
      }

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    // Initial sizing check
    updateResponsiveLayout(width, height);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height || window.innerHeight;
        updateResponsiveLayout(newW, newH);
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animFrameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      domElem.removeEventListener('touchstart', onTouchStart);
      domElem.removeEventListener('mousedown', onMouseDown);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-auto select-none overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Active Inscription Badge */}
      <div className="absolute bottom-3 left-3 right-3 z-10 px-3.5 py-2 rounded-xl bg-[#04120d]/85 border border-[#D4AF37]/50 text-center backdrop-blur-md shadow-lg pointer-events-none transition-all duration-300">
        <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>{activeInscription}</span>
        </div>
      </div>
    </div>
  );
};

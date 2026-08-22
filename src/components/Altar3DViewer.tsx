import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Flame, RotateCw, Sparkles, Sun, Award } from 'lucide-react';
import { sacredAudio } from '../lib/audio';
import { useLanguage } from '../context/LanguageContext';

export const Altar3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const candlesLitRef = useRef(candlesLit);
  const [, setIsHovered] = useState(false);
  const hasAutoLitRef = useRef(false);
  const { language } = useLanguage();

  useEffect(() => {
    candlesLitRef.current = candlesLit;
  }, [candlesLit]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);
  const flameGroupsRef = useRef<THREE.Group[]>([]);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);
  const haloLightRef = useRef<THREE.PointLight | null>(null);
  const haloMeshRef = useRef<THREE.Mesh | null>(null);

  // Mouse rotation control & tap detection state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.05, y: 0 });
  const currentRotationRef = useRef({ x: 0.05, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Auto-light candles when user scrolls down far enough into view & pause when offscreen
    let isInView = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView = entry.isIntersecting;
          if (entry.isIntersecting && !hasAutoLitRef.current) {
            hasAutoLitRef.current = true;
            setCandlesLit(true);
            sacredAudio.playAweInspiringIgnition(2.5);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    const initialZ = width < 500 ? 11.5 : 10.0;
    camera.position.set(0, 0.4, initialZ);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff8e7, 1.3);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff8e7, 0x443322, 1.1);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
    keyLight.position.set(4, 12, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7188a4, 0.8);
    rimLight.position.set(-6, 4, -3);
    scene.add(rimLight);

    // Root 3D Logo & Candle Group
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;
    scene.add(logoGroup);

    // --- MATERIALS ---
    // Polished Radiant Gold
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.55,
      roughness: 0.22,
    });

    // Warm Champagne Gold Accent
    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      metalness: 0.5,
      roughness: 0.28,
    });

    // Deep Emerald Green Velvet Backing Disc
    const emeraldMat = new THREE.MeshStandardMaterial({
      color: 0x063a2b,
      roughness: 0.5,
      metalness: 0.2,
    });

    // Polished Marble Step Base
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0x081f18,
      roughness: 0.3,
      metalness: 0.1,
    });

    // Cream Candle Wax
    const waxMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf2,
      roughness: 0.35,
      metalness: 0.0,
    });

    // Polished Brass Candlesticks
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdaac38,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Halo Glow Material
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    // --- GEOMETRY CONSTRUCTION ---

    // A. Background Halo Disc
    const haloGeo = new THREE.CircleGeometry(3.0, 64);
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, 0.8, -2.2);
    haloMeshRef.current = haloMesh;
    logoGroup.add(haloMesh);

    const haloLight = new THREE.PointLight(0xffb732, 3.0, 10);
    haloLight.position.set(0, 0.8, -1.5);
    haloLightRef.current = haloLight;
    scene.add(haloLight);

    // B. Marble Step Base Pedestal
    const base1Geo = new THREE.BoxGeometry(6.5, 0.3, 2.5);
    const base1 = new THREE.Mesh(base1Geo, marbleMat);
    base1.position.set(0, -2.6, 0);
    base1.receiveShadow = true;
    base1.castShadow = true;
    logoGroup.add(base1);

    const base2Geo = new THREE.BoxGeometry(5.8, 0.25, 2.2);
    const base2 = new THREE.Mesh(base2Geo, marbleMat);
    base2.position.set(0, -2.35, 0);
    base2.receiveShadow = true;
    base2.castShadow = true;
    logoGroup.add(base2);

    const baseGoldTrimGeo = new THREE.BoxGeometry(5.82, 0.06, 2.22);
    const baseGoldTrim = new THREE.Mesh(baseGoldTrimGeo, goldMat);
    baseGoldTrim.position.set(0, -2.2, 0);
    logoGroup.add(baseGoldTrim);

    // C. Central Medallion Shield
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(0, 0.3, 0);

    // Outer Gold Beveled Ring
    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.18, 24, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
    outerRing.castShadow = true;
    outerRing.receiveShadow = true;
    emblemGroup.add(outerRing);

    // Inner Gold Beveled Ring Accent
    const innerRingGeo = new THREE.TorusGeometry(1.82, 0.06, 20, 64);
    const innerRing = new THREE.Mesh(innerRingGeo, darkGoldMat);
    emblemGroup.add(innerRing);

    // Deep Emerald Center Disc
    const centerDiscGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.12, 64);
    const centerDisc = new THREE.Mesh(centerDiscGeo, emeraldMat);
    centerDisc.rotation.x = Math.PI / 2;
    centerDisc.position.z = -0.05;
    centerDisc.receiveShadow = true;
    emblemGroup.add(centerDisc);

    // D. 3D Greek Laurel Wreaths in Gold
    const wreathGroup = new THREE.Group();

    // Helper to generate a 3D leaf mesh
    const createLeafGeo = () => {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(0.12, 0.25, 0, 0.55);
      leafShape.quadraticCurveTo(-0.12, 0.25, 0, 0);

      return new THREE.ExtrudeGeometry(leafShape, {
        depth: 0.03,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 3,
      });
    };

    const leafGeo = createLeafGeo();

    // Create Left and Right Laurel Wreath Arcs
    const leavesCount = 14;
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < leavesCount; i++) {
        const progress = i / (leavesCount - 1);
        const angle = -Math.PI * 0.45 + progress * Math.PI * 0.9;
        const radius = 2.28;

        const x = side * (Math.cos(angle) * radius);
        const y = Math.sin(angle) * radius;

        // Leaf Pair 1 (Outer)
        const leaf1 = new THREE.Mesh(leafGeo, goldMat);
        leaf1.position.set(x, y, 0.08);
        leaf1.rotation.z = angle + (side * Math.PI) / 3;
        leaf1.rotation.y = side * 0.2;
        leaf1.scale.set(0.9, 1.0, 0.9);
        leaf1.castShadow = true;
        wreathGroup.add(leaf1);

        // Leaf Pair 2 (Inner slightly smaller)
        const leaf2 = new THREE.Mesh(leafGeo, goldMat);
        leaf2.position.set(x * 0.92, y * 0.92, 0.12);
        leaf2.rotation.z = angle + (side * Math.PI) / 2.2;
        leaf2.scale.set(0.7, 0.8, 0.7);
        leaf2.castShadow = true;
        wreathGroup.add(leaf2);

        // Gold Berry Accents
        if (i % 2 === 0) {
          const berryGeo = new THREE.SphereGeometry(0.06, 12, 12);
          const berry = new THREE.Mesh(berryGeo, darkGoldMat);
          berry.position.set(x * 0.96, y * 0.96, 0.15);
          wreathGroup.add(berry);
        }
      }
    }

    // Bottom Wreath Ribbon Bow Tie in Gold
    const bowCenterGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const bowCenter = new THREE.Mesh(bowCenterGeo, goldMat);
    bowCenter.position.set(0, -2.25, 0.18);
    wreathGroup.add(bowCenter);

    const bowRibbonLeftGeo = new THREE.TorusGeometry(0.35, 0.08, 12, 24, Math.PI);
    const bowRibbonLeft = new THREE.Mesh(bowRibbonLeftGeo, goldMat);
    bowRibbonLeft.position.set(-0.3, -2.3, 0.15);
    bowRibbonLeft.rotation.z = Math.PI / 4;
    wreathGroup.add(bowRibbonLeft);

    const bowRibbonRight = new THREE.Mesh(bowRibbonLeftGeo, goldMat);
    bowRibbonRight.position.set(0.3, -2.3, 0.15);
    bowRibbonRight.rotation.z = -Math.PI / 4;
    wreathGroup.add(bowRibbonRight);

    emblemGroup.add(wreathGroup);

    // E. Extruded 3D "35" Numeral in Gold
    const numGroup = new THREE.Group();
    numGroup.position.set(0, 0, 0.1);

    // Digit "3" 3D Shape
    const shape3 = new THREE.Shape();
    // Outer arc 3
    shape3.moveTo(-0.8, 0.5);
    shape3.quadraticCurveTo(-0.2, 0.85, 0.35, 0.5);
    shape3.quadraticCurveTo(0.7, 0.2, 0.25, -0.05);
    shape3.quadraticCurveTo(0.75, -0.35, 0.35, -0.7);
    shape3.quadraticCurveTo(-0.2, -0.95, -0.8, -0.6);
    // Inner cutout path
    shape3.lineTo(-0.7, -0.42);
    shape3.quadraticCurveTo(-0.15, -0.68, 0.1, -0.5);
    shape3.quadraticCurveTo(0.38, -0.28, -0.05, -0.08);
    shape3.lineTo(-0.25, 0.08);
    shape3.lineTo(-0.05, 0.08);
    shape3.quadraticCurveTo(0.35, 0.25, 0.1, 0.42);
    shape3.quadraticCurveTo(-0.15, 0.6, -0.7, 0.35);
    shape3.closePath();

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 5,
    };

    const geo3 = new THREE.ExtrudeGeometry(shape3, extrudeSettings);
    geo3.center();
    const mesh3 = new THREE.Mesh(geo3, goldMat);
    mesh3.position.set(-0.55, 0.1, 0.12);
    mesh3.castShadow = true;
    numGroup.add(mesh3);

    // Digit "5" 3D Shape
    const shape5 = new THREE.Shape();
    shape5.moveTo(0.5, 0.72);
    shape5.lineTo(-0.45, 0.72);
    shape5.lineTo(-0.55, 0.05);
    shape5.quadraticCurveTo(0.2, 0.25, 0.45, -0.1);
    shape5.quadraticCurveTo(0.68, -0.45, 0.25, -0.72);
    shape5.quadraticCurveTo(-0.35, -0.92, -0.7, -0.55);
    shape5.lineTo(-0.58, -0.35);
    shape5.quadraticCurveTo(-0.2, -0.65, 0.05, -0.52);
    shape5.quadraticCurveTo(0.32, -0.38, 0.15, -0.15);
    shape5.quadraticCurveTo(-0.1, 0.02, -0.75, -0.12);
    shape5.lineTo(-0.62, 0.95);
    shape5.lineTo(0.5, 0.95);
    shape5.closePath();

    const geo5 = new THREE.ExtrudeGeometry(shape5, extrudeSettings);
    geo5.center();
    const mesh5 = new THREE.Mesh(geo5, goldMat);
    mesh5.position.set(0.55, 0.1, 0.12);
    mesh5.castShadow = true;
    numGroup.add(mesh5);

    emblemGroup.add(numGroup);

    // F. Golden Cross Accent atop Medallion
    const crossVertGeo = new THREE.BoxGeometry(0.12, 0.7, 0.12);
    const crossVert = new THREE.Mesh(crossVertGeo, goldMat);
    crossVert.position.set(0, 2.38, 0.05);
    crossVert.castShadow = true;
    emblemGroup.add(crossVert);

    const crossHorizGeo = new THREE.BoxGeometry(0.48, 0.12, 0.12);
    const crossHoriz = new THREE.Mesh(crossHorizGeo, goldMat);
    crossHoriz.position.set(0, 2.5, 0.05);
    crossHoriz.castShadow = true;
    emblemGroup.add(crossHoriz);

    // Top Crown Star
    const starGeo = new THREE.OctahedronGeometry(0.18, 0);
    const starMesh = new THREE.Mesh(starGeo, goldMat);
    starMesh.position.set(0, 2.85, 0.05);
    emblemGroup.add(starMesh);

    // Function to create a crisp gold inscription texture for 3D banners
    const createBannerTextTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;

      // Radiant Gold Banner Fill
      const grad = ctx.createLinearGradient(0, 0, 1024, 128);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#f59e0b');
      grad.addColorStop(0.7, '#d97706');
      grad.addColorStop(1, '#fef08a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 128);

      // Gold Metallic Border
      ctx.strokeStyle = '#fffbeb';
      ctx.lineWidth = 6;
      ctx.strokeRect(4, 4, 1016, 120);

      // Engraved Inscription in Dark Emerald
      ctx.fillStyle = '#062017';
      ctx.font = 'bold 52px "Cinzel", "Cinzel Decorative", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(text, 512, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const upperBannerTex = createBannerTextTexture('35th ANNIVERSARY');
    const lowerBannerTex = createBannerTextTexture('KLESIS • CII 1991 - 2026');

    const upperBannerMat = new THREE.MeshStandardMaterial({
      map: upperBannerTex,
      metalness: 0.7,
      roughness: 0.25,
    });

    const lowerBannerMat = new THREE.MeshStandardMaterial({
      map: lowerBannerTex,
      metalness: 0.7,
      roughness: 0.25,
    });

    // G. Arc Ribbon Banners
    // Upper Banner "35th ANNIVERSARY"
    const upperBannerGeo = new THREE.BoxGeometry(2.4, 0.28, 0.08);
    const upperBanner = new THREE.Mesh(upperBannerGeo, upperBannerMat);
    upperBanner.position.set(0, 1.35, 0.22);
    emblemGroup.add(upperBanner);

    // Lower Banner "KLESIS • CII 1991 - 2026"
    const lowerBannerGeo = new THREE.BoxGeometry(2.85, 0.32, 0.08);
    const lowerBanner = new THREE.Mesh(lowerBannerGeo, lowerBannerMat);
    lowerBanner.position.set(0, -1.25, 0.22);
    emblemGroup.add(lowerBanner);

    logoGroup.add(emblemGroup);

    // H. Helper for 3D Candle Flames
    const create3DFlameMesh = () => {
      const flameGroup = new THREE.Group();

      // Outer Flame Teardrop
      const outerShape = new THREE.Shape();
      outerShape.moveTo(0, 0);
      outerShape.quadraticCurveTo(0.12, 0.22, 0, 0.52);
      outerShape.quadraticCurveTo(-0.12, 0.22, 0, 0);

      const outerExtrude = new THREE.ExtrudeGeometry(outerShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
      });
      outerExtrude.center();

      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.9,
      });

      const outerMesh = new THREE.Mesh(outerExtrude, outerMat);
      outerMesh.position.y = 0.26;
      flameGroup.add(outerMesh);

      // Inner Glowing Core
      const innerShape = new THREE.Shape();
      innerShape.moveTo(0, 0);
      innerShape.quadraticCurveTo(0.07, 0.14, 0, 0.34);
      innerShape.quadraticCurveTo(-0.07, 0.14, 0, 0);

      const innerExtrude = new THREE.ExtrudeGeometry(innerShape, {
        depth: 0.06,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
      });
      innerExtrude.center();

      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xfff066,
      });

      const innerMesh = new THREE.Mesh(innerExtrude, innerMat);
      innerMesh.position.set(0, 0.22, 0.01);
      flameGroup.add(innerMesh);

      // Outer Glow Aura
      const glowGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.y = 0.24;
      flameGroup.add(glowMesh);

      return flameGroup;
    };

    // I. Flanking Candles on Left and Right Sides
    const flameGroups: THREE.Group[] = [];
    const flameLights: THREE.PointLight[] = [];

    const createCandlestick = (xPos: number, zPos: number, height: number) => {
      const group = new THREE.Group();
      group.position.set(xPos, -2.2, zPos);

      // Brass Pedestal Base
      const baseGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.15, 24);
      const baseMesh = new THREE.Mesh(baseGeo, brassMat);
      baseMesh.castShadow = true;
      group.add(baseMesh);

      // Spindle Stem
      const stemGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.6, 16);
      const stem = new THREE.Mesh(stemGeo, brassMat);
      stem.position.y = 0.35;
      stem.castShadow = true;
      group.add(stem);

      // Drip Pan Cup
      const cupGeo = new THREE.CylinderGeometry(0.24, 0.12, 0.15, 20);
      const cupMesh = new THREE.Mesh(cupGeo, brassMat);
      cupMesh.position.y = 0.7;
      cupMesh.castShadow = true;
      group.add(cupMesh);

      // Cream Taper Candle Body
      const candleGeo = new THREE.CylinderGeometry(0.1, 0.1, height, 20);
      const candleMesh = new THREE.Mesh(candleGeo, waxMat);
      candleMesh.position.y = 0.7 + height / 2;
      candleMesh.castShadow = true;
      group.add(candleMesh);

      // Black Wick
      const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8);
      const wickMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      const wickMesh = new THREE.Mesh(wickGeo, wickMat);
      wickMesh.position.y = 0.7 + height + 0.07;
      group.add(wickMesh);

      logoGroup.add(group);

      // Flame 3D Group
      const flameGroup = create3DFlameMesh();
      flameGroup.position.set(xPos, -2.2 + 0.7 + height + 0.15, zPos);
      logoGroup.add(flameGroup);
      flameGroups.push(flameGroup);

      // Point Light
      const flameLight = new THREE.PointLight(0xffaa33, 2.8, 6);
      flameLight.position.set(xPos, -2.2 + 0.7 + height + 0.35, zPos);
      flameLight.castShadow = false;
      scene.add(flameLight);
      flameLights.push(flameLight);
    };

    // Left Side Pair of Candles (Brought closer to center and slightly forward for full visibility)
    createCandlestick(-1.9, 0.4, 2.0);
    createCandlestick(-2.5, 0.2, 2.3);

    // Right Side Pair of Candles (Brought closer to center and slightly forward for full visibility)
    createCandlestick(1.9, 0.4, 2.0);
    createCandlestick(2.5, 0.2, 2.3);

    flameGroupsRef.current = flameGroups;
    flameLightsRef.current = flameLights;

    // J. Floating Ambient Sparkle Dust Particles
    const sparkCount = 50;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount * 3; i += 3) {
      sparkPos[i] = (Math.random() - 0.5) * 6.5;
      sparkPos[i + 1] = -1.5 + Math.random() * 4.5;
      sparkPos[i + 2] = (Math.random() - 0.5) * 3.0;
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // Trigger Ignition and Awe-Inspiring Audio
    const triggerIgniteAndSparkles = () => {
      setCandlesLit(true);
      sacredAudio.playAweInspiringIgnition(2.5);
    };

    // --- MOUSE DRAG & ORBIT CONTROLS ---
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.005;

      targetRotationRef.current.x = Math.max(-0.25, Math.min(0.35, targetRotationRef.current.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dist = Math.hypot(e.clientX - dragStartPosRef.current.x, e.clientY - dragStartPosRef.current.y);
        if (dist < 8) {
          triggerIgniteAndSparkles();
        }
      }
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        dragStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.005;

      targetRotationRef.current.x = Math.max(-0.25, Math.min(0.35, targetRotationRef.current.x));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDraggingRef.current && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const dist = Math.hypot(touch.clientX - dragStartPosRef.current.x, touch.clientY - dragStartPosRef.current.y);
        if (dist < 10) {
          triggerIgniteAndSparkles();
        }
      }
      isDraggingRef.current = false;
    };

    domElem.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // --- ANIMATION LOOP ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isInView) return; // Skip 3D computations and rendering when scrolled out of view

      const elapsedTime = clock.getElapsedTime();

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (logoGroupRef.current) {
        const idleY = isDraggingRef.current ? 0 : Math.sin(elapsedTime * 0.4) * 0.08;
        logoGroupRef.current.rotation.x = currentRotationRef.current.x;
        logoGroupRef.current.rotation.y = currentRotationRef.current.y + idleY;
      }

      // Candle Flame Animation & Illumination Lerp
      const isLit = candlesLitRef.current;
      const targetScale = isLit ? 1 : 0.0001;
      const targetLightIntensity = isLit ? 2.8 : 0.0;
      const targetHaloOpacity = isLit ? 0.4 : 0.08;

      flameGroupsRef.current.forEach((fg, idx) => {
        fg.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

        if (isLit) {
          const flick = Math.sin(elapsedTime * (14 + idx * 2)) * 0.12 + Math.cos(elapsedTime * (20 + idx * 3)) * 0.08;
          fg.rotation.z = flick * 0.25;
          fg.scale.y = 1 + flick * 0.18;
        }
      });

      flameLightsRef.current.forEach((fl, idx) => {
        const flickLight = isLit ? Math.sin(elapsedTime * (16 + idx * 3)) * 0.35 + Math.cos(elapsedTime * (22 + idx * 2)) * 0.2 : 0;
        fl.intensity = THREE.MathUtils.lerp(fl.intensity, Math.max(0, targetLightIntensity + flickLight), 0.15);
      });

      if (haloMeshRef.current && haloMat) {
        haloMat.opacity = THREE.MathUtils.lerp(haloMat.opacity, targetHaloOpacity, 0.1);
      }
      if (haloLightRef.current) {
        haloLightRef.current.intensity = THREE.MathUtils.lerp(
          haloLightRef.current.intensity,
          isLit ? 3.0 : 0.4,
          0.1
        );
      }

      sparkParticles.visible = isLit;
      if (isLit) {
        sparkParticles.rotation.y = elapsedTime * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      if (w < 400) {
        camera.position.z = 13.0;
      } else if (w < 550) {
        camera.position.z = 11.8;
      } else {
        camera.position.z = 10.2;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // Initial sizing run to ensure model fits inside frame immediately
    updateSize(width, height);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height || 500;
        updateSize(w, h);
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleToggleCandles = () => {
    const nextState = !candlesLit;
    setCandlesLit(nextState);
    if (nextState) {
      sacredAudio.playAweInspiringIgnition(2.5);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-2xl overflow-hidden dark-monument-card border-2 border-[#D4AF37]/60 shadow-[0_0_40px_rgba(212,175,55,0.25)] group select-none"
    >
      {/* Top Controls Bar */}
      <div className="px-5 py-2.5 bg-gradient-to-r from-[#0B3D2E] via-[#082e23] to-[#041a13] border-b border-[#D4AF37]/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider">
            {language === 'ta' ? '35 ஆண்டுகள் கிறைஸ்ட்ஃபெஸ்ட்' : '35 Years of ChristFest'}
          </span>
        </div>

        <button
          onClick={handleToggleCandles}
          className={`text-[11px] font-serif px-3.5 py-1.5 rounded-full border font-bold transition-all flex items-center gap-1.5 shadow-md ${
            candlesLit
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 hover:bg-amber-500 hover:text-black'
              : 'bg-stone-800 text-stone-300 border-stone-600 hover:bg-stone-700'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${candlesLit ? 'text-amber-400 animate-pulse' : 'text-stone-400'}`} />
          <span>{candlesLit ? (language === 'ta' ? 'மெழுகுவர்த்திகள் எரிகின்றன' : 'Candles Lit') : (language === 'ta' ? 'மெழுகுவர்த்திகளை ஏற்றவும்' : 'Light Candles')}</span>
        </button>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] bg-gradient-to-b from-[#05110d] via-[#081e17] to-[#040e0a] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Instruction Badge */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#062c22]/90 border border-[#D4AF37]/40 text-stone-200 text-xs font-serif backdrop-blur-md shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-white font-medium">
              {language === 'ta' ? '3D காட்சியைச் சுழற்ற கிளிக் செய்து நகர்த்தவும்!' : 'Touch & Drag 3D Model to Rotate'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#A7F3D0]">
            <RotateCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '5s' }} />
            <span>35 Years of ChristFest</span>
          </div>
        </div>
      </div>
    </div>
  );
};

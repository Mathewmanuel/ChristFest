import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  onColumnTouch?: () => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ onColumnTouch }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [, setIsInteractive] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // Renderer with soft shadow maps
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xf2f0eb, 1.2);
    scene.add(ambientLight);

    // Key directional light for deep shadow definition on column flutes & capital curves
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(-10, 16, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Soft fill light from opposite angle for realistic gradient shading
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 1.0);
    fillLight.position.set(12, -8, 8);
    scene.add(fillLight);

    // Point light following cursor for interactive highlight
    const cursorLight = new THREE.PointLight(0xe2e8f0, 2.5, 20);
    cursorLight.position.set(0, 0, 8);
    scene.add(cursorLight);

    // Procedural High-Detail Marble/Granite Texture with Realistic Gradients
    const createClassicStoneTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      
      // Fine Pentelic marble cream-gray gradient
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#f5f4f0');
      grad.addColorStop(0.3, '#e8e6df');
      grad.addColorStop(0.7, '#dcd8cf');
      grad.addColorStop(1, '#f0eee8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine stone grain & subtle natural slate veins (No gold)
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 28; i++) {
        ctx.beginPath();
        let x = Math.random() * 1024;
        let y = Math.random() * 1024;
        ctx.moveTo(x, y);
        ctx.strokeStyle = `rgba(60, 64, 62, ${0.08 + Math.random() * 0.12})`;
        
        for (let j = 0; j < 6; j++) {
          x += (Math.random() - 0.5) * 140;
          y += Math.random() * 150;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 2);
      return texture;
    };

    const stoneTexture = createClassicStoneTexture();

    // Pure Stone Marble Material — Clean classical finish, zero gold!
    const stoneMarbleMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.25,
      metalness: 0.05,
    });

    // Slightly darker stone for base plinth and upper moldings
    const darkStoneMoldMat = new THREE.MeshStandardMaterial({
      color: 0xcdc9bf,
      roughness: 0.35,
      metalness: 0.05,
    });

    // --- CLASSICAL FLUTED CORINTHIAN COLUMN BUILDER ---
    const createFlutedStoneColumn = (xOffset: number, scale = 1) => {
      const group = new THREE.Group();

      // 1. Plinth Square Base
      const plinthGeo = new THREE.BoxGeometry(3.0, 0.8, 3.0);
      const plinthMesh = new THREE.Mesh(plinthGeo, darkStoneMoldMat);
      plinthMesh.position.y = -5.2;
      plinthMesh.castShadow = true;
      plinthMesh.receiveShadow = true;
      group.add(plinthMesh);

      // 2. Attic Base Moldings (Lower Torus & Upper Torus in pure stone)
      const lowerTorusGeo = new THREE.TorusGeometry(1.4, 0.2, 16, 48);
      const lowerTorus = new THREE.Mesh(lowerTorusGeo, stoneMarbleMat);
      lowerTorus.rotation.x = Math.PI / 2;
      lowerTorus.position.y = -4.6;
      group.add(lowerTorus);

      const upperTorusGeo = new THREE.TorusGeometry(1.25, 0.15, 16, 48);
      const upperTorus = new THREE.Mesh(upperTorusGeo, stoneMarbleMat);
      upperTorus.rotation.x = Math.PI / 2;
      upperTorus.position.y = -4.2;
      group.add(upperTorus);

      // 3. Main Column Shaft (Smooth tapering cylinder with smooth polished marble finish)
      const shaftHeight = 7.6;
      const shaftGeo = new THREE.CylinderGeometry(0.95, 1.15, shaftHeight, 64);
      const shaftMesh = new THREE.Mesh(shaftGeo, stoneMarbleMat);
      shaftMesh.position.y = -0.3;
      shaftMesh.castShadow = true;
      shaftMesh.receiveShadow = true;
      group.add(shaftMesh);

      // 4. Corinthian Capital (Bell, Sculpted Stone Acanthus Leaves & Corner Volutes)
      const capitalBellGroup = new THREE.Group();
      capitalBellGroup.position.y = 3.8;

      // Bell core
      const bellCoreGeo = new THREE.CylinderGeometry(1.4, 0.95, 1.2, 32);
      const bellCore = new THREE.Mesh(bellCoreGeo, stoneMarbleMat);
      capitalBellGroup.add(bellCore);

      // Tier 1 Acanthus Leaves (8 outer leaves in stone)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const leafShape = new THREE.Shape();
        leafShape.moveTo(0, 0);
        leafShape.quadraticCurveTo(0.25, 0.5, 0, 1.0);
        leafShape.quadraticCurveTo(-0.25, 0.5, 0, 0);

        const leafExtrude = new THREE.ExtrudeGeometry(leafShape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.03 });
        const leafMesh = new THREE.Mesh(leafExtrude, stoneMarbleMat);
        leafMesh.position.set(Math.cos(angle) * 1.05, -0.5, Math.sin(angle) * 1.05);
        leafMesh.rotation.y = -angle + Math.PI / 2;
        leafMesh.rotation.x = -0.25;
        capitalBellGroup.add(leafMesh);
      }

      // Tier 2 Acanthus Leaves (8 upper leaves in stone)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const leafShape = new THREE.Shape();
        leafShape.moveTo(0, 0);
        leafShape.quadraticCurveTo(0.3, 0.6, 0, 1.2);
        leafShape.quadraticCurveTo(-0.3, 0.6, 0, 0);

        const leafExtrude = new THREE.ExtrudeGeometry(leafShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.04 });
        const leafMesh = new THREE.Mesh(leafExtrude, stoneMarbleMat);
        leafMesh.position.set(Math.cos(angle) * 1.15, -0.2, Math.sin(angle) * 1.15);
        leafMesh.rotation.y = -angle + Math.PI / 2;
        leafMesh.rotation.x = -0.35;
        capitalBellGroup.add(leafMesh);
      }

      // Corner Volutes (4 Stone Scrolls)
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const voluteGeo = new THREE.TorusGeometry(0.3, 0.08, 12, 24, Math.PI * 1.5);
        const voluteMesh = new THREE.Mesh(voluteGeo, stoneMarbleMat);
        voluteMesh.position.set(Math.cos(angle) * 1.35, 0.35, Math.sin(angle) * 1.35);
        voluteMesh.rotation.y = angle;
        capitalBellGroup.add(voluteMesh);
      }

      group.add(capitalBellGroup);

      // 5. Molded Abacus Top Block
      const abacusGeo = new THREE.BoxGeometry(2.8, 0.5, 2.8);
      const abacusMesh = new THREE.Mesh(abacusGeo, darkStoneMoldMat);
      abacusMesh.position.y = 4.6;
      abacusMesh.castShadow = true;
      group.add(abacusMesh);

      group.position.x = xOffset;
      group.scale.set(scale, scale, scale);

      return group;
    };

    // Columns (Pure stone, fluted with grooves)
    const leftColumn = createFlutedStoneColumn(-6.8, 1.1);
    const rightColumn = createFlutedStoneColumn(6.8, 1.1);
    const centerBackColumn = createFlutedStoneColumn(0, 0.85);
    centerBackColumn.position.z = -5;
    centerBackColumn.position.y = -1;

    scene.add(leftColumn);
    scene.add(rightColumn);
    scene.add(centerBackColumn);

    // Function to update column positions & camera z based on width
    const updateResponsiveLayout = (w: number) => {
      if (w < 640) {
        // Mobile screens: bring columns closer and scale down slightly
        leftColumn.position.x = -2.8;
        rightColumn.position.x = 2.8;
        leftColumn.scale.set(0.68, 0.68, 0.68);
        rightColumn.scale.set(0.68, 0.68, 0.68);
        centerBackColumn.scale.set(0.55, 0.55, 0.55);
        camera.position.z = 21;
      } else if (w < 1024) {
        // Tablet / Mid screens
        leftColumn.position.x = -4.8;
        rightColumn.position.x = 4.8;
        leftColumn.scale.set(0.9, 0.9, 0.9);
        rightColumn.scale.set(0.9, 0.9, 0.9);
        centerBackColumn.scale.set(0.7, 0.7, 0.7);
        camera.position.z = 19;
      } else {
        // Desktop screens
        leftColumn.position.x = -6.8;
        rightColumn.position.x = 6.8;
        leftColumn.scale.set(1.1, 1.1, 1.1);
        rightColumn.scale.set(1.1, 1.1, 1.1);
        centerBackColumn.scale.set(0.85, 0.85, 0.85);
        camera.position.z = 18;
      }
    };

    updateResponsiveLayout(width);

    // Subtle Ambient Light Specks / Dust
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement Tracking
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = x;
      targetY = y;

      cursorLight.position.x = x * 8;
      cursorLight.position.y = y * 5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for pausing rendering when offscreen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip work when offscreen

      const elapsedTime = clock.getElapsedTime();

      // Smooth column rotation and light highlights
      leftColumn.rotation.y = Math.sin(elapsedTime * 0.4) * 0.1 + targetX * 0.15;
      rightColumn.rotation.y = -Math.sin(elapsedTime * 0.4) * 0.1 + targetX * 0.15;
      centerBackColumn.rotation.y = elapsedTime * 0.06;

      leftColumn.position.y = Math.sin(elapsedTime * 0.6) * 0.06;
      rightColumn.position.y = Math.cos(elapsedTime * 0.6) * 0.06;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height || 500;
        camera.aspect = newWidth / newHeight;
        updateResponsiveLayout(newWidth);
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onClick={() => {
        setIsInteractive(true);
        if (onColumnTouch) onColumnTouch();
      }}
      className="absolute inset-0 z-0 cursor-pointer pointer-events-auto"
    />
  );
};

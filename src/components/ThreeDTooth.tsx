import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShieldCheck, Sparkles, Zap, Cpu, Maximize2 } from 'lucide-react';

interface ThreeDToothProps {
  className?: string;
  autoRotateSpeed?: number;
  highlightColor?: string;
  interactive?: boolean;
  minimal?: boolean;
}

type MaterialPreset = 'pearl' | 'rosegold' | 'glass';

export default function ThreeDTooth({
  className = '',
  autoRotateSpeed: initialRotateSpeed = 1,
  highlightColor = '#0ea5e9',
  interactive = true,
  minimal = false,
}: ThreeDToothProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Custom states for $400M Luxury brand interaction
  const [materialPreset, setMaterialPreset] = useState<MaterialPreset>('pearl');
  const [isScanning, setIsScanning] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(initialRotateSpeed);
  const [diagnosticMode, setDiagnosticMode] = useState<'structural' | 'density' | 'off'>('structural');

  // References for animation & rendering update triggers
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0.2, y: 0.5 });
  const previousMousePosition = useRef({ x: 0, y: 0 });
  
  // Three.js object references to dynamically update materials
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const toothMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const scannerRingRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Materials map for real-time dynamic switching
  const getMaterialForPreset = (preset: MaterialPreset) => {
    switch (preset) {
      case 'rosegold':
        return new THREE.MeshPhysicalMaterial({
          color: 0xe5a995,
          metalness: 0.9,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          reflectivity: 1.0,
        });
      case 'glass':
        return new THREE.MeshPhysicalMaterial({
          color: 0xdbeafe,
          transmission: 0.9,
          opacity: 1,
          transparent: true,
          roughness: 0.1,
          metalness: 0.1,
          ior: 1.5,
          thickness: 1.5,
        });
      case 'pearl':
      default:
        return new THREE.MeshPhysicalMaterial({
          color: 0xfbfbfb,
          roughness: 0.2,
          metalness: 0.05,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          transmission: 0.15, // Gives pearlescent translucent scatter look
          reflectivity: 0.9,
        });
    }
  };

  // Trigger material update dynamically when preset changes
  useEffect(() => {
    if (toothMaterialRef.current) {
      const targetMat = getMaterialForPreset(materialPreset);
      // Copy properties to maintain the instance
      toothMaterialRef.current.color.copy(targetMat.color);
      toothMaterialRef.current.roughness = targetMat.roughness;
      toothMaterialRef.current.metalness = targetMat.metalness;
      toothMaterialRef.current.clearcoat = targetMat.clearcoat ?? 0;
      toothMaterialRef.current.clearcoatRoughness = targetMat.clearcoatRoughness ?? 0;
      toothMaterialRef.current.reflectivity = targetMat.reflectivity ?? 0.5;
      
      // Handle glass specific attributes
      if (materialPreset === 'glass') {
        toothMaterialRef.current.transmission = 0.9;
        toothMaterialRef.current.transparent = true;
        toothMaterialRef.current.opacity = 0.85;
      } else if (materialPreset === 'pearl') {
        toothMaterialRef.current.transmission = 0.2;
        toothMaterialRef.current.transparent = false;
        toothMaterialRef.current.opacity = 1.0;
      } else {
        toothMaterialRef.current.transmission = 0.0;
        toothMaterialRef.current.transparent = false;
        toothMaterialRef.current.opacity = 1.0;
      }
      toothMaterialRef.current.needsUpdate = true;
    }

    // Adapt Rim lighting to match material tone
    if (rimLightRef.current) {
      if (materialPreset === 'rosegold') {
        rimLightRef.current.color.setHex(0xffaa66);
      } else if (materialPreset === 'glass') {
        rimLightRef.current.color.setHex(0x38bdf8);
      } else {
        rimLightRef.current.color.set(highlightColor);
      }
    }
  }, [materialPreset, highlightColor]);

  // Handle visual display parameters for the scanner overlays
  useEffect(() => {
    if (scannerRingRef.current) {
      scannerRingRef.current.visible = isScanning;
    }
    if (particlesRef.current) {
      particlesRef.current.visible = isScanning;
    }
  }, [isScanning]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    // Create Renderer with High Precision & Shadow support
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Premium Lighting Strategy
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(highlightColor), 1.8);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const softFillLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
    softFillLight.position.set(0, -5, 1);
    scene.add(softFillLight);

    // Main physical material instance
    const initialMat = getMaterialForPreset(materialPreset);
    const toothPhysicalMaterial = new THREE.MeshPhysicalMaterial({
      color: initialMat.color,
      roughness: initialMat.roughness,
      metalness: initialMat.metalness,
      clearcoat: initialMat.clearcoat,
      clearcoatRoughness: initialMat.clearcoatRoughness,
      transmission: initialMat.transmission,
      transparent: initialMat.transparent,
      opacity: initialMat.opacity,
      reflectivity: initialMat.reflectivity,
    });
    toothMaterialRef.current = toothPhysicalMaterial;

    const crownAccentMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(highlightColor),
      shininess: 150,
      specular: 0xffffff,
    });

    // Constructing high-fidelity Tooth geometry
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;

    // 1. Crown Main Base
    const crownGeom = new THREE.CylinderGeometry(0.8, 0.65, 1.1, 36, 18);
    const crownBase = new THREE.Mesh(crownGeom, toothPhysicalMaterial);
    crownBase.position.y = 0.25;
    toothGroup.add(crownBase);

    // 2. Crown Cusps for Molar Definition (4 rounded points on top of the molar)
    const cuspGeom = new THREE.SphereGeometry(0.36, 24, 24);
    cuspGeom.scale(1.0, 0.75, 1.0);

    const cuspPositions = [
      { x: 0.32, y: 0.72, z: 0.32 },
      { x: -0.32, y: 0.72, z: 0.32 },
      { x: 0.32, y: 0.72, z: -0.32 },
      { x: -0.32, y: 0.72, z: -0.32 }
    ];

    cuspPositions.forEach((pos) => {
      const cuspMesh = new THREE.Mesh(cuspGeom, toothPhysicalMaterial);
      cuspMesh.position.set(pos.x, pos.y, pos.z);
      toothGroup.add(cuspMesh);
    });

    // 3. Roots Structure
    const rootGeom = new THREE.ConeGeometry(0.32, 1.35, 24, 1);
    rootGeom.translate(0, -0.675, 0);

    const root1 = new THREE.Mesh(rootGeom, toothPhysicalMaterial);
    root1.position.set(0.28, -0.15, 0.05);
    root1.rotation.z = -0.15;
    root1.rotation.y = 0.1;

    const root2 = new THREE.Mesh(rootGeom, toothPhysicalMaterial);
    root2.position.set(-0.28, -0.15, -0.05);
    root2.rotation.z = 0.15;
    root2.rotation.y = -0.1;

    toothGroup.add(root1, root2);
    scene.add(toothGroup);

    // 4. Glowing Holographic Diagnostic HUD Tracker Ring
    const scannerRingGeom = new THREE.TorusGeometry(1.3, 0.025, 8, 64);
    const scannerRingMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(highlightColor),
      emissive: new THREE.Color(highlightColor),
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    const scannerRing = new THREE.Mesh(scannerRingGeom, scannerRingMat);
    scannerRing.rotation.x = Math.PI / 2;
    scannerRing.position.y = -1.1;
    scene.add(scannerRing);
    scannerRingRef.current = scannerRing;

    // 5. Orbiting diagnostic particles representing microscopic surface analysis
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Form a ring pattern around the tooth crown
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.45 + Math.random() * 0.25;
      const heightOffset = (Math.random() - 0.5) * 1.5;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = heightOffset;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(highlightColor),
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Initial offset rotation for artistic presentation
    toothGroup.rotation.x = 0.2;
    toothGroup.rotation.y = 0.4;

    // Clock for animation physics
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Standard orbital/hover damping physics
      if (!isDragging) {
        if (isHovered && interactive) {
          targetRotation.current.x = mousePos.current.y * 0.4;
          targetRotation.current.y = mousePos.current.x * 0.6;
        } else {
          // Continuous orbit rotation
          targetRotation.current.y += 0.005 * rotateSpeed;
          targetRotation.current.x = Math.sin(elapsed * 0.4) * 0.06;
        }

        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

        toothGroup.rotation.x = currentRotation.current.x;
        toothGroup.rotation.y = currentRotation.current.y;
      } else {
        toothGroup.rotation.x = currentRotation.current.x;
        toothGroup.rotation.y = currentRotation.current.y;
      }

      // Scanner ring animation logic (pulsate vertical height and pulse scale)
      if (isScanning && scannerRing) {
        scannerRing.position.y = -1.1 + Math.sin(elapsed * 2.5) * 0.08;
        scannerRing.rotation.z = elapsed * 0.4;
        const scalePulse = 1.0 + Math.sin(elapsed * 5.0) * 0.03;
        scannerRing.scale.set(scalePulse, scalePulse, 1);
      }

      // Microscopic particle system gentle revolution
      if (isScanning && particles) {
        particles.rotation.y = elapsed * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Interactive Drag Event handlers
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      setIsDragging(true);
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mousePos.current = { x, y };

      if (!isDragging || !interactive) return;

      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;

      currentRotation.current.y += deltaX * 0.01;
      currentRotation.current.x += deltaY * 0.01;

      currentRotation.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, currentRotation.current.x));

      previousMousePosition.current = { x: clientX, y: clientY };
      targetRotation.current = { ...currentRotation.current };
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);

      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [interactive, rotateSpeed, isDragging, isHovered]);

  return (
    <div className={minimal ? `w-full h-full relative ${className}` : `flex flex-col md:flex-row items-stretch gap-6 w-full ${className}`}>
      
      {/* 3D Canvas Box Container */}
      <div className={`flex-1 ${minimal ? 'w-full h-full' : 'min-h-[350px]'} relative rounded-3xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-2xl group`}>
        
        {/* Holographic HUD grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
        
        {/* Real-time Status Markers */}
        <div className="absolute top-4 left-4 flex flex-col space-y-1.5 pointer-events-none z-10 font-mono text-[9px] tracking-wider text-slate-400">
          <div className="flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white font-bold">CORE MODEL: ONLINE</span>
          </div>
          {!minimal && (
            <>
              <div className="flex items-center space-x-1.5 bg-slate-950/60 backdrop-blur-md border border-white/5 px-2 py-0.5 rounded-md text-[8px]">
                <span>RENDERER: WEBGL 2.0 PHYSICAL</span>
              </div>
              {diagnosticMode !== 'off' && (
                <div className="flex items-center space-x-1.5 bg-sky-950/60 backdrop-blur-md border border-sky-500/20 px-2 py-0.5 rounded-md text-[8px] text-sky-400">
                  <Cpu className="w-2.5 h-2.5" />
                  <span>SCANNER FEED: {diagnosticMode.toUpperCase()}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* 3D Model Render Frame */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Interactive prompt note */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-sky-400 font-mono tracking-wider pointer-events-none transition-all duration-300 shadow-xl border border-white/10 flex items-center space-x-1.5">
          <Maximize2 className="w-3 h-3 animate-pulse" />
          <span>DRAG MODEL TO ROTATE</span>
        </div>
      </div>

      {/* Luxury Interactive Customizer Panel */}
      {!minimal && (
        <div className="w-full md:w-80 bg-slate-950 border border-white/10 rounded-3xl p-6 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden">
          
          {/* Soft background glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-[10px] font-mono font-black text-sky-400 uppercase tracking-widest block mb-1">
                Interactive 3D Engine
              </span>
              <h3 className="font-display font-black text-xl text-white tracking-tight">
                Clinical CAD Simulator
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Explore structural density, crown cusps, and biocompatible material overlays matching real-life dental implants.
              </p>
            </div>

            {/* Material Swapper */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">
                Material Synthesis Preset
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMaterialPreset('pearl')}
                  className={`py-2 px-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all tracking-wide border cursor-pointer ${
                    materialPreset === 'pearl'
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  Pearlescent
                </button>
                <button
                  onClick={() => setMaterialPreset('rosegold')}
                  className={`py-2 px-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all tracking-wide border cursor-pointer ${
                    materialPreset === 'rosegold'
                      ? 'bg-gradient-to-r from-orange-200 to-amber-100 text-slate-950 border-orange-200 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  Rose Gold
                </button>
                <button
                  onClick={() => setMaterialPreset('glass')}
                  className={`py-2 px-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all tracking-wide border cursor-pointer ${
                    materialPreset === 'glass'
                      ? 'bg-sky-500/20 text-sky-400 border-sky-400/30 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  Glass CAD
                </button>
              </div>
            </div>

            {/* Diagnostic Overlay */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">
                Diagnostic Mode HUD
              </span>
              <div className="flex flex-col space-y-1.5 text-xs">
                
                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 cursor-pointer">
                  <span className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-slate-300">Holographic Tracker Ring</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={isScanning}
                    onChange={(e) => setIsScanning(e.target.checked)}
                    className="rounded bg-slate-950 border-white/10 text-sky-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                </label>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setDiagnosticMode('structural')}
                    className={`py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer border ${
                      diagnosticMode === 'structural'
                        ? 'bg-sky-600 text-white border-sky-500'
                        : 'bg-slate-900 text-slate-400 border-white/5'
                    }`}
                  >
                    Structural View
                  </button>
                  <button
                    onClick={() => setDiagnosticMode('off')}
                    className={`py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer border ${
                      diagnosticMode === 'off'
                        ? 'bg-slate-900 text-white border-white/20'
                        : 'bg-slate-900 text-slate-400 border-white/5'
                    }`}
                  >
                    Clean View
                  </button>
                </div>

              </div>
            </div>

            {/* Speed slider control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400 font-extrabold tracking-wider">
                <span>Rotation Velocity</span>
                <span className="text-sky-400 font-bold">{rotateSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="0.2"
                value={rotateSpeed}
                onChange={(e) => setRotateSpeed(parseFloat(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer bg-slate-900 rounded-lg appearance-none h-1.5"
              />
            </div>

          </div>

          {/* CAD Health Report Status info block */}
          <div className="mt-6 pt-4 border-t border-white/5 bg-slate-900/40 p-3.5 rounded-2xl border border-white/5 flex items-start space-x-3 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-sans">
              <strong>Implants CAD Approved:</strong> Root tension ratios, molar thickness, and crown spacing meet <strong>ADA Clinical standard</strong> threshold values.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

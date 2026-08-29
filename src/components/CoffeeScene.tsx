import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural speckled texture for ceramic cup
function createSpeckledCeramicTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#F4EBE1';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#46240E';
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 2 + 0.5;
    ctx.globalAlpha = Math.random() * 0.4 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function CoffeeCup() {
  const texture = useMemo(() => {
    try {
      return createSpeckledCeramicTexture();
    } catch (e) {
      return null;
    }
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Outer Ceramic Cup Wall */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 0.9, 1.4, 64, 1, true]} />
        <meshStandardMaterial
          map={texture || undefined}
          color="#F7EFE5"
          roughness={0.25}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup Base Floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 0.85, 0.1, 64]} />
        <meshStandardMaterial
          map={texture || undefined}
          color="#F7EFE5"
          roughness={0.3}
        />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[1.25, 0.7, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
        <torusGeometry args={[0.45, 0.1, 16, 32, Math.PI * 1.2]} />
        <meshStandardMaterial
          map={texture || undefined}
          color="#F7EFE5"
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function CoffeeLiquid({ level }: { level: number }) {
  const surfaceRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (surfaceRef.current) {
      const time = state.clock.getElapsedTime();
      surfaceRef.current.position.y = (Math.sin(time * 2) * 0.015) + (level * 1.15) + 0.1;
      surfaceRef.current.rotation.z = Math.sin(time * 1.5) * 0.01;
    }
  });

  if (level <= 0.02) return null;

  const currentRadius = 0.88 + level * 0.28;

  return (
    <group>
      <mesh position={[0, (level * 1.15) / 2 + 0.1, 0]}>
        <cylinderGeometry args={[currentRadius, 0.88, Math.max(level * 1.15, 0.01), 48]} />
        <meshStandardMaterial
          color="#3D1E0B"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={surfaceRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[currentRadius - 0.02, 48]} />
        <meshStandardMaterial
          color={level > 0.6 ? '#C67C38' : '#46240E'}
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

function PouringStream({ progress }: { progress: number }) {
  const streamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (streamRef.current) {
      const time = state.clock.getElapsedTime();
      streamRef.current.rotation.y = time * 3;
    }
  });

  if (progress < 0.2 || progress > 0.88) return null;

  return (
    <mesh ref={streamRef} position={[0, 2.2, 0]}>
      <cylinderGeometry args={[0.07, 0.09, 3.5, 16]} />
      <meshStandardMaterial
        color="#5C3114"
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

function WoodenTable() {
  return (
    <mesh position={[0, -0.45, 0]} receiveShadow>
      <cylinderGeometry args={[4, 4.2, 0.2, 64]} />
      <meshStandardMaterial
        color="#2C1305"
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function FallbackCoffeeGraphic() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-espresso text-cream text-center p-6">
      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-coffee-900 via-caramel to-amber-300 flex items-center justify-center shadow-glow mb-4">
        <span className="text-5xl sm:text-6xl">☕</span>
      </div>
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-caramel">Brew & Bean Café</h3>
      <p className="text-xs text-coffee-300 max-w-xs mt-2">Artisanal Coffee & Micro-Roasts</p>
    </div>
  );
}

interface FrameSequenceEngineProps {
  scrollProgress: number;
  frameFolderUrl?: string;
  totalFrames?: number;
}

export default function CoffeeScene({
  scrollProgress,
  frameFolderUrl,
  totalFrames = 60,
}: FrameSequenceEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [useFrameSequence, setUseFrameSequence] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Check reduced motion accessibility setting
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Frame sequence preloader
  useEffect(() => {
    if (!frameFolderUrl) return;

    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `${frameFolderUrl}/frame_${frameNum}.jpg`;
      img.onload = () => {
        if (isCancelled) return;
        loadCount++;
        if (loadCount === totalFrames) {
          imagesRef.current = loadedImages;
          setFramesLoaded(true);
          setUseFrameSequence(true);
        }
      };
      img.onerror = () => {
        // If image sequence missing, fallback smoothly to WebGL / 3D Canvas
        if (!isCancelled) setUseFrameSequence(false);
      };
      loadedImages.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, [frameFolderUrl, totalFrames]);

  // Render frame onto HTML Canvas
  useEffect(() => {
    if (!useFrameSequence || !framesLoaded || !canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetIndex = Math.min(
      Math.floor(scrollProgress * (imagesRef.current.length - 1)),
      imagesRef.current.length - 1
    );

    const img = imagesRef.current[targetIndex];
    if (!img || !img.complete) return;

    // Responsive Canvas aspect-fit rendering
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Object-fit: cover calculation
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [scrollProgress, useFrameSequence, framesLoaded]);

  const liquidLevel = useMemo(() => {
    if (scrollProgress < 0.25) return 0;
    return Math.min((scrollProgress - 0.25) / 0.5, 1);
  }, [scrollProgress]);

  // If user enabled reduced motion or frame sequence active
  if (prefersReducedMotion) {
    return <FallbackCoffeeGraphic />;
  }

  if (useFrameSequence && framesLoaded) {
    return (
      <div className="relative w-full h-full bg-espresso">
        <canvas ref={canvasRef} className="w-full h-full object-cover block" />
      </div>
    );
  }

  // WebGL 3D Canvas
  return (
    <div className="relative w-full h-full bg-espresso">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 4.5], fov: 45 }}
        fallback={<FallbackCoffeeGraphic />}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          color="#FFF5EA"
        />
        <pointLight position={[-4, 3, -2]} intensity={1.2} color="#C67C38" />
        <pointLight position={[0, 1, 2]} intensity={0.6} color="#FFE8D6" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, 0, 0]}>
            <WoodenTable />
            <CoffeeCup />
            <CoffeeLiquid level={liquidLevel} />
            <PouringStream progress={scrollProgress} />
          </group>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

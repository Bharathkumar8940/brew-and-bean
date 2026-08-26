import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface CoffeeSceneProps {
  scrollProgress: number; // 0 to 1
}

// 1. Ceramic Coffee Cup Component with Foam & Ripples
function CoffeeCup({ scrollProgress }: { scrollProgress: number }) {
  // Fill level: begins rising around 0.25 up to 0.75
  const fillFactor = Math.min(Math.max((scrollProgress - 0.25) / 0.50, 0), 1);
  const liquidY = -0.35 + fillFactor * 0.70;

  const rippleRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (rippleRef.current && fillFactor > 0 && fillFactor < 1) {
      const time = clock.getElapsedTime() * 8;
      const scale = 0.95 + Math.sin(time) * 0.05;
      rippleRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Rustic Wooden Table Top */}
      <mesh position={[0, -0.85, 0]} receiveShadow>
        <boxGeometry args={[14, 0.4, 10]} />
        <meshStandardMaterial
          color="#3A1E0E"
          roughness={0.65}
          metalness={0.1}
        />
      </mesh>
      
      {/* Table Rim Accent */}
      <mesh position={[0, -1.06, 0]}>
        <boxGeometry args={[14.2, 0.05, 10.2]} />
        <meshStandardMaterial color="#211006" roughness={0.8} />
      </mesh>

      {/* Speckled Ceramic Café Cup */}
      <group position={[0, 0, 0]}>
        {/* Outer Shell */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 0.75, 1.4, 64]} />
          <meshStandardMaterial
            color="#FAF5EE"
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>

        {/* Inner Hollow Cavity */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.96, 0.68, 1.3, 64]} />
          <meshStandardMaterial
            color="#F3ECE0"
            roughness={0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Cup Handle */}
        <mesh position={[1.15, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <torusGeometry args={[0.42, 0.12, 24, 48, Math.PI * 1.2]} />
          <meshStandardMaterial
            color="#FAF5EE"
            roughness={0.15}
            metalness={0.05}
          />
        </mesh>

        {/* Saucer Plate */}
        <mesh position={[0, -0.7, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.6, 1.1, 0.12, 64]} />
          <meshStandardMaterial
            color="#F4ECE1"
            roughness={0.18}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* Creamy Milk Coffee & Foam */}
      {fillFactor > 0 && (
        <group position={[0, liquidY, 0]}>
          {/* Main Surface */}
          <mesh ref={rippleRef} position={[0, 0, 0]} receiveShadow>
            <cylinderGeometry args={[0.70 + fillFactor * 0.22, 0.65, 0.04, 64]} />
            <meshStandardMaterial
              color="#542B12"
              roughness={0.12}
              metalness={0.15}
            />
          </mesh>

          {/* Golden Foam Layer */}
          <mesh position={[0, 0.01, 0]}>
            <ringGeometry args={[0.35, 0.72 + fillFactor * 0.20, 32]} />
            <meshBasicMaterial color="#C67C38" opacity={0.75} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 2. Coffee Stream Pouring Component
function CoffeeStream({ scrollProgress }: { scrollProgress: number }) {
  const streamRef = useRef<THREE.Mesh>(null);

  const streamFactor = useMemo(() => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress > 0.85) return Math.max(0, 1 - (scrollProgress - 0.85) / 0.1);
    return Math.min((scrollProgress - 0.25) / 0.20, 1);
  }, [scrollProgress]);

  const fillFactor = Math.min(Math.max((scrollProgress - 0.25) / 0.50, 0), 1);
  const targetY = -0.95 + fillFactor * 0.70;

  useFrame(({ clock }) => {
    if (streamRef.current) {
      const time = clock.getElapsedTime() * 4;
      streamRef.current.position.x = Math.sin(time) * 0.02;
      streamRef.current.position.z = Math.cos(time * 0.8) * 0.02;
    }
  });

  if (streamFactor <= 0.01) return null;

  const topY = 4.5;
  const height = topY - targetY;
  const posY = topY - height / 2;

  return (
    <mesh ref={streamRef} position={[0, posY, 0]}>
      <cylinderGeometry args={[0.08 * streamFactor, 0.06 * streamFactor, height, 32]} />
      <meshStandardMaterial
        color="#7C4623"
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

// 3. Splash Droplets & Surface Hit Effect
function SplashEffect({ scrollProgress }: { scrollProgress: number }) {
  const splashActive = scrollProgress >= 0.70 && scrollProgress <= 0.88;
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 45;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 0.85;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current && splashActive) {
      const time = clock.getElapsedTime() * 6;
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] = Math.abs(Math.sin(time + i)) * 0.38;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!splashActive) return null;

  const fillFactor = Math.min(Math.max((scrollProgress - 0.25) / 0.50, 0), 1);
  const liquidY = -0.95 + fillFactor * 0.70;

  return (
    <group position={[0, liquidY, 0]}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#653B1A"
          transparent
          opacity={0.85}
        />
      </points>
    </group>
  );
}

// 4. Steam Rising Particles
function SteamEffect({ scrollProgress }: { scrollProgress: number }) {
  const steamRef = useRef<THREE.Points>(null);
  const count = 30;

  const [positions, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const offs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 1] = Math.random() * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      offs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, offs];
  }, []);

  useFrame(({ clock }) => {
    if (steamRef.current && scrollProgress > 0.70) {
      const time = clock.getElapsedTime() * 0.8;
      const posArray = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += 0.008;
        posArray[i * 3] += Math.sin(time + offsets[i]) * 0.003;
        if (posArray[i * 3 + 1] > 1.8) {
          posArray[i * 3 + 1] = 0;
          posArray[i * 3] = (Math.random() - 0.5) * 0.6;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (scrollProgress <= 0.70) return null;

  return (
    <group position={[0, 0.1, 0]}>
      <points ref={steamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#FAF5EE"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// 5. Camera & Warm Café Lighting Controller
function SceneController({ scrollProgress }: { scrollProgress: number }) {
  useFrame(({ camera }) => {
    const angle = scrollProgress * Math.PI * 0.85;
    const radius = 4.8 - Math.sin(scrollProgress * Math.PI) * 0.8;
    const height = 1.8 - scrollProgress * 1.2;

    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = Math.max(-0.5, height);

    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(new Vector3(0, -0.4 + scrollProgress * 0.2, 0));
  });

  return (
    <>
      <ambientLight intensity={0.65} color="#FFE8D6" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.8}
        color="#FFAE68"
        castShadow
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#8DA9C4" />
      <pointLight position={[0, 2.5, 1]} intensity={0.8} color="#FF9F43" distance={6} />
    </>
  );
}

export default function CoffeeScene({ scrollProgress }: CoffeeSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneController scrollProgress={scrollProgress} />
        <CoffeeCup scrollProgress={scrollProgress} />
        <CoffeeStream scrollProgress={scrollProgress} />
        <SplashEffect scrollProgress={scrollProgress} />
        <SteamEffect scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

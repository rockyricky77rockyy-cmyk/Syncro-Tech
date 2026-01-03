import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  RoundedBox, 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';

function Phone({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const phoneRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (phoneRef.current) {
      // Subtle rotation based on mouse position
      phoneRef.current.rotation.y = THREE.MathUtils.lerp(
        phoneRef.current.rotation.y,
        mousePosition.x * 0.3,
        0.05
      );
      phoneRef.current.rotation.x = THREE.MathUtils.lerp(
        phoneRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={phoneRef} position={[0, 0, 0]}>
        {/* Phone body */}
        <RoundedBox args={[2.4, 5, 0.3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.16]}>
          <planeGeometry args={[2.1, 4.5]} />
          <meshStandardMaterial
            color="#0a0a15"
            metalness={0.5}
            roughness={0.2}
            emissive="#00d4ff"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Neon edge glow - top */}
        <mesh position={[0, 2.45, 0]}>
          <boxGeometry args={[2.5, 0.05, 0.35]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>

        {/* Neon edge glow - bottom */}
        <mesh position={[0, -2.45, 0]}>
          <boxGeometry args={[2.5, 0.05, 0.35]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>

        {/* Neon edge glow - left */}
        <mesh position={[-1.22, 0, 0]}>
          <boxGeometry args={[0.05, 5, 0.35]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>

        {/* Neon edge glow - right */}
        <mesh position={[1.22, 0, 0]}>
          <boxGeometry args={[0.05, 5, 0.35]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>

        {/* Camera notch */}
        <mesh position={[0, 2.1, 0.16]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color="#0a0a15" />
        </mesh>

        {/* Screen content glow */}
        <pointLight position={[0, 0, 1]} intensity={0.5} color="#00d4ff" distance={3} />
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface PhoneModelProps {
  className?: string;
}

export const PhoneModel: React.FC<PhoneModelProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className={className} 
      onMouseMove={handleMouseMove}
      style={{ touchAction: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#00d4ff"
          />
          
          <Phone mousePosition={mousePosition} />
          <Particles />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Stars - small twinkling white/yellow points
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const starsCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Vary star colors between white, yellow, and light blue
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // White
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.7; // Yellow
      } else {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1; // Light blue
      }
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

// Galaxy clusters - colorful spiral formations
function Galaxy({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 500;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 8;
      const radius = (i / particlesCount) * 2 * size;
      const wobble = Math.random() * 0.3;
      
      positions[i * 3] = Math.cos(angle) * radius + wobble;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3 * size;
      positions[i * 3 + 2] = Math.sin(angle) * radius + wobble;
    }
    return positions;
  }, [size]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = Math.PI * 0.3;
    }
  });

  return (
    <group position={position}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
}

// Satellite - orbiting object with trail
function Satellite({ orbitRadius, speed, color }: { orbitRadius: number; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const trailLength = 50;
  
  const trailPositions = useMemo(() => new Float32Array(trailLength * 3), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed;
    const x = Math.cos(time) * orbitRadius;
    const y = Math.sin(time * 0.5) * 2;
    const z = Math.sin(time) * orbitRadius;
    
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.x = time;
      meshRef.current.rotation.y = time * 0.5;
    }
    
    // Update trail
    if (trailRef.current) {
      const positions = trailRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = trailLength - 1; i > 0; i--) {
        positions[i * 3] = positions[(i - 1) * 3];
        positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
        positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
      }
      positions[0] = x;
      positions[1] = y;
      positions[2] = z;
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.08, 0.08, 0.15]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Points ref={trailRef} positions={trailPositions} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </>
  );
}

// Nebula clouds
function Nebula() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 1500;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        
        {/* Stars background */}
        <Stars />
        
        {/* Nebula clouds */}
        <Nebula />
        
        {/* Galaxies */}
        <Galaxy position={[-8, 5, -15]} color="#ff6b9d" size={1.5} />
        <Galaxy position={[10, -4, -20]} color="#06b6d4" size={2} />
        <Galaxy position={[0, 8, -25]} color="#a855f7" size={1.2} />
        
        {/* Satellites */}
        <Satellite orbitRadius={6} speed={0.3} color="#fbbf24" />
        <Satellite orbitRadius={8} speed={0.2} color="#60a5fa" />
        <Satellite orbitRadius={5} speed={0.4} color="#f87171" />
      </Canvas>
    </div>
  );
}

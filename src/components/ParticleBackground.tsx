import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
      
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.7;
      } else {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1;
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

// Moon
function Moon() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={ref} position={[-12, 8, -25]}>
      {/* Main moon body */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>
      {/* Moon craters (darker spots) */}
      <mesh position={[0.5, 0.5, 1.8]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#d4d4aa" />
      </mesh>
      <mesh position={[-0.8, -0.3, 1.6]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#c9c99a" />
      </mesh>
      <mesh position={[0.2, -0.7, 1.7]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#d4d4aa" />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#fffde7" transparent opacity={0.15} />
      </mesh>
    </group>
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

// Interactive Cursor Particles with physics
function CursorParticles() {
  const ref = useRef<THREE.Points>(null);
  const { viewport, camera } = useThree();
  const particlesCount = 150;
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  
  // Particle physics state
  const particleData = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5 - 2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      
      // Colorful particles - cyan, purple, pink
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.9;
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.7;
      }
    }
    
    return { positions, velocities, originalPositions, colors };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to 3D coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mousePos.current.set(
        x * viewport.width / 2,
        y * viewport.height / 2,
        0
      );
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const { velocities, originalPositions } = particleData;
    
    const mouseInfluenceRadius = 3;
    const repelStrength = 8;
    const returnStrength = 0.5;
    const damping = 0.92;
    
    for (let i = 0; i < particlesCount; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      // Calculate distance to mouse
      const dx = positions[ix] - mousePos.current.x;
      const dy = positions[iy] - mousePos.current.y;
      const dz = positions[iz] - mousePos.current.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Repel from cursor
      if (distance < mouseInfluenceRadius && distance > 0.01) {
        const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius * repelStrength;
        velocities[ix] += (dx / distance) * force * delta;
        velocities[iy] += (dy / distance) * force * delta;
        velocities[iz] += (dz / distance) * force * delta;
      }
      
      // Return to original position
      velocities[ix] += (originalPositions[ix] - positions[ix]) * returnStrength * delta;
      velocities[iy] += (originalPositions[iy] - positions[iy]) * returnStrength * delta;
      velocities[iz] += (originalPositions[iz] - positions[iz]) * returnStrength * delta;
      
      // Apply damping
      velocities[ix] *= damping;
      velocities[iy] *= damping;
      velocities[iz] *= damping;
      
      // Update positions
      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={particleData.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        count={particlesCount}
        array={particleData.colors}
        itemSize={3}
      />
    </Points>
  );
}

// Floating ambient particles
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 300;
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [positions, velocities];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    
    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      posArray[ix] += velocities[ix];
      posArray[iy] += velocities[iy];
      posArray[iz] += velocities[iz];
      
      // Wrap around bounds
      if (posArray[ix] > 10) posArray[ix] = -10;
      if (posArray[ix] < -10) posArray[ix] = 10;
      if (posArray[iy] > 7.5) posArray[iy] = -7.5;
      if (posArray[iy] < -7.5) posArray[iy] = 7.5;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
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
        
        {/* Moon */}
        <Moon />
        
        {/* Nebula clouds */}
        <Nebula />
        
        {/* Galaxies */}
        <Galaxy position={[-8, 5, -15]} color="#ff6b9d" size={1.5} />
        <Galaxy position={[10, -4, -20]} color="#06b6d4" size={2} />
        <Galaxy position={[0, 8, -25]} color="#a855f7" size={1.2} />
        
        {/* Interactive cursor particles */}
        <CursorParticles />
        
        {/* Floating ambient particles */}
        <FloatingParticles />
      </Canvas>
    </div>
  );
}

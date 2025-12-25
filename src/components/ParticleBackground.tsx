import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/hooks/useTheme';

// Stars - small twinkling points
function Stars({ isDark }: { isDark: boolean }) {
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
      if (isDark) {
        // Greyish colors for dark mode
        if (colorChoice < 0.6) {
          colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 0.65;
        } else if (colorChoice < 0.8) {
          colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.68; colors[i * 3 + 2] = 0.55;
        } else {
          colors[i * 3] = 0.55; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 0.7;
        }
      } else {
        // Darker colors for light mode
        if (colorChoice < 0.6) {
          colors[i * 3] = 0.3; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.35;
        } else if (colorChoice < 0.8) {
          colors[i * 3] = 0.35; colors[i * 3 + 1] = 0.32; colors[i * 3 + 2] = 0.28;
        } else {
          colors[i * 3] = 0.28; colors[i * 3 + 1] = 0.32; colors[i * 3 + 2] = 0.38;
        }
      }
    }
    return [positions, colors];
  }, [isDark]);

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
        opacity={isDark ? 0.9 : 1}
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

// Nebula clouds
function Nebula({ isDark }: { isDark: boolean }) {
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
        color={isDark ? "#9ca3af" : "#4b5563"}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.5 : 0.7}
      />
    </Points>
  );
}

// Web effect around cursor
function WebEffect({ isDark }: { isDark: boolean }) {
  const { viewport } = useThree();
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const linesRef = useRef<THREE.Group>(null);
  const particlesCount = 80;
  const connectionDistance = 2.5;
  const mouseInfluence = 4;
  
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < particlesCount; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 4 - 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          0
        )
      });
    }
    return arr;
  }, []);

  const pointsPositions = useMemo(() => new Float32Array(particlesCount * 3), []);
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.set(x * viewport.width / 2, y * viewport.height / 2, 0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  // Line color based on theme
  const lineColor = isDark ? new THREE.Color(0.5, 0.55, 0.6) : new THREE.Color(0.25, 0.28, 0.32);

  useFrame(() => {
    if (!linesRef.current || !pointsRef.current) return;

    // Update particle positions
    particles.forEach((p, i) => {
      p.position.add(p.velocity);
      
      // Wrap around
      if (p.position.x > 8) p.position.x = -8;
      if (p.position.x < -8) p.position.x = 8;
      if (p.position.y > 6) p.position.y = -6;
      if (p.position.y < -6) p.position.y = 6;

      pointsPositions[i * 3] = p.position.x;
      pointsPositions[i * 3 + 1] = p.position.y;
      pointsPositions[i * 3 + 2] = p.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Clear old lines
    while (linesRef.current.children.length > 0) {
      const child = linesRef.current.children[0];
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) child.material.dispose();
      }
      linesRef.current.remove(child);
    }

    // Create web connections near cursor
    const nearParticles: THREE.Vector3[] = [];
    
    particles.forEach(p => {
      const distToMouse = p.position.distanceTo(mousePos.current);
      if (distToMouse < mouseInfluence) {
        nearParticles.push(p.position.clone());
      }
    });

    // Add cursor as a connection point
    nearParticles.push(mousePos.current.clone());

    // Draw connections
    for (let i = 0; i < nearParticles.length; i++) {
      for (let j = i + 1; j < nearParticles.length; j++) {
        const dist = nearParticles[i].distanceTo(nearParticles[j]);
        if (dist < connectionDistance) {
          const opacity = 1 - dist / connectionDistance;
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nearParticles[i],
            nearParticles[j]
          ]);
          const material = new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: opacity * (isDark ? 0.7 : 0.9)
          });
          const line = new THREE.Line(geometry, material);
          linesRef.current.add(line);
        }
      }
    }
  });

  return (
    <>
      <Points ref={pointsRef} positions={pointsPositions} stride={3}>
        <PointMaterial
          transparent
          color={isDark ? "#9ca3af" : "#374151"}
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.9 : 1}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <group ref={linesRef} />
    </>
  );
}

// Scene component that receives theme
function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      
      {/* Stars background */}
      <Stars isDark={isDark} />
      
      {/* Nebula clouds */}
      <Nebula isDark={isDark} />
      
      {/* Galaxies */}
      <Galaxy position={[-8, 5, -15]} color={isDark ? "#ff6b9d" : "#be185d"} size={1.5} />
      <Galaxy position={[10, -4, -20]} color={isDark ? "#06b6d4" : "#0e7490"} size={2} />
      <Galaxy position={[0, 8, -25]} color={isDark ? "#a855f7" : "#7c3aed"} size={1.2} />
      
      {/* Web effect around cursor */}
      <WebEffect isDark={isDark} />
    </>
  );
}

export default function ParticleBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}

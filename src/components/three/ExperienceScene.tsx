import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { CinematicEffects } from "./CinematicEffects";

const themes: Record<string, { color: string; accent: string; label: string }> = {
  Restaurant: { color: "#7c3aed", accent: "#c084fc", label: "Restaurant" },
  Gym: { color: "#818cf8", accent: "#22d3ee", label: "Gym" },
  Salon: { color: "#d946ef", accent: "#f0abfc", label: "Salon" },
  "Real Estate": { color: "#06b6d4", accent: "#67e8f9", label: "Real Estate" },
};

function Particles({ color }: { color: string }) {
  const count = 80;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function PortalRing({ color, scale = 1 }: { color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <mesh ref={ref} scale={scale}>
      <torusGeometry args={[1.5, 0.03, 16, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function RotatingPanels({ theme }: { theme: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { color, accent } = themes[theme];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 1;
        const z = Math.sin(angle) * 1;
        return (
          <Float key={i} speed={2} floatIntensity={0.2}>
            <mesh position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
              <boxGeometry args={[0.7, 0.45, 0.02]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? color : accent}
                transparent
                opacity={0.8}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Scene({ activeTheme }: { activeTheme: string }) {
  const { color, accent } = themes[activeTheme];
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={1} color={color} />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color={accent} />
      <PortalRing color={color} />
      <PortalRing color={accent} scale={1.15} />
      <RotatingPanels theme={activeTheme} />
      <Particles color={color} />
      <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
}

interface ExperienceSceneProps {
  activeTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ExperienceScene({ activeTheme }: ExperienceSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene activeTheme={activeTheme} />
        <CinematicEffects />
      </Canvas>
    </div>
  );
}

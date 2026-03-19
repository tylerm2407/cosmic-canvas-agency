import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { getActiveTheme, themeBackgroundColors } from "@/components/ThemeToggle";
import { CinematicEffects } from "./CinematicEffects";

function useThemeColors() {
  const [colors, setColors] = useState(() => themeBackgroundColors[getActiveTheme()]);
  useEffect(() => {
    const handler = (e: Event) => {
      setColors(themeBackgroundColors[(e as CustomEvent).detail]);
    };
    window.addEventListener("theme-change", handler);
    return () => window.removeEventListener("theme-change", handler);
  }, []);
  return colors;
}

function DistortedSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function GlowingArcs({ themeColors }: { themeColors: [string, string, string] }) {
  const arcs = useMemo(() => {
    const points: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const colors = [themeColors[0], themeColors[1], themeColors[2], themeColors[0]];
    for (let i = 0; i < 8; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI;
      const r = 2;
      points.push({
        start: new THREE.Vector3(r * Math.sin(phi1) * Math.cos(theta1), r * Math.sin(phi1) * Math.sin(theta1), r * Math.cos(phi1)),
        end: new THREE.Vector3(r * Math.sin(phi2) * Math.cos(theta2), r * Math.sin(phi2) * Math.sin(theta2), r * Math.cos(phi2)),
        color: colors[i % colors.length],
      });
    }
    return points;
  }, [themeColors]);

  return (
    <group>
      {arcs.map((arc, i) => {
        const mid = new THREE.Vector3().addVectors(arc.start, arc.end).multiplyScalar(0.5).normalize().multiplyScalar(3.2);
        const curve = new THREE.QuadraticBezierCurve3(arc.start, mid, arc.end);
        const pts = curve.getPoints(30);
        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: arc.color, transparent: true, opacity: 0.5 }))} />
        );
      })}
    </group>
  );
}

function FloatingCard({ position, color }: { position: [number, number, number]; label: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.5, 0.04]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function AmbientOrbs({ themeColors }: { themeColors: [string, string, string] }) {
  return (
    <>
      {[
        { pos: [3, 2, -2] as [number, number, number], color: themeColors[0], scale: 0.3 },
        { pos: [-3, -1.5, -3] as [number, number, number], color: themeColors[1], scale: 0.2 },
        { pos: [2, -2, 1] as [number, number, number], color: themeColors[2], scale: 0.15 },
        { pos: [-2, 2.5, -1] as [number, number, number], color: themeColors[0], scale: 0.25 },
      ].map((orb, i) => (
        <Float key={i} speed={1.5} floatIntensity={1}>
          <mesh position={orb.pos} scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={orb.color} transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroScene() {
  const themeColors = useThemeColors();

  return (
    <div className="w-full h-full">
      <Canvas
        key={themeColors.join(",")}
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color={themeColors[0]} />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color={themeColors[1]} />

        <DistortedSphere color={themeColors[0]} />
        <GlowingArcs themeColors={themeColors} />
        <AmbientOrbs themeColors={themeColors} />

        <FloatingCard position={[2.8, 1.5, 0.5]} label="Restaurant" color={themeColors[0]} />
        <FloatingCard position={[-2.5, -1, 1]} label="Gym" color={themeColors[1]} />
        <FloatingCard position={[2, -1.8, 0.8]} label="Salon" color={themeColors[2]} />
        <FloatingCard position={[-2.8, 1.8, 0.3]} label="Real Estate" color={themeColors[0]} />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />

        <CinematicEffects />
      </Canvas>
    </div>
  );
}

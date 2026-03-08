import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeWireframe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.02, 16, 16]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function GlowingArcs() {
  const arcs = useMemo(() => {
    const points: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const colors = ["#a78bfa", "#818cf8", "#22d3ee", "#c084fc"];
    for (let i = 0; i < 8; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI;
      const r = 2;
      points.push({
        start: new THREE.Vector3(
          r * Math.sin(phi1) * Math.cos(theta1),
          r * Math.sin(phi1) * Math.sin(theta1),
          r * Math.cos(phi1)
        ),
        end: new THREE.Vector3(
          r * Math.sin(phi2) * Math.cos(theta2),
          r * Math.sin(phi2) * Math.sin(theta2),
          r * Math.cos(phi2)
        ),
        color: colors[i % colors.length],
      });
    }
    return points;
  }, []);

  return (
    <group>
      {arcs.map((arc, i) => {
        const mid = new THREE.Vector3()
          .addVectors(arc.start, arc.end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(3.2);
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

function FloatingCard({ position, label, color }: { position: [number, number, number]; label: string; color: string }) {
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

function AmbientOrbs() {
  return (
    <>
      {[
        { pos: [3, 2, -2] as [number, number, number], color: "#7c3aed", scale: 0.3 },
        { pos: [-3, -1.5, -3] as [number, number, number], color: "#818cf8", scale: 0.2 },
        { pos: [2, -2, 1] as [number, number, number], color: "#22d3ee", scale: 0.15 },
        { pos: [-2, 2.5, -1] as [number, number, number], color: "#c084fc", scale: 0.25 },
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
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#818cf8" />

        <GlobeWireframe />
        <GlowingArcs />
        <AmbientOrbs />

        <FloatingCard position={[2.8, 1.5, 0.5]} label="Restaurant" color="#7c3aed" />
        <FloatingCard position={[-2.5, -1, 1]} label="Gym" color="#818cf8" />
        <FloatingCard position={[2, -1.8, 0.8]} label="Salon" color="#22d3ee" />
        <FloatingCard position={[-2.8, 1.8, 0.3]} label="Real Estate" color="#c084fc" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

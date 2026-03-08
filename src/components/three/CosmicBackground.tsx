import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

type StarFieldProps = {
  scrollY: number;
  mouse: { x: number; y: number };
};

function StarField({ scrollY, mouse, themeColors }: StarFieldProps & { themeColors: [string, string, string] }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorInside = new THREE.Color(themeColors[0]);
    const colorOutside = new THREE.Color(themeColors[1]);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 40 + 10;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 40;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(angle) * radius;

      const mixedColor = colorInside.clone().lerp(colorOutside, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [themeColors]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;

    const parallaxX = mouse.x * 0.15;
    const parallaxY = mouse.y * 0.1;
    pointsRef.current.rotation.x = -parallaxY;
    pointsRef.current.rotation.z = parallaxX;

    const scrollFactor = scrollY * 0.0008;
    pointsRef.current.position.z = scrollFactor * 60;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function NebulaFog({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.z = t * 0.01;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -15]}>
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.03} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CameraRig({
  mouse,
  scrollY,
}: {
  mouse: { x: number; y: number };
  scrollY: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const baseZ = 20;
    const scrollZ = scrollY * 0.0005 * 40;

    const targetX = mouse.x * 2;
    const targetY = -mouse.y * 2;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (baseZ + scrollZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function CosmicBackground() {
  const [scrollY, setScrollY] = React.useState(0);
  const mouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || window.pageYOffset);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x, y };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <StarField scrollY={scrollY} mouse={mouse.current} />
        <NebulaFog />

        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#22d3ee" />

        <CameraRig mouse={mouse.current} scrollY={scrollY} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50 pointer-events-none" />
    </div>
  );
}

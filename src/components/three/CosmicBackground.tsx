import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicEffects } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

type StarFieldProps = {
  mouse: { x: number; y: number };
};

function StarField({ mouse, themeColors }: StarFieldProps & { themeColors: [string, string, string] }) {
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
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function NebulaFog({ color, color2 }: { color: string; color2: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) mesh.current.rotation.z = t * 0.01;
    if (mesh2.current) mesh2.current.rotation.z = -t * 0.008;
  });

  return (
    <>
      <mesh ref={mesh} position={[0, 0, -15]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={mesh2} position={[5, -5, -12]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color={color2} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

function ScrollCamera({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  const scrollProgress = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollProgress.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame(() => {
    const p = scrollProgress.current.value;

    // Scroll: camera moves from [0, 0, 20] to [0, -5, 12]
    const targetX = mouse.x * 2;
    const targetY = -mouse.y * 2 + p * -5;
    const targetZ = 20 - p * 8;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function CosmicBackground({ themeColors }: { themeColors: [string, string, string] }) {
  const mouse = React.useRef({ x: 0, y: 0 });

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
      {/* Ambient theme glow overlays */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${themeColors[0]}15 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, ${themeColors[1]}10 0%, transparent 50%)`,
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <StarField mouse={mouse.current} themeColors={themeColors} />
        <NebulaFog color={themeColors[0]} color2={themeColors[1]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={themeColors[0]} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color={themeColors[1]} />

        <ScrollCamera mouse={mouse.current} />
        <CinematicEffects />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidChromeProps {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  interactive?: boolean;
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBaseColor;
  uniform float uAmplitude;
  uniform float uSpeed;
  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;
    
    // Mouse influence
    vec2 mouseEffect = (uMouse - 0.5) * 0.3;
    
    // Layered noise for liquid chrome look
    float n1 = snoise(vec3(uv * 3.0 + mouseEffect, t * 0.5)) * uAmplitude;
    float n2 = snoise(vec3(uv * 6.0 - mouseEffect * 0.5, t * 0.3 + 100.0)) * uAmplitude * 0.5;
    float n3 = snoise(vec3(uv * 12.0, t * 0.2 + 200.0)) * uAmplitude * 0.25;
    
    float noise = n1 + n2 + n3;
    
    // Chrome-like reflections
    vec3 normal = normalize(vec3(
      snoise(vec3(uv * 5.0 + 0.01, t * 0.4)) - snoise(vec3(uv * 5.0 - 0.01, t * 0.4)),
      snoise(vec3(uv * 5.0, t * 0.4 + 0.01)) - snoise(vec3(uv * 5.0, t * 0.4 - 0.01)),
      0.3
    ));
    
    // Fresnel-like effect
    float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);
    
    // Combine for liquid chrome appearance
    vec3 color = uBaseColor;
    color += vec3(noise * 0.5 + 0.5) * 0.4;
    color += fresnel * vec3(0.6, 0.65, 0.7) * 0.8;
    color += normal * 0.1;
    
    // Add highlights
    float highlight = pow(max(0.0, dot(normal, normalize(vec3(1.0, 1.0, 1.0)))), 8.0);
    color += highlight * 0.5;
    
    // Subtle color shift
    color.r += sin(noise * 3.14) * 0.05;
    color.b += cos(noise * 3.14) * 0.05;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LiquidChrome({
  baseColor = [0.1, 0.1, 0.1],
  speed = 1,
  amplitude = 0.6,
  interactive = true,
  className = '',
}: LiquidChromeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uBaseColor: { value: new THREE.Vector3(...baseColor) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / width;
      mouseRef.current.y = 1 - (e.clientY - rect.top) / height;
    };
    container.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [baseColor, speed, amplitude, interactive]);

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}

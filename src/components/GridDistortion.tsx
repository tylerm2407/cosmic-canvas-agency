import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GridDistortionProps {
  imageSrc: string;
  grid?: number;
  mouse?: number;
  strength?: number;
  relaxation?: number;
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
  uniform sampler2D uTexture;
  uniform sampler2D uDataTexture;
  uniform vec4 uResolution;
  uniform vec3 uOverlayColor;
  varying vec2 vUv;

  void main() {
    vec2 newUV = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);
    vec4 offset = texture2D(uDataTexture, vUv);
    vec4 color = texture2D(uTexture, newUV - 0.02 * offset.rg);
    
    // Blend with theme overlay color
    vec3 blended = mix(color.rgb, uOverlayColor, 0.3);
    gl_FragColor = vec4(blended, 1.0);
  }
`;

export default function GridDistortion({
  imageSrc,
  grid = 10,
  mouse = 0.1,
  strength = 0.15,
  relaxation = 0.9,
  className = '',
}: GridDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const dataTextureRef = useRef<THREE.DataTexture | null>(null);
  const dataArrayRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Get theme color from CSS variables
    const getThemeColor = (): THREE.Vector3 => {
      const style = getComputedStyle(document.documentElement);
      const primaryHsl = style.getPropertyValue('--primary').trim();
      // Parse HSL and convert to RGB (simplified)
      const [h, s, l] = primaryHsl.split(' ').map(v => parseFloat(v));
      // Convert HSL to RGB
      const hDecimal = h / 360;
      const sDecimal = s / 100;
      const lDecimal = l / 100;
      
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;
      
      return new THREE.Vector3(
        hueToRgb(p, q, hDecimal + 1/3),
        hueToRgb(p, q, hDecimal),
        hueToRgb(p, q, hDecimal - 1/3)
      );
    };

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const frustumSize = 1;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );
    camera.position.set(0, 0, 2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Data texture for distortion
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 0;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 1;
    }
    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.magFilter = THREE.NearestFilter;
    dataTexture.minFilter = THREE.NearestFilter;
    dataTexture.needsUpdate = true;
    dataTextureRef.current = dataTexture;

    // Load image texture
    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (texture) => {
      const imageAspect = texture.image.width / texture.image.height;
      let a1, a2;
      if (height / width > 1 / imageAspect) {
        a1 = 1;
        a2 = (height / width) * imageAspect;
      } else {
        a1 = (width / height) / imageAspect;
        a2 = 1;
      }

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uDataTexture: { value: dataTexture },
          uResolution: { value: new THREE.Vector4(width, height, a1, a2) },
          uOverlayColor: { value: getThemeColor() },
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(aspect, 1, 1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / width;
      mouseRef.current.y = 1 - (e.clientY - rect.top) / height;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (dataTextureRef.current && materialRef.current) {
        const data = dataTextureRef.current.image.data as Float32Array;
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const index = (i + j * size) * 4;
            
            // Apply relaxation
            data[index] *= relaxation;
            data[index + 1] *= relaxation;
            
            // Calculate distance from mouse
            const gridX = i / size;
            const gridY = j / size;
            const dx = gridX - mouseRef.current.x;
            const dy = gridY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Apply distortion based on mouse proximity
            const maxDist = mouse;
            if (dist < maxDist) {
              const power = (maxDist - dist) / maxDist;
              const mouseDx = mouseRef.current.x - mouseRef.current.prevX;
              const mouseDy = mouseRef.current.y - mouseRef.current.prevY;
              data[index] += strength * 100 * mouseDx * power;
              data[index + 1] -= strength * 100 * mouseDy * power;
            }
          }
        }
        
        mouseRef.current.prevX = mouseRef.current.x;
        mouseRef.current.prevY = mouseRef.current.y;
        
        dataTextureRef.current.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Theme change listener
    const handleThemeChange = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uOverlayColor.value = getThemeColor();
      }
    };
    window.addEventListener('theme-change', handleThemeChange);

    // Resize handler
    const onResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      const newAspect = newWidth / newHeight;

      camera.left = -newAspect / 2;
      camera.right = newAspect / 2;
      camera.top = 0.5;
      camera.bottom = -0.5;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('theme-change', handleThemeChange);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [imageSrc, grid, mouse, strength, relaxation]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}

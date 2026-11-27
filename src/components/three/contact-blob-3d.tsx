"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { detectWebGLSupport, prefersReducedMotion } from "@/lib/webgl";

// GLSL 3D Simplex noise
const NOISE_GLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const vertexShader = `
uniform float uTime;
uniform float uDisplacement;
uniform float uFrequency;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

${NOISE_GLSL}

// Analytical displacement calculation for position and its neighbors
float getDisp(vec3 p) {
  float n1 = snoise(p * uFrequency + vec3(uTime * 0.24));
  float n2 = snoise(p * (uFrequency * 2.1) - vec3(uTime * 0.32)) * 0.45;
  return (n1 + n2) * uDisplacement;
}

void main() {
  float disp = getDisp(position);
  vec3 newPos = position + normal * disp;
  vDisplacement = disp;

  // Accurate displaced normal calculation via orthogonal tangent delta sampling
  float eps = 0.012;
  vec3 t1 = normalize(cross(normal, abs(normal.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
  vec3 t2 = normalize(cross(normal, t1));

  vec3 p1 = position + t1 * eps;
  vec3 p2 = position + t2 * eps;
  vec3 p1Displaced = p1 + normalize(p1) * getDisp(p1);
  vec3 p2Displaced = p2 + normalize(p2) * getDisp(p2);

  vec3 computedNormal = normalize(cross(p1Displaced - newPos, p2Displaced - newPos));
  vNormal = normalMatrix * computedNormal;
  vPosition = (modelViewMatrix * vec4(newPos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorShadow;
uniform vec3 uColorHighlight;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 lightDir1 = normalize(vec3(0.4, 0.8, 0.9));
  vec3 lightDir2 = normalize(vec3(-0.6, -0.4, 0.5));

  // Multi-light diffuse illumination
  float diff1 = max(dot(n, lightDir1), 0.0);
  float diff2 = max(dot(n, lightDir2), 0.0) * 0.35;
  float totalDiff = clamp(diff1 + diff2, 0.0, 1.0);

  // Fresnel rim glow for luminous contour
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.2);

  // Deep organic color gradient: shadow in valleys, vibrant lime on body, bright lemon on crests
  vec3 col = mix(uColorShadow, uColorBase, smoothstep(-0.2, 0.25, vDisplacement) * 0.6 + totalDiff * 0.4);
  col = mix(col, uColorHighlight, fresnel * 0.6 + pow(totalDiff, 2.0) * 0.3);

  // Subtle tactile grain for tactile editorial depth
  float grain = (random(gl_FragCoord.xy * 0.2 + vec2(uTime * 0.01)) - 0.5) * 0.045;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

interface BlobMeshProps {
  pointerPosition: { x: number; y: number };
  isPointerActive: boolean;
  isVisible: boolean;
}

function BlobMesh({ pointerPosition, isPointerActive, isVisible }: BlobMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisplacement: { value: 0.22 }, // Controlled soft deformation to prevent clipping
      uFrequency: { value: 0.95 },
      uColorBase: { value: new THREE.Color("#D0FF35") },
      uColorShadow: { value: new THREE.Color("#32420F") },
      uColorHighlight: { value: new THREE.Color("#F4FF80") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!isVisible) return;

    // Smooth ambient morphing
    uniforms.uTime.value += delta * 0.65;

    if (meshRef.current) {
      // Gentle continuous ambient rotation
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.z += delta * 0.03;

      // Subtle desktop pointer tilt tracking with smooth damping
      const targetRotX = isPointerActive ? -pointerPosition.y * 0.25 : 0;
      const targetRotY = isPointerActive ? pointerPosition.x * 0.25 : 0;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX,
        0.05
      );
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        isPointerActive ? pointerPosition.x * 0.25 : 0,
        0.04
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        isPointerActive ? -pointerPosition.y * 0.25 : 0,
        0.04
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.05}>
      <icosahedronGeometry args={[1.05, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export function ContactBlob3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);

  const { shouldReduceMotion } = useAnimationSettings();

  useEffect(() => {
    setHasWebGL(detectWebGLSupport() && !prefersReducedMotion() && !shouldReduceMotion);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setPointer({ x, y });
      setIsPointerActive(true);
    };

    const handleMouseLeave = () => {
      setIsPointerActive(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Lightweight CSS fallback if WebGL is unavailable or reduced motion is preferred
  if (!hasWebGL) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-gradient-to-tr from-[#32420F] via-[#D0FF35] to-[#F4FF80] opacity-80 blur-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center pointer-events-none overflow-visible"
    >
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-none"
      >
        {/* Set solid background color matching section background for flawless difference blending */}
        <color attach="background" args={["#0C0C0C"]} />
        <BlobMesh
          pointerPosition={pointer}
          isPointerActive={isPointerActive}
          isVisible={isVisible}
        />
      </Canvas>
    </div>
  );
}

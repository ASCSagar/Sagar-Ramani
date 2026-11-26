"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
  primaryColor: string;
  secondaryColor: string;
  isDark: boolean;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField({
  count,
  primaryColor,
  secondaryColor,
  isDark,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const safeCount = Math.max(count, 1);
    const positions = new Float32Array(safeCount * 3);
    const colors = new Float32Array(safeCount * 3);
    const c1 = new THREE.Color(primaryColor);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < safeCount; i += 1) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      const radius = 2.15 + r1 * 2.1;
      const theta = r2 * Math.PI * 2;
      const phi = Math.acos(2 * r3 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = c1.clone().lerp(c2, r1);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const buf = new THREE.BufferGeometry();
    buf.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buf.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buf;
  }, [count, primaryColor, secondaryColor]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uOpacity: { value: isDark ? 0.65 : 0.45 },
        uSize: { value: 26.0 },
      },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uSize;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uOpacity;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, dist) * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });
  }, [isDark]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    pointsRef.current.rotation.y -= safeDelta * 0.05;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      state.pointer.y * 0.12,
      0.03
    );
  });

  if (count <= 0) {
    return null;
  }

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

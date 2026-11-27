"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "@/components/providers/theme-provider";
import * as THREE from "three";

import { ParticleField } from "@/components/three/particle-field";
import { SceneLighting } from "@/components/three/scene-lighting";
import { Badge } from "@/components/ui/badge";
import { THREE_QUALITY_PRESETS, type MotionQualityTier } from "@/config/motion";

export interface SpherePalette {
  primaryNode: string;
  secondaryNode: string;
  connectingLines: string;
  orbitalRings: string;
  particles: string;
  glowColor: string;
  nodeEmissiveIntensity: number;
  linesOpacity: number;
  ringsOpacity: number;
  particlesOpacity: number;
  coreOpacity: number;
  outerWireframeOpacity: number;
}

const DARK_SPHERE_PALETTE: SpherePalette = {
  primaryNode: "#CCFF33",
  secondaryNode: "#849E26",
  connectingLines: "#46551C",
  orbitalRings: "#667A25",
  particles: "#A3B85C",
  glowColor: "#CCFF33",
  nodeEmissiveIntensity: 0.32,
  linesOpacity: 0.44,
  ringsOpacity: 0.42,
  particlesOpacity: 0.42,
  coreOpacity: 0.52,
  outerWireframeOpacity: 0.24,
};

const LIGHT_SPHERE_PALETTE: SpherePalette = {
  primaryNode: "#5E7814",
  secondaryNode: "#789620",
  connectingLines: "#46551C",
  orbitalRings: "#667A25",
  particles: "#6D822A",
  glowColor: "#789620",
  nodeEmissiveIntensity: 0.16,
  linesOpacity: 0.52,
  ringsOpacity: 0.48,
  particlesOpacity: 0.35,
  coreOpacity: 0.48,
  outerWireframeOpacity: 0.28,
};

interface SphereRigProps {
  palette: SpherePalette;
  isDark: boolean;
  qualityTier: Exclude<MotionQualityTier, "reduced">;
}

function SphereRig({ palette, isDark, qualityTier }: SphereRigProps) {
  const preset = THREE_QUALITY_PRESETS[qualityTier];
  const groupRef = useRef<THREE.Group>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const entranceScaleRef = useRef(0.84);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const count = preset.nodeCount;
    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 1.56;
      positions.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }
    return positions;
  }, [preset.nodeCount]);

  const {
    outerGeometry,
    coreGeometry,
    ringOneGeometry,
    ringTwoGeometry,
    nodeSphereGeometry,
    connectionsGeometry,
  } = useMemo(() => {
    const outer = new THREE.IcosahedronGeometry(1.4, preset.outerDetail);
    const core = new THREE.IcosahedronGeometry(0.78, preset.coreDetail);
    const r1 = new THREE.TorusGeometry(1.78, 0.013, 12, 72);
    const r2 = new THREE.TorusGeometry(2.04, 0.01, 12, 84);
    const nodeGeo = new THREE.SphereGeometry(0.032, 10, 10);

    let lineGeo: THREE.BufferGeometry | null = null;
    if (preset.enableConnections && nodePositions.length > 1) {
      const lineVertices: number[] = [];
      const threshold = 0.88;
      for (let i = 0; i < nodePositions.length; i += 1) {
        for (let j = i + 1; j < nodePositions.length; j += 1) {
          if (nodePositions[i].distanceTo(nodePositions[j]) <= threshold) {
            lineVertices.push(
              nodePositions[i].x,
              nodePositions[i].y,
              nodePositions[i].z,
              nodePositions[j].x,
              nodePositions[j].y,
              nodePositions[j].z
            );
          }
        }
      }
      lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVertices, 3));
    }

    return {
      outerGeometry: outer,
      coreGeometry: core,
      ringOneGeometry: r1,
      ringTwoGeometry: r2,
      nodeSphereGeometry: nodeGeo,
      connectionsGeometry: lineGeo,
    };
  }, [preset.outerDetail, preset.coreDetail, preset.enableConnections, nodePositions]);

  const {
    outerMaterial,
    coreMaterial,
    ringOneMaterial,
    ringTwoMaterial,
    nodeMaterial,
    connectionsMaterial,
  } = useMemo(() => {
    return {
      outerMaterial: new THREE.MeshBasicMaterial({
        color: palette.connectingLines,
        wireframe: true,
        transparent: true,
        opacity: palette.outerWireframeOpacity,
      }),
      coreMaterial: new THREE.MeshStandardMaterial({
        color: palette.secondaryNode,
        emissive: palette.primaryNode,
        emissiveIntensity: isDark ? 0.16 : 0.08,
        wireframe: true,
        transparent: true,
        opacity: palette.coreOpacity,
        roughness: 0.35,
        metalness: 0.3,
      }),
      ringOneMaterial: new THREE.MeshBasicMaterial({
        color: palette.orbitalRings,
        transparent: true,
        opacity: palette.ringsOpacity,
      }),
      ringTwoMaterial: new THREE.MeshBasicMaterial({
        color: palette.orbitalRings,
        transparent: true,
        opacity: palette.ringsOpacity * 0.75,
      }),
      nodeMaterial: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: palette.glowColor,
        emissiveIntensity: palette.nodeEmissiveIntensity,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: isDark ? 0.95 : 0.88,
      }),
      connectionsMaterial: new THREE.LineBasicMaterial({
        color: palette.connectingLines,
        transparent: true,
        opacity: palette.linesOpacity,
      }),
    };
  }, [palette, isDark]);

  useEffect(() => {
    const instancedMesh = nodesRef.current;
    if (!instancedMesh) return;

    const dummy = new THREE.Object3D();
    const primaryColorObj = new THREE.Color(palette.primaryNode);
    const secondaryColorObj = new THREE.Color(palette.secondaryNode);

    nodePositions.forEach((pos, idx) => {
      dummy.position.copy(pos);
      const isSelected = idx % 4 === 0;
      const scale = isSelected ? 1.35 : 0.9;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(idx, dummy.matrix);
      instancedMesh.setColorAt(idx, isSelected ? primaryColorObj : secondaryColorObj);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
  }, [nodePositions, palette]);

  useEffect(() => {
    return () => {
      outerGeometry.dispose();
      coreGeometry.dispose();
      ringOneGeometry.dispose();
      ringTwoGeometry.dispose();
      nodeSphereGeometry.dispose();
      connectionsGeometry?.dispose();
    };
  }, [
    outerGeometry,
    coreGeometry,
    ringOneGeometry,
    ringTwoGeometry,
    nodeSphereGeometry,
    connectionsGeometry,
  ]);

  useEffect(() => {
    return () => {
      outerMaterial.dispose();
      coreMaterial.dispose();
      ringOneMaterial.dispose();
      ringTwoMaterial.dispose();
      nodeMaterial.dispose();
      connectionsMaterial.dispose();
    };
  }, [
    outerMaterial,
    coreMaterial,
    ringOneMaterial,
    ringTwoMaterial,
    nodeMaterial,
    connectionsMaterial,
  ]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const scrollProgress =
      typeof window !== "undefined" ? Math.min(window.scrollY / 600, 1) : 0;

    if (groupRef.current) {
      entranceScaleRef.current = THREE.MathUtils.lerp(entranceScaleRef.current, 1, 0.08);
      groupRef.current.scale.setScalar(entranceScaleRef.current);

      groupRef.current.rotation.y += safeDelta * preset.rotationSpeed;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.26 + scrollProgress * 0.25,
        0.045
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -state.pointer.x * 0.18,
        0.045
      );
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.z += safeDelta * 0.15;
    }
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y -= safeDelta * 0.11;
    }

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      4.55 + scrollProgress * 0.45,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={outerGeometry} material={outerMaterial} />
      <mesh geometry={coreGeometry} material={coreMaterial} />
      <instancedMesh
        ref={nodesRef}
        args={[nodeSphereGeometry, nodeMaterial, nodePositions.length]}
      />
      {connectionsGeometry ? (
        <lineSegments geometry={connectionsGeometry} material={connectionsMaterial} />
      ) : null}
      <mesh
        ref={ringOneRef}
        geometry={ringOneGeometry}
        material={ringOneMaterial}
        rotation={[Math.PI / 3, 0.35, 0]}
      />
      <mesh
        ref={ringTwoRef}
        geometry={ringTwoGeometry}
        material={ringTwoMaterial}
        rotation={[-Math.PI / 4, -0.4, 0.5]}
      />
    </group>
  );
}

interface EngineeringSphereProps {
  onContextError?: () => void;
  qualityTier?: Exclude<MotionQualityTier, "reduced">;
  paused?: boolean;
  variant?: "default" | "background";
}

export default function EngineeringSphere({
  onContextError,
  qualityTier = "desktop",
  paused = false,
  variant = "background",
}: EngineeringSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme !== "light";
  const palette = isDark ? DARK_SPHERE_PALETTE : LIGHT_SPHERE_PALETTE;
  const preset = THREE_QUALITY_PRESETS[qualityTier];

  useEffect(() => {
    const element = containerRef.current;
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState !== "hidden");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!element || typeof IntersectionObserver === "undefined") {
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = isVisible && isDocumentVisible;

  return (
    <div
      ref={containerRef}
      data-testid="hero-sphere-canvas"
      data-cursor={variant === "background" ? undefined : "sphere"}
      data-cursor-label={variant === "background" ? undefined : "Drag 3D"}
      className={
        variant === "background"
          ? "relative h-full w-full overflow-hidden bg-transparent border-0"
          : "relative h-[340px] w-full overflow-hidden rounded-2xl border border-border/80 bg-card/50 sm:h-[400px] lg:h-[440px]"
      }
    >
      {variant !== "background" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_68%)]"
        />
      )}

      <Canvas
        dpr={preset.dpr}
        frameloop={shouldAnimate ? "always" : "demand"}
        camera={{ position: [0, 0, 4.55], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", display: "block" }}
        onCreated={({ gl }) => {
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            onContextError?.();
          };
          gl.domElement.addEventListener("webglcontextlost", handleContextLost, { once: true });
        }}
        className="h-full w-full"
      >
        <SceneLighting
          primaryColor={palette.primaryNode}
          secondaryColor={palette.secondaryNode}
          isDark={isDark}
        />
        <SphereRig
          palette={palette}
          isDark={isDark}
          qualityTier={qualityTier}
        />
        <ParticleField
          count={preset.particleCount}
          primaryColor={palette.particles}
          secondaryColor={palette.secondaryNode}
          isDark={isDark}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.6}
        />
      </Canvas>

      {variant !== "background" && (
        <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2">
          <Badge variant="outline" className="bg-background/80 font-mono text-[11px] backdrop-blur-sm">
            Interactive 3D · Drag to rotate
          </Badge>
          <Badge variant="secondary" className="bg-background/75 font-mono text-[10px] backdrop-blur-sm">
            {preset.nodeCount} nodes
          </Badge>
        </div>
      )}
    </div>
  );
}

export { EngineeringSphere as HeroScene };

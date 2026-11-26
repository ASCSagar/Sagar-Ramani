# Three.js & WebGL Specification — Portfolio V2

## 1. Engineering Sphere Architecture (`src/components/three/`)
- **Dynamic Loading:** `HeroSphereWrapper` dynamically imports `EngineeringSphere` (`HeroScene`) using `next/dynamic(..., { ssr: false })` with `HeroSphereFallback` (`SceneFallback`) as the loading placeholder.
- **Single Continuous Canvas:** Only one continuous WebGL `<Canvas>` is mounted (in the Hero section). Secondary visualizations (`TechnologyOrbit`) use lightweight SVG + Motion without creating extra WebGL contexts.
- **Scene Composition (`engineering-sphere.tsx`, `particle-field.tsx`, `scene-lighting.tsx`):**
  - Outer geodesic wireframe icosahedron (`IcosahedronGeometry`) tinted with active theme primary accent (`#818CF8` dark / `#4F46E5` light).
  - Inner metallic wireframe core (`IcosahedronGeometry`) tinted with secondary accent (`#A78BFA` dark / `#7C3AED` light).
  - `InstancedMesh` Fibonacci network nodes (`24`–`54` nodes in a single draw call) + optional `LineSegments` inter-node network edges (`desktop` & `tablet` tiers).
  - Two tilted orbital torus rings (`TorusGeometry`).
  - `ParticleField`: `BufferGeometry` + custom `ShaderMaterial` circular soft-glow particles (`28`–`96` particles by device tier) with theme-aware blending.
  - `OrbitControls` configured with `enableZoom={false}`, `enablePan={false}`, `enableDamping`, `dampingFactor={0.06}`, plus pointer-reactive tilt and subtle scroll-responsive camera depth inside `useFrame` (delta capped at `0.05`, zero per-frame React state updates).

## 2. Fallbacks & Guards
- **Reduced Motion:** `prefersReducedMotion()` and OS media listener render `HeroSphereFallback` (`data-fallback-reason="reduced-motion"`), avoiding WebGL initialization.
- **Ambient Motion Paused:** User pause toggle in `SiteHeader` switches `HeroSphereWrapper` to `HeroSphereFallback` (`data-fallback-reason="paused"`).
- **WebGL Unavailable / Context Lost:** `detectWebGLSupport()` checks WebGL2/WebGL support before mounting `<Canvas>`. React `ThreeErrorBoundary` and `webglcontextlost` listener switch to `HeroSphereFallback` (`webgl-unavailable` / `error`).

## 3. GPU Optimization & Resource Cleanup
- Device pixel ratio and detail scale via `THREE_QUALITY_PRESETS` (`dpr={[1, 1.5]}` max on desktop, `[1, 1.2]` on mobile) via `useMotionCapabilities()`.
- `IntersectionObserver` + `document.visibilitychange` toggle `<Canvas frameloop={isVisible && isDocumentVisible ? "always" : "demand"} />`.
- `useEffect` cleanups explicitly call `.dispose()` on every created geometry and material across `EngineeringSphere` and `ParticleField`.

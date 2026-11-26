# Performance Engineering & Benchmarks — Portfolio V2

## 1. Overview & Methodology
Performance measurements were gathered from a production build (`next build --webpack` + `next start`) on port `3005` using Playwright Chromium with real-time `PerformanceObserver` telemetry, network request instrumentation, and WebGL rendering diagnostics.

Testing environment:
- **Node.js:** `v20.12.1`
- **Platform:** `win32`
- **Viewport:** `1440 × 900`
- **Device Profile:** Desktop Chrome (Iris Xe Graphics / Direct3D11 ANGLE)
- **Baseline File:** `docs/performance-baseline.json`
- **Optimized File:** `docs/performance-optimized.json`

---

## 2. Baseline vs. Post-Optimization Benchmark Comparison

| Route | Metric | Baseline (Pre-Opt) | Optimized (Phase 5) | Improvement |
| --- | --- | --- | --- | --- |
| **`/` (Home)** | FCP / LCP | 880 ms | **560 ms** | **-36.4%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 766 ms | **417 ms** | **-45.6%** |
| | FPS | 61 fps | **60 fps** | Continuous 60 FPS |
| | Total Size | 814 KB | **808 KB** | -6 KB |
| **`/about`** | FCP / LCP | 204 ms | **124 ms** | **-39.2%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 48 ms | **0 ms** | **-100% (Zero Blocking)** |
| | FPS | 61 fps | **61 fps** | Fluid |
| **`/experience`** | FCP / LCP | 372 ms | **152 ms** | **-59.1%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 316 ms | **18 ms** | **-94.3%** |
| | FPS | 62 fps | **61 fps** | Fluid |
| **`/projects`** | FCP / LCP | 188 ms | **112 ms** | **-40.4%** |
| | **CLS** | **0.336** | **0.000** | **Complete Elimination (-100%)** |
| | TBT | 247 ms | **22 ms** | **-91.1%** |
| | FPS | 61 fps | **62 fps** | Fluid |
| **`/projects/truevalue-platform`** | FCP / LCP | 352 ms | **136 ms** | **-61.4%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 288 ms | **4 ms** | **-98.6%** |
| | FPS | 62 fps | **62 fps** | Fluid |
| **`/skills`** | FCP / LCP | 256 ms | **148 ms** | **-42.2%** |
| | **CLS** | **0.104** | **0.000** | **Complete Elimination (-100%)** |
| | TBT | 124 ms | **20 ms** | **-83.9%** |
| | FPS | 62 fps | **62 fps** | Fluid |
| **`/education`** | FCP / LCP | 200 ms | **152 ms** | **-24.0%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 108 ms | **57 ms** | **-47.2%** |
| | FPS | 61 fps | **61 fps** | Fluid |
| **`/resume`** | FCP / LCP | 344 ms | **200 ms** | **-41.9%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 196 ms | **79 ms** | **-59.7%** |
| | FPS | 61 fps | **61 fps** | Fluid |
| **`/contact`** | FCP / LCP | 320 ms | **184 ms** | **-42.5%** |
| | CLS | 0.000 | **0.000** | Stable |
| | TBT | 84 ms | **2 ms** | **-97.6%** |
| | FPS | 61 fps | **61 fps** | Fluid |

---

## 3. Key Optimization Strategies

### 3.1 Cumulative Layout Shift (CLS) Elimination
- **Problem Identified:** In baseline testing, `/projects` exhibited `0.336` CLS and `/skills` exhibited `0.104` CLS due to dynamically imported components (`TechnologyOrbit` and showcase filters) replacing undersized fallback containers after client hydration.
- **Solution:** Created exact height-matched skeleton fallbacks (`TechnologyOrbitLazy` with explicit `h-[480px]` container and geometry-matched circular placeholders; stabilized project showcase skeleton).
- **Result:** CLS reduced to **0.000** across every single application route.

### 3.2 Total Blocking Time (TBT) Reduction
- **Ticker Synchronization:** Coordinated Lenis smooth scrolling with GSAP's central ticker (`options={{ autoRaf: false }}` inside `AnimationProvider`). This eliminated dual animation request loops and prevented main-thread micro-stutter.
- **Offscreen WebGL Throttling:** Three.js `<Canvas>` frameloop dynamically switches to `"demand"` when offscreen via `IntersectionObserver`. CPU/GPU cycles are saved when the user scrolls past the hero.
- **Fine-Pointer Cursor Gating:** Heavy cursor event listeners and DOM updates are mounted only on desktop devices with `(pointer: fine)`. Mobile and touch devices incur zero overhead.

### 3.3 Dependency Pruning & Bundle Efficiency
- **Radix UI Pruned:** Scanned codebase and verified `@base-ui/react` powers all `shadcn/ui` components. Removed unused `radix-ui` package, pruning **69 packages** from `pnpm-lock.yaml`.
- **Conditional Analytics Loading:** Gated `@vercel/analytics` and `@vercel/speed-insights` to execute only in production Vercel environments (`process.env.VERCEL`), eliminating local 404 network errors and script evaluation overhead during local testing.

### 3.4 3D Rendering Performance & Mobile Protections
- **Resolution Capping:** Pixel ratio is strictly bounded to `dpr={[1, 1.5]}` on high-DPI retina and mobile screens to prevent GPU fill-rate exhaustion.
- **Geometry & Shaders:** Scene uses instanced node meshes (`InstancedMesh`) and single-draw line segments rather than discrete Three.js object trees, keeping draw calls under 10.
- **Gesture Protection:** `OrbitControls` `enableZoom={false}` prevents hijacking page scroll gestures on mobile touch devices.

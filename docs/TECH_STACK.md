# Technology Stack Specification — Portfolio V2

## 1. Runtime & Package Management
- **Package Manager:** `pnpm` (`12.23.0` via `packageManager` field; `pnpm-lock.yaml`). Never use `--force` or `--legacy-peer-deps`.
- **Node.js:** Verified on `v20.12.1` (Node `>=20.19.0` or `>=22.12.0` recommended for full upstream dev-tooling engine alignment).

---

## 2. Core Dependencies (Verified Installed Versions)
| Package | Installed Version | Role |
| --- | --- | --- |
| `next` | `16.4.6` | App Router framework, Turbopack, Route Handlers, Metadata API |
| `react` / `react-dom` | `19.3.0` | UI runtime |
| `typescript` | `5.9.3` | Static typing (`strict: true`) |
| `tailwindcss` | `4.3.3` | Utility-first styling & CSS theme variables (`@theme inline`) |
| `@tailwindcss/turbopack` | `4.3.3` | Turbopack CSS loader configured in `next.config.ts` |
| `@tailwindcss/postcss` | `4.3.3` | PostCSS Tailwind v4 plugin (`postcss.config.mjs`) for webpack builds |
| `shadcn` | `4.23.0` | Component CLI (`base-nova` style) |
| `@base-ui/react` | `1.9.0` | Accessible headless primitives for `src/components/ui/*` |
| `lucide-react` | `1.79.0` | UI iconography |
| `next-themes` | `0.4.6` | Dark / Light / System class-based theming |
| `gsap` | `3.15.1` | Timelines, `ScrollTrigger`, `SplitText`, `Flip` |
| `@gsap/react` | `2.1.2` | `useGSAP` lifecycle hook |
| `motion` | `14.14.0` | Component micro-interactions & `<MotionConfig reducedMotion="user">` |
| `lenis` | `1.3.28` | Smooth scrolling (`lenis/react`) synced to `gsap.ticker` |
| `three` | `0.187.0` | WebGL 3D engine |
| `@react-three/fiber` | `9.8.2` | React renderer for Three.js |
| `@react-three/drei` | `10.7.9` | `OrbitControls` and R3F helpers |
| `react-hook-form` | `7.92.0` | Form state management |
| `@hookform/resolvers` | `7.0.9` | Zod v4 resolver integration |
| `zod` | `4.6.7` | Client & server schema validation |
| `resend` | `6.39.0` | Transactional contact email delivery |
| `vitest` | `3.2.7` | Unit & component test runner (aligned for Node `20.12.1`) |
| `@testing-library/react` | `16.3.3` | React component test utilities |
| `@playwright/test` | `1.65.1` | End-to-end browser verification |
| `@vercel/analytics` | `2.0.1` | Production analytics (gated to `process.env.VERCEL`) |
| `@vercel/speed-insights` | `2.1.0` | Production Web Vitals telemetry (gated to `process.env.VERCEL`) |

---

## 3. Dependency Audit & Pruning Notes
- **Pruned Unused Radix UI:** In Phase 5, the unused `radix-ui` package was removed completely, pruning **69 unused packages** from `pnpm-lock.yaml`. All primitives in `src/components/ui/*` strictly use `@base-ui/react`.
- **Zero Production Vulnerabilities:** `pnpm audit` verifies that zero vulnerabilities exist in production runtime dependencies.
- **Test Suite Coverage:**
  - **Vitest:** 31 unit tests across 8 test suites passing (`pnpm test`).
  - **Playwright E2E:** 25 end-to-end browser tests across 4 spec files passing (`pnpm test:e2e`).

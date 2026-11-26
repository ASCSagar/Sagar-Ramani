# Portfolio V2 — Sagar Ramani

Modern Next.js App Router rebuild of Sagar Ramani's developer portfolio (`Full Stack Software Developer`, 4+ years experience). Built with React 19, TypeScript (`strict`), Tailwind CSS v4, `shadcn/ui` (`@base-ui/react`), coordinated Lenis + GSAP + Motion animations, an interactive Three.js / React Three Fiber 3D Engineering Sphere with reduced-motion and WebGL fallbacks, and production-grade SEO, security, accessibility, and performance optimizations.

> **Repository Protection:** This repository (`portfolio-v2`) is developed independently of the legacy Portfolio V1 codebase. Do not modify or overwrite V1.

---

## Project Objectives

- Present verified professional experience with calculated durations, grouped enterprise platforms (`TrueValue Platform`), standalone applications, 9-category technical capabilities, education, and a 6-track résumé centre.
- Separate animation responsibilities cleanly across Lenis, GSAP, Motion, Three.js, and CSS without duplicated animation loops or property conflicts.
- Provide a production-hardened contact endpoint (`POST /api/contact`) with Zod schema validation, honeypot spam protection, optional Cloudflare Turnstile verification, durable sliding-window rate limiting (Upstash Redis REST + memory fallback), and Resend transactional email delivery.
- Implement comprehensive technical SEO: canonical URLs, Open Graph, Twitter cards, dynamic social images, JSON-LD structured data (`Person`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`), and verified `sitemap.xml` / `robots.txt` strictly excluding draft project records.
- Enforce strict content honesty: unconfirmed project details (`draft` and `pending-details` records), résumé PDFs, phone numbers, and testimonials remain clearly gated until verified.

---

## Technology Stack

| Layer | Technology | Version (Locked) |
| --- | --- | --- |
| Framework | Next.js (App Router) | `16.4.6` |
| UI Runtime | React / React DOM | `19.3.0` |
| Language | TypeScript (`strict: true`) | `5.9.3` |
| Styling | Tailwind CSS v4 + `@tailwindcss/turbopack` | `4.3.3` |
| Component Primitives | `shadcn` + `@base-ui/react` (`base-nova`) | `4.23.0` / `1.9.0` |
| Icons & Theming | `lucide-react` / `next-themes` | `1.79.0` / `0.4.6` |
| Smooth Scroll | `lenis` (`lenis/react`) | `1.3.28` |
| Scroll & Timeline Motion | `gsap` + `@gsap/react` | `3.15.1` / `2.1.2` |
| UI Micro-Interactions | `motion` (`motion/react`) | `14.14.0` |
| Interactive 3D | `three` + `@react-three/fiber` + `@react-three/drei` | `0.187.0` / `9.8.2` / `10.7.9` |
| Forms & Validation | `react-hook-form` + `@hookform/resolvers` + `zod` | `7.92.0` / `7.0.9` / `4.6.7` |
| Email Delivery | `resend` | `6.39.0` |
| Testing | `vitest` + `@testing-library/react` + `@playwright/test` | `3.2.7` / `16.3.3` / `1.65.1` |
| Analytics & Telemetry | `@vercel/analytics` + `@vercel/speed-insights` | `2.0.1` / `2.1.0` |

---

## Key Features & Production Deliverables (Phase 5 Complete)

- **Production Integrations & Security**:
  - `POST /api/contact` route handler enforcing method checking (405), JSON content-type (415), 32KB payload size ceiling (413), rate limiting (429), honeypot bot trap (silent 200), CRLF header sanitization, HTML escaping, and plain-text fallback.
  - HTTP security headers in `next.config.ts`: Content Security Policy (CSP), HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
  - Accessible error boundaries (`error.tsx`, `global-error.tsx`).
- **Technical SEO & Dynamic Social Images**:
  - Next.js Metadata API with canonical URLs, robots directives, Open Graph, and Twitter Cards across all 9 routes and dynamic project detail pages.
  - Satori dynamic social image cards (`/opengraph-image`, `/twitter-image`, `/projects/[slug]/opengraph-image`, `/projects/[slug]/twitter-image`) and monogram icons (`/icon`, `/apple-icon`).
  - Structured data (`Person`, `WebSite`, `SoftwareApplication` / `CreativeWork`, `BreadcrumbList`).
  - Verified `sitemap.xml` (22 published URLs with exact dates) strictly excluding 11 draft records, and production `robots.txt`.
- **Zero-Layout-Shift Performance & 60 FPS**:
  - Cumulative Layout Shift (CLS) reduced to **0.000** across all routes using stabilized skeleton containers.
  - Total Blocking Time (TBT) reduced by up to 98% (0ms on `/about`, 4ms on case studies, 18ms on experience, 22ms on projects).
  - WebGL frameloop throttled to `"demand"` when offscreen; instanced meshes and particle fields keep draw calls minimal.
  - Unused `radix-ui` dependency pruned (-69 packages).
- **Automated Verification**:
  - **Vitest:** 31 unit tests passing (`pnpm test`).
  - **Playwright E2E:** 32 end-to-end tests passing (`pnpm test:e2e`), with 21 cross-browser tests verified across Chromium, Firefox, and WebKit (`pnpm run test:e2e:cross-browser`).
  - **Multi-Viewport Matrix:** 10 responsive viewports (`320px` to `2560px`) verified with zero horizontal overflow.
  - **Continuous Integration:** GitHub Actions CI workflow (`.github/workflows/ci.yml`) enforcing lint, typecheck, unit tests, build, and E2E verification.

---

## Development Commands

```bash
pnpm dev                          # Start Next.js development server (http://localhost:3000)
pnpm build                        # Next.js production build (next build --webpack)
pnpm start                        # Serve production build locally
pnpm lint                         # Run ESLint across the repository
pnpm typecheck                    # Run TypeScript compiler checks (tsc --noEmit)
pnpm test                         # Run Vitest unit & component tests (31 tests)
pnpm test:e2e                     # Run Playwright E2E suite (32 tests in Chromium)
pnpm run test:e2e:cross-browser   # Run Playwright cross-browser suite (Chromium, Firefox, WebKit)
node scripts/measure-performance.mjs  # Run automated performance benchmark runner
node scripts/capture-screenshots.mjs  # Capture multi-viewport responsive screenshots
```

---

## Current Development Status & Phase Governance

- **Current Status:** **Phase 6 (Final Testing, Production Deployment & Portfolio Launch) — Release Candidate Verified & Ready for Production Launch.**
- **Launch Approval Gate (Section 37):** Awaiting explicit user approval before public production deployment, domain DNS changes, publishing repository, or decommissioning Portfolio V1.
- **Protected Boundaries:**
  - `14` project entries are published; `11` unverified entries remain held as `draft` and excluded from public routes and `sitemap.xml`.
  - Résumé PDFs (`pdfAvailable: false`), client testimonials (`showTestimonials: false`), and live Resend sending (`RESEND_API_KEY` unconfigured) remain gated until verified production assets/credentials are supplied.

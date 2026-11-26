# AGENTS.md — Portfolio V2 Engineering Guidelines

## 1. Repository Scope & Protection
- This repository (`portfolio-v2`) is the Next.js App Router rebuild of Sagar Ramani's developer portfolio.
- Never modify, delete, or overwrite the legacy Portfolio V1 repository at `C:\Users\raman\OneDrive\Desktop\portfolio`.
- Preserve all verified Phase 2 working implementations unless fixing a confirmed defect or executing an approved phase plan.
- Stay strictly within the approved route scope (`/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/skills`, `/education`, `/resume`, `/contact`, and `not-found.tsx`). Do not add unapproved features (blog, articles, AI assistant, recruiter view, admin panel, database, authentication, user registration, CMS, or separate backend).

## 2. Stack & Package Manager
- Use `pnpm` only (`pnpm-lock.yaml`). Never use `--force` or `--legacy-peer-deps`.
- Next.js App Router + React 19 + TypeScript (`strict: true`).
- Tailwind CSS v4 (`src/app/globals.css`) + `shadcn/ui` (`@base-ui/react` primitives, `base-nova` style) + `lucide-react` + `next-themes`.
- Retain `@base-ui/react` for `shadcn/ui` primitives; do not introduce Radix UI components unless a specific requirement justifies it.
- Do not install unnecessary packages.

## 3. Component & Architecture Rules
- **Server Components by default**: Keep App Router pages, layouts, and data-reading components as Server Components unless browser APIs, React state/effects, animation hooks, or WebGL require client execution.
- **Client Components only where necessary**: Isolate `"use client"` to leaf interactive components (`ThemeToggle`, `SiteHeader`, `ContactForm`, `AnimationProvider`, `HeroSection`, `BentoOverview`, `HeroSphereWrapper`, `EngineeringSphere`).
- **Strict TypeScript**: Keep `"strict": true` in `tsconfig.json`. Never use `any`, unsafe type assertions, or `@ts-ignore` to silence compiler errors.
- **Reusable and modular architecture**: Compose shared primitives (`PageHeader`, `ui/*`, `src/lib/*`) rather than duplicating markup, validation, or metadata builders.
- **Centralized design tokens**: All color, radius, and typography tokens live in `src/app/globals.css`. Avoid hardcoded one-off hex colors in components outside WebGL scene config.
- **Centralized professional content**: All professional data lives in `src/data/*.ts`. Components must consume typed exports from `src/data/*.ts` rather than embedding duplicated profile strings.

## 4. Animation Engines & 3D Rules
Strict separation of responsibilities across engines:
- **Lenis (`lenis/react`)**: Global smooth scrolling synced to `gsap.ticker` (`options={{ autoRaf: false }}`) inside `AnimationProvider`.
- **GSAP + `@gsap/react`**: ScrollTrigger timelines, `SplitText`, `Flip` layout transitions, and hero choreography. Always use `useGSAP` with `scope` and `gsap.matchMedia()`.
- **Motion (`motion/react`)**: Component mount/hover/tap micro-interactions and layout transitions wrapped in `<MotionConfig reducedMotion="user">`.
- **Three.js + `@react-three/fiber` v9 + `@react-three/drei` v10**: Interactive 3D scenes only; dynamically imported (`ssr: false`) behind WebGL & reduced-motion detection with a static fallback (`HeroSphereFallback`).
- **CSS**: Lightweight hover/focus states. Never animate the same CSS property on the same element using two engines simultaneously, and avoid duplicated animation loops.
- **GSAP lifecycle cleanup**: Always return cleanup functions (`mm.revert()`, `gsap.ticker.remove(...)`, Lenis callback unsubscribe) when components unmount.
- **Event listener cleanup**: Remove `matchMedia`, `webglcontextlost`, `IntersectionObserver`, and window listeners on unmount.
- **Three.js resource disposal**: Explicitly call `.dispose()` on manually instantiated Three.js geometries and materials on unmount.
- **Offscreen animation optimization**: Use `IntersectionObserver` to switch offscreen `<Canvas>` `frameloop` from `"always"` to `"demand"` (or pause timelines) so offscreen scenes do not consume continuous GPU/CPU frames.
- **Mobile performance optimization**: Cap canvas pixel ratio (`dpr={[1, 1.5]}`), keep polygon counts low, avoid heavy post-processing passes, and disable zoom on `OrbitControls` so touch scrolling is never hijacked.
- **Reduced-motion support**: Honor `(prefers-reduced-motion: reduce)` across CSS, Lenis, GSAP (`gsap.matchMedia()`), Motion (`<MotionConfig reducedMotion="user">`), and Three.js (render static fallback instead of WebGL animation).
- **WebGL fallback**: Detect WebGL availability (`detectWebGLSupport()`) and wrap `<Canvas>` in an ErrorBoundary + `webglcontextlost` handler that switches to `HeroSphereFallback`.

## 5. Accessibility, Semantics & Responsive Design
- **Semantic HTML**: Use `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`, and a clean heading hierarchy (`<h1>`–`<h4>`) on every route.
- **Accessible keyboard navigation**: Include a skip-to-main-content link, keyboard-operable drawer/select controls, and logical tab order.
- **Visible focus indicators**: Preserve clear `focus-visible` outlines/rings on all links, buttons, toggles, and form controls.
- **Responsive design**: Verify layouts across mobile (`390×844`), tablet (`768×1024`), laptop (`1440×900`), and desktop (`1920×1080`) with zero horizontal overflow.

## 6. SEO, Security & Contact Handling
- **SEO metadata**: Configure `metadataBase`, canonical URLs, Open Graph, Twitter cards via `src/lib/seo.ts`, plus `src/app/robots.ts` and `src/app/sitemap.ts`.
- **Environment variable security**: Never commit `.env*` secrets or expose server-only env vars (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) in client bundles, responses, or documentation. Only `NEXT_PUBLIC_*` variables may be exposed client-side.
- **Server-side contact validation**: Re-validate all `POST /api/contact` submissions on the server using `contactSchema` (`src/lib/validations/contact.ts`) and escape HTML in outgoing email templates.
- **Spam protection and rate limiting**: Enforce honeypot checking (`website` field) and per-IP rate limiting (`checkRateLimit` in `src/lib/rate-limit.ts`) returning HTTP `429` with `Retry-After` on abuse.
- **Error handling**: Handle malformed JSON (`400`), validation failures (`400`), unconfigured email service (`503`), and provider errors (`502`) cleanly without leaking stack traces or secrets.

## 7. Content & Honesty Rules
- Never fabricate professional experience, project metrics, client outcomes, employment status, availability, notice period, or salary expectations.
- Do not display ETD as current employer (`01 September 2026 – 31 October 2026`).
- Keep personal phone numbers hidden by default; never require visitor phone numbers.
- Keep `testimonialsConfig.enabled` / `siteConfig.features.showTestimonials` set to `false` until explicit publication permission is confirmed.
- Clearly mark unconfirmed project case studies or pending résumé PDFs as pending rather than inventing details.

## 8. Testing & Phase Governance
- **Testing requirements**: Maintain unit/component tests (`pnpm test` via Vitest + React Testing Library) for data integrity, validation, rate limiting, and fallback logic, plus Playwright E2E checks (`pnpm test:e2e`) covering routing, themes, responsiveness, accessibility, reduced motion, and contact API validation.
- **Verification commands**:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm test:e2e`
- **Phase completion criteria**: A phase is complete only when all planned deliverables exist, verification commands pass (with any environment constraints accurately documented), browser verification confirms visual/responsive/theme behavior, and `PLANNING.md` reflects the verified status.
- **Approval before beginning the next phase**: Do not start the next development phase until the user explicitly reviews and approves completion of the current phase.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio V2 — Central Development Roadmap & Progress Tracker

> **Last Verified:** 2026-11-25  
> **Repository:** `portfolio-v2` (Next.js App Router rebuild of Sagar Ramani's developer portfolio; V1 legacy repo remains untouched)

---

## Approved Route Map
| Route | Purpose | Phase Target |
| --- | --- | --- |
| `/` | Home (Hero + Interactive 3D Engineering Sphere + Bento Overview + Full Portfolio Sections) | Phase 2 (Hero/Overview), Phase 3 (Complete Sections), Phase 4 (Motion/3D polish) |
| `/about` | About Me & Core Expertise | Phase 2 (Shell), Phase 3 (Complete Editorial Narrative) |
| `/experience` | Confirmed Employment History Timeline | Phase 2 (Shell), Phase 3 (Calculated Durations & Detailed Timeline) |
| `/projects` | Scalable Project & Module Catalog (TrueValue Platform grouping) | Phase 2 (Catalog), Phase 3 (Search, Facet Filters, URL State, Grid/List) |
| `/projects/[slug]` | Individual Project Case Study Template | Phase 2 (Template), Phase 3 (Full Case Study Sections & Draft 404 Guard) |
| `/skills` | Categorized Technical Skills | Phase 2 (Shell), Phase 3 (9 Categories + Proficiency Filters), Phase 4 (Motion polish) |
| `/education` | Education History | Phase 2 (Shell), Phase 3 (Timeline & Verified Credentials) |
| `/resume` | Web Résumé & PDF Download Readiness | Phase 2 (Summary), Phase 3 (6 Role-Specific Tracks + Print Layout) |
| `/contact` | Validated Contact Form (`/api/contact` + Resend) & Approved Links | Phase 2 (Foundation + API), Phase 3 (Full Contact Page), Phase 5 (Production verification) |
| `not-found.tsx` | Custom 404 Page | Phase 2 & Phase 3 (Lightweight CSS pulse & draft-slug fallback) |

**Out-of-Scope (Explicitly Excluded):** Blog, individual articles, AI assistant, recruiter view, admin panel, database, authentication, user registration, CMS, separate backend application.

---

## Approved Design Tokens & Typography
- **Dark Theme:** Background `#09090B`, Surface `#18181B`, Primary Text `#FAFAFA`, Secondary Text `#A1A1AA`, Primary Accent `#818CF8`, Secondary Accent `#A78BFA`
- **Light Theme:** Background `#FFFFFF`, Surface `#F4F4F5`, Primary Text `#18181B`, Secondary Text `#52525B`, Primary Accent `#4F46E5`, Secondary Accent `#7C3AED`
- **Typography (`next/font/google`):** `Geist` (`--font-geist-sans`), `Space Grotesk` (`--font-space-grotesk`), `Geist Mono` (`--font-geist-mono`)

---

## Phase 1: Existing Codebase Analysis and Redevelopment Planning
- **Objectives:** Audit legacy Portfolio V1 (CRA), catalog verified professional content and image assets, select compatible Next.js 16 + React 19 + Tailwind v4 stack, and establish architecture and route plans.
- **Current Status:** **Complete**
- **Pending Decisions:** None.
- **Known Blockers:** None.

---

## Phase 2: Project Foundation, Design System and Hero Prototype
- **Objectives:** Establish production-ready Next.js App Router foundation, theme system, responsive shell, animation/3D provider architecture, Hero + Engineering Sphere 3D prototype with fallbacks, approved route structure, SEO foundations, Contact API readiness, testing pipelines, and complete `docs/` specifications.
- **Current Status:** **Complete**
- **Pending Decisions:**
  - Confirmation on whether unused `radix-ui` dependency in `package.json` should be pruned in cleanup (`@base-ui/react` is active).
  - Confirmation on Node.js runtime upgrade (`>=20.19.0` or `>=22.12.0` vs current `20.12.1`).

---

## Phase 3: Core Pages and Professional Content
- **Objectives:** Complete all core pages, typed professional content models, calculated experience durations, filterable project catalog with draft/published governance, reusable case study templates, 9-category skills matrix, 6-track résumé centre, and full verification.
- **Implementation Tasks:**
  - Expanded typed data models (`src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/education.ts`) and added `src/lib/date.ts` for exact calendar duration calculations (`4 yrs 9 mos` cumulative across 3 employers; `ETD` remains `isCurrentEmployer: false`).
  - Configured 25 cataloged project records (`14` published across `TrueValue Platform` + 6 grouped modules, `FlyOverseas.ai`, `FlyOverseas Intelligent Chatbot`, `Automated Job Aggregation`, `Study Streak`, `Tube Master`, `Pabau`, `JO~FO Salami Slicing`; `11` draft records including `Real E State` and unverified Anant Soft Computing applications excluded from public routes and `sitemap.ts`).
  - Completed `/` (all 15 planned sections, with testimonials gated `false`), `/about`, `/experience`, `/projects` (search, company/category/industry/tech/featured filters, URL state, Grid/List toggle), `/projects/[slug]` (breadcrumbs, JSON-LD, parent/child module links, prev/next & related navigation, 404 for drafts), `/skills` (9 categories with hands-on / working knowledge / learning filters), `/education`, `/resume` (6 role-specific tracks, print-friendly CSS, PDF preview/download gated until verified PDFs exist), `/contact`, and `not-found.tsx`.
  - Updated unit tests (`tests/unit/*`) and Playwright E2E suite (`tests/e2e/phase3.spec.ts`) covering `320px` to `1920px` viewports, draft 404s, sitemap exclusion, and interactive filtering.
- **Deliverables:** Complete Phase 3 pages, typed data layer, unit/E2E test coverage, multi-viewport/theme screenshots, and updated documentation.
- **Dependencies:** Phase 2 foundation complete.
- **Current Status:** **Complete (Pending User Approval to Begin Phase 4)**
- **Pending Content / Assets (Intentionally Gated — Never Fabricated):**
  - Detailed case study narratives, architecture diagrams, and real product screenshots for `pending-details` ETD entries and the `11` `draft` records (`pawppy`..`smhri`, `real-e-state`).
  - Verified résumé PDF files for the 6 role-specific tracks (`pdfAvailable: false` until attached under `public/resume/`).
  - Explicit publication permission for client testimonials (`showTestimonials: false`).
  - Live Resend credentials (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) for `/api/contact` email delivery.
- **Known Blockers:**
  - `next build` (default Turbopack bundler) hits a Turbopack internal panic (`@tailwindcss/turbopack` worker process exit) on local Windows Node `v20.12.1`; `pnpm exec next build --webpack` succeeds cleanly across all 28 static/SSG routes.

---

## Phase 4: Advanced Animations and Interactive 3D Experiences
- **Objectives:** Elevate visual craft with centralized motion tokens, GSAP `SplitText` & `ScrollTrigger` storytelling, horizontal featured showcase, interactive technology marquee & orbit, custom fine-pointer cursor, magnetic buttons, upgraded Three.js engineering sphere + particle field, ambient-motion pause controls, and page entrance transitions.
- **Current Status:** **Complete**
- **Pending Decisions:** None.

---

## Phase 5: Production Integrations, SEO, Security, Accessibility and Performance Optimization
- **Objectives:** Production-harden Contact API with Zod validation, honeypot bot trap, hybrid rate limiting, Turnstile support, and Resend delivery; implement comprehensive Technical SEO, canonical URLs, robots directives, verified sitemap, dynamic Open Graph & Twitter cards, and JSON-LD schemas; harden HTTP security headers (CSP, HSTS, frame-ancestors, sniffing, permissions policy); eliminate layout shifts (CLS to 0.000); prune unused dependencies; capture multi-viewport screenshots; and verify end-to-end with automated test suites.
- **Implementation Tasks:**
  - Audited codebase, dependencies, content honesty rules, and established baseline benchmarks (`docs/performance-baseline.json`).
  - Implemented production contact form and Route Handler (`POST /api/contact`) with method checking (405), content-type verification (415), 32KB payload ceiling (413), rate limiting with Upstash Redis REST support and auto-clearing memory fallback (429), honeypot trap (silent 200), CRLF sanitization, HTML escaping, and plain-text fallback (503 when unconfigured).
  - Configured `.env.example` documenting mandatory and optional environment variables.
  - Implemented centralized metadata engine (`src/lib/seo.ts`), `<JsonLd>` component (`Person`, `WebSite`, `SoftwareApplication`, `BreadcrumbList`), verified `sitemap.xml` (22 published URLs with exact dates, strictly excluding 11 drafts), and production `robots.txt`.
  - Built dynamic social images via Satori: `/opengraph-image`, `/twitter-image`, `/projects/[slug]/opengraph-image`, `/projects/[slug]/twitter-image` (1200x630 cards), `/icon` (32x32), and `/apple-icon` (180x180).
  - Hardened security headers in `next.config.ts` (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) and added route error boundaries (`error.tsx`, `global-error.tsx`).
  - Pruned unused `radix-ui` dependency (-69 packages from lockfile) and gated `@vercel/analytics` and `@vercel/speed-insights` to production Vercel environments.
  - Eliminated Cumulative Layout Shift across all routes (0.000 CLS) using stabilized skeleton containers (`TechnologyOrbitLazy`).
  - Measured post-optimization benchmarks (`docs/performance-optimized.json`): FCP/LCP dropped to 560ms on home and 112-200ms on all other routes; TBT dropped by up to 98% (0ms on `/about`, 4ms on case study); continuous 60-62 FPS maintained.
  - Built automated multi-viewport capture runner (`scripts/capture-screenshots.mjs`) capturing 108 screenshots across 6 viewports, 9 routes, and 2 themes.
  - Built Phase 5 E2E test suite (`tests/e2e/phase5.spec.ts`) bringing total E2E suite to 25 passing tests.
- **Deliverables:** Production Contact API, SEO engine, dynamic OG/Twitter images, sitemap, robots, security headers, error boundaries, performance benchmarks, 108 screenshots, `docs/SECURITY.md`, `docs/SEO.md`, `docs/PERFORMANCE.md`, unit & E2E test suites.
- **Current Status:** **Complete (Awaiting Explicit User Approval to Begin Phase 6)**
- **Pending Production Integrations (Intentionally Gated — Never Fabricated):**
  - Live Resend API credentials (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) for real email dispatch.
  - Optional Cloudflare Turnstile keys (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) and Upstash Redis REST credentials.
  - Production custom domain DNS delegation (`sagarramani.dev`).
  - Verified résumé PDFs (`pdfAvailable: false`) and client testimonial release approvals (`showTestimonials: false`).
- **Known Blockers:** None. Ready for Phase 6 handoff and final production deployment upon user approval.

---

## Phase 6: Final Testing, Production Deployment and Portfolio Launch
- **Objectives:** Conduct end-to-end user journey verification across Chromium, Firefox, and WebKit; audit responsive layouts across 10 viewports; verify animations, WebGL, accessibility, and security; configure GitHub Actions CI workflow; produce deployment, maintenance, and environment documentation; and prepare release candidate for production deployment.
- **Implementation Tasks:**
  - Audited codebase, content honesty invariants, and package versions (Node.js 20.x LTS, pnpm v12.23.0).
  - Executed automated verification suite: frozen lockfile check, ESLint (0 errors, 0 warnings), TypeScript strict typecheck (0 errors), Vitest unit suite (8 test files, 31 tests passed), Next.js production build (`--webpack` compiled 60 static, SSG, dynamic, and metadata routes cleanly), and Playwright E2E suite (32 tests passed).
  - Built comprehensive Phase 6 E2E test suite (`tests/e2e/phase6.spec.ts`) validating complete user journeys A through F (Professional Introduction, Project Exploration, Résumé Downloads Gated, Contact Form Validation, Theme Switching & Accessibility, Error Recovery & Custom 404) and 10 responsive viewports (320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px) with 0 horizontal overflow.
  - Installed Playwright browser binaries and executed multi-engine cross-browser verification across Chromium, Firefox, and WebKit.
  - Configured GitHub Actions CI workflow (`.github/workflows/ci.yml`) with least-privilege permissions, dependency caching, linting, typechecking, unit tests, production build, and Playwright E2E artifact reporting.
  - Authored comprehensive production operations documentation: `docs/DEPLOYMENT.md`, `docs/ENVIRONMENT_VARIABLES.md`, `docs/MAINTENANCE.md`, `docs/RELEASE_CHECKLIST.md`, and `docs/FINAL_REPORT.md`.
- **Deliverables:** Complete Phase 6 test suite (`tests/e2e/phase6.spec.ts`), GitHub Actions CI pipeline (`.github/workflows/ci.yml`), verified production build, cross-browser validation report, operational documentation suite, and Launch Approval Gate report.
- **Current Status:** **Release Candidate Verified & Ready for Production Launch (Awaiting User Sign-Off at Launch Approval Gate)**
- **Pending Actions Reserved for User Sign-Off:**
  - Public production deployment to Vercel production domain.
  - Publishing the GitHub repository or changing repository visibility.
  - Domain registrar DNS delegation for `sagarramani.dev`.
  - Provisioning production Resend credentials and sending live test emails.
  - Activating paid third-party infrastructure.
  - Decommissioning or disabling the legacy Portfolio V1 website on Netlify.

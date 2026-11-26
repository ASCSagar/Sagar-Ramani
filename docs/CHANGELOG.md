# Changelog — Portfolio V2

## [Phase 6 Final Testing, Production Deployment and Portfolio Launch] — 2026-11-26
### Added
- **Phase 6 Production Verification E2E Suite (`tests/e2e/phase6.spec.ts`)**:
  - Full end-to-end user journeys A through F covering Professional Introduction, Project Exploration, Résumé Download Gating, Contact Form Validation, Theme Switching & Keyboard Accessibility, and Error Recovery.
  - Multi-viewport verification across all 10 approved viewports (`320px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, `2560px`) confirming zero horizontal overflow.
- **Cross-Browser Verification Pipeline**:
  - Installed Playwright Chromium, Firefox, and WebKit browser binaries.
  - Verified cross-browser rendering, animations, theme switching, and form interaction across all three engines (21 cross-browser tests passing).
- **GitHub Actions CI/CD Pipeline (`.github/workflows/ci.yml`)**:
  - Automated pull request and main branch workflow with least-privilege permissions (`contents: read`).
  - Steps for dependency caching, frozen lockfile install, ESLint, TypeScript check, Vitest unit suite, production build, and Playwright E2E execution with report artifact upload.
- **Production Operations Documentation Suite**:
  - `docs/DEPLOYMENT.md` — Comprehensive Vercel deployment, DNS, custom domain, and rollback guide.
  - `docs/ENVIRONMENT_VARIABLES.md` — Environment variable matrix, security scopes, and fallback behaviors.
  - `docs/MAINTENANCE.md` — Content updates, project additions, résumé PDF attachment, and dependency management.
  - `docs/RELEASE_CHECKLIST.md` — Verified production release checklist with all automated gates passed.
  - `docs/FINAL_REPORT.md` — Comprehensive Phase 6 final production completion report.
- **Launch Approval Gate (Section 37)**:
  - Documented strict approval boundaries requiring explicit user sign-off prior to domain DNS changes, public production deployment, or decommissioning legacy Portfolio V1.

### Fixed
- Updated `package.json` build script to invoke `next build --webpack` for stable cross-platform compilation on Windows Node.js `v20.12.1`.
- Configured dedicated Playwright browser targets (`pnpm test:e2e` for Chromium, `pnpm run test:e2e:cross-browser` for all engines).
- Standardized contact API E2E test headers with randomized `x-forwarded-for` IPs to prevent parallel test workers from exhausting rate limit windows.

---

## [Phase 5 Production Integrations, SEO, Security, Accessibility & Performance] — 2026-11-26
### Added
- **Production Contact API (`POST /api/contact`)**:
  - Request method and content-type enforcement (`405`, `415`).
  - Strict 32KB payload size ceiling (`413`).
  - Hybrid sliding-window rate limiting (`src/lib/rate-limit.ts`) with Upstash Redis REST support and in-memory fallback with automated expired-entry garbage collection (`429` + `Retry-After`).
  - Honeypot bot trap returning silent `200` without email delivery.
  - Optional Cloudflare Turnstile token validation (`403` on failure).
  - Header injection prevention (`sanitizeHeaderValue`) and XSS escaping (`escapeHtml`).
  - Multipart email delivery via Resend with plain-text alternative and submission timestamp (`503` graceful notice when unconfigured).
- **Accessible Contact Form UI (`src/components/contact/contact-form.tsx`)**:
  - `aria-label="Contact form"`, `aria-invalid`, and `aria-describedby` links to field alerts.
  - React 19-compliant duplicate submission prevention state (`lastSubmittedKey`).
  - Live status region (`aria-live="polite"`).
- **Comprehensive Technical SEO Architecture (`src/lib/seo.ts`)**:
  - Centralized metadata builder with canonical URLs, robots directives, Open Graph, and Twitter Cards.
  - Structured data (`Person`, `WebSite`, `SoftwareApplication` / `CreativeWork`, `BreadcrumbList`) via `<JsonLd>` component.
  - Dynamic social card generators: `/opengraph-image`, `/twitter-image`, `/projects/[slug]/opengraph-image`, `/projects/[slug]/twitter-image` (1200x630 branded cards).
  - Dynamic monogram icons: `/icon` (32x32), `/apple-icon` (180x180).
  - Verified sitemap (`/sitemap.xml`) including 8 static routes and 14 published projects with verified release date, strictly excluding 11 draft records.
  - Production robots file (`/robots.txt`) with sitemap link and `/api/` disallow rule.
- **Security Hardening**:
  - Production Content-Security-Policy (CSP), HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` in `next.config.ts`.
  - Accessible error boundaries (`src/app/error.tsx`, `src/app/global-error.tsx`).
- **Performance Optimizations**:
  - Eliminated Cumulative Layout Shift (CLS reduced from 0.336 on `/projects` and 0.104 on `/skills` to **0.000 across all routes**) using stabilized skeleton containers (`TechnologyOrbitLazy`).
  - Reduced Total Blocking Time (TBT) by up to 98% across routes (0ms on `/about`, 4ms on case studies, 18ms on experience, 22ms on projects).
  - Pruned unused `radix-ui` dependency (-69 packages).
  - Production-gated Vercel Analytics and Speed Insights to prevent local 404s.
- **Verification Suites**:
  - Automated performance baseline & optimization runner (`scripts/measure-performance.mjs`).
  - Multi-viewport screenshot capture script (`scripts/capture-screenshots.mjs`) capturing 108 screenshots across 6 viewports, 9 routes, and 2 themes.
  - Comprehensive Phase 5 E2E test suite (`tests/e2e/phase5.spec.ts`) bringing total E2E suite to 25 passing tests.

### Fixed
- Fixed sitemap URL assertions to match Next.js trailing slash format.
- Fixed contact form accessible role exposure by adding explicit `aria-label`.
- Standardized API response payloads to consistently include `success: boolean` and `ok: boolean`.

---

## [Phase 4 Advanced Animations & Interactive 3D] — 2026-11-25
### Added
- Centralized motion design system (`src/config/motion.ts`) and device/pointer capability hook (`src/hooks/use-motion-capabilities.ts`).
- Global animation & effect primitives (`src/components/animations/*`, `src/components/effects/*`): `Preloader`, `SplitTextReveal`, `ScrollReveal`, `StaggerReveal`, `MaskReveal`, `ParallaxImage`, `AnimatedCounter`, `MagneticButton`, `CustomCursor`, `ScrollProgress`, `PageTransition`, `SpotlightCard`, `TiltCard`, `GradientBorder`, `AmbientBackground`, `TechnologyMarquee`, and lazy-loaded `TechnologyOrbit`.
- Persistent user-accessible `Pause/Resume Decorative Motion` control in `SiteHeader` and `BackToTopButton` in `SiteFooter`.
- Desktop pinned `HorizontalProjectShowcase` showcasing 6 verified published entries and `AnimatedExperienceTimeline`.
- Upgraded `EngineeringSphere` with `InstancedMesh` Fibonacci nodes, inter-node `LineSegments`, custom shader `ParticleField`, `SceneLighting`, scroll-responsive camera depth, `visibilitychange` pausing, and `"paused"` fallback state.
- `postcss.config.mjs` and `@tailwindcss/postcss@4.3.3` devDependency so `next build --webpack` compiles Tailwind CSS v4 cleanly.
- Phase 4 unit tests (`tests/unit/phase4-animations.test.tsx`) and E2E suite (`tests/e2e/phase4.spec.ts`).

### Fixed
- Fixed `PageTransition` using opacity-only transitions so GSAP `ScrollTrigger` `pin: true` anchors reliably to the viewport.
- Fixed `AnimatedCounter` `immediateRender: false` and synchronous reduced-motion guard.

---

## [Phase 3 Core Pages & Professional Content] — 2026-11-25
### Added
- Calendar-accurate duration utility (`src/lib/date.ts`) computing role, employer, and cumulative career durations (`4 yrs 9 mos`).
- Expanded typed professional data models (`src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/education.ts`).
- Shared components: `Breadcrumbs`, `SectionHeading`, `ConceptualPreview`, `SkillsMatrix`, `ProjectsCatalog`, `ResumeCenter`, and `HomeSections`.
- JSON-LD structured data helpers and `@media print` styles.
- Phase 3 unit and E2E tests (`tests/e2e/phase3.spec.ts`).

---

## [Phase 2 Foundation] — 2026-11-25
### Added
- Root layout, design tokens, `ThemeProvider`, `AnimationProvider`, `SiteHeader`, `SiteFooter`, and skip-to-content link.
- GSAP-animated `HeroSection`, `BentoOverview`, and lazy-loaded Three.js `EngineeringSphere`.
- Foundation routes, contact API, `robots.ts`, `sitemap.ts`, Vitest, and Playwright suites.

---

## [Phase 1 Planning] — Initialized
- Bootstrapped `portfolio-v2` with Next.js `16.4.6`, React `19.3.0`, TypeScript `5.9.3`, Tailwind CSS v4, `shadcn/ui` (`@base-ui/react`), design tokens, and typed `src/data/*.ts`.

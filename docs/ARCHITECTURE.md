# System Architecture — Portfolio V2

## 1. Rendering Strategy (Server-First App Router)
- **Server Components by Default:** Root layout (`src/app/layout.tsx`) and route pages (`/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/skills`, `/education`, `/resume`, `/contact`, `not-found.tsx`, `error.tsx`, `global-error.tsx`) execute on the server, reading typed data directly from `src/data/*.ts`.
- **Isolated Client Boundaries:** `"use client"` is strictly restricted to interactive leaves and providers (`ThemeProvider`, `AnimationProvider`, `SiteHeader`, `BackToTopButton`, `HeroSection`, `BentoOverview`, `HorizontalProjectShowcase`, `AnimatedExperienceTimeline`, `HeroSphereWrapper`, `EngineeringSphere`, `HeroSphereFallback`, `ProjectsCatalog`, `SkillsMatrix`, `TechnologyOrbit`, `TechnologyMarquee`, `ResumeCenter`, `ContactForm`, and `src/components/animations/*`).

---

## 2. Directory Topology
- `src/app/` — App Router pages, `globals.css`, `robots.ts`, `sitemap.ts`, `api/contact/route.ts`, `error.tsx`, `global-error.tsx`, `opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`, and `projects/[slug]/*-image.tsx`
- `src/config/` — Centralized `motion.ts` animation & 3D quality configuration
- `src/hooks/` — `use-motion-capabilities.ts` (fine-pointer, viewport tier, hardware concurrency, document visibility)
- `src/components/providers/` — `ThemeProvider`, `AnimationProvider` (Lenis + GSAP ticker sync + MotionConfig + ambient motion store)
- `src/components/animations/` — `Preloader`, `SplitTextReveal`, `ScrollReveal`, `StaggerReveal`, `MaskReveal`, `ParallaxImage`, `AnimatedCounter`, `MagneticButton`, `CustomCursor`, `ScrollProgress`, `PageTransition`
- `src/components/effects/` — `SpotlightCard`, `TiltCard`, `GradientBorder`, `AmbientBackground`, `TechnologyMarquee`, `TechnologyOrbit`, `TechnologyOrbitLazy`
- `src/components/layout/` — `SiteHeader`, `ThemeToggle`, `SiteFooter`, `BackToTopButton`
- `src/components/home/` — `HeroSection`, `BentoOverview`, `HomeSections`
- `src/components/sections/` — `HorizontalProjectShowcase`
- `src/components/experience/` — `AnimatedExperienceTimeline`
- `src/components/three/` — `HeroSphereWrapper`, `EngineeringSphere` (`HeroScene`), `ParticleField`, `SceneLighting`, `HeroSphereFallback` (`SceneFallback`)
- `src/components/projects/`, `src/components/skills/`, `src/components/resume/`, `src/components/contact/` — Feature client components
- `src/components/shared/` — `PageHeader`, `SectionHeading`, `Breadcrumbs`, `ConceptualPreview`, `json-ld`, `social-icons`
- `src/components/ui/` — Base UI `shadcn/ui` primitives
- `src/data/` — Centralized typed content modules (`personal.ts`, `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `education.ts`, `resume.ts`, `site-config.ts`)
- `src/lib/` — `date.ts`, `gsap.ts`, `rate-limit.ts`, `seo.ts`, `utils.ts`, `webgl.ts`, `validations/contact.ts`

---

## 3. Styling & Build Pipeline
- Tailwind CSS v4 configured via `@tailwindcss/turbopack` (for development) and `postcss.config.mjs` + `@tailwindcss/postcss` (for `next build --webpack`).
- Design tokens in `src/app/globals.css` with `@theme inline` variables.

---

## 4. Contact API Flow (`POST /api/contact`)
1. **Method & Header Check:** Accepts only `POST` (405 for others) and `application/json` (415 for others).
2. **Payload Size Guard:** Rejects requests > 32 KB with HTTP 413.
3. **Rate Limiting:** Enforces hybrid sliding-window check (`checkRateLimitAsync()`):
   - Queries Upstash Redis REST when credentials are present.
   - Falls back to in-memory sliding window with automatic garbage collection of expired entries.
   - Exceeding 5 requests per 10 minutes returns HTTP 429 with `Retry-After`.
4. **Honeypot Evaluation:** If hidden `website` field is non-empty, silently returns HTTP 200 without email dispatch.
5. **Schema Validation:** Strict parsing via `contactSchema` (`src/lib/validations/contact.ts`). Failures return HTTP 400 with `fieldErrors`.
6. **Optional Turnstile:** If `TURNSTILE_SECRET_KEY` is present, validates `turnstileToken` with Cloudflare siteverify endpoint (HTTP 403 on failure).
7. **Header Sanitization:** Strips CRLF characters from single-line fields to prevent header injection.
8. **Credential Verification:** Checks `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` (HTTP 503 if missing).
9. **Dispatch:** HTML-escapes content, constructs plain-text and HTML emails, and sends via Resend (200 on success, 502/500 on failure).

---

## 5. Security Headers (`next.config.ts`)
Applied to all non-internal routes (`/(.*)`):
- `Content-Security-Policy`: Restricts scripts, frames, styles, objects, and fonts.
- `X-Frame-Options: DENY`: Prevents clickjacking.
- `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin`: Minimizes referrer leakage.
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`: Disables high-risk browser capabilities.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`: Enforces HTTPS.

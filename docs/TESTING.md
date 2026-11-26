# Testing & Verification Guide — Portfolio V2

## 1. Automated Verification Commands
| Command | Tool | Scope |
| --- | --- | --- |
| `pnpm lint` | ESLint (`eslint-config-next`) | Core Web Vitals, React hooks, TypeScript rules |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) | Strict type safety across `src/` and `tests/` |
| `pnpm test` | Vitest (`vitest.config.mts`) + RTL + jsdom | Unit & component verification (`tests/unit/*.test.{ts,tsx}`) |
| `pnpm build` | Next.js (`--webpack`) | Production bundle compilation (60 static, SSG, dynamic & metadata routes) |
| `pnpm test:e2e` | Playwright (`playwright.config.ts`) | End-to-end verification (32 tests in Chromium) |
| `pnpm run test:e2e:cross-browser` | Playwright | Full cross-browser verification across Chromium, Firefox, and WebKit |

## 2. Unit Test Coverage (`tests/unit/`)
- `contact-validation.test.ts` — Valid submissions, short names, invalid emails, honeypot rejection, short messages
- `rate-limit.test.ts` — Sliding-window enforcement and expiry reset
- `date-duration.test.ts` — Exact inclusive calendar duration math across all roles/employers and `4 yrs 9 mos` cumulative career total
- `data-models.test.ts` — Honesty invariants (`isCurrentEmployer === false`, gated phone/testimonials/6 résumé PDFs), 25-record project split (`14` published / `11` draft), `TrueValue Platform` module grouping, `sitemap()` draft exclusion, and 9-category skills integrity
- `webgl-fallback.test.tsx` — Accessible static fallback rendering and safe `webgl.ts` detection in jsdom
- `phase4-animations.test.tsx` — Centralized motion tokens & 3D quality presets, `AnimationProvider` ambient motion pause persistence, `HeroSphereFallback` `"paused"` state, `TechnologyMarquee` pause/resume + hidden duplicates, `TechnologyOrbit` interactive domain switching & pause control, and `AnimatedCounter` reduced-motion accuracy
- `seo-metadata.test.ts` — Canonical URLs, robots directives, Person/WebSite/SoftwareApplication JSON-LD, and dynamic OG/Twitter image builders

## 3. E2E Test Coverage (`tests/e2e/`)
- `foundation.spec.ts` — All 10 approved routes return HTTP `200`, render `<h1>`, have zero console/page errors; theme toggle (`dark`, `light`, `system`); mobile drawer navigation (`390×844`); `prefers-reduced-motion` static sphere fallback; contact validation & `POST /api/contact` `400`; custom `404` page
- `phase3.spec.ts` — `/projects` search, filters, view toggle, empty state & clear filters; `/projects/[slug]` breadcrumbs and HTTP `404` for draft slugs (`real-e-state`, `pawppy`); `/skills` proficiency filter & search; `/experience` calculated durations & past-employer badges; `/resume` 6 role tracks with PDF downloads disabled; `/sitemap.xml` draft exclusion; zero horizontal overflow across `320px`, `390px`, `768px`, `1024px`, `1440px`, and `1920px`
- `phase4.spec.ts` — Desktop horizontal project showcase (6 verified published projects, draft exclusion, pinned scroll visibility); persistent ambient motion pause toggle (`data-fallback-reason="paused"`); `TechnologyMarquee` and `TechnologyOrbit` interactive controls; reduced-motion preloader skip & repeated route navigation leak/error checks
- `phase5.spec.ts` — Security headers (CSP, HSTS, frame-ancestors, sniffing, permissions policy), `robots.txt` and `sitemap.xml` directives, dynamic Open Graph/Twitter image responses (200 PNG), JSON-LD structured data validation, and contact API validation
- `phase6.spec.ts` — Production release user journeys A through F:
  - **Journey A (Professional Introduction):** Homepage personal branding -> `/about` narrative -> `/experience` confirmed timeline with past employer badges and calculated durations.
  - **Journey B (Project Exploration):** `/projects` catalogue -> search "Study Streak" -> open case study -> breadcrumb navigation -> return to catalogue.
  - **Journey C (Résumé Verification):** `/resume` -> 6 role tracks verified -> gated disabled download buttons (preventing broken 404 links) -> functional Print Web Résumé button.
  - **Journey D (Contact Form):** `/contact` -> invalid submission aria-invalid indicators -> valid input filling -> submission state handling.
  - **Journey E (Theme & Accessibility):** Dark/Light/System theme toggling -> Tab keyboard focus sequence -> skip-to-content link -> reduced motion behavior.
  - **Journey F (Error Recovery):** Invalid route 404 -> draft project slugs 404 (`real-e-state`, `pawppy`) -> Return to Home recovery navigation.
  - **Multi-Viewport Matrix:** 10 responsive viewports (`320px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`, `2560px`) verified with zero horizontal overflow across all core routes.

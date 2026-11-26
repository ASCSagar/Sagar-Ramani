# Production Release Checklist — Portfolio V2

> **Release Version:** `0.1.0-release-candidate`  
> **Evaluation Date:** 2026-11-26  
> **Release Candidate Status:** **VERIFIED & READY FOR LAUNCH**  

---

## 1. Automated Verification Gates

| Gate | Requirement | Tool / Command | Result | Status |
| --- | --- | --- | --- | --- |
| **Dependency Lockfile** | Frozen supply chain verification | `pnpm install --frozen-lockfile` | Verified in 381ms, lockfile clean | **PASS** |
| **Code Linting** | Next.js Core Web Vitals & TypeScript rules | `pnpm lint` | 0 errors, 0 warnings | **PASS** |
| **Type Safety** | TypeScript `strict: true` across all files | `pnpm typecheck` | 0 type errors | **PASS** |
| **Unit Test Suite** | 8 test suites covering data models, durations, contact API, rate limit, SEO, animations, WebGL | `pnpm test` | 8 files passed, 31 tests passed | **PASS** |
| **Production Build** | Static generation across all approved routes | `pnpm build` (`next build --webpack`) | 60 static, SSG, dynamic & metadata routes compiled cleanly | **PASS** |
| **E2E Test Suite** | Full user journeys (A–F) and multi-viewport checks | `pnpm test:e2e` | 32 tests passed (19.2s) | **PASS** |
| **Cross-Browser Verification** | Chromium, Firefox, WebKit rendering engines | `pnpm test:e2e:cross-browser` | 21 cross-browser journey tests passed | **PASS** |
| **Responsive Viewports** | 10 viewports (320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px, 2560px) | Playwright viewport runner | 0 horizontal overflow across all routes | **PASS** |

---

## 2. Professional Content & Honesty Invariants

- [x] **Name:** Sagar Ramani.
- [x] **Designation:** Full Stack Software Developer.
- [x] **Experience Total:** 4+ years (exact duration: 4 yrs 9 mos across 3 employers).
- [x] **Location:** Vadodara, Gujarat, India.
- [x] **ETD Status:** `isCurrentEmployer: false` confirmed. Marked with "Past Employer" badge.
- [x] **ETD Grade 2 Tenure:** 01 September 2026 – 31 October 2026 (2 mos).
- [x] **ETD Grade 1 Tenure:** 01 August 2025 – 31 August 2026 (1 yr 1 mo).
- [x] **Anant Soft Computing Tenure:** 18 September 2023 – 28 July 2025 (1 yr 10 mos).
- [x] **La Net Team Tenure:** Software Developer 10 July 2022 – 15 September 2023 (1 yr 2 mos); Trainee 03 January 2022 – 09 July 2022 (6 mos).
- [x] **No Fabricated Data:** Availability, expected salary, notice period, and phone numbers are excluded.
- [x] **Client Testimonials:** Gated (`showTestimonials: false`) pending explicit permission.

---

## 3. Project Catalog & Case Study Governance

- [x] **Total Catalog Records:** 25 project records configured.
- [x] **Published Projects (14):**
  - TrueValue Platform (unified parent platform)
  - 6 Grouped Platform Modules (CRM, Appointments, Marketing, WhatsApp Automation, PBX, SiteFlow)
  - FlyOverseas.ai
  - FlyOverseas Intelligent Chatbot
  - Automated Job Aggregation
  - Study Streak
  - Tube Master
  - Pabau
  - JO~FO Salami Slicing
- [x] **Draft Projects (11):** Pawppy, MakeMyForte, BAA, Gazra, UnplugWell, BreatheOffline, TheVeganVibrance, TechsNostalgia, Fly Your Dreams, SMHRI, Real E State.
- [x] **Draft Route Guarding:** Attempting to navigate to draft slugs returns custom HTTP 404.
- [x] **Sitemap Exclusion:** Draft projects strictly excluded from `sitemap.xml`.

---

## 4. Résumé Production Governance

- [x] **Role Tracks (6):** Full Stack Developer, MERN Stack Developer, Frontend Developer, Backend Developer, AI Developer, Software Developer.
- [x] **Gated PDF Downloads:** Buttons disabled (`disabled`) with clear informative badge ("Web Summary Active" / "PDFs pending verification").
- [x] **No Broken 404 Links:** Gated buttons prevent visitors from encountering 404 file errors.
- [x] **Print-Friendly Web Résumé:** Functional "Print Web Résumé" action available.

---

## 5. Security & Privacy Audit

- [x] **Content-Security-Policy:** Hardened with restrictive directives (`frame-ancestors 'none'`, `object-src 'none'`).
- [x] **Strict-Transport-Security (HSTS):** `max-age=63072000; includeSubDomains; preload` configured in production.
- [x] **X-Frame-Options:** `DENY` set.
- [x] **X-Content-Type-Options:** `nosniff` set.
- [x] **Referrer-Policy:** `strict-origin-when-cross-origin` set.
- [x] **Permissions-Policy:** Restricts camera, microphone, geolocation, and browsing-topics.
- [x] **Contact Form Validation:** Zod schema validation client-side and server-side.
- [x] **Honeypot Trap:** Hidden `website` field silently catches automated bots without alerting them.
- [x] **Payload Limit:** Enforces strict 32KB ceiling on incoming POST requests (413).
- [x] **Rate Limiting:** Sliding window enforcement with Redis REST and auto-clearing memory fallback.
- [x] **Zero Secret Leaks:** No server secrets (`RESEND_API_KEY`, etc.) exposed to client bundle or Git.

---

## 6. Technical SEO & Social Metadata

- [x] **Canonical URLs:** Configured dynamically on every page via `src/lib/seo.ts`.
- [x] **Open Graph & Twitter Cards:** 1200x630 dynamic branded image cards generated via Satori.
- [x] **JSON-LD Structured Data:** `Person`, `WebSite`, `SoftwareApplication`, and `BreadcrumbList` schemas present and valid.
- [x] **`robots.txt`:** Fully accessible, disallowing `/api/` and referencing `sitemap.xml`.
- [x] **`sitemap.xml`:** Verified across 22 public URLs, strictly excluding 11 draft records.
- [x] **Favicon & Apple Touch Icon:** Native dynamic route generation (`/icon`, `/apple-icon`).

---

## 7. Performance & Accessibility (WCAG 2.2 AA)

- [x] **Cumulative Layout Shift (CLS):** 0.000 across all 9 public routes.
- [x] **Largest Contentful Paint (LCP):** 560ms on Home, 112–200ms on internal routes.
- [x] **Frame Rate:** 60–62 FPS continuous across animated routes.
- [x] **Keyboard Navigation:** Skip-to-main-content link, logical tab sequence, visible focus rings.
- [x] **Accessible Forms:** Explicit labels, `aria-invalid`, `aria-describedby` error announcements.
- [x] **Reduced Motion:** Fully honored across GSAP (`matchMedia`), Motion (`MotionConfig`), and Three.js (`HeroSphereFallback` with `data-fallback-reason="reduced-motion"`).

---

## 8. Launch Approval Gate

The following actions require explicit user authorization prior to execution:
- [ ] Public production deployment to Vercel production domain.
- [ ] Publishing the GitHub repository or making it public.
- [ ] Changing registrar DNS records for `sagarramani.dev`.
- [ ] Activating paid external services.
- [ ] Sending live test emails via Resend to recipient mailboxes.
- [ ] Decommissioning or disabling the legacy Portfolio V1 Netlify deployment.

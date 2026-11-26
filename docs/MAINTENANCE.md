# Maintenance & Content Management Guide — Portfolio V2

This guide outlines standard operational procedures for maintaining Portfolio V2, updating professional content, managing project records, attaching résumé files, and upgrading dependencies.

---

## 1. Content Management Workflows

All professional data in Portfolio V2 is strictly typed and centralized in `src/data/*.ts`.

### 1.1 Adding a New Project
1. Open `src/data/projects.ts`.
2. Add a new `ProjectEntry` object to `projectsData`:
   - Set `slug`: URL-safe unique identifier (e.g., `ai-doc-analyzer`).
   - Set `title`, `employer`, `category`, `kind`, `technologies`, `shortDescription`.
   - Set `publicationStatus`:
     - `"published"`: Renders in `/projects`, individual case study `/projects/[slug]`, and `sitemap.xml`.
     - `"draft"`: Completely excluded from catalog, sitemap, and returns HTTP 404 on `/projects/[slug]`.
   - Set `caseStudyStatus`:
     - `"overview"`: Full case study sections rendered.
     - `"pending-details"`: Displays overview with "Details Pending" badge until technical metrics are confirmed.
3. If the project has module relationships (like TrueValue Platform):
   - For child modules: set `parentPlatformSlug: "truevalue-platform"`.
   - For parent platform: add module slug to `moduleSlugs: [...]`.
4. Run verification:
   ```bash
   pnpm test
   pnpm build
   ```

### 1.2 Updating Professional Experience
1. Open `src/data/experience.ts`.
2. Update role entries or add new employers to `experienceData`.
3. Date format: `YYYY-MM-DD` (e.g. `2025-08-01`).
4. **Honesty Invariant:** Ensure `isCurrentEmployer` is accurately set (`false` for ETD). Durations are automatically calculated via `calculateDateRangeDuration()` and cumulative career total via `calculateTotalExperience()`.
5. Run unit tests to verify duration mathematics:
   ```bash
   pnpm test tests/unit/date-duration.test.ts
   ```

### 1.3 Attaching Verified Résumé PDFs
1. Place the verified PDF file in `public/resume/` using standard professional naming (e.g., `Sagar_Ramani_Full_Stack_Developer.pdf`).
2. Open `src/data/profile.ts`.
3. Locate the corresponding role track in `profileData.resumeVersions`:
   ```ts
   {
     id: "full-stack-developer",
     // ...
     pdfAvailable: true,
     pdfPath: "/resume/Sagar_Ramani_Full_Stack_Developer.pdf",
   }
   ```
4. Update `profileData.resumePdfAvailable = true` if a primary master résumé is attached.
5. Rebuild and verify:
   ```bash
   pnpm build
   pnpm test:e2e
   ```

### 1.4 Enabling Client Testimonials
1. Testimonials are gated by default to honor privacy and publication rules.
2. In `src/data/site-config.ts`, `siteConfig.features.showTestimonials` is currently `false`.
3. When formal permission is received, update `src/data/testimonials.ts` with confirmed quotations and set `showTestimonials: true` in `site-config.ts`.

---

## 2. Dependency Upgrades & Maintenance

Portfolio V2 uses `pnpm` exclusively.

### Checking for Outdated Packages
```bash
pnpm outdated
```

### Running Security Audits
```bash
pnpm audit
```

### Upgrading Dependencies Safely
1. Test updates incrementally:
   ```bash
   pnpm update [package-name]
   ```
2. Never use `--force` or `--legacy-peer-deps`.
3. Always verify the full test pipeline after any dependency change:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   pnpm test:e2e
   ```

---

## 3. Production Monitoring & Health Checks

### Vercel Analytics & Speed Insights
- Automatically initialized in production when deployed to Vercel.
- Track real-user Core Web Vitals (INP, LCP, CLS) in the Vercel Dashboard under **Analytics** and **Speed Insights**.

### Serverless Function Logs (`/api/contact`)
- Inspect runtime logs under **Vercel Dashboard > Logs**.
- Look for HTTP status codes:
  - `200`: Successful submission and Resend dispatch.
  - `400`: Invalid client submission (schema validation failed).
  - `413`: Payload size exceeded (>32KB).
  - `415`: Unsupported Content-Type.
  - `429`: Rate limit exceeded (sliding window enforced).
  - `503`: Email service unconfigured (credentials missing).
  - `502`: Resend API provider rejection.

---

## 4. Disaster Recovery & Rollback

If a bad deployment is shipped:
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Go to **Deployments**.
3. Select the last known healthy deployment.
4. Click **Instant Rollback**.
5. Traffic will be immediately shifted back with zero downtime.

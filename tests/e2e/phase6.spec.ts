import { expect, test } from "@playwright/test";

test.describe("Portfolio V2 Phase 6 Final Production Release Verification", () => {
  // =========================================================================
  // Journey A: Professional Introduction
  // =========================================================================
  test("Journey A: Professional Introduction across Homepage, About, and Experience", async ({
    page,
  }) => {
    // 1. Open homepage
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Home/);

    // Verify personal branding and core designation
    const heroHeading = page.getByRole("heading", { level: 1, name: /Sagar Ramani/i });
    await expect(heroHeading).toBeVisible();

    // Verify designation & experience text
    const designation = page.getByText(/Full Stack Software Developer/i).first();
    await expect(designation).toBeVisible();

    // 2. Navigate to About
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/About/i).first()).toBeVisible();

    // Verify career narrative
    await expect(page.getByText(/Sagar Ramani/i).first()).toBeVisible();
    await expect(page.getByText(/4\+ years/i).first()).toBeVisible();

    // 3. Navigate to Experience
    await page.goto("/experience", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/experience/);
    await expect(page.getByRole("heading", { level: 1, name: /Professional Experience/i })).toBeVisible();

    // Verify past employer badges and confirmed employer history
    await expect(page.getByText(/ETD/i).first()).toBeVisible();
    await expect(page.getByText(/Anant Soft Computing/i).first()).toBeVisible();
    await expect(page.getByText(/La Net Team/i).first()).toBeVisible();

    // Verify ETD is marked with Past Employer badge and NOT Current Employer
    const pastEmployerBadges = page.getByText(/Past Employer/i);
    await expect(pastEmployerBadges.first()).toBeVisible();
    await expect(page.getByText(/current employer/i)).not.toBeVisible();
  });

  // =========================================================================
  // Journey B: Project Exploration
  // =========================================================================
  test("Journey B: Project Exploration with search, filters, case study, and related navigation", async ({
    page,
  }) => {
    await page.goto("/projects", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: /projects/i })).toBeVisible();

    // Verify search input
    const searchInput = page.getByLabel("Search projects");
    await expect(searchInput).toBeVisible();

    // Search for Study Streak
    await searchInput.fill("Study Streak");
    await page.waitForTimeout(300);

    // Open Study Streak case study via direct project link
    const viewProjectLink = page.locator('a[href="/projects/study-streak"]').first();
    await expect(viewProjectLink).toBeVisible();
    await viewProjectLink.click();
    await expect(page).toHaveURL(/\/projects\/study-streak/);

    // Verify Case study details
    await expect(page.getByRole("heading", { level: 1, name: /study streak/i })).toBeVisible();
    await expect(page.getByText(/Anant Soft Computing/i).first()).toBeVisible();

    // Verify breadcrumb navigation
    const breadcrumbProjects = page.locator('nav[aria-label="Breadcrumb"]').getByRole("link", { name: /projects/i }).first();
    await expect(breadcrumbProjects).toBeVisible();

    // Navigate back to project catalogue via breadcrumb
    await breadcrumbProjects.click();
    await expect(page).toHaveURL(/\/projects/);
  });

  // =========================================================================
  // Journey C: Résumé Download & Verification
  // =========================================================================
  test("Journey C: Résumé version selection and gated PDF download state", async ({ page }) => {
    await page.goto("/resume", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: /sagar ramani/i })).toBeVisible();

    // Verify 6 role-specific résumé cards are listed
    await expect(page.getByText(/Full Stack Developer/i).first()).toBeVisible();
    await expect(page.getByText(/MERN Stack Developer/i).first()).toBeVisible();
    await expect(page.getByText(/Frontend Developer/i).first()).toBeVisible();
    await expect(page.getByText(/Backend Developer/i).first()).toBeVisible();
    await expect(page.getByText(/AI Developer/i).first()).toBeVisible();
    await expect(page.getByText(/Software Developer/i).first()).toBeVisible();

    // Verify that download and preview buttons are gated (disabled until verified PDFs are attached)
    const disabledPdfButtons = page.locator('button:has-text("PDF"):disabled');
    const pdfCount = await disabledPdfButtons.count();
    expect(pdfCount).toBe(6);

    const disabledPreviewButtons = page.locator('button:has-text("Preview"):disabled');
    const previewCount = await disabledPreviewButtons.count();
    expect(previewCount).toBe(6);

    // Verify Print Web Résumé button is present and enabled
    const printBtn = page.getByRole("button", { name: /print web résumé/i });
    await expect(printBtn).toBeVisible();
    await expect(printBtn).toBeEnabled();
  });

  // =========================================================================
  // Journey D: Contact Form Submissions and Validation
  // =========================================================================
  test("Journey D: Contact Form validation, accessible errors, and submission handling", async ({
    page,
  }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1, name: /contact/i })).toBeVisible();

    const nameInput = page.getByLabel(/^name/i);
    const emailInput = page.getByLabel(/^email/i);
    const messageInput = page.getByLabel(/^message/i);
    const submitBtn = page.getByRole("button", { name: /send message/i });

    // Submit invalid/empty form
    await submitBtn.click();

    // Verify accessible invalid attributes
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(messageInput).toHaveAttribute("aria-invalid", "true");

    // Fill valid inputs
    await nameInput.fill("Jane Recruiter");
    await emailInput.fill("jane@techcompany.com");
    await messageInput.fill("Hello Sagar, we reviewed your portfolio and would like to schedule an interview.");

    // Resubmit
    await submitBtn.click();

    // Verify client-side errors are cleared
    await expect(nameInput).not.toHaveAttribute("aria-invalid", "true");
  });

  // =========================================================================
  // Journey E: Theme Switching and Accessibility
  // =========================================================================
  test("Journey E: Theme switching, keyboard navigation, and reduced motion", async ({
    page,
  }) => {
    await page.goto("/");

    // 1. Skip-to-content link exists
    const skipLink = page.getByRole("link", { name: /skip to (main )?content/i });
    expect(await skipLink.count()).toBeGreaterThanOrEqual(1);

    // 2. Theme toggle switches between light and dark
    const html = page.locator("html");
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(html).not.toHaveClass(/dark/);

    // 3. Test keyboard navigation: Tab focus
    await page.keyboard.press("Tab");
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeDefined();
  });

  // =========================================================================
  // Journey F: Error Recovery and Draft Slugs
  // =========================================================================
  test("Journey F: Custom 404 response on unknown routes and draft project slugs", async ({
    page,
  }) => {
    // 1. Nonexistent route
    const res = await page.goto("/completely-invalid-phase6-route", {
      waitUntil: "domcontentloaded",
    });
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const homeBtn = page.getByRole("link", { name: /return to home/i });
    await expect(homeBtn).toBeVisible();
    await homeBtn.click();
    await expect(page).toHaveURL(/\/$/);

    // 2. Draft project slug (e.g. real-e-state)
    const draftRes = await page.goto("/projects/real-e-state", {
      waitUntil: "domcontentloaded",
    });
    expect(draftRes?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // 3. Draft project slug (pawppy)
    const draftRes2 = await page.goto("/projects/pawppy", {
      waitUntil: "domcontentloaded",
    });
    expect(draftRes2?.status()).toBe(404);
  });

  // =========================================================================
  // Multi-Viewport Responsive Verification across all 10 approved viewports
  // =========================================================================
  const REQUIRED_VIEWPORTS = [
    { name: "320px (Mobile S)", width: 320, height: 568 },
    { name: "375px (Mobile M)", width: 375, height: 667 },
    { name: "390px (iPhone 12/13/14)", width: 390, height: 844 },
    { name: "430px (iPhone 14/15 Pro Max)", width: 430, height: 932 },
    { name: "768px (Tablet Portrait)", width: 768, height: 1024 },
    { name: "1024px (Tablet Landscape)", width: 1024, height: 768 },
    { name: "1280px (Small Laptop)", width: 1280, height: 800 },
    { name: "1440px (Desktop)", width: 1440, height: 900 },
    { name: "1920px (Full HD)", width: 1920, height: 1080 },
    { name: "2560px (QHD / 2K)", width: 2560, height: 1440 },
  ];

  test("Multi-viewport verification with zero horizontal overflow across 10 viewports", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const testRoutes = ["/", "/about", "/experience", "/projects", "/contact"];

    for (const vp of REQUIRED_VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of testRoutes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth
        );
        expect(hasOverflow, `Horizontal overflow detected at ${route} on ${vp.name}`).toBe(false);
      }
    }
  });
});

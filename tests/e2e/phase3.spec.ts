import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 640 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const CORE_ROUTES = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/projects/truevalue-platform",
  "/projects/study-streak",
  "/skills",
  "/education",
  "/resume",
  "/contact",
];

test.describe("Portfolio V2 Phase 3 Core Pages & Interactions", () => {
  test("projects catalog supports search, filters, view toggle, and clear filters", async ({
    page,
  }) => {
    await page.goto("/projects");

    await expect(page.getByText(/Showing 8 of 8 top-level entries/i)).toBeVisible();

    await page.getByRole("button", { name: /Featured Only/i }).click();
    await expect(page.getByText(/Showing 5 of 8 top-level entries/i)).toBeVisible();
    await expect(page).toHaveURL(/featured=true/);

    await page.getByLabel("Search projects").fill("Study Streak");
    await expect(page.getByText(/Showing 1 of 8 top-level entries/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /View Project/i })).toHaveAttribute(
      "href",
      "/projects/study-streak"
    );

    await page.getByRole("button", { name: "List view" }).click();
    await expect(page).toHaveURL(/view=list/);

    await page.getByRole("button", { name: /Clear all filters/i }).click();
    await expect(page.getByText(/Showing 8 of 8 top-level entries/i)).toBeVisible();

    await page.getByLabel("Search projects").fill("non-existent-query-xyz");
    await expect(page.getByText(/No projects match your current filters/i)).toBeVisible();
    await page.getByRole("button", { name: "Clear All Filters", exact: true }).click();
    await expect(page.getByText(/Showing 8 of 8 top-level entries/i)).toBeVisible();
  });

  test("case study pages render breadcrumbs and return 404 for draft slugs", async ({ page }) => {
    await page.goto("/projects/truevalue-crm");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.getByRole("link", { name: "TrueValue Platform" }).first()).toBeVisible();

    const draftResponse = await page.goto("/projects/real-e-state");
    expect(draftResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /Page Could Not Be Found/i })).toBeVisible();

    const unverifiedDraftResponse = await page.goto("/projects/pawppy");
    expect(unverifiedDraftResponse?.status()).toBe(404);
  });

  test("skills matrix filters by proficiency level and search query", async ({ page }) => {
    await page.goto("/skills");
    await page.getByRole("button", { name: "Currently Learning" }).click();
    await expect(page.getByText("Kafka")).toBeVisible();
    await expect(page.getByText(/Showing 1 skills across 1 categories/i)).toBeVisible();

    await page.getByRole("button", { name: "All Capabilities" }).click();
    await page.getByLabel("Filter skills or categories").fill("Django");
    await expect(page.getByText("Django REST Framework")).toBeVisible();
  });

  test("experience page displays calculated durations and marks ETD as past employer", async ({
    page,
  }) => {
    await page.goto("/experience");
    await expect(page.getByText("4 yrs 9 mos")).toBeVisible();
    await expect(page.getByText("1 yr 3 mos")).toBeVisible();
    await expect(page.getByText("1 yr 10 mos").first()).toBeVisible();
    await expect(page.getByText("1 yr 8 mos")).toBeVisible();
    await expect(page.getByText(/Past Employer/i).first()).toBeVisible();
  });

  test("resume page lists 6 role-specific tracks with PDF downloads gated", async ({ page }) => {
    await page.goto("/resume");
    await expect(
      page.getByRole("heading", { name: /Approved Role-Specific Résumé Versions \(6\)/i })
    ).toBeVisible();
    await expect(page.getByText("Sagar_Ramani_Full_Stack_Developer.pdf")).toBeVisible();
    await expect(page.getByText("Sagar_Ramani_AI_Developer.pdf")).toBeVisible();

    const disabledDownloadButtons = page.getByRole("button", { name: /^PDF$/ });
    await expect(disabledDownloadButtons).toHaveCount(6);
    for (let i = 0; i < 6; i += 1) {
      await expect(disabledDownloadButtons.nth(i)).toBeDisabled();
    }
  });

  test("sitemap excludes draft project URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("/projects/study-streak");
    expect(body).not.toContain("/projects/real-e-state");
    expect(body).not.toContain("/projects/pawppy");
  });

  test("zero horizontal overflow across all approved viewports (320px to 1920px)", async ({
    page,
  }) => {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const routesToCheck =
        vp.width === 390 || vp.width === 1440 ? CORE_ROUTES : ["/", "/projects", "/resume", "/contact"];

      for (const route of routesToCheck) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth
        );
        expect(hasOverflow, `Horizontal overflow on ${route} at ${vp.name}`).toBe(false);
      }
    }
  });
});

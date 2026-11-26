import { expect, test } from "@playwright/test";

const ROUTES = [
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

test.describe("Portfolio V2 Phase 2 Foundation", () => {
  test("all approved routes render without console or page errors and without horizontal overflow", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of ROUTES) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `Unexpected status for ${route}`).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(hasHorizontalOverflow, `Horizontal overflow on ${route} at 1440px`).toBe(false);
    }

    await page.setViewportSize({ width: 768, height: 1024 });
    for (const route of ["/", "/projects", "/contact"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const tabletOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(tabletOverflow, `Horizontal overflow on ${route} at 768px`).toBe(false);
    }

    expect(consoleErrors, `Console errors: ${consoleErrors.join(" | ")}`).toEqual([]);
    expect(pageErrors, `Page errors: ${pageErrors.join(" | ")}`).toEqual([]);
  });

  test("theme toggle switches between light, dark, and system modes", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: "Switch to system theme" }).click();
  });

  test("responsive mobile navigation works without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav).toBeVisible();
    await mobileNav.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("reduced motion renders static hero sphere fallback", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const fallback = page.getByTestId("hero-sphere-fallback");
    await expect(fallback).toBeVisible();
    await expect(fallback).toHaveAttribute("data-fallback-reason", "reduced-motion");
  });

  test("contact form validates inputs and API rejects invalid payloads", async ({
    page,
    request,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText(/Please enter your name/i)).toBeVisible();

    const apiResponse = await request.post("/api/contact", {
      data: { name: "A", email: "bad", message: "short" },
      headers: { "x-forwarded-for": `10.10.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}` },
    });
    expect([400, 429]).toContain(apiResponse.status());
  });

  test("unknown routes render custom 404 page", async ({ page }) => {
    const response = await page.goto("/non-existent-route-phase2");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /Page Could Not Be Found/i })).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";

test.describe("Portfolio V2 Phase 4 Animations & Interactive 3D", () => {
  test("horizontal project showcase renders 6 published projects and excludes drafts", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const showcase = page.getByTestId("horizontal-project-showcase");
    await expect(showcase).toBeVisible();

    for (const title of [
      "TrueValue Platform",
      "FlyOverseas.ai",
      "Automated Job Aggregation",
      "Study Streak",
      "Tube Master",
      "Pabau",
    ]) {
      await expect(showcase.getByText(title, { exact: true }).first()).toBeVisible();
    }

    await expect(showcase.getByText("MakeMyForte")).toHaveCount(0);

    await page.evaluate(() => {
      const el = document.querySelector('[data-testid="horizontal-project-showcase"]');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, top - 80), behavior: "instant" });
      }
    });
    await expect(
      showcase.getByRole("heading", { name: "Platforms & Production Applications" })
    ).toBeInViewport();
  });

  test("ambient motion pause control pauses 3D sphere and persists across routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "load" });

    const toggle = page.getByTestId("ambient-motion-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    const fallback = page.getByTestId("hero-sphere-fallback");
    await expect(fallback).toBeVisible();
    await expect(fallback).toHaveAttribute("data-fallback-reason", "paused");

    await page.goto("/skills", { waitUntil: "load" });
    await expect(page.getByTestId("ambient-motion-toggle")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test("technology orbit on skills and marquee on home support domain selection and pause controls", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "load" });

    const pauseStream = page.getByRole("button", { name: /Pause Stream/i });
    await pauseStream.scrollIntoViewIfNeeded();
    await expect(pauseStream).toBeVisible();
    await pauseStream.click();
    await expect(page.getByRole("button", { name: /Resume Stream/i })).toBeVisible();

    await page.goto("/skills", { waitUntil: "load" });
    const backendTab = page.getByRole("tab", { name: "Backend Development" });
    await expect(backendTab).toBeVisible();
    await backendTab.click();
    await expect(backendTab).toHaveAttribute("aria-selected", "true");

    const pauseOrbit = page.getByRole("button", { name: /Pause Orbit/i });
    await expect(pauseOrbit).toBeVisible();
    await pauseOrbit.click();
    await expect(page.getByRole("button", { name: /Resume Orbit/i })).toBeVisible();
  });

  test("preloader skips under reduced motion and repeated route navigation produces zero errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => {
      pageErrors.push(err.message);
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("cinematic-preloader")).toHaveCount(0);

    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const route of [
      "/about",
      "/experience",
      "/projects",
      "/projects/truevalue-platform",
      "/skills",
      "/education",
      "/resume",
      "/contact",
      "/",
    ]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1").first()).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(overflow, `Horizontal overflow after navigation to ${route}`).toBe(false);
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});

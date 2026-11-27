import { expect, test } from "@playwright/test";

import { siteConfig } from "@/data/site-config";

test.describe("Portfolio V2 Phase 5 Production Integrations, SEO, Security & Performance", () => {
  test("security headers are present on public HTML responses", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["permissions-policy"]).toContain("microphone=()");
    expect(headers["permissions-policy"]).toContain("geolocation=()");
    expect(headers["content-security-policy"]).toBeDefined();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["strict-transport-security"]).toBeDefined();
  });

  test("robots.txt and sitemap.xml serve valid SEO directives and exclude drafts", async ({
    request,
  }) => {
    // robots.txt
    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toMatch(/user-agent:\s*\*/i);
    expect(robotsText).toMatch(/allow:\s*\//i);
    expect(robotsText).toMatch(/disallow:\s*\/api\//i);
    expect(robotsText.toLowerCase()).toContain(`sitemap: ${siteConfig.siteUrl.toLowerCase()}/sitemap.xml`);

    // sitemap.xml
    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain("<urlset");
    expect(sitemapText).toContain(`<loc>${siteConfig.siteUrl}/</loc>`);
    expect(sitemapText).toContain(`<loc>${siteConfig.siteUrl}/projects</loc>`);
    expect(sitemapText).toContain(`<loc>${siteConfig.siteUrl}/projects/truevalue-platform</loc>`);
    // Draft project must be excluded
    expect(sitemapText).not.toContain("makemyforte");
    expect(sitemapText).not.toContain("/api/");
  });

  test("dynamic Open Graph, Twitter cards, and favicon routes return 200 image responses", async ({
    request,
  }) => {
    const rootOg = await request.get("/opengraph-image");
    expect(rootOg.status()).toBe(200);
    expect(rootOg.headers()["content-type"]).toContain("image/png");

    const rootTwitter = await request.get("/twitter-image");
    expect(rootTwitter.status()).toBe(200);
    expect(rootTwitter.headers()["content-type"]).toContain("image/png");

    const projectOg = await request.get("/projects/truevalue-platform/opengraph-image");
    expect(projectOg.status()).toBe(200);
    expect(projectOg.headers()["content-type"]).toContain("image/png");

    const icon = await request.get("/icon");
    expect(icon.status()).toBe(200);
    expect(icon.headers()["content-type"]).toMatch(/image\/(png|x-icon|vnd\.microsoft\.icon)/);

    const appleIcon = await request.get("/apple-icon");
    expect(appleIcon.status()).toBe(200);
    expect(appleIcon.headers()["content-type"]).toContain("image/png");
  });

  test("homepage renders valid Person and WebSite JSON-LD structured data", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const jsonLds = (
      await Promise.all(
        scripts.map(async (script) => {
          const text = await script.textContent();
          return text ? JSON.parse(text) : null;
        })
      )
    ).flatMap((item) => (Array.isArray(item) ? item : [item]));

    const personSchema = jsonLds.find((data) => data?.["@type"] === "Person");
    expect(personSchema).toBeDefined();
    expect(personSchema?.name).toBe("Sagar Ramani");
    expect(personSchema?.jobTitle).toBe("Full Stack Software Developer");
    expect(personSchema?.url).toBe(siteConfig.siteUrl);
    expect(personSchema?.sameAs).toContain("https://github.com/SagarIR");
    expect(personSchema?.sameAs).toContain("https://www.linkedin.com/in/sagar-ramani/");

    const websiteSchema = jsonLds.find((data) => data?.["@type"] === "WebSite");
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema?.name).toContain("Sagar Ramani");
  });

  test("published case study renders valid SoftwareApplication and BreadcrumbList JSON-LD", async ({
    page,
  }) => {
    await page.goto("/projects/truevalue-platform", { waitUntil: "domcontentloaded" });

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const jsonLds = (
      await Promise.all(
        scripts.map(async (script) => {
          const text = await script.textContent();
          return text ? JSON.parse(text) : null;
        })
      )
    ).flatMap((item) => (Array.isArray(item) ? item : [item]));

    const appSchema = jsonLds.find(
      (data) => data?.["@type"] === "SoftwareApplication" || data?.["@type"] === "CreativeWork"
    );
    expect(appSchema).toBeDefined();
    expect(appSchema?.name).toBe("TrueValue Platform");

    const breadcrumbSchema = jsonLds.find((data) => data?.["@type"] === "BreadcrumbList");
    expect(breadcrumbSchema).toBeDefined();
    expect(breadcrumbSchema?.itemListElement?.length).toBe(3);
  });

  test("contact API route enforces security controls and validates submissions", async ({
    request,
  }) => {
    // 1. Method not allowed
    const getRes = await request.get("/api/contact");
    expect(getRes.status()).toBe(405);

    // 2. Unsupported Content-Type
    const textRes = await request.post("/api/contact", {
      data: "name=Test",
      headers: { "Content-Type": "text/plain" },
    });
    expect(textRes.status()).toBe(415);

    // 3. Payload size exceeded (>32KB)
    const largeBody = {
      name: "Large Payload Tester",
      email: "test@example.com",
      message: "x".repeat(35 * 1024),
      purpose: "General Inquiry",
    };
    const largeRes = await request.post("/api/contact", {
      data: largeBody,
      headers: { "Content-Type": "application/json" },
    });
    expect(largeRes.status()).toBe(413);

    // 4. Invalid schema fields (missing email & message)
    const badSchemaRes = await request.post("/api/contact", {
      data: { name: "A" },
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `10.20.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      },
    });
    expect([400, 429]).toContain(badSchemaRes.status());
    if (badSchemaRes.status() === 400) {
      const badSchemaJson = await badSchemaRes.json();
      expect(badSchemaJson.success).toBe(false);
      expect(badSchemaJson.fieldErrors).toBeDefined();
    }

    // 5. Honeypot check (bot submission silently returns 200)
    const honeypotRes = await request.post("/api/contact", {
      data: {
        name: "Bot Spammer",
        email: "bot@spammer.com",
        message: "Buy cheap crypto now!",
        purpose: "General Inquiry",
        website: "https://spam.example.com",
      },
      headers: { "Content-Type": "application/json" },
    });
    expect(honeypotRes.status()).toBe(200);
    const honeypotJson = await honeypotRes.json();
    expect(honeypotJson.success).toBe(true);

    // 6. Valid human submission without live Resend credentials returns 503
    const validRes = await request.post("/api/contact", {
      data: {
        name: "Legitimate Visitor",
        email: "visitor@example.com",
        message: "Hello Sagar, I would like to discuss a project.",
        purpose: "Project Collaboration",
      },
      headers: { "Content-Type": "application/json" },
    });
    // In dev / test environment without real Resend API key, returns 503 Service Unavailable
    expect([200, 503]).toContain(validRes.status());
    if (validRes.status() === 503) {
      const errJson = await validRes.json();
      expect(errJson.error).toContain("not configured");
    }
  });

  test("contact form UI provides accessible validation, error states, and submission flow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/contact");

    // Verify form elements exist
    const form = page.getByRole("form", { name: /contact form/i });
    await expect(form).toBeVisible();

    const nameInput = page.getByLabel(/^name/i);
    const emailInput = page.getByLabel(/^email/i);
    const messageInput = page.getByLabel(/^message/i);
    const submitBtn = page.getByRole("button", { name: /send message/i });
    await expect(submitBtn).toBeVisible();

    // Attempt submission with empty fields to trigger client validation
    await submitBtn.click();

    // Verify validation errors and aria attributes
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(messageInput).toHaveAttribute("aria-invalid", "true");

    // Fill valid data
    await nameInput.fill("Sagar Test Visitor");
    await emailInput.fill("visitor@example.com");
    await messageInput.fill("This is a detailed message for testing the contact form integration.");

    // Click send message
    await submitBtn.click();
    // Inline validation errors for name should disappear
    await expect(page.getByText(/at least 2 characters/i)).not.toBeVisible();
  });

  test("404 route returns not-found page with accessible recovery link", async ({ page }) => {
    const res = await page.goto("/non-existent-route-for-phase-5-test", {
      waitUntil: "domcontentloaded",
    });
    expect(res?.status()).toBe(404);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const homeLink = page.getByRole("link", { name: /return to home/i });
    await expect(homeLink).toBeVisible();
  });
});

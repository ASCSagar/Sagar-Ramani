import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/projects", name: "projects" },
  { path: "/projects/truevalue-platform", name: "project-truevalue" },
  { path: "/skills", name: "skills" },
  { path: "/education", name: "education" },
  { path: "/resume", name: "resume" },
  { path: "/contact", name: "contact" },
];

const VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 640 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const THEMES = ["dark", "light"];
const PORT = 3005;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304 || res.status === 404) {
        return true;
      }
    } catch {
      // wait a bit
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function capture() {
  const outputDir = path.join("docs", "screenshots");
  fs.mkdirSync(outputDir, { recursive: true });

  console.log("Starting Next.js production server on 127.0.0.1:" + PORT);
  const server = spawn(
    "cmd.exe",
    ["/c", "pnpm", "exec", "next", "start", "-H", "127.0.0.1", "-p", String(PORT)],
    {
      stdio: "inherit",
      env: { ...process.env, PORT: String(PORT) },
    }
  );

  try {
    await waitForServer(BASE_URL);
    console.log("Server ready. Launching Chromium for multi-viewport screenshots...");

    const browser = await chromium.launch({ channel: "chrome", headless: true });

    let count = 0;
    // Capture representative viewport & theme matrix
    for (const vp of VIEWPORTS) {
      for (const theme of THEMES) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme,
        });

        // Set theme preference in localStorage before navigating
        const page = await context.newPage();
        await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
        await page.evaluate((th) => {
          localStorage.setItem("theme", th);
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(th);
        }, theme);

        for (const route of ROUTES) {
          await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "domcontentloaded" });
          // brief pause to allow fonts and CSS layout to settle
          await page.waitForTimeout(300);

          const filename = `${route.name}-${vp.name}-${theme}.png`;
          const filePath = path.join(outputDir, filename);

          await page.screenshot({ path: filePath, fullPage: false });
          count++;
          if (count % 18 === 0) {
            console.log(`Captured ${count} screenshots...`);
          }
        }

        await page.close();
        await context.close();
      }
    }

    await browser.close();
    console.log(`\nSuccessfully captured all ${count} screenshots in ${outputDir}!`);
  } finally {
    server.kill();
  }
}

capture().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});

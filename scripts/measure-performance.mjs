import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROUTES = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/experience", name: "Experience" },
  { path: "/projects", name: "Projects" },
  { path: "/projects/truevalue-platform", name: "Project: TrueValue Platform" },
  { path: "/skills", name: "Skills" },
  { path: "/education", name: "Education" },
  { path: "/resume", name: "Resume" },
  { path: "/contact", name: "Contact" },
];

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

async function runMeasurements() {
  console.log("Starting Next.js production server on 127.0.0.1:" + PORT);
  const server = spawn("cmd.exe", ["/c", "pnpm", "exec", "next", "start", "-H", "127.0.0.1", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(BASE_URL);
    console.log("Server is ready. Launching Chromium via Playwright...");

    const browser = await chromium.launch({ channel: "chrome", headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });

    const results = [];

    for (const route of ROUTES) {
      console.log(`Measuring ${route.name} (${route.path})...`);
      const page = await context.newPage();

      // Collect network requests during load
      const requests = [];
      page.on("requestfinished", async (req) => {
        try {
          const res = await req.response();
          const sizes = await req.sizes();
          requests.push({
            url: req.url(),
            resourceType: req.resourceType(),
            status: res ? res.status() : 0,
            transferSize: sizes.responseBodySize + sizes.responseHeadersSize,
          });
        } catch {
          // ignore aborted/closed
        }
      });

      // Inject performance observers before page load
      await page.addInitScript(() => {
        window.__perfMetrics = {
          lcp: 0,
          cls: 0,
          fcp: 0,
          longTasks: 0,
          tbt: 0,
        };

        const poLcp = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            window.__perfMetrics.lcp = entries[entries.length - 1].startTime;
          }
        });
        poLcp.observe({ type: "largest-contentful-paint", buffered: true });

        const poCls = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__perfMetrics.cls += entry.value;
            }
          }
        });
        poCls.observe({ type: "layout-shift", buffered: true });

        const poLt = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            window.__perfMetrics.longTasks += 1;
            if (entry.duration > 50) {
              window.__perfMetrics.tbt += entry.duration - 50;
            }
          }
        });
        poLt.observe({ type: "longtask", buffered: true });
      });

      const response = await page.goto(`${BASE_URL}${route.path}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // Wait 1.5s for initial animations and 3D canvas mount
      await page.waitForTimeout(1500);

      const metrics = await page.evaluate(async () => {
        const perf = window.performance;
        const paintEntries = perf.getEntriesByType("paint");
        const fcpEntry = paintEntries.find((e) => e.name === "first-contentful-paint");
        const navEntries = perf.getEntriesByType("navigation");
        const nav = navEntries.length > 0 ? navEntries[0] : null;

        const resourceEntries = perf.getEntriesByType("resource");
        let scriptBytes = 0;
        let cssBytes = 0;
        let fontBytes = 0;
        let imgBytes = 0;
        let otherBytes = 0;

        for (const r of resourceEntries) {
          const size = r.transferSize || r.encodedBodySize || 0;
          if (r.initiatorType === "script") scriptBytes += size;
          else if (r.initiatorType === "css" || r.initiatorType === "link") cssBytes += size;
          else if (r.initiatorType === "font") fontBytes += size;
          else if (r.initiatorType === "img") imgBytes += size;
          else otherBytes += size;
        }

        // WebGL canvas check
        const canvas = document.querySelector("canvas");
        let webglInfo = null;
        if (canvas) {
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            webglInfo = {
              vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
              renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
              width: canvas.width,
              height: canvas.height,
            };
          }
        }

        // Measure FPS over 30 frames
        const fps = await new Promise((resolve) => {
          let frames = 0;
          const start = performance.now();
          function tick() {
            frames++;
            if (frames < 30 && performance.now() - start < 1000) {
              requestAnimationFrame(tick);
            } else {
              const duration = performance.now() - start;
              resolve(Math.round((frames / duration) * 1000));
            }
          }
          requestAnimationFrame(tick);
        });

        return {
          fcp: fcpEntry ? fcpEntry.startTime : 0,
          lcp: window.__perfMetrics.lcp,
          cls: window.__perfMetrics.cls,
          tbt: window.__perfMetrics.tbt,
          domContentLoaded: nav ? nav.domContentLoadedEventEnd : 0,
          loadComplete: nav ? nav.loadEventEnd : 0,
          resourceCount: resourceEntries.length,
          scriptBytes,
          cssBytes,
          fontBytes,
          imgBytes,
          otherBytes,
          totalResourceBytes: scriptBytes + cssBytes + fontBytes + imgBytes + otherBytes,
          webgl: webglInfo,
          fps,
        };
      });

      results.push({
        route: route.path,
        name: route.name,
        status: response ? response.status() : 0,
        requestsCount: requests.length,
        ...metrics,
      });

      await page.close();
    }

    await browser.close();

    const outputData = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        device: "Desktop (1440x900)",
        headless: true,
        network: "Local production build (unthrottled)",
      },
      results,
    };

    const outputFile = process.argv[2] || path.join("docs", "performance-optimized.json");
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(
      outputFile,
      JSON.stringify(outputData, null, 2),
      "utf8"
    );

    console.log(`\n=================== PERFORMANCE REPORT (${path.basename(outputFile)}) ===================`);
    console.table(
      results.map((r) => ({
        Route: r.route,
        "FCP (ms)": Math.round(r.fcp),
        "LCP (ms)": Math.round(r.lcp),
        CLS: r.cls.toFixed(3),
        "TBT (ms)": Math.round(r.tbt),
        FPS: r.fps,
        "Requests": r.requestsCount,
        "JS (KB)": Math.round(r.scriptBytes / 1024),
        "CSS (KB)": Math.round(r.cssBytes / 1024),
        "Img (KB)": Math.round(r.imgBytes / 1024),
        "Font (KB)": Math.round(r.fontBytes / 1024),
        "Total (KB)": Math.round(r.totalResourceBytes / 1024),
        WebGL: r.webgl ? `${r.webgl.width}x${r.webgl.height}` : "None",
      }))
    );
    console.log("Saved baseline report to docs/performance-baseline.json");
  } finally {
    server.kill();
  }
}

runMeasurements().catch((err) => {
  console.error("Measurement error:", err);
  process.exit(1);
});

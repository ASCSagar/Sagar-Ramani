import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

async function main() {
  const PORT = 3006;
  const server = spawn("cmd.exe", ["/c", "pnpm", "exec", "next", "start", "-H", "127.0.0.1", "-p", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const browser = await chromium.launch({ channel: "chrome", headless: true });
    const page = await browser.newPage();

    page.on("console", (msg) => console.log("PAGE LOG:", msg.type(), msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

    await page.goto(`http://127.0.0.1:${PORT}/contact`);
    console.log("Navigated to /contact. Clicking Send Message...");

    const btn = page.getByRole("button", { name: "Send Message" });
    console.log("Button visible:", await btn.isVisible());
    await btn.click();

    await page.waitForTimeout(500);
    const content = await page.content();
    console.log("Contains 'Please enter your name':", content.includes("Please enter your name"));

    const errors = await page.locator(".text-destructive").allInnerTexts();
    console.log("Visible errors:", errors);

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch(console.error);

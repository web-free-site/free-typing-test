import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PRERENDER_ROUTES } from "./routes.mjs";

const PREVIEW_PORT = 4173;
const BASE = `http://127.0.0.1:${PREVIEW_PORT}`;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await wait(500);
  }
  throw new Error("Preview server did not start");
}

function routeToFile(route) {
  if (route === "/") return "dist/index.html";
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return join("dist", clean, "index.html");
}

async function main() {
  const { chromium } = await import("playwright");

  const preview = spawn(
    "npx",
    [
      "vite",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(PREVIEW_PORT),
      "--strictPort",
    ],
    { stdio: "pipe", shell: true },
  );
  preview.stdout?.on("data", (d) => process.stdout.write(d));
  preview.stderr?.on("data", (d) => process.stderr.write(d));

  try {
    await waitForServer();
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const route of PRERENDER_ROUTES) {
      const url = `${BASE}${route}`;
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await wait(1500);
      let html = await page.content();
      const out = routeToFile(route);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html, "utf8");
      console.log("Prerendered", route, "->", out);
    }

    await browser.close();
  } finally {
    preview.kill("SIGTERM");
    await wait(300);
  }

  // Copy sitemap to dist
  writeFileSync(
    "dist/sitemap.xml",
    readFileSync("public/sitemap.xml", "utf8"),
    "utf8",
  );
  writeFileSync(
    "dist/robots.txt",
    readFileSync("public/robots.txt", "utf8"),
    "utf8",
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
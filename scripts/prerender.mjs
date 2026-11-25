import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PRERENDER_ROUTES } from "./routes.mjs";
import {
  ROUTE_SEO,
  HOMEPAGE_CANONICAL,
  canonicalForPath,
} from "./route-seo.mjs";
import { routeToFile, runNodeFallback } from "./prerender-fallback.mjs";

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

function assertRouteConfigAligned() {
  const fromRoutes = [...PRERENDER_ROUTES].sort().join("|");
  const fromSeo = ROUTE_SEO.map((r) => r.path).sort().join("|");
  if (fromRoutes !== fromSeo) {
    throw new Error(
      `PRERENDER_ROUTES and ROUTE_SEO paths differ.\nroutes: ${fromRoutes}\nseo: ${fromSeo}`,
    );
  }
}

function extractCanonical(html) {
  const m = html.match(
    /<link\s+rel="canonical"\s+href="([^"]*)"/i,
  );
  return m ? m[1] : null;
}

function decodeBasicEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<");
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeBasicEntities(m[1]) : null;
}

function validatePrerenderOutputs() {
  const errors = [];
  const summary = [];

  for (const meta of ROUTE_SEO) {
    const out = routeToFile(meta.path);
    const expectedCanonical = canonicalForPath(meta.path);

    if (!existsSync(out)) {
      errors.push(`MISSING file for ${meta.path}: ${out}`);
      continue;
    }

    const html = readFileSync(out, "utf8");
    const title = extractTitle(html);
    const canonical = extractCanonical(html);

    if (meta.path !== "/" && canonical === HOMEPAGE_CANONICAL) {
      errors.push(
        `${meta.path}: canonical is still homepage (${HOMEPAGE_CANONICAL})`,
      );
    }
    if (canonical !== expectedCanonical) {
      errors.push(
        `${meta.path}: canonical ${canonical ?? "(none)"} !== expected ${expectedCanonical}`,
      );
    }
    if (title !== meta.title) {
      errors.push(
        `${meta.path}: title ${JSON.stringify(title)} !== expected ${JSON.stringify(meta.title)}`,
      );
    }

    summary.push({ route: meta.path, file: out, title, canonical });
  }

  console.log("\n--- Prerender SEO summary ---");
  for (const row of summary) {
    console.log(
      `${row.route}\n  file: ${row.file}\n  title: ${row.title}\n  canonical: ${row.canonical}`,
    );
  }
  console.log("-------------------------------\n");

  if (errors.length) {
    console.error("Prerender validation FAILED:");
    for (const e of errors) console.error("  -", e);
    return false;
  }
  console.log(`Prerender validation OK (${summary.length} routes).`);
  return true;
}

function copyStaticSeoFiles() {
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
}

async function freePreviewPort() {
  try {
    const { execSync } = await import("node:child_process");
    const pids = execSync(`lsof -ti:${PREVIEW_PORT} 2>/dev/null || true`, {
      encoding: "utf8",
    }).trim();
    if (pids) {
      for (const pid of pids.split(/\s+/)) {
        try {
          process.kill(Number(pid), "SIGTERM");
        } catch {
          /* gone */
        }
      }
      await wait(400);
    }
  } catch {
    /* lsof unavailable */
  }
}

async function runPlaywrightPrerender() {
  const { chromium } = await import("playwright");
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const { dirname } = await import("node:path");

  await freePreviewPort();

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
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    });

    for (const route of PRERENDER_ROUTES) {
      const url = `${BASE}${route}`;
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await wait(1500);
      const html = await page.content();
      const out = routeToFile(route);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html, "utf8");
      console.log("Prerendered (Playwright)", route, "->", out);
    }

    await browser.close();
    return "playwright";
  } finally {
    preview.kill("SIGTERM");
    await wait(300);
  }
}

async function main() {
  assertRouteConfigAligned();

  let mode = "fallback";
  try {
    await runPlaywrightPrerender();
    mode = "playwright";
    console.log("Playwright prerender completed successfully.");
  } catch (err) {
    console.warn(
      "Playwright prerender unavailable or failed; using Node head fallback.",
    );
    console.warn(err?.message || err);
    runNodeFallback();
    console.log("Node-only fallback prerender completed.");
  }

  copyStaticSeoFiles();

  const ok = validatePrerenderOutputs();
  if (!ok) {
    console.error(`Build prerender step failed (mode: ${mode}).`);
    process.exit(1);
  }
  console.log(`Build prerender step succeeded (mode: ${mode}).`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
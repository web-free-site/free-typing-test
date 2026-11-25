import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import {
  ROUTE_SEO,
  SITE_NAME,
  canonicalForPath,
  hreflangForPath,
} from "./route-seo.mjs";

function escapeAttr(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function insertBeforeHeadClose(html, snippet) {
  const idx = html.toLowerCase().lastIndexOf("</head>");
  if (idx === -1) return html + snippet;
  return html.slice(0, idx) + snippet + "\n" + html.slice(idx);
}

function replaceOrInsertMetaProperty(html, property, content) {
  const esc = escapeAttr(content);
  const re = new RegExp(
    `<meta\\s+property="${property.replace(/:/g, "\\:")}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  const tag = `<meta property="${property}" content="${esc}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return insertBeforeHeadClose(html, tag);
}

function replaceOrInsertMetaName(html, name, content) {
  const esc = escapeAttr(content);
  const re = new RegExp(
    `<meta\\s+name="${name.replace(/:/g, "\\:")}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  const tag = `<meta name="${name}" content="${esc}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return insertBeforeHeadClose(html, tag);
}

/** Rewrite dist/index.html shell head to match Seo.jsx for one route. */
export function applyRouteHeadToHtml(html, meta) {
  const { path, title, description, lang = "en", noAlternate = false } = meta;
  const canonical = canonicalForPath(path);
  const alternates = hreflangForPath(path, noAlternate);

  let out = html;

  out = out.replace(/<html([^>]*)>/i, (_, attrs) => {
    const withoutLang = attrs.replace(/\s+lang="[^"]*"/i, "");
    return `<html lang="${lang}"${withoutLang}>`;
  });

  out = out.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttr(title)}</title>`,
  );

  out = replaceOrInsertMetaName(out, "description", description);
  out = replaceOrInsertMetaProperty(out, "og:title", title);
  out = replaceOrInsertMetaProperty(out, "og:description", description);
  out = replaceOrInsertMetaProperty(out, "og:url", canonical);
  out = replaceOrInsertMetaProperty(out, "og:type", "website");
  out = replaceOrInsertMetaProperty(out, "og:site_name", SITE_NAME);
  out = replaceOrInsertMetaName(out, "twitter:card", "summary_large_image");
  out = replaceOrInsertMetaName(out, "twitter:title", title);
  out = replaceOrInsertMetaName(out, "twitter:description", description);

  const canonTag = `<link rel="canonical" href="${escapeAttr(canonical)}" />`;
  if (/<link\s+rel="canonical"/i.test(out)) {
    out = out.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      canonTag,
    );
  } else {
    out = insertBeforeHeadClose(out, canonTag);
  }

  out = out.replace(
    /<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*/gi,
    "",
  );
  if (alternates) {
    const altTags = [
      `<link rel="alternate" hreflang="en" href="${escapeAttr(alternates.en)}" />`,
      `<link rel="alternate" hreflang="fr" href="${escapeAttr(alternates.fr)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${escapeAttr(alternates.xDefault)}" />`,
    ].join("\n  ");
    out = insertBeforeHeadClose(out, altTags);
  }

  return out;
}

export function routeToFile(route) {
  if (route === "/") return "dist/index.html";
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return join("dist", clean, "index.html");
}

export function runNodeFallback() {
  const shellPath = "dist/index.html";
  if (!existsSync(shellPath)) {
    throw new Error("dist/index.html missing; run vite build first");
  }
  const shell = readFileSync(shellPath, "utf8");

  for (const meta of ROUTE_SEO) {
    const html = applyRouteHeadToHtml(shell, meta);
    const out = routeToFile(meta.path);
    if (meta.path !== "/") {
      mkdirSync(dirname(out), { recursive: true });
    }
    writeFileSync(out, html, "utf8");
    console.log("Fallback head rewrite", meta.path, "->", out);
  }
}
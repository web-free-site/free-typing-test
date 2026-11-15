import { writeFileSync } from "node:fs";
import { PRERENDER_ROUTES } from "./routes.mjs";
const GUIDE_ROUTES = ["/how-to-improve-typing-speed", "/what-is-a-good-typing-speed"];

const SITE = "https://free-typing-test.web-free.site";
const today = new Date().toISOString().slice(0, 10);

function urlEntry(route, { frHref = true } = {}) {
  const loc =
    route === "/" ? `${SITE}/` : `${SITE}${route.endsWith("/") ? route : route}`;
  const en = loc;
  const fr =
    route === "/"
      ? `${SITE}/fr/`
      : route.startsWith("/fr")
        ? loc
        : route === "/test-de-dactylographie-gratuit-azerty"
          ? loc
          : `${SITE}/fr${route}`;
  const frLine = frHref
    ? `    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>`
    : `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`;
  return `  <url>
    <loc>${en}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
${frLine}
  </url>`;
}
const urls = [
  ...PRERENDER_ROUTES.map((route) => urlEntry(route)),
  ...GUIDE_ROUTES.map((route) => urlEntry(route, { frHref: false })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml, "utf8");
console.log("Wrote public/sitemap.xml");
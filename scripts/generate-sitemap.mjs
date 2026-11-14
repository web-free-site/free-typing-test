import { writeFileSync } from "node:fs";
import { PRERENDER_ROUTES } from "./routes.mjs";

const SITE = "https://free-typing-test.web-free.site";
const today = new Date().toISOString().slice(0, 10);

const urls = PRERENDER_ROUTES.map((route) => {
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
  return `  <url>
    <loc>${en}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml, "utf8");
console.log("Wrote public/sitemap.xml");
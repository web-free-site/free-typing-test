import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "../../config/site";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href, extras = {}) {
  if (!href) return;
  const selector = Object.entries(extras).reduce(
    (s, [k, v]) => `${s}[${k}="${v}"]`,
    `link[rel="${rel}"]`,
  );
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    Object.entries(extras).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function Seo({
  title,
  description,
  path = "/",
  lang = "en",
  noAlternate = false,
  faqSchema = null,
}) {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`.replace(/\/$/, "") || SITE_URL;
  const canonicalWithSlash =
    path.endsWith("/") && path !== "/" ? `${canonical}/` : path === "/" ? `${SITE_URL}/` : canonical;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalWithSlash);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    upsertLink("canonical", canonicalWithSlash);

    if (!noAlternate) {
      const enPath = path.startsWith("/fr") ? path.replace(/^\/fr/, "") || "/" : path;
      const frPath = enPath === "/" ? "/fr/" : `/fr${enPath}`;
      upsertLink("alternate", `${SITE_URL}${enPath === "/" ? "/" : enPath}`, {
        hreflang: "en",
      });
      upsertLink("alternate", `${SITE_URL}${frPath}`, { hreflang: "fr" });
      upsertLink("alternate", `${SITE_URL}/`, { hreflang: "x-default" });
    }
  }, [title, description, path, lang, canonicalWithSlash, noAlternate]);

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    inLanguage: ["en", "fr", "sw"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
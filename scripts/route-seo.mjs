/** Single source of truth for prerender head tags (matches Seo.jsx + page props). */
export const SITE_URL = "https://free-typing-test.web-free.site";
export const SITE_NAME = "Free Typing Test";

/** @typedef {{ path: string, title: string, description: string, lang?: string, noAlternate?: boolean }} RouteSeo */

/** @type {RouteSeo[]} */
export const ROUTE_SEO = [
  {
    path: "/",
    title: "Free Typing Test — WPM, accuracy & free PNG certificate",
    description:
      "Take a free online typing test in English, French (AZERTY), or Swahili. Live WPM, accuracy stats, and a downloadable PNG certificate.",
    lang: "en",
  },
  {
    path: "/fr/",
    title: "Test de dactylographie gratuit | Free Typing Test",
    description:
      "Testez votre vitesse de frappe en français (AZERTY), téléchargez un certificat PNG gratuit et entraînez-vous en anglais ou en swahili.",
    lang: "fr",
  },
  {
    path: "/app/taketypingtest",
    title: "Take typing test | Free Typing Test",
    description:
      "Start a timed or word-count typing test with live WPM and accuracy. English, French, Swahili, AZERTY, and free PNG certificate.",
    lang: "en",
  },
  {
    path: "/stats",
    title: "Stats | Free Typing Test",
    description:
      "View your local typing test history, average WPM, accuracy, and best scores. Stored only in your browser.",
    lang: "en",
  },
  {
    path: "/about",
    title: "About | Free Typing Test",
    description:
      "About Free Typing Test, a free in-browser WPM test based on the MIT-licensed RhythmKey project. No sign-up; results stay on your device.",
    lang: "en",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Free Typing Test",
    description:
      "Free Typing Test runs entirely in your browser. No accounts, no server-side typing data, and no third-party analytics keys.",
    lang: "en",
  },
  {
    path: "/terms",
    title: "Terms of Use | Free Typing Test",
    description:
      "Terms for using Free Typing Test: free in-browser typing practice, informal PNG certificates, and advertising-supported hosting.",
    lang: "en",
  },
  {
    path: "/contact",
    title: "Contact | Free Typing Test",
    description:
      "Contact the Free Typing Test project via the web-free.site hub or upstream RhythmKey repository.",
    lang: "en",
  },
  {
    path: "/faq",
    title: "FAQ | Free Typing Test",
    description:
      "Frequently asked questions about WPM, accuracy, languages, AZERTY, certificates, and privacy on Free Typing Test.",
    lang: "en",
  },
  {
    path: "/how-to",
    title: "How to Use Free Typing Test",
    description:
      "Step-by-step guide: pick English, French (with or without accents), or Swahili, choose AZERTY or QWERTY, finish a test, and download your PNG certificate.",
    lang: "en",
  },
  {
    path: "/typing-test-with-certificate",
    title: "Typing Test with Certificate — Free PNG Download",
    description:
      "Take a free online typing test and download a PNG certificate with your WPM, accuracy, and date. Informal souvenir, not an official diploma.",
    lang: "en",
  },
  {
    path: "/test-de-dactylographie-gratuit-azerty",
    title: "Test de dactylographie gratuit AZERTY",
    description:
      "Test de dactylographie gratuit en ligne avec clavier AZERTY, listes françaises avec ou sans accents, et certificat PNG.",
    lang: "fr",
  },
];

/** Mirrors Seo.jsx canonicalWithSlash (matches sitemap loc URLs). */
export function canonicalForPath(path) {
  const canonical =
    `${SITE_URL}${path === "/" ? "" : path}`.replace(/\/$/, "") || SITE_URL;
  if (path.endsWith("/") && path !== "/") return `${canonical}/`;
  if (path === "/") return `${SITE_URL}/`;
  return canonical;
}

/** Mirrors Seo.jsx hreflang links. */
export function hreflangForPath(path, noAlternate = false) {
  if (noAlternate) return null;
  const enPath = path.startsWith("/fr")
    ? path.replace(/^\/fr/, "") || "/"
    : path;
  const frPath = enPath === "/" ? "/fr/" : `/fr${enPath}`;
  return {
    en: `${SITE_URL}${enPath === "/" ? "/" : enPath}`,
    fr: `${SITE_URL}${frPath}`,
    xDefault: `${SITE_URL}/`,
  };
}

export const HOMEPAGE_CANONICAL = `${SITE_URL}/`;
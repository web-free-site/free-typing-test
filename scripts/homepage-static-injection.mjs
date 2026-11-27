/**
 * Injects crawlable homepage markup into dist/index.html when the SPA shell is empty
 * (Node prerender fallback). Playwright builds with content already in #root skip body inject.
 */
import { homepageFaqSchema, HOMEPAGE_FAQ } from "../src/data/homepageFaq.js";

const HUB_URL = "https://web-free.site/?ref=free-typing-test";
const GUIDE_URL =
  "https://web-free.site/guides/typing-speed-test-wpm-certificate/?ref=free-typing-test";

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHomepageStaticBody() {
  const faqBlocks = HOMEPAGE_FAQ.map(
    ({ q, a }) =>
      `<div><dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd></div>`,
  ).join("\n          ");

  return `<main class="wf-static-home" data-wf-prerender-fallback>
      <header>
        <h1>Free Typing Test</h1>
        <p>Track WPM and accuracy in real time, practice in English, French, or Swahili, and download a free PNG certificate when you finish.</p>
        <p><a href="/app/taketypingtest">Start Typing</a></p>
      </header>
      <section aria-labelledby="homepage-seo-title">
        <h2 id="homepage-seo-title">Free online typing test: WPM, accuracy, and certificate</h2>
        <p>This <strong>free typing test</strong> measures how fast and accurately you type while you work through realistic word lists, short timed rounds, or longer story passages. Words per minute (WPM) and accuracy update live at the top of the screen, so you can see whether you are warming up, holding steady, or rushing and making mistakes. When you finish, you can review a clear results summary and optionally download a PNG certificate that records your score for your own files or résumé attachments.</p>
        <p>The tool is built for everyday practice: students preparing for exams, job seekers who want a concrete WPM number for applications, remote workers who type all day, and polyglots who want separate drills in more than one language. You can run a quick thirty-second sprint between meetings, a five-minute endurance check, or a word-count challenge when you have a few spare minutes. Because everything runs client-side, you can repeat tests as often as you like without waiting on uploads or queues.</p>
        <h3>How to take the test</h3>
        <ol>
          <li>Click <a href="/app/taketypingtest">Start Typing</a> or try the animated demo above to see how mistake highlighting and live stats behave.</li>
          <li>Choose a mode: timed test (for example 30, 60, or 120 seconds), fixed word count, story length, or your own custom text for interview snippets or code comments.</li>
          <li>Pick a language and keyboard layout. English and Swahili use familiar QWERTY-style lists; French practice supports AZERTY-friendly words with or without accents, so you are not fighting the wrong vowels while you learn speed.</li>
          <li>Optional toggles add punctuation, numbers, or symbols when you are ready for harder material, and difficulty controls how challenging the generated text feels.</li>
          <li>Start typing as soon as the cursor appears. The timer or word counter runs only after your first keystroke; pause or restart from the on-screen controls if you need a break.</li>
          <li>When the test ends, read your WPM, accuracy, and character breakdown, then download the PNG certificate or run another round to beat your personal best.</li>
        </ol>
        <h3>Privacy and in-browser processing</h3>
        <p>Free Typing Test is designed to work entirely in your browser tab. The random words and stories are generated on your device; your keystrokes are compared to the prompt locally to calculate mistakes and WPM. History and preferences are stored in your browser&apos;s local storage so you can track progress over time, but that data is not synced to our servers as part of the test itself. You do not need an email address or password. Clear site data in your browser if you want to wipe stored scores on a shared computer.</p>
        <h3>Who uses this typing speed test?</h3>
        <p>High school and university students use timed drills before essay-heavy terms. Customer support agents and medical scribes benchmark themselves before shift work. Developers test prose speed separately from IDE shortcuts. French and Swahili learners switch languages in settings to keep finger memory aligned with each keyboard. Freelancers attach the informal PNG certificate to proposals when a client asks for a typing sample. None of these scenarios require installing desktop software or uploading sensitive documents—only consistent, short practice when you have a moment.</p>
        <p>For more free utilities that run in the tab—PDF tools, counters, converters, and similar browser apps—visit <a href="${HUB_URL}">web-free.site</a>. If you prefer a step-by-step walkthrough focused on WPM goals and certificate download, read the companion <a href="${GUIDE_URL}">typing speed test guide</a> on the same hub.</p>
        <h3>Frequently asked questions</h3>
        <dl>
          ${faqBlocks}
        </dl>
      </section>
    </main>`;
}

function insertBeforeHeadClose(html, snippet) {
  const idx = html.toLowerCase().lastIndexOf("</head>");
  if (idx === -1) return html + snippet;
  return html.slice(0, idx) + snippet + "\n" + html.slice(idx);
}

function extractRootInner(html) {
  const m = html.match(/<div id="root">([\s\S]*?)<\/div>/i);
  return m ? m[1].trim() : null;
}

export function applyHomepageStaticInjection(html) {
  let out = html;

  if (!out.includes('id="homepage-faq-ld"')) {
    const ld = `<script type="application/ld+json" id="homepage-faq-ld">${JSON.stringify(homepageFaqSchema)}</script>`;
    out = insertBeforeHeadClose(out, ld);
  }

  const rootInner = extractRootInner(out);
  const h1InRoot = rootInner
    ? (rootInner.match(/<h1\b/gi) || []).length
    : 0;

  if (h1InRoot === 0) {
    const body = buildHomepageStaticBody();
    const emptyRoot = /<div id="root">\s*<\/div>/i;
    if (emptyRoot.test(out)) {
      out = out.replace(emptyRoot, `<div id="root">\n${body}\n  </div>`);
    } else if (rootInner !== null) {
      out = out.replace(
        /<div id="root">[\s\S]*?<\/div>/i,
        `<div id="root">\n${body}\n  </div>`,
      );
    }
  }

  return out;
}

export function countH1(html) {
  return (html.match(/<h1\b/gi) || []).length;
}
import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { HOMEPAGE_FAQ } from "../../data/homepageFaq";
import { ui } from "../landing/utils";

const HUB_URL = "https://web-free.site/?ref=free-typing-test";
const GUIDE_URL =
  "https://web-free.site/guides/typing-speed-test-wpm-certificate/?ref=free-typing-test";

export default function HomepageSeoSection({ isLight }) {
  const u = ui(isLight);

  return (
    <section
      className={`border-b ${u.line} px-4 sm:px-10 py-14 sm:py-20`}
      aria-labelledby="homepage-seo-title"
    >
      <div
        className={`max-w-3xl mx-auto text-sm sm:text-base leading-relaxed ${u.muted} space-y-6`}
      >
        <h2
          id="homepage-seo-title"
          className={`font-display text-2xl sm:text-3xl font-semibold ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
        >
          Free online typing test: WPM, accuracy, and certificate
        </h2>

        <p>
          This <strong className={isLight ? "text-zinc-800" : "text-zinc-200"}>free typing test</strong>{" "}
          measures how fast and accurately you type while you work through realistic word lists,
          short timed rounds, or longer story passages. Words per minute (WPM) and accuracy update
          live at the top of the screen, so you can see whether you are warming up, holding steady,
          or rushing and making mistakes. When you finish, you can review a clear results summary
          and optionally download a PNG certificate that records your score for your own files or
          résumé attachments.
        </p>

        <p>
          The tool is built for everyday practice: students preparing for exams, job seekers who want
          a concrete WPM number for applications, remote workers who type all day, and polyglots who
          want separate drills in more than one language. You can run a quick thirty-second sprint
          between meetings, a five-minute endurance check, or a word-count challenge when you have a
          few spare minutes. Because everything runs client-side, you can repeat tests as often as you
          like without waiting on uploads or queues.
        </p>

        <h3
          className={`font-display text-xl font-semibold pt-2 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
        >
          How to take the test
        </h3>
        <ol className="list-decimal pl-5 space-y-2 marker:font-medium">
          <li>
            Click <TransitionLink to="/app/taketypingtest" className="underline text-[#9b72ff]">Start Typing</TransitionLink> or try the animated demo above to see how mistake highlighting and live stats behave.
          </li>
          <li>
            Choose a mode: timed test (for example 30, 60, or 120 seconds), fixed word count, story length, or your own custom text for interview snippets or code comments.
          </li>
          <li>
            Pick a language and keyboard layout. English and Swahili use familiar QWERTY-style lists; French practice supports AZERTY-friendly words with or without accents, so you are not fighting the wrong vowels while you learn speed.
          </li>
          <li>
            Optional toggles add punctuation, numbers, or symbols when you are ready for harder material, and difficulty controls how challenging the generated text feels.
          </li>
          <li>
            Start typing as soon as the cursor appears. The timer or word counter runs only after your first keystroke; pause or restart from the on-screen controls if you need a break.
          </li>
          <li>
            When the test ends, read your WPM, accuracy, and character breakdown, then download the PNG certificate or run another round to beat your personal best.
          </li>
        </ol>

        <h3
          className={`font-display text-xl font-semibold pt-2 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
        >
          Privacy and in-browser processing
        </h3>
        <p>
          Free Typing Test is designed to work entirely in your browser tab. The random words and
          stories are generated on your device; your keystrokes are compared to the prompt locally to
          calculate mistakes and WPM. History and preferences are stored in your browser&apos;s local
          storage so you can track progress over time, but that data is not synced to our servers as
          part of the test itself. You do not need an email address or password. Clear site data in
          your browser if you want to wipe stored scores on a shared computer.
        </p>

        <h3
          className={`font-display text-xl font-semibold pt-2 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
        >
          Who uses this typing speed test?
        </h3>
        <p>
          High school and university students use timed drills before essay-heavy terms. Customer
          support agents and medical scribes benchmark themselves before shift work. Developers test
          prose speed separately from IDE shortcuts. French and Swahili learners switch languages in
          settings to keep finger memory aligned with each keyboard. Freelancers attach the informal
          PNG certificate to proposals when a client asks for a typing sample. None of these scenarios
          require installing desktop software or uploading sensitive documents—only consistent,
          short practice when you have a moment.
        </p>

        <p>
          For more free utilities that run in the tab—PDF tools, counters, converters, and similar
          browser apps—visit{" "}
          <a href={HUB_URL} className="underline text-[#9b72ff]">
            web-free.site
          </a>
          . If you prefer a step-by-step walkthrough focused on WPM goals and certificate download,
          read the companion{" "}
          <a href={GUIDE_URL} className="underline text-[#9b72ff]">
            typing speed test guide
          </a>{" "}
          on the same hub.
        </p>

        <h3
          className={`font-display text-xl font-semibold pt-4 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
        >
          Frequently asked questions
        </h3>
        <dl className="space-y-5">
          {HOMEPAGE_FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt
                className={`font-semibold mb-1 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}
              >
                {q}
              </dt>
              <dd>{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
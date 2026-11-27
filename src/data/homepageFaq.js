export const HOMEPAGE_FAQ = [
  {
    q: "What does WPM mean on a typing test?",
    a: "WPM (words per minute) estimates how fast you type. This test uses the common convention of five characters per word, so your live WPM updates as you type and reflects both speed and steady rhythm.",
  },
  {
    q: "Do I need to sign up or install anything?",
    a: "No. Open the page, click Start Typing, and the test runs in your web browser. There is no account, download, or plugin required.",
  },
  {
    q: "Is my typing data sent to a server?",
    a: "Your keystrokes and practice text stay on your device while you test. Saved scores and settings use browser storage locally; we do not upload your typing content to our servers for scoring.",
  },
  {
    q: "Which languages and keyboard layouts are supported?",
    a: "You can practice in English, French (including AZERTY-focused word lists), and Swahili. Settings let you switch layout, difficulty, punctuation, numbers, and symbols without leaving the page.",
  },
  {
    q: "Is the PNG certificate an official qualification?",
    a: "The downloadable certificate is a fun record of your session—WPM, accuracy, and date—not a regulated diploma. Employers and schools treat it as informal proof of practice, not an accredited credential.",
  },
];

export const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
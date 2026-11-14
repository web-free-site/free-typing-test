import ContentPage from "./content/ContentPage";

const FAQ = [
  {
    q: "Is Free Typing Test really free?",
    a: "Yes. It runs in your browser with no sign-up. Ads support hosting.",
  },
  {
    q: "What languages are supported?",
    a: "English, French (with accents), French without accents for AZERTY practice, and Swahili word lists, plus custom text.",
  },
  {
    q: "Is the PNG certificate official?",
    a: "No. It is a fun record of your session, not a regulated diploma.",
  },
  {
    q: "Do you store my typing data?",
    a: "Scores and settings stay in your browser locally unless you clear site data.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FaqPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="FAQ | Free Typing Test"
      description="Frequently asked questions about WPM, accuracy, languages, AZERTY, certificates, and privacy on Free Typing Test."
      path="/faq"
      faqSchema={faqSchema}
    >
      <dl className="space-y-6">
        {FAQ.map(({ q, a }) => (
          <div key={q}>
            <dt className="font-semibold text-base mb-1">{q}</dt>
            <dd className={isLight ? "text-zinc-600" : "text-zinc-400"}>{a}</dd>
          </div>
        ))}
      </dl>
    </ContentPage>
  );
}
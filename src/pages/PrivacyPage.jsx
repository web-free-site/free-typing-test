import ContentPage from "./content/ContentPage";

export default function PrivacyPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="Privacy Policy | Free Typing Test"
      description="Free Typing Test runs entirely in your browser. No accounts, no server-side typing data, and no third-party analytics keys."
      path="/privacy"
    >
      <p>
        Free Typing Test is a client-side web application. Your typing sessions,
        settings, and local statistics are stored only in your browser (local
        storage). We do not operate a backend database for test content or scores.
      </p>
      <p>
        Third-party advertising (Adsterra) may set cookies or use similar
        technologies when you load ad scripts. Those providers have their own
        privacy policies. We do not use Google AdSense on this site.
      </p>
      <p>
        Contact us at the email on the Contact page if you have privacy questions.
      </p>
    </ContentPage>
  );
}
import ContentPage from "./content/ContentPage";
import { TransitionLink } from "../components/layout/PageTransition";

export default function TypingTestCertificatePage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="Typing Test with Certificate — Free PNG Download"
      description="Take a free online typing test and download a PNG certificate with your WPM, accuracy, and date. Informal souvenir, not an official diploma."
      path="/typing-test-with-certificate"
    >
      <p>
        After any timed or word-count test, Free Typing Test lets you export a PNG
        certificate you can share with friends or keep for motivation. Enter your
        name on the results screen and download—no email required.
      </p>
      <p>
        Looking for French AZERTY practice? See our{" "}
        <TransitionLink to="/test-de-dactylographie-gratuit-azerty" className="text-[#9b72ff]">
          test de dactylographie gratuit
        </TransitionLink>{" "}
        page or start a test now.
      </p>
      <TransitionLink
        to="/app/taketypingtest"
        className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#9b72ff] text-white text-sm font-medium"
      >
        Start typing test
      </TransitionLink>
    </ContentPage>
  );
}
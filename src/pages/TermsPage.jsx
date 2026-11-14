import ContentPage from "./content/ContentPage";

export default function TermsPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="Terms of Use | Free Typing Test"
      description="Terms for using Free Typing Test: free in-browser typing practice, informal PNG certificates, and advertising-supported hosting."
      path="/terms"
    >
      <p>
        Free Typing Test is provided as-is for personal practice. PNG certificates
        are souvenirs of your session results—they are not official diplomas or
        professional certifications.
      </p>
      <p>
        Do not attempt to disrupt the service, scrape ad units, or misrepresent
        results. The underlying typing engine is open source (RhythmKey, MIT).
      </p>
      <p>Ads help keep the tool free. By using the site you acknowledge sponsored links and banners.</p>
    </ContentPage>
  );
}
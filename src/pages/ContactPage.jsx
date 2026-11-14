import ContentPage from "./content/ContentPage";

export default function ContactPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="Contact | Free Typing Test"
      description="Contact the Free Typing Test project via the web-free.site hub or upstream RhythmKey repository."
      path="/contact"
    >
      <p>
        This tool is part of the{" "}
        <a href="https://web-free.site" className="text-[#9b72ff] hover:underline">
          web-free.site
        </a>{" "}
        family of free browser utilities.
      </p>
      <p>
        For bugs in the original typing engine, open an issue on the{" "}
        <a
          href="https://github.com/bilalmlkdev/rhythmkey"
          className="text-[#9b72ff] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          RhythmKey
        </a>{" "}
        repository. For site-specific feedback about ads or hosting, use the
        contact options listed on web-free.site.
      </p>
    </ContentPage>
  );
}
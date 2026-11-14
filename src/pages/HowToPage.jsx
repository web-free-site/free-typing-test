import ContentPage from "./content/ContentPage";

export default function HowToPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="How to Use Free Typing Test"
      description="Step-by-step guide: pick English, French (with or without accents), or Swahili, choose AZERTY or QWERTY, finish a test, and download your PNG certificate."
      path="/how-to"
    >
      <ol className="list-decimal list-inside space-y-3">
        <li>Open Start Typing and pick a mode (time, words, quotes, or custom text).</li>
        <li>
          In Settings, choose your language: English, French (accents), French (no
          accents), or Swahili. For French keyboards, select AZERTY layout.
        </li>
        <li>Type the prompt. Live WPM and accuracy update as you go.</li>
        <li>When you finish, review the chart and stats on the results screen.</li>
        <li>
          Use Download → Certificate (PNG) to save an informal souvenir with your
          name, WPM, accuracy, and date.
        </li>
      </ol>
    </ContentPage>
  );
}
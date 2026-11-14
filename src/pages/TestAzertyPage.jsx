import ContentPage from "./content/ContentPage";
import { TransitionLink } from "../components/layout/PageTransition";

export default function TestAzertyPage({ isLight }) {
  return (
    <ContentPage
      isLight={isLight}
      title="Test de dactylographie gratuit AZERTY"
      description="Test de dactylographie gratuit en ligne avec clavier AZERTY, listes françaises avec ou sans accents, et certificat PNG."
      path="/test-de-dactylographie-gratuit-azerty"
      lang="fr"
    >
      <p>
        Entraînez votre vitesse en français sur un clavier AZERTY. Choisissez les
        mots avec accents pour une orthographe réaliste, ou la liste sans accents
        pour vous concentrer sur la vitesse des touches.
      </p>
      <p>
        À la fin du test, téléchargez un certificat PNG gratuit (souvenir
        personnel, pas un diplôme officiel).
      </p>
      <TransitionLink
        to="/app/taketypingtest?lang=fr&layout=azerty"
        className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#9b72ff] text-white text-sm font-medium"
      >
        Commencer le test
      </TransitionLink>
    </ContentPage>
  );
}
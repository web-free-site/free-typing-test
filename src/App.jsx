import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { PageTransitionProvider } from "./components/layout/PageTransition";
import RouteLoader from "./components/layout/RouteLoader";
import {
  loadLanding,
  loadFrenchLanding,
  loadMain,
  loadStats,
  loadAbout,
  loadNotFound,
  loadPrivacy,
  loadTerms,
  loadContact,
  loadFaq,
  loadHowTo,
  loadCertificatePage,
  loadAzertyPage,
} from "./routeChunks";

const LandingPage = lazy(loadLanding);
const FrenchLandingPage = lazy(loadFrenchLanding);
const MainPage = lazy(loadMain);
const StatsPage = lazy(loadStats);
const AboutPage = lazy(loadAbout);
const NotFoundPage = lazy(loadNotFound);
const PrivacyPage = lazy(loadPrivacy);
const TermsPage = lazy(loadTerms);
const ContactPage = lazy(loadContact);
const FaqPage = lazy(loadFaq);
const HowToPage = lazy(loadHowTo);
const TypingTestCertificatePage = lazy(loadCertificatePage);
const TestAzertyPage = lazy(loadAzertyPage);

export default function App() {
  const { isLight, theme, setTheme } = useTheme();

  return (
    <PageTransitionProvider isLight={isLight}>
      <Suspense fallback={<RouteLoader isLight={isLight} />}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isLight={isLight}
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
          <Route
            path="/fr/"
            element={
              <FrenchLandingPage
                isLight={isLight}
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
          <Route
            path="/app/taketypingtest"
            element={
              <MainPage isLight={isLight} theme={theme} setTheme={setTheme} />
            }
          />
          <Route path="/stats" element={<StatsPage isLight={isLight} />} />
          <Route path="/about" element={<AboutPage isLight={isLight} />} />
          <Route path="/privacy" element={<PrivacyPage isLight={isLight} />} />
          <Route path="/terms" element={<TermsPage isLight={isLight} />} />
          <Route path="/contact" element={<ContactPage isLight={isLight} />} />
          <Route path="/faq" element={<FaqPage isLight={isLight} />} />
          <Route path="/how-to" element={<HowToPage isLight={isLight} />} />
          <Route
            path="/typing-test-with-certificate"
            element={<TypingTestCertificatePage isLight={isLight} />}
          />
          <Route
            path="/test-de-dactylographie-gratuit-azerty"
            element={<TestAzertyPage isLight={isLight} />}
          />
          <Route path="*" element={<NotFoundPage isLight={isLight} />} />
        </Routes>
      </Suspense>
    </PageTransitionProvider>
  );
}
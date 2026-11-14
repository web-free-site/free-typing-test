export const loadLanding = () => import("./pages/LandingPage");
export const loadFrenchLanding = () => import("./pages/FrenchLandingPage");
export const loadMain = () => import("./pages/MainPage");
export const loadStats = () => import("./pages/StatsPage");
export const loadAbout = () => import("./pages/AboutPage");
export const loadNotFound = () => import("./pages/NotFoundPage");
export const loadPrivacy = () => import("./pages/PrivacyPage");
export const loadTerms = () => import("./pages/TermsPage");
export const loadContact = () => import("./pages/ContactPage");
export const loadFaq = () => import("./pages/FaqPage");
export const loadHowTo = () => import("./pages/HowToPage");
export const loadCertificatePage = () =>
  import("./pages/TypingTestCertificatePage");
export const loadAzertyPage = () => import("./pages/TestAzertyPage");

export const ROUTE_PRELOADS = {
  "/": loadLanding,
  "/fr/": loadFrenchLanding,
  "/app/taketypingtest": loadMain,
  "/stats": loadStats,
  "/about": loadAbout,
};
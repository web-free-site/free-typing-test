import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import Seo from "../components/seo/Seo";
import AdShell from "../components/ads/AdShell";
import { ui } from "../components/landing/utils";

export default function FrenchLandingPage({ isLight, setTheme }) {
  const u = ui(isLight);
  return (
    <AdShell>
      <Seo
        lang="fr"
        path="/fr/"
        title="Test de dactylographie gratuit | Free Typing Test"
        description="Testez votre vitesse de frappe en français (AZERTY), téléchargez un certificat PNG gratuit et entraînez-vous en anglais ou en swahili."
      />
      <div className={`min-h-screen font-grotesk ${u.page}`}>
        <Header isLight={isLight} setTheme={setTheme} locale="fr" />
        <div
          className={`max-w-[1120px] mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col border-x ${u.line}`}
        >
          <section className={`border-b ${u.line} px-4 sm:px-10 pt-14 sm:pt-20 pb-10 text-center`}>
            <h1 className="font-display font-bold text-3xl sm:text-5xl mb-4">
              Test de dactylographie gratuit
            </h1>
            <p className={`max-w-xl mx-auto text-sm sm:text-base ${u.muted}`}>
              WPM en direct, listes françaises avec ou sans accents, clavier AZERTY,
              certificat PNG gratuit — 100 % dans le navigateur.
            </p>
          </section>
          <Hero isLight={isLight} locale="fr" />
          <Features isLight={isLight} locale="fr" />
          <HowItWorks isLight={isLight} locale="fr" />
          <CTASection isLight={isLight} locale="fr" />
          <Footer isLight={isLight} locale="fr" />
        </div>
      </div>
    </AdShell>
  );
}
import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import Seo from "../components/seo/Seo";
import HomepageSeoSection from "../components/seo/HomepageSeoSection";
import AdShell from "../components/ads/AdShell";
import { ui } from "../components/landing/utils";
import { homepageFaqSchema } from "../data/homepageFaq";

export default function LandingPage({ isLight, setTheme }) {
  const u = ui(isLight);
  return (
    <AdShell>
      <Seo
        path="/"
        title="Free Typing Test — WPM, accuracy & free PNG certificate"
        description="Free typing test in your browser: live WPM and accuracy in English, French (AZERTY), or Swahili. No sign-up; download a PNG certificate when you finish."
        faqSchema={homepageFaqSchema}
      />
      <div className={`min-h-screen font-grotesk ${u.page}`}>
        <Header isLight={isLight} setTheme={setTheme} />
        <div
          className={`max-w-[1120px] mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col border-x ${u.line}`}
        >
          <Hero isLight={isLight} />
          <HomepageSeoSection isLight={isLight} />
          <Features isLight={isLight} />
          <HowItWorks isLight={isLight} />
          <CTASection isLight={isLight} />
          <Footer isLight={isLight} />
        </div>
      </div>
    </AdShell>
  );
}

import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import TypingDemo from "./TypingDemo";
import { ui } from "./utils";

const FACTS_EN = ["Free & open source", "No account", "EN / FR / SW", "PNG certificate"];
const FACTS_FR = ["Gratuit", "Sans compte", "AZERTY", "Certificat PNG"];

export default function Hero({ isLight, locale = "en" }) {
  const u = ui(isLight);
  const fr = locale === "fr";
  const facts = fr ? FACTS_FR : FACTS_EN;

  return (
    <section className={`border-b ${u.line} px-4 sm:px-10 pt-14 sm:pt-25`}>
      <div className="flex flex-col items-center text-center">
        {!fr && (
        <h1 className="font-display font-bold tracking-normal text-[2.3rem] sm:text-[4.4rem] leading-[1.08]">
          Free typing test,
          <br />
          beat your <span className={u.accent}>record</span>.
        </h1>
        )}

        <p className={`mt-6 max-w-[520px] text-sm sm:text-base leading-relaxed ${u.muted}`}>
          {fr
            ? "Mesurez votre vitesse, corrigez vos erreurs et téléchargez un certificat PNG — tout dans le navigateur."
            : "Track WPM and accuracy in real time, practice in English, French, or Swahili, and download a free PNG certificate when you finish."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TransitionLink
            to="/app/taketypingtest"
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.btn}`}
          >
            {fr ? "Commencer" : "Start Typing"}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </TransitionLink>
          <a
            href="https://github.com/bilalmlkdev/rhythmkey.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.ghost}`}
          >
            <FiGithub size={14} />
            View source
          </a>
        </div>

        <ul className={`mt-7 mb-12 sm:mb-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 ${u.label}`}>
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <TypingDemo isLight={isLight} />
    </section>
  );
}

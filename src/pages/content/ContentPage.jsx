import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Seo from "../../components/seo/Seo";
import AdShell from "../../components/ads/AdShell";
import SiteFooter from "../../components/layout/SiteFooter";

export default function ContentPage({
  isLight,
  title,
  description,
  path,
  lang = "en",
  children,
  faqSchema = null,
}) {
  return (
    <AdShell showSidebar={false} showMid={false}>
    <div
      className={`min-h-[70vh] px-4 sm:px-8 py-10 max-w-3xl mx-auto ${isLight ? "text-zinc-800" : "text-zinc-200"}`}
    >
      <Seo
        title={title}
        description={description}
        path={path}
        lang={lang}
        faqSchema={faqSchema}
      />
      <Link
        to={lang === "fr" ? "/fr/" : "/"}
        className={`inline-flex items-center gap-2 text-sm mb-6 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
      >
        <FiArrowLeft /> {lang === "fr" ? "Retour" : "Back"}
      </Link>
      <h1 className="text-3xl font-bold mb-6">{title.replace(/ \|.*/, "")}</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed">
        {children}
      </div>
      <SiteFooter isLight={isLight} />
    </div>
    </AdShell>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import {
  HUB_URL,
  UPSTREAM_AUTHOR,
  UPSTREAM_REPO,
  SMARTLINK_URL,
} from "../../config/site";

export default function SiteFooter({ isLight, compact = false }) {
  const muted = isLight ? "text-zinc-500" : "text-zinc-400";
  const link = `${muted} hover:text-[#9b72ff] transition-colors`;

  return (
    <footer
      className={`w-full text-center ${compact ? "text-[10px] py-2" : "text-xs py-6"} ${muted}`}
    >
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-2">
        <Link to="/about" className={link}>
          About
        </Link>
        <Link to="/faq" className={link}>
          FAQ
        </Link>
        <Link to="/how-to" className={link}>
          How to
        </Link>
        <Link to="/privacy" className={link}>
          Privacy
        </Link>
        <Link to="/terms" className={link}>
          Terms
        </Link>
        <Link to="/contact" className={link}>
          Contact
        </Link>
        <Link to="/fr/" className={link}>
          Français
        </Link>
        <a href={HUB_URL} className={link} rel="noopener noreferrer">
          web-free.site
        </a>
        <a
          href={SMARTLINK_URL}
          className={link}
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          Partner offers
        </a>
      </nav>
      <p>
        Free Typing Test — MIT. Based on{" "}
        <a href={UPSTREAM_REPO} className={link} target="_blank" rel="noopener noreferrer">
          RhythmKey
        </a>{" "}
        by {UPSTREAM_AUTHOR}. Not an official certification body; PNG certificates
        are informal souvenirs only.
      </p>
    </footer>
  );
}
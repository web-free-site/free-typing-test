import React from "react";

export default function AdFrame({ src, width, height, title, className = "" }) {
  if (!src || !width || !height) return null;
  return (
    <iframe
      title={title || "Advertisement"}
      src={src}
      width={width}
      height={height}
      className={`border-0 max-w-full bg-transparent ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}
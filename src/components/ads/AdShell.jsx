import React from "react";
import AdFrame from "./AdFrame";
import NativeAd from "./NativeAd";
import { SMARTLINK_URL } from "../../config/site";

function StickyMobileAd() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none sm:hidden"
      aria-hidden={false}
    >
      <div className="pointer-events-auto bg-black/40 backdrop-blur-sm rounded-t-lg overflow-hidden">
        <AdFrame
          src="/ad-frames/320x50.html"
          width={320}
          height={50}
          title="Mobile banner"
        />
      </div>
    </div>
  );
}

export default function AdShell({ children, showSidebar = true, showMid = true }) {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full flex justify-center py-2 overflow-x-auto hidden sm:flex">
        <AdFrame
          src="/ad-frames/728x90.html"
          width={728}
          height={90}
          title="Leaderboard"
        />
      </div>

      <div className="max-w-[1400px] mx-auto flex gap-3 px-2 sm:px-4">
        {showSidebar && (
          <aside className="hidden xl:flex flex-col gap-4 shrink-0 pt-2">
            <AdFrame
              src="/ad-frames/160x600.html"
              width={160}
              height={600}
              title="Skyscraper"
            />
            <AdFrame
              src="/ad-frames/160x300.html"
              width={160}
              height={300}
              title="Half page"
            />
          </aside>
        )}

        <main className="flex-1 min-w-0 pb-16 sm:pb-4">{children}</main>

        {showSidebar && (
          <aside className="hidden lg:flex flex-col gap-4 shrink-0 pt-2">
            <AdFrame
              src="/ad-frames/300x250.html"
              width={300}
              height={250}
              title="Medium rectangle"
            />
          </aside>
        )}
      </div>

      {showMid && (
        <div className="max-w-3xl mx-auto px-4 space-y-3 my-6">
          <div className="hidden sm:flex justify-center overflow-x-auto">
            <AdFrame
              src="/ad-frames/728x90.html"
              width={728}
              height={90}
              title="Mid leaderboard"
            />
          </div>
          <div className="flex justify-center overflow-x-auto">
            <AdFrame
              src="/ad-frames/468x60.html"
              width={468}
              height={60}
              title="Banner"
            />
          </div>
          <NativeAd />
        </div>
      )}

      <StickyMobileAd />

      <p className="text-center text-[10px] text-zinc-500 pb-2 px-4">
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="hover:text-zinc-400 underline-offset-2 hover:underline"
        >
          Partner offers
        </a>
      </p>
    </div>
  );
}
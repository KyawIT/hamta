"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.86 4.86 0 01-1.01-.06z" />
    </svg>
  );
}

export default function Social() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  return (
    <section
      id="social"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeIn>
          <div className="text-center mb-14 lg:mb-20">
            <SectionLabel className="mb-5 justify-center w-fit mx-auto">Folgt uns</SectionLabel>
            <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#e5e2e1" }}>
              Täglich frisch auf{" "}
              <em style={{ fontStyle: "italic", color: "#f2ca50" }}>Instagram</em>
            </h2>
            <p className="text-base" style={{ color: "#4a4640" }}>
              Einblicke in unsere Küche, neue Gerichte und das tägliche Leben im Hamta.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Instagram Column */}
          <FadeIn direction="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span style={{ color: "#f2ca50" }}>
                  <InstagramIcon size={18} />
                </span>
                <span
                  className="text-sm font-semibold tracking-widest uppercase"
                  style={{ color: "#c8c6c5", letterSpacing: "0.1em" }}
                >
                  Instagram
                </span>
              </div>

              <div
                className="w-full overflow-hidden"
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "0.125rem",
                  padding: "2rem",
                }}
              >
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#2a2a2a", color: "#f2ca50" }}
                  >
                    <InstagramIcon size={28} />
                  </div>
                  <p
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
                  >
                    @hamtarestaurant1
                  </p>
                  <p className="text-sm mb-6" style={{ color: "#4a4640" }}>
                    Folgt uns auf Instagram für täglich frische Einblicke in unsere Küche.
                  </p>
                  <a
                    href="https://www.instagram.com/hamtarestaurant1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex"
                  >
                    <ExternalLink size={14} strokeWidth={2.5} />
                    Profil besuchen
                  </a>
                </div>
              </div>

              {/* Official Instagram embed */}
              <div className="mt-4">
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="https://www.instagram.com/hamtarestaurant1/"
                  data-instgrm-version="14"
                  style={{
                    background: "#1e1e1e",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    maxWidth: "100%",
                    width: "100%",
                    minWidth: "unset",
                  }}
                />
              </div>
            </div>
          </FadeIn>

          {/* TikTok Column */}
          <FadeIn direction="right" delay={100}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span style={{ color: "#f2ca50" }}>
                  <TikTokIcon size={16} />
                </span>
                <span
                  className="text-sm font-semibold tracking-widest uppercase"
                  style={{ color: "#c8c6c5", letterSpacing: "0.1em" }}
                >
                  TikTok
                </span>
              </div>

              <div
                className="w-full"
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "0.125rem",
                  padding: "2rem",
                }}
              >
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "#2a2a2a", color: "#f2ca50" }}
                  >
                    <TikTokIcon size={28} />
                  </div>
                  <p
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
                  >
                    @hamta.restaurant
                  </p>
                  <p className="text-sm mb-6" style={{ color: "#4a4640" }}>
                    Schaut euch unsere Videos auf TikTok an – Rezepte, Küchenmomenten und mehr.
                  </p>
                  <a
                    href="https://www.tiktok.com/@hamta.restaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex"
                  >
                    <ExternalLink size={14} strokeWidth={2.5} />
                    TikTok besuchen
                  </a>
                </div>
              </div>

              {/* TikTok embed */}
              <div className="mt-4 flex justify-center">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@hamta.restaurant"
                  data-unique-id="hamta.restaurant"
                  data-embed-type="creator"
                  style={{ maxWidth: "100%", minWidth: "288px" }}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom links */}
        <FadeIn delay={200} className="mt-16 text-center">
          <p className="text-sm mb-5" style={{ color: "#4a4640" }}>
            Bleibt auf dem Laufenden – folgt uns auf unseren Kanälen
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/hamtarestaurant1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-150"
              style={{ color: "#99907c", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907c")}
            >
              <InstagramIcon size={13} />
              Instagram
            </a>
            <span style={{ color: "#2a2a2a" }}>·</span>
            <a
              href="https://www.tiktok.com/@hamta.restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-150"
              style={{ color: "#99907c", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907c")}
            >
              <TikTokIcon size={13} />
              TikTok
            </a>
          </div>
        </FadeIn>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </section>
  );
}

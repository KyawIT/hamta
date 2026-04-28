"use client";

import Image from "next/image";
import { ChevronDown, Phone, UtensilsCrossed } from "lucide-react";

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    document.getElementById("ueber-uns")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="start"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/foods/food-1.jpg"
          alt="Hamta Restaurant – Persische Küche in Linz"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.45)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(19,19,19,0.35) 0%, rgba(19,19,19,0.55) 40%, rgba(19,19,19,0.88) 75%, #131313 100%)",
          }}
        />
        {/* Subtle left vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(19,19,19,0.6) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-2xl">
          {/* Label */}
          <div
            className="flex items-center gap-3 mb-7 opacity-0"
            style={{ animation: "fadeInUp 0.6s ease 0.2s forwards" }}
          >
            <span className="section-label">Persische &amp; Afghane Küche · Linz · Urfahr</span>
          </div>

          {/* Headline */}
          <h1
            className="opacity-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 700,
              color: "#e5e2e1",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              animation: "fadeInUp 0.7s ease 0.35s forwards",
            }}
          >
            Hamta
            <br />
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #f2ca50, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Restaurant
            </em>
          </h1>

          {/* Tagline */}
          <p
            className="mt-6 text-lg lg:text-xl leading-relaxed opacity-0"
            style={{
              color: "#c8c6c5",
              fontWeight: 400,
              maxWidth: "480px",
              animation: "fadeInUp 0.7s ease 0.5s forwards",
            }}
          >
            Echt. Handgemacht. Täglich frisch aus Urfahr.
          </p>
          <p
            className="mt-3 text-sm lg:text-base leading-relaxed opacity-0"
            style={{
              color: "#99907c",
              maxWidth: "420px",
              animation: "fadeInUp 0.7s ease 0.62s forwards",
            }}
          >
            Der Geschmack Persiens und Afghanistans – seit Juli 2024 mitten in Linz.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mt-10 opacity-0"
            style={{ animation: "fadeInUp 0.7s ease 0.75s forwards" }}
          >
            <button onClick={scrollToMenu} className="btn-gold">
              <UtensilsCrossed size={14} strokeWidth={2.5} />
              Speisekarte ansehen
            </button>
            <a href="tel:+43732000000" className="btn-outline">
              <Phone size={14} strokeWidth={2.5} />
              Anrufen
            </a>
          </div>

          {/* Info strip */}
          <div
            className="flex flex-wrap gap-6 mt-12 opacity-0"
            style={{ animation: "fadeInUp 0.7s ease 0.9s forwards" }}
          >
            <div>
              <div className="section-label mb-1">Öffnungszeiten</div>
              <div className="text-sm" style={{ color: "#c8c6c5" }}>
                Di – So &nbsp; 11:00 – 22:00
              </div>
            </div>
            <div
              className="w-px self-stretch"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div>
              <div className="section-label mb-1">Adresse</div>
              <div className="text-sm" style={{ color: "#c8c6c5" }}>
                Hauptstraße 42, 4040 Linz
              </div>
            </div>
            <div
              className="w-px self-stretch"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div>
              <div className="section-label mb-1">Lieferservice</div>
              <div className="text-sm" style={{ color: "#c8c6c5" }}>
                Verfügbar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-bounce"
        aria-label="Nach unten scrollen"
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "#4a4640" }}
        >
          Entdecken
        </span>
        <ChevronDown size={18} style={{ color: "#4a4640" }} strokeWidth={1.5} />
      </button>
    </section>
  );
}

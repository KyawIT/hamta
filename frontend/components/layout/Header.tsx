"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Start", href: "#start" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Speisekarte", href: "#menu" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(14,14,14,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#start"
            className="flex items-center gap-3 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative w-8 h-11 lg:w-10 lg:h-14">
              <Image
                src="/logo.png"
                alt="Hamta Restaurant"
                fill
                sizes="(max-width: 1024px) 32px, 40px"
                className="object-contain"
                priority
              />
            </div>
            <span
              className="hidden sm:block text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#e5e2e1", letterSpacing: "0.12em" }}
            >
              Hamta
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                style={{ color: "#99907c", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#99907c")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+43732000000"
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#f2ca50", letterSpacing: "0.1em" }}
            >
              <Phone size={13} strokeWidth={2.5} />
              Jetzt anrufen
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10"
            style={{ color: "#e5e2e1" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col lg:hidden"
          style={{ backgroundColor: "#0e0e0e" }}
        >
          <div className="h-16 flex items-center justify-between px-5">
            <div className="relative w-8 h-11">
              <Image
                src="/logo.png"
                alt="Hamta Restaurant"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10"
              style={{ color: "#e5e2e1" }}
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col justify-center flex-1 px-8 gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-5 text-3xl font-semibold border-b transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#e5e2e1",
                  borderColor: "rgba(255,255,255,0.06)",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#e5e2e1")}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="tel:+43732000000"
              className="mt-8 btn-gold self-start"
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={14} strokeWidth={2.5} />
              Jetzt anrufen
            </a>
          </nav>

          <div className="px-8 pb-10 text-xs" style={{ color: "#4a4640" }}>
            Hauptstraße 42, 4040 Linz · Di–So 11–22 Uhr
          </div>
        </div>
      )}
    </>
  );
}

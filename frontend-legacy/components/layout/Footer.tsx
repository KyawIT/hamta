"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

function InstagramIcon({ size = 14 }: { size?: number }) {
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

const navLinks = [
  { label: "Start", href: "#start" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Speisekarte", href: "#menu" },
  { label: "Galerie", href: "#galerie" },
  { label: "Kontakt", href: "#kontakt" },
];

const hours = [
  { day: "Montag", time: "Ruhetag", closed: true },
  { day: "Dienstag – Sonntag", time: "11:00 – 22:00", closed: false },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0e0e0e",
        borderTop: "1px solid rgba(242,202,80,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-11">
                <Image
                  src="/logo.png"
                  alt="Hamta Restaurant"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "#e5e2e1", letterSpacing: "0.12em" }}
              >
                Hamta
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4640" }}>
              Persische und afghane Küche in Linz-Urfahr. Täglich frisch zubereitet mit Zutaten aus eigenem Handel.
            </p>
            <a
              href="https://www.instagram.com/hamtarestaurant1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-150"
              style={{ color: "#99907c", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907c")}
            >
              <InstagramIcon size={14} />
              @hamtarestaurant1
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#f2ca50", letterSpacing: "0.12em" }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "#4a4640" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e5e2e1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4640")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#f2ca50", letterSpacing: "0.12em" }}
            >
              Öffnungszeiten
            </h3>
            <ul className="flex flex-col gap-3">
              {hours.map(({ day, time, closed }) => (
                <li key={day} className="flex items-start justify-between gap-4 text-sm">
                  <span style={{ color: "#4a4640" }}>{day}</span>
                  <span
                    style={{ color: closed ? "#4a4640" : "#99907c" }}
                    className="whitespace-nowrap"
                  >
                    {time}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="flex items-start gap-2 mt-5 text-sm"
              style={{ color: "#4a4640" }}
            >
              <Clock size={13} className="mt-0.5 shrink-0" />
              <span>Lieferservice verfügbar</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#f2ca50", letterSpacing: "0.12em" }}
            >
              Adresse
            </h3>
            <address className="not-italic flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Hauptstraße+42,+4040+Linz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm transition-colors duration-150"
                style={{ color: "#4a4640" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#99907c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4640")}
              >
                <MapPin size={13} className="mt-0.5 shrink-0" />
                <span>Hauptstraße 42<br />4040 Linz (Urfahr)</span>
              </a>
              <a
                href="tel:+43732000000"
                className="flex items-center gap-2 text-sm transition-colors duration-150"
                style={{ color: "#4a4640" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4640")}
              >
                <Phone size={13} />
                Jetzt anrufen
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "#353535",
          }}
        >
          <span>© {new Date().getFullYear()} Hamta Restaurant. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-5">
            <Link
              href="/impressum"
              style={{ color: "#353535" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#99907c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#353535")}
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              style={{ color: "#353535" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#99907c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#353535")}
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

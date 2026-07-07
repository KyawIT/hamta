"use client";

import { MapPin, Clock, ExternalLink, Phone } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const hours = [
  { day: "Montag", time: "Ruhetag", closed: true },
  { day: "Dienstag", time: "11:00 – 22:00", closed: false },
  { day: "Mittwoch", time: "11:00 – 22:00", closed: false },
  { day: "Donnerstag", time: "11:00 – 22:00", closed: false },
  { day: "Freitag", time: "11:00 – 22:00", closed: false },
  { day: "Samstag", time: "11:00 – 22:00", closed: false },
  { day: "Sonntag", time: "11:00 – 22:00", closed: false },
];

export default function Location() {
  return (
    <section
      id="standort"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeIn>
          <div className="mb-12 lg:mb-16">
            <SectionLabel className="mb-6">Standort &amp; Öffnungszeiten</SectionLabel>
            <h2 className="text-4xl lg:text-5xl" style={{ color: "#e5e2e1" }}>
              Wir sind in Urfahr{" "}
              <em style={{ fontStyle: "italic", color: "#f2ca50" }}>für Sie da</em>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Map – takes 3 cols */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="relative w-full overflow-hidden" style={{ borderRadius: "0.125rem", aspectRatio: "16/11" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.2!2d14.29!3d48.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773991c9bce41d1%3A0x87d3bece7a4c4c46!2sHauptstra%C3%9Fe%2042%2C%204040%20Linz!5e0!3m2!1sde!2sat!4v1700000000000!5m2!1sde!2sat"
                width="100%"
                height="100%"
                style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hamta Restaurant Standort"
                className="absolute inset-0 w-full h-full"
              />
              {/* Map overlay card */}
              <div
                className="absolute bottom-4 left-4 right-4 glass p-4"
                style={{ borderRadius: "0.125rem" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ color: "#f2ca50", letterSpacing: "0.1em" }}
                    >
                      Unser Standort
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#e5e2e1" }}>
                      Hamta Restaurant
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#4a4640" }}>
                      Hauptstraße 42, 4040 Linz
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Hauptstraße+42,+4040+Linz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest shrink-0 transition-colors duration-150"
                    style={{ color: "#f2ca50", letterSpacing: "0.08em" }}
                  >
                    <ExternalLink size={12} />
                    Route
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Info – takes 2 cols */}
          <FadeIn direction="right" delay={100} className="lg:col-span-2 flex flex-col gap-5">
            {/* Hours */}
            <div
              className="flex-1 p-6 lg:p-8"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "0.125rem",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock size={14} style={{ color: "#f2ca50" }} />
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#f2ca50", letterSpacing: "0.1em" }}
                >
                  Öffnungszeiten
                </h3>
              </div>

              <ul className="space-y-3">
                {hours.map(({ day, time, closed }) => {
                  const isToday =
                    new Date().toLocaleDateString("de-AT", { weekday: "long" }) === day;
                  return (
                    <li
                      key={day}
                      className="flex items-center justify-between text-sm"
                      style={{
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span
                        style={{
                          color: isToday ? "#e5e2e1" : "#4a4640",
                          fontWeight: isToday ? 600 : 400,
                        }}
                      >
                        {isToday && (
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                            style={{ backgroundColor: "#f2ca50", verticalAlign: "middle" }}
                          />
                        )}
                        {day}
                      </span>
                      <span
                        style={{
                          color: closed ? "#353535" : isToday ? "#f2ca50" : "#99907c",
                          fontWeight: isToday ? 600 : 400,
                        }}
                      >
                        {time}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 text-xs leading-5" style={{ color: "#353535" }}>
                An Feiertagen können die Zeiten abweichen. Bitte ruf uns an.
              </p>
            </div>

            {/* Address card */}
            <div
              className="p-6 lg:p-8"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "0.125rem",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={14} style={{ color: "#f2ca50" }} />
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#f2ca50", letterSpacing: "0.1em" }}
                >
                  Adresse
                </h3>
              </div>

              <p className="text-base font-semibold mb-1" style={{ color: "#e5e2e1" }}>
                Hamta Restaurant
              </p>
              <p className="text-sm leading-6 mb-5" style={{ color: "#4a4640" }}>
                Hauptstraße 42
                <br />
                4040 Linz (Urfahr)
                <br />
                Österreich
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://maps.google.com/?q=Hauptstraße+42,+4040+Linz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center justify-center"
                >
                  <MapPin size={13} strokeWidth={2.5} />
                  In Google Maps öffnen
                </a>
                <a href="tel:+43732000000" className="btn-gold text-center justify-center">
                  <Phone size={13} strokeWidth={2.5} />
                  Jetzt anrufen
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

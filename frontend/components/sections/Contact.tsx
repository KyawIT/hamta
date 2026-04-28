"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Truck, Send } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const infoCards = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["Hauptstraße 42", "4040 Linz (Urfahr)", "Österreich"],
    link: "https://maps.google.com/?q=Hauptstraße+42,+4040+Linz",
    linkLabel: "Route planen",
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    lines: ["Montag: Ruhetag", "Dienstag – Sonntag", "11:00 – 22:00 Uhr"],
  },
  {
    icon: Truck,
    title: "Lieferservice",
    lines: ["Lieferung verfügbar", "Bitte telefonisch anfragen"],
    link: "tel:+43732000000",
    linkLabel: "Jetzt anrufen",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:info@hamtarestaurant.at?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="kontakt"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeIn>
          <div className="mb-12 lg:mb-16">
            <SectionLabel className="mb-6">Kontakt</SectionLabel>
            <h2 className="text-4xl lg:text-5xl mb-4" style={{ color: "#e5e2e1" }}>
              Kommen Sie{" "}
              <em style={{ fontStyle: "italic", color: "#f2ca50" }}>vorbei</em>
            </h2>
            <p className="text-base" style={{ color: "#4a4640", maxWidth: "480px" }}>
              Wir freuen uns auf Ihren Besuch – ob spontan oder nach Voranmeldung.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          {infoCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div
                className="p-7 h-full"
                style={{
                  backgroundColor: "#1e1e1e",
                  borderRadius: "0.125rem",
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <card.icon size={14} style={{ color: "#f2ca50" }} />
                  <h3
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#f2ca50", letterSpacing: "0.1em" }}
                  >
                    {card.title}
                  </h3>
                </div>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm leading-7" style={{ color: "#4a4640" }}>
                    {line}
                  </p>
                ))}
                {card.link && (
                  <a
                    href={card.link}
                    target={card.link.startsWith("http") ? "_blank" : undefined}
                    rel={card.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-150"
                    style={{ color: "#f2ca50", letterSpacing: "0.08em" }}
                  >
                    {card.linkLabel} →
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <FadeIn direction="left" className="lg:col-span-3">
            <div
              className="p-8 lg:p-10"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "0.125rem",
              }}
            >
              <h3
                className="text-2xl mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
              >
                Schreiben Sie uns
              </h3>
              <p className="text-sm mb-8" style={{ color: "#4a4640" }}>
                Für Anfragen, Gruppenreservierungen oder Feedback.
              </p>

              {sent ? (
                <div className="py-8 text-center">
                  <div
                    className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(242,202,80,0.1)", borderRadius: "0.125rem" }}
                  >
                    <Send size={18} style={{ color: "#f2ca50" }} />
                  </div>
                  <p
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
                  >
                    Nachricht wird geöffnet
                  </p>
                  <p className="text-sm mt-2" style={{ color: "#4a4640" }}>
                    Ihr Standard-E-Mail-Programm öffnet sich jetzt.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#4a4640", letterSpacing: "0.1em" }}
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ihr Name"
                        className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                        style={{
                          backgroundColor: "#2a2a2a",
                          color: "#e5e2e1",
                          borderRadius: "0.125rem",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(242,202,80,0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: "#4a4640", letterSpacing: "0.1em" }}
                        htmlFor="email"
                      >
                        E-Mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ihre@email.at"
                        className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200"
                        style={{
                          backgroundColor: "#2a2a2a",
                          color: "#e5e2e1",
                          borderRadius: "0.125rem",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(242,202,80,0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#4a4640", letterSpacing: "0.1em" }}
                      htmlFor="message"
                    >
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ihre Anfrage, Reservierungswunsch oder Feedback..."
                      className="w-full px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none"
                      style={{
                        backgroundColor: "#2a2a2a",
                        color: "#e5e2e1",
                        borderRadius: "0.125rem",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(242,202,80,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full justify-center">
                    <Send size={14} strokeWidth={2.5} />
                    Nachricht senden
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Right column – Call CTA */}
          <FadeIn direction="right" delay={100} className="lg:col-span-2 flex flex-col gap-5">
            <div
              className="p-8"
              style={{
                backgroundColor: "#f2ca50",
                borderRadius: "0.125rem",
              }}
            >
              <h3
                className="text-2xl mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#131313",
                  lineHeight: 1.2,
                }}
              >
                Bereit für einen Tisch?
              </h3>
              <p className="text-sm mb-7" style={{ color: "#353535" }}>
                Rufen Sie uns direkt an – wir freuen uns auf Sie.
                Di–So · 11:00–22:00 Uhr
              </p>
              <a
                href="tel:+43732000000"
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                style={{ color: "#131313", letterSpacing: "0.1em" }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Jetzt anrufen
              </a>
            </div>

            <div
              className="p-8"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "0.125rem",
              }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
              >
                Kein Alkohol
              </h3>
              <p className="text-sm leading-6" style={{ color: "#4a4640" }}>
                Hamta Restaurant wird alkoholfrei geführt. Wir bieten eine Auswahl an orientalischen
                Getränken, frischen Säften und Tees an.
              </p>
            </div>

            <div
              className="p-8"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "0.125rem",
              }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
              >
                Gruppenbestellungen
              </h3>
              <p className="text-sm leading-6" style={{ color: "#4a4640" }}>
                Für Gruppen ab 8 Personen bitten wir um vorherige telefonische Anmeldung.
                Wir bereiten alles liebevoll für Sie vor.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

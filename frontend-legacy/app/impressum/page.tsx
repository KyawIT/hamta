import type { Metadata } from "next";
import Link from "next/link";
import LegalPageHeader from "@/components/layout/LegalPageHeader";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum des Hamta Restaurants gemäß § 5 ECG und § 25 MedienG – Angaben zum Medieninhaber und Verantwortlichen.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://hamtarestaurant.at/impressum" },
};

export default function ImpressumPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#131313", color: "#e5e2e1" }}
    >
      <LegalPageHeader />

      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-16 lg:py-24">
        {/* Page title */}
        <div className="mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#f2ca50", letterSpacing: "0.14em" }}
          >
            Rechtliches
          </p>
          <h1
            className="font-serif text-3xl lg:text-4xl font-semibold leading-snug mb-5"
            style={{ color: "#e5e2e1" }}
          >
            Impressum
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#4a4640" }}>
            Pflichtangaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz (MedienG).
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Unternehmensangaben */}
          <section>
            <h2
              className="font-serif text-lg font-semibold mb-4 pb-3"
              style={{
                color: "#e5e2e1",
                borderBottom: "1px solid rgba(242,202,80,0.12)",
              }}
            >
              Medieninhaber und Diensteanbieter
            </h2>
            <div className="text-sm leading-7" style={{ color: "#99907c" }}>
              <address className="not-italic">
                <strong style={{ color: "#e5e2e1" }}>Moradi Lebensmittel KG</strong>
                <br />
                Hamta Restaurant
                <br />
                Hauptstraße 42
                <br />
                4040 Linz (Urfahr), Österreich
                <br />
                <br />
                <span style={{ color: "#4a4640" }}>E-Mail:</span>{" "}
                <a href="mailto:office@hamtarestaurant.at" style={{ color: "#f2ca50" }}>
                  office@hamtarestaurant.at
                </a>
                <br />
                <span style={{ color: "#4a4640" }}>Telefon:</span>{" "}
                <a href="tel:+43732000000" style={{ color: "#99907c" }}>
                  +43 732 000000
                </a>
              </address>
            </div>
          </section>

          {/* Unternehmensgegenstand */}
          <section>
            <h2
              className="font-serif text-lg font-semibold mb-4 pb-3"
              style={{
                color: "#e5e2e1",
                borderBottom: "1px solid rgba(242,202,80,0.12)",
              }}
            >
              Unternehmensgegenstand
            </h2>
            <div className="text-sm leading-7" style={{ color: "#99907c" }}>
              <p>
                Betrieb eines Gastronomiebetriebs (Restaurant) sowie Handel mit
                Lebensmitteln. Spezialisiert auf persische und afghanische Küche.
              </p>
            </div>
          </section>

          {/* Behörde und Kammer */}
          <section>
            <h2
              className="font-serif text-lg font-semibold mb-4 pb-3"
              style={{
                color: "#e5e2e1",
                borderBottom: "1px solid rgba(242,202,80,0.12)",
              }}
            >
              Zuständige Behörde / Aufsichtsbehörde
            </h2>
            <div className="text-sm leading-7" style={{ color: "#99907c" }}>
              <p>
                Bezirksverwaltungsbehörde Linz-Stadt
                <br />
                Wirtschaftskammer Oberösterreich (WKOÖ)
              </p>
              <p className="mt-3">
                Anwendbare Rechtsvorschriften: Gewerbeordnung (GewO), Lebensmittelsicherheits-
                und Verbraucherschutzgesetz (LMSVG), Gaststättenrecht. Die anwendbaren
                Rechtsvorschriften sind unter{" "}
                <a
                  href="https://www.ris.bka.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#f2ca50" }}
                >
                  ris.bka.gv.at
                </a>{" "}
                abrufbar.
              </p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2
              className="font-serif text-lg font-semibold mb-4 pb-3"
              style={{
                color: "#e5e2e1",
                borderBottom: "1px solid rgba(242,202,80,0.12)",
              }}
            >
              Haftungshinweis
            </h2>
            <div className="text-sm leading-7" style={{ color: "#99907c" }}>
              <p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
                für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind
                ausschließlich deren Betreiber verantwortlich.
              </p>
              <p className="mt-4">
                Alle auf dieser Website veröffentlichten Inhalte sind urheberrechtlich
                geschützt. Eine Vervielfältigung, Bearbeitung, Verbreitung oder jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechts bedarf der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </section>

          {/* Datenschutz Verweis */}
          <section>
            <h2
              className="font-serif text-lg font-semibold mb-4 pb-3"
              style={{
                color: "#e5e2e1",
                borderBottom: "1px solid rgba(242,202,80,0.12)",
              }}
            >
              Datenschutz
            </h2>
            <div className="text-sm leading-7" style={{ color: "#99907c" }}>
              <p>
                Informationen zur Verarbeitung personenbezogener Daten auf dieser Website
                finden Sie in unserer{" "}
                <Link
                  href="/datenschutz"
                  style={{ color: "#f2ca50" }}
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div
          className="mt-16 pt-8 text-xs leading-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "#353535",
          }}
        >
          <p>Stand: April 2026 · Moradi Lebensmittel KG, Hauptstraße 42, 4040 Linz</p>
        </div>
      </div>
    </main>
  );
}

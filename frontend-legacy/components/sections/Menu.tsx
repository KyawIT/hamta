"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";
import { Phone } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const categories: MenuCategory[] = [
  {
    id: "kebap",
    label: "Kebap & Dürum",
    items: [
      {
        name: "Lammkebap (Dürum)",
        description: "Zart gegrilltes Lammhack, frische Kräuter, Tomaten, Zwiebeln im Fladenbrot.",
        price: "€ 9,90",
      },
      {
        name: "Hähnchenkebap (Dürum)",
        description: "Mariniertes Hähnchenbrustfleisch, knackiges Gemüse, Joghurtsauce.",
        price: "€ 8,90",
      },
      {
        name: "Adana Kebap",
        description: "Scharf gewürztes Hackfleisch vom Grill, serviert mit Fladenbrot und Salat.",
        price: "€ 11,90",
      },
      {
        name: "Gemischter Kebap",
        description: "Auswahl aus Lamm und Hähnchen, Beilagensalat, Fladenbrot.",
        price: "€ 12,90",
      },
      {
        name: "Mantu",
        description: "Handgefertigte Teigtaschen gefüllt mit Lammhack, serviert mit Tomatensauce, Joghurt und gebratener Minze.",
        price: "€ 11,90",
        highlight: true,
      },
      {
        name: "Aushak",
        description: "Gefüllte Teigtaschen mit Lauch und Koriander, Joghurtsauce, Tomatensugo.",
        price: "€ 10,90",
      },
    ],
  },
  {
    id: "grill",
    label: "Grill & Fleisch",
    items: [
      {
        name: "Lammkotelett",
        description: "Saftige Lammkoteletts vom Grill, persischer Reis, Grillgemüse, Joghurtsauce.",
        price: "€ 21,90",
        highlight: true,
      },
      {
        name: "Joojeh Kebap",
        description: "Ganzes Hähnchen, in Safran und Zitrone mariniert, über Holzkohle gegrillt.",
        price: "€ 16,90",
      },
      {
        name: "Gegrilltes Hähnchen (halb)",
        description: "Halbes Hähnchen, mit orientalischen Gewürzen, serviert mit Beilagensalat.",
        price: "€ 14,90",
      },
      {
        name: "Gemischter Grillteller",
        description: "Lammkebap, Hähnchenkebap, Kotelett – für den großen Hunger.",
        price: "€ 18,90",
      },
      {
        name: "Chelo Kebap",
        description: "Klassisches persisches Gericht: Safranreis, Grilltomate, Butter, Ei und Lammkebap.",
        price: "€ 17,90",
      },
    ],
  },
  {
    id: "beilagen",
    label: "Beilagen & Extras",
    items: [
      {
        name: "Persischer Safranreis",
        description: "Traditionell zubereiteter Basmati-Reis mit Safran und Butter (Tahdig).",
        price: "€ 3,50",
      },
      {
        name: "Fladenbrot (Lavash)",
        description: "Frisch gebackenes persisches Fladenbrot.",
        price: "€ 2,50",
      },
      {
        name: "Gemischter Salat",
        description: "Saisonaler Beilagensalat mit hausgemachtem Dressing.",
        price: "€ 4,90",
      },
      {
        name: "Mast-o-Khiar",
        description: "Persisches Joghurt mit Gurken, getrockneter Minze und Dill.",
        price: "€ 3,90",
      },
      {
        name: "Zeytoun Parvardeh",
        description: "Marinierte Oliven mit Granatapfelkernöl, Walnüssen und Kräutern.",
        price: "€ 4,50",
      },
      {
        name: "Mirza Ghasemi",
        description: "Geräuchertes Auberginenmus mit Tomaten, Knoblauch und Ei.",
        price: "€ 5,90",
      },
    ],
  },
];

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div
      className="flex items-start justify-between gap-6 py-5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className="text-base font-semibold"
            style={{
              fontFamily: "var(--font-serif)",
              color: item.highlight ? "#f2ca50" : "#e5e2e1",
            }}
          >
            {item.name}
          </h3>
          {item.highlight && (
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5"
              style={{
                background: "rgba(242,202,80,0.12)",
                color: "#f2ca50",
                borderRadius: "0.125rem",
              }}
            >
              Beliebt
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#4a4640" }}>
          {item.description}
        </p>
      </div>
      <span
        className="text-base font-semibold shrink-0"
        style={{
          fontFamily: "var(--font-serif)",
          color: "#f2ca50",
          minWidth: "4rem",
          textAlign: "right",
        }}
      >
        {item.price}
      </span>
    </div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("kebap");
  const active = categories.find((c) => c.id === activeTab)!;

  return (
    <section
      id="menu"
      className="relative py-24 lg:py-36"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeIn>
          <div className="max-w-2xl mb-14 lg:mb-20">
            <SectionLabel className="mb-6">Unsere Speisekarte</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl mb-5"
              style={{ color: "#e5e2e1" }}
            >
              Gerichte mit{" "}
              <em style={{ fontStyle: "italic", color: "#f2ca50" }}>Geschichte</em>
            </h2>
            <p className="text-base leading-7" style={{ color: "#4a4640" }}>
              Jede Zutat wird sorgfältig ausgewählt, jedes Gericht täglich frisch zubereitet.
              Kein Gefrierfach, keine Kompromisse.
            </p>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={100}>
          <div
            className="flex flex-wrap gap-1 mb-10 p-1 w-full lg:w-auto lg:inline-flex"
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "0.125rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                style={{
                  borderRadius: "0.125rem",
                  letterSpacing: "0.08em",
                  backgroundColor: activeTab === cat.id ? "#f2ca50" : "transparent",
                  color: activeTab === cat.id ? "#131313" : "#4a4640",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Menu items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-x-16">
          {active.items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 60}>
              <MenuItemRow item={item} />
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={300} className="mt-14">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8"
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "0.125rem",
            }}
          >
            <div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "var(--font-serif)", color: "#e5e2e1" }}
              >
                Vollständige Karte & Tagesgerichte
              </h3>
              <p className="text-sm" style={{ color: "#4a4640" }}>
                Unsere Speisekarte wird regelmäßig erweitert. Rufen Sie uns an für aktuelle Tagesangebote.
              </p>
            </div>
            <a href="tel:+43732000000" className="btn-gold shrink-0">
              <Phone size={14} strokeWidth={2.5} />
              Jetzt anrufen
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

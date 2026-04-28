import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const stats = [
  { value: "2024", label: "Eröffnung" },
  { value: "30+", label: "Gerichte" },
  { value: "Täglich", label: "Frisch zubereitet" },
];

export default function About() {
  return (
    <section
      id="ueber-uns"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#131313" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #f2ca50 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <div>
            <FadeIn direction="left">
              <SectionLabel className="mb-6">Unsere Geschichte</SectionLabel>

              <h2
                className="mb-8 text-4xl lg:text-5xl"
                style={{ color: "#e5e2e1" }}
              >
                Ein Familienunternehmen.
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "#f2ca50",
                  }}
                >
                  Eine Leidenschaft.
                </em>
              </h2>

              <div
                className="space-y-5 text-base leading-8"
                style={{ color: "#99907c" }}
              >
                <p>
                  Alles begann mit einem Lebensmittelgeschäft. Als Familie Moradi 2019 die Moradi
                  Lebensmittel KG in Urfahr eröffnete, war es mehr als nur ein Laden – es war ein
                  Stück Heimat mitten in Linz.
                </p>
                <p>
                  Im Juli 2024 folgte der nächste Schritt: Hamta Restaurant öffnete seine Türen
                  an der Urfahraner Hauptstraße. An jenem Ort, wo früher die Bar Cheers war, duftet
                  es heute nach frisch gegrilltem Lammfleisch, Safran und dem Brot des Morgenlandes.
                </p>
                <p>
                  Was uns antreibt? Der Respekt vor den Zutaten. Persische und afghane Küche lebt
                  von Geduld – lange gereifter Joghurt, handgemahlene Gewürze, Fleisch direkt vom
                  Vertrauenslieferanten. Kein Kompromiss. Nur echter Geschmack.
                </p>
              </div>

              {/* Quote */}
              <blockquote
                className="mt-10 pl-6 text-lg italic leading-relaxed"
                style={{
                  borderLeft: "2px solid #f2ca50",
                  color: "#c8c6c5",
                  fontFamily: "var(--font-serif)",
                }}
              >
                „Wir kochen so, wie unsere Mütter es uns beigebracht haben. Mit Zeit, mit Liebe
                und ohne Abkürzungen."
              </blockquote>
            </FadeIn>
          </div>

          {/* Image column */}
          <FadeIn direction="right" delay={150}>
            <div className="relative">
              {/* Main image */}
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "0.125rem", aspectRatio: "4/5" }}
              >
                <Image
                  src="/foods/food-5.jpg"
                  alt="Frisch gegrillte Spezialitäten im Hamta Restaurant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: "brightness(0.9)" }}
                />
              </div>

              {/* Offset secondary image */}
              <div
                className="absolute -bottom-8 -left-8 w-48 h-48 lg:w-60 lg:h-60 overflow-hidden"
                style={{
                  borderRadius: "0.125rem",
                  border: "3px solid #131313",
                }}
              >
                <Image
                  src="/foods/food-8.jpg"
                  alt="Orientalische Gewürze und Zutaten"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>

              {/* Gold accent */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24"
                style={{
                  border: "1px solid rgba(242,202,80,0.25)",
                  borderRadius: "0.125rem",
                }}
              />
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn className="mt-20 lg:mt-28">
          <div
            className="grid grid-cols-3 py-10 lg:py-14"
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "0.125rem",
            }}
          >
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center text-center px-6"
                style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.06)" } : {}}
              >
                <span
                  className="text-3xl lg:text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-serif)",
                    background: "linear-gradient(135deg, #f2ca50, #d4af37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </span>
                <span
                  className="mt-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#4a4640", letterSpacing: "0.1em" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

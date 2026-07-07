import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import SectionLabel from "@/components/ui/SectionLabel";

const images = [
  { src: "/foods/food-2.jpg", alt: "Gegrilltes Lammfleisch", span: "row-span-2" },
  { src: "/foods/food-3.jpg", alt: "Persischer Kebap", span: "" },
  { src: "/foods/food-4.jpg", alt: "Frische Zutaten", span: "" },
  { src: "/foods/food-6.jpg", alt: "Mantu – Gefüllte Teigtaschen", span: "" },
  { src: "/foods/food-7.jpg", alt: "Gemischter Grillteller", span: "row-span-2" },
  { src: "/foods/food-9.jpg", alt: "Joojeh Kebap", span: "" },
  { src: "/foods/food-10.jpg", alt: "Lammkotelett vom Grill", span: "" },
  { src: "/foods/food-11.jpg", alt: "Orientalische Spezialitäten", span: "" },
  { src: "/foods/food-12.jpg", alt: "Persischer Safranreis", span: "" },
  { src: "/foods/food-13.jpg", alt: "Chelo Kebap", span: "row-span-2" },
  { src: "/foods/food-14.jpg", alt: "Fladenbrot", span: "" },
  { src: "/foods/food-15.jpg", alt: "Hamta Restaurant", span: "" },
];

export default function Gallery() {
  return (
    <section
      id="galerie"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <SectionLabel className="mb-5">Galerie</SectionLabel>
              <h2 className="text-4xl lg:text-5xl" style={{ color: "#e5e2e1" }}>
                Jedes Gericht erzählt
                <br />
                <em style={{ fontStyle: "italic", color: "#f2ca50" }}>
                  eine Geschichte
                </em>
              </h2>
            </div>
            <p
              className="text-sm leading-7 max-w-xs"
              style={{ color: "#4a4640" }}
            >
              Frisch aus der Küche – täglich zubereitete Gerichte aus besten Zutaten.
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3"
          style={{ gridAutoRows: "200px" }}
        >
          {images.map((img, i) => (
            <FadeIn
              key={img.src}
              delay={i * 40}
              className={`img-zoom relative overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{
                  background: "linear-gradient(to top, rgba(14,14,14,0.8) 0%, transparent 60%)",
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#f2ca50", letterSpacing: "0.08em" }}
                >
                  {img.alt}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

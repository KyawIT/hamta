"use client";

import Link from "next/link";
import { Home, UtensilsCrossed, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { label: "Start", href: "#start", icon: Home },
  { label: "Speisekarte", href: "#menu", icon: UtensilsCrossed },
  { label: "Anrufen", href: "tel:+43732000000", icon: Phone, isPhone: true },
  { label: "Standort", href: "#kontakt", icon: MapPin },
];

export default function MobileNav() {
  const [active, setActive] = useState("#start");

  useEffect(() => {
    const sections = ["start", "ueber-uns", "menu", "galerie", "kontakt"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        backgroundColor: "#1e1e1e",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {items.map(({ label, href, icon: Icon, isPhone }) => {
          const isActive = !isPhone && active === href;
          return isPhone ? (
            <a
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 py-3 gap-1 transition-colors duration-150"
              style={{ color: "#f2ca50" }}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span className="text-[10px] font-semibold tracking-wide uppercase">{label}</span>
            </a>
          ) : (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 py-3 gap-1 transition-colors duration-150"
              style={{ color: isActive ? "#f2ca50" : "#99907c" }}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span className="text-[10px] font-semibold tracking-wide uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";

export default function LegalPageHeader() {
  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between px-5 lg:px-10 h-14 border-b"
      style={{
        backgroundColor: "#131313",
        borderColor: "rgba(242,202,80,0.10)",
      }}
    >
      <Link
        href="/"
        className="text-xs font-semibold uppercase tracking-widest transition-colors duration-150"
        style={{ color: "#99907c", letterSpacing: "0.12em" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f2ca50")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#99907c")}
      >
        ← Zurück
      </Link>
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "#353535", letterSpacing: "0.12em" }}
      >
        Hamta Restaurant
      </span>
    </div>
  );
}

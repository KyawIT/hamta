"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="section-label">{children}</span>
      <span
        className="h-px flex-1 max-w-12"
        style={{ background: "linear-gradient(90deg, #f2ca50, transparent)" }}
      />
    </div>
  );
}

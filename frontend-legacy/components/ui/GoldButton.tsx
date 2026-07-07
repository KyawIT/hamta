"use client";

import Link from "next/link";

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = "gold",
  className = "",
  type = "button",
  external = false,
}: GoldButtonProps) {
  const cls = `${variant === "gold" ? "btn-gold" : "btn-outline"} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

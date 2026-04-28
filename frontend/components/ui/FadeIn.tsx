"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  threshold?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass =
    direction === "up"
      ? "animate-fade-in-up"
      : direction === "left"
      ? "animate-fade-in-left"
      : direction === "right"
      ? "animate-fade-in-right"
      : "animate-fade-in";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        animation: visible ? `${getAnimation(direction)} 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` : "none",
      }}
    >
      {children}
    </div>
  );
}

function getAnimation(direction: string) {
  switch (direction) {
    case "up": return "fadeInUp";
    case "left": return "fadeInLeft";
    case "right": return "fadeInRight";
    default: return "fadeIn";
  }
}

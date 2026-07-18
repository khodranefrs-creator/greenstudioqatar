"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);

    if (reduced) {
      setIsVisible(true);
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(24px)",
        transition: reducedMotion
          ? "none"
          : `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

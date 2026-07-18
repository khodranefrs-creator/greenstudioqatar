import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl md:text-5xl font-display">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

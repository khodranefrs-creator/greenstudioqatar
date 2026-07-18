import type { ReactNode } from "react";
import type { BadgeVariant } from "@/types";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-charcoal/5 text-charcoal",
  outline: "border border-border text-charcoal",
  accent: "bg-accent/10 text-accent",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

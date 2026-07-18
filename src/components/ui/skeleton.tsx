"use client";

interface SkeletonProps {
  variant?: "text" | "heading" | "image" | "card";
  className?: string;
  lines?: number;
}

export function Skeleton({ variant = "text", className = "", lines = 1 }: SkeletonProps) {
  if (variant === "card") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="aspect-[4/3] w-full bg-border animate-skeleton" />
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/4 bg-border animate-skeleton" />
          <div className="h-5 w-3/4 bg-border animate-skeleton" />
          <div className="h-3 w-full bg-border animate-skeleton" />
        </div>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div
        className={`bg-border animate-skeleton ${className}`}
        style={{ aspectRatio: "16/9", width: "100%" }}
      />
    );
  }

  if (variant === "heading") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="h-8 w-2/3 bg-border animate-skeleton" />
        <div className="h-4 w-1/3 bg-border animate-skeleton" />
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-border animate-skeleton"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

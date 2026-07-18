"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { BeforeAfterImage } from "@/types";

interface BeforeAfterSliderProps {
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* After image (full width behind) */}
      <div className="absolute inset-0">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-offwhite z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-offwhite shadow-md flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-charcoal"
          >
            <path
              d="M6 10L2 10M2 10L4 8M2 10L4 12M14 10L18 10M18 10L16 8M18 10L16 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 z-10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-offwhite bg-charcoal/70 backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 z-10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-offwhite bg-charcoal/70 backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}

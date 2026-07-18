"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { LightboxImage } from "@/types";

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && initialIndex !== currentIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentIndex(initialIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialIndex]);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next =
            direction === "next"
              ? (prev + 1) % images.length
              : (prev - 1 + images.length) % images.length;
          onIndexChange?.(next);
          return next;
        });
        setIsTransitioning(false);
      }, 200);
    },
    [images.length, isTransitioning, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, navigate, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? "next" : "prev");
    }
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-charcoal/95" onClick={onClose} />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-offwhite/70 hover:text-offwhite transition-colors p-2"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => navigate("prev")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-offwhite/50 hover:text-offwhite transition-colors p-3"
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => navigate("next")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-offwhite/50 hover:text-offwhite transition-colors p-3"
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      <div className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center">
        <div
          className={`relative transition-opacity duration-200 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className="max-h-[75vh] w-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center justify-between w-full mt-4 px-2">
          <p className="text-offwhite/60 text-xs uppercase tracking-widest font-body">
            {currentIndex + 1} / {images.length}
          </p>
          {currentImage.caption && (
            <p className="text-offwhite/70 text-sm font-body text-center flex-1 mx-8">
              {currentImage.caption}
            </p>
          )}
          <div className="w-16" />
        </div>
      </div>

      {/* Hidden preloads */}
      {images.map((img, i) => {
        const nextIdx = (currentIndex + 1) % images.length;
        const prevIdx = (currentIndex - 1 + images.length) % images.length;
        if (i === nextIdx || i === prevIdx) {
          return (
            <link key={img.src} rel="prefetch" href={img.src} as="image" />
          );
        }
        return null;
      })}
    </div>
  );
}

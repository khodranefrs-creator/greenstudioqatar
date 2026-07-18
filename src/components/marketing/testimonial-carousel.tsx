"use client";

import { useState, useEffect, useCallback } from "react";
import { Testimonial } from "@/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  locale: string;
}

export default function TestimonialCarousel({ testimonials, locale }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[current];

  return (
    <section
      className="py-section-lg sm:py-section-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative min-h-[200px]">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <blockquote className="font-display text-2xl font-light leading-snug text-charcoal sm:text-3xl md:text-4xl">
                  &ldquo;{locale === "ar" ? t.quoteAr : t.quoteEn}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            {testimonial.clientPhoto && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <img
                  src={testimonial.clientPhoto}
                  alt={testimonial.clientName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="text-start">
              <p className="font-body text-sm font-medium text-charcoal">
                {testimonial.clientName}
              </p>
              <p className="font-body text-xs text-muted">
                {locale === "ar" ? testimonial.clientTitleAr : testimonial.clientTitle},{" "}
                {testimonial.clientCompany}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={prev}
              className="flex h-8 w-8 items-center justify-center border border-border text-muted transition-colors hover:text-charcoal"
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 transition-all duration-300 ${
                  index === current ? "w-6 bg-charcoal" : "w-1.5 bg-border"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <button
              onClick={next}
              className="flex h-8 w-8 items-center justify-center border border-border text-muted transition-colors hover:text-charcoal"
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

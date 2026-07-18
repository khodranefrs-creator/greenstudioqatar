"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
    const interval = setInterval(next, 7000);
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
      <div className="mx-auto max-w-[90rem] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <svg viewBox="0 0 40 32" fill="none" className="mx-auto h-8 w-10 text-charcoal/10">
            <path d="M0 32V20C0 9.4 5.2 2.6 16 0l1.6 4C10.4 5.8 7.2 10 6.4 16h8v16H0zm24 0V20C24 9.4 29.2 2.6 40 0l1.6 4C34.4 5.8 31.2 10 30.4 16h8v16H24z" fill="currentColor" />
          </svg>

          <div className="relative min-h-[180px] sm:min-h-[160px] mt-6">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`transition-all duration-700 ${
                  index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
                }`}
              >
                <blockquote className="font-display text-xl font-light leading-[1.6] text-charcoal sm:text-2xl md:text-3xl italic">
                  {locale === "ar" ? t.quoteAr : t.quoteEn}
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {testimonial.clientPhoto && (
              <div className="relative h-11 w-11 overflow-hidden ring-1 ring-border">
                <Image
                  src={testimonial.clientPhoto}
                  alt={testimonial.clientName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-start">
              <p className="font-body text-[0.8rem] font-medium text-charcoal">
                {testimonial.clientName}
              </p>
              <p className="font-body text-[0.7rem] text-muted">
                {locale === "ar" ? testimonial.clientTitleAr : testimonial.clientTitle},{" "}
                {testimonial.clientCompany}
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors hover:text-charcoal hover:border-charcoal/30"
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-4 w-4">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 ${
                    index === current ? "w-6 h-[2px] bg-charcoal" : "w-[6px] h-[2px] bg-border hover:bg-muted"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors hover:text-charcoal hover:border-charcoal/30"
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-4 w-4">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

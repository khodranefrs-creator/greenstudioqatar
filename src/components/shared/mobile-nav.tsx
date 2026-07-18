"use client";

import { useEffect, useRef } from "react";
import { LanguageSwitcher } from "./language-switcher";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  links: { href: string; label: string }[];
  ctaLabel: string;
  consultationHref?: string;
}

export function MobileNav({
  isOpen,
  onClose,
  locale,
  links,
  ctaLabel,
  consultationHref,
}: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const resolvedConsultationHref = consultationHref ?? `/${locale}/contact`;

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }

      if (e.key === "Tab" && isOpen && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 bg-offwhite transition-all duration-500 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div className="flex h-full flex-col items-center justify-center px-6">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 inset-inline-end-6 flex h-12 w-12 items-center justify-center text-charcoal hover:text-accent transition-colors"
          aria-label="Close navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-display font-medium text-charcoal hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col items-center gap-6">
          <LanguageSwitcher locale={locale} className="text-lg" />
          <a
            href={resolvedConsultationHref}
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center bg-accent px-8 text-sm font-medium text-offwhite hover:bg-accent-light transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

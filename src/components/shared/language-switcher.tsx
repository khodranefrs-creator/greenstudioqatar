"use client";

import { useCallback } from "react";

interface LanguageSwitcherProps {
  locale: string;
  className?: string;
}

export function LanguageSwitcher({ locale, className = "" }: LanguageSwitcherProps) {
  const isArabic = locale === "ar";

  const switchLanguage = useCallback(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const currentLocale = segments[1];

    if (currentLocale === "en" || currentLocale === "ar") {
      segments[1] = isArabic ? "en" : "ar";
    } else {
      segments.splice(1, 0, isArabic ? "en" : "ar");
    }

    window.location.href = segments.join("/") || "/";
  }, [isArabic]);

  return (
    <button
      onClick={switchLanguage}
      className={`inline-flex items-center justify-center gap-1.5 min-h-11 min-w-11 text-sm font-medium transition-colors hover:text-accent ${className}`}
      aria-label={`Switch to ${isArabic ? "English" : "Arabic"}`}
    >
      {isArabic ? "EN" : "عربي"}
    </button>
  );
}

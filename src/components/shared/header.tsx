"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  locale: string;
}

const navLinks = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "journal", href: "/journal" },
  { key: "contact", href: "/contact" },
] as const;

export function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const links = navLinks.map((link) => ({
    href: `/${locale}${link.href}`,
    label: t(link.key),
  }));

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href={`/${locale}`}
            className="font-display text-lg font-semibold tracking-[0.15em] uppercase text-charcoal"
          >
            GREEN STUDIO
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <Button as="link" href={`/${locale}/contact`} variant="primary" size="sm">
              {t("getConsultation")}
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col items-end gap-1.5 p-2"
            aria-label="Open navigation"
          >
            <span className="block h-px w-6 bg-charcoal transition-all" />
            <span className="block h-px w-4 bg-charcoal transition-all" />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={closeMobile}
        locale={locale}
        links={links}
        ctaLabel={t("getConsultation")}
      />
    </>
  );
}

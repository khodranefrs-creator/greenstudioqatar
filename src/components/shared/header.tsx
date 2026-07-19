"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

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
      setScrolled(window.scrollY > 60);
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
        className={`fixed top-0 inset-x-0 z-40 will-change-transform transition-colors duration-300 ${
          scrolled
            ? "bg-offwhite shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href={`/${locale}`}
            className={`font-display text-[0.95rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
              scrolled ? "text-charcoal" : "text-offwhite"
            }`}
          >
            GREEN STUDIO
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.8rem] font-medium tracking-[0.06em] transition-colors duration-300 ${
                  scrolled
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-offwhite/70 hover:text-offwhite"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className={`inline-flex h-10 items-center justify-center px-6 text-[0.8rem] font-medium tracking-[0.06em] transition-all duration-300 ${
                scrolled
                  ? "bg-charcoal text-offwhite hover:bg-accent"
                  : "bg-offwhite/10 text-offwhite border border-offwhite/30 hover:bg-offwhite/20 hover:border-offwhite/50"
              }`}
            >
              {t("getConsultation")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden flex flex-col items-end justify-center gap-[5px] h-11 w-11 transition-colors duration-300 ${
              scrolled ? "text-charcoal" : "text-offwhite"
            }`}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <span className={`block h-px w-6 transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-offwhite'}`} />
            <span className={`block h-px w-4 transition-all duration-300 ${scrolled ? 'bg-charcoal' : 'bg-offwhite'}`} />
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

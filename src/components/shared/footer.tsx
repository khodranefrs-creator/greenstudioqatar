import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { getDictionary } from "@/lib/dictionary";
import { LanguageSwitcher } from "./language-switcher";

interface FooterProps {
  locale: Locale;
}

const serviceLinks = [
  { key: "architectural-design", labelEn: "Architectural Design", labelAr: "التصميم المعماري" },
  { key: "interior-design", labelEn: "Interior Design", labelAr: "التصميم الداخلي" },
  { key: "engineering-consultancy", labelEn: "Engineering Consultancy", labelAr: "الاستشارات الهندسية" },
  { key: "project-management", labelEn: "Project Management", labelAr: "إدارة المشاريع" },
  { key: "construction-supervision", labelEn: "Construction Supervision", labelAr: "إشراف التنفيذ" },
] as const;

const quickLinks = [
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "journal", href: "/journal" },
  { key: "contact", href: "/contact" },
] as const;

export async function Footer({ locale }: FooterProps) {
  const dict = await getDictionary(locale) as Record<string, Record<string, unknown>>;
  const nav = dict.nav as Record<string, string>;
  const footer = dict.footer as Record<string, string>;

  return (
    <footer className="border-t border-border bg-offwhite">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="font-display text-lg font-semibold tracking-[0.15em] uppercase text-charcoal"
            >
              GREEN STUDIO
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {footer.description}
            </p>
            <div className="mt-6">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
              {footer.services}
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}/services/${link.key}`}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {locale === "ar" ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
              {footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
              {footer.contact}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>West Bay, Doha, Qatar</li>
              <li>
                <a href="mailto:hello@greenstudio.qa" className="hover:text-charcoal transition-colors">
                  hello@greenstudio.qa
                </a>
              </li>
              <li>
                <a href="tel:+97444123456" className="hover:text-charcoal transition-colors">
                  +974 4412 3456
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-charcoal transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-charcoal transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Green Studio Qatar. {footer.rights}</p>
          <div className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-xs text-muted hover:text-charcoal transition-colors"
            >
              {nav.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-xs text-muted hover:text-charcoal transition-colors"
            >
              {nav.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

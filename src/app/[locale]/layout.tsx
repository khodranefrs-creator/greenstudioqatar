import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <div className={locale === "ar" ? "rtl" : "ltr"}>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={typedLocale} />
      <WhatsAppButton phoneNumber="97444123456" />
    </div>
  );
}

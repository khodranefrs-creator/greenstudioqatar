import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { MobileCtaBar } from "@/components/shared/mobile-cta-bar";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={typedLocale} messages={messages}>
      <div className={locale === "ar" ? "rtl" : "ltr"}>
        <Header locale={locale} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer locale={typedLocale} />
        <MobileCtaBar locale={locale} />
        <WhatsAppButton phoneNumber="97444123456" />
      </div>
    </NextIntlClientProvider>
  );
}

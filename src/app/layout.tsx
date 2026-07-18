import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { getLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

function getDirection(locale: string): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

async function resolveLocale(): Promise<Locale> {
  try {
    return (await getLocale()) as Locale;
  } catch {
    return "en";
  }
}

export const metadata: Metadata = {
  title: {
    template: "%s | Green Studio Qatar",
    default: "Green Studio Qatar — Architecture & Engineering",
  },
  description:
    "Premium architecture, engineering, interior design, and construction supervision in Qatar and the Gulf region.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Green Studio Qatar",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${playfairDisplay.variable} ${inter.variable} ${notoKufiArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

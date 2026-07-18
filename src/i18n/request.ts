import { getRequestConfig } from "next-intl/server";
import { routing, Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  const isLocale = (l: string): l is Locale =>
    routing.locales.includes(l as Locale);
  if (!locale || !isLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./dictionaries/${locale}.json`)).default,
  };
});

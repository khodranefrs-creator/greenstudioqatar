import type { Locale } from "@/i18n/routing";

type DictionaryModule = { default: Record<string, unknown> };

const dictionaries: Record<Locale, () => Promise<DictionaryModule>> = {
  en: () => import("@/i18n/dictionaries/en.json"),
  ar: () => import("@/i18n/dictionaries/ar.json"),
};

export const getDictionary = async (locale: Locale) => {
  const dictFn = dictionaries[locale] ?? dictionaries.en;
  const mod = await dictFn();
  return mod.default;
};

import { Metadata } from "next";

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  locationCity: string;
  locationCountry: string;
  bodyEn: string;
  heroImage: string;
}

interface Service {
  slug: string;
  nameEn: string;
  nameAr: string;
  summaryEn: string;
}

interface PageParams {
  route: string;
  locale: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteNameEn = "Green Studio Qatar";
const siteNameAr = "جريين ستوديو قطر";

function siteName(locale: string): string {
  return locale === "ar" ? siteNameAr : siteNameEn;
}

function alternates(locale: string, path: string) {
  const basePath = path.replace(/^\//, "");
  return {
    canonical: `${SITE_URL}/${locale}/${basePath}`,
    languages: {
      en: `${SITE_URL}/en/${basePath}`,
      ar: `${SITE_URL}/ar/${basePath}`,
    },
  };
}

function defaultOgImage(): string {
  return `${SITE_URL}/og-image.jpg`;
}

export function generateHomeMetadata(locale: string): Metadata {
  const title =
    locale === "ar"
      ? `${siteNameAr} | عمارة وتصميم في الشرق الأوسط وشمال أفريقيا`
      :     `${siteNameEn} | Architecture & Design in the MENA Region`;

  const description =
    locale === "ar"
      ? "مكتب هندسي متخصص في التصميم المعماري الحديث والعمارة الخضراء في قطر والشرق الأوسط وشمال أفريقيا"
      : "Green Studio QATAR — a contemporary architecture and design firm delivering sustainable, visionary projects across the MENA region.";

  return {
    title,
    description,
    alternates: alternates(locale, ""),
    openGraph: {
      title,
      description,
      siteName: siteName(locale),
      locale: locale === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [{ url: defaultOgImage(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage()],
    },
  };
}

export function generateProjectMetadata(
  project: Project,
  locale: string
): Metadata {
  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const description =
    project.bodyEn.substring(0, 160) ??
    `${project.titleEn} — ${project.locationCity}, ${project.locationCountry}`;

  return {
    title: `${title} | ${siteName(locale)}`,
    description,
    alternates: alternates(locale, `projects/${project.slug}`),
    openGraph: {
      title: `${project.titleEn} | ${siteNameEn}`,
      description: project.bodyEn.substring(0, 160),
      locale: "en_US",
      type: "article",
      images: [
        {
          url: project.heroImage || defaultOgImage(),
          width: 1920,
          height: 1080,
        },
      ],
      siteName: siteNameEn,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.titleEn} | ${siteNameEn}`,
      description: project.bodyEn.substring(0, 160),
      images: [project.heroImage || defaultOgImage()],
    },
  };
}

export function generateServiceMetadata(
  service: Service,
  locale: string
): Metadata {
  const title = locale === "ar" ? service.nameAr : service.nameEn;
  const description = service.summaryEn.substring(0, 160);

  return {
    title: `${title} | ${siteName(locale)}`,
    description,
    alternates: alternates(locale, `services/${service.slug}`),
    openGraph: {
      title: `${service.nameEn} | ${siteNameEn}`,
      description: service.summaryEn.substring(0, 160),
      locale: "en_US",
      type: "website",
      images: [{ url: defaultOgImage(), width: 1200, height: 630 }],
    },
  };
}

export function generatePageMetadata({
  route,
  locale,
}: PageParams): Metadata {
  return {
    alternates: alternates(locale, route),
    openGraph: {
      locale: locale === "ar" ? "ar_AE" : "en_US",
      siteName: siteName(locale),
    },
  };
}

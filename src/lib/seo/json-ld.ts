// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLd = Record<string, string | number | boolean | null | any | any[]>;

interface ArticlePost {
  id: string;
  titleEn: string;
  excerptEn: string;
  publishedAt: string;
  coverImage: string;
}

interface SchemaProject {
  id: string;
  slug: string;
  titleEn: string;
  typology: string;
  year: number;
  sizeSqm: number;
  locationCity: string;
  locationCountry: string;
  bodyEn: string;
  heroImage: string;
  status: string;
  publishedAt: string;
}

interface Breadcrumb {
  label: string;
  url: string;
}

interface FAQItem {
  questionEn: string;
  answerEn: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://greenstudioqatar.com";

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Green Studio for Design and Consultancy",
    alternateName: "جريين ستوديو للتصميم والاستشارات",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Architecture, interior design, engineering consultancy, and project management from Qatar. Established 2013.",
    foundingDate: "2013",
    address: {
      "@type": "PostalAddress",
      addressCountry: "QA",
      addressRegion: "Doha",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+974-4412-3456",
      contactType: "sales",
    },
    sameAs: [
      "https://www.instagram.com/greenstudioqatar",
      "https://www.linkedin.com/company/greenstudioqatar",
    ],
  };
}

export function professionalServiceSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Green Studio for Design and Consultancy",
    description:
      "Architecture, interior design, engineering consultancy, and project management from Qatar.",
    url: SITE_URL,
    areaServed: [
      {
        "@type": "Country",
        name: "Qatar",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture and Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Architectural Design" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Interior Design" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Engineering Consultancy",
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Project Management" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Construction Supervision",
          },
        },
      ],
    },
  };
}

export function articleSchema(post: ArticlePost): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titleEn,
    description: post.excerptEn,
    image: post.coverImage,
    author: {
      "@type": "Organization",
      name: "Green Studio Qatar",
    },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "Green Studio Qatar",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      url: `${SITE_URL}/en/journal/${post.id}`,
    },
  };
}

export function projectSchema(project: SchemaProject): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.titleEn,
    description: project.bodyEn,
    url: `${SITE_URL}/en/projects/${project.slug}`,
    category: project.typology,
    location: {
      "@type": "Place",
      name: `${project.locationCity}, ${project.locationCountry}`,
    },
    photo: project.heroImage,
    size: `${project.sizeSqm} sqm`,
    status: project.status,
    startDate: `${project.year}`,
    datePublished: project.publishedAt,
    founder: {
      "@type": "Organization",
      name: "Green Studio",
    },
  };
}

export function breadcrumbSchema(items: Breadcrumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: FAQItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerEn,
      },
      inLanguage: "en",
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      url: SITE_URL,
    },
  };
}

export function packageOffersSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Green Studio Qatar — Service Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Discovery Session",
        description: "One-on-one expert consultation, on-site assessment, preliminary feasibility report, and budget roadmap.",
        priceCurrency: "QAR",
        price: "5000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Concept Design",
        description: "Design exploration, site analysis, massing studies, and concept presentation with 3D renders.",
        priceCurrency: "QAR",
        price: "35000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Detailed Design",
        description: "Full architectural drawing set, material specifications, structural and MEP coordination.",
        priceCurrency: "QAR",
        price: "85000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Full Service",
        description: "Complete architectural design, permits, tender coordination, construction supervision, and handover.",
        priceCurrency: "QAR",
        price: "150000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Interior Design",
        description: "Space planning, material selection, FF&E specifications, and installation oversight.",
        priceCurrency: "QAR",
        price: "50000",
        availability: "https://schema.org/InStock",
      },
    ],
  };
}

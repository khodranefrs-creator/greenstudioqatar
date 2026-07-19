export interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  typology: string;
  locationCity: string;
  locationCityAr: string;
  locationCountry: string;
  locationCountryAr: string;
  imageUrl?: string;
  heroImage: string;
  year: number;
  bodyEn: string;
  bodyAr: string;
  sizeSqm: number;
  featured?: boolean;
  featuredWeight?: number;
  services?: string[];
  images?: ProjectImage[];
  galleryImages?: string[];
  technicalSpecs?: TechnicalSpec[];
  clientType?: string;
  status?: string;
  publishedAt?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BeforeAfterImage {
  src: string;
  alt: string;
}

export type ProjectTypology =
  | "residential"
  | "commercial"
  | "government"
  | "hospitality"
  | "interiors";

export type ProjectService =
  | "architecture"
  | "interiors"
  | "engineering"
  | "project-management"
  | "supervision";

export interface ProjectFilters {
  typology?: ProjectTypology[];
  services?: ProjectService[];
  location?: string;
  year?: number[];
}

export interface TechnicalSpec {
  label: string;
  labelAr?: string;
  value: string;
  valueAr?: string;
}

export interface ConsultationFormData {
  projectType: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  files: File[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ServiceDeliverable {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface ServiceFaq {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface Service {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  summaryEn: string;
  summaryAr: string;
  bodyEn?: string;
  bodyAr?: string;
  heroImage: string;
  icon?: string;
  deliverables?: ServiceDeliverable[];
  faqs?: ServiceFaq[];
  leadArchitectId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  photo?: string;
  credentials?: string[];
  linkedServices?: string[];
}

export interface Testimonial {
  id: string;
  quoteEn: string;
  quoteAr: string;
  clientName: string;
  clientTitle: string;
  clientTitleAr: string;
  clientCompany: string;
  clientPhoto?: string;
  linkedProjectId?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  bodyEn: string;
  bodyAr: string;
  coverImage: string;
  authorId: string;
  tags: string[];
  publishedAt: string;
  status: string;
}

export type Locale = "en" | "ar";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

export type ButtonSize = "sm" | "md" | "lg";

export type BadgeVariant = "default" | "outline" | "accent";

export interface Package {
  id: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  priceLabelEn: string;
  priceLabelAr: string;
  priceValue: number;
  timelineEn: string;
  timelineAr: string;
  featuresEn: string[];
  featuresAr: string[];
  ctaEn: string;
  ctaAr: string;
  featured?: boolean;
  popular?: boolean;
  customQuote?: boolean;
}

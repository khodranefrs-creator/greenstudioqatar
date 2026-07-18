import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  typology: text("typology").notNull(),
  services: text("services").array().default([]).notNull(),
  locationCity: text("location_city").notNull(),
  locationCityAr: text("location_city_ar").notNull(),
  locationCountry: text("location_country").notNull(),
  locationCountryAr: text("location_country_ar").notNull(),
  year: integer("year").notNull(),
  sizeSqm: integer("size_sqm").notNull(),
  clientType: text("client_type").default("private"),
  featuredWeight: integer("featured_weight").default(0),
  heroImage: text("hero_image").notNull(),
  galleryImages: text("gallery_images").array().default([]).notNull(),
  technicalSpecs: jsonb("technical_specs").default([]).notNull(),
  bodyEn: text("body_en").notNull(),
  bodyAr: text("body_ar").notNull(),
  status: text("status").default("completed").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryAr: text("summary_ar").notNull(),
  bodyEn: text("body_en").notNull(),
  bodyAr: text("body_ar").notNull(),
  heroImage: text("hero_image").notNull(),
  deliverables: jsonb("deliverables").default([]).notNull(),
  faqs: jsonb("faqs").default([]).notNull(),
  leadArchitectId: uuid("lead_architect_id"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  roleEn: text("role_en").notNull(),
  roleAr: text("role_ar").notNull(),
  bioEn: text("bio_en").notNull(),
  bioAr: text("bio_ar").notNull(),
  photo: text("photo"),
  credentials: text("credentials").array().default([]).notNull(),
  linkedServices: text("linked_services").array().default([]).notNull(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title").notNull(),
  clientTitleAr: text("client_title_ar").notNull(),
  clientCompany: text("client_company").notNull(),
  clientPhoto: text("client_photo"),
  quoteEn: text("quote_en").notNull(),
  quoteAr: text("quote_ar").notNull(),
  linkedProjectId: uuid("linked_project_id"),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  excerptEn: text("excerpt_en").notNull(),
  excerptAr: text("excerpt_ar").notNull(),
  bodyEn: text("body_en").notNull(),
  bodyAr: text("body_ar").notNull(),
  coverImage: text("cover_image"),
  authorId: uuid("author_id"),
  tags: text("tags").array().default([]).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  status: text("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectType: text("project_type").notNull(),
  projectTypeAr: text("project_type_ar").notNull(),
  siteArea: text("site_area").notNull(),
  budgetTier: text("budget_tier").notNull(),
  timelineMonths: integer("timeline_months").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  countryCode: text("country_code").notNull(),
  company: text("company"),
  additionalInfo: text("additional_info"),
  status: text("status").default("new").notNull(),
  contactedAt: timestamp("contacted_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("editor").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

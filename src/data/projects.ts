import { Project } from "@/types";

// =============================================================================
// TODO: CLIENT MUST PROVIDE VERIFIED PROJECT PORTFOLIO
// =============================================================================
// ALL previous project data was fabricated and has been removed.
//
// Before launch, the client must provide verified projects including:
// 1. Real project names (as used officially)
// 2. Verified locations (city, country)
// 3. Actual completion years
// 4. Real project sizes (sqm)
// 5. Verified client types
// 6. Real project photographs (hero + gallery)
// 7. Accurate technical specifications
// 8. Verified project descriptions
//
// DO NOT fabricate project data. DO NOT use Unsplash/stock images.
// Trust comes from real work, not invented portfolios.
// =============================================================================

export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByTypology(typology: string): Project[] {
  return projects.filter((p) => p.typology === typology);
}

export function getFeaturedProjects(count: number = 3): Project[] {
  return [...projects]
    .sort((a, b) => (b.featuredWeight ?? 0) - (a.featuredWeight ?? 0))
    .slice(0, count);
}

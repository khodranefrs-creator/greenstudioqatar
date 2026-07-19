import { TeamMember } from "@/types";

// =============================================================================
// VERIFIED FOUNDING LEADER
// =============================================================================
// Mahmud Munir Elrefai is the verified founder of Green Studio for Design
// Design Qatar. The name, title, and company affiliation are based on
// publicly available business registration data. Established 2013.
//
// No biography, credentials, or photo are included because they have not been
// independently verified. These will be added once the client provides them.
// =============================================================================

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mahmud Munir Elrefai",
    roleEn: "Founder & Chief Executive Officer",
    roleAr: "المؤسس والرئيس التنفيذي",
    bioEn: "",
    bioAr: "",
    photo: undefined,
    credentials: [],
    linkedServices: [],
  },
];

// =============================================================================
// TODO: CLIENT MUST PROVIDE ADDITIONAL VERIFIED TEAM MEMBERS
// =============================================================================
// Currently only the founder is listed. Before launch, the client must provide
// verified information for any additional team members, including:
//
// 1. Verified full name (as used officially)
// 2. Verified job title / position
// 3. Professional biography (written or approved by the team member)
// 4. Verified credentials only (degrees, licenses the person actually holds)
// 5. Real headshot photo (professional photo provided by the team member)
//
// DO NOT fabricate team members, roles, credentials, or biographies.
// DO NOT use stock photos, AI-generated faces, or images of real people
// who are not on the team.
// =============================================================================

export const teamMap = new Map<string, TeamMember>(
  teamMembers.map((t) => [t.id, t])
);

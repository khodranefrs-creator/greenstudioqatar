import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth/config";

const createProjectSchema = z.object({
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  slug: z.string().min(1),
  typology: z.string().min(1),
  locationCity: z.string().min(1),
  locationCityAr: z.string().min(1),
  locationCountry: z.string().min(1),
  locationCountryAr: z.string().min(1),
  year: z.number().int(),
  sizeSqm: z.number().int().positive(),
  heroImage: z.string().url(),
  bodyEn: z.string().min(1),
  bodyAr: z.string().min(1),
  status: z.string().optional(),
  featured: z.boolean().optional(),
  services: z.array(z.string()).optional(),
});

const mockProjects = [...projects];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typology = searchParams.get("typology");
    const service = searchParams.get("service");
    const location = searchParams.get("location");
    const year = searchParams.get("year");
    const featured = searchParams.get("featured");

    let filtered = [...mockProjects];

    if (typology) {
      filtered = filtered.filter((p) => p.typology === typology);
    }
    if (service) {
      filtered = filtered.filter((p) => p.services?.includes(service));
    }
    if (location) {
      filtered = filtered.filter(
        (p) =>
          p.locationCity.toLowerCase() === location.toLowerCase() ||
          p.locationCountry.toLowerCase() === location.toLowerCase()
      );
    }
    if (year) {
      filtered = filtered.filter((p) => p.year === parseInt(year, 10));
    }
    if (featured === "true") {
      filtered = filtered.filter((p) => p.featuredWeight && p.featuredWeight > 0);
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions());
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = createProjectSchema.parse(body);

    const newProject = {
      id: String(mockProjects.length + 1),
      ...validated,
      status: validated.status || "draft",
      featured: validated.featured || false,
      services: validated.services || [],
    };

    mockProjects.push(newProject as unknown as (typeof mockProjects)[number]);

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}

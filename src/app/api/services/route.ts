import { NextRequest, NextResponse } from "next/server";
import { services } from "@/data/services";
import { z } from "zod";

const createServiceSchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  slug: z.string().min(1),
  summaryEn: z.string().min(1),
  summaryAr: z.string().min(1),
  heroImage: z.string().url(),
  icon: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
});

const mockServices = [...services];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockServices });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createServiceSchema.parse(body);

    const newService = {
      id: String(mockServices.length + 1),
      ...validated,
    };

    mockServices.push(newService as (typeof mockServices)[number]);

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}

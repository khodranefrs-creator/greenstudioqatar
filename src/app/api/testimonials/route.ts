import { NextRequest, NextResponse } from "next/server";
import { testimonials } from "@/data/testimonials";
import { z } from "zod";

const createTestimonialSchema = z.object({
  clientName: z.string().min(1),
  clientTitle: z.string().min(1),
  clientTitleAr: z.string().min(1),
  clientCompany: z.string().min(1),
  clientPhoto: z.string().url().optional(),
  quoteEn: z.string().min(1),
  quoteAr: z.string().min(1),
  linkedProjectId: z.string().optional(),
  featured: z.boolean().optional(),
});

const mockTestimonials = [...testimonials];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockTestimonials });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createTestimonialSchema.parse(body);

    const newTestimonial = {
      id: String(mockTestimonials.length + 1),
      ...validated,
      featured: validated.featured || false,
    };

    mockTestimonials.push(newTestimonial as (typeof mockTestimonials)[number]);

    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

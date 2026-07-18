import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const consultationSchema = z.object({
  projectType: z.string().min(1, "Project type is required"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().min(1, "Country is required"),
  message: z.string().optional(),
});

interface ConsultationLead {
  id: string;
  projectType: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  status: string;
  createdAt: string;
}

const consultationLeads: ConsultationLead[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = consultationSchema.parse(body);

    const newLead: ConsultationLead = {
      id: `lead-${Date.now()}`,
      projectType: validated.projectType,
      services: validated.services,
      budgetRange: validated.budgetRange,
      timeline: validated.timeline,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      country: validated.country,
      message: validated.message || "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    consultationLeads.push(newLead);

    return NextResponse.json(
      { success: true, data: { id: newLead.id, message: "Consultation request submitted successfully" } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to submit consultation request" },
      { status: 500 }
    );
  }
}

export { consultationLeads };

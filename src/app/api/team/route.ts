import { NextRequest, NextResponse } from "next/server";
import { teamMembers } from "@/data/team";
import { z } from "zod";

const createTeamMemberSchema = z.object({
  name: z.string().min(1),
  roleEn: z.string().min(1),
  roleAr: z.string().min(1),
  bioEn: z.string().min(1),
  bioAr: z.string().min(1),
  photo: z.string().url().optional(),
});

const mockTeam = [...teamMembers];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockTeam });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createTeamMemberSchema.parse(body);

    const newMember = {
      id: String(mockTeam.length + 1),
      ...validated,
    };

    mockTeam.push(newMember as (typeof mockTeam)[number]);

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

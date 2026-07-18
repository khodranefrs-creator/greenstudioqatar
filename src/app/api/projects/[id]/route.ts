import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";

const mockProjects = [...projects];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = mockProjects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const index = mockProjects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    mockProjects[index] = { ...mockProjects[index], ...body };

    return NextResponse.json({ success: true, data: mockProjects[index] });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const index = mockProjects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    mockProjects.splice(index, 1);

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

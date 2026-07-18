import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data/blog-posts";
import { z } from "zod";

const createBlogPostSchema = z.object({
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  slug: z.string().min(1),
  excerptEn: z.string().min(1),
  excerptAr: z.string().min(1),
  bodyEn: z.string().min(1),
  bodyAr: z.string().min(1),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const mockBlogPosts = [...blogPosts];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: mockBlogPosts });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createBlogPostSchema.parse(body);

    const newPost = {
      id: String(mockBlogPosts.length + 1),
      ...validated,
      authorId: "1",
      tags: validated.tags || [],
      status: validated.status || "draft",
      publishedAt: new Date().toISOString().split("T")[0],
    };

    mockBlogPosts.push(newPost as (typeof mockBlogPosts)[number]);

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

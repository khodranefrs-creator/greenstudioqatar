import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const contactMessages: ContactMessage[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: validated.name,
      email: validated.email,
      message: validated.message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);

    return NextResponse.json(
      { success: true, data: { id: newMessage.id, message: "Message sent successfully" } },
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
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth/config";

interface AdminLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  country: string;
  message: string;
  status: string;
  createdAt: string;
  notes: string;
}

const mockLeads: AdminLead[] = [
  {
    id: "lead-001",
    name: "Ahmed Al-Thani",
    email: "ahmed@example.com",
    phone: "+97455123456",
    projectType: "Villa",
    services: ["architectural-design", "interior-design"],
    budgetRange: "3M-5M QAR",
    timeline: "12-18 months",
    country: "Qatar",
    message: "Looking to build a modern villa in The Pearl.",
    status: "new",
    createdAt: "2026-07-15T10:30:00Z",
    notes: "",
  },
  {
    id: "lead-002",
    name: "Fatima Al-Rashid",
    email: "fatima@example.com",
    phone: "+971509876543",
    projectType: "Commercial Office",
    services: ["architectural-design", "project-management"],
    budgetRange: "10M-20M QAR",
    timeline: "24 months",
    country: "UAE",
    message: "Need design for a new HQ building in Dubai.",
    status: "contacted",
    createdAt: "2026-07-12T14:20:00Z",
    notes: "Called on July 13. Interested in LEED Gold.",
  },
  {
    id: "lead-003",
    name: "Mohamed Ben-Ali",
    email: "mohamed@example.com",
    phone: "+213555123456",
    projectType: "Government Building",
    services: ["architectural-design", "engineering-consultancy"],
    budgetRange: "50M+ QAR",
    timeline: "36 months",
    country: "Algeria",
    message: "Ministry renovation project, need full services.",
    status: "qualified",
    createdAt: "2026-07-10T09:15:00Z",
    notes: "RFP expected Q4 2026.",
  },
  {
    id: "lead-004",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    phone: "+442071234567",
    projectType: "Hotel",
    services: ["interior-design", "project-management"],
    budgetRange: "30M-50M QAR",
    timeline: "30 months",
    country: "UK",
    message: "Luxury boutique hotel concept in Lusail.",
    status: "proposal-sent",
    createdAt: "2026-07-08T11:00:00Z",
    notes: "Proposal sent July 11. Follow up July 20.",
  },
  {
    id: "lead-005",
    name: "Khalid Ibrahim",
    email: "khalid@example.com",
    phone: "+966555987654",
    projectType: "Resort",
    services: ["architectural-design", "construction-supervision"],
    budgetRange: "100M+ QAR",
    timeline: "48 months",
    country: "Saudi Arabia",
    message: "Desert resort near NEOM.",
    status: "won",
    createdAt: "2026-06-28T08:45:00Z",
    notes: "Contract signed July 5.",
  },
  {
    id: "lead-006",
    name: "Leila Khoury",
    email: "leila@example.com",
    phone: "+96171123456",
    projectType: "Residential Tower",
    services: ["architectural-design", "engineering-consultancy"],
    budgetRange: "40M-60M QAR",
    timeline: "36 months",
    country: "Lebanon",
    message: "Mixed-use tower in Beirut.",
    status: "lost",
    createdAt: "2026-06-25T16:30:00Z",
    notes: "Lost to local competitor on price.",
  },
  {
    id: "lead-007",
    name: "Omar Hassan",
    email: "omar.h@example.com",
    phone: "+97433456789",
    projectType: "Villa",
    services: ["interior-design"],
    budgetRange: "1M-3M QAR",
    timeline: "6 months",
    country: "Qatar",
    message: "Interior fit-out for penthouse in West Bay.",
    status: "new",
    createdAt: "2026-07-16T13:00:00Z",
    notes: "",
  },
  {
    id: "lead-008",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+919876543210",
    projectType: "Commercial Complex",
    services: ["project-management", "construction-supervision"],
    budgetRange: "20M-30M QAR",
    timeline: "24 months",
    country: "India",
    message: "Shopping complex in Lusail area.",
    status: "contacted",
    createdAt: "2026-07-14T10:00:00Z",
    notes: "Initial call completed. Sending portfolio.",
  },
  {
    id: "lead-009",
    name: "Carlos Mendez",
    email: "carlos@example.com",
    phone: "+34612345678",
    projectType: "Cultural Center",
    services: ["architectural-design", "interior-design", "engineering-consultancy"],
    budgetRange: "15M-25M QAR",
    timeline: "30 months",
    country: "Spain",
    message: "Cultural center and gallery space in Education City.",
    status: "qualified",
    createdAt: "2026-07-11T15:45:00Z",
    notes: "Meeting scheduled for July 22.",
  },
  {
    id: "lead-010",
    name: "Aisha Yusuf",
    email: "aisha@example.com",
    phone: "+254712345678",
    projectType: "Office Building",
    services: ["architectural-design", "project-management"],
    budgetRange: "5M-10M QAR",
    timeline: "18 months",
    country: "Kenya",
    message: "Regional office expansion in Doha.",
    status: "proposal-sent",
    createdAt: "2026-07-09T09:30:00Z",
    notes: "Proposal sent July 12. Waiting for feedback.",
  },
];

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions());
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data: mockLeads });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

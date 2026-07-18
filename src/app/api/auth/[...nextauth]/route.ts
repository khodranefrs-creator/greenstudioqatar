import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/auth/config";

const handler = async (req: Request, ctx: unknown) => {
  return NextAuth(getAuthOptions())(req, ctx as { params?: Record<string, string> });
};

export { handler as GET, handler as POST };

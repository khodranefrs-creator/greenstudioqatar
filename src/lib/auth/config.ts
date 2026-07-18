import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const mockAdminUser = {
  id: "1",
  email: "admin@greenstudioqatar.com",
  name: "Green Studio Admin",
  role: "admin" as const,
  passwordHash: bcrypt.hashSync("admin123", 10),
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;
        const user = mockAdminUser;
        const isValid = bcrypt.compareSync(password, user.passwordHash);

        if (email === user.email && isValid) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
